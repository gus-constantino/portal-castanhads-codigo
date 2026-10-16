/* Documentação — Filter Chips
   Fontes (08/10): set Filter Chips (12365:2744) na branch epatuUj3qrA77Ecbbhy2vw da lib [CastanhaDS] Components (description, props,
   variantes, tokens e annotations do Size Small), o handoff da task CDS-1599 (Chips Small Size, Release 26) e o playground.
   Sem página no zeroheight e sem [Documentation] no arquivo Component use documentation: o texto de uso segue precisando de revisão do time (C149).
   O Size Small ainda não está publicado na lib (está na branch), como o Code Input OTP e o Credit Card Input.
   A pasta é filter-chip; o id do playground (e da doc) é filter-chips. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var BRANCH = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/epatuUj3qrA77Ecbbhy2vw/-CastanhaDS--Components?node-id=12328-10100";
  function fc(label, more){ return Object.assign({ _tag: "cds-filter-chip", label: label }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: items }; }

  CDS.docs["filter-chips"] = {
    tag: "cds-filter-chip",
    base: { label: "Alimentação" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2744", sourceLabel: "Abrir o Filter Chips no Figma",
    cover: { description: "Chip que liga e desliga um filtro: selecionado, troca o ícone pelo check e inverte as cores. Tem dois tamanhos: Medium (40) e Small (32).", examples: [
      row([fc("Alimentação", { selected: true }), fc("Refeição"), fc("Mobilidade")]),
      row([fc("Alimentação", { selected: true, size: "small" }), fc("Refeição", { size: "small" }), fc("Mobilidade", { size: "small" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Size Small em desenvolvimento · CDS-1599", text: "O Size Small está na branch do Figma e entra no Release 26. Hoje a lib publicada tem o Medium (40), que continua sendo o padrão." } },
        { p: "[Abrir a branch no Figma](" + BRANCH + ") · Jira CDS-1599 (Chips Small Size) · épico CDS-1586 (Release 26)." },
        { h2: "Sobre" },
        { p: "O Filter Chip é um toggle de seleção dentro de um grupo de opções, para filtros imediatos. Cada clique alterna Is Selected: selecionado, o chip inverte as cores e o Lead Icon vira o check-line. Vários chips podem ficar selecionados ao mesmo tempo." },
        { p: "Os Filter Chips aparecem em grupo, dentro do Chips Group, logo acima do conteúdo que filtram." },
        { h3: "Nomes alternativos comuns" },
        { p: "chip de filtro, filtro rápido, toggle chip, filter pill, choice chip." },
        { h3: "Princípios" },
        { cards: [
          ["Filtro imediato", "O filtro vale assim que o chip é selecionado, sem botão de confirmar."],
          ["Seleção visível sem depender da cor", "Selecionado, o chip inverte as cores e mostra o check-line."],
          ["Dois tamanhos, uma anatomia", "Medium e Small têm as mesmas partes, os mesmos espaçamentos e o mesmo texto. A única diferença é a altura."]
        ] },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Filtros imediatos e visíveis sobre uma lista, tabela ou extrato (ex.: categorias de benefício).", "Poucas opções curtas, que cabem numa ou duas linhas."] },
        { h3: "Não utilize para:" },
        { ul: ["Filtros complexos, com vários campos — use o Filter Button com Drawer ou Bottom Sheet.", "Ações (salvar, enviar) — use um Main Button.", "Mostrar valores já escolhidos que a pessoa pode remover — use o Input Chip.", "Escolhas de formulário — use Checkbox ou Radio Button."] },
        { h2: "Tamanhos" },
        { table: { head: ["Size", "Altura", "Quando usar"], rows: [
          ["Medium (padrão)", "40", "A maior parte das telas: filtros sobre listas, extratos e buscas."],
          ["Small", "32", "Contextos de maior densidade, como tabelas, toolbars e painéis com muitos filtros."]
        ], wrap: true } },
        { h2: "Casos de uso" },
        { h3: "Filter Chip vs Input Chip" },
        { p: "O Filter Chip liga e desliga um filtro e continua na tela. O Input Chip mostra um valor já escolhido. Clicar nele remove o chip." },
        { compare: [
          { title: "Filter Chip", attrs: row([fc("Alimentação", { selected: true }), fc("Refeição")]) },
          { title: "Input Chip", attrs: row([{ _tag: "cds-input-chip", label: "Alimentação", "show-lead-icon": false }, { _tag: "cds-input-chip", label: "Refeição", "show-lead-icon": false }]) }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-chip", side: "left" }, { n: 2, target: ".cds-chip cds-icon", side: "top" }, { n: 3, target: ".cds-chip > span", side: "right" }], legend: ["Container (pill)", "Lead Icon (vira check-line quando selecionado)", "Label"] } },
        { h2: "Composição do componente" },
        { p: "Container em pílula, Lead Icon opcional (16, via `Show Lead Icon`) que vira o check-line quando selecionado, e Label em `Label/Regular`. Padding horizontal de 16 e gap de 4 entre as partes, nos dois tamanhos." },
        { h2: "Propriedades" },
        { props: [
          { name: "Size", type: "Variant", default: "Medium", values: ["Medium", "Small"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Selected", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Icon", type: "Instance swap", default: "placeholder-line" }
        ] },
        { note: "Props e padrões lidos do set Filter Chips na branch (16 variantes: State × Size × Is Selected). No código: `size` (`medium` | `small`, padrão `medium`), `label`, `icon`, `show-lead-icon`, `selected` e `disabled`. `state=\"hovered|pressed\"` é exclusivo dos exemplos. Evento `cds-change` com `{ selected }`." },
        { h2: "Medidas por tamanho" },
        { table: { head: ["Métrica", "Medium", "Small", "Token"], rows: [
          ["Altura", "40", "32", "`Common/Sizes/40` → `Common/Sizes/32`"],
          ["Padding horizontal", "16", "16", "`Common/Sizes/16`"],
          ["Padding vertical", "0", "0", "`Common/Sizes/0`"],
          ["Gap interno", "4", "4", "`Common/Sizes/4`"],
          ["Raio", "Pílula", "Pílula", "`Common/Border/Radius/pill`"],
          ["Borda", "1", "1", "`Common/Border/Width/hairline`"],
          ["Texto", "Label/Regular", "Label/Regular", "`Text Style/Label/Regular`"],
          ["Ícones (Lead e check)", "16", "16", "—"]
        ], wrap: true } },
        { p: "No código, o Small é o Medium com a altura trocada. Não existe um segundo conjunto de padding, texto ou ícones." },
        { h2: "Tokens de altura" },
        { table: { head: ["Size", "Token", "Resolve em (Desktop, Tablet e Mobile)"], rows: [
          ["Medium", "`Specific/Selection Controls/Filter Chips/Medium/height`", "`Common/Sizes/40`"],
          ["Small", "`Specific/Selection Controls/Filter Chips/Small/height`", "`Common/Sizes/32`"]
        ], wrap: true } },
        { note: "Na branch, o token `Specific/Selection Controls/Filter Chips/height` foi renomeado para `…/Medium/height`, e o `…/Small/height` é novo. Nenhum primitivo novo: o Small usa o `Common/Sizes/32`, que já existe. Enquanto a branch não é publicada, o playground usa `Common/Sizes/32` direto (CONFERIR C185)." },
        { h2: "Entrega para dev · CDS-1599" },
        { ul: [
          "Property `Size` (`Medium` padrão · `Small`) no Filter Chips.",
          "O `Small` troca apenas a altura (40 → 32). Padding, gap, texto, ícones, raio e borda vêm do Medium.",
          "Altura pelo token do componente (`…/Filter Chips/Medium/height` e `…/Filter Chips/Small/height`), sem valor solto.",
          "Os quatro estados (Enabled, Hovered, Pressed e Disabled) existem nos dois tamanhos e nos dois valores de Is Selected.",
          "Alvo de toque: o chip inteiro, com 32 no Small (mínimo de 24 da WCAG 2.5.8).",
          "Fora desta entrega: o Chips Group (a versão Single Rows tem 48 de altura, pensada para o chip de 40) e qualquer mudança de cor ou estado."
        ] }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Size" },
        { specimens: { items: [
          { label: "Medium (40)", attrs: {} }, { label: "Small (32)", attrs: { size: "small" } },
          { label: "Medium selecionado", attrs: { selected: true } }, { label: "Small selecionado", attrs: { size: "small", selected: true } }
        ] } },
        { h2: "Is Selected = False" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Is Selected = True" },
        { specimens: { items: [
          { label: "Enabled", attrs: { selected: true } }, { label: "Hovered", attrs: { selected: true, state: "hovered" } }, { label: "Pressed", attrs: { selected: true, state: "pressed" } }, { label: "Disabled", attrs: { selected: true, disabled: true } }
        ] } },
        { h2: "Small · estados" },
        { specimens: { items: [
          { label: "Enabled", attrs: { size: "small" } }, { label: "Hovered", attrs: { size: "small", state: "hovered" } }, { label: "Pressed", attrs: { size: "small", state: "pressed" } }, { label: "Disabled", attrs: { size: "small", disabled: true } },
          { label: "Selecionado", attrs: { size: "small", selected: true } }, { label: "Selecionado Hovered", attrs: { size: "small", selected: true, state: "hovered" } }, { label: "Selecionado Pressed", attrs: { size: "small", selected: true, state: "pressed" } }, { label: "Selecionado Disabled", attrs: { size: "small", selected: true, disabled: true } }
        ] } },
        { h2: "Show Lead Icon" },
        { specimens: { items: [
          { label: "Com ícone", attrs: { icon: "food-line" } }, { label: "Sem ícone", attrs: { "show-lead-icon": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Cada chip é um `<button>` com `aria-pressed`: o leitor de tela anuncia o nome e se está selecionado.",
          "`Tab` leva ao chip. `Enter` ou `Espaço` alternam a seleção.",
          "O alvo de clique é o chip inteiro: 40 no Medium e 32 no Small, acima do mínimo de 24 (WCAG 2.5.8).",
          "A seleção não depende exclusivamente da cor: o ícone vira o check-line.",
          "Os ícones são decorativos. O nome vem do Label.",
          "Em grupo, use o Chips Group com `label` para nomear o conjunto (ex.: \"Filtrar por categoria\").",
          "O foco segue o padrão global do sistema, nos dois tamanhos."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e ícone (Text/medium e Icons/medium sobre Surface/01): 7,42:1 — AA e AAA.", "Selecionado (Text/inversed sobre Surface/inversed): 16,96:1 — AA e AAA.", "Sem seleção, o chip não tem borda: o fundo (Surface/01) fica a 1,11:1 da Surface/default e a borda do Hovered (Border/medium) a 2,78:1 — abaixo de 3:1. O Label é o que identifica o chip.", "O Small usa os mesmos tokens de cor do Medium: os contrastes são os mesmos."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Labels curtos, de uma ou duas palavras, com a primeira letra maiúscula.", "Aplique o filtro na hora, sem botão de confirmar.", "Mantenha a ordem dos chips fixa e não reordene ao selecionar.", "Mostre um jeito de limpar todos os filtros quando houver vários selecionados.", "Use o Medium por padrão. Escolha o Small quando a tela pede mais densidade.", "Use um único tamanho dentro do mesmo grupo."] },
        { dodont: [
          { kind: "do", attrs: row([fc("Alimentação", { selected: true }), fc("Refeição"), fc("Mobilidade")]), text: "Use labels curtos e do mesmo tipo de informação." },
          { kind: "dont", attrs: row([fc("Mostrar só as despesas de alimentação"), fc("Salvar")]), text: "Não use frases longas nem ações dentro do grupo de filtros." },
          { kind: "do", attrs: row([fc("Alimentação", { size: "small", selected: true }), fc("Refeição", { size: "small" }), fc("Mobilidade", { size: "small" })]), text: "Use o mesmo tamanho em todos os chips do grupo." },
          { kind: "dont", attrs: row([fc("Alimentação", { selected: true }), fc("Refeição", { size: "small" }), fc("Mobilidade")]), text: "Não misture Medium e Small no mesmo grupo." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e clique para alternar a seleção." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "Pressed → Is Selected", rows: [["Gatilho", "On click"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "No Figma, as três transições usam systemic/accelerate · short/03, que não é exatamente nenhum Motion Style: Hover In/01 é systemic/default · short/03 e Pressed/01 é systemic/accelerate · short/04 (CONFERIR C149). O Small usa as mesmas transições." },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
