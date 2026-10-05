#!/usr/bin/env node
/**
 * Gera os blocos de componentes do index.html (e do tests/smoke.html) em ordem de dependência.
 *   node scripts/build-index.js
 *
 * Cada components/<id>/<id>.js declara as dependências no JSDoc do topo:
 *    * @deps icon badge        (ids de outras pastas em components/; "—" = nenhuma)
 * O script faz a ordenação topológica (desempate alfabético) e reescreve o conteúdo entre:
 *    <!-- @components:css --> … <!-- /@components:css -->
 *    <!-- @components:js -->  … <!-- /@components:js -->
 * Falha se houver dependência inexistente ou ciclo.
 *
 * Cache-busting: todo .js/.css local citado entre aspas no HTML (inclusive o tests/smoke.js carregado
 * por script) recebe ?v=<8 primeiros do sha1 do conteúdo>. Só a URL do arquivo que mudou muda.
 *
 * Recursos de suporte (resources/<id>/<id>.js + .css opcional) entram depois dos componentes:
 * são páginas de doc das libs de apoio ([Caju] Icons, Illustrations…), sem dependências.
 *
 * Pacotes (desempenho): em vez de ~250 <script>/<link> separados, o HTML carrega dist/cds.css e dist/cds.js,
 * a concatenação dos mesmos arquivos na mesma ordem (sem transpilar nada: o fonte continua sendo o arquivo da pasta).
 * Cada .js entra num try/catch com o nome do arquivo, para um erro não derrubar os seguintes (como era com
 * arquivos separados). Rodar este script depois de qualquer mudança (já era a regra por causa do ?v=hash).
 *
 *   node scripts/build-index.js --smoke   → no fim, roda o smoke no Chrome headless (scripts/dev/smoke.js, ~2 s)
 */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "components");
const RES = path.join(ROOT, "resources");
const resources = fs.existsSync(RES) ? fs.readdirSync(RES).filter((d) => fs.existsSync(path.join(RES, d, d + ".js"))).sort() : [];

const comps = fs.readdirSync(DIR).filter((d) => fs.existsSync(path.join(DIR, d, d + ".js"))).sort();
const deps = {};
for (const id of comps){
  const src = fs.readFileSync(path.join(DIR, id, id + ".js"), "utf8");
  const m = src.match(/@deps\s+([^\n*]+)/);
  if (!m) throw new Error(`components/${id}/${id}.js sem @deps no JSDoc`);
  deps[id] = m[1].trim() === "—" ? [] : m[1].trim().split(/\s+/);
  for (const d of deps[id]) if (!comps.includes(d)) throw new Error(`${id} depende de "${d}", que não existe em components/`);
}

// Ordenação topológica (Kahn) com desempate alfabético → saída estável
const order = [], indeg = {}, users = {};
comps.forEach((c) => { indeg[c] = deps[c].length; users[c] = []; });
comps.forEach((c) => deps[c].forEach((d) => users[d].push(c)));
const ready = comps.filter((c) => indeg[c] === 0);
while (ready.length){
  ready.sort();
  const c = ready.shift(); order.push(c);
  users[c].forEach((u) => { if (--indeg[u] === 0) ready.push(u); });
}
if (order.length !== comps.length) throw new Error("ciclo de dependências entre: " + comps.filter((c) => !order.includes(c)).join(", "));

// Lista única de arquivos (ordem de dependência): usada pelos pacotes
function files(){
  const css = order.filter((id) => fs.existsSync(path.join(DIR, id, id + ".css"))).map((id) => `components/${id}/${id}.css`)
    .concat(resources.filter((id) => fs.existsSync(path.join(RES, id, id + ".css"))).map((id) => `resources/${id}/${id}.css`));
  const js = [];
  order.forEach((id) => ["", ".playground", ".docs"].forEach((k) => { const f = `components/${id}/${id}${k}.js`; if (fs.existsSync(path.join(ROOT, f))) js.push(f); }));
  resources.forEach((id) => js.push(`resources/${id}/${id}.js`));
  return { css, js };
}
function bundle(){
  const f = files(), DIST = path.join(ROOT, "dist");
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
  const head = (n) => `/* GERADO por scripts/build-index.js · ${n} arquivos em ordem de dependência · não editar (o fonte é o arquivo de cada pasta) */\n`;
  fs.writeFileSync(path.join(DIST, "cds.css"), head(f.css.length) + f.css.map((r) => `/* ==== ${r} ==== */\n` + fs.readFileSync(path.join(ROOT, r), "utf8").trim()).join("\n\n") + "\n");
  fs.writeFileSync(path.join(DIST, "cds.js"), head(f.js.length) + f.js.map((r) =>
    `/* ==== ${r} ==== */\ntry {\n${fs.readFileSync(path.join(ROOT, r), "utf8").trim()}\n} catch (e) { console.error("[cds] ${r}", e); }`).join("\n\n") + "\n");
  return f;
}

function blocks(prefix){
  const css = order.filter((id) => fs.existsSync(path.join(DIR, id, id + ".css")))
    .map((id) => `<link rel="stylesheet" href="${prefix}components/${id}/${id}.css" />`)
    .concat(resources.filter((id) => fs.existsSync(path.join(RES, id, id + ".css"))).map((id) => `<link rel="stylesheet" href="${prefix}resources/${id}/${id}.css" />`))
    .join("\n");
  const js = order.map((id) => {
    const lines = [`<script src="${prefix}components/${id}/${id}.js"></script>`];
    if (fs.existsSync(path.join(DIR, id, id + ".playground.js"))) lines.push(`<script src="${prefix}components/${id}/${id}.playground.js"></script>`);
    if (fs.existsSync(path.join(DIR, id, id + ".docs.js"))) lines.push(`<script src="${prefix}components/${id}/${id}.docs.js"></script>`);
    return lines.join("\n");
  }).concat(resources.map((id) => `<script src="${prefix}resources/${id}/${id}.js"></script>`)).join("\n");
  return { css, js };
}

// ?v=hash em todo .js/.css local (caminhos relativos à raiz; o smoke.html usa <base href="../">)
const hashes = {};
function hashOf(rel){
  if (!(rel in hashes)){
    const f = path.join(ROOT, rel);
    hashes[rel] = fs.existsSync(f) ? crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex").slice(0, 8) : null;
  }
  return hashes[rel];
}
function stamp(html){
  return html.replace(/(["'])([\w./-]+\.(?:js|css))(?:\?v=[0-9a-f]+)?\1/g, (m, q, rel) => {
    const h = hashOf(rel);
    return h ? `${q}${rel}?v=${h}${q}` : m;
  });
}

function rewrite(file, prefix){
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) return false;
  let html = fs.readFileSync(abs, "utf8");
  const b = blocks(prefix);
  const put = (name, body) => {
    const re = new RegExp(`(<!-- @components:${name} -->)[\\s\\S]*?(<!-- /@components:${name} -->)`);
    if (!re.test(html)) throw new Error(`${file} sem os marcadores @components:${name}`);
    html = html.replace(re, `$1\n${body}\n$2`);
  };
  put("css", `<link rel="stylesheet" href="${prefix}dist/cds.css" />`); put("js", `<script src="${prefix}dist/cds.js"></script>`);
  html = stamp(html);
  fs.writeFileSync(abs, html);
  return true;
}

const bundled = bundle();
rewrite("index.html", "");
const smoke = rewrite("tests/smoke.html", ""); // smoke.html usa <base href="../">
console.log(`${order.length} componentes em ordem de dependência → index.html${smoke ? " + tests/smoke.html" : ""} · dist/cds.css (${bundled.css.length}) + dist/cds.js (${bundled.js.length})`);
console.log(order.map((id) => deps[id].length ? `${id} ← ${deps[id].join(", ")}` : id).join("\n"));

// ---------- Orçamento de peso (primeira visita) ----------
// Mede o que o index.html carrega (CSS e JS locais), comprimido como o GitHub Pages serve (gzip), e quebra o
// dist/cds.js por tipo. Passou do limite → aviso (o build não falha; BUDGET_STRICT=1 faz falhar, para CI).
// Medição de 05/10/2026: ~400 KB gzip, página pronta em ~0,85 s na rede e ~32 ms de JS (D118).
const BUDGET_KB = 600;
const zlib = require("zlib");
const gz = (buf) => zlib.gzipSync(buf, { level: 9 }).length;
const kb = (n) => (n / 1024).toFixed(0).padStart(5) + " KB";
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const loaded = [...indexHtml.matchAll(/(?:href|src)="([\w./-]+\.(?:js|css))(?:\?v=[0-9a-f]+)?"/g)].map((m) => m[1]).filter((r) => fs.existsSync(path.join(ROOT, r)));
let raw = 0, zip = 0;
loaded.forEach((r) => { const b = fs.readFileSync(path.join(ROOT, r)); raw += b.length; zip += gz(b); });
const parts = { "componentes": [], "playgrounds": [], "docs": [], "recursos": [] };
bundled.js.forEach((r) => parts[r.startsWith("resources/") ? "recursos" : r.endsWith(".docs.js") ? "docs" : r.endsWith(".playground.js") ? "playgrounds" : "componentes"].push(r));
console.log(`\nPeso da primeira visita (index.html): ${kb(raw).trim()} · gzip ${kb(zip).trim()} · limite ${BUDGET_KB} KB gzip`);
Object.keys(parts).forEach((k) => {
  const b = Buffer.concat(parts[k].map((r) => fs.readFileSync(path.join(ROOT, r))));
  console.log(`  dist/cds.js · ${k.padEnd(12)} ${kb(b.length)} · gzip ${kb(gz(b))} · ${parts[k].length} arquivos`);
});
if (zip / 1024 > BUDGET_KB){
  console.warn(`⚠️  Passou do orçamento: ${kb(zip).trim()} gzip > ${BUDGET_KB} KB. Próximo passo planejado: docs sob demanda (carregar *.docs.js só ao abrir a tab).`);
  if (process.env.BUDGET_STRICT === "1") process.exit(1);
}

// --smoke: roda o smoke no Chrome headless logo depois do build (scripts/dev/smoke.js). Falha do smoke = build com código 1
if (process.argv.includes("--smoke")){
  console.log("");
  const r = require("child_process").spawnSync(process.execPath, [path.join(__dirname, "dev", "smoke.js")].concat(process.argv.includes("--avisos") ? ["--avisos"] : []), { stdio: "inherit" });
  if (r.status === 1) process.exit(1);
}
