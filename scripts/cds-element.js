/**
 * CDS.Element — classe base dos custom elements do Castanha DS (light DOM).
 *
 *   class CdsTag extends CDS.Element {
 *     static get observedAttributes(){ return ["label", "icon"]; }
 *     render(){ … this.flag("show-lead-item") … this.text("label", "Tag") … }
 *   }
 *   CdsTag.define("cds-tag");
 *
 * Contrato (ver docs/ARCHITECTURE.md §3):
 *   - connectedCallback → render(); attributeChangedCallback → render() quando conectado.
 *     Componentes com estado (inputs) sobrescrevem attributeChangedCallback.
 *   - flag(name): booleans do Figma ligados por padrão — só "false" desliga.
 *   - text(name, fallback): atributo de texto com o padrão do Figma (string vazia é válida).
 *   - a11yName(label): com label → role="img" + aria-label; sem → aria-hidden (decorativo).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};

  class CdsElement extends HTMLElement {
    connectedCallback(){ this.render(); }
    attributeChangedCallback(){ if (this.isConnected) this.render(); }
    render(){}
    flag(name){ return this.getAttribute(name) !== "false"; }
    text(name, fallback){ return this.hasAttribute(name) ? this.getAttribute(name) : fallback; }
    a11yName(label){
      if (label){ this.setAttribute("role", "img"); this.setAttribute("aria-label", label); this.removeAttribute("aria-hidden"); }
      else { this.removeAttribute("role"); this.removeAttribute("aria-label"); this.setAttribute("aria-hidden", "true"); }
    }
    static define(tag){ if (!customElements.get(tag)) customElements.define(tag, this); return this; }
  }

  /** Cria um elemento com atributos (string vazia = boolean ligado; null/false = omitido). */
  CDS.create = function(tag, attrs, cls){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) Object.keys(attrs).forEach(function(k){ var v = attrs[k]; if (v != null && v !== false) n.setAttribute(k, v === true ? "" : v); });
    return n;
  };

  /**
   * Posiciona um elemento flutuante (position:fixed) junto de uma âncora.
   * placement: "top" | "bottom" | "bottom-start" | "bottom-end" · gap em px (padrão 8).
   * Vira para o outro lado se não couber e nunca sai da janela (margem de 8px). Usado por Tooltip, Popover e Selects.
   */
  CDS.position = function(anchor, el, opts){
    opts = opts || {};
    var gap = opts.gap == null ? 8 : opts.gap, pad = 8, place = opts.placement || "bottom-start";
    var r = anchor.getBoundingClientRect(), me = el.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var top = /^top/.test(place) ? r.top - me.height - gap : r.bottom + gap;
    if (/^bottom/.test(place) && top + me.height > vh - pad && r.top - me.height - gap >= pad) top = r.top - me.height - gap;
    if (/^top/.test(place) && top < pad) top = r.bottom + gap;
    var left = /-end$/.test(place) ? r.right - me.width : /-start$/.test(place) ? r.left : r.left + r.width / 2 - me.width / 2;
    left = Math.min(Math.max(pad, left), vw - me.width - pad);
    el.style.position = "fixed"; el.style.margin = "0";
    el.style.left = Math.round(left) + "px"; el.style.top = Math.round(Math.max(pad, top)) + "px";
  };

  /** setAttribute só quando o valor muda (null remove). Mesmo valor também dispara attributeChangedCallback,
   *  e um filho pode re-renderizar com estado velho no meio da atualização do pai. */
  CDS.attr = function(el, name, val){
    if (val == null || val === false){ if (el.hasAttribute(name)) el.removeAttribute(name); return; }
    val = val === true ? "" : String(val);
    if (el.getAttribute(name) !== val) el.setAttribute(name, val);
  };
  /** Ilustração do [Caju] Illustrations → URL. Aceita "<categoria>/<nome>" ou só "<nome>" (a primeira categoria que tiver).
   *  Sem manifest (ou nome desconhecido), cai em assets/illustrations/<valor>.svg. */
  CDS.illustration = function(name){
    var list = (window.CDS.assets || {}).illustrations || [], n = String(name || "");
    var hit = list.filter(function(i){ return i.name === n; })[0] || list.filter(function(i){ return i.label === n; })[0];
    return hit ? hit.src : "assets/illustrations/" + n.split("/").map(encodeURIComponent).join("/") + ".svg";
  };
  /** Toca de novo a animação de CSS presa à classe `cls` (tira, força o reflow, põe) e tira a classe quando ela termina.
   *  Usado nos pulsos do Pressed (Main Button, Icon Button, Switch) e da seleção (Checkbox). */
  CDS.replay = function(el, cls){
    if (!el) return;
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
    el.addEventListener("animationend", function done(e){
      if (e.target !== el) return;
      el.classList.remove(cls); el.removeEventListener("animationend", done);
    });
  };
  /** Espera as animações de CSS do elemento terminarem (ou nenhuma, com reduced motion) e chama done uma vez. */
  CDS.afterAnimations = function(el, done){
    var called = false, finish = function(){ if (!called){ called = true; done(); } };
    var anims = el.getAnimations ? el.getAnimations() : [];
    if (!anims.length) return finish();
    Promise.all(anims.map(function(a){ return a.finished.catch(function(){}); })).then(finish);
    setTimeout(finish, 2000); // rede de segurança: nada fica preso se uma animação for cancelada sem aviso
  };
  /** Motion Style (ex.: "selected-in-04") → { ms, ease(x) } lidos dos tokens, para animações feitas em JS. */
  CDS.motion = function(name){
    var cs = getComputedStyle(document.documentElement);
    var t = cs.getPropertyValue("--motion-" + name + "-timing").trim(), e = cs.getPropertyValue("--motion-" + name + "-easing").trim();
    var ms = parseFloat(t) * (/ms$/.test(t) ? 1 : 1000) || 0;
    var m = e.match(/cubic-bezier\(([^)]+)\)/), p = m ? m[1].split(",").map(parseFloat) : [0, 0, 1, 1];
    return { ms: ms, ease: CDS.bezier(p[0], p[1], p[2], p[3]) };
  };
  /** Curva cubic-bezier(x1, y1, x2, y2) como função do progresso (0–1), como a do CSS. */
  CDS.bezier = function(x1, y1, x2, y2){
    function at(a1, a2, t){ return 3 * a1 * t * (1 - t) * (1 - t) + 3 * a2 * t * t * (1 - t) + t * t * t; }
    return function(x){
      if (x <= 0) return 0; if (x >= 1) return 1;
      var lo = 0, hi = 1, t = x;
      for (var i = 0; i < 24; i++){ var v = at(x1, x2, t); if (Math.abs(v - x) < 1e-5) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
      return at(y1, y2, t);
    };
  };
  CDS.Element = CdsElement;
})();
