/* Documentação — Content List Item
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Content List Item, 32e6da · status Backlog) reaproveitado; props e padrões do set da lib
   estável (Content List Item 5488:675 — sem description); acessibilidade e contrastes do playground (C139).
   Arrastar para reordenar (CDS-1592, 13/10): Show Drag Handle e State=Dragged lidos na branch bHFCiEbEkTYCXNipG4iqN0 e o handoff
   do time (docs/local/handoffs). O que a branch e o handoff dizem diferente está no C200.
   Textos de arraste (Sobre, Estilos › Arraste, Acessibilidade, diretriz Reordenação, Do/Don't) da folha [Documentation] Content list item
   da branch (26362:9563), lida em 14/10. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function cli(more){ return Object.assign({ _tag: "cds-content-list-item" }, more || {}); }
  function nav(label, description, icon, more){ return cli(Object.assign({ intent: "navigation", label: label, description: description, "lead-icon": icon, href: "#", "show-tag": false }, more || {})); }
  function tx(label, description, value, more){ return cli(Object.assign({ intent: "transaction", label: label, description: description, value: value, "value-description": "Débito", "shaped-icon": "meal-line", href: "#" }, more || {})); }
  function reo(card){ return { _tag: "cds-content-list", reorderable: "", label: "Atalhos da tela inicial", kind: card ? "card" : null, intent: "navigation", _children: [
    nav("Cartões", "Físico e virtual", "cards-line"), nav("Colaboradores", "Cadastro e acessos", "user-money-line"), nav("Limites", "Diário e por compra", "chart-bar-line"), nav("Configurações", "Empresa e preferências", "settings-line")
  ] }; }
  function rlist(items){ return { _tag: "cds-content-list", reorderable: "", label: "Exemplo", _children: items.map(function(i){ return cli({ label: i[0], "lead-icon": i[1], "show-description": "false" }); }) }; }
  function stack(items, card){ return { _tag: "div", class: "pg-doc-list-stack" + (card ? " pg-doc-list-stack--card" : ""), _children: items }; }

  CDS.docs["content-list-item"] = {
    tag: "cds-content-list-item",
    base: { label: "Dados da empresa", description: "CNPJ, endereço e contatos", "lead-icon": "business-line" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/32e6da-content-list-item", sourceLabel: "Abrir o Content List Item no zeroheight",
    cover: { description: "O Content list item é um bloco de conteúdo que organiza informações de forma clara e escaneável dentro de listas. Ele combina elementos como título, descrição, ícone, avatar ou status, ajudando o usuário a identificar de relance itens, conteúdos ou ações relacionadas. Quando a lista é reordenável, o item mostra uma alça de arraste à esquerda e pode ser levantado para mudar de posição.", examples: [
      stack([nav("Dados da empresa", "CNPJ, endereço e contatos", "business-line"), tx("Restaurante Bom Prato", "Hoje, 12:40", "42,90")])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Arrastar para reordenar em desenvolvimento · CDS-1592", text: "A alça (Show Drag Handle) e o estado Dragged estão na branch do Figma e entram no Release 26. Ainda não existem no castanha-react. O resto do Content List Item está publicado." } },
        { p: "[Abrir a branch no Figma](https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/bHFCiEbEkTYCXNipG4iqN0/-CastanhaDS--Components?node-id=5488-675) · Jira CDS-1592 · épico CDS-1586." },
        { h2: "Sobre" },
        { p: "O Content list item é um bloco de conteúdo que organiza informações de forma clara e escaneável dentro de listas. Ele combina elementos como título, descrição, ícone, avatar ou status, ajudando o usuário a identificar de relance itens, conteúdos ou ações relacionadas. Quando a lista é reordenável, o item mostra uma alça de arraste à esquerda e pode ser levantado para mudar de posição." },
        { h3: "Nomes alternativos comuns" },
        { p: "List item, Content row, List row." },
        { h3: "Princípios" },
        { cards: [
          ["Organização da informação", "Estruture os itens de forma clara e hierárquica, facilitando a leitura e compreensão dos conteúdos apresentados."],
          ["Consistência visual e funcional", "Mantenha o mesmo padrão de layout, espaçamento e comportamento entre os itens para garantir uma experiência uniforme."],
          ["Clareza de propósito", "Cada lista deve ter um objetivo bem definido — seja exibir informações, navegar ou mostrar transações — evitando misturar diferentes tipos de conteúdo."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Content list item quando precisar apresentar informações em formato de lista ou de forma isolada, com suporte a múltiplos elementos visuais (como ícones, status ou descrições adicionais) que ajudem a identificar o conteúdo de relance. Ele é ideal para navegação, agrupamento de dados ou exibição de opções que não dependem exclusivamente de seleção." },
        { h3: "Utilize para:" },
        { ul: ["Exibir itens de conteúdo em listas navegáveis ou de forma isolada.", "Mostrar informações complementares em cada item (ex: título + subtítulo + ícone).", "Organizar conteúdos repetidos, como mensagens, documentos ou usuários.", "Estruturar visualmente grupos de dados com consistência."] },
        { h3: "Não utilize para:" },
        { ul: ["Criar seletores de opção (use Selection list item).", "Substituir botões de ação principais.", "Exibir um único dado isolado (use texto ou outro componente mais direto).", "Estruturar tabelas complexas (use Tables)."] },
        { h2: "Casos de uso" },
        { h3: "Content list item vs Selection list item" },
        { p: "Enquanto o Selection list item serve para escolhas (com estado de seleção), o Content list é focado em organizar e exibir informações, sem necessariamente permitir seleção direta." },
        { compare: [
          { title: "Content List Item: exibe e navega", attrs: nav("Dados da empresa", "CNPJ, endereço e contatos", "business-line") },
          { title: "Selection List Item: escolhe", attrs: { _tag: "cds-selection-list-item", label: "Vale-refeição", description: "Restaurantes e delivery", "lead-icon": "meal-line", "is-active": true } }
        ] },
        { h2: "Lista reordenável" },
        { p: "Arrastar para reordenar é uma capacidade do Content List Item, não um componente separado. Com Show Drag Handle ligado, o item mostra a alça à esquerda. Ao arrastar, ele fica no estado Dragged e a lista abre o espaço no lugar de destino." },
        { display: { attrs: reo(), live: true } },
        { note: "Exemplo interativo: arraste pela alça, ou leve o foco até a alça com Tab, aperte Espaço, mova com as setas e aperte Espaço de novo." },
        { p: "Ative a alça de arraste só quando a ordem dos itens for definida pelo usuário. Veja Diretrizes › Reordenação." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { intent: "default", label: "Dados da empresa", description: "CNPJ, endereço e contatos", "lead-icon": "business-line" }, markers: [{ n: 1, target: ".cds-tc__label", side: "top" }, { n: 2, target: ".cds-li__lead", side: "left" }, { n: 3, target: ".cds-tc__desc", side: "bottom" }, { n: 4, target: "cds-trailing-item", side: "right" }, { n: 5, target: ".cds-li__divider", side: "right" }], legend: ["Text label", "Lead Item", "Text description", "Trailing item", "Divider"] } },
        { h3: "Outras variações (Navigation, Transaction e alça de arraste)" },
        { anatomy: { attrs: stack([nav("Limites", "Diário e por compra", "chart-bar-line"), tx("Restaurante Bom Prato", "Hoje, 12:40", "42,90"), cli({ intent: "default", label: "Dados da empresa", description: "CNPJ, endereço e contatos", "lead-icon": "business-line", "show-drag-handle": "true", "show-trailing-item": false })]), markers: [{ n: 6, target: ":scope > :nth-child(1) .cds-li__nav", side: "right" }, { n: 7, target: ":scope > :nth-child(2) .cds-li__shaped", side: "left" }, { n: 8, target: ":scope > :nth-child(2) .cds-cc2__row", side: "right" }, { n: 9, target: ":scope > :nth-child(2) .cds-cc2__desc", side: "bottom" }, { n: 10, target: ":scope > :nth-child(3) .cds-li__drag", side: "left" }], legend: ["Icon (indicador de navegação)", "Shaped Icon", "Currency label", "Text description", "Drag handle (opcional, Show Drag Handle)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Card"] },
          { name: "Intent", type: "Variant", default: "Default", values: ["Default", "Navigation", "Transaction"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled", "Dragged"] },
          { name: "Show Lead Item", type: "Boolean", default: "true" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" },
          { name: "Show Navigation Indicator", type: "Boolean", default: "true" },
          { name: "Show Tag", type: "Boolean", default: "true" },
          { name: "Show Drag Handle", type: "Boolean", default: "false" }
        ] },
        { p: "Dragged e Show Drag Handle são da branch (CDS-1592). Show Drag Handle começa desligado: nenhuma instância que já existe passa a mostrar a alça." },
        { table: { head: ["Intent", "Composição"], rows: [["Default", ".Lead Item + .Text Content + .Trailing Item (padrão Checkbox)"], ["Navigation", ".Lead Item + .Text Content + Tag (Warning) + navigation-right-line"], ["Transaction", "Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line"]] } },
        { note: "Props e padrões lidos do set Content List Item da lib estável. O zeroheight lista \"Show Lead Icon\" e \"Show Trailing Icon\" e um grupo \"Role\". Na lib são Show Lead Item, Show Trailing Item e Intent (CONFERIR C139). No código: `intent`, `href` (a linha vira link), `trailing-item`, `status`, `tag-label`, `tag-appearance`, `shaped-icon`, `value`, `symbol`, `show-negative-symbol`, `value-description` e os `show-*`. Para a alça: `show-drag-handle` e `state=\"dragged\"`. A reordenação é da lista: `<cds-content-list reorderable>`." },
        { h2: "Entrega para dev · CDS-1592" },
        { table: { head: ["Elemento", "Token ou valor (branch, 13/10)"], rows: [
          ["Drag Handle", "Frame do próprio item, sem building block · mín. 24×24 (`Sizes/24`) · padding `Sizes/2` · ícone `drag-line` 20 em `Icons/intense` · à esquerda do Lead Item"],
          ["Dragged · fundo", "`Surface/default`"],
          ["Dragged · elevação", "`Elevation/level 1` (x 0 · y 4 · blur 8)"],
          ["Dragged · borda", "`Border/semi-soft` por dentro, fora do layout. Kind=Default: só à esquerda, `Border/Width/hairline`. Card: `hairline` em cima, à direita e embaixo e `Border/Width/thick` à esquerda"],
          ["Dragged · Divider e altura", "Iguais ao Enabled: Divider no Kind=Default, 69 no Intent Default, 62 no Navigation e no Transaction, 80 no Card"]
        ] } },
        { ul: [
          "Prop `showDragHandle?: boolean` (padrão `false`) e o estado `dragged` no Content List Item do castanha-react.",
          "A alça é um controle de reordenação com nome acessível \"Reordenar {label}\". Ela não pode disparar a ação da linha (link, botão ou controle). De preferência, fora do elemento da linha, para não aninhar controles.",
          "A reordenação é da lista: abre o espaço no índice sob o cursor e desloca os vizinhos. O espaçamento da lista não muda.",
          "Alternativa sem arrastar (WCAG 2.5.7): Espaço ou Enter levanta, setas movem, Espaço ou Enter solta, Esc cancela.",
          "Anunciar a posição nova (`aria-live`), contando a partir de 1.",
          "Evento de mudança com origem e destino (no portal, `cds-reorder { from, to }`).",
          "Fora da entrega: a alça no Selection List Item."
        ] }
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
          { label: "Pressed", attrs: { intent: "navigation", href: "#", "show-tag": false, state: "pressed" } }, { label: "Disabled", attrs: { intent: "navigation", "show-tag": false, disabled: true } },
          { label: "Dragged", attrs: { intent: "navigation", href: "#", "show-tag": false, "show-drag-handle": "true", state: "dragged" } }
        ] } },
        { h2: "Arraste" },
        { specimens: { items: [
          { label: "Com alça", attrs: { "show-drag-handle": "true", label: "Label", description: "Description", "lead-icon": "placeholder-line" } },
          { label: "Dragged", attrs: { kind: "card", "show-drag-handle": "true", state: "dragged", label: "Label", description: "Description", "lead-icon": "placeholder-line" } }
        ] } },
        { specimens: { title: "Dragged por Kind", items: [
          { label: "Default · Dragged", attrs: { intent: "navigation", href: "#", "show-tag": false, "show-drag-handle": "true", state: "dragged" } },
          { label: "Card · Dragged", attrs: { kind: "card", intent: "navigation", href: "#", "show-tag": false, "show-drag-handle": "true", state: "dragged" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Com `href`, a linha é um link (`<a>`): o nome é o Label + a descrição, e `Enter` abre.",
          "No Intent Default com controle no trailing, a linha repassa o clique ao controle nativo, que tem o nome do Label.",
          "Sem link nem controle, a linha é um botão.",
          "O indicador de navegação (seta) e o Lead Item são decorativos.",
          "No Transaction, o valor é lido como texto. Se for negativo, o sinal precisa estar no texto, não exclusivamente na cor."
        ] },
        { h2: "Alça de arraste" },
        { ul: [
          "Nome acessível de controle de reordenação (ex.: Reordenar {item}).",
          "Alvo de 24×24 (WCAG 2.5.8 Target Size).",
          "Operável por teclado. O foco segue o padrão global do Castanha DS."
        ] },
        { h2: "Reordenar sem arrastar" },
        { ul: [
          "Ofereça uma alternativa ao arraste (WCAG 2.5.7): teclado ou ação equivalente.",
          "O arraste não pode ser a única forma de reordenar.",
          "Anuncie a nova posição ao mover (aria-live)."
        ] },
        { table: { head: ["Tecla, com foco na alça", "Efeito", "Anúncio"], rows: [
          ["Espaço ou Enter", "Levanta o item", "Limites levantado, posição 3 de 4. Use as setas para mover."],
          ["↑ ou ↓", "Move uma posição, o foco segue a alça", "Limites, posição 2 de 4"],
          ["Espaço ou Enter", "Solta", "Limites solto na posição 2 de 4"],
          ["Esc", "Cancela e devolve o item à origem", "Cancelado. Limites voltou para a posição 3 de 4"]
        ] } },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) 16,96:1 · descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Valor do Transaction e indicador de navegação: 16,96:1.", "Alça (Icons/intense): 16,96:1 sobre Surface/default e 15,27:1 sobre Surface/01 (Hovered)."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: stack([nav("Cartões", "Físico e virtual", "cards-line"), nav("Colaboradores", "Cadastro e acessos", "user-money-line"), nav("Configurações", "Empresa e preferências", "settings-line")]), title: "Ordenação", text: "Use a ordem dos itens para refletir prioridade ou relevância do conteúdo." },
          { attrs: stack([cli({ label: "Compras online", description: "Usar o cartão virtual", "lead-icon": "cards-line", "trailing-item": "switch", status: "selected" }), nav("Limites", "Diário e por compra", "chart-bar-line")]), title: "Variantes", text: "É permitido mesclar diferentes variantes de content list items (como itens de navegação ou ações diretas com toggle) dentro da mesma lista, desde que se observe alguns pontos:" }
        ] },
        { ul: ["Itens diferentes devem estar organizados de forma que o usuário entenda com clareza a função de cada um.", "O usuário deve entender de imediato se o item ativa uma ação direta (ex.: switch) ou se leva para outra tela."] },
        { p: "Atenção: Quando a lista envolve seleção de opções (como em formulários ou preferências), evite misturar tipos de itens. Isso pode gerar dúvidas e comprometer a clareza da decisão do usuário." },
        { guides: [
          { attrs: reo(), title: "Reordenação", text: "Ative a alça de arraste só quando a ordem dos itens for definida pelo usuário. Garanta sempre uma forma de reordenar sem arrastar." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: nav("Dados da empresa", "Consultar e editar", "business-line"), text: "Use a variante de navegação quando o item de lista levar o usuário para telas específicas de edição ou consulta." },
          { kind: "dont", attrs: nav("Continuar", "Próxima etapa", "go-line"), text: "Não use a variante de navegação com a única função de indicar avanço no fluxo." },
          { kind: "do", attrs: tx("Restaurante Bom Prato", "Hoje, 12:40", "1.250,90"), text: "Na variante Transaction, utilize sempre o padrão de formatação monetária: ponto (.) para separar milhares e vírgula (,) para os centavos." },
          { kind: "dont", attrs: tx("Restaurante Bom Prato", "Hoje, 12:40", "1,250.90"), text: "Não utilize outra formatação monetária, como ponto (.) para separar os centavos, ou até mesmo cortar os centavos." },
          { kind: "do", attrs: rlist([["Mercado", "shopping-bag-line"], ["Farmácia", "pill-line"], ["Pizzaria", "food-delivery-line"]]), text: "Ative o arraste quando a ordem é escolha do usuário (favoritos, prioridades)." },
          { kind: "dont", attrs: rlist([["10 out · Compra", "receipt-line"], ["09 out · Pix", "pix-line"], ["08 out · Boleto", "barcode-line"]]), text: "Não torne reordenável uma lista de ordem fixa (cronológica, alfabética)." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: { intent: "navigation", href: "#", "show-tag": false }, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione a linha." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] },
          { title: "Enabled → Dragged", rows: [["Gatilho", "Ao arrastar pela alça"], ["Motion Style", "Em teste na branch (CDS-1592)"]] }
        ] },
        { p: "Na lista reordenável, os vizinhos se deslocam com Duration/Short/04 e Easing/Systemic/default enquanto o item é arrastado. É uma escolha do portal até o Motion do On drag sair da branch (C200)." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do zeroheight está com o texto modelo e a tabela vazia. O mapeamento acima segue o padrão de estados de interação. No código, short/03 + systemic/accelerate (CONFERIR C139)." } }
      ] }
    ]
  };
})();
