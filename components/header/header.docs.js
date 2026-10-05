/* Documentação — .Header (Modal / Bottom Sheet) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Header (Modal / Bottom Sheet) 16362:3241) e do playground.
   Peça interna do Modal e do Bottom Sheet; não é usada sozinha. Revisar com o time (C146). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["header"] = {
    tag: "cds-header",
    base: { "text-title": "Pedido de cartões" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16362-3241", sourceLabel: "Abrir o .Header (Modal / Bottom Sheet) no Figma",
    cover: { description: "Cabeçalho do Modal e do Bottom Sheet: título, botão de fechar e divisor.", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Header é o cabeçalho do Modal e do Bottom Sheet: o título (Body/Bold), o botão de fechar (Icon Button Ghost Neutral Medium, close-line) e o Divider Soft embaixo." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Modal e do Bottom Sheet, que monta e controla os itens.", "Fora dele, use o componente completo (Modal e do Bottom Sheet)."] },
        { compare: [{ title: "Dentro do Modal e do Bottom Sheet", attrs: { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [{ _tag: "cds-bottom-sheet", inline: true, "text-title": "Pedido de cartões", "primary-label": "Confirmar", "secondary-label": "Cancelar", _children: [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Revise os dados antes de confirmar." }] }] } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões" }] }, markers: [{ n: 1, target: ".cds-header__title", side: "left" }, { n: 2, target: "cds-icon-button", side: "right" }, { n: 3, target: "cds-divider", side: "bottom", align: "start" }], legend: ["Text Title", "Close Button", "Divider"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Text Title", type: "Text", default: "Title" },
          { name: "Show Text Title", type: "Boolean", default: "true" },
          { name: "Show Close Button", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do componente .Header da lib estável. No código: `text-title`, `show-text-title`, `show-close-button`, `show-divider` e `close-label` (nome do botão). Evento `cds-close`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Completo", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões" }] } },
          { label: "Sem Close Button", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "show-close-button": false }] } },
          { label: "Sem Divider", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "show-divider": false }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O título é o nome do Modal ou do Bottom Sheet: o overlay (`<dialog>`) usa o mesmo texto como `aria-label`.",
          "O botão de fechar é um Icon Button com nome (`close-label`, padrão \"Fechar\").",
          "O Divider é decorativo."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Título curto, que diga o assunto do overlay.", "Mantenha o botão de fechar, a não ser que o fluxo exija uma escolha."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Header é estático; o botão de fechar segue o Motion do Icon Button." }
      ] }
    ]
  };
})();
