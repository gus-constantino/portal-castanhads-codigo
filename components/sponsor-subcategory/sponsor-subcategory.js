/**
 * @deps icon badge
 * <cds-sponsor-subcategory> — .Subcategory · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: item de segundo nível, no Slot de um .Category com Intent=Accordion. Trailing Icon padrão é a seta
 * de navegação. Em recurso pago, troque a seta pela coroa no Trailing Icon, nunca as duas juntas.
 *
 * Anatomia (188×32): fundo Surface/01, raio Border/Radius/small, pad 0 8, gap 8 · Lead Icon · Label (Text/medium) · Badge · Trailing Icon
 *   States: Hovered Neutral/Opacity/Intense/semi-transparent e Label Text/intense · Pressed Surface/default · Disabled opacidade 0.4
 *
 * Atributos: label ("Label") · lead-icon (placeholder-line) · show-lead-icon · trailing-icon (navigation-right-line) · show-trailing-icon
 *   show-badge (padrão desligado) · badge-label ("Novo") · href · selected (página atual) · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsSponsorSubcategory extends CDS.Element {
    static get observedAttributes(){ return ["label","lead-icon","show-lead-icon","trailing-icon","show-trailing-icon","show-badge","badge-label","href","selected","disabled","state"]; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        this.innerHTML = "";
        this.rowEl = this.appendChild(c("a", null, "cds-sps__row"));
        this.leadEl = this.rowEl.appendChild(c("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-sps__lead"));
        this.labelEl = this.rowEl.appendChild(c("span", null, "cds-sps__label"));
        this.badgeEl = this.rowEl.appendChild(c("cds-badge", { appearance: "warning" }, "cds-sps__badge"));
        this.trailEl = this.rowEl.appendChild(c("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-sps__trail"));
        this.rowEl.addEventListener("click", function(e){ if (self.hasAttribute("disabled")) e.preventDefault(); });
      }
      var on = function(n, d){ var v = self.getAttribute(n); return v == null ? d : v !== "false"; }, dis = this.hasAttribute("disabled"), href = this.getAttribute("href");
      this.labelEl.textContent = this.getAttribute("label") || "Label";
      CDS.attr(this.leadEl, "icon", this.getAttribute("lead-icon") || "placeholder-line");
      this.leadEl.hidden = !on("show-lead-icon", true);
      CDS.attr(this.trailEl, "icon", this.getAttribute("trailing-icon") || "navigation-right-line");
      this.trailEl.hidden = !on("show-trailing-icon", true);
      this.badgeEl.hidden = !on("show-badge", false);
      CDS.attr(this.badgeEl, "label", this.getAttribute("badge-label") || "Novo");
      CDS.attr(this.rowEl, "href", href && !dis ? href : null);
      CDS.attr(this.rowEl, "role", href && !dis ? null : "link");
      CDS.attr(this.rowEl, "tabindex", href && !dis ? null : "0");
      CDS.attr(this.rowEl, "aria-current", this.hasAttribute("selected") ? "page" : null);
      CDS.attr(this.rowEl, "aria-disabled", dis ? "true" : null);
    }
  }
  CdsSponsorSubcategory.define("cds-sponsor-subcategory");
})();
