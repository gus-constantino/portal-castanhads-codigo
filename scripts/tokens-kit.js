/**
 * Mostruário de tokens do Caju Theme (bloco `tokens` da doc) — referência: [Caju] Theme · página Caju Benefícios (4309:2).
 * Lê os nomes direto do :root de styles/tokens.css e os valores ao vivo (getComputedStyle): no tema escuro mostra os valores dark
 * e nunca fica desatualizado em relação ao snapshot.
 *   { tokens: "colors" | "font" | "text-styles" | "radius" | "width" | "sizes" | "elevation" | "opacity" | "duration" | "delay" | "easing" | "motion-styles" }
 * Tudo com tokens: os exemplos usam var(--token) como valor; o layout vem de styles/docs.css (.pg-tok-*).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.docBlocks) return;

  function el(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  var cache = null;
  function names(){
    if (cache) return cache;
    var out = [];
    [].forEach.call(document.styleSheets, function(sh){
      var rules; try { rules = sh.cssRules; } catch (e) { return; }
      [].forEach.call(rules || [], function(r){
        if (r.selectorText !== ":root" || !r.style) return;
        for (var i = 0; i < r.style.length; i++){ var p = r.style[i]; if (p.indexOf("--") === 0 && out.indexOf(p) === -1) out.push(p); }
      });
    });
    return (cache = out);
  }
  function pick(prefix, exclude){ return names().filter(function(n){ return n.indexOf(prefix) === 0 && !(exclude && exclude.test(n)); }); }
  function val(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  // "--common-colors-accent-solid-soft" − prefixo → "solid/soft" (o "/" separa os níveis, como no Figma)
  function label(n, prefix){ return cap(n.slice(prefix.length).replace(/-(soft|semi-soft|medium|semi-intense|intense|light|semi-transparent|semi-opaque|pale|mild|default|inversed|accent|lighter|darker|system|accent-soft|accelerate|decelerate|smooth|overshoot|\d+)$/, "/$1").replace(/^-/, "")); }
  function cap(t){ return t.charAt(0).toUpperCase() + t.slice(1); }
  function code(text){ return el("code", "pg-tok__code", text); }
  function tip(node, n){ if (CDS.kit) CDS.kit.lazyTip(node, "var(" + n + ")", { label: n.replace(/^--/, ""), focus: false }); }

  // Item padrão: amostra + nome + valor (o valor é atualizado quando o tema muda)
  function item(n, prefix, paint, extraCls){
    var it = el("figure", "pg-tok" + (extraCls ? " " + extraCls : ""));
    var sw = it.appendChild(el("div", "pg-tok__sample"));
    paint(sw, n);
    var fc = it.appendChild(el("figcaption", "pg-tok__text"));
    fc.appendChild(el("span", "pg-tok__name", label(n, prefix)));
    var v = fc.appendChild(code(val(n)));
    v.dataset.token = n;
    tip(it, n);
    return it;
  }
  function grid(cls){ return el("div", "pg-tok-grid" + (cls ? " " + cls : "")); }
  function group(parent, title, list, prefix, paint, gridCls, itemCls){
    if (!list.length) return;
    var s = parent.appendChild(el("section", "pg-tok-group"));
    s.appendChild(el("h3", "pg-doc-h3", title + " · " + list.length));
    var g = s.appendChild(grid(gridCls));
    list.forEach(function(n){ g.appendChild(item(n, prefix, paint, itemCls)); });
  }
  function msOf(v){ var m = String(v).match(/([\d.]+)\s*(ms|s)/); return m ? parseFloat(m[1]) * (m[2] === "s" ? 1000 : 1) : 0; }

  var COLOR_GROUPS = [
    ["Accent", "--common-colors-accent-"], ["Neutral", "--common-colors-neutral-"], ["Surface", "--common-colors-surface-"],
    ["Text", "--common-colors-text-"], ["Icons", "--common-colors-icons-"], ["Border", "--common-colors-border-"],
    ["Feedback · Positive", "--common-colors-feedback-positive-"], ["Feedback · Warning", "--common-colors-feedback-warning-"],
    ["Feedback · Negative", "--common-colors-feedback-negative-"], ["Feedback · Informative", "--common-colors-feedback-informative-"],
    ["Support", "--common-colors-support-"], ["Decorative", "--common-colors-decorative-"]
  ];
  var swatch = function(sw, n){ sw.classList.add("pg-tok__swatch"); sw.style.background = "var(" + n + ")"; };

  var RENDER = {
    colors: function(root){
      COLOR_GROUPS.forEach(function(g){ group(root, g[0], pick(g[1]), g[1], swatch); });
      var charts = pick("--common-colors-charts-"), sets = {};
      charts.forEach(function(n){ var k = n.match(/charts-(\d+)/)[1]; (sets[k] = sets[k] || []).push(n); });
      Object.keys(sets).forEach(function(k){ group(root, "Charts · " + k, sets[k], "--common-colors-charts-" + k + "-", swatch); });
    },
    font: function(root){
      var spec = function(prop, text){ return function(sw, n){ sw.classList.add("pg-tok__type"); sw.textContent = text; sw.style[prop] = "var(" + n + ")"; }; };
      group(root, "Family", pick("--common-font-family-"), "--common-font-family-", spec("fontFamily", "Aa"), "is-wide");
      group(root, "Size", pick("--common-font-size-"), "--common-font-size-", spec("fontSize", "Aa"), "is-wide");
      group(root, "Line height", pick("--common-font-line-height-"), "--common-font-line-height-", function(sw, n){ sw.classList.add("pg-tok__type", "is-lines"); sw.textContent = "Ag Ag"; sw.style.lineHeight = "var(" + n + ")"; }, "is-wide");
      group(root, "Weight", pick("--common-font-weight-"), "--common-font-weight-", spec("fontWeight", "Aa"), "is-wide");
    },
    "text-styles": function(root){
      var list = pick("--text-style-", /-decoration$/), s = root.appendChild(el("div", "pg-tok-list"));
      list.forEach(function(n){
        var row = s.appendChild(el("figure", "pg-tok-style"));
        var sample = row.appendChild(el("span", "pg-tok-style__sample", "Castanha DS"));
        sample.style.font = "var(" + n + ")";
        var dec = names().indexOf(n + "-decoration") !== -1; if (dec) sample.style.textDecoration = "var(" + n + "-decoration)";
        var fc = row.appendChild(el("figcaption", "pg-tok__text"));
        fc.appendChild(el("span", "pg-tok__name", n.replace("--text-style-", "").replace(/-/, "/").split("/").map(cap).join("/")));
        var v = fc.appendChild(code(val(n))); v.dataset.token = n;
        tip(row, n);
      });
    },
    radius: function(root){ group(root, "Radius", pick("--common-border-radius-"), "--common-border-radius-", function(sw, n){ sw.classList.add("pg-tok__corner"); sw.style.borderTopLeftRadius = "var(" + n + ")"; }, "is-wide"); },
    width: function(root){ group(root, "Width", pick("--common-border-width-"), "--common-border-width-", function(sw, n){ sw.classList.add("pg-tok__stroke"); sw.style.borderWidth = "var(" + n + ")"; }, "is-wide"); },
    sizes: function(root){ group(root, "Sizes", pick("--common-sizes-"), "--common-sizes-", function(sw, n){ sw.classList.add("pg-tok__size"); var b = sw.appendChild(el("span")); b.style.width = b.style.height = "var(" + n + ")"; }, "is-sizes", "is-row"); },
    elevation: function(root){ group(root, "Elevations", pick("--common-elevation-level-"), "--common-elevation-", function(sw, n){ sw.classList.add("pg-tok__shadow"); sw.style.boxShadow = "var(" + n + ")"; }, "is-wide"); },
    opacity: function(root){ group(root, "Opacity", pick("--common-opacity-"), "--common-opacity-", function(sw, n){ sw.classList.add("pg-tok__swatch", "is-opacity"); sw.style.opacity = "var(" + n + ")"; }); },
    duration: function(root){ bars(root, "Duration", pick("--common-motion-duration-"), "--common-motion-duration-"); },
    delay: function(root){ bars(root, "Delay", pick("--common-motion-delay-"), "--common-motion-delay-"); },
    easing: function(root){
      group(root, "Cubic Bezier", pick("--common-motion-easing-"), "--common-motion-easing-", function(sw, n){
        sw.classList.add("pg-tok__curve");
        var m = val(n).match(/cubic-bezier\(([^)]+)\)/), p = m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1];
        var NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg"), path = document.createElementNS(NS, "path"), base = document.createElementNS(NS, "path");
        svg.setAttribute("viewBox", "-4 -24 108 128"); svg.setAttribute("aria-hidden", "true");
        base.setAttribute("d", "M0 100 L100 0"); base.setAttribute("class", "pg-tok__curve-base");
        path.setAttribute("d", "M0 100 C" + p[0] * 100 + " " + (100 - p[1] * 100) + " " + p[2] * 100 + " " + (100 - p[3] * 100) + " 100 0");
        svg.appendChild(base); svg.appendChild(path); sw.appendChild(svg);
      }, "is-wide");
    },
    // Motion Styles (.Motion Styles · /01): par Timing + Easing apontando para os primitivos
    "motion-styles": function(root){
      var list = pick("--motion-", /-easing$/).filter(function(n){ return /-01-timing$/.test(n); });
      var g = root.appendChild(grid("is-wide"));
      list.forEach(function(n){
        var base = n.replace(/-timing$/, ""), nm = base.replace("--motion-", "").replace(/-01$/, "").replace(/(^|-)([a-z])/g, function(_, s, c){ return (s ? " " : "") + c.toUpperCase(); }) + "/01";
        var card = g.appendChild(el("cds-card", "pg-tok-motion")); card.setAttribute("has-border", "true");
        card.appendChild(el("h4", "pg-doc-h4", nm));
        var dl = card.appendChild(el("dl", "pg-tok-motion__dl"));
        dl.appendChild(el("dt", null, "Timing")); dl.appendChild(el("dd")).appendChild(code(val(n))).dataset.token = n;
        dl.appendChild(el("dt", null, "Easing")); dl.appendChild(el("dd")).appendChild(code(val(base + "-easing"))).dataset.token = base + "-easing";
      });
    }
  };
  function bars(root, title, list, prefix){
    // escala até 1 s: o Extended (8 s) fica com a barra cheia, sem achatar as outras; o valor exato está ao lado
    var max = Math.max.apply(null, list.map(function(n){ return msOf(val(n)); }).filter(function(v){ return v <= 1000; }).concat([1]));
    var s = root.appendChild(el("section", "pg-tok-group"));
    s.appendChild(el("h3", "pg-doc-h3", title + " · " + list.length));
    var ul = s.appendChild(el("div", "pg-tok-bars"));
    list.forEach(function(n){
      var row = ul.appendChild(el("figure", "pg-tok-bar"));
      row.appendChild(el("span", "pg-tok__name", label(n, prefix).replace(/-(\d+)$/, "/$1")));
      // Progress Line do DS (decorativa: o valor está ao lado)
      var pl = row.appendChild(document.createElement("cds-progress-line"));
      pl.setAttribute("percent", String(Math.min(100, Math.round(msOf(val(n)) / max * 1000) / 10))); pl.setAttribute("aria-hidden", "true");
      var v = row.appendChild(code(val(n))); v.dataset.token = n;
      tip(row, n);
    });
  }

  CDS.docBlocks.tokens = function(doc, kind){
    var root = el("div", "pg-tok-root");
    (RENDER[kind] || function(){})(root);
    return root;
  };
  // Troca de tema: atualiza os valores exibidos (as amostras já seguem o var())
  new MutationObserver(function(){
    [].forEach.call(document.querySelectorAll(".pg-tok-root code[data-token]"), function(c){ c.textContent = val(c.dataset.token); });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
