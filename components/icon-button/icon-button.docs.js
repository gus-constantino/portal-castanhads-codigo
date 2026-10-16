/* Documentação — Icon Button
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Icon button, 388224) reaproveitado; props e padrões validados no set da lib estável
   (Icon Button 4464:636); acessibilidade do componente do playground. Divergências zeroheight × lib no CONFERIR (C142). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["icon-button"] = {
  tag: "cds-icon-button",
  base: { icon: "edit-line", label: "Editar" },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/388224-icon-button", sourceLabel: "Abrir o Icon button no zeroheight",
  cover: { description: "O Icon Button é um botão compacto que exibe um ícone, sem rótulo de texto. Ele é utilizado para ações pontuais, geralmente secundárias, em interfaces que exigem economia de espaço e onde o significado do ícone é amplamente reconhecido.", examples: [
    { icon: "edit-line", label: "Editar" }, { icon: "share-line", label: "Compartilhar", appearance: "neutral" }, { icon: "delete-line", label: "Excluir", kind: "ghost", appearance: "neutral" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Icon Button é um botão compacto que exibe um ícone, sem rótulo de texto. Ele é utilizado para ações pontuais, geralmente secundárias, em interfaces que exigem economia de espaço e onde o significado do ícone é amplamente reconhecido." },
      { h3: "Nomes alternativos comuns" },
      { p: "Action Button, Icon Action, Quick Action." },
      { h3: "Princípios" },
      { cards: [
        ["Reconhecível", "O ícone deve comunicar de forma imediata e clara a ação que executa, sem depender de texto."],
        ["Localizável", "O botão deve ser identificado e selecionado sem esforço, mesmo em interfaces densas ou com muitos outros elementos próximos."],
        ["Consistente", "Deve manter alinhamento visual e comportamental com outros botões e ícones do sistema, reforçando a previsibilidade."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Icon Button quando for necessário representar uma ação de forma compacta, especialmente em interfaces com espaço limitado ou em contextos onde o significado do ícone é amplamente reconhecido pelo usuário. Ele é ideal para ações recorrentes e secundárias — como editar, excluir, compartilhar ou expandir — e deve ser sempre acompanhado de uma tooltip para garantir clareza e acessibilidade." },
      { h3: "Utilize para:" },
      { ul: ["Para ações com espaço limitado (ex: toolbars, cards, tabelas).", "Quando o ícone for amplamente compreendido e não necessitar de texto.", "Para representar ações recorrentes como “editar”, “fechar”, “favoritar” ou “compartilhar”."] },
      { h3: "Não utilize para:" },
      { ul: ["Quando o ícone sozinho não deixar a ação óbvia.", "Para ações críticas sem texto ou contexto adicional.", "Como substituto de botões principais em fluxos essenciais (use Main Button nesses casos)."] },
      { h2: "Casos de uso" },
      { h3: "Icon button vs Main button" },
      { p: "O Main Button possui rótulo textual e é usado para ações principais e mais evidentes. Já o Icon Button é usado para ações complementares ou de menor prioridade, sendo visualmente mais discreto." },
      { compare: [
        { title: "Main Button: ação principal", attrs: { _tag: "cds-main-button", label: "Salvar", "show-lead-icon": false, "show-trailing-icon": false } },
        { title: "Icon Button: ação complementar", attrs: { icon: "share-line", label: "Compartilhar", kind: "ghost", appearance: "neutral" } }
      ] },
      { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { icon: "edit-line", label: "Editar" },
        markers: [{ n: 1, target: ".cds-ib", side: "left" }, { n: 2, target: ".cds-ib > cds-icon", side: "bottom" }],
        legend: ["Container", "Icon"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Ghost"] },
        { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Inversed", "Neutral"] },
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Size", type: "Variant", default: "Medium", values: ["Medium", "Small"] },
        { name: "Icon", type: "Swap component", default: "placeholder-line" },
        { name: "Show Notification", type: "Boolean", default: "false" }
      ] },
      { note: "Props e padrões lidos do set Icon Button da lib estável. O zeroheight ainda lista Type e Style (lib: `Kind` e `Appearance`), não tem Inversed nem `Show Notification` (CONFERIR C142). No código, `label` é o nome acessível e é obrigatório." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Kind × Appearance" },
      { specimens: { title: "Default", min: "var(--common-sizes-120)", items: [
        { label: "Accent", attrs: {} }, { label: "Neutral", attrs: { appearance: "neutral" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-icon-button", icon: "edit-line", label: "Editar", appearance: "inversed" }] } }
      ] } },
      { specimens: { title: "Ghost", min: "var(--common-sizes-120)", items: [
        { label: "Accent", attrs: { kind: "ghost" } }, { label: "Neutral", attrs: { kind: "ghost", appearance: "neutral" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-icon-button", icon: "edit-line", label: "Editar", kind: "ghost", appearance: "inversed" }] } }
      ] } },
      { h2: "State" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
      ] } },
      { h2: "Size e notificação" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Medium · 48", attrs: {} }, { label: "Small · 40", attrs: { size: "small" } }, { label: "Show Notification", attrs: { icon: "notification-line", label: "Notificações", "show-notification": true, notification: "3", appearance: "neutral" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "É um `<button>` nativo. Como não tem texto visível, o nome vem do atributo `label` (`aria-label`) — obrigatório.",
        "O ícone é decorativo. Nunca dependa dele para o nome.",
        "Para ações de alternar (ex.: favoritar), use `pressed` (`aria-pressed`).",
        "Com Show Notification, o Badge é visual: inclua a contagem no `label` (ex.: \"Notificações, 3 novas\").",
        "Disabled usa `disabled` nativo: sai da tabulação."
      ] },
      { h2: "Teclado e foco" },
      { ul: ["Tab foca o botão. Enter e Espaço acionam.", "Foco visível segue o padrão global do Castanha.", "Área de toque: 48 (Medium) e 40 (Small)."] },
      { h2: "Tooltip" },
      { p: "Em web, forneça uma tooltip com a descrição da ação para garantir compreensão e acessibilidade." },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para o Icon button. Contraste do ícone: medir junto com a doc do Icon (Appearance do ícone)." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Hierarquia" },
      { p: "Os estilos do Icon button seguem três níveis de ênfase, cada um associado a um contexto de importância da ação e à hierarquia visual dentro da interface:" },
      { display: { attrs: [{}, { appearance: "neutral" }, { kind: "ghost", appearance: "neutral" }] } },
      { guides: [
        { attrs: [{ _tag: "cds-icon-button", icon: "edit-line", label: "Editar", kind: "ghost", appearance: "neutral" }, { _tag: "cds-tooltip", text: "Editar", "show-label": false }], title: "Use tooltips sempre que possível", text: "Em web, forneça uma tooltip com a descrição da ação para garantir compreensão e acessibilidade." },
        { attrs: [{ icon: "delete-line", label: "Excluir", kind: "ghost", appearance: "neutral" }, { icon: "edit-line", label: "Editar", kind: "ghost", appearance: "neutral" }, { icon: "share-line", label: "Compartilhar", kind: "ghost", appearance: "neutral" }], title: "Escolha ícones claros e universalmente reconhecíveis", text: "Use ícones com significados amplamente compreendidos (como lixeira para excluir, lápis para editar, seta para seguir)" },
        { attrs: [{ _tag: "cds-main-button", label: "Salvar", "show-lead-icon": false, "show-trailing-icon": false }, { icon: "share-line", label: "Compartilhar", kind: "ghost", appearance: "neutral" }], title: "Reserve para ações secundárias ou pontuais", text: "Use Icon Buttons para ações complementares. Ações principais devem ser feitas com Main Button." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: [{ _tag: "cds-main-button", label: "Salvar", "show-lead-icon": false, "show-trailing-icon": false }, { icon: "share-line", label: "Compartilhar", kind: "ghost", appearance: "neutral" }], text: "Quando for necessário utilizar vários botões, siga a hierarquia visual da interface." },
        { kind: "dont", attrs: [{ _tag: "cds-main-button", label: "Salvar", kind: "ghost", appearance: "neutral", "show-lead-icon": false, "show-trailing-icon": false }, { icon: "share-line", label: "Compartilhar" }], text: "Não deixe o Icon Button mais chamativo que o botão principal." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
      { display: { attrs: { icon: "edit-line", label: "Editar" }, live: true } },
      { note: "Exemplo interativo: passe o mouse e pressione o botão para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
      ] },
      { note: "No Pressed, o botão reduz a escala para 90% e volta ao tamanho original. Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." },
      { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
    ] }
  ]
};
