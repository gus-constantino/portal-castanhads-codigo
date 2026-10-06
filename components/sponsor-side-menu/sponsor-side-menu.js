/**
 * @deps caju-brand sponsor-category sponsor-subcategory sponsor-user-profile tag
 * <cds-sponsor-side-menu> — Side Menu · [CastanhaDS] Sponsor Templates (set 5576:445, componente de template Sponsor)
 * Description do Figma: navegação lateral do app Sponsor. Colapsado (80px, só ícones) e expandido (360px). No desktop expande por
 * hover, em overlay sobre o conteúdo. Um item selecionado por vez, derivado da rota. Um accordion aberto por vez.
 *
 * Anatomia (lida no Figma): Surface/01 · Elevation/level 2 · raio Border/Radius/large à direita · pad 32 20 0 20 · altura mínima 788
 *   coluna com espaço entre o topo (Container) e o rodapé (User Area)
 *   Container (gap 20): Heading 44 (Brand 40, logo vertical ao centro: expandido à esquerda com pad 16 e tipografia, colapsado centralizado, só o símbolo)
 *     · Slot (Show Slot, pad 16, raio small, altura máxima 160) · Shortcuts (Show Shortcuts, pad-top 8, gap 8, .Category Accent)
 *     · Categories (gap 20, pad 16 0, .Category Neutral) · User Area (pad 20 0): Help (.Category) + .User Profile
 *   Colapsado: .Category e .User Profile em Kind=Reduced (só ícone e avatar)
 *
 * Atributos: collapsed (Is Collapsed · padrão do Figma: true; "false" fixa expandido) · show-slot · show-shortcuts
 * Filhos: <cds-sponsor-category> vão para Categories; com slot="shortcuts" para Shortcuts; slot="help" para Help;
 *   <cds-sponsor-user-profile> (ou slot="profile") para o rodapé; slot="slot" para o Slot livre.
 * Comportamento: colapsado, abre por hover ou foco em overlay (a largura de 80 continua reservada); clicar num item seleciona
 *   ele e tira a seleção dos outros; abrir um accordion fecha os outros. Evento: cds-select { item }.
 */
(function(){
  "use strict";
  class CdsSponsorSideMenu extends CDS.Element {
    static get observedAttributes(){ return ["collapsed","show-slot","show-shortcuts"]; }
    get collapsed(){ return this.getAttribute("collapsed") !== "false"; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        var kids = [].slice.call(this.children);
        this.innerHTML = "";
        var p = this.panel = this.appendChild(c("nav", { "aria-label": "Menu" }, "cds-ssm"));
        var box = p.appendChild(c("div", null, "cds-ssm__container"));
        var head = box.appendChild(c("div", null, "cds-ssm__heading"));
        this.brandEl = head.appendChild(c("div", null, "cds-ssm__brand")).appendChild(c("cds-caju-brand", { label: "Caju" }));
        this.slotEl = box.appendChild(c("div", null, "cds-ssm__slot"));
        this.shortEl = box.appendChild(c("div", { role: "list", "aria-label": "Atalhos" }, "cds-ssm__shortcuts"));
        this.catEl = box.appendChild(c("div", { role: "list", "aria-label": "Categorias" }, "cds-ssm__categories"));
        var user = p.appendChild(c("div", null, "cds-ssm__user"));
        this.helpEl = user.appendChild(c("div", null, "cds-ssm__help"));
        this.profileEl = user.appendChild(c("div", null, "cds-ssm__profile"));
        kids.forEach(function(k){
          var s = k.getAttribute("slot");
          if (k.tagName === "CDS-SPONSOR-USER-PROFILE" || s === "profile") self.profileEl.appendChild(k);
          else if (s === "shortcuts") self.shortEl.appendChild(k);
          else if (s === "help") self.helpEl.appendChild(k);
          else if (s === "slot") self.slotEl.appendChild(k);
          else self.catEl.appendChild(k);
        });
        // colapsado: abre por hover/foco, em overlay
        function peek(on){ if (self._peek === on) return; self._peek = on; self.sync(); }
        this.addEventListener("pointerenter", function(e){ if (e.pointerType !== "touch") peek(true); });
        this.addEventListener("pointerleave", function(){ peek(false); });
        this.addEventListener("focusin", function(){ peek(true); });
        this.addEventListener("focusout", function(e){ if (!self.contains(e.relatedTarget)) peek(false); });
        // um selecionado por vez · um accordion aberto por vez
        this.addEventListener("click", function(e){
          var it = e.target.closest("cds-sponsor-category, cds-sponsor-subcategory");
          if (!it || !self.contains(it) || it.hasAttribute("disabled")) return;
          if (it.tagName === "CDS-SPONSOR-CATEGORY" && it.getAttribute("intent") === "accordion") return;
          self.select(it);
        });
        this.addEventListener("cds-toggle", function(e){
          if (!e.detail.expanded) return;
          self.items().forEach(function(x){ if (x !== e.target && x.getAttribute("intent") === "accordion") x.expanded = false; });
        });
      }
      this.slotEl.hidden = this.getAttribute("show-slot") !== "true";
      this.shortEl.hidden = this.getAttribute("show-shortcuts") !== "true";
      this.sync();
    }
    items(){ return [].slice.call(this.querySelectorAll("cds-sponsor-category")); }
    select(it){
      [].forEach.call(this.querySelectorAll("cds-sponsor-category[selected], cds-sponsor-subcategory[selected]"), function(x){ x.removeAttribute("selected"); });
      it.setAttribute("selected", "");
      var parent = it.closest("cds-sponsor-category"); if (parent && parent !== it) parent.setAttribute("selected", ""); // categoria do subitem
      this.dispatchEvent(new CustomEvent("cds-select", { detail: { item: it }, bubbles: true }));
    }
    sync(){
      var reduced = this.collapsed && !this._peek;
      CDS.attr(this, "peek", this.collapsed && this._peek ? "" : null);
      this.items().forEach(function(x){ CDS.attr(x, "kind", reduced ? "reduced" : null); });
      CDS.attr(this.brandEl, "show-typography", reduced ? "false" : null); // Figma: expandido com a tipografia, colapsado só o símbolo
      [].forEach.call(this.querySelectorAll("cds-sponsor-user-profile"), function(x){ CDS.attr(x, "kind", reduced ? "reduced" : null); });
    }
  }
  CdsSponsorSideMenu.define("cds-sponsor-side-menu");
})();
