/* Treinamento: Como usar as Documentações? (zeroheight · Capacitações → Treinamentos → Design System · 8276145).
   No Hub, cada tab é só um vídeo do Drive (cortes da gravação do lançamento da documentação, 30/01/2026), sem texto.
   Aqui: resumo de cada tema a partir das Anotações do Gemini da reunião (decisão do Gustavo: resumo basta, com link
   para o vídeo; os vídeos só abrem com login Caju). Pessoas aparecem pelo papel, não pelo nome. Revisão: CONFERIR C157. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var ZH = "https://castanha.caju.com.br/858426090/v/latest/p/508bfb-treinamento-como-usar-as-documentacoes";
  CDS.register({ id: "treinamento", name: "Treinamento", resource: true, order: 3, zeroheight: ZH });
  function video(id, tema){
    return { shortcuts: [{ title: "Vídeo: " + tema, text: "Corte da gravação do lançamento da documentação (30/01/2026). Abre no Google Drive, com login Caju.",
      href: "https://drive.google.com/file/d/" + id + "/view", cta: "Assistir no Drive", external: true }] };
  }
  var DATA = { alert: { appearance: "informative", label: "Gravado em janeiro de 2026",
    text: "Os resumos seguem as anotações automáticas da reunião, organizadas pelo tema de cada vídeo. Números e links citados nos vídeos são daquela data: a situação de hoje está em cada tab." } };

  CDS.docs["treinamento"] = {
    tabs: [
      { id: "introducao", title: "Introdução", blocks: [
        DATA,
        { h2: "Introdução" },
        { p: "Abertura do lançamento da documentação do Castanha DS. O time de Design System apresenta como a documentação está organizada e por que ela existe: manter o padrão e a consistência enquanto o time e o produto crescem." },
        { h3: "Onde fica cada documentação" },
        { ul: [
          "Castanha Hub (zeroheight): para design — orientação, uso dos componentes e das experiências.",
          "Storybook (web) e Widgetbook (mobile): para desenvolvimento — implementação clara e confiável."
        ] },
        { h3: "Como elas se conectam no dia a dia" },
        { steps: [
          { title: "Consultar o Hub", text: "Quem desenha começa pelo Hub, para entender o uso dos componentes e das experiências." },
          { title: "Desenhar no Figma", text: "Com as diretrizes em mente, monta o fluxo com as bibliotecas do Castanha." },
          { title: "Implementar pelo Storybook", text: "No handoff, quem desenvolve usa o Storybook (ou o Widgetbook) para implementar de forma correta e consistente." }
        ] },
        video("1PoopyzugGmJDeemX09RoCl_ZVAnCCN54", "Introdução")
      ] },
      { id: "componentes", title: "Componentes", blocks: [
        DATA,
        { h2: "Componentes" },
        { p: "Como o Hub está dividido e como uma documentação de componente é construída." },
        { h3: "Seções do Hub hoje" },
        { ul: ["Sobre: por onde começar a usar o Castanha.", "Visão Cliente: personas.", "Conteúdo: como a Caju escreve.", "Fundação: ilustração, motion, layout e IA.", "Componentes: um por página.", "Patterns e Templates: padrões de tela.", "Capacitações: as gravações dos treinamentos, como esta.", "Agentes e Skills: o Borô."] },
        { note: "No vídeo, algumas seções aparecem com os nomes antigos (About, Foundation, Layout e Recursos e Ferramentas)." },
        { h3: "Como uma doc de componente é feita" },
        { ul: [
          "Parte dos fluxos que já existem, para achar as dificuldades de uso e decidir o que precisa ser documentado.",
          "Explica o que é, quando usar e quando não usar, com comparações com componentes parecidos.",
          "Traz princípios, estilos, variantes e diretrizes de uso.",
          "Mostra exemplos certos e errados (incluindo motion e padrões de conteúdo) e aplicações em fluxos reais da Caju."
        ] },
        { note: "Hoje: no playground, cada componente com doc tem as tabs Uso, Anatomia, Estilos, Acessibilidade, Diretrizes e Motion, além do Playground." },
        video("1MlBoeLbLmRM1cqihOSH0v6c18bqBaYOz", "Componentes")
      ] },
      { id: "content", title: "Content", blocks: [
        DATA,
        { h2: "Content" },
        { p: "Conteúdo é a forma como a pessoa usuária se relaciona com o produto: sem padrão, a experiência fica inconsistente. O guia oficial de como a Caju escreve fica na documentação de conteúdo, com a meta de escalar para toda a empresa." },
        { h3: "O que a documentação de conteúdo cobre" },
        { ul: ["Princípios de escrita.", "Regras gramaticais, como formato de data e pontuação.", "Playbooks para situações específicas, como o tour guiado.", "Vocabulário: a lista de palavras padronizadas da experiência.", "Guias de notificação."] },
        { h3: "Borô: IA para escalar os padrões" },
        { p: "O Borô é uma base de conhecimento ativa com IA, pensada como assistente do dia a dia de quem desenha. O primeiro teste usou a documentação de conteúdo, e o primeiro mês teve boa avaliação de resolução, relevância e recomendação. O plano é estender o Borô às documentações do Castanha e a insights de pesquisa." },
        { note: "Hoje: o guia está no playground em Recursos de suporte → Conteúdo, e o Borô tem página própria no Hub (Agentes e Skills)." },
        video("1eFRhEc_IBus6E-RAOfk2K7NNhW_tGzGc", "Content")
      ] },
      { id: "ilustracao", title: "Ilustração", blocks: [
        DATA,
        { h2: "Ilustração" },
        { p: "A documentação de ilustração serve para comunicar o visual, reforçar a identidade da Caju e garantir uma experiência de excelência." },
        { h3: "O que ela traz" },
        { ul: ["Princípios de uso.", "Painel semântico: o processo de criação de quem ilustra.", "Guidelines de aplicação nos produtos.", "Separação por categorias.", "Exemplos de como as ilustrações se comportam em cada contexto (mobile, desktop)."] },
        { note: "Hoje: o guia completo e a biblioteca estão no playground em Caju - Tema → Ilustrações." },
        video("1l-bmWY8NfvkE-4za0h42yKaiImNwAjNH", "Ilustração")
      ] },
      { id: "motion", title: "Motion", blocks: [
        DATA,
        { h2: "Motion" },
        { p: "UX motion comunica comportamento, estado e intenção, eleva a experiência e fortalece a personalidade da marca. Parte dos princípios de design do Castanha (simples, eficiente e consistente) e das boas práticas do mercado." },
        { ul: ["Os princípios viraram motion tokens, documentados no Hub para design e desenvolvimento.", "A ideia é que os componentes já venham com as animações configuradas, prontas para quem desenvolve."] },
        { note: "Hoje: princípios, curvas, durações e os Motion Styles (/01) estão no playground em Caju - Tema → Motion." },
        video("1fqz1azprKWMYtvSQJlXt1fA8Ijw5oo8C", "Motion")
      ] },
      { id: "recursos", title: "Recursos e ferramentas", blocks: [
        DATA,
        { h2: "Recursos e ferramentas" },
        { p: "As evoluções do Castanha no código, apresentadas pela engenharia do time: mais integração entre design e código, componentes mais assertivos, documentação padronizada e uma codebase com foco em acessibilidade, variações e tokens. Todos os entregáveis passam a usar o prefixo castanha-." },
        { h3: "O que mudou" },
        { ul: [
          "Tokens modulares, com saída para SCSS, CSS, JavaScript, TypeScript e Dart.",
          "Ícones agnósticos (web e mobile), com nomes alinhados ao design e um componente utilitário de ícone.",
          "Biblioteca React mais leve: num exemplo, o bundle caiu de 500 KB para menos de 15 KB.",
          "Novas bibliotecas: castanha-illustrations (assets de ilustração) e motion (assets e um componente de animação).",
          "Extensões: castanha-castoken, plugin do Figma que leva as variáveis para o GitHub, e castanha-intellisense, autocomplete e realce de tokens no editor (com conversão para Dart).",
          "Storybook 2.0: além dos componentes, documenta plugins, tokens, get started e as novas bibliotecas; tem abas de código e design, com link para o Figma.",
          "Prompts de migração com IA para os componentes que mudaram de API."
        ] },
        video("1k0cvIylVYwX8Fr4SwVL43kow-_LZjBlz", "Recursos e ferramentas")
      ] },
      { id: "duvidas", title: "Dúvidas", blocks: [
        DATA,
        { h2: "Dúvidas" },
        { p: "Perguntas do público no fim do lançamento." },
        { h3: "Todos os componentes já estão na nova estrutura?" },
        { p: "Na época, não: a migração era feita passo a passo, começando com 20 componentes na nova estrutura, de 62 em React e 64 em Flutter." },
        { h3: "Os pacotes antigo e novo vão conviver?" },
        { p: "Sim. Dois pacotes evitam breaking changes: o antigo segue com suporte e atualizações, e as novidades entram no novo. A migração é gradual, feita pelas squads com ajuda das ferramentas de migração." },
        { h3: "Onde tirar dúvidas e acompanhar novidades?" },
        { p: "No canal Castanha Suporte, para dúvidas, e no Castanha Novidades, para as atualizações." },
        { note: "Hoje: o playground espelha 105 componentes do Figma, e 70 deles já têm par no castanha-react (staging); veja a seção \"No React\" de cada componente." },
        video("1tuP6BnQKIbKoQJdh2quAUTKGMqfQa67D", "Dúvidas")
      ] }
    ]
  };
})();
