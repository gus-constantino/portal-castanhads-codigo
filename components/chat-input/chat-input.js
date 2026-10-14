/**
 * @deps text-field icon-button chips-group input-chip
 * <cds-chat-input> — Chat Input · Text Fields · CDS-1594 · branch 4hJ90rFfuEyWx9zHeqJxp4 · set 26567:44273
 *
 * Composer de mensagem (IA e atendimento). Membro da família Text Fields (CDS.TextField), sem label visível:
 *   Text Box   [Attachments: chips numa linha que rola de lado] / [texto · warning-line] / [Attach · · · Send · Voice]
 *   Trailing Content  Supporting/Error Message + Character Counter
 * O texto cresce até Sizes/92 (cerca de 3 linhas) e rola sozinho. Com anexos, o campo chega a no máximo 200.
 * As ações ficam fixas embaixo. A altura muda sem animação.
 *
 * Voz é ditado (fala vira texto no campo), não mensagem de áudio. O componente expõe o estado e o evento.
 * Quem implementa liga ao serviço de reconhecimento de voz e escreve o texto com `value`.
 * Anexos: o Attach Button abre o seletor de arquivos (cancelável em cds-attach). Os arquivos vão junto com a mensagem
 * (cds-send traz a lista), sem progresso no composer. Arquivo fora do `accept` não vira chip: o campo vai para Warning.
 *
 * Atributos: os da família (appearance · disabled · value · placeholder · supporting · error ·
 *   show-trailing-item · show-supporting-content · show-character-counter · maxlength · character-counter · state · is-active)
 *   label             nome acessível do campo (padrão "Mensagem"). Não aparece: o Chat Input não tem label visível
 *   show-attachment   Show Attachment (padrão true) · show-voice  Show Voice (padrão true)
 *   listening         Is Listening (ditado ligado) · listening-content  Listening Content (padrão "Ouvindo…")
 *   accept            tipos aceitos no anexo, como no <input type=file> (ex.: "image/*,.pdf")
 *   attachment-error  Error Message do arquivo recusado (padrão "Envie imagem ou PDF.")
 *   attachments       nomes de exemplo separados por vírgula (specimens e docs). Por código, use addAttachments()
 * Teclado: Enter envia · Shift+Enter quebra a linha.
 * Eventos: cds-change {value} · cds-send {value, attachments} (cancelável: sem preventDefault o campo esvazia, sem anexos,
 *   volta a Neutral, mantém o foco e encerra o ditado) · cds-attach (cancelável: sem preventDefault abre o seletor)
 *   · cds-attachments-change {attachments} · cds-listening-change {listening}
 */
(function(){
  "use strict";
  var el = CDS.TextField.el;
  var reduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function iconButton(cls, kind, appearance, icon){
    var b = el("cds-icon-button", cls);
    b.setAttribute("kind", kind); b.setAttribute("appearance", appearance); b.setAttribute("size", "small"); b.setAttribute("icon", icon);
    return b;
  }
  function ext(name){ var m = /\.([^.]+)$/.exec(name || ""); return m ? m[1].toLowerCase() : ""; }
  // Ícone por tipo (Figma): image-file imagem · file-line documento, PDF e texto · file-blank-line os outros
  function iconFor(att){
    var t = att.type || "", e = ext(att.name);
    if (/^image\//.test(t) || /^(jpe?g|png|gif|webp|heic|svg|bmp)$/.test(e)) return "image-file";
    if (/pdf|text|word|document/.test(t) || /^(pdf|txt|docx?|odt|rtf|md|csv)$/.test(e)) return "file-line";
    return "file-blank-line";
  }
  // Nome longo encurtado no meio, mantendo a extensão (ex.: comprovante-de-ende….pdf)
  function shorten(name, max){
    max = max || 24;
    if (name.length <= max) return name;
    var e = ext(name), tail = e ? "." + e : "", keep = Math.max(4, max - tail.length - 1);
    return name.slice(0, keep) + "…" + tail;
  }
  // Mesmo critério do atributo accept do <input type=file>
  function accepted(att, accept){
    if (!accept) return true;
    var t = (att.type || "").toLowerCase(), e = "." + ext(att.name);
    return accept.split(",").some(function(a){
      a = a.trim().toLowerCase(); if (!a) return false;
      if (a.charAt(0) === ".") return e === a;
      if (/\/\*$/.test(a)) return t.indexOf(a.slice(0, -1)) === 0;
      return t === a;
    });
  }

  class CdsChatInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["show-attachment", "show-voice", "listening", "listening-content", "accept", "attachment-error", "attachments"]); }
    constructor(){ super(); this._att = []; this._warned = null; }
    get controlTag(){ return "textarea"; }
    get hasLeadIcon(){ return false; }
    get defaultPlaceholder(){ return "Escreva uma mensagem"; }
    get fallbackName(){ return "Mensagem"; }
    get listening(){ return this.hasAttribute("listening"); }
    set listening(on){ this.setListening(!!on); }
    get attachments(){ return this._att.slice(); }
    set attachments(list){ this._att = []; this.addAttachments(list || [], true); }
    get canSend(){ return !!this.value.trim() || this._att.length > 0; }

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

      this.attachBtn.addEventListener("click", function(){
        if (self.dispatchEvent(new CustomEvent("cds-attach", { bubbles: true, cancelable: true }))) self.fileEl.click();
      });
      this.sendBtn.addEventListener("click", function(){ self.send(); });
      this.voiceBtn.addEventListener("click", function(){ self.setListening(!self.listening); });
    }

    build(){
      super.build();
      var self = this, ctrl = this.control;
      this.content.appendChild(this.warnEl); // no Figma o warning-line fica no Text Content, ao lado do texto
      // Attachments: Chips Group Single Rows no topo do Text Box (Show Attachments)
      this.attEl = CDS.create("cds-chips-group", { kind: "input", "role-kind": "single", label: "Arquivos anexados" }, "cds-chat__att");
      this.box.insertBefore(this.attEl, this.content);
      this.attEl.addEventListener("cds-remove", function(e){
        e.preventDefault();
        var chip = e.target.closest("cds-input-chip"), chips = [].slice.call(self.attEl.children), i = chips.indexOf(chip);
        if (i >= 0) self.removeAttachment(i);
      });
      this.fileEl = CDS.create("input", { type: "file", multiple: true, hidden: true, tabindex: "-1", "aria-hidden": "true" }, "cds-chat__file");
      this.fileEl.addEventListener("change", function(){ self.addAttachments(self.fileEl.files); self.fileEl.value = ""; });
      this.appendChild(this.fileEl);
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

    attributeChangedCallback(name, oldV, newV){
      if (name === "attachments" && newV !== this._attAttr){
        this._attAttr = newV;
        this._att = (newV || "").split(",").map(function(s){ return s.trim(); }).filter(Boolean).map(function(n){ return { name: n, type: "" }; });
      }
      super.attributeChangedCallback(name, oldV, newV);
    }

    update(){
      if (this.disabled && this.listening){ this.removeAttribute("listening"); return; }
      super.update();
      var ctrl = this.control;
      this.labelEl.hidden = true; // sem label visível: o nome vem de label (aria-label)
      ctrl.setAttribute("aria-label", this.getAttribute("label") || this.fallbackName);
      if (this.listening) ctrl.placeholder = this.getAttribute("listening-content") || "Ouvindo…";
      this.fileEl.accept = this.getAttribute("accept") || "";
      this.classList.toggle("is-listening", this.listening);
      this.renderAttachments();
      this.grow();
    }

    renderAttachments(){
      if (!this.attEl) return;
      var self = this, g = this.attEl;
      g.innerHTML = "";
      this._att.forEach(function(a){
        var c = CDS.create("cds-input-chip", { size: "small", label: shorten(a.name), icon: iconFor(a) });
        if (self.disabled) c.setAttribute("disabled", "");
        g.appendChild(c);
        if (c.button) c.button.setAttribute("aria-label", "Remover " + a.name);
      });
      g.hidden = !this._att.length;
      this.classList.toggle("has-attachments", this._att.length > 0);
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

    // Recebe File, FileList ou { name, type }. Arquivo fora do accept não vira chip e leva o campo a Warning
    addAttachments(list, silent){
      if (this.disabled) return;
      var self = this, accept = this.getAttribute("accept"), ok = [], refused = [];
      [].slice.call(list || []).forEach(function(f){
        var a = { name: f.name || String(f), type: f.type || "", file: f instanceof Blob ? f : null };
        (accepted(a, accept) ? ok : refused).push(a);
      });
      this._att = this._att.concat(ok);
      if (refused.length) this.warn(refused);
      else if (ok.length) this.clearWarning();
      this.renderAttachments(); this.updateTrailing(); this.grow();
      if (!silent){
        if (ok.length){
          this.liveEl.textContent = ok.length === 1 ? "Arquivo adicionado: " + ok[0].name : ok.length + " arquivos adicionados";
          // Ao anexar, a linha rola até o chip novo (sem suavização com reduced motion)
          this.attEl.scrollTo({ left: this.attEl.scrollWidth, behavior: reduced.matches ? "auto" : "smooth" });
        }
        this.emitAttachments();
      }
    }

    removeAttachment(i){
      var a = this._att[i]; if (!a) return;
      this._att.splice(i, 1);
      this.renderAttachments(); this.updateTrailing(); this.grow();
      this.liveEl.textContent = "Arquivo removido: " + a.name;
      // O foco vai para o chip seguinte, ou para o campo quando não houver outro
      var next = this.attEl.children[Math.min(i, this._att.length - 1)];
      if (next && next.button) next.button.focus(); else this.control.focus();
      this.emitAttachments();
    }

    emitAttachments(){ this.dispatchEvent(new CustomEvent("cds-attachments-change", { detail: { attachments: this.attachments }, bubbles: true })); }

    // Arquivo recusado: Appearance=Warning com a Error Message do anexo. Guarda o estado anterior para desfazer
    warn(refused){
      if (!this._warned) this._warned = { appearance: this.getAttribute("appearance"), error: this.getAttribute("error") };
      this.setAttribute("error", this.getAttribute("attachment-error") || "Envie imagem ou PDF.");
      this.setAttribute("appearance", "warning");
      this.liveEl.textContent = "Arquivo recusado: " + refused.map(function(a){ return a.name; }).join(", ");
    }
    clearWarning(){
      var w = this._warned; if (!w) return;
      this._warned = null;
      if (w.error == null) this.removeAttribute("error"); else this.setAttribute("error", w.error);
      if (w.appearance == null) this.removeAttribute("appearance"); else this.setAttribute("appearance", w.appearance);
    }

    setListening(on){
      if (on === this.listening || (on && this.disabled)) return;
      this.toggleAttribute("listening", on);
      if (on) this.control.focus();
      this.liveEl.textContent = on ? "Ouvindo" : "Ditado encerrado";
      this.dispatchEvent(new CustomEvent("cds-listening-change", { detail: { listening: on }, bubbles: true }));
    }

    // Enviar limpa texto, anexos e o Warning: o campo volta a Neutral, vazio e focado
    send(){
      if (this.disabled || !this.canSend) return;
      var ev = new CustomEvent("cds-send", { detail: { value: this.value, attachments: this.attachments }, bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      this.setListening(false);
      this._att = []; this._warned = null; this.removeAttribute("appearance");
      this._setValue("", true);
      this.renderAttachments(); this.updateTrailing();
      this.grow();
      this.control.focus();
    }

    // O texto cresce até o máximo do Text Content (Sizes/92) e depois rola sozinho
    grow(){
      var c = this.control, box = this.box;
      if (!c || !box) return;
      var top = c.scrollTop, cs = getComputedStyle(this.content);
      c.style.height = "auto";
      var max = parseFloat(cs.maxHeight), pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      var limit = isFinite(max) ? max - pad : Infinity, h = c.scrollHeight;
      c.style.height = Math.min(h, limit) + "px";
      c.style.overflowY = h > limit ? "auto" : "hidden";
      // Medir com height:auto zera a rolagem: o ponto de digitação no fim continua à vista (WCAG 2.4.11)
      c.scrollTop = document.activeElement === c && c.selectionEnd === c.value.length ? c.scrollHeight : top;
    }
  }
  CdsChatInput.define("cds-chat-input");
})();
