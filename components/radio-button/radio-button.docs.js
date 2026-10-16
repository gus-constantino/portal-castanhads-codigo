/* Documentação — Radio Button
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Radio Button, 84deb8) reaproveitado; props e padrões do set da lib estável (Radio Button 4429:10437);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style (C134). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var n = 0;
  function rb(label, status, name, more){ return Object.assign({ _tag: "cds-radio-button", label: label, status: status || "unselected", name: name }, more || {}); }
  // cada grupo tem o próprio name: a exclusividade do radio fica restrita ao exemplo
  function group(labels, sel, row){ var name = "doc-rb-" + (++n); return { _tag: "div", class: "pg-doc-sc-group" + (row ? " pg-doc-sc-group--row" : ""), role: "radiogroup", _children: labels.map(function(l, i){ return rb(l, i === sel ? "selected" : "unselected", name); }) }; }

  CDS.docs["radio-button"] = {
    tag: "cds-radio-button",
    base: { label: "Label" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/84deb8-radio-button", sourceLabel: "Abrir o Radio Button no zeroheight",
    cover: { description: "Radio Button é um componente interativo usado para permitir ao usuário selecionar uma única opção de um conjunto. Essencial em formulários para escolhas únicas.", examples: [
      group(["Pix", "Boleto", "Cartão de crédito"], 0)
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Radio Button é um componente interativo usado para permitir ao usuário selecionar uma única opção de um conjunto. Essencial em formulários para escolhas únicas." },
        { h3: "Princípios" },
        { cards: [
          ["Conciso", "Deve trazer poucas opções curtas, com poucas palavras, que não pedem explicação adicional."],
          ["Unitário", "Deve trazer decisões únicas, em um grupo fechado"],
          ["Exclusividade", "Permite selecionar uma única opção dentro de um mesmo grupo, evitando ambiguidades."]
        ] },
        { h2: "Quando usar" },
        { p: "O Radio Button é muito útil em formulários, pesquisas e fluxos de cadastro, onde a pessoa usuária precisa escolher uma opção em uma lista curta, ou responder uma pergunta de escopo fechado." },
        { h3: "Utilize para:" },
        { ul: [
          "Exibir uma lista de duas a cinco opções para a análise da pessoa usuária.",
          "Possibilitar a escolha de uma opção em uma lista pequena.",
          "Exibir opções que precisam de confirmação posterior, como em um formulário.",
          "Quando todas as opções podem ser apresentadas de forma clara e o usuário precisa vê-las para tomar uma decisão informada."
        ] },
        { h3: "Não utilize para:" },
        { ul: [
          "Possibilitar a seleção de várias opções ao mesmo tempo - nesse caso, considere usar checkboxes.",
          "Ação de Comando: Se o clique executa uma função ou comando, e não uma seleção (use um Botão).",
          "Navegação: Se o item leva a outra página ou seção (use um Link ou Botão).",
          "Alternância de Estado Imediata: Se a ação é imediata e alterna um estado sem necessidade de confirmação (use um Toggle Switch).",
          "Sinalizar consentimento ou uma confirmação por parte da pessoa usuária, com uma opção. Para esse caso, o checkbox é mais adequado.",
          "Exibir uma lista com mais de cinco itens. Considere o uso de um Select Input nesse caso."
        ] },
        { h2: "Casos de uso" },
        { h3: "Radio button vs Checkbox" },
        { p: "O Radio Button permite a escolha de uma única opção, dentre um grupo de opções mutuamente excludentes. Ele é comum durante o preenchimento de um formulário, por exemplo. Já Checkbox permite que a pessoa usuária selecione ou aceite uma, ou mais opções ao mesmo tempo, geralmente aplicadas depois de uma ação de confirmação, como enviar o formulário." },
        { compare: [
          { title: "Radio Button", attrs: group(["Vale-refeição", "Vale-alimentação"], 0) },
          { title: "Checkbox", attrs: { _tag: "div", class: "pg-doc-sc-group", _children: [{ _tag: "cds-checkbox", label: "Vale-refeição", status: "selected" }, { _tag: "cds-checkbox", label: "Vale-alimentação", status: "selected" }] } }
        ] },
        { h3: "Radio button vs Switch Toggle" },
        { p: "O Radio Button é usado para seleções que serão processadas posteriormente, por exemplo, em um fluxo de cadastro, com duas ou mais opções, que pedem confirmação posterior. Já o Switch funciona como um interruptor, alterando imediatamente o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro." },
        { compare: [
          { title: "Radio Button", attrs: group(["Alto", "Médio", "Silencioso"], 1) },
          { title: "Switch", attrs: { _tag: "cds-switch", label: "Som", status: "selected" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Label", status: "selected" }, markers: [{ n: 1, target: ".cds-sc__selector", side: "left" }, { n: 2, target: ".cds-sc__label", side: "bottom" }], legend: ["Radio (área de toque 48×48 com o Radio 24×24)", "Label (Text Label)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Status", type: "Variant", default: "Unselected", values: ["Selected", "Unselected"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Text Label", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Radio Button da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, `name` agrupa os Radio Buttons (um único selecionado por grupo). State vem da interação e do atributo `disabled`. O `state=\"hovered|pressed\"` existe exclusivamente para mostrar o estado em exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Status" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Unselected", attrs: { status: "unselected" } }, { label: "Selected", attrs: { status: "selected" } }
        ] } },
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } },
          { label: "Selected · Hovered", attrs: { status: "selected", state: "hovered" } }, { label: "Selected · Pressed", attrs: { status: "selected", state: "pressed" } }, { label: "Selected · Disabled", attrs: { status: "selected", disabled: true } }
        ] } },
        { h2: "Sem Text Label" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Show Text Label = false", attrs: { status: "selected", "show-text-label": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado" },
        { table: { head: ["Tecla", "Ação"], rows: [["`Tab`", "Entra no grupo (na opção selecionada) e sai dele"], ["`↑` `↓` `←` `→`", "Move a seleção entre as opções do grupo"], ["`Espaço`", "Seleciona a opção em foco"]] } },
        { h2: "Leitor de tela" },
        { ul: [
          "O Radio Button usa o `<input type=\"radio\">` nativo: o leitor de tela anuncia \"botão de opção\", o Label, o estado e a posição no grupo (ex.: 1 de 3).",
          "O grupo vem do `name` comum. Envolva as opções em `<fieldset>` com `<legend>` para anunciar a pergunta do grupo.",
          "Label e selector são clicáveis: o alvo de toque é a linha inteira, com o Selector de 48×48.",
          "Sem Text Label visível (`show-text-label=\"false\"`), o Label continua como nome acessível (`aria-label`).",
          "O Disabled usa o `disabled` nativo: sai da navegação do grupo e é anunciado como indisponível."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) sobre Surface/default: 16,96:1 — AA e AAA.", "Selected (Surface/accent) sobre Surface/default: 4,54:1 — passa o mínimo de 3:1 para componentes (1.4.11).", "Borda do Unselected (Border/medium) sobre Surface/default: 2,78:1 — abaixo do mínimo de 3:1 (1.4.11). Em análise (CONFERIR C134)."] },
        { note: "Contrastes medidos no tema light do playground. O Disabled (Opacity/light) é isento (1.4.3). O zeroheight ainda não tem seção de Acessibilidade para o Radio Button." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: group(["Mensal", "Anual"], 0), title: "Conteúdo", text: "A label deve ser curta e descritiva, informando de imediato a opção correspondente, com poucas palavras." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: group(["Pix", "Boleto", "Cartão de crédito"], 0), text: "Use quando for necessário uma fazer uma seleção única." },
          { kind: "dont", attrs: group(["Vale-refeição", "Vale-alimentação", "Mobilidade"], 0), text: "Não use para seleções múltiplas." },
          { kind: "do", attrs: group(["Mensal", "Anual"], 1), text: "Use para um conjunto de menos de cinco opções." },
          { kind: "dont", attrs: group(["Selecionar todos", "Vale-refeição", "Vale-alimentação"], 0), text: "Não use em seleções em bloco." },
          { kind: "do", attrs: group(["Pessoa física", "Pessoa jurídica"], 0), text: "Use para formulários ou fluxos que terão confirmação posterior." },
          { kind: "dont", attrs: group(["Modo claro", "Modo escuro"], 1), text: "Não use para ajustes refletidos imediatamente na tela." },
          { kind: "dont", attrs: group(["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"], 2), text: "Não use para listas longas, com mais de cinco opções." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e clique para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Ao sair do hover"], ["Motion Style", "`Hover In/01`"]] }
        ] },
        { note: "No zeroheight, a volta para o Enabled usa systemic/default · short/03 — os mesmos valores do `Hover In/01`." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight indica o Pressed com expressive/default · medium/01, que não corresponde a nenhum Motion Style da `.Motion Styles`, e não especifica a troca de Status (CONFERIR C134)." } },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
