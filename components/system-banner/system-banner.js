/**
 * @deps alert
 * <cds-system-banner> — System Banner · Feedback · set 18432:2090
 * Mesma anatomia e props do Alert; ocupa a largura toda (sem raio, mínimo 360px). Ver alert.js.
 */
(function(){
  "use strict";
  class CdsSystemBanner extends CDS.Alert {
    // Saída animada (Selected Out/05 na posição, Selected Out/02 na opacidade) antes de sair do DOM. Sem animação, sai na hora
    close(){
      if (this._leaving || !this.dispatchEvent(new CustomEvent("cds-close", { bubbles: true, cancelable: true }))) return;
      var self = this; this._leaving = true; this.classList.add("is-leaving");
      CDS.afterAnimations(this, function(){ self.remove(); });
    }
  }
  CdsSystemBanner.define("cds-system-banner");
})();
