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

module.exports = { generate };
