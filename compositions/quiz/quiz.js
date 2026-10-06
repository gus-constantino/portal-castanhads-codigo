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
 * Atributos: label (nome, aria-label do grupo) · kind ("choice" padrão | "verdict") · storage-key (guarda o melhor resultado
 *   no localStorage de quem joga, só como conveniência: nada sai do navegador) · unit ("Pergunta" padrão; "Cena" no verdict)
 * Evento: cmp-quiz-done { score, total, best }
 */
(function(){
  "use strict";
  var uid = 0;
  var RIGHT = ["Na mosca!", "Isso!", "Mandou bem!"], WRONG = ["Quase!", "Não foi dessa vez.", "Ops!"];
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
    restart(){ this.i = 0; this.score = 0; this.show(); }
    show(){
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
    result(){
      var self = this, c = CDS.create, b = this.body, n = this.list.length, s = this.score;
      var r = (this.results || []).filter(function(x){ return s >= x.min; })[0] || { title: s + " de " + n, text: "" };
      var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
      var box = b.appendChild(c("div", { "aria-live": "polite" }, "cmp-quiz__result"));
      if (r.illustration && ills[r.illustration]){ var im = box.appendChild(c("img", { alt: "", width: "120", height: "120" }, "cmp-quiz__ill")); im.src = ills[r.illustration]; }
      box.appendChild(c("p", null, "cmp-quiz__score")).textContent = s + " de " + n + " acertos";
      var key = this.getAttribute("storage-key"), best = this.best;
      if (key && (!best || s > best.score)){ best = { score: s, total: n }; save("cds-quiz:" + key, best); }
      box.appendChild(c("p", null, "cmp-quiz__title")).textContent = r.title;
      if (r.text) box.appendChild(c("p", null, "cmp-quiz__text")).textContent = r.text;
      if (best) box.appendChild(c("cds-tag", { label: "Seu melhor: " + best.score + " de " + best.total, appearance: best.score === best.total ? "positive" : "neutral", "show-lead-item": "false" }));
      var again = box.appendChild(c("cds-main-button", { label: this.verdict ? "Jogar de novo" : "Refazer o quiz", appearance: "neutral", "show-lead-icon": "true", "lead-icon": "refresh-line", "show-trailing-icon": "false" }));
      again.addEventListener("click", function(){ self.restart(); });
      this.dispatchEvent(new CustomEvent("cmp-quiz-done", { detail: { score: s, total: n, best: best }, bubbles: true }));
    }
  }
  CmpQuiz.define("cmp-quiz");
})();
