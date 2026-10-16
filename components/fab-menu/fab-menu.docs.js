/* Documentação — FAB Menu (CDS-1694)
   Fonte: set FAB Menu 27075:22460 na branch F1s1Tb3cDHYli4aN76QzCo (description, annotations de Handoff, Accessibility e Motion)
   e o handoff dev de 16/10. Ainda não há página no zeroheight nem frame [Documentação] no arquivo de documentação.
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  var ACTIONS = "Nova solicitação:file-line, Pagar com Pix:pix-line, Pagar boleto:barcode-line, Cartões:cards-line, Extrato:receipt-line, Ajuda:support-line";
  function menu(attrs){ return Object.assign({ _tag: "cds-fab-menu", actions: ACTIONS }, attrs); }
  CDS.docs["fab-menu"] = {
    tag: "cds-fab-menu",
    base: { actions: ACTIONS },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/F1s1Tb3cDHYli4aN76QzCo/-CastanhaDS--Components?node-id=27075-22460",
    cover: { description: "Botão flutuante que abre de 2 a 6 ações empilhadas acima dele.", examples: [ menu({ active: true }) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Em desenvolvimento · CDS-1694", text: "O FAB Menu está na branch do Figma e entra no Release 27. Ainda não existe no castanha-react nem no Flutter." } },
        { h2: "Sobre" },
        { p: "O FAB Menu é um botão flutuante que abre de 2 a 6 ações empilhadas acima dele. Fica sobre o conteúdo, no canto inferior da tela, e mantém as ações principais sempre ao alcance." },
        { p: "Só o FAB Menu é distribuído. O botão flutuante é o building block .FAB Button, e cada ação é um Main Button Neutral." },
        { h3: "Nomes alternativos comuns" },
        { p: "FAB, Floating Action Button, speed dial, botão flutuante, menu de ações." },
        { h3: "Princípios" },
        { cards: [
          ["Sempre ao alcance", "O FAB fica fixo no canto inferior e não sai do lugar quando o menu abre ou fecha."],
          ["Sem rolagem", "As ações ficam empilhadas acima do FAB, de 2 a 6. Nada de rolagem dentro de uma tela que já rola."],
          ["Rótulo visível", "Cada ação mostra ícone e texto o tempo todo. No toque, tooltip não aparece."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o FAB Menu quando a tela tem de 2 a 6 ações principais relacionadas, que precisam ficar ao alcance enquanto a pessoa rola o conteúdo." },
        { h3: "Utilize para:" },
        { ul: ["Atalhos para criar ou iniciar algo a partir de uma lista", "Ações principais de uma tela de app que rola", "Agrupar ações relacionadas num ponto fixo"] },
        { h3: "Não utilize para:" },
        { ul: ["Mais de 6 ações — o menu não rola, use outro componente", "Ação secundária ou destrutiva", "Lista de opções de um contexto — use o Drop Button", "Uma ação só — use o Main Button"] },
        { h2: "FAB Menu vs. Drop Button" },
        { table: { head: ["", "FAB Menu", "Drop Button"], rows: [
          ["Posição", "Flutua no canto inferior, sobre o conteúdo", "No fluxo da página, junto do conteúdo"],
          ["Conteúdo", "De 2 a 6 ações empilhadas, sem rolagem", "Popover com a lista de opções"],
          ["Uso", "Ações principais da tela, sempre ao alcance", "Ações ligadas a um contexto específico"]
        ] } }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: menu({ active: true }),
          markers: [
            { n: 1, target: ".cds-fab-menu__actions", side: "left" },
            { n: 2, target: ".cds-fab-menu__actions cds-main-button:first-child .cds-btn", side: "top" },
            { n: 3, target: ".cds-fab", side: "right" }
          ],
          legend: ["Actions: de 2 a 6, empilhadas e alinhadas à direita", "Ação: Main Button Default Neutral Medium com ícone e rótulo", ".FAB Button: gatilho, abre e fecha o menu"]
        } },
        { h2: "Composição do componente" },
        { p: "O FAB Menu empilha as ações acima do .FAB Button, alinhadas pela direita, com `Sizes/12` entre as ações e `Sizes/16` até o FAB. O menu cresce para cima a partir do FAB. Cada ação é um Main Button Default Neutral Medium com `Elevation/level 1`. O .FAB Button tem 56×56, raio `Border/Radius/large`, ícone de 24 e elevação por estado. O Backdrop não faz parte do componente." },
        { h2: "Propriedades" },
        { props: [
          { name: "Is Active", type: "Variant", default: "False" },
          { name: "Show Action 3", type: "Boolean", default: "true" },
          { name: "Show Action 4", type: "Boolean", default: "false" },
          { name: "Show Action 5", type: "Boolean", default: "false" },
          { name: "Show Action 6", type: "Boolean", default: "false" }
        ] },
        { note: "As ações 1 e 2 são fixas. As instâncias `.FAB Button` e `Action 1` a `Action 6` ficam expostas para trocar `Icon`, `Text Label` e `Lead Icon`. O `Is Active` da `.FAB Button` acompanha o do FAB Menu, e as ações ficam em Default, Neutral e Medium. No código: `active`, `show-action-3` a `show-action-6`, `actions` (rótulo:ícone, separados por vírgula), `label` (nome acessível do FAB), `icon`, `appearance` e `disabled` do FAB. Eventos `cds-toggle` e `cds-action`." },
        { h2: "Entrega para dev · CDS-1694" },
        { table: { head: ["Elemento", "Token ou valor (branch, 16/10)"], rows: [
          [".FAB Button", "56×56 `Sizes/56` · raio `Border/Radius/large` · padding `Sizes/16` · ícone 24"],
          ["Elevação do FAB", "`Elevation/level 2` em Enabled e Pressed · `level 3` em Hovered · sem elevação em Disabled"],
          ["Ação", "Main Button `Kind=Default`, `Appearance=Neutral`, `Size=Medium` (48) · `Elevation/level 1`"],
          ["Espaços", "`Sizes/12` entre as ações · `Sizes/16` entre as ações e o FAB"],
          ["Ícone", "`plus-line` fechado (swap `Icon`) · `close-line` aberto"]
        ] } },
        { ul: [
          "Tocar no FAB alterna entre aberto e fechado. Tocar numa ação executa a ação e fecha o menu.",
          "No layout, o FAB fica em posição fixa no canto inferior. O menu abre para cima e o FAB não sai do lugar. No Figma, a instância usa constraints Right e Bottom.",
          "Deixe respiro no fim da área com rolagem para o último item ficar acima do FAB.",
          "Acima de 6 ações, use outro componente."
        ] }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Is Active", items: [
          { label: "Fechado", attrs: menu({}) },
          { label: "Aberto", attrs: menu({ active: true }) }
        ] } },
        { specimens: { title: "Quantidade de ações", items: [
          { label: "2 ações", attrs: menu({ active: true, "show-action-3": "false" }) },
          { label: "4 ações", attrs: menu({ active: true, "show-action-4": true }) },
          { label: "6 ações", attrs: menu({ active: true, "show-action-4": true, "show-action-5": true, "show-action-6": true }) }
        ] } },
        { specimens: { title: ".FAB Button · Appearance", items: [
          { label: "Accent", attrs: menu({}) },
          { label: "Neutral", attrs: menu({ appearance: "neutral" }) },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [menu({ appearance: "inversed" })] } },
          { label: "Disabled", attrs: menu({ disabled: true }) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { h3: "Como é anunciado" },
        { ol: [
          "O FAB tem só ícone. O nome vem do atributo `label` (`aria-label`, padrão Mais ações) e descreve o conjunto. O ícone fica com `aria-hidden`.",
          "O FAB expõe `aria-haspopup=\"menu\"`, `aria-expanded` (`true` aberto, `false` fechado) e `aria-controls` com o id da lista. O nome não muda ao abrir.",
          "A lista usa `role=\"menu\"` e cada ação usa `role=\"menuitem\"`, com o rótulo visível como nome.",
          "Disabled usa o atributo `disabled`: o FAB sai da ordem de tabulação e é anunciado como indisponível."
        ] },
        { h3: "Ordem de leitura" },
        { ol: ["FAB (Mais ações, recolhido ou expandido)", "Com o menu aberto: as ações de cima para baixo"] },
        { h3: "Teclado" },
        { table: { head: ["Tecla", "Ação"], rows: [
          ["Enter ou Espaço no FAB", "Abre ou fecha o menu. Ao abrir, o foco vai para a primeira ação"],
          ["↑ ↓", "Navega entre as ações"],
          ["Home · End", "Vai para a primeira ou para a última ação"],
          ["Enter ou Espaço numa ação", "Executa a ação, fecha o menu e devolve o foco ao FAB"],
          ["Esc", "Fecha o menu e devolve o foco ao FAB"],
          ["Tab", "Sai do menu e fecha"]
        ] } },
        { h3: "Contraste (WCAG)" },
        { ol: [
          "Ícone no Accent (`Support/lighter` sobre `Accent/Solid/medium`): 4,54:1 em Enabled e Pressed, sem folga, e 8,23:1 em Hovered.",
          "Ícone no Neutral: 15,27:1 em Enabled, 13,56:1 em Hovered e 6,11:1 em Pressed.",
          "Ícone no Inversed: 16,96:1.",
          "Rótulo das ações (`Text/intense` sobre `Surface/01`): 15,27:1 — AAA.",
          "Estado desabilitado: isento do critério 1.4.3.",
          "FAB de 56×56 e ações com 48 de altura: acima do alvo mínimo de 24×24 (2.5.8).",
          "O FAB não pode esconder conteúdo com foco (2.4.11): deixe respiro no fim da área com rolagem."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: menu({ active: true }), title: "Use rótulos curtos e diretos",
            text: "Cada ação mostra ícone e texto o tempo todo. Comece pelo verbo e mantenha o rótulo em uma linha." },
          { attrs: menu({}), title: "Dê um nome ao FAB",
            text: "O FAB tem só ícone. Use um `label` que descreva o conjunto, ex.: Mais ações ou Criar." },
          { attrs: menu({ active: true, "show-action-3": "false" }), title: "Agrupe ações relacionadas",
            text: "O menu reúne de 2 a 6 ações da mesma tela. Para uma ação só, use o Main Button." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: menu({ active: true }), text: "Mantenha de 2 a 6 ações, todas visíveis sem rolagem." },
          { kind: "dont", attrs: menu({ active: true, actions: "Excluir conta:delete-line, Sair:logout-line", "show-action-3": "false" }), text: "Ação destrutiva ou secundária no FAB: ele destaca a ação principal da tela." },
          { kind: "do", attrs: menu({}), text: "Combine com o Backdrop à parte quando precisar destacar o menu aberto." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições usam os Motion Styles do Castanha (modo Normal)." },
        { display: { attrs: menu({}), live: true } },
        { note: "Exemplo interativo: passe o mouse no FAB, pressione e toque para abrir e fechar o menu. As ações herdam o motion do Main Button." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] },
          { title: "Fechado → Aberto", rows: [["Gatilho", "On tap no FAB"], ["Motion Style", "`Selected In/01`"]] },
          { title: "Entrada das ações (opacidade)", rows: [["Gatilho", "On tap no FAB"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Aberto → Fechado", rows: [["Gatilho", "On tap no FAB ou numa ação"], ["Motion Style", "`Selected Out/01`"]] },
          { title: "Saída das ações (opacidade)", rows: [["Gatilho", "On tap no FAB ou numa ação"], ["Motion Style", "`Hover Out/06`"]] }
        ] },
        { note: "No Pressed, o FAB reduz a escala para 90% e volta ao tamanho original. Ao abrir e ao fechar, as ações se deslocam em Y e a escala vai a 105% e volta, como a caixa do Drop Button e do Popover. Fonte: documentação de motion para devs (Notion, páginas verdes)." }
      ] }
    ]
  };
})();
