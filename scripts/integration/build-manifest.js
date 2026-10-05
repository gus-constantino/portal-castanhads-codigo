#!/usr/bin/env node
/**
 * R0 · Manifesto de integração Figma ↔ playground ↔ castanha-react (docs/local/PLANO-INTEGRACAO-REACT.md).
 *
 *   node scripts/integration/build-manifest.js [--castanha ../castanha] [--ref origin/staging] [--cc origin/feat/figma-code-connect]
 *
 * Lê o clone local do monorepo oficial SÓ por `git show`/`git ls-tree` (não troca de branch nem altera nada nele):
 *   - componentes, exports e subcomponentes (`components/<X>/index.ts`)
 *   - props tipadas (`<X>.types.ts`: nome, tipo, valores de union, @default, descrição do JSDoc)
 *   - stories (`docs/*.stories.tsx`: title, tags de status, node-id do Figma) e docs MDX (`zeroheightUrl`, import)
 *   - galeria do Storybook (`component-stories.json`: storyId e docsPath)
 *   - Code Connect (`*.figma.ts` da branch de Code Connect: node-id + props do Figma lidas e mapas de enum Figma → React)
 * e casa cada componente do playground pelo node-id do Figma (Code Connect primeiro, story depois).
 * Saída: integration/manifest.json (metadados — nenhum código-fonte é copiado) e integration/COBERTURA.md.
 */
"use strict";
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const CASTANHA = path.resolve(ROOT, arg("castanha", "../castanha"));
const REF = arg("ref", "origin/staging"), CC = arg("cc", "origin/feat/figma-code-connect");
const FIGMA_KEY = "LKZBwmlb7fIbDKdGrMncuA";
const STORYBOOK = "https://castanha-web.caju.com.br/?path=";
const ZEROHEIGHT = "https://castanha.caju.com.br/858426090/p/";
const COMP = "packages/castanha-react/src/components";

const git = (...a) => execFileSync("git", ["-C", CASTANHA, ...a], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const show = (ref, p) => { try { return git("show", ref + ":" + p); } catch (e) { return null; } };
const ls = (ref, p) => { try { return git("ls-tree", "-r", "--name-only", ref, p).split("\n").filter(Boolean); } catch (e) { return []; } };
const meta = (ref) => { try { return git("log", "-1", "--format=%H|%ci|%s", ref).trim().split("|"); } catch (e) { return [null, null, null]; } };
const nid = (s) => String(s || "").replace(":", "-");

// ---------- props: parser simples de TypeScript (sem compilar) ----------
function balanced(src, open){ // a partir de src[open] === "{", devolve o fim
  let d = 0;
  for (let i = open; i < src.length; i++){ const c = src[i]; if (c === "{") d++; else if (c === "}"){ d--; if (!d) return i; } }
  return -1;
}
function splitMembers(body){
  const out = []; let d = 0, cur = "", i = 0, inStr = null;
  for (; i < body.length; i++){
    const c = body[i];
    if (inStr){ cur += c; if (c === inStr && body[i - 1] !== "\\") inStr = null; continue; }
    if (c === "'" || c === '"' || c === "`"){ inStr = c; cur += c; continue; }
    if (c === "/" && body[i + 1] === "*"){ const e = body.indexOf("*/", i + 2); cur += body.slice(i, e + 2); i = e + 1; continue; }
    if (c === "/" && body[i + 1] === "/"){ const e = body.indexOf("\n", i); i = e < 0 ? body.length : e; continue; }
    if ("{(<[".includes(c)) d++; else if ("})]".includes(c) || (c === ">" && body[i - 1] !== "=")) d--;
    if ((c === ";" || (c === "\n" && /^\s*(\/\*\*|[A-Za-z_$'][\w$']*\??\s*:)/.test(body.slice(i + 1)) && /\S/.test(cur) && !/([|&,:(<{]|\*\/)\s*$/.test(cur))) && d === 0){ out.push(cur); cur = ""; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}
function parseMember(seg){
  const docs = seg.match(/\/\*\*([\s\S]*?)\*\//g) || [];
  const doc = (docs[docs.length - 1] || "").replace(/^\/\*\*|\*\/$/g, "").split("\n").map((l) => l.replace(/^\s*\*\s?/, "")).join("\n");
  const code = seg.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const m = code.match(/^(?:readonly\s+)?([A-Za-z_$][\w$]*|'[^']+')(\?)?\s*:\s*([\s\S]+)$/);
  if (!m) return null;
  const type = m[3].replace(/\s+/g, " ").replace(/^\|\s*/, "").trim();
  const values = /^('[^']*'\s*(\|\s*'[^']*'\s*)*)$/.test(type) ? type.split("|").map((v) => v.trim().replace(/^'|'$/g, "")) : null;
  const def = (doc.match(/@default\s+(.+)/) || [])[1];
  const desc = doc.split("\n").filter((l) => l.trim() && !/^@/.test(l.trim())).join(" ").replace(/\s+/g, " ").trim();
  return { name: m[1].replace(/'/g, ""), required: !m[2], type, values, default: def ? def.trim().replace(/^'([^']+)'$/, "$1") : undefined, description: desc || undefined };
}
function parseTypes(src){
  const types = {};
  // todo `type X = … & { … }` e `interface X … { … }` com corpo de objeto (bases, variantes de union, opções)
  const re = /^(?:export\s+)?(type|interface)\s+(\w+)\s*(?:<[^=>{]*>)?\s*(=|extends[^{]*|)\s*/gm; let m;
  while ((m = re.exec(src))){
    let i = re.lastIndex, d = 0, open = -1;
    if (m[1] === "interface") open = src.indexOf("{", i - 1);
    else for (; i < src.length; i++){ const c = src[i]; if ("<(".includes(c)) d++; else if (">)".includes(c)) d--; else if (c === "{" && d === 0){ open = i; break; } else if ((c === ";" || (c === "\n" && /^\n(type|interface|export)\b/.test(src.slice(i, i + 12)))) && d === 0) break; }
    if (open < 0) continue;
    const end = balanced(src, open);
    const members = splitMembers(src.slice(open + 1, end)).map(parseMember).filter(Boolean);
    if (members.length) types[m[2].replace(/^Castanha(?=[A-Z])/, "")] = members;
  }
  return types;
}

// ---------- Code Connect ----------
function parseCodeConnect(src){
  const head = {}; ["url", "source", "component"].forEach((k) => { const r = src.match(new RegExp("^// " + k + "=(.+)$", "m")); if (r) head[k] = r[1].trim(); });
  const node = (head.url || "").match(/node-id=([\d]+-[\d]+)/), key = (head.url || "").match(/design\/([A-Za-z0-9]+)\//);
  const figmaProps = []; const re = /\.get(String|Boolean|Enum|InstanceSwap|Slot)\(\s*'([^']+)'(?:\s*,\s*(\{[\s\S]*?\}))?/g; let m;
  while ((m = re.exec(src))){
    const p = { figma: m[2], kind: m[1] };
    if (m[3]){ const map = {}; (m[3].match(/['"]?([^'":,{}\n]+?)['"]?\s*:\s*(['"][^'"]*['"]|true|false|undefined|\d+)/g) || []).forEach((pair) => { const mm = pair.match(/['"]?([^'":]+?)['"]?\s*:\s*(.+)$/); if (mm) map[mm[1].trim()] = mm[2].trim().replace(/^['"]|['"]$/g, ""); }); p.map = map; }
    if (!figmaProps.some((x) => x.figma === p.figma && x.kind === p.kind)) figmaProps.push(p);
  }
  const imp = (src.match(/imports:\s*\[\s*'([^']+)'/) || [])[1];
  return { component: head.component, node: node ? node[1] : null, fileKey: key ? key[1] : null, figmaProps, import: imp };
}

// ---------- leitura do castanha ----------
const src = { repo: "caju-beneficios/castanha", ref: REF, commit: null, date: null };
[src.commit, src.date] = meta(REF);
const ccMeta = meta(CC);
if (!src.commit){ console.error("Não achei " + REF + " em " + CASTANHA + " (rode git fetch no clone)."); process.exit(1); }

const files = ls(REF, COMP);
const dirs = Array.from(new Set(files.map((f) => f.slice(COMP.length + 1).split("/")[0]).filter((d) => d && !/\.ts$/.test(d)))).sort();
const exportedDirs = (show(REF, COMP + "/index.ts") || "").match(/from '\.\/(\w+)'/g).map((s) => s.match(/'\.\/(\w+)'/)[1]);
let gallery = []; try { gallery = JSON.parse(show(REF, "packages/castanha-react/src/storybook/ComponentsGallery/component-stories.json") || "[]"); } catch (e) {}
const galleryBy = {}; gallery.forEach((g) => { galleryBy[g.name] = g; });

const react = {};
dirs.forEach((dir) => {
  const own = files.filter((f) => f.startsWith(COMP + "/" + dir + "/"));
  const idx = show(REF, COMP + "/" + dir + "/index.ts") || "";
  const subs = []; const asg = idx.match(/Object\.assign\(\s*\w+\s*,\s*\{([\s\S]*?)\}\s*\)/); if (asg) asg[1].split(",").forEach((p) => { const k = p.split(":")[0].trim(); if (k) subs.push(k); });
  const named = (idx.match(/export\s+(?:const|function)\s+(\w+)/g) || []).map((s) => s.split(/\s+/).pop());
  const props = {}; own.filter((f) => /\.types\.ts$/.test(f)).forEach((f) => Object.assign(props, parseTypes(show(REF, f) || "")));
  const stories = own.filter((f) => /\.stories\.tsx$/.test(f)).map((f) => {
    const s = show(REF, f) || "";
    const nodes = Array.from(new Set((s.match(/node-id=(\d+-\d+)/g) || []).map((x) => x.split("=")[1])));
    const commented = (s.match(/\/\/[^\n]*node-id=(\d+-\d+)/g) || []).map((x) => x.match(/(\d+-\d+)/)[1]);
    const tagsM = s.match(/\btags:\s*\[([^\]]*)\]/);
    return { title: (s.match(/title:\s*'([^']+)'/) || [])[1], tags: tagsM ? tagsM[1].split(",").map((t) => t.trim().replace(/['"]/g, "")).filter(Boolean) : [],
      nodeIds: nodes.filter((n) => commented.indexOf(n) < 0), commentedNodeIds: commented, usesFigmaUrl: /FIGMA_URL/.test(s) };
  });
  const mdx = own.filter((f) => /\.mdx$/.test(f)).map((f) => show(REF, f) || "").join("\n");
  const zh = (mdx.match(/zeroheightUrl="([^"]+)"/) || [])[1];
  const g = galleryBy[dir] || galleryBy[named[0]] || null;
  react[dir] = {
    name: dir, exported: exportedDirs.indexOf(dir) >= 0, exports: named, subcomponents: subs, props,
    description: (mdx.match(/description="([^"]+)"/) || [])[1],
    import: (mdx.match(/importCode=\{`([^`]+)`\}/) || [])[1],
    tags: Array.from(new Set([].concat.apply([], stories.map((s) => s.tags)))),
    noFigma: /\bnoFigma\b/.test(mdx) || stories.some((s) => s.tags.indexOf("no-figma") >= 0),
    storyNodeIds: Array.from(new Set([].concat.apply([], stories.map((s) => s.nodeIds)))),
    storyTitle: (stories[0] || {}).title, storyId: g ? g.storyId : null,
    storybook: g ? STORYBOOK + g.docsPath : null, zeroheight: zh ? ZEROHEIGHT + zh : null,
    codeConnect: []
  };
});
const ccFiles = ls(CC, COMP).filter((f) => /\.figma\.ts$/.test(f));
ccFiles.forEach((f) => {
  const cc = parseCodeConnect(show(CC, f) || ""); cc.file = f.split("/").pop();
  const dir = f.slice(COMP.length + 1).split("/")[0];
  if (react[dir]) react[dir].codeConnect.push(cc);
});

// ---------- playground ----------
const pg = [];
fs.readdirSync(path.join(ROOT, "components")).forEach((d) => {
  const f = path.join(ROOT, "components", d, d + ".playground.js"); if (!fs.existsSync(f)) return;
  const t = fs.readFileSync(f, "utf8");
  t.split("CDS.register(").slice(1).forEach((b) => {
    const id = (b.match(/id:\s*"([^"]+)"/) || [])[1], name = (b.match(/name:\s*"([^"]+)"/) || [])[1], fig = (b.match(/figma:\s*"([^"]+)"/) || [])[1];
    if (id) pg.push({ id, name, block: /block:\s*true/.test(b), node: fig ? nid((fig.match(/node-id=([\d-]+)/) || [])[1]) : null, branch: /\/branch\//.test(fig || "") });
  });
});
// selection-group registra 3 grupos num laço
[["checkbox-group", "Checkbox Group", "4132-1511"], ["radio-button-group", "Radio Button Group", "4429-11192"], ["switch-group", "Switch Group", "4895-1233"]]
  .forEach((g) => { if (!pg.some((p) => p.id === g[0])) pg.push({ id: g[0], name: g[1], block: false, node: g[2], branch: false }); });

// ---------- casamento pelo node-id ----------
const byNode = {}; // node → [{ dir, via, target }]
Object.values(react).forEach((r) => {
  r.codeConnect.forEach((cc) => { if (cc.node) (byNode[cc.node] = byNode[cc.node] || []).push({ dir: r.name, via: "code-connect", target: cc.component, cc }); });
  r.storyNodeIds.forEach((n) => (byNode[n] = byNode[n] || []).push({ dir: r.name, via: "story", target: r.name }));
});
const components = pg.sort((a, b) => a.id.localeCompare(b.id)).map((p) => {
  const hits = byNode[p.node] || [];
  const cc = hits.find((h) => h.via === "code-connect"), st = hits.find((h) => h.via === "story");
  const hit = cc || st, r = hit ? react[hit.dir] : null;
  const notes = [];
  if (cc && st && cc.dir !== st.dir) notes.push("story de " + st.dir + " e Code Connect de " + cc.dir + " apontam para o mesmo node");
  if (r && cc && r.storyNodeIds.length){
    // a story documenta o componente inteiro (com subcomponentes): só diverge se não bater com nenhum node do Code Connect da pasta
    const ccNodes = r.codeConnect.map((c) => c.node);
    if (!r.storyNodeIds.some((n) => ccNodes.indexOf(n) >= 0)){
      const other = r.storyNodeIds.map((n) => (byNode[n] || []).find((h) => h.via === "code-connect" && h.dir !== r.name)).filter(Boolean)[0];
      notes.push("node-id da story (" + r.storyNodeIds.join(", ") + ") não bate com o Code Connect (" + ccNodes.join(", ") + ")" + (other ? " — é o node de " + other.target : ""));
    }
  }
  if (p.branch) notes.push("o link do playground aponta para uma branch do Figma");
  return {
    id: p.id, name: p.name, block: p.block, figma: { fileKey: FIGMA_KEY, node: p.node },
    react: r ? { component: hit.target, dir: r.name, via: hit.via, exported: r.exported, import: (cc && cc.cc.import) || r.import || null,
      storybook: r.storybook, zeroheight: r.zeroheight, tags: r.tags, figmaProps: cc ? cc.cc.figmaProps : [] } : null,
    status: r ? (r.tags.indexOf("deprecated") >= 0 ? "deprecated" : r.tags.indexOf("soon") >= 0 ? "soon" : "react") : p.block ? "building-block" : "so-figma",
    notes
  };
});
const matchedDirs = new Set(components.filter((c) => c.react).map((c) => c.react.dir));
const reactOnly = Object.values(react).filter((r) => !matchedDirs.has(r.name)).map((r) => ({
  name: r.name, exported: r.exported, noFigma: r.noFigma, tags: r.tags, storyNodeIds: r.storyNodeIds,
  inMain: null, storybook: r.storybook
}));
// componentes só da staging (ainda não na main)
const mainDirs = new Set((show("origin/main", COMP + "/index.ts") || "").match(/from '\.\/(\w+)'/g).map((s) => s.match(/'\.\/(\w+)'/)[1]));
Object.values(react).forEach((r) => { r.inMain = mainDirs.has(r.name); });
reactOnly.forEach((r) => { r.inMain = mainDirs.has(r.name); });

const manifest = {
  _about: "Manifesto de integração Figma ↔ playground ↔ castanha-react (R0). Gerado por scripts/integration/build-manifest.js — não editar à mão.",
  generated: new Date().toISOString(),
  source: src, codeConnect: { ref: CC, commit: ccMeta[0], date: ccMeta[1], files: ccFiles.length },
  summary: {
    playground: components.length,
    comReact: components.filter((c) => c.react).length,
    viaCodeConnect: components.filter((c) => c.react && c.react.via === "code-connect").length,
    viaStory: components.filter((c) => c.react && c.react.via === "story").length,
    buildingBlocks: components.filter((c) => !c.react && c.block).length,
    soFigma: components.filter((c) => !c.react && !c.block).length,
    soReact: reactOnly.length,
    comNotas: components.filter((c) => c.notes.length).length
  },
  components,
  reactOnly,
  react: Object.values(react).map((r) => ({ name: r.name, exported: r.exported, inMain: r.inMain, exports: r.exports, subcomponents: r.subcomponents,
    description: r.description, import: r.import, tags: r.tags, noFigma: r.noFigma, storyId: r.storyId, storybook: r.storybook, zeroheight: r.zeroheight,
    storyNodeIds: r.storyNodeIds, codeConnect: r.codeConnect.map((c) => ({ component: c.component, node: c.node, file: c.file })), props: r.props }))
};
fs.writeFileSync(path.join(ROOT, "integration", "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// ---------- COBERTURA.md ----------
const S = manifest.summary, row = (c) => "| `" + c.id + "` | " + c.name + " | " + (c.react ? "`" + c.react.component + "`" : "—") + " | " + (c.react ? c.react.via : c.status) + " | " + (c.notes.join("; ") || "") + " |";
const md = ["# Cobertura Figma ↔ playground ↔ castanha-react", "",
  "Gerado por `node scripts/integration/build-manifest.js` em " + manifest.generated.slice(0, 10) + " a partir de `" + REF + "` (`" + String(src.commit).slice(0, 8) + "`, " + String(src.date).slice(0, 10) + ") e do Code Connect `" + CC + "` (" + ccFiles.length + " arquivos).", "",
  "| | Componentes |", "|---|---:|",
  "| No playground | " + S.playground + " |", "| Com par no React | " + S.comReact + " (" + S.viaCodeConnect + " via Code Connect, " + S.viaStory + " via story) |",
  "| Building blocks sem par (internos no React) | " + S.buildingBlocks + " |", "| Só no Figma/playground | " + S.soFigma + " |", "| Só no React | " + S.soReact + " |", "| Com divergência anotada | " + S.comNotas + " |", "",
  "## Com par no React", "", "| Playground | Nome | React | Via | Notas |", "|---|---|---|---|---|"].concat(components.filter((c) => c.react).map(row))
  .concat(["", "## Sem par no React", "", "| Playground | Nome | React | Status | Notas |", "|---|---|---|---|---|"]).concat(components.filter((c) => !c.react).map(row))
  .concat(["", "## Só no React", "", "| Componente | Exportado | Na main | Tags | Node-id da story |", "|---|---|---|---|---|"])
  .concat(reactOnly.map((r) => "| `" + r.name + "` | " + (r.exported ? "sim" : "não") + " | " + (r.inMain ? "sim" : "só staging") + " | " + (r.tags.join(", ") || "—") + " | " + (r.storyNodeIds.join(", ") || "—") + " |"))
  .join("\n") + "\n";
fs.writeFileSync(path.join(ROOT, "integration", "COBERTURA.md"), md);
console.log(JSON.stringify(S));
