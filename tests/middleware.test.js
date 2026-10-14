#!/usr/bin/env node
/**
 * Teste do middleware.js (acesso no Vercel, docs/PLANO-ACESSO.md) sem o Vercel: carrega o arquivo, simula as
 * variáveis de ambiente com códigos de teste e confere o que cada perfil abre.
 *   node tests/middleware.test.js
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const src = fs.readFileSync(path.join(__dirname, "..", "middleware.js"), "utf8")
  .replace(/^export const config\s*=/m, "exports.config =")
  .replace(/^export default async function middleware/m, "exports.default = async function middleware");
const env = { ACESSO_SEGREDO: "segredo-de-teste", ACESSO_COMPLETO: "111111", ACESSO_PORTAL: "222222", ACESSO_MCP: "chave-de-teste" };
const ctx = { exports: {}, process: { env }, Buffer, TextEncoder, crypto: globalThis.crypto, Response, Headers, URL, JSON, Date, String, Math, Object, decodeURIComponent, encodeURIComponent };
vm.createContext(ctx); vm.runInContext(src, ctx, { filename: "middleware.js" });
const mw = ctx.exports.default;

const BASE = "https://portal.test";
const req = (p, o) => { o = o || {}; return new Request(BASE + p, Object.assign({}, o, { headers: Object.assign({ accept: "text/html" }, o.headers || {}) })); };
const segue = (r) => r.headers.get("x-middleware-next") === "1";
let falhas = 0, ok = 0;
function confere(nome, cond, extra){ if (cond) ok++; else { falhas++; console.error("❌ " + nome + (extra ? " · " + extra : "")); } }

(async () => {
  // Visitante
  for (const p of ["/docs/pitch/", "/docs/pitch", "/docs/pitch/dados.json", "/entrar/", "/dist/cds-publico.js", "/styles/tokens.css", "/assets/brand/avatar-photo.jpg", "/scripts/cds-element.js"])
    confere("visitante abre " + p, segue(await mw(req(p))));
  let r = await mw(req("/"));
  confere("visitante em / vai para a entrada", r.status === 302 && r.headers.get("location") === "/entrar/", r.status + " " + r.headers.get("location"));
  r = await mw(req("/docs/roteiro/"));
  confere("visitante no Roteiro vai para a entrada com volta", r.status === 302 && r.headers.get("location") === "/entrar/?volta=%2Fdocs%2Froteiro%2F", r.headers.get("location"));
  r = await mw(req("/docs/ROADMAP.md", { headers: { accept: "*/*" } }));
  confere("visitante não lê o ROADMAP", r.status === 401, String(r.status));
  r = await mw(req("/dist/cds.js", { headers: { accept: "*/*" } }));
  confere("visitante não lê o pacote completo", r.status === 401, String(r.status));
  r = await mw(req("/dist/search.json", { headers: { accept: "*/*" } }));
  confere("visitante não lê a busca", r.status === 401, String(r.status));

  // Entrar
  const entrar = (codigo) => mw(new Request(BASE + "/acesso/entrar", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ codigo }) }));
  r = await entrar("999999"); confere("código errado dá 401", r.status === 401, String(r.status));
  r = await entrar("12ab"); confere("código fora do formato dá 400", r.status === 400, String(r.status));
  const sessao = async (codigo) => {
    const x = await entrar(codigo), set = x.headers.getSetCookie ? x.headers.getSetCookie() : [x.headers.get("set-cookie")];
    return { status: x.status, body: await x.json(), cookie: set.map((c) => c.split(";")[0]).join("; "), set };
  };
  const completo = await sessao("111111"), portal = await sessao("222222");
  confere("código Completo entra", completo.status === 200 && completo.body.perfil === "completo", JSON.stringify(completo.body));
  confere("cookie de acesso é HttpOnly e Secure", completo.set.some((c) => /^cds_acesso=.+HttpOnly.+Secure/.test(c) || (/^cds_acesso=/.test(c) && /HttpOnly/.test(c) && /Secure/.test(c))));
  confere("código Portal entra", portal.status === 200 && portal.body.perfil === "portal", JSON.stringify(portal.body));
  const com = (p, c, o) => mw(req(p, { headers: Object.assign({ cookie: c }, (o || {}).headers || {}) }));

  // Completo
  for (const p of ["/", "/index.html", "/docs/ROADMAP.md", "/docs/tendencia.json", "/integration/SAUDE-STACK.md", "/dist/cds.js", "/docs/roteiro/", "/dist/mcp/catalog.json"])
    confere("Completo abre " + p, segue(await com(p, completo.cookie)));
  r = await mw(req("/acesso/perfil", { headers: { cookie: completo.cookie } }));
  confere("perfil do Completo", (await r.json()).perfil === "completo");

  // Portal
  for (const p of ["/", "/dist/cds.js", "/docs/roteiro/", "/components/tag/tag.docs.js", "/dist/search.json", "/integration/react-data.js"])
    confere("Portal abre " + p, segue(await com(p, portal.cookie)));
  for (const p of ["/docs/ROADMAP.md", "/docs/CONFERIR.md", "/docs/SAUDE-TECNICA.md", "/docs/tendencia.json", "/integration/SAUDE-STACK.md", "/integration/flutter/SAUDE-STACK.md", "/integration/jsx-check.json", "/integration/flutter/dart-check.json"]){
    r = await com(p, portal.cookie, { headers: { accept: "*/*" } });
    confere("Portal não abre " + p, r.status === 403, String(r.status));
  }

  // Cookie adulterado ou vencido
  const falso = completo.cookie.replace(/cds_acesso=([^.]+)\.(\S+)/, (m, d, s) => "cds_acesso=" + d + "." + s.slice(0, -2) + "xx");
  r = await com("/docs/ROADMAP.md", falso, { headers: { accept: "*/*" } });
  confere("assinatura adulterada não entra", r.status === 401, String(r.status));
  const outroPerfil = completo.cookie.replace(/cds_acesso=([^.]+)\./, (m, d) => "cds_acesso=" + Buffer.from(JSON.stringify({ p: "completo", e: Date.now() + 1e9 })).toString("base64url") + ".");
  r = await com("/docs/ROADMAP.md", outroPerfil, { headers: { accept: "*/*" } });
  confere("dados trocados com a assinatura antiga não entram", r.status === 401, String(r.status));

  // MCP
  r = await mw(req("/dist/mcp/catalog.json", { headers: { accept: "*/*" } }));
  confere("MCP sem chave dá 401", r.status === 401, String(r.status));
  confere("MCP com a chave abre o catálogo", segue(await mw(req("/dist/mcp/catalog.json", { headers: { accept: "*/*", authorization: "Bearer chave-de-teste" } }))));
  confere("MCP com a chave abre o react-kit", segue(await mw(req("/scripts/react-kit.js", { headers: { accept: "*/*", authorization: "Bearer chave-de-teste" } }))));
  r = await mw(req("/dist/mcp/catalog.json", { headers: { accept: "*/*", authorization: "Bearer errada" } }));
  confere("MCP com chave errada dá 401", r.status === 401, String(r.status));

  // Sair
  r = await mw(req("/acesso/sair", { headers: { cookie: completo.cookie } }));
  confere("sair apaga os cookies e vai para a entrada", r.status === 302 && r.headers.get("location") === "/entrar/" && /Max-Age=0/.test(r.headers.get("set-cookie") || ""));

  // Sem segredo configurado: ninguém entra
  env.ACESSO_SEGREDO = "";
  r = await entrar("111111"); confere("sem ACESSO_SEGREDO a entrada responde 503", r.status === 503, String(r.status));

  if (falhas){ console.error("❌ Middleware: " + falhas + " falha(s), " + ok + " ok"); process.exit(1); }
  console.log("✅ Middleware: " + ok + " verificações ok (Visitante, Completo, Portal, MCP, cookie adulterado, sair)");
})().catch((e) => { console.error(e); process.exit(1); });
