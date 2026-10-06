/* Documentação — .Value Item (NPS) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Value Item (NPS) 10100:1137) e do playground.
   Peça interna do NPS Score; não é usada sozinha. Revisar com o time (C143). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["nps-value-item"] = {
    tag: "cds-nps-value-item",
    base: { value: "9", name: "doc-nvi" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1137", sourceLabel: "Abrir o .Value Item (NPS) no Figma",
    cover: { description: "Cada valor do NPS Score: pílula 24 com o número.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-nps-value-item", value: "8", name: "doc-nvi-c" }, { _tag: "cds-nps-value-item", value: "9", selected: true, name: "doc-nvi-c" }, { _tag: "cds-nps-value-item", value: "10", name: "doc-nvi-c" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Value Item é cada valor do NPS Score: uma pílula de 24 com o número. Selected marca o valor escolhido (Surface/accent e texto Inversed)." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do NPS Score, que monta e controla os itens.", "Fora dele, use o componente completo (NPS Score)."] },
        { compare: [{ title: "Dentro do NPS Score", attrs: { _tag: "cds-nps-score", value: "9" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { selected: true }, markers: [{ n: 1, target: ".cds-nvi__value", side: "right" }], legend: ["Número (Caption/Bold) na pílula"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed"] },
          { name: "Status", type: "Variant", default: "Unselected", values: ["Unselected", "Selected"] }
        ] },
        { note: "Props e padrões lidos do set .Value Item da lib estável. No código: `value`, `selected`, `disabled` e `name`. O `state` serve exclusivamente para exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Unselected", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Selected", attrs: { selected: true } },
          { label: "Selected · Hovered", attrs: { selected: true, state: "hovered" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<label>` com um `<input type=\"radio\">` nativo. O NPS Score faz o grupo e o nome (\"9 de 10\").",
          "O valor escolhido muda de fundo e de cor do texto: a cor não é o único sinal."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use sempre os 11 valores do NPS Score (0 a 10).", "Não troque os números por rótulos ou ícones."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, short/03 + systemic/accelerate (CONFERIR C143)." } }
      ] }
    ]
  };
})();
