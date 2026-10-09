/* Conteúdo — Princípios de escrita (Figma [CastanhaDS] Component use documentation · 📁 [NEW] Content → Como a Caju Fala,
   frame [Documentação] Princípios de escrita 6400:33150). O [OLD] Content é legado e fica de fora (PLANO-HUB).
   Textos literais do Figma; as telas de exemplo são refeitas com componentes do DS (as do Figma usam peças do app Employee). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-33150";
  CDS.register({ id: "conteudo", name: "Conteúdo", resource: true, lede: "Tom e voz, princípios de escrita e regras de texto: como a Caju fala nos produtos.", order: 2, figma: FIGMA });
  var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
  // Tela de exemplo: ilustração + título + texto + Fixed Bar (Pilled) com a ação principal
  function screen(ill, title, text, action, secondary){
    return { _tag: "div", class: "pg-cnt-phone", _children: [
      { _tag: "div", class: "pg-cnt-phone__body", _children: [
        { _tag: "img", class: "pg-cnt-phone__ill", src: ills[ill] || "", alt: "" }
      ].concat(title ? [{ _tag: "h4", class: "pg-cnt-phone__title", _text: title }] : []).concat([ // sem título: tela só com o texto (ex.: Don't da busca)
        { _tag: "p", class: "pg-cnt-phone__text", _text: text }
      ]) }
    ].concat(action ? [{ _tag: "cds-fixed-bar", kind: "pilled", "primary-label": action, "show-secondary-action": !!secondary, "secondary-label": secondary || null, "show-lead-icon": false }] : []) }; // sem ação: tela sem Fixed Bar
  }
  // Onboarding: Bottom Sheet (inline) com ilustração, título, texto e os botões padronizados empilhados, como no sheetActions.
  // No Hub os exemplos são modais do Portal; o Footer do Modal é horizontal e os rótulos longos não cabem no card (decisão do Gustavo, 09/10)
  function onboarding(ill, title, text, action, secondary){
    var kids = [{ _tag: "img", class: "pg-cnt-phone__ill", src: ills[ill] || "", alt: "" }];
    if (title) kids.push({ _tag: "h4", class: "pg-cnt-phone__title", _text: title });
    kids.push({ _tag: "p", class: "pg-cnt-phone__text", _text: text },
      { _tag: "cds-main-button", class: "pg-cnt-phone__cta", label: action, "show-lead-icon": false, "show-trailing-icon": false });
    if (secondary) kids.push({ _tag: "cds-main-button", class: "pg-cnt-phone__cta", appearance: "neutral", label: secondary, "show-lead-icon": false, "show-trailing-icon": false });
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "show-header": false, "show-footer": false, _children: kids }
    ] };
  }
  // Tela com Bottom Sheet (inline) sobre a lista de cartões
  function sheet(title, text){
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "text-title": title, "show-footer": false, "show-close-button": false, _children: [
        { _tag: "p", class: "pg-cnt-phone__text", _text: text },
        { _tag: "cds-main-button", kind: "ghost", label: "Novo cartão", "show-lead-icon": false, "show-trailing-icon": false }
      ] }
    ] };
  }
  // Bottom Sheet (inline) com título, texto e duas ações em Main Buttons sem ícone (o Footer do sheet não expõe o Lead Icon)
  function sheetActions(title, text, a, b){
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "show-header": false, "show-footer": false, _children: [
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", label: a, "show-lead-icon": false, "show-trailing-icon": false },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", appearance: "neutral", label: b, "show-lead-icon": false, "show-trailing-icon": false }
      ].filter(function(x){ return x._tag !== "cds-main-button" || x.label; }) } // b opcional: uma ação só
    ] };
  }
  // Notificação in-app de exemplo: Card do DS com título, texto e CTA em Link do DS
  function notif(title, text, cta){
    var kids = [{ _tag: "h4", class: "pg-cnt-phone__title", _text: title }, { _tag: "p", class: "pg-cnt-phone__text", _text: text }];
    if (cta) kids.push({ _tag: "cds-link", label: cta, href: "#", appearance: "accent" });
    return { _tag: "cds-card", "has-border": true, class: "pg-cnt-card", style: "width:100%", _children: kids };
  }
  CDS.docs["conteudo"] = {
    source: FIGMA, sourceLabel: "Abrir Princípios de escrita no Figma",
    tabs: [
      // Tom e voz (Castanha Hub · Conteúdo → Tom e Voz: Pilares 639b76, Premissas 48df76, Premissas na Prática 04dbac,
      // Comece pelas Pessoas 2238c1 · v1.1.5, set/2026). Texto do Hub com a numeração e os erros corrigidos (C168);
      // as telas "Atual × Com Tom e Voz" são capturas do app e ficam no Hub. Decisões de 05/10 (C167).
      { id: "tom-e-voz", title: "Tom e voz", blocks: [
        { h2: "Tom e voz" },
        { p: "Antes de partir para um guia prático de escrita, é fundamental entender de onde o tom de voz da Caju parte. As escolhas de linguagem não são aleatórias: elas refletem a forma como queremos que as pessoas se sintam ao usar o aplicativo." },
        { p: "Por isso, este guia parte de três pilares que orientam toda a experiência: Hospitalidade, Simplicidade e Brasilidade." },
        { h2: "Pilares" },
        { cards: [
          ["Hospitalidade", "Reduzir esforço, orientar, acolher, acompanhar e celebrar nos momentos importantes. A hospitalidade está em explicar antes de pedir uma ação, em reduzir incertezas e em acompanhar cada etapa da jornada, para que as pessoas se sintam acolhidas, e não apenas instruídas. Por trás de toda tela existe uma pessoa tentando resolver algo importante para ela."],
          ["Simplicidade", "Simplicidade não significa escrever menos. Significa escrever o suficiente para que as pessoas entendam, com clareza, o que está acontecendo e o que precisam fazer. Às vezes isso resulta num texto curto; outras vezes, numa explicação um pouco mais longa. Linguagem simples é a que faz o máximo pela compreensão de quem está do outro lado."],
          ["Brasilidade", "Uma linguagem natural, próxima e descomplicada, que respeita a forma como as pessoas realmente se comunicam. Sem gírias, regionalismos ou expressões caricatas: a brasilidade aparece na leveza das frases, nas palavras familiares e na capacidade de transformar assuntos complexos em conversas fáceis. O objetivo não é parecer informal, mas natural."]
        ] },
        { h2: "Premissas" },
        { p: "Os pilares só se tornam reais nas pequenas decisões de escrita do dia a dia. Estes são os direcionamentos que transformam hospitalidade, simplicidade e brasilidade em textos claros, acolhedores e consistentes. Em cada um, as perguntas ajudam a revisar um fluxo novo." },
        { steps: [
          { title: "Escrever como quem abre a porta para receber", text: [
              "Receber não é apenas dar boas-vindas: é fazer a pessoa sentir que chegou ao lugar certo. Toda interação tem um começo, seja um login, um onboarding ou um e-mail, e vale dedicar alguns segundos para dizer algo que soe como \"Que bom que você está aqui\". Sempre que fizer sentido, transforme esse primeiro contato num convite."],
            list: ["Existe um momento para dar boas-vindas?", "A pessoa entende onde está e o que vai acontecer a seguir?", "Existe uma oportunidade de tornar esse primeiro contato mais acolhedor?", "Estamos apresentando apenas uma funcionalidade ou recebendo a pessoa para uma conversa?"] },
          { title: "Fazer juntos é reduzir ansiedades", text: [
              "A linguagem pode funcionar como uma companhia ao longo da experiência. Escolha uma linguagem que convida, orienta e compartilha responsabilidades: verbos na primeira pessoa do plural, como vamos, estamos, precisamos e seguimos. Quando as pessoas sentem que alguém conduz a conversa ao lado delas, a ansiedade diminui e até os processos burocráticos ficam mais leves."],
            list: ["A linguagem faz companhia ou apenas dá instruções?", "A pessoa entende o que está acontecendo neste momento?", "Existe uma oportunidade de dividir a responsabilidade com \"vamos\", \"estamos\" ou \"a gente\"?", "Se algo der errado, mostramos que ainda existe um caminho e que vamos resolver juntos?"] },
          { title: "Aproximar pelo cuidado, não pela informalidade", text: [
              "Em vez de tentar soar como um amigo, com gírias, onomatopeias ou memes, escreva como alguém atento à experiência de quem está do outro lado. Faça perguntas, dê contexto, explique os próximos passos e confira se tudo está claro antes de seguir. Em vez de parecer descontraído, pareça presente.",
              "Expressões como \"Ei\", \"Ops!\", \"Hmm…\" ou \"Beleza?\" simulam uma conversa, mas nem sempre acolhem: depois de um erro, podem soar impacientes, irônicas ou infantilizadas. Por isso, evite em qualquer momento (ver Vocabulário)."],
            list: ["Existe uma oportunidade de perguntar, acolher ou orientar antes de simplesmente informar?", "A pessoa consegue seguir com mais confiança depois de ler este texto?", "A conversa parece escrita para alguém ou apenas sobre uma funcionalidade?"] },
          { title: "Pensar títulos com foco na conversa", text: [
              "Quem abre o aplicativo não está procurando funcionalidades: está tentando resolver um problema, economizar tempo ou concluir uma tarefa. Em vez de começar pelo que o produto faz, comece pelo que a novidade representa para a pessoa, com chamadas que façam sentido desde a primeira leitura.",
              "Em segurança, privacidade ou requisitos legais, a clareza vem primeiro: o título comunica o fato de forma direta e a conversa acontece no texto de apoio, que ainda pode acolher e indicar o próximo passo."],
            list: ["O título comunica um benefício ou apenas descreve uma ferramenta?", "Quem nunca ouviu falar da funcionalidade entenderia por que ela importa?", "O título desperta vontade de continuar lendo?", "Em títulos objetivos: o texto de apoio acolhe a pessoa antes de orientar?"] },
          { title: "Uma conversa que inclui todo mundo", text: [
              "Prefira verbos que expressam entendimento, descoberta ou acesso à informação, em vez de ações só visuais. \"Ver\" e \"visualizar\" pressupõem a visão; \"entender\", \"conhecer\" e \"consultar\" acolhem também quem usa leitor de tela ou outras tecnologias assistivas.",
              "Não é uma regra absoluta: quando a ação realmente é olhar um elemento da tela, como um boleto, um comprovante ou um cartão, o verbo visual continua valendo. Em botões de navegação, use o nome da área ou \"Acessar {área}\" (ver Vocabulário)."],
            table: { wrap: true, head: ["Em vez de", "Use"], rows: [["Ver como funciona", "Entender como funciona"], ["Ver saldo", "Consultar saldo"], ["Ver mais", "Nome da área ou Acessar {área}"]] },
            list: ["Existe um verbo que represente melhor a experiência da pessoa?", "A escolha de palavras amplia ou limita a compreensão?"] },
          { title: "Todo onboarding é uma conversa", text: [
              "Onboarding não é uma sequência de telas com informações que queremos passar, mas uma conversa com começo, meio e fim. Ao apresentar uma novidade, o objetivo é que a pessoa entenda por que ela existe, como pode ajudar e se sinta segura para começar a usar. No fim, ela não deve sentir que concluiu um tutorial, e sim que alguém lhe explicou a novidade de forma simples e cuidadosa.",
              "A conversa costuma seguir este caminho: Receber (a novidade chega de forma acolhedora) → Contextualizar (por que isso existe e o que muda) → Explicar (como funciona, de forma simples e no momento certo) → Encerrar (o próximo passo fica claro)."],
            list: ["Estou começando a conversa pelo que importa para a pessoa?", "Existe uma progressão natural entre uma tela e outra?", "Estou explicando só como funciona ou também por que é útil?", "O fluxo termina dando segurança para a pessoa seguir sozinha?"] },
          { title: "Primeiro o conceito, depois a regra", text: [
              "As pessoas entendem melhor uma regra quando primeiro entendem o contexto. Antes de explicar como algo funciona, responda à pergunta que provavelmente trouxe a pessoa até ali. Em vez de partir da lógica do sistema, parta da dúvida de quem está usando o aplicativo.",
              "Exemplo: quem procura \"Como funciona o saldo flexível\" quer saber, na verdade, qual é a diferença entre os saldos. Explicar cada um e dizer que os valores são definidos pela empresa resolve a dúvida sem criar outra (\"Por que não é tudo flexível?\")."],
            list: ["Estou escrevendo a partir da lógica do sistema ou de quem está aprendendo?", "O que a pessoa precisa entender antes de saber como isso funciona?"] },
          { title: "Conduzir a experiência de forma transparente", text: [
              "Toda interação cria uma expectativa. Sempre que houver um processo, mostre onde a pessoa está e o que vem pela frente: quanto tempo leva, em quantas etapas acontece, quais informações ou documentos serão necessários e o que vem depois. Isso ajuda a decidir se é o melhor momento para seguir, reduz a ansiedade e evita frustrações."],
            list: ["A pessoa sabe quanto tempo ou quantas etapas a tarefa pode exigir?", "Estou criando uma expectativa realista?", "Alguma informação importante pode evitar uma frustração mais adiante?", "O texto ajuda a pessoa a decidir se quer começar agora?"] },
          { title: "Saber acolher, saber celebrar", text: [
              "Nossa voz tem a mesma identidade em qualquer situação. Quando algo dá errado, evite mensagens alarmistas ou que façam a pessoa se sentir responsável pelo problema: explique o que aconteceu, mostre um caminho possível e reforce que ela não está sozinha. Quando tudo dá certo, celebre, especialmente depois de processos longos ou burocráticos."],
            list: ["O texto ajuda a pessoa a entender o que aconteceu?", "Existe um próximo passo claro?", "A linguagem transmite segurança, sem gerar preocupação desnecessária?", "Há uma oportunidade de reconhecer o esforço da pessoa?", "O encerramento faz a experiência parecer concluída?"] }
        ] },
        { h2: "Comece pelas pessoas" },
        { p: "Na comunicação com colaboradores (B2C), as premissas têm algo em comum: todas mudam o ponto de partida da escrita. Em vez de começar pelo produto, começamos pelas pessoas. É essa mudança de perspectiva que transforma a experiência numa conversa." },
        { cards: [
          ["Queremos que as pessoas sintam que…", "A experiência com a Caju é simples e fácil de usar. Somos parceiros e estamos juntos. Elas estão acompanhadas nas tarefas do app. As informações de que precisam estão aqui."],
          ["Por isso repetimos expressões como…", "Agora que você já sabe… · Vamos juntos. · Tudo certo até aqui? · Falta só mais um passo. · Que bom ter você por aqui. · Agora é com a gente. · É simples. · Você encontra tudo por aqui."]
        ] },
        { shortcuts: [{ title: "Conheça as personas", text: "Os colaboradores para quem escrevemos: faixas de idade, rotina, objetivos, dores e necessidades.", href: "#/personas/colaborador", cta: "Ver personas de colaborador", illustration: "personagens/felipe-gabriel" }] },
        { note: "Fonte: Castanha Hub · Conteúdo → Tom e Voz (Pilares, Premissas, Premissas na Prática e Comece pelas Pessoas, v1.1.5). As telas \"Atual × Com Tom e Voz\" são capturas do app e ficam no Hub. Onde uma premissa diverge de uma regra antiga, vale a premissa (decisões de 05/10)." }
      ] },
      { id: "principios-de-escrita", title: "Princípios de escrita", blocks: [
        { h2: "Princípios de escrita" },
        { p: "Os princípios te ajudam a pensar no texto de cada ponto de contato com a pessoa usuária. O que é importante? Como destacar? O que não precisa ser informado?" },

        { h2: "Mantenha o foco" },
        { p: "Entregue só o que é essencial. Menos informação, menos esforço para o usuário." },
        { ul: [
          "Destaque o que importa para aquele contexto: não tente dizer tudo de uma vez.",
          "Evite repetições: não repita informações que já aparecem na mesma tela.",
          "Use verbos diretos: alinhados a ação e objetivo do fluxo ou da tela.",
          "Seja objetivo: se a pessoa usuária precisa agir, deixe isso claro de imediato."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("documentos/rg-cnh-frente", "Confirme seus dados", "Preencha seus dados iguais aos seus documentos e finalize o cadastro! Vamos lá?", "Começar"),
            text: "Antecipe as informações relevantes (vai precisar dos documentos). O título informa o fluxo que a pessoa vai começar." },
          { kind: "dont", attrs: screen("documentos/rg-cnh-frente", "Confirmar dados pessoais", "Para finalizar seu cadastro, você precisa preencher seus dados. Após essa etapa, você precisa pedir o cartão físico.", "Começar"),
            text: "Não use infinitivo em títulos e não anuncie a próxima etapa solta, sem contexto. Quando houver um processo, diga quanto falta e o que vem depois (Tom e voz, premissa 8)." }
        ] },

        { h2: "Encoraje e explique" },
        { p: "Quando a pessoa usuária precisar tomar uma ação, explique o motivo e o que acontece depois." },
        { ul: [
          "Dê contexto: por que essa ação é necessária e qual o benefício. Temos um playbook exclusivo para este tema.",
          "Mostre o resultado: o que mudou (ou não mudou) após a ação.",
          "Prepare para o próximo passo: se houver uma nova etapa, dê uma prévia.",
          "Erros têm solução: se algo deu errado, explique o motivo e sempre ofereça um caminho para resolver. Nunca deixe a pessoa travada ou sem saída."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("seguranca/cadeado", "Protegemos seu acesso", "Sua segurança vem em primeiro lugar, autorize esse dispositivo para que apenas você acesse seu app!", "Fazer reconhecimento facial"),
            text: "Explicamos o valor da ação e porque é importante que ele faça." },
          { kind: "dont", attrs: screen("seguranca/cadeado", "Acesso bloqueado", "Você não ainda não fez seu reconhecimento facial e por isso, bloqueamos seu acesso.", "Fazer reconhecimento facial"),
            text: "Culpamos a pessoa usuária por não ter realizado uma ação burocrática do nosso app." }
        ] },

        { h2: "Escreva de forma simples" },
        { p: "Escreva para qualquer pessoa, não só para quem conhece o produto." },
        { ul: [
          "Tom humano: amigável, acessível, sem juridiquês ou termos técnicos.",
          "Palavras do dia a dia: evite termos complexos ou pouco comuns.",
          "Sem ambiguidade: a frase ou termo deve ter uma única interpretação possível.",
          "Facilite a leitura: prefira listas e frases curtas."
        ] },
        { dodont: [
          { kind: "do", attrs: sheet("Seu cartão físico vai expirar", "Para continuar fazendo pagamentos, peça um novo cartão físico sem custos adicionais."),
            text: "Use termos simples e estruturas gramaticais conversacionais." },
          { kind: "dont", attrs: sheet("Cartão físico próximo de expirar", "É necessário solicitar um novo cartão físico, visto que o seu vai expirar."),
            text: "Cuidado com termos complexos que não soam naturais ao discurso falado." }
        ] },
        { alert: { appearance: "informative", label: "Está na dúvida se seu texto é simples?", text: "Leia em voz alta e identifique se as palavras escolhidas soam naturais a fala." } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Como a Caju Fala → [Documentação] Princípios de escrita. As telas do Figma usam peças do app Employee (Header Navigation Employee, Bottom Sheets / CardAboutToExpire); aqui foram refeitas com Fixed Bar, Bottom Sheet e Main Button do DS, com os mesmos textos. A seção Acessibilidade do frame ainda é rascunho (\"Tópico 1\") e fica de fora." }
      ] }
      ,
      { id: "escrevendo", title: "Escrevendo para produto", blocks: [
        { h2: "Escreva no presente" },
        { p: "Use o tempo presente. Ele torna a frase mais simples, direta e fácil de escanear. Evite o futuro — ele soa burocrático e aumenta a complexidade da leitura. Exemplos:" },
        { ul: ["`Seu cartão chega em até 10 dias úteis`", "`Os colaboradores não selecionados ficam no grupo atual`", "`Manutenção de Pix agendada para 15/05. Antecipe suas transferências para não atrasar seus pagamentos.`"] },
        { h2: "Use a voz verbal certa para cada momento" },
        { p: "A voz ativa coloca quem age em primeiro lugar. É mais leve, conversacional e ocupa menos espaço. Use em textos explicativos e mais longos." },
        { p: "A voz passiva distancia o sujeito da ação. Use quando a ação é mais importante do que quem a fez — especialmente em telas de sucesso ou em situações negativas da Caju. Exemplos:" },
        { table: { wrap: true, head: ["Contexto", "Exemplo"], rows: [
          ["Voz ativa (texto explicativo)", "`Abrimos a contestação de compra`"], ["Voz passiva (tela de sucesso)", "`A transferência foi enviada`"], ["Voz passiva (ação negativa da Caju)", "`O acesso foi suspenso`"]
        ] } },
        { h2: "Saiba quando usar infinitivo e imperativo" },
        { ul: [
          "Use infinitivo em botões e áreas clicáveis.",
          "Exceções de botões que não usam infinitivo: \"Preciso de ajuda\", \"Não encontrei o código\", \"Quero saber mais\", \"Saiba mais\" e \"Dúvidas frequentes\".",
          "Use imperativo em descrições e placeholders para dar direcionamentos. Nunca em botões, exceto em peças de marketing. Exemplo: `Informe seu CPF` (placeholder)"
        ] },
        { h2: "Fale com \"você\"" },
        { p: "Use a terceira pessoa do singular para se dirigir à pessoa usuária. Use \"eu\" apenas quando ela precisar dar consentimento ou em botões específicos que foram padronizados." },
        { table: { wrap: true, head: ["Contexto", "Exemplo"], rows: [["Padrão", "`Seu saldo foi atualizado`"], ["Consentimento", "`Eu li e aceito os termos`"]] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Escrevendo para produto." }
      ] }
      ,
      // Estruturando conteúdo (Castanha Hub · Playbooks → Estruturando Conteúdo, 7630007). Texto do Hub com os erros
      // corrigidos; o exemplo interno do Hub foi trocado por um exemplo genérico (repositório público).
      { id: "estruturando", title: "Estruturando conteúdo", blocks: [
        { h2: "Content-first" },
        { p: "A abordagem content-first pensa o conteúdo antes do layout. Ela garante clareza e foco no que realmente importa para a pessoa usuária e ajuda a definir hierarquia, linguagem e estrutura antes de desenhar as telas." },
        { p: "Este playbook passa por três pilares da estruturação de conteúdo em produtos digitais:" },
        { ol: [
          "Estratégia de conteúdo: como definir qual conteúdo deve aparecer no fluxo e como dividir as informações dentro dele.",
          "Organização de tela: com o conteúdo mapeado e classificado, como estruturar as informações na tela. Quais componentes usar para dar destaque? Qual informação aparece primeiro?",
          "Linguagem: o detalhe do microcopy, ou seja, como estruturar uma frase para que a informação seja lida e entendida com facilidade (veja Princípios de escrita e Escrevendo para produto)."
        ] },

        { h2: "Estratégia de conteúdo" },
        { p: "Como definir qual conteúdo entra no fluxo que estamos construindo. São cinco etapas:" },
        { steps: [
          { title: "Mapeamento inicial (briefing)", text: [
              "Entenda o conteúdo do fluxo. É uma etapa que já existe no processo de produto: faça um briefing com a pessoa de produto (PM) e colete o máximo de informações que ajudem a entender quais conteúdos podem existir no fluxo.",
              "O mapeamento ajuda a construir a narrativa do fluxo e deixa a proposta de valor mais clara. Os roteiros de perguntas estão logo abaixo."] },
          { title: "Levantamento de dúvidas", text: [
              "Coloque-se no lugar da pessoa usuária e pense em todas as dúvidas e pontos de atrito que podem surgir ao percorrer a lista de tarefas (caso ainda não exista o fluxograma completo)."],
            list: [
              "Chame outros times para passar pelo fluxo e deixar as próprias dúvidas: cada perspectiva traz perguntas que você talvez não pensasse sozinho.",
              "Marque desde já as dúvidas que exigem uma explicação maior e podem pedir uma saída de ajuda no fluxo."] },
          { title: "Classificação de conteúdo", text: [
              "Classifique as dúvidas levantadas por relevância para o fluxo e documente a resposta de cada uma."],
            list: [
              "A documentação serve de base para outros times desdobrarem em outros materiais.",
              "Deixe muito claro quais informações são sensíveis e não devem ser repassadas para a pessoa usuária."],
            table: { wrap: true, head: ["Dúvida", "Resposta", "Prioridade"], rows: [["A dúvida, nas palavras da pessoa", "A resposta completa, com regras e exceções", "Alta, média ou baixa"]] } },
          { title: "Card sorting", text: [
              "Distribua as dúvidas de prioridade alta no fluxograma. Assim você já sabe qual será o conteúdo de cada tela antes de desenhá-la."],
            list: [
              "Para esta etapa, é preciso um fluxograma bem elaborado, não apenas a lista de tarefas.",
              "Dúvidas de prioridade média ou baixa podem virar artigos de ajuda (FAQ) ou comunicações por e-mail."] },
          { title: "Validação com stakeholders", text: [
              "Além da sua squad, chame outras áreas que ajudam a validar se todas as informações essenciais para a pessoa usuária e para a empresa foram mapeadas (jurídico, compliance etc.).",
              "É aqui que se evitam mudanças inesperadas vindas de times regulatórios quando a tela já estiver desenhada e estruturada."] }
        ] },

        { h3: "Roteiro de briefing: fluxo novo" },
        { ul: [
          "Qual é a proposta de valor?",
          "Qual é o objetivo para a pessoa usuária?",
          "Qual é o objetivo para a empresa?",
          "Quais são as premissas de sucesso?",
          "Quais são as regras de negócio?",
          "Existem limitações jurídicas ou regulatórias?",
          "O que já existe de pesquisa sobre o assunto?"
        ] },
        { h3: "Roteiro de briefing: melhoria em fluxo existente" },
        { ul: [
          "Qual é o contexto do fluxo?",
          "Ele está passando por uma mudança ou alteração? Por quê?",
          "Qual problema da pessoa usuária ou da empresa essa melhoria resolve?",
          "Quais métricas e evidências já existem sobre o fluxo?",
          "O que já existe de pesquisa sobre o assunto?",
          "Qual é o posicionamento de marketing sobre o tema?",
          "Qual é a lista de tarefas da pessoa usuária nesse fluxo?",
          "Quais são os pontos de contato fora da experiência?"
        ] },

        { h3: "Exemplo ilustrativo: Contestar uma compra" },
        { p: "Um exemplo genérico, só para mostrar o caminho das etapas. Imagine uma tela do app em que a pessoa contesta uma compra que não reconhece." },
        { table: { wrap: true, head: ["Dúvida da pessoa", "Prioridade", "Onde entra"], rows: [
          ["Essa compra é mesmo minha?", "Alta", "Topo da tela: dados da compra (estabelecimento, data e valor)"],
          ["O que acontece com o meu dinheiro?", "Alta", "Logo abaixo, em linguagem simples, antes da ação principal"],
          ["Quanto tempo leva para eu ter uma resposta?", "Alta", "Perto do botão, para a pessoa decidir se segue agora"],
          ["Quais motivos posso escolher?", "Média", "Etapa seguinte do fluxo, numa lista de opções"],
          ["Como funciona a análise por dentro?", "Baixa", "Artigo de ajuda, com link na tela"]
        ] } },
        { p: "Com isso, a tela ganha uma ordem (compra → o que acontece → prazo → ação) e nomes de seção que respondem às dúvidas, como `Sobre a compra`, `O que acontece agora` e `Prazo de resposta`." },

        { h2: "Organização de tela" },
        { p: "Como priorizar o conteúdo dentro da tela? Com o conteúdo mapeado na estratégia, aplicamos hierarquia visual, priorização e taxonomia para lidar com o comportamento de escaneamento que muitas pessoas usuárias têm." },
        { alert: { appearance: "informative", text: "Hierarquia, priorização e taxonomia criam a narrativa da tela." } },

        { h3: "Hierarquia visual" },
        { p: "A hierarquia visual controla a entrega de informações e é o principal recurso para o escaneamento da tela. Uma boa hierarquia guia o olhar para os elementos mais importantes." },
        { cards: [
          ["Cor e contraste", "Não é só a cor do elemento que cria hierarquia, mas o contraste e a saturação entre todos os elementos do contexto. A formatação da fonte (negrito, sublinhado, itálico) também é contraste. Cores se destacam naturalmente: use para itens importantes. Muitas cores parecidas ou com a mesma saturação aumentam a carga cognitiva. Não dependa só de cor, porque há pessoas que não enxergam todas as cores."],
          ["Escala e tamanho", "Elementos maiores chamam mais atenção. Enfatize o mais importante com fontes maiores e use fontes menores para o que é secundário."],
          ["Ilustração", "As ilustrações têm tamanhos diferentes conforme o contexto, definidos principalmente pela quantidade de informação na interface (textos e componentes)."],
          ["Motion", "O motion direciona a atenção e organiza as informações na tela: ajuda a pessoa a entender o que é mais importante, para onde olhar primeiro e qual caminho seguir, sem precisar pensar demais."]
        ] },
        { p: "Para aplicar cor de forma semântica, veja as documentações de Shaped Icon, Icon Button, Alert, Toast e Tag. Para formatação de texto, veja Formatação de dados." },
        { table: { wrap: true, head: ["Estilo do tema", "Tamanhos (px)"], rows: [
          ["Heading", "24 (Small) · 32 · 40 · 48 · 64 · 80"], ["Title", "20 · 24 · 32"], ["Subtitle", "18 · 20 · 24"], ["Body", "16"], ["Label", "16"], ["Caption", "14"], ["Disclaimer", "12"]
        ] } },
        { p: "Os tamanhos vêm dos estilos de texto do tema (veja Tema Caju → Tipografia). Para texto de leitura, o Hub recomenda no mínimo 14px; o Disclaimer, de 12px, fica para textos curtos de apoio." },

        { h3: "Priorização" },
        { p: "O que vem primeiro é mais importante." },
        { ul: [
          "A ação esperada e a localização da pessoa no fluxo costumam ser as prioridades de uma tela.",
          "A prioridade pode partir da pessoa usuária ou de um objetivo de negócio. Como saber qual deve vencer? Testando."
        ] },

        { h3: "Taxonomia" },
        { p: "Agrupar, classificar e rotular itens de acordo com as semelhanças entre eles." },
        { ul: [
          "Elementos da mesma taxonomia agrupados ajudam a identificar a estrutura da página e a direcionar a atenção.",
          "Alguns agrupamentos são ignorados de propósito, como a coluna direita de sites usada para anúncios (banner blindness).",
          "O espaço negativo guia o olhar, garante que os elementos de destaque sejam vistos e melhora o escaneamento.",
          "Nos termos, identifique o vocabulário para criar consistência (veja Vocabulário e Nomenclatura)."
        ] },
        { alert: { appearance: "informative", label: "Teste de blur (squint test)", text: "Aplique um desfoque na tela (ou aperte os olhos) e veja qual seção se destaca mais. Se não for a mais importante, revise a hierarquia." } },

        { h2: "Checklist de organização de tela" },
        { p: "Como o conteúdo da tela já está definido (as dúvidas mapeadas na estratégia), falta só priorizar no nível da tela:" },
        { ul: [
          "Pense no contexto da tela: de onde a pessoa veio e para onde vai? Mostre em que área ou etapa ela está.",
          "Qual é o objetivo final da tela? A ação esperada deve ser o conteúdo mais importante.",
          "Que destaque cada conteúdo mapeado na estratégia deve ter? Classifique do menos para o mais importante.",
          "Os elementos da mesma taxonomia estão agrupados?",
          "Algum termo vai se repetir em toda a jornada?"
        ] },
        { p: "Fluxo de organização de tela:" },
        { ol: [
          "Escolha uma etapa do fluxograma criado na estratégia de conteúdo.",
          "Responda ao checklist e classifique as dúvidas da mais para a menos relevante.",
          "Aplique a hierarquia visual seguindo o Castanha DS."
        ] },

        { h2: "Content-first no Double Diamond" },
        { p: "A abordagem content-first também passa pelo seu próprio diamante:" },
        { table: { wrap: true, head: ["Fase", "Etapa de conteúdo", "Foco"], rows: [
          ["Descobrir", "Estratégia de conteúdo", "Entender e mapear onde cada pedaço de conteúdo aparece no fluxo."],
          ["Definir", "Organização de tela", "Estruturar o conteúdo nas telas: hierarquia, componentes e design system."],
          ["Desenvolver", "Linguagem", "Aplicar e testar a linguagem: tom, clareza e compreensão."],
          ["Entregar", "Ajustes de linguagem e organização", "Refinar e alinhar linguagem e estrutura antes da entrega."]
        ] } },
        { note: "Fonte: Castanha Hub · Playbooks → Estruturando Conteúdo. O exemplo do Hub usa um caso interno; aqui ele foi trocado por um exemplo genérico." }
      ] }
      ,
      { id: "vocabulario", title: "Vocabulário e Nomenclatura", blocks: [
        { h2: "Glossário Caju" },
        { p: "Definições dos principais termos usados nos produtos da Caju — tanto no texto da interface quanto em comunicações com pessoas usuárias." },
        { p: "Não encontrou um termo ou quer sugerir uma correção? Fale com o time de Content no canal #content-suporte." },
        { glossary: { label: "Buscar no glossário", placeholder: "Termo ou definição (ex.: cartão, acesso, pix)", letters: {
          A: [
            ["Acesso / Acessar", "Termo usado para a etapa de entrada nas plataformas da Caju.", "\"login\", é um estrangeirismo e termo interno."],
            ["Acesso por reconhecimento facial", "Acesso no aplicativo através do reconhecimento facial, digital ou pela senha do celular.", "\"acesso por biometria\" ou \"acesso por autenticação\"."],
            ["Adiantamentos", "Saldo depositado em Despesas para gastos corporativos. O depósito é feito antes do gasto, por isso se chama adiantamento."],
            ["Ajuste de crédito", "Ajuste em uma cobrança no cartão feito pelo estabelecimento. Pode ser positivo (ex: estorno de um item não disponível) ou negativo."],
            ["Alterar empresa", "Alteração do perfil da empresa no app para colaboradores. A pessoa pode usar o mesmo cartão físico para todas as empresas cadastradas.", "\"trocar empresa\" — esse termo está vinculado à troca de carteiras."],
            ["App da Caju para colaboradores", "Nome completo da plataforma mobile da Caju. Pode ser abreviado para \"app para colaboradores\" ou \"app\" quando o espaço for limitado.", "\"employee app\" ou \"mobile\"."],
            ["Aproximação", "Pagamento com o cartão físico sem inserir o cartão na maquininha. Todos os cartões vêm com aproximação habilitada por padrão."],
            ["Autenticação em 2 etapas", "Segunda camada de proteção no app, confirmada por e-mail ou celular. É diferente do reconhecimento facial.", "\"verificação por 2 fatores\"."],
            ["Autorizar dispositivo", "Procedimento de segurança que permite o acesso ao app apenas em um dispositivo por vez.", "\"validar celular\"."],
            ["Autorizar empresa", "Quando a pessoa já teve cadastro na Caju em outra empresa, ela não precisa se cadastrar novamente — apenas autoriza a nova empresa a acessar seus dados e fazer depósitos."],
            ["Auxílio Alimentação", "Categoria de benefícios para compras em restaurantes, mercados, açougues, padarias, hortifrutis, lanchonetes e apps de delivery."]
          ],
          B: [
            ["Bloqueio / Desbloqueio temporário", "Ação temporária de bloqueio ou desbloqueio dos cartões Caju (físico ou virtual). Pode ser feita pela Caju ou pela própria pessoa."]
          ],
          C: [
            ["Cadastro", "Etapa de cadastro no app feita pela pessoa colaboradora.", "\"ativar conta\"."],
            ["Cartão físico / Cartão Caju / Cartão do Colaborador", "Nome do cartão físico de Multibenefícios e Despesas para colaboradores. Use “Cartão do Colaborador” apenas no contexto de Sponsor app. Não deve aparecer em employee.", "\"plástico\" ou \"Cajuzinho\" — reservados para comunicações de marketing."],
            ["Cartão virtual", "Sempre especifique se o cartão virtual é de Despesas ou de Benefícios."],
            ["Carteiras", "\"Bolsões\" de saldo. Hoje temos duas: Benefícios e Despesas. Para usar o saldo de uma carteira, ela precisa estar selecionada no app."],
            ["Carteiras digitais / wallets", "Apps como Samsung Wallet, Google Pay e Apple Pay, onde é possível adicionar o cartão virtual da Caju para pagamentos pelo celular.", "\"Apple e Google Pay\" (essas marcas vão sempre pelo nome completo) ou \"carteiras\" sozinho — pode confundir com as carteiras de Benefícios e Despesas."],
            ["Categorias", "Definem em que tipo de estabelecimento o saldo pode ser usado. Podem ter saldo fixo ou flexível, conforme definido pela empresa."],
            ["Código de autenticação", "Código numérico de 6 dígitos enviado para o e-mail ou celular cadastrado para validar a tentativa de acesso.", "\"código de verificação\"."],
            ["Código de desbloqueio", "Código numérico de 16 dígitos no verso do cartão físico, usado uma única vez para desbloquear o cartão.", "\"Código de ativação\" — \"ativar cartão\" saiu de uso."],
            ["Conta Caju", "Área para transferências via Pix, saques e pagamento de boletos. Reúne valores de Premiações, reembolsos de Despesas e depósitos de diferentes empresas em um único lugar. A tarifa é de 1,99% sobre o valor depositado pela empresa — pacote que inclui Pix, boleto e saque, independente do porte da empresa.", "\"Saldo Caju\" — nome descontinuado."],
            ["Contestação", "Quando a pessoa não reconhece uma transação no cartão ou no Pix, ela pode abrir uma contestação para receber o valor de volta, caso a fraude seja confirmada pela Caju.", "\"cancelamento\" — cancelamento é a reversão voluntária de uma ação que a pessoa reconhece. Contestação é o termo para disputa e cobrança não reconhecida."],
            ["Contratar", "Termo usado para a adesão de um dos produtos da Caju."],
            ["Crédito de confiança", "Valores recebidos de volta de pagamentos feitos com o cartão, originados de contestações. Aparece como positivo no extrato como Depósito. Se confirmado que não houve fraude, é feito o Resgate do crédito de confiança."],
            ["Créditos Caju", "Recarga feita dentro do Portal para que a empresa use o valor em créditos para pagar pedidos. A confirmação do pagamento ocorre em algumas horas."],
            ["Cultura", "Categoria de benefícios para compras em livrarias, ingressos de cinema, teatros e shows e assinaturas de streaming (Netflix, Spotify, Amazon Prime, etc)."]
          ],
          D: [
            ["Devolução", "Valores reembolsados por estabelecimentos via Pix ou boleto. Também usado para valores devolvidos via Pix originados de contestações."],
            ["Desbloquear cartão", "Processo de desbloqueio do novo cartão físico da Caju. Etapa obrigatória para que o cartão possa ser usado.", "\"Ativar cartão\". Esse termo deixou de ser usado."]
          ],
          E: [
            ["Educação", "Categoria de benefícios para cursos online, idiomas e ensino técnico e superior."],
            ["Envio de saldo", "Envio de saldo flexível entre categorias na carteira de Benefícios. Substituiu \"Transferir saldo entre categorias\" com o lançamento do Pix — o termo \"transferir\" ficou reservado para transações Pix."],
            ["Estorno", "Valores reembolsados por estabelecimentos em compras feitas com o cartão físico ou virtual. O valor devolvido aparece riscado no extrato."]
          ],
          F: [
            ["Feirinha", "Área do app com descontos exclusivos para colaboradores."],
            ["Forma de pagamento", "Método utilizado para realizar uma transação financeira.", "\"método de pagamento\" ou \"meio de pagamento\"."]
          ],
          H: [
            ["Home Office", "Categoria de benefícios para compras em papelarias, lojas de móveis e informática e pagamento de contas de consumo (luz, internet, telefone, etc)."]
          ],
          M: [
            ["Mobilidade", "Categoria de benefícios para recarga de cartão de transporte público, apps de transporte e abastecimento em postos de gasolina nacionais."]
          ],
          P: [
            ["Pix", "Sistema de pagamento instantâneo para transferências e pagamentos a qualquer hora e dia da semana. Na Caju, disponível apenas para pessoas com Saldo Caju.", "\"pix\" com p minúsculo — regra do BACEN."],
            ["Portal da Caju para colaboradores", "Nome completo da plataforma web da Caju para colaboradores. Pode ser abreviado para \"Portal para colaboradores\". Sempre com P maiúsculo."],
            ["Portal da Caju para empresas", "Nome completo da plataforma web da Caju para empresas. Pode ser abreviado para \"Portal para empresas\" ou \"Portal\". Sempre com P maiúsculo.", "\"sponsor app\" ou \"Portal Caju\"."],
            ["Pré-cadastro", "Processo de cadastro dos dados do colaborador dentro do Portal para empresas pelo RH. A pessoa colaboradora ainda precisa realizar o cadastro no app depois."],
            ["Premiações", "Saldo depositado na Conta Caju para reconhecimento de colaboradores. Pode ser usado livremente."]
          ],
          R: [
            ["Rastrear", "Termo usado para indicar quando a pessoa pode localizar o cartão físico na rota de entrega."],
            ["Reembolso", "Valores que a pessoa colaboradora recebeu de volta da empresa ao gastar com despesas corporativas. O valor cai na Conta Caju ou é transferido para o banco de preferência da empresa."],
            ["Recuperar senha", "Ação de redefinição de senha.", "\"redefinir senha\" ou \"Não sei a senha\"."],
            ["Resgate de saldo", "Ação no Portal para empresas que permite retirar o saldo depositado de uma pessoa colaboradora. Acontece em casos de contestação negada, expiração de adiantamento ou colaborador desligado."]
          ],
          S: [
            ["Saldo Livre", "Categoria que permite compras em qualquer loja, pagamento de boletos e saque. Volta como opção para depósito, simplificando o fluxo para empresas que não precisam de Pix. A empresa deposita o saldo e a pessoa colaboradora usa no cartão dentro de MCCs mais amplos. O Saldo Livre está disponível como opção, mas não deve ser incentivado ativamente nas comunicações."],
            ["Saldo Multi", "Categoria que reúne todas as categorias de benefícios em uma só. A empresa deposita saldo sem precisar distribuir entre categorias específicas. O Saldo Multi continua disponível, mas não deve ser incentivado ativamente nas comunicações."],
            ["Saúde", "Categoria de benefícios para compras em farmácias, exames médicos e apps de bem-estar (Zenklub, Headspace, Calm)."],
            ["Selfie", "Não use o termo sozinho. Sempre peça uma foto do rosto (selfie), com o termo em inglês entre parênteses."],
            ["Senha de acesso", "Senha usada para acessar o app do colaborador ou o Portal para empresas."],
            ["Senha do cartão", "Senha de 4 dígitos numéricos para transações com o cartão físico."],
            ["Senha temporária", "Senha numérica enviada por e-mail ou SMS para o primeiro acesso no app."]
          ],
          T: [
            ["Tarifa", "Custo cobrado por um serviço ou operação financeira.", "\"taxa\" — confira as regras completas em Porcentagens e tarifas."],
            ["Termo de autorização para abertura de conta", "Documento enviado para menores de idade, onde o responsável legal assina e autoriza o cadastro na Caju."],
            ["Transações", "Termo padrão para se referir a movimentações financeiras feitas com o cartão."]
          ],
          V: [
            ["Vale-transporte", "Benefício exclusivo para transporte público."],
            ["Voucher", "Modalidade de transação no cartão de benefícios, conforme o novo arranjo de cartões."]
          ]
        } } },

        { h2: "Naming de produto e funcionalidades" },
        { p: "Naming é o processo de dar nome às coisas. Mais importante que o nome em si são o significado, as associações e os sentimentos que ele desperta. Um bom nome não é escolhido — ele é construído a partir de um processo." },
        { h3: "Tipos de nome" },
        { table: { wrap: true, head: ["Tipo", "Definição", "Exemplos"], rows: [
          ["Descritivo", "Descreve o que o produto faz. Didático e de interpretação rápida. Indicado para públicos técnicos e relacionamentos B2B.", "Google Ads, Telefonica"],
          ["Associativo", "Não descreve literalmente, mas sugere por associação.", "iFood, Waze, Spotify"],
          ["Antropônimo", "Nome de pessoa — geralmente o criador da marca. Depende de uma personalidade forte e reconhecida.", "Lacoste, Walt Disney"],
          ["Topônimo", "Nome de lugar já existente — país, cidade, bairro, rio.", "Arizona, Arezzo, Kopenhagen"],
          ["Acrônimo", "Sigla formada pelas iniciais de outras palavras.", "IBM, CNN, 3M"],
          ["Transgressor", "Não se encaixa em nenhuma categoria.", "Apple"]
        ] } },
        { h3: "O processo de naming" },
        { steps: [
          { title: "Nomeie o projeto", text: "Antes de nomear o produto, dê um nome temporário ao projeto — isso evita que o nome do projeto vire o nome do produto por falta de alternativa. Use termos internos ou criativos: \"Projeto Engajamento\", \"Projeto HCM\"." },
          { title: "Defina o tipo de nome", text: "Responda:", list: [
            "Qual tipo de nome é mais adequado para essa funcionalidade ou produto?",
            "Cite 2 exemplos de nomes de produto que podem servir de referência.",
            "Como os concorrentes nomeiam produtos similares? Isso é bom ou ruim para a Caju?"
          ] },
          { title: "Conecte com a essência da marca", text: "O nome precisa conversar com os atributos da Caju: facilidade, versatilidade e brasilidade. Quando não souber por onde começar, volte para esses três pilares." },
          { title: "Defina as associações pretendidas", text: [
            "Que mensagens e sensações você quer que o nome transmita? Coloque o nome do projeto no centro de um mindmap e mapeie as associações que quer criar — e depois justifique por que a pessoa usuária acreditaria nessas associações a partir do que o produto faz.",
            "Esse exercício também serve para validar o nome escolhido: se o nome não sustenta as associações que você listou, ele provavelmente não é o certo."
          ] },
          { title: "Brainstorming", text: "Envolva pessoas de fora do contexto do time — elas estarão livres de vícios que o time pode ter desenvolvido em relação ao tema. Sugestão de dinâmica:", list: [
            "20 min — contextualize os participantes: o que o produto resolve, quem é o público, como conversa com a estratégia da Caju.",
            "30 min — geração livre de nomes em um quadro no Miro ou FigJam.",
            "30 min — cada participante explica seu racional."
          ], after: "Importante: Não use estrangeirismos — confira as regras em Termos para evitar." },
          { title: "Categorize os nomes", text: [
            "Depois da dinâmica, agrupe os nomes por tipo e por atributo. Ainda não é hora de eliminar — registre tudo.",
            "Monte uma tabela cruzando tipo de nome (horizontal) com atributos e associações (vertical). Isso vai facilitar a seleção na próxima etapa."
          ] },
          { title: "Filtro e seleção", text: "Com a tabela em mãos, faça rodadas eliminatórias com seus stakeholders. A cada rodada, questione:", list: [
            "Qual tipo de nome é mais adequado para esse produto?",
            "Qual atributo é mais essencial?",
            "O nome conflita com algum produto ou funcionalidade já existente na Caju?",
            "Há riscos jurídicos?"
          ], after: "Registre o resultado de cada rodada — você pode precisar resgatar um nome que ficou pelo caminho." },
          { title: "Critérios de desempate", text: "Ainda dividido entre dois nomes? Avalie:", table: { wrap: true, head: ["Critério", "Pergunta"], rows: [
            ["Elasticidade", "Como esse nome se comporta no ecossistema de produtos da Caju?"],
            ["Som e imagem", "Quais significados e associações ele carrega — inclusive os indesejados?"],
            ["Longevidade", "O nome vai envelhecer bem? Evite nomes ligados a tecnologias específicas."],
            ["Rejeição", "O que vem à mente de quem ouve esse nome? Faça uma pesquisa qualitativa se possível."]
          ] } }
        ] },
        { h3: "Prompt para IA" },
        { p: "Não tem tempo para o processo completo? Use o prompt abaixo para funcionalidades de baixa complexidade." },
        { alert: { appearance: "warning", label: "Atenção", text: "A etapa de filtro e seleção não pode ser delegada para a IA — ela precisa ser feita com o time e stakeholders." } },
        { p: "Como usar: cole o prompt no Claude ou no Gemini e responda as perguntas conforme forem sendo feitas." },
        { code: "CONTEXTO\nVocê é um assistente para o processo de naming de funcionalidades e produtos na Caju. Você vai rodar um framework e ao final chegaremos a no mínimo 5 opções de nomes para que o time tome a decisão.\n\nPROCESSO\n1. Pergunte o nome temporário do projeto.\n2. Pergunte qual tipo de nome é mais adequado (Descritivo, Associativo, Antropônimo, Topônimo, Acrônimo ou Transgressor).\n3. Pergunte quais atributos da Caju o produto deve reforçar (facilidade, versatilidade, brasilidade ou outros).\n4. Pergunte quais associações e sensações o nome deve transmitir.\n5. Gere uma lista de nomes com base nas respostas.\n6. Pergunte se quer novas opções. Peça para escolher no mínimo 5 nomes para continuar.\n7. Com os 5 nomes escolhidos, monte uma tabela cruzando tipo de nome (horizontal) com atributos e associações (vertical).\n8. Informe que o processo de filtro e validação precisa ser feito com o time — essa etapa não pode ser delegada para a IA.\n\nRESTRIÇÕES\nNão sugira os seguintes termos: Benefícios, Ciclos, Caju Mais, Hub, Multibenefícios.\nNão use estrangeirismos." },

        { h2: "Termos para evitar" },
        { p: "Esta página reúne os termos que não usamos nos produtos da Caju e os motivos para cada escolha. Quando houver dúvida entre dois termos, consulte também o Glossário Caju." },
        { h3: "Estrangeirismos" },
        { p: "Palavras estrangeiras vão contra a brasilidade — um dos pilares da marca Caju. Além disso, leitores de tela leem no idioma em que estão configurados, o que pode comprometer a acessibilidade." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["Download", "Baixar"], ["Feedback", "Sugerir, sugestão, opinião"], ["Feature", "Funcionalidade"], ["Gift", "Cartão-presente"], ["Login", "Entrar, acessar"], ["MFA", "Código de autenticação"],
          ["Status", "Situação, andamento — exceção: permitido em documentação interna e em cenários em que os termos em português não se encaixam"], ["Upgrade", "Melhorar, aumentar, evoluir"], ["Upload", "Carregar"],
          ["Tips", "Dicas"], ["Dashboard", "Painel"], ["Overview", "Resumo"]
        ] } },
        { h3: "Verbos sensoriais" },
        { p: "Verbos sensoriais descrevem os cinco sentidos e são comuns na linguagem cotidiana, mas criam barreiras de acessibilidade e inclusão. Nem todas as pessoas experienciam o mundo da mesma forma. Prefira verbos de entendimento e acesso (entender, conhecer, consultar, acessar). Não é uma regra absoluta: quando a ação é olhar um elemento da tela, como um boleto, um comprovante ou um cartão, o verbo visual continua valendo." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["Ver, visualizar", "Conferir, mostrar, abrir, acessar — exceção: quando a ação é de fato olhar algo (boleto, comprovante, cartão), em peças de marketing e em fluxos de funil"], ["Ver mais", "Nome da área ou acessar {área}"], ["Ver saldo", "Consultar saldo"], ["Ver como funciona", "Entender como funciona"], ["Prove a experiência", "Explore, descubra"], ["Ouvir", "Reproduzir, tocar"], ["Tenha em mãos", "Você vai usar, você vai precisar"]
        ] } },
        { h3: "Gírias, jargões e regionalismos" },
        { p: "A Caju usa gírias e regionalismos no branding — mas não no produto. Na interface, precisamos garantir o entendimento de todas as pessoas usuárias, independente de região ou contexto." },
        { p: "Nosso estilo é simples e humano, mas isso não é uma abertura para termos conhecidos apenas por uma bolha ou região." },
        { table: { wrap: true, head: ["Não use", "Por quê"], rows: [
          ["Desenrolar, resolver na mão, tá na mão", "Jargão informal que pode soar descuidado em contextos financeiros"],
          ["Vixe, Ops, Hummm", "Interjeições regionais ou infantis que podem soar como deboche — evite em qualquer momento"],
          ["Mandar ver, arrasar", "Gírias que podem não ser compreendidas por toda a base"],
          ["Valeu!", "Soa como conversa entre amigos, não como cuidado — destoa em momentos formais ou de encerramento (pesquisas, confirmações, agradecimentos)"]
        ] } },
        { h3: "Termos que causam ansiedade ou insegurança" },
        { p: "Algumas palavras tecnicamente corretas geram reações negativas nas pessoas usuárias — confirmado em pesquisas realizadas no Maze. Prefira sempre as alternativas." },
        { note: "Esses termos não são proibidos. Sempre avalie o contexto em que cada um vai ser usado." },
        { table: { wrap: true, head: ["Não use", "Use", "Por quê"], rows: [
          ["Bloqueado", "Temporariamente limitado", "\"Bloqueado\" soa como punição"],
          ["Agora", "Reescreva a frase sem o advérbio de urgência. Exemplo: \"Ativar agora\" vira \"Ativar\". Exceção: em tours guiados e onboarding, \"agora\" pode ser usado quando oferece uma escolha livre (\"agora ou depois\"), sem prazo nem consequência — não é comando, é opção.", "Palavras de comando aumentam a ansiedade"],
          ["Libere", "Reescreva a frase sem o verbo de comando, usando a ação exata do fluxo. Exemplo: \"Libere seu acesso\" vira \"Fazer reconhecimento facial\".", "Mesmo efeito de \"Agora\": aumenta a ansiedade e pressiona sem explicar"],
          ["Conta (em bloqueio do app)", "Fale do acesso ao app. Exemplo: \"Limitamos seu acesso\"", "Em cenários de bloqueio do app, \"conta\" remete aos benefícios e ao bloqueio do cartão"],
          ["Garantir", "Proteger, manter", "Soa como venda de serviço ou brinde"],
          ["Taxa", "Tarifa", "Confira as regras em Porcentagens e tarifas"],
          ["Biometria, biometria facial", "Reconhecimento facial", "Jargão técnico que pode ser confundido, inclusive com a biometria de dedo"]
        ] } },
        { h3: "Termos internos" },
        { p: "Termos usados internamente pelo time da Caju que não devem aparecer no produto ou em comunicações com pessoas usuárias." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["Employee app", "App da Caju para colaboradores, app para colaboradores"], ["Sponsor app", "Portal da Caju para empresas, Portal para empresas"],
          ["BU", "Área, unidade de negócio"], ["Cajuzinho", "Cartão físico de Benefícios"], ["Plástico", "Cartão físico de Benefícios"],
          ["2ª via", "Novo cartão"], ["Conta digital", "Conta Caju"]
        ] } },

        { h2: "Abreviação e siglas" },
        { h3: "Siglas" },
        { ul: [
          "Sempre escreva o nome completo na primeira menção, seguido da sigla entre parênteses. Nas menções seguintes, use apenas a sigla. Exceção: siglas que todo mundo conhece, como CPF, CNPJ e RG, dispensam o nome completo.",
          "Use caixa alta para siglas — nunca minúsculo. Pix não é sigla: escreva sempre Pix.",
          "Não use ponto entre as letras."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["O custo efetivo total (CET) inclui todas as tarifas. O CET é calculado anualmente.", "O C.E.T. inclui todas as tarifas."], ["IOF", "I.O.F."]
        ] } },
        { h3: "Siglas da Caju" },
        { p: "Algumas siglas são usadas com frequência nos produtos da Caju. Sempre que aparecerem pela primeira vez em uma tela ou comunicação, escreva o nome completo — menos CPF, CNPJ e RG, que dispensam." },
        { table: { wrap: true, head: ["Sigla", "Nome completo"], rows: [
          ["CPF", "Cadastro de Pessoas Físicas"], ["CNPJ", "Cadastro Nacional da Pessoa Jurídica"], ["CET", "Custo Efetivo Total"], ["IOF", "Imposto sobre Operações Financeiras"],
          ["MCC", "Merchant Category Code — código de categoria do estabelecimento"], ["OTP", "Código de uso único — use sempre \"código de autenticação\" no produto"],
          ["RG", "Registro Geral"], ["Pix", "Não é sigla: escreva sempre Pix, nunca PIX nem pix (grafia do Banco Central)"]
        ] } },
        { h3: "Abreviações de data e hora" },
        { p: "Use abreviações apenas quando o componente não permitir o nome completo. Sempre com primeira letra maiúscula. Confira mais detalhes em Data e horários." },
        { h3: "O que não abreviamos" },
        { p: "Alguns termos são abreviados no mercado mas não usamos na Caju — ou porque geram confusão, ou porque conflitam com outros termos." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["2ª via", "Novo cartão"], ["Tel, Fone", "Celular, número de celular"], ["Qtd", "Quantidade"], ["Nº", "Use \"#\" para número de pedido no Sponsor. Nas demais situações, escreva por extenso"]
        ] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Vocabulário e Nomenclatura (Glossário Caju, Naming de produto e funcionalidades, Termos para evitar, Abreviação e siglas). As tabelas são imagens no Figma e foram transcritas como texto (C112)." }
      ] }
      ,
      { id: "formatacao", title: "Formatação de dados", blocks: [
        { h2: "Regras universais" },
        { p: "Regras transversais que valem para todos os canais e componentes. Quando uma página específica tiver uma regra diferente para aquele contexto, ela prevalece sobre esta." },
        { h3: "Ponto final (.)" },
        { p: "Use em descrições — textos de apoio abaixo de títulos. Isso se aplica a todo componente que tem a estrutura de H1 + descrição." },
        { p: "Não use em: títulos, placeholders, itens de lista, tooltips, toasts, CTAs e hiperlinks. Exceto quando houver mais de uma frase — nesse caso, pontue ao final de cada uma." },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["Título: `Seu Pix foi enviado` · Descrição: `O valor vai chegar de forma imediata.`", "Título: `Seu Pix foi enviado.` · Descrição: `O valor vai chegar de forma imediata`"],
          ["CTA: `Confirmar pagamento`", "CTA: `Confirmar pagamento.`"],
          ["Placeholder: `Digite seu CPF`", "Placeholder: `Digite seu CPF.`"],
          ["Descrição com duas frases: `Seu cartão não foi desbloqueado. Tente de novo mais tarde.`", "Descrição com duas frases: `Seu cartão não foi desbloqueado, tente de novo mais tarde`"]
        ] } },
        { h3: "Ponto de exclamação (!)" },
        { p: "Use apenas em descrições — nunca em títulos, mesmo em momentos felizes. Use no máximo um por tela. Muitas exclamações soam como urgência forçada ou infantilidade. Nunca use duplos ou triplos (!!!)." },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["Título: `Pagamento confirmado` · Descrição: `Seu dinheiro já está a caminho!`", "Título: `Pagamento confirmado!`"],
          ["Uma exclamação por tela, somente em descrição", "Descrição: `Seu dinheiro já está a caminho!!`"]
        ] } },
        { h3: "Ponto de interrogação (?)" },
        { p: "Use para confirmar uma informação com a pessoa. Evite colocar viés na pergunta — isso pode causar insegurança. Nunca use duplos ou triplos (???)." },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Deseja cancelar o pagamento?`", "`Tem certeza que quer cancelar?` (viés negativo)"],
          ["`Os dados estão corretos?`", "`Você verificou mesmo os dados???`"]
        ] } },
        { h3: "Dois pontos (:)" },
        { ul: ["Use para introduzir uma lista ou dar mais explicações após um tema.", "Não use em títulos.", "Não use letra maiúscula depois dos dois pontos.", "Em leitores de tela, o comportamento é de uma pequena pausa."] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Para continuar, você vai precisar:` seguido da lista `• RG ou CNH` `• Uma foto do seu rosto (selfie)`", "`Para continuar, você vai precisar: Rg ou cnh e uma selfie`"],
          ["Descrição: `Informe seus dados abaixo.`", "Título: `Confirme seus dados:`"]
        ] } },
        { h3: "Vírgula (,)" },
        { p: "Use no máximo 3 vírgulas por frase. Mais que isso é sinal de que o texto precisa ser quebrado em frases menores. Siga as regras gramaticais da língua portuguesa." },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`1. Acesse o app.` `2. Vá em Cartões, escolha o cartão virtual e clique em Detalhes.`", "`Acesse o app, vá em Cartões, escolha o cartão virtual, clique em Detalhes, e veja as informações.`"]
        ] } },
        { h3: "Maiúsculas" },
        { p: "Inicie toda frase com letra maiúscula. Use caixa alta apenas em siglas. Nunca use para dar ênfase — leitores de tela podem soletrar palavras em caixa alta. Exemplos: `O valor inclui taxas, como IOF`, `Informe o código de autenticação`" },
        { p: "Exceções — sempre com letra maiúscula:" },
        { ul: [
          "Nome da marca: Caju", "Pix (regra do BACEN)", "Nomes de produtos: Cartão Corporativo, Crédito Consignado, Férias, Premiações",
          "Nomes de plataformas: Portal para empresas, Portal para colaboradores", "Categorias de saldo: Saldo Livre, Home Office, Auxílio Alimentação",
          "Áreas da interface citadas no texto: \"Acesse a área de Cartões\"", "Abreviações de dia e mês: Seg, Jan, Fev"
        ] },
        { h3: "Emojis" },
        { p: "Use com moderação. Emojis trazem leveza, mas podem causar ambiguidade e problemas de acessibilidade se usados sem critério. Nunca use emoticons (:-)) — leitores de tela leem cada caractere separadamente." },
        { ul: ["Use em contextos leves: avisos amigáveis, celebrações, confirmações", "Apenas em textos de apoio (descrições), nunca em títulos", "Sempre ao final da frase, nunca no início ou no meio", "Nunca em fluxos críticos: pagamento, erro, dados sensíveis",
          "Não use mais de um emoji seguido (`😃😆😄`): leitores de tela leem cada um separadamente",
          "Emojis complementam o texto, nunca substituem texto funcional ou estrutural",
          "Se o componente já for muito visual, com muitos elementos além do texto (cor, negrito, ilustrações), não use emojis",
          "Fora do produto, podem ser usados em redes sociais, e-mails marketing e conteúdos institucionais leves",
          "Teste com leitor de tela (VoiceOver) quando possível"] },
        { table: { wrap: true, head: ["Momento de uso", "Emoji"], rows: [
          ["Humanização e acolhimento", "🙌 🤗 🤝 🧡"], ["Celebrar conquistas e avanços", "🎉 🏆 ✨ ⭐ 🎯 ✅ 💡"], ["Guiar o olhar ou chamar atenção", "🔔 📢 👀"], ["Contexto corporativo ou benefícios", "💼 💳 📝 📊 💰"]
        ] } },
        { h3: "Listas" },
        { p: "Use para facilitar o escaneamento. Use no máximo uma lista por tela. Não pontue os itens." },
        { ul: ["Bullet points — para itens sem ordem específica e de pesos iguais.", "Lista numerada — para sequências de ações ou instruções."] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`1. Acesse o app` `2. Vá em Cartões` `3. Clique em Desbloquear`", "`Acesse o app > Vá em Cartões > Clique em Desbloquear`"],
          ["`• CNH ou RG` `• Selfie` `• Comprovante de residência`", "Bullets com ponto final: `- CNH ou RG.` `- Selfie.` `- Comprovante de residência.`"]
        ] } },
        { h3: "Negrito" },
        { p: "Use com moderação, o excesso desvia a atenção e pode dificultar a leitura de pessoas neurodivergentes." },
        { p: "Use para destacar informações relevantes. Nunca use como substituto de títulos (H2, H3)." },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Seu Pix de R$ 50,00 foi enviado às 14:32`, com negrito só em `R$ 50,00` e `14:32`", "A mesma frase sem nenhum destaque para o valor e o horário"],
          ["`Acesse a área de Cartões e clique em Desbloquear`, com negrito só em `Cartões` e `Desbloquear`", "Negrito em trechos inteiros: `Acesse a área de Cartões` e `clique em Desbloquear`"]
        ] } },
        { h3: "O que não usamos" },
        { table: { wrap: true, head: ["Recurso", "Por quê", "Substitua por"], rows: [
          ["Itálico", "Inclina e aproxima os caracteres, dificultando a leitura.", "Negrito ou texto sem formatação"],
          ["Tachado", "Pode impossibilitar o entendimento e não tem feedback em leitores de tela.", "Reescreva a frase sem o trecho removido"],
          ["Travessão (–)", "Interrompe o ritmo da leitura e pode soar como texto gerado por IA.", "Vírgula ou ponto final"],
          ["Barra vertical (|)", "Para separar frases, prejudica a leitura linear.", "Vírgula ou ponto final"],
          ["Ponto e vírgula (;)", "Para pausar o texto, é ambíguo. Nunca ao final de itens de lista.", "Vírgula ou ponto final"],
          ["E comercial (&)", "Exceto quando fizer parte do nome de uma marca ou parceiro.", "\"e\" por extenso"],
          ["Aspas (\"\")", "Para destacar botões ou áreas do produto, gera ambiguidade.", "Negrito"],
          ["Sublinhado", "Reservado exclusivamente para links — usar em outros contextos confunde.", "Negrito ou texto sem formatação"],
          ["Asterisco (*)", "Interrompe o fluxo de leitura, especialmente em leitores de tela.", "Bullet points (`•`) para mascarar dados"]
        ] } },

        { h2: "Valores monetários e moedas" },
        { ul: [
          "Valores negativos (saídas, débitos, estornos) usam o símbolo de subtração (`−`), não o hífen (`-`) nem o travessão (`—`). O hífen impacta a leitura de tela.",
          "Sempre mostre as casas decimais, mesmo sem centavos quebrados. Isso garante consistência, especialmente em tabelas.",
          "Deixe um espaço entre o símbolo R$ e o número.",
          "Use vírgula para separar as casas decimais.",
          "Use numerais. Nunca escreva o valor por extenso.",
          "Números acima de 3 dígitos recebem ponto na casa do milhar. Não use \"k\" para substituir \"mil\".",
          "Se o número for muito extenso e não couber no componente, diminua o tamanho da fonte até o mínimo permitido pelo Castanha ou use tooltip para exibir o valor completo ao passar o cursor."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`R$ 1.000,00`", "`R$1000` ou `R$1.000`"],
          ["`−R$ 45,00` (subtração)", "`-R$ 45,00` (hífen)"],
          ["`R$ 100,00`", "`R$ 100`"],
          ["`R$ 1.500,00`", "`R$ 1500` ou `R$ 1,5k`"]
        ] } },
        { h3: "Aplicações" },
        { table: { wrap: true, head: ["Exemplo", "Onde"], rows: [
          ["`Caiu reembolso de R$ 25,80`", "Extrato"],
          ["`Existe uma tarifa de R$ 1,99 para depósitos em Saldo Livre.`", "Alert"],
          ["`Pix enviado −R$ 45,00`", "Extrato"],
          ["`Compra no cartão −R$ 131,44`", "Extrato"],
          ["`Pix de R$ 1.000,00 para Juca Castanha •••.456.789-•• enviado.`", "Push notification"]
        ] } },
        { p: "Caso necessário, em comprovantes e extratos, oculte todos os dígitos do valor com 1 bullet por número. Exemplo: `R$ ••••`. Regras completas em Mascaramento e omissão de dados." },

        { h2: "Códigos e dados pessoais" },
        { p: "Nesta seção, você consulta como formatar alguns dados. Para regras de mascaramento, consulte Mascaramento e omissão de dados." },
        { table: { wrap: true, head: ["Dado", "Como apresentar"], rows: [
          ["Cartões", "O cartão tem 16 dígitos numéricos. Apresente em blocos de 4 números separados por espaço: `1234 5678 9012 3456`."],
          ["Código de desbloqueio", "Apresente em blocos de 4 números separados por espaço."],
          ["Código de autenticação", "Códigos de 6 dígitos. Apresente todos os números seguidos, sem espaçamento."],
          ["Senha do cartão", "Senha de 4 números. Apresente todos os números seguidos, sem espaçamento."],
          ["Celular", "Use sempre o formato com DDD. Ao pedir o número como input, oriente que o DDD é obrigatório. Use o termo \"celular\" ou \"número de celular\" — nunca \"telefone\"."],
          ["CPF", "Apresente com pontos e hífen: `123.456.789-00`. Para exibição mascarada, consulte Mascaramento e omissão de dados."]
        ] } },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`1234 5678 9012 3456` (cartão e código de desbloqueio)", "`1234567890123456`"],
          ["`Informe o código de autenticação: 123456`", "`Informe o código de autenticação: 123 456`"],
          ["`Digite sua senha: ••••`", "`Digite sua senha: *****`"],
          ["`(11) 99999-9999`", "`11999999999` ou `99999-9999`"],
          ["`Informe seu celular com DDD`", "`Informe seu telefone`"],
          ["`123.456.789-00`", "`12345678900`"]
        ] } },
        { h3: "Aplicações" },
        { table: { wrap: true, head: ["Exemplo", "Onde"], rows: [
          ["`Informe o código de autenticação: 123456`", "Código de autenticação"],
          ["`Seu código de desbloqueio é: 1234 5678 9012 3456`", "Código de desbloqueio"],
          ["`(11) 99999-9999`", "Celular"]
        ] } },

        { h2: "Datas e horários" },
        { p: "Use o formato de acordo com o espaço disponível no componente." },
        { h3: "Datas" },
        { ul: [
          "Formato completo: `01 de janeiro de 2025`",
          "Formato compacto: `01/12/2025` ou `12/25`",
          "Se o componente não permitir o nome completo, use abreviações com a primeira letra maiúscula. Exemplo: `Segunda = Seg`, `Janeiro = Jan`",
          "No extrato, use o formato completo. Se a transação for do ano atual, omita o ano. Exemplo: `04 de janeiro`. Se for de outro ano, mostre o ano: `04 de janeiro de 2024`",
          "Em comprovantes, use hífen para separar data de hora. Exemplo: `12/12/25 - 14:05`"
        ] },
        { h3: "Horários" },
        { ul: [
          "Use dois pontos para separar horas dos minutos.",
          "Use o modelo de 24 horas para evitar ambiguidades. Exemplo: `12:00` (meio-dia), `00:00` (meia-noite)",
          "Para indicar faixa de horário, escreva por extenso, nunca use traço. Exemplo: `das 08:00 às 18:00`",
          "Para falar de prazo, use o \"h\" minúsculo junto ao numeral. Exemplo: `Em até 2h úteis`",
          "No Pix, por regra do BACEN, mostre também os segundos. Exemplo: `14:05:32`"
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`das 08:00 às 18:00`", "`08:00 - 18:00`"],
          ["`Em até 2h úteis`", "`Em até 2H úteis`"],
          ["`14:05:32` (Pix, obrigatório por regra do BACEN)", "`14:05` (insuficiente para Pix)"]
        ] } },

        { h2: "Quantidades e unidades" },
        { h3: "Numerais" },
        { ul: [
          "Use numerais em vez de escrever o número por extenso. Números são informações importantes e ficam mais fáceis de escanear em formato numérico. Exemplo: `Você tem 3 cartões virtuais ativos`",
          "Escreva por extenso apenas quando o número fizer parte de uma expressão da língua portuguesa. Exemplo: `A Caju tem mil e uma utilidades`"
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Você tem 3 cartões virtuais ativos`", "`Você tem três cartões virtuais ativos`"],
          ["`A Caju tem mil e uma utilidades`", "`A Caju tem 1001 utilidades`"],
          ["`Parcele em até 12×`", "`Parcele em até 12x` ou `Parcele em até 12 vezes`"],
          ["`de 1 a 12 parcelas`", "`1 - 12 parcelas`"],
          ["`Carregue arquivos de até 1GB`", "`1 GB` ou `1 gigabyte`"]
        ] } },
        { h3: "Parcelas e repetições" },
        { p: "Use o símbolo × (vezes) — nunca a letra \"x\". Em leitores de tela, o \"x\" minúsculo pode confundir a pessoa usuária. Exemplo: `Parcele em até 12×`" },
        { h3: "Intervalos" },
        { p: "Use preposição para indicar intervalos, nunca símbolo de hífen. Exemplo: `de 1 a 12 parcelas`, `de R$ 50,00 a R$ 200,00`" },
        { h3: "Unidades de medida digital" },
        { p: "Use a abreviação padrão junto ao numeral, sem espaço. Exemplo: `Carregue um arquivo de até 1GB`" },
        { h3: "Prazos" },
        { ul: [
          "Use o \"h\" minúsculo junto ao numeral para indicar horas em prazos. Para minutos, escreva por extenso. Exemplo: `Em até 2h úteis`, `Em até 30 minutos`",
          "Prazos em dias sempre devem especificar se são dias úteis ou corridos."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Em até 2h úteis`", "`Em até 2H` ou `2 horas úteis`"],
          ["`Em até 30 minutos`", "`Em até 30min` ou `30m`"],
          ["`Em até 3 dias úteis`", "`Em até 3 dias`"],
          ["`Em até 5 dias corridos`", "`Em até 5 dias`"]
        ] } },

        { h2: "Mascaramento e omissão de dados" },
        { ul: [
          "Use mascaramento sempre que um dado sensível precisar aparecer na tela, mas não pode estar completamente visível.",
          "Use sempre bullet points (`•`) para mascarar. Nunca asterisco (`*`) nem elipse (`...`)."
        ] },
        { h3: "O que mostrar" },
        { table: { wrap: true, head: ["Dado", "Regra"], rows: [
          ["CPF", "De acordo com o BACEN, mostre os 6 números do meio — `•••.456.789-••`"],
          ["Números do cartão", "Mostre apenas os 4 últimos números — `•••• •••• •••• 1234` ou `cartão final 1234`"],
          ["Celular", "Não precisa mascarar. Mostre completo — `(11) 99999-9999` — ou, se o espaço for reduzido, só os 4 últimos dígitos — `Celular final 9999`. Isso não é mascaramento, é abreviação de exibição."],
          ["E-mail", "Mostre apenas o provedor (gmail) e a 1ª e as 2 últimas letras do e-mail — `j•••••••••sd@gmail.com`"],
          ["CNPJ", "Mostre apenas os 4 primeiros dígitos — `12.34•.•••/••••-••`"],
          ["Valores monetários", "Oculte todos os dígitos, com 1 bullet por número — `R$ ••••`"],
          ["Push notification", "`Pix de R$ 1.000,00 para Juca Castanha •••.456.789-•• enviado.`"]
        ] } },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`•••.456.789-••`", "`*.456.789-*`"],
          ["`•••• •••• •••• 1234`", "`**** **** **** 1234`"],
          ["`R$ ••••`", "`R$ *****`"]
        ] } },

        { h2: "Porcentagens e tarifas" },
        { p: "Use o formato de acordo com o espaço disponível no componente." },
        { h3: "Porcentagens" },
        { ul: [
          "Use sempre o símbolo % — nunca escreva \"por cento\" por extenso.",
          "Use vírgula para separar casas decimais. Exemplo: `Tarifa de 1,99% para depósitos em Conta Caju`",
          "Em tabelas, alinhe porcentagens à direita.",
          "Para exibir uma faixa de valores use preposição, nunca hífen. Exemplo: `A tarifa pode variar de 1,99% a 3,50%`"
        ] },
        { h3: "Tarifas" },
        { ul: [
          "Use sempre a palavra \"tarifa\" — nunca \"taxa\".",
          "Quando não houver tarifa, use “Sem tarifa” em tabelas e “Isento de tarifa” em descrições."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Tarifa de 1,99% para depósitos em Conta Caju`", "`Tarifa de 1.99%` ou `tarifa de um vírgula noventa e nove por cento`"],
          ["`A tarifa pode variar de 1,99% a 3,50%`", "`A tarifa pode variar de 1,99% - 3,50%`"],
          ["`Existe uma tarifa de R$ 1,99 para depósitos em Saldo Livre.`", "`Existe uma taxa de R$ 1,99 para depósitos em Saldo Livre.`"],
          ["`Sem tarifa` (em tabela)", "`Grátis`, `Free` ou `Zero`"],
          ["`Isento de tarifa` (em descrição)", "`Sem cobrança de taxa`"]
        ] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Formatação de dados (Regras universais, Valores monetários e moedas, Códigos e dados pessoais, Datas e horários, Quantidades e unidades, Mascaramento e omissão de dados, Porcentagens e tarifas). Exemplos em `código`, como no Figma (C113)." }
      ] }
      ,
      // Limites de caracteres por componente (zeroheight 8985350, Conteúdo › Formatação de Dados, publicada em 08/10 pelo time de
      // Conteúdo). Tabelas com o texto do Hub; os Do's and Don'ts do Hub são imagens e aqui são refeitos com os componentes do DS
      { id: "limites", title: "Limites de caracteres", blocks: [
        { h2: "Limites de caracteres por componente" },
        { p: "Esta página reúne, em um só lugar, os limites de texto registrados nas documentações do Castanha. Use como consulta rápida ao escrever ou revisar uma tela. As regras completas de cada componente ou canal continuam valendo na página de origem, indicada em cada tabela." },
        { p: "Quando uma página específica tiver uma regra diferente de uma regra geral, a página específica prevalece." },
        { h2: "Componentes de interface" },
        { table: { wrap: true, head: ["Componente", "Elemento", "Limite"], rows: [
          ["Botão", "Label", "Até 3 palavras, sem quebrar linha"],
          ["Link", "Texto do link", "De 5 a 8 palavras (~55 caracteres)"],
          ["Progress Tracker", "Nome da etapa", "Até 3 palavras"],
          ["Tabs", "Label", "1 linha, sem quebra"],
          ["Tabs", "Quantidade", "De 2 a 5 tabs"],
          ["Breadcrumb", "Quantidade de itens", "Trunca os links intermediários acima de 5 itens"],
          ["Toast", "Mensagem", "1 ou 2 linhas"],
          ["Badge", "Counter", "Até 2 dígitos, acima disso, use +99"],
          ["Upload item", "Nome do arquivo", "1 linha, truncado no fim. A extensão nunca é truncada"],
          ["Balance Card", "Label", "Só o nome da categoria, sem complementos"],
          ["Code Input", "Campos", "De 1 a 6 campos, conforme o tamanho do código"],
          ["Nav control", "Itens", "De 2 a 5 itens"],
          ["Fixed bar", "Ações", "Até 2 ações: uma primária e uma secundária"],
          ["Table", "Colunas", "Até 8 colunas. Com 9 ou mais, use Table Columns"],
          ["Pagination", "Volume mínimo", "Não use com 10 itens ou menos"],
          ["Onboarding", "Títulos", "Evite títulos que quebram em mais de uma linha"]
        ] } },
        { h2: "Do's and don'ts" },
        { h3: "Botão: label" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-main-button", label: "Confirmar pagamento", "show-lead-icon": false, "show-trailing-icon": false }, text: "Até 3 palavras. O botão mantém o tamanho padrão." },
          { kind: "dont", attrs: { _tag: "cds-main-button", label: "Confirmar o pagamento do boleto agora", "show-lead-icon": false, "show-trailing-icon": false }, text: "Mais de 3 palavras. O botão cresce ou o label quebra linha." }
        ] },
        { h3: "Tab: label" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-fixed-tab", label: "Exemplo de tabs", style: "width:100%", _children: [{ _tag: "cds-tab-item", label: "Extrato" }, { _tag: "cds-tab-item", label: "Cartões" }, { _tag: "cds-tab-item", label: "Pix" }] }, text: "1 palavra, sem quebra. Tab bar equilibrada." },
          { kind: "dont", attrs: { _tag: "cds-fixed-tab", label: "Exemplo de tabs", style: "width:100%", _children: [{ _tag: "cds-tab-item", label: "Extrato da conta" }, { _tag: "cds-tab-item", label: "Cartões físicos e virtuais" }, { _tag: "cds-tab-item", label: "Pix" }] }, text: "Muitas palavras. Quebra em 2 linhas e desalinha a tab bar." }
        ] },
        { note: "No componente do DS, o Tab Item não quebra linha: o rótulo longo é cortado, como no exemplo acima. A imagem do Hub mostra a quebra em 2 linhas." },
        { h3: "Badge: counter" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-badge", label: "99+" }, text: "Máximo 2 dígitos. Acima de 99, exiba \"99+\"." },
          { kind: "dont", attrs: { _tag: "cds-badge", label: "1250" }, text: "Número real acima de 2 dígitos. Longo demais para o espaço do badge." }
        ] },
        { h3: "Link: label" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-link", label: "Consultar o extrato de setembro", href: "#/conteudo/limites", appearance: "accent" }, text: "Descritivo. Diz exatamente para onde o link leva." },
          { kind: "dont", attrs: { _tag: "cds-link", label: "Clique aqui", href: "#/conteudo/limites", appearance: "accent" }, text: "Genérico. Não diz nada sobre o destino, o que prejudica acessibilidade." }
        ] },
        { h2: "Canais" },
        { h3: "Push notification" },
        { table: { wrap: true, head: ["Elemento", "Limite", "Exemplo"], rows: [
          ["Título", "30 caracteres", "\"Pix recebido\""],
          ["Título + Descrição", "200 caracteres", "\"Pix recebido\" + \"Você recebeu um Pix de R$ 35,00 de Cajuína Castanha •••.123.456-••.\""],
          ["Emoji", "Conta como 2 caracteres. Se puder, evite", "\"Pix recebido 🎉\""]
        ] } },
        { note: "Fonte: Push Notification." },
        { h3: "Notificação in-app" },
        { table: { wrap: true, head: ["Elemento", "Limite", "Exemplo"], rows: [
          ["Título", "30 caracteres", "\"Pagamento confirmado\""],
          ["Título + Descrição", "110 caracteres", "\"O pagamento do seu boleto no valor de R$ 239,53 foi confirmado.\""],
          ["CTA", "1 linha, sem quebra", "\"Detalhes\""]
        ] } },
        { note: "Fonte: Notificações In-App." },
        { h3: "E-mail transacional" },
        { table: { wrap: true, head: ["Elemento", "Limite", "Exemplo"], rows: [
          ["Assunto", "Ideal para mobile: até 33 caracteres. Recomendado: de 35 a 50 caracteres", "\"Confirme seu e-mail\""],
          ["Preview text", "Recomendado: até 37 caracteres. Aceitável: de 40 a 80. Máximo: de 40 a 100", "\"Falta só um passo para acessar\""],
          ["Parágrafo do corpo", "Até 3 linhas", "\"Para concluir seu cadastro e acessar o app da Caju, confirme seu e-mail pelo botão abaixo.\""],
          ["CTA", "1 por e-mail, até 3 palavras", "\"Confirmar e-mail\""]
        ] } },
        { note: "Fonte: E-mails Transacionais." },
        { h3: "Regras gerais de texto" },
        { p: "Valem para todos os canais e componentes, exceto quando a página específica disser outra coisa." },
        { table: { wrap: true, head: ["Elemento", "Limite"], rows: [
          ["Ponto de exclamação", "No máximo 1 por tela, só em descrições"],
          ["Vírgulas", "No máximo 3 por frase"],
          ["Listas", "No máximo 1 por tela"],
          ["Emojis", "Nunca mais de um seguido"],
          ["Fonte", "Mínimo de 14 px"]
        ] } },
        { h3: "Dados com tamanho fixo" },
        { table: { wrap: true, head: ["Elemento", "Limite", "Exemplo"], rows: [
          ["Número do cartão virtual", "16 dígitos, em blocos de 4 separados por espaço", "1234 5678 9012 3456"],
          ["Código de autenticação", "6 dígitos seguidos, sem espaço", "123456"],
          ["Senha do cartão", "4 números seguidos, sem espaço", "1234"],
          ["Valor monetário", "Sempre 2 casas decimais. Ponto no milhar a partir de 4 dígitos", "R$ 1.458,50"],
          ["CPF mascarado", "Mostre os 6 números do meio", "•••.123.456-••"],
          ["CNPJ mascarado", "Mostre os 4 primeiros dígitos", "12.34•.•••/••••-••"],
          ["Cartão mascarado", "Mostre os 4 últimos números", "•••• 3456"],
          ["Celular mascarado", "Mostre os 4 últimos dígitos", "(••) •••••-5678"],
          ["Valor mascarado", "1 bullet por número", "R$ •.•••,••"]
        ] } },
        { h3: "Componentes sem limite numérico" },
        { p: "Os demais componentes não listados pedem texto curto, sem número específico até o momento. Siga a orientação da página de cada um: Tag, Shortcut, Text area, Text input, Password input, Select input, Quantity input, Modal, Drawer, Popover, Card, Big number, Bottom sheet, Feedback Pages, Content List, Content List Item, Selection List Item, Filter button, Dropzone e Avatar." },
        { p: "No Text area, use o contador de caracteres sempre que o campo tiver limite máximo." },
        { note: "Fonte: [Castanha Hub · Limites de caracteres por componente](https://castanha.caju.com.br/858426090/v/latest/p/12a3e3-limites-de-caracteres-por-componente) (Conteúdo › Formatação de Dados). Texto literal do Hub. Os exemplos de Do's and don'ts são as imagens do Hub refeitas com os componentes do DS. Dúvidas: canal #castanha-suporte no Slack." }
      ] },

      { id: "feedback-pages", title: "Feedback Pages", blocks: [
        { h2: "Feedback Pages" },
        { p: "Feedback Pages comunicam estados relevantes após uma ação ou evento do sistema. O objetivo é orientar, confirmar, alertar ou redirecionar a pessoa usuária de forma clara e acionável." },
        { h3: "Erros" },
        { p: "Mensagens de erro mal escritas têm o poder de arruinar a experiência. Antes de escrever, responda:" },
        { ul: ["O que aconteceu?", "Como isso aconteceu?", "Como isso pode ser resolvido?", "É um erro de sistema, da pessoa usuária ou ambos?", "Temos controle para corrigir?"] },
        { table: { wrap: true, head: ["Origem", "Impacto", "O que fazer"], rows: [
          ["Sistema", "Parcial · Não impede o fluxo.", "Informe se o progresso foi perdido ou não e a resolução do erro."],
          ["Sistema", "Total · Sem recuperação.", "Assuma a responsabilidade, peça desculpas e informe quando será resolvido."],
          ["Pessoa usuária", "Parcial · Não impede o fluxo.", "Não culpe o usuário e use um tom colaborativo para a resolução."],
          ["Pessoa usuária", "Total · Sem recuperação.", "Esse cenário não deve acontecer. Deve ser previsto e evitado."]
        ] } },
        { h3: "Como escrever" },
        { ul: [
          "Seja conciso. A pessoa não quer ler textos longos em um momento de frustração.",
          "Ofereça no mínimo uma saída e se possível, mais de um caminho: \"Tentar de novo\" ou \"Preciso de ajuda\".",
          "Use tom colaborativo: \"Vamos te ajudar a resolver\".",
          "Neutralize a culpa: use \"parece\" ou \"provavelmente\" para não acusar. Ex: \"Parece que você está sem conexão\".",
          "Foque na solução. Explique brevemente o motivo e priorize como resolver.",
          "Nunca deixe a tela sem saída. Toda mensagem de erro precisa de um CTA resolutivo.",
          "Nunca use: \"Ops\", \"Vixe\", \"Hmmm\", reticências (...) ou emojis.",
          "Nunca culpe a pessoa usuária diretamente.",
          "Evite humor em momentos críticos. Pode soar como deboche."
        ] },
        { h3: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/error", "Cartão não adicionado", "Não foi possível adicionar seu cartão. Você também pode tentar diretamente pelo app da carteira digital.", "Tentar de novo", "Acessar carteira digital"),
            text: "O título cumpre a função de informar exatamente o que aconteceu, enquanto a descrição foca em como resolver. Além de usar um tom acolhedor e empático." },
          { kind: "dont", attrs: screen("notificacoes/error", "Algo deu errado", "Não foi possível adicionar seu cartão na carteira digital no momento."),
            text: "Não explicamos o erro e não damos um caminho para resolução, tudo isso com um tom “robotizado” e nada amigável." },
          { kind: "do", attrs: screen("notificacoes/error", "Parece que você está sem internet", "Confira sua conexão de internet e tente de novo.", "Recarregar"),
            text: "Por mais a falha seja do usuário (está sem internet), usamos termos não-acusatórios: parece, confira." },
          { kind: "dont", attrs: screen("notificacoes/error", "Ops, você está offline", "Sua conexão está meio preguiçosa e não é possível carregar a tela agora.", "Recarregar"),
            text: "Não devemos usar onomatopéias e culpar o usuário. Na descrição, o uso de humor soa como deboche." },
          { kind: "do", attrs: screen("notificacoes/error", "Desculpe, a página está indisponível", "Já estamos trabalhando para que tudo volte ao normal. Tente de novo mais tarde.", "Voltar"),
            text: "Pedimos desculpas em erros críticos de origem do nosso sistema. O tom é tranquilizador: já estamos cientes e vamos resolver. A solução é tentar em outro momento." },
          { kind: "dont", attrs: screen("notificacoes/error", "Oscilação no sistema", "Estamos passando por uma falha no sistema e não é possível realizar ações agora.", "Entendi"),
            text: "Termos difíceis e nenhuma saída para um erro crítico de origem do nosso sistema. Além disso, usa o “Entendi”, um CTA que não usamos mais." }
        ] },
        { h3: "Alertas" },
        { p: "Use para situações que exigem atenção ou estados de espera. O alerta não é necessariamente um bloqueio, mas um pedido de ação consciente." },
        { ul: [
          "Use tom acolhedor e preventivo. \"Antes de continuar\" sinaliza revisão sem punição.",
          "Explique o porquê do alerta: \"Para sua segurança\" ou \"Para uma melhor experiência\". Evite \"garantir\": promete o que pode não depender de nós.",
          "Sempre informe prazos: \"em até 2 dias úteis\". Se não houver prazo definido, ofereça a opção de ser notificado: \"Quero ser avisado\".",
          "Informe o canal de notificação: \"te avisaremos via push\" ou \"enviamos um e-mail\".",
          "Se a pessoa não puder sair da tela, deixe isso claro no título: \"Não feche esta página ainda\".",
          "Se houver envio de e-mail de confirmação, informe para qual nível de acesso foi enviado: \"O e-mail foi enviado para todos os administradores do Portal\".",
          "Evite tom celebrativo — a ilustração de alerta não evoca mensagem positiva.",
          "Nunca omita o prazo de espera."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/alert", "Pix temporariamente fora do ar", "Enquanto resolvemos, você pode pagar com o cartão virtual ou boleto. Podemos te avisar aqui no app assim que normalizar.", "Quero ser avisado", "Fechar"),
            text: "Tom colaborativo (“estamos”) + alternativa de solução + estimativa de prazo de resolução + canal de notificação" },
          { kind: "dont", attrs: screen("notificacoes/alert", "Pix indisponível", "Estamos passando por uma instabilidade no sistema e não é possível fazer pagamentos via Pix no momento.", "Fechar"),
            text: "Uso de termos complexos, sem solução ou prazo e tom robotizado." },
          { kind: "do", attrs: screen("notificacoes/alert", "Sua sessão expirou", "Segurança é prioridade por aqui! Para continuar, acesse de novo com seu e-mail e senha.", "Entrar novamente"),
            text: "O título diz o que aconteceu, a descrição explica o motivo de segurança e mostra como continuar." },
          { kind: "dont", attrs: screen("notificacoes/alert", "Você demorou muito para realizar a ação", "A sessão foi encerrado. Faça login novamente.", "Fazer login novamente"),
            text: "O título culpa a pessoa pela demora, a descrição não explica o motivo e o CTA repete o texto." }
        ] },
        { h3: "Sucesso" },
        { p: "Use para confirmar que uma tarefa foi concluída. O tom varia entre neutralidade, acolhimento (ações sensíveis) e celebração (momentos WOW)." },
        { ul: [
          "Use voz passiva no título: o foco é no que aconteceu, não em quem fez. Ex: \"Sua senha foi alterada\".",
          "Nunca use o pleonasmo \"com sucesso\". Se a ação foi concluída, ela foi concluída — sem qualificação.",
          "Nunca use agradecimentos no título: evite \"Agradecemos pelo envio\".",
          "Evite títulos genéricos: \"Feito\" ou \"Tudo certo\" não comunicam o que aconteceu.",
          "Detalhe o envio de notificações: informe para qual nível de acesso a confirmação foi enviada.",
          "Dê informações contextuais: explique como usar o que acabou de ser criado."
        ] },
        { table: { wrap: true, head: ["Tipo de cenário", "Como tratar"], rows: [
          ["Ações neutras (ex: senha alterada)", "Tom direto. Ex: \"Sua senha foi alterada\""],
          ["Ações negativas (ex: demissões)", "Tom acolhedor. Deixe claro que a ação pode ser revertida. Nunca celebre."],
          ["Churn ou encerramento", "Mantenha as portas abertas: \"Volte sempre que precisar\""],
          ["Momentos WOW", "Pode quebrar a voz passiva para ser mais celebrativo. Use ilustração ou motion se possível."]
        ] } },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/success", "O novo estoque foi solicitado", "Vamos enviar o rastreio por e-mail para os administradores do Portal. Acompanhe também pela aba de Rastreamento.", "Nova solicitação", "Voltar para cartões"),
            text: "O título é conversacional e foca na ação. A descrição diz o canal e o nível de acesso que vai receber o aviso e oferece um jeito de acompanhar. Os CTAs estão com as labels corretas." },
          { kind: "dont", attrs: screen("notificacoes/success", "Agradecemos sua solicitação", "O estoque foi solicitado com sucesso e agora é só aguardar a entrega.", "Entendi", "Fechar"),
            text: "Título genérico com agradecimento, o pleonasmo “com sucesso” e labels incorretas nos CTAs: “Entendi” não é mais usado na experiência." },
          { kind: "do", attrs: screen("notificacoes/success", "Tudo pronto com seu cartão físico!", "Use a senha de 4 números que você acabou de criar para pagar na maquininha. Quer mais praticidade? Adicione o virtual nas carteiras digitais e pague por aproximação.", "Acessar cartão físico", "Criar cartão virtual"),
            text: "Esse é um momento “WOW”, se possível use uma ilustração diferente e sempre dê informações contextuais sobre a ação realizada." },
          { kind: "dont", attrs: screen("notificacoes/success", "Feito!", "Seu cartão físico foi ativado com sucesso e você já pode aproveitar seus benefícios.", "Acessar cartão físico", "Criar cartão virtual"),
            text: "Não explicamos como usar e deixamos os CTAs sem contexto. Além de um título genérico, perdemos a chance de celebrar esse momento." }
        ] },
        { h3: "Empty state" },
        { p: "Use para áreas não povoadas ou quando uma busca não retorna resultados." },
        { ul: [
          "No título, destaque o valor ou a utilidade daquela área. Nunca foque na falta.",
          "Na descrição, explique como realizar a primeira ação para preencher aquele espaço.",
          "O CTA deve incentivar diretamente a primeira ação."
        ] },
        { table: { wrap: true, head: ["Tipo de cenário", "Como escrever"], rows: [
          ["Falha de busca", "Evite \"{Termo} não encontrado\". Suavize com \"ainda\": \"{Termo} ainda não está na lista\". CTA fixo: \"Limpar busca\"."],
          ["Área vazia", "Tom colaborativo no título: \"Já estamos prontos para os primeiros colaboradores\". Evite títulos vagos como \"Nada por aqui por enquanto\" — não dão contexto nem incentivam ação."]
        ] } },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/search-not-found", "Tente buscar por outro CPF", "O CPF 123.456.789-10 ainda não está cadastrado no Portal.", "Limpar busca"),
            text: "Tom acolhedor: não encontramos e explicamos o motivo." },
          { kind: "dont", attrs: screen("notificacoes/search-not-found", "", "CPF não encontrado.", "Tentar novamente"),
            text: "Não explica o motivo, não direciona para a solução e usa o CTA errado: em busca, o CTA fixo é “Limpar busca”." },
          { kind: "do", attrs: screen("notificacoes/empty-state", "Últimas transações", "Os pagamentos recentes feitos com seu cartão ficam listados aqui."),
            text: "Explicamos o que a pessoa usuária vai encontrar e qual o valor dela." },
          { kind: "dont", attrs: screen("notificacoes/empty-state", "Últimas transações", "Sem pagamentos realizados."),
            text: "O texto não engaja e não explica o valor daquela área para a pessoa usuária." }
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Feedback Pages. Feedback Pages não é um componente do DS, por isso fica aqui; as regras de texto dos componentes (Tabs, Botões, Breadcrumb, Bottom sheet, Links, Progress Tracker) estão na tab Conteúdo de cada componente (C114)." }
      ] }
      ,
      { id: "contextos", title: "Contextos", blocks: [
        { h2: "Apresentando novas funcionalidades (onboarding)" },
        { p: "Apresentar uma funcionalidade nova é uma interrupção intencional na navegação da pessoa. Por isso, cada palavra precisa ter um motivo para estar ali. O objetivo é fisgar a atenção, comunicar valor e levar a pessoa para a ação sem sobrecarregar." },
        { p: "O onboarding aparece como uma tela inteira no app para colaboradores e como modal ou banner no Portal para empresas." },
        { note: "Estas diretrizes são para comunicar novidades dentro do produto. Elas não cobrem comunicações em outros canais." },
        { h3: "Quando usar" },
        { ul: [
          "No lançamento de funcionalidades relevantes para a estratégia da Caju.",
          "Quando a novidade cria valor real para a pessoa usuária, não para melhorias pontuais no que já existia.",
          "Quando o time entende que vale a pena interromper uma tarefa para apresentar algo novo.",
          "Quando o objetivo é reduzir dúvidas sobre o uso de uma funcionalidade.",
          "Quando o objetivo é aumentar o engajamento com um produto da Caju."
        ] },
        { h3: "Como escrever" },
        { ul: [
          "Priorize o valor percebido pela pessoa, não o funcionamento técnico.",
          "Foque no potencial de uso: como essa funcionalidade resolve uma dor real?",
          "Escreva só o que é importante para aquele contexto e momento.",
          "Explique o conceito e por que a novidade é útil, como numa conversa: receber, contextualizar, explicar e encerrar (Tom e voz, premissa 6). Regras de negócio detalhadas e dúvidas específicas vão para a FAQ.",
          "Evite termos nichados de produto: \"funcionalidades\", \"desenvolvimento\", \"feature\".",
          "Não use emojis, as ilustrações e animações já dão suporte visual ao texto.",
          "Evite outros recursos além do texto, como negrito e cores: eles aumentam a carga cognitiva num momento em que a pessoa ainda não conhece o contexto da novidade.",
          "Títulos e itens de lista não levam pontuação. Descrições levam ponto final."
        ] },
        { h3: "Tom" },
        { p: "Combine dois atributos de tom e voz. Juntos, eles guiam sem pressionar e informam sem sobrecarregar: o tranquilizador reduz a ansiedade com mudanças e novidades, e o encorajador reforça as vantagens." },
        { p: "No onboarding, o encorajador puxa a frente: reforce as vantagens e convide a pessoa para explorar. Os exemplos do tom tranquilizador estão no tour guiado, logo abaixo." },
        { table: { wrap: true, head: ["Faça", "Não faça", "Por quê"], rows: [
          ["Evite pagar contas manualmente todo mês e ative o Pix Automático.", "Desenvolvemos uma nova funcionalidade de automação de pagamentos recorrentes.", "Descreve o funcionamento técnico do ponto de vista do time, não o valor percebido pela pessoa."],
          ["Ler a nota fiscal de uma despesa nunca foi tão fácil. Ative o leitor automático e economize tempo.", "Agora você pode usar nosso novo OCR para leitura automática de notas fiscais 📄", "Usa jargão técnico (OCR) e emoji, que não entra nesse contexto."],
          ["Você só precisa configurar uma vez. Vamos lá?", "Configure agora, é rápido e você não vai se arrepender.", "Promessa vaga em vez de mostrar o valor real."]
        ] } },
        { h3: "Boas práticas" },
        { ul: [
          "Inclua microinterações para reforçar o conteúdo. Se a mensagem fala sobre pagamentos mensais, a ilustração pode mostrar onde encontrar a próxima data de cobrança.",
          "Deixe o onboarding acessível para ser visto em outro momento, com o botão \"Me lembrar mais tarde\".",
          "Defina um período para a comunicação ficar no ar e lembre de removê-la quando o prazo encerrar.",
          "Antes de subir uma nova comunicação, verifique quantas interrupções já existem no produto. Se possível, remova uma antes de adicionar outra.",
          "Acompanhe métricas como taxa de abandono e tempo gasto para avaliar a comunicação. Se ela não engaja, vale repensar a estratégia para comunicar o valor da funcionalidade."
        ] },
        { h3: "Boas práticas de UI" },
        { ul: [
          "Não use texto dentro de imagens (PNG, JPEG) nos modais: imagens inteiras prejudicam a acessibilidade do Portal para empresas.",
          "Trabalhe com os templates e faça composições nativas.",
          "Se o título está centralizado, o texto do corpo também fica centralizado.",
          "Use as ilustrações padrão de aviso para comunicar uma instabilidade."
        ] },
        { h3: "Botões" },
        { p: "Os botões padronizados do onboarding são os mesmos do tour guiado (tabela em Explicando primeiro uso), com o Começar na primeira tela." },
        { h3: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: onboarding("hero-sponsor/empacotamento-beneficios", "O Portal para empresas está de cara nova", "Descubra as novidades que preparamos para você e que vão deixar seu dia a dia de RH cada vez mais prático.", "Começar", "Me lembrar mais tarde"),
            text: "Botões padronizados e tom encorajador para falar de novidades no produto." },
          { kind: "dont", attrs: onboarding("hero-sponsor/empacotamento-beneficios", "Boas-vindas ao novo Portal Caju!", "Estamos construindo uma experiência ainda melhor para você! Algumas funcionalidades ainda estão em desenvolvimento, mas já dá para explorar as novidades.", "Explorar agora", "Ver depois"),
            text: "“Funcionalidades” e “desenvolvimento” são termos nichados de produto, e os botões estão fora do padrão." },
          { kind: "do", attrs: onboarding("objetos/medalha-1", "", "Garanta um reconhecimento extra para seus colaboradores e segurança jurídica para sua empresa com Premiações.", "Quero saber mais"),
            text: "Comunica a proposta de valor do produto de forma simples e direta." },
          { kind: "dont", attrs: onboarding("objetos/medalha-1", "", "Ainda dá tempo de presentear seu time com Caju Premiações.", "Saiba mais"),
            text: "Não diz qual é o benefício de Premiações para o RH ou para o colaborador, e o botão está fora do padrão." },
          { kind: "do", attrs: onboarding("objetos/presente-aberto", "Concorra a um vale-presente de R$ 80,00", "Participe da pesquisa sobre benefícios e tenha a chance de ganhar 1 dos 3 vales-presente de R$ 80,00. O sorteio é nesta sexta-feira.", "Responder pesquisa", "Não mostrar novamente"),
            text: "Explica como concorrer ao vale-presente em poucas palavras e usa os botões padrão." },
          { kind: "dont", attrs: onboarding("objetos/presente-aberto", "Ajude a Caju e concorra a um vale presente de R$80,00", "Queremos entender o que é essencial em uma plataforma de benefícios para você. E no final da pesquisa, você concorre a um vale presente no valor de R$80,00. São 3 vales presente e o sorteio acontece nesta sexta! Vamos lá? 😉", "Ajudar a Caju", "Ignorar"),
            text: "Texto extenso, com título que quebra em mais de uma linha, e emoji." }
        ] },

        { h2: "Explicando primeiro uso (tour guiado)" },
        { p: "O tour guiado orienta a pessoa dentro da própria interface, mostrando áreas e botões em sequência. É dinâmico, contextual e deve guiar sem pressionar." },
        { h3: "Quando usar" },
        { ul: [
          "Quando ações importantes mudaram de lugar ou ganharam novos nomes.",
          "Quando há mudança visual ou estrutural em uma etapa importante da experiência.",
          "Para explicar regras de negócio que podem impactar o uso.",
          "Para detalhar o que uma área ou botão faz.",
          "Para orientar como completar uma tarefa pela primeira vez."
        ] },
        { p: "Antes de criar um tour guiado, verifique se o fluxo realmente precisa de explicação ou se exige baixo esforço da pessoa usuária para ser concluído." },
        { h3: "Como escrever" },
        { ul: [
          "Na primeira tooltip, resuma o valor da funcionalidade. A quantidade de cliques cai bastante a partir da primeira mensagem e ela precisa ser convincente o suficiente para a pessoa continuar.",
          "Sempre mostre o impacto da ação que está sendo explicada.",
          "Use a barra de progresso para indicar quantas etapas existem.",
          "Títulos e itens de lista não levam pontuação. Descrições levam ponto final.",
          "Não use emojis."
        ] },
        { h3: "Tom" },
        { p: "Use um tom tranquilizador para reduzir a ansiedade com mudanças, e encorajador para reforçar o valor da ação. Os dois trabalham juntos nesse contexto. Exemplos:" },
        { table: { wrap: true, head: ["Faça", "Não faça", "Por quê"], rows: [
          ["O caminho para fazer pedidos mudou de lugar, mas continua fácil de usar.", "O caminho para fazer pedidos mudou. Aprenda o novo fluxo agora mesmo!", "Soa como cobrança, sem reduzir a ansiedade da mudança."],
          ["A funcionalidade que você usava antes agora fica em outra área.", "Sentimos muito, mas você vai precisar reaprender onde fica essa funcionalidade.", "Pedido de desculpas desnecessário, que faz a mudança parecer um problema."],
          ["Você decide quando alterar.", "Altere agora para não perder o acesso à função.", "Cria falsa urgência num contexto que não é de bloqueio."],
          ["Você só precisa configurar uma vez. Vamos lá?", "Configure agora, é rápido e você não vai se arrepender.", "Promessa vaga em vez de mostrar o valor real."],
          ["Reorganizamos para facilitar sua rotina. Confira o que mudou.", "Mudamos tudo! Vem ver as novidades 🎉", "Usa emoji e tom de anúncio de marketing, fora do tom tranquilizador."],
          ["Configure agora ou deixe para mais tarde.", "Configure agora, senão você vai perder essa oportunidade.", "O Faça oferece uma escolha real, sem pressão. O Não faça transforma o mesmo \"agora\" em ameaça de perda."]
        ] } },
        { h3: "Botões padronizados" },
        { table: { wrap: true, head: ["Label", "Quando usar", "Não use"], rows: [
          ["Começar", "Inicia o tour guiado — exclusivo para a primeira tela.", "“iniciar” ou “explorar”"],
          ["Continuar", "Avança para a próxima etapa — use a partir da segunda tela, nunca na última.", "“Avançar” ou “Próximo”"],
          ["Voltar", "Retorna para a etapa anterior.", "“Anterior”"],
          ["Fechar", "Encerra o tour quando há apenas uma etapa.", "“Encerrar”, “Entendi”, “Finalizar”"],
          ["Concluir", "Encerra o tour quando há mais de uma etapa.", "“Encerrar”, “Entendi”, “Finalizar”"],
          ["Quero saber mais", "Leva para outra página com mais detalhes ou FAQ.", "“Saber mais”, “Saiba mais”"],
          ["Me lembrar mais tarde", "Pula o tour, que voltará a aparecer até ser concluído.", "“Ver depois”, “Agora não”, “Pular”, “Ignorar”"],
          ["Não mostrar novamente", "Pula o tour definitivamente e não volta a aparecer.", "—"]
        ] } },

        { h2: "Urgências e bloqueios" },
        { p: "Algumas situações exigem que a pessoa tome uma ação obrigatória, com prazo e consequências reais. Mesmo nesses casos, o tom da Caju não muda: queremos mostrar o valor da ação, não pressionar com a ameaça do bloqueio." },
        { p: "A comunicação é escalonada: começa mostrando o benefício da proteção e vai tornando a urgência mais evidente conforme o prazo se aproxima. A consequência existe, mas sempre aparece como resultado de uma proteção ativa, nunca como punição." },
        { h3: "Quando usar" },
        { ul: ["Fluxos de segurança e conformidade.", "Bloqueios de acesso.", "Mudanças obrigatórias na experiência."] },
        { h3: "Régua de urgência" },
        { ol: [
          "Leve e informativo: dar consciência para a pessoa usuária.",
          "Informativo com impacto: chamar a atenção para o tema.",
          "Moderado com urgência: alerta.",
          "Urgente: aumentamos o foco no tempo para realizar.",
          "Crítico e com bloqueio: não é uma punição e tem maneiras de resolver."
        ] },
        { steps: [
          { title: "Nível 1 — Aviso inicial", text: "Tom leve e informativo. Foque no valor da proteção, ainda não é hora de falar em prazo ou consequência.", list: [
            "Apresente a ação como um benefício, não uma obrigação.", "Não cite bloqueio ou limitação.", "Não use prazo rígido."
          ] },
          { title: "Nível 2 — Reforço com impacto", text: "Tom claro e mais imediato. Reforce o valor e introduza sutilmente que há uma etapa necessária.", list: [
            "Explique o que a ação protege e como funciona.", "Introduza a consequência futura de forma leve, sem prazo ainda."
          ] },
          { title: "Nível 3 — Urgência moderada", text: "Tom moderado e direto. A consequência deixa de ser futura e passa a ser próxima, mas ainda enquadrada como proteção.", list: [
            "Introduza o prazo de forma suave: \"até [data]\".", "Use \"temporariamente limitado\" em vez de \"bloqueado\".", "Reduza explicações secundárias."
          ] },
          { title: "Nível 4 — Prazo crítico", text: "Tom urgente. O prazo é explícito e próximo, mas o enquadramento de proteção se mantém.", list: [
            "Informe o prazo de forma direta.", "Frases curtas, sem distrações visuais ou textuais."
          ] },
          { title: "Nível 5 — Bloqueio", text: "Tom crítico e objetivo. A ação é o único caminho, mas ainda enquadrada como proteção ativa, não punição.", list: [
            "Nenhuma navegação alternativa.", "Nenhuma justificativa longa.", "Uma instrução, um CTA."
          ] }
        ] },
        { h3: "Nível 1 · Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-card", "has-border": true, class: "pg-cnt-card", _children: [{ _tag: "h4", class: "pg-cnt-phone__title", _text: "Seu Caju ainda mais seguro 🔒" }, { _tag: "p", class: "pg-cnt-phone__text", _text: "Faça o reconhecimento facial e aumente a segurança da sua conta." }] }, style: "width:100%",
            text: "Tom leve e informativo que não cita o impacto negativo (ex: bloqueio). Estamos introduzindo o conceito nesse momento." },
          { kind: "dont", attrs: { _tag: "cds-card", "has-border": true, class: "pg-cnt-card", _children: [{ _tag: "h4", class: "pg-cnt-phone__title", _text: "É você mesmo por aqui? 👀" }, { _tag: "p", class: "pg-cnt-phone__text", _text: "Confirme sua identidade para que apenas você tenha acesso ao app." }] }, style: "width:100%",
            text: "Cuidado com o tom brincalhão em temas como segurança e privacidade." }
        ] },
        { h3: "Nível 2 · Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: sheetActions("Seu Caju ainda mais seguro", "Faça o reconhecimento facial e mantenha seu acesso protegido e exclusivo.", "Reforçar proteção", "Me lembrar mais tarde"),
            text: "Introduz a consequência futura e explica o valor da ação e tudo que é necessário para finalizá-la." },
          { kind: "dont", attrs: sheetActions("Ative já sua biometria", "Seu acesso será bloqueado se você não fizer isso agora. Garantimos que é rápido.", "Ativar conta", "Bloquear conta"),
            text: "Palavras de comando que aumentam a ansiedade e vendemos a consequência como punição, não como proteção." }
        ] },
        { h3: "Nível 3 · Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: sheetActions("Mais segurança para você", "Para aumentar a proteção do seu app, faça o reconhecimento facial até [DD/MM]. Sem essa etapa, seu app pode ficar temporariamente limitado.", "Aumentar proteção"),
            text: "O prazo está destacado e a ilustração remete à ação necessária: fazer reconhecimento facial." },
          { kind: "dont", attrs: sheetActions("Você tem até [DD/MM] para ativar!", "Após essa data, seu acesso será bloqueado permanentemente. Não deixe isso acontecer.", "Ativar agora"),
            text: "O prazo vira protagonista negativo em vez de referência informativa e o tom é de ameaça direta." }
        ] },
        { h3: "Nível 4 · Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: screen("seguranca/cadeado", "Não deixe pra última hora", "Faça o reconhecimento facial para aumentar a proteção do seu Caju. Essa é uma etapa obrigatória para a sua segurança. A partir de amanhã (dd/mm), seu app fica temporariamente limitado.", "Fazer reconhecimento facial"),
            text: "A urgência aumentou mas o tom segue acolhedor: o bloqueio não é uma punição e sim uma medida preventiva." },
          { kind: "dont", attrs: screen("seguranca/cadeado", "Seu acesso será bloqueado amanhã!", "Você ainda não fez a autenticação por biometria. Garanta seu acesso antes que seja tarde.", "Ativar agora"),
            text: "Título anuncia punição em vez de orientar a ação." }
        ] },
        { h3: "Nível 5 · Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: screen("seguranca/cadeado", "Protegemos seu acesso", "Sua segurança vem em primeiro lugar, autorize esse dispositivo para que apenas você acesse seu app!", "Fazer reconhecimento facial"),
            text: "Aplicamos o nível máximo de “punição”, mas o tom é acolhedor e o valor do bloqueio é a segurança do app." },
          { kind: "dont", attrs: screen("seguranca/cadeado", "Acesso limitado", "Você ainda não autorizou este dispositivo com reconhecimento facial. Faça isso agora mesmo para liberar o acesso ao app!", "Liberar acesso"),
            text: "Tom pouco acolhedor, culpando o usuário por não ter tomado a ação e agora ele foi punido." },
          { kind: "do", attrs: screen("seguranca/cadeado", "Limitamos seu acesso", "Sua conta está protegida por uma trava de segurança. Faça o reconhecimento facial para continuar aproveitando seu Caju.", "Liberar acesso"),
            text: "Explicamos que a trava de segurança é mais uma medida de proteção da Caju e não uma burocracia." },
          { kind: "dont", attrs: screen("seguranca/cadeado", "Seu acesso foi bloqueado", "Você não completou a autenticação no prazo. Para desbloquear, faça a biometria.", "Liberar acesso"),
            text: "Não explica que a limitação é uma medida de proteção da Caju e culpa a pessoa diretamente." }
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Contextos (Apresentando funcionalidades, Explicando primeiro uso, Urgências e bloqueios). As telas foram refeitas com Card, Bottom Sheet, Main Button e Fixed Bar do DS, com os mesmos textos; os mockups de carrossel e de tooltips do tour ficam de fora (C115)." }
      ] }
      ,
      { id: "canais", title: "Canais", blocks: [
        { h2: "Push" },
        { p: "Notificações push são mensagens curtas enviadas diretamente para o dispositivo da pessoa. Aparecem como pop-up na tela, mesmo com o app fechado. Por isso, cada push precisa ter um motivo real para existir." },
        { h3: "Limite de caracteres" },
        { table: { wrap: true, head: ["Elemento", "Limite", "Observação"], rows: [
          ["Título", "30 caracteres", "Quanto menor, melhor"], ["Título + descrição", "200 caracteres", "Garante visibilidade completa"], ["Emoji", "2 caracteres cada", "Se puder, evite"]
        ] } },
        { h3: "Como escrever" },
        { ul: [
          "O título deve resumir o motivo do disparo.",
          "A descrição complementa o título com contexto, referência (valor, data, nome) e próximo passo.",
          "Não use letras maiúsculas no meio da frase.",
          "Não use \"com sucesso\" em confirmações — se aconteceu, não existe uma forma de acontecer com erros.",
          "Não use \"ops\", \"que pena\" ou \"desculpa\" em falhas.",
          "Não use emojis em notificações negativas.",
          "Sempre confira a documentação regulatória quando houver. Em notificações de Pix, o CPF aparece mascarado no formato `•••.456.789-••`."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça", "Por quê"], rows: [
          ["Seu Caju caiu! Você tem R$ 306,00 disponíveis em sua conta para usar.", "Seu Caju foi depositado com sucesso! 🎉 Você recebeu com sucesso o valor em sua conta, aproveite!", "Usa o pleonasmo “com sucesso” e omite o valor exato. “Aproveite” é vago."],
          ["Pagamento recusado. O valor de R$ 36,00 em Pg*ton Flor Acaiter foi recusado por saldo insuficiente na categoria Saldo Livre.", "Ops, seu pagamento não rolou 😢 Não foi possível completar sua compra, tente novamente mais tarde", "Usa “ops”, tom informal fora do padrão e emoji em notificação negativa. Some com o valor, o estabelecimento e o motivo real da recusa."],
          ["Senha incorreta. Transação recusada por senha incorreta. Tente novamente ou redefina sua senha no app.", "Que pena, senha errada! Você errou a senha do cartão, CUIDADO para não bloquear sua conta!!!", "Usa “que pena”, caixa alta no meio da frase e tom alarmista. Mostra o risco, mas não o caminho para resolver."],
          ["Pix recebido. Você recebeu um Pix de R$ 35,00 de Cajuína Castanha •••.123.456-••.", "Pix recebido com sucesso! 🎉 Você recebeu uma transferência, confira o valor no app.", "Pleonasmo “com sucesso”, emoji e sem valor nem remetente: obriga a pessoa a abrir o app para saber o que já deveria estar na notificação."]
        ] } },

        { h2: "In-app" },
        { p: "Notificações in-app aparecem dentro do produto enquanto a pessoa navega — na Central de Notificações do Employee ou do Sponsor. Diferente do push, ela não interrompe: a pessoa acessa quando quiser." },
        { p: "Por isso, o in-app é ideal para destravar ações pendentes, registrar eventos importantes e servir como histórico de comunicações." },
        { h3: "Limite de caracteres" },
        { table: { wrap: true, head: ["Elemento", "Limite"], rows: [["Título", "30 caracteres"], ["Descrição", "110 caracteres"], ["Total", "140 caracteres"], ["CTA", "Não pode quebrar em mais de uma linha"]] } },
        { h3: "Regras de uso" },
        { ul: ["Nunca use in-app como canal único. Ele sempre precisa estar atrelado a outro canal — push ou e-mail.", "Quando houver ação pendente, o deep link para o destino útil é obrigatório."] },
        { h3: "Como escrever" },
        { ul: [
          "O título deve resumir o motivo do disparo.",
          "A descrição complementa o título com contexto, referência (valor, data, nome) e próximo passo.",
          "Use infinitivo nos CTAs.", "Não use ponto de exclamação.", "Não use letras maiúsculas no meio da frase.",
          "Não use \"com sucesso\" em confirmações — se aconteceu, não existe uma forma de acontecer com erros.",
          "Não use \"ops\", \"que pena\" ou \"desculpa\" em falhas.", "Não use emojis em notificações negativas.",
          "Sempre confira a documentação regulatória quando houver. Em notificações de Pix, o CPF aparece mascarado no formato `•••.456.789-••`."
        ] },
        { h3: "Datas na notificação" },
        { table: { wrap: true, head: ["Quando", "Formato"], rows: [["No mesmo dia", "`Hoje HH:MM`"], ["No dia anterior", "`Ontem HH:MM`"], ["Dois dias ou mais", "`DD/MM/AAAA HH:MM`"]] } },
        { h3: "Quando usar" },
        { table: { wrap: true, head: ["Tipo", "Quando"], rows: [
          ["Lembrete", "Prazo se aproximando, ação não finalizada, recorrências importantes."],
          ["Transacional", "Confirmação imediata de algo que aconteceu: pagamento, Pix, pedido."],
          ["Status ou andamento", "Atualização relevante de um processo em curso."],
          ["Segurança", "Proteção ativa: reconhecimento facial, dispositivo autorizado."],
          ["Urgência", "Situação crítica com app ainda funcional e ação necessária agora."]
        ] } },
        { p: "Urgência é diferente de incidente técnico. Se o app está fora do ar, a Central de Notificações também fica indisponível — use outros canais nesses casos." },
        { h3: "Templates por tipo" },
        { table: { wrap: true, head: ["Tipo", "Título", "Descrição", "CTA (opcional)", "Deep link"], rows: [
          ["Lembrete", "Que evento está chegando", "Contexto + consequência de não agir + tempo de reação", "Finalizar, Revisar ou Continuar", "Retoma o estado anterior sempre que possível"],
          ["Transacional", "Confirmação objetiva", "O que aconteceu + detalhes claros (valor, destino, data)", "Detalhes", "Detalhes da ação concluída"],
          ["Falha ou bloqueio", "O que impediu a ação", "O que falhou + por que falhou + o que fazer agora", "Tentar de novo ou Recarregar", "Tela ou área que permite resolver"],
          ["Status ou andamento", "Atualização de status", "Em que etapa está + o que esperar agora", "Detalhes", "Linha do tempo ou detalhes do processo"],
          ["Segurança ou prevenção", "Proteção em destaque", "Risco evitado + benefício claro", "Infinitivo da ação", "Tela de configuração ou validação"],
          ["Urgência", "Urgência explícita e direta", "O que está acontecendo + impacto imediato + o que fazer", "Infinitivo da ação", "Sempre para a ação crítica ou a tela de resolução"]
        ] } },
        { dodont: [
          { kind: "do", title: "Lembrete", attrs: notif("Cartão virtual expira em breve", "Ele expira em 15/07/2025. Crie um novo e evite falhas nos pagamentos.", "Criar novo cartão"),
            text: "Antecipação clara, data objetiva e ação preventiva." },
          { kind: "dont", title: "Lembrete", attrs: notif("Cartão virtual expirando", "Seu cartão vai expirar e pode parar de funcionar a qualquer momento.", "Detalhes"),
            text: "Sem data, gera ansiedade e não orienta a ação." },
          { kind: "do", title: "Transacional", attrs: notif("Pagamento confirmado", "O pagamento do seu boleto no valor de R$ 239,53 foi confirmado.", "Detalhes"),
            text: "Texto direto e tom neutro." },
          { kind: "dont", title: "Transacional", attrs: notif("Pagamento confirmado", "Boa notícia, seu pagamento foi confirmado com sucesso.", "Ver mais"),
            text: "Tom emocional, o pleonasmo “com sucesso” e nenhum dado do pagamento." },
          { kind: "do", title: "Falha ou bloqueio", attrs: notif("Pagamento recusado", "Seu cartão não está habilitado para compras internacionais. Acesse a área de Cartões para habilitar.", "Cartões"),
            text: "Explica o motivo da falha e orienta a solução." },
          { kind: "dont", title: "Falha ou bloqueio", attrs: notif("Pagamento Recusado", "Não foi possível concluir o pagamento. Tente novamente mais tarde.", "Saber mais"),
            text: "Maiúscula no meio do título, sem o motivo e sem o próximo passo." },
          { kind: "do", title: "Status ou andamento", attrs: notif("Solicitação em análise", "Sua solicitação de reembolso foi recebida pela empresa e está sendo analisada.", "Detalhes"),
            text: "Confirma o recebimento e mostra o estado atual, sem urgência falsa." },
          { kind: "dont", title: "Status ou andamento", attrs: notif("Estamos verificando", "Sua solicitação está sendo analisada e em breve retornaremos.", "Detalhes"),
            text: "Genérico e não ajuda a entender o progresso." },
          { kind: "do", title: "Segurança ou prevenção", attrs: notif("Proteja sua conta", "Ative o reconhecimento facial para aumentar a segurança do seu acesso.", "Ativar"),
            text: "Educativo e com o benefício claro." },
          { kind: "dont", title: "Segurança ou prevenção", attrs: notif("Sua conta pode estar em risco", "Ative o reconhecimento facial para evitar acessos indevidos à sua conta.", "Ativar"),
            text: "Tom alarmista: segurança baseada em medo." },
          { kind: "do", title: "Urgência", attrs: notif("Último dia para ativar", "Ative o reconhecimento facial até 12/05 para manter seu acesso.", "Ativar"),
            text: "Consequência clara, prazo real e uma ação." },
          { kind: "dont", title: "Urgência", attrs: notif("Atenção importante", "Precisamos que você ative a biometria o quanto antes para evitar problemas.", "Ativar"),
            text: "Não explica o impacto, a urgência é genérica e perde credibilidade." }
        ] },
        { p: "Outros exemplos do Hub. Segurança: “Contato de confiança cadastrado · Seu contato de confiança foi cadastrado para reforçar sua segurança no Pix.” Urgência: “Pix indisponível · A área Pix vai estar temporariamente indisponível amanhã até 12:00 (meio-dia).”" },
        { p: "Para montar uma régua de urgência ou bloqueio, veja [Contextos › Urgências e bloqueios](#/conteudo/contextos)." },
        { note: "Fonte dos Do's and Don'ts de Push e In-app: Castanha Hub (Canais › Push Notification 191aee e Notificações In-App 22e67d), conferido em 09/10/2026. No Lembrete, o “Ele expiram” do Hub virou “Ele expira”." },

        { h2: "E-mails transacionais" },
        { p: "E-mails transacionais informam ou orientam a pessoa na conclusão de uma tarefa. São disparados automaticamente por um evento: cadastro, pagamento, redefinição de senha. Diferente do push e do SMS, permitem comunicações mais longas e servem como histórico." },
        { h3: "Antes de escrever" },
        { ul: [
          "Entenda o fluxo em que o e-mail está inserido.",
          "Defina o objetivo: o que a pessoa precisa saber ou fazer depois de ler?",
          "Verifique se já existe um template ativo, sempre prefira atualizar um existente a criar um novo."
        ] },
        { h3: "Anatomia" },
        { p: "O e-mail segue sempre esta ordem:" },
        { steps: [
          { title: "Assunto", text: "Primeiro ponto de contato. Deve informar claramente o que aconteceu ou o que vai acontecer.", list: [
            "Use palavras-chave logo no início. Exemplo: `Confirme seu e-mail`.",
            "Tamanho ideal para mobile: até 33 caracteres. Máximo recomendado: entre 35 e 50 caracteres.",
            "Evite termos como \"oferta\" ou \"grátis\" — estão associados a spam.",
            "Sem letras maiúsculas fora do padrão e sem ponto de exclamação."
          ] },
          { title: "Preview text", text: "Complementa o assunto e dá um motivo adicional para abrir o e-mail.", list: [
            "Tamanho recomendado para visibilidade é de até 37 caracteres, e o aceitável é entre 40 e 80 caracteres.",
            "O tamanho máximo é de 40 a 100 caracteres, mas lembre que textos muito longos são cortados.",
            "Não repita exatamente o mesmo texto do assunto.",
            "Antecipe o valor ou ação esperada daquele e-mail."
          ] },
          { title: "Título", text: "Resume o conteúdo do e-mail. É com ele que a pessoa decide se vai ler ou não.", list: [
            "Coloque a informação mais importante primeiro.", "Prefira frases positivas — reduzem a carga cognitiva.", "Nunca use \"com sucesso\".", "Não use emojis.", "Não use ponto final.",
            "O nome da empresa só aparece no título se fizer parte do conteúdo — nunca como saudação. Exemplo: `As faturas da Juca Castanha Ltda. já estão disponíveis`"
          ] },
          { title: "Saudação", list: [
            "Evite usar variável de nome próprio ou nome da empresa na saudação — recomendação do jurídico. Essas variáveis podem aparecer no corpo do e-mail se forem relevantes para o contexto.",
            "Para temas sensíveis ou técnicos (ex: KYC), prefira a saudação mais neutra: \"Oi, tudo bem?\" ou simplesmente \"Oi,\"."
          ] },
          { title: "Corpo do e-mail", list: [
            "A informação mais importante vem primeiro.", "Parágrafos curtos — máximo 3 linhas.",
            "Use listas para passo a passo e instruções e o numeral da lista deve estar usando a cor #C3032C. Confira as regras em Escrevendo para produto.",
            "Para destacar um botão ou área da plataforma no texto, use SemiBold.",
            "Título: Roboto - SemiBold - 23", "Descrição: Roboto - Regular 16"
          ] },
          { title: "CTA", list: ["Use apenas um CTA por e-mail. Sem botões secundários.", "Use os mesmos verbos e termos do corpo do e-mail e do fluxo no produto.", "Siga as regras de Botões."] },
          { title: "Call out", text: "Use ao final do e-mail para indicar ajuda extra sobre o tema. Use o template indicado nessa documentação. Fontes: Roboto - Regular - 14", after: "Exemplo: `Precisa de ajuda? Tire suas dúvidas na Central de ajuda ou Fale com a gente.`" },
          { title: "Footer", text: "Seção fixa — não altere o conteúdo. Para correções ou atualizações, entre em contato pelo canal #castanha-suporte." },
          { title: "Números", text: "Use para indicar senhas ou códigos enviados para a pessoa usuária.", after: "Exemplo: `1 2 3 4 5 6 7 8`" }
        ] },
        { h3: "Depois de escrever" },
        { ul: [
          "A informação mais importante aparece primeiro?", "Os termos são consistentes com o fluxo no produto?", "Os termos estão no Glossário Caju? Se não, solicite a inclusão.",
          "O texto pode ser resumido sem perder informação?", "Revisou ortografia e digitação?", "Pediu feedback de alguém familiarizado com o fluxo?"
        ] },
        { h3: "Aplicações" },
        { guides: [
          { title: "Precisamos de novas fotos", text: "Recebemos suas informações, mas não foi possível validar as fotos enviadas para criar o cadastro. Escolha como deseja enviar os documentos: Versão digital do documento · Versão física do documento · Foto do rosto (selfie).",
            attrs: notif("Precisamos de novas fotos", "É bem fácil enviar suas fotos novamente: 1. Acesse o app, digite seu e-mail e senha e clique em Entrar. 2. Informe o código de autenticação recebido por e-mail ou SMS e clique em Continuar. 3. Faça os ajustes dos problemas que indicamos e confirme o envio. A validação pode levar até 2 dias úteis", "Enviar as fotos novamente") },
          { title: "Nova autorização pendente", text: "A empresa [nome da empresa] solicitou autorização no seu app. Com a autorização, a empresa tem acesso aos seus dados e pode fazer recargas de saldo nas carteiras.",
            attrs: notif("Nova autorização pendente", "1. Acesse o app da Caju para colaboradores. 2. Informe seu CPF e senha e clique em Entrar. 3. Autorize sua nova empresa no app. Não reconhece essa empresa? Fale com seu RH para entender o que aconteceu. Se realmente for um engano, clique em Não reconheço esta empresa no app.") },
          { title: "Cartão adicionado", text: "Agora você já pode usar o cartão {{maskedNumber}} direto pelo seu dispositivo móvel com Apple Pay. Para a sua segurança, você pode conferir abaixo qual o dispositivo cadastrado e qual a data e hora em que o cartão foi adicionado.",
            attrs: notif("Cartão adicionado", "Não foi você? Recomendamos que bloqueie preventivamente seu cartão no app e entre em contato com a gente.") }
        ] },
        { h3: "Ferramentas e processo" },
        { p: "Os e-mails transacionais são publicados na plataforma de envio usada pela Caju. Para ter acesso, peça pelo canal de suporte do time; o passo a passo fica na documentação interna." },
        { ul: [
          "Evite criar novos modelos: sempre que possível, atualize um template existente.",
          "Template novo segue o padrão de nome `[Número no Figma] Jornada | Objetivo do e-mail [público-alvo]`. Exemplo: `[09] Cadastro | Menor de idade [colaboradores]`",
          "Em e-mails com variáveis, como códigos e senhas, peça para o dev da squad conferir antes de ativar."
        ] },

        { h2: "SMS" },
        { p: "SMS é um canal premium — o custo é cobrado por segmento e varia conforme o tipo de caractere usado. Use apenas em cenários de urgência real e alto impacto, quando o tempo de reação importa mais que o custo." },
        { h3: "Hierarquia de canais" },
        { p: "Avance para SMS apenas se os canais anteriores falharam ou se a urgência não permite esperar por eles." },
        { ol: ["Push (gratuito)", "E-mail (baixo custo)", "WhatsApp", "SMS (premium)"] },
        { h3: "Quando usar" },
        { table: { wrap: true, head: ["Cenário", "Exemplos"], rows: [
          ["Autenticação", "OTP, códigos, confirmação de acesso"], ["Segurança", "Login suspeito, alteração de dados críticos, acesso não reconhecido"],
          ["Financeiro crítico", "Cobrança próxima, acesso temporariamente limitado"], ["Ações com prazo", "Documentos pendentes, acesso expirado"]
        ] } },
        { h3: "Como escrever" },
        { ul: [
          "Sempre use \"Caju:\" antes do texto. Isso identifica o remetente, transmite confiança e evita confusão com golpes.",
          "Coloque a informação principal na primeira linha. A pessoa precisa entender o que está acontecendo de imediato.",
          "Use frases curtas e verbos diretos no imperativo: \"Acesse\", \"Envie\", \"Confirme\".",
          "Use links encurtados sempre. URLs completas desperdiçam caracteres e parecem suspeitas.",
          "Não use acentuação. Escreva sem til, acento agudo ou cedilha: \"voce\", \"acao\", \"adesao\", \"autenticacao\".",
          "Não use emojis — aumentam o tamanho em bytes e podem não renderizar em todos os dispositivos.",
          "Não use caixa alta na mensagem inteira.",
          "Evite palavras desnecessárias: artigos, preposições longas, locuções verbais quando um verbo direto resolve."
        ] },
        { p: "Exemplos:" },
        { ul: [
          "`Caju: Nao compartilhe com outras pessoas, nunca solicitamos senha ou dados do cartao. Codigo de autenticação {{code}} - MFA_ACTIVATION`",
          "`Caju: Envie os documentos pendentes para acessar o app: link.co/`",
          "`Caju: Fale com o RH da sua empresa para fazer cadastro no app`"
        ] },
        { h3: "Limites técnicos" },
        { ul: [
          "Teste sempre na ferramenta Message Segment Calculator da Twilio antes de enviar.",
          "O texto precisa ser GSM-7. Se virar Unicode, o custo aumenta — por isso a regra de não usar acentos ou emojis.",
          "Limite ideal: até 160 caracteres. Acima disso, o SMS quebra em mais de um segmento.",
          "Mantenha sempre 1 segmento. 2 segmentos custam o dobro; 3, o triplo."
        ] },
        { h3: "Checklist antes de enviar" },
        { ul: [
          "A mensagem não tem acento nem emoji?", "O link está encurtado?", "A situação é realmente urgente e de alto impacto?", "Outros canais já foram tentados antes?",
          "Existe risco de envio duplicado?", "A mensagem está em GSM-7 e dentro de 160 caracteres?", "A mensagem está em 1 segmento?"
        ] },
        { h3: "Métricas de controle" },
        { p: "Em caso de dúvida sobre o uso do canal, monitore:" },
        { table: { wrap: true, head: ["Métrica", "Cálculo"], rows: [["Custo por conversão", "custo total ÷ conversões"], ["Taxa de entrega", "entregues ÷ enviados"], ["Custo por pessoa impactada", "custo total ÷ pessoas impactadas"]] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Canais (Push, In-app, E-mails · Diretrizes de conteúdo, Aplicações, Ferramentas e processo, SMS). Tabelas em imagem transcritas; os exemplos de notificação usam Card e Link do DS; o mockup de anatomia do e-mail e o Template em HTML ficam de fora (C116)." }
      ] }
    ]
  };
})();
