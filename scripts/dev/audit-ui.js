#!/usr/bin/env node
/**
 * Auditoria da UI do playground (D69 · docs/PLANO-UI-DS.md): o que ainda não é componente do DS ou token.
 *   node scripts/dev/audit-ui.js
 *
 * 1. CSS da casca (styles/playground.css · docs.css · report.css): valores crus fora de comentário e de @media
 *    (px, #hex, rgb/rgba, duração em s/ms, font com tamanho cru, cubic-bezier).
 * 2. JS da casca (app · kit · docs-kit · report) e playgrounds/docs: controles HTML criados à mão
 *    (button, input, select, textarea, details/summary) — devem ser componentes do DS.
 * 3. Estilos inline dos playgrounds com px crus em padding/margin/gap/raio (largura/altura de specimen é exceção).
 * Sai com código 1 se achar algo fora das exceções conhecidas (listadas em EXCEPTIONS, com o motivo).
 */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const rel = (f) => path.relative(ROOT, f);
const read = (f) => fs.readFileSync(f, "utf8");

// Exceções conhecidas (C83 · C87): mantidas de propósito
const EXCEPTIONS = [
  { file: /styles\/.*\.css$/, re: /@media/, why: "breakpoint: CSS não aceita var() em @media (C83)" },
  { file: /styles\/docs\.css$/, re: /--pg-cover-bg:#f7f3ed/, why: "fundo decorativo da capa = hex do [Header] do Figma, sem token (Gustavo, C91)" },
  { file: /scripts\/docs-kit\.js$/, re: /el\("(button)", "pg-doc-icons__tile/, why: "tile de galeria clicável (C87)" },
  { file: /scripts\/docs-kit\.js$/, re: /el\("button", "pg-doc-icons__tile/, why: "tile de galeria clicável (C87)" },
  { file: /scripts\/docs-kit\.js$/, re: /el\("button", "pg-doc-palette__sw/, why: "amostra da paleta de ilustração, copia o hex (C87 · C110)" },
  { file: /scripts\/tokens-kit\.js$/, re: /el\("button", "pg-tok-tile/, why: "tile do mostruário de tokens, copia a variável (C87)" },
  { file: /scripts\/report\.js$/, re: /el\(d\.href \? "a" : "div", "rp-bar"\)/, why: "linha de gráfico clicável (C87)" },
];
const isException = (file, line) => EXCEPTIONS.some((e) => e.file.test(file) && e.re.test(line));

const findings = [];
function add(kind, file, n, line){ findings.push({ kind, file: rel(file), n, line: line.trim().slice(0, 140) }); }

// 1. CSS
const RAW_CSS = [
  [/(?<![\w-])\d*\.?\d+px\b/, "px cru"], [/#[0-9a-fA-F]{3,8}\b/, "cor hex"], [/\brgba?\(/, "rgb/rgba"],
  [/(?<![\w-])\d*\.?\d+m?s\b/, "duração crua"], [/font:\s*\d/, "font cru"], [/cubic-bezier\(/, "easing cru"],
];
for (const f of ["styles/playground.css", "styles/docs.css", "styles/report.css"].map((p) => path.join(ROOT, p))){
  let inComment = false;
  read(f).split("\n").forEach((raw, i) => {
    let line = raw;
    if (inComment){ const e = line.indexOf("*/"); if (e < 0) return; line = line.slice(e + 2); inComment = false; }
    line = line.replace(/\/\*.*?\*\//g, "");
    const s = line.indexOf("/*"); if (s >= 0){ inComment = true; line = line.slice(0, s); }
    if (isException(rel(f), line)) return;
    RAW_CSS.forEach(([re, kind]) => { if (re.test(line)) add("CSS · " + kind, f, i + 1, raw); });
  });
}

// 2. Controles HTML à mão
const JS = ["scripts/app.js", "scripts/playground-kit.js", "scripts/docs-kit.js", "scripts/tokens-kit.js", "scripts/report.js"].map((p) => path.join(ROOT, p));
const comps = fs.readdirSync(path.join(ROOT, "components"));
comps.forEach((c) => ["playground", "docs"].forEach((k) => { const f = path.join(ROOT, "components", c, `${c}.${k}.js`); if (fs.existsSync(f)) JS.push(f); }));
const RAW_CTRL = /(?:createElement|kit\.el|\bel)\(\s*"(button|input|select|textarea|details|summary)"/;
JS.forEach((f) => read(f).split("\n").forEach((line, i) => {
  if (RAW_CTRL.test(line) && !isException(rel(f), line)) add("HTML à mão · " + line.match(RAW_CTRL)[1], f, i + 1, line);
}));

// 3. Inline com px cru em espaçamento/raio nos playgrounds
JS.filter((f) => /components\//.test(f)).forEach((f) => read(f).split("\n").forEach((line, i) => {
  const m = line.match(/style:\s*"([^"]*)"/); if (!m) return;
  if (/(padding|margin|gap|border-radius)\s*:[^;]*\d+px/.test(m[1])) add("inline · espaço/raio cru", f, i + 1, line);
}));

if (!findings.length){ console.log("✅ UI do playground: nenhum valor cru nem controle feito à mão fora das exceções (" + EXCEPTIONS.length + " exceções conhecidas)."); process.exit(0); }
const by = {}; findings.forEach((x) => (by[x.kind] = by[x.kind] || []).push(x));
Object.keys(by).sort().forEach((k) => { console.log(`\n${k} (${by[k].length})`); by[k].forEach((x) => console.log(`  ${x.file}:${x.n}  ${x.line}`)); });
console.log(`\n${findings.length} achado(s).`);
process.exit(1);
