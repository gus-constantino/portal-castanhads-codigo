/* Recurso: FAQ — perguntas frequentes sobre o Castanha DS.
   Fontes: chamados do formulário de suporte (dúvidas mais recorrentes, reescritas de forma genérica), tarefas do board do DS,
   docs do time (Arquitetura de Tokens, InnerSource, Evolução do Castanha) e skills castanha-themes, castanhads-juntos e criar-tarefa.
   Site público: sem nomes de pessoas, canais, chaves de tarefa, versões, links internos nem decisões ainda em aberto. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "faq", name: "FAQ", resource: true, lede: "As perguntas mais frequentes nos chamados, organizadas por tema.", order: 0.6 });

  CDS.docs["faq"] = {
    tabs: [
      { id: "perguntas", title: "Perguntas", blocks: [
        { faq: { title: "Como podemos ajudar?", intro: "As dúvidas que mais chegam ao time do Castanha DS, com a resposta curta e na ordem da frequência nos chamados de suporte.", illustration: "comunicacao/perguntas-frequentes", emptyIllustration: "notificacoes/search-not-found", top: 5, cta: { illustration: "objetos/foguete", title: "Não achou sua resposta?", text: "Abra um chamado no canal de suporte do Castanha DS no Slack, com a tela, a plataforma e a versão da lib.", label: "Abrir chamado", href: "https://caju.slack.com/archives/C07NM4UQ2S3" }, empty: "Nenhuma pergunta encontrada. Abra um chamado no canal de suporte do Castanha DS.", groups: [
          { title: "Camadas e tokens", icon: "customize-line", appearance: "neutral", items: [
            ["Posso usar um primitivo direto no componente ou na tela?", "Não. Componentes e telas usam tokens semânticos do Brand Style (`Common/…`). O primitivo existe para o tema escolher valores, e usar o primitivo direto quebra o tema escuro e as outras marcas.", 4],
            ["Qual a diferença entre Primitives, Theme e Brand Style?", ["Primitives são os valores crus, como `Colors/<família>/500`.", "O Theme dá função a eles, como `Accent/Solid/medium`, em Light e Dark.", "O Brand Style espelha o Theme com o prefixo `Common/` e tem um mode por marca. É a camada que componentes e código consomem."], 3],
            ["Por que o token do tema não aparece no código?", "Porque falta o espelho em `Common/` no Brand Style. Só o que está no Brand Style chega ao pacote de tokens.", 2],
            ["Onde consulto os tokens?", "No recurso Tema Caju deste site, com o valor em Light e Dark e o nome da variável CSS. No código, os nomes seguem `--castanha-<grupo>-<caminho>`, como `--castanha-colors-text-intense`.", 3],
            ["Como o nome do Figma vira variável CSS?", "Sai o `Common` (ou `Specific`), `/` e espaço viram `-` e tudo fica em minúsculas. `Common/Sizes/16` vira `--castanha-sizes-16`.", 2],
            ["O valor no Figma não bate com o código. O que faço?", "Confira se a lib e o pacote de tokens estão atualizados. Se a diferença continuar, abra um pedido: o time segue a cadeia primitivo → tema → componente para achar onde está o erro.", 6],
            ["Falta um token. Posso usar um valor fixo enquanto isso?", "Não. Peça o token no formulário de suporte e use o mais próximo que existe. Parte do que parece faltar já existe: a escala de opacidade, por exemplo, começa em 0 e cobre o transparente.", 3],
            ["Posso criar um primitivo novo?", "Primitivo novo é exceção: entra quando nenhuma combinação dos que existem resolve, e quem decide é o time do DS.", 1],
            ["Tipografia é token?", "Os estilos de texto são `.Text Styles` no Figma, que combinam fonte, tamanho, peso e altura de linha a partir dos tokens `Common/Font`. No React, use o componente `Text` em vez de montar o estilo à mão.", 2]
          ] },
          { title: "Temas, marcas e modos", icon: "dark-mode-line", appearance: "inversed", items: [
            ["Onde fica o tema escuro?", "Nos modes Light e Dark do tema. Componentes e telas não mudam: o mesmo token aponta para outro valor no Dark. No app, o tema do Castanha vai na raiz, com claro, escuro e o modo do sistema.", 2],
            ["Como entra uma marca nova?", "Como um mode novo no Brand Style, apontando para o tema da marca. Componentes e primitivos ficam como estão. Os tokens de feedback (sucesso, aviso, erro) não variam por marca.", 1],
            ["Motion muda no tema escuro?", "Não. Motion tem o mesmo valor em Light e Dark. A variação de motion é o mode Reduced, para quem prefere menos movimento. No código, isso vem de `prefers-reduced-motion`.", 1],
            ["Quais são as faixas de viewport?", "Mobile abaixo de 744 px, Tablet de 744 a 1365 px e Desktop a partir de 1366 px. Grids e medidas por faixa ficam na coleção Viewport.", 1],
            ["Um accent claro pede texto escuro. Onde resolvo?", "No Brand Style, com o par de conteúdo sobre o accent (`Text/inversed` ou `Text/intense`). Quando der, prefira ajustar o tom do accent no tema.", 1]
          ] },
          { title: "Componentes", icon: "view-module-line", appearance: "accent", items: [
            ["O componente está diferente do Figma. É bug?", "Depende de onde está o erro. Se o código diverge do Figma, entra numa correção. Se o erro está no Figma, ele é corrigido primeiro e o código acompanha. Abra um pedido com a tela, a plataforma e a versão da lib.", 35],
            ["Preciso de um componente que não existe. Ele entra no DS?", "Se outros times também precisam, ele é candidato ao DS e entra numa release planejada. Se é específico de um produto, vira Local asset (team component) ou Composição, mantido pela squad com tokens e componentes do Castanha.", 20],
            ["Quero uma variante ou um estado novo num componente", "É uma evolutiva: o designer do produto propõe, o time do DS avalia e, se aprovar, publica e documenta. Alguns pedidos ficam como não suportados, com orientação de uso.", 20],
            ["Meu time criou um componente. O DS pode adotar?", "Pode, pelo InnerSource. O DS reconstrói com tokens e componentes oficiais e publica para todos. A regra de negócio (quais ações, quando mostrar erro) continua com o produto.", 3],
            ["Como faço o botão ocupar toda a largura?", "Pelo container: o pai em flex ou grid define a largura. O componente não tem prop para isso.", 2],
            ["Por que não consigo trocar a seta do item de navegação?", "É proposital: item de navegação sempre leva a outra tela, e a seta garante essa leitura.", 2],
            ["O componente da lib antiga vai ser corrigido?", "Em geral não. A versão estabilizada já traz o componente padronizado. A legada tem um período de suporte depois que a estável sai em código e então fica depreciada: continua disponível, sem correções.", 8],
            ["Texto longo aparece cortado no componente", "Cada componente decide se o texto quebra a linha ou é truncado, e alguns limites são decisão de design. Se o corte esconde informação importante, abra um pedido com a tela e o texto real.", 8],
            ["Encontrei um problema de acessibilidade", "Abra um pedido: tamanho de área de toque, contraste, nome acessível e foco visível são tratados como bug ou melhoria. O contraste das cores vem dos tokens do tema, que seguem o WCAG 2.2 AA.", 6],
            ["Disabled precisa passar em contraste?", "Não. O critério de contraste do WCAG (1.4.3) não se aplica a componentes inativos. Os demais estados seguem o WCAG 2.2 AA.", 2]
          ] },
          { title: "Figma e código", icon: "code", appearance: "informative", items: [
            ["O estilo do DS sobrescreve o meu CSS. O que faço?", "Use `className` ou `style` nas partes que o componente expõe. Se o problema é um estilo global do DS vazando, abra um pedido: já houve casos assim, corrigidos na lib.", 10],
            ["O bug some se eu atualizar a lib?", "Atualize e teste no Storybook primeiro. Correção não muda o contrato do componente. Mudança de props ou de comportamento vem anunciada como breaking change.", 8],
            ["O ícone aparece no Storybook e não no meu projeto", "Atualize o pacote e limpe o cache do build. Se continuar, abra um pedido com a versão e o ambiente.", 5],
            ["Como passo uma prop do Figma para o React?", "Abra o componente neste site: o painel No React mostra o código do castanha-react com as props como estão no Figma, e a tradução de cada prop.", 2],
            ["Onde vejo o que existe e o que saiu?", "O Storybook mostra o que está em produção. As releases são anunciadas no canal de novidades do Castanha DS, com Figma, React e Flutter separados. Neste site, consulte o Changelog.", 6]
          ] },
          { title: "Ícones, ilustrações e motion", icon: "image-file", appearance: "warning", items: [
            ["Falta um ícone. Como peço?", "Pelo formulário de suporte. O time cria o ícone na lib de ícones do Figma e publica no pacote. Para ícones legados, a lib estável indica o equivalente.", 18],
            ["Preciso de uma ilustração ou de um motion para o meu fluxo", "Peça pelo formulário de suporte, com o contexto e o prazo. O que serve a várias squads vai para a biblioteca. O que é de um único fluxo fica com a squad, como Local asset.", 45],
            ["Quais durações e curvas de motion uso?", "As dos Motion Styles por interação (Hover In, Pressed, Selected In e os outros), sempre o estilo `/01`. Não escreva duração nem easing à mão.", 2],
            ["Por que o protótipo do Figma não usa o token de motion?", "O Figma não liga uma transição de protótipo a uma variável. Os valores dos Motion Styles são repetidos no protótipo, e o código usa os tokens.", 1]
          ] },
          // O portal (onboarding, F4): como refazer o tour, trocar o foco e achar a trilha Explorar
          { title: "O portal", icon: "home-line", appearance: "neutral", items: [
            ["Como refaço o tour do portal?", "Em Início, na tab Primeiros passos, use o botão Fazer o tour. Ele também está nos atalhos do teclado (tecla ?). O tour precisa da janela larga, com o menu lateral à mostra.", 2],
            ["Como troco o meu foco nos Primeiros passos?", "Na tab Primeiros passos do Início, escolha outro perfil. A lista de tarefas muda e o que você já fez continua marcado.", 1],
            ["Onde estão as coisas para explorar no portal?", "Na tab Primeiros passos do Início, em Explorar o portal. São 5 blocos, e cada parada se marca quando você abre pela lista.", 1]
          ] },
          { title: "Pedidos e suporte", icon: "support-line", appearance: "positive", items: [
            ["Como peço algo ao time do DS?", ["Pelo formulário de suporte do Castanha DS no Slack, com título, detalhes, prioridade e anexos.", "O time assume o pedido, pede o contexto que faltar (versão, plataforma, prazo) e decide entre orientação de uso, correção, evolução no roadmap ou asset da squad.", "A entrega é anunciada no canal de novidades e o time volta ao pedido para você confirmar."], 30],
            ["Meu prazo é curto e o DS ainda não tem o que preciso", "Use uma solução local com tokens e componentes do Castanha e combine a migração com o time. Quando o DS publicar, troque pela versão oficial.", 4],
            ["Como uma tarefa do DS é organizada?", "Por frente (Design System, Fundação, Plataforma, Capacitação e IA) e por stack, com o prefixo no título: `[Design]`, `[React]`, `[Flutter]`. Uma mesma entrega costuma ter uma tarefa por stack. O valor de um token é Fundação, o caminho que leva o token ao código é Plataforma.", 1],
            ["Onde aprendo a usar o DS no código?", "No recurso Treinamento deste site e nos vídeos de capacitação de setup e handoff para React e Flutter.", 3]
          ] }
        ] } }
      ] }
    ]
  };
})();
