/* Playground — Fixed Bar */
CDS.register({
  id: "fixed-bar", name: "Fixed Bar", category: "Containers", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=24037-2929",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-fixed-bar", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("cds-action", function(e){ ctx.readout("cds-action · " + e.detail.action, false); });
    kit.hint(panel, "Na tela, use o atributo <code>fixed</code> para ancorar no fim da viewport.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "horizontal", options: [["horizontal","Horizontal"],["stacked","Stacked"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.section(panel, "Booleans");
    [["show-divider","Show Divider"],["show-secondary-action","Show Secondary Action"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Primary Label", value: "Label", onInput: function(v){ p.setAttribute("primary-label", v); } });
    kit.text(panel, { label: "Secondary Label", value: "Label", onInput: function(v){ p.setAttribute("secondary-label", v); } });
  }
});
