#!/usr/bin/env node
/**
 * Teste do MCP do Castanha DS: sobe mcp/server.js por stdio, faz o handshake como um cliente MCP e chama
 * cada ferramenta, resource e prompt com perguntas reais. Falha (código 1) se algo vier vazio ou com erro.
 *   node mcp/test.js            resumo
 *   node mcp/test.js --verbose  mostra o começo de cada resposta
 *   node mcp/test.js --server dist/mcp/castanha-mcp.js   testa o arquivo único
 */
"use strict";
const { spawn } = require("child_process"), path = require("path");
const VERBOSE = process.argv.includes("--verbose");
// --server <arquivo>: testa outro servidor (ex.: o arquivo único dist/mcp/castanha-mcp.js)
const SERVER = process.argv.indexOf("--server") > 0 ? path.resolve(process.argv[process.argv.indexOf("--server") + 1]) : path.join(__dirname, "server.js");
const srv = spawn(process.execPath, [SERVER], { stdio: ["pipe", "pipe", "inherit"] });
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
  ["divergencias", { nome: "topic" }, /Check da stack[\s\S]*alta/],
  // M2 · gerar_jsx: props do Figma → JSX do castanha-react
  ["gerar_jsx", { nome: "main-button", props_figma: { "Appearance": "Inversed", "Show Lead Icon": false, "Show Trailing Icon": false, "Text Label": "Salvar", "State": "Disabled" } }, /<Button appearance="inverted" disabled>Salvar<\/Button>/],
  ["gerar_jsx", { nome: "Tag", props_figma: { "Appearance": "Positive", "Text Label": "Aprovado", "Show Lead Item": false } }, /<Tag appearance="positive">Aprovado<\/Tag>/],
  ["gerar_jsx", { nome: "text-input", props_figma: { "Appearance": "Warning", "Error Message": "CPF inválido", "Text Label": "CPF" } }, /error[\s\S]*supportingMessage="CPF inválido"/],
  ["gerar_jsx", { nome: "fixed-tab", props_figma: { "Active Item": "2" }, itens: [{ label: "Resumo" }, { label: "Extrato" }] }, /useState\('item-2'\)[\s\S]*Extrato/],
  ["gerar_jsx", { nome: "chips-group", props_figma: { "Kind": "Filter Chips" }, itens: 2 }, /Chips\.Filter/],
  ["gerar_jsx", { nome: "tag", props_figma: { "Appearance": "Roxo" } }, /não é opção no Figma/],
  // M2 · revisar_codigo
  ["revisar_codigo", { codigo: "import { Button, TextInput } from '@caju-beneficios/castanha-react';\n<Button appearance=\"primary\" variant=\"ghost\" leadIcon=\"seta\">Ok</Button>\n<TextInput lable=\"CPF\" error=\"inválido\" />\n<div style={{ color: '#1a1a1a', padding: '16px' }} />" },
    /appearance="primary"[\s\S]*variant[\s\S]*seta[\s\S]*lable[\s\S]*supportingMessage[\s\S]*colors-text-intense[\s\S]*sizes-16/],
  ["revisar_codigo", { codigo: "import { Tag } from '@caju-beneficios/castanha-react';\n<Tag appearance=\"positive\">Ok</Tag>" }, /Nenhum problema/]
];

(async () => {
  const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "teste", version: "1" } });
  expect("initialize", init.result && init.result.serverInfo.name === "castanha-ds");
  srv.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
  const tl = await rpc("tools/list", {});
  expect("tools/list", tl.result && tl.result.tools.length === 11, tl.result && tl.result.tools.length + " ferramentas");
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
  // cruzamento: o JSX gerado de cada mapa curado passa sem erro na revisão
  const R = require("./react.js"), S = require("./server.js"), cat = await S.catalog();
  const ids = Object.keys(cat.reactData.items).filter((i) => cat.reactData.items[i].map), bads = [];
  for (const id of ids){ const out = await R.generate(cat, cat.components.find((x) => x.id === id), {}), code = (out.match(/```tsx\n([\s\S]*?)```/) || [])[1] || "";
    if (!code || R.review(cat, code).findings.some((f) => f.lv === "alta")) bads.push(id); }
  expect("gerar → revisar (" + ids.length + " mapas)", ids.length >= 70 && !bads.length, bads.join(", "));
  const bad = await rpc("metodo/inexistente", {});
  expect("método desconhecido", bad.error && bad.error.code === -32601);
  srv.kill();
  if (fails.length){ console.error("❌ MCP: " + fails.length + " de " + n + " falharam\n- " + fails.join("\n- ")); process.exit(1); }
  console.log("✅ MCP" + (SERVER.endsWith("server.js") ? "" : " (" + path.basename(SERVER) + ")") + ": " + n + " verificações ok (11 ferramentas, resources, prompts e o cruzamento gerar → revisar dos mapas)");
})();
