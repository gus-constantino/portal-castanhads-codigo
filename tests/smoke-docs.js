/**
 * Smoke das docs — roda dentro do app (index.html), injetado pelo scripts/dev/smoke.js (D128).
 * Abre cada tab de cada doc (componentes, carregadas sob demanda, e recursos de suporte) pela rota real e verifica:
 *   reprova · erro de script ao renderizar (exceção ou console.error) · a11y básico (nome acessível, rótulo,
 *             ícone com aria-hidden, img com alt)
 *   aviso   · no mobile, a página rola para o lado (aponta o elemento que mais estoura; rolagem de área
 *             com overflow próprio, como tabela ou Tab, não conta)
 * Uso: await CDS_SMOKE_DOCS({ mobile: false|true }) → { tabs, failures:[{id, errors}], warned:[{id, warnings}] }
 */
window.CDS_SMOKE_DOCS = async function(opts){
  "use strict";
  opts = opts || {};
  var sleep = function(ms){ return new Promise(function(ok){ setTimeout(ok, ms); }); };
  var docsEl = document.getElementById("docs"), byId = {}, tabs = 0, cur = "";
  function rec(kind, id, msg){ var r = byId[id] = byId[id] || { id: id, errors: [], warnings: [] }; if (r[kind].indexOf(msg) === -1) r[kind].push(msg); }
  // Erros durante a renderização: console.error (o docs-kit registra assim) e exceções soltas
  var origErr = console.error;
  console.error = function(){ if (cur) rec("errors", cur.split("/")[0], cur + ": " + [].map.call(arguments, String).join(" ").slice(0, 160)); return origErr.apply(console, arguments); };
  // "ResizeObserver loop…" é aviso benigno do navegador (notificação adiada para o próximo quadro), não erro de script
  function onErr(e){ if (cur && !/^ResizeObserver loop/.test(e.message || "")) rec("errors", cur.split("/")[0], cur + ": " + e.message); }
  window.addEventListener("error", onErr);

  function hiddenIn(el, top){ for (var n = el; n && n !== top; n = n.parentElement){ if (n.hidden || n.inert || n.getAttribute("aria-hidden") === "true") return true; } return false; }
  function accName(el){
    var v = el.getAttribute("aria-label"); if (v && v.trim()) return v.trim();
    var ids = el.getAttribute("aria-labelledby");
    if (ids) return ids.split(/\s+/).map(function(i){ var n = document.getElementById(i); return n ? n.textContent : ""; }).join(" ").trim();
    if (el.labels && el.labels.length) return [].map.call(el.labels, function(l){ return l.textContent; }).join(" ").trim();
    var img = el.querySelector && el.querySelector("img[alt]");
    return (el.textContent || "").trim() || el.getAttribute("title") || (img && img.alt) || "";
  }
  function tag(el){ return el.tagName.toLowerCase() + (el.classList[0] ? "." + el.classList[0] : ""); }
  function a11y(root){
    var f = [];
    [].forEach.call(root.querySelectorAll("button, a[href], [role=button], [role=tab], [role=option], [role=checkbox], [role=radio], [role=switch], [role=slider]"), function(b){ if (!hiddenIn(b, root) && !accName(b)) f.push("sem nome acessível: " + tag(b)); });
    [].forEach.call(root.querySelectorAll("input:not([type=hidden]), textarea, select"), function(i){ if (!hiddenIn(i, root) && !accName(i)) f.push("campo sem rótulo: " + tag(i)); });
    [].forEach.call(root.querySelectorAll(".cds-icon"), function(i){ if (!hiddenIn(i, root) && !(i.getAttribute("role") === "img" && i.getAttribute("aria-label"))) f.push("ícone sem aria-hidden: " + tag(i)); });
    [].forEach.call(root.querySelectorAll("img"), function(i){ if (!i.hasAttribute("alt")) f.push("img sem alt"); });
    return f.filter(function(x, i){ return f.indexOf(x) === i; });
  }
  // Página rolando para o lado: o elemento que mais passa da janela, fora de áreas que rolam sozinhas
  function scrollsAside(el){ for (var n = el.parentElement; n && n !== document.body; n = n.parentElement){ var o = getComputedStyle(n).overflowX; if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") return true; } return false; }
  function overflow(){
    var W = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth <= W + 1) return null;
    var worst = null;
    [].forEach.call(document.querySelectorAll("body *"), function(el){
      var r = el.getBoundingClientRect(); if (!r.width || r.right <= W + 1 || getComputedStyle(el).position === "fixed" || scrollsAside(el)) return;
      if (!worst || r.right > worst.right) worst = { right: Math.round(r.right), el: tag(el) };
    });
    return "página com " + document.documentElement.scrollWidth + "px numa janela de " + W + "px" + (worst ? " · estoura: " + worst.el + " (até " + worst.right + "px)" : "");
  }

  var ids = Object.keys(CDS.docsIndex || {});
  await Promise.all(ids.map(function(id){ return CDS.loadDoc(id); }));
  // + recursos de suporte com doc (Início, Conteúdo, Caju - Tema…)
  CDS.playgrounds.forEach(function(d){ if (d.resource && CDS.docs[d.id] && ids.indexOf(d.id) === -1) ids.push(d.id); });
  for (var i = 0; i < ids.length; i++){
    var id = ids[i], doc = CDS.docs[id]; if (!doc) { rec("errors", id, id + ": doc não carregou"); continue; }
    for (var j = 0; j < doc.tabs.length; j++){
      var t = doc.tabs[j]; cur = id + "/" + t.id; tabs++;
      location.hash = "#/" + id + "/" + t.id;
      await sleep(60);
      if (docsEl.hidden) { rec("errors", id, cur + ": a tab não abriu"); continue; }
      if (opts.mobile){ var o = overflow(); if (o) rec("warnings", id, o); }
      else a11y(docsEl).forEach(function(x){ rec("errors", id, cur + " · a11y: " + x); });
    }
  }
  // Onboarding (D316): todo passo de tour precisa achar a área em [data-onb] (âncora quebrada = tour pulando passo)
  // Fluxo com route (R2, ex.: o tour do Relatório) confere as âncoras na rota dele, depois que ela monta (até 5 s)
  if (CDS.onboarding){
    var byRoute = {};
    CDS.onboarding.flows().forEach(function(f){ (byRoute[f.route || "inicio"] = byRoute[f.route || "inicio"] || []).push(f); });
    for (var rt in byRoute){
      location.hash = "#/" + rt;
      var need = [].concat.apply([], byRoute[rt].map(function(f){ return f.steps.filter(function(s){ return s.kind !== "modal" && s.anchor; }).map(function(s){ return s.anchor; }); }));
      for (var w = 0; w < 50 && need.some(function(a){ return !document.querySelector('[data-onb="' + a + '"]'); }); w++) await sleep(100);
      await sleep(80);
      byRoute[rt].forEach(function(f){
        f.steps.forEach(function(s, k){
          if (s.kind === "modal" || !s.anchor) return;
          var el = document.querySelector('[data-onb="' + s.anchor + '"]');
          if (!el) rec("errors", "onboarding", f.id + " › passo " + (k + 1) + ": âncora [data-onb=\"" + s.anchor + "\"] não existe em #/" + rt);
          else if (!opts.mobile && !el.getClientRects().length) rec("errors", "onboarding", f.id + " › passo " + (k + 1) + ": âncora " + s.anchor + " fora da tela no desktop");
        });
      });
    }
  }
  cur = ""; console.error = origErr; window.removeEventListener("error", onErr);
  var all = Object.keys(byId).map(function(k){ return byId[k]; });
  return { docs: ids.length, tabs: tabs,
    failures: all.filter(function(r){ return r.errors.length; }).map(function(r){ return { id: r.id, errors: r.errors }; }),
    warned: all.filter(function(r){ return r.warnings.length; }).map(function(r){ return { id: r.id, warnings: r.warnings }; }) };
};
