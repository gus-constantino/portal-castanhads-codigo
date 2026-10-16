/**
 * @deps icon badge
 * <cds-icon-button> — Icon Button · Buttons · set 4464:636
 * Renderiza um <button> com <cds-icon size="medium"> (20px) e, opcionalmente, <cds-badge> (Show Notification).
 *
 * Atributos (padrões do Figma):
 *   icon               Icon (swap) · padrão "placeholder-line"
 *   kind               default | ghost · padrão default
 *   appearance         accent | neutral | inversed · padrão accent
 *   size               medium (48) | small (40) · padrão medium
 *   disabled
 *   show-notification  mostra o Badge · notification = texto do Badge (padrão "0")
 *   label              nome acessível — obrigatório (botão só com ícone)
 *   pressed            "true" | "false" — repassa aria-pressed (toggle)
 * O evento click nativo sobe do <button> interno; o host não recebe foco.
 */
(function(){
  "use strict";
  class CdsIconButton extends CDS.Element {
    static get observedAttributes(){ return ["icon", "disabled", "show-notification", "notification", "label", "pressed"]; }
    get button(){ return this._btn; }
    focus(opts){ if (this._btn) this._btn.focus(opts); }
    render(){
      if (!this._btn){
        this._btn = document.createElement("button"); this._btn.type = "button"; this._btn.className = "cds-ib";
        this.iconEl = document.createElement("cds-icon"); this.iconEl.setAttribute("size", "medium"); this.iconEl.setAttribute("appearance", "neutral");
        this._btn.appendChild(this.iconEl); this.appendChild(this._btn);
        // Pressed: o botão encolhe para 90% e volta (Pressed/01 · C+pressed-escala)
        var b = this._btn, press = function(){ if (!b.disabled) CDS.replay(b, "is-pressing"); };
        b.addEventListener("pointerdown", press);
        b.addEventListener("keydown", function(e){ if ((e.key === " " || e.key === "Enter") && !e.repeat) press(); });
      }
      this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      this._btn.disabled = this.hasAttribute("disabled");
      var label = this.getAttribute("label");
      if (label) this._btn.setAttribute("aria-label", label); else this._btn.removeAttribute("aria-label");
      var pressed = this.getAttribute("pressed");
      if (pressed === "true" || pressed === "false") this._btn.setAttribute("aria-pressed", pressed); else this._btn.removeAttribute("aria-pressed");
      var badge = this._btn.querySelector("cds-badge");
      if (this.hasAttribute("show-notification")){
        if (!badge){ badge = document.createElement("cds-badge"); badge.setAttribute("appearance", "warning"); this._btn.appendChild(badge); }
        badge.setAttribute("label", this.getAttribute("notification") || "0");
      } else if (badge) badge.remove();
    }
  }
  CdsIconButton.define("cds-icon-button");
})();
