#!/usr/bin/env node
/**
 * Numeração de decisões (D, docs/ROADMAP.md) e itens a conferir (C, docs/CONFERIR.md) com mais de uma sessão
 * trabalhando em paralelo na `teste` (ROADMAP: "Numeração com apelidos").
 *
 * Regra: ao escrever, ninguém escolhe número. Linha nova usa um APELIDO — `D+nome` ou `C+nome` (letras, números
 * e hífen), e o mesmo apelido vai em qualquer referência (outra linha, comentário de código, .md do zeroheight).
 * Depois de juntar a `origin/teste` e antes do push:
 *
 *   node scripts/dev/numerar.js            resolve, numera e recalcula (e diz o que fez)
 *   node scripts/dev/numerar.js --check    só confere (CI): reprova número repetido, apelido sobrando ou conflito
 *
 * O que ele faz:
 *   1. Conflito de merge no fim das tabelas do ROADMAP/CONFERIR (só linhas de tabela dos dois lados): mantém as
 *      duas, primeiro a que já estava na teste, depois a nova. Outro tipo de conflito fica para resolver à mão.
 *   2. Troca cada apelido pelo próximo número livre (na ordem em que aparece), em todos os .md/.js/.css/.html/.yml
 *      versionados (fora dist/ e assets/ — o build regera o dist).
 *   3. Recalcula a tabela-resumo de tipos do CONFERIR.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const ROADMAP = "docs/ROADMAP.md", CONFERIR = "docs/CONFERIR.md";
const CHECK = process.argv.includes("--check");
const read = (r) => fs.readFileSync(path.join(ROOT, r), "utf8");
const write = (r, s) => fs.writeFileSync(path.join(ROOT, r), s);
const problems = [], done = [];

// ---------- 1. Conflitos no fim das tabelas ----------
const CONFLICT = /^<<<<<<< [^\n]*\n([\s\S]*?)^=======\n([\s\S]*?)^>>>>>>> [^\n]*\n/gm;
const tableOnly = (block) => block.split("\n").every((l) => l === "" || l.startsWith("|"));
for (const f of [ROADMAP, CONFERIR]){
  let s = read(f), n = 0, left = 0;
  s = s.replace(CONFLICT, (all, ours, theirs) => {
    if (!tableOnly(ours) || !tableOnly(theirs)){ left++; return all; }
    n++;
    const keep = theirs.split("\n").filter(Boolean), add = ours.split("\n").filter((l) => l && !keep.includes(l));
    return keep.concat(add).join("\n") + "\n";
  });
  if (left) problems.push(`${f}: ${left} conflito(s) fora das tabelas — resolver à mão`);
  if (n && !CHECK){ write(f, s); done.push(`${f}: ${n} conflito(s) de fim de tabela resolvido(s) (as duas linhas ficaram)`); }
  else if (n) problems.push(`${f}: ${n} conflito(s) de merge`);
}

// ---------- 2. Apelidos → números ----------
const files = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" }).split("\n")
  .filter((f) => /\.(md|js|css|html|ya?ml)$/.test(f) && !/^(dist|assets)\//.test(f) && f !== "scripts/dev/numerar.js");
const ALIAS = /\b([DC])\+(?!nome\b)([a-z0-9][a-z0-9-]*)/g; // `D+nome` / `C+nome` = exemplo na documentação
const maxOf = (kind) => {
  const src = read(kind === "D" ? ROADMAP : CONFERIR), re = kind === "D" ? /^\| D(\d+) \|/gm : /^\| C(\d+) \|/gm;
  let m, max = 0; while ((m = re.exec(src))) max = Math.max(max, +m[1]); return max;
};
// ordem de numeração = ordem das linhas que DEFINEM o apelido na tabela (início de linha "| D+x |")
const defs = { D: [], C: [] };
for (const [kind, f] of [["D", ROADMAP], ["C", CONFERIR]]){
  const re = new RegExp(`^\\| (${kind}\\+[a-z0-9][a-z0-9-]*) \\|`, "gm"); let m;
  while ((m = re.exec(read(f)))) if (!defs[kind].includes(m[1])) defs[kind].push(m[1]);
}
const used = new Set();
files.forEach((f) => { const s = fs.existsSync(path.join(ROOT, f)) ? read(f) : ""; let m; ALIAS.lastIndex = 0; while ((m = ALIAS.exec(s))) used.add(m[0]); });
const orphans = [...used].filter((a) => !defs[a[0]].includes(a));
if (orphans.length) problems.push(`apelido sem linha na tabela: ${orphans.join(", ")}`);
const map = {};
for (const kind of ["D", "C"]){ let next = maxOf(kind); defs[kind].forEach((a) => { map[a] = kind + (++next); }); }
if (Object.keys(map).length){
  if (CHECK) problems.push(`apelido(s) ainda sem número: ${Object.keys(map).join(", ")} — rodar node scripts/dev/numerar.js`);
  else {
    // troca do maior para o menor (D+ab antes de D+a)
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    files.forEach((f) => {
      if (!fs.existsSync(path.join(ROOT, f))) return;
      let s = read(f), t = s;
      keys.forEach((k) => { t = t.split(k).join(map[k]); });
      if (t !== s) write(f, t);
    });
    done.push("numerados: " + Object.entries(map).map(([a, n]) => `${a} → ${n}`).join(" · "));
  }
}

// ---------- 3. Repetidos ----------
for (const [kind, f] of [["D", ROADMAP], ["C", CONFERIR]]){
  const re = new RegExp(`^\\| ${kind}(\\d+) \\|`, "gm"), seen = {}, dup = new Set(); let m;
  const src = read(f); while ((m = re.exec(src))){ if (seen[m[1]]) dup.add(kind + m[1]); seen[m[1]] = true; }
  if (dup.size) problems.push(`${f}: número repetido ${[...dup].join(", ")} — trocar o mais novo por um apelido (${kind}+nome) e rodar de novo`);
}

// ---------- 4. Resumo de tipos do CONFERIR ----------
if (!CHECK){
  let s = read(CONFERIR); const counts = {};
  s.split(/\n(?=## )/).forEach((sec) => { const h = /^## (.+)/.exec(sec); if (h) counts[h[1].trim()] = (sec.match(/^\| C\d+ /gm) || []).length; });
  const t = s.replace(/^\| \[([^\]]+)\]\((#[^)]*)\) \| (\d+) \|/gm, (all, name, a, n) => counts[name] != null ? `| [${name}](${a}) | ${counts[name]} |` : all);
  if (t !== s){ write(CONFERIR, t); done.push("CONFERIR: resumo de tipos recalculado"); }
}

done.forEach((d) => console.log("✅ " + d));
problems.forEach((p) => console.log("❌ " + p));
if (!done.length && !problems.length) console.log("✅ Numeração em dia (D " + maxOf("D") + " · C " + maxOf("C") + ")");
process.exit(problems.length ? 1 : 0);
