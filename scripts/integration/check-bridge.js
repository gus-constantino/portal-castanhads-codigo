/**
 * 4º vértice do check da stack: Figma × playground × castanha-react × castanha-ai (D182).
 * O castanha-ai (repo interno da Caju, plugin do Claude Code para quem consome o DS) traz em
 * base/react/code-sync.json → bridge.componentSets a tradução de cada variante do Figma para prop do React
 * ("Inversed" → "appearance: inverted", "Hovered" → "FIGMA-ONLY"). Aqui ela é comparada com os mapas curados
 * (integration/prop-map/). Só leitura: `git show` no clone (../castanha-ai); nada do conteúdo entra no repo,
 * só os achados (nome do set, prop e valor), como os do castanha-react.
 *
 * Achados (id = componente do playground ou "castanha-ai"):
 *   media  bridge-componente   o set aponta para outro componente React
 *   media  bridge-valor        o mesmo valor do Figma vira valores diferentes lá e aqui
 *   info   bridge-prop         o castanha-ai traduz uma prop que o nosso mapa não gera
 *   info   bridge-nome-figma   o bridge usa um nome de prop/valor que não existe mais na lib (figma-props.tsv)
 *   info   bridge-cobertura    sets só de um lado
 */
"use strict";
const { execFileSync } = require("child_process");
// valor do atributo do playground a partir do valor do Figma: sem acento, minúsculo, espaço → hífen ("Físico Corporativo" → "fisico-corporativo", "1:1" fica)
const kebab = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/\s+/g, "-");
const SKIP = /^(padrão|padrao|sem prop|figma-only|—|-)$/i;

function read(clone, ref){
  try {
    const raw = execFileSync("git", ["-C", clone, "show", ref + ":base/react/code-sync.json"], { encoding: "utf8", stdio: "pipe", maxBuffer: 32 * 1024 * 1024 });
    const commit = execFileSync("git", ["-C", clone, "rev-parse", "--short", ref], { encoding: "utf8", stdio: "pipe" }).trim();
    return { bridge: (JSON.parse(raw).bridge || {}).componentSets || {}, commit };
  } catch (e){ return null; }
}

/** "appearance: inverted" → { prop, value } · "leadIcon: [IconName]" → { prop, value: null } · "padrão" → null */
function parseTarget(t){
  t = String(t).trim();
  if (SKIP.test(t)) return null;
  const m = t.match(/^([A-Za-z][\w.-]*)\s*:\s*(.*)$/);
  if (!m) return null;
  if (/^[A-Z-]+$/.test(m[1])) return null; // "GAP: …" é a marcação de lacuna do próprio bridge, não prop
  const v = m[2].split(/\s+—\s+|\s+\(/)[0].trim().replace(/^['"`]|['"`]$/g, ""); // tira anotações ("— definir no pai", "(exige …)")
  return { prop: m[1], value: /^\[|^\{|^</.test(v) || !v ? null : v };
}

function propsOf(map){ // todas as props do JSX do mapa (com o nó), seguindo filhos e each
  const out = [];
  (function walk(n){ if (!n) return; (n.props || []).forEach((p) => out.push(p)); (n.children || []).forEach(walk); if (n.each) walk(n.node); })(map && map.jsx);
  return out;
}

function run(ctx){
  // ctx: { clone, ref, components, maps, figma (readFigma), react }
  const src = read(ctx.clone, ctx.ref);
  if (!src) return { skipped: true, findings: [], sets: 0 };
  const findings = [], add = (id, level, kind, msg) => findings.push({ id, level, kind, msg });
  const byName = {}; ctx.components.forEach((c) => { byName[c.name.toLowerCase()] = c; });
  const seen = new Set();
  Object.keys(src.bridge).forEach((setName) => {
    const b = src.bridge[setName], names = [setName].concat(b.aliases || []);
    const c = names.map((n) => byName[String(n).toLowerCase()]).find(Boolean);
    if (!c){ add("castanha-ai", "info", "bridge-cobertura", "Set `" + setName + "` está no bridge do castanha-ai e não tem componente no playground."); return; }
    seen.add(c.id);
    const ours = c.react && c.react.component;
    if (b.component && ours && b.component.split(".")[0] !== ours.split(".")[0]) add(c.id, "media", "bridge-componente", "O castanha-ai liga o set a `" + b.component + "`; o playground (Code Connect), a `" + ours + "`.");
    const map = ctx.maps[c.id], props = propsOf(map), fig = (c.figma && ctx.figma[c.figma.node]) || null;
    const figProps = fig ? fig.props : null;
    const check = (axis, values, isBool) => {
      if (figProps && !figProps[axis]) add(c.id, "info", "bridge-nome-figma", "O bridge do castanha-ai usa `" + axis + "`, que não existe na lib (props: " + Object.keys(figProps).join(", ") + ").");
      Object.keys(values).forEach((val) => {
        const t = parseTarget(values[val]);
        if (!t || !map) return;
        const mine = props.filter((p) => p.prop === t.prop), pre = (map.pre || []).join(" ");
        if (!mine.length && new RegExp("\\b" + t.prop + "\\b").test(pre)) return; // gerada no código antes do JSX (ex.: hook useToast)
        if (!mine.length){ add(c.id, "info", "bridge-prop", "O castanha-ai traduz `" + axis + "=" + val + "` para `" + t.prop + "`; o mapa do playground não gera essa prop."); return; }
        if (isBool || t.value == null || /^(true|false)$/.test(t.value) || mine.every((p) => p.expr)) return; // expr: valor calculado no código
        const fv = kebab(val), ourVals = mine.map((p) => (p.map && p.map[fv] != null ? p.map[fv] : p.value != null ? p.value : fv));
        const anyMapped = mine.some((p) => p.map && Object.keys(p.map).some((k) => p.map[k] === t.value)); // o atributo do playground tem outro nome, mas chega no mesmo valor
        if (ourVals.indexOf(t.value) < 0 && !anyMapped && ourVals.every((v) => v !== "")) add(c.id, "media", "bridge-valor", "`" + axis + "=" + val + "`: o castanha-ai gera `" + t.prop + ": " + t.value + "`; o playground, `" + ourVals[0] + "`.");
      });
    };
    Object.keys(b.variantMapping || {}).forEach((axis) => check(axis, b.variantMapping[axis], false));
    Object.keys(b.booleanMapping || {}).forEach((axis) => check(axis, b.booleanMapping[axis], true));
  });
  const only = Object.keys(ctx.maps).filter((id) => !seen.has(id));
  if (only.length) add("castanha-ai", "info", "bridge-cobertura", "Com mapa no playground e sem set no bridge do castanha-ai: " + only.map((x) => "`" + x + "`").join(", ") + ".");
  return { skipped: false, commit: src.commit, sets: Object.keys(src.bridge).length, findings };
}

/** Categoria do Gap Report do castanha-ai (base/shared/rules/gap-report.md) para cada tipo de achado; null = não é lacuna de design (erro de ligação ou do mapa). */
const GAP = {
  "padrao-diferente": "APPROXIMATION", "nao-chega-ao-react": "MISSING-VARIANT", "so-na-staging": "UNRELEASED",
  "token-so-no-playground": "MISSING-TOKEN", "token-sem-alias": "MISSING-TOKEN", "token-valor": "APPROXIMATION",
  "icone-so-no-pacote": "MISSING-COMPONENT", "ilustracao-so-no-pacote": "MISSING-COMPONENT", "ilustracao-fora-do-pacote": "MISSING-COMPONENT",
  "motion-so-no-pacote": "MISSING-COMPONENT", "ilustracao-renomeada": "APPROXIMATION", "ilustracao-svg-difere": "APPROXIMATION",
  "icone-deprecated-no-pacote": "LEGACY", "icone-deprecated-fora": "LEGACY"
};
const gapOf = (kind) => GAP[kind] || null;

module.exports = { run, gapOf, GAP };
