/**
 * <cmp-lesson> — Lição no estilo Duolingo · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * Por que existe: o DS não tem lição gamificada. Esta composição monta uma, uma tela por vez, só com componentes do DS:
 *   Card (Has Border) · Icon Button Ghost (sair) · Nav Control Mobile (progresso, só leitura) · Icon favorite-filled/line (vidas)
 *   · Selection List Kind Card com Radio Button (escolha e certo ou errado) · Filter Chips (completar a frase) · Card + Icon
 *   Buttons Ghost (ordenar) · Selection Lists (ligar pares) · Alert (feedback) · Fixed Bar Stacked (Verificar / Continuar)
 *   · Tag (XP, pontos, combo, acertos, revisão) · Main Button · Code Input OTP (iniciais do ranking, 3 caracteres)
 *   · Table (ranking, montado por quem usa) · ilustrações do [Caju] Illustrations nas telas de início, vidas e fim.
 *
 * Regras (decisões do time, 08/10): 3 vidas; errar tira uma vida e a questão volta no fim da lição (uma vez); ao perder as 3,
 *   ganha 2 vidas extras uma vez por lição; perdeu as extras, a lição termina e oferece recomeçar. XP: 10 por lição + 5 sem erros.
 * Pontos (08/10): 100 por acerto de primeira, 50 na revisão · combo x2 a partir de 3 acertos seguidos e x3 a partir de 5
 *   · no fim, +200 por vida que sobrou e +500 sem erros · score-multiplier multiplica o total (ex.: 1.5 no jogo com todos os temas).
 *   Com ranking-key, quem entra no Top 10 deste navegador grava 3 iniciais, como nos fliperamas (só iniciais: nada de dado pessoal).
 *
 * Dados (propriedades, antes de conectar): exercises = [{ type, … }]
 *   choice  { q, options: [texto], answer: índice, why, visual? }
 *   verdict { q, answer: "do" | "dont", why, visual? }         opções "Use" e "Não use"
 *   fill    { text: "frase com ___", options: [texto], answer: índice, why }
 *   order   { q, pieces: [texto na ordem certa], why }
 *   pairs   { q, pairs: [[esquerda, direita]], why }            par errado também tira uma vida
 *   visual = função que devolve um elemento (montado por quem usa, com componentes do DS)
 *   resample (opcional) = função que devolve uma lista nova de exercícios a cada partida (ex.: sorteio por tema)
 * Atributos: label (nome da lição) · storage-key (guarda XP e conclusão no localStorage de quem joga) · illustration (início)
 *   · heading (título da tela de início) · tips-label (texto do link de dicas) · tips-href (âncora das dicas)
 *   · score-multiplier (padrão 1) · ranking-key (Top 10 no localStorage, em cds-rank:<chave>) · ranking-label (o que foi jogado)
 * Eventos: cmp-lesson-done { xp, correct, total, perfect, score } · cmp-lesson-rank { entry, position }
 * Ranking: CmpLesson.ranking(chave) devolve a lista [{ name, score, label, date }], do maior para o menor.
 *   Ranking compartilhado (opcional): propriedade remote = { top: [lista atual], add(entry) → Promise<{ position, top }> }.
 *   Com remote, o Top 10 que vale é o dele; a lista local continua sendo gravada como reserva.
 *   Feedback da gravação (regra de uso do DS): gravou → Toast Positive (confirma o sucesso de uma ação, some sozinho);
 *   não gravou → Alert Warning na tela de resultado, fixo, com o motivo e o Main Button "Tentar gravar de novo".
 */
(function(){
  "use strict";
  var uid = 0;
  var RIGHT = ["Na mosca", "Isso mesmo", "Mandou bem"], WRONG = ["Quase", "Não foi dessa vez", "Não é bem assim"];
  var KIND = { choice: "Escolha a opção certa", verdict: "Certo ou errado?", fill: "Complete a frase", order: "Coloque em ordem", pairs: "Ligue os pares" };
  function load(k){ try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e){ return null; } }
  function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e){} }
  function shuffle(a){ var b = a.slice(), same = function(){ return a.length > 1 && b.every(function(x, k){ return x === a[k]; }); }; do { for (var i = b.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; } } while (same()); return b; }
  var TOP = 10;
  function fmt(n){ return Math.round(n).toLocaleString("pt-BR"); }
  function rankList(k){ var l = load("cds-rank:" + k); return Array.isArray(l) ? l : []; }
  function ills(){ var m = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ m[i.name] = i.src; }); return m; }

  class CmpLesson extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._built){
        this._built = true; this._name = "cmp-ls-" + (++uid);
        this.card = this.appendChild(CDS.create("cds-card", { "has-border": "true" }));
        this.body = this.card.appendChild(CDS.create("div", { role: "group" }, "cmp-ls"));
        this.intro();
      }
      CDS.attr(this.body, "aria-label", this.getAttribute("label") || "Lição");
    }
    get key(){ var k = this.getAttribute("storage-key"); return k ? "cds-lesson:" + k : null; }
    get list(){ return this.exercises || []; }
    get mult(){ var m = parseFloat(this.getAttribute("score-multiplier")); return m > 0 ? m : 1; }
    get rankKey(){ return this.getAttribute("ranking-key"); }
    comboOf(streak){ return streak >= 5 ? 3 : streak >= 3 ? 2 : 1; }
    clear(){ this.body.innerHTML = ""; return this.body; }
    focusFirst(sel){ var h = this.body.querySelector(sel || ".cmp-ls__q, .cmp-ls__title"); if (h){ h.tabIndex = -1; h.focus({ preventScroll: true }); } }

    // Tela de abertura (ou de resultado anterior): ilustração, título, quantos exercícios e o Main Button de começar
    screen(o){
      var c = CDS.create, b = this.clear(), m = ills();
      var box = b.appendChild(c("div", { "aria-live": "polite" }, "cmp-ls__screen"));
      if (o.ill && m[o.ill]){ var im = box.appendChild(c("img", { alt: "", width: "120", height: "120" }, "cmp-ls__ill")); im.src = m[o.ill]; }
      if (o.eyebrow) box.appendChild(c("p", null, "cmp-ls__eyebrow")).textContent = o.eyebrow;
      box.appendChild(c("p", null, "cmp-ls__title")).textContent = o.title;
      if (o.text) box.appendChild(c("p", null, "cmp-ls__text")).textContent = o.text;
      if (o.tags && o.tags.length){ var tg = box.appendChild(c("div", null, "cmp-ls__tags")); o.tags.forEach(function(t){ tg.appendChild(c("cds-tag", { label: t[0], appearance: t[1] || "neutral", "show-lead-item": t[2] ? "true" : "false", icon: t[2] || null })); }); }
      var acts = box.appendChild(c("div", null, "cmp-ls__screen-actions"));
      (o.actions || []).forEach(function(a){ var btn = acts.appendChild(c("cds-main-button", { label: a.label, appearance: a.appearance || null, "show-lead-icon": a.icon ? "true" : "false", "lead-icon": a.icon || null, "show-trailing-icon": "false" })); btn.addEventListener("click", a.run); });
      if (o.link){ acts.appendChild(c("cds-link", { label: o.link.label, href: o.link.href, appearance: "accent", "show-trailing-item": "false" })); }
      this.focusFirst(".cmp-ls__title");
    }
    intro(){
      var self = this, done = this.key ? load(this.key) : null, n = this.list.length;
      this.screen({ ill: this.getAttribute("illustration"), eyebrow: done ? "Concluída · " + done.xp + " XP" : "Lição", title: this.getAttribute("heading") || this.getAttribute("label") || "Lição",
        text: n + " exercícios · 3 vidas. Errou, a questão volta no fim.", tags: [done && done.perfect ? ["Sem erros", "positive", "positive-line"] : null, this.mult !== 1 ? ["Pontos x" + String(this.mult).replace(".", ","), "accent", "bright-star-line"] : null].filter(Boolean),
        actions: [{ label: done ? "Fazer de novo" : "Começar lição", icon: done ? "refresh-line" : null, run: function(){ self.start(); } }],
        link: this.getAttribute("tips-href") ? { label: this.getAttribute("tips-label") || "Rever as dicas", href: this.getAttribute("tips-href") } : null });
    }

    start(){
      if (typeof this.resample === "function") this.exercises = this.resample(); // novo sorteio a cada partida, quando quem usa oferece
      this.queue = this.list.map(function(x, i){ return { ex: x, base: i, review: false }; });
      this.pos = 0; this.lives = 3; this.extra = false; this.mistakes = 0; this.correct = 0; this.doneBase = {}; this.score = 0; this.streak = 0; this._ranked = false; this._pos = 0; this._rankFail = null;
      this.next();
    }
    next(){
      if (this.pos >= this.queue.length) return this.finish();
      this.item = this.queue[this.pos]; this.answered = false; this.choice = null;
      this.play();
    }

    // Tela de exercício: topo (sair · progresso · vidas), tipo, visual, pergunta, resposta, feedback e Fixed Bar
    play(){
      var self = this, c = CDS.create, b = this.clear(), it = this.item, ex = it.ex, n = this.list.length;
      var top = b.appendChild(c("div", null, "cmp-ls__top"));
      var quit = top.appendChild(c("cds-icon-button", { icon: "close-line", kind: "ghost", appearance: "neutral", size: "small", label: "Sair da lição" }));
      quit.addEventListener("click", function(){ self.intro(); });
      var doneCount = Object.keys(this.doneBase).length;
      top.appendChild(c("cds-nav-control", { viewport: "mobile", total: String(Math.min(n, 10)), current: String(Math.min(doneCount + 1, Math.min(n, 10))), label: "Exercício {n} de {total}" }));
      this.heartsEl = top.appendChild(c("div", { role: "img" }, "cmp-ls__hearts"));
      this.drawHearts();
      var kind = b.appendChild(c("div", null, "cmp-ls__kind"));
      kind.appendChild(c("span", null, "cmp-ls__kind-text")).textContent = KIND[ex.type] || "";
      if (it.review) kind.appendChild(c("cds-tag", { label: "Revisão", appearance: "warning", "show-lead-item": "false" }));
      var nx = this.comboOf(this.streak + 1);
      var pts = kind.appendChild(c("div", null, "cmp-ls__score"));
      if (nx > 1) pts.appendChild(c("cds-tag", { label: "Combo x" + nx, appearance: "positive", "show-lead-item": "true", icon: "flash-line" }));
      this.scoreEl = pts.appendChild(c("cds-tag", { label: fmt(this.score) + " pontos", appearance: "accent", "show-lead-item": "false" }));
      if (ex.visual){ var vis = c("div", null, "cmp-ls__vis"); vis.appendChild(ex.visual()); b.appendChild(vis); }
      var area = b.appendChild(c("div", null, "cmp-ls__area"));
      this.fb = b.appendChild(c("div", { "aria-live": "polite" }, "cmp-ls__fb"));
      this.bar = b.appendChild(c("cds-fixed-bar", { kind: "stacked", "show-secondary-action": "false", "show-divider": "false", "primary-label": "Verificar", "show-lead-icon": "false" }));
      this.bar.addEventListener("cds-action", function(e){ if (e.detail.action !== "primary") return; if (self.answered) self.advance(); else self.verify(); });
      ({ choice: this.uiChoice, verdict: this.uiChoice, fill: this.uiFill, order: this.uiOrder, pairs: this.uiPairs })[ex.type].call(this, area, ex);
      this.setReady(ex.type === "order");
      this.focusFirst();
    }
    drawHearts(){
      var c = CDS.create, h = this.heartsEl; h.innerHTML = "";
      var total = this.extra ? 2 : 3;
      for (var i = 0; i < total; i++) h.appendChild(c("cds-icon", { icon: i < this.lives ? "favorite-filled" : "favorite-line", size: "medium", appearance: i < this.lives ? "accent" : "neutral", "aria-hidden": "true" }));
      CDS.attr(h, "aria-label", this.lives + (this.lives === 1 ? " vida" : " vidas"));
    }
    primaryBtn(){ return this.bar && this.bar.priEl; } // o Fixed Bar é o .Footer: priEl é o Main Button primário
    setReady(on){ var p = this.primaryBtn(); if (p) CDS.attr(p, "disabled", on ? null : ""); }
    setPrimary(label){ CDS.attr(this.bar, "primary-label", label); }

    uiChoice(area, ex){
      var self = this, c = CDS.create, opts = ex.type === "verdict" ? ["Use", "Não use"] : ex.options, qid = this._name + "-" + this.pos;
      area.appendChild(c("p", { id: qid }, "cmp-ls__q")).textContent = ex.q;
      var sl = c("cds-selection-list", { kind: "card", label: ex.q });
      opts.forEach(function(o, k){ sl.appendChild(c("cds-selection-list-item", { "trailing-item": "radio-button", name: qid, value: String(k), label: o, "show-lead-item": "false", "show-description": "false" })); });
      area.appendChild(sl); this.choiceEl = sl;
      sl.addEventListener("cds-change", function(e){ var v = (e.detail.values || [])[0]; if (v == null || self.answered) return; self.choice = Number(v); self.setReady(true); });
    }
    uiFill(area, ex){
      var self = this, c = CDS.create, parts = ex.text.split("___");
      var p = area.appendChild(c("p", null, "cmp-ls__q"));
      p.appendChild(document.createTextNode(parts[0]));
      this.blank = p.appendChild(c("span", null, "cmp-ls__blank")); this.blank.textContent = "______";
      p.appendChild(document.createTextNode(parts[1] || ""));
      var g = area.appendChild(c("cds-chips-group", { "role-kind": "multiple", label: "Opções para completar" }));
      ex.options.forEach(function(o, k){
        var ch = g.appendChild(c("cds-filter-chip", { label: o, "show-lead-icon": "false" }));
        ch.addEventListener("cds-change", function(e){
          if (self.answered) return;
          [].forEach.call(g.querySelectorAll("cds-filter-chip"), function(x){ if (x !== ch) x.removeAttribute("selected"); });
          self.choice = e.detail.selected ? k : null; self.blank.textContent = e.detail.selected ? o : "______"; self.setReady(self.choice != null);
        });
      });
      this.choiceEl = g;
    }
    uiOrder(area, ex){
      var self = this, c = CDS.create, cur = shuffle(ex.pieces);
      area.appendChild(c("p", null, "cmp-ls__q")).textContent = ex.q;
      var list = area.appendChild(c("ol", { "aria-label": "Peças para ordenar" }, "cmp-ls__pieces"));
      this.orderCur = cur; this.choiceEl = list;
      function draw(focus){
        list.innerHTML = "";
        cur.forEach(function(t, i){
          var li = list.appendChild(c("li", null, "cmp-ls__piece"));
          var card = c("cds-card", { "has-border": "true" }); card.appendChild(c("cds-text-content", { label: (i + 1) + ". " + t, "show-description": "false" })); li.appendChild(card);
          var mv = li.appendChild(c("div", null, "cmp-ls__move"));
          [[-1, "up-line", "Subir"], [1, "down-line", "Descer"]].forEach(function(m){
            var ib = mv.appendChild(c("cds-icon-button", { icon: m[1], label: m[2] + " " + t, kind: "ghost", size: "small", appearance: "neutral" }));
            if ((m[0] < 0 && i === 0) || (m[0] > 0 && i === cur.length - 1)) ib.setAttribute("disabled", "");
            ib.addEventListener("click", function(){ if (ib.hasAttribute("disabled") || self.answered) return; var j = i + m[0], t2 = cur[j]; cur[j] = cur[i]; cur[i] = t2; draw(j); });
          });
        });
        if (focus != null){ var tgt = list.children[focus] && list.children[focus].querySelector("cds-icon-button:not([disabled]) button"); if (tgt) tgt.focus(); }
      }
      draw();
    }
    uiPairs(area, ex){
      var self = this, c = CDS.create, name = this._name + "-p" + this.pos, left = null, right = null, matched = 0;
      area.appendChild(c("p", null, "cmp-ls__q")).textContent = ex.q;
      var cols = area.appendChild(c("div", null, "cmp-ls__pairs"));
      function col(items, side){ var sl = c("cds-selection-list", { kind: "card", label: side === "l" ? "Coluna da esquerda" : "Coluna da direita" }); items.forEach(function(t){ sl.appendChild(c("cds-selection-list-item", { "trailing-item": "radio-button", name: name + side, value: t, label: t, "show-lead-item": "false", "show-description": "false" })); }); cols.appendChild(sl); return sl; }
      var L = col(ex.pairs.map(function(p){ return p[0]; }), "l"), R = col(shuffle(ex.pairs.map(function(p){ return p[1]; })), "r");
      this.choiceEl = cols;
      function isMatched(sl, v){ return sl.items.some(function(it){ return it.getAttribute("value") === v && it.hasAttribute("data-matched"); }); }
      function clear(sl){ sl.items.forEach(function(it){ if (it.hasAttribute("data-matched")) return; it.active = false; var inp = it.controlInput; if (inp) inp.checked = false; var rb = it.querySelector("cds-radio-button"); if (rb) rb.setAttribute("status", "unselected"); }); }
      function test(){
        if (left == null || right == null) return;
        var ok = ex.pairs.some(function(p){ return p[0] === left && p[1] === right; });
        if (ok){
          [[L, left, right], [R, right, left]].forEach(function(x){ x[0].items.forEach(function(it){ if (it.getAttribute("value") === x[1]){ it.setAttribute("data-matched", ""); it.setAttribute("name", name + "-ok-" + matched); it.setAttribute("tag-label", x[2]); it.setAttribute("trailing-item", "tag"); it.active = true; it.inert = true; var tr = it.trailEl; if (tr){ tr.setAttribute("tag-appearance", "positive"); if (tr.control) tr.control.setAttribute("show-lead-item", "false"); } } }); });
          matched++; self.fb.innerHTML = "";
          if (matched === ex.pairs.length){ self.choice = "ok"; self.verify(); }
        } else {
          self.loseLife(); self.pairsMiss = true;
          var al = c("cds-alert", { appearance: "warning", label: "Esse par não combina", "show-close-button": "false" });
          al.appendChild(c("span")).textContent = left + " não é " + right + ".";
          self.fb.innerHTML = ""; self.fb.appendChild(al);
          clear(L); clear(R);
          if (self.lives <= 0) return self.outOfLives();
        }
        left = right = null;
      }
      L.addEventListener("cds-change", function(e){ var v = (e.detail.values || []).filter(function(x){ return !isMatched(L, x); })[0]; if (v != null){ left = v; test(); } });
      R.addEventListener("cds-change", function(e){ var v = (e.detail.values || []).filter(function(x){ return !isMatched(R, x); })[0]; if (v != null){ right = v; test(); } });
      this.pairsMiss = false;
      this.bar.hidden = true; // ligar pares confere sozinho a cada par
    }

    rightText(ex){
      if (ex.type === "verdict") return ex.answer === "do" ? "Use" : "Não use";
      if (ex.type === "choice" || ex.type === "fill") return ex.options[ex.answer];
      if (ex.type === "order") return ex.pieces.join(" → ");
      return "";
    }
    isRight(ex){
      if (ex.type === "verdict") return (this.choice === 0 ? "do" : "dont") === ex.answer;
      if (ex.type === "choice" || ex.type === "fill") return this.choice === ex.answer;
      if (ex.type === "order") return this.orderCur.every(function(t, i){ return t === ex.pieces[i]; });
      if (ex.type === "pairs") return !this.pairsMiss;
      return false;
    }
    loseLife(){ this.lives = Math.max(0, this.lives - 1); this.mistakes++; this.streak = 0; this.drawHearts(); }
    verify(){
      var c = CDS.create, it = this.item, ex = it.ex, ok = this.isRight(ex), pick = function(a, i){ return a[i % a.length]; };
      this.answered = true;
      if (this.choiceEl) this.choiceEl.inert = true;
      var gain = 0, combo = 1;
      if (ok){ this.correct++; this.doneBase[it.base] = true; this.streak++; combo = this.comboOf(this.streak); gain = (it.review ? 50 : 100) * combo; this.score += gain; }
      else if (ex.type !== "pairs"){ this.loseLife(); }
      if (!ok && !it.review){ this.queue.push({ ex: ex, base: it.base, review: true }); } // a questão errada volta no fim, uma vez
      else if (!ok){ this.doneBase[it.base] = true; }
      var al = c("cds-alert", { appearance: ok ? "positive" : "warning", label: ok ? pick(RIGHT, this.pos) : pick(WRONG, this.pos), "show-close-button": "false" });
      var rt = this.rightText(ex);
      al.appendChild(c("span")).textContent = (ok ? "+" + gain + " pontos" + (combo > 1 ? " com combo x" + combo : "") + ". " : "") + (ok || !rt ? "" : "A resposta é: " + rt + ". ") + (ex.why || "");
      if (this.scoreEl) CDS.attr(this.scoreEl, "label", fmt(this.score) + " pontos");
      this.fb.innerHTML = ""; this.fb.appendChild(al);
      this.bar.hidden = false; this.setPrimary("Continuar"); this.setReady(true);
      var p = this.primaryBtn(); if (p){ var b = p.querySelector("button"); if (b) b.focus({ preventScroll: true }); }
      if (this.lives <= 0) this._outAfter = true;
    }
    advance(){
      if (this._outAfter){ this._outAfter = false; return this.outOfLives(); }
      this.pos++; this.next();
    }
    outOfLives(){
      var self = this;
      if (!this.extra){
        this.extra = true; this.lives = 2;
        return this.screen({ ill: "objetos/presente-aberto", eyebrow: "As 3 vidas acabaram", title: "Ganhou mais 2 vidas", text: "Para você chegar ao fim da lição. Vale uma vez por lição.",
          actions: [{ label: "Continuar com 2 vidas", run: function(){ if (self.item && self.item.ex.type === "pairs" && !self.answered){ self.play(); } else { self.pos++; self.next(); } } }] });
      }
      var total = Math.round(this.score * this.mult);
      if (this.qualifies(total) && !this._ranked){ this._ranked = true; return this.initials(total, "Fim de jogo", "Os acertos valem. Grave suas iniciais no ranking.", function(){ self.outOfLives(); }); }
      this.screen({ ill: "notificacoes/error-low-detail", eyebrow: "As vidas acabaram", title: "Quase lá", text: "Reveja as dicas e comece de novo. Na próxima vai.",
        actions: [{ label: "Recomeçar lição", icon: "refresh-line", run: function(){ self.start(); } }, { label: "Sair", appearance: "neutral", run: function(){ self.intro(); } }],
        link: this.getAttribute("tips-href") ? { label: this.getAttribute("tips-label") || "Rever as dicas", href: this.getAttribute("tips-href") } : null });
      this.rankFailAlert();
    }
    finish(){
      var self = this, n = this.list.length, perfect = this.mistakes === 0, xp = 10 + (perfect ? 5 : 0);
      var lifeB = 200 * this.lives, perfB = perfect ? 500 : 0, total = Math.round((this.score + lifeB + perfB) * this.mult);
      if (this.key){ var prev = load(this.key) || {}; save(this.key, { xp: Math.max(prev.xp || 0, xp), perfect: !!(prev.perfect || perfect), best: Math.max(prev.best || 0, total), last: new Date().toISOString().slice(0, 10) }); }
      this.dispatchEvent(new CustomEvent("cmp-lesson-done", { detail: { xp: xp, correct: n - Math.min(n, this.mistakes), total: n, perfect: perfect, score: total }, bubbles: true }));
      var parts = [fmt(this.score) + " dos acertos"];
      if (lifeB) parts.push(fmt(lifeB) + " das vidas");
      if (perfB) parts.push("500 sem erros");
      var how = parts.join(" + ") + (this.mult !== 1 ? ", x" + String(this.mult).replace(".", ",") + " por jogar todos os temas" : "") + ".";
      var result = function(){
        var tags = [["+" + xp + " XP", "accent", "bright-star-line"], [self.mistakes + (self.mistakes === 1 ? " erro" : " erros"), perfect ? "positive" : "neutral"]];
        if (self._pos) tags.push([self._pos + (self._rankFail ? "º neste navegador" : "º no ranking"), self._rankFail ? "neutral" : "positive", self._pos === 1 ? "admin-line" : "medal-line"]); // coroa (admin-line) para o 1º
        self.screen({ ill: perfect ? "objetos/trofeu" : "objetos/medalha-1", eyebrow: "Lição concluída", title: fmt(total) + " pontos",
          text: how, tags: tags,
          actions: [{ label: "Fazer de novo", appearance: "neutral", icon: "refresh-line", run: function(){ self.start(); } }] });
        self.rankFailAlert();
      };
      if (this.qualifies(total)){ this._ranked = true; return this.initials(total, perfect ? "Novo recorde sem erros" : "Novo recorde", how, result); }
      result();
    }

    // Grava no ranking compartilhado; o resultado vira Toast (gravou) ou Alert com nova tentativa (não gravou)
    sendRemote(entry, after){
      var self = this;
      var done = function(r, err){
        self._rankFail = r ? null : { entry: entry, after: after, why: err && err.message };
        if (r && r.position) self._pos = r.position;
        if (r) self.toast("Partida gravada no ranking do time");
        self.dispatchEvent(new CustomEvent("cmp-lesson-rank", { detail: { entry: entry, position: self._pos, remote: !!r, error: err ? String(err.message || err) : null }, bubbles: true }));
        after();
      };
      return Promise.resolve(this.remote.add(entry)).then(function(r){ done(r); }, function(e){ done(null, e); });
    }
    toast(text){
      if (this._toast) this._toast.remove();
      var t = this._toast = document.body.appendChild(CDS.create("cds-toast", { appearance: "positive", text: text, "show-trailing-item": "false" }, "cmp-lesson__toast"));
      setTimeout(function(){ if (t.parentNode && t.close) t.close(); else if (t.parentNode) t.remove(); }, 4000);
    }
    // Alert do "não gravou", na tela de resultado: o motivo e a nova tentativa
    rankFailAlert(){
      var f = this._rankFail; if (!f) return;
      var self = this, c = CDS.create, box = this.body.querySelector(".cmp-ls__screen-actions"); if (!box) return;
      var why = /timeout|rede/.test(f.why || "") || !f.why ? "O ranking do time não respondeu. Tente de novo em alguns segundos." : f.why + ".";
      var al = c("cds-alert", { appearance: "warning", label: "Não deu para gravar no ranking do time", "show-close-button": "false", text: why + " A partida ficou salva neste navegador." }, "cmp-ls__rank-alert");
      box.parentNode.insertBefore(al, box);
      var retry = c("cds-main-button", { label: "Tentar gravar de novo", "show-lead-icon": "true", "lead-icon": "refresh-line", "show-trailing-icon": "false" });
      retry.addEventListener("click", function(){ retry.setAttribute("disabled", ""); retry.setAttribute("label", "Gravando no ranking do time"); self.sendRemote(f.entry, f.after); });
      box.insertBefore(retry, box.firstChild);
    }

    // Ranking (Top 10 deste navegador): entra quem faz mais pontos que o 10º
    board(){ return this.remote && Array.isArray(this.remote.top) ? this.remote.top : rankList(this.rankKey); }
    qualifies(total){ if (!this.rankKey || total <= 0) return false; var l = this.board(); return l.length < TOP || total > l[TOP - 1].score; }
    // Tela de iniciais, como nos fliperamas: Code Input OTP com 3 caracteres; as últimas iniciais já vêm preenchidas
    initials(total, eyebrow, text, after){
      var self = this, c = CDS.create, k = this.rankKey, l = this.board();
      var pos = l.filter(function(e){ return e.score >= total; }).length + 1;
      this.screen({ ill: "objetos/trofeu", eyebrow: eyebrow + " · " + pos + "º lugar", title: fmt(total) + " pontos", text: text,
        actions: [{ label: "Gravar no ranking", run: function(){ go(true); } }, { label: "Agora não", appearance: "neutral", run: function(){ go(false); } }] });
      var box = this.body.querySelector(".cmp-ls__screen-actions");
      var code = c("cds-code-input", { length: "3", label: "Suas iniciais", "show-required": "false", "show-trailing-item": "false", separators: "none", supporting: "Três letras ou números, como nos fliperamas", value: load("cds-rank:_last") || "" });
      box.insertBefore(code, box.firstChild);
      setTimeout(function(){ var inp = code.querySelector("input"); if (inp && !code.getAttribute("value")) inp.focus({ preventScroll: true }); });
      code.addEventListener("cds-complete", function(){ var b = box.querySelector("cds-main-button button"); if (b) b.focus({ preventScroll: true }); });
      function go(keep){
        if (keep){
          var name = (code.value || "").toUpperCase();
          if (!/^[A-Z0-9]{3}$/.test(name)){ CDS.attr(code, "error", "Use três letras ou números"); return; }
          var entry = { name: name, score: total, label: self.getAttribute("ranking-label") || self.getAttribute("heading") || "", date: new Date().toISOString().slice(0, 10) };
          var list = rankList(k); list.push(entry); list.sort(function(a, b){ return b.score - a.score; }); list = list.slice(0, TOP);
          save("cds-rank:" + k, list); save("cds-rank:_last", name);
          self._pos = list.indexOf(entry) + 1;
          if (self.remote && typeof self.remote.add === "function"){
            var btn = box.querySelector("cds-main-button"); if (btn){ btn.setAttribute("disabled", ""); btn.setAttribute("label", "Gravando no ranking do time"); }
            return self.sendRemote(entry, after);
          }
          self.dispatchEvent(new CustomEvent("cmp-lesson-rank", { detail: { entry: entry, position: self._pos }, bubbles: true }));
        }
        after();
      }
    }
  }
  CmpLesson.ranking = rankList;
  CmpLesson.define("cmp-lesson");
})();
