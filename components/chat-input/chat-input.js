/**
 * @deps text-field icon-button
 * <cds-chat-input> — Chat Input · Text Fields · CDS-1594 · branch 4hJ90rFfuEyWx9zHeqJxp4 · set 26567:44273
 *
 * Composer de mensagem (IA e atendimento). Membro da família Text Fields (CDS.TextField), sem label visível:
 *   Text Box   [texto que cresce · warning-line] / [Attach Button · · · Send Button · Voice Button]
 *   Trailing Content  Supporting/Error Message + Character Counter
 * O Text Box vai de Sizes/56 a Sizes/160 (Figma). Passou do máximo, o texto rola e as ações ficam fixas embaixo.
 *
 * Voz é ditado (fala vira texto no campo), não mensagem de áudio. O componente expõe o estado e o evento.
 * Quem implementa liga ao serviço de reconhecimento de voz e escreve o texto com `value`.
 *
 * Atributos: os da família (appearance · disabled · value · placeholder · supporting · error ·
 *   show-trailing-item · show-supporting-content · show-character-counter · maxlength · character-counter · state · is-active)
 *   label             nome acessível do campo (padrão "Mensagem"). Não aparece: o Chat Input não tem label visível
 *   show-attachment   Show Attachment (padrão true) · show-voice  Show Voice (padrão true)
 *   listening         Is Listening (ditado ligado) · listening-content  Listening Content (padrão "Ouvindo…")
 * Teclado: Enter envia · Shift+Enter quebra a linha.
 * Eventos: cds-change {value} · cds-send {value} (cancelável: sem preventDefault o campo esvazia, mantém o foco e encerra o ditado)
 *   · cds-attach · cds-listening-change {listening}
 */
(function(){
  "use strict";
  var el = CDS.TextField.el;

  function iconButton(cls, kind, appearance, icon){
    var b = el("cds-icon-button", cls);
    b.setAttribute("kind", kind); b.setAttribute("appearance", appearance); b.setAttribute("size", "small"); b.setAttribute("icon", icon);
    return b;
  }

  class CdsChatInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["show-attachment", "show-voice", "listening", "listening-content"]); }
    get controlTag(){ return "textarea"; }
    get hasLeadIcon(){ return false; }
    get defaultPlaceholder(){ return "Escreva uma mensagem"; }
    get fallbackName(){ return "Mensagem"; }
    get listening(){ return this.hasAttribute("listening"); }
    set listening(on){ this.setListening(!!on); }
    get canSend(){ return !!this.value.trim(); }

    configureControl(ctrl){ ctrl.rows = 1; ctrl.enterKeyHint = "send"; }

    // Actions: Attach à esquerda, Trailing Items (Send + Voice) à direita
    buildTrailing(box){
      var self = this, act = this.actions = el("div", "cds-chat__actions");
      this.attachBtn = act.appendChild(iconButton("cds-chat__attach", "ghost", "neutral", "attachment"));
      this.attachBtn.setAttribute("label", "Anexar arquivo");
      var trail = act.appendChild(el("div", "cds-chat__trailing"));
      this.sendBtn = trail.appendChild(iconButton("cds-chat__send", "default", "neutral", "send-line"));
      this.sendBtn.setAttribute("label", "Enviar mensagem");
      this.voiceBtn = trail.appendChild(iconButton("cds-chat__voice", "ghost", "neutral", "microphone-line"));
      box.appendChild(act);

      this.attachBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-attach", { bubbles: true })); });
      this.sendBtn.addEventListener("click", function(){ self.send(); });
      this.voiceBtn.addEventListener("click", function(){ self.setListening(!self.listening); });
    }

    build(){
      super.build();
      var self = this, ctrl = this.control;
      this.content.appendChild(this.warnEl); // no Figma o warning-line fica no Text Content, ao lado do texto
      this.liveEl = this.appendChild(CDS.create("span", { "aria-live": "polite" }, "cds-chat__live"));
      ctrl.addEventListener("keydown", function(e){
        if (e.key !== "Enter" || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.isComposing) return;
        e.preventDefault(); self.send();
      });
      // Perder o foco para fora do componente encerra o ditado
      this.addEventListener("focusout", function(e){
        if (self.listening && !(e.relatedTarget && self.contains(e.relatedTarget))) self.setListening(false);
      });
      if (window.ResizeObserver){ this._ro = new ResizeObserver(function(){ self.grow(); }); this._ro.observe(this.box); }
    }

    update(){
      if (this.disabled && this.listening){ this.removeAttribute("listening"); return; }
      super.update();
      var ctrl = this.control;
      this.labelEl.hidden = true; // sem label visível: o nome vem de label (aria-label)
      ctrl.setAttribute("aria-label", this.getAttribute("label") || this.fallbackName);
      if (this.listening) ctrl.placeholder = this.getAttribute("listening-content") || "Ouvindo…";
      this.classList.toggle("is-listening", this.listening);
      this.grow();
    }

    updateTrailing(){
      if (!this.actions) return;
      var on = this.listening;
      this.actions.inert = this.disabled;
      this.attachBtn.hidden = !this.flag("show-attachment");
      this.voiceBtn.hidden = !this.flag("show-voice");
      this.sendBtn.toggleAttribute("disabled", !this.canSend);
      // Voice Button: Ghost Neutral microphone-line · com Is Listening, Ghost Accent stop-filled
      this.voiceBtn.setAttribute("appearance", on ? "accent" : "neutral");
      this.voiceBtn.setAttribute("icon", on ? "stop-filled" : "microphone-line");
      this.voiceBtn.setAttribute("pressed", on ? "true" : "false");
      this.voiceBtn.setAttribute("label", on ? "Parar ditado" : "Ditar mensagem");
    }

    afterInput(){ super.afterInput(); this.grow(); }
    // Valor escrito por código (ex.: o serviço de voz no ditado) também faz o campo crescer
    _setValue(v, emit){ super._setValue(v, emit); this.grow(); }

    setListening(on){
      if (on === this.listening || (on && this.disabled)) return;
      this.toggleAttribute("listening", on);
      if (on) this.control.focus();
      this.liveEl.textContent = on ? "Ouvindo" : "Ditado encerrado";
      this.dispatchEvent(new CustomEvent("cds-listening-change", { detail: { listening: on }, bubbles: true }));
    }

    send(){
      if (this.disabled || !this.canSend) return;
      var ev = new CustomEvent("cds-send", { detail: { value: this.value }, bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      this.setListening(false);
      this._setValue("", true);
      this.grow();
      this.control.focus();
    }

    // O texto cresce até o Text Box chegar ao máximo do Figma (Sizes/160) e depois rola
    grow(){
      var c = this.control, box = this.box;
      if (!c || !box) return;
      var top = c.scrollTop;
      c.style.height = "auto";
      var max = parseFloat(getComputedStyle(box).maxHeight), extra = box.offsetHeight - c.offsetHeight;
      var limit = isFinite(max) ? max - extra : Infinity, h = c.scrollHeight;
      c.style.height = Math.min(h, limit) + "px";
      c.style.overflowY = h > limit ? "auto" : "hidden";
      // Medir com height:auto zera a rolagem: o ponto de digitação no fim continua à vista (WCAG 2.4.11)
      c.scrollTop = document.activeElement === c && c.selectionEnd === c.value.length ? c.scrollHeight : top;
    }
  }
  CdsChatInput.define("cds-chat-input");
})();
