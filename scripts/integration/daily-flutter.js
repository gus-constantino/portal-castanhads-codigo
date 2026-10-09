#!/usr/bin/env node
/**
 * F5 · Leitura diária da integração com o castanha_flutter (rodada pela rotina das 9h, depois do daily.js do React).
 *
 *   node scripts/integration/daily-flutter.js [--mobile ../castanha-mobile] [--castanha ../castanha] [--no-fetch] [--no-dart]
 *
 * 1. `git fetch` no clone do castanha-mobile (staging, main e Code Connect) e nas tags do castanha (versões dos pacotes de assets).
 *    Só atualiza refs remotas: não troca de branch nem mexe nos arquivos dos clones. Sem rede, segue com o que já está lá e avisa.
 * 2. Regera manifesto, painel e relatório (scripts/integration/build-flutter-manifest.js).
 * 2b. Valida o Dart do painel com o `dart analyze` (scripts/integration/check-dart.js). Sem Flutter SDK ou sem Chrome: avisa e segue.
 * 3. Compara integration/flutter/stack-check.json e dart-check.json com a versão commitada (HEAD).
 * 4. Com mudança: entrada no topo de integration/flutter/HISTORICO.md, regera o relatório e imprime o resumo.
 *    Sem mudança: descarta os arquivos regerados e imprime "SEM MUDANÇAS".
 * Código de saída 0 mesmo sem rede; 1 só se o manifesto falhar.
 */
"use strict";
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const MOBILE = path.resolve(ROOT, arg("mobile", "../castanha-mobile"));
const CASTANHA = path.resolve(ROOT, arg("castanha", "../castanha"));
const run = (cmd, args, opts) => execFileSync(cmd, args, Object.assign({ encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }, opts));
const OUT = ["integration/flutter/manifest.json", "integration/flutter/COBERTURA.md", "integration/flutter/SAUDE-STACK.md", "integration/flutter/stack-check.json",
  "integration/flutter-data.js", "integration/flutter/DART-CHECK.md", "integration/flutter/dart-check.json"];

// 1 · fetch
let fetched = true;
if (process.argv.indexOf("--no-fetch") < 0){
  try { run("git", ["-C", MOBILE, "fetch", "--quiet", "origin", "staging", "main", "feat/figma-code-connect"], { stdio: "pipe" }); } catch (e){ fetched = false; }
  try { run("git", ["-C", CASTANHA, "fetch", "--quiet", "--tags", "origin"], { stdio: "pipe" }); } catch (e) {}
}

// 2 · estado anterior (commitado) e build
const head = (f) => { try { return JSON.parse(run("git", ["-C", ROOT, "show", "HEAD:" + f], { stdio: "pipe" })); } catch (e) { return null; } };
const before = head("integration/flutter/stack-check.json");
const build = () => run("node", [path.join(ROOT, "scripts", "integration", "build-flutter-manifest.js"), "--mobile", MOBILE, "--castanha", CASTANHA], { stdio: "pipe" });
try { build(); } catch (e){ console.error("Falha no build-flutter-manifest:\n" + (e.stderr || e.message)); process.exit(1); }
const after = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "flutter", "stack-check.json"), "utf8"));

// 2b · Dart do painel × dart analyze
const dartBefore = head("integration/flutter/dart-check.json");
let dartAfter = null, dartNote = "";
if (process.argv.indexOf("--no-dart") < 0){
  try { run("node", [path.join(ROOT, "scripts", "integration", "check-dart.js"), "--mobile", MOBILE], { stdio: "pipe" }); }
  catch (e){ if (e.status !== 1) dartNote = "validação do Dart não rodou (" + String(e.stderr || e.message).trim().split("\n").pop() + ")"; }
  if (!dartNote) try { dartAfter = JSON.parse(fs.readFileSync(path.join(ROOT, "integration", "flutter", "dart-check.json"), "utf8")); } catch (e){ dartNote = "validação do Dart sem resultado"; }
  if (dartNote) try { run("git", ["-C", ROOT, "checkout", "--", "integration/flutter/DART-CHECK.md", "integration/flutter/dart-check.json"], { stdio: "pipe" }); } catch (e) {}
  else build(); // o relatório cita o resultado do Dart
}

// 3 · comparação
const LV = { alta: "alta", media: "média", info: "informativo" };
const key = (f) => f.id + "|" + f.t + "|" + f.m;
const lines = [];
if (!before) lines.push("Primeira leitura com histórico (sem versão anterior para comparar).");
else {
  if (before.source.commit !== after.source.commit) lines.push("castanha_flutter `" + after.source.ref + "`: `" + before.source.commit + "` → `" + after.source.commit + "` (" + after.source.date + ").");
  const cc0 = before.source.codeConnect || {}, cc1 = after.source.codeConnect || {};
  if (cc0.commit !== cc1.commit) lines.push("Code Connect do Flutter: `" + (cc0.commit || "—") + "` → `" + (cc1.commit || "—") + "` (" + (cc1.nodes || 0) + " nodes).");
  Object.keys(after.summary).forEach((k) => { if (before.summary[k] !== after.summary[k]) lines.push("Cobertura · " + k + ": " + before.summary[k] + " → " + after.summary[k] + "."); });
  const bk = new Set(before.items.map(key)), ak = new Set(after.items.map(key));
  after.items.filter((f) => !bk.has(key(f))).forEach((f) => lines.push("🆕 " + LV[f.l] + " · " + f.id + " · " + f.m));
  before.items.filter((f) => !ak.has(key(f))).forEach((f) => lines.push("✅ resolvido · " + f.id + " · " + f.m));
  const ab = new Set(((before.assets || {}).items || []).map((i) => i.t + "|" + i.m));
  ((after.assets || {}).items || []).filter((i) => !ab.has(i.t + "|" + i.m)).forEach((i) => lines.push("🆕 " + LV[i.l] + " · assets · " + i.m));
  (after.assets.rows || []).forEach((r) => { const o = ((before.assets || {}).rows || []).find((x) => x.pkg === r.pkg); if (o && o.version !== r.version) lines.push("Pacote " + r.pkg + ": " + o.version + " → " + r.version + "."); });
}
if (dartAfter){
  const dk = (e) => e.id + "|" + e.variant + "|" + e.code + "|" + e.message;
  const db = new Set(((dartBefore || {}).issues || []).map(dk)), da = new Set(dartAfter.issues.map(dk));
  if (!dartBefore) lines.push("Dart \"No Flutter\": primeira validação com o dart analyze · " + dartAfter.snippets + " trechos · " + dartAfter.errors + " erros.");
  dartAfter.issues.filter((e) => !db.has(dk(e))).forEach((e) => lines.push("🆕 Dart não compila · " + e.id + " " + e.variant + " · " + e.code + ": " + e.message));
  ((dartBefore || {}).issues || []).filter((e) => !da.has(dk(e))).forEach((e) => lines.push("✅ Dart resolvido · " + e.id + " " + e.variant + " · " + e.code + ": " + e.message));
}

const today = new Date(), d = [today.getDate(), today.getMonth() + 1, today.getFullYear()].map((n) => String(n).padStart(2, "0")).join("/");
const net = fetched ? "" : " (sem rede: comparado com as refs locais do clone)";
if (before && !lines.length){
  try { run("git", ["-C", ROOT, "checkout", "--"].concat(OUT), { stdio: "pipe" }); } catch (e) {}
  const lv = after.levels || {};
  const dj = dartNote ? " · " + dartNote : dartAfter ? " · Dart: " + dartAfter.snippets + " trechos, " + dartAfter.errors + " erros" : "";
  console.log("SEM MUDANÇAS na integração com o castanha_flutter" + net + " · staging " + after.source.commit + " · check: " + (lv.alta || 0) + " alta, " + (lv.media || 0) + " média, " + (lv.info || 0) + " informativo" + dj + ".");
  process.exit(0);
}

// 4 · histórico (mais recente no topo; guarda as 60 últimas leituras com mudança)
const HIST = path.join(ROOT, "integration", "flutter", "HISTORICO.md");
const top = "# Histórico da integração com o castanha_flutter\n\nEscrito por `scripts/integration/daily-flutter.js` (rotina diária): só entram as leituras em que algo mudou.\n\n";
const old = fs.existsSync(HIST) ? fs.readFileSync(HIST, "utf8").replace(/^#[^\n]*\n+(Escrito[^\n]*\n+)?/, "") : "";
const entries = old.split(/\n(?=### )/).filter((x) => x.trim()).slice(0, 59);
const entry = "### " + d + " · staging `" + after.source.commit + "`" + net + "\n\n" + lines.map((l) => "- " + l).join("\n") + "\n";
fs.writeFileSync(HIST, top + [entry].concat(entries).join("\n").trim() + "\n");
try { build(); } catch (e){ console.error("Falha no build-flutter-manifest:\n" + (e.stderr || e.message)); process.exit(1); }
console.log("MUDANÇAS na integração com o castanha_flutter" + net + ":\n" + lines.map((l) => "- " + l).join("\n") + (dartNote ? "\n- (" + dartNote + ")" : ""));
