/**
 * Smoke test — monta cada playground registrado (CDS.playgrounds) em três passadas e verifica:
 *
 *   Desktop · tema claro (frame 600px, como o playground "Fluido")
 *     1. o mount não lança erro;
 *     2. o primeiro <cds-*> do preview é um custom element definido;
 *     3. o tamanho bate com tests/expected.js (±1px), quando houver referência;
 *     4. a11y básico: botão/link/controle com nome acessível, campo com rótulo, ícone decorativo com
 *        aria-hidden (ou role="img" + aria-label), <img> com alt.
 *   Tema escuro (html[data-theme="dark"]) — o mount não lança erro.
 *   Mobile (frame 360px, data-viewport="mobile") — o mount não lança erro.
 *
 * Avisos (não reprovam; vão para o CONFERIR quando forem do DS):
 *   · contraste do texto abaixo do WCAG AA (4,5:1; 3:1 para texto grande), no claro e no escuro;
 *     texto desabilitado fica de fora (o WCAG não exige);
 *   · componente mais largo que o frame mobile (360px), exceto quando ele mostra a Viewport Restriction (bloqueado pelo Figma).
 *
 * Resultado na tabela e em window.CDS_SMOKE = { pass, fail, warnings, rows } (para automação).
 */
(function(){
  "use strict";
  var TOL = 1, MOBILE_W = 360;
  var rows = [], pass = 0, fail = 0, warnings = 0;
  var stage = document.getElementById("stage"), out = document.getElementById("out");
  var exp = window.CDS_EXPECTED || {}, root = document.documentElement;
  var defs = CDS.playgrounds.filter(function(d){ return !d.resource; }).sort(function(a, b){ return a.id.localeCompare(b.id); });

  function mount(def, viewport, width){
    var frame = document.createElement("div"); frame.className = "frame"; frame.dataset.viewport = viewport;
    if (width) frame.style.width = width + "px";
    var preview = document.createElement("div"), panel = document.createElement("div");
    frame.appendChild(preview); stage.appendChild(frame);
    var error = null;
    try { def.mount({ preview: preview, panel: panel, kit: CDS.kit, readout: function(){} }); }
    catch (e){ error = e.message; }
    return { preview: preview, error: error };
  }

  // ---------- a11y básico ----------
  // O #stage é aria-hidden (fica fora da tela): a checagem de "escondido" para no preview
  function hiddenIn(el, top){
    for (var n = el; n && n !== top; n = n.parentElement){
      if (n.hidden || n.inert || n.getAttribute("aria-hidden") === "true") return true;
    }
    return false;
  }
  function accName(el){
    var v = el.getAttribute("aria-label"); if (v && v.trim()) return v.trim();
    var ids = el.getAttribute("aria-labelledby");
    if (ids) return ids.split(/\s+/).map(function(i){ var n = document.getElementById(i); return n ? n.textContent : ""; }).join(" ").trim();
    if (el.labels && el.labels.length) return [].map.call(el.labels, function(l){ return l.textContent; }).join(" ").trim();
    var img = el.querySelector && el.querySelector("img[alt]");
    return (el.textContent || "").trim() || el.getAttribute("title") || (img && img.alt) || "";
  }
  function tag(el){ return el.tagName.toLowerCase() + (el.classList[0] ? "." + el.classList[0] : ""); }
  function a11y(preview){
    var f = [];
    [].forEach.call(preview.querySelectorAll("button, a[href], [role=button], [role=tab], [role=option], [role=checkbox], [role=radio], [role=switch], [role=slider]"), function(b){
      if (!hiddenIn(b, preview) && !accName(b)) f.push("sem nome acessível: " + tag(b));
    });
    [].forEach.call(preview.querySelectorAll("input:not([type=hidden]), textarea, select"), function(i){
      if (!hiddenIn(i, preview) && !accName(i)) f.push("campo sem rótulo: " + tag(i));
    });
    [].forEach.call(preview.querySelectorAll(".cds-icon"), function(i){
      if (hiddenIn(i, preview) || (i.getAttribute("role") === "img" && i.getAttribute("aria-label"))) return;
      f.push("ícone sem aria-hidden: " + tag(i));
    });
    [].forEach.call(preview.querySelectorAll("img"), function(i){ if (!i.hasAttribute("alt")) f.push("img sem alt"); });
    return unique(f);
  }

  // ---------- Contraste (WCAG 2.x) ----------
  function rgba(s){ var m = String(s).match(/[\d.]+/g); return m ? { r: +m[0], g: +m[1], b: +m[2], a: m[3] == null ? 1 : +m[3] } : null; }
  function over(c, base){ return { r: c.r * c.a + base.r * (1 - c.a), g: c.g * c.a + base.g * (1 - c.a), b: c.b * c.a + base.b * (1 - c.a) }; }
  function lum(c){ function f(v){ v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); } return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
  // Fundo efetivo: empilha os fundos dos ancestrais até o primeiro opaco (ou o body)
  function background(el){
    var layers = [];
    for (var n = el; n && n.nodeType === 1; n = n.parentElement){
      var c = rgba(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0){ layers.push(c); if (c.a >= 1) break; }
    }
    var base = rgba(getComputedStyle(document.body).backgroundColor);
    for (var i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  }
  function contrast(preview){
    var f = [], walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT), t;
    while ((t = walker.nextNode())){
      var text = t.textContent.trim(); if (!text) continue;
      var el = t.parentElement;
      if (hiddenIn(el, preview) || el.closest("[disabled], [aria-disabled=true]")) continue;
      var cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0 || !el.getBoundingClientRect().width) continue;
      var bg = background(el), fg = over(rgba(cs.color), bg);
      var l1 = lum(fg), l2 = lum(bg), ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      var size = parseFloat(cs.fontSize), large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700);
      if (ratio < (large ? 3 : 4.5)) f.push("“" + text.slice(0, 24) + "” " + ratio.toFixed(2) + ":1");
    }
    return unique(f);
  }
  function unique(a){ return a.filter(function(x, i){ return a.indexOf(x) === i; }); }

  // ---------- Passadas ----------
  var byId = {};
  // 1. Desktop · claro: tamanho + a11y + contraste
  defs.forEach(function(def){
    var r = byId[def.id] = { id: def.id, name: def.name, errors: [], warnings: [], size: "—", expected: "—" };
    rows.push(r);
    var m = mount(def, "desktop");
    if (m.error) r.errors.push("mount: " + m.error);
    var el = Array.prototype.find.call(m.preview.querySelectorAll("*"), function(n){ return n.tagName.indexOf("CDS-") === 0; });
    if (!el) r.errors.push("nenhum <cds-*> no preview");
    else if (!customElements.get(el.tagName.toLowerCase())) r.errors.push(el.tagName.toLowerCase() + " não definido");
    else {
      var b = el.getBoundingClientRect(), w = Math.round(b.width), h = Math.round(b.height);
      r.size = w + "×" + h;
      var e = exp[def.id];
      if (e){
        r.expected = (e.w != null ? e.w : (e.minW != null ? "≥" + e.minW : "*")) + "×" + (e.h != null ? e.h : "*");
        if (e.w != null && Math.abs(w - e.w) > TOL) r.errors.push("largura " + w + " ≠ " + e.w);
        if (e.minW != null && w + TOL < e.minW) r.errors.push("largura " + w + " < " + e.minW);
        if (e.h != null && Math.abs(h - e.h) > TOL) r.errors.push("altura " + h + " ≠ " + e.h);
      } else r.errors.push("sem referência em tests/expected.js");
    }
    a11y(m.preview).forEach(function(x){ r.errors.push("a11y: " + x); });
    contrast(m.preview).forEach(function(x){ r.warnings.push("contraste (claro): " + x); });
  });
  stage.innerHTML = "";

  // 2. Tema escuro: mount + contraste
  root.setAttribute("data-theme", "dark");
  defs.forEach(function(def){
    var r = byId[def.id], m = mount(def, "desktop");
    if (m.error) r.errors.push("mount no escuro: " + m.error);
    contrast(m.preview).forEach(function(x){ r.warnings.push("contraste (escuro): " + x); });
  });
  root.setAttribute("data-theme", "light");
  stage.innerHTML = "";

  // 3. Mobile 360: mount + largura
  defs.forEach(function(def){
    var r = byId[def.id], m = mount(def, "mobile", MOBILE_W);
    if (m.error) r.errors.push("mount no mobile: " + m.error);
    // Componente que o Figma bloqueia no mobile (Viewport Restriction visível, ex.: Modal Date Picker) não conta largura
    var blocked = [].some.call(m.preview.querySelectorAll("cds-viewport-restriction"), function(v){ return v.getBoundingClientRect().width > 0 && getComputedStyle(v).display !== "none"; });
    var widest = 0;
    [].forEach.call(m.preview.children, function(c){ widest = Math.max(widest, c.getBoundingClientRect().width); });
    if (!blocked && widest > MOBILE_W + TOL) r.warnings.push("mobile: " + Math.round(widest) + "px > " + MOBILE_W + "px do frame");
  });
  stage.innerHTML = "";

  rows.forEach(function(r){
    r.ok = r.errors.length === 0;
    if (r.ok) pass++; else fail++;
    if (r.warnings.length) warnings++;
  });

  function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  out.innerHTML = '<p class="sum ' + (fail ? "bad" : "good") + '">' + pass + " ok · " + fail + " com problema · " + rows.length + " componentes" +
    ' <span class="warn-sum">· ' + warnings + " com aviso</span></p>" +
    "<p class=\"legend\">Passadas: desktop claro (tamanho, a11y, contraste) · tema escuro (mount, contraste) · mobile 360px (mount, largura). Aviso não reprova.</p>" +
    "<table><thead><tr><th></th><th>id</th><th>medido</th><th>esperado (Figma)</th><th>problema</th><th>aviso</th></tr></thead><tbody>" +
    rows.map(function(r){
      return "<tr class=\"" + (r.ok ? (r.warnings.length ? "warn" : "ok") : "ko") + "\"><td>" + (r.ok ? (r.warnings.length ? "⚠️" : "✅") : "❌") + "</td><td>" + r.id + "</td><td>" + r.size + "</td><td>" + r.expected +
        "</td><td>" + r.errors.map(esc).join("<br>") + "</td><td>" + r.warnings.map(esc).join("<br>") + "</td></tr>";
    }).join("") +
    "</tbody></table>";
  document.title = (fail ? "❌ " : "✅ ") + pass + "/" + rows.length + (warnings ? " · ⚠️ " + warnings : "") + " — smoke";
  window.CDS_SMOKE = { pass: pass, fail: fail, warnings: warnings, rows: rows };
  // Para o smoke sem navegador (scripts/dev/smoke.js): o resultado também vai no DOM, como JSON
  var json = document.createElement("script"); json.type = "application/json"; json.id = "smoke-result";
  json.textContent = JSON.stringify({ pass: pass, fail: fail, warnings: warnings, total: rows.length,
    failures: rows.filter(function(r){ return !r.ok; }).map(function(r){ return { id: r.id, errors: r.errors }; }),
    warned: rows.filter(function(r){ return r.warnings.length; }).map(function(r){ return { id: r.id, warnings: r.warnings }; }) }).replace(/</g, "\\u003c");
  document.body.appendChild(json);
})();
