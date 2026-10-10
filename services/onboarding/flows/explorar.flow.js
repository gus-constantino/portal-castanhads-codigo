/* Explorar o portal (F4, plano §3.4 e Q7): as 20 paradas do antigo Roteiro (docs/roteiro, D236) viram uma trilha opcional dos
   Primeiros passos. Em 09/10 entrou o bloco Código e dados (Flutter, Desenvolvimento, MCP e Relatório): 24 paradas em 6 blocos. Cada parada se marca quando a pessoa abre o link dela pela trilha. O Roteiro agora redireciona para cá. */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding || !CDS.onboarding.trail) return;
  CDS.onboarding.trail({
    title: "Explorar o portal",
    intro: "24 coisas para abrir, clicar e mexer, em 6 blocos. Cada uma se marca quando você abre pela lista.",
    blocks: [
      { id: "menu", title: "Menu e navegação", items: [
        ["Menu em grade com miniaturas vivas", "Em Componentes, clique no ícone de grade. Cada card é o componente real, reduzido.", "#/main-button"],
        ["Busca no conteúdo das docs", "Digite uma regra na busca do menu, como Disabled. Ela acha a frase dentro das docs, além do nome do componente.", "#/main-button"],
        ["Preview no menu em lista", "Na lista de componentes, passe o mouse sobre os nomes. A miniatura aparece ao lado do menu.", "#/main-button"],
        ["Atalhos de teclado", "Aperte ? para conhecer todos. Alt e seta para a direita levam ao componente seguinte.", "#/main-button"]
      ] },
      { id: "playground", title: "Playground", items: [
        ["Componente ao vivo", "No Main Button, os controles da direita mudam o botão na hora: Kind, Appearance, Size e ícones.", "#/main-button"],
        ["Mobile, tablet e desktop", "Os ícones de viewport acima do componente mostram como ele se comporta em cada tamanho.", "#/card"],
        ["Tema escuro", "O ícone de lua no topo deixa o site inteiro no escuro, com os tokens do tema.", "#/tag"],
        ["Abrir chamado no Slack", "No topo da página, Abrir chamado copia um resumo do componente e abre o #castanha-suporte.", "#/badge"],
        ["Do Figma para o React", "Role a página até No React. O código do castanha-react muda junto com os controles.", "#/text-input"]
      ] },
      { id: "motion", title: "Motion", items: [
        ["Motion de cada componente", "Na tab Motion do Main Button, passe o mouse e pressione o botão para conferir cada transição.", "#/main-button/motion"],
        ["Laboratório de Motion", "Motion Styles em ação e um laboratório para comparar curvas, durações e velocidades.", "#/motion"]
      ] },
      { id: "marca", title: "Marca e visual", items: [
        ["Cores do Tema Caju", "A paleta entra animada e cada amostra copia o token com um clique.", "#/caju-theme/cores"],
        ["Elevação", "Escolha o nível e o card sobe com a sombra, decomposta em x, y, blur, spread e cor.", "#/caju-theme/elevacao"],
        ["Galeria de ícones", "Os ícones da Caju com troca de cor e tamanho para a grade toda e o detalhe de cada um.", "#/caju-theme/icones"],
        ["Ilustração", "Paletas clicáveis, personagens e uma simulação de condições visuais sobre uma ilustração.", "#/ilustracao"]
      ] },
      { id: "docs", title: "Documentação e recursos", items: [
        ["Do's and Don'ts", "As diretrizes do Main Button mostram o certo e o errado lado a lado, com o componente real.", "#/main-button/diretrizes"],
        ["Patterns", "Os tipos de Feedback Page do Sponsor ao vivo, com as ilustrações do Figma.", "#/patterns/sponsor"],
        ["Templates do Sponsor", "Passe o mouse sobre o Side Menu colapsado: ele abre por cima do conteúdo, como no produto.", "#/sponsor-side-menu"],
        ["Castanha Quiz", "Escolha um tema, faça o treino de 5 minutos e jogue com os componentes reais.", "#/castanha-quiz"],
        ["Agentes e Skills", "Conheça o Borô, o assistente do Castanha no Slack, e a skill /castanhads-juntos.", "#/agentes"]
      ] },
      { id: "codigo", title: "Código e dados", items: [
        ["Do Figma para o Flutter", "Role a página até No Flutter. O Dart do castanha_flutter muda junto com os controles.", "#/text-input"],
        ["Guias de desenvolvimento", "Instalação, ambiente e tokens para React e Flutter, com as docs do Storybook do castanha-react.", "#/comece-aqui"],
        ["MCP para a sua IA", "Conecte o seu assistente ao Castanha. Ele gera e revisa código React e Flutter com os componentes do DS.", "#/mcp"],
        ["Relatório do DS", "Na Equalização, passe o mouse para conferir quanto do DS está no Figma, no React e no Flutter em cada dia.", "#/relatorio"]
      ] }
    ]
  });
})();
