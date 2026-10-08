/* Castanha Quiz (Aprenda): treinamentos rápidos sobre temas do portal, cada um com jogo e quiz (pedido do Gustavo, 06/10).
   Formato por tema, uns 5 minutos: treinamento rápido (blocos curtos com visual ao vivo) · jogo · quiz de 5 perguntas.
   Todo conteúdo vem do próprio portal (docs dos componentes e Tema Caju), sem regra nova. Jogos e quiz = composição
   <cmp-quiz> (kind "verdict" = Certo ou errado); o melhor resultado fica no localStorage de quem joga (storage-key).
   Etapa 1: Componentes e Tema Caju. Etapa 2: Motion, Conteúdo, Ilustração e Camadas do DS.
   Feedback do jogo e do quiz segue o guia de Conteúdo: títulos sem exclamação e sem "Ops". */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "castanha-quiz", name: "Castanha Quiz", resource: true, lede: "Treinamentos rápidos sobre o Castanha DS, com jogo e quiz.", order: 6 });

  var c = function(t, a, k){ return CDS.create(t, a, k); };
  function txt(tag, cls, t){ var e = c(tag, null, cls); e.textContent = t; return e; }
  // Visual de pergunta ou cena: componentes do DS montados antes de conectar, num palco centralizado
  function stage(kids){ var s = c("div", null, "pg-cq__stage"); kids.forEach(function(k){ s.appendChild(k); }); return s; }
  function code(rows){ // linhas de código ou de token: composição Definition List (como nas fichas de Motion)
    var dl = c("cmp-definition-list", { layout: "inline" });
    rows.forEach(function(r){ dl.listEl.appendChild(txt("dt", null, r[0])); dl.listEl.appendChild(txt("dd", null, r[1])); });
    return dl;
  }
  function radios(name, labels, sel){
    var g = c("div", { role: "radiogroup", "aria-label": "Forma de pagamento" }, "pg-doc-sc-group");
    labels.forEach(function(l, i){ g.appendChild(c("cds-radio-button", { label: l, name: name, status: i === sel ? "selected" : "unselected" })); });
    return g;
  }

  var V = {
    // Treinamento · Componentes: escolher o controle de seleção
    selecao: function(){
      var col = function(t, d, kids){ var k = c("div", null, "pg-cq__col"); k.appendChild(txt("p", "pg-cq__cap", t)); k.appendChild(txt("p", "pg-cq__desc", d)); var g = c("div", null, "pg-doc-sc-group"); kids.forEach(function(x){ g.appendChild(x); }); k.appendChild(g); return k; };
      var g = c("div", null, "pg-cq__cols");
      g.appendChild(col("Checkbox", "Várias opções ao mesmo tempo.", [c("cds-checkbox", { label: "Vale-refeição", status: "selected" }), c("cds-checkbox", { label: "Vale-alimentação", status: "selected" }), c("cds-checkbox", { label: "Mobilidade" })]));
      g.appendChild(col("Radio Button", "Uma opção entre poucas, com confirmação depois.", [radios("cq-sel-rb", ["Pix", "Boleto", "Cartão de crédito"], 0)]));
      g.appendChild(col("Switch", "Liga ou desliga, com efeito na hora.", [c("cds-switch", { label: "Notificações", status: "selected" }), c("cds-switch", { label: "Compras online" })]));
      return g;
    },
    // Treinamento · Tema Caju: amostras de token (a cor vem da variável; o nome é o do Figma)
    tokens: function(){
      var row = c("div", null, "pg-cq__swatches");
      [["accent-solid-medium", "Accent/Solid/medium"], ["surface-default", "Surface/default"], ["text-intense", "Text/intense"], ["feedback-positive-medium", "Feedback/Positive/medium"], ["border-semi-soft", "Border/semi-soft"]].forEach(function(t){
        var s = row.appendChild(c("div", null, "pg-cq__swatch"));
        s.appendChild(c("span", { "aria-hidden": "true", style: "background:var(--common-colors-" + t[0] + ")" }, "pg-cq__chip"));
        s.appendChild(txt("span", "pg-cq__desc", t[1]));
      });
      return row;
    },
    // Jogo · Qual é o componente?
    q: {
      sw: function(){ return stage([c("cds-switch", { label: "Notificações", status: "selected" })]); },
      tag: function(){ return stage([c("cds-tag", { label: "Ativo", appearance: "positive", "show-lead-item": "false" })]); },
      rb: function(){ return stage([radios("cq-game-rb", ["Pix", "Boleto"], 0)]); },
      link: function(){ return stage([c("cds-link", { label: "Ver relatórios", href: "#/castanha-quiz", appearance: "accent", "show-trailing-item": "false" })]); },
      ib: function(){ return stage([c("cds-icon-button", { icon: "search-line", label: "Buscar", kind: "default", appearance: "accent" })]); },
      alert: function(){ var a = c("cds-alert", { appearance: "informative", label: "Depósito agendado", "show-close-button": "false" }); a.appendChild(txt("span", null, "O saldo cai na conta das pessoas colaboradoras no dia 5.")); return stage([a]); }
    },
    // Jogo · Certo ou errado? (Tema Caju)
    v: {
      ib: function(){ return stage([c("cds-icon-button", { icon: "search-line", label: "Buscar", kind: "default", appearance: "accent" })]); },
      icon: function(){ return stage([c("cds-icon", { icon: "search-line", size: "medium", appearance: "accent" })]); },
      small: function(){ return stage([c("cds-main-button", { label: "Continuar", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" })]); },
      gap: function(){ return stage([code([["gap", "15px"]])]); },
      font: function(){ return stage([code([["font", "var(--text-style-body-regular)"]])]); },
      elev: function(){ var k = c("cds-card", { "has-border": "false", class: "pg-cq__elev" }); k.appendChild(c("cds-text-content", { label: "Saldo disponível", description: "Vale-refeição" })); return stage([k]); }
    }
  };
  // Etapa 2: cenas de texto (Conteúdo), ilustração (Ilustração) e código (Motion, Camadas)
  function said(title, desc){ var k = c("cds-card", { "has-border": "true", class: "pg-cq__say" }); k.appendChild(c("cds-text-content", { label: title, description: desc || "", "show-description": desc ? null : "false" })); return stage([k]); }
  function btnScene(label){ return stage([c("cds-main-button", { label: label, "show-lead-icon": "false", "show-trailing-icon": "false" })]); }
  function alertScene(label, text){ var a = c("cds-alert", { appearance: "warning", label: label, "show-close-button": "false" }); a.appendChild(txt("span", null, text)); return stage([a]); }
  function codeScene(rows){ return stage([code(rows)]); }
  var ILL = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ILL[i.name] = i.src; });
  function illScene(name){ var im = c("img", { alt: "", width: "120", height: "120", class: "pg-cq__ill" }); im.src = ILL[name] || ""; return stage([im]); }
  var bind = function(f){ var a = [].slice.call(arguments, 1); return function(){ return f.apply(null, a); }; };

  // Inert: o visual é para olhar, não para clicar (o clique é na resposta)
  function look(fn){ return function(){ var e = fn(); e.inert = true; return e; }; }

  // Ligue os pares (Motion): duração lida ao vivo dos tokens de cada Motion Style (Hover In, Pressed, Released, Selected In)
  var MS_PAIRS = [["Hover In/01", "hover-in-01"], ["Pressed/01", "pressed-01"], ["Released/01", "released-01"], ["Selected In/01", "selected-in-01"]].map(function(m){
    // Fora do navegador (catálogo do MCP, smoke em Node) não há getComputedStyle: a duração fica "—" e o texto da página segue no catálogo
    var v = "";
    try { var cs = getComputedStyle(document.documentElement), ref; v = cs.getPropertyValue("--motion-" + m[1] + "-timing").trim(); ref = v.match(/var\((--[\w-]+)\)/); if (ref) v = cs.getPropertyValue(ref[1]).trim(); } catch (e){}
    return [m[0], v || "—"];
  });
  var PUZ = function(n){ return [
    { min: n, illustration: "objetos/trofeu", title: "Montou de primeira", text: "Nenhuma tentativa errada." },
    { min: Math.ceil(n / 2), illustration: "objetos/medalha-1", title: "Mandou bem", text: "Montou com poucas tentativas. Jogue de novo para fazer de primeira." },
    { min: 0, illustration: "notificacoes/success-low-detail", title: "Montou", text: "Revise o treinamento acima e tente de primeira." }
  ]; };
  var GAME6 = function(){ return RES(true).map(function(r){ return r.min === 5 ? Object.assign({}, r, { min: 6 }) : r.min === 3 ? Object.assign({}, r, { min: 4 }) : r; }); };
  var RES = function(game){ return [
    { min: 5, illustration: "objetos/trofeu", title: "Gabaritou", text: game ? "Olho de quem conhece o DS de cor." : "Você está pronta ou pronto para usar no dia a dia." },
    { min: 3, illustration: "objetos/medalha-1", title: "Mandou bem", text: "Revise o que escapou no treinamento acima e tente de novo." },
    { min: 0, illustration: "notificacoes/success-low-detail", title: "Bora mais uma?", text: "Passe pelo treinamento de novo. Na segunda vai." }
  ]; };

  CDS.docs["castanha-quiz"] = {
    tabs: [
      { id: "inicio", title: "Início", blocks: [
        { banner: { area: "aprenda", eyebrow: "Castanha Quiz", heading: "Aprenda jogando", text: "Treinamentos de uns 5 minutos sobre temas do portal. Cada um termina com um jogo e um quiz para testar o que ficou." } },
        { h2: "Escolha um tema" },
        { p: "Cada tema tem um treinamento rápido, um jogo e um quiz de 5 perguntas. O seu melhor resultado fica guardado neste navegador." },
        { shortcuts: { bento: 3, items: [
          { title: "Componentes", text: "Qual componente usar em cada situação: ação ou navegação, seleção e mensagens. Jogo: Qual é o componente?", illustration: "interfaces/lista", href: "#/castanha-quiz/componentes", cta: "Começar" },
          { title: "Tema Caju", text: "Tokens, escala de 4px, área de toque e elevação. Jogo: Certo ou errado?", illustration: "interfaces/customizacao", href: "#/castanha-quiz/tema-caju", cta: "Começar" },
          { title: "Motion", text: "Princípios, Motion Styles, durações e curvas. Jogos: Certo ou errado? e Ligue os pares.", illustration: "objetos/foguete", href: "#/castanha-quiz/motion", cta: "Começar" },
          { title: "Conteúdo", text: "Pilares do tom de voz, verbos que incluem e pontuação. Jogos: Certo ou errado? e Monte o onboarding.", illustration: "comunicacao/perguntas-frequentes", href: "#/castanha-quiz/conteudo", cta: "Começar" },
          { title: "Ilustração", text: "Estilo, categorias, cores e acessibilidade. Jogo: Qual é a categoria?", illustration: "personagens/nadia", href: "#/castanha-quiz/ilustracao", cta: "Começar" },
          { title: "Camadas do DS", text: "Do token à tela: a cascata, o tema e quem cria o quê. Jogos: Certo ou errado? e Monte a cascata.", illustration: "graficos-e-dashboards/setores", href: "#/castanha-quiz/camadas", cta: "Começar" }
        ] } }
      ] },

      { id: "componentes", title: "Componentes", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "Qual componente usar?", text: "Três escolhas que aparecem em toda tela: ação ou navegação, como selecionar e como avisar." } },
        { h2: "Ação ou navegação" },
        { p: "O Main Button faz uma ação: enviar, excluir, confirmar. Para levar a outra página, use o Link. Use um único Main Button primário (accent) por tela ou seção." },
        { compare: [
          { title: "Main Button: ação", attrs: { _tag: "cds-main-button", label: "Enviar comprovante", "show-lead-icon": false, "show-trailing-icon": false } },
          { title: "Link: navegação", attrs: { _tag: "cds-link", label: "Ver relatórios", href: "#/castanha-quiz/componentes", appearance: "accent", "show-trailing-item": false } }
        ] },
        { h2: "Como selecionar" },
        { visual: { render: V.selecao, text: "Checkbox para seleção múltipla. Radio Button para uma opção entre menos de cinco, em fluxos com confirmação posterior. Switch para ligar ou desligar uma configuração com efeito automático." } },
        { h2: "Como avisar" },
        { p: "O Toast é temporário, aparece sobre o conteúdo e some sozinho: serve para mensagens breves, como uma confirmação. O Alert é fixo e persistente, no fluxo da tela. O Modal exige uma ação, como confirmar ou preencher, antes de a pessoa seguir." },
        { compare: [
          { title: "Toast: temporário, sobre o conteúdo", attrs: { _tag: "cds-toast", text: "Comprovante enviado", appearance: "positive", viewport: "desktop" } },
          { title: "Alert: fixo, no fluxo da tela", attrs: { _tag: "cds-alert", appearance: "informative", label: "Depósito agendado", text: "O saldo cai na conta das pessoas colaboradoras no dia 5." } }
        ] },

        { h2: "Lição" },
        { p: "Dez exercícios, uma tela por vez. Você tem 3 vidas, e a questão errada volta no fim da lição." },
        { lesson: { label: "Lição · Componentes", heading: "Qual componente usar?", illustration: "interfaces/lista", storageKey: "componentes", tips: { href: "#/castanha-quiz/componentes", label: "Rever as dicas" }, exercises: [
          { type: "choice", visual: look(V.q.sw), q: "Que componente é este?", options: ["Checkbox", "Switch", "Radio Button"], answer: 1, why: "O Switch liga ou desliga uma configuração, com efeito automático." },
          { type: "fill", text: "Para seleção múltipla, use o ___.", options: ["Checkbox", "Radio Button", "Switch"], answer: 0, why: "O Checkbox é para seleção múltipla." },
          { type: "verdict", visual: look(V.q.link), q: "Main Button para levar a pessoa a outra página.", answer: "dont", why: "Navegação entre páginas é com o Link. O Main Button é para ações." },
          { type: "choice", visual: look(V.q.rb), q: "E este?", options: ["Radio Button", "Checkbox", "Switch"], answer: 0, why: "O Radio Button é para seleção única, em conjuntos de menos de cinco opções." },
          { type: "pairs", q: "Ligue cada componente ao uso.", pairs: [["Checkbox", "Várias opções ao mesmo tempo"], ["Radio Button", "Uma opção entre poucas"], ["Switch", "Liga ou desliga na hora"], ["Toast", "Mensagem breve que some sozinha"]], why: "Cada controle tem o seu caso: múltipla, única, liga e desliga, e a mensagem breve." },
          { type: "choice", q: "Uma confirmação breve, que some sozinha sem interromper o fluxo:", options: ["Toast", "Alert", "Modal"], answer: 0, why: "O Toast é temporário e não bloqueia. O Alert fica fixo e o Modal exige uma ação." },
          { type: "fill", text: "Use um único Main Button ___ por tela ou seção.", options: ["primário (accent)", "ghost", "neutral"], answer: 0, why: "Um primário por tela ou seção deixa a hierarquia clara." },
          { type: "choice", visual: look(V.q.ib), q: "E este?", options: ["Icon", "Icon Button", "Avatar"], answer: 1, why: "Ícone com ação fica dentro do Icon Button: o Medium tem 48px e garante a área de toque." },
          { type: "order", q: "Do aviso que menos interrompe ao que mais interrompe:", pieces: ["Toast: some sozinho", "Alert: fica fixo na tela", "Modal: exige uma ação"], why: "O Toast não interrompe, o Alert fica no fluxo e o Modal pede uma ação antes de seguir." },
          { type: "choice", visual: look(V.q.alert), q: "E este?", options: ["Toast", "Modal", "Alert"], answer: 2, why: "O Alert é fixo e persistente, no fluxo da tela." }
        ] } }
      ] },

      { id: "tema-caju", title: "Tema Caju", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "O básico do Tema Caju", text: "Tokens no lugar de valores soltos, a escala de 4px, a área de toque e a elevação." } },
        { h2: "Token no lugar do valor" },
        { visual: { render: V.tokens, text: "Cor, tamanho, borda, sombra e texto vêm dos tokens `Common/*` do Tema Caju. Use sempre o token, nunca o valor solto: assim o tema escuro e as mudanças da marca chegam sozinhos." } },
        { h2: "A escala de 4px" },
        { p: "A escala parte de uma unidade base de 4px: quase todos os valores, de 4 a 200px, são múltiplos dela. Na prática, seis tamanhos atendem cerca de 90% dos layouts." },
        { tokens: "sizes-default" },
        { h2: "Área de toque" },
        { p: "A referência de área de toque é 48px (`Common/Sizes/48`). No mobile, use o Main Button Medium nas ações de toque, e todo ícone clicável fica dentro de um Icon Button." },
        { compare: [
          { title: "Main Button Medium: 48px", attrs: { _tag: "cds-main-button", label: "Ação primária", size: "medium", "show-lead-icon": false, "show-trailing-icon": false } },
          { title: "Main Button Small: 40px, abaixo da referência", attrs: { _tag: "cds-main-button", label: "Ação primária", size: "small", "show-lead-icon": false, "show-trailing-icon": false } }
        ] },
        { h2: "Elevação" },
        { p: "As sombras são três níveis, `Common/Elevation/level 1` a `level 3`. Escolha o nível para ver o card subir." },
        { tokens: "elevation" },

        { h2: "Jogo: Certo ou errado?" },
        { p: "Seis cenas. Para cada uma, diga se é uso certo do tema ou não." },
        { quiz: { kind: "verdict", label: "Jogo · Certo ou errado?", storageKey: "tema-caju-jogo", right: ["Certo", "Isso mesmo", "Olho bom"], wrong: ["Não é bem assim", "Quase", "Não foi dessa vez"], results: GAME6(), questions: [
          { visual: look(V.v.ib), q: "Ícone de ação dentro de um Icon Button.", answer: "do", why: "O Icon Button Medium tem 48px e garante a área de toque." },
          { visual: look(V.v.icon), q: "Ícone solto na tela, usado como ação.", answer: "dont", why: "Um ícone sozinho não garante área de toque acessível. Coloque-o num Icon Button." },
          { visual: look(V.v.gap), q: "Espaço de 15px entre dois Cards.", answer: "dont", why: "A escala parte de 4px. Use um token `Common/Sizes`, como o 16, nunca o valor solto." },
          { visual: look(V.v.font), q: "Texto com o text style Body/Regular.", answer: "do", why: "Os text styles combinam os primitivos e entram com o shorthand font: var(--text-style-…)." },
          { visual: look(V.v.small), q: "Main Button Small na ação principal de um app mobile.", answer: "dont", why: "O Small tem 40px, abaixo da referência de 48px. No toque, use o Medium." },
          { visual: look(V.v.elev), q: "Card que sobe com a sombra Elevation level 2.", answer: "do", why: "As sombras vêm dos tokens Common/Elevation, do level 1 ao 3." }
        ] } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Tema Caju", storageKey: "tema-caju-quiz", results: RES(false), questions: [
          { q: "A escala de tamanhos parte de qual unidade base?", options: ["4px", "8px", "10px"], answer: 0, why: "A base é 4px: quase todos os valores, de 4 a 200px, são múltiplos dela." },
          { q: "Qual é a área de toque de referência no mobile?", options: ["32px", "40px", "48px"], answer: 2, why: "A referência é 48px, o token Common/Sizes/48." },
          { q: "Quantos tamanhos padrão atendem cerca de 90% dos layouts?", options: ["Seis", "Doze", "Todos os 26"], answer: 0, why: "Toda a escala está disponível, mas seis tamanhos padrão resolvem a maior parte das telas." },
          { q: "Como aplicar um text style no código?", options: ["font-size e line-height soltos", "font: var(--text-style-…)", "Uma classe por tamanho"], answer: 1, why: "O text style entra com o shorthand font e a variável do estilo." },
          { q: "Quantos níveis de elevação o tema tem?", options: ["Dois", "Três", "Cinco"], answer: 1, why: "São três: Common/Elevation level 1, 2 e 3." }
        ] } }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "Motion sem mistério", text: "Os princípios, os Motion Styles dos componentes, as durações e as curvas." } },
        { h2: "Três princípios" },
        { cards: [
          ["Simples", "As transições são suaves e intuitivas, facilitando o aprendizado em sistemas complexos."],
          ["Eficiente", "O movimento fornece respostas claras e destaca o que realmente importa."],
          ["Consistente", "Movimentos suaves e previsíveis garantem uniformidade em todas as plataformas."]
        ] },
        { h2: "Motion Styles" },
        { p: "Os componentes não escolhem duração nem curva na mão: usam os Motion Styles (`/01`), um por interação. Passe o mouse e pressione o botão para ver dois deles." },
        { display: { attrs: { _tag: "cds-main-button", label: "Pagar", "show-lead-icon": false, "show-trailing-icon": false }, live: true } },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { h2: "Duração pelo tamanho do movimento" },
        { p: "A duração depende do tamanho do movimento e da distância que ele percorre na tela: quanto maior a distância, mais longa a animação." },
        { table: { wrap: true, head: ["Família", "Valores", "Quando usar"], rows: [
          ["Short", "50 a 200ms", "Interações rápidas, como hover, cliques e elementos pequenos."],
          ["Medium", "250 a 400ms", "Cliques de botões, entrada de caixas, transformações e animações de saída."],
          ["Long", "450 a 600ms", "Entradas de toast, expansões e animações de entrada na tela."],
          ["Extra-long", "700 a 1000ms", "Momentos especiais, como efeitos uau ou celebrações."]
        ] } },
        { h2: "Curvas" },
        { p: "As curvas dão vida ao movimento: os elementos aceleram no início e desaceleram quando param. A Decelerate é empregada na remoção de elementos, para uma saída rápida e contínua. Passe o mouse para ver cada curva." },
        { tokens: "easing" },

        { h2: "Jogo: Certo ou errado?" },
        { p: "Seis cenas de motion. Diga se cada uma segue o Castanha DS." },
        { quiz: { kind: "verdict", label: "Jogo · Certo ou errado? · Motion", storageKey: "motion-jogo", right: ["Certo", "Isso mesmo", "Olho bom"], wrong: ["Não é bem assim", "Quase", "Não foi dessa vez"], results: GAME6(), questions: [
          { visual: look(bind(codeScene, [["Hover", "Hover In/01"]])), q: "Hover do botão com o Motion Style Hover In/01.", answer: "do", why: "Os componentes usam os Motion Styles, um por interação." },
          { visual: look(bind(codeScene, [["transition", "300ms ease"]])), q: "Transição com duração e curva escritas à mão.", answer: "dont", why: "Duração e curva vêm dos Motion Styles e dos tokens, nunca de valor solto." },
          { visual: look(bind(codeScene, [["Hover", "Extra-long/01 · 700ms"]])), q: "Hover de um botão com uma duração Extra-long.", answer: "dont", why: "Hover pede Short: feedback imediato. Extra-long é para momentos especiais." },
          { visual: look(bind(codeScene, [["Entrada do Toast", "Long"]])), q: "Toast entrando com uma duração Long.", answer: "do", why: "As durações Long são para entradas de toast, expansões e entradas na tela." },
          { visual: look(bind(codeScene, [["Todas as interações", "300ms"]])), q: "A mesma duração em todas as interações da tela.", answer: "dont", why: "Adapte a duração ao tipo de ação e à hierarquia visual." },
          { visual: look(bind(codeScene, [["Saída do Toast", "Decelerate"]])), q: "Toast saindo de cena com a curva Decelerate.", answer: "do", why: "A Decelerate é empregada na remoção de elementos, como feedbacks temporários e notificações." }
        ] } },

        { h2: "Quebra-cabeça: ligue os pares" },
        { p: "Cada Motion Style tem uma duração. Escolha um item de cada coluna para formar o par." },
        { quiz: { kind: "pairs", label: "Quebra-cabeça · Ligue os pares", storageKey: "motion-puzzle", results: PUZ(4),
          prompt: "Motion Style e duração:", pairs: MS_PAIRS,
          why: "Interações rápidas ficam na família Short. O Selected In, que muda o estado, usa uma Medium." } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Motion", storageKey: "motion-quiz", results: RES(false), questions: [
          { q: "Quais são os três princípios de motion do Castanha?", options: ["Rápido, bonito e leve", "Simples, Eficiente e Consistente", "Fluido, expressivo e divertido"], answer: 1, why: "Simples, Eficiente e Consistente." },
          { q: "Os componentes definem duração e curva…", options: ["Pelos Motion Styles, um por interação", "Com valores escritos em cada componente", "Com a mesma duração para tudo"], answer: 0, why: "Os Motion Styles (/01) descem a cascata até os primitivos Common/Motion." },
          { q: "Para hover e cliques, qual família de duração?", options: ["Long", "Extra-long", "Short"], answer: 2, why: "Short é para interações rápidas, como hover, cliques e elementos pequenos." },
          { q: "As durações Extra-long são reservadas para…", options: ["Momentos especiais, como celebrações", "Qualquer entrada na tela", "Hover de botões grandes"], answer: 0, why: "Extra-long é para efeitos uau ou celebrações." },
          { q: "Qual curva é empregada na remoção de elementos?", options: ["Accelerate", "Decelerate", "Linear"], answer: 1, why: "A Decelerate favorece uma saída rápida e contínua." }
        ] } }
      ] },

      { id: "conteudo", title: "Conteúdo", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "Escrever como a Caju", text: "Os pilares do tom de voz, as palavras que incluem e a pontuação de cada parte da tela." } },
        { h2: "Três pilares" },
        { cards: [
          ["Hospitalidade", "Reduzir esforço, orientar, acolher, acompanhar e celebrar nos momentos importantes."],
          ["Simplicidade", "Escrever o suficiente para que as pessoas entendam o que está acontecendo e o que precisam fazer."],
          ["Brasilidade", "Uma linguagem natural, próxima e descomplicada, sem gírias, regionalismos ou expressões caricatas."]
        ] },
        { h2: "Cuidado, não informalidade" },
        { p: "Escreva como alguém atento a quem está do outro lado: pergunte, dê contexto e explique os próximos passos. Expressões como \"Ei\", \"Ops!\", \"Hmm…\" ou \"Beleza?\" podem soar impacientes ou irônicas depois de um erro. Evite em qualquer momento. Para fazer companhia, prefira \"vamos\" e \"a gente\"." },
        { h2: "Palavras que incluem" },
        { p: "Prefira verbos de entendimento e acesso, que acolhem também quem usa leitor de tela." },
        { table: { wrap: true, head: ["Em vez de", "Use"], rows: [["Ver como funciona", "Entender como funciona"], ["Ver saldo", "Consultar saldo"], ["Ver mais", "Nome da área ou Acessar {área}"]] } },
        { h2: "Pontuação" },
        { table: { wrap: true, head: ["Parte da tela", "Regra"], rows: [
          ["Título e CTA", "Sem ponto final."],
          ["Descrição", "Com ponto final."],
          ["Exclamação", "Só na descrição, uma por tela."],
          ["Dois pontos", "Para introduzir uma lista. Nunca em títulos."]
        ] } },

        { h2: "Jogo: Certo ou errado?" },
        { p: "Seis textos de tela. Diga se cada um segue o guia de Conteúdo." },
        { quiz: { kind: "verdict", label: "Jogo · Certo ou errado? · Conteúdo", storageKey: "conteudo-jogo", right: ["Certo", "Isso mesmo", "Olho bom"], wrong: ["Não é bem assim", "Quase", "Não foi dessa vez"], results: GAME6(), questions: [
          { visual: look(bind(said, "Seu Pix foi enviado", "O valor vai chegar de forma imediata.")), q: "Título sem ponto e descrição com ponto final.", answer: "do", why: "Título não leva ponto final. Descrição leva." },
          { visual: look(bind(said, "Pagamento confirmado!")), q: "Título com ponto de exclamação.", answer: "dont", why: "A exclamação vai só na descrição, uma por tela: \"Seu dinheiro já está a caminho!\"." },
          { visual: look(bind(btnScene, "Consultar saldo")), q: "Botão \"Consultar saldo\".", answer: "do", why: "\"Consultar\" acolhe também quem usa leitor de tela, no lugar de \"Ver saldo\"." },
          { visual: look(bind(alertScene, "Ops!", "Algo deu errado. Tente de novo.")), q: "Aviso de erro que começa com \"Ops!\".", answer: "dont", why: "Depois de um erro, \"Ops!\" pode soar impaciente. Explique o que aconteceu e mostre um caminho." },
          { visual: look(bind(btnScene, "Confirmar pagamento.")), q: "CTA com ponto final.", answer: "dont", why: "CTA não leva ponto final: \"Confirmar pagamento\"." },
          { visual: look(bind(said, "Deseja cancelar o pagamento?")), q: "Pergunta direta, sem viés negativo.", answer: "do", why: "Prefira \"Deseja cancelar o pagamento?\" a \"Tem certeza que quer cancelar?\"." }
        ] } },

        { h2: "Quebra-cabeça: monte o onboarding" },
        { p: "Todo onboarding é uma conversa com começo, meio e fim. Coloque as etapas em ordem e confira." },
        { quiz: { kind: "order", label: "Quebra-cabeça · Monte o onboarding", storageKey: "conteudo-puzzle", results: PUZ(4),
          prompt: "A conversa de um onboarding:", pieces: ["Receber: a novidade chega de forma acolhedora", "Contextualizar: por que isso existe e o que muda", "Explicar: como funciona, no momento certo", "Encerrar: o próximo passo fica claro"],
          why: "Receber, contextualizar, explicar e encerrar: no fim, a pessoa se sente segura para seguir sozinha." } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Conteúdo", storageKey: "conteudo-quiz", results: RES(false), questions: [
          { q: "Quais são os três pilares do tom de voz da Caju?", options: ["Hospitalidade, Simplicidade e Brasilidade", "Clareza, Rapidez e Humor", "Formalidade, Precisão e Síntese"], answer: 0, why: "Hospitalidade, Simplicidade e Brasilidade orientam toda a experiência." },
          { q: "Qual texto usar no lugar de \"Ver saldo\"?", options: ["Olhar saldo", "Consultar saldo", "Saldo aqui"], answer: 1, why: "Verbos de acesso, como consultar, incluem quem usa leitor de tela." },
          { q: "Onde vai o ponto de exclamação?", options: ["No título", "No botão", "Na descrição, uma vez por tela"], answer: 2, why: "Uma exclamação por tela, somente em descrição." },
          { q: "O título leva ponto final?", options: ["Não", "Sim", "Só quando é longo"], answer: 0, why: "Título e CTA não levam ponto final." },
          { q: "Expressões como \"Ops!\" e \"Hmm…\"…", options: ["Deixam o texto mais leve depois de um erro", "Devem ser evitadas em qualquer momento", "Só valem em títulos"], answer: 1, why: "Elas simulam conversa, mas podem soar impacientes, irônicas ou infantilizadas." }
        ] } }
      ] },

      { id: "ilustracao", title: "Ilustração", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "Ilustração da Caju", text: "O estilo, as categorias, as cores dos personagens e a acessibilidade." } },
        { h2: "Estilo" },
        { p: "O estilo de ilustração da Caju é orgânico e fluido, com linhas majoritariamente curvas, para uma comunicação amigável e convidativa. A brasilidade vem de artistas modernistas e contemporâneos e de elementos do dia a dia." },
        { h2: "Categorias" },
        { shortcuts: [
          { title: "Personagens", text: "Para uma narrativa mais acolhedora e empática.", illustration: "personagens/nadia" },
          { title: "Objetos", text: "O tipo mais comum: apresenta funcionalidades, ações ou informações de forma simbólica.", illustration: "objetos/foguete" },
          { title: "Feedback", text: "Reforça mensagens de ações e estados do sistema e sugere os próximos passos.", illustration: "notificacoes/success" },
          { title: "Hero", text: "Para gerar momentos WOW, com composições de impacto.", illustration: "hero-employee/login" }
        ] },
        { h2: "Cores dos personagens" },
        { p: "As roupas dos personagens são sempre em tons quentes ou terrosos, como laranja, vermelho, marrom e vinho. O verde aparece em acessórios e calçados. Tons frios, como verde, azul e roxo, entram nos detalhes de cenário, para equilibrar." },
        { h2: "Acessibilidade" },
        { p: "Quando a ilustração só decora e o texto ao lado já diz tudo, ela fica sem texto alternativo (`alt=\"\"`), para o leitor de tela não repetir a mensagem." },

        { h2: "Jogo: Qual é a categoria?" },
        { p: "Seis ilustrações da biblioteca. Diga a categoria de cada uma." },
        { quiz: { label: "Jogo · Qual é a categoria?", storageKey: "ilustracao-jogo", results: GAME6(), questions: [
          { visual: look(bind(illScene, "personagens/nadia")), q: "Qual é a categoria desta ilustração?", options: ["Objetos", "Personagens", "Hero"], answer: 1, why: "Personagens trazem uma narrativa mais acolhedora e empática." },
          { visual: look(bind(illScene, "objetos/foguete")), q: "E desta?", options: ["Objetos", "Feedback", "Personagens"], answer: 0, why: "Objetos apresentam funcionalidades e informações de forma simbólica." },
          { visual: look(bind(illScene, "notificacoes/success")), q: "E desta?", options: ["Hero", "Objetos", "Feedback"], answer: 2, why: "Feedback reforça mensagens de ações e estados do sistema, como sucesso." },
          { visual: look(bind(illScene, "hero-employee/login")), q: "E desta?", options: ["Hero", "Personagens", "Feedback"], answer: 0, why: "Hero gera momentos WOW, como no login e na splash screen." },
          { visual: look(bind(illScene, "notificacoes/error")), q: "E desta?", options: ["Objetos", "Feedback", "Hero"], answer: 1, why: "Ilustrações de erro são Feedback: comunicam falhas de forma leve." },
          { visual: look(bind(illScene, "personagens/thiago")), q: "E desta?", options: ["Personagens", "Objetos", "Feedback"], answer: 0, why: "Mais um personagem: narrativa acolhedora." }
        ] } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Ilustração", storageKey: "ilustracao-quiz", results: RES(false), questions: [
          { q: "Como é o estilo de ilustração da Caju?", options: ["Geométrico e rígido", "Orgânico e fluido", "Realista e detalhado"], answer: 1, why: "Linhas majoritariamente curvas, com aspecto orgânico e fluido." },
          { q: "As roupas dos personagens são em…", options: ["Tons frios, como azul e roxo", "Tons quentes ou terrosos", "Qualquer cor da marca"], answer: 1, why: "Laranja, vermelho, marrom e vinho. O verde fica para acessórios e calçados." },
          { q: "Onde entram os tons frios?", options: ["Nos detalhes de cenário", "Na pele dos personagens", "Nas roupas"], answer: 0, why: "Os tons frios equilibram o cenário junto aos tons quentes." },
          { q: "Para que serve a categoria Hero?", options: ["Ícones de ação", "Mensagens de erro", "Momentos WOW"], answer: 2, why: "Hero estabelece o tom emocional com composições de impacto." },
          { q: "Ilustração decorativa com o texto ao lado dizendo tudo. Qual texto alternativo?", options: ["Vazio: alt=\"\"", "O nome do arquivo", "Uma descrição longa da cena"], answer: 0, why: "Assim o leitor de tela não repete a mensagem." }
        ] } }
      ] },

      { id: "camadas", title: "Camadas do DS", blocks: [
        { banner: { area: "aprenda", eyebrow: "5 min · jogo e quiz", heading: "Do token à tela", text: "Como as camadas do Castanha DS se conectam e quem cria e mantém cada coisa." } },
        { h2: "A cascata" },
        { p: "O Castanha DS funciona em camadas. Cada camada aponta para a de cima e nunca pula uma camada. Por isso uma marca nova ou o tema escuro mudam o tema e o Brand Style, sem tocar nos componentes nem nas telas." },
        { table: { wrap: true, head: ["Camada", "O que é"], rows: [
          ["Primitives", "Os valores, chamados pelo valor."],
          ["Themes", "A intenção: Light e Dark apontam para primitivos diferentes."],
          ["Brand Style", "O espelho `Common/` que chega ao código."],
          ["Styles", "Texto, Motion Styles, elevação e Viewport prontos."],
          ["Componentes", "O que o time do DS publica e mantém."],
          ["Composição", "O arranjo de componentes numa tela."]
        ] } },
        { h2: "Regras de ouro" },
        { table: { wrap: true, head: ["Regra", "Na prática"], rows: [
          ["Siga a cascata", "O componente usa o Brand Style, que aponta para o tema, que aponta para o primitivo."],
          ["Marca e tema escuro mudam no tema", "O mesmo token aponta para outro valor em cada mode. O componente continua igual."],
          ["Espelhe em Common/", "Só o Brand Style chega ao código."],
          ["Primitivo se chama pelo valor", "A intenção mora no tema, não no primitivo."],
          ["Publique em cascata", "Primeiro o tema, depois o Brand Style."],
          ["Cada token no seu lugar", "Token de texto em texto, de borda em borda, de superfície em fundo."]
        ] } },
        { h2: "Quem cria e quem mantém" },
        { p: "Antes de criar algo, a pergunta do InnerSource: outro time precisaria disso sem saber que você criou? Componente do DS é do time do DS. Local asset é de um único time. Composição é uma tela: não vira team component." },

        { h2: "Jogo: Certo ou errado?" },
        { p: "Seis decisões de token e de biblioteca. Diga se cada uma segue as camadas." },
        { quiz: { kind: "verdict", label: "Jogo · Certo ou errado? · Camadas", storageKey: "camadas-jogo", right: ["Certo", "Isso mesmo", "Olho bom"], wrong: ["Não é bem assim", "Quase", "Não foi dessa vez"], results: GAME6(), questions: [
          { visual: look(bind(codeScene, [["color", "var(--common-colors-text-intense)"]])), q: "Título do card com o token Text/intense do Brand Style.", answer: "do", why: "O componente usa o Brand Style, e o tema escuro chega sozinho." },
          { visual: look(bind(codeScene, [["color", "#1a1a1a"]])), q: "Título do card com uma cor fixa.", answer: "dont", why: "Com cor fixa, no Dark o texto some e as outras marcas deixam de funcionar." },
          { visual: look(bind(codeScene, [["Primitive", "Duration/short"]])), q: "Primitivo com nome de uso, como Duration/short.", answer: "dont", why: "Primitivo se chama pelo valor. Quando o valor mudar, o nome de uso mente." },
          { visual: look(bind(codeScene, [["texto", "Border/soft"]])), q: "Token de borda aplicado num texto.", answer: "dont", why: "Cada token no seu lugar: texto em texto, borda em borda." },
          { visual: look(bind(codeScene, [["1º", "Theme"], ["2º", "Brand Style"]])), q: "Publicar o tema antes do Brand Style.", answer: "do", why: "Publique em cascata: o Brand Style aponta para aliases do tema, que precisam existir antes." },
          { visual: look(bind(codeScene, [["Composição", "vira team component"]])), q: "Transformar a composição de uma tela em team component.", answer: "dont", why: "Isso aumenta a biblioteca do time e o custo de manutenção sem ganho de reuso." }
        ] } },

        { h2: "Quebra-cabeça: monte a cascata" },
        { p: "As camadas estão embaralhadas. Use as setas para colocar em ordem, do valor até a tela, e confira." },
        { quiz: { kind: "order", label: "Quebra-cabeça · Monte a cascata", storageKey: "camadas-puzzle", results: PUZ(6),
          prompt: "Da base (o valor) até a tela:", pieces: ["Primitives", "Themes", "Brand Style", "Styles", "Componentes", "Composição"],
          why: "Cada camada aponta para a de cima, sem pular nenhuma." } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Camadas do DS", storageKey: "camadas-quiz", results: RES(false), questions: [
          { q: "Como as camadas se conectam?", options: ["Cada uma aponta para a de cima, sem pular nenhuma", "O componente aponta direto para o primitivo", "Cada tela escolhe a camada que quiser"], answer: 0, why: "Siga a cascata: nunca pule uma camada." },
          { q: "O que chega ao código?", options: ["Os primitivos", "O tema", "O Brand Style, com prefixo Common/"], answer: 2, why: "Só o Brand Style chega ao código, como variável CSS." },
          { q: "Um primitivo se chama pelo…", options: ["Uso", "Valor", "Componente"], answer: 1, why: "A intenção mora no tema, não no primitivo." },
          { q: "Para o tema escuro funcionar, o que muda?", options: ["O tema: o mesmo token aponta para outro valor", "Cada componente ganha uma versão dark", "As telas trocam as cores"], answer: 0, why: "O componente continua igual. O token aponta para outro valor em cada mode." },
          { q: "Uma composição de tela deve virar team component?", options: ["Sim, sempre", "Não", "Só se tiver mais de três componentes"], answer: 1, why: "Composição é uma tela: virar team component só aumenta o custo de manutenção." }
        ] } }
      ] }
    ]
  };

  // ---- Aba Jogar (pedido do Gustavo, 08/10): as abas de tema ficam só com o estudo; os jogos, quizzes e quebra-cabeças viram
  // um banco de exercícios por tema, e a aba Jogar monta uma lição (composição <cmp-lesson>) com os temas escolhidos
  var DOC = CDS.docs["castanha-quiz"], BANK = {}, NAMES = {}, ORDER = [];
  DOC.tabs.forEach(function(t){
    if (t.id === "inicio") return;
    var i = -1; t.blocks.some(function(b, k){ if (b.h2 && /^(Jogo|Quiz|Quebra-cabeça|Lição)/.test(b.h2)){ i = k; return true; } return false; });
    if (i < 0) return;
    var ex = [], seen = {};
    function add(x){ var k = x.type + "|" + (x.q || x.text); if (seen[k]) return; seen[k] = 1; ex.push(x); }
    t.blocks.slice(i).forEach(function(b){
      if (b.lesson) b.lesson.exercises.forEach(add);
      if (b.quiz){ var q = b.quiz;
        if (q.kind === "order") add({ type: "order", q: q.prompt, pieces: q.pieces, why: q.why });
        else if (q.kind === "pairs") add({ type: "pairs", q: q.prompt, pairs: q.pairs, why: q.why });
        else q.questions.forEach(function(x){ add(Object.assign({}, x, { type: q.kind === "verdict" ? "verdict" : "choice" })); });
      }
    });
    BANK[t.id] = ex; NAMES[t.id] = t.title; ORDER.push(t.id);
    t.blocks = t.blocks.slice(0, i).concat([
      { h2: "Pratique" },
      { p: "Estudou? Teste o que ficou na aba Jogar: escolha " + t.title + " sozinho ou junto com outros temas." },
      { shortcuts: [{ title: "Jogar " + t.title, text: ex.length + " exercícios no banco deste tema. A lição sorteia 10, com 3 vidas.", illustration: "objetos/foguete", href: "#/castanha-quiz/jogar", cta: "Ir para Jogar" }] }
    ]);
    t.blocks.forEach(function(b){ if (b.banner && /jogo e quiz/.test(b.banner.eyebrow || "")) b.banner.eyebrow = "5 min de estudo"; });
  });

  // Sorteio: até 10 exercícios, alternando os temas escolhidos; no máximo 2 de ordenar ou ligar pares
  function sample(ids, n){
    var pools = ids.map(function(id){ return BANK[id].slice().sort(function(){ return Math.random() - 0.5; }); }), out = [], heavy = 0, k = 0, guard = 0;
    while (out.length < n && pools.some(function(p){ return p.length; }) && guard++ < 500){
      var p = pools[k++ % pools.length]; if (!p.length) continue;
      var x = p.shift(); if (x.type === "order" || x.type === "pairs"){ if (heavy >= 2) continue; heavy++; }
      out.push(x);
    }
    return out;
  }
  var TOTAL = "cds-lesson:_total";
  function getTotal(){ try { return JSON.parse(localStorage.getItem(TOTAL) || "null") || { xp: 0 }; } catch (e){ return { xp: 0 }; } }
  function addXp(n){ var t = getTotal(); t.xp = (t.xp || 0) + n; try { localStorage.setItem(TOTAL, JSON.stringify(t)); } catch (e){} return t; }

  // Ranking do time: app da Web do Google Apps Script numa planilha da Caju (scripts/ranking/Code.gs, docs/RANKING-TIME.md).
  // Restrito a contas @caju.com.br; sem o endereço ou fora da conta Caju, vale o ranking deste navegador.
  var RANKING_URL = "https://script.google.com/a/macros/caju.com.br/s/AKfycbxWFEr522Mq-s3IB-wnM_tZQWnGg0PKsgxA_Nc-fco885cHT3YzvNEtuX3KpDJFhiwM/exec";
  var team = { top: null, state: RANKING_URL ? "loading" : "off" };
  function jsonp(params){
    return new Promise(function(ok, fail){
      var cb = "cdsRank" + Date.now() + Math.floor(Math.random() * 1e4), s = document.createElement("script"), q = [];
      var end = function(){ delete window[cb]; s.remove(); clearTimeout(t); };
      var t = setTimeout(function(){ end(); fail(new Error("timeout")); }, 8000);
      window[cb] = function(r){ end(); if (r && r.ok) ok(r); else fail(new Error(r && r.error || "erro")); };
      Object.keys(params).forEach(function(k){ q.push(k + "=" + encodeURIComponent(params[k])); });
      s.src = RANKING_URL + "?" + q.concat("callback=" + cb).join("&");
      s.onerror = function(){ end(); fail(new Error("rede")); };
      document.head.appendChild(s);
    });
  }

  function jogar(){
    var c = function(t, a, k){ return CDS.create(t, a, k); };
    var wrap = c("div", null, "pg-cq__play");
    var head = wrap.appendChild(c("div", null, "pg-cq__play-head"));
    head.appendChild(c("p", null, "pg-cq__cap")).textContent = "Escolha os temas";
    var xpTag = head.appendChild(c("cds-tag", { appearance: "accent", icon: "bright-star-line" }));
    function drawXp(){ xpTag.setAttribute("label", getTotal().xp + " XP no total"); }
    drawXp();
    var chips = wrap.appendChild(c("cds-chips-group", { "role-kind": "multiple", label: "Temas do jogo" }));
    var all = chips.appendChild(c("cds-filter-chip", { label: "Todos", "show-lead-icon": "false", selected: "" }));
    var themeChips = ORDER.map(function(id){ var ch = chips.appendChild(c("cds-filter-chip", { label: NAMES[id], "show-lead-icon": "false" })); ch._id = id; return ch; });
    var host = wrap.appendChild(c("div", null, "pg-cq__play-lesson"));
    function chosen(){ var ids = themeChips.filter(function(ch){ return ch.hasAttribute("selected"); }).map(function(ch){ return ch._id; }); return ids.length ? ids : ORDER.slice(); }
    function build(){
      var ids = chosen(), isAll = ids.length === ORDER.length;
      var l = c("cmp-lesson", { label: "Jogo · " + (isAll ? "Todos os temas" : ids.map(function(id){ return NAMES[id]; }).join(" + ")),
        heading: isAll ? "Todos os temas" : ids.map(function(id){ return NAMES[id]; }).join(" + "), illustration: "objetos/foguete",
        "storage-key": "jogo-" + (isAll ? "todos" : ids.slice().sort().join("+")),
        "score-multiplier": isAll ? "1.5" : null, "ranking-key": "castanha-quiz",
        "ranking-label": isAll ? "Todos" : ids.map(function(id){ return NAMES[id]; }).join(" + ") });
      l.exercises = sample(ids, 10);
      l.resample = function(){ return sample(ids, 10); }; // cada partida sorteia de novo
      l.addEventListener("cmp-lesson-done", function(e){ addXp(e.detail.xp); drawXp(); });
      l.addEventListener("cmp-lesson-rank", drawRank);
      lesson = l; attach();
      host.innerHTML = ""; host.appendChild(l);
    }
    // Ranking: Top 10 do time (planilha da Caju) ou deste navegador, com as iniciais de 3 letras gravadas no fim da partida
    var rank = wrap.appendChild(c("div", null, "pg-cq__rank")), lesson = null;
    // a lição em andamento passa a gravar no ranking do time assim que ele responde (sem recomeçar a partida)
    function attach(){ if (team.state === "on" && lesson) lesson.remote = { top: team.top, add: function(e){ return jsonp({ action: "add", name: e.name, score: e.score, label: e.label }).then(function(r){ team.top = r.top; if (lesson) lesson.remote.top = r.top; return r; }); } }; }
    if (team.state === "loading") jsonp({ action: "top" }).then(function(r){ team.top = r.top; team.state = "on"; attach(); drawRank(); }, function(){ team.state = "fail"; drawRank(); });
    function drawRank(){
      var L = window.customElements && customElements.get("cmp-lesson"), on = team.state === "on";
      var list = on ? team.top : L && L.ranking ? L.ranking("castanha-quiz") : [];
      rank.innerHTML = "";
      rank.appendChild(c("p", null, "pg-cq__cap")).textContent = on ? "Ranking do time" : "Ranking deste navegador";
      if (team.state === "loading"){ rank.appendChild(c("cds-skeleton", { kind: "square" })); return; }
      if (team.state === "fail"){ rank.appendChild(c("cds-alert", { appearance: "informative", label: "Ranking do time indisponível", "show-close-button": "false", text: "Entre com sua conta da Caju no Google para ver e entrar no ranking do time. Enquanto isso, o ranking fica neste navegador." })); }
      if (!list.length){ rank.appendChild(c("p", null, "pg-cq__rank-empty")).textContent = "Ninguém no ranking ainda. Termine uma partida e grave suas iniciais."; return; }
      var t = c("cds-table", { label: on ? "Os 10 melhores do time" : "Os 10 melhores neste navegador", selectable: "false", "show-toolbar": "false", "show-pagination": "false" });
      t.columns = [{ key: "pos", label: "#", kind: "text", sortable: false, width: 64 }, { key: "name", label: "Iniciais", kind: "text", sortable: false },
        { key: "score", label: "Pontos", kind: "text", sortable: false }, { key: "label", label: "Temas", kind: "tag", sortable: false }];
      function tx(v, icon){ return { text: v, icon: icon || false, description: "" }; } // célula Text sem o Lead Icon, menos a coroa do 1º
      t.rows = list.map(function(e, i){ return { id: String(i + 1), pos: tx((i + 1) + "º", i === 0 ? "admin-line" : null), name: tx(e.name), score: tx(e.score.toLocaleString("pt-BR")), label: { label: e.label, showLeadItem: false } }; });
      rank.appendChild(t);
      var crown = t.querySelector("tbody tr:first-child cds-icon"); if (crown) crown.setAttribute("appearance", "accent"); // coroa do 1º em Accent (pedido do Gustavo)
    }
    // Todos marca tudo; escolher um tema desmarca Todos; sem nenhum tema, volta para Todos
    all.addEventListener("cds-change", function(e){ if (e.detail.selected) themeChips.forEach(function(ch){ ch.removeAttribute("selected"); }); else all.setAttribute("selected", ""); build(); });
    themeChips.forEach(function(ch){ ch.addEventListener("cds-change", function(){
      var any = themeChips.some(function(x){ return x.hasAttribute("selected"); });
      if (any) all.removeAttribute("selected"); else all.setAttribute("selected", "");
      build();
    }); });
    build(); drawRank();
    return wrap;
  }
  var inicio = DOC.tabs[0];
  // Jogar fica na última aba (pedido do Gustavo, 08/10): quem quiser passa pelos treinamentos antes; o Início tem o atalho
  DOC.tabs.push({ id: "jogar", title: "Jogar", blocks: [
    { banner: { area: "aprenda", eyebrow: "Castanha Quiz", heading: "Hora de jogar", text: "Escolha um tema, vários ou todos. A lição sorteia 10 exercícios, com 3 vidas, e a questão errada volta no fim." } },
    { visual: { render: jogar, bare: true } },
    { h2: "Como pontuar" },
    { table: { wrap: true, head: ["Jogada", "Pontos"], rows: [
      ["Acerto de primeira", "100"], ["Acerto na revisão", "50"], ["3 acertos seguidos", "Combo x2 a partir do 3º"], ["5 acertos seguidos", "Combo x3 a partir do 5º"],
      ["Cada vida que sobrou no fim", "200"], ["Lição sem erros", "500"], ["Jogar com todos os temas", "Total x1,5"]
    ] } },
    { p: "Errou, o combo zera. Se as vidas acabarem, os pontos dos acertos ainda valem para o ranking." },
    { note: "Com a conta da Caju logada no Google, o ranking é do time inteiro e guarda só as 3 iniciais, os pontos, os temas e a data. Sem ela, o ranking fica neste navegador. O XP fica sempre neste navegador." }
  ] });
  // Início: estudo nas abas de tema, prática na aba Jogar
  inicio.blocks.forEach(function(b){
    if (b.banner){ b.banner.text = "Estude cada tema em uns 5 minutos e jogue com os temas que quiser. Acertos seguidos valem combo, e o recorde vai para o ranking."; b.banner.href = "#/castanha-quiz/jogar"; b.banner.cta = "Jogar agora"; }
    if (b.p && /Cada tema tem/.test(b.p)) b.p = "Cada tema tem um treinamento rápido. Depois, pratique na aba Jogar, com um tema só ou vários juntos.";
    if (b.shortcuts){ (b.shortcuts.items || b.shortcuts).forEach(function(it){ it.text = it.text.replace(/ Jogos?: .*$/, ""); it.cta = "Estudar"; }); }
  });
})();
