#!/usr/bin/env node
/**
 * Changelog do playground a partir do Slack #castanha-novidades (D199).
 *
 *   node scripts/dev/changelog.js build                 regera resources/changelog/changelog.js a partir de docs/changelog/releases.json
 *   node scripts/dev/changelog.js add <novas.json> [--lido-ate AAAA-MM-DD]
 *                                                       junta releases novas (sem repetir), atualiza lido_ate e regera
 *   node scripts/dev/changelog.js check                 só valida o releases.json (sai com 1 se algo estiver fora das regras)
 *
 * <novas.json>: lista de releases (ou { releases: [...] }) no formato do releases.json:
 *   { "data": "AAAA-MM-DD", "area": "React|Flutter|Figma|Ilustrações|Ícones|Tokens|Documentação|Outro", "titulo": "…",
 *     "versao": "v1.2.0" | null, "itens": [{ "tipo": "novo|melhoria|correcao|descontinuado|outro", "texto": "…" }], "link": "URL" | null }
 * Regras (repositório PÚBLICO), aplicadas na entrada e no check: sem e-mail, menção (@nome), link do Slack, Storybook ou Widgetbook
 * (exigem VPN); links do zeroheight no domínio atual (castanha.caju.com.br) e sem o parâmetro de rastreio t=.
 */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const DATA = path.join(ROOT, "docs", "changelog", "releases.json");
const OUT = path.join(ROOT, "resources", "changelog", "changelog.js");
const AREAS = ["React", "Flutter", "Figma", "Ilustrações", "Ícones", "Tokens", "Documentação", "Outro"];
const TIPOS = { novo: "Novo", melhoria: "Melhoria", correcao: "Correção", descontinuado: "Descontinuado", outro: "" };
const BLOQ = [/[\w.+-]+@[a-z][\w-]*\.[a-z]{2,}/i, /(^|\s)@[a-zà-ú]+\.[a-zà-ú]+/i, /slack\.com/i, /castanha-(web|staging|mobile)\.caju\.com\.br/i, /<#C[A-Z0-9]+/];

function link(u){
  if (!u) return null;
  u = String(u).replace(/^https?:\/\/zeroheight\.com\/858426090\//, "https://castanha.caju.com.br/858426090/");
  u = u.replace(/([?&])t=[^&]*&?/, "$1").replace(/[?&]$/, "");
  if (BLOQ.some((re) => re.test(u))) return null;
  return u;
}
function problemas(r, i){
  const p = [], onde = "release " + (i + 1) + " (" + r.data + " · " + r.titulo + ")";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.data || "")) p.push(onde + ": data fora do formato AAAA-MM-DD");
  if (AREAS.indexOf(r.area) < 0) p.push(onde + ": área \"" + r.area + "\" fora da lista " + AREAS.join(", "));
  if (!r.titulo) p.push(onde + ": sem título");
  if (!Array.isArray(r.itens)) p.push(onde + ": itens não é lista");
  (r.itens || []).forEach((it) => { if (!(it.tipo in TIPOS)) p.push(onde + ": tipo \"" + it.tipo + "\" fora de " + Object.keys(TIPOS).join(", ")); });
  const txt = [r.titulo, r.versao || ""].concat((r.itens || []).map((it) => it.texto)).join(" ");
  BLOQ.forEach((re) => { if (re.test(txt)) p.push(onde + ": texto com dado que não vai para repositório público (" + re + ")"); });
  return p;
}
const chave = (r) => [r.data, r.area, String(r.titulo).trim().toLowerCase()].join("|");
const ler = () => JSON.parse(fs.readFileSync(DATA, "utf8"));
function ordenar(rs){ return rs.slice().sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : 0)); }

function build(d){
  const R = ordenar(d.releases).map((r) => {
    const [y, m, dd] = r.data.split("-"), href = link(r.link);
    return { d: r.data, date: dd + "/" + m + "/" + y, area: r.area, version: r.versao || null, title: r.titulo,
      items: (r.itens || []).map((it) => (TIPOS[it.tipo] ? TIPOS[it.tipo] + ": " : "") + it.texto),
      href: href, cta: href ? (/figma\.com/.test(href) ? "Abrir no Figma" : "Abrir no Hub") : null };
  });
  const fim = d.lido_ate.split("-").reverse().join("/");
  const js = `/* Changelog: releases do Castanha anunciadas no Slack #castanha-novidades. ARQUIVO GERADO: não edite à mão.
   Fonte: docs/changelog/releases.json · gerado por \`node scripts/dev/changelog.js build\` (a rotina agendada lê o canal e roda \`add\`).
   Sem nomes de pessoas nem links internos (Storybook/Widgetbook exigem VPN); links do zeroheight no domínio atual.
   Página única com busca e Filter Chips por área (bloco releases do docs-kit): um título por mês e uma release por Card. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "changelog", name: "Changelog", resource: true, order: 6 });
  var MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  var R = ${JSON.stringify(R)};
  var ORDEM = ${JSON.stringify(AREAS)};
  var areas = ORDEM.filter(function(a){ return R.some(function(r){ return r.area === a; }); });
  function mes(r){ var m = MESES[+r.d.slice(5, 7) - 1]; return m.charAt(0).toUpperCase() + m.slice(1) + " de " + r.d.slice(0, 4); }
  CDS.docs["changelog"] = { tabs: [
    { id: "releases", title: "Releases", blocks: [
      { h2: "Changelog" },
      { p: "O que saiu em cada release do Castanha, da mais recente para a mais antiga: componentes React e Flutter, biblioteca do Figma, ilustrações, ícones, tokens e documentação. Busque por um componente, asset ou versão, ou filtre por área." },
      { releases: { items: R, areas: areas, months: mes } },
      { note: "Fonte: anúncios do canal #castanha-novidades no Slack, lidos até ${fim} (atualização automática nos dias úteis). Ilustrações têm duas numerações: a Biblioteca do Figma e o pacote castanha-illustrations. Links do Storybook e do Widgetbook ficam de fora (exigem VPN)." }
    ] }
  ] };
})();
`;
  fs.writeFileSync(OUT, js);
  return R.length;
}

const cmd = process.argv[2];
if (cmd === "build" || cmd === "check"){
  const d = ler(), p = [].concat(...d.releases.map(problemas));
  if (p.length){ console.error("❌ releases.json fora das regras:\n- " + p.join("\n- ")); process.exit(1); }
  if (cmd === "check"){ console.log("✅ Changelog: " + d.releases.length + " releases dentro das regras (lido até " + d.lido_ate + ")"); process.exit(0); }
  console.log("✅ Changelog regerado: " + build(d) + " releases");
} else if (cmd === "add"){
  const f = process.argv[3]; if (!f){ console.error("Uso: changelog.js add <novas.json> [--lido-ate AAAA-MM-DD]"); process.exit(2); }
  let novas = JSON.parse(fs.readFileSync(f, "utf8")); novas = Array.isArray(novas) ? novas : (novas.releases || []);
  novas.forEach((r) => { r.link = link(r.link); r.versao = r.versao || null; r.itens = r.itens || []; });
  const p = [].concat(...novas.map(problemas));
  if (p.length){ console.error("❌ Releases novas fora das regras (nada foi gravado):\n- " + p.join("\n- ")); process.exit(1); }
  const d = ler(), tem = new Set(d.releases.map(chave)), entram = novas.filter((r) => !tem.has(chave(r)));
  d.releases = ordenar(d.releases.concat(entram));
  const i = process.argv.indexOf("--lido-ate"); if (i > 0) d.lido_ate = process.argv[i + 1];
  d.atualizado_em = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(DATA, JSON.stringify(d, null, 1) + "\n");
  build(d);
  console.log(entram.length ? "NOVAS: " + entram.length + " release(s)\n" + entram.map((r) => "- " + r.data + " · " + r.area + " · " + r.titulo + (r.versao ? " (" + r.versao + ")" : "")).join("\n")
    : "SEM NOVIDADES (" + (novas.length - entram.length) + " repetida(s) ignorada(s))");
} else { console.error("Uso: changelog.js build | add <novas.json> [--lido-ate AAAA-MM-DD] | check"); process.exit(2); }
