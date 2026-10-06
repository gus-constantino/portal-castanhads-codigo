/* Documentação — .Lead Item (Lists) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Lead Item (Lists) 5488:640) e do playground.
   Peça interna do Selection List Item e do Content List Item; não é usada sozinha. Revisar com o time (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["list-lead-item"] = {
    tag: "cds-list-lead-item",
    base: { kind: "icon", icon: "meal-line" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-640", sourceLabel: "Abrir o .Lead Item (Lists) no Figma",
    cover: { description: "Item à esquerda das listas: Avatar, Icon ou Image.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: [{ _tag: "cds-list-lead-item", kind: "avatar", label: "AA" }, { _tag: "cds-list-lead-item", kind: "icon", icon: "meal-line" }, { _tag: "cds-list-lead-item", kind: "image", src: "assets/brand/sample-photo.svg", alt: "" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Lead Item é o elemento à esquerda dos itens de lista: Avatar (40), Icon (20, Neutral) ou Image (40, raio extra-small). Não confundir com o .Lead item do Topic, que é outro building block." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Selection List Item e do Content List Item, que monta e controla os itens.", "Fora dele, use o componente completo (Selection List Item e do Content List Item)."] },
        { compare: [{ title: "Dentro do Selection List Item e do Content List Item", attrs: { _tag: "cds-content-list-item", label: "Ana Alves", description: "Administradora do Portal", "lead-kind": "avatar", "lead-label": "AA", "show-trailing-item": false } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { kind: "avatar", label: "AA" }, markers: [{ n: 1, target: "cds-avatar", side: "right" }], legend: ["Avatar, Icon ou Image (pela Kind)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Avatar", values: ["Avatar", "Icon", "Image"] }
        ] },
        { note: "Props e padrões lidos do set .Lead Item da lib estável. No código: `kind`, `icon`, `label` (iniciais do Avatar), `src` e `alt`. Nos itens de lista, os atributos `lead-kind`, `lead-icon`, `lead-label` e `lead-src` repassam esses valores. O padrão dos itens é Icon." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Avatar", attrs: { kind: "avatar", label: "AA" } },
          { label: "Icon", attrs: {} },
          { label: "Image", attrs: { kind: "image", src: "assets/brand/sample-photo.svg", alt: "" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É decorativo: o nome do item vem do Label e da descrição da linha.",
          "Na Kind Image, deixe o `alt` vazio quando a imagem ilustra o item sem acrescentar informação."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use a mesma Kind em todos os itens de uma lista.", "Avatar exclusivamente para pessoas (ver a doc do Avatar)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Lead Item é estático. As transições são as do item de lista." }
      ] }
    ]
  };
})();
