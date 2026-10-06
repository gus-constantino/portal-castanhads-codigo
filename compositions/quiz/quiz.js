/**
 * <cmp-quiz> — Quiz em cards · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * Por que existe: o DS não tem quiz. Esta composição monta um, pergunta por pergunta, só com componentes do DS:
 *   Card (Has Border) · Nav Control (Mobile: só os indicadores, a posição no quiz, sem clique) · Selection List Kind Card
 *   com Selection List Item Trailing Item=Radio Button (as opções) · Alert (Positive acertou · Warning errou, com o porquê)
 *   · Main Button (Próxima pergunta, Ver resultado, Refazer) · ilustração do [Caju] Illustrations no resultado.
 *
 * Anatomia (dentro do Card): .Head (Nav Control + "Pergunta n de N" em Disclaimer/Regular · Text/medium) · .Visual (opcional:
 *   o que `visual()` devolver, numa caixa Surface/01 · raio medium · pad 16) · .Question
 *   (Title/Small · Text/intense) · Selection List (inert depois de responder) · Alert (depois de responder) · .Actions (Main Button)
 *   Resultado: ilustração 120 · título (Title/Small) · texto (Body/Regular · Text/medium) · Main Button Secondary
 *
 * Modo Certo ou errado (kind="verdict"): no lugar da lista, a cena (visual + afirmação) e dois Main Buttons Neutral,
 *   "Use" (positive-line) e "Não use" (close-line). Respondeu, os botões saem e entra o Alert.
 *
 * Dados (propriedades, antes de conectar):
 *   questions  escolha: [{ q, options: [texto…], answer: índice, why, visual }] · verdict: [{ q, answer: "do"|"dont", why, visual }]
 *              visual = função que devolve o elemento (montado por quem usa, com componentes do DS)
 *   results    (opcional) [{ min, illustration, title, text }] — o primeiro cujo min ≤ acertos
 *   right / wrong  (opcional) frases do rótulo do Alert, uma por pergunta em rodízio
 * Quebra-cabeças (uma rodada só; nota = total − erros, mínimo 0):
 *   kind="order"  `pieces` = [texto…] na ordem certa. As peças vêm embaralhadas, cada uma num Card com dois Icon Buttons
 *                 Ghost Small (up-line e down-line) para mover. Main Button "Conferir" marca cada peça com Tag Positive
 *                 (no lugar) ou Warning (fora do lugar). Cada conferência errada conta um erro.
 *   kind="pairs"  `pairs` = [[esquerda, direita]…]. Duas Selection Lists Kind Card com Radio Button, a da direita
 *                 embaralhada. Um item de cada lado forma o par: certo, os dois ficam Is Active, trocam o Radio por Tag com o
 *                 par (Trailing Item=Tag) e travam; errado, Alert
 *                 Warning curto e conta um erro.
 *   `prompt` (opcional) é o enunciado e `why` o porquê, mostrado ao terminar.
 * Atributos: label (nome, aria-label do grupo) · kind ("choice" padrão | "verdict" | "order" | "pairs") · storage-key (guarda o melhor resultado
 *   no localStorage de quem joga, só como conveniência: nada sai do navegador) · unit ("Pergunta" padrão; "Cena" no verdict)
 * Evento: cmp-quiz-done { score, total, best }
 */
(function(){
  "use strict";
  var uid = 0;
  var RIGHT = ["Na mosca", "Isso mesmo", "Mandou bem"], WRONG = ["Quase", "Não foi dessa vez", "Não é bem assim"]; // títulos sem ! e sem "Ops" (Conteúdo › Formatação e Tom e voz)
  var VERDICT = { "do": "Use", dont: "Não use" };
  function load(k){ try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e){ return null; } }
  function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e){} }
  class CmpQuiz extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    get verdict(){ return this.getAttribute("kind") === "verdict"; }
    get unit(){ return this.getAttribute("unit") || (this.verdict ? "Cena" : "Pergunta"); }
    get best(){ var k = this.getAttribute("storage-key"); return k ? load("cds-quiz:" + k) : null; }
    render(){
      if (!this._built){
        this._built = true; this._name = "cmp-quiz-" + (++uid);
        this.card = this.appendChild(CDS.create("cds-card", { "has-border": "true" }));
        this.body = this.card.appendChild(CDS.create("div", null, "cmp-quiz"));
        this.restart();
      }
      CDS.attr(this.body, "aria-label", this.getAttribute("label") || "Quiz");
      this.body.setAttribute("role", "group");
    }
    get list(){ return this.questions || []; }
    restart(){ this.i = 0; this.score = 0; this.errors = 0; this.show(); }
    get puzzle(){ var k = this.getAttribute("kind"); return k === "order" || k === "pairs" ? k : null; }
    show(){
      if (this.puzzle) return this.done ? this.result() : this.puzzle === "order" ? this.order() : this.pairsGame();
      var self = this, c = CDS.create, q = this.list[this.i], n = this.list.length, b = this.body;
      b.innerHTML = "";
      if (!q) return this.result();
      var head = b.appendChild(c("div", null, "cmp-quiz__head"));
      head.appendChild(c("cds-nav-control", { viewport: "mobile", total: String(n), current: String(this.i + 1), label: this.unit + " {n} de {total}" }));
      head.appendChild(c("span", { "aria-hidden": "true" }, "cmp-quiz__count")).textContent = this.unit + " " + (this.i + 1) + " de " + n;
      if (q.visual){ // visual da pergunta (montado por quem usa, com componentes do DS), acima da pergunta
        var vis = c("div", null, "cmp-quiz__vis"); vis.appendChild(q.visual()); b.appendChild(vis);
      }
      var qid = this._name + "-q" + this.i;
      b.appendChild(c("p", { id: qid }, "cmp-quiz__q")).textContent = q.q;
      var fb, act, pick = function(a){ return a[self.i % a.length]; };
      // Respondeu: Alert com o porquê (mensagem entra antes de o Alert conectar) e o Main Button de avançar
      function answered(ok, right){
        if (ok) self.score++;
        var al = c("cds-alert", { appearance: ok ? "positive" : "warning", label: ok ? pick(self.right || RIGHT) : pick(self.wrong || WRONG), "show-close-button": "false" });
        al.appendChild(c("span")).textContent = (ok ? "" : "A resposta é: " + right + ". ") + q.why;
        fb.appendChild(al);
        var last = self.i === n - 1;
        var btn = act.appendChild(c("cds-main-button", { label: last ? "Ver resultado" : "Próxima " + self.unit.toLowerCase(), "show-lead-icon": "false", "show-trailing-icon": last ? "false" : "true", "trailing-icon": "navigation-right-line" }));
        btn.addEventListener("click", function(){ self.i++; self.show(); var h = self.body.querySelector(".cmp-quiz__q, .cmp-quiz__title"); if (h){ h.tabIndex = -1; h.focus({ preventScroll: true }); } });
      }
      if (this.verdict){
        var row = c("div", { role: "group", "aria-label": "Sua resposta" }, "cmp-quiz__verdict");
        ["do", "dont"].forEach(function(k){
          var vb = row.appendChild(c("cds-main-button", { label: VERDICT[k], appearance: "neutral", "show-lead-icon": "true", "lead-icon": k === "do" ? "positive-line" : "close-line", "show-trailing-icon": "false" }));
          vb.addEventListener("click", function(){ if (row.inert) return; row.inert = true; row.hidden = true; answered(k === q.answer, VERDICT[q.answer]); });
        });
        b.appendChild(row);
        fb = b.appendChild(c("div", null, "cmp-quiz__fb")); act = b.appendChild(c("div", null, "cmp-quiz__actions"));
        return;
      }
      // Itens entram antes de a lista conectar (sem filhos, a Selection List monta a amostra de 12)
      var sl = c("cds-selection-list", { kind: "card", label: q.q });
      q.options.forEach(function(o, k){
        sl.appendChild(c("cds-selection-list-item", { "trailing-item": "radio-button", name: qid, value: String(k), label: o, "show-lead-item": "false", "show-description": "false" }));
      });
      b.appendChild(sl);
      fb = b.appendChild(c("div", null, "cmp-quiz__fb")); act = b.appendChild(c("div", null, "cmp-quiz__actions"));
      sl.addEventListener("cds-change", function(e){
        if (sl.inert) return;
        var v = (e.detail.values || [])[0]; if (v == null) return;
        sl.inert = true; // trava a resposta sem o visual de Disabled: a opção escolhida segue marcada
        answered(Number(v) === q.answer, q.options[q.answer]);
      });
    }
    // Embaralha sem deixar na ordem certa (Fisher-Yates)
    shuffle(a){ var b = a.slice(), ok = a.length < 2; do { for (var i = b.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; } } while (!ok && b.every(function(x, k){ return x === a[k]; })); return b; }
    head(total){
      var c = CDS.create, b = this.body;
      if (this.prompt) b.appendChild(c("p", null, "cmp-quiz__q")).textContent = this.prompt;
      return b;
    }
    finish(fb, act, total){
      var self = this, c = CDS.create;
      this.score = Math.max(0, total - this.errors); this.total = total;
      var al = c("cds-alert", { appearance: "positive", label: this.errors ? "Montou" : "De primeira", "show-close-button": "false" });
      al.appendChild(c("span")).textContent = (this.why || "") + (this.errors ? " " + this.errors + (this.errors === 1 ? " tentativa errada." : " tentativas erradas.") : "");
      fb.innerHTML = ""; fb.appendChild(al);
      var btn = act.appendChild(c("cds-main-button", { label: "Ver resultado", "show-lead-icon": "false", "show-trailing-icon": "false" }));
      btn.addEventListener("click", function(){ self.done = true; self.show(); });
    }
    order(){
      var self = this, c = CDS.create, b = this.body, right = this.pieces || [], cur = this.shuffle(right);
      b.innerHTML = ""; this.head();
      var list = b.appendChild(c("ol", { "aria-label": "Peças para ordenar" }, "cmp-quiz__pieces"));
      var fb = c("div", { "aria-live": "polite" }, "cmp-quiz__fb"), act = c("div", null, "cmp-quiz__actions"), check;
      function draw(focus){
        list.innerHTML = "";
        cur.forEach(function(t, i){
          var li = list.appendChild(c("li", null, "cmp-quiz__piece"));
          var card = c("cds-card", { "has-border": "true" }); card.appendChild(c("cds-text-content", { label: (i + 1) + ". " + t, "show-description": "false" }));
          li.appendChild(card);
          var tag = li.appendChild(c("cds-tag", { label: "", "show-lead-item": "false", hidden: "" }, "cmp-quiz__mark"));
          var mv = li.appendChild(c("div", null, "cmp-quiz__move"));
          [["up", -1, "up-line", "Subir"], ["down", 1, "down-line", "Descer"]].forEach(function(m){
            var ib = mv.appendChild(c("cds-icon-button", { icon: m[2], label: m[3] + " " + t, kind: "ghost", size: "small", appearance: "neutral" }));
            if ((m[1] < 0 && i === 0) || (m[1] > 0 && i === cur.length - 1)) ib.setAttribute("disabled", "");
            ib.addEventListener("click", function(){ if (ib.hasAttribute("disabled")) return; var j = i + m[1], t2 = cur[j]; cur[j] = cur[i]; cur[i] = t2; fb.innerHTML = ""; draw({ i: j, dir: m[0] }); });
          });
        });
        if (focus){ var tgt = list.children[focus.i] && list.children[focus.i].querySelector('cds-icon-button:not([disabled]) button'); if (tgt) tgt.focus(); }
      }
      draw();
      b.appendChild(fb); b.appendChild(act);
      check = act.appendChild(c("cds-main-button", { label: "Conferir", "show-lead-icon": "true", "lead-icon": "positive-line", "show-trailing-icon": "false" }));
      check.addEventListener("click", function(){
        var ok = 0;
        cur.forEach(function(t, i){ var m = list.children[i].querySelector(".cmp-quiz__mark"), good = t === right[i]; if (good) ok++; m.hidden = false; m.setAttribute("label", good ? "No lugar" : "Fora do lugar"); m.setAttribute("appearance", good ? "positive" : "warning"); });
        if (ok === right.length){ list.inert = true; check.remove(); self.finish(fb, act, right.length); return; }
        self.errors++;
        var al = c("cds-alert", { appearance: "warning", label: "Quase", "show-close-button": "false" });
        al.appendChild(c("span")).textContent = ok + " de " + right.length + " peças no lugar. Mova as outras e confira de novo.";
        fb.innerHTML = ""; fb.appendChild(al);
      });
    }
    pairsGame(){
      var self = this, c = CDS.create, b = this.body, pairs = this.pairs || [], name = this._name + "-p", left = null, rightSel = null, matched = 0;
      b.innerHTML = ""; this.head();
      var cols = b.appendChild(c("div", null, "cmp-quiz__pairs"));
      function col(items, side){
        var sl = c("cds-selection-list", { kind: "card", label: side === "l" ? "Coluna da esquerda" : "Coluna da direita" });
        items.forEach(function(t, k){ sl.appendChild(c("cds-selection-list-item", { "trailing-item": "radio-button", name: name + side, value: t, label: t, "show-lead-item": "false", "show-description": "false" })); });
        cols.appendChild(sl); return sl;
      }
      var L = col(pairs.map(function(p){ return p[0]; }), "l"), R = col(this.shuffle(pairs.map(function(p){ return p[1]; })), "r");
      var fb = b.appendChild(c("div", { "aria-live": "polite" }, "cmp-quiz__fb")), act = b.appendChild(c("div", null, "cmp-quiz__actions"));
      function clear(sl){ sl.items.forEach(function(it){ if (it.hasAttribute("data-matched")) return; it.active = false; var inp = it.controlInput; if (inp) inp.checked = false; var rb = it.querySelector("cds-radio-button"); if (rb) rb.setAttribute("status", "unselected"); }); }
      function test(){
        if (left == null || rightSel == null) return;
        var ok = pairs.some(function(p){ return p[0] === left && p[1] === rightSel; });
        if (ok){
          // Par formado: Is Active e, no lugar do Radio, a Tag do próprio item com o par (Trailing Item=Tag); a linha trava
          [[L, left, rightSel], [R, rightSel, left]].forEach(function(x){ x[0].items.forEach(function(it){ if (it.getAttribute("value") === x[1]){ it.setAttribute("data-matched", ""); it.setAttribute("name", name + "-ok-" + matched); it.setAttribute("tag-label", x[2]); it.setAttribute("trailing-item", "tag"); it.active = true; it.inert = true;
            var tr = it.trailEl; if (tr){ tr.setAttribute("tag-appearance", "positive"); if (tr.control) tr.control.setAttribute("show-lead-item", "false"); } } }); });
          matched++; fb.innerHTML = "";
          if (matched === pairs.length){ cols.inert = true; self.finish(fb, act, pairs.length); }
        } else {
          self.errors++;
          var al = c("cds-alert", { appearance: "warning", label: "Esse par não combina", "show-close-button": "false" });
          al.appendChild(c("span")).textContent = left + " não é " + rightSel + ". Tente outro.";
          fb.innerHTML = ""; fb.appendChild(al);
          clear(L); clear(R);
        }
        left = rightSel = null;
      }
      L.addEventListener("cds-change", function(e){ var v = (e.detail.values || []).filter(function(x){ return !matchedVal(L, x); })[0]; if (v != null){ left = v; test(); } });
      R.addEventListener("cds-change", function(e){ var v = (e.detail.values || []).filter(function(x){ return !matchedVal(R, x); })[0]; if (v != null){ rightSel = v; test(); } });
      function matchedVal(sl, v){ return sl.items.some(function(it){ return it.getAttribute("value") === v && it.hasAttribute("data-matched"); }); }
    }
    result(){
      var self = this, c = CDS.create, b = this.body, n = this.puzzle ? this.total : this.list.length, s = this.score;
      b.innerHTML = "";
      var r = (this.results || []).filter(function(x){ return s >= x.min; })[0] || { title: s + " de " + n, text: "" };
      var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var box = b.appendChild(c("div", { "aria-live": "polite" }, "cmp-quiz__result"));
      if (r.illustration && ills[r.illustration]){ var im = box.appendChild(c("img", { alt: "", width: "120", height: "120" }, "cmp-quiz__ill")); im.src = ills[r.illustration]; }
      var errs = function(e){ return e ? e + (e === 1 ? " tentativa errada" : " tentativas erradas") : "Nenhuma tentativa errada"; };
      box.appendChild(c("p", null, "cmp-quiz__score")).textContent = this.puzzle ? errs(this.errors) : s + " de " + n + " acertos";
      var key = this.getAttribute("storage-key"), best = this.best;
      if (key && (!best || s > best.score)){ best = { score: s, total: n }; save("cds-quiz:" + key, best); }
      box.appendChild(c("p", null, "cmp-quiz__title")).textContent = r.title;
      if (r.text) box.appendChild(c("p", null, "cmp-quiz__text")).textContent = r.text;
      if (best) box.appendChild(c("cds-tag", { label: "Seu melhor: " + (this.puzzle ? (best.score === best.total ? "de primeira" : errs(best.total - best.score).toLowerCase()) : best.score + " de " + best.total), appearance: best.score === best.total ? "positive" : "neutral", "show-lead-item": "false" }));
      var again = box.appendChild(c("cds-main-button", { label: this.verdict || this.puzzle ? "Jogar de novo" : "Refazer o quiz", appearance: "neutral", "show-lead-icon": "true", "lead-icon": "refresh-line", "show-trailing-icon": "false" }));
      again.addEventListener("click", function(){ self.done = false; self.restart(); });
      this.dispatchEvent(new CustomEvent("cmp-quiz-done", { detail: { score: s, total: n, best: best }, bubbles: true }));
    }
  }
  CmpQuiz.define("cmp-quiz");
})();
