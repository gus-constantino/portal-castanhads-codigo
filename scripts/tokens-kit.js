/**
 * Mostruário de tokens do Caju Theme (bloco `tokens` da doc) — referência: [Caju] Theme · página Caju Benefícios (4309:2).
 * Lê os nomes direto do :root de styles/tokens.css e os valores ao vivo (getComputedStyle): no tema escuro mostra os valores dark
 * e nunca fica desatualizado em relação ao snapshot.
 *   { tokens: "colors" | "font" | "text-styles" | "radius" | "width" | "sizes" | "elevation" | "opacity" | "duration" | "delay" | "easing" | "motion-live" | "easing-lab" }
 * Interação: cada amostra é um tile clicável (C87) que copia `var(--token)` e confirma com o Toast do DS; as amostras de motion
 * tocam a animação no hover/foco/clique, e "Tocar todas" (Main Button do DS) toca a lista. Com prefers-reduced-motion nada anima.
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
  // valor especificado no :root (mantém o var(): mostra para qual token da camada de baixo ele aponta)
  function spec(n){
    var out = "";
    [].forEach.call(document.styleSheets, function(sh){ var rules; try { rules = sh.cssRules; } catch (e) { return; }
      [].forEach.call(rules || [], function(r){ if (!out && r.selectorText === ":root" && r.style) out = r.style.getPropertyValue(n).trim(); }); });
    return out;
  }
  // "--common-motion-duration-short-03" → "Common/Motion/Duration/Short/03"
  function figmaName(v){ return v.replace(/^--/, "").replace(/^common-motion-(duration|delay|easing)-/, function(_, k){ return "Common/Motion/" + cap(k) + "/"; })
    .replace(/(extra-long|short|medium|long|extended|systemic|expressive)-/, function(m, k){ return k.split("-").map(cap).join(" ") + "/"; }); }
  function pick(prefix, exclude){ return names().filter(function(n){ return n.indexOf(prefix) === 0 && !(exclude && exclude.test(n)); }); }
  function val(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function cap(t){ return t.charAt(0).toUpperCase() + t.slice(1); }
  // "--common-colors-accent-solid-soft" − prefixo → "Solid/soft" (o "/" separa os níveis, como no Figma)
  function label(n, prefix){ return cap(n.slice(prefix.length).replace(/-(soft|semi-soft|medium|semi-intense|intense|light|semi-transparent|semi-opaque|pale|mild|default|inversed|accent|lighter|darker|system|accent-soft|accelerate|decelerate|smooth|overshoot|\d+)$/, "/$1").replace(/^-/, "")); }
  function code(text, token){ var c = el("code", "pg-tok__code", text); if (token) c.dataset.token = token; return c; }
  var SAMPLE = { text: "Castanha DS" }; // texto de exemplo compartilhado pelas amostras de tipografia
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var order = 0; // entrada em sequência (limitada no CSS)

  // Tile clicável (C87): copia var(--token) e confirma com o Toast do DS; Tooltip do DS com o nome da variável
  function tile(cls, n, onPlay){
    var b = el("button", "pg-tok-tile " + cls); b.type = "button";
    b.setAttribute("aria-label", "Copiar var(" + n + ")");
    b.style.setProperty("--_i", String(Math.min(order++, 24)));
    if (CDS.kit) CDS.kit.lazyTip(b, "Clique para copiar", { label: "var(" + n + ")" });
    b.addEventListener("click", function(){
      try { navigator.clipboard.writeText("var(" + n + ")"); } catch (e) {}
      if (CDS.docToast) CDS.docToast("Copiado: var(" + n + ")");
      if (onPlay) onPlay();
    });
    if (onPlay){ b.addEventListener("mouseenter", onPlay); b.addEventListener("focus", onPlay); }
    return b;
  }
  // Item padrão: amostra + nome + valor (o valor é atualizado quando o tema muda)
  function item(n, prefix, paint, extraCls){
    var play = null, it = tile("pg-tok" + (extraCls ? " " + extraCls : ""), n, function(){ if (play) play(); });
    var sw = it.appendChild(el("span", "pg-tok__sample"));
    play = paint(sw, n) || null;
    var fc = it.appendChild(el("span", "pg-tok__text"));
    fc.appendChild(el("span", "pg-tok__name", label(n, prefix)));
    fc.appendChild(code(val(n), n));
    return it;
  }
  function grid(cls){ return el("div", "pg-tok-grid" + (cls ? " " + cls : "")); }
  function section(parent, title, count, action){
    var s = parent.appendChild(el("section", "pg-tok-group"));
    var h = s.appendChild(el("div", "pg-tok-group__head"));
    h.appendChild(el("h3", "pg-doc-h3", title));
    if (count != null) h.appendChild(el("span", "pg-tok-group__count", String(count)));
    if (action) h.appendChild(action);
    return s;
  }
  function group(parent, title, list, prefix, paint, gridCls, itemCls){
    if (!list.length) return;
    var g = section(parent, title, list.length).appendChild(grid(gridCls));
    list.forEach(function(n){ g.appendChild(item(n, prefix, paint, itemCls)); });
  }
  function msOf(v){ var m = String(v).match(/([\d.]+)\s*(ms|s)/); return m ? parseFloat(m[1]) * (m[2] === "s" ? 1000 : 1) : 0; }
  // Reinicia uma transição: volta ao estado inicial sem animar, força o reflow e liga a classe que anima
  // reset sem transição (is-reset) → reflow → anima até o estado final (is-on)
  function replay(node){ if (reduced) return; node.classList.add("is-reset"); node.classList.remove("is-on"); void node.offsetWidth; node.classList.remove("is-reset"); node.classList.add("is-on"); }
  function playAll(button, root, sel){
    button.addEventListener("click", function(){ [].forEach.call(root.querySelectorAll(sel), function(x){ if (x._play) x._play(); }); });
  }

  // Do explicador castanhads-motion (gus-constantino): quando cada Motion Style dispara e o nome primitivo de cada easing
  var TRIGGER = { "hover-in": "mouse enter", "hover-out": "mouse leave", "pressed": "mousedown", "released": "mouseup",
    "selected-in": "ativa · Is Active → true", "selected-out": "desativa · Is Active → false", "disabled": "entra em disabled" };
  var PRIMITIVE = { "systemic-default": "ease-in-out/01", "systemic-accelerate": "ease-in/01", "systemic-decelerate": "ease-in-out/02", "systemic-smooth": "ease-in-out/03",
    "expressive-default": "ease-out/02", "expressive-decelerate": "ease-out/01", "expressive-accelerate": "ease-in/02", "expressive-overshoot": "ease-out/overshoot/01" };
  // Famílias com tons sólidos e de opacidade aparecem separadas em subgrupos (como no Figma: Solid/… e Opacity/…)
  var COLOR_FAMILIES = [
    ["Accent", [["Solid", "--common-colors-accent-solid-"], ["Opacity", "--common-colors-accent-opacity-"]]],
    ["Neutral", [["Solid", "--common-colors-neutral-solid-"], ["Opacity · Soft", "--common-colors-neutral-opacity-soft-"], ["Opacity · Intense", "--common-colors-neutral-opacity-intense-"]]]
  ];
  // ordem de escala do Figma (do mais claro ao mais intenso)
  var STEPS = ["pale", "soft", "semi-soft", "mild", "medium", "semi-intense", "intense"], ALPHA = ["semi-transparent", "light", "medium", "intense", "semi-opaque"];
  function stepOf(n){ var o = /opacity/.test(n) ? ALPHA : STEPS, m = n.match(/-(pale|semi-soft|soft|mild|medium|semi-intense|intense|semi-transparent|light|semi-opaque)$/); return m ? o.indexOf(m[1]) : 99; }
  // tinta legível sobre a cor: Support/darker ou Support/lighter (constantes nos dois temas), pela luminância do valor atual
  function ink(chip, n){
    var v = val(n), m = v.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i), dark = true;
    if (m){ var c = [0, 2, 4].map(function(i){ var x = parseInt(m[1].substr(i, 2), 16) / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
      var lum = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2], a = m[2] ? parseInt(m[2], 16) / 255 : 1;
      dark = a < 0.5 || lum > 0.4; }
    chip.classList.toggle("is-ink-light", !dark); chip.classList.toggle("is-ink-dark", dark);
  }
  // Faixa contínua de uma escala: cada tom é um tile (copia o token) com nome e valor dentro da cor
  function ramp(parent, title, prefix, keepOrder){
    var list = pick(prefix); if (!list.length) return;
    if (!keepOrder) list = list.slice().sort(function(a, b){ return stepOf(a) - stepOf(b); });
    var row = parent.appendChild(el("div", "pg-tok-ramp-row" + (title ? "" : " is-solo")));
    if (title) row.appendChild(el("span", "pg-tok-ramp__label", title));
    var bar = row.appendChild(el("div", "pg-tok-ramp"));
    list.forEach(function(n){
      var chip = bar.appendChild(tile("pg-tok-chip", n));
      // opacidade: o tom sobre o xadrez de transparência (Surface/default × Surface/01), como no Radix e no Figma
      if (/opacity/.test(prefix)){ chip.classList.add("is-alpha"); chip.style.setProperty("--_tone", "var(" + n + ")"); }
      else chip.style.background = "var(" + n + ")";
      chip.dataset.ink = n; ink(chip, n);
      chip.appendChild(el("span", "pg-tok-chip__name", label(n, prefix)));
      chip.appendChild(el("span", "pg-tok-chip__hex", val(n))).dataset.token = n;
    });
  }
  function rampSection(root, title, rows, keepOrder){
    var total = rows.reduce(function(t, r){ return t + pick(r[1]).length; }, 0); if (!total) return;
    var sec = section(root, title, total), box = sec.appendChild(el("div", "pg-tok-ramps"));
    rows.forEach(function(r){ ramp(box, r[0], r[1], keepOrder); });
  }
  // Tokens semânticos mostrados em uso (texto, ícone, contorno) sobre Surface/default
  function preview(root, title, prefix, paint){
    var list = pick(prefix); if (!list.length) return;
    var g = section(root, title, list.length).appendChild(grid("is-preview"));
    list.forEach(function(n){ g.appendChild(item(n, prefix, function(sw){ sw.classList.add("pg-tok-prev"); paint(sw, n); })); });
  }
  var swatch = function(sw, n){ sw.classList.add("pg-tok__swatch"); sw.style.background = "var(" + n + ")"; };
  var alpha = function(sw, n){ sw.classList.add("pg-tok__swatch", "is-alpha"); sw.style.setProperty("--_tone", "var(" + n + ")"); };
  // Opacity (como no Figma 4438:32): metade imagem, metade Accent sólido; um quadrado Support/darker atravessa o meio na opacidade do token
  var opacityView = function(sw, n){
    sw.classList.add("pg-tok__op");
    var img = sw.appendChild(document.createElement("cds-image")); img.className = "pg-tok__op-img"; img.setAttribute("src", "assets/brand/sample-photo.svg"); img.setAttribute("alt", "");
    sw.appendChild(el("span", "pg-tok__op-solid"));
    var layer = sw.appendChild(el("span", "pg-tok__op-layer")); layer.style.opacity = "var(" + n + ")";
  };

  var RENDER = {
    // Cores (referências: rampas contínuas do Tailwind/Radix, texto dentro da cor do Material/Wise, tokens semânticos
    // mostrados em uso como no Primer/Polaris): escalas viram faixas que se expandem no hover; Text/Icons/Border viram prévias
    colors: function(root){
      COLOR_FAMILIES.forEach(function(f){ rampSection(root, f[0], f[1]); });
      rampSection(root, "Feedback", [["Positive", "--common-colors-feedback-positive-"], ["Warning", "--common-colors-feedback-warning-"], ["Negative", "--common-colors-feedback-negative-"], ["Informative", "--common-colors-feedback-informative-"]]);
      rampSection(root, "Surface", [["", "--common-colors-surface-"]], true);
      preview(root, "Text", "--common-colors-text-", function(sw, n){ var t = sw.appendChild(el("span", "pg-tok-prev__text", "Aa")); t.style.color = "var(" + n + ")"; if (/inversed/.test(n)) sw.classList.add("is-inversed"); });
      preview(root, "Icons", "--common-colors-icons-", function(sw, n){ var ic = sw.appendChild(document.createElement("cds-icon")); ic.setAttribute("icon", "notification-line"); ic.setAttribute("size", "large"); ic.setAttribute("aria-hidden", "true"); ic.style.setProperty("--cds-icon-color", "var(" + n + ")"); if (/inversed/.test(n)) sw.classList.add("is-inversed"); });
      preview(root, "Border", "--common-colors-border-", function(sw, n){ var b = sw.appendChild(el("span", "pg-tok-prev__border")); b.style.borderColor = "var(" + n + ")"; });
      rampSection(root, "Support e Decorative", [["Support", "--common-colors-support-"], ["Decorative", "--common-colors-decorative-"]], true);
      var charts = pick("--common-colors-charts-"), sets = {};
      charts.forEach(function(n){ var k = n.match(/charts-(\d+)/)[1]; (sets[k] = sets[k] || []).push(n); });
      rampSection(root, "Charts", Object.keys(sets).map(function(k){ return ["Charts " + k, "--common-colors-charts-" + k + "-"]; }));
    },
    // Tipografia (referências: Google Fonts — texto editável e pesos lado a lado; Tailwind/Material — escala em linhas;
    // HIG/Carbon — estilos por categoria): o Text Input do DS troca o texto de todas as amostras da página
    font: function(root){
      var bar = root.appendChild(el("div", "pg-ty-bar"));
      var inp = bar.appendChild(document.createElement("cds-text-input"));
      [["label", "Texto de exemplo"], ["value", SAMPLE.text], ["placeholder", "Digite para testar"], ["show-required", "false"], ["show-lead-icon", "false"],
       ["show-supporting-content", "false"], ["show-character-counter", "false"]].forEach(function(a){ inp.setAttribute(a[0], a[1]); });
      inp.addEventListener("cds-change", function(e){ e.stopPropagation(); SAMPLE.text = String(inp.value || "") || "Castanha DS";
        [].forEach.call(document.querySelectorAll(".pg-tok-root [data-sample]"), function(x){ x.textContent = SAMPLE.text; }); });
      // Família: "Aa" grande + alfabeto
      var fam = pick("--common-font-family-"), g1 = section(root, "Family", fam.length).appendChild(grid("is-family"));
      fam.forEach(function(n){
        var t = g1.appendChild(tile("pg-ty-family", n)); t.style.fontFamily = "var(" + n + ")";
        t.appendChild(el("span", "pg-ty-family__aa", "Aa"));
        t.appendChild(el("span", "pg-ty-family__abc", "ABCDEFGHIJKLM abcdefghijklm 0123456789"));
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-font-family-"))); cap.appendChild(code(val(n), n));
      });
      // Peso: os pesos lado a lado na mesma faixa
      var w = pick("--common-font-weight-"), strip = section(root, "Weight", w.length).appendChild(el("div", "pg-ty-weights"));
      w.forEach(function(n){
        var t = strip.appendChild(tile("pg-ty-weight", n));
        var aa = t.appendChild(el("span", "pg-ty-weight__aa", "Aa")); aa.style.fontWeight = "var(" + n + ")";
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-font-weight-"))); cap.appendChild(code(val(n), n));
      });
      // Tamanho: escala em linhas (rótulo à esquerda, amostra com o texto de exemplo)
      var sz = pick("--common-font-size-"), list = section(root, "Size", sz.length).appendChild(el("div", "pg-ty-scale"));
      sz.forEach(function(n){
        var row = list.appendChild(tile("pg-ty-row", n));
        var meta = row.appendChild(el("span", "pg-ty-row__meta")); meta.appendChild(el("span", "pg-tok__name", label(n, "--common-font-size-"))); meta.appendChild(code(val(n), n));
        var sp = row.appendChild(el("span", "pg-ty-row__sample", SAMPLE.text)); sp.dataset.sample = ""; sp.style.fontSize = "var(" + n + ")";
      });
      // Altura de linha: parágrafo com as linhas-guia desenhadas
      var lh = pick("--common-font-line-height-"), g2 = section(root, "Line height", lh.length).appendChild(grid("is-wide"));
      lh.forEach(function(n){
        var t = g2.appendChild(tile("pg-ty-lh", n));
        var para = t.appendChild(el("span", "pg-ty-lh__para", "Seus benefícios num só cartão: alimentação, mobilidade, saúde e cultura, com saldo flexível para usar onde fizer sentido.")); para.style.setProperty("--_lh", "var(" + n + ")");
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-font-line-height-"))); cap.appendChild(code(val(n), n));
      });
    },
    // Text styles por categoria: meta (peso · tamanho · altura) + amostra com o texto de exemplo
    "text-styles": function(root){
      var list = pick("--text-style-", /-decoration$/), cats = {}, order = [];
      list.forEach(function(n){ var c = n.replace("--text-style-", "").split("-")[0]; if (!cats[c]){ cats[c] = []; order.push(c); } cats[c].push(n); });
      order.forEach(function(c){
        var sec = section(root, cap(c), cats[c].length), box = sec.appendChild(el("div", "pg-ty-scale"));
        cats[c].forEach(function(n){
          var v = val(n), m = v.match(/^(\d+)\s+([\d.]+px)\/([\d.]+)\s+"?([^",]+)/);
          var row = box.appendChild(tile("pg-ty-row is-style", n));
          var meta = row.appendChild(el("span", "pg-ty-row__meta"));
          meta.appendChild(el("span", "pg-tok__name", n.replace("--text-style-" + c + "-", "").split("-").map(cap).join(" ")));
          meta.appendChild(el("span", "pg-ty-row__spec", m ? m[1] + " · " + m[2] + " · " + m[3] + " · " + m[4] : v));
          var sp = row.appendChild(el("span", "pg-ty-row__sample", SAMPLE.text)); sp.dataset.sample = ""; sp.style.font = "var(" + n + ")";
          if (names().indexOf(n + "-decoration") !== -1) sp.style.textDecoration = "var(" + n + "-decoration)";
        });
      });
    },
    // Bordas (referências: Radix/Material shape scale, Tailwind border-width): formas inteiras + laboratório com o Slider do DS
    radius: function(root){
      var list = pick("--common-border-radius-"), cur = Math.max(0, list.indexOf("--common-border-radius-large"));
      var s = section(root, "Radius", list.length), lab = s.appendChild(el("div", "pg-bd-lab"));
      var ctl = lab.appendChild(el("div", "pg-ctrl pg-bd-lab__ctl")); ctl.appendChild(el("span", "pg-lbl", "Raio"));
      var sl = ctl.appendChild(document.createElement("cds-slider"));
      [["label", "Raio"], ["min", "0"], ["max", String(list.length - 1)], ["step", "1"], ["value", String(cur)], ["show-value-indicator", "false"], ["show-stops", "false"], ["value-text", ""]].forEach(function(a){ sl.setAttribute(a[0], a[1]); });
      var read = ctl.appendChild(el("p", "pg-bd-lab__read"));
      var shape = lab.appendChild(el("div", "pg-bd-lab__shape")); shape.appendChild(el("span", "pg-bd-lab__shape-label"));
      function show(i){ cur = i; var n = list[i]; shape.style.borderRadius = "var(" + n + ")"; shape.firstChild.textContent = label(n, "--common-border-radius-");
        read.textContent = "var(" + n + ") · " + val(n); CDS.attr(sl, "value", String(i)); [].forEach.call(g.children, function(t, k){ t.classList.toggle("is-current", k === i); }); }
      sl.addEventListener("cds-change", function(e){ e.stopPropagation(); show(Math.round(e.detail.value)); });
      sl.addEventListener("input", function(){ var v = parseInt(sl.getAttribute("value"), 10); if (!isNaN(v)) show(v); });
      var g = s.appendChild(grid("is-shapes"));
      list.forEach(function(n, i){
        var t = g.appendChild(tile("pg-bd-tile", n, null));
        t.addEventListener("click", function(){ show(i); });
        var sh = t.appendChild(el("span", "pg-bd-shape")); sh.style.borderRadius = "var(" + n + ")";
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-border-radius-"))); cap.appendChild(code(val(n), n));
      });
      show(cur);
    },
    width: function(root){
      var list = pick("--common-border-width-"), g = section(root, "Width", list.length).appendChild(grid("is-shapes"));
      list.forEach(function(n){
        var t = g.appendChild(tile("pg-bd-tile", n));
        var sh = t.appendChild(el("span", "pg-bd-shape is-stroke")); sh.style.borderWidth = "var(" + n + ")";
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-border-width-"))); cap.appendChild(code(val(n), n));
      });
    },
    // Tamanhos (Tailwind spacing / Atlassian space): escala em linhas; Filter Chips do DS trocam a visualização
    sizes: function(root){
      var list = pick("--common-sizes-"), s = section(root, "Sizes", list.length);
      var box = el("div", "pg-sz is-width");
      if (CDS.kit) CDS.kit.seg(s, { label: "Ver como", value: "width", options: [["width", "Largura"], ["gap", "Gap"], ["padding", "Padding"]],
        onChange: function(v){ box.className = "pg-sz is-" + v; } });
      s.appendChild(box);
      list.forEach(function(n){
        var row = box.appendChild(tile("pg-sz-row", n)), v = "var(" + n + ")";
        var meta = row.appendChild(el("span", "pg-ty-row__meta")); meta.appendChild(el("span", "pg-tok__name", label(n, "--common-sizes-"))); meta.appendChild(code(val(n), n));
        var vis = row.appendChild(el("span", "pg-sz-vis"));
        vis.appendChild(el("span", "pg-sz-bar")).style.width = v;
        var gap = vis.appendChild(el("span", "pg-sz-gap")); gap.style.gap = v; gap.appendChild(el("span")); gap.appendChild(el("span"));
        var pad = vis.appendChild(el("span", "pg-sz-pad")); pad.style.padding = v; pad.appendChild(el("span"));
      });
    },
    elevation: function(root){ group(root, "Elevations", pick("--common-elevation-level-"), "--common-elevation-", function(sw, n){ sw.classList.add("pg-tok__shadow"); sw.style.boxShadow = "var(" + n + ")"; }, "is-wide"); },
    opacity: function(root){ group(root, "Opacity", pick("--common-opacity-"), "--common-opacity-", opacityView, "is-wide", "is-row"); },
    duration: function(root){ runs(root, "Duration", pick("--common-motion-duration-"), "--common-motion-duration-", "duration"); },
    delay: function(root){ runs(root, "Delay", pick("--common-motion-delay-"), "--common-motion-delay-", "delay"); },
    // Curva desenhada + bolinha que percorre a trilha com aquela curva (Long/04)
    easing: function(root){
      var list = pick("--common-motion-easing-"), btn = CDS.docMainButton ? CDS.docMainButton("Tocar todas") : null;
      var g = section(root, "Cubic Bezier", list.length, btn).appendChild(grid("is-wide"));
      list.forEach(function(n){
        g.appendChild(item(n, "--common-motion-easing-", function(sw){
          sw.classList.add("pg-tok__curve");
          var m = val(n).match(/cubic-bezier\(([^)]+)\)/), p = m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1];
          var NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg"), path = document.createElementNS(NS, "path"), base = document.createElementNS(NS, "path");
          svg.setAttribute("viewBox", "-4 -24 108 128"); svg.setAttribute("aria-hidden", "true");
          base.setAttribute("d", "M0 100 L100 0"); base.setAttribute("class", "pg-tok__curve-base");
          path.setAttribute("d", "M0 100 C" + p[0] * 100 + " " + (100 - p[1] * 100) + " " + p[2] * 100 + " " + (100 - p[3] * 100) + " 100 0");
          svg.appendChild(base); svg.appendChild(path); sw.appendChild(svg);
          var track = sw.appendChild(el("span", "pg-tok-ease")), dot = track.appendChild(el("span", "pg-tok-ease__dot"));
          dot.style.transitionTimingFunction = "var(" + n + ")";
          var play = function(){ replay(track); };
          sw._play = play; return play;
        }, "is-motion"));
      });
      if (btn) playAll(btn, g, ".pg-tok__curve");
    },
    // Motion Styles em ação (aproveita o explicador castanhads-motion, refeito com componentes do DS):
    // Main Button e Checkbox reais disparam o estilo; a lista destaca e toca a demo; a cascata mostra o estilo descendo as camadas
    "motion-live": function(root){
      var keys = pick("--motion-", /-easing$/).filter(function(n){ return /-01-timing$/.test(n); }).map(function(n){ return n.replace(/^--motion-|-01-timing$/g, ""); });
      var title = function(k){ return k.split("-").map(cap).join(" ") + "/01"; };
      var s = section(root, "Motion Styles em ação", keys.length);
      s.appendChild(el("p", "pg-doc-p", "Passe o mouse, pressione e solte o botão; marque e desmarque o checkbox. Cada interação dispara o Motion Style correspondente na lista e na cascata abaixo."));
      var stage = s.appendChild(el("div", "pg-tok-stage"));
      var pay = stage.appendChild(document.createElement("cds-main-button"));
      [["label", "Pagar"], ["kind", "default"], ["appearance", "accent"], ["show-lead-icon", "false"], ["show-trailing-icon", "false"]].forEach(function(a){ pay.setAttribute(a[0], a[1]); });
      var cb = stage.appendChild(document.createElement("cds-checkbox")); cb.setAttribute("label", "Aceito os termos");
      var ul = s.appendChild(el("div", "pg-tok-styles")), rows = {}, casc = el("div", "pg-tok-cascade");
      keys.forEach(function(k){
        var t = "--motion-" + k + "-01-timing", e = "--motion-" + k + "-01-easing", d = "--motion-" + k + "-01-delay", hasD = names().indexOf(d) !== -1;
        var row = ul.appendChild(tile("pg-tok-mstyle", t, function(){ go(k); }));
        row.setAttribute("aria-label", title(k) + " — copiar var(" + t + ")");
        var nm = row.appendChild(el("span", "pg-tok-mstyle__name"));
        nm.appendChild(el("span", "pg-tok__name", title(k)));
        nm.appendChild(el("span", "pg-tok-mstyle__when", TRIGGER[k] || ""));
        row.appendChild(code(val(t), t));
        row.appendChild(code(val(e) + (hasD ? " · +" + val(d) : ""), e));
        rows[k] = row;
      });
      section(root, "A cascata do estilo").appendChild(casc);
      function chain(parent, layer, n){
        var line = parent.appendChild(el("div", "pg-tok-chain")), ref = spec(n), target = (ref.match(/var\((--[^)]+)\)/) || [])[1];
        line.appendChild(el("span", "pg-tok-chain__k", layer));
        var tag = function(text, app){ var t = line.appendChild(document.createElement("cds-tag")); t.setAttribute("label", text); t.setAttribute("appearance", app); t.setAttribute("show-lead-item", "false"); };
        var arrow = function(){ var i = line.appendChild(document.createElement("cds-icon")); i.setAttribute("icon", "navigation-right-line"); i.setAttribute("size", "small"); i.setAttribute("appearance", "neutral"); i.setAttribute("aria-hidden", "true"); };
        tag(n.replace(/^--motion-/, "").replace(/-01-(timing|easing|delay)$/, function(_, p){ return " · " + cap(p); }).replace(/^[a-z-]+/, function(m){ return title(m); }), "accent");
        if (target){ arrow(); tag(figmaName(target), "neutral"); var prim = PRIMITIVE[target.replace("--common-motion-easing-", "")]; if (prim && /easing/.test(target)){ arrow(); tag(prim, "neutral"); } }
        arrow(); line.appendChild(code(val(n), n));
      }
      function go(k){
        Object.keys(rows).forEach(function(x){ rows[x].classList.toggle("is-current", x === k); });
        casc.innerHTML = "";
        casc.appendChild(el("h4", "pg-doc-h4", title(k) + " · " + (TRIGGER[k] || "")));
        ["timing", "easing", "delay"].forEach(function(p){ var n = "--motion-" + k + "-01-" + p; if (names().indexOf(n) !== -1) chain(casc, cap(p), n); });
        casc.appendChild(el("p", "pg-doc-note", "Motion Style (intenção) → Brand Style (`Common/Motion/*`) → valor. Os nomes primitivos de easing vêm do explicador castanhads-motion; Primitives e Theme não estão no snapshot do playground."));
      }
      pay.addEventListener("mouseenter", function(){ go("hover-in"); });
      pay.addEventListener("mouseleave", function(){ go("hover-out"); });
      pay.addEventListener("pointerdown", function(){ go("pressed"); });
      pay.addEventListener("pointerup", function(){ go("released"); });
      cb.addEventListener("cds-change", function(ev){ ev.stopPropagation(); go(ev.detail && ev.detail.status === "selected" ? "selected-in" : "selected-out"); });
      go(keys[0]);
    },
    // Laboratório de easing: curva escolhida (Filter Chips) + duração (Slider do DS) + bolinha no trilho
    "easing-lab": function(root){
      var eases = pick("--common-motion-easing-"), durs = pick("--common-motion-duration-").filter(function(n){ var ms = msOf(val(n)); return ms > 0 && ms <= 1000; });
      var cur = eases[0], di = Math.max(0, durs.indexOf("--common-motion-duration-long-04"));
      var s = section(root, "Laboratório de easing", eases.length);
      s.appendChild(el("p", "pg-doc-p", "Escolha uma curva e uma duração para comparar o ritmo. A bolinha percorre o trilho com o token escolhido."));
      var lab = s.appendChild(el("div", "pg-tok-lab")), side = lab.appendChild(el("div", "pg-tok-lab__ctl")), view = lab.appendChild(el("div", "pg-tok-lab__view"));
      if (CDS.kit) CDS.kit.seg(side, { label: "Curva", value: cur, options: eases.map(function(n){ return [n, label(n, "--common-motion-easing-")]; }), onChange: function(v){ cur = v; draw(); run(); } });
      var NS = "http://www.w3.org/2000/svg", svg = view.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "-8 -40 116 156"); svg.setAttribute("class", "pg-tok-lab__curve"); svg.setAttribute("aria-hidden", "true");
      var mk = function(tag, cls){ var x = svg.appendChild(document.createElementNS(NS, tag)); x.setAttribute("class", cls); return x; };
      var base = mk("path", "pg-tok-lab__base"), h1 = mk("line", "pg-tok-lab__handle"), h2 = mk("line", "pg-tok-lab__handle"), path = mk("path", "pg-tok-lab__path");
      base.setAttribute("d", "M0 100 L100 100 M0 100 L0 0");
      var rail = view.appendChild(el("div", "pg-tok-ease is-lab")), dot = rail.appendChild(el("span", "pg-tok-ease__dot"));
      var info = view.appendChild(el("p", "pg-doc-note"));
      var durBox = side.appendChild(el("div", "pg-ctrl")); durBox.appendChild(el("span", "pg-lbl", "Duração"));
      var sl = durBox.appendChild(document.createElement("cds-slider"));
      [["label", "Duração"], ["min", "0"], ["max", String(durs.length - 1)], ["step", "1"], ["value", String(di)], ["show-value-indicator", "false"], ["show-stops", "false"]].forEach(function(a){ sl.setAttribute(a[0], a[1]); });
      sl.setAttribute("value-text", "");
      sl.addEventListener("cds-change", function(e){ e.stopPropagation(); di = Math.round(e.detail.value); run(); });
      sl.addEventListener("input", function(){ var v = parseInt(sl.getAttribute("value"), 10); if (!isNaN(v)) di = v; info.textContent = text(); });
      var replayBtn = CDS.docMainButton ? side.appendChild(CDS.docMainButton("Reproduzir")) : null;
      if (replayBtn) replayBtn.addEventListener("click", run);
      function text(){ var d = durs[di]; return label(cur, "--common-motion-easing-") + " · " + val(cur) + " — " + label(d, "--common-motion-duration-").replace(/-(\d+)$/, "/$1") + " · " + val(d); }
      function draw(){
        var m = val(cur).match(/cubic-bezier\(([^)]+)\)/), p = m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1];
        var X = function(x){ return x * 100; }, Y = function(y){ return 100 - y * 100; };
        path.setAttribute("d", "M0 100 C" + X(p[0]) + " " + Y(p[1]) + " " + X(p[2]) + " " + Y(p[3]) + " 100 0");
        h1.setAttribute("x1", 0); h1.setAttribute("y1", 100); h1.setAttribute("x2", X(p[0])); h1.setAttribute("y2", Y(p[1]));
        h2.setAttribute("x1", 100); h2.setAttribute("y1", 0); h2.setAttribute("x2", X(p[2])); h2.setAttribute("y2", Y(p[3]));
      }
      function run(){ info.textContent = text(); dot.style.transitionDuration = "var(" + durs[di] + ")"; dot.style.transitionTimingFunction = "var(" + cur + ")"; replay(rail); }
      draw(); info.textContent = text();
    }
  };
  // Duração / delay: a barra se preenche no tempo do próprio token (delay: espera o token e preenche em Short/04)
  function runs(root, title, list, prefix, kind){
    var btn = CDS.docMainButton ? CDS.docMainButton("Tocar todas") : null;
    var s = section(root, title, list.length, btn), ul = s.appendChild(el("div", "pg-tok-bars"));
    // em repouso a barra mostra a proporção (escala até 1 s; o Extended de 8 s fica cheio)
    var max = Math.max.apply(null, list.map(function(n){ return msOf(val(n)); }).filter(function(v){ return v <= 1000; }).concat([1]));
    list.forEach(function(n){
      var bar, row = ul.appendChild(tile("pg-tok-bar", n, function(){ replay(bar); }));
      row.appendChild(el("span", "pg-tok__name", label(n, prefix).replace(/-(\d+)$/, "/$1")));
      bar = row.appendChild(el("span", "pg-tok-run"));
      var fill = bar.appendChild(el("span", "pg-tok-run__fill"));
      bar.style.setProperty("--_w", Math.min(100, Math.round(msOf(val(n)) / max * 1000) / 10) + "%");
      if (kind === "duration") fill.style.transitionDuration = "var(" + n + ")";
      else fill.style.transitionDelay = "var(" + n + ")";
      row._play = function(){ replay(bar); };
      row.appendChild(code(val(n), n));
    });
    if (btn) playAll(btn, ul, ".pg-tok-bar");
  }

  CDS.docBlocks.tokens = function(doc, kind){
    order = 0;
    var root = el("div", "pg-tok-root");
    (RENDER[kind] || function(){})(root);
    return root;
  };
  // Troca de tema: atualiza os valores exibidos (as amostras já seguem o var())
  new MutationObserver(function(){
    [].forEach.call(document.querySelectorAll(".pg-tok-root [data-token]"), function(c){ c.textContent = val(c.dataset.token); });
    [].forEach.call(document.querySelectorAll(".pg-tok-root [data-ink]"), function(c){ ink(c, c.dataset.ink); });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
