/**
 * <loc-faixa> — Faixa de legado · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * A faixa "Legado | Arquivado" das thumbnails arquivadas do Castanha Assets: uma tarja que atravessa a capa de um
 * componente ou página fora de uso. Entra sozinha na capa de quem tem `legacy: "motivo"` no CDS.register (D225).
 *
 * Atributos:
 *   label  texto da faixa · padrão "Legado | Arquivado"
 * Quem usa posiciona o pai (position: relative); a faixa cruza o meio dele. Doc: #/locais › Vazio e faixa.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocFaixa extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){ this.textContent = this.getAttribute("label") || "Legado | Arquivado"; }
  }
  if (!customElements.get("loc-faixa")) customElements.define("loc-faixa", LocFaixa);
})();
