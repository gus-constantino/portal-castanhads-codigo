/**
 * @deps footer
 * <cds-fixed-bar> — Fixed Bar · componente 24037:2929
 * Barra de ações ancorada no fim da tela: Divider + Action Buttons, mesma estrutura do .Footer.
 * Kind=Horizontal (padrão): botões no tamanho do conteúdo · Kind=Pilled: empilhados, largura total.
 * Atributos: os do .Footer (show-secondary-action no lugar de show-secondary-action-button) · fixed (position:fixed no fim da viewport)
 */
(function(){
  "use strict";
  class CdsFixedBar extends CDS.Footer {
    get defaultKind(){ return "horizontal"; }
    connectedCallback(){ super.connectedCallback(); this.setAttribute("role", "region"); if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Ações"); }
  }
  CdsFixedBar.define("cds-fixed-bar");
})();
