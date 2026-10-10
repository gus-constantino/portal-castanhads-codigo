#!/usr/bin/env node
/**
 * Importa as páginas de documentação do Storybook do castanha-react (D305) e o Getting Started do Widgetbook do
 * castanha_flutter (D311) para o portal.
 * React: clone ../castanha (só leitura), ramo origin/staging, packages/castanha-react/src/docs/**.mdx.
 * Flutter: clone ../castanha-mobile (só leitura), origin/main, packages/castanha-flutter/example/lib/stories/getting_started/
 *   getting_started.dart. Cada docsPage('NN. Nome', [...]) vira uma página: _PageTitle é a capa, _LeadText o 1º parágrafo e cada
 *   MarkdownDocBlock(description: _const) é Markdown com a mesma sintaxe do Storybook.
 * Saída: resources/desenvolvimento/desenvolvimento.js — GERADO, não editar à mão. Rodar de novo quando o Storybook mudar:
 *   node scripts/dev/import-storybook.js
 *
 * Converte o subconjunto de MDX que as páginas usam em blocos do docs-kit: ## e ### (h2, h3), parágrafos, listas com ↳ (ul),
 * blocos de código e <pre> (code), citações (note, ou alert com rótulo quando começam com **Nota**:), links.
 * O texto é o do Storybook. O docs-kit não formata negrito nem itálico: os marcadores saem e o texto fica.
 * Links internos do Storybook (?path=/docs/…) viram rotas do portal; âncoras da própria página viram texto.
 * Páginas que dependem de componentes do Storybook (HomePage, TokensTable, ComponentsGallery) não entram: o portal tem
 * o equivalente (Comece aqui feito à mão aqui embaixo, Tema Caju, Componentes).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const REPO = path.join(ROOT, "..", "castanha");
const REF = "origin/staging";
const BASE = "packages/castanha-react/src/docs/";
const OUT = path.join(ROOT, "resources", "desenvolvimento", "desenvolvimento.js");

// Páginas do portal. Cada página tem uma ou mais tabs vindas de arquivos MDX
const PAGES = [
  { id: "comece-aqui", name: "Comece aqui", tabs: [
    { id: "visao", title: "Comece aqui", manual: true },
    { id: "diferenciais", title: "Diferenciais", file: "about/differentials" },
    { id: "acessibilidade", title: "Acessibilidade", file: "about/accessibility" },
    { id: "faq", title: "FAQ de desenvolvimento", file: "about/faq" }
  ] },
  // React (castanha-react): Storybook
  { id: "dev-instalacao", platform: "react", name: "Instalação", tabs: [{ id: "instalacao", title: "Instalação", file: "getting-started/installation" }] },
  { id: "dev-ambiente", platform: "react", name: "Preparando o ambiente", tabs: [{ id: "ambiente", title: "Preparando o ambiente", file: "getting-started/configuration" }] },
  { id: "dev-pacotes", platform: "react", name: "Usando os pacotes", tabs: [{ id: "pacotes", title: "Usando os pacotes", file: "getting-started/usage" }] },
  { id: "dev-formularios", platform: "react", name: "Formulários", tabs: [{ id: "formularios", title: "Formulários", file: "guides/forms" }] },
  { id: "dev-hooks", platform: "react", name: "Hooks", tabs: [{ id: "hooks", title: "Hooks", file: "guides/hooks" }] },
  { id: "dev-assets", platform: "react", name: "Assets e cacheamento", tabs: [{ id: "assets", title: "Assets e cacheamento", file: "guides/caching" }] },
  { id: "dev-grid", platform: "react", name: "Grid e breakpoints", tabs: [{ id: "grid", title: "Grid e breakpoints", file: "guides/grid" }] },
  { id: "dev-tokens", platform: "react", name: "Design tokens", tabs: [
    { id: "visao", title: "Visão geral", file: "design-tokens/overview", after: [{ note: "Os valores de cada token (cores, tamanhos, bordas, opacidade, elevação e tipografia) estão em [Tema Caju](#/caju-theme), lidos do Figma." }] },
    { id: "fonte", title: "Fonte da verdade", file: "design-tokens/source-of-truth" }
  ] },
  { id: "dev-universe", platform: "react", name: "Castanha Universe", tabs: [
    { id: "intellisense", title: "Intellisense", file: "castanha-universe/intellisense" },
    { id: "castoken", title: "Castoken", file: "castanha-universe/castoken" },
    { id: "optimizer", title: "Optimizer", file: "castanha-universe/optimizer" }
  ] },
  // Flutter (castanha_flutter): Getting Started do Widgetbook, pelo nome da docsPage
  { id: "flutter-instalacao", platform: "flutter", name: "Instalação", tabs: [{ id: "instalacao", title: "Instalação", widgetbook: "01. Instalação" }] },
  { id: "flutter-ambiente", platform: "flutter", name: "Preparando o ambiente", tabs: [{ id: "ambiente", title: "Preparando o ambiente", widgetbook: "02. Preparando o ambiente" }] },
  { id: "flutter-componentes", platform: "flutter", name: "Usando os componentes", tabs: [{ id: "componentes", title: "Usando os componentes", widgetbook: "03. Usando os componentes" }] }
];

// Comece aqui (tab feita à mão): o conteúdo da HomePage do Storybook, com os destinos do portal no lugar dos externos quando existem
const START = [
  { p: "Desenvolvido para conectar ideias, pessoas e experiências, o Castanha é o Design System da Caju. Ele une design e código para que os produtos do nosso Cajueiro expressem consistência e propósito." },
  { h2: "Comece por aqui" },
  { shortcuts: { bento: 3, items: [
    { title: "Componentes", text: "Os componentes do Castanha DS com Playground ao vivo, documentação de uso e o código React de cada um.", href: "#/main-button", cta: "Acessar componentes", illustration: "interfaces/customizacao" },
    { title: "Foundations", text: "Princípios visuais do sistema: cores, tipografia e espaçamentos.", href: "#/caju-theme", cta: "Acessar Tema Caju", illustration: "interfaces/home" },
    { title: "Design tokens", text: "Como usar tokens de design no código e no Figma.", href: "#/dev-tokens", cta: "Acessar design tokens", illustration: "dispositivos/notebook-relatorios" }
  ] } },
  { h2: "Para desenvolver" },
  { cards: [
    { title: "React (castanha-react)", text: "Instalação, ambiente, uso dos pacotes, guias, design tokens e Castanha Universe. [Acessar a Instalação no React](#/dev-instalacao)" },
    { title: "Flutter (castanha_flutter)", text: "Instalação pelo commons ou direta, tema, tokens e uso dos componentes. [Acessar a Instalação no Flutter](#/flutter-instalacao)" }
  ] },
  { h2: "Recursos e ferramentas" },
  { cards: [
    { title: "Releases", text: "Novidades, correções e melhorias a cada versão. [Acessar o Changelog](#/changelog)" },
    { title: "Widgetbook", text: "Playground interativo dos componentes Flutter. [Abrir o Widgetbook](https://castanha-staging-flutter.caju.com.br/)" },
    { title: "Storybook", text: "Os componentes React do castanha-react. [Abrir o Storybook](https://castanha-staging.caju.com.br/)" },
    { title: "Canal de suporte", text: "Tire dúvidas e receba suporte no #castanha-suporte do Slack. [Abrir o canal](https://caju.slack.com/archives/C07NM4UQ2S3)" }
  ] }
];

function git(file){ return execFileSync("git", ["-C", REPO, "show", REF + ":" + BASE + file + ".mdx"], { encoding: "utf8" }); }

// Widgetbook (Flutter): lê a docsPage pelo nome e junta a lead e os blocos Markdown, na ordem
const FLUTTER_REPO = path.join(ROOT, "..", "castanha-mobile"), FLUTTER_REF = "origin/main";
const FLUTTER_FILE = "packages/castanha-flutter/example/lib/stories/getting_started/getting_started.dart";
const TQ = "'''"; // aspas triplas das strings brutas do Dart (r'''…''')
let flutterSrc = null;
function dartStrings(src){ return (src.match(/'((?:[^'\\]|\\.)*)'/g) || []).map((x) => x.slice(1, -1).replace(/\\'/g, "'")).join(""); }
function widgetbook(name){
  if (flutterSrc == null) flutterSrc = execFileSync("git", ["-C", FLUTTER_REPO, "show", FLUTTER_REF + ":" + FLUTTER_FILE], { encoding: "utf8" });
  const start = flutterSrc.indexOf("'" + name + "'");
  if (start < 0) throw new Error("Widgetbook: página não encontrada: " + name);
  const body = flutterSrc.slice(start, flutterSrc.indexOf("\n);", start));
  const title = (body.match(/_PageTitle\(([\s\S]*?)\)/) || [])[1];
  const lead = (body.match(/_LeadText\(([\s\S]*?)\),/) || [])[1];
  const md = lead ? [dartStrings(lead)] : [];
  body.replace(/MarkdownDocBlock\(description:\s*(_\w+)\)/g, (all, id) => {
    const at = flutterSrc.indexOf("const " + id + " = r" + TQ);
    if (at < 0) return all;
    const from = at + ("const " + id + " = r" + TQ).length;
    md.push(flutterSrc.slice(from, flutterSrc.indexOf(TQ, from)));
    return all;
  });
  return { title: title ? dartStrings(title) : name.replace(/^\d+\.\s*/, ""), md: md.join("\n\n") };
}
function storyId(title){ return title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\./g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

// Mapa: id da story do Storybook → rota do portal
const ROUTES = { "components-icon": "#/icon" };
PAGES.forEach((p) => p.tabs.forEach((t) => {
  if (!t.file) return;
  const m = git(t.file).match(/<Meta\s+title=["']([^"']+)["']/);
  if (m) ROUTES[storyId(m[1])] = "#/" + p.id + (t === p.tabs[0] ? "" : "/" + t.id);
}));

function inline(s){
  // links: [texto](alvo)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (all, text, href) => {
    text = plain(text);
    const m = href.match(/(?:\?path=|^)\/?docs\/([a-z0-9-]+?)--docs/);
    if (m) return ROUTES[m[1]] ? `[${text}](${ROUTES[m[1]]})` : text;
    if (/^https?:\/\//.test(href)) return `[${text}](${href})`;
    return text; // âncora da própria página ou caminho desconhecido
  });
  return plain(s);
}
// tira negrito e itálico fora de `código`
function plain(s){
  // ** fora de `código` sai (o negrito pode abraçar um trecho de código)
  let out = "", code = false;
  for (let i = 0; i < s.length; i++){
    if (s[i] === "`") code = !code;
    if (!code && s[i] === "*" && s[i + 1] === "*"){ i++; continue; }
    out += s[i];
  }
  s = out;
  return s.split(/(`[^`]*`)/).map((part) => /^`/.test(part) ? part : part.replace(/(^|[^\w])_([^_\n]+?)_(?=[^\w]|$)/g, "$1$2")).join("");
}

function convert(src){
  let body = src.replace(/^(?:[ \t]*(?:import [^\n]*)?\n)*/, "").replace(/<Meta[^>]*\/>/g, ""); // só os imports do topo (os dos exemplos de código ficam)
  const title = (body.match(/<DocsPage\s+title=["']([^"']+)["']/) || [])[1] || "";
  body = body.replace(/<DocsPage[^>]*>/, "").replace(/<\/DocsPage>/, "").replace(/<div id="[^"]*"\s*\/>/g, "");
  // <pre style={…}>{`…`}</pre> → bloco de código
  body = body.replace(/<pre[\s\S]*?>\{`([\s\S]*?)`\}<\/pre>/g, (all, code) => "```\n" + code.replace(/^\s{2}(?=[│┌└├▼ ])/gm, "") + "\n```");
  const lines = body.split("\n"), blocks = [];
  let para = [], list = null;
  function flush(){
    if (para.length){ blocks.push({ p: inline(para.join(" ").trim()) }); para = []; }
    if (list){ blocks.push({ ul: list }); list = null; }
  }
  for (let i = 0; i < lines.length; i++){
    const raw = lines[i], l = raw.trim();
    if (/^```/.test(l)){
      flush();
      const code = [];
      for (i++; i < lines.length && !/^\s*```/.test(lines[i]); i++) code.push(lines[i]);
      const indent = Math.min(...code.filter((x) => x.trim()).map((x) => x.match(/^ */)[0].length));
      blocks.push({ code: code.map((x) => x.slice(isFinite(indent) ? indent : 0)).join("\n").replace(/\*\\\//g, "*/") });
      continue;
    }
    if (!l || l === "---"){ flush(); continue; }
    let m;
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))){ flush(); blocks.push({ [m[1].length === 2 ? "h2" : "h3"]: plain(m[2]) }); continue; }
    if ((m = l.match(/^>\s?(.*)$/))){
      flush();
      const q = [m[1]];
      while (i + 1 < lines.length && /^\s*>/.test(lines[i + 1])) q.push(lines[++i].trim().replace(/^>\s?/, ""));
      const text = q.join(" ").trim(), lab = text.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
      blocks.push(lab && lab[2] ? { alert: { appearance: "informative", label: lab[1].replace(/:$/, ""), text: inline(lab[2]) } } : { note: inline(text) });
      continue;
    }
    if ((m = l.match(/^[-*]\s+(?:↳\s*)?(.*)$/))){
      if (para.length){ blocks.push({ p: inline(para.join(" ").trim()) }); para = []; }
      (list = list || []).push(inline(m[1]).replace(/;$/, ""));
      continue;
    }
    if (list){ blocks.push({ ul: list }); list = null; }
    para.push(l);
  }
  flush();
  return { title: plain(title), blocks };
}

const out = { pages: [] };
PAGES.forEach((p) => {
  const page = { id: p.id, name: p.name, platform: p.platform || null, tabs: [] };
  p.tabs.forEach((t) => {
    if (t.manual){ page.tabs.push({ id: t.id, title: t.title, blocks: START }); return; }
    if (t.widgetbook){
      const w = widgetbook(t.widgetbook), wc = convert(w.md);
      if (!page.lede) page.lede = w.title;
      page.tabs.push({ id: t.id, title: t.title, source: "widgetbook: " + t.widgetbook, blocks: wc.blocks.concat(t.after || []) });
      return;
    }
    const c = convert(git(t.file));
    if (!page.lede) page.lede = c.title;
    page.tabs.push({ id: t.id, title: t.title, source: t.file, blocks: c.blocks.concat(t.after || []) });
  });
  if (p.id === "comece-aqui") page.lede = "Tudo o que você precisa para começar a usar o Castanha";
  out.pages.push(page);
});

const head = `/* GERADO por scripts/dev/import-storybook.js a partir do Storybook do castanha-react (${REF}) e do Widgetbook do
   castanha_flutter (${FLUTTER_REF}). Não editar à mão.
   Páginas de desenvolvimento por plataforma (platform: react ou flutter) e o Comece aqui (Sobre o Castanha).
   O texto é o das fontes; divergências com o guia de Conteúdo ficam no CONFERIR. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var SB = "https://castanha-staging.caju.com.br/", WB = "https://castanha-mobile.caju.com.br/";
  var DATA = ${JSON.stringify(out, null, 1)};
  DATA.pages.forEach(function(p, i){
    CDS.register({ id: p.id, name: p.name, resource: true, platform: p.platform || undefined, order: 40 + i, lede: p.lede, description: p.lede });
    CDS.docs[p.id] = p.platform === "flutter" ? { source: WB, sourceLabel: "Widgetbook do castanha_flutter", tabs: p.tabs } : { source: SB, sourceLabel: "Storybook do castanha-react", tabs: p.tabs };
  });
})();
`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, head);
console.log("Storybook e Widgetbook → " + path.relative(ROOT, OUT) + " · " + out.pages.length + " páginas · " + out.pages.reduce((n, p) => n + p.tabs.length, 0) + " tabs · rotas do Storybook mapeadas: " + Object.keys(ROUTES).length);
