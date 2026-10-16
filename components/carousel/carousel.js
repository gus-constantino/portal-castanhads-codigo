/**
 * @deps nav-control banner
 * <cds-carousel> — Carousel · Navigation · componente 21215:242
 * Description do Figma: organiza de 3 a 10 itens em sequência horizontal, um por vez, com pré-visualização parcial do
 * próximo. Navegação por swipe no mobile e pelas setas do Nav Control no desktop, com avanço circular do último ao primeiro.
 * O swipe não aciona o item sob o dedo: componentes com estado próprio, como o Banner, só disparam em toque sem deslocamento.
 * O slot Content recebe Banner e Card como valores preferidos e aceita outros componentes. O item mantém a própria largura:
 * o carrossel não o estica. Sempre acompanhado de Nav Control. Abaixo de 3 itens, não se usa carrossel.
 *
 * Anatomia (vertical · gap Sizes/16): .Content Slot (horizontal · gap Specific/Carousel/gap: 8 no mobile, 16 no tablet e no
 *   desktop · Fill) + Nav Control (Fill; a instância é exposta: Appearance vem do carrossel).
 * Web: o slot é uma faixa com rolagem horizontal e scroll-snap (o swipe é a rolagem nativa, que não dispara clique ao
 *   arrastar). As setas e a rolagem mantêm o Nav Control e o slot em sincronia.
 *
 * Atributos: appearance (accent | inversed · do Nav Control) · current (1-based, como o Nav Control; no castanha-react,
 *   activeIndex/defaultActiveIndex começam em 0) · prev-label ("Item anterior") · next-label ("Próximo item") · label
 *   (nome da região, "Carrossel") · viewport (repassado ao Nav Control)
 * Filhos: os itens (até 10). Sem filhos, a amostra: 4 Banners com o conteúdo padrão do Figma.
 * Evento: cds-change { current } a cada troca de item.
 */
(function(){
  "use strict";
  class CdsCarousel extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "current", "prev-label", "next-label", "label", "viewport"]; }
    get items(){ return this.slotEl ? [].slice.call(this.slotEl.children) : []; }
    get current(){ var n = this.items.length || 1, c = parseInt(this.getAttribute("current"), 10) || 1; return Math.min(Math.max(1, c), n); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        var kids = [].slice.call(this.childNodes).filter(function(k){ return k.nodeType === 1; });
        this.innerHTML = "";
        this.slotEl = this.appendChild(CDS.create("div", { role: "list" }, "cds-carousel__slot"));
        // Amostra: 4 Banners com o conteúdo padrão do Figma (só a ilustração muda, para ver a troca de item)
        if (!kids.length) kids = ["notificacoes/sino", "objetos/foguete", "objetos/presente-aberto", "objetos/trofeu"].map(function(ill){
          return CDS.create("cds-banner", { kind: "illustration", illustration: ill });
        });
        kids.slice(0, 10).forEach(function(k){ var li = CDS.create("div", { role: "listitem" }, "cds-carousel__item"); li.appendChild(k); self.slotEl.appendChild(li); });
        this.navEl = this.appendChild(CDS.create("cds-nav-control", {}));
        this.navEl.addEventListener("cds-change", function(e){ e.stopPropagation(); self.goTo(e.detail.current, true); });
        // Rolagem (swipe ou trackpad) → item mais próximo do início vira o atual
        var t; this.slotEl.addEventListener("scroll", function(){ clearTimeout(t); t = setTimeout(function(){ self.syncFromScroll(); }, 80); }, { passive: true });
      }
      var n = this.items.length;
      CDS.attr(this, "role", "region"); CDS.attr(this, "aria-roledescription", "carrossel"); CDS.attr(this, "aria-label", this.getAttribute("label") || "Carrossel");
      CDS.attr(this.navEl, "total", String(n));
      CDS.attr(this.navEl, "current", String(this.current));
      CDS.attr(this.navEl, "appearance", this.getAttribute("appearance") === "inversed" ? "inversed" : null);
      CDS.attr(this.navEl, "prev-label", this.getAttribute("prev-label") || "Item anterior");
      CDS.attr(this.navEl, "next-label", this.getAttribute("next-label") || "Próximo item");
      CDS.attr(this.navEl, "viewport", this.getAttribute("viewport"));
      this.items.forEach(function(li, i){ CDS.attr(li, "aria-label", (i + 1) + " de " + n); });
    }
    goTo(c, scroll){
      var n = this.items.length; if (!n) return;
      c = ((c - 1) % n + n) % n + 1;
      if (String(c) !== this.getAttribute("current")){ this.setAttribute("current", String(c)); this.dispatchEvent(new CustomEvent("cds-change", { detail: { current: c }, bubbles: true })); }
      if (scroll){
        var it = this.items[c - 1], s = this.slotEl;
        this._lock = Date.now() + 900; // a rolagem programada não volta a mexer no item atual enquanto anda (cliques rápidos nas setas)
        this.scrollToX(it.offsetLeft - s.offsetLeft);
      }
    }
    // Rolagem com o Motion Style do Notion da Motion: avançar no Selected In/04, voltar no Selected Out/05.
    // O scroll-snap sai durante a animação (ele puxaria cada quadro para o item mais próximo) e volta no fim
    scrollToX(to){
      var s = this.slotEl, from = s.scrollLeft, dist = to - from;
      if (this._raf) cancelAnimationFrame(this._raf);
      var m = CDS.motion(dist >= 0 ? "selected-in-04" : "selected-out-05");
      if (!dist || !m.ms || matchMedia("(prefers-reduced-motion: reduce)").matches){ s.scrollLeft = to; return; }
      var self = this, t0 = null;
      s.style.scrollSnapType = "none";
      this._lock = Date.now() + m.ms + 200;
      var step = function(now){
        if (t0 == null) t0 = now;
        var p = Math.min(1, (now - t0) / m.ms);
        s.scrollLeft = from + dist * m.ease(p);
        if (p < 1) self._raf = requestAnimationFrame(step);
        else { self._raf = null; s.style.scrollSnapType = ""; }
      };
      this._raf = requestAnimationFrame(step);
      // aba em segundo plano não roda requestAnimationFrame: garante a posição final e o scroll-snap de volta
      clearTimeout(this._rafSafety);
      this._rafSafety = setTimeout(function(){ if (self._raf && t0 == null){ cancelAnimationFrame(self._raf); self._raf = null; s.scrollLeft = to; s.style.scrollSnapType = ""; } }, m.ms + 100);
    }
    next(){ this.goTo(this.current + 1, true); } prev(){ this.goTo(this.current - 1, true); }
    syncFromScroll(){
      if (this._lock && Date.now() < this._lock) return;
      var s = this.slotEl, best = 1, d = Infinity;
      this.items.forEach(function(it, i){ var x = Math.abs(it.offsetLeft - s.offsetLeft - s.scrollLeft); if (x < d){ d = x; best = i + 1; } });
      // no fim da faixa o último item pode não chegar ao início: vale o último
      if (s.scrollLeft + s.clientWidth >= s.scrollWidth - 2) best = this.items.length;
      this.goTo(best, false);
    }
  }
  CdsCarousel.define("cds-carousel");
})();
