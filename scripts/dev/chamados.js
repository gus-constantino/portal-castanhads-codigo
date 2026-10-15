#!/usr/bin/env node
/**
 * Chamados do #castanha-suporte (painel "Suporte" na Visão geral do Relatório): docs/chamados.json.
 *
 * A fonte é a Lista do Slack "Castanha suporte - requests" (F09A03756UA), que o fluxo "Solicitação de suporte" do canal
 * preenche. Não há token do Slack no repositório: quem atualiza (a rotina ou uma sessão do Claude) lê a Lista pelo MCP do
 * Slack (slack_read_file F09A03756UA), salva o CSV e roda:
 *
 *   node scripts/dev/chamados.js <lista.csv>                     → junta ao docs/chamados.json
 *   node scripts/dev/chamados.js <lista.csv> --tipos <arquivo>   → (uma vez) tipos por linha do CSV: "<n> <tipo>"
 *
 * O arquivo guarda só o que os gráficos usam: data, tipo, prioridade, status e os componentes citados. Nada de nomes,
 * e-mails nem o texto dos pedidos. Cada chamado tem uma chave (hash da data e do título) para manter o tipo entre leituras.
 *
 * Tipos: design (Figma, padrões, componentes novos, dúvidas de uso) · dev (código: bugs, props, pacotes, ícones e ilustrações
 * que faltam na lib em código) · ilustra (ilustrações e ícones novos) · motion (animações, motion, vídeo) · conteudo
 * (textos e templates) · outros (acessos, pastas e equipes no Figma, ferramentas).
 * Chamado novo recebe um tipo provisório (pelo responsável e por palavras do pedido) e "revisar": true, para alguém
 * conferir e tirar a marca.
 */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "docs", "chamados.json");
const TIPOS = ["design", "dev", "ilustra", "motion", "conteudo", "outros"];

// CSV com aspas, vírgulas e quebras de linha dentro dos campos
function csv(text){
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++){
    const c = text[i];
    if (q){ if (c === '"'){ if (text[i + 1] === '"'){ cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ","){ row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r"){ if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length){ row.push(cell); rows.push(row); }
  const head = rows.shift();
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] || ""])));
}
// "8/13/25, 3:02 PM" → "2025-08-13"
function data(s){
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2}),/.exec(String(s).trim());
  return m ? "20" + m[3] + "-" + m[1].padStart(2, "0") + "-" + m[2].padStart(2, "0") : null;
}
const STATUS = { "Resolvido": "resolvido", "Em andamento": "andamento", "Priorizado": "priorizado" };
// componentes do portal citados no título ou no pedido (id do playground)
const COMPS = [
  ["alert", /\balert(full)?\b|castdsalert/i], ["table", /\btab(le|ela)s?\b/i], ["modal", /\bmodal\b/i], ["bottom-sheet", /bottom ?sheet/i],
  ["drawer", /\bdrawer\b/i], ["text-input", /\btext ?input\b|\binput\b(?! ?date)/i], ["main-button", /\b(main)?button\b/i],
  ["content-list", /content ?list|list ?content|list ?navigation|componente list\b|componente de lista/i], ["selection-list", /selection ?list/i], ["tooltip", /tooltip/i],
  ["scrollable-tab", /\btabs?\b/i], ["breadcrumb", /breadcrumb/i], ["date-input", /input ?date|date ?(input|picker|range)|calend[áa]rio|datepicker/i],
  ["checkbox", /checkbox/i], ["tag", /\btag\b/i], ["card", /\bcard\b/i], ["header", /\bheader/i], ["sponsor-side-menu", /side ?menu|menu lateral/i],
  ["toast", /\btoast\b/i], ["accordion", /accordion/i], ["multi-select-input", /multi ?select/i], ["radio-select-input", /\bselect\b/i],
  ["progress-tracker", /progress ?tracker/i], ["pagination", /pagina[çc][ãa]o/i], ["search-input", /\bsearch\b/i], ["filter-button", /filter ?button/i],
  ["popover", /popover/i], ["password-input", /password/i], ["carousel", /carousel/i], ["switch", /\bswitch\b/i], ["text-area", /text ?area/i]
];
// só pelo título e só em Design e Dev: no texto do pedido, "botão" e "lista" aparecem sem ser sobre o componente
function componentes(r, tipo){
  if (tipo !== "design" && tipo !== "dev") return [];
  const t = r.Request, out = [];
  for (const [id, re] of COMPS){ if (re.test(t) && out.length < 3 && !(id === "radio-select-input" && out.includes("multi-select-input"))) out.push(id); }
  return out;
}
// tipo provisório de um chamado novo: palavras do pedido primeiro, depois quem atende
function provisorio(r){
  const t = (r.Request + " " + r.Details).toLowerCase(), a = r.Assignee.split("@")[0];
  if (/motion|anima[çc]|v[íi]deo|gif\b|lottie/.test(t)) return "motion";
  if (/ilustra|[íi]cone|icon|asset/.test(t) && !/castanha-react|flutter|lib em c[óo]digo|pacote/.test(t)) return "ilustra";
  if (/acesso|permiss|pasta|equipe|maze|licen/.test(t)) return "outros";
  if (/texto|copy|conte[úu]do|template/.test(t) && !/componente/.test(t)) return "conteudo";
  if (/castanha-react|flutter|storybook|\bprop\b|bug|css|npm|vers[ãa]o/.test(t)) return "dev";
  return { "jaime.guedes": "ilustra", "juliana.barbosa": "motion", "rodrigo.andreata": "dev", "diego.silva": "dev", "jorge.junior": "dev" }[a] || "design";
}

const args = process.argv.slice(2), file = args[0], ti = args.indexOf("--tipos");
if (!file){ console.error("Uso: node scripts/dev/chamados.js <lista.csv> [--tipos <arquivo>]"); process.exit(1); }
let text = fs.readFileSync(file, "utf8");
const ini = text.indexOf("<file_content"); // saída do slack_read_file: o CSV fica entre as marcas
if (ini >= 0) text = text.slice(text.indexOf(">", ini) + 1, text.lastIndexOf("</file_content"));
const rows = csv(text.trim());
const tipos = {};
if (ti >= 0) fs.readFileSync(args[ti + 1], "utf8").split("\n").forEach((l) => { const m = /^(\d+)\s+(\S+)/.exec(l); if (m) tipos[m[1]] = m[2]; });
const antes = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { chamados: [] }, porChave = {};
antes.chamados.forEach((c) => { porChave[c.k] = c; });

let novos = 0;
const chamados = rows.map((r, i) => {
  const d = data(r["Date submitted"]); if (!d) return null;
  const k = crypto.createHash("sha1").update(d + "|" + r.Request.trim()).digest("hex").slice(0, 10), velho = porChave[k];
  let tipo = tipos[i] || (velho && velho.tipo), revisar = !!(velho && velho.revisar && !tipos[i]);
  if (!tipo){ tipo = provisorio(r); revisar = true; novos++; }
  if (!TIPOS.includes(tipo)) throw new Error("Tipo desconhecido na linha " + i + ": " + tipo);
  const c = { k, d, tipo, prioridade: ({ High: "alta", Medium: "media", Low: "baixa" })[r.Priority] || null,
    status: STATUS[r.Status] || (r.Completed === "true" ? "resolvido" : "aberto"), comp: componentes(r, tipo) };
  if (revisar) c.revisar = true;
  return c;
}).filter(Boolean).sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : a.k < b.k ? -1 : 1);

const hoje = new Date().toISOString().slice(0, 10);
const out = JSON.stringify({ fonte: "Lista do Slack Castanha suporte - requests (#castanha-suporte)", lido: hoje, chamados }, null, 0)
  .replace(/\{"k"/g, "\n  {\"k\"").replace(/\]\}$/, "\n]}") + "\n";
fs.writeFileSync(OUT, out);
const conta = {}; chamados.forEach((c) => { conta[c.tipo] = (conta[c.tipo] || 0) + 1; });
console.log("Chamados: " + chamados.length + " em docs/chamados.json (" + TIPOS.map((t) => t + " " + (conta[t] || 0)).join(" · ") + ")" +
  (novos ? ". " + novos + " novo(s) com tipo provisório (revisar: true)." : "."));
