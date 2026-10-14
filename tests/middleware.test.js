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
// Redis de mentira (registro dos links): hash em memória, no formato do pipeline do Upstash
const H = {};
const fakeFetch = async (u, o) => new Response(JSON.stringify(JSON.parse(o.body).map(([c, k, ...a]) => {
  const h = H[k] = H[k] || {};
  if (c === "HSET"){ h[a[0]] = a[1]; return { result: 1 }; }
  if (c === "HMGET") return { result: a.map((f) => f in h ? h[f] : null) };
  if (c === "HGETALL") return { result: Object.keys(h).flatMap((f) => [f, h[f]]) };
  if (c === "HDEL") return { result: a.filter((f) => f in h && delete h[f]).length };
  return { error: "comando " + c };
})));
const ctx = { exports: {}, process: { env }, Buffer, TextEncoder, crypto: globalThis.crypto, Response, Headers, URL, JSON, Date, String, Math, Object, decodeURIComponent, encodeURIComponent, fetch: fakeFetch };
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

  // Ranking do time do Castanha Quiz (api/ranking.mjs): quem entrou lê e grava, o Visitante não
  r = await mw(new Request(BASE + "/api/ranking", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }));
  confere("Visitante não grava no ranking do time", r.status === 401, String(r.status));
  confere("Completo e Portal abrem o ranking do time", segue(await com("/api/ranking?board=geral", completo.cookie, { headers: { accept: "*/*" } })) && segue(await com("/api/ranking?board=geral", portal.cookie, { headers: { accept: "*/*" } })));

  // Links de entrega (fase 3): o portal em modo entrega, só com os itens e as docs da entrega
  const gerar = (c, body) => mw(new Request(BASE + "/acesso/links", { method: "POST", headers: { "content-type": "application/json", cookie: c }, body: JSON.stringify(body) }));
  r = await gerar(portal.cookie, { caminho: "/entregas/chips-small/", dias: 14 });
  confere("perfil Portal não gera link", r.status === 403, String(r.status));
  r = await gerar(completo.cookie, { caminho: "/docs/ROADMAP.md", dias: 14 });
  confere("link só para uma entrega", r.status === 400, String(r.status));
  r = await gerar(completo.cookie, { caminho: "/entregas/nao-existe/", dias: 14 });
  confere("link só para entrega que existe", r.status === 400, String(r.status));
  r = await gerar(completo.cookie, { caminho: "/entregas/chips-small/", dias: 91 });
  confere("validade acima de 90 dias dá 400", r.status === 400, String(r.status));
  r = await gerar(completo.cookie, { caminho: "/entregas/chips-small/", dias: 1.5 });
  confere("validade em dias quebrados dá 400", r.status === 400, String(r.status));
  r = await gerar(completo.cookie, { caminho: "/entregas/chips-small/", dias: 2 });
  const g2 = await r.json();
  confere("validade de 2 dias vale", r.status === 200 && Math.abs(new Date(g2.vence) - Date.now() - 2 * 864e5) < 6e4, r.status + " " + g2.vence);
  r = await gerar(completo.cookie, { caminho: "/entregas/chips-small/", dias: 14 });
  const gl = await r.json();
  confere("Completo gera link", r.status === 200 && /^https:\/\/portal\.test\/l\//.test(gl.link), JSON.stringify(gl));
  r = await mw(req(new URL(gl.link).pathname));
  const setL = r.headers.getSetCookie(), linkCookie = setL.map((c) => c.split(";")[0]).join("; ");
  confere("abrir o link leva ao portal e grava cds_links (HttpOnly) e cds_entrega", r.status === 302 && r.headers.get("location") === "/?entrega=chips-small" && setL.some((c) => /^cds_links=/.test(c) && /HttpOnly/.test(c)) && setL.some((c) => /^cds_entrega=chips-small;/.test(c) && !/HttpOnly/.test(c)), r.status + " " + setL.join(" | "));
  const doLink = (p, a) => mw(req(p, { headers: { cookie: linkCookie, accept: a || "*/*" } }));
  confere("com o link abre o portal", segue(await doLink("/", "text/html")));
  confere("com o link abre os dados da entrega", segue(await doLink("/entregas/chips-small/entrega.js")));
  confere("com o link abre a doc de um item", segue(await doLink("/components/input-chip/input-chip.docs.js")));
  confere("com o link abre o código dos componentes", segue(await doLink("/components/main-button/main-button.js")));
  confere("com o link abre o código React e Flutter", segue(await doLink("/scripts/react-kit.js")) && segue(await doLink("/scripts/flutter-kit.js")));
  r = await doLink("/api/ranking?board=geral");
  confere("o link não abre o ranking do time", r.status === 401, String(r.status));
  r = await doLink("/dist/mcp/catalog.json");
  confere("o link não abre o catálogo do MCP", r.status === 401, String(r.status));
  r = await doLink("/dist/cds.js?v=1");
  confere("com o link o dist/cds.js vira o pacote sem os recursos", r.headers.get("x-middleware-rewrite") === BASE + "/dist/cds-entrega.js?v=1", String(r.headers.get("x-middleware-rewrite")));
  r = await doLink("/components/main-button/main-button.docs.js");
  confere("o link não abre a doc de outro componente", r.status === 401, String(r.status));
  r = await doLink("/entregas/draggable-list/entrega.js");
  confere("o link não abre outra entrega", r.status === 401, String(r.status));
  r = await doLink("/dist/search.json");
  confere("o link não abre a busca no conteúdo", r.status === 401, String(r.status));
  r = await doLink("/docs/ROADMAP.md");
  confere("o link não abre os dados do Relatório", r.status === 401, String(r.status));
  r = await doLink("/resources/inicio/inicio.js");
  confere("o link não abre os recursos", r.status === 401, String(r.status));
  r = await doLink("/docs/roteiro/", "text/html");
  confere("o link não abre outras páginas", r.status === 302 && /^\/entrar\//.test(r.headers.get("location")), r.status + " " + r.headers.get("location"));
  r = await mw(req("/dist/cds.js", { headers: { cookie: completo.cookie, accept: "*/*" } }));
  confere("perfil continua com o pacote inteiro", segue(r) && !r.headers.get("x-middleware-rewrite"));
  r = await mw(req("/acesso/links/", { headers: { cookie: portal.cookie } }));
  confere("tela de gerar links fecha para o Portal", r.status === 403, String(r.status));
  confere("tela de gerar links abre para o Completo", segue(await mw(req("/acesso/links/", { headers: { cookie: completo.cookie } }))));
  const vencido = (() => { const d = Buffer.from(JSON.stringify({ c: "/entregas/chips-small/", e: Date.now() - 1000 })).toString("base64url"); return d + ".assinatura"; })();
  r = await mw(req("/l/" + vencido));
  confere("link vencido ou falso vai para a entrada com aviso", r.status === 302 && r.headers.get("location") === "/entrar/?link=vencido", r.headers.get("location"));
  const trocado = new URL(gl.link).pathname.slice(3).replace(/^[^.]+/, Buffer.from(JSON.stringify({ c: "/entregas/draggable-list/", e: Date.now() + 1e9 })).toString("base64url"));
  r = await mw(req("/l/" + trocado));
  confere("link com a entrega trocada não vale", r.status === 302 && r.headers.get("location") === "/entrar/?link=vencido", r.headers.get("location"));

  // Links de página (acesso/paginas): um alvo, registrado no banco, com revogação
  env.KV_REST_API_URL = "http://redis-teste"; env.KV_REST_API_TOKEN = "t";
  const post = (p, c, b) => mw(new Request(BASE + p, { method: "POST", headers: { "content-type": "application/json", cookie: c }, body: JSON.stringify(b) }));
  r = await post("/acesso/links", portal.cookie, { alvo: "pagina:castanha-quiz", dias: 14 });
  confere("Portal não gera link de página", r.status === 403, String(r.status));
  r = await post("/acesso/links", completo.cookie, { alvo: "pagina:nao-existe", dias: 14 });
  confere("alvo desconhecido não gera link", r.status === 400, String(r.status));
  r = await post("/acesso/links", completo.cookie, { alvo: "pagina:castanha-quiz", titulo: "Castanha Quiz", dias: 14 });
  const gp = await r.json();
  confere("Completo gera link de página registrado", r.status === 200 && gp.registrado === true && /\/l\//.test(gp.link), JSON.stringify(gp));
  r = await post("/acesso/links", completo.cookie, { alvo: "componente:main-button", titulo: "Main Button", dias: 7 });
  const gc = await r.json();
  r = await mw(req("/acesso/links/ativos", { headers: { cookie: completo.cookie, accept: "*/*" } }));
  const lista = await r.json();
  confere("a lista de ativos traz os dois links", lista.registro && lista.links.length === 2 && lista.links.every((l) => l.link && l.vence), JSON.stringify(lista).slice(0, 200));
  confere("a tela de links de página é do Completo", segue(await mw(req("/acesso/paginas/", { headers: { cookie: completo.cookie } }))) && (await mw(req("/acesso/paginas/", { headers: { cookie: portal.cookie } }))).status === 403);
  const abrir = async (link) => { const x = await mw(req(new URL(link).pathname)); return { r: x, c: x.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ") }; };
  let o = await abrir(gp.link);
  confere("abrir o link de página leva ao portal no alvo e grava cds_alvos", o.r.status === 302 && o.r.headers.get("location") === "/?alvo=pagina%3Acastanha-quiz" && /cds_alvos=pagina%3Acastanha-quiz/.test(o.c), o.r.headers.get("location") + " " + o.c);
  const comPg = (p, a) => mw(req(p, { headers: { cookie: o.c, accept: a || "*/*" } }));
  confere("com o link de página abre o portal e o arquivo da página", segue(await comPg("/", "text/html")) && segue(await comPg("/resources/castanha-quiz/castanha-quiz.js")) && segue(await comPg("/acesso/alvos.js")));
  confere("com o link de página o dist/cds.js vira o pacote sem as páginas", (await comPg("/dist/cds.js")).headers.get("x-middleware-rewrite") === BASE + "/dist/cds-entrega.js");
  r = await comPg("/resources/treinamento/treinamento.js"); confere("o link de página não abre outra página", r.status === 401, String(r.status));
  r = await comPg("/components/main-button/main-button.docs.js"); confere("o link de página não abre a doc de um componente", r.status === 401, String(r.status));
  confere("o link do Quiz lê e grava no ranking do time", segue(await comPg("/api/ranking?board=geral")) && segue(await mw(new Request(BASE + "/api/ranking", { method: "POST", headers: { cookie: o.c, "content-type": "application/json" }, body: "{}" }))));
  // os dois links no mesmo navegador; revogado um, ele para na hora e a página limpa os cookies
  const o2 = await mw(req(new URL(gc.link).pathname, { headers: { cookie: o.c } }));
  const dois = o2.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
  const soMb = (await mw(req(new URL(gc.link).pathname))).headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
  r = await mw(req("/api/ranking?board=geral", { headers: { cookie: soMb, accept: "*/*" } }));
  confere("link sem o Quiz não abre o ranking do time", r.status === 401, String(r.status));
  confere("com os dois links abre a doc do componente", segue(await mw(req("/components/main-button/main-button.docs.js", { headers: { cookie: dois, accept: "*/*" } }))));
  const idMb = lista.links.filter((l) => l.alvo === "componente:main-button")[0].id;
  r = await post("/acesso/links/revogar", completo.cookie, { id: idMb });
  confere("Completo revoga o link", r.status === 200 && (await r.json()).revogado === true);
  r = await mw(req("/components/main-button/main-button.docs.js", { headers: { cookie: dois, accept: "*/*" } }));
  confere("revogado, o link para de abrir o conteúdo na hora", r.status === 401, String(r.status));
  r = await mw(req("/", { headers: { cookie: dois } }));
  const limpo = r.headers.getSetCookie().join(" | ");
  confere("a página tira dos cookies o link revogado", r.status === 302 && /cds_alvos=pagina%3Acastanha-quiz;/.test(limpo), r.status + " " + limpo);
  r = await mw(req(new URL(gc.link).pathname));
  confere("link revogado vai para a entrada com aviso", r.status === 302 && r.headers.get("location") === "/entrar/?link=vencido", r.headers.get("location"));
  r = await post("/acesso/links/revogar", portal.cookie, { id: idMb });
  confere("Portal não revoga link", r.status === 403, String(r.status));

  // Sem segredo configurado: ninguém entra
  env.ACESSO_SEGREDO = "";
  r = await entrar("111111"); confere("sem ACESSO_SEGREDO a entrada responde 503", r.status === 503, String(r.status));

  if (falhas){ console.error("❌ Middleware: " + falhas + " falha(s), " + ok + " ok"); process.exit(1); }
  console.log("✅ Middleware: " + ok + " verificações ok (Visitante, Completo, Portal, MCP, ranking, links de entrega, links de página e revogação, cookie adulterado, sair)");
})().catch((e) => { console.error(e); process.exit(1); });
