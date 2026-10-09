#!/usr/bin/env node
/**
 * F1 · Rascunho dos mapas Figma → Flutter (integration/flutter-map/<id>.json) a partir dos mapas do React
 * (integration/prop-map/<id>.json) e dos parâmetros do widget (integration/flutter/manifest.json).
 *
 *   node scripts/integration/draft-flutter-maps.js [--force] [id …]
 *
 * Não sobrescreve mapa existente (curado à mão), a menos que venha --force. Regras do rascunho:
 *   - parâmetro com o mesmo nome da prop do React: copia attr, map, bool, if e num
 *   - showX / hideX (bool): liga ao atributo show-x do playground (hideX = negação)
 *   - label (String) obrigatório: o texto que no React vai como filho ({ attr })
 *   - callback obrigatório: função vazia (VoidCallback → () {}, os outros → (_) {})
 *   - IconData: icon: true (vira CastanhaIcons.nome)
 * O que não casa fica em "todo" para a curadoria. O painel mostra "Mapa em rascunho" até curated: true.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const args = process.argv.slice(2), force = args.includes("--force"), only = args.filter((a) => !a.startsWith("--"));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "flutter", "manifest.json"), "utf8"));
const OUT = path.join(ROOT, "integration", "flutter-map");
fs.mkdirSync(OUT, { recursive: true });

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const camel = (s) => String(s).replace(/[-_ ]+([a-z0-9])/gi, (m, c) => c.toUpperCase());
let made = 0, skipped = 0;
manifest.components.forEach((c) => {
  if (only.length && !only.includes(c.id)) return;
  const file = path.join(OUT, c.id + ".json");
  if (fs.existsSync(file) && !force){ skipped++; return; }
  const rf = path.join(ROOT, "integration", "prop-map", c.id + ".json");
  const react = fs.existsSync(rf) ? JSON.parse(fs.readFileSync(rf, "utf8")) : null;
  const root = react && react.jsx && react.jsx.tag ? react.jsx : null;
  const rprops = root ? (root.props || []) : [];
  const attrsKnown = new Set(Object.keys((react && react.defaults) || {}).concat(((react && react.figma) || []).map((r) => r[1])));
  const textChild = root && (root.children || []).find((k) => k.attr);
  const out = [], todo = [], used = {};
  c.params.filter((p) => !p.a11y).forEach((p) => {
    const t = String(p.t || "");
    const rp = rprops.find((x) => x.prop === p.n && (x.attr || x.value != null) && !x.expr);
    if (rp){
      const a = { param: p.n };
      ["attr", "map", "bool", "if", "num", "offset", "tpl", "eq", "value"].forEach((k) => { if (rp[k] != null) a[k] = rp[k]; });
      if (/^IconData/.test(t)){ a.icon = true; }
      if (p.enum && a.map) Object.keys(a.map).forEach((k) => { if (!p.enum.includes(camel(a.map[k])) && !p.enum.includes(camel(a.map[k]) + "_")) todo.push(p.n + ": valor " + a.map[k] + " não existe no enum"); });
      out.push(a); used[p.n] = a.attr; return;
    }
    const sh = p.n.match(/^(show|hide)([A-Z]\w*)$/);
    if (sh && /^bool/.test(t)){
      const at = "show-" + kebab(sh[2]);
      if (attrsKnown.has(at)){ out.push(Object.assign({ param: p.n, attr: at, bool: sh[1] === "hide" ? "not" : true })); used[p.n] = at; return; }
    }
    if (p.n === "label" && /^String/.test(t) && textChild){ out.push({ param: "label", attr: textChild.attr }); used.label = textChild.attr; return; }
    if (p.req && /Callback|OnChanged|OnClose|Changed|Function|void/.test(t)){ out.push({ param: p.n, code: /VoidCallback/.test(t) ? "() {}" : "(_) {}" }); return; }
    if (/^IconData/.test(t) && attrsKnown.has(kebab(p.n))){ out.push({ param: p.n, attr: kebab(p.n), icon: true }); used[p.n] = kebab(p.n); return; }
    if (attrsKnown.has(kebab(p.n))){ out.push(/^bool/.test(t) ? { param: p.n, attr: kebab(p.n), bool: true } : { param: p.n, attr: kebab(p.n) }); used[p.n] = kebab(p.n); return; }
    if (p.req) todo.push(p.n + " (" + t + ", obrigatório) sem origem no playground");
  });
  const figma = ((react && react.figma) || []).map((r) => {
    const param = Object.keys(used).filter((k) => used[k] === r[1]);
    return [r[0], r[1], param.length ? param.join(" ") : "—", param.length ? "" : "Sem parâmetro equivalente no Flutter (rascunho)."];
  });
  const map = { element: react ? react.element : null, defaults: react ? react.defaults : {}, curated: false, widget: { class: c.class, args: out }, figma };
  if (!react) todo.push("sem mapa do React: element e defaults a preencher");
  if (todo.length) map.todo = todo;
  fs.writeFileSync(file, JSON.stringify(map, null, 2) + "\n");
  made++;
});
console.log("Rascunhos: " + made + " novos · " + skipped + " já existiam (use --force para refazer)");
