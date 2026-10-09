/**
 * MCP do Castanha DS · gerar Dart do castanha_flutter (par do gerar_jsx do React).
 *
 * gerar — mesmo código do painel "No Flutter" do playground: roda o núcleo puro do scripts/flutter-kit.js (CDS.flutterCore)
 *         sobre um elemento simulado com os atributos pedidos (traduzidos das props do Figma pelos mapas integration/flutter-map/).
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// ---------- núcleo do flutter-kit ----------
let CORE = null;
async function core(catalog){
  if (CORE) return CORE;
  // no arquivo único (dist/mcp/castanha-mcp.js) o núcleo já vem embutido, sem vm nem leitura de arquivo
  if (typeof globalThis.__CASTANHA_FLUTTER_KIT__ === "function") return (CORE = globalThis.__CASTANHA_FLUTTER_KIT__());
  const local = path.join(__dirname, "..", "scripts", "flutter-kit.js");
  const src = fs.existsSync(local) ? fs.readFileSync(local, "utf8") : await (await fetch(catalog.site + "scripts/flutter-kit.js")).text();
  const ctx = { document: {}, MutationObserver: null }; ctx.window = ctx; ctx.CDS = {};
  vm.createContext(ctx); vm.runInContext(src, ctx, { filename: "flutter-kit.js" });
  if (!ctx.CDS.flutterCore) throw new Error("scripts/flutter-kit.js sem CDS.flutterCore.");
  return (CORE = ctx.CDS.flutterCore);
}

// ---------- mapa ----------
/** Percorre o widget do mapa (alternativas, aninhados e itens de lista). */
function walk(w, fn){
  if (!w) return;
  if (Array.isArray(w)){ w.forEach((x) => walk(x, fn)); return; }
  fn(w, null);
  (w.args || []).forEach((a) => { fn(w, a); if (a.widget) walk(a.widget, fn); if (a.widgets) Object.values(a.widgets).forEach((x) => walk(x, fn)); });
}
/** Valores que o mapa conhece para cada atributo (padrões, condições, eq, map). */
function knownValues(map){
  const k = {}, add = (a, v) => { if (a && v != null && v !== "") (k[a] = k[a] || new Set()).add(String(v).replace(/^!/, "")); };
  Object.keys(map.defaults || {}).forEach((a) => add(a, map.defaults[a]));
  walk(map.widget, (w, a) => {
    const ifs = a ? a.if : w.if;
    if (ifs) Object.keys(ifs).forEach((x) => add(x, ifs[x]));
    if (a && a.eq != null) add(a.attr, a.eq);
    if (a && a.map) Object.keys(a.map).forEach((v) => add(a.attr, v));
  });
  return k;
}
/** Atributos que o mapa lê. */
function mapAttrs(map){
  const s = new Set(Object.keys(map.defaults || {}));
  walk(map.widget, (w, a) => {
    const ifs = a ? a.if : w.if; if (ifs) Object.keys(ifs).forEach((x) => s.add(x));
    if (a && a.attr) s.add(a.attr);
    if (a && a.code) (a.code.match(/\{(?:q:|c:|ill:|@)([a-z-]+)\}/g) || []).forEach((m) => s.add(m.replace(/^\{(?:q:|c:|ill:|@)|\}$/g, "")));
  });
  (map.figma || []).forEach((r) => String(r[1]).split(/\s*[·+]\s*|\s+/).forEach((x) => { if (/^[a-z][a-z0-9-]*$/.test(x)) s.add(x); }));
  return s;
}
const CONV = { "text label": "label", "error message": "error", "supporting message": "supporting", "text content": "text", "text title": "text-title",
  "text description": "text-description", "placeholder content": "placeholder", "label": "label" };
/** Props do Figma → atributos do playground (linhas `figma` do mapa, convenção de nomes e tipos do Figma). */
function figmaToAttrs(comp, map, figma){
  const attrs = {}, notes = [], kv = knownValues(map), types = {}, known = mapAttrs(map);
  (comp.figmaProps || []).forEach((p) => { types[fold(p.name)] = p; });
  Object.keys(figma || {}).forEach((name) => {
    const v = figma[name], fp = types[fold(name)];
    const row = (map.figma || []).find((r) => fold(r[0]) === fold(name) || fold(r[0]).split(/\s*[·/›]\s*/).indexOf(fold(name)) >= 0);
    let attr = row ? String(row[1]).split(/\s*[·+]\s*/)[0] : null;
    if (attr && !/^[a-z][a-z0-9-]*$/.test(attr)) attr = null;
    if (!attr){ const guess = CONV[fold(name)] || fold(name).replace(/\s+/g, "-"); if (known.has(guess)) attr = guess; }
    if (!attr){
      notes.push("`" + name + "` não tem tradução para o Flutter" + (row && row[3] ? " (" + row[3].replace(/`/g, "") + ")" : "") + ".");
      return;
    }
    if (attr === "disabled" || fold(name) === "state"){
      if (fold(v) === "disabled" || v === true) attrs.disabled = "";
      else if (!/^(enabled|hovered|pressed|dragged|dragover)$/.test(fold(v))) notes.push("State `" + v + "` não vira parâmetro; só Disabled.");
      return;
    }
    if (typeof v === "boolean" || (fp && fp.type === "Boolean")){ attrs[attr] = String(v === true || fold(v) === "true"); return; }
    if (fp && (fp.type === "Text" || fp.type === "Instance swap")){ attrs[attr] = String(v); return; }
    let val = fold(v).trim().replace(/\s+/g, "-");
    const vals = kv[attr] ? Array.from(kv[attr]) : [];
    if (fp && fp.options && !fp.options.some((o) => fold(o) === fold(v))){ notes.push("`" + name + ": " + v + "` não é opção no Figma (" + fp.options.join(", ") + "); ignorei."); return; }
    else if (vals.length && vals.indexOf(val) < 0){ const hit = vals.find((x) => x.length > 2 && (val.indexOf(x) === 0 || x.indexOf(val) === 0)); if (hit) val = hit; }
    attrs[attr] = val;
  });
  return { attrs, notes };
}

// ---------- gerar ----------
async function generate(catalog, comp, args){
  const data = catalog.flutterData, it = data && data.items[comp.id];
  if (!it) return "`" + comp.name + "` não tem widget no castanha_flutter.";
  if (!it.map) return "`" + comp.name + "` ainda não tem mapa Figma → Flutter. Import:\n\n```dart\nimport 'package:castanha_flutter/castanha_flutter.dart';\n```\n\nUse `componente` para ver os parâmetros.";
  const C = await core(catalog), map = it.map;
  const t = figmaToAttrs(comp, map, args.props_figma), attrs = Object.assign(t.attrs, args.atributos || {});
  // filhos (abas, chips, itens de lista): `itens` = número ou lista de atributos por item; padrão 3
  const items = Array.isArray(args.itens) ? args.itens : Array.from({ length: typeof args.itens === "number" ? args.itens : 3 }, () => ({}));
  const tags = []; walk(map.widget, (w, a) => { if (a && a.each) String(a.each).split(",").map((s) => s.trim()).forEach((s) => { if (tags.indexOf(s) < 0) tags.push(s); }); });
  const wanted = fold(Object.values(args.props_figma || {}).join(" "));
  const words = (x) => fold(x).replace(/\bcds-/g, "").split(/[-\s]+/).filter((w) => w.length > 2);
  const common = tags.length > 1 ? words(tags[0]).filter((w) => tags.every((x) => words(x).indexOf(w) >= 0)) : [];
  const pick = tags.find((x) => words(x).some((w) => common.indexOf(w) < 0 && wanted.indexOf(w) >= 0)) || tags[0];
  const host = { getAttribute: (k) => (attrs[k] == null ? null : String(attrs[k])) };
  const kids = items.map((a) => ({ tag: pick, parentElement: host, getAttribute: (k) => (a[k] == null ? null : String(a[k])), matches: (sel) => String(sel).split(",").map((s) => s.trim()).indexOf(pick) >= 0 }));
  host.querySelectorAll = (sel) => kids.filter((k) => k.matches(sel));
  const get = C.scoped(() => host, map.defaults);
  const code = C.text(C.snippet(data, Object.assign({}, it), get)).trim();
  return "```dart\n" + code + "\n```" + (t.notes.length ? "\n\n" + t.notes.map((n) => "- " + n).join("\n") : "") +
    "\n\nGerado pelo mapa `integration/flutter-map/" + comp.id + ".json` (o mesmo do painel \"No Flutter\" do playground). Parâmetros omitidos = padrão do construtor. Callbacks (`onPressed`, `onChanged`…) vêm vazios: troque pela sua lógica.";
}

// ---------- revisar ----------
function lev(a, b){ const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++){ let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++){ const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; } } return d[b.length]; }
const near = (q, list) => list.map((x) => [x, lev(fold(q), fold(x))]).filter((p) => p[1] <= Math.max(2, Math.floor(q.length / 3))).sort((a, b) => a[1] - b[1]).slice(0, 3).map((p) => p[0]);
// nomes comuns em outras libs (e os que o CLAUDE.md do castanha-mobile proíbe) → vocabulário do castanha_flutter
const SYN = { variant: ["appearance", "kind"], color: ["appearance"], theme: ["appearance"], type: ["kind"], category: ["kind"], scale: ["size"], dimension: ["size"],
  direction: ["orientation"], axis: ["orientation"], isVertical: ["orientation"], iconLeft: ["leadIcon"], leftIcon: ["leadIcon"], startIcon: ["leadIcon"], iconBefore: ["leadIcon"], icon: ["leadIcon"],
  iconRight: ["trailingIcon", "showTrailingIcon"], rightIcon: ["trailingIcon", "showTrailingIcon"], endIcon: ["trailingIcon", "showTrailingIcon"], rightContent: ["trailingItem"], endSlot: ["trailingItem"],
  isOpen: ["open"], visible: ["open"], isActive: ["active", "selected"], pressed: ["active"], isSelected: ["selected"], current: ["selected"], hasError: ["error"], isError: ["error"],
  helperText: ["supportingMessage"], hint: ["supportingMessage", "placeholder"], caption: ["supportingMessage"], text: ["label"], title: ["label", "title"], isDisabled: ["disabled"], enabled: ["disabled"],
  onTap: ["onPressed"], onClick: ["onPressed"], onChange: ["onChanged"], child: ["label"] };
/** Lê `Classe(...)` e `Classe.ctor(...)` do pacote: { cls, ctor, line, args: [{ name, value, line }], positional } */
function parseDart(src){
  const out = [], lineOf = (i) => src.slice(0, i).split("\n").length;
  const re = /\b(Castanha[A-Z]\w*)(?:\.(\w+))?\s*\(/g; let m;
  while ((m = re.exec(src))){
    let j = re.lastIndex, d = 1, q = null;
    for (; j < src.length && d; j++){ const c = src[j]; if (q){ if (c === q && src[j - 1] !== "\\") q = null; continue; } if (c === "'" || c === '"') q = c; else if ("([{".includes(c)) d++; else if (")]}".includes(c)) d--; }
    const body = src.slice(re.lastIndex, j - 1), base = re.lastIndex;
    const args = []; let cur = "", depth = 0, start = 0, qq = null;
    for (let k = 0; k <= body.length; k++){
      const c = body[k];
      if (k < body.length && qq){ cur += c; if (c === qq && body[k - 1] !== "\\") qq = null; continue; }
      if (k < body.length && (c === "'" || c === '"')){ qq = c; cur += c; continue; }
      if (k === body.length || (c === "," && depth === 0)){
        const t = cur.trim();
        if (t){ const at = lineOf(base + start + cur.search(/\S/)), nm = /^(\w+)\s*:\s*([\s\S]*)$/.exec(t); args.push(nm ? { name: nm[1], value: nm[2].trim(), line: at } : { name: null, value: t, line: at }); }
        cur = ""; start = k + 1; continue;
      }
      if ("([{".includes(c)) depth++; else if (")]}".includes(c)) depth--;
      cur += c;
    }
    out.push({ cls: m[1], ctor: m[2] || null, line: lineOf(m.index), args });
  }
  return out;
}
function review(catalog, src){
  const data = catalog.flutterData || {}, out = [], say = (lv, line, msg) => out.push({ lv, line, msg });
  const classes = {};
  Object.keys(data.items || {}).forEach((id) => { const it = data.items[id]; classes[it.class] = { params: it.params, ctors: it.constructors || [], id }; });
  Object.keys(data.extra || {}).forEach((k) => { classes[k] = classes[k] || { params: data.extra[k].params, ctors: [] }; });
  Object.keys(data.only || {}).forEach((k) => { classes[k] = classes[k] || { params: data.only[k].params, ctors: data.only[k].constructors || [], only: true }; });
  const enums = data.enums || {}, dart = data.dart || {};
  const ASSETS = { CastanhaIcons: dart.icons || [], CastanhaIllustrations: dart.illustrations || [], CastanhaMotions: dart.motion || [] };
  // tipos citados nos parâmetros (sealed com construtores de fábrica: CastanhaBannerKind.illustration, CastanhaContentListLeadItem.icon…)
  const cited = new Set(); Object.values(classes).forEach((c) => c.params.forEach((p) => (String(p.t || "").match(/Castanha\w+/g) || []).forEach((n) => cited.add(n))));
  // import
  if (/Castanha[A-Z]/.test(src) && /^\s*import\s/m.test(src) && !/package:castanha_flutter\/castanha_flutter\.dart/.test(src))
    say("alta", 1, "Falta `import 'package:castanha_flutter/castanha_flutter.dart';` (ele também reexporta ícones, ilustrações e tokens).");
  if (/package:castds_/.test(src)) say("media", 1, "Import de pacote legado `castds_*`: novos códigos usam `castanha_flutter` (widgets `Castanha*`, nunca `Castds*`).");
  (src.match(/\bCastds\w+/g) || []).filter((v, i, a) => a.indexOf(v) === i).forEach((n) => say("media", 1, "`" + n + "` é do pacote legado (castds_as_is): procure o widget `Castanha*` equivalente."));
  // constantes de assets
  src.replace(/\b(CastanhaIcons|CastanhaIllustrations|CastanhaMotions)\.(\w+)/g, (m, k, n, i) => {
    if (ASSETS[k].length && ASSETS[k].indexOf(n) < 0){ const s = near(n, ASSETS[k]); say("alta", src.slice(0, i).split("\n").length, "`" + k + "." + n + "` não existe no pacote" + (s.length ? ": você quis dizer " + s.map((x) => "`" + x + "`").join(" ou ") + "?" : ". Use as ferramentas `icone` e `ilustracao` para achar o nome.")); }
    return m;
  });
  // enums usados com o tipo errado ou valor inexistente
  src.replace(/\b(Castanha\w+)\.(\w+)\b(?!\s*\()/g, (m, t, v, i) => {
    if (enums[t] && enums[t].indexOf(v) < 0 && v !== "values"){ const s = near(v, enums[t]); say("alta", src.slice(0, i).split("\n").length, "`" + t + "." + v + "` não existe. Valores: " + enums[t].map((x) => "`" + x + "`").join(", ") + (s.length ? " (quis dizer `" + s[0] + "`?)" : "") + "."); }
    return m;
  });
  parseDart(src).forEach((w) => {
    if (ASSETS[w.cls]) return;
    const c = classes[w.cls];
    if (!c){
      if (cited.has(w.cls) || enums[w.cls] || (data.classes || []).indexOf(w.cls) >= 0 || /^Castanha(Row|Column|Field|Text|Theme|Icons|Illustrations|Motions|Spacing|MotionDuration|MotionEasing)\b/.test(w.cls)) return; // tipos auxiliares, primitivos e tokens
      // primeiro os widgets que contêm a mesma palavra (CastanhaButton → CastanhaMainButton, CastanhaIconButton), depois os parecidos
      const word = w.cls.replace(/^Castanha/, ""), same = Object.keys(classes).filter((k) => k !== w.cls && k.indexOf(word) > 0 && !/Item$/.test(k) || (k.endsWith(word) && k !== w.cls));
      const s = (same.length ? same : near(w.cls, Object.keys(classes))).slice(0, 3);
      say("alta", w.line, "`" + w.cls + "` não existe no castanha_flutter" + (s.length ? ": você quis dizer " + s.map((x) => "`" + x + "`").join(" ou ") + "?" : ". Use `listar_componentes` ou `componente`."));
      return;
    }
    let params = c.params;
    if (w.ctor){
      const k = c.ctors.find((x) => x.n === w.ctor);
      if (!k){ say("alta", w.line, "`" + w.cls + "." + w.ctor + "` não existe" + (c.ctors.length ? ". Construtores nomeados: " + c.ctors.map((x) => "`" + x.n + "`").join(", ") : "") + "."); return; }
      params = k.params.filter((n) => n !== "key").map((n) => c.params.find((p) => p.n === n) || { n });
    }
    const byName = {}; params.forEach((p) => { byName[p.n] = p; });
    w.args.filter((a) => a.name).forEach((a) => {
      const p = byName[a.name];
      if (!p){
        const syn = (SYN[a.name] || []).filter((x) => byName[x]), s = syn.length ? syn : near(a.name, Object.keys(byName));
        say("alta", a.line, "`" + a.name + "` não é parâmetro de `" + w.cls + (w.ctor ? "." + w.ctor : "") + "`" + (s.length ? ": use " + s.map((x) => "`" + x + "`").join(" ou ") : "") + ".");
        return;
      }
      const t = String(p.t || "").replace(/\?$/, "");
      if (enums[t] && /^['"]/.test(a.value)){ const v = a.value.replace(/^['"]|['"]$/g, ""), s = near(v, enums[t]); say("alta", a.line, "`" + a.name + "` é enum: escreva `" + t + "." + (s[0] || enums[t][0]) + "` em vez de `" + a.value + "`."); return; }
      const em = /^(Castanha\w+)\.\w+$/.exec(a.value);
      if (enums[t] && em && em[1] !== t && enums[em[1]]) say("alta", a.line, "`" + a.name + "` espera `" + t + "`, não `" + em[1] + "`.");
      if (/^bool/.test(t) && /^['"]/.test(a.value)) say("alta", a.line, "`" + a.name + "` é bool: use `true` ou `false`, não texto.");
      if (/^IconData/.test(t) && /^['"]/.test(a.value)) say("alta", a.line, "`" + a.name + "` recebe `IconData`: use `CastanhaIcons.nome` (camelCase), não texto.");
      if (p.def && a.value === p.def) say("info", a.line, "`" + a.name + ": " + a.value + "` é o padrão do construtor: pode omitir.");
    });
    const given = new Set(w.args.map((a) => a.name).filter(Boolean)), positional = w.args.filter((a) => !a.name).length;
    params.filter((p) => p.req && !given.has(p.n)).forEach((p, i) => { if (i >= positional) say("alta", w.line, "`" + w.cls + (w.ctor ? "." + w.ctor : "") + "` sem o parâmetro obrigatório `" + p.n + "` (`" + p.t + "`)."); });
    if (c.only) say("info", w.line, "`" + w.cls + "` existe no castanha_flutter, mas ainda não tem componente no playground nem no Figma estável deste portal.");
  });
  // valores crus (invariantes do castanha-mobile: tokens do tema, nunca literais)
  const raw = (re, msg) => src.replace(re, (m, ...r) => { const i = r[r.length - 2]; say("media", src.slice(0, i).split("\n").length, msg.replace("{m}", m.trim())); return m; });
  raw(/\bColor\(0x[0-9A-Fa-f]{6,8}\)|\bColors\.\w+/g, "Cor crua `{m}`: use o token do tema (`context.castanhaTheme.colors…`).");
  raw(/\bEdgeInsets\.(?:all|symmetric|only|fromLTRB)\([^)]*\d[^)]*\)/g, "Espaçamento cru `{m}`: use os tokens de tamanho do tema (`theme.sizesX`).");
  raw(/\bBorderRadius\.circular\(\s*\d+(?:\.\d+)?\s*\)/g, "Raio cru `{m}`: use o token de borda do tema.");
  raw(/\bSizedBox\(\s*(?:height|width)\s*:\s*\d+(?:\.\d+)?\s*\)/g, "Espaço manual `{m}`: use `CastanhaRow`/`CastanhaColumn` com `spacing: theme.sizesX`.");
  return { findings: out.sort((a, b) => a.line - b.line) };
}
function reviewText(catalog, src){
  const r = review(catalog, src), L = { alta: "🔴", media: "🟡", info: "⚪" };
  if (!r.findings.length) return "Nada a apontar: os widgets, parâmetros, enums e assets existem no castanha_flutter (" + ((catalog.flutterData && catalog.flutterData.source) ? catalog.flutterData.source.ref + " " + catalog.flutterData.source.commit : "staging") + ").";
  return "# Revisão do Dart (castanha_flutter)\n\n" + r.findings.map((f) => "- " + L[f.lv] + " linha " + f.line + ": " + f.msg).join("\n") +
    "\n\n" + r.findings.filter((f) => f.lv === "alta").length + " que quebram (não compila ou sai errado) · " + r.findings.filter((f) => f.lv === "media").length + " fora do padrão do DS · " + r.findings.filter((f) => f.lv === "info").length + " informativos.";
}

module.exports = { generate, review, reviewText };
