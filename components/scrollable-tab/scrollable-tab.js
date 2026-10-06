/**
 * @deps tab-list
 * <cds-scrollable-tab> — Scrollable Tab · Navigation · set 6646:181 (Active Item 1–6)
 * Abas no tamanho do conteúdo, com rolagem horizontal (overflow HORIZONTAL no Figma). A aba ativa rola para a vista.
 * Amostra: 6 abas.
 */
(function(){
  "use strict";
  class CdsScrollableTab extends CDS.TabList {
    get sampleCount(){ return 6; }
    // Rola a própria faixa de abas até a ativa, sem scrollIntoView: ele mexia na rolagem da página e cortava a rolagem
    // suave quando a aba ativa acompanha a leitura (ex.: capítulos da Proposta, docs/pitch)
    afterRender(a){
      var it = this.items[a - 1];
      if (it && this._shown){
        var r = it.getBoundingClientRect(), c = this.getBoundingClientRect();
        if (r.left < c.left) this.scrollLeft += r.left - c.left;
        else if (r.right > c.right) this.scrollLeft += r.right - c.right;
      }
      this._shown = true;
    }
  }
  CdsScrollableTab.define("cds-scrollable-tab");
})();
