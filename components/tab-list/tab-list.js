/**
 * @deps tab-item
 * CDS.TabList — base de Fixed Tab e Scrollable Tab (não é um elemento registrado).
 * Padrão tablist do WAI-ARIA: foco itinerante (só a aba ativa entra no Tab), setas/Home/End movem e ativam.
 * Uso: filhos <cds-tab-item label="…"> (ou nada: as N abas "Label" da amostra do Figma).
 * Atributos: active-item (Active Item, 1-based · padrão 1) · label (nome da lista)
 * Evento: cds-change { index, item } (index 1-based, como o Active Item)
 * Membro define: get sampleCount
 */
(function(){
  "use strict";
  class TabList extends CDS.Element {
    static get observedAttributes(){ return ["active-item", "label"]; }
    get sampleCount(){ return 3; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-tab-item")); }
    get activeIndex(){ var n = parseInt(this.getAttribute("active-item"), 10) || 1; return Math.min(Math.max(1, n), Math.max(1, this.items.length)); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        this.setAttribute("role", "tablist"); // antes dos itens: eles leem o role para o foco itinerante
        if (!this.items.length) for (var i = 0; i < this.sampleCount; i++) this.appendChild(CDS.create("cds-tab-item"));
        // Abas escritas no HTML são registradas antes da lista e montam sem saber que estão nela (Badge ligado, D145):
        // agora que a lista existe, cada aba refaz a montagem
        this.items.forEach(function(it){ if (it.isConnected && it.render) it.render(); });
        this.addEventListener("click", function(e){ var it = e.target.closest("cds-tab-item"); if (it && it.parentElement === self && !it.hasAttribute("disabled")) self.select(self.items.indexOf(it) + 1, true); });
        this.addEventListener("keydown", function(e){ self.onKey(e); });
      }
      CDS.attr(this, "aria-label", this.getAttribute("label"));
      var a = this.activeIndex;
      this.items.forEach(function(it, i){ CDS.attr(it, "is-active", i + 1 === a ? "" : null); });
      this.afterRender(a);
    }
    afterRender(){}
    select(i, emit){
      if (i === this.activeIndex && this.hasAttribute("active-item")) return;
      this.setAttribute("active-item", String(i));
      var it = this.items[i - 1];
      if (emit) this.dispatchEvent(new CustomEvent("cds-change", { detail: { index: i, item: it }, bubbles: true }));
    }
    onKey(e){
      var items = this.items, n = items.length, cur = items.findIndex(function(it){ return it.contains(document.activeElement); });
      if (cur < 0) return;
      var next = { ArrowRight: cur + 1, ArrowLeft: cur - 1, Home: 0, End: n - 1 }[e.key];
      if (next == null) return;
      e.preventDefault();
      next = (next + n) % n;
      for (var k = 0; k < n && items[next].hasAttribute("disabled"); k++) next = (next + (e.key === "ArrowLeft" || e.key === "End" ? n - 1 : 1)) % n;
      this.select(next + 1, true);
      if (items[next].button) items[next].button.focus();
    }
  }
  CDS.TabList = TabList;
})();
