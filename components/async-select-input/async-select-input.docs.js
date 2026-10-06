/* Documentação — Select Inputs (Async · Async creatable · Radio · Checkbox · Multi)
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Select input, 239f81 — uma página para a família) reaproveitado; props e padrões dos 5 sets
   da lib estável (sem description); acessibilidade do playground (C141). Esta doc mora no Async Select Input; os outros 4 membros leem as mesmas
   tabs (getter) com capa e exemplos próprios — os blocos sem _tag mostram o membro que está aberto. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var BEN = ["Vale-refeição", "Vale-alimentação", "Mobilidade", "Saúde", "Educação"];
  function opts(list){ return (list || BEN).map(function(l, i){ return { _tag: "option", value: "o" + i, _text: l }; }); }
  function sel(tag, more){ return Object.assign({ _tag: tag, label: "Benefício", placeholder: "Selecione", supporting: "Escolha a categoria do saldo", "show-required": false, "show-lead-icon": false, "show-character-counter": false, _children: opts() }, more || {}); }
  var MEMBERS = [
    ["cds-async-select-input", "Async", "Escolha única com busca: digitar filtra as opções (ou busca no servidor)."],
    ["cds-async-creatable-select-input", "Async creatable", "Como o Async e, quando o texto digitado não existe, oferece \"Adicionar “…”\" para criar a opção."],
    ["cds-radio-select-input", "Radio", "Escolha única sem busca: o campo abre a lista, com Radio Button."],
    ["cds-checkbox-select-input", "Checkbox", "Vários valores sem busca: a lista fica aberta enquanto marca e o campo mostra \"N Selecionados\"."],
    ["cds-multi-select-input", "Multi", "Vários valores com busca: cada escolha vira um Input Chip dentro do campo."]
  ];

  CDS.docs["async-select-input"] = {
    tag: "cds-async-select-input",
    base: { label: "Benefício", placeholder: "Selecione", supporting: "Escolha a categoria do saldo", "show-required": false, "show-lead-icon": false, "show-character-counter": false, _children: opts() },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/239f81-select-input", sourceLabel: "Abrir o Select input no zeroheight",
    cover: { description: "O Select input permite que a pessoa usuária escolha uma ou mais opções a partir de uma lista pré-definida.", examples: [ sel("cds-async-select-input") ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Select input permite que a pessoa usuária escolha uma ou mais opções a partir de uma lista pré-definida." },
        { h3: "Nomes alternativos comuns" },
        { p: "Dropdown, Select, Lista suspensa." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "O componente deve comunicar de forma imediata quais opções estão disponíveis e qual valor está selecionado, evitando ambiguidades ou interpretações incorretas."],
          ["Previsibilidade", "O comportamento do Select input deve seguir padrões conhecidos, garantindo que a pessoa usuária saiba o que esperar ao interagir com o componente."],
          ["Eficiência", "A seleção deve exigir o mínimo de esforço possível, permitindo escolhas ágeis e reduzindo a necessidade de correções ou retrabalho."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Select input quando houver um conjunto conhecido e limitado de opções e quando for importante garantir padronização da resposta sem exigir digitação livre, seja para seleção única ou múltipla." },
        { h3: "Utilize para:" },
        { ul: ["Selecionar uma ou múltiplas opções entre valores pré-definidos", "Garantir consistência e validação de dados", "Reduzir esforço cognitivo em escolhas comuns"] },
        { h3: "Não utilize para:" },
        { ul: ["Listas muito longas sem agrupamento ou busca", "Entradas abertas ou valores personalizados", "Comparação direta entre muitas opções"] },
        { h2: "Tipos de Select Input" },
        { table: { wrap: true, head: ["Componente", "Como escolhe"], rows: MEMBERS.map(function(m){ return [m[1] + " Select Input", m[2]]; }) } },
        { note: "O zeroheight documenta a família numa única página (Select input). Na lib, cada tipo é um set: Async (11030:7644), Async creatable (11018:5694), Radio (11143:3056), Checkbox (11143:4833) e Multi (13795:4984)." },
        { h2: "Casos de uso" },
        { h3: "Select input vs Selection list / Selection list item" },
        { p: "O Select input é indicado quando é necessário economizar espaço e apresentar as opções no momento da interação. Ao ser ativado, ele utiliza a Selection list internamente para exibir as opções disponíveis. A Selection list e Selection list item, por sua vez, são mais adequadas quando as opções precisam estar sempre visíveis, facilitando leitura, comparação e tomada de decisão direta, sem depender de um campo de entrada." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-tf__label", side: "top", align: "start" }, { n: 2, target: ".cds-tf__control", side: "left" }, { n: 3, target: ".cds-tf__msg", side: "bottom", align: "start" }, { n: 4, target: ".cds-tf__box", side: "top" }, { n: 5, target: ".cds-tf__action", side: "right" }], legend: ["Title label", "Placeholder", "Support text", "Input container", "Dropdown icon button"] } },
        { p: "Ativo (aberto), o campo mostra o Popover com a Selection list das opções." },
        { h2: "Composição do componente" },
        { p: "O Select input é composto por um campo colapsado (trigger) e pela exibição da Selection list para apresentar as opções. Quando o Select estiver no modo ativo (aberto), tanto o campo quanto os Selection list items devem refletir esse estado por meio de ajustes visuais e comportamentais consistentes — como foco, destaque da opção selecionada e feedback de interação — garantindo coerência entre os dois componentes." },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Warning"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled", "Hovered", "Pressed"] },
          { name: "Is Filled", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Show Label", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Required", type: "Boolean", default: "true" },
          { name: "Required Text", type: "Text", default: "(Obrigatório)" },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Lead Icon", type: "Instance swap", default: "placeholder" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Show Supporting Content", type: "Boolean", default: "true" },
          { name: "Supporting Message", type: "Text", default: "Supporting Message" },
          { name: "Error Message", type: "Text", default: "Error Message" },
          { name: "Show Caret", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões iguais nos 5 sets da lib estável (o Multi tem também o slot Content, com os Input Chips). O zeroheight lista Style (Neutral · Negative), \"Is filled?\" e Placeholder. Na lib são Appearance (Neutral · Warning) e Is Filled, e o placeholder não é prop (CONFERIR C141). No código: opções como filhos `<option value>` ou `.options`, `value`, `open`, `empty-text`, `.loadOptions(query)` (Async) e os atributos do Text Input. Eventos `cds-change`, `cds-toggle` e `cds-create` (creatable)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Tipos" },
        { specimens: { items: MEMBERS.map(function(m, i){ return { label: m[1] + " · preenchido", attrs: sel(m[0], { value: ["o0", "o1", "o2", "o0,o2", "o0,o1"][i] }) }; }) } },
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Preenchido e Warning" },
        { specimens: { items: [
          { label: "Is Filled", attrs: { value: "o0" } },
          { label: "Warning", attrs: { appearance: "warning", error: "Escolha um benefício para continuar" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Segue o padrão combobox do WAI-ARIA: o foco fica no campo (`role=\"combobox\"`), as opções ficam numa `listbox` e a opção atual vai em `aria-activedescendant`.",
          "`↓`/`↑` abrem e percorrem as opções, `Enter` escolhe, `Esc` fecha e `Tab` sai do campo.",
          "O Label é o nome do campo e a mensagem de apoio (ou de erro) é a descrição.",
          "No Warning, o erro aparece em texto além da cor.",
          "No Multi, cada Input Chip tem um botão de remover com nome. `Backspace` com o campo vazio remove o último."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e valor (Text/intense) 16,96:1 · mensagem de apoio (Text/medium) 8,24:1 · mensagem de erro (Warning) 6,41:1 sobre Surface/default — AA.", "Placeholder: 2,78:1 — abaixo de 4,5:1 para texto (1.4.3).", "Contorno do campo (Enabled): 1,25:1 — abaixo de 3:1 para identificar o campo (1.4.11). No Warning, 6,41:1. Vale para toda a família Text Fields (CONFERIR C141)."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Select input." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: {}, title: "Label e suporte", text: "Use labels claros e objetivos e complemente com support text quando necessário para explicar regras, contexto ou consequências da escolha." },
          { attrs: { label: "Benefício", placeholder: "Selecione um benefício" }, title: "Placeholder", text: "Utilize o placeholder como instrução inicial, não como substituto do label." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: { label: "Mês", _children: opts(["Janeiro", "Fevereiro", "Março", "Abril"]) }, text: "Mantenha a ordem lógica ou semântica da lista." },
          { kind: "dont", attrs: sel("cds-radio-select-input", { label: "Município", placeholder: "Selecione entre 5.570 municípios" }), text: "Não use Select para listas excessivamente longas sem busca." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, abra a lista e escolha uma opção." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Select input no zeroheight está com o texto modelo e a tabela vazia. Abrir e fechar o Popover não têm Motion Style definido. No código, o hover usa short/03 + systemic/accelerate (Multi: medium/02 · Checkbox: sem transição, C42) (CONFERIR C141)." } }
      ] }
    ]
  };
})();
