/**
 * Acesso ao portal no Vercel (docs/PLANO-ACESSO.md, fase 2). Roda antes de cada arquivo ser entregue.
 * No GitHub Pages e no servidor local este arquivo não roda: lá o portal continua aberto como sempre.
 *
 * Perfis
 *   Visitante (sem código) · o pitch, a tela de entrada e os arquivos que eles carregam
 *   Completo  (ACESSO_COMPLETO) · tudo
 *   Portal    (ACESSO_PORTAL)   · tudo, menos o Relatório e os dados dele
 *   MCP       (ACESSO_MCP no cabeçalho Authorization: Bearer …) · o catálogo e os núcleos de código do MCP
 *   Entrega   (fase 3) · /l/<código> abre o portal em modo entrega: só as páginas dos itens de uma entrega para dev
 *             (entregas/<slug>/entrega.json), com as docs deles, por 7, 14 ou 30 dias, sem código
 *
 * Variáveis de ambiente do projeto no Vercel (nunca no repositório):
 *   ACESSO_COMPLETO, ACESSO_PORTAL · códigos de 6 dígitos de cada perfil
 *   ACESSO_SEGREDO · assina o cookie de acesso (trocar derruba todas as sessões)
 *   ACESSO_MCP     · chave do MCP
 * Sem ACESSO_SEGREDO o portal fica fechado para todos, menos o Visitante.
 *
 * Rotas do próprio middleware
 *   POST /acesso/entrar {codigo} · confere o código e grava os cookies (o limite de tentativas é a regra do Firewall do Vercel)
 *   GET  /acesso/sair            · apaga os cookies e leva à entrada
 *   GET  /acesso/perfil          · { perfil } ou { perfil: null }
 *   POST /acesso/links {caminho, dias} · só o perfil Completo: devolve o link assinado da entrega (/entregas/<slug>/)
 *   GET  /l/<código>             · confere o link, guarda o acesso no cookie cds_links e abre o portal na entrega
 * Cookies: cds_acesso (assinado, HttpOnly), cds_perfil (o perfil, legível pelo portal para ajustar o menu) e
 *   cds_links (os links de entrega abertos neste navegador, cada um com a própria assinatura e validade) e cds_entrega
 *   (a entrega aberta por último, legível pelo portal para entrar no modo entrega).
 */
export const config = { runtime: "nodejs" };

const DIAS = 30;
const ABERTO = [
  /^\/docs\/pitch(\/|\/index\.html|\/dados\.json|\/capturas\/[\w-]+\.(jpg|png|webp))?$/,
  /^\/entrar(\/|\/index\.html)?$/,
  /^\/dist\/cds-publico\.(css|js)$/,
  /^\/styles\/(tokens|shared|icons)\.css$/,
  /^\/scripts\/(cds-element|playground-kit|assets-manifest)\.js$/,
  /^\/assets\//,
  /^\/(favicon\.(ico|svg|png)|robots\.txt)$/
];
// entregas que podem ganhar link (fase 3): a pasta entregas/<slug>/ e o portal em modo entrega
const ENTREGA = /^\/entregas\/([a-z0-9-]+)\/$/;
// <entregas> gerado por scripts/build-index.js a partir de entregas/*/entrega.json: as docs que cada entrega libera
const ENTREGAS = {"chips-small":["components/filter-chip/filter-chip.docs.js","components/input-chip/input-chip.docs.js"],"draggable-list":["components/content-list-item/content-list-item.docs.js","components/content-list/content-list.docs.js","components/list-lead-item/list-lead-item.docs.js","components/trailing-item/trailing-item.docs.js"],"main-button-loading":["components/main-button/main-button.docs.js","components/spinner/spinner.docs.js"]};
// </entregas>
// o que o portal carrega no modo entrega: o shell e o código dos componentes. Fora: recursos, busca, docs de outros
// componentes e os dados do Relatório. O dist/cds.js é trocado pelo dist/cds-entrega.js (sem os recursos).
const ENTREGA_SHELL = [
  /^\/(index\.html)?$/, /^\/styles\/[\w.-]+\.css$/, /^\/scripts\/[\w.-]+\.js$/, /^\/integration\/[\w./-]+\.js$/,
  /^\/dist\/cds(-entrega)?\.(css|js)$/, /^\/(components|compositions|local)\/[\w-]+\/[\w.-]+\.(js|css|svg|png|jpg|webp)$/
];
const LINK_DIAS = [7, 14, 30];
const MCP = [/^\/dist\/mcp\//, /^\/scripts\/(react|flutter)-kit\.js$/];
// Relatório: os registros que ele lê e os checks das stacks (o perfil Portal não abre)
const RELATORIO = [
  /^\/docs\/[^/]+\.md$/, /^\/docs\/tendencia\.json$/, /^\/docs\/local\//,
  /^\/integration\/(.+\/)?[^/]+\.md$/, /^\/integration\/(.+\/)?(stack-check|jsx-check|dart-check)\.json$/, /^\/tests\//
];

const enc = new TextEncoder();
const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
async function hmac(segredo, texto){
  const k = await crypto.subtle.importKey("raw", enc.encode(segredo), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", k, enc.encode(texto)));
}
// comparação em tempo constante (os dois lados viram HMAC antes, então têm o mesmo tamanho)
async function igual(a, b, segredo){
  const x = await hmac(segredo, String(a)), y = await hmac(segredo, String(b));
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.min(x.length, y.length); i++) d |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return d === 0;
}
function cookies(req){
  const out = {};
  String(req.headers.get("cookie") || "").split(/;\s*/).forEach((p) => { const i = p.indexOf("="); if (i > 0) out[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1)); });
  return out;
}
async function perfil(req, env){
  const c = cookies(req).cds_acesso, s = env.ACESSO_SEGREDO;
  if (!c || !s) return null;
  const [dados, sig] = c.split(".");
  if (!dados || !sig || !(await igual(sig, await hmac(s, dados), s))) return null;
  try {
    const p = JSON.parse(Buffer.from(dados.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!p || !p.e || Date.now() > p.e || !/^(completo|portal)$/.test(p.p)) return null;
    return p.p;
  } catch (e) { return null; }
}
async function cookieAcesso(p, env){
  const dados = b64u(enc.encode(JSON.stringify({ p, e: Date.now() + DIAS * 864e5 })));
  return dados + "." + await hmac(env.ACESSO_SEGREDO, dados);
}
// ---------- links de página ----------
async function criarLink(caminho, dias, env){
  const dados = b64u(enc.encode(JSON.stringify({ c: caminho, e: Date.now() + dias * 864e5 })));
  return dados + "." + await hmac(env.ACESSO_SEGREDO, "link." + dados);
}
async function lerLink(codigo, env){
  const [dados, sig] = String(codigo || "").split(".");
  if (!dados || !sig || !env.ACESSO_SEGREDO || !(await igual(sig, await hmac(env.ACESSO_SEGREDO, "link." + dados), env.ACESSO_SEGREDO))) return null;
  try {
    const l = JSON.parse(Buffer.from(dados.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    const m = l && ENTREGA.exec(l.c);
    return m && ENTREGAS[m[1]] && l.e > Date.now() ? l : null;
  } catch (e) { return null; }
}
async function linksValidos(req, env){
  const out = [];
  for (const c of String(cookies(req).cds_links || "").split("~").filter(Boolean).slice(0, 20)){ const l = await lerLink(c, env); if (l) out.push({ codigo: c, l }); }
  return out;
}

const seguir = () => new Response(null, { headers: { "x-middleware-next": "1" } });
const json = (obj, status, extra) => new Response(JSON.stringify(obj), { status: status || 200, headers: Object.assign({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, extra || {}) });
function quer(req){ // navegação de página (vai para a entrada) ou arquivo (responde 401/403)
  const a = String(req.headers.get("accept") || "");
  return a.includes("text/html");
}
function paraEntrar(url){
  const volta = url.pathname + url.search;
  return new Response(null, { status: 302, headers: { Location: "/entrar/" + (volta && volta !== "/" ? "?volta=" + encodeURIComponent(volta) : ""), "cache-control": "no-store" } });
}
const semAcesso = (html) => html
  ? new Response("<!doctype html><meta charset=utf-8><title>Sem acesso</title><p style=\"font-family:system-ui;margin:2rem\">Você não tem acesso a esta página. <a href=\"/\">Voltar ao portal</a></p>", { status: 403, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } })
  : new Response("Sem acesso", { status: 403, headers: { "cache-control": "no-store" } });

export default async function middleware(req){
  const env = process.env, url = new URL(req.url), path = decodeURIComponent(url.pathname);

  // --- rotas do próprio middleware ---
  if (path === "/acesso/entrar" && req.method === "POST"){
    if (!env.ACESSO_SEGREDO) return json({ erro: "O acesso ainda não foi configurado." }, 503);
    let codigo = "";
    try { codigo = String((await req.json()).codigo || "").trim(); } catch (e) {}
    if (!/^\d{6}$/.test(codigo)) return json({ erro: "Digite os 6 números do código." }, 400);
    let p = null;
    if (env.ACESSO_COMPLETO && await igual(codigo, env.ACESSO_COMPLETO, env.ACESSO_SEGREDO)) p = "completo";
    else if (env.ACESSO_PORTAL && await igual(codigo, env.ACESSO_PORTAL, env.ACESSO_SEGREDO)) p = "portal";
    if (!p) return json({ erro: "Código incorreto. Confira e tente de novo." }, 401);
    const idade = DIAS * 86400, valor = await cookieAcesso(p, env);
    const h = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    h.append("set-cookie", "cds_acesso=" + valor + "; Path=/; Max-Age=" + idade + "; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_perfil=" + p + "; Path=/; Max-Age=" + idade + "; Secure; SameSite=Lax");
    return new Response(JSON.stringify({ perfil: p }), { status: 200, headers: h });
  }
  if (path === "/acesso/sair"){
    const h = new Headers({ Location: "/entrar/", "cache-control": "no-store" });
    h.append("set-cookie", "cds_acesso=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_perfil=; Path=/; Max-Age=0; Secure; SameSite=Lax");
    return new Response(null, { status: 302, headers: h });
  }
  if (path === "/acesso/perfil") return json({ perfil: await perfil(req, env) });
  if (path === "/acesso/links" && req.method === "POST"){
    if (await perfil(req, env) !== "completo") return json({ erro: "Gerar links é do perfil Completo." }, 403);
    let b = {};
    try { b = await req.json(); } catch (e) {}
    const caminho = String(b.caminho || ""), dias = Number(b.dias) || 14;
    const m = ENTREGA.exec(caminho);
    if (!m || !ENTREGAS[m[1]]) return json({ erro: "Escolha uma das entregas da lista." }, 400);
    if (LINK_DIAS.indexOf(dias) < 0) return json({ erro: "Validade: 7, 14 ou 30 dias." }, 400);
    const codigo = await criarLink(caminho, dias, env);
    return json({ link: url.origin + "/l/" + codigo, caminho, vence: new Date(Date.now() + dias * 864e5).toISOString() });
  }
  if (path.startsWith("/l/")){
    const codigo = path.slice(3), l = await lerLink(codigo, env);
    if (!l) return new Response(null, { status: 302, headers: { Location: "/entrar/?link=vencido", "cache-control": "no-store" } });
    // guarda junto dos outros links ainda válidos (no máximo 20); o cookie vive até o link mais longo vencer
    const atuais = (await linksValidos(req, env)).filter((x) => x.l.c !== l.c).concat([{ codigo, l }]).slice(-20);
    const idade = Math.max.apply(null, atuais.map((x) => Math.ceil((x.l.e - Date.now()) / 1000)));
    const h = new Headers({ Location: "/", "cache-control": "no-store" });
    h.append("set-cookie", "cds_links=" + atuais.map((x) => x.codigo).join("~") + "; Path=/; Max-Age=" + idade + "; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_entrega=" + ENTREGA.exec(l.c)[1] + "; Path=/; Max-Age=" + idade + "; Secure; SameSite=Lax");
    return new Response(null, { status: 302, headers: h });
  }

  // --- arquivos ---
  if (ABERTO.some((re) => re.test(path))) return seguir();
  const p = await perfil(req, env);
  if (MCP.some((re) => re.test(path))){
    const chave = String(req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (p || (env.ACESSO_MCP && env.ACESSO_SEGREDO && chave && await igual(chave, env.ACESSO_MCP, env.ACESSO_SEGREDO))) return seguir();
    // o código React e Flutter de cada componente (painéis No React e No Flutter) também abre no modo entrega
    if (/^\/scripts\//.test(path) && (await linksValidos(req, env)).length) return seguir();
    return new Response("Chave do MCP ausente ou inválida", { status: 401, headers: { "cache-control": "no-store" } });
  }
  if (!p){
    // sem perfil: um link de entrega abre a pasta dela, o portal (sem os recursos) e as docs dos itens dela
    const links = await linksValidos(req, env);
    if (links.some((x) => path.startsWith(x.l.c))) return seguir();
    const ent = links.map((x) => ENTREGA.exec(x.l.c)[1]);
    if (ent.length){
      if (path === "/dist/cds.js") return new Response(null, { headers: { "x-middleware-rewrite": url.origin + "/dist/cds-entrega.js" + url.search } });
      if (/\.docs\.js$/.test(path) ? ent.some((s) => ENTREGAS[s].indexOf(path.slice(1)) >= 0) : ENTREGA_SHELL.some((re) => re.test(path))) return seguir();
    }
    return quer(req) ? paraEntrar(url) : new Response("Entre no portal para abrir este arquivo", { status: 401, headers: { "cache-control": "no-store" } });
  }
  if (/^\/acesso\/links\//.test(path) && p !== "completo") return semAcesso(quer(req)); // a tela de gerar links é do Completo
  if (p === "portal" && RELATORIO.some((re) => re.test(path))) return semAcesso(quer(req));
  return seguir();
}
