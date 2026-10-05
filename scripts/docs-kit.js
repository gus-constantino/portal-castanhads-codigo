/**
 * Kit da documentação — transforma os dados de components/<id>/<id>.docs.js em tabs.
 *
 * O arquivo de docs é só dados (carrega mesmo sem este kit, ex.: no smoke test):
 *   CDS.docs = CDS.docs || {};
 *   CDS.docs["credit-card-input"] = {
 *     tag: "cds-credit-card-input",       // componente usado nos exemplos
 *     base: { label: "…" },               // atributos comuns a todos os exemplos
 *     source: "https://figma…",           // frame [Documentação] no Figma
 *     cover: { description, attrs | examples: [attrs…] | image, tall }   // opcional: capa acima das tabs (frame [Header])
 *     tabs: [{ id: "uso", title: "Uso", blocks: [ { h2: "Sobre" }, { p: "…" }, … ] }]
 *   };
 *
 * Blocos (uma chave por objeto):
 *   h2 · h3 · p · ul · ol · note           texto (`código` vira <code>)
 *   alert: { appearance, label, text }    Alert do DS com título (ex.: especificação pendente)
 *   cards: [[título, texto], …]           grade de princípios
 *   display: { attrs, live }              caixa de exibição com um exemplo
 *   compare: [{ title, attrs | empty }]   exemplos lado a lado
 *   anatomy: { attrs, markers: [{ n, target, side: left|right|top|bottom, align: "start", long: true }], legend: [...] }
 *   props: [{ name, type, icon, nested: [{ name, type, values }] }]
 *   specimens: { title, min, items: [{ label, attrs }] }   min = largura mínima da coluna
 *   guides: [{ attrs, title, text }]
 *   dodont: [{ kind: "do"|"dont", attrs, title, text, steps, style }]   sem attrs: só texto · steps: lista numerada
 *   table: { head: [...], rows: [[...]] }
 *   shortcuts: [{ title, text, href, cta, illustration, external }]   atalhos em Cards (capa do Castanha Hub); sem href, card só informativo
 *   palette: { label, names: [...], steps: [...], hex: [[hex por passo] por cor], notes: { passo: "nota" } }   paleta fora dos tokens (ilustração)
 *   steps: [{ title, text, list, table, after }]   passos numerados
 *   code: "texto"                      bloco monoespaçado com botão Copiar
 *   glossary: { label, placeholder, letters: { A: [[termo, definição, "não use"], …] } }   glossário com busca
 *   simulate: { illustration, matrices: { id: "feColorMatrix" }, items: [{ label, matrix | filter, double }] }   condições visuais sobre uma ilustração
 *   specs: [{ title, rows: [[rótulo, valor], …] }]   cards de ficha técnica (ex.: Motion Style por interação)
 *   iconGallery: { only }              galeria do [Caju] Icons por categoria, com busca por nome e palavra-chave; only: "deprecated" mostra só os deprecated
 *   illustrationGallery: {}             galeria do [Caju] Illustrations por categoria (imagens com lazy load), busca por nome, categoria e description
 *
 * Em display, compare, guides e dodont, `attrs` pode ser uma lista (vários exemplos na mesma caixa).
 * attrs especiais: `_tag` (outro componente), `_text` (texto), `_children: [attrs…]` (filhos montados antes de conectar).
 * Props aceitam `values` (lista sob o nome, ex.: opções da Variant ou o Padrão do texto).
 * Exemplos estáticos ficam com `inert` (sem hover, foco ou tab); `live: true` os deixa interativos.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  // Tipo de propriedade do Figma → Appearance do Tag (como no .Prop-type da doc)
  // Tooltip das etiquetas de tipo de prop (Variant, Boolean, Text, Swap component)
  var PROP_TIP = {
    "Variant": "Variante do Figma: troca a aparência ou o estado entre opções fixas.",
    "Boolean": "Liga ou desliga uma parte do componente.",
    "Text": "Texto editável do componente.",
    "Swap component": "Troca o componente aninhado, como o ícone, por outro do DS."
  };
  var PROP_TYPE = { "Swap component": "warning", "Variant": "informative", "Boolean": "positive", "Text": "accent" };

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  /** Texto com `código` → <code>; o resto é escapado. */
  function rich(n, s){
    String(s).split(/(`[^`]+`)/).forEach(function(part){
      if (/^`[^`]+`$/.test(part)){
        // <wbr> depois de / e - : tokens longos quebram nos separadores, não no meio da palavra
        var c = el("code");
        part.slice(1, -1).split(/(?<=[^\/-][\/-])/).forEach(function(seg, i){ if (i) c.appendChild(document.createElement("wbr")); c.appendChild(document.createTextNode(seg)); });
        n.appendChild(c);
      }
      else if (part) n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function list(tag, items){
    var l = el(tag, "pg-doc-list");
    items.forEach(function(t){ l.appendChild(rich(el("li"), t)); });
    return l;
  }

  // attrs especiais: _tag (outro componente do DS no lugar de doc.tag; não herda doc.base), _text (texto do elemento),
  // _children: [attrs, …] (filhos, ex.: Accordion Item dentro do Accordion; entram antes de conectar o pai)
  function example(doc, attrs, live){
    var a = attrs || {}, tag = a._tag || doc.tag;
    var c = document.createElement(tag), all = Object.assign({}, a._tag ? {} : doc.base || {}, a);
    Object.keys(all).forEach(function(k){
      var v = all[k];
      if (v == null || k.charAt(0) === "_") return;
      c.setAttribute(k, v === true ? "" : v === false ? "false" : v); // false → "false" (booleans do Figma ligados por padrão)
    });
    if (a._text != null) c.textContent = a._text;
    (a._children || []).forEach(function(ch){ c.appendChild(example({ tag: ch._tag || "div" }, ch, true)); });
    if (!live) c.inert = true;
    return c;
  }
  /** attrs pode ser uma lista: vários exemplos lado a lado na mesma caixa (ex.: dois cards de um grupo). */
  function examples(doc, attrs, live){
    if (!Array.isArray(attrs)) return example(doc, attrs, live);
    var f = document.createDocumentFragment();
    attrs.forEach(function(a){ f.appendChild(example(doc, a, live)); });
    return f;
  }
  function display(child, cls){
    var d = el("div", "pg-doc-display" + (cls ? " " + cls : ""));
    if (child) d.appendChild(child);
    return d;
  }

  // ---------- Anatomia: marcadores numerados ligados às partes reais do componente ----------
  function anatomy(doc, b){
    var wrap = el("div", "pg-doc-anatomy");
    var stage = display(null, "pg-doc-display--anatomy");
    var cmp = example(doc, b.attrs, false);
    cmp.style.flex = "0 0 auto"; // sem encolher como item flex: a medida é a largura natural
    stage.appendChild(cmp);
    var marks = b.markers.map(function(m){
      var mk = el("span", "pg-doc-mark pg-doc-mark--" + m.side);
      mk.setAttribute("aria-hidden", "true");
      var num = mk.appendChild(el("span", "pg-doc-mark__n", String(m.n)));
      // Tooltip com o nome da parte (só mouse: o marcador é decorativo e a legenda abaixo já lista as partes)
      var part = (b.legend || [])[m.n - 1];
      if (part && window.CDS.kit) CDS.kit.lazyTip(num, String(part).replace(/`/g, ""), { focus: false, container: wrap }); // fora do marcador: o transform dele quebraria o position:fixed do Tooltip
      mk.appendChild(el("span", "pg-doc-mark__line"));
      if (m.long) mk.classList.add("is-long"); // seta mais longa: número abaixo/acima de outro marcador vizinho
      stage.appendChild(mk);
      return { m: m, el: mk };
    });
    // Normal: número + seta (76px por lado). Sem esse espaço (telas estreitas), o diagrama encolhe
    // por escala e o número fica colado na parte, sem seta (32px por lado).
    var SIDE = 76, SIDE_COMPACT = 32;
    function place(){
      cmp.style.transform = ""; cmp.style.maxWidth = "none"; // mede a largura natural do componente
      var W = cmp.offsetWidth;
      // decide pela largura total (o padding muda com a classe; medir por ele faria a decisão oscilar)
      var compact = stage.clientWidth - 48 < W + 2 * SIDE, avail = stage.clientWidth - 16;
      stage.classList.toggle("is-compact", compact);
      if (compact) cmp.style.transform = "scale(" + Math.min(1, (avail - 2 * SIDE_COMPACT) / W).toFixed(3) + ")";
      else cmp.style.maxWidth = "";
      var s = stage.getBoundingClientRect(), gap = compact ? 4 : 8;
      marks.forEach(function(x){
        var t = cmp.querySelector(x.m.target), mk = x.el;
        if (!t){ mk.hidden = true; return; }
        var r = t.getBoundingClientRect();
        mk.hidden = false; mk.style.left = mk.style.top = mk.style.right = "";
        if (x.m.side === "left"){ mk.style.right = (s.right - r.left + gap) + "px"; mk.style.top = (r.top - s.top + r.height / 2) + "px"; }
        else if (x.m.side === "right"){ mk.style.left = (r.right - s.left + gap) + "px"; mk.style.top = (r.top - s.top + r.height / 2) + "px"; }
        // top/bottom: align "start" encosta a seta na borda esquerda da parte (para não colidir com outra no centro)
        var bx = x.m.align === "start" ? r.left - s.left + 4 : r.left - s.left + Math.min(r.width / 2, 56);
        if (x.m.side === "top"){ mk.style.left = bx + "px"; mk.style.top = (r.top - s.top - gap) + "px"; }
        else if (x.m.side === "bottom"){ mk.style.left = bx + "px"; mk.style.top = (r.bottom - s.top + gap) + "px"; }
      });
    }
    requestAnimationFrame(function(){ requestAnimationFrame(place); });
    if (window.ResizeObserver) new ResizeObserver(place).observe(stage, { box: "border-box" });
    wrap.appendChild(stage);
    wrap.appendChild(list("ol", b.legend));
    return wrap;
  }

  function props(items){
    var box = el("div", "pg-doc-props");
    function tag(type){
      var t = document.createElement("cds-tag");
      t.setAttribute("label", type); t.setAttribute("appearance", PROP_TYPE[type] || "neutral"); t.setAttribute("show-lead-item", "false");
      if (window.CDS.kit && PROP_TIP[type]) CDS.kit.lazyTip(t, PROP_TIP[type], { label: type });
      return t;
    }
    items.forEach(function(p){
      var row = el("div", "pg-doc-prop");
      var head = el("div", "pg-doc-prop__head");
      if (p.icon){ var i = document.createElement("cds-icon"); i.setAttribute("icon", p.icon); i.setAttribute("size", "small"); i.setAttribute("appearance", "neutral"); head.appendChild(i); }
      head.appendChild(el("span", "pg-doc-prop__name", p.name));
      if (p.type) head.appendChild(tag(p.type));
      row.appendChild(head);
      if (p.values){ var pv = el("ul", "pg-doc-prop__values"); p.values.forEach(function(v){ pv.appendChild(el("li", null, v)); }); row.appendChild(pv); }
      (p.nested || []).forEach(function(n){
        var sub = el("div", "pg-doc-prop__nested");
        var sh = el("div", "pg-doc-prop__head");
        sh.appendChild(el("span", "pg-doc-prop__attr", n.name));
        if (n.type) sh.appendChild(tag(n.type));
        sub.appendChild(sh);
        var vals = el("ul", "pg-doc-prop__values");
        (n.values || []).forEach(function(v){ vals.appendChild(el("li", null, v)); });
        sub.appendChild(vals);
        row.appendChild(sub);
      });
      box.appendChild(row);
    });
    return box;
  }

  /** Main Button do DS (Default · Neutral · Small, sem ícones) para ações da doc. */
  function mainButton(label){
    var b = document.createElement("cds-main-button");
    [["kind","default"],["appearance","neutral"],["size","small"],["label",label],["show-lead-icon","false"],["show-trailing-icon","false"]].forEach(function(a){ b.setAttribute(a[0], a[1]); });
    return b;
  }
  /** Toast do DS (Positive) no rodapé da tela; some sozinho em 3s. Um por vez. */
  var toastEl = null, toastTimer = 0;
  function toast(text){
    if (toastEl) toastEl.remove();
    toastEl = document.createElement("cds-toast");
    toastEl.setAttribute("appearance", "positive"); toastEl.setAttribute("text", text); toastEl.setAttribute("show-trailing-item", "false");
    toastEl.className = "pg-toast";
    document.body.appendChild(toastEl);
    clearTimeout(toastTimer);
    var t = toastEl; toastTimer = setTimeout(function(){ if (t.parentNode) t.remove(); if (toastEl === t) toastEl = null; }, 3000);
  }

  var BLOCKS = {
    h2: function(d, v){ return el("h2", "pg-doc-h2", v); },
    h3: function(d, v){ return el("h3", "pg-doc-h3", v); },
    p: function(d, v){ return rich(el("p", "pg-doc-p"), v); },
    // Nota → Alert do DS (Informative, sem título e sem fechar); o texto rico vira o Text Content
    note: function(d, v){
      var a = el("cds-alert", "pg-doc-alert");
      a.setAttribute("appearance", "informative"); a.setAttribute("show-label", "false"); a.setAttribute("show-close-button", "false");
      a.appendChild(rich(document.createElement("span"), v));
      return a;
    },
    ul: function(d, v){ return list("ul", v); },
    ol: function(d, v){ return list("ol", v); },
    cards: function(d, v){
      var g = el("div", "pg-doc-cards");
      // Card do DS (Has Border) com título + texto no Slot
      v.forEach(function(c){ var k = el("cds-card", "pg-doc-card"); k.setAttribute("has-border", "true"); k.appendChild(el("h4", "pg-doc-h4", c[0])); k.appendChild(rich(el("p", "pg-doc-p"), c[1])); g.appendChild(k); });
      return g;
    },
    display: function(d, v){ return display(examples(d, v.attrs, v.live), v.live ? "is-live" : ""); },
    // Alert do DS com título (ex.: especificação pendente)
    alert: function(d, v){
      var a = el("cds-alert", "pg-doc-alert");
      a.setAttribute("appearance", v.appearance || "informative"); a.setAttribute("show-close-button", "false");
      if (v.label) a.setAttribute("label", v.label); else a.setAttribute("show-label", "false");
      a.appendChild(rich(document.createElement("span"), v.text));
      return a;
    },
    compare: function(d, v){
      var g = el("div", "pg-doc-compare");
      v.forEach(function(c){
        var f = el("figure", "pg-doc-figure");
        f.appendChild(c.empty ? display(el("span", "pg-doc-empty", c.empty), "is-empty") : display(examples(d, c.attrs)));
        f.appendChild(el("figcaption", null, c.title));
        g.appendChild(f);
      });
      return g;
    },
    anatomy: anatomy,
    props: function(d, v){ return props(v); },
    specimens: function(d, v){
      var s = el("section", "pg-doc-specimens");
      if (v.title) s.appendChild(el("h3", "pg-doc-h3", v.title));
      var g = display(null, "pg-doc-display--grid"); // a própria caixa é a grade
      if (v.min) g.style.setProperty("--_min", v.min); // largura mínima da coluna (padrão 320px)
      v.items.forEach(function(it){
        var f = el("figure", "pg-doc-specimen");
        f.appendChild(example(d, it.attrs));
        f.appendChild(el("figcaption", null, it.label));
        g.appendChild(f);
      });
      s.appendChild(g);
      return s;
    },
    guides: function(d, v){
      var g = el("div", "pg-doc-guides");
      v.forEach(function(it){
        var row = el("div", "pg-doc-guide");
        row.appendChild(display(examples(d, it.attrs)));
        var t = el("div", "pg-doc-guide__text");
        t.appendChild(el("h3", "pg-doc-h3", it.title));
        t.appendChild(rich(el("p", "pg-doc-p"), it.text));
        row.appendChild(t);
        g.appendChild(row);
      });
      return g;
    },
    dodont: function(d, v){
      var g = el("div", "pg-doc-dodont");
      v.forEach(function(it){
        var card = el("figure", "pg-doc-dd pg-doc-dd--" + it.kind);
        if (it.attrs){ // sem attrs: Do/Don't só de texto (ex.: regras de motion, cujas imagens são animações)
          var box = el("div", "pg-doc-dd__box"), c = examples(d, it.attrs);
          if (it.style && c.setAttribute) c.setAttribute("style", it.style);
          box.appendChild(c);
          card.appendChild(box);
        }
        var cap = el("figcaption", "pg-doc-dd__text");
        cap.appendChild(el("strong", null, it.kind === "do" ? "Use" : it.kind === "caution" ? "Use com cautela" : "Não use"));
        if (it.title) cap.appendChild(el("span", "pg-doc-dd__title", it.title));
        cap.appendChild(rich(el("span"), it.text));
        if (it.steps) cap.appendChild(list("ol", it.steps));
        card.appendChild(cap);
        g.appendChild(card);
      });
      return g;
    },
    specs: function(d, v){
      var g = el("div", "pg-doc-specs");
      v.forEach(function(c){
        var card = el("cds-card", "pg-doc-spec"); card.setAttribute("has-border", "true"); // Card do DS
        card.appendChild(el("h3", "pg-doc-h4", c.title));
        var dl = el("dl");
        c.rows.forEach(function(r){
          dl.appendChild(el("dt", null, r[0]));
          var dd = dl.appendChild(rich(el("dd"), r[1]));
          // Nome de Motion Style (ex.: `Hover In/01`) → Tooltip com duração e curva lidas dos tokens em tempo real
          [].forEach.call(dd.querySelectorAll("code"), function(code){
            var m = code.textContent.match(/^([A-Za-z ]+)\/(\d+)$/); if (!m || !window.CDS.kit) return;
            var key = "--motion-" + m[1].trim().toLowerCase().replace(/\s+/g, "-") + "-" + m[2], cs = getComputedStyle(document.documentElement);
            var dur = cs.getPropertyValue(key + "-timing").trim(), ease = cs.getPropertyValue(key + "-easing").trim();
            if (dur) CDS.kit.lazyTip(code, dur + " · " + ease, { label: "Motion Style/" + code.textContent });
          });
        });
        card.appendChild(dl);
        g.appendChild(card);
      });
      return g;
    },
    // Galeria em accordion: uma categoria (bucket) por painel; a busca abre só os painéis com resultado
    iconGallery: function(d, v){
      var A = window.CDS.assets || {}, meta = {};
      (A.icons || []).forEach(function(i){ meta[i.name] = i; });
      var wrap = el("div", "pg-doc-icons");
      // Search Input do DS (Fase 2 do plano UI no DS): rótulo visível, lupa fixa e botão de limpar
      var search = document.createElement("cds-search-input"); search.className = "pg-doc-icons__search";
      search.setAttribute("label", "Buscar ícone"); search.setAttribute("placeholder", "Nome ou palavra-chave (ex.: cartão, seta, pix)");
      search.setAttribute("show-required", "false"); search.setAttribute("show-supporting-content", "false");
      var tools = el("div", "pg-doc-icons__tools");
      var count = el("p", "pg-doc-note"); count.setAttribute("aria-live", "polite");
      var toggleAll = mainButton("Abrir todas");
      tools.appendChild(count); tools.appendChild(toggleAll);
      wrap.appendChild(search); wrap.appendChild(tools);
      var acc = el("div", "pg-doc-acc"), sections = [];
      var fold = function(s){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
      (A.iconBuckets || []).filter(function(b){ return !b.glyphs && (v.only === "deprecated" ? b.deprecated : !b.deprecated); }).forEach(function(b, bi){
        // Accordion Item do DS (Fase 4): categoria no Label, contagem na Description
        var det = el("cds-accordion-item", "pg-doc-acc__item");
        det.setAttribute("label", b.name); det.setAttribute("show-lead-item", "false");
        var badge = { set textContent(t){ det.setAttribute("description", t + (/de/.test(t) ? "" : " ícones")); } }; badge.textContent = String(b.icons.length);
        var grid = el("ul", "pg-doc-icons__grid"), tiles = [];
        b.icons.forEach(function(n){
          var m = meta[n] || {}, li = el("li"), btn = el("button", "pg-doc-icons__tile");
          btn.type = "button";
          // Tooltip do DS (criado no 1º hover/foco): nome + palavras-chave; substitui o title nativo
          if (window.CDS.kit) CDS.kit.lazyTip(btn, (m.keywords || []).length ? (m.keywords || []).join(", ") : "Sem palavras-chave no Figma.", { label: n });
          btn.setAttribute("aria-label", n + " — copiar nome");
          var ic = el("span", "cds-icon " + (b.deprecated ? "" : m.cls || "")); ic.setAttribute("aria-hidden", "true");
          // deprecated pode repetir nome de um ativo (sem classe própria): aponta direto para o arquivo
          if (b.deprecated){ var u = 'url("assets/icons/' + b.id + "/" + encodeURIComponent(n) + '.svg")'; ic.style.webkitMaskImage = u; ic.style.maskImage = u; }
          btn.appendChild(ic); btn.appendChild(el("span", "pg-doc-icons__name", n));
          btn.addEventListener("click", function(){
            try { navigator.clipboard.writeText(n); } catch (e) {}
            toast("Copiado: " + n);
          });
          li.appendChild(btn); grid.appendChild(li);
          tiles.push({ li: li, text: fold(n + " " + (m.keywords || []).join(" ")) });
        });
        var body = el("div", "pg-doc-acc__body"); body.appendChild(grid); det.appendChild(body);
        if (bi !== 0) det.setAttribute("collapsed", "");
        acc.appendChild(det);
        sections.push({ det: det, badge: badge, total: b.icons.length, tiles: tiles, first: bi === 0 });
      });
      wrap.appendChild(acc);
      function filter(){
        var q = fold(String(search.value || "").trim()), shown = 0;
        sections.forEach(function(s){
          var any = 0;
          s.tiles.forEach(function(t){ var ok = !q || t.text.indexOf(q) !== -1; t.li.hidden = !ok; if (ok) any++; });
          s.det.hidden = !any; s.badge.textContent = q ? any + " de " + s.total : String(s.total);
          if (q) CDS.attr(s.det, "collapsed", !(any > 0));
          shown += any;
        });
        count.textContent = shown + " ícone" + (shown === 1 ? "" : "s") + (q ? " para “" + String(search.value || "").trim() + "”" : " em " + sections.length + " categorias") + ". Clique para copiar o nome.";
      }
      var wasQuery = false;
      search.addEventListener("cds-change", function(e){
        e.stopPropagation();
        var has = !!String(search.value || "").trim();
        if (wasQuery && !has) sections.forEach(function(s){ CDS.attr(s.det, "collapsed", !s.first); }); // limpou a busca: volta ao estado inicial
        wasQuery = has; filter();
      });
      toggleAll.addEventListener("click", function(){
        var open = sections.some(function(s){ return !s.det.hidden && s.det.collapsed; });
        sections.forEach(function(s){ if (!s.det.hidden) CDS.attr(s.det, "collapsed", !open); });
        toggleAll.setAttribute("label", open ? "Fechar todas" : "Abrir todas");
      });
      filter();
      return wrap;
    },
    illustrationGallery: function(d, v){
      var A = window.CDS.assets || {}, meta = {};
      (A.illustrations || []).forEach(function(i){ meta[i.name] = i; });
      var wrap = el("div", "pg-doc-icons pg-doc-ills");
      // Search Input do DS (Fase 2 do plano UI no DS): rótulo visível, lupa fixa e botão de limpar
      var search = document.createElement("cds-search-input"); search.className = "pg-doc-icons__search";
      search.setAttribute("label", "Buscar ilustração"); search.setAttribute("placeholder", "Nome, categoria ou uso (ex.: cartão, pix, erro)");
      search.setAttribute("show-required", "false"); search.setAttribute("show-supporting-content", "false");
      var tools = el("div", "pg-doc-icons__tools");
      var count = el("p", "pg-doc-note"); count.setAttribute("aria-live", "polite");
      var toggleAll = mainButton("Abrir todas");
      tools.appendChild(count); tools.appendChild(toggleAll);
      wrap.appendChild(search); wrap.appendChild(tools);
      var acc = el("div", "pg-doc-acc"), sections = [];
      var fold = function(s){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
      (A.illustrationBuckets || []).forEach(function(b, bi){
        // Accordion Item do DS (Fase 4): categoria no Label, contagem na Description
        var det = el("cds-accordion-item", "pg-doc-acc__item");
        det.setAttribute("label", b.name); det.setAttribute("show-lead-item", "false");
        var badge = { set textContent(t){ det.setAttribute("description", t + (/de/.test(t) ? "" : " ilustrações")); } }; badge.textContent = String(b.items.length);
        var grid = el("ul", "pg-doc-icons__grid pg-doc-ills__grid"), tiles = [];
        b.items.forEach(function(k){
          var m = meta[k] || { label: k, src: "" }, li = el("li"), btn = el("button", "pg-doc-icons__tile pg-doc-ills__tile");
          btn.type = "button";
          if (window.CDS.kit) CDS.kit.lazyTip(btn, [m.figma !== m.label ? "Figma: " + m.figma : "", m.size, m.description].filter(Boolean).join(" · ") || "Sem description no Figma.", { label: m.label });
          btn.setAttribute("aria-label", m.label + " — copiar nome");
          var img = el("img", "pg-doc-ills__img"); img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.src = m.src;
          btn.appendChild(img); btn.appendChild(el("span", "pg-doc-icons__name", m.label));
          btn.addEventListener("click", function(){
            try { navigator.clipboard.writeText(k); } catch (e) {}
            toast("Copiado: " + k);
          });
          li.appendChild(btn); grid.appendChild(li);
          tiles.push({ li: li, text: fold([k, m.figma, b.name, m.description].join(" ")) });
        });
        var body = el("div", "pg-doc-acc__body"); body.appendChild(grid); det.appendChild(body);
        if (bi !== 0) det.setAttribute("collapsed", "");
        acc.appendChild(det);
        sections.push({ det: det, badge: badge, total: b.items.length, tiles: tiles, first: bi === 0 });
      });
      wrap.appendChild(acc);
      function filter(){
        var q = fold(String(search.value || "").trim()), shown = 0;
        sections.forEach(function(s){
          var any = 0;
          s.tiles.forEach(function(t){ var ok = !q || t.text.indexOf(q) !== -1; t.li.hidden = !ok; if (ok) any++; });
          s.det.hidden = !any; s.badge.textContent = q ? any + " de " + s.total : String(s.total);
          if (q) CDS.attr(s.det, "collapsed", !(any > 0));
          shown += any;
        });
        count.textContent = shown + " ilustraç" + (shown === 1 ? "ão" : "ões") + (q ? " para “" + String(search.value || "").trim() + "”" : " em " + sections.length + " categorias") + ". Clique para copiar o nome (categoria/nome).";
      }
      var wasQuery = false;
      search.addEventListener("cds-change", function(e){
        e.stopPropagation();
        var has = !!String(search.value || "").trim();
        if (wasQuery && !has) sections.forEach(function(s){ CDS.attr(s.det, "collapsed", !s.first); });
        wasQuery = has; filter();
      });
      toggleAll.addEventListener("click", function(){
        var open = sections.some(function(s){ return !s.det.hidden && s.det.collapsed; });
        sections.forEach(function(s){ if (!s.det.hidden) CDS.attr(s.det, "collapsed", !open); });
        toggleAll.setAttribute("label", open ? "Fechar todas" : "Abrir todas");
      });
      filter();
      return wrap;
    },
    // Atalhos (capa do Castanha Hub): Card do DS com ilustração da biblioteca + título + texto + Link do DS
    shortcuts: function(d, v){
      var g = el("div", "pg-doc-shortcuts"), ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      v.forEach(function(it){
        var c = el("cds-card", "pg-doc-shortcut"); c.setAttribute("has-border", "true");
        if (it.illustration && ills[it.illustration]){ var im = el("img", "pg-doc-shortcut__img"); im.alt = ""; im.loading = "lazy"; im.src = ills[it.illustration]; c.appendChild(im); }
        c.appendChild(el("h3", "pg-doc-h4", it.title));
        if (it.text) c.appendChild(rich(el("p", "pg-doc-p"), it.text));
        if (it.href){ // sem href: card só informativo (ex.: categorias de ilustração)
          var l = el("cds-link", "pg-doc-shortcut__link"); l.setAttribute("label", it.cta || "Abrir"); l.setAttribute("href", it.href); l.setAttribute("appearance", "accent");
          if (it.external){ l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); }
          c.appendChild(l);
        }
        g.appendChild(c);
      });
      return g;
    },
    // Paleta fora dos tokens Common/* (ex.: cores exclusivas das ilustrações): linhas = passos, colunas = cores.
    // Os hex vêm do Figma como dado (não são tokens de UI); clique copia o hex.
    palette: function(d, v){
      var wrap = el("div", "pg-doc-palette-wrap"), g = el("div", "pg-doc-palette");
      g.style.setProperty("--_cols", v.names.length);
      g.appendChild(el("span", "pg-doc-palette__corner", v.label || ""));
      v.names.forEach(function(n){ g.appendChild(el("span", "pg-doc-palette__name", n)); });
      v.steps.forEach(function(st, r){
        var head = el("span", "pg-doc-palette__step", String(st));
        if (v.notes && v.notes[st]) head.appendChild(el("small", null, v.notes[st]));
        g.appendChild(head);
        v.names.forEach(function(n, c){
          var hex = "#" + v.hex[c][r], b = el("button", "pg-doc-palette__sw");
          b.type = "button"; b.style.background = hex; b.setAttribute("aria-label", n + " " + st + " · " + hex);
          b.appendChild(el("span", "pg-doc-palette__hex", hex.toUpperCase()));
          b.addEventListener("click", function(){ if (navigator.clipboard) navigator.clipboard.writeText(hex.toUpperCase()); if (CDS.docToast) CDS.docToast(hex.toUpperCase() + " copiado"); });
          g.appendChild(b);
        });
      });
      wrap.appendChild(g);
      return wrap;
    },
    // Simulação de condições visuais sobre uma ilustração da biblioteca (filtros SVG/CSS; aproximação)
    simulate: function(d, v){
      var NS = "http://www.w3.org/2000/svg", g = el("div", "pg-doc-sim"), ills = {};
      ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "pg-doc-sim__defs"); svg.setAttribute("aria-hidden", "true");
      var defs = svg.appendChild(document.createElementNS(NS, "defs"));
      Object.keys(v.matrices || {}).forEach(function(id){
        var f = defs.appendChild(document.createElementNS(NS, "filter")); f.setAttribute("id", "pg-sim-" + id);
        var m = f.appendChild(document.createElementNS(NS, "feColorMatrix")); m.setAttribute("type", "matrix"); m.setAttribute("values", v.matrices[id]);
      });
      g.appendChild(svg);
      v.items.forEach(function(it){
        var f = el("figure", "pg-doc-sim__item"), box = el("div", "pg-doc-sim__box" + (it.double ? " is-double" : ""));
        [0, 1].slice(0, it.double ? 2 : 1).forEach(function(){
          var im = el("img", "pg-doc-sim__img"); im.alt = ""; im.loading = "lazy"; im.src = ills[v.illustration] || "";
          im.style.filter = it.matrix ? "url(#pg-sim-" + it.matrix + ")" : (it.filter || "none");
          box.appendChild(im);
        });
        f.appendChild(box); f.appendChild(el("figcaption", null, it.label));
        g.appendChild(f);
      });
      return g;
    },
    // Glossário com busca (Search Input do DS): termos por letra; "Não use" com Tag Negative
    glossary: function(d, v){
      var wrap = el("div", "pg-doc-gloss"), fold = function(s){ return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
      var search = wrap.appendChild(document.createElement("cds-search-input"));
      [["label", v.label || "Buscar termo"], ["placeholder", v.placeholder || "Termo ou definição"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ search.setAttribute(a[0], a[1]); });
      var count = wrap.appendChild(el("p", "pg-doc-gloss__count")); count.setAttribute("aria-live", "polite");
      var groups = [], total = 0;
      Object.keys(v.letters).forEach(function(L){
        var sec = wrap.appendChild(el("section", "pg-doc-gloss__group"));
        sec.appendChild(el("h3", "pg-doc-gloss__letter", L));
        var dl = sec.appendChild(el("dl", "pg-doc-gloss__list")), items = [];
        v.letters[L].forEach(function(e){
          var row = dl.appendChild(el("div", "pg-doc-gloss__item"));
          row.appendChild(el("dt", null, e[0]));
          var dd = row.appendChild(el("dd"));
          dd.appendChild(rich(el("p", "pg-doc-p"), e[1]));
          if (e[2]){
            var av = dd.appendChild(el("p", "pg-doc-gloss__avoid")), t = document.createElement("cds-tag");
            t.setAttribute("label", "Não use"); t.setAttribute("appearance", "negative"); t.setAttribute("icon", "close-line");
            av.appendChild(t); av.appendChild(rich(el("span"), e[2]));
          }
          items.push({ row: row, text: fold(e.join(" ")) }); total++;
        });
        groups.push({ sec: sec, items: items });
      });
      var empty = wrap.appendChild(el("p", "pg-doc-gloss__empty", "Nenhum termo encontrado. Não encontrou um termo ou quer sugerir uma correção? Fale com o time de Content no canal #content-suporte."));
      function filter(){
        var q = fold(search.value).trim(), n = 0;
        groups.forEach(function(g){
          var shown = 0;
          g.items.forEach(function(it){ var ok = !q || it.text.indexOf(q) >= 0; it.row.hidden = !ok; if (ok) shown++; });
          g.sec.hidden = !shown; n += shown;
        });
        count.textContent = q ? n + " de " + total + " termos" : total + " termos";
        empty.hidden = n > 0;
      }
      search.addEventListener("cds-change", function(e){ e.stopPropagation(); filter(); });
      search.addEventListener("cds-clear", function(e){ e.stopPropagation(); filter(); });
      filter();
      return wrap;
    },
    // Passos numerados com título, texto, lista e tabela opcionais (ex.: processo de naming)
    steps: function(d, v){
      var ol = el("ol", "pg-doc-steps");
      v.forEach(function(st){
        var li = ol.appendChild(el("li", "pg-doc-step"));
        li.appendChild(el("h4", "pg-doc-step__title", st.title));
        (Array.isArray(st.text) ? st.text : st.text ? [st.text] : []).forEach(function(t){ li.appendChild(rich(el("p", "pg-doc-p"), t)); });
        if (st.list) li.appendChild(list("ul", st.list));
        if (st.table) li.appendChild(BLOCKS.table(d, st.table));
        (Array.isArray(st.after) ? st.after : st.after ? [st.after] : []).forEach(function(t){ li.appendChild(rich(el("p", "pg-doc-p"), t)); });
      });
      return ol;
    },
    // Texto para copiar (ex.: prompt): bloco monoespaçado + Main Button do DS "Copiar"
    code: function(d, v){
      var wrap = el("div", "pg-doc-code"), pre = el("pre", "pg-doc-code__pre"), c = pre.appendChild(el("code", null, v));
      pre.tabIndex = 0;
      var b = wrap.appendChild(mainButton("Copiar"));
      b.addEventListener("click", function(){ if (navigator.clipboard) navigator.clipboard.writeText(v); toast("Copiado"); });
      wrap.appendChild(pre);
      return wrap;
    },
    table: function(d, v){
      var wrap = el("div", "pg-doc-table-wrap"), t = el("table", "pg-doc-table");
      var tr = el("tr"); v.head.forEach(function(h){ tr.appendChild(el("th", null, h)); });
      var thead = el("thead"); thead.appendChild(tr); t.appendChild(thead);
      var tb = el("tbody");
      v.rows.forEach(function(r){ var row = el("tr"); r.forEach(function(c){ row.appendChild(rich(el("td"), c)); }); tb.appendChild(row); });
      t.appendChild(tb); wrap.appendChild(t);
      return wrap;
    }
  };

  CDS.docBlocks = BLOCKS; // extensões (ex.: scripts/tokens-kit.js acrescenta o bloco `tokens`)
  CDS.docToast = toast; CDS.docMainButton = mainButton; // Toast e Main Button do DS para as extensões

  /** Capa do componente (frame [Header] do Figma): o componente real (vivo) numa moldura, acima das tabs.
   *  Sem `doc.cover`, esvazia e esconde `root`. Fundo provisório = Accent/Solid/soft (o Surface/03 do Figma é legado, sem token: C91). */
  CDS.renderCover = function(doc, root){
    root.innerHTML = "";
    root.hidden = !(doc && doc.cover);
    if (root.hidden) return;
    var cv = doc.cover;
    root.classList.toggle("is-image", !!cv.image);
    if (cv.image){
      // capa com mockup de produto (imagem exportada do [Header] inteiro, já com fundo e forma)
      var img = el("img", "pg-cover__img"); img.decoding = "async"; img.alt = cv.alt || "";
      img.onerror = function(){ root.hidden = true; }; // PNG ainda não exportado: sem capa até o arquivo existir
      img.src = cv.image;
      root.appendChild(img); return;
    }
    // moldura interna = frame do Figma (Surface/default), não um componente: só tokens
    var frame = el("div", "pg-cover__frame" + (cv.tall ? " is-tall" : ""));
    (cv.examples || [cv.attrs]).forEach(function(a){ frame.appendChild(example(doc, a, true)); }); // exemplos vivos
    root.appendChild(frame);
  };

  /** Renderiza uma tab da doc em `root`. */
  CDS.renderDoc = function(doc, tabId, root){
    var tab = doc.tabs.filter(function(t){ return t.id === tabId; })[0] || doc.tabs[0];
    root.innerHTML = "";
    var page = el("article", "pg-doc");
    tab.blocks.forEach(function(b){
      var k = Object.keys(b)[0];
      if (BLOCKS[k]) page.appendChild(BLOCKS[k](doc, b[k]));
    });
    if (doc.source){
      var src = el("p", "pg-doc-source");
      src.appendChild(document.createTextNode("Fonte: "));
      var a = document.createElement("cds-link"); // Link do DS (abre o Figma em outra aba)
      a.setAttribute("label", doc.sourceLabel || "[Documentação] no Figma"); a.setAttribute("href", doc.source); a.setAttribute("target", "_blank");
      a.setAttribute("appearance", "neutral"); a.setAttribute("icon", "link-line");
      src.appendChild(a);
      page.appendChild(src);
    }
    root.appendChild(page);
  };
})();
