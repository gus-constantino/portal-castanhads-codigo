/* Documentação — .Lead item (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Lead item 15621:66) e do playground.
   Peça interna do Topic; não é usada sozinha. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["lead-item"] = {
    tag: "cds-lead-item",
    base: { icon: "food-line" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-66", sourceLabel: "Abrir o .Lead item no Figma",
    cover: { description: "Elemento à esquerda do Topic: Shaped Icon ou imagem 40×40.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-lead-item", icon: "food-line" }, { _tag: "cds-lead-item", kind: "image", src: "assets/brand/sample-photo.svg", alt: "" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Lead item é o elemento à esquerda do Topic. Kind=Shaped Icon usa o Shaped Icon Accent Small (40), e Kind=Image usa uma Image 1:1 de 40×40." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Topic, que monta e controla os itens.", "Fora dele, use o componente completo (Topic)."] },
        { compare: [{ title: "Dentro do Topic", attrs: { _tag: "cds-topic" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-shaped-icon", side: "left" }], legend: ["Shaped Icon (Kind=Shaped Icon) ou Image (Kind=Image)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Shaped Icon", values: ["Shaped Icon", "Image"] }
        ] },
        { note: "Props e padrões lidos do set .Lead item da lib estável. No código: `kind` (shaped-icon|image), `icon` (Shaped Icon), `src` e `alt` (Image)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Shaped Icon", attrs: {} },
          { label: "Image", attrs: { kind: "image", src: "assets/brand/sample-photo.svg", alt: "" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O Shaped Icon é decorativo.",
          "A Image usa `alt`: vazio quando a imagem é decorativa, descritivo quando traz informação."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o mesmo Kind em todos os itens de uma lista.", "Prefira Shaped Icon para categorias e Image para pessoas, marcas ou produtos."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
