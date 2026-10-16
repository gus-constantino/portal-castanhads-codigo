/**
 * @deps icon
 * <cds-fab-button> — .FAB Button · Buttons · set 27039:594 (building block do FAB Menu, branch F1s1Tb3cDHYli4aN76QzCo · CDS-1694)
 * Botão flutuante de 56 com ícone de 24. Não é distribuído sozinho: quem usa o DS usa o <cds-fab-menu>.
 *
 * Atributos (padrões do Figma):
 *   icon        Icon (swap) do estado fechado · padrão "plus-line"
 *   appearance  accent | neutral | inversed · padrão accent
 *   active      Is Active — presente = aberto, ícone close-line (fixo)
 *   disabled
 *   label       nome acessível — obrigatório (botão só com ícone)
 * Pressed: o botão encolhe para 90% e volta (Pressed/01), como o Icon Button.
 */
(function(){
  "use strict";
  class CdsFabButton extends CDS.Element {
    static get observedAttributes(){ return ["icon", "active", "disabled", "label"]; }
    get button(){ return this._btn; }
    focus(opts){ if (this._btn) this._btn.focus(opts); }
    render(){
      if (!this._btn){
        this._btn = document.createElement("button"); this._btn.type = "button"; this._btn.className = "cds-fab";
        this.iconEl = document.createElement("cds-icon"); this.iconEl.setAttribute("size", "large"); this.iconEl.setAttribute("appearance", "neutral");
        this._btn.appendChild(this.iconEl); this.appendChild(this._btn);
        var b = this._btn, press = function(){ if (!b.disabled) CDS.replay(b, "is-pressing"); };
        b.addEventListener("pointerdown", press);
        b.addEventListener("keydown", function(e){ if ((e.key === " " || e.key === "Enter") && !e.repeat) press(); });
      }
      this.iconEl.setAttribute("icon", this.hasAttribute("active") ? "close-line" : (this.getAttribute("icon") || "plus-line"));
      this._btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this._btn, "aria-label", this.getAttribute("label") || null);
    }
  }
  CdsFabButton.define("cds-fab-button");
})();
