/* Recurso de suporte — Caju Theme (Zx9KwwRFqZrOfeuXpYZiTx): tokens Common/*, text styles, elevations e Motion Styles.
   Mostruário no estilo da página Caju Benefícios (4309:2) — Colors, Font, Borders, Sizes, Elevations, Opacity, Motion —
   adaptado para web responsivo. Os valores vêm ao vivo de styles/tokens.css (bloco `tokens`, scripts/tokens-kit.js). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Zx9KwwRFqZrOfeuXpYZiTx/-Caju--Theme?node-id=4309-2";
  CDS.register({ id: "caju-theme", name: "Caju Theme (tokens)", resource: true, order: 3, status: "250", figma: FIGMA });
  var LIVE = "Os valores são lidos ao vivo dos tokens do playground: troque o tema (ícone de lua no topo) para ver os valores do dark. Passe o mouse numa amostra para ver o nome da variável CSS.";
  CDS.docs["caju-theme"] = {
    source: FIGMA, sourceLabel: "Abrir o Caju Theme no Figma",
    tabs: [
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Caju Theme" },
        { p: "Fonte dos tokens que todos os componentes usam: cores, tipografia, bordas, tamanhos, elevações, opacidade e motion, em light e dark." },
        { specs: [
          { title: "Conteúdo", rows: [["Tokens", "250 `Common/*` (89 com valor dark)"], ["Text styles", "34, incluindo Decorative em Work Sans"], ["Elevations", "3 (`Elevation/level 1–3`)"], ["Motion Styles", "15 variáveis `.Motion Styles` (modo Normal)"]] },
          { title: "No repo", rows: [["Snapshot", "`tokens/figma-snapshot.json`"], ["Gerado", "`styles/tokens.css`"], ["Tema", "`html[data-theme=\"dark\"]`"]] },
          { title: "Atualizar", rows: [["1", "Atualizar o snapshot a partir do Figma"], ["2", "`node scripts/build-tokens.js`"]] }
        ] },
        { h3: "Nomenclatura no código" },
        { ul: [
          "`Common/Colors/Text/intense` → `--common-colors-text-intense`",
          "`Label/Medium Label` → `--text-style-label-medium` (shorthand `font`)",
          "`Hover In/01/Timing` → `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`"
        ] },
        { note: "A página Caju Benefícios do Figma mostra a paleta primitiva da marca (ex.: Decorative 01–06, Overlay). Aqui aparecem os tokens `Common/*` que os componentes usam — é a camada semântica que aponta para essa paleta." }
      ] },
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
        { p: "Níveis `Common/Opacity/*`, mostrados sobre `Accent/Solid/medium`." },
        { tokens: "opacity" }
      ] },
      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Primitivos `Common/Motion/*`: duração, delay e curvas. Os componentes usam os Motion Styles (`/01`), que apontam para eles." },
        { tokens: "duration" },
        { tokens: "delay" },
        { tokens: "easing" },
        { h2: "Motion Styles" },
        { tokens: "motion-styles" }
      ] }
    ]
  };
})();
