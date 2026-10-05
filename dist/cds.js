/* GERADO por scripts/build-index.js · 224 arquivos em ordem de dependência · não editar (o fonte é o arquivo de cada pasta) */
/* ==== components/backdrop/backdrop.js ==== */
try {
/**
 * @deps —
 * <cds-backdrop> — Backdrop · Containers · componente 13784:3271
 * Camada Surface/inversed com opacity medium (0.4) que separa um overlay da interface por baixo.
 * Cobre o pai posicionado (position:absolute; inset:0). Modal, Drawer e Bottom Sheet usam o mesmo visual no ::backdrop do <dialog>.
 */
(function(){
  "use strict";
  class CdsBackdrop extends CDS.Element { render(){ this.setAttribute("aria-hidden", "true"); } }
  CdsBackdrop.define("cds-backdrop");
})();
} catch (e) { console.error("[cds] components/backdrop/backdrop.js", e); }

/* ==== components/backdrop/backdrop.playground.js ==== */
try {
/* Playground — Backdrop */
CDS.register({
  id: "backdrop", name: "Backdrop", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13784-3271",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var box = kit.el("div", { style: "position:relative;width:300px;height:300px;max-width:100%;display:grid;place-items:center;border-radius:var(--common-border-radius-medium);overflow:hidden;background:var(--common-colors-decorative-01);font:var(--text-style-body-bold);color:var(--common-colors-text-intense)" }, ["Conteúdo da tela"]);
    var p = kit.el("cds-backdrop", {}); box.appendChild(p); ctx.preview.appendChild(box);
    kit.hint(panel, "Surface/inversed com Opacity/medium (0.4). Modal, Drawer e Bottom Sheet usam o mesmo visual no <code>::backdrop</code> do dialog; o Banner Image usa o elemento.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Mostrar", checked: true, onChange: function(on){ p.hidden = !on; } });
  }
});
} catch (e) { console.error("[cds] components/backdrop/backdrop.playground.js", e); }

/* ==== components/badge/badge.js ==== */
try {
/**
 * @deps —
 * <cds-badge> — Badge · Status · set 4835:1472
 * Indica notificações ou atualizações. No Mobile vira um ponto de 8px (collection Viewport).
 *
 * Atributos (padrões do Figma):
 *   label       número/texto · padrão "0"
 *   appearance  warning | neutral · padrão warning
 *   viewport    desktop | tablet | mobile — força o modo; sem ele, herda o [data-viewport] mais próximo
 */
(function(){
  "use strict";
  class CdsBadge extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._t){ this._t = document.createElement("span"); this.appendChild(this._t); }
      this._t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "0";
    }
  }
  CdsBadge.define("cds-badge");
})();
} catch (e) { console.error("[cds] components/badge/badge.js", e); }

/* ==== components/badge/badge.playground.js ==== */
try {
/* Playground — Badge */
CDS.register({
  id: "badge", name: "Badge", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4835-1472",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-badge", { label: "0", appearance: "warning" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "warning", options: [["warning","Warning"],["neutral","Neutral"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Viewport (collection Viewport · Specific/Badge)", value: "auto", options: [["auto","Herdar"],["desktop","Desktop"],["mobile","Mobile"]],
      hint: "<b>Herdar</b> segue o seletor de viewport do topo: 360 = Mobile (ponto de 8px).",
      onChange: function(v){ set("viewport", v === "auto" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "0", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/badge/badge.playground.js", e); }

/* ==== components/caju-brand/caju-brand.js ==== */
try {
/**
 * @deps —
 * <cds-caju-brand> — Caju Brand · Images · set 11271:154
 * Paths exportados do Figma. Cores de marca (folha, caju, tipografia) por Kind.
 *
 * Atributos (padrões do Figma):
 *   kind             default | inversed | full-red | full-white | full-black · padrão default
 *   show-typography  "false" mostra só o símbolo · padrão ligado
 *   label            nome acessível · padrão "Caju"
 */
(function(){
  "use strict";
  var LEAF = "M9.49941 5.35493C9.05674 5.3442 8.70126 4.98336 8.70126 4.53935C8.70126 4.09534 9.05674 3.7345 9.49941 3.72377C10.5269 3.72377 11.3613 2.88941 11.3613 1.86188C11.3613 0.83436 10.5283 0 9.49941 0C6.98425 0 4.9453 2.02285 4.9453 4.53801C4.9453 7.05316 6.98425 9.07601 9.49941 9.07601C10.5269 9.07601 11.3613 8.24299 11.3613 7.21413C11.3613 6.18526 10.5283 5.35225 9.49941 5.35225V5.35493Z";
  var FRUIT = "M17.542 12.0349C16.7493 10.4834 15.3798 9.85646 14.778 9.70303C13.3409 9.34062 12.6118 9.54034 11.7051 9.71097C11.2914 9.789 10.0599 10.3551 8.89196 10.3525C7.72403 10.3498 6.6847 9.78371 6.29628 9.71097C5.38951 9.54034 4.66038 9.34062 3.22335 9.70303C2.62149 9.85646 1.25206 10.4834 0.459304 12.0349C-0.634383 14.1749 0.467255 15.8759 1.25604 19.5766C1.7651 21.5567 1.67893 23.2642 2.89591 24.9188C4.11288 26.5735 5.91315 27.4425 8.78325 27.498C8.94233 27.5007 9.07623 27.5007 9.21675 27.498C12.0868 27.4425 13.8871 26.5735 15.1041 24.9188C16.3211 23.2642 16.2349 21.5567 16.744 19.5766C17.5327 15.8759 18.6344 14.1749 17.5407 12.0349H17.542Z";
  var TYPE = "M53.7589 20.1288V8.0685H48.5907V11.1159H49.9603V19.8189C49.9603 21.5233 49.2367 22.5563 47.9188 22.7371L47.9447 25.4487C48.2548 25.4745 48.5649 25.5004 48.9008 25.5004C51.8467 25.5004 53.7589 23.3827 53.7589 20.1288ZM68.2299 21.0326H64.5347V18.6051H64.2763C63.5785 20.2321 62.0022 21.2651 60.1158 21.2651C57.5834 21.2651 55.8521 19.3798 55.8521 16.4616V8.09433H59.6765V15.7643C59.6765 17.3397 60.5551 18.3468 62.0022 18.3468C63.4493 18.3468 64.4313 17.288 64.4313 15.661V8.09433H68.2299V21.0326ZM43.7584 21.0326V18.8633H43.5258C42.9573 20.3095 41.5102 21.2651 39.6755 21.2651C37.2981 21.2651 35.9027 19.6639 35.9027 17.5463C35.9027 15.7127 36.9622 14.3956 39.9081 13.8533L42.1046 13.4401C43.2157 13.2335 43.6292 12.8461 43.6292 12.1489C43.6292 11.2966 43.009 10.7801 41.7686 10.7801C40.4766 10.7801 39.753 11.3483 39.6755 12.4071L39.6497 12.717H36.0319L36.0578 12.4071C36.2903 9.618 38.4868 7.8619 42.0271 7.8619C45.6707 7.8619 47.4537 9.74713 47.4537 12.6395V21.0326H43.7584ZM43.6292 16.3841V15.0671C43.3191 15.2995 42.8281 15.5061 42.2596 15.6352L41.1226 15.9193C40.1148 16.1517 39.753 16.5907 39.753 17.288C39.753 18.2177 40.3991 18.7342 41.4844 18.7342C42.7506 18.7342 43.6292 18.0369 43.6292 16.3841ZM34.8174 16.3325H30.9412C30.8379 17.4171 29.9076 18.1661 28.6672 18.1661C26.9617 18.1661 25.8505 16.7457 25.8505 14.5506C25.8505 12.3555 26.9617 10.9609 28.6672 10.9609C29.8817 10.9609 30.7862 11.684 30.8895 12.717H34.7399C34.5073 9.74713 32.1041 7.83608 28.6414 7.83608C24.5585 7.83608 21.9744 10.5219 22.0002 14.6022C22.0002 18.6826 24.5585 21.2651 28.5897 21.2651C32.1041 21.2651 34.5848 19.3282 34.8174 16.3325ZM51.5883 6.7256C52.9837 6.7256 53.9398 5.77008 53.9398 4.34971C53.9398 2.95516 52.9837 1.99963 51.5883 1.99963C50.167 1.99963 49.2109 2.95516 49.2109 4.34971C49.2109 5.77008 50.167 6.7256 51.5883 6.7256Z";
  // [folha, caju, tipografia] por Kind — exatamente como no Figma
  var COLORS = {
    "default":    ["#ABE95E", "#FF7327", "#E80537"],
    "inversed":   ["#ABE95E", "#FF7327", "#FFFFFF"],
    "full-red":   ["#E80537", "#E80537", "#E80537"],
    "full-white": ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    "full-black": ["#000000", "#000000", "#000000"]
  };
  class CdsCajuBrand extends CDS.Element {
    static get observedAttributes(){ return ["kind", "show-typography", "label"]; }
    render(){
      var c = COLORS[this.getAttribute("kind")] || COLORS["default"];
      var typo = this.flag("show-typography");
      this.innerHTML = '<svg viewBox="0 0 ' + (typo ? 69 : 18) + ' 28" fill="none" aria-hidden="true" focusable="false">' +
        '<path d="' + LEAF + '" fill="' + c[0] + '"/>' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="' + FRUIT + '" fill="' + c[1] + '"/>' +
        (typo ? '<path d="' + TYPE + '" fill="' + c[2] + '"/>' : "") + '</svg>';
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.getAttribute("label") || "Caju");
    }
  }
  CdsCajuBrand.define("cds-caju-brand");
})();
} catch (e) { console.error("[cds] components/caju-brand/caju-brand.js", e); }

/* ==== components/caju-brand/caju-brand.playground.js ==== */
try {
/* Playground — Caju Brand */
CDS.register({
  id: "caju-brand", name: "Caju Brand", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11271-154",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-24);" });
    var p = kit.el("cds-caju-brand", { kind: "default" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    // Fundo sugerido pela description: atente-se à cor do fundo
    var BG = { "default": "", "inversed": "var(--common-colors-surface-inversed)", "full-red": "", "full-white": "var(--common-colors-surface-accent)", "full-black": "" };
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["inversed","Inversed"],["full-red","Full Red"],["full-white","Full White"],["full-black","Full Black"]],
      hint: "Inversed e Full White ganham fundo escuro/vermelho no preview, como pede a description.",
      onChange: function(v){ p.setAttribute("kind", v); kit.surface(ctx.preview, BG[v]); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Typography", checked: true, onChange: function(on){ kit.attr(p, "show-typography", on ? null : "false"); } });
  }
});
} catch (e) { console.error("[cds] components/caju-brand/caju-brand.playground.js", e); }

/* ==== components/calendar-day/calendar-day.js ==== */
try {
/**
 * @deps —
 * <cds-calendar-day> — .Day · .Building Blocks · set 17482:44817 (Role × State × Status · Is Current Day)
 * 40×40 · Value 24 (Label/Medium) · Current Day Status: ponto 4×4 Surface/accent (Support/lighter quando selecionado).
 * Role=Default (dia solto) · Start / Middle / End (intervalo): cantos arredondados só nas pontas.
 * Atributos: label (número · "30") · role-kind (default|start|middle|end — role é atributo global, como no Lote 3)
 *   selected · current (Is Current Day) · disabled · state="hovered|pressed" (specimen) · date-label (nome acessível)
 * É um <button>; o Date Picker cuida de tabindex, aria-selected e teclado.
 */
(function(){
  "use strict";
  class CdsCalendarDay extends CDS.Element {
    static get observedAttributes(){ return ["label","role-kind","selected","current","disabled","date-label"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button" }, "cds-day"));
        this.valEl = b.appendChild(CDS.create("span", null, "cds-day__value"));
        this.dotEl = b.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-day__dot"));
      }
      this.valEl.textContent = this.text("label", "30");
      this.dotEl.hidden = !this.hasAttribute("current");
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-pressed", null);
      CDS.attr(this.btn, "aria-label", this.getAttribute("date-label"));
      CDS.attr(this.btn, "aria-current", this.hasAttribute("current") ? "date" : null);
    }
  }
  CdsCalendarDay.define("cds-calendar-day");
})();
} catch (e) { console.error("[cds] components/calendar-day/calendar-day.js", e); }

/* ==== components/calendar-day/calendar-day.playground.js ==== */
try {
/* Playground — .Day (building block) */
CDS.register({
  id: "calendar-day", name: ".Day", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17482-44817",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-calendar-day", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Role", value: "default", options: [["default","Default"],["start","Start"],["middle","Middle"],["end","End"]], onChange: function(v){ kit.attr(p, "role-kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.seg(panel, { label: "Status", value: "unselected", options: [["unselected","Unselected"],["selected","Selected"]], onChange: function(v){ kit.attr(p, "selected", v === "selected"); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Is Current Day", checked: false, onChange: function(on){ kit.attr(p, "current", on); } });
  }
});
} catch (e) { console.error("[cds] components/calendar-day/calendar-day.playground.js", e); }

/* ==== components/calendar-week/calendar-week.js ==== */
try {
/**
 * @deps calendar-day
 * <cds-calendar-week> — .Week · .Building Blocks · componente 17465:280
 * Linha de 7 .Day (280 × 40, raio small). No Date Picker cada semana é uma linha da grade (role="row").
 * Sem filhos, renderiza a amostra do Figma (7 dias "30").
 */
(function(){
  "use strict";
  class CdsCalendarWeek extends CDS.Element {
    render(){
      if (!this._built){ this._built = true; if (!this.children.length && !this.hasAttribute("role")) for (var i = 0; i < 7; i++) this.appendChild(CDS.create("cds-calendar-day")); }
    }
  }
  CdsCalendarWeek.define("cds-calendar-week");
})();
} catch (e) { console.error("[cds] components/calendar-week/calendar-week.js", e); }

/* ==== components/calendar-week/calendar-week.playground.js ==== */
try {
/* Playground — .Week (building block) */
CDS.register({
  id: "calendar-week", name: ".Week", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-280",
  mount: function(ctx){ ctx.preview.appendChild(ctx.kit.el("cds-calendar-week", {})); ctx.kit.hint(ctx.panel, "7 .Day lado a lado. No Date Picker cada semana é uma linha da grade."); }
});
} catch (e) { console.error("[cds] components/calendar-week/calendar-week.playground.js", e); }

/* ==== components/card/card.js ==== */
try {
/**
 * @deps —
 * <cds-card> — Card · Containers · set 5256:540
 * Container com Slot: os filhos de quem usa são o conteúdo. Has Border liga o stroke Border/semi-soft.
 * Atributos: has-border ("true" liga · padrão False, como no Figma)
 */
(function(){
  "use strict";
  class CdsCard extends CDS.Element {
    static get observedAttributes(){ return ["has-border"]; }
    render(){
      if (!this._built){ this._built = true; var slot = CDS.create("div", null, "cds-card__slot"); while (this.firstChild) slot.appendChild(this.firstChild); this.appendChild(slot); this.slotEl = slot; }
    }
  }
  CdsCard.define("cds-card");
})();
} catch (e) { console.error("[cds] components/card/card.js", e); }

/* ==== components/card/card.playground.js ==== */
try {
/* Playground — Card */
CDS.register({
  id: "card", name: "Card", category: "Containers", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5256-540",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-card", { style: "width:254px" }, [
      kit.el("strong", { text: "Conteúdo do Slot", style: "font:var(--text-style-body-bold)" }),
      kit.el("span", { text: "O Card agrupa conteúdo relacionado; o Slot recebe qualquer composição.", style: "font:var(--text-style-caption-regular);color:var(--common-colors-text-medium)" })
    ]);
    var wrap = kit.el("div", { style: "padding:var(--common-sizes-24);background:var(--common-colors-surface-01);border-radius:var(--common-border-radius-medium)" }, [p]);
    ctx.preview.appendChild(wrap);
    kit.hint(panel, "O fundo cinza do preview é só para o Card aparecer; no Figma ele é Surface/default.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Has Border", value: "false", options: [["false","False"],["true","True"]], onChange: function(v){ kit.attr(p, "has-border", v === "true" ? "true" : null); } });
  }
});
} catch (e) { console.error("[cds] components/card/card.playground.js", e); }

/* ==== components/card-flag/card-flag.js ==== */
try {
/**
 * @deps —
 * <cds-card-flag> — .Credit Card Flags · Flags · set 4934:771 (building block)
 * Atributos: kind empty | elo | mastercard | visa · padrão empty
 * As bandeiras usam o SVG de marca reconstruído do Figma (assets/flags). Nome acessível = nome da bandeira.
 */
(function(){
  "use strict";
  var NAMES = { elo: "Elo", mastercard: "Mastercard", visa: "Visa" };
  class CdsCardFlag extends CDS.Element {
    static get observedAttributes(){ return ["kind"]; }
    render(){
      var k = this.getAttribute("kind");
      this.innerHTML = "";
      if (NAMES[k]){
        var img = document.createElement("img"); img.src = "assets/flags/" + k + ".svg"; img.alt = NAMES[k]; img.width = 40; img.height = 24;
        this.appendChild(img); this.removeAttribute("aria-hidden");
      } else this.setAttribute("aria-hidden", "true");
    }
  }
  CdsCardFlag.define("cds-card-flag");
})();
} catch (e) { console.error("[cds] components/card-flag/card-flag.js", e); }

/* ==== components/card-flag/card-flag.playground.js ==== */
try {
/* Playground — .Credit Card Flags */
CDS.register({
  id: "credit-card-flags", name: ".Credit Card Flags", category: "Flags", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4934-771",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-card-flag", { kind: "empty" });
    ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "empty", options: [["empty","Empty"],["elo","Elo"],["mastercard","Mastercard"],["visa","Visa"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.hint(panel, "Building block: simula qualquer cartão e pode simbolizar uma bandeira. As cores das bandeiras são de marca, não tokens.");
  }
});
} catch (e) { console.error("[cds] components/card-flag/card-flag.playground.js", e); }

/* ==== components/currency/currency.js ==== */
try {
/**
 * @deps —
 * <cds-currency> — Currency · Content · set 5301:2173
 *
 * Atributos (padrões do Figma):
 *   value       valor formatado · padrão "100,00"
 *   symbol      símbolo da moeda · padrão "R$"
 *   appearance  neutral | inversed · padrão neutral
 *   size        small | medium | large | largest · padrão small
 *   show-value  "false" mascara o valor com 5 pontos (o leitor de tela ouve "valor oculto")
 */
(function(){
  "use strict";
  class CdsCurrency extends CDS.Element {
    static get observedAttributes(){ return ["value", "symbol", "show-value"]; }
    render(){
      var symbol = this.getAttribute("symbol") || "R$", value = this.hasAttribute("value") ? this.getAttribute("value") : "100,00";
      var shown = this.flag("show-value");
      this.innerHTML = "";
      var s = document.createElement("span"); s.textContent = symbol; this.appendChild(s);
      if (shown){ var v = document.createElement("span"); v.textContent = value; this.appendChild(v); this.removeAttribute("aria-label"); this.removeAttribute("role"); }
      else {
        var d = document.createElement("span"); d.className = "cds-cur__dots"; d.setAttribute("aria-hidden", "true");
        for (var i = 0; i < 5; i++) d.appendChild(document.createElement("i"));
        this.appendChild(d);
        this.setAttribute("role", "img"); this.setAttribute("aria-label", symbol + " valor oculto");
      }
    }
  }
  CdsCurrency.define("cds-currency");
})();
} catch (e) { console.error("[cds] components/currency/currency.js", e); }

/* ==== components/currency/currency.playground.js ==== */
try {
/* Playground — Currency */
CDS.register({
  id: "currency", name: "Currency", category: "Content",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5301-2173",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16);" });
    var p = kit.el("cds-currency", { value: "100,00", symbol: "R$", appearance: "neutral", size: "small" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small"],["medium","Medium"],["large","Large"],["largest","Largest"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "Show Value", checked: true, onChange: function(on){ set("show-value", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Valor", value: "100,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.text(panel, { label: "Símbolo", value: "R$", onInput: function(v){ p.setAttribute("symbol", v); } });
  }
});
} catch (e) { console.error("[cds] components/currency/currency.playground.js", e); }

/* ==== components/currency-content/currency-content.js ==== */
try {
/**
 * @deps —
 * <cds-currency-content> — .Currency Content (building block, usado em listas e tabelas)
 * Atributos (padrões do Figma):
 *   value                 · padrão "30.000,00"
 *   symbol                Currency Symbol · padrão "R$"
 *   show-negative-symbol  padrão ligado ("false" desliga)
 *   description           Text Description · padrão "Description"
 *   show-description      padrão ligado ("false" desliga)
 */
(function(){
  "use strict";
  class CdsCurrencyContent extends CDS.Element {
    static get observedAttributes(){ return ["value", "symbol", "show-negative-symbol", "description", "show-description"]; }
    render(){
      var neg = this.flag("show-negative-symbol");
      this.innerHTML = "";
      var row = document.createElement("span"); row.className = "cds-cc2__row";
      var sym = document.createElement("span"); sym.textContent = (neg ? "-" : "") + (this.getAttribute("symbol") || "R$");
      var val = document.createElement("span"); val.textContent = this.hasAttribute("value") ? this.getAttribute("value") : "30.000,00";
      row.appendChild(sym); row.appendChild(val); this.appendChild(row);
      if (this.flag("show-description")){
        var d = document.createElement("span"); d.className = "cds-cc2__desc"; d.textContent = this.hasAttribute("description") ? this.getAttribute("description") : "Description"; this.appendChild(d);
      }
    }
  }
  CdsCurrencyContent.define("cds-currency-content");
})();
} catch (e) { console.error("[cds] components/currency-content/currency-content.js", e); }

/* ==== components/currency-content/currency-content.playground.js ==== */
try {
/* Playground — .Currency Content */
CDS.register({
  id: "currency-content", name: ".Currency Content", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-631",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-currency-content", {});
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Negative Symbol", checked: true, onChange: function(on){ set("show-negative-symbol", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ set("show-description", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Value", value: "30.000,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.text(panel, { label: "Currency Symbol", value: "R$", onInput: function(v){ p.setAttribute("symbol", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
  }
});
} catch (e) { console.error("[cds] components/currency-content/currency-content.playground.js", e); }

/* ==== components/currency-symbol/currency-symbol.js ==== */
try {
/**
 * @deps —
 * <cds-currency-symbol> — .Currency Symbol (building block, usado na Table)
 * Atributo: currency (id kebab-case do Figma) · padrão brazil-real
 */
(function(){
  "use strict";
  var SYMBOLS = {
    "brazil-real": "R$", "us-dollar": "$", "euro": "€", "british-pound": "£", "japanese-yen": "¥", "chinese-yuan": "CN¥",
    "canadian-dollar": "CA$", "australian-dollar": "A$", "swiss-franc": "CHF", "indian-rupee": "₹", "south-korean-won": "₩",
    "mexican-peso": "Mex$", "russian-ruble": "₽", "south-african-rand": "R", "turkish-lira": "₺", "swedish-krona": "kr",
    "norwegian-krone": "kr", "danish-krone": "kr", "singapore-dollar": "S$", "hong-kong-dollar": "HK$"
  };
  class CdsCurrencySymbol extends CDS.Element {
    static get observedAttributes(){ return ["currency"]; }
    render(){ this.textContent = SYMBOLS[this.getAttribute("currency")] || SYMBOLS["brazil-real"]; }
  }
  CdsCurrencySymbol.SYMBOLS = SYMBOLS;
  CdsCurrencySymbol.define("cds-currency-symbol");
})();
} catch (e) { console.error("[cds] components/currency-symbol/currency-symbol.js", e); }

/* ==== components/currency-symbol/currency-symbol.playground.js ==== */
try {
/* Playground — .Currency Symbol */
CDS.register({
  id: "currency-symbol", name: ".Currency Symbol", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-7016",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-currency-symbol", { currency: "brazil-real" });
    ctx.preview.appendChild(p);
    var S = customElements.get("cds-currency-symbol").SYMBOLS;
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Currency", value: "brazil-real",
      options: Object.keys(S).map(function(k){ return [k, k.replace(/-/g, " ").replace(/\b\w/g, function(c){ return c.toUpperCase(); }) + " — " + S[k]]; }),
      onChange: function(v){ p.setAttribute("currency", v); } });
  }
});
} catch (e) { console.error("[cds] components/currency-symbol/currency-symbol.playground.js", e); }

/* ==== components/divider/divider.js ==== */
try {
/**
 * @deps —
 * <cds-divider> — Divider · Dividers · set 4931:207
 *
 * Atributos (padrões do Figma):
 *   kind         solid | dashed · padrão solid
 *   intensity    soft | medium | intense · padrão soft
 *   orientation  horizontal | vertical · padrão horizontal
 *   separator    presente = separa grupos com significado → role="separator" + aria-orientation.
 *                Ausente = decorativo → aria-hidden (annotation "Semântica de separador")
 */
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  class CdsDivider extends CDS.Element {
    static get observedAttributes(){ return ["kind", "orientation", "separator"]; }
    render(){
      var vertical = this.getAttribute("orientation") === "vertical";
      this.innerHTML = "";
      if (this.getAttribute("kind") === "dashed"){
        // annotation: não usar border-style:dashed — SVG com dasharray 4 4 e cap round
        var svg = document.createElementNS(NS, "svg"), line = document.createElementNS(NS, "line");
        svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
        line.setAttribute("x1", vertical ? "50%" : "0"); line.setAttribute("y1", vertical ? "0" : "50%");
        line.setAttribute("x2", vertical ? "50%" : "100%"); line.setAttribute("y2", vertical ? "100%" : "50%");
        line.setAttribute("stroke", "currentColor"); line.setAttribute("stroke-width", "1");
        line.setAttribute("stroke-dasharray", "4 4"); line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line); this.appendChild(svg);
      }
      if (this.hasAttribute("separator")){
        this.setAttribute("role", "separator"); this.setAttribute("aria-orientation", vertical ? "vertical" : "horizontal"); this.removeAttribute("aria-hidden");
      } else { this.removeAttribute("role"); this.removeAttribute("aria-orientation"); this.setAttribute("aria-hidden", "true"); }
    }
  }
  CdsDivider.define("cds-divider");
})();
} catch (e) { console.error("[cds] components/divider/divider.js", e); }

/* ==== components/divider/divider.playground.js ==== */
try {
/* Playground — Divider */
CDS.register({
  id: "divider", name: "Divider", category: "Dividers",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4931-207",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    // Moldura de demonstração: o divider estica no eixo da Orientation
    var stage = kit.el("div", { style: "display:flex; align-items:center; justify-content:center; width:312px; max-width:100%; height:80px;" });
    var p = kit.el("cds-divider", { kind: "solid", intensity: "soft", orientation: "horizontal" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "solid", options: [["solid","Solid"],["dashed","Dashed"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Intensity", value: "soft", options: [["soft","Soft"],["medium","Medium"],["intense","Intense"]],
      hint: "Soft e Medium ficam abaixo de 3:1 por design (decorativo, isento do 1.4.11). Se o divider for o único sinal de separação, use Intense.",
      onChange: function(v){ set("intensity", v); } });
    kit.seg(panel, { label: "Orientation", value: "horizontal", options: [["horizontal","Horizontal"],["vertical","Vertical"]], onChange: function(v){ set("orientation", v); } });

    kit.section(panel, "Acessibilidade");
    kit.toggle(panel, { label: "Separador semântico (role=separator)", onChange: function(on){ set("separator", on); } });
  }
});
} catch (e) { console.error("[cds] components/divider/divider.playground.js", e); }

/* ==== components/icon/icon.js ==== */
try {
/**
 * @deps —
 * <cds-icon> — Icon · Images · set 2261:1126
 *
 * Atributos (padrões do Figma):
 *   icon        nome do ícone em assets/icons (Choose Icon) · padrão "placeholder-line"
 *   appearance  accent | neutral | positive | warning | negative | informative | inversed · padrão accent
 *   size        small (16) | medium (20) | large (24) · padrão small
 *   label       nome acessível. Sem label o ícone é decorativo (aria-hidden)
 */
(function(){
  "use strict";
  function slug(n){ return String(n || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  class CdsIcon extends CDS.Element {
    static get observedAttributes(){ return ["icon", "label"]; }
    get icon(){ return this.getAttribute("icon") || "placeholder-line"; }
    render(){
      var label = this.getAttribute("label");
      if (!this._glyph){ this._glyph = document.createElement("span"); this.appendChild(this._glyph); }
      this._glyph.className = "cds-icon cds-icon--" + slug(this.icon);
      this._glyph.setAttribute("aria-hidden", "true");
      this.a11yName(label);
    }
  }
  CdsIcon.define("cds-icon");
})();
} catch (e) { console.error("[cds] components/icon/icon.js", e); }

/* ==== components/icon/icon.playground.js ==== */
try {
/* Playground — Icon */
CDS.register({
  id: "icon", name: "Icon", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2261-1126",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-icon", { icon: "placeholder-line", appearance: "accent", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"],["inversed","Inversed"]],
      hint: "Inversed é para fundo escuro — no preview o ícone some sobre o fundo claro.", onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 16"],["medium","Medium 20"],["large","Large 24"]], onChange: function(v){ set("size", v); } });

    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Choose Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });

    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (nome acessível)", placeholder: "vazio = decorativo (aria-hidden)", onInput: function(v){ set("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/icon/icon.playground.js", e); }

/* ==== components/avatar/avatar.js ==== */
try {
/**
 * @deps icon
 * <cds-avatar> — Avatar · Images · set 2278:92
 * Kind=Default compõe <cds-icon icon="user-line"> (nested instance): 20px no Small/Medium, 24px no Large.
 *
 * Atributos (padrões do Figma):
 *   kind        default | initial | image · padrão default
 *   appearance  neutral | inversed · padrão neutral (Image só existe em Neutral no Figma)
 *   size        small (40) | medium (48) | large (64) · padrão small
 *   label       Text Label (iniciais) · padrão "AA"
 *   src · alt   para Kind=Image
 *   name        nome da pessoa — vira o nome acessível (role=img)
 */
(function(){
  "use strict";
  class CdsAvatar extends CDS.Element {
    static get observedAttributes(){ return ["kind", "appearance", "size", "label", "src", "alt", "name"]; }
    render(){
      var kind = this.getAttribute("kind") || "default", size = this.getAttribute("size") || "small";
      this.innerHTML = ""; this.iconEl = null;
      if (kind === "initial"){
        var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "AA"; t.setAttribute("aria-hidden", "true"); this.appendChild(t);
      } else if (kind === "image" && this.getAttribute("src")){
        var img = document.createElement("img"); img.src = this.getAttribute("src"); img.alt = ""; this.appendChild(img);
      } else {
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", "user-line");
        this.iconEl.setAttribute("size", size === "large" ? "large" : "medium");
        this.iconEl.setAttribute("appearance", this.getAttribute("appearance") === "inversed" ? "inversed" : "neutral");
        this.appendChild(this.iconEl);
      }
      var name = this.getAttribute("name") || this.getAttribute("alt");
      this.a11yName(name);
    }
  }
  CdsAvatar.define("cds-avatar");
})();
} catch (e) { console.error("[cds] components/avatar/avatar.js", e); }

/* ==== components/avatar/avatar.playground.js ==== */
try {
/* Playground — Avatar */
CDS.register({
  id: "avatar", name: "Avatar", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2278-92",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16);" });
    var p = kit.el("cds-avatar", { kind: "default", appearance: "neutral", size: "small", label: "AA", src: "assets/brand/sample-photo.svg" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["initial","Initial"],["image","Image"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]],
      hint: "Inversed é para fundo escuro: o preview ganha fundo inverso.", onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 40"],["medium","Medium 48"],["large","Large 64"]], onChange: function(v){ set("size", v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label (Initial)", value: "AA", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "name (nome acessível)", placeholder: "ex.: Ana Alves", onInput: function(v){ set("name", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Icon (Kind=Default)", exposed: false, note: "user-line · 20px no Small/Medium, 24px no Large.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", "user-line"], ["Size", i.getAttribute("size")], ["Appearance", i.getAttribute("appearance")]] : [["Kind", p.getAttribute("kind")]]; } });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/avatar/avatar.playground.js", e); }

/* ==== components/breadcrumb-item/breadcrumb-item.js ==== */
try {
/**
 * @deps icon
 * <cds-breadcrumb-item> — .Item (Breadcrumb) · .Building Blocks · set 6713:3
 * Separator (navigation-right-line 16, Has Separator) + Content (pad 8 · raio extra-small).
 * Kind=Default: Label · Kind=Truncate: more-line (abre o Popover com os níveis escondidos).
 * Is Active=True: Label/Medium + Text/intense · False: Label/Regular + Text/medium (Hovered/Pressed: Text/intense).
 * Atributos: kind (default|truncate) · label ("Label") · has-separator · is-active · href · current · disabled
 *   state="hovered|pressed" (specimen)
 * O conteúdo é <a> com href, <span aria-current="page"> com current, senão <button> (Truncate sempre é <button>).
 */
(function(){
  "use strict";
  class CdsBreadcrumbItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","label","has-separator","is-active","href","current","disabled","truncate-label"]; }
    get kind(){ return this.getAttribute("kind") === "truncate" ? "truncate" : "default"; }
    get tagFor(){ return this.kind === "truncate" ? "button" : this.hasAttribute("current") ? "span" : this.hasAttribute("href") ? "a" : "button"; }
    get control(){ return this.contentEl; }
    render(){
      var tag = this.tagFor;
      if (!this.sepEl){ this.sepEl = this.appendChild(CDS.create("cds-icon", { icon: "navigation-right-line", size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-bci__sep")); }
      if (!this.contentEl || this.contentEl.tagName.toLowerCase() !== tag){
        if (this.contentEl) this.contentEl.remove();
        var c = this.contentEl = this.appendChild(CDS.create(tag, null, "cds-bci__content"));
        if (tag === "button") c.type = "button";
      }
      var c = this.contentEl, dis = this.hasAttribute("disabled");
      this.sepEl.hidden = !this.flag("has-separator");
      if (this.kind === "truncate"){
        if (!c.firstChild || c.firstChild.tagName !== "CDS-ICON"){ c.innerHTML = ""; c.appendChild(CDS.create("cds-icon", { icon: "more-line", size: "small", appearance: "neutral", "aria-hidden": "true" })); }
        CDS.attr(c, "aria-label", this.getAttribute("truncate-label") || "Mostrar níveis anteriores");
      } else {
        c.textContent = this.text("label", "Label"); c.removeAttribute("aria-label");
      }
      if (tag === "a"){ if (dis){ c.removeAttribute("href"); CDS.attr(c, "aria-disabled", "true"); } else { CDS.attr(c, "href", this.getAttribute("href")); c.removeAttribute("aria-disabled"); } }
      if (tag === "button") c.disabled = dis;
      if (tag === "span") CDS.attr(c, "aria-current", "page"); else c.removeAttribute("aria-current");
    }
  }
  CdsBreadcrumbItem.define("cds-breadcrumb-item");
})();
} catch (e) { console.error("[cds] components/breadcrumb-item/breadcrumb-item.js", e); }

/* ==== components/breadcrumb-item/breadcrumb-item.playground.js ==== */
try {
/* Playground — .Item (Breadcrumb, building block) */
CDS.register({
  id: "breadcrumb-item", name: ".Item (Breadcrumb)", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6713-3",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-breadcrumb-item", { "is-active": "", href: "#" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["truncate","Truncate"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enable", options: [["enable","Enable"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], hint: "O Figma escreve “Enable” (C25).", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Active", checked: true, onChange: function(on){ kit.attr(p, "is-active", on); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Has Separator", checked: true, onChange: function(on){ kit.attr(p, "has-separator", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/breadcrumb-item/breadcrumb-item.playground.js", e); }

/* ==== components/caju-card/caju-card.js ==== */
try {
/**
 * @deps backdrop icon
 * <cds-caju-card> — Caju Card · Caju Card · set 17053:1181 (Kind × Orientation × Is Blocked × Side View)
 * Simula os cartões da Caju (description do Figma). As artes são os SVGs exportados de cada variante
 * (assets/caju-card/<kind>-<h|v>-<front|back>.svg); os dados do cartão são texto no próprio SVG e trocados pelos atributos.
 * Is Blocked: Backdrop (Surface/inversed · Opacity/medium) + lock-line (Inversed, Large) no centro.
 *
 * Atributos: kind (fisico | fisico-corporativo | virtual | virtual-corporativo | voucher · padrão fisico)
 *   orientation (vertical | horizontal · padrão vertical) · side (front | back) · blocked
 *   full-card-number ("1234 5678 0009 0001") · cvv ("123") · expiration-date ("10/30") · activation-code ("000 000 000 000 000")
 *   label (nome acessível; sem ele: "Cartão Caju <tipo>, final <4 dígitos>")
 * Combinações que não existem no Figma (C74) caem na mais próxima: vertical e, se preciso, frente.
 */
(function(){
  "use strict";
  var SLUG = { "fisico": "fisico", "fisico-corporativo": "fisico-corp", "virtual": "virtual", "virtual-corporativo": "virtual-corp", "voucher": "voucher" };
  var NAME = { "fisico": "Físico", "fisico-corporativo": "Físico Corporativo", "virtual": "Virtual/Crédito", "virtual-corporativo": "Virtual/Crédito Corporativo", "voucher": "Voucher" };
  var HAVE = { "fisico-h-front":1,"fisico-v-front":1,"fisico-corp-v-front":1,"virtual-h-front":1,"virtual-v-front":1,"virtual-corp-h-front":1,"virtual-corp-v-front":1,
    "voucher-h-front":1,"voucher-v-front":1,"fisico-h-back":1,"fisico-v-back":1,"fisico-corp-v-back":1 };
  var cache = {};
  function load(file){ if (!cache[file]) cache[file] = fetch("assets/caju-card/" + file + ".svg").then(function(r){ if (!r.ok) throw new Error(r.status); return r.text(); }); return cache[file]; }

  class CdsCajuCard extends CDS.Element {
    static get observedAttributes(){ return ["kind","orientation","side","blocked","full-card-number","cvv","expiration-date","activation-code","label"]; }
    get kind(){ var k = this.getAttribute("kind"); return SLUG[k] ? k : "fisico"; }
    get file(){
      var s = SLUG[this.kind], o = this.getAttribute("orientation") === "horizontal" ? "h" : "v", side = this.getAttribute("side") === "back" ? "back" : "front";
      var f = s + "-" + o + "-" + side; if (HAVE[f]) return f;
      f = s + "-v-" + side; if (HAVE[f]) return f;
      return s + "-" + o + "-front" in HAVE ? s + "-" + o + "-front" : s + "-v-front";
    }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.artEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-cc__art"));
        this.blockEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-cc__blocked"));
        this.blockEl.appendChild(CDS.create("cds-backdrop"));
        this.blockEl.appendChild(CDS.create("cds-icon", { icon: "lock-line", size: "large", appearance: "inversed" }, "cds-cc__lock"));
        this.setAttribute("role", "img");
      }
      var f = this.file, num = this.text("full-card-number", "1234 5678 0009 0001"), last4 = num.replace(/\D/g, "").slice(-4) || "9248";
      CDS.attr(this, "data-orientation", f.indexOf("-h-") > 0 ? "horizontal" : "vertical");
      this.blockEl.hidden = !this.hasAttribute("blocked");
      CDS.attr(this, "aria-label", this.getAttribute("label") || ("Cartão Caju " + NAME[this.kind] + (/-back$/.test(f) ? ", verso" : "") + ", final " + last4 + (this.hasAttribute("blocked") ? ", bloqueado" : "")));
      var data = { number: num, cvv: this.text("cvv", "123"), expiry: this.text("expiration-date", "10/30"), activation: this.text("activation-code", "000 000 000 000 000"), last4: last4 };
      var apply = function(){ [].forEach.call(self.artEl.querySelectorAll("[data-field]"), function(t){ var v = data[t.getAttribute("data-field")]; if (v != null && t.textContent !== v) t.textContent = v; }); };
      if (this._file === f){ apply(); return; }
      this._file = f;
      load(f).then(function(svg){ if (self._file !== f) return; self.artEl.innerHTML = svg; apply(); }).catch(function(){ self.artEl.innerHTML = ""; });
    }
  }
  CdsCajuCard.define("cds-caju-card");
})();
} catch (e) { console.error("[cds] components/caju-card/caju-card.js", e); }

/* ==== components/caju-card/caju-card.playground.js ==== */
try {
/* Playground — Caju Card */
CDS.register({
  id: "caju-card", name: "Caju Card", category: "Caju Card", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17053-1181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-caju-card", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "As artes vêm do Figma; número, CVV, validade e código de ativação são texto e mudam pelos campos abaixo. Combinações que o Figma não tem caem na mais próxima (C74).");
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Kind", value: "fisico", options: [["fisico","Físico"],["fisico-corporativo","Físico Corporativo"],["virtual","Virtual/Crédito"],["virtual-corporativo","Virtual/Crédito Corporativo"],["voucher","Voucher"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.seg(panel, { label: "Orientation", value: "vertical", options: [["vertical","Vertical"],["horizontal","Horizontal"]], onChange: function(v){ kit.attr(p, "orientation", v === "vertical" ? null : v); } });
    kit.seg(panel, { label: "Side View", value: "front", options: [["front","Front"],["back","Back"]], hint: "O Figma só tem verso para Físico (H e V) e Físico Corporativo (V).", onChange: function(v){ kit.attr(p, "side", v === "front" ? null : v); } });
    kit.toggle(panel, { label: "Is Blocked", checked: false, onChange: function(on){ kit.attr(p, "blocked", on); } });
    kit.section(panel, "Texts");
    [["full-card-number","Full Card Number","1234 5678 0009 0001"],["cvv","CVV","123"],["expiration-date","Expiration Date","10/30"],["activation-code","Activation Code","000 000 000 000 000"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
} catch (e) { console.error("[cds] components/caju-card/caju-card.playground.js", e); }

/* ==== components/chip/chip.js ==== */
try {
/**
 * @deps icon
 * Base interna da família Chips (sem playground). Só carrega o CSS compartilhado (.cds-chip)
 * e o helper CDS.chipIcon(); cada chip é um <button> nativo com <cds-icon size="small">.
 */
(function(){
  "use strict";
  CDS.chipIcon = function(name){ return CDS.create("cds-icon", { icon: name, size: "small", appearance: "neutral" }); };
})();
} catch (e) { console.error("[cds] components/chip/chip.js", e); }

/* ==== components/close-toast/close-toast.js ==== */
try {
/**
 * @deps icon
 * <cds-close-toast> — .Close Toast · building block · set 5219:558
 * Botão de fechar 40×40 com close-line (20px). States Enabled/Hovered/Pressed/Disabled via interação.
 * Atributos: label (nome acessível, padrão "Fechar") · disabled · state (forçado: hovered|pressed, para specimens)
 * O click nativo sobe do <button> interno.
 */
(function(){
  "use strict";
  class CdsCloseToast extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled"]; }
    render(){
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-close");
        var ic = CDS.create("cds-icon", { icon: "close-line", size: "medium" }); this._btn.appendChild(ic);
        this.appendChild(this._btn);
      }
      this._btn.setAttribute("aria-label", this.getAttribute("label") || "Fechar");
      this._btn.disabled = this.hasAttribute("disabled");
    }
  }
  CdsCloseToast.define("cds-close-toast");
})();
} catch (e) { console.error("[cds] components/close-toast/close-toast.js", e); }

/* ==== components/close-toast/close-toast.playground.js ==== */
try {
/* Playground — .Close Toast (building block) */
CDS.register({
  id: "close-toast", name: ".Close Toast", category: "Feedback", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5219-558",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "padding:var(--common-sizes-16)" });
    var p = kit.el("cds-close-toast", { label: "Fechar mensagem" }); wrap.appendChild(p); ctx.preview.appendChild(wrap); kit.surface(ctx.preview, "var(--common-colors-surface-inversed)");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são interação. Mostrado sobre Surface/inversed, como dentro do Toast.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "label (nome acessível)", value: "Fechar mensagem", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/close-toast/close-toast.playground.js", e); }

/* ==== components/close-alert/close-alert.js ==== */
try {
/**
 * @deps icon close-toast
 * <cds-close-alert> — .Close Alert · building block · set 11830:5584
 * Botão de fechar 40×40 com close-line (20px). States Enabled/Hovered/Pressed/Disabled via interação.
 * Atributos: label (nome acessível, padrão "Fechar") · disabled · state (forçado: hovered|pressed, para specimens)
 * O click nativo sobe do <button> interno.
 */
(function(){
  "use strict";
  class CdsCloseAlert extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled"]; }
    render(){
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-close");
        var ic = CDS.create("cds-icon", { icon: "close-line", size: "medium" }); this._btn.appendChild(ic);
        this.appendChild(this._btn);
      }
      this._btn.setAttribute("aria-label", this.getAttribute("label") || "Fechar");
      this._btn.disabled = this.hasAttribute("disabled");
    }
  }
  CdsCloseAlert.define("cds-close-alert");
})();
} catch (e) { console.error("[cds] components/close-alert/close-alert.js", e); }

/* ==== components/close-alert/close-alert.playground.js ==== */
try {
/* Playground — .Close Alert (building block) */
CDS.register({
  id: "close-alert", name: ".Close Alert", category: "Feedback", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11830-5584",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-close-alert", { label: "Fechar aviso" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são interação (fundo escuro + ícone inversed).");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "label (nome acessível)", value: "Fechar aviso", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/close-alert/close-alert.playground.js", e); }

/* ==== components/content-banner/content-banner.js ==== */
try {
/**
 * @deps icon
 * <cds-content-banner> — .Content Banner · building block · set 20028:15153
 * Text Container (Title + Description) e CTA (texto + go-line). O CTA é só indicação visual da ação do Banner.
 * Atributos: appearance (neutral|inversed) · title ("Label") · description ("Description") · cta ("Label")
 *   show-text-title · show-cta (ligados por padrão)
 */
(function(){
  "use strict";
  class CdsContentBanner extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "title", "description", "cta", "show-text-title", "show-cta"]; }
    render(){
      this.innerHTML = "";
      var tc = this.appendChild(CDS.create("div", null, "cds-cb__text"));
      if (this.flag("show-text-title")) tc.appendChild(CDS.create("p", null, "cds-cb__title")).textContent = this.text("title", "Label");
      tc.appendChild(CDS.create("p", null, "cds-cb__desc")).textContent = this.text("description", "Description");
      if (this.flag("show-cta")){
        var cta = this.appendChild(CDS.create("span", null, "cds-cb__cta"));
        cta.appendChild(CDS.create("span")).textContent = this.text("cta", "Label");
        // Figma: Icon Neutral com override de cor na instância → Icons/inversed no Inversed
        var inv = this.getAttribute("appearance") === "inversed";
        cta.appendChild(CDS.create("cds-icon", { icon: "go-line", size: "medium", appearance: inv ? "inversed" : "neutral" }));
      }
    }
  }
  CdsContentBanner.define("cds-content-banner");
})();
} catch (e) { console.error("[cds] components/content-banner/content-banner.js", e); }

/* ==== components/content-banner/content-banner.playground.js ==== */
try {
/* Playground — .Content Banner (building block) */
CDS.register({
  id: "content-banner", name: ".Content Banner", category: "Banner", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20028-15153",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "padding:var(--common-sizes-24)" });
    var p = kit.el("cds-content-banner", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap); kit.surface(ctx.preview, "var(--common-colors-decorative-01)");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]], onChange: function(v){
      kit.attr(p, "appearance", v === "neutral" ? null : v);
      kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : "var(--common-colors-decorative-01)");
    } });
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-cta","Show CTA"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["title","Text Title","Label"],["description","Text Description","Description"],["cta","CTA Text Label","Label"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
} catch (e) { console.error("[cds] components/content-banner/content-banner.playground.js", e); }

/* ==== components/csat-item/csat-item.js ==== */
try {
/**
 * @deps icon
 * <cds-csat-item> — .CSAT Item · .Building Blocks · set 10100:1155 (State × Is Active)
 * Coluna gap 8 · pad 4 0 · Item 48 (raio medium) com rate-line / rate-filled (32): Surface/02 inativo · Decorative/02 ativo.
 * Hovered: Item Surface/01 · Pressed: Accent/Solid/soft + stroke Accent/Solid/medium · Label: Disclaimer/Medium Text/medium.
 * Motion: 150ms (reaction ON_HOVER). É um <label> com <input type="radio"> nativo (o CSAT Score faz o grupo).
 * Atributos: label ("Label") · show-label-content · active (Is Active) · selected (a opção marcada) · value · name · disabled · state
 */
(function(){
  "use strict";
  class CdsCsatItem extends CDS.Element {
    static get observedAttributes(){ return ["label","show-label-content","active","selected","value","name","disabled"]; }
    get input(){ return this._in; }
    render(){
      if (!this._in){
        var l = this.appendChild(CDS.create("label", null, "cds-csi"));
        this._in = l.appendChild(CDS.create("input", { type: "radio" }, "cds-csi__input"));
        var box = l.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-csi__item"));
        this._ic = box.appendChild(CDS.create("cds-icon", { size: "large" }, "cds-csi__icon"));
        this._lb = l.appendChild(CDS.create("span", null, "cds-csi__label"));
        var self = this; this._in.addEventListener("change", function(){ self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: self._in.value }, bubbles: true })); });
      }
      CDS.attr(this._ic, "icon", this.hasAttribute("active") ? "rate-filled" : "rate-line");
      this._lb.textContent = this.text("label", "Label"); this._lb.hidden = !this.flag("show-label-content");
      if (!this.flag("show-label-content")) this._in.setAttribute("aria-label", this.text("label", "Label")); else this._in.removeAttribute("aria-label");
      this._in.value = this.getAttribute("value") || ""; this._in.checked = this.hasAttribute("selected"); this._in.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._in.name = this.getAttribute("name");
    }
  }
  CdsCsatItem.define("cds-csat-item");
})();
} catch (e) { console.error("[cds] components/csat-item/csat-item.js", e); }

/* ==== components/csat-item/csat-item.playground.js ==== */
try {
/* Playground — .CSAT Item (building block) */
CDS.register({
  id: "csat-item", name: ".CSAT Item", category: "Rating Score", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1155",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-csat-item", { style: "width:48px;flex:none" }); ctx.preview.appendChild(p);
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "active", on); } });
    kit.toggle(panel, { label: "Show Label Content", checked: true, onChange: function(on){ kit.attr(p, "show-label-content", on ? null : "false"); } });
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/csat-item/csat-item.playground.js", e); }

/* ==== components/csat-score/csat-score.js ==== */
try {
/**
 * @deps csat-item
 * <cds-csat-score> — CSAT Score · Rating Score · set 10100:1192 (State Enabled|Disabled × Selected Value None|1–5)
 * 5 .CSAT Item (Muito ruim · Ruim · Médio · Bom · Muito bom) de 56 de largura · gap 8 · pad 8 0 · SPACE_BETWEEN · Surface/default.
 * Selected Value=n: os n primeiros ficam Is Active (como estrelas). Disabled: no Figma, shape/opacity/high (fora da Common, C68); aqui Opacity/medium.
 * Acessibilidade: radiogroup nativo; cada opção anunciada pelo rótulo ("Bom, 4 de 5").
 * Atributos: value (1–5 ou vazio) · disabled · label (nome do grupo · "Avaliação") · labels ("Muito ruim,Ruim,Médio,Bom,Muito bom") · name
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0, LABELS = ["Muito ruim", "Ruim", "Médio", "Bom", "Muito bom"];
  class CdsCsatScore extends CDS.Element {
    static get observedAttributes(){ return ["value","disabled","label","labels","name"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._name = "cds-csat-" + (++uid); this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        for (var i = 1; i <= 5; i++) this.appendChild(CDS.create("cds-csat-item", { value: String(i) }));
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.setAttribute("value", e.detail.value); self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: +e.detail.value }, bubbles: true })); });
      }
      var v = parseInt(this.getAttribute("value"), 10) || 0, dis = this.hasAttribute("disabled"), name = this.getAttribute("name") || this._name;
      var labels = this.getAttribute("labels") ? this.getAttribute("labels").split(",").map(function(s){ return s.trim(); }) : LABELS;
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Avaliação");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      [].forEach.call(this.children, function(it, i){
        CDS.attr(it, "label", labels[i] || String(i + 1)); CDS.attr(it, "active", i < v ? "" : null); CDS.attr(it, "selected", i + 1 === v ? "" : null);
        CDS.attr(it, "disabled", dis ? "" : null); CDS.attr(it, "name", name);
        if (it.input) it.input.setAttribute("aria-label", (labels[i] || "") + ", " + (i + 1) + " de 5");
      });
    }
  }
  CdsCsatScore.define("cds-csat-score");
})();
} catch (e) { console.error("[cds] components/csat-score/csat-score.js", e); }

/* ==== components/csat-score/csat-score.playground.js ==== */
try {
/* Playground — CSAT Score */
CDS.register({
  id: "csat-score", name: "CSAT Score", category: "Rating Score", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1192",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-csat-score", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value + " de 5", true); });
    kit.hint(panel, "A nota n preenche os n primeiros ícones. O fundo do Figma usa uma variável de fora da Common (C68).");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.select(panel, { label: "Selected Value", value: "none", options: [["none","None"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"]], onChange: function(v){ kit.attr(p, "value", v === "none" ? null : v); } });
  }
});
} catch (e) { console.error("[cds] components/csat-score/csat-score.playground.js", e); }

/* ==== components/filter-chip/filter-chip.js ==== */
try {
/**
 * @deps chip
 * <cds-filter-chip> — Filter Chips · Selection Controls · set 12365:2744
 * Toggle: o clique alterna Is Selected (aria-pressed). Selecionado troca o Lead Icon pelo check-line.
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · selected · disabled
 * Evento: cds-change { selected }
 */
(function(){
  "use strict";
  class CdsFilterChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "selected", "disabled"]; }
    get button(){ return this._btn; }
    get selected(){ return this.hasAttribute("selected"); }
    render(){
      var self = this;
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-chip");
        this._btn.addEventListener("click", function(){
          self.toggleAttribute("selected");
          self.dispatchEvent(new CustomEvent("cds-change", { detail: { selected: self.selected }, bubbles: true }));
        });
        this.appendChild(this._btn);
      }
      var b = this._btn; b.innerHTML = ""; b.disabled = this.hasAttribute("disabled");
      b.setAttribute("aria-pressed", String(this.selected));
      this.leadEl = null;
      if (this.selected) { this.leadEl = CDS.chipIcon("check-line"); b.appendChild(this.leadEl); }
      else if (this.flag("show-lead-icon")){ this.leadEl = CDS.chipIcon(this.getAttribute("icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      b.appendChild(CDS.create("span")).textContent = this.text("label", "Label");
    }
  }
  CdsFilterChip.define("cds-filter-chip");
})();
} catch (e) { console.error("[cds] components/filter-chip/filter-chip.js", e); }

/* ==== components/filter-chip/filter-chip.playground.js ==== */
try {
/* Playground — Filter Chips */
CDS.register({
  id: "filter-chips", name: "Filter Chips", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2744",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-filter-chip", { label: "Label" });
    ctx.preview.appendChild(p);
    var selSw;
    p.addEventListener("cds-change", function(e){ selSw.checked = e.detail.selected; ctx.readout(e.detail.selected ? "selecionado" : "", false); });
    kit.section(panel, "Variants");
    selSw = kit.toggle(panel, { label: "Is Selected", onChange: function(on){ kit.attr(p, "selected", on); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "O clique alterna Is Selected (aria-pressed); selecionado troca o ícone pelo check-line.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/filter-chip/filter-chip.playground.js", e); }

/* ==== components/icon-button/icon-button.js ==== */
try {
/**
 * @deps icon badge
 * <cds-icon-button> — Icon Button · Buttons · set 4464:636
 * Renderiza um <button> com <cds-icon size="medium"> (20px) e, opcionalmente, <cds-badge> (Show Notification).
 *
 * Atributos (padrões do Figma):
 *   icon               Icon (swap) · padrão "placeholder-line"
 *   kind               default | ghost · padrão default
 *   appearance         accent | neutral | inversed · padrão accent
 *   size               medium (48) | small (40) · padrão medium
 *   disabled
 *   show-notification  mostra o Badge · notification = texto do Badge (padrão "0")
 *   label              nome acessível — obrigatório (botão só com ícone)
 *   pressed            "true" | "false" — repassa aria-pressed (toggle)
 * O evento click nativo sobe do <button> interno; o host não recebe foco.
 */
(function(){
  "use strict";
  class CdsIconButton extends CDS.Element {
    static get observedAttributes(){ return ["icon", "disabled", "show-notification", "notification", "label", "pressed"]; }
    get button(){ return this._btn; }
    focus(opts){ if (this._btn) this._btn.focus(opts); }
    render(){
      if (!this._btn){
        this._btn = document.createElement("button"); this._btn.type = "button"; this._btn.className = "cds-ib";
        this.iconEl = document.createElement("cds-icon"); this.iconEl.setAttribute("size", "medium"); this.iconEl.setAttribute("appearance", "neutral");
        this._btn.appendChild(this.iconEl); this.appendChild(this._btn);
      }
      this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      this._btn.disabled = this.hasAttribute("disabled");
      var label = this.getAttribute("label");
      if (label) this._btn.setAttribute("aria-label", label); else this._btn.removeAttribute("aria-label");
      var pressed = this.getAttribute("pressed");
      if (pressed === "true" || pressed === "false") this._btn.setAttribute("aria-pressed", pressed); else this._btn.removeAttribute("aria-pressed");
      var badge = this._btn.querySelector("cds-badge");
      if (this.hasAttribute("show-notification")){
        if (!badge){ badge = document.createElement("cds-badge"); badge.setAttribute("appearance", "warning"); this._btn.appendChild(badge); }
        badge.setAttribute("label", this.getAttribute("notification") || "0");
      } else if (badge) badge.remove();
    }
  }
  CdsIconButton.define("cds-icon-button");
})();
} catch (e) { console.error("[cds] components/icon-button/icon-button.js", e); }

/* ==== components/icon-button/icon-button.playground.js ==== */
try {
/* Playground — Icon Button */
CDS.register({
  id: "icon-button", name: "Icon Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4464-636",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16);" });
    var p = kit.el("cds-icon-button", { icon: "placeholder-line", kind: "default", appearance: "accent", size: "medium", label: "Ação" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("click", function(){ ctx.readout("click", false); setTimeout(function(){ ctx.readout("", false); }, 800); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são estados de interação.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Notification", onChange: function(on){ set("show-notification", on); } });
    kit.text(panel, { label: "Badge (notification)", value: "0", onInput: function(v){ set("notification", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (aria-label, obrigatório)", value: "Ação", onInput: function(v){ set("label", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Icon", exposed: false, note: "Size Medium (20px); a cor acompanha o Kind e a Appearance do botão.",
      props: function(){ return [["Choose Icon", p.getAttribute("icon")], ["Size", "medium (20)"]]; } });
    var refreshB = kit.nested(panel, { title: "Badge", exposed: false, note: "Appearance Warning, no canto superior direito.",
      props: function(){ var b = p.querySelector("cds-badge"); return b ? [["Appearance", "warning"], ["Label", b.getAttribute("label")]] : [["Show Notification", "false"]]; } });
    kit.watch(p, function(){ refresh(); refreshB(); });
  }
});
} catch (e) { console.error("[cds] components/icon-button/icon-button.playground.js", e); }

/* ==== components/header/header.js ==== */
try {
/**
 * @deps icon-button divider
 * <cds-header> — .Header (Modal / Bottom Sheet) · building block · componente 16362:3241
 * Title (Body/Bold) + Close Button (Icon Button · Ghost · Neutral · Medium · close-line) + Divider (Soft).
 * Atributos: text-title ("Title") · show-text-title · show-close-button · show-divider · close-label
 * Eventos: cds-close (clique no Close Button)
 */
(function(){
  "use strict";
  class CdsHeader extends CDS.Element {
    static get observedAttributes(){ return ["text-title", "show-text-title", "show-close-button", "show-divider", "close-label"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var c = this.appendChild(CDS.create("div", null, "cds-header__content"));
        this.titleEl = c.appendChild(CDS.create("h2", null, "cds-header__title"));
        this.closeEl = c.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "close-line" }));
        this.closeEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); });
        this.divEl = this.appendChild(CDS.create("cds-divider", { intensity: "soft" }));
      }
      this.titleEl.textContent = this.text("text-title", "Title"); this.titleEl.hidden = !this.flag("show-text-title");
      this.closeEl.hidden = !this.flag("show-close-button"); this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar");
      this.divEl.hidden = !this.flag("show-divider");
    }
  }
  CdsHeader.define("cds-header");
})();
} catch (e) { console.error("[cds] components/header/header.js", e); }

/* ==== components/header/header.playground.js ==== */
try {
/* Playground — .Header (building block) */
CDS.register({
  id: "header", name: ".Header", category: "Overlays", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16362-3241",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-header", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-close", function(){ ctx.readout("cds-close", false); });
    kit.hint(panel, "Usado no Modal e no Bottom Sheet (lá com Show Divider desligado).");
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-close-button","Show Close Button"],["show-divider","Show Divider"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Title", onInput: function(v){ p.setAttribute("text-title", v); } });
  }
});
} catch (e) { console.error("[cds] components/header/header.playground.js", e); }

/* ==== components/icons-block/icons-block.js ==== */
try {
/**
 * @deps icon
 * <cds-icons> — .Icons (building block do Filter button)
 * Atributo: kind default (filter-line) | date (calendar-line) · padrão default
 * Compõe <cds-icon size="medium">; a cor vem de quem consome (override de --_icon-color).
 */
(function(){
  "use strict";
  var ICON = { "default": "filter-line", "date": "calendar-line" };
  class CdsIcons extends CDS.Element {
    static get observedAttributes(){ return ["kind"]; }
    render(){
      if (!this.iconEl){ this.iconEl = document.createElement("cds-icon"); this.iconEl.setAttribute("size", "medium"); this.iconEl.setAttribute("appearance", "neutral"); this.appendChild(this.iconEl); }
      this.iconEl.setAttribute("icon", ICON[this.getAttribute("kind")] || ICON["default"]);
    }
  }
  CdsIcons.define("cds-icons");
})();
} catch (e) { console.error("[cds] components/icons-block/icons-block.js", e); }

/* ==== components/icons-block/icons-block.playground.js ==== */
try {
/* Playground — .Icons */
CDS.register({
  id: "icons-block", name: ".Icons", category: "Building Blocks", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5218-1271",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-icons", { kind: "default" });
    ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default (filter-line)"],["date","Date (calendar-line)"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.hint(panel, "Usado pelo Filter button. A cor vem do componente pai.");
  }
});
} catch (e) { console.error("[cds] components/icons-block/icons-block.playground.js", e); }

/* ==== components/filter-button/filter-button.js ==== */
try {
/**
 * @deps icons-block badge
 * <cds-filter-button> — Filter button · Buttons · set 5099:5389
 * Desktop: .Icons + "Filtros". Tablet/Mobile (collection Viewport): só o ícone, 48×48.
 * Is Active = há filtros aplicados → Badge Neutral com a contagem no lugar do ícone (Desktop)
 * ou no canto (Mobile). Não alterna sozinho: quem implementa controla `active`.
 *
 * Atributos:
 *   label     · padrão "Filtros"
 *   active    Is Active (filtros aplicados)
 *   count     número no Badge quando ativo · padrão "1"
 *   disabled
 *   viewport  desktop | mobile — força o modo; sem ele, herda o [data-viewport] mais próximo
 */
(function(){
  "use strict";
  class CdsFilterButton extends CDS.Element {
    static get observedAttributes(){ return ["label", "active", "count", "disabled"]; }
    get button(){ return this._btn; }
    render(){
      var b = this._btn || document.createElement("button");
      b.className = "cds-fb"; b.type = "button"; b.disabled = this.hasAttribute("disabled");
      var active = this.hasAttribute("active"), label = this.getAttribute("label") || "Filtros", count = this.getAttribute("count") || "1";
      b.innerHTML = "";
      this.badgeEl = null;
      if (active){
        var mob = document.createElement("cds-icons"); mob.className = "is-mobile-only"; mob.setAttribute("kind", "default"); b.appendChild(mob);
        this.badgeEl = document.createElement("cds-badge"); this.badgeEl.setAttribute("appearance", "neutral"); this.badgeEl.setAttribute("label", count); this.badgeEl.setAttribute("aria-hidden", "true");
        this.badgeEl.setAttribute("viewport", "desktop"); // Figma: pílula de 16px também no mobile (a regra do Badge viraria ponto · CONFERIR.md)
        b.appendChild(this.badgeEl);
      } else {
        var ic = document.createElement("cds-icons"); ic.setAttribute("kind", "default"); b.appendChild(ic);
      }
      var t = document.createElement("span"); t.className = "cds-fb__label"; t.textContent = label; b.appendChild(t);
      b.setAttribute("aria-label", active ? label + ", " + count + (count === "1" ? " filtro aplicado" : " filtros aplicados") : label);
      if (!this._btn){ this._btn = b; this.appendChild(b); }
    }
  }
  CdsFilterButton.define("cds-filter-button");
})();
} catch (e) { console.error("[cds] components/filter-button/filter-button.js", e); }

/* ==== components/filter-button/filter-button.playground.js ==== */
try {
/* Playground — Filter button */
CDS.register({
  id: "filter-button", name: "Filter button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5099-5389",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-filter-button", {});
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.toggle(panel, { label: "Is Active (filtros aplicados)", onChange: function(on){ set("active", on); } });
    kit.seg(panel, { label: "Viewport (Specific/Buttons/Filter button)", value: "auto", options: [["auto","Herdar"],["desktop","Desktop"],["mobile","Mobile"]],
      hint: "<b>Herdar</b> segue o seletor do topo: 744 e 360 mostram só o ícone.", onChange: function(v){ set("viewport", v === "auto" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "Filtros", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Contagem (Badge)", value: "1", onInput: function(v){ set("count", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: ".Icons / Badge", exposed: false, note: "Inativo: .Icons (filter-line). Ativo: Badge Neutral com a contagem.",
      props: function(){ return p.badgeEl ? [["Badge", "neutral · " + p.badgeEl.getAttribute("label")]] : [[".Icons", "kind=default (filter-line)"]]; } });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/filter-button/filter-button.playground.js", e); }

/* ==== components/image/image.js ==== */
try {
/**
 * @deps —
 * <cds-image> — Image · Images · set 2273:320
 * Atributos: src · alt (obrigatório quando a imagem informa; vazio = decorativa)
 *            aspect-ratio none | 1:1 | 3:2 · padrão none (proporção natural)
 * Sem src mostra a superfície de placeholder (Surface/01).
 */
(function(){
  "use strict";
  class CdsImage extends CDS.Element {
    static get observedAttributes(){ return ["src", "alt"]; }
    render(){
      var src = this.getAttribute("src");
      if (!src){ this.innerHTML = ""; this.img = null; return; }
      if (!this.img){ this.img = document.createElement("img"); this.img.decoding = "async"; this.img.loading = "lazy"; this.appendChild(this.img); }
      this.img.src = src;
      this.img.alt = this.getAttribute("alt") || "";
    }
  }
  CdsImage.define("cds-image");
})();
} catch (e) { console.error("[cds] components/image/image.js", e); }

/* ==== components/image/image.playground.js ==== */
try {
/* Playground — Image */
CDS.register({
  id: "image", name: "Image", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2273-320",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var SAMPLE = "assets/brand/sample-photo.svg";
    var p = kit.el("cds-image", { src: SAMPLE, alt: "Exemplo", "aspect-ratio": "none", style: "width:200px" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Aspect Ratio", value: "none", options: [["none","None"],["1:1","1:1"],["3:2","3:2"]], onChange: function(v){ set("aspect-ratio", v); } });
    kit.section(panel, "Conteúdo");
    kit.text(panel, { label: "src", value: SAMPLE, hint: "Vazio mostra o placeholder (Surface/01).", onInput: function(v){ set("src", v); } });
    kit.text(panel, { label: "alt", value: "Exemplo", hint: "Vazio = decorativa.", onInput: function(v){ p.setAttribute("alt", v); } });
  }
});
} catch (e) { console.error("[cds] components/image/image.playground.js", e); }

/* ==== components/banner/banner.js ==== */
try {
/**
 * @deps content-banner image backdrop
 * <cds-banner> — Banner · Banner · set 20051:15726
 * Destaque de conteúdo com título, descrição e CTA. O banner inteiro é a área clicável e dispara uma ação
 * (o CTA é só indicação visual, não é focável). Vira <a> com href ou <button> sem href.
 *
 * Atributos:
 *   kind          illustration (fundo sólido + ilustração na lateral) | image (imagem de fundo + Backdrop)
 *   illustration  ilustração do [Caju] Illustrations: "<categoria>/<nome>" ou só o nome (padrão "notificacoes/sino", como no Figma)
 *   src · alt     imagem do Kind=Image
 *   bg            token de cor do fundo no Kind=Illustration (ex.: "decorative-02"); padrão Decorative/01
 *   content       neutral | inversed — Appearance do .Content Banner (padrão: neutral no Illustration, inversed no Image)
 *   title · description · cta · show-text-title · show-cta   (repassados ao .Content Banner)
 *   href · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsBanner extends CDS.Element {
    static get observedAttributes(){ return ["kind","illustration","src","alt","bg","content","title","description","cta","show-text-title","show-cta","href","disabled"]; }
    render(){
      var image = this.getAttribute("kind") === "image", href = this.getAttribute("href"), dis = this.hasAttribute("disabled");
      this.innerHTML = "";
      var el = this.target = CDS.create(href && !dis ? "a" : "button", null, "cds-banner");
      if (href && !dis) el.href = href; else { el.type = "button"; el.disabled = dis; }
      var bg = this.getAttribute("bg");
      if (bg && !image) el.style.setProperty("--_banner-bg", "var(--common-colors-" + bg + ")");
      if (image){
        el.appendChild(CDS.create("cds-image", { src: this.getAttribute("src") || "", alt: this.getAttribute("alt") || "" }, "cds-banner__img"));
        el.appendChild(CDS.create("cds-backdrop", null, "cds-banner__backdrop")); // nested instance: Backdrop
      }
      var cb = CDS.create("cds-content-banner", { appearance: this.getAttribute("content") || (image ? "inversed" : "neutral") }, "cds-banner__content");
      ["title","description","cta","show-text-title","show-cta"].forEach(function(k){ var v = this.getAttribute(k); if (v != null) cb.setAttribute(k, v); }, this);
      if (image) el.appendChild(cb);
      else {
        var row = el.appendChild(CDS.create("span", null, "cds-banner__row"));
        row.appendChild(cb);
        row.appendChild(CDS.create("img", { src: CDS.illustration(this.getAttribute("illustration") || "notificacoes/sino"), alt: "", "aria-hidden": "true" }, "cds-banner__ill"));
      }
      this.appendChild(el);
    }
  }
  CdsBanner.define("cds-banner");
})();
} catch (e) { console.error("[cds] components/banner/banner.js", e); }

/* ==== components/banner/banner.playground.js ==== */
try {
/* Playground — Banner */
CDS.register({
  id: "banner", name: "Banner", category: "Banner", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20051-15726",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-banner", { src: "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("ação do banner", true); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "illustration", options: [["illustration","Illustration"],["image","Image"]], onChange: function(v){ kit.attr(p, "kind", v === "illustration" ? null : v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "O banner inteiro é clicável; o CTA é só indicação visual. Hovered e Pressed são interação.");
    kit.section(panel, "Fundo (Kind=Illustration)");
    kit.select(panel, { label: "Token de cor", value: "decorative-01", options: [["decorative-01","Decorative/01"],["decorative-02","Decorative/02"],["decorative-03","Decorative/03"],["decorative-04","Decorative/04"],["surface-01","Surface/01"],["surface-inversed","Surface/inversed"]],
      hint: "A cor é livre (description do Figma); escolha o Appearance do conteúdo pelo contraste.", onChange: function(v){ kit.attr(p, "bg", v === "decorative-01" ? null : v); } });
    kit.seg(panel, { label: ".Content Banner · Appearance", value: "auto", options: [["auto","Automático"],["neutral","Neutral"],["inversed","Inversed"]], onChange: function(v){ kit.attr(p, "content", v === "auto" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-cta","Show CTA"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["title","Text Title","Label"],["description","Text Description","Description"],["cta","CTA Text Label","Label"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.illustrationSwap(panel, { label: "Illustration", value: "notificacoes/sino", onChange: function(v){ p.setAttribute("illustration", v); } });
  }
});
} catch (e) { console.error("[cds] components/banner/banner.playground.js", e); }

/* ==== components/input-chip/input-chip.js ==== */
try {
/**
 * @deps chip
 * <cds-input-chip> — Input Chips · Selection Controls · set 12365:2728
 * Entidade removível: clicar no chip inteiro remove (o alvo é o chip de 40px, não o ícone de 16px — WCAG 2.5.8).
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · disabled
 * Evento: cds-remove (cancelável) — sem preventDefault() o chip se remove do DOM.
 */
(function(){
  "use strict";
  class CdsInputChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "disabled"]; }
    get button(){ return this._btn; }
    render(){
      var self = this, label = this.text("label", "Label");
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-chip");
        this._btn.addEventListener("click", function(){
          var ev = new CustomEvent("cds-remove", { detail: { label: self.text("label", "Label") }, bubbles: true, cancelable: true });
          if (self.dispatchEvent(ev)) self.remove();
        });
        this.appendChild(this._btn);
      }
      var b = this._btn; b.innerHTML = ""; b.disabled = this.hasAttribute("disabled");
      this.leadEl = null;
      if (this.flag("show-lead-icon")){ this.leadEl = CDS.chipIcon(this.getAttribute("icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      b.appendChild(CDS.create("span")).textContent = label;
      b.appendChild(CDS.chipIcon("close-line"));
      b.setAttribute("aria-label", "Remover " + label);
    }
  }
  CdsInputChip.define("cds-input-chip");
})();
} catch (e) { console.error("[cds] components/input-chip/input-chip.js", e); }

/* ==== components/input-chip/input-chip.playground.js ==== */
try {
/* Playground — Input Chips */
CDS.register({
  id: "input-chips", name: "Input Chips", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2728",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p;
    function make(){ p = kit.el("cds-input-chip", { label: label.value || "Label" }); if (!lead.checked) p.setAttribute("show-lead-icon", "false"); if (dis.checked) p.setAttribute("disabled", ""); if (icon.value) p.setAttribute("icon", icon.value);
      p.addEventListener("cds-remove", function(){ ctx.readout("removido — clique em Restaurar", false); }); ctx.preview.innerHTML = ""; ctx.preview.appendChild(p); }
    kit.section(panel, "Variants");
    var dis = kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Clicar no chip inteiro remove (alvo de 40px). Hovered e Pressed são interação.");
    kit.button(panel, { label: "Restaurar chip", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    var lead = kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    var label = kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    var icon = kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
    make();
  }
});
} catch (e) { console.error("[cds] components/input-chip/input-chip.playground.js", e); }

/* ==== components/chips-group/chips-group.js ==== */
try {
/**
 * @deps input-chip filter-chip
 * <cds-chips-group> — Chips Group · Selection Controls · set 12457:3664
 * Container de chips (filhos diretos = Slot do Figma).
 *
 * Atributos (padrões do Figma):
 *   kind       input | filter · padrão input — informativo (o tipo vem dos filhos)
 *   role-kind  multiple (Multiple Rows Chip, quebra) | single (Single Rows Chips, rolagem) · padrão single
 *              ("role" é reservado no HTML, por isso role-kind)
 *   label      nome acessível do grupo
 */
(function(){
  "use strict";
  class CdsChipsGroup extends CDS.Element {
    static get observedAttributes(){ return ["label", "role-kind"]; }
    render(){
      if (!this.hasAttribute("role-kind")) this.setAttribute("role-kind", "single");
      this.setAttribute("role", "group");
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label")); else this.removeAttribute("aria-label");
    }
  }
  CdsChipsGroup.define("cds-chips-group");
})();
} catch (e) { console.error("[cds] components/chips-group/chips-group.js", e); }

/* ==== components/chips-group/chips-group.playground.js ==== */
try {
/* Playground — Chips Group */
CDS.register({
  id: "chips-group", name: "Chips Group", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12457-3664",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, kind = "input";
    var g = kit.el("cds-chips-group", { "role-kind": "single", label: "Filtros" });
    ctx.preview.appendChild(g);
    var LABELS = ["Alimentação", "Refeição", "Mobilidade", "Saúde", "Educação", "Cultura", "Home office", "Auxílio"];
    function fill(){ g.innerHTML = ""; LABELS.forEach(function(l){ g.appendChild(kit.el(kind === "input" ? "cds-input-chip" : "cds-filter-chip", { label: l })); }); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "input", options: [["input","Input Chips"],["filter","Filter Chips"]], onChange: function(v){ kind = v; fill(); } });
    kit.seg(panel, { label: "Role", value: "single", options: [["single","Single Row"],["multiple","Multiple Rows"]],
      hint: "Single Row rola na horizontal; Multiple Rows quebra linha. Largura 320.", onChange: function(v){ g.setAttribute("role-kind", v); } });
    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Chips (Slot)", exposed: true, note: "Cores e estados são dos chips; o grupo só organiza.",
      props: function(){ return [["Kind", kind === "input" ? "Input Chips" : "Filter Chips"], ["Itens", String(g.children.length)], ["Selecionados", String(g.querySelectorAll("[selected]").length)]]; } });
    kit.watch(g, refresh);
    fill();
  }
});
} catch (e) { console.error("[cds] components/chips-group/chips-group.playground.js", e); }

/* ==== components/link/link.js ==== */
try {
/**
 * @deps icon
 * <cds-link> — Link · Content · set 4926:213
 * Renderiza um <a> de verdade; o ícone trailing é um <cds-icon size="small"> (nested instance).
 *
 * Atributos (padrões do Figma):
 *   label               Link Content · padrão "Link content"
 *   href                destino · padrão "#"
 *   appearance          neutral | accent | inversed · padrão neutral
 *   icon                Change Icon · padrão "navigation-right-line"
 *   show-trailing-item  "false" esconde o ícone · padrão ligado
 *   disabled            State=Disabled (Opacity/light, fora da tabulação)
 */
(function(){
  "use strict";
  class CdsLink extends CDS.Element {
    static get observedAttributes(){ return ["label", "href", "icon", "show-trailing-item", "disabled", "target"]; }
    render(){
      this.innerHTML = "";
      var a = document.createElement("a");
      var disabled = this.hasAttribute("disabled");
      if (disabled){ a.setAttribute("aria-disabled", "true"); a.tabIndex = -1; }
      else a.href = this.getAttribute("href") || "#";
      if (this.getAttribute("target")){ a.target = this.getAttribute("target"); a.rel = "noopener"; }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Link content";
      a.appendChild(t);
      this.iconEl = null;
      if (this.flag("show-trailing-item")){
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", this.getAttribute("icon") || "navigation-right-line");
        this.iconEl.setAttribute("size", "small"); this.iconEl.setAttribute("appearance", "neutral");
        a.appendChild(this.iconEl);
      }
      this.appendChild(a);
      this.anchor = a;
    }
  }
  CdsLink.define("cds-link");
})();
} catch (e) { console.error("[cds] components/link/link.js", e); }

/* ==== components/link/link.playground.js ==== */
try {
/* Playground — Link */
CDS.register({
  id: "link", name: "Link", category: "Content",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4926-213",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-8) var(--common-sizes-16);" });
    var p = kit.el("cds-link", { label: "Link content", href: "#/link", appearance: "neutral" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered (sublinhado) e Pressed (Label/Bold + sublinhado) são estados de interação.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Trailing Item", checked: true, onChange: function(on){ set("show-trailing-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Link Content", value: "Link content", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Change Icon", value: "navigation-right-line", onChange: function(v){ set("icon", v); } });
    var refresh = kit.nested(panel, { title: "Icon (trailing)", exposed: false, note: "Size Small; a cor acompanha o texto do Link.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Size", "small"]] : [["Show Trailing Item", "false"]]; } });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/link/link.playground.js", e); }

/* ==== components/list-lead-item/list-lead-item.js ==== */
try {
/**
 * @deps avatar icon image
 * <cds-list-lead-item> — .Lead Item (Lists) · .Building Blocks · set 5488:640
 * Não confundir com o .Lead item do Topic (<cds-lead-item>, C25: dois nomes quase iguais).
 * Kind=Avatar (padrão) 40 · Kind=Icon 20 (Neutral, Medium) · Kind=Image 40 com raio extra-small.
 * Atributos: kind (avatar|icon|image) · icon (placeholder-line) · label (iniciais do Avatar · "AA") · src · alt
 */
(function(){
  "use strict";
  class CdsListLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "icon", "label", "src", "alt"]; }
    get kind(){ var k = this.getAttribute("kind"); return k === "icon" || k === "image" ? k : "avatar"; }
    render(){
      var k = this.kind;
      if (this._kind !== k){
        this._kind = k; this.innerHTML = "";
        this.inner = this.appendChild(k === "icon" ? CDS.create("cds-icon", { size: "medium", appearance: "neutral", "aria-hidden": "true" })
          : k === "image" ? CDS.create("cds-image", { "aspect-ratio": "1:1" }) : CDS.create("cds-avatar", { size: "small" }));
      }
      var n = this.inner;
      if (k === "icon") n.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      else if (k === "image"){ if (this.getAttribute("src")) n.setAttribute("src", this.getAttribute("src")); n.setAttribute("alt", this.getAttribute("alt") || ""); }
      else n.setAttribute("label", this.text("label", "AA"));
    }
  }
  CdsListLeadItem.define("cds-list-lead-item");
})();
} catch (e) { console.error("[cds] components/list-lead-item/list-lead-item.js", e); }

/* ==== components/list-lead-item/list-lead-item.playground.js ==== */
try {
/* Playground — .Lead Item (Lists, building block) */
CDS.register({
  id: "list-lead-item", name: ".Lead Item (Lists)", category: "Lists", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-640",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-list-lead-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Não é o .Lead item do Topic (mesmo nome com outra caixa, C25).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "avatar", options: [["avatar","Avatar"],["icon","Icon"],["image","Image"]], onChange: function(v){ p.setAttribute("kind", v); } });
  }
});
} catch (e) { console.error("[cds] components/list-lead-item/list-lead-item.playground.js", e); }

/* ==== components/main-button/main-button.js ==== */
try {
/**
 * @deps icon
 * <cds-main-button> — Main Button · Buttons · set 4464:427
 * Renderiza um <button class="cds-btn"> com <cds-icon> leading e trailing (nested instances, 20px).
 *
 * Atributos (padrões do Figma):
 *   label               Text Label · padrão "Label"
 *   kind                default | ghost · padrão default
 *   appearance          accent | neutral | inversed · padrão accent
 *   size                medium (48) | small (40) · padrão medium
 *   disabled
 *   lead-icon           Lead Icon (swap) · padrão "placeholder-line"
 *   show-lead-icon      "false" esconde · padrão ligado
 *   trailing-icon       Choose Icon do Icon trailing (nested) · padrão "placeholder-line"
 *   show-trailing-icon  "false" esconde · padrão ligado
 *   type                button | submit | reset · padrão button
 */
(function(){
  "use strict";
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsMainButton extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "trailing-icon", "show-trailing-icon", "type"]; }
    get button(){ return this._btn; }
    focus(o){ if (this._btn) this._btn.focus(o); }
    render(){
      var b = this._btn || document.createElement("button");
      b.className = "cds-btn"; b.type = this.getAttribute("type") || "button"; b.disabled = this.hasAttribute("disabled");
      b.innerHTML = "";
      this.leadEl = this.trailEl = null;
      if (this.flag("show-lead-icon")){ this.leadEl = icon(this.getAttribute("lead-icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; b.appendChild(t);
      if (this.flag("show-trailing-icon")){ this.trailEl = icon(this.getAttribute("trailing-icon") || "placeholder-line"); b.appendChild(this.trailEl); }
      if (!this._btn){ this._btn = b; this.appendChild(b); }
    }
  }
  CdsMainButton.define("cds-main-button");
})();
} catch (e) { console.error("[cds] components/main-button/main-button.js", e); }

/* ==== components/main-button/main-button.playground.js ==== */
try {
/* Playground — Main Button */
CDS.register({
  id: "main-button", name: "Main Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4464-427",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); max-width:100%;" });
    var p = kit.el("cds-main-button", { label: "Label", kind: "default", appearance: "accent", size: "medium" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("click", function(){ ctx.readout("click", false); setTimeout(function(){ ctx.readout("", false); }, 800); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered e Pressed (texto em Bold) são interação. Largura mínima segue a Viewport: 136 · 220 (744) · 328 (360).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ set("show-lead-icon", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Trailing Icon", checked: true, onChange: function(on){ set("show-trailing-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ set("lead-icon", v); } });

    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Trailing Icon › Choose Icon", value: "placeholder-line", onChange: function(v){ set("trailing-icon", v); } });
    var refresh = kit.nested(panel, { title: "Icon (trailing)", exposed: false, note: "Instância do Icon (Size Medium 20px); a cor acompanha o botão.",
      props: function(){ var i = p.trailEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Size", "medium"]] : [["Show Trailing Icon", "false"]]; } });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/main-button/main-button.playground.js", e); }

/* ==== components/date-navigation/date-navigation.js ==== */
try {
/**
 * @deps icon-button main-button
 * <cds-date-navigation> — .Navigation Control (Datepicker) · .Building Blocks · componente 17465:384
 * Left Control (Icon Button Ghost Neutral Small · navigation-left-line) · First Month · Year · Trailing Month
 * (Main Button Ghost Neutral Small) · Right Control. SPACE_BETWEEN · 40 de altura.
 * Atributos: first-month ("Janeiro") · year ("2026") · trailing-month ("Fevereiro")
 *   show-left-control · show-first-month · show-year · show-trailing-month · show-right-control (todos ligados, como no Figma)
 * Eventos: cds-prev · cds-next · cds-month { which: "first"|"trailing" } · cds-year
 */
(function(){
  "use strict";
  class CdsDateNavigation extends CDS.Element {
    static get observedAttributes(){ return ["first-month","year","trailing-month","show-left-control","show-first-month","show-year","show-trailing-month","show-right-control"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var fire = function(n, d){ return function(){ self.dispatchEvent(new CustomEvent(n, { detail: d || {}, bubbles: true })); }; };
        this.left = this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "navigation-left-line", label: "Mês anterior" }));
        this.first = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.yearBtn = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.trail = this.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dn__btn"));
        this.right = this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "navigation-right-line", label: "Próximo mês" }));
        this.left.addEventListener("click", fire("cds-prev")); this.right.addEventListener("click", fire("cds-next"));
        this.first.addEventListener("click", fire("cds-month", { which: "first" })); this.trail.addEventListener("click", fire("cds-month", { which: "trailing" }));
        this.yearBtn.addEventListener("click", fire("cds-year"));
      }
      CDS.attr(this.first, "label", this.text("first-month", "Janeiro"));
      CDS.attr(this.yearBtn, "label", this.text("year", "2026"));
      CDS.attr(this.trail, "label", this.text("trailing-month", "Fevereiro"));
      this.left.hidden = !this.flag("show-left-control"); this.right.hidden = !this.flag("show-right-control");
      this.first.hidden = !this.flag("show-first-month"); this.yearBtn.hidden = !this.flag("show-year"); this.trail.hidden = !this.flag("show-trailing-month");
    }
  }
  CdsDateNavigation.define("cds-date-navigation");
})();
} catch (e) { console.error("[cds] components/date-navigation/date-navigation.js", e); }

/* ==== components/date-navigation/date-navigation.playground.js ==== */
try {
/* Playground — .Navigation Control (Datepicker, building block) */
CDS.register({
  id: "date-navigation", name: ".Navigation Control (Datepicker)", category: "Datepicker", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-384",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-date-navigation", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Não é o Nav Control do carrossel (Navigation). Os botões emitem cds-prev, cds-next, cds-month e cds-year.");
    kit.section(panel, "Booleans");
    [["show-left-control","Show Left Control"],["show-first-month","Show First Month"],["show-year","Show Year"],["show-trailing-month","Show Trailing Month"],["show-right-control","Show Right Control"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
  }
});
} catch (e) { console.error("[cds] components/date-navigation/date-navigation.playground.js", e); }

/* ==== components/date-picker/date-picker.js ==== */
try {
/**
 * @deps date-navigation calendar-week calendar-day main-button
 * <cds-date-picker> — Date Picker · Datepicker · set 17629:24427 (Kind Single|Double Calendar × Role Days|Month|Year Selector)
 * Raiz: pad 0 20 · gap 8 · Surface/default · Single 320 / Double 620 (dois meses lado a lado, gap 20).
 * Days: .Navigation Control + cabeçalho D S T Q Q S S (Label/Medium Text/medium) + até 6 .Week (gap 8, pb 8) + Selected Date.
 * Month / Year: lista de Main Buttons Ghost Neutral Medium (280 × 48, gap 4) em 288 de altura, com rolagem.
 * Selected Date: "Data Selecionada" (Caption/Medium) + "13/01/2026 até 24/01/2026" (Body/Medium).
 *
 * Atributos:
 *   kind (single|double · padrão single) · view (days|month|year — Role · padrão days)
 *   mode (single|range · padrão range: no Figma a amostra mostra as duas datas)
 *   value (single: AAAA-MM-DD) · start / end (range: AAAA-MM-DD) · month (AAAA-MM do 1º mês exibido; sem ele, o da seleção ou o atual)
 *   min / max (AAAA-MM-DD) · today (AAAA-MM-DD, para testes; padrão: hoje)
 *   selected-date-label ("Data Selecionada") · show-selected-dates (padrão ligado; só aparece com seleção)
 *   show-first-day-selected · show-last-day-selected (padrão ligados — Show First/Last Day Selected do Figma)
 *   label (nome da grade · "Calendário")
 * Teclado (grade do WAI-ARIA): setas ±1 dia / ±1 semana · Home/End início/fim da semana · PageUp/PageDown ±1 mês
 *   (Shift: ±1 ano) · Enter/Espaço seleciona.
 * Eventos: cds-change { value } (single) · cds-change { start, end } (range; end vazio no 1º clique)
 */
(function(){
  "use strict";
  var MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var WEEK = [["D","domingo"],["S","segunda-feira"],["T","terça-feira"],["Q","quarta-feira"],["Q","quinta-feira"],["S","sexta-feira"],["S","sábado"]];
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function iso(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s){ var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); if (!m) return null; var d = new Date(+m[1], +m[2] - 1, +m[3]); return d.getMonth() === +m[2] - 1 ? d : null; }
  function br(d){ return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear(); }
  function fromBr(s){ var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || ""); return m ? parse(m[3] + "-" + m[2] + "-" + m[1]) : null; }
  function addDays(d, n){ return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function addMonths(d, n){ var t = new Date(d.getFullYear(), d.getMonth() + n, 1), last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(); return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last)); }
  function same(a, b){ return !!a && !!b && a.getTime() === b.getTime(); }
  function longName(d){ return d.getDate() + " de " + MONTHS[d.getMonth()].toLowerCase() + " de " + d.getFullYear() + ", " + WEEK[d.getDay()][1]; }
  CDS.dates = { MONTHS: MONTHS, iso: iso, parse: parse, br: br, fromBr: fromBr, addDays: addDays, addMonths: addMonths };

  var uid = 0;
  class CdsDatePicker extends CDS.Element {
    static get observedAttributes(){ return ["kind","view","mode","value","start","end","month","min","max","today","selected-date-label","show-selected-dates","show-first-day-selected","show-last-day-selected","label"]; }
    constructor(){ super(); this._id = "cds-dp-" + (++uid); }
    get kind(){ return this.getAttribute("kind") === "double" ? "double" : "single"; }
    get view(){ var v = this.getAttribute("view"); return v === "month" || v === "year" ? v : "days"; }
    get mode(){ return this.getAttribute("mode") === "single" ? "single" : "range"; }
    get today(){ return parse(this.getAttribute("today")) || (function(){ var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })(); }
    get start(){ return parse(this.mode === "single" ? this.getAttribute("value") : this.getAttribute("start")); }
    get end(){ return this.mode === "single" ? null : parse(this.getAttribute("end")); }
    get min(){ return parse(this.getAttribute("min")); }
    get max(){ return parse(this.getAttribute("max")); }
    get anchor(){ // 1º mês exibido
      var m = /^(\d{4})-(\d{2})$/.exec(this.getAttribute("month") || "");
      if (m) return new Date(+m[1], +m[2] - 1, 1);
      var s = this.start || this.today; return new Date(s.getFullYear(), s.getMonth(), 1);
    }
    setMonth(d){ this.setAttribute("month", d.getFullYear() + "-" + pad(d.getMonth() + 1)); }

    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.nav = this.appendChild(CDS.create("cds-date-navigation", null, "cds-dp__nav"));
        this.body = this.appendChild(CDS.create("div", null, "cds-dp__body"));
        var sd = this.selEl = this.appendChild(CDS.create("div", { "aria-live": "polite" }, "cds-dp__selected"));
        this.selLabel = sd.appendChild(CDS.create("div", null, "cds-dp__sel-label"));
        var dates = sd.appendChild(CDS.create("div", null, "cds-dp__sel-dates"));
        this.selFirst = dates.appendChild(CDS.create("span", null, "cds-dp__sel-date"));
        this.selLast = dates.appendChild(CDS.create("span", null, "cds-dp__sel-last"));
        this.nav.addEventListener("cds-prev", function(){ self.shift(self.view === "month" ? -12 : -1); });
        this.nav.addEventListener("cds-next", function(){ self.shift(self.view === "month" ? 12 : 1); });
        this.nav.addEventListener("cds-month", function(e){ self._monthTarget = e.detail.which; self.setAttribute("view", "month"); });
        this.nav.addEventListener("cds-year", function(){ self.setAttribute("view", "year"); });
        this.body.addEventListener("click", function(e){
          var day = e.target.closest("cds-calendar-day[data-date]"); if (day && !day.hasAttribute("disabled")) return self.pick(parse(day.dataset.date));
          var mb = e.target.closest("[data-month]"); if (mb){ var a = self.anchor, idx = +mb.dataset.month; var first = new Date(a.getFullYear(), idx - (self._monthTarget === "trailing" ? 1 : 0), 1); self._monthTarget = null; self.setMonth(first); self.setAttribute("view", "days"); return; }
          var yb = e.target.closest("[data-year]"); if (yb){ self.setMonth(new Date(+yb.dataset.year, self.anchor.getMonth(), 1)); self.setAttribute("view", "days"); }
        });
        this.body.addEventListener("keydown", function(e){ self.onKey(e); });
      }
      CDS.attr(this, "kind", this.kind === "double" ? "double" : null);
      var v = this.view, a = this.anchor, dbl = this.kind === "double";
      // Navigation Control por Role (como no Figma): Days = tudo · Month = setas + Ano · Year = nada (só a lista)
      CDS.attr(this.nav, "first-month", MONTHS[a.getMonth()]);
      CDS.attr(this.nav, "year", String(a.getFullYear()));
      CDS.attr(this.nav, "trailing-month", MONTHS[(a.getMonth() + 1) % 12]);
      CDS.attr(this.nav, "show-first-month", v === "days" ? null : "false");
      CDS.attr(this.nav, "show-trailing-month", v === "days" && dbl ? null : "false");
      CDS.attr(this.nav, "show-year", v === "year" ? "false" : null);
      CDS.attr(this.nav, "show-left-control", v === "year" ? "false" : null);
      CDS.attr(this.nav, "show-right-control", v === "year" ? "false" : null);
      this.body.innerHTML = "";
      if (v === "days") this.renderDays(a, dbl); else if (v === "month") this.renderList("month"); else this.renderList("year");
      this.renderSelected();
    }

    renderDays(a, dbl){
      var wrap = this.body.appendChild(CDS.create("div", null, "cds-dp__months"));
      var months = dbl ? [a, new Date(a.getFullYear(), a.getMonth() + 1, 1)] : [a];
      var focus = this._focus && this.inShown(this._focus) ? this._focus : null, self = this, firstFocusable = null;
      months.forEach(function(m, mi){
        var cal = wrap.appendChild(CDS.create("div", { role: "grid", "aria-label": MONTHS[m.getMonth()] + " de " + m.getFullYear() }, "cds-dp__calendar"));
        var head = cal.appendChild(CDS.create("div", { role: "row" }, "cds-dp__weekdays"));
        WEEK.forEach(function(w){ var c = head.appendChild(CDS.create("div", { role: "columnheader", "aria-label": w[1] }, "cds-dp__weekday")); c.appendChild(CDS.create("span", { "aria-hidden": "true" })).textContent = w[0]; });
        var weeks = cal.appendChild(CDS.create("div", { role: "rowgroup" }, "cds-dp__weeks"));
        var first = new Date(m.getFullYear(), m.getMonth(), 1), days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
        var cells = []; for (var i = 0; i < first.getDay(); i++) cells.push(null); for (var d = 1; d <= days; d++) cells.push(new Date(m.getFullYear(), m.getMonth(), d));
        while (cells.length % 7) cells.push(null);
        for (var w = 0; w < cells.length / 7; w++){
          var row = CDS.create("cds-calendar-week", { role: "row" }); // preenche antes de conectar (sem filhos, o .Week gera a amostra)
          for (var k = 0; k < 7; k++){
            var date = cells[w * 7 + k];
            if (!date){ row.appendChild(CDS.create("div", { role: "gridcell" }, "cds-dp__cell")); continue; }
            var st = self.dayState(date);
            var day = CDS.create("cds-calendar-day", { role: "gridcell", label: String(date.getDate()), "date-label": longName(date),
              selected: st.selected ? "" : null, "role-kind": st.role, current: same(date, self.today) ? "" : null, disabled: st.disabled ? "" : null });
            day.dataset.date = iso(date); day.setAttribute("aria-selected", String(!!st.selected));
            row.appendChild(day);
            if (!firstFocusable && !st.disabled) firstFocusable = date;
          }
          weeks.appendChild(row);
        }
      });
      // foco itinerante: o dia focado, senão o início da seleção, hoje ou o 1º dia do mês
      var target = focus || (this.start && this.inShown(this.start) ? this.start : (this.inShown(this.today) ? this.today : firstFocusable));
      this.body.querySelectorAll("cds-calendar-day[data-date]").forEach(function(d){ if (d.button) d.button.tabIndex = d.dataset.date === iso(target) ? 0 : -1; });
      if (this._refocus){ this._refocus = false; var t = this.body.querySelector('cds-calendar-day[data-date="' + iso(target) + '"]'); if (t && t.button) t.button.focus(); }
    }
    inShown(d){ var a = this.anchor, last = new Date(a.getFullYear(), a.getMonth() + (this.kind === "double" ? 2 : 1), 0); return d >= a && d <= last; }
    dayState(d){
      var s = this.start, e = this.end, min = this.min, max = this.max, r = { selected: false, role: "default", disabled: (min && d < min) || (max && d > max) };
      if (s && e && !same(s, e)){
        if (same(d, s)){ r.selected = true; r.role = "start"; } else if (same(d, e)){ r.selected = true; r.role = "end"; } else if (d > s && d < e){ r.selected = true; r.role = "middle"; }
      } else if (s && same(d, s)) r.selected = true;
      return r;
    }
    renderList(type){
      var list = this.body.appendChild(CDS.create("div", { role: "group", "aria-label": type === "month" ? "Meses" : "Anos" }, "cds-dp__list"));
      var a = this.anchor, cur = type === "month" ? a.getMonth() : a.getFullYear(), sel = null;
      var items = type === "month" ? MONTHS.map(function(n, i){ return [i, n]; }) : (function(){ var out = [], y1 = Math.max(a.getFullYear(), new Date().getFullYear()) + 10; for (var y = 1950; y <= y1; y++) out.push([y, String(y)]); return out; })();
      items.forEach(function(it){
        var b = list.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "neutral", size: "medium", label: it[1], "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dp__item"));
        b.dataset[type] = it[0];
        var ib = b.querySelector("button"); if (ib && it[0] === cur) ib.setAttribute("aria-current", "true");
        if (it[0] === cur) sel = b;
      });
      if (sel) requestAnimationFrame(function(){ sel.scrollIntoView({ block: "center" }); });
    }
    renderSelected(){
      var s = this.start, e = this.end, show = this.flag("show-selected-dates") && !!s;
      this.selEl.hidden = !show;
      this.selLabel.textContent = this.text("selected-date-label", "Data Selecionada");
      this.selFirst.textContent = s ? br(s) : "";
      this.selFirst.hidden = !this.flag("show-first-day-selected");
      this.selLast.hidden = !(e && !same(e, s)) || !this.flag("show-last-day-selected");
      this.selLast.innerHTML = ""; if (e){ this.selLast.appendChild(CDS.create("span")).textContent = "até"; this.selLast.appendChild(CDS.create("span", null, "cds-dp__sel-date")).textContent = br(e); }
    }

    pick(d){
      if (!d) return;
      this._focus = d; this._refocus = true;
      if (this.mode === "single"){
        this.setAttribute("value", iso(d));
        return this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: iso(d) }, bubbles: true }));
      }
      var s = this.start, e = this.end;
      if (!s || e){ this.setAttribute("start", iso(d)); this.removeAttribute("end"); }        // 1º clique: novo início
      else if (d < s){ this.setAttribute("start", iso(d)); this.setAttribute("end", iso(s)); }   // antes do início: inverte
      else this.setAttribute("end", iso(d));
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { start: this.getAttribute("start"), end: this.getAttribute("end") || "" }, bubbles: true }));
    }
    shift(n){ var a = this.anchor; this.setMonth(new Date(a.getFullYear(), a.getMonth() + n, 1)); }
    onKey(e){
      var day = e.target.closest && e.target.closest("cds-calendar-day[data-date]"); if (!day) return;
      var d = parse(day.dataset.date), n = null;
      switch (e.key){
        case "ArrowLeft": n = addDays(d, -1); break; case "ArrowRight": n = addDays(d, 1); break;
        case "ArrowUp": n = addDays(d, -7); break; case "ArrowDown": n = addDays(d, 7); break;
        case "Home": n = addDays(d, -d.getDay()); break; case "End": n = addDays(d, 6 - d.getDay()); break;
        case "PageUp": n = addMonths(d, e.shiftKey ? -12 : -1); break; case "PageDown": n = addMonths(d, e.shiftKey ? 12 : 1); break;
        case "Enter": case " ": e.preventDefault(); if (!day.hasAttribute("disabled")) this.pick(d); return;
        default: return;
      }
      e.preventDefault();
      this._focus = n; this._refocus = true;
      if (!this.inShown(n)){ var a = this.anchor, off = (n.getFullYear() - a.getFullYear()) * 12 + n.getMonth() - a.getMonth(); this.shift(off < 0 ? off : off - (this.kind === "double" ? 1 : 0)); }
      else this.render();
    }
    focusDay(){ this._refocus = true; this.render(); }
  }
  CdsDatePicker.define("cds-date-picker");
})();
} catch (e) { console.error("[cds] components/date-picker/date-picker.js", e); }

/* ==== components/date-picker/date-picker.playground.js ==== */
try {
/* Playground — Date Picker */
CDS.register({
  id: "date-picker", name: "Date Picker", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17629-24427",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-date-picker", { start: "2026-01-13", end: "2026-01-24", month: "2026-01" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value || (e.detail.start + (e.detail.end ? " → " + e.detail.end : " → …")), false); });
    kit.hint(panel, "Amostra: 13 a 24/01/2026 (no Figma o texto é de 2023, C56). Clique no mês ou no ano para trocar de Role. Setas, Home/End e PageUp/PageDown navegam; Enter seleciona.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], onChange: function(v){ kit.attr(p, "kind", v === "single" ? null : v); } });
    kit.seg(panel, { label: "Role", value: "days", options: [["days","Days"],["month","Month"],["year","Year"]], onChange: function(v){ kit.attr(p, "view", v === "days" ? null : v); } });
    kit.seg(panel, { label: "Seleção", value: "range", options: [["range","Intervalo"],["single","Data única"]], hint: "No Figma a seleção é texto (First/Last Day Selected); aqui vem do clique.", onChange: function(v){ kit.attr(p, "mode", v === "range" ? null : v); if (v === "single"){ p.setAttribute("value", "2026-01-13"); } } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Selected Dates", checked: true, onChange: function(on){ kit.attr(p, "show-selected-dates", on ? null : "false"); } });
    [["show-first-day-selected","Show First Day Selected"],["show-last-day-selected","Show Last Day Selected"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Selected Date Label", value: "Data Selecionada", onInput: function(v){ p.setAttribute("selected-date-label", v); } });
    kit.text(panel, { label: "Mínimo (AAAA-MM-DD)", value: "", placeholder: "2026-01-05", onInput: function(v){ kit.attr(p, "min", v || null); } });
  }
});
} catch (e) { console.error("[cds] components/date-picker/date-picker.playground.js", e); }

/* ==== components/drop-button/drop-button.js ==== */
try {
/**
 * @deps main-button icon
 * <cds-drop-button> — Drop Button · Buttons · set 6955:6985
 * Botão que abre um menu/popover. O clique alterna Is Active (aria-expanded) e o chevron.
 * O conteúdo aberto é de quem implementa: escute o evento cds-toggle {active}.
 *
 * Atributos (padrões do Figma):
 *   label · kind · appearance · size · disabled · lead-icon · show-lead-icon (como o Main Button)
 *   active   Is Active — presente = aberto (dropdown-close-line)
 */
(function(){
  "use strict";
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsDropButton extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "active"]; }
    get button(){ return this._btn; }
    focus(o){ if (this._btn) this._btn.focus(o); }
    render(){
      var self = this, first = !this._btn;
      var b = this._btn || document.createElement("button");
      b.className = "cds-btn"; b.type = "button"; b.disabled = this.hasAttribute("disabled");
      var active = this.hasAttribute("active");
      b.setAttribute("aria-expanded", String(active)); if (!b.hasAttribute("aria-haspopup")) b.setAttribute("aria-haspopup", "true"); // o Popover troca para "dialog"
      b.innerHTML = "";
      this.leadEl = null;
      if (this.flag("show-lead-icon")){ this.leadEl = icon(this.getAttribute("lead-icon") || "placeholder-line"); b.appendChild(this.leadEl); }
      var t = document.createElement("span"); t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; b.appendChild(t);
      this.trailEl = icon(active ? "dropdown-close-line" : "dropdown-open-line"); b.appendChild(this.trailEl);
      if (first){
        this._btn = b; this.appendChild(b);
        b.addEventListener("click", function(){
          self.toggleAttribute("active");
          self.dispatchEvent(new CustomEvent("cds-toggle", { detail: { active: self.hasAttribute("active") }, bubbles: true }));
        });
      }
    }
  }
  CdsDropButton.define("cds-drop-button");
})();
} catch (e) { console.error("[cds] components/drop-button/drop-button.js", e); }

/* ==== components/drop-button/drop-button.playground.js ==== */
try {
/* Playground — Drop Button */
CDS.register({
  id: "drop-button", name: "Drop Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6955-6985",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); max-width:100%;" });
    var p = kit.el("cds-drop-button", { label: "Label", kind: "default", appearance: "accent", size: "medium" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    var activeSw;
    p.addEventListener("cds-toggle", function(e){ activeSw.checked = e.detail.active; ctx.readout(e.detail.active ? "aberto" : "fechado", false); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    activeSw = kit.toggle(panel, { label: "Is Active (aberto)", onChange: function(on){ set("active", on); } });
    kit.hint(panel, "Clicar no botão também alterna Is Active (aria-expanded).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ set("show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ set("lead-icon", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Trailing Item", exposed: false, note: "Chevron fixo; troca com Is Active.",
      props: function(){ return [["Icon", p.trailEl ? p.trailEl.getAttribute("icon") : "—"], ["Is Active", String(p.hasAttribute("active"))]]; } });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/drop-button/drop-button.playground.js", e); }

/* ==== components/footer/footer.js ==== */
try {
/**
 * @deps main-button divider
 * <cds-footer> — .Footer (Modal / Bottom Sheet) · building block · set 16359:1792
 * Divider + Actions: Main Button Neutral (secundária) e Accent (primária).
 * Kind=Horizontal: lado a lado, largura do conteúdo · Kind=Pilled: empilhados, largura total.
 * Atributos: kind (horizontal|pilled · padrão pilled, como no Figma) · show-divider · show-secondary-action-button
 *   primary-label · secondary-label ("Label") · show-lead-icon (Lead Icon dos botões, ligado como no Figma)
 *   primary-icon · secondary-icon
 * Eventos: cds-action { action: "primary" | "secondary" }
 */
(function(){
  "use strict";
  class CdsFooter extends CDS.Element {
    static get observedAttributes(){ return ["kind","show-divider","show-secondary-action-button","show-secondary-action","primary-label","secondary-label","show-lead-icon","primary-icon","secondary-icon"]; }
    get secondaryFlag(){ return this.flag("show-secondary-action-button") && this.flag("show-secondary-action"); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.divEl = this.appendChild(CDS.create("cds-divider", { intensity: "soft" }));
        var a = this.actionsEl = this.appendChild(CDS.create("div", null, "cds-footer__actions"));
        this.secEl = a.appendChild(CDS.create("cds-main-button", { appearance: "neutral", "show-trailing-icon": "false" }));
        this.priEl = a.appendChild(CDS.create("cds-main-button", { appearance: "accent", "show-trailing-icon": "false" }));
        this.secEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { action: "secondary" }, bubbles: true })); });
        this.priEl.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { action: "primary" }, bubbles: true })); });
      }
      if (!this.hasAttribute("kind")) this.setAttribute("kind", this.defaultKind);
      this.divEl.hidden = !this.flag("show-divider");
      this.secEl.hidden = !this.secondaryFlag;
      var lead = this.flag("show-lead-icon") ? null : "false";
      [[this.priEl, "primary"], [this.secEl, "secondary"]].forEach(function(x){
        x[0].setAttribute("label", self.text(x[1] + "-label", "Label"));
        if (lead) x[0].setAttribute("show-lead-icon", lead); else x[0].removeAttribute("show-lead-icon");
        x[0].setAttribute("lead-icon", self.getAttribute(x[1] + "-icon") || "placeholder-line");
      });
    }
    get defaultKind(){ return "pilled"; }
  }
  CDS.Footer = CdsFooter;
  CdsFooter.define("cds-footer");
})();
} catch (e) { console.error("[cds] components/footer/footer.js", e); }

/* ==== components/footer/footer.playground.js ==== */
try {
/* Playground — .Footer (building block) */
CDS.register({
  id: "footer", name: ".Footer", category: "Overlays", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16359-1792",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-footer", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-action", function(e){ ctx.readout("cds-action · " + e.detail.action, false); });
    kit.hint(panel, "Modal usa Horizontal; Bottom Sheet usa Pilled. Os dois sem Divider.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "pilled", options: [["pilled","Pilled"],["horizontal","Horizontal"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.section(panel, "Booleans");
    [["show-secondary-action-button","Show Secondary Action Button"],["show-divider","Show Divider"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.toggle(panel, { label: "Show Lead Icon (botões)", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Primary Label", value: "Label", onInput: function(v){ p.setAttribute("primary-label", v); } });
    kit.text(panel, { label: "Secondary Label", value: "Label", onInput: function(v){ p.setAttribute("secondary-label", v); } });
  }
});
} catch (e) { console.error("[cds] components/footer/footer.playground.js", e); }

/* ==== components/fixed-bar/fixed-bar.js ==== */
try {
/**
 * @deps footer
 * <cds-fixed-bar> — [Beta] Fixed Bar · componente 24037:2929
 * Barra de ações ancorada no fim da tela: Divider + Action Buttons, mesma estrutura do .Footer.
 * Kind=Horizontal (padrão): botões no tamanho do conteúdo · Kind=Pilled: empilhados, largura total.
 * Atributos: os do .Footer (show-secondary-action no lugar de show-secondary-action-button) · fixed (position:fixed no fim da viewport)
 */
(function(){
  "use strict";
  class CdsFixedBar extends CDS.Footer {
    get defaultKind(){ return "horizontal"; }
    connectedCallback(){ super.connectedCallback(); this.setAttribute("role", "region"); if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Ações"); }
  }
  CdsFixedBar.define("cds-fixed-bar");
})();
} catch (e) { console.error("[cds] components/fixed-bar/fixed-bar.js", e); }

/* ==== components/fixed-bar/fixed-bar.playground.js ==== */
try {
/* Playground — [Beta] Fixed Bar */
CDS.register({
  id: "fixed-bar", name: "[Beta] Fixed Bar", category: "Containers", status: "beta", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=24037-2929",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-fixed-bar", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-action", function(e){ ctx.readout("cds-action · " + e.detail.action, false); });
    kit.hint(panel, "Na tela, use o atributo <code>fixed</code> para ancorar no fim da viewport.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "horizontal", options: [["horizontal","Horizontal"],["pilled","Pilled"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.section(panel, "Booleans");
    [["show-divider","Show Divider"],["show-secondary-action","Show Secondary Action"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Primary Label", value: "Label", onInput: function(v){ p.setAttribute("primary-label", v); } });
    kit.text(panel, { label: "Secondary Label", value: "Label", onInput: function(v){ p.setAttribute("secondary-label", v); } });
  }
});
} catch (e) { console.error("[cds] components/fixed-bar/fixed-bar.playground.js", e); }

/* ==== components/nav-control-item/nav-control-item.js ==== */
try {
/**
 * @deps —
 * <cds-nav-control-item> — .Item Nav Control · .Building Blocks · set 19188:379
 * Indicador de posição: pad 4 · Indicator pill 6×6 (Is Active: 16×6).
 * Accent: Neutral/Solid/semi-intense · ativo Accent/Solid/medium · Inversed: Neutral/Opacity/Soft/semi-opaque · ativo Neutral/Solid/soft.
 * Atributos: appearance (accent|inversed · padrão accent) · is-active. Decorativo (aria-hidden): o Nav Control anuncia a posição.
 */
(function(){
  "use strict";
  class CdsNavControlItem extends CDS.Element {
    render(){ if (!this.firstChild) this.appendChild(CDS.create("span", null, "cds-nci__dot")); this.setAttribute("aria-hidden", "true"); }
  }
  CdsNavControlItem.define("cds-nav-control-item");
})();
} catch (e) { console.error("[cds] components/nav-control-item/nav-control-item.js", e); }

/* ==== components/nav-control-item/nav-control-item.playground.js ==== */
try {
/* Playground — .Item Nav Control (building block) */
CDS.register({
  id: "nav-control-item", name: ".Item Nav Control", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=19188-379",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, wrap = kit.el("div", { style: "padding:var(--common-sizes-8)" });
    var p = kit.el("cds-nav-control-item", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ kit.attr(p, "appearance", v === "accent" ? null : v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "is-active", on); } });
  }
});
} catch (e) { console.error("[cds] components/nav-control-item/nav-control-item.playground.js", e); }

/* ==== components/nav-control/nav-control.js ==== */
try {
/**
 * @deps nav-control-item icon-button
 * <cds-nav-control> — Nav Control · Navigation · set 19560:3280 (Appearance Accent|Inversed)
 * Posição atual e total de itens de um carrossel (description do Figma). Os indicadores são só leitura, não clicáveis.
 * Mobile (Common/Is Mobile): só os indicadores · Desktop (Common/Is Desktop): indicadores + setas (Icon Button Ghost Small),
 * pad-left 12, espaçados (SPACE_BETWEEN). No Tablet as duas variáveis são falsas e nada aparece (como no Figma, C46).
 * Avanço circular do último ao primeiro. 10 posições fixas.
 * Atributos: appearance (accent|inversed) · current (1-based · padrão 1) · total (até 10 · padrão 10) · viewport
 *   prev-label ("Anterior") · next-label ("Próximo") · label ("Item {n} de {total}")
 * Eventos: cds-change { current, direction } — o carrossel ouve e troca o slide. Métodos: next() · prev()
 */
(function(){
  "use strict";
  class CdsNavControl extends CDS.Element {
    static get observedAttributes(){ return ["appearance","current","total","prev-label","next-label","label"]; }
    get total(){ return Math.min(10, Math.max(1, parseInt(this.getAttribute("total"), 10) || 10)); }
    get current(){ var c = parseInt(this.getAttribute("current"), 10) || 1; return Math.min(Math.max(1, c), this.total); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.dotsEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-nc__dots"));
        this.liveEl = this.appendChild(CDS.create("span", { "aria-live": "polite" }, "cds-nc__live"));
        var btns = this.btnsEl = this.appendChild(CDS.create("div", null, "cds-nc__btns"));
        this.prevBtn = btns.appendChild(CDS.create("cds-icon-button", { kind: "ghost", size: "small", icon: "navigation-left-line" }));
        this.nextBtn = btns.appendChild(CDS.create("cds-icon-button", { kind: "ghost", size: "small", icon: "navigation-right-line" }));
        this.prevBtn.addEventListener("click", function(){ self.prev(); });
        this.nextBtn.addEventListener("click", function(){ self.next(); });
      }
      var app = this.getAttribute("appearance") === "inversed" ? "inversed" : "accent", n = this.total, cur = this.current;
      while (this.dotsEl.children.length < n) this.dotsEl.appendChild(CDS.create("cds-nav-control-item"));
      while (this.dotsEl.children.length > n) this.dotsEl.lastChild.remove();
      [].forEach.call(this.dotsEl.children, function(d, i){ CDS.attr(d, "appearance", app === "inversed" ? "inversed" : null); CDS.attr(d, "is-active", i + 1 === cur ? "" : null); });
      [this.prevBtn, this.nextBtn].forEach(function(b){ CDS.attr(b, "appearance", app === "inversed" ? "inversed" : "neutral"); });
      CDS.attr(this.prevBtn, "label", this.getAttribute("prev-label") || "Anterior");
      CDS.attr(this.nextBtn, "label", this.getAttribute("next-label") || "Próximo");
      var t = (this.getAttribute("label") || "Item {n} de {total}").replace("{n}", cur).replace("{total}", n);
      if (this.liveEl.textContent !== t) this.liveEl.textContent = t;
      this.setAttribute("role", "group"); CDS.attr(this, "aria-roledescription", "controle do carrossel");
    }
    go(d){
      var n = this.total, c = ((this.current - 1 + d) % n + n) % n + 1; // circular
      this.setAttribute("current", String(c));
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { current: c, direction: d > 0 ? "next" : "prev" }, bubbles: true }));
    }
    next(){ this.go(1); } prev(){ this.go(-1); }
  }
  CdsNavControl.define("cds-nav-control");
})();
} catch (e) { console.error("[cds] components/nav-control/nav-control.js", e); }

/* ==== components/nav-control/nav-control.playground.js ==== */
try {
/* Playground — Nav Control */
CDS.register({
  id: "nav-control", name: "Nav Control", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=19560-3280",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, wrap = kit.el("div", { style: "padding:var(--common-sizes-16)" });
    var p = kit.el("cds-nav-control", {}); wrap.appendChild(p); ctx.preview.appendChild(wrap);
    p.addEventListener("cds-change", function(e){ ctx.readout("Item " + e.detail.current + " (" + e.detail.direction + ")", false); });
    kit.hint(panel, "Só leitura: os indicadores não são clicáveis. No desktop as setas avançam em círculo. Viewport 360 = só indicadores; 744 = nada aparece (Is Mobile e Is Desktop falsos no Figma, C46).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["inversed","Inversed"]], hint: "Inversed vai sobre Surface/accent ou Surface/inversed (description).", onChange: function(v){ kit.attr(p, "appearance", v === "accent" ? null : v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.range(panel, { label: "Total", min: 2, max: 10, value: 10, onInput: function(v){ p.setAttribute("total", v); } });
  }
});
} catch (e) { console.error("[cds] components/nav-control/nav-control.playground.js", e); }

/* ==== components/nps-value-item/nps-value-item.js ==== */
try {
/**
 * @deps —
 * <cds-nps-value-item> — .Value Item · .Building Blocks · set 10100:1137 (State × Status)
 * Pílula 24 · Caption/Bold. Unselected: Surface/01 + Text/medium · Hovered: + stroke Accent/Solid/medium ·
 * Pressed: Accent/Solid/soft + stroke · Selected: Surface/accent + Text/inversed · Selected Hovered: stroke Border/intense ·
 * Selected Pressed: Accent/Solid/soft + Text/intense. Motion: 150ms + Systemic/accelerate.
 * É um <label> com um <input type="radio"> nativo (o NPS Score faz o grupo).
 * Atributos: value ("10") · selected · disabled · name · state (specimen)
 */
(function(){
  "use strict";
  class CdsNpsValueItem extends CDS.Element {
    static get observedAttributes(){ return ["value","selected","disabled","name"]; }
    get input(){ return this._in; }
    render(){
      if (!this._in){
        var l = this.appendChild(CDS.create("label", null, "cds-nvi"));
        this._in = l.appendChild(CDS.create("input", { type: "radio" }, "cds-nvi__input"));
        this._tx = l.appendChild(CDS.create("span", null, "cds-nvi__value"));
        var self = this; this._in.addEventListener("change", function(){ self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: self._in.value }, bubbles: true })); });
      }
      var v = this.text("value", "10");
      this._tx.textContent = v; this._in.value = v;
      this._in.checked = this.hasAttribute("selected"); this._in.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._in.name = this.getAttribute("name");
    }
  }
  CdsNpsValueItem.define("cds-nps-value-item");
})();
} catch (e) { console.error("[cds] components/nps-value-item/nps-value-item.js", e); }

/* ==== components/nps-value-item/nps-value-item.playground.js ==== */
try {
/* Playground — .Value Item (NPS, building block) */
CDS.register({
  id: "nps-value-item", name: ".Value Item", category: "Rating Score", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-1137",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-nps-value-item", {}); ctx.preview.appendChild(p);
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.seg(panel, { label: "Status", value: "unselected", options: [["unselected","Unselected"],["selected","Selected"]], onChange: function(v){ kit.attr(p, "selected", v === "selected"); } });
  }
});
} catch (e) { console.error("[cds] components/nps-value-item/nps-value-item.playground.js", e); }

/* ==== components/nps-score/nps-score.js ==== */
try {
/**
 * @deps nps-value-item
 * <cds-nps-score> — NPS Score · Rating Score · set 10100:848 (State Enabled|Disabled × Selected Value None|0–10)
 * 11 .Value Item (0 a 10) em linha · gap 4 · pad 24 0 · Surface/default · Disabled: Opacity/medium.
 * Acessibilidade: radiogroup nativo (setas trocam o valor); cada opção é anunciada como "n de 10".
 * Atributos: value (0–10 ou vazio) · disabled · label (nome do grupo · "Nota de 0 a 10") · name
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsNpsScore extends CDS.Element {
    static get observedAttributes(){ return ["value","disabled","label","name"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._name = "cds-nps-" + (++uid); this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        for (var i = 0; i <= 10; i++) this.appendChild(CDS.create("cds-nps-value-item", { value: String(i) }));
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.setAttribute("value", e.detail.value); self.dispatchEvent(new CustomEvent("cds-change", { detail: { value: +e.detail.value }, bubbles: true })); });
      }
      var v = this.getAttribute("value"), dis = this.hasAttribute("disabled"), name = this.getAttribute("name") || this._name;
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Nota de 0 a 10");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      [].forEach.call(this.children, function(it){
        var iv = it.getAttribute("value");
        CDS.attr(it, "selected", v !== null && v !== "" && iv === String(+v) ? "" : null); CDS.attr(it, "disabled", dis ? "" : null); CDS.attr(it, "name", name);
        if (it.input) it.input.setAttribute("aria-label", iv + " de 10");
      });
    }
  }
  CdsNpsScore.define("cds-nps-score");
})();
} catch (e) { console.error("[cds] components/nps-score/nps-score.js", e); }

/* ==== components/nps-score/nps-score.playground.js ==== */
try {
/* Playground — NPS Score */
CDS.register({
  id: "nps-score", name: "NPS Score", category: "Rating Score", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10100-848",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-nps-score", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Nota " + e.detail.value, true); });
    kit.hint(panel, "Grupo de rádio nativo: Tab entra, setas trocam a nota.");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    var opts = [["none","None"]]; for (var i = 0; i <= 10; i++) opts.push([String(i), String(i)]);
    kit.select(panel, { label: "Selected Value", value: "none", options: opts, onChange: function(v){ kit.attr(p, "value", v === "none" ? null : v); } });
  }
});
} catch (e) { console.error("[cds] components/nps-score/nps-score.playground.js", e); }

/* ==== components/popover/popover.js ==== */
try {
/**
 * @deps —
 * <cds-popover> — Popover · Popovers · componente 2270:102
 * Overlay contextual ancorado num elemento (description do Figma). Surface/default · raio large · Elevation/level 3 · pad 8.
 * O conteúdo é o Slot (filhos de quem usa).
 *
 * Usa a Popover API nativa (camada de topo, Esc e clique fora fecham, foco volta ao gatilho).
 * Atributos:
 *   for        id do gatilho. Botão comum ou <cds-drop-button>/<cds-main-button>/<cds-icon-button>: o clique abre e fecha.
 *              Com Drop Button, o Is Active (chevron) acompanha o estado do popover.
 *   placement  bottom-start (padrão) | bottom-end | bottom | top
 *   inline     mostra fixo no fluxo, sem abrir/fechar (specimen)
 *   label      nome acessível do painel
 * Métodos: show() · hide() · toggle()   Eventos: cds-toggle { open }
 */
(function(){
  "use strict";
  var uid = 0;
  function innerButton(t){ return t && (t.tagName === "BUTTON" ? t : t.querySelector("button")); }
  class CdsPopover extends CDS.Element {
    static get observedAttributes(){ return ["for", "inline", "label"]; }
    render(){
      var self = this;
      if (!this.id) this.id = "cds-popover-" + (++uid);
      if (!this._built){
        this._built = true;
        var slot = CDS.create("div", null, "cds-popover__slot"); while (this.firstChild) slot.appendChild(this.firstChild); this.appendChild(slot); this.slotEl = slot;
        this.addEventListener("toggle", function(e){
          var open = e.newState === "open";
          if (open) self.place();
          var t = self._trigger;
          if (t && t.tagName === "CDS-DROP-BUTTON" && t.hasAttribute("active") !== open) t.toggleAttribute("active", open);
          var b = innerButton(t); if (b) b.setAttribute("aria-expanded", String(open));
          self.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: open }, bubbles: true }));
        });
        this._onScroll = function(){ if (self.matches(":popover-open")) self.place(); };
      }
      var inline = this.hasAttribute("inline");
      if (inline){ this.removeAttribute("popover"); } else if (this.getAttribute("popover") == null) this.setAttribute("popover", "auto");
      this.setAttribute("role", "dialog");
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
      this.bind();
    }
    bind(){
      var id = this.getAttribute("for"), t = id && document.getElementById(id);
      if (t === this._trigger) return;
      this._trigger = t;
      if (!t || this.hasAttribute("inline")) return;
      var self = this;
      // O próprio Drop Button já alterna o Is Active no clique; aqui só ligamos o botão interno ao popover
      // síncrono quando o botão interno já existe (gatilho antes do popover no DOM); senão, na próxima tarefa
      // (sem requestAnimationFrame: ele não roda com a aba oculta)
      function link(){
        var b = innerButton(t); if (!b) return;
        if ("popoverTargetElement" in b) b.popoverTargetElement = self;
        else b.addEventListener("click", function(){ self.toggle(); }); // fallback sem Popover API
        b.setAttribute("aria-controls", self.id); b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-expanded", "false");
      }
      if (innerButton(t)) link(); else setTimeout(link);
    }
    place(){ if (this._trigger) CDS.position(this._trigger, this, { placement: this.getAttribute("placement") || "bottom-start" }); }
    show(){ if (this.showPopover) this.showPopover(); }
    hide(){ if (this.hidePopover && this.matches(":popover-open")) this.hidePopover(); }
    toggle(){ if (this.togglePopover) this.togglePopover(); }
    connectedCallback(){ super.connectedCallback(); window.addEventListener("resize", this._onScroll); window.addEventListener("scroll", this._onScroll, true); }
    disconnectedCallback(){ window.removeEventListener("resize", this._onScroll); window.removeEventListener("scroll", this._onScroll, true); }
  }
  CdsPopover.define("cds-popover");
})();
} catch (e) { console.error("[cds] components/popover/popover.js", e); }

/* ==== components/popover/popover.playground.js ==== */
try {
/* Playground — Popover (aberto por um Drop Button, D41) */
CDS.register({
  id: "popover", name: "Popover", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2270-102",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:flex;flex-direction:column;align-items:flex-start;gap:var(--common-sizes-16)" });
    var trig = kit.el("cds-drop-button", { id: "pg-pop-trigger", label: "Opções", appearance: "neutral" });
    function content(){ return [
      kit.el("strong", { text: "Popover", style: "font:var(--text-style-body-bold);padding:var(--common-sizes-8)" }),
      kit.el("span", { text: "Conteúdo contextual ancorado no gatilho. Esc ou clique fora fecham.", style: "font:var(--text-style-caption-regular);color:var(--common-colors-text-medium);padding:0 var(--common-sizes-8) var(--common-sizes-8)" })
    ]; }
    var spec = kit.el("cds-popover", { inline: true, label: "Specimen do Popover", style: "width:220px" }, content());
    var pop = kit.el("cds-popover", { "for": "pg-pop-trigger", label: "Opções", style: "width:220px" }, content());
    stage.appendChild(spec); stage.appendChild(trig); stage.appendChild(pop); ctx.preview.appendChild(stage);
    pop.addEventListener("cds-toggle", function(e){ ctx.readout(e.detail.open ? "aberto" : "fechado", false); });
    kit.hint(panel, "Em cima, o specimen (como no Figma). Embaixo, o Popover de verdade: clique no Drop Button; o chevron (Is Active) acompanha.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Placement", value: "bottom-start", options: [["bottom-start","Bottom start"],["bottom","Bottom"],["bottom-end","Bottom end"],["top","Top"]], hint: "Adaptação para web: sem espaço, inverte para cima ou para baixo.", onChange: function(v){ kit.attr(pop, "placement", v === "bottom-start" ? null : v); } });
  }
});
} catch (e) { console.error("[cds] components/popover/popover.playground.js", e); }

/* ==== components/breadcrumb/breadcrumb.js ==== */
try {
/**
 * @deps breadcrumb-item popover
 * <cds-breadcrumb> — Breadcrumb · Navigation · set 6792:24
 * Caminho de páginas: <nav aria-label="Breadcrumb"><ol> com um .Item por nível.
 * Como no Figma: o 1º item é Truncate (…), que abre um Popover com os níveis escondidos (Show Popover).
 *
 * Uso: filhos <a href="…">Nível</a> (o último é a página atual: aria-current) ou nada (amostra do Figma).
 *   collapse — quantos níveis iniciais ficam no Popover do "…" · padrão 1 com filhos; "0" desliga o Truncate
 * Atributos da amostra: show-item03…show-item06 (showItem03–06 no Figma, C25) · show-popover · label ("Breadcrumb")
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsBreadcrumb extends CDS.Element {
    static get observedAttributes(){ return ["collapse","show-item03","show-item04","show-item05","show-item06","show-popover","label"]; }
    render(){
      var self = this;
      if (this._sync && this._built) return; // só refletindo o estado do Popover no atributo
      if (!this._built){
        this._built = true; this._id = "cds-bcr-" + (++uid);
        this._links = [].slice.call(this.querySelectorAll(":scope > a")).map(function(a){ return { label: a.textContent.trim(), href: a.getAttribute("href"), active: a.hasAttribute("aria-current") }; });
        this.innerHTML = "";
        this.navEl = this.appendChild(CDS.create("nav", null, "cds-bcr"));
        this.listEl = this.navEl.appendChild(CDS.create("ol", null, "cds-bcr__list"));
        // a lista entra antes de o Popover conectar: no connect ele move os filhos para o Slot
        this.pop = CDS.create("cds-popover", { placement: "bottom-start", label: "Níveis anteriores" }, "cds-bcr__popover");
        this.popList = this.pop.appendChild(CDS.create("ul", null, "cds-bcr__poplist"));
        this.appendChild(this.pop);
        this.pop.addEventListener("cds-toggle", function(e){
          e.stopPropagation();
          var b = self.truncEl && self.truncEl.control; if (b) b.setAttribute("aria-expanded", String(e.detail.open));
          self._sync = true; self.toggleAttribute("show-popover", e.detail.open); self._sync = false;
        });
      }
      this.navEl.setAttribute("aria-label", this.getAttribute("label") || "Breadcrumb");
      var items = this.model(), list = this.listEl, pl = this.popList;
      list.innerHTML = ""; pl.innerHTML = "";
      items.visible.forEach(function(it, i){
        var li = list.appendChild(CDS.create("li", null, "cds-bcr__li"));
        var n = CDS.create("cds-breadcrumb-item", { kind: it.truncate ? "truncate" : null, label: it.label, href: it.href, "is-active": it.active ? "" : null, current: it.current ? "" : null, "has-separator": i === 0 ? "false" : null });
        if (it.hidden) li.hidden = true;
        li.appendChild(n);
        if (it.truncate) self.truncEl = n;
      });
      items.collapsed.forEach(function(it){
        var li = pl.appendChild(CDS.create("li"));
        li.appendChild(CDS.create("cds-breadcrumb-item", { label: it.label, href: it.href || "#", "has-separator": "false" }));
      });
      // o Truncate abre o Popover
      if (this.truncEl){
        var t = this.truncEl;
        var b = t.control;
        if (b){ if ("popoverTargetElement" in b) b.popoverTargetElement = this.pop; b.setAttribute("aria-haspopup", "true"); b.setAttribute("aria-expanded", String(this.pop.matches(":popover-open"))); b.setAttribute("aria-controls", this.pop.id || (this.pop.id = this._id + "-pop")); }
        this.pop._trigger = t;
      }
      var want = this.hasAttribute("show-popover") && !!this.truncEl;
      if (!this._sync && this.pop.isConnected){
        if (want && !this.pop.matches(":popover-open")){ this.pop.show(); this.pop.place(); } else if (!want && this.pop.matches(":popover-open")) this.pop.hide();
      }
    }
    model(){
      var links = this._links, visible = [], collapsed = [];
      if (links.length){
        var k = this.hasAttribute("collapse") ? Math.max(0, parseInt(this.getAttribute("collapse"), 10) || 0) : (links.length > 2 ? 1 : 0);
        k = Math.min(k, links.length - 1);
        if (k) visible.push({ truncate: true });
        collapsed = links.slice(0, k);
        links.slice(k).forEach(function(l, i, arr){ var last = i === arr.length - 1; visible.push({ label: l.label, href: last ? null : l.href, current: last, active: last || l.active }); });
      } else {
        // amostra do Figma: Item 1 Truncate · Item 2 e Item 6 Is Active · Items 3–6 controlados por showItem03–06
        visible.push({ truncate: true });
        for (var i = 2; i <= 6; i++) visible.push({ label: "Label", href: "#", active: i === 2 || i === 6, hidden: i >= 3 && !this.flag("show-item0" + i) });
        collapsed = [{ label: "Label" }, { label: "Label" }];
      }
      return { visible: visible, collapsed: collapsed };
    }
  }
  CdsBreadcrumb.define("cds-breadcrumb");
})();
} catch (e) { console.error("[cds] components/breadcrumb/breadcrumb.js", e); }

/* ==== components/breadcrumb/breadcrumb.playground.js ==== */
try {
/* Playground — Breadcrumb */
CDS.register({
  id: "breadcrumb", name: "Breadcrumb", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6792-24",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-breadcrumb", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra do Figma: o 1º item é Truncate (…) e abre o Popover com os níveis escondidos. No código, os filhos <code>&lt;a href&gt;</code> viram os níveis e o último é a página atual.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Popover", checked: false, onChange: function(on){ kit.attr(p, "show-popover", on); } });
    [3,4,5,6].forEach(function(i){ kit.toggle(panel, { label: "showItem0" + i, checked: true, onChange: function(on){ kit.attr(p, "show-item0" + i, on ? null : "false"); } }); });
    kit.section(panel, "Exemplo com links");
    var demo = kit.el("cds-breadcrumb", { collapse: "1", style: "margin-top:var(--common-sizes-16)" }, [kit.el("a", { href: "#", text: "Início" }), kit.el("a", { href: "#", text: "Benefícios" }), kit.el("a", { href: "#", text: "Alimentação" }), kit.el("a", { href: "#", text: "Extrato" })]);
    var t = kit.toggle(panel, { label: "Mostrar exemplo (4 níveis, collapse=1)", checked: false, onChange: function(on){ if (on) ctx.preview.appendChild(demo); else demo.remove(); } });
  }
});
} catch (e) { console.error("[cds] components/breadcrumb/breadcrumb.playground.js", e); }

/* ==== components/progress-line/progress-line.js ==== */
try {
/**
 * @deps —
 * <cds-progress-line> — Progress Line · Progress Indicators · set 2322:4006
 * O Figma tem Percent em passos de 10; o código aceita qualquer valor de 0 a 100.
 *
 * Atributos:
 *   percent  0–100 · padrão 0
 *   label    nome acessível (a description pede contexto: "Carregando dados…")
 */
(function(){
  "use strict";
  class CdsProgressLine extends CDS.Element {
    static get observedAttributes(){ return ["percent", "label"]; }
    connectedCallback(){ if (!this._bar){ this._bar = document.createElement("span"); this._bar.className = "cds-pl__bar"; this.appendChild(this._bar); } this.update(); }
    attributeChangedCallback(){ if (this._bar) this.update(); }
    get percent(){ var n = parseFloat(this.getAttribute("percent")); return isNaN(n) ? 0 : Math.max(0, Math.min(100, n)); }
    update(){
      this._bar.style.setProperty("--_pct", this.percent + "%");
      this.setAttribute("role", "progressbar");
      this.setAttribute("aria-valuemin", "0"); this.setAttribute("aria-valuemax", "100");
      this.setAttribute("aria-valuenow", String(this.percent));
      if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label")); else this.removeAttribute("aria-label");
    }
  }
  CdsProgressLine.define("cds-progress-line");
})();
} catch (e) { console.error("[cds] components/progress-line/progress-line.js", e); }

/* ==== components/progress-line/progress-line.playground.js ==== */
try {
/* Playground — Progress Line */
CDS.register({
  id: "progress-line", name: "Progress Line", category: "Progress Indicators",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2322-4006",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "width:312px; max-width:100%;" });
    var p = kit.el("cds-progress-line", { percent: "40", label: "Carregando dados" });
    wrap.appendChild(p); ctx.preview.appendChild(wrap);
    function readout(){ ctx.readout(p.percent + "%", p.percent === 100); }

    kit.section(panel, "Variants");
    kit.range(panel, { label: "Percent", min: 0, max: 100, value: 40, onInput: function(n){ p.setAttribute("percent", String(n)); readout(); } });
    kit.hint(panel, "O Figma tem passos de 10 (0–100); o componente aceita qualquer valor.");
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (role=progressbar)", value: "Carregando dados", onInput: function(v){ kit.attr(p, "label", v); } });
    readout();
  }
});
} catch (e) { console.error("[cds] components/progress-line/progress-line.playground.js", e); }

/* ==== components/progress-tracker-item/progress-tracker-item.js ==== */
try {
/**
 * @deps icon link
 * <cds-progress-tracker-item> — Progress Tracker Item · Progress Indicators · set 14415:3778 (Kind Number|Icon × Status)
 * Marker (32, pill, pad 4) + Connector (2px) à esquerda · gap 16 · Text section (pad 8 0 · gap 8): Label (Label/Medium Text/intense) ·
 * Description (Caption/Regular Text/medium) · Link (Neutral, navigation-right-line).
 *   Pending: Marker Neutral/Solid/semi-soft · Current: Surface/default + anel 2px Accent/Solid/medium ·
 *   Completed: Surface/accent + check-line, Connector Surface/accent (nos outros, Neutral/Solid/semi-soft).
 * Atributos: kind (number|icon) · status (pending|current|completed) · marker-label ("1") · marker-icon (placeholder-line)
 *   label ("Label") · description ("Description content") · show-description · show-connector · show-link
 *   link-label ("Link content") · href
 * Acessibilidade: a etapa atual leva aria-current="step"; o status entra no nome ("Etapa 2, atual: Label").
 */
(function(){
  "use strict";
  var STATUS = { pending: "pendente", current: "atual", completed: "concluída" };
  class CdsProgressTrackerItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","status","marker-label","marker-icon","label","description","show-description","show-connector","show-link","link-label","href"]; }
    get status(){ var s = this.getAttribute("status"); return s === "current" || s === "completed" ? s : "pending"; }
    render(){
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var m = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-pti__marker"));
        this.markEl = m.appendChild(CDS.create("span", null, "cds-pti__mark"));
        this.connEl = m.appendChild(CDS.create("span", null, "cds-pti__conn"));
        var t = this.appendChild(CDS.create("div", null, "cds-pti__text"));
        this.srEl = t.appendChild(CDS.create("span", null, "cds-pti__sr"));
        this.labelEl = t.appendChild(CDS.create("span", null, "cds-pti__label"));
        this.descEl = t.appendChild(CDS.create("span", null, "cds-pti__desc"));
        this.linkEl = t.appendChild(CDS.create("cds-link", null, "cds-pti__link"));
      }
      var st = this.status, icon = this.getAttribute("kind") === "icon";
      CDS.attr(this, "status", st === "pending" ? null : st);
      this.markEl.innerHTML = "";
      if (st === "completed") this.markEl.appendChild(CDS.create("cds-icon", { icon: "check-line", size: "small", appearance: "inversed" }));
      else if (icon) this.markEl.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("marker-icon") || "placeholder-line", size: "small", appearance: "neutral" }));
      else this.markEl.appendChild(CDS.create("span", null, "cds-pti__num")).textContent = this.text("marker-label", "1");
      this.connEl.hidden = !this.flag("show-connector");
      this.labelEl.textContent = this.text("label", "Label");
      this.descEl.textContent = this.text("description", "Description content"); this.descEl.hidden = !this.flag("show-description");
      this.linkEl.hidden = !this.flag("show-link");
      CDS.attr(this.linkEl, "label", this.text("link-label", "Link content")); CDS.attr(this.linkEl, "href", this.getAttribute("href") || "#");
      this.srEl.textContent = "Etapa " + this.text("marker-label", "1") + ", " + STATUS[st] + ": ";
      CDS.attr(this, "aria-current", st === "current" ? "step" : null);
    }
  }
  CdsProgressTrackerItem.define("cds-progress-tracker-item");
})();
} catch (e) { console.error("[cds] components/progress-tracker-item/progress-tracker-item.js", e); }

/* ==== components/progress-tracker-item/progress-tracker-item.playground.js ==== */
try {
/* Playground — Progress Tracker Item */
CDS.register({
  id: "progress-tracker-item", name: "Progress Tracker Item", category: "Progress Indicators", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14415-3778",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-progress-tracker-item", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "number", options: [["number","Number"],["icon","Icon"]], onChange: function(v){ kit.attr(p, "kind", v === "number" ? null : v); } });
    kit.seg(panel, { label: "Status", value: "pending", options: [["pending","Pending"],["current","Current"],["completed","Completed"]], onChange: function(v){ p.setAttribute("status", v); } });
    kit.section(panel, "Booleans");
    [["show-description","Show Description"],["show-connector","Show Connector"],["show-link","Show Link"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["description","Text Description","Description content"],["marker-label","Marker label","1"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.iconSwap(panel, { label: "Choose Marker icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("marker-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/progress-tracker-item/progress-tracker-item.playground.js", e); }

/* ==== components/progress-tracker/progress-tracker.js ==== */
try {
/**
 * @deps progress-tracker-item
 * <cds-progress-tracker> — Progress Tracker · Progress Indicators · componente 14524:1024
 * Lista vertical (gap 8) de Progress Tracker Items no Slot "Tracker". Sem filhos, a amostra do Figma:
 * 1 Completed · 2 Current (com Link) · 3 Pending (sem Connector).
 * Uso: filhos <cds-progress-tracker-item>; com current="n" a lista calcula os status (antes = completed, depois = pending),
 *   numera os marcadores e tira o Connector do último.
 * Atributos: current (1-based) · label (nome da lista · "Progresso")
 */
(function(){
  "use strict";
  class CdsProgressTracker extends CDS.Element {
    static get observedAttributes(){ return ["current", "label"]; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-progress-tracker-item")); }
    render(){
      if (!this._built){
        this._built = true; this.setAttribute("role", "list");
        if (!this.items.length){
          this.appendChild(CDS.create("cds-progress-tracker-item", { status: "completed", "marker-label": "1", "show-link": "false" }));
          this.appendChild(CDS.create("cds-progress-tracker-item", { status: "current", "marker-label": "2" }));
          this.appendChild(CDS.create("cds-progress-tracker-item", { status: "pending", "marker-label": "3", "show-link": "false", "show-connector": "false" }));
        }
      }
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Progresso");
      var cur = parseInt(this.getAttribute("current"), 10), items = this.items;
      items.forEach(function(it, i){
        it.setAttribute("role", "listitem");
        if (cur){
          CDS.attr(it, "status", i + 1 < cur ? "completed" : i + 1 === cur ? "current" : "pending");
          CDS.attr(it, "marker-label", String(i + 1));
          CDS.attr(it, "show-connector", i === items.length - 1 ? "false" : null);
        }
      });
    }
  }
  CdsProgressTracker.define("cds-progress-tracker");
})();
} catch (e) { console.error("[cds] components/progress-tracker/progress-tracker.js", e); }

/* ==== components/progress-tracker/progress-tracker.playground.js ==== */
try {
/* Playground — Progress Tracker */
CDS.register({
  id: "progress-tracker", name: "Progress Tracker", category: "Progress Indicators", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14524-1024",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-progress-tracker", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra do Figma (Completed · Current · Pending). Com <code>current</code>, a lista calcula os status.");
    kit.range(panel, { label: "Etapa atual (current)", min: 1, max: 3, value: 2, onInput: function(v){ p.setAttribute("current", v); } });
  }
});
} catch (e) { console.error("[cds] components/progress-tracker/progress-tracker.playground.js", e); }

/* ==== components/selection-control/selection-control.js ==== */
try {
/**
 * @deps —
 * CDS.SelectionControl — base interna de Checkbox, Radio Button e Switch (sem playground).
 *
 * Render incremental: build() cria o DOM uma vez (o <input> nativo nunca é recriado);
 * update() só ajusta texto, estado e atributos. Assim foco, teclado e seleção sobrevivem.
 *
 * Atributos comuns (padrões do Figma):
 *   label            Text Label · padrão "Label"
 *   show-text-label  "false" esconde o rótulo (o nome acessível continua: aria-label)
 *   status           selected | unselected (Checkbox também: indeterminate) · padrão unselected
 *   disabled · name · value
 * Evento: cds-change { status } — o status é refletido no atributo.
 * Subclasse define: static inputType · buildBox(box) · applyStatus(input, status)
 */
(function(){
  "use strict";
  class SelectionControl extends CDS.Element {
    static get observedAttributes(){ return ["label", "show-text-label", "status", "disabled", "name", "value"]; }
    get status(){ return this.getAttribute("status") || "unselected"; }
    set status(v){ this.setAttribute("status", v); }
    get input(){ return this._input; }
    focus(o){ if (this._input) this._input.focus(o); }

    render(){ if (!this._root) this.build(); this.update(); }

    build(){
      var self = this;
      var root = CDS.create("label", null, "cds-sc");
      var sel = CDS.create("span", null, "cds-sc__selector");
      var input = CDS.create("input", { type: this.constructor.inputType }, "cds-sc__input");
      var box = CDS.create("span", { "aria-hidden": "true" }, "cds-sc__box");
      this.buildBox(box);
      sel.appendChild(input); sel.appendChild(box);
      this._label = CDS.create("span", null, "cds-sc__label");
      root.appendChild(sel); root.appendChild(this._label);
      this.appendChild(root);
      this._root = root; this._input = input; this._box = box;
      input.addEventListener("change", function(){ self.onInputChange(); });
    }

    update(){
      var label = this.text("label", "Label");
      this._label.textContent = label;
      if (this.flag("show-text-label")) this._input.removeAttribute("aria-label"); else this._input.setAttribute("aria-label", label);
      this._input.disabled = this.hasAttribute("disabled");
      if (this.getAttribute("name")) this._input.name = this.getAttribute("name"); else this._input.removeAttribute("name");
      if (this.getAttribute("value")) this._input.value = this.getAttribute("value");
      this.applyStatus(this._input, this.status);
    }

    /** Padrão: checked ↔ selected. Subclasses podem estender (Checkbox indeterminate, Radio exclusividade). */
    onInputChange(){
      this.status = this._input.checked ? "selected" : "unselected";
      this.emit();
    }
    emit(){ this.dispatchEvent(new CustomEvent("cds-change", { detail: { status: this.status }, bubbles: true })); }
    buildBox(){}
    applyStatus(input, status){ input.checked = status === "selected"; }
  }
  CDS.SelectionControl = SelectionControl;
})();
} catch (e) { console.error("[cds] components/selection-control/selection-control.js", e); }

/* ==== components/checkbox/checkbox.js ==== */
try {
/**
 * @deps selection-control
 * <cds-checkbox> — Checkbox · Selection Controls · set 4123:2560
 * Atributos: label · show-text-label · status (unselected | selected | indeterminate) · disabled · name · value
 * Clique: unselected → selected → unselected; indeterminate → selected (o Figma não tem reaction a partir do indeterminate).
 */
(function(){
  "use strict";
  class CdsCheckbox extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-check cds-sc__glyph cds-sc__glyph--check"));
      box.appendChild(CDS.create("span", null, "cds-icon cds-icon--checkbox-indeterminate cds-sc__glyph cds-sc__glyph--indeterminate"));
    }
    applyStatus(input, status){ input.checked = status === "selected"; input.indeterminate = status === "indeterminate"; }
  }
  CdsCheckbox.define("cds-checkbox");
})();
} catch (e) { console.error("[cds] components/checkbox/checkbox.js", e); }

/* ==== components/checkbox/checkbox.playground.js ==== */
try {
/* Playground — Checkbox */
CDS.register({
  id: "checkbox", name: "Checkbox", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4123-2560",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-checkbox", statuses: [["unselected","Unselected"],["selected","Selected"],["indeterminate","Indeterminate"]] }); }
});
} catch (e) { console.error("[cds] components/checkbox/checkbox.playground.js", e); }

/* ==== components/radio-button/radio-button.js ==== */
try {
/**
 * @deps selection-control
 * <cds-radio-button> — Radio Button · Selection Controls · set 4429:10437
 * Atributos: label · show-text-label · status (unselected | selected) · disabled · name · value
 * Exclusividade pelo `name` nativo; ao selecionar, os irmãos de mesmo name voltam para unselected.
 */
(function(){
  "use strict";
  class CdsRadioButton extends CDS.SelectionControl {
    static get inputType(){ return "radio"; }
    buildBox(box){ box.appendChild(CDS.create("span", null, "cds-rb__dot")); }
    onInputChange(){
      var name = this.getAttribute("name"), self = this;
      if (name){
        var scope = this.closest("cds-radio-button-group") || document;
        scope.querySelectorAll('cds-radio-button[name="' + name.replace(/"/g, '\\"') + '"]').forEach(function(r){ if (r !== self && r.status === "selected") r.status = "unselected"; });
      }
      this.status = "selected";
      this.emit();
    }
  }
  CdsRadioButton.define("cds-radio-button");
})();
} catch (e) { console.error("[cds] components/radio-button/radio-button.js", e); }

/* ==== components/radio-button/radio-button.playground.js ==== */
try {
/* Playground — Radio Button */
CDS.register({
  id: "radio-button", name: "Radio Button", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4429-10437",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-radio-button", statuses: [["unselected","Unselected"],["selected","Selected"]],
    extraHint: "Sozinho, o radio só seleciona; para desmarcar escolha outro do mesmo grupo (veja Radio Button Group)." }); }
});
} catch (e) { console.error("[cds] components/radio-button/radio-button.playground.js", e); }

/* ==== components/shaped-icon/shaped-icon.js ==== */
try {
/**
 * @deps icon
 * <cds-shaped-icon> — Shaped Icon · Images · set 2272:146
 * Compõe um <cds-icon> (nested instance), como no Figma.
 *
 * Atributos (padrões do Figma):
 *   icon        nome do ícone (Icon swap) · padrão "placeholder-line"
 *   appearance  neutral | inversed | accent | positive | warning | negative | informative · padrão neutral
 *   size        smallest (32) | small (40) | medium (48) | large (56) · padrão smallest
 *   label       nome acessível; sem label é decorativo
 */
(function(){
  "use strict";
  // Size do container → Size do Icon aninhado
  var ICON_SIZE = { smallest: "small", small: "small", medium: "medium", large: "large" };
  // Appearance do container → Appearance do Icon (Inversed usa ícone intense sobre Surface/default)
  var ICON_APPEARANCE = { neutral: "neutral", inversed: "neutral", accent: "accent", positive: "positive", warning: "warning", negative: "negative", informative: "informative" };

  class CdsShapedIcon extends CDS.Element {
    static get observedAttributes(){ return ["icon", "appearance", "size", "label"]; }
    get size(){ var s = this.getAttribute("size"); return ICON_SIZE[s] ? s : "smallest"; }
    get appearance(){ var a = this.getAttribute("appearance"); return ICON_APPEARANCE[a] ? a : "neutral"; }
    render(){
      if (!this.iconEl){ this.iconEl = document.createElement("cds-icon"); this.appendChild(this.iconEl); }
      this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.setAttribute("size", ICON_SIZE[this.size]);
      this.iconEl.setAttribute("appearance", ICON_APPEARANCE[this.appearance]);
      var label = this.getAttribute("label");
      this.a11yName(label);
    }
  }
  CdsShapedIcon.define("cds-shaped-icon");
})();
} catch (e) { console.error("[cds] components/shaped-icon/shaped-icon.js", e); }

/* ==== components/shaped-icon/shaped-icon.playground.js ==== */
try {
/* Playground — Shaped Icon */
CDS.register({
  id: "shaped-icon", name: "Shaped Icon", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2272-146",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-shaped-icon", { icon: "placeholder-line", appearance: "neutral", size: "smallest" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"],["accent","Accent"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "smallest", options: [["smallest","Smallest 32"],["small","Small 40"],["medium","Medium 48"],["large","Large 56"]], onChange: function(v){ set("size", v); } });

    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, {
      title: "Icon", exposed: false, note: "Size e Appearance derivam do Shaped Icon.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Appearance", i.getAttribute("appearance")], ["Size", i.getAttribute("size")]] : []; }
    });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/shaped-icon/shaped-icon.playground.js", e); }

/* ==== components/alert/alert.js ==== */
try {
/**
 * @deps shaped-icon close-alert
 * <cds-alert> — Alert · Feedback · set 11864:12559
 * Shaped Icon (Small, ícone por Appearance) · Text Content (Label + mensagem) · .Close Alert.
 * A mensagem aceita conteúdo rico ("You can turn words bold also add a link"): filhos do elemento viram o Text Content.
 *
 * Atributos: appearance (positive|warning|informative) · label (Text Label) · text (Text Content, se não houver filhos)
 *   show-label · show-close-button · close-label
 * Eventos: cds-close (cancelável). Sem preventDefault(), some do DOM.
 * A11y: role="alert" no Warning, role="status" nos outros.
 */
(function(){
  "use strict";
  var ICON = { positive: "positive-line", warning: "warning-line", informative: "information-line" };
  class CdsAlert extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "label", "text", "show-label", "show-close-button", "close-label"]; }
    get appearance(){ var a = this.getAttribute("appearance"); return ICON[a] ? a : "positive"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        var slot = [].slice.call(this.childNodes); // conteúdo rico vindo de quem usa
        this.innerHTML = "";
        this.iconEl = this.appendChild(CDS.create("cds-shaped-icon", { size: "small" }));
        var tc = this.appendChild(CDS.create("div", null, "cds-alert__text"));
        this.labelEl = tc.appendChild(CDS.create("p", null, "cds-alert__label"));
        this.msgEl = tc.appendChild(CDS.create("p", null, "cds-alert__msg"));
        this.hasSlot = slot.some(function(n){ return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()); });
        if (this.hasSlot) slot.forEach(function(n){ self.msgEl.appendChild(n); });
        this.closeEl = this.appendChild(CDS.create("cds-close-alert"));
        this.closeEl.addEventListener("click", function(){ self.close(); });
      }
      var a = this.appearance;
      this.setAttribute("role", a === "warning" ? "alert" : "status");
      this.iconEl.setAttribute("appearance", a); this.iconEl.setAttribute("icon", ICON[a]);
      this.labelEl.textContent = this.text("label", "Label"); this.labelEl.hidden = !this.flag("show-label");
      if (!this.hasSlot) this.msgEl.textContent = this.text("text", "A message about the system here! You can turn words bold also add a link.");
      this.closeEl.hidden = !this.flag("show-close-button");
      this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar aviso");
    }
    close(){ if (this.dispatchEvent(new CustomEvent("cds-close", { bubbles: true, cancelable: true }))) this.remove(); }
  }
  CDS.Alert = CdsAlert;
  CdsAlert.define("cds-alert");
})();
} catch (e) { console.error("[cds] components/alert/alert.js", e); }

/* ==== components/alert/alert.playground.js ==== */
try {
/* Playground — Alert */
CDS.register({
  id: "alert", name: "Alert", category: "Feedback", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11864-12559",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p, rich = false;
    var attrs = { label: "Label" };
    function make(){
      p = kit.el("cds-alert", attrs);
      if (rich) p.innerHTML = 'A message about the system here! You can turn words <b>bold</b> also add a <a href="#">link</a>.';
      p.addEventListener("cds-close", function(){ ctx.readout("fechado — clique em Mostrar de novo", false); });
      ctx.preview.innerHTML = ""; ctx.preview.appendChild(p);
    }
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; kit.attr(p, k, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"],["informative","Informative"]], hint: "Warning usa role=alert; os outros, role=status.", onChange: function(v){ set("appearance", v === "positive" ? null : v); } });
    kit.button(panel, { label: "Mostrar de novo", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Label", checked: true, onChange: function(on){ set("show-label", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Close Button", checked: true, onChange: function(on){ set("show-close-button", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Text Content", value: "A message about the system here! You can turn words bold also add a link.", onInput: function(v){ rich = false; set("text", v); } });
    kit.toggle(panel, { label: "Conteúdo rico (negrito e link como filhos)", onChange: function(on){ rich = on; make(); } });
    kit.section(panel, "Nested instances");
    var refs = [
      kit.nested(panel, { title: "Shaped Icon", exposed: false, note: "Small (40). Ícone e cor seguem o Appearance.", props: function(){ var s = p && p.iconEl; return s ? [["Appearance", s.getAttribute("appearance")], ["Icon", s.getAttribute("icon")], ["Size", "Small"]] : []; } }),
      kit.nested(panel, { title: ".Close Alert", exposed: true, note: "Building block. Clique fecha (cds-close, cancelável).", props: function(){ var c = p && p.closeEl; return c ? [["Show", String(!c.hidden)]] : []; } })
    ];
    make(); kit.watch(ctx.preview, function(){ refs.forEach(function(f){ f(); }); });
  }
});
} catch (e) { console.error("[cds] components/alert/alert.playground.js", e); }

/* ==== components/confirmation-message/confirmation-message.js ==== */
try {
/**
 * @deps shaped-icon
 * <cds-confirmation-message> — Confirmation Message · Content · set 16359:1803
 * Shaped Icon Large (56) · Title (Title/Medium) · Description (Body/Regular), centralizados.
 * No Figma só Appearance é prop; título e descrição são texto fixo da amostra (expostos aqui como atributos).
 * Atributos: appearance (neutral|positive|warning) · icon (padrão placeholder-line, como no Figma) · title · description
 */
(function(){
  "use strict";
  class CdsConfirmationMessage extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "icon", "title", "description"]; }
    render(){
      var a = /^(positive|warning)$/.test(this.getAttribute("appearance")) ? this.getAttribute("appearance") : "neutral";
      this.innerHTML = "";
      this.iconEl = this.appendChild(CDS.create("cds-shaped-icon", { size: "large", appearance: a, icon: this.getAttribute("icon") || "placeholder-line" }));
      var tc = this.appendChild(CDS.create("div", null, "cds-cm__text"));
      tc.appendChild(CDS.create("p", null, "cds-cm__title")).textContent = this.text("title", "Title");
      tc.appendChild(CDS.create("p", null, "cds-cm__desc")).textContent = this.text("description", "Unleash your potential! Our tools are here to help you transform your ideas into reality with simplicity and flair.");
    }
  }
  CdsConfirmationMessage.define("cds-confirmation-message");
})();
} catch (e) { console.error("[cds] components/confirmation-message/confirmation-message.js", e); }

/* ==== components/confirmation-message/confirmation-message.playground.js ==== */
try {
/* Playground — Confirmation Message */
CDS.register({
  id: "confirmation-message", name: "Confirmation Message", category: "Content", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16359-1803",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-confirmation-message", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"]], onChange: function(v){ kit.attr(p, "appearance", v === "neutral" ? null : v); } });
    kit.section(panel, "Texts");
    kit.hint(panel, "No Figma, título e descrição não são props (texto da amostra); aqui viram atributos.");
    kit.text(panel, { label: "Title", value: "Title", onInput: function(v){ p.setAttribute("title", v); } });
    kit.text(panel, { label: "Description", value: "Unleash your potential! Our tools are here to help you transform your ideas into reality with simplicity and flair.", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon do Shaped Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/confirmation-message/confirmation-message.playground.js", e); }

/* ==== components/dropzone/dropzone.js ==== */
try {
/**
 * @deps shaped-icon main-button
 * <cds-dropzone> — Dropzone · File Upload · set 15386:7230 (State Enabled|Hovered|Pressed|Dragover|Disabled)
 * Desktop (File Upload/Is Desktop): coluna centralizada · pad 12 20 · gap 16 · Shaped Icon Smallest (upload-line) ·
 *   Text Title (Label/Regular) + Text Description (Caption) + Main Button Ghost Accent Small "Selecionar arquivos".
 * Mobile (File Upload/Is Mobile: tablet e mobile): linha · pad 16 · gap 12 · Shaped Icon Medium · a área inteira é o alvo.
 * Borda tracejada 1px (dash 4 4 no Figma) Border/medium · Dragover: Accent/Solid/soft + Accent/Solid/medium + "Solte para adicionar".
 * Atributos: text-title ("Adicionar arquivos") · text-description ("Arquivos permitidos: JPG e PNG") · show-text-description
 *   show-main-button · button-label ("Selecionar arquivos") · accept · multiple · disabled · viewport · state (specimen)
 * Evento: cds-files { files } — escolhidos no seletor ou soltos na área
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsDropzone extends CDS.Element {
    static get observedAttributes(){ return ["text-title","text-description","show-text-description","show-main-button","button-label","accept","multiple","disabled","drop-text"]; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._id = "cds-dz-" + (++uid); this.innerHTML = "";
        var z = this.zone = this.appendChild(CDS.create("div", null, "cds-dz"));
        this.iconEl = z.appendChild(CDS.create("cds-shaped-icon", { appearance: "neutral", icon: "upload-line" }, "cds-dz__icon"));
        var body = z.appendChild(CDS.create("div", null, "cds-dz__body")); // Container do Figma: textos + botão, gap 8
        var tx = body.appendChild(CDS.create("div", null, "cds-dz__texts"));
        this.titleEl = tx.appendChild(CDS.create("span", { id: this._id + "-t" }, "cds-dz__title"));
        this.descEl = tx.appendChild(CDS.create("span", { id: this._id + "-d" }, "cds-dz__desc"));
        this.btn = body.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }, "cds-dz__btn"));
        this.input = this.appendChild(CDS.create("input", { type: "file", tabindex: "-1", "aria-hidden": "true" }, "cds-dz__input"));
        var pick = function(){ if (!self.hasAttribute("disabled")) self.input.click(); };
        this.btn.addEventListener("click", function(e){ e.stopPropagation(); pick(); });
        z.addEventListener("click", function(){ if (self.isMobile) pick(); });
        z.addEventListener("keydown", function(e){ if (self.isMobile && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); pick(); } });
        this.input.addEventListener("change", function(){ if (self.input.files.length) self.emit(self.input.files); self.input.value = ""; });
        var depth = 0;
        z.addEventListener("dragenter", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); depth++; self.classList.add("is-dragover"); self.paint(); });
        z.addEventListener("dragover", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; });
        z.addEventListener("dragleave", function(){ if (--depth <= 0){ depth = 0; self.classList.remove("is-dragover"); self.paint(); } });
        z.addEventListener("drop", function(e){ if (self.hasAttribute("disabled")) return; e.preventDefault(); depth = 0; self.classList.remove("is-dragover"); self.paint(); if (e.dataTransfer.files.length) self.emit(e.dataTransfer.files); });
      }
      this.paint();
    }
    get isMobile(){
      var v = this.getAttribute("viewport") || (this.closest("[data-viewport]") || {}).dataset && this.closest("[data-viewport]").dataset.viewport;
      return v === "mobile" || v === "tablet";
    }
    paint(){
      var drag = this.classList.contains("is-dragover") || this.getAttribute("state") === "dragover", mob = this.isMobile, dis = this.hasAttribute("disabled");
      CDS.attr(this.iconEl, "size", drag || mob ? "medium" : "smallest");
      CDS.attr(this.iconEl, "appearance", drag ? "accent" : "neutral");
      this.titleEl.textContent = drag ? this.text("drop-text", "Solte para adicionar") : this.text("text-title", "Adicionar arquivos");
      this.descEl.textContent = this.text("text-description", "Arquivos permitidos: JPG e PNG");
      this.descEl.hidden = drag || !this.flag("show-text-description");
      CDS.attr(this.btn, "label", this.text("button-label", "Selecionar arquivos"));
      this.btn.hidden = drag || mob || !this.flag("show-main-button");
      CDS.attr(this.btn, "disabled", dis ? "" : null);
      CDS.attr(this.input, "accept", this.getAttribute("accept")); this.input.multiple = this.hasAttribute("multiple"); this.input.disabled = dis;
      // Mobile: a área inteira é o botão
      CDS.attr(this.zone, "role", mob ? "button" : null); CDS.attr(this.zone, "tabindex", mob && !dis ? "0" : null);
      CDS.attr(this.zone, "aria-labelledby", mob ? this._id + "-t" : null); CDS.attr(this.zone, "aria-describedby", mob ? this._id + "-d" : null);
      CDS.attr(this.zone, "aria-disabled", mob && dis ? "true" : null);
      CDS.attr(this, "data-mode", mob ? "mobile" : "desktop");
    }
    emit(files){ this.dispatchEvent(new CustomEvent("cds-files", { detail: { files: [].slice.call(files) }, bubbles: true })); }
    connectedCallback(){ super.connectedCallback(); var self = this; if (!this._mo){ var host = this.closest("[data-viewport]"); if (host){ this._mo = new MutationObserver(function(){ self.paint(); }); this._mo.observe(host, { attributes: true, attributeFilter: ["data-viewport"] }); } } }
    disconnectedCallback(){ if (this._mo){ this._mo.disconnect(); this._mo = null; } }
  }
  CdsDropzone.define("cds-dropzone");
})();
} catch (e) { console.error("[cds] components/dropzone/dropzone.js", e); }

/* ==== components/dropzone/dropzone.playground.js ==== */
try {
/* Playground — Dropzone */
CDS.register({
  id: "dropzone", name: "Dropzone", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15386-7230",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-dropzone", { multiple: "", accept: "image/jpeg,image/png" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-files", function(e){ ctx.readout(e.detail.files.map(function(f){ return f.name; }).join(", "), true); });
    kit.hint(panel, "Arraste arquivos para a área ou use o botão. No 360 e no 744 vira a versão Mobile (a área inteira é o botão), como no Figma.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["dragover","Dragover"],["disabled","Disabled"]], hint: "Hovered e Pressed só existem na versão Mobile no Figma.", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" || v === "dragover" ? v : null); kit.attr(p, "disabled", v === "disabled"); p.paint(); } });
    kit.section(panel, "Booleans");
    [["show-text-description","Show Text description"],["show-main-button","Show Main button"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Adicionar arquivos", onInput: function(v){ p.setAttribute("text-title", v); } });
    kit.text(panel, { label: "Text Description", value: "Arquivos permitidos: JPG e PNG", onInput: function(v){ p.setAttribute("text-description", v); } });
  }
});
} catch (e) { console.error("[cds] components/dropzone/dropzone.playground.js", e); }

/* ==== components/file-lead-item/file-lead-item.js ==== */
try {
/**
 * @deps image shaped-icon icon
 * <cds-file-lead-item> — .Lead item (File Upload) · .Building Blocks · set 15207:13262 (Kind × Appearance × State)
 * 48×48 · raio medium. Appearance=Image: miniatura (Image 1:1) · File: Shaped Icon Neutral Medium (attachment).
 * Kind=View file: botão; Hovered/Pressed põem um overlay Surface/inversed (Opacity/intense · semi-opaque) com o ícone
 * hide-line (Inversed, Large), como no Figma (C63). Kind=Static: só a miniatura.
 * Atributos: kind (static|view-file · padrão view-file) · appearance (image|file · padrão file, como no Figma — check de props 03/10) · src · alt · label ("Ver arquivo")
 * Evento: cds-view (clique no View file)
 */
(function(){
  "use strict";
  class CdsFileLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","appearance","src","alt","label"]; }
    render(){
      var self = this, view = this.getAttribute("kind") !== "static", img = this.getAttribute("appearance") === "image";
      var key = (view ? "v" : "s") + (img ? "i" : "f");
      if (this._key !== key){
        this._key = key; this.innerHTML = "";
        var host = this.host = this.appendChild(CDS.create(view ? "button" : "span", view ? { type: "button" } : null, "cds-fli"));
        this.media = host.appendChild(img ? CDS.create("cds-image", { "aspect-ratio": "1:1" }, "cds-fli__img") : CDS.create("cds-shaped-icon", { size: "medium", appearance: "neutral", icon: "attachment" }, "cds-fli__file"));
        if (view){
          host.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-fli__overlay"));
          host.appendChild(CDS.create("cds-icon", { icon: "hide-line", size: "large", appearance: "inversed", "aria-hidden": "true" }, "cds-fli__icon"));
          host.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-view", { bubbles: true })); });
        }
      }
      if (img){ CDS.attr(this.media, "src", this.getAttribute("src")); CDS.attr(this.media, "alt", this.getAttribute("alt") || ""); }
      if (view) CDS.attr(this.host, "aria-label", this.getAttribute("label") || "Ver arquivo");
    }
  }
  CdsFileLeadItem.define("cds-file-lead-item");
})();
} catch (e) { console.error("[cds] components/file-lead-item/file-lead-item.js", e); }

/* ==== components/file-lead-item/file-lead-item.playground.js ==== */
try {
/* Playground — .Lead item (File, building block) */
CDS.register({
  id: "file-lead-item", name: ".Lead item (File)", category: "File Upload", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15207-13262",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-file-lead-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Terceiro “.Lead item” da lib (C25). O ícone do hover é hide-line, como no Figma (C63).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "view-file", options: [["view-file","View file"],["static","Static"]], onChange: function(v){ kit.attr(p, "kind", v === "view-file" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "file", options: [["image","Image"],["file","File"]], onChange: function(v){ kit.attr(p, "appearance", v === "file" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
  }
});
} catch (e) { console.error("[cds] components/file-lead-item/file-lead-item.playground.js", e); }

/* ==== components/lead-item/lead-item.js ==== */
try {
/**
 * @deps shaped-icon image
 * <cds-lead-item> — .Lead item (Topic) · building block · set 15621:66
 * Kind=Shaped Icon: Shaped Icon Accent · Small (40). Kind=Image: Image 1:1, 40×40.
 * Atributos: kind (shaped-icon|image, padrão shaped-icon) · icon · src · alt
 */
(function(){
  "use strict";
  class CdsLeadItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "icon", "src", "alt"]; }
    render(){
      this.innerHTML = "";
      if (this.getAttribute("kind") === "image"){
        this.itemEl = this.appendChild(CDS.create("cds-image", { "aspect-ratio": "1:1", src: this.getAttribute("src") || "", alt: this.getAttribute("alt") || "" }));
      } else {
        this.itemEl = this.appendChild(CDS.create("cds-shaped-icon", { appearance: "accent", size: "small", icon: this.getAttribute("icon") || "placeholder-line" }));
      }
    }
  }
  CdsLeadItem.define("cds-lead-item");
})();
} catch (e) { console.error("[cds] components/lead-item/lead-item.js", e); }

/* ==== components/lead-item/lead-item.playground.js ==== */
try {
/* Playground — .Lead item (building block) */
CDS.register({
  id: "lead-item", name: ".Lead item", category: "Content", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-66",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-lead-item", { src: "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "shaped-icon", options: [["shaped-icon","Shaped Icon"],["image","Image"]], onChange: function(v){ kit.attr(p, "kind", v === "shaped-icon" ? null : v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon (Kind=Shaped Icon)", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/lead-item/lead-item.playground.js", e); }

/* ==== components/slider/slider.js ==== */
try {
/**
 * @deps —
 * <cds-slider> — Slider · set 20056:11908 (Kind Single|Range × State × Value)
 * Trilha 8 (pill): ativa Surface/accent · inativa Surface/01 · Stops (marcas de 4, Neutral/Opacity/Intense/medium, Show Stops).
 * Thumb 24 (Surface/accent, círculo de 8 Icons/inversed) com a bolha de valor (Value Indicator: Caption/Medium Text/inversed
 * sobre Neutral/Solid/semi-intense, raio extra-small).
 * Hovered: círculo Icons/accent + bolha Neutral/Solid/intense · Pressed: thumb Accent/Solid/medium, círculo Accent/Solid/semi-intense,
 * bolha Surface/accent · Dragged: como Pressed com o thumb Surface/accent · Disabled: Opacity/medium.
 * Value (variante do Figma) é só prototipação; aqui o valor é numérico (description).
 *
 * Atributos: kind (single|range) · min (0) · max (100) · step (10) · value (single · padrão min) · start / end (range)
 *   show-stops · show-value-indicator · disabled · label (single · "Valor") · min-label ("Mínimo") · max-label ("Máximo")
 *   value-text (modelo de aria-valuetext, com {v} · ex.: "R$ {v}")
 * Acessibilidade (description): cada thumb é role="slider" com aria-valuemin/max/now; no Range, dois nomes
 * (Mínimo/Máximo) e thumbs que não se cruzam. Teclado: setas ±step · PageUp/PageDown ±10 steps · Home/End.
 * Eventos: input (durante o arraste) · cds-change { value } ou { start, end } (ao soltar e no teclado)
 */
(function(){
  "use strict";
  function num(v, d){ var n = parseFloat(v); return isNaN(n) ? d : n; }
  class CdsSlider extends CDS.Element {
    static get observedAttributes(){ return ["kind","min","max","step","value","start","end","show-stops","show-value-indicator","disabled","label","min-label","max-label","value-text"]; }
    get range(){ return this.getAttribute("kind") === "range"; }
    get min(){ return num(this.getAttribute("min"), 0); }
    get max(){ var m = num(this.getAttribute("max"), 100); return m > this.min ? m : this.min + 1; }
    get step(){ var s = num(this.getAttribute("step"), 10); return s > 0 ? s : 1; }
    snap(v){ var mn = this.min, st = this.step; v = Math.round((v - mn) / st) * st + mn; v = Math.min(Math.max(v, mn), this.max); return +v.toFixed(6); }
    get values(){
      if (!this.range) return [this.snap(num(this.getAttribute("value"), this.min))];
      var a = this.snap(num(this.getAttribute("start"), this.min)), b = this.snap(num(this.getAttribute("end"), this.max));
      return a <= b ? [a, b] : [b, a];
    }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var t = this.trackEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__track"));
        this.fillEl = t.appendChild(CDS.create("div", null, "cds-sl__fill"));
        this.stopsEl = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__stops"));
        this.thumbs = [0, 1].map(function(i){
          var th = self.appendChild(CDS.create("div", { role: "slider", tabindex: "0" }, "cds-sl__thumb"));
          th.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-sl__dot"));
          th.bubble = th.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-sl__bubble"));
          th.addEventListener("keydown", function(e){ self.onKey(e, i); });
          th.addEventListener("pointerdown", function(e){ self.startDrag(e, i); });
          return th;
        });
        this.trackHit = this.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sl__hit"));
        this.trackHit.addEventListener("pointerdown", function(e){
          if (self.hasAttribute("disabled")) return;
          var v = self.valueAt(e.clientX), vals = self.values, i = 0;
          if (self.range) i = Math.abs(v - vals[0]) <= Math.abs(v - vals[1]) ? 0 : 1;
          self.setIndex(i, v, false); self.startDrag(e, i);
        });
      }
      var vals = this.values, mn = this.min, mx = this.max, pct = function(v){ return (v - mn) / (mx - mn) * 100; }, rg = this.range, dis = this.hasAttribute("disabled");
      this.fillEl.style.left = (rg ? pct(vals[0]) : 0) + "%";
      this.fillEl.style.width = (rg ? pct(vals[1]) - pct(vals[0]) : pct(vals[0])) + "%";
      // Stops: uma marca por step (11 no Figma: 0–100, passo 10)
      var n = Math.round((mx - mn) / this.step) + 1;
      this.stopsEl.hidden = !this.flag("show-stops") || n > 101;
      if (this.stopsEl.children.length !== n){ this.stopsEl.innerHTML = ""; for (var k = 0; k < n && n <= 101; k++) this.stopsEl.appendChild(CDS.create("span", null, "cds-sl__stop")); }
      var names = rg ? [this.getAttribute("min-label") || "Mínimo", this.getAttribute("max-label") || "Máximo"] : [this.getAttribute("label") || "Valor"];
      var vt = this.getAttribute("value-text");
      this.thumbs.forEach(function(th, i){
        var on = i < vals.length; th.hidden = !on; if (!on) return;
        th.style.left = pct(vals[i]) + "%";
        th.bubble.textContent = self.format(vals[i]); th.bubble.hidden = !self.flag("show-value-indicator");
        CDS.attr(th, "aria-label", names[i]);
        CDS.attr(th, "aria-valuemin", String(rg && i === 1 ? vals[0] : mn)); CDS.attr(th, "aria-valuemax", String(rg && i === 0 ? vals[1] : mx));
        CDS.attr(th, "aria-valuenow", String(vals[i])); CDS.attr(th, "aria-valuetext", vt ? vt.replace("{v}", self.format(vals[i])) : null);
        CDS.attr(th, "aria-disabled", dis ? "true" : null); th.tabIndex = dis ? -1 : 0;
      });
    }
    format(v){ var s = String(v); return this.range && v > 0 && this.min < 0 ? "+" + s : s; } // Range com negativos: "-20" / "+20", como no Figma
    valueAt(x){ var r = this.trackEl.getBoundingClientRect(); return this.min + Math.min(Math.max((x - r.left) / r.width, 0), 1) * (this.max - this.min); }
    setIndex(i, v, emit){
      v = this.snap(v); var vals = this.values;
      if (this.range){ if (i === 0) v = Math.min(v, vals[1]); else v = Math.max(v, vals[0]); } // não se cruzam
      if (v === vals[i]) return false;
      this.setAttribute(this.range ? (i === 0 ? "start" : "end") : "value", String(v));
      this.dispatchEvent(new Event("input", { bubbles: true }));
      if (emit) this.emit();
      return true;
    }
    emit(){ var v = this.values; this.dispatchEvent(new CustomEvent("cds-change", { detail: this.range ? { start: v[0], end: v[1] } : { value: v[0] }, bubbles: true })); }
    startDrag(e, i){
      if (this.hasAttribute("disabled") || e.button > 0) return;
      e.preventDefault();
      var self = this, th = this.thumbs[i]; th.focus();
      this.classList.add("is-dragging"); th.classList.add("is-dragging");
      var move = function(ev){ self.setIndex(i, self.valueAt(ev.clientX), false); };
      var up = function(){ document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); self.classList.remove("is-dragging"); th.classList.remove("is-dragging"); self.emit(); };
      document.addEventListener("pointermove", move); document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up);
    }
    onKey(e, i){
      if (this.hasAttribute("disabled")) return;
      var v = this.values[i], st = this.step, nv = { ArrowRight: v + st, ArrowUp: v + st, ArrowLeft: v - st, ArrowDown: v - st, PageUp: v + st * 10, PageDown: v - st * 10, Home: this.min, End: this.max }[e.key];
      if (nv == null) return;
      e.preventDefault(); this.setIndex(i, nv, true);
    }
  }
  CdsSlider.define("cds-slider");
})();
} catch (e) { console.error("[cds] components/slider/slider.js", e); }

/* ==== components/slider/slider.playground.js ==== */
try {
/* Playground — Slider */
CDS.register({
  id: "slider", name: "Slider", category: "Slider", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20056-11908",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-slider", { value: "0", style: "margin-top:var(--common-sizes-32)" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value != null ? String(e.detail.value) : e.detail.start + " a " + e.detail.end, false); });
    kit.hint(panel, "Arraste, clique na trilha ou use setas, PageUp/PageDown, Home/End. O Value do Figma é só prototipação (description); aqui o valor é numérico.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single"],["range","Range"]], onChange: function(v){
      if (v === "range"){ p.setAttribute("kind", "range"); p.setAttribute("min", "-50"); p.setAttribute("max", "50"); p.setAttribute("start", "-20"); p.setAttribute("end", "20"); }
      else { ["kind","min","max","start","end"].forEach(function(a){ p.removeAttribute(a); }); p.setAttribute("value", "0"); } } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["dragged","Dragged"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", /hovered|pressed|dragged/.test(v) ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.section(panel, "Booleans");
    [["show-stops","Show Stops"],["show-value-indicator","Show Value Indicator"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Valores");
    kit.text(panel, { label: "Step", value: "10", onInput: function(v){ p.setAttribute("step", v); } });
  }
});
} catch (e) { console.error("[cds] components/slider/slider.playground.js", e); }

/* ==== components/spinner/spinner.js ==== */
try {
/**
 * @deps —
 * <cds-spinner> — Spinner · Loaders · set 4333:3181
 * Geometria da variante Size=Large (32px): anel r=14.22 · espessura 3.56 (= 32/9) · arco de 90° no quadrante superior esquerdo.
 * "Spinner Position" (0–3) é a animação de protótipo — no código vira rotação contínua em 4 passos.
 *
 * Atributos (padrões do Figma):
 *   appearance  neutral | accent | inversed · padrão neutral
 *   size        small (16) | medium (24) | large (32) · padrão small
 *   label       texto anunciado · padrão "Carregando"
 */
(function(){
  "use strict";
  var SVG = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">' +
            '<circle class="cds-spin__track" cx="16" cy="16" r="14.2222" stroke-width="3.5556"/>' +
            '<path class="cds-spin__arc" d="M1.7778 16A14.2222 14.2222 0 0 1 16 1.7778" stroke-width="3.5556" stroke-linecap="round"/>' +
            '</svg>';
  class CdsSpinner extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    connectedCallback(){ if (!this.firstChild) this.innerHTML = SVG; this.update(); }
    attributeChangedCallback(){ if (this.isConnected) this.update(); }
    update(){
      this.setAttribute("role", "status");
      this.setAttribute("aria-label", this.getAttribute("label") || "Carregando");
    }
  }
  CdsSpinner.define("cds-spinner");
})();
} catch (e) { console.error("[cds] components/spinner/spinner.js", e); }

/* ==== components/spinner/spinner.playground.js ==== */
try {
/* Playground — Spinner */
CDS.register({
  id: "spinner", name: "Spinner", category: "Loaders",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4333-3181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-spinner", { appearance: "neutral", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 16"],["medium","Medium 24"],["large","Large 32"]], onChange: function(v){ set("size", v); } });
    kit.hint(panel, "<code>Spinner Position</code> (0–3) é a animação do protótipo: aqui vira rotação contínua em 4 passos de 200ms ease-out.");
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (anunciado em role=status)", value: "Carregando", onInput: function(v){ set("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/spinner/spinner.playground.js", e); }

/* ==== components/status-dot/status-dot.js ==== */
try {
/**
 * @deps —
 * <cds-status-dot> — Status Dot · Status · set 21745:69
 * O rótulo carrega a informação; o ponto é reforço visual (aria-hidden) — description do set.
 *
 * Atributos (padrões do Figma):
 *   label       Text Label · padrão "Label"
 *   appearance  neutral | positive | warning | informative | negative · padrão neutral
 *   size        small | medium | large · padrão small
 */
(function(){
  "use strict";
  class CdsStatusDot extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._t){
        var d = document.createElement("span"); d.className = "cds-sd__dot"; d.setAttribute("aria-hidden", "true");
        this._t = document.createElement("span");
        this.appendChild(d); this.appendChild(this._t);
      }
      this._t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label";
    }
  }
  CdsStatusDot.define("cds-status-dot");
})();
} catch (e) { console.error("[cds] components/status-dot/status-dot.js", e); }

/* ==== components/status-dot/status-dot.playground.js ==== */
try {
/* Playground — Status Dot */
CDS.register({
  id: "status-dot", name: "Status Dot", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=21745-69",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-status-dot", { label: "Label", appearance: "neutral", size: "small" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["informative","Informative"],["negative","Negative"]], onChange: function(v){ set("appearance", v); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small"],["medium","Medium"],["large","Large"]], onChange: function(v){ set("size", v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", hint: "Escreva o status por extenso — o ponto é só reforço visual.", onInput: function(v){ p.setAttribute("label", v); } });
  }
});
} catch (e) { console.error("[cds] components/status-dot/status-dot.playground.js", e); }

/* ==== components/switch/switch.js ==== */
try {
/**
 * @deps selection-control
 * <cds-switch> — Switch · Selection Controls · set 4895:809
 * Atributos: label · show-text-label · status (unselected | selected) · disabled · name · value
 * <input type="checkbox" role="switch"> — o leitor de tela anuncia "ligado/desligado".
 */
(function(){
  "use strict";
  class CdsSwitch extends CDS.SelectionControl {
    static get inputType(){ return "checkbox"; }
    buildBox(box){ box.appendChild(CDS.create("span", null, "cds-sw__toggle")); }
    build(){ super.build(); this._input.setAttribute("role", "switch"); }
  }
  CdsSwitch.define("cds-switch");
})();
} catch (e) { console.error("[cds] components/switch/switch.js", e); }

/* ==== components/switch/switch.playground.js ==== */
try {
/* Playground — Switch */
CDS.register({
  id: "switch", name: "Switch", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4895-809",
  mount: function(ctx){ ctx.kit.selectionControl(ctx, { tag: "cds-switch", statuses: [["unselected","Unselected"],["selected","Selected"]],
    extraHint: "Motion de 300ms (exceção do Switch: o toggle percorre distância)." }); }
});
} catch (e) { console.error("[cds] components/switch/switch.playground.js", e); }

/* ==== components/selection-group/selection-group.js ==== */
try {
/**
 * @deps checkbox radio-button switch
 * <cds-checkbox-group> · <cds-radio-button-group> · <cds-switch-group> — containers dos Selection Controls.
 * Os itens são filhos diretos (light DOM), como o Slot do Figma.
 *
 * Atributos: label — nome acessível do grupo (aria-label) · name (só Radio: aplicado aos filhos sem name)
 * Radio Button Group usa role="radiogroup"; os outros, role="group".
 */
(function(){
  "use strict";
  var uid = 0;
  function make(role){
    return class extends CDS.Element {
      static get observedAttributes(){ return ["label", "name"]; }
      render(){
        this.setAttribute("role", role);
        if (this.getAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label")); else this.removeAttribute("aria-label");
        if (role === "radiogroup"){
          var name = this.getAttribute("name") || (this._auto = this._auto || "cds-radio-" + (++uid));
          this.querySelectorAll("cds-radio-button:not([name])").forEach(function(r){ r.setAttribute("name", name); });
        }
      }
    };
  }
  make("group").define("cds-checkbox-group");
  make("radiogroup").define("cds-radio-button-group");
  make("group").define("cds-switch-group");
})();
} catch (e) { console.error("[cds] components/selection-group/selection-group.js", e); }

/* ==== components/selection-group/selection-group.playground.js ==== */
try {
/* Playground — Checkbox Group · Radio Button Group · Switch Group */
(function(){
  var FIG = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=";
  [["checkbox-group","Checkbox Group","cds-checkbox-group","cds-checkbox","4132-1511"],
   ["radio-button-group","Radio Button Group","cds-radio-button-group","cds-radio-button","4429-11192"],
   ["switch-group","Switch Group","cds-switch-group","cds-switch","4895-1233"]].forEach(function(g){
    CDS.register({
      id: g[0], name: g[1], category: "Selection Controls", figma: FIG + g[4],
      mount: function(ctx){
        var kit = ctx.kit, panel = ctx.panel;
        var group = kit.el(g[2], { label: "Opções" });
        ctx.preview.appendChild(group);
        function fill(n){
          group.innerHTML = "";
          for (var i = 1; i <= n; i++) group.appendChild(kit.el(g[3], { label: "Opção " + i, status: "unselected" }));
          group.render && group.render();
          readout();
        }
        function readout(){ var sel = group.querySelectorAll('[status="selected"]'); ctx.readout(Array.prototype.map.call(sel, function(x){ return x.getAttribute("label"); }).join(", "), false); }
        group.addEventListener("cds-change", readout);
        kit.section(panel, "Conteúdo (Slot)");
        kit.range(panel, { label: "Itens", min: 1, max: 6, value: 6, onInput: fill });
        kit.text(panel, { label: "label (nome acessível do grupo)", value: "Opções", onInput: function(v){ kit.attr(group, "label", v); } });
        kit.hint(panel, "Coluna com gap 8. O Figma mostra 6 itens; a quantidade real é definida pelo uso.");
        kit.section(panel, "Nested instances");
        var refresh = kit.nested(panel, { title: g[3].replace("cds-", ""), exposed: true, note: "Cada item é uma instância independente; selecione para ver o Status.",
          items: function(){ return Array.prototype.map.call(group.children, function(_, i){ return String(i + 1); }); },
          props: function(i){ var c = group.children[i]; return c ? [["Text Label", c.getAttribute("label")], ["Status", c.getAttribute("status")], ["State", c.hasAttribute("disabled") ? "Disabled" : "Enabled"]] : []; } });
        kit.watch(group, refresh);
        fill(6);
      }
    });
  });
})();
} catch (e) { console.error("[cds] components/selection-group/selection-group.playground.js", e); }

/* ==== components/system-banner/system-banner.js ==== */
try {
/**
 * @deps alert
 * <cds-system-banner> — System Banner · Feedback · set 18432:2090
 * Mesma anatomia e props do Alert; ocupa a largura toda (sem raio, mínimo 360px). Ver alert.js.
 */
(function(){
  "use strict";
  class CdsSystemBanner extends CDS.Alert {}
  CdsSystemBanner.define("cds-system-banner");
})();
} catch (e) { console.error("[cds] components/system-banner/system-banner.js", e); }

/* ==== components/system-banner/system-banner.playground.js ==== */
try {
/* Playground — System Banner */
CDS.register({
  id: "system-banner", name: "System Banner", category: "Feedback", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=18432-2090",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p, rich = false;
    var attrs = { label: "Label" };
    function make(){
      p = kit.el("cds-system-banner", attrs);
      if (rich) p.innerHTML = 'A message about the system here! You can turn words <b>bold</b> also add a <a href="#">link</a>.';
      p.addEventListener("cds-close", function(){ ctx.readout("fechado — clique em Mostrar de novo", false); });
      ctx.preview.innerHTML = ""; ctx.preview.appendChild(p);
    }
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; kit.attr(p, k, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"],["informative","Informative"]], hint: "Warning usa role=alert; os outros, role=status.", onChange: function(v){ set("appearance", v === "positive" ? null : v); } });
    kit.button(panel, { label: "Mostrar de novo", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Label", checked: true, onChange: function(on){ set("show-label", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Close Button", checked: true, onChange: function(on){ set("show-close-button", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Text Content", value: "A message about the system here! You can turn words bold also add a link.", onInput: function(v){ rich = false; set("text", v); } });
    kit.toggle(panel, { label: "Conteúdo rico (negrito e link como filhos)", onChange: function(on){ rich = on; make(); } });
    kit.section(panel, "Nested instances");
    var refs = [
      kit.nested(panel, { title: "Shaped Icon", exposed: false, note: "Small (40). Ícone e cor seguem o Appearance.", props: function(){ var s = p && p.iconEl; return s ? [["Appearance", s.getAttribute("appearance")], ["Icon", s.getAttribute("icon")], ["Size", "Small"]] : []; } }),
      kit.nested(panel, { title: ".Close Alert", exposed: true, note: "Building block. Clique fecha (cds-close, cancelável).", props: function(){ var c = p && p.closeEl; return c ? [["Show", String(!c.hidden)]] : []; } })
    ];
    make(); kit.watch(ctx.preview, function(){ refs.forEach(function(f){ f(); }); });
  }
});
} catch (e) { console.error("[cds] components/system-banner/system-banner.playground.js", e); }

/* ==== components/tab-item/tab-item.js ==== */
try {
/**
 * @deps icon
 * <cds-tab-item> — .Item (Tabs) · .Building Blocks · set 6498:375
 * 48 de altura · Label Content (pad 4 8 · gap 4 · raio micro) com Lead Item (Choose Icon, oculto por padrão) + Label.
 * Is Active=True: sublinhado 2px Accent/Solid/medium · Label/Medium Text/intense.
 * Hovered: sublinhado 2px Border/semi-soft + Label Content Surface/01 · Pressed: sublinhado Accent/Solid/medium + Surface/01 + Label/Medium.
 * Atributos: label ("Label") · icon (placeholder-line) · show-lead-item · is-active · disabled · controls (id do painel)
 *   state="hovered|pressed" (specimen)
 * É um <button role="tab"> (a lista cuida de aria-selected, tabindex e teclado).
 */
(function(){
  "use strict";
  class CdsTabItem extends CDS.Element {
    static get observedAttributes(){ return ["label","icon","show-lead-item","is-active","disabled","controls"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", role: "tab" }, "cds-tab"));
        var c = b.appendChild(CDS.create("span", null, "cds-tab__content"));
        this.iconEl = c.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-tab__icon"));
        this.labelEl = c.appendChild(CDS.create("span", null, "cds-tab__label"));
      }
      var on = this.hasAttribute("is-active");
      this.labelEl.textContent = this.text("label", "Label");
      CDS.attr(this.iconEl, "icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.hidden = this.getAttribute("show-lead-item") !== "true"; // Show Lead Item: padrão False
      CDS.attr(this.btn, "aria-selected", String(on));
      // foco itinerante: dentro de uma tablist só a aba ativa entra no Tab
      this.btn.tabIndex = !this.parentElement || this.parentElement.getAttribute("role") !== "tablist" || on ? 0 : -1;
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-controls", this.getAttribute("controls"));
    }
  }
  CdsTabItem.define("cds-tab-item");
})();
} catch (e) { console.error("[cds] components/tab-item/tab-item.js", e); }

/* ==== components/tab-item/tab-item.playground.js ==== */
try {
/* Playground — .Item (Tabs, building block) */
CDS.register({
  id: "tab-item", name: ".Item (Tabs)", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6498-375",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-tab-item", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "is-active", on); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Item", checked: false, onChange: function(on){ kit.attr(p, "show-lead-item", on ? "true" : null); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Choose Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/tab-item/tab-item.playground.js", e); }

/* ==== components/tab-list/tab-list.js ==== */
try {
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
} catch (e) { console.error("[cds] components/tab-list/tab-list.js", e); }

/* ==== components/fixed-tab/fixed-tab.js ==== */
try {
/**
 * @deps tab-list
 * <cds-fixed-tab> — Fixed Tab · Navigation · set 6500:6958 (Active Item 1|2|3)
 * Abas com a largura dividida igualmente (os .Item em Fill). Amostra: 3 abas.
 */
(function(){
  "use strict";
  class CdsFixedTab extends CDS.TabList { get sampleCount(){ return 3; } }
  CdsFixedTab.define("cds-fixed-tab");
})();
} catch (e) { console.error("[cds] components/fixed-tab/fixed-tab.js", e); }

/* ==== components/fixed-tab/fixed-tab.playground.js ==== */
try {
/* Playground — Fixed Tab */
CDS.register({
  id: "fixed-tab", name: "Fixed Tab", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6500-6958",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-fixed-tab", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Active Item " + e.detail.index, false); seg.setValue(String(e.detail.index)); });
    kit.hint(panel, "Setas, Home e End trocam de aba (só a ativa entra no Tab).");
    kit.section(panel, "Variants");
    var opts = []; for (var i = 1; i <= 3; i++) opts.push([String(i), String(i)]);
    var seg = kit.seg(panel, { label: "Active Item", value: "1", options: opts, onChange: function(v){ p.setAttribute("active-item", v); } });
    kit.section(panel, "Nested instances");
    kit.toggle(panel, { label: "Show Lead Item (.Item)", checked: false, onChange: function(on){ p.querySelectorAll("cds-tab-item").forEach(function(t){ kit.attr(t, "show-lead-item", on ? "true" : null); }); } });
  }
});
} catch (e) { console.error("[cds] components/fixed-tab/fixed-tab.playground.js", e); }

/* ==== components/scrollable-tab/scrollable-tab.js ==== */
try {
/**
 * @deps tab-list
 * <cds-scrollable-tab> — Scrollable Tab · Navigation · set 6646:181 (Active Item 1–6)
 * Abas no tamanho do conteúdo, com rolagem horizontal (overflow HORIZONTAL no Figma). A aba ativa rola para a vista.
 * Amostra: 6 abas.
 */
(function(){
  "use strict";
  class CdsScrollableTab extends CDS.TabList {
    get sampleCount(){ return 6; }
    afterRender(a){ var it = this.items[a - 1]; if (it && this._shown) it.scrollIntoView({ block: "nearest", inline: "nearest" }); this._shown = true; }
  }
  CdsScrollableTab.define("cds-scrollable-tab");
})();
} catch (e) { console.error("[cds] components/scrollable-tab/scrollable-tab.js", e); }

/* ==== components/scrollable-tab/scrollable-tab.playground.js ==== */
try {
/* Playground — Scrollable Tab */
CDS.register({
  id: "scrollable-tab", name: "Scrollable Tab", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6646-181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-scrollable-tab", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Active Item " + e.detail.index, false); seg.setValue(String(e.detail.index)); });
    kit.hint(panel, "Setas, Home e End trocam de aba (só a ativa entra no Tab). Abas no tamanho do texto, com rolagem horizontal.");
    kit.section(panel, "Variants");
    var opts = []; for (var i = 1; i <= 6; i++) opts.push([String(i), String(i)]);
    var seg = kit.seg(panel, { label: "Active Item", value: "1", options: opts, onChange: function(v){ p.setAttribute("active-item", v); } });
    kit.section(panel, "Nested instances");
    kit.toggle(panel, { label: "Show Lead Item (.Item)", checked: false, onChange: function(on){ p.querySelectorAll("cds-tab-item").forEach(function(t){ kit.attr(t, "show-lead-item", on ? "true" : null); }); } });
  }
});
} catch (e) { console.error("[cds] components/scrollable-tab/scrollable-tab.playground.js", e); }

/* ==== components/tab-view/tab-view.js ==== */
try {
/**
 * @deps icon-button
 * <cds-tab-view> — Tab View · Navigation · set 15713:2488 (State × Active Option)
 * Alterna a visualização (lista × grade): dois Icon Buttons Medium; o ativo é Default · Accent, o outro Ghost · Neutral.
 * Container: stroke Border/semi-soft · raio medium · pad 8 · gap 8 · Disabled: Opacity/medium.
 * Atributos: active-option (first|second · padrão first) · disabled
 *   first-icon (view-list-line) · second-icon (view-module-line) · first-label ("Lista") · second-label ("Grade") · label ("Visualização")
 * Acessibilidade: radiogroup com dois radios (setas trocam). Evento: cds-change { option }
 */
(function(){
  "use strict";
  class CdsTabView extends CDS.Element {
    static get observedAttributes(){ return ["active-option","disabled","first-icon","second-icon","first-label","second-label","label"]; }
    get option(){ return this.getAttribute("active-option") === "second" ? "second" : "first"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.setAttribute("role", "radiogroup");
        this.btns = ["first", "second"].map(function(o){
          var b = self.appendChild(CDS.create("cds-icon-button", { size: "medium" }, "cds-tv__btn"));
          b.dataset.option = o;
          b.addEventListener("click", function(){ self.choose(o, true); });
          return b;
        });
        this.addEventListener("keydown", function(e){
          if (!/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
          e.preventDefault(); var o = self.option === "first" ? "second" : "first"; self.choose(o, true);
          var ib = self.btns[o === "first" ? 0 : 1].querySelector("button"); if (ib) ib.focus();
        });
      }
      var cur = this.option, dis = this.hasAttribute("disabled");
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Visualização");
      CDS.attr(this, "aria-disabled", dis ? "true" : null);
      this.btns.forEach(function(b){
        var o = b.dataset.option, on = o === cur;
        CDS.attr(b, "kind", on ? "default" : "ghost"); CDS.attr(b, "appearance", on ? "accent" : "neutral");
        CDS.attr(b, "icon", self.getAttribute(o + "-icon") || (o === "first" ? "view-list-line" : "view-module-line"));
        CDS.attr(b, "label", self.getAttribute(o + "-label") || (o === "first" ? "Lista" : "Grade"));
        CDS.attr(b, "disabled", dis ? "" : null);
        var ib = b.querySelector("button");
        if (ib){ ib.setAttribute("role", "radio"); ib.setAttribute("aria-checked", String(on)); ib.removeAttribute("aria-pressed"); ib.tabIndex = on ? 0 : -1; }
      });
    }
    choose(o, emit){
      if (this.hasAttribute("disabled") || o === this.option) return;
      this.setAttribute("active-option", o);
      if (emit) this.dispatchEvent(new CustomEvent("cds-change", { detail: { option: o }, bubbles: true }));
    }
  }
  CdsTabView.define("cds-tab-view");
})();
} catch (e) { console.error("[cds] components/tab-view/tab-view.js", e); }

/* ==== components/tab-view/tab-view.playground.js ==== */
try {
/* Playground — Tab View */
CDS.register({
  id: "tab-view", name: "Tab View", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15713-2488",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-tab-view", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Active Option: " + e.detail.option, false); });
    kit.hint(panel, "Troca a visualização (lista × grade). Setas alternam; é um radiogroup.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Active Option", value: "first", options: [["first","First"],["second","Second"]], onChange: function(v){ p.setAttribute("active-option", v); } });
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "First Icon", value: "view-list-line", onChange: function(v){ p.setAttribute("first-icon", v); } });
    kit.iconSwap(panel, { label: "Second Icon", value: "view-module-line", onChange: function(v){ p.setAttribute("second-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/tab-view/tab-view.playground.js", e); }

/* ==== components/table-head/table-head.js ==== */
try {
/**
 * @deps icon checkbox
 * CDS.TableHead — conteúdo do .Head (Tables · set 13382:1327 · Kind Default|Multi Selection × Sort Default|Up|Down × State).
 * 56 · Surface/01 · borda inferior Border/semi-soft · pad 0 16 0 20 (Multi Selection: 0 20) · gap 8 · Caption/Medium Text/intense.
 * Sort: up-line / down-line quando ordenado; up-down-line só no hover (Sort=Default). Hovered: Neutral/Opacity/Intense/semi-transparent ·
 * Pressed: Neutral/Solid/semi-soft.
 * <cds-table-head> (building block): kind (default|multi-selection) · sort (default|up|down) · text-head ("Head") · show-heading-text · state
 */
(function(){
  "use strict";
  var ICON = { up: "up-line", down: "down-line", "default": "up-down-line" };
  // el: th ou div · o = { kind, sort, text, showText, sortable, status }
  function fill(el, o){
    el.innerHTML = ""; el.classList.add("cds-th"); el.setAttribute("data-kind", o.kind === "multi" ? "multi" : "default");
    if (o.kind === "multi"){
      el.appendChild(CDS.create("cds-checkbox", { "show-text-label": "false", label: o.label || "Selecionar todas as linhas", status: o.status || null }, "cds-th__check"));
      return el;
    }
    var host = o.sortable ? el.appendChild(CDS.create("button", { type: "button" }, "cds-th__btn")) : el.appendChild(CDS.create("span", null, "cds-th__btn"));
    var t = host.appendChild(CDS.create("span", null, "cds-th__text")); t.textContent = o.text == null ? "Head" : o.text; t.hidden = o.showText === false;
    if (o.sortable !== false) host.appendChild(CDS.create("cds-icon", { icon: ICON[o.sort || "default"], size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-th__sort" + (o.sort && o.sort !== "default" ? " is-sorted" : "")));
    return el;
  }
  CDS.TableHead = { fill: fill };
  class CdsTableHead extends CDS.Element {
    static get observedAttributes(){ return ["kind","sort","text-head","show-heading-text"]; }
    render(){ fill(this, { kind: this.getAttribute("kind") === "multi-selection" ? "multi" : "default", sort: this.getAttribute("sort") || "default", text: this.getAttribute("text-head"), showText: this.flag("show-heading-text"), sortable: true }); }
  }
  CdsTableHead.define("cds-table-head");
})();
} catch (e) { console.error("[cds] components/table-head/table-head.js", e); }

/* ==== components/table-head/table-head.playground.js ==== */
try {
/* Playground — .Head (building block) */
CDS.register({
  id: "table-head", name: ".Head", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13382-1327",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table-head", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["multi-selection","Multi Selection"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Sort", value: "default", options: [["default","Default"],["up","Up"],["down","Down"]], onChange: function(v){ kit.attr(p, "sort", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Head", value: "Head", onInput: function(v){ p.setAttribute("text-head", v); } });
  }
});
} catch (e) { console.error("[cds] components/table-head/table-head.playground.js", e); }

/* ==== components/table-toolbar/table-toolbar.js ==== */
try {
/**
 * @deps icon-button
 * <cds-table-toolbar> — .Toolbar · .Building Blocks · componente 13438:14337
 * 64 · Surface/default · borda inferior Border/semi-soft · pad 8 16 · gap 4 · Slot (amostra: 3 Icon Buttons Ghost Neutral Small).
 * Os filhos de quem usa são o Slot.
 */
(function(){
  "use strict";
  class CdsTableToolbar extends CDS.Element {
    render(){
      if (this._built) return; this._built = true;
      this.setAttribute("role", "toolbar"); if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Ações da tabela");
      if (!this.children.length) for (var i = 1; i <= 3; i++) this.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "placeholder-line", label: "Ação " + i }));
    }
  }
  CdsTableToolbar.define("cds-table-toolbar");
})();
} catch (e) { console.error("[cds] components/table-toolbar/table-toolbar.js", e); }

/* ==== components/table-toolbar/table-toolbar.playground.js ==== */
try {
/* Playground — .Toolbar (building block) */
CDS.register({
  id: "table-toolbar", name: ".Toolbar", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-14337",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table-toolbar", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Slot: os filhos de quem usa. Amostra com 3 Icon Buttons Ghost Neutral Small.");
  }
});
} catch (e) { console.error("[cds] components/table-toolbar/table-toolbar.playground.js", e); }

/* ==== components/tag/tag.js ==== */
try {
/**
 * @deps icon
 * <cds-tag> — Tag · Status · set 4475:114
 * Compõe um <cds-icon size="small" appearance="neutral"> (nested instance) com override de cor.
 *
 * Atributos (padrões do Figma):
 *   label          Text Label · padrão "Tag"
 *   appearance     neutral | positive | warning | negative | informative | accent | inversed · padrão neutral
 *   icon           Choose Icon do Icon aninhado · padrão "placeholder-line"
 *   show-lead-item "false" esconde o ícone · padrão ligado
 */
(function(){
  "use strict";
  class CdsTag extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-item"]; }
    render(){
      this.innerHTML = "";
      this.iconEl = null;
      if (this.flag("show-lead-item")){
        this.iconEl = document.createElement("cds-icon");
        this.iconEl.setAttribute("icon", this.getAttribute("icon") || "placeholder-line");
        this.iconEl.setAttribute("size", "small");
        this.iconEl.setAttribute("appearance", "neutral");
        this.appendChild(this.iconEl);
      }
      var t = document.createElement("span");
      t.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Tag";
      this.appendChild(t);
    }
  }
  CdsTag.define("cds-tag");
})();
} catch (e) { console.error("[cds] components/tag/tag.js", e); }

/* ==== components/tag/tag.playground.js ==== */
try {
/* Playground — Tag */
CDS.register({
  id: "tag", name: "Tag", category: "Status",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4475-114",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-tag", { label: "Tag", appearance: "neutral" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"],["accent","Accent"],["inversed","Inversed"]], onChange: function(v){ set("appearance", v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Item", checked: true, onChange: function(on){ set("show-lead-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Tag", onInput: function(v){ p.setAttribute("label", v); } });

    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Icon › Choose Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });
    var refresh = kit.nested(panel, {
      title: "Icon", exposed: false, note: "Size Small e Appearance Neutral fixos; a cor é override que acompanha o texto da Tag.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Appearance", "neutral (override de cor)"], ["Size", "small"]] : [["Show Lead Item", "false"]]; }
    });
    kit.watch(p, refresh);
  }
});
} catch (e) { console.error("[cds] components/tag/tag.playground.js", e); }

/* ==== components/balance-card/balance-card.js ==== */
try {
/**
 * @deps icon tag currency
 * <cds-balance-card> — Balance Card · Actions · set 17881:1707
 * Saldo de uma categoria: Lead Icon · Header Tag (Warning) · Label · Currency (Large) · Bottom Tag (Informative).
 * Ponto de entrada para o detalhe da categoria: o card inteiro é clicável (<a> com href, <button> sem).
 *
 * Atributos: label · value ("100,00") · symbol ("R$") · show-value · icon (Lead Icon)
 *   header-tag · bottom-tag (textos, padrão "Tag") · show-header-tag · show-bottom-tag
 *   href · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsBalanceCard extends CDS.Element {
    static get observedAttributes(){ return ["label","value","symbol","show-value","icon","header-tag","bottom-tag","show-header-tag","show-bottom-tag","href","disabled"]; }
    render(){
      var href = this.getAttribute("href"), dis = this.hasAttribute("disabled");
      this.innerHTML = "";
      var el = this.target = CDS.create(href && !dis ? "a" : "button", null, "cds-bc");
      if (href && !dis) el.href = href; else { el.type = "button"; el.disabled = dis; }
      var head = el.appendChild(CDS.create("span", null, "cds-bc__head"));
      head.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("icon") || "placeholder-line", size: "large", appearance: "neutral" }));
      if (this.flag("show-header-tag")) head.appendChild(CDS.create("cds-tag", { appearance: "warning", label: this.text("header-tag", "Tag"), "show-lead-item": "false" }));
      var content = el.appendChild(CDS.create("span", null, "cds-bc__content"));
      var main = content.appendChild(CDS.create("span", null, "cds-bc__main"));
      main.appendChild(CDS.create("span", null, "cds-bc__label")).textContent = this.text("label", "Label");
      var cur = { size: "large", appearance: "neutral", value: this.text("value", "100,00") };
      if (this.getAttribute("symbol")) cur.symbol = this.getAttribute("symbol");
      if (this.getAttribute("show-value") === "false") cur["show-value"] = "false";
      main.appendChild(CDS.create("cds-currency", cur));
      if (this.flag("show-bottom-tag")) content.appendChild(CDS.create("cds-tag", { appearance: "informative", label: this.text("bottom-tag", "Tag"), "show-lead-item": "false" }));
      this.appendChild(el);
    }
  }
  CdsBalanceCard.define("cds-balance-card");
})();
} catch (e) { console.error("[cds] components/balance-card/balance-card.js", e); }

/* ==== components/balance-card/balance-card.playground.js ==== */
try {
/* Playground — Balance Card */
CDS.register({
  id: "balance-card", name: "Balance Card", category: "Actions", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17881-1707",
  zeroheight: "https://castanha.caju.com.br/858426090/v/latest/p/373420",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-balance-card", {}); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("abrir detalhe", true); });
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Hovered (Label mais forte) e Pressed (borda) são interação. O card inteiro é clicável. Experimente: Refeição · 320,50 · meal-line.");
    kit.section(panel, "Booleans");
    [["show-header-tag","Show Header Tag"],["show-bottom-tag","Show Bottom Tag"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.toggle(panel, { label: "Currency · Show Value", checked: true, onChange: function(on){ kit.attr(p, "show-value", on ? null : "false"); } });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["value","Valor","100,00"],["header-tag","Header Tag","Tag"],["bottom-tag","Bottom Tag","Tag"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/balance-card/balance-card.playground.js", e); }

/* ==== components/balance-card/balance-card.docs.js ==== */
try {
/* Documentação — Balance Card
   Fonte: [CastanhaDS] Component use documentation · seção 6695:9618 · frame [Documentação] Balance Card
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Composição e Acessibilidade estão ocultas no Figma e aparecem aqui;
   os 2 Do/Don'ts ocultos ficaram de fora. Shortcut e Big number não estão na lib: as comparações mostram só o Balance Card (CONFERIR C89).
   Motion ainda é placeholder no Figma (C90). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["balance-card"] = {
  tag: "cds-balance-card",
  base: {},
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6695-9618",
  // Capa (frame [Header] do Figma), acima das tabs
  cover: { description: "Exibe o saldo de uma categoria com rótulo, valor e status complementares.", attrs: { icon: "meal-line", "header-tag": "Novo", label: "Alimentação", value: "100,00", "bottom-tag": "Voucher" } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Balance Card exibe o saldo de uma categoria com rótulo, valor e status complementares. É um componente interativo e funciona como ponto de entrada para o detalhe ou o extrato da categoria." },
      { h3: "Nomes alternativos comuns" },
      { p: "Category card, Balance tile, Stat card, Summary card, Wallet card." },
      { h3: "Princípios" },
      { cards: [
        ["Um saldo por card", "Cada card representa uma única categoria. Não agrupe valores de categorias diferentes no mesmo bloco."],
        ["Status complementa, não substitui", "As tags apoiam a leitura do saldo. Ative apenas quando a informação muda a decisão da pessoa usuária."],
        ["Toque previsível", "O card é sempre clicável e leva ao detalhe da categoria. Não utilize como elemento apenas informativo."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Balance Card quando a pessoa usuária precisar consultar o saldo de uma categoria e acessar seu detalhe a partir dali. Ele funciona bem em listas e grids, onde comparar valores entre categorias faz parte da tarefa, e suporta status complementares quando o saldo tem alguma condição associada." },
      { h3: "Utilize para:" },
      { ul: ["Exibir saldo por categoria em listas ou grids", "Dar entrada ao detalhe ou ao extrato da categoria", "Sinalizar status ligado ao saldo, como bloqueio ou vencimento", "Compor painéis de saldo com múltiplas categorias"] },
      { h3: "Não utilize para:" },
      { ul: ["Exibir um valor isolado, sem categoria (utilize o Currency)", "Elementos não clicáveis, já que o card tem estados de interação", "Agrupar vários valores no mesmo bloco (utilize List ou Table)", "Ações sem valor monetário associado (utilize o Shortcut)"] },
      { h3: "Balance Card vs Shortcut" },
      { p: "Use o Balance Card quando o saldo de uma categoria for a informação principal e a pessoa usuária precisar consultá-lo para decidir algo — especialmente quando o valor precisa de destaque ou vem acompanhado de um status, como bloqueio ou vencimento." },
      { p: "O Shortcut é indicado para acessos rápidos e recorrentes, em que o valor aparece apenas como apoio e o objetivo é chegar à ação em menos toques, desde que a categoria seja reconhecível pelo ícone e por um rótulo curto." },
      { compare: [{ title: "Este é um Balance Card", attrs: {} }] },
      { h3: "Balance Card vs Big number" },
      { p: "Use o Balance Card quando o saldo precisar ser consultado e levar a um destino, como o detalhe ou o extrato da categoria — o card é sempre clicável e responde a interação. O Big number é indicado quando o valor existe apenas para ser lido com ênfase, sem nenhuma ação associada, como em painéis e resumos de leitura." },
      { compare: [{ title: "Este é um Balance Card", attrs: {} }] },
      { note: "Shortcut e Big number ainda não estão na lib do playground; por isso a comparação mostra só o Balance Card." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: {},
        markers: [
          { n: 1, target: ".cds-bc__head > cds-icon", side: "left" }, // Figma: Right (C92)
          { n: 2, target: ".cds-bc__head > cds-tag", side: "right" }, // Figma: Left (C92)
          { n: 3, target: ".cds-bc__label", side: "left" },
          { n: 4, target: "cds-currency", side: "right" },
          { n: 5, target: ".cds-bc__content > cds-tag", side: "left" }
        ],
        legend: ["Lead Icon — ícone da categoria", "Header Tag — status opcional", "Label — nome da categoria", "Currency — valor do saldo", "Bottom Tag — informação complementar opcional"]
      } },
      { h2: "Composição do componente" },
      { p: "O Balance Card é composto por:" },
      { ul: [
        "Lead Icon (obrigatório): ícone da categoria, trocável via instance swap",
        "Header Tag (opcional): status no topo do card, controlado por `Show Header Tag`",
        "Label (obrigatório): nome da categoria, editável via `Text Label`",
        "Currency (obrigatório): valor do saldo em formato monetário",
        "Bottom Tag (opcional): informação complementar, controlada por `Show Bottom Tag`"
      ] },
      { h2: "Propriedades" },
      { props: [
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Lead Icon", type: "Swap component" },
        { name: "Show Header Tag", type: "Boolean" },
        { name: "Show Bottom Tag", type: "Boolean" }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados", min: "calc(var(--common-sizes-200) - var(--common-sizes-24))", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Leitura do card" },
      { ol: [
        "O card é anunciado como um único botão, não como elementos separados",
        "Lead Icon é decorativo e deve ser ignorado pelo leitor de tela",
        "Label — nome da categoria",
        "Currency — valor do saldo, lido por extenso",
        "Header Tag e Bottom Tag, quando ativas, após o valor"
      ] },
      { h2: "Contraste" },
      { ul: [
        "Label sobre `Surface/01`: 7,42:1 — atende AA e AAA",
        "Currency sobre `Surface/01`: 15,27:1 — atende AA e AAA",
        "Label no estado Hovered: 5,37:1 — atende AA",
        "Borda do estado Pressed: 7,42:1 — atende 1.4.11",
        "Disabled em 1,88:1 — isento por ser controle desabilitado"
      ] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { icon: "meal-line", "header-tag": "Novo", label: "Alimentação", "bottom-tag": "Voucher" }, title: "Mantenha o rótulo curto",
          text: "Use o nome da categoria sem complementos. O card cresce com o conteúdo a partir de 144px, e rótulos longos alargam o bloco e quebram o alinhamento do grid." },
        { attrs: { icon: "meal-line", "header-tag": "Novo saldo", label: "Alimentação", "show-bottom-tag": false }, title: "Ative as tags com parcimônia",
          text: "Cada tag comunica um único status. Ativar as duas ao mesmo tempo só se justifica quando as duas informações mudam a decisão da pessoa usuária." },
        { attrs: { icon: "meal-line", label: "Alimentação", "show-header-tag": false, "show-bottom-tag": false }, title: "Escolha um ícone que comunique a categoria",
          text: "Substituir o placeholder não é suficiente. O ícone precisa comunicar qual categoria o card representa, sem depender do rótulo para ser compreendido." },
        { attrs: [
            { icon: "meal-line", label: "Alimentação", "show-header-tag": false, "show-bottom-tag": false },
            { icon: "car-line", label: "Mobilidade", "show-header-tag": false, "show-bottom-tag": false }
          ], title: "Mantenha larguras iguais em um mesmo grupo",
          text: "O card cresce com o conteúdo a partir de 144px e não tem largura máxima. Em listas e grids, rótulos de tamanhos diferentes produzem cards desalinhados." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: [
            { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
            { icon: "car-line", label: "Mobilidade", value: "180,00", "show-header-tag": false, "show-bottom-tag": false }
          ], text: "Use um card por categoria, com o saldo daquela categoria." },
        { kind: "dont", attrs: { label: "Alimentação e Mobilidade", value: "600,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não some nem agrupe categorias diferentes no mesmo card." },
        { kind: "do", attrs: { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Use o Balance Card quando houver um detalhe ou extrato para abrir." },
        { kind: "dont", attrs: { label: "Total do mês", value: "600,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não use o card apenas para exibir informação, sem destino. Ele tem estados de interação." },
        { kind: "do", attrs: { icon: "meal-line", label: "Alimentação", value: "420,00", "show-header-tag": false, "show-bottom-tag": false },
          text: "Use o Balance Card quando o valor é o motivo da consulta." },
        { kind: "dont", attrs: { label: "Pedir cartão", value: "", "show-header-tag": false, "show-bottom-tag": false },
          text: "Não use o Balance Card para ação sem valor associado. Use o Shortcut nesses casos." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Balance Card no Figma ainda está com texto de exemplo (lorem ipsum). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/balance-card/balance-card.docs.js", e); }

/* ==== components/table-cell/table-cell.js ==== */
try {
/**
 * @deps icon currency-symbol tag checkbox link icon-button
 * CDS.TableCell — conteúdo do .Data Cell (Tables · set 13404:1015), usado pela Table (<td>) e pelo <cds-data-cell>.
 * Kind: text (Lead Icon + Body/Regular + Caption) · balance (R$ + Label/Regular, à direita) · percentage ("0,00" "%", à direita)
 *   · tag (Tag Neutral) · checkbox · link (Link Neutral + navigation-right-line) · actions (3 Icon Buttons Ghost Accent Small)
 * 64 de altura · Surface/default · borda inferior Border/semi-soft · Hovered: Surface/01.
 *
 * <cds-data-cell> (building block): kind · text ("Text content") · description · show-description · value ("1.000,00")
 *   · percentual ("0,00") · icon · state="hovered"
 */
(function(){
  "use strict";
  var KINDS = { text: 1, balance: 1, percentage: 1, tag: 1, checkbox: 1, link: 1, actions: 1 };
  function kindOf(k){ k = (k || "text").toLowerCase(); if (k === "default") k = "text"; if (k === "percentual") k = "percentage"; if (k === "action-controls" || k === "icon-buttons") k = "actions"; return KINDS[k] ? k : "text"; }
  // Preenche o elemento (td ou div) com o conteúdo do Kind. d = { text, description, showDescription, value, percentual, icon, label, href, actions: [{icon,label,action}], checked }
  function fill(el, kind, d){
    el.innerHTML = ""; el.classList.add("cds-td"); el.setAttribute("data-kind", kind);
    var w = el.appendChild(CDS.create("div", null, "cds-td__in"));
    if (kind === "text"){
      if (d.icon !== false) w.appendChild(CDS.create("cds-icon", { icon: d.icon || "placeholder-line", size: "small", appearance: "neutral", "aria-hidden": "true" }));
      var t = w.appendChild(CDS.create("div", null, "cds-td__text"));
      t.appendChild(CDS.create("span", null, "cds-td__main")).textContent = d.text == null ? "Text content" : d.text;
      if (d.showDescription !== false && d.description !== "") t.appendChild(CDS.create("span", null, "cds-td__desc")).textContent = d.description == null ? "Description" : d.description;
    } else if (kind === "balance"){
      w.appendChild(CDS.create("cds-currency-symbol"));
      w.appendChild(CDS.create("span", null, "cds-td__value")).textContent = d.value == null ? "1.000,00" : d.value;
    } else if (kind === "percentage"){
      w.appendChild(CDS.create("span", null, "cds-td__num")).textContent = (d.percentual == null ? "0,00" : d.percentual);
      w.appendChild(CDS.create("span", null, "cds-td__num")).textContent = "%";
    } else if (kind === "tag"){
      w.appendChild(CDS.create("cds-tag", { label: d.label || d.text || "Tag", appearance: d.appearance || null, "show-lead-item": d.showLeadItem === false ? "false" : null }));
    } else if (kind === "checkbox"){
      w.appendChild(CDS.create("cds-checkbox", { "show-text-label": "false", label: d.label || "Selecionar linha", status: d.checked ? "selected" : null }, "cds-td__check"));
    } else if (kind === "link"){
      w.appendChild(CDS.create("cds-link", { label: d.text || "Link content", href: d.href || "#" }));
    } else {
      (d.actions || [{ icon: "placeholder-line", label: "Ação 1" }, { icon: "placeholder-line", label: "Ação 2" }, { icon: "placeholder-line", label: "Ação 3" }]).forEach(function(a, i){
        var b = w.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "accent", size: "small", icon: a.icon || "placeholder-line", label: a.label || "Ação" }));
        b.dataset.action = a.action || String(i);
      });
    }
    return el;
  }
  CDS.TableCell = { fill: fill, kindOf: kindOf };

  class CdsDataCell extends CDS.Element {
    static get observedAttributes(){ return ["kind","text","description","show-description","value","percentual","icon"]; }
    render(){
      fill(this, kindOf(this.getAttribute("kind")), { text: this.getAttribute("text"), description: this.getAttribute("description"), showDescription: this.flag("show-description"),
        value: this.getAttribute("value"), percentual: this.getAttribute("percentual"), icon: this.getAttribute("icon") });
    }
  }
  CdsDataCell.define("cds-data-cell");
})();
} catch (e) { console.error("[cds] components/table-cell/table-cell.js", e); }

/* ==== components/table-cell/table-cell.playground.js ==== */
try {
/* Playground — .Data Cell (building block) */
CDS.register({
  id: "table-cell", name: ".Data Cell", category: "Tables", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13404-1015",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-data-cell", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Kind", value: "text", options: [["text","Text"],["balance","Balance"],["percentage","Percentage"],["tag","Tag"],["checkbox","Checkbox"],["link","Link"],["actions","Action Controls"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"]], onChange: function(v){ kit.attr(p, "state", v === "enabled" ? null : v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ kit.attr(p, "show-description", on ? null : "false"); } });
  }
});
} catch (e) { console.error("[cds] components/table-cell/table-cell.playground.js", e); }

/* ==== components/text-content/text-content.js ==== */
try {
/**
 * @deps —
 * <cds-text-content> — .Text Content · Content · set 5516:10455 (building block)
 * Atributos (padrões do Figma):
 *   kind              highlight-label | highlight-description · padrão highlight-label
 *   label             Label Content · padrão "Label"
 *   description       Text Description · padrão "Description"
 *   show-description  "false" esconde a descrição · padrão ligado
 */
(function(){
  "use strict";
  class CdsTextContent extends CDS.Element {
    static get observedAttributes(){ return ["label", "description", "show-description"]; }
    render(){
      this.innerHTML = "";
      var l = document.createElement("span"); l.className = "cds-tc__label"; l.textContent = this.hasAttribute("label") ? this.getAttribute("label") : "Label"; this.appendChild(l);
      if (this.flag("show-description")){
        var d = document.createElement("span"); d.className = "cds-tc__desc"; d.textContent = this.hasAttribute("description") ? this.getAttribute("description") : "Description"; this.appendChild(d);
      }
    }
  }
  CdsTextContent.define("cds-text-content");
})();
} catch (e) { console.error("[cds] components/text-content/text-content.js", e); }

/* ==== components/text-content/text-content.playground.js ==== */
try {
/* Playground — .Text Content */
CDS.register({
  id: "text-content", name: ".Text Content", category: "Content", block: true,
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5516-10455",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-text-content", { kind: "highlight-label", label: "Label", description: "Description" });
    ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "highlight-label", options: [["highlight-label","Highlight Label"],["highlight-description","Highlight Description"]], onChange: function(v){ set("kind", v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Description", checked: true, onChange: function(on){ set("show-description", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
  }
});
} catch (e) { console.error("[cds] components/text-content/text-content.playground.js", e); }

/* ==== components/accordion-item/accordion-item.js ==== */
try {
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
 *   Ícone: dropdown-open-line recolhido · dropdown-close-line aberto (variantes e description do Figma, C79 resolvido)
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
      CDS.attr(this.chevEl, "icon", open ? "dropdown-close-line" : "dropdown-open-line");
      CDS.attr(this.textEl, "label", this.text("label", "Label"));
      CDS.attr(this.textEl, "description", this.text("description", "Description"));
      CDS.attr(this.textEl, "show-description", this.flag("show-description") ? null : "false");
      this.divEl.hidden = card || !this.flag("show-divider");
    }
  }
  CdsAccordionItem.define("cds-accordion-item");
})();
} catch (e) { console.error("[cds] components/accordion-item/accordion-item.js", e); }

/* ==== components/accordion-item/accordion-item.playground.js ==== */
try {
/* Playground — Accordion Item */
CDS.register({
  id: "accordion-item", name: "Accordion Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/R7GDqtUKeNZZUg45M1llyr/-CastanhaDS--Components?node-id=24673-26248",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-accordion-item", {}, [kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos que a pessoa abre sob demanda.", style: "box-sizing:border-box;min-height:82px;margin:0;font:var(--text-style-caption-regular);color:var(--common-colors-text-medium)" })]);
    ctx.preview.appendChild(p);
    p.addEventListener("cds-toggle", function(e){ ctx.readout(e.detail.collapsed ? "recolhido" : "aberto", false); });
    kit.hint(panel, "Componente novo, na branch do Figma. O padrão do Figma é aberto (Is Collapsed=False). Clique no cabeçalho para abrir e fechar.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Collapsed", checked: false, onChange: function(on){ kit.attr(p, "collapsed", on); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-divider","Show Divider"],["show-description",".Text Content · Show Description"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label",".Text Content · Label Content","Label"],["description",".Text Content · Text Description","Description"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/accordion-item/accordion-item.playground.js", e); }

/* ==== components/accordion-item/accordion-item.docs.js ==== */
try {
/* Documentação — Accordion Item
   Fonte: [CastanhaDS] Component use documentation · seção 7073:28317 · frame [Documentação] Accordion Item (7073:30979)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Capa: o [Header] (7073:28385) é único para Accordion e Accordion Item e mostra um Accordion (12 itens, o 2º aberto);
   aqui ele aparece igual, via _tag "cds-accordion" + _children.
   Oculto no Figma e de fora: comparação "Content List Item vs Accordion Item" (Uso), títulos "Viewport"/"Accent" (Estilos),
   Acessibilidade (só placeholder "Tópico 1 / Ordem de leitura"), "Casos de exceção" (lorem ipsum), nota de Reduced motion
   e os 3 Do/Don'ts lorem ipsum.
   Gaps: o Slot vazio do Figma tem 82px; no código um Slot vazio não ocupa altura. As etiquetas de tipo das props no Figma
   dizem todas "Variant"; aqui seguem o componente (Show Lead Item/Show Divider = Boolean, Slot = Slot → "Swap component"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // itens do [Header]: 4 perguntas repetidas 3 vezes (12 itens), só o 2º aberto, sem Lead Item, Divider nem Description
  var faq = ["Como funciona o reembolso?", "Quando recebo o benefício?", "Posso transferir o saldo?", "Onde uso o cartão?"];
  var headerItems = [];
  for (var i = 0; i < 12; i++) headerItems.push({ _tag: "cds-accordion-item", label: faq[i % 4], collapsed: i !== 1 || null, "show-description": false, "show-lead-item": false, "show-divider": false });

  CDS.docs["accordion-item"] = {
    tag: "cds-accordion-item",
    base: {},
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7073-28317",
    // Capa (frame [Header] Accordion, compartilhado com a doc do Accordion): moldura alta e cortada embaixo
    cover: { description: "Item de um accordion: um header com título que revela conteúdo adicional (no Slot) ao ser expandido.", tall: true,
      attrs: { _tag: "cds-accordion", _children: headerItems } },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Item de um accordion: um header com título que revela conteúdo adicional (no Slot) ao ser expandido. Faz parte da família Accordion Lists — vários itens são arranjados pelo conjunto Accordion." },
        { h3: "Nomes alternativos comuns" },
        { p: "Disclosure item, accordion panel, painel expansível, expander, seção retrátil." },
        { h3: "Princípios" },
        { cards: [
          ["Revelar sob demanda", "O conteúdo extra fica no Slot, oculto até a pessoa expandir — reduz a carga visual e deixa a leitura previsível."],
          ["Título claro e curto", "O header (Label + Description) resume o que há dentro, pra pessoa prever o conteúdo antes de abrir."],
          ["Estado além da cor", "O chevron (open/close) e a revelação do conteúdo sinalizam expandido ou recolhido — não dependa só de cor."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Accordion Item para organizar conteúdo extenso em seções que a pessoa abre sob demanda, agrupando informação secundária sem tirá-la da página." },
        { h3: "Utilize para:" },
        { ul: ["Perguntas frequentes (FAQ)", "Detalhes de um pedido ou resumo expansível", "Formulários longos agrupados por tema ou etapa"] },
        { h3: "Não utilize para:" },
        { ul: ["Informação essencial que deve estar sempre visível", "Navegação entre páginas ou seções — use Link ou Botão", "Alternar um estado imediato — use Switch"] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: {},
          markers: [
            { n: 1, target: ".cds-acc__lead", side: "left" },
            { n: 2, target: ".cds-acc__text", side: "bottom" },
            { n: 3, target: ".cds-acc__chev", side: "right" },
            { n: 4, target: ".cds-acc__panel", side: "bottom" },
            { n: 5, target: ".cds-acc__divider", side: "bottom" }
          ],
          legend: ["Lead Item (opcional)", "Label + Description", "Ícone indicador (chevron)", "Slot (conteúdo revelado)", "Divider (opcional)"]
        } },
        { h2: "Composição do componente" },
        { p: "O Accordion Item é composto por um header — .Lead Item (opcional), .Text Content (Label + Description) e o ícone indicador (dropdown-open/close-line) — mais o Slot que recebe o conteúdo revelado e um Divider opcional. Vários itens são arranjados pelo conjunto Accordion." },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant" },
          { name: "Kind", type: "Variant", values: ["Default", "Card"] },
          { name: "Is Collapsed", type: "Variant" },
          { name: "Show Lead Item", type: "Boolean" },
          { name: "Show Divider", type: "Boolean" },
          { name: "Slot", type: "Swap component" }
        ] },
        { note: "Todas as props podem ser testadas na tab Playground." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Estados do item", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { specimens: { title: "Kind × State", items: [
          { label: "Default · Enabled", attrs: {} },
          { label: "Default · Disabled", attrs: { disabled: true } },
          { label: "Card · Enabled", attrs: { kind: "card" } },
          { label: "Card · Disabled", attrs: { kind: "card", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Acessibilidade" },
        { note: "Sem conteúdo no Figma para esta seção." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: { collapsed: true }, title: "Use para conteúdo secundário, não essencial",
            text: "O accordion esconde conteúdo atrás de um clique. Reserve-o para informação complementar; o que é essencial deve ficar sempre visível." },
          { attrs: {}, title: "Sinalize o estado além da cor",
            text: "O chevron (aberto/fechado) e a revelação do conteúdo indicam o estado — não dependa só de cor pra mostrar se está expandido." },
          { attrs: {}, title: "Títulos curtos e escaneáveis",
            text: "Escreva labels curtos e descritivos; a pessoa precisa prever o conteúdo de cada seção antes de abrir." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: { collapsed: true, "lead-icon": "support-line", label: "Perguntas frequentes", "show-description": false },
            text: "Seção de conteúdo secundário que pode ficar recolhida (FAQ, detalhes de um pedido)." },
          { kind: "dont", attrs: { collapsed: true, "lead-icon": "balance-line", label: "Saldo disponível", description: "R$ 1.240,00" },
            text: "Informação essencial — mantenha sempre visível, não esconda atrás de um clique." },
          { kind: "do", attrs: { collapsed: true, "lead-icon": "file-text-error-line", label: "Política de cancelamento", description: "Resumo em uma linha" },
            text: "Título curto que resume o conteúdo da seção." },
          { kind: "dont", attrs: { collapsed: true, "lead-icon": "settings-line", label: "Ir para Configurações", "show-description": false },
            text: "Como navegação entre páginas ou seções — use Link ou Botão." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições de estado do Accordion Item usam os Motion Styles do Castanha (modo Normal)." },
        { display: { attrs: { label: "Como funciona o reembolso?", "show-lead-item": false, "show-description": false, collapsed: true }, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e abra ou recolha o item para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "Recolhido → Aberto", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
          { title: "Aberto → Recolhido", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] }
        ] }
      ] }
    ]
  };
})();
} catch (e) { console.error("[cds] components/accordion-item/accordion-item.docs.js", e); }

/* ==== components/accordion/accordion.js ==== */
try {
/**
 * @deps accordion-item
 * <cds-accordion> — Accordion · Lists · set 24841:33746 (branch R7GDqtUKeNZZUg45M1llyr)
 * Lista de Accordion Items. Kind=Default: itens empilhados sem gap (o Divider de cada item separa) · 684 = 12 × 57.
 * Kind=Card: itens Kind=Card com gap 8 (Sizes/8) · 1240 = 12 × 96 + 11 × 8. Largura 320 (Fixed no Figma).
 *
 * Atributos: kind (default|card · repassado aos itens) · exclusive (abre um por vez; a description do item recomenda
 *   quando as seções competem pela mesma informação · não é prop do Figma) · label (nome do grupo, aria-label)
 * Filhos: <cds-accordion-item>. Sem filhos, mostra a amostra do Figma (12 itens recolhidos).
 * Evento: cds-toggle dos itens sobe normalmente (detail { collapsed }).
 */
(function(){
  "use strict";
  class CdsAccordion extends CDS.Element {
    static get observedAttributes(){ return ["kind","exclusive","label"]; }
    items(){ return [].slice.call(this.children).filter(function(c){ return c.localName === "cds-accordion-item"; }); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true;
        if (!this.items().length){
          // amostra: Item 01–12 do Figma, recolhidos (Is Collapsed=True), com um texto no Slot
          for (var i = 0; i < 12; i++){
            var it = CDS.create("cds-accordion-item", { collapsed: true });
            var p = it.appendChild(CDS.create("p", null, "cds-accordion__sample")); // filho antes de conectar: vai para o Slot no 1º render
            p.textContent = "Conteúdo do Slot. Texto, lista ou formulário curto que aparece quando o item abre.";
            this.appendChild(it);
          }
        }
        // exclusive: abrir um fecha os outros
        this.addEventListener("cds-toggle", function(e){
          if (!self.hasAttribute("exclusive") || e.detail.collapsed || e.target.parentNode !== self) return;
          self.items().forEach(function(o){ if (o !== e.target && !o.collapsed) o.collapsed = true; });
        });
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : null;
      this.items().forEach(function(it){ CDS.attr(it, "kind", kind); });
      CDS.attr(this, "role", "group");
      CDS.attr(this, "aria-label", this.getAttribute("label"));
    }
  }
  CdsAccordion.define("cds-accordion");
})();
} catch (e) { console.error("[cds] components/accordion/accordion.js", e); }

/* ==== components/accordion/accordion.playground.js ==== */
try {
/* Playground — Accordion */
CDS.register({
  id: "accordion", name: "Accordion", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/R7GDqtUKeNZZUg45M1llyr/-CastanhaDS--Components?node-id=24841-33746",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-accordion", {});
    ctx.preview.appendChild(p);
    kit.hint(panel, "Componente novo, na branch do Figma. Amostra do Figma: 12 Accordion Items recolhidos.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.section(panel, "Comportamento");
    kit.toggle(panel, { label: "Um aberto por vez (exclusive)", checked: false, onChange: function(on){ kit.attr(p, "exclusive", on); } });
    kit.hint(panel, "Não é prop do Figma: segue a boa prática da description do Accordion Item (abrir um item por vez quando as seções competem).");
  }
});
} catch (e) { console.error("[cds] components/accordion/accordion.playground.js", e); }

/* ==== components/accordion/accordion.docs.js ==== */
try {
/* Documentação — Accordion
   Fonte: [CastanhaDS] Component use documentation · seção 7073:28317 · frame [Documentação] Accordion (7073:31441)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Sem filhos, o <cds-accordion> desenha a amostra do Figma
   (12 itens "Label/Description" recolhidos), igual às instâncias da doc; com textos próprios, os itens vão em _children.
   Oculto no Figma e de fora: comparação "Content List vs Accordion" (Uso), props State/Is Collapsed/Show Lead Item/Show Divider/Slot
   (só Kind está visível), "Estados do item" e os specimens Disabled (Estilos), Acessibilidade (só placeholder), "Casos de exceção"
   (lorem ipsum), nota de Reduced motion e os 3 Do/Don'ts lorem ipsum.
   Gaps: o [Header] tem o Accordion com 544 de largura; no código ele tem 320 (Fixed no Figma do componente).
   Nos Do/Don'ts o Figma repete 4 títulos 3 vezes (12 itens, cortados); aqui cada exemplo mostra os 4 títulos uma vez. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // Accordion Items com os títulos dados (sem Description, como no Figma); opts: atributos comuns aos itens
  function items(labels, opts, open){
    return labels.map(function(l, i){
      return Object.assign({ _tag: "cds-accordion-item", label: l, collapsed: i === open ? null : true, "show-description": false }, opts);
    });
  }
  var faq = ["Como funciona o reembolso?", "Quando recebo o benefício?", "Posso transferir o saldo?", "Onde uso o cartão?"];
  var noLeadNoDiv = { "show-lead-item": false, "show-divider": false };

  CDS.docs["accordion"] = {
    tag: "cds-accordion",
    base: {},
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7073-28317",
    // Capa (frame [Header] Accordion): 12 itens (4 perguntas × 3), o 2º aberto; moldura alta e cortada embaixo
    cover: { description: "O Accordion agrupa vários Accordion Items em uma lista de seções expansíveis, que a pessoa abre sob demanda.", tall: true,
      attrs: { _children: items(faq.concat(faq, faq), noLeadNoDiv, 1) } },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Accordion agrupa vários Accordion Items em uma lista de seções expansíveis, que a pessoa abre sob demanda. Faz parte das Accordion Lists, no padrão de Content Lists e Selection Lists." },
        { h3: "Nomes alternativos comuns" },
        { p: "Accordion, lista expansível, grupo de seções retráteis, accordion group." },
        { h3: "Princípios" },
        { cards: [
          ["Revelar sob demanda", "O conteúdo extra fica no Slot, oculto até a pessoa expandir — reduz a carga visual e deixa a leitura previsível."],
          ["Título claro e curto", "O header (Label + Description) resume o que há dentro, pra pessoa prever o conteúdo antes de abrir."],
          ["Estado além da cor", "O chevron (open/close) e a revelação do conteúdo sinalizam expandido ou recolhido — não dependa só de cor."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Accordion para agrupar conteúdo extenso em seções expansíveis, mostrando só os títulos até a pessoa abrir cada uma." },
        { h3: "Utilize para:" },
        { ul: ["Perguntas frequentes (FAQ)", "Detalhes de um pedido ou resumo expansível", "Formulários longos agrupados por tema ou etapa"] },
        { h3: "Não utilize para:" },
        { ul: ["Informação essencial que deve estar sempre visível", "Navegação entre páginas ou seções — use Link ou Botão", "Alternar um estado imediato — use Switch"] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: {},
          markers: [
            { n: 1, target: "cds-accordion-item:first-child", side: "left" },
            { n: 2, target: "cds-accordion-item:first-child .cds-acc__divider", side: "right" }
          ],
          legend: ["Accordion Item (seções empilhadas)", "Espaçamento entre as seções"]
        } },
        { h2: "Composição do componente" },
        { p: "O Accordion distribui vários Accordion Items no frame Items, com Kind Default (linhas) ou Card (cartões). Cada item traz seu header + Slot; o conjunto cuida do empilhamento e do espaçamento." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", values: ["Default", "Card"] }
        ] },
        { note: "Todas as props podem ser testadas na tab Playground." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Kind", items: [
          { label: "Default", attrs: {} },
          { label: "Card", attrs: { kind: "card" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Acessibilidade" },
        { note: "Sem conteúdo no Figma para esta seção." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: {}, title: "Use para conteúdo secundário, não essencial",
            text: "O accordion esconde conteúdo atrás de um clique. Reserve-o para informação complementar; o que é essencial deve ficar sempre visível." },
          { attrs: {}, title: "Controle de abertura",
            text: "Defina se o conjunto permite vários itens abertos ao mesmo tempo ou só um por vez — abra um por vez quando as seções competem pela mesma atenção." },
          { attrs: {}, title: "Títulos curtos e escaneáveis",
            text: "Escreva labels curtos e descritivos; a pessoa precisa prever o conteúdo de cada seção antes de abrir." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: { _children: items(faq, noLeadNoDiv) },
            text: "Seção de conteúdo secundário que pode ficar recolhida (FAQ, detalhes de um pedido)." },
          { kind: "dont", attrs: { _children: items(["Saldo: R$ 1.240,00", "Ir para Configurações", "Fatura do mês", "Sair da conta"], { "show-lead-item": false }) },
            text: "Informação essencial — mantenha sempre visível, não esconda atrás de um clique." },
          { kind: "do", attrs: { _children: items(["Política de cancelamento", "Como alterar meus dados", "Benefícios inclusos", "Suporte e contato"], { "show-lead-item": false }) },
            text: "Título curto que resume o conteúdo da seção." },
          { kind: "dont", attrs: { _children: items(["Abrir extrato", "Ir para o início", "Ver perfil", "Configurações"], noLeadNoDiv) },
            text: "Como navegação entre páginas ou seções — use Link ou Botão." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições de cada seção do Accordion seguem os Motion Styles do Castanha (modo Normal)." },
        { display: { attrs: { _children: [{ _tag: "cds-accordion-item", label: "Como funciona o reembolso?", "show-lead-item": false, "show-description": false, collapsed: true }, { _tag: "cds-accordion-item", label: "Quando recebo o benefício?", "show-lead-item": false, "show-description": false, collapsed: true }] }, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e abra ou recolha uma seção para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "Recolhido → Aberto", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
          { title: "Aberto → Recolhido", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] }
        ] }
      ] }
    ]
  };
})();
} catch (e) { console.error("[cds] components/accordion/accordion.docs.js", e); }

/* ==== components/list-item/list-item.js ==== */
try {
/**
 * @deps list-lead-item text-content divider
 * CDS.ListItem — base de Selection List Item e Content List Item (não é um elemento registrado).
 *
 * Anatomia comum (Lists): Container (H · gap 12 · min 44) [.Lead Item] Items(.Text Content …) [trailing] + Divider (Soft).
 * A linha é um elemento interno (.cds-li): <a> com href, <button>, <div> que repassa o clique ao controle do
 * .Trailing Item, ou role="option" quando está num listbox (Select Inputs).
 *
 * Atributos comuns (padrões do Figma):
 *   kind (default|card) · disabled · show-lead-item · show-divider
 *   label ("Label") · description ("Description") · show-description
 *   lead-kind (avatar|icon|image · padrão icon, como nas listas) · lead-icon · lead-label · lead-src
 *   option — modo listbox: role=option, aria-selected = is-active; o controle do trailing vira só visual
 *   state="hovered|pressed" — estados forçados para specimens (só CSS)
 * Subclasse: buildItems(items, container) · updateItems() · get rowMode() → "control" | "button" | "link" | "static"
 */
(function(){
  "use strict";
  var uid = 0;
  class ListItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","disabled","show-lead-item","show-divider","label","description","show-description","lead-kind","lead-icon","lead-label","lead-src","option","href","is-active"]; }
    constructor(){ super(); this._uid = "cds-li-" + (++uid); }
    get rowMode(){ return "static"; }
    get optionMode(){ return this.hasAttribute("option"); }
    buildItems(items, container){}
    updateItems(){}
    rowTag(mode){ return this.optionMode ? "div" : mode === "link" ? "a" : mode === "button" ? "button" : "div"; }

    render(){
      var mode = this.optionMode ? "option" : this.rowMode;
      if (this._mode !== mode){ this._mode = mode; this.build(mode); }
      this.update();
    }
    build(mode){
      var self = this;
      this.innerHTML = "";
      var row = this.row = CDS.create(this.rowTag(mode), null, "cds-li");
      if (row.tagName === "BUTTON") row.type = "button";
      var c = this.container = row.appendChild(CDS.create("div", null, "cds-li__container"));
      this.leadEl = c.appendChild(CDS.create("cds-list-lead-item", null, "cds-li__lead"));
      var items = this.itemsEl = c.appendChild(CDS.create("div", null, "cds-li__items"));
      this.textEl = items.appendChild(CDS.create("cds-text-content", { id: this._uid + "-text" }, "cds-li__text"));
      this.buildItems(items, c);
      this.divEl = row.appendChild(CDS.create("cds-divider", { intensity: "soft" }, "cds-li__divider"));
      this.appendChild(row);
      if (mode === "control"){
        // A linha inteira aciona o controle nativo do .Trailing Item (sem <label> aninhado)
        row.addEventListener("click", function(e){
          var input = self.controlInput; if (!input || self.hasAttribute("disabled")) return;
          if (e.target === input || (e.target.closest && e.target.closest(".cds-sc"))) return; // o próprio controle já trata
          input.click();
        });
      }
    }
    get controlInput(){ return null; }
    update(){
      var row = this.row, kind = this.getAttribute("kind") === "card" ? "card" : "default", dis = this.hasAttribute("disabled");
      if (this.getAttribute("kind") !== kind && this.hasAttribute("kind")) CDS.attr(this, "kind", kind);
      CDS.attr(this.textEl, "label", this.text("label", "Label"));
      CDS.attr(this.textEl, "description", this.text("description", "Description"));
      CDS.attr(this.textEl, "show-description", String(this.flag("show-description")));
      var lk = this.getAttribute("lead-kind") || this.defaultLeadKind;
      CDS.attr(this.leadEl, "kind", lk);
      [["lead-icon","icon"],["lead-label","label"],["lead-src","src"]].forEach(function(p){ var v = this.getAttribute(p[0]); if (v != null) CDS.attr(this.leadEl, p[1], v); else this.leadEl.removeAttribute(p[1]); }, this);
      this.leadEl.hidden = !this.flag("show-lead-item");
      this.divEl.hidden = kind === "card" || !this.flag("show-divider"); // Card não tem Divider
      if (this._mode === "option"){
        CDS.attr(row, "role", "option"); row.id = this.id ? this.id + "-opt" : this._uid;
        CDS.attr(row, "aria-selected", String(this.hasAttribute("is-active")));
        if (dis) CDS.attr(row, "aria-disabled", "true"); else row.removeAttribute("aria-disabled");
        CDS.attr(row, "aria-labelledby", this.textEl.id);
      } else if (row.tagName === "A"){
        if (dis){ row.removeAttribute("href"); CDS.attr(row, "aria-disabled", "true"); } else { CDS.attr(row, "href", this.getAttribute("href")); row.removeAttribute("aria-disabled"); }
      } else if (row.tagName === "BUTTON") row.disabled = dis;
      this.updateItems();
    }
    get defaultLeadKind(){ return "icon"; }
  }
  CDS.ListItem = ListItem;
})();
} catch (e) { console.error("[cds] components/list-item/list-item.js", e); }

/* ==== components/text-field/text-field.js ==== */
try {
/**
 * @deps icon-button icon
 * CDS.TextField — base da família Text Fields (Text Input · Search · Text Area · Password · Quantity · Credit Card).
 * Não é um elemento registrado: cada membro estende a classe e define só o que muda.
 *
 * Anatomia (igual em todos os sets do Figma):
 *   Label Content   label.cds-tf__label   Text Label + Required Text
 *   Text Box        div.cds-tf__box       [Lead Icon] controle [Trailing: warning-line · ação]
 *   Trailing Content div.cds-tf__foot     Supporting/Error Message + Character Counter
 *
 * Render incremental: build() cria o DOM uma vez; update() só ajusta texto, atributos e visibilidade.
 * O controle nativo (<input>/<textarea>) nunca é recriado, então foco, seleção e valor sobrevivem.
 *
 * Atributos comuns (padrões do Figma):
 *   appearance (neutral|warning) · disabled · value · placeholder
 *   label (Text Label) · required-text ("(Obrigatório)") · supporting · error
 *   show-label · show-required · show-lead-icon · show-trailing-item · show-supporting-content · show-character-counter
 *   lead-icon (Lead Icon, swap) · maxlength · character-counter (texto fixo do contador)
 *   state="hovered|pressed" · is-active — estados forçados para specimens (só CSS)
 * Eventos: cds-change { value }
 *
 * Máscaras (.Text Content Mask): CDS.TextField.masks — usadas pelo Text Input (mask="cpf"…) e pelo Credit Card.
 */
(function(){
  "use strict";
  var uid = 0;

  function el(tag, cls){ var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  // ---------- Máscaras ----------
  // Padrão: 0 = dígito, A = letra ou dígito (maiúscula), outros caracteres = literais
  function patternMask(pattern, opts){
    opts = opts || {};
    var slots = pattern.replace(/[^0A]/g, "").length;
    function accept(ch, kind){ return kind === "0" ? /\d/.test(ch) : /[0-9A-Za-z]/.test(ch); }
    return {
      placeholder: opts.placeholder || pattern,
      inputMode: /A/.test(pattern) ? "text" : "numeric",
      raw: function(s){
        var out = "", kinds = pattern.replace(/[^0A]/g, "");
        String(s || "").split("").forEach(function(ch){ if (out.length < slots && accept(ch, kinds[out.length])) out += ch.toUpperCase(); });
        return out;
      },
      format: function(raw){
        var out = "", i = 0;
        for (var p = 0; p < pattern.length && i < raw.length; p++){
          var c = pattern[p];
          if (c === "0" || c === "A") out += raw[i++];
          else out += c;
        }
        return out;
      },
      complete: function(raw){ return raw.length === slots; },
      max: slots
    };
  }
  // Moeda (R$): digita da direita para a esquerda, centavos fixos
  var currency = {
    placeholder: "R$ 00,00", inputMode: "numeric",
    raw: function(s){ return String(s || "").replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 13); },
    format: function(raw){
      if (!raw) return "";
      var n = raw.padStart(3, "0"), cents = n.slice(-2), int = n.slice(0, -2).replace(/^0+(?=\d)/, "");
      return "R$ " + int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + cents;
    },
    complete: function(){ return false; }, caretEnd: true
  };
  var MASKS = {
    cpf: patternMask("000.000.000-00"),
    cnpj: patternMask("00.000.000/0000-00", { placeholder: "43.210.987/0001-23" }),
    "cnpj-new": patternMask("AAAAAAAAAAAAAA", { placeholder: "12ABC6780001X5" }), // como no Figma: sem pontuação
    telefone: patternMask("(00) 0000-0000"),
    celular: patternMask("(00) 00000-0000"),
    cep: patternMask("00000-000"), // o Figma mostra 0000-000 (Q32); CEP tem 8 dígitos
    date: patternMask("00/00/0000"),
    currency: currency
  };

  class TextField extends CDS.Element {
    static get observedAttributes(){
      return ["appearance","disabled","value","placeholder","label","required-text","supporting","error",
        "show-label","show-required","show-lead-icon","show-trailing-item","show-supporting-content","show-character-counter",
        "lead-icon","maxlength","character-counter"];
    }
    constructor(){ super(); this._id = "cds-tf-" + (++uid); this._value = null; }

    // ----- ganchos para os membros da família -----
    get controlTag(){ return "input"; }
    get defaultLeadIcon(){ return "placeholder-line"; }
    get defaultPlaceholder(){ return "Placeholder"; }
    get hasLeadIcon(){ return true; }
    get mask(){ return null; }                 // objeto de máscara (ver MASKS) ou null
    configureControl(ctrl){}                    // tipo, inputmode, autocomplete…
    buildTrailing(box){}                        // ações à direita (Icon Button…)
    updateTrailing(){}

    // ----- estado -----
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "neutral"; }
    get disabled(){ return this.hasAttribute("disabled"); }
    get value(){ return this._value == null ? "" : this._value; }
    set value(v){ this._setValue(v == null ? "" : String(v), false); }
    get input(){ return this.control; } // compatibilidade (playground/inspetor)
    get displayValue(){ var m = this.mask; return m ? m.format(this.value) : this.value; }

    attributeChangedCallback(name){
      if (name === "value") this._value = null; // o atributo volta a ser a fonte
      if (this.isConnected) this.render();
    }
    render(){
      if (!this._built){ this.build(); this._built = true; }
      if (this._value == null){ var m = this.mask, a = this.getAttribute("value") || ""; this._value = m ? m.raw(a) : a; }
      this.update();
    }

    build(){
      var self = this, id = this._id;
      this.classList.add("cds-tf");
      this.innerHTML = "";

      var lab = this.labelEl = el("label", "cds-tf__label"); lab.htmlFor = id + "-ctrl";
      this.labelText = lab.appendChild(el("span"));
      this.reqSpace = lab.appendChild(document.createTextNode(" ")); // espaço só para o nome acessível (flex ignora no layout)
      this.reqEl = lab.appendChild(el("span", "cds-tf__req"));
      this.appendChild(lab);

      var box = this.box = el("div", "cds-tf__box");
      var content = this.content = el("div", "cds-tf__content");
      if (this.hasLeadIcon){ this.leadEl = el("span", "cds-icon cds-tf__lead"); this.leadEl.setAttribute("aria-hidden", "true"); content.appendChild(this.leadEl); }
      var ctrl = this.control = el(this.controlTag, "cds-tf__control");
      ctrl.id = id + "-ctrl"; ctrl.spellcheck = false;
      if (this.controlTag === "input") ctrl.type = "text";
      this.configureControl(ctrl);
      content.appendChild(ctrl);
      box.appendChild(content);
      this.warnEl = el("span", "cds-icon cds-icon--warning-line cds-tf__warn"); this.warnEl.setAttribute("aria-hidden", "true");
      box.appendChild(this.warnEl);
      this.buildTrailing(box);
      this.appendChild(box);

      var foot = this.foot = el("div", "cds-tf__foot");
      this.msgEl = foot.appendChild(el("div", "cds-tf__msg")); this.msgEl.id = id + "-msg";
      this.counterEl = foot.appendChild(el("span", "cds-tf__counter"));
      this.appendChild(foot);

      // Clicar em qualquer ponto do Text Box foca o campo (exceto nas ações)
      box.addEventListener("mousedown", function(e){
        if (e.target === ctrl || e.target.closest("cds-icon-button")) return;
        e.preventDefault(); ctrl.focus();
      });
      // Logo após o tap o cursor ainda está sobre o campo: segura Is Active pela duração do Selected In
      box.addEventListener("pointerup", function(e){
        if (e.target.closest("cds-icon-button")) return;
        box.classList.add("is-tapped"); clearTimeout(box._tapT);
        box._tapT = setTimeout(function(){ box.classList.remove("is-tapped"); }, 350);
      });
      ctrl.addEventListener("input", function(){ self.onInput(); });
      // Backspace/Delete sobre pontuação da máscara apaga o dado vizinho (não só move o caret)
      ctrl.addEventListener("keydown", function(e){
        var m = self.mask; if (!m || m.caretEnd) return;
        var st = ctrl.selectionStart, en = ctrl.selectionEnd, v = ctrl.value, raw = self.value;
        if (st !== en) return;
        var isLit = function(ch){ return ch != null && !/[0-9A-Za-z]/.test(ch); };
        var at = -1;
        if (e.key === "Backspace" && st > 0 && isLit(v[st - 1])){ var nb = m.raw(v.slice(0, st)).length; if (nb > 0){ raw = raw.slice(0, nb - 1) + raw.slice(nb); at = nb - 1; } }
        else if (e.key === "Delete" && isLit(v[st])){ var nd = m.raw(v.slice(0, st)).length; raw = raw.slice(0, nd) + raw.slice(nd + 1); at = nd; }
        if (at < 0) return;
        e.preventDefault();
        self._value = raw; ctrl.value = m.format(raw);
        var pos = caretAfter(ctrl.value, at); ctrl.setSelectionRange(pos, pos);
        self.afterInput();
      });
    }

    onInput(){
      var ctrl = this.control, m = this.mask;
      if (!m){ this._value = ctrl.value; this.afterInput(); return; }
      // Reformata e devolve o caret para depois do mesmo número de caracteres "de dado"
      var before = m.raw(ctrl.value.slice(0, ctrl.selectionStart)).length;
      this._value = m.raw(ctrl.value);
      ctrl.value = m.format(this._value);
      if (document.activeElement === ctrl){
        var at = m.caretEnd ? ctrl.value.length : caretAfter(ctrl.value, before);
        ctrl.setSelectionRange(at, at);
      }
      this.afterInput();
    }
    afterInput(){
      this.updateCounter(); this.updateTrailing();
      this.classList.toggle("is-filled", !!this.value);
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, formatted: this.control.value }, bubbles: true }));
    }
    _setValue(v, emit){
      var m = this.mask; this._value = m ? m.raw(v) : v;
      if (this.control) this.control.value = this.displayValue;
      if (this._built){ this.updateCounter(); this.updateTrailing(); this.classList.toggle("is-filled", !!this.value); }
      if (emit) this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value }, bubbles: true }));
    }

    update(){
      var warning = this.appearance === "warning", label = this.getAttribute("label");
      var showLabel = !!label && this.flag("show-label");
      this.labelEl.hidden = !showLabel;
      this.labelText.textContent = label || "";
      var req = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
      this.reqEl.hidden = !(this.flag("show-required") && req); this.reqEl.textContent = req;

      if (this.leadEl){
        var icon = this.getAttribute("lead-icon") || this.defaultLeadIcon;
        this.leadEl.className = "cds-icon cds-icon--" + icon + " cds-tf__lead";
        this.leadEl.hidden = !this.flag("show-lead-icon");
      }
      var ctrl = this.control, m = this.mask;
      if (document.activeElement !== ctrl || ctrl.value !== this.displayValue) ctrl.value = this.displayValue;
      ctrl.placeholder = this.hasAttribute("placeholder") ? this.getAttribute("placeholder") : (m ? m.placeholder : this.defaultPlaceholder);
      if (m){ ctrl.inputMode = m.inputMode; if (m.max) ctrl.maxLength = m.format("9".repeat(m.max)).length; else ctrl.removeAttribute("maxlength"); }
      else if (this.hasAttribute("maxlength")) ctrl.maxLength = parseInt(this.getAttribute("maxlength"), 10) || 524288;
      else ctrl.removeAttribute("maxlength");
      ctrl.disabled = this.disabled;
      if (this.disabled) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      if (!showLabel) ctrl.setAttribute("aria-label", label || this.fallbackName || "Campo de texto"); else ctrl.removeAttribute("aria-label");
      if (warning) ctrl.setAttribute("aria-invalid", "true"); else ctrl.removeAttribute("aria-invalid");

      // Trailing Icon (warning-line): só no Warning, controlado por Show Trailing Item
      this.warnEl.hidden = !(warning && this.flag("show-trailing-item"));

      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      this.msgEl.textContent = msg || "";
      this.msgEl.hidden = !msg;
      if (warning && msg) this.msgEl.setAttribute("role", "alert"); else this.msgEl.removeAttribute("role");
      if (msg) ctrl.setAttribute("aria-describedby", this.msgEl.id); else ctrl.removeAttribute("aria-describedby");
      this.updateCounter();
      this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
      this.classList.toggle("is-filled", !!this.value);
      this.updateTrailing();
    }

    // Character Counter: texto fixo (character-counter) ou "n/max" quando há maxlength
    updateCounter(){
      var fixed = this.getAttribute("character-counter"), max = parseInt(this.getAttribute("maxlength"), 10);
      var text = fixed != null ? fixed : (max ? this.value.length + "/" + max : "");
      this.counterEl.textContent = text;
      this.counterEl.hidden = !(this.flag("show-character-counter") && text);
      if (this.foot) this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
    }
  }

  /** posição no texto formatado logo após o n-ésimo caractere de dado (letra ou dígito) */
  function caretAfter(formatted, n){
    if (n <= 0){ var first = formatted.search(/[0-9A-Za-z]/); return first < 0 ? formatted.length : first; }
    for (var i = 0, seen = 0; i < formatted.length; i++){ if (/[0-9A-Za-z]/.test(formatted[i]) && ++seen === n) return i + 1; }
    return formatted.length;
  }

  TextField.masks = MASKS;
  TextField.patternMask = patternMask;
  TextField.el = el;
  CDS.TextField = TextField;
})();
} catch (e) { console.error("[cds] components/text-field/text-field.js", e); }

/* ==== components/code-input-otp/code-input-otp.js ==== */
try {
/**
 * @deps text-field
 * <cds-code-input> — Code Input OTP · CDS-1608
 *
 * Atributos: length (3–6, padrão 6) · type (alphanumeric = letras, números e símbolos | numeric, padrão alphanumeric) · appearance (neutral|warning)
 * masked (Hidden Values) · disabled · value · separators ("3" | "2,4" | "all" | "none")
 * Texto: label (Text Label) · required-text (padrão "(Obrigatório)") · supporting · error
 * Booleans do Figma, ligados por padrão — passar "false" desliga:
 *   show-label · show-required · show-supporting-content · show-trailing-item
 * Estados forçados (specimen/doc): state="hovered|pressed" · is-active — só CSS, em todas as células
 * Eventos: cds-change {value} · cds-complete {value} · cds-visibility-change {masked}
 * Teclado: um único ponto de Tab no conjunto (roving tabindex na primeira célula vazia); setas/Home/End entre células
 */
(function(){
  "use strict";
  var MIN = 3, MAX = 6;
  var uid = 0;
  function clamp(n, a, b){ return Math.min(b, Math.max(a, n)); }

  class CdsCodeInput extends CDS.Element {
    static get observedAttributes(){ return ["length","type","value","masked","disabled","appearance","label","required-text","supporting","error","separators","show-label","show-required","show-supporting-content","show-trailing-item"]; }
    constructor(){ super(); this.inputs = []; this.boxes = []; this._id = "cds-ci-" + (++uid); }
    get length(){ return clamp(parseInt(this.getAttribute("length"), 10) || 6, MIN, MAX); }
    get type(){ return this.getAttribute("type") === "numeric" ? "numeric" : "alphanumeric"; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "neutral"; }
    get masked(){ return this.hasAttribute("masked"); }
    get disabled(){ return this.hasAttribute("disabled"); }
    get separators(){
      var n = this.length, raw = this.getAttribute("separators"), all = [];
      for (var p = 1; p < n; p++) all.push(p);
      if (raw === "all") return all;
      if (raw === null || raw === "" || raw === "none") return [];
      return raw.split(",").map(function(s){ return parseInt(s, 10); }).filter(function(x){ return x >= 1 && x < n; });
    }
    get value(){ return this.inputs.map(function(i){ return i.value; }).join(""); }

    attributeChangedCallback(name){ if (this.isConnected) this.render(name === "value" ? null : this.value); }

    // alphanumeric aceita letras, números e símbolos (Q25) — qualquer caractere visível, sem espaço
    charOk(ch){ return this.type === "numeric" ? /^[0-9]$/.test(ch) : /^\S$/u.test(ch); }

    render(keep){
      var n = this.length, self = this;
      var source = (keep != null && keep !== "") ? keep : (this.getAttribute("value") || "");
      var initial = source.split("").filter(function(c){ return self.charOk(c); }).slice(0, n);
      var label = this.getAttribute("label");
      var warning = this.appearance === "warning";
      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      var seps = this.separators;
      var msgId = this._id + "-msg";

      this.classList.toggle("cds-ci--masked", this.masked);
      this.setAttribute("role", "group");
      this.setAttribute("aria-label", label || "Código de verificação");
      if (this.disabled) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      this.innerHTML = "";

      if (label && this.flag("show-label")){
        var lab = document.createElement("div");
        lab.className = "cds-tf__label cds-ci__label";
        var t = document.createElement("span"); t.textContent = label; lab.appendChild(t);
        var reqText = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
        if (this.flag("show-required") && reqText){ var r = document.createElement("span"); r.textContent = reqText; lab.appendChild(r); }
        this.appendChild(lab);
      }

      var row = document.createElement("div");
      row.className = "cds-ci__boxes";
      this.inputs = []; this.boxes = [];
      for (var i = 0; i < n; i++){
        var vb = document.createElement("div"); vb.className = "cds-ci__vb";
        var box = document.createElement("div"); box.className = "cds-ci__box";
        var inp = document.createElement("input");
        inp.className = "cds-ci__input";
        inp.type = this.masked ? "password" : "text";
        inp.inputMode = this.type === "numeric" ? "numeric" : "text";
        inp.autocomplete = i === 0 ? "one-time-code" : "off";
        inp.setAttribute("autocapitalize", "off");
        inp.spellcheck = false;
        inp.value = initial[i] || "";
        inp.disabled = this.disabled;
        inp.setAttribute("aria-label", "dígito " + (i + 1) + " de " + n);
        if (warning) inp.setAttribute("aria-invalid", "true");
        if (msg) inp.setAttribute("aria-describedby", msgId);
        var dot = document.createElement("span"); dot.className = "cds-ci__dot"; dot.setAttribute("aria-hidden", "true");
        var caret = document.createElement("span"); caret.className = "cds-ci__caret"; caret.setAttribute("aria-hidden", "true");
        box.appendChild(inp); box.appendChild(dot); box.appendChild(caret);
        box.classList.toggle("is-filled", !!inp.value);
        vb.appendChild(box);
        if (i < n - 1 && seps.indexOf(i + 1) !== -1){
          var s = document.createElement("span"); s.className = "cds-ci__sep"; s.setAttribute("aria-hidden", "true"); vb.appendChild(s);
        }
        this.wire(inp, i);
        this.inputs.push(inp); this.boxes.push(box);
        row.appendChild(vb);
      }

      // Um único ponto de tabulação (annotation de Accessibility): só a célula "atual" fica no Tab
      this.rove(this.firstEmpty());

      // Visibility Action — alterna Hidden Values; o ícone reflete o estado atual
      if (this.flag("show-trailing-item")){
        // Nested instance: Icon Button · Ghost · Neutral · Small
        var act = document.createElement("cds-icon-button");
        act.className = "cds-ci__action";
        act.setAttribute("kind", "ghost"); act.setAttribute("appearance", "neutral"); act.setAttribute("size", "small");
        act.setAttribute("icon", this.masked ? "hide-off-line" : "hide-line");
        act.setAttribute("label", this.masked ? "Mostrar código" : "Ocultar código");
        act.setAttribute("pressed", this.masked ? "false" : "true");
        if (this.disabled) act.setAttribute("disabled", "");
        act.addEventListener("click", function(){
          self.toggleAttribute("masked");
          var next = self.querySelector(".cds-ci__action"); if (next) next.focus();
          self.dispatchEvent(new CustomEvent("cds-visibility-change", { detail: { masked: self.masked }, bubbles: true }));
        });
        row.appendChild(act);
      }
      this.appendChild(row);

      if (msg){
        var m = document.createElement("div");
        m.className = "cds-tf__msg cds-ci__msg"; m.id = msgId; m.textContent = msg;
        if (warning) m.setAttribute("role", "alert");
        this.appendChild(m);
      }
    }

    firstEmpty(){ for (var i = 0; i < this.inputs.length; i++) if (!this.inputs[i].value) return i; return this.inputs.length - 1; }
    rove(i){ this.inputs.forEach(function(x, k){ x.tabIndex = k === i ? 0 : -1; }); }
    setCell(i, ch){ this.inputs[i].value = ch; this.boxes[i].classList.toggle("is-filled", !!ch); }
    focusCell(i){
      var el = this.inputs[clamp(i, 0, this.inputs.length - 1)];
      if (el){ el.focus(); el.select(); }
    }
    emit(){
      var v = this.value;
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: v }, bubbles: true }));
      if (v.length === this.length) this.dispatchEvent(new CustomEvent("cds-complete", { detail: { value: v }, bubbles: true }));
    }
    fillFrom(index, text){
      var self = this, chars = text.split("").filter(function(c){ return self.charOk(c); });
      var i = index;
      for (var k = 0; k < chars.length && i < this.inputs.length; k++, i++) this.setCell(i, chars[k]);
      this.focusCell(i);
      this.emit();
    }
    wire(inp, index){
      var self = this;
      inp.addEventListener("input", function(){
        var v = inp.value;
        if (v.length > 1){ self.setCell(index, ""); self.fillFrom(index, v); return; } // autofill / one-time-code
        if (v && !self.charOk(v)){ self.setCell(index, ""); return; }
        self.setCell(index, v);
        if (v && index < self.inputs.length - 1) self.focusCell(index + 1);
        self.emit();
      });
      inp.addEventListener("keydown", function(e){
        if (e.key === "Backspace"){
          if (inp.value){ self.setCell(index, ""); self.emit(); e.preventDefault(); }
          else if (index > 0){ self.setCell(index - 1, ""); self.focusCell(index - 1); self.emit(); e.preventDefault(); }
        } else if (e.key === "Delete"){ self.setCell(index, ""); self.emit(); e.preventDefault(); }
        else if (e.key === "ArrowLeft"){ self.focusCell(index - 1); e.preventDefault(); }
        else if (e.key === "ArrowRight"){ self.focusCell(index + 1); e.preventDefault(); }
        else if (e.key === "Home"){ self.focusCell(0); e.preventDefault(); }
        else if (e.key === "End"){ self.focusCell(self.inputs.length - 1); e.preventDefault(); }
        else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey){
          if (!self.charOk(e.key)){ e.preventDefault(); return; }
          if (inp.value){ self.setCell(index, ""); } // substitui o caractere existente
        }
      });
      inp.addEventListener("focus", function(){ self.rove(index); inp.select(); });
      inp.addEventListener("pointerup", function(){
        var box = self.boxes[index];
        box.classList.add("is-tapped");
        clearTimeout(box._tapT);
        box._tapT = setTimeout(function(){ box.classList.remove("is-tapped"); }, 350);
      });
      inp.addEventListener("paste", function(e){
        e.preventDefault();
        self.fillFrom(index, (e.clipboardData && e.clipboardData.getData("text")) || "");
      });
    }
  }
  CdsCodeInput.define("cds-code-input");
})();
} catch (e) { console.error("[cds] components/code-input-otp/code-input-otp.js", e); }

/* ==== components/code-input-otp/code-input-otp.playground.js ==== */
try {
/* Playground — Code Input OTP */
CDS.register({
  id: "code-input-otp",
  name: "Code Input OTP",
  category: "Text Fields",
  task: "CDS-1608",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24060-7228",
  zeroheight: "https://zeroheight.com/858426090/v/latest/p/1166c7",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-code-input", {
      length: "6", separators: "3", label: "Código",
      supporting: "Enviamos um código por SMS.", error: "Código inválido. Tente de novo."
    });
    ctx.preview.appendChild(p);
    function set(name, val){ kit.attr(p, name, val); }
    function readout(){ ctx.readout(p.value, p.value.length === p.length); }
    p.addEventListener("cds-change", readout);

    // Length + separadores
    var sepOn = [3], chips;
    var len = kit.range(panel, { label: "Length (3–6)", min: 3, max: 6, value: 6, onInput: function(n){
      set("length", String(n)); buildSep(); applySeps(); readout();
    }});
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]],
      onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    kit.seg(panel, { label: "Type", value: "alphanumeric", options: [["alphanumeric","Alfanumérico"],["numeric","Numérico"]],
      onChange: function(v){ set("type", v === "alphanumeric" ? null : v); } });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    var masked = kit.toggle(panel, { label: "Hidden Values", onChange: function(on){ set("masked", on); } });
    // A Visibility Action alterna Hidden Values dentro do componente → mantém o switch em sincronia
    p.addEventListener("cds-visibility-change", function(e){ masked.checked = e.detail.masked; });

    // Booleans do Figma: ligados por padrão → só escreve "false" quando desligados
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"],["show-trailing-item","Show Trailing Item"]]
      .forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });

    // Show Separator por dígito
    var sepWrap = kit.el("div", { "class": "pg-ctrl" });
    sepWrap.appendChild(kit.el("span", { "class": "pg-lbl", text: "Show Separator — depois de qual dígito" }));
    var allNone = kit.el("div", { "class": "pg-actions" });
    // Um botão só (Main Button Default · Neutral · Small): "Limpar" com todos marcados, senão "Marcar todos"
    var allBtn = kit.button(allNone, { label: "Marcar todos", onClick: function(){
      var all = sepOn.length === n() - 1;
      sepOn = []; if (!all) for (var i = 1; i < n(); i++) sepOn.push(i);
      buildSep(); applySeps();
    } });
    sepWrap.appendChild(allNone);
    // multisseleção de verdade: Filter Chips (cada um liga/desliga)
    chips = kit.el("cds-chips-group", { kind: "filter", "role-kind": "multiple", label: "Separador depois do dígito", "class": "pg-choice" });
    sepWrap.appendChild(chips);
    kit.hint(sepWrap, "O último dígito nunca tem separador. Ex.: só o 3 agrupa 3 + 3.");
    panel.appendChild(sepWrap);

    function n(){ return parseInt(len.value, 10); }
    function applySeps(){
      sepOn = sepOn.filter(function(x){ return x < n(); }).sort(function(a, b){ return a - b; });
      set("separators", sepOn.length ? sepOn.join(",") : "none");
      if (allBtn) allBtn.setAttribute("label", sepOn.length === n() - 1 ? "Limpar" : "Marcar todos");
    }
    function buildSep(){
      chips.innerHTML = "";
      for (var pos = 1; pos < n(); pos++){
        var b = kit.el("cds-filter-chip", { "data-p": pos, label: String(pos), "show-lead-icon": "false", selected: sepOn.indexOf(pos) !== -1 });
        b.addEventListener("cds-change", function(e){
          e.stopPropagation();
          var at = parseInt(this.dataset.p, 10), on = e.detail.selected;
          sepOn = on ? sepOn.concat(at) : sepOn.filter(function(x){ return x !== at; });
          applySeps();
        });
        chips.appendChild(b);
      }
    }

    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Código", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Required Text", value: "(Obrigatório)", onInput: function(v){ p.setAttribute("required-text", v); } });
    kit.text(panel, { label: "Supporting Message (Neutral)", value: "Enviamos um código por SMS.", onInput: function(v){ set("supporting", v); } });
    kit.text(panel, { label: "Error Message (Warning)", value: "Código inválido. Tente de novo.", onInput: function(v){ set("error", v); } });
    kit.text(panel, { label: "Value (prefill)", placeholder: "ex.: A916GY", hint: "<code>Is Filled</code> deriva do valor real — não é controle.",
      onInput: function(v){ set("value", v); p.render(); readout(); } });

    // Nested instances — props das instâncias aninhadas, derivadas ao vivo do estado real
    kit.section(panel, "Nested instances");
    function stateOf(node){ return node.disabled ? "Disabled" : node.matches(":active") ? "Pressed" : node.matches(":hover") ? "Hovered" : "Enabled"; }
    var yes = function(b){ return b ? "True" : "False"; };
    var refreshers = [
      kit.nested(panel, {
        title: ".Value Box", exposed: true,
        note: "Uma por célula. No código as props derivam do container e da interação — escolha a célula para inspecionar.",
        items: function(){ return p.boxes.map(function(_, i){ return String(i + 1); }); },
        props: function(i){
          var box = p.boxes[i], inp = p.inputs[i];
          if (!box) return [];
          var active = box.matches(":focus-within"), filled = !!inp.value;
          return [
            ["State", box.matches(":active") ? "Pressed" : box.matches(":hover") ? "Hovered" : "Enabled"],
            ["Appearance", p.appearance === "warning" ? "Warning" : "Neutral"],
            ["Is Active", yes(active)],
            ["Hidden Value", yes(p.masked)],
            ["Is Filled", String(filled)],
            ["Value", filled ? (p.masked ? "•" : inp.value) : "—"],
            ["Show Separator", String(!!box.parentNode.querySelector(".cds-ci__sep"))],
            ["Show Caret", String(active && !filled)]
          ];
        }
      }),
      kit.nested(panel, {
        title: "Visibility Action · Icon Button", exposed: false,
        note: "Configuração fixa no componente; só o ícone e o estado mudam.",
        props: function(){
          var host = p.querySelector(".cds-ci__action"), b = host && host.button;
          if (!b) return [["Show Trailing Item", "false"]];
          return [
            ["Kind", "Ghost"], ["Appearance", "Neutral"], ["Size", "Small"],
            ["State", stateOf(b)], ["Show Notification", "false"],
            ["Icon", p.masked ? "hide-off-line" : "hide-line"]
          ];
        }
      })
    ];
    kit.watch(p, function(){ refreshers.forEach(function(f){ f(); }); });

    buildSep(); applySeps(); readout();
  }
});
} catch (e) { console.error("[cds] components/code-input-otp/code-input-otp.playground.js", e); }

/* ==== components/code-input-otp/code-input-otp.docs.js ==== */
try {
/* Documentação — Code Input OTP
   Fonte: [CastanhaDS] Component use documentation · seção 7057:17597 · frame [Documentação] Code Input OTP (7057:17641)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Substitui a doc legada (branch PfeMbrThCwzwJFFo2GiAbW, node 24764:9893).
   Ocultos no Figma: comparação "Text Input vs Code Input OTP" (de fora), Acessibilidade (no frame só há placeholder "Tópico 1 / Ordem de leitura"; a tab usa as annotations de Accessibility do set, 05/10),
   "Casos de exceção" (lorem ipsum, de fora) e 3 Do/Don'ts extras (lorem ipsum, de fora).
   Gaps: Estados da célula no Figma são de um `.Value Box` isolado (o componente tem no mínimo 3 células); Motion traz uma ilustração no lugar do exemplo
   (aqui: exemplo vivo do componente) e uma linha "—" vazia na tabela (de fora). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["code-input-otp"] = {
  tag: "cds-code-input",
  base: { length: "6", supporting: "Supporting Message", error: "Error Message" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7057-17597",
  // Capa (frame [Header] do Figma): Neutral preenchido + Warning com Hidden Values
  cover: { description: "Campo de código de verificação (OTP/PIN): uma fileira de células de um caractere, preenchidas uma a uma, para inserir um código curto recebido por SMS, e-mail ou app autenticador.", examples: [
    { label: "Código de autenticação", "show-required": false, value: "483920" },
    { label: "Código de autenticação", "show-required": false, value: "483920", appearance: "warning", masked: true }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Campo de código de verificação (OTP/PIN): uma fileira de células de um caractere, preenchidas uma a uma, para inserir um código curto recebido por SMS, e-mail ou app autenticador. Suporta de 3 a 6 dígitos, valores numéricos ou alfanuméricos, máscara opcional e estado de erro." },
      { h3: "Nomes alternativos comuns" },
      { p: "OTP input, PIN input, código de verificação, verification code, one-time code, código de confirmação." },
      { h3: "Princípios" },
      { cards: [
        ["Um caractere por célula", "Cada dígito tem sua célula; o foco avança sozinho ao digitar e volta ao apagar, tornando o preenchimento rápido e previsível."],
        ["Entrada curta e temporária", "É para códigos de uso único (3–6 caracteres), não para senhas longas nem texto livre."],
        ["Pronto para o autofill", "Integra com o preenchimento automático de código (SMS); colar distribui o código entre as células."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Code Input OTP para inserir um código de verificação curto e de uso único, quando ele chega por um canal externo (SMS, e-mail, app autenticador) e precisa ser digitado de volta." },
      { h3: "Utilize para:" },
      { ul: ["Confirmar login ou transação com código enviado por SMS/e-mail", "Validar um segundo fator (2FA/MFA)", "Inserir um PIN curto de ativação"] },
      { h3: "Não utilize para:" },
      { ul: ["Senhas — use o Password Input", "Texto livre ou números longos — use o Text Input", "Códigos longos (acima de 6 caracteres)"] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Código de autenticação", value: "483920", separators: "3" },
        markers: [
          { n: 1, target: ".cds-ci__label", side: "left" },
          { n: 2, target: ".cds-ci__boxes", side: "left" },
          { n: 3, target: "cds-icon-button", side: "right" },
          { n: 4, target: ".cds-ci__msg", side: "left" }
        ],
        legend: ["Label", "Value Boxes (células)", "Visibility Action", "Supporting / Error message"]
      } },
      { h2: "Composição do componente" },
      { p: "O Code Input OTP é composto por uma fileira de células `.Value Box` (3 a 6, uma por caractere) e uma Visibility Action (Icon Button Ghost) que mostra ou oculta o código, além das áreas de Label e mensagem de apoio/erro da família de inputs." },
      { h2: "Propriedades" },
      { props: [
        { name: "Value Box", type: "Variant" },
        { name: "Visibility Action", icon: "go-line", nested: [{ name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] }] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados da célula", min: "160px", items: [
        { label: "Enabled", attrs: { length: "3", value: "A1b", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Hovered", attrs: { length: "3", value: "A1b", state: "hovered", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Pressed", attrs: { length: "3", value: "A1b", state: "pressed", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } },
        { label: "Is Active", attrs: { length: "3", value: "A1b", "is-active": true, "show-label": false, "show-supporting-content": false, "show-trailing-item": false } }
      ] } },
      { note: "No Figma os estados são de um `.Value Box` (uma célula, valor A). Aqui o estado forçado vale para todas as células de um campo de 3, o mínimo do componente." },
      { specimens: { title: "Appearance × State", items: [
        { label: "Neutral · Enabled", attrs: { label: "Label", value: "1A2b3#" } },
        { label: "Neutral · Disabled", attrs: { label: "Label", value: "1A2b3#", disabled: true } },
        { label: "Warning · Enabled", attrs: { label: "Label", value: "1A2b3#", appearance: "warning" } },
        { label: "Warning · Disabled", attrs: { label: "Label", value: "1A2b3#", appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Como é anunciado" },
      { ol: [
        "As células formam um grupo (`role=\"group\"`) com o rótulo do campo. ex.: Código de verificação.",
        "Cada célula é um campo de 1 caractere com nome de posição. ex.: dígito 1 de 6.",
        "No Warning, as células ficam com `aria-invalid` e a `Error Message` é associada por `aria-describedby`.",
        "A `Error Message` é anunciada assim que aparece (`role=\"alert\"`).",
        "A Visibility Action é um toggle (`aria-pressed`): Mostrar código quando mascarado, Ocultar código quando visível.",
        "No estado desabilitado, as células e a Visibility Action ficam indisponíveis e saem da tabulação."
      ] },
      { h3: "Ordem de leitura" },
      { ol: ["Label do campo", "Indicador obrigatório, quando presente", "Células, da primeira à última", "Visibility Action, quando presente", "Mensagem de apoio ou de erro"] },
      { h2: "Teclado e preenchimento" },
      { ul: [
        "Um único ponto de tabulação entra e sai do conjunto: o Tab cai na primeira célula vazia (ou na última, com o código completo).",
        "Digitar avança o foco para a próxima célula; Backspace apaga e volta.",
        "Setas, Home e End navegam entre as células.",
        "Colar distribui o código entre as células.",
        "A primeira célula tem `autocomplete=\"one-time-code\"`, para o autofill de SMS.",
        "No tipo numérico, `inputmode=\"numeric\"` abre o teclado de números.",
        "Foco visível segue o padrão global do Castanha; não é variant do componente."
      ] },
      { h2: "Contraste (WCAG)" },
      { ul: [
        "Dígito (`Text/intense`) sobre `Surface/default`: 16,96:1 — AA e AAA.",
        "Label e mensagem de apoio (`Text/medium`): 8,24:1 — AA e AAA.",
        "Warning (`Feedback/Warning/semi-intense`): 6,41:1 — AA.",
        "Borda ativa (`Border/intense`): 16,96:1; pressionada (`Border/semi-intense`): 8,24:1 — atendem 1.4.11.",
        "Borda em repouso (`Border/semi-soft`, 1,25:1) e no hover (`Border/medium`, 2,78:1) ficam abaixo de 3:1: a célula se distingue pela fileira e pelo dígito.",
        "Erro comunicado por borda e texto, nunca só por cor (1.4.1).",
        "Estado desabilitado: isento do critério 1.4.3."
      ] },
      { note: "Fonte: annotations de Accessibility do set Code Input OTP (24060:7228, branch) e o comportamento implementado no playground. A seção Acessibilidade do frame de documentação no Figma ainda está oculta e com texto de exemplo." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Código de autenticação", "show-required": false, value: "483920", separators: "3" }, title: "Use só para códigos de verificação",
          text: "O Code Input é para códigos curtos de uso único. Para senhas, use o Password Input; para texto ou números longos, o Text Input." },
        { attrs: { label: "Código de autenticação", value: "482910", separators: "3", appearance: "warning" }, title: "Comunique o erro além da cor",
          text: "No código inválido, a borda Warning vem acompanhada da mensagem de erro; a cor sozinha não comunica a falha." },
        { attrs: { label: "Código de verificação", "show-required": false, value: "261548" }, title: "Defina a quantidade conforme o código",
          text: "Use o número de células igual ao tamanho do código (de 3 a 6). Células a mais ou a menos confundem quem digita." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Código de autenticação", "show-required": false, value: "904271", separators: "3" },
          text: "Código curto, numérico ou alfanumérico (ex.: 6 dígitos de SMS)." },
        { kind: "dont", attrs: { label: "Senha", value: "145290", masked: true },
          text: "Senha ou texto livre — use Password Input ou Text Input." },
        { kind: "do", attrs: { label: "Código de verificação", "show-required": false, value: "516203", separators: "3" },
          text: "Código de verificação curto (2FA, confirmação)." },
        { kind: "dont", attrs: { label: "CPF", value: "123456" },
          text: "CPF, telefone ou campo longo — use o Text Input." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "As transições de estado da célula usam os Motion Styles do Castanha (modo Normal)." },
      { display: { attrs: { label: "Código", "show-required": false }, live: true } },
      { note: "Exemplo interativo: passe o mouse, pressione e foque uma célula para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "Pressed → Is Active", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] }
      ] },
      { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (a `.Motion Styles` não tem modo Reduced tokenizado — tratamento no código)." }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/code-input-otp/code-input-otp.docs.js", e); }

/* ==== components/credit-card-input/credit-card-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-credit-card-input> — Credit Card Input · CDS-1607 · branch NHkGUvBfNMNTLnsxKtAmWa · set 24614:7155
 *
 * Membro da família Text Fields (CDS.TextField): campo do número do cartão (PAN). Aceita só dígitos e agrupa
 * em blocos de 4 (#### #### #### ####), conforme o .Text Content Mask "Credit Card" do Figma.
 *
 * Atributos: os da família (appearance · disabled · value · placeholder · label · required-text · supporting · error ·
 *   show-label · show-required · show-lead-icon · show-trailing-item · show-supporting-content · state · is-active)
 *   trailing-label — nome acessível do Icon Button; o papel da ação (tooltip, navegação…) é de quem implementa
 * Específico do branch: Lead Icon de 24px (credit-card-line, decorativo, não detecta bandeira) e Label em
 *   Feedback/Warning/semi-intense no Warning.
 * Eventos: cds-change {value, formatted} · cds-complete {value} · cds-trailing-action
 */
(function(){
  "use strict";
  var MASK = CDS.TextField.patternMask("0000 0000 0000 0000", { placeholder: "1234 5678 9012 3456" });

  class CdsCreditCardInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["trailing-label"]); }
    get mask(){ return MASK; }
    get defaultLeadIcon(){ return "credit-card-line"; }
    get fallbackName(){ return "Número do cartão"; }
    configureControl(ctrl){ ctrl.inputMode = "numeric"; ctrl.autocomplete = "cc-number"; }
    buildTrailing(box){
      var self = this, act = this.action = document.createElement("cds-icon-button");
      // Nested instance: Icon Button · Ghost · Neutral · Small · support-line
      act.className = "cds-tf__action";
      act.setAttribute("kind", "ghost"); act.setAttribute("appearance", "neutral"); act.setAttribute("size", "small");
      act.setAttribute("icon", "support-line");
      act.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-trailing-action", { bubbles: true })); });
      box.appendChild(act);
    }
    updateTrailing(){
      if (!this.action) return;
      this.action.hidden = !this.flag("show-trailing-item");
      this.action.setAttribute("label", this.getAttribute("trailing-label") || "Ajuda sobre o número do cartão");
      this.action.toggleAttribute("disabled", this.disabled);
    }
    update(){
      super.update();
      // No branch, o warning-line aparece sempre no Warning (não depende de Show Trailing Item)
      this.warnEl.hidden = this.appearance !== "warning";
    }
    afterInput(){
      super.afterInput();
      if (MASK.complete(this.value)) this.dispatchEvent(new CustomEvent("cds-complete", { detail: { value: this.value }, bubbles: true }));
    }
  }
  CdsCreditCardInput.define("cds-credit-card-input");
})();
} catch (e) { console.error("[cds] components/credit-card-input/credit-card-input.js", e); }

/* ==== components/credit-card-input/credit-card-input.playground.js ==== */
try {
/* Playground — Credit Card Input */
CDS.register({
  id: "credit-card-input",
  name: "Credit Card Input",
  category: "Text Fields",
  task: "CDS-1607",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/NHkGUvBfNMNTLnsxKtAmWa/-CastanhaDS--Components?node-id=24614-7155",
  zeroheight: "https://zeroheight.com/858426090/v/latest/p/933a06-credit-card-input",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-credit-card-input", {
      label: "Número do cartão",
      supporting: "Digite os 16 números do cartão.", error: "Número de cartão inválido."
    });
    ctx.preview.appendChild(p);
    function set(name, val){ kit.attr(p, name, val); }
    function readout(){ ctx.readout(p.value, p.value.length === 16); }
    p.addEventListener("cds-change", readout);
    p.addEventListener("cds-trailing-action", function(){ ctx.readout("Icon Button acionado", false); setTimeout(readout, 1200); });

    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]],
      onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered, Pressed e <code>Is Active</code> são estados de interação: passe o mouse, pressione e foque o campo.");

    // Booleans do Figma: ligados por padrão → só escreve "false" quando desligados
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"]]
      .forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });

    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Número do cartão", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Required Text", value: "(Obrigatório)", onInput: function(v){ p.setAttribute("required-text", v); } });
    kit.text(panel, { label: "Supporting Message (Neutral)", value: "Digite os 16 números do cartão.", onInput: function(v){ set("supporting", v); } });
    kit.text(panel, { label: "Error Message (Warning)", value: "Número de cartão inválido.", onInput: function(v){ set("error", v); } });
    kit.text(panel, { label: "Trailing Label (nome acessível do Icon Button)", value: "Ajuda sobre o número do cartão",
      hint: "O papel da ação (tooltip, navegação, outra ação) é definido por quem implementa; o componente só dispara <code>cds-trailing-action</code>.",
      onInput: function(v){ set("trailing-label", v); } });
    kit.text(panel, { label: "Value (prefill)", placeholder: "ex.: 4111111111111111", hint: "Só dígitos, até 16. <code>Is Filled</code> deriva do valor real.",
      onInput: function(v){ set("value", v); readout(); } });

    // Nested instances — props das instâncias aninhadas, derivadas ao vivo do estado real
    kit.section(panel, "Nested instances");
    function stateOf(node){ return node.disabled ? "Disabled" : node.matches(":active") ? "Pressed" : node.matches(":hover") ? "Hovered" : "Enabled"; }
    var refreshers = [
      kit.nested(panel, {
        title: ".Text Content Mask", exposed: true,
        note: "Building block compartilhado da família. Aqui a máscara é fixa em <code>Credit Card</code>.",
        props: function(){
          var inp = p.input;
          return [
            ["Mask", "Credit Card"],
            ["Credit Card", inp && inp.value ? inp.value : (inp ? inp.placeholder + " (placeholder)" : "—")],
            ["Is Filled", String(!!(inp && inp.value))]
          ];
        }
      }),
      kit.nested(panel, {
        title: "Lead Icon", exposed: false,
        note: "Instance swap. Ícone de cartão fixo — não detecta a bandeira.",
        props: function(){
          return [["Show Lead Icon", String(!!p.querySelector(".cds-tf__lead:not([hidden])"))], ["Lead Icon", "credit-card-line"], ["Tamanho", "24×24"]];
        }
      }),
      kit.nested(panel, {
        title: "Trailing Item · Icon Button", exposed: false,
        note: "Configuração fixa no componente. O papel da ação é de quem implementa.",
        props: function(){
          var host = p.querySelector(".cds-tf__box cds-icon-button"), b = host && host.button;
          if (!b) return [["Show Trailing Item", "false"]];
          return [
            ["Kind", "Ghost"], ["Appearance", "Neutral"], ["Size", "Small"],
            ["State", stateOf(b)], ["Show Notification", "false"], ["Icon", "support-line"],
            ["aria-label", b.getAttribute("aria-label")]
          ];
        }
      })
    ];
    kit.watch(p, function(){ refreshers.forEach(function(f){ f(); }); });

    readout();
  }
});
} catch (e) { console.error("[cds] components/credit-card-input/credit-card-input.playground.js", e); }

/* ==== components/credit-card-input/credit-card-input.docs.js ==== */
try {
/* Documentação — Credit Card Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 7057:23774 · frame [Documentação] Credit Card Input (7057:27369)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Oculto no Figma e de fora: comparação "Text Input vs Credit Card Input", subtítulos Viewport/Accent de Estilos, "Casos de exceção"
   (lorem ipsum), os 3 Do/Don'ts com lorem ipsum e a nota de reduced motion.
   Gaps: o Don't "Senha" usa valor com letras (aBC123@@), que a máscara só de dígitos não aceita: aparece como placeholder.
   O Component Display de Motion é uma ilustração (não o componente) e a linha "—" da tabela de Motion ficaram de fora. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["credit-card-input"] = {
  tag: "cds-credit-card-input",
  base: { value: "1234567890123456", supporting: "Supporting Message", error: "Error Message" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7057-23774",
  // Capa (frame [Header] do Figma), acima das tabs
  cover: { description: "Campo para inserir o número de um cartão de crédito.",
    attrs: { label: "Número do cartão de crédito", "show-required": false, supporting: "Mensagem de apoio" } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Campo para inserir o número de um cartão de crédito. Exibe o número mascarado em grupos, com um ícone de cartão à esquerda, e faz parte da família de text fields — com label, mensagem de apoio e estado de erro." },
      { h3: "Nomes alternativos comuns" },
      { p: "card input, card number field, credit card field, campo de cartão, PAN field." },
      { h3: "Princípios" },
      { cards: [
        ["Número mascarado e agrupado", "Exibe o número em grupos (#### #### #### ####), facilitando a conferência e reduzindo erro de digitação."],
        ["Dado sensível", "O número do cartão é um dado sensível: exiba mascarado e, em um cartão salvo, mostre apenas os últimos dígitos."],
        ["Parte da família de inputs", "Herda label, obrigatoriedade, mensagem de apoio e estado de erro dos text fields, mantendo consistência com os demais campos do formulário."]
      ] },
      { h2: "Quando usar" },
      { p: "Utilize o Credit Card Input para capturar o número de um cartão em fluxos de pagamento, cadastro ou atualização de cartão — quando a entrada é um número de cartão (com máscara, agrupamento e bandeira), não texto ou número genérico." },
      { h3: "Utilize para:" },
      { ul: ["Informar o número do cartão num checkout / pagamento", "Cadastrar ou atualizar um cartão salvo", "Validar os dados de um cartão antes de concluir a transação"] },
      { h3: "Não utilize para:" },
      { ul: ["Validade ou CVV — use campos próprios", "Texto ou números genéricos — use o Text Input", "Senha ou PIN — use o Password Input ou o Code Input OTP"] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Número do cartão" },
        markers: [
          { n: 1, target: ".cds-tf__label", side: "left" },
          { n: 2, target: ".cds-tf__box", side: "left" },
          { n: 3, target: "cds-icon-button", side: "right" },
          { n: 4, target: ".cds-tf__msg", side: "bottom" }
        ],
        legend: ["Label", "Text Box — número mascarado e ícone de cartão", "Icon Button", "Supporting / Error message"]
      } },
      { h2: "Composição do componente" },
      { p: "O Credit Card Input é composto pelo Text Box com o número mascarado (`.Text Content Mask`), o Lead Icon (ícone de cartão padrão) à esquerda (opcional, via `Show Lead Icon`) e um Icon Button de apoio à direita (via `Show Trailing Item`), além das áreas de Label e mensagem de apoio/erro da família de inputs." },
      { h2: "Propriedades" },
      { props: [
        { name: "Lead Icon", type: "Swap component" },
        { name: "Icon Button", icon: "support-line", nested: [{ name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] }] }
      ] },
      { note: "Todas as props (booleans, textos e variants) podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados do campo", items: [
        { label: "Enabled", attrs: { label: "Label", value: "" } },
        { label: "Hovered", attrs: { label: "Label", value: "", state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", value: "", state: "pressed" } },
        { label: "Is Active", attrs: { label: "Label", value: "", placeholder: "", "is-active": true } }
      ] } },
      { specimens: { title: "Appearance × State", items: [
        { label: "Neutral · Enabled", attrs: { label: "Label" } },
        { label: "Neutral · Disabled", attrs: { label: "Label", disabled: true } },
        { label: "Warning · Enabled", attrs: { label: "Label", appearance: "warning" } },
        { label: "Warning · Disabled", attrs: { label: "Label", appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Como é anunciado" },
      { ol: [
        "O campo é anunciado como um único controle de entrada de texto, com o rótulo do Label.",
        "O estado obrigatório é anunciado junto ao rótulo quando `Show Required` está ativo.",
        "A mensagem de apoio ou de erro é associada ao campo e lida após o rótulo.",
        "O Lead Icon da bandeira é decorativo: deve ser ignorado pelo leitor, a menos que a bandeira não esteja comunicada em texto.",
        "O estado desabilitado é anunciado como indisponível (`aria-disabled`) e fica fora da tabulação."
      ] },
      { h3: "Ordem de leitura" },
      { ol: ["Label do campo", "Indicador obrigatório, quando presente", "Campo de número do cartão (valor ou placeholder)", "Ícone de apoio (Icon Button), quando presente", "Mensagem de apoio ou de erro"] },
      { h3: "Contraste (WCAG)" },
      { ol: [
        "Texto (Label, valor, apoio): 8,2:1 a 17:1 — AA e AAA.",
        "Warning (#974602) sobre o fundo: 6,4:1 — AA.",
        "Placeholder (Text/soft #999): 2,78:1 — isento, texto de dica.",
        "Borda em interação (Active/Pressed): 8,2:1; repouso/hover < 3:1, herança da família.",
        "Estado desabilitado: isento do critério 1.4.3."
      ] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Número do cartão", "show-required": false }, title: "Use só para número de cartão",
          text: "O Credit Card Input é para o número do cartão. Para validade ou CVV, use campos próprios; para texto ou números longos, o Text Input." },
        { attrs: { label: "Número do cartão", appearance: "warning" }, title: "Comunique o erro além da cor",
          text: "No número inválido, a borda Warning vem acompanhada da mensagem de erro; a cor sozinha não comunica a falha." },
        { attrs: { label: "Número do cartão", "show-required": false }, title: "Proteja o número do cartão",
          text: "Ao exibir um cartão já salvo, mostre apenas os últimos dígitos; não exponha o número completo nem registre o valor." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Número do cartão de crédito", "show-required": false, "show-supporting-content": false, "show-trailing-item": false },
          text: "Número de cartão mascarado em grupos (#### #### #### ####)." },
        // Figma: valor "aBC123@@" (preenchido); a máscara só aceita dígitos, então aparece como placeholder
        { kind: "dont", attrs: { label: "Senha", value: "", placeholder: "aBC123@@" },
          text: "CPF, telefone ou texto livre — use o Text Input." },
        { kind: "do", attrs: { label: "Código de verificação", "show-required": false, supporting: "Mensagem de apoio" },
          text: "Utilize a mensagem de suporte e o Trailing Item para contextualizar o usuário." },
        { kind: "dont", attrs: { label: "CVV", value: "123", "show-required": false, "show-lead-icon": false, "show-supporting-content": false },
          style: "width:calc(var(--common-sizes-120) + var(--common-sizes-14))",
          text: "Validade ou CVV neste campo — use campos próprios." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "As transições de estado do campo usam os Motion Styles do Castanha (modo Normal)." },
      { display: { attrs: { label: "Número do cartão", "show-required": false, value: "" }, live: true } },
      { note: "Exemplo interativo: passe o mouse, pressione e foque o campo para ver cada transição." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "Pressed → Is Active", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] }
      ] }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/credit-card-input/credit-card-input.docs.js", e); }

/* ==== components/date-input/date-input.js ==== */
try {
/**
 * @deps text-field date-picker popover
 * <cds-date-input> — Date Input · Datepicker · set 17962:70687 (64 variantes: Kind × Appearance × State × Is Filled × Is Active)
 * Text Input com .Text Content Mask=Date (placeholder "dd/mm/aaaa"), sem Lead Icon, e o Calendar Button
 * (Icon Button Ghost Neutral Small · calendar-line). Is Active=True abre o Popover com o Date Picker
 * (Kind=Single 336 × 412 · Double 636 × 412).
 * Character Counter: ligado por padrão com o texto "-0000", como no Figma (C57).
 *
 * Atributos: os da família (sem lead-icon) · kind (single|double — calendário do Popover) · min · max · today
 *   value (dd/mm/aaaa ou só os dígitos) · calendar-label ("Abrir calendário")
 * Propriedade: .date (AAAA-MM-DD ou "") · Eventos: cds-change { value, formatted, date } · cds-toggle { open }
 */
(function(){
  "use strict";
  var D = CDS.dates;
  var DATE = CDS.TextField.patternMask("00/00/0000", { placeholder: "dd/mm/aaaa" });
  class CdsDateInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["kind","min","max","today","calendar-label"]); }
    get mask(){ return DATE; }
    get hasLeadIcon(){ return false; }
    get fallbackName(){ return "Data"; }
    get date(){ var d = D.fromBr(this.displayValue); return d ? D.iso(d) : ""; }
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    configureControl(ctrl){
      var self = this;
      ctrl.setAttribute("autocomplete", "off");
      ctrl.addEventListener("keydown", function(e){
        if (e.key === "Escape" && self.isOpen){ e.preventDefault(); self.closeCalendar(); }
        if (e.key === "ArrowDown" && e.altKey){ e.preventDefault(); self.openCalendar(true); }
      });
    }
    buildTrailing(box){
      var self = this;
      this.classList.add("cds-tf--date");
      var b = this.calBtn = box.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "calendar-line" }, "cds-tf__action"));
      b.addEventListener("click", function(){ if (self.disabled) return; if (self.isOpen) self.closeCalendar(); else self.openCalendar(true); });
      var pop = this.pop = CDS.create("cds-popover", { popover: "manual", label: "Calendário" }, "cds-di__popover");
      this.picker = pop.appendChild(CDS.create("cds-date-picker", { mode: "single" }));
      pop.addEventListener("cds-toggle", function(e){ if (e.target === pop) e.stopPropagation(); });
      this.appendChild(pop);
      this.picker.addEventListener("cds-change", function(e){
        e.stopPropagation();
        self._setValue(D.br(D.parse(e.detail.value)), false);
        self.afterInput();
        self.closeCalendar(); self.control.focus();
      });
      pop.addEventListener("keydown", function(e){ if (e.key === "Escape"){ e.preventDefault(); self.closeCalendar(); self.control.focus(); } });
      this.addEventListener("focusout", function(e){ if (self.isOpen && (!e.relatedTarget || !self.contains(e.relatedTarget))) self.closeCalendar(); });
      this._outside = function(e){ if (self.isOpen && !self.contains(e.target)) self.closeCalendar(); };
      this._reposition = function(){ if (self.isOpen) self.place(); };
    }
    connectedCallback(){ super.connectedCallback(); document.addEventListener("pointerdown", this._outside, true); window.addEventListener("resize", this._reposition); window.addEventListener("scroll", this._reposition, true); }
    disconnectedCallback(){ document.removeEventListener("pointerdown", this._outside, true); window.removeEventListener("resize", this._reposition); window.removeEventListener("scroll", this._reposition, true); }
    syncPicker(){
      var p = this.picker, dt = this.date, self = this;
      ["kind","min","max","today"].forEach(function(a){ CDS.attr(p, a, self.getAttribute(a)); });
      CDS.attr(p, "value", dt || null);
      if (dt) CDS.attr(p, "month", dt.slice(0, 7)); else p.removeAttribute("month");
    }
    openCalendar(focus){
      if (this.isOpen || this.disabled) return;
      this.syncPicker(); CDS.attr(this.picker, "view", null);
      this.pop.style.maxWidth = "none";
      this.pop.showPopover(); this.place();
      this.classList.add("is-open"); this.updateTrailing();
      if (focus) this.picker.focusDay();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: true }, bubbles: true }));
    }
    closeCalendar(){
      if (!this.isOpen) return;
      this.pop.hidePopover(); this.classList.remove("is-open"); this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: false }, bubbles: true }));
    }
    place(){ CDS.position(this.box, this.pop, { placement: "bottom-start", gap: 8 }); }
    afterInput(){
      this.updateCounter(); this.updateTrailing();
      this.classList.toggle("is-filled", !!this.value);
      if (this.isOpen) this.syncPicker();
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, formatted: this.control.value, date: this.date }, bubbles: true }));
    }
    updateTrailing(){
      if (!this.calBtn) return;
      this.calBtn.hidden = !this.flag("show-trailing-item");
      CDS.attr(this.calBtn, "label", (this.getAttribute("calendar-label") || "Abrir calendário"));
      CDS.attr(this.calBtn, "disabled", this.disabled ? "" : null);
      var ib = this.calBtn.querySelector("button"); if (ib){ ib.setAttribute("aria-expanded", String(this.isOpen)); ib.setAttribute("aria-haspopup", "dialog"); }
    }
    // Character Counter Value: "-0000" por padrão (Figma)
    updateCounter(){
      var t = this.hasAttribute("character-counter") ? this.getAttribute("character-counter") : "-0000";
      this.counterEl.textContent = t;
      this.counterEl.hidden = !(this.flag("show-character-counter") && t);
      if (this.foot) this.foot.hidden = this.msgEl.hidden && this.counterEl.hidden;
    }
  }
  CdsDateInput.define("cds-date-input");
})();
} catch (e) { console.error("[cds] components/date-input/date-input.js", e); }

/* ==== components/date-input/date-input.playground.js ==== */
try {
/* Playground — Date Input */
CDS.register({
  id: "date-input", name: "Date Input", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17962-70687",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-date-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message" },
      variants: function(panel, p, set){
        kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], hint: "Kind define o calendário do Popover (um ou dois meses).", onChange: function(v){ set("kind", v === "single" ? null : v); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["character-counter","Character Counter Value","-0000","","No Figma o padrão é “-0000” (C57)."],["value","Value (prefill)",""]],
      nested: function(p){ return [
        { title: ".Text Content Mask", exposed: true, note: "Mask=Date · placeholder dd/mm/aaaa.", props: function(){ return [["Date (ISO)", p.date || "—"]]; } },
        { title: "Calendar Button", exposed: false, note: "Icon Button Ghost Neutral Small · calendar-line. Abre o Popover com o Date Picker.", props: function(){ return [["Aberto", String(p.isOpen)]]; } }
      ]; }
    });
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.date || e.detail.formatted || "—", !!e.detail.date); });
  }
});
} catch (e) { console.error("[cds] components/date-input/date-input.playground.js", e); }

/* ==== components/password-input/password-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-password-input> — Password Input · Text Fields · set 5798:2677
 * Show Content=False mascara o valor; a Visibility Action (Icon Button · Ghost · Neutral · Small) alterna.
 * Ícone reflete o estado: hide-line com o conteúdo visível, hide-off-line mascarado (mesmo padrão do OTP).
 * Sem valor, a Visibility Action fica indisponível (Figma: State=Disabled no campo vazio).
 *
 * Atributos: os da família · show-content ("true" mostra; padrão mascarado — Q35) · autocomplete (padrão current-password)
 * Eventos: cds-change { value } · cds-visibility-change { visible }
 */
(function(){
  "use strict";
  class CdsPasswordInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["show-content", "autocomplete"]); }
    get visible(){ return this.getAttribute("show-content") === "true"; }
    get fallbackName(){ return "Senha"; }
    configureControl(ctrl){ ctrl.type = "password"; ctrl.setAttribute("autocapitalize", "off"); }
    buildTrailing(box){
      var self = this, b = this.visBtn = document.createElement("cds-icon-button");
      b.className = "cds-tf__action";
      b.setAttribute("kind", "ghost"); b.setAttribute("appearance", "neutral"); b.setAttribute("size", "small");
      b.addEventListener("click", function(){
        self.setAttribute("show-content", self.visible ? "false" : "true");
        self.dispatchEvent(new CustomEvent("cds-visibility-change", { detail: { visible: self.visible }, bubbles: true }));
        var inner = self.visBtn.querySelector("button"); if (inner) inner.focus();
      });
      box.appendChild(b);
    }
    updateTrailing(){
      if (!this.visBtn) return;
      var vis = this.visible;
      this.control.type = vis ? "text" : "password";
      this.visBtn.hidden = !this.flag("show-trailing-item");
      this.visBtn.setAttribute("icon", vis ? "hide-line" : "hide-off-line");
      this.visBtn.setAttribute("label", vis ? "Ocultar senha" : "Mostrar senha");
      this.visBtn.setAttribute("pressed", String(vis));
      if (this.disabled || !this.value) this.visBtn.setAttribute("disabled", ""); else this.visBtn.removeAttribute("disabled");
    }
    update(){
      this.control.autocomplete = this.getAttribute("autocomplete") || "current-password";
      super.update();
    }
  }
  CdsPasswordInput.define("cds-password-input");
})();
} catch (e) { console.error("[cds] components/password-input/password-input.js", e); }

/* ==== components/password-input/password-input.playground.js ==== */
try {
/* Playground — Password Input */
CDS.register({
  id: "password-input", name: "Password Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5798-2677",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-password-input",
      attrs: { label: "Senha", supporting: "Supporting Message", error: "Error Message" },
      variants: function(panel, p, set){
        kit.toggle(panel, { label: "Show Content", onChange: function(on){ set("show-content", on ? "true" : null); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Senha"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["placeholder","Placeholder Content",""],["value","Value (prefill)",""]],
      leadIcon: "placeholder-line",
      nested: function(p){ return [
        { title: "Visibility Action · Icon Button", exposed: false, note: "Ghost · Neutral · Small. hide-line com o conteúdo visível, hide-off-line mascarado. Sem valor fica indisponível.",
          props: function(){ var b = p.visBtn; return b ? [["Icon", b.getAttribute("icon")], ["State", b.hasAttribute("disabled") ? "Disabled" : "Enabled"], ["aria-label", b.getAttribute("label")], ["aria-pressed", b.getAttribute("pressed")]] : []; } }
      ]; }
    });
    p.addEventListener("cds-visibility-change", function(e){ ctx.readout(e.detail.visible ? "conteúdo visível" : "conteúdo oculto", false); });
  }
});
} catch (e) { console.error("[cds] components/password-input/password-input.playground.js", e); }

/* ==== components/password-input/password-input.docs.js ==== */
try {
/* Documentação — Password Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 4054:50 · frame [Documentação] Password input (4054:88)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Capa = mockup com imagem (frame [Header] 4054:686).
   Oculto no Figma: Acessibilidade (4054:332) — só placeholder ("Tópico 1" / "Ordem de leitura"), então ficou de fora (note na tab).
   Motion ainda é placeholder (lorem ipsum / "Especificação").
   Diretrizes e Do/Don't no Figma são imagens: os exemplos usam o componente real com os textos padrão do componente (CONFERIR).
   O set do Figma desta doc usa Required "*" e contador "-0000"; o código segue a lib atual ("(Obrigatório)"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["password-input"] = {
  tag: "cds-password-input",
  base: { label: "Label", supporting: "Supporting Message", error: "Error Message", "character-counter": "0000" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=4054-50",
  // Capa (frame [Header] do Figma): mockup com imagem de tela de produto
  cover: { description: "O Password Input é um campo de entrada específico para senhas.", image: "assets/docs/covers/password-input.png", alt: "Tela de produto com um Password Input" },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Password Input é um campo de entrada específico para senhas. Ele inclui controle de visibilidade do conteúdo, mensagens de apoio, contador de caracteres e ícones opcionais para reforçar contexto ou ação." },
      { h3: "Nomes alternativos comuns" },
      { p: "Campo de Senha, Input de Senha." },
      { h3: "Princípios" },
      { cards: [
        ["Privacidade do conteúdo", "Garante que a senha permaneça protegida durante a digitação."],
        ["Controle e clareza", "Permite alternar entre mostrar e ocultar a senha de forma direta."],
        ["Consistência e orientação", "Mantém alinhamento visual e funcional com os demais inputs do sistema."]
      ] },
      { h2: "Quando usar" },
      { p: "Use quando o fluxo exigir entrada de informação sensível que deve ser mascarada e conferida com segurança." },
      { h3: "Utilize para:" },
      { ul: ["Fluxos de login, alteração de senha e campos sensíveis.", "Situações em que a pessoa usuária precisa controlar a visualização da senha."] },
      { h3: "Não utilize para:" },
      { ul: ["Informações não sensíveis que não exigem mascaramento.", "Códigos rápidos ou segmentados, como OTP e PIN (Code input)."] },
      { h3: "Password Input vs Text Input" },
      { p: "O Password Input mascara o conteúdo e oferece controle de visibilidade, enquanto o Text Input exibe tudo abertamente." },
      { compare: [
        { title: "Este é um Password Input", attrs: { label: "Senha de 4 dígitos", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Novo número de celular com DDD", placeholder: "(00) 00000-0000", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } }
      ] },
      { h3: "Password Input vs Code input" },
      { p: "O Password Input é contínuo e adequado para senhas completas, enquanto Code input é segmentado e pensado para verificações rápidas." },
      { compare: [
        { title: "Este é um Password input", attrs: { label: "Senha", placeholder: "Digite a senha", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Code input", attrs: { _tag: "cds-code-input", type: "numeric", value: "10835", separators: "none", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: {},
        markers: [
          { n: 1, target: ".cds-tf__lead", side: "left" },
          { n: 2, target: ".cds-tf__label", side: "left" },     // Figma: de cima (Down); o kit não tem lado de cima
          { n: 3, target: ".cds-tf__control", side: "bottom" }, // Figma: de cima (Down)
          { n: 4, target: ".cds-tf__box", side: "right" },      // Figma: de cima (Down)
          { n: 5, target: "cds-icon-button", side: "top" },   // Figma: Right; à direita cruzava o 4
          { n: 6, target: ".cds-tf__counter", side: "right" },
          { n: 7, target: ".cds-tf__msg", side: "left" }
        ],
        legend: ["Lead icon", "Text label", "Text placeholder", "Container", "Trailling item", "Counter", "Text supporting message"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Style", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Active", type: "Boolean" },
        { name: "Is Filled", type: "Boolean" },
        { name: "Show Content", type: "Boolean" },
        { name: "Show Label", type: "Boolean" },
        { name: "Label content", type: "Text", values: ["Padrão: Label"] },
        { name: "Show Required Asterisk", type: "Boolean" },
        { name: "Show Lead Icon", type: "Boolean" },
        { name: "Placeholder content", type: "Text", values: ["Padrão: Placeholder"] },
        { name: "Show Trailling Item", type: "Boolean" },
        { name: "Show Supporting Content", type: "Boolean" },
        { name: "Supporting Message", type: "Text", values: ["Padrão: Supporting Message"] },
        { name: "Show Character Counter", type: "Boolean" },
        { name: "Character Counter", type: "Text", values: ["Padrão: 0000"] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Neutral", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } }
      ] } },
      { specimens: { title: "Warning", items: [
        { label: "Enabled", attrs: { appearance: "warning" } },
        { label: "Hovered", attrs: { appearance: "warning", state: "hovered" } },
        { label: "Pressed", attrs: { appearance: "warning", state: "pressed" } },
        { label: "Disabled", attrs: { appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: [{ label: "Senha", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false }, { label: "Confirmar a senha", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false }], title: "Use mensagens de apoio para orientar requisitos",
          text: "Forneça instruções claras sobre a criação da senha para evitar tentativas e erros." }
      ] },
      { note: "No Figma, os exemplos de comparação, diretriz e Do's and Don'ts são telas de produto; aqui são os componentes reais com os mesmos textos (sem o resto da tela). A lista de requisitos da senha da diretriz não tem componente equivalente." },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { label: "Digite sua senha de 4 números", value: "123a", supporting: "A senha deve conter somente números", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Use a mensagem de apoio para orientar previamente que os detalhes e restrições para a criação da senha." },
        { kind: "dont", attrs: { label: "Digite sua senha de 4 números", value: "123a", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          text: "Não deixe para informar essa restrição apenas após um erro ou no envio do formulário." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Password Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion tokens por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/password-input/password-input.docs.js", e); }

/* ==== components/quantity-input/quantity-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-quantity-input> — [Beta] Quantity Input · Text Fields · set 22756:7351
 * Componente independente da família (annotation de Handoff): reaproveita só Label e mensagem.
 * Decrement Button (minus-line) · Text Box (min 72, valor centralizado) · Increment Button (plus-line),
 * os dois Icon Button · Neutral · Medium, Kind Default ou Ghost (variante do conjunto, não dos botões).
 *
 * Atributos: kind (default|ghost) · appearance · disabled · value (padrão 1) · min · max · step (padrão 1)
 *   prefix (antes do valor, ex.: "R$") · suffix (depois, ex.: "%") · decimals (casas fixas, ex.: 2 → "5,00")
 *   label · required-text · supporting · error
 *   Exibição em pt-BR com separador de milhar ("1.250"); a digitação também é lida em pt-BR
 *   (prefix, decimals e milhar: exceção aprovada pelo Gustavo em 02/10 — a lib não tem essas props, C100)
 *   show-label · show-required · show-supporting-content · decrement-label · increment-label
 * Comportamento (annotations): valor inválido não bloqueia a digitação; fora da faixa vira Warning;
 *   ao sair do campo, ajusta para o limite mais próximo e anuncia; no limite, o botão correspondente fica
 *   indisponível; setas ↑/↓ mudam pelo step; um único ponto de tabulação (os botões ficam fora dele).
 * Eventos: cds-change { value }
 */
(function(){
  "use strict";
  var el = CDS.TextField.el, uid = 0;
  function num(v, d){ var n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : d; }
  // texto digitado em pt-BR: "1.250,5" → 1250.5 (ponto = milhar, vírgula = decimal)
  function numBR(v, d){ return num(String(v).replace(/\s/g, "").replace(/\./g, ""), d); }

  class CdsQuantityInput extends CDS.Element {
    static get observedAttributes(){ return ["kind","appearance","disabled","value","min","max","step","prefix","suffix","decimals","label","required-text","supporting","error","show-label","show-required","show-supporting-content","decrement-label","increment-label","state","is-active"]; }
    constructor(){ super(); this._id = "cds-qty-" + (++uid); this._value = null; }
    get min(){ return num(this.getAttribute("min"), -Infinity); }
    get max(){ return num(this.getAttribute("max"), Infinity); }
    get step(){ return num(this.getAttribute("step"), 1) || 1; }
    get value(){ return this._value; }
    set value(v){ this._value = num(v, this._value); this.update(); }
    attributeChangedCallback(name){ if (name === "value") this._value = null; if (this.isConnected) this.render(); }
    render(){ if (!this._built){ this.build(); this._built = true; } if (this._value == null) this._value = num(this.getAttribute("value"), 1); this.update(); }

    build(){
      var self = this, id = this._id;
      this.classList.add("cds-tf", "cds-qty");
      this.innerHTML = "";
      var lab = this.labelEl = el("label", "cds-tf__label"); lab.htmlFor = id + "-ctrl";
      this.labelText = lab.appendChild(el("span")); lab.appendChild(document.createTextNode(" ")); this.reqEl = lab.appendChild(el("span"));
      this.appendChild(lab);
      var row = el("div", "cds-qty__row");
      var mk = function(icon){ var b = document.createElement("cds-icon-button"); b.setAttribute("appearance", "neutral"); b.setAttribute("size", "medium"); b.setAttribute("icon", icon); return b; };
      this.dec = row.appendChild(mk("minus-line"));
      var box = this.box = row.appendChild(el("div", "cds-tf__box cds-qty__box"));
      var ctrl = this.control = box.appendChild(el("input", "cds-tf__control cds-qty__control"));
      ctrl.id = id + "-ctrl"; ctrl.type = "text"; ctrl.inputMode = "decimal"; ctrl.setAttribute("role", "spinbutton"); ctrl.autocomplete = "off";
      this.inc = row.appendChild(mk("plus-line"));
      this.appendChild(row);
      this.msgEl = this.appendChild(el("div", "cds-tf__msg cds-qty__msg")); this.msgEl.id = id + "-msg";
      this.live = this.appendChild(el("span", "cds-qty__live")); this.live.setAttribute("aria-live", "polite");

      this.dec.addEventListener("click", function(){ self.stepBy(-1); });
      this.inc.addEventListener("click", function(){ self.stepBy(1); });
      ctrl.addEventListener("input", function(){ self._typed = true; self._value = numBR(ctrl.value.replace(self.prefixText, "").replace(self.suffixText, ""), self._value); self.update(true); });
      ctrl.addEventListener("keydown", function(e){
        if (e.key === "ArrowUp"){ e.preventDefault(); self.stepBy(1); }
        if (e.key === "ArrowDown"){ e.preventDefault(); self.stepBy(-1); }
      });
      ctrl.addEventListener("blur", function(){ self.commit(); });
      box.addEventListener("mousedown", function(e){ if (e.target !== ctrl){ e.preventDefault(); ctrl.focus(); } });
    }
    get suffixText(){ return this.getAttribute("suffix") || ""; }
    get prefixText(){ var p = this.getAttribute("prefix"); return p ? p + "\u00a0" : ""; }
    stepBy(dir){
      var v = this._value + dir * this.step;
      v = Math.min(this.max, Math.max(this.min, v));
      this._value = Math.round(v * 1e6) / 1e6; this.update(); this.emit();
    }
    // Ao sair do campo: ajusta para o limite mais próximo e anuncia por região dinâmica
    commit(){
      if (!this._typed) return; this._typed = false;
      var v = Math.min(this.max, Math.max(this.min, this._value));
      if (v !== this._value){ this._value = v; this.live.textContent = "Valor ajustado para " + this.format(v); }
      this.update(); this.emit();
    }
    emit(){ this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this._value }, bubbles: true })); }
    format(v){
      var d = parseInt(this.getAttribute("decimals"), 10), fixed = isFinite(d) && d >= 0;
      var txt = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: fixed ? d : 0, maximumFractionDigits: fixed ? d : 6 }).format(v);
      return this.prefixText + txt + this.suffixText;
    }
    get outOfRange(){ return this._value < this.min || this._value > this.max; }

    update(typing){
      if (!this._built) return;
      var label = this.getAttribute("label"), showLabel = !!label && this.flag("show-label");
      this.labelEl.hidden = !showLabel; this.labelText.textContent = label || "";
      var req = this.hasAttribute("required-text") ? this.getAttribute("required-text") : "(Obrigatório)";
      this.reqEl.hidden = !(this.flag("show-required") && req); this.reqEl.textContent = req;
      var kind = this.getAttribute("kind") === "ghost" ? "ghost" : "default";
      [this.dec, this.inc].forEach(function(b){ b.setAttribute("kind", kind); });
      // Fora da faixa durante a digitação = Warning (sem alterar o atributo de quem implementa)
      var warning = this.getAttribute("appearance") === "warning" || this.outOfRange;
      this.classList.toggle("is-warning", warning);
      var ctrl = this.control;
      if (!typing) ctrl.value = this.format(this._value);
      ctrl.style.width = (Math.max(1, ctrl.value.length) + 1) + "ch"; // a caixa acompanha o texto (mínimo 72 no CSS)
      ctrl.disabled = this.hasAttribute("disabled");
      ctrl.setAttribute("aria-valuenow", String(this._value));
      ctrl.setAttribute("aria-valuetext", this.format(this._value));
      if (isFinite(this.min)) ctrl.setAttribute("aria-valuemin", String(this.min)); else ctrl.removeAttribute("aria-valuemin");
      if (isFinite(this.max)) ctrl.setAttribute("aria-valuemax", String(this.max)); else ctrl.removeAttribute("aria-valuemax");
      if (!showLabel) ctrl.setAttribute("aria-label", label || "Quantidade"); else ctrl.removeAttribute("aria-label");
      if (warning) ctrl.setAttribute("aria-invalid", "true"); else ctrl.removeAttribute("aria-invalid");
      this.dec.setAttribute("label", this.getAttribute("decrement-label") || "Diminuir quantidade");
      this.inc.setAttribute("label", this.getAttribute("increment-label") || "Aumentar quantidade");
      var dis = this.hasAttribute("disabled");
      // Limite atingido indisponibiliza o controle correspondente; o outro segue ativo
      this.dec.toggleAttribute("disabled", dis || this._value <= this.min);
      this.inc.toggleAttribute("disabled", dis || this._value >= this.max);
      if (dis) this.setAttribute("aria-disabled", "true"); else this.removeAttribute("aria-disabled");
      // os botões não entram na tabulação: o campo é o único ponto (setas ↑/↓ fazem o mesmo papel)
      [this.dec, this.inc].forEach(function(b){ var inner = b.querySelector("button"); if (inner) inner.tabIndex = -1; });
      var msg = this.flag("show-supporting-content") ? (warning ? this.getAttribute("error") : this.getAttribute("supporting")) : null;
      this.msgEl.textContent = msg || ""; this.msgEl.hidden = !msg;
      if (warning && msg) this.msgEl.setAttribute("role", "alert"); else this.msgEl.removeAttribute("role");
      if (msg) ctrl.setAttribute("aria-describedby", this.msgEl.id); else ctrl.removeAttribute("aria-describedby");
    }
  }
  CdsQuantityInput.define("cds-quantity-input");
})();
} catch (e) { console.error("[cds] components/quantity-input/quantity-input.js", e); }

/* ==== components/quantity-input/quantity-input.playground.js ==== */
try {
/* Playground — [Beta] Quantity Input */
CDS.register({
  id: "quantity-input", name: "[Beta] Quantity Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=22756-7351",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-quantity-input", { label: "Label", supporting: "Supporting Message", error: "Fora do limite", value: "1", min: "0", max: "10" });
    ctx.preview.appendChild(p);
    var set = function(n, v){ kit.attr(p, n, v); };
    var readout = function(){ ctx.readout(String(p.value), false); };
    p.addEventListener("cds-change", readout);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], hint: "Variante do conjunto: os dois botões sempre iguais.", onChange: function(v){ set("kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]], hint: "Também vira Warning sozinho quando o valor digitado sai da faixa.", onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.section(panel, "Faixa e unidade");
    [["min","Mínimo","0"],["max","Máximo","10"],["step","Passo","1"],["prefix","Prefixo","","ex.: R$"],["suffix","Unidade (sufixo)","","ex.: %"],["decimals","Casas decimais","","ex.: 2"],["value","Value","1"]].forEach(function(t){
      kit.text(panel, { label: t[1], value: t[2], placeholder: t[3], onInput: function(v){ set(t[0], v === "" ? null : v); readout(); } });
    });
    kit.hint(panel, "Digitar fora da faixa não bloqueia; ao sair do campo, ajusta para o limite e anuncia. Setas ↑/↓ mudam pelo passo.");
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Fora do limite"]].forEach(function(t){
      kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ set(t[0], v); } });
    });
    kit.section(panel, "Nested instances");
    var refs = [["Decrement Button","dec","minus-line"],["Increment Button","inc","plus-line"]].map(function(n){
      return kit.nested(panel, { title: n[0] + " · Icon Button", exposed: false, note: "Neutral · Medium · " + n[2] + ". No limite, fica indisponível.",
        props: function(){ var b = p[n[1]]; return b ? [["Kind", b.getAttribute("kind")], ["State", b.hasAttribute("disabled") ? "Disabled" : "Enabled"], ["aria-label", b.getAttribute("label")]] : []; } });
    });
    kit.watch(p, function(){ refs.forEach(function(f){ f(); }); });
    readout();
  }
});
} catch (e) { console.error("[cds] components/quantity-input/quantity-input.playground.js", e); }

/* ==== components/quantity-input/quantity-input.docs.js ==== */
try {
/* Documentação — [Beta] Quantity Input
   Fonte: [CastanhaDS] Component use documentation · seção 6945:5832 · frame [Documentação] Quantity Input (6945:4705)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Oculto no Figma: Composição do componente (tem conteúdo real → entra na Anatomia); Acessibilidade (só placeholder
   "Tópico 1 / Ordem de leitura" → fica de fora, tab com nota); Frame 7 "Casos de exceção" das Diretrizes (lorem ipsum → de fora).
   Prefixo (R$), casas decimais e milhar ("1.250") entraram no componente (C100, aprovado);
   anatomia: 2 vem de cima (como no Figma); 4 embaixo e 6 à direita para não cruzar o + (C100).
   Motion ainda é placeholder no Figma. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["quantity-input"] = {
  tag: "cds-quantity-input",
  base: {},
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6945-5832",
  // Capa (frame [Header] Quantity input do Figma), acima das tabs
  cover: { description: "O Quantity Input é um campo numérico com controles de incremento e decremento.",
    attrs: { label: "Quantidade de ingressos", value: "1", "show-required": false, supporting: "Máximo de 6 ingressos por compra." } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Quantity Input é um campo numérico com controles de incremento e decremento. É utilizado para ajustar valores em passos previsíveis, pelos botões ou por digitação direta. O conteúdo aceita número puro ou acompanhado de unidade, como porcentagem, quantidade ou valor monetário." },
      { h3: "Nomes alternativos comuns" },
      { p: "Number input, numeric stepper, counter, seletor de quantidade, contador." },
      { h3: "Princípios" },
      { cards: [
        ["Previsibilidade", "Cada acionamento altera o valor na mesma medida, e a faixa aceita é conhecida antes da interação."],
        ["Controle compartilhado", "A pessoa usuária ajusta pelos botões quando a variação é pequena e digita quando quer chegar direto ao valor."],
        ["Limite visível", "Ao atingir o mínimo ou o máximo, o controle correspondente fica indisponível, comunicando a fronteira sem recorrer a mensagem de erro."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Quantity Input quando for necessário ajustar um valor numérico dentro de uma faixa conhecida, especialmente quando a pessoa usuária altera poucas unidades por vez e precisa acompanhar o valor atual enquanto ajusta." },
      { h3: "Utilize para:" },
      { ul: ["Quantidade de itens em uma solicitação", "Número de dias, parcelas ou ciclos", "Nível de zoom ou escala", "Ajustes finos em torno de um valor padrão"] },
      { h3: "Não utilize para:" },
      { ul: ["Seleção entre opções pré-definidas (use Select input)", "Saltos grandes dentro de faixas amplas (use Text input)", "Valores apenas de leitura (use Currency)", "Entrada de texto ou códigos (use Text input ou Code input)"] },
      { h3: "Text input vs Quantity Input" },
      { p: "Use o Quantity Input quando o valor varia em passos previsíveis e a pessoa usuária ajusta poucas unidades por vez — especialmente quando acompanhar o valor durante o ajuste faz parte da tarefa. O Text input é indicado para valores numéricos sem faixa definida ou com variação ampla, desde que digitar seja o caminho natural de preenchimento." },
      { compare: [
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Quantidade", "show-required": false, "show-supporting-content": false } },
        { title: "Este é um Quantity Input", attrs: { label: "Quantidade", value: "3", "show-required": false, "show-supporting-content": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Label", value: "1", supporting: "Supporting Message" },
        markers: [
          { n: 1, target: ".cds-tf__label > span:first-child", side: "left" },
          { n: 2, target: ".cds-tf__label > span:last-child", side: "top" },   // Figma: de cima (Down)
          { n: 3, target: ".cds-qty__row > cds-icon-button:first-child", side: "left" },
          { n: 4, target: ".cds-qty__box", side: "bottom", align: "start", long: true }, // Figma: Right; à direita cruzava o +
          { n: 5, target: ".cds-qty__control", side: "bottom" },
          { n: 6, target: ".cds-qty__row > cds-icon-button:last-child", side: "right" },
          { n: 7, target: ".cds-qty__msg", side: "left" }
        ],
        legend: ["Label Content", "Required Asterisk", "Decrement Button", "Text Box", "Quantity Value", "Increment Button", "Supporting Message"]
      } },
      { h2: "Composição do componente" },
      { p: "O controle é formado pelos botões de decremento e incremento e pelo campo de valor, que são obrigatórios. Label, indicação de obrigatório e mensagem de apoio são opcionais e controlados por `Show Label`, `Show Required` e `Show Supporting Content`." },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", values: ["Default", "Ghost"] },
        { name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Active", type: "Boolean" },
        { name: "Show Label", type: "Boolean" },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Show Required", type: "Boolean" },
        { name: "Required Text", type: "Text", values: ["Padrão: (Obrigatório)"] },
        { name: "Quantity Value", type: "Text", values: ["Padrão: 1"] },
        { name: "Show Supporting Content", type: "Boolean" },
        { name: "Supporting Message", type: "Text", values: ["Padrão: Supporting Message"] },
        { name: "Error Message", type: "Text", values: ["Padrão: Error Message"] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Kind: Default", items: [
        { label: "Enabled", attrs: { label: "Label", supporting: "Supporting Message" } },
        { label: "Hovered", attrs: { label: "Label", supporting: "Supporting Message", state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", supporting: "Supporting Message", state: "pressed" } },
        { label: "Disabled", attrs: { label: "Label", supporting: "Supporting Message", disabled: true } }
      ] } },
      { specimens: { title: "Kind: Ghost", items: [
        { label: "Enabled", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message" } },
        { label: "Hovered", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", state: "hovered" } },
        { label: "Pressed", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", state: "pressed" } },
        { label: "Disabled", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Dias de antecedência", value: "15", min: "10", max: "30", "show-required": false, supporting: "Entre 10 e 30 dias" }, title: "Informe a faixa aceita antes do erro",
          text: "Use a mensagem de apoio para comunicar o mínimo e o máximo. Explicar a faixa evita o estranhamento quando o valor digitado é ajustado automaticamente." },
        { attrs: { label: "Quantidade", value: "10", min: "10", "show-required": false, supporting: "Mínimo de 10 unidades" }, title: "Indique o limite pelo controle",
          text: "Ao atingir o mínimo ou o máximo, deixe o controle correspondente indisponível e mantenha o outro ativo." },
        { attrs: [
            { value: "1", "show-label": false, "show-supporting-content": false },
            { value: "2", "show-label": false, "show-supporting-content": false },
            { value: "3", "show-label": false, "show-supporting-content": false }
          ], title: "Mantenha o passo constante",
          text: "O incremento e o decremento alteram o valor sempre na mesma medida. Passo variável quebra a previsibilidade do controle." },
        { attrs: [{ kind: "ghost", value: "100", suffix: "%", "show-label": false, "show-supporting-content": false },
                   { kind: "ghost", value: "5", prefix: "R$", decimals: "2", "show-label": false, "show-supporting-content": false }], title: "Escreva a unidade junto do valor",
          text: "O conteúdo do campo é texto e aceita o número sozinho ou acompanhado de unidade, desde que o caráter seja numérico. A unidade fica no próprio campo, nunca em elemento separado. Siga a formatação da casa: 100%, R$ 5,00, 1.000." },
        { attrs: [
            { value: "2", "show-label": false, "show-supporting-content": false },
            { kind: "ghost", value: "2", "show-label": false, "show-supporting-content": false }
          ], title: "Escolha o Kind pelo contexto",
          text: "Use Default em formulários, onde o preenchimento dos controles reforça a área acionável ao lado do campo. Use Ghost em barras de ferramentas e superfícies densas, onde o preenchimento competiria com os elementos vizinhos." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Dias de antecedência", value: "15", "show-required": false, supporting: "Entre 10 e 30 dias" },
          text: "Informe o mínimo e o máximo na mensagem de apoio." },
        { kind: "dont", attrs: { label: "Dias de antecedência", value: "15", "show-required": false, "show-supporting-content": false },
          text: "Não deixe a pessoa usuária descobrir o limite só quando o valor é corrigido sozinho." }
      ] },
      { h3: "Escolha do componente" },
      { dodont: [
        { kind: "do", attrs: { label: "Quantidade", value: "3", "show-required": false, "show-supporting-content": false },
          text: "Use para ajustes de poucas unidades por vez." },
        { kind: "dont", attrs: { label: "Quantidade", value: "1250", "show-required": false, "show-supporting-content": false },
          text: "Não use quando a pessoa usuária precisa saltar dezenas ou centenas de unidades. Use o Text input." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Quantity Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion tokens por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/quantity-input/quantity-input.docs.js", e); }

/* ==== components/search-input/search-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-search-input> — Search Input · Text Fields · set 14880:3404
 * Lead Icon fixo (search-line). Com valor, mostra o Clear Button (Icon Button · Ghost · Neutral · Small · close-line).
 *
 * Atributos: os da família (sem lead-icon/show-lead-icon: a lupa é fixa) ·
 *   clear-label — nome acessível do Clear Button · padrão "Limpar busca"
 * Eventos: cds-change { value } · cds-clear · cds-search { value } (Enter)
 */
(function(){
  "use strict";
  var el = CDS.TextField.el;
  class CdsSearchInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["clear-label"]); }
    get defaultLeadIcon(){ return "search-line"; }
    get defaultPlaceholder(){ return "Buscar"; }
    get fallbackName(){ return "Buscar"; }
    configureControl(ctrl){
      var self = this;
      ctrl.type = "search"; ctrl.setAttribute("enterkeyhint", "search");
      ctrl.addEventListener("keydown", function(e){
        if (e.key === "Enter") self.dispatchEvent(new CustomEvent("cds-search", { detail: { value: self.value }, bubbles: true }));
        if (e.key === "Escape" && self.value){ e.preventDefault(); self.clear(); }
      });
    }
    buildTrailing(box){
      var self = this, b = this.clearBtn = document.createElement("cds-icon-button");
      b.className = "cds-tf__action";
      b.setAttribute("kind", "ghost"); b.setAttribute("appearance", "neutral"); b.setAttribute("size", "small"); b.setAttribute("icon", "close-line");
      b.addEventListener("click", function(){ self.clear(); });
      box.appendChild(b);
    }
    clear(){
      this._setValue("", true);
      this.dispatchEvent(new CustomEvent("cds-clear", { bubbles: true }));
      this.control.focus();
    }
    updateTrailing(){
      if (!this.clearBtn) return;
      this.clearBtn.hidden = !(this.value && this.flag("show-trailing-item"));
      this.clearBtn.setAttribute("label", this.getAttribute("clear-label") || "Limpar busca");
      if (this.disabled) this.clearBtn.setAttribute("disabled", ""); else this.clearBtn.removeAttribute("disabled");
    }
    update(){ super.update(); if (this.leadEl) this.leadEl.hidden = false; } // a lupa é parte do Search
  }
  CdsSearchInput.define("cds-search-input");
})();
} catch (e) { console.error("[cds] components/search-input/search-input.js", e); }

/* ==== components/search-input/search-input.playground.js ==== */
try {
/* Playground — Search Input */
CDS.register({
  id: "search-input", name: "Search Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14880-3404",
  mount: function(ctx){
    var kit = ctx.kit;
    var p = kit.textField(ctx, {
      tag: "cds-search-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message" },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],["placeholder","Placeholder",""],["value","Value (prefill)",""]],
      nested: function(p){ return [
        { title: "Lead Icon", exposed: false, note: "Fixo: search-line.", props: function(){ return [["Lead Icon", "search-line"]]; } },
        { title: "Clear Button · Icon Button", exposed: false, note: "Ghost · Neutral · Small · close-line. Aparece com valor (Is Filled) e Show Trailing Item; Esc também limpa.",
          props: function(){ var b = p.clearBtn; return [["Visível", String(!!b && !b.hidden)], ["aria-label", b ? b.getAttribute("label") : ""]]; } }
      ]; }
    });
    p.addEventListener("cds-clear", function(){ ctx.readout("busca limpa", false); });
    p.addEventListener("cds-search", function(e){ ctx.readout("buscar: " + e.detail.value, true); });
  }
});
} catch (e) { console.error("[cds] components/search-input/search-input.playground.js", e); }

/* ==== components/text-area/text-area.js ==== */
try {
/**
 * @deps text-field
 * <cds-text-area> — Text Area Input · Text Fields · set 10110:3028
 * Texto longo: Text Box com altura mínima de 72px (pad 8 16) que cresce com o conteúdo. Sem Lead Icon.
 *
 * Atributos: os da família (sem lead-icon) · rows (linhas visíveis mínimas, padrão 2) · max-rows (limite antes de rolar)
 */
(function(){
  "use strict";
  class CdsTextArea extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["rows", "max-rows"]); }
    get controlTag(){ return "textarea"; }
    get hasLeadIcon(){ return false; }
    get fallbackName(){ return "Campo de texto longo"; }
    configureControl(ctrl){ ctrl.rows = 2; }
    update(){
      this.control.rows = parseInt(this.getAttribute("rows"), 10) || 2;
      super.update(); this.grow();
    }
    afterInput(){ this.grow(); super.afterInput(); }
    // Cresce com o conteúdo até max-rows (padrão: sem limite)
    grow(){
      var c = this.control, max = parseInt(this.getAttribute("max-rows"), 10);
      c.style.height = "auto";
      var lh = parseFloat(getComputedStyle(c).lineHeight) || 24, h = c.scrollHeight;
      if (max) h = Math.min(h, lh * max);
      c.style.height = h + "px";
      c.style.overflowY = max && c.scrollHeight > h ? "auto" : "hidden";
    }
  }
  CdsTextArea.define("cds-text-area");
})();
} catch (e) { console.error("[cds] components/text-area/text-area.js", e); }

/* ==== components/text-area/text-area.playground.js ==== */
try {
/* Playground — Text Area Input */
CDS.register({
  id: "text-area", name: "Text Area Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=10110-3028",
  mount: function(ctx){
    ctx.kit.textField(ctx, {
      tag: "cds-text-area",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message", maxlength: "300" },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],
        ["placeholder","Placeholder Content",""],["maxlength","Limite (contador n/max)","300"],["max-rows","Máx. de linhas antes de rolar","","sem limite","O Text Box começa em 72px e cresce com o texto."]]
    });
  }
});
} catch (e) { console.error("[cds] components/text-area/text-area.playground.js", e); }

/* ==== components/text-area/text-area.docs.js ==== */
try {
/* Documentação — Text Area Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 4944:309 · frame [Documentação] Text area (4944:347)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Capa: o [Header] (4944:937) é um mockup mobile (tela Pix Copia e Cola) → imagem em assets/docs/covers/text-area.png.
   Oculto no Figma: Acessibilidade (4944:591) — só placeholder ("Tópico 1" / "Ordem de leitura"), por isso a tab fica com nota.
   Motion ainda é placeholder no Figma (lorem ipsum + "Especificação").
   A doc do Figma usa um set legado (State Default/Hover/Active-focus/Filled, Error…); Propriedades e Estilos seguem o set do código,
   Text Area Input 10110:3028 (decisão do Gustavo, C98).
   Os Do/Don'ts no Figma são imagens (prints de tela); aqui são recriados só com os campos (sem o título "Pagar boleto" da tela). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["text-area"] = {
  tag: "cds-text-area",
  base: { "show-required": false },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=4944-309",
  // Capa (frame [Header] do Figma), acima das tabs
  cover: {
    description: "O Text Area é um campo de entrada multilinha que permite à pessoa usuária digitar textos mais longos, como descrições, observações ou comentários.",
    image: "assets/docs/covers/text-area.png",
    alt: "Tela Pix Copia e Cola com um Text Area para inserir ou colar o código"
  },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Text Area é um campo de entrada multilinha que permite à pessoa usuária digitar textos mais longos, como descrições, observações ou comentários." },
      { h3: "Nomes alternativos comuns" },
      { p: "Textarea, Campo de texto longo, Input text area" },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "Facilita a escrita e leitura de conteúdos extensos."],
        ["Orientação", "Usa label e placeholder para indicar o que deve ser preenchido."],
        ["Feedback", "Oferece suporte visual por texto auxiliar, contador e estado de erro."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Text Area quando for necessário coletar informações abertas e extensas, que não se adequam a campos de uma única linha, garantindo espaço suficiente para leitura, escrita e revisão do conteúdo digitado." },
      { h3: "Utilize para:" },
      { ul: ["Descrições longas.", "Comentários e feedbacks.", "Observações ou justificativas.", "Informações abertas sem limite rígido de palavras."] },
      { h3: "Não utilize para:" },
      { ul: ["Entradas curtas ou objetivas.", "Dados estruturados como datas ou valores.", "Quando um Input de uma linha atende a necessidade."] },
      { h3: "Text Area vs Text input" },
      { p: "O Text input é indicado para textos curtos e objetivos, enquanto o Text Area deve ser usado quando a pessoa usuária precisa escrever conteúdos mais longos, com múltiplas linhas e maior flexibilidade de visualização." },
      { compare: [
        { title: "Este é um Text area", attrs: { label: "Descrição da solicitação", placeholder: "Explique o contexto ou a situação" } },
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Título da solicitação", placeholder: "Digite o título", "show-required": false, "show-lead-icon": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Label", placeholder: "Placeholder", supporting: "Support text", "character-counter": "000/000" },
        markers: [
          { n: 1, target: ".cds-tf__label", side: "left" },
          { n: 2, target: ".cds-tf__control", side: "left" },
          { n: 3, target: ".cds-tf__box", side: "right" },
          { n: 4, target: ".cds-tf__msg", side: "left" },
          { n: 5, target: ".cds-tf__counter", side: "right" }
        ],
        legend: ["Text area label", "Placeholder", "Text area container", "Support text", "Counter"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Filled", type: "Variant", values: ["False", "True"] },
        { name: "Is Active", type: "Variant", values: ["False", "True"] },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Placeholder Content", type: "Text", values: ["Padrão: Placeholder"] },
        { name: "Text Content", type: "Text", values: ["Padrão: Hello"] },
        { name: "Required Text", type: "Text", values: ["Padrão: (Obrigatório)"] },
        { name: "Supporting Message", type: "Text", values: ["Padrão: Supporting Message"] },
        { name: "Error Message", type: "Text", values: ["Padrão: Error Message"] },
        { name: "Character Counter Value", type: "Text", values: ["Padrão: -0000"] },
        { name: "Show Label", type: "Boolean" },
        { name: "Show Required", type: "Boolean" },
        { name: "Show Supporting Content", type: "Boolean" },
        { name: "Show Character Counter", type: "Boolean" },
        { name: "Show Trailing Item", type: "Boolean" },
        { name: "Show Caret", type: "Boolean" }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados", items: [
        { label: "Enabled", attrs: { label: "Label", "show-required": true } },
        { label: "Hovered", attrs: { label: "Label", "show-required": true, state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", "show-required": true, state: "pressed" } },
        { label: "Disabled", attrs: { label: "Label", "show-required": true, disabled: true } }
      ] } },
      { specimens: { title: "Is Active · Is Filled · Appearance", items: [
        { label: "Is Active", attrs: { label: "Label", "show-required": true, "is-active": true } },
        { label: "Is Filled", attrs: { label: "Label", "show-required": true, value: "Hello" } },
        { label: "Warning", attrs: { label: "Label", "show-required": true, value: "Hello", appearance: "warning" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Descrição", "show-required": true, "required-text": "(obrigatório)", placeholder: "Digite uma descrição do plano" }, title: "Uso de label e suporte",
          text: "Sempre utilize label clara e objetiva acima do campo e, quando necessário, complemente com texto de suporte para orientar o preenchimento, indicar limites ou explicar o conteúdo esperado." },
        { attrs: { label: "Descrição", value: "Grupo para empresas de São Paulo", maxlength: "255" }, title: "Contador de caracteres",
          text: "Utilize o contador quando houver limite máximo de caracteres, ajudando a pessoa usuária a acompanhar o quanto ainda pode ser digitado e evitando frustrações no envio." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { value: "237933.8128600392.7681589000.0633 0898380000000200" },
          text: "Use o Text Area para textos extensos que exigem múltiplas linhas e facilitam a visualização, leitura e edição do conteúdo pela pessoa usuária." },
        { kind: "dont", attrs: [
            { _tag: "cds-text-input", label: "Nome", "required-text": "(obrigatório)", placeholder: "Digite o nome", "show-lead-icon": false },
            { _tag: "cds-text-input", label: "Descrição", "required-text": "(obrigatório)", placeholder: "Descreva em detalhes o plano a ser seguido", "show-lead-icon": false }
          ],
          text: "Não use Input Text para textos longos ou descritivos, pois ele limita a visualização do conteúdo e dificulta a revisão do que foi digitado." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Text Area no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/text-area/text-area.docs.js", e); }

/* ==== components/text-input/text-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-text-input> — Text Input · Text Fields · set 5743:325
 * Campo de texto da família. Usa o .Text Content Mask (10155:1525) para máscaras de formato.
 *
 * Atributos: os da família (CDS.TextField) +
 *   mask  text | cpf | cnpj | cnpj-new | telefone | celular | cep | date | currency · padrão text
 *         (Mask do .Text Content Mask; o valor guardado é só o dado, sem pontuação)
 *   type  text | email | url | tel · padrão text (só sem máscara)
 */
(function(){
  "use strict";
  class CdsTextInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["mask", "type"]); }
    get mask(){ return CDS.TextField.masks[this.getAttribute("mask")] || null; }
    get fallbackName(){ return "Campo de texto"; }
    update(){
      var t = this.getAttribute("type");
      this.control.type = !this.mask && /^(email|url|tel)$/.test(t) ? t : "text";
      super.update();
    }
    attributeChangedCallback(name){
      if (name === "mask") this._value = null; // troca de máscara: relê o valor pelo novo formato
      super.attributeChangedCallback(name);
    }
  }
  CdsTextInput.define("cds-text-input");
})();
} catch (e) { console.error("[cds] components/text-input/text-input.js", e); }

/* ==== components/text-input/text-input.playground.js ==== */
try {
/* Playground — Text Input */
CDS.register({
  id: "text-input", name: "Text Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5743-325",
  mount: function(ctx){
    var kit = ctx.kit;
    kit.textField(ctx, {
      tag: "cds-text-input",
      attrs: { label: "Label", supporting: "Supporting Message", error: "Error Message", maxlength: "100" },
      variants: function(panel, p, set){
        kit.select(panel, { label: "Mask (.Text Content Mask)", value: "text",
          options: [["text","Text"],["cpf","CPF"],["cnpj","CNPJ"],["cnpj-new","CNPJ New"],["telefone","Telefone"],["celular","Celular"],["cep","CEP"],["date","Date"],["currency","Currency"]],
          hint: "O valor guardado é só o dado; a pontuação vem da máscara. Currency digita da direita (centavos).",
          onChange: function(v){ set("mask", v === "text" ? null : v); } });
      },
      booleans: [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"]],
      texts: [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Error Message"],
        ["placeholder","Placeholder","",""],["maxlength","Limite (contador n/max)","100","","Com limite, o Character Counter mostra n/max."],["value","Value (prefill)",""]],
      leadIcon: "placeholder-line",
      nested: function(p){ return [
        { title: ".Text Content Mask", exposed: true, note: "Building block compartilhado da família. <code>Mask</code> define o formato e o placeholder.",
          props: function(){ return [["Mask", p.getAttribute("mask") || "text"], ["Placeholder", p.input ? p.input.placeholder : ""], ["Is Filled", String(!!p.value)]]; } },
        { title: "Lead Icon", exposed: true, note: "Instance swap (16×16).", props: function(){ return [["Show Lead Icon", String(!(p.leadEl && p.leadEl.hidden))], ["Lead Icon", p.getAttribute("lead-icon") || "placeholder-line"]]; } },
        { title: "Trailing Icon", exposed: false, note: "warning-line, só no Warning (Show Trailing Item).", props: function(){ return [["Visível", String(!(p.warnEl && p.warnEl.hidden))]]; } }
      ]; }
    });
  }
});
} catch (e) { console.error("[cds] components/text-input/text-input.playground.js", e); }

/* ==== components/text-input/text-input.docs.js ==== */
try {
/* Documentação — Text Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 5308:2266 · frame [Documentação] Text input (5308:2304)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Capa = mockup com imagem do frame [Header] Text input (5308:2902).
   Oculto no Figma: Acessibilidade (5308:2548), só com placeholder ("Tópico 1" / "Ordem de leitura") → tab com nota de sem conteúdo.
   Clear Button (prop "Show clear button" e item 5 da anatomia) é legado da doc: a lib atual (5743:325) não tem; ignorado (C96).
   Gaps: Required Asterisk
   e o Required vira "*" via required-text. Diretrizes e Do/Don't no Figma são imagens de mockup: aqui são recriados com o componente.
   Motion ainda é placeholder (lorem ipsum / "Especificação"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["text-input"] = {
  tag: "cds-text-input",
  base: { label: "Label", "required-text": "*", supporting: "Supporting Message", "character-counter": "-0000" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=5308-2266",
  // Capa (frame [Header] do Figma): mockup de produto, imagem exportada à parte
  cover: {
    description: "O Text Input é um campo de entrada para coleta de informações textuais curtas fornecidas pela pessoa usuária.",
    image: "assets/docs/covers/text-input.png",
    alt: "Tela de produto com um formulário usando Text Input"
  },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Text Input é um campo de entrada para coleta de informações textuais curtas fornecidas pela pessoa usuária. É utilizado para capturar qualquer informação digitável em linha única." },
      { h3: "Nomes alternativos comuns" },
      { p: "Campo de texto, campo de entrada, input de texto." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "O campo deve comunicar de forma objetiva o que se espera que a pessoa usuária insira, por meio de label, placeholder e mensagens auxiliares consistentes."],
        ["Previsibilidade", "O comportamento deve seguir padrões conhecidos de interação (foco, erro, sucesso, desabilitado), reduzindo esforço cognitivo e evitando surpresas."],
        ["Feedback imediato", "Validações, erros e estados devem ser apresentados de forma contextual e no momento adequado, apoiando a pessoa usuária na conclusão da tarefa."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Text Input quando for necessário coletar uma informação textual curta e específica em um formulário ou fluxo, especialmente quando a pessoa usuária precisa digitar manualmente o conteúdo e não há uma lista pré-definida de opções que possa ser apresentada por meio de seleção." },
      { h3: "Utilize para:" },
      { ul: ["Inserção de nome, sobrenome ou apelido", "E-mail", "CPF, CNPJ ou outros identificadores", "Código promocional", "Informações curtas de identificação"] },
      { h3: "Não utilize para:" },
      { ul: ["Seleção entre opções pré-definidas (use Select input ou Selection List)", "Respostas longas e descritivas (use Text Area)", "Escolhas múltiplas com visualização de alternativas simultâneas", "Filtros rápidos de navegação"] },
      { h3: "Text Area vs Text input" },
      { p: "O Text input é indicado para textos curtos e objetivos, enquanto o Text Area deve ser usado quando a pessoa usuária precisa escrever conteúdos mais longos, com múltiplas linhas e maior flexibilidade de visualização." },
      { compare: [
        { title: "Este é um Text area", attrs: { _tag: "cds-text-area", label: "Descrição da solicitação", placeholder: "Explique o contexto ou a situação",
            "show-required": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Text input", attrs: { label: "Título da solicitação", placeholder: "Digite o título",
            "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { value: "Hello" },
        markers: [
          { n: 1, target: ".cds-tf__label > span:first-child", side: "left" },
          { n: 2, target: ".cds-tf__req", side: "top" },        // Figma: seta de cima (Down)
          { n: 3, target: ".cds-tf__lead", side: "left" },
          { n: 4, target: ".cds-tf__control", side: "right" },  // Figma: seta de cima (Down)
          { n: 5, target: ".cds-tf__msg", side: "left" },       // Figma: 6
          { n: 6, target: ".cds-tf__counter", side: "bottom" }  // Figma: 7
        ],
        legend: ["Label Content", "Required Asterisk", "Lead Icon", "Text Content", "Supporting Message", "Character Counter"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Style", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is filled", type: "Boolean" },
        { name: "Is active", type: "Boolean" },
        { name: "Show label content", type: "Boolean" },
        { name: "Label content", type: "Text", values: ["Padrão: Label"] },
        { name: "Show required asterisk", type: "Boolean" },
        { name: "Show lead icon", type: "Boolean" },
        { name: "Text content", type: "Text", values: ["Padrão: Hello"] },
        { name: "Show supporting message", type: "Boolean" },
        { name: "Supporting message", type: "Text", values: ["Padrão: Supporting message"] },
        { name: "Show character counter", type: "Boolean" },
        { name: "Character counter value", type: "Text", values: ["Padrão: -0000"] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Kind · Accent", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } },
        { label: "Is filled", attrs: { value: "Hello" } },
        { label: "Is active", attrs: { "is-active": true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Titular da conta", placeholder: "Insira o nome completo do titular", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Escreva labels claras e específicas",
          text: "Prefira labels objetivas que descrevam exatamente o dado esperado, evitando termos genéricos como “Informação” ou “Digite aqui”." },
        { attrs: { label: "Insira o CPF ou CNPJ", placeholder: "000.000.000-00", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Evite depender apenas de placeholder",
          text: "O placeholder não substitui o label. Ele deve complementar a orientação, oferecendo exemplo de formato quando necessário." },
        { attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Insira um formato de chave válido.", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          title: "Valide no momento certo",
          text: "Apresente mensagens de erro de forma contextual, preferencialmente após interação da pessoa usuária, evitando bloquear a digitação prematuramente." },
        { attrs: { label: "CPF", mask: "cpf", value: "12345678910", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Defina tipo e máscara corretamente",
          text: "Sempre que possível, utilize o tipo apropriado (ex: e-mail, número) e máscaras coerentes para reduzir erros e facilitar o preenchimento." }
      ] },
      { note: "No Figma, os exemplos das diretrizes e dos Do's and Don'ts são imagens de tela; aqui são o Text Input real com os mesmos textos (sem o título da tela)." },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Insira um formato de chave válido.", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Sempre forneça mensagem de erro específica" },
        { kind: "dont", attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Campo inválido", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Não exiba erro genérico como “Campo inválido” sem contexto" }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Text Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\" para Easing e Duration de Enabled, Hovered, Pressed e Loading). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
} catch (e) { console.error("[cds] components/text-input/text-input.docs.js", e); }

/* ==== components/toast/toast.js ==== */
try {
/**
 * @deps icon close-toast
 * <cds-toast> — Toast · Feedback · set 5234:516
 * Mensagem curta sobre Surface/inversed. Desktop: ícone · texto · .Close Toast em linha. Mobile (Viewport):
 * ícone e fechar no topo, texto embaixo.
 *
 * Atributos: appearance (positive|warning) · text (Text Description, até 2 linhas) · show-trailing-item (.Close Toast)
 *   close-label · viewport (desktop|tablet|mobile — força o modo)
 * Eventos: cds-close (cancelável). Sem preventDefault(), o toast se remove do DOM.
 * A11y: role="status" (Positive) ou role="alert" (Warning).
 */
(function(){
  "use strict";
  var ICON = { positive: "positive-line", warning: "warning-line" };
  class CdsToast extends CDS.Element {
    static get observedAttributes(){ return ["appearance", "text", "show-trailing-item", "close-label"]; }
    get appearance(){ return this.getAttribute("appearance") === "warning" ? "warning" : "positive"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.iconWrap = this.appendChild(CDS.create("span", null, "cds-toast__icon"));
        this.iconEl = this.iconWrap.appendChild(CDS.create("span", { "aria-hidden": "true" }, "cds-icon"));
        this.textEl = this.appendChild(CDS.create("p", null, "cds-toast__text"));
        this.closeEl = this.appendChild(CDS.create("cds-close-toast"));
        this.closeEl.addEventListener("click", function(){ self.close(); });
      }
      this.setAttribute("role", this.appearance === "warning" ? "alert" : "status");
      this.iconEl.className = "cds-icon cds-icon--" + ICON[this.appearance];
      this.textEl.textContent = this.text("text", "A descrição web ou mobile deve ter no máximo 2 linhas");
      this.closeEl.hidden = !this.flag("show-trailing-item");
      this.closeEl.setAttribute("label", this.getAttribute("close-label") || "Fechar mensagem");
    }
    close(){
      var ev = new CustomEvent("cds-close", { bubbles: true, cancelable: true });
      if (this.dispatchEvent(ev)) this.remove();
    }
  }
  CdsToast.define("cds-toast");
})();
} catch (e) { console.error("[cds] components/toast/toast.js", e); }

/* ==== components/toast/toast.playground.js ==== */
try {
/* Playground — Toast */
CDS.register({
  id: "toast", name: "Toast", category: "Feedback", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5234-516",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p;
    var attrs = { text: "A descrição web ou mobile deve ter no máximo 2 linhas" };
    function make(){ p = kit.el("cds-toast", attrs); p.addEventListener("cds-close", function(){ ctx.readout("fechado — clique em Mostrar de novo", false); }); ctx.preview.innerHTML = ""; ctx.preview.appendChild(p); }
    function set(k, v){ if (v == null) delete attrs[k]; else attrs[k] = v; kit.attr(p, k, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"]], hint: "Positive usa role=status; Warning usa role=alert.", onChange: function(v){ set("appearance", v === "positive" ? null : v); } });
    kit.hint(panel, "Use o seletor de Viewport (360) para ver o layout mobile do Figma.");
    kit.button(panel, { label: "Mostrar de novo", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Trailing Item", checked: true, onChange: function(on){ set("show-trailing-item", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Description", value: attrs.text, hint: "Até 2 linhas; o excedente é cortado.", onInput: function(v){ set("text", v); } });
    kit.section(panel, "Nested instances");
    var ref = kit.nested(panel, { title: ".Close Toast", exposed: true, note: "Building block. Clique fecha (cds-close, cancelável).", props: function(){ var c = p && p.closeEl; return c ? [["Show", String(!c.hidden)], ["State", c.hasAttribute("disabled") ? "Disabled" : "Enabled"]] : []; } });
    make(); kit.watch(ctx.preview, ref);
  }
});
} catch (e) { console.error("[cds] components/toast/toast.playground.js", e); }

/* ==== components/tooltip/tooltip.js ==== */
try {
/**
 * @deps —
 * <cds-tooltip> — Tooltip · Tooltips · componente 11211:416
 * Caixa flutuante com informação sobre algum aspecto da interface (description do Figma).
 * Surface/inversed · raio extra-small · Elevation/level 2 · Label (Caption/Bold) + conteúdo (Caption/Regular) · máx. 240.
 *
 * Atributos: label (Text Label) · text (Text Content) · show-label
 *   for — id do elemento que dispara: o tooltip aparece no hover e no foco dele, some com Esc e ao sair.
 *         Sem for, fica sempre visível (specimen).
 *   placement — top | bottom (padrão top)
 * A11y: role="tooltip"; o gatilho recebe aria-describedby. Gatilho composto (ex.: <cds-icon-button>, que tem um
 *   <button> dentro): a descrição vai para o primeiro elemento focável dentro dele, que é o que o leitor de tela lê.
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsTooltip extends CDS.Element {
    static get observedAttributes(){ return ["label", "text", "show-label", "for", "placement"]; }
    render(){
      if (!this.id) this.id = "cds-tooltip-" + (++uid);
      this.setAttribute("role", "tooltip");
      this.innerHTML = "";
      if (this.flag("show-label")) this.appendChild(CDS.create("p", null, "cds-tooltip__label")).textContent = this.text("label", "Label");
      this.appendChild(CDS.create("p", null, "cds-tooltip__text")).textContent = this.text("text", "Find out how this Caju product can benefit your business today.");
      this.bind();
    }
    bind(){
      var self = this, id = this.getAttribute("for");
      if (this._trigger && this._trigger.id !== id) this.unbind();
      if (!id){ this.classList.remove("is-floating"); this.hidden = false; return; }
      var t = document.getElementById(id); if (!t || t === this._trigger) return;
      this._trigger = t; this.classList.add("is-floating"); this.hidden = true;
      var FOCUSABLE = "button, a[href], input, select, textarea, [tabindex]", tipId = this.id;
      var describe = function(){
        var d = t.matches(FOCUSABLE) ? t : (t.querySelector(FOCUSABLE) || t);
        var desc = (d.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
        if (desc.indexOf(tipId) < 0){ desc.push(tipId); d.setAttribute("aria-describedby", desc.join(" ")); }
      };
      // gatilho ainda não definido (custom element registrado depois): descreve o focável interno quando ele existir
      if (t.localName.indexOf("-") > 0 && !customElements.get(t.localName)) customElements.whenDefined(t.localName).then(describe);
      else describe();
      var show = function(){ self.show(); }, hide = function(){ self.hidden = true; };
      var esc = function(e){ if (e.key === "Escape") hide(); };
      this._off = function(){ ["mouseenter","focusin"].forEach(function(e){ t.removeEventListener(e, show); }); ["mouseleave","focusout"].forEach(function(e){ t.removeEventListener(e, hide); }); t.removeEventListener("keydown", esc); };
      ["mouseenter","focusin"].forEach(function(e){ t.addEventListener(e, show); });
      ["mouseleave","focusout"].forEach(function(e){ t.addEventListener(e, hide); });
      t.addEventListener("keydown", esc);
    }
    unbind(){ if (this._off) this._off(); this._trigger = null; }
    disconnectedCallback(){ this.unbind(); }
    show(){
      var t = this._trigger; if (!t) return;
      this.hidden = false;
      CDS.position(t, this, { placement: this.getAttribute("placement") === "bottom" ? "bottom" : "top" });
    }
  }
  CdsTooltip.define("cds-tooltip");
})();
} catch (e) { console.error("[cds] components/tooltip/tooltip.js", e); }

/* ==== components/tooltip/tooltip.playground.js ==== */
try {
/* Playground — Tooltip */
CDS.register({
  id: "tooltip", name: "Tooltip", category: "Tooltips", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11211-416",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var wrap = kit.el("div", { style: "display:flex;flex-direction:column;align-items:center;gap:var(--common-sizes-32)" });
    var p = kit.el("cds-tooltip", {}); wrap.appendChild(p);
    var trig = kit.el("cds-icon-button", { id: "pg-tooltip-trigger", kind: "ghost", appearance: "neutral", icon: "support-line", label: "Ajuda" });
    var t2 = kit.el("cds-tooltip", { for: "pg-tooltip-trigger", label: "Ajuda", text: "Passe o mouse ou foque o botão; Esc fecha." });
    wrap.appendChild(trig); wrap.appendChild(t2); ctx.preview.appendChild(wrap);
    function both(k, v){ [p, t2].forEach(function(x){ kit.attr(x, k, v); }); }
    kit.hint(panel, "Em cima, o specimen fixo. Embaixo, o comportamento: o tooltip aparece no hover e no foco do gatilho (atributo <code>for</code>).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Label", checked: true, onChange: function(on){ both("show-label", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Content", value: "Find out how this Caju product can benefit your business today.", onInput: function(v){ p.setAttribute("text", v); } });
  }
});
} catch (e) { console.error("[cds] components/tooltip/tooltip.playground.js", e); }

/* ==== components/topic/topic.js ==== */
try {
/**
 * @deps lead-item
 * <cds-topic> — Topic · Content · set 15621:1175
 * .Lead item (Shaped Icon ou Image) + Title (Heading/Small) + Description (Body/Regular).
 * Atributos: orientation (horizontal|vertical) · title · description · show-lead-item · show-title
 *   lead-kind (shaped-icon|image) · lead-icon · lead-src · lead-alt  (repassados ao .Lead item)
 */
(function(){
  "use strict";
  class CdsTopic extends CDS.Element {
    static get observedAttributes(){ return ["orientation", "title", "description", "show-lead-item", "show-title", "lead-kind", "lead-icon", "lead-src", "lead-alt"]; }
    render(){
      this.innerHTML = "";
      if (this.flag("show-lead-item")){
        var attrs = { kind: this.getAttribute("lead-kind") || "shaped-icon" };
        if (this.getAttribute("lead-icon")) attrs.icon = this.getAttribute("lead-icon");
        if (this.getAttribute("lead-src")) attrs.src = this.getAttribute("lead-src");
        if (this.getAttribute("lead-alt") != null) attrs.alt = this.getAttribute("lead-alt");
        this.leadEl = this.appendChild(CDS.create("cds-lead-item", attrs));
      } else this.leadEl = null;
      var tc = this.appendChild(CDS.create("div", null, "cds-topic__text"));
      if (this.flag("show-title")) tc.appendChild(CDS.create("p", null, "cds-topic__title")).textContent = this.text("title", "Title");
      tc.appendChild(CDS.create("p", null, "cds-topic__desc")).textContent = this.text("description", "Lorem Ipsum is simply dummy of the printing and typesetting industry lorem Ipsum has been.");
    }
  }
  CdsTopic.define("cds-topic");
})();
} catch (e) { console.error("[cds] components/topic/topic.js", e); }

/* ==== components/topic/topic.playground.js ==== */
try {
/* Playground — Topic */
CDS.register({
  id: "topic", name: "Topic", category: "Content", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15621-1175",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-topic", { "lead-src": "assets/brand/sample-photo.svg" }); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Orientation", value: "horizontal", options: [["horizontal","Horizontal"],["vertical","Vertical"]], onChange: function(v){ kit.attr(p, "orientation", v === "horizontal" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead item"],["show-title","Show Title"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Title", onInput: function(v){ p.setAttribute("title", v); } });
    kit.text(panel, { label: "Text Description", value: "Lorem Ipsum is simply dummy of the printing and typesetting industry lorem Ipsum has been.", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Nested instances");
    kit.seg(panel, { label: ".Lead item · Kind", value: "shaped-icon", options: [["shaped-icon","Shaped Icon"],["image","Image"]], onChange: function(v){ kit.attr(p, "lead-kind", v === "shaped-icon" ? null : v); } });
    kit.iconSwap(panel, { label: ".Lead item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/topic/topic.playground.js", e); }

/* ==== components/trailing-item/trailing-item.js ==== */
try {
/**
 * @deps checkbox radio-button switch icon tag
 * <cds-trailing-item> — .Trailing Item · .Building Blocks · set 5488:647
 * Item à direita das listas. 48×48 (Tag: tamanho do Tag).
 * Atributos: kind (checkbox|radio-button|switch|icon|tag · padrão checkbox, como no Figma)
 *   status (selected|unselected — controles) · disabled · icon (Kind=Icon · padrão placeholder-line, Accent, Large)
 *   tag-label ("Tag") · tag-appearance (neutral) · name · value
 * O controle de seleção é o nativo do Checkbox/Radio/Switch, sem rótulo visível (Show Text Label = false).
 * propriedade .control — o componente interno (cds-checkbox…) · .input — o <input> nativo
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: "cds-checkbox", "radio-button": "cds-radio-button", "switch": "cds-switch" };
  class CdsTrailingItem extends CDS.Element {
    static get observedAttributes(){ return ["kind", "status", "disabled", "icon", "tag-label", "tag-appearance", "name", "value"]; }
    get kind(){ var k = this.getAttribute("kind"); return CONTROLS[k] || k === "icon" || k === "tag" ? k : "checkbox"; }
    get isControl(){ return !!CONTROLS[this.kind]; }
    get input(){ return this.control && this.control.input; }
    render(){
      var k = this.kind;
      if (this._kind !== k){
        this._kind = k; this.innerHTML = "";
        if (CONTROLS[k]) this.control = this.appendChild(CDS.create(CONTROLS[k], { "show-text-label": "false" }));
        else if (k === "icon") this.control = this.appendChild(CDS.create("cds-icon", { size: "large", appearance: "accent", "aria-hidden": "true" }));
        else this.control = this.appendChild(CDS.create("cds-tag", {}));
      }
      var c = this.control, self = this;
      if (CONTROLS[k]){
        CDS.attr(c, "status", this.getAttribute("status") === "selected" ? "selected" : "unselected");
        if (this.hasAttribute("disabled")) CDS.attr(c, "disabled", ""); else c.removeAttribute("disabled");
        ["name", "value"].forEach(function(a){ if (self.hasAttribute(a)) CDS.attr(c, a, self.getAttribute(a)); else c.removeAttribute(a); });
      } else if (k === "icon") CDS.attr(c, "icon", this.getAttribute("icon") || "placeholder-line");
      else { CDS.attr(c, "label", this.text("tag-label", "Tag")); CDS.attr(c, "appearance", this.getAttribute("tag-appearance") || "neutral"); }
    }
  }
  CdsTrailingItem.define("cds-trailing-item");
})();
} catch (e) { console.error("[cds] components/trailing-item/trailing-item.js", e); }

/* ==== components/trailing-item/trailing-item.playground.js ==== */
try {
/* Playground — .Trailing Item (building block) */
CDS.register({
  id: "trailing-item", name: ".Trailing Item", category: "Lists", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-647",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-trailing-item", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Usado no Selection List Item e no Content List Item. O controle aparece sem rótulo (Show Text Label = false); o nome vem da linha.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "checkbox", options: [["checkbox","Checkbox"],["radio-button","Radio"],["switch","Switch"],["icon","Icon"],["tag","Tag"]], onChange: function(v){ p.setAttribute("kind", v); } });
  }
});
} catch (e) { console.error("[cds] components/trailing-item/trailing-item.playground.js", e); }

/* ==== components/content-list-item/content-list-item.js ==== */
try {
/**
 * @deps list-item trailing-item tag icon shaped-icon currency-content
 * <cds-content-list-item> — Content List Item · Lists · set 5488:675 (20 variantes)
 * Kind (Default|Card) × Intent × State.
 *   Intent=Default:     .Lead Item + .Text Content + .Trailing Item (padrão Checkbox)
 *   Intent=Navigation:  .Lead Item + .Text Content + Tag (Warning) + navigation-right-line
 *   Intent=Transaction: Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line
 * Container: Kind=Default pad 8 4 · Kind=Card pad 16 16 16 24 (como no Figma, C41).
 *
 * Atributos: os de CDS.ListItem · intent · show-trailing-item · show-navigation-indicator · show-tag
 *   trailing-item (kind do .Trailing Item · checkbox) · status (do controle) · tag-label ("Tag") · tag-appearance (warning)
 *   shaped-icon (placeholder-line) · value ("30.000,00") · symbol ("R$") · show-negative-symbol · value-description
 *   href — a linha vira <a>
 * A linha é <a> com href, <div> que repassa o clique ao controle (Intent=Default com controle), senão <button>.
 * Eventos: cds-change { status } (controle) · click
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: 1, "radio-button": 1, "switch": 1 };
  class CdsContentListItem extends CDS.ListItem {
    static get observedAttributes(){ return CDS.ListItem.observedAttributes.concat(["intent","show-trailing-item","show-navigation-indicator","show-tag","trailing-item","status","tag-label","tag-appearance","shaped-icon","value","symbol","show-negative-symbol","value-description"]); }
    get intent(){ var i = this.getAttribute("intent"); return i === "navigation" || i === "transaction" ? i : "default"; }
    get trailingKind(){ var k = (this.getAttribute("trailing-item") || "checkbox").toLowerCase(); return k === "chechbox" ? "checkbox" : k; }
    get hasControl(){ return this.intent === "default" && this.flag("show-trailing-item") && !!CONTROLS[this.trailingKind]; }
    get rowMode(){ return this.hasAttribute("href") ? "link" : this.hasControl ? "control" : "button"; }
    get controlInput(){ return this.trailEl && this.trailEl.input; }
    get defaultLeadKind(){ return "icon"; }
    buildItems(items, c){
      this.shapedEl = CDS.create("cds-shaped-icon", { size: "small", appearance: "neutral" }, "cds-li__shaped");
      c.insertBefore(this.shapedEl, this.leadEl.nextSibling);
      this.currencyEl = items.appendChild(CDS.create("cds-currency-content", null, "cds-li__currency"));
      this.trailEl = c.appendChild(CDS.create("cds-trailing-item", null, "cds-li__trail"));
      this.tagEl = c.appendChild(CDS.create("cds-tag", null, "cds-li__tag"));
      this.navEl = c.appendChild(CDS.create("cds-icon", { icon: "navigation-right-line", size: "medium", appearance: "neutral", "aria-hidden": "true" }, "cds-li__nav"));
      var self = this;
      this.trailEl.addEventListener("cds-change", function(e){ e.stopPropagation(); CDS.attr(self, "status", e.detail.status); self.dispatchEvent(new CustomEvent("cds-change", { detail: { status: e.detail.status }, bubbles: true })); });
    }
    updateItems(){
      var i = this.intent, self = this;
      this.leadEl.hidden = i === "transaction" || !this.flag("show-lead-item");
      this.shapedEl.hidden = i !== "transaction" || !this.flag("show-lead-item");
      CDS.attr(this.shapedEl, "icon", this.getAttribute("shaped-icon") || "placeholder-line");
      this.currencyEl.hidden = i !== "transaction";
      if (i === "transaction"){
        var cc = this.currencyEl;
        CDS.attr(cc, "value", this.text("value", "30.000,00")); CDS.attr(cc, "symbol", this.text("symbol", "R$"));
        CDS.attr(cc, "show-negative-symbol", String(this.flag("show-negative-symbol")));
        CDS.attr(cc, "description", this.text("value-description", "Description"));
      }
      var t = this.trailEl;
      t.hidden = i !== "default" || !this.flag("show-trailing-item");
      CDS.attr(t, "status", this.getAttribute("status") === "selected" ? "selected" : "unselected"); CDS.attr(t, "kind", this.trailingKind);
      if (this.hasAttribute("disabled")) CDS.attr(t, "disabled", ""); else t.removeAttribute("disabled");
      t.toggleAttribute("inert", this.optionMode);
      this.tagEl.hidden = i !== "navigation" || !this.flag("show-tag");
      CDS.attr(this.tagEl, "label", this.text("tag-label", "Tag")); CDS.attr(this.tagEl, "appearance", this.getAttribute("tag-appearance") || "warning");
      this.navEl.hidden = i === "default" || !this.flag("show-navigation-indicator");
      var input = this.controlInput; if (this._mode === "control" && input){ CDS.attr(input, "aria-labelledby", this.textEl.id); input.removeAttribute("aria-label"); }
    }
  }
  CdsContentListItem.define("cds-content-list-item");
})();
} catch (e) { console.error("[cds] components/content-list-item/content-list-item.js", e); }

/* ==== components/content-list-item/content-list-item.playground.js ==== */
try {
/* Playground — Content List Item */
CDS.register({
  id: "content-list-item", name: "Content List Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-675",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-content-list-item", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("click", false); });
    kit.hint(panel, "Com <code>href</code> a linha vira link; no Intent=Default com controle, a linha aciona o controle; nos outros, é um botão.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Intent", value: "default", options: [["default","Default"],["navigation","Navigation"],["transaction","Transaction"]], onChange: function(v){ kit.attr(p, "intent", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-trailing-item","Show Trailing Item (Default)"],["show-divider","Show Divider"],["show-navigation-indicator","Show Navigation Indicator"],["show-tag","Show Tag (Navigation)"],["show-description","Show Description (.Text Content)"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
    kit.text(panel, { label: "Value (Transaction)", value: "30.000,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.section(panel, "Instance swap");
    kit.select(panel, { label: ".Trailing Item · Kind", value: "checkbox", options: [["checkbox","Checkbox"],["radio-button","Radio Button"],["switch","Switch"],["icon","Icon"],["tag","Tag"]], onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); p.setAttribute("shaped-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/content-list-item/content-list-item.playground.js", e); }

/* ==== components/content-list/content-list.js ==== */
try {
/**
 * @deps content-list-item
 * <cds-content-list> — Content List · Lists · set 5488:1482 (Kind × Intent)
 * Pilha de Content List Items. Kind=Default: sem gap, itens com Show Divider desligado · Kind=Card: gap 8.
 * Intent da lista → Intent dos itens: Default → Default (Show Trailing Item desligado) · Navigation → Navigation ·
 *   Switch → Transaction (como no Figma, C54).
 * Uso: filhos <cds-content-list-item> (a lista repassa kind e intent) ou nada (amostra: 12 itens).
 * Atributos: kind (default|card) · intent (default|switch|navigation) · label (nome da lista) · count (itens da amostra · 12)
 */
(function(){
  "use strict";
  var INTENT = { "default": "default", "navigation": "navigation", "switch": "transaction" };
  class CdsContentList extends CDS.Element {
    static get observedAttributes(){ return ["kind", "intent", "label", "count"]; }
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
        while (this.items.length > n) this.lastElementChild.remove();
      }
      CDS.attr(this, "aria-label", this.getAttribute("label"));
      this.items.forEach(function(c){
        CDS.attr(c, "role", "listitem");
        CDS.attr(c, "kind", kind === "card" ? "card" : null);
        CDS.attr(c, "intent", it === "default" ? null : it);
        CDS.attr(c, "show-divider", kind === "card" ? null : "false");  // como nas instâncias do Figma
        if (it === "default") CDS.attr(c, "show-trailing-item", "false");
      });
    }
  }
  CdsContentList.define("cds-content-list");
})();
} catch (e) { console.error("[cds] components/content-list/content-list.js", e); }

/* ==== components/content-list/content-list.playground.js ==== */
try {
/* Playground — Content List */
CDS.register({
  id: "content-list", name: "Content List", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-1482",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-content-list", { label: "Lista de conteúdo" }); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra com 12 itens, como no Figma. No código, os filhos <code>&lt;cds-content-list-item&gt;</code> recebem Kind e Intent da lista.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Intent", value: "default", options: [["default","Default"],["switch","Switch"],["navigation","Navigation"]], hint: "No Figma, Intent=Switch usa itens Intent=Transaction (C54).", onChange: function(v){ kit.attr(p, "intent", v === "default" ? null : v); } });
    kit.range(panel, { label: "Itens (amostra)", min: 1, max: 12, value: 12, onInput: function(v){ p.setAttribute("count", v); } });
  }
});
} catch (e) { console.error("[cds] components/content-list/content-list.playground.js", e); }

/* ==== components/selection-list-item/selection-list-item.js ==== */
try {
/**
 * @deps list-item trailing-item
 * <cds-selection-list-item> — Selection List Item · Lists · set 5488:812 (96 variantes)
 * Item selecionável: Kind (Default|Card) × State × Is Active × Trailing Item (Checkbox|Radio Button|Switch|Tag|Icon|None).
 * Is Active=True: fundo Accent/Solid/soft (Card: stroke Accent/Solid/semi-soft) e o controle do trailing Selected.
 *
 * Atributos: os de CDS.ListItem · is-active · trailing-item (chechbox|checkbox|radio-button|switch|tag|icon|none ·
 *   padrão checkbox; o Figma escreve "Chechbox", C25) · trailing-icon · tag-label · name · value
 * Comportamento: Checkbox/Switch/None/Tag/Icon alternam Is Active no clique; Radio Button seleciona e desmarca
 *   os irmãos com o mesmo name. Com Checkbox/Radio/Switch o foco é o controle nativo, com o nome do Label;
 *   sem controle, a linha é um <button aria-pressed>.
 * Evento: cds-change { active }
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: 1, "radio-button": 1, "switch": 1 };
  class CdsSelectionListItem extends CDS.ListItem {
    static get observedAttributes(){ return CDS.ListItem.observedAttributes.concat(["trailing-item","trailing-icon","tag-label","name","value"]); }
    get trailingKind(){ var k = (this.getAttribute("trailing-item") || "checkbox").toLowerCase(); if (k === "chechbox") k = "checkbox"; return CONTROLS[k] || k === "tag" || k === "icon" || k === "none" ? k : "checkbox"; }
    get rowMode(){ return CONTROLS[this.trailingKind] ? "control" : "button"; }
    get active(){ return this.hasAttribute("is-active"); }
    set active(v){ this.toggleAttribute("is-active", !!v); }
    get controlInput(){ return this.trailEl && this.trailEl.input; }
    get defaultLeadKind(){ return "icon"; }
    buildItems(items, c){
      var self = this;
      this.trailEl = c.appendChild(CDS.create("cds-trailing-item", null, "cds-li__trail"));
      // controle nativo mudou → reflete em Is Active
      this.trailEl.addEventListener("cds-change", function(e){
        e.stopPropagation(); if (self.optionMode) return;
        self.setActive(e.detail.status === "selected");
      });
      this.row.addEventListener("click", function(e){
        if (self.optionMode || self._mode !== "button" || self.hasAttribute("disabled")) return;
        self.setActive(!self.active);
      });
    }
    setActive(on){
      if (on === this.active) return;
      this.active = on;
      if (on && this.trailingKind === "radio-button" && this.getAttribute("name") && this.parentElement){
        var n = this.getAttribute("name"), me = this;
        this.parentElement.querySelectorAll("cds-selection-list-item[name]").forEach(function(s){ if (s !== me && s.getAttribute("name") === n && s.active) s.active = false; });
      }
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { active: on }, bubbles: true }));
    }
    updateItems(){
      var k = this.trailingKind, t = this.trailEl, row = this.row, self = this;
      t.hidden = k === "none";
      CDS.attr(t, "status", this.active ? "selected" : "unselected"); // status antes de kind (ver CDS.attr)
      if (k !== "none") CDS.attr(t, "kind", k);
      if (this.hasAttribute("disabled")) CDS.attr(t, "disabled", ""); else t.removeAttribute("disabled");
      if (this.getAttribute("trailing-icon")) CDS.attr(t, "icon", this.getAttribute("trailing-icon"));
      if (this.hasAttribute("tag-label")) CDS.attr(t, "tag-label", this.getAttribute("tag-label"));
      ["name","value"].forEach(function(a){ if (self.hasAttribute(a)) CDS.attr(t, a, self.getAttribute(a)); else t.removeAttribute(a); });
      // listbox: o controle é só visual
      t.toggleAttribute("inert", this.optionMode); if (this.optionMode) CDS.attr(t, "aria-hidden", "true"); else t.removeAttribute("aria-hidden");
      if (this._mode === "button") CDS.attr(row, "aria-pressed", String(this.active));
      if (this._mode === "control"){
        var textId = this.textEl.id;
        var input = this.controlInput; if (input){ CDS.attr(input, "aria-labelledby", textId); input.removeAttribute("aria-label"); }
      }
    }
  }
  CdsSelectionListItem.define("cds-selection-list-item");
})();
} catch (e) { console.error("[cds] components/selection-list-item/selection-list-item.js", e); }

/* ==== components/selection-list-item/selection-list-item.playground.js ==== */
try {
/* Playground — Selection List Item */
CDS.register({
  id: "selection-list-item", name: "Selection List Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-812",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-selection-list-item", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout("Is Active: " + e.detail.active, false); });
    kit.hint(panel, "Clique na linha: alterna Is Active (Radio Button seleciona). Com controle, o foco é o controle nativo, com o nome do Label.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"]], hint: "Hovered e Pressed forçados para inspeção; no uso real vêm do mouse.", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.toggle(panel, { label: "Is Active", checked: false, onChange: function(on){ kit.attr(p, "is-active", on); } });
    kit.select(panel, { label: "Trailing Item", value: "checkbox", options: [["checkbox","Chechbox (Checkbox)"],["radio-button","Radio Button"],["switch","Switch"],["tag","Tag"],["icon","Icon"],["none","None"]], hint: "O Figma escreve “Chechbox” (C25).", onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-divider","Show Divider"],["show-description","Show Description (.Text Content)"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
  }
});
} catch (e) { console.error("[cds] components/selection-list-item/selection-list-item.playground.js", e); }

/* ==== components/select-field/select-field.js ==== */
try {
/**
 * @deps text-field popover selection-list-item content-list-item input-chip
 * CDS.SelectField — base dos 5 Select Inputs (Text Fields · Async 11030:7644 · Radio 11143:3056 · Checkbox 11143:4833 ·
 * Async creatable 11018:5694 · Multi 13795:4984). Não é um elemento registrado.
 *
 * Mesma anatomia e props do Text Input (CDS.TextField). O Icon Button (Ghost · Neutral · Medium) troca
 * dropdown-open-line ↔ dropdown-close-line; Is Active=True abre o Popover com as opções:
 *   Selection List Item (Show Lead Item, Show Divider e Show Description desligados) com o .Trailing Item de cada membro;
 *   no Async creatable, um Content List Item "Adicionar "…"" com plus-line.
 *
 * Acessibilidade: padrão combobox do WAI-ARIA. O foco fica no <input role="combobox">; as opções são role="option"
 * dentro de role="listbox" e a opção atual vai em aria-activedescendant. Setas, Enter, Esc e Tab.
 *
 * Opções: filhos <option value="…">rótulo</option> (lidos uma vez) ou a propriedade .options = [{ value, label, disabled }].
 * Async: .loadOptions = function(query){ return Promise<[{ value, label }]> } — sem ela, filtra as opções locais.
 * Atributos: os do Text Input · value (um valor; nos múltiplos, separados por vírgula) · open · empty-text
 * Eventos: cds-change { value, values, labels } · cds-toggle { open } · cds-create { label } (creatable)
 *
 * Membro define: get searchable · get multiple · get optionTrailing · get popoverGap · displayText()
 */
(function(){
  "use strict";
  var uid = 0;
  function norm(s){ return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }

  class SelectField extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["open", "empty-text"]); }
    constructor(){ super(); this._sid = "cds-sel-" + (++uid); this._options = null; this._selected = null; this._query = null; this._shown = []; this._cur = -1; }

    // ----- ganchos -----
    get searchable(){ return true; }
    get multiple(){ return false; }
    get optionTrailing(){ return "none"; }
    get popoverGap(){ return 8; }
    get creatable(){ return false; }
    get multiSelect(){ return this.multiple || this.optionTrailing === "checkbox"; } // Checkbox Select: vários valores, sem chips
    get defaultPlaceholder(){ return "Placeholder"; }
    get fallbackName(){ return "Selecionar"; }
    displayText(){ var o = this.optionFor(this._selected[0]); return o ? o.label : ""; }

    // ----- opções e valor -----
    get options(){ return this._options || []; }
    set options(list){ this._options = (list || []).map(function(o){ return typeof o === "string" ? { value: o, label: o } : { value: String(o.value), label: o.label == null ? String(o.value) : String(o.label), disabled: !!o.disabled }; }); if (this._built){ this.update(); if (this.isOpen) this.renderList(); } }
    optionFor(v){ return this.options.find(function(o){ return o.value === v; }) || (this._extra && this._extra[v]); }
    get values(){ return (this._selected || []).slice(); }
    get value(){ return (this._selected || []).join(","); }
    set value(v){ this._selected = parseValue(v, this.multiSelect); this._query = null; if (this._built) this.update(); }
    get displayValue(){ return this._query != null ? this._query : this.displayText(); }

    attributeChangedCallback(name){
      if (name === "value") this._selected = null;
      if (name === "open" && this._built){ if (this.hasAttribute("open")) this.openList(); else this.closeList(); }
      if (this.isConnected) this.render();
    }
    render(){
      if (!this._built && this._options == null){
        // filhos <option> viram as opções (o build do TextField limpa o conteúdo)
        var opts = [].slice.call(this.querySelectorAll("option"));
        if (opts.length) this.options = opts.map(function(o){ return { value: o.value, label: o.textContent.trim(), disabled: o.disabled }; });
      }
      if (this._selected == null) this._selected = parseValue(this.getAttribute("value"), this.multiSelect);
      super.render();
    }

    // ----- montagem -----
    configureControl(ctrl){
      var self = this;
      ctrl.setAttribute("role", "combobox");
      ctrl.setAttribute("aria-autocomplete", this.searchable ? "list" : "none");
      ctrl.setAttribute("aria-expanded", "false");
      ctrl.setAttribute("aria-controls", this._sid + "-list");
      ctrl.autocomplete = "off";
      if (!this.searchable) ctrl.readOnly = true;
      ctrl.addEventListener("keydown", function(e){ self.onKey(e); });
      // focusout + relatedTarget (síncrono): setTimeout atrasa com a aba oculta (A50)
      this.addEventListener("focusout", function(e){ if (!e.relatedTarget || !self.contains(e.relatedTarget)) self.closeList(); });
    }
    buildTrailing(box){
      var self = this;
      this.classList.add("cds-tf--select");
      var b = this.toggleBtn = CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "dropdown-open-line" }, "cds-tf__action");
      b.addEventListener("mousedown", function(e){ e.preventDefault(); }); // o foco fica no combobox
      b.addEventListener("click", function(){ if (self.disabled) return; self.control.focus(); self.toggleList(); });
      box.appendChild(b);
      box.addEventListener("click", function(e){
        if (self.disabled || e.target.closest("cds-icon-button") || e.target.closest("cds-input-chip")) return;
        if (self.searchable) self.openList(); else self.toggleList();
      });
      if (this.multiple){
        this.chipsEl = CDS.create("div", { role: "list", "aria-label": "Selecionados" }, "cds-sel__chips");
        this.content.insertBefore(this.chipsEl, this.control);
        this.chipsEl.addEventListener("cds-remove", function(e){
          e.preventDefault();
          var chip = e.target.closest("cds-input-chip"); if (chip) self.toggleValue(chip.dataset.value);
          self.control.focus();
        });
      }
      // Popover (manual: o próprio campo controla abrir e fechar)
      var pop = this.pop = CDS.create("cds-popover", { popover: "manual", label: "Opções" }, "cds-sel__popover");
      var list = this.listEl = CDS.create("div", { role: "listbox", id: this._sid + "-list" }, "cds-sel__list");
      if (this.multiSelect) list.setAttribute("aria-multiselectable", "true");
      list.addEventListener("mousedown", function(e){ e.preventDefault(); });
      list.addEventListener("click", function(e){
        var item = e.target.closest("[data-index]"); if (!item || item.hasAttribute("disabled")) return;
        self.choose(parseInt(item.dataset.index, 10));
      });
      list.addEventListener("pointermove", function(e){ var item = e.target.closest("[data-index]"); if (item) self.setCurrent(parseInt(item.dataset.index, 10), false); });
      pop.appendChild(list);
      pop.addEventListener("cds-toggle", function(e){ if (e.target === pop) e.stopPropagation(); }); // o campo emite o próprio cds-toggle
      this.appendChild(pop);
      this._reposition = function(){ if (self.isOpen) self.place(); };
      this._outside = function(e){ if (self.isOpen && !self.contains(e.target)) self.closeList(); };
    }
    connectedCallback(){ super.connectedCallback(); window.addEventListener("resize", this._reposition); window.addEventListener("scroll", this._reposition, true); document.addEventListener("pointerdown", this._outside, true); }
    disconnectedCallback(){ window.removeEventListener("resize", this._reposition); window.removeEventListener("scroll", this._reposition, true); document.removeEventListener("pointerdown", this._outside, true); }

    updateTrailing(){
      if (!this.toggleBtn) return;
      var b = this.toggleBtn, open = this.isOpen;
      b.setAttribute("icon", open ? "dropdown-close-line" : "dropdown-open-line");
      b.setAttribute("label", open ? "Fechar opções" : "Abrir opções");
      b.hidden = !this.flag("show-trailing-item");
      if (this.disabled) b.setAttribute("disabled", ""); else b.removeAttribute("disabled");
      var ib = b.querySelector("button"); if (ib){ ib.tabIndex = -1; ib.setAttribute("aria-hidden", "true"); }
      this.updateChips();
    }
    update(){
      super.update();
      this.classList.toggle("is-filled", this._selected.length > 0);
      this.listEl.setAttribute("aria-label", this.getAttribute("label") || this.fallbackName);
    }
    updateChips(){
      if (!this.chipsEl) return;
      // com chips, sem placeholder
      this.control.placeholder = this._selected.length ? "" : (this.hasAttribute("placeholder") ? this.getAttribute("placeholder") : this.defaultPlaceholder);
      var self = this, want = this._selected.join("\u0000");
      if (this.chipsEl._key === want) return;
      this.chipsEl._key = want; this.chipsEl.innerHTML = "";
      this._selected.forEach(function(v){
        var o = self.optionFor(v), wrap = CDS.create("div", { role: "listitem" }, "cds-sel__chip");
        var chip = CDS.create("cds-input-chip", { label: o ? o.label : v, "show-lead-icon": "false" });
        chip.dataset.value = v; wrap.appendChild(chip); self.chipsEl.appendChild(wrap);
      });
      this.chipsEl.hidden = !this._selected.length;
    }

    // ----- abrir / fechar -----
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    openList(){
      if (this.isOpen || this.disabled) return;
      this.renderList();
      this.pop.showPopover();
      this.place();
      this.classList.add("is-open");
      this.control.setAttribute("aria-expanded", "true");
      if (!this.hasAttribute("open")) this.setAttribute("open", "");
      this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: true }, bubbles: true }));
    }
    closeList(){
      if (!this.isOpen) return;
      this.pop.hidePopover();
      this.classList.remove("is-open");
      this.control.setAttribute("aria-expanded", "false"); this.control.removeAttribute("aria-activedescendant");
      this._cur = -1;
      if (this._query != null && !this.multiple){ this._query = null; this.control.value = this.displayValue; } // sem escolha, volta ao valor
      if (this.hasAttribute("open")) this.removeAttribute("open");
      this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: false }, bubbles: true }));
    }
    toggleList(){ if (this.isOpen) this.closeList(); else this.openList(); }
    place(){
      var box = this.box, w = box.getBoundingClientRect().width;
      this.pop.style.width = Math.round(w) + "px"; this.pop.style.maxWidth = "none";
      CDS.position(box, this.pop, { placement: "bottom-start", gap: this.popoverGap });
    }

    // ----- lista -----
    renderList(){
      var self = this, q = this.searchable ? (this._query || "") : "";
      var gen = this._gen = (this._gen || 0) + 1;
      var done = function(list){ if (gen === self._gen) self.paint(list, q); };
      if (this.loadOptions && this.searchable){
        this.listEl.setAttribute("aria-busy", "true");
        Promise.resolve(this.loadOptions(q)).then(function(list){
          self.listEl.removeAttribute("aria-busy");
          // guarda os rótulos das opções vindas de fora para mostrar o valor escolhido
          self._extra = self._extra || {}; (list || []).forEach(function(o){ o = typeof o === "string" ? { value: o, label: o } : o; self._extra[String(o.value)] = { value: String(o.value), label: String(o.label == null ? o.value : o.label) }; });
          done((list || []).map(function(o){ return typeof o === "string" ? { value: o, label: o } : { value: String(o.value), label: String(o.label == null ? o.value : o.label), disabled: !!o.disabled }; }));
        });
      } else {
        var nq = norm(q);
        done(this.options.filter(function(o){ return !nq || norm(o.label).indexOf(nq) >= 0; }));
      }
    }
    paint(list, q){
      var self = this, L = this.listEl, items = [];
      L.innerHTML = "";
      if (this.creatable && q.trim() && !list.some(function(o){ return norm(o.label) === norm(q); })) items.push({ create: q.trim() });
      list.forEach(function(o){ items.push(o); });
      this._shown = items;
      items.forEach(function(o, i){
        var n;
        if (o.create){
          n = CDS.create("cds-content-list-item", { option: "", "show-trailing-item": "false", "show-divider": "false", "show-description": "false",
            "lead-kind": "icon", "lead-icon": "plus-line", label: "Adicionar “" + o.create + "”" });
        } else {
          n = CDS.create("cds-selection-list-item", { option: "", "trailing-item": self.optionTrailing, "show-lead-item": "false", "show-divider": "false", "show-description": "false", label: o.label });
          if (self._selected.indexOf(o.value) >= 0) n.setAttribute("is-active", "");
          if (o.disabled) n.setAttribute("disabled", "");
        }
        n.id = self._sid + "-o" + i; n.dataset.index = i; n.className = "cds-sel__option";
        L.appendChild(n);
      });
      if (!items.length) L.appendChild(CDS.create("div", { role: "presentation" }, "cds-sel__empty")).textContent = this.getAttribute("empty-text") || "Nenhuma opção encontrada";
      var sel = items.findIndex(function(o){ return !o.create && self._selected.indexOf(o.value) >= 0; });
      this.setCurrent(this._cur >= 0 && this._cur < items.length ? this._cur : (q && items.length ? 0 : sel), false);
      if (this.isOpen) this.place();
    }
    optionNode(i){ return this.listEl.querySelector('[data-index="' + i + '"]'); }
    setCurrent(i, scroll){
      var prev = this.optionNode(this._cur); if (prev && prev.row) prev.row.classList.remove("is-current");
      this._cur = i;
      var n = this.optionNode(i);
      if (n && n.row){ n.row.classList.add("is-current"); this.control.setAttribute("aria-activedescendant", n.row.id); if (scroll !== false) n.scrollIntoView({ block: "nearest" }); }
      else this.control.removeAttribute("aria-activedescendant");
    }
    move(d){
      var n = this._shown.length; if (!n) return;
      var i = this._cur;
      for (var k = 0; k < n; k++){ i = i < 0 ? (d > 0 ? 0 : n - 1) : (i + d + n) % n; if (!this._shown[i].disabled) break; }
      this.setCurrent(i, true);
    }
    choose(i){
      var o = this._shown[i]; if (!o || o.disabled) return;
      if (o.create){
        var v = o.create; this._options = this.options.concat([{ value: v, label: v }]);
        this.dispatchEvent(new CustomEvent("cds-create", { detail: { label: v }, bubbles: true }));
        o = { value: v, label: v };
      }
      if (this.multiSelect){
        this.toggleValue(o.value);
        if (this.multiple){ this._query = ""; this.control.value = ""; this.renderList(); }
        else this.paintActive();
      } else {
        this._selected = [o.value]; this._query = null;
        this.control.value = this.displayValue;
        this.closeList(); this.emit();
        this.updateTrailing(); this.classList.add("is-filled");
      }
    }
    paintActive(){ var self = this; this._shown.forEach(function(o, i){ var n = self.optionNode(i); if (n && !o.create) n.toggleAttribute("is-active", self._selected.indexOf(o.value) >= 0); }); }
    toggleValue(v){
      var at = this._selected.indexOf(v);
      if (at >= 0) this._selected.splice(at, 1); else this._selected.push(v);
      if (this._query == null || !this.multiple) this.control.value = this.displayValue;
      this.classList.toggle("is-filled", this._selected.length > 0);
      this.updateTrailing(); this.paintActive(); if (this.isOpen) this.place();
      this.emit();
    }
    emit(){
      var self = this;
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, values: this.values, labels: this.values.map(function(v){ var o = self.optionFor(v); return o ? o.label : v; }) }, bubbles: true }));
    }

    // ----- teclado e digitação -----
    onInput(){
      if (!this.searchable) return;
      this._query = this.control.value; this._cur = -1;
      if (!this.isOpen) this.openList(); else this.renderList();
    }
    onKey(e){
      var open = this.isOpen;
      switch (e.key){
        case "ArrowDown": e.preventDefault(); if (!open){ this.openList(); if (this._cur < 0) this.move(1); } else this.move(1); break;
        case "ArrowUp": e.preventDefault(); if (!open) this.openList(); this.move(-1); break;
        case "Home": if (open && !this.searchable){ e.preventDefault(); this._cur = -1; this.move(1); } break;
        case "End": if (open && !this.searchable){ e.preventDefault(); this._cur = -1; this.move(-1); } break;
        case "Enter": if (open && this._cur >= 0){ e.preventDefault(); this.choose(this._cur); } else if (!open && !this.searchable){ e.preventDefault(); this.openList(); } break;
        case " ": if (!this.searchable){ e.preventDefault(); if (open && this._cur >= 0) this.choose(this._cur); else this.openList(); } break;
        case "Escape": if (open){ e.preventDefault(); this.closeList(); } else if (this.searchable && this.control.value && !this.multiple){ e.preventDefault(); this._selected = []; this._query = null; this.control.value = ""; this.classList.remove("is-filled"); this.emit(); } break;
        case "Tab": this.closeList(); break;
        case "Backspace": if (this.multiple && !this.control.value && this._selected.length){ this.toggleValue(this._selected[this._selected.length - 1]); } break;
      }
    }
  }
  function parseValue(v, multiple){ if (v == null || v === "") return []; return multiple ? String(v).split(",").map(function(s){ return s.trim(); }).filter(Boolean) : [String(v)]; }

  CDS.SelectField = SelectField;
})();
} catch (e) { console.error("[cds] components/select-field/select-field.js", e); }

/* ==== components/async-creatable-select-input/async-creatable-select-input.js ==== */
try {
/**
 * @deps select-field
 * <cds-async-creatable-select-input> — Async creatable Select Input · Text Fields · set 11018:5694
 * Como o Async, e quando o texto digitado não existe nas opções, a primeira opção é um Content List Item
 * "Adicionar “…”" (Lead Item Icon plus-line). Escolher cria a opção e seleciona (evento cds-create { label }).
 * Popover: no Figma sobrepõe 4px o Text Box (y 68 × box até 72); aqui fica a 4px (CONFERIR C43).
 */
(function(){
  "use strict";
  class CdsAsyncCreatableSelectInput extends CDS.SelectField {
    get creatable(){ return true; }
    get popoverGap(){ return 4; }
  }
  CdsAsyncCreatableSelectInput.define("cds-async-creatable-select-input");
})();
} catch (e) { console.error("[cds] components/async-creatable-select-input/async-creatable-select-input.js", e); }

/* ==== components/async-creatable-select-input/async-creatable-select-input.playground.js ==== */
try {
/* Playground — Async creatable Select Input */
CDS.register({
  id: "async-creatable-select-input", name: "Async creatable Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11018-5694",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-async-creatable-select-input", async: true, nestedOption: "Selection List Item + Content List Item", note: "Digite algo que não está na lista: a primeira opção vira <b>Adicionar “…”</b> e cria a opção." }); }
});
} catch (e) { console.error("[cds] components/async-creatable-select-input/async-creatable-select-input.playground.js", e); }

/* ==== components/async-select-input/async-select-input.js ==== */
try {
/**
 * @deps select-field
 * <cds-async-select-input> — Async Select Input · Text Fields · set 11030:7644
 * Escolha única com busca: digitar filtra (ou chama .loadOptions(query)). Opções sem trailing (Trailing Item=None).
 * Popover a 8px do Text Box, como no Figma. Hover: 150ms + Systemic/accelerate.
 * Atributos e eventos: ver CDS.SelectField.
 */
(function(){
  "use strict";
  class CdsAsyncSelectInput extends CDS.SelectField {}
  CdsAsyncSelectInput.define("cds-async-select-input");
})();
} catch (e) { console.error("[cds] components/async-select-input/async-select-input.js", e); }

/* ==== components/async-select-input/async-select-input.playground.js ==== */
try {
/* Playground — Async Select Input */
CDS.register({
  id: "async-select-input", name: "Async Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11030-7644",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-async-select-input", async: true, note: "Escolha única com busca. Digite para filtrar; setas, Enter e Esc funcionam no campo." }); }
});
} catch (e) { console.error("[cds] components/async-select-input/async-select-input.playground.js", e); }

/* ==== components/checkbox-select-input/checkbox-select-input.js ==== */
try {
/**
 * @deps select-field
 * <cds-checkbox-select-input> — Checkbox Select Input · Text Fields · set 11143:4833
 * Vários valores sem busca: opções com Trailing Item=Checkbox; a lista fica aberta enquanto marca.
 * Preenchido, o campo mostra "N Selecionados" (no Figma: "$nn Selecionados"; com 1, "1 Selecionado").
 * Popover a 4px do Text Box. Hover sem transição (reaction instantânea no Figma, C42).
 * Atributo: count-text — modelo do texto, com {n} · padrão "{n} Selecionados"
 */
(function(){
  "use strict";
  class CdsCheckboxSelectInput extends CDS.SelectField {
    static get observedAttributes(){ return CDS.SelectField.observedAttributes.concat(["count-text"]); }
    get searchable(){ return false; }
    get optionTrailing(){ return "checkbox"; }
    get popoverGap(){ return 4; }
    displayText(){
      var n = this._selected.length; if (!n) return "";
      var t = this.getAttribute("count-text");
      return t ? t.replace("{n}", n) : n + (n === 1 ? " Selecionado" : " Selecionados");
    }
  }
  CdsCheckboxSelectInput.define("cds-checkbox-select-input");
})();
} catch (e) { console.error("[cds] components/checkbox-select-input/checkbox-select-input.js", e); }

/* ==== components/checkbox-select-input/checkbox-select-input.playground.js ==== */
try {
/* Playground — Checkbox Select Input */
CDS.register({
  id: "checkbox-select-input", name: "Checkbox Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11143-4833",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-checkbox-select-input", note: "Vários valores: a lista fica aberta enquanto você marca. O campo mostra “N Selecionados”." }); }
});
} catch (e) { console.error("[cds] components/checkbox-select-input/checkbox-select-input.playground.js", e); }

/* ==== components/multi-select-input/multi-select-input.js ==== */
try {
/**
 * @deps select-field
 * <cds-multi-select-input> — Multi Select Input · Text Fields · set 13795:4984
 * Vários valores com busca: cada escolha vira um Input Chip no Content (Slot com Chips Group no Figma);
 * o × do chip ou Backspace com o campo vazio removem. Opções sem trailing.
 * Popover: no Figma começa em y 40 (sobre o Text Box, que vai até 72); aqui fica a 4px (CONFERIR C43).
 * Hover: 300ms + Systemic/accelerate (como no Figma; os outros Selects usam 150ms, C42).
 */
(function(){
  "use strict";
  class CdsMultiSelectInput extends CDS.SelectField {
    get multiple(){ return true; }
    get popoverGap(){ return 4; }
    buildTrailing(box){ this.classList.add("cds-tf--multi"); super.buildTrailing(box); }
  }
  CdsMultiSelectInput.define("cds-multi-select-input");
})();
} catch (e) { console.error("[cds] components/multi-select-input/multi-select-input.js", e); }

/* ==== components/multi-select-input/multi-select-input.playground.js ==== */
try {
/* Playground — Multi Select Input */
CDS.register({
  id: "multi-select-input", name: "Multi Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13795-4984",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-multi-select-input", async: true, note: "Cada escolha vira um Input Chip. O × do chip ou Backspace com o campo vazio removem." }); }
});
} catch (e) { console.error("[cds] components/multi-select-input/multi-select-input.playground.js", e); }

/* ==== components/radio-select-input/radio-select-input.js ==== */
try {
/**
 * @deps select-field
 * <cds-radio-select-input> — Radio Select Input · Text Fields · set 11143:3056
 * Escolha única sem busca: o campo só abre a lista; opções com Trailing Item=Radio Button.
 * Popover a 4px do Text Box, como no Figma.
 */
(function(){
  "use strict";
  class CdsRadioSelectInput extends CDS.SelectField {
    get searchable(){ return false; }
    get optionTrailing(){ return "radio-button"; }
    get popoverGap(){ return 4; }
  }
  CdsRadioSelectInput.define("cds-radio-select-input");
})();
} catch (e) { console.error("[cds] components/radio-select-input/radio-select-input.js", e); }

/* ==== components/radio-select-input/radio-select-input.playground.js ==== */
try {
/* Playground — Radio Select Input */
CDS.register({
  id: "radio-select-input", name: "Radio Select Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11143-3056",
  mount: function(ctx){ ctx.kit.selectField(ctx, { tag: "cds-radio-select-input", note: "Escolha única sem busca: clique, Enter, Espaço ou seta abrem a lista." }); }
});
} catch (e) { console.error("[cds] components/radio-select-input/radio-select-input.playground.js", e); }

/* ==== components/select-number/select-number.js ==== */
try {
/**
 * @deps icon popover selection-list-item
 * <cds-select-number> — .Select Number (Pagination) · .Building Blocks · set 13408:1596 (State × Is Active)
 * Pílula Surface/default · pad 4 8 · gap 4 · número (Caption/Regular Text/intense) + dropdown-open-line ↔ dropdown-close-line.
 * Hovered: Neutral/Solid/semi-soft + Text/medium · Pressed: semi-soft + Caption/Medium Text/intense · Disabled: Opacity/light + Text/medium.
 * Is Active=True: Popover (84 de largura) com Selection List Items (32 de altura) dos números.
 * Atributos: value ("10") · options ("10,20,30,40,50") · disabled · label (nome acessível · "Selecionar número")
 * Acessibilidade: botão com aria-haspopup="listbox"; ao abrir, o foco vai para a opção atual; setas, Home/End, Enter e Esc.
 * Evento: cds-change { value }
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsSelectNumber extends CDS.Element {
    static get observedAttributes(){ return ["value","options","disabled","label"]; }
    get options(){ return (this.getAttribute("options") || "10,20,30,40,50").split(",").map(function(s){ return s.trim(); }).filter(Boolean); }
    get value(){ return this.text("value", "10"); }
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._id = "cds-sn-" + (++uid); this.innerHTML = "";
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", "aria-haspopup": "listbox", "aria-expanded": "false" }, "cds-sn"));
        this.valEl = b.appendChild(CDS.create("span", null, "cds-sn__value"));
        this.iconEl = b.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", icon: "dropdown-open-line", "aria-hidden": "true" }));
        // a lista entra antes de o Popover conectar: no connect ele move os filhos para o Slot
        var pop = this.pop = CDS.create("cds-popover", { placement: "bottom-start", label: "Opções" }, "cds-sn__popover");
        this.list = pop.appendChild(CDS.create("div", { role: "listbox", id: this._id + "-list", tabindex: "-1" }, "cds-sn__list"));
        this.appendChild(pop);
        pop._trigger = b;
        b.addEventListener("click", function(){ if (self.hasAttribute("disabled")) return; if (self.isOpen) self.pop.hide(); else self.open(); });
        b.addEventListener("keydown", function(e){ if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !self.isOpen){ e.preventDefault(); self.open(); } });
        pop.addEventListener("cds-toggle", function(e){
          e.stopPropagation();
          var o = e.detail.open; b.setAttribute("aria-expanded", String(o)); CDS.attr(self.iconEl, "icon", o ? "dropdown-close-line" : "dropdown-open-line");
          self.classList.toggle("is-open", o);
          if (!o && self.contains(document.activeElement) && document.activeElement !== b) b.focus();
        });
        this.list.addEventListener("click", function(e){ var it = e.target.closest("cds-selection-list-item"); if (it) self.choose(it.dataset.value); });
        this.list.addEventListener("keydown", function(e){ self.onKey(e); });
      }
      this.valEl.textContent = this.value;
      this.btn.disabled = this.hasAttribute("disabled");
      CDS.attr(this.btn, "aria-label", (this.getAttribute("label") || "Selecionar número") + ": " + this.value);
      CDS.attr(this.btn, "aria-controls", this.list.id);
    }
    open(){
      var self = this, L = this.list; L.innerHTML = "";
      this.options.forEach(function(v, i){
        var n = CDS.create("cds-selection-list-item", { option: "", "trailing-item": "none", "show-lead-item": "false", "show-divider": "false", "show-description": "false", label: v, "is-active": v === self.value ? "" : null }, "cds-sn__opt");
        n.id = self._id + "-o" + i; n.dataset.value = v; L.appendChild(n);
        if (n.row) n.row.tabIndex = -1;
      });
      this.pop.style.width = "84px";
      this.pop.show(); this.pop.place();
      var cur = L.querySelector("[is-active]") || L.firstElementChild; if (cur && cur.row) cur.row.focus();
    }
    onKey(e){
      var opts = [].slice.call(this.list.children), i = opts.findIndex(function(o){ return o.contains(document.activeElement); });
      var k = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: opts.length - 1 }[e.key];
      if (k != null){ e.preventDefault(); k = Math.min(Math.max(0, k), opts.length - 1); if (opts[k].row) opts[k].row.focus(); return; }
      if ((e.key === "Enter" || e.key === " ") && i >= 0){ e.preventDefault(); this.choose(opts[i].dataset.value); }
      if (e.key === "Tab") this.pop.hide();
    }
    choose(v){
      this.pop.hide(); this.btn.focus();
      if (v === this.value) return;
      this.setAttribute("value", v);
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: v }, bubbles: true }));
    }
  }
  CdsSelectNumber.define("cds-select-number");
})();
} catch (e) { console.error("[cds] components/select-number/select-number.js", e); }

/* ==== components/select-number/select-number.playground.js ==== */
try {
/* Playground — .Select Number (building block) */
CDS.register({
  id: "select-number", name: ".Select Number", category: "Navigation", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13408-1596",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-select-number", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value, false); });
    kit.hint(panel, "Clique ou seta para baixo abre; o foco vai para a opção atual.");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.text(panel, { label: "Opções", value: "10,20,30,40,50", onInput: function(v){ p.setAttribute("options", v); } });
  }
});
} catch (e) { console.error("[cds] components/select-number/select-number.playground.js", e); }

/* ==== components/pagination/pagination.js ==== */
try {
/**
 * @deps select-number divider icon-button
 * <cds-pagination> — Pagination · Navigation · componente 13408:1416
 * Esquerda: "Itens por página:" + .Select Number + Divider | "1-10 de 250 itens".
 * Direita: .Select Number (página) + "páginas de" + "100" + Divider | ‹ › (Icon Button Ghost Neutral Medium).
 * Os textos seguem a ordem do Figma ("[n] páginas de 100", C47).
 *
 * Atributos: page (1) · per-page (10) · per-page-options ("10,20,30,40,50") · total (Items display · 250)
 *   pages (Page number · 100; sem ele, calcula de total/per-page) · items-range (texto fixo; sem ele, calcula · "1-10")
 *   show-items-per-page · show-item-display · show-rows-per-page · label ("Paginação")
 * Eventos: cds-page-change { page } · cds-per-page-change { perPage }
 */
(function(){
  "use strict";
  function num(v, d){ var n = parseInt(v, 10); return isNaN(n) ? d : n; }
  class CdsPagination extends CDS.Element {
    static get observedAttributes(){ return ["page","per-page","per-page-options","total","pages","items-range","show-items-per-page","show-item-display","show-rows-per-page","label"]; }
    get perPage(){ return Math.max(1, num(this.getAttribute("per-page"), 10)); }
    get total(){ return Math.max(0, num(this.getAttribute("total"), 250)); }
    get pages(){ return Math.max(1, this.hasAttribute("pages") ? num(this.getAttribute("pages"), 1) : (this.hasAttribute("total") ? Math.ceil(this.total / this.perPage) : 100)); }
    get page(){ return Math.min(Math.max(1, num(this.getAttribute("page"), 1)), this.pages); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        var t = function(cls, txt){ return CDS.create("span", null, cls); };
        var left = this.appendChild(CDS.create("div", null, "cds-pg__group"));
        var ipp = this.ippEl = left.appendChild(CDS.create("div", null, "cds-pg__part"));
        ipp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "Itens por página:";
        this.perSel = ipp.appendChild(CDS.create("cds-select-number", { label: "Itens por página" }));
        ipp.appendChild(CDS.create("cds-divider", { orientation: "vertical", intensity: "medium" }, "cds-pg__div"));
        var disp = this.dispEl = left.appendChild(CDS.create("div", { "aria-live": "polite" }, "cds-pg__part cds-pg__display"));
        this.rangeEl = disp.appendChild(t("cds-pg__strong")); disp.appendChild(t("cds-pg__strong")).textContent = "de";
        this.totalEl = disp.appendChild(t("cds-pg__strong")); disp.appendChild(t("cds-pg__strong")).textContent = "itens";
        var right = this.appendChild(CDS.create("div", null, "cds-pg__group"));
        var rpp = this.rppEl = right.appendChild(CDS.create("div", null, "cds-pg__part"));
        this.pageSel = rpp.appendChild(CDS.create("cds-select-number", { label: "Página" }));
        rpp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "páginas";
        rpp.appendChild(CDS.create("span", null, "cds-pg__txt")).textContent = "de";
        var tp = rpp.appendChild(CDS.create("span", null, "cds-pg__total"));
        this.pagesEl = tp.appendChild(CDS.create("span", null, "cds-pg__txt"));
        tp.appendChild(CDS.create("cds-divider", { orientation: "vertical", intensity: "medium" }, "cds-pg__div"));
        var nav = right.appendChild(CDS.create("div", null, "cds-pg__nav"));
        this.prevBtn = nav.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "navigation-left-line", label: "Página anterior" }));
        this.nextBtn = nav.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "navigation-right-line", label: "Próxima página" }));
        this.prevBtn.addEventListener("click", function(){ self.go(self.page - 1); });
        this.nextBtn.addEventListener("click", function(){ self.go(self.page + 1); });
        this.pageSel.addEventListener("cds-change", function(e){ e.stopPropagation(); self.go(parseInt(e.detail.value, 10)); });
        this.perSel.addEventListener("cds-change", function(e){
          e.stopPropagation(); self.setAttribute("per-page", e.detail.value); self.setAttribute("page", "1");
          self.dispatchEvent(new CustomEvent("cds-per-page-change", { detail: { perPage: parseInt(e.detail.value, 10) }, bubbles: true }));
        });
      }
      var page = this.page, per = this.perPage, total = this.total, pages = this.pages;
      this.setAttribute("role", "navigation"); CDS.attr(this, "aria-label", this.getAttribute("label") || "Paginação");
      this.ippEl.hidden = !this.flag("show-items-per-page");
      this.dispEl.hidden = !this.flag("show-item-display");
      this.rppEl.hidden = !this.flag("show-rows-per-page");
      CDS.attr(this.perSel, "value", String(per));
      CDS.attr(this.perSel, "options", this.getAttribute("per-page-options") || "10,20,30,40,50");
      CDS.attr(this.pageSel, "value", String(page));
      var opts = []; for (var i = 1; i <= pages; i++) opts.push(i); CDS.attr(this.pageSel, "options", opts.join(","));
      this.rangeEl.textContent = this.hasAttribute("items-range") ? this.getAttribute("items-range") : (total ? ((page - 1) * per + 1) + "-" + Math.min(page * per, total) : "0");
      this.totalEl.textContent = String(total);
      this.pagesEl.textContent = String(pages);
      CDS.attr(this.prevBtn, "disabled", page <= 1 ? "" : null); // nos limites: sem especificação (C52)
      CDS.attr(this.nextBtn, "disabled", page >= pages ? "" : null);
    }
    go(p){
      p = Math.min(Math.max(1, p), this.pages); if (p === this.page) return;
      this.setAttribute("page", String(p));
      this.dispatchEvent(new CustomEvent("cds-page-change", { detail: { page: p }, bubbles: true }));
    }
  }
  CdsPagination.define("cds-pagination");
})();
} catch (e) { console.error("[cds] components/pagination/pagination.js", e); }

/* ==== components/pagination/pagination.playground.js ==== */
try {
/* Playground — Pagination */
CDS.register({
  id: "pagination", name: "Pagination", category: "Navigation", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13408-1416",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-pagination", { style: "max-width:none;flex:none" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-page-change", function(e){ ctx.readout("página " + e.detail.page, false); });
    p.addEventListener("cds-per-page-change", function(e){ ctx.readout(e.detail.perPage + " por página", false); });
    kit.hint(panel, "780px no Figma; o preview rola na horizontal. Use 1366 no viewport para ver inteiro.");
    kit.section(panel, "Booleans");
    [["show-items-per-page","Show Itens per page"],["show-item-display","Show Item display"],["show-rows-per-page","Show Rows per page"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Items range", value: "", placeholder: "calculado (1-10)", onInput: function(v){ kit.attr(p, "items-range", v || null); } });
    kit.text(panel, { label: "Items display (total)", value: "250", onInput: function(v){ p.setAttribute("total", v); } });
    kit.text(panel, { label: "Page number (páginas)", value: "100", onInput: function(v){ p.setAttribute("pages", v); } });
  }
});
} catch (e) { console.error("[cds] components/pagination/pagination.playground.js", e); }

/* ==== components/selection-list/selection-list.js ==== */
try {
/**
 * @deps selection-list-item
 * <cds-selection-list> — Selection List · Lists · set 5488:1552 (Kind Default|Card)
 * Pilha de Selection List Items (Trailing Item=Chechbox, Show Divider ligado). Kind=Default: sem gap · Card: gap 8.
 * Uso: filhos <cds-selection-list-item> (a lista repassa kind) ou nada (amostra: 12 itens).
 * Atributos: kind · label (nome do grupo) · count (12) · trailing-item (repassado aos itens da amostra)
 * Acessibilidade: role="group" com o label; cada item é um controle nativo nomeado pela linha.
 * Evento: cds-change { values } — rótulos (ou value) dos itens ativos, a cada mudança
 */
(function(){
  "use strict";
  var uid = 0;
  class CdsSelectionList extends CDS.Element {
    static get observedAttributes(){ return ["kind", "label", "count", "trailing-item"]; }
    get items(){ return [].slice.call(this.querySelectorAll(":scope > cds-selection-list-item")); }
    get values(){ return this.items.filter(function(i){ return i.active; }).map(function(i){ return i.getAttribute("value") || i.getAttribute("label") || "Label"; }); }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.setAttribute("role", "group");
        if (!this.items.length){ this._sample = true; this._name = "cds-sl-" + (++uid); }
        this.addEventListener("cds-change", function(e){ if (e.target === self) return; e.stopImmediatePropagation(); self.dispatchEvent(new CustomEvent("cds-change", { detail: { values: self.values }, bubbles: true })); });
      }
      var kind = this.getAttribute("kind") === "card" ? "card" : null;
      if (this._sample){
        var n = Math.max(1, parseInt(this.getAttribute("count"), 10) || 12);
        while (this.items.length < n) this.appendChild(CDS.create("cds-selection-list-item", { name: this._name }));
        while (this.items.length > n) this.lastElementChild.remove();
        var t = this.getAttribute("trailing-item"); this.items.forEach(function(c){ CDS.attr(c, "trailing-item", t); });
      }
      CDS.attr(this, "aria-label", this.getAttribute("label") || "Seleção");
      this.items.forEach(function(c){ CDS.attr(c, "kind", kind); });
    }
  }
  CdsSelectionList.define("cds-selection-list");
})();
} catch (e) { console.error("[cds] components/selection-list/selection-list.js", e); }

/* ==== components/selection-list/selection-list.playground.js ==== */
try {
/* Playground — Selection List */
CDS.register({
  id: "selection-list", name: "Selection List", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-1552",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-selection-list", { label: "Seleção" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-change", function(e){ ctx.readout(e.detail.values.length + " selecionado(s)", false); });
    kit.hint(panel, "Amostra com 12 itens (Chechbox), como no Figma. Clique na linha para marcar.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.select(panel, { label: "Trailing Item (itens)", value: "checkbox", options: [["checkbox","Chechbox"],["radio-button","Radio Button"],["switch","Switch"],["none","None"]], hint: "O Figma só tem Chechbox; os outros vêm do Selection List Item.", onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.range(panel, { label: "Itens (amostra)", min: 1, max: 12, value: 12, onInput: function(v){ p.setAttribute("count", v); } });
  }
});
} catch (e) { console.error("[cds] components/selection-list/selection-list.playground.js", e); }

/* ==== components/table/table.js ==== */
try {
/**
 * @deps table-head table-cell table-toolbar pagination main-button
 * <cds-table> — Table · Tables · set 13472:5725 (Kind Default|Empty · Show Toolbar · Show Pagination · Table Columns = Slot)
 * Container (stroke Border/semi-soft · raio large): .Toolbar + colunas (.Head 56 + .Data Cell 64) · Pagination abaixo.
 * No Figma a tabela é montada por colunas (.Table Column); aqui é um <table> de verdade (linhas para o leitor de tela).
 * Kind=Empty: ilustração empty-state + "Falha ao carregar os dados…" (Body/Regular Text/medium) + Main Button Ghost Accent Small.
 *
 * Dados (propriedades):
 *   .columns = [{ key, label, kind: text|balance|percentage|tag|link|actions, sortable (padrão true), width }]
 *   .rows    = [{ id?, <key>: valor | { text, description, value, percentual, label, href, appearance } }]
 *   Sem dados: amostra do Figma (Checkbox · Default · Balance · Percentual · Tag · Icon Buttons, 10 linhas).
 * Atributos: kind (default|empty) · selectable (coluna Checkbox · padrão ligado) · show-toolbar · show-pagination · per-page (10)
 *   label (legenda) · empty-text · empty-action ("Recarregar página")
 * Os filhos de quem usa vão para o .Toolbar.
 * Ordenação: clique no .Head alterna Default → Up (crescente) → Down → Default; aria-sort no <th>.
 * Eventos: cds-sort { key, direction } · cds-selection { ids } · cds-action { id, action } · cds-retry · cds-page-change (da Pagination)
 */
(function(){
  "use strict";
  var SAMPLE_COLS = [
    { key: "text", label: "Head", kind: "text" }, { key: "balance", label: "Head", kind: "balance" },
    { key: "percentage", label: "Head", kind: "percentage" }, { key: "tag", label: "Head", kind: "tag" },
    { key: "actions", label: "Head", kind: "actions", sortable: true, width: 160 }
  ];
  function sampleRows(){ var r = []; for (var i = 0; i < 10; i++) r.push({ id: String(i + 1) }); return r; }
  function sortVal(v){ if (v && typeof v === "object") v = v.value != null ? v.value : v.percentual != null ? v.percentual : v.text != null ? v.text : v.label; var s = String(v == null ? "" : v), n = parseFloat(s.replace(/\./g, "").replace(",", ".")); return isNaN(n) || /[a-z]/i.test(s) ? s.toLowerCase() : n; }

  class CdsTable extends CDS.Element {
    static get observedAttributes(){ return ["kind","selectable","show-toolbar","show-pagination","per-page","label","empty-text","empty-action"]; }
    get columns(){ return this._columns || SAMPLE_COLS; }
    set columns(c){ this._columns = c; this._sel = {}; if (this._built) this.render(); }
    get rows(){ return this._rows || sampleRows(); }
    set rows(r){ this._rows = r; this._sel = {}; this._page = 1; if (this._built) this.render(); }
    get selected(){ var s = this._sel || {}; return Object.keys(s).filter(function(k){ return s[k]; }); }

    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._sel = {}; this._sort = null; this._page = 1;
        var kids = [].slice.call(this.childNodes); this.innerHTML = "";
        var box = this.box = this.appendChild(CDS.create("div", null, "cds-table__box"));
        this.toolbar = box.appendChild(CDS.create("cds-table-toolbar"));
        kids.forEach(function(k){ self.toolbar.appendChild(k); });
        this.scroll = box.appendChild(CDS.create("div", null, "cds-table__scroll"));
        this.empty = box.appendChild(CDS.create("div", { role: "status" }, "cds-table__empty"));
        this.empty.appendChild(CDS.create("img", { src: CDS.illustration("notificacoes/empty-state"), alt: "", width: "200", height: "200" }, "cds-table__ill"));
        this.emptyText = this.empty.appendChild(CDS.create("p", null, "cds-table__empty-text"));
        this.retry = this.empty.appendChild(CDS.create("cds-main-button", { kind: "ghost", appearance: "accent", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
        this.retry.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-retry", { bubbles: true })); });
        this.pager = this.appendChild(CDS.create("cds-pagination", null, "cds-table__pager"));
        this.pager.addEventListener("cds-page-change", function(e){ self._page = e.detail.page; self.renderBody(); });
        this.pager.addEventListener("cds-per-page-change", function(e){ self.setAttribute("per-page", String(e.detail.perPage)); });
        this.scroll.addEventListener("click", function(e){
          var th = e.target.closest("button.cds-th__btn"); if (th){ self.toggleSort(th.closest("th").dataset.key); return; }
          var ib = e.target.closest("cds-icon-button[data-action]"); if (ib){ self.dispatchEvent(new CustomEvent("cds-action", { detail: { id: ib.closest("tr").dataset.id, action: ib.dataset.action }, bubbles: true })); }
        });
        this.scroll.addEventListener("cds-change", function(e){
          var cb = e.target.closest("cds-checkbox"); if (!cb) return; e.stopPropagation();
          var on = e.detail.status === "selected";
          if (cb.classList.contains("cds-th__check")) self.pageRows().forEach(function(r){ self._sel[r.__id] = on; });
          else self._sel[cb.closest("tr").dataset.id] = on;
          self.renderBody();
          self.dispatchEvent(new CustomEvent("cds-selection", { detail: { ids: self.selected }, bubbles: true }));
        });
      }
      var emptyKind = this.getAttribute("kind") === "empty";
      CDS.attr(this, "kind", emptyKind ? "empty" : null);
      this.toolbar.hidden = !this.flag("show-toolbar");
      this.pager.hidden = !this.flag("show-pagination");
      this.scroll.hidden = emptyKind; this.empty.hidden = !emptyKind;
      this.emptyText.textContent = this.getAttribute("empty-text") || "Falha ao carregar os dados. Confira sua conexão e tente novamente.";
      CDS.attr(this.retry, "label", this.getAttribute("empty-action") || "Recarregar página");
      if (!emptyKind) this.renderTable();
      this.syncPager();
    }
    get perPage(){ return Math.max(1, parseInt(this.getAttribute("per-page"), 10) || 10); }
    allRows(){
      var rows = this.rows.map(function(r, i){ var o = Object.assign({}, r); o.__id = r.id != null ? String(r.id) : String(i + 1); return o; });
      var s = this._sort;
      if (s) rows.sort(function(a, b){ var x = sortVal(a[s.key]), y = sortVal(b[s.key]); var c = x < y ? -1 : x > y ? 1 : 0; return s.dir === "up" ? c : -c; });
      return rows;
    }
    pageRows(){ var all = this.allRows(), per = this.perPage, p = Math.min(this._page || 1, Math.max(1, Math.ceil(all.length / per))); return all.slice((p - 1) * per, p * per); }
    syncPager(){
      if (!this._rows){ ["total","pages","page"].forEach(function(a){ this.pager.removeAttribute(a); }, this); CDS.attr(this.pager, "per-page", String(this.perPage)); return; } // amostra: textos do Figma
      var total = this._rows.length, per = this.perPage;
      CDS.attr(this.pager, "total", String(total)); CDS.attr(this.pager, "per-page", String(per));
      CDS.attr(this.pager, "pages", String(Math.max(1, Math.ceil(total / per)))); CDS.attr(this.pager, "page", String(this._page || 1));
    }
    renderTable(){
      var self = this, sel = this.flag("selectable");
      this.scroll.innerHTML = "";
      var table = this.table = this.scroll.appendChild(CDS.create("table", null, "cds-table"));
      if (this.getAttribute("label")){ var cap = table.appendChild(CDS.create("caption", null, "cds-table__caption")); cap.textContent = this.getAttribute("label"); }
      var head = table.appendChild(CDS.create("thead")).appendChild(CDS.create("tr"));
      if (sel){ var th0 = head.appendChild(CDS.create("th", { scope: "col" })); CDS.TableHead.fill(th0, { kind: "multi" }); th0.style.width = "88px"; }
      this.columns.forEach(function(c){
        var th = head.appendChild(CDS.create("th", { scope: "col" })); th.dataset.key = c.key;
        var s = self._sort && self._sort.key === c.key ? self._sort.dir : "default";
        CDS.TableHead.fill(th, { kind: "default", text: c.label, sortable: c.sortable !== false, sort: s });
        if (c.sortable !== false) th.setAttribute("aria-sort", s === "up" ? "ascending" : s === "down" ? "descending" : "none");
        if (c.width) th.style.width = c.width + "px";
      });
      this.tbody = table.appendChild(CDS.create("tbody"));
      this.renderBody();
    }
    renderBody(){
      if (!this.tbody) return;
      var self = this, sel = this.flag("selectable"), rows = this.pageRows(), cols = this.columns, sample = !this._rows;
      this.tbody.innerHTML = "";
      rows.forEach(function(r){
        var tr = self.tbody.appendChild(CDS.create("tr")); tr.dataset.id = r.__id;
        if (sel) CDS.TableCell.fill(tr.appendChild(CDS.create("td")), "checkbox", { checked: !!self._sel[r.__id], label: "Selecionar linha " + r.__id });
        cols.forEach(function(c){
          var v = r[c.key], d = v && typeof v === "object" ? Object.assign({}, v) : sample ? {} : { text: v, value: v, percentual: v, label: v };
          if (!sample && !(v && typeof v === "object") && c.kind === "text") d.description = "";
          CDS.TableCell.fill(tr.appendChild(CDS.create("td")), CDS.TableCell.kindOf(c.kind), d);
        });
      });
      // checkbox do cabeçalho: selecionado / indeterminado / vazio (linhas da página)
      var hc = this.table && this.table.querySelector(".cds-th__check");
      if (hc){ var n = rows.filter(function(r){ return self._sel[r.__id]; }).length; CDS.attr(hc, "status", n === 0 ? "unselected" : n === rows.length ? "selected" : "indeterminate"); }
    }
    toggleSort(key){
      var s = this._sort, dir = !s || s.key !== key ? "up" : s.dir === "up" ? "down" : null;
      this._sort = dir ? { key: key, dir: dir } : null;
      this.renderTable();
      var th = this.table.querySelector('th[data-key="' + key + '"] button'); if (th) th.focus();
      this.dispatchEvent(new CustomEvent("cds-sort", { detail: { key: key, direction: dir || "default" }, bubbles: true }));
    }
  }
  CdsTable.define("cds-table");
})();
} catch (e) { console.error("[cds] components/table/table.js", e); }

/* ==== components/table/table.playground.js ==== */
try {
/* Playground — Table */
CDS.register({
  id: "table", name: "Table", category: "Tables", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13472-5725",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-table", { label: "Tabela de exemplo", style: "width:1053px;max-width:none;flex:none" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-selection", function(e){ ctx.readout(e.detail.ids.length + " linha(s) selecionada(s)", false); });
    p.addEventListener("cds-sort", function(e){ ctx.readout("ordenado por " + e.detail.key + " · " + e.detail.direction, false); });
    kit.hint(panel, "1053px no Figma; o preview rola na horizontal (use 1366). Clique no .Head para ordenar; o checkbox do cabeçalho marca a página.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["empty","Empty"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.section(panel, "Booleans");
    [["show-toolbar","Show Toolbar"],["show-pagination","Show Pagination"],["selectable","Coluna Checkbox"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Dados");
    kit.toggle(panel, { label: "Usar dados de exemplo (23 linhas)", checked: false, onChange: function(on){
      if (!on){ p._columns = null; p._rows = null; p.render(); return; }
      var cat = ["Alimentação","Refeição","Mobilidade","Saúde","Cultura"], ap = ["positive","warning","neutral"];
      p.columns = [{ key: "name", label: "Colaborador", kind: "text" }, { key: "saldo", label: "Saldo", kind: "balance" }, { key: "uso", label: "Uso", kind: "percentage" }, { key: "status", label: "Status", kind: "tag" }, { key: "acoes", label: "Ações", kind: "actions", sortable: false, width: 160 }];
      var rows = []; for (var i = 1; i <= 23; i++) rows.push({ id: "c" + i, name: { text: "Pessoa " + i, description: cat[i % 5] }, saldo: ((i * 137) % 1000) + ",00", uso: ((i * 7) % 100) + ",00", status: { label: ["Ativo","Pendente","Inativo"][i % 3], appearance: ap[i % 3], showLeadItem: false }, acoes: { actions: [{ icon: "edit-line", label: "Editar", action: "edit" }, { icon: "delete-line", label: "Excluir", action: "delete" }] } });
      p.rows = rows;
    } });
  }
});
} catch (e) { console.error("[cds] components/table/table.playground.js", e); }

/* ==== components/upload-item/upload-item.js ==== */
try {
/**
 * @deps spinner progress-line file-lead-item shaped-icon icon-button
 * <cds-upload-item> — Upload Item · File Upload · set 15029:1115 (Status Uploading|Success|Error|Uploaded)
 * 320 × 80 · Surface/default · stroke Border/semi-soft · raio large · pad 8 12 (Uploading/Success) / 0 12 · gap 8.
 *   Uploading: Loading (48, Surface/01, Spinner Small) + nome + "Enviando" + Progress Line
 *   Success:   .Lead item (View file · Image) + nome + Success message (Feedback/Positive/semi-intense) + download · delete
 *   Error:     Shaped Icon Warning Medium (warning-line) + nome + "Falha ao enviar" (Feedback/Warning/semi-intense) + refresh · delete
 *   Uploaded:  .Lead item (View file · File) + nome + Description + download · delete
 * Nome: Text Title + File Extension (Body/Regular Text/medium).
 * Atributos: status · text-title ("File name") · file-extension (".jpg") · success-message ("Enviado com sucesso")
 *   description ("Enviado em 10/05/2025") · error-message ("Falha ao enviar") · uploading-message ("Enviando") · percent (60)
 *   show-primary-action (delete) · show-secondary-action (download / refresh) · src (miniatura) · lead-appearance (image|file)
 * Eventos: cds-remove · cds-download · cds-retry · cds-view
 */
(function(){
  "use strict";
  class CdsUploadItem extends CDS.Element {
    static get observedAttributes(){ return ["status","text-title","file-extension","success-message","description","error-message","uploading-message","percent","show-primary-action","show-secondary-action","src","lead-appearance"]; }
    get status(){ var s = this.getAttribute("status"); return s === "success" || s === "error" || s === "uploaded" ? s : "uploading"; }
    render(){
      var self = this, st = this.status;
      if (this._st !== st){
        this._st = st; this.innerHTML = "";
        var fire = function(n){ return function(){ self.dispatchEvent(new CustomEvent(n, { bubbles: true })); }; };
        if (st === "uploading"){
          var ld = this.appendChild(CDS.create("div", null, "cds-ui__loading")); ld.appendChild(CDS.create("cds-spinner", { size: "small", label: "Enviando arquivo" }));
        } else if (st === "error"){
          this.appendChild(CDS.create("cds-shaped-icon", { size: "medium", appearance: "warning", icon: "warning-line" }));
        } else {
          this.lead = this.appendChild(CDS.create("cds-file-lead-item", null, "cds-ui__lead"));
        }
        var c = this.appendChild(CDS.create("div", null, "cds-ui__content"));
        var name = c.appendChild(CDS.create("div", null, "cds-ui__name"));
        this.titleEl = name.appendChild(CDS.create("span", null, "cds-ui__title")); this.extEl = name.appendChild(CDS.create("span", null, "cds-ui__ext"));
        this.msgEl = c.appendChild(CDS.create("span", { "aria-live": "polite" }, "cds-ui__msg"));
        if (st === "uploading") this.progress = c.appendChild(CDS.create("cds-progress-line", null, "cds-ui__progress"));
        else {
          var acts = this.actsEl = this.appendChild(CDS.create("div", null, "cds-ui__actions"));
          this.secBtn = acts.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: st === "error" ? "refresh-line" : "download-line" }));
          this.priBtn = acts.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "small", icon: "delete-line" }));
          this.secBtn.addEventListener("click", fire(st === "error" ? "cds-retry" : "cds-download"));
          this.priBtn.addEventListener("click", fire("cds-remove"));
        }
      }
      var title = this.text("text-title", "File name"), ext = this.text("file-extension", ".jpg");
      this.titleEl.textContent = title; this.extEl.textContent = ext;
      this.msgEl.textContent = st === "uploading" ? this.text("uploading-message", "Enviando") : st === "success" ? this.text("success-message", "Enviado com sucesso")
        : st === "error" ? this.text("error-message", "Falha ao enviar") : this.text("description", "Enviado em 10/05/2025");
      if (this.progress){ CDS.attr(this.progress, "percent", this.getAttribute("percent") || "60"); CDS.attr(this.progress, "label", "Enviando " + title + ext); }
      if (this.lead){ CDS.attr(this.lead, "appearance", this.getAttribute("lead-appearance") || (st === "success" ? "image" : "file")); CDS.attr(this.lead, "src", this.getAttribute("src")); CDS.attr(this.lead, "label", "Ver " + title + ext); }
      if (this.actsEl){
        this.priBtn.hidden = !this.flag("show-primary-action"); this.secBtn.hidden = !this.flag("show-secondary-action");
        this.actsEl.hidden = this.priBtn.hidden && this.secBtn.hidden; // Actions card some com Show primary action (como no Figma)
        CDS.attr(this.priBtn, "label", "Remover " + title + ext);
        CDS.attr(this.secBtn, "label", (st === "error" ? "Tentar de novo: " : "Baixar ") + title + ext);
      }
      CDS.attr(this, "status", st === "uploading" ? null : st);
      if (!this.parentElement || this.parentElement.getAttribute("role") !== "list") CDS.attr(this, "role", "group"); // na Upload List é listitem
      CDS.attr(this, "aria-label", title + ext);
    }
  }
  CdsUploadItem.define("cds-upload-item");
})();
} catch (e) { console.error("[cds] components/upload-item/upload-item.js", e); }

/* ==== components/upload-item/upload-item.playground.js ==== */
try {
/* Playground — Upload Item */
CDS.register({
  id: "upload-item", name: "Upload Item", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15029-1115",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-upload-item", {}); ctx.preview.appendChild(p);
    ["cds-remove","cds-download","cds-retry","cds-view"].forEach(function(n){ p.addEventListener(n, function(){ ctx.readout(n, false); }); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Status", value: "uploading", options: [["uploading","Uploading"],["success","Success"],["error","Error"],["uploaded","Uploaded"]], onChange: function(v){ kit.attr(p, "status", v === "uploading" ? null : v); } });
    kit.range(panel, { label: "Progresso (Uploading)", min: 0, max: 100, value: 60, onInput: function(v){ p.setAttribute("percent", v); } });
    kit.section(panel, "Booleans");
    [["show-primary-action","Show primary action"],["show-secondary-action","Show secondary action"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["text-title","Text Title","File name"],["file-extension","File Extension",".jpg"],["success-message","Success message","Enviado com sucesso"],["description","Description","Enviado em 10/05/2025"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
} catch (e) { console.error("[cds] components/upload-item/upload-item.playground.js", e); }

/* ==== components/upload-list/upload-list.js ==== */
try {
/**
 * @deps upload-item
 * <cds-upload-list> — Upload List · File Upload · componente 15465:1365
 * Coluna de Upload Items (gap 8). Slot "Upload itens": os filhos de quem usa; sem filhos, a amostra do Figma
 * (Uploading · Success · Error · Uploaded). Atributo: label (nome da lista · "Arquivos")
 */
(function(){
  "use strict";
  class CdsUploadList extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){
      if (!this._built){
        this._built = true; this.setAttribute("role", "list"); // antes dos itens: eles leem o role do pai
        if (!this.querySelector("cds-upload-item")) ["uploading","success","error","uploaded"].forEach(function(s){ this.appendChild(CDS.create("cds-upload-item", { status: s })); }, this);
      }
      this.setAttribute("role", "list"); CDS.attr(this, "aria-label", this.getAttribute("label") || "Arquivos");
      [].forEach.call(this.querySelectorAll(":scope > cds-upload-item"), function(i){ i.setAttribute("role", "listitem"); });
    }
  }
  CdsUploadList.define("cds-upload-list");
})();
} catch (e) { console.error("[cds] components/upload-list/upload-list.js", e); }

/* ==== components/upload-list/upload-list.playground.js ==== */
try {
/* Playground — Upload List */
CDS.register({
  id: "upload-list", name: "Upload List", category: "File Upload", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15465-1365",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-upload-list", {}); ctx.preview.appendChild(p);
    p.addEventListener("cds-remove", function(e){ e.target.remove(); ctx.readout("removido", false); });
    kit.hint(panel, "Amostra do Figma: um item de cada Status. O × remove o item (o evento é cds-remove).");
  }
});
} catch (e) { console.error("[cds] components/upload-list/upload-list.playground.js", e); }

/* ==== components/viewport-restriction/viewport-restriction.js ==== */
try {
/**
 * @deps —
 * <cds-viewport-restriction> — Viewport Restriction · Utilities · componente 5357:3899
 * Aviso de que o componente não está disponível no viewport atual (usado pelo Drawer e pelo Bottom Sheet).
 * Atributos: text (padrão "Componente não disponível nesse viewport")
 */
(function(){
  "use strict";
  class CdsViewportRestriction extends CDS.Element {
    static get observedAttributes(){ return ["text"]; }
    render(){ this.setAttribute("role", "note"); this.textContent = this.text("text", "Componente não disponível nesse viewport"); }
  }
  CdsViewportRestriction.define("cds-viewport-restriction");
})();
} catch (e) { console.error("[cds] components/viewport-restriction/viewport-restriction.js", e); }

/* ==== components/viewport-restriction/viewport-restriction.playground.js ==== */
try {
/* Playground — Viewport Restriction */
CDS.register({
  id: "viewport-restriction", name: "Viewport Restriction", category: "Utilities", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5357-3899",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-viewport-restriction", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "Usado pelo Drawer (mobile e tablet) e pelo Bottom Sheet (desktop) no lugar do componente.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text", value: "Componente não disponível nesse viewport", onInput: function(v){ p.setAttribute("text", v); } });
  }
});
} catch (e) { console.error("[cds] components/viewport-restriction/viewport-restriction.playground.js", e); }

/* ==== components/overlay/overlay.js ==== */
try {
/**
 * @deps header footer viewport-restriction backdrop
 * CDS.Overlay — base de Modal, Drawer e Bottom Sheet. Não é um elemento registrado.
 * Renderiza um <dialog class="cds-overlay"> (camada de topo, foco preso, Esc, retorno de foco nativos) com o
 * visual do Backdrop no ::backdrop. O Slot são os filhos de quem usa.
 *
 * Atributos comuns: open · inline (specimen no fluxo, sem dialog modal) · dismissible ("false" = Dialog: não fecha
 *   ao clicar fora nem com Esc, exige ação) · label (nome acessível quando não há título)
 * Métodos: show() · close()   Eventos: cds-open · cds-close · cds-action { action } (vindo do .Footer)
 */
(function(){
  "use strict";
  var uid = 0;
  class Overlay extends CDS.Element {
    static get observedAttributes(){ return ["open", "inline", "dismissible", "label"]; }
    // ganchos
    buildPanel(dlg, slot){}      // monta header/slot/footer dentro do dialog
    updatePanel(){}

    render(){
      var self = this;
      if (!this._built){
        this._built = true; this._id = "cds-ov-" + (++uid);
        var nodes = [].slice.call(this.childNodes);
        this.innerHTML = "";
        var dlg = this.dialog = CDS.create("dialog", null, "cds-overlay " + this.panelClass);
        var slot = this.slotEl = CDS.create("div", null, "cds-overlay__slot");
        nodes.forEach(function(n){ slot.appendChild(n); });
        this.buildPanel(dlg, slot);
        this.appendChild(dlg);
        dlg.addEventListener("cds-close", function(e){ if (e.target !== self){ e.stopPropagation(); self.close(); } });
        // Esc: o estado é sincronizado aqui (o evento close do dialog é assíncrono e pode atrasar)
        dlg.addEventListener("cancel", function(e){ e.preventDefault(); if (self.dismissible) self.close(); });
        // fallback: fechado por fora (form method="dialog", dialog.close() direto)
        dlg.addEventListener("close", function(){ if (self.hasAttribute("open")){ self._closing = true; self.removeAttribute("open"); self._closing = false; self.fireClose(); } });
        // clique no Backdrop (fora do painel) fecha, salvo dismissible="false"
        dlg.addEventListener("click", function(e){
          if (e.target !== dlg || !self.dismissible || self.hasAttribute("inline")) return;
          var r = dlg.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) self.close();
        });
      }
      var dlg = this.dialog, inline = this.hasAttribute("inline");
      dlg.classList.toggle("is-inline", inline);
      var title = this.titleText;
      if (title) dlg.setAttribute("aria-label", title); else if (this.getAttribute("label")) dlg.setAttribute("aria-label", this.getAttribute("label"));
      this.updatePanel();
      if (inline){ if (!dlg.open) dlg.setAttribute("open", ""); return; }
      if (dlg.open && !dlg.matches(":modal")) dlg.close(); // saiu do modo inline
      var want = this.hasAttribute("open");
      if (want && !dlg.open){ dlg.showModal(); this.dispatchEvent(new CustomEvent("cds-open", { bubbles: true })); }
      else if (!want && dlg.open && !this._closing){ dlg.close(); this.fireClose(); }
    }
    fireClose(){ this.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); }
    get titleText(){ return this.getAttribute("title"); }
    // dismissible="false" = padrão Dialog (só fecha por ação). O Drawer sempre fecha (decisão do Gustavo, C38)
    get dismissible(){ return this.getAttribute("dismissible") !== "false"; }
    show(){ this.setAttribute("open", ""); }
    close(){ if (this.hasAttribute("inline")) return; this.removeAttribute("open"); }
  }
  CDS.Overlay = Overlay;
})();
} catch (e) { console.error("[cds] components/overlay/overlay.js", e); }

/* ==== components/bottom-sheet/bottom-sheet.js ==== */
try {
/**
 * @deps overlay header footer viewport-restriction
 * <cds-bottom-sheet> — Bottom Sheet · Bottom Sheet · componente 20848:2679 · [MOBILE ONLY]
 * Handle Container (pad 8 0 · handle 40×4 Icons/soft) + .Header + Slot + .Footer Pilled. Raio 16 16 0 0.
 * O handle indica que dá para arrastar para baixo e fechar (arrastar além de 1/3 da altura fecha).
 * Viewport: no Figma, o Viewport Restriction cobre o sheet só quando Common/Is Desktop é verdadeiro (CONFERIR C35).
 *
 * Atributos: open · inline · dismissible · text-title · show-header · show-footer · show-close-button
 *   primary-label · secondary-label · show-secondary-action-button · viewport · label
 */
(function(){
  "use strict";
  class CdsBottomSheet extends CDS.Overlay {
    static get observedAttributes(){ return CDS.Overlay.observedAttributes.concat(["text-title","show-header","show-footer","show-close-button","primary-label","secondary-label","show-secondary-action-button","viewport"]); }
    get panelClass(){ return "cds-sheet"; }
    buildPanel(dlg, slot){
      var self = this;
      var hc = dlg.appendChild(CDS.create("div", { "aria-hidden": "true" }, "cds-sheet__handle-box"));
      hc.appendChild(CDS.create("span", null, "cds-sheet__handle"));
      this.headerEl = dlg.appendChild(CDS.create("cds-header", { "show-divider": "false" }));
      dlg.appendChild(slot);
      this.footerEl = dlg.appendChild(CDS.create("cds-footer", { kind: "pilled", "show-divider": "false" }));
      this.restrictEl = dlg.appendChild(CDS.create("cds-viewport-restriction", null, "cds-sheet__restriction"));
      // arrastar para fechar
      var y0 = null, dy = 0;
      hc.addEventListener("pointerdown", function(e){ if (self.hasAttribute("inline")) return; y0 = e.clientY; dy = 0; hc.setPointerCapture(e.pointerId); dlg.classList.add("is-dragging"); });
      hc.addEventListener("pointermove", function(e){ if (y0 == null) return; dy = Math.max(0, e.clientY - y0); dlg.style.transform = "translateY(" + dy + "px)"; });
      function end(){
        if (y0 == null) return; y0 = null; dlg.classList.remove("is-dragging"); dlg.style.transform = "";
        if (dy > dlg.offsetHeight / 3 && self.dismissible) self.close();
      }
      hc.addEventListener("pointerup", end); hc.addEventListener("pointercancel", end);
    }
    get titleText(){ return this.flag("show-header") ? this.text("text-title", "Title") : null; }
    updatePanel(){
      var h = this.headerEl, f = this.footerEl, self = this;
      h.hidden = !this.flag("show-header"); h.setAttribute("text-title", this.text("text-title", "Title"));
      h.setAttribute("show-close-button", String(this.flag("show-close-button")));
      f.hidden = !this.flag("show-footer");
      ["primary-label","secondary-label","show-secondary-action-button"].forEach(function(a){ if (self.hasAttribute(a)) f.setAttribute(a, self.getAttribute(a)); else f.removeAttribute(a); });
    }
  }
  CdsBottomSheet.define("cds-bottom-sheet");
})();
} catch (e) { console.error("[cds] components/bottom-sheet/bottom-sheet.js", e); }

/* ==== components/bottom-sheet/bottom-sheet.playground.js ==== */
try {
/* Playground — Bottom Sheet */
CDS.register({
  id: "bottom-sheet", name: "Bottom Sheet", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20848-2679",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-bottom-sheet", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:var(--common-sizes-8) 0;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "<b>Mobile only.</b> No desktop o Viewport Restriction cobre o sheet (Common/Is Desktop); escolha 360 no topo. Aberto de verdade, arraste o handle para baixo para fechar.",
      booleans: [["show-header","Show Header"],["show-footer","Show Footer"],["show-close-button","Show Close Button (.Header)"],["dismissible","Dismissible (fecha no Backdrop, Esc e arrasto)"]],
      texts: [["text-title","Text Title","Title"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
} catch (e) { console.error("[cds] components/bottom-sheet/bottom-sheet.playground.js", e); }

/* ==== components/drawer/drawer.js ==== */
try {
/**
 * @deps overlay header footer viewport-restriction
 * <cds-drawer> — Drawer · Drawers · componente 16456:4381
 * Description do Figma: painel deslizante que surge da direita, sempre sobre um Backdrop; para conteúdo mais denso que o
 * Modal (formulários maiores, detalhes, configurações). Header obrigatório (título + fechar) · Slot obrigatório ·
 * Action Buttons opcionais (secundária + primária). Não usar para confirmações rápidas (Modal), navegação ou fluxos em etapas.
 * 640 de largura (min 640) · pad 0 20 · Elevation/level 1 · Surface/default.
 * Header (pad 12 0 · Title Body/Bold · Close Button Ghost Neutral) + Slot + Action Buttons (pad Grids/gutter 0 · gap 8 · botões até 320).
 * Só desktop: no Figma, Specific/Drawer/Is Mobile e Is Tablet escondem o painel e mostram um Viewport Restriction.
 * Aqui o modo vem do atributo viewport ou do [data-viewport] mais próximo (seletor de viewport do playground).
 *
 * Sempre com Backdrop e sempre fecha ao clicar fora ou no Esc (decisão do Gustavo, 02/10 · C38): não aceita dismissible.
 * Atributos: open · inline · text-title ("Title") · show-action-buttons · show-secondary-action-button (padrão ligado, como no Figma)
 *   primary-label · secondary-label
 *   viewport (desktop|tablet|mobile) · label
 */
(function(){
  "use strict";
  class CdsDrawer extends CDS.Overlay {
    static get observedAttributes(){ return CDS.Overlay.observedAttributes.concat(["text-title","show-action-buttons","show-secondary-action-button","primary-label","secondary-label","viewport"]); }
    get panelClass(){ return "cds-drawer"; }
    buildPanel(dlg, slot){
      var p = this.panelEl = dlg.appendChild(CDS.create("div", null, "cds-drawer__panel"));
      this.headerEl = p.appendChild(CDS.create("cds-header", { "show-divider": "false" }));
      p.appendChild(slot);
      this.footerEl = p.appendChild(CDS.create("cds-footer", { kind: "horizontal", "show-divider": "false" }));
      this.restrictEl = dlg.appendChild(CDS.create("cds-viewport-restriction", null, "cds-drawer__restriction"));
    }
    get titleText(){ return this.text("text-title", "Title"); }
    get dismissible(){ return true; }
    updatePanel(){
      var f = this.footerEl, self = this;
      this.headerEl.setAttribute("text-title", this.text("text-title", "Title"));
      f.hidden = !this.flag("show-action-buttons");
      ["primary-label","secondary-label","show-secondary-action-button"].forEach(function(a){ if (self.hasAttribute(a)) f.setAttribute(a, self.getAttribute(a)); else f.removeAttribute(a); });
    }
  }
  CdsDrawer.define("cds-drawer");
})();
} catch (e) { console.error("[cds] components/drawer/drawer.js", e); }

/* ==== components/drawer/drawer.playground.js ==== */
try {
/* Playground — Drawer */
CDS.register({
  id: "drawer", name: "Drawer", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16456-4381",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-drawer", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:var(--common-sizes-8) 0;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "Só desktop: no viewport 360 ou 744 o painel some e aparece o Viewport Restriction, como no Figma. O botão abre o Drawer pela direita; ele sempre fecha ao clicar no Backdrop ou no Esc.",
      booleans: [["show-action-buttons","Show Action Buttons"],["show-secondary-action-button","Show Secondary Action Button"]],
      texts: [["text-title","Text Title","Title"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
} catch (e) { console.error("[cds] components/drawer/drawer.playground.js", e); }

/* ==== components/modal/modal.js ==== */
try {
/**
 * @deps overlay header footer
 * <cds-modal> — Modal · Modals · componente 16362:3267
 * .Header (sem Divider) + Slot + .Footer Horizontal (sem Divider). Surface/default · raio medium · Elevation/level 2.
 * Largura: abraça o conteúdo, sem limite (min 272 · C34/C58); --cds-modal-width fixa uma largura. Sempre com o Backdrop (::backdrop do <dialog>).
 * Padrão Dialog (description do Figma): show-close-button="false" + dismissible="false" — só fecha por uma ação.
 *
 * Atributos: open · inline · dismissible · text-title ("Title") · show-header · show-footer · show-close-button
 *   show-header-divider · show-footer-divider (desligados por padrão, como no Figma; liga só se precisar · C37)
 *   primary-label · secondary-label · show-secondary-action-button · show-lead-icon (botões do .Footer) · label
 * Os filhos são o Slot. Eventos: cds-open · cds-close · cds-action { action }
 */
(function(){
  "use strict";
  class CdsModal extends CDS.Overlay {
    static get observedAttributes(){ return CDS.Overlay.observedAttributes.concat(["text-title","show-header","show-footer","show-close-button","primary-label","secondary-label","show-secondary-action-button","show-header-divider","show-footer-divider","show-lead-icon"]); }
    get panelClass(){ return "cds-modal"; }
    buildPanel(dlg, slot){
      this.headerEl = dlg.appendChild(CDS.create("cds-header", { "show-divider": "false" }));
      dlg.appendChild(slot);
      this.footerEl = dlg.appendChild(CDS.create("cds-footer", { kind: "horizontal", "show-divider": "false" }));
    }
    get titleText(){ return this.flag("show-header") ? this.text("text-title", "Title") : null; }
    updatePanel(){
      var h = this.headerEl, f = this.footerEl, self = this;
      h.hidden = !this.flag("show-header"); h.setAttribute("text-title", this.text("text-title", "Title"));
      h.setAttribute("show-close-button", String(this.flag("show-close-button")));
      f.hidden = !this.flag("show-footer");
      h.setAttribute("show-divider", String(this.hasAttribute("show-header-divider") && this.getAttribute("show-header-divider") !== "false"));
      f.setAttribute("show-divider", String(this.hasAttribute("show-footer-divider") && this.getAttribute("show-footer-divider") !== "false"));
      ["primary-label","secondary-label","show-secondary-action-button","show-lead-icon"].forEach(function(a){ if (self.hasAttribute(a)) f.setAttribute(a, self.getAttribute(a)); else f.removeAttribute(a); });
    }
  }
  CdsModal.define("cds-modal");
})();
} catch (e) { console.error("[cds] components/modal/modal.js", e); }

/* ==== components/modal/modal.playground.js ==== */
try {
/* Playground — Modal */
CDS.register({
  id: "modal", name: "Modal", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16362-3267",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-modal", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:var(--common-sizes-8) 0;width:280px;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "Specimen no fluxo, como no Figma. A largura abraça o conteúdo (aqui, um texto de 280 + padding 20). O botão abre o Modal de verdade, com o Backdrop. Padrão Dialog: desligue Show Close Button e Dismissible.",
      booleans: [["show-header","Show Header"],["show-footer","Show Footer"],["show-close-button","Show Close Button (.Header)"],["dismissible","Dismissible (fecha no Backdrop e no Esc)"],["show-header-divider","Show Divider (.Header)",false],["show-footer-divider","Show Divider (.Footer)",false]],
      texts: [["text-title","Text Title","Title"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
} catch (e) { console.error("[cds] components/modal/modal.playground.js", e); }

/* ==== components/modal-date-picker/modal-date-picker.js ==== */
try {
/**
 * @deps modal date-picker viewport-restriction
 * <cds-modal-date-picker> — Modal Date Picker · Datepicker · set 17560:51555 (Kind × Role None|Single|Range Date Select)
 * Modal (.Header "Selecione uma data", sem Close Button nem Divider) + Date Picker no Slot + .Footer Horizontal
 * (Cancelar · Confirmar). Single 320 / Double 620 de largura (o Modal abraça o conteúdo).
 * Só desktop: Viewport Restriction cobre o modal com Common/Is Mobile e Common/Is Tablet (como no Figma).
 * A data só é aplicada no Confirmar; Cancelar, Esc e o Backdrop descartam.
 *
 * Atributos: open · inline · kind (single|double) · role-kind (none|single|range — Role do Figma; padrão none = range sem seleção)
 *   value / start / end (AAAA-MM-DD) · min · max · today · month · viewport
 *   text-title ("Selecione uma data") · primary-label ("Confirmar") · secondary-label ("Cancelar")
 * Métodos: show() · close()   Eventos: cds-change { value } ou { start, end } (no Confirmar) · cds-close
 */
(function(){
  "use strict";
  class CdsModalDatePicker extends CDS.Element {
    static get observedAttributes(){ return ["open","inline","kind","role-kind","value","start","end","min","max","today","month","text-title","primary-label","secondary-label"]; }
    get mode(){ return this.getAttribute("role-kind") === "single" ? "single" : "range"; }
    render(){
      var self = this;
      if (!this._built){
        this._built = true; this.innerHTML = "";
        this.picker = CDS.create("cds-date-picker");
        this.restrict = CDS.create("cds-viewport-restriction", null, "cds-mdp__restriction");
        this.modal = CDS.create("cds-modal", { "show-close-button": "false", "show-lead-icon": "false" }, "cds-mdp__modal"); // botões sem Lead Icon, como no Figma
        this.modal.appendChild(this.picker); this.modal.appendChild(this.restrict);
        this.appendChild(this.modal);
        this.modal.addEventListener("cds-action", function(e){
          e.stopPropagation();
          if (e.detail.action === "primary") self.confirm(); else self.close();
        });
        this.modal.addEventListener("cds-close", function(e){ if (e.target === self.modal){ e.stopPropagation(); self.removeAttribute("open"); self.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); } });
        this.picker.addEventListener("cds-change", function(e){ e.stopPropagation(); }); // só vale no Confirmar
      }
      var m = this.modal, p = this.picker, self2 = this;
      CDS.attr(m, "text-title", this.text("text-title", "Selecione uma data"));
      CDS.attr(m, "primary-label", this.text("primary-label", "Confirmar"));
      CDS.attr(m, "secondary-label", this.text("secondary-label", "Cancelar"));
      CDS.attr(m, "inline", this.hasAttribute("inline") ? "" : null);
      CDS.attr(this, "kind", this.getAttribute("kind") === "double" ? "double" : null);
      if (!this.hasAttribute("open") || !this._wasOpen){ // ao abrir, o calendário parte do valor confirmado
        CDS.attr(p, "mode", this.mode);
        ["kind","min","max","today","month","value","start","end"].forEach(function(a){ CDS.attr(p, a, self2.getAttribute(a)); });
      }
      var open = this.hasAttribute("open");
      if (open && !this._wasOpen){ this._wasOpen = true; m.show(); }
      else if (!open && this._wasOpen){ this._wasOpen = false; m.close(); }
    }
    confirm(){
      var p = this.picker, d;
      if (this.mode === "single"){ d = { value: p.getAttribute("value") || "" }; CDS.attr(this, "value", d.value || null); }
      else { d = { start: p.getAttribute("start") || "", end: p.getAttribute("end") || "" }; CDS.attr(this, "start", d.start || null); CDS.attr(this, "end", d.end || null); }
      this.dispatchEvent(new CustomEvent("cds-change", { detail: d, bubbles: true }));
      this.close();
    }
    show(){ this.setAttribute("open", ""); }
    close(){ this.removeAttribute("open"); }
  }
  CdsModalDatePicker.define("cds-modal-date-picker");
})();
} catch (e) { console.error("[cds] components/modal-date-picker/modal-date-picker.js", e); }

/* ==== components/modal-date-picker/modal-date-picker.playground.js ==== */
try {
/* Playground — Modal Date Picker */
CDS.register({
  id: "modal-date-picker", name: "Modal Date Picker", category: "Datepicker", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17560-51555",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, attrs = { month: "2026-01" };
    var spec = kit.el("cds-modal-date-picker", Object.assign({ inline: "", open: "" }, attrs)), live = kit.el("cds-modal-date-picker", attrs);
    ctx.preview.appendChild(spec); ctx.preview.appendChild(live);
    live.addEventListener("cds-change", function(e){ ctx.readout(e.detail.value || (e.detail.start + " → " + e.detail.end), true); });
    kit.button(panel, { label: "Abrir de verdade", onClick: function(){ live.show(); } });
    kit.hint(panel, "Só desktop: no 360 e no 744 o Viewport Restriction cobre o modal. A data só vale no Confirmar.");
    function set(k, v){ [spec, live].forEach(function(n){ kit.attr(n, k, v); }); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "single", options: [["single","Single Calendar"],["double","Double Calendar"]], onChange: function(v){ set("kind", v === "single" ? null : v); } });
    kit.seg(panel, { label: "Role", value: "none", options: [["none","None Selected"],["single","Single Date"],["range","Range Date"]], onChange: function(v){
      set("role-kind", v === "none" ? null : v); set("value", v === "single" ? "2026-01-13" : null); set("start", v === "range" ? "2026-01-13" : null); set("end", v === "range" ? "2026-01-24" : null);
      spec.removeAttribute("open"); spec.setAttribute("open", ""); } });
  }
});
} catch (e) { console.error("[cds] components/modal-date-picker/modal-date-picker.playground.js", e); }

/* ==== resources/animations/animations.js ==== */
try {
/* Recurso de suporte — Animações. Fonte ainda não indicada (🟡 pedir o link da lib ao Gustavo). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "animations", name: "Animações", resource: true, order: 4, status: "a definir" });
  CDS.docs["animations"] = {
    tabs: [
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Animações" },
        { p: "Espaço reservado para a lib de animações. Nada foi importado ainda." },
        { specs: [
          { title: "Status", rows: [["Fonte", "A indicar (link da lib no Figma)"], ["No repo", "Nada ainda"]] }
        ] },
        { note: "Não confundir com os Motion Styles (transições de estado), que vêm do Caju Theme." }
      ] }
    ]
  };
})();
} catch (e) { console.error("[cds] resources/animations/animations.js", e); }

/* ==== resources/caju-theme/caju-theme.js ==== */
try {
/* Recurso de suporte — Caju Theme (Zx9KwwRFqZrOfeuXpYZiTx): tokens Common/*, text styles, elevations e Motion Styles,
   mais as libs de apoio [Caju] Icons e [Caju] Illustrations (antes recursos separados; as rotas antigas redirecionam).
   Mostruário no estilo da página Caju Benefícios (4309:2) — Colors, Font, Borders, Sizes, Elevations, Opacity, Motion —
   adaptado para web responsivo. Os valores vêm ao vivo de styles/tokens.css (bloco `tokens`, scripts/tokens-kit.js). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Zx9KwwRFqZrOfeuXpYZiTx/-Caju--Theme?node-id=4309-2";
  CDS.register({ id: "caju-theme", name: "Caju Theme", resource: true, order: 1, status: "250", figma: FIGMA });
  // Rotas antigas de Ícones e Ilustrações → tabs do Caju Theme (links salvos continuam funcionando)
  var MOVED = { "caju-icons": "icones", "caju-illustrations": "ilustracoes" };
  function moved(){ var m = (location.hash || "").match(/^#\/(caju-icons|caju-illustrations)(?:\/([\w-]+))?/); if (m) location.replace("#/caju-theme/" + MOVED[m[1]]); }
  moved(); window.addEventListener("hashchange", moved);
  var A = window.CDS.assets || {};
  var nIcons = (A.iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; }).reduce(function(t, b){ return t + b.icons.length; }, 0);
  var nIlls = (A.illustrations || []).length, nCats = (A.illustrationBuckets || []).length;
  var LIVE = "Os valores são lidos ao vivo dos tokens do playground: troque o tema (ícone de lua no topo) para ver os valores do dark. Clique numa amostra para copiar a variável CSS.";
  CDS.docs["caju-theme"] = {
    source: FIGMA, sourceLabel: "Abrir o Caju Theme no Figma",
    tabs: [
      { id: "cores", title: "Cores", blocks: [
        { h2: "Cores" },
        { p: "Tokens de cor `Common/Colors/*`, por família. " + LIVE },
        { tokens: "colors" }
      ] },
      { id: "tipografia", title: "Tipografia", blocks: [
        { h2: "Font" },
        { p: "Primitivos de tipografia `Common/Font/*`: família, tamanho, altura de linha e peso." },
        { tokens: "font" },
        { h2: "Text styles" },
        { p: "Os estilos de texto combinam os primitivos e são aplicados com o shorthand `font: var(--text-style-…)`." },
        { tokens: "text-styles" }
      ] },
      { id: "bordas", title: "Bordas", blocks: [
        { h2: "Borders" },
        { p: "Raio (`Common/Border/Radius/*`) e espessura (`Common/Border/Width/*`)." },
        { tokens: "radius" },
        { tokens: "width" }
      ] },
      { id: "tamanhos", title: "Tamanhos", blocks: [
        { h2: "Sizes" },
        { p: "Escala `Common/Sizes/*`, usada em espaçamentos, gaps e dimensões." },
        { tokens: "sizes" }
      ] },
      { id: "elevacao", title: "Elevação e opacidade", blocks: [
        { h2: "Elevations" },
        { p: "Sombras `Common/Elevation/level 1–3` (x · y · blur · spread · cor)." },
        { tokens: "elevation" },
        { h2: "Opacity" },
        { p: "Níveis `Common/Opacity/*`. Como no Figma, cada amostra compara imagem e cor sólida (`Accent/Solid/medium`) sob uma camada `Support/darker` na opacidade do token." },
        { tokens: "opacity" }
      ] },
      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Duração, easing e delay definem cada momento de interação. Os componentes usam os Motion Styles (`/01`), que descem a cascata até os primitivos `Common/Motion/*`. Baseado no explicador castanhads-motion, refeito com os componentes do Castanha DS." },
        { tokens: "motion-live" },
        { tokens: "easing-lab" },
        { h2: "Referência" },
        { p: "Primitivos `Common/Motion/*`. Passe o mouse ou clique para ver cada um em movimento; \"Tocar todas\" compara a lista inteira." },
        { tokens: "duration" },
        { tokens: "delay" },
        { tokens: "easing" }
      ] },
      { id: "icones", title: "Ícones", blocks: [
        { h2: "Ícones" },
        { p: "[Caju] Icons, na ordem e nas categorias do Figma: " + nIcons + " ícones de 24px, um vetor só e cor herdada do token (`Icons/*`). Passe o mouse para ver as palavras-chave; clique para copiar o nome." },
        { iconGallery: {} },
        { h2: "Deprecated" },
        { p: "Ícones do frame [Deprecated] do Figma. Os arquivos continuam no repo, mas não aparecem no instance swap dos componentes." },
        { iconGallery: { only: "deprecated" } },
        { h3: "Como usar" },
        { ul: [
          "O [Caju] Icons é a fonte dos desenhos; o componente Icon (`<cds-icon icon=\"credit-card-line\">`) aplica tamanho, Appearance e cor.",
          "Arquivos em `assets/icons/<categoria>/<nome>.svg`, catálogo em `assets/icons/catalog.json`.",
          "Atualizar: exportar do Figma (receita em `docs/ARCHITECTURE.md` §8) e rodar `node scripts/build-assets.js`.",
          "Glifos internos de componentes (ex.: o check do Checkbox) não são da lib: ficam em `assets/icons/_glyphs/`."
        ] }
      ] },
      { id: "ilustracoes", title: "Ilustrações", blocks: [
        { h2: "Ilustrações" },
        { p: "[Caju] Illustrations, na ordem e nas categorias do Figma: " + nIlls + " ilustrações em " + nCats + " categorias (Caju UI 200×200 e Hero). Passe o mouse para ver o nome no Figma e o tamanho; clique para copiar o nome." },
        { illustrationGallery: {} },
        { h3: "Como usar" },
        { ul: [
          "Quem usa a ilustração é o componente: Banner (`<cds-banner illustration=\"notificacoes/sino\">`) e Table (Kind=Empty, `notificacoes/empty-state`).",
          "Nome `<categoria>/<nome>`; só `<nome>` também funciona (pega a primeira categoria).",
          "Arquivos em `assets/illustrations/<categoria>/<nome>.svg`, catálogo em `assets/illustrations/catalog.json`.",
          "Atualizar: exportar SVG das páginas Caju UI e Hero, rodar `python3 scripts/dev/import-illustrations.py <pasta> <listing.tsv>` e `node scripts/build-assets.js`.",
          "A página Cartões do Figma é o componente Caju Card: as artes dele ficam em `assets/caju-card/` (D65)."
        ] },
        { note: "Nomes repetidos no Figma (ex.: três `moeda-verde-pilha-2` em Finanças) ganharam sufixo `-1`, `-2` no repo. Estão no CONFERIR para corrigir na origem." }
      ] },
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Caju Theme" },
        { p: "Fonte de tudo que os componentes usam por baixo: tokens (cores, tipografia, bordas, tamanhos, elevações, opacidade e motion, em light e dark), ícones e ilustrações." },
        { h3: "O que tem" },
        { ul: ["250 tokens `Common/*` (89 com valor dark)", "34 text styles, incluindo Decorative em Work Sans", "3 elevações (`Elevation/level 1–3`)", "15 variáveis de Motion Styles (`.Motion Styles`, modo Normal)"] },
        { h3: "No repo" },
        { ul: ["Snapshot: `tokens/figma-snapshot.json`", "Gerado: `styles/tokens.css`", "Tema escuro: `html[data-theme=\"dark\"]`"] },
        { h3: "Atualizar" },
        { ol: ["Atualizar o snapshot a partir do Figma", "Rodar `node scripts/build-tokens.js`"] },
        { h3: "Nomenclatura no código" },
        { ul: [
          "`Common/Colors/Text/intense` → `--common-colors-text-intense`",
          "`Label/Medium Label` → `--text-style-label-medium` (shorthand `font`)",
          "`Hover In/01/Timing` → `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`"
        ] },
        { note: "A página Caju Benefícios do Figma mostra a paleta primitiva da marca (ex.: Decorative 01–06, Overlay). Aqui aparecem os tokens `Common/*` que os componentes usam — é a camada semântica que aponta para essa paleta." }
      ] }
    ]
  };
})();
} catch (e) { console.error("[cds] resources/caju-theme/caju-theme.js", e); }
