/* Documentação — .Head (building block)
   Sem description no set (05/10); a página Table Columns do zeroheight (795cef) fala das colunas em conjunto. Texto escrito a partir do set da lib estável (.Head 13382:1327) e do playground.
   Peça interna do Table; não é usada sozinha. Revisar com o time (C147). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["table-head"] = {
    tag: "cds-table-head",
    base: { "text-head": "Nome" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13382-1327", sourceLabel: "Abrir o .Head no Figma",
    cover: { description: "Título de coluna da Table, com ordenação.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: [{ _tag: "cds-table-head", kind: "multi-selection" }, { _tag: "cds-table-head", "text-head": "Nome", sort: "up" }, { _tag: "cds-table-head", "text-head": "Saldo" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Head é o título de cada coluna da Table: 56 de altura, fundo Surface/01, Caption/Medium. Sort mostra a ordenação (up-line ou down-line). Kind=Multi Selection é o Checkbox que seleciona todas as linhas." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Table, que monta e controla os itens.", "Fora dele, use o componente completo (Table)."] },
        { compare: [{ title: "Dentro do Table", attrs: { _tag: "cds-table", "per-page": "3", "show-pagination": false, "show-toolbar": false } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { "text-head": "Nome", sort: "up" }, markers: [{ n: 1, target: ".cds-th__text", side: "left" }, { n: 2, target: ".cds-th__sort", side: "right" }], legend: ["Text Head", "Ícone de ordenação (Sort)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Multi Selection"] },
          { name: "Sort", type: "Variant", default: "Default", values: ["Default", "Up", "Down"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed"] },
          { name: "Text Head", type: "Text", default: "Head" },
          { name: "Show Heading Text", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Head da lib estável. No código, `<cds-table-head>`: `kind` (default|multi-selection), `sort` (default|up|down), `text-head` e `show-heading-text`. O `state` serve exclusivamente para exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Default", attrs: {} },
          { label: "Sort Up", attrs: { sort: "up" } },
          { label: "Sort Down", attrs: { sort: "down" } },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Multi Selection", attrs: { kind: "multi-selection" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Na Table, é um `<th scope=\\\"col\\\">` com `aria-sort`, e o título ordenável é um botão.",
          "Multi Selection é um Checkbox nativo que marca ou desmarca as linhas da página."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Títulos claros e curtos, sem abreviações confusas.", "Ordenação nas colunas em que for útil (não em colunas de ações)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, short/03 + systemic/accelerate (CONFERIR C147)." } }
      ] }
    ]
  };
})();
