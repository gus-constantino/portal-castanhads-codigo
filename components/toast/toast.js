/**
 * @deps icon close-toast
 * <cds-toast> — Toast · Feedback · set 5234:516
 * Mensagem curta sobre Surface/inversed. Desktop: ícone · texto · .Close Toast em linha. Mobile (Viewport):
 * ícone e fechar no topo, texto embaixo.
 *
 * Atributos: appearance (positive|warning) · text (Text Description, até 2 linhas) · show-trailing-item (.Close Toast)
 *   close-label · viewport (desktop|tablet|mobile — força o modo)
 * Eventos: cds-close (cancelável). Sem preventDefault(), o toast sai animado e se remove do DOM.
 * Motion (zeroheight): Entrada expressive/decelerate · long/02 (sem Motion Style — tokens de easing e duração); Saída Selected Out/01.
 *   O Figma não diz o que se move: aqui opacidade + 8px na vertical (Common/Sizes/8). Reduced motion: sem animação.
 * A11y: role="status" (Positive) ou role="alert" (Warning).
 */
(function(){
  "use strict";
  var ICON = { positive: "positive-line", warning: "warning-line" };
  class CdsToast extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "text", "show-trailing-item", "close-label"]; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "positive"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.iconWrap = this.appendChild(CDS.create("span", null, "cds-toast__icon"));
        this.iconEl = this.iconWrap.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-icon"));
        this.textEl = this.appendChild(CDS.create("p", null, "cds-toast__text"));
        this.closeEl = this.appendChild(CDS.create("cds-close-toast"));
        this.closeEl.addEventListener("click", function(){ self.close(); });
      }
      this.setAttribute("role", this.appearance === "warning" ? "alert" : "status");
      this.iconEl.className = "cds-icon cds-icon--" + ICON[this.appearance];
      this.textEl.textContent = this.text("text", "A descrição web ou mobile deve ter no máximo 2 linhas");
      this.closeEl.hidden = !this.flag("show-trailing-item");
      this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar mensagem");
    }
    // Saída animada (Selected Out/01, como no zeroheight): marca [closing], espera a transição e remove (D145)
    close(){
      if (this._closing) return;
      var ev = new CustomEvent("cds-close", { bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      var self = this, ms = this.isConnected ? parseFloat(getComputedStyle(this).getPropertyValue("--motion-selected-out-01-timing")) || 0 : 0;
      if (!ms || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)){ this.remove(); return; }
      this._closing = true; this.setAttribute("closing", "");
      var done = function(){ if (self._closing){ self._closing = false; self.remove(); } };
      this.addEventListener("transitionend", function h(e){ if (e.target === self && e.propertyName === "opacity"){ self.removeEventListener("transitionend", h); done(); } });
      setTimeout(done, ms + 50); // garantia se a transição não disparar
    }
  }
  CdsToast.define("cds-toast");
})();
