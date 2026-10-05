/**
 * MCP do Castanha DS · M2: gerar e revisar JSX do castanha-react (docs/local/PLANO-MCP.md).
 *
 * gerar  — mesmo código do painel "No React" do playground: roda o núcleo puro do scripts/react-kit.js (CDS.reactCore)
 *          sobre um elemento simulado com os atributos pedidos (traduzidos das props do Figma pelos mapas curados).
 * revisar — lê um trecho JSX/TSX (parser leve, sem dependências) e confere contra o castanha-react e o DS:
 *          componente inexistente ou sem import · prop inexistente · valor fora das opções · prop obrigatória faltando ·
 *          ícone/ilustração com nome errado · cor ou tamanho cru que tem token · padrão do React diferente do Figma.
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function lev(a, b){ const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++){ let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++){ const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; } } return d[b.length]; }
const near = (q, list) => list.map((x) => [x, lev(fold(q), fold(x))]).filter((p) => p[1] <= Math.max(2, Math.floor(q.length / 3))).sort((a, b) => a[1] - b[1]).slice(0, 3).map((p) => p[0]);

// ---------- núcleo do react-kit ----------
let CORE = null;
async function core(catalog){
  if (CORE) return CORE;
  const local = path.join(__dirname, "..", "scripts", "react-kit.js");
  const src = fs.existsSync(local) ? fs.readFileSync(local, "utf8") : await (await fetch(catalog.site + "scripts/react-kit.js")).text();
  const ctx = { document: {}, MutationObserver: null }; ctx.window = ctx; ctx.CDS = {};
  vm.createContext(ctx); vm.runInContext(src, ctx, { filename: "react-kit.js" });
  if (!ctx.CDS.reactCore) throw new Error("scripts/react-kit.js sem CDS.reactCore (versão antiga do playground).");
  return (CORE = ctx.CDS.reactCore);
}

// ---------- gerar ----------
/** Valores que o mapa conhece para cada atributo (padrões, condições, eq, map). */
function knownValues(map){
  const k = {}, add = (a, v) => { if (a && v != null && v !== "") (k[a] = k[a] || new Set()).add(String(v).replace(/^!/, "")); };
  Object.keys(map.defaults || {}).forEach((a) => add(a, map.defaults[a]));
  (function walk(n){
    if (!n) return;
    if (n.if) Object.keys(n.if).forEach((a) => add(a, n.if[a]));
    (n.props || []).forEach((p) => { if (p.if) Object.keys(p.if).forEach((a) => add(a, p.if[a])); if (p.eq != null) add(p.attr, p.eq); if (p.map) Object.keys(p.map).forEach((v) => add(p.attr, v)); });
    (n.children || []).forEach(walk); if (n.node) walk(n.node);
  })(map.jsx);
  return k;
}
/** Atributos que o mapa lê (padrões, props, condições, filhos). */
function mapAttrs(map){
  const a = new Set(Object.keys(map.defaults || {}));
  (function walk(n){
    if (!n) return;
    if (n.attr) a.add(n.attr); if (n.if) Object.keys(n.if).forEach((k) => a.add(k));
    (n.props || []).forEach((p) => { if (p.attr) a.add(p.attr); if (p.if) Object.keys(p.if).forEach((k) => a.add(k)); });
    (n.children || []).forEach(walk); if (n.node) walk(n.node);
  })(map.jsx);
  (map.figma || []).forEach((r) => { if (/^[a-z][a-z0-9-]*$/.test(r[1])) a.add(r[1]); });
  return a;
}
// nomes de prop do Figma → atributo do playground quando não há linha no mapa (convenção dos componentes do playground)
const CONV = { "text label": "label", "error message": "error", "supporting message": "supporting", "text content": "text", "text title": "text-title",
  "text description": "text-description", "placeholder content": "placeholder", "required text": "required-text", "label": "label" };
/** Props do Figma → atributos do playground, pelas linhas `figma` do mapa, pela convenção de nomes e pelos tipos no Figma. */
function figmaToAttrs(comp, map, figma){
  const attrs = {}, notes = [], kv = knownValues(map), types = {}, known = mapAttrs(map);
  (comp.figmaProps || []).forEach((p) => { types[fold(p.name)] = p; });
  Object.keys(figma || {}).forEach((name) => {
    const v = figma[name], fp = types[fold(name)];
    const row = (map.figma || []).find((r) => (fold(r[0]) === fold(name) || fold(r[0]).split(" / ").indexOf(fold(name)) >= 0) && /^[a-z][a-z0-9-]*$/.test(r[1]));
    let attr = row ? row[1] : null;
    if (!attr){ const guess = CONV[fold(name)] || fold(name).replace(/\s+/g, "-"); if (known.has(guess)) attr = guess; }
    if (!attr){
      const any = (map.figma || []).find((r) => fold(r[0]) === fold(name));
      notes.push("`" + name + "` não tem tradução para o React" + (any && any[3] ? " (" + any[3].replace(/`/g, "") + ")" : "") + ".");
      return;
    }
    if (attr === "disabled" || fold(name) === "state"){
      if (fold(v) === "disabled" || v === true) attrs.disabled = "";
      else if (!/^(enabled|hovered|pressed|dragged|dragover)$/.test(fold(v))) notes.push("State `" + v + "` não vira prop; só Disabled.");
      return;
    }
    if (typeof v === "boolean" || (fp && fp.type === "Boolean")){ attrs[attr] = String(v === true || fold(v) === "true"); return; }
    if (fp && (fp.type === "Text" || fp.type === "Instance swap")){ attrs[attr] = String(v); return; }
    let val = fold(v).trim().replace(/\s+/g, "-");
    const vals = kv[attr] ? Array.from(kv[attr]) : [];
    if (fp && fp.options && !fp.options.some((o) => fold(o) === fold(v))){ notes.push("`" + name + ": " + v + "` não é opção no Figma (" + fp.options.join(", ") + "); ignorei."); return; }
    else if (vals.length && vals.indexOf(val) < 0){ const hit = vals.find((x) => x.length > 2 && (val.indexOf(x) === 0 || x.indexOf(val) === 0)); if (hit) val = hit; } // "single-rows-chips" → "single"
    attrs[attr] = val;
  });
  return { attrs, notes };
}
async function generate(catalog, comp, args){
  const it = catalog.reactData.items[comp.id];
  if (!it) return "`" + comp.name + "` não tem componente no castanha-react.";
  if (!it.map) return "`" + comp.name + "` ainda não tem mapa Figma → React curado. Import:\n\n```tsx\n" + (it.import || "") + "\n```\n\nUse `componente` para ver as props.";
  const C = await core(catalog), map = it.map;
  const t = figmaToAttrs(comp, map, args.props_figma), attrs = Object.assign(t.attrs, args.atributos || {});
  // filhos (abas, chips…): `itens` = número ou lista de atributos por item; padrão 3
  const items = Array.isArray(args.itens) ? args.itens : Array.from({ length: typeof args.itens === "number" ? args.itens : 3 }, () => ({}));
  // mais de um tipo de filho (ex.: Chips Group: cds-input-chip ou cds-filter-chip): escolhe pelo valor das props do Figma ("Filter Chips" → filter)
  const sels = []; (function walk(n){ if (!n) return; if (n.each) sels.push(n.each); (n.children || []).forEach(walk); if (n.node) walk(n.node); })(map.jsx);
  const wanted = fold(Object.values(args.props_figma || {}).join(" "));
  const wordsOf = (x) => fold(x).replace(/\bcds-/g, "").split(/[-,\s]+/).filter((w) => w.length > 2);
  const common = sels.length > 1 ? wordsOf(sels[0]).filter((w) => sels.every((x) => wordsOf(x).indexOf(w) >= 0)) : [];
  const pick = sels.find((x) => wordsOf(x).some((w) => common.indexOf(w) < 0 && wanted.indexOf(w) >= 0)) || sels[0];
  const child = (a) => ({ getAttribute: (k) => (a[k] == null ? null : String(a[k])), querySelectorAll: () => [] });
  const el = { getAttribute: (k) => (attrs[k] == null ? null : String(attrs[k])), querySelectorAll: (sel) => (sel === pick ? items.map(child) : []) };
  const get = C.scoped(() => el, map.defaults);
  const code = C.text(C.snippet(catalog.reactData, Object.assign({}, it), get)).trim();
  // o playground preenche exemplos (imagem, foto…); aqui o que for obrigatório e faltar vira lembrete
  review(catalog, code).findings.filter((f) => f.lv !== "info").forEach((f) => t.notes.push("Complete: " + f.msg));
  return "```tsx\n" + code + "\n```" + (t.notes.length ? "\n\n" + t.notes.map((n) => "- " + n).join("\n") : "") +
    "\n\nGerado pelo mapa curado `integration/prop-map/" + comp.id + ".json` (o mesmo do painel \"No React\" do playground). Props omitidas = padrão do React.";
}

// ---------- revisar ----------
function parseJSX(src){
  const tags = [], imports = {};
  src.replace(/import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g, (m, names, from) => { names.split(",").map((s) => s.trim().split(/\s+as\s+/).pop()).filter(Boolean).forEach((n) => { imports[n] = from; }); return m; });
  const lineOf = (i) => src.slice(0, i).split("\n").length;
  let i = 0;
  while ((i = src.indexOf("<", i)) >= 0){
    const m = /^<([A-Za-z][\w.]*)/.exec(src.slice(i, i + 80));
    if (!m){ i++; continue; }
    const tag = { name: m[1], line: lineOf(i), props: [], selfClosing: false, hasChildren: false };
    let j = i + m[0].length;
    for (;;){
      while (/\s/.test(src[j] || "")) j++;
      if (j >= src.length) break;
      if (src.startsWith("/>", j)){ tag.selfClosing = true; j += 2; break; }
      if (src[j] === ">"){ j++; break; }
      if (src[j] === "{"){ j = skipBraces(src, j); tag.props.push({ name: "{...}", spread: true }); continue; }
      const pm = /^[\w:-]+/.exec(src.slice(j)); if (!pm){ j++; continue; }
      const prop = { name: pm[0], line: lineOf(j) }; j += pm[0].length;
      while (/\s/.test(src[j] || "")) j++;
      if (src[j] === "="){
        j++; while (/\s/.test(src[j] || "")) j++;
        if (src[j] === '"' || src[j] === "'"){ const q = src[j], e = src.indexOf(q, j + 1); prop.value = src.slice(j + 1, e); prop.literal = true; j = e + 1; }
        else if (src[j] === "{"){ const e = skipBraces(src, j); prop.expr = src.slice(j + 1, e - 1).trim(); const lit = /^(['"`])([^'"`]*)\1$/.exec(prop.expr); if (lit){ prop.value = lit[2]; prop.literal = true; } j = e; }
      } else prop.value = true;
      tag.props.push(prop);
    }
    if (!tag.selfClosing){ const close = src.indexOf("</" + tag.name, j); tag.hasChildren = close > j && src.slice(j, close).trim().length > 0; }
    tags.push(tag); i = j;
  }
  return { tags, imports };
}
function skipBraces(s, j){ let d = 0, q = null; for (; j < s.length; j++){ const c = s[j]; if (q){ if (c === q && s[j - 1] !== "\\") q = null; continue; } if (c === '"' || c === "'" || c === "`") q = c; else if (c === "{") d++; else if (c === "}"){ d--; if (!d) return j + 1; } } return j; }

// nomes comuns em outras libs → equivalente no castanha-react
const SYN = { variant: ["appearance", "kind"], color: ["appearance"], intent: ["appearance"], type: ["kind", "appearance"], icon: ["leadIcon"], startIcon: ["leadIcon"], endIcon: ["trailingIcon"], helperText: ["supportingMessage"], hint: ["supportingMessage"], errorMessage: ["supportingMessage"], isDisabled: ["disabled"], isOpen: ["open"], onDismiss: ["onClose"], text: ["label", "content"], title: ["label"] };
const HTML = /^(on[A-Z]\w*|aria-[\w-]+|data-[\w-]+|className|style|id|key|ref|children|href|target|rel|type|name|value|defaultValue|checked|defaultChecked|disabled|required|placeholder|title|role|tabIndex|alt|src|htmlFor|autoFocus|autoComplete|form|as|width|height|min|max|step|maxLength|minLength|readOnly|lang|dir|hidden)$/;
function literals(t){ const s = String(t).trim(); if (/^('[^']*'\s*\|?\s*)+$/.test(s)) return s.match(/'[^']*'/g).map((x) => x.slice(1, -1)); const m = s.match(/^Extract<\w+,\s*((?:'[^']*'\s*\|?\s*)+)>$/); return m ? m[1].match(/'[^']*'/g).map((x) => x.slice(1, -1)) : null; }
/** Props de uma tag do castanha-react ("Button", "Modal.Header" → ModalHeader, "Tabs.Item" → TabItem), seguindo composições.
 *  Tipos da própria pasta têm prioridade (dois pacotes podem ter um `LeadSlot`). Em união de variantes (`A | B | C`, tipo sem
 *  props próprias com várias referências), a prop só é obrigatória se for obrigatória em todas as variantes. */
function propsFor(data, tag){
  const parts = tag.split("."), dir = data.dirs[parts[0]]; if (!dir) return null;
  const glob = {}; Object.values(data.dirs).forEach((d) => { Object.keys(d.props).forEach((k) => { (glob[k] = glob[k] || {}).p = glob[k].p || d.props[k]; }); Object.keys(d.refs || {}).forEach((k) => { (glob[k] = glob[k] || {}).r = glob[k].r || d.refs[k]; }); });
  const T = (k) => ({ p: dir.props[k] || (glob[k] && glob[k].p) || [], r: (dir.refs || {})[k] || (glob[k] && glob[k].r) || [], known: !!(dir.props[k] || (dir.refs || {})[k] || glob[k]) });
  const last = parts[parts.length - 1], own = Object.keys(dir.props).concat(Object.keys(dir.refs || {}));
  const start = parts.length > 1 ? [parts.join(""), parts.join("") + "Props"].concat(own.filter((k) => k.endsWith(last) || k.endsWith(last + "Props"))).find((k) => T(k).known)
    : [tag, tag + "Props"].find((k) => own.indexOf(k) >= 0) || [tag, tag + "Props"].find((k) => T(k).known);
  /** Junta as props de um tipo (e do que ele compõe) num mapa nome → { type, required, def, lits }. */
  function collect(t, seen){
    const out = {}; if (seen[t] || !T(t).known) return out; seen[t] = 1;
    const x = T(t), merge = (m) => Object.keys(m).forEach((n) => { const a = out[n], b = m[n]; if (!a) out[n] = Object.assign({}, b); else { if (b.lits) a.lits = Array.from(new Set((a.lits || []).concat(b.lits))); a.required = a.required || b.required; } });
    x.p.forEach((p) => merge({ [p.n]: { name: p.n, type: p.t, required: !!p.r, def: p.d, lits: literals(p.t) } }));
    const refs = x.r.filter((r) => T(r).known && !/Element$/.test(r));
    if (!x.p.length && refs.length > 1){ // união de variantes
      const parts = refs.map((r) => collect(r, Object.assign({}, seen))), names = new Set([].concat.apply([], parts.map((m) => Object.keys(m))));
      names.forEach((n) => { const all = parts.filter((m) => m[n]), first = Object.assign({}, all[0][n]);
        first.required = all.length === parts.length && all.every((m) => m[n].required);
        all.forEach((m) => { if (m[n].lits) first.lits = Array.from(new Set((first.lits || []).concat(m[n].lits))); }); merge({ [n]: first }); });
    } else refs.forEach((r) => merge(collect(r, seen)));
    if (/Props$/.test(t)) merge(collect(t.replace(/Props$/, ""), seen));
    return out;
  }
  if (!start){ const out = {}; Object.values(dir.props).forEach((l) => l.forEach((p) => { out[p.n] = out[p.n] || { name: p.n, type: p.t, required: false, def: p.d, lits: literals(p.t) }; })); return out; }
  return collect(start, {});
}
function review(catalog, src){
  const data = catalog.reactData, { tags, imports } = parseJSX(src), out = [];
  const say = (lv, line, msg) => out.push({ lv, line, msg });
  const iconNames = new Set(catalog.icons.filter((i) => i.react).map((i) => i.name));
  const ills = catalog.illustrations, illNames = new Set(ills.filter((i) => i.react).map((i) => i.react.name));
  const byValue = {}; catalog.tokens.forEach((t) => { if (t.light && t.castanha) (byValue[fold(t.light)] = byValue[fold(t.light)] || []).push(t.castanha); });
  const compByReact = {}; catalog.components.forEach((c) => { if (c.react) (compByReact[c.react.component] = compByReact[c.react.component] || []).push(c); });
  const PKG = catalog.packages.react;
  tags.forEach((t) => {
    // cor/tamanho cru em style (inclusive em tags HTML): sugere o token pelo valor E pela propriedade CSS
    t.props.filter((p) => p.name === "style" && p.expr).forEach((p) => {
      p.expr.replace(/([A-Za-z]+)\s*:\s*(['"]?)([^,'"}]+)\2/g, (m, key, q, val) => {
        (val.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\)|\b\d+px\b/g) || []).forEach((raw) => {
          let v = fold(raw); if (/^#[0-9a-f]{3}$/.test(v)) v = "#" + v.slice(1).split("").map((c) => c + c).join("");
          const k = fold(key), pref = /^color$/.test(k) ? ["colors-text"] : /background/.test(k) ? ["colors-surface", "colors-"] : /border.*color|outline/.test(k) ? ["colors-border"] :
            /radius/.test(k) ? ["border-radius"] : /fontsize/.test(k) ? ["font-size"] : /(padding|margin|gap|width|height|top|left|right|bottom|inset)/.test(k) ? ["sizes"] : /border/.test(k) ? ["border-width", "colors-border"] : [];
          const all = byValue[v] || [], tok = all.filter((x) => pref.some((pp) => x.indexOf("--castanha-" + pp) === 0)).concat(all.filter((x) => !pref.some((pp) => x.indexOf("--castanha-" + pp) === 0)));
          say(tok.length ? "media" : "info", p.line, "Valor cru `" + raw + "` em `style` (" + key + ")" + (tok.length ? ": use `var(" + tok[0] + ")`" + (tok.length > 1 ? " (outros com o mesmo valor: " + tok.slice(1, 3).join(", ") + ")" : "") + "." : ". Prefira um token do DS (ferramenta `tokens`)."));
        });
        return m;
      });
    });
    if (!/^[A-Z]/.test(t.name)) return;
    const root = t.name.split(".")[0], dir = data.dirs[root], from = imports[root];
    if (!dir){ if (from === PKG) say("alta", t.line, "`<" + t.name + ">` não existe no castanha-react." + (near(root, Object.keys(data.dirs)).length ? " Você quis dizer " + near(root, Object.keys(data.dirs)).map((x) => "`" + x + "`").join(" ou ") + "?" : "")); return; }
    if (from && from !== PKG && !/castanha-react/.test(from)) return; // componente homônimo de outra lib
    if (!from && Object.keys(imports).length) say("info", t.line, "`" + root + "` não aparece no import: `import { " + root + " } from '" + PKG + "';`");
    const props = propsFor(data, t.name) || {}, names = Object.keys(props);
    t.props.filter((p) => !p.spread).forEach((p) => {
      const d = props[p.name];
      if (!d && SYN[p.name] && !HTML.test(p.name)){ const alt = SYN[p.name].filter((x) => props[x]); if (alt.length){ say("alta", p.line, "`" + t.name + "` não tem a prop `" + p.name + "`. No Castanha DS: " + alt.map((x) => "`" + x + "`" + (props[x].lits ? " (" + props[x].lits.join(", ") + ")" : "")).join(" ou ") + "."); return; } }
      if (!d){ if (!HTML.test(p.name)){ const s = near(p.name, names); say("alta", p.line, "`" + t.name + "` não tem a prop `" + p.name + "`." + (s.length ? " Você quis dizer " + s.map((x) => "`" + x + "`").join(" ou ") + "?" : "")); } return; }
      if (p.literal && /^boolean$/.test(String(d.type).trim()) && typeof p.value === "string") say("alta", p.line, "`" + p.name + "` é boolean em `<" + t.name + ">`; recebeu texto." + (p.name === "error" && props.supportingMessage ? " A mensagem vai em `supportingMessage`: `error supportingMessage=\"" + p.value + "\"`." : ""));
      if (p.literal && d.lits && d.lits.indexOf(String(p.value)) < 0) say("alta", p.line, "`" + p.name + "=\"" + p.value + "\"` não é aceito em `<" + t.name + ">`. Opções: " + d.lits.map((x) => "`" + x + "`").join(", ") + ".");
      if (p.literal && d.def != null && String(d.def) === String(p.value)) say("info", p.line, "`" + p.name + "=\"" + p.value + "\"` é o padrão do React; pode omitir.");
      const iconProp = /^(leadIcon|trailingIcon|icon)$/.test(p.name) || (root === "Icon" && p.name === "name");
      if (iconProp && p.literal && !iconNames.has(p.value)){ const s = near(p.value, Array.from(iconNames)); say("alta", p.line, "Ícone `" + p.value + "` não existe no castanha-icons." + (s.length ? " Parecidos: " + s.map((x) => "`" + x + "`").join(", ") + "." : " Use a ferramenta `icone`.")); }
      if (root === "Illustration" && p.name === "name" && p.literal && !illNames.has(p.value)){
        const fig = ills.find((i) => i.id === p.value || i.id.replace("/", "-") === p.value);
        say("alta", p.line, "Ilustração `" + p.value + "` não existe no castanha-illustrations." + (fig && fig.react ? " No pacote ela se chama `" + fig.react.name + "`." : " Use a ferramenta `ilustracao`."));
      }
    });
    names.forEach((n) => { const d = props[n]; if (d.required && n !== "children" && !t.props.some((p) => p.name === n || p.spread)) say("media", t.line, "`<" + t.name + ">` sem a prop obrigatória `" + n + "` (" + d.type + ")."); });
    if (props.children && props.children.required && !t.hasChildren && !t.props.some((p) => p.name === "children")) say("media", t.line, "`<" + t.name + ">` espera filhos (children).");
    // padrão do React diferente do Figma, quando a prop foi omitida
    (compByReact[t.name] || []).forEach((c) => (c.react.checks || []).filter((k) => k.kind === "padrao-diferente").forEach((k) => {
      const prop = (k.text.match(/em `([^`]+)`/) || [])[1], rp = prop && fold(prop).replace(/\s+/g, "");
      if (rp && !t.props.some((p) => fold(p.name) === rp)) say("info", t.line, "`<" + t.name + ">` sem `" + fold(prop) + "`: " + k.text.replace(/^Padrão diferente em `[^`]+`: /, ""));
    }));
  });
  return { tags: tags.filter((t) => /^[A-Z]/.test(t.name)).length, findings: out };
}
function reviewText(catalog, src){
  const r = review(catalog, src), LV = { alta: "🔴 Erro", media: "🟡 Atenção", info: "ℹ️ Nota" }, order = { alta: 0, media: 1, info: 2 };
  if (!r.tags) return "Não encontrei componentes (tags com inicial maiúscula) no trecho.";
  if (!r.findings.length) return "✅ Nenhum problema em " + r.tags + " componente(s): props, valores, ícones, ilustrações e tokens batem com o castanha-react e o DS.";
  const c = r.findings.reduce((o, f) => { o[f.lv] = (o[f.lv] || 0) + 1; return o; }, {});
  return r.tags + " componente(s) lidos · " + (c.alta || 0) + " erro(s), " + (c.media || 0) + " atenção, " + (c.info || 0) + " nota(s)\n\n" +
    r.findings.sort((a, b) => order[a.lv] - order[b.lv] || a.line - b.line).map((f) => "- " + LV[f.lv] + " (linha " + f.line + "): " + f.msg).join("\n");
}

module.exports = { generate, reviewText, review, parseJSX, propsFor };
