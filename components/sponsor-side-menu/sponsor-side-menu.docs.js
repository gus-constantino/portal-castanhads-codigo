/* Documentação — Side Menu · [CastanhaDS] Sponsor Templates (Templates › Sponsor)
   Fontes (06/10): description do set Side Menu (5576:445) e dos building blocks no Figma; props e medidas lidas da lib. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-side-menu"] = {
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-445", sourceLabel: "Abrir o Side Menu no Figma",
  cover: { description: "Navegação lateral do app Sponsor: colapsado (80px, só ícones) e expandido (360px), que no desktop abre por hover em overlay sobre o conteúdo." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Navegação lateral do app Sponsor. Colapsado (80px, só ícones) e expandido (360px). No desktop expande por hover, em overlay sobre o conteúdo. É componente de template do Sponsor, não do Core." },
      { p: "Escopo: Mobile e Desktop." },
      { h2: "Composição" },
      { ul: [
        "`.Category` (obrigatório): itens de navegação. Intent=Accordion abre subitens.",
        "`.Subcategory`: subitens dentro do Slot do `.Category` Accordion.",
        "`.User Profile`: rodapé com avatar, nome e CNPJ.",
        "Slot (opcional): conteúdo livre abaixo da marca (Show Slot).",
        "Shortcuts (opcional): atalhos rápidos (Show Shortcuts), com `.Category` Appearance=Accent."
      ] },
      { h2: "Conteúdo do componente no Figma" },
      { table: { head: ["Área", "Itens", "No Figma"], wrap: true, rows: [
        ["Categories", "Painel Incial, Gestão de pessoas, Pedidos, Benefícios e Premiações, Cartão do colaborador, Reembolso e despesas, Financeiro, Relatórios e Personalizações. Seis são Accordion: Gestão de pessoas, Benefícios e Premiações, Reembolso e despesas, Financeiro, Relatórios e Personalizações", "Visíveis, nenhum selecionado e sem Badge"],
        ["Subitens (instância 5582:1812, accordions abertos)", "Gestão de pessoas: Painel, Colaboradores, Organograma, Admissão, Férias, Ausências, Fechamentos, Assinatura digital, Documentos, Recisão e Folha de Pagamento. Benefícios e Premiações: Pedido, Hub de Benefícios, Saúde e Bem Estar e Feirinha RH. Reembolso e despesas: Adiantamento, Reembolsos e Configurações. Financeiro: Créditos Caju, Conta Caju do colaborador e Assinaturas Caju. Relatórios: Gestão de Pessoas, Benefícios e Premiações, Saúde e Bem Estar, Cartão do colaborador, Despesas, Conta Caju e Financeiro. Personalizações: Benefícios e Premiações, Gestão de pessoas e Empresa", "`.Subcategory` sem Lead Icon, com a seta; o accordion aberto tem o ícone em `Surface/accent` (Is Selected=True)"],
        ["Categories (reserva)", "4 `.Category` com o rótulo Category e Badge, para menus maiores", "Camadas ocultas"],
        ["Shortcuts", "Painel Inicial, Soluções Caju, Novo Pedido, Adicionar Colaborador e Cartões (Appearance=Accent)", "Ocultos até ligar Show Shortcuts"],
        ["Heading", "Icon Button `close-line` para fechar o menu em gaveta", "Camada oculta (no código, `show-close`)"],
        ["User Area", "Ajuda (Accordion, `support-line`) e `.User Profile` (User Name, CNPJ e `menu-line`)", "Visíveis"]
      ] } },
      { h2: "Boas práticas" },
      { cards: [
        ["Um item selecionado", "Um item selecionado por vez, derivado da rota."],
        ["Um accordion aberto", "Abrir um accordion fecha os outros."]
      ] },
      { note: "Texto da description do Side Menu no [CastanhaDS] Sponsor Templates." }
    ] },
    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Composição do componente" },
      { p: "Fundo `Surface/01` com `Elevation/level 2`, cantos da direita em `Border/Radius/large`, padding 32 20 0 20, altura mínima 788 e uma coluna com espaço entre o topo e o rodapé. No topo, o Container (gap 20) com o Heading de 44 (marca centralizada na altura: expandida à esquerda com padding 16 e tipografia, colapsada centralizada e só com o símbolo), o Slot (padding 16, raio small, altura máxima 160), os Shortcuts (padding-top 8, gap 8) e as Categories (gap 20, padding 16 0). No rodapé, a User Area (padding 20 0) com a Ajuda (`.Category` Accordion) e o `.User Profile`. Colapsado, os `.Category` e o `.User Profile` ficam em Kind=Reduced." },
      { h2: "Propriedades" },
      { props: [
        { name: "Is Collapsed", type: "Variant", default: "True", values: ["True", "False"] },
        { name: "Show Slot", type: "Boolean", default: "false" },
        { name: "Show Shortcuts", type: "Boolean", default: "false" },
        { name: "Slot", type: "Slot", default: "—" }
      ] },
      { note: "No código: `collapsed=\"false\"` fixa o menu expandido e `show-close=\"true\"` mostra o botão de fechar (evento `cds-close`). Filhos: `<cds-sponsor-category>` vão para Categories, com `slot=\"shortcuts\"` para os atalhos, `slot=\"help\"` para a Ajuda e `slot=\"slot\"` para o Slot livre. O `<cds-sponsor-user-profile>` vai para o rodapé. Evento `cds-select` ao selecionar um item." }
    ] },
    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { ul: [
        "O menu é um `nav` com nome acessível \"Menu\".",
        "Colapsado, cada item mostra só o ícone e leva o nome no `aria-label`.",
        "O menu também abre pelo foco do teclado, não só pelo hover.",
        "O item da página atual tem `aria-current=\"page\"`. Os accordions usam `aria-expanded`."
      ] }
    ] }
  ]
};
