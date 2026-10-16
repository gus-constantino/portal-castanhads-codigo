/* Documentação — Checkbox
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Checkbox, 320247) reaproveitado; props e padrões do set da lib estável (Checkbox 4123:2560);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style (C134). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function cb(label, status, more){ return Object.assign({ _tag: "cds-checkbox", label: label, status: status || "unselected" }, more || {}); }
  function group(items, row){ return { _tag: "div", class: "pg-doc-sc-group" + (row ? " pg-doc-sc-group--row" : ""), _children: items }; }
  function nested(items){ return { _tag: "div", class: "pg-doc-sc-group__nested", _children: items }; }

  CDS.docs["checkbox"] = {
    tag: "cds-checkbox",
    base: { label: "Label" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/320247-checkbox", sourceLabel: "Abrir o Checkbox no zeroheight",
    cover: { description: "O checkbox é Componente interativo usado para selecionar ou desmarcar opções. Pode ser preenchido com um checkmark (✔) caso seja selecionado, ou por um traço (—) quando indeterminado. Utilizado em formulários e filtros, permitindo múltiplas seleções.", examples: [
      group([cb("Selecionar todos", "indeterminate"), nested([cb("Vale-refeição", "selected"), cb("Vale-alimentação", "selected"), cb("Mobilidade")])])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O checkbox é Componente interativo usado para selecionar ou desmarcar opções. Pode ser preenchido com um checkmark (✔) caso seja selecionado, ou por um traço (—) quando indeterminado. Utilizado em formulários e filtros, permitindo múltiplas seleções." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "O checkbox deve comunicar de forma imediata se uma opção está selecionada ou não. O estado (marcado, desmarcado ou indeterminado) precisa ser visualmente distinto."],
          ["Consistência", "Deve ser usado sempre para representar escolhas independentes entre si, garantindo uma experiência uniforme em diferentes contextos da interface."],
          ["Eficiência", "Permite ao usuário realizar seleções ágeis e diretas, reduzindo esforço cognitivo em listas de múltiplas opções."]
        ] },
        { h2: "Quando usar" },
        { p: "O checkbox é um componente de confirmação explícita, utilizado em situações onde o usuário precisa realizar uma ação de consentimento, concordância ou ativação de múltiplas escolhas, indicando que o usuário leu a label e concorda com seu conteúdo, garantindo que a ação seja consciente e voluntária." },
        { h3: "Utilize para:" },
        { ul: [
          "Seleção Múltipla: Para permitir que o usuário escolha zero, uma ou várias opções de um conjunto (ex: selecionar interesses).",
          "Configurações Independentes: Para ativar ou desativar configurações que não afetam outras opções (ex: \"Receber e-mails de marketing\").",
          "Concordância: Para que o usuário concorde ou discorde de termos (ex: \"Li e concordo com os termos de uso\")."
        ] },
        { h3: "Não utilize para:" },
        { ul: [
          "Escolha Única: Se o usuário deve escolher uma única opção de um conjunto (use Radio Buttons).",
          "Ação Imediata/Alternância de Estado: Se a ação é imediata e altera um estado diretamente (use um Toggle Switch).",
          "Ação de Comando: Se o clique executa uma função ou comando, não uma seleção (use um Botão).",
          "Navegação: Se o item leva a outra página ou seção (use um Link ou Botão)."
        ] },
        { h2: "Casos de uso" },
        { h3: "Checkbox vs Radio button" },
        { p: "O Radio button é usado quando o usuário precisa escolher somente uma opção em uma listra de duas ou mais. Nele, a escolha do usuário é diretamente relacionada ao conjunto de itens presentes na lista, pois a escolha de uma das opções significa a “recusa” de todas as outras." },
        { p: "No caso do Checkbox, o usuário pode possui liberdade para aceitar ou não os itens de maneira independente, tendo uma ampla possibilidade de variações de escolha na mesma lista." },
        { compare: [
          { title: "Radio Button", attrs: group([{ _tag: "cds-radio-button", label: "Vale-refeição", status: "selected", name: "doc-cb-vs" }, { _tag: "cds-radio-button", label: "Vale-alimentação", name: "doc-cb-vs" }]) },
          { title: "Checkbox", attrs: group([cb("Vale-refeição", "selected"), cb("Vale-alimentação", "selected")]) }
        ] },
        { h3: "Checkbox vs Switch" },
        { p: "O Checkbox é usado para permitir que o usuário selecione ou aceite uma ou mais opções, geralmente aplicadas depois de uma ação de confirmação, como enviar o formulário. Já o Switch funciona como um interruptor, alterando imediatamente o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro." },
        { compare: [
          { title: "Checkbox", attrs: cb("Li e concordo com os termos de uso", "selected") },
          { title: "Switch", attrs: { _tag: "cds-switch", label: "Notificações", status: "selected" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Label", status: "selected" }, markers: [{ n: 1, target: ".cds-sc__selector", side: "left" }, { n: 2, target: ".cds-sc__label", side: "bottom" }], legend: ["Checkbox selector (área de toque 48×48 com o Checkbox 24×24)", "Label (Text Label)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Status", type: "Variant", default: "Unselected", values: ["Selected", "Indeterminate", "Unselected"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Text Label", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Checkbox da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, State vem da interação (Hovered/Pressed) e do atributo `disabled`. `state=\"hovered|pressed\"` existe exclusivamente para mostrar o estado em exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Status" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Unselected", attrs: { status: "unselected" } }, { label: "Selected", attrs: { status: "selected" } }, { label: "Indeterminate", attrs: { status: "indeterminate" } }
        ] } },
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } },
          { label: "Selected · Hovered", attrs: { status: "selected", state: "hovered" } }, { label: "Selected · Pressed", attrs: { status: "selected", state: "pressed" } }, { label: "Selected · Disabled", attrs: { status: "selected", disabled: true } }, { label: "Indeterminate · Disabled", attrs: { status: "indeterminate", disabled: true } }
        ] } },
        { h2: "Sem Text Label" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Show Text Label = false", attrs: { status: "selected", "show-text-label": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado" },
        { table: { head: ["Tecla", "Ação"], rows: [["`Tab`", "Move o foco para o próximo Checkbox"], ["`Espaço`", "Marca ou desmarca"]] } },
        { h2: "Leitor de tela" },
        { ul: [
          "O Checkbox usa o `<input type=\"checkbox\">` nativo: o leitor de tela anuncia \"caixa de seleção\", o Label e o estado (marcado, desmarcado ou misto, no Indeterminate).",
          "Label e checkbox selector são clicáveis: o alvo de toque é a linha inteira, com o Selector de 48×48.",
          "Sem Text Label visível (`show-text-label=\"false\"`), o Label continua como nome acessível (`aria-label`).",
          "Em grupo, envolva os Checkbox em `<fieldset>` com `<legend>` para o leitor de tela anunciar a pergunta do grupo.",
          "O Disabled usa o `disabled` nativo: sai da ordem de foco e é anunciado como indisponível."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) sobre Surface/default: 16,96:1 — AA e AAA.", "Selected e Indeterminate (Surface/accent) sobre Surface/default: 4,54:1 — passa o mínimo de 3:1 para componentes (1.4.11).", "Borda do Unselected (Border/medium) sobre Surface/default: 2,78:1 — abaixo do mínimo de 3:1 (1.4.11). Em análise (CONFERIR C134)."] },
        { note: "Contrastes medidos no tema light do playground. O Disabled (Opacity/light) é isento (1.4.3). O zeroheight ainda não tem seção de Acessibilidade para o Checkbox." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: group([cb("Selecionar todos", "indeterminate"), nested([cb("Vale-refeição", "selected"), cb("Vale-alimentação"), cb("Mobilidade")])]), title: "Blocos de funcionalidades", text: "Os Checkbox podem se comportar como um relacionamento pai-filho quando colocadas em uma hierarquia aninhada. Marcar o pai seleciona seus filhos e desmarcá-lo desmarca seus filhos, se somente alguns filhos forem verificados, a verificação do pai será definida para um estado undetermined." },
          { attrs: cb("Receber e-mails de marketing", "selected"), title: "Conteúdo e clique", text: "A label do checkbox deve ser concisa e descritivo, informando claramente a opção que o usuário está marcando ou desmarcando. Tanto a label como o checkbox selector são clicáveis para alterar o status do componente." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: group([cb("Vale-refeição", "selected"), cb("Vale-alimentação", "selected"), cb("Mobilidade")]), text: "Use quando for necessário uma fazer uma seleção múltipla." },
          { kind: "dont", attrs: group([cb("Vale-refeição", "selected"), cb("Vale-alimentação"), cb("Mobilidade")], true), text: "Não use mais de um checkbox na horizontal." },
          { kind: "do", attrs: group([cb("Selecionar todos", "indeterminate"), nested([cb("Vale-refeição", "selected"), cb("Vale-alimentação")])]), text: "Use quando tiver elementos que podem ser selecionados como um bloco." },
          { kind: "dont", attrs: group([cb("Pix", "selected"), cb("Boleto"), cb("Cartão de crédito")]), text: "Não use quando somente um dos itens de uma lista pode ser selecionado." },
          { kind: "do", attrs: cb("Li e concordo com os termos de uso", "selected"), text: "Use para validar informações que podem ser importantes." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e clique para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/03`"]] },
          { title: "Unselected → Selected", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/02`"]] },
          { title: "Selected → Unselected", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { note: "Ao marcar, o check cresce a partir do centro e a caixa aumenta 10% e volta. Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
