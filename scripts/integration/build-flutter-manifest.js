#!/usr/bin/env node
/**
 * F0 · Manifesto de integração Figma ↔ playground ↔ castanha_flutter (castanha-mobile).
 *
 *   node scripts/integration/build-flutter-manifest.js [--mobile ../castanha-mobile] [--ref origin/staging]
 *
 * Lê o clone local do monorepo Flutter SÓ por `git show`/`git ls-tree` (não troca de branch nem altera nada nele):
 *   - stories do Widgetbook (`example/lib/stories/<x>/<x>.stories.dart`): nome do componente, classe, tags de status
 *     e descrição de cada parâmetro (`argDescriptions`); as stories `asIs: true` são do pacote legado e ficam de fora
 *   - widgets (`lib/src/widgets/<x>/`): classes públicas, parâmetros do construtor (tipo, obrigatório, padrão, dartdoc)
 *     e enums (valores com o dartdoc)
 *   - Code Connect (`*.figma.ts` da branch de Code Connect): node-id do Figma, quando existir
 * e casa cada componente do playground pelo nome do Figma (o nome da story é o nome do componente no Figma),
 * pelo node-id do Code Connect ou pelo nome da classe (CastanhaMainButton → main-button).
 * Saída: integration/flutter/manifest.json (metadados — nenhum código-fonte é copiado), integration/flutter-data.js
 * (dados do painel "No Flutter") e integration/flutter/COBERTURA.md.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const MOBILE = path.resolve(ROOT, opt("--mobile", process.env.MOBILE || "../castanha-mobile"));
const REF = opt("--ref", process.env.REF_FLUTTER || "origin/staging");
const CC_REF = opt("--cc", "origin/feat/figma-code-connect");
const PKG = "packages/castanha-flutter";
const OUT = path.join(ROOT, "integration", "flutter");
const WIDGETBOOK = "https://castanha-mobile.caju.com.br/#/?path=";

const git = (...a) => execFileSync("git", ["-C", MOBILE, ...a], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const show = (ref, f) => { try { return git("show", ref + ":" + f); } catch (e) { return null; } };
const ls = (ref, p) => { try { return git("ls-tree", "-r", "--name-only", ref, p).split("\n").filter(Boolean); } catch (e) { return []; } };

if (!fs.existsSync(path.join(MOBILE, ".git"))){
  console.error("Sem o clone do castanha-mobile em " + MOBILE + " (use --mobile).");
  process.exit(1);
}

// ---------- Dart ----------
/** Dartdoc (linhas ///) logo acima da posição `at`: primeiro parágrafo, sem a linha "Defaults to …" nem blocos de código. */
function docAbove(src, at){
  const lines = src.slice(0, at).split("\n"); lines.pop();
  const out = [];
  for (let i = lines.length - 1; i >= 0; i--){
    const l = lines[i].trim();
    if (/^@\w/.test(l)) continue; // anotações (@override, @Deprecated) entre o doc e a declaração
    if (!l.startsWith("///")) break;
    out.unshift(l.replace(/^\/\/\/\s?/, ""));
  }
  const txt = out.join("\n").split(/```/)[0];
  const para = txt.split(/\n\s*\n/)[0] || "";
  return para.replace(/\s+/g, " ").replace(/\[([\w.]+)\]/g, "`$1`").trim();
}
/** Enums: { Nome: { doc, values: [{ n, doc }] } } — values na ordem do arquivo (enhanced enums: só os nomes). */
function parseEnums(src){
  const out = {};
  const re = /\benum\s+(\w+)\s*(?:with\s+[\w, ]+\s*)?(?:implements\s+[\w, <>]+\s*)?\{/g; let m;
  while ((m = re.exec(src))){
    let depth = 1, i = re.lastIndex;
    while (i < src.length && depth){ if (src[i] === "{") depth++; else if (src[i] === "}") depth--; i++; }
    const body = src.slice(re.lastIndex, i - 1);
    const head = body.split(/;\s*(?:\n|$)/)[0]; // enhanced enum: valores antes do primeiro ";"
    const values = [];
    const vr = /(^|[,\n])\s*((?:\/\/\/[^\n]*\n\s*)*)(\w+)\s*(?:\([^)]*\))?\s*(?=,|$)/g; let v;
    const clean = head.replace(/\/\/(?!\/)[^\n]*/g, "");
    while ((v = vr.exec(clean))){
      const doc = v[2].split("\n").map((l) => l.trim().replace(/^\/\/\/\s?/, "")).filter(Boolean).join(" ").replace(/\s+/g, " ");
      values.push({ n: v[3], doc: doc.replace(/\[([\w.]+)\]/g, "`$1`") });
    }
    out[m[1]] = { doc: docAbove(src, m.index), values };
  }
  return out;
}
/** Classes públicas `Castanha*` que estendem um widget, com o construtor sem nome e os campos. */
function parseClasses(src){
  const out = [];
  const re = /\bclass\s+(Castanha\w+)(?:<[^>{]*>)?\s+extends\s+(\w+)/g; let m;
  while ((m = re.exec(src))){
    const name = m[1], ext = m[2];
    let i = src.indexOf("{", re.lastIndex), depth = 1, start = i + 1; i++;
    while (i < src.length && depth){ if (src[i] === "{") depth++; else if (src[i] === "}") depth--; i++; }
    const body = src.slice(start, i - 1);
    // campos: final Tipo nome;  (o tipo pode ter genéricos e ?)
    const fields = {};
    const fr = /\bfinal\s+([\w<>?,. ]+?)\s+(\w+)\s*;/g; let f;
    while ((f = fr.exec(body))) fields[f[2]] = { type: f[1].replace(/\s+/g, " ").trim(), doc: docAbove(body, f.index) };
    // construtores: Nome(…) e Nome.algo(…) — parâmetros nomeados entre {}
    const ctors = [];
    const cr = new RegExp("(?:const\\s+)?" + name + "(?:\\.(\\w+))?\\s*\\(", "g"); let c;
    while ((c = cr.exec(body))){
      let j = cr.lastIndex, d = 1;
      while (j < body.length && d){ if (body[j] === "(") d++; else if (body[j] === ")") d--; j++; }
      const sig = body.slice(cr.lastIndex, j - 1).replace(/\/\/[^\n]*/g, "");
      const named = (sig.match(/\{([\s\S]*)\}/) || [])[1];
      if (named == null && !/this\./.test(sig)) continue;
      const params = [];
      splitTop(named != null ? named : sig).forEach((p) => {
        p = p.trim(); if (!p) return;
        const req = /^required\s+/.test(p); p = p.replace(/^required\s+/, "");
        const sm = p.match(/^super\.(\w+)(?:\s*=\s*([\s\S]+))?$/);
        if (sm){ params.push({ n: sm[1], super: true, req, def: sm[2] ? sm[2].trim() : null }); return; }
        const tm = p.match(/^(?:([\w<>?,. ]+?)\s+)?this\.(\w+)(?:\s*=\s*([\s\S]+))?$/); // "this.x" ou "double this.x"
        if (tm){ params.push({ n: tm[2], type: tm[1] ? tm[1].trim() : undefined, req, def: tm[3] ? tm[3].trim() : null }); return; }
        const xm = p.match(/^([\w<>?,. ]+?)\s+(\w+)(?:\s*=\s*([\s\S]+))?$/); // parâmetro tipado que não é campo
        if (xm) params.push({ n: xm[2], type: xm[1].trim(), req, def: xm[3] ? xm[3].trim() : null });
      });
      ctors.push({ named: c[1] || null, doc: c[1] ? docAbove(body, c.index) : null, params });
    }
    out.push({ name, ext, doc: docAbove(src, m.index), fields, ctors });
  }
  return out;
}
/** Divide por vírgulas de nível 0 (ignora vírgulas dentro de (), <>, [], {} e strings). */
function splitTop(s){
  const out = []; let d = 0, cur = "", q = null;
  for (const ch of String(s)){
    if (q){ cur += ch; if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"'){ q = ch; cur += ch; continue; }
    if ("([{<".includes(ch)) d++; else if (")]}>".includes(ch)) d--;
    if (ch === "," && d === 0){ out.push(cur); cur = ""; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}
const SUPER_TYPES = { key: "Key?", semanticsLabel: "String?", semanticsHint: "String?", excludeSemantics: "bool" };

// ---------- stories ----------
function parseStory(src){
  const m = src.match(/WidgetbookPaths\.(\w+)\.getMeta<(\w+)>\(\s*([\s\S]*?)\n\);/);
  if (!m) return null;
  const body = m[3];
  const name = (body.match(/name:\s*'([^']+)'/) || [])[1];
  const asIs = /asIs:\s*true/.test(body) || (m[1] === "components" && !/asIs:\s*false/.test(body));
  const tags = ((body.match(/tags:\s*\[([^\]]*)\]/) || [])[1] || "").split(",").map((t) => t.trim().replace(/^ComponentTag\./, "")).filter(Boolean);
  const argDescriptions = {};
  const ad = (body.match(/argDescriptions:\s*\{([\s\S]*?)\n\s*\},/) || [])[1] || "";
  const ar = /'(\w+)':\s*((?:'(?:[^'\\]|\\.)*'\s*)+),/g; let a;
  while ((a = ar.exec(ad))) argDescriptions[a[1]] = a[2].match(/'((?:[^'\\]|\\.)*)'/g).map((s) => s.slice(1, -1)).join("").replace(/\\'/g, "'");
  const stories = Array.from(src.matchAll(/final\s+\$\w+\s*=\s*_Story\(\s*name:\s*'([^']+)'/g)).map((x) => x[1]);
  return { cat: m[1], cls: m[2], name, asIs, tags, argDescriptions, stories };
}

// ---------- playground ----------
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const kebab = (cls) => cls.replace(/^Castanha/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function playground(){
  const regs = [];
  const roots = ["components", "compositions"];
  roots.forEach((r) => {
    const dir = path.join(ROOT, r);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach((d) => {
      const f = path.join(dir, d, d + ".playground.js");
      if (!fs.existsSync(f)) return;
      const src = fs.readFileSync(f, "utf8");
      for (const m of src.matchAll(/id:\s*"([\w-]+)",\s*name:\s*"([^"]+)"([\s\S]{0,800}?)(?=\n\s*(?:mount|\}\s*\)|CDS\.register))/g)){
        const rest = m[3];
        const figma = (rest.match(/figma:\s*"([^"]+)"/) || [])[1] || null;
        regs.push({ id: m[1], name: m[2], block: /block:\s*true/.test(rest), template: (rest.match(/template:\s*"([^"]+)"/) || [])[1] || null, composition: r === "compositions", figma });
      }
      for (const m of src.matchAll(/\["([\w-]+)",\s*"([^"]+)",\s*"cds-[\w-]+"[^\]]*?"(\d+-\d+)"\]/g))
        if (!regs.some((x) => x.id === m[1])) regs.push({ id: m[1], name: m[2], block: false, template: null, composition: false, figma: "node-id=" + m[3] });
    });
  });
  return regs;
}
const nodeOf = (url) => { const m = String(url || "").match(/node-id=([\d]+)[-:]([\d]+)/); return m ? m[1] + ":" + m[2] : null; };

// ---------- montar ----------
const commit = git("rev-parse", "--short", REF).trim();
const date = git("log", "-1", "--format=%cs", REF).trim();
const ccCommit = (() => { try { return git("rev-parse", "--short", CC_REF).trim(); } catch (e) { return null; } })();

const storyFiles = ls(REF, PKG + "/example/lib/stories").filter((f) => /\.stories\.dart$/.test(f));
const stories = storyFiles.map((f) => { const s = parseStory(show(REF, f) || ""); return s && Object.assign(s, { file: f }); }).filter(Boolean);

const widgetFiles = ls(REF, PKG + "/lib/src/widgets").filter((f) => /\.dart$/.test(f));
const byDir = {};
widgetFiles.forEach((f) => { const d = f.split("/")[5]; (byDir[d] = byDir[d] || []).push(f); });
const classes = {}; // nome → { dir, …classe }
const enums = {};
Object.keys(byDir).forEach((d) => {
  byDir[d].forEach((f) => {
    const src = show(REF, f) || "";
    Object.assign(enums, Object.fromEntries(Object.entries(parseEnums(src)).map(([k, v]) => [k, Object.assign(v, { dir: d })])));
    parseClasses(src).forEach((c) => { if (!/(State|Style|Theme|Data|Controller|Delegate)$/.test(c.name) && !classes[c.name]) classes[c.name] = Object.assign(c, { dir: d, file: f }); });
  });
});

// Code Connect: node-id → classe
const cc = {};
ls(CC_REF, PKG + "/lib/src").filter((f) => /\.figma\.ts$/.test(f)).forEach((f) => {
  const src = show(CC_REF, f) || "";
  const node = (src.match(/node-id=([\d]+-[\d]+)/) || [])[1];
  const cls = (src.match(/<?(Castanha\w+)\s*\(/) || [])[1];
  if (node && cls) cc[node.replace("-", ":")] = cls;
});

/** Campo `n` na classe ou nas classes-mãe do pacote (parâmetro super.x herda tipo e dartdoc). */
function field(c, n){
  for (let k = c, i = 0; k && i < 5; k = classes[k.ext], i++) if (k.fields[n]) return k.fields[n];
  return {};
}
/** Padrão de um super.x: o do construtor da classe-mãe. */
function superDef(c, n){
  const parent = classes[c.ext]; if (!parent) return null;
  const ct = parent.ctors.find((x) => !x.named); const p = ct && ct.params.find((x) => x.n === n);
  return p ? (p.def || superDef(parent, n)) : null;
}
/** Parâmetros do construtor padrão com tipo e dartdoc dos campos; super.* com o tipo da classe-mãe ou o conhecido. */
function params(c){
  const ctor = c.ctors.find((x) => !x.named) || c.ctors[0];
  if (!ctor) return [];
  return ctor.params.filter((p) => p.n !== "key").map((p) => {
    const f = field(c, p.n);
    if (p.super && !p.def) p.def = superDef(c, p.n);
    if (p.super && classes[c.ext] && f.type) p.super = false; // herdado de uma classe do pacote: é parâmetro do componente, não de acessibilidade
    const type = p.type || f.type || SUPER_TYPES[p.n] || null;
    const e = type && enums[type.replace(/\?$/, "")];
    return { n: p.n, t: type, req: p.req || undefined, def: p.def || undefined, d: f.doc || undefined, enum: e ? e.values.map((v) => v.n) : undefined, a11y: p.super || undefined };
  });
}
function named(c){ return c.ctors.filter((x) => x.named).map((x) => ({ n: x.named, d: x.doc || undefined, params: x.params.map((p) => p.n) })); }

const regs = playground();
const byName = {}; regs.filter((r) => !r.composition).forEach((r) => { (byName[norm(r.name)] = byName[norm(r.name)] || []).push(r); });
const byId = Object.fromEntries(regs.filter((r) => !r.composition).map((r) => [r.id, r])); // composição (cmp-) não é componente do Figma: fica fora do casamento
const byNode = {}; regs.forEach((r) => { const n = nodeOf(r.figma); if (n) byNode[n] = r; });

// Apelidos: classe do Flutter → id do playground, quando o nome não bate (curado à mão; conferir a cada widget novo)
const ALIAS = { CastanhaChipInput: "input-chips", CastanhaChipFilter: "filter-chips", CastanhaChipGroup: "chips-group" };
// Classes que não são componente do Figma: superfícies e indicadores internos, a base dos Chips e valores
const SKIP = /^Castanha(\w*Surface|TabIndicator|Chip|SliderRange|TabItem|\w*Scope)$/;

const isWidget = (c) => /Component|Widget$/.test(c.ext) || classes[c.ext]; // estende componente/widget ou outra classe do pacote
const storyOf = {}; // classe → story (meta da própria classe ou story que a monta)
stories.filter((st) => !st.asIs).forEach((st) => { storyOf[st.cls] = storyOf[st.cls] || st; });
stories.filter((st) => !st.asIs).forEach((st) => {
  const src = show(REF, st.file) || "";
  Object.keys(classes).forEach((k) => { if (!storyOf[k] && new RegExp("\\b" + k + "(\\.\\w+)?\\(").test(src)) storyOf[k] = Object.assign({}, st, { shared: true }); });
});

const comps = [], matchedIds = new Set(), flutterOnly = [];
Object.values(classes).filter((c) => isWidget(c) && !SKIP.test(c.name) && c.ctors.length).sort((a, b) => a.name.localeCompare(b.name)).forEach((c) => {
  const st = storyOf[c.name] || null;
  let reg = null, via = null;
  const node = Object.keys(cc).find((n) => cc[n] === c.name);
  if (node && byNode[node]){ reg = byNode[node]; via = "code-connect"; }
  if (!reg && ALIAS[c.name] && byId[ALIAS[c.name]]){ reg = byId[ALIAS[c.name]]; via = "apelido"; }
  if (!reg && byId[kebab(c.name)]){ reg = byId[kebab(c.name)]; via = "classe"; }
  if (!reg && st && !st.shared && byName[norm(st.name)]){ reg = byName[norm(st.name)].find((r) => !r.composition) || byName[norm(st.name)][0]; via = "story"; }
  const item = {
    class: c.name, dir: c.dir, story: st ? st.name : null, tags: st ? st.tags : [],
    import: "import 'package:castanha_flutter/castanha_flutter.dart';",
    widgetbook: st ? WIDGETBOOK + encodeURI("[3. COMPONENTS]/" + st.name).replace(/%20/g, "+") + "/Docs" : null,
    doc: c.doc || null,
    params: params(c),
    constructors: named(c),
    argDescriptions: st && !st.shared ? st.argDescriptions : {},
    figmaNode: node || null
  };
  if (reg && !matchedIds.has(reg.id)){
    matchedIds.add(reg.id);
    comps.push(Object.assign({ id: reg.id, name: reg.name, via }, item));
  } else if (!reg) flutterOnly.push(item);
});
const relevant = regs.filter((r) => !r.composition && !r.template);
const missing = relevant.filter((r) => !matchedIds.has(r.id));
const manifest = {
  _about: "Gerado por scripts/integration/build-flutter-manifest.js a partir do castanha-mobile (só leitura). Metadados: nenhum código-fonte copiado.",
  generated: new Date().toISOString().slice(0, 10),
  source: { repo: "caju-beneficios/castanha-mobile", ref: REF, commit, date, package: "castanha_flutter", codeConnect: { ref: CC_REF, commit: ccCommit, nodes: Object.keys(cc).length } },
  summary: {
    playground: relevant.length, blocks: relevant.filter((r) => r.block).length,
    flutter: comps.length + flutterOnly.length, matched: comps.length, flutterOnly: flutterOnly.length,
    missing: missing.filter((r) => !r.block).length, missingBlocks: missing.filter((r) => r.block).length
  },
  components: comps.sort((a, b) => a.id.localeCompare(b.id)),
  flutterOnly,
  missing: missing.map((r) => ({ id: r.id, name: r.name, block: r.block || undefined })),
  enums: Object.fromEntries(Object.entries(enums).filter(([k]) => /^Castanha/.test(k)).map(([k, v]) => [k, { dir: v.dir, doc: v.doc || undefined, values: v.values }]))
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 1) + "\n");

// Dados do painel (compactos): por id do playground
const data = { source: manifest.source, items: {}, enums: {} };
comps.forEach((c) => {
  data.items[c.id] = { class: c.class, story: c.story, tags: c.tags, widgetbook: c.widgetbook, doc: c.doc, via: c.via,
    params: c.params.map((p) => Object.assign({ n: p.n, t: p.t }, p.req ? { req: 1 } : {}, p.def ? { def: p.def } : {}, (p.d || c.argDescriptions[p.n]) ? { d: p.d || c.argDescriptions[p.n] } : {}, p.a11y ? { a11y: 1 } : {})),
    constructors: c.constructors.length ? c.constructors : undefined };
  c.params.forEach((p) => { const t = p.t && p.t.replace(/\?$/, ""); if (manifest.enums[t]) data.enums[t] = manifest.enums[t].values.map((v) => v.n); });
});
// Classes auxiliares citadas nos tipos dos parâmetros (List<CastanhaTabItem>, CastanhaSliderRange…): o painel monta listas com elas
data.extra = {};
const cited = new Set();
comps.forEach((c) => c.params.forEach((p) => (String(p.t || "").match(/Castanha\w+/g) || []).forEach((n) => cited.add(n))));
cited.forEach((n) => {
  const k = classes[n]; if (!k || data.items[n] || comps.some((c) => c.class === n)) return;
  const ps = params(k); if (!ps.length && !k.ctors.length) return;
  data.extra[n] = { class: n, params: ps.map((p) => Object.assign({ n: p.n, t: p.t }, p.req ? { req: 1 } : {}, p.def ? { def: p.def } : {})) };
  ps.forEach((p) => { const t = p.t && p.t.replace(/\?$/, ""); if (manifest.enums[t]) data.enums[t] = manifest.enums[t].values.map((v) => v.n); });
});
// Mapas Figma → Flutter (integration/flutter-map/<id>.json)
const MAPS = path.join(ROOT, "integration", "flutter-map"), maps = {};
if (fs.existsSync(MAPS)) fs.readdirSync(MAPS).filter((f) => /\.json$/.test(f)).sort().forEach((f) => { maps[f.replace(/\.json$/, "")] = JSON.parse(fs.readFileSync(path.join(MAPS, f), "utf8")); });
fs.writeFileSync(path.join(ROOT, "integration", "flutter-data.js"),
  "/* GERADO por scripts/integration/build-flutter-manifest.js a partir de " + REF + " (" + commit + ") do castanha-mobile · não editar à mão */\n" +
  "window.CDS = window.CDS || {}; CDS.flutter = " + JSON.stringify(data) + ";\nCDS.flutterMaps = " + JSON.stringify(maps) + ";\n");

// Cobertura
const s = manifest.summary;
const md = [
  "# Cobertura · playground × castanha_flutter",
  "",
  "Gerado por `scripts/integration/build-flutter-manifest.js` a partir de `" + REF + "` (" + commit + ", " + date + ") do castanha-mobile. Não editar à mão.",
  "",
  "| | Quantidade |", "|---|---|",
  "| Componentes do playground (sem composições e templates) | " + s.playground + " (" + s.blocks + " building blocks) |",
  "| Widgets do castanha_flutter com story | " + s.flutter + " |",
  "| Casados com o playground | " + s.matched + " |",
  "| Só no Flutter | " + s.flutterOnly + " |",
  "| Sem par no Flutter | " + s.missing + " componentes e " + s.missingBlocks + " building blocks |",
  "",
  "## Casados", "",
  "| Playground | Flutter | Casado por | Parâmetros | Tags |", "|---|---|---|---|---|",
  ...manifest.components.map((c) => "| " + c.name + " (`" + c.id + "`) | `" + c.class + "` | " + c.via + " | " + c.params.filter((p) => !p.a11y).length + " | " + (c.tags.join(", ") || "—") + " |"),
  "",
  "## Só no Flutter", "",
  ...(flutterOnly.length ? flutterOnly.map((c) => "- `" + c.class + "`" + (c.story ? " (story " + c.story + ")" : "")) : ["Nenhum."]),
  "",
  "## Sem par no Flutter", "",
  ...missing.filter((r) => !r.block).map((r) => "- " + r.name + " (`" + r.id + "`)"),
  ""
].join("\n");
fs.writeFileSync(path.join(OUT, "COBERTURA.md"), md);

console.log("Flutter: " + REF + " (" + commit + ") · " + s.matched + " casados · " + s.flutterOnly + " só no Flutter · " + s.missing + " sem par (+" + s.missingBlocks + " blocks)");
