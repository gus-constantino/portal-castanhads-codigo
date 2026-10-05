/* Documentação — Topic (rascunho)
   Sem página no zeroheight e sem description/annotations no Figma (05/10): texto escrito a partir do set da lib estável
   (Topic 15621:1175, página Content) e do componente do playground, no template Juntos. Revisar com o time (C130). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["topic"] = {
  tag: "cds-topic",
  base: { "lead-icon": "credit-card-line", title: "Cartão virtual", description: "Use o cartão virtual em compras online e nas carteiras digitais." },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-1175", sourceLabel: "Abrir o Topic no Figma",
  cover: { description: "Apresente um tópico com ícone ou imagem, título e descrição.", examples: [
    { "lead-icon": "credit-card-line", title: "Cartão virtual", description: "Use o cartão virtual em compras online e nas carteiras digitais." }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
      { h2: "Sobre" },
      { p: "O Topic apresenta um item de conteúdo com um .Lead item (Shaped Icon ou imagem), um título e uma descrição. Em lista, organiza benefícios, etapas ou características lado a lado ou empilhados." },
      { h2: "Quando usar" },
      { h3: "Utilize para:" },
      { ul: ["Listar benefícios ou características de um produto.", "Explicar etapas ou pontos de um onboarding.", "Apresentar tópicos curtos com apoio visual."] },
      { h3: "Não utilize para:" },
      { ul: ["Itens clicáveis ou de navegação — use o Content List Item.", "Opções selecionáveis — use o Selection List Item.", "Textos longos — prefira parágrafos."] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { "lead-icon": "credit-card-line", title: "Cartão virtual", description: "Use o cartão virtual em compras online e nas carteiras digitais." },
        markers: [{ n: 1, target: "cds-lead-item", side: "left" }, { n: 2, target: ".cds-topic__title", side: "right" }, { n: 3, target: ".cds-topic__desc", side: "right" }],
        legend: [".Lead item (Shaped Icon Accent · Small ou Image 1:1)", "Title (Heading/Small)", "Description (Body/Regular)"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Orientation", type: "Variant", default: "Horizontal", values: ["Horizontal", "Vertical"] },
        { name: "Show Lead item", type: "Boolean", default: "true" },
        { name: "Show Title", type: "Boolean", default: "true" },
        { name: "Text Title", type: "Text", default: "Title" },
        { name: "Text Description", type: "Text", default: "Lorem Ipsum is simply dummy…" }
      ] },
      { note: "Props e padrões lidos do set Topic da lib estável. O tipo do .Lead item (Shaped Icon ou Image) é escolhido no building block; no código, `lead-kind`, `lead-icon`, `lead-src` e `lead-alt`." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Orientation" },
      { specimens: { min: "var(--common-sizes-200)", items: [{ label: "Horizontal", attrs: {} }, { label: "Vertical", attrs: { orientation: "vertical" } }] } },
      { h2: "Variações" },
      { specimens: { min: "var(--common-sizes-200)", items: [
        { label: "Sem título", attrs: { "show-title": false } },
        { label: "Sem .Lead item", attrs: { "show-lead-item": false } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "O Shaped Icon é decorativo. Com imagem, informe `lead-alt` quando ela trouxer informação; se for só ilustrativa, deixe vazio.",
        "Em grupo, coloque os Topics numa lista (`<ul>`) para o leitor anunciar a quantidade de itens."
      ] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Título (`Text/intense`): 16,96:1 — AA e AAA.", "Descrição (`Text/medium`): 8,24:1 — AA e AAA."] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: [{ "lead-icon": "credit-card-line", title: "Cartão virtual", description: "Use em compras online." }, { "lead-icon": "wallet", title: "Carteiras digitais", description: "Pague por aproximação com o celular." }], title: "Mantenha o mesmo padrão no grupo", text: "Em lista, use a mesma Orientation e o mesmo tipo de .Lead item em todos os Topics." },
        { attrs: { "lead-icon": "lock-line", title: "Mais segurança", description: "Seu cartão fica protegido com reconhecimento facial." }, title: "Texto curto", text: "Título com poucas palavras e descrição de até duas linhas." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "O Topic é estático: não tem estados de interação nem animação própria." }
    ] }
  ]
};
