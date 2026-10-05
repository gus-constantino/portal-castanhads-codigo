/* Documentação — .Item (Breadcrumb) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Item (Breadcrumb) 6713:3) e do playground.
   Peça interna do Breadcrumb; não é usada sozinha. Revisar com o time (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["breadcrumb-item"] = {
    tag: "cds-breadcrumb-item",
    base: { label: "Adiantamentos", href: "#" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6713-3", sourceLabel: "Abrir o .Item (Breadcrumb) no Figma",
    cover: { description: "Cada nível do Breadcrumb: separador e conteúdo (link, página atual ou o \"…\" do Truncate).", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: [{ _tag: "cds-breadcrumb-item", label: "Despesas", href: "#", "has-separator": false }, { _tag: "cds-breadcrumb-item", label: "Adiantamentos", "is-active": true, current: true }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Item é cada nível do Breadcrumb: um separador (navigation-right-line) e o conteúdo. Kind=Default mostra o Label; Kind=Truncate mostra o \"…\" que abre o Popover com os níveis escondidos. Is Active marca a página atual." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Breadcrumb, que monta e controla os itens.", "Fora dele, use o componente completo (Breadcrumb)."] },
        { compare: [{ title: "Dentro do Breadcrumb", attrs: { _tag: "cds-breadcrumb", collapse: "0", _children: [{ _tag: "a", href: "#", _text: "Despesas" }, { _tag: "a", href: "#", _text: "Adiantamentos" }] } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Adiantamentos", href: "#" }, markers: [{ n: 1, target: ".cds-bci__sep", side: "left" }, { n: 2, target: ".cds-bci__content", side: "right" }], legend: ["Separator (Has Separator)", "Content (Label ou \"…\")"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Truncate"] },
          { name: "State", type: "Variant", default: "Enable", values: ["Enable", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["True", "False"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Has Separator", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Item da lib estável (o State padrão aparece como \"Enable\" na lib). No código: `kind`, `label`, `has-separator`, `is-active`, `href`, `current`, `disabled`; `state=\"hovered|pressed\"` só para exemplos. Com `href` vira `<a>`, com `current` vira texto com `aria-current`, senão `<button>`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Disabled", attrs: { disabled: true, href: null } },
          { label: "Is Active (página atual)", attrs: { "is-active": true, current: true, href: null } },
          { label: "Kind=Truncate", attrs: { kind: "truncate", href: null } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Com `href` é um link; com `current`, texto com `aria-current=\"page\"`; o Truncate é um `<button>` que abre o Popover.",
          "O separador é decorativo.",
          "O nome do Truncate vem de `truncate-label`."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["O primeiro nível vem sem separador (Has Separator desligado).", "Só o último nível é a página atual (Is Active)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, o hover usa medium/02 + systemic/accelerate, sem Motion Style correspondente (CONFERIR C138)." } }
      ] }
    ]
  };
})();
