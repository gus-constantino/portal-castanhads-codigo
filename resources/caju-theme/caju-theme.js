/* Recurso de suporte — Caju Theme (Zx9KwwRFqZrOfeuXpYZiTx): tokens Common/*, text styles, elevations e Motion Styles,
   mais as libs de apoio [Caju] Icons e [Caju] Illustrations (antes recursos separados; as rotas antigas redirecionam).
   Mostruário no estilo da página Caju Benefícios (4309:2) — Colors, Font, Borders, Sizes, Elevations, Opacity, Motion —
   adaptado para web responsivo. Os valores vêm ao vivo de styles/tokens.css (bloco `tokens`, scripts/tokens-kit.js). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Zx9KwwRFqZrOfeuXpYZiTx/-Caju--Theme?node-id=4309-2";
  CDS.register({ id: "caju-theme", name: "Caju Theme", resource: true, order: 1, status: "250", figma: FIGMA });
  // Rotas antigas de Ícones e Ilustrações → tabs do Caju Theme (links salvos continuam funcionando)
  var MOVED = { "caju-icons": "icones", "caju-illustrations": "ilustracoes" };
  function moved(){ var m = (location.hash || "").match(/^#\/(caju-icons|caju-illustrations)(?:\/([\w-]+))?/); if (m) location.replace("#/caju-theme/" + MOVED[m[1]]); }
  moved(); window.addEventListener("hashchange", moved);
  var A = window.CDS.assets || {};
  var nIcons = (A.iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; }).reduce(function(t, b){ return t + b.icons.length; }, 0);
  var nIlls = (A.illustrations || []).length, nCats = (A.illustrationBuckets || []).length;
  var LIVE = "Os valores são lidos ao vivo dos tokens do playground: troque o tema (ícone de lua no topo) para ver os valores do dark. Clique numa amostra para copiar a variável CSS.";
  CDS.docs["caju-theme"] = {
    source: FIGMA, sourceLabel: "Abrir o Caju Theme no Figma",
    tabs: [
      { id: "cores", title: "Cores", blocks: [
        { h2: "Cores" },
        { p: "Tokens de cor `Common/Colors/*`, por família. " + LIVE },
        { tokens: "colors" }
      ] },
      { id: "tipografia", title: "Tipografia", blocks: [
        { h2: "Font" },
        { p: "Primitivos de tipografia `Common/Font/*`: família, tamanho, altura de linha e peso." },
        { tokens: "font" },
        { h2: "Text styles" },
        { p: "Os estilos de texto combinam os primitivos e são aplicados com o shorthand `font: var(--text-style-…)`." },
        { tokens: "text-styles" }
      ] },
      { id: "bordas", title: "Bordas", blocks: [
        { h2: "Borders" },
        { p: "Raio (`Common/Border/Radius/*`) e espessura (`Common/Border/Width/*`)." },
        { tokens: "radius" },
        { tokens: "width" }
      ] },
      { id: "tamanhos", title: "Tamanhos", blocks: [
        { h2: "Sizes" },
        { p: "Escala `Common/Sizes/*`, usada em espaçamentos, gaps e dimensões." },
        { tokens: "sizes" }
      ] },
      { id: "elevacao", title: "Elevação e opacidade", blocks: [
        { h2: "Elevations" },
        { p: "Sombras `Common/Elevation/level 1–3` (x · y · blur · spread · cor)." },
        { tokens: "elevation" },
        { h2: "Opacity" },
        { p: "Níveis `Common/Opacity/*`. Como no Figma, cada amostra compara imagem e cor sólida (`Accent/Solid/medium`) sob uma camada `Support/darker` na opacidade do token." },
        { tokens: "opacity" }
      ] },
      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Duração, easing e delay definem cada momento de interação. Os componentes usam os Motion Styles (`/01`), que descem a cascata até os primitivos `Common/Motion/*`. Baseado no explicador castanhads-motion, refeito com os componentes do Castanha DS." },
        { tokens: "motion-live" },
        { tokens: "easing-lab" },
        { h2: "Referência" },
        { p: "Primitivos `Common/Motion/*`. Passe o mouse ou clique para ver cada um em movimento; \"Tocar todas\" compara a lista inteira." },
        { tokens: "duration" },
        { tokens: "delay" },
        { tokens: "easing" }
      ] },
      { id: "icones", title: "Ícones", blocks: [
        { h2: "Ícones" },
        { p: "[Caju] Icons, na ordem e nas categorias do Figma: " + nIcons + " ícones de 24px, um vetor só e cor herdada do token (`Icons/*`). Passe o mouse para ver as palavras-chave; clique para copiar o nome." },
        { iconGallery: {} },
        { h2: "Deprecated" },
        { p: "Ícones do frame [Deprecated] do Figma. Os arquivos continuam no repo, mas não aparecem no instance swap dos componentes." },
        { iconGallery: { only: "deprecated" } },
        { h3: "Como usar" },
        { ul: [
          "O [Caju] Icons é a fonte dos desenhos; o componente Icon (`<cds-icon icon=\"credit-card-line\">`) aplica tamanho, Appearance e cor.",
          "Arquivos em `assets/icons/<categoria>/<nome>.svg`, catálogo em `assets/icons/catalog.json`.",
          "Atualizar: exportar do Figma (receita em `docs/ARCHITECTURE.md` §8) e rodar `node scripts/build-assets.js`.",
          "Glifos internos de componentes (ex.: o check do Checkbox) não são da lib: ficam em `assets/icons/_glyphs/`."
        ] }
      ] },
      { id: "ilustracoes", title: "Ilustrações", blocks: [
        { h2: "Ilustrações" },
        { p: "[Caju] Illustrations, na ordem e nas categorias do Figma: " + nIlls + " ilustrações em " + nCats + " categorias (Caju UI 200×200 e Hero). Passe o mouse para ver o nome no Figma e o tamanho; clique para copiar o nome." },
        { illustrationGallery: {} },
        { h3: "Como usar" },
        { ul: [
          "Quem usa a ilustração é o componente: Banner (`<cds-banner illustration=\"notificacoes/sino\">`) e Table (Kind=Empty, `notificacoes/empty-state`).",
          "Nome `<categoria>/<nome>`; só `<nome>` também funciona (pega a primeira categoria).",
          "Arquivos em `assets/illustrations/<categoria>/<nome>.svg`, catálogo em `assets/illustrations/catalog.json`.",
          "Atualizar: exportar SVG das páginas Caju UI e Hero, rodar `python3 scripts/dev/import-illustrations.py <pasta> <listing.tsv>` e `node scripts/build-assets.js`.",
          "A página Cartões do Figma é o componente Caju Card: as artes dele ficam em `assets/caju-card/` (D65)."
        ] },
        { note: "Nomes repetidos no Figma (ex.: três `moeda-verde-pilha-2` em Finanças) ganharam sufixo `-1`, `-2` no repo. Estão no CONFERIR para corrigir na origem." }
      ] },
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Caju Theme" },
        { p: "Fonte de tudo que os componentes usam por baixo: tokens (cores, tipografia, bordas, tamanhos, elevações, opacidade e motion, em light e dark), ícones e ilustrações." },
        { h3: "O que tem" },
        { ul: ["250 tokens `Common/*` (89 com valor dark)", "34 text styles, incluindo Decorative em Work Sans", "3 elevações (`Elevation/level 1–3`)", "15 variáveis de Motion Styles (`.Motion Styles`, modo Normal)"] },
        { h3: "No repo" },
        { ul: ["Snapshot: `tokens/figma-snapshot.json`", "Gerado: `styles/tokens.css`", "Tema escuro: `html[data-theme=\"dark\"]`"] },
        { h3: "Atualizar" },
        { ol: ["Atualizar o snapshot a partir do Figma", "Rodar `node scripts/build-tokens.js`"] },
        { h3: "Nomenclatura no código" },
        { ul: [
          "`Common/Colors/Text/intense` → `--common-colors-text-intense`",
          "`Label/Medium Label` → `--text-style-label-medium` (shorthand `font`)",
          "`Hover In/01/Timing` → `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`"
        ] },
        { note: "A página Caju Benefícios do Figma mostra a paleta primitiva da marca (ex.: Decorative 01–06, Overlay). Aqui aparecem os tokens `Common/*` que os componentes usam — é a camada semântica que aponta para essa paleta." }
      ] }
    ]
  };
})();
