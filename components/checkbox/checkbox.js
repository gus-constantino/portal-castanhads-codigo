/**
 * @deps selection-control
 * <cds-checkbox> — Checkbox · Selection Controls · set 4123:2560
 * Atributos: label · show-text-label · status (unselected | selected | indeterminate) · disabled · name · value
 * Clique: unselected → selected → unselected; indeterminate → selected (o Figma não tem reaction a partir do indeterminate).
 */
(function(){
  "use strict";
  class CdsCheckbox extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-check cds-sc__glyph cds-sc__glyph--check"));
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-indeterminate cds-sc__glyph cds-sc__glyph--indeterminate"));
    }
    applyStatus(input, status){ input.checked = status === "selected"; input.indeterminate = status === "indeterminate"; }
    // Marcar: a caixa pulsa 100 → 110 → 100% e o check cresce do centro (Selected In/02). Desmarcar: o pulso no Selected Out/01
    onInputChange(){
      super.onInputChange();
      this._box.classList.remove("is-selecting", "is-deselecting");
      CDS.replay(this._box, this.status === "selected" ? "is-selecting" : "is-deselecting");
    }
  }
  CdsCheckbox.define("cds-checkbox");
})();
