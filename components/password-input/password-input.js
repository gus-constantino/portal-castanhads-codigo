/**
 * @deps text-field
 * <cds-password-input> — Password Input · Text Fields · set 5798:2677
 * Show Content=False mascara o valor; a Visibility Action (Icon Button · Ghost · Neutral · Small) alterna.
 * Ícone reflete o estado: hide-line com o conteúdo visível, hide-off-line mascarado (mesmo padrão do OTP).
 * Sem valor, a Visibility Action fica indisponível (Figma: State=Disabled no campo vazio).
 * Ícone de aviso (warning-line) no Warning, antes da Visibility Action, como no Text Input (hotfix CDS-2070, branch
 * D7w4pYHDcUZKZ1qEkCH12b; substitui a D250). Na branch, Show Trailing Item (27797:0) passou a ser o ícone de aviso e a
 * Visibility Action ganhou a sua boolean, Show Visibility Action (5748:0, a antiga Show Trailing Item da main).
 *
 * Atributos: os da família (show-trailing-item = ícone de aviso) · show-visibility-action · show-content ("true" mostra;
 * padrão mascarado — Q35) · autocomplete (padrão current-password)
 * Eventos: cds-change { value } · cds-visibility-change { visible }
 */
(function(){
  "use strict";
  class CdsPasswordInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["show-content", "show-visibility-action", "autocomplete"]); }
    get visible(){ return this.getAttribute("show-content") === "true"; }
    get fallbackName(){ return "Senha"; }
    configureControl(ctrl){ ctrl.type = "password"; ctrl.setAttribute("autocapitalize", "off"); }
    buildTrailing(box){
      var self = this, b = this.visBtn = document.createElement("cds-icon-button");
      b.className = "cds-tf__action";
      b.setAttribute("kind", "ghost"); b.setAttribute("appearance", "neutral"); b.setAttribute("size", "small");
      b.addEventListener("click", function(){
        self.setAttribute("show-content", self.visible ? "false" : "true");
        self.dispatchEvent(new CustomEvent("cds-visibility-change", { detail: { visible: self.visible }, bubbles: true }));
        var inner = self.visBtn.querySelector("button"); if (inner) inner.focus();
      });
      box.appendChild(b);
    }
    updateTrailing(){
      if (!this.visBtn) return;
      var vis = this.visible;
      this.control.type = vis ? "text" : "password";
      this.visBtn.hidden = !this.flag("show-visibility-action");
      this.visBtn.setAttribute("icon", vis ? "hide-line" : "hide-off-line");
      this.visBtn.setAttribute("label", vis ? "Ocultar senha" : "Mostrar senha");
      this.visBtn.setAttribute("pressed", String(vis));
      if (this.disabled || !this.value) this.visBtn.setAttribute("disabled", ""); else this.visBtn.removeAttribute("disabled");
    }
    update(){
      this.control.autocomplete = this.getAttribute("autocomplete") || "current-password";
      super.update();
    }
  }
  CdsPasswordInput.define("cds-password-input");
})();
