#!/usr/bin/env node
/**
 * R6 · Leitura diária da integração com o castanha-react (rodada pela rotina "Castanha DS · status de publicação no Figma").
 *
 *   node scripts/integration/daily.js [--castanha ../castanha] [--no-fetch] [--no-jsx] [--before arquivo.json (teste: compara com ele em vez do HEAD)]
 *
 * 1. `git fetch` no clone do castanha (só atualiza as refs remotas: não troca de branch nem mexe nos arquivos do clone).
 *    Sem rede, segue com as refs que já estão no clone e avisa.
 * 2. Regera manifesto, cobertura, react-data, assets-react e o relatório (scripts/integration/build-manifest.js).
 * 2b. Valida o JSX "No React" com o TypeScript do castanha (scripts/integration/check-jsx.js → integration/jsx-check.json) e
 *    compara os erros com a versão commitada. Sem Chrome ou sem porta: avisa e segue (--no-jsx pula).
 * 3. Compara integration/stack-check.json com a versão commitada (HEAD): commits lidos, cobertura, componentes só no React,
 *    tokens, assets e cada item do check (novo · resolvido).
 * 4. Com mudança: escreve uma entrada no topo de integration/HISTORICO.md, regera o relatório (que mostra o histórico) e imprime
 *    o resumo. Sem mudança: descarta os arquivos regerados (só a data mudaria) e imprime "SEM MUDANÇAS".
 * Saída: o resumo em texto (a rotina usa no commit e na mensagem final). Código de saída 0 mesmo sem rede; 1 só se o build falhar.
 */
"use strict";
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const CASTANHA = path.resolve(ROOT, arg("castanha", "../castanha"));
const run = (cmd, args, opts) => execFileSync(cmd, args, Object.assign({ encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }, opts));
const OUT = ["integration/manifest.json", "integration/COBERTURA.md", "integration/react-data.js", "integration/assets-react.js", "integration/SAUDE-STACK.md", "integration/stack-check.json",
  "integration/JSX-CHECK.md", "integration/jsx-check.json"];

// 1 · fetch
let fetched = true;
if (process.argv.indexOf("--no-fetch") < 0){
  try { run("git", ["-C", CASTANHA, "fetch", "--quiet", "origin", "staging", "main", "feat/figma-code-connect"], { stdio: "pipe" }); }
  catch (e){ fetched = false; }
  // castanha-ai (4º vértice, D182): só refs remotas; sem o clone, o check segue sem ele
  try { run("git", ["-C", path.resolve(ROOT, arg("castanha-ai", "../castanha-ai")), "fetch", "--quiet", "origin", "feat/castanha-plugin"], { stdio: "pipe" }); } catch (e) {}
}

// 2 · estado anterior (commitado) e build
let before = null;
try { before = JSON.parse(arg("before") ? fs.readFileSync(arg("before"), "utf8") : run("git", ["-C", ROOT, "show", "HEAD:integration/stack-check.json"], { stdio: "pipe" })); } catch (e) {} // --before: teste
const build = () => run("node", [path.join(ROOT, "scripts", "integration", "build-manifest.js"), "--castanha", CASTANHA], { stdio: "pipe" });
try { build(); } catch (e){ console.error("Falha no build-manifest:\n" + (e.stderr || e.message)); process.exit(1); }
const after = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "stack-check.json"), "utf8"));

// 2b · JSX "No React" × TypeScript do castanha (D166)
let jsxBefore = null, jsxAfter = null, jsxNote = "";
if (process.argv.indexOf("--no-jsx") < 0){
  try { jsxBefore = JSON.parse(run("git", ["-C", ROOT, "show", "HEAD:integration/jsx-check.json"], { stdio: "pipe" })); } catch (e) {}
  try { run("node", [path.join(ROOT, "scripts", "integration", "check-jsx.js"), "--castanha", CASTANHA], { stdio: "pipe" }); }
  catch (e){ if (e.status !== 1) jsxNote = "validação do JSX não rodou (" + String(e.stderr || e.message).trim().split("\n").pop() + ")"; }
  if (!jsxNote) try { jsxAfter = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "jsx-check.json"), "utf8")); } catch (e){ jsxNote = "validação do JSX sem resultado"; }
  if (jsxNote) try { run("git", ["-C", ROOT, "checkout", "--", "integration/JSX-CHECK.md", "integration/jsx-check.json"], { stdio: "pipe" }); } catch (e) {}
}

// 3 · comparação
const key = (f) => f.id + "|" + f.kind + "|" + f.msg;
const name = (id) => id; // ids do playground (ex.: `topic`) ou "tokens"/"assets"
const lines = [];
if (!before) lines.push("Primeira leitura com histórico (sem versão anterior para comparar).");
else {
  if (before.source.commit !== after.source.commit) lines.push("castanha-react `" + after.source.ref + "`: `" + before.source.commit + "` → `" + after.source.commit + "` (" + after.source.date + ").");
  if (before.codeConnect.commit !== after.codeConnect.commit) lines.push("Code Connect: `" + before.codeConnect.commit + "` → `" + after.codeConnect.commit + "`.");
  const ai0 = before.castanhaAi && before.castanhaAi.commit, ai1 = after.castanhaAi && after.castanhaAi.commit;
  if (ai0 !== ai1) lines.push("castanha-ai (bridge): `" + (ai0 || "—") + "` → `" + (ai1 || "não lido") + "`.");
  Object.keys(after.coverage).forEach((k) => { if (before.coverage[k] !== after.coverage[k]) lines.push("Cobertura · " + k + ": " + before.coverage[k] + " → " + after.coverage[k] + "."); });
  const newReact = after.reactOnly.filter((n) => before.reactOnly.indexOf(n) < 0), goneReact = before.reactOnly.filter((n) => after.reactOnly.indexOf(n) < 0);
  if (newReact.length) lines.push("Novo só no React: " + newReact.map((n) => "`" + n + "`").join(", ") + ".");
  if (goneReact.length) lines.push("Saiu de \"só no React\" (ganhou par ou foi removido): " + goneReact.map((n) => "`" + n + "`").join(", ") + ".");
  if (before.tokens.ok !== after.tokens.ok || before.tokens.official !== after.tokens.official) lines.push("Tokens: " + before.tokens.ok + "/" + before.tokens.official + " → " + after.tokens.ok + "/" + after.tokens.official + " batendo.");
  ["icons", "ills", "motion"].forEach((k) => { if (JSON.stringify(before.assets[k]) !== JSON.stringify(after.assets[k])) lines.push("Assets · " + k + ": " + JSON.stringify(before.assets[k]) + " → " + JSON.stringify(after.assets[k]) + "."); });
  const bk = new Set(before.findings.map(key)), ak = new Set(after.findings.map(key));
  const novos = after.findings.filter((f) => !bk.has(key(f))), resolvidos = before.findings.filter((f) => !ak.has(key(f)));
  const LV = { alta: "alta", media: "média", info: "informativo" };
  novos.forEach((f) => lines.push("🆕 " + LV[f.level] + " · " + name(f.id) + " · " + f.msg));
  resolvidos.forEach((f) => lines.push("✅ resolvido · " + name(f.id) + " · " + f.msg));
}
if (jsxAfter){
  const jk = (e) => e.id + "|" + e.variant + "|" + e.code + "|" + e.msg, jb = new Set(((jsxBefore || {}).erros || []).map(jk)), ja = new Set(jsxAfter.erros.map(jk));
  if (!jsxBefore) lines.push("JSX \"No React\": primeira validação com TypeScript · " + jsxAfter.trechos + " trechos · " + jsxAfter.erros.length + " erros.");
  jsxAfter.erros.filter((e) => !jb.has(jk(e))).forEach((e) => lines.push("🆕 JSX não compila · " + e.id + " " + e.variant + " · " + e.code + ": " + e.msg));
  ((jsxBefore || {}).erros || []).filter((e) => !ja.has(jk(e))).forEach((e) => lines.push("✅ JSX resolvido · " + e.id + " " + e.variant + " · " + e.code + ": " + e.msg));
  if (jsxBefore && jsxBefore.trechos !== jsxAfter.trechos && !lines.some((l) => /JSX/.test(l))) lines.push("JSX \"No React\": " + jsxBefore.trechos + " → " + jsxAfter.trechos + " trechos validados, " + jsxAfter.erros.length + " erros.");
}

const today = new Date(), d = [today.getDate(), today.getMonth() + 1, today.getFullYear()].map((n) => String(n).padStart(2, "0")).join("/");
const net = fetched ? "" : " (sem rede: comparado com as refs locais do clone)";
if (before && !lines.length){
  try { run("git", ["-C", ROOT, "checkout", "--"].concat(OUT), { stdio: "pipe" }); } catch (e) {}
  const c = after.findings.reduce((o, f) => { o[f.level] = (o[f.level] || 0) + 1; return o; }, {});
  const jx = jsxNote ? " · " + jsxNote : jsxAfter ? " · JSX: " + jsxAfter.trechos + " trechos, " + jsxAfter.erros.length + " erros" : "";
  console.log("SEM MUDANÇAS na integração com o castanha-react" + net + " · staging " + after.source.commit + " · check: " + (c.alta || 0) + " alta, " + (c.media || 0) + " média, " + (c.info || 0) + " informativo" + jx + ".");
  process.exit(0);
}

// 4 · histórico (mais recente no topo; guarda as 60 últimas leituras com mudança)
const HIST = path.join(ROOT, "integration", "HISTORICO.md");
const head = "# Histórico da integração com o castanha-react\n\nEscrito por `scripts/integration/daily.js` (rotina diária): só entram as leituras em que algo mudou.\n\n";
const old = fs.existsSync(HIST) ? fs.readFileSync(HIST, "utf8").replace(/^#[^\n]*\n+(Escrito[^\n]*\n+)?/, "") : "";
const entries = old.split(/\n(?=### )/).filter((x) => x.trim()).slice(0, 59);
const entry = "### " + d + " · staging `" + after.source.commit + "`" + net + "\n\n" + lines.map((l) => "- " + l).join("\n") + "\n";
fs.writeFileSync(HIST, head + [entry].concat(entries).join("\n").trim() + "\n");
try { build(); } catch (e){ console.error("Falha no build-manifest:\n" + (e.stderr || e.message)); process.exit(1); }
console.log("MUDANÇAS na integração com o castanha-react" + net + ":\n" + lines.map((l) => "- " + l).join("\n") + (jsxNote ? "\n- (" + jsxNote + ")" : ""));
