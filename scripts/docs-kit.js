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
 *   anatomy: { attrs, markers: [{ n, target, side: left|right|top|bottom, align: "start", long: true }], legend: [...] }
 *   props: [{ name, type, default, icon, nested: [{ name, type, values }] }]   default = valor padrão no Figma
 *   specimens: { title, min, items: [{ label, attrs }] }   min = largura mínima da coluna
 *   guides: [{ attrs, title, text }]
 *   dodont: [{ kind: "do"|"dont", attrs, title, text, steps, style }]   sem attrs: só texto · steps: lista numerada
 *   table: { head: [...], rows: [[...]], wrap }   wrap: células quebram linha
 *   video: { src, title, caption, href, cta }   player embutido 16:9 (iframe do serviço; o DS não tem componente de vídeo)
 *   shortcuts: [{ title, text, href, cta, illustration | src, external }]   atalhos em Cards (capa do Castanha Hub); sem href, card só informativo
 *   palette: { label, names: [...], steps: [...], hex: [[hex por passo] por cor], notes: { passo: "nota" } }   paleta fora dos tokens (ilustração)
 *   steps: [{ title, text, list, table, after }]   passos numerados
 *   code: "texto"                      bloco monoespaçado com botão Copiar
 *   glossary: { label, placeholder, letters: { A: [[termo, definição, "não use"], …] } }   glossário com busca
 *   simulate: { illustration, matrices: { id: "feColorMatrix" }, items: [{ label, matrix | filter, double }] }   condições visuais sobre uma ilustração
 *   specs: [{ title, rows: [[rótulo, valor], …] }]   cards de ficha técnica (ex.: Motion Style por interação)
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
      c.setAttribute("label", o[1]); c.setAttribute("show-lead-icon", "false"); c.dataset.v = o[0];
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
    // Persona: Card do DS com ilustração, nome, apelido (Tag), frase, dados, história e colunas Objetivos · Dores · Necessidades
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
      if (v.story) c.appendChild(rich(el("p", "pg-doc-p"), v.story));
      var cols = c.appendChild(el("div", "pg-doc-persona__cols"));
      (v.cols || []).forEach(function(col){
        if (!col.items || !col.items.length) return;
        var box = cols.appendChild(el("div", "pg-doc-persona__col"));
        box.appendChild(el("h4", "pg-doc-h4", col.title));
        box.appendChild(list("ul", col.items));
      });
      return c;
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
        var c = el("cds-filter-chip"); c.setAttribute("label", a);
        if (STACK_ICON[a]) c.setAttribute("icon", STACK_ICON[a]); else c.setAttribute("show-lead-icon", "false");
        c.addEventListener("cds-change", function(e){ if (e.detail.selected) picked[a] = 1; else delete picked[a]; run(); });
        chips.appendChild(c);
      });
      var count = wrap.appendChild(el("p", "pg-doc-note")); count.setAttribute("aria-live", "polite");
      var empty = wrap.appendChild(el("p", "pg-doc-p", "Nenhuma release encontrada. Tente outro termo ou limpe os filtros."));
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
    // FAQ (Atlassian, Polaris, Carbon): topo com ilustração da biblioteca e busca, cards de tema com Shaped Icon
    // do DS (filtram), ranking "Mais perguntadas" com barra de frequência, perguntas em Accordion Item com divisória e
    // Card "Não achou?". Ordem por relevância (items = [pergunta, resposta, peso]; grupos pela soma dos pesos).
    // Movimento só com Motion Styles/tokens (entrada, hover, resultados ao filtrar); prefers-reduced-motion desliga.
    faq: function(d, v){
      var wrap = el("div", "pg-faq"), fold = function(s){ return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
      var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var w = function(q){ return q[2] || 1; };
      var groups = v.groups.map(function(g){ var items = g.items.slice().sort(function(a, b){ return w(b) - w(a); }); return { title: g.title, icon: g.icon || "information-line", app: g.appearance || "neutral", items: items, score: items.reduce(function(s, q){ return s + w(q); }, 0) }; })
        .sort(function(a, b){ return b.score - a.score; });
      var byTitle = {}; groups.forEach(function(g){ byTitle[g.title] = g; });
      var shaped = function(icon, app, size){ var s = document.createElement("cds-shaped-icon"); s.setAttribute("icon", icon); s.setAttribute("appearance", app); s.setAttribute("size", size || "small"); return s; };
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
      // 2. Temas: cards com Shaped Icon (cor do tema) que filtram a lista; clicar de novo limpa
      var cat = null, topics = {};
      var tgrid = wrap.appendChild(el("div", "pg-faq__topics"));
      tgrid.setAttribute("role", "group"); tgrid.setAttribute("aria-label", "Filtrar por tema");
      groups.forEach(function(g, i){
        var c = document.createElement("cmp-clickable-card");
        c.className = "pg-faq__topic"; c.setAttribute("media", "auto"); c.setAttribute("label", g.items.length + (g.items.length === 1 ? " pergunta" : " perguntas")); c.setAttribute("current", "false");
        c.style.setProperty("--_i", String(i));
        c.appendChild(shaped(g.icon, g.app));
        c.appendChild(el("span", "pg-faq__topic-name", g.title));
        c.addEventListener("click", function(){ setCat(cat === g.title ? null : g.title); });
        topics[g.title] = tgrid.appendChild(c);
      });
      // 3. Mais perguntadas: ranking com barra relativa à mais frequente, na cor do tema
      var all = []; groups.forEach(function(g){ g.items.forEach(function(q){ all.push({ q: q, g: g }); }); });
      var top = all.slice().sort(function(a, b){ return w(b.q) - w(a.q); }).slice(0, v.top || 5), max = top.length ? w(top[0].q) : 1;
      var topSec = wrap.appendChild(el("section", "pg-faq__top"));
      var th = topSec.appendChild(el("div", "pg-faq__sec-head"));
      th.appendChild(el("h2", "pg-doc-h2", "Mais perguntadas"));
      th.appendChild(el("span", "pg-faq__note", "pela frequência nos chamados de suporte"));
      var rank = topSec.appendChild(el("ol", "pg-faq__rank"));
      top.forEach(function(x, i){
        var li = rank.appendChild(el("li"));
        var c = document.createElement("cmp-clickable-card");
        c.className = "pg-faq__rank-item pg-faq--" + x.g.app; c.setAttribute("media", "auto"); c.setAttribute("label", x.g.title);
        c.style.setProperty("--_i", String(i)); c.style.setProperty("--_w", String(Math.max(0.08, w(x.q) / max)));
        c.appendChild(el("span", "pg-faq__rank-n", String(i + 1)));
        var body = c.appendChild(el("span", "pg-faq__rank-body"));
        body.appendChild(el("span", "pg-faq__rank-q", x.q[0]));
        body.appendChild(el("span", "pg-faq__bar")).setAttribute("aria-hidden", "true");
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
        h.appendChild(shaped(g.icon, g.app, "smallest"));
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
      function setCat(x){ cat = x; Object.keys(topics).forEach(function(t){ topics[t].setAttribute("current", String(t === cat)); }); filter(); }
      function open(q){
        var r = rows.filter(function(x){ return x.q === q; })[0]; if (!r) return;
        search.value = ""; setCat(null);
        r.row.collapsed = false; r.row.scrollIntoView({ block: "center", behavior: "smooth" });
        r.row.classList.remove("is-flash"); void r.row.offsetWidth; r.row.classList.add("is-flash");
        var btn = r.row.querySelector("button"); if (btn) btn.focus({ preventScroll: true });
      }
      function filter(){
        var q = fold(search.value).trim(), n = 0, k = 0;
        rows.forEach(function(x){
          var ok = (!cat || x.g === cat) && (!q || x.text.indexOf(q) >= 0), was = !x.row.hidden;
          x.row.hidden = !ok; if (ok) n++;
          if (ok && (q || cat)){ x.row.style.setProperty("--_i", String(Math.min(k++, 8))); x.row.classList.remove("is-in"); void x.row.offsetWidth; x.row.classList.add("is-in"); }
          else if (!was) x.row.classList.remove("is-in");
        });
        secs.forEach(function(s){ var c = rows.filter(function(x){ return x.g === s.title && !x.row.hidden; }).length; s.sec.hidden = !c; s.tag.setAttribute("label", String(c)); });
        var filtered = !!q || !!cat;
        topSec.hidden = filtered; clear.hidden = !filtered;
        count.textContent = filtered ? n + " de " + rows.length + " perguntas" + (cat ? " em " + cat : "") : rows.length + " perguntas, das mais frequentes para as menos";
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
    var frame = el("div", "pg-cover__frame" + (cv.tall ? " is-tall" : "") + (cv.wide ? " is-wide" : "")); // wide: componente mais largo que a moldura (ex.: Drawer, 640)
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
