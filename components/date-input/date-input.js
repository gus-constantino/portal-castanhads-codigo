/**
 * @deps text-field date-picker popover
 * <cds-date-input> — Date Input · Datepicker · set 17962:70687 (64 variantes: Kind × Appearance × State × Is Filled × Is Active)
 * Text Input com .Text Content Mask=Date (placeholder "dd/mm/aaaa"), sem Lead Icon, e o Calendar Button
 * (Icon Button Ghost Neutral Small · calendar-line). Is Active=True abre o Popover com o Date Picker
 * (Kind=Single 336 × 412 · Double 636 × 412).
 * Character Counter: ligado por padrão com o texto "-0000", como no Figma (C57).
 * Mobile (D358): o Calendar Button abre o seletor de data nativo do sistema, e não o Popover.
 *   Mobile = atributo viewport, senão o [data-viewport] mais próximo, senão a largura da janela < 744 (faixa do castanha-tokens).
 *
 * Atributos: os da família (sem lead-icon) · kind (single|double — calendário do Popover) · min · max · today
 *   value (dd/mm/aaaa ou só os dígitos) · calendar-label ("Abrir calendário")
 *   viewport (desktop|tablet|mobile — opcional; força o modo)
 * Propriedade: .date (AAAA-MM-DD ou "") · Eventos: cds-change { value, formatted, date } · cds-toggle { open }
 */
(function(){
  "use strict";
  var D = CDS.dates;
  var DATE = CDS.TextField.patternMask("00/00/0000", { placeholder: "dd/mm/aaaa" });
  class CdsDateInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["kind","min","max","today","calendar-label","viewport"]); }
    get mask(){ return DATE; }
    get hasLeadIcon(){ return false; }
    get fallbackName(){ return "Data"; }
    get date(){ var d = D.fromBr(this.displayValue); return d ? D.iso(d) : ""; }
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    get isMobile(){
      var v = this.getAttribute("viewport"), host = this.closest("[data-viewport]");
      if (v) return v === "mobile";
      if (host) return host.dataset.viewport === "mobile";
      return window.matchMedia("(max-width: 743px)").matches;
    }
    configureControl(ctrl){
      var self = this;
      ctrl.setAttribute("autocomplete", "off");
      ctrl.addEventListener("keydown", function(e){
        if (e.key === "Escape" && self.isOpen){ e.preventDefault(); self.closeCalendar(); }
        if (e.key === "ArrowDown" && e.altKey){ e.preventDefault(); self.openCalendar(true); }
      });
    }
    buildTrailing(box){
      var self = this;
      this.classList.add("cds-tf--date");
      var b = this.calBtn = box.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "calendar-line" }, "cds-tf__action"));
      b.addEventListener("click", function(){ if (self.disabled) return; if (self.isOpen) self.closeCalendar(); else self.openCalendar(true); });
      // Mobile: seletor nativo do sistema (input type=date fora da vista, ancorado no Calendar Button)
      var nat = this.native = box.appendChild(CDS.create("input", { type: "date", tabindex: "-1", "aria-hidden": "true" }, "cds-di__native"));
      nat.addEventListener("change", function(){
        if (!nat.value) return;
        self._setValue(D.br(D.parse(nat.value)), false);
        self.afterInput(); self.control.focus();
      });
      var pop = this.pop = CDS.create("cds-popover", { popover: "manual", label: "Calendário" }, "cds-di__popover");
      this.picker = pop.appendChild(CDS.create("cds-date-picker", { mode: "single" }));
      pop.addEventListener("cds-toggle", function(e){ if (e.target === pop) e.stopPropagation(); });
      this.appendChild(pop);
      this.picker.addEventListener("cds-change", function(e){
        e.stopPropagation();
        self._setValue(D.br(D.parse(e.detail.value)), false);
        self.afterInput();
        self.closeCalendar(); self.control.focus();
      });
      pop.addEventListener("keydown", function(e){ if (e.key === "Escape"){ e.preventDefault(); self.closeCalendar(); self.control.focus(); } });
      this.addEventListener("focusout", function(e){ if (self.isOpen && (!e.relatedTarget || !self.contains(e.relatedTarget))) self.closeCalendar(); });
      this._outside = function(e){ if (self.isOpen && !self.contains(e.target)) self.closeCalendar(); };
      this._reposition = function(){ if (self.isOpen) self.place(); };
    }
    connectedCallback(){ super.connectedCallback(); document.addEventListener("pointerdown", this._outside, true); window.addEventListener("resize", this._reposition); window.addEventListener("scroll", this._reposition, true); }
    disconnectedCallback(){ document.removeEventListener("pointerdown", this._outside, true); window.removeEventListener("resize", this._reposition); window.removeEventListener("scroll", this._reposition, true); }
    syncPicker(){
      var p = this.picker, dt = this.date, self = this;
      ["kind","min","max","today"].forEach(function(a){ CDS.attr(p, a, self.getAttribute(a)); });
      CDS.attr(p, "value", dt || null);
      if (dt) CDS.attr(p, "month", dt.slice(0, 7)); else p.removeAttribute("month");
    }
    openNative(){
      var n = this.native;
      n.value = this.date; CDS.attr(n, "min", this.getAttribute("min")); CDS.attr(n, "max", this.getAttribute("max"));
      try { n.showPicker(); } catch (e){ n.focus(); n.click(); }
    }
    openCalendar(focus){
      if (this.isOpen || this.disabled) return;
      if (this.isMobile) return this.openNative();
      this.syncPicker(); CDS.attr(this.picker, "view", null);
      this.pop.style.maxWidth = "none";
      this.pop.showPopover(); this.place();
      this.classList.add("is-open"); this.updateTrailing();
      if (focus) this.picker.focusDay();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: true }, bubbles: true }));
    }
    closeCalendar(){
      if (!this.isOpen) return;
      this.pop.hidePopover(); this.classList.remove("is-open"); this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: false }, bubbles: true }));
    }
    place(){ CDS.position(this.box, this.pop, { placement: "bottom-start", gap: 8 }); }
    afterInput(){
      this.updateCounter(); this.updateTrailing();
      this.classList.toggle("is-filled", !!this.value);
      if (this.isOpen) this.syncPicker();
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, formatted: this.control.value, date: this.date }, bubbles: true }));
    }
    updateTrailing(){
      if (!this.calBtn) return;
      this.calBtn.hidden = !this.flag("show-trailing-item");
      CDS.attr(this.calBtn, "label", (this.getAttribute("calendar-label") || "Abrir calendário"));
      CDS.attr(this.calBtn, "disabled", this.disabled ? "" : null);
      var ib = this.calBtn.querySelector("button"); if (ib){ ib.setAttribute("aria-expanded", String(this.isOpen)); ib.setAttribute("aria-haspopup", this.isMobile ? "false" : "dialog"); }
    }
    // Character Counter Value: "-0000" por padrão (Figma)
    updateCounter(){
      var t = this.hasAttribute("character-counter") ? this.getAttribute("character-counter") : "-0000";
      this.counterEl.textContent = t;
      this.counterEl.hidden = !(this.flag("show-character-counter") && t);
      if (this.foot) this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
    }
  }
  CdsDateInput.define("cds-date-input");
})();
