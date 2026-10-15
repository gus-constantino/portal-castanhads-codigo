/**
 * Kit do playground — registro de componentes + helpers de controle.
 *
 * Cada componente registra um playground:
 *   CDS.register({
 *     id: "credit-card-input", name: "Credit Card Input",
 *     category: "Text Fields",   // página do Figma (agrupa o side menu)
 *     block: false,              // true = building block (seção recolhida no fim do menu)
 *     task: "CDS-1607", figma: "https://…", zeroheight: "https://…",
 *     mount(ctx){ … }   // ctx.preview · ctx.panel · ctx.kit · ctx.readout(text, done)
 *   });
 *
 * Os controles do painel são componentes do próprio Castanha DS (D69 · Fase 2 de docs/PLANO-UI-DS.md):
 *   seg → Chips Group + Filter Chips (um selecionado) · toggle → Switch · text → Text Input · range → Slider
 *   select → Radio Select Input · iconSwap / illustrationSwap → Async Select Input (com busca) · button → Main Button
 *   nested → Tag + Filter Chips. A API do kit não mudou: toggle devolve { checked }, text/range/select { value }.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.playgrounds = CDS.playgrounds || [];
  CDS.register = function(def){ CDS.playgrounds.push(def); };

  var uid = 0;
  var IS_TIPS = {
    "Is Active": "No Figma, o estado ativo: campo focado, lista aberta ou filtro aplicado.",
    "Is Collapsed": "No Figma, se o conteúdo do item está recolhido.",
    "Is Selected": "No Figma, se o item está selecionado.",
    "Is Blocked": "No Figma, se o cartão está bloqueado: aparece o Backdrop com o cadeado.",
    "Is Current Day": "No Figma, se o dia é o dia de hoje no calendário."
  };
  var STATE_TIP = "Estado de interação. No uso real vem do mouse, do teclado ou do atributo disabled; aqui ele é forçado para você inspecionar.";
  function id(prefix){ return (prefix || "pg") + "-" + (++uid); }

  /**
   * Estado dos controles na URL (link do estado). Cada controle do kit se registra com uma chave tirada
   * do rótulo ("Text Label" → text-label) e o valor inicial. O shell chama state.begin(panel) antes do mount do
   * playground principal e state.restore(params) depois; a cada mudança, state.onChange(params) recebe só o que
   * difere do inicial. Previews do menu e o smoke montam com outro painel e não entram no registro.
   */
  var state = (function(){
    var owner = null, mounting = false, items = [], listener = null, quiet = false;
    function slug(t){ return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ctrl"; }
    function mine(panel){ return mounting || (owner && panel && owner.contains(panel)); }
    function params(){
      var out = {};
      items.forEach(function(it){ if (!it.el.isConnected) return; var v = String(it.get()); if (v !== it.initial) out[it.key] = v; });
      return out;
    }
    function changed(){ if (!quiet && listener) listener(params()); }
    return {
      begin: function(panel){ owner = panel; mounting = true; items = []; },
      end: function(){ mounting = false; },
      onChange: function(fn){ listener = fn; },
      params: params,
      /** Registra um controle. apply(v) muda a UI e chama o onChange do playground. Devolve um aviso de mudança. */
      add: function(panel, label, el, get, apply, initial){
        if (!mine(panel)) return function(){};
        var base = slug(label), key = base, n = 1;
        while (items.some(function(it){ return it.key === key; })) key = base + "-" + (++n);
        items.push({ key: key, el: el, initial: String(initial !== undefined ? initial : get()), get: get, apply: apply });
        return changed;
      },
      /** Reaplica os valores da URL na ordem em que os controles foram criados. */
      restore: function(p){
        quiet = true;
        items.forEach(function(it){ if (p && Object.prototype.hasOwnProperty.call(p, it.key) && String(it.get()) !== p[it.key]){ try { it.apply(p[it.key]); } catch (e) {} } });
        quiet = false;
      }
    };
  })();

  function el(tag, attrs, children){
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k){
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v === true ? "" : v);
    });
    (children || []).forEach(function(c){ if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  /** Título de grupo (Variants · Booleans · Texts…) */
  /**
   * Tooltip do DS ligado a um elemento já no documento (D69). Sem foco próprio, o elemento ganha tabindex=0
   * (teclado e leitor de tela chegam nele); o.text = true marca texto com sublinhado pontilhado.
   * o.label (título opcional) · o.placement (top|bottom · padrão bottom) · o.container (onde o Tooltip mora)
   */
  var FOCUSABLE = "button, a[href], input, select, textarea, [tabindex]";
  function tip(target, text, o){
    o = o || {};
    if (!target.id) target.id = id("tip");
    if (o.focus !== false && !target.matches(FOCUSABLE) && !target.querySelector(FOCUSABLE)) target.tabIndex = 0;
    if (o.text) target.classList.add("pg-has-tip");
    var t = el("cds-tooltip", { id: target.id + "-tip", "for": target.id, placement: o.placement || "bottom", "show-label": o.label ? "true" : "false", label: o.label });
    t.setAttribute("text", text); // kit.el usa "text" como conteúdo; aqui é atributo do Tooltip
    (o.container || target.parentNode || document.body).appendChild(t);
    return t;
  }
  /** Igual ao tip(), mas só cria o Tooltip no primeiro hover/foco (listas grandes, ex.: galerias). */
  function lazyTip(target, text, o){
    o = o || {};
    var made = null;
    // foco desde já (senão o teclado só chegaria depois do 1º hover); focus:false = decorativo, só mouse
    if (o.focus !== false && !target.matches(FOCUSABLE) && !target.querySelector(FOCUSABLE)) target.tabIndex = 0;
    if (o.text) target.classList.add("pg-has-tip");
    function make(){ if (made) return; made = tip(target, typeof text === "function" ? text() : text, o); made.show(); }
    target.addEventListener("pointerenter", make); target.addEventListener("focusin", make);
  }

  // Seções com explicação: Icon Button de informação (Ghost · Neutral · Small) + Tooltip do DS — funciona com mouse, foco e toque
  var SECTION_INFO = {
    "Variants": { label: "O que são Variants?", text: "Props de variante do Figma: trocam a aparência ou o estado do componente." },
    "Booleans": { label: "O que são Booleans?", text: "Props booleanas do Figma: mostram ou ocultam partes do componente." },
    "Instance swap": { label: "O que é Instance swap?", text: "Troca do componente aninhado, como qual ícone aparece. As opções vêm das bibliotecas do DS." },
    "Texts": { label: "O que são Texts?", text: "Props de texto do Figma: o conteúdo editável do componente." },
    "Comportamento": { label: "O que é esta seção?", text: "Controle só do código: comportamento web, não é prop do Figma." },
    "Largura": { label: "O que é esta seção?", text: "Controle só do playground: testa o campo em larguras diferentes. Não é prop do Figma, onde o campo tem 320 px." },
    "Dados": { label: "O que é esta seção?", text: "Controle só do código: dados de exemplo para testar, não é prop do Figma." },
    "Opções": { label: "O que é esta seção?", text: "Controle só do código: as opções da lista, não é prop do Figma." },
    "Acessibilidade": { label: "O que é esta seção?", text: "Controle só do código: nomes e atributos para leitor de tela, não é prop do Figma." },
    "Nested instances": { label: "O que são nested instances?", text: "Componentes do DS usados dentro deste (ex.: o Icon dentro do Tag). Aqui você vê as propriedades de cada um ao vivo. \"Exposta\": no Figma, a prop aparece no componente pai. \"Fixa\": não dá para trocar por fora." }
  };
  function section(panel, title){
    var h = panel.appendChild(el("h3", { "class": "pg-sub" + (SECTION_INFO[title] ? " has-info" : "") }, [el("span", { text: title })]));
    var info = SECTION_INFO[title]; if (!info) return h;
    var bid = id("info");
    h.appendChild(el("cds-icon-button", { id: bid, kind: "ghost", appearance: "neutral", size: "small", icon: "information-line", label: info.label }));
    var tip = el("cds-tooltip", { id: bid + "-tip", "for": bid, placement: "bottom", "show-label": "true", label: title });
    tip.setAttribute("text", info.text); // kit.el usa "text" como conteúdo; aqui é atributo do Tooltip
    h.appendChild(tip);
    return h;
  }

  function hint(parent, text){ var h = el("div", { "class": "pg-hint", html: text }); parent.appendChild(h); return h; }

  /** Escolha única → Chips Group com Filter Chips (o DS não tem segmented control, C85). options: [[valor, rótulo], …]
   *  Retorna o grupo; grupo.setValue(v) marca uma opção por fora (sem chamar onChange). */
  function seg(panel, o){
    var lid = id("l"), wrap = el("div", { "class": "pg-ctrl" });
    var lblEl = wrap.appendChild(el("span", { "class": "pg-lbl", id: lid, text: o.label }));
    var group = el("cds-chips-group", { kind: "filter", "role-kind": "multiple", label: o.label, "class": "pg-choice" });
    function mark(v){ [].forEach.call(group.querySelectorAll("cds-filter-chip"), function(c){ CDS.attr(c, "selected", c.dataset.v === String(v)); }); }
    o.options.forEach(function(opt){
      var c = el("cds-filter-chip", { label: opt[1], "show-lead-icon": "false", size: "small", "data-v": opt[0], selected: opt[0] === o.value });
      c.addEventListener("cds-change", function(e){
        e.stopPropagation();
        mark(opt[0]); // escolha única: clicar no selecionado não desmarca
        if (!e.detail.selected) return;
        o.onChange(opt[0]);
      });
      group.appendChild(c);
      // Tooltip da opção: a prop e o valor como no Figma (Kind = Ghost)
      lazyTip(c, "No Figma: " + String(o.label).replace(/\s*\(.*\)$/, "") + " = " + opt[1] + ".");
    });
    group.setValue = mark;
    var cur = o.value, cb = o.onChange;
    var notify = state.add(panel, o.label, group, function(){ return cur; }, function(v){
      var opt = o.options.filter(function(x){ return String(x[0]) === v; })[0]; if (!opt) return;
      mark(opt[0]); cur = opt[0]; cb(opt[0]);
    });
    o.onChange = function(v){ cur = v; cb(v); notify(); };
    wrap.appendChild(group);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    if (/^State\b/.test(o.label)) tip(lblEl, STATE_TIP, { text: true });
    return group;
  }

  /** Booleano → Switch do DS. Retorna { checked } (ler e escrever, sem chamar onChange) e .el. */
  function toggle(panel, o){
    var wrap = el("div", { "class": "pg-ctrl" });
    var sw = el("cds-switch", { label: o.label, status: o.checked ? "selected" : "unselected", "class": "pg-switch-ds" });
    var notify = state.add(panel, o.label, sw, function(){ return sw.getAttribute("status") === "selected"; }, function(v){
      var on = v === "true"; CDS.attr(sw, "status", on ? "selected" : "unselected"); o.onChange(on);
    });
    sw.addEventListener("cds-change", function(e){ e.stopPropagation(); o.onChange(e.detail.status === "selected"); notify(); });
    wrap.appendChild(sw);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    if (/^State\b/.test(o.label)) tip(sw, STATE_TIP);
    var isKey = (String(o.label).match(/^Is [A-Z][a-z]+(?: [A-Z][a-z]+)?/) || [])[0];
    if (isKey) tip(sw, IS_TIPS[isKey] || "Prop booleana do Figma que descreve um estado do componente.");
    return { el: sw, get checked(){ return sw.getAttribute("status") === "selected"; }, set checked(v){ CDS.attr(sw, "status", v ? "selected" : "unselected"); } };
  }

  /** Campo de texto → Text Input do DS (sem ícone e sem mensagem; a dica fica embaixo). Retorna o elemento (.value). */
  function text(panel, o){
    var wrap = el("div", { "class": "pg-ctrl" });
    var f = el("cds-text-input", { label: o.label, value: o.value || "", placeholder: o.placeholder, "show-lead-icon": "false", "show-required": "false", "show-supporting-content": "false", "class": "pg-field" });
    var notify = state.add(panel, o.label, f, function(){ return f.value == null ? "" : f.value; }, function(v){ f.value = v; o.onInput(v); }, o.value || "");
    f.addEventListener("cds-change", function(e){ e.stopPropagation(); o.onInput(f.value); notify(); });
    wrap.appendChild(f);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    return f;
  }

  /** Número num intervalo → Slider do DS (passo 1, com o valor na bolha). Retorna { value } e .el. */
  function range(panel, o){
    var wrap = el("div", { "class": "pg-ctrl" });
    wrap.appendChild(el("span", { "class": "pg-lbl", text: o.label }));
    var sl = el("cds-slider", { min: o.min, max: o.max, step: 1, value: o.value, label: o.label, "show-stops": "false", "class": "pg-slider" });
    var last = o.value;
    var notify = state.add(panel, o.label, sl, function(){ return last; }, function(v){
      var n = Number(v); if (isNaN(n) || n < o.min || n > o.max) return; last = n; sl.setAttribute("value", n); o.onInput(n);
    });
    sl.addEventListener("input", function(){ var v = sl.values[0]; if (v !== last){ last = v; o.onInput(v); notify(); } });
    sl.addEventListener("cds-change", function(e){ e.stopPropagation(); var v = sl.values[0]; if (v !== last){ last = v; o.onInput(v); notify(); } });
    wrap.appendChild(sl);
    panel.appendChild(wrap);
    return { el: sl, get value(){ return String(sl.values[0]); } };
  }

  /**
   * Largura do campo (só do playground, não é prop do Figma): Filter Chips + Slider do DS.
   * Auto: no viewport Mobile o campo preenche o frame, nos demais fica com os 320 px do Figma.
   * Preencher: ocupa a largura do frame. Personalizada: Slider de 200 px até a largura disponível no frame.
   */
  function fieldWidth(ctx, field){
    var panel = ctx.panel, box = ctx.preview, frame = box.closest("[data-viewport]");
    var mode = "auto", px = 320, MIN = 200;
    section(panel, "Largura");
    seg(panel, { label: "Largura do campo", value: mode, options: [["auto","Auto"],["fill","Preencher"],["custom","Personalizada"]],
      onChange: function(v){ mode = v; apply(); } });
    // O Slider só mexe na largura no modo Personalizada (ajustar o max faz o Slider reemitir o valor)
    var sl = range(panel, { label: "Largura (px)", min: MIN, max: 600, value: px, onInput: function(v){ if (mode !== "custom" || busy) return; px = v; apply(); } });
    var busy = false;
    var slWrap = sl.el.parentNode;
    var info = hint(panel, "");
    function avail(){ return Math.max(MIN, Math.floor(box.clientWidth)); }
    function apply(){
      if (!field.isConnected){ if (mo) mo.disconnect(); ro.disconnect(); return; }
      var vp = frame ? frame.dataset.viewport : "desktop", max = avail();
      px = Math.min(Math.max(px, MIN), max);
      busy = true; sl.el.setAttribute("max", String(max)); sl.el.setAttribute("value", String(px)); busy = false;
      var fill = mode === "fill" || (mode === "auto" && vp === "mobile");
      box.classList.toggle("pg-fit", fill || mode === "custom");
      box.style.setProperty("--pg-fit-w", mode === "custom" ? px + "px" : "100%");
      slWrap.hidden = mode !== "custom";
      requestAnimationFrame(function(){
        var w = Math.round(field.getBoundingClientRect().width);
        info.textContent = "Agora: " + w + " px. " + (mode === "auto" ? (vp === "mobile" ? "No Mobile, o campo preenche o frame." : "Fora do Mobile, o campo usa os 320 px do Figma.") : mode === "fill" ? "Ocupa a largura do frame." : "Arraste para testar textos longos e quebras.");
      });
    }
    // Viewport novo (data-viewport) e mudança real de tamanho do frame, inclusive durante a animação de largura e no modo fluido
    var mo = frame ? new MutationObserver(apply) : null, ro = new ResizeObserver(function(){ apply(); });
    if (mo) mo.observe(frame, { attributes: true, attributeFilter: ["data-viewport"] });
    ro.observe(box);
    apply();
  }

  /** Ação de texto curta (ex.: "Marcar todos") → Link do DS sem ícone; não navega. */
  function action(parent, o){
    var l = el("cds-link", { label: o.label, href: "#", "show-trailing-item": "false", "class": "pg-link-action" });
    l.addEventListener("click", function(e){ e.preventDefault(); o.onClick(); });
    if (parent) parent.appendChild(l);
    return l;
  }

  /** Botão de ação do painel → Main Button do DS (Neutral · Small, sem ícones). */
  function button(panel, o){
    var b = el("cds-main-button", { kind: o.kind || "default", appearance: "neutral", size: "small", label: o.label, "show-lead-icon": "false", "show-trailing-icon": "false", "class": "pg-action" });
    b.addEventListener("click", o.onClick);
    if (panel) panel.appendChild(b);
    return b;
  }

  /**
   * Nested instance — mostra as props de uma instância aninhada do Figma, ao vivo.
   * o.title · o.exposed (bool: exposta no Figma) · o.note · o.items() → rótulos para escolher
   * (ex.: células) · o.props(i) → [[prop, valor], …]. Retorna refresh().
   */
  function nested(panel, o){
    var box = el("div", { "class": "pg-nested" });
    var head = el("div", { "class": "pg-nested__head" }, [
      el("span", { "class": "pg-nested__title", text: o.title }),
      el("cds-tag", { label: o.exposed ? "exposta" : "fixa", appearance: o.exposed ? "accent" : "neutral", "show-lead-item": "false" })
    ]);
    lazyTip(head.lastChild, o.exposed ? "Exposta: no Figma, as props desta instância aparecem no componente pai." : "Fixa: no Figma, esta instância não pode ser trocada nem configurada por fora.");
    box.appendChild(head);
    if (o.note) box.appendChild(el("div", { "class": "pg-hint", html: o.note }));
    var picker = null, sel = 0;
    if (o.items){ picker = el("cds-chips-group", { kind: "filter", "role-kind": "multiple", label: "Instância", "class": "pg-choice" }); box.appendChild(picker); }
    // Props da instância = composição <cmp-definition-list> (rótulo · valor em mono, à direita)
    var dl = el("cmp-definition-list", { "class": "pg-props", mono: "true", align: "end" });
    box.appendChild(dl);
    panel.appendChild(box);
    function refresh(){
      if (picker){
        var items = o.items();
        if (sel >= items.length) sel = 0;
        if (picker.children.length !== items.length){
          picker.innerHTML = "";
          items.forEach(function(lbl, i){
            var b = el("cds-filter-chip", { label: lbl, "show-lead-icon": "false", size: "small" });
            b.addEventListener("cds-change", function(e){ e.stopPropagation(); sel = i; refresh(); });
            picker.appendChild(b);
          });
        }
        Array.prototype.forEach.call(picker.children, function(b, i){ CDS.attr(b, "selected", i === sel); });
      }
      dl.setItems(o.props(sel).map(function(kv){ return [kv[0], String(kv[1])]; }));
    }
    refresh();
    return refresh;
  }

  /** Chama fn sempre que o componente muda: interação, foco, hover, atributos. */
  function watch(node, fn){
    var raf = 0, run = function(){ cancelAnimationFrame(raf); raf = requestAnimationFrame(fn); };
    ["input","focusin","focusout","pointerover","pointerout","pointerdown","pointerup","click","keyup"].forEach(function(t){ node.addEventListener(t, run, true); });
    document.addEventListener("pointerup", run);
    new MutationObserver(run).observe(node, { attributes: true, childList: true, subtree: true });
  }

  /** Lista curta → Radio Select Input do DS. options: [[valor, rótulo], …]. Retorna o elemento (.value). */
  function select(panel, o){
    var wrap = el("div", { "class": "pg-ctrl" });
    var f = el(o.searchable ? "cds-async-select-input" : "cds-radio-select-input", { label: o.label, "show-lead-icon": "false", "show-required": "false", "show-supporting-content": "false", placeholder: o.placeholder || "Escolher", "class": "pg-field" });
    f.options = o.options.map(function(opt){ return { value: opt[0], label: opt[1] }; });
    if (o.value != null) f.value = o.value;
    var notify = state.add(panel, o.label, f, function(){ return f.value == null ? "" : f.value; }, function(v){
      if (!o.options.some(function(x){ return String(x[0]) === v; })) return; f.value = v; o.onChange(v);
    }, o.value == null ? "" : o.value);
    f.addEventListener("cds-change", function(e){ e.stopPropagation(); if (f.value){ o.onChange(f.value); notify(); } });
    f.addEventListener("cds-toggle", function(e){ e.stopPropagation(); });
    wrap.appendChild(f);
    if (o.hint) hint(wrap, o.hint);
    panel.appendChild(wrap);
    return f;
  }

  /** Instance swap de ícone → Async Select Input (busca por nome ou categoria). Deprecated e glifos ficam de fora.
   *  O Select do DS não tem grupos de opções: a categoria vai no rótulo (C85). */
  function iconSwap(panel, o){
    var A = window.CDS.assets || {}, icons = A.icons || [], buckets = (A.iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; });
    var has = {}, opts = []; icons.forEach(function(i){ has[i.name] = true; });
    buckets.forEach(function(b){ b.icons.forEach(function(n){ if (has[n]) opts.push([n, n + " · " + b.name]); }); });
    return select(panel, { label: o.label || "Icon (instance swap)", value: o.value, options: opts, searchable: true, placeholder: "Buscar ícone",
      hint: opts.length + " ícones do [Caju] Icons em " + buckets.length + " categorias · <a href=\"#/caju-theme/icones\">ver biblioteca</a>", onChange: o.onChange });
  }

  /** Instance swap de ilustração → Async Select Input (valor = "<categoria>/<nome>"). */
  function illustrationSwap(panel, o){
    var A = window.CDS.assets || {}, buckets = A.illustrationBuckets || [], opts = [];
    buckets.forEach(function(b){ b.items.forEach(function(k){ opts.push([k, k.split("/").pop() + " · " + b.name]); }); });
    return select(panel, { label: o.label || "Illustration (instance swap)", value: o.value, options: opts, searchable: true, placeholder: "Buscar ilustração",
      hint: opts.length + " ilustrações do [Caju] Illustrations em " + buckets.length + " categorias · <a href=\"#/ilustracao\">ver biblioteca</a>", onChange: o.onChange });
  }

  /**
   * Playground padrão da família Text Fields.
   * o.tag · o.attrs (iniciais) · o.booleans [[attr, rótulo]] · o.texts [[attr, rótulo, valor]] · o.leadIcon (valor do swap)
   * o.variants(panel, p) — controles extras em Variants · o.extra(panel, p) — seções extras no fim
   * o.nested(p) — [{ title, exposed, note, props() }] para o inspetor
   */
  function textField(ctx, o){
    var panel = ctx.panel, p = el(o.tag, o.attrs || {});
    ctx.preview.appendChild(p);
    fieldWidth(ctx, p);
    var set = function(n, v){ attr(p, n, v); };
    var readout = function(){ ctx.readout(String(p.value == null ? "" : p.value), false); };
    p.addEventListener("cds-change", readout);
    section(panel, "Variants");
    seg(panel, { label: "Appearance", value: (o.attrs && o.attrs.appearance) || "neutral", options: [["neutral","Neutral"],["warning","Warning"]], onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    if (o.variants) o.variants(panel, p, set);
    toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    hint(panel, "Hovered, Pressed e <code>Is Active</code> são estados de interação: passe o mouse, pressione e foque o campo. <code>Is Filled</code> deriva do valor real.");
    if (o.booleans && o.booleans.length){
      section(panel, "Booleans");
      o.booleans.forEach(function(b){ toggle(panel, { label: b[1], checked: b[2] !== false, onChange: function(on){ set(b[0], on ? null : "false"); } }); });
    }
    if (o.texts && o.texts.length){
      section(panel, "Texts");
      o.texts.forEach(function(t){ text(panel, { label: t[1], value: t[2] || "", placeholder: t[3], hint: t[4], onInput: function(v){ set(t[0], v === "" && t[0] !== "required-text" ? null : v); } }); });
    }
    if (o.leadIcon){ section(panel, "Instance swap"); iconSwap(panel, { label: "Lead Icon", value: o.leadIcon, onChange: function(v){ set("lead-icon", v); } }); }
    if (o.extra) o.extra(panel, p, set);
    if (o.nested){
      section(panel, "Nested instances");
      var refs = o.nested(p).map(function(n){ return nested(panel, n); });
      watch(p, function(){ refs.forEach(function(f){ f(); }); });
    }
    readout();
    return p;
  }

  /**
   * Playground padrão dos Select Inputs (sobre o textField).
   * o.tag · o.node (Figma) · o.async (oferece .loadOptions simulado) · o.note (hint) · o.nestedOption (título da opção)
   */
  var SAMPLE_OPTIONS = ["Alimentação","Refeição","Mobilidade","Saúde","Educação","Cultura","Home office","Auxílio"];
  function selectField(ctx, o){
    var p = textField(ctx, {
      tag: o.tag,
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message" },
      variants: function(panel, p, set){ if (o.note) hint(panel, o.note); },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["placeholder","Placeholder","",""]],
      leadIcon: "placeholder-line",
      extra: function(panel, p){
        section(panel, "Opções");
        text(panel, { label: "Opções", value: SAMPLE_OPTIONS.join(", "), hint: "Separadas por vírgula. No código: filhos <code>&lt;option&gt;</code> ou <code>.options</code>.",
          onInput: function(v){ p.options = v.split(",").map(function(x){ return x.trim(); }).filter(Boolean); } });
        if (o.async){
          toggle(panel, { label: "Simular .loadOptions (600ms)", checked: false, onChange: function(on){
            p.loadOptions = on ? function(q){ return new Promise(function(res){ setTimeout(function(){ var n = q.toLowerCase(); res(p.options.filter(function(x){ return x.label.toLowerCase().indexOf(n) >= 0; })); }, 600); }); } : null;
          } });
        }
      },
      nested: function(p){ return [
        { title: "Popover", exposed: false, note: "Is Active=True abre o Popover com as opções; a largura acompanha o campo.", props: function(){ return [["Aberto", String(p.isOpen)], ["Opções visíveis", String(p._shown ? p._shown.length : 0)]]; } },
        { title: o.nestedOption || "Selection List Item", exposed: false, note: "Show Lead Item, Show Divider e Show Description desligados.", props: function(){ return [["Trailing Item", p.optionTrailing], ["Selecionados", p.values.length ? p.values.join(", ") : "—"]]; } },
        { title: "Icon Button", exposed: false, note: "Ghost · Neutral · Medium · dropdown-open-line ↔ dropdown-close-line. Fora da ordem de tab (o foco é o campo).", props: function(){ return [["Icon", p.toggleBtn ? p.toggleBtn.getAttribute("icon") : ""]]; } }
      ]; }
    });
    p.options = SAMPLE_OPTIONS;
    p.addEventListener("cds-change", function(){ ctx.readout(p.value ? p.value.split(",").join(" · ") : "—", false); });
    return p;
  }

  /**
   * Playground padrão dos Selection Controls (Checkbox · Radio Button · Switch).
   * o.tag · o.statuses [[valor, rótulo]] · o.extraHint
   */
  function selectionControl(ctx, o){
    var p = el(o.tag, { label: "Label", status: "unselected" });
    ctx.preview.appendChild(p);
    var statusSeg;
    function readout(){ ctx.readout(p.getAttribute("status"), false); }
    p.addEventListener("cds-change", function(){
      statusSeg.setValue(p.getAttribute("status"));
      readout();
    });
    section(ctx.panel, "Variants");
    statusSeg = seg(ctx.panel, { label: "Status", value: "unselected", options: o.statuses, hint: o.extraHint, onChange: function(v){ p.setAttribute("status", v); readout(); } });
    toggle(ctx.panel, { label: "State: Disabled", onChange: function(on){ attr(p, "disabled", on); } });
    hint(ctx.panel, "Hovered e Pressed são interação; o clique alterna o Status (como as reactions do Figma).");
    section(ctx.panel, "Booleans");
    toggle(ctx.panel, { label: "Show Text Label", checked: true, onChange: function(on){ attr(p, "show-text-label", on ? null : "false"); } });
    section(ctx.panel, "Texts");
    text(ctx.panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    readout();
    return p;
  }

  /** Superfície do preview: pinta o frame inteiro (a caixa com "Viewport" e "Valor"), não um retângulo em volta.
   *  Fundo Inversed/Accent troca o texto do frame para Text/inversed. null volta ao padrão. */
  function surface(preview, bg){
    // dentro de uma miniatura (<cmp-thumbnail>) o fundo vai para a caixa dela, não para o frame da página
    var thumb = preview && preview.parentNode && preview.parentNode.localName === "cmp-thumbnail" ? preview.parentNode : null;
    var frame = thumb || (preview && (preview.closest(".pg-frame") || preview.parentNode)); if (!frame) return;
    frame.style.background = bg || "";
    frame.classList.toggle("is-dark", !!bg && /inversed|accent/.test(bg));
  }

  /** Liga/desliga um atributo no elemento de preview. */
  /**
   * Playground padrão dos overlays (Modal · Drawer · Bottom Sheet).
   * Mostra o specimen inline (como no Figma) e um botão que abre o overlay de verdade (dialog modal com Backdrop).
   * o.tag · o.attrs · o.slot() → nós do Slot · o.booleans [[attr, rótulo]] · o.texts [[attr, rótulo, valor]] · o.hint
   */
  function overlay(ctx, o){
    var panel = ctx.panel, attrs = o.attrs || {}, spec, live;
    function make(extra){ var n = el(o.tag, Object.assign({}, attrs, extra), o.slot()); return n; }
    spec = make({ inline: true }); live = make({});
    live.addEventListener("cds-open", function(){ ctx.readout("aberto", false); });
    live.addEventListener("cds-close", function(){ ctx.readout("fechado", false); });
    live.addEventListener("cds-action", function(e){ ctx.readout("cds-action · " + e.detail.action, false); live.close(); });
    ctx.preview.appendChild(spec); ctx.preview.appendChild(live);
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; attr(spec, k, v); attr(live, k, v); }
    button(panel, { label: "Abrir de verdade", onClick: function(){ live.show(); } });
    if (o.hint) hint(panel, o.hint);
    if (o.variants) o.variants(panel, set);
    if (o.booleans && o.booleans.length){
      section(panel, "Booleans");
      o.booleans.forEach(function(b){ toggle(panel, { label: b[1], checked: b[2] !== false, hint: b[3], onChange: function(on){ set(b[0], on === (b[2] !== false) ? null : String(on)); } }); });
    }
    if (o.texts && o.texts.length){
      section(panel, "Texts");
      o.texts.forEach(function(t){ text(panel, { label: t[1], value: t[2], onInput: function(v){ set(t[0], v); } }); });
    }
    return { spec: spec, live: live, set: set };
  }

  function attr(node, name, val){
    if (val === null || val === false || val === "") node.removeAttribute(name);
    else node.setAttribute(name, val === true ? "" : val);
  }

  CDS.kit = { state: state, el: el, section: section, hint: hint, seg: seg, toggle: toggle, text: text, range: range, nested: nested, watch: watch, select: select, iconSwap: iconSwap, illustrationSwap: illustrationSwap, button: button, action: action, surface: surface, tip: tip, lazyTip: lazyTip, selectionControl: selectionControl, textField: textField, fieldWidth: fieldWidth, selectField: selectField, overlay: overlay, attr: attr };
})();
