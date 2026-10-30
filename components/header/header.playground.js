/* Playground — .Header (building block) */
CDS.register({
  id: "header", name: ".Header", category: "Overlays", block: true, figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PLk9bAY0lKJSTbINkFOpZI/-CastanhaDS--Components?node-id=16362-3241",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-header", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-close", function(){ ctx.readout("cds-close", false); });
    kit.hint(panel, "Usado no Modal e no Bottom Sheet (lá com Show Divider desligado).");
    kit.section(panel, "Booleans");
    [["show-text-title","Show Text Title"],["show-close-button","Show Close Button"],["show-divider","Show Divider"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.toggle(panel, { label: "Show Text Description", checked: false, onChange: function(on){ kit.attr(p, "show-text-description", on ? "true" : null); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Title", value: "Title", onInput: function(v){ p.setAttribute("text-title", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("text-description", v); } });
  }
});
