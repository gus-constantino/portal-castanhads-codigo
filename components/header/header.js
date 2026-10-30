/**
 * @deps icon-button divider
 * <cds-header> — .Header (Modal / Bottom Sheet) · building block · componente 16362:3241
 * Text Container (Title Body/Bold + Description Body/Regular) + Close Button (Icon Button · Ghost · Neutral · Medium · close-line) + Divider (Soft).
 * Hotfix CDS-2104 (branch PLk9bAY0lKJSTbINkFOpZI): Text Description, desligada por padrão; o Close Button alinha ao topo.
 * Atributos: text-title ("Title") · show-text-title · text-description ("Description") · show-text-description (false)
 *   · show-close-button · show-divider · close-label
 * Eventos: cds-close (clique no Close Button)
 */
(function(){
  "use strict";
  var seq = 0;
  class CdsHeader extends CDS.Element {
    static get observedAttributes(){ return ["text-title", "show-text-title", "text-description", "show-text-description", "show-close-button", "show-divider", "close-label"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var c = this.appendChild(CDS.create("div", null, "cds-header__content"));
        var t = c.appendChild(CDS.create("div", null, "cds-header__text"));
        this.titleEl = t.appendChild(CDS.create("h2", null, "cds-header__title"));
        this.descEl = t.appendChild(CDS.create("p", { id: "cds-header-desc-" + (++seq) }, "cds-header__description"));
        this.closeEl = c.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "close-line" }));
        this.closeEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); });
        this.divEl = this.appendChild(CDS.create("cds-divider", { intensity: "soft" }));
      }
      this.titleEl.textContent = this.text("text-title", "Title"); this.titleEl.hidden = !this.flag("show-text-title");
      this.descEl.textContent = this.text("text-description", "Description");
      this.descEl.hidden = !(this.hasAttribute("show-text-description") && this.getAttribute("show-text-description") !== "false");
      this.closeEl.hidden = !this.flag("show-close-button"); this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar");
      this.divEl.hidden = !this.flag("show-divider");
    }
    // id da descrição visível, para o aria-describedby do overlay
    get descriptionId(){ return this.descEl && !this.descEl.hidden ? this.descEl.id : null; }
  }
  CdsHeader.define("cds-header");
})();
