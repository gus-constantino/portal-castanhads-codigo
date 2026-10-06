/* Documentação — Balance Card
   Fonte: [CastanhaDS] Component use documentation · seção 6695:9618 · frame [Documentação] Balance Card
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Composição e Acessibilidade estão ocultas no Figma e aparecem aqui;
   os 2 Do/Don'ts ocultos ficaram de fora. Shortcut e Big number não estão na lib: as comparações mostram só o Balance Card (CONFERIR C89).
   Motion ainda é placeholder no Figma (C90). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["balance-card"] = {
  tag: "cds-balance-card",
  base: {},
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6695-9618",
  // Capa (frame [Header] do Figma), acima das tabs
  cover: { description: "Exibe o saldo de uma categoria com rótulo, valor e status complementares.", attrs: { icon: "meal-line", "header-tag": "Novo", label: "Alimentação", value: "100,00", "bottom-tag": "Voucher" } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Balance Card exibe o saldo de uma categoria com rótulo, valor e status complementares. É um componente interativo e funciona como ponto de entrada para o detalhe ou o extrato da categoria." },
      { h3: "Nomes alternativos comuns" },
      { p: "Category card, Balance tile, Stat card, Summary card, Wallet card." },
      { h3: "Princípios" },
      { cards: [
        ["Um saldo por card", "Cada card representa uma única categoria. Não agrupe valores de categorias diferentes no mesmo bloco."],
        ["Status complementa, não substitui", "As tags apoiam a leitura do saldo. Reserve as tags para quando a informação muda a decisão da pessoa usuária."],
        ["Toque previsível", "O card é sempre clicável e leva ao detalhe da categoria. Não utilize como elemento puramente informativo."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Balance Card quando a pessoa usuária precisar consultar o saldo de uma categoria e acessar seu detalhe a partir dali. Ele funciona bem em listas e grids, onde comparar valores entre categorias faz parte da tarefa, e suporta status complementares quando o saldo tem alguma condição associada." },
      { h3: "Utilize para:" },
      { ul: ["Exibir saldo por categoria em listas ou grids", "Dar entrada ao detalhe ou ao extrato da categoria", "Sinalizar status ligado ao saldo, como bloqueio ou vencimento", "Compor painéis de saldo com múltiplas categorias"] },
      { h3: "Não utilize para:" },
      { ul: ["Exibir um valor isolado, sem categoria (utilize o Currency)", "Elementos não clicáveis, já que o card tem estados de interação", "Agrupar vários valores no mesmo bloco (utilize List ou Table)", "Ações sem valor monetário associado (utilize o Shortcut)"] },
      { h3: "Balance Card vs Shortcut" },
      { p: "Use o Balance Card quando o saldo de uma categoria for a informação principal e a pessoa usuária precisar consultá-lo para decidir algo — especialmente quando o valor precisa de destaque ou vem acompanhado de um status, como bloqueio ou vencimento." },
      { p: "O Shortcut é indicado para acessos diretos e recorrentes, em que o valor aparece como apoio e o objetivo é chegar à ação em menos toques, desde que a categoria seja reconhecível pelo ícone e por um rótulo curto." },
      { compare: [{ title: "Este é um Balance Card", attrs: {} }] },
      { h3: "Balance Card vs Big number" },
      { p: "Use o Balance Card quando o saldo precisar ser consultado e levar a um destino, como o detalhe ou o extrato da categoria — o card é sempre clicável e responde a interação. O Big number é indicado quando o valor existe para ser lido com ênfase, sem nenhuma ação associada, como em painéis e resumos de leitura." },
      { compare: [{ title: "Este é um Balance Card", attrs: {} }] },
      { note: "Shortcut e Big number ainda não estão na lib do playground, por isso a comparação mostra o Balance Card sozinho." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: {},
        markers: [
          { n: 1, target: ".cds-bc__head > cds-icon", side: "left" }, // Figma: Right (C92)
          { n: 2, target: ".cds-bc__head > cds-tag", side: "right" }, // Figma: Left (C92)
          { n: 3, target: ".cds-bc__label", side: "left" },
          { n: 4, target: "cds-currency", side: "right" },
          { n: 5, target: ".cds-bc__content > cds-tag", side: "left" }
        ],
        legend: ["Lead Icon — ícone da categoria", "Header Tag — status opcional", "Label — nome da categoria", "Currency — valor do saldo", "Bottom Tag — informação complementar opcional"]
      } },
      { h2: "Composição do componente" },
      { p: "O Balance Card é composto por:" },
      { ul: [
        "Lead Icon (obrigatório): ícone da categoria, trocável via instance swap",
        "Header Tag (opcional): status no topo do card, controlado por `Show Header Tag`",
        "Label (obrigatório): nome da categoria, editável via `Text Label`",
        "Currency (obrigatório): valor do saldo em formato monetário",
        "Bottom Tag (opcional): informação complementar, controlada por `Show Bottom Tag`"
      ] },
      { h2: "Propriedades" },
      { props: [
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Lead Icon", type: "Swap component" },
        { name: "Show Header Tag", type: "Boolean" },
        { name: "Show Bottom Tag", type: "Boolean" }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados", min: "calc(var(--common-sizes-200) - var(--common-sizes-24))", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Leitura do card" },
      { ol: [
        "O card é anunciado como um único botão, não como elementos separados",
        "Lead Icon é decorativo e deve ser ignorado pelo leitor de tela",
        "Label — nome da categoria",
        "Currency — valor do saldo, lido por extenso",
        "Header Tag e Bottom Tag, quando ativas, após o valor"
      ] },
      { h2: "Contraste" },
      { ul: [
        "Label sobre `Surface/01`: 7,42:1 — atende AA e AAA",
        "Currency sobre `Surface/01`: 15,27:1 — atende AA e AAA",
        "Label no estado Hovered: 5,37:1 — atende AA",
        "Borda do estado Pressed: 7,42:1 — atende 1.4.11",
        "Disabled em 1,88:1 — isento por ser controle desabilitado"
      ] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { icon: "meal-line", "header-tag": "Novo", label: "Alimentação", "bottom-tag": "Voucher" }, title: "Mantenha o rótulo curto",
          text: "Use o nome da categoria sem complementos. O card cresce com o conteúdo a partir de 144px, e rótulos longos alargam o bloco e quebram o alinhamento do grid." },
        { attrs: { icon: "meal-line", "header-tag": "Novo saldo", label: "Alimentação", "show-bottom-tag": false }, title: "Ative as tags com parcimônia",
          text: "Cada tag comunica um único status. Ativar as duas ao mesmo tempo se justifica exclusivamente quando as duas informações mudam a decisão da pessoa usuária." },
        { attrs: { icon: "meal-line", label: "Alimentação", "show-header-tag": false, "show-bottom-tag": false }, title: "Escolha um ícone que comunique a categoria",
          text: "Substituir o placeholder não é suficiente. O ícone precisa comunicar qual categoria o card representa, sem depender do rótulo para ser compreendido." },
        { attrs: [
            { icon: "meal-line", label: "Alimentação", "show-header-tag": false, "show-bottom-tag": false },
            { icon: "car-line", label: "Mobilidade", "show-header-tag": false, "show-bottom-tag": false }
          ], title: "Mantenha larguras iguais em um mesmo grupo",
          text: "O card cresce com o conteúdo a partir de 144px e não tem largura máxima. Em listas e grids, rótulos de tamanhos diferentes produzem cards desalinhados." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: [
            { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
            { icon: "car-line", label: "Mobilidade", value: "180,00", "show-header-tag": false, "show-bottom-tag": false }
          ], text: "Use um card por categoria, com o saldo daquela categoria." },
        { kind: "dont", attrs: { label: "Alimentação e Mobilidade", value: "600,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não some nem agrupe categorias diferentes no mesmo card." },
        { kind: "do", attrs: { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Use o Balance Card quando houver um detalhe ou extrato para abrir." },
        { kind: "dont", attrs: { label: "Total do mês", value: "600,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não use o card para exibir informação sem destino. Ele tem estados de interação." },
        { kind: "do", attrs: { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Use o Balance Card quando o valor é o motivo da consulta." },
        { kind: "dont", attrs: { label: "Pedir cartão", value: "", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não use o Balance Card para ação sem valor associado. Use o Shortcut nesses casos." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Balance Card no Figma ainda está com texto de exemplo (lorem ipsum). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
