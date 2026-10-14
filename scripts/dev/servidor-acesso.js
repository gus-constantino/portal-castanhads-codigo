#!/usr/bin/env node
/**
 * Servidor local com o middleware.js do Vercel (docs/PLANO-ACESSO.md), para testar a entrada, os perfis e os links de
 * entrega sem publicar. Usa códigos de teste (nunca os do Vercel):
 *   Completo 111111 · Portal 222222 · chave do MCP "chave-de-teste"
 *   node scripts/dev/servidor-acesso.js [porta]     (padrão 8790) → http://localhost:8790
 * Os cookies saem com Secure, que o navegador aceita em localhost.
 * O ranking do Castanha Quiz (api/ranking.mjs) roda com um Redis de mentira na memória: some ao parar o servidor.
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), http = require("http");
const ROOT = path.join(__dirname, "..", ".."), PORTA = Number(process.argv[2]) || 8790;
const env = { ACESSO_SEGREDO: "segredo-local", ACESSO_COMPLETO: "111111", ACESSO_PORTAL: "222222", ACESSO_MCP: "chave-de-teste",
  KV_REST_API_URL: "http://redis-local", KV_REST_API_TOKEN: "local" }; // registro dos links no Redis de mentira (abaixo)
function carregar(){ // relê o middleware a cada pedido: editar e recarregar a página basta
  const src = fs.readFileSync(path.join(ROOT, "middleware.js"), "utf8")
    .replace(/^export const config\s*=/m, "exports.config =")
    .replace(/^export default async function middleware/m, "exports.default = async function middleware");
  const ctx = { exports: {}, process: { env }, Buffer, TextEncoder, crypto: globalThis.crypto, Response, Headers, URL, JSON, Date, String, Math, Object, decodeURIComponent, encodeURIComponent,
    fetch: (u, o) => globalThis.fetch(u, o) };
  vm.createContext(ctx); vm.runInContext(src, ctx, { filename: "middleware.js" });
  return ctx.exports.default;
}
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2" };
function arquivo(res, p){
  let f = path.join(ROOT, decodeURIComponent(p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end("404"); }
  res.writeHead(200, { "content-type": TIPOS[path.extname(f)] || "application/octet-stream", "cache-control": "no-store" });
  fs.createReadStream(f).pipe(res);
}
// Redis de mentira para o api/ranking.mjs e o registro de links do middleware: responde ao pipeline do Upstash
// (SET NX, ZADD, ZREMRANGEBYRANK, ZREVRANK, ZREVRANGE, HSET, HMGET, HGETALL, HDEL)
const Z = {}, KV = {}, H = {}, fetchReal = globalThis.fetch;
process.env.KV_REST_API_URL = "http://redis-local"; process.env.KV_REST_API_TOKEN = "local";
globalThis.fetch = async (u, o) => {
  if (!String(u).startsWith("http://redis-local")) return fetchReal(u, o);
  const out = JSON.parse(o.body).map(([c, k, ...a]) => {
    const s = Z[k] = Z[k] || [], ord = () => s.slice().sort((x, y) => y.s - x.s);
    if (c === "SET"){ if (KV[k] > Date.now()) return { result: null }; KV[k] = Date.now() + Number(a[3]) * 1000; return { result: "OK" }; }
    if (c === "ZADD"){ s.push({ s: Number(a[0]), m: a[1] }); return { result: 1 }; }
    if (c === "ZREMRANGEBYRANK"){ Z[k] = ord().slice(0, -Number(a[1]) - 1); return { result: 0 }; }
    if (c === "ZREVRANK"){ const i = ord().findIndex((x) => x.m === a[0]); return { result: i < 0 ? null : i }; }
    if (c === "ZREVRANGE") return { result: ord().slice(0, Number(a[1]) + 1).flatMap((x) => [x.m, String(x.s)]) };
    // hash (registro dos links de página e de entrega)
    const h = H[k] = H[k] || {};
    if (c === "HSET"){ h[a[0]] = a[1]; return { result: 1 }; }
    if (c === "HMGET") return { result: a.map((f) => f in h ? h[f] : null) };
    if (c === "HGETALL") return { result: Object.keys(h).flatMap((f) => [f, h[f]]) };
    if (c === "HDEL") return { result: a.filter((f) => f in h && delete h[f]).length };
    return { error: "comando " + c };
  });
  return new Response(JSON.stringify(out), { headers: { "content-type": "application/json" } });
};
http.createServer(async (rq, res) => {
  const chunks = []; for await (const c of rq) chunks.push(c);
  const url = "https://localhost:" + PORTA + rq.url;
  const req = new Request(url, { method: rq.method, headers: rq.headers, body: chunks.length && !/^(GET|HEAD)$/.test(rq.method) ? Buffer.concat(chunks) : undefined });
  const r = await carregar()(req);
  if (r.headers.get("x-middleware-next") === "1" && new URL(url).pathname === "/api/ranking"){
    const api = await import(path.join(ROOT, "api", "ranking.mjs")), fn = api[rq.method];
    const out = fn ? await fn(new Request(url, { method: rq.method, headers: Object.assign({}, rq.headers, { "x-forwarded-for": String(Date.now()) }), body: req.body ? Buffer.concat(chunks) : undefined })) : new Response("", { status: 405 });
    res.writeHead(out.status, { "content-type": "application/json; charset=utf-8" }); return res.end(Buffer.from(await out.arrayBuffer()));
  }
  if (r.headers.get("x-middleware-next") === "1") return arquivo(res, new URL(url).pathname);
  const rw = r.headers.get("x-middleware-rewrite");
  if (rw) return arquivo(res, new URL(rw).pathname);
  const h = {}; r.headers.forEach((v, k) => { if (k !== "set-cookie") h[k] = v; });
  const sc = r.headers.getSetCookie(); if (sc.length) h["set-cookie"] = sc;
  res.writeHead(r.status, h); res.end(Buffer.from(await r.arrayBuffer()));
}).listen(PORTA, () => console.log("Portal com o middleware em http://localhost:" + PORTA + " · Completo 111111 · Portal 222222"));
