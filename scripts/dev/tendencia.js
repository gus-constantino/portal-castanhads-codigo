#!/usr/bin/env node
/**
 * Tendência do projeto (painel "Tendência" na Visão geral do Relatório): um ponto por dia, lido do histórico do git.
 *
 *   node scripts/dev/tendencia.js            → regrava docs/tendencia.json se mudou
 *   node scripts/dev/tendencia.js --print    → imprime a série sem gravar
 *
 * Para cada dia, pega o último commit da linha principal (first-parent do HEAD) e conta, nos arquivos daquele commit:
 *   docs        documentações de componente (components/<id>/<id>.docs.js)
 *   decisoes    linhas D do docs/ROADMAP.md
 *   abertos     itens C do docs/CONFERIR.md fora de "Resolvidos" · resolvidos: itens C em "Resolvidos"
 *   react       [alta, média] do Resumo de integration/SAUDE-STACK.md (null antes do check existir)
 *   flutter     [alta, média] do Resumo de integration/flutter/SAUDE-STACK.md
 * Só entram dias já fechados (antes de hoje): o ponto de hoje o Relatório calcula ao vivo dos registros atuais,
 * então o arquivo muda uma vez por dia e não a cada build. Sem histórico (clone raso do CI), não mexe no arquivo.
 */
"use strict";
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "docs", "tendencia.json");
const git = (args) => execFileSync("git", ["-C", ROOT].concat(args), { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
const show = (c, f) => { try { return git(["show", c + ":" + f]); } catch (e) { return null; } };

// mesmas regras do scripts/report.js (linhas de tabela com ID no 1º campo)
const ROW = (re) => (l) => re.test(l);
function sections(md){
  const out = []; let cur = { title: "", lines: [] };
  md.replace(/\r/g, "").split("\n").forEach((l) => { const h = /^##\s+(.*)$/.exec(l); if (h){ cur = { title: h[1].trim(), lines: [] }; out.push(cur); } else cur.lines.push(l); });
  return out;
}
function conferir(md){
  let abertos = 0, resolvidos = 0; const isC = ROW(/^\|\s*(~~)?C\d+\b/);
  sections(md).forEach((s) => { const n = s.lines.filter(isC).length; if (/^Resolvidos/.test(s.title)) resolvidos += n; else abertos += n; });
  return { abertos, resolvidos };
}
// no arquivo inteiro: entre 06 e 09/10 as decisões D236 em diante ficaram por engano na tabela de Aprendizados
function decisoes(md){ return md.split("\n").filter(ROW(/^\|\s*(~~)?D\d+\b/)).length; }
function niveis(md){
  if (!md) return null;
  const s = sections(md).filter((x) => x.title === "Resumo")[0]; if (!s) return null;
  const v = {}; s.lines.forEach((l) => { const m = /^\|\s*(Alta|Média)\s*\|.*\|\s*(\d+)\s*\|\s*$/.exec(l); if (m) v[m[1]] = +m[2]; });
  return v.Alta == null && v["Média"] == null ? null : [v.Alta || 0, v["Média"] || 0];
}

function serie(){
  try { if (git(["rev-parse", "--is-shallow-repository"]).trim() === "true") return null; } catch (e) { return null; }
  const hoje = new Date(), today = [hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate()].map((n) => String(n).padStart(2, "0")).join("-");
  const last = {};
  git(["log", "--first-parent", "--format=%H %cd", "--date=format-local:%Y-%m-%d", "HEAD"]).trim().split("\n").forEach((l) => {
    const p = l.split(" "); if (p[1] && p[1] < today && !last[p[1]]) last[p[1]] = p[0]; // o log vem do mais novo: o 1º de cada dia é o último commit dele
  });
  return Object.keys(last).sort().map((d) => {
    const c = last[d], road = show(c, "docs/ROADMAP.md") || "", conf = show(c, "docs/CONFERIR.md") || "";
    const files = git(["ls-tree", "-r", "--name-only", c, "components"]).split("\n");
    const k = conferir(conf);
    return { d, docs: files.filter((f) => /^components\/[^/]+\/[^/]+\.docs\.js$/.test(f)).length, decisoes: decisoes(road), abertos: k.abertos, resolvidos: k.resolvidos,
      react: niveis(show(c, "integration/SAUDE-STACK.md")), flutter: niveis(show(c, "integration/flutter/SAUDE-STACK.md")) };
  }).filter((x, i, a) => a.slice(0, i + 1).some((y) => y.docs || y.decisoes)); // começa no 1º dia com registro
}

if (require.main === module){
  const days = serie();
  if (!days){ console.log("Tendência: sem histórico do git (clone raso), docs/tendencia.json fica como está."); process.exit(0); }
  const out = '{"days": [\n' + days.map((x) => "  " + JSON.stringify(x)).join(",\n") + "\n]}\n"; // um dia por linha: diff legível
  if (process.argv.includes("--print")){ process.stdout.write(out); process.exit(0); }
  if (!fs.existsSync(OUT) || fs.readFileSync(OUT, "utf8") !== out){ fs.writeFileSync(OUT, out); console.log("Tendência atualizada: docs/tendencia.json (" + days.length + " dias)."); }
}
module.exports = { serie };
