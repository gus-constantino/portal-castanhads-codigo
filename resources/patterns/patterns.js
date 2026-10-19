/* Patterns — Feedback Page (Sponsor e Employee) e Tela de loading (zeroheight · Patterns e Templates).
   Fonte: Figma [CastanhaDS] Component use documentation (anatomias 7039:15189, 7039:17339, 5869:2460) e o
   .Feedback Content (set 7039:15084): Kind escolhe ilustração + título + descrição sugeridos (textos reescritos pelas regras de Feedback Pages do Hub, decisão de 05/10; os do Figma estão em C161/C167).
   Os cenários são montados com componentes do DS (Main Button, Icon Button, Fixed Bar, Progress Line) e as
   ilustrações do [Caju] Illustrations. Rótulos das ações são exemplos do playground: no Figma eles vêm como "Label".
   Revisão: CONFERIR C161. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var ZH = "https://castanha.caju.com.br/858426090/v/latest/p/272f28-feedback-page-sponsor";
  CDS.register({ id: "patterns", name: "Patterns", resource: true, lede: "Feedback Pages e Tela de loading, montadas com componentes do DS.", order: 4, zeroheight: ZH });
  var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });

  // Kind → ilustração, texto sugerido (Figma) e ações de exemplo (primária, secundária)
  var KINDS = [
    { kind: "Error", ill: "notificacoes/error", title: "Não conseguimos concluir agora", text: "Tivemos um problema do nosso lado. Tente de novo em alguns instantes.", pri: "Tentar de novo", sec: "Voltar" },
    { kind: "Success", ill: "notificacoes/success", title: "Pronto, deu certo", text: "Você já pode seguir para o próximo passo.", pri: "Continuar", sec: "Acessar detalhes" },
    { kind: "Warning", ill: "notificacoes/alert", title: "Revise antes de continuar", text: "Confira as informações para seguir com segurança.", pri: "Revisar", sec: "Voltar" },
    { kind: "Empty State", ill: "notificacoes/empty-state", title: "Ainda não há nada por aqui", text: "Quando você adicionar o primeiro item, ele aparece aqui.", pri: "Adicionar item", sec: null },
    { kind: "No Results", ill: "notificacoes/search-not-found", title: "Ainda não encontramos resultados", text: "Tente outro termo ou limpe a busca.", pri: "Limpar busca", sec: null },
    { kind: "In Review", ill: "notificacoes/analysis", title: "Estamos analisando sua solicitação", text: "Você recebe um aviso assim que a análise terminar.", pri: "Voltar ao início", sec: null },
    { kind: "Processing", ill: "notificacoes/ja-vai", title: "Estamos processando sua solicitação", text: "Isso pode levar alguns instantes.", pri: "Voltar ao início", sec: null },
    { kind: "No Access", ill: "seguranca/cadeado", title: "Você não tem acesso a este conteúdo", text: "Se precisar, peça acesso a quem administra a conta da sua empresa.", pri: "Voltar ao início", sec: null },
    { kind: "Not Found", ill: "transporte/logistica-estrada", title: "Não encontramos esta página", text: "Ela pode ter mudado de endereço ou sido removida.", pri: "Voltar ao início", sec: null }
  ];
  function byKind(k){ return KINDS.filter(function(x){ return x.kind === k; })[0]; }

  // .Feedback Content: ilustração 120px + Title/Small + parágrafo, centralizados
  function content(k, o){
    o = o || {};
    return { _tag: "div", class: "pg-fb__content", _children: [
      { _tag: "img", class: "pg-fb__ill", src: ills[k.ill] || "", alt: "" },
      { _tag: "div", class: "pg-fb__text", _children: [
        { _tag: "h4", class: "pg-fb__title", _text: o.title || k.title },
        { _tag: "p", class: "pg-fb__desc", _text: o.text || k.text }
      ] }
    ] };
  }
  function btn(label, appearance){ return { _tag: "cds-main-button", appearance: appearance, label: label, "show-lead-icon": false, "show-trailing-icon": false }; }
  // Sponsor: ações lado a lado (secundária Neutral, primária Accent) e Icon Button de fechar no canto
  function sponsor(k, o){
    o = o || {};
    var kids = [content(k, o)];
    if (o.actions !== false){
      var acts = [];
      if ((o.sec !== undefined ? o.sec : k.sec)) acts.push(btn(o.sec || k.sec, "neutral"));
      acts.push(btn(o.pri || k.pri, "accent"));
      kids.push({ _tag: "div", class: "pg-fb__actions", _children: acts });
    }
    var page = [{ _tag: "div", class: "pg-fb__body", _children: kids }];
    if (o.close !== false) page.unshift({ _tag: "cds-icon-button", class: "pg-fb__close", icon: "close-line", appearance: "neutral", label: "Fechar" });
    return { _tag: "div", class: "pg-fb pg-fb--sponsor" + (o.section ? " pg-fb--section" : ""), _children: page };
  }
  // Employee: conteúdo no centro e ações no Fixed Bar (Stacked, sem Divider), ancorado na base
  function employee(k, o){
    o = o || {};
    var sec = o.sec !== undefined ? o.sec : k.sec;
    var kids = [{ _tag: "div", class: "pg-fb__body", _children: [content(k, o)] }];
    if (o.actions !== false) kids.push({ _tag: "cds-fixed-bar", kind: "stacked", "show-divider": false, "primary-label": o.pri || k.pri, "show-secondary-action": !!sec, "secondary-label": sec || null, "show-lead-icon": false });
    return { _tag: "div", class: "pg-fb pg-fb--employee", _children: kids };
  }
  function loading(label){
    return { _tag: "div", class: "pg-fb pg-fb--loading", _children: [
      { _tag: "div", class: "pg-fb__loading", _children: [
        { _tag: "cds-progress-line", percent: 40, label: label },
        { _tag: "p", class: "pg-fb__loading-label", _text: label }
      ] }
    ] };
  }
  function gallery(make){ return { specimens: { items: KINDS.map(function(k){ return { label: k.kind, attrs: make(k) }; }) } }; }

  var QUANDO = [
    { h2: "Quando usar" },
    { p: "Use Feedback Pages quando uma condição precisa ser comunicada no lugar do conteúdo: na tela inteira, quando ela impede seguir com o fluxo, ou em uma seção, quando afeta uma parte da interface." },
    { h3: "Use para" },
    { ul: ["Confirmar a conclusão de um fluxo.", "Informar falhas que impedem seguir, incluindo erros de sistema como 404 e 502.", "Representar ausência de conteúdo, por estar vazio ou por filtro sem resultado.", "Preencher uma área sem conteúdo dentro da página, como uma tabela ainda sem registros ou uma busca sem resultado.", "Comunicar espera, quando algo está em análise ou em processamento.", "Informar que a pessoa usuária não tem acesso ao conteúdo."] }
  ];
  function naoUse(decisao){
    return [{ h3: "Não use para" },
      { ul: ["Mensagens rápidas ou transitórias: use o Toast.", "Avisos que não interrompem o fluxo: use o Alert.", decisao, "Carregamento breve de um trecho da tela: indique o carregamento no próprio trecho. O DS ainda não tem Skeleton."] }];
  }
  function diretrizes(where, extra){
    var w = where === "tela" ? "tela" : "página";
    return [{ h2: "Diretrizes de uso" },
      { cards: [
        ["Escolha o cenário pela condição, não pela cor", "O Kind carrega o significado da " + w + ". Selecione pelo que aconteceu no fluxo, e deixe que ilustração e texto comuniquem junto com a cor, sem depender dela."],
        ["Mantenha o texto padrão quando ele resolver", "Cada cenário vem com título e descrição agnósticos, pensados para servir à maioria dos casos. Substitua quando o contexto for mais específico ou pedir outra redação, preservando o tom."],
        ["Ofereça uma saída clara", "A ação primária precisa resolver o que a " + w + " comunica: tentar de novo no erro, voltar no conteúdo inexistente, criar o primeiro item no vazio. " + (w === "tela" ? "Tela" : "Página") + " sem saída deixa a pessoa usuária parada."]
      ].concat(extra || []).concat([
        ["Componha casos específicos a partir dos cenários", "Situações como sessão expirada, manutenção programada ou falta de conexão não têm cenário próprio. Use o Kind mais próximo e ajuste o texto: sessão expirada é Warning, manutenção é Warning, " + w + " fora do ar é Error."]
      ]) }];
  }
  var DODONT = [
    { h2: "Do's and Don'ts" },
    { dodont: [
      { kind: "do", attrs: sponsor(byKind("No Results"), { close: false }), text: "Use No Results quando a busca ou o filtro não retorna nada, com ação de limpar o filtro." },
      { kind: "dont", attrs: sponsor(byKind("Empty State"), { close: false, title: "Nenhum item por aqui", text: "Ainda não há nada aqui.", pri: "Adicionar item" }), text: "Não use Empty State para resultado de busca. Ele comunica ausência de conteúdo, não recorte sem resultado." },
      { kind: "do", attrs: sponsor(byKind("Error"), { close: false }), text: "Use título que nomeia a condição e descrição que orienta o próximo passo." },
      { kind: "dont", attrs: sponsor(byKind("Error"), { close: false, title: "Ops!", text: "Algo aconteceu.", sec: null, pri: "OK" }), text: "Não use texto genérico, que não diz o que aconteceu nem o que a pessoa usuária pode fazer." }
    ] },
    { p: "Uma Feedback Page entra quando a condição substitui o conteúdo da tela. Para uma mensagem pontual dentro de uma tela em funcionamento, use o Alert." }
  ];
  var MOTION = [
    { h2: "Motion" },
    { alert: { appearance: "informative", label: "Sem motion próprio", text: "O padrão não define animação além das dos componentes que usa (Main Button, Icon Button, Fixed Bar). No Hub, a seção Motion ainda é o modelo vazio: ver CONFERIR." } }
  ];
  var CENARIOS_P = { p: "A property `Kind` do .Feedback Content escolhe o cenário e traz a ilustração e o texto sugerido correspondentes. Os textos abaixo seguem as regras de Feedback Pages (Conteúdo): sem \"com sucesso\", sem CTA genérico e no presente. O Figma ainda traz a versão anterior." };

  CDS.docs["patterns"] = {
    tabs: [
      { id: "sponsor", title: "Feedback Page Sponsor", blocks: [
        { h2: "Feedback Page · Sponsor" },
        { p: "Padrão que comunica o resultado ou a condição de um fluxo. Reúne ilustração, mensagem e ações para que a pessoa usuária entenda o que aconteceu e saiba o que fazer em seguida. Pode ocupar a tela inteira ou uma seção dela." },
        { p: "Nomes alternativos comuns: empty state, status page, result page, state feedback." },
        { anatomy: {
          attrs: sponsor(byKind("Success")),
          markers: [{ n: 1, target: ".pg-fb__ill", side: "left" }, { n: 2, target: ".pg-fb__title", side: "right" }, { n: 3, target: ".pg-fb__desc", side: "left" }, { n: 4, target: ".pg-fb__actions > cds-main-button:last-child", side: "right" }, { n: 5, target: ".pg-fb__actions > cds-main-button:first-child", side: "left" }, { n: 6, target: ".pg-fb__close", side: "right" }],
          legend: ["Ilustração", "Título", "Descrição", "Ação primária (Main Button Accent)", "Ação secundária (Main Button Neutral · Show Secondary Action)", "Botão de fechar (Icon Button · Show Close Button)"]
        } },
        { h2: "Cenários" },
        CENARIOS_P,
        gallery(function(k){ return sponsor(k); })
      ].concat(QUANDO, naoUse("Confirmações e decisões imediatas: use o Modal."), diretrizes("pagina", [
        ["Ajuste o template ao espaço que ele ocupa", "Na tela inteira, a página assume a condição por completo e oferece a saída principal. Em uma seção, como uma tabela ainda sem registros ou uma área de busca sem resultado, redimensione o template para a área e desligue `Show Actions` e `Show Close Button` quando as ações já existirem fora do bloco. A estrutura se mantém e o conteúdo segue centralizado."]
      ]), [
        { h3: "Em uma seção" },
        { compare: [
          { title: "Tela inteira: ações e botão de fechar", attrs: sponsor(byKind("Error")) },
          { title: "Seção: sem ações nem fechar (a ação já está fora do bloco)", attrs: sponsor(byKind("Empty State"), { actions: false, close: false, section: true }) }
        ] }
      ], DODONT, MOTION) },

      { id: "employee", title: "Feedback Page Employee", blocks: [
        { h2: "Feedback Page · Employee" },
        { p: "Padrão que comunica o resultado ou a condição de um fluxo. Reúne ilustração, mensagem e ações para que a pessoa usuária entenda o que aconteceu e saiba o que fazer em seguida. As ações usam o Fixed Bar, ancorado na base da tela. Pode ocupar a tela inteira ou uma seção dela." },
        { anatomy: {
          attrs: employee(byKind("Success")),
          markers: [{ n: 1, target: ".pg-fb__ill", side: "left" }, { n: 2, target: ".pg-fb__title", side: "right" }, { n: 3, target: ".pg-fb__desc", side: "left" }, { n: 4, target: ".cds-footer__actions > cds-main-button:last-child", side: "right" }, { n: 5, target: ".cds-footer__actions > cds-main-button:first-child", side: "left" }],
          legend: ["Ilustração", "Título", "Descrição", "Ação primária (Fixed Bar)", "Ação secundária (Fixed Bar · Show Secondary Action)"]
        } },
        { p: "Sem botão de fechar e sem cabeçalho: as ações ficam no Fixed Bar `Stacked`, sem Divider." },
        { h2: "Cenários" },
        CENARIOS_P,
        gallery(function(k){ return employee(k); })
      ].concat(QUANDO, naoUse("Confirmações e decisões imediatas: use o Bottom Sheet."), diretrizes("tela", [
        ["Garanta a navegação de retorno na tela que consome", "O template não inclui cabeçalho. A tela que o consome é responsável por oferecer o caminho de volta, seja pelo header da navegação, seja pela ação do Fixed Bar."],
        ["Ajuste o template ao espaço que ele ocupa", "Na tela inteira, a tela assume a condição por completo e oferece a saída principal. Em uma seção, como uma lista ainda sem registros ou uma área de busca sem resultado, redimensione o template para a área e desligue `Show Actions` quando a ação já existir fora do bloco. A estrutura se mantém e o conteúdo segue centralizado."]
      ]), DODONT, MOTION) },

      { id: "loading", title: "Tela de loading", blocks: [
        { alert: { appearance: "warning", label: "Em melhoria", text: "No Hub, este padrão está marcado como Improvement." } },
        { h2: "Tela de loading" },
        { p: "Padrão de feedback que informa que o sistema está processando uma solicitação. Ocupa a tela inteira e bloqueia a interação até a conclusão da ação." },
        { p: "Nomes alternativos comuns: loading screen, tela de processamento, tela de espera." },
        { anatomy: {
          attrs: loading("Estamos processando sua solicitação..."),
          markers: [{ n: 1, target: "cds-progress-line", side: "left" }, { n: 2, target: ".pg-fb__loading-label", side: "right" }],
          legend: ["Progress Line", "Loading label"]
        } },
        { h2: "Quando usar" },
        { p: "Em carregamentos sistêmicos do produto que bloqueiam completamente a interface e exigem aguardo, especialmente quando não há necessidade de reforço visual ou emocional da experiência." },
        { h3: "Use para" },
        { ul: ["Processamentos internos do sistema.", "Transições entre estados que dependem de resposta do backend.", "Momentos em que a interface precisa ser bloqueada de forma neutra."] },
        { h3: "Não use para" },
        { ul: ["Experiências que pedem impacto visual ou encantamento: use a Splash screen.", "Carregamento de conteúdo que pode ser antecipado.", "Atualizações parciais da interface."] },
        { h2: "Casos de uso" },
        { cards: [
          ["Tela de loading × carregamento parcial", "A Tela de loading bloqueia a interface e não mostra conteúdo intermediário. Quando dá para antecipar a estrutura da tela (o papel do Skeleton, que o DS ainda não tem), prefira carregar o trecho e manter a percepção de progresso sem interromper toda a interação."],
          ["Tela de loading × Splash screen", "A Tela de loading é funcional e neutra, usada em carregamentos sistêmicos. A Splash screen tem caráter mais visual: entra quando se quer criar impacto ou percepção de valor durante o carregamento."]
        ] },
        { h2: "Diretrizes de uso" },
        { cards: [
          ["Use em momentos coerentes com bloqueio total", "A Tela de loading aparece quando a pessoa usuária não pode interagir com a interface."],
          ["Garanta relação com a ação anterior", "O loading deve ser claramente consequência de uma ação da pessoa usuária ou de uma transição esperada no fluxo."],
          ["Prefira alternativas menos intrusivas quando possível", "Antes de usar a Tela de loading, avalie se carregar o trecho atende ao contexto, reduzindo a sensação de espera."]
        ] },
        { h3: "Texto do loading" },
        { p: "O label diz o que está acontecendo, no gerúndio e com reticências: \"Estamos processando sua solicitação...\". A Progress Line recebe o mesmo texto como nome acessível." },
        { h2: "Motion" },
        { alert: { appearance: "informative", label: "Sem motion próprio", text: "O avanço é o da Progress Line. No Hub, a seção Motion ainda é o modelo vazio: ver CONFERIR." } }
      ] }
    ]
  };
})();
