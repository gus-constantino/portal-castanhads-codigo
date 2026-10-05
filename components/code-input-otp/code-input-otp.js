/**
 * @deps text-field
 * <cds-code-input> — Code Input OTP · CDS-1608
 *
 * Atributos: length (3–6, padrão 6) · type (alphanumeric = letras, números e símbolos | numeric, padrão alphanumeric) · appearance (neutral|warning)
 * masked (Hidden Values) · disabled · value · separators ("3" | "2,4" | "all" | "none")
 * Texto: label (Text Label) · required-text (padrão "(Obrigatório)") · supporting · error
 * Booleans do Figma, ligados por padrão — passar "false" desliga:
 *   show-label · show-required · show-supporting-content · show-trailing-item
 * Estados forçados (specimen/doc): state="hovered|pressed" · is-active — só CSS, em todas as células
 * Eventos: cds-change {value} · cds-complete {value} · cds-visibility-change {masked}
 * Teclado: um único ponto de Tab no conjunto (roving tabindex na primeira célula vazia); setas/Home/End entre células
 */
(function(){
  "use strict";
  var MIN = 3, MAX = 6;
  var uid = 0;
  function clamp(n, a, b){ return Math.min(b, Math.max(a, n)); }

  class CdsCodeInput extends CDS.Element {
    static get observedAttributes(){ return ["length","type","value","masked","disabled","appearance","label","required-text","supporting","error","separators","show-label","show-required","show-supporting-content","show-trailing-item"]; }
    constructor(){ super(); this.inputs = []; this.boxes = []; this._id = "cds-ci-" + (++uid); }
    get length(){ return clamp(parseInt(this.getAttribute("length"), 10) || 6, MIN, MAX); }
    get type(){ return this.getAttribute("type") === "numeric" ? "numeric" : "alphanumeric"; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "neutral"; }
    get masked(){ return this.hasAttribute("masked"); }
    get disabled(){ return this.hasAttribute("disabled"); }
    get separators(){
      var n = this.length, raw = this.getAttribute("separators"), all = [];
      for (var p = 1; p < n; p++) all.push(p);
      if (raw === "all") return all;
      if (raw === null || raw === "" || raw === "none") return [];
      return raw.split(",").map(function(s){ return parseInt(s, 10); }).filter(function(x){ return x >= 1 && x < n; });
    }
    get value(){ return this.inputs.map(function(i){ return i.value; }).join(""); }

    attributeChangedCallback(name){ if (this.isConnected) this.render(name === "value" ? null : this.value); }

    // alphanumeric aceita letras, números e símbolos (Q25) — qualquer caractere visível, sem espaço
    charOk(ch){ return this.type === "numeric" ? /^[0-9]$/.test(ch) : /^\S$/u.test(ch); }

    render(keep){
      var n = this.length, self = this;
      var source = (keep != null && keep !== "") ? keep : (this.getAttribute("value") || "");
      var initial = source.split("").filter(function(c){ return self.charOk(c); }).slice(0, n);
      var label = this.getAttribute("label");
      var warning = this.appearance === "warning";
      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      var seps = this.separators;
      var msgId = this._id + "-msg";

      this.classList.toggle("cds-ci--masked", this.masked);
      this.setAttribute("role", "group");
      this.setAttribute("aria-label", label || "Código de verificação");
      if (this.disabled) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      this.innerHTML = "";

      if (label && this.flag("show-label")){
        var lab = document.createElement("div");
        lab.className = "cds-tf__label cds-ci__label";
        var t = document.createElement("span"); t.textContent = label; lab.appendChild(t);
        var reqText = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
        if (this.flag("show-required") && reqText){ var r = document.createElement("span"); r.textContent = reqText; lab.appendChild(r); }
        this.appendChild(lab);
      }

      var row = document.createElement("div");
      row.className = "cds-ci__boxes";
      this.inputs = []; this.boxes = [];
      for (var i = 0; i < n; i++){
        var vb = document.createElement("div"); vb.className = "cds-ci__vb";
        var box = document.createElement("div"); box.className = "cds-ci__box";
        var inp = document.createElement("input");
        inp.className = "cds-ci__input";
        inp.type = this.masked ? "password" : "text";
        inp.inputMode = this.type === "numeric" ? "numeric" : "text";
        inp.autocomplete = i === 0 ? "one-time-code" : "off";
        inp.setAttribute("autocapitalize", "off");
        inp.spellcheck = false;
        inp.value = initial[i] || "";
        inp.disabled = this.disabled;
        inp.setAttribute("aria-label", "dígito " + (i + 1) + " de " + n);
        if (warning) inp.setAttribute("aria-invalid", "true");
        if (msg) inp.setAttribute("aria-describedby", msgId);
        var dot = document.createElement("span"); dot.className = "cds-ci__dot"; dot.setAttribute("aria-hidden", "true");
        var caret = document.createElement("span"); caret.className = "cds-ci__caret"; caret.setAttribute("aria-hidden", "true");
        box.appendChild(inp); box.appendChild(dot); box.appendChild(caret);
        box.classList.toggle("is-filled", !!inp.value);
        vb.appendChild(box);
        if (i < n - 1 && seps.indexOf(i + 1) !== -1){
          var s = document.createElement("span"); s.className = "cds-ci__sep"; s.setAttribute("aria-hidden", "true"); vb.appendChild(s);
        }
        this.wire(inp, i);
        this.inputs.push(inp); this.boxes.push(box);
        row.appendChild(vb);
      }

      // Um único ponto de tabulação (annotation de Accessibility): só a célula "atual" fica no Tab
      this.rove(this.firstEmpty());

      // Visibility Action — alterna Hidden Values; o ícone reflete o estado atual
      if (this.flag("show-trailing-item")){
        // Nested instance: Icon Button · Ghost · Neutral · Small
        var act = document.createElement("cds-icon-button");
        act.className = "cds-ci__action";
        act.setAttribute("kind", "ghost"); act.setAttribute("appearance", "neutral"); act.setAttribute("size", "small");
        act.setAttribute("icon", this.masked ? "hide-off-line" : "hide-line");
        act.setAttribute("label", this.masked ? "Mostrar código" : "Ocultar código");
        act.setAttribute("pressed", this.masked ? "false" : "true");
        if (this.disabled) act.setAttribute("disabled", "");
        act.addEventListener("click", function(){
          self.toggleAttribute("masked");
          var next = self.querySelector(".cds-ci__action"); if (next) next.focus();
          self.dispatchEvent(new CustomEvent("cds-visibility-change", { detail: { masked: self.masked }, bubbles: true }));
        });
        row.appendChild(act);
      }
      this.appendChild(row);

      if (msg){
        var m = document.createElement("div");
        m.className = "cds-tf__msg cds-ci__msg"; m.id = msgId; m.textContent = msg;
        if (warning) m.setAttribute("role", "alert");
        this.appendChild(m);
      }
    }

    firstEmpty(){ for (var i = 0; i < this.inputs.length; i++) if (!this.inputs[i].value) return i; return this.inputs.length - 1; }
    rove(i){ this.inputs.forEach(function(x, k){ x.tabIndex = k === i ? 0 : -1; }); }
    setCell(i, ch){ this.inputs[i].value = ch; this.boxes[i].classList.toggle("is-filled", !!ch); }
    focusCell(i){
      var el = this.inputs[clamp(i, 0, this.inputs.length - 1)];
      if (el){ el.focus(); el.select(); }
    }
    emit(){
      var v = this.value;
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: v }, bubbles: true }));
      if (v.length === this.length) this.dispatchEvent(new CustomEvent("cds-complete", { detail: { value: v }, bubbles: true }));
    }
    fillFrom(index, text){
      var self = this, chars = text.split("").filter(function(c){ return self.charOk(c); });
      var i = index;
      for (var k = 0; k < chars.length && i < this.inputs.length; k++, i++) this.setCell(i, chars[k]);
      this.focusCell(i);
      this.emit();
    }
    wire(inp, index){
      var self = this;
      inp.addEventListener("input", function(){
        var v = inp.value;
        if (v.length > 1){ self.setCell(index, ""); self.fillFrom(index, v); return; } // autofill / one-time-code
        if (v && !self.charOk(v)){ self.setCell(index, ""); return; }
        self.setCell(index, v);
        if (v && index < self.inputs.length - 1) self.focusCell(index + 1);
        self.emit();
      });
      inp.addEventListener("keydown", function(e){
        if (e.key === "Backspace"){
          if (inp.value){ self.setCell(index, ""); self.emit(); e.preventDefault(); }
          else if (index > 0){ self.setCell(index - 1, ""); self.focusCell(index - 1); self.emit(); e.preventDefault(); }
        } else if (e.key === "Delete"){ self.setCell(index, ""); self.emit(); e.preventDefault(); }
        else if (e.key === "ArrowLeft"){ self.focusCell(index - 1); e.preventDefault(); }
        else if (e.key === "ArrowRight"){ self.focusCell(index + 1); e.preventDefault(); }
        else if (e.key === "Home"){ self.focusCell(0); e.preventDefault(); }
        else if (e.key === "End"){ self.focusCell(self.inputs.length - 1); e.preventDefault(); }
        else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey){
          if (!self.charOk(e.key)){ e.preventDefault(); return; }
          if (inp.value){ self.setCell(index, ""); } // substitui o caractere existente
        }
      });
      inp.addEventListener("focus", function(){ self.rove(index); inp.select(); });
      inp.addEventListener("pointerup", function(){
        var box = self.boxes[index];
        box.classList.add("is-tapped");
        clearTimeout(box._tapT);
        box._tapT = setTimeout(function(){ box.classList.remove("is-tapped"); }, 350);
      });
      inp.addEventListener("paste", function(e){
        e.preventDefault();
        self.fillFrom(index, (e.clipboardData && e.clipboardData.getData("text")) || "");
      });
    }
  }
  CdsCodeInput.define("cds-code-input");
})();
