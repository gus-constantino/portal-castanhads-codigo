/* Documentação — .CSAT Item (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.CSAT Item 10100:1155) e do playground.
   Peça interna do CSAT Score; não é usada sozinha. Revisar com o time (C143). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["csat-item"] = {
    tag: "cds-csat-item",
    base: { label: "Bom", name: "doc-csi" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1155", sourceLabel: "Abrir o .CSAT Item no Figma",
    cover: { description: "Cada nível do CSAT Score: estrela e rótulo.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-csat-item", label: "Bom", active: true, selected: true, name: "doc-csi-c" }, { _tag: "cds-csat-item", label: "Muito bom", name: "doc-csi-c" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .CSAT Item é cada nível do CSAT Score: um item de 48 com a estrela (rate-line inativa, rate-filled ativa) e o rótulo embaixo. Is Active marca os níveis até a nota escolhida." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do CSAT Score, que monta e controla os itens.", "Fora dele, use o componente completo (CSAT Score)."] },
        { compare: [{ title: "Dentro do CSAT Score", attrs: { _tag: "cds-csat-score", value: "4" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Bom", active: true }, markers: [{ n: 1, target: ".cds-csi__item", side: "left" }, { n: 2, target: ".cds-csi__label", side: "right" }], legend: ["Item com a estrela (48, raio medium)", "Label Content"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Label Content", type: "Text", default: "Label" },
          { name: "Show Label Content", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .CSAT Item da lib estável. No código: `label`, `show-label-content`, `active` (Is Active), `selected`, `value`, `name` e `disabled`; `state` só para exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Is Active", attrs: { active: true } },
          { label: "Sem Label", attrs: { "show-label-content": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<label>` com um `<input type=\"radio\">` nativo; o CSAT Score faz o grupo e o nome (\"Bom, 4 de 5\").",
          "Sem o rótulo visível, o rótulo continua como nome acessível.",
          "A estrela é decorativa."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use sempre os 5 itens do CSAT Score, com os rótulos padrão.", "Não esconda os rótulos: são eles que explicam a escala."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, o hover usa short/03 + systemic/accelerate (reaction do Figma) (CONFERIR C143)." } }
      ] }
    ]
  };
})();
