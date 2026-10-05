/* Documentação — Avatar
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Avatar, 76f32f) reaproveitado; props e padrões do set da lib estável (Avatar 2278:92 — sem description);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style e a seção Motion está com o texto modelo (C135). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var PHOTO = "assets/brand/sample-photo.svg";
  function av(more){ return Object.assign({ _tag: "cds-avatar" }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: items }; }
  function media(avatar, title, text){ return { _tag: "div", class: "pg-doc-media", _children: [avatar, { _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: title }, { _tag: "span", _text: text }] }] }; }

  CDS.docs["avatar"] = {
    tag: "cds-avatar",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/76f32f-avatar", sourceLabel: "Abrir o Avatar no zeroheight",
    cover: { description: "O Avatar é um componente utilizado para representar visualmente uma pessoa usuária, seja por meio de imagem, iniciais ou ícone padrão. Ele ajuda na identificação rápida de perfis em áreas onde o contexto pessoal é relevante.", examples: [
      row([av({ kind: "image", src: PHOTO, size: "large", name: "Ana Alves" }), av({ kind: "initial", label: "AA", size: "large", name: "Ana Alves" }), av({ size: "large" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Avatar é um componente utilizado para representar visualmente uma pessoa usuária, seja por meio de imagem, iniciais ou ícone padrão. Ele ajuda na identificação rápida de perfis em áreas onde o contexto pessoal é relevante." },
        { h3: "Nomes alternativos comuns" },
        { p: "Foto do perfil, User picture, Imagem do usuário." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza de identificação", "O Avatar deve facilitar o reconhecimento imediato da pessoa usuária."],
          ["Consistência visual", "Manter proporções, bordas e estilos alinhados ao Design System."],
          ["Fallback informativo", "Quando não houver imagem, o Avatar deve exibir ícone ou iniciais de forma clara e legível."]
        ] },
        { h2: "Quando usar" },
        { p: "Use Avatares sempre que houver necessidade de identificar ou representar visualmente uma pessoa usuária dentro da interface, especialmente em listas, cabeçalhos, detalhes de perfil e elementos interativos ligados à conta." },
        { h3: "Utilize para:" },
        { ul: ["Exibir foto de perfil da pessoa usuária.", "Representar um usuário em listas, tabelas ou cards.", "Indicar o dono de um conteúdo, como comentários ou avaliações."] },
        { h3: "Não utilize para:" },
        { ul: ["Representar objetos, marcas ou elementos que não sejam pessoas usuárias.", "Substituir imagens decorativas ou ilustrativas.", "Exibir informações textuais extensas."] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [av({ size: "large" })] }, markers: [{ n: 1, target: "cds-avatar", side: "left" }, { n: 2, target: "cds-icon", side: "right" }], legend: ["Container (círculo)", "Conteúdo: Icon (Default), iniciais (Initial) ou foto (Image)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Image", "Initial"] },
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Inversed"] },
          { name: "Size", type: "Variant", default: "Small", values: ["Small", "Medium", "Large"] },
          { name: "Text Label", type: "Text", default: "AA" }
        ] },
        { table: { head: ["Size", "Container", "Icon (Default)", "Iniciais (Initial)"], rows: [["Small", "40", "20", "Label/Medium"], ["Medium", "48", "20", "Subtitle/Small"], ["Large", "64", "24", "Subtitle/Small"]] } },
        { note: "Props e padrões lidos do set Avatar da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código: `src` é a foto (Kind=Image), `label` são as iniciais (Kind=Initial) e `name` é o nome da pessoa (nome acessível). Na lib, Image só existe em Neutral." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Default", attrs: { size: "medium" } }, { label: "Initial", attrs: { kind: "initial", label: "AA", size: "medium" } }, { label: "Image", attrs: { kind: "image", src: PHOTO, size: "medium" } }
        ] } },
        { h2: "Size" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Small · 40", attrs: { kind: "initial", label: "AA" } }, { label: "Medium · 48", attrs: { kind: "initial", label: "AA", size: "medium" } }, { label: "Large · 64", attrs: { kind: "initial", label: "AA", size: "large" } }
        ] } },
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Neutral", attrs: { kind: "initial", label: "AA", size: "medium" } },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-inversed", _children: [av({ kind: "initial", label: "AA", size: "medium", appearance: "inversed" }), av({ size: "medium", appearance: "inversed" })] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Com `name`, o Avatar é anunciado como imagem com o nome da pessoa (`role=\"img\"`), em qualquer Kind.",
          "Sem `name`, é decorativo — use assim quando o nome já aparece em texto ao lado, para não repetir a leitura.",
          "As iniciais e o ícone não são lidos: o nome vem só do `name`.",
          "O Avatar não é interativo. Se abrir o perfil, coloque-o dentro de um link ou botão com nome."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Iniciais (Text/intense) sobre Surface/01: 15,27:1 — AA e AAA.", "Inversed: iniciais (Text/inversed) sobre o fundo do Avatar (Neutral/Opacity/Soft/light) em Surface/inversed: 5,95:1 — AA."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Avatar." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: row([av({ kind: "image", src: PHOTO }), av({ kind: "image", src: PHOTO, size: "medium" }), av({ kind: "image", src: PHOTO, size: "large" })]), title: "Escolha o tamanho adequado ao contexto", text: "Use o tamanho de Avatar disponibilizado pelo DS conforme o espaço e importância da informação." },
          { attrs: row([av({ kind: "initial", label: "AA", size: "medium" }), av({ size: "medium" })]), title: "Utilize o fallback apenas quando necessário", text: "Se não houver imagem, deixe o componente exibir automáticamente o ícone ou iniciais — não substitua manualmente por outras imagens ou símbolos." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: media(av({ kind: "image", src: PHOTO, size: "medium" }), "Ana Alves", "Comentou há 2 horas"), text: "Use o Avatar apenas para identificar pessoas usuárias, garantindo que ele sempre esteja ligado a um nome, ação ou informação relacionada a alguém." },
          { kind: "dont", attrs: media(av({ kind: "initial", label: "VR", size: "medium" }), "Vale-refeição", "Saldo disponível"), text: "Não use o Avatar para representar elementos que não sejam pessoas usuárias, como obejtos ou elementos do produto." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Avatar é estático: não tem estados de interação nem animação própria." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Avatar no zeroheight ainda está com o texto modelo e a tabela vazia (Enabled, Hovered, Loading, Pressed), e a lib não tem esses estados (CONFERIR C135)." } }
      ] }
    ]
  };
})();
