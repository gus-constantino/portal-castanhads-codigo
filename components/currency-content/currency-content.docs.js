/* Documentação — .Currency Content (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Currency Content 5488:631) e do playground.
   Peça interna do Content List Item; não é usada sozinha. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["currency-content"] = {
    tag: "cds-currency-content",
    base: { value: "1.250,00", description: "Saldo disponível", "show-negative-symbol": false },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-631", sourceLabel: "Abrir o .Currency Content no Figma",
    cover: { description: "Valor em moeda com o símbolo, o sinal de negativo opcional e uma descrição embaixo.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Currency Content mostra um valor em moeda: o símbolo (Currency Symbol, \"R$\"), o valor e, embaixo, uma descrição curta. Show Negative Symbol põe o \"-\" antes do símbolo." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Content List Item, que monta e controla os itens.", "Fora dele, use o componente completo (Content List Item)."] },
        { compare: [{ title: "Dentro do Content List Item", attrs: { _tag: "cds-content-list-item", label: "Vale-refeição", description: "Saldo", intent: "transaction", value: "1.250,00", "show-negative-symbol": false, "value-description": "Disponível" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-cc2__row span:first-child", side: "left" }, { n: 2, target: ".cds-cc2__row span:last-child", side: "right" }, { n: 3, target: ".cds-cc2__desc", side: "bottom" }], legend: ["Currency Symbol (com o \"-\" quando Show Negative Symbol)", "Value", "Text Description"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Value", type: "Text", default: "30.000,00" },
          { name: "Currency Symbol", type: "Text", default: "R$" },
          { name: "Show Negative Symbol", type: "Boolean", default: "true" },
          { name: "Show Description", type: "Boolean", default: "true" },
          { name: "Text Description", type: "Text", default: "Description" }
        ] },
        { note: "Props e padrões lidos do componente .Currency Content da lib estável (o sinal de negativo vem ligado por padrão). No código: `value`, `symbol`, `show-negative-symbol`, `description` e `show-description`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Positivo", attrs: {} },
          { label: "Negativo", attrs: { "show-negative-symbol": null } },
          { label: "Sem descrição", attrs: { "show-description": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Símbolo, valor e descrição são texto puro, lidos nessa ordem.",
          "O \"-\" é o único sinal de valor negativo. Quando o sinal importa, diga também em texto (ex.: na descrição)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Valor no formato brasileiro (30.000,00), sem o símbolo dentro do Value.", "Descrição curta, que diga o que é o valor (\"Saldo disponível\")."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
