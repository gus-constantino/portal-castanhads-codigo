/* Documentação — Selection List Item
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Selection List Item, 860c6e) reaproveitado; props e padrões do set da lib estável
   (Selection List Item 5488:812 — sem description); acessibilidade e contrastes do playground (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function sli(label, description, more){ return Object.assign({ _tag: "cds-selection-list-item", label: label, description: description, "lead-icon": "placeholder-line" }, more || {}); }
  function group(items, card){ return { _tag: "div", class: "pg-doc-list-stack" + (card ? " pg-doc-list-stack--card" : ""), _children: items }; }
  var PLANS = [["Mensal", "R$ 29,90 por mês, cancele quando quiser", "calendar-line"], ["Anual", "R$ 299,00 por ano, 2 meses grátis", "calendar-check-line"]];

  CDS.docs["selection-list-item"] = {
    tag: "cds-selection-list-item",
    base: { label: "Mensal", description: "R$ 29,90 por mês, cancele quando quiser", "lead-icon": "calendar-line" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/860c6e-selection-list-item", sourceLabel: "Abrir o Selection List Item no zeroheight",
    cover: { description: "O Selection List Item é um componente de seleção que combina título, descrição e ícone para enriquecer a apresentação das opções. Ele amplia a clareza das escolhas, indo além de seletores básicos como checkbox, radio ou switch.", examples: [
      group(PLANS.map(function(p, i){ return sli(p[0], p[1], { "lead-icon": p[2], "trailing-item": "radio-button", name: "doc-sli-cover", "is-active": i === 0 ? true : null }); }))
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Selection List Item é um componente de seleção que combina título, descrição e ícone para enriquecer a apresentação das opções. Ele amplia a clareza das escolhas, indo além de seletores básicos como checkbox, radio ou switch." },
        { h3: "Nomes alternativos comuns" },
        { p: "Option item, List option, Item de seleção." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza de intenção", "Cada item deve deixar explícito se a ação esperada é selecionar, navegar ou consultar, evitando ambiguidades."],
          ["Consistência de comportamento", "Todos os itens da lista devem seguir o mesmo padrão de interação, mantendo previsibilidade para o usuário."],
          ["Foco na escolha", "O componente deve priorizar a seleção de opções, sem misturar elementos que desviem a atenção da decisão principal."]
        ] },
        { h2: "Quando usar" },
        { p: "O Selection List Item deve ser usado quando a opção de seleção precisa transmitir mais do que um rótulo, permitindo incluir título, descrição e ícone para dar clareza à escolha. Ele é ideal para ser utilizado de forma isolada ou em grupo, quando seletores tradicionais como checkbox, radio ou switch não são suficientes para comunicar todas as informações necessárias." },
        { h3: "Utilize para:" },
        { ul: ["Em fluxos de decisão nos quais cada alternativa precisa de informações adicionais (ex.: título, descrição e ícone).", "Para representar grupos de opções exclusivas ou múltiplas, permitindo comparação clara entre elas.", "Quando seletores básicos não oferecem contexto suficiente para orientar a escolha do usuário."] },
        { h3: "Não utilize para:" },
        { ul: ["Para escolhas binárias diretas, que podem ser resolvidas com Radio Button ou Switch.", "Quando a opção é autoexplicativa e não exige descrições ou ícones.", "Em contextos puramente informativos, sem necessidade de seleção (prefira Content List Item)."] },
        { h2: "Casos de uso" },
        { h3: "Selection List Item vs Checkbox, Radio e Switch" },
        { p: "Checkbox, Radio e Switch são seletores ideais quando a decisão é direta, binária ou de múltipla escolha, mas com opções autoexplicativas, como “Sim/Não” ou “Ativar/Desativar notificações”. Já o Selection List Item é indicado quando cada alternativa precisa de mais clareza e contexto, como título, descrição ou ícone. Ele transforma a escolha em algo mais visual e informativo, tornando-se útil em cenários de comparação, como escolher um plano de assinatura ou definir um método de envio." },
        { compare: [
          { title: "Switch: escolha direta", attrs: { _tag: "cds-switch", label: "Ativar notificações", status: "selected" } },
          { title: "Selection List Item: escolha com contexto", attrs: group(PLANS.map(function(p, i){ return sli(p[0], p[1], { "lead-icon": p[2], "trailing-item": "radio-button", name: "doc-sli-vs", "is-active": i === 0 ? true : null }); })) }
        ] },
        { h3: "Selection list item vs Content list item" },
        { p: "O Content List Item é utilizado para exibir informações de forma organizada, sem ter como objetivo principal a seleção. Ele mostra dados como nome, status ou atributos de um item, funcionando mais como uma listagem de conteúdo. O Selection List Item, por outro lado, é voltado para a decisão: o usuário deve escolher entre opções apresentadas, cada uma enriquecida com detalhes que ajudam na comparação e no entendimento antes da seleção." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { "is-active": true }, markers: [{ n: 1, target: ".cds-tc__label", side: "top" }, { n: 2, target: ".cds-li__lead", side: "left" }, { n: 3, target: ".cds-tc__desc", side: "bottom" }, { n: 4, target: "cds-trailing-item", side: "right" }, { n: 5, target: ".cds-li__divider", side: "bottom", align: "start" }], legend: ["Text label", "Lead Item", "Text description", "Trailing item", "Divider"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Card"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Trailing Item", type: "Variant", default: "Chechbox", values: ["Chechbox", "Radio Button", "Switch", "Tag", "Icon", "None"] },
          { name: "Show Lead Item", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Selection List Item da lib estável (o Figma escreve \"Chechbox\", e no código `checkbox` e `chechbox` funcionam). No código: `label`, `description`, `show-description`, `lead-kind`/`lead-icon`/`lead-label`/`lead-src` (.Lead Item), `trailing-item`, `trailing-icon`, `tag-label`, `name` e `value`. O `state=\"hovered|pressed\"` serve exclusivamente para exemplos. Evento `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Default", attrs: {} }, { label: "Card", attrs: { kind: "card" } }
        ] } },
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Is Active" },
        { specimens: { items: [
          { label: "Default · Is Active", attrs: { "is-active": true } }, { label: "Card · Is Active", attrs: { kind: "card", "is-active": true } }
        ] } },
        { h2: "Trailing Item" },
        { specimens: { items: [
          { label: "Checkbox", attrs: { "is-active": true } }, { label: "Radio Button", attrs: { "trailing-item": "radio-button", "is-active": true, name: "doc-sli-tr" } },
          { label: "Switch", attrs: { "trailing-item": "switch", "is-active": true } }, { label: "Tag", attrs: { "trailing-item": "tag", "tag-label": "Novo" } },
          { label: "Icon", attrs: { "trailing-item": "icon", "trailing-icon": "information-line" } }, { label: "None", attrs: { "trailing-item": "none" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Com Checkbox, Radio Button ou Switch, o foco vai para o controle nativo, que tem o nome do Label: o leitor de tela anuncia o tipo, o nome e o estado.",
          "A linha inteira é clicável e repassa o clique ao controle (área de toque maior que o controle).",
          "Sem controle (Tag, Icon, None), a linha é um `<button aria-pressed>`.",
          "Radio Buttons com o mesmo `name` formam um grupo: setas trocam a opção.",
          "O Lead Item é decorativo. O significado está no Label e na descrição."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) 16,96:1 · descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Is Active (fundo Accent/Solid/soft): Label 15,70:1 · descrição 7,63:1."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Selection List Item." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: group(PLANS.map(function(p, i){ return sli(p[0], p[1], { "lead-icon": p[2], "trailing-item": "radio-button", name: "doc-sli-g1", "is-active": i === 0 ? true : null }); })), title: "Seleção", text: "Mantenha cada Selection List Item visualmente próximo, garantindo que todas as opções sejam identificadas de imediato como parte do mesmo grupo de seleção." },
          { attrs: group([sli("Vale-refeição", "Restaurantes e delivery", { "lead-icon": "meal-line", "is-active": true }), sli("Mobilidade", "Transporte e combustível", { "lead-icon": "mobility-line" })]), title: "Trailing item", text: "O trailing item deve ser usado para fornecer ações ou informações adicionais relacionadas ao item da lista. Utilize sempre o mesmo em todo o grupo de seleção." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: group([sli("Vale-refeição", "Restaurantes e delivery", { kind: "card", "lead-icon": "meal-line", "is-active": true }), sli("Mobilidade", "Transporte e combustível", { kind: "card", "lead-icon": "mobility-line" })], true), text: "Utilize sempre o mesmo Kind em um grupo de opções." },
          { kind: "dont", attrs: group([sli("Vale-refeição", "Restaurantes e delivery", { kind: "card", "lead-icon": "meal-line", "is-active": true }), sli("Mobilidade", "Transporte e combustível", { "lead-icon": "mobility-line" })], true), text: "Não mescle os dois Kinds no mesmo grupo de opções." },
          { kind: "do", attrs: { _tag: "cds-switch", label: "Receber notificações", status: "selected" }, text: "Quando o tipo de escolha na seleção for direta, utilize outros tipos de seletores." },
          { kind: "dont", attrs: group([sli("Sim", "", { "show-lead-item": false, "show-description": false, "trailing-item": "radio-button", name: "doc-sli-d2", "is-active": true }), sli("Não", "", { "show-lead-item": false, "show-description": false, "trailing-item": "radio-button", name: "doc-sli-d2" })]), text: "Use o Selection List Item quando a opção de seleção exigir informações complementares, como descrições adicionais e/ou ícones de apoio." }
        ] },
        { note: "No zeroheight, o último Don't está escrito como recomendação (\"Use…\"). O exemplo mostra o caso a evitar: opções básicas, sem descrição nem ícone (CONFERIR C139)." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e selecione." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do zeroheight está com o texto modelo e a tabela vazia. O mapeamento acima segue o padrão de estados de interação. No código, as transições usam short/03 + systemic/accelerate (CONFERIR C139)." } }
      ] }
    ]
  };
})();
