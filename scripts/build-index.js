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
 * Composições (compositions/<id>/<id>.js + .css e .playground.js opcionais) entram entre os dois: peças do
 * playground montadas só com tokens/componentes do DS onde o DS ainda não tem o componente (ex.: Card clicável).
 * Componentes locais (local/<id>/<id>.js + .css opcional) vêm logo depois das composições: peças feitas com tokens do DS
 * usadas só no playground, sem a intenção de virar componente (ex.: <loc-pilha>; doc escondida em #/locais).
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
const CMP = path.join(ROOT, "compositions");
const LOC = path.join(ROOT, "local");
const SVC = path.join(ROOT, "services"); // serviços (D313): lógica e estado sem UI própria, ex.: services/onboarding
const services = fs.existsSync(SVC) ? fs.readdirSync(SVC).filter((d) => fs.existsSync(path.join(SVC, d, d + ".js"))).sort() : [];
// arquivos de um serviço na ordem: o motor (<id>.js), os fluxos (flows/*.flow.js) e a página (<id>.page.js)
function serviceFiles(id){
  const flows = path.join(SVC, id, "flows"), out = [`services/${id}/${id}.js`];
  if (fs.existsSync(flows)) fs.readdirSync(flows).filter((f) => f.endsWith(".flow.js")).sort().forEach((f) => out.push(`services/${id}/flows/${f}`));
  if (fs.existsSync(path.join(SVC, id, id + ".page.js"))) out.push(`services/${id}/${id}.page.js`);
  return out;
}
const locals = fs.existsSync(LOC) ? fs.readdirSync(LOC).filter((d) => fs.existsSync(path.join(LOC, d, d + ".js"))).sort() : [];
const compositions = fs.existsSync(CMP) ? fs.readdirSync(CMP).filter((d) => fs.existsSync(path.join(CMP, d, d + ".js"))).sort() : [];
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
    .concat(compositions.filter((id) => fs.existsSync(path.join(CMP, id, id + ".css"))).map((id) => `compositions/${id}/${id}.css`))
    .concat(locals.filter((id) => fs.existsSync(path.join(LOC, id, id + ".css"))).map((id) => `local/${id}/${id}.css`))
    .concat(services.filter((id) => fs.existsSync(path.join(SVC, id, id + ".css"))).map((id) => `services/${id}/${id}.css`))
    .concat(resources.filter((id) => fs.existsSync(path.join(RES, id, id + ".css"))).map((id) => `resources/${id}/${id}.css`));
  const js = [];
  // Docs dos componentes ficam fora do pacote: o shell carrega cada uma ao abrir o componente (docsIndex, D124)
  order.forEach((id) => ["", ".playground"].forEach((k) => { const f = `components/${id}/${id}${k}.js`; if (fs.existsSync(path.join(ROOT, f))) js.push(f); }));
  compositions.forEach((id) => ["", ".playground"].forEach((k) => { const f = `compositions/${id}/${id}${k}.js`; if (fs.existsSync(path.join(ROOT, f))) js.push(f); }));
  locals.forEach((id) => js.push(`local/${id}/${id}.js`));
  services.forEach((id) => serviceFiles(id).forEach((f) => js.push(f)));
  resources.forEach((id) => js.push(`resources/${id}/${id}.js`));
  return { css, js };
}
function bundle(){
  const f = files(), DIST = path.join(ROOT, "dist");
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
  const head = (n) => `/* GERADO por scripts/build-index.js · ${n} arquivos em ordem de dependência · não editar (o fonte é o arquivo de cada pasta) */\n`;
  fs.writeFileSync(path.join(DIST, "cds.css"), head(f.css.length) + f.css.map((r) => `/* ==== ${r} ==== */\n` + fs.readFileSync(path.join(ROOT, r), "utf8").trim()).join("\n\n") + "\n");
  fs.writeFileSync(path.join(DIST, "cds.js"), head(f.js.length) + f.js.map((r) =>
    `/* ==== ${r} ==== */\ntry {\n${fs.readFileSync(path.join(ROOT, r), "utf8").trim()}\n} catch (e) { console.error("[cds] ${r}", e); }`).join("\n\n") + "\n" + docsIndex() + searchIndex(DIST));
  publicBundle(DIST, head);
  // Modo entrega (docs/PLANO-ACESSO.md): o mesmo pacote sem os recursos (Início, Treinamento, Padrões…), o onboarding e o
  // índice da busca. No Vercel, quem entra só por link de entrega recebe este arquivo no lugar do dist/cds.js (middleware.js).
  const ent = f.js.filter((r) => !/^(resources|services)\//.test(r));
  fs.writeFileSync(path.join(DIST, "cds-entrega.js"), head(ent.length) + ent.map((r) =>
    `/* ==== ${r} ==== */\ntry {\n${fs.readFileSync(path.join(ROOT, r), "utf8").trim()}\n} catch (e) { console.error("[cds] ${r}", e); }`).join("\n\n") + "\n" + docsIndex());
  return f;
}

// Pacote público (plano de acesso, docs/PLANO-ACESSO.md): os componentes do DS e nada mais, sem playgrounds, recursos,
// serviços nem índices de docs. É o que as páginas abertas (pitch e entrada) carregam, para o conteúdo do portal
// ficar atrás da senha no Vercel.
function publicBundle(DIST, head){
  // + os componentes locais (loc-*, ex.: a pilha e o banner do Castanha Assets que o pitch usa): visual, sem conteúdo de docs
  const css = order.filter((id) => fs.existsSync(path.join(DIR, id, id + ".css"))).map((id) => `components/${id}/${id}.css`)
    .concat(locals.filter((id) => fs.existsSync(path.join(LOC, id, id + ".css"))).map((id) => `local/${id}/${id}.css`));
  const js = order.map((id) => `components/${id}/${id}.js`).concat(locals.map((id) => `local/${id}/${id}.js`));
  fs.writeFileSync(path.join(DIST, "cds-publico.css"), head(css.length) + css.map((r) => `/* ==== ${r} ==== */\n` + fs.readFileSync(path.join(ROOT, r), "utf8").trim()).join("\n\n") + "\n");
  fs.writeFileSync(path.join(DIST, "cds-publico.js"), head(js.length) + js.map((r) =>
    `/* ==== ${r} ==== */\ntry {\n${fs.readFileSync(path.join(ROOT, r), "utf8").trim()}\n} catch (e) { console.error("[cds] ${r}", e); }`).join("\n\n") + "\n");
}

// Busca no conteúdo (D209): dist/search.json, baixado pelo shell só na primeira busca
function searchIndex(DIST){
  const r = require("./search-index.js")(ROOT), json = JSON.stringify(r.items);
  fs.writeFileSync(path.join(DIST, "search.json"), json + "\n");
  r.errors.forEach((e) => console.warn("⚠️ busca: doc que não entrou no índice · " + e));
  const v = crypto.createHash("sha1").update(json).digest("hex").slice(0, 8);
  return "CDS.searchIndex = " + JSON.stringify("dist/search.json?v=" + v) + "; /* " + r.items.length + " seções */\n";
}

// Índice das docs (fim do dist/cds.js): id → arquivo com ?v=hash e as docs de que ela depende
// (uma doc que lê CDS.docs["outra"], ex.: Scrollable Tab reaproveita Fixed Tab). O shell carrega sob demanda.
let DOCS_IDX = {};
function docsIndex(){
  const idx = {};
  order.forEach((id) => {
    const rel = `components/${id}/${id}.docs.js`, abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) return;
    const src = fs.readFileSync(abs, "utf8");
    // a chave é o id que a doc define (= id do playground); a pasta pode ter outro nome (filter-chip → filter-chips) ou várias docs (selection-group)
    const own = [...new Set([...src.matchAll(/CDS\.docs\["([\w-]+)"\]\s*=(?!=)/g)].map((m) => m[1]))];
    if (!own.length) own.push(id);
    const needs = [...new Set([...src.matchAll(/CDS\.docs\["([\w-]+)"\]/g)].map((m) => m[1]).filter((d) => !own.includes(d)))];
    const file = { src: rel + "?v=" + crypto.createHash("sha1").update(src).digest("hex").slice(0, 8) };
    if (needs.length) file.needs = needs;
    // Descrição curta (cover.description) de cada doc: o menu em grade mostra no hover sem carregar a doc
    const at = own.map((d) => { const m = src.match(new RegExp('CDS\\.docs\\["' + d + '"\\]\\s*=(?!=)')); return m ? m.index : 0; });
    own.forEach((d, i) => {
      const end = Math.min(...at.filter((x) => x > at[i]).concat(src.length));
      // cover: { description: "…" } ou, em docs geradas por helper (ex.: selection-group), cover: "…"
      const m = src.slice(at[i], end).match(/cover:\s*(?:\{\s*description:\s*)?"((?:[^"\\]|\\.)*)"/);
      idx[d] = m ? Object.assign({}, file, { desc: JSON.parse('"' + m[1] + '"') }) : file;
    });
  });
  DOCS_IDX = idx; // as entregas (modo entrega) leem daqui os arquivos de doc de cada item
  return "\n/* ==== docs sob demanda (gerado) ==== */\nwindow.CDS = window.CDS || {}; CDS.docsIndex = " + JSON.stringify(idx) + ";\n";
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
// Lint de conteúdo dos fluxos do onboarding (scripts/dev/lint-onboarding.js): erro reprova o build
{
  const onb = require("./dev/lint-onboarding.js")(ROOT);
  onb.warnings.forEach((w) => console.warn("⚠️ onboarding: " + w));
  onb.errors.forEach((e) => console.error("❌ onboarding: " + e));
  if (onb.errors.length) process.exitCode = 1;
  else if (onb.flows.length) console.log("Onboarding: " + onb.flows.length + " fluxo(s) dentro das regras de conteúdo");
}
rewrite("index.html", "");
const smoke = rewrite("tests/smoke.html", ""); // smoke.html usa <base href="../">
// MCP: catálogo do Castanha DS (dist/mcp/catalog.json) — fonte do servidor MCP (docs/local/PLANO-MCP.md). Só grava se o conteúdo mudou.
const mcpCatalog = require("./mcp/build-catalog").write();
const mcpBundle = require("./mcp/bundle").write(); // arquivo único do MCP (dist/mcp/castanha-mcp.js): servidor + gerador de JSX + núcleo do react-kit
console.log(`${order.length} componentes em ordem de dependência → index.html${smoke ? " + tests/smoke.html" : ""} · dist/cds.css (${bundled.css.length}) + dist/cds.js (${bundled.js.length})`);
console.log(order.map((id) => deps[id].length ? `${id} ← ${deps[id].join(", ")}` : id).join("\n"));
console.log(`MCP: dist/mcp/castanha-mcp.js${mcpBundle.changed ? " (atualizado)" : ""} · ${Math.round(mcpBundle.bytes / 1024)} KB`);
console.log(`Catálogo do MCP: dist/mcp/catalog.json${mcpCatalog.changed ? " (atualizado)" : " (sem mudança)"} · ${mcpCatalog.counts.components} componentes · ${mcpCatalog.counts.tokens} tokens · ${mcpCatalog.counts.icons} ícones · ${mcpCatalog.counts.illustrations} ilustrações`);

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
bundled.js.forEach((r) => parts[r.startsWith("resources/") || r.startsWith("compositions/") || r.startsWith("local/") || r.startsWith("services/") ? "recursos" : r.endsWith(".playground.js") ? "playgrounds" : "componentes"].push(r));
delete parts.docs;
console.log(`\nPeso da primeira visita (index.html): ${kb(raw).trim()} · gzip ${kb(zip).trim()} · limite ${BUDGET_KB} KB gzip`);
Object.keys(parts).forEach((k) => {
  const b = Buffer.concat(parts[k].map((r) => fs.readFileSync(path.join(ROOT, r))));
  console.log(`  dist/cds.js · ${k.padEnd(12)} ${kb(b.length)} · gzip ${kb(gz(b))} · ${parts[k].length} arquivos`);
});
const lazy = order.map((id) => `components/${id}/${id}.docs.js`).filter((r) => fs.existsSync(path.join(ROOT, r)));
const lazyZip = lazy.reduce((t, r) => t + gz(fs.readFileSync(path.join(ROOT, r))), 0);
console.log(`  docs sob demanda (fora do pacote)       ${lazy.length} arquivos · gzip ${kb(lazyZip).trim()} no total · uma por componente aberto`);
if (zip / 1024 > BUDGET_KB){
  console.warn(`⚠️  Passou do orçamento: ${kb(zip).trim()} gzip > ${BUDGET_KB} KB. As docs já são sob demanda: ver o que mais cresceu acima.`);
  if (process.env.BUDGET_STRICT === "1") process.exit(1);
}

// --smoke: roda o smoke no Chrome headless logo depois do build (scripts/dev/smoke.js). Falha do smoke = build com código 1
let smokeStatus = null;
if (process.argv.includes("--smoke")){
  console.log("");
  const r = require("child_process").spawnSync(process.execPath, [path.join(__dirname, "dev", "smoke.js")].concat(process.argv.includes("--avisos") ? ["--avisos"] : []), { stdio: "inherit" });
  smokeStatus = r.status;
}

// ---------- Painel de saúde (docs/SAUDE-TECNICA.md → tab "Saúde técnica" do relatório) ----------
// Junta o último smoke (tests/ultimo-smoke.json, gravado pelo scripts/dev/smoke.js) e o peso da primeira visita.
// A numeração D/C fica fora do site (pedido do Gustavo, 06/10): segue no CI e no numerar.js --check. Sem horário nem duração: o arquivo só muda quando algum resultado muda.
(function saude(){
  const rel = (f) => path.join(ROOT, f);
  const sm = fs.existsSync(rel("tests/ultimo-smoke.json")) ? JSON.parse(fs.readFileSync(rel("tests/ultimo-smoke.json"), "utf8")) : null;
  const ok = (b) => (b ? "✅" : "❌"), warn = (n) => (n ? " · ⚠️ " + n + " com aviso" : "");
  const esc = (t) => String(t).replace(/\|/g, "\\|");
  const zipKb = Math.round(zip / 1024), L = [];
  L.push("# Saúde técnica", "", "> Gerado por `node scripts/build-index.js` (o smoke entra com `--smoke`). Não editar à mão: regere o build.", "");
  L.push("## Resumo", "", "| Verificação | Resultado |", "|---|---|");
  if (sm){
    const c = sm.componentes, d = sm.docs;
    L.push(`| Smoke dos componentes (claro, escuro, mobile 360) | ${ok(!c.falhas.length)} ${c.ok}/${c.total} ok${warn(c.avisos.length)} |`);
    L.push(d ? `| Smoke das docs (desktop e 375px) | ${ok(!d.falhas.length)} ${d.docs} docs · ${d.tabs} tabs · ${d.falhas.length} com problema${warn(d.avisos.length)} |` : "| Smoke das docs | — (rodado com `--sem-docs`) |");
  } else L.push("| Smoke | — ainda não rodado (`node scripts/build-index.js --smoke`) |");
  L.push(`| Peso da primeira visita | ${ok(zipKb <= BUDGET_KB)} ${zipKb} KB gzip de ${BUDGET_KB} KB · docs sob demanda: ${lazy.length} arquivos |`);
  if (sm){
    const list = (title, falhas, avisos, label) => {
      L.push("## " + title, "");
      if (falhas.length){ L.push("**Falhas**", "", "| " + label + " | Problema |", "|---|---|"); falhas.forEach((f) => L.push(`| ${f.id} | ${esc(f.errors.join(" · "))} |`)); L.push(""); }
      else L.push("Nenhuma falha.", "");
      if (avisos.length){ L.push("**Avisos** (não reprovam; os do DS estão no CONFERIR)", "", "| " + label + " | Aviso |", "|---|---|"); avisos.forEach((w) => L.push(`| ${w.id} | ${esc(w.warnings.join(" · "))} |`)); L.push(""); }
      else L.push("Nenhum aviso.", "");
    };
    list("Componentes", sm.componentes.falhas, sm.componentes.avisos, "Componente");
    if (sm.docs) list("Docs", sm.docs.falhas, sm.docs.avisos, "Doc");
  }
  L.push("## Peso", "", "| Parte | Bruto | gzip |", "|---|---|---|", `| Primeira visita (tudo o que o index.html carrega) | ${kb(raw).trim()} | ${kb(zip).trim()} |`);
  Object.keys(parts).forEach((k) => { const b = Buffer.concat(parts[k].map((r) => fs.readFileSync(rel(r)))); L.push(`| dist/cds.js · ${k} (${parts[k].length} arquivos) | ${kb(b.length).trim()} | ${kb(gz(b)).trim()} |`); });
  L.push(`| Docs sob demanda (${lazy.length} arquivos, uma por componente aberto) | — | ${kb(lazyZip).trim()} no total |`, "", `Limite: ${BUDGET_KB} KB gzip na primeira visita (aviso no build; \`BUDGET_STRICT=1\` faz falhar).`, "");
  L.push("## Como rodar", "", "```", "node scripts/build-index.js --smoke     # build + smoke (componentes e docs) + este painel", "node scripts/dev/smoke.js --avisos      # só o smoke, listando os avisos", "```", "", "O GitHub roda o mesmo em todo push na `teste` e na `main` (aba Actions).", "");
  const out = L.join("\n"), file = rel("docs/SAUDE-TECNICA.md");
  if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== out){ fs.writeFileSync(file, out); console.log("Painel de saúde atualizado: docs/SAUDE-TECNICA.md"); }
})();
// ---------- Números do pitch (docs/pitch/dados.json, aberto para quem não tem senha; plano de acesso) ----------
// As mesmas contas que o pitch fazia no navegador lendo o ROADMAP e a Saúde técnica, que ficam atrás da senha no Vercel.
(function(){
  const rel = (f) => path.join(ROOT, f);
  try {
    const cat = JSON.parse(fs.readFileSync(rel("dist/mcp/catalog.json"), "utf8"));
    const road = fs.readFileSync(rel("docs/ROADMAP.md"), "utf8"), saude = fs.readFileSync(rel("docs/SAUDE-TECNICA.md"), "utf8");
    const sec = (n) => road.split(/\n(?=## )/).filter((x) => new RegExp("^## " + n + "\\.").test(x))[0] || "";
    let variants = 0;
    sec(2).split("\n").forEach((l) => {
      if (!/^\|/.test(l) || /^\|\s*:?-{3,}|^\|\s*(Página|Componente)\s*\|/.test(l)) return;
      const c = l.split("|").slice(1, -1).map((x) => x.trim()), v = c[c.length - 2] || "";
      v.split("/").forEach((x) => { const n = parseInt(x, 10); if (!isNaN(n)) variants += n; });
    });
    const sm = saude.match(/(\d+)\/(\d+) ok/), dc = saude.match(/(\d+) docs · (\d+) tabs/);
    const out = { comps: cat.components.filter((c) => c.kind === "component" && c.category).length, blocks: cat.components.filter((c) => c.kind === "building-block").length,
      variants, decisions: sec(4).split("\n").filter((l) => /^\|\s*D\d+\b/.test(l)).length, smoke: sm ? Number(sm[2]) : null, docs: dc ? Number(dc[1]) : null, tabs: dc ? Number(dc[2]) : null };
    const json = JSON.stringify(out) + "\n", file = rel("docs/pitch/dados.json");
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== json){ fs.writeFileSync(file, json); console.log("Números do pitch: docs/pitch/dados.json"); }
  } catch (e) { console.warn("⚠️ docs/pitch/dados.json não gerado: " + e.message); }
})();
// ---------- Entregas para dev (modo entrega; docs/PLANO-ACESSO.md, fase 3) ----------
// Cada pasta entregas/<slug>/ tem entrega.json (título, task, resumo e itens = ids das páginas do portal) e handoff.md.
// Gera: entregas/<slug>/entrega.js (página inicial da entrega com o handoff em blocos da doc), a lista da tela de links
// (acesso/links/paginas.json) e, dentro do middleware.js, as docs que cada entrega libera para quem entra pelo link.
(function(){
  const rel = (f) => path.join(ROOT, f), DIR_E = rel("entregas");
  // Markdown do handoff → blocos do docs-kit (h2, h3, p, ul, ol, table, code, alert) e checklist (montado por scripts/entrega.js)
  function url(u){ return /figma\.com\/.*\/branch\//.test(u) ? "Figma · branch" : /figma\.com/.test(u) ? "Figma" : u.replace(/^https?:\/\/(www\.)?/, "").replace(/[/?].*$/, ""); }
  function inline(t){
    return String(t).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1$2")
      .replace(/(^|[^(\]])(https?:\/\/[^\s)]+)/g, (m, a, u) => a + "[" + url(u) + "](" + u + ")").trim();
  }
  function cells(l){ return l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => inline(c.trim())); }
  function blocos(md){
    const L = md.replace(/\r/g, "").split("\n"), out = []; let i = 0;
    while (i < L.length){
      const l = L[i];
      if (!l.trim() || /^---+\s*$/.test(l) || /^#\s/.test(l)){ i++; continue; }
      if (/^```/.test(l)){ const c = []; i++; while (i < L.length && !/^```/.test(L[i])) c.push(L[i++]); i++; out.push({ code: c.join("\n") }); continue; }
      if (/^>/.test(l)){
        const q = []; while (i < L.length && /^>/.test(L[i])) q.push(L[i++].replace(/^>\s?/, ""));
        const t = q.filter((x) => x.trim()).map(inline);
        // o primeiro bloco de citação é o resumo do handoff; os outros são notas dentro das seções
        out.push({ alert: Object.assign({ appearance: "informative", text: t[0] || "" }, out.length ? {} : { label: "Resumo" }) });
        if (t.length > 1) out.push({ ul: t.slice(1) });
        continue;
      }
      let m;
      if ((m = l.match(/^##\s+(.*)$/))){ out.push({ h2: inline(m[1]) }); i++; continue; }
      if ((m = l.match(/^#{3,}\s+(.*)$/))){ out.push({ h3: inline(m[1]) }); i++; continue; }
      if (/^\|/.test(l) && /^\|?\s*:?-{3,}/.test(L[i + 1] || "")){
        const head = cells(l), rows = []; i += 2;
        while (i < L.length && /^\|/.test(L[i])) rows.push(cells(L[i++]));
        out.push({ table: { head, rows, wrap: true } }); continue;
      }
      if (/^\s*[-*]\s+\[[ xX]\]\s+/.test(l)){
        const items = []; while (i < L.length && /^\s*[-*]\s+\[[ xX]\]\s+/.test(L[i])) items.push(inline(L[i++].replace(/^\s*[-*]\s+\[[ xX]\]\s+/, "")));
        out.push({ checklist: items }); continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(l)){
        const ol = /^\s*\d+\./.test(l), items = [];
        while (i < L.length && /^\s*([-*]|\d+\.)\s+/.test(L[i]) && !/^\s*[-*]\s+\[[ xX]\]/.test(L[i])) items.push(inline(L[i++].replace(/^\s*([-*]|\d+\.)\s+/, "")));
        out.push(ol ? { ol: items } : { ul: items }); continue;
      }
      const p = [l.trim()]; i++;
      while (i < L.length && L[i].trim() && !/^(#|>|\||```|\s*[-*]\s|\s*\d+\.\s|---)/.test(L[i])) p.push(L[i++].trim());
      out.push({ p: inline(p.join(" ")) });
    }
    return out;
  }
  try {
    const cat = JSON.parse(fs.readFileSync(rel("dist/mcp/catalog.json"), "utf8")), byId = {};
    cat.components.forEach((c) => { byId[c.id] = c; });
    // docs que um item abre: a dele e as de que ela depende (ex.: Scrollable Tab lê a doc do Fixed Tab)
    function docs(id, acc){ const ix = DOCS_IDX[id]; if (!ix || acc.has(ix.src)) return acc; acc.add(ix.src.replace(/\?.*$/, "")); (ix.needs || []).forEach((d) => docs(d, acc)); return acc; }
    const lista = [], mapa = {};
    (fs.existsSync(DIR_E) ? fs.readdirSync(DIR_E) : []).filter((d) => /^[a-z0-9-]+$/.test(d) && fs.existsSync(rel("entregas/" + d + "/entrega.json"))).sort().forEach((slug) => {
      const e = JSON.parse(fs.readFileSync(rel("entregas/" + slug + "/entrega.json"), "utf8"));
      const falta = e.itens.filter((id) => !byId[id]);
      if (falta.length) throw new Error("entregas/" + slug + ": itens que não existem no portal: " + falta.join(", "));
      const md = rel("entregas/" + slug + "/handoff.md"), handoff = fs.existsSync(md) ? blocos(fs.readFileSync(md, "utf8")) : [];
      const itens = e.itens.map((id) => ({ id, name: byId[id].name, block: byId[id].kind === "building-block", description: byId[id].description || "" }));
      const dados = { slug, titulo: e.titulo, task: e.task, resumo: e.resumo, itens, handoff };
      const js = "/* GERADO por scripts/build-index.js a partir de entregas/" + slug + "/entrega.json e handoff.md · não editar */\n" +
        "window.CDS && CDS.entregaDados && CDS.entregaDados(" + JSON.stringify(dados) + ");\n";
      const file = rel("entregas/" + slug + "/entrega.js");
      if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== js){ fs.writeFileSync(file, js); console.log("Entrega: entregas/" + slug + "/entrega.js"); }
      lista.push({ caminho: "/entregas/" + slug + "/", titulo: e.titulo + " · " + e.task, tipo: "Entrega" });
      mapa[slug] = [...e.itens.reduce((acc, id) => docs(id, acc), new Set())].sort();
    });
    const json = JSON.stringify(lista, null, 1) + "\n", pj = rel("acesso/links/paginas.json");
    fs.mkdirSync(path.dirname(pj), { recursive: true });
    if (!fs.existsSync(pj) || fs.readFileSync(pj, "utf8") !== json){ fs.writeFileSync(pj, json); console.log("Entregas com link: acesso/links/paginas.json"); }
    // middleware.js: o bloco entre as marcas é gerado aqui (o middleware não lê arquivos do site)
    const mw = rel("middleware.js"), src = fs.readFileSync(mw, "utf8");
    const bloco = "// <entregas> gerado por scripts/build-index.js a partir de entregas/*/entrega.json: as docs que cada entrega libera\nconst ENTREGAS = " + JSON.stringify(mapa) + ";\n// </entregas>";
    const novo = src.replace(/\/\/ <entregas>[\s\S]*?\/\/ <\/entregas>/, bloco);
    if (novo !== src){ fs.writeFileSync(mw, novo); console.log("Entregas no middleware.js"); }
    alvos(cat, docs);
  } catch (e) { console.warn("⚠️ entregas não geradas: " + e.message); }

  // ---------- Links de página (acesso/paginas/, D341) ----------
  // Um link abre um alvo: um componente (com as docs de que ele depende), uma página (o arquivo de resources/ que a
  // registra), uma seção do menu (scripts/menu-secoes.js) ou uma categoria de componentes. Gera acesso/alvos.js (o portal
  // em modo link e a tela de links leem) e, dentro do middleware.js, os arquivos que cada alvo libera.
  function alvos(cat, docs){
    const out = {}, arq = {};
    const comps = cat.components.filter((c) => c.kind === "component" || c.kind === "building-block");
    // página → arquivo: o id registrado com CDS.register({ id: "…" }) ou, nas páginas montadas em laço
    // (Desenvolvimento), o "id": "…" dos dados do arquivo
    const resFiles = resources.map((id) => ({ id, rel: `resources/${id}/${id}.js`, src: fs.readFileSync(path.join(RES, id, id + ".js"), "utf8") }));
    function arquivoDa(pid){
      const f = resFiles.find((r) => new RegExp('CDS\\.register\\(\\{\\s*id:\\s*"' + pid + '"').test(r.src))
        || resFiles.find((r) => /CDS\.register\(\{\s*id:\s*p\.id/.test(r.src) && r.src.includes('"id": "' + pid + '"'));
      if (!f) throw new Error("links de página: a página " + pid + " não tem arquivo em resources/");
      const css = `resources/${f.id}/${f.id}.css`;
      return [f.rel].concat(fs.existsSync(path.join(ROOT, css)) ? [css] : []);
    }
    const FORA = ["inicio", "locais", "nao-encontrada"]; // Início e páginas escondidas não abrem por link
    const paginas = cat.components.filter((c) => c.kind === "resource" && FORA.indexOf(c.id) < 0);
    function add(chave, titulo, tipo, ids, recursos){
      const files = new Set(recursos);
      ids.forEach((id) => docs(id, new Set()).forEach((d) => files.add(d)));
      out[chave] = { titulo, tipo, ids, recursos: recursos.filter((r) => /\.js$/.test(r)) };
      arq[chave] = [...files].sort();
    }
    comps.forEach((c) => add("componente:" + c.id, c.name, c.kind === "building-block" ? "Building block" : c.category ? "Componente" : "Template", [c.id], []));
    paginas.forEach((c) => add("pagina:" + c.id, c.name, "Página", [c.id], arquivoDa(c.id)));
    const sandbox = { window: {} }; sandbox.window.CDS = {}; sandbox.CDS = sandbox.window.CDS;
    require("vm").runInNewContext(fs.readFileSync(rel("scripts/menu-secoes.js"), "utf8"), sandbox);
    (sandbox.CDS.menuSecoes || []).forEach((sec) => {
      const ids = sec.ids.filter((id) => paginas.some((c) => c.id === id));
      if (ids.length) add("secao:" + sec.id, sec.title, "Seção do menu", ids, [...new Set(ids.flatMap(arquivoDa))]);
    });
    const slug = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    [...new Set(comps.filter((c) => c.kind === "component" && c.category).map((c) => c.category))].sort().forEach((k) =>
      add("categoria:" + slug(k), k, "Categoria", comps.filter((c) => c.kind === "component" && c.category === k).map((c) => c.id), []));
    add("categoria:building-blocks", "Building blocks", "Categoria", comps.filter((c) => c.kind === "building-block").map((c) => c.id), []);
    const tpl = comps.filter((c) => c.kind === "component" && !c.category).map((c) => c.id);
    if (tpl.length) add("categoria:templates", "Templates", "Categoria", tpl, []);
    const js = "/* GERADO por scripts/build-index.js · alvos dos links de página (acesso/paginas/) · não editar */\n" +
      "window.CDS = window.CDS || {}; CDS.alvos = " + JSON.stringify(out) + ";\nCDS.alvosProntos && CDS.alvosProntos(); // modo link (scripts/entrega.js)\n";
    const file = rel("acesso/alvos.js");
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== js){ fs.writeFileSync(file, js); console.log("Links de página: acesso/alvos.js (" + Object.keys(out).length + " alvos)"); }
    const mw = rel("middleware.js"), src = fs.readFileSync(mw, "utf8");
    const bloco = "// <alvos> gerado por scripts/build-index.js: os arquivos que cada alvo de link de página libera\nconst ALVOS = " + JSON.stringify(arq) + ";\n// </alvos>";
    const novo = /\/\/ <alvos>[\s\S]*?\/\/ <\/alvos>/.test(src) ? src.replace(/\/\/ <alvos>[\s\S]*?\/\/ <\/alvos>/, bloco) : src.replace("// </entregas>", "// </entregas>\n" + bloco);
    if (novo !== src){ fs.writeFileSync(mw, novo); console.log("Alvos no middleware.js"); }
  }
})();
// ---------- Tendência (docs/tendencia.json → painel "Tendência" do relatório) ----------
// Um ponto por dia fechado, lido do git. Muda uma vez por dia; no clone raso do CI não mexe no arquivo.
try { require("child_process").spawnSync(process.execPath, [path.join(__dirname, "dev", "tendencia.js")], { stdio: "inherit" }); } catch (e) {}
if (smokeStatus === 1) process.exit(1);
