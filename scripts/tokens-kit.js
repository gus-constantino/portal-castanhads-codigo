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
    "selected-in": "ativa · Is Active → true", "selected-out": "desativa · Is Active → false", "disabled": "entra em disabled",
    "loading": "carregamento" };
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
    var img = sw.appendChild(document.createElement("cds-image")); img.className = "pg-tok__op-img"; img.setAttribute("src", "assets/brand/avatar-photo.jpg"); img.setAttribute("alt", ""); // foto do Avatar (09/10)
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
        var para = t.appendChild(el("span", "pg-ty-lh__para", "Seus benefícios em um cartão: alimentação, mobilidade, saúde e cultura, com saldo flexível para usar onde fizer sentido.")); para.style.setProperty("--_lh", "var(" + n + ")");
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
      var partsHost = ctl.appendChild(el("cmp-definition-list", "pg-el-parts")), parts = partsHost.listEl; // composição <cmp-definition-list>
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
      ctl.insertBefore(ctl.lastChild, partsHost); // chips antes da decomposição
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
    // ===== Motion Styles em ação (D365): bancada numa tela só, como o Figma e o DevTools.
    // Lista (Selection List Item) · palco com o componente que usa o estilo · inspetor em abas (Fixed Tab: Curva, Valores,
    // Código). Controles: Tocar, Loop (Switch), velocidade (Filter Chips), linha do tempo arrastável (Slider), comparar até
    // 3 estilos no próprio palco e atalhos de teclado. O arrasto pausa as transições do componente (Web Animations).
    // Referências: Material 3 (Easing and duration), Carbon, easings.net, cubic-bezier.com, Chrome DevTools e motion.dev.
    // Gráfico da curva e linha do tempo são peças do playground (só tokens).
    "motion-live": function(root){
      var keys = pick("--motion-").filter(function(n){ return /-\d+-timing$/.test(n); }).map(function(n){ return n.replace(/^--motion-|-timing$/g, ""); });
      var groupOf = function(k){ return k.replace(/-\d+$/, ""); };
      var title = function(k){ var m = k.match(/^(.+)-(\d+)$/); return m[1].split("-").map(cap).join(" ") + "/" + m[2]; };
      var usage = function(k){ return ((window.CDS && CDS.motionUsage) || {})[title(k)] || ""; };
      var hasD = function(k){ return names().indexOf("--motion-" + k + "-delay") !== -1; };
      var ms = function(k, p){ return p === "delay" && !hasD(k) ? 0 : msOf(val("--motion-" + k + "-" + p)); };
      var bez = function(k){ var m = val("--motion-" + k + "-easing").match(/cubic-bezier\(([^)]+)\)/); return m ? m[1].split(",").map(function(x){ return parseFloat(x); }) : [0.25, 0.1, 0.25, 1]; };
      var prim = function(k, p){ return (spec("--motion-" + k + "-" + p).match(/var\(--common-motion-(?:duration|easing|delay)-([\w-]+)\)/) || [])[1] || null; };
      var GROUPS = [["hover-in", "Hover In"], ["hover-out", "Hover Out"], ["pressed", "Pressed"], ["released", "Released"], ["selected-in", "Selected In"], ["selected-out", "Selected Out"], ["disabled", "Disabled"], ["loading", "Loading"]];
      // Palco: o componente que usa o estilo (o primeiro citado na descrição do Figma); sem uso, uma forma neutra
      var DEMO = { "hover-in-01": "button", "hover-out-01": "button", "pressed-01": "button", "disabled-01": "button", "released-01": "button",
        "hover-in-03": "banner", "hover-out-03": "banner", "pressed-06": "banner", "hover-in-04": "link", "hover-out-04": "link", "pressed-05": "link",
        "pressed-03": "checkbox", "selected-in-02": "checkbox", "selected-out-01": "checkbox", "selected-in-03": "switch", "selected-out-02": "switch",
        "selected-in-01": "accordion", "selected-in-09": "fade", "selected-out-03": "fade", "selected-in-04": "slide", "selected-out-05": "slide",
        "loading-01": "skeleton", "loading-02": "spinner" };
      var DEMO_NAME = { button: "Main Button", banner: "Banner", link: "Link", checkbox: "Checkbox", switch: "Switch", accordion: "Accordion Item", fade: "System Banner", slide: "System Banner", skeleton: "Skeleton", spinner: "Spinner", shape: "Forma neutra (sem uso definido)" };
      var st = { k: null, cat: "all", speed: 1, code: "css", cmp: [], tab: 1, loop: false, timer: 0, raf: 0 };
      var short = function(u){ var s = String(u).replace(/^[^:]+:\s*/, ""); return s.length > 34 ? s.slice(0, 33) + "…" : s; };
      function mk(tagName, attrs){ var n = document.createElement(tagName); Object.keys(attrs || {}).forEach(function(a){ if (attrs[a] != null && attrs[a] !== false) n.setAttribute(a, attrs[a] === true ? "" : attrs[a]); }); return n; }
      function tag(parent, label, app){ return parent.appendChild(mk("cds-tag", { label: label, appearance: app || "neutral", "show-lead-item": "false" })); }
      function copy(text){ try { navigator.clipboard.writeText(text); } catch (e) {} if (CDS.docToast) CDS.docToast("Copiado"); }
      function btn(label, accent){ return mk("cds-main-button", { label: label, kind: "default", appearance: accent ? "accent" : "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }); }
      // Filter Chips do DS, escolha única
      function chips(label, opts, value, onChange, hideLabel){
        var wrap = el("div", "pg-ms-chips"); if (!hideLabel) wrap.appendChild(el("span", "pg-ms-chips__label", label));
        var g = wrap.appendChild(mk("cds-chips-group", { kind: "filter", "role-kind": "multiple", label: label }));
        opts.forEach(function(o){ var c = g.appendChild(mk("cds-filter-chip", { label: o[1], "show-lead-icon": "false", size: "small", selected: o[0] === value })); c.dataset.v = o[0];
          c.addEventListener("cds-change", function(e){ e.stopPropagation(); [].forEach.call(g.querySelectorAll("cds-filter-chip"), function(x){ CDS.attr(x, "selected", x === c); }); onChange(o[0]); }); });
        wrap.set = function(v){ [].forEach.call(g.querySelectorAll("cds-filter-chip"), function(x){ CDS.attr(x, "selected", x.dataset.v === String(v)); }); };
        return wrap;
      }

      var s = section(root, "Motion Styles em ação", keys.length);
      s.appendChild(el("p", "pg-doc-p", "Escolha um estilo na lista: o palco toca a transição no componente que usa ele. Arraste a linha do tempo para ver quadro a quadro, desacelere ou compare até três estilos."));
      var box = s.appendChild(el("div", "pg-ms")); box.style.setProperty("--_k", "1"); box.tabIndex = -1;
      var filterBar = box.appendChild(el("div", "pg-ms-bar"));
      filterBar.appendChild(chips("Interação", [["all", "Todas"]].concat(GROUPS), "all", function(v){ st.cat = v; filter(); }, true));
      var ws = box.appendChild(el("div", "pg-ms-ws"));
      // ---------- lista ----------
      var listCol = ws.appendChild(el("div", "pg-ms-list")); listCol.setAttribute("aria-label", "Motion Styles");
      var rows = {};
      GROUPS.forEach(function(G){
        var ks = keys.filter(function(k){ return groupOf(k) === G[0]; }); if (!ks.length) return;
        ks.sort(function(a, b){ return (usage(b) ? 1 : 0) - (usage(a) ? 1 : 0) || a.localeCompare(b); });
        var sec = listCol.appendChild(el("section", "pg-ms-group")); sec.dataset.g = G[0];
        sec.appendChild(el("h4", "pg-ms-group__head", G[1]));
        ks.forEach(function(k){
          var d = ms(k, "timing") + "ms" + (ms(k, "delay") ? " · delay " + ms(k, "delay") + "ms" : "") + " · " + (usage(k) ? short(usage(k)) : "sem uso");
          var r = sec.appendChild(mk("cds-selection-list-item", { label: title(k), description: d, "show-description": "true", "show-lead-item": "false", "show-divider": "false",
            "trailing-item": "none" }));
          r.dataset.k = k;
          r.addEventListener("cds-change", function(e){ e.stopPropagation(); select(k); });
          rows[k] = r;
        });
      });
      // ---------- palco ----------
      var stageCol = ws.appendChild(el("div", "pg-ms-stage"));
      var stHead = stageCol.appendChild(el("div", "pg-ms-stage__head"));
      var stTitle = stHead.appendChild(el("span", "pg-ms-stage__title")), stWhen = stHead.appendChild(el("span", "pg-ms-stage__when"));
      var stage = stageCol.appendChild(el("div", "pg-ms-stage__area")); stage.setAttribute("aria-live", "polite");
      var stDemoName = stageCol.appendChild(el("p", "pg-ms-stage__note"));
      var scrub = stageCol.appendChild(mk("cds-slider", { label: "Linha do tempo", min: "0", max: "100", step: "1", value: "100", "show-stops": "false", "show-value-indicator": "false", "value-text": "{v}%" }));
      scrub.classList.add("pg-ms-scrub");
      var tlLegend = stageCol.appendChild(el("p", "pg-ms-stage__note"));
      var tr = stageCol.appendChild(el("div", "pg-ms-tools pg-ms-transport"));
      var playB = tr.appendChild(btn("Tocar", true)); playB.addEventListener("click", function(){ play(); });
      var loopS = tr.appendChild(mk("cds-switch", { label: "Loop", status: "unselected" }));
      loopS.addEventListener("cds-change", function(e){ e.stopPropagation(); st.loop = !!(e.detail && (e.detail.status === "selected" || e.detail.selected || e.detail.checked)); if (st.loop) play(); else clearTimeout(st.timer); });
      var speedC = tr.appendChild(chips("Velocidade", [["1", "1×"], ["2", "0,5×"], ["4", "0,25×"]], "1", function(v){ setSpeed(+v); }, true));
      var cmpRow = stageCol.appendChild(el("div", "pg-ms-tools"));
      var addCmp = cmpRow.appendChild(btn("Comparar")); addCmp.addEventListener("click", function(){ toggleCmp(st.k); });
      var cmpChips = cmpRow.appendChild(el("div", "pg-ms-tags"));
      var keysHint = stageCol.appendChild(el("p", "pg-ms-stage__note", "Atalhos: espaço toca · ↑ ↓ trocam o estilo · 1, 2 e 3 mudam a velocidade · L liga o loop"));
      // ---------- inspetor ----------
      var insp = ws.appendChild(el("div", "pg-ms-insp"));
      var inspHead = insp.appendChild(el("div", "pg-ms-insp__head"));
      var inTitle = inspHead.appendChild(el("span", "pg-ms-stage__title")), inTags = inspHead.appendChild(el("div", "pg-ms-tags"));
      var tabs = insp.appendChild(mk("cds-fixed-tab", { label: "Detalhe do estilo", "active-item": "1" }));
      ["Curva", "Valores", "Código"].forEach(function(t){ tabs.appendChild(mk("cds-tab-item", { label: t })); });
      var panel = insp.appendChild(el("div", "pg-ms-insp__panel"));
      tabs.addEventListener("cds-change", function(e){ e.stopPropagation(); st.tab = (e.detail && e.detail.index) || 1; renderInsp(st.k); });

      // ---------- curva e linha do tempo (peças do playground) ----------
      function curve(k){
        var b = bez(k), w = el("span", "pg-ms-curve"); w.setAttribute("aria-hidden", "true");
        var P = function(x, y){ return (x * 100).toFixed(1) + " " + ((1 - y) * 100).toFixed(1); };
        w.innerHTML = '<svg viewBox="-6 -6 112 112" preserveAspectRatio="none"><path class="pg-ms-curve__grid" d="M0 100H100M0 0V100"/><path class="pg-ms-curve__line" d="M' + P(0, 0) + " C" + P(b[0], b[1]) + " " + P(b[2], b[3]) + " " + P(1, 1) + '"/></svg>';
        var dx = w.appendChild(el("span", "pg-ms-curve__dx")), dy = dx.appendChild(el("span", "pg-ms-curve__dy")); dy.appendChild(el("span", "pg-ms-curve__dot"));
        w._dx = dx; w._dy = dy; return w;
      }
      function timeline(k){
        var t = ms(k, "timing"), d = ms(k, "delay"), max = 800, w = el("div", "pg-ms-tl");
        var track = w.appendChild(el("div", "pg-ms-tl__track")); track.setAttribute("aria-hidden", "true");
        if (d){ var sd = track.appendChild(el("span", "pg-ms-tl__delay")); sd.style.width = (d / max * 100) + "%"; }
        var sv = track.appendChild(el("span", "pg-ms-tl__dur")); sv.style.width = (Math.min(t, max - d) / max * 100) + "%";
        var ruler = w.appendChild(el("div", "pg-ms-tl__ruler")); ruler.setAttribute("aria-hidden", "true");
        [0, 200, 400, 600, 800].forEach(function(x){ ruler.appendChild(el("span", null, x + "ms")); });
        return w;
      }
      var curveEl = null;
      function curveAnims(k){
        if (!curveEl || !curveEl._dx.animate) return [];
        var t = ms(k, "timing") * st.speed, d = ms(k, "delay") * st.speed, e = val("--motion-" + k + "-easing") || "linear";
        curveEl._dx.getAnimations().concat(curveEl._dy.getAnimations()).forEach(function(a){ a.cancel(); });
        return [curveEl._dx.animate([{ transform: "translateX(0)" }, { transform: "translateX(100%)" }], { duration: t, delay: d, easing: "linear", fill: "both" }),
          curveEl._dy.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], { duration: t, delay: d, easing: e, fill: "both" })];
      }
      // ---------- código ----------
      function codeFor(k){
        var t = ms(k, "timing"), d = ms(k, "delay"), pT = prim(k, "timing"), pE = prim(k, "easing"), b = bez(k).join(", ");
        var SD = /^(short|medium|long)-0[1-4]$/, SE = /^(systemic-default|systemic-accelerate|expressive-decelerate)$/;
        var camel = function(x){ return x.replace(/-(\w)/g, function(_, c){ return c.toUpperCase(); }); };
        if (st.code === "css") return "transition: background-color var(--motion-" + k + "-timing) var(--motion-" + k + "-easing)" + (hasD(k) ? " var(--motion-" + k + "-delay)" : "") + ";";
        if (st.code === "react") return "@include motion-transition(background-color, " + (pT && SD.test(pT) ? pT : t + "ms") + ", " + (pE && SE.test(pE) ? pE : "cubic-bezier(" + b + ")") + (d ? ", " + d + "ms" : "") + ");";
        return (d ? "// espera " + d + "ms antes de animar\n" : "") + "AnimatedContainer(\n  duration: " + (pT && SD.test(pT) ? "context.castanhaMotionDuration(CastanhaMotionDuration." + camel(pT) + ")" : "Duration(milliseconds: " + t + ")") +
          ",\n  curve: " + (pE && SE.test(pE) ? "CastanhaMotionEasing." + camel(pE) + ".curve" : "const Cubic(" + b + ")") + ",\n  …\n)";
      }
      function codeNote(k){
        var pT = prim(k, "timing"), pE = prim(k, "easing"), out = [];
        if (st.code === "css") return "Tokens do playground (lidos do Figma). No castanha-tokens ainda não existe motion.";
        if (!pT || !/^(short|medium|long)-0[1-4]$/.test(pT)) out.push("a duração fica fora da escala do pacote e entra em ms");
        if (!pE || !/^(systemic-default|systemic-accelerate|expressive-decelerate)$/.test(pE)) out.push("a curva fica fora da escala e entra como " + (st.code === "react" ? "cubic-bezier" : "Cubic"));
        if (ms(k, "delay")) out.push("o delay não tem token e entra em ms");
        return (st.code === "react" ? "Mixin do castanha-react (_motion.scss)." : "Escala do castanha_flutter (castanha_motion_scale.dart).") + (out.length ? " Neste estilo, " + out.join(", ") + "." : "");
      }
      // ---------- inspetor ----------
      function renderInsp(k){
        panel.innerHTML = ""; curveEl = null;
        if (st.tab === 1){
          curveEl = panel.appendChild(curve(k));
          panel.appendChild(timeline(k));
          panel.appendChild(el("p", "pg-ms-insp__text", usage(k) ? "Usado em: " + usage(k) : "Sem uso definido nos componentes. Fica disponível para casos novos."));
        } else if (st.tab === 2){
          var dl = panel.appendChild(el("cmp-definition-list", "pg-el-parts")).listEl;
          [["Duração", "timing"], ["Curva", "easing"], ["Delay", "delay"]].forEach(function(r){
            var n = "--motion-" + k + "-" + r[1]; if (r[1] === "delay" && !hasD(k)) return;
            dl.appendChild(el("dt", null, r[0])); var dd = dl.appendChild(el("dd")), target = (spec(n).match(/var\((--[^)]+)\)/) || [])[1];
            dd.appendChild(code((target ? figmaName(target) + " · " : "") + val(n), n));
          });
          panel.appendChild(el("p", "pg-ms-insp__text", "Gatilho: " + (TRIGGER[groupOf(k)] || "") + ". Motion Style → Brand Style (Common/Motion/*) → valor."));
        } else {
          panel.appendChild(chips("Código", [["css", "CSS"], ["react", "React"], ["flutter", "Flutter"]], st.code, function(v){ st.code = v; pre.textContent = codeFor(k); note.textContent = codeNote(k); }, true));
          var pre = panel.appendChild(el("pre", "pg-ms-code")); pre.textContent = codeFor(k);
          var note = panel.appendChild(el("p", "pg-ms-insp__text", codeNote(k)));
          var cb = panel.appendChild(btn("Copiar código")); cb.addEventListener("click", function(){ copy(pre.textContent); });
        }
      }
      // ---------- palco: componente(s) com o estilo ----------
      function demoFor(kind){
        if (kind === "button") return mk("cds-main-button", { label: "Pagar", kind: "default", appearance: "accent", "show-lead-icon": "false", "show-trailing-icon": "false" });
        if (kind === "banner") return mk("cds-banner", { kind: "illustration", illustration: "notificacoes/sino", title: "Novidades no Caju", description: "Confira o que chegou para você.", "show-cta": "false" });
        if (kind === "link") return mk("cds-link", { label: "Ver extrato", href: "#", "show-trailing-item": "true" });
        if (kind === "checkbox") return mk("cds-checkbox", { label: "Aceito os termos", status: "unselected" });
        if (kind === "switch") return mk("cds-switch", { label: "Notificações", status: "unselected" });
        if (kind === "accordion"){ var acc = mk("cds-accordion-item", { label: "Como funciona o saldo?", description: "Toque para ver a resposta", "show-description": "true", "show-lead-item": "false", collapsed: true });
          // conteúdo do Slot, como no playground do Accordion Item: mostra a área que abre e fecha
          acc.appendChild(el("p", "pg-ms-acc-slot", "O saldo cai no dia do depósito da empresa. Você usa no app, no cartão físico ou no virtual, e acompanha cada compra no extrato.")); return acc; }
        if (kind === "fade" || kind === "slide"){ var clip = el("div", "pg-ms-clip"); clip.appendChild(mk("cds-system-banner", { label: "Pagamento confirmado", text: "O comprovante chegou no seu e-mail.", "show-close-button": "false" })); return clip; }
        if (kind === "skeleton") return mk("cds-skeleton", {});
        if (kind === "spinner") return mk("cds-spinner", {});
        return el("span", "pg-ms-shape");
      }
      var demos = []; // [{ k, wrap, node }]
      function buildStage(){
        var k = st.k, kind = DEMO[k] || "shape"; stage.innerHTML = ""; demos = [];
        var list = st.cmp.length > 1 && st.cmp.indexOf(k) >= 0 ? st.cmp : [k];
        stage.classList.toggle("is-cmp", list.length > 1); stage.classList.toggle("is-stack", list.length > 1 && /^(banner|accordion|fade|slide|skeleton)$/.test(kind));
        list.forEach(function(kk){
          var cell = stage.appendChild(el("div", "pg-ms-cell"));
          var wrap = cell.appendChild(el("div", "pg-ms-demo is-" + kind)), node = wrap.appendChild(demoFor(kind));
          wrap.style.setProperty("--_t", "var(--motion-" + kk + "-timing)"); wrap.style.setProperty("--_e", "var(--motion-" + kk + "-easing)"); wrap.style.setProperty("--_d", hasD(kk) ? "var(--motion-" + kk + "-delay)" : "0ms");
          if (list.length > 1) cell.appendChild(el("span", "pg-ms-cell__label", title(kk) + " · " + ms(kk, "timing") + "ms"));
          demos.push({ k: kk, wrap: wrap, node: node.matches && node.matches(".pg-ms-clip") ? node.firstChild : node, kind: kind });
        });
        stDemoName.textContent = (kind === "fade" || kind === "slide" ? "System Banner entrando e saindo" : DEMO_NAME[kind]) + (list.length > 1 ? " · comparando " + list.length + " estilos com o mesmo componente" : "") + ". Passe o mouse ou clique nele: o estilo vale também na interação real.";
      }
      function setState(D, g, end){
        var n = D.node, kind = D.kind;
        var S = function(v){ if (v) n.setAttribute("state", v); else n.removeAttribute("state"); };
        if (kind === "shape" || kind === "fade" || kind === "slide"){ D.wrap.classList.toggle("is-on", end === (g !== "hover-out" && g !== "selected-out" && g !== "released")); return; }
        if (g === "hover-in") S(end ? "hovered" : null);
        else if (g === "hover-out") S(end ? null : "hovered");
        else if (g === "pressed") S(end ? "pressed" : "hovered");
        else if (g === "released") S(end ? "hovered" : "pressed");
        else if (g === "disabled"){ if (end) n.setAttribute("disabled", ""); else n.removeAttribute("disabled"); }
        else if (g === "selected-in" || g === "selected-out"){ var on = g === "selected-in" ? end : !end;
          if (kind === "accordion"){ if (on) n.removeAttribute("collapsed"); else n.setAttribute("collapsed", ""); } else n.setAttribute("status", on ? "selected" : "unselected"); }
      }
      var total = function(){ return Math.max.apply(null, demos.map(function(D){ return ms(D.k, "timing") + ms(D.k, "delay"); }).concat([ms(st.k, "timing") + ms(st.k, "delay")])) * st.speed; };
      // dispara do início ao fim e devolve as animações (transições CSS do componente + a curva)
      function start(){
        var g = groupOf(st.k);
        demos.forEach(function(D){ D.wrap.classList.add("is-reset"); setState(D, g, false); });
        void stage.offsetWidth;
        demos.forEach(function(D){ D.wrap.classList.remove("is-reset"); });
        void stage.offsetWidth;
        demos.forEach(function(D){ setState(D, g, true); });
        var a = []; demos.forEach(function(D){ if (D.wrap.getAnimations) a = a.concat(D.wrap.getAnimations({ subtree: true })); });
        return a.concat(curveAnims(st.k));
      }
      function play(){
        if (!st.k) return; clearTimeout(st.timer); cancelAnimationFrame(st.raf);
        if (groupOf(st.k) === "loading"){ curveAnims(st.k); return; }
        if (reduced){ demos.forEach(function(D){ setState(D, groupOf(st.k), true); }); return; }
        var anims = start(), T = total(), t0 = performance.now();
        (function tick(){ var f = Math.min(1, (performance.now() - t0) / (T || 1)); CDS.attr(scrub, "value", String(Math.round(f * 100)));
          if (f < 1) st.raf = requestAnimationFrame(tick); })();
        if (st.loop) st.timer = setTimeout(play, T + 700);
      }
      // linha do tempo arrastável: reinicia, pausa e leva cada animação ao quadro f (0 a 1)
      function seek(f){
        if (!st.k || groupOf(st.k) === "loading") return; clearTimeout(st.timer); cancelAnimationFrame(st.raf);
        var anims = start(), T = total();
        anims.forEach(function(a){ try { a.pause(); a.currentTime = f * T; } catch (e) {} });
      }
      scrub.addEventListener("cds-change", function(e){ e.stopPropagation(); var v = e.detail && e.detail.value != null ? +e.detail.value : +scrub.getAttribute("value"); seek(v / 100); });
      scrub.addEventListener("input", function(){ var v = +scrub.getAttribute("value"); if (!isNaN(v)) seek(v / 100); });
      function setSpeed(v){ st.speed = v; box.style.setProperty("--_k", String(v)); speedC.set(String(v)); legend(); play(); }
      function legend(){ var k = st.k, t = ms(k, "timing"), d = ms(k, "delay"); tlLegend.textContent = (d ? "Espera " + d + "ms e anima " : "Anima ") + t + "ms" + (st.speed > 1 ? ", tocando " + (st.speed === 2 ? "0,5×" : "0,25×") + " (" + Math.round((t + d) * st.speed) + "ms)" : "") + ". Arraste para ver quadro a quadro."; }
      // ---------- comparar ----------
      function toggleCmp(k){
        var i = st.cmp.indexOf(k); if (i >= 0) st.cmp.splice(i, 1); else { if (st.cmp.indexOf(st.k) < 0 && k !== st.k) st.cmp.push(st.k); st.cmp.push(k); while (st.cmp.length > 3) st.cmp.shift(); }
        if (st.cmp.length === 1 && st.cmp[0] === st.k && i < 0){ /* primeiro clique: guarda o atual e espera o próximo */ }
        renderCmp(); buildStage(); play();
      }
      function renderCmp(){
        cmpChips.innerHTML = "";
        st.cmp.forEach(function(k){ var c = cmpChips.appendChild(mk("cds-input-chip", { label: title(k), size: "small", "show-lead-icon": "false" })); c.addEventListener("cds-remove", function(){ toggleCmp(k); }); });
        CDS.attr(addCmp, "label", st.cmp.indexOf(st.k) >= 0 ? "Tirar da comparação" : st.cmp.length ? "Comparar com este" : "Comparar");
        if (st.cmp.length === 1) cmpChips.appendChild(el("span", "pg-ms-stage__note", "Escolha outro estilo e clique em Comparar com este."));
      }
      // ---------- filtro, seleção e teclado ----------
      function visible(){ return [].map.call(listCol.querySelectorAll(".pg-ms-group:not([hidden]) [data-k]"), function(r){ return r.dataset.k; }); }
      function filter(){
        [].forEach.call(listCol.querySelectorAll(".pg-ms-group"), function(sec){ sec.hidden = !(st.cat === "all" || sec.dataset.g === st.cat); });
        var v = visible(); if (v.length && v.indexOf(st.k) < 0) select(v[0]);
      }
      function select(k){
        if (!k) return;
        Object.keys(rows).forEach(function(x){ CDS.attr(rows[x], "is-active", x === k); });
        st.k = k; stTitle.textContent = title(k); stWhen.textContent = TRIGGER[groupOf(k)] || "";
        inTitle.textContent = title(k); inTags.innerHTML = ""; tag(inTags, usage(k) ? "Em uso" : "Sem uso", usage(k) ? "positive" : "informative"); if (ms(k, "delay")) tag(inTags, "Com delay", "informative");
        var row = rows[k]; if (row && row.scrollIntoView){ var r = row.getBoundingClientRect(), c = listCol.getBoundingClientRect(); if (r.top < c.top || r.bottom > c.bottom) listCol.scrollTop += r.top - c.top - c.height / 3; }
        buildStage(); renderInsp(k); renderCmp(); legend();
        if (LAB.set) LAB.set(spec("--motion-" + k + "-easing").replace(/^var\(|\)$/g, ""), spec("--motion-" + k + "-timing").replace(/^var\(|\)$/g, ""), hasD(k) ? spec("--motion-" + k + "-delay").replace(/^var\(|\)$/g, "") : null);
        setTimeout(play, 120);
      }
      box.addEventListener("keydown", function(e){
        if (e.target.closest && e.target.closest("input, textarea, [role=slider]")) return;
        var v = visible(), i = v.indexOf(st.k);
        if (e.key === " " || e.key === "Spacebar"){ e.preventDefault(); play(); }
        else if (e.key === "ArrowDown" && i < v.length - 1){ e.preventDefault(); select(v[i + 1]); }
        else if (e.key === "ArrowUp" && i > 0){ e.preventDefault(); select(v[i - 1]); }
        else if (e.key === "1" || e.key === "2" || e.key === "3"){ setSpeed({ "1": 1, "2": 2, "3": 4 }[e.key]); }
        else if (e.key === "l" || e.key === "L"){ st.loop = !st.loop; CDS.attr(loopS, "status", st.loop ? "selected" : "unselected"); if (st.loop) play(); else clearTimeout(st.timer); }
      });
      LAB.first = function(){ select(keys[0]); };
      filter();
      select(keys[0]);
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
    animations: function(root){ library(root, "animations"); },
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
  // Duração e Delay (D365): régua em escala com a pista (o ponto anda no tempo do token) + cards por família.
  // O que passa de 1s (Extended/01) fica num card à parte para não esticar a régua. Hover toca, clique copia e leva ao laboratório.
  function runs(root, title, list, prefix, kind){
    var s = section(root, title, list.length), wrap = s.appendChild(el("div", "pg-tok-scale"));
    var inScale = list.filter(function(n){ return msOf(val(n)) <= 1000; }), out = list.filter(function(n){ return msOf(val(n)) > 1000; });
    var max = Math.max.apply(null, inScale.map(function(n){ return msOf(val(n)); }).concat([1]));
    var fams = []; inScale.forEach(function(n){ var f = n.slice(prefix.length).replace(/-\d+$/, ""); if (fams.indexOf(f) < 0) fams.push(f); });
    var famName = function(f){ return f.split("-").map(cap).join(" "); };
    // régua: faixas por família, marcas de cada token e a pista
    var ruler = wrap.appendChild(el("div", "pg-tok-scale__ruler")); ruler.setAttribute("aria-hidden", "true");
    var bands = ruler.appendChild(el("div", "pg-tok-scale__bands")), marks = ruler.appendChild(el("div", "pg-tok-scale__marks"));
    var lane = ruler.appendChild(el("div", "pg-tok-scale__lane")), dot = lane.appendChild(el("span", "pg-tok-scale__dot"));
    var axis = ruler.appendChild(el("div", "pg-tok-scale__axis"));
    var pct = function(v){ return Math.round(v / max * 1000) / 10 + "%"; };
    fams.forEach(function(f, i){
      var vals = inScale.filter(function(n){ return n.slice(prefix.length).replace(/-\d+$/, "") === f; }).map(function(n){ return msOf(val(n)); });
      var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), b = bands.appendChild(el("span", "pg-tok-scale__band" + (i % 2 ? " is-alt" : ""), famName(f)));
      b.style.left = pct(i ? lo : 0); b.style.width = "calc(" + pct(hi - (i ? lo : 0)) + " + var(--common-sizes-8))";
    });
    var markOf = {};
    inScale.forEach(function(n){ var m = marks.appendChild(el("span", "pg-tok-scale__mark")); m.style.left = pct(msOf(val(n))); markOf[n] = m; });
    [0, max / 4, max / 2, max * 3 / 4, max].forEach(function(v){ axis.appendChild(el("span", null, Math.round(v) + "ms")); });
    var legend = wrap.appendChild(el("p", "pg-tok-scale__legend", "Passe o mouse num token para ver o tempo dele na pista. Clique para copiar a variável e levar ao laboratório."));
    function run(n){
      Object.keys(markOf).forEach(function(x){ markOf[x].classList.toggle("is-on", x === n); });
      var v = msOf(val(n)); legend.textContent = label(n, prefix).replace(/-(\d+)$/, "/$1") + " · " + val(n) + (kind === "delay" ? ": o ponto espera esse tempo e depois anda em 200ms." : ": o ponto atravessa a pista nesse tempo.");
      if (reduced || !dot.animate) return;
      dot.getAnimations().forEach(function(a){ a.cancel(); });
      dot.animate([{ left: "0%" }, { left: kind === "delay" ? "calc(100% - var(--common-sizes-12))" : "calc(" + pct(v) + " - var(--common-sizes-12) * " + (v / max) + ")" }],
        { duration: kind === "delay" ? 200 : v, delay: kind === "delay" ? v : 0, easing: "linear", fill: "both" });
    }
    // cards por família
    var grid = wrap.appendChild(el("div", "pg-tok-scale__fams"));
    function card(f, items, note){
      var c = grid.appendChild(el("div", "pg-tok-fam"));
      var vals = items.map(function(n){ return msOf(val(n)); });
      var h = c.appendChild(el("div", "pg-tok-fam__head")); h.appendChild(el("h4", "pg-doc-h4", note ? "Fora da escala" : famName(f)));
      h.appendChild(el("span", "pg-tok-fam__range", vals.length > 1 ? Math.min.apply(null, vals) + " a " + Math.max.apply(null, vals) + "ms" : vals[0] + "ms"));
      var use = note || (kind === "duration" ? DUR_USE[f] : null); if (use) c.appendChild(el("p", "pg-tok-fam__use", use));
      items.forEach(function(n){
        var row = c.appendChild(tile("pg-tok-fam__row", n, function(){ run(n); }));
        row.addEventListener("click", function(){ if (LAB.set) LAB.set(null, kind === "duration" ? n : null, kind === "delay" ? n : null); });
        row.appendChild(el("span", "pg-tok__name", label(n, prefix).replace(/-(\d+)$/, "/$1")));
        row.appendChild(code(val(n), n));
      });
    }
    fams.forEach(function(f){ card(f, inScale.filter(function(n){ return n.slice(prefix.length).replace(/-\d+$/, "") === f; })); });
    if (out.length) card("extended", out, "Passa de 1s e fica fora da régua: para loops longos e esperas contínuas, não para transições.");
  }
  function fold(t){ return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  // Biblioteca de ícones/ilustrações: Search Input + Filter Chips + grade de tiles (C87) + painel de detalhe com Tags e Main Buttons do DS
  // Player Lottie (scripts/vendor/lottie_svg.min.js, a engine do lottie-react do castanha-react): carregado sob demanda
  var lottieP = null;
  function lottieLib(){
    if (window.lottie) return Promise.resolve(window.lottie);
    if (!lottieP) lottieP = new Promise(function(ok, ko){ var s = document.createElement("script"); s.src = "scripts/vendor/lottie_svg.min.js"; s.onload = function(){ ok(window.lottie); }; s.onerror = ko; document.head.appendChild(s); });
    return lottieP;
  }
  var lottieData = {};
  function lottieJson(src){ return lottieData[src] || (lottieData[src] = fetch(src).then(function(r){ return r.json(); })); }
  // Monta a animação no container; parada no meio quando o sistema pede menos movimento ou quando `still`
  function lottieMount(box, src, opts){
    opts = opts || {};
    return Promise.all([lottieLib(), lottieJson(src)]).then(function(r){
      box.innerHTML = "";
      var a = r[0].loadAnimation({ container: box, renderer: "svg", loop: true, autoplay: false, animationData: JSON.parse(JSON.stringify(r[1])), rendererSettings: { preserveAspectRatio: "xMidYMid meet" } });
      a.addEventListener("DOMLoaded", function(){ if (opts.play && !reduced) a.play(); else a.goToAndStop(Math.round(a.totalFrames / 2), true); });
      return a;
    });
  }
  function library(root, kind){
    var A = CDS.assets || {}, isIcon = kind === "icons", isAnim = kind === "animations", items = [], cats = [];
    if (isIcon){
      var meta = {}; (A.icons || []).forEach(function(i){ meta[i.name] = i; });
      (A.iconBuckets || []).filter(function(b){ return !b.glyphs; }).forEach(function(b){
        cats.push([b.id, b.name]);
        b.icons.forEach(function(n){ var m = meta[n] || {}; items.push({ id: n, name: n, cat: b.id, catName: b.name, cls: b.deprecated ? "" : m.cls, deprecated: !!b.deprecated, file: "assets/icons/" + b.id + "/" + n + ".svg", keywords: m.keywords || [] }); });
      });
    } else if (isAnim){
      var am = {}; (A.animations || []).forEach(function(i){ am[i.name] = i; });
      (A.animationBuckets || []).forEach(function(b){ cats.push([b.id, b.name]);
        b.items.forEach(function(k){ var m = am[k]; if (!m) return; items.push({ id: k, name: k, cat: b.id, catName: b.name, src: m.src, figma: m.figma, node: m.node, duration: m.duration, w: m.w, h: m.h, kb: m.kb, react: m.react, flutter: m.flutter, description: "", keywords: [] }); }); });
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
    [["label", isIcon ? "Buscar ícone" : isAnim ? "Buscar animação" : "Buscar ilustração"], ["placeholder", isIcon ? "Nome ou palavra-chave (ex.: cartão, seta, pix)" : isAnim ? "Nome ou categoria (ex.: cartão, documentos, sino)" : "Nome, categoria ou uso (ex.: cartão, pix, erro)"], ["show-required", "false"], ["show-supporting-content", "false"]].forEach(function(a){ search.setAttribute(a[0], a[1]); });
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
    var body = box.appendChild(el("div", "pg-ic-body")), gridEl = body.appendChild(el("ul", "pg-ic-grid" + (isIcon ? "" : " is-ills") + (isAnim ? " is-anims" : ""))), panel = body.appendChild(el("aside", "pg-ic-panel"));
    // Animações: cada card carrega a Lottie quando aparece na tela (parada no meio) e toca enquanto o mouse está sobre ele
    var seen = isAnim && "IntersectionObserver" in window ? new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; seen.unobserve(e.target);
      var it = e.target._it; lottieMount(e.target, it.src).then(function(a){ it.anim = a; }).catch(function(){}); }); }, { rootMargin: "200px" }) : null;
    panel.setAttribute("aria-label", "Detalhe");
    items.forEach(function(it, i){
      // Tile = composição <cmp-clickable-card> em modo botão; selecionado = current (aria-pressed)
      var li = gridEl.appendChild(el("li")), b = el("cmp-clickable-card", "pg-ic-tile");
      b.setAttribute("label", it.name); b.setAttribute("control-label", it.name + " — ver detalhe"); b.setAttribute("current", "false");
      if (isIcon) b.setAttribute("media", "auto");
      b.style.setProperty("--_i", String(Math.min(i, 24)));
      if (isIcon){ var ic = b.appendChild(el("span", "cds-icon pg-ic-glyph " + (it.cls || ""))); ic.setAttribute("aria-hidden", "true");
        if (!it.cls){ var u = 'url("' + it.file + '")'; ic.style.webkitMaskImage = u; ic.style.maskImage = u; } }
      else if (isAnim){ var pl = b.appendChild(el("span", "pg-an-player")); pl.setAttribute("aria-hidden", "true"); pl._it = it;
        if (seen) seen.observe(pl); else lottieMount(pl, it.src).then(function(a){ it.anim = a; }).catch(function(){});
        b.addEventListener("mouseenter", function(){ if (it.anim && !reduced) it.anim.play(); });
        b.addEventListener("mouseleave", function(){ if (it.anim) it.anim.goToAndStop(Math.round(it.anim.totalFrames / 2), true); }); }
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
      else if (isAnim){ if (panel._anim){ panel._anim.destroy(); panel._anim = null; }
        var big = prev.appendChild(el("span", "pg-an-player is-big")); big.setAttribute("role", "img"); big.setAttribute("aria-label", "Animação " + it.name);
        lottieMount(big, it.src, { play: true }).then(function(a){ if (st.sel === it) panel._anim = a; else a.destroy(); }).catch(function(){ big.textContent = "Não foi possível carregar a animação."; }); }
      else { var im3 = prev.appendChild(el("img", "pg-ic-img is-big")); im3.alt = it.name; im3.src = it.src; }
      panel.appendChild(el("span", "pg-ic-panel__title", it.name));
      var dl = panel.appendChild(el("cmp-definition-list", "pg-el-parts")).listEl;
      [["Categoria", it.catName], isIcon ? null : ["Figma", isAnim ? it.catName + " › " + it.figma : it.figma], isIcon || isAnim ? null : ["Tamanho", it.size], isAnim ? ["Duração", String(it.duration).replace(".", ",") + " s em loop"] : null, isAnim ? ["Arquivo", it.w + " × " + it.h + " · " + it.kb + " KB"] : null, it.deprecated ? ["Status", "Deprecated"] : null].filter(Boolean).forEach(function(r){ if (!r[1]) return; dl.appendChild(el("dt", null, r[0])); dl.appendChild(el("dd", null, r[1])); });
      if (it.description) panel.appendChild(el("p", "pg-doc-p", it.description));
      if (it.keywords.length){ var tags = panel.appendChild(el("div", "pg-ic-tags"));
        it.keywords.forEach(function(k){ var t = tags.appendChild(document.createElement("cds-tag")); t.setAttribute("label", k); t.setAttribute("appearance", "neutral"); t.setAttribute("show-lead-item", "false"); }); }
      if (isAnim){
        // Animações: o nome é o do castanha-motion (frame-nome); React <Motion> e Flutter CastanhaMotion
        var P = A.animationPackage || { name: "@caju-beneficios/castanha-motion", dart: "castanha_motion", dartClass: "CastanhaMotion" };
        var rcode = '<Motion name="' + it.id + '" loop autoplay />', fcode = "Lottie.asset(" + P.dartClass + "." + it.flutter + ", package: '" + P.dart + "')";
        panel.appendChild(el("span", "pg-ic-panel__sub", "No React"));
        var adl = panel.appendChild(el("cmp-definition-list", "pg-el-parts")).listEl;
        [["Lazy", rcode], ["Eager", "import { " + it.react + " } from '" + P.name + "';"]].forEach(function(r){ adl.appendChild(el("dt", null, r[0])); var dd = adl.appendChild(el("dd")); dd.appendChild(el("code", "pg-tok__code", r[1])); });
        panel.appendChild(el("span", "pg-ic-panel__sub", "No Flutter"));
        var fdl = panel.appendChild(el("cmp-definition-list", "pg-el-parts")).listEl;
        fdl.appendChild(el("dt", null, "Asset")); var fdd = fdl.appendChild(el("dd")); fdd.appendChild(el("code", "pg-tok__code", fcode));
        var aacts = panel.appendChild(el("div", "pg-ic-actions"));
        if (CDS.docMainButton){
          var bp = aacts.appendChild(CDS.docMainButton(reduced ? "Tocar" : "Pausar"));
          bp.addEventListener("click", function(){ var a = panel._anim; if (!a) return; if (a.isPaused){ a.play(); bp.setAttribute("label", "Pausar"); } else { a.pause(); bp.setAttribute("label", "Tocar"); } });
          var c1 = aacts.appendChild(CDS.docMainButton("Copiar nome")); c1.addEventListener("click", function(){ copy(it.id); });
          var c2 = aacts.appendChild(CDS.docMainButton("Copiar React")); c2.addEventListener("click", function(){ copy(rcode); });
          var c3 = aacts.appendChild(CDS.docMainButton("Copiar Flutter")); c3.addEventListener("click", function(){ copy(fcode); });
        }
        return;
      }
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
          var rdl = panel.appendChild(el("cmp-definition-list", "pg-el-parts")).listEl;
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
      count.textContent = shown + (isIcon ? (shown === 1 ? " ícone" : " ícones") : isAnim ? (shown === 1 ? " animação" : " animações") : (shown === 1 ? " ilustração" : " ilustrações")) + (q ? " para “" + st.q.trim() + "”" : "") + (st.cat === "all" ? "" : " em " + (cats.filter(function(c){ return c[0] === st.cat; })[0] || [])[1]) + ". Clique para ver o detalhe.";
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
