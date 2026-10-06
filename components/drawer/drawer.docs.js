/* Documentação — Drawer
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Drawer, 0256b2) reaproveitado; props e padrões do componente da lib estável
   (Drawer 16456:4381, description); comportamento e acessibilidade do playground. Divergências no CONFERIR (C131):
   o zeroheight diz que abre da esquerda para a direita e a lib diz que surge da direita; "Overlay" no zeroheight é o Backdrop. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  var FORM = [{ _tag: "cds-text-input", label: "Nome do centro de custo", value: "Marketing", "show-lead-icon": false, "show-supporting-content": false }, { _tag: "cds-text-input", label: "Responsável", value: "Ana Souza", "show-lead-icon": false, "show-supporting-content": false, "show-required": false }];
  function drawer(title, kids, extra){ return Object.assign({ _tag: "cds-drawer", inline: true, open: true, viewport: "desktop", "text-title": title, "primary-label": "Salvar", "secondary-label": "Cancelar", _children: kids }, extra || {}); }
  CDS.docs["drawer"] = {
    tag: "cds-drawer",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/0256b2-drawer", sourceLabel: "Abrir o Drawer no zeroheight",
    cover: { description: "O Drawer é um painel lateral deslizante utilizado para expor conteúdos complementares ou etapas adicionais dentro de um fluxo principal, sem interromper a tela atual. Ele aparece sobreposto à interface e permite que a pessoa usuária mantenha o contexto enquanto realiza uma interação específica.", tall: true, wide: true, examples: [drawer("Novo centro de custo", FORM)] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Desktop-only", text: "No Figma, o Drawer existe exclusivamente no Desktop: em Tablet e Mobile, o painel é substituído por um Viewport Restriction." } },
        { h2: "Sobre" },
        { p: "O Drawer é um painel lateral deslizante utilizado para expor conteúdos complementares ou etapas adicionais dentro de um fluxo principal, sem interromper a tela atual. Ele aparece sobreposto à interface e permite que a pessoa usuária mantenha o contexto enquanto realiza uma interação específica." },
        { h3: "Nomes alternativos comuns" },
        { p: "Side Panel, Painel Lateral, Lateral Sheet, Sheet." },
        { h3: "Princípios" },
        { cards: [
          ["Contextual", "Mantém a pessoa usuária no fluxo principal, exibindo informações ou ações diretamente relacionadas ao contexto atual."],
          ["Direto", "Suporta interações de baixa complexidade, evitando múltiplas etapas, subfluxos ou navegações internas."],
          ["Não obstrutivo", "Ocupa parte da tela e pode ser fechado a qualquer momento, preservando a continuidade do fluxo."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Drawer para apresentar funcionalidades ou tarefas que exigem mais espaço do que um Modal, mas que ainda precisam manter o contexto da navegação primária. É a escolha adequada para interações mais complexas, como formulários mais longos, visualização detalhada de itens em uma lista, ou configurações secundárias que não justificam uma navegação de página completa." },
        { h3: "Utilize para:" },
        { ul: ["Formulários que contenham múltiplos campos, ideais para formulários longos, e exigem foco sem abandonar a página principal.", "Visualização de detalhes e configurações de um item que exige uma área de tela significativa.", "Fluxos de interação que são mais complexos do que os suportados por um Modal, mas cujas ações são de baixa complexidade."] },
        { h3: "Não utilize para:" },
        { ul: ["Interações curtas ou críticas que exijam uma única confirmação pontual — nesses casos, o Modal é mais apropriado.", "Exibir conteúdo principal de uma página ou substituir navegação primária — o Drawer não deve assumir papel de tela principal.", "Fluxos que dependem de subfluxos, navegação interna ou múltiplas etapas — o Drawer não possui fluxo interno, não suporta subfluxo e não deve ser utilizado dentro de estruturas desse tipo."] },
        { h2: "Casos de uso" },
        { h3: "Drawer vs. Modal" },
        { p: "O Modal é indicado para interações curtas, diretas e potencialmente críticas, sempre com foco total da pessoa usuária e apresentação centralizada. Já o Drawer é ideal para conteúdos mais extensos — como formulários maiores, consultas detalhadas ou edições pontuais — oferecendo um espaço lateral que preserva o contexto da página." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: drawer("Novo centro de custo", FORM),
          markers: [{ n: 1, target: "cds-header .cds-header__title", side: "left" }, { n: 2, target: ".cds-overlay__slot", side: "left" }, { n: 3, target: "cds-footer", side: "left" }, { n: 4, target: "cds-header cds-icon-button", side: "right" }, { n: 5, target: ".cds-drawer__panel", side: "right" }],
          legend: ["Header", "Slot", "Footer action", "Close button", "Drawer container"]
        } },
        { h2: "Composição do componente" },
        { p: "O Drawer é composto por um header obrigatório, que inclui um título e um botão de fechar fixo, um slot de conteúdo, responsável por receber qualquer estrutura definida pela pessoa usuária, e uma barra de ações opcional na base do componente, destinada a ações primárias e secundárias." },
        { h3: "Backdrop" },
        { p: "O Drawer é apresentado sobre um Backdrop semitransparente, que escurece discretamente o restante da interface para reforçar o foco no conteúdo lateral. No playground, o Backdrop vem junto com o Drawer: ele sempre fecha ao clicar fora ou no Esc." },
        { h2: "Propriedades" },
        { props: [
          { name: "Text Title", type: "Text", default: "Title" },
          { name: "Show Action Buttons", type: "Boolean", default: "true" },
          { name: "Show Secondary Action Button", type: "Boolean", default: "true" },
          { name: "Slot", type: "Slot" }
        ] },
        { note: "Props e padrões lidos do componente Drawer da lib estável. O zeroheight ainda lista With button? e Heading (CONFERIR C131). 640 de largura · Elevation/level 1 · Surface/default." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Ações" },
        { specimens: { min: "calc(var(--common-sizes-200) * 3 + var(--common-sizes-40))", items: [
          { label: "Com ações (padrão)", attrs: drawer("Detalhes do pedido", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Pedido #1234 · 12 colaboradores · R$ 3.600,00" }]) },
          { label: "Ação primária, sem a secundária", attrs: drawer("Detalhes do pedido", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Pedido #1234 · 12 colaboradores · R$ 3.600,00" }], { "show-secondary-action-button": "false" }) },
          { label: "Sem ações", attrs: drawer("Detalhes do pedido", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Pedido #1234 · 12 colaboradores · R$ 3.600,00" }], { "show-action-buttons": "false" }) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É um `<dialog>` modal: o resto da página fica inerte enquanto o Drawer está aberto.",
          "O título do Header é o nome acessível do painel.",
          "O botão de fechar é um Icon Button com rótulo (\"Fechar\")."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Ao abrir, o foco entra no Drawer e fica preso nele.", "Esc fecha. O clique no Backdrop também fecha.", "Ao fechar, o foco volta para o elemento que abriu o Drawer."] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Drawer." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: [
          "Padrão de abertura lateral: o Drawer surge da borda direita da tela, sempre do mesmo lado, para manter a previsibilidade da interação.",
          "Uso obrigatório de Backdrop: ele direciona o foco para o painel lateral, reduz interferências visuais e indica que o conteúdo principal está temporariamente em segundo plano. O clique fora fecha o Drawer.",
          "Limitação de complexidade: a Drawer não deve conter fluxos internos, subetapas nem componentes complexos como abas, tabelas, listas densas ou estruturas que exijam navegação própria.",
          "Complemento ao fluxo principal: todas as ações previstas para a Drawer precisam ser concluídas ali mesmo, permitindo retornar imediatamente ao fluxo principal com clareza e continuidade."
        ] },
        { note: "O zeroheight diz que a Drawer abre \"do lado esquerdo da tela para o direito\". A description da lib diz que surge da direita, e o playground segue a lib (CONFERIR C131)." },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", text: "Use um título claro e direto: Ajuda a pessoa usuária a entender imediatamente o propósito da Drawer." },
          { kind: "dont", text: "Não utilize títulos genéricos ou vagos: Eles dificultam a compreensão do contexto e prejudicam a tomada de decisão." },
          { kind: "do", text: "Organize o conteúdo de forma objetiva e hierarquizada: Facilita leitura, escaneabilidade e execução da ação." },
          { kind: "dont", text: "Não insira conteúdo denso ou componentes complexos: Tabelas, abas e estruturas profundas tornam a Drawer pesada e inadequada." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção de Motion do Drawer no zeroheight ainda é placeholder, e o componente não tem animação de entrada e saída no playground." } }
      ] }
    ]
  };
})();
