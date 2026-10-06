/* Castanha Quiz (Aprenda): treinamentos rápidos sobre temas do portal, cada um com jogo e quiz (pedido do Gustavo, 06/10).
   Formato por tema, uns 5 minutos: treinamento rápido (blocos curtos com visual ao vivo) · jogo · quiz de 5 perguntas.
   Todo conteúdo vem do próprio portal (docs dos componentes e Tema Caju), sem regra nova. Jogos e quiz = composição
   <cmp-quiz> (kind "verdict" = Certo ou errado); o melhor resultado fica no localStorage de quem joga (storage-key).
   Etapa 1: Componentes e Tema Caju. Etapa 2: Motion, Conteúdo, Ilustração e Camadas do DS. */
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
  // Inert: o visual é para olhar, não para clicar (o clique é na resposta)
  function look(fn){ return function(){ var e = fn(); e.inert = true; return e; }; }

  var RES = function(game){ return [
    { min: 5, illustration: "objetos/trofeu", title: "Gabaritou!", text: game ? "Olho de quem conhece o DS de cor." : "Você está pronta ou pronto para usar no dia a dia." },
    { min: 3, illustration: "objetos/medalha-1", title: "Mandou bem!", text: "Revise o que escapou no treinamento acima e tente de novo." },
    { min: 0, illustration: "notificacoes/success-low-detail", title: "Bora mais uma?", text: "Passe pelo treinamento de novo. Na segunda vai." }
  ]; };

  CDS.docs["castanha-quiz"] = {
    tabs: [
      { id: "inicio", title: "Início", blocks: [
        { banner: { area: "aprenda", eyebrow: "Castanha Quiz", heading: "Aprenda jogando", text: "Treinamentos de uns 5 minutos sobre temas do portal. Cada um termina com um jogo e um quiz para testar o que ficou." } },
        { h2: "Escolha um tema" },
        { p: "Cada tema tem um treinamento rápido, um jogo e um quiz de 5 perguntas. O seu melhor resultado fica guardado neste navegador." },
        { shortcuts: [
          { title: "Componentes", text: "Qual componente usar em cada situação: ação ou navegação, seleção e mensagens. Jogo: Qual é o componente?", illustration: "interfaces/lista", href: "#/castanha-quiz/componentes", cta: "Começar" },
          { title: "Tema Caju", text: "Tokens, escala de 4px, área de toque e elevação. Jogo: Certo ou errado?", illustration: "interfaces/customizacao", href: "#/castanha-quiz/tema-caju", cta: "Começar" }
        ] },
        { note: "Novos temas a caminho: Motion, Conteúdo, Ilustração e Camadas do DS." }
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

        { h2: "Jogo: Qual é o componente?" },
        { p: "Seis componentes ao vivo. Diga o nome de cada um." },
        { quiz: { label: "Jogo · Qual é o componente?", storageKey: "componentes-jogo", results: RES(true).map(function(r){ return r.min === 5 ? Object.assign({}, r, { min: 6 }) : r.min === 3 ? Object.assign({}, r, { min: 4 }) : r; }), questions: [
          { visual: look(V.q.sw), q: "Que componente é este?", options: ["Checkbox", "Switch", "Radio Button"], answer: 1, why: "O Switch liga ou desliga uma configuração, com efeito automático." },
          { visual: look(V.q.rb), q: "E este?", options: ["Radio Button", "Checkbox", "Switch"], answer: 0, why: "O Radio Button é para seleção única, em conjuntos de menos de cinco opções." },
          { visual: look(V.q.link), q: "E este?", options: ["Main Button Ghost", "Tag", "Link"], answer: 2, why: "O Link leva para outra página. Para ações, o Main Button." },
          { visual: look(V.q.tag), q: "E este?", options: ["Tag", "Badge", "Main Button"], answer: 0, why: "A Tag é da família Status: identifica um estado, como Ativo." },
          { visual: look(V.q.ib), q: "E este?", options: ["Icon", "Icon Button", "Avatar"], answer: 1, why: "Ícone com ação fica dentro do Icon Button: o Medium tem 48px e garante a área de toque." },
          { visual: look(V.q.alert), q: "E este?", options: ["Toast", "Modal", "Alert"], answer: 2, why: "O Alert é fixo e persistente, no fluxo da tela, para mensagens que precisam ficar visíveis." }
        ] } },

        { h2: "Quiz" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Componentes", storageKey: "componentes-quiz", results: RES(false), questions: [
          { q: "Para levar a pessoa a outra página, use…", options: ["Main Button", "Link", "Icon Button"], answer: 1, why: "Main Button é para ações. Navegação entre páginas é com o Link." },
          { q: "A pessoa pode escolher várias opções ao mesmo tempo. Qual componente?", options: ["Checkbox", "Radio Button", "Switch"], answer: 0, why: "O Checkbox é para seleção múltipla." },
          { q: "Uma configuração que liga e desliga, com efeito na hora:", options: ["Radio Button", "Checkbox", "Switch"], answer: 2, why: "O Switch habilita ou desabilita configurações com efeito automático." },
          { q: "Uma confirmação breve, que some sozinha sem interromper o fluxo:", options: ["Toast", "Alert", "Modal"], answer: 0, why: "O Toast é temporário e não bloqueia. O Alert fica fixo e o Modal exige uma ação." },
          { q: "Quantos Main Buttons primários (accent) por tela ou seção?", options: ["Quantos a tela precisar", "Dois, um para cada lado", "Um"], answer: 2, why: "Use um único Main Button primário por tela ou seção, para a hierarquia ficar clara." }
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
        { quiz: { kind: "verdict", label: "Jogo · Certo ou errado?", storageKey: "tema-caju-jogo", right: ["Certo!", "Isso!", "Olho bom!"], wrong: ["Não é bem assim.", "Quase!", "Ops!"], results: RES(true).map(function(r){ return r.min === 5 ? Object.assign({}, r, { min: 6 }) : r.min === 3 ? Object.assign({}, r, { min: 4 }) : r; }), questions: [
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
      ] }
    ]
  };
})();
