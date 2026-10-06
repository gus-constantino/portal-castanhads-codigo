#!/usr/bin/env node
/**
 * M0 · Catálogo do Castanha DS para o MCP (docs/local/PLANO-MCP.md).
 *
 *   node scripts/mcp/build-catalog.js            gera dist/mcp/catalog.json (também roda no fim do scripts/build-index.js)
 *   node scripts/mcp/build-catalog.js --check    só confere se o arquivo commitado está em dia (sai com 1 se não)
 *
 * Junta num arquivo só, sem DOM e sem rede, o que o playground já tem:
 *   componentes, recursos e composições (CDS.register) · docs de cada tab em texto (CDS.docs, *.docs.js e resources/)
 *   status de publicação no Figma (scripts/figma-status.js) · props do Figma (integration/figma-props.tsv)
 *   castanha-react: componente, import, props e tipos, mapa Figma → React, checks (integration/react-data.js)
 *   tokens claro/escuro, alias --castanha-*, text styles e Motion Styles (styles/tokens.css)
 *   ícones e ilustrações com palavras-chave e o nome no pacote (scripts/assets-manifest.js + integration/assets-react.js)
 *   divergências: CONFERIR (docs/CONFERIR.md) e check da stack (integration/stack-check.json)
 * Determinístico: sem data nem hash de commit, para o arquivo só mudar quando o conteúdo muda (a CI compara o build).
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "dist", "mcp", "catalog.json");
const rel = (p) => path.join(ROOT, p);
const read = (p) => fs.readFileSync(rel(p), "utf8");
const exists = (p) => fs.existsSync(rel(p));

// ---------- carga dos .js do playground num contexto sem DOM ----------
function loadPlayground(){
  const reg = [];
  const ctx = { console: { log(){}, warn(){}, error(){} }, location: { hash: "", replace(){} }, addEventListener(){}, document: {}, setTimeout(){}, matchMedia(){ return { matches: false, addEventListener(){} }; } };
  ctx.window = ctx;
  ctx.CDS = { docs: {}, kit: {}, register(d){ reg.push(d); } };
  vm.createContext(ctx);
  const run = (f) => { try { vm.runInContext(read(f), ctx, { filename: f }); } catch (e) { /* classes de custom element: não importam para o catálogo */ } };
  ["scripts/assets-manifest.js", "scripts/figma-status.js", "integration/react-data.js", "integration/assets-react.js"].forEach((f) => { if (exists(f)) run(f); });
  ["components", "compositions", "resources", "templates"].forEach((top) => {
    if (!exists(top)) return;
    fs.readdirSync(rel(top)).sort().forEach((d) => {
      const dir = path.join(top, d);
      if (!fs.statSync(rel(dir)).isDirectory()) return;
      fs.readdirSync(rel(dir)).sort().filter((f) => /\.(playground|docs)\.js$/.test(f) || (top === "resources" && f === d + ".js")).forEach((f) => run(path.join(dir, f)));
    });
  });
  return { reg, CDS: ctx.CDS };
}

// ---------- docs em texto (markdown simples) ----------
const S = (v) => (v == null ? "" : String(v));
function attrsText(a){
  // exemplos montados com componentes: só o que é texto visível (label, text, title…)
  const out = [];
  (function walk(x){
    if (!x || typeof x !== "object") return;
    if (Array.isArray(x)){ x.forEach(walk); return; }
    ["label", "text", "_text", "title", "description", "placeholder", "text-title", "primary-label", "secondary-label"].forEach((k) => { if (typeof x[k] === "string" && x[k].trim()) out.push(x[k].trim()); });
    if (x._children) walk(x._children);
  })(a);
  return Array.from(new Set(out)).join(" · ");
}
const BLOCK = {
  h2: (v) => "## " + v, h3: (v) => "### " + v, p: (v) => S(v), note: (v) => "> " + v,
  ul: (v) => v.map((x) => "- " + (Array.isArray(x) ? x.join(" — ") : x)).join("\n"),
  ol: (v) => v.map((x, i) => (i + 1) + ". " + (Array.isArray(x) ? x.join(" — ") : x)).join("\n"),
  cards: (v) => v.map((c) => "- **" + c[0] + "** — " + c[1]).join("\n"),
  alert: (v) => "> **" + (v.label || v.appearance || "Aviso") + ":** " + S(v.text),
  props: (v) => v.map((p) => "- **" + p.name + "** (" + (p.type || "") + ")" + (p.values ? ": " + p.values.join(", ") : "") +
    (p.nested ? "\n" + p.nested.map((n) => "  - " + n.name + " (" + (n.type || "") + ")" + (n.values ? ": " + n.values.join(", ") : "")).join("\n") : "")).join("\n"),
  specimens: (v) => "**" + (v.title || "Exemplos") + ":** " + v.items.map((i) => i.label).join(", "),
  guides: (v) => v.map((g) => "- **" + g.title + "** — " + S(g.text)).join("\n"),
  dodont: (v) => v.map((d) => (d.kind === "do" ? "- ✅ Faça: " : "- ❌ Evite: ") + S(d.text) + (attrsText(d.attrs) ? " (exemplo: " + attrsText(d.attrs) + ")" : "")).join("\n"),
  display: (v) => attrsText(v.attrs) ? "Exemplo: " + attrsText(v.attrs) : "",
  compare: (v) => v.map((c) => "- " + S(c.title) + (attrsText(c.attrs) ? " (exemplo: " + attrsText(c.attrs) + ")" : "")).join("\n"),
  anatomy: (v) => "Anatomia:\n" + (v.legend || []).map((l, i) => (i + 1) + ". " + l).join("\n"),
  specs: (v) => v.map((s) => "**" + s.title + "**\n" + s.rows.map((r) => "- " + r[0] + ": " + r[1]).join("\n")).join("\n\n"),
  table: (v) => ["| " + v.head.join(" | ") + " |", "|" + v.head.map(() => "---").join("|") + "|"].concat(v.rows.map((r) => "| " + r.map((c) => S(c).replace(/\|/g, "\\|").replace(/\n/g, " ")).join(" | ") + " |")).join("\n"),
  code: (v) => "```\n" + S(v) + "\n```",
  tokens: (v) => "(Tokens: " + v + " — ver a ferramenta de tokens.)",
  palette: (v) => "**" + v.label + ":** " + v.names.map((n, i) => n + " (" + (v.hex[i] || []).map((h) => "#" + h).join(", ") + ")").join("; "),
  hero: (v) => "**" + v.title + "**" + (v.text ? " — " + S(v.text) : ""),
  shortcuts: (v) => v.map((s) => "- **" + s.title + "** — " + S(s.text)).join("\n"),
  steps: (v) => v.map((s, i) => (i + 1) + ". **" + s.title + "** — " + S(s.text)).join("\n"),
  videos: (v) => v.map((x) => "- Vídeo: " + (x.title || x.heading) + (x.href ? " (" + x.href + ")" : "")).join("\n"),
  video: (v) => "Vídeo: " + v.title + (v.href ? " (" + v.href + ")" : "") + (v.caption ? " — " + v.caption : ""),
  glossary: (v) => Object.keys(v.letters || {}).map((k) => v.letters[k].map((t) => "- **" + t[0] + "** — " + S(t[1]) + (t[2] ? " (evitar: " + t[2] + ")" : "")).join("\n")).join("\n"),
  simulate: () => "(Simulação de daltonismo na página.)",
  arqStack: (v) => v.items.map((l, i) => (i + 1) + ". **" + l.name + "**" + (l.group ? " (" + l.group[0] + ")" : "") + " — " + S(l.text) +
    (l.examples ? " Exemplos: " + l.examples.join(", ") + "." : "") + (l.where ? " " + S(l.where) : "")).join("\n"),
  arqCascade: (v) => "Do token à tela (exemplo interativo): " + v.targets.map((t) => t.name + ": " + t.brand + " → " + t.brand.replace(/^Common\/Colors\//, "") + " no tema → valor do primitivo").join("; ") + ".",
  arqRules: (v) => v.items.map((r, i) => (i + 1) + ". **" + r.title + "** — " + S(r.text || "") + (r.do ? " Faça: " + S(r.do.text) : "") + (r.dont ? " Evite: " + S(r.dont.text) : "")).join("\n"),
  arqOwners: (v) => v.items.map((o) => "- **" + o.title + "** — " + S(o.text || "") + " " + o.rows.map((r) => r[0] + ": " + r[1]).join(" · ")).join("\n"),
  faq: (v) => v.groups.map((g) => "### " + g.title + "\n" + g.items.map((q) => "**" + q[0] + "**\n" + [].concat(q[1]).map((t) => Array.isArray(t) ? t.map((x) => "- " + x).join("\n") : S(t)).join("\n")).join("\n\n")).join("\n\n")
};
function blockText(b){
  const k = Object.keys(b)[0], f = BLOCK[k];
  if (!f) return "";
  try { return f(b[k]) || ""; } catch (e) { return ""; }
}
function docTabs(doc){
  return (doc.tabs || []).map((t) => ({ id: t.id, title: t.title, text: t.blocks.map(blockText).filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim() }));
}

// ---------- props do Figma (integration/figma-props.tsv) ----------
function figmaProps(){
  const out = {};
  if (!exists("integration/figma-props.tsv")) return out;
  read("integration/figma-props.tsv").split("\n").forEach((l) => {
    if (!l.trim() || l.charAt(0) === "#") return;
    const [node, , props] = l.split("\t"), ps = [];
    (props || "").split(";").filter(Boolean).forEach((p) => {
      const i = p.indexOf("="), name = p.slice(0, i), v = p.slice(i + 1), t = v.charAt(0);
      if (t === "V"){ const r = v.slice(2), j = r.indexOf(":"); ps.push({ name, type: "Variant", default: r.slice(0, j), options: r.slice(j + 1).split("|") }); }
      else if (t === "B") ps.push({ name, type: "Boolean", default: v.slice(2) === "1" });
      else if (t === "I") ps.push({ name, type: "Instance swap", default: v.slice(2) });
      else ps.push({ name, type: t === "T" ? "Text" : "Slot" });
    });
    out[node] = ps;
  });
  return out;
}

// ---------- tokens (styles/tokens.css) ----------
function tokens(){
  const css = read("styles/tokens.css"), blocks = {};
  const re = /(^|\n)\s*(?:@media \(min-width:(\d+)px\)\s*\{\s*)?([^{}\n]+)\{([^{}]*)\}/g; let m;
  while ((m = re.exec(css))){
    const sel = (m[2] ? "@" + m[2] + " " : "") + m[3].trim(), o = blocks[sel] = blocks[sel] || {};
    (m[4].match(/--[a-z0-9-]+\s*:[^;]+/g) || []).forEach((l) => { const i = l.indexOf(":"); o[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  }
  const light = blocks[":root"] || {}, dark = Object.assign({}, light, blocks['html[data-theme="dark"]'] || {});
  const vp = { mobile: blocks['[data-viewport="mobile"]'] || {}, tablet: blocks['[data-viewport="tablet"]'] || {}, desktop: blocks['[data-viewport="desktop"]'] || {} };
  const res = (o, v, d) => { const x = String(v).match(/^var\((--[a-z0-9-]+)\)$/); return x && (d || 0) < 12 && o[x[1]] != null ? res(o, o[x[1]], (d || 0) + 1) : v; };
  const names = Object.keys(light).concat(Object.keys(vp.desktop)).filter((n, i, a) => a.indexOf(n) === i && n.indexOf("--castanha-") !== 0);
  const group = (n) => n.indexOf("--text-style-") === 0 ? "text-style" : n.indexOf("--motion-") === 0 ? "motion-style" : (n.match(/^--(?:common|specific)-([a-z]+)/) || [])[1] || "outros";
  return names.map((n) => {
    const t = { name: n, group: group(n) };
    if (light[n] != null){ t.light = res(light, light[n]); const dv = res(dark, dark[n]); if (dv !== t.light) t.dark = dv; if (/^var\(/.test(light[n])) t.ref = light[n].slice(4, -1); }
    if (vp.desktop[n] != null) t.viewport = { mobile: res(Object.assign({}, light, vp.mobile), vp.mobile[n]), tablet: res(Object.assign({}, light, vp.tablet), vp.tablet[n]), desktop: res(Object.assign({}, light, vp.desktop), vp.desktop[n]) };
    const alias = n.replace(/^--(common|specific)-/, "--castanha-");
    t.castanha = alias !== n && (light[alias] != null || vp.desktop[alias] != null) ? alias : null; // null = não existe no castanha-tokens
    return t;
  });
}

// ---------- CONFERIR ----------
function conferir(){
  const out = []; let group = "";
  read("docs/CONFERIR.md").split("\n").forEach((l) => {
    const h = l.match(/^## (.+)/); if (h){ group = h[1].trim(); return; }
    const r = l.match(/^\| (C\d+) \| (.*) \|\s*$/);
    if (r) out.push({ id: r[1], group, resolved: /^Resolvidos/.test(group), text: r[2].split(" | ").map((c) => c.trim()).filter(Boolean).join(" · ") });
  });
  return out;
}

// ---------- montagem ----------
function build(){
  const { reg, CDS } = loadPlayground();
  const FS = (CDS.figmaStatus && CDS.figmaStatus.items) || {}, R = CDS.react || { items: {}, dirs: {} }, RA = CDS.reactAssets || {}, A = CDS.assets || {};
  const FP = figmaProps();
  const seen = {};
  // hidden: página escondida do playground (ex.: #/locais), fora do catálogo como fica fora do menu e da busca
  const components = reg.filter((d) => d.id && !d.hidden && !seen[d.id] && (seen[d.id] = 1)).map((d) => {
    const doc = CDS.docs[d.id], node = ((d.figma || "").match(/node-id=([\d-]+)/) || [])[1] || null;
    const kind = d.home ? "home" : d.resource ? "resource" : d.composition ? "composition" : d.block ? "building-block" : "component";
    const c = { id: d.id, name: d.name, kind, category: d.category || null, figma: d.figma || null, figmaNode: node, zeroheight: d.zeroheight || null };
    if (d.task) c.jira = d.task;
    if (FS[d.id]) c.figmaStatus = FS[d.id];
    const desc = (doc && doc.cover && doc.cover.description) || d.description;
    if (desc) c.description = desc;
    if (doc){
      c.tabs = docTabs(doc);
      if (c.tabs.some((t) => /\*\*Rascunho:\*\*/.test(t.text))) c.draft = true;
    }
    if (node && FP[node]) c.figmaProps = FP[node];
    const it = R.items[d.id], dir = it && it.dir && R.dirs[it.dir];
    if (it && it.component){
      c.react = {
        component: it.component, import: it.import || (dir && dir.import) || null, description: (dir && dir.desc) || null,
        storybook: (dir && dir.storybook) || null, zeroheight: (dir && dir.zeroheight) || null, tags: (dir && dir.tags) || [], onlyStaging: !!(dir && dir.staging),
        props: dir ? Object.keys(dir.props).reduce((o, k) => { o[k] = dir.props[k].map((p) => { const x = { name: p.n, type: p.t }; if (p.r) x.required = true; if (p.d !== undefined) x.default = p.d; if (p.s) x.description = p.s; return x; }); return o; }, {}) : {},
        liveMap: !!it.map,
        figmaToReact: it.map ? it.map.figma.map((r) => ({ figma: r[0], playground: r[1], react: r[2], note: r[3] || "" })) : (it.figma || []).map((f) => ({ figma: f.figma, kind: f.kind, values: f.map || null })),
        checks: (it.checks || []).map((x) => ({ level: x.l, kind: x.k, text: x.m })),
        notes: it.notes || []
      };
    } else if (it) c.react = null;
    return c;
  });
  // componentes que só existem no React (sem par no Figma/playground)
  const used = new Set(Object.values(R.items).map((i) => i.dir).filter(Boolean));
  const reactOnly = Object.keys(R.dirs).filter((k) => !used.has(k)).sort().map((k) => ({ name: k, import: R.dirs[k].import, description: R.dirs[k].desc || null, storybook: R.dirs[k].storybook || null, tags: R.dirs[k].tags || [] }));

  const iconMap = (RA.icons && RA.icons.map) || {}, illMap = (RA.ills && RA.ills.map) || {};
  const iconCat = {}; (A.iconBuckets || []).forEach((b) => (b.icons || []).forEach((n) => { iconCat[n] = { category: b.name, deprecated: !!b.deprecated, glyph: !!b.glyphs }; }));
  // glifos internos (checkbox) não são ícones da lib
  const icons = (A.icons || []).filter((i) => !(iconCat[i.name] || {}).glyph).map((i) => ({ name: i.name, category: (iconCat[i.name] || {}).category || i.bucket, keywords: i.keywords || [], deprecated: !!(iconCat[i.name] || {}).deprecated,
    react: iconMap[i.name] ? { name: i.name, export: iconMap[i.name], import: "import { " + iconMap[i.name] + " } from '" + RA.icons.pkg + "';" } : null }))
    .concat(Object.keys(iconCat).filter((n) => iconCat[n].deprecated && !(A.icons || []).some((i) => i.name === n)).map((n) => ({ name: n, category: iconCat[n].category, keywords: [], deprecated: true, react: iconMap[n] ? { name: n, export: iconMap[n] } : null })));
  const illCat = {}; (A.illustrationBuckets || []).forEach((b) => (b.items || []).forEach((k) => { illCat[k] = b.name; }));
  const illustrations = (A.illustrations || []).map((i) => { const m = illMap[i.name];
    return { id: i.name, name: i.label, category: illCat[i.name] || i.bucket, description: i.description || "", size: i.size || "", figma: i.figma || i.label,
      react: m ? { name: m[0], export: m[1], import: "import { " + m[1] + " } from '" + RA.ills.pkg + "';", renamed: !!m[2], drawingDiffers: !!m[3] } : null }; });

  // dados no formato do react-kit (mapas curados + props/tipos/refs por pasta do castanha-react), para gerar e revisar JSX no MCP
  const reactData = { items: {}, dirs: R.dirs };
  Object.keys(R.items).forEach((id) => { const it = R.items[id]; if (it.component) reactData.items[id] = { component: it.component, import: it.import || null, map: it.map || null }; });
  const stack = exists("integration/stack-check.json") ? JSON.parse(read("integration/stack-check.json")) : null;
  const catalog = {
    about: "Catálogo do Castanha DS (playground de handoff Figma ↔ código). Gerado por scripts/mcp/build-catalog.js; fonte do MCP (docs/local/PLANO-MCP.md).",
    site: "https://gus-constantino.github.io/castanhads-component-teste/",
    packages: { react: "@caju-beneficios/castanha-react", icons: "@caju-beneficios/castanha-icons", illustrations: "@caju-beneficios/castanha-illustrations", tokens: "@caju-beneficios/castanha-tokens" },
    reactSource: stack ? stack.source : null,
    counts: {},
    components, reactOnly, tokens: tokens(), icons, illustrations,
    divergences: { conferir: conferir(), stack: stack ? stack.findings : [] },
    reactData
  };
  catalog.counts = {
    components: components.filter((c) => c.kind === "component").length, buildingBlocks: components.filter((c) => c.kind === "building-block").length,
    resources: components.filter((c) => c.kind === "resource" || c.kind === "home").length, compositions: components.filter((c) => c.kind === "composition").length,
    withDocs: components.filter((c) => c.tabs).length, withReact: components.filter((c) => c.react).length, liveMaps: components.filter((c) => c.react && c.react.liveMap).length,
    reactOnly: reactOnly.length, tokens: catalog.tokens.length, icons: icons.length, illustrations: illustrations.length,
    conferirOpen: catalog.divergences.conferir.filter((x) => !x.resolved).length, stackFindings: catalog.divergences.stack.length
  };
  return catalog;
}

/** Grava dist/mcp/catalog.json só se mudou. check = só compara. Retorna { changed, counts }. */
function write(check){
  const json = JSON.stringify(build(), null, 1) + "\n";
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (!check && cur !== json){ fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, json); }
  return { changed: cur !== json, counts: JSON.parse(json).counts };
}
function main(){
  const check = process.argv.indexOf("--check") > 0, r = write(check);
  if (check){
    if (r.changed){ console.error("dist/mcp/catalog.json desatualizado: rode node scripts/build-index.js"); process.exit(1); }
    console.log("Catálogo do MCP em dia."); return;
  }
  const c = r.counts;
  console.log("Catálogo do MCP: " + c.components + " componentes, " + c.buildingBlocks + " building blocks, " + c.resources + " recursos, " + c.compositions + " composições · " +
    c.withReact + " com par no React (" + c.liveMaps + " com JSX ao vivo) · " + c.tokens + " tokens · " + c.icons + " ícones · " + c.illustrations + " ilustrações → dist/mcp/catalog.json");
}
module.exports = { build, write };
if (require.main === module) main();
