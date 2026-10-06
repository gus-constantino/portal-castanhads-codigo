/* Documentação — .Lead item (File Upload) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Lead item (File Upload) 15207:13262) e do playground.
   Peça interna do Upload Item; não é usada sozinha. Revisar com o time (C140). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["file-lead-item"] = {
    tag: "cds-file-lead-item",
    base: { appearance: "image", src: "assets/brand/sample-photo.svg", alt: "" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15207-13262", sourceLabel: "Abrir o .Lead item (File Upload) no Figma",
    cover: { description: "Miniatura do arquivo no Upload Item: imagem ou ícone de anexo, com a ação de ver o arquivo.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: [{ _tag: "cds-file-lead-item", appearance: "image", src: "assets/brand/sample-photo.svg", alt: "" }, { _tag: "cds-file-lead-item", appearance: "file" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Lead item é a miniatura do arquivo no Upload Item, com 48×48 e raio medium. Appearance=Image mostra a imagem enviada. File mostra um Shaped Icon de anexo. Kind=View file é um botão que abre o arquivo e, no hover, mostra um overlay com o ícone de abrir o arquivo. Kind=Static é a miniatura, sem ação." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Upload Item, que monta e controla os itens.", "Fora dele, use o componente completo (Upload Item)."] },
        { compare: [{ title: "Dentro do Upload Item", attrs: { _tag: "cds-upload-item", status: "success", "text-title": "rg-frente", "file-extension": ".jpg", src: "assets/brand/sample-photo.svg" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { appearance: "image", src: "assets/brand/sample-photo.svg", alt: "", state: "hovered" }, markers: [{ n: 1, target: ".cds-fli__img, cds-image", side: "left" }, { n: 2, target: "cds-icon", side: "right" }], legend: ["Miniatura (Image 1:1 ou Shaped Icon de anexo)", "Overlay com hide-line (View file · Hovered/Pressed)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "View file", values: ["Static", "View file"] },
          { name: "Appearance", type: "Variant", default: "File", values: ["Image", "File"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed"] }
        ] },
        { note: "Props e padrões lidos do set .Lead item da lib estável. Não confundir com o .Lead Item das listas nem com o .Lead item do Topic. No código: `kind` (static|view-file), `appearance` (image|file), `src`, `alt` e `label` (nome do botão, \"Ver arquivo\"). O `state` serve exclusivamente para exemplos. Evento `cds-view`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Image", attrs: {} },
          { label: "Image · Hovered", attrs: { state: "hovered" } },
          { label: "File", attrs: { appearance: "file", src: null } },
          { label: "Static", attrs: { kind: "static" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Kind=View file é um botão com nome (`label`, padrão \"Ver arquivo\"), e o Upload Item pode dar um nome com o arquivo.",
          "O overlay e o ícone são decorativos.",
          "Kind=Static é decorativo."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Image para arquivos de imagem (com miniatura) e File para os demais.", "View file quando o arquivo pode ser aberto."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion para o overlay. No código, a opacidade muda em short/03 + systemic/accelerate (CONFERIR C140)." } }
      ] }
    ]
  };
})();
