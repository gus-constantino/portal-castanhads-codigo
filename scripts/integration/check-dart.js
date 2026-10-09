#!/usr/bin/env node
/**
 * F4 · Validação do Dart "No Flutter" com o analisador do próprio Flutter (equivalente ao check-jsx do React).
 * 1. Abre o playground no Chrome headless e gera o código de cada mapa (integration/flutter-map/<id>.json):
 *    estado padrão + uma variante por condição `if` dos mapas (ex.: kind=range, intent=navigation), lendo o painel "No Flutter".
 * 2. Extrai origin/staging do clone do castanha-mobile (git archive: só leitura) para uma pasta de trabalho persistente,
 *    com um app mínimo que depende do castanha_flutter por path (o `flutter pub get` só baixa de novo quando muda).
 * 3. Monta um .dart por componente (uma função por variante) e roda `dart analyze`.
 * 4. Grava integration/flutter/DART-CHECK.md (leitura) e integration/flutter/dart-check.json (sem data: a rotina compara).
 *
 *   node scripts/integration/check-dart.js [--mobile /caminho/do/clone] [--flutter /caminho/do/flutter]
 * Código de saída: 0 sem erros · 1 com erros · 2 não rodou (sem Chrome, sem porta, sem Flutter ou sem o clone).
 * Precisa: Chrome, porta local e rede na primeira vez (fora do sandbox), o Flutter SDK e o clone do castanha-mobile.
 */
"use strict";
const http = require("http"), fs = require("fs"), os = require("os"), path = require("path");
const { spawn, execFileSync } = require("child_process");
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
const ROOT = path.join(__dirname, "..", "..");
const argv = (k) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : null; };
const MOBILE = path.resolve(argv("mobile") || process.env.MOBILE || path.join(ROOT, "..", "castanha-mobile"));
const REF = process.env.REF_FLUTTER || "origin/staging";
const FLUTTER = [argv("flutter"), process.env.FLUTTER, path.join(os.homedir(), "development", "flutter", "bin", "flutter")].filter(Boolean).find((p) => fs.existsSync(p)) || "flutter";
const DART = path.join(path.dirname(FLUTTER), "dart");
const WORK = path.join(os.tmpdir(), "cds-dart-check");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };
const chrome = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean).find((p) => fs.existsSync(p));
function fail(msg){ console.error("❌ " + msg); process.exit(2); }
if (!chrome) fail("Chrome não encontrado (defina CHROME=/caminho).");
if (!fs.existsSync(path.join(MOBILE, ".git"))) fail("sem o clone do castanha-mobile em " + MOBILE);
try { execFileSync(FLUTTER, ["--version"], { stdio: "pipe" }); } catch (e){ fail("Flutter SDK não encontrado (use --flutter /caminho/bin/flutter)."); }

// ---------- coleta no navegador ----------
const COLLECT = `(async function(){
  const W = (ms) => new Promise((r) => setTimeout(r, ms));
  const out = [];
  const maps = CDS.flutterMaps || {};
  const ids = Object.keys(CDS.flutter.items).filter((id) => maps[id]);
  function code(){ const p = [...document.querySelectorAll('#flutter pre.pg-react__pre')]; return p.length > 1 ? p.map((x) => x.textContent).join("\\n\\n") : null; }
  function conds(w, acc){
    if (!w) return acc;
    if (Array.isArray(w)){ w.forEach((x) => conds(x, acc)); return acc; }
    if (w.if) acc.push(w.if);
    (w.args || []).forEach((a) => { if (a.if) acc.push(a.if); });
    return acc;
  }
  for (const id of ids){
    const map = maps[id];
    const vars = [{}].concat(conds(map.widget, []).map((c) => { const v = {}; Object.keys(c).forEach((k) => { if (c[k].charAt(0) !== "!") v[k] = c[k]; }); return v; })
      .filter((v) => Object.keys(v).length));
    const seen = {};
    for (const v of vars){
      const key = JSON.stringify(v); if (seen[key]) continue; seen[key] = 1;
      location.hash = "#/"; await W(150); location.hash = "#/" + id; await W(500);
      const el = document.querySelector(".pg-preview " + map.element) || document.querySelector(".pg-preview " + String(map.element).split("[")[0]);
      if (el) Object.keys(v).forEach((k) => { if (v[k] === "null") el.removeAttribute(k); else el.setAttribute(k, v[k]); });
      await W(200);
      out.push({ id, variant: key, code: code() });
    }
  }
  return out;
})()`;

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html";
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
});
server.on("error", (e) => fail(e.code === "EPERM" ? "sem permissão para abrir porta local (sandbox)." : e.message));
server.listen(0, "127.0.0.1", async () => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cds-dart-"));
  const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--window-size=1440,900", "--user-data-dir=" + profile, "--remote-debugging-port=0", "about:blank"], { stdio: "ignore" });
  const done = () => { try { proc.kill(); } catch (e) {} server.close(); };
  let snippets;
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
    await send("Page.navigate", { url: `http://127.0.0.1:${server.address().port}/index.html#/` });
    for (let i = 0; i < 100; i++){ await sleep(100); const v = await send("Runtime.evaluate", { expression: "!!(window.CDS && CDS.flutter && CDS.flutter.items)", returnByValue: true }); if (v.result.result.value) break; }
    const v = await send("Runtime.evaluate", { expression: COLLECT, awaitPromise: true, returnByValue: true });
    if (v.result.exceptionDetails) throw new Error(v.result.exceptionDetails.exception.description);
    snippets = v.result.result.value; ws.close();
  } catch (e){ done(); fail("coleta: " + e.message); }
  done();
  fs.rm(profile, { recursive: true, force: true }, () => {});
  check(snippets);
});

// ---------- Dart ----------
function check(snippets){
  const commit = execFileSync("git", ["-C", MOBILE, "rev-parse", "--short", REF]).toString().trim();
  const mobile = path.join(WORK, "mobile"), app = path.join(WORK, "app"), lib = path.join(app, "lib");
  const stamp = path.join(WORK, "commit");
  if (!fs.existsSync(stamp) || fs.readFileSync(stamp, "utf8") !== commit){ // extrai a staging só quando ela muda
    fs.rmSync(mobile, { recursive: true, force: true }); fs.mkdirSync(mobile, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${MOBILE}" archive ${REF} packages/castanha-flutter | tar -x -C "${mobile}"`]);
    fs.writeFileSync(stamp, commit);
  }
  fs.mkdirSync(lib, { recursive: true });
  fs.writeFileSync(path.join(app, "pubspec.yaml"), "name: castanha_portal_check\npublish_to: none\nenvironment:\n  sdk: \">=3.5.0 <4.0.0\"\ndependencies:\n  flutter:\n    sdk: flutter\n  castanha_flutter:\n    path: ../mobile/packages/castanha-flutter\n");
  fs.writeFileSync(path.join(app, "analysis_options.yaml"), "analyzer:\n  errors:\n    unused_element: ignore\n    unnecessary_import: ignore\n");
  try { execFileSync(FLUTTER, ["pub", "get"], { cwd: app, stdio: "pipe", maxBuffer: 64 * 1024 * 1024 }); }
  catch (e){ fail("flutter pub get: " + String(e.stderr || e.stdout || e.message).split("\n").slice(-5).join(" ")); }
  fs.readdirSync(lib).forEach((f) => fs.rmSync(path.join(lib, f)));

  const byId = {}, where = {};
  snippets.forEach((s) => { (byId[s.id] = byId[s.id] || []).push(s); });
  Object.keys(byId).forEach((id) => {
    const imports = new Set(["import 'package:flutter/widgets.dart';"]), bodies = [];
    byId[id].forEach((s, k) => {
      if (!s.code) return;
      const body = [];
      s.code.split("\n").forEach((l) => { if (/^import /.test(l)) imports.add(l); else body.push(l); });
      const code = body.join("\n").trim();
      const fn = "demo" + k;
      bodies.push({ fn, variant: s.variant, text: "// " + s.variant + "\nWidget " + fn + "() {\n  return " + code.split("\n").join("\n  ") + ";\n}\n" });
    });
    const file = id.replace(/-/g, "_") + ".dart";
    let line = imports.size + 2;
    const parts = [...imports].join("\n") + "\n\n" + bodies.map((b) => { where[file + ":" + b.fn] = { id, variant: b.variant, from: line, to: line + b.text.split("\n").length - 1 }; line += b.text.split("\n").length; return b.text; }).join("");
    fs.writeFileSync(path.join(lib, file), parts);
  });

  let raw = "";
  try { raw = execFileSync(DART, ["analyze", "--format=machine", "lib"], { cwd: app, stdio: "pipe", maxBuffer: 64 * 1024 * 1024 }).toString(); }
  catch (e){ raw = String(e.stdout || "") + String(e.stderr || ""); }
  const issues = raw.split("\n").filter((l) => /^(ERROR|WARNING)\|/.test(l)).map((l) => {
    const [sev, , code, file, ln, , , ...msg] = l.split("|");
    const f = path.basename(file), n = parseInt(ln, 10);
    const w = Object.values(where).find((x) => x.id.replace(/-/g, "_") + ".dart" === f && n >= x.from && n <= x.to) || {};
    return { id: w.id || f.replace(/\.dart$/, "").replace(/_/g, "-"), variant: w.variant || "?", severity: sev.toLowerCase(), code, message: msg.join("|").replace(/\\n/g, " ") };
  });
  const total = snippets.filter((s) => s.code).length;
  const comps = Object.keys(byId).length;
  const json = { source: { ref: REF, commit }, snippets: total, components: comps, errors: issues.filter((i) => i.severity === "error").length, warnings: issues.filter((i) => i.severity === "warning").length,
    issues: issues.sort((a, b) => (a.id + a.variant).localeCompare(b.id + b.variant)) };
  fs.mkdirSync(path.join(ROOT, "integration", "flutter"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "integration", "flutter", "dart-check.json"), JSON.stringify(json, null, 1) + "\n");
  const md = ["# Dart do painel \"No Flutter\" × castanha_flutter", "",
    "Gerado por `scripts/integration/check-dart.js`: " + total + " trechos de " + comps + " componentes, analisados com o `dart analyze` contra `" + REF + "` (" + commit + ") do castanha-mobile. Não editar à mão.", "",
    json.errors || json.warnings ? "| Componente | Variante | Nível | Código | Mensagem |\n|---|---|---|---|---|\n" + json.issues.map((i) => "| `" + i.id + "` | `" + i.variant + "` | " + i.severity + " | `" + i.code + "` | " + i.message.replace(/\|/g, "\\|") + " |").join("\n")
      : "Nenhum erro: todos os trechos compilam contra o castanha_flutter.", ""].join("\n");
  fs.writeFileSync(path.join(ROOT, "integration", "flutter", "DART-CHECK.md"), md);
  console.log((json.errors ? "❌" : "✅") + " Dart: " + total + " trechos de " + comps + " componentes · " + json.errors + " erros · " + json.warnings + " avisos (" + REF + " " + commit + ")");
  json.issues.slice(0, 40).forEach((i) => console.log("  " + i.severity + " " + i.id + " " + i.variant + " — " + i.code + ": " + i.message));
  process.exit(json.errors ? 1 : 0);
}
