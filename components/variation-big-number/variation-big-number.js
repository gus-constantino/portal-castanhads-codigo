/**
 * @deps icon
 * <cds-variation-big-number> — .Variation Big Number · Content · set 27246:396 (building block do Big Number, branch KOmiQxHXqiErSbLmoG3sv6 · CDS-1597)
 * Variação do valor em texto e ícone, sem fundo. Não é distribuído sozinho: quem usa o DS usa o <cds-big-number>.
 *
 * Atributos (padrões do Figma):
 *   label        Text Label · padrão "+1%"
 *   appearance   positive | warning | negative | informative | inversed · padrão positive
 *   icon         Icon (swap) · padrão "up-down-line"
 *   description  sentido da variação para o leitor de tela (ex.: Aumento de 1% em relação ao período anterior).
 *                Sem description, o leitor de tela ouve o texto visível. O ícone é sempre decorativo.
 */
(function(){
  "use strict";
  class CdsVariationBigNumber extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "description"]; }
    render(){
      var desc = this.getAttribute("description");
      this.innerHTML = "";
      var t = this.appendChild(CDS.create("span", null, "cds-vbn__label"));
      t.textContent = this.text("label", "+1%");
      if (desc){ t.setAttribute("aria-hidden", "true"); this.appendChild(CDS.create("span", null, "cds-vbn__sr")).textContent = desc; }
      this.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("icon") || "up-down-line", size: "small" }));
    }
  }
  CdsVariationBigNumber.define("cds-variation-big-number");
})();
