/**
 * Kit da documentação — transforma os dados de components/<id>/<id>.docs.js em tabs.
 *
 * O arquivo de docs é só dados (carrega mesmo sem este kit, ex.: no smoke test):
 *   CDS.docs = CDS.docs || {};
 *   CDS.docs["credit-card-input"] = {
 *     tag: "cds-credit-card-input",       // componente usado nos exemplos
 *     base: { label: "…" },               // atributos comuns a todos os exemplos
 *     source: "https://figma…",           // frame [Documentação] no Figma
 *     cover: { description, attrs | examples: [attrs…] | image, tall, wide }   // opcional: capa acima das tabs (frame [Header])
 *     tabs: [{ id: "uso", title: "Uso", blocks: [ { h2: "Sobre" }, { p: "…" }, … ] }]
 *   };
 *
 * Blocos (uma chave por objeto):
 *   h2 · h3 · p · ul · ol · note           texto (`código` vira <code>)
 *   alert: { appearance, label, text }    Alert do DS com título (ex.: especificação pendente)
 *   cards: [[título, texto], …]           grade de princípios
 *   display: { attrs, live }              caixa de exibição com um exemplo
 *   compare: [{ title, attrs | empty }]   exemplos lado a lado
 *   anatomy: { attrs, markers: [{ n, target, side: left|right|top|bottom, align: "start"|"end", long: true }], legend: [...] }
 *                                       parte interna: a seta atravessa o componente até o número, do lado de fora · 2º desenho continua a numeração (n 6…)
 *   props: [{ name, type, default, icon, nested: [{ name, type, values }] }]   default = valor padrão no Figma
 *   specimens: { title, min, items: [{ label, attrs }] }   min = largura mínima da coluna
 *   guides: [{ attrs, title, text }]
 *   dodont: [{ kind: "do"|"dont", attrs, title, text, steps, style }]   sem attrs: só texto · steps: lista numerada
 *   table: { head: [...], rows: [[...]], wrap }   wrap: células quebram linha
 *   video: { src, title, caption, href, cta }   player embutido 16:9 (iframe do serviço; o DS não tem componente de vídeo)
 *   shortcuts: [{ title, text, href, cta, illustration | src, external }]   atalhos em Cards (capa do Castanha Hub); sem href, card só informativo
 *   banner: { area, eyebrow, heading, text, href, cta, external }   banner de divulgação (componente local <loc-banner>)
 *   banners: [banner, …]               grade de banners: o primeiro ocupa a linha inteira, os outros dividem a linha
 *   vazio: { heading, text, link: { label, href } }   estado vazio (componente local <loc-vazio>), ex.: página não encontrada
 *   hero: { eyebrow, title, text, area, cards }   capa da marca (conceito do Castanha Assets): sem area = Surface/accent com a pilha
 *                                       rosada; com area = fundo com um toque da cor da área e a pilha encostada embaixo (<loc-pilha>)
 *   palette: { label, names: [...], steps: [...], hex: [[hex por passo] por cor], notes: { passo: "nota" } }   paleta fora dos tokens (ilustração)
 *   steps: [{ title, text, list, table, after }]   passos numerados
 *   code: "texto"                      bloco monoespaçado com botão Copiar
 *   glossary: { label, placeholder, letters: { A: [[termo, definição, "não use"], …] } }   glossário com busca
 *   simulate: { illustration, matrices: { id: "feColorMatrix" }, items: [{ label, matrix | filter, double }] }   condições visuais sobre uma ilustração
 *   specs: [{ title, rows: [[rótulo, valor], …] }]   cards de ficha técnica (ex.: Motion Style por interação)
 *   quiz: { label, kind, storageKey, questions, results, right, wrong, pieces, pairs, prompt, why }   quiz em cards (composição <cmp-quiz>: kind verdict = Certo ou errado · order e pairs = quebra-cabeças)
 *   lesson: { label, heading, illustration, storageKey, tips: { href, label }, exercises }   lição no estilo Duolingo (composição <cmp-lesson>)
 *   visual: fn | { render: fn, text, list, side, bare }   visual interativo montado pelo recurso (ex.: slides recriados com componentes do DS)
 *                                       na caixa de exibição das docs; com text/list, legenda ao lado (side: true, como as Diretrizes) ou abaixo
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
      else if (part){
        // [texto](url) vira Link do DS (externo abre em outra aba, com o ícone de link); #/… navega no playground
        part.split(/(\[[^\]]+\]\((?:https?:\/\/|#\/)[^)\s]+\))/).forEach(function(seg){
          var m = seg.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
          if (!m){ if (seg) n.appendChild(document.createTextNode(seg)); return; }
          var l = el("cds-link", "pg-doc-inline-link"); l.setAttribute("label", m[1]); l.setAttribute("href", m[2]); l.setAttribute("appearance", "accent");
          if (/^https?:/.test(m[2])){ l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); } else l.setAttribute("show-trailing-item", "false");
          n.appendChild(l);
        });
      }
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
    // filhos: os do exemplo; sem eles, os do base (ex.: <option> dos Select Inputs), só quando o exemplo é o próprio componente
    (a._children || (!a._tag && doc.base && doc.base._children) || []).forEach(function(ch){ c.appendChild(example({ tag: ch._tag || "div" }, ch, true)); });
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
    // segundo desenho da mesma anatomia (ex.: Mobile) continua a numeração: legenda e tooltip contam a partir do primeiro n
    var first = Math.min.apply(null, b.markers.map(function(m){ return m.n; }));
    var marks = b.markers.map(function(m){
      var mk = el("span", "pg-doc-mark pg-doc-mark--" + m.side);
      mk.setAttribute("aria-hidden", "true");
      var num = mk.appendChild(el("span", "pg-doc-mark__n", String(m.n)));
      // Tooltip com o nome da parte (só mouse: o marcador é decorativo e a legenda abaixo já lista as partes)
      var part = (b.legend || [])[m.n - first];
      if (part && window.CDS.kit) CDS.kit.lazyTip(num, String(part).replace(/`/g, ""), { focus: false, container: wrap }); // fora do marcador: o transform dele quebraria o position:fixed do Tooltip
      var line = mk.appendChild(el("span", "pg-doc-mark__line"));
      if (m.long) mk.classList.add("is-long"); // seta mais longa: número abaixo/acima de outro marcador vizinho
      stage.appendChild(mk);
      return { m: m, el: mk, line: line };
    });
    // Normal: número + seta (76px por lado). Sem esse espaço (telas estreitas), o diagrama encolhe
    // por escala e o número fica colado na parte, sem seta (32px por lado).
    var SIDE = 76, SIDE_COMPACT = 32;
    function place(){
      cmp.style.scale = ""; cmp.style.maxWidth = "none"; // mede a largura natural do componente (scale, não transform: a animação de entrada de alguns componentes, como o Toast, usa transform)
      var W = cmp.offsetWidth, cs = getComputedStyle(stage);
      // Componente de largura total (Table, mock do Bottom Sheet): a largura acompanha a caixa, então escalar não abre espaço.
      // Ele fica mais estreito e os números continuam do lado de fora, com seta (compacto só em tela estreita).
      var fills = W >= stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 1;
      // decide pela largura total (o padding muda com a classe; medir por ele faria a decisão oscilar)
      var room = stage.clientWidth - 48 - 2 * SIDE;
      var compact = fills ? room < 320 : stage.clientWidth - 48 < W + 2 * SIDE, avail = stage.clientWidth - 16;
      stage.classList.toggle("is-compact", compact);
      if (fills){
        var mw = compact ? avail - 2 * SIDE_COMPACT : room;
        cmp.style.maxWidth = mw + "px";
        // largura mínima ou conteúdo que não encolhe: volta à largura natural e escala
        if (cmp.offsetWidth > mw + 1 || cmp.scrollWidth > cmp.clientWidth + 1){ cmp.style.maxWidth = "none"; cmp.style.scale = (mw / Math.max(cmp.offsetWidth, cmp.scrollWidth)).toFixed(3); }
      }
      else if (compact) cmp.style.scale = Math.min(1, (avail - 2 * SIDE_COMPACT) / Math.max(W, cmp.scrollWidth)).toFixed(3); // scrollWidth: conteúdo que passa da própria largura
      else cmp.style.maxWidth = "";
      var s = stage.getBoundingClientRect(), c = cmp.getBoundingClientRect(), gap = compact ? 4 : 8;
      marks.forEach(function(x){
        var t = cmp.querySelector(x.m.target) || (cmp.matches(x.m.target) ? cmp : null), mk = x.el; // alvo pode ser a própria raiz (ex.: Container do Group)
        if (!t){ mk.hidden = true; return; }
        var r = t.getBoundingClientRect();
        mk.hidden = false; mk.style.left = mk.style.top = mk.style.right = "";
        // Parte interna: a seta atravessa o componente e o número fica do lado de fora, como a .Arrow-Anatomia do Figma
        var extra = Math.max(0, Math.round(x.m.side === "left" ? r.left - c.left : x.m.side === "right" ? c.right - r.right : x.m.side === "top" ? r.top - c.top : c.bottom - r.bottom));
        var base = x.m.side === "left" || x.m.side === "right" ? "var(--common-sizes-40)" : x.m.long ? "var(--common-sizes-56)" : "var(--common-sizes-24)";
        x.line.style[x.m.side === "left" || x.m.side === "right" ? "width" : "height"] = compact || !extra ? "" : "calc(" + base + " + " + extra + "px)";
        // left/right: align "start" / "end" leva a seta para perto do topo / da base da parte (parte alta, como a área do Dropzone)
        var by = r.top - s.top + (x.m.align === "start" ? Math.min(r.height / 2, 16) : x.m.align === "end" ? r.height - Math.min(r.height / 2, 16) : r.height / 2);
        if (x.m.side === "left"){ mk.style.right = (s.right - r.left + gap) + "px"; mk.style.top = by + "px"; }
        else if (x.m.side === "right"){ mk.style.left = (r.right - s.left + gap) + "px"; mk.style.top = by + "px"; }
        // top/bottom: align "start" / "end" encosta a seta na borda esquerda / direita da parte (para não colidir com outra no centro)
        var bx = x.m.align === "start" ? r.left - s.left + 4 : x.m.align === "end" ? r.right - s.left - 4 : r.left - s.left + Math.min(r.width / 2, 56);
        if (x.m.side === "top"){ mk.style.left = bx + "px"; mk.style.top = (r.top - s.top - gap) + "px"; }
        else if (x.m.side === "bottom"){ mk.style.left = bx + "px"; mk.style.top = (r.bottom - s.top + gap) + "px"; }
      });
      // Número sempre dentro da caixa (o Popover, na camada de topo, não acompanha a escala do modo compacto)
      marks.forEach(function(x){
        if (x.el.hidden) return;
        var n = x.el.firstChild.getBoundingClientRect(), dx = n.left < s.left + 2 ? s.left + 2 - n.left : n.right > s.right - 2 ? s.right - 2 - n.right : 0;
        if (!dx) return;
        if (x.m.side === "left") x.el.style.right = (parseFloat(x.el.style.right) - dx) + "px"; else x.el.style.left = (parseFloat(x.el.style.left) + dx) + "px";
      });
      // Compacto (sem seta): números do mesmo lado que se encostam descem até ficarem separados
      if (compact) ["left", "right"].forEach(function(side){
        var prev = null;
        marks.filter(function(x){ return !x.el.hidden && x.m.side === side; })
          .sort(function(a, b){ return a.el.firstChild.getBoundingClientRect().top - b.el.firstChild.getBoundingClientRect().top; })
          .forEach(function(x){
            var n = x.el.firstChild.getBoundingClientRect();
            if (prev && n.top < prev.bottom + 2) x.el.style.top = (parseFloat(x.el.style.top) + prev.bottom + 2 - n.top) + "px";
            prev = x.el.firstChild.getBoundingClientRect();
          });
      });
      // Seta longa em cima/embaixo: a caixa ganha respiro para o número não ser cortado.
      // Medido a partir do componente (não da caixa), então o próprio padding não entra na conta e não há laço.
      var c2 = cmp.getBoundingClientRect(), up = 0, down = 0;
      marks.forEach(function(x){ if (x.el.hidden) return; var n = x.el.firstChild.getBoundingClientRect(); up = Math.max(up, c2.top - n.top); down = Math.max(down, n.bottom - c2.bottom); });
      var padT = Math.ceil(Math.max(0, up + 8 - 56)), padB = Math.ceil(Math.max(0, down + 8 - 72)); // 56 e 72 = padding da caixa (sizes-56 · sizes-72)
      if (padT !== (stage._padT || 0) || padB !== (stage._padB || 0)){
        stage._padT = padT; stage._padB = padB;
        stage.style.paddingTop = padT ? "calc(var(--common-sizes-56) + " + padT + "px)" : "";
        stage.style.paddingBottom = padB ? "calc(var(--common-sizes-72) + " + padB + "px)" : "";
        place();
      }
    }
    requestAnimationFrame(function(){ requestAnimationFrame(place); });
    if (window.ResizeObserver) new ResizeObserver(place).observe(stage, { box: "border-box" });
    wrap.appendChild(stage);
    var ol = wrap.appendChild(list("ol", b.legend));
    if (first > 1) ol.start = first;
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
      if (p.default != null){ var df = el("span", "pg-doc-prop__default", "Padrão "); df.appendChild(el("code", null, String(p.default))); head.appendChild(df); } // coluna Padrão do template Juntos
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
  /** Escolha única em Filter Chips do DS (Chips Group), para filtros de página. Retorna o grupo com setValue(v). */
  function choice(label, value, options, onChange){
    var g = document.createElement("cds-chips-group");
    [["kind", "filter"], ["role-kind", "multiple"], ["label", label]].forEach(function(a){ g.setAttribute(a[0], a[1]); });
    function mark(v){ [].forEach.call(g.querySelectorAll("cds-filter-chip"), function(c){ CDS.attr(c, "selected", c.dataset.v === String(v)); }); }
    options.forEach(function(o){
      var c = g.appendChild(document.createElement("cds-filter-chip"));
      c.setAttribute("label", o[1]); c.setAttribute("show-lead-icon", "false"); c.setAttribute("size", "small"); c.dataset.v = o[0];
      c.addEventListener("cds-change", function(e){ e.stopPropagation(); mark(o[0]); if (e.detail && e.detail.selected) onChange(o[0]); });
    });
    mark(value); g.setValue = mark;
    return g;
  }
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

  // Logos das stacks no [Caju] Icons (pasta brands)
  var STACK_ICON = { React: "react-line", Flutter: "flutter-fill", Figma: "figma-line" };
  CDS.stackIcon = STACK_ICON;

  // Estado vazio do playground (local/vazio): pilha cinza, título e texto. small = dentro de listas e filtros
  function vazio(heading, text, small){
    var e = el("loc-vazio", "pg-doc-vazio"); e.setAttribute("heading", heading || ""); if (text) e.setAttribute("text", text);
    if (small) e.setAttribute("size", "small");
    return e;
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
    // Níveis de ênfase (ex.: Hierarquia do Main Button no Figma): seta do mais alto ao mais baixo, título, Uso e Button, e os exemplos do DS
    levels: function(d, v){
      var box = display(null, "pg-doc-levels");
      box.appendChild(el("span", "pg-doc-levels__arrow")).setAttribute("aria-hidden", "true");
      var rows = box.appendChild(el("div", "pg-doc-levels__rows"));
      v.forEach(function(it){
        var row = rows.appendChild(el("div", "pg-doc-level"));
        var t = row.appendChild(el("div", "pg-doc-level__text"));
        t.appendChild(el("h3", "pg-doc-level__title", it.title));
        var p = t.appendChild(el("p", "pg-doc-level__desc"));
        [["Uso:", it.uso], ["Button:", it.button]].forEach(function(r, i){
          if (i) p.appendChild(document.createElement("br"));
          p.appendChild(el("b", null, r[0])); p.appendChild(document.createTextNode(" ")); rich(p, r[1]);
        });
        row.appendChild(el("div", "pg-doc-level__ex")).appendChild(examples(d, it.attrs));
      });
      return box;
    },
    // Do/Don't = composição <cmp-do-dont> (compositions/do-dont: o DS não tem esse bloco, C87)
    dodont: function(d, v){
      var g = el("div", "pg-doc-dodont");
      v.forEach(function(it){
        var card = el("cmp-do-dont");
        card.setAttribute("kind", it.kind);
        if (it.title) card.setAttribute("heading", it.title);
        if (it.attrs){ // sem attrs: Do/Don't só de texto (ex.: regras de motion, cujas imagens são animações)
          var ex = el("div", "pg-doc-dd__ex"), c = examples(d, it.attrs);
          if (it.style && c.setAttribute) c.setAttribute("style", it.style);
          ex.setAttribute("slot", "example"); ex.appendChild(c);
          card.appendChild(ex);
        }
        card.appendChild(rich(el("span"), it.text)); // Slot: texto e passos vão para a legenda
        if (it.steps) card.appendChild(list("ol", it.steps));
        g.appendChild(card);
      });
      return g;
    },
    specs: function(d, v){
      var g = el("div", "pg-doc-specs");
      v.forEach(function(c){
        var card = el("cds-card", "pg-doc-spec"); card.setAttribute("has-border", "true"); // Card do DS
        card.appendChild(el("h3", "pg-doc-h4", c.title));
        var host = el("cmp-definition-list"), dl = host.listEl; host.setAttribute("layout", "stacked"); // composição <cmp-definition-list>
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
        card.appendChild(host);
        g.appendChild(card);
      });
      return g;
    },
    visual: function(d, v){
      if (typeof v === "function") v = { render: v };
      if (v.bare) return v.render(); // bare: o recurso monta o próprio container (ex.: a aba Jogar do Castanha Quiz)
      var box = el("div", "pg-doc-visual"); box.appendChild(v.render());
      if (!v.text && !v.list) return box;
      var row = el("div", "pg-doc-lesson" + (v.side ? " is-side" : "")), t = el("div", "pg-doc-lesson__text");
      if (v.text) t.appendChild(rich(el("p", "pg-doc-p"), v.text));
      if (v.list) t.appendChild(list("ul", v.list));
      row.appendChild(box); row.appendChild(t);
      return row;
    },
    // Lição no estilo Duolingo = composição <cmp-lesson> (compositions/lesson). Dados entram antes de conectar
    lesson: function(d, v){
      var l = el("cmp-lesson"); ["label", "heading", "illustration"].forEach(function(k){ if (v[k]) l.setAttribute(k, v[k]); });
      if (v.storageKey) l.setAttribute("storage-key", v.storageKey);
      if (v.tips){ l.setAttribute("tips-href", v.tips.href); l.setAttribute("tips-label", v.tips.label || "Rever as dicas"); }
      l.exercises = v.exercises;
      return l;
    },
    // Quiz em cards = composição <cmp-quiz> (compositions/quiz: o DS não tem quiz). Dados entram antes de conectar
    quiz: function(d, v){
      var q = el("cmp-quiz"); q.setAttribute("label", v.label || "Quiz");
      if (v.kind) q.setAttribute("kind", v.kind);
      if (v.storageKey) q.setAttribute("storage-key", v.storageKey);
      q.questions = v.questions; q.results = v.results; q.right = v.right; q.wrong = v.wrong;
      q.pieces = v.pieces; q.pairs = v.pairs; q.prompt = v.prompt; q.why = v.why; // quebra-cabeças (kind order | pairs)
      return q;
    },
    // Atalhos (capa do Castanha Hub): Card do DS com ilustração da biblioteca + título + texto + Link do DS
    // Vídeo embutido (ex.: treinamentos gravados no Google Drive). O DS não tem componente de vídeo (C160):
    // o player é o do próprio serviço num iframe 16:9, com título acessível e um Link do DS para abrir fora.
    video: function(d, v){
      var box = el("figure", "pg-doc-video");
      if (v.heading) box.appendChild(el("h3", "pg-doc-h4", v.heading)); // título visível (grade de vídeos)
      var fr = el("iframe", "pg-doc-video__frame");
      fr.src = v.src; fr.title = v.title || "Vídeo"; fr.loading = "lazy";
      fr.setAttribute("allow", "autoplay; fullscreen"); fr.setAttribute("allowfullscreen", "");
      box.appendChild(fr);
      if (v.href || v.caption){
        var cap = box.appendChild(el("figcaption", "pg-doc-video__caption"));
        if (v.caption) cap.appendChild(rich(el("span", "pg-doc-p"), v.caption));
        if (v.href){ var l = el("cds-link"); l.setAttribute("label", v.cta || "Abrir em outra aba"); l.setAttribute("href", v.href); l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); l.setAttribute("appearance", "neutral"); cap.appendChild(l); }
      }
      return box;
    },
    // Release do changelog: Card do DS com data, Tag da área e da versão, título, itens e Link (opcional)
    release: function(d, v){
      // Tag de área com o logo da stack ([Caju] Icons › brands); demais áreas sem ícone
      var c = el("cds-card", "pg-doc-release"); c.setAttribute("has-border", "true");
      var head = c.appendChild(el("div", "pg-doc-release__head"));
      head.appendChild(el("span", "pg-doc-release__date", v.date));
      [[v.area, "neutral", STACK_ICON[v.area]], [v.version, "informative"]].forEach(function(t){
        if (!t[0]) return;
        var tag = el("cds-tag"); tag.setAttribute("label", t[0]); tag.setAttribute("appearance", t[1]);
        if (t[2]) tag.setAttribute("icon", t[2]); else tag.setAttribute("show-lead-item", "false");
        head.appendChild(tag);
      });
      c.appendChild(el("h3", "pg-doc-h4", v.title));
      if (v.items && v.items.length) c.appendChild(list("ul", v.items));
      if (v.href){ var l = el("cds-link", "pg-doc-release__link"); l.setAttribute("label", v.cta || "Abrir"); l.setAttribute("href", v.href); l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); l.setAttribute("appearance", "neutral"); c.appendChild(l); }
      return c;
    },
    // Persona: Card do DS com ilustração, nome, apelido (Tag), frase e dados. Objetivos · Dores · Necessidades · História
    // ficam em abas (Scrollable Tab do DS, contagem no Badge), uma por vez. Dores com "Recorrente:"/"Pontual:" viram Tag
    persona: function(d, v){
      var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var c = el("cds-card", "pg-doc-persona"); c.setAttribute("has-border", "true"); c.id = "persona-" + v.id;
      var top = c.appendChild(el("div", "pg-doc-persona__top"));
      var psrc = v.src || (v.illustration && ills[v.illustration]); // src: imagem fora do [Caju] Illustrations (ex.: Borô)
      if (psrc){ var im = el("img", "pg-doc-persona__img"); im.alt = ""; im.loading = "lazy"; im.src = psrc; top.appendChild(im); }
      else if (v.icon){ var si = el("cds-shaped-icon", "pg-doc-persona__icon"); si.setAttribute("icon", v.icon); si.setAttribute("size", "large"); si.setAttribute("appearance", "neutral"); top.appendChild(si); } // persona sem personagem (Operador): Shaped Icon da área
      var id = top.appendChild(el("div", "pg-doc-persona__id"));
      id.appendChild(el("h3", "pg-doc-h3", v.name));
      if (v.nick){ var tag = el("cds-tag"); tag.setAttribute("label", v.nick); tag.setAttribute("appearance", "neutral"); tag.setAttribute("show-lead-item", "false"); id.appendChild(tag); }
      if (v.quote) id.appendChild(el("p", "pg-doc-persona__quote", "“" + v.quote.replace(/^[“"]|[”"]$/g, "") + "”"));
      if (v.data && v.data.length){
        var dl = id.appendChild(el("dl", "pg-doc-persona__data"));
        v.data.forEach(function(p){ dl.appendChild(el("dt", null, p[0])); dl.appendChild(el("dd", null, p[1])); });
      }
      var panes = [];
      (v.cols || []).forEach(function(col){
        if (!col.items || !col.items.length) return;
        var ul = el("ul", "pg-doc-list pg-doc-persona__list");
        col.items.forEach(function(t){
          var li = ul.appendChild(el("li")), m = /^(Recorrentes?|Pontua(?:l|is)):\s*/.exec(t);
          if (m){
            var rec = /^Recorrente/.test(m[1]), tg = el("cds-tag");
            tg.setAttribute("label", rec ? "Recorrente" : "Pontual"); tg.setAttribute("appearance", rec ? "warning" : "neutral"); tg.setAttribute("show-lead-item", "false");
            li.className = "pg-doc-persona__tagged"; li.appendChild(tg); li.appendChild(rich(el("span"), t.slice(m[0].length)));
          } else rich(li, t);
        });
        panes.push({ label: col.title, n: col.items.length, node: ul });
      });
      if (v.story) panes.push({ label: "História", node: rich(el("p", "pg-doc-p"), v.story) });
      if (panes.length){
        var tabs = c.appendChild(el("cds-scrollable-tab", "pg-doc-persona__tabs")); tabs.setAttribute("label", v.name + ": detalhes");
        panes.forEach(function(p, i){
          var it = tabs.appendChild(el("cds-tab-item")); it.setAttribute("label", p.label); it.setAttribute("controls", c.id + "-" + i);
          if (p.n){ it.setAttribute("show-badge", "true"); it.setAttribute("badge-label", String(p.n)); }
          var pane = c.appendChild(el("div", "pg-doc-persona__pane")); pane.id = c.id + "-" + i; pane.setAttribute("role", "tabpanel"); pane.setAttribute("aria-label", p.label);
          pane.appendChild(p.node); pane.hidden = i > 0; p.el = pane;
        });
        tabs.addEventListener("cds-change", function(e){ panes.forEach(function(p, i){ p.el.hidden = i + 1 !== e.detail.index; }); });
      }
      c._txt = [v.name, v.nick, v.quote, v.story].concat((v.data || []).map(function(p){ return p.join(" "); }), (v.cols || []).reduce(function(a, col){ return a.concat(col.items || []); }, [])).join(" ").toLowerCase();
      return c;
    },
    // Busca (Search Input) e grupo (Filter Chips, escolha única) para as personas da tab. Lê os blocos seguintes:
    // cada h2 abre um grupo com o texto e os cards dele; a nota do fim fica fora. v = { label, placeholder }
    personaFilter: function(d, v){
      var wrap = el("div", "pg-doc-releases pg-doc-persona-filter");
      var bar = wrap.appendChild(el("div", "pg-doc-releases__bar"));
      var q = el("cds-search-input", "pg-doc-releases__search");
      [["label", v.label || "Buscar persona"], ["show-label", "false"], ["placeholder", v.placeholder || "Buscar nome, cargo ou dor"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ q.setAttribute(a[0], a[1]); });
      bar.appendChild(q);
      var count = wrap.appendChild(el("p", "pg-doc-note")); count.setAttribute("aria-live", "polite");
      var empty = el("div"); empty.appendChild(vazio("Nenhuma persona encontrada", "Tente outro termo ou escolha Todos.", true)); empty.hidden = true;
      var term = "", group = "", groups = [], total = 0;
      function run(){
        var n = 0;
        groups.forEach(function(g){
          var vis = 0, inGroup = !group || g.name === group;
          g.cards.forEach(function(c){ var ok = inGroup && (!term || c._txt.indexOf(term) !== -1); c.hidden = !ok; if (ok) vis++; });
          g.rest.forEach(function(e){ e.hidden = !vis; });
          n += vis;
        });
        count.textContent = n === total ? total + " personas" : n + " de " + total + " personas";
        empty.hidden = n > 0;
      }
      setTimeout(function(){ // os blocos seguintes já estão na página
        var cur = null;
        for (var e = wrap.nextElementSibling; e; e = e.nextElementSibling){
          if (e.matches(".pg-doc-alert, .pg-doc-source")) break;
          if (e.matches("h2")){ cur = { name: e.textContent, rest: [e], cards: [] }; groups.push(cur); continue; }
          if (!cur) continue;
          if (e.matches(".pg-doc-persona")){ cur.cards.push(e); total++; } else cur.rest.push(e);
        }
        if (groups.length > 1){
          var g = choice("Filtrar por grupo", "", [["", "Todos"]].concat(groups.map(function(x){ return [x.name, x.name]; })), function(val){ group = val; run(); });
          bar.appendChild(g);
        }
        wrap.parentNode.insertBefore(empty, wrap.nextSibling);
        run();
      }, 0);
      q.addEventListener("cds-change", function(e){ term = String(e.detail.value || "").trim().toLowerCase(); run(); });
      q.addEventListener("cds-clear", function(){ term = ""; run(); });
      return wrap;
    },
    // Lista de releases com busca (Search Input) e Filter Chips por área; agrupa por mês. v = { items, areas, months }
    releases: function(d, v){
      var wrap = el("div", "pg-doc-releases");
      var bar = wrap.appendChild(el("div", "pg-doc-releases__bar"));
      var q = el("cds-search-input", "pg-doc-releases__search");
      [["label", "Buscar no changelog"], ["show-label", "false"], ["placeholder", "Buscar componente, asset ou versão"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ q.setAttribute(a[0], a[1]); });
      bar.appendChild(q);
      var chips = bar.appendChild(el("div", "pg-doc-releases__chips"));
      chips.setAttribute("role", "group"); chips.setAttribute("aria-label", "Filtrar por área");
      var picked = {};
      v.areas.forEach(function(a){
        var c = el("cds-filter-chip"); c.setAttribute("label", a); c.setAttribute("size", "small");
        if (STACK_ICON[a]) c.setAttribute("icon", STACK_ICON[a]); else c.setAttribute("show-lead-icon", "false");
        c.addEventListener("cds-change", function(e){ if (e.detail.selected) picked[a] = 1; else delete picked[a]; run(); });
        chips.appendChild(c);
      });
      var count = wrap.appendChild(el("p", "pg-doc-note")); count.setAttribute("aria-live", "polite");
      var empty = wrap.appendChild(vazio("Nenhuma release encontrada", "Tente outro termo ou limpe os filtros.", true));
      var groups = [], cur = null;
      v.items.forEach(function(r){
        var key = v.months(r);
        if (!cur || cur.key !== key){ cur = { key: key, sec: wrap.appendChild(el("section", "pg-doc-releases__month")), cards: [] }; cur.sec.appendChild(el("h3", "pg-doc-h3", key)); groups.push(cur); }
        var card = BLOCKS.release(d, r);
        card._txt = [r.title, r.area, r.version || "", r.date].concat(r.items || []).join(" ").toLowerCase();
        card._area = r.area;
        cur.sec.appendChild(card); cur.cards.push(card);
      });
      var term = "";
      function run(){
        var n = 0, any = Object.keys(picked).length;
        groups.forEach(function(g){
          var vis = 0;
          g.cards.forEach(function(c){ var ok = (!any || picked[c._area]) && (!term || c._txt.indexOf(term) !== -1); c.hidden = !ok; if (ok) vis++; });
          g.sec.hidden = !vis; n += vis;
        });
        count.textContent = n === v.items.length ? n + " releases" : n + " de " + v.items.length + " releases";
        empty.hidden = n > 0;
      }
      q.addEventListener("cds-change", function(e){ term = String(e.detail.value || "").trim().toLowerCase(); run(); });
      q.addEventListener("cds-clear", function(){ term = ""; run(); });
      run();
      return wrap;
    },
    // Imagens com legenda (prints e painéis do Figma/Hub), em grade; { items: [{ src, alt, caption }] } ou uma lista
    figures: function(d, v){
      var items = Array.isArray(v) ? v : v.items, g = el("div", "pg-doc-figures" + (items.length === 1 ? " is-single" : ""));
      items.forEach(function(it){
        var f = g.appendChild(el("figure", "pg-doc-fig")), im = el("img", "pg-doc-fig__img");
        im.src = it.src; im.alt = it.alt || ""; im.loading = "lazy"; im.decoding = "async"; f.appendChild(im);
        if (it.caption) f.appendChild(rich(el("figcaption", "pg-doc-fig__cap"), it.caption));
      });
      return g;
    },
    // Grade de vídeos: cada item é um bloco video com heading (ex.: treinamentos em várias partes)
    videos: function(d, v){
      var g = el("div", "pg-doc-videos");
      v.forEach(function(it){ g.appendChild(BLOCKS.video(d, it)); });
      return g;
    },
    // Atalhos em Cards do DS. Lista simples → grade automática. { bento: 3|4, items } → grade bento:
    // size "hero" (2×2, ilustração grande), "wide" (2 colunas, ilustração ao lado) ou layout "row" (1 coluna, ilustração ao lado)
    shortcuts: function(d, v){
      var items = Array.isArray(v) ? v : v.items;
      var g = el("div", "pg-doc-shortcuts" + (v.bento ? " is-bento is-cols-" + v.bento : "")), ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      items.forEach(function(it){
        var c = el("cds-card", "pg-doc-shortcut" + (it.size ? " is-" + it.size : "") + (it.layout ? " is-" + it.layout : "")); c.setAttribute("has-border", "true");
        var ssrc = it.src || (it.illustration && ills[it.illustration]); // src: imagem fora do [Caju] Illustrations
        if (ssrc){ var im = el("img", "pg-doc-shortcut__img"); im.alt = ""; im.loading = "lazy"; im.src = ssrc; c.appendChild(im); }
        var b = c.appendChild(el("div", "pg-doc-shortcut__body"));
        b.appendChild(el("h3", "pg-doc-h4", it.title));
        if (it.text) b.appendChild(rich(el("p", "pg-doc-p"), it.text));
        if (it.href){ // sem href: card só informativo (ex.: categorias de ilustração)
          var l = el("cds-link", "pg-doc-shortcut__link"); l.setAttribute("label", it.cta || "Abrir"); l.setAttribute("href", it.href); l.setAttribute("appearance", "accent");
          if (it.external){ l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); }
          b.appendChild(l);
        }
        g.appendChild(c);
      });
      return g;
    },

    // Banner de divulgação (componente local <loc-banner>, das Notion thumbnails do Castanha Assets)
    banner: function(d, v){
      var b = el("loc-banner", "pg-doc-banner");
      ["area", "eyebrow", "heading", "text", "href", "cta"].forEach(function(k){ if (v[k] != null) b.setAttribute(k, v[k]); });
      if (v.external) b.setAttribute("external", "true");
      return b;
    },
    banners: function(d, v){
      var g = el("div", "pg-doc-banners");
      v.forEach(function(it){ g.appendChild(BLOCKS.banner(d, it)); });
      return g;
    },
    // Estado vazio (componente local <loc-vazio>): página não encontrada e afins. { heading, text, link: { label, href } }
    vazio: function(d, v){
      var e = vazio(v.heading, v.text, false);
      if (v.link){ var l = el("cds-link"); l.setAttribute("label", v.link.label); l.setAttribute("href", v.link.href); l.setAttribute("appearance", "accent"); e.appendChild(l); }
      return e;
    },
    // Capa da marca, do conceito do Castanha Assets (D221): título em Decorative, texto e a pilha (<loc-pilha>,
    // componente local) à direita; a pilha abre em leque no hover da capa. Sem area: Surface/accent (Início).
    hero: function(d, v){
      var s = el("section", "pg-doc-hero loc-pilha-trigger" + (v.area ? " is-light" : ""));
      if (v.area) s.dataset.locArea = v.area; // fundo e pilha leem a escala da área (local/pilha/pilha.css)
      var t = s.appendChild(el("div", "pg-doc-hero__text"));
      if (v.eyebrow) t.appendChild(el("p", "pg-doc-hero__eyebrow", v.eyebrow));
      t.appendChild(el(v.level || "h2", "pg-doc-hero__title", v.title));
      if (v.text) t.appendChild(rich(el("p", "pg-doc-hero__p"), v.text));
      var p = s.appendChild(el("loc-pilha", "pg-doc-hero__pilha"));
      if (v.area) p.setAttribute("align", "end"); else p.setAttribute("on", "accent");
      if (v.cards) p.setAttribute("cards", String(v.cards));
      return s;
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
      var empty = wrap.appendChild(vazio("Nenhum termo encontrado", "Não encontrou um termo ou quer sugerir uma correção? Fale com o time de Content no canal #content-suporte.", true));
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
    // FAQ (Atlassian, Polaris, Carbon): topo com ilustração da biblioteca e busca, temas em Content List Item do DS
    // (Kind Card, sem .Trailing Item: o clique filtra por um tema, de novo limpa), "Mais perguntadas" em Content List Item
    // (Kind Card, Intent Navigation: abre a pergunta, na ordem da frequência), perguntas em Accordion Item com divisória e
    // Card "Não achou?". Ordem por relevância (items = [pergunta, resposta, peso]; grupos pela soma dos pesos).
    // Movimento só com Motion Styles/tokens (entrada, hover, resultados ao filtrar); prefers-reduced-motion desliga.
    faq: function(d, v){
      var wrap = el("div", "pg-faq"), fold = function(s){ return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
      var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var w = function(q){ return q[2] || 1; };
      var groups = v.groups.map(function(g){ var items = g.items.slice().sort(function(a, b){ return w(b) - w(a); }); return { title: g.title, icon: g.icon || "information-line", app: g.appearance || "neutral", items: items, score: items.reduce(function(s, q){ return s + w(q); }, 0) }; })
        .sort(function(a, b){ return b.score - a.score; });
      var byTitle = {}; groups.forEach(function(g){ byTitle[g.title] = g; });
      var ghost = function(label, icon){ var b = document.createElement("cds-main-button"); [["label", label], ["kind", "ghost"], ["appearance", "neutral"], ["size", "small"], ["show-trailing-icon", "false"]].concat(icon ? [["lead-icon", icon]] : [["show-lead-icon", "false"]]).forEach(function(a){ b.setAttribute(a[0], a[1]); }); return b; };
      var img = function(name, cls){ var i = el("img", cls); i.alt = ""; i.src = ills[name] || ""; i.loading = "lazy"; return i; };
      // 1. Topo: título, busca e atalho, ilustração
      var hero = wrap.appendChild(el("section", "pg-faq__hero"));
      var ht = hero.appendChild(el("div", "pg-faq__hero-text"));
      ht.appendChild(el("h2", "pg-faq__hero-title", v.title || "Como podemos ajudar?"));
      if (v.intro) ht.appendChild(rich(el("p", "pg-doc-p"), v.intro));
      var search = ht.appendChild(document.createElement("cds-search-input"));
      search.className = "pg-faq__search";
      [["label", "Buscar pergunta"], ["show-label", "false"], ["placeholder", "Buscar: tema escuro, token, ícone, componente novo…"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ search.setAttribute(a[0], a[1]); });
      if (v.illustration) hero.appendChild(img(v.illustration, "pg-faq__hero-ill"));
      // 2. Temas: Content List Item do DS (Kind Card, Intent Default, sem .Trailing Item; 06/10: sem Checkbox).
      //    O clique filtra por aquele tema e clicar de novo limpa; o filtro ativo aparece na contagem e em "Limpar filtros".
      var cats = {}, topics = {};
      var tgrid = wrap.appendChild(el("div", "pg-faq__topics"));
      tgrid.setAttribute("role", "group"); tgrid.setAttribute("aria-label", "Filtrar por tema");
      groups.forEach(function(g){
        var c = document.createElement("cds-content-list-item");
        [["kind", "card"], ["label", g.title], ["description", g.items.length + (g.items.length === 1 ? " pergunta" : " perguntas")], ["lead-kind", "icon"], ["lead-icon", g.icon],
         ["show-trailing-item", "false"], ["show-divider", "false"]].forEach(function(a){ c.setAttribute(a[0], a[1]); });
        c.addEventListener("click", function(){ var on = !cats[g.title]; cats = {}; if (on) cats[g.title] = 1; paintTopics(); filter(); });
        topics[g.title] = tgrid.appendChild(c);
      });
      // 3. Mais perguntadas: as mais frequentes, na ordem, em Content List Item (Kind Card, Intent Navigation); sem número nem barra (06/10)
      var all = []; groups.forEach(function(g){ g.items.forEach(function(q){ all.push({ q: q, g: g }); }); });
      var top = all.slice().sort(function(a, b){ return w(b.q) - w(a.q); }).slice(0, v.top || 5);
      var topSec = wrap.appendChild(el("section", "pg-faq__top"));
      var th = topSec.appendChild(el("div", "pg-faq__sec-head"));
      th.appendChild(el("h2", "pg-doc-h2", "Mais perguntadas"));
      th.appendChild(el("span", "pg-faq__note", "pela frequência nos chamados de suporte"));
      var rank = topSec.appendChild(el("ol", "pg-faq__rank"));
      top.forEach(function(x, i){
        var li = rank.appendChild(el("li"));
        var c = document.createElement("cds-content-list-item");
        [["kind", "card"], ["intent", "navigation"], ["label", x.q[0]], ["description", x.g.title], ["lead-kind", "icon"], ["lead-icon", x.g.icon],
         ["show-tag", "false"], ["show-divider", "false"]].forEach(function(a){ c.setAttribute(a[0], a[1]); });
        c.addEventListener("click", function(){ open(x.q); });
        li.appendChild(c);
      });
      // 4. Barra de resultados: contagem, filtro ativo, limpar e expandir/recolher
      var bar = wrap.appendChild(el("div", "pg-faq__bar-row"));
      var count = bar.appendChild(el("p", "pg-faq__count")); count.setAttribute("aria-live", "polite");
      var actions = bar.appendChild(el("div", "pg-faq__actions"));
      var clear = actions.appendChild(ghost("Limpar filtros", "close-line"));
      clear.addEventListener("click", function(){ search.value = ""; setCat(null); });
      var expand = actions.appendChild(ghost("Expandir tudo", "dropdown-open-line")), expanded = false;
      expand.addEventListener("click", function(){ expanded = !expanded; rows.forEach(function(x){ if (!x.row.hidden) x.row.collapsed = !expanded; }); expand.setAttribute("label", expanded ? "Recolher tudo" : "Expandir tudo"); expand.setAttribute("lead-icon", expanded ? "dropdown-close-line" : "dropdown-open-line"); });
      // 5. Grupos com as perguntas
      var rows = [];
      var secs = groups.map(function(g){
        var sec = wrap.appendChild(el("section", "pg-faq__group pg-faq--" + g.app)), h = sec.appendChild(el("div", "pg-faq__group-head"));
        h.appendChild(el("h2", "pg-doc-h2", g.title));
        var n = h.appendChild(document.createElement("cds-tag")); n.setAttribute("appearance", "neutral"); n.setAttribute("show-lead-item", "false");
        var box = sec.appendChild(el("div", "pg-faq__list"));
        g.items.forEach(function(q){
          var acc = box.appendChild(document.createElement("cds-accordion-item"));
          [["label", q[0]], ["show-lead-item", "false"], ["show-description", "false"], ["heading-level", "3"]].forEach(function(a){ acc.setAttribute(a[0], a[1]); });
          acc.collapsed = true;
          var body = acc.appendChild(el("div", "pg-faq__a"));
          (Array.isArray(q[1]) ? q[1] : [q[1]]).forEach(function(t){ body.appendChild(Array.isArray(t) ? list("ul", t) : rich(el("p", "pg-doc-p"), t)); });
          rows.push({ q: q, row: acc, g: g.title, text: fold(q[0] + " " + JSON.stringify(q[1]) + " " + g.title) });
        });
        return { sec: sec, tag: n, title: g.title };
      });
      // 6. Vazio e "Não achou?"
      var empty = wrap.appendChild(el("div", "pg-faq__empty"));
      if (v.emptyIllustration) empty.appendChild(img(v.emptyIllustration, "pg-faq__empty-ill"));
      empty.appendChild(el("p", "pg-doc-p", v.empty || "Nenhuma pergunta encontrada."));
      var ctaBtn = null;
      if (v.cta){
        var cta = wrap.appendChild(el("cds-card", "pg-faq__cta")); cta.setAttribute("has-border", "true");
        if (v.cta.illustration) cta.appendChild(img(v.cta.illustration, "pg-faq__cta-ill"));
        var tx = cta.appendChild(el("div", "pg-faq__cta-text"));
        tx.appendChild(el("h2", "pg-faq__cta-title", v.cta.title));
        tx.appendChild(rich(el("p", "pg-doc-p"), v.cta.text));
        ctaBtn = cta.appendChild(document.createElement("cds-main-button"));
        [["label", v.cta.label], ["appearance", "accent"], ["show-lead-icon", "false"], ["trailing-icon", "link-line"]].forEach(function(a){ ctaBtn.setAttribute(a[0], a[1]); });
        ctaBtn.addEventListener("click", function(){ window.open(v.cta.href, "_blank", "noopener"); });
      }
      // Leitor de tela: o botão da linha diz se o tema está filtrando (aria-pressed)
      function paintTopics(){ Object.keys(topics).forEach(function(t){ var b = topics[t].querySelector(".cds-li"); if (b) b.setAttribute("aria-pressed", String(!!cats[t])); }); }
      function setCat(){ cats = {}; paintTopics(); filter(); } // limpa o tema
      function open(q){
        var r = rows.filter(function(x){ return x.q === q; })[0]; if (!r) return;
        search.value = ""; setCat(null);
        r.row.collapsed = false; r.row.scrollIntoView({ block: "center", behavior: "smooth" });
        r.row.classList.remove("is-flash"); void r.row.offsetWidth; r.row.classList.add("is-flash");
        var btn = r.row.querySelector("button"); if (btn) btn.focus({ preventScroll: true });
      }
      function filter(){
        var q = fold(search.value).trim(), n = 0, k = 0, picked = Object.keys(cats), any = picked.length > 0;
        rows.forEach(function(x){
          var ok = (!any || cats[x.g]) && (!q || x.text.indexOf(q) >= 0), was = !x.row.hidden;
          x.row.hidden = !ok; if (ok) n++;
          if (ok && (q || any)){ x.row.style.setProperty("--_i", String(Math.min(k++, 8))); x.row.classList.remove("is-in"); void x.row.offsetWidth; x.row.classList.add("is-in"); }
          else if (!was) x.row.classList.remove("is-in");
        });
        secs.forEach(function(s){ var c = rows.filter(function(x){ return x.g === s.title && !x.row.hidden; }).length; s.sec.hidden = !c; s.tag.setAttribute("label", String(c)); });
        var filtered = !!q || any;
        topSec.hidden = filtered; clear.hidden = !filtered;
        count.textContent = filtered ? n + " de " + rows.length + " perguntas" + (any ? " em " + picked.join(", ") : "") : rows.length + " perguntas, das mais frequentes para as menos";
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
      var wrap = el("div", "pg-doc-table-wrap"), t = el("table", "pg-doc-table" + (v.wrap ? " is-wrap" : "")); // wrap: texto corrido quebra linha (tabelas de conteúdo)
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
  CDS.docChoice = choice; CDS.docRich = rich; // texto com `código` para os blocos dos recursos (ex.: resources/arquitetura)
  CDS.docTable = function(head, rows, wrap){ return BLOCKS.table(null, { head: head, rows: rows, wrap: wrap }); }; // tabela das docs montada por recurso ou serviço (ex.: métricas do onboarding)

  /** Capa do componente (frame [Header] do Figma): o componente real (vivo) numa moldura, acima das tabs.
   *  Sem `doc.cover`, esvazia e esconde `root`. Fundo provisório = Accent/Solid/soft (o Surface/03 do Figma é legado, sem token: C91). */
  CDS.renderCover = function(doc, root, hero){
    root.innerHTML = "";
    // Recurso: a capa é o hero claro na cor da área (D223), igual em todas as tabs
    root.classList.toggle("is-hero", !!hero);
    if (hero){ root.hidden = false; root.classList.remove("is-image"); root.appendChild(BLOCKS.hero(doc || {}, hero)); return; }
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
    var frame = el("div", "pg-cover__frame" + (cv.tall ? " is-tall" : "") + (cv.wide ? " is-wide" : "")); // wide: componente mais largo que a moldura (ex.: Drawer, 640)
    (cv.examples || [cv.attrs]).forEach(function(a){ frame.appendChild(example(doc, a, true)); }); // exemplos vivos
    root.appendChild(frame);
    // Componente mais largo que a capa (ex.: Table, Date Picker no celular): reduz o exemplo até caber, em vez de cortar
    function fit(){
      var pad = parseFloat(getComputedStyle(frame).paddingLeft) || 0;
      var avail = (frame.classList.contains("is-tall") || frame.classList.contains("is-wide") ? frame.clientWidth : root.clientWidth - 24) - 2 * pad;
      [].forEach.call(frame.children, function(ch){
        ch.style.zoom = "";
        // componente com rolagem própria (Table, Scrollable Tab): o excesso do conteúdo ele mesmo rola; só a caixa conta
        var scrolls = [ch].concat([].slice.call(ch.querySelectorAll("*"))).some(function(e){ return /(auto|scroll)/.test(getComputedStyle(e).overflowX); });
        var w = scrolls ? ch.getBoundingClientRect().width : Math.max(ch.scrollWidth, ch.getBoundingClientRect().width);
        if (avail > 0 && w > avail + 1) ch.style.zoom = (avail / w).toFixed(3);
      });
    }
    requestAnimationFrame(function(){ requestAnimationFrame(fit); });
    setTimeout(fit, 300); // componentes que terminam de montar depois (ex.: calendários)
    if (window.ResizeObserver && !root._fitRO){ root._fitRO = new ResizeObserver(function(){ if (root._fit) root._fit(); }); root._fitRO.observe(root); }
    root._fit = fit;
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
    if (doc.source && !tab.noSource){ // noSource: tab que não vem da doc do Figma (ex.: Débitos, scripts/debitos.js)
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
