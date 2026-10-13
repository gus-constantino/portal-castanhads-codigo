/**
 * @deps icon text-content divider
 * <cds-accordion-item> — Accordion Item · Lists · set 24673:26248 (branch R7GDqtUKeNZZUg45M1llyr)
 * Description do Figma: mostra um título em uma linha e revela conteúdo adicional quando expandido; para conteúdo
 * extenso em seções abertas sob demanda (FAQ, detalhes de um pedido, formulários longos por tema).
 * Não usar para informação essencial, navegação (Link/Botão) ou alternância imediata (Switch).
 *
 * Anatomia: Container (Lead Item + .Text Content Highlight Label + ícone indicador) + Slot + Divider.
 *   Kind=Default: pad 8 4 0 4 · Container min 44, pad-right 12, gap 12 · Divider Soft · sem raio
 *   Kind=Card: pad 8 · raio large · stroke Border/semi-soft INSIDE · Container min 80, pad 0 16 · Slot pad 16 · sem Divider
 *   States: Hovered Surface/01 (Card Border/medium) · Pressed Neutral/Opacity/Intense/semi-transparent (Card Border/intense)
 *           Disabled Opacity/light (Card Border/medium)
 *   Ícone: dropdown-close-line sempre, no frame Icon de 24, girado 180° quando recolhido (ajuste do Figma em 13/10; antes trocava o glifo, C79)
 *
 * Web: o cabeçalho é um <button aria-expanded aria-controls> e o conteúdo um role="region" (padrão Accordion do WAI-ARIA).
 * O Figma pinta o item inteiro no hover/press; aqui o alvo é o cabeçalho e a cor continua no item todo.
 *
 * Atributos: kind (default|card) · collapsed (Is Collapsed; o padrão do Figma é aberto) · disabled · state (forçado: hovered|pressed)
 *   label ("Label") · description ("Description") · show-description · show-lead-item · lead-icon (placeholder-line)
 *   show-divider (só Kind=Default) · heading-level (1–6: envolve o botão num heading; sem ele, só o botão)
 * Os filhos vão para o Slot. Evento: cds-toggle { collapsed } (cancelável).
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsAccordionItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","collapsed","disabled","state","label","description","show-description","show-lead-item","lead-icon","show-divider","heading-level"]; }
    get collapsed(){ return this.hasAttribute("collapsed"); }
    set collapsed(v){ CDS.attr(this, "collapsed", !!v); }
    toggle(force){
      if (this.hasAttribute("disabled")) return;
      var next = force == null ? !this.collapsed : !!force;
      if (next === this.collapsed) return;
      var ev = new CustomEvent("cds-toggle", { detail: { collapsed: next }, bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      this.collapsed = next;
    }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        var kids = [].slice.call(this.childNodes), id = "cds-acc-" + (++uid);
        this.innerHTML = "";
        var root = this.rootEl = this.appendChild(CDS.create("div", null, "cds-acc"));
        this.headWrap = root.appendChild(CDS.create("div", null, "cds-acc__heading"));
        var btn = this.btn = this.headWrap.appendChild(CDS.create("button", { type: "button", id: id + "-h", "aria-controls": id + "-p" }, "cds-acc__head"));
        this.leadEl = btn.appendChild(CDS.create("cds-icon", { size: "medium", appearance: "neutral" }, "cds-acc__lead"));
        this.textEl = btn.appendChild(CDS.create("cds-text-content", { kind: "highlight-label" }, "cds-acc__text"));
        this.chevEl = btn.appendChild(CDS.create("cds-icon", { size: "large", appearance: "neutral" }, "cds-acc__chev"));
        var panel = this.panel = root.appendChild(CDS.create("div", { id: id + "-p", role: "region", "aria-labelledby": id + "-h" }, "cds-acc__panel"));
        var slot = this.slotEl = panel.appendChild(CDS.create("div", null, "cds-acc__inner")).appendChild(CDS.create("div", null, "cds-acc__slot"));
        kids.forEach(function(k){ slot.appendChild(k); });
        this.divEl = root.appendChild(CDS.create("cds-divider", { intensity: "soft" }, "cds-acc__divider"));
        btn.addEventListener("click", function(){ self.toggle(); });
      }
      var card = this.getAttribute("kind") === "card", open = !this.collapsed, dis = this.hasAttribute("disabled");
      CDS.attr(this, "kind", card ? "card" : null);
      CDS.attr(this.btn, "aria-expanded", String(open));
      CDS.attr(this.btn, "aria-disabled", dis ? "true" : null);
      // recolhido: fora da árvore de acessibilidade e do Tab (inert), mas no DOM para animar a altura
      this.panel.inert = !open;
      var lvl = parseInt(this.getAttribute("heading-level"), 10);
      CDS.attr(this.headWrap, "role", lvl >= 1 && lvl <= 6 ? "heading" : null);
      CDS.attr(this.headWrap, "aria-level", lvl >= 1 && lvl <= 6 ? String(lvl) : null);
      this.leadEl.hidden = !this.flag("show-lead-item");
      CDS.attr(this.leadEl, "icon", this.getAttribute("lead-icon") || "placeholder-line");
      CDS.attr(this.chevEl, "icon", "dropdown-close-line"); // o giro de 180° recolhido fica no CSS, para animar junto com o Slot
      CDS.attr(this.textEl, "label", this.text("label", "Label"));
      CDS.attr(this.textEl, "description", this.text("description", "Description"));
      CDS.attr(this.textEl, "show-description", this.flag("show-description") ? null : "false");
      this.divEl.hidden = card || !this.flag("show-divider");
    }
  }
  CdsAccordionItem.define("cds-accordion-item");
})();
