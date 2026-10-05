/* Conteúdo — Princípios de escrita (Figma [CastanhaDS] Component use documentation · 📁 [NEW] Content → Como a Caju Fala,
   frame [Documentação] Princípios de escrita 6400:33150). O [OLD] Content é legado e fica de fora (PLANO-HUB).
   Textos literais do Figma; as telas de exemplo são refeitas com componentes do DS (as do Figma usam peças do app Employee). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-33150";
  CDS.register({ id: "conteudo", name: "Conteúdo", resource: true, order: 2, figma: FIGMA });
  var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
  // Tela de exemplo: ilustração + título + texto + Fixed Bar (Pilled) com a ação principal
  function screen(ill, title, text, action){
    return { _tag: "div", class: "pg-cnt-phone", _children: [
      { _tag: "div", class: "pg-cnt-phone__body", _children: [
        { _tag: "img", class: "pg-cnt-phone__ill", src: ills[ill] || "", alt: "" },
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text }
      ] },
      { _tag: "cds-fixed-bar", kind: "pilled", "primary-label": action, "show-secondary-action": false, "show-lead-icon": false }
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
  CDS.docs["conteudo"] = {
    source: FIGMA, sourceLabel: "Abrir Princípios de escrita no Figma",
    tabs: [
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
            text: "Não use infinitivo em títulos e não entre em detalhes de etapas futuras. Isso pode desestimular o usuário a finalizar o fluxo." }
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
      { id: "vocabulario", title: "Vocabulário e Nomenclatura", blocks: [
        { h2: "Glossário Caju" },
        { p: "Definições dos principais termos usados nos produtos da Caju tanto no texto da interface quanto em comunicações com pessoas usuárias." },
        { p: "Não encontrou um termo ou quer sugerir uma correção? Fale com o time de Content no canal #content-suporte." },
        { glossary: { label: "Buscar no glossário", placeholder: "Termo ou definição (ex.: cartão, acesso, pix)", letters: {
          A: [
            ["Acesso / Acessar", "Termo usado para a etapa de entrada nas plataformas da Caju.", "\"login\", é um estrangeirismo e termo interno."],
            ["Acesso por reconhecimento facial", "Acesso no aplicativo através do reconhecimento facial, digital ou pela senha do celular.", "\"acesso por biometria\" ou \"acesso por autenticação\"."],
            ["Adiantamentos", "Saldo depositado em Despesas para gastos corporativos. O depósito é feito antes do gasto, por isso se chama adiantamento."],
            ["Ajuste de crédito", "Ajuste em uma cobrança no cartão feito pelo estabelecimento. Pode ser positivo (ex: estorno de um item não disponível) ou negativo."],
            ["Alterar empresa", "Alteração do perfil da empresa no app para colaboradores. A pessoa pode usar o mesmo cartão físico para todas as empresas cadastradas.", "\"trocar empresa\" esse termo está vinculado à troca de carteiras."],
            ["App da Caju para colaboradores", "Nome completo da plataforma mobile da Caju. Pode ser abreviado para \"app para colaboradores\" ou \"app\" quando o espaço for limitado.", "\"employee app\" ou \"mobile\"."],
            ["Aproximação", "Pagamento com o cartão físico sem inserir o cartão na maquininha. Todos os cartões vêm com aproximação habilitada por padrão."],
            ["Autenticação em 2 etapas", "Segunda camada de proteção no app, confirmada por e-mail ou celular. É diferente do reconhecimento facial.", "\"verificação por 2 fatores\"."],
            ["Autorizar dispositivo", "Procedimento de segurança que permite o acesso ao app apenas em um dispositivo por vez.", "\"validar celular\"."],
            ["Autorizar empresa", "Quando a pessoa já teve cadastro na Caju em outra empresa, ela não precisa se cadastrar novamente apenas autoriza a nova empresa a acessar seus dados e fazer depósitos."],
            ["Auxílio Alimentação", "Categoria de benefícios para compras em restaurantes, mercados, açougues, padarias, hortifrutis, lanchonetes e apps de delivery."]
          ],
          B: [
            ["Bloqueio / Desbloqueio temporário", "Ação temporária de bloqueio ou desbloqueio dos cartões Caju (físico ou virtual). Pode ser feita pela Caju ou pela própria pessoa."]
          ],
          C: [
            ["Cadastro", "Etapa de cadastro no app feita pela pessoa colaboradora.", "\"ativar conta\"."],
            ["Cartão físico / Cartão Caju / Cartão do Colaborador", "Nome do cartão físico de Multibenefícios e Despesas para colaboradores. Use Cartão do Colaborador apenas no contexto de Sponsor app. Não deve aparecer em employee.", "\"plástico\" ou \"Cajuzinho\" reservados para comunicações de marketing."],
            ["Cartão virtual", "Sempre especifique se o cartão virtual é de Despesas ou de Benefícios."],
            ["Carteiras", "\"Bolsões\" de saldo. Hoje temos duas: Benefícios e Despesas. Para usar o saldo de uma carteira, ela precisa estar selecionada no app."],
            ["Carteiras digitais / wallets", "Apps como Samsung Wallet, Google Pay e Apple Pay, onde é possível adicionar o cartão virtual da Caju para pagamentos pelo celular.", "\"carteiras\" sozinho pode confundir com as carteiras de Benefícios e Despesas."],
            ["Categorias", "Definem em que tipo de estabelecimento o saldo pode ser usado. Podem ter saldo fixo ou flexível, conforme definido pela empresa."],
            ["Código de autenticação", "Código numérico de 6 dígitos enviado para o e-mail ou celular cadastrado para validar a tentativa de acesso.", "\"código de verificação\"."],
            ["Código de ativação", "Código numérico de 16 dígitos no verso do cartão físico, usado uma única vez para ativar o cartão."],
            ["Conta Caju", "Área para transferências via Pix, saques e pagamento de boletos. Reúne valores de Premiações, reembolsos de Despesas e depósitos de diferentes empresas em um único lugar. A tarifa é de 1,99% sobre o valor depositado pela empresa pacote que inclui Pix, boleto e saque, independente do porte da empresa.", "\"Saldo Caju\" nome descontinuado."],
            ["Contestação", "Quando a pessoa não reconhece uma transação no cartão ou no Pix, ela pode abrir uma contestação para receber o valor de volta, caso a fraude seja confirmada pela Caju."],
            ["Contratar", "Termo usado para a adesão de um dos produtos da Caju."],
            ["Crédito de confiança", "Valores recebidos de volta de pagamentos feitos com o cartão, originados de contestações. Aparece como positivo no extrato como Depósito. Se confirmado que não houve fraude, é feito o Resgate do crédito de confiança."],
            ["Créditos Caju", "Recarga feita dentro do Portal para que a empresa use o valor em créditos para pagar pedidos. A confirmação do pagamento ocorre em algumas horas."],
            ["Cultura", "Categoria de benefícios para compras em livrarias, ingressos de cinema, teatros e shows e assinaturas de streaming (Netflix, Spotify, Amazon Prime, etc)."]
          ],
          D: [
            ["Devolução", "Valores reembolsados por estabelecimentos via Pix ou boleto. Também usado para valores devolvidos via Pix originados de contestações."],
            ["Desbloquear cartão", "Processo de ativação do novo cartão físico da Caju. Etapa obrigatória para que o cartão possa ser usado.", "\"Ativar cartão\". Esse termo deixou de ser usado."]
          ],
          E: [
            ["Educação", "Categoria de benefícios para cursos online, idiomas e ensino técnico e superior."],
            ["Envio de saldo", "Envio de saldo flexível entre categorias na carteira de Benefícios. Substituiu \"Transferir saldo entre categorias\" com o lançamento do Pix o termo \"transferir\" ficou reservado para transações Pix."],
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
            ["Mobilidade", "Categoria de benefícios para recarga de cartão de transporte público, apps de transporte e abastecimento em postos de gasolina nacionais."],
            ["Multi", "Categoria que reúne todas as categorias de benefícios em uma só. A empresa deposita saldo sem precisar distribuir entre categorias específicas."]
          ],
          P: [
            ["Pix", "Sistema de pagamento instantâneo para transferências e pagamentos a qualquer hora e dia da semana. Na Caju, disponível apenas para pessoas com Saldo Caju.", "\"pix\" com p minúsculo regra do BACEN."],
            ["Portal da Caju para colaboradores", "Nome completo da plataforma web da Caju para colaboradores. Pode ser abreviado para \"Portal para colaboradores\". Sempre com P maiúsculo."],
            ["Portal da Caju para empresas", "Nome completo da plataforma web da Caju para empresas. Pode ser abreviado para \"Portal para empresas\" ou \"Portal\". Sempre com P maiúsculo.", "\"sponsor app\"."],
            ["Pré-cadastro", "Processo de cadastro dos dados do colaborador dentro do Portal para empresas pelo RH. A pessoa colaboradora ainda precisa realizar o cadastro no app depois."],
            ["Premiações", "Saldo depositado na Conta Caju para reconhecimento de colaboradores. Pode ser usado livremente."]
          ],
          R: [
            ["Rastrear", "Termo usado para indicar quando a pessoa pode localizar o cartão físico na rota de entrega."],
            ["Reembolso", "Valores que a pessoa colaboradora recebeu de volta da empresa ao gastar com despesas corporativas. O valor cai na Conta Caju ou é transferido para o banco de preferência da empresa."],
            ["Recuperar senha", "Ação de redefinição de senha.", "\"redefinir senha\"."],
            ["Resgate de saldo", "Ação no Portal para empresas que permite retirar o saldo depositado de uma pessoa colaboradora. Acontece em casos de contestação negada, expiração de adiantamento ou colaborador desligado."]
          ],
          S: [
            ["Saldo Livre", "Categoria que permite compras em qualquer loja, pagamento de boletos e saque. Volta como opção para depósito, simplificando o fluxo para empresas que não precisam de Pix. A empresa deposita o saldoe a pessoa colaboradora usa no cartão dentro de MCCs mais amplos. O Saldo Livre está disponível como opção, mas não deve ser incentivado ativamente nas comunicações."],
            ["Saldo Multi", "Categoria que reúne todas as categorias de benefícios em uma só. A empresa deposita saldo sem precisar distribuir entre categorias específicas. O Saldo Multi continua disponível, mas não deve ser incentivado ativamente nas comunicações."],
            ["Saúde", "Categoria de benefícios para compras em farmácias, exames médicos e apps de bem-estar (Zenklub, Headspace, Calm)."],
            ["Selfie", "Não use o termo sozinho. Sempre peça uma foto do rosto (selfie), com o termo em inglês entre parênteses."],
            ["Senha de acesso", "Senha usada para acessar o app do colaborador ou o Portal para empresas."],
            ["Senha do cartão", "Senha de 4 dígitos numéricos para transações com o cartão físico."],
            ["Senha temporária", "Senha numérica enviada por e-mail ou SMS para o primeiro acesso no app."]
          ],
          T: [
            ["Tarifa", "Custo cobrado por um serviço ou operação financeira.", "\"taxa\" confira as regras completas em Porcentagens e tarifas."],
            ["Termo de autorização para abertura de conta", "Documento enviado para menores de idade, onde o responsável legal assina e autoriza o cadastro na Caju."],
            ["Transações", "Pagamentos feitos com o Cartão Caju."]
          ],
          V: [
            ["Vale-transporte", "Benefício exclusivo para transporte público."],
            ["Voucher", "Modalidade de transação no cartão de benefícios, conforme o novo arranjo de cartões."]
          ]
        } } },

        { h2: "Naming de produto e funcionalidades" },
        { p: "Naming é o processo de dar nome às coisas. Mais importante que o nome em si são o significado, as associações e os sentimentos que ele desperta. Um bom nome não é escolhido ele é construído a partir de um processo." },
        { h3: "Tipos de nome" },
        { table: { head: ["Tipo", "Definição", "Exemplos"], rows: [
          ["Descritivo", "Descreve o que o produto faz. Didático e de interpretação rápida. Indicado para públicos técnicos e relacionamentos B2B.", "Google Ads, Telefonica"],
          ["Associativo", "Não descreve literalmente, mas sugere por associação.", "iFood, Waze, Spotify"],
          ["Antropônimo", "Nome de pessoa — geralmente o criador da marca. Depende de uma personalidade forte e reconhecida.", "Lacoste, Walt Disney"],
          ["Topônimo", "Nome de lugar já existente — país, cidade, bairro, rio.", "Arizona, Arezzo, Kopenhagen"],
          ["Acrônimo", "Sigla formada pelas iniciais de outras palavras.", "IBM, CNN, 3M"],
          ["Transgressor", "Não se encaixa em nenhuma categoria.", "Apple"]
        ] } },
        { h3: "O processo de naming" },
        { steps: [
          { title: "Nomeie o projeto", text: "Antes de nomear o produto, dê um nome temporário ao projeto isso evita que o nome do projeto vire o nome do produto por falta de alternativa. Use termos internos ou criativos: \"Projeto Engajamento\", \"Projeto HCM\"." },
          { title: "Defina o tipo de nome", text: "Responda:", list: [
            "Qual tipo de nome é mais adequado para essa funcionalidade ou produto?",
            "Cite 2 exemplos de nomes de produto que podem servir de referência.",
            "Como os concorrentes nomeiam produtos similares? Isso é bom ou ruim para a Caju?"
          ] },
          { title: "Conecte com a essência da marca", text: "O nome precisa conversar com os atributos da Caju: facilidade, versatilidade e brasilidade. Quando não souber por onde começar, volte para esses três pilares." },
          { title: "Defina as associações pretendidas", text: [
            "Que mensagens e sensações você quer que o nome transmita? Coloque o nome do projeto no centro de um mindmap e mapeie as associações que quer criar e depois justifique por que a pessoa usuária acreditaria nessas associações a partir do que o produto faz.",
            "Esse exercício também serve para validar o nome escolhido: se o nome não sustenta as associações que você listou, ele provavelmente não é o certo."
          ] },
          { title: "Brainstorming", text: "Envolva pessoas de fora do contexto do time elas estarão livres de vícios que o time pode ter desenvolvido em relação ao tema. Sugestão de dinâmica:", list: [
            "20 min contextualize os participantes: o que o produto resolve, quem é o público, como conversa com a estratégia da Caju.",
            "30 min geração livre de nomes em um quadro no Miro ou FigJam.",
            "30 min cada participante explica seu racional."
          ], after: "Importante: Não use estrangeirismos confira as regras em Termos para evitar." },
          { title: "Categorize os nomes", text: [
            "Depois da dinâmica, agrupe os nomes por tipo e por atributo. Ainda não é hora de eliminar registre tudo.",
            "Monte uma tabela cruzando tipo de nome (horizontal) com atributos e associações (vertical). Isso vai facilitar a seleção na próxima etapa."
          ] },
          { title: "Filtro e seleção", text: "Com a tabela em mãos, faça rodadas eliminatórias com seus stakeholders. A cada rodada, questione:", list: [
            "Qual tipo de nome é mais adequado para esse produto?",
            "Qual atributo é mais essencial?",
            "O nome conflita com algum produto ou funcionalidade já existente na Caju?",
            "Há riscos jurídicos?"
          ], after: "Registre o resultado de cada rodada você pode precisar resgatar um nome que ficou pelo caminho." },
          { title: "Critérios de desempate", text: "Ainda dividido entre dois nomes? Avalie:", table: { head: ["Critério", "Pergunta"], rows: [
            ["Elasticidade", "Como esse nome se comporta no ecossistema de produtos da Caju?"],
            ["Som e imagem", "Quais significados e associações ele carrega — inclusive os indesejados?"],
            ["Longevidade", "O nome vai envelhecer bem? Evite nomes ligados a tecnologias específicas."],
            ["Rejeição", "O que vem à mente de quem ouve esse nome? Faça uma pesquisa qualitativa se possível."]
          ] } }
        ] },
        { h3: "Prompt para IA" },
        { p: "Não tem tempo para o processo completo? Use o prompt abaixo para funcionalidades de baixa complexidade." },
        { alert: { appearance: "warning", label: "Atenção", text: "A etapa de filtro e seleção não pode ser delegada para a IA ela precisa ser feita com o time e stakeholders." } },
        { p: "Como usar: cole o prompt no Claude ou no Gemini e responda as perguntas conforme forem sendo feitas." },
        { code: "CONTEXTO\nVocê é um assistente para o processo de naming de funcionalidades e produtos na Caju. Você vai rodar um framework e ao final chegaremos a no mínimo 5 opções de nomes para que o time tome a decisão.\n\nPROCESSO\n1. Pergunte o nome temporário do projeto.\n2. Pergunte qual tipo de nome é mais adequado (Descritivo, Associativo, Antropônimo, Topônimo, Acrônimo ou Transgressor).\n3. Pergunte quais atributos da Caju o produto deve reforçar (facilidade, versatilidade, brasilidade ou outros).\n4. Pergunte quais associações e sensações o nome deve transmitir.\n5. Gere uma lista de nomes com base nas respostas.\n6. Pergunte se quer novas opções. Peça para escolher no mínimo 5 nomes para continuar.\n7. Com os 5 nomes escolhidos, monte uma tabela cruzando tipo de nome (horizontal) com atributos e associações (vertical).\n8. Informe que o processo de filtro e validação precisa ser feito com o time essa etapa não pode ser delegada para a IA.\n\nRESTRIÇÕES\nNão sugira os seguintes termos: Benefícios, Ciclos, Caju Mais, Hub, Multibenefícios.\nNão use estrangeirismos." },

        { h2: "Termos para evitar" },
        { p: "Esta página reúne os termos que não usamos nos produtos da Caju e os motivos para cada escolha. Quando houver dúvida entre dois termos, consulte também o Glossário Caju." },
        { h3: "Estrangeirismos" },
        { p: "Palavras estrangeiras vão contra a brasilidade um dos pilares da marca Caju. Além disso, leitores de tela leem no idioma em que estão configurados, o que pode comprometer a acessibilidade." },
        { table: { head: ["Não use", "Use"], rows: [
          ["Download", "Baixar"], ["Feedback", "Sugerir, sugestão"], ["Gift", "Cartão-presente, premiação"], ["Login", "Entrar, acessar"], ["MFA", "Código de autenticação"],
          ["Status", "Situação, andamento — exceção: permitido em documentação interna e nomes de categoria"], ["Upgrade", "Melhorar, aumentar, evoluir"], ["Upload", "Carregar"],
          ["Tips", "Dicas"], ["Dashboard", "Painel"], ["Overview", "Resumo"]
        ] } },
        { h3: "Verbos sensoriais" },
        { p: "Verbos sensoriais descrevem os cinco sentidos e são comuns na linguagem cotidiana, mas criam barreiras de acessibilidade e inclusão. Nem todas as pessoas experienciam o mundo da mesma forma." },
        { table: { head: ["Não use", "Use"], rows: [
          ["Ver, visualizar", "Conferir, mostrar, abrir, acessar"], ["Ver mais", "Abrir {variável}, acessar {variável}"], ["Prove a experiência", "Explore, descubra"], ["Ouvir", "Reproduzir, tocar"]
        ] } },
        { h3: "Gírias, jargões e regionalismos" },
        { p: "A Caju usa gírias e regionalismos no branding mas não no produto. Na interface, precisamos garantir o entendimento de todas as pessoas usuárias, independente de região ou contexto." },
        { p: "Nosso estilo é simples e humano, mas isso não é uma abertura para termos conhecidos apenas por uma bolha ou região." },
        { table: { head: ["Não use", "Por quê"], rows: [
          ["Desenrolar, resolver na mão", "Jargão informal que pode soar descuidado em contextos financeiros"],
          ["Vixe, Ops", "Interjeições regionais ou infantis — evite em qualquer momento"],
          ["Mandar ver, arrasar", "Gírias que podem não ser compreendidas por toda a base"]
        ] } },
        { h3: "Termos que causam ansiedade ou perda de confiança" },
        { p: "Algumas palavras tecnicamente corretas geram reações negativas nas pessoas usuárias confirmado em pesquisas realizadas no Maze. Prefira sempre as alternativas." },
        { table: { head: ["Não use", "Use", "Por quê"], rows: [
          ["Bloqueado", "Temporariamente limitado", "\"Bloqueado\" soa como punição"],
          ["Agora", "—", "Palavras de comando aumentam a ansiedade"],
          ["Libere", "—", "Mesmo efeito de \"Agora\""],
          ["Garantir", "Proteger, manter", "Soa como venda de serviço ou brinde"],
          ["Taxa", "Tarifa", "Confira as regras em Porcentagens e tarifas"],
          ["Biometria", "Reconhecimento facial", "\"Biometria\" foi confundida com biometria de dedo em testes"]
        ] } },
        { h3: "Termos internos" },
        { p: "Termos usados internamente pelo time da Caju que não devem aparecer no produto ou em comunicações com pessoas usuárias." },
        { table: { head: ["Não use", "Use"], rows: [
          ["Employee app", "App da Caju para colaboradores, app para colaboradores"], ["Sponsor app", "Portal da Caju para empresas, Portal para empresas"],
          ["Feature", "Funcionalidade"], ["BU", "Área, unidade de negócio"], ["Cajuzinho", "Cartão físico de Benefícios"], ["Plástico", "Cartão físico de Benefícios"],
          ["2ª via", "Novo cartão"], ["Conta digital", "Conta Caju"]
        ] } },

        { h2: "Abreviação e siglas" },
        { h3: "Siglas" },
        { ul: [
          "Sempre escreva o nome completo na primeira menção, seguido da sigla entre parênteses. Nas menções seguintes, use apenas a sigla.",
          "Use caixa alta para siglas nunca minúsculo.",
          "Não use ponto entre as letras."
        ] },
        { table: { head: ["Faça", "Não faça"], rows: [
          ["O custo efetivo total (CET) inclui todas as tarifas. O CET é calculado anualmente.", "O C.E.T. inclui todas as tarifas."], ["IOF", "I.O.F."]
        ] } },
        { h3: "Siglas da Caju" },
        { p: "Algumas siglas são usadas com frequência nos produtos da Caju. Sempre que aparecerem pela primeira vez em uma tela ou comunicação, escreva o nome completo." },
        { table: { head: ["Sigla", "Nome completo"], rows: [
          ["CPF", "Cadastro de Pessoas Físicas"], ["CNPJ", "Cadastro Nacional da Pessoa Jurídica"], ["CET", "Custo Efetivo Total"], ["IOF", "Imposto sobre Operações Financeiras"],
          ["MCC", "Merchant Category Code — código de categoria do estabelecimento"], ["OTP", "Código de uso único — use sempre \"código de autenticação\" no produto"],
          ["RG", "Registro Geral"], ["PIX", "Pagamentos Instantâneos — sempre com P maiúsculo, por regra do BACEN"]
        ] } },
        { h3: "Abreviações de data e hora" },
        { p: "Use abreviações apenas quando o componente não permitir o nome completo. Sempre com primeira letra maiúscula. Confira mais detalhes em Data e horários." },
        { h3: "O que não abreviamos" },
        { p: "Alguns termos são abreviados no mercado mas não usamos na Caju ou porque geram confusão, ou porque conflitam com outros termos." },
        { table: { head: ["Não use", "Use"], rows: [
          ["2ª via", "Novo cartão"], ["Tel, Fone", "Celular, número de celular"], ["Qtd", "Quantidade"], ["Nº", "Use \"#\" para número de pedido no Sponsor. Nas demais situações, escreva por extenso"]
        ] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Vocabulário e Nomenclatura (Glossário Caju, Naming de produto e funcionalidades, Termos para evitar, Abreviação e siglas). As tabelas são imagens no Figma e foram transcritas como texto (C112)." }
      ] }
    ]
  };
})();
