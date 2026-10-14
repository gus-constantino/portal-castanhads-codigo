#!/usr/bin/env node
/**
 * Imagens das capacidades do pitch para quem não tem senha (docs/PLANO-ACESSO.md, decisão 1a): para cada
 * <article class="pt-cap"> do docs/pitch/index.html, abre o portal na rota dele (com o tema e o celular da capacidade) no
 * Chrome headless e salva docs/pitch/capturas/NN.jpg. Quem entra com código continua vendo o portal ao vivo.
 *
 *   node scripts/dev/pitch-capturas.js          (CHROME=/caminho/do/chrome se o Chrome não for achado)
 *
 * Rodar de novo quando o portal mudar bastante: as imagens não se atualizam sozinhas.
 */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), http = require("http"), { spawn } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "docs", "pitch", "capturas");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".md": "text/markdown; charset=utf-8", ".woff2": "font/woff2", ".json5": "application/json" };
function findChrome(){
  return [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean).find((p) => fs.existsSync(p));
}
const html = fs.readFileSync(path.join(ROOT, "docs", "pitch", "index.html"), "utf8");
const caps = [...html.matchAll(/<article class="pt-cap"([^>]*)>/g)].map((m) => {
  const a = (k) => { const x = m[1].match(new RegExp(k + '="([^"]*)"')); return x ? x[1] : null; };
  return { route: a("data-route"), theme: a("data-theme") || "light", phone: a("data-device") === "phone" };
});
const chrome = findChrome();
if (!chrome){ console.error("Chrome não encontrado (defina CHROME=/caminho)."); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html";
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const base = `http://127.0.0.1:${server.address().port}/index.html?onboarding=off`;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cds-capturas-"));
  const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
    "--window-size=1440,900", "--user-data-dir=" + profile, "--remote-debugging-port=0"].concat(process.env.CI ? ["--no-sandbox"] : []).concat(["about:blank"]), { stdio: "ignore" });
  const finish = (code) => { try { proc.kill(); } catch (e) {} server.close(); fs.rm(profile, { recursive: true, force: true }, () => {}); process.exit(code); };
  try {
    const portFile = path.join(profile, "DevToolsActivePort");
    while (!fs.existsSync(portFile) || !fs.readFileSync(portFile, "utf8").includes("\n")) await sleep(100);
    const port = fs.readFileSync(portFile, "utf8").split("\n")[0];
    const target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((ok, ko) => { ws.onopen = ok; ws.onerror = () => ko(new Error("não conectou ao Chrome")); });
    let seq = 0; const waiting = {};
    ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && waiting[m.id]){ waiting[m.id](m); delete waiting[m.id]; } };
    const send = (method, params) => new Promise((ok) => { const id = ++seq; waiting[id] = ok; ws.send(JSON.stringify({ id, method, params })); });
    const evalJs = async (expression) => { const v = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }); return v.result && v.result.result && v.result.result.value; };
    let total = 0;
    for (let i = 0; i < caps.length; i++){
      const c = caps[i];
      // o quadro do pitch mostra 1440 px (desktop) ou 390 px (celular); a imagem sai menor para pesar pouco
      await send("Emulation.setDeviceMetricsOverride", c.phone ? { width: 390, height: 844, deviceScaleFactor: 1.5, mobile: true } : { width: 1440, height: 900, deviceScaleFactor: 0.75, mobile: false });
      await send("Page.navigate", { url: base + c.route });
      for (let k = 0; k < 60; k++){ await sleep(100); if (await evalJs("!!(window.CDS && document.querySelector('main') && document.readyState === 'complete')")) break; }
      await evalJs(`document.documentElement.dataset.theme = ${JSON.stringify(c.theme)}; window.scrollTo(0, 0); true`);
      await sleep(1500); // entradas animadas e imagens
      const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: false });
      const file = path.join(OUT, String(i + 1).padStart(2, "0") + ".jpg"), buf = Buffer.from(shot.result.data, "base64");
      fs.writeFileSync(file, buf); total += buf.length;
      console.log(`${String(i + 1).padStart(2, "0")} · ${c.route}${c.theme === "dark" ? " · escuro" : ""}${c.phone ? " · 390px" : ""} · ${Math.round(buf.length / 1024)} KB`);
    }
    console.log(`✅ Pitch: ${caps.length} imagens em docs/pitch/capturas · ${Math.round(total / 1024)} KB no total`);
    finish(0);
  } catch (e){ console.error("❌ " + e.message); finish(1); }
});
