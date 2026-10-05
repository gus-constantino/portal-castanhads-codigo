/**
 * <cmp-do-dont> — Do/Don't · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * Exemplo + legenda de uso certo/errado das docs (bloco dodont do docs-kit, usado em dezenas de docs). O DS não tem
 * esse bloco (C87): a composição monta com tokens, no padrão do Hub — Use: Feedback/Positive/soft · Não use:
 * Accent/Solid/soft · Use com cautela: Feedback/Warning/soft · raio medium · Elevation/level 2.
 *
 * Anatomia (figure):
 *   .Example  filhos com slot="example" · Surface/default · mín. Sizes/200 · pad 16 · conteúdo centralizado
 *             (sem filhos de exemplo, a caixa some: Do/Don't só de texto)
 *   .Caption  (figcaption) Veredito (Body/Bold: "Use" · "Não use" · "Use com cautela") · Heading opcional (Body/Bold · Text/intense)
 *             · demais filhos (texto, lista de passos) em Body/Regular · Text/medium
 *
 * Atributos: kind ("do" padrão | "dont" | "caution") · heading (título opcional; não é "title" para não virar tooltip nativo)
 *   · label (troca o texto do veredito)
 * Referências: exampleEl · captionEl · verdictEl · headingEl
 */
(function(){
  "use strict";
  var VERDICT = { "do": "Use", dont: "Não use", caution: "Use com cautela" };
  class CmpDoDont extends CDS.Element {
    static get observedAttributes(){ return ["kind", "heading", "label"]; }
    render(){
      if (!this._built){
        this._built = true;
        var c = CDS.create, kids = [].slice.call(this.childNodes);
        var fig = this.appendChild(c("figure", null, "cmp-dd"));
        this.exampleEl = fig.appendChild(c("div", null, "cmp-dd__example"));
        this.captionEl = fig.appendChild(c("figcaption", null, "cmp-dd__caption"));
        this.verdictEl = this.captionEl.appendChild(c("strong", null, "cmp-dd__verdict"));
        this.headingEl = this.captionEl.appendChild(c("span", null, "cmp-dd__heading"));
        var self = this;
        // Slot: filhos com slot="example" vão para a caixa do exemplo; o resto vai para a legenda
        kids.forEach(function(n){
          if (n.nodeType === 1 && n.getAttribute("slot") === "example"){ n.removeAttribute("slot"); self.exampleEl.appendChild(n); }
          else if (n.nodeType === 1 || String(n.textContent).trim()) self.captionEl.appendChild(n);
          else n.remove();
        });
        this.exampleEl.hidden = !this.exampleEl.childNodes.length;
      }
      var kind = VERDICT[this.getAttribute("kind")] ? this.getAttribute("kind") : "do";
      this.dataset.kind = kind;
      this.verdictEl.textContent = this.text("label", VERDICT[kind]);
      var h = this.getAttribute("heading") || "";
      this.headingEl.textContent = h; this.headingEl.hidden = !h;
    }
  }
  CmpDoDont.define("cmp-do-dont");
})();
