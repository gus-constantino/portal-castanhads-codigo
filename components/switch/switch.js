/**
 * @deps selection-control
 * <cds-switch> — Switch · Selection Controls · set 4895:809
 * Atributos: label · show-text-label · status (unselected | selected) · disabled · name · value
 * <input type="checkbox" role="switch"> — o leitor de tela anuncia "ligado/desligado".
 */
(function(){
  "use strict";
  class CdsSwitch extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){ box.appendChild(CDS.create("span", null, "cds-sw__toggle")); }
    build(){
      super.build(); this._input.setAttribute("role", "switch");
      // Pressed: a bolinha cresce para 110% e volta (Pressed/01 · C205)
      var self = this, press = function(){ if (!self._input.disabled) CDS.replay(self._box.querySelector(".cds-sw__toggle"), "is-pressing"); };
      this._root.addEventListener("pointerdown", press);
      this._input.addEventListener("keydown", function(e){ if (e.key === " " && !e.repeat) press(); });
    }
  }
  CdsSwitch.define("cds-switch");
})();
