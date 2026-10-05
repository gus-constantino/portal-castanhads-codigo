/**
 * @deps icon badge
 * <cds-tab-item> — .Item (Tabs) · .Building Blocks · set 6498:375
 * 48 de altura · Label Content (pad 4 8 · gap 4 · raio micro) com Lead Item (Choose Icon, oculto por padrão) + Label.
 * Is Active=True: sublinhado 2px Accent/Solid/medium · Label/Medium Text/intense.
 * Hovered: sublinhado 2px Border/semi-soft + Label Content Surface/01 · Pressed: sublinhado Accent/Solid/medium + Surface/01 + Label/Medium.
 * Show Badge (lib: padrão True; nas instâncias de Fixed Tab e Scrollable Tab, False): Badge Warning "0" depois do Label (gap 4).
 *   Aqui: ligado no .Item solto; dentro de uma tablist só com show-badge="true" (D145).
 * Atributos: label ("Label") · icon (placeholder-line) · show-lead-item · show-badge · badge-label ("0") · is-active · disabled · controls (id do painel)
 *   state="hovered|pressed" (specimen)
 * É um <button role="tab"> (a lista cuida de aria-selected, tabindex e teclado).
 */
(function(){
  "use strict";
  class CdsTabItem extends CDS.Element {
    static get observedAttributes(){ return ["label","icon","show-lead-item","show-badge","badge-label","is-active","disabled","controls"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", role: "tab" }, "cds-tab"));
        var c = b.appendChild(CDS.create("span", null, "cds-tab__content"));
        this.iconEl = c.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-tab__icon"));
        this.labelEl = c.appendChild(CDS.create("span", null, "cds-tab__label"));
        this.badgeEl = c.appendChild(CDS.create("cds-badge", null, "cds-tab__badge"));
      }
      var on = this.hasAttribute("is-active");
      this.labelEl.textContent = this.text("label", "Label");
      CDS.attr(this.iconEl, "icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.hidden = this.getAttribute("show-lead-item") !== "true"; // Show Lead Item: padrão False
      var inList = !!CDS.TabList && this.parentElement instanceof CDS.TabList, sb = this.getAttribute("show-badge");
      this.badgeEl.hidden = sb === "false" || (inList && sb !== "true"); // Show Badge: True no .Item, False nas Tabs (como no Figma)
      CDS.attr(this.badgeEl, "label", this.getAttribute("badge-label"));
      // nome acessível com o Badge separado ("Label, 3"); sem Badge, o nome é o próprio Label
      CDS.attr(this.btn, "aria-label", this.badgeEl.hidden ? null : this.labelEl.textContent + ", " + (this.getAttribute("badge-label") || "0"));
      CDS.attr(this.btn, "aria-selected", String(on));
      // foco itinerante: dentro de uma tablist só a aba ativa entra no Tab
      this.btn.tabIndex = !this.parentElement || this.parentElement.getAttribute("role") !== "tablist" || on ? 0 : -1;
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-controls", this.getAttribute("controls"));
    }
  }
  CdsTabItem.define("cds-tab-item");
})();
