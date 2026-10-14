/**
 * Ranking do time do Castanha Quiz · função do Vercel (D+ranking-vercel). Substitui a planilha com Apps Script (D275).
 *
 * Fica atrás do middleware.js: só quem entrou no portal com código (perfil Completo ou Portal) chega aqui.
 * Mesmo endereço do portal, então não passa pelo Google nem pelo Local Network Access do Chrome (D278).
 *
 * Banco: Upstash Redis, criado pelo Marketplace do Vercel e ligado ao projeto. A integração cria as variáveis
 *   KV_REST_API_URL e KV_REST_API_TOKEN (ou UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN). Nada disso vai para o repositório.
 *
 * Rankings (quadros): "geral" e um por tema (os ids das abas do Castanha Quiz). Cada quadro é um sorted set rank:<quadro>.
 *   Partida de um tema grava no quadro do tema e no Geral. Partida com vários temas ou com Todos grava no Geral.
 *   O x1,5 de Todos chega pronto do jogo e vale no Geral, que é onde essa partida entra.
 *
 *   GET  /api/ranking?board=geral                              → { ok, top: [{ name, score, label, date }] }
 *   POST /api/ranking { board, name, score, label }            → { ok, position, top }
 *
 * Privacidade: grava 3 iniciais, pontos, temas e data. O IP serve para limitar o envio (uma partida a cada 20 s)
 *   e some sozinho do banco depois disso.
 */
const TOP = 10;
const KEEP = 200; // cada quadro guarda as 200 melhores partidas
const TEMAS = ["componentes", "tema-caju", "motion", "conteudo", "ilustracao", "camadas"];
const MAX = { geral: 5250 }; // (2.400 dos 10 acertos com combo + 600 das 3 vidas + 500 sem erros) x1,5 com todos os temas
const MAX_TEMA = 3500; // a mesma conta, sem o x1,5

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const erro = (texto, status) => json({ ok: false, error: texto }, status);

function banco(){
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // pipeline da API REST do Upstash: [[comando, …args], …] → [{ result } | { error }, …]
  return async (cmds) => {
    const r = await fetch(url.replace(/\/$/, "") + "/pipeline", { method: "POST", headers: { Authorization: "Bearer " + token, "content-type": "application/json" }, body: JSON.stringify(cmds) });
    if (!r.ok) throw new Error("banco " + r.status);
    const out = await r.json();
    out.forEach((x) => { if (x.error) throw new Error(x.error); });
    return out.map((x) => x.result);
  };
}

const quadroOk = (b) => b === "geral" || TEMAS.indexOf(b) >= 0;
// Empate: quem fez antes fica na frente. A parte decimal guarda o instante, decrescente; os pontos são a parte inteira.
const nota = (pontos, t) => pontos + (9999999999 - Math.floor(t / 1000)) / 1e10;
function lista(res){
  const out = [];
  for (let i = 0; i < res.length; i += 2){
    try { const m = JSON.parse(res[i]); out.push({ name: m.n, score: Math.floor(Number(res[i + 1])), label: m.l, date: m.d }); } catch (e) {}
  }
  return out;
}
const topo = (db, b) => db([["ZREVRANGE", "rank:" + b, "0", String(TOP - 1), "WITHSCORES"]]).then((r) => lista(r[0]));

export async function GET(req){
  const db = banco(); if (!db) return erro("O ranking do time ainda não foi configurado", 503);
  const b = new URL(req.url).searchParams.get("board") || "geral";
  if (!quadroOk(b)) return erro("Ranking desconhecido", 400);
  try { return json({ ok: true, top: await topo(db, b) }); } catch (e) { return erro("O ranking do time não respondeu", 502); }
}

export async function POST(req){
  const db = banco(); if (!db) return erro("O ranking do time ainda não foi configurado", 503);
  let p = {};
  try { p = await req.json(); } catch (e) {}
  const b = String(p.board || "geral"), name = String(p.name || "").toUpperCase(), score = Math.round(Number(p.score));
  const label = String(p.label || "").replace(/[^\wÀ-ÿ +]/g, "").slice(0, 80);
  if (!quadroOk(b)) return erro("Ranking desconhecido", 400);
  if (!/^[A-Z0-9]{3}$/.test(name)) return erro("Use três letras ou números nas iniciais", 400);
  if (!(score > 0 && score <= (MAX[b] || MAX_TEMA))) return erro("Pontuação fora do limite", 400);
  const ip = String(req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "sem-ip";
  try {
    const [livre] = await db([["SET", "rl:" + ip, "1", "NX", "EX", "20"]]);
    if (livre !== "OK") return erro("Espere alguns segundos para gravar de novo", 429);
    const t = Date.now(), d = new Date(t).toISOString().slice(0, 10), n = nota(score, t);
    const membro = JSON.stringify({ n: name, l: label, d, id: t.toString(36) + Math.random().toString(36).slice(2, 6) });
    const quadros = b === "geral" ? ["geral"] : [b, "geral"];
    const cmds = [];
    quadros.forEach((q) => { cmds.push(["ZADD", "rank:" + q, String(n), membro], ["ZREMRANGEBYRANK", "rank:" + q, "0", String(-KEEP - 1)]); });
    cmds.push(["ZREVRANK", "rank:" + b, membro], ["ZREVRANGE", "rank:" + b, "0", String(TOP - 1), "WITHSCORES"]);
    const r = await db(cmds);
    const pos = r[r.length - 2];
    return json({ ok: true, position: pos === null || pos === undefined ? 0 : pos + 1, top: lista(r[r.length - 1]) });
  } catch (e) { return erro("O ranking do time não respondeu", 502); }
}
