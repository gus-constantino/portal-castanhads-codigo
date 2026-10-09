/**
 * F2 · Check em três vértices: Figma × castanha_flutter × playground (e os assets do Dart).
 * Chamado por scripts/integration/build-flutter-manifest.js; não roda sozinho.
 *
 * Vértices:
 *   Figma       integration/figma-props.tsv (componentPropertyDefinitions lidas via MCP, só leitura; formato no topo de check-stack.js)
 *   Flutter     parâmetros e enums do construtor (manifest do castanha-mobile)
 *   Playground  mapas integration/flutter-map/<id>.json (que parâmetro recebe cada prop do Figma e como os valores viram enum)
 *
 * Níveis: alta  = quebra a tradução (mapa escreve parâmetro que não existe, valor do Figma sem enum no Flutter, ícone ou ilustração
 *                 que não existe no pacote do Dart)
 *         media = muda o resultado sem quebrar (padrão diferente entre Figma e Flutter: declare o valor)
 *         info  = prop do Figma sem parâmetro no Flutter, ou parâmetro do Flutter que o Figma não tem
 *
 * Assets: nomes do [Caju] Icons e do [Caju] Illustrations do playground × as constantes do Dart (castanha_icons, castanha_illustrations,
 * castanha_motion) na versão que o castanha_flutter fixa no pubspec (tags do monorepo castanha, só leitura).
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const camel = (s) => String(s).replace(/[-_ /]+([a-z0-9])/gi, (m, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase());
const RESERVED = new Set(["default", "switch", "class", "new", "in", "is", "do", "if", "else", "for", "null", "true", "false", "this", "super", "enum", "return"]);
const dartEnum = (v) => { const n = camel(v); return RESERVED.has(n) ? n + "_" : n; };
const kebab = (s) => String(s).trim().toLowerCase().replace(/\s+/g, "-");

function readTsv(root){
  const f = path.join(root, "integration", "figma-props.tsv");
  const out = { byNode: {}, byName: {} };
  if (!fs.existsSync(f)) return out;
  fs.readFileSync(f, "utf8").split("\n").filter((l) => l && !l.startsWith("#")).forEach((l) => {
    const [node, name, props] = l.split("\t");
    const ps = {};
    String(props || "").split(";").filter(Boolean).forEach((p) => {
      const [k, v] = [p.slice(0, p.indexOf("=")), p.slice(p.indexOf("=") + 1)];
      const parts = v.split(":");
      ps[k] = { kind: parts[0], def: parts[1] || null, opts: parts.length > 2 ? parts.slice(2).join(":").split("|") : [] }; // opções podem ter ":" (1:1, 3:2)
    });
    out.byNode[node.replace(":", "-")] = { name, props: ps };
    out.byName[String(name).toLowerCase()] = { name, props: ps };
  });
  return out;
}

/** Argumentos do mapa (com os das alternativas e dos aninhados), por parâmetro: [{ cls, arg }]. */
function argsOf(widget, acc){
  acc = acc || [];
  if (!widget) return acc;
  if (Array.isArray(widget)){ widget.forEach((w) => argsOf(w, acc)); return acc; }
  (widget.args || []).forEach((a) => { acc.push({ cls: widget.class, ctor: widget.ctor || null, arg: a }); if (a.widget) argsOf(a.widget, acc); if (a.widgets) Object.values(a.widgets).forEach((w) => argsOf(w, acc)); });
  return acc;
}

function check({ root, manifest, data, maps, regs, castanhaDir, pubspec }){
  const tsv = readTsv(root);
  const items = [];
  const add = (id, l, t, m) => items.push({ id, l, t, m });
  const NOISE = /^(on[A-Z]|semantics|exclude|key$|controller|focusNode|inputFormatters|keyboardType|textInputAction|autofillHints|autocorrect|autofocus|textCapitalization|readOnly|errorBuilder|loadingBuilder|formatValue|closeSemanticsLabel|handleSemanticsLabel|dragoverLabel|maxHeightFactor|enableDrag|shiftPadding|offset|matchAnchorWidth|currencySymbol|fit|borderRadius|maxWidth|maxHeight|width|height|child|children|items|message|anchor|open)/;

  manifest.components.forEach((c) => {
    const map = maps[c.id];
    const params = {}; c.params.forEach((p) => { params[p.n] = p; });
    const extra = {}; Object.values(data.extra || {}).forEach((e) => { extra[e.class] = {}; e.params.forEach((p) => { extra[e.class][p.n] = p; }); });
    const paramIn = (cls, n) => (cls === c.class ? params[n] : (extra[cls] || {})[n] || (data.byClass && data.byClass[cls] ? null : undefined));
    if (!map){ add(c.id, "info", "sem-mapa", "Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros."); return; }
    const all = argsOf(map.widget);
    // alta: o mapa escreve um parâmetro que não existe no construtor (só para a classe do próprio componente)
    const ctorParams = (n) => ((c.constructors || []).find((k) => k.n === n) || { params: [] }).params;
    all.filter((x) => x.cls === c.class && x.arg.param && !x.arg.positional && !(x.ctor ? ctorParams(x.ctor).includes(x.arg.param) : params[x.arg.param])).forEach((x) => add(c.id, "alta", "parametro-inexistente", "O mapa escreve `" + x.arg.param + "`, que não existe em `" + c.class + "`."));
    // Figma × Flutter
    const reg = regs.find((r) => r.id === c.id) || {};
    const node = (String(reg.figma || "").match(/node-id=(\d+)[-:](\d+)/) || []).slice(1).join("-");
    const fig = tsv.byNode[node] || tsv.byName[String(c.name).toLowerCase()];
    if (fig){
      Object.keys(fig.props).forEach((prop) => {
        const fp = fig.props[prop];
        if (/^State$/.test(prop) || fp.kind === "S") return; // State vira disabled (bool) · Slot vira child/children
        const row = (map.figma || []).find((r) => String(r[0]).split(/\s+[·/]\s+|\s*›\s*/).some((x) => x.trim() === prop) || String(r[0]) === prop);
        if (!row){ add(c.id, "info", "figma-fora-do-mapa", "Prop do Figma `" + prop + "` não aparece na tabela Figma → Flutter."); return; }
        const target = String(row[2]);
        if (target === "—"){ add(c.id, "info", "figma-sem-parametro", "`" + prop + "` (Figma) não tem parâmetro no Flutter. " + (row[3] || "")); return; }
        if (fp.kind !== "V") return;
        const pname = target.split(/\s+/)[0];
        const p = params[pname];
        if (!p || !p.enum) return;
        const arg = all.find((x) => x.cls === c.class && x.arg.param === pname && x.arg.attr);
        const conv = (o) => { let v = kebab(o); if (arg && arg.arg.map && arg.arg.map[v] != null) v = arg.arg.map[v]; return dartEnum(v); };
        const miss = fp.opts.filter((o) => !p.enum.includes(conv(o)));
        if (miss.length) add(c.id, "alta", "valor-sem-enum", "`" + prop + "`: " + miss.map((o) => "`" + o + "`").join(", ") + " sem valor em `" + p.t + "` (" + p.enum.join(", ") + ").");
        if (fp.def && p.def){
          const want = p.t.replace(/\?$/, "") + "." + conv(fp.def);
          if (want !== p.def) add(c.id, "media", "padrao-diferente", "`" + prop + "`: o padrão do Figma é " + fp.def + "; o do Flutter, `" + p.def.split(".").pop() + "`. Declare `" + pname + "`.");
        }
      });
    } else add(c.id, "info", "sem-props-do-figma", "Sem leitura das props do Figma (`figma-props.tsv`) para este componente.");
    // info: parâmetros do Flutter que o mapa não usa (capacidades só do código)
    const used = new Set(all.filter((x) => x.cls === c.class).map((x) => x.arg.param));
    const only = c.params.filter((p) => !p.a11y && !used.has(p.n) && !NOISE.test(p.n));
    if (only.length) add(c.id, "info", "so-no-flutter", "Parâmetros do Flutter sem prop no Figma: " + only.map((p) => "`" + p.n + "`").join(", ") + ".");
  });

  // ---------- assets ----------
  const assets = { rows: [], items: [] };
  const pin = (pkg) => (String(pubspec).match(new RegExp("ref:\\s*'(@caju-beneficios/" + pkg + "@[\\d.]+)'")) || [])[1];
  const showTag = (tag, f) => { try { return execFileSync("git", ["-C", castanhaDir, "show", tag + ":" + f], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }); } catch (e) { return null; } };
  let pg = { icons: [], illustrations: [] };
  try { const src = fs.readFileSync(path.join(root, "scripts", "assets-manifest.js"), "utf8"); const w = {}; new Function("window", "CDS", src)(w, w.CDS = {}); pg = w.CDS.assets; } catch (e) {}
  let react = {}; try { const w = {}; new Function("window", "CDS", fs.readFileSync(path.join(root, "integration", "assets-react.js"), "utf8"))(w, w.CDS = {}); react = w.CDS.reactAssets || {}; } catch (e) {}
  const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const ill = {}; // nome do playground → constante do Dart
  const dart = {}; // constantes de cada pacote (para o revisar_dart do MCP)
  [["castanha-icons", "castanha_icons", /static const IconData (\w+)/g, "icons"], ["castanha-illustrations", "castanha_illustrations", /static const String (\w+)\s*=/g, "illustrations"], ["castanha-motion", "castanha_motion", /static const String (\w+)\s*=/g, "motion"]].forEach(([pkg, dartPkg, re, kind]) => {
    const tag = pin(pkg); if (!tag) return;
    const src = showTag(tag, "packages/" + pkg + "/dist/dart/lib/" + dartPkg + ".dart") || "";
    const names = new Set(Array.from(src.matchAll(re)).map((m) => m[1]));
    dart[kind] = [...names].sort();
    const row = { pkg: dartPkg, version: tag.split("@").pop(), inPkg: names.size, inPg: 0, same: 0, renamed: 0, onlyPg: [], onlyPkg: [] };
    if (kind === "icons"){
      const list = (pg.icons || []).map((i) => i.name);
      row.inPg = list.length;
      list.forEach((n) => { if (names.has(camel(n))) row.same++; else row.onlyPg.push(n); });
      const pgSet = new Set(list.map(camel)); row.onlyPkg = [...names].filter((n) => !pgSet.has(n));
    } else if (kind === "illustrations"){
      const list = (pg.illustrations || []).map((i) => i.name);
      const rmap = (react.ills && react.ills.map) || {}; // nome do playground → [nome no pacote, Export, …] (scripts/integration/check-assets.js)
      row.inPg = list.length;
      list.forEach((n) => {
        const direct = camel(n.replace("/", "-"));
        if (names.has(direct)){ row.same++; ill[n] = direct; return; }
        const viaReact = rmap[n] ? lower(rmap[n][1] || camel(rmap[n][0])) : null;
        if (viaReact && names.has(viaReact)){ row.renamed++; ill[n] = viaReact; return; }
        row.onlyPg.push(n);
      });
      const used = new Set(Object.values(ill)); row.onlyPkg = [...names].filter((n) => !used.has(n));
    } else { row.inPg = 0; row.onlyPkg = [...names]; }
    assets.rows.push(row);
    if (kind === "icons" && row.onlyPg.length) assets.items.push({ l: "alta", t: "icone-fora-do-dart", m: row.onlyPg.length + " ícones do [Caju] Icons sem constante em `CastanhaIcons` (" + row.version + "): " + row.onlyPg.map((n) => "`" + n + "`").join(", ") + "." });
    if (kind === "icons" && row.onlyPkg.length) assets.items.push({ l: "media", t: "icone-so-no-dart", m: "Constantes de `CastanhaIcons` sem ícone no [Caju] Icons: " + row.onlyPkg.map((n) => "`" + n + "`").join(", ") + "." });
    if (kind === "illustrations" && row.onlyPg.length) assets.items.push({ l: "alta", t: "ilustracao-fora-do-dart", m: "Ilustrações do [Caju] Illustrations sem constante em `CastanhaIllustrations` (" + row.version + "): " + row.onlyPg.map((n) => "`" + n + "`").join(", ") + "." });
    if (kind === "illustrations" && row.renamed) assets.items.push({ l: "media", t: "ilustracao-renomeada", m: row.renamed + " ilustrações têm outro nome no pacote (o painel já usa o nome do Dart), ex.: " + Object.keys(ill).filter((k) => ill[k] !== camel(k.replace("/", "-"))).slice(0, 4).map((k) => "`" + k + "` → `" + ill[k] + "`").join(", ") + "." });
    if (kind === "motion" && row.onlyPkg.length) assets.items.push({ l: "info", t: "motion-so-no-dart", m: row.onlyPkg.length + " animações em `CastanhaMotions` (" + row.version + "), ainda sem tab no playground." });
  });
  return { items, assets, ill, dart };
}

module.exports = { check };
