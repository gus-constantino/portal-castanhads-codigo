#!/usr/bin/env node
/**
 * Validação do JSX "No React" com o TypeScript do castanha-react (D164).
 * 1. Abre o playground no Chrome headless (como o smoke) e gera o código de cada mapa curado
 *    (integration/prop-map/<id>.json): estado padrão + uma variante por condição `if` dos mapas
 *    (ex.: intent=navigation, status=error), lendo o painel "No React".
 * 2. Monta um .tsx por componente (um componente de função por variante) com declarações para os nomes livres
 *    do exemplo (handleClose, rows…).
 * 3. Extrai origin/staging do clone local do castanha (git archive: só leitura) para uma pasta temporária e roda o
 *    tsc do próprio castanha (node_modules do clone, sem instalar nada) com os imports apontando para os fontes.
 * 4. Lista só os erros dos nossos trechos e grava integration/JSX-CHECK.md.
 *
 *   node scripts/integration/check-jsx.js            (CASTANHA=/caminho/do/clone · REF=origin/staging)
 * Precisa: Chrome, porta local (fora do sandbox) e o clone do castanha com node_modules.
 */
"use strict";
const http = require("http"), fs = require("fs"), os = require("os"), path = require("path");
const { spawn, execFileSync } = require("child_process");
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
const ROOT = path.join(__dirname, "..", "..");
const CASTANHA = process.env.CASTANHA || path.join(ROOT, "..", "castanha");
const REF = process.env.REF || "origin/staging";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };
const chrome = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean).find((p) => fs.existsSync(p));
function fail(msg){ console.error("❌ " + msg); process.exit(2); }
if (!chrome) fail("Chrome não encontrado (defina CHROME=/caminho).");
if (!fs.existsSync(path.join(CASTANHA, "node_modules", "typescript"))) fail("clone do castanha sem node_modules/typescript em " + CASTANHA);

// Nomes livres dos exemplos (callbacks e dados): tipados de forma larga para não mascarar erro de prop
const FREE = {
  rows: "{ id: string; name: string; balance: number }[]", page: "number",
  _fn: ["handleClose", "handleApply", "handleConfirm", "handleFiles", "handleRemove", "handleDownload", "handleRetry", "openFilters", "goToSlide",
    "setSelected", "setRating", "setScore", "setDate", "setValue", "setPage", "setPageSize", "setActive"]
};
const PRELUDE = Object.keys(FREE).filter((k) => k !== "_fn").map((k) => "declare const " + k + ": " + FREE[k] + ";")
  .concat(FREE._fn.map((n) => "declare const " + n + ": (...args: any[]) => void;")).join("\n");

// ---------- coleta no navegador ----------
const COLLECT = `(async function(){
  const W = (ms) => new Promise((r) => setTimeout(r, ms));
  const out = [];
  const ids = Object.keys(CDS.react.items).filter((id) => CDS.react.items[id].map);
  function code(){ const p = [...document.querySelectorAll('pre.pg-react__pre')]; return p.length ? p.map((x) => x.textContent).join("\\n") : null; }
  function conds(node, acc){ if (!node) return acc; if (node.if) acc.push(node.if); (node.props || []).forEach((p) => p.if && acc.push(p.if));
    (node.children || []).forEach((c) => conds(c, acc)); if (node.each) conds(node.node, acc); return acc; }
  for (const id of ids){
    const map = CDS.react.items[id].map;
    const vars = [{}].concat(conds(map.jsx, []).map((c) => { const v = {}; Object.keys(c).forEach((k) => { if (c[k].charAt(0) !== "!") v[k] = c[k]; }); return v; })
      .filter((v) => Object.keys(v).length));
    const seen = {};
    for (const v of vars){
      const key = JSON.stringify(v); if (seen[key]) continue; seen[key] = 1;
      location.hash = "#/"; await W(150); location.hash = "#/" + id; await W(500); // passa pelo Início: remonta o preview a cada variante
      const el = document.querySelector(".pg-preview " + map.element) || document.querySelector(".pg-preview " + map.element.split(":")[0]);
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cds-jsx-"));
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
    for (let i = 0; i < 100; i++){ await sleep(100); const v = await send("Runtime.evaluate", { expression: "!!(window.CDS && CDS.react && CDS.react.items)", returnByValue: true }); if (v.result.result.value) break; }
    const v = await send("Runtime.evaluate", { expression: COLLECT, awaitPromise: true, returnByValue: true });
    if (v.result.exceptionDetails) throw new Error(v.result.exceptionDetails.exception.description);
    snippets = v.result.result.value; ws.close();
  } catch (e){ done(); fail("coleta: " + e.message); }
  done();
  fs.rm(profile, { recursive: true, force: true }, () => {});
  check(snippets);
});

// ---------- TypeScript ----------
function check(snippets){
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "cds-tsc-"));
  const stg = path.join(work, "staging");
  fs.mkdirSync(stg);
  const commit = execFileSync("git", ["-C", CASTANHA, "rev-parse", "--short", REF]).toString().trim();
  execFileSync("sh", ["-c", `git -C "${CASTANHA}" archive ${REF} packages/castanha-react/src packages/castanha-icons/src packages/castanha-illustrations/src | tar -x -C "${stg}"`]);
  fs.symlinkSync(path.join(CASTANHA, "node_modules"), path.join(work, "node_modules"));
  const src = path.join(stg, "packages/castanha-react/src");
  const files = [], where = {};
  const byId = {};
  snippets.forEach((s) => { (byId[s.id] = byId[s.id] || []).push(s); });
  Object.keys(byId).forEach((id) => {
    const imports = new Set(), bodies = [];
    byId[id].forEach((s, k) => {
      if (!s.code) return;
      const lines = s.code.split("\n"), body = [];
      lines.forEach((l) => { if (/^import /.test(l)) imports.add(l); else body.push(l); });
      // separa o que vem antes do JSX (hooks, chamadas) do JSX
      let i = body.findIndex((l) => /^\s*</.test(l));
      const pre = (i < 0 ? body : body.slice(0, i)).filter((l) => l.trim()), jsx = i < 0 ? [] : body.slice(i);
      const fn = "Demo_" + id.replace(/-/g, "_") + "_" + k;
      where[fn] = { id, variant: s.variant };
      bodies.push("// " + s.variant + "\nexport function " + fn + "() {\n" + pre.map((l) => "  " + l).join("\n") + "\n  return " + (jsx.length ? "(\n" + jsx.map((l) => "    " + l).join("\n") + "\n  )" : "null") + ";\n}\n");
    });
    const f = path.join(work, id + ".tsx");
    fs.writeFileSync(f, [...imports].join("\n") + "\n" + PRELUDE + "\n\n" + bodies.join("\n"));
    files.push(f);
  });
  const tsconfig = { compilerOptions: { target: "ES2022", module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, noEmit: true, skipLibCheck: true,
    resolveJsonModule: true, allowJs: false, lib: ["ES2022", "DOM", "DOM.Iterable"], types: [], baseUrl: ".",
    paths: { "@caju-beneficios/castanha-react": [path.join(src, "index.ts")], "@caju-beneficios/castanha-icons": [path.join(stg, "packages/castanha-icons/src/index.ts")],
      "@caju-beneficios/castanha-illustrations": [path.join(stg, "packages/castanha-illustrations/src/index.ts")], "@/*": [src + "/*"] } },
    files: files.concat(fs.readdirSync(path.join(src, "types")).filter((f) => f.endsWith(".d.ts")).map((f) => path.join(src, "types", f))) };
  fs.writeFileSync(path.join(work, "tsconfig.json"), JSON.stringify(tsconfig, null, 1));
  const realWork = fs.realpathSync(work);
  function tsc(){
    try { execFileSync(process.execPath, [path.join(CASTANHA, "node_modules/typescript/bin/tsc"), "-p", ".", "--pretty", "false"], { cwd: work, stdio: "pipe", maxBuffer: 64 * 1024 * 1024 }); return ""; }
    catch (e){ return (e.stdout || "").toString() + (e.stderr || "").toString(); }
  }
  // erros só dos nossos arquivos (o tsc devolve caminhos relativos à pasta; o código do castanha não é auditado aqui)
  function parse(text){
    const list = [];
    text.split("\n").forEach((l) => {
      const m = l.match(/^(.*?\.tsx)\((\d+),(\d+)\): error (TS\d+): (.*)$/);
      if (!m) return;
      const abs = path.resolve(work, m[1]); let real; try { real = fs.realpathSync(abs); } catch (e){ return; }
      if (path.dirname(real) !== realWork) return;
      list.push({ file: real, line: +m[2], code: m[4], msg: m[5] });
    });
    return list;
  }
  // 1ª passada: nomes livres do exemplo (dados e callbacks de quem usa) viram `any`; ficam listados no relatório
  const free = new Set();
  parse(tsc()).forEach((e) => { if (e.code === "TS2304" || e.code === "TS2552"){ const n = e.msg.match(/Cannot find name '(\w+)'/); if (n) free.add(n[1]); } });
  if (free.size) files.forEach((f) => { const t = fs.readFileSync(f, "utf8"); fs.writeFileSync(f, t.replace(PRELUDE, PRELUDE + "\n" + [...free].map((n) => "declare const " + n + ": any;").join("\n"))); });
  const errs = [];
  parse(tsc()).forEach((e0) => {
    const m = [null, e0.file, e0.line, 0, e0.code, e0.msg];
    const file = fs.readFileSync(m[1], "utf8").split("\n"), line = +m[2];
    let fn = null; for (let i = line - 1; i >= 0; i--){ const x = file[i].match(/export function (\w+)/); if (x){ fn = x[1]; break; } }
    errs.push({ id: path.basename(m[1], ".tsx"), variant: fn && where[fn] ? where[fn].variant : "?", code: m[4], msg: m[5], src: (file[line - 1] || "").trim() });
  });
  const total = snippets.filter((s) => s.code).length, comps = Object.keys(byId).length, bad = new Set(errs.map((e) => e.id));
  const md = ["# Validação do JSX \"No React\" com TypeScript", "",
    "Gerado por `node scripts/integration/check-jsx.js`: o código do painel \"No React\" de cada mapa curado (estado padrão e uma variante por condição do mapa), tipado com o `tsc` do castanha-react em `" + REF + "` (`" + commit + "`).", "",
    "| | |", "|---|---:|", "| Componentes | " + comps + " |", "| Trechos (variantes) | " + total + " |", "| Componentes com erro | " + bad.size + " |", "| Erros | " + errs.length + " |", "", "Nomes livres declarados como `any` (dados e callbacks de quem usa o componente): " + ([...free].map((n) => "`" + n + "`").join(", ") || "nenhum") + ".", ""];
  if (errs.length){
    md.push("## Erros", "", "| Componente | Variante | Erro | Linha |", "|---|---|---|---|");
    errs.forEach((e) => md.push("| `" + e.id + "` | `" + e.variant.replace(/\|/g, "\\|") + "` | " + e.code + ": " + e.msg.replace(/\|/g, "\\|") + " | `" + e.src.replace(/\|/g, "\\|").slice(0, 120) + "` |"));
  } else md.push("Nenhum erro: todo JSX gerado compila contra os tipos do React.");
  fs.writeFileSync(path.join(ROOT, "integration", "JSX-CHECK.md"), md.join("\n") + "\n");
  console.log((errs.length ? "❌" : "✅") + " JSX: " + comps + " componentes · " + total + " trechos · " + errs.length + " erros em " + bad.size + " componentes (" + REF + " " + commit + ")");
  errs.slice(0, 80).forEach((e) => console.log("   " + e.id + " " + e.variant + " · " + e.code + ": " + e.msg.slice(0, 200)));
  if (!process.env.KEEP) fs.rm(work, { recursive: true, force: true }, () => {}); else console.log("   pasta: " + work);
  process.exit(errs.length ? 1 : 0);
}
