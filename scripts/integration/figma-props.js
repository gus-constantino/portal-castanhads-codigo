#!/usr/bin/env node
/**
 * R6 · Atualiza integration/figma-props.tsv (props do Figma usadas pelo check do R2) — leitura SÓ via MCP do Figma.
 *
 *   node scripts/integration/figma-props.js code 1      → imprime o script do use_figma do lote 1 (só leitura)
 *   node scripts/integration/figma-props.js code 2      → idem, lote 2 (o retorno do MCP corta em 20 KB: por isso 2 lotes)
 *   node scripts/integration/figma-props.js write a.tsv b.tsv
 *                                                       → valida o retorno dos lotes (salvo em arquivos, como veio) e grava o TSV
 *
 * Os nós são os dos componentes do playground com par no React (integration/manifest.json), no arquivo
 * [CastanhaDS] Components (LKZBwmlb7fIbDKdGrMncuA). Formato de cada linha: ver o topo de scripts/integration/check-stack.js.
 */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "manifest.json"), "utf8"));
const nodes = Array.from(new Set(manifest.components.filter((c) => c.react && c.figma.node).map((c) => c.figma.node)));
const half = Math.ceil(nodes.length / 2), batches = [nodes.slice(0, half), nodes.slice(half)];
const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "code"){
  const b = batches[(parseInt(rest[0], 10) || 1) - 1];
  if (!b){ console.error("Lote inválido: use 1 ou 2."); process.exit(1); }
  console.log(`// Só leitura: props dos sets (lote ${rest[0] || 1} de 2) em formato compacto
const ids = ${JSON.stringify(b.map((n) => n.replace("-", ":")))};
const lines = [];
for (const id of ids) {
  let n = await figma.getNodeByIdAsync(id);
  if (!n) { lines.push(id.replace(":", "-") + "\\t?\\t"); continue; }
  if (n.type === "COMPONENT" && n.parent && n.parent.type === "COMPONENT_SET") n = n.parent;
  const defs = n.componentPropertyDefinitions, ps = [];
  for (const k of Object.keys(defs)) {
    const d = defs[k], name = k.split("#")[0];
    if (d.type === "VARIANT") ps.push(name + "=V:" + d.defaultValue + ":" + d.variantOptions.join("|"));
    else if (d.type === "BOOLEAN") ps.push(name + "=B:" + (d.defaultValue ? 1 : 0));
    else if (d.type === "TEXT") ps.push(name + "=T");
    else if (d.type === "INSTANCE_SWAP") { const c = await figma.getNodeByIdAsync(d.defaultValue); ps.push(name + "=I:" + (c ? c.name : "")); }
    else ps.push(name + "=S");
  }
  lines.push(id.replace(":", "-") + "\\t" + n.name + "\\t" + ps.join(";"));
}
return lines.join("\\n");`);
} else if (cmd === "write"){
  const got = {};
  rest.forEach((f) => fs.readFileSync(f, "utf8").split("\n").forEach((l) => {
    if (!l.trim() || l.charAt(0) === "#") return;
    const parts = l.split("\t");
    if (parts.length !== 3 || !/^\d+-\d+$/.test(parts[0])) throw new Error("Linha fora do formato: " + l.slice(0, 80));
    if (parts[2] && !parts[2].split(";").every((p) => /^[^=]+=(V:[^:]*:.+|B:[01]|T|I:.*|S)$/.test(p))) throw new Error("Prop fora do formato em " + parts[0]);
    if (parts[1] === "?") throw new Error("Nó " + parts[0] + " não existe mais no Figma: confira o link do componente.");
    got[parts[0]] = l;
  }));
  const missing = nodes.filter((n) => !got[n]);
  if (missing.length){ console.error("Faltam nós: " + missing.join(", ")); process.exit(1); }
  const day = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(ROOT, "integration", "figma-props.tsv"),
    "# Props do Figma ([CastanhaDS] Components, componentPropertyDefinitions) · lidas via MCP em " + day + " · scripts/integration/figma-props.js\n" + nodes.map((n) => got[n]).join("\n") + "\n");
  console.log("integration/figma-props.tsv: " + nodes.length + " componentes.");
} else {
  console.log("Uso: figma-props.js code 1|2  ·  figma-props.js write lote1.tsv lote2.tsv");
}
