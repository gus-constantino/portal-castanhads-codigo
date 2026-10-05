/**
 * Shell do playground: side menu, roteamento por hash (#/id), tema, viewport e relatório (#/relatorio, scripts/report.js).
 * Os componentes se registram via CDS.register() nos seus *.playground.js.
 */
(function(){
  "use strict";
  var CDS = window.CDS, kit = CDS.kit;
  var JIRA = "https://caju746.atlassian.net/browse/";
  var $ = function(id){ return document.getElementById(id); };
  var nav = $("nav"), navHome = $("nav-home"), navRes = $("nav-res"), navResTitle = $("nav-res-title"), search = $("search"), title = $("cmp-title"), links = $("cmp-links"), desc = $("cmp-desc"), canvas = document.querySelector(".pg-canvas");
  var preview = $("preview"), panel = $("panel"), frame = $("frame");
  var rval = $("rval"), rdone = $("rdone"), vpOut = $("vp-readout");
  var tabsEl = $("tabs"), coverEl = $("cover"), docsEl = $("docs"), stage = $("stage"), shell = document.querySelector(".pg-shell");
  var list = CDS.playgrounds.slice().sort(function(a, b){ return a.name.localeCompare(b.name, "pt-BR"); });
  // rota padrão = primeiro componente (não building block)

  // ---------- Side menu ----------
  // Grupos na ordem das páginas do [CastanhaDS] Components; building blocks numa seção recolhida no fim.
  var PAGES = ["Actions","Banner","Breadcrumbs","Buttons","Caju Card","Containers","Content","Datepicker","Dividers","Feedback","File Upload","Fixed Bar","Flags","Images","Lists","Loaders","Navigation","Pagination","Popovers","Progress Indicators","Rating Score","Selection Controls","Slider","Status","Tabs","Tab View","Tables","Text Fields","Tooltips","Utilities"];
  var blocksOpen = false;
  function link(c){
    var a = kit.el("a", { href: "#/" + c.id }, [c.name, kit.el("small", { text: c.task || "" })]);
    // Tooltip só quando há algo a explicar: task do Jira, [Beta], componente em branch do Figma
    var notes = [];
    if (c.task) notes.push("Task no Jira: " + c.task + ".");
    if (/\[Beta\]/.test(c.name)) notes.push("Em beta no Figma: props e visual ainda podem mudar.");
    if (/\/branch\//.test(c.figma || "")) notes.push("O link do Figma abre uma branch, não a main.");
    if (notes.length) kit.lazyTip(a, notes.join(" "), { label: c.name.replace(/^\[Beta\] /, "") });
    return kit.el("li", null, [a]);
  }
  // Categoria = Accordion Item do DS (Label = categoria, Description = quantidade, sem Lead Item) — Fase 3 do plano UI no DS
  var narrow = window.matchMedia("(max-width:1100px)"); // menu vira faixa horizontal: tudo aberto, sem cabeçalho
  var openCats = {};
  try { openCats = JSON.parse(localStorage.getItem("cds-pg-nav-open") || "{}") || {}; } catch (e) { openCats = {}; }
  function saveOpen(){ try { localStorage.setItem("cds-pg-nav-open", JSON.stringify(openCats)); } catch (e) {} }
  function navGroup(label, items, open, onToggle){
    var acc = kit.el("cds-accordion-item", { "class": "pg-nav-cat", label: label, description: items.length + (items.length === 1 ? " componente" : " componentes"), "show-lead-item": "false", "show-divider": "false", collapsed: !open });
    var ul = kit.el("ul", { "class": "pg-nav" });
    items.forEach(function(c){ ul.appendChild(link(c)); });
    acc.appendChild(ul); // Slot: entra antes de conectar
    acc.addEventListener("cds-toggle", function(e){ if (!narrow.matches && !searchText()) onToggle(!e.detail.collapsed); });
    return acc;
  }
  function searchText(){ return String(search.value || "").trim(); }
  narrow.addEventListener("change", function(){ buildNav(searchText()); });

  // Menu redimensionável: alça na borda (arrastar ou setas do teclado), 200–400px, lembrada no navegador
  (function(){
    var side = document.querySelector(".pg-sidebar"), MIN = 200, MAX = 400, STEP = 16, KEY = "cds-pg-sidebar-w";
    var grip = kit.el("div", { "class": "pg-resizer", role: "separator", "aria-orientation": "vertical", "aria-label": "Largura do menu", tabindex: "0", "aria-valuemin": MIN, "aria-valuemax": MAX });
    shell.appendChild(grip); // fixo na borda do menu (o menu tem rolagem própria)
    function apply(w){ w = Math.max(MIN, Math.min(MAX, Math.round(w))); shell.style.setProperty("--pg-sidebar-w", w + "px"); grip.setAttribute("aria-valuenow", String(w)); return w; }
    var saved = 0; try { saved = parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) {}
    var cur = apply(saved || side.getBoundingClientRect().width || 232);
    function save(){ try { localStorage.setItem(KEY, String(cur)); } catch (e) {} }
    grip.addEventListener("pointerdown", function(e){
      e.preventDefault(); grip.setPointerCapture(e.pointerId); grip.classList.add("is-dragging");
      var x0 = e.clientX, w0 = cur;
      function move(ev){ cur = apply(w0 + ev.clientX - x0); }
      function up(){ grip.removeEventListener("pointermove", move); grip.removeEventListener("pointerup", up); grip.classList.remove("is-dragging"); save(); }
      grip.addEventListener("pointermove", move); grip.addEventListener("pointerup", up);
    });
    grip.addEventListener("keydown", function(e){
      var d = e.key === "ArrowRight" ? STEP : e.key === "ArrowLeft" ? -STEP : e.key === "Home" ? MIN - cur : e.key === "End" ? MAX - cur : 0;
      if (!d) return; e.preventDefault(); cur = apply(cur + d); save();
    });
  })();
  function buildNav(filter){
    var q = (filter || "").trim().toLowerCase();
    nav.innerHTML = "";
    var shown = list.filter(function(c){ return !q || (c.name + " " + (c.task || "") + " " + (c.category || "")).toLowerCase().indexOf(q) !== -1; });
    var comps = shown.filter(function(c){ return !c.block && !c.resource; }), blocks = shown.filter(function(c){ return c.block && !c.resource; });
    // Recursos de suporte (libs de apoio: ícones, ilustrações…) ficam num espaço próprio, fora dos componentes
    // Início (home: Castanha Hub) fica no topo do menu, fora de Componentes e de Recursos
    var home = list.filter(function(c){ return c.home; });
    if (navHome){ navHome.innerHTML = ""; navHome.hidden = !home.length; home.forEach(function(c){ navHome.appendChild(kit.el("li", null, [kit.el("a", { href: "#/" + c.id }, [c.name])])); }); }
    var res = shown.filter(function(c){ return c.resource && !c.home; }).sort(function(a, b){ return (a.order || 99) - (b.order || 99); });
    navRes.innerHTML = ""; navResTitle.hidden = navRes.hidden = !res.length;
    res.forEach(function(c){ navRes.appendChild(kit.el("li", null, [kit.el("a", { href: "#/" + c.id }, [c.name, kit.el("small", { text: c.status || "" })])])); });
    var cats = PAGES.concat(comps.map(function(c){ return c.category || "Outros"; }).filter(function(x, i, a){ return PAGES.indexOf(x) === -1 && a.indexOf(x) === i; }));
    // Categorias em accordion: abre a da página atual, as que a pessoa abriu (lembrado no navegador) e todas durante a busca
    var cur = currentId();
    cats.forEach(function(cat){
      var items = comps.filter(function(c){ return (c.category || "Outros") === cat; });
      if (!items.length) return;
      nav.appendChild(kit.el("li", null, [navGroup(cat, items, q || narrow.matches || openCats[cat] || items.some(function(c){ return c.id === cur; }), function(open){ openCats[cat] = open; saveOpen(); })]));
    });
    if (blocks.length){
      var bd = navGroup("Building blocks", blocks, blocksOpen || q || narrow.matches || blocks.some(function(c){ return c.id === cur; }), function(open){ blocksOpen = open; });
      bd.classList.add("pg-nav-blocks");
      var bli = nav.appendChild(kit.el("li", null, [bd]));
      // Tooltip no cabeçalho do Accordion Item (o botão interno), não no item inteiro
      if (bd.btn) kit.tip(bd.btn, "Peças internas usadas por outros componentes (.Item, .Head…). Não se usam sozinhas.", { container: bli });
    }
    if (!comps.length && !blocks.length) nav.appendChild(kit.el("li", { "class": "pg-nav-empty", text: "Nenhum componente encontrado." }));
    markCurrent();
  }
  function markCurrent(){
    var cur = currentId();
    [].slice.call(nav.querySelectorAll("a")).concat([].slice.call(navRes.querySelectorAll("a")), navHome ? [].slice.call(navHome.querySelectorAll("a")) : []).forEach(function(a){
      if (a.getAttribute("href") === "#/" + cur){ a.setAttribute("aria-current", "page"); var d = a.closest("cds-accordion-item"); if (d && d.collapsed) d.collapsed = false; }
      else a.removeAttribute("aria-current");
    });
  }
  search.addEventListener("cds-change", function(e){ e.stopPropagation(); buildNav(searchText()); });

  // ---------- Roteamento: #/<id> ou #/<id>/<tab> ----------
  function route(){ return (location.hash || "").replace(/^#\/?/, "").split("/"); }
  function currentId(){
    var id = route()[0];
    if (list.some(function(c){ return c.id === id; })) return id;
    var home = list.filter(function(c){ return c.home; })[0]; // sem rota: abre o Início (Castanha Hub)
    return (home || list.filter(function(c){ return !c.block && !c.resource; })[0] || list[0]).id;
  }
  function currentDef(){ var id = currentId(); return list.filter(function(c){ return c.id === id; })[0]; }
  function currentTab(){
    var doc = CDS.docs && CDS.docs[currentId()], t = route()[1];
    if (doc && doc.tabs.some(function(x){ return x.id === t; })) return t;
    // recurso não tem playground: abre na primeira tab da doc
    return currentDef().resource && doc ? doc.tabs[0].id : "playground";
  }

  // ---------- Tabs (só quando o componente tem *.docs.js) ----------
  function buildTabs(id){
    var doc = CDS.docs && CDS.docs[id];
    if (CDS.renderCover) CDS.renderCover(doc, coverEl); // capa (frame [Header]) acima das tabs, quando a doc tem
    tabsEl.innerHTML = "";
    tabsEl.hidden = !doc || !CDS.renderDoc || (currentDef().resource && doc.tabs.length === 1); // página de uma tab só (ex.: Início) não mostra a barra
    if (tabsEl.hidden) return;
    var def = currentDef(), tabs = (def.resource ? [] : [{ id: "playground", title: "Playground" }]).concat(doc.tabs);
    // Scrollable Tab do DS: teclado (setas/Home/End) e foco itinerante vêm do componente
    var tl = kit.el("cds-scrollable-tab", { label: "Seções do componente" });
    tabs.forEach(function(t){ tl.appendChild(kit.el("cds-tab-item", { label: t.title, id: "tab-" + t.id, "data-tab": t.id })); });
    tl.addEventListener("cds-change", function(e){
      e.stopPropagation();
      var t = tabs[e.detail.index - 1]; if (!t) return;
      location.hash = "#/" + id + (t.id === "playground" || (def.resource && t.id === doc.tabs[0].id) ? "" : "/" + t.id);
    });
    tabsEl.appendChild(tl);
  }
  function applyTab(){
    var id = currentId(), tab = currentTab(), doc = CDS.docs && CDS.docs[id];
    var isDoc = !!(doc && CDS.renderDoc) && tab !== "playground"; // também vale para páginas de uma tab só, que escondem a barra
    var tl = tabsEl.querySelector("cds-scrollable-tab");
    if (tl){ var idx = [].map.call(tl.querySelectorAll("cds-tab-item"), function(b){ return b.dataset.tab; }).indexOf(tab); CDS.attr(tl, "active-item", String(idx + 1)); }
    if (tabsEl.hidden){ stage.removeAttribute("role"); stage.removeAttribute("aria-labelledby"); }
    else { stage.setAttribute("role", "tabpanel"); stage.setAttribute("aria-labelledby", "tab-playground"); }
    shell.classList.toggle("is-doc", isDoc);
    docsEl.hidden = !isDoc;
    if (isDoc){ docsEl.setAttribute("aria-labelledby", "tab-" + tab); CDS.renderDoc(doc, tab, docsEl); docsEl.scrollTop = 0; }
    else docsEl.innerHTML = "";
  }

  var mountedId = null, reportBtn = $("report-btn"), report = $("report"), lastHash = "#/";
  reportBtn.addEventListener("click", function(){ location.hash = route()[0] === "relatorio" ? lastHash : "#/relatorio"; });
  function onRoute(){
    // #/relatorio[/tab]: o relatório troca o shell inteiro; o botão volta para o último componente
    var r = route(), isReport = r[0] === "relatorio" && !!CDS.report;
    shell.hidden = isReport; report.hidden = !isReport;
    reportBtn.setAttribute("pressed", String(isReport));
    reportBtn.setAttribute("label", isReport ? "Voltar aos componentes" : "Abrir relatório do projeto");
    $("report-tip").setAttribute("text", isReport ? "Voltar aos componentes" : "Relatório");
    if (isReport){ CDS.report.show(r[1], r[2]); return; }
    lastHash = location.hash || "#/";
    if (mountedId) document.title = currentDef().name + " — Castanha DS";
    var id = currentId();
    if (id !== mountedId){ mount(); mountedId = id; }
    applyTab();
  }
  function mount(){
    var def = list.filter(function(c){ return c.id === currentId(); })[0];
    buildTabs(def.id);
    preview.innerHTML = ""; panel.innerHTML = "";
    kit.surface(preview, null); // cada componente começa na superfície padrão
    title.textContent = def.name;
    // Com capa (doc.cover): título maior, Tag do zeroheight e a descrição curta abaixo, como no [Header] do Figma
    var cdoc = CDS.docs && CDS.docs[def.id], cover = cdoc && cdoc.cover;
    $("cmp-badge").innerHTML = ""; desc.hidden = !(cover && cover.description); desc.textContent = (cover && cover.description) || "";
    canvas.classList.toggle("has-cover", !!cover);
    // Tag = status de publicação na lib do Figma (scripts/figma-status.js, lido via MCP: a página não acessa a API). Todos os componentes.
    var FS = CDS.figmaStatus || {}, st = (FS.items || {})[def.id];
    var PUB = { current: ["positive", "Publicado no Figma", "Publicado na lib [CastanhaDS] Components, sem alterações pendentes."],
                changed: ["informative", "Publicado com alterações pendentes", "Publicado na lib [CastanhaDS] Components, mas há alterações no arquivo que ainda não foram publicadas."],
                unpublished: def.block
                  ? ["neutral", "Não publicado · building block", "Building block (nome com ponto): fica fora da publicação de propósito e é usado dentro de outros componentes."]
                  : ["negative", "Não publicado no Figma", "Ainda não publicado na lib [CastanhaDS] Components."],
                branch: ["warning", "Não publicado · em branch", "Existe só numa branch do Figma; ainda não está na main nem publicado na lib."] };
    var pub = st && PUB[st];
    if (pub){
      var ptag = $("cmp-badge").appendChild(kit.el("cds-tag", { appearance: pub[0], label: pub[1], "show-lead-item": "false" }));
      kit.tip(ptag, pub[2] + " Conferido em " + FS.checked + ".", { container: $("cmp-badge") });
    }
    document.title = def.name + " — Castanha DS";
    links.innerHTML = "";
    // Link do DS (Neutral, ícone de link no lugar da seta: abre em outra aba)
    var branch = /\/branch\//.test(def.figma || "") ? " O link abre uma branch, não a main." : "";
    [[def.task && JIRA + def.task, def.task, "Abre a task " + def.task + " no Jira, em outra aba."],
     [def.figma, "Figma", "Abre o componente no Figma, em outra aba." + branch],
     [def.zeroheight, "Zeroheight", "Abre a página publicada no zeroheight, em outra aba."]].forEach(function(l){
      if (!l[0]) return;
      var a = links.appendChild(kit.el("cds-link", { label: l[1], href: l[0], target: "_blank", appearance: "neutral", icon: "link-line" }));
      kit.tip(a, l[2], { container: links });
    });
    readout("", false);
    if (def.mount) def.mount({ preview: preview, panel: panel, kit: kit, readout: readout });
    if (CDS.renderReact) CDS.renderReact(def, preview, $("react")); // "No React": tradução Figma → castanha-react (scripts/react-kit.js)
    markCurrent();
  }
  window.addEventListener("hashchange", onRoute);

  function readout(value, done){ rval.textContent = value || "—"; rdone.textContent = done ? "✓ completo" : ""; }

  // ---------- Viewport (global) ----------
  // data-viewport espelha a collection Viewport do Figma (Desktop/Tablet/Mobile); componentes leem via CSS
  function setViewport(w){
    // categoria pela largura, nas faixas da coleção Viewport (as mesmas dos tokens de grid): ≤599 Mobile · ≤1023 Tablet
    var n = parseInt(w, 10);
    frame.dataset.viewport = w === "fluid" || !n ? "desktop" : n <= 599 ? "mobile" : n <= 1023 ? "tablet" : "desktop";
    if (w === "fluid"){ frame.style.width = "100%"; frame.style.maxWidth = "calc(3 * var(--common-sizes-200))"; vpOut.textContent = "fluido"; }
    else { frame.style.width = w + "px"; frame.style.maxWidth = "none"; vpOut.textContent = w + "px"; }
  }
  // Seletor de viewport: Icon Button Small do DS + Tooltip com a largura. Ativo = Default · Accent; demais = Ghost · Neutral.
  // O [Caju] Icons não tem ícone de tablet nem de desktop (C86): 744 usa placeholder-line até o ícone existir.
  (function(){
    var host = $("viewport"), cur = "fluid", lid = "vp-lbl";
    host.classList.add("pg-ctrl");
    var vpLbl = host.appendChild(kit.el("span", { "class": "pg-lbl", id: lid, text: "Viewport" }));
    var row = host.appendChild(kit.el("div", { "class": "pg-vp", role: "group", "aria-labelledby": lid }));
    var opts = [["360","smartphone-line","360px · Mobile"],["744","placeholder-line","744px · Tablet"],["1366","fullscreen-line","1366px · Desktop"],["fluid","swap-left-right-line","Fluido (até 600px)"]], btns = {};
    function paint(){ opts.forEach(function(o){ var on = o[0] === cur, b = btns[o[0]]; b.setAttribute("kind", on ? "default" : "ghost"); b.setAttribute("appearance", on ? "accent" : "neutral"); b.setAttribute("pressed", String(on)); }); }
    opts.forEach(function(o){
      var b = btns[o[0]] = kit.el("cds-icon-button", { id: "vp-" + o[0], size: "small", icon: o[1], label: "Viewport " + o[2] });
      b.addEventListener("click", function(){ cur = o[0]; setViewport(cur); field.value = ""; paint(); });
      row.appendChild(b);
      var tip = kit.el("cds-tooltip", { id: "vp-tip-" + o[0], "for": "vp-" + o[0], placement: "bottom", "show-label": "false" });
      tip.setAttribute("text", o[2]); // kit.el usa "text" como conteúdo; aqui é atributo do Tooltip
      row.appendChild(tip);
    });
    // Largura personalizada: Text Input do DS (só números, 240–1920 px); com valor válido nenhum ícone fica marcado
    var MIN = 240, MAX = 1920, timer = 0;
    var field = kit.el("cds-text-input", { label: "Largura personalizada (px)", "show-label": "false", placeholder: "px", "show-lead-icon": "false", "show-required": "false", "show-supporting-content": "false", "class": "pg-vp-field" });
    row.appendChild(field);
    kit.tip(vpLbl, "Simula a coleção Viewport do Figma (Mobile, Tablet, Desktop). O componente muda de comportamento, não só de largura.", { text: true, container: host });
    kit.tip(field, "Largura livre de 240 a 1920 px. Até 599 vira Mobile; até 1023, Tablet; acima, Desktop.", { container: host });
    setTimeout(function(){ if (field.control){ field.control.inputMode = "numeric"; field.control.maxLength = 4; } }, 0);
    field.addEventListener("cds-change", function(e){
      e.stopPropagation();
      var raw = String(field.value || ""), digits = raw.replace(/\D/g, "").slice(0, 4);
      if (digits !== raw) field.value = digits; // limpa o que não é número e segue com os dígitos (trocar por script não dispara evento)
      clearTimeout(timer);
      timer = setTimeout(function(){
        var n = parseInt(digits, 10);
        if (!n){ if (cur === "custom"){ cur = "fluid"; setViewport(cur); paint(); } return; }
        if (n < MIN || n > MAX) return; // fora da faixa: espera a pessoa terminar de digitar
        cur = "custom"; setViewport(String(n)); paint();
      }, 350);
    });
    paint();
  })();

  // ---------- Tema — light padrão, dark opcional (Icon Button + Tooltip do DS) ----------
  var root = document.documentElement, tbtn = $("theme"), ttip = $("theme-tip");
  function paintTheme(){
    var dark = root.getAttribute("data-theme") === "dark";
    tbtn.setAttribute("icon", dark ? "light-mode-line" : "dark-mode-line");
    tbtn.setAttribute("pressed", String(dark));
    tbtn.setAttribute("label", dark ? "Ativar tema claro" : "Ativar tema escuro");
    ttip.setAttribute("text", dark ? "Tema claro" : "Tema escuro");
  }
  tbtn.addEventListener("click", function(){
    root.setAttribute("data-theme", root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    paintTheme();
  });

  kit.tip(navResTitle, "Bibliotecas de apoio do DS: ícones, ilustrações e tema. Não são componentes.", { text: true });
  kit.tip($("vp-frame-lbl"), "Largura atual do frame. \"Fluido\" acompanha o espaço disponível, até 600 px.", { text: true });
  kit.tip($("rval-lbl"), "O que o componente acabou de emitir: valor, seleção ou abertura. Atualiza a cada interação.", { text: true });
  paintTheme(); buildNav(); setViewport("fluid"); onRoute();
})();
