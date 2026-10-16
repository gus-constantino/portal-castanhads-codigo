#!/usr/bin/env node
/**
 * Indexa os assets exportados do Figma.
 *   node scripts/build-assets.js
 *
 * Entrada:
 *   assets/icons/<bucket>/<nome>.svg  ← [Caju] Icons (vi4CKuAe98zydoLAQXoibU) · 24×24 · monocromático
 *       um bucket por frame de categoria da página UI & Caju (ui-symbols, security, … , deprecated)
 *   assets/icons/catalog.json         ← ordem do Figma, nome da categoria e palavras-chave (description)
 *   assets/icons/_glyphs/<nome>.svg   ← glifos internos de componentes (não são da lib de ícones)
 *   assets/illustrations/<categoria>/<nome>.svg ← [Caju] Illustrations (9l54k2iyKGMaiIbsGGmEiM) · colorido
 *       200×200 (página Caju UI) e Hero (673×768, 741×768, 249×132); importadas por scripts/dev/import-illustrations.py
 *   assets/illustrations/catalog.json ← ordem do Figma, nome original, node id e description
 *
 * Saída:
 *   styles/icons.css            .cds-icon--<nome> { mask-image:url(…) }   (ícone herda a cor do token)
 *   assets/animations/<nome>.json + catalog.json ← Lottie do castanha-motion na ordem da lib [Caju] Motion
 *       (importadas por scripts/dev/import-animations.js)
 *   scripts/assets-manifest.js  CDS.assets = { icons:[…], iconBuckets:[…], illustrations:[…], illustrationBuckets:[…], animations:[…], animationBuckets:[…] }
 *       ilustração = { name: "<categoria>/<nome>", label, bucket, src, figma, description, size }
 *
 * Regras: nome de classe = nome do ícone (único). Se um ícone deprecated tem o mesmo nome de um ativo,
 * a classe aponta para o ativo e o deprecated fica só no manifest. Ícone em pasta sem entrada no
 * catálogo também entra (bucket "outros"), para export manual não se perder.
 *
 * Ferramenta de desenvolvimento: o site não depende de build, só dos arquivos gerados.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICONS = path.join(ROOT, "assets/icons");
const svgs = (abs) => fs.existsSync(abs) ? fs.readdirSync(abs).filter((f) => f.toLowerCase().endsWith(".svg")).map((f) => f.slice(0, -4)) : [];
// Nomes do Figma podem ter espaço, barra ou maiúscula → classe segura
const cls = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const catalogPath = path.join(ICONS, "catalog.json");
const catalog = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath, "utf8")) : { buckets: [] };

// Buckets na ordem do catálogo (= ordem das categorias no Figma); deprecated por último; glifos à parte
const dirs = fs.readdirSync(ICONS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const known = catalog.buckets.map((b) => b.id);
const buckets = catalog.buckets.filter((b) => dirs.includes(b.id)).map((b) => {
  const onDisk = new Set(svgs(path.join(ICONS, b.id)));
  const listed = b.icons.filter((i) => onDisk.has(i.name));
  const extra = [...onDisk].filter((n) => !listed.some((i) => i.name === n)).sort().map((n) => ({ name: n, keywords: [] }));
  return { id: b.id, name: b.name, deprecated: !!b.deprecated, icons: listed.concat(extra) };
});
dirs.filter((d) => !known.includes(d)).sort().forEach((d) => buckets.push({
  id: d, name: d === "_glyphs" ? "Glifos de componentes" : d, deprecated: false, glyphs: d === "_glyphs",
  icons: svgs(path.join(ICONS, d)).sort().map((n) => ({ name: n, keywords: [] })),
}));
// Legado: SVG solto na raiz de assets/icons
const loose = svgs(ICONS);
if (loose.length) buckets.push({ id: "", name: "Sem categoria", deprecated: false, icons: loose.sort().map((n) => ({ name: n, keywords: [] })) });
buckets.sort((a, b) => (a.deprecated - b.deprecated) || (!!a.glyphs - !!b.glyphs));

// Classe única por nome: o primeiro ativo vence; duplicado deprecated não gera classe
const byName = new Map(), dupes = [];
buckets.forEach((b) => b.icons.forEach((i) => {
  const c = cls(i.name), file = (b.id ? b.id + "/" : "") + i.name + ".svg";
  const entry = { name: i.name, cls: "cds-icon--" + c, bucket: b.id || null, file, keywords: i.keywords || [], deprecated: b.deprecated };
  if (byName.has(c)) { dupes.push(file); entry.cls = null; } else byName.set(c, entry);
  i.entry = entry;
}));

const all = buckets.flatMap((b) => b.icons.map((i) => i.entry));
const withClass = all.filter((e) => e.cls);
const css = `/* GERADO por scripts/build-assets.js · não editar à mão · ${withClass.length} ícones em ${buckets.length} buckets */
/* URL em longhand, sem var(): o Safari falha com var() no shorthand -webkit-mask */
${buckets.map((b) => {
  const rows = b.icons.map((i) => i.entry).filter((e) => e.cls).map((e) => {
    const url = "../assets/icons/" + e.file.split("/").map(encodeURIComponent).join("/");
    return `.${e.cls}{ -webkit-mask-image:url("${url}"); mask-image:url("${url}"); }`;
  });
  return rows.length ? `/* ${b.name}${b.deprecated ? " (deprecated)" : ""} */\n` + rows.join("\n") : "";
}).filter(Boolean).join("\n")}
`;
fs.writeFileSync(path.join(ROOT, "styles/icons.css"), css);

// Ilustrações: categorias do catálogo (ordem do Figma); pasta sem catálogo também entra, para export manual não se perder
const ILL = path.join(ROOT, "assets/illustrations");
const illCatPath = path.join(ILL, "catalog.json");
const illCatalog = fs.existsSync(illCatPath) ? JSON.parse(fs.readFileSync(illCatPath, "utf8")) : { buckets: [] };
const illDirs = fs.existsSync(ILL) ? fs.readdirSync(ILL, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];
const illBuckets = illCatalog.buckets.filter((b) => illDirs.includes(b.id)).map((b) => {
  const onDisk = new Set(svgs(path.join(ILL, b.id)));
  const listed = b.items.filter((i) => onDisk.has(i.name));
  const extra = [...onDisk].filter((n) => !listed.some((i) => i.name === n)).sort().map((n) => ({ name: n }));
  return { id: b.id, name: b.name, items: listed.concat(extra) };
});
illDirs.filter((d) => !illBuckets.some((b) => b.id === d)).sort().forEach((d) => illBuckets.push({ id: d, name: d, items: svgs(path.join(ILL, d)).sort().map((n) => ({ name: n })) }));
const illustrations = illBuckets.flatMap((b) => b.items.map((i) => ({
  name: b.id + "/" + i.name, label: i.name, bucket: b.id, src: "assets/illustrations/" + b.id + "/" + encodeURIComponent(i.name) + ".svg",
  figma: i.figma || i.name, description: i.description || "", size: i.size || "",
})));
// Animações (Lottie do castanha-motion, catálogo gerado por scripts/dev/import-animations.js)
const ANIM = path.join(ROOT, "assets/animations");
const animCatPath = path.join(ANIM, "catalog.json");
const animCatalog = fs.existsSync(animCatPath) ? JSON.parse(fs.readFileSync(animCatPath, "utf8")) : { buckets: [] };
const animations = animCatalog.buckets.flatMap((b) => b.items.filter((i) => fs.existsSync(path.join(ANIM, i.name + ".json"))).map((i) => ({
  name: i.name, bucket: b.id, src: "assets/animations/" + i.name + ".json", figma: i.figma, node: i.node, duration: i.duration, w: i.w, h: i.h, kb: i.kb,
  react: i.react, flutter: i.flutter,
})));
const manifest = `/* GERADO por scripts/build-assets.js · não editar à mão */
window.CDS = window.CDS || {};
CDS.assets = ${JSON.stringify({
  // icons: só os que têm classe (o que o iconSwap lista); iconBuckets: a organização completa
  icons: withClass.filter((e) => !e.deprecated).map((e) => ({ name: e.name, cls: e.cls, bucket: e.bucket, keywords: e.keywords })),
  iconBuckets: buckets.map((b) => ({ id: b.id, name: b.name, deprecated: b.deprecated, glyphs: !!b.glyphs, icons: b.icons.map((i) => i.entry.name) })),
  illustrations,
  illustrationBuckets: illBuckets.map((b) => ({ id: b.id, name: b.name, items: b.items.map((i) => b.id + "/" + i.name) })),
  animations,
  animationBuckets: animCatalog.buckets.map((b) => ({ id: b.id, name: b.name, node: b.node, items: b.items.map((i) => i.name) })),
  animationPackage: animCatalog.package || null,
})};
`;
fs.writeFileSync(path.join(ROOT, "scripts/assets-manifest.js"), manifest);

console.log(`icons.css: ${withClass.length} ícones (${buckets.map((b) => b.id || "raiz").join(", ")}) · ${dupes.length ? "sem classe (nome repetido): " + dupes.join(", ") + " · " : ""}${illustrations.length} ilustrações em ${illBuckets.length} categorias`);
