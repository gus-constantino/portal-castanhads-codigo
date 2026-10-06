/**
 * @deps icon badge
 * <cds-sponsor-category> — .Category · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: item de navegação do Side Menu. Intent=Default navega direto; Intent=Accordion abre subitens
 * (.Subcategory) no Slot. Appearance=Accent nos atalhos, Neutral nas categorias. Um item selecionado por vez.
 *
 * Anatomia (set 5576:27, 224×40): fundo Surface/01, raio Border/Radius/small · Navigation Content pad 4 8 4 4, gap 4
 *   Lead Icon 32×32 (raio extra-small; selecionado: fundo Surface/accent e ícone Icons/inversed) · Label (Label/Medium, Text/intense)
 *   Badge (Warning) · Expand Icon (Intent=Accordion: dropdown-open-line / dropdown-close-line)
 *   Kind=Reduced: 40×40, só o Lead Icon (menu colapsado)
 *   States: Hovered Neutral/Opacity/Intense/semi-transparent · Pressed Surface/default · Disabled opacidade 0.4 e Text/medium
 *
 * Atributos: label ("Category") · icon (placeholder-line) · kind (default|reduced) · intent (default|accordion)
 *   appearance (neutral|accent · ícone Icons/intense ou Icons/accent) · selected · disabled · state (forçado: hovered|pressed)
 *   show-badge · badge-label ("Novo") · href (Intent=Default vira link) · expanded (Intent=Accordion aberto; no Figma, Is Collapsed=True mostra o Slot, C176)
 * Filhos (Intent=Accordion): <cds-sponsor-subcategory> no Slot. Eventos: cds-toggle { expanded } · clique segue o href.
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsSponsorCategory extends CDS.Element {
    static get observedAttributes(){ return ["label","icon","kind","intent","appearance","selected","disabled","state","show-badge","badge-label","href","expanded"]; }
    get expanded(){ return this.hasAttribute("expanded"); }
    set expanded(v){ CDS.attr(this, "expanded", !!v); }
    toggle(force){
      if (this.hasAttribute("disabled") || this.getAttribute("intent") !== "accordion") return;
      var next = force == null ? !this.expanded : !!force;
      if (next === this.expanded) return;
      if (!this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { expanded: next }, bubbles: true, cancelable: true }))) return;
      this.expanded = next;
    }
    render(){
      var self = this, c = CDS.create;
      if (!this._built){
        this._built = true;
        var kids = [].slice.call(this.childNodes), id = "cds-spc-" + (++uid);
        this.innerHTML = "";
        this.rowEl = this.appendChild(c("a", { id: id + "-h" }, "cds-spc__row"));
        this.leadEl = this.rowEl.appendChild(c("span", null, "cds-spc__lead"));
        this.iconEl = this.leadEl.appendChild(c("cds-icon", { size: "large", "aria-hidden": "true" }));
        this.labelEl = this.rowEl.appendChild(c("span", null, "cds-spc__label"));
        this.badgeEl = this.rowEl.appendChild(c("cds-badge", { appearance: "warning" }, "cds-spc__badge"));
        this.chevEl = this.rowEl.appendChild(c("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-spc__chev"));
        this.slotEl = this.appendChild(c("div", { id: id + "-p", role: "group", "aria-labelledby": id + "-h" }, "cds-spc__slot"));
        kids.forEach(function(k){ self.slotEl.appendChild(k); });
        // subitens adicionados depois de montar também vão para o Slot
        new MutationObserver(function(ms){ ms.forEach(function(m){ [].forEach.call(m.addedNodes, function(n){ if (n.nodeType === 1 && n.tagName === "CDS-SPONSOR-SUBCATEGORY") self.slotEl.appendChild(n); }); }); }).observe(this, { childList: true });
        this.rowEl.addEventListener("click", function(e){
          if (self.hasAttribute("disabled")){ e.preventDefault(); return; }
          if (self.getAttribute("intent") === "accordion"){ e.preventDefault(); self.toggle(); }
        });
        this.rowEl.addEventListener("keydown", function(e){ if (e.key === " " && !self.rowEl.hasAttribute("href")){ e.preventDefault(); self.rowEl.click(); } });
      }
      var acc = this.getAttribute("intent") === "accordion", reduced = this.getAttribute("kind") === "reduced", sel = this.hasAttribute("selected"),
          dis = this.hasAttribute("disabled"), accent = this.getAttribute("appearance") === "accent", label = this.getAttribute("label") || "Category", href = this.getAttribute("href");
      this.labelEl.textContent = label;
      CDS.attr(this.iconEl, "icon", this.getAttribute("icon") || "placeholder-line");
      CDS.attr(this.iconEl, "appearance", sel ? "inversed" : accent ? "accent" : "neutral");
      this.badgeEl.hidden = this.getAttribute("show-badge") === "false";
      CDS.attr(this.badgeEl, "label", reduced ? "" : (this.getAttribute("badge-label") || "Novo"));
      CDS.attr(this.badgeEl, "viewport", reduced ? "mobile" : null); // Reduced: Badge de 16 sem texto (ponto)
      this.chevEl.hidden = !acc || reduced;
      CDS.attr(this.chevEl, "icon", this.expanded ? "dropdown-close-line" : "dropdown-open-line");
      this.slotEl.hidden = !acc || reduced || !this.expanded;
      // Link quando navega (Intent=Default com href); botão de abrir quando é accordion
      CDS.attr(this.rowEl, "href", !acc && href && !dis ? href : null);
      CDS.attr(this.rowEl, "role", acc || !href || dis ? "button" : null);
      CDS.attr(this.rowEl, "tabindex", acc || !href || dis ? "0" : null);
      CDS.attr(this.rowEl, "aria-expanded", acc ? String(this.expanded) : null);
      CDS.attr(this.rowEl, "aria-controls", acc ? this.slotEl.id : null);
      CDS.attr(this.rowEl, "aria-current", sel && !acc ? "page" : null);
      CDS.attr(this.rowEl, "aria-disabled", dis ? "true" : null);
      CDS.attr(this.rowEl, "aria-label", reduced ? label : null); // Reduced: só o ícone à mostra
      CDS.attr(this.rowEl, "title", reduced ? label : null);
    }
  }
  CdsSponsorCategory.define("cds-sponsor-category");
})();
