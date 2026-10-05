/**
 * <cmp-clickable-card> — Card clicável · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * Por que existe: o DS não tem Card interativo. O Card (Containers, set 5256:540) é container estático, com pad 24 + 8,
 * sem estados de hover/selecionado nem área de clique. Enquanto o DS não tiver um, esta composição monta o card
 * clicável só com tokens do Card e do menu (C165; melhoria: https://github.com/gus-constantino/castanhads-component-teste/issues/1). Prefixo cmp-: composição local,
 * nunca confundir com cds-. Quando o DS tiver o componente, trocar as instâncias e apagar esta pasta.
 *
 * Dois modos, escolhidos ao montar: com href é um link (navega); sem href é um botão (ação: copiar, selecionar…),
 * e quem usa ouve o "click" no próprio <cmp-clickable-card>.
 *
 * Anatomia:
 *   controle (a ou button, área de clique inteira) · Surface/default · raio medium · Border/semi-soft hairline · pad 4 · gap 4
 *     .Media  Slot quadrado (aspect-ratio 1) · Surface/01 · raio small — os filhos de quem usa entram aqui
 *             media="auto": altura pelo conteúdo, mín. Sizes/56, pad 12 (ícones pequenos em galerias)
 *     .Label  Disclaimer/Regular · Text/medium (atual: Disclaimer/Medium · Text/intense)
 *   Hover: Surface/01 + Border/medium · Atual: Surface/01 + Border/intense thin · Foco: Support/system thin
 *
 * Atributos: href (sem = botão) · label (texto do card) · description (aria-description, notas extras)
 *   current ("true" = atual: aria-current="page" no link, aria-pressed no botão) · media ("square" padrão | "auto")
 *   control-label (aria-label do controle, quando o nome falado deve dizer a ação: "add-line — copiar nome")
 * Referências: linkEl (o controle, a ou button) · mediaEl · labelEl
 */
(function(){
  "use strict";
  class CmpClickableCard extends CDS.Element {
    static get observedAttributes(){ return ["href", "label", "description", "current", "control-label"]; }
    render(){
      if (!this._built){
        this._built = true;
        var c = CDS.create;
        var media = this.mediaEl = c("div", null, "cmp-cc__media");
        while (this.firstChild) media.appendChild(this.firstChild); // Slot: filhos de quem usa
        this._link = this.hasAttribute("href");
        this.linkEl = this.appendChild(c(this._link ? "a" : "button", this._link ? null : { type: "button" }, "cmp-cc"));
        this.linkEl.appendChild(media);
        this.labelEl = this.linkEl.appendChild(c("span", null, "cmp-cc__label"));
      }
      if (this._link) CDS.attr(this.linkEl, "href", this.getAttribute("href"));
      this.labelEl.textContent = this.text("label", "Label");
      CDS.attr(this.linkEl, "aria-description", this.getAttribute("description") || null);
      CDS.attr(this.linkEl, "aria-label", this.getAttribute("control-label") || null);
      var on = this.getAttribute("current") === "true";
      if (!this._link) CDS.attr(this.linkEl, "aria-pressed", this.hasAttribute("current") ? String(on) : null);
      else if (this.hasAttribute("current")) CDS.attr(this.linkEl, "aria-current", on ? "page" : null);
    }
  }
  CmpClickableCard.define("cmp-clickable-card");
})();
