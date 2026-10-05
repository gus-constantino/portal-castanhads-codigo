/**
 * <cmp-thumbnail> — Miniatura viva de um componente · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * O playground real do componente (o mesmo mount() da página) montado dentro da caixa e reduzido para caber.
 * Nunca amplia; reduz até min-scale e, se ainda sobrar (Table, Drawer, listas), corta ancorado no topo/início
 * com fade na borda cortada. A superfície que o playground escolhe (kit.surface) vira o fundo da caixa.
 * Usada no card do preview no hover do menu e nos cards do menu em grade. Quem usa define o tamanho da caixa.
 *
 * Atributos:
 *   component  id do playground (CDS.register) · sem valor ou id desconhecido = caixa vazia
 *   min-scale  menor escala antes de cortar (padrão 0.5)
 *   lazy       "true": monta só quando a caixa aparece na tela e desmonta quando sai (listas com muitas miniaturas)
 * Métodos: mount() · unmount() · fit()  (sem lazy, monta ao conectar e ao trocar component)
 * Referências: previewEl (o preview montado; null quando desmontado)
 * A11y: aria-hidden e inert: é imagem decorativa, sem foco nem clique dentro; o nome fica com quem usa.
 */
(function(){
  "use strict";
  var io = null, ro = window.ResizeObserver ? new ResizeObserver(function(es){
    es.forEach(function(e){ var t = e.target.closest("cmp-thumbnail"); if (t) t.fit(); });
  }) : null;
  function lazyIO(){
    if (io || !window.IntersectionObserver) return io;
    io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) e.target.mount(); else e.target.unmount(); }); });
    return io;
  }
  class CmpThumbnail extends CDS.Element {
    static get observedAttributes(){ return ["component", "min-scale", "lazy"]; }
    render(){
      this.setAttribute("aria-hidden", "true");
      this.inert = true;
      var lazy = this.getAttribute("lazy") === "true" && lazyIO();
      if (this._comp !== this.getAttribute("component")){ this._comp = this.getAttribute("component"); if (this.previewEl) this.unmount(); }
      if (lazy){ if (!this._io){ this._io = true; io.observe(this); } }
      else if (!this.previewEl) this.mount();
      else this.fit();
    }
    disconnectedCallback(){ if (this._io && io){ io.unobserve(this); this._io = false; } this.unmount(); }
    def(){ var id = this.getAttribute("component"); return (CDS.playgrounds || []).filter(function(c){ return c.id === id; })[0]; }
    mount(){
      var c = this.def(), self = this;
      if (this.previewEl) return;
      this.innerHTML = ""; this.style.background = ""; this.classList.remove("is-dark", "is-cut-x", "is-cut-y");
      if (!c || !c.mount) return;
      this.dataset.viewport = c.viewport || "desktop"; // componente só de um viewport (Bottom Sheet: mobile) aparece nele
      var prev = this.previewEl = CDS.create("div", null, "cmp-thumbnail__preview");
      prev.addEventListener("load", function(){ self.fit(); }, true); // imagem/ilustração que chega depois muda o tamanho
      this.appendChild(prev);
      try { c.mount({ preview: prev, panel: document.createElement("div"), kit: CDS.kit, readout: function(){} }); }
      catch (e){ prev.innerHTML = ""; }
      [].forEach.call(prev.querySelectorAll("img[loading=lazy]"), function(i){ i.loading = "eager"; }); // lazy não carrega dentro do recorte
      this.fit();
      if (ro){ ro.observe(this); ro.observe(prev); }
    }
    unmount(){
      if (!this.previewEl) return;
      if (ro){ ro.unobserve(this); ro.unobserve(this.previewEl); }
      this.innerHTML = ""; this.previewEl = null; // nada do preview fica no documento
    }
    fit(){
      var prev = this.previewEl; if (!prev) return;
      prev.style.transform = "none";
      var pr = prev.getBoundingClientRect(), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      [].forEach.call(prev.children, function(n){
        var r = n.getBoundingClientRect(); if (!r.width || !r.height) return; // overlays fechados ficam de fora
        x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
      });
      if (x1 < x0) return;
      var minK = parseFloat(this.getAttribute("min-scale")); if (!(minK > 0)) minK = 0.5;
      var sw = this.clientWidth, sh = this.clientHeight, pad = Math.min(16, sw / 10), w = x1 - x0, h = y1 - y0;
      var k = Math.max(Math.min(1, (sw - 2 * pad) / w, (sh - 2 * pad) / h), Math.min(1, minK));
      var cutX = w * k > sw - 2 * pad, cutY = h * k > sh - 2 * pad;
      var tx = cutX ? pad - (x0 - pr.left) * k : sw / 2 - (x0 - pr.left + w / 2) * k;
      var ty = cutY ? pad - (y0 - pr.top) * k : sh / 2 - (y0 - pr.top + h / 2) * k;
      prev.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + k + ")";
      this.classList.toggle("is-cut-x", cutX); this.classList.toggle("is-cut-y", cutY);
    }
  }
  CmpThumbnail.define("cmp-thumbnail");
})();
