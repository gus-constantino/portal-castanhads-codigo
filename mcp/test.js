#!/usr/bin/env node
/**
 * Teste do MCP do Castanha DS: sobe mcp/server.js por stdio, faz o handshake como um cliente MCP e chama
 * cada ferramenta, resource e prompt com perguntas reais. Falha (código 1) se algo vier vazio ou com erro.
 *   node mcp/test.js            resumo
 *   node mcp/test.js --verbose  mostra o começo de cada resposta
 */
"use strict";
const { spawn } = require("child_process"), path = require("path");
const VERBOSE = process.argv.includes("--verbose");
const srv = spawn(process.execPath, [path.join(__dirname, "server.js")], { stdio: ["pipe", "pipe", "inherit"] });
let buf = "", next = 1; const wait = {};
srv.stdout.on("data", (d) => { buf += d; let i; while ((i = buf.indexOf("\n")) >= 0){ const line = buf.slice(0, i); buf = buf.slice(i + 1); if (!line.trim()) continue; const m = JSON.parse(line); if (wait[m.id]){ wait[m.id](m); delete wait[m.id]; } } });
const rpc = (method, params) => new Promise((res) => { const id = next++; wait[id] = res; srv.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n"); });
const fails = []; let n = 0;
function expect(name, cond, detail){ n++; if (!cond) fails.push(name + (detail ? ": " + detail : "")); }

const CALLS = [
  ["listar_componentes", {}, /Buttons[\s\S]*Main Button/],
  ["listar_componentes", { categoria: "Text Fields" }, /Text Input/],
  ["componente", { nome: "Tag" }, /castanha-react[\s\S]*import \{ Tag \}/],
  ["componente", { nome: "Button" }, /Main Button/],              // pelo nome do React
  ["componente", { nome: "main-button" }, /Figma → React/],
  ["componente", { nome: "tagg" }, /Parecidos: .*tag/],            // erro amigável com sugestão
  ["docs", { nome: "tag", tab: "acessibilidade" }, /Acessibilidade/],
  ["docs", { nome: "conteudo" }, /Vocabulário/i],
  ["buscar", { texto: "filtro" }, /Filter/],
  ["buscar", { texto: "cartão" }, /Ícones|Ilustrações/],
  ["tokens", { busca: "text-intense" }, /--castanha-colors-text-intense/],
  ["tokens", { grupo: "grids" }, /desktop 104px/],
  ["tokens", { busca: "motion-hover" }, /só no playground/],
  ["icone", { busca: "menu" }, /MenuLine/],
  ["ilustracao", { busca: "pet" }, /hub-pet/],
  ["diretrizes", {}, /Conteúdo/],
  ["diretrizes", { tema: "formatação de dados" }, /Formatação/i],
  ["divergencias", {}, /CONFERIR/],
  ["divergencias", { nome: "topic" }, /Check da stack[\s\S]*alta/]
];

(async () => {
  const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "teste", version: "1" } });
  expect("initialize", init.result && init.result.serverInfo.name === "castanha-ds");
  srv.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
  const tl = await rpc("tools/list", {});
  expect("tools/list", tl.result && tl.result.tools.length === 9, tl.result && tl.result.tools.length + " ferramentas");
  for (const [name, args, re] of CALLS){
    const r = await rpc("tools/call", { name, arguments: args }), text = r.result && r.result.content[0].text || "";
    expect(name + " " + JSON.stringify(args), r.result && !r.result.isError && re.test(text), text.slice(0, 160).replace(/\n/g, " "));
    if (VERBOSE) console.log("\n▶ " + name + " " + JSON.stringify(args) + "\n" + text.slice(0, 500));
  }
  const rl = await rpc("resources/list", {});
  expect("resources/list", rl.result && rl.result.resources.length > 100);
  const rr = await rpc("resources/read", { uri: "castanha://docs/tag/uso" });
  expect("resources/read", rr.result && /Tag · Uso/.test(rr.result.contents[0].text));
  const pl = await rpc("prompts/list", {});
  expect("prompts/list", pl.result && pl.result.prompts.length === 3);
  const pg = await rpc("prompts/get", { name: "implementar-tela", arguments: { descricao: "tela de login" } });
  expect("prompts/get", pg.result && /tela de login/.test(pg.result.messages[0].content.text));
  const bad = await rpc("metodo/inexistente", {});
  expect("método desconhecido", bad.error && bad.error.code === -32601);
  srv.kill();
  if (fails.length){ console.error("❌ MCP: " + fails.length + " de " + n + " falharam\n- " + fails.join("\n- ")); process.exit(1); }
  console.log("✅ MCP: " + n + " verificações ok (9 ferramentas, resources e prompts)");
})();
