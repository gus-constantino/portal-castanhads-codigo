/**
 * @deps —
 * <cds-card-flag> — Credit Card Flags · Flags · set 4934:771
 * Atributos: kind empty | elo | mastercard | visa · padrão empty
 * As bandeiras usam o SVG de marca reconstruído do Figma (assets/flags). Nome acessível = nome da bandeira.
 */
(function(){
  "use strict";
  var NAMES = { elo: "Elo", mastercard: "Mastercard", visa: "Visa" };
  class CdsCardFlag extends CDS.Element {
    static get observedAttributes(){ return ["kind"]; }
    render(){
      var k = this.getAttribute("kind");
      this.innerHTML = "";
      if (NAMES[k]){
        var img = document.createElement("img"); img.src = "assets/flags/" + k + ".svg"; img.alt = NAMES[k]; img.width = 40; img.height = 24;
        this.appendChild(img); this.removeAttribute("aria-hidden");
      } else this.setAttribute("aria-hidden", "true");
    }
  }
  CdsCardFlag.define("cds-card-flag");
})();
