/* Documentação — Switch
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Switch, 26953a) reaproveitado; props e padrões do set da lib estável (Switch 4895:809);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style (C134). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function sw(label, status, more){ return Object.assign({ _tag: "cds-switch", label: label, status: status || "unselected" }, more || {}); }
  function group(items, row){ return { _tag: "div", class: "pg-doc-sc-group" + (row ? " pg-doc-sc-group--row" : ""), _children: items }; }

  CDS.docs["switch"] = {
    tag: "cds-switch",
    base: { label: "Label" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/26953a-switch", sourceLabel: "Abrir o Switch no zeroheight",
    cover: { description: "O Switch é um componente que funciona como um interruptor digital, alterando imediatamente o estado de uma configuração entre opções binárias, como sim ou não, e ligado ou desligado, sem necessidade de confirmação.", examples: [
      group([sw("Notificações", "selected"), sw("Modo escuro")])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Switch é um componente que funciona como um interruptor digital, alterando imediatamente o estado de uma configuração entre opções binárias, como sim ou não, e ligado ou desligado, sem necessidade de confirmação." },
        { h3: "Nomes alternativos comuns" },
        { p: "Switch, toggle Lightswitch, Toggle button, Toggle." },
        { h3: "Princípios" },
        { cards: [
          ["Ação binária", "Representa um estado entre “ligado” ou “desligado” para uma função específica. Cada Switch deve controlar uma única configuração binária."],
          ["Mudança instantânea", "Use o Switch quando a ação for instantânea e não exigir um botão de \"Salvar\" ou \"Aplicar\"."],
          ["Contexto de controle", "Deve ser usado exclusivamente para configurações que afetam diretamente o sistema ou funcionalidade."]
        ] },
        { h2: "Quando usar" },
        { p: "O switch é utilizado para configurações cujo efeito é instantâneo e visível, sem a necessidade de confirmar a ação. É importante usá-lo somente para configurações que o usuário possa reverter pelo próprio componente." },
        { h3: "Utilize para:" },
        { ul: ["Ajustes instantâneos como ativar notificações ou mudar para o modo escuro.", "Ações contínuas e binárias, como ligar ou desligar.", "Alterar entre estados."] },
        { h3: "Não utilize para:" },
        { ul: ["Executar uma única ação.", "Em listas com uma única opção de escolha."] },
        { h2: "Casos de uso" },
        { h3: "Switch vs Radio button" },
        { p: "O Switch é ideal para um controle imediato binário, no caso de um controle de som, o switch trocaria o status entre ligado e desligado, pois o usuário percebe o efeito no mesmo instante. Nesse caso, um cenário para utilizar o Radio button seria escolher entre diferentes modos de som, como ”alto”, \"médio” e \"silencioso\", onde uma única opção pode estar ativa por vez." },
        { compare: [
          { title: "Switch", attrs: sw("Som", "selected") },
          { title: "Radio Button", attrs: { _tag: "div", class: "pg-doc-sc-group", _children: [["Alto", "unselected"], ["Médio", "selected"], ["Silencioso", "unselected"]].map(function(o){ return { _tag: "cds-radio-button", label: o[0], status: o[1], name: "doc-sw-vs" }; }) } }
        ] },
        { h3: "Switch vs Checkbox" },
        { p: "O Switch funciona como um interruptor, alterando imediatamente o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro. Já o Checkbox é usado para permitir que o usuário selecione ou aceite uma ou mais opções, geralmente aplicadas depois de uma ação de confirmação, como enviar o formulário." },
        { compare: [
          { title: "Switch", attrs: sw("Notificações", "selected") },
          { title: "Checkbox", attrs: { _tag: "cds-checkbox", label: "Li e concordo com os termos de uso", status: "selected" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Label", status: "selected" }, markers: [{ n: 1, target: ".cds-sc__box", side: "top" }, { n: 2, target: ".cds-sw__toggle", side: "bottom" }, { n: 3, target: ".cds-sc__label", side: "right" }], legend: ["Track", "Toggle", "Text Label"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Status", type: "Variant", default: "Unselected", values: ["Selected", "Unselected"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Text Label", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Switch da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, State vem da interação e do atributo `disabled`. O `state=\"hovered|pressed\"` existe para mostrar o estado em exemplos." }
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
        { table: { head: ["Tecla", "Ação"], rows: [["`Tab`", "Move o foco para o Switch"], ["`Espaço`", "Liga ou desliga"]] } },
        { h2: "Leitor de tela" },
        { ul: [
          "O Switch é um `<input type=\"checkbox\" role=\"switch\">`: o leitor de tela anuncia \"interruptor\", o Label e o estado (ligado ou desligado).",
          "A mudança é imediata: não peça confirmação nem use o Switch dentro de formulários com botão de enviar.",
          "Sem Text Label visível (`show-text-label=\"false\"`), o Label continua como nome acessível (`aria-label`) — mas evite switches sem texto (Diretrizes).",
          "O Disabled usa o `disabled` nativo: sai da ordem de foco e é anunciado como indisponível."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label (Text/intense) sobre Surface/default: 16,96:1 — AA e AAA.", "Track do Unselected (Surface/inversed) sobre Surface/default: 16,96:1. Track do Selected (Surface/accent): 4,54:1 — ambos passam o mínimo de 3:1 para componentes (1.4.11).", "Toggle sobre o Track: 16,96:1 no Unselected e 4,54:1 no Selected."] },
        { note: "Contrastes medidos no tema light do playground. O Disabled (Opacity/light) é isento (1.4.3). O zeroheight ainda não tem seção de Acessibilidade para o Switch." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: sw("Notificações por e-mail", "selected"), title: "Contexto visual", text: "Sempre posicione o switch proxímo à configuração que controla, garantindo contexto visual imediato, evitando switches sem texto ou com significado ambíguo, o propósito do componente sempre deve estar explícito para o usuário." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: group([sw("Notificações", "selected"), sw("Modo escuro")]), text: "Quando tiver configurações independentes que terão efeito automático." },
          { kind: "dont", attrs: group([sw("Selecionar todos"), sw("Vale-refeição", "selected"), sw("Vale-alimentação")]), text: "Quando tiver elementos que podem ser selecionados como um bloco." },
          { kind: "do", attrs: sw("Compras online", "selected"), text: "Para habilitar ou desabilitar ações ou configurações." },
          { kind: "dont", attrs: sw("Enviar comprovante"), text: "Como gatilho para ações ou quando quiser executar uma ação." },
          { kind: "do", attrs: sw("Cartão bloqueado", "selected"), text: "Alterar entre diferentes estados de uma opção." },
          { kind: "dont", attrs: sw("Mensal, trimestral ou anual"), text: "Alterar entre opções não binárias." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e clique para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight indica Is Active True e False (o Toggle deslizando) com expressive/decelerate · medium/02, que não corresponde a nenhum Motion Style da `.Motion Styles` (CONFERIR C134)." } },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
