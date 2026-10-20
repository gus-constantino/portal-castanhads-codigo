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
 * Sempre com Backdrop e sempre fecha ao clicar fora ou no Esc (decisão do time, 02/10 · C38): não aceita dismissible.
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
