/* Documentação — Drop Button
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Drop button, 1044fa) reaproveitado; props e padrões validados no set da lib estável
   (Drop Button 6955:6985); acessibilidade do componente do playground. Divergências no CONFERIR (C142). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["drop-button"] = {
  tag: "cds-drop-button",
  base: { label: "Mais ações", "show-lead-icon": false },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/1044fa-drop-button", sourceLabel: "Abrir o Drop button no zeroheight",
  cover: { description: "O Drop Button é um botão interativo que, ao ser acionado, abre um menu suspenso com opções de ação diretamente relacionadas ao contexto do botão. Ele combina a função de acionador visual com o acesso direto a um conjunto de comandos organizados.", examples: [
    { label: "Mais ações" }, { label: "Exportar", appearance: "neutral", "show-lead-icon": true, "lead-icon": "download-line" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Drop Button é um botão interativo que, ao ser acionado, abre um menu suspenso com opções de ação diretamente relacionadas ao contexto do botão. Ele combina a função de acionador visual com o acesso direto a um conjunto de comandos organizados." },
      { h3: "Nomes alternativos comuns" },
      { p: "Split Button, Dropdown Button, Menu Button." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "O Drop Button deve deixar evidente que abre um menu de ações, usando rótulos e ícones claros."],
        ["Consistência", "O menu deve ser sempre construído com o componente List, garantindo padrão visual e de uso."],
        ["Foco na ação", "O Drop Button deve apresentar exclusivamente ações relevantes e relacionadas ao contexto imediato."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Drop Button quando for necessário oferecer, a partir de um único acionador, um conjunto de ações relacionadas em formato de menu suspenso. Ele é ideal para agrupar comandos que compartilham o mesmo contexto, reduzindo a quantidade de botões visíveis e mantendo a interface organizada." },
      { h3: "Utilize para:" },
      { ul: ["Para oferecer um conjunto de ações relacionadas ao contexto atual.", "Quando houver múltiplas variações ou sub-ações de uma mesma função principal.", "Para otimizar espaço na interface, agrupando controles relacionados."] },
      { h3: "Não utilize para:" },
      { ul: ["Para exibir listas de seleção de dados (use um Select ou Combobox).", "Como navegação primária de alto nível (use um Menu de navegação dedicado).", "Para exibir conteúdos complexos, formulários ou filtros."] },
      { h2: "Casos de uso" },
      { h3: "Main button vs Drop button" },
      { p: "O Main Button executa uma única ação imediata ao ser clicado, sem apresentar opções adicionais. Ele é indicado quando há um único comando direto a ser realizado, enquanto o Drop Button é usado quando existe a necessidade de oferecer múltiplas ações em um menu suspenso." },
      { alert: { appearance: "warning", label: "Atenção", text: "Apesar dos componentes serem visualmente semelhantes, é importante se atentar sobre o contexto e indicação de uso." } },
      { compare: [
        { title: "Main Button: uma ação", attrs: { _tag: "cds-main-button", label: "Exportar", "show-lead-icon": false, "show-trailing-icon": false } },
        { title: "Drop Button: menu de ações", attrs: { label: "Exportar" } }
      ] },
      { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        // Figma: o Popover aberto embaixo do botão (marcador 4)
        attrs: { _tag: "div", class: "pg-doc-col", _children: [
          { _tag: "cds-drop-button", label: "Label", "show-lead-icon": true, active: true },
          { _tag: "cds-popover", inline: true, label: "Mais ações", _children: [
            { _tag: "cds-content-list-item", label: "Baixar relatório", "lead-icon": "download-line", "show-description": false, "show-trailing-item": false, "show-divider": false },
            { _tag: "cds-content-list-item", label: "Compartilhar", "lead-icon": "share-line", "show-description": false, "show-trailing-item": false, "show-divider": false }
          ] }
        ] },
        markers: [{ n: 1, target: ".cds-btn", side: "left" }, { n: 2, target: ".cds-btn > cds-icon:first-child", side: "top" }, { n: 3, target: ".cds-btn > cds-icon:last-child", side: "right" }, { n: 4, target: "cds-popover", side: "left" }],
        legend: ["Container", "Lead icon", "Trailing icon", "Popover"]
      } },
      { h2: "Composição do componente" },
      { p: "O Drop Button é composto por um botão acionador, contendo rótulo e ícone indicativo de menu, e por um Popover com slot suspenso que é exibido no estado pressed. Nesse slot, podem ser inseridos itens de composição, como List Items, permitindo a criação de um menu suspenso por meio de swap components." },
      { note: "No playground, o Popover (4) é de quem implementa: o Drop Button alterna `active` e dispara `cds-toggle`. Confira o exemplo na tab Playground." },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Ghost"] },
        { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Neutral", "Inversed"] },
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Size", type: "Variant", default: "Medium", values: ["Medium", "Small"] },
        { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
        { name: "Text Label", type: "Text", default: "Label" },
        { name: "Show Lead Icon", type: "Boolean", default: "true" },
        { name: "Lead Icon", type: "Swap component", default: "placeholder-line" }
      ] },
      { note: "Props e padrões lidos do set Drop Button da lib estável. O zeroheight chama `Appearance` de Style e não lista `Is Active` (CONFERIR C142)." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Kind × Appearance" },
      { specimens: { title: "Default", min: "var(--common-sizes-160)", items: [
        { label: "Accent", attrs: {} }, { label: "Neutral", attrs: { appearance: "neutral" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-drop-button", label: "Mais ações", appearance: "inversed", "show-lead-icon": false }] } }
      ] } },
      { specimens: { title: "Ghost", min: "var(--common-sizes-160)", items: [
        { label: "Accent", attrs: { kind: "ghost" } }, { label: "Neutral", attrs: { kind: "ghost", appearance: "neutral" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-drop-button", label: "Mais ações", kind: "ghost", appearance: "inversed", "show-lead-icon": false }] } }
      ] } },
      { h2: "State e Is Active" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } }, { label: "Is Active · True", attrs: { active: true } }
      ] } },
      { h2: "Size" },
      { specimens: { min: "var(--common-sizes-160)", items: [{ label: "Medium · 48", attrs: {} }, { label: "Small · 40", attrs: { size: "small" } }] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "É um `<button>` nativo com `aria-haspopup` e `aria-expanded` (aberto ou fechado), anunciado como botão de menu.",
        "O chevron é decorativo. O estado vem de `aria-expanded`.",
        "O menu aberto deve usar o List do DS, com itens focáveis.",
        "Disabled usa `disabled` nativo: sai da tabulação."
      ] },
      { h2: "Teclado e foco" },
      { ul: ["Tab foca o botão. Enter e Espaço abrem e fecham o menu.", "Esc fecha o menu e devolve o foco ao Drop Button.", "Foco visível segue o padrão global do Castanha."] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Mesmos pares do Main Button: Default · Accent 4,54:1 (AA), Neutral 15,27:1 e Inversed 16,96:1 (AA e AAA).", "Estado desabilitado: isento do critério 1.4.3."] },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para o Drop button." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: { label: "Mais ações", active: true }, title: "Conteúdo do Drop button", text: "O dropdown do Drop Button deve ser construído exclusivamente com o componente List do design system, garantindo que represente de forma consistente e padronizada um menu de ações." },
        { attrs: { label: "Mais ações" }, title: "Quantidade de opções", text: "Limite a quantidade de opções para facilitar a escolha e evitar sobrecarga cognitiva (idealmente até 7 itens). Organize os itens em ordem lógica ou de frequência de uso, podendo utilizar separadores quando houver grupos distintos." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", text: "Usar o Drop Button exclusivamente para abrir menus de ações diretamente relacionadas ao contexto." },
        { kind: "dont", text: "Não use o Drop Button como substituto para outros componentes de seleção ou navegação." },
        { kind: "do", text: "Construir o menu exclusivamente com os componentes List do design system." },
        { kind: "dont", text: "Não usar o Drop Button para exibir formulários, filtros ou qualquer conteúdo que não seja menu." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
      { display: { attrs: { label: "Mais ações" }, live: true } },
      { note: "Exemplo interativo: passe o mouse, pressione e clique para abrir e fechar." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] },
        { title: "Is Active → True", rows: [["Gatilho", "On click"], ["Motion Style", "`Selected In/01`"]] },
        { title: "Is Active → False", rows: [["Gatilho", "On click"], ["Motion Style", "`Selected Out/01`"]] }
      ] },
      { note: "No zeroheight, o Pressed do Drop button usa easing systemic/default com duração medium/03, que não corresponde a nenhum Motion Style. Aqui vale `Pressed/01`, como nos outros botões (CONFERIR C142)." },
      { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
    ] }
  ]
};
