/**
 * @deps select-field
 * <cds-multi-select-input> — Multi Select Input · Text Fields · set 13795:4984
 * Vários valores com busca: cada escolha vira um Input Chip no Content (Slot com Chips Group no Figma);
 * o × do chip ou Backspace com o campo vazio removem. Opções sem trailing.
 * Popover: no Figma começa em y 40 (sobre o Text Box, que vai até 72); aqui fica a 4px (CONFERIR C43).
 * Hover: 300ms + Systemic/accelerate (como no Figma; os outros Selects usam 150ms, C42).
 */
(function(){
  "use strict";
  class CdsMultiSelectInput extends CDS.SelectField {
    get multiple(){ return true; }
    get popoverGap(){ return 4; }
    displayText(){ return ""; } // os valores ficam nos Input Chips; o campo é só a busca (com value inicial, não repete o 1º rótulo)
    buildTrailing(box){ this.classList.add("cds-tf--multi"); super.buildTrailing(box); }
  }
  CdsMultiSelectInput.define("cds-multi-select-input");
})();
