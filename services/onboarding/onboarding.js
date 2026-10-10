/**
 * CDS.onboarding — serviço de onboarding do portal (D314 · docs/PLANO-ONBOARDING.md §5)
 *
 * Serviço = lógica e estado que atravessam o portal, sem UI própria: compõe componentes do DS (Modal, Popover, Main Button),
 * guarda o estado no navegador e liga ou desliga sem afetar o resto. Fica em services/<id>/ e entra no pacote depois dos
 * componentes locais. Nada de API do navegador no topo do arquivo (o catálogo do MCP e a busca rodam em Node).
 *
 * Fluxo = dado (services/onboarding/flows/*.flow.js):
 *   CDS.onboarding.register({ id, version, title, steps: [
 *     { kind: "modal", title, text, illustration },                   // boas-vindas (Modal do DS)
 *     { anchor: "busca", title, text, more: "#/faq", showIf(ctx) }     // passo ancorado (Popover do DS) em [data-onb="busca"]
 *   ] })
 * Os botões não são texto livre: o motor escolhe pelo papel do passo, com os rótulos do guia de Conteúdo (conteudo.js:1073-1082):
 *   modal: Começar · Me lembrar mais tarde (· Não mostrar novamente) · passo: Voltar (a partir do 2º) · Continuar / Concluir
 *   (um passo só: Fechar) · 1º passo: Me lembrar mais tarde. Esc = Me lembrar mais tarde.
 *
 * API: register(flow) · flows() · start(id) · stop(reason) · next() · back() · remind() · dismiss() · state(id) · reset(id)
 *   metrics(id) · active()
 * Evento (document): cds-onboarding { type: start|show|complete|remind|dismiss|skip, flow, step }
 * Estado (localStorage, cds-onb:<id>): { status: novo|em-andamento|lembrar|concluido|dispensado, step, version, remindAt,
 *   remindCount, updated }. Métricas (cds-onb-metrics:<id>): { runs, completed, reminded, dismissed, exitAt: {passo: n}, ms }.
 * Desliga com ?onboarding=off na URL. Nesta fase (F1) nenhum fluxo abre sozinho: só por ?tour=<id> ou pela página #/onboarding.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var FLOWS = {}, ORDER = [];
  var BUTTONS = { start: "Começar", next: "Continuar", back: "Voltar", done: "Concluir", close: "Fechar", remind: "Me lembrar mais tarde", dismiss: "Não mostrar novamente", more: "Quero saber mais" };

  // ---------- Estado e métricas (localStorage, sempre com try/catch) ----------
  function read(key, fb){ try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v || fb; } catch (e) { return fb; } }
  function write(key, v){ try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function state(id){ return read("cds-onb:" + id, { status: "novo", step: 0, version: (FLOWS[id] || {}).version || 1, remindCount: 0 }); }
  function setState(id, patch){ var s = state(id); Object.keys(patch).forEach(function(k){ s[k] = patch[k]; }); s.updated = new Date().toISOString(); write("cds-onb:" + id, s); return s; }
  function metrics(id){ return read("cds-onb-metrics:" + id, { runs: 0, completed: 0, reminded: 0, dismissed: 0, exitAt: {}, ms: 0 }); }
  function count(id, field, step){
    var m = metrics(id);
    if (field) m[field] = (m[field] || 0) + 1;
    if (step != null){ m.exitAt[step] = (m.exitAt[step] || 0) + 1; }
    if (run && run.id === id) m.ms += Date.now() - run.t0;
    write("cds-onb-metrics:" + id, m);
  }
  function reset(id){ try { localStorage.removeItem("cds-onb:" + id); localStorage.removeItem("cds-onb-metrics:" + id); } catch (e) {} }

  // ---------- Execução ----------
  var run = null, ui = null; // run: { id, i, steps, t0, back } · ui: elementos do passo aberto
  function emit(type, extra){ var d = { type: type, flow: run && run.id, step: run && run.i }; if (extra) Object.keys(extra).forEach(function(k){ d[k] = extra[k]; }); document.dispatchEvent(new CustomEvent("cds-onboarding", { detail: d })); }
  function off(){ return /[?&]onboarding=off\b/.test(location.search); }
  function anchorOf(step){ return step.anchor ? document.querySelector('[data-onb="' + step.anchor + '"]') : null; }
  function visible(el){ return !!(el && el.getClientRects().length); }
  // ⌘K no Mac, Ctrl+K nos outros sistemas (copy do plano §11.4)
  function keys(t){ return /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent) ? t : String(t).replace(/⌘K/g, "Ctrl+K"); }
  function ctx(){ return { width: window.innerWidth, route: (location.hash || "").replace(/^#\/?/, "").split("?")[0] }; }
  function usable(step){
    if (step.showIf && !step.showIf(ctx())) return false;
    return step.kind === "modal" || visible(anchorOf(step));
  }

  function start(id){
    var f = FLOWS[id]; if (!f || off()) return false;
    stop("restart", true);
    var steps = f.steps.filter(usable);
    if (f.steps.length !== steps.length) f.steps.forEach(function(st, i){ if (steps.indexOf(st) === -1) emit("skip", { flow: id, step: i, reason: "âncora ausente ou condição" }); });
    if (!steps.length) return false;
    run = { id: id, i: 0, steps: steps, t0: Date.now(), back: document.activeElement };
    setState(id, { status: "em-andamento", step: 0, version: f.version || 1 });
    count(id, "runs");
    emit("start");
    show();
    return true;
  }
  function stop(reason, silent){
    if (!run) return;
    var r = run; close();
    run = null;
    if (!silent && r.back && r.back.focus && document.contains(r.back)) r.back.focus(); // foco volta para onde estava antes do tour
    return r;
  }
  function next(){
    if (!run) return;
    if (run.i >= run.steps.length - 1) return complete();
    run.i++; setState(run.id, { step: run.i }); show();
  }
  function back(){ if (!run || run.i === 0) return; run.i--; setState(run.id, { step: run.i }); show(); }
  function complete(){
    if (!run) return;
    var id = run.id;
    count(id, "completed"); setState(id, { status: "concluido", step: run.steps.length });
    emit("complete"); stop("complete");
  }
  function remind(){
    if (!run) return;
    var id = run.id, s = state(id), tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
    count(id, "reminded", run.i); setState(id, { status: "lembrar", remindAt: tomorrow, remindCount: (s.remindCount || 0) + 1 });
    emit("remind"); stop("remind");
  }
  function dismiss(){
    if (!run) return;
    var id = run.id;
    count(id, "dismissed", run.i); setState(id, { status: "dispensado" });
    emit("dismiss"); stop("dismiss");
  }

  // ---------- Interface: só componentes do DS ----------
  function btn(label, kind, onClick){
    var b = CDS.create("cds-main-button", { label: label, kind: kind || "default", appearance: kind === "ghost" ? "neutral" : "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" });
    b.addEventListener("click", onClick);
    return b;
  }
  function buttonsFor(step){
    var i = run.i, n = run.steps.length, last = i === n - 1, out = [];
    if (step.kind === "modal") return out; // o Modal usa o próprio .Footer (primário e secundário)
    if (i === 0) out.push(btn(BUTTONS.remind, "ghost", remind));
    if (i > 0) out.push(btn(BUTTONS.back, "ghost", back));
    out.push(btn(n === 1 ? BUTTONS.close : last ? BUTTONS.done : BUTTONS.next, "default", next));
    return out;
  }
  function close(){
    if (!ui) return;
    if (ui.anchor) ui.anchor.removeAttribute("data-onb-active");
    if (ui.pop){ ui.pop.hide(); ui.pop.remove(); }
    if (ui.modal){ ui.closing = true; ui.modal.close(); ui.modal.remove(); }
    document.removeEventListener("keydown", ui.onKey, true);
    window.removeEventListener("resize", ui.onResize);
    ui = null;
  }
  function show(){
    close();
    var step = run.steps[run.i], n = run.steps.length, c = CDS.create;
    emit("show");
    if (step.kind === "modal") return showModal(step);
    var anchor = anchorOf(step);
    if (!visible(anchor)){ emit("skip", { reason: "âncora sumiu" }); return run.i < n - 1 ? next() : complete(); }
    // contagem só dos passos do tour (a boas-vindas em Modal não entra): "Etapa 2 de 3"
    var tour = run.steps.filter(function(x){ return x.kind !== "modal"; }), ti = tour.indexOf(step);
    var etapa = tour.length > 1 ? "Etapa " + (ti + 1) + " de " + tour.length : "";
    var pop = c("cds-popover", { popover: "manual", "class": "svc-onb", label: (etapa ? etapa + ": " : "") + step.title });
    var body = c("div", null, "svc-onb__body");
    if (etapa) body.appendChild(c("p", null, "svc-onb__count")).textContent = etapa;
    var h = body.appendChild(c("h2", { tabindex: "-1" }, "svc-onb__title")); h.textContent = step.title;
    body.appendChild(c("p", null, "svc-onb__text")).textContent = keys(step.text);
    if (step.more){ var more = body.appendChild(c("cds-link", { label: BUTTONS.more, href: step.more, appearance: "accent", "show-trailing-item": "false" }, "svc-onb__more")); more.addEventListener("click", function(){ stop("more", true); }); }
    var actions = body.appendChild(c("div", null, "svc-onb__actions"));
    buttonsFor(step).forEach(function(b){ actions.appendChild(b); });
    pop.appendChild(body); // Slot: entra antes de conectar
    document.body.appendChild(pop);
    anchor.setAttribute("data-onb-active", "");
    ui = { pop: pop, anchor: anchor };
    pop.show();
    var place = function(){ if (ui && ui.pop === pop) CDS.position(anchor, pop, { placement: step.placement || "bottom-start", gap: 8 }); };
    place();
    ui.onResize = place; window.addEventListener("resize", place);
    // Esc = Me lembrar mais tarde (não perde o progresso); o foco vai para o título do passo
    ui.onKey = function(e){ if (e.key === "Escape" && run){ e.preventDefault(); e.stopPropagation(); remind(); } };
    document.addEventListener("keydown", ui.onKey, true);
    setTimeout(function(){ if (ui && ui.pop === pop) h.focus(); }, 0);
  }
  function showModal(step){
    var c = CDS.create, i = run.i, n = run.steps.length;
    var body = c("div", null, "svc-onb__modal");
    // ilustração oficial ([Caju] Illustrations), decorativa: o texto do passo carrega a mensagem
    if (step.illustration && CDS.illustration) body.appendChild(c("img", { src: CDS.illustration(step.illustration), alt: "", "aria-hidden": "true" }, "svc-onb__ill"));
    body.appendChild(c("p", null, "svc-onb__text")).textContent = step.text;
    if (step.dismissible !== false){ var nm = body.appendChild(c("cds-link", { label: BUTTONS.dismiss, href: "#", appearance: "neutral", "show-trailing-item": "false" }, "svc-onb__dismiss")); nm.addEventListener("click", function(e){ e.preventDefault(); dismiss(); }); }
    var modal = c("cds-modal", { "text-title": step.title, label: step.title, "primary-label": n === 1 ? BUTTONS.close : (i === 0 ? BUTTONS.start : (i === n - 1 ? BUTTONS.done : BUTTONS.next)),
      "secondary-label": i === 0 ? BUTTONS.remind : BUTTONS.back, "show-lead-icon": "false", "show-close-button": "false" });
    modal.appendChild(body); // Slot: entra antes de conectar
    document.body.appendChild(modal);
    ui = { modal: modal };
    modal.addEventListener("cds-action", function(e){
      e.stopPropagation();
      if (e.detail && e.detail.action === "primary") next();
      else if (i === 0) remind(); else back();
    });
    // Esc e clique fora fecham o Modal: vale como Me lembrar mais tarde
    modal.addEventListener("cds-close", function(){ if (ui && ui.modal === modal && !ui.closing && run) remind(); });
    ui.onKey = function(){}; ui.onResize = function(){};
    modal.show();
  }

  // ---------- Registro ----------
  function register(f){
    if (!f || !f.id || !f.steps) return;
    if (!FLOWS[f.id]) ORDER.push(f.id);
    FLOWS[f.id] = f;
  }
  CDS.onboarding = {
    register: register,
    flows: function(){ return ORDER.map(function(id){ return FLOWS[id]; }); },
    start: start, stop: function(){ stop("stop"); }, next: next, back: back, remind: remind, dismiss: dismiss,
    state: state, reset: reset, metrics: metrics,
    active: function(){ return run ? { flow: run.id, step: run.i, total: run.steps.length } : null; },
    buttons: BUTTONS
  };

  // F1: nenhum fluxo abre sozinho. ?tour=<id> abre o fluxo depois que o portal monta (o app dispara a 1ª rota no load)
  if (typeof window !== "undefined" && window.addEventListener){
    window.addEventListener("load", function(){
      var m = location.search.match(/[?&]tour=([\w-]+)/);
      if (m) setTimeout(function(){ start(m[1]); }, 300);
    });
  }
})();
