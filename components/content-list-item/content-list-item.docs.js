/* Documentação — Content List Item
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Content List Item, 32e6da · status Backlog) reaproveitado; props e padrões do set da lib
   estável (Content List Item 5488:675 — sem description); acessibilidade e contrastes do playground (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function cli(more){ return Object.assign({ _tag: "cds-content-list-item" }, more || {}); }
  function nav(label, description, icon, more){ return cli(Object.assign({ intent: "navigation", label: label, description: description, "lead-icon": icon, href: "#", "show-tag": false }, more || {})); }
  function tx(label, description, value, more){ return cli(Object.assign({ intent: "transaction", label: label, description: description, value: value, "value-description": "Débito", "shaped-icon": "meal-line", href: "#" }, more || {})); }
  function stack(items, card){ return { _tag: "div", class: "pg-doc-list-stack" + (card ? " pg-doc-list-stack--card" : ""), _children: items }; }

  CDS.docs["content-list-item"] = {
    tag: "cds-content-list-item",
    base: { label: "Dados da empresa", description: "CNPJ, endereço e contatos", "lead-icon": "business-line" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/32e6da-content-list-item", sourceLabel: "Abrir o Content List Item no zeroheight",
    cover: { description: "O Content list item é um bloco de conteúdo que organiza informações de forma clara e escaneável dentro de listas. Ele combina elementos como título, descrição, ícone, avatar ou status, ajudando o usuário a identificar rapidamente itens, conteúdos ou ações relacionadas.", examples: [
      stack([nav("Dados da empresa", "CNPJ, endereço e contatos", "business-line"), tx("Restaurante Bom Prato", "Hoje, 12:40", "42,90")])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Content list item é um bloco de conteúdo que organiza informações de forma clara e escaneável dentro de listas. Ele combina elementos como título, descrição, ícone, avatar ou status, ajudando o usuário a identificar rapidamente itens, conteúdos ou ações relacionadas." },
        { h3: "Nomes alternativos comuns" },
        { p: "List item, Content row, List row." },
        { h3: "Princípios" },
        { cards: [
          ["Organização da informação", "Estruture os itens de forma clara e hierárquica, facilitando a leitura e compreensão dos conteúdos apresentados."],
          ["Consistência visual e funcional", "Mantenha o mesmo padrão de layout, espaçamento e comportamento entre os itens para garantir uma experiência uniforme."],
          ["Clareza de propósito", "Cada lista deve ter um objetivo bem definido — seja exibir informações, navegar ou mostrar transações — evitando misturar diferentes tipos de conteúdo."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Content list item quando precisar apresentar informações em formato de lista ou de forma isolada, com suporte a múltiplos elementos visuais (como ícones, status ou descrições adicionais) que ajudem na rápida identificação de conteúdo. Ele é ideal para navegação, agrupamento de dados ou exibição de opções que não dependem exclusivamente de seleção." },
        { h3: "Utilize para:" },
        { ul: ["Exibir itens de conteúdo em listas navegáveis ou de forma isolada.", "Mostrar informações complementares em cada item (ex: título + subtítulo + ícone).", "Organizar conteúdos repetidos, como mensagens, documentos ou usuários.", "Estruturar visualmente grupos de dados com consistência."] },
        { h3: "Não utilize para:" },
        { ul: ["Criar seletores de opção (use Selection list item).", "Substituir botões de ação principais.", "Exibir apenas um único dado simples (use texto ou outro componente mais direto).", "Estruturar tabelas complexas (use Tables)."] },
        { h2: "Casos de uso" },
        { h3: "Content list item vs Selection list item" },
        { p: "Enquanto o Selection list item serve para escolhas (com estado de seleção), o Content list é focado em organizar e exibir informações, sem necessariamente permitir seleção direta." },
        { compare: [
          { title: "Content List Item: exibe e navega", attrs: nav("Dados da empresa", "CNPJ, endereço e contatos", "business-line") },
          { title: "Selection List Item: escolhe", attrs: { _tag: "cds-selection-list-item", label: "Vale-refeição", description: "Restaurantes e delivery", "lead-icon": "meal-line", "is-active": true } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { intent: "default", label: "Dados da empresa", description: "CNPJ, endereço e contatos", "lead-icon": "business-line" }, markers: [{ n: 1, target: ".cds-tc__label", side: "top" }, { n: 2, target: ".cds-li__lead", side: "left" }, { n: 3, target: ".cds-tc__desc", side: "bottom" }, { n: 4, target: "cds-trailing-item", side: "right" }, { n: 5, target: ".cds-li__divider", side: "bottom", align: "start" }], legend: ["Text label", "Lead Item", "Text description", "Trailing item", "Divider"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Card"] },
          { name: "Intent", type: "Variant", default: "Default", values: ["Default", "Navigation", "Transaction"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Show Lead Item", type: "Boolean", default: "true" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" },
          { name: "Show Navigation Indicator", type: "Boolean", default: "true" },
          { name: "Show Tag", type: "Boolean", default: "true" }
        ] },
        { table: { head: ["Intent", "Composição"], rows: [["Default", ".Lead Item + .Text Content + .Trailing Item (padrão Checkbox)"], ["Navigation", ".Lead Item + .Text Content + Tag (Warning) + navigation-right-line"], ["Transaction", "Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line"]] } },
        { note: "Props e padrões lidos do set Content List Item da lib estável. O zeroheight lista \"Show Lead Icon\" e \"Show Trailing Icon\" e um grupo \"Role\"; na lib são Show Lead Item, Show Trailing Item e Intent (CONFERIR C139). No código: `intent`, `href` (a linha vira link), `trailing-item`, `status`, `tag-label`, `tag-appearance`, `shaped-icon`, `value`, `symbol`, `show-negative-symbol`, `value-description` e os `show-*`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Intent" },
        { specimens: { items: [
          { label: "Default", attrs: { "show-trailing-item": false } },
          { label: "Navigation", attrs: { intent: "navigation", href: "#", "tag-label": "Pendente" } },
          { label: "Transaction", attrs: { intent: "transaction", label: "Restaurante Bom Prato", description: "Hoje, 12:40", value: "42,90", "value-description": "Débito", "shaped-icon": "meal-line", href: "#", "lead-icon": null } }
        ] } },
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Default", attrs: { intent: "navigation", href: "#", "show-tag": false } }, { label: "Card", attrs: { kind: "card", intent: "navigation", href: "#", "show-tag": false } }
        ] } },
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: { intent: "navigation", href: "#", "show-tag": false } }, { label: "Hovered", attrs: { intent: "navigation", href: "#", "show-tag": false, state: "hovered" } },
          { label: "Pressed", attrs: { intent: "navigation", href: "#", "show-tag": false, state: "pressed" } }, { label: "Disabled", attrs: { intent: "navigation", "show-tag": false, disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Com `href`, a linha é um link (`<a>`): o nome é o Label + a descrição; `Enter` abre.",
          "No Intent Default com controle no trailing, a linha repassa o clique ao controle nativo, que tem o nome do Label.",
          "Sem link nem controle, a linha é um botão.",
          "O indicador de navegação (seta) e o Lead Item são decorativos.",
          "No Transaction, o valor é lido como texto; se for negativo, o sinal precisa estar no texto, não só na cor."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) 16,96:1 · descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Valor do Transaction e indicador de navegação: 16,96:1."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: stack([nav("Cartões", "Físico e virtual", "cards-line"), nav("Colaboradores", "Cadastro e acessos", "user-money-line"), nav("Configurações", "Empresa e preferências", "settings-line")]), title: "Ordenação", text: "Use a ordem dos itens para refletir prioridade ou relevância do conteúdo." },
          { attrs: stack([cli({ label: "Compras online", description: "Usar o cartão virtual", "lead-icon": "cards-line", "trailing-item": "switch", status: "selected" }), nav("Limites", "Diário e por compra", "chart-bar-line")]), title: "Variantes", text: "É permitido mesclar diferentes variantes de content list items (como itens de navegação ou ações diretas com toggle) dentro da mesma lista, desde que se observe alguns pontos:" }
        ] },
        { ul: ["Itens diferentes devem estar organizados de forma que o usuário entenda rapidamente a função de cada um.", "O usuário deve entender de imediato se o item ativa uma ação direta (ex.: switch) ou se leva para outra tela."] },
        { p: "Atenção: Quando a lista envolve seleção de opções (como em formulários ou preferências), evite misturar tipos de itens. Isso pode gerar dúvidas e comprometer a clareza da decisão do usuário." },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: nav("Dados da empresa", "Consultar e editar", "business-line"), text: "Use a variante de navegação quando o item de lista levar o usuário para telas específicas de edição ou consulta." },
          { kind: "dont", attrs: nav("Continuar", "Próxima etapa", "go-line"), text: "Não use a variante de navegação como indicação apenas de avanço no fluxo." },
          { kind: "do", attrs: tx("Restaurante Bom Prato", "Hoje, 12:40", "1.250,90"), text: "Na variante Transaction, utilize sempre o padrão de formatação monetária: ponto (.) para separar milhares e vírgula (,) para os centavos." },
          { kind: "dont", attrs: tx("Restaurante Bom Prato", "Hoje, 12:40", "1,250.90"), text: "Não utilize outra formatação monetária, como ponto (.) para separar os centavos, ou até mesmo cortar os centavos." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: { intent: "navigation", href: "#", "show-tag": false }, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione a linha." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do zeroheight está com o texto modelo e a tabela vazia; o mapeamento acima segue o padrão de estados de interação. No código, short/03 + systemic/accelerate (CONFERIR C139)." } }
      ] }
    ]
  };
})();
