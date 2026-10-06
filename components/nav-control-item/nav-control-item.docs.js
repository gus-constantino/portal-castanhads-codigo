/* Documentação — .Item Nav Control (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Item Nav Control 19188:379) e do playground.
   Peça interna do Nav Control; não é usada sozinha. Revisar com o time (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["nav-control-item"] = {
    tag: "cds-nav-control-item",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=19188-379", sourceLabel: "Abrir o .Item Nav Control no Figma",
    cover: { description: "Cada indicador do Nav Control: ponto 6×6, que cresce para 16×6 quando ativo.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-nav-control-item", "is-active": true }, { _tag: "cds-nav-control-item" }, { _tag: "cds-nav-control-item" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Item Nav Control é cada indicador de posição do Nav Control: um ponto 6×6 que vira uma pílula 16×6 quando é o item ativo (Is Active)." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Nav Control, que monta e controla os itens.", "Fora dele, use o componente completo (Nav Control)."] },
        { compare: [{ title: "Dentro do Nav Control", attrs: { _tag: "cds-nav-control", total: "5", current: "2", viewport: "mobile" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-nav-control-item", "is-active": true }, { _tag: "cds-nav-control-item" }] }, markers: [{ n: 1, target: "cds-nav-control-item[is-active] .cds-nci__dot", side: "left" }, { n: 2, target: "cds-nav-control-item:last-child .cds-nci__dot", side: "right" }], legend: ["Indicator ativo (16×6)", "Indicator (6×6)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Inversed"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["True", "False"] }
        ] },
        { note: "Props e padrões lidos do set .Item Nav Control da lib estável. No código: `appearance` e `is-active`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Accent", attrs: {} },
          { label: "Accent · Is Active", attrs: { "is-active": true } },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-nav-control-item", appearance: "inversed" }, { _tag: "cds-nav-control-item", appearance: "inversed", "is-active": true }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É decorativo (`aria-hidden`): o Nav Control anuncia a posição em texto.",
          "Não é clicável nem recebe foco."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Um único item ativo por vez.", "Use a Appearance igual à do Nav Control."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, a largura e a cor mudam em medium/02 + systemic/accelerate (CONFERIR C138)." } }
      ] }
    ]
  };
})();
