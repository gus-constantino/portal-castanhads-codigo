/**
 * <cds-sponsor-header> — Header · [CastanhaDS] Sponsor Templates · componente 4002:3849 (CDS-985)
 * https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=4002-3849
 *
 * TEMPLATE PROVISÓRIO (Gustavo, 05/10/2026): usado como cabeçalho das páginas do playground antes de o Header
 * ser trazido e documentado de verdade. Fica fora do menu, do smoke e de qualquer menção na interface.
 * Quando vier, vira components/<id>/ normal (e este arquivo sai).
 *
 * Anatomia (só componentes do DS):
 *   .Heading        Back Button (Icon Button default · neutral · small, back-line) · gap 24 · Breadcrumb
 *                   | Trailling Items (gap 8): Icon Buttons small default neutral — search-line · notification-line (Badge) · close-line
 *   .Title Content  Title (Title/Large) · Information Button (Icon Button ghost · accent · medium) · Tag (neutral)
 *                   | Trailling Items (gap 8): Drop Button (default · neutral · medium) · Main Button (default · accent · medium)
 *   Container: Surface/default · pad 32 0 28 · gap 24 · min 312
 *
 * Atributos (props do Figma: Show Heading, Show Title; o resto são as instâncias do template):
 *   show-heading · show-title (padrão true; "false" oculta)
 *   show-back · show-breadcrumb · show-search · show-notification · show-close · show-info · show-tag · show-drop-button · show-main-button
 *   title ("Title") · tag-label ("Tag") · tag-appearance (neutral) · drop-label ("Label") · main-label ("Label") · notification ("0")
 * Referências: trailEl (Trailling Items do .Heading) · backBtn · searchBtn · notificationBtn · closeBtn · titleEl · infoBtn · tag · dropBtn · mainBtn · crumbHost
 * setBreadcrumb([{ label, href }], collapse) — o último item é a página atual; collapse = níveis iniciais no "…" (Truncate).
 */
(function(){
  "use strict";
  var SHOW = ["show-heading","show-title","show-back","show-breadcrumb","show-search","show-notification","show-close","show-info","show-tag","show-drop-button","show-main-button"];
  class CdsSponsorHeader extends CDS.Element {
    static get observedAttributes(){ return SHOW.concat(["title","tag-label","tag-appearance","drop-label","main-label","notification"]); }
    render(){
      if (!this._built){
        this._built = true;
        var c = CDS.create;
        this.headingEl = this.appendChild(c("div", null, "cds-sh__heading"));
        var lead = this.headingEl.appendChild(c("div", null, "cds-sh__lead"));
        this.backBtn = lead.appendChild(c("cds-icon-button", { icon: "back-line", kind: "default", appearance: "neutral", size: "small", label: "Voltar" }));
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
