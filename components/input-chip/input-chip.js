/**
 * @deps chip
 * <cds-input-chip> — Input Chips · Selection Controls · set 12365:2728
 * Entidade removível: clicar no chip inteiro remove (o alvo é o chip de 40px, não o ícone de 16px — WCAG 2.5.8).
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · disabled
 * Evento: cds-remove (cancelável) { label, keyboard } — sem preventDefault() o chip se remove do DOM. O chip sozinho não move o foco
 *   (como o Chips.Input do castanha-react); o Multi Select Input segue a regra do SelectInput do React (D145).
 */
(function(){
  "use strict";
  class CdsInputChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "disabled"]; }
    get button(){ return this._btn; }
    render(){
      var self = this, label = this.text("label", "Label");
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-chip");
        // detail.keyboard: Enter/Espaço geram click com e.detail 0 — quem usa decide o foco (como o Chips.Input do castanha-react)
        this._btn.addEventListener("click", function(e){
          var ev = new CustomEvent("cds-remove", { detail: { label: self.text("label", "Label"), keyboard: e.detail === 0 }, bubbles: true, cancelable: true });
          if (self.dispatchEvent(ev)) self.remove();
        });
        this.appendChild(this._btn);
      }
      var b = this._btn; b.innerHTML = ""; b.disabled = this.hasAttribute("disabled");
      this.leadEl = null;
      if (this.flag("show-lead-icon")){ this.leadEl = CDS.chipIcon(this.getAttribute("icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      b.appendChild(CDS.create("span")).textContent = label;
      b.appendChild(CDS.chipIcon("close-line"));
      b.setAttribute("aria-label", "Remover " + label);
    }
  }
  CdsInputChip.define("cds-input-chip");
})();
