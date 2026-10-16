/* Documentação — Accordion Item
   Fonte: [CastanhaDS] Component use documentation · seção 7073:28317 · frame [Documentação] Accordion Item (7073:30979)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Capa: o [Header] (7073:28385) é único para Accordion e Accordion Item e mostra um Accordion (12 itens, o 2º aberto);
   aqui ele aparece igual, via _tag "cds-accordion" + _children.
   Oculto no Figma e de fora: comparação "Content List Item vs Accordion Item" (Uso), títulos "Viewport"/"Accent" (Estilos),
   Acessibilidade (só placeholder "Tópico 1 / Ordem de leitura"), "Casos de exceção" (lorem ipsum), nota de Reduced motion
   e os 3 Do/Don'ts lorem ipsum.
   Gaps: o Slot vazio do Figma tem 82px; no código um Slot vazio não ocupa altura. As etiquetas de tipo das props no Figma
   dizem todas "Variant"; aqui seguem o componente (Show Lead Item/Show Divider = Boolean, Slot = Slot → "Swap component"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // itens do [Header]: 4 perguntas repetidas 3 vezes (12 itens), só o 2º aberto, sem Lead Item, Divider nem Description
  var faq = ["Como funciona o reembolso?", "Quando recebo o benefício?", "Posso transferir o saldo?", "Onde uso o cartão?"];
  var headerItems = [];
  for (var i = 0; i < 12; i++) headerItems.push({ _tag: "cds-accordion-item", label: faq[i % 4], collapsed: i !== 1 || null, "show-description": false, "show-lead-item": false, "show-divider": false });

  CDS.docs["accordion-item"] = {
    tag: "cds-accordion-item",
    base: {},
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7073-28317",
    // Capa (frame [Header] Accordion, compartilhado com a doc do Accordion): moldura alta e cortada embaixo
    cover: { description: "Item de um accordion: um header com título que revela conteúdo adicional (no Slot) ao ser expandido.", tall: true,
      attrs: { _tag: "cds-accordion", _children: headerItems } },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Item de um accordion: um header com título que revela conteúdo adicional (no Slot) ao ser expandido. Faz parte da família Accordion Lists — vários itens são arranjados pelo conjunto Accordion." },
        { h3: "Nomes alternativos comuns" },
        { p: "Disclosure item, accordion panel, painel expansível, expander, seção retrátil." },
        { h3: "Princípios" },
        { cards: [
          ["Revelar sob demanda", "O conteúdo extra fica no Slot, oculto até a pessoa expandir — reduz a carga visual e deixa a leitura previsível."],
          ["Título claro e curto", "O header (Label + Description) resume o que há dentro, pra pessoa prever o conteúdo antes de abrir."],
          ["Estado além da cor", "O chevron, que gira quando o item abre ou fecha, e a revelação do conteúdo sinalizam o estado — não use a cor como único sinal."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Accordion Item para organizar conteúdo extenso em seções que a pessoa abre sob demanda, agrupando informação secundária sem tirá-la da página." },
        { h3: "Utilize para:" },
        { ul: ["Perguntas frequentes (FAQ)", "Detalhes de um pedido ou resumo expansível", "Formulários longos agrupados por tema ou etapa"] },
        { h3: "Não utilize para:" },
        { ul: ["Informação essencial que deve estar sempre visível", "Navegação entre páginas ou seções — use Link ou Botão", "Alternar um estado imediato — use Switch"] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: {},
          markers: [
            { n: 1, target: ".cds-acc__lead", side: "left" },
            { n: 2, target: ".cds-acc__text", side: "bottom" },
            { n: 3, target: ".cds-acc__chev", side: "right" },
            { n: 4, target: ".cds-acc__panel", side: "bottom", long: true },
            { n: 5, target: ".cds-acc__divider", side: "bottom", align: "end" }
          ],
          legend: ["Lead Item (opcional)", "Label + Description", "Ícone indicador (chevron)", "Slot (conteúdo revelado)", "Divider (opcional)"]
        } },
        { h2: "Composição do componente" },
        { p: "O Accordion Item é composto por um header — .Lead Item (opcional), .Text Content (Label + Description) e o ícone indicador (dropdown-close-line, girado 180° quando recolhido) — mais o Slot que recebe o conteúdo revelado e um Divider opcional. Vários itens são arranjados pelo conjunto Accordion." },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant" },
          { name: "Kind", type: "Variant", values: ["Default", "Card"] },
          { name: "Is Collapsed", type: "Variant" },
          { name: "Show Lead Item", type: "Boolean" },
          { name: "Show Divider", type: "Boolean" },
          { name: "Slot", type: "Swap component" }
        ] },
        { note: "Todas as props podem ser testadas na tab Playground." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Estados do item", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { specimens: { title: "Kind × State", items: [
          { label: "Default · Enabled", attrs: {} },
          { label: "Default · Disabled", attrs: { disabled: true } },
          { label: "Card · Enabled", attrs: { kind: "card" } },
          { label: "Card · Disabled", attrs: { kind: "card", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Acessibilidade" },
        { note: "Sem conteúdo no Figma para esta seção." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: { collapsed: true }, title: "Use para conteúdo secundário, não essencial",
            text: "O accordion esconde conteúdo atrás de um clique. Reserve-o para informação complementar. O que é essencial fica sempre visível." },
          { attrs: {}, title: "Sinalize o estado além da cor",
            text: "O chevron (aberto/fechado) e a revelação do conteúdo indicam o estado — não use a cor como único sinal de que está expandido." },
          { attrs: {}, title: "Títulos curtos e escaneáveis",
            text: "Escreva labels curtos e descritivos. A pessoa precisa prever o conteúdo de cada seção antes de abrir." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: { collapsed: true, "lead-icon": "support-line", label: "Perguntas frequentes", "show-description": false },
            text: "Seção de conteúdo secundário que pode ficar recolhida (FAQ, detalhes de um pedido)." },
          { kind: "dont", attrs: { collapsed: true, "lead-icon": "balance-line", label: "Saldo disponível", description: "R$ 1.240,00" },
            text: "Informação essencial — mantenha sempre visível, não esconda atrás de um clique." },
          { kind: "do", attrs: { collapsed: true, "lead-icon": "file-text-error-line", label: "Política de cancelamento", description: "Resumo em uma linha" },
            text: "Título curto que resume o conteúdo da seção." },
          { kind: "dont", attrs: { collapsed: true, "lead-icon": "settings-line", label: "Ir para Configurações", "show-description": false },
            text: "Como navegação entre páginas ou seções — use Link ou Botão." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições de estado do Accordion Item usam os Motion Styles do Castanha (modo Normal)." },
        { display: { attrs: { label: "Como funciona o reembolso?", "show-lead-item": false, "show-description": false, collapsed: true }, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e abra ou recolha o item para ver cada transição." },
        { specs: [
            { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
            { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/01`"]] },
            { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
            { title: "Recolhido → Aberto", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
            { title: "Aberto → Recolhido", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] },
            { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
          ] },
          { note: "Ao abrir, a seta gira 180º e o conteúdo desce. Ao recolher, o inverso. Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." }
      ] }
    ]
  };
})();
