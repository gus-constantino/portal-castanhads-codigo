#!/usr/bin/env node
/**
 * Smoke sem abrir o navegador: serve o repo num servidor estático do próprio Node (sem dependências), abre
 * tests/smoke.html no Chrome headless, lê o resultado (JSON #smoke-result que o tests/smoke.js escreve) e
 * imprime no terminal. Depois roda o smoke das docs no app de verdade (tests/smoke-docs.js), em desktop e
 * emulando um celular de 375px. Sai com código 1 se algum componente ou doc falhar (aviso não reprova).
 *   --avisos   lista os avisos · --sem-docs   pula as docs
 *
 *   node scripts/dev/smoke.js            (ou: node scripts/build-index.js --smoke)
 *   CHROME=/caminho/do/chrome node scripts/dev/smoke.js
 *
 * Precisa: Google Chrome (ou Chromium/Edge) instalado e permissão para abrir porta local (fora do sandbox).
 * Sem Chrome ou sem porta: avisa e sai com código 2 (não é falha do smoke).
 */
"use strict";
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

const ROOT = path.join(__dirname, "..", "..");
const TIMEOUT_MS = 240000;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };

function findChrome(){
  const list = [process.env.CHROME,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
  return list.find((p) => fs.existsSync(p));
}
function skip(msg){ console.warn("⏭️  Smoke pulado: " + msg); process.exit(2); }

const chrome = findChrome();
if (!chrome) skip("Chrome não encontrado (defina CHROME=/caminho).");

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html";
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
});
server.on("error", (e) => skip(e.code === "EPERM" || e.code === "EACCES" ? "sem permissão para abrir porta local (sandbox)." : e.message));

server.listen(0, "127.0.0.1", async () => {
  const url = `http://127.0.0.1:${server.address().port}/tests/smoke.html`;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cds-smoke-"));
  const t0 = Date.now();
  // Chrome headless com DevTools Protocol (WebSocket nativo do Node ≥ 22): abre a página, espera o resultado e fecha
  const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
    "--window-size=1440,900", "--user-data-dir=" + profile, "--remote-debugging-port=0"]
    .concat(process.env.CI ? ["--no-sandbox"] : []) // runner do GitHub (Linux): o sandbox do Chrome não sobe sem namespaces
    .concat(["about:blank"]), { stdio: "ignore" });
  const finish = (code) => { try { proc.kill(); } catch (e) {} server.close(); fs.rm(profile, { recursive: true, force: true }, () => {}); process.exit(code); };
  const timer = setTimeout(() => { console.error("❌ Smoke sem resultado: passou de " + TIMEOUT_MS / 1000 + " s."); finish(1); }, TIMEOUT_MS);
  try {
    if (typeof WebSocket === "undefined") throw new Error("este Node não tem WebSocket nativo (precisa do Node 22 ou mais novo)");
    // a porta do DevTools sai no arquivo DevToolsActivePort do perfil
    const portFile = path.join(profile, "DevToolsActivePort");
    while (!fs.existsSync(portFile) || !fs.readFileSync(portFile, "utf8").includes("\n")) await sleep(100);
    const port = fs.readFileSync(portFile, "utf8").split("\n")[0];
    const target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((ok, ko) => { ws.onopen = ok; ws.onerror = () => ko(new Error("não conectou ao Chrome")); });
    let seq = 0; const waiting = {};
    ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && waiting[m.id]){ waiting[m.id](m); delete waiting[m.id]; } };
    const send = (method, params) => new Promise((ok) => { const id = ++seq; waiting[id] = ok; ws.send(JSON.stringify({ id, method, params })); });
    const avisos = process.argv.includes("--avisos");
    await send("Page.navigate", { url });
    let r = null;
    while (!r){
      await sleep(250);
      const v = await send("Runtime.evaluate", { expression: "(function(){ var n = document.getElementById('smoke-result'); return n ? n.textContent : ''; })()", returnByValue: true });
      const txt = v.result && v.result.result && v.result.result.value;
      if (txt) r = JSON.parse(txt);
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`${r.fail ? "❌" : "✅"} Smoke: ${r.pass}/${r.total} ok · ${r.fail} com problema · ${r.warnings} com aviso · ${secs} s (Chrome headless)`);
    r.failures.forEach((f) => console.log(`   ❌ ${f.id}: ${f.errors.join(" · ")}`));
    if (avisos) r.warned.forEach((w) => console.log(`   ⚠️  ${w.id}: ${w.warnings.join(" · ")}`));

    // ---------- Docs (D128): o app de verdade, cada tab de cada doc, em desktop e num celular de 375px ----------
    let docsFail = 0;
    if (!process.argv.includes("--sem-docs")){
      const t1 = Date.now(), base = `http://127.0.0.1:${server.address().port}/index.html`;
      const code = fs.readFileSync(path.join(ROOT, "tests", "smoke-docs.js"), "utf8");
      const runDocs = async (mobile) => {
        if (mobile) await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
        await send("Page.navigate", { url: base + "#/" });
        for (let i = 0; i < 80; i++){ // espera o app montar (índice das docs e o painel de docs)
          await sleep(100);
          const v = await send("Runtime.evaluate", { expression: "!!(window.CDS && CDS.docsIndex && CDS.loadDoc && document.getElementById('docs'))", returnByValue: true });
          if (v.result && v.result.result && v.result.result.value) break;
        }
        const v = await send("Runtime.evaluate", { expression: code + "\n;CDS_SMOKE_DOCS({ mobile: " + mobile + " })", awaitPromise: true, returnByValue: true });
        if (v.result && v.result.exceptionDetails) throw new Error("smoke das docs: " + (v.result.exceptionDetails.exception && v.result.exceptionDetails.exception.description || v.result.exceptionDetails.text));
        return v.result.result.value;
      };
      const d = await runDocs(false), m = await runDocs(true);
      docsFail = d.failures.length + m.failures.length;
      const warnedN = m.warned.length, secs2 = ((Date.now() - t1) / 1000).toFixed(1);
      console.log(`${docsFail ? "❌" : "✅"} Docs: ${d.docs} docs · ${d.tabs} tabs em desktop e em 375px · ${docsFail} com problema · ${warnedN} com aviso · ${secs2} s`);
      d.failures.concat(m.failures).forEach((f) => console.log(`   ❌ ${f.id}: ${f.errors.join(" · ")}`));
      if (avisos) m.warned.forEach((w) => console.log(`   ⚠️  ${w.id}: ${w.warnings.join(" · ")}`));
      if (!avisos && (r.warnings || warnedN)) console.log("   (avisos: node scripts/dev/smoke.js --avisos)");
    } else if (!avisos && r.warnings) console.log("   (avisos: node scripts/dev/smoke.js --avisos)");
    clearTimeout(timer); ws.close();
    finish(r.fail || docsFail ? 1 : 0);
  } catch (e){ clearTimeout(timer); console.error("❌ Smoke sem resultado: " + e.message); finish(1); }
});
