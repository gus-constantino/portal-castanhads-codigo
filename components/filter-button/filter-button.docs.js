/* Documentação — Filter Button
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Filter button, 017809) reaproveitado; o zeroheight não tem a parte Style (anatomia,
   propriedades): ela foi escrita a partir do set da lib estável (Filter button 5099:5389) e do componente do playground. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["filter-button"] = {
  tag: "cds-filter-button",
  source: "https://castanha.caju.com.br/858426090/v/latest/p/017809-filter-button", sourceLabel: "Abrir o Filter button no zeroheight",
  cover: { description: "O Filter Button é um botão que serve como gatilho para filtros e, quando acionado, abre opções para refinar ou ajustar a exibição de conteúdos, listas ou tabelas.", examples: [
    {}, { active: true, count: "3" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Filter Button é um botão que serve como gatilho para filtros e, quando acionado, abre opções para refinar ou ajustar a exibição de conteúdos, listas ou tabelas." },
      { h3: "Nomes alternativos comuns" },
      { p: "Filter Toggle, Filtering Button, Filtro." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "Deve indicar de forma explícita que é o gatilho para filtros e mostrar quando há filtros ativos."],
        ["Eficiência", "O drawer precisa organizar filtros de modo claro e ágil, com aplicação direta."],
        ["Consistência", "A posição e o comportamento do botão devem ser uniformes em toda a interface."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Filter Button quando for necessário oferecer ao usuário acesso a filtros que afetam a exibição de dados, listas, tabelas ou conteúdos visuais. Ele deve ser usado como entrada para configurações pontuais de exibição." },
      { h3: "Utilize para:" },
      { ul: ["Aplicar filtros em listas, tabelas ou grids.", "Permitir ao usuário customizar resultados de busca.", "Oferecer filtros de acesso direto em dashboards."] },
      { h3: "Não utilize para:" },
      { ul: ["Executar ações primárias (use o Main Button).", "Substituir menus de navegação ou dropdowns genéricos.", "Exibir preferências ou configurações persistentes complexas."] },
      { h2: "Casos de uso" },
      { h3: "Filter button vs Drop button" },
      { p: "O Filter Button é específico para opções de filtragem que alteram dados ou modos de exibição. Já o Drop Button serve como gatilho para listas de ações ou navegação, não necessariamente relacionadas a filtros." },
      { compare: [
        { title: "Filter Button: filtragem", attrs: {} },
        { title: "Drop Button: menu de ações", attrs: { _tag: "cds-drop-button", label: "Mais ações", appearance: "neutral", "show-lead-icon": false } }
      ] },
      { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        // Figma: duas instâncias, a segunda com filtros aplicados (o Badge com a contagem no lugar do ícone)
        attrs: { _tag: "div", class: "pg-doc-col", _children: [{ _tag: "cds-filter-button" }, { _tag: "cds-filter-button", active: true, count: "2" }] },
        markers: [{ n: 1, target: "cds-filter-button:first-child cds-icons", side: "left" }, { n: 2, target: "cds-filter-button:first-child .cds-fb__label", side: "top" }, { n: 3, target: "cds-filter-button:last-child .cds-fb", side: "right" }, { n: 4, target: "cds-filter-button:last-child cds-badge", side: "bottom" }],
        legend: ["Icon (.Icons, com filtros aplicados dá lugar ao Badge)", "Text label (padrão \"Filtros\")", "Container", "Badge (contagem de filtros aplicados)"]
      } },
      { h2: "Composição do componente" },
      { p: "Container com o ícone de filtro e o Label. Com filtros aplicados (`Is Active`), um Badge Neutral com a contagem ocupa o lugar do ícone. Em Tablet e Mobile, o botão mostra o ícone sem o Label (48×48) e o Badge vai para o canto." },
      { h2: "Propriedades" },
      { props: [
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] }
      ] },
      { note: "Props e padrões lidos do set Filter button da lib estável. O zeroheight ainda não documenta anatomia nem propriedades deste componente. No código: `active`, `count` (número no Badge) e `label`. Quem implementa controla `active`." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "State" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
      ] } },
      { h2: "Is Active" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "False", attrs: {} }, { label: "True · 1 filtro", attrs: { active: true } }, { label: "True · 3 filtros", attrs: { active: true, count: "3" } }
      ] } },
      { h2: "Viewport" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "Desktop", attrs: { viewport: "desktop", active: true, count: "2" } }, { label: "Mobile", attrs: { viewport: "mobile", active: true, count: "2" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "É um `<button>` nativo com o Label como nome.",
        "Com filtros aplicados, o nome inclui a contagem (ex.: \"Filtros, 3 filtros aplicados\"). O Badge é puramente visual.",
        "No Mobile o Label fica oculto, mas o nome acessível continua o mesmo.",
        "Disabled usa `disabled` nativo: sai da tabulação."
      ] },
      { h2: "Teclado e foco" },
      { ul: ["Tab foca o botão. Enter e Espaço acionam.", "Ao fechar o Drawer ou Bottom Sheet de filtros, o foco volta para o Filter Button.", "Foco visível segue o padrão global do Castanha."] },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para o Filter button." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: {}, title: "Web: abre um Drawer", text: "Em experiências web, é padrão que o Filter button sempre abra um Drawer, garantindo espaço suficiente para organizar múltiplos filtros sem interromper o fluxo principal da página." },
        { attrs: { viewport: "mobile" }, title: "Mobile: abre um Bottom sheet", text: "Em experiências mobile, o padrão é que o Filter Button abra uma Bottom sheet, ocupando parte da tela para apresentar os filtros de forma clara e acessível." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", text: "Para filtros pouco complexos, como uma lista curta de opções em checkboxes, utilize um Select Input diretamente no layout. Isso encurta a interação e evita abrir um container desnecessário." },
        { kind: "dont", text: "Não utilize o Filter Button com abertura de drawer para casos em que poucas opções precisam ser escolhidas. O uso de drawer deve ser reservado para filtros mais complexos, que exigem múltiplos campos ou combinações de critérios." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
      { display: { attrs: {}, live: true } },
      { note: "Exemplo interativo: passe o mouse e pressione o botão para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
      ] },
      { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
    ] }
  ]
};
