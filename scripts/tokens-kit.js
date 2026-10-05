/**
 * Mostruário de tokens do Caju Theme (bloco `tokens` da doc) — referência: [Caju] Theme · página Caju Benefícios (4309:2).
 * Lê os nomes direto do :root de styles/tokens.css e os valores ao vivo (getComputedStyle): no tema escuro mostra os valores dark
 * e nunca fica desatualizado em relação ao snapshot.
 *   { tokens: "colors" | "font" | "text-styles" | "radius" | "width" | "sizes" | "sizes-default" | "elevation" | "opacity" | "duration" | "delay" | "easing" | "motion-live" | "easing-lab" }
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

  // Nome no código do castanha-react (R3): --common-X / --specific-X → --castanha-X quando o alias existe (styles/tokens.css)
  function codeName(n){ var c = n.replace(/^--(common|specific)-/, "--castanha-"); return c !== n && names().indexOf(c) !== -1 ? c : null; }
  // Tile clicável (C87): copia var(--castanha-…) (ou o nome do playground, se o token não existe no pacote) e confirma com o Toast do DS
  function tile(cls, n, onPlay){
    var b = el("button", "pg-tok-tile " + cls), cn = codeName(n) || n; b.type = "button";
    b.setAttribute("aria-label", "Copiar var(" + cn + ")");
    b.style.setProperty("--_i", String(Math.min(order++, 24)));
    if (CDS.kit) CDS.kit.lazyTip(b, cn === n ? "Só no playground: não existe no castanha-tokens. Clique para copiar." : "Nome no castanha-tokens. No playground: " + n + ". Clique para copiar.", { label: "var(" + cn + ")" });
    b.addEventListener("click", function(){
      try { navigator.clipboard.writeText("var(" + cn + ")"); } catch (e) {}
      if (CDS.docToast) CDS.docToast("Copiado: var(" + cn + ")");
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
  // tinta legível sobre a cor: Support/darker ou Support/lighter (constantes nos dois temas). Com transparência, a cor que
  // aparece é o tom misturado às duas casas do xadrez (Surface/default e Surface/01 do tema atual): vence a tinta com mais
  // contraste no pior dos dois casos (no escuro, tom fraco sobre fundo escuro pede tinta clara)
  function rgba(v){ var m = String(v).match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i); if (!m) return null;
    return [0, 2, 4].map(function(i){ return parseInt(m[1].substr(i, 2), 16); }).concat([m[2] ? parseInt(m[2], 16) / 255 : 1]); }
  function lum(c){ var l = c.slice(0, 3).map(function(x){ x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; }
  function ratio(a, b){ var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function over(c, bg){ return [0, 1, 2].map(function(i){ return c[i] * c[3] + bg[i] * (1 - c[3]); }); }
  function ink(chip, n){
    var c = rgba(val(n)), darkInk = rgba(val("--common-colors-support-darker")) || [26, 26, 26, 1], lightInk = rgba(val("--common-colors-support-lighter")) || [252, 252, 252, 1];
    var dark = true;
    if (c){
      var bgs = c[3] < 1 ? [rgba(val("--common-colors-surface-default")), rgba(val("--common-colors-surface-01"))].filter(Boolean) : [];
      var shown = bgs.length ? bgs.map(function(bg){ return over(c, bg); }) : [c];
      var worst = function(ink){ return Math.min.apply(null, shown.map(function(x){ return ratio(x, ink); })); };
      dark = worst(darkInk) >= worst(lightInk);
    }
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
    // Tamanhos padrão (Scale no zeroheight): os seis que atendem ~90% dos layouts, em quadrados do tamanho do token
    "sizes-default": function(root){
      var list = ["16", "20", "24", "40", "48", "64"].map(function(n){ return "--common-sizes-" + n; }), s = section(root, "Sizes padrão", list.length);
      var row = s.appendChild(el("div", "pg-sz-default"));
      list.forEach(function(n){
        var t = row.appendChild(tile("pg-sz-default__tile", n)), sq = t.appendChild(el("span", "pg-sz-default__sq"));
        sq.style.width = sq.style.height = "var(" + n + ")";
        var cap = t.appendChild(el("span", "pg-tok__text")); cap.appendChild(el("span", "pg-tok__name", label(n, "--common-sizes-"))); cap.appendChild(code(val(n), n));
      });
    },
    // Elevação (Material/Polaris/Radix): palco com um card que sobe de nível (Filter Chips do DS) + sombra decomposta
    elevation: function(root){
      var list = pick("--common-elevation-level-"), s = section(root, "Elevations", list.length), lvl = list.length ? list[list.length - 1] : null;
      var lab = s.appendChild(el("div", "pg-el-lab")), ctl = lab.appendChild(el("div", "pg-el-lab__ctl"));
      var stage = lab.appendChild(el("div", "pg-el-stage")), card = stage.appendChild(el("div", "pg-el-card"));
      card.appendChild(el("span", "pg-el-card__title")); card.appendChild(el("span", "pg-el-card__sub", "Card sobre Surface/01"));
      var parts = ctl.appendChild(el("dl", "pg-el-parts"));
      function show(n){
        card.style.boxShadow = n ? "var(" + n + ")" : "none";
        card.dataset.level = n ? n.replace(/.*-/, "") : "0";
        card.firstChild.textContent = n ? label(n, "--common-elevation-") : "Nenhuma";
        parts.innerHTML = "";
        ["x", "y", "blur", "spread", "color"].forEach(function(k){
          var t = n ? n.replace("--common-elevation-level-", "--common-elevations-level-") + "-" + k : null;
          parts.appendChild(el("dt", null, cap(k)));
          parts.appendChild(el("dd")).appendChild(code(t ? val(t) : "—", t));
        });
      }
      if (CDS.kit) CDS.kit.seg(ctl, { label: "Nível", value: lvl, options: [[null, "Nenhuma"]].concat(list.map(function(n){ return [n, label(n, "--common-elevation-")]; })),
        onChange: function(v){ show(v); } });
      ctl.insertBefore(ctl.lastChild, parts); // chips antes da decomposição
      var g = s.appendChild(el("div", "pg-el-row"));
      list.forEach(function(n){
        var t = g.appendChild(tile("pg-el-tile", n, null)); t.addEventListener("click", function(){ show(n); });
        var c = t.appendChild(el("span", "pg-el-mini")); c.style.boxShadow = "var(" + n + ")";
        var cp = t.appendChild(el("span", "pg-tok__text")); cp.appendChild(el("span", "pg-tok__name", label(n, "--common-elevation-"))); cp.appendChild(code(val(n), n));
      });
      show(lvl);
    },
    // Opacidade: laboratório (Slider do DS) com a comparação imagem | Accent sólido em tamanho grande + faixa com todos os níveis
    opacity: function(root){
      var list = pick("--common-opacity-"), cur = Math.max(0, list.indexOf("--common-opacity-medium"));
      var s = section(root, "Opacity", list.length), lab = s.appendChild(el("div", "pg-bd-lab"));
      var ctl = lab.appendChild(el("div", "pg-ctrl pg-bd-lab__ctl")); ctl.appendChild(el("span", "pg-lbl", "Opacidade"));
      var sl = ctl.appendChild(document.createElement("cds-slider"));
      [["label", "Opacidade"], ["min", "0"], ["max", String(list.length - 1)], ["step", "1"], ["value", String(cur)], ["show-value-indicator", "false"], ["show-stops", "false"], ["value-text", ""]].forEach(function(a){ sl.setAttribute(a[0], a[1]); });
      var read = ctl.appendChild(el("p", "pg-bd-lab__read"));
      var big = lab.appendChild(el("span", "pg-tok__op is-big")); opacityView(big, list[cur]); var layer = big.querySelector(".pg-tok__op-layer");
      var g = s.appendChild(grid("is-shapes"));
      function show(i){ cur = i; var n = list[i]; layer.style.opacity = "var(" + n + ")"; read.textContent = label(n, "--common-opacity-") + " · var(" + n + ") · " + Math.round(parseFloat(val(n)) * 100) + "%";
        CDS.attr(sl, "value", String(i)); [].forEach.call(g.children, function(t, k){ t.classList.toggle("is-current", k === i); }); }
      sl.addEventListener("cds-change", function(e){ e.stopPropagation(); show(Math.round(e.detail.value)); });
      sl.addEventListener("input", function(){ var v = parseInt(sl.getAttribute("value"), 10); if (!isNaN(v)) show(v); });
      list.forEach(function(n, i){
        var t = g.appendChild(tile("pg-bd-tile", n, null)); t.addEventListener("click", function(){ show(i); });
        opacityView(t.appendChild(el("span", "pg-tok__op")), n);
        var cp = t.appendChild(el("span", "pg-tok__text")); cp.appendChild(el("span", "pg-tok__name", label(n, "--common-opacity-"))); cp.appendChild(code(Math.round(parseFloat(val(n)) * 100) + "%", null));
      });
      show(cur);
    },
    // ===== Motion (referências: Material Motion e Carbon — Systemic × Expressive; easings.net — cartão por curva;
    // explicador castanhads-motion — palco, cascata e laboratório). Um laboratório central recebe curva, duração e delay
    // de qualquer lugar da tab: Motion Styles, cartões de curva e linhas de duração/delay.
    "motion-live": function(root){
      var keys = pick("--motion-", /-easing$/).filter(function(n){ return /-01-timing$/.test(n); }).map(function(n){ return n.replace(/^--motion-|-01-timing$/g, ""); });
      var title = function(k){ return k.split("-").map(cap).join(" ") + "/01"; };
      var s = section(root, "Motion Styles em ação", keys.length);
      s.appendChild(el("p", "pg-doc-p", "Passe o mouse, pressione e solte o botão; marque e desmarque o checkbox. Cada interação dispara o Motion Style correspondente: o painel mostra a cascata e o laboratório toca com o timing, a curva e o delay dele."));
      var live = s.appendChild(el("div", "pg-mo-live")), stage = live.appendChild(el("div", "pg-tok-stage"));
      var pay = stage.appendChild(document.createElement("cds-main-button"));
      [["label", "Pagar"], ["kind", "default"], ["appearance", "accent"], ["show-lead-icon", "false"], ["show-trailing-icon", "false"]].forEach(function(a){ pay.setAttribute(a[0], a[1]); });
      var cb = stage.appendChild(document.createElement("cds-checkbox")); cb.setAttribute("label", "Aceito os termos");
      var panel = live.appendChild(el("div", "pg-mo-panel"));
      var ul = s.appendChild(el("div", "pg-tok-styles")), rows = {};
      keys.forEach(function(k){
        var t = "--motion-" + k + "-01-timing", e = "--motion-" + k + "-01-easing", d = "--motion-" + k + "-01-delay", hasD = names().indexOf(d) !== -1;
        // só clique/foco (não hover): o painel muda de conteúdo e, no hover, a lista andava sob o cursor e o estilo "tremia"
        var row = ul.appendChild(tile("pg-tok-mstyle", t, null));
        row.addEventListener("click", function(){ go(k); }); row.addEventListener("focus", function(){ go(k); });
        row.setAttribute("aria-label", title(k) + " — copiar var(" + t + ")");
        var nm = row.appendChild(el("span", "pg-tok-mstyle__name"));
        nm.appendChild(el("span", "pg-tok__name", title(k)));
        nm.appendChild(el("span", "pg-tok-mstyle__when", TRIGGER[k] || ""));
        row.appendChild(code(val(t), t));
        row.appendChild(code(val(e) + (hasD ? " · +" + val(d) : ""), e));
        rows[k] = row;
      });
      function chain(parent, layer, n){
        var line = parent.appendChild(el("div", "pg-tok-chain")), ref = spec(n), target = (ref.match(/var\((--[^)]+)\)/) || [])[1];
        line.appendChild(el("span", "pg-tok-chain__k", layer));
        var tag = function(text, app){ var t = line.appendChild(document.createElement("cds-tag")); t.setAttribute("label", text); t.setAttribute("appearance", app); t.setAttribute("show-lead-item", "false"); };
        var arrow = function(){ var i = line.appendChild(document.createElement("cds-icon")); i.setAttribute("icon", "navigation-right-line"); i.setAttribute("size", "small"); i.setAttribute("appearance", "neutral"); i.setAttribute("aria-hidden", "true"); };
        if (target){ tag(figmaName(target), "neutral"); var prim = PRIMITIVE[target.replace("--common-motion-easing-", "")]; if (prim && /easing/.test(target)){ arrow(); tag(prim, "neutral"); } arrow(); }
        line.appendChild(code(val(n), n));
      }
      var curK = null;
      function go(k){
        if (k === curK){ if (LAB.replay) LAB.replay(); return; } curK = k;
        Object.keys(rows).forEach(function(x){ rows[x].classList.toggle("is-current", x === k); });
        panel.innerHTML = "";
        var head = panel.appendChild(el("div", "pg-mo-panel__head"));
        head.appendChild(el("span", "pg-mo-panel__title", title(k)));
        head.appendChild(el("span", "pg-mo-panel__when", TRIGGER[k] || ""));
        var t = "--motion-" + k + "-01-timing", e = "--motion-" + k + "-01-easing", d = "--motion-" + k + "-01-delay";
        ["timing", "easing", "delay"].forEach(function(p){ var n = "--motion-" + k + "-01-" + p; if (names().indexOf(n) !== -1) chain(panel, cap(p), n); });
        panel.appendChild(el("p", "pg-doc-note", "Motion Style → Brand Style (Common/Motion/*) → valor. Primitivos de easing do castanhads-motion (C106)."));
        if (LAB.set) LAB.set(spec(e).replace(/^var\(|\)$/g, ""), spec(t).replace(/^var\(|\)$/g, ""), names().indexOf(d) !== -1 ? spec(d).replace(/^var\(|\)$/g, "") : null);
      }
      pay.addEventListener("mouseenter", function(){ go("hover-in"); });
      pay.addEventListener("mouseleave", function(){ go("hover-out"); });
      pay.addEventListener("pointerdown", function(){ go("pressed"); });
      pay.addEventListener("pointerup", function(){ go("released"); });
      cb.addEventListener("cds-change", function(ev){ ev.stopPropagation(); go(ev.detail && ev.detail.status === "selected" ? "selected-in" : "selected-out"); });
      LAB.first = function(){ go(keys[0]); };
    },
    // Laboratório: curva grande com o ponto andando sobre o traçado no tempo real do token + trilho; Filter Chips e Sliders do DS
    "easing-lab": function(root){
      var eases = pick("--common-motion-easing-"), durs = pick("--common-motion-duration-").filter(function(n){ var ms = msOf(val(n)); return ms > 0 && ms <= 1000; }), dels = pick("--common-motion-delay-");
      var st = { e: eases[0], d: Math.max(0, durs.indexOf("--common-motion-duration-long-04")), y: 0 };
      var s = section(root, "Laboratório", null);
      s.appendChild(el("p", "pg-doc-p", "O ponto percorre a curva no tempo do token, e a bolinha mostra o mesmo movimento em linha reta. Escolha curva, duração e delay aqui ou clique em qualquer referência abaixo."));
      var lab = s.appendChild(el("div", "pg-mo-lab")), view = lab.appendChild(el("div", "pg-mo-lab__view")), ctl = lab.appendChild(el("div", "pg-mo-lab__ctl"));
      var NS = "http://www.w3.org/2000/svg", svg = view.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "-8 -40 116 156"); svg.setAttribute("class", "pg-tok-lab__curve"); svg.setAttribute("aria-hidden", "true");
      var mk = function(tag, cls){ var x = svg.appendChild(document.createElementNS(NS, tag)); x.setAttribute("class", cls); return x; };
      var base = mk("path", "pg-tok-lab__base"), h1 = mk("line", "pg-tok-lab__handle"), h2 = mk("line", "pg-tok-lab__handle"), path = mk("path", "pg-tok-lab__path"), pt = mk("circle", "pg-mo-lab__pt");
      base.setAttribute("d", "M0 100 L100 100 M0 100 L0 0"); pt.setAttribute("r", "4"); pt.setAttribute("cx", "0"); pt.setAttribute("cy", "100");
      var rail = view.appendChild(el("div", "pg-tok-ease is-lab")), dot = rail.appendChild(el("span", "pg-tok-ease__dot"));
      var info = view.appendChild(el("p", "pg-mo-lab__info"));
      var chips = ctl.appendChild(el("div"));
      if (CDS.kit) CDS.kit.seg(chips, { label: "Curva", value: st.e, options: eases.map(function(n){ return [n, label(n, "--common-motion-easing-")]; }), onChange: function(v){ st.e = v; draw(); run(); } });
      function slider(lbl, max, value, on){
        var box = ctl.appendChild(el("div", "pg-ctrl")); box.appendChild(el("span", "pg-lbl", lbl));
        var sl = box.appendChild(document.createElement("cds-slider"));
        [["label", lbl], ["min", "0"], ["max", String(max)], ["step", "1"], ["value", String(value)], ["show-value-indicator", "false"], ["show-stops", "false"], ["value-text", ""]].forEach(function(a){ sl.setAttribute(a[0], a[1]); });
        sl.addEventListener("cds-change", function(e){ e.stopPropagation(); on(Math.round(e.detail.value)); run(); });
        return sl;
      }
      var slD = slider("Duração", durs.length - 1, st.d, function(v){ st.d = v; });
      var slY = slider("Delay", dels.length - 1, st.y, function(v){ st.y = v; });
      var btn = CDS.docMainButton ? ctl.appendChild(CDS.docMainButton("Reproduzir")) : null; if (btn) btn.addEventListener("click", run);
      function ez(){ var m = val(st.e).match(/cubic-bezier\(([^)]+)\)/); return m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1]; }
      function draw(){
        var p = ez(), X = function(x){ return x * 100; }, Y = function(y){ return 100 - y * 100; };
        path.setAttribute("d", "M0 100 C" + X(p[0]) + " " + Y(p[1]) + " " + X(p[2]) + " " + Y(p[3]) + " 100 0");
        h1.setAttribute("x1", 0); h1.setAttribute("y1", 100); h1.setAttribute("x2", X(p[0])); h1.setAttribute("y2", Y(p[1]));
        h2.setAttribute("x1", 100); h2.setAttribute("y1", 0); h2.setAttribute("x2", X(p[2])); h2.setAttribute("y2", Y(p[3]));
        [].forEach.call(chips.querySelectorAll("cds-filter-chip"), function(c){ CDS.attr(c, "selected", c.dataset.v === st.e); });
      }
      function text(){ var d = durs[st.d], y = dels[st.y];
        return label(st.e, "--common-motion-easing-") + " · " + label(d, "--common-motion-duration-").replace(/-(\d+)$/, "/$1") + " (" + val(d) + ")" + (msOf(val(y)) ? " · delay " + label(y, "--common-motion-delay-").replace(/-(\d+)$/, "/$1") + " (" + val(y) + ")" : ""); }
      var raf = 0, timer = 0;
      function run(){
        info.textContent = text(); cancelAnimationFrame(raf); clearTimeout(timer);
        dot.style.transitionDuration = "var(" + durs[st.d] + ")"; dot.style.transitionTimingFunction = "var(" + st.e + ")"; dot.style.transitionDelay = "var(" + dels[st.y] + ")";
        replay(rail);
        if (reduced){ pt.setAttribute("cx", 100); pt.setAttribute("cy", 0); return; }
        var p = ez(), f = bezier(p[0], p[1], p[2], p[3]), ms = msOf(val(durs[st.d])) || 1, wait = msOf(val(dels[st.y]));
        pt.setAttribute("cx", 0); pt.setAttribute("cy", 100);
        timer = setTimeout(function(){ var t0 = performance.now();
          (function step(now){ var x = Math.min(1, (now - t0) / ms); pt.setAttribute("cx", x * 100); pt.setAttribute("cy", 100 - f(x) * 100); if (x < 1) raf = requestAnimationFrame(step); })(t0); }, wait);
      }
      LAB.replay = run;
      LAB.set = function(e, d, y){
        if (e && eases.indexOf(e) !== -1) st.e = e;
        if (d){ var i = durs.indexOf(d); if (i !== -1){ st.d = i; CDS.attr(slD, "value", String(i)); } }
        var k = y ? dels.indexOf(y) : 0; st.y = Math.max(0, k); CDS.attr(slY, "value", String(st.y));
        draw(); run();
      };
      draw(); info.textContent = text();
      if (LAB.first) setTimeout(LAB.first, 0);
    },
    // Curvas em dois grupos (Material/Carbon): cartão com a curva; no hover o ponto anda sobre ela; clique leva ao laboratório
    easing: function(root){
      var all = pick("--common-motion-easing-");
      // textos de uso: zeroheight · Motion · Velocidade (24e587, Available); Systemic = "Curvas Produtivas"
      [["Systemic", "Curvas produtivas. Este conjunto é usado para transições simples, pequenas ou focadas em utilidades."], ["Expressive", "Curvas expressivas. Conjunto de curvas expressivas."]].forEach(function(gr){
        var list = all.filter(function(n){ return n.indexOf("-" + gr[0].toLowerCase() + "-") !== -1; }); if (!list.length) return;
        var s = section(root, "Easing · " + gr[0], list.length); s.appendChild(el("p", "pg-doc-p", gr[1]));
        var g = s.appendChild(grid("is-curves"));
        list.forEach(function(n){
          var m = val(n).match(/cubic-bezier\(([^)]+)\)/), p = m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1], f = bezier(p[0], p[1], p[2], p[3]);
          var NS = "http://www.w3.org/2000/svg", svg, pt, raf = 0;
          var t = g.appendChild(tile("pg-mo-curve", n, function(){
            if (reduced) return; cancelAnimationFrame(raf); var t0 = performance.now(), ms = 900;
            (function step(now){ var x = Math.min(1, (now - t0) / ms); pt.setAttribute("cx", x * 100); pt.setAttribute("cy", 100 - f(x) * 100); if (x < 1) raf = requestAnimationFrame(step); })(t0);
          }));
          t.addEventListener("click", function(){ if (LAB.set) LAB.set(n, null, null); });
          svg = t.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "-6 -30 112 140"); svg.setAttribute("aria-hidden", "true");
          var b = svg.appendChild(document.createElementNS(NS, "path")); b.setAttribute("d", "M0 100 L100 100 M0 100 L0 0"); b.setAttribute("class", "pg-tok-lab__base");
          var c = svg.appendChild(document.createElementNS(NS, "path")); c.setAttribute("d", "M0 100 C" + p[0] * 100 + " " + (100 - p[1] * 100) + " " + p[2] * 100 + " " + (100 - p[3] * 100) + " 100 0"); c.setAttribute("class", "pg-tok-lab__path");
          pt = svg.appendChild(document.createElementNS(NS, "circle")); pt.setAttribute("r", "5"); pt.setAttribute("cx", "0"); pt.setAttribute("cy", "100"); pt.setAttribute("class", "pg-mo-lab__pt");
          var cp = t.appendChild(el("span", "pg-tok__text")); cp.appendChild(el("span", "pg-tok__name", label(n, "--common-motion-easing-")));
          var use = EASE_USE[n.replace("--common-motion-easing-", "")]; if (use) cp.appendChild(el("span", "pg-mo-curve__use", use));
          cp.appendChild(el("span", "pg-mo-curve__prim", PRIMITIVE[n.replace("--common-motion-easing-", "")] || "")); cp.appendChild(code(val(n), n));
        });
      });
    },
    // ===== Ícones (Phosphor / Material Symbols / Lucide): busca, categorias, cor e tamanho ao vivo, painel de detalhe
    icons: function(root){ library(root, "icons"); },
    // ===== Ilustrações (unDraw / Storyset): busca, categorias, fundo, painel de detalhe
    illustrations: function(root){ library(root, "illustrations"); },
    duration: function(root){ runs(root, "Duration", pick("--common-motion-duration-"), "--common-motion-duration-", "duration"); },
    delay: function(root){ runs(root, "Delay", pick("--common-motion-delay-"), "--common-motion-delay-", "delay"); }
  };
  // cubic-bezier(x1, y1, x2, y2) → f(x) = y (resolve t por Newton + bisseção), para o ponto andar sobre a curva
  function bezier(x1, y1, x2, y2){
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    var X = function(t){ return ((ax * t + bx) * t + cx) * t; }, Y = function(t){ return ((ay * t + by) * t + cy) * t; }, dX = function(t){ return (3 * ax * t + 2 * bx) * t + cx; };
    return function(x){ var t = x, i; for (i = 0; i < 8; i++){ var e = X(t) - x, d = dX(t); if (Math.abs(e) < 1e-4) break; if (Math.abs(d) < 1e-6) break; t -= e / d; }
      if (t < 0 || t > 1 || Math.abs(X(t) - x) > 1e-3){ var lo = 0, hi = 1; t = x; for (i = 0; i < 30; i++){ var v = X(t); if (Math.abs(v - x) < 1e-4) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; } }
      return Y(t); };
  }
  // Duração / delay agrupados por família (Short, Medium…): barra proporcional; hover toca no tempo do token; clique leva ao laboratório
  function runs(root, title, list, prefix, kind){
    var s = section(root, title, list.length), ul = s.appendChild(el("div", "pg-tok-bars")), fam = null;
    var max = Math.max.apply(null, list.map(function(n){ return msOf(val(n)); }).filter(function(v){ return v <= 1000; }).concat([1]));
    list.forEach(function(n){
      var f = n.slice(prefix.length).replace(/-\d+$/, "");
      if (f !== fam){ fam = f; ul.appendChild(el("p", "pg-tok-sub", f.split("-").map(cap).join(" ")));
        var fu = kind === "duration" ? DUR_USE[f] : null; if (fu) ul.appendChild(el("p", "pg-mo-fam-use", fu)); }
      var bar, row = ul.appendChild(tile("pg-tok-bar", n, function(){ replay(bar); }));
      row.addEventListener("click", function(){ if (LAB.set) LAB.set(null, kind === "duration" ? n : null, kind === "delay" ? n : null); });
      row.appendChild(el("span", "pg-tok__name", label(n, prefix).replace(/-(\d+)$/, "/$1")));
      bar = row.appendChild(el("span", "pg-tok-run"));
      bar.appendChild(el("span", "pg-tok-run__fill"));
      bar.style.setProperty("--_w", Math.min(100, Math.round(msOf(val(n)) / max * 1000) / 10) + "%");
      var fill = bar.firstChild; if (kind === "duration") fill.style.transitionDuration = "var(" + n + ")"; else fill.style.transitionDelay = "var(" + n + ")";
      row.appendChild(code(val(n), n));
    });
  }
  function fold(t){ return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  // Biblioteca de ícones/ilustrações: Search Input + Filter Chips + grade de tiles (C87) + painel de detalhe com Tags e Main Buttons do DS
  function library(root, kind){
    var A = CDS.assets || {}, isIcon = kind === "icons", items = [], cats = [];
    if (isIcon){
      var meta = {}; (A.icons || []).forEach(function(i){ meta[i.name] = i; });
      (A.iconBuckets || []).filter(function(b){ return !b.glyphs; }).forEach(function(b){
        cats.push([b.id, b.name]);
        b.icons.forEach(function(n){ var m = meta[n] || {}; items.push({ id: n, name: n, cat: b.id, catName: b.name, cls: b.deprecated ? "" : m.cls, deprecated: !!b.deprecated, file: "assets/icons/" + b.id + "/" + n + ".svg", keywords: m.keywords || [] }); });
      });
    } else {
      var im = {}; (A.illustrations || []).forEach(function(i){ im[i.name] = i; });
      (A.illustrationBuckets || []).forEach(function(b){ cats.push([b.id, b.name]);
        b.items.forEach(function(k){ var m = im[k] || { label: k, src: "" }; items.push({ id: k, name: m.label, cat: b.id, catName: b.name, src: m.src, figma: m.figma, size: m.size, description: m.description || "", keywords: [] }); }); });
    }
    items.forEach(function(it){ it.text = fold([it.name, it.catName, it.figma, it.description].concat(it.keywords).join(" ")); });
    var st = { q: "", cat: "all", tone: "--common-colors-icons-intense", size: "--common-sizes-24", bg: "surface-default", sel: null };
    var box = root.appendChild(el("div", "pg-ic"));
    var bar = box.appendChild(el("div", "pg-ic-bar"));
    var search = bar.appendChild(document.createElement("cds-search-input"));
    [["label", isIcon ? "Buscar ícone" : "Buscar ilustração"], ["placeholder", isIcon ? "Nome ou palavra-chave (ex.: cartão, seta, pix)" : "Nome, categoria ou uso (ex.: cartão, pix, erro)"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ search.setAttribute(a[0], a[1]); });
    var opts = bar.appendChild(el("div", "pg-ic-opts"));
    if (CDS.kit){
      CDS.kit.seg(opts, { label: "Categoria", value: "all", options: [["all", "Todas"]].concat(cats), onChange: function(v){ st.cat = v; filter(); } });
      if (isIcon){
        CDS.kit.seg(opts, { label: "Cor", value: st.tone, options: [["--common-colors-icons-intense", "Neutral"], ["--common-colors-icons-accent", "Accent"], ["--common-colors-feedback-positive-intense", "Positive"], ["--common-colors-feedback-warning-intense", "Warning"], ["--common-colors-feedback-negative-intense", "Negative"], ["--common-colors-feedback-informative-intense", "Informative"]],
          onChange: function(v){ st.tone = v; box.style.setProperty("--_ic-tone", "var(" + v + ")"); } });
        CDS.kit.seg(opts, { label: "Tamanho", value: st.size, options: [["--common-sizes-16", "Small · 16"], ["--common-sizes-24", "Medium · 24"], ["--common-sizes-32", "Large · 32"]],
          onChange: function(v){ st.size = v; box.style.setProperty("--_ic-size", "var(" + v + ")"); } });
      } else {
        CDS.kit.seg(opts, { label: "Fundo", value: st.bg, options: [["surface-default", "Surface/default"], ["surface-01", "Surface/01"], ["surface-inversed", "Inversed"]],
          onChange: function(v){ st.bg = v; box.style.setProperty("--_ic-bg", "var(--common-colors-" + v + ")"); } });
      }
    }
    var count = box.appendChild(el("p", "pg-ic-count")); count.setAttribute("aria-live", "polite");
    var body = box.appendChild(el("div", "pg-ic-body")), gridEl = body.appendChild(el("ul", "pg-ic-grid" + (isIcon ? "" : " is-ills"))), panel = body.appendChild(el("aside", "pg-ic-panel"));
    panel.setAttribute("aria-label", "Detalhe");
    items.forEach(function(it, i){
      // Tile = composição <cmp-clickable-card> em modo botão; selecionado = current (aria-pressed)
      var li = gridEl.appendChild(el("li")), b = el("cmp-clickable-card", "pg-ic-tile");
      b.setAttribute("label", it.name); b.setAttribute("control-label", it.name + " — ver detalhe"); b.setAttribute("current", "false");
      if (isIcon) b.setAttribute("media", "auto");
      b.style.setProperty("--_i", String(Math.min(i, 24)));
      if (isIcon){ var ic = b.appendChild(el("span", "cds-icon pg-ic-glyph " + (it.cls || ""))); ic.setAttribute("aria-hidden", "true");
        if (!it.cls){ var u = 'url("' + it.file + '")'; ic.style.webkitMaskImage = u; ic.style.maskImage = u; } }
      else { var im2 = b.appendChild(el("img", "pg-ic-img")); im2.alt = ""; im2.loading = "lazy"; im2.decoding = "async"; im2.src = it.src; }
      li.appendChild(b); // Slot: a mídia entra antes de conectar
      b.addEventListener("click", function(){ select(it, b);
        // no mobile o painel fica acima da grade: rola até ele para o detalhe não mudar fora da tela
        if (window.matchMedia && matchMedia("(max-width:900px)").matches) panel.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" }); });
      it.li = li; it.btn = b;
    });
    function copy(text){ try { navigator.clipboard.writeText(text); } catch (e) {} if (CDS.docToast) CDS.docToast("Copiado: " + text); }
    function select(it, b){
      if (st.sel && st.sel.btn) st.sel.btn.setAttribute("current", "false"); st.sel = it; if (b) b.setAttribute("current", "true");
      panel.innerHTML = "";
      var prev = panel.appendChild(el("div", "pg-ic-preview"));
      if (isIcon){ var g = prev.appendChild(el("span", "cds-icon pg-ic-glyph is-big " + (it.cls || ""))); g.setAttribute("aria-hidden", "true"); /* o nome vem no título logo abaixo */ if (!it.cls){ var u = 'url("' + it.file + '")'; g.style.webkitMaskImage = u; g.style.maskImage = u; } }
      else { var im3 = prev.appendChild(el("img", "pg-ic-img is-big")); im3.alt = it.name; im3.src = it.src; }
      panel.appendChild(el("span", "pg-ic-panel__title", it.name));
      var dl = panel.appendChild(el("dl", "pg-el-parts"));
      [["Categoria", it.catName], isIcon ? null : ["Figma", it.figma], isIcon ? null : ["Tamanho", it.size], it.deprecated ? ["Status", "Deprecated"] : null].filter(Boolean).forEach(function(r){ if (!r[1]) return; dl.appendChild(el("dt", null, r[0])); dl.appendChild(el("dd", null, r[1])); });
      if (it.description) panel.appendChild(el("p", "pg-doc-p", it.description));
      if (it.keywords.length){ var tags = panel.appendChild(el("div", "pg-ic-tags"));
        it.keywords.forEach(function(k){ var t = tags.appendChild(document.createElement("cds-tag")); t.setAttribute("label", k); t.setAttribute("appearance", "neutral"); t.setAttribute("show-lead-item", "false"); }); }
      // R4 · No React: nome no pacote (castanha-icons / castanha-illustrations), import eager e situação (integration/assets-react.js)
      var RA = CDS.reactAssets, rx = RA && (isIcon ? RA.icons : RA.ills), info = rx ? rx.map[it.id] : undefined, react = null;
      if (rx){
        panel.appendChild(el("span", "pg-ic-panel__sub", "No React"));
        var rtags = panel.appendChild(el("div", "pg-ic-tags"));
        var rtag = function(app, label){ var t = rtags.appendChild(document.createElement("cds-tag")); t.setAttribute("appearance", app); t.setAttribute("label", label); t.setAttribute("show-lead-item", "false"); };
        if (!info){
          rtag(it.deprecated ? "neutral" : "negative", "Fora do " + rx.pkg.split("/")[1]);
          panel.appendChild(el("p", "pg-doc-p", it.deprecated ? "Deprecated no Figma e já removido do pacote." : "Existe no Figma e aqui, mas o pacote não exporta. No React não dá para usar pelo nome."));
        } else {
          var rname = isIcon ? it.id : info[0], pascal = isIcon ? info : info[1];
          react = (isIcon ? '<Icon name="' : '<Illustration name="') + rname + '" />';
          rtag("positive", "No " + rx.pkg.split("/")[1]);
          if (!isIcon && info[2]) rtag("warning", "Nome diferente no pacote");
          if (!isIcon && info[3]) rtag("informative", "Desenho difere do pacote");
          if (it.deprecated) rtag("neutral", "Deprecated no Figma");
          var rdl = panel.appendChild(el("dl", "pg-el-parts"));
          [["Lazy", react], ["Eager", "import { " + pascal + " } from '" + rx.pkg + "';"]].forEach(function(r){ rdl.appendChild(el("dt", null, r[0])); var dd = rdl.appendChild(el("dd")); dd.appendChild(el("code", "pg-tok__code", r[1])); });
          if (!isIcon && info[2]) panel.appendChild(el("p", "pg-doc-p", "No Figma: " + it.id + ". O pacote usa outro nome: " + rname + "."));
        }
      }
      var acts = panel.appendChild(el("div", "pg-ic-actions"));
      if (CDS.docMainButton){
        var b1 = acts.appendChild(CDS.docMainButton("Copiar nome")); b1.addEventListener("click", function(){ copy(it.id); });
        var snippet = isIcon ? '<cds-icon icon="' + it.id + '"></cds-icon>' : '<cds-banner illustration="' + it.id + '"></cds-banner>';
        var b2 = acts.appendChild(CDS.docMainButton("Copiar código")); b2.addEventListener("click", function(){ copy(snippet); });
        if (react){ var b3 = acts.appendChild(CDS.docMainButton("Copiar React")); b3.addEventListener("click", function(){ copy(react); }); }
      }
    }
    function filter(){
      var q = fold(st.q.trim()), shown = 0, first = null;
      items.forEach(function(it){
        var ok = (st.cat === "all" ? !it.deprecated : it.cat === st.cat) && (!q || it.text.indexOf(q) !== -1);
        it.li.hidden = !ok; if (ok){ shown++; if (!first) first = it; }
      });
      count.textContent = shown + (isIcon ? (shown === 1 ? " ícone" : " ícones") : (shown === 1 ? " ilustração" : " ilustrações")) + (q ? " para “" + st.q.trim() + "”" : "") + (st.cat === "all" ? "" : " em " + (cats.filter(function(c){ return c[0] === st.cat; })[0] || [])[1]) + ". Clique para ver o detalhe.";
      if (first && (!st.sel || st.sel.li.hidden)) select(first, first.btn);
    }
    search.addEventListener("cds-change", function(e){ e.stopPropagation(); st.q = String(search.value || ""); filter(); });
    filter();
  }
  // Quando usar cada curva e cada família de duração — zeroheight · Motion · Velocidade (24e587, Available)
  var EASE_USE = {
    "systemic-default": "Utilizado em interações recorrentes da interface. Oferece transição equilibrada, com percepção clara de movimento, sem comprometer a fluidez da navegação. Recomendado para ações diretas como botões, cards e elementos de foco.",
    "systemic-accelerate": "Entrada fluida com antecipação suave. Chama atenção sem pressa. Ideal para elementos com impacto narrativo.",
    "systemic-decelerate": "Empregado na remoção de elementos. Favorece uma saída rápida e contínua, mantendo a interface responsiva e evitando quebras abruptas. Ideal para feedbacks temporários, notificações e estados transitórios.",
    "expressive-default": "Transição com presença e intenção. Dá peso visual e valor emocional ao movimento. Usado em transições, modais e telas com destaque.",
    "expressive-accelerate": "Entrada fluida com antecipação suave. Chama atenção sem pressa. Ideal para elementos com impacto narrativo.",
    "expressive-decelerate": "Saída desacelerada e elegante. Evita cortes bruscos. Reforça conclusão com clareza e leveza."
  };
  var DUR_USE = {
    "short": "Para interações rápidas, como hover, cliques e elementos pequenos. Garantem agilidade e feedback imediato.",
    "medium": "Usadas em cliques de botões, entrada de caixas, transformações e animações de saída. Oferecem equilíbrio entre dinamismo e clareza.",
    "long": "Utilizadas para entradas de toast, expansões, transformações e animações de entrada na tela. Criam transições mais suaves e envolventes.",
    "extra-long": "Reservadas para momentos especiais, como efeitos \"uau\" ou celebrações. Encantam o usuário com transições marcantes e memoráveis."
  };
  var LAB = {}; // laboratório de motion: set(easing, duração, delay) — preenchido pelo bloco easing-lab

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
