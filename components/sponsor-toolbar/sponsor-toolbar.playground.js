/* Playground — Toolbar · [CastanhaDS] Sponsor Templates (Templates › Sponsor). Conteúdo padrão do Figma: abas e rótulos "Label". */
CDS.register({
  id: "sponsor-toolbar", name: "Toolbar", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5585-2",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var t = kit.el("cds-sponsor-toolbar", null);
    ctx.preview.appendChild(t);
    t.addEventListener("cds-change", function(e){ if (e.detail && e.detail.index) ctx.readout("cds-change · aba " + e.detail.index, false); });
    kit.hint(panel, "Template sem props no Figma: os controles abaixo ligam e desligam as partes. Largura de 1158 no Figma; aqui ocupa o container.");
    kit.section(panel, "Partes");
    [["show-tabs","Scrollable Tab"],["show-search","Text Input"],["show-select","Async creatable Select Input"],["show-actions","Action Controls"]].forEach(function(b){
      kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(t, b[0], on ? null : "false"); } });
    });
    kit.toggle(panel, { label: "Filter button · Is Active", checked: false, onChange: function(on){ kit.attr(t, "filter-active", on ? "" : null); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "1ª ação", value: "Label", onInput: function(v){ t.setAttribute("first-action", v); } });
    kit.text(panel, { label: "2ª ação", value: "Label", onInput: function(v){ t.setAttribute("second-action", v); } });
  }
});
