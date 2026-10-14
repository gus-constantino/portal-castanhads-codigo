/**
 * @deps icon-button icon
 * CDS.TextField — base da família Text Fields (Text Input · Search · Text Area · Password · Quantity · Credit Card).
 * Não é um elemento registrado: cada membro estende a classe e define só o que muda.
 *
 * Anatomia (igual em todos os sets do Figma):
 *   Label Content   label.cds-tf__label   Text Label + Required Text
 *   Text Box        div.cds-tf__box       [Lead Icon] controle [Trailing: warning-line · ação]
 *   Trailing Content div.cds-tf__foot     Supporting/Error Message + Character Counter
 *
 * Render incremental: build() cria o DOM uma vez; update() só ajusta texto, atributos e visibilidade.
 * O controle nativo (<input>/<textarea>) nunca é recriado, então foco, seleção e valor sobrevivem.
 *
 * Atributos comuns (padrões do Figma):
 *   appearance (neutral|warning) · disabled · value · placeholder
 *   label (Text Label) · required-text ("(Obrigatório)") · supporting · error
 *   show-label · show-required · show-lead-icon · show-trailing-item · show-supporting-content · show-character-counter
 *   lead-icon (Lead Icon, swap) · maxlength · character-counter (texto fixo do contador)
 *   state="hovered|pressed" · is-active — estados forçados para specimens (só CSS)
 * Eventos: cds-change { value }
 *
 * Máscaras (.Text Content Mask): CDS.TextField.masks — usadas pelo Text Input (mask="cpf"…) e pelo Credit Card.
 */
(function(){
  "use strict";
  var uid = 0;

  function el(tag, cls){ var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  // ---------- Máscaras ----------
  // Padrão: 0 = dígito, A = letra ou dígito (maiúscula), outros caracteres = literais
  function patternMask(pattern, opts){
    opts = opts || {};
    var slots = pattern.replace(/[^0A]/g, "").length;
    function accept(ch, kind){ return kind === "0" ? /\d/.test(ch) : /[0-9A-Za-z]/.test(ch); }
    return {
      placeholder: opts.placeholder || pattern,
      inputMode: /A/.test(pattern) ? "text" : "numeric",
      raw: function(s){
        var out = "", kinds = pattern.replace(/[^0A]/g, "");
        String(s || "").split("").forEach(function(ch){ if (out.length < slots && accept(ch, kinds[out.length])) out += ch.toUpperCase(); });
        return out;
      },
      format: function(raw){
        var out = "", i = 0;
        for (var p = 0; p < pattern.length && i < raw.length; p++){
          var c = pattern[p];
          if (c === "0" || c === "A") out += raw[i++];
          else out += c;
        }
        return out;
      },
      complete: function(raw){ return raw.length === slots; },
      max: slots
    };
  }
  // Moeda (R$): digita da direita para a esquerda, centavos fixos
  var currency = {
    placeholder: "R$ 00,00", inputMode: "numeric",
    raw: function(s){ return String(s || "").replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 13); },
    format: function(raw){
      if (!raw) return "";
      var n = raw.padStart(3, "0"), cents = n.slice(-2), int = n.slice(0, -2).replace(/^0+(?=\d)/, "");
      return "R$ " + int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + cents;
    },
    complete: function(){ return false; }, caretEnd: true
  };
  var MASKS = {
    cpf: patternMask("000.000.000-00"),
    cnpj: patternMask("00.000.000/0000-00", { placeholder: "43.210.987/0001-23" }),
    "cnpj-new": patternMask("AAAAAAAAAAAAAA", { placeholder: "12ABC6780001X5" }), // como no Figma: sem pontuação
    telefone: patternMask("(00) 0000-0000"),
    celular: patternMask("(00) 00000-0000"),
    cep: patternMask("00000-000"), // o Figma mostra 0000-000 (Q32); CEP tem 8 dígitos
    date: patternMask("00/00/0000"),
    currency: currency
  };

  class TextField extends CDS.Element {
    static get observedAttributes(){
      return ["appearance","disabled","value","placeholder","label","required-text","supporting","error",
        "show-label","show-required","show-lead-icon","show-trailing-item","show-supporting-content","show-character-counter",
        "lead-icon","maxlength","character-counter"];
    }
    constructor(){ super(); this._id = "cds-tf-" + (++uid); this._value = null; }

    // ----- ganchos para os membros da família -----
    get controlTag(){ return "input"; }
    get defaultLeadIcon(){ return "placeholder-line"; }
    get defaultPlaceholder(){ return "Placeholder"; }
    get hasLeadIcon(){ return true; }
    get mask(){ return null; }                 // objeto de máscara (ver MASKS) ou null
    configureControl(ctrl){}                    // tipo, inputmode, autocomplete…
    buildTrailing(box){}                        // ações à direita (Icon Button…)
    updateTrailing(){}

    // ----- estado -----
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "neutral"; }
    get disabled(){ return this.hasAttribute("disabled"); }
    get value(){ return this._value == null ? "" : this._value; }
    set value(v){ this._setValue(v == null ? "" : String(v), false); }
    get input(){ return this.control; } // compatibilidade (playground/inspetor)
    get displayValue(){ var m = this.mask; return m ? m.format(this.value) : this.value; }

    attributeChangedCallback(name){
      if (name === "value") this._value = null; // o atributo volta a ser a fonte
      if (this.isConnected) this.render();
    }
    render(){
      if (!this._built){ this.build(); this._built = true; }
      if (this._value == null){ var m = this.mask, a = this.getAttribute("value") || ""; this._value = m ? m.raw(a) : a; }
      this.update();
    }

    build(){
      var self = this, id = this._id;
      this.classList.add("cds-tf");
      this.innerHTML = "";

      var lab = this.labelEl = el("label", "cds-tf__label"); lab.htmlFor = id + "-ctrl";
      this.labelText = lab.appendChild(el("span"));
      this.reqSpace = lab.appendChild(document.createTextNode(" ")); // espaço só para o nome acessível (flex ignora no layout)
      this.reqEl = lab.appendChild(el("span", "cds-tf__req"));
      this.appendChild(lab);

      var box = this.box = el("div", "cds-tf__box");
      var content = this.content = el("div", "cds-tf__content");
      if (this.hasLeadIcon){ this.leadEl = el("span", "cds-icon cds-tf__lead"); this.leadEl.setAttribute("aria-hidden", "true"); content.appendChild(this.leadEl); }
      var ctrl = this.control = el(this.controlTag, "cds-tf__control");
      ctrl.id = id + "-ctrl"; ctrl.spellcheck = false;
      if (this.controlTag === "input") ctrl.type = "text";
      this.configureControl(ctrl);
      content.appendChild(ctrl);
      box.appendChild(content);
      this.warnEl = el("span", "cds-icon cds-icon--warning-line cds-tf__warn"); this.warnEl.setAttribute("aria-hidden", "true");
      box.appendChild(this.warnEl);
      this.buildTrailing(box);
      this.appendChild(box);

      var foot = this.foot = el("div", "cds-tf__foot");
      this.msgEl = foot.appendChild(el("div", "cds-tf__msg")); this.msgEl.id = id + "-msg";
      this.counterEl = foot.appendChild(el("span", "cds-tf__counter"));
      this.appendChild(foot);

      // Clicar em qualquer ponto do Text Box foca o campo (exceto nas ações)
      box.addEventListener("mousedown", function(e){
        if (e.target === ctrl || e.target.closest("cds-icon-button, cds-input-chip")) return;
        e.preventDefault(); ctrl.focus();
      });
      // Logo após o tap o cursor ainda está sobre o campo: segura Is Active pela duração do Selected In
      box.addEventListener("pointerup", function(e){
        if (e.target.closest("cds-icon-button, cds-input-chip")) return;
        box.classList.add("is-tapped"); clearTimeout(box._tapT);
        box._tapT = setTimeout(function(){ box.classList.remove("is-tapped"); }, 350);
      });
      ctrl.addEventListener("input", function(){ self.onInput(); });
      // Backspace/Delete sobre pontuação da máscara apaga o dado vizinho (não só move o caret)
      ctrl.addEventListener("keydown", function(e){
        var m = self.mask; if (!m || m.caretEnd) return;
        var st = ctrl.selectionStart, en = ctrl.selectionEnd, v = ctrl.value, raw = self.value;
        if (st !== en) return;
        var isLit = function(ch){ return ch != null && !/[0-9A-Za-z]/.test(ch); };
        var at = -1;
        if (e.key === "Backspace" && st > 0 && isLit(v[st - 1])){ var nb = m.raw(v.slice(0, st)).length; if (nb > 0){ raw = raw.slice(0, nb - 1) + raw.slice(nb); at = nb - 1; } }
        else if (e.key === "Delete" && isLit(v[st])){ var nd = m.raw(v.slice(0, st)).length; raw = raw.slice(0, nd) + raw.slice(nd + 1); at = nd; }
        if (at < 0) return;
        e.preventDefault();
        self._value = raw; ctrl.value = m.format(raw);
        var pos = caretAfter(ctrl.value, at); ctrl.setSelectionRange(pos, pos);
        self.afterInput();
      });
    }

    onInput(){
      var ctrl = this.control, m = this.mask;
      if (!m){ this._value = ctrl.value; this.afterInput(); return; }
      // Reformata e devolve o caret para depois do mesmo número de caracteres "de dado"
      var before = m.raw(ctrl.value.slice(0, ctrl.selectionStart)).length;
      this._value = m.raw(ctrl.value);
      ctrl.value = m.format(this._value);
      if (document.activeElement === ctrl){
        var at = m.caretEnd ? ctrl.value.length : caretAfter(ctrl.value, before);
        ctrl.setSelectionRange(at, at);
      }
      this.afterInput();
    }
    afterInput(){
      this.updateCounter(); this.updateTrailing();
      this.classList.toggle("is-filled", !!this.value);
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, formatted: this.control.value }, bubbles: true }));
    }
    _setValue(v, emit){
      var m = this.mask; this._value = m ? m.raw(v) : v;
      if (this.control) this.control.value = this.displayValue;
      if (this._built){ this.updateCounter(); this.updateTrailing(); this.classList.toggle("is-filled", !!this.value); }
      if (emit) this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value }, bubbles: true }));
    }

    update(){
      var warning = this.appearance === "warning", label = this.getAttribute("label");
      var showLabel = !!label && this.flag("show-label");
      this.labelEl.hidden = !showLabel;
      this.labelText.textContent = label || "";
      var req = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
      this.reqEl.hidden = !(this.flag("show-required") && req); this.reqEl.textContent = req;

      if (this.leadEl){
        var icon = this.getAttribute("lead-icon") || this.defaultLeadIcon;
        this.leadEl.className = "cds-icon cds-icon--" + icon + " cds-tf__lead";
        this.leadEl.hidden = !this.flag("show-lead-icon");
      }
      var ctrl = this.control, m = this.mask;
      if (document.activeElement !== ctrl || ctrl.value !== this.displayValue) ctrl.value = this.displayValue;
      ctrl.placeholder = this.hasAttribute("placeholder") ? this.getAttribute("placeholder") : (m ? m.placeholder : this.defaultPlaceholder);
      if (m){ ctrl.inputMode = m.inputMode; if (m.max) ctrl.maxLength = m.format("9".repeat(m.max)).length; else ctrl.removeAttribute("maxlength"); }
      else if (this.hasAttribute("maxlength")) ctrl.maxLength = parseInt(this.getAttribute("maxlength"), 10) || 524288;
      else ctrl.removeAttribute("maxlength");
      ctrl.disabled = this.disabled;
      if (this.disabled) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      if (!showLabel) ctrl.setAttribute("aria-label", label || this.fallbackName || "Campo de texto"); else ctrl.removeAttribute("aria-label");
      if (warning) ctrl.setAttribute("aria-invalid", "true"); else ctrl.removeAttribute("aria-invalid");

      // Trailing Icon (warning-line): só no Warning, controlado por Show Trailing Item
      this.warnEl.hidden = !(warning && this.flag("show-trailing-item"));

      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      this.msgEl.textContent = msg || "";
      this.msgEl.hidden = !msg;
      if (warning && msg) this.msgEl.setAttribute("role", "alert"); else this.msgEl.removeAttribute("role");
      if (msg) ctrl.setAttribute("aria-describedby", this.msgEl.id); else ctrl.removeAttribute("aria-describedby");
      this.updateCounter();
      this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
      this.classList.toggle("is-filled", !!this.value);
      this.updateTrailing();
    }

    // Character Counter: texto fixo (character-counter) ou "n/max" quando há maxlength
    updateCounter(){
      var fixed = this.getAttribute("character-counter"), max = parseInt(this.getAttribute("maxlength"), 10);
      var text = fixed != null ? fixed : (max ? this.value.length + "/" + max : "");
      this.counterEl.textContent = text;
      this.counterEl.hidden = !(this.flag("show-character-counter") && text);
      if (this.foot) this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
    }
  }

  /** posição no texto formatado logo após o n-ésimo caractere de dado (letra ou dígito) */
  function caretAfter(formatted, n){
    if (n <= 0){ var first = formatted.search(/[0-9A-Za-z]/); return first < 0 ? formatted.length : first; }
    for (var i = 0, seen = 0; i < formatted.length; i++){ if (/[0-9A-Za-z]/.test(formatted[i]) && ++seen === n) return i + 1; }
    return formatted.length;
  }

  TextField.masks = MASKS;
  TextField.patternMask = patternMask;
  TextField.el = el;
  CDS.TextField = TextField;
})();
