/* Documentação — Input Chips
   Fontes (08/10): set Input Chips (12365:2728) na branch epatuUj3qrA77Ecbbhy2vw da lib [CastanhaDS] Components (description, props,
   variantes, tokens e annotations do Size Small), o handoff da task CDS-1599 (Chips Small Size, Release 26) e o playground.
   Sem página no zeroheight e sem [Documentation] no arquivo Component use documentation: o texto de uso segue precisando de revisão do time (C149).
   O Size Small ainda não está publicado na lib (está na branch), como o Code Input OTP e o Credit Card Input.
   A pasta é input-chip; o id do playground (e da doc) é input-chips. Só o exemplo da tab Motion é interativo (os outros são inert): ali o clique remove o chip de verdade. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var BRANCH = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/epatuUj3qrA77Ecbbhy2vw/-CastanhaDS--Components?node-id=12328-10100";
  function ic(label, more){ return Object.assign({ _tag: "cds-input-chip", label: label }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: items }; }

  CDS.docs["input-chips"] = {
    tag: "cds-input-chip",
    base: { label: "Alimentação" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2728", sourceLabel: "Abrir o Input Chips no Figma",
    cover: { description: "Chip que mostra um valor escolhido e pode ser removido com um clique. Tem dois tamanhos: Medium (40) e Small (32).", examples: [
      row([ic("Alimentação", { icon: "food-line" }), ic("Mobilidade", { icon: "car-line" }), ic("Saúde", { "show-lead-icon": false })]),
      row([ic("Alimentação", { icon: "food-line", size: "small" }), ic("Mobilidade", { icon: "car-line", size: "small" }), ic("Saúde", { "show-lead-icon": false, size: "small" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Size Small em desenvolvimento · CDS-1599", text: "O Size Small está na branch do Figma e entra no Release 26. Hoje a lib publicada tem o Medium (40), que continua sendo o padrão." } },
        { p: "[Abrir a branch no Figma](" + BRANCH + ") · Jira CDS-1599 (Chips Small Size) · épico CDS-1586 (Release 26)." },
        { h2: "Sobre" },
        { p: "O Input Chip representa um valor inserido pela pessoa usuária (uma tag, uma palavra-chave, um e-mail) em campos de múltiplos valores. Ele sempre pode ser removido: o chip inteiro é o botão de remover, e o close-line à direita indica a ação." },
        { p: "Os Input Chips aparecem em grupo, dentro do Chips Group, perto do campo ou do filtro que os gerou." },
        { h3: "Nomes alternativos comuns" },
        { p: "chip de entrada, tag removível, token, pill removível, input chip." },
        { h3: "Princípios" },
        { cards: [
          ["Sempre removível", "Todo Input Chip pode sair com um clique. O alvo é o chip inteiro, não o ícone de fechar."],
          ["Valor da pessoa", "Mostra o que a pessoa escolheu ou digitou, com o mesmo texto do valor."],
          ["Dois tamanhos, uma anatomia", "Medium e Small têm as mesmas partes, os mesmos espaçamentos e o mesmo texto. A única diferença é a altura."]
        ] },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Mostrar os filtros aplicados, com a opção de remover cada um.", "Mostrar valores escolhidos num campo de múltipla escolha (ex.: destinatários)."] },
        { h3: "Não utilize para:" },
        { ul: ["Ligar e desligar filtros que continuam na tela — use o Filter Chip.", "Status ou categorias puramente informativas, sem remover — use Tag ou Badge.", "Ações — use um Main Button."] },
        { h2: "Tamanhos" },
        { table: { head: ["Size", "Altura", "Quando usar"], rows: [
          ["Medium (padrão)", "40", "A maior parte das telas: campos de múltiplos valores e filtros aplicados."],
          ["Small", "32", "Contextos de maior densidade, como tabelas, toolbars e painéis com muitos chips."]
        ], wrap: true } },
        { h2: "Casos de uso" },
        { h3: "Input Chip vs Tag" },
        { p: "A Tag informa (status, categoria) e não tem interação. O Input Chip é interativo: existe para ser removido." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-chip", side: "left" }, { n: 2, target: ".cds-chip cds-icon:first-child", side: "top" }, { n: 3, target: ".cds-chip > span", side: "bottom" }, { n: 4, target: ".cds-chip cds-icon:last-child", side: "right" }], legend: ["Container (pill, com borda)", "Lead Icon", "Label", "Close Icon (close-line)"] } },
        { h2: "Composição do componente" },
        { p: "Container em pílula com borda hairline, Lead Icon opcional (16, via `Show Lead Icon`), Label em `Label/Regular` e o close-line (16) à direita. Padding horizontal de 16 e gap de 4 entre as partes, nos dois tamanhos." },
        { h2: "Propriedades" },
        { props: [
          { name: "Size", type: "Variant", default: "Medium", values: ["Medium", "Small"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Icon", type: "Instance swap", default: "placeholder-line" }
        ] },
        { note: "Props e padrões lidos do set Input Chips na branch (8 variantes: State × Size). No código: `size` (`medium` | `small`, padrão `medium`), `label`, `icon`, `show-lead-icon` e `disabled`. `state=\"hovered|pressed\"` é exclusivo dos exemplos. Evento `cds-remove` (cancelável): sem `preventDefault()`, o chip sai do DOM." },
        { h2: "Medidas por tamanho" },
        { table: { head: ["Métrica", "Medium", "Small", "Token"], rows: [
          ["Altura", "40", "32", "`Common/Sizes/40` → `Common/Sizes/32`"],
          ["Padding horizontal", "16", "16", "`Common/Sizes/16`"],
          ["Padding vertical", "0", "0", "`Common/Sizes/0`"],
          ["Gap interno", "4", "4", "`Common/Sizes/4`"],
          ["Raio", "Pílula", "Pílula", "`Common/Border/Radius/pill`"],
          ["Borda", "1", "1", "`Common/Border/Width/hairline`"],
          ["Texto", "Label/Regular", "Label/Regular", "`Text Style/Label/Regular`"],
          ["Ícones (Lead e Close)", "16", "16", "—"]
        ], wrap: true } },
        { p: "No código, o Small é o Medium com a altura trocada. Não existe um segundo conjunto de padding, texto ou ícones." },
        { h2: "Tokens de altura" },
        { table: { head: ["Size", "Token", "Resolve em (Desktop, Tablet e Mobile)"], rows: [
          ["Medium", "`Specific/Selection Controls/Input Chips/Medium/height`", "`Common/Sizes/40`"],
          ["Small", "`Specific/Selection Controls/Input Chips/Small/height`", "`Common/Sizes/32`"]
        ], wrap: true } },
        { note: "Na branch, o token `Specific/Selection Controls/Input Chips/height` foi renomeado para `…/Medium/height`, e o `…/Small/height` é novo. Nenhum primitivo novo: o Small usa o `Common/Sizes/32`, que já existe. Enquanto a branch não é publicada, o playground usa `Common/Sizes/32` direto (CONFERIR C185)." },
        { h2: "Entrega para dev · CDS-1599" },
        { ul: [
          "Property `Size` (`Medium` padrão · `Small`) no Input Chips.",
          "O `Small` troca apenas a altura (40 → 32). Padding, gap, texto, ícones, raio e borda vêm do Medium.",
          "Altura pelo token do componente (`…/Input Chips/Medium/height` e `…/Input Chips/Small/height`), sem valor solto.",
          "Os quatro estados (Enabled, Hovered, Pressed e Disabled) existem nos dois tamanhos.",
          "Alvo de toque: o chip inteiro, com 32 no Small (mínimo de 24 da WCAG 2.5.8).",
          "Fora desta entrega: o Chips Group (a versão Single Rows tem 48 de altura, pensada para o chip de 40) e qualquer mudança de cor ou estado."
        ] }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Size" },
        { specimens: { items: [
          { label: "Medium (40)", attrs: { icon: "food-line" } }, { label: "Small (32)", attrs: { icon: "food-line", size: "small" } }
        ] } },
        { h2: "State · Medium" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "State · Small" },
        { specimens: { items: [
          { label: "Enabled", attrs: { size: "small" } }, { label: "Hovered", attrs: { size: "small", state: "hovered" } }, { label: "Pressed", attrs: { size: "small", state: "pressed" } }, { label: "Disabled", attrs: { size: "small", disabled: true } }
        ] } },
        { h2: "Show Lead Icon" },
        { specimens: { items: [
          { label: "Com ícone", attrs: { icon: "food-line" } }, { label: "Sem ícone", attrs: { "show-lead-icon": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O chip inteiro é um `<button>` com o nome \"Remover\" + Label (ex.: \"Remover Alimentação\").",
          "O alvo de clique é o chip inteiro, não o ícone de 16: 40 no Medium e 32 no Small, acima do mínimo de 24 (WCAG 2.5.8).",
          "`Tab` leva ao chip. `Enter` ou `Espaço` removem.",
          "Os ícones são decorativos.",
          "Sozinho, o chip não move o foco (como o `Chips.Input` do castanha-react): o `cds-remove` informa `keyboard` para quem usa decidir.",
          "No Multi Select Input vale a regra do SelectInput do castanha-react: removido pelo teclado, o foco vai para o próximo chip ou, sem chip ali, para o campo. Removido pelo mouse, vai para o campo. `Backspace` e `Delete` no chip também removem.",
          "O foco segue o padrão global do sistema, nos dois tamanhos."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e ícones (Text/medium e Icons/medium sobre Surface/01): 7,42:1 — AA e AAA.", "Borda (Border/semi-soft) sobre Surface/default: 1,25:1 e no Hovered (Border/medium): 2,78:1 — abaixo de 3:1. O Label e o close-line identificam o chip.", "O Small usa os mesmos tokens de cor do Medium: os contrastes são os mesmos."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o mesmo texto do valor escolhido, curto.", "Quando houver muitos chips, ofereça \"Limpar tudo\".", "Não peça confirmação para remover um chip: a ação se desfaz escolhendo de novo.", "Use o Medium por padrão. Escolha o Small quando a tela pede mais densidade.", "Use um único tamanho dentro do mesmo grupo."] },
        { dodont: [
          { kind: "do", attrs: row([ic("Alimentação", { size: "small", "show-lead-icon": false }), ic("Mobilidade", { size: "small", "show-lead-icon": false }), ic("Saúde", { size: "small", "show-lead-icon": false })]), text: "Use o mesmo tamanho em todos os chips do grupo." },
          { kind: "dont", attrs: row([ic("Alimentação", { "show-lead-icon": false }), ic("Mobilidade", { size: "small", "show-lead-icon": false }), ic("Saúde", { "show-lead-icon": false })]), text: "Não misture Medium e Small no mesmo grupo." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione. Clicar remove o chip. Recarregue a tab para ver de novo." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "No Figma, as transições usam systemic/accelerate · short/03, que não é exatamente nenhum Motion Style: Hover In/01 é systemic/default · short/03 e Pressed/01 é systemic/accelerate · short/04 (CONFERIR C149). O Small usa as mesmas transições." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação para a saída do chip ao ser removido (CONFERIR C149)." } },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
