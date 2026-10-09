#!/usr/bin/env node
/**
 * MCP do Castanha DS — M1 consulta + M2 gerar e revisar JSX (docs/local/PLANO-MCP.md).
 *
 * Servidor MCP por stdio, sem dependências (Node 18+): JSON-RPC 2.0, uma mensagem por linha.
 * Lê o catálogo gerado no build (dist/mcp/catalog.json). Para usar fora do repo, aponte para o catálogo publicado:
 *   CASTANHA_CATALOG=https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/catalog.json node mcp/server.js
 *
 * Conectar no Claude Code (na pasta do repo):
 *   claude mcp add castanha-ds -- node mcp/server.js
 * HTTP (Streamable HTTP, para hospedar ou testar como servidor remoto):
 *   node mcp/server.js --http 8787   →  http://127.0.0.1:8787/mcp   (handleRequest: handler `fetch` para Workers/Deno/Edge)
 *
 * Ferramentas: listar_componentes · componente · docs · buscar · tokens · icone · ilustracao · diretrizes · divergencias
 *              gerar_jsx · revisar_codigo (M2, mcp/react.js)
 * Resources:   castanha://componente/{id} · castanha://docs/{id}/{tab}
 * Prompts:     implementar-tela · revisar-handoff · escrever-texto
 */
"use strict";
const fs = require("fs"), path = require("path");
const VERSION = "0.3.0";
const REACT = require("./react"); // M2: gerar_jsx e revisar_codigo
const SITE_CATALOG = "https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/catalog.json";
// catálogo: CASTANHA_CATALOG (arquivo ou URL) · o do repo (dist/mcp/) · o ao lado do arquivo único · o publicado no site
const SRC = (typeof process !== "undefined" && process.env && process.env.CASTANHA_CATALOG) || (function(){
  if (typeof __dirname === "undefined" || !fs.existsSync) return SITE_CATALOG;
  return [path.join(__dirname, "..", "dist", "mcp", "catalog.json"), path.join(__dirname, "catalog.json")].find((f) => fs.existsSync(f)) || SITE_CATALOG;
})();

// ---------- catálogo ----------
let C = null;
async function catalog(){
  if (C) return C;
  if (/^https?:/.test(SRC)){ const r = await fetch(SRC); if (!r.ok) throw new Error("Catálogo indisponível: " + r.status + " " + SRC); C = await r.json(); }
  else C = JSON.parse(fs.readFileSync(SRC, "utf8"));
  C.components.forEach((c) => { c._text = fold([c.id, c.name, c.category, c.description, c.react && c.react.component, (c.tabs || []).map((t) => t.text).join(" ")].join(" ")); });
  return C;
}
const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const words = (q) => fold(q).split(/[^a-z0-9#-]+/).filter((w) => w.length > 1);
function score(text, q){ const t = fold(text), ws = words(q); if (!ws.length) return 0; let s = 0; ws.forEach((w) => { if (t.indexOf(w) !== -1) s += 1 + (t.split(w).length - 2) * 0.1; }); return s / ws.length; }

// ---------- busca de ícones ----------
// Os nomes do [Caju] Icons são em inglês e as palavras-chave misturam pt e en (e 41 ícones não têm nenhuma):
// a busca reduz plural, traduz termos comuns pt → en e pontua pela força do encontro.
const PT_EN = { cartao: ["card"], casa: ["home"], inicio: ["home"], seta: ["arrow", "navigation", "go", "back"], direita: ["right"], esquerda: ["left"],
  cima: ["up"], baixo: ["down"], usuario: ["user"], pessoa: ["user"], perfil: ["user"], equipe: ["team"], time: ["team"], dinheiro: ["money", "balance", "value"],
  saldo: ["balance"], moeda: ["coin", "value"], pagamento: ["pay", "payment"], pagar: ["pay"], calendario: ["calendar"], data: ["calendar"], agenda: ["calendar"],
  busca: ["search"], buscar: ["search"], pesquisa: ["search"], lupa: ["search"], fechar: ["close"], adicionar: ["add", "plus"], mais: ["plus", "more"], menos: ["minus"],
  editar: ["edit"], excluir: ["delete"], apagar: ["delete"], lixeira: ["delete"], configuracao: ["settings"], ajuste: ["settings", "customize"], notificacao: ["notification"],
  sino: ["notification"], documento: ["document", "file"], arquivo: ["file", "folder", "archive"], pasta: ["folder"], olho: ["hide", "view"], visualizar: ["view"],
  esconder: ["hide"], compartilhar: ["share"], baixar: ["download"], enviar: ["send", "upload"], subir: ["upload"], mensagem: ["message", "chat"], conversa: ["chat"],
  telefone: ["smartphone", "call"], celular: ["smartphone"], carro: ["car"], onibus: ["bus"], trem: ["train"], aviao: ["travel"], viagem: ["travel"], transporte: ["transport", "mobility"],
  saude: ["health"], comida: ["food", "meal"], refeicao: ["meal"], cadeado: ["lock"], bloqueio: ["lock"], chave: ["key"], estrela: ["rate"], favorito: ["favorite"],
  coracao: ["favorite", "health"], alerta: ["warning"], aviso: ["warning"], informacao: ["information"], erro: ["error"], sucesso: ["check", "positive"], confirmar: ["check"],
  filtro: ["filter"], voltar: ["back"], avancar: ["go"], grafico: ["chart"], loja: ["shop"], empresa: ["business", "building"], relogio: ["timer", "clock"], camera: ["camera"],
  imagem: ["image"], foto: ["image", "camera"], link: ["link"], copiar: ["copy"], imprimir: ["printer"], localizacao: ["location", "pin"], mapa: ["location"], presente: ["awards"],
  premio: ["awards", "medal"], recibo: ["receipt"], comprovante: ["receipt", "file"], codigo: ["code", "barcode", "qr"], ajuda: ["support", "information"], suporte: ["support"],
  sair: ["logout"], entrar: ["login"], senha: ["key", "lock"], seguranca: ["safety", "lock"], escudo: ["safety"], educacao: ["education"], cultura: ["culture"], pet: ["pet"],
  maquininha: ["machine"], aproximacao: ["contactless"], virtual: ["virtual"], digital: ["virtual"] };
const stem = (w) => w.replace(/oes$/, "ao").replace(/aes$/, "ao").replace(/ais$/, "al").replace(/eis$/, "el").replace(/(?<=[a-z]{3})s$/, "");
const qWords = (q) => fold(q).split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !/^(de|do|da|para|com|um|uma|o|a|e|no|na|em|icone|icon)$/.test(w)).map(stem);
/** Pontua um ícone: nome (tokens em inglês), palavras-chave (a primeira é o sentido principal) e categoria; termos pt viram en. */
function iconScore(i, q){
  const ws = qWords(q); if (!ws.length) return 0;
  const tokens = i.name.split("-").filter((t) => !/^(line|fill|filled)$/.test(t)), kws = i.keywords.map((k) => stem(fold(k).trim())), cat = fold(i.category);
  let total = 0;
  ws.forEach((w) => {
    let best = 0;
    let byName = 0, byKw = 0;
    [[w, 1]].concat((PT_EN[w] || []).map((e) => [e, 0.85])).forEach(([x, f]) => {
      let tn = 0, tk = 0, tc = 0;
      if (tokens.indexOf(x) >= 0) tn = 5;
      else if (x.length > 2 && tokens.some((t) => t.indexOf(x) === 0)) tn = 3;
      kws.forEach((k, pos) => {
        if (k === x) tk = Math.max(tk, 6 - Math.min(pos, 4) * 0.5); // palavra-chave inteira: a primeira vale mais
        else if (k.split(/[^a-z0-9]+/).map(stem).indexOf(x) >= 0) tk = Math.max(tk, 4 - Math.min(pos, 4) * 0.3);
        else if (x.length > 3 && k.indexOf(x) >= 0) tk = Math.max(tk, 1.5);
      });
      if (cat.split(/[^a-z0-9]+/).indexOf(x) >= 0) tc = 1;
      byName = Math.max(byName, tn * f); byKw = Math.max(byKw, tk * f);
      best = Math.max(best, Math.max(tn, tk, tc) * f);
    });
    if (byName >= 4 && byKw >= 4) best += 0.5; // termo no nome E na palavra-chave: é "o" ícone do conceito
    total += best;
  });
  return total / ws.length - (i.deprecated ? 2 : 0);
}
function rankIcons(c, q, all){
  return c.icons.filter((i) => all || !i.deprecated).map((i) => [i, iconScore(i, q)]).filter((p) => p[1] >= 1.5)
    .sort((p, r) => r[1] - p[1] || p[0].name.length - r[0].name.length);
}

// ---------- busca de ilustrações ----------
// Os nomes do [Caju] Illustrations são em pt (com alguns em inglês: empty-state, search-not-found, success, error) e quase
// nenhuma tem descrição: a busca usa sinônimos (dinheiro → moeda, nota, cash…), plural e a posição do termo no nome.
const ILL_SYN = { dinheiro: ["moeda", "moedas", "nota", "cash", "carteira", "financas"], grana: ["moeda", "cash"], pagamento: ["maquininha", "pix", "transferencia", "cartao"],
  card: ["cartao"], cartao: ["cartao", "cartoes"], vazio: ["empty"], vazia: ["empty"], nada: ["empty"], resultado: ["found", "search"], busca: ["search"],
  encontrado: ["found"], erro: ["error", "alert"], falha: ["error"], sucesso: ["success", "check", "concluido"], pronto: ["success", "concluido"], aviso: ["alert", "sino"],
  alerta: ["alert"], notificacao: ["sino", "alert", "notificacoes"], celular: ["celular"], telefone: ["celular"], smartphone: ["celular"], computador: ["notebook"],
  documento: ["documentos", "rg", "cnh", "papeis"], identidade: ["rg", "cnh"], seguranca: ["cadeado", "escudo", "seguranca"], senha: ["cadeado", "recuperacao"],
  presente: ["presente", "gema"], premio: ["trofeu", "medalha", "gema"], comemoracao: ["celebracao", "estalar"], festa: ["celebracao", "aniversario"],
  viagem: ["aviao", "malas", "viagem", "passagem"], transporte: ["onibus", "trem", "carro", "transporte", "bilhete"], comida: ["alimentos", "pizza", "cafe", "alimentacao"],
  saude: ["saude", "medico", "odonto", "fitness"], tempo: ["relogio", "ampulheta", "despertador"], espera: ["ampulheta", "relogio"], data: ["calendario"],
  grafico: ["graficos", "dashboards", "barra", "setores"], relatorio: ["relatorios", "planilha", "extrato"], pessoa: ["personagens"], personagem: ["personagens"],
  autenticacao: ["autenticacao", "biometrico", "facial", "selfie", "ocr", "sms"], login: ["login", "autenticacao"], loja: ["compras", "sacola"], compra: ["compras", "sacola"] };
/** Pontua uma ilustração: tokens do nome (o primeiro token do nome vale mais), categoria e descrição; versões low-detail logo depois da principal. */
function illScore(i, q){
  const ws = qWords(q); if (!ws.length) return 0;
  const parts = i.id.split("/"), cat = (parts[0] || "").split("-"), name = (parts[1] || "").split("-").map(stem), desc = fold(i.description).split(/[^a-z0-9]+/).map(stem);
  const pkg = i.react ? i.react.name.split("-").map(stem) : [];
  let total = 0;
  ws.forEach((w) => {
    let best = 0;
    [[w, 1]].concat((ILL_SYN[w] || []).map((e, k) => [stem(e), 0.85 - k * 0.02])).forEach(([x, f]) => { // o primeiro sinônimo é o mais próximo
      let sc = 0;
      const at = name.indexOf(x);
      if (at === 0) sc = 6; else if (at > 0) sc = 5 - Math.min(at, 3) * 0.3;
      else if (x.length > 3 && name.some((t) => t.indexOf(x) === 0)) sc = 3.5;
      if (cat.indexOf(x) >= 0 || fold(i.category).split(/[^a-z0-9]+/).map(stem).indexOf(x) >= 0) sc = Math.max(sc, 2.5);
      if (pkg.indexOf(x) >= 0) sc = Math.max(sc, 2.5); // nome no pacote (ex.: hub-*, interface-*)
      if (desc.indexOf(x) >= 0) sc = Math.max(sc, 3);
      best = Math.max(best, sc * f);
    });
    total += best;
  });
  return total / ws.length - (/low-detail/.test(i.id) ? 0.3 : 0) - (/^hero-/.test(i.id.split("/")[0]) ? 0.2 : 0);
}
function rankIlls(c, q){
  return c.illustrations.map((i) => [i, illScore(i, q)]).filter((p) => p[1] >= 2).sort((p, r) => r[1] - p[1] || p[0].id.length - r[0].id.length);
}

function findComponent(c, q){
  const f = fold(q).trim(), list = c.components;
  return list.find((x) => x.id === f) || list.find((x) => fold(x.name) === f) || list.find((x) => x.react && fold(x.react.component) === f) ||
    list.find((x) => fold(x.name).replace(/\s+/g, "-") === f.replace(/\s+/g, "-")) || null;
}
// distância de edição (erro de digitação: "tagg" → tag, "buton" → button)
function lev(a, b){ const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++){ let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++){ const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; } } return d[b.length]; }
function suggest(c, q){
  const f = fold(q).trim();
  return c.components.map((x) => { const keys = [x.id, fold(x.name), x.react ? fold(x.react.component) : ""].filter(Boolean);
    const near = Math.min.apply(null, keys.map((k) => lev(f, k))), s = score(keys.join(" "), q) + (near <= 2 ? 2 - near * 0.5 : 0);
    return [x, s]; }).filter((p) => p[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map((p) => p[0].id);
}
const KIND = { component: "Componente", "building-block": "Building block", resource: "Recurso", home: "Início", composition: "Composição" };
const STATUS = { current: "publicado na lib, sem pendência", changed: "publicado, com alterações ainda não publicadas", unpublished: "não publicado na lib", branch: "só numa branch do Figma", "branch-update": "main publicada, com uma melhoria documentada que ainda está numa branch do Figma" };
const pageUrl = (c, x) => c.site + "#/" + x.id;

// ---------- formatação ----------
function propsTable(rows){ return ["| Prop | Tipo | Padrão | Descrição |", "|---|---|---|---|"].concat(rows.map((p) => "| `" + p.name + (p.required ? "" : "?") + "` | `" + String(p.type).replace(/\|/g, "\\|") + "` | " + (p.default !== undefined ? "`" + p.default + "`" : "—") + " | " + (p.description || "").replace(/\|/g, "\\|") + " |")).join("\n"); }
function componentSummary(c, x){
  const L = ["# " + x.name + " (`" + x.id + "`)", "", KIND[x.kind] + (x.category ? " · " + x.category : "") + (x.draft ? " · **docs em rascunho** (ainda sem revisão do time)" : "")];
  if (x.description) L.push("", x.description);
  const links = [["Playground", pageUrl(c, x)], ["Figma", x.figma], ["Zeroheight", x.zeroheight || (x.react && x.react.zeroheight)], ["Storybook", x.react && x.react.storybook]].filter((l) => l[1]);
  L.push("", "**Links:** " + links.map((l) => "[" + l[0] + "](" + l[1] + ")").join(" · "));
  if (x.figmaStatus) L.push("", "**Figma:** " + STATUS[x.figmaStatus] + ".");
  if (x.figmaProps && x.figmaProps.length) L.push("", "## Props no Figma", "", x.figmaProps.map((p) => "- **" + p.name + "** (" + p.type + ")" + (p.options ? ": " + p.options.join(", ") : "") + (p.default !== undefined ? " · padrão `" + p.default + "`" : "")).join("\n"));
  if (x.react){
    const r = x.react;
    L.push("", "## No castanha-react", "", "`<" + r.component + ">`" + (r.onlyStaging ? " · ainda só na staging" : "") + (r.tags.length ? " · tags: " + r.tags.join(", ") : ""));
    if (r.description) L.push("", r.description);
    if (r.import) L.push("", "```tsx\n" + r.import + "\n```");
    Object.keys(r.props).forEach((t) => { if (r.props[t].length) L.push("", (Object.keys(r.props).length > 1 ? "**" + t + "**\n\n" : "") + propsTable(r.props[t])); });
    if (r.figmaToReact.length){
      L.push("", "## Figma → React", "");
      if (r.liveMap) L.push(["| Figma | Playground | React | Nota |", "|---|---|---|---|"].concat(r.figmaToReact.map((m) => "| " + m.figma + " | " + m.playground + " | " + m.react + " | " + (m.note || "").replace(/\|/g, "\\|") + " |")).join("\n"));
      else L.push(r.figmaToReact.map((m) => "- **" + m.figma + "** (" + m.kind + ")" + (m.values ? ": " + Object.keys(m.values).map((k) => k + " → " + m.values[k]).join(", ") : "")).join("\n"));
    }
    if (r.checks.length) L.push("", "## Divergências Figma × React", "", r.checks.map((k) => "- [" + k.level + "] " + k.text).join("\n"));
    if (r.notes.length) L.push("", r.notes.map((n) => "> " + n).join("\n"));
  } else if (x.kind === "component") L.push("", "**No castanha-react:** sem componente equivalente (ainda).");
  if (x.tabs && x.tabs.length) L.push("", "## Docs", "", "Tabs: " + x.tabs.map((t) => "`" + t.id + "` (" + t.title + ")").join(", ") + ". Use a ferramenta `docs` para ler.");
  return L.join("\n");
}

// ---------- ferramentas ----------
const TOOLS = [
  { name: "listar_componentes", description: "Lista os componentes do Castanha DS (Caju), com categoria, status no Figma e se tem par no castanha-react. Filtros opcionais.",
    inputSchema: { type: "object", properties: { categoria: { type: "string", description: "Página do Figma, ex.: Buttons, Text Fields, Feedback" }, tipo: { type: "string", enum: ["component", "building-block", "resource", "composition", "todos"], description: "Padrão: component" } } },
    run: async (a) => { const c = await catalog(), tipo = a.tipo || "component";
      const list = c.components.filter((x) => (tipo === "todos" || x.kind === tipo || (tipo === "resource" && x.kind === "home")) && (!a.categoria || fold(x.category) === fold(a.categoria)));
      const cats = {}; list.forEach((x) => { (cats[x.category || "Recursos"] = cats[x.category || "Recursos"] || []).push(x); });
      return Object.keys(cats).sort().map((k) => "## " + k + "\n" + cats[k].map((x) => "- **" + x.name + "** (`" + x.id + "`)" + (x.react ? " → `<" + x.react.component + ">`" : "") + (x.figmaStatus ? " · Figma: " + x.figmaStatus : "")).join("\n")).join("\n\n") +
        (tipo === "component" && !a.categoria ? "\n\n## Só no castanha-react (sem Figma)\n" + c.reactOnly.map((r) => "- `<" + r.name + ">`" + (r.description ? " — " + r.description : "")).join("\n") : "") || "Nenhum componente com esse filtro."; } },
  { name: "componente", description: "Tudo sobre um componente do Castanha DS: descrição, links (Figma, Storybook, zeroheight), status no Figma, props no Figma, props do castanha-react (tipo, padrão, descrição), import, tradução Figma → React e divergências conhecidas.",
    inputSchema: { type: "object", properties: { nome: { type: "string", description: "id (ex.: main-button), nome (Main Button) ou componente React (Button)" } }, required: ["nome"] },
    run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
      if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ". Use `listar_componentes` ou `buscar`.";
      return componentSummary(c, x); } },
  { name: "docs", description: "Texto da documentação de um componente ou recurso do Castanha DS: uma tab (uso, anatomia, estilos, acessibilidade, diretrizes, motion, conteúdo…) ou todas.",
    inputSchema: { type: "object", properties: { nome: { type: "string", description: "id ou nome do componente/recurso" }, tab: { type: "string", description: "id ou título da tab; vazio = todas" } }, required: ["nome"] },
    run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
      if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ".";
      if (!x.tabs || !x.tabs.length) return x.name + " ainda não tem docs no playground.";
      const tabs = a.tab ? x.tabs.filter((t) => fold(t.id) === fold(a.tab) || fold(t.title) === fold(a.tab)) : x.tabs;
      if (!tabs.length) return "Tab \"" + a.tab + "\" não existe em " + x.name + ". Tabs: " + x.tabs.map((t) => t.id).join(", ") + ".";
      return (x.draft ? "> Docs em rascunho: ainda sem revisão do time.\n\n" : "") + tabs.map((t) => "# " + x.name + " · " + t.title + "\n\n" + t.text).join("\n\n---\n\n") + "\n\nFonte: " + pageUrl(c, x); } },
  { name: "buscar", description: "Busca livre no Castanha DS: componentes e docs, tokens, ícones e ilustrações. Use para perguntas como \"qual componente para filtros?\" ou \"ícone de cartão\".",
    inputSchema: { type: "object", properties: { texto: { type: "string" }, limite: { type: "number", description: "Padrão 8 por tipo" } }, required: ["texto"] },
    run: async (a) => { const c = await catalog(), n = a.limite || 8, q = a.texto;
      const comps = c.components.map((x) => [x, score(x._text, q) + score(x.name + " " + x.id, q) * 2]).filter((p) => p[1] > 0.5).sort((p, r) => r[1] - p[1]).slice(0, n);
      const toks = c.tokens.map((t) => [t, score(t.name + " " + t.group, q)]).filter((p) => p[1] > 0.5).sort((p, r) => r[1] - p[1]).slice(0, n);
      const ics = rankIcons(c, q, false).slice(0, n);
      const ills = rankIlls(c, q).slice(0, n);
      const L = [];
      if (comps.length) L.push("## Componentes e docs\n" + comps.map((p) => "- **" + p[0].name + "** (`" + p[0].id + "`, " + KIND[p[0].kind].toLowerCase() + ")" + (p[0].description ? " — " + p[0].description.slice(0, 140) : "")).join("\n"));
      if (toks.length) L.push("## Tokens\n" + toks.map((p) => "- `" + p[0].name + "`" + (p[0].light ? " = " + p[0].light : "") + (p[0].castanha ? " · React: `" + p[0].castanha + "`" : "")).join("\n"));
      if (ics.length) L.push("## Ícones\n" + ics.map((p) => "- `" + p[0].name + "` (" + p[0].category + ")" + (p[0].react ? " · `" + p[0].react.export + "`" : " · fora do castanha-icons")).join("\n"));
      if (ills.length) L.push("## Ilustrações\n" + ills.map((p) => "- `" + (p[0].react ? p[0].react.name : p[0].id) + "` (" + p[0].category + ")" + (p[0].description ? " — " + p[0].description.slice(0, 100) : "")).join("\n"));
      return L.join("\n\n") || "Nada encontrado para \"" + q + "\"."; } },
  { name: "tokens", description: "Tokens do Castanha DS (cores, tamanhos, raios, bordas, tipografia, opacidade, elevação, motion, grids): valor no claro e no escuro, por viewport, o nome no castanha-tokens (--castanha-*) ou se só existe no playground.",
    inputSchema: { type: "object", properties: { busca: { type: "string", description: "Parte do nome, ex.: text-intense, sizes-16, radius, accent" }, grupo: { type: "string", description: "colors, sizes, border, font, opacity, elevations, motion, grids, text-style, motion-style…" } } },
    run: async (a) => { const c = await catalog();
      let list = c.tokens.filter((t) => (!a.grupo || fold(t.group) === fold(a.grupo)) && (!a.busca || fold(t.name).indexOf(fold(a.busca).replace(/^--/, "")) !== -1));
      if (!list.length) return "Nenhum token. Grupos: " + Array.from(new Set(c.tokens.map((t) => t.group))).join(", ") + ".";
      const more = list.length > 80 ? "\n\n(" + (list.length - 80) + " a mais; refine a busca.)" : ""; list = list.slice(0, 80);
      return ["| Token | Claro | Escuro | No React |", "|---|---|---|---|"].concat(list.map((t) => "| `" + t.name + "` | " + (t.viewport ? "mobile " + t.viewport.mobile + " · tablet " + t.viewport.tablet + " · desktop " + t.viewport.desktop : (t.light || "—")) + " | " + (t.dark || "igual") + " | " + (t.castanha ? "`" + t.castanha + "`" : "só no playground") + " |")).join("\n") +
        "\n\nNo código: `var(--token)`. Viewport: Mobile < 744 ≤ Tablet < 1366 ≤ Desktop." + more; } },
  { name: "icone", description: "Busca ícones do [Caju] Icons por nome ou palavra-chave (pt/en) e devolve o nome, a categoria e o uso no castanha-react (<Icon name> ou import).",
    inputSchema: { type: "object", properties: { busca: { type: "string" }, incluir_deprecated: { type: "boolean" } }, required: ["busca"] },
    run: async (a) => { const c = await catalog();
      const list = rankIcons(c, a.busca, a.incluir_deprecated).slice(0, 15);
      if (!list.length) return "Nenhum ícone para \"" + a.busca + "\".";
      return list.map((p) => { const i = p[0]; return "- `" + i.name + "` · " + i.category + (i.deprecated ? " · deprecated" : "") + (i.keywords.length ? " · " + i.keywords.slice(0, 6).join(", ") : "") + "\n  " + (i.react ? "React: `<Icon name=\"" + i.name + "\" />` ou `" + i.react.import + "`" : "Fora do castanha-icons (não dá para usar no React pelo nome)."); }).join("\n"); } },
  { name: "ilustracao", description: "Busca ilustrações do [Caju] Illustrations por nome, categoria ou uso e devolve o nome no castanha-illustrations (que pode ser diferente do Figma) e o import.",
    inputSchema: { type: "object", properties: { busca: { type: "string" } }, required: ["busca"] },
    run: async (a) => { const c = await catalog();
      const list = rankIlls(c, a.busca).slice(0, 12);
      if (!list.length) return "Nenhuma ilustração para \"" + a.busca + "\".";
      return list.map((p) => { const i = p[0]; return "- Figma `" + i.id + "` · " + i.category + (i.description ? " — " + i.description.slice(0, 120) : "") + "\n  " + (i.react ? "React: `<Illustration name=\"" + i.react.name + "\" />`" + (i.react.renamed ? " (nome diferente do Figma)" : "") + (i.react.drawingDiffers ? " · desenho do pacote difere do Figma" : "") : "Fora do castanha-illustrations."); }).join("\n"); } },
  { name: "diretrizes", description: "Diretrizes gerais do Castanha DS: escrita e conteúdo (vocabulário, formatação de dados, escrita para produto), motion, ilustração, patterns, treinamento. Sem tema, lista o que existe.",
    inputSchema: { type: "object", properties: { tema: { type: "string", description: "ex.: conteudo, formatação de dados, motion, ilustração, patterns" } } },
    run: async (a) => { const c = await catalog(), res = c.components.filter((x) => (x.kind === "resource" || x.kind === "home") && x.tabs);
      if (!a.tema) return res.map((x) => "## " + x.name + " (`" + x.id + "`)\n" + x.tabs.map((t) => "- `" + t.id + "` " + t.title).join("\n")).join("\n\n") + "\n\nPeça com `tema` (ex.: \"formatação de dados\") ou use `docs`.";
      const hits = []; res.forEach((x) => x.tabs.forEach((t) => { const s = score(x.name + " " + t.title, a.tema) * 3 + score(t.text, a.tema); if (s > 0.6) hits.push([x, t, s]); }));
      if (!hits.length) return "Nada para \"" + a.tema + "\". Rode sem tema para ver a lista.";
      return hits.sort((p, r) => r[2] - p[2]).slice(0, 2).map((h) => "# " + h[0].name + " · " + h[1].title + "\n\n" + h[1].text).join("\n\n---\n\n"); } },
  { name: "divergencias", description: "O que está diferente entre Figma, castanha-react e o playground (lista CONFERIR e check da stack), geral ou de um componente. Use antes de implementar para saber o que ainda está em aberto.",
    inputSchema: { type: "object", properties: { nome: { type: "string", description: "id ou nome do componente; vazio = resumo geral" }, incluir_resolvidos: { type: "boolean" } } },
    run: async (a) => { const c = await catalog(), D = c.divergences;
      if (!a.nome){ const g = {}; D.conferir.filter((x) => a.incluir_resolvidos || !x.resolved).forEach((x) => { g[x.group] = (g[x.group] || 0) + 1; });
        const lv = {}; D.stack.forEach((f) => { lv[f.level] = (lv[f.level] || 0) + 1; });
        return "## CONFERIR (Figma × código)\n" + Object.keys(g).map((k) => "- " + k + ": " + g[k]).join("\n") + "\n\n## Check Figma × castanha-react × playground\n" + Object.keys(lv).map((k) => "- " + k + ": " + lv[k]).join("\n") + "\n\nPeça com `nome` para ver os itens de um componente."; }
      const x = findComponent(c, a.nome); if (!x) return "Não achei \"" + a.nome + "\".";
      const nm = fold(x.name), conf = D.conferir.filter((k) => (a.incluir_resolvidos || !k.resolved) && (fold(k.text).indexOf(nm) !== -1 || fold(k.text).indexOf(x.id) !== -1));
      const st = D.stack.filter((f) => f.id === x.id);
      return "# Divergências · " + x.name + "\n\n## CONFERIR\n" + (conf.map((k) => "- **" + k.id + "** (" + k.group + ") " + k.text).join("\n") || "Nenhum item.") + "\n\n## Check da stack\n" + (st.map((f) => "- [" + f.level + "] " + f.msg).join("\n") || "Nenhum item."); } }
  ,
  { name: "gerar_jsx", description: "Gera o JSX do castanha-react para um componente a partir das props como estão no Figma (ex.: {\"Appearance\": \"Inversed\", \"Show Lead Icon\": false, \"Text Label\": \"Salvar\"}). Mesmo código do painel \"No React\" do playground: import, hooks e props, omitindo o que é padrão do React.",
    inputSchema: { type: "object", properties: {
      nome: { type: "string", description: "id, nome ou componente React (ex.: main-button, Tag, Button)" },
      props_figma: { type: "object", description: "Props do Figma → valor (Variant: nome da opção; Boolean: true/false; Text: o texto; Instance swap: nome do ícone)", additionalProperties: true },
      atributos: { type: "object", description: "Avançado: atributos do web component do playground (ex.: {\"appearance\": \"inversed\"})", additionalProperties: true },
      itens: { description: "Para componentes com itens (abas, chips, listas): quantidade ou lista de atributos por item" } }, required: ["nome"] },
    run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
      if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ".";
      return "# " + x.name + " → `<" + ((x.react && x.react.component) || "?") + ">`\n\n" + await REACT.generate(c, x, a); } },
  { name: "revisar_codigo", description: "Revisa um trecho JSX/TSX que usa o castanha-react: componente inexistente ou sem import, prop inexistente, valor fora das opções, prop obrigatória faltando, ícone ou ilustração com nome errado, cor ou tamanho cru que tem token, e padrões do React diferentes do Figma.",
    inputSchema: { type: "object", properties: { codigo: { type: "string", description: "Trecho JSX/TSX (com os imports, se houver)" } }, required: ["codigo"] },
    run: async (a) => REACT.reviewText(await catalog(), a.codigo) }
];

// ---------- resources e prompts ----------
async function resourcesList(){ const c = await catalog(); return c.components.map((x) => ({ uri: "castanha://componente/" + x.id, name: x.name, description: (x.description || KIND[x.kind]).slice(0, 200), mimeType: "text/markdown" })); }
const TEMPLATES = [
  { uriTemplate: "castanha://componente/{id}", name: "Componente", description: "Resumo do componente (links, props, Figma → React)", mimeType: "text/markdown" },
  { uriTemplate: "castanha://docs/{id}/{tab}", name: "Docs de uma tab", description: "Texto de uma tab da documentação", mimeType: "text/markdown" }
];
async function resourceRead(uri){
  const c = await catalog(); let m = uri.match(/^castanha:\/\/componente\/([\w-]+)$/);
  if (m){ const x = findComponent(c, m[1]); if (!x) throw new Error("Componente não encontrado: " + m[1]); return componentSummary(c, x); }
  m = uri.match(/^castanha:\/\/docs\/([\w-]+)\/([\w-]+)$/);
  if (m){ const x = findComponent(c, m[1]), t = x && (x.tabs || []).find((y) => y.id === m[2]); if (!t) throw new Error("Tab não encontrada: " + uri); return "# " + x.name + " · " + t.title + "\n\n" + t.text; }
  throw new Error("URI desconhecida: " + uri);
}
const PROMPTS = [
  { name: "implementar-tela", description: "Implementar uma tela ou fluxo usando só componentes e tokens do Castanha DS no castanha-react.", arguments: [{ name: "descricao", description: "O que a tela faz", required: true }],
    text: (a) => "Implemente a tela abaixo com o Castanha DS (castanha-react). Regras: use só componentes e tokens do DS; antes de usar um componente, consulte `componente` (props, padrões e tradução Figma → React) e `divergencias`; gere o JSX de cada componente com `gerar_jsx` a partir das props do Figma; no fim, passe o código por `revisar_codigo`; ícones com `icone`, ilustrações com `ilustracao`; textos seguindo `diretrizes` (conteúdo). Se algo não existir no DS, diga em vez de inventar.\n\nTela: " + a.descricao },
  { name: "revisar-handoff", description: "Revisar o handoff de um componente: Figma × docs × castanha-react.", arguments: [{ name: "componente", description: "id ou nome", required: true }],
    text: (a) => "Revise o handoff do componente \"" + a.componente + "\" no Castanha DS. Use `componente`, `docs` e `divergencias`: compare as props do Figma com as do castanha-react, aponte padrões diferentes, valores sem tradução, docs em rascunho e itens abertos no CONFERIR. Termine com uma lista curta do que precisa de decisão do time." },
  { name: "escrever-texto", description: "Escrever ou revisar texto de interface seguindo as diretrizes de conteúdo da Caju.", arguments: [{ name: "texto", description: "Texto ou contexto da tela", required: true }],
    text: (a) => "Escreva ou revise o texto abaixo seguindo as diretrizes de conteúdo do Castanha DS (use `diretrizes` com os temas vocabulário, formatação de dados e escrita para produto, e a tab de conteúdo do componente com `docs`). Explique cada mudança em uma linha.\n\n" + a.texto }
];

// ---------- MCP: uma mensagem JSON-RPC → resposta (ou null para notificação) ----------
const ok = (id, result) => ({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });
async function handleMessage(m){
  if (!m || m.jsonrpc !== "2.0" || typeof m.method !== "string") return fail(m && m.id !== undefined ? m.id : null, -32600, "Requisição inválida");
  const p = m.params || {}, isNote = m.id === undefined;
  try {
    switch (m.method){
      case "initialize":
        return ok(m.id, { protocolVersion: p.protocolVersion || "2025-06-18", capabilities: { tools: {}, resources: {}, prompts: {} },
          serverInfo: { name: "castanha-ds", title: "Castanha DS", version: VERSION },
          instructions: "Fonte do Castanha DS (design system da Caju): componentes, docs, props do Figma e do castanha-react, tokens, ícones, ilustrações, diretrizes de conteúdo e divergências. Consulte antes de criar ou revisar interface com o DS; não invente componentes, props ou tokens." });
      case "ping": return ok(m.id, {});
      case "tools/list": return ok(m.id, { tools: TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: { readOnlyHint: true } })) });
      case "tools/call": {
        const t = TOOLS.find((x) => x.name === p.name);
        if (!t) return fail(m.id, -32602, "Ferramenta desconhecida: " + p.name);
        try { return ok(m.id, { content: [{ type: "text", text: await t.run(p.arguments || {}) }] }); }
        catch (e){ return ok(m.id, { content: [{ type: "text", text: "Erro: " + e.message }], isError: true }); }
      }
      case "resources/list": return ok(m.id, { resources: await resourcesList() });
      case "resources/templates/list": return ok(m.id, { resourceTemplates: TEMPLATES });
      case "resources/read": try { return ok(m.id, { contents: [{ uri: p.uri, mimeType: "text/markdown", text: await resourceRead(p.uri) }] }); } catch (e){ return fail(m.id, -32002, e.message); }
      case "prompts/list": return ok(m.id, { prompts: PROMPTS.map((x) => ({ name: x.name, description: x.description, arguments: x.arguments })) });
      case "prompts/get": { const x = PROMPTS.find((y) => y.name === p.name); if (!x) return fail(m.id, -32602, "Prompt desconhecido: " + p.name);
        return ok(m.id, { description: x.description, messages: [{ role: "user", content: { type: "text", text: x.text(p.arguments || {}) } }] }); }
      default: return isNote ? null : fail(m.id, -32601, "Método não suportado: " + m.method); // notificações (sem id) não têm resposta
    }
  } catch (e){ return isNote ? null : fail(m.id, -32603, e.message); }
}

// ---------- transporte HTTP (Streamable HTTP, só respostas JSON) como handler `fetch` padrão da web ----------
// Serve para Node 18+ (abaixo, --http), Cloudflare Workers, Deno, Vercel/Netlify Edge: recebe um Request, devolve um Response.
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version" };
async function handleRequest(req){
  const url = new URL(req.url), json = (body, status) => new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json" }, CORS) });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!/\/mcp\/?$/.test(url.pathname)){
    if (req.method === "GET") return new Response("MCP do Castanha DS v" + VERSION + " · endpoint: POST " + url.origin + "/mcp\n", { headers: Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, CORS) });
    return new Response("Não encontrado", { status: 404, headers: CORS });
  }
  if (req.method === "GET") return new Response(null, { status: 405, headers: Object.assign({ Allow: "POST" }, CORS) }); // sem stream SSE: só respostas JSON
  if (req.method !== "POST") return new Response(null, { status: 405, headers: Object.assign({ Allow: "POST" }, CORS) });
  let body; try { body = await req.json(); } catch (e){ return json(fail(null, -32700, "JSON inválido"), 400); }
  const msgs = Array.isArray(body) ? body : [body], out = (await Promise.all(msgs.map(handleMessage))).filter(Boolean);
  if (!out.length) return new Response(null, { status: 202, headers: CORS }); // só notificações
  return json(Array.isArray(body) ? out : out[0]);
}

module.exports = { TOOLS, catalog, resourceRead, handleMessage, handleRequest, main, VERSION };
/** Sobe o servidor: stdio (padrão) ou HTTP com --http [porta]. */
function main(){
  const http = process.argv.indexOf("--http");
  if (http > 0){
    // servidor HTTP local: node mcp/server.js --http [porta] → http://127.0.0.1:<porta>/mcp
    const port = parseInt(process.argv[http + 1], 10) || 8787, host = process.env.HOST || "127.0.0.1";
    require("http").createServer(async (req, res) => {
      const chunks = []; for await (const c of req) chunks.push(c);
      const r = await handleRequest(new Request("http://" + (req.headers.host || host) + req.url, { method: req.method, headers: req.headers, body: /^(GET|HEAD|OPTIONS)$/.test(req.method) ? undefined : Buffer.concat(chunks) }));
      res.writeHead(r.status, Object.fromEntries(r.headers.entries())); res.end(Buffer.from(await r.arrayBuffer()));
    }).listen(port, host, () => process.stderr.write("MCP do Castanha DS em http://" + host + ":" + port + "/mcp\n"));
  } else {
    // stdio: uma mensagem JSON-RPC por linha (stdout só para o protocolo)
    const send = (msg) => { if (msg) process.stdout.write(JSON.stringify(msg) + "\n"); };
    require("readline").createInterface({ input: process.stdin }).on("line", (line) => {
      if (!line.trim()) return;
      let m; try { m = JSON.parse(line); } catch (e){ return send(fail(null, -32700, "JSON inválido")); }
      handleMessage(m).then(send);
    });
  }
}
if (typeof require !== "undefined" && require.main === module) main();
