/* Documentação — Header · [CastanhaDS] Sponsor Templates (Templates › Sponsor)
   Fontes (06/10): description do componente Header (4002:3849) no Figma, props Show Heading e Show Title, e as instâncias
   do template (.Heading e .Title Content). No React: pacote castanha-web-templates (/sponsor), Storybook templates-sponsor-header. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-header"] = {
  tag: "cds-sponsor-header",
  base: { title: "Colaboradores", "tag-label": "Tag", "drop-label": "Mais ações", "main-label": "Adicionar", notification: "3", style: "width:100%" },
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=4002-3849", sourceLabel: "Abrir o Header no Figma",
  cover: { description: "Cabeçalho de página dos templates web do Sponsor: navegação (voltar, breadcrumb e ações utilitárias) e área de título com as ações da página." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Componente de cabeçalho de página dos templates web. Combina a camada de navegação (botão de voltar, breadcrumb e ações utilitárias, como notificações com badge e fechar) com a área de título, que reúne o título da página, o botão de informação, a tag de contexto e as ações principais (Drop Button e Main Button)." },
      { h2: "Quando usar" },
      { p: "No topo de páginas internas dos produtos web, para dar contexto de navegação e concentrar as ações da página." },
      { h3: "Não utilize para:" },
      { ul: ["Mensagens de sistema no topo da página: use Alert ou Banner."] },
      { h2: "Boas práticas" },
      { cards: [
        ["Título conciso", "Mantenha o título curto e descritivo, em uma linha."],
        ["Uma ação principal", "Um Main Button por página. Ações secundárias vão no Drop Button."],
        ["Show Title", "Oculte a área de título quando a página tiver cabeçalho próprio no conteúdo."]
      ] },
      { note: "Texto da description do componente Header no [CastanhaDS] Sponsor Templates. Este playground usa o mesmo Header como cabeçalho das próprias páginas: a linha .Heading é a barra do topo e a .Title Content fica no topo de cada página." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { title: "Colaboradores", "tag-label": "Tag", "drop-label": "Mais ações", "main-label": "Adicionar", notification: "3", "show-back": "true", style: "width:100%" },
        markers: [
          { n: 1, target: ".cds-sh__nav > cds-icon-button:not(.cds-sh__menu)", side: "top" },
          { n: 2, target: ".cds-sh__heading > .cds-sh__trail", side: "top" },
          { n: 3, target: ".cds-sh__title", side: "bottom" },
          { n: 4, target: ".cds-sh__title-lead > cds-icon-button", side: "bottom" },
          { n: 5, target: ".cds-sh__title-lead > cds-tag", side: "bottom" },
          { n: 6, target: ".cds-sh__title-row cds-drop-button", side: "bottom" },
          { n: 7, target: ".cds-sh__title-row cds-main-button", side: "bottom" }
        ],
        legend: ["Back Button (Icon Button)", "Trailling Items: buscar, notificações com Badge e fechar (Icon Buttons)", "Title", "Information Button (Icon Button ghost)", "Tag de contexto", "Drop Button (ações secundárias)", "Main Button (ação principal)"]
      } },
      { h2: "Composição do componente" },
      { p: "Duas linhas. A `.Heading` tem o Back Button, o Breadcrumb e os Trailling Items. No celular (Mobile Lead Items, `Common/Is Mobile`), o Menu Button (`hamburguer-line`) entra antes do Back Button e abre o Side Menu em tela cheia. Os Trailling Items são Icon Buttons small default neutral. A `.Title Content` tem o Title (Title/Large), o Information Button (Icon Button ghost accent), a Tag e as ações: Drop Button (default neutral) e Main Button (default accent). Container em `Surface/default`, padding 32 0 28, gap 24 e altura mínima 312 no Figma." },
      { h2: "Propriedades" },
      { props: [
        { name: "Show Heading", type: "Boolean", default: "true" },
        { name: "Show Title", type: "Boolean", default: "true" }
      ] },
      { note: "As duas props são as do componente Header no Figma. No código, cada instância do template também liga e desliga: `show-menu-button` (só no celular; evento `cds-menu`), `show-back`, `show-breadcrumb`, `show-search`, `show-notification`, `show-close`, `show-info`, `show-tag`, `show-drop-button` e `show-main-button`. Textos: `title`, `tag-label`, `drop-label`, `main-label` e `notification`. O Breadcrumb entra por `setBreadcrumb([{ label, href }], collapse)`." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Show Heading e Show Title" },
      { specimens: { min: "calc(var(--common-sizes-200) * 3)", items: [
        { label: "Completo", attrs: {} },
        { label: "Show Title = false", attrs: { "show-title": "false" } },
        { label: "Show Heading = false", attrs: { "show-heading": "false" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { ul: [
        "O Title é um `h1`: um por página.",
        "Os Icon Buttons sem texto têm nome acessível (Voltar, Buscar, Notificações, Fechar, Informação).",
        "O Breadcrumb marca a página atual com `aria-current=\"page\"`.",
        "A ordem do foco segue a leitura: Voltar, Breadcrumb, ações da barra, Information Button, Drop Button e Main Button."
      ] }
    ] }
  ]
};
