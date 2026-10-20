/**
 * Tab Débitos (scripts/debitos.js): todo item em aberto do docs/CONFERIR.md precisa casar com um componente
 * ou estar na lista GERAIS. Item novo que não casa ficaria fora da tab sem ninguém perceber: o Smoke reprova.
 *
 *   node tests/debitos.test.js          · confere (sai com 1 quando sobra item sem componente)
 *   node tests/debitos.test.js --lista  · mostra cada item em aberto e os componentes ligados
 *
 * Também confere se docs/debitos/<id>.json (o que o link de componente com Débitos lê) está igual ao CONFERIR.md de agora:
 * Conferir editado sem rodar o build deixaria quem recebeu o link com a lista antiga.
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const { parse, ligar, geral, porComponente } = require("../scripts/debitos.js");

const alvos = JSON.parse(fs.readFileSync(path.join(ROOT, "acesso/alvos.js"), "utf8").match(/CDS\.alvos = (\{.*\});/)[1]);
const nomes = Object.entries(alvos).filter(([k]) => k.startsWith("componente:")).map(([k, v]) => [v.titulo, k.slice(11)]);
const achar = ligar(nomes);
const secoes = parse(fs.readFileSync(path.join(ROOT, "docs/CONFERIR.md"), "utf8"));

let ligados = 0, gerais = 0;
const soltos = [];
for (const s of secoes) for (const it of s.itens) {
  if (it.resolvido) continue;
  const ids = achar(it.cols[1] || "");
  if (process.argv.includes("--lista")) console.log(it.code.padEnd(5), (ids.join(", ") || (geral(it.cols[1]) ? "(geral)" : "(sem componente)")).padEnd(60), it.cols[1].slice(0, 70));
  if (ids.length) ligados++;
  else if (geral(it.cols[1])) gerais++;
  else soltos.push(it.code + " · " + s.tipo + " · " + it.cols[1]);
}
console.log(`Débitos: ${ligados} itens ligados a componentes, ${gerais} gerais da lib, ${soltos.length} sem componente`);
// arquivos do link em dia com o Conferir
const md = fs.readFileSync(path.join(ROOT, "docs/CONFERIR.md"), "utf8"), deb = porComponente(md, nomes), velhos = [];
for (const id of Object.keys(deb)) {
  const f = path.join(ROOT, "docs/debitos", id + ".json");
  if (!fs.existsSync(f) || fs.readFileSync(f, "utf8") !== JSON.stringify(deb[id]) + "\n") velhos.push(id);
}
if (velhos.length) console.log("\ndocs/debitos/ fora de dia com o CONFERIR.md (" + velhos.slice(0, 8).join(", ") + (velhos.length > 8 ? "…" : "") + "): rode node scripts/build-index.js");
if (soltos.length) {
  console.log("\nItens em aberto do CONFERIR.md que não aparecem em nenhuma tab Débitos. Use o nome do componente como está no Figma");
  console.log("na coluna Componente ou acrescente o apelido (APELIDOS) ou o começo do texto (GERAIS) em scripts/debitos.js:\n");
  soltos.forEach((x) => console.log("  " + x));
}
if (soltos.length || velhos.length) process.exit(1);
