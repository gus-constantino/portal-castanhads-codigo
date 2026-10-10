/**
 * CDS.onboarding — serviço de onboarding do portal (D314 a base, D315 · docs/PLANO-ONBOARDING.md §3 e §5)
 *
 * Serviço = lógica e estado que atravessam o portal, sem UI própria: compõe componentes do DS (Modal, Popover, Backdrop,
 * Radio Button, Content List, Main Button), guarda o estado no navegador e liga ou desliga sem afetar o resto. Fica em
 * services/<id>/ e entra no pacote depois dos componentes locais. Nada de API do navegador no topo do arquivo.
 *
 * Fluxo = dado (services/onboarding/flows/*.flow.js):
 *   CDS.onboarding.register({ id, version, title, auto, then, steps: [
 *     { kind: "modal", title, text, illustration, choose: { label, options: [{ id, label }] } }, // boas-vindas (Modal)
 *     { anchor: "busca", title, text, more, placement, showIf(ctx) }                             // passo do tour (Popover)
 *   ], onComplete(api) })
 *   auto: abre sozinho na 1ª visita (e de novo depois de Me lembrar mais tarde, no máximo 2 vezes, a partir do dia seguinte)
 *   then: o primário da boas-vindas vira Começar (o onboarding continua no onComplete)
 * Botões pelo papel do passo, com os rótulos do guia de Conteúdo (conteudo.js:1073-1082): Começar · Continuar · Voltar ·
 *   Concluir · Fechar · Me lembrar mais tarde · Não mostrar novamente. Esc = Me lembrar mais tarde.
 * Tour: Backdrop do DS atrás do passo; o bloco que tem a área apontada (ex.: o menu) fica por cima, com o anel de foco do sistema.
 *
 * Primeiros passos (checklist da tab do Início): CDS.onboarding.checklist({ profiles: [{ id, label, tasks: [{ id, label, text,
 *   href, done: { visit: "rota" } | { playground: true } | { profile: true } }] }] }) · checklistView() monta a tela.
 *   A tarefa se marca pela ação (abrir a página, mexer numa prop no Playground), não por clique em Feito.
 *
 * API: register · flows · start(id) · stop · next · back · remind · dismiss · state(id) · reset(id) · metrics(id) · active
 *   profile() / profile(id) · checklist(def) · checklistView() · tasksDone()
 * Evento (document): cds-onboarding { type: start|show|complete|remind|dismiss|skip|task|profile, flow, step }
 * localStorage: cds-onb:<id> (estado do fluxo) · cds-onb-metrics:<id> · cds-onb-perfil · cds-onb-tarefas
 * Desliga com ?onboarding=off. ?tour=<id> abre um fluxo na hora.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var FLOWS = {}, ORDER = [], CHECK = null;
  var BUTTONS = { start: "Começar", next: "Continuar", back: "Voltar", done: "Concluir", close: "Fechar", remind: "Me lembrar mais tarde", dismiss: "Não mostrar novamente", more: "Quero saber mais" };

  // ---------- Estado e métricas (localStorage, sempre com try/catch) ----------
  function read(key, fb){ try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v || fb; } catch (e) { return fb; } }
  function write(key, v){ try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function today(){ return new Date().toISOString().slice(0, 10); }
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
  function profile(id){
    if (arguments.length){ write("cds-onb-perfil", id || null); markProfile(); emit("profile", { profile: id }); return id; }
    return read("cds-onb-perfil", null);
  }

  // ---------- Execução ----------
  var run = null, ui = null; // run: { id, i, steps, t0, back } · ui: elementos do passo aberto
  function emit(type, extra){ var d = { type: type, flow: run && run.id, step: run && run.i }; if (extra) Object.keys(extra).forEach(function(k){ d[k] = extra[k]; }); document.dispatchEvent(new CustomEvent("cds-onboarding", { detail: d })); }
  function off(){ return /[?&]onboarding=off\b/.test(location.search); }
  function anchorOf(step){ return step.anchor ? document.querySelector('[data-onb="' + step.anchor + '"]') : null; }
  function visible(el){ return !!(el && el.getClientRects().length); }
  // ⌘K no Mac, Ctrl+K nos outros sistemas (copy do plano §11.4)
  function keys(t){ return /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent) ? t : String(t).replace(/⌘K/g, "Ctrl+K"); }
  function ctx(){ return { width: window.innerWidth, route: route() }; }
  function route(){ return (location.hash || "").replace(/^#\/?/, "").split("?")[0]; }
  function usable(step){
    if (step.showIf && !step.showIf(ctx())) return false;
    return step.kind === "modal" || visible(anchorOf(step));
  }
  function api(){ return CDS.onboarding; }

  function start(id){
    var f = FLOWS[id]; if (!f || off()) return false;
    stop("restart", true);
    var steps = f.steps.filter(usable);
    if (f.steps.length !== steps.length) f.steps.forEach(function(st, i){ if (steps.indexOf(st) === -1) emit("skip", { flow: id, step: i, reason: "âncora ausente ou condição" }); });
    if (!steps.length){ if (f.onComplete) f.onComplete(api()); return false; }
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
    var step = run.steps[run.i];
    if (step.choose && ui && ui.choice){ var picked = ui.choice.querySelector('cds-radio-button[status="selected"]'); if (picked) profile(picked.getAttribute("value")); }
    if (run.i >= run.steps.length - 1) return complete();
    run.i++; setState(run.id, { step: run.i }); show();
  }
  function back(){ if (!run || run.i === 0) return; run.i--; setState(run.id, { step: run.i }); show(); }
  function complete(){
    if (!run) return;
    var id = run.id, f = FLOWS[id];
    count(id, "completed"); setState(id, { status: "concluido", step: run.steps.length });
    emit("complete"); stop("complete", !!f.onComplete);
    if (f.onComplete) setTimeout(function(){ f.onComplete(api()); }, 0); // ex.: boas-vindas → tour; tour → Primeiros passos
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
  // Abre sozinho: 1ª visita, ou adiado (Me lembrar mais tarde) a partir do dia marcado, no máximo 2 vezes (plano §3.4)
  function due(f){
    var s = state(f.id);
    if (s.status === "novo") return true;
    return s.status === "lembrar" && (s.remindCount || 0) <= 2 && (!s.remindAt || s.remindAt <= today());
  }

  // ---------- Interface: só componentes do DS ----------
  function btn(label, kind, onClick){
    var b = CDS.create("cds-main-button", { label: label, kind: kind || "default", appearance: kind === "ghost" ? "neutral" : "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" });
    b.addEventListener("click", onClick);
    return b;
  }
  function buttonsFor(step){
    var i = run.i, n = run.steps.length, last = i === n - 1, out = [];
    if (i === 0) out.push(btn(BUTTONS.remind, "ghost", remind));
    if (i > 0) out.push(btn(BUTTONS.back, "ghost", back));
    out.push(btn(n === 1 ? BUTTONS.close : last ? BUTTONS.done : BUTTONS.next, "default", next));
    return out;
  }
  // Backdrop do DS atrás do passo; sobe o bloco posicionado que contém a área apontada (ex.: o menu lateral), para ela ficar clara
  function lifted(anchor){
    for (var n = anchor; n && n !== document.body; n = n.parentElement){
      var cs = getComputedStyle(n);
      if (cs.position !== "static" && cs.zIndex !== "auto") return n;
    }
    return anchor;
  }
  function close(){
    if (!ui) return;
    if (ui.anchor) ui.anchor.removeAttribute("data-onb-active");
    if (ui.lift) ui.lift.removeAttribute("data-onb-lift");
    if (ui.layer) ui.layer.remove();
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
    // Backdrop (cds-backdrop cobre o pai posicionado: a camada fixa ocupa a tela); clique nele = Me lembrar mais tarde
    var layer = c("div", { "aria-hidden": "true" }, "svc-onb__layer"); layer.appendChild(c("cds-backdrop"));
    layer.addEventListener("click", remind);
    document.body.appendChild(layer);
    document.body.appendChild(pop);
    var lift = lifted(anchor); lift.setAttribute("data-onb-lift", getComputedStyle(lift).position === "static" ? "static" : "");
    anchor.setAttribute("data-onb-active", "");
    ui = { pop: pop, anchor: anchor, layer: layer, lift: lift };
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
    var c = CDS.create, i = run.i, n = run.steps.length, f = FLOWS[run.id];
    var body = c("div", null, "svc-onb__modal");
    // ilustração oficial ([Caju] Illustrations), decorativa: o texto do passo carrega a mensagem
    if (step.illustration && CDS.illustration) body.appendChild(c("img", { src: CDS.illustration(step.illustration), alt: "", "aria-hidden": "true" }, "svc-onb__ill"));
    body.appendChild(c("p", null, "svc-onb__text")).textContent = keys(step.text);
    var choice = null;
    if (step.choose){ // escolha de perfil: Radio Button do DS num grupo com nome (opcional: Começar funciona sem escolher)
      var cur = profile();
      body.appendChild(c("p", { "aria-hidden": "true" }, "svc-onb__legend")).textContent = step.choose.label; // o grupo leva o mesmo texto no aria-label
      choice = body.appendChild(c("cds-selection-group", { label: step.choose.label, name: "svc-onb-perfil" }, "svc-onb__choice"));
      step.choose.options.forEach(function(o){ choice.appendChild(c("cds-radio-button", { label: o.label, value: o.id, name: "svc-onb-perfil", status: o.id === cur ? "selected" : "unselected" })); });
    }
    if (step.dismissible !== false){ var nm = body.appendChild(c("cds-link", { label: BUTTONS.dismiss, href: "#", appearance: "neutral", "show-trailing-item": "false" }, "svc-onb__dismiss")); nm.addEventListener("click", function(e){ e.preventDefault(); dismiss(); }); }
    var primary = n === 1 ? (f.then ? BUTTONS.start : BUTTONS.close) : (i === 0 ? BUTTONS.start : (i === n - 1 ? BUTTONS.done : BUTTONS.next));
    var modal = c("cds-modal", { "text-title": step.title, label: step.title, "primary-label": primary,
      "secondary-label": i === 0 ? BUTTONS.remind : BUTTONS.back, "show-lead-icon": "false", "show-close-button": "false" });
    modal.appendChild(body); // Slot: entra antes de conectar
    document.body.appendChild(modal);
    ui = { modal: modal, choice: choice };
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

  // ---------- Primeiros passos: tarefas por perfil, marcadas pela ação ----------
  function tasksDone(){ return read("cds-onb-tarefas", {}); }
  function markDone(taskId){
    var d = tasksDone(); if (d[taskId]) return;
    d[taskId] = today(); write("cds-onb-tarefas", d); emit("task", { task: taskId });
  }
  function allTasks(){ return CHECK ? CHECK.profiles.reduce(function(a, p){ return a.concat(p.tasks); }, (CHECK.common || []).slice()) : []; }
  function markRoute(){
    var r = route(), withQuery = /\?/.test(location.hash || "");
    allTasks().forEach(function(t){
      var d = t.done || {};
      if (d.visit && (r === d.visit || r.indexOf(d.visit + "/") === 0)) markDone(t.id);
      // Playground: o estado dos controles vai para a URL (?prop=valor) quando a pessoa mexe numa prop de um componente
      if (d.playground && withQuery && CDS.playgrounds && CDS.playgrounds.some(function(c){ return c.id === r.split("/")[0] && !c.resource; })) markDone(t.id);
    });
  }
  function markProfile(){ allTasks().forEach(function(t){ if (t.done && t.done.profile && profile()) markDone(t.id); }); }
  function checklistView(){
    var c = CDS.create, box = c("div", null, "svc-onb-check");
    if (!CHECK){ box.appendChild(c("p", null, "pg-doc-p")).textContent = "Nenhum checklist registrado."; return box; }
    var cur = profile() || CHECK.profiles[0].id;
    box.appendChild(c("p", null, "pg-doc-p")).textContent = CHECK.intro;
    var group = box.appendChild(c("cds-selection-group", { label: CHECK.chooseLabel, name: "svc-onb-check-perfil" }, "svc-onb-check__perfis"));
    CHECK.profiles.forEach(function(p){ group.appendChild(c("cds-radio-button", { label: p.label, value: p.id, name: "svc-onb-check-perfil", status: p.id === cur ? "selected" : "unselected" })); });
    var countEl = box.appendChild(c("p", { "aria-live": "polite" }, "svc-onb-check__count"));
    var list = box.appendChild(c("cds-content-list", { label: "Primeiros passos", intent: "navigation" }, "svc-onb-check__list")); // Intent Navigation: Tag e seta em cada item
    var actions = box.appendChild(c("div", null, "svc-onb-check__actions"));
    // botão do tour: com o menu lateral (mais de 1100 px), onde os passos do tour têm onde se ancorar
    var tourBtn = actions.appendChild(c("cds-main-button", { label: "Fazer o tour", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
    tourBtn.addEventListener("click", function(){ start(CHECK.tour || "portal"); });
    var tip = actions.appendChild(c("p", null, "svc-onb-check__hint"));
    tip.textContent = "O tour mostra o menu, a busca e a Ajuda em 3 etapas.";
    function paint(){
      var p = CHECK.profiles.filter(function(x){ return x.id === cur; })[0] || CHECK.profiles[0], d = tasksDone();
      var tasks = (CHECK.common || []).concat(p.tasks), done = tasks.filter(function(t){ return d[t.id]; }).length;
      countEl.textContent = done + " de " + tasks.length + " concluídos";
      list.innerHTML = "";
      tasks.forEach(function(t){
        var ok = !!d[t.id];
        var item = list.appendChild(c("cds-content-list-item", { label: t.label, description: t.text, href: t.href || null, intent: "navigation", "show-tag": "true",
          "tag-label": ok ? "Concluído" : "Pendente", "tag-appearance": ok ? "positive" : "neutral", "show-lead-item": "false", "show-divider": "true" }));
        // Tag aninhada (override de instância): check no Concluído, sem ícone no Pendente
        if (item.tagEl){ if (ok) item.tagEl.setAttribute("icon", "check-line"); else item.tagEl.setAttribute("show-lead-item", "false"); }
      });
      tourBtn.hidden = tip.hidden = window.innerWidth <= 1100;
    }
    group.addEventListener("cds-change", function(e){
      var picked = e.target.closest && e.target.closest("cds-radio-button"); if (!picked || (e.detail && e.detail.status !== "selected")) return;
      cur = picked.getAttribute("value"); profile(cur); paint();
    });
    paint();
    return box;
  }
  function checklist(def){ CHECK = def; }

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
    state: state, reset: reset, metrics: metrics, profile: profile,
    checklist: checklist, checklistView: checklistView, tasksDone: tasksDone,
    active: function(){ return run ? { flow: run.id, step: run.i, total: run.steps.length } : null; },
    buttons: BUTTONS
  };

  // Ao carregar: ?tour=<id> abre na hora; senão, o 1º fluxo auto que está na vez (boas-vindas na 1ª visita).
  // Páginas fora do menu (relatório, escondidas) não abrem nada sozinhas.
  if (typeof window !== "undefined" && window.addEventListener){
    window.addEventListener("hashchange", markRoute);
    // o Playground grava as props na URL com replaceState (sem hashchange): o shell avisa com cds-playground-change
    document.addEventListener("cds-playground-change", function(){ allTasks().forEach(function(t){ if (t.done && t.done.playground) markDone(t.id); }); });
    window.addEventListener("load", function(){
      markRoute(); markProfile();
      if (off()) return;
      var m = location.search.match(/[?&]tour=([\w-]+)/);
      if (m) return setTimeout(function(){ start(m[1]); }, 300);
      var r = route().split("/")[0], def = CDS.playgrounds && CDS.playgrounds.filter(function(c){ return c.id === r; })[0];
      if (r === "relatorio" || (def && def.hidden)) return;
      var auto = ORDER.map(function(id){ return FLOWS[id]; }).filter(function(f){ return f.auto && due(f); })[0];
      if (auto) setTimeout(function(){ start(auto.id); }, 600);
    });
  }
})();
