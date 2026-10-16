/**
 * @deps fab-button main-button
 * <cds-fab-menu> — FAB Menu · Buttons · set 27075:22460 (branch F1s1Tb3cDHYli4aN76QzCo · CDS-1694)
 * FAB que abre de 2 a 6 ações empilhadas acima dele, alinhadas à direita. Sem rolagem. O Backdrop fica fora do componente.
 * Ações: Main Button Default Neutral Medium com Elevation/level 1. Gatilho: .FAB Button (<cds-fab-button>).
 *
 * Atributos (padrões do Figma):
 *   active          Is Active — presente = aberto
 *   show-action-3   ligado por padrão ("false" esconde)
 *   show-action-4   desligado por padrão (presente liga) · idem show-action-5 e show-action-6
 *   actions         rótulos e ícones das ações, separados por vírgula: "Nova solicitação:file-line, Pagar com Pix:pix-line"
 *                   sem ícone usa placeholder-line · padrão "Ação 1" a "Ação 6"
 *   label           nome acessível do FAB · padrão "Mais ações"
 *   icon            Icon do FAB fechado · padrão "plus-line"
 *   appearance      appearance do FAB: accent | neutral | inversed · padrão accent
 *   disabled        desabilita o FAB
 *   fixed           flutua no canto inferior direito da viewport, a Common/Grids/margin das bordas (Mobile 20 · Tablet 16 · Desktop 104).
 *                   Acima de uma barra fixa no rodapé: --cds-fab-menu-offset com a altura da barra
 *   hide-on-scroll  esconde ao rolar para baixo e volta ao rolar para cima (fecha o menu ao esconder)
 *   scroll-target   id do elemento que rola · padrão a janela
 * Eventos: cds-toggle { active } ao abrir e fechar · cds-action { index, label } ao tocar numa ação (o menu fecha).
 * Teclado: o FAB expõe aria-haspopup="menu", aria-expanded e aria-controls. Aberto, o foco vai para a primeira ação;
 *   ↑ ↓ navegam, Home e End vão à primeira e à última, Esc fecha e devolve o foco ao FAB, Tab para fora fecha.
 * Esconder e mostrar ao rolar: Selected Out/05 e Selected In/04 (Y e opacidade, como o System Banner).
 * Motion: abrir com Selected In/01 (Y e escala 100 → 105 → 100%) e opacidade Hover In/01;
 *   fechar com Selected Out/01 e opacidade Hover Out/06 · ações e FAB herdam hover e press.
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsFabMenu extends CDS.Element {
    static get observedAttributes(){ return ["active", "show-action-3", "show-action-4", "show-action-5", "show-action-6", "actions", "label", "icon", "appearance", "disabled", "hide-on-scroll", "scroll-target"]; }
    attributeChangedCallback(name){
      if (!this.isConnected || !this._fab) return;
      if (name === "active") this._sync();
      else if (name === "hide-on-scroll" || name === "scroll-target") this._watchScroll();
      else this.render();
    }
    disconnectedCallback(){ this._unwatch(); }
    _unwatch(){ if (this._scroller){ this._scroller.removeEventListener("scroll", this._onScroll); this._scroller = null; } }
    // hide-on-scroll: some ao rolar para baixo e volta ao subir. Pequenos tremores (menos de Sizes/8) não contam.
    _watchScroll(){
      this._unwatch(); this.removeAttribute("scroll-hidden");
      if (!this.hasAttribute("hide-on-scroll")) return;
      var id = this.getAttribute("scroll-target"), el = id && (document.getElementById(id) || this.closest("[id=\"" + id + "\"]")), self = this;
      var target = el || window, pos = function(){ return el ? el.scrollTop : window.scrollY; }, last = pos();
      this._onScroll = function(){
        var y = pos(), d = y - last;
        if (Math.abs(d) < 8) return;
        last = y;
        if (d > 0 && y > 0){ if (self.active) self._toggle(false, false); self.setAttribute("scroll-hidden", ""); }
        else self.removeAttribute("scroll-hidden");
      };
      target.addEventListener("scroll", this._onScroll, { passive: true });
      this._scroller = target;
    }
    get active(){ return this.hasAttribute("active"); }
    set active(v){ this.toggleAttribute("active", !!v); }
    get fab(){ return this._fab; }
    _items(){
      var raw = this.getAttribute("actions"), list = raw ? raw.split(",").map(function(s){ return s.trim(); }).filter(Boolean) : [];
      var out = [];
      for (var i = 0; i < 6; i++){
        var part = (list[i] || "").split(":");
        out.push({ label: part[0] || ("Ação " + (i + 1)), icon: (part[1] || "").trim() || "placeholder-line" });
      }
      return out;
    }
    _shown(n){
      if (n <= 2) return true;
      if (n === 3) return this.flag("show-action-3");
      var v = this.getAttribute("show-action-" + n);
      return v != null && v !== "false";
    }
    render(){
      var self = this;
      if (!this._fab){
        this._id = "cds-fab-menu-" + (++uid);
        this._list = CDS.create("div", { role: "menu", id: this._id, hidden: true }, "cds-fab-menu__actions");
        this._fab = document.createElement("cds-fab-button");
        this.appendChild(this._list); this.appendChild(this._fab);
        this._fab.addEventListener("click", function(){ self._toggle(!self.active, true); });
        this._list.addEventListener("click", function(e){
          var mb = e.target.closest("cds-main-button"); if (!mb || !self._list.contains(mb)) return;
          var i = +mb.dataset.index;
          self.dispatchEvent(new CustomEvent("cds-action", { detail: { index: i, label: mb.getAttribute("label") }, bubbles: true }));
          self._toggle(false, true);
        });
        this.addEventListener("keydown", function(e){ self._key(e); });
        this.addEventListener("focusout", function(e){ if (self.active && e.relatedTarget && !self.contains(e.relatedTarget)) self._toggle(false, false); });
      }
      CDS.attr(this._fab, "icon", this.getAttribute("icon") || null);
      CDS.attr(this._fab, "appearance", this.getAttribute("appearance") || null);
      CDS.attr(this._fab, "disabled", this.hasAttribute("disabled"));
      CDS.attr(this._fab, "label", this.getAttribute("label") || "Mais ações");
      var items = this._items();
      this._list.innerHTML = "";
      items.forEach(function(it, i){
        if (!self._shown(i + 1)) return;
        var mb = CDS.create("cds-main-button", { kind: "default", appearance: "neutral", size: "medium", label: it.label, "lead-icon": it.icon, "show-trailing-icon": "false" });
        mb.dataset.index = i + 1;
        self._list.appendChild(mb);
        var b = mb.button; if (b){ b.setAttribute("role", "menuitem"); b.tabIndex = -1; }
      });
      this._sync();
      if (this._scroller === undefined || (this.hasAttribute("hide-on-scroll") && !this._scroller)) this._watchScroll();
    }
    _buttons(){ return Array.prototype.map.call(this._list.querySelectorAll("cds-main-button"), function(m){ return m.button; }).filter(Boolean); }
    // Is Active → ícone do FAB, aria-expanded e a lista (a saída espera a animação antes de esconder)
    _sync(){
      var on = this.active, fb = this._fab.button, list = this._list;
      CDS.attr(this._fab, "active", on);
      if (fb){ fb.setAttribute("aria-haspopup", "menu"); fb.setAttribute("aria-expanded", String(on)); fb.setAttribute("aria-controls", this._id); }
      list.classList.remove("is-opening", "is-closing");
      if (on){ list.hidden = false; if (this._animate) CDS.replay(list, "is-opening"); }
      else if (!list.hidden){
        if (!this._animate){ list.hidden = true; return; }
        list.classList.add("is-closing");
        var self = this;
        CDS.afterAnimations(list, function(){ if (!self.active){ list.hidden = true; list.classList.remove("is-closing"); } });
      }
      this._animate = false;
    }
    _toggle(on, moveFocus){
      if (on === this.active) return;
      this._animate = true;
      this.active = on;
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { active: on }, bubbles: true }));
      if (!moveFocus) return;
      var first = this._buttons()[0];
      if (on && first) first.focus(); else if (!on) this._fab.focus();
    }
    _key(e){
      if (!this.active) return;
      var bs = this._buttons(), i = bs.indexOf(document.activeElement);
      if (e.key === "Escape"){ e.preventDefault(); this._toggle(false, true); return; }
      if (i < 0 || !bs.length) return;
      var to = e.key === "ArrowDown" ? (i + 1) % bs.length : e.key === "ArrowUp" ? (i - 1 + bs.length) % bs.length
        : e.key === "Home" ? 0 : e.key === "End" ? bs.length - 1 : -1;
      if (to < 0) return;
      e.preventDefault(); bs[to].focus();
    }
  }
  CdsFabMenu.define("cds-fab-menu");
})();
