/* Playground — .Variation Big Number (building block do Big Number · CDS-1597) */
CDS.register({
  id: "variation-big-number", name: ".Variation Big Number", category: "Content", block: true, task: "CDS-1597",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/KOmiQxHXqiErSbLmoG3sv6/-CastanhaDS--Components?node-id=27246-396",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-variation-big-number", {}); ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v === "positive" ? null : v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-accent)" : ""); } });
    kit.hint(panel, "Building block do Big Number: não é distribuído sozinho. Inversed serve para o fundo Accent.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "+1%", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "description (leitor de tela)", value: "", onInput: function(v){ set("description", v || null); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "up-down-line", onChange: function(v){ set("icon", v); } });
  }
});
