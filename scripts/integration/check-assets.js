/**
 * R4 · Assets do playground × pacotes do castanha (castanha-icons, castanha-illustrations, castanha-motion).
 * Chamado por scripts/integration/build-manifest.js; não roda sozinho.
 *
 * Os pacotes geram um export PascalCase por arquivo kebab-case (`menu-line.svg` → `MenuLine`); no React:
 *   <Icon name="menu-line" />            (lazy, precisa do CastanhaProvider)   ·  import { MenuLine } → <Icon name={MenuLine} /> (eager)
 *   <Illustration name="hub-pet" />      ·  import { HubPet } from '@caju-beneficios/castanha-illustrations'
 *   <Motion name="feedback-success" />   (Lottie, castanha-motion)
 *
 * Casamento:
 *   ícones       pelo nome (o desenho não é comparável: o pacote normaliza contorno e recorte dos SVGs)
 *   ilustrações  1) mesmo nome (`categoria/nome` → `categoria-nome`); 2) mesmo desenho (paths do SVG) com outro nome
 *                (o pacote renomeou categorias: hub-de-beneficios/pet → hub-pet); 3) mesmo nome final, sem outro par
 *                (objetos/gema-ouro → premiacoes-gema-ouro). Mesmo nome com paths diferentes = "SVG difere" (conferir).
 */
"use strict";
const fs = require("fs"), path = require("path");

/** Exports de um src/index.ts gerado: [{ pascal, kebab }]. */
function exportsOf(src){
  return Array.from(String(src).matchAll(/export \{ (?:default as )?(\w+) \} from '[^']*\/assets\/([\w-]+)(?:\.json)?'/g)).map((m) => ({ pascal: m[1], kebab: m[2] }));
}
/** Assinatura do desenho (para achar o mesmo desenho com outro nome): `d` dos paths com números arredondados a inteiro. */
function shape(svg){
  return Array.from(String(svg).matchAll(/\sd="([^"]+)"/g)).map((m) => m[1].replace(/-?\d*\.?\d+(?:e-?\d+)?/g, (n) => String(Math.round(parseFloat(n)))).replace(/\s+/g, " ").trim()).sort().join("|");
}
/** Mesmo desenho com tolerância de 0,2 px por coordenada, na ordem do arquivo (exportações diferentes variam nas casas decimais). */
function sameDrawing(a, b){
  const nums = (s) => Array.from(String(s).matchAll(/\sd="([^"]+)"/g)).map((m) => m[1]).join(" ").match(/-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const x = nums(a), y = nums(b);
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) if (Math.abs(parseFloat(x[i]) - parseFloat(y[i])) > 0.2) return false;
  return true;
}

/**
 * ctx: { root, assets (CDS.assets do playground), icons/ills/motion: exports do pacote, pkgSvg(kebab) → texto do SVG da ilustração }
 * Retorna { data (para a página), findings, summary }.
 */
function run(ctx){
  const A = ctx.assets, findings = [], add = (level, kind, msg) => findings.push({ id: "assets", level, kind, msg });
  // ---- ícones ----
  const pkgI = {}; ctx.icons.forEach((x) => { pkgI[x.kebab] = x.pascal; });
  const dep = new Set(), glyph = new Set();
  (A.iconBuckets || []).forEach((b) => (b.icons || []).forEach((n) => { if (b.deprecated) dep.add(n); if (b.glyphs) glyph.add(n); }));
  const iconMap = {}, iconOnlyHere = [], depInPkg = [];
  (A.icons || []).map((i) => i.name).concat(Array.from(dep)).forEach((n) => {
    if (iconMap[n] !== undefined || glyph.has(n)) return;
    if (pkgI[n]){ iconMap[n] = pkgI[n]; if (dep.has(n)) depInPkg.push(n); }
    else { iconMap[n] = null; iconOnlyHere.push(n); }
  });
  const iconOnlyPkg = Object.keys(pkgI).filter((k) => iconMap[k] === undefined);
  const depOut = iconOnlyHere.filter((n) => dep.has(n)), activeOut = iconOnlyHere.filter((n) => !dep.has(n));
  if (activeOut.length) add("alta", "icone-fora-do-pacote", "Ícones do [Caju] Icons que o castanha-icons não exporta: " + activeOut.map((n) => "`" + n + "`").join(", ") + ".");
  if (iconOnlyPkg.length) add("media", "icone-so-no-pacote", "O castanha-icons exporta ícones que não existem no [Caju] Icons: " + iconOnlyPkg.map((n) => "`" + n + "`").join(", ") + ".");
  if (depInPkg.length) add("info", "icone-deprecated-no-pacote", "Deprecated no Figma, mas ainda exportados pelo pacote: " + depInPkg.map((n) => "`" + n + "`").join(", ") + ".");
  if (depOut.length) add("info", "icone-deprecated-fora", "Deprecated no Figma e já fora do pacote: " + depOut.map((n) => "`" + n + "`").join(", ") + ".");

  // ---- ilustrações ----
  const pkgL = {}; ctx.ills.forEach((x) => { pkgL[x.kebab] = x.pascal; });
  const pkgShape = {}, byShape = {};
  const pkgText = {}; Object.keys(pkgL).forEach((k) => { pkgText[k] = ctx.pkgSvg(k); const s = shape(pkgText[k]); pkgShape[k] = s; (byShape[s] = byShape[s] || []).push(k); });
  const used = new Set(), ill = {}, ours = A.illustrations || [];
  const ourSvg = {}, ourShape = {};
  ours.forEach((i) => { ourSvg[i.name] = fs.readFileSync(path.join(ctx.root, i.src), "utf8"); ourShape[i.name] = shape(ourSvg[i.name]); });
  const same = (n, k) => sameDrawing(ourSvg[n], pkgText[k]);
  // 1) mesmo nome
  ours.forEach((i) => { const k = i.name.replace("/", "-"); if (pkgL[k]){ ill[i.name] = { k, how: "nome", svg: same(i.name, k) }; used.add(k); } });
  // 2) mesmo desenho
  ours.forEach((i) => {
    if (ill[i.name]) return;
    const label = i.name.split("/").pop(), c = (byShape[ourShape[i.name]] || []).filter((k) => !used.has(k));
    if (!c.length) return;
    const k = c.filter((x) => x.slice(-label.length - 1) === "-" + label).sort((a, b) => a.length - b.length)[0] || c.sort((a, b) => a.length - b.length)[0];
    ill[i.name] = { k, how: "desenho", svg: true }; used.add(k);
  });
  // 3) mesmo nome final, único entre os que sobraram
  ours.forEach((i) => {
    if (ill[i.name]) return;
    const label = i.name.split("/").pop(), c = Object.keys(pkgL).filter((k) => !used.has(k) && k.slice(-label.length - 1) === "-" + label);
    if (c.length === 1){ ill[i.name] = { k: c[0], how: "nome final", svg: same(i.name, c[0]) }; used.add(c[0]); }
  });
  const illOnlyHere = ours.map((i) => i.name).filter((n) => !ill[n]), illOnlyPkg = Object.keys(pkgL).filter((k) => !used.has(k));
  const renamed = Object.keys(ill).filter((n) => ill[n].how !== "nome"), svgDiff = Object.keys(ill).filter((n) => !ill[n].svg);
  if (illOnlyHere.length) add("alta", "ilustracao-fora-do-pacote", "Ilustrações do [Caju] Illustrations sem par no castanha-illustrations: " + illOnlyHere.map((n) => "`" + n + "`").join(", ") + ".");
  if (illOnlyPkg.length) add("media", "ilustracao-so-no-pacote", "O castanha-illustrations exporta ilustrações sem par no [Caju] Illustrations: " + illOnlyPkg.map((n) => "`" + n + "`").join(", ") + ".");
  if (renamed.length) add("media", "ilustracao-renomeada", renamed.length + " ilustrações têm outro nome no pacote (o nome do Figma não serve no `<Illustration name>`): " + renamed.map((n) => "`" + n + "` → `" + ill[n].k + "`").join(", ") + ".");
  if (svgDiff.length) add("info", "ilustracao-svg-difere", svgDiff.length + " ilustrações têm o desenho diferente do pacote além do arredondamento (posição no quadro ou forma; conferir qual é a atual): " + svgDiff.map((n) => "`" + ill[n].k + "`").join(", ") + ".");

  // ---- motion (Lottie): o playground ainda não tem a tab Animações ----
  if (ctx.motion.length) add("info", "motion-so-no-pacote", ctx.motion.length + " animações Lottie no castanha-motion, ainda sem tab no playground (Animações volta ao Tema Caju quando a lib existir).");

  const data = {
    icons: { pkg: "@caju-beneficios/castanha-icons", map: iconMap, onlyPkg: iconOnlyPkg },
    ills: { pkg: "@caju-beneficios/castanha-illustrations", map: Object.fromEntries(Object.keys(ill).map((n) => [n, [ill[n].k, pkgL[ill[n].k], ill[n].how === "nome" ? 0 : 1, ill[n].svg ? 0 : 1]]).concat(illOnlyHere.map((n) => [n, null]))), onlyPkg: illOnlyPkg.map((k) => [k, pkgL[k]]) },
    motion: { pkg: "@caju-beneficios/castanha-motion", list: ctx.motion.map((x) => [x.kebab, x.pascal]) }
  };
  const summary = {
    icons: { pkg: Object.keys(pkgI).length, ours: Object.keys(iconMap).length, same: Object.keys(iconMap).filter((n) => iconMap[n]).length, onlyHere: iconOnlyHere.length, onlyPkg: iconOnlyPkg.length },
    ills: { pkg: Object.keys(pkgL).length, ours: ours.length, same: Object.keys(ill).length - renamed.length, renamed: renamed.length, onlyHere: illOnlyHere.length, onlyPkg: illOnlyPkg.length, svgDiff: svgDiff.length },
    motion: ctx.motion.length
  };
  return { data, findings, summary };
}

module.exports = { exportsOf, run };
