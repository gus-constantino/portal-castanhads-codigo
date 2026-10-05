/**
 * <cmp-definition-list> — Lista de definição (rótulo · valor) · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * O DS não tem lista de definição (C87). Unifica as listas rótulo/valor do playground: props das nested instances
 * (painel), fichas de especificação das docs (bloco specs) e detalhe/elevação do Caju Tema. Só tokens.
 *
 * Anatomia (dl):
 *   inline   grade rótulo | valor (auto · 1fr), gap Sizes/8 × Sizes/12, alinhados pela linha de base
 *   stacked  rótulo em cima do valor, Sizes/2 entre eles e Sizes/12 entre pares
 *   Rótulo (dt) Caption/Regular · Text/medium · Valor (dd) Caption/Regular · Text/intense
 *
 * Atributos: layout ("inline" padrão | "stacked") · align ("start" padrão | "end": valor à direita, só inline)
 *   · mono ("true": valor em fonte monoespaçada Disclaimer, para nomes de prop e valores técnicos)
 * Conteúdo: filhos dt/dd (Slot, antes de conectar), ou setItems([[rótulo, valor], …]) — valor texto ou nó.
 *   listEl é o <dl> (criado na primeira leitura): quem monta aos poucos pode dar appendChild direto nele.
 */
(function(){
  "use strict";
  class CmpDefinitionList extends CDS.Element {
    static get observedAttributes(){ return ["layout", "align", "mono"]; }
    get listEl(){
      if (!this._dl){
        var dl = this._dl = CDS.create("dl", null, "cmp-dl");
        while (this.firstChild) dl.appendChild(this.firstChild); // Slot: dt/dd de quem usa
        this.appendChild(dl);
      }
      return this._dl;
    }
    render(){ this.listEl; this.dataset.layout = this.getAttribute("layout") === "stacked" ? "stacked" : "inline"; }
    setItems(rows){
      var dl = this.listEl; dl.innerHTML = "";
      (rows || []).forEach(function(r){
        dl.appendChild(CDS.create("dt")).textContent = r[0];
        var dd = dl.appendChild(CDS.create("dd"));
        if (r[1] && r[1].nodeType) dd.appendChild(r[1]); else dd.textContent = r[1] == null ? "—" : String(r[1]);
      });
    }
  }
  CmpDefinitionList.define("cmp-definition-list");
})();
