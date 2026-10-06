/* Recurso: Camadas — as camadas do Castanha DS, do primitivo à composição na tela do produto.
   Fontes: skills castanha-themes (architecture, creating-a-theme, dev-side), castanhads-juntos e criar-tarefa,
   docs do time (Arquitetura de Tokens, InnerSource), chamados de suporte e tarefas do board do DS.
   Site público: sem nomes de pessoas, canais, chaves de tarefa, links internos nem decisões ainda em aberto. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "camadas", name: "Camadas", resource: true, order: 1.5 }); // menu: Padrões, entre Tema Caju e Conteúdo (RES_SECTIONS no app.js)

  var FUND = ["Fundação", "informative"], EST = ["Estilo", "accent"], DS = ["Design System", "positive"], PROD = ["Produto", "warning"];

  // ---- Blocos visuais (no estilo da tab Motion do Tema Caju: palco + painel com a cascata) ----
  // Fora do navegador (catálogo do MCP, sem DOM) só os dados interessam.
  if (CDS.docBlocks && typeof document !== "undefined"){
    var el = function(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
    var rich = function(n, s){ return CDS.docRich ? CDS.docRich(n, s) : (n.textContent = s, n); };
    var tag = function(parent, label, app){ var t = parent.appendChild(document.createElement("cds-tag")); t.setAttribute("label", label); t.setAttribute("appearance", app || "neutral"); t.setAttribute("show-lead-item", "false"); return t; };
    var arrow = function(parent, icon){ var i = parent.appendChild(document.createElement("cds-icon")); i.setAttribute("icon", icon || "navigation-right-line"); i.setAttribute("size", "small"); i.setAttribute("appearance", "neutral"); i.setAttribute("aria-hidden", "true"); return i; };
    var GROUP_CLS = { "Fundação": "is-fund", "Estilo": "is-est", "Design System": "is-ds", "Produto": "is-prod" };

    // Pilha de camadas: placas isométricas (Primitives embaixo, Composição em cima); clicar numa placa abre o painel
    CDS.docBlocks.arqStack = function(d, v){
      var n = v.items.length, wrap = el("div", "pg-mo-live pg-arq");
      var stage = wrap.appendChild(el("div", "pg-tok-stage pg-arq-stage"));
      var stack = stage.appendChild(el("ol", "pg-arq-stack")); stack.setAttribute("aria-label", v.label || "Camadas");
      var panel = wrap.appendChild(el("div", "pg-mo-panel pg-arq-panel")); panel.setAttribute("aria-live", "polite");
      var btns = [];
      // de cima para baixo na tela: a última camada (Composição) no topo, Primitives na base
      v.items.slice().reverse().forEach(function(it, r){
        var i = n - 1 - r, li = stack.appendChild(el("li", "pg-arq-layer " + (GROUP_CLS[it.group[0]] || "")));
        li.style.setProperty("--_z", String(n - r));
        if (r > 0 && v.items[i + 1].group[0] !== it.group[0]) li.classList.add("is-gap"); // respiro entre grupos
        var b = li.appendChild(el("button", "pg-arq-plate")); b.type = "button";
        b.setAttribute("aria-label", (i + 1) + ". " + it.name + " (" + it.group[0] + ")");
        b.appendChild(el("span", "pg-arq-plate__slab")).setAttribute("aria-hidden", "true");
        var lb = b.appendChild(el("span", "pg-arq-plate__label"));
        lb.appendChild(el("span", "pg-arq-plate__n", String(i + 1)));
        lb.appendChild(el("span", "pg-arq-plate__name", it.name));
        b.addEventListener("click", function(){ go(i); });
        b.addEventListener("mouseenter", function(){ li.classList.add("is-hover"); });
        b.addEventListener("mouseleave", function(){ li.classList.remove("is-hover"); });
        btns[i] = { li: li, b: b };
      });
      // legenda dos grupos
      var leg = stage.appendChild(el("div", "pg-arq-legend"));
      [FUND, EST, DS, PROD].forEach(function(g){ tag(leg, g[0], g[1]); });
      function go(i){
        var it = v.items[i];
        btns.forEach(function(x, k){ x.li.classList.toggle("is-current", k === i); x.b.setAttribute("aria-pressed", String(k === i)); });
        panel.innerHTML = "";
        var head = panel.appendChild(el("div", "pg-arq-panel__head"));
        var t = head.appendChild(el("div", "pg-mo-panel__head"));
        t.appendChild(el("span", "pg-mo-panel__title", it.name));
        t.appendChild(el("span", "pg-mo-panel__when", "Camada " + (i + 1) + " de " + n));
        tag(head, it.group[0], it.group[1]);
        panel.appendChild(rich(el("p", "pg-doc-p"), it.text));
        if (it.examples){
          panel.appendChild(el("span", "pg-tok-chain__k", "Exemplos"));
          var ex = panel.appendChild(el("div", "pg-arq-tags")); it.examples.forEach(function(e){ tag(ex, e); });
        }
        if (it.where) panel.appendChild(rich(el("p", "pg-arq-where"), it.where));
        // vizinhas na pilha: a de baixo (de onde vem) e a de cima (quem usa), com Main Button Ghost do DS
        var nav = panel.appendChild(el("div", "pg-arq-nav"));
        var link = function(k, icon, lead){ var b = nav.appendChild(document.createElement("cds-main-button"));
          [["label", v.items[k].name], ["kind", "ghost"], ["appearance", "neutral"], ["size", "small"], [lead ? "lead-icon" : "trailing-icon", icon], ["show-lead-icon", String(!!lead)], ["show-trailing-icon", String(!lead)]].forEach(function(a){ b.setAttribute(a[0], a[1]); });
          b.addEventListener("click", function(){ go(k); }); };
        if (i > 0) link(i - 1, "down-line", true); else nav.appendChild(el("span"));
        if (i < n - 1) link(i + 1, "up-line", false);
      }
      go(v.start != null ? v.start : 3);
      return wrap;
    };

    // Do token à tela: uma tela pequena com componentes do DS; clicar num elemento desce a cascata até o valor do primitivo.
    // Mode (Light/Dark) troca os tokens só dentro da tela; Viewport muda a largura dela.
    CDS.docBlocks.arqCascade = function(d, v){
      var wrap = el("div", "pg-arq-cascade");
      var ctl = wrap.appendChild(el("div", "pg-arq-ctl"));
      var live = wrap.appendChild(el("div", "pg-mo-live"));
      var stage = live.appendChild(el("div", "pg-tok-stage pg-arq-screen"));
      var frame = stage.appendChild(el("div", "pg-arq-frame"));
      var panel = live.appendChild(el("div", "pg-mo-panel")); panel.setAttribute("aria-live", "polite");
      // a tela de exemplo (só componentes e tokens do DS)
      var card = frame.appendChild(document.createElement("cds-card")); card.setAttribute("has-border", "true"); card.className = "pg-arq-card";
      var top = card.appendChild(el("div", "pg-arq-card__top"));
      var title = top.appendChild(el("h4", "pg-arq-card__title", "Resumo do pedido"));
      var status = tag(top, "Aprovado", "positive");
      var body = card.appendChild(el("p", "pg-arq-card__text", "2 itens · entrega amanhã"));
      var pay = card.appendChild(document.createElement("cds-main-button"));
      [["label", "Pagar"], ["appearance", "accent"], ["show-lead-icon", "false"], ["show-trailing-icon", "false"]].forEach(function(a){ pay.setAttribute(a[0], a[1]); });
      var NODES = { button: pay, card: card, title: title, tag: status, text: body };
      var st = { mode: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light", vp: "mobile", cur: v.start || "button" };
      // tokens do tema escuro e do claro lidos das próprias regras do tokens.css (sem duplicar valores aqui)
      function props(sel){
        var out = {};
        [].forEach.call(document.styleSheets, function(sh){ var rules; try { rules = sh.cssRules; } catch (e){ return; }
          [].forEach.call(rules || [], function(r){ if (r.selectorText === sel) for (var k = 0; k < r.style.length; k++){ var p = r.style[k]; if (p.indexOf("--") === 0) out[p] = r.style.getPropertyValue(p).trim(); } }); });
        return out;
      }
      var DARK = props('html[data-theme="dark"]'), LIGHT = props(":root"), VP = { mobile: "Mobile", tablet: "Tablet", desktop: "Desktop" };
      function applyMode(){ var src = st.mode === "dark" ? DARK : LIGHT; Object.keys(DARK).forEach(function(p){ if (src[p] != null) frame.style.setProperty(p, src[p]); }); frame.dataset.mode = st.mode; }
      function applyVp(){ frame.dataset.vp = st.vp; }
      var ctlItem = function(label, value, opts, fn){ var w = ctl.appendChild(el("div", "pg-arq-ctl__item")); w.appendChild(el("span", "pg-tok-chain__k", label)); if (CDS.docChoice) w.appendChild(CDS.docChoice(label, value, opts, fn)); };
      ctlItem("Mode", st.mode, [["light", "Light"], ["dark", "Dark"]], function(m){ st.mode = m; applyMode(); go(st.cur); });
      ctlItem("Viewport", st.vp, [["mobile", "Mobile"], ["tablet", "Tablet"], ["desktop", "Desktop"]], function(x){ st.vp = x; applyVp(); go(st.cur); });
      Object.keys(NODES).forEach(function(k){
        var n = NODES[k]; n.classList.add("pg-arq-target"); n.dataset.k = k;
        if (k !== "button"){ n.tabIndex = 0; n.setAttribute("role", "button"); }
        n.setAttribute("aria-label", "Ver a cascata de " + v.targets.filter(function(t){ return t.key === k; })[0].name);
        n.addEventListener("click", function(e){ e.stopPropagation(); go(k); });
        n.addEventListener("keydown", function(e){ if (k !== "button" && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); go(k); } });
      });
      function row(layer, n, fill){
        var line = panel.appendChild(el("div", "pg-arq-row"));
        line.appendChild(el("span", "pg-arq-row__n", String(n)));
        line.appendChild(el("span", "pg-arq-row__k", layer));
        var val = line.appendChild(el("div", "pg-arq-row__v")); fill(val);
        return line;
      }
      function go(k){
        st.cur = k;
        if (!frame.isConnected) return void requestAnimationFrame(function(){ go(k); }); // valor resolvido só com a tela na página
        var t = v.targets.filter(function(x){ return x.key === k; })[0], node = NODES[k];
        Object.keys(NODES).forEach(function(x){ NODES[x].classList.toggle("is-current", x === k); });
        var cssVar = "--" + t.brand.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-");
        var hex = getComputedStyle(frame).getPropertyValue(cssVar).trim();
        panel.innerHTML = "";
        var head = panel.appendChild(el("div", "pg-mo-panel__head"));
        head.appendChild(el("span", "pg-mo-panel__title", t.name));
        head.appendChild(el("span", "pg-mo-panel__when", t.what + " · da tela até o valor"));
        row("Composição", 9, function(c){ c.appendChild(el("span", "pg-arq-row__t", v.screen)); });
        row("Local assets", 8, function(c){ c.appendChild(el("span", "pg-arq-row__t is-none", "Nenhum: a tela usa só o DS")); });
        row("Templates", 7, function(c){ c.appendChild(el("span", "pg-arq-row__t is-none", "Nenhum: card solto na tela")); });
        row("Componentes", 6, function(c){ tag(c, t.component); });
        row("Styles", 5, function(c){ t.styles.forEach(function(s){ tag(c, s); }); tag(c, "Viewport " + VP[st.vp]); });
        row("Brand Style", 4, function(c){ tag(c, t.brand, "accent"); });
        row("Modes", 3, function(c){ tag(c, st.mode === "dark" ? "Dark" : "Light", "informative"); });
        row("Themes", 2, function(c){ tag(c, t.brand.replace(/^Common\/Colors\//, "")); });
        row("Primitives", 1, function(c){
          var sw = c.appendChild(el("span", "pg-arq-swatch")); sw.style.background = hex; sw.setAttribute("aria-hidden", "true");
          c.appendChild(el("code", "pg-arq-row__code", hex || "—"));
          c.appendChild(el("span", "pg-arq-row__t is-none", "tom da escala escolhido pelo tema"));
        });
        panel.appendChild(rich(el("p", "pg-arq-where"), "No código: `var(" + cssVar.replace(/^--common-/, "--castanha-") + ")`. " + (t.note || "")));
      }
      applyMode(); applyVp(); go(st.cur);
      return wrap;
    };

    // Regras em pares Faça × Evite, cada lado com um mini diagrama montado com Tags do DS, ícones e cores reais do tema
    // (amostras leem o token ao vivo; "modes" mostra o valor em Light e Dark lido das regras do tokens.css)
    var GROUP_APP = { fund: "informative", est: "accent", ds: "positive", prod: "warning", code: "neutral" };
    function ruleProps(sel){
      var out = {};
      [].forEach.call(document.styleSheets, function(sh){ var rules; try { rules = sh.cssRules; } catch (e){ return; }
        [].forEach.call(rules || [], function(r){ if (r.selectorText === sel) for (var k = 0; k < r.style.length; k++){ var p = r.style[k]; if (p.indexOf("--") === 0) out[p] = r.style.getPropertyValue(p).trim(); } }); });
      return out;
    }
    var LIGHT_P = null, DARK_P = null;
    function diagram(parent, spec, bad){
      var row = parent.appendChild(el("div", "pg-arq-dia" + (bad ? " is-bad" : "")));
      spec.forEach(function(s){
        if (s === "→") return arrow(row);
        if (s === "⇢"){ var i = arrow(row); i.classList.add("is-skip"); i.setAttribute("appearance", "negative"); return; }
        if (s.chip) return tag(row, s.chip, GROUP_APP[s.group] || "neutral");
        if (s.bad){ var t = tag(row, s.bad, "negative"); return t; }
        if (s.skip) return row.appendChild(el("span", "pg-arq-dia__skip", s.skip));
        if (s.code){ var c = row.appendChild(el("code", "pg-arq-dia__code", s.code)); return c; }
        if (s.swatch){ var w = row.appendChild(el("span", "pg-arq-dia__sw")); w.style.background = "var(" + s.swatch + ")"; w.setAttribute("aria-hidden", "true"); return w; }
        if (s.modes){
          if (!LIGHT_P){ LIGHT_P = ruleProps(":root"); DARK_P = ruleProps('html[data-theme="dark"]'); }
          [["Light", LIGHT_P[s.modes]], ["Dark", DARK_P[s.modes] || LIGHT_P[s.modes]]].forEach(function(m){
            var g = row.appendChild(el("span", "pg-arq-dia__mode"));
            var sw = g.appendChild(el("span", "pg-arq-dia__sw")); sw.style.background = m[1] || ""; sw.setAttribute("aria-hidden", "true");
            g.appendChild(el("span", null, m[0] + " " + (m[1] || "")));
          });
        }
      });
      return row;
    }
    CDS.docBlocks.arqRules = function(d, v){
      var list = el("div", "pg-arq-rules");
      v.items.forEach(function(it, i){
        var card = list.appendChild(el("cds-card", "pg-arq-rule")); card.setAttribute("has-border", "true");
        var head = card.appendChild(el("div", "pg-arq-rule__head"));
        head.appendChild(el("span", "pg-arq-rule__n", String(i + 1)));
        var ht = head.appendChild(el("div", "pg-arq-rule__ht"));
        ht.appendChild(el("h3", "pg-arq-rule__title", it.title));
        if (it.text) ht.appendChild(rich(el("p", "pg-doc-p"), it.text));
        var cols = card.appendChild(el("div", "pg-arq-rule__cols"));
        [["do", "Faça", "positive", "check-line"], ["dont", "Evite", "negative", "close-line"]].forEach(function(k){
          var side = it[k[0]]; if (!side) return;
          var c = cols.appendChild(el("div", "pg-arq-rule__side is-" + k[0]));
          var lab = c.appendChild(document.createElement("cds-tag")); lab.setAttribute("label", k[1]); lab.setAttribute("appearance", k[2]); lab.setAttribute("icon", k[3]);
          if (side.diagram) diagram(c, side.diagram, k[0] === "dont");
          c.appendChild(rich(el("p", "pg-doc-p"), side.text));
        });
      });
      return list;
    };
    // Quem cria e quem mantém: um card por tipo, com Shaped Icon do DS e lista de definição (composição cmp-definition-list)
    CDS.docBlocks.arqOwners = function(d, v){
      var grid = el("div", "pg-arq-owners");
      v.items.forEach(function(it){
        var card = grid.appendChild(el("cds-card", "pg-arq-owner")); card.setAttribute("has-border", "true");
        var h = card.appendChild(el("div", "pg-arq-owner__head"));
        var sh = h.appendChild(document.createElement("cds-shaped-icon")); sh.setAttribute("icon", it.icon); sh.setAttribute("appearance", it.app); sh.setAttribute("size", "small");
        h.appendChild(el("h3", "pg-arq-rule__title", it.title));
        if (it.text) card.appendChild(rich(el("p", "pg-doc-p"), it.text));
        var dl = card.appendChild(document.createElement("cmp-definition-list")); dl.setAttribute("layout", "stacked");
        if (dl.setItems) dl.setItems(it.rows); else it.rows.forEach(function(r){ dl.appendChild(el("dt", null, r[0])); dl.appendChild(el("dd", null, r[1])); });
      });
      return grid;
    };
  }

  CDS.docs["camadas"] = {
    tabs: [
      { id: "camadas", title: "Camadas", blocks: [
        { h2: "Como o Castanha DS se organiza" },
        { p: "O Castanha DS funciona em camadas. Cada camada aponta para a de cima e nunca pula uma camada. Por isso uma marca nova ou o tema escuro mudam o tema e o Brand Style, sem tocar nos componentes nem nas telas." },
        { p: "As camadas de Fundação e Estilo são tokens e estilos. As de Design System são o que o time do DS publica e mantém. As de Produto são o que cada squad monta com o DS. Clique numa placa para abrir a camada." },
        { arqStack: { label: "Camadas do Castanha DS, da base para a tela", start: 3, items: [
          { id: "primitives", name: "Primitives", group: FUND,
            text: "Valores crus, nomeados pelo próprio valor e sem intenção de uso: escalas de cor de 50 a 900, raios, tamanhos, durações e curvas de motion. É o dicionário de onde o tema escolhe.",
            examples: ["Colors/Grape/500", "Motion/Duration/150", "Radius/8"],
            where: "Figma: biblioteca `[CastanhaDS] Primitives Tokens`. Componente nunca usa primitivo direto." },
          { id: "theme", name: "Themes", group: FUND,
            text: "Dá função aos primitivos: cada token do tema aponta para um primitivo e diz para que serve (accent, neutral, support, feedback). O tema escolhe da escala os pares que cumprem o contraste do WCAG 2.2 AA.",
            examples: ["Accent/Solid/medium", "Surface/Neutral/primary", "Text/Semantic/negative"],
            where: "Figma: biblioteca `[Caju] Theme`, coleção `Caju Beneficios`. O tema não guarda valor, ele aponta." },
          { id: "modes", name: "Modes", group: FUND,
            text: "Não são uma camada à parte: são variações dentro de cada coleção. O tema tem Light e Dark, o Brand Style tem um mode por marca, os Motion Styles têm Normal e Reduced e o Viewport tem Mobile, Tablet e Desktop.",
            examples: ["Light", "Dark", "Reduced", "Mobile · Tablet · Desktop"],
            where: "O que não depende do tema, como motion, tem o mesmo valor em Light e Dark." },
          { id: "brand-style", name: "Brand Style", group: EST,
            text: "O ponto de encontro: espelha o tema com o prefixo `Common/` e acrescenta os tokens de função (texto, ícone, superfície, borda, feedback). Uma marca nova entra como um mode novo aqui. É a camada que chega ao código.",
            examples: ["Common/Colors/Text/intense", "Common/Sizes/16", "Common/Border/Radius/pill"],
            where: "Figma: coleção `Brand Style` em `[CastanhaDS] Components`. Código: `--castanha-colors-text-intense` (pacote castanha-tokens)." },
          { id: "styles", name: "Styles", group: EST,
            text: "Combinações prontas que apontam para o Brand Style: estilos de texto (fonte, tamanho, peso, altura de linha), Motion Styles por interação (duração e curva), elevações (sombra) e o Viewport (grids e medidas por faixa de tela).",
            examples: ["Body/Bold Body", "Hover In/01", "Elevation/level 2", "Viewport: Mobile < 744"],
            where: "Figma: `.Text Styles`, `.Motion Styles`, effect styles e a coleção Viewport. No React, texto e motion vêm do componente `Text` e de mixins, fora do pacote de tokens." },
          { id: "componentes", name: "Componentes", group: DS,
            text: "Os componentes do DS consomem o Brand Style e os Styles. Peças internas reutilizáveis são Building Blocks, nomeadas como \"Sub-componente Componente\". Figma e código batem 1:1 em props, nomes e estados.",
            examples: ["Main Button", "Text Field", "Accordion Item"],
            where: "Figma: `[CastanhaDS] Components`. Código: castanha-react e a lib Flutter, com o Storybook como referência do que está em produção." },
          { id: "templates", name: "Templates", group: DS,
            text: "Telas e trechos padronizados que se repetem em vários produtos, montados com instâncias dos componentes, sem componente duplicado. Entram no DS quando servem a mais de um produto.",
            examples: ["Feedback Page", "App Shell", "Header do Sponsor"],
            where: "Figma: bibliotecas de templates mobile e desktop. Neste site: Patterns e o cabeçalho do Sponsor." },
          { id: "local-assets", name: "Local assets", group: PROD,
            text: "O que é de um time: componentes, módulos, ilustrações e motion específicos de um produto. Usam tokens e componentes do Castanha, ficam na biblioteca do time e são mantidos pela squad. Se outros times precisarem, viram candidatos ao DS.",
            examples: ["Card de despesas da squad", "Ilustração de campanha"],
            where: "Figma: biblioteca do time. Não passa pela revisão do DS." },
          { id: "composicao", name: "Composição", group: PROD,
            text: "O arranjo de componentes, templates e assets para resolver uma tela ou um fluxo. Não é componente e não tem intenção de reuso, por isso não precisa de documentação nem de dono.",
            examples: ["Tela de confirmação de pedido", "Fluxo de cadastro"],
            where: "Figma: arquivo do produto. Neste site, as composições `cmp-*` cumprem esse papel enquanto o DS não tem o componente." }
        ] } },
        { h2: "Do token à tela" },
        { p: "Clique num elemento da tela para descer a cascata: da composição até o valor do primitivo. Troque o Mode para ver o mesmo token apontar para outro valor no Dark, sem mudar o componente." },
        { arqCascade: { screen: "Resumo do pedido (tela do produto)", start: "button", targets: [
          { key: "button", name: "Main Button · Accent", what: "Fundo do botão", component: "Main Button", styles: ["Label/Bold Label", "Hover In/01"], brand: "Common/Colors/Accent/Solid/medium", note: "No hover, o Motion Style Hover In/01 troca para `Accent/Solid/semi-intense`." },
          { key: "card", name: "Card · Has Border", what: "Fundo do card", component: "Card", styles: ["Elevation: nenhuma"], brand: "Common/Colors/Surface/default" },
          { key: "title", name: "Título do card", what: "Cor do texto", component: "Text (no React)", styles: ["Title/Small"], brand: "Common/Colors/Text/intense" },
          { key: "text", name: "Texto de apoio", what: "Cor do texto", component: "Text (no React)", styles: ["Body/Regular Body"], brand: "Common/Colors/Text/medium" },
          { key: "tag", name: "Tag · Positive", what: "Fundo da tag", component: "Tag", styles: ["Caption/Medium Caption"], brand: "Common/Colors/Feedback/Positive/soft", note: "Feedback não varia por marca: a mesma cor de sucesso em todas." }
        ] } },
        { note: "Na dúvida sobre onde algo mora, faça a pergunta do InnerSource: outro time precisaria disso sem saber que você criou? Se sim, é candidato ao DS. Se não, é Local asset ou Composição." }
      ] },
      { id: "regras", title: "Regras", blocks: [
        { h2: "Regras de ouro" },
        { p: "Seis regras que mantêm o tema, as marcas e o código em ordem. Em cada uma, o jeito certo e o que evitar, com a cadeia de tokens que acontece de verdade." },
        { arqRules: { items: [
          { title: "Siga a cascata", text: "Cada camada aponta para a de cima, sem pular nenhuma.",
            do: { text: "O componente usa o Brand Style, que aponta para o tema, que aponta para o primitivo.", diagram: [{ chip: "Componente", group: "ds" }, "→", { chip: "Brand Style", group: "est" }, "→", { chip: "Theme", group: "fund" }, "→", { chip: "Primitive", group: "fund" }] },
            dont: { text: "Componente ou tela apontando direto para um primitivo ou para um valor fixo: o tema escuro e as outras marcas deixam de funcionar.", diagram: [{ chip: "Componente", group: "ds" }, "⇢", { skip: "Brand Style" }, { skip: "Theme" }, "⇢", { bad: "Primitive" }] } },
          { title: "Marca e tema escuro mudam no tema", text: "O componente não sabe qual é a marca nem o modo.",
            do: { text: "O mesmo token aponta para outro valor em cada mode. O componente continua igual.", diagram: [{ chip: "Text/intense", group: "fund" }, "→", { modes: "--common-colors-text-intense" }] },
            dont: { text: "Cor fixa dentro do componente para atender uma marca ou um modo: no Dark, o texto some.", diagram: [{ chip: "Título do card", group: "ds" }, "→", { bad: "#1a1a1a" }] } },
          { title: "Espelhe em Common/", text: "Só o Brand Style chega ao código.",
            do: { text: "Todo token que o código usa tem espelho com o prefixo Common/ e vira variável CSS no pacote de tokens.", diagram: [{ chip: "Accent/Solid/medium", group: "fund" }, "→", { chip: "Common/Colors/Accent/Solid/medium", group: "est" }, "→", { code: "--castanha-colors-accent-solid-medium" }] },
            dont: { text: "Token do tema sem espelho no Brand Style: ele não chega ao código.", diagram: [{ chip: "Theme", group: "fund" }, "⇢", { bad: "código" }] } },
          { title: "Primitivo se chama pelo valor", text: "A intenção mora no tema, não no primitivo.",
            do: { text: "O primitivo é `150`. Quem diz que ele é curto é o tema.", diagram: [{ chip: "Motion/Duration/short-03", group: "fund" }, "→", { chip: "Motion/Duration/150", group: "fund" }] },
            dont: { text: "Primitivo com nome de uso, como `Duration/short`: quando o valor mudar, o nome mente.", diagram: [{ bad: "Primitive: Duration/short" }] } },
          { title: "Publique em cascata", text: "Os aliases sobrevivem por ID, mas a ordem importa.",
            do: { text: "Primitives, depois Theme, depois Brand Style, depois código. Nomes decididos antes de publicar.", diagram: [{ chip: "1 · Primitives", group: "fund" }, "→", { chip: "2 · Theme", group: "fund" }, "→", { chip: "3 · Brand Style", group: "est" }, "→", { chip: "4 · Código", group: "code" }] },
            dont: { text: "Publicar o Brand Style antes do tema: ele aponta para um alias que ainda não existe na biblioteca.", diagram: [{ chip: "Brand Style", group: "est" }, "⇢", { bad: "Theme (não publicado)" }] } },
          { title: "Cada token no seu lugar", text: "Os scopes das variáveis no Figma limitam onde cada token aparece.",
            do: { text: "Token de texto em texto, de borda em borda, de superfície em fundo.", diagram: [{ chip: "Text/intense", group: "est" }, "→", { chip: "texto", group: "code" }, { swatch: "--common-colors-text-intense" }] },
            dont: { text: "Token de borda num texto ou de superfície numa borda: o contraste e o tema escuro saem do controle.", diagram: [{ chip: "Border/soft", group: "est" }, "⇢", { bad: "texto" }] } }
        ] } },
        { h2: "Quem cria e quem mantém" },
        { p: "Antes de criar algo, a pergunta do InnerSource: outro time precisaria disso sem saber que você criou?" },
        { arqOwners: { items: [
          { title: "Componente do DS", icon: "view-module-line", app: "positive", text: "Serve a todos os produtos.", rows: [["Quem cria", "Time do DS"], ["Quem mantém", "Time do DS"], ["Onde mora", "Biblioteca do Castanha"], ["Documentação", "Obrigatória e pública"]] },
          { title: "Evolutiva", icon: "plus-line", app: "accent", text: "Variante ou prop nova num componente que já existe.", rows: [["Quem cria", "Designer do produto propõe"], ["Quem mantém", "Time do DS aprova e mantém"], ["Onde mora", "Biblioteca do Castanha"], ["Documentação", "Obrigatória"]] },
          { title: "Local asset", icon: "folder-line", app: "warning", text: "Componente, módulo ou asset de um time só.", rows: [["Quem cria", "Designer do produto"], ["Quem mantém", "Squad"], ["Onde mora", "Biblioteca do time"], ["Documentação", "Recomendada"]] },
          { title: "Composição", icon: "home-line", app: "neutral", text: "Arranjo de componentes para resolver uma tela.", rows: [["Quem cria", "Designer do produto"], ["Quem mantém", "Ninguém: é uma tela"], ["Onde mora", "Arquivo do produto"], ["Documentação", "Não precisa"]] }
        ] } },
        { p: "Composição não vira team component: isso aumenta a biblioteca do time e o custo de manutenção sem ganho de reuso." }
      ] },
      { id: "figma-codigo", title: "Do Figma ao código", blocks: [
        { h2: "Como um token chega ao código" },
        { steps: [
          { title: "Figma", text: "As variáveis vivem nas bibliotecas de Primitives, Theme e Components (Brand Style). Mudar um token é sempre um par: variáveis no Figma e depois a sincronia no código." },
          { title: "Plugin castanha-castoken", text: "Leva as variáveis do Figma para o repositório de tokens." },
          { title: "Pacote castanha-tokens", text: "Gera as variáveis CSS `--castanha-<grupo>-<caminho>`: o nome do Figma sem `Common` e `Specific`, com `/` e espaço trocados por `-`, tudo em minúsculas.", list: ["`Common/Colors/Text/intense` → `--castanha-colors-text-intense`", "`Common/Sizes/16` → `--castanha-sizes-16`"] },
          { title: "castanha-react e Flutter", text: "Os componentes leem as variáveis do pacote. Estilos de texto, motion e sombras ainda vêm do componente `Text` e de mixins, fora do pacote." }
        ] },
        { h2: "Tema novo ou marca nova" },
        { steps: [
          { title: "Inspecionar", text: "Conferir o que existe e confirmar o escopo antes de criar qualquer variável." },
          { title: "Tema", text: "Criar a coleção e os modes (Light e Dark) e os tokens semânticos com alias para primitivos que já existem." },
          { title: "Brand Style", text: "Espelhar os tokens em `Common/`. Uma marca nova é um mode novo nesta coleção. Os tokens de feedback não variam por marca." },
          { title: "Conferir e publicar", text: "Visualizar as variáveis, conferir contraste e publicar em cascata: Primitives, Theme, Brand Style e código." }
        ] },
        { note: "Primitivo novo é exceção: entra quando nenhuma combinação dos primitivos existentes resolve, e quem decide é o time do DS." }
      ] }
    ]
  };
})();
