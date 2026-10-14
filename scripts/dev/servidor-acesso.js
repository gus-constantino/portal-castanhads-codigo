#!/usr/bin/env node
/**
 * Servidor local com o middleware.js do Vercel (docs/PLANO-ACESSO.md), para testar a entrada, os perfis e os links de
 * entrega sem publicar. Usa códigos de teste (nunca os do Vercel):
 *   Completo 111111 · Portal 222222 · chave do MCP "chave-de-teste"
 *   node scripts/dev/servidor-acesso.js [porta]     (padrão 8790) → http://localhost:8790
 * Os cookies saem com Secure, que o navegador aceita em localhost.
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), http = require("http");
const ROOT = path.join(__dirname, "..", ".."), PORTA = Number(process.argv[2]) || 8790;
const env = { ACESSO_SEGREDO: "segredo-local", ACESSO_COMPLETO: "111111", ACESSO_PORTAL: "222222", ACESSO_MCP: "chave-de-teste" };
function carregar(){ // relê o middleware a cada pedido: editar e recarregar a página basta
  const src = fs.readFileSync(path.join(ROOT, "middleware.js"), "utf8")
    .replace(/^export const config\s*=/m, "exports.config =")
    .replace(/^export default async function middleware/m, "exports.default = async function middleware");
  const ctx = { exports: {}, process: { env }, Buffer, TextEncoder, crypto: globalThis.crypto, Response, Headers, URL, JSON, Date, String, Math, Object, decodeURIComponent, encodeURIComponent };
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
http.createServer(async (rq, res) => {
  const chunks = []; for await (const c of rq) chunks.push(c);
  const url = "https://localhost:" + PORTA + rq.url;
  const req = new Request(url, { method: rq.method, headers: rq.headers, body: chunks.length && !/^(GET|HEAD)$/.test(rq.method) ? Buffer.concat(chunks) : undefined });
  const r = await carregar()(req);
  if (r.headers.get("x-middleware-next") === "1") return arquivo(res, new URL(url).pathname);
  const rw = r.headers.get("x-middleware-rewrite");
  if (rw) return arquivo(res, new URL(rw).pathname);
  const h = {}; r.headers.forEach((v, k) => { if (k !== "set-cookie") h[k] = v; });
  const sc = r.headers.getSetCookie(); if (sc.length) h["set-cookie"] = sc;
  res.writeHead(r.status, h); res.end(Buffer.from(await r.arrayBuffer()));
}).listen(PORTA, () => console.log("Portal com o middleware em http://localhost:" + PORTA + " · Completo 111111 · Portal 222222"));
