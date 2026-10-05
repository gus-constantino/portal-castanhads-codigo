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
  var COLOR_GROUPS = [
    ["Surface", "--common-colors-surface-"],
    ["Text", "--common-colors-text-"], ["Icons", "--common-colors-icons-"], ["Border", "--common-colors-border-"],
    ["Feedback · Positive", "--common-colors-feedback-positive-"], ["Feedback · Warning", "--common-colors-feedback-warning-"],
    ["Feedback · Negative", "--common-colors-feedback-negative-"], ["Feedback · Informative", "--common-colors-feedback-informative-"],
    ["Support", "--common-colors-support-"], ["Decorative", "--common-colors-decorative-"]
  ];
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
    colors: function(root){
      COLOR_FAMILIES.forEach(function(f){
        var subs = f[1].map(function(sb){ return [sb[0], sb[1], pick(sb[1])]; }).filter(function(sb){ return sb[2].length; });
        var total = subs.reduce(function(t, sb){ return t + sb[2].length; }, 0), sec = section(root, f[0], total);
        subs.forEach(function(sb){
          sec.appendChild(el("p", "pg-tok-sub", sb[0]));
          var g = sec.appendChild(grid());
          // opacidade: o tom aparece sobre a imagem de exemplo, para a transparência ficar visível
          sb[2].forEach(function(n){ g.appendChild(item(n, sb[1], /opacity/.test(sb[1]) ? alpha : swatch)); });
        });
      });
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
        var row = s.appendChild(tile("pg-tok-style", n));
        var sample = row.appendChild(el("span", "pg-tok-style__sample", "Castanha DS"));
        sample.style.font = "var(" + n + ")";
        if (names().indexOf(n + "-decoration") !== -1) sample.style.textDecoration = "var(" + n + "-decoration)";
        var fc = row.appendChild(el("span", "pg-tok__text"));
        fc.appendChild(el("span", "pg-tok__name", n.replace("--text-style-", "").replace(/-/, "/").split("/").map(cap).join("/")));
        fc.appendChild(code(val(n), n));
      });
    },
    radius: function(root){ group(root, "Radius", pick("--common-border-radius-"), "--common-border-radius-", function(sw, n){ sw.classList.add("pg-tok__corner"); sw.style.borderTopLeftRadius = "var(" + n + ")"; }, "is-wide"); },
    width: function(root){ group(root, "Width", pick("--common-border-width-"), "--common-border-width-", function(sw, n){ sw.classList.add("pg-tok__stroke"); sw.style.borderWidth = "var(" + n + ")"; }, "is-wide"); },
    sizes: function(root){ group(root, "Sizes", pick("--common-sizes-"), "--common-sizes-", function(sw, n){ sw.classList.add("pg-tok__size"); var b = sw.appendChild(el("span")); b.style.width = b.style.height = "var(" + n + ")"; }, "is-sizes", "is-row"); },
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
    [].forEach.call(document.querySelectorAll(".pg-tok-root code[data-token]"), function(c){ c.textContent = val(c.dataset.token); });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
