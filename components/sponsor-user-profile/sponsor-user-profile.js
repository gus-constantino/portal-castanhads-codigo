/**
 * @deps avatar icon-button
 * <cds-sponsor-user-profile> — .User Profile · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: rodapé de identificação do Side Menu: avatar, nome e CNPJ, com ação opcional (Show Icon Button).
 * Kind deriva do colapso do menu: Default (expandido) mostra os dados, Reduced (colapsado) mostra só o avatar.
 *
 * Anatomia: Default 288×92 · Reduced 40×92 · fundo Surface/01 · pad 24 0 · gap 16
 *   Avatar (Image · Small 40) · User Name (Label/Bold, Text/intense) · CNPJ (Caption/Medium, Text/medium) · Icon Button (Small · Default · Neutral)
 *
 * Atributos: kind (default|reduced) · user-name ("User Name") · cnpj ("00.000.000/0001-00") · src (foto) · show-icon-button · icon (more-line)
 * Referência: iconBtn (Icon Button da ação). Evento: cds-action ao clicar no Icon Button.
 */
(function(){
  "use strict";
  class CdsSponsorUserProfile extends CDS.Element {
    static get observedAttributes(){ return ["kind","user-name","cnpj","src","show-icon-button","icon"]; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        this.innerHTML = "";
        this.avatarEl = this.appendChild(c("cds-avatar", { kind: "image", size: "small" }, "cds-spu__avatar"));
        var txt = this.textEl = this.appendChild(c("div", null, "cds-spu__text"));
        this.nameEl = txt.appendChild(c("span", null, "cds-spu__name"));
        this.cnpjEl = txt.appendChild(c("span", null, "cds-spu__cnpj"));
        this.iconBtn = this.appendChild(c("cds-icon-button", { kind: "default", appearance: "neutral", size: "small", label: "Opções da conta" }, "cds-spu__action"));
        this.iconBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { bubbles: true })); });
      }
      var reduced = this.getAttribute("kind") === "reduced", name = this.getAttribute("user-name") || "User Name";
      this.nameEl.textContent = name;
      this.cnpjEl.textContent = this.getAttribute("cnpj") || "00.000.000/0001-00";
      CDS.attr(this.avatarEl, "src", this.getAttribute("src") || "assets/brand/sample-photo.svg");
      CDS.attr(this.avatarEl, "name", name);
      CDS.attr(this.iconBtn, "icon", this.getAttribute("icon") || "more-line");
      this.textEl.hidden = reduced;
      this.iconBtn.hidden = reduced || this.getAttribute("show-icon-button") === "false";
    }
  }
  CdsSponsorUserProfile.define("cds-sponsor-user-profile");
})();
