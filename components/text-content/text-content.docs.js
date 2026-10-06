/* Documentação — .Text Content (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Text Content 5516:10455) e do playground.
   Peça interna do Accordion Item e itens de lista; não é usada sozinha. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["text-content"] = {
    tag: "cds-text-content",
    base: { label: "Vale-refeição", description: "Saldo de R$ 1.250,00" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5516-10455", sourceLabel: "Abrir o .Text Content no Figma",
    cover: { description: "Par de textos (Label e Description) com o destaque no Label ou na Description.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-text-content", label: "Vale-refeição", description: "Saldo de R$ 1.250,00" }, { _tag: "cds-text-content", kind: "highlight-description", label: "Saldo", description: "R$ 1.250,00" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Text Content é o bloco de texto dos itens de lista e do Accordion Item: um Label e uma Description. Kind=Highlight Label destaca o Label (Description menor, em Text/medium). Kind=Highlight Description inverte, com o Label pequeno em cima." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Accordion Item e itens de lista, que monta e controla os itens.", "Fora dele, use o componente completo (Accordion Item e itens de lista)."] },
        { compare: [{ title: "Dentro do Accordion Item e itens de lista", attrs: { _tag: "cds-accordion-item", label: "Vale-refeição", description: "Saldo de R$ 1.250,00" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-tc__label", side: "left" }, { n: 2, target: ".cds-tc__desc", side: "right" }], legend: ["Label Content", "Text Description"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Highlight Label", values: ["Highlight Label", "Highlight Description"] },
          { name: "Label Content", type: "Text", default: "Label" },
          { name: "Text Description", type: "Text", default: "Description" },
          { name: "Show Description", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Text Content da lib estável. No código: `kind` (highlight-label|highlight-description), `label`, `description` e `show-description`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Highlight Label", attrs: {} },
          { label: "Highlight Description", attrs: { kind: "highlight-description", label: "Saldo", description: "R$ 1.250,00" } },
          { label: "Sem descrição", attrs: { "show-description": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Label e Description são texto puro, lidos nessa ordem (o destaque é puramente visual)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Highlight Description quando o dado (valor, data) importa mais que o rótulo.", "Textos curtos: uma linha cada, quando possível."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
