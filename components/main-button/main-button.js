/**
 * @deps icon spinner
 * <cds-main-button> — Main Button · Buttons · set 4464:427
 * Renderiza um <button class="cds-btn"> com <cds-icon> leading e trailing (nested instances, 20px).
 *
 * Atributos (padrões do Figma):
 *   label               Text Label · padrão "Label"
 *   kind                default | ghost · padrão default
 *   appearance          accent | neutral | inversed · padrão accent
 *   size                medium (48) | small (40) · padrão medium
 *   disabled
 *   lead-icon           Lead Icon (swap) · padrão "placeholder-line"
 *   show-lead-icon      "false" esconde · padrão ligado
 *   trailing-icon       Choose Icon do Icon trailing (nested) · padrão "placeholder-line"
 *   show-trailing-icon  "false" esconde · padrão ligado
 *   type                button | submit | reset · padrão button
 *   loading             Is Loading (branch pIX8i38mYWwax98yIjPmJw, CDS-1603): o Spinner centralizado substitui o conteúdo,
 *                       o botão mantém a largura (conteúdo com visibility:hidden), fica com aria-busy e não dispara clique
 *   loading-label       nome acessível no loading · padrão "Carregando"
 * Spinner do loading (instâncias da branch): Medium 24 · Small 16. Cor: Default Accent → Inversed · Default Neutral e Inversed → Neutral
 *   · Ghost Accent → Accent · Ghost Neutral → Neutral · Ghost Inversed → Inversed
 */
(function(){
  "use strict";
  var SPIN = { "default-accent": "inversed", "default-neutral": "neutral", "default-inversed": "neutral", "ghost-accent": "accent", "ghost-neutral": "neutral", "ghost-inversed": "inversed" };
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsMainButton extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "trailing-icon", "show-trailing-icon", "type", "loading", "loading-label", "size", "kind", "appearance"]; }
    get button(){ return this._btn; }
    focus(o){ if (this._btn) this._btn.focus(o); }
    render(){
      var b = this._btn || document.createElement("button");
      b.className = "cds-btn"; b.type = this.getAttribute("type") || "button"; b.disabled = this.hasAttribute("disabled");
      b.innerHTML = "";
      this.leadEl = this.trailEl = null;
      if (this.flag("show-lead-icon")){ this.leadEl = icon(this.getAttribute("lead-icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; b.appendChild(t);
      if (this.flag("show-trailing-icon")){ this.trailEl = icon(this.getAttribute("trailing-icon") || "placeholder-line"); b.appendChild(this.trailEl); }
      // Loading: Spinner centralizado por cima do conteúdo, que fica invisível e segura a largura
      var loading = this.hasAttribute("loading");
      CDS.attr(b, "aria-busy", loading ? "true" : null);
      CDS.attr(b, "aria-disabled", loading ? "true" : null);
      CDS.attr(b, "aria-label", loading ? (this.getAttribute("loading-label") || "Carregando") : null);
      if (loading){
        var key = (this.getAttribute("kind") === "ghost" ? "ghost" : "default") + "-" + (this.getAttribute("appearance") || "accent");
        b.appendChild(CDS.create("cds-spinner", { size: this.getAttribute("size") === "small" ? "small" : "medium", appearance: SPIN[key] || "neutral", "aria-hidden": "true" }, "cds-btn__spinner"));
      }
      if (!this._btn){
        var self = this;
        // no loading o botão continua focável (aria-disabled), mas o clique e o envio de formulário não acontecem
        b.addEventListener("click", function(e){ if (self.hasAttribute("loading")){ e.preventDefault(); e.stopPropagation(); } });
        // Pressed: o botão encolhe para 90% e volta (Pressed/01, decisão do Gustavo 16/10 · C205)
        var press = function(){ if (!b.disabled && !self.hasAttribute("loading")) CDS.replay(b, "is-pressing"); };
        b.addEventListener("pointerdown", press);
        b.addEventListener("keydown", function(e){ if ((e.key === " " || e.key === "Enter") && !e.repeat) press(); });
        this._btn = b; this.appendChild(b);
      }
    }
  }
  CdsMainButton.define("cds-main-button");
})();
