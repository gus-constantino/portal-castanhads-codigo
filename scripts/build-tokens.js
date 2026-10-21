#!/usr/bin/env node
/**
 * Gera styles/tokens.css a partir de tokens/figma-snapshot.json.
 *   node scripts/build-tokens.js
 *
 * Nomenclatura: Common/Colors/Text/intense → --common-colors-text-intense (1:1 com o Figma).
 * Text styles:  Label/Medium Label        → --text-style-label-medium (shorthand `font`)
 * Elevations:   Common/Elevations/Level 1 → --common-elevation-level-1 (box-shadow pronto)
 * Z-Index:      Common/Z-Index/Medium/03 → --common-z-index-medium-03 (número sem unidade, CDS-1615). Ainda não existe no
 *                castanha-tokens (o Castoken exporta depois do publish do Brand Style) e fica sem alias --castanha-* até lá.
 *                O uso de cada camada (zIndexUsage, descrição no Figma) vai para tokens/motion-usage.js como CDS.zIndexUsage.
 * Viewport (coleção Viewport, floats): Common/Grids/gutter → --common-grids-gutter; Specific/Buttons/Main Button/Width/min-width
 *                → --specific-buttons-main-button-width-min-width. Faixas iguais ao viewport.css do castanha-tokens (min-width):
 *                Mobile no :root, Tablet ≥ 744, Desktop ≥ 1366; e por [data-viewport] (frame do playground). Booleans (Is Mobile…) ficam de fora.
 * Alias do pacote React (R3): --castanha-X = var(--common-X | --specific-X), o nome que o castanha-tokens gera (o grupo
 *                Common/Specific sai do nome). Motion (Common/Motion/*), elevations prontas, text styles e Motion Styles não
 *                existem no castanha-tokens e ficam sem alias.
 * Motion Styles: Hover In/01/Timing       → --motion-hover-in-01-timing (o índice fica: vão existir outros estilos)
 *                aponta para o primitivo do Figma (motionAlias), ex.: var(--common-motion-duration-short-03)
 *                Modo Reduced da coleção (motionAliasReduced) → @media (prefers-reduced-motion:reduce), só os que mudam
 *
 * Ferramenta de desenvolvimento: o site não depende de build, só do CSS gerado.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const snap = JSON.parse(fs.readFileSync(path.join(ROOT, "tokens/figma-snapshot.json"), "utf8"));

const slug = (s) => s.replace(/^Common\//, "common/").toLowerCase().replace(/[^a-z0-9/]+/g, "-").replace(/\//g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
const num = (n) => +(+n).toFixed(4);
const bezier = (b) => `cubic-bezier(${b.map(num).join(", ")})`;

function value(name, type, v){
  if (type === "C") return v;
  if (type === "S") return `"${v}"`;
  if (type === "E") return bezier(v);
  if (type === "T") return `${Math.round(v * 1000)}ms`;
  // floats
  if (/\/Opacity\//.test(name) || /^Common\/Opacity/.test(name)) return String(num(v / 100));
  if (/Font\/Weight/.test(name) || /\/Z-Index\//.test(name)) return String(v);
  if (/Font\/Line Height/.test(name)) return String(num(v / 100));
  if (/Motion\/Delay|\/Delay$/.test(name)) return `${v}ms`;
  return `${num(v)}px`;
}

const light = [], dark = [], aliases = [];
// nome do castanha-tokens: sem o grupo Common/Specific (scripts de build do castanha: tokenSegments + name/cti/castanha-css)
const castanha = (name) => "--castanha-" + slug(name.replace(/^(Common|Specific)\//, ""));
const hasAlias = (name) => /^(Common|Specific)\//.test(name) && !/^Common\/(Motion|Z-Index)\//.test(name);
function push(name, type, l, d){
  const prop = "--" + slug(name);
  light.push(`  ${prop}:${value(name, type, l)};`);
  if (hasAlias(name)) aliases.push(`  ${castanha(name)}:var(${prop});`);
  if (d !== undefined && d !== l) dark.push(`  ${prop}:${value(name, type, d)};`);
}

snap.brand.forEach((r) => push(r[0], r[1], r[2], r[3]));
const motionAlias = snap.motionAlias || {};
snap.motion.forEach((r) => {
  const a = motionAlias[r[0]];
  if (a) light.push(`  --${slug("Motion/" + r[0])}:var(--${slug(a)}); /* ${r[0]} → ${a} */`);
  else push("Motion/" + r[0], r[1], r[2], r[3]);
});
const motionReduced = Object.keys(snap.motionAliasReduced || {}).map((n) => `  --${slug("Motion/" + n)}:var(--${slug(snap.motionAliasReduced[n])});`);

// Elevations prontas para box-shadow
const elevations = snap.elevations.map(([, lvl]) => {
  const k = slug("Common/Elevations/" + lvl);
  return `  --common-elevation-${lvl.toLowerCase().replace(/\s+/g, "-")}:var(${"--" + k}-x) var(${"--" + k}-y) var(${"--" + k}-blur) var(${"--" + k}-spread) var(${"--" + k}-color);`;
});

// Text styles → shorthand `font` (+ decoration para Link)
const WEIGHT = { Regular: 400, Medium: 500, Bold: 700, Light: 300 };
const texts = snap.textStyles.map(([name, family, style, size, lh, deco]) => {
  const [group, raw] = name.split("/");
  const variant = raw.replace(new RegExp(`\\s*${group}\\s*`, "i"), " ").trim() || raw;
  const prop = `--text-style-${slug(group)}-${slug(variant)}`;
  const fallback = family === "Work Sans" ? `"Work Sans", Roboto, Arial, sans-serif` : `Roboto, Arial, sans-serif`;
  let line = `  ${prop}:${WEIGHT[style] || 400} ${size}px/${num(lh / 100)} ${fallback};`;
  if (deco === "UNDERLINE") line += `\n  ${prop}-decoration:underline;`;
  return line;
});

// Coleção Viewport: valor por modo (número em px ou alias para outra variável), com o alias --castanha-* na mesma regra
// (o var() resolve no elemento da regra: assim o frame do playground com [data-viewport] também troca o alias)
const vp = snap.viewport || [];
const vpVal = (v) => typeof v === "number" ? `${num(v)}px` : `var(--${slug(v)})`;
const vpLine = (mode) => vp.map(([n, m]) => `--${slug(n)}:${vpVal(m[mode])}; ${castanha(n)}:var(--${slug(n)});`).join(" ");
const BP = { Tablet: 744, Desktop: 1366 }; // castanha-tokens/src/config/breakpoints.ts (small, large)
const gridCss = vp.length ? `
/* Coleção Viewport · faixas do castanha-tokens: Mobile no :root, Tablet ≥ ${BP.Tablet}, Desktop ≥ ${BP.Desktop}; o frame do playground usa [data-viewport] */
:root{ ${vpLine("Mobile")} }
@media (min-width:${BP.Tablet}px){ :root{ ${vpLine("Tablet")} } }
@media (min-width:${BP.Desktop}px){ :root{ ${vpLine("Desktop")} } }
[data-viewport="desktop"]{ ${vpLine("Desktop")} }
[data-viewport="tablet"]{ ${vpLine("Tablet")} }
[data-viewport="mobile"]{ ${vpLine("Mobile")} }
` : "";

const out = `/* =====================================================================
   Tokens — Castanha DS · GERADO por scripts/build-tokens.js · não editar à mão
   Fonte: tokens/figma-snapshot.json (${snap._source})
   ===================================================================== */
:root{
${light.join("\n")}

  /* Elevations (effect styles Elevation/level 1–3) */
${elevations.join("\n")}

  /* Text styles */
${texts.join("\n")}

  /* Aliases usados pelos componentes (Motion Styles por interação) */
  --motion-hover-duration:var(--motion-hover-in-01-timing);     --motion-hover-easing:var(--motion-hover-in-01-easing);
  --motion-press-duration:var(--motion-pressed-01-timing);      --motion-press-easing:var(--motion-pressed-01-easing);
  --motion-active-duration:var(--motion-selected-in-01-timing); --motion-active-easing:var(--motion-selected-in-01-easing);
}
/* Alias do castanha-tokens (pacote React): --castanha-X → --common-X. Seguem o tema escuro porque apontam para --common-* */
:root{
${aliases.join("\n")}
}
html[data-theme="dark"]{
${dark.join("\n")}
}
/* .Motion Styles · modo Reduced: o sistema pede menos movimento (só os estilos que mudam em relação ao Normal) */
@media (prefers-reduced-motion:reduce){ :root{
${motionReduced.join("\n")}
} }
${gridCss}`;
fs.writeFileSync(path.join(ROOT, "styles/tokens.css"), out);
// Uso de cada Motion Style (descrição da variável no Figma) → Motion Styles em ação (scripts/tokens-kit.js)
fs.writeFileSync(path.join(ROOT, "tokens/motion-usage.js"), "/* GERADO por scripts/build-tokens.js a partir de tokens/figma-snapshot.json (motionUsage e zIndexUsage) */\n(window.CDS = window.CDS || {}).motionUsage = " + JSON.stringify(snap.motionUsage || {}, null, 1) + ";\nCDS.zIndexUsage = " + JSON.stringify(snap.zIndexUsage || {}, null, 1) + ";\n");
console.log(`styles/tokens.css: ${light.length} tokens (${dark.length} com valor dark), ${texts.length} text styles, ${elevations.length} elevations, ${vp.length} tokens de viewport, ${aliases.length + vp.length} aliases --castanha-*, ${snap.motion.length} variáveis de Motion Styles (${motionReduced.length} com modo Reduced)`);
