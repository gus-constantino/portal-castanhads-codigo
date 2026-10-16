#!/usr/bin/env node
/* Importa as animações Lottie do castanha-motion para o portal (D361).
 *
 *   node scripts/dev/import-animations.js [caminho do clone do castanha] [ref]
 *     padrão: ../castanha  origin/staging
 *
 * Entrada: assets/animations/figma.json — frames (categorias) e componentes da lib [Caju] Motion, na ordem do Figma.
 * Par com o pacote: o nome completo é `frame-nome` sem acento (Documentos › admissao = documentos-admissao); se não
 * existir, o próprio nome do Figma (o pacote não põe a categoria em algumas, ex.: maquininha-verde-cartao).
 * Saída: assets/animations/<nome no pacote>.json (cópia da Lottie) e assets/animations/catalog.json.
 * Depois: node scripts/build-assets.js (manifesto) e node scripts/build-index.js. Clone do castanha só leitura (git show). */
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const REPO = path.resolve(ROOT, process.argv[2] || "../castanha"), REF = process.argv[3] || "origin/staging";
const PKG = "packages/castanha-motion";
const OUT = path.join(ROOT, "assets/animations");
const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const camel = (s) => s.split("-").map((p, i) => (i ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join("");
const pascal = (s) => s.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");

const figma = JSON.parse(fs.readFileSync(path.join(OUT, "figma.json"), "utf8"));
const files = git("ls-tree", "--name-only", REF + ":" + PKG + "/src/assets/").split("\n").filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
const version = JSON.parse(git("show", REF + ":" + PKG + "/package.json")).version;
const commit = git("rev-parse", "--short=8", REF).trim();
const pkgSet = new Set(files), used = new Set(), semPar = [];

const buckets = figma.frames.map((f) => {
  const id = slug(f.name);
  const items = f.items.map((c) => {
    const n = slug(c.name), full = n.startsWith(id + "-") ? n : id + "-" + n;
    const name = pkgSet.has(full) ? full : pkgSet.has(n) ? n : null;
    if (!name){ semPar.push(f.name + " › " + c.name); return null; }
    used.add(name);
    const raw = git("show", REF + ":" + PKG + "/src/assets/" + name + ".json");
    fs.writeFileSync(path.join(OUT, name + ".json"), raw);
    const j = JSON.parse(raw), fr = j.fr || 30;
    return { name, figma: c.name, node: c.node, duration: Math.round(((j.op - j.ip) / fr) * 100) / 100, w: j.w, h: j.h, kb: Math.round(raw.length / 1024),
      react: pascal(name), flutter: camel(name), rule: name === full ? "frame-nome" : "nome" };
  }).filter(Boolean);
  return { id, name: f.name, node: f.node, items };
});
const soNoPacote = files.filter((f) => !used.has(f)).sort();
fs.writeFileSync(path.join(OUT, "catalog.json"), JSON.stringify({
  _source: figma._source + " · Lottie do @caju-beneficios/castanha-motion " + version + " (" + REF + " " + commit + ")",
  package: { name: "@caju-beneficios/castanha-motion", version, commit, dart: "castanha_motion", dartClass: "CastanhaMotion" },
  buckets, soNoPacote, semPar,
}, null, 1) + "\n");
// remove Lottie que não está mais no catálogo
fs.readdirSync(OUT).filter((f) => f.endsWith(".json") && !["catalog.json", "figma.json"].includes(f) && !used.has(f.replace(/\.json$/, ""))).forEach((f) => fs.unlinkSync(path.join(OUT, f)));
console.log(`assets/animations: ${used.size} Lottie em ${buckets.length} categorias · só no pacote: ${soNoPacote.join(", ") || "—"} · sem par: ${semPar.join(", ") || "—"}`);
