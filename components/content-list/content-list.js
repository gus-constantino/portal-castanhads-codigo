/**
 * @deps content-list-item
 * <cds-content-list> — Content List · Lists · set 5488:1482 (Kind × Intent)
 * Pilha de Content List Items. Kind=Default: sem gap, itens com Show Divider desligado · Kind=Card: gap 8.
 * Intent da lista → Intent dos itens: Default → Default (Show Trailing Item desligado) · Navigation → Navigation ·
 *   Switch → Transaction (como no Figma, C54).
 * Uso: filhos <cds-content-list-item> (a lista repassa kind e intent) ou nada (amostra: 12 itens).
 * Atributos: kind (default|card) · intent (default|switch|navigation) · label (nome da lista) · count (itens da amostra · 12)
 *   reorderable — lista reordenável (CDS-1592): liga o Show Drag Handle dos itens. Pela alça: arrastar (mouse ou toque) levanta o item
 *     (State=Dragged) e a lista abre o espaço no índice sob o cursor. Sem arrastar (WCAG 2.5.7): foco na alça, Espaço ou Enter levanta,
 *     setas movem, Espaço ou Enter solta, Esc cancela. A posição nova é anunciada (aria-live), contando a partir de 1.
 * Eventos: cds-reorder { from, to, item } (índices a partir de 0)
 */
(function(){
  "use strict";
  var INTENT = { "default": "default", "navigation": "navigation", "switch": "transaction" };
  class CdsContentList extends CDS.Element {
    static get observedAttributes(){ return ["kind", "intent", "label", "count", "reorderable"]; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-content-list-item")); }
    render(){
      if (!this._built){
        this._built = true; this.setAttribute("role", "list");
        if (!this.items.length){ this._sample = true; }
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : "default", li = this.getAttribute("intent"), it = INTENT[li] || "default";
      if (this._sample){
        var n = Math.max(1, parseInt(this.getAttribute("count"), 10) || 12);
        while (this.items.length < n) this.appendChild(CDS.create("cds-content-list-item"));
        while (this.items.length > n) this.items[this.items.length - 1].remove();
      }
      CDS.attr(this, "aria-label", this.getAttribute("label"));
      this.items.forEach(function(c){
        CDS.attr(c, "role", "listitem");
        CDS.attr(c, "kind", kind === "card" ? "card" : null);
        CDS.attr(c, "intent", it === "default" ? null : it);
        CDS.attr(c, "show-divider", kind === "card" ? null : "false");  // como nas instâncias do Figma
        if (it === "default") CDS.attr(c, "show-trailing-item", "false");
      });
      this.setupReorder();
    }

    /* ---------- Reordenar (CDS-1592) ---------- */
    get reorderable(){ var v = this.getAttribute("reorderable"); return v != null && v !== "false"; }
    setupReorder(){
      var on = this.reorderable, self = this;
      this.items.forEach(function(c){ CDS.attr(c, "show-drag-handle", on ? "true" : null); });
      if (!on || this._reorder) return;
      this._reorder = true;
      this.liveEl = this.appendChild(CDS.create("span", { "aria-live": "assertive" }, "cds-cl__live"));
      this.helpEl = this.appendChild(CDS.create("span", { id: "cds-cl-help-" + (++CdsContentList.uid), hidden: "" }, "cds-cl__help"));
      this.helpEl.textContent = "Espaço para levantar, setas para mover, Espaço para soltar e Esc para cancelar.";
      this.addEventListener("pointerdown", function(e){ var h = self.handleOf(e.target); if (h && e.button === 0) self.pointerStart(e, h); });
      this.addEventListener("keydown", function(e){ var h = self.handleOf(e.target); if (h && e.target === h) self.keyHandle(e, h); });
      this.addEventListener("focusin", function(e){ var h = self.handleOf(e.target); if (h) CDS.attr(h, "aria-describedby", self.helpEl.id); });
    }
    handleOf(t){
      if (!this.reorderable || !t || !t.closest) return null;
      var h = t.closest(".cds-li__drag"), it = h && h.closest("cds-content-list-item");
      return it && it.parentNode === this && !it.hasAttribute("disabled") ? h : null;
    }
    itemOf(h){ return h.closest("cds-content-list-item"); }
    nameOf(it){ return it.getAttribute("label") || "Label"; }
    say(t){ var l = this.liveEl; l.textContent = ""; setTimeout(function(){ l.textContent = t; }, 50); }
    posText(it){ var all = this.items; return "posição " + (all.indexOf(it) + 1) + " de " + all.length; }
    lift(it){ this._prevState = it.getAttribute("state"); CDS.attr(it, "state", "dragged"); }
    drop(it){ CDS.attr(it, "state", this._prevState || null); }
    emit(it, from){
      var to = this.items.indexOf(it);
      if (to !== from) this.dispatchEvent(new CustomEvent("cds-reorder", { detail: { from: from, to: to, item: it }, bubbles: true }));
    }

    // Arrastar: o item segue o ponteiro; os vizinhos entre a origem e o destino se deslocam para abrir o espaço
    pointerStart(e, h){
      var self = this, it = this.itemOf(h), all = this.items, from = all.indexOf(it);
      e.preventDefault(); h.setPointerCapture(e.pointerId);
      this.lift(it); CDS.attr(this, "data-dragging", "");
      var rects = all.map(function(c){ return c.getBoundingClientRect(); }), me = rects[from];
      var step = me.height + (parseFloat(getComputedStyle(this).rowGap) || 0), y0 = e.clientY, to = from;
      function move(ev){
        var dy = ev.clientY - y0, mid = me.top + me.height / 2 + dy;
        it.style.transform = "translateY(" + dy + "px)";
        // destino = quantos vizinhos têm o centro acima do centro do item levantado
        to = 0; rects.forEach(function(r, i){ if (i !== from && r.top + r.height / 2 < mid) to++; });
        all.forEach(function(c, i){
          if (c === it) return;
          var s = (from < to && i > from && i <= to) ? -step : (from > to && i >= to && i < from) ? step : 0;
          c.style.transform = s ? "translateY(" + s + "px)" : "";
        });
      }
      function end(ev){
        h.removeEventListener("pointermove", move); h.removeEventListener("pointerup", end); h.removeEventListener("pointercancel", end);
        var cancel = ev.type === "pointercancel";
        all.forEach(function(c){ c.style.transform = ""; });
        self.removeAttribute("data-dragging");
        if (!cancel && to !== from){ var ref = self.items.filter(function(c){ return c !== it; })[to]; self.insertBefore(it, ref || self.liveEl); }
        self.drop(it);
        if (!cancel){ self.say(self.nameOf(it) + ", " + self.posText(it)); self.emit(it, from); }
      }
      h.addEventListener("pointermove", move); h.addEventListener("pointerup", end); h.addEventListener("pointercancel", end);
    }

    // Sem arrastar (WCAG 2.5.7)
    keyHandle(e, h){
      var it = this.itemOf(h), k = e.key, lifted = it.getAttribute("state") === "dragged";
      if (k === " " || k === "Enter"){
        e.preventDefault();
        if (!lifted){ this._from = this.items.indexOf(it); this.lift(it); this.say(this.nameOf(it) + " levantado, " + this.posText(it) + ". Use as setas para mover."); }
        else { this.drop(it); this.say(this.nameOf(it) + " solto na " + this.posText(it)); this.emit(it, this._from); }
      } else if (lifted && (k === "ArrowUp" || k === "ArrowDown")){
        e.preventDefault();
        var all = this.items, i = all.indexOf(it), j = k === "ArrowUp" ? i - 1 : i + 1;
        if (j < 0 || j >= all.length) return;
        this.insertBefore(it, k === "ArrowUp" ? all[j] : all[j].nextSibling);
        it.querySelector(".cds-li__drag").focus();
        this.say(this.nameOf(it) + ", " + this.posText(it));
      } else if (lifted && k === "Escape"){
        e.preventDefault();
        var rest = this.items.filter(function(c){ return c !== it; });
        this.insertBefore(it, rest[this._from] || this.liveEl);
        it.querySelector(".cds-li__drag").focus();
        this.drop(it); this.say("Cancelado. " + this.nameOf(it) + " voltou para a " + this.posText(it));
      }
    }
  }
  CdsContentList.uid = 0;
  CdsContentList.define("cds-content-list");
})();
