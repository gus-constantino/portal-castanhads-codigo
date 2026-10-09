#!/usr/bin/env node
/**
 * M3 · Arquivo único do MCP do Castanha DS: dist/mcp/castanha-mcp.js (docs/local/PLANO-MCP.md).
 *
 *   node scripts/mcp/bundle.js     (também roda no fim do scripts/build-index.js)
 *
 * Junta mcp/server.js + mcp/react.js + o núcleo do scripts/react-kit.js num arquivo sem dependências que roda sozinho:
 *   - baixado do site (Pages) e apontado no Claude/Cursor: `node castanha-mcp.js` (stdio) ou `node castanha-mcp.js --http 8787`;
 *     o catálogo vem do site, ou do catalog.json ao lado quando existir (dentro do repo);
 *   - importado por uma plataforma serverless: exporta `handleRequest(Request) → Response` (handler `fetch`).
 * Sem `vm` e sem ler outros arquivos: o react-kit entra como função, com `window`/`document` locais.
 * Determinístico (sem data), para a CI comparar o build commitado.
 */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "dist", "mcp", "castanha-mcp.js");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const strip = (src) => src.replace(/^#!.*\n/, "");

function build(){
  const kit = read("scripts/react-kit.js"), react = strip(read("mcp/react.js")), server = strip(read("mcp/server.js"));
  const fkit = read("scripts/flutter-kit.js"), flutter = strip(read("mcp/flutter.js"));
  return `#!/usr/bin/env node
/* MCP do Castanha DS · arquivo único · GERADO por scripts/mcp/build-catalog.js + scripts/mcp/bundle.js · não editar à mão
 * Fontes: mcp/server.js, mcp/react.js, mcp/flutter.js e os núcleos de scripts/react-kit.js e scripts/flutter-kit.js (repo gus-constantino/portal-castanhads).
 * Uso (Node 18+, sem instalar nada):
 *   node castanha-mcp.js               stdio: Claude Code (claude mcp add castanha-ds -- node /caminho/castanha-mcp.js), Claude Desktop, Cursor
 *   node castanha-mcp.js --http 8787   HTTP: http://127.0.0.1:8787/mcp
 * Catálogo: CASTANHA_CATALOG (arquivo ou URL) · catalog.json ao lado deste arquivo · o publicado no site.
 * Em plataforma serverless: require/import e use handleRequest(request) como handler fetch.
 */
"use strict";
(function(){
  // núcleo puro do react-kit (gerar JSX), com window/document locais: não toca no ambiente
  globalThis.__CASTANHA_REACT_KIT__ = function(){
    var window = { CDS: {} }, document = {}, MutationObserver = null;
${kit.split("\n").map((l) => "    " + l).join("\n")}
    return window.CDS.reactCore;
  };
  // núcleo puro do flutter-kit (gerar Dart), com window/document locais
  globalThis.__CASTANHA_FLUTTER_KIT__ = function(){
    var window = { CDS: {} }, document = {}, MutationObserver = null;
${fkit.split("\n").map((l) => "    " + l).join("\n")}
    return window.CDS.flutterCore;
  };
  var MODS = {
    "./react": function(module, exports, require){
${react.split("\n").map((l) => "      " + l).join("\n")}
    },
    "./flutter": function(module, exports, require){
${flutter.split("\n").map((l) => "      " + l).join("\n")}
    },
    "./server": function(module, exports, require){
${server.split("\n").map((l) => "      " + l).join("\n")}
    }
  }, cache = {}, nodeRequire = typeof require === "function" ? require : null;
  function req(name){
    if (MODS[name]){ if (!cache[name]){ var m = { exports: {} }; cache[name] = m; MODS[name](m, m.exports, req); } return cache[name].exports; }
    return nodeRequire ? nodeRequire(name) : {}; // módulos do Node (fs, path, http, readline) quando houver
  }
  var api = req("./server");
  if (typeof module !== "undefined" && module.exports) module.exports = api; else globalThis.CastanhaMCP = api;
  if (nodeRequire && typeof module !== "undefined" && nodeRequire.main === module) api.main();
})();
`;
}
/** Grava dist/mcp/castanha-mcp.js só se mudou. Retorna { changed, bytes }. */
function write(){
  const out = build(), cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (cur !== out){ fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, out); }
  return { changed: cur !== out, bytes: Buffer.byteLength(out) };
}
module.exports = { build, write };
if (require.main === module){ const r = write(); console.log("MCP arquivo único: dist/mcp/castanha-mcp.js" + (r.changed ? " (atualizado)" : " (sem mudança)") + " · " + Math.round(r.bytes / 1024) + " KB"); }
