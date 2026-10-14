/* GERADO por scripts/build-index.js · 122 arquivos em ordem de dependência · não editar (o fonte é o arquivo de cada pasta) */
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

/* ==== components/card/card.js ==== */
try {
/**
 * @deps —
 * <cds-card> — Card · Containers · set 5256:540
 * Container com Slot: os filhos de quem usa são o conteúdo. Has Border liga o stroke Border/semi-soft.
 * Atributos: has-border (padrão True, como na lib — Has Border=True é a variante padrão; "false" desliga · decisão de 05/10, C155)
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

/* ==== components/filter-chip/filter-chip.js ==== */
try {
/**
 * @deps chip
 * <cds-filter-chip> — Filter Chips · Selection Controls · set 12365:2744
 * Toggle: o clique alterna Is Selected (aria-pressed). Selecionado troca o Lead Icon pelo check-line.
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · selected · disabled
 *   size (medium | small · padrão medium) — Size da branch CDS-1599: Small = 32 de altura, o resto igual ao Medium
 * Evento: cds-change { selected }
 */
(function(){
  "use strict";
  class CdsFilterChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "selected", "disabled", "size"]; }
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

/* ==== components/input-chip/input-chip.js ==== */
try {
/**
 * @deps chip
 * <cds-input-chip> — Input Chips · Selection Controls · set 12365:2728
 * Entidade removível: clicar no chip inteiro remove (o alvo é o chip de 40px, não o ícone de 16px — WCAG 2.5.8).
 *
 * Atributos (padrões do Figma): label ("Label") · icon (Lead Icon, "placeholder-line") · show-lead-icon · disabled
 *   size (medium | small · padrão medium) — Size da branch CDS-1599: Small = 32 de altura, o resto igual ao Medium
 * Evento: cds-remove (cancelável) { label, keyboard } — sem preventDefault() o chip se remove do DOM. O chip sozinho não move o foco
 *   (como o Chips.Input do castanha-react); o Multi Select Input segue a regra do SelectInput do React (D145).
 */
(function(){
  "use strict";
  class CdsInputChip extends CDS.Element {
    static get observedAttributes(){ return ["label", "icon", "show-lead-icon", "disabled", "size"]; }
    get button(){ return this._btn; }
    render(){
      var self = this, label = this.text("label", "Label");
      if (!this._btn){
        this._btn = CDS.create("button", { type: "button" }, "cds-chip");
        // detail.keyboard: Enter/Espaço geram click com e.detail 0 — quem usa decide o foco (como o Chips.Input do castanha-react)
        this._btn.addEventListener("click", function(e){
          var ev = new CustomEvent("cds-remove", { detail: { label: self.text("label", "Label"), keyboard: e.detail === 0 }, bubbles: true, cancelable: true });
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

/* ==== components/carousel/carousel.js ==== */
try {
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
        s.scrollTo({ left: it.offsetLeft - s.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
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
} catch (e) { console.error("[cds] components/carousel/carousel.js", e); }

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

/* ==== components/progress-tracker-item/progress-tracker-item.js ==== */
try {
/**
 * @deps icon link
 * <cds-progress-tracker-item> — Progress Tracker Item · Progress Indicators · set 14415:3778 (Kind Number|Icon × Status)
 * Marker (32, pill, pad 4) + Connector (2px) à esquerda · gap 16 · Text section (pad 8 0 · gap 8): Label (Label/Medium Text/intense) ·
 * Description (Caption/Regular Text/medium) · Link (Neutral, navigation-right-line).
 *   Pending: Marker Neutral/Solid/semi-soft · Current: Surface/default + anel 2px Accent/Solid/medium ·
 *   Completed: Surface/accent + check-line, Connector Surface/accent (nos outros, Neutral/Solid/semi-soft).
 * Orientation=Horizontal (set 14415:3778): coluna gap 8 — linha do Marker (32 + gap 8 + Connector 2 que preenche) e o Text section embaixo;
 *   200 de largura · Description maxHeight 88. Só CSS: o atributo orientation troca o layout.
 * Atributos: kind (number|icon) · orientation (vertical|horizontal) · status (pending|current|completed) · marker-label ("1") · marker-icon (placeholder-line)
 *   label ("Label") · description ("Description content") · show-description · show-connector · show-link
 *   link-label ("Link content") · href
 * Acessibilidade: a etapa atual leva aria-current="step"; o status entra no nome ("Etapa 2, atual: Label").
 */
(function(){
  "use strict";
  var STATUS = { pending: "pendente", current: "atual", completed: "concluída" };
  class CdsProgressTrackerItem extends CDS.Element {
    static get observedAttributes(){ return ["kind","orientation","status","marker-label","marker-icon","label","description","show-description","show-connector","show-link","link-label","href"]; }
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

/* ==== components/progress-tracker/progress-tracker.js ==== */
try {
/**
 * @deps progress-tracker-item
 * <cds-progress-tracker> — Progress Tracker · Progress Indicators · set 21470:2390 (Vertical = 14524:1024)
 * Lista vertical (gap 8) de Progress Tracker Items no Slot "Tracker". Sem filhos, a amostra do Figma:
 * 1 Completed · 2 Current (com Link) · 3 Pending (sem Connector).
 * Uso: filhos <cds-progress-tracker-item>; com current="n" a lista calcula os status (antes = completed, depois = pending),
 *   numera os marcadores e tira o Connector do último.
 * Orientation (set 21470:2390): vertical (200, coluna gap 8) | horizontal (linha gap 8, itens de 158 como no Figma).
 *   No Figma o container não propaga a Orientation para o Slot; aqui o container aplica a mesma orientation aos itens.
 * Atributos: current (1-based) · label (nome da lista · "Progresso") · orientation (vertical|horizontal, padrão vertical)
 */
(function(){
  "use strict";
  class CdsProgressTracker extends CDS.Element {
    static get observedAttributes(){ return ["current", "label", "orientation"]; }
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
      var cur = parseInt(this.getAttribute("current"), 10), items = this.items, horiz = this.getAttribute("orientation") === "horizontal";
      items.forEach(function(it, i){
        it.setAttribute("role", "listitem");
        CDS.attr(it, "orientation", horiz ? "horizontal" : null);
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

/* ==== components/skeleton/skeleton.js ==== */
try {
/**
 * @deps —
 * <cds-skeleton> — Skeleton · Utilities · set 20967:742 (Kind Round|Square)
 * Description do Figma: placeholder de carregamento que ocupa o espaço de um conteúdo enquanto ele não chegou. Para conteúdo
 * de forma previsível (avatar, imagem, card, bloco de texto): repita instâncias para reproduzir o layout final.
 * Não use para carregamento de ação, como botão em envio de formulário (use o Spinner).
 *
 * Anatomia: Shape (Round = elipse · Square = retângulo, raio Border/Radius/medium) com gradiente linear horizontal
 *   Neutral/Solid/semi-soft → Surface/default (50%) → Neutral/Solid/semi-soft.
 * Motion: brilho (shimmer) como no castanha-react, por decisão do Gustavo (C181; no Figma é estático): 700ms de deslocamento
 *   (Extra Long/01, Systemic/decelerate) + 500ms de pausa (Long/02), em loop. Sem animação com prefers-reduced-motion.
 * Dimensões: definidas por quem consome ("os tamanhos do Figma são amostra"). Padrão do playground: Round 80 × 80
 *   (Sizes/80, a amostra do Figma) · Square na largura do pai × Sizes/160.
 *
 * Atributos: kind (round | square · padrão round, como no Figma e no castanha-react) · width · height
 *   width/height aceitam número da escala de tamanhos ("48" → Common/Sizes/48), número em px ou valor CSS (ex.: "100%"),
 *   como o Skeleton do castanha-react.
 * A11y: decorativo (aria-hidden). Quem carrega marca o container com aria-busy="true" e anuncia quando o conteúdo chega.
 */
(function(){
  "use strict";
  var SIZES = { 0:1, 1:1, 2:1, 4:1, 6:1, 8:1, 12:1, 14:1, 16:1, 20:1, 24:1, 28:1, 32:1, 40:1, 44:1, 48:1, 56:1, 64:1, 72:1, 80:1, 88:1, 92:1, 104:1, 120:1, 160:1, 200:1 };
  function dim(v){
    if (v == null || v === "") return null;
    if (/^\d+$/.test(v)) return SIZES[v] ? "var(--common-sizes-" + v + ")" : v + "px"; // token da escala ou px
    return v;
  }
  class CdsSkeleton extends CDS.Element {
    static get observedAttributes(){ return ["kind", "width", "height"]; }
    render(){
      this.setAttribute("aria-hidden", "true");
      CDS.attr(this, "data-kind", this.getAttribute("kind") === "square" ? "square" : "round");
      var w = dim(this.getAttribute("width")), h = dim(this.getAttribute("height"));
      this.style.setProperty("--_w", w || ""); if (!w) this.style.removeProperty("--_w");
      this.style.setProperty("--_h", h || ""); if (!h) this.style.removeProperty("--_h");
    }
  }
  CdsSkeleton.define("cds-skeleton");
})();
} catch (e) { console.error("[cds] components/skeleton/skeleton.js", e); }

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

/* ==== components/main-button/main-button.js ==== */
try {
/**
 * @deps icon spinner
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
 *   loading             Is Loading (branch pIX8i38mYWwax98yIjPmJw, CDS-1603): o Spinner centralizado substitui o conteúdo,
 *                       o botão mantém a largura (conteúdo com visibility:hidden), fica com aria-busy e não dispara clique
 *   loading-label       nome acessível no loading · padrão "Carregando"
 * Spinner do loading (instâncias da branch): Medium 24 · Small 16. Cor: Default Accent → Inversed · Default Neutral e Inversed → Neutral
 *   · Ghost Accent → Accent · Ghost Neutral → Neutral · Ghost Inversed → Inversed
 */
(function(){
  "use strict";
  var SPIN = { "default-accent": "inversed", "default-neutral": "neutral", "default-inversed": "neutral", "ghost-accent": "accent", "ghost-neutral": "neutral", "ghost-inversed": "inversed" };
  function icon(name){ var i = document.createElement("cds-icon"); i.setAttribute("icon", name); i.setAttribute("size", "medium"); i.setAttribute("appearance", "neutral"); return i; }
  class CdsMainButton extends CDS.Element {
    static get observedAttributes(){ return ["label", "disabled", "lead-icon", "show-lead-icon", "trailing-icon", "show-trailing-icon", "type", "loading", "loading-label", "size", "kind", "appearance"]; }
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
      // Loading: Spinner centralizado por cima do conteúdo, que fica invisível e segura a largura
      var loading = this.hasAttribute("loading");
      CDS.attr(b, "aria-busy", loading ? "true" : null);
      CDS.attr(b, "aria-disabled", loading ? "true" : null);
      CDS.attr(b, "aria-label", loading ? (this.getAttribute("loading-label") || "Carregando") : null);
      if (loading){
        var key = (this.getAttribute("kind") === "ghost" ? "ghost" : "default") + "-" + (this.getAttribute("appearance") || "accent");
        b.appendChild(CDS.create("cds-spinner", { size: this.getAttribute("size") === "small" ? "small" : "medium", appearance: SPIN[key] || "neutral", "aria-hidden": "true" }, "cds-btn__spinner"));
      }
      if (!this._btn){
        var self = this;
        // no loading o botão continua focável (aria-disabled), mas o clique e o envio de formulário não acontecem
        b.addEventListener("click", function(e){ if (self.hasAttribute("loading")){ e.preventDefault(); e.stopPropagation(); } });
        this._btn = b; this.appendChild(b);
      }
    }
  }
  CdsMainButton.define("cds-main-button");
})();
} catch (e) { console.error("[cds] components/main-button/main-button.js", e); }

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

/* ==== components/sponsor-category/sponsor-category.js ==== */
try {
/**
 * @deps icon badge
 * <cds-sponsor-category> — .Category · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: item de navegação do Side Menu. Intent=Default navega direto; Intent=Accordion abre subitens
 * (.Subcategory) no Slot. Appearance=Accent nos atalhos, Neutral nas categorias. Um item selecionado por vez.
 *
 * Anatomia (set 5576:27, 224×40): fundo Surface/01, raio Border/Radius/small · Navigation Content pad 4 8 4 4, gap 4
 *   Lead Icon 32×32 (raio extra-small; selecionado ou accordion aberto: fundo Surface/accent e ícone Icons/inversed) · Label (Label/Medium, Text/intense; aberto, Label/Bold)
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
      var open = acc && this.expanded; // Figma: o accordion aberto só existe com Is Selected=True (ícone no Surface/accent)
      CDS.attr(this.iconEl, "appearance", sel || open ? "inversed" : accent ? "accent" : "neutral");
      this.badgeEl.hidden = this.getAttribute("show-badge") === "false";
      CDS.attr(this.badgeEl, "label", reduced ? "" : (this.getAttribute("badge-label") || "Novo"));
      CDS.attr(this.badgeEl, "viewport", "desktop"); // Figma: Badge de 16 (Reduced: sem texto), também no frame mobile
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
} catch (e) { console.error("[cds] components/sponsor-category/sponsor-category.js", e); }

/* ==== components/sponsor-subcategory/sponsor-subcategory.js ==== */
try {
/**
 * @deps icon badge
 * <cds-sponsor-subcategory> — .Subcategory · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: item de segundo nível, no Slot de um .Category com Intent=Accordion. Trailing Icon padrão é a seta
 * de navegação. Em recurso pago, troque a seta pela coroa no Trailing Icon, nunca as duas juntas.
 *
 * Anatomia (188×32): fundo Surface/01, raio Border/Radius/small, pad 0 8, gap 8 · Lead Icon · Label (Text/medium) · Badge · Trailing Icon
 *   States: Hovered Neutral/Opacity/Intense/semi-transparent e Label Text/intense · Pressed Surface/default · Disabled opacidade 0.4
 *
 * Atributos: label ("Label") · lead-icon (placeholder-line) · show-lead-icon · trailing-icon (navigation-right-line) · show-trailing-icon
 *   show-badge (padrão desligado) · badge-label ("Novo") · href · selected (página atual) · disabled · state (forçado: hovered|pressed)
 */
(function(){
  "use strict";
  class CdsSponsorSubcategory extends CDS.Element {
    static get observedAttributes(){ return ["label","lead-icon","show-lead-icon","trailing-icon","show-trailing-icon","show-badge","badge-label","href","selected","disabled","state"]; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        this.innerHTML = "";
        this.rowEl = this.appendChild(c("a", null, "cds-sps__row"));
        this.leadEl = this.rowEl.appendChild(c("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-sps__lead"));
        this.labelEl = this.rowEl.appendChild(c("span", null, "cds-sps__label"));
        this.badgeEl = this.rowEl.appendChild(c("cds-badge", { appearance: "warning" }, "cds-sps__badge"));
        this.trailEl = this.rowEl.appendChild(c("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-sps__trail"));
        this.rowEl.addEventListener("click", function(e){ if (self.hasAttribute("disabled")) e.preventDefault(); });
      }
      var on = function(n, d){ var v = self.getAttribute(n); return v == null ? d : v !== "false"; }, dis = this.hasAttribute("disabled"), href = this.getAttribute("href");
      this.labelEl.textContent = this.getAttribute("label") || "Label";
      CDS.attr(this.leadEl, "icon", this.getAttribute("lead-icon") || "placeholder-line");
      this.leadEl.hidden = !on("show-lead-icon", true);
      CDS.attr(this.trailEl, "icon", this.getAttribute("trailing-icon") || "navigation-right-line");
      this.trailEl.hidden = !on("show-trailing-icon", true);
      this.badgeEl.hidden = !on("show-badge", false);
      CDS.attr(this.badgeEl, "label", this.getAttribute("badge-label") || "Novo");
      CDS.attr(this.rowEl, "href", href && !dis ? href : null);
      CDS.attr(this.rowEl, "role", href && !dis ? null : "link");
      CDS.attr(this.rowEl, "tabindex", href && !dis ? null : "0");
      CDS.attr(this.rowEl, "aria-current", this.hasAttribute("selected") ? "page" : null);
      CDS.attr(this.rowEl, "aria-disabled", dis ? "true" : null);
    }
  }
  CdsSponsorSubcategory.define("cds-sponsor-subcategory");
})();
} catch (e) { console.error("[cds] components/sponsor-subcategory/sponsor-subcategory.js", e); }

/* ==== components/sponsor-user-profile/sponsor-user-profile.js ==== */
try {
/**
 * @deps avatar icon-button
 * <cds-sponsor-user-profile> — .User Profile · [CastanhaDS] Sponsor Templates (building block do Side Menu)
 * Description do Figma: rodapé de identificação do Side Menu: avatar, nome e CNPJ, com ação opcional (Show Icon Button).
 * Kind deriva do colapso do menu: Default (expandido) mostra os dados, Reduced (colapsado) mostra só o avatar.
 *
 * Anatomia: Default 288×92 · Reduced 40×92 · fundo Surface/01 · pad 24 0 · gap 16
 *   Avatar (Image · Small 40) · User Name (Label/Bold, Text/intense) · CNPJ (Caption/Medium, Text/medium) · Icon Button (Small · Default · Neutral)
 *
 * Atributos: kind (default|reduced) · user-name ("User Name") · cnpj ("00.000.000/0001-00") · src (foto) · show-icon-button · icon (menu-line, como no Figma)
 * Referência: iconBtn (Icon Button da ação). Evento: cds-action ao clicar no Icon Button.
 */
(function(){
  "use strict";
  class CdsSponsorUserProfile extends CDS.Element {
    static get observedAttributes(){ return ["kind","user-name","cnpj","src","show-icon-button","icon"]; }
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        this.innerHTML = "";
        this.avatarEl = this.appendChild(c("cds-avatar", { kind: "image", size: "small" }, "cds-spu__avatar"));
        var txt = this.textEl = this.appendChild(c("div", null, "cds-spu__text"));
        this.nameEl = txt.appendChild(c("span", null, "cds-spu__name"));
        this.cnpjEl = txt.appendChild(c("span", null, "cds-spu__cnpj"));
        this.iconBtn = this.appendChild(c("cds-icon-button", { kind: "default", appearance: "neutral", size: "small", label: "Opções da conta" }, "cds-spu__action"));
        this.iconBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-action", { bubbles: true })); });
      }
      var reduced = this.getAttribute("kind") === "reduced", name = this.getAttribute("user-name") || "User Name";
      this.nameEl.textContent = name;
      this.cnpjEl.textContent = this.getAttribute("cnpj") || "00.000.000/0001-00";
      CDS.attr(this.avatarEl, "src", this.getAttribute("src") || "assets/brand/sample-photo.svg");
      CDS.attr(this.avatarEl, "name", name);
      CDS.attr(this.iconBtn, "icon", this.getAttribute("icon") || "menu-line");
      this.textEl.hidden = reduced;
      this.iconBtn.hidden = reduced || this.getAttribute("show-icon-button") === "false";
    }
  }
  CdsSponsorUserProfile.define("cds-sponsor-user-profile");
})();
} catch (e) { console.error("[cds] components/sponsor-user-profile/sponsor-user-profile.js", e); }

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

/* ==== components/tab-item/tab-item.js ==== */
try {
/**
 * @deps icon badge
 * <cds-tab-item> — .Item (Tabs) · .Building Blocks · set 6498:375
 * 48 de altura · Label Content (pad 4 8 · gap 4 · raio micro) com Lead Item (Choose Icon, oculto por padrão) + Label.
 * Is Active=True: sublinhado 2px Accent/Solid/medium · Label/Medium Text/intense.
 * Hovered: sublinhado 2px Border/semi-soft + Label Content Surface/01 · Pressed: sublinhado Accent/Solid/medium + Surface/01 + Label/Medium.
 * Show Badge (lib: padrão True; nas instâncias de Fixed Tab e Scrollable Tab, False): Badge Warning "0" depois do Label (gap 4).
 *   Aqui: ligado no .Item solto; dentro de uma tablist só com show-badge="true" (D145).
 * Atributos: label ("Label") · icon (placeholder-line) · show-lead-item · show-badge · badge-label ("0") · is-active · disabled · controls (id do painel)
 *   state="hovered|pressed" (specimen)
 * É um <button role="tab"> (a lista cuida de aria-selected, tabindex e teclado).
 */
(function(){
  "use strict";
  class CdsTabItem extends CDS.Element {
    static get observedAttributes(){ return ["label","icon","show-lead-item","show-badge","badge-label","is-active","disabled","controls"]; }
    get button(){ return this.btn; }
    render(){
      if (!this.btn){
        var b = this.btn = this.appendChild(CDS.create("button", { type: "button", role: "tab" }, "cds-tab"));
        var c = b.appendChild(CDS.create("span", null, "cds-tab__content"));
        this.iconEl = c.appendChild(CDS.create("cds-icon", { size: "small", appearance: "neutral", "aria-hidden": "true" }, "cds-tab__icon"));
        this.labelEl = c.appendChild(CDS.create("span", null, "cds-tab__label"));
        this.badgeEl = c.appendChild(CDS.create("cds-badge", null, "cds-tab__badge"));
      }
      var on = this.hasAttribute("is-active");
      this.labelEl.textContent = this.text("label", "Label");
      CDS.attr(this.iconEl, "icon", this.getAttribute("icon") || "placeholder-line");
      this.iconEl.hidden = this.getAttribute("show-lead-item") !== "true"; // Show Lead Item: padrão False
      var inList = !!CDS.TabList && this.parentElement instanceof CDS.TabList, sb = this.getAttribute("show-badge");
      this.badgeEl.hidden = sb === "false" || (inList && sb !== "true"); // Show Badge: True no .Item, False nas Tabs (como no Figma)
      CDS.attr(this.badgeEl, "label", this.getAttribute("badge-label"));
      // nome acessível com o Badge separado ("Label, 3"); sem Badge, o nome é o próprio Label
      CDS.attr(this.btn, "aria-label", this.badgeEl.hidden ? null : this.labelEl.textContent + ", " + (this.getAttribute("badge-label") || "0"));
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
    // Rola a própria faixa de abas até a ativa, sem scrollIntoView: ele mexia na rolagem da página e cortava a rolagem
    // suave quando a aba ativa acompanha a leitura (ex.: capítulos da Proposta, docs/pitch)
    afterRender(a){
      var it = this.items[a - 1];
      if (it && this._shown){
        var r = it.getBoundingClientRect(), c = this.getBoundingClientRect();
        if (r.left < c.left) this.scrollLeft += r.left - c.left;
        else if (r.right > c.right) this.scrollLeft += r.right - c.right;
      }
      this._shown = true;
    }
  }
  CdsScrollableTab.define("cds-scrollable-tab");
})();
} catch (e) { console.error("[cds] components/scrollable-tab/scrollable-tab.js", e); }

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

/* ==== components/sponsor-header/sponsor-header.js ==== */
try {
/**
 * @deps icon-button breadcrumb tag drop-button main-button
 * <cds-sponsor-header> — Header · [CastanhaDS] Sponsor Templates · componente 4002:3849 (CDS-985)
 * https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=4002-3849
 *
 * Template do Sponsor (menu Templates › Sponsor, Gustavo 06/10). Também é o cabeçalho das páginas do playground:
 * a linha .Heading é a barra do topo e a .Title Content fica no topo de cada página.
 *
 * Anatomia (só componentes do DS):
 *   .Heading        Navigation Controls (gap 8): Menu Button (Icon Button default · neutral · small, hamburguer-line; só no celular,
 *                   Mobile Lead Items com Common/Is Mobile) · Back Button (back-line) · gap 24 · Breadcrumb
 *                   | Trailling Items (gap 8): Icon Buttons small default neutral — search-line · notification-line (Badge) · close-line
 *   .Title Content  Title (Title/Large) · Information Button (Icon Button ghost · accent · medium) · Tag (neutral)
 *                   | Trailling Items (gap 8): Drop Button (default · neutral · medium) · Main Button (default · accent · medium)
 *   Container: Surface/default · pad 32 0 28 · gap 24 · min 312
 *
 * Atributos (props do Figma: Show Heading, Show Title; o resto são as instâncias do template):
 *   show-heading · show-title (padrão true; "false" oculta)
 *   show-menu-button (padrão true, como no Figma; aparece só no celular) · show-back · show-breadcrumb · show-search · show-notification · show-close · show-info · show-tag · show-drop-button · show-main-button
 *   title ("Title") · tag-label ("Tag") · tag-appearance (neutral) · drop-label ("Label") · main-label ("Label") · notification ("0")
 *   viewport (desktop | tablet | mobile): sem o atributo, vale o [data-viewport] do quadro ou a largura da tela (Mobile < 744)
 * Evento: cds-menu (clique no Menu Button) — quem monta a página abre o Side Menu (open()).
 * Referências: menuBtn · trailEl (Trailling Items do .Heading) · backBtn · searchBtn · notificationBtn · closeBtn · titleEl · infoBtn · tag · dropBtn · mainBtn · crumbHost
 * setBreadcrumb([{ label, href }], collapse) — o último item é a página atual; collapse = níveis iniciais no "…" (Truncate).
 */
(function(){
  "use strict";
  var SHOW = ["show-heading","show-title","show-menu-button","viewport","show-back","show-breadcrumb","show-search","show-notification","show-close","show-info","show-tag","show-drop-button","show-main-button"];
  class CdsSponsorHeader extends CDS.Element {
    static get observedAttributes(){ return SHOW.concat(["title","tag-label","tag-appearance","drop-label","main-label","notification"]); }
    render(){
      if (!this._built){
        this._built = true;
        var c = CDS.create, self = this;
        this.headingEl = this.appendChild(c("div", null, "cds-sh__heading"));
        var lead = this.headingEl.appendChild(c("div", null, "cds-sh__lead"));
        var navc = lead.appendChild(c("div", null, "cds-sh__nav")); // Navigation Controls (gap 8)
        // Mobile Lead Items (Common/Is Mobile): o Menu Button abre o Side Menu em tela cheia (protótipo 5318:19215)
        this.menuBtn = navc.appendChild(c("cds-icon-button", { icon: "hamburguer-line", kind: "default", appearance: "neutral", size: "small", label: "Abrir menu" }, "cds-sh__menu"));
        this.menuBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-menu", { bubbles: true })); });
        this.backBtn = navc.appendChild(c("cds-icon-button", { icon: "back-line", kind: "default", appearance: "neutral", size: "small", label: "Voltar" }));
        // viewport: atributo, quadro do playground ou largura da tela
        this._mq = window.matchMedia ? matchMedia("(max-width: 743px)") : null;
        if (this._mq && this._mq.addEventListener) this._mq.addEventListener("change", function(){ self.render(); });
        // o quadro do playground troca o data-viewport sem recriar o componente: observar para trocar o modo
        var fr = this.closest("[data-viewport]");
        if (fr && window.MutationObserver) new MutationObserver(function(){ if (!self.isConnected) return; self.render(); }).observe(fr, { attributes: true, attributeFilter: ["data-viewport"] });
        this.crumbHost = lead.appendChild(c("div", null, "cds-sh__crumb"));
        var trail = this.trailEl = this.headingEl.appendChild(c("div", null, "cds-sh__trail"));
        this.searchBtn = trail.appendChild(c("cds-icon-button", { icon: "search-line", kind: "default", appearance: "neutral", size: "small", label: "Buscar" }));
        this.notificationBtn = trail.appendChild(c("cds-icon-button", { icon: "notification-line", kind: "default", appearance: "neutral", size: "small", label: "Notificações", "show-notification": "" }));
        this.closeBtn = trail.appendChild(c("cds-icon-button", { icon: "close-line", kind: "default", appearance: "neutral", size: "small", label: "Fechar" }));

        this.titleRow = this.appendChild(c("div", null, "cds-sh__title-row"));
        var tl = this.titleRow.appendChild(c("div", null, "cds-sh__title-lead"));
        this.titleEl = tl.appendChild(c("h1", null, "cds-sh__title"));
        this.infoBtn = tl.appendChild(c("cds-icon-button", { icon: "information-line", kind: "ghost", appearance: "accent", size: "medium", label: "Informação" }));
        this.tag = tl.appendChild(c("cds-tag", { appearance: "neutral", icon: "placeholder-line" }));
        var tt = this.titleRow.appendChild(c("div", null, "cds-sh__trail"));
        this.dropBtn = tt.appendChild(c("cds-drop-button", { kind: "default", appearance: "neutral", size: "medium", "lead-icon": "placeholder-line" }));
        this.mainBtn = tt.appendChild(c("cds-main-button", { kind: "default", appearance: "accent", size: "medium", "lead-icon": "placeholder-line", "show-trailing-icon": "false" }));
      }
      var self = this;
      function on(n){ return self.getAttribute(n) !== "false"; }
      var frame = this.closest("[data-viewport]");
      var vp = this.getAttribute("viewport") || (frame && frame.dataset.viewport) || (this._mq && this._mq.matches ? "mobile" : "desktop");
      CDS.attr(this, "data-mode", vp === "mobile" ? "mobile" : "desktop");
      this.menuBtn.hidden = vp !== "mobile" || !on("show-menu-button");
      this.headingEl.hidden = !on("show-heading");
      this.titleRow.hidden = !on("show-title");
      [["show-back", this.backBtn], ["show-breadcrumb", this.crumbHost], ["show-search", this.searchBtn], ["show-notification", this.notificationBtn], ["show-close", this.closeBtn],
       ["show-info", this.infoBtn], ["show-tag", this.tag], ["show-drop-button", this.dropBtn], ["show-main-button", this.mainBtn]].forEach(function(p){ p[1].hidden = !on(p[0]); });
      this.titleEl.textContent = this.getAttribute("title") || "Title";
      CDS.attr(this.tag, "label", this.getAttribute("tag-label") || "Tag");
      CDS.attr(this.tag, "appearance", this.getAttribute("tag-appearance") || "neutral");
      CDS.attr(this.dropBtn, "label", this.getAttribute("drop-label") || "Label");
      CDS.attr(this.mainBtn, "label", this.getAttribute("main-label") || "Label");
      CDS.attr(this.notificationBtn, "notification", this.getAttribute("notification") || "0");
    }
    setBreadcrumb(items, collapse){
      // O Breadcrumb lê os filhos no 1º render: um novo a cada troca. collapse = quantos níveis iniciais vão para o "…" (padrão 0: todos à mostra)
      this.crumbHost.innerHTML = "";
      var bc = CDS.create("cds-breadcrumb", { collapse: String(collapse || 0) });
      (items || []).forEach(function(it, i, a){ var l = CDS.create("a", { href: it.href || "#" }); l.textContent = it.label; if (i === a.length - 1) l.setAttribute("aria-current", "page"); bc.appendChild(l); });
      this.crumbHost.appendChild(bc);
      this.breadcrumb = bc;
    }
  }
  CdsSponsorHeader.define("cds-sponsor-header");
})();
} catch (e) { console.error("[cds] components/sponsor-header/sponsor-header.js", e); }

/* ==== components/sponsor-side-menu/sponsor-side-menu.js ==== */
try {
/**
 * @deps caju-brand icon-button sponsor-category sponsor-subcategory sponsor-user-profile tag
 * <cds-sponsor-side-menu> — Side Menu · [CastanhaDS] Sponsor Templates (set 5576:445, componente de template Sponsor)
 * Description do Figma: navegação lateral do app Sponsor. Colapsado (80px, só ícones) e expandido (360px). No desktop expande por
 * hover, em overlay sobre o conteúdo. Um item selecionado por vez, derivado da rota. Um accordion aberto por vez.
 *
 * Anatomia (lida no Figma): Surface/01 · Elevation/level 2 · raio Border/Radius/large à direita · pad 32 20 0 20 · altura mínima 788
 *   coluna com espaço entre o topo (Container) e o rodapé (User Area)
 *   Container (gap 20): Heading 44 (Brand 40, logo vertical ao centro: expandido à esquerda com pad 16 e tipografia, colapsado centralizado, só o símbolo)
 *     · Slot (Show Slot, pad 16, raio small, altura máxima 160) · Shortcuts (Show Shortcuts, pad-top 8, gap 8, .Category Accent)
 *     · Categories (gap 20, pad 16 0, .Category Neutral) · User Area (pad 20 0): Help (.Category) + .User Profile
 *   Colapsado: .Category e .User Profile em Kind=Reduced (só ícone e avatar)
 *
 * Atributos: collapsed (Is Collapsed · padrão do Figma: true; "false" fixa expandido) · show-slot · show-shortcuts
 *   show-close (Icon Button close-line no Heading; no celular aparece sempre que o menu está aberto; evento cds-close)
 *   viewport (desktop | tablet | mobile): sem o atributo, vale o [data-viewport] do quadro ou a largura da tela (Mobile < 744)
 *   open (só no celular: menu aberto)
 * Celular (protótipo 5318:19215): o menu sai da página e o Menu Button do Header (evento cds-menu) chama open(). Abre em tela cheia,
 *   no topo à esquerda, expandido, sem fundo escurecido, com Dissolve de 300ms (Duration/Medium/02). Fecha pelo Icon Button de
 *   fechar (decisão do Gustavo, 07/10: o Figma não tem a camada hoje, C182), por Esc ou ao escolher um item.
 *   Tablet segue o desktop (o protótipo só tem 360, 1366 e 1440).
 * Filhos: <cds-sponsor-category> vão para Categories; com slot="shortcuts" para Shortcuts; slot="help" para Help;
 *   <cds-sponsor-user-profile> (ou slot="profile") para o rodapé; slot="slot" para o Slot livre.
 * Métodos: open(trigger) · close() — o foco vai para o menu ao abrir e volta para quem abriu ao fechar.
 * Comportamento: colapsado, abre por hover ou foco em overlay (a largura de 80 continua reservada); clicar num item seleciona
 *   ele e tira a seleção dos outros; abrir um accordion fecha os outros. Evento: cds-select { item }.
 */
(function(){
  "use strict";
  class CdsSponsorSideMenu extends CDS.Element {
    static get observedAttributes(){ return ["collapsed","show-slot","show-shortcuts","show-close","viewport","open"]; }
    get mobile(){
      var f = this.closest("[data-viewport]"), v = this.getAttribute("viewport") || (f && f.dataset.viewport) || (this._mq && this._mq.matches ? "mobile" : "desktop");
      return v === "mobile";
    }
    get collapsed(){ return !this.mobile && this.getAttribute("collapsed") !== "false"; } // no celular o menu aberto é sempre o expandido
    render(){
      var c = CDS.create, self = this;
      if (!this._built){
        this._built = true;
        var kids = [].slice.call(this.children);
        this.innerHTML = "";
        var p = this.panel = this.appendChild(c("nav", { "aria-label": "Menu" }, "cds-ssm"));
        var box = p.appendChild(c("div", null, "cds-ssm__container"));
        var head = box.appendChild(c("div", null, "cds-ssm__heading"));
        this.brandEl = head.appendChild(c("div", null, "cds-ssm__brand")).appendChild(c("cds-caju-brand", { label: "Caju" }));
        // camada oculta no Figma (Heading › Icon Button close-line): fechar o menu em gaveta, no celular
        this.closeBtn = head.appendChild(c("cds-icon-button", { icon: "close-line", kind: "default", appearance: "neutral", size: "small", label: "Fechar menu" }, "cds-ssm__close"));
        this.closeBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-close", { bubbles: true })); if (self.mobile) self.close(); });
        this._mq = window.matchMedia ? matchMedia("(max-width: 743px)") : null;
        if (this._mq && this._mq.addEventListener) this._mq.addEventListener("change", function(){ if (!self.mobile) self.removeAttribute("open"); self.render(); });
        this.addEventListener("keydown", function(e){ if (e.key === "Escape" && self.mobile && self.hasAttribute("open")){ e.stopPropagation(); self.close(); } });
        // o quadro do playground troca o data-viewport sem recriar o componente: observar para trocar o modo
        var fr = this.closest("[data-viewport]");
        if (fr && window.MutationObserver) new MutationObserver(function(){ if (!self.isConnected) return; if (self.getAttribute("open") != null && fr.dataset.viewport !== "mobile") self.removeAttribute("open"); self.render(); }).observe(fr, { attributes: true, attributeFilter: ["data-viewport"] });
        this.slotEl = box.appendChild(c("div", null, "cds-ssm__slot"));
        this.shortEl = box.appendChild(c("div", { role: "list", "aria-label": "Atalhos" }, "cds-ssm__shortcuts"));
        this.catEl = box.appendChild(c("div", { role: "list", "aria-label": "Categorias" }, "cds-ssm__categories"));
        var user = p.appendChild(c("div", null, "cds-ssm__user"));
        this.helpEl = user.appendChild(c("div", null, "cds-ssm__help"));
        this.profileEl = user.appendChild(c("div", null, "cds-ssm__profile"));
        kids.forEach(function(k){
          var s = k.getAttribute("slot");
          if (k.tagName === "CDS-SPONSOR-USER-PROFILE" || s === "profile") self.profileEl.appendChild(k);
          else if (s === "shortcuts") self.shortEl.appendChild(k);
          else if (s === "help") self.helpEl.appendChild(k);
          else if (s === "slot") self.slotEl.appendChild(k);
          else self.catEl.appendChild(k);
        });
        // colapsado: abre por hover/foco, em overlay
        function peek(on){ if (self._peek === on) return; self._peek = on; self.sync(); }
        this.addEventListener("pointerenter", function(e){ if (e.pointerType !== "touch") peek(true); });
        this.addEventListener("pointerleave", function(){ peek(false); });
        this.addEventListener("focusin", function(){ peek(true); });
        this.addEventListener("focusout", function(e){ if (!self.contains(e.relatedTarget)) peek(false); });
        // um selecionado por vez · um accordion aberto por vez
        this.addEventListener("click", function(e){
          var it = e.target.closest("cds-sponsor-category, cds-sponsor-subcategory");
          if (!it || !self.contains(it) || it.hasAttribute("disabled")) return;
          if (it.tagName === "CDS-SPONSOR-CATEGORY" && it.getAttribute("intent") === "accordion") return;
          self.select(it);
          if (self.mobile && self.hasAttribute("open")) self.close(); // no celular, escolher um item fecha o menu
        });
        this.addEventListener("cds-toggle", function(e){
          if (!e.detail.expanded) return;
          self.items().forEach(function(x){ if (x !== e.target && x.getAttribute("intent") === "accordion") x.expanded = false; });
        });
      }
      var mob = this.mobile, isOpen = mob && this.hasAttribute("open");
      CDS.attr(this, "data-mode", mob ? "mobile" : "desktop");
      // aberto no celular: diálogo de navegação em tela cheia
      CDS.attr(this.panel, "role", isOpen ? "dialog" : null); CDS.attr(this.panel, "aria-modal", isOpen ? "true" : null);
      this.slotEl.hidden = this.getAttribute("show-slot") !== "true";
      this.closeBtn.hidden = !(isOpen || this.getAttribute("show-close") === "true");
      this.shortEl.hidden = this.getAttribute("show-shortcuts") !== "true";
      this.sync();
    }
    open(trigger){
      if (!this.mobile) return;
      this._trigger = trigger || document.activeElement;
      this.setAttribute("open", "");
      var self = this; requestAnimationFrame(function(){ var b = self.closeBtn.querySelector("button"); if (b) b.focus(); });
    }
    close(){
      if (!this.hasAttribute("open")) return;
      this.removeAttribute("open");
      var t = this._trigger; this._trigger = null;
      if (t && t.focus) t.focus();
    }
    items(){ return [].slice.call(this.querySelectorAll("cds-sponsor-category")); }
    select(it){
      [].forEach.call(this.querySelectorAll("cds-sponsor-category[selected], cds-sponsor-subcategory[selected]"), function(x){ x.removeAttribute("selected"); });
      it.setAttribute("selected", "");
      var parent = it.closest("cds-sponsor-category"); if (parent && parent !== it) parent.setAttribute("selected", ""); // categoria do subitem
      this.dispatchEvent(new CustomEvent("cds-select", { detail: { item: it }, bubbles: true }));
    }
    sync(){
      var reduced = this.collapsed && !this._peek;
      CDS.attr(this, "peek", this.collapsed && this._peek ? "" : null);
      this.items().forEach(function(x){ CDS.attr(x, "kind", reduced ? "reduced" : null); });
      CDS.attr(this.brandEl, "show-typography", reduced ? "false" : null); // Figma: expandido com a tipografia, colapsado só o símbolo
      [].forEach.call(this.querySelectorAll("cds-sponsor-user-profile"), function(x){ CDS.attr(x, "kind", reduced ? "reduced" : null); });
    }
  }
  CdsSponsorSideMenu.define("cds-sponsor-side-menu");
})();
} catch (e) { console.error("[cds] components/sponsor-side-menu/sponsor-side-menu.js", e); }

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
} catch (e) { console.error("[cds] components/accordion-item/accordion-item.js", e); }

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

/* ==== components/chat-input/chat-input.js ==== */
try {
/**
 * @deps text-field icon-button
 * <cds-chat-input> — Chat Input · Text Fields · CDS-1594 · branch 4hJ90rFfuEyWx9zHeqJxp4 · set 26567:44273
 *
 * Composer de mensagem (IA e atendimento). Membro da família Text Fields (CDS.TextField), sem label visível:
 *   Text Box   [texto que cresce · warning-line] / [Attach Button · · · Send Button · Voice Button]
 *   Trailing Content  Supporting/Error Message + Character Counter
 * O Text Box vai de Sizes/56 a Sizes/160 (Figma). Passou do máximo, o texto rola e as ações ficam fixas embaixo.
 *
 * Voz é ditado (fala vira texto no campo), não mensagem de áudio. O componente expõe o estado e o evento.
 * Quem implementa liga ao serviço de reconhecimento de voz e escreve o texto com `value`.
 *
 * Atributos: os da família (appearance · disabled · value · placeholder · supporting · error ·
 *   show-trailing-item · show-supporting-content · show-character-counter · maxlength · character-counter · state · is-active)
 *   label             nome acessível do campo (padrão "Mensagem"). Não aparece: o Chat Input não tem label visível
 *   show-attachment   Show Attachment (padrão true) · show-voice  Show Voice (padrão true)
 *   listening         Is Listening (ditado ligado) · listening-content  Listening Content (padrão "Ouvindo…")
 * Teclado: Enter envia · Shift+Enter quebra a linha.
 * Eventos: cds-change {value} · cds-send {value} (cancelável: sem preventDefault o campo esvazia, mantém o foco e encerra o ditado)
 *   · cds-attach · cds-listening-change {listening}
 */
(function(){
  "use strict";
  var el = CDS.TextField.el;

  function iconButton(cls, kind, appearance, icon){
    var b = el("cds-icon-button", cls);
    b.setAttribute("kind", kind); b.setAttribute("appearance", appearance); b.setAttribute("size", "small"); b.setAttribute("icon", icon);
    return b;
  }

  class CdsChatInput extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["show-attachment", "show-voice", "listening", "listening-content"]); }
    get controlTag(){ return "textarea"; }
    get hasLeadIcon(){ return false; }
    get defaultPlaceholder(){ return "Escreva uma mensagem"; }
    get fallbackName(){ return "Mensagem"; }
    get listening(){ return this.hasAttribute("listening"); }
    set listening(on){ this.setListening(!!on); }
    get canSend(){ return !!this.value.trim(); }

    configureControl(ctrl){ ctrl.rows = 1; ctrl.enterKeyHint = "send"; }

    // Actions: Attach à esquerda, Trailing Items (Send + Voice) à direita
    buildTrailing(box){
      var self = this, act = this.actions = el("div", "cds-chat__actions");
      this.attachBtn = act.appendChild(iconButton("cds-chat__attach", "ghost", "neutral", "attachment"));
      this.attachBtn.setAttribute("label", "Anexar arquivo");
      var trail = act.appendChild(el("div", "cds-chat__trailing"));
      this.sendBtn = trail.appendChild(iconButton("cds-chat__send", "default", "neutral", "send-line"));
      this.sendBtn.setAttribute("label", "Enviar mensagem");
      this.voiceBtn = trail.appendChild(iconButton("cds-chat__voice", "ghost", "neutral", "microphone-line"));
      box.appendChild(act);

      this.attachBtn.addEventListener("click", function(){ self.dispatchEvent(new CustomEvent("cds-attach", { bubbles: true })); });
      this.sendBtn.addEventListener("click", function(){ self.send(); });
      this.voiceBtn.addEventListener("click", function(){ self.setListening(!self.listening); });
    }

    build(){
      super.build();
      var self = this, ctrl = this.control;
      this.content.appendChild(this.warnEl); // no Figma o warning-line fica no Text Content, ao lado do texto
      this.liveEl = this.appendChild(CDS.create("span", { "aria-live": "polite" }, "cds-chat__live"));
      ctrl.addEventListener("keydown", function(e){
        if (e.key !== "Enter" || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.isComposing) return;
        e.preventDefault(); self.send();
      });
      // Perder o foco para fora do componente encerra o ditado
      this.addEventListener("focusout", function(e){
        if (self.listening && !(e.relatedTarget && self.contains(e.relatedTarget))) self.setListening(false);
      });
      if (window.ResizeObserver){ this._ro = new ResizeObserver(function(){ self.grow(); }); this._ro.observe(this.box); }
    }

    update(){
      if (this.disabled && this.listening){ this.removeAttribute("listening"); return; }
      super.update();
      var ctrl = this.control;
      this.labelEl.hidden = true; // sem label visível: o nome vem de label (aria-label)
      ctrl.setAttribute("aria-label", this.getAttribute("label") || this.fallbackName);
      if (this.listening) ctrl.placeholder = this.getAttribute("listening-content") || "Ouvindo…";
      this.classList.toggle("is-listening", this.listening);
      this.grow();
    }

    updateTrailing(){
      if (!this.actions) return;
      var on = this.listening;
      this.actions.inert = this.disabled;
      this.attachBtn.hidden = !this.flag("show-attachment");
      this.voiceBtn.hidden = !this.flag("show-voice");
      this.sendBtn.toggleAttribute("disabled", !this.canSend);
      // Voice Button: Ghost Neutral microphone-line · com Is Listening, Ghost Accent stop-filled
      this.voiceBtn.setAttribute("appearance", on ? "accent" : "neutral");
      this.voiceBtn.setAttribute("icon", on ? "stop-filled" : "microphone-line");
      this.voiceBtn.setAttribute("pressed", on ? "true" : "false");
      this.voiceBtn.setAttribute("label", on ? "Parar ditado" : "Ditar mensagem");
    }

    afterInput(){ super.afterInput(); this.grow(); }
    // Valor escrito por código (ex.: o serviço de voz no ditado) também faz o campo crescer
    _setValue(v, emit){ super._setValue(v, emit); this.grow(); }

    setListening(on){
      if (on === this.listening || (on && this.disabled)) return;
      this.toggleAttribute("listening", on);
      if (on) this.control.focus();
      this.liveEl.textContent = on ? "Ouvindo" : "Ditado encerrado";
      this.dispatchEvent(new CustomEvent("cds-listening-change", { detail: { listening: on }, bubbles: true }));
    }

    send(){
      if (this.disabled || !this.canSend) return;
      var ev = new CustomEvent("cds-send", { detail: { value: this.value }, bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      this.setListening(false);
      this._setValue("", true);
      this.grow();
      this.control.focus();
    }

    // O texto cresce até o Text Box chegar ao máximo do Figma (Sizes/160) e depois rola
    grow(){
      var c = this.control, box = this.box;
      if (!c || !box) return;
      var top = c.scrollTop;
      c.style.height = "auto";
      var max = parseFloat(getComputedStyle(box).maxHeight), extra = box.offsetHeight - c.offsetHeight;
      var limit = isFinite(max) ? max - extra : Infinity, h = c.scrollHeight;
      c.style.height = Math.min(h, limit) + "px";
      c.style.overflowY = h > limit ? "auto" : "hidden";
      // Medir com height:auto zera a rolagem: o ponto de digitação no fim continua à vista (WCAG 2.4.11)
      c.scrollTop = document.activeElement === c && c.selectionEnd === c.value.length ? c.scrollHeight : top;
    }
  }
  CdsChatInput.define("cds-chat-input");
})();
} catch (e) { console.error("[cds] components/chat-input/chat-input.js", e); }

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

/* ==== components/password-input/password-input.js ==== */
try {
/**
 * @deps text-field
 * <cds-password-input> — Password Input · Text Fields · set 5798:2677
 * Show Content=False mascara o valor; a Visibility Action (Icon Button · Ghost · Neutral · Small) alterna.
 * Ícone reflete o estado: hide-line com o conteúdo visível, hide-off-line mascarado (mesmo padrão do OTP).
 * Sem valor, a Visibility Action fica indisponível (Figma: State=Disabled no campo vazio).
 * Sem o ícone de aviso (warning-line) no Warning: no Figma o Trailing do Password Input tem só a Visibility Action, nas
 * 64 variantes, e o PasswordInput do castanha-react também não tem. Os outros campos da família têm (D250).
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
      if (this.warnEl) this.warnEl.hidden = true; // o Warning do Password Input não tem o warning-line (Figma e React)
    }
  }
  CdsPasswordInput.define("cds-password-input");
})();
} catch (e) { console.error("[cds] components/password-input/password-input.js", e); }

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
 * Eventos: cds-close (cancelável). Sem preventDefault(), o toast sai animado e se remove do DOM.
 * Motion (zeroheight): Entrada expressive/decelerate · long/02 (sem Motion Style — tokens de easing e duração); Saída Selected Out/01.
 *   O Figma não diz o que se move: aqui opacidade + 8px na vertical (Common/Sizes/8). Reduced motion: sem animação.
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
    // Saída animada (Selected Out/01, como no zeroheight): marca [closing], espera a transição e remove (D145)
    close(){
      if (this._closing) return;
      var ev = new CustomEvent("cds-close", { bubbles: true, cancelable: true });
      if (!this.dispatchEvent(ev)) return;
      var self = this, ms = this.isConnected ? parseFloat(getComputedStyle(this).getPropertyValue("--motion-selected-out-01-timing")) || 0 : 0;
      if (!ms || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)){ this.remove(); return; }
      this._closing = true; this.setAttribute("closing", "");
      var done = function(){ if (self._closing){ self._closing = false; self.remove(); } };
      this.addEventListener("transitionend", function h(e){ if (e.target === self && e.propertyName === "opacity"){ self.removeEventListener("transitionend", h); done(); } });
      setTimeout(done, ms + 50); // garantia se a transição não disparar
    }
  }
  CdsToast.define("cds-toast");
})();
} catch (e) { console.error("[cds] components/toast/toast.js", e); }

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

/* ==== components/content-list-item/content-list-item.js ==== */
try {
/**
 * @deps list-item trailing-item tag icon shaped-icon currency-content
 * <cds-content-list-item> — Content List Item · Lists · set 5488:675 (25 variantes na branch bHFCiEbEkTYCXNipG4iqN0, CDS-1592)
 * Kind (Default|Card) × Intent × State (Enabled|Hovered|Pressed|Disabled|Dragged).
 *   Intent=Default:     .Lead Item + .Text Content + .Trailing Item (padrão Checkbox)
 *   Intent=Navigation:  .Lead Item + .Text Content + Tag (Warning) + navigation-right-line
 *   Intent=Transaction: Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line
 * Container: Kind=Default pad 8 4 · Kind=Card pad 16 16 16 24 (como no Figma, C41).
 *
 * Atributos: os de CDS.ListItem · intent · show-trailing-item · show-navigation-indicator · show-tag
 *   trailing-item (kind do .Trailing Item · checkbox) · status (do controle) · tag-label ("Tag") · tag-appearance (warning)
 *   shaped-icon (placeholder-line) · value ("30.000,00") · symbol ("R$") · show-negative-symbol · value-description
 *   href — a linha vira <a>
 *   show-drag-handle — alça Drag Handle à esquerda (padrão desligado, CDS-1592) · state="dragged" — item levantado
 *     A alça é role=button com o nome "Reordenar {label}"; quem reordena é a lista (<cds-content-list reorderable>).
 * A linha é <a> com href, <div> que repassa o clique ao controle (Intent=Default com controle), senão <button>.
 * Eventos: cds-change { status } (controle) · click
 */
(function(){
  "use strict";
  var CONTROLS = { checkbox: 1, "radio-button": 1, "switch": 1 };
  class CdsContentListItem extends CDS.ListItem {
    static get observedAttributes(){ return CDS.ListItem.observedAttributes.concat(["intent","show-trailing-item","show-navigation-indicator","show-tag","trailing-item","status","tag-label","tag-appearance","shaped-icon","value","symbol","show-negative-symbol","value-description","show-drag-handle","state"]); }
    get intent(){ var i = this.getAttribute("intent"); return i === "navigation" || i === "transaction" ? i : "default"; }
    get trailingKind(){ var k = (this.getAttribute("trailing-item") || "checkbox").toLowerCase(); return k === "chechbox" ? "checkbox" : k; }
    get hasControl(){ return this.intent === "default" && this.flag("show-trailing-item") && !!CONTROLS[this.trailingKind]; }
    get rowMode(){ return this.hasAttribute("href") ? "link" : this.hasControl ? "control" : "button"; }
    get controlInput(){ return this.trailEl && this.trailEl.input; }
    get defaultLeadKind(){ return "icon"; }
    get hasDragHandle(){ var v = this.getAttribute("show-drag-handle"); return v != null && v !== "false"; }
    buildItems(items, c){
      // Drag Handle: frame do item (não é building block), mín. 24×24, padding 2, drag-line 20 em Icons/intense
      var dh = this.dragEl = CDS.create("span", { role: "button", tabindex: "0" }, "cds-li__drag");
      dh.appendChild(CDS.create("cds-icon", { icon: "drag-line", size: "medium", appearance: "neutral", "aria-hidden": "true" }, "cds-li__drag-icon"));
      c.insertBefore(dh, this.leadEl);
      // A alça não dispara a ação da linha (link, botão ou controle)
      ["click", "mousedown"].forEach(function(t){ dh.addEventListener(t, function(e){ e.preventDefault(); e.stopPropagation(); }); });
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
      this.dragEl.hidden = !this.hasDragHandle;
      CDS.attr(this.dragEl, "aria-label", "Reordenar " + this.text("label", "Label"));
      if (this.hasAttribute("disabled")) CDS.attr(this.dragEl, "aria-disabled", "true"); else this.dragEl.removeAttribute("aria-disabled");
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
} catch (e) { console.error("[cds] components/content-list/content-list.js", e); }

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
        // Foco ao remover (regra do SelectInput múltiplo do castanha-react): pelo teclado, vai para o chip que fica na mesma
        // posição (o próximo) ou, sem chip ali, para o campo; pelo mouse, para o campo. Backspace/Delete no chip também removem.
        var removeChip = function(chip, keyboard){
          var i = [].indexOf.call(self.chipsEl.querySelectorAll("cds-input-chip"), chip);
          self.toggleValue(chip.dataset.value);
          var next = keyboard ? self.chipsEl.querySelectorAll("cds-input-chip")[i] : null;
          if (next && next.button) next.button.focus(); else self.control.focus();
        };
        this.chipsEl.addEventListener("cds-remove", function(e){
          e.preventDefault();
          var chip = e.target.closest("cds-input-chip");
          if (chip) removeChip(chip, !!(e.detail && e.detail.keyboard)); else self.control.focus();
        });
        this.chipsEl.addEventListener("keydown", function(e){
          var chip = e.target.closest("cds-input-chip");
          if (chip && !self.disabled && (e.key === "Backspace" || e.key === "Delete")){ e.preventDefault(); removeChip(chip, true); }
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
    displayText(){ return ""; } // os valores ficam nos Input Chips; o campo é só a busca (com value inicial, não repete o 1º rótulo)
    buildTrailing(box){ this.classList.add("cds-tf--multi"); super.buildTrailing(box); }
  }
  CdsMultiSelectInput.define("cds-multi-select-input");
})();
} catch (e) { console.error("[cds] components/multi-select-input/multi-select-input.js", e); }

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

/* ==== local/banner/banner.js ==== */
try {
/**
 * <loc-banner> — Banner de divulgação · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * O banner das Notion thumbnails do Castanha Assets (página "Notion thumbnails", ex.: "Consultoria & Cerimônias"):
 * fundo no tom mais escuro da área, as faixas da pilha à esquerda e o conteúdo dentro do cartão da frente.
 * Usado para divulgar os cursos e as capacitações do Castanha DS (Início e Capacitações). D230.
 *
 * Atributos:
 *   area      escala de cor (CDS.local.areas · padrão aprenda)
 *   eyebrow   sobretítulo curto (ex.: "Curso" ou "8 vídeos")
 *   heading   título
 *   text      uma frase
 *   href      destino do Link do DS · cta: texto do link · external: "true" abre em outra aba
 * A11y: as faixas são decorativas (aria-hidden); o título é um h3 e o Link do DS leva o nome do destino.
 * Motion: as faixas abrem em leque no hover/foco do banner, com Hover In/01 e Hover Out/01.
 * Doc: #/locais › Banner (página escondida).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocBanner extends CDS.Element {
    static get observedAttributes(){ return ["area", "eyebrow", "heading", "text", "href", "cta", "external"]; }
    render(){
      this.dataset.locArea = this.getAttribute("area") || "aprenda"; // fundo e faixas leem a escala (local/pilha/pilha.css)
      if (!this._built){
        this._built = true;
        this.textContent = "";
        var stack = this.appendChild(CDS.create("div", null, "loc-banner__stack"));
        for (var k = 3; k >= 1; k--){ var s = stack.appendChild(document.createElement("span")); s.className = "loc-banner__strip"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--_k", String(k)); }
        var front = stack.appendChild(CDS.create("div", null, "loc-banner__front"));
        this._e = front.appendChild(CDS.create("p", null, "loc-banner__eyebrow"));
        this._h = front.appendChild(CDS.create("h3", null, "loc-banner__title"));
        this._t = front.appendChild(CDS.create("p", null, "loc-banner__text"));
        this._l = front.appendChild(document.createElement("cds-link")); this._l.className = "loc-banner__link";
      }
      this._e.textContent = this.getAttribute("eyebrow") || ""; this._e.hidden = !this._e.textContent;
      this._h.textContent = this.getAttribute("heading") || "";
      this._t.textContent = this.getAttribute("text") || ""; this._t.hidden = !this._t.textContent;
      var href = this.getAttribute("href"), ext = this.getAttribute("external") === "true";
      this._l.hidden = !href;
      if (href){
        CDS.attr(this._l, "href", href); CDS.attr(this._l, "label", this.getAttribute("cta") || "Abrir"); CDS.attr(this._l, "appearance", "neutral");
        if (ext){ CDS.attr(this._l, "target", "_blank"); CDS.attr(this._l, "icon", "link-line"); }
      }
    }
  }
  if (!customElements.get("loc-banner")) customElements.define("loc-banner", LocBanner);
})();
} catch (e) { console.error("[cds] local/banner/banner.js", e); }

/* ==== local/faixa/faixa.js ==== */
try {
/**
 * <loc-faixa> — Faixa de legado · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * A faixa "Legado | Arquivado" das thumbnails arquivadas do Castanha Assets: uma tarja que atravessa a capa de um
 * componente ou página fora de uso. Entra sozinha na capa de quem tem `legacy: "motivo"` no CDS.register (D225).
 *
 * Atributos:
 *   label  texto da faixa · padrão "Legado | Arquivado"
 * Quem usa posiciona o pai (position: relative); a faixa cruza o meio dele. Doc: #/locais › Vazio e faixa.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocFaixa extends CDS.Element {
    static get observedAttributes(){ return ["label"]; }
    render(){ this.textContent = this.getAttribute("label") || "Legado | Arquivado"; }
  }
  if (!customElements.get("loc-faixa")) customElements.define("loc-faixa", LocFaixa);
})();
} catch (e) { console.error("[cds] local/faixa/faixa.js", e); }

/* ==== local/pilha/pilha.js ==== */
try {
/**
 * <loc-pilha> — Pilha de cartões · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * Assinatura visual das páginas do playground, vinda do conceito do Castanha Assets (Figma ivkZfOligMDrdIur2kdqtT,
 * capa "Assets" e .Thumbnail Castanha): cartões empilhados do tom mais escuro (atrás) ao mais claro ou saturado (frente).
 * Só tokens do DS: escala accent-solid para a marca e as escalas Charts por área. Uso só no playground (Início,
 * capas e cards de seção); doc em #/locais (página escondida, link no Relatório › Arquitetura).
 *
 * Atributos:
 *   area   marca (padrão) · componentes · padroes · aprenda · ferramentas · ajuda · legado   escala de cor (CDS.local.areas)
 *   on     "accent": a pilha está sobre Surface/accent (hero vermelho); troca os tons para contrastar com o fundo
 *   cards  3 · 4 (padrão)
 *   align  center (padrão: cartões centrados na altura) · end (encostados embaixo, sangrando, como na .Thumbnail por jornada)
 *   fan    sem valor: abre em leque parada (doc). Sem ele, abre no hover/foco de um ancestral .loc-pilha-trigger
 * Tamanho: quem usa define a altura (ou a largura); a proporção vem do número de cartões.
 * A11y: decorativa — aria-hidden, sem foco. Motion: Hover In/01 e Hover Out/01; prefers-reduced-motion desliga.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.local = CDS.local || {};
  // Cor por área: a seção do menu leva a escala (D221). Escalas Charts do tema; a marca usa accent-solid.
  CDS.local.areas = {
    marca: { name: "Marca", ramp: "accent-solid", note: "Início e páginas da marca" },
    componentes: { name: "Componentes", ramp: "accent-solid", note: "Componentes, building blocks e composições" },
    padroes: { name: "Padrões", ramp: "charts-03", note: "Tema Caju, Ilustração, Motion, Camadas, Conteúdo e Patterns" },
    aprenda: { name: "Aprenda", ramp: "charts-03", note: "Treinamento, Capacitações e Castanha Quiz" }, // azul no lugar do roxo (Gustavo, 06/10)
    desenvolvimento: { name: "Desenvolvimento", ramp: "charts-05", note: "Getting Started, guias, design tokens e Castanha Universe (do Storybook)" },
    ferramentas: { name: "Ferramentas", ramp: "charts-02", note: "Personas, Agentes e Skills e MCP" },
    ajuda: { name: "Ajuda", ramp: "charts-01", note: "FAQ e Changelog" },
    legado: { name: "Legado", ramp: "charts-07", note: "Componente ou página fora de uso" }
  };
  class LocPilha extends CDS.Element {
    static get observedAttributes(){ return ["cards"]; }
    render(){
      this.setAttribute("aria-hidden", "true");
      var n = this.getAttribute("cards") === "3" ? 3 : 4;
      if (this.children.length === n) return;
      this.textContent = "";
      // atrás → frente; --_k = distância até o cartão da frente (0)
      for (var i = 0; i < n; i++){ var s = document.createElement("span"); s.style.setProperty("--_k", String(n - 1 - i)); this.appendChild(s); }
    }
  }
  if (!customElements.get("loc-pilha")) customElements.define("loc-pilha", LocPilha);
})();
} catch (e) { console.error("[cds] local/pilha/pilha.js", e); }

/* ==== local/vazio/vazio.js ==== */
try {
/**
 * <loc-vazio> — Estado vazio · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * O DS não tem componente de estado vazio. No playground, busca sem resultado e página não encontrada usam esta peça:
 * a pilha na escala Legado (cinza, em leque parado), um título e um texto. Conceito do Castanha Assets (D225).
 * Filhos passados antes de conectar (ex.: um Link do DS) viram as ações, embaixo do texto.
 *
 * Atributos:
 *   heading  frase curta do que aconteceu (ex.: "Nenhuma release encontrada")
 *   text   o que a pessoa pode fazer agora
 *   size   small: pilha menor e menos respiro (dentro de listas e filtros)
 * A11y: a pilha é decorativa (aria-hidden); quem mostra e esconde o vazio avisa a contagem num aria-live próprio.
 * Doc: #/locais › Vazio e faixa (página escondida).
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  class LocVazio extends CDS.Element {
    static get observedAttributes(){ return ["heading", "text"]; }
    render(){
      if (!this._built){
        this._built = true;
        var extra = [].slice.call(this.childNodes);
        this.textContent = "";
        var p = this.appendChild(document.createElement("loc-pilha")); p.className = "loc-vazio__pilha";
        p.setAttribute("area", "legado"); p.setAttribute("cards", "3"); p.setAttribute("fan", "");
        this._t = this.appendChild(CDS.create("p", null, "loc-vazio__title"));
        this._x = this.appendChild(CDS.create("p", null, "loc-vazio__text"));
        this._a = this.appendChild(CDS.create("div", null, "loc-vazio__actions"));
        extra.forEach(function(n){ this._a.appendChild(n); }, this);
      }
      this._t.textContent = this.getAttribute("heading") || "";
      this._x.textContent = this.getAttribute("text") || "";
      this._x.hidden = !this._x.textContent;
      this._a.hidden = !this._a.childNodes.length;
    }
  }
  if (!customElements.get("loc-vazio")) customElements.define("loc-vazio", LocVazio);
})();
} catch (e) { console.error("[cds] local/vazio/vazio.js", e); }
