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
