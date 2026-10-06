#!/usr/bin/env node
/**
 * Gera a imagem de preview do link (og:image) a partir de scripts/dev/og/og.html, no Chrome headless.
 *   node scripts/dev/og-image.js   → assets/brand/og-image.png (1360×680)
 * Rodar de novo quando a capa, o tema ou o texto mudarem. Precisa de Chrome e de rede (fontes do Google), fora do sandbox.
 * O index.html aponta para a imagem publicada no Pages (og:image e twitter:image, URL absoluta).
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const SRC = path.join(__dirname, "og", "og.html");
const OUT = path.join(ROOT, "assets", "brand", "og-image.png");
const chrome = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean).find((p) => fs.existsSync(p));
if (!chrome){ console.error("Chrome não encontrado (defina CHROME=/caminho)."); process.exit(2); }

const r = spawnSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
  "--window-size=1360,680", "--virtual-time-budget=8000", "--screenshot=" + OUT, "file://" + SRC], { encoding: "utf8" });
if (r.status !== 0 || !fs.existsSync(OUT)){ console.error("Falhou ao gerar a imagem:\n" + (r.stderr || "")); process.exit(1); }
console.log("✅ Preview do link: " + path.relative(ROOT, OUT) + " (" + Math.round(fs.statSync(OUT).size / 1024) + " KB)");
