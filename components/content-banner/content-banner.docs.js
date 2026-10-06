/* Documentação — .Content Banner (building block)
   Sem página no zeroheight (05/10): description do set na lib estável (.Content Banner 20028:15153) e playground.
   Peça interna do Banner; não é usada sozinha. Revisar com o time (C145). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["content-banner"] = {
    tag: "cds-content-banner",
    base: { title: "Saldo refeição", description: "Confira quanto ainda dá para gastar este mês.", cta: "Ver saldo" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20028-15153", sourceLabel: "Abrir o .Content Banner no Figma",
    cover: { description: "Building block interno do Banner. Agrupa título, descrição e indicação de CTA.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Building block", text: "Peça interna do Banner. O texto vem da description do set na lib (texto do time)." } },
        { h2: "Sobre" },
        { p: "Building block interno do Banner. Agrupa título, descrição e indicação de CTA. Appearance=Neutral para fundos claros, Inversed para fundos escuros ou sobre imagem. Não use isolado — consuma o componente Banner." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Banner, que monta e controla os itens.", "Fora dele, use o componente completo (Banner)."] },
        { compare: [{ title: "Dentro do Banner", attrs: { _tag: "cds-banner", href: "#", title: "Saldo refeição", description: "Confira quanto ainda dá para gastar este mês.", cta: "Ver saldo" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-cb__title", side: "left" }, { n: 2, target: ".cds-cb__desc", side: "right" }, { n: 3, target: ".cds-cb__cta", side: "bottom", align: "start" }], legend: ["Text Title", "Text Description", "Indicação de CTA (texto + go-line)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Inversed"] },
          { name: "Text Title", type: "Text", default: "Label" },
          { name: "Text Description", type: "Text", default: "Description" },
          { name: "CTA Text Label", type: "Text", default: "Label" },
          { name: "Show Text Title", type: "Boolean", default: "true" },
          { name: "Show CTA", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Content Banner da lib estável. No código: `appearance`, `title`, `description`, `cta`, `show-text-title` e `show-cta`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Neutral", attrs: {} },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-inversed", _children: [{ _tag: "cds-content-banner", appearance: "inversed", title: "Saldo refeição", description: "Confira quanto ainda dá para gastar este mês.", cta: "Ver saldo" }] } },
          { label: "Sem título", attrs: { "show-text-title": false } },
          { label: "Sem CTA", attrs: { "show-cta": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O CTA é uma indicação visual: o Banner inteiro é o link ou o botão.",
          "O ícone do CTA (go-line) é decorativo."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Neutral em fundos claros e Inversed em fundos escuros ou sobre imagem.", "Não use isolado — consuma o componente Banner."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Content Banner é estático. As transições são as do Banner." }
      ] }
    ]
  };
})();
