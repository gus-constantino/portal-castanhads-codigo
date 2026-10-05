/**
 * R2 · Check em três vértices: Figma × Code Connect/castanha-react × playground (docs/local/PLANO-INTEGRACAO-REACT.md).
 * Chamado por scripts/integration/build-manifest.js; não roda sozinho.
 *
 * Vértices:
 *   Figma       integration/figma-props.tsv — componentPropertyDefinitions lidas via MCP (só leitura). Formato por linha:
 *               node<TAB>nome<TAB>Prop=V:padrão:op1|op2 ; Prop=B:1|0 ; Prop=T ; Prop=I:ícone ; Prop=S (Slot)
 *   React       props do .types.ts (manifest) + ligações do Code Connect (qual prop do Figma vira qual prop do React)
 *   Playground  mapas curados integration/prop-map/<id>.json + atributos citados no código dos componentes
 *
 * Níveis: alta  = quebra a tradução (Code Connect lê prop que não existe no Figma, valor que o React não aceita)
 *         media = muda o resultado sem quebrar (padrão diferente, opção do Figma sem tradução, mapa curado errado)
 *         info  = prop do Figma que não chega ao React (o dev não recebe a informação)
 */
"use strict";
const fs = require("fs"), path = require("path");

// Props do Figma que são interação ou detalhe de desenho, não API: não contam como "não chega ao React"
const INTERACTION = /^(Is Filled|Is Active|Show Caret|Spinner Position|Character Counter Value|Required Text|State)$/;

/** Ligações do Code Connect: [{ var, figma, kind, map, prop }] — só leituras diretas de `instance` (não as aninhadas). */
function parseBindings(src){
  const out = [], ex = (src.match(/example:\s*figma\.code`([\s\S]*?)`,\s*\n\s*imports/) || [])[1] || "";
  const re = /const\s+(\w+)\s*=\s*instance\.(get\w+)\(\s*'([^']+)'\s*(?:,\s*(\{[\s\S]*?\})\s*)?\)\s*;/g; let m;
  while ((m = re.exec(src))){
    const b = { var: m[1], kind: m[2].replace(/^get/, ""), figma: m[3] };
    if (m[4]){
      const map = {}; const pr = /([^\s:,{}'"]+|'[^']+')\s*:\s*('[^']*'|true|false|undefined|-?\d+|instance\.get\w+\('[^']+'\))/g; let q;
      while ((q = pr.exec(m[4]))) map[q[1].replace(/'/g, "")] = q[2].replace(/^'|'$/g, "");
      b.map = map;
      // getBoolean('Show Label', { true: instance.getString('Text Label') }) também lê a prop de texto
      const inner = m[4].match(/instance\.get\w+\('([^']+)'\)/g);
      if (inner) inner.forEach((s) => out.push({ var: m[1], kind: "String", figma: s.match(/'([^']+)'/)[1], inner: true }));
    }
    const v = b.var.replace(/\$/g, "\\$");
    const pm = ex.match(new RegExp("([\\w-]+)=[\"{]\\$\\{" + v + "\\}")) || ex.match(new RegExp("\\$\\{" + v + "\\s*\\?\\s*'([\\w-]+)'")) ||
      ex.match(new RegExp("\\$\\{" + v + "\\s*\\?\\s*figma\\.code`<?([\\w.-]+)[=\\s/>]"));
    b.prop = pm ? pm[1] : new RegExp(">\\s*\\$\\{" + v + "\\}").test(ex) ? "children" : null;
    if (pm){ const before = ex.slice(0, ex.indexOf(pm[0])), tags = before.match(/<([A-Z][\w.]*)/g); b.tag = tags ? tags[tags.length - 1].slice(1) : null; } // em qual componente do exemplo a prop entra
    out.push(b);
  }
  // o rótulo de texto lido dentro do getBoolean entra na mesma prop do React
  out.forEach((b) => { if (b.inner){ const o = out.find((x) => x.var === b.var && !x.inner); b.prop = o ? o.prop : null; } });
  // tudo o que o Code Connect lê da instância, inclusive fora de `const x = …` (ex.: getBoolean('Show Lead item') && …)
  out.reads = Array.from(new Set((src.match(/instance\.get\w+\(\s*'[^']+'/g) || []).map((x) => x.match(/'([^']+)'/)[1])));
  return out;
}

function readFigma(file){
  const figma = {};
  if (!fs.existsSync(file)) return figma;
  fs.readFileSync(file, "utf8").split("\n").forEach((l) => {
    if (!l.trim() || l.charAt(0) === "#") return;
    const [node, name, props] = l.split("\t"), ps = {};
    (props || "").split(";").filter(Boolean).forEach((p) => {
      const i = p.indexOf("="), k = p.slice(0, i), v = p.slice(i + 1), t = v.charAt(0);
      if (t === "V"){ const r = v.slice(2), j = r.indexOf(":"); ps[k] = { type: "VARIANT", default: r.slice(0, j), options: r.slice(j + 1).split("|") }; }
      else if (t === "B") ps[k] = { type: "BOOLEAN", default: v.slice(2) === "1" };
      else if (t === "I") ps[k] = { type: "INSTANCE_SWAP", default: v.slice(2) };
      else ps[k] = { type: t === "T" ? "TEXT" : "SLOT" };
    });
    figma[node] = { name, props: ps };
  });
  return figma;
}

/** Índice global de tipos do React: nome → { props, refs } (para seguir `ChipFilter → ChipBaseProps`, `DropButtonProps → ButtonProps`). */
function typeIndex(react){
  const idx = {};
  Object.values(react).forEach((d) => {
    Object.keys(d.props).forEach((k) => { (idx[k] = idx[k] || { props: [], refs: [] }).props = d.props[k]; });
    Object.keys(d.refs || {}).forEach((k) => { (idx[k] = idx[k] || { props: [], refs: [] }).refs = d.refs[k]; });
  });
  return idx;
}
/** Props do React de um componente do código ("Button", "Checkbox.Group" → CheckboxGroup, "Tabs.Item" → TabItem, "Chips.Filter" → ChipFilter),
 *  seguindo composições e unions; props repetidas juntam os valores aceitos. null = tipo não encontrado. */
function reactProps(idx, dir, comp){
  if (!dir || !comp) return null;
  const parts = String(comp).split("."), last = parts[parts.length - 1];
  const own = Object.keys(dir.props).concat(Object.keys(dir.refs || {}));
  const start = parts.length > 1
    ? [parts.join(""), parts.join("") + "Props"].concat(own.filter((k) => k.endsWith(last) || k.endsWith(last + "Props"))).find((k) => idx[k])
    : [comp, comp + "Props"].find((k) => idx[k] && own.indexOf(k) >= 0) || [comp, comp + "Props"].find((k) => idx[k]);
  if (!start) return null;
  const out = [], seen = {};
  (function walk(t){
    if (seen[t] || !idx[t]) return; seen[t] = 1;
    idx[t].props.forEach((p) => {
      const ex = out.find((x) => x.name === p.name), lit = literals(p);
      if (!ex) out.push(Object.assign({}, p, { lits: lit }));
      else if (lit) ex.lits = Array.from(new Set((ex.lits || []).concat(lit)));
    });
    idx[t].refs.forEach(walk);
    if (/Props$/.test(t)) walk(t.replace(/Props$/, ""));
  })(start);
  return out;
}
function literals(p){
  if (p.values) return p.values;
  const m = String(p.type).match(/^Extract<\w+,\s*((?:'[^']*'\s*\|?\s*)+)>$/);
  return m ? m[1].match(/'[^']*'/g).map((s) => s.slice(1, -1)) : null;
}
const HTML = /^(on[A-Z]\w*|aria-[\w-]+|default\w*|children|id|className|style|value|checked|name|type|placeholder|disabled|required|open|href|target|rel)$/;

function run(ctx){
  const { components, react, maps, figma, codeText } = ctx, findings = [], idx = typeIndex(react);
  const add = (id, level, kind, msg) => findings.push({ id, level, kind, msg });
  components.forEach((c) => {
    if (!c.react) return;
    const dir = react[c.react.dir], fg = figma[c.figma.node];
    const cc = dir.codeConnect.find((x) => x.node === c.figma.node);
    if (!fg){ add(c.id, "info", "sem-figma", "Sem retrato das props do Figma (rode a leitura via MCP)."); return; }
    // ---- Figma × Code Connect × React ----
    if (cc && cc.bindings){
      const read = new Set(cc.bindings.reads || []);
      cc.bindings.forEach((b) => {
        read.add(b.figma);
        const props = reactProps(idx, dir, b.tag || cc.component) || [];
        const f = fg.props[b.figma];
        if (!f){ add(c.id, "alta", "cc-prop-inexistente", "O Code Connect lê `" + b.figma + "`, que não existe no Figma (props: " + Object.keys(fg.props).join(", ") + ")."); return; }
        if (b.kind === "Enum" && b.map && f.options){
          const miss = f.options.filter((o) => !(o in b.map)), stale = Object.keys(b.map).filter((k) => f.options.indexOf(k) < 0);
          if (stale.length) add(c.id, "alta", "cc-opcao-inexistente", "`" + b.figma + "`: o Code Connect traduz " + stale.map((s) => "`" + s + "`").join(", ") + ", que não existe no Figma (opções: " + f.options.join(", ") + ").");
          if (miss.length) add(c.id, "media", "cc-opcao-sem-traducao", "`" + b.figma + "`: " + miss.map((s) => "`" + s + "`").join(", ") + " do Figma não tem tradução no Code Connect (vira `undefined` no React).");
          const rp = b.prop && props.find((p) => p.name === b.prop), lit = rp && rp.lits;
          if (lit){
            const bad = Array.from(new Set(Object.values(b.map).filter((v) => !/^(true|false|undefined)$/.test(v) && lit.indexOf(v) < 0)));
            if (bad.length) add(c.id, "alta", "valor-fora-do-react", "`" + b.figma + "` → `" + b.prop + "`: " + bad.map((s) => "`" + s + "`").join(", ") + " não existe no React (aceita " + lit.join(", ") + ").");
            const fv = b.map[f.default];
            if (fv && rp.default != null && fv !== String(rp.default) && !/^(true|false|undefined)$/.test(fv))
              add(c.id, "media", "padrao-diferente", "Padrão diferente em `" + b.figma + "`: uma instância nova no Figma vem " + f.default + " (`" + fv + "`); no React, sem a prop, vem `" + rp.default + "`.");
          }
        }
        if (b.prop && !b.inner && props.length && b.prop !== "children" && !/^[A-Z]/.test(b.prop) && !props.some((p) => p.name === b.prop) && !HTML.test(b.prop))
          add(c.id, "alta", "cc-prop-react-inexistente", "O Code Connect gera `" + b.prop + "` em `<" + (b.tag || cc.component) + ">`, que não existe nas props do React (o código gerado não compila em TypeScript).");
      });
      const lost = Object.keys(fg.props).filter((k) => !read.has(k) && !INTERACTION.test(k) && fg.props[k].type !== "SLOT");
      if (lost.length) add(c.id, "info", "nao-chega-ao-react", "Não chega ao React pelo Code Connect: " + lost.map((s) => "`" + s + "`").join(", ") + ".");
    } else if (c.react.via !== "code-connect"){
      add(c.id, "info", "sem-code-connect", "Sem Code Connect: o par com o React vem só do node da story.");
    }
    // ---- mapa curado (playground → React) ----
    const map = maps[c.id];
    if (!map) return;
    const where = "mapa `integration/prop-map/" + c.id + ".json`";
    (function walk(node, rootDir){
      if (!node || !node.tag){ if (node && node.each) walk(node.node, rootDir); return; }
      const d = react[node.tag.split(".")[0]] || rootDir, props = reactProps(idx, d, node.tag);
      (node.props || []).forEach((p) => {
        if (props && !props.some((x) => x.name === p.prop) && !HTML.test(p.prop)) add(c.id, "media", "mapa-prop-react", "No " + where + ": `" + node.tag + "` não tem a prop `" + p.prop + "` no React.");
        if (p.attr && !codeText.has(p.attr)) add(c.id, "media", "mapa-atributo", "No " + where + ": o atributo `" + p.attr + "` não aparece no código do playground.");
      });
      (node.children || []).forEach((k) => walk(k, d));
    })(map.jsx, dir);
    (map.figma || []).forEach((r) => {
      const n = r[0];
      if (/^—|›|\(|\/|×|\.|“/.test(n) || /^(Opções|Slot)$/.test(n)) return; // linhas descritivas
      if (!fg.props[n]) add(c.id, "media", "mapa-prop-figma", "No " + where + ": a linha `" + n + "` não é prop do Figma (props: " + Object.keys(fg.props).join(", ") + ").");
    });
  });
  return findings;
}

/** Texto de todo o código dos componentes, para saber se um atributo existe (com aspas). */
function codeAttrs(root){
  const set = new Set(), files = [path.join(root, "scripts", "cds-element.js"), path.join(root, "scripts", "playground-kit.js")];
  fs.readdirSync(path.join(root, "components")).forEach((d) => fs.readdirSync(path.join(root, "components", d)).filter((f) => /\.js$/.test(f)).forEach((f) => files.push(path.join(root, "components", d, f))));
  files.forEach((f) => (fs.readFileSync(f, "utf8").match(/["'][a-z][a-z0-9-]*["']/g) || []).forEach((s) => set.add(s.slice(1, -1))));
  return set;
}

// ---------- R3 · tokens: --castanha-* do playground × castanha-tokens (figma-tokens.json da staging) ----------
/** Tokens oficiais: nome CSS (regra name/cti/castanha-css do pacote) → { "Light"|"Dark"|"Desktop"|…: valor }. */
function officialTokens(json, meta){
  const axis = (c, m) => { const col = meta.collections.find((x) => x.name === c), mo = col && col.modes.find((x) => x.name === m); return mo && mo.axisModes && mo.axisModes.length; };
  const out = {};
  (function walk(o, p){
    if (o && typeof o === "object" && "$value" in o){
      const d = axis(p[0], p[1]) ? 3 : 2, seg = p.slice(d).filter((x) => x !== "Common" && x !== "Specific");
      const n = "--castanha-" + seg.map((x) => x.replace(/\s+/g, "-")).join("-").toLowerCase();
      (out[n] = out[n] || {})[p[d - 1]] = o.$value; return;
    }
    if (o && typeof o === "object") Object.keys(o).forEach((k) => walk(o[k], p.concat(k)));
  })(json, []);
  return out;
}
function cssBlocks(css){
  const blocks = {};
  const re = /(^|\n)\s*(?:@media \(min-width:(\d+)px\)\s*\{\s*)?([^{}\n]+)\{([^{}]*)\}/g; let m;
  while ((m = re.exec(css))){
    const sel = (m[2] ? "@" + m[2] + " " : "") + m[3].trim(), o = blocks[sel] = blocks[sel] || {};
    (m[4].match(/--[a-z0-9-]+\s*:[^;]+/g) || []).forEach((l) => { const i = l.indexOf(":"); o[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  }
  return blocks;
}
function norm(v){
  v = String(v).trim().toLowerCase();
  let m = v.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16)).join(",") + "," + (m[2] ? parseInt(m[2], 16) / 255 : 1).toFixed(2);
  m = v.match(/^rgba?\(([^)]+)\)$/);
  if (m){ const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return p.slice(0, 3).join(",") + "," + (p[3] == null ? 1 : p[3]).toFixed(2); }
  return v.replace(/px$/, "").replace(/^["']|["']$/g, "");
}
/** Compara: alias que falta aqui, valor diferente (por tema e por modo de viewport) e alias que o pacote não tem. */
function checkTokens(official, css){
  const B = cssBlocks(css), root = Object.assign({}, B[":root"]), findings = [];
  const scope = { Light: root, Dark: Object.assign({}, root, B['html[data-theme="dark"]']),
    Mobile: Object.assign({}, root, B['[data-viewport="mobile"]']), Tablet: Object.assign({}, root, B['[data-viewport="tablet"]']), Desktop: Object.assign({}, root, B['[data-viewport="desktop"]']) };
  const res = (o, v, d) => { const m = String(v).match(/^var\((--[a-z0-9-]+)\)$/); return m && (d || 0) < 12 ? res(o, o[m[1]], (d || 0) + 1) : v; };
  const ours = new Set(Object.keys(root).filter((n) => n.indexOf("--castanha-") === 0));
  let ok = 0;
  Object.keys(official).forEach((n) => {
    if (!ours.has(n)){ findings.push({ id: "tokens", level: "media", kind: "token-sem-alias", msg: "`" + n + "` existe no castanha-tokens e não tem alias no playground." }); return; }
    const ourVal = (mode) => res(scope[mode], "var(" + n + ")");
    const diffs = Object.keys(official[n]).filter((mode) => scope[mode] && norm(official[n][mode]) !== norm(ourVal(mode)))
      .map((mode) => mode + ": pacote `" + official[n][mode] + "` × playground `" + ourVal(mode) + "`");
    if (diffs.length) findings.push({ id: "tokens", level: "alta", kind: "token-valor", msg: "`" + n + "` com valor diferente (" + diffs.join("; ") + ")." });
    else ok++;
  });
  const extra = Array.from(ours).filter((n) => !official[n]);
  if (extra.length) findings.push({ id: "tokens", level: "info", kind: "token-so-no-playground", msg: "Alias sem par no castanha-tokens (o Figma tem, o pacote ainda não): " + extra.map((x) => "`" + x + "`").join(", ") + "." });
  return { findings, ok, official: Object.keys(official).length, ours: ours.size };
}

module.exports = { parseBindings, readFigma, run, codeAttrs, officialTokens, checkTokens };
