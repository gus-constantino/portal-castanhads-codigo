/* Recurso: Agentes e Skills — agentes de IA do Castanha (Borô no Slack e no Figma), os Patterns escritos em .md para a IA ler e a skill /castanhads-juntos.
   Fontes: página Borô do zeroheight (Agentes e Skills › Borô · 8985351, conferida em 09/10/2026) e anúncios do #castanha-novidades de setembro de 2026.
   Foto do Borô: componente boro (Type=rosto) da lib 4. [Castanha DS] Illustration, exportado em SVG (resources/agentes/boro.svg).
   Sem nomes de pessoas. O plugin castanha-ai fica de fora: é interno e ainda não foi anunciado (decisão do time, 05/10).
   Tab /castanhads-juntos (pedido do time, 05/10): resumo da skill a partir do SKILL.md atual e do Getting Started do Figma
   (RF5sagPdKQD6IoP2MYa2ki · 2248:282, conferido contra a v4.2). O arquivo da skill continua fora do repo: só o resumo, sem
   IDs do Notion, nomes do time nem procedimentos internos. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "agentes", name: "Agentes e Skills", resource: true, lede: "IA que ajuda a escrever e construir no padrão da Caju.", order: 8, zeroheight: "https://castanha.caju.com.br/858426090/v/latest/p/44eff3" });
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
          { title: "Borô", text: "O assistente do Castanha no Slack e no Figma: Design System, Content Design, Motion, Ilustração e VOC.", href: BORO, cta: "Conversar no Slack", external: true, src: BORO_IMG },
          { title: "Patterns para IA", text: "As decisões de experiência da Caju em .md, para a IA ler em qualquer ferramenta.", href: DEMO, cta: "Abrir a demo", external: true, illustration: "interfaces/customizacao" },
          { title: "/castanhads-juntos", text: "A skill do Claude que confere, lembra e documenta o trabalho com componentes do Castanha DS.", href: "#/agentes/juntos", cta: "Ver a skill", illustration: "dispositivos/notebook-relatorios" }
        ] },

        { h2: "Borô" },
        { persona: { id: "boro", name: "Borô", nick: "Assistente do Castanha", src: BORO_IMG,
          quote: "Tire suas dúvidas consultando a documentação em tempo real.",
          data: [["Onde", "Slack, em conversa direta, e Figma, em Agentes"], ["Temas", "Design System, Content Design, Motion, Ilustração e Voice of Customer (VOC)"], ["No Figma", "Content Design"], ["No ar desde", "25 de agosto de 2026"]],
          story: "O Borô é o parceiro do time para criar e aplicar o Tom e Voz, entender a Visão Cliente e usar os recursos do Castanha Hub. As respostas vêm da documentação, sempre atualizada. Ele fala de forma amigável e clara, mesmo para quem tem pouca familiaridade com tecnologia, e explica o porquê de cada regra.",
          cols: [
            { title: "Utilize para", items: [
              "Confirmar como usar um componente: anatomia, estados e tokens aplicados.",
              "Revisar ou criar copy dentro das regras de Content Design: tom, limite de caracteres e neutralidade.",
              "Checar parâmetros de motion, como duração e easing de uma transição.",
              "Descobrir qual estilo de ilustração usar em cada contexto (ex.: tela de erro).",
              "Encontrar a página certa da documentação sem garimpar o zeroheight inteiro.",
              "Consultar os dados de VOC de colaboradores e de empresas: resultados dos trimestres, entregas, oportunidades e iniciativas em operação (no Slack)."
            ] },
            { title: "Não utilize para", items: [
              "Tomar decisões de produto ou de negócio.",
              "Tirar dúvidas sobre Storybook, Widgetbook ou código.",
              "Aprovar exceções ou destravar impasses estratégicos.",
              "Tratar dados sensíveis ou informações internas fora do Castanha.",
              "Avaliar a arquitetura de componentes."
            ] }
          ] } },

        { h3: "De onde vem o nome" },
        { p: "Borô vem de borogodó, aquele charme difícil de explicar que faz uma conversa ficar boa. É o jeito brasileiro e caloroso de se comunicar, e é assim que a Caju quer falar com as pessoas: de um jeito próximo, acolhedor e natural. O assistente leva esse jeito para o dia a dia do time, com base na documentação e com o mesmo cuidado que a gente quer ver em cada tela." },

        { h3: "Princípios" },
        { cards: [
          ["Verdade vem da fonte", "O Borô responde com base na documentação oficial do Castanha e também lembra das suas interações mais recentes. Se a doc não cobre o assunto, ele avisa."],
          ["A favor de quem usa", "Fala de um jeito amigável e claro, mesmo para quem tem pouca familiaridade com tecnologia."],
          ["Parceiro do time", "Explica o motivo documentado por trás de cada regra, então você aprende no processo."]
        ] },

        { h2: "Borô no Figma" },
        { p: "Revise o conteúdo das suas telas sem sair do arquivo. O Borô lê os textos dos frames selecionados, deixa uma anotação de Conteúdo em cada um com o antes → depois e, se você pedir, aplica os ajustes no próprio frame." },
        { steps: [
          { title: "Selecione os frames", text: "Clique no frame ou segure Shift para selecionar vários." },
          { title: "Abra Agentes", text: "Na barra lateral esquerda do Figma, clique em Agentes e comece um novo chat." },
          { title: "Digite /boro-content", text: "O frame selecionado entra no chat. Se quiser, anexe prints ou arquivos de referência e envie." },
          { title: "Confira a anotação", text: "O Borô deixa uma anotação de Conteúdo em cada frame, com o antes → depois." }
        ] },
        { video: { src: "https://www.youtube-nocookie.com/embed/sLeu6F9isaQ", title: "Borô no Figma: revisão de conteúdo com /boro-content",
          caption: "Demonstração do Borô no Figma, do Castanha Hub.", href: "https://youtu.be/sLeu6F9isaQ", cta: "Abrir no YouTube" } },
        { table: { head: ["Na prática", "O que ele faz", "Experimente pedir"], wrap: true, rows: [
          ["Anota no frame 📌", "Deixa uma anotação de Conteúdo ao lado de cada frame, separada por item (ex.: Título e Descritivo), com o antes → depois, a assinatura “Conteúdo revisado pelo Borô” e a data.", "`/boro-content` com os frames selecionados"],
          ["Usa suas referências 🖼️", "Considera prints e outros arquivos anexados no chat para revisar a copy com o cenário completo do fluxo.", "`/boro-content` + print da tela anterior do fluxo"],
          ["Ajusta o texto ✏️", "Aplica no próprio frame o novo texto da anotação, quando você pede.", "“Aplica as sugestões nos frames”"]
        ] } },
        { alert: { appearance: "informative", label: "Vale lembrar", text: "A decisão continua com você: revise a anotação antes de pedir o ajuste." } },

        { h2: "Borô no Slack" },
        { p: "Quando bater uma dúvida no meio do trabalho, procure por Borô no Slack e inicie uma conversa direta com o assistente." },
        { table: { head: ["Na prática", "O que ele faz", "Experimente perguntar"], wrap: true, rows: [
          ["Cita a fonte 🔎", "Responde de forma objetiva e traz a página consultada como link clicável.", "“Quais são os estados do Main Button?”"],
          ["Revisa copy ✍️", "Mostra a análise, explica o motivo documentado e entrega de duas a três opções neutras, dentro do limite de caracteres e no Tom e Voz da Caju.", "“Revisa esse título de tela: [cole seu texto]”"],
          ["Transcreve imagens 📷", "Lê o texto de um print e sugere ajustes textuais a partir dele. Cor, espaçamento e layout ficam fora da análise.", "“Revisa a copy dessa tela?” + print anexado"],
          ["Conhece o VOC 📊", "Traz dados de VOC de Q1 e Q2, de colaboradores e de empresas: resultados, entregas, oportunidades e iniciativas em operação.", "“Qual foi o tópico mais reclamado por colaboradores no VOC do Q2?”"],
          ["Pede contexto 📖", "Quando o cenário não está claro, pergunta o produto, o fluxo e o que a pessoa usuária precisa fazer antes de responder.", "“Me ajuda a escrever uma mensagem de erro”"]
        ] } },
        { h3: "Cruze Experiência e Visão Cliente" },
        { p: "Uma pergunta pode juntar as duas frentes. Por exemplo: “Qual foi o tópico mais reclamado por colaboradores no VOC do Q2? Considerando que essa pessoa já chega frustrada, como o Tom e Voz da Caju orienta a escrever a mensagem para essa situação? Me dá uma sugestão de texto.”" },
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
        { alert: { appearance: "informative", label: "Vale lembrar", text: "O Borô traz os insights da documentação, mas a análise de contexto e a decisão ficam com você." } },

        { h3: "Quando falar com o time" },
        { p: "O time entra quando o assunto pede decisão, exceção ou algo que ainda não virou doc: canais #castanha-suporte e #suporte-content, ou a agenda de suporte do Castanha, às terças, das 16h às 17h30. Quando o Borô esbarra num impasse desses, ele mesmo direciona para o canal certo." },
        { note: "Fonte: página Borô do zeroheight (Agentes e Skills), conferida em 09/10/2026, e anúncios do #castanha-novidades. As diretrizes que o Borô segue estão em Conteúdo: tom e voz, princípios de escrita e regras de texto." },

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
