/**
 * @deps chip
 * <cds-filter-chip> — Filter Chips · Selection Controls · set 12365:2744
 * Toggle: o clique alterna Is Selected (aria-pressed). Selecionado troca o Lead Icon pelo check-line.
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · selected · disabled
 *   size (medium | small · padrão medium) — Size da branch CDS-1599: Small = 32 de altura, o resto igual ao Medium
 * Evento: cds-change { selected }
 */
(function(){
  "use strict";
  class CdsFilterChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "selected", "disabled", "size"]; }
    get button(){ return this._btn; }
    get selected(){ return this.hasAttribute("selected"); }
    render(){
      var self = this;
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-chip");
        this._btn.addEventListener("click", function(){
          self.toggleAttribute("selected");
          self.dispatchEvent(new CustomEvent("cds-change", { detail: { selected: self.selected }, bubbles: true }));
        });
        this.appendChild(this._btn);
      }
      var b = this._btn; b.innerHTML = ""; b.disabled = this.hasAttribute("disabled");
      b.setAttribute("aria-pressed", String(this.selected));
      this.leadEl = null;
      if (this.selected) { this.leadEl = CDS.chipIcon("check-line"); b.appendChild(this.leadEl); }
      else if (this.flag("show-lead-icon")){ this.leadEl = CDS.chipIcon(this.getAttribute("icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      b.appendChild(CDS.create("span")).textContent = this.text("label", "Label");
    }
  }
  CdsFilterChip.define("cds-filter-chip");
})();
