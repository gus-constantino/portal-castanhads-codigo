/* Documentação — .Trailing Item (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Trailing Item 5488:647) e do playground.
   Peça interna do Selection List Item e do Content List Item; não é usada sozinha. Revisar com o time (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["trailing-item"] = {
    tag: "cds-trailing-item",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-647", sourceLabel: "Abrir o .Trailing Item no Figma",
    cover: { description: "Item à direita das listas: Checkbox, Radio Button, Switch, Icon ou Tag.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: [{ _tag: "cds-trailing-item", status: "selected" }, { _tag: "cds-trailing-item", kind: "switch", status: "selected" }, { _tag: "cds-trailing-item", kind: "tag", "tag-label": "Novo" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Trailing Item é o elemento à direita dos itens de lista: um controle de seleção (Checkbox, Radio Button ou Switch, sem rótulo visível), um Icon ou uma Tag. Ocupa 48×48 (a Tag, o tamanho dela)." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Selection List Item e do Content List Item, que monta e controla os itens.", "Fora dele, use o componente completo (Selection List Item e do Content List Item)."] },
        { compare: [{ title: "Dentro do Selection List Item e do Content List Item", attrs: { _tag: "cds-selection-list-item", label: "Vale-refeição", description: "Restaurantes e delivery", "lead-icon": "meal-line", "is-active": true } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { status: "selected" }, markers: [{ n: 1, target: "cds-checkbox", side: "right" }], legend: ["Controle, Icon ou Tag (pela Kind)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Checkbox", values: ["Checkbox", "Radio Button", "Switch", "Icon", "Tag"] }
        ] },
        { note: "Props e padrões lidos do set .Trailing Item da lib estável. No código: `kind`, `status` (selected|unselected dos controles), `disabled`, `icon` (Kind=Icon), `tag-label`, `tag-appearance`, `name` e `value`. O controle é o nativo do Checkbox/Radio/Switch, sem rótulo visível." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Checkbox", attrs: { status: "selected" } },
          { label: "Radio Button", attrs: { kind: "radio-button", status: "selected", name: "doc-ti" } },
          { label: "Switch", attrs: { kind: "switch", status: "selected" } },
          { label: "Icon", attrs: { kind: "icon", icon: "information-line" } },
          { label: "Tag", attrs: { kind: "tag", "tag-label": "Novo" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Os controles não têm rótulo próprio: o item de lista dá o nome (o Label da linha).",
          "Icon e Tag são informativos. O significado precisa estar no texto da linha."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o mesmo Kind em todos os itens de uma lista (ver Selection List).", "Radio Button exclusivamente em grupos com o mesmo `name`."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições são as do controle usado (Checkbox, Radio Button ou Switch)." }
      ] }
    ]
  };
})();
