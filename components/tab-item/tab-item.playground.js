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
    kit.toggle(panel, { label: "Show Badge", checked: true, onChange: function(on){ kit.attr(p, "show-badge", on ? null : "false"); } });
    kit.hint(panel, "Padrão True no .Item, como na lib; dentro do Fixed Tab e do Scrollable Tab o Badge vem desligado (show-badge=\"true\" liga).");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Badge (Label)", value: "0", onInput: function(v){ p.setAttribute("badge-label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Choose Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
