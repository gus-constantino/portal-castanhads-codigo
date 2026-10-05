/**
 * @deps —
 * <cds-card> — Card · Containers · set 5256:540
 * Container com Slot: os filhos de quem usa são o conteúdo. Has Border liga o stroke Border/semi-soft.
 * Atributos: has-border (padrão True, como na lib — Has Border=True é a variante padrão; "false" desliga · decisão de 05/10, C155)
 */
(function(){
  "use strict";
  class CdsCard extends CDS.Element {
    static get observedAttributes(){ return ["has-border"]; }
    render(){
      if (!this._built){ this._built = true; var slot = CDS.create("div", null, "cds-card__slot"); while (this.firstChild) slot.appendChild(this.firstChild); this.appendChild(slot); this.slotEl = slot; }
    }
  }
  CdsCard.define("cds-card");
})();
