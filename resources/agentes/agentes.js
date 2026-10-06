/* Recurso: Agentes — agentes de IA do Castanha (Borô no Slack) e os Patterns escritos em .md para a IA ler.
   Fonte: anúncios do #castanha-novidades de setembro de 2026 (Agentes & Skills | Borô, Documentação | Tom e Voz e Patterns).
   Sem nomes de pessoas. O plugin castanha-ai fica de fora: é interno e ainda não foi anunciado (decisão do Gustavo, 05/10). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "agentes", name: "Agentes", resource: true, order: 8 });
  var BORO = "https://caju.slack.com/app_redirect?channel=U097X4BKLNP"; // conversa com o Borô no Slack da Caju
  var DEMO = "https://plataforma-web-lab.netlify.app/";

  CDS.docs["agentes"] = {
    tabs: [
      { id: "agentes", title: "Agentes", blocks: [
        { h2: "Agentes" },
        { p: "Os agentes de IA do Castanha ajudam a escrever, tirar dúvidas e construir interfaces no padrão da Caju. Eles não substituem o seu julgamento: conhecer as diretrizes é o que deixa a revisão das respostas mais afiada." },
        { shortcuts: [
          { title: "Borô", text: "O agente do Castanha no Slack: conteúdo no Tom e Voz, dúvidas sobre o DS e perfil dos clientes.", href: BORO, cta: "Conversar no Slack", external: true, illustration: "comunicacao/perguntas-frequentes" },
          { title: "Patterns para IA", text: "As decisões de experiência da Caju em .md, para a IA ler em qualquer ferramenta.", href: DEMO, cta: "Abrir a demo", external: true, illustration: "interfaces/customizacao" }
        ] },

        { h2: "Borô" },
        { p: "O Borô é o agente do Castanha no Slack. Lançado em 25 de agosto de 2026, ele ajuda pessoas de diferentes áreas da Caju." },
        { h3: "O que ele faz" },
        { ul: [
          "Cria e revisa conteúdos para colaboradores (B2C) no Tom e Voz da Caju. Conteúdo para empresas (B2B) está em construção.",
          "Responde dúvidas sobre Motion, Ilustração e Castanha DS.",
          "Traz o perfil dos clientes: Personas B2B, B2C, Operador e ICPs."
        ] },
        { h3: "Ajustes que ele faz" },
        { table: { head: ["No texto", "O Borô ajusta para"], wrap: true, rows: [
          ["Apelido não oficial de produto (ex.: “Cajuzinho”)", "O nome oficial do produto"],
          ["Label de botão vaga (ex.: “Entendi”, “Ok, obrigado”)", "Uma ação clara e específica"]
        ] } },
        { h3: "Como usar" },
        { steps: [
          { title: "Abra uma conversa", text: "Busque por Borô no Slack e mande o que precisa." },
          { title: "Cole o conteúdo", text: "Para textos de colaboradores, cole o conteúdo na conversa. Ele reescreve ou revisa no padrão da Caju e explica o que ajustar e por quê." },
          { title: "Avalie a resposta", text: "Toda resposta vem com 👍 e 👎. Reagir leva 2 segundos e mostra ao time o que funciona, guiando as próximas melhorias." }
        ] },
        { note: "As diretrizes que o Borô segue estão em Conteúdo: tom e voz, princípios de escrita e regras de texto." },

        { h2: "Patterns para IA" },
        { p: "Os Patterns são as decisões de experiência que a Caju já tomou, escritas em .md para a IA ler em qualquer ferramenta. Com eles, a IA monta interfaces no padrão da Caju em vez de gerar telas sem contexto." },
        { cards: [
          ["Fundamentos", "Design Colors e Design Spacing."],
          ["Web", "Formulários, Dashboard, Fluxos com etapas, Filtros, Feedback e empty states."],
          ["Mobile", "Formulários, Dashboard, Fluxos com etapas, Feedback e empty states."]
        ] },
        { p: "Próximos: Landing pages, Kanban view e Checkout. A demo mostra os Patterns aplicados na prática, e as definições são construídas em conjunto, às quintas, às 14h." },
        { note: "Fonte: anúncios do #castanha-novidades, setembro de 2026. Os Patterns para IA são diferentes da página Patterns do playground, que monta Feedback Pages e Tela de loading com componentes do DS." }
      ] }
    ]
  };
})();
