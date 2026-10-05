/* Conteúdo — Princípios de escrita (Figma [CastanhaDS] Component use documentation · 📁 [NEW] Content → Como a Caju Fala,
   frame [Documentação] Princípios de escrita 6400:33150). O [OLD] Content é legado e fica de fora (PLANO-HUB).
   Textos literais do Figma; as telas de exemplo são refeitas com componentes do DS (as do Figma usam peças do app Employee). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-33150";
  CDS.register({ id: "conteudo", name: "Conteúdo", resource: true, order: 2, figma: FIGMA });
  var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
  // Tela de exemplo: ilustração + título + texto + Fixed Bar (Pilled) com a ação principal
  function screen(ill, title, text, action, secondary){
    return { _tag: "div", class: "pg-cnt-phone", _children: [
      { _tag: "div", class: "pg-cnt-phone__body", _children: [
        { _tag: "img", class: "pg-cnt-phone__ill", src: ills[ill] || "", alt: "" },
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text }
      ] }
    ].concat(action ? [{ _tag: "cds-fixed-bar", kind: "pilled", "primary-label": action, "show-secondary-action": !!secondary, "secondary-label": secondary || null, "show-lead-icon": false }] : []) }; // sem ação: tela sem Fixed Bar
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
  // Abas (Scrollable Tab do DS) e Breadcrumb do DS com rótulos reais, para os Do/Don't de Componentes
  function tabs(labels){ return { _tag: "cds-scrollable-tab", label: "Exemplo de abas", _children: labels.map(function(l){ return { _tag: "cds-tab-item", label: l }; }) }; }
  function crumbs(labels){ return { _tag: "cds-breadcrumb", collapse: "0", _children: labels.map(function(l){ return { _tag: "a", href: "#", _text: l }; }) }; }
  // Bottom Sheet (inline) com título, texto e duas ações em Main Buttons sem ícone (o Footer do sheet não expõe o Lead Icon)
  function sheetActions(title, text, a, b){
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "show-header": false, "show-footer": false, _children: [
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", label: a, "show-lead-icon": false, "show-trailing-icon": false },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", appearance: "neutral", label: b, "show-lead-icon": false, "show-trailing-icon": false }
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
            ["Cartão físico / Cartão Caju / Cartão do Colaborador", "Nome do cartão físico de Multibenefícios e Despesas para colaboradores. Use ”Cartão do Colaborador” apenas no contexto de Sponsor app. Não deve aparecer em employee.", "\"plástico\" ou \"Cajuzinho\" — reservados para comunicações de marketing."],
            ["Cartão virtual", "Sempre especifique se o cartão virtual é de Despesas ou de Benefícios."],
            ["Carteiras", "\"Bolsões\" de saldo. Hoje temos duas: Benefícios e Despesas. Para usar o saldo de uma carteira, ela precisa estar selecionada no app."],
            ["Carteiras digitais / wallets", "Apps como Samsung Wallet, Google Pay e Apple Pay, onde é possível adicionar o cartão virtual da Caju para pagamentos pelo celular.", "\"carteiras\" sozinho — pode confundir com as carteiras de Benefícios e Despesas."],
            ["Categorias", "Definem em que tipo de estabelecimento o saldo pode ser usado. Podem ter saldo fixo ou flexível, conforme definido pela empresa."],
            ["Código de autenticação", "Código numérico de 6 dígitos enviado para o e-mail ou celular cadastrado para validar a tentativa de acesso.", "\"código de verificação\"."],
            ["Código de ativação", "Código numérico de 16 dígitos no verso do cartão físico, usado uma única vez para ativar o cartão."],
            ["Conta Caju", "Área para transferências via Pix, saques e pagamento de boletos. Reúne valores de Premiações, reembolsos de Despesas e depósitos de diferentes empresas em um único lugar. A tarifa é de 1,99% sobre o valor depositado pela empresa — pacote que inclui Pix, boleto e saque, independente do porte da empresa.", "\"Saldo Caju\" — nome descontinuado."],
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
            ["Mobilidade", "Categoria de benefícios para recarga de cartão de transporte público, apps de transporte e abastecimento em postos de gasolina nacionais."],
            ["Multi", "Categoria que reúne todas as categorias de benefícios em uma só. A empresa deposita saldo sem precisar distribuir entre categorias específicas."]
          ],
          P: [
            ["Pix", "Sistema de pagamento instantâneo para transferências e pagamentos a qualquer hora e dia da semana. Na Caju, disponível apenas para pessoas com Saldo Caju.", "\"pix\" com p minúsculo — regra do BACEN."],
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
            ["Tarifa", "Custo cobrado por um serviço ou operação financeira.", "\"taxa\" — confira as regras completas em Porcentagens e tarifas."],
            ["Termo de autorização para abertura de conta", "Documento enviado para menores de idade, onde o responsável legal assina e autoriza o cadastro na Caju."],
            ["Transações", "Pagamentos feitos com o Cartão Caju."]
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
          ["Download", "Baixar"], ["Feedback", "Sugerir, sugestão"], ["Gift", "Cartão-presente, premiação"], ["Login", "Entrar, acessar"], ["MFA", "Código de autenticação"],
          ["Status", "Situação, andamento — exceção: permitido em documentação interna e nomes de categoria"], ["Upgrade", "Melhorar, aumentar, evoluir"], ["Upload", "Carregar"],
          ["Tips", "Dicas"], ["Dashboard", "Painel"], ["Overview", "Resumo"]
        ] } },
        { h3: "Verbos sensoriais" },
        { p: "Verbos sensoriais descrevem os cinco sentidos e são comuns na linguagem cotidiana, mas criam barreiras de acessibilidade e inclusão. Nem todas as pessoas experienciam o mundo da mesma forma." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["Ver, visualizar", "Conferir, mostrar, abrir, acessar"], ["Ver mais", "Abrir {variável}, acessar {variável}"], ["Prove a experiência", "Explore, descubra"], ["Ouvir", "Reproduzir, tocar"]
        ] } },
        { h3: "Gírias, jargões e regionalismos" },
        { p: "A Caju usa gírias e regionalismos no branding — mas não no produto. Na interface, precisamos garantir o entendimento de todas as pessoas usuárias, independente de região ou contexto." },
        { p: "Nosso estilo é simples e humano, mas isso não é uma abertura para termos conhecidos apenas por uma bolha ou região." },
        { table: { wrap: true, head: ["Não use", "Por quê"], rows: [
          ["Desenrolar, resolver na mão", "Jargão informal que pode soar descuidado em contextos financeiros"],
          ["Vixe, Ops", "Interjeições regionais ou infantis — evite em qualquer momento"],
          ["Mandar ver, arrasar", "Gírias que podem não ser compreendidas por toda a base"]
        ] } },
        { h3: "Termos que causam ansiedade ou perda de confiança" },
        { p: "Algumas palavras tecnicamente corretas geram reações negativas nas pessoas usuárias — confirmado em pesquisas realizadas no Maze. Prefira sempre as alternativas." },
        { table: { wrap: true, head: ["Não use", "Use", "Por quê"], rows: [
          ["Bloqueado", "Temporariamente limitado", "\"Bloqueado\" soa como punição"],
          ["Agora", "—", "Palavras de comando aumentam a ansiedade"],
          ["Libere", "—", "Mesmo efeito de \"Agora\""],
          ["Garantir", "Proteger, manter", "Soa como venda de serviço ou brinde"],
          ["Taxa", "Tarifa", "Confira as regras em Porcentagens e tarifas"],
          ["Biometria", "Reconhecimento facial", "\"Biometria\" foi confundida com biometria de dedo em testes"]
        ] } },
        { h3: "Termos internos" },
        { p: "Termos usados internamente pelo time da Caju que não devem aparecer no produto ou em comunicações com pessoas usuárias." },
        { table: { wrap: true, head: ["Não use", "Use"], rows: [
          ["Employee app", "App da Caju para colaboradores, app para colaboradores"], ["Sponsor app", "Portal da Caju para empresas, Portal para empresas"],
          ["Feature", "Funcionalidade"], ["BU", "Área, unidade de negócio"], ["Cajuzinho", "Cartão físico de Benefícios"], ["Plástico", "Cartão físico de Benefícios"],
          ["2ª via", "Novo cartão"], ["Conta digital", "Conta Caju"]
        ] } },

        { h2: "Abreviação e siglas" },
        { h3: "Siglas" },
        { ul: [
          "Sempre escreva o nome completo na primeira menção, seguido da sigla entre parênteses. Nas menções seguintes, use apenas a sigla.",
          "Use caixa alta para siglas — nunca minúsculo.",
          "Não use ponto entre as letras."
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["O custo efetivo total (CET) inclui todas as tarifas. O CET é calculado anualmente.", "O C.E.T. inclui todas as tarifas."], ["IOF", "I.O.F."]
        ] } },
        { h3: "Siglas da Caju" },
        { p: "Algumas siglas são usadas com frequência nos produtos da Caju. Sempre que aparecerem pela primeira vez em uma tela ou comunicação, escreva o nome completo." },
        { table: { wrap: true, head: ["Sigla", "Nome completo"], rows: [
          ["CPF", "Cadastro de Pessoas Físicas"], ["CNPJ", "Cadastro Nacional da Pessoa Jurídica"], ["CET", "Custo Efetivo Total"], ["IOF", "Imposto sobre Operações Financeiras"],
          ["MCC", "Merchant Category Code — código de categoria do estabelecimento"], ["OTP", "Código de uso único — use sempre \"código de autenticação\" no produto"],
          ["RG", "Registro Geral"], ["PIX", "Pagamentos Instantâneos — sempre com P maiúsculo, por regra do BACEN"]
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
        { h3: "Ponto de exclamação (!)" },
        { p: "Use apenas em descrições — nunca em títulos, mesmo em momentos felizes. Use no máximo um por tela. Muitas exclamações soam como urgência forçada ou infantilidade. Nunca use duplos ou triplos (!!!)." },
        { h3: "Ponto de interrogação (?)" },
        { p: "Use para confirmar uma informação com a pessoa. Evite colocar viés na pergunta — isso pode causar insegurança. Nunca use duplos ou triplos (???)." },
        { h3: "Dois pontos (:)" },
        { ul: ["Use para introduzir uma lista ou dar mais explicações após um tema.", "Não use em títulos.", "Não use letra maiúscula depois dos dois pontos.", "Em leitores de tela, o comportamento é de uma pequena pausa."] },
        { h3: "Vírgula (,)" },
        { p: "Use no máximo 3 vírgulas por frase. Mais que isso é sinal de que o texto precisa ser quebrado em frases menores. Siga as regras gramaticais da língua portuguesa." },
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
        { ul: ["Use em contextos leves: avisos amigáveis, celebrações, confirmações", "Apenas em textos de apoio (descrições), nunca em títulos", "Sempre ao final da frase, nunca no início ou no meio", "Nunca em fluxos críticos: pagamento, erro, dados sensíveis"] },
        { table: { wrap: true, head: ["Momento de uso", "Emoji"], rows: [
          ["Humanização e acolhimento", "🙌 🤗 🤝 🧡"], ["Celebrar conquistas e avanços", "🎉 🏆 ✨ ⭐ 🎯 ✅ 💡"], ["Guiar o olhar ou chamar atenção", "🔔 📢 👀"], ["Contexto corporativo ou benefícios", "💼 💳 📝 📊 💰"]
        ] } },
        { h3: "Listas" },
        { p: "Use para facilitar o escaneamento. Use no máximo uma lista por tela. Não pontue os itens." },
        { ul: ["Bullet points — para itens sem ordem específica e de pesos iguais.", "Lista numerada — para sequências de ações ou instruções."] },
        { h3: "Negrito" },
        { p: "Use com moderação, o excesso desvia a atenção e pode dificultar a leitura de pessoas neurodivergentes." },
        { p: "Use para destacar informações relevantes. Nunca use como substituto de títulos (H2, H3)." },
        { h3: "O que não usamos" },
        { table: { wrap: true, head: ["Recurso", "Por quê"], rows: [
          ["Itálico", "Inclina e aproxima os caracteres, dificultando a leitura."],
          ["Tachado", "Pode impossibilitar o entendimento e não tem feedback em leitores de tela."],
          ["Travessão (–)", "Para pausar o texto, prefira vírgula ou ponto final."],
          ["Barra vertical (|)", "Para separar frases, prefira vírgula ou ponto final."],
          ["Ponto e vírgula (;)", "Para pausar o texto, prefira vírgula ou ponto final. Nunca ao final de itens de lista."],
          ["E comercial (&)", "Exceto quando fizer parte do nome de uma marca ou parceiro."],
          ["Aspas (\"\")", "Para destacar botões ou áreas do produto, use negrito."],
          ["Sublinhado", "Reservado exclusivamente para links."],
          ["Asterisco (*)", "Interrompe o fluxo de leitura, especialmente em leitores de tela."]
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
        { h3: "Aplicações" },
        { table: { wrap: true, head: ["Exemplo", "Onde"], rows: [
          ["`Caiu reembolso R$ 25,80`", "Extrato"],
          ["`Existe uma tarfia de R$ 1,99 para depósitos em Saldo Livre.`", "Alert"],
          ["`Pix enviado −R$ 45,00`", "Extrato"],
          ["`Compra no cartão −R$ 131,44`", "Extrato"],
          ["`Pix de R$ 1.000,00 para Juca Castanha •••.456.789-•• enviado.`", "Push notification"]
        ] } },
        { p: "Para regras de mascaramento de valores em comprovantes e extratos, consulte Mascaramento e omissão de dados." },

        { h2: "Códigos e dados pessoais" },
        { p: "Nesta seção, você consulta como formatar alguns dados. Para regras de mascaramento, consulte Mascaramento e omissão de dados." },
        { table: { wrap: true, head: ["Dado", "Como apresentar"], rows: [
          ["Cartões", "O cartão tem xx dígitos numéricos. Apresente em blocos de"],
          ["Código de ativação", "Apresente em blocos de 4 números separados por espaço."],
          ["Código de autenticação", "Códigos de 6 dígitos. Apresente todos os números seguidos, sem espaçamento."],
          ["Senha do cartão", "Senha de 4 números. Apresente todos os números seguidos, sem espaçamento."],
          ["Celular", "Use sempre o formato com DDD. Ao pedir o número como input, oriente que o DDD é obrigatório. Use o termo \"celular\" ou \"número de celular\" — nunca \"telefone\"."]
        ] } },
        { h3: "Aplicações" },
        { table: { wrap: true, head: ["Exemplo", "Onde"], rows: [
          ["`Informe o código de autenticação: 123456`", "Código de autenticação"],
          ["`Seu código de ativação é: 123 456 789 101 112`", "Código de ativação"],
          ["`(99) 9 9999-9999`", "Celular"]
        ] } },

        { h2: "Datas e horários" },
        { p: "Use o formato de acordo com o espaço disponível no componente." },
        { h3: "Datas" },
        { ul: [
          "Formato completo: `01 de janeiro de 2025`",
          "Formato compacto: `01/12/2025` ou `12/25`",
          "Se o componente não permitir o nome completo, use abreviações com a primeira letra maiúscula. Exemplo: `Segunda = Seg`, `Janeiro = Jan`",
          "No extrato, use o formato completo. Se a transação for do ano atual, omita o ano. Exemplo: `04 de janeiro`",
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

        { h2: "Quantidades e unidades" },
        { h3: "Numerais" },
        { ul: [
          "Use numerais em vez de escrever o número por extenso. Números são informações importantes e ficam mais fáceis de escanear em formato numérico. Exemplo: `Você tem 3 cartões virtuais ativos`",
          "Escreva por extenso apenas quando o número fizer parte de uma expressão da língua portuguesa. Exemplo: `A Caju tem mil e uma utilidades`"
        ] },
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

        { h2: "Mascaramento e omissão de dados" },
        { ul: [
          "Use mascaramento sempre que um dado sensível precisar aparecer na tela, mas não pode estar completamente visível.",
          "Use sempre bullet points (`•`) para mascarar. Nunca asterisco (`*`) nem elipse (`...`)."
        ] },
        { h3: "O que mostrar" },
        { table: { wrap: true, head: ["Dado", "Regra"], rows: [
          ["CPF", "De acordo com o BACEN, mostre os 6 números do meio — `•••.456.789-••`"],
          ["Números do cartão", "Mostre apenas os 4 últimos números — `•••• •••• •••• 1234`"],
          ["Celular", "Não precisa mascarar"],
          ["E-mail", "Mostre apenas o provedor (gmail) e a 1ª e as 2 últimas letras do e-mail - `j•••••••••sd@gmai.com`"],
          ["Push notification", "`Pix de R$ 1.000,00 para Juca Castanha •••.456.789-•• enviado.`"]
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
          "Quando não houver tarifa, use ”Sem tarifa” ou ”Isento de tarifa”."
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Formatação de dados (Regras universais, Valores monetários e moedas, Códigos e dados pessoais, Datas e horários, Quantidades e unidades, Mascaramento e omissão de dados, Porcentagens e tarifas). Exemplos em `código`, como no Figma (C113)." }
      ] }
      ,
      { id: "componentes", title: "Componentes", blocks: [
        { h2: "Tabs" },
        { p: "As tabs funcionam como placas de sinalização da interface. A pessoa usuária deve saber exatamente o que vai encontrar antes mesmo de clicar." },
        { h3: "Como nomear tabs" },
        { p: "Use verbos no infinitivo ou substantivos — escolha o que melhor representa o conteúdo da aba." },
        { ul: ["Quando o foco é uma ação, use infinitivo: `Gerenciar cartões`", "Quando o foco é uma área, use substantivos: `Histórico de pedidos`"] },
        { h3: "Regras de escrita" },
        { ul: ["Primeira letra maiúscula, demais em minúsculo", "Sem ponto final ou qualquer outra pontuação", "Sem quebra de linha, o copy deve caber em uma linha", "Sem estrangeirismos se houver equivalente em português. Exemplo: use Painel e não Dashboard"] },
        { h3: "Boas práticas" },
        { ul: [
          "Evite termos genéricos que não dizem nada: \"Visão geral\", \"Outros\". A tab deve responder o que a pessoa vai encontrar ou o que é possível fazer ali.",
          "A ordem das tabs (da esquerda para a direita) deve refletir a importância da tarefa ou a frequência de uso na jornada.",
          "Use entre 2 e 5 tabs. Muitas opções dificultam a leitura e a decisão, especialmente em mobile."
        ] },
        { h3: "Como pedir ajuda ao Borô" },
        { p: "Ao solicitar novos nomes ou revisão de tabs, sempre forneça o contexto da arquitetura e uma descrição funcional da área." },
        { code: "A tab está localizada em [caminho da navegação]. Nesta área é possível: ]liste ações e visualizações disponíveis]." },
        { p: "Exemplo: A tab está localizada no Portal para empresas em Despesas → Adiantamentos. Nesta área a pessoa encontra o saldo disponível de cada colaborador e o número de adiantamentos. Também é possível adicionar ou resgatar saldo individualmente. Não é possível criar novos adiantamentos ou adicionar colaboradores." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", text: "Utilize labels diretos e curtos que informem o conteúdo sem que a pessoa usuária tenha necessidade de clicar." },
          { kind: "dont", text: "Não utilize as Tabs como filtros. Caso precise adicionar um mecanismo de filtragem, reveja a experiência e opte por outro componente." },
          { kind: "do", attrs: tabs(["Painel de premiações", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "O usuário deve conseguir prever o conteúdo antes de clicar." },
          { kind: "dont", attrs: tabs(["Dashboard", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "Termos genéricos e estrangeiros." }
        ] },

        { h2: "Botões" },
        { p: "O texto do botão é o contrato com a pessoa usuária: ela precisa saber exatamente o que vai acontecer antes de clicar." },
        { h3: "Como escrever" },
        { ul: [
          "Use infinitivo em botões e áreas clicáveis. Não use pronomes possessivos.",
          "Se precisar usar pronome, use na terceira pessoa (seu/sua).",
          "Use imperativo apenas em botões de peças de marketing.",
          "O texto deve seguir os mesmos termos usados no título e na descrição da tela. A pessoa deve conseguir ler o header e o botão e relacionar as duas informações.",
          "Use no máximo 3 palavras. Nunca quebre o texto em mais de uma linha.",
          "Nunca use ponto final ou ponto de exclamação.",
          "Evite labels genéricas como \"Sim\", \"Não\", ”Entendi” ou \"Ok\". Seja específico."
        ] },
        { h3: "Ações destrutivas" },
        { p: "Mesmo sem um estilo visual específico, deixe claro na label quando a ação é irreversível. A pessoa não pode ter dúvida sobre o que vai acontecer. Exemplo:" },
        { display: { attrs: [
          { _tag: "cds-main-button", label: "Sair sem salvar", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Remover colaborador", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Sair do app", "show-lead-icon": false, "show-trailing-icon": false }
        ] } },
        { h3: "Labels padronizadas" },
        { table: { wrap: true, head: ["Label", "Quando usar"], rows: [
          ["Aplicar", "CTA padrão para aplicar filtros selecionados."],
          ["Cancelar", "Quando a pessoa desiste de uma edição, sem sair do fluxo. Sempre aparece junto com \"Salvar alterações\"."],
          ["Confirmar", "Final de fluxo onde a última tela é uma revisão de dados antes da conclusão da ação."],
          ["Concluir", "Encerra onboardings que tem mais de uma etapa."],
          ["Continuar", "Avança para a próxima etapa sem finalizar o fluxo. Não usar em telas de revisão ou encerramento."],
          ["Continuar editando", "Pop-ups ou bottom sheets que desistem de uma confirmação. Nunca use \"Cancelar\" nesses casos. Exceção: use \"Voltar\" quando o contexto não for coerente com \"edição\"."],
          ["Detalhes", "Abre mais informações sobre uma área, colaborador ou pedido."],
          ["Dúvidas frequentes", "Leva para artigo na FAQ. Uso exclusivo no componente shortcut."],
          ["Falar com a Caju", "Abre WhatsApp ou e-mail do time de CX."],
          ["Fechar", "Encerra algo sem impacto ou decisão (onboardings, modais informativos). Também usado quando o modal não tem \"X\" no canto superior."],
          ["Já recebi e quero ativar", "Texto fixo — não modifique. Caso seja alterado, deve ser atualizada a carta berço do cartão físico."],
          ["Limpar", "Remove os filtros aplicados."],
          ["Me lembrar mais tarde", "Fecha pop-ups ou bottom sheets que voltam a aparecer até a ação ser concluída."],
          ["Não encontrei o código", "Telas de código de ativação, abre modal explicativo sobre onde encontrar o código."],
          ["Não mostrar novamente", "Encerra pop-ups ou bottom sheets que não voltam a aparecer."],
          ["Preciso de ajuda", "Abre artigos da FAQ."],
          ["Pular", "Pula uma etapa não obrigatória do fluxo."],
          ["Quero saber mais", "Abre artigo ou categoria da FAQ sobre novidades. Tom mais leve que \"Preciso de ajuda\"."],
          ["Quero ser avisado", "A pessoa sinaliza que quer ser comunicada sobre uma mudança ou retorno de instabilidade."],
          ["Sair sem salvar", "Abandona o fluxo com perda de dados. Deixa claro que as informações não serão salvas."],
          ["Saiba mais", "Exclusivo para peças de marketing (banners, campanhas, formulários externos)."],
          ["Salvar alterações", "Confirma uma edição em formulário."],
          ["Sim, cancelar", "Confirma o cancelamento de uma ação já iniciada. Remove ambiguidade do termo \"Cancelar\"."],
          ["Voltar", "Retorna a uma etapa anterior sem sair do fluxo. Exceção: use \"Voltar\" em vez de \"Continuar editando\" quando o contexto não for coerente com edição."],
          ["[Apenas Sponsor] Voltar para [Nome da área]", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo. Nome da área sempre com letra maiúscula."],
          ["[Apenas Employee] Fechar", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo."]
        ] } },

        { h2: "Breadcrumb" },
        { p: "O breadcrumb é uma trilha de navegação que mostra à pessoa onde ela está dentro da hierarquia do produto. É um recurso de navegação secundária e não substitui o menu principal." },
        { h3: "Anatomia do conteúdo" },
        { p: "O breadcrumb sempre segue esta ordem:" },
        { ol: [
          "Página de origem — nível mais alto da hierarquia. Nunca omitida ou truncada.",
          "Links intermediários — páginas entre a origem e a atual. São clicáveis e podem ser truncados quando necessário.",
          "Página atual — último item da trilha. Exibido como texto simples, sem link e nunca truncado."
        ] },
        { h3: "Como escrever" },
        { ul: [
          "Use o mesmo nome que a página exibe em seu título ou na navegação principal. As labels precisam ser consistentes — elas ainda não são puxadas automaticamente do código, então exigem atenção redobrada.",
          "Mantenha a mesma label do início ao fim do fluxo. Se começou como \"Novo pedido\", não mude para \"Nova solicitação\" no meio do caminho.",
          "Seja conciso. Prefira nomes curtos e diretos. Se o nome for muito longo, use uma versão abreviada reconhecível — nunca invente um nome diferente do usado na navegação.",
          "Evite verbos e chamadas à ação. O breadcrumb é orientação, não ação. Exceção: quando o fluxo parte de uma ação, o verbo é permitido. Exemplo: `Relatórios`, `Configurações`, `Adicionar créditos` (quando o fluxo parte dessa ação)",
          "Sem pontuação nos rótulos. Os separadores entre itens são responsabilidade do componente.",
          "Use sentence case — primeira letra maiúscula, demais em minúsculo. Confira as exceções de maiúsculas na página Escrevendo para produto."
        ] },
        { h3: "Truncamento" },
        { p: "O truncamento é ativado quando o total de itens ultrapassa 5 ou quando não há espaço suficiente. Apenas os links intermediários são truncados e agrupados em um dropdown." },
        { p: "Nunca são truncados:" },
        { ul: ["Página de origem", "Última página ancestral (nível imediatamente acima da página atual)", "Página atual"] },
        { h3: "Breadcrumb vs. Stepper" },
        { p: "O breadcrumb reflete a hierarquia de navegação estática do produto. O stepper comunica o progresso dentro de um fluxo. Os dois têm responsabilidades distintas e não devem se sobrepor." },
        { p: "O primeiro item do breadcrumb deve ser sempre a página que originou o fluxo — não o \"Painel Inicial\" ou \"Home\". Isso garante que a pessoa consiga retornar ao contexto exato de onde partiu." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: crumbs(["Créditos Caju", "Transferência entre carteiras"]), text: "O progresso dos passos de um fluxo (stepper) não deve ser representado no Breadcrumb. Ele reflete apenas a hierarquia de navegação estática do produto." },
          { kind: "dont", attrs: crumbs(["Painel inicial", "Transferência entre carteiras"]), text: "O primeiro item do Breadcrumb deve ser a página que originou o fluxo, e não o \"Painel Inicial\" ou ”Home”." }
        ] },

        { h2: "Bottom sheet" },
        { p: "O bottom sheet aparece para oferecer ações ou informações adicionais sem tirar a pessoa do fluxo. Por ser um espaço reduzido, o conteúdo precisa ser direto e focado." },
        { h3: "Como escrever" },
        { ul: ["No título, prefira perguntas curtas sempre que possível. Comunique uma coisa de cada vez.", "Use pontuação na descrição.", "Quando houver consequências, sempre informe o impacto da ação na descrição.", "Deixe sempre claro como encerrar o bottom sheet."] },
        { h3: "Boas práticas" },
        { ul: [
          "Apresente apenas informações ”extras”. Nunca esconda informações essenciais para concluir a tarefa do fluxo dentro de um bottom sheet.",
          "Use para interações rápidas. Conteúdos complexos pedem uma tela dedicada.",
          "Para ações obrigatórias — quando a pessoa não pode sair sem agir —, abra uma tela inteira, não um bottom sheet."
        ] },
        { h3: "Como encerrar" },
        { p: "Use Voltar ou Continuar editando dependendo do contexto. Confira a regra completa na página Botões." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: sheetActions("Sair sem salvar os documentos?", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Continuar editando", "Sair sem salvar"),
            text: "Use perguntas no título de bottom sheets, sempre que possível." },
          { kind: "dont", attrs: sheetActions("Atenção", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Cancelar", "Sair"),
            text: "O título não é específico e os botões são confusos para o contexto." },
          { kind: "do", text: "Use Voltar quando o bottom sheet interrompe um fluxo e, ao encerrá-lo, a pessoa retorna para uma área do app (Pix, Cartão, etc.) ou para uma tela que não é de edição." },
          { kind: "dont", text: "Não use Continuar editando se ao fechar o bottom sheet, o usuário retorna para uma área do app (ex: Pix, Cartão) ou a tela não é de input/edição." }
        ] },

        { h2: "Links" },
        { p: "O link direciona a pessoa para outro destino — página interna, site externo, documento ou seção. É navegação, não ação. Se o objetivo é executar algo no próprio fluxo, use um Botão." },
        { h3: "Como escrever" },
        { p: "O texto deve descrever com clareza para onde a pessoa vai ou o que vai encontrar. A pessoa não deve precisar clicar para entender o destino. Exemplos:" },
        { display: { attrs: [
          { _tag: "cds-link", label: "Confira o artigo com nossas dicas de segurança.", href: "#", appearance: "accent" },
          { _tag: "cds-link", label: "Leia os termos e condições de uso.", href: "#", appearance: "accent" },
          { _tag: "cds-link", label: "Seu cartão chegou! Desbloqueie e comece a usar.", href: "#", appearance: "accent" }
        ] } },
        { ul: [
          "Use entre 5 e 8 palavras (cerca de 55 caracteres). Links precisam de mais texto que botões para garantir uma área de clique adequada.",
          "Não use textos genéricos.",
          "Se o link for um endereço de e-mail e for a última palavra da frase, não use ponto final."
        ] },
        { h3: "Links externos" },
        { p: "Para links que levam para fora do produto, considere indicar com ícone e abrir em nova aba. Isso prepara a pessoa para a mudança de contexto." },
        { display: { attrs: { _tag: "cds-link", label: "Leia os termos e condições de uso.", href: "#", appearance: "accent", icon: "link-line", target: "_blank" } } },
        { h3: "Hiperlinks em texto corrido" },
        { p: "Quando o link aparecer dentro de um parágrafo ou descrição:" },
        { ul: [
          "Inclua pontuação ao final de cada frase normalmente — o link não altera a pontuação da frase.",
          "Posicione o link próximo ao conteúdo que ele descreve. Links distantes do contexto prejudicam o entendimento.",
          "Quando houver mais de uma frase com link, inclua pontuação ao final de cada uma."
        ] },
        { h3: "Link vs. Botão" },
        { ul: [
          "Use link para navegar (levar a pessoa a outro destino como termos de uso, FAQ, artigos ou downloads).",
          "Use botão para agir (executar algo no próprio fluxo, como confirmar, salvar, enviar ou cancelar).",
          "Links mudam o contexto e botões geram uma resposta imediata."
        ] },

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
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/error", "Cartão não adicionado", "Não foi possível adicionar seu cartão. Você também pode tentar diretamente pelo app da carteira digital.", "Tentar de novo", "Acessar carteira digital"),
            text: "O título cumpre a função de informar exatamente o que aconteceu, enquanto a descrição foca em como resolver. Além de usar um tom acolhedor e empático." },
          { kind: "dont", attrs: screen("notificacoes/error", "Algo deu errado", "Não foi possível adicionar seu cartão na carteira digital no momento."),
            text: "Não explicamos o erro e não damos um caminho para resolução, tudo isso com um tom ”robotizado” e nada amigável." },
          { kind: "do", attrs: screen("notificacoes/error", "Parece que você está sem internet", "Confira sua conexão de internet e tente de novo.", "Recarregar"),
            text: "Por mais a falha seja do usuário (está sem internet), usamos termos não-acusatórios: parece, confira." },
          { kind: "dont", attrs: screen("notificacoes/error", "Ops, você está offline", "Sua conexão está meio preguiçosa e não é possível carregar a tela agora.", "Recarregar"),
            text: "Não devemos usar onomatopéias e culpar o usuário. Na descrição, o uso de humor soa como deboche." },
          { kind: "do", attrs: screen("notificacoes/error", "Desculpe, a página está indisponível", "Já estamos trabalhando para que tudo volte ao normal. Tente de novo mais tarde.", "Voltar"),
            text: "Pedimos desculpas em erros críticos de origem do nosso sistema. O tom é tranquilizador: já estamos cientes e vamos resolver. A solução é tentar em outro momento." },
          { kind: "dont", attrs: screen("notificacoes/error", "Oscilação no sistema", "Estamos passando por uma falha no sistema e não é possível realizar ações agora.", "Entendi"), text: "" }
        ] },
        { h3: "Alertas" },
        { p: "Use para situações que exigem atenção ou estados de espera. O alerta não é necessariamente um bloqueio, mas um pedido de ação consciente." },
        { ul: [
          "Use tom acolhedor e preventivo. \"Antes de continuar\" sinaliza revisão sem punição.",
          "Explique o porquê do alerta: \"Para garantir sua segurança\" ou \"Para uma melhor experiência\".",
          "Sempre informe prazos: \"em até 2 dias úteis\". Se não houver prazo definido, ofereça a opção de ser notificado: \"Quero ser avisado\".",
          "Informe o canal de notificação: \"te avisaremos via push\" ou \"enviamos um e-mail\".",
          "Se a pessoa não puder sair da tela, deixe isso claro no título: \"Não feche esta página ainda\".",
          "Se houver envio de e-mail de confirmação, informe para qual nível de acesso foi enviado: \"O e-mail foi enviado para todos os administradores do Portal\".",
          "Evite tom celebrativo — a ilustração de alerta não evoca mensagem positiva.",
          "Nunca omita o prazo de espera."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("notificacoes/alert", "Pix temporariamente fora do ar", "Enquanto resolvemos, você pode pagar com o cartão virtual ou boleto. Podemos te avisar aqui no app assim que normalizar.", "Quero ser avisado", "Fechar"),
            text: "Tom colaborativo (”estamos”) + alternativa de solução + estimativa de prazo de resolução + canal de notificação" },
          { kind: "dont", attrs: screen("notificacoes/alert", "Pix indisponível", "Estamos passando por uma instabilidade no sistema e não é possível fazer pagamentos via Pix no momento.", "Fechar"),
            text: "Uso de termos complexos, sem solução ou prazo e tom robotizado." }
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
          { kind: "do", attrs: screen("notificacoes/success", "Tudo pronto com seu cartão físico!", "Use a senha de 4 números que você acabou de criar para pagar na maquininha. Quer mais praticidade? Adicione o virtual nas carteiras digitais e pague por aproximação.", "Acessar cartão físico", "Criar cartão virtual"),
            text: "Esse é um momento ”WOW”, se possível use uma ilustração diferente e sempre dê informações contextuais sobre a ação realizada." },
          { kind: "dont", attrs: screen("notificacoes/success", "Feito!", "Seu cartão físico foi ativado com sucesso e você já por aproveitar seus benefícios.", "Acessar cartão físico", "Criar cartão virtual"),
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
          { kind: "do", attrs: screen("notificacoes/empty-state", "Últimas transações", "Os pagamentos recentes feitos com seu cartão ficam listados aqui."),
            text: "Explicamos o que a pessoa usuária vai encontrar e qual o valor dela." },
          { kind: "dont", attrs: screen("notificacoes/empty-state", "Últimas transações", "Sem pagamentos realizados."),
            text: "O texto não engaja e não explica o valor daquela área para a pessoa usuária." }
        ] },

        { h2: "Stepper" },
        { p: "O stepper comunica o progresso dentro de um fluxo com etapas definidas. Ele orienta a pessoa sobre o que ainda falta para concluir um fluxo." },
        { h3: "Como nomear as etapas do stepper" },
        { p: "Use substantivos, nunca verbos. Transforme a ação em nominalização: o stepper representa uma etapa, não uma instrução. Exemplo:" },
        { table: { wrap: true, head: ["Ação", "Etapa"], rows: [["Revisar", "Revisão"], ["Identificar", "Identificação"], ["Pagar", "Pagamento"]] } },
        { ul: [
          "Nomeie as etapas do ponto de vista da pessoa usuária — o que ela está fazendo, não o que o sistema faz.",
          "O nome da etapa no stepper deve estar alinhado ao H1 da página correspondente. O H1 pode usar verbo, mas o termo principal precisa ser o mesmo. Se a etapa é \"Revisão\", o H1 pode ser \"Revise seus dados\"."
        ] },
        { h3: "Regras de escrita" },
        { ul: [
          "Primeira letra maiúscula, demais em minúsculo.", "Sem ponto final ou qualquer outra pontuação.",
          "Use no máximo 3 palavras por etapa. O espaço é reduzido, seja direto.",
          "Mantenha o mesmo padrão gramatical em todas as etapas do mesmo fluxo. Não misture substantivos com verbos."
        ] },
        { h3: "Stepper vs. Breadcrumb" },
        { p: "O stepper comunica progresso dentro de um fluxo linear. O breadcrumb reflete a hierarquia de navegação do produto. Os dois têm responsabilidades distintas e não devem se sobrepor. Confira mais detalhes na página Breadcrumbs." },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes (Tabs, Botões, Breadcrumb, Bottom sheet, Links, Feedback Pages, Stepper). Os exemplos foram refeitos com Scrollable Tab, Breadcrumb, Bottom Sheet, Main Button, Link e Fixed Bar do DS, com os mesmos textos (C114)." }
      ] }
    ]
  };
})();
