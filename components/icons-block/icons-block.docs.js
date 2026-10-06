/* Documentação — .Icons (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Icons 5218:1271) e do playground.
   Peça interna do Filter Button; não é usada sozinha. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["icons-block"] = {
    tag: "cds-icons",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5218-1271", sourceLabel: "Abrir o .Icons no Figma",
    cover: { description: "Ícone do Filter Button: filtro (Default) ou calendário (Date).", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-icons" }, { _tag: "cds-icons", kind: "date" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Icons é o ícone à esquerda do Filter Button: filter-line em Kind=Default e calendar-line em Kind=Date (filtros de período). Tamanho medium, e a cor vem do Filter Button." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Filter Button, que monta e controla os itens.", "Fora dele, use o componente completo (Filter Button)."] },
        { compare: [{ title: "Dentro do Filter Button", attrs: { _tag: "cds-filter-button" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-icon", side: "left" }], legend: ["Ícone (filter-line ou calendar-line)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Date"] }
        ] },
        { note: "Props e padrões lidos do set .Icons da lib estável. No código: `kind` (default|date), e a tag é `<cds-icons>`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Default", attrs: {} },
          { label: "Date", attrs: { kind: "date" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O ícone é decorativo: o nome vem do Label do Filter Button."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use Date exclusivamente em filtros de data ou período."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
