/**
 * <loc-banner> — Banner de divulgação · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * O banner das Notion thumbnails do Castanha Assets (página "Notion thumbnails", ex.: "Consultoria & Cerimônias"):
 * fundo no tom mais escuro da área, as faixas da pilha à esquerda e o conteúdo dentro do cartão da frente.
 * Usado para divulgar os cursos e as capacitações do Castanha DS (Início e Capacitações). D230.
 *
 * Atributos:
 *   area      escala de cor (CDS.local.areas · padrão aprenda)
 *   eyebrow   sobretítulo curto (ex.: "Curso" ou "8 vídeos")
 *   heading   título
 *   text      uma frase
 *   href      destino do Link do DS · cta: texto do link · external: "true" abre em outra aba
 * A11y: as faixas são decorativas (aria-hidden); o título é um h3 e o Link do DS leva o nome do destino.
 * Motion: as faixas abrem em leque no hover/foco do banner, com Hover In/01 e Hover Out/01.
 * Doc: #/locais › Banner (página escondida).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocBanner extends CDS.Element {
    static get observedAttributes(){ return ["area", "eyebrow", "heading", "text", "href", "cta", "external"]; }
    render(){
      this.dataset.locArea = this.getAttribute("area") || "aprenda"; // fundo e faixas leem a escala (local/pilha/pilha.css)
      if (!this._built){
        this._built = true;
        this.textContent = "";
        var stack = this.appendChild(CDS.create("div", null, "loc-banner__stack"));
        for (var k = 3; k >= 1; k--){ var s = stack.appendChild(document.createElement("span")); s.className = "loc-banner__strip"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--_k", String(k)); }
        var front = stack.appendChild(CDS.create("div", null, "loc-banner__front"));
        this._e = front.appendChild(CDS.create("p", null, "loc-banner__eyebrow"));
        this._h = front.appendChild(CDS.create("h3", null, "loc-banner__title"));
        this._t = front.appendChild(CDS.create("p", null, "loc-banner__text"));
        this._l = front.appendChild(document.createElement("cds-link")); this._l.className = "loc-banner__link";
      }
      this._e.textContent = this.getAttribute("eyebrow") || ""; this._e.hidden = !this._e.textContent;
      this._h.textContent = this.getAttribute("heading") || "";
      this._t.textContent = this.getAttribute("text") || ""; this._t.hidden = !this._t.textContent;
      var href = this.getAttribute("href"), ext = this.getAttribute("external") === "true";
      this._l.hidden = !href;
      if (href){
        CDS.attr(this._l, "href", href); CDS.attr(this._l, "label", this.getAttribute("cta") || "Abrir"); CDS.attr(this._l, "appearance", "neutral");
        if (ext){ CDS.attr(this._l, "target", "_blank"); CDS.attr(this._l, "icon", "link-line"); }
      }
    }
  }
  if (!customElements.get("loc-banner")) customElements.define("loc-banner", LocBanner);
})();
