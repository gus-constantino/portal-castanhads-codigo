/**
 * Shell do playground: side menu, roteamento por hash (#/id), tema, viewport e relatório (#/relatorio, scripts/report.js).
 * Os componentes se registram via CDS.register() nos seus *.playground.js.
 */
(function(){
  "use strict";
  var CDS = window.CDS, kit = CDS.kit;
  var JIRA = "https://caju746.atlassian.net/browse/";
  var SUPORTE = "https://caju.slack.com/archives/C07NM4UQ2S3"; // canal #castanha-suporte (pedido do Gustavo, 05/10: o link do canal no lugar do formulário)
  // Copia texto: Clipboard API e, sem permissão (navegador embutido, iframe), o evento copy. Promise<boolean>.
  function copyText(text){
    function legacy(){
      var ok = false;
      function onCopy(e){ e.clipboardData.setData("text/plain", text); e.preventDefault(); ok = true; }
      document.addEventListener("copy", onCopy);
      try { document.execCommand("copy"); } catch (e) {}
      document.removeEventListener("copy", onCopy);
      return ok;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function(){ return true; }, legacy);
    return Promise.resolve(legacy());
  }
  var TICKET_PAGES = { inicio: 1, changelog: 1 }; // recursos que também mostram o botão Abrir chamado
  // Resumo do chamado: o que o time do DS precisa para achar o componente (a URL leva as props escolhidas)
  function ticketSummary(def, pub){
    var cat = def.composition ? "Composições" : def.block ? "Building blocks" : (def.category || "Outros");
    var lines = ["Chamado aberto pelo playground do Castanha DS", def.resource ? "Página do playground: " + def.name : "Componente: " + def.name + " (" + cat + ")", "Link: " + location.href];
    if (def.figma) lines.push("Figma: " + def.figma);
    if (pub) lines.push("Status no Figma: " + pub[1]);
    return lines.concat(["", "O que você precisa:"]).join("\n");
  }
  var $ = function(id){ return document.getElementById(id); };
  var nav = $("nav"), navHome = $("nav-home"), navRes = $("nav-res"), navResTitle = $("nav-res-title"), search = $("search"), header = $("page-header"), canvas = document.querySelector(".pg-canvas");
  var preview = $("preview"), panel = $("panel"), frame = $("frame");
  var rval = $("rval"), rdone = $("rdone"), vpOut = $("vp-readout");
  var tabsEl = $("tabs"), coverEl = $("cover"), docsEl = $("docs"), stage = $("stage"), shell = document.querySelector(".pg-shell");
  var list = CDS.playgrounds.slice().sort(function(a, b){ return a.name.localeCompare(b.name, "pt-BR"); });
  // rota padrão = primeiro componente (não building block)

  // ---------- Side menu ----------
  // Grupos na ordem das páginas do [CastanhaDS] Components; building blocks numa seção recolhida no fim.
  var PAGES = ["Actions","Banner","Breadcrumbs","Buttons","Caju Card","Containers","Content","Datepicker","Dividers","Feedback","File Upload","Fixed Bar","Flags","Images","Lists","Loaders","Navigation","Pagination","Popovers","Progress Indicators","Rating Score","Selection Controls","Slider","Status","Tabs","Tab View","Tables","Text Fields","Tooltips","Utilities"];
  var blocksOpen = false, cmpsOpen = false;
  // Composição (compositions/<id>): peça do playground feita só com tokens do DS onde o DS não tem o componente.
  // Fica numa seção própria depois dos building blocks, recolhida, como eles.
  function isPart(c){ return c.block || c.composition; }
  // Tooltip só quando há algo a explicar: task do Jira, [Beta], componente em branch do Figma
  function notesOf(c){
    var notes = [];
    if (c.task) notes.push("Task no Jira: " + c.task + ".");
    if (/\[Beta\]/.test(c.name)) notes.push("Em beta no Figma: props e visual ainda podem mudar.");
    if (/\/branch\//.test(c.figma || "")) notes.push("O link do Figma abre uma branch, não a main.");
    return notes;
  }
  function link(c){
    var a = kit.el("a", { href: "#/" + c.id }, [c.name, kit.el("small", { text: c.task || "" })]);
    var notes = notesOf(c);
    // As notas vão no card de preview do hover (peek); leitor de tela recebe por aria-description
    if (notes.length) a.setAttribute("aria-description", notes.join(" "));
    if (c.mount) peek.bind(a, c, notes);
    return kit.el("li", null, [a]);
  }
  // ---------- Preview no hover (peek) ----------
  // Como as navegações de Carbon, M3 e Wise: miniatura do componente ao lado do menu. É o playground real
  // montado num Popover do DS (manual, sem foco) e reduzido para caber (composição <cmp-thumbnail>); abre no hover ou no foco por teclado.
  var peek = (function(){
    var card = kit.el("cds-popover", { "class": "pg-peek", popover: "manual", "aria-hidden": "true" });
    var stage = kit.el("cmp-thumbnail", { "class": "pg-peek__stage", "min-scale": "0.5" });
    var nameEl = kit.el("p", { "class": "pg-peek__name" }), metaEl = kit.el("p", { "class": "pg-peek__meta" }), notesEl = kit.el("p", { "class": "pg-peek__notes" });
    card.appendChild(kit.el("div", { "class": "pg-peek__body" }, [stage, nameEl, metaEl, notesEl]));
    card.inert = true;
    document.body.appendChild(card);
    var showT = 0, cur = null;
    function place(a){
      var side = document.querySelector(".pg-sidebar").getBoundingClientRect(), r = a.getBoundingClientRect(), me = card.getBoundingClientRect();
      var top = Math.max(8, Math.min(r.top + r.height / 2 - me.height / 2, window.innerHeight - me.height - 8));
      card.style.position = "fixed"; card.style.left = Math.round(side.right + 8) + "px"; card.style.top = Math.round(top) + "px";
    }
    function show(a, c, notes){
      if (narrow.matches) return;
      cur = a;
      stage.unmount(); stage.setAttribute("component", c.id); stage.mount();
      nameEl.textContent = c.name;
      metaEl.textContent = (c.composition ? "Composição do playground" : c.block ? "Building block" : (c.category || "Outros")) + (c.task ? " · " + c.task : "");
      notesEl.textContent = notes.join(" "); notesEl.hidden = !notes.length;
      card.show(); stage.fit(); place(a);
    }
    function hide(){
      clearTimeout(showT); cur = null;
      card.hide(); stage.unmount(); // desmonta: nada do preview fica no documento
    }
    function bind(a, c, notes){
      a.addEventListener("pointerenter", function(e){ if (e.pointerType !== "mouse") return; clearTimeout(showT); showT = setTimeout(function(){ show(a, c, notes); }, cur ? 0 : 250); });
      a.addEventListener("pointerleave", function(){ if (cur === a || !cur) hide(); });
      a.addEventListener("focusin", function(){ if (a.matches(":focus-visible")) show(a, c, notes); });
      a.addEventListener("focusout", function(){ if (cur === a) hide(); });
      a.addEventListener("click", hide);
    }
    document.addEventListener("keydown", function(e){ if (e.key === "Escape" && cur) hide(); });
    // rolagem do menu: com o foco do teclado no item (setas da busca), o card acompanha; com o mouse, fecha
    document.querySelector(".pg-sidebar").addEventListener("scroll", function(){ if (!cur) return; if (document.activeElement === cur) place(cur); else hide(); }, { passive: true });
    window.addEventListener("hashchange", hide);
    return { bind: bind, hide: hide };
  })();

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
  // ---------- Exibição do menu: Lista (accordion por categoria) ou Grade (miniaturas) ----------
  // Alternador = Icon Button Small do DS com aria-pressed, como o seletor de viewport (ativo Default · Accent;
  // o outro Ghost · Neutral). Escolha lembrada no navegador. Na faixa horizontal (≤ 1100px) vale sempre a lista.
  var navView = "list";
  try { navView = localStorage.getItem("cds-pg-nav-view") === "grid" ? "grid" : "list"; } catch (e) {}
  var viewBar = (function(){
    var row = kit.el("div", { "class": "pg-nav-view", role: "group", "aria-label": "Exibição do menu" }), btns = {};
    var opts = [["list", "view-list-line", "Lista"], ["grid", "view-module-line", "Grade com previews"]];
    function paint(){ opts.forEach(function(o){ var on = o[0] === navView, b = btns[o[0]]; b.setAttribute("kind", on ? "default" : "ghost"); b.setAttribute("appearance", on ? "accent" : "neutral"); b.setAttribute("pressed", String(on)); }); }
    opts.forEach(function(o){
      var b = btns[o[0]] = kit.el("cds-icon-button", { id: "nav-view-" + o[0], size: "small", icon: o[1], label: "Menu em " + o[2].toLowerCase() });
      b.addEventListener("click", function(){
        if (navView === o[0]) return;
        navView = o[0]; paint(); peek.hide();
        try { localStorage.setItem("cds-pg-nav-view", navView); } catch (e) {}
        buildNav(searchText());
        revealCurrent(true); // a troca não perde o lugar
      });
      row.appendChild(b);
      var tip = kit.el("cds-tooltip", { "for": "nav-view-" + o[0], placement: "bottom", "show-label": "false" });
      tip.setAttribute("text", o[2]);
      row.appendChild(tip);
    });
    // Na linha do título "Componentes", alinhado à direita (o título fica de pé quando o alternador some)
    var title = nav.previousElementSibling, headRow = kit.el("div", { "class": "pg-nav-head" });
    title.parentNode.insertBefore(headRow, title);
    headRow.appendChild(title); headRow.appendChild(row);
    paint();
    return row;
  })();
  function isGrid(){ return navView === "grid" && !narrow.matches; }

  // Card da grade = composição <cmp-clickable-card> (o DS não tem Card clicável, C165) com a miniatura viva
  // <cmp-thumbnail lazy> no Slot quadrado: monta só quando aparece no menu e desmonta quando sai (100+ playgrounds).
  function tile(c){
    var notes = notesOf(c);
    var thumb = kit.el("cmp-thumbnail", { "class": "pg-tile__stage", component: c.mount ? c.id : null, lazy: "true", "min-scale": "0.1" });
    var card = kit.el("cmp-clickable-card", { href: "#/" + c.id, label: c.name, description: notes.join(" ") || null }, [thumb]); // Slot: entra antes de conectar
    var li = kit.el("li", null, [card]), d = shortDesc(c);
    // Hover/foco: Tooltip do DS com a descrição curta (1ª frase, até ~100 caracteres); criado só no 1º hover
    if (d) kit.lazyTip(card, d, { focus: false, container: li, placement: "bottom" });
    return li;
  }
  // Descrição da capa da doc (CDS.docsIndex[id].desc, gerado pelo build) ou a do registro; 1ª frase, cortada em ~100 caracteres
  function shortDesc(c){
    var ix = CDS.docsIndex && CDS.docsIndex[c.id], d = String((ix && ix.desc) || c.description || "").trim();
    if (!d) return "";
    var m = d.match(/^.+?[.!?](?=\s|$)/); d = m ? m[0] : d;
    return d.length > 100 ? d.slice(0, 100).replace(/\s+\S*$/, "") + "…" : d;
  }
  function navGrid(label, items){
    var ul = kit.el("ul", { "class": "pg-nav-grid", "aria-label": label });
    items.forEach(function(c){ ul.appendChild(tile(c)); });
    return kit.el("li", { "class": "pg-nav-grid-group" }, [kit.el("p", { "class": "pg-nav-title pg-nav-grid-title", text: label }), ul]);
  }

  function buildNav(filter){
    var q = (filter || "").trim().toLowerCase();
    nav.innerHTML = "";
    var shown = list.filter(function(c){ return !q || (c.name + " " + (c.task || "") + " " + (c.category || "")).toLowerCase().indexOf(q) !== -1; });
    var comps = shown.filter(function(c){ return !isPart(c) && !c.resource; }), blocks = shown.filter(function(c){ return c.block && !c.resource; });
    var cmps = shown.filter(function(c){ return c.composition && !c.resource; });
    // Recursos de suporte (libs de apoio: ícones, ilustrações…) ficam num espaço próprio, fora dos componentes
    // Início (home: Castanha Hub) fica no topo do menu, fora de Componentes e de Recursos
    var home = list.filter(function(c){ return c.home; });
    if (navHome){ navHome.innerHTML = ""; navHome.hidden = !home.length; home.forEach(function(c){ navHome.appendChild(kit.el("li", null, [kit.el("a", { href: "#/" + c.id }, [c.name])])); }); }
    var res = shown.filter(function(c){ return c.resource && !c.home; }).sort(function(a, b){ return (a.order || 99) - (b.order || 99); });
    navRes.innerHTML = ""; navResTitle.hidden = navRes.hidden = !res.length;
    // soon (em breve): Tag neutra do DS no lugar do contador (ex.: MCP, ainda não ofertado ao time)
    res.forEach(function(c){ navRes.appendChild(kit.el("li", null, [kit.el("a", { href: "#/" + c.id }, [c.name, c.soon ? kit.el("cds-tag", { appearance: "neutral", label: "Em breve", "show-lead-item": "false" }) : kit.el("small", { text: c.status || "" })])])); });
    var cats = PAGES.concat(comps.map(function(c){ return c.category || "Outros"; }).filter(function(x, i, a){ return PAGES.indexOf(x) === -1 && a.indexOf(x) === i; }));
    // Categorias em accordion: abre a da página atual, as que a pessoa abriu (lembrado no navegador) e todas durante a busca
    var cur = currentId();
    viewBar.hidden = narrow.matches;
    nav.classList.toggle("is-grid", isGrid());
    if (isGrid()){
      // Grade: tudo aberto, sem accordion — categoria vira só um título, building blocks no fim
      cats.forEach(function(cat){
        var items = comps.filter(function(c){ return (c.category || "Outros") === cat; });
        if (items.length) nav.appendChild(navGrid(cat, items));
      });
      if (blocks.length) nav.appendChild(navGrid("Building blocks", blocks)).classList.add("pg-nav-blocks");
      if (cmps.length) nav.appendChild(navGrid("Composições", cmps)).classList.add("pg-nav-blocks", "pg-nav-cmps");
      if (!comps.length && !blocks.length && !cmps.length) nav.appendChild(kit.el("li", { "class": "pg-nav-empty", text: "Nenhum componente encontrado." }));
      markCurrent();
      return;
    }
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
    if (cmps.length){
      var cd = navGroup("Composições", cmps, cmpsOpen || q || narrow.matches || cmps.some(function(c){ return c.id === cur; }), function(open){ cmpsOpen = open; });
      cd.classList.add("pg-nav-blocks", "pg-nav-cmps");
      cd.setAttribute("description", cmps.length + (cmps.length === 1 ? " composição" : " composições"));
      var cli = nav.appendChild(kit.el("li", null, [cd]));
      if (cd.btn) kit.tip(cd.btn, "Peças do playground montadas com tokens do DS onde o DS ainda não tem o componente. Não são do Castanha DS.", { container: cli });
    }
    if (!comps.length && !blocks.length && !cmps.length) nav.appendChild(kit.el("li", { "class": "pg-nav-empty", text: "Nenhum componente encontrado." }));
    markCurrent();
  }
  // Rola só o menu (nunca a página) até o item atual, centralizado. Só quando ele está fora de vista
  // (clicar no menu não mexe em nada); force = centraliza mesmo assim (troca Lista/Grade).
  // Na faixa horizontal (≤ 1100px) não rola. Segunda tentativa depois da animação do accordion que abriu.
  function revealCurrent(force){
    function go(){
      var side = document.querySelector(".pg-sidebar"), a = side.querySelector("#nav a[aria-current='page'], #nav-res a[aria-current='page']");
      if (!a || narrow.matches) return;
      var sr = side.getBoundingClientRect(), r = a.getBoundingClientRect();
      if (!r.height || (!force && r.top >= sr.top && r.bottom <= sr.bottom)) return;
      side.scrollTop += r.top - sr.top - (sr.height - r.height) / 2;
    }
    requestAnimationFrame(go); setTimeout(function(){ force = false; go(); }, 400);
  }
  function markCurrent(){
    var cur = currentId();
    [].slice.call(nav.querySelectorAll("a")).concat([].slice.call(navRes.querySelectorAll("a")), navHome ? [].slice.call(navHome.querySelectorAll("a")) : []).forEach(function(a){
      if (a.getAttribute("href") === "#/" + cur){ a.setAttribute("aria-current", "page"); var d = a.closest("cds-accordion-item"); if (d && d.collapsed) d.collapsed = false; }
      else a.removeAttribute("aria-current");
    });
  }
  search.addEventListener("cds-change", function(e){ e.stopPropagation(); buildNav(searchText()); });

  // ---------- Atalhos do teclado (tecla ?) ----------
  // Como GitHub e Storybook: Modal do DS com a lista dos atalhos. O DS não tem Kbd: as teclas são a composição
  // <cmp-shortcut> (Tag Neutral por tecla, C137). Montado uma vez; o conteúdo entra antes do connect (Slot).
  (function(){
    var mac = /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent), cmd = mac ? "⌘" : "Ctrl", alt = mac ? "⌥" : "Alt";
    var GROUPS = [
      ["Navegação", [["Buscar componente", [["/"], [cmd, "K"]]], ["Componente anterior / próximo", [[alt, "←"], [alt, "→"]]], ["Mostrar estes atalhos", [["?"]]]]],
      ["Na busca do menu", [["Entrar nos resultados", [["↓"]]], ["Percorrer os resultados", [["↑"], ["↓"]]], ["Primeiro / último resultado", [["Home"], ["End"]]],
        ["Abrir o primeiro resultado", [["Enter"]]], ["Voltar à busca", [["Esc"]]]]],
      ["Em qualquer lugar", [["Fechar painel, menu ou preview", [["Esc"]]]]]
    ];
    function keys(combos){ return kit.el("cmp-shortcut", { "class": "pg-keys", keys: combos.map(function(k){ return k.join(" "); }).join(" | ") }); }
    var body = kit.el("div", { "class": "pg-shortcuts" });
    GROUPS.forEach(function(g){
      body.appendChild(kit.el("p", { "class": "pg-shortcuts__title", text: g[0] }));
      var ul = body.appendChild(kit.el("ul", { "class": "pg-shortcuts__list" }));
      g[1].forEach(function(row){ ul.appendChild(kit.el("li", { "class": "pg-shortcuts__row" }, [kit.el("span", { text: row[0] }), keys(row[1])])); });
    });
    var modal = kit.el("cds-modal", { id: "shortcuts", "text-title": "Atalhos do teclado", "show-footer": "false", label: "Atalhos do teclado" }, [body]);
    document.body.appendChild(modal);
    document.addEventListener("keydown", function(e){
      var t = e.target, typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (e.key !== "?" || typing || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      var dlg = modal.querySelector("dialog");
      if (dlg && dlg.open) modal.close(); else { if (typeof peek !== "undefined") peek.hide(); modal.show(); }
    });
  })();

  // ---------- Busca pelo teclado (como Storybook e MUI) ----------
  // "/" ou ⌘K / Ctrl+K foca a busca · ↓ entra nos resultados (foco real nos links: o preview do hover acompanha)
  // ↑/↓ percorrem, Home/End vão às pontas, ↑ no primeiro volta à busca · Enter na busca abre o 1º resultado
  // Digitar com o foco na lista volta à busca · Esc na lista volta à busca
  (function(){
    var mac = /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent);
    function input(){ return search.control || search.querySelector("input"); }
    function results(){
      // links visíveis do menu, na ordem da tela (Início, componentes das categorias abertas, recursos); buscando, só os resultados
      var sel = searchText() ? "#nav a[href^='#/'], #nav-res a[href^='#/']" : ".pg-sidebar a[href^='#/']";
      return [].slice.call(document.querySelectorAll(sel)).filter(function(a){ return a.getClientRects().length > 0; });
    }
    function focusSearch(){ var i = input(); if (i){ i.focus(); i.select(); } }
    search.setAttribute("placeholder", "Buscar componente (" + (mac ? "⌘K" : "Ctrl+K") + ")");
    document.addEventListener("keydown", function(e){
      var t = e.target, typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if ((e.key === "k" || e.key === "K") && (mac ? e.metaKey : e.ctrlKey) && !e.altKey && !e.shiftKey){ e.preventDefault(); focusSearch(); return; }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey && report.hidden){ e.preventDefault(); focusSearch(); }
    });
    search.addEventListener("keydown", function(e){
      if (e.target !== input()) return;
      if (e.key === "ArrowDown"){ var r = results(); if (r.length){ e.preventDefault(); r[0].focus(); } }
    });
    search.addEventListener("cds-search", function(e){
      e.stopPropagation();
      var r = searchText() ? results() : [];
      if (r.length){ location.hash = r[0].getAttribute("href"); input().blur(); }
    });
    document.querySelector(".pg-sidebar").addEventListener("keydown", function(e){
      var a = e.target.closest && e.target.closest("a[href^='#/']"); if (!a || e.metaKey || e.ctrlKey || e.altKey) return;
      var r = results(), i = r.indexOf(a); if (i === -1) return;
      var next = { ArrowDown: r[i + 1], ArrowUp: r[i - 1], Home: r[0], End: r[r.length - 1] }[e.key];
      if (e.key === "ArrowUp" && i === 0){ e.preventDefault(); focusSearch(); return; }
      if (next){ e.preventDefault(); next.focus(); next.scrollIntoView({ block: "nearest" }); return; }
      if (e.key === "Escape"){ e.preventDefault(); focusSearch(); return; }
      if (e.key.length === 1 && e.key !== " "){ var inp = input(); inp.focus(); } // a tecla cai no campo e a busca continua
    });
  })();

  // ---------- Roteamento: #/<id> ou #/<id>/<tab> ----------
  // #/<id>[/<tab>][?prop=valor&…] — a query guarda o estado dos controles (link do estado)
  function route(){ return (location.hash || "").replace(/^#\/?/, "").split("?")[0].split("/"); }
  function query(){
    var q = (location.hash.split("?")[1] || ""), out = {};
    q.split("&").forEach(function(kv){ if (!kv) return; var i = kv.indexOf("="), k = decodeURIComponent(i < 0 ? kv : kv.slice(0, i)), v = i < 0 ? "" : decodeURIComponent(kv.slice(i + 1).replace(/\+/g, " ")); out[k] = v; });
    return out;
  }
  function qs(p){ return Object.keys(p).map(function(k){ return encodeURIComponent(k) + "=" + encodeURIComponent(p[k]); }).join("&"); }
  function currentId(){
    var id = route()[0];
    if (list.some(function(c){ return c.id === id; })) return id;
    var home = list.filter(function(c){ return c.home; })[0]; // sem rota: abre o Início (Castanha Hub)
    return (home || list.filter(function(c){ return !isPart(c) && !c.resource; })[0] || list[0]).id;
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
    pager.render(isDoc ? docsEl : stage);
  }

  // ---------- Cabeçalho (Header do Sponsor Templates, template provisório) ----------
  // Um cabeçalho só: a linha .Heading é a barra do topo (#top-header: ← · Breadcrumb Castanha DS › Categoria › Nome · 🔍 · Relatório · Tema)
  // e a linha .Title Content fica no topo da página (#page-header: título · (i) · Tag · Links · Abrir no Figma)
  var top = $("top-header");
  [].slice.call($("top-actions").children).forEach(function(n){ top.trailEl.appendChild(n); });
  $("top-actions").remove();
  var head = (function(){
    var bar = $("toolbar"), steps = 0, pop = null;
    top.backBtn.addEventListener("click", function(){ if (steps > 0){ steps -= 2; history.back(); } else location.hash = "#/"; });
    window.addEventListener("hashchange", function(){ steps++; });
    top.searchBtn.addEventListener("click", function(){ var c = search.control || search.querySelector("input"); if (c) c.focus(); });
    header.mainBtn.addEventListener("click", function(){ if (head.figma) window.open(head.figma, "_blank", "noopener"); });
    header.dropBtn.id = "page-links-btn";
    // Copiar link: a URL já leva o estado dos controles (?prop=valor). Icon Button Default · Neutral · Medium + Tooltip
    var copyBtn = kit.el("cds-icon-button", { id: "page-copy-btn", kind: "default", appearance: "neutral", size: "medium", icon: "link-line", label: "Copiar link desta página" });
    header.dropBtn.parentNode.insertBefore(copyBtn, header.dropBtn);
    var copyTip = kit.tip(copyBtn, "Copiar link (com as props escolhidas)", { container: bar }), copyT = 0;
    copyBtn.addEventListener("click", function(){
      function done(ok){ copyTip.setAttribute("text", ok ? "Link copiado" : "Não deu para copiar: use a barra de endereço"); copyTip.show && copyTip.show(); clearTimeout(copyT); copyT = setTimeout(function(){ copyTip.setAttribute("text", "Copiar link (com as props escolhidas)"); }, 2000); }
      copyText(location.href).then(done);
    });
    // Abrir chamado: Main Button Default · Neutral com o logo do Slack, entre Links e Abrir no Figma (componente, composição, building block, Início e Changelog).
    // O clique copia um resumo da página e abre o canal #castanha-suporte, onde a pessoa abre o chamado e cola o resumo.
    var ticketBtn = kit.el("cds-main-button", { id: "page-ticket-btn", kind: "default", appearance: "neutral", size: "medium", label: "Abrir chamado", "lead-icon": "slack-line", "show-trailing-icon": "false" });
    header.mainBtn.parentNode.insertBefore(ticketBtn, header.mainBtn);
    kit.tip(ticketBtn, "Abre o canal #castanha-suporte no Slack e copia um resumo desta página para colar no chamado", { container: bar });
    ticketBtn.addEventListener("click", function(){
      if (!head.ticket) return;
      copyText(ticketSummary(head.ticket.def, head.ticket.pub)).then(function(ok){ if (CDS.docToast) CDS.docToast(ok ? "Resumo copiado: cole no chamado" : "Canal aberto: descreva o componente e o que precisa"); });
      window.open(SUPORTE, "_blank", "noopener");
    });
    header.setAttribute("drop-label", "Links"); header.setAttribute("main-label", "Abrir no Figma");
    CDS.attr(header.dropBtn, "lead-icon", "link-line"); CDS.attr(header.mainBtn, "lead-icon", "figma-line");
    CDS.attr(header.tag, "show-lead-item", "false");
    var o = {
      infoTip: kit.tip(header.infoBtn, "", { container: bar }),
      tagTip: kit.tip(header.tag, "", { container: bar }),
      mainTip: kit.tip(header.mainBtn, "", { container: bar }),
      figma: "",
      links: function(items){
        // Popover novo a cada página: o conteúdo precisa entrar antes do connect (A59)
        if (pop) pop.remove();
        header.setAttribute("show-drop-button", String(items.length > 0));
        if (header.dropBtn.hasAttribute("active")) header.dropBtn.removeAttribute("active");
        if (!items.length){ pop = null; return; }
        pop = kit.el("cds-popover", { "for": "page-links-btn", placement: "bottom-end", label: "Links do componente", "class": "pg-links-pop" },
          items.map(function(l){
            var a = kit.el("cds-link", { label: l[1], href: l[0], target: "_blank", appearance: "neutral", icon: l[3] || "link-line" });
            if (l[2]) a.addEventListener("click", l[2]); // ação extra antes de abrir (ex.: copiar o resumo do chamado)
            return a;
          }));
        bar.appendChild(pop);
      }
    };
    kit.tip(top.backBtn, "Voltar", { container: top.trailEl });
    kit.tip(top.searchBtn, "Buscar componente", { container: top.trailEl });
    return o;
  })();
  // Barra do topo estreita (≤760): os níveis anteriores vão para o "…" do Breadcrumb e fica só a página atual
  var slim = window.matchMedia("(max-width:760px)"), lastCrumbs = [];
  function setCrumbs(items){ lastCrumbs = items; top.setBreadcrumb(items, slim.matches ? items.length - 1 : 0); }
  slim.addEventListener("change", function(){ setCrumbs(lastCrumbs); });
  // Breadcrumb da barra do topo: a marca é o 1º nível (volta ao Início)
  function crumbs(def){
    var ds = { label: "Castanha DS", href: "#/" };
    if (def.home) return [ds, { label: def.name, href: "#/" + def.id }];
    if (def.resource) return [ds, { label: "Recursos de suporte", href: "#/" }, { label: def.name, href: "#/" + def.id }];
    var cat = def.composition ? "Composições" : def.block ? "Building blocks" : (def.category || "Outros");
    var first = list.filter(function(c){ return !c.resource && (def.composition ? c.composition : def.block ? c.block : !isPart(c) && (c.category || "Outros") === cat); })[0] || def;
    return [ds, { label: cat, href: "#/" + first.id }, { label: def.name, href: "#/" + def.id }];
  }

  // ---------- Anterior / próximo (fim da página) ----------
  // Como Carbon e M3: dois cards no fim da página, na ordem do menu (Início › componentes por categoria › building blocks › recursos).
  // Content List Item do DS (Kind Card · Intent Navigation, href). Atalho do Storybook: ⌥← / ⌥→ (Alt no Windows/Linux).
  var pager = (function(){
    var mac = /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent), key = mac ? "⌥" : "Alt+";
    var el = kit.el("nav", { "class": "pg-pager", "aria-label": "Anterior e próximo" });
    function order(){
      var comps = list.filter(function(c){ return !isPart(c) && !c.resource; }), cats = PAGES.concat(comps.map(function(c){ return c.category || "Outros"; }).filter(function(x, i, a){ return PAGES.indexOf(x) === -1 && a.indexOf(x) === i; }));
      var seq = list.filter(function(c){ return c.home; });
      cats.forEach(function(cat){ seq = seq.concat(comps.filter(function(c){ return (c.category || "Outros") === cat; })); });
      seq = seq.concat(list.filter(function(c){ return c.block && !c.resource; }), list.filter(function(c){ return c.composition && !c.resource; }));
      return seq.concat(list.filter(function(c){ return c.resource && !c.home; }).sort(function(a, b){ return (a.order || 99) - (b.order || 99); }));
    }
    function near(){ var seq = order(), i = seq.map(function(c){ return c.id; }).indexOf(currentId()); return { prev: seq[i - 1], next: seq[i + 1] }; }
    function card(def, dir){
      if (!def) return kit.el("span", { "class": "pg-pager__gap", "aria-hidden": "true" });
      var prev = dir === "prev";
      return kit.el("cds-content-list-item", { "class": "pg-pager__item pg-pager__item--" + dir, kind: "card", intent: "navigation", href: "#/" + def.id, label: def.name,
        description: (prev ? "Anterior" : "Próximo") + " · " + key + (prev ? "←" : "→"), "show-tag": "false", "show-divider": "false",
        "show-lead-item": String(prev), "lead-kind": "icon", "lead-icon": "back-line", "show-navigation-indicator": String(!prev), "aria-keyshortcuts": "Alt+Arrow" + (prev ? "Left" : "Right") });
    }
    function render(host){
      var n = near(); el.innerHTML = "";
      el.appendChild(card(n.prev, "prev")); el.appendChild(card(n.next, "next"));
      host.appendChild(el); // depois do conteúdo: Playground (stage) ou doc
    }
    document.addEventListener("keydown", function(e){
      if (!e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
      var t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return; // setas com Alt movem o cursor por palavra
      if (!report.hidden) return;
      var d = near()[e.key === "ArrowLeft" ? "prev" : "next"]; if (!d) return;
      e.preventDefault(); location.hash = "#/" + d.id;
    });
    return { render: render };
  })();

  var writtenQs = "";
  // Estado dos controles → URL (sem criar entrada no histórico). Só na tab Playground.
  kit.state.onChange(function(p){
    var r = route(); if (r[1] && r[1] !== "playground") return;
    writtenQs = qs(p);
    history.replaceState(null, "", "#/" + currentId() + (writtenQs ? "?" + writtenQs : ""));
    lastHash = location.hash;
  });
  var mountedId = null, reportBtn = $("report-btn"), report = $("report"), lastHash = "#/";
  reportBtn.addEventListener("click", function(){ location.hash = route()[0] === "relatorio" ? lastHash : "#/relatorio"; });
  // ---------- Docs sob demanda (D124) ----------
  // O pacote traz só o índice (CDS.docsIndex: id → arquivo?v=hash + docs de que depende). Ao abrir um componente com
  // doc, carrega o arquivo dele (e as dependências) e só então monta: tabs, capa e (i) leem CDS.docs como antes.
  var docLoads = {}, docTried = {};
  function loadDoc(id){
    var ix = CDS.docsIndex && CDS.docsIndex[id];
    if (!ix || (CDS.docs && CDS.docs[id])) return Promise.resolve();
    if (!docLoads[id]) docLoads[id] = Promise.all((ix.needs || []).map(loadDoc)).then(function(){
      return new Promise(function(done){
        var sc = document.createElement("script"); sc.src = ix.src;
        sc.onload = sc.onerror = function(){ docTried[id] = true; done(); }; // sem a doc, o componente abre só com o Playground
        document.head.appendChild(sc);
      });
    });
    return docLoads[id];
  }
  CDS.loadDoc = loadDoc;
  function onRoute(){
    var r0 = route()[0], want = list.some(function(c){ return c.id === r0; }) ? r0 : currentId();
    if (CDS.docsIndex && CDS.docsIndex[want] && !docTried[want] && !(CDS.docs && CDS.docs[want])){ loadDoc(want).then(onRoute); return; }
    showRoute();
  }
  function showRoute(){
    // #/relatorio[/tab]: o relatório troca o shell inteiro; o botão volta para o último componente
    var r = route(), isReport = r[0] === "relatorio" && !!CDS.report;
    shell.hidden = isReport; report.hidden = !isReport;
    reportBtn.setAttribute("pressed", String(isReport));
    reportBtn.setAttribute("label", isReport ? "Voltar aos componentes" : "Abrir relatório do projeto");
    $("report-tip").setAttribute("text", isReport ? "Voltar aos componentes" : "Relatório");
    if (isReport){ setCrumbs([{ label: "Castanha DS", href: "#/" }, { label: "Relatório", href: "#/relatorio" }]); CDS.report.show(r[1], r[2]); return; }
    lastHash = location.hash || "#/";
    if (mountedId) document.title = currentDef().name + " — Castanha DS";
    var id = currentId(), q = qs(query());
    // remonta ao trocar de componente ou quando a query chega de fora (link colado); a que o próprio app escreve não remonta
    if (id !== mountedId || (q && q !== writtenQs)){ mount(); mountedId = id; }
    setCrumbs(crumbs(currentDef())); // também ao voltar do relatório
    applyTab();
    // De volta à tab Playground (a troca de tab escreve o hash sem a query): o estado continua no painel, então volta à URL
    if (currentTab() === "playground" && writtenQs && !q) history.replaceState(null, "", "#/" + id + "?" + writtenQs);
  }
  function mount(){
    var def = list.filter(function(c){ return c.id === currentId(); })[0];
    buildTabs(def.id);
    preview.innerHTML = ""; panel.innerHTML = "";
    kit.surface(preview, null); // cada componente começa na superfície padrão
    // Cabeçalho = Header do Sponsor Templates (template provisório): Title = nome · (i) = descrição curta da capa
    var cdoc = CDS.docs && CDS.docs[def.id], cover = cdoc && cdoc.cover;
    header.setAttribute("title", def.name);
    var about = (cover && cover.description) || def.description || ""; // composição sem doc: descrição do registro
    header.setAttribute("show-info", String(!!about));
    head.infoTip.setAttribute("text", about);
    // Tag = status de publicação na lib do Figma (scripts/figma-status.js, lido via MCP: a página não acessa a API). Todos os componentes.
    var FS = CDS.figmaStatus || {}, st = (FS.items || {})[def.id];
    var PUB = { current: ["positive", "Publicado no Figma", "Publicado na lib [CastanhaDS] Components, sem alterações pendentes."],
                changed: ["informative", "Publicado com alterações pendentes", "Publicado na lib [CastanhaDS] Components, mas há alterações no arquivo que ainda não foram publicadas."],
                unpublished: def.block
                  ? ["neutral", "Não publicado · building block", "Building block (nome com ponto): fica fora da publicação de propósito e é usado dentro de outros componentes."]
                  : ["negative", "Não publicado no Figma", "Ainda não publicado na lib [CastanhaDS] Components."],
                branch: ["warning", "Não publicado · em branch", "Existe só numa branch do Figma; ainda não está na main nem publicado na lib."] };
    var pub = def.soon ? ["neutral", "Em breve", def.soon] // recurso ainda não ofertado (texto do Tooltip em def.soon)
      : def.composition ? ["neutral", "Composição do playground", "Não existe na lib do Figma: montada aqui só com tokens do DS até o DS ter o componente."] : st && PUB[st];
    header.setAttribute("show-tag", String(!!pub)); // Tag = status de publicação (ou Em breve)
    if (pub){ header.setAttribute("tag-appearance", pub[0]); header.setAttribute("tag-label", pub[1]); head.tagTip.setAttribute("text", pub[2] + (def.composition || def.soon ? "" : " Conferido em " + FS.checked + ".")); }
    document.title = def.name + " — Castanha DS";
    // Main Button = abrir no Figma; Drop Button "Links" = Jira e zeroheight num Popover do DS
    var branch = /\/branch\//.test(def.figma || "") ? " O link abre uma branch, não a main." : "";
    head.figma = def.figma || "";
    header.setAttribute("show-main-button", String(!!def.figma));
    head.mainTip.setAttribute("text", "Abre o componente no Figma, em outra aba." + branch);
    // R5: + Storybook do castanha-react e o zeroheight do .mdx oficial quando o playground não tem (integration/react-data.js)
    var rx = CDS.react && CDS.react.items[def.id], rdir = rx && rx.dir && CDS.react.dirs[rx.dir];
    head.ticket = (!def.resource && !def.home) || TICKET_PAGES[def.id] ? { def: def, pub: pub } : null; // componentes + Início e Changelog
    $("page-ticket-btn").hidden = !head.ticket;
    head.links([[def.issue, "GitHub · issue de melhoria", null, "github-line"], [def.task && JIRA + def.task, "Jira · " + def.task], [def.zeroheight || (rdir && rdir.zeroheight), "Zeroheight"], [rdir && !rdir.staging && rdir.storybook, "Storybook (castanha-react)", null, "react-line"]].filter(function(l){ return l && l[0]; }));
    readout("", false);
    kit.state.begin(panel);
    if (def.mount) def.mount({ preview: preview, panel: panel, kit: kit, readout: readout });
    kit.state.end();
    var q = query(); writtenQs = qs(q);
    if (writtenQs) kit.state.restore(q); // link do estado: reaplica os controles da URL
    if (CDS.renderReact) CDS.renderReact(def, preview, $("react")); // "No React": tradução Figma → castanha-react (scripts/react-kit.js)
    markCurrent();
    revealCurrent(); // ao abrir (link, recarregar, ⌥←/⌥→, anterior/próximo): o item atual aparece no menu
  }
  window.addEventListener("hashchange", onRoute);

  function readout(value, done){ rval.textContent = value || "—"; rdone.textContent = done ? "✓ completo" : ""; }

  // ---------- Viewport (global) ----------
  // data-viewport espelha a collection Viewport do Figma (Desktop/Tablet/Mobile); componentes leem via CSS
  function setViewport(w){
    // categoria pela largura, nas faixas do castanha-tokens (viewport.css, min-width): < 744 Mobile · < 1366 Tablet · resto Desktop
    var n = parseInt(w, 10);
    frame.dataset.viewport = w === "fluid" || !n ? "desktop" : n < 744 ? "mobile" : n < 1366 ? "tablet" : "desktop";
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
    kit.tip(field, "Largura livre de 240 a 1920 px. Até 743 vira Mobile; de 744 a 1365, Tablet; a partir de 1366, Desktop (faixas do castanha-tokens).", { container: host });
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
