/* Treinamento: Como usar as Documentações? (zeroheight · Capacitações → Treinamentos → Design System · 8276145).
   No Hub, cada tab é só um vídeo do Drive (cortes da gravação do lançamento da documentação, 30/01/2026), sem texto.
   Aqui: resumo de cada tema a partir das Anotações do Gemini da reunião (decisão do Gustavo: resumo basta, com link
   para o vídeo; os vídeos só abrem com login Caju). Pessoas aparecem pelo papel, não pelo nome. Revisão: CONFERIR C157. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var ZH = "https://castanha.caju.com.br/858426090/v/latest/p/508bfb-treinamento-como-usar-as-documentacoes";
  var GS = "https://www.figma.com/design/RF5sagPdKQD6IoP2MYa2ki/Getting-Started--Castanha-Design-System?node-id=2316-1161";
  var GS0 = "https://www.figma.com/design/RF5sagPdKQD6IoP2MYa2ki/Getting-Started--Castanha-Design-System?node-id=143-111";
  CDS.register({ id: "treinamento", name: "Treinamento", resource: true, lede: "Como usar as documentações, organizar o Figma e preparar protótipos.", order: 3, zeroheight: ZH });
  // Player do Drive na página (pedido do Gustavo, como no Hub); só toca com login Caju
  function video(id, tema){
    return { video: { src: "https://drive.google.com/file/d/" + id + "/preview", title: "Vídeo do treinamento: " + tema,
      caption: "Corte da gravação do lançamento da documentação (30/01/2026). Toca com login Caju.",
      href: "https://drive.google.com/file/d/" + id + "/view", cta: "Abrir no Drive" } };
  }
  var DATA = { alert: { appearance: "informative", label: "Gravado em janeiro de 2026",
    text: "Os resumos seguem as anotações automáticas da reunião, organizadas pelo tema de cada vídeo. Números e links citados nos vídeos são daquela data: a situação de hoje está em cada tab." } };


  // Visuais da tab Protótipos no Figma: os slides recriados ao vivo com componentes do DS (pedido do Gustavo, 06/10).
  // Cada função devolve o elemento montado antes de conectar (filhos dos componentes entram antes do connectedCallback).
  // Os destaques (camada do box model, largura, viewport) usam só tokens: classes .pg-pf-* em treinamento.css
  var V = (function(){
    var c = function(t, a, k){ return CDS.create(t, a, k); };
    function txt(tag, cls, t){ var e = c(tag, null, cls); e.textContent = t; return e; }
    // Fixed Tab do DS que troca o estado do palco (data-attr) e a legenda
    function tabs(label, opts, start, stage, attr, cap){
      var ft = c("cds-fixed-tab", { label: label, "active-item": String(start + 1) });
      opts.forEach(function(o){ ft.appendChild(c("cds-tab-item", { label: o[0] })); });
      function set(i){ stage.setAttribute(attr, opts[i][1]); if (cap) cap.textContent = opts[i][2]; }
      ft.addEventListener("cds-change", function(e){ set(e.detail.index - 1); });
      set(start);
      return ft;
    }
    function box(kids, cls){ var b = c("div", null, cls || "pg-pf"); kids.forEach(function(k){ if (k) b.appendChild(k); }); return b; }
    function btn(label){ return c("cds-main-button", { label: label, "show-lead-icon": "false", "show-trailing-icon": "false", inert: "" }); }
    function card(label, desc){ var k = c("cds-card", { "has-border": "true" }); k.appendChild(c("cds-text-content", { label: label, description: desc })); return k; }

    return {
      // Slide 26: o que você desenha × o que o dev implementa (o mesmo Main Button, com as regras lidas do componente)
      dev: function(){
        var dl = c("cmp-definition-list", { layout: "inline" }), right = btn("Continuar");
        var rows = [["content", "Continuar"], ["padding", "…"], ["height", "…"], ["border-radius", "…"]];
        rows.forEach(function(r){ dl.listEl.appendChild(txt("dt", null, r[0])); dl.listEl.appendChild(txt("dd", null, r[1])); });
        requestAnimationFrame(function(){ var b = right.querySelector(".cds-btn"); if (!b) return; var cs = getComputedStyle(b), dd = dl.listEl.querySelectorAll("dd");
          dd[1].textContent = cs.paddingTop + " " + cs.paddingRight; dd[2].textContent = cs.height; dd[3].textContent = cs.borderTopLeftRadius; });
        return box([
          box([txt("p", "pg-pf__cap", "O que você desenha"), box([btn("Continuar")], "pg-pf__stage")], "pg-pf__col"),
          box([txt("p", "pg-pf__cap", "O que o dev implementa"), box([right], "pg-pf__stage pg-pf__inspect"), dl], "pg-pf__col")
        ], "pg-pf pg-pf--pair");
      },
      // Slide 25: box model. Fixed Tab destaca uma camada por vez em dois Cards de uma lista
      boxmodel: function(start){
        return function(){
          var stage = box([card("Saldo disponível", "Vale-refeição"), card("Último pedido", "Ontem, 12:40")], "pg-pf__stage pg-pf__box");
          var cap = c("p", null, "pg-pf__cap");
          var ft = tabs("Camada do box model", [
            ["Content", "content", "Content: o conteúdo real, como texto, ícone e imagem."],
            ["Padding", "padding", "Padding: o respiro interno da caixa. Pertence ao componente."],
            ["Border", "border", "Border: a borda entre o interno e o externo."],
            ["Margin", "margin", "Margin: o espaço entre caixas. Pertence ao contexto."]
          ], start, stage, "data-layer", cap);
          return box([ft, stage, cap]);
        };
      },
      // Slide 24: autolayout é CSS. Fixed Tab troca o sizing do Main Button e mostra a linha de CSS
      autolayout: function(){
        var stage = box([btn("Continuar")], "pg-pf__stage pg-pf__sizing"), cap = c("p", null, "pg-pf__cap pg-pf__css");
        var ft = tabs("Sizing no autolayout", [
          ["Hug", "hug", "Hug contents → width: fit-content"],
          ["Fill", "fill", "Fill container → flex: 1 ou width: 100%"],
          ["Fixed", "fixed", "Fixed → width fixa em px"]
        ], 0, stage, "data-sizing", cap);
        return box([ft, stage, cap]);
      },
      // Slide 23: camadas são a árvore do DOM. Do/Don't com a árvore sem nome e a nomeada
      camadas: function(){
        function tree(items){ var ul = c("ul", null, "pg-pf__tree"); items.forEach(function(it){ var li = ul.appendChild(txt("li", null, it[0])); if (it[1]) li.appendChild(tree(it[1])); }); return ul; }
        var dont = c("cmp-do-dont", { kind: "dont" }), ok = c("cmp-do-dont", { kind: "do" });
        dont.appendChild(tree([["Frame 12", [["Group 3", [["Rectangle 8"], ["Text"]]], ["Frame 7"]]]]));
        dont.appendChild(txt("span", null, "Camadas sem nome e agrupamentos sem relação com a função."));
        ok.appendChild(tree([["Card", [["Header", [["Title"], ["Tag"]]], ["Content"], ["Actions", [["Main Button"]]]]]]));
        ok.appendChild(txt("span", null, "Camadas nomeadas, box model aplicado e componentes do DS."));
        return box([ok, dont], "pg-pf pg-pf--pair"); // Use à esquerda, Não use à direita (D255)
      },
      // Slide 22: comportamento entre tamanhos. Fixed Tab muda a largura do palco e os Cards se reorganizam
      viewports: function(){
        var stage = box([card("Saldo", "Vale-refeição"), card("Pedidos", "3 este mês"), card("Benefícios", "5 ativos")], "pg-pf__stage pg-pf__vp");
        var cap = c("p", null, "pg-pf__cap");
        var ft = tabs("Viewport", [
          ["Mobile", "mobile", "Mobile: uma coluna. Os Cards em Fill ocupam a largura toda."],
          ["Tablet", "tablet", "Tablet: duas colunas. O mesmo conteúdo, reorganizado."],
          ["Desktop", "desktop", "Desktop: três colunas, até o max width do container."]
        ], 0, stage, "data-vp", cap);
        return box([ft, stage, cap]);
      },
      // Slide 07: checklist de entrega com Checkbox do DS; marcou tudo, Tag Positive
      checklist: function(){
        var items = ["Todo frame com autolayout, nada posicionado à mão", "Camadas nomeadas e agrupadas por função", "Fill, Hug ou Fixed definidos em cada eixo", "Min e max width nos containers flexíveis",
          "Controles de viewports e modes aplicados", "Estados extremos testados: texto longo, lista vazia", "Espaçamentos com tokens do DS, não valores soltos", "Uso dos componentes do Castanha DS"];
        var list = box([], "pg-pf__checks"), tag = c("cds-tag", { label: "0 de 8", appearance: "neutral", "show-lead-item": "false" });
        items.forEach(function(t){ list.appendChild(c("cds-checkbox", { label: t })); });
        list.addEventListener("cds-change", function(){
          var n = list.querySelectorAll('cds-checkbox[status="selected"]').length;
          tag.setAttribute("label", n === 8 ? "Pronto para entregar" : n + " de 8"); tag.setAttribute("appearance", n === 8 ? "positive" : "neutral");
          if (n === 8){ tag.setAttribute("icon", "positive-line"); tag.setAttribute("show-lead-item", "true"); } else tag.setAttribute("show-lead-item", "false");
        });
        return box([box([txt("p", "pg-pf__cap", "Marque o que você já faz"), tag], "pg-pf__row"), list]);
      }
    };
  })();


  // Visuais da tab Organizar o Figma (Getting Started, slides 01 a 21): hierarquia em Cards aninhados, árvore da Caju e
  // simulador de permissões, só com componentes do DS. Fatos de permissão e branch conferidos na Central de Ajuda do Figma.
  var V2 = (function(){
    var c = function(t, a, k){ return CDS.create(t, a, k); };
    function txt(tag, cls, t){ var e = c(tag, null, cls); e.textContent = t; return e; }
    return {
      // Slide 03: o que dá para compartilhar, do nível mais amplo ao mais detalhado (Cards aninhados do DS)
      hierarquia: function(){
        var levels = [["Organization", "building-line"], ["Workspace", "view-module-line"], ["Team", "team-line"], ["Project (Folder)", "folder-line"], ["File", "file-line"], ["Prototype", "play-fill"]];
        var root = null, cur = null;
        levels.forEach(function(l){
          var card = c("cds-card", { "has-border": "true", class: "pg-gs__lvl" });
          var head = c("div", null, "pg-gs__lvl-head");
          head.appendChild(c("cds-icon", { icon: l[1], size: "small", appearance: "neutral" }));
          head.appendChild(txt("span", "pg-gs__lvl-name", l[0]));
          card.appendChild(head);
          if (cur) cur.appendChild(card); else root = card;
          cur = card;
        });
        // Em tela estreita os seis Cards aninhados não cabem: a mesma hierarquia vira árvore (container query no CSS)
        function tree(i){ var ul = c("ul", null, "pg-pf__tree"); var li = ul.appendChild(txt("li", null, levels[i][0])); if (i + 1 < levels.length) li.appendChild(tree(i + 1)); return ul; }
        var wrap = c("div", { class: "pg-gs__nest", role: "img", "aria-label": "Organization contém Workspace, que contém Team, que contém Project, que contém File, que contém Prototype." });
        var cards = wrap.appendChild(c("div", null, "pg-gs__cards")); cards.appendChild(root);
        var list = wrap.appendChild(c("div", null, "pg-gs__list")); list.appendChild(tree(0));
        return wrap;
      },
      // Slide 04: como a Caju organiza (árvore no estilo das camadas)
      caju: function(){
        function tree(items){ var ul = c("ul", null, "pg-pf__tree"); items.forEach(function(it){ var li = ul.appendChild(txt("li", null, it[0])); if (it[1]) li.appendChild(tree(it[1])); }); return ul; }
        var box = c("div", null, "pg-pf__stage pg-gs__tree");
        box.appendChild(tree([["Caju Workspace", [["Equipes: um time por produto", [["Projetos: Jornadas, Docs e Local Assets", [["Jornada 01", [["Protótipo da Jornada 01"]]]]]]]]]]));
        return box;
      },
      // Slides 05 e 06: simulador de permissões herdadas e explícitas (Radio Button + Tag do DS)
      permissoes: function(){
        var st = { proj: "view", file: "none" };
        var wrap = c("div", null, "pg-pf");
        function group(label, name, opts, key){
          var g = c("div", { role: "radiogroup", "aria-label": label }, "pg-doc-sc-group");
          opts.forEach(function(o){
            var rb = c("cds-radio-button", { label: o[1], name: name, value: o[0], status: st[key] === o[0] ? "selected" : "unselected" });
            rb.addEventListener("cds-change", function(e){ if (e.detail.status === "selected"){ st[key] = o[0]; draw(); } });
            g.appendChild(rb);
          });
          var col = c("div", null, "pg-pf__col"); col.appendChild(txt("p", "pg-pf__cap", label)); col.appendChild(g); return col;
        }
        var controls = c("div", null, "pg-pf pg-pf--pair");
        controls.appendChild(group("Acesso no projeto Jornadas", "gs-proj", [["view", "can view"], ["edit", "can edit"]], "proj"));
        controls.appendChild(group("Convite no arquivo Jornada 01", "gs-file", [["none", "Sem convite"], ["edit", "can edit"]], "file"));
        var out = c("div", null, "pg-pf__stage pg-gs__result"), cap = c("p", null, "pg-pf__cap");
        function row(name){ var k = c("cds-card", { "has-border": "true", class: "pg-gs__file" }); var h = c("div", null, "pg-gs__lvl-head"); h.appendChild(c("cds-icon", { icon: "file-line", size: "small", appearance: "neutral" })); h.appendChild(txt("span", "pg-gs__lvl-name", name)); var tag = c("cds-tag", { "show-lead-item": "false" }); h.appendChild(tag); k.appendChild(h); out.appendChild(k); return tag; }
        var t1 = row("Jornada 01"), t2 = row("Jornada 02");
        function set(tag, edit){ tag.setAttribute("label", edit ? "Pode editar" : "Pode visualizar"); tag.setAttribute("appearance", edit ? "positive" : "informative"); }
        function draw(){
          var e1 = st.proj === "edit" || st.file === "edit", e2 = st.proj === "edit";
          set(t1, e1); set(t2, e2);
          cap.textContent = st.proj === "edit" ? "can edit no projeto passa para todos os arquivos dentro dele." :
            st.file === "edit" ? "O convite explícito dá mais acesso a Jornada 01. Os outros arquivos seguem com o acesso herdado do projeto (can view)." :
            "can view no projeto passa para todos os arquivos dentro dele.";
        }
        draw();
        wrap.appendChild(controls); wrap.appendChild(out); wrap.appendChild(cap);
        return wrap;
      }
    };
  })();

  CDS.docs["treinamento"] = {
    tabs: [
      { id: "introducao", title: "Introdução", blocks: [
        DATA,
        { h2: "Introdução" },
        video("1PoopyzugGmJDeemX09RoCl_ZVAnCCN54", "Introdução"),
        { p: "Abertura do lançamento da documentação do Castanha DS. O time de Design System apresenta como a documentação está organizada e por que ela existe: manter o padrão e a consistência enquanto o time e o produto crescem." },
        { h3: "Onde fica cada documentação" },
        { ul: [
          "Castanha Hub (zeroheight): para design — orientação, uso dos componentes e das experiências.",
          "Storybook (web) e Widgetbook (mobile): para desenvolvimento — implementação clara e confiável."
        ] },
        { h3: "Como elas se conectam no dia a dia" },
        { steps: [
          { title: "Consultar o Hub", text: "Quem desenha começa pelo Hub, para entender o uso dos componentes e das experiências." },
          { title: "Desenhar no Figma", text: "Com as diretrizes em mente, monta o fluxo com as bibliotecas do Castanha." },
          { title: "Implementar pelo Storybook", text: "No handoff, quem desenvolve usa o Storybook (ou o Widgetbook) para implementar de forma correta e consistente." }
        ] }
      ] },
      { id: "componentes", title: "Componentes", blocks: [
        DATA,
        { h2: "Componentes" },
        video("1MlBoeLbLmRM1cqihOSH0v6c18bqBaYOz", "Componentes"),
        { p: "Como o Hub está dividido e como uma documentação de componente é construída." },
        { h3: "Seções do Hub hoje" },
        { ul: ["Sobre: por onde começar a usar o Castanha.", "Visão Cliente: personas.", "Conteúdo: como a Caju escreve.", "Fundação: ilustração, motion, layout e IA.", "Componentes: um por página.", "Patterns e Templates: padrões de tela.", "Capacitações: as gravações dos treinamentos, como esta.", "Agentes e Skills: o Borô."] },
        { note: "No vídeo, algumas seções aparecem com os nomes antigos (About, Foundation, Layout e Recursos e Ferramentas)." },
        { h3: "Como uma doc de componente é feita" },
        { ul: [
          "Parte dos fluxos que já existem, para achar as dificuldades de uso e decidir o que precisa ser documentado.",
          "Explica o que é, quando usar e quando não usar, com comparações com componentes parecidos.",
          "Traz princípios, estilos, variantes e diretrizes de uso.",
          "Mostra exemplos certos e errados (incluindo motion e padrões de conteúdo) e aplicações em fluxos reais da Caju."
        ] },
        { note: "Hoje: no playground, cada componente com doc tem as tabs Uso, Anatomia, Estilos, Acessibilidade, Diretrizes e Motion, além do Playground." }
      ] },
      { id: "content", title: "Content", blocks: [
        DATA,
        { h2: "Content" },
        video("1eFRhEc_IBus6E-RAOfk2K7NNhW_tGzGc", "Content"),
        { p: "Conteúdo é a forma como a pessoa usuária se relaciona com o produto: sem padrão, a experiência fica inconsistente. O guia oficial de como a Caju escreve fica na documentação de conteúdo, com a meta de escalar para toda a empresa." },
        { h3: "O que a documentação de conteúdo cobre" },
        { ul: ["Princípios de escrita.", "Regras gramaticais, como formato de data e pontuação.", "Playbooks para situações específicas, como o tour guiado.", "Vocabulário: a lista de palavras padronizadas da experiência.", "Guias de notificação."] },
        { h3: "Borô: IA para escalar os padrões" },
        { p: "O Borô é uma base de conhecimento ativa com IA, pensada como assistente do dia a dia de quem desenha. O primeiro teste usou a documentação de conteúdo, e o primeiro mês teve boa avaliação de resolução, relevância e recomendação. O plano é estender o Borô às documentações do Castanha e a insights de pesquisa." },
        { note: "Hoje: o guia está no playground em Fundamentos → Conteúdo, e o Borô tem página própria no Hub (Agentes e Skills)." }
      ] },
      { id: "ilustracao", title: "Ilustração", blocks: [
        DATA,
        { h2: "Ilustração" },
        video("1l-bmWY8NfvkE-4za0h42yKaiImNwAjNH", "Ilustração"),
        { p: "A documentação de ilustração serve para comunicar o visual, reforçar a identidade da Caju e garantir uma experiência de excelência." },
        { h3: "O que ela traz" },
        { ul: ["Princípios de uso.", "Painel semântico: o processo de criação de quem ilustra.", "Guidelines de aplicação nos produtos.", "Separação por categorias.", "Exemplos de como as ilustrações se comportam em cada contexto (mobile, desktop)."] },
        { note: "Hoje: o guia completo e a biblioteca estão no playground em Padrões → Ilustração." }
      ] },
      { id: "motion", title: "Motion", blocks: [
        DATA,
        { h2: "Motion" },
        video("1fqz1azprKWMYtvSQJlXt1fA8Ijw5oo8C", "Motion"),
        { p: "UX motion comunica comportamento, estado e intenção, eleva a experiência e fortalece a personalidade da marca. Parte dos princípios de design do Castanha (simples, eficiente e consistente) e das boas práticas do mercado." },
        { ul: ["Os princípios viraram motion tokens, documentados no Hub para design e desenvolvimento.", "A ideia é que os componentes já venham com as animações configuradas, prontas para quem desenvolve."] },
        { note: "Hoje: princípios, curvas, durações e os Motion Styles estão no playground em Padrões → Motion." }
      ] },
      { id: "recursos", title: "Recursos e ferramentas", blocks: [
        DATA,
        { h2: "Recursos e ferramentas" },
        video("1k0cvIylVYwX8Fr4SwVL43kow-_LZjBlz", "Recursos e ferramentas"),
        { p: "As evoluções do Castanha no código, apresentadas pela engenharia do time: mais integração entre design e código, componentes mais assertivos, documentação padronizada e uma codebase com foco em acessibilidade, variações e tokens. Todos os entregáveis passam a usar o prefixo castanha-." },
        { h3: "O que mudou" },
        { ul: [
          "Tokens modulares, com saída para SCSS, CSS, JavaScript, TypeScript e Dart.",
          "Ícones agnósticos (web e mobile), com nomes alinhados ao design e um componente utilitário de ícone.",
          "Biblioteca React mais leve: num exemplo, o bundle caiu de 500 KB para menos de 15 KB.",
          "Novas bibliotecas: castanha-illustrations (assets de ilustração) e motion (assets e um componente de animação).",
          "Extensões: castanha-castoken, plugin do Figma que leva as variáveis para o GitHub, e castanha-intellisense, autocomplete e realce de tokens no editor (com conversão para Dart).",
          "Storybook 2.0: além dos componentes, documenta plugins, tokens, get started e as novas bibliotecas, com abas de código e design, com link para o Figma.",
          "Prompts de migração com IA para os componentes que mudaram de API."
        ] }
      ] },
      { id: "duvidas", title: "Dúvidas", blocks: [
        DATA,
        { h2: "Dúvidas" },
        video("1tuP6BnQKIbKoQJdh2quAUTKGMqfQa67D", "Dúvidas"),
        { p: "Perguntas do público no fim do lançamento." },
        { h3: "Todos os componentes já estão na nova estrutura?" },
        { p: "Na época, não: a migração era feita passo a passo, começando com 20 componentes na nova estrutura, de 62 em React e 64 em Flutter." },
        { h3: "Os pacotes antigo e novo vão conviver?" },
        { p: "Sim. Dois pacotes evitam breaking changes: o antigo segue com suporte e atualizações, e as novidades entram no novo. A migração é gradual, feita pelas squads com ajuda das ferramentas de migração." },
        { h3: "Onde tirar dúvidas e acompanhar novidades?" },
        { p: "No canal Castanha Suporte, para dúvidas, e no Castanha Novidades, para as atualizações." },
        { note: "Hoje: o playground espelha 105 componentes do Figma, e 70 deles já têm par no castanha-react (staging). Consulte a seção \"No React\" de cada componente." }
      ] },

      // Getting Started (Figma RF5sagPdKQD6IoP2MYa2ki, slides 01 a 21): estrutura, permissões, branches e colaboração.
      // Complementado com a Central de Ajuda e o Fórum do Figma (07/10, pedido do Gustavo); cada fato do Figma tem link.
      // O Figma hoje chama de Folder o que os slides chamam de Project
      { id: "organizar", title: "Organizar o Figma", blocks: [
        { banner: { area: "aprenda", eyebrow: "Treinamento e quiz", heading: "Cuidar e organizar times no Figma", text: "Onde cada arquivo mora, quem pode fazer o quê e como trabalhar em paralelo com branches, sem atrito no arquivo principal.", href: GS0, cta: "Abrir os slides no Figma", external: true } },
        { p: "Esse treinamento mostra como a Caju guarda os arquivos no Figma, como as permissões passam de um nível para o outro e como usar branches para várias pessoas trabalharem no mesmo arquivo. No fim, um quebra-cabeça e um quiz." },

        { h2: "O que dá para compartilhar" },
        { visual: { render: V2.hierarquia, side: true, text: "No Figma, cada nível guarda o de dentro. Dá para compartilhar desde a equipe até um protótipo, do mais amplo ao mais detalhado.", list: [
          "Organization: o nível mais alto da empresa.",
          "Workspace: um conjunto de equipes, pessoas e recursos (plano Enterprise).",
          "Team: a equipe e os seus projetos.",
          "Project: a pasta de arquivos. Hoje o Figma chama de Folder.",
          "File: o arquivo, com as páginas e os frames.",
          "Prototype: o protótipo, que pode ser compartilhado sozinho."
        ] } },

        { h2: "Como a Caju organiza" },
        { visual: { render: V2.caju, side: true, text: "No Caju Workspace, cada produto tem a sua equipe. Dentro dela, os projetos separam jornadas, documentação e local assets, e cada jornada guarda o seu protótipo." } },

        { h2: "Permissões" },
        { p: "As permissões controlam o que cada pessoa pode fazer: com `can view`, ações de leitura, como inspecionar, seguir e comentar. Com `can edit`, mudanças em arquivos e projetos. Elas valem no arquivo, no projeto e na equipe." },
        { h3: "Herdadas e explícitas" },
        { p: "Quem recebe acesso num nível de cima herda o mesmo acesso em tudo que está dentro. Num nível de baixo, um convite explícito pode dar mais acesso do que o herdado, nunca menos. Teste no simulador:" },
        { visual: V2.permissoes },
        { note: "Exemplo dos slides: James tem `can view` no projeto. Convidado com `can edit` para um arquivo, ele edita esse arquivo e continua visualizando os outros. Fonte: [Central de Ajuda do Figma](https://help.figma.com/hc/en-us/articles/35361119554711)." },

        { h2: "Quando usar branches" },
        { p: "A branch é uma cópia do arquivo principal (main) para mexer em designs, protótipos e bibliotecas sem editar o original." },
        { cards: [
          ["Colaboração em equipe", "Várias pessoas ou equipes trabalhando ao mesmo tempo no mesmo arquivo, sem atrito no arquivo principal."],
          ["Bibliotecas compartilhadas", "Mudanças que afetam muita gente ficam isoladas, revisadas e testadas antes do merge."],
          ["Experimentos", "Testar ideias e isolar testes de usabilidade sem mexer no design em produção."],
          ["Handoff e revisão", "Finalizar o design para a entrega ou pedir revisão num ambiente separado."]
        ] },

        { h2: "O fluxo da branch" },
        { steps: [
          { title: "Criar a branch", text: "No menu ao lado do nome do arquivo, Create branch. Na Caju, o nome leva a task: `[JIRA-000] Nome da task`." },
          { title: "Trabalhar e atualizar com o main", text: "Quando o main muda, o Figma avisa. Update from main traz todas as mudanças de uma vez. Num conflito, escolha a versão do main ou a da branch." },
          { title: "Pedir revisão", text: "Em Review and merge changes, envie para quem revisa. Os status são In review, Changes suggested e Approved." },
          { title: "Mergear junto com o código", text: "Na Caju, o merge da branch acontece quando o time de desenvolvimento faz o merge do pull request no código. Depois do merge, a branch é arquivada." }
        ] },
        { note: "Branching existe nos planos Organization e Enterprise. Quem tem `can edit` no main pode mergear. Fontes: [Guia de branching](https://help.figma.com/hc/en-us/articles/360063144053), [Update from main](https://help.figma.com/hc/en-us/articles/5665728006423), [Revisão](https://help.figma.com/hc/en-us/articles/5691414603543) e [Merge](https://help.figma.com/hc/en-us/articles/5691189138839)." },

        { h2: "Antes do merge, saiba" },
        { ul: [
          "O merge leva a branch inteira: não dá para escolher partes. Para cada conflito, Resolve conflicts pede main ou branch.",
          "Os comentários feitos na branch não vão para o main no merge.",
          "A biblioteca publica a partir do main: mudança feita numa branch precisa do merge antes de publicar.",
          "O histórico de versões registra Branch created, Updated from main e Branch merged. Um merge pode ser desfeito restaurando uma versão anterior.",
          "Arquive à mão as branches abandonadas, para a lista não confundir o time."
        ] },
        { note: "Fontes: [Guia de branching](https://help.figma.com/hc/en-us/articles/360063144053), [Merge](https://help.figma.com/hc/en-us/articles/5691189138839), [Boas práticas de branching](https://www.figma.com/best-practices/branching-in-figma/) e [Fórum do Figma](https://forum.figma.com/ask-the-community-7/resolving-branch-and-main-file-conflict-22097)." },

        { h2: "Colaboração no arquivo" },
        { cards: [
          ["Comentários", "Tecla C para comentar e @ para mencionar alguém. Use para chamar quem edita durante o trabalho."],
          ["Spotlight e seguir", "Spotlight me mostra a sua tela para todos. Clique no avatar de alguém para seguir a pessoa."],
          ["Histórico de versões", "Quem tem `can view` vê o histórico. Criar, nomear e restaurar versões pede edição."],
          ["Ready for dev", "Marca o que está pronto para o desenvolvimento, e quem abre o arquivo em Dev Mode é avisado."]
        ] },
        { note: "Fontes: [Comentários](https://help.figma.com/hc/en-us/articles/360041068574), [Spotlight](https://help.figma.com/hc/en-us/articles/360040322673), [Histórico de versões](https://help.figma.com/hc/en-us/articles/360038006754) e [Ready for dev](https://help.figma.com/hc/en-us/articles/26781702258583)." },

        { h2: "Quebra-cabeça: monte o fluxo da branch" },
        { p: "As etapas estão embaralhadas. Coloque em ordem, do início ao arquivo atualizado, e confira." },
        { quiz: { kind: "order", label: "Quebra-cabeça · Monte o fluxo da branch", storageKey: "organizar-puzzle", results: [
            { min: 5, illustration: "objetos/trofeu", title: "Montou de primeira", text: "O fluxo está na ponta da língua." },
            { min: 3, illustration: "objetos/medalha-1", title: "Mandou bem", text: "Montou com poucas tentativas. Jogue de novo para fazer de primeira." },
            { min: 0, illustration: "notificacoes/success-low-detail", title: "Montou", text: "Revise O fluxo da branch acima e tente de primeira." }
          ],
          prompt: "Do início ao arquivo atualizado:", pieces: ["Criar a branch com o nome da task", "Trabalhar na branch", "Atualizar com o main (Update from main)", "Pedir revisão", "Mergear quando o PR for mergeado no código"],
          why: "Criar, trabalhar, atualizar com o main, revisar e mergear junto com o código." } },

        { h2: "Teste o que você aprendeu" },
        { p: "Cinco perguntas sobre o treinamento." },
        { quiz: { label: "Quiz · Organizar o Figma", storageKey: "organizar-quiz", questions: [
          { q: "Qual é a ordem, do nível mais amplo para o mais detalhado?", options: ["File, Project, Team, Workspace", "Organization, Workspace, Team, Project, File", "Team, Organization, File, Project"], answer: 1, why: "Organization guarda Workspace, que guarda Team, que guarda Project (Folder), que guarda File." },
          { q: "James tem can view no projeto e recebe can edit em um arquivo dele. O que acontece?", options: ["Edita esse arquivo e visualiza os outros", "Edita todos os arquivos do projeto", "Continua sem editar nada"], answer: 0, why: "O convite explícito dá mais acesso a um arquivo. O resto segue o acesso herdado do projeto." },
          { q: "Quando o Figma traz as mudanças do main para a branch?", options: ["Sozinho, sem avisar", "No Update from main, com todas as mudanças de uma vez", "Uma mudança por vez, escolhida a dedo"], answer: 1, why: "Update from main mostra uma prévia e traz tudo. Num conflito, escolha main ou branch." },
          { q: "Na Caju, quando a branch vai para o main?", options: ["Assim que o design fica pronto", "Quando o time de dev faz o merge do pull request no código", "No fim de cada sprint"], answer: 1, why: "Design e código entram juntos: o merge da branch acompanha o merge do PR." },
          { q: "Uma mudança na biblioteca está numa branch. Como publicar?", options: ["Publicar direto da branch", "Duplicar o arquivo e publicar a cópia", "Fazer o merge no main e publicar a partir dele"], answer: 2, why: "A biblioteca publica a partir do main." }
        ], results: [
          { min: 5, illustration: "objetos/trofeu", title: "Gabaritou", text: "O arquivo da sua equipe está em boas mãos." },
          { min: 3, illustration: "objetos/medalha-1", title: "Mandou bem", text: "Revise as seções das perguntas que escaparam e tente de novo." },
          { min: 0, illustration: "notificacoes/success-low-detail", title: "Bora mais uma?", text: "Passe pelas seções de novo e refaça o quiz. Na segunda vai." }
        ] } }
      ] },

      // Prepare protótipos no Figma (Getting Started RF5sagPdKQD6IoP2MYa2ki, slides 27 a 07, roteiro do Gustavo no Slack):
      // sem vídeo. O treinamento vira página de conteúdo, uma seção por slide, com o visual do slide recriado com componentes
      // do DS (V, acima), e no fim o quiz para testar o que foi aprendido. O slide 22 tem a descrição de Min/max trocada com a
      // de Border no arquivo: aqui vai a versão correta
      { id: "prototipos", title: "Protótipos no Figma", blocks: [
        { banner: { area: "aprenda", eyebrow: "Treinamento e quiz", heading: "Prepare protótipos no Figma", text: "Box model, organização de camadas, viewports e anotações para entregar interfaces que o dev traduz sem adivinhar.", href: GS, cta: "Abrir os slides no Figma", external: true } },
        { p: "Esse treinamento é sobre entregar protótipo que o dev consegue traduzir sem adivinhar. O caminho: box model, autolayout, camadas, viewports e o checklist de entrega. No fim, um quiz para testar o que ficou." },

        { h2: "O dev não vê seus retângulos" },
        { p: "Toda tela que você entrega é traduzida em código. O dev não vê um retângulo, vê uma caixa com regras." },
        { visual: { render: V.dev, list: [
          "Cada frame vira uma caixa com regras: content, padding, border e margin.",
          "O que para você é espaço, para o dev é padding, gap ou margin.",
          "Sem essas regras explícitas, a tradução vira suposição e a UI quebra.",
          "Camadas organizadas e autolayout entregam essas regras já resolvidas."
        ] } },

        { h2: "Box model: tudo é uma caixa" },
        { visual: { render: V.boxmodel(0), side: true, text: "Tudo na web é uma caixa, com quatro camadas de dentro para fora. Troque a camada para ver onde cada uma fica em dois Cards de uma lista.",
          list: ["Content: o conteúdo real.", "Padding: o respiro interno.", "Border: a borda entre o interno e o externo.", "Margin: o espaço entre caixas."] } },
        { alert: { appearance: "informative", label: "A frase que resolve a maior parte dos ruídos", text: "Padding é interno e pertence ao componente. Margin é externo e pertence ao contexto." } },

        { h2: "Autolayout é você escrevendo CSS" },
        { visual: { render: V.autolayout, side: true, text: "Autolayout não é alinhamento: é você escrevendo CSS sem perceber. É o alfabeto em comum entre design e código. Troque o sizing para ver o mesmo botão em cada regra." } },
        { table: { head: ["No Figma", "No código"], rows: [
          ["Frame", "`div` ou container"], ["Autolayout", "`display: flex`"], ["Direção (vertical ou horizontal)", "`flex-direction`"], ["Gap entre itens", "`gap`"],
          ["Padding do frame", "`padding`"], ["Hug contents", "`width: fit-content`"], ["Fill container", "`flex: 1` ou `width: 100%`"], ["Fixed", "largura fixa em px"]
        ] } },

        { h2: "Camadas são a árvore do DOM" },
        { p: "A árvore de camadas vira a estrutura do código. Se está bagunçada para você, está para quem implementa." },
        { visual: { render: V.camadas, side: true, text: "Três hábitos deixam a árvore pronta para virar código:", list: ["Nomeie as camadas.", "Agrupe por função.", "Use os componentes do Castanha DS."] } },

        { h2: "Comportamento entre tamanhos, não telas" },
        { p: "Você não entrega uma tela: entrega o comportamento dela entre larguras. A mesma interface e o mesmo conteúdo, respondendo às mudanças de tamanho. Troque o viewport para ver os Cards se reorganizarem." },
        { visual: V.viewports },
        { cards: [
          ["Viewport", "A área visível da tela. Muda com o dispositivo, a janela e o zoom."],
          ["Fill × Fixed", "Quem estica e quem fica fixo: é a decisão de responsividade."],
          ["Min e max width", "Até onde o que estica pode ir."]
        ] },

        { h2: "Checklist de entrega" },
        { visual: { render: V.checklist, side: true, text: "O slide para fotografar. Marque o que você já faz antes de entregar: quando tudo estiver marcado, a entrega está pronta." } },
        { p: "Organizar camadas e usar autolayout é reduzir as decisões que o dev toma no seu lugar. E cada uma dessas decisões é um lugar onde a tela pode virar outra coisa." },

        { h2: "Teste o que você aprendeu" },
        { p: "Sete perguntas sobre o treinamento. Escolha uma opção para ver se acertou e o porquê." },
        { quiz: { label: "Quiz · Prepare protótipos no Figma", storageKey: "prototipos", right: ["Na mosca", "Isso mesmo", "O dev agradece"], wrong: ["Quase", "Essa vira suposição", "Não foi dessa vez"], questions: [
          { q: "Para você é um retângulo. E para o dev?", options: ["Um print para copiar pixel a pixel", "Uma caixa com regras: content, padding, border e margin", "Um detalhe que ele pode ignorar"], answer: 1,
            why: "Toda tela que você entrega é traduzida em código. Sem regras explícitas, a tradução vira suposição e a UI quebra." },
          { q: "O respiro entre a borda do card e o texto dentro dele é…", options: ["Margin", "Border", "Padding"], answer: 2,
            why: "Padding é interno e pertence ao componente. Margin é externo e pertence ao contexto." },
          { q: "E o espaço entre dois cards de uma lista?", options: ["Margin ou gap: é do contexto", "Padding: é do card", "Content: faz parte do card"], answer: 0,
            why: "O espaço entre caixas pertence ao contexto, não ao componente. No autolayout, é o gap do frame que agrupa os cards." },
          { q: "Fill container no Figma vira o quê no código?", options: ["width: fit-content", "flex: 1 ou width: 100%", "Uma largura fixa em px"], answer: 1,
            why: "Autolayout é você escrevendo CSS: Hug vira fit-content, Fill vira flex: 1 e Fixed vira largura fixa." },
          { q: "Por que nomear e agrupar as camadas por função?", options: ["Para o arquivo abrir mais rápido", "Para o arquivo ficar bonito", "Porque a árvore de camadas vira a estrutura do código"], answer: 2,
            why: "Se a árvore está bagunçada para você, está para quem implementa. Nomeie, agrupe por função e use os componentes do Castanha DS." },
          { q: "O que você entrega quando entrega uma tela?", options: ["O comportamento dela entre larguras", "Uma imagem em 1440 px", "Três telas soltas: mobile, tablet e desktop"], answer: 0,
            why: "Fill × Fixed decide quem estica, e min/max width diz até onde o que estica pode ir. Mesmo conteúdo, reorganizado em cada viewport." },
          { q: "Qual destes NÃO está no checklist de entrega?", options: ["Espaçamentos com tokens do DS", "Elementos posicionados à mão para ficarem no lugar", "Estados extremos testados: texto longo e lista vazia"], answer: 1,
            why: "É o contrário: todo frame com autolayout, nada posicionado à mão." }
        ], results: [
          { min: 7, illustration: "objetos/trofeu", title: "Gabaritou", text: "O dev não vai precisar adivinhar nada na sua próxima entrega." },
          { min: 5, illustration: "objetos/medalha-1", title: "Mandou bem", text: "Revise as seções das perguntas que escaparam e a entrega fica redonda." },
          { min: 0, illustration: "notificacoes/success-low-detail", title: "Bora mais uma?", text: "Passe pelas seções de novo e refaça o quiz. Na segunda vai." }
        ] } }
      ] }
    ]
  };
})();
