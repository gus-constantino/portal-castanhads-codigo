/**
 * @deps scrollable-tab tab-item text-input async-creatable-select-input main-button filter-button
 * <cds-sponsor-toolbar> — Toolbar · [CastanhaDS] Sponsor Templates (componente 5585:2, sem description nem props no Figma)
 *
 * Anatomia (lida no Figma, 1158×120, largura fixa no template; aqui ocupa a largura do container):
 *   coluna, gap 24
 *   Scrollable Tab (largura fixa 320, Active Item 1)
 *   Filter Controls (preenche, linha, gap 58, itens ao centro)
 *     Search Fields (preenche e cresce, gap 20): Text Input e Async creatable Select Input (preenchem e crescem;
 *       Show Label false, Show Supporting Content false, Lead Icon placeholder-line)
 *     Action Controls (conteúdo, gap 12): 2 Main Buttons (Default · Neutral · Medium, Lead Icon, sem Trailing) e Filter button
 *
 * Atributos: active-item (aba ativa · 1) · search-placeholder · select-placeholder · first-action · second-action ("Label")
 *   show-tabs · show-search · show-select · show-actions · filter-active · filter-count
 * Filhos <cds-tab-item> substituem as abas da amostra. Referências: tabsEl · searchEl · selectEl · actionBtns · filterBtn
 * Eventos dos componentes de dentro (cds-change das abas e dos campos, click dos botões) sobem normalmente.
 */
(function(){
  "use strict";
  class CdsSponsorToolbar extends CDS.Element {
    static get observedAttributes(){ return ["active-item","search-placeholder","select-placeholder","first-action","second-action","show-tabs","show-search","show-select","show-actions","filter-active","filter-count"]; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        var tabs = [].slice.call(this.querySelectorAll(":scope > cds-tab-item"));
        this.innerHTML = "";
        this.tabsEl = this.appendChild(c("cds-scrollable-tab", { label: "Abas" }, "cds-sptb__tabs"));
        tabs.forEach(function(t){ self.tabsEl.appendChild(t); });
        var row = this.appendChild(c("div", null, "cds-sptb__filters"));
        var search = row.appendChild(c("div", null, "cds-sptb__search"));
        var field = { "show-label": "false", "show-supporting-content": "false", "lead-icon": "placeholder-line" };
        this.searchEl = search.appendChild(c("cds-text-input", Object.assign({ label: "Buscar" }, field)));
        this.selectEl = search.appendChild(c("cds-async-creatable-select-input", Object.assign({ label: "Selecionar" }, field)));
        var acts = this.actionsEl = row.appendChild(c("div", null, "cds-sptb__actions"));
        this.actionBtns = [0, 1].map(function(){ return acts.appendChild(c("cds-main-button", { kind: "default", appearance: "neutral", size: "medium", "lead-icon": "placeholder-line", "show-trailing-icon": "false" })); });
        this.filterBtn = acts.appendChild(c("cds-filter-button"));
      }
      var on = function(n){ return self.getAttribute(n) !== "false"; };
      CDS.attr(this.tabsEl, "active-item", this.getAttribute("active-item") || "1");
      this.tabsEl.hidden = !on("show-tabs");
      this.searchEl.hidden = !on("show-search");
      this.selectEl.hidden = !on("show-select");
      this.actionsEl.hidden = !on("show-actions");
      CDS.attr(this.searchEl, "placeholder", this.getAttribute("search-placeholder") || null);
      CDS.attr(this.selectEl, "placeholder", this.getAttribute("select-placeholder") || null);
      CDS.attr(this.actionBtns[0], "label", this.getAttribute("first-action") || "Label");
      CDS.attr(this.actionBtns[1], "label", this.getAttribute("second-action") || "Label");
      CDS.attr(this.filterBtn, "active", this.hasAttribute("filter-active") ? "" : null);
      CDS.attr(this.filterBtn, "count", this.getAttribute("filter-count") || null);
    }
  }
  CdsSponsorToolbar.define("cds-sponsor-toolbar");
})();
