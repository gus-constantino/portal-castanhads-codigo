/**
 * Índice de busca do conteúdo das docs (dist/search.json), gerado pelo build-index (D209).
 * Executa cada components/<id>/<id>.docs.js e resources/<id>/<id>.js num contexto isolado (vm) com um CDS mínimo
 * e junta o texto de cada seção: uma entrada por título h2 de cada tab (antes do 1º h2, o título da tab).
 * Entrada: { d: id da página, n: nome, t: id da tab, tt: título da tab, h: título da seção, x: texto (até 1200 caracteres) }.
 * A tab Playground não entra (não é texto). O shell só baixa o arquivo na primeira busca.
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

// chaves que não são texto de leitura: atributos de exemplo, links, ícones, classes…
const SKIP = new Set(["attrs", "examples", "src", "href", "illustration", "icon", "class", "style", "_tag", "id", "tag", "appearance",
  "kind", "size", "target", "months", "base", "markers", "matrices", "filter", "matrix", "hex", "steps_", "cta", "external", "layout",
  "bento", "image", "wide", "tall", "live", "min", "areas", "d", "date", "zeroheight", "figma", "source", "sourceLabel", "data_"]);

function texts(v, out){
  if (v == null) return out;
  if (typeof v === "string"){ out.push(v); return out; }
  if (typeof v === "number" || typeof v === "boolean" || typeof v === "function") return out;
  if (Array.isArray(v)){ v.forEach((x) => texts(x, out)); return out; }
  if (v._tag){ if (v._text) out.push(v._text); (v._children || []).forEach((c) => texts(c, out)); return out; } // exemplo de componente
  Object.keys(v).forEach((k) => { if (!SKIP.has(k)) texts(v[k], out); });
  return out;
}
const clean = (s) => String(s).replace(/`/g, "").replace(/\s+/g, " ").trim();

function sections(id, name, doc, isResource){
  const out = [];
  (doc.tabs || []).forEach((tab, ti) => {
    let cur = null;
    const t = isResource && ti === 0 ? "" : tab.id; // recurso: a 1ª tab é a rota sem sufixo
    const open = (h) => { cur = { d: id, n: name, t: t, tt: tab.title, h: h, parts: [] }; out.push(cur); };
    open(tab.title);
    (tab.blocks || []).forEach((b) => {
      const k = Object.keys(b)[0];
      if (k === "h2"){ open(clean(b.h2)); return; }
      texts(b[k], cur.parts);
    });
  });
  return out.map((s) => { const x = clean(s.parts.join(" · ")); delete s.parts; s.x = x.length > 1200 ? x.slice(0, 1200) + "…" : x; return s; })
    .filter((s) => s.x || s.h !== s.tt);
}

function run(file, sandbox){
  try { vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file, timeout: 2000 }); return true; }
  catch (e){ return e.message; }
}

module.exports = function build(ROOT){
  const regs = {};
  const CDS = { docs: {}, assets: { illustrations: [] }, register(o){ (Array.isArray(o) ? o : [o]).forEach((r) => { if (r && r.id) regs[r.id] = r; }); } };
  const sandbox = vm.createContext({ window: { CDS: CDS }, CDS: CDS, console: { log(){}, warn(){}, error(){} }, document: undefined,
    location: { hash: "", search: "", href: "" }, navigator: { platform: "", userAgent: "" }, matchMedia: () => ({ matches: false, addEventListener(){} }) });
  sandbox.window.window = sandbox.window;
  sandbox.window.addEventListener = sandbox.window.removeEventListener = function(){}; // docs que ouvem eventos da janela (ex.: caju-theme)
  sandbox.addEventListener = sandbox.window.addEventListener;
  const errs = [];
  // nomes: os playgrounds registram id e nome; as docs dependem umas das outras (needs) — roda tudo antes de ler
  const COMP = path.join(ROOT, "components"), RES = path.join(ROOT, "resources");
  const comps = fs.readdirSync(COMP).filter((d) => fs.existsSync(path.join(COMP, d, d + ".docs.js"))).sort();
  comps.forEach((d) => {
    const pg = path.join(COMP, d, d + ".playground.js");
    if (fs.existsSync(pg)){ const src = fs.readFileSync(pg, "utf8"); for (const m of src.matchAll(/id:\s*"([\w-]+)",\s*name:\s*"([^"]+)"/g)) regs[m[1]] = regs[m[1]] || { id: m[1], name: m[2] }; }
  });
  comps.forEach((d) => { const r = run(path.join(COMP, d, d + ".docs.js"), sandbox); if (r !== true) errs.push(d + ": " + r); });
  const resIds = fs.existsSync(RES) ? fs.readdirSync(RES).filter((d) => fs.existsSync(path.join(RES, d, d + ".js"))).sort() : [];
  const before = new Set(Object.keys(CDS.docs));
  resIds.forEach((d) => { const r = run(path.join(RES, d, d + ".js"), sandbox); if (r !== true) errs.push(d + ": " + r); });
  const resDocs = new Set(Object.keys(CDS.docs).filter((k) => !before.has(k)));
  const items = [];
  Object.keys(CDS.docs).sort().forEach((id) => {
    const doc = CDS.docs[id], reg = regs[id] || {};
    if (!doc || !doc.tabs || reg.hidden || reg.composition) return; // página escondida (hidden) e composição: fora da busca, só abrem pelo link
    items.push(...sections(id, reg.name || id, doc, resDocs.has(id) || !!reg.resource));
  });
  return { items: items, errors: errs };
};
