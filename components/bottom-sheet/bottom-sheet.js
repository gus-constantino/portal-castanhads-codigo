/**
 * @deps overlay header footer viewport-restriction
 * <cds-bottom-sheet> — Bottom Sheet · Bottom Sheet · componente 20848:2679 · [MOBILE ONLY]
 * Handle Container (pad 8 0 · handle 40×4 Icons/soft) + .Header + Slot + .Footer Pilled. Raio 16 16 0 0.
 * O handle indica que dá para arrastar para baixo e fechar (arrastar além de 1/3 da altura fecha).
 * Viewport: no Figma, o Viewport Restriction cobre o sheet só quando Common/Is Desktop é verdadeiro (CONFERIR C35).
 *
 * Atributos: open · inline · dismissible · text-title · text-description · show-text-description (.Header, CDS-2104) · show-header · show-footer · show-close-button
 *   primary-label · secondary-label · show-secondary-action-button · viewport · label
 */
(function(){
  "use strict";
  class CdsBottomSheet extends CDS.Overlay {
    static get observedAttributes(){ return CDS.Overlay.observedAttributes.concat(["text-title","text-description","show-text-description","show-header","show-footer","show-close-button","primary-label","secondary-label","show-secondary-action-button","viewport"]); }
    get panelClass(){ return "cds-sheet"; }
    buildPanel(dlg, slot){
      var self = this;
      var hc = dlg.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sheet__handle-box"));
      hc.appendChild(CDS.create("span", null, "cds-sheet__handle"));
      this.headerEl = dlg.appendChild(CDS.create("cds-header", { "show-divider": "false" }));
      dlg.appendChild(slot);
      this.footerEl = dlg.appendChild(CDS.create("cds-footer", { kind: "pilled", "show-divider": "false" }));
      this.restrictEl = dlg.appendChild(CDS.create("cds-viewport-restriction", null, "cds-sheet__restriction"));
      // arrastar para fechar
      var y0 = null, dy = 0;
      hc.addEventListener("pointerdown", function(e){ if (self.hasAttribute("inline")) return; y0 = e.clientY; dy = 0; hc.setPointerCapture(e.pointerId); dlg.classList.add("is-dragging"); });
      hc.addEventListener("pointermove", function(e){ if (y0 == null) return; dy = Math.max(0, e.clientY - y0); dlg.style.transform = "translateY(" + dy + "px)"; });
      function end(){
        if (y0 == null) return; y0 = null; dlg.classList.remove("is-dragging"); dlg.style.transform = "";
        if (dy > dlg.offsetHeight / 3 && self.dismissible) self.close();
      }
      hc.addEventListener("pointerup", end); hc.addEventListener("pointercancel", end);
    }
    get titleText(){ return this.flag("show-header") ? this.text("text-title", "Title") : null; }
    updatePanel(){
      var h = this.headerEl, f = this.footerEl, self = this;
      h.hidden = !this.flag("show-header"); h.setAttribute("text-title", this.text("text-title", "Title"));
      h.setAttribute("show-close-button", String(this.flag("show-close-button")));
      ["text-description","show-text-description"].forEach(function(a){ if (self.hasAttribute(a)) h.setAttribute(a, self.getAttribute(a)); else h.removeAttribute(a); });
      var did = h.hidden ? null : h.descriptionId; if (did) this.dialog.setAttribute("aria-describedby", did); else this.dialog.removeAttribute("aria-describedby");
      f.hidden = !this.flag("show-footer");
      ["primary-label","secondary-label","show-secondary-action-button"].forEach(function(a){ if (self.hasAttribute(a)) f.setAttribute(a, self.getAttribute(a)); else f.removeAttribute(a); });
    }
  }
  CdsBottomSheet.define("cds-bottom-sheet");
})();
