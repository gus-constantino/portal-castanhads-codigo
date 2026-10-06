/**
 * <loc-vazio> — Estado vazio · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * O DS não tem componente de estado vazio. No playground, busca sem resultado e página não encontrada usam esta peça:
 * a pilha na escala Legado (cinza, em leque parado), um título e um texto. Conceito do Castanha Assets (D225).
 * Filhos passados antes de conectar (ex.: um Link do DS) viram as ações, embaixo do texto.
 *
 * Atributos:
 *   heading  frase curta do que aconteceu (ex.: "Nenhuma release encontrada")
 *   text   o que a pessoa pode fazer agora
 *   size   small: pilha menor e menos respiro (dentro de listas e filtros)
 * A11y: a pilha é decorativa (aria-hidden); quem mostra e esconde o vazio avisa a contagem num aria-live próprio.
 * Doc: #/locais › Vazio e faixa (página escondida).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocVazio extends CDS.Element {
    static get observedAttributes(){ return ["heading", "text"]; }
    render(){
      if (!this._built){
        this._built = true;
        var extra = [].slice.call(this.childNodes);
        this.textContent = "";
        var p = this.appendChild(document.createElement("loc-pilha")); p.className = "loc-vazio__pilha";
        p.setAttribute("area", "legado"); p.setAttribute("cards", "3"); p.setAttribute("fan", "");
        this._t = this.appendChild(CDS.create("p", null, "loc-vazio__title"));
        this._x = this.appendChild(CDS.create("p", null, "loc-vazio__text"));
        this._a = this.appendChild(CDS.create("div", null, "loc-vazio__actions"));
        extra.forEach(function(n){ this._a.appendChild(n); }, this);
      }
      this._t.textContent = this.getAttribute("heading") || "";
      this._x.textContent = this.getAttribute("text") || "";
      this._x.hidden = !this._x.textContent;
      this._a.hidden = !this._a.childNodes.length;
    }
  }
  if (!customElements.get("loc-vazio")) customElements.define("loc-vazio", LocVazio);
})();
