/* Recurso: Agentes e Skills — agentes de IA do Castanha (Borô no Slack), os Patterns escritos em .md para a IA ler e a skill /castanhads-juntos.
   Fontes: página Borô do zeroheight (Agentes e Skills › Borô · 8985351) e anúncios do #castanha-novidades de setembro de 2026.
   Foto do Borô: componente boro (Type=rosto) da lib 4. [Castanha DS] Illustration, exportado em SVG (resources/agentes/boro.svg).
   Sem nomes de pessoas. O plugin castanha-ai fica de fora: é interno e ainda não foi anunciado (decisão do Gustavo, 05/10).
   Tab /castanhads-juntos (pedido do Gustavo, 05/10): resumo da skill a partir do SKILL.md atual e do Getting Started do Figma
   (RF5sagPdKQD6IoP2MYa2ki · 2248:282, conferido contra a v4.2). O arquivo da skill continua fora do repo: só o resumo, sem
   IDs do Notion, nomes do time nem procedimentos internos. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "agentes", name: "Agentes e Skills", resource: true, order: 8, zeroheight: "https://castanha.caju.com.br/858426090/v/latest/p/44eff3" });
  var BORO_IMG = "resources/agentes/boro.svg";
  var BORO = "https://caju.slack.com/app_redirect?channel=U097X4BKLNP"; // conversa com o Borô no Slack da Caju
  var DEMO = "https://plataforma-web-lab.netlify.app/";
  var GETTING_STARTED = "https://www.figma.com/design/RF5sagPdKQD6IoP2MYa2ki/Getting-Started--Castanha-Design-System?node-id=2248-282";

  CDS.docs["agentes"] = {
    tabs: [
      { id: "agentes", title: "Agentes", blocks: [
        { h2: "Agentes e Skills" },
        { p: "Os agentes e as skills de IA do Castanha ajudam a escrever, tirar dúvidas e construir interfaces no padrão da Caju. Eles não substituem o seu julgamento: conhecer as diretrizes é o que deixa a revisão das respostas mais afiada." },
        { shortcuts: [
          { title: "Borô", text: "O assistente do Castanha no Slack: Design System, Content Design, Motion e Ilustração.", href: BORO, cta: "Conversar no Slack", external: true, src: BORO_IMG },
          { title: "Patterns para IA", text: "As decisões de experiência da Caju em .md, para a IA ler em qualquer ferramenta.", href: DEMO, cta: "Abrir a demo", external: true, illustration: "interfaces/customizacao" },
          { title: "/castanhads-juntos", text: "A skill do Claude que confere, lembra e documenta o trabalho com componentes do Castanha DS.", href: "#/agentes/juntos", cta: "Ver a skill", illustration: "dispositivos/notebook-relatorios" }
        ] },

        { h2: "Borô" },
        { persona: { id: "boro", name: "Borô", nick: "Assistente do Castanha", src: BORO_IMG,
          quote: "Tire suas dúvidas consultando a documentação em tempo real.",
          data: [["Onde", "Slack, em conversa direta"], ["Temas", "Design System, Content Design, Motion e Ilustração"], ["No ar desde", "25 de agosto de 2026"]],
          story: "O Borô é o assistente do Castanha, o design system da Caju, e o parceiro na aplicação do Tom e Voz. Ele tem jeito próprio: fala de forma amigável e fácil de entender, mesmo para quem tem pouca familiaridade com tecnologia, e explica o porquê de cada regra.",
          cols: [
            { title: "Utilize para", items: [
              "Confirmar como usar um componente: anatomia, estados e tokens aplicados.",
              "Revisar ou criar copy dentro das regras de Content Design: tom, limite de caracteres e neutralidade.",
              "Checar parâmetros de motion, como duração e easing de uma transição.",
              "Descobrir qual estilo de ilustração usar em cada contexto (ex.: tela de erro).",
              "Encontrar a página certa da documentação sem garimpar o zeroheight inteiro."
            ] },
            { title: "Não utilize para", items: [
              "Tomar decisões de produto ou de negócio.",
              "Tirar dúvidas sobre Figma, Storybook ou código.",
              "Aprovar exceções ou destravar impasses estratégicos.",
              "Tratar dados sensíveis ou informações internas fora do Castanha.",
              "Avaliar a arquitetura de componentes."
            ] }
          ] } },

        { h3: "Princípios" },
        { cards: [
          ["Verdade vem da fonte", "O Borô responde com base na documentação oficial do Castanha, nunca de memória. Se a doc não cobre o assunto, ele avisa em vez de inventar."],
          ["A favor de quem usa", "Fala de um jeito amigável e fácil de entender, mesmo para quem tem pouca familiaridade com tecnologia."],
          ["Parceiro do time", "Explica o motivo documentado por trás de cada regra, então você aprende no processo."]
        ] },

        { h3: "Na prática" },
        { cards: [
          ["Mandou um print? 📷", "Ele lê o texto de um print e sugere ajustes, o que ajuda na revisão de copy de uma tela. Ainda não interpreta o componente visualmente: cor, espaçamento e layout ficam fora. Para isso, descreva o cenário ou consulte a doc do componente."],
          ["Fonte para se aprofundar 🔎", "Responde de forma objetiva e cita a página consultada como link clicável (ex.: Estados do Main Button)."],
          ["Revisão de copy ✍️", "Mostra a análise, explica o motivo documentado e entrega de duas a três opções neutras, dentro do limite de caracteres e no Tom e Voz da Caju para colaboradores."],
          ["Contexto antes da resposta 📖", "Quando o cenário não está claro, ele pergunta o produto, o fluxo e o que a pessoa usuária precisa fazer."]
        ] },
        { h3: "Ajustes que ele faz" },
        { table: { head: ["No texto", "O Borô ajusta para"], wrap: true, rows: [
          ["Apelido não oficial de produto (ex.: “Cajuzinho”)", "O nome oficial do produto"],
          ["Label de botão vaga (ex.: “Entendi”, “Ok, obrigado”)", "Uma ação clara e específica"]
        ] } },

        { h3: "Como usar" },
        { steps: [
          { title: "Abra uma conversa", text: "No Slack, procure por Borô e inicie uma conversa direta, no meio do trabalho, quando bater a dúvida." },
          { title: "Mande a dúvida ou o texto", text: "Para revisar copy, cole o conteúdo ou mande um print. Ele reescreve ou revisa no padrão da Caju e explica o que ajustar e por quê." },
          { title: "Avalie a resposta", text: "Toda resposta vem com 👍 e 👎. Reagir leva 2 segundos e mostra ao time o que funciona, guiando as próximas melhorias." }
        ] },
        { alert: { appearance: "informative", label: "Quando falar com o time", text: "O time entra quando o assunto pede decisão, exceção ou algo que ainda não virou doc: canais #castanha-suporte e #suporte-content, ou a agenda de suporte do Castanha, às terças, das 16h às 17h30. Quando o Borô esbarra num impasse desses, ele mesmo direciona para o time certo." } },
        { note: "Fonte: página Borô do zeroheight (Agentes e Skills) e anúncios do #castanha-novidades. As diretrizes que o Borô segue estão em Conteúdo: tom e voz, princípios de escrita e regras de texto." },

        { h2: "Patterns para IA" },
        { p: "Os Patterns são as decisões de experiência que a Caju já tomou, escritas em .md para a IA ler em qualquer ferramenta. Com eles, a IA monta interfaces no padrão da Caju em vez de gerar telas sem contexto." },
        { cards: [
          ["Fundamentos", "Design Colors e Design Spacing."],
          ["Web", "Formulários, Dashboard, Fluxos com etapas, Filtros, Feedback e empty states."],
          ["Mobile", "Formulários, Dashboard, Fluxos com etapas, Feedback e empty states."]
        ] },
        { p: "Próximos: Landing pages, Kanban view e Checkout. A demo mostra os Patterns aplicados na prática, e as definições são construídas em conjunto, às quintas, às 14h." },
        { note: "Fonte: anúncios do #castanha-novidades, setembro de 2026. Os Patterns para IA são diferentes da página Patterns do playground, que monta Feedback Pages e Tela de loading com componentes do DS." }
      ] },
      { id: "juntos", title: "/castanhads-juntos", blocks: [
        { h2: "/castanhads-juntos" },
        { p: "Skill do Claude para o trabalho com componentes do Castanha DS. Ninguém vai desenhar por você: a skill lembra, confere e escreve. Quem decide continua sendo quem sempre decidiu." },
        { shortcuts: [
          { title: "Getting Started no Figma", text: "A apresentação da skill e das entregas para dev, com o diagrama das etapas.", href: GETTING_STARTED, cta: "Abrir no Figma", external: true }
        ] },

        { h3: "Onde ela funciona" },
        { cards: [
          ["Claude (web e app desktop)", "Instalada como skill na sua conta. Ela entra sozinha quando a conversa toca um componente do Castanha DS. Cada conversa usa a cópia instalada: o que se edita na skill durante uma conversa não volta para a fonte."],
          ["Claude Code (terminal, app desktop e IDE)", "A mesma skill, para quem trabalha com código e arquivos. É assim que este playground é mantido: cada componente segue o protocolo Juntos."],
          ["Conectores", "Figma MCP remoto para ler a lib com o arquivo fechado, MCP do zeroheight para a doc publicada, e Jira e Notion para registrar as entregas, sempre com a sua aprovação."]
        ] },
        { p: "Para começar a usar, peça a skill ao time do Castanha DS no #castanha-suporte." },

        { h3: "Para que serve" },
        { p: "O desafio é padrão consistente em escala. O que dói é garantir que o que foi desenhado é o que chega implementado, com contratos, padrões e regras aplicados, qualquer que seja a pessoa ou o componente. Por isso a métrica não é tempo economizado: é qualidade e consistência." },

        { h3: "O princípio" },
        { p: "Guardiã de fidelidade entre design e código, não autora primária." },
        { cards: [
          ["Você faz", "Escopo, estética, pontes humanas, filtro de falsos positivos, design e visual."],
          ["A skill faz", "Auditoria mecânica, contraste, cruzamento de fontes, memória entre iterações e documentação."]
        ] },
        { alert: { appearance: "informative", label: "Regra de ouro", text: "Nada vai para Jira, Notion, Slack ou Figma sem a sua aprovação explícita no chat. O conteúdo aparece antes de ser gravado, sempre." } },

        { h3: "Quando ela entra" },
        { cards: [
          ["Task de componente", "Criação, migração do legado para a lib estável, refatoração, auditoria ou handoff."],
          ["Código CDS-*", "Qualquer issue do projeto CDS no Jira."],
          ["File key das libs", "Lib estável, legado ou o file key de uma branch."],
          ["Node pedindo validação", "Você cola a URL com node-id e pede revisão."]
        ] },

        { h3: "Como começar uma sessão" },
        { steps: [
          { title: "Cole a URL do node", text: "O link do Figma com node-id. Se for branch, use o file key da branch: ele é diferente do da lib." },
          { title: "Diga o cenário e a task", text: "Criação, migração ou refatoração, e o código CDS-. É o que evita achado fora de escopo." },
          { title: "Diga o foco da sessão", text: "Contraste, tokens, anatomia ou revisão completa. Foco estreito rende mais que varredura." }
        ] },
        { p: "Não precisa deixar o Figma aberto: a leitura acontece pela API do Figma, com o arquivo fechado." },

        { h3: "As etapas, de ponta a ponta" },
        { table: { head: ["Etapa", "O que acontece", "Quem"], wrap: true, rows: [
          ["1. Abertura", "Cenário, task no Jira e branch. Registro da sessão e abertura na task.", "Você define"],
          ["2. Leitura", "Estrutura, properties e as annotations que já existem. Pesquisa em outros design systems de referência.", "A skill executa"],
          ["3. Revisão", "Tokens, contraste, anatomia e naming. Diff contra a revisão anterior.", "A skill propõe"],
          ["4. Filtro", "Você separa achado real de falso positivo.", "Você decide"],
          ["5. Entregas", "Annotations, handoff dev, doc pública, Notion e Jira.", "Com o seu aval"]
        ] } },
        { p: "Leitura, revisão e filtro se repetem em ciclos curtos: cinco revisões de 10 minutos funcionam melhor que uma auditoria única no fim. Ler as annotations antes de opinar sobre lógica é obrigatório. No Date Picker, um achado inteiro caiu porque uma annotation de Handoff explicava que aquele Role era afordância de protótipo, não requisito de código." },

        { h3: "O que roda em todo ciclo" },
        { ul: [
          "Contraste WCAG AA, com composição alpha quando há opacidade.",
          "Variables e tokens semânticos contra valores fixos.",
          "Aderência ao Índice de Propriedades.",
          "Naming de building blocks no padrão \"Sub-componente Componente\".",
          "Anatomia: padding, gap, altura e raio.",
          "Diff contra a revisão anterior."
        ] },
        { p: "Componentes compostos (ex.: Table e Table Columns) vão por partes, com a coerência do conjunto validada no fim. Em migração, o sistema de tokens inteiro do legado é mapeado e reapontado para a lib estável." },

        { h3: "O que ela devolve" },
        { cards: [
          ["Memória entre iterações", "Ela guarda o estado da revisão anterior. Regressão silenciosa aparece no diff, não semanas depois."],
          ["Conta o que dá para contar", "Contraste com composição alpha, token contra valor fixo, padding e gap. Resposta verificável, em todas as combinações."],
          ["Cruza fontes que você não abriria", "Figma, Storybook, Flutter, analytics da biblioteca e código-fonte de outros design systems."],
          ["Redige, para você revisar", "Annotations, handoff dev, doc pública e comentário de sessão. Você revisa texto em vez de partir da folha em branco."]
        ] },

        { h3: "O que chega na pessoa desenvolvedora" },
        { table: { head: ["Entrega", "Atalho", "O que é"], wrap: true, rows: [
          ["Annotations no Figma", "`criar annotations {componente}`", "Categorias (Handoff, Accessibility, Content e outras) agrupadas por elemento, prontas para colar. Uma annotation, um assunto."],
          ["Handoff dev", "`gera handoff`", "`{componente}-handoff.md` com variantes, anatomia, props, tokens por estado, estados visuais, building blocks, comportamento e checklist técnico."],
          ["Handoff zeroheight", "`criar handoff zeroheight {componente}`", "`{componente}-zeroheight.md` com Specs, Style e Guidelines: quando usar e como usar bem. Parte do handoff dev."],
          ["Taxonomia conferida", "`castanha-qa {node}`", "Propriedades, padrões de atributos, escala de variables e palavras reservadas conferidos antes do código, da doc e da release. Ajuste de nome tarde vira breaking change."],
          ["Contraste com evidência", "`só contraste`", "Par que passa AA por margem mínima entra no handoff com o ratio, os dois tokens e o aviso de recalcular antes de mexer. A isenção do Disabled (WCAG 1.4.3) fica registrada."]
        ] } },
        { p: "Handoff dev e handoff zeroheight são complementares: um não substitui o outro. Numa família de componentes (ex.: Select Input), cada componente tem as próprias entregas." },

        { h3: "Guard rails" },
        { cards: [
          ["Checklist de falsos positivos", "Roda antes de cravar qualquer achado. Exemplo: Focused ausente não é defeito, porque o foco segue um padrão global do sistema e não vira variante."],
          ["Investigar antes de acusar", "Checa auto-layout e variables reais antes de chamar algo de bug, e considera decisões, regras de negócio e documentações que já existem."],
          ["A decisão volta para você", "Quando precisa escolher, ela pergunta com opções curtas em vez de assumir. A IA propõe, a pessoa designer decide."]
        ] },

        { h3: "O que continua com você" },
        { p: "A skill não tem gosto e não finge ter." },
        { cards: [
          ["Escopo", "O que entra e o que fica fora da task."],
          ["Estética", "Estilo, identidade e micro-interação."],
          ["Pontes humanas", "Alinhamento com o time, as lideranças de DS, devs e demais envolvidos."],
          ["A palavra final", "Todo achado passa pelo seu filtro."]
        ] },

        { h3: "O que ela não faz" },
        { ul: [
          "Criar componente do zero como autora estética. Esqueleto técnico pode, visual não.",
          "Decidir escopo de produto, regra de negócio ou estética sozinha.",
          "Tocar em credenciais, tokens de API ou senhas, em lugar nenhum.",
          "Inventar dado. Quando não sabe ou a rede bloqueia, ela diz isso em vez de improvisar."
        ] },

        { h3: "Atalhos de conversa" },
        { table: { head: ["Atalho", "O que faz"], wrap: true, rows: [
          ["`castanha-qa {node}`", "Bateria completa de QA: construção, tokens, WCAG 2.2, naming e anatomia."],
          ["`revisão completa do node {id}`", "Valida tudo e gera o checklist 🔴 críticos, 🟡 importantes e 🟢 positivos."],
          ["`ler annotations {node}`", "Varre a página e resume o que já está anotado. Passo obrigatório antes de revisar lógica."],
          ["`criar annotations {componente}`", "Gera a lista de annotations pronta para colar."],
          ["`só tokens`", "Lista os tokens usados e aponta valores fixos."],
          ["`só contraste`", "WCAG em todas as combinações de cor."],
          ["`só anatomia`", "Estrutura, padding, gaps e alinhamento."],
          ["`diff vs. anterior`", "Compara com a revisão passada."],
          ["`gera handoff`", "Handoff dev em .md."],
          ["`criar handoff zeroheight {componente}`", "Doc pública no formato do zeroheight."],
          ["`diff zeroheight {componente}`", "Página publicada contra o Figma e o handoff."],
          ["`benchmark {componente}`", "Compara com outros design systems pelo código-fonte."],
          ["`fechamento de dia`", "Resume o dia, atualiza o Notion e comenta no Jira."],
          ["`fechar task {CDS-XXX}`", "Comentário de conclusão, nome do anexo e status da task de design."],
          ["`conectar zeroheight`", "Guia a conexão do MCP do zeroheight no Claude Desktop."]
        ] } },
        { note: "Fonte: SKILL.md da castanhads-juntos (outubro de 2026) e o Getting Started do Castanha Design System no Figma, conferido contra a v4.2 de agosto de 2026. O Getting Started está um pouco desatualizado: o atalho `fechar task` e a ligação com o setup de documentação no Figma vieram depois." }
      ] }
    ]
  };
})();
