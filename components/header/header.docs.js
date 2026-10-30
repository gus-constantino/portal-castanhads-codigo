/* Documentação — .Header (Modal / Bottom Sheet) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Header (Modal / Bottom Sheet) 16362:3241) e do playground.
   Peça interna do Modal e do Bottom Sheet; não é usada sozinha. Revisar com o time (C146).
   Hotfix CDS-2104 (30/10, branch PLk9bAY0lKJSTbINkFOpZI): Text Description (Show Text Description, desligada por padrão), Close Button
   alinhado ao topo e description no set. Ainda não publicado: status branch-update (scripts/figma-status.js). */
(function(){
  var BRANCH = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PLk9bAY0lKJSTbINkFOpZI/-CastanhaDS--Components?node-id=16362-3241";
  var DESC = "Escolha como quer receber o reembolso. Você pode trocar depois nas configurações.";
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["header"] = {
    tag: "cds-header",
    base: { "text-title": "Pedido de cartões" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16362-3241", sourceLabel: "Abrir o .Header (Modal / Bottom Sheet) no Figma",
    cover: { description: "Cabeçalho dos containers Modal e Bottom Sheet. Mostra título, descrição opcional e botão de fechar.", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Descrição em desenvolvimento · CDS-2104", text: "A Text Description e o botão de fechar alinhado ao topo estão na branch do Figma. Hoje a lib publicada tem só o título, o botão de fechar centralizado e o Divider." } },
        { p: "[Abrir a branch no Figma](" + BRANCH + ") · Jira CDS-2104 ([Design] Hotfix: Bottom Sheet) · épico CDS-1688 (Release 27)." },
        { h2: "Sobre" },
        { p: "Cabeçalho dos containers Modal e Bottom Sheet. Mostra título, descrição opcional e botão de fechar. O título usa Body/Bold Body, a descrição Body/Regular Body, o botão de fechar é um Icon Button Ghost Neutral Medium (close-line) e o Divider Soft fica embaixo." },
        { note: "Texto da description do .Header na branch (CDS-2104). O zeroheight ainda não tem página deste building block." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Modal e do Bottom Sheet, que monta e controla os itens.", "Fora dele, use o componente completo (Modal e do Bottom Sheet).", "Use a descrição quando o título sozinho não der o contexto.", "Ajustes aqui valem para Modal e Bottom Sheet."] },
        { compare: [{ title: "Dentro do Modal e do Bottom Sheet", attrs: { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [{ _tag: "cds-bottom-sheet", inline: true, "text-title": "Pedido de cartões", "primary-label": "Confirmar", "secondary-label": "Cancelar", _children: [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Revise os dados antes de confirmar." }] }] } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "text-description": DESC, "show-text-description": true, "show-divider": true }] }, markers: [{ n: 1, target: ".cds-header__title", side: "left" }, { n: 2, target: ".cds-header__description", side: "left" }, { n: 3, target: "cds-icon-button", side: "right" }, { n: 4, target: "cds-divider", side: "bottom", align: "start" }], legend: ["Text Title", "Text Description (opcional, desligada por padrão)", "Close Button", "Divider"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Text Title", type: "Text", default: "Title" },
          { name: "Show Text Title", type: "Boolean", default: "true" },
          { name: "Text Description", type: "Text", default: "Description" },
          { name: "Show Text Description", type: "Boolean", default: "false" },
          { name: "Show Close Button", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do componente .Header da lib estável. No código: `text-title`, `show-text-title`, `text-description`, `show-text-description`, `show-close-button`, `show-divider` e `close-label` (nome do botão). Evento `cds-close`." },
        { note: "`Text Description` e `Show Text Description` existem só na branch do hotfix (CDS-2104). Modal e Bottom Sheet repassam as duas: `text-description` e `show-text-description`." },
        { h2: "Entrega para dev · CDS-2104" },
        { ul: [
          "Text Description (`Body/Regular Body`, `Common/Colors/Text/medium`) abaixo do título, no mesmo Text Container. Desligada por padrão (`Show Text Description` = false): nada muda no que já está publicado.",
          "Os textos crescem em altura, sem truncar. Content só com título: 72 (mais 1 do Divider, quando ligado). Com 3 linhas de descrição: 132.",
          "O Close Button alinha ao topo do Content. O Text Container ganha padding superior de 12 (`Common/Sizes/12`) para o título ficar centrado com o X, a 36 do topo. Com o título oculto, a descrição ocupa a linha dele.",
          "Contraste sobre `Surface/default`: título `Text/intense` 16,96:1 e descrição `Text/medium` 8,24:1 (AAA).",
          "A descrição visível é a descrição acessível do diálogo: `aria-describedby` no web; no Flutter, incluir na semântica da rota.",
          "Componente compartilhado: Modal e Bottom Sheet herdam o ajuste. No Flutter, o time avalia fazer o Modal junto com a correção do Bottom Sheet."
        ] }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Completo", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões" }] } },
          { label: "Sem Close Button", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "show-close-button": false }] } },
          { label: "Sem Divider", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "show-divider": false }] } },
          { label: "Com Text Description", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-header", "text-title": "Pedido de cartões", "text-description": DESC, "show-text-description": true }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O título é o nome do Modal ou do Bottom Sheet: o overlay (`<dialog>`) usa o mesmo texto como `aria-label`.",
          "A descrição, quando visível, é a descrição acessível do overlay: o `<dialog>` aponta para ela com `aria-describedby`.",
          "O botão de fechar é um Icon Button com nome (`close-label`, padrão \"Fechar\").",
          "O Divider é decorativo."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Título curto, que diga o assunto do overlay.", "Use a descrição quando o título sozinho não der o contexto.", "Mantenha o botão de fechar, a não ser que o fluxo exija uma escolha."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Header é estático. O botão de fechar segue o Motion do Icon Button." }
      ] }
    ]
  };
})();
