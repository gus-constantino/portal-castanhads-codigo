/* Playground — Carousel */
CDS.register({
  id: "carousel", name: "Carousel", category: "Navigation",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=21215-242",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-carousel", {});
    var wrap = kit.el("div", { style: "width:calc(var(--common-sizes-200) + var(--common-sizes-120))" }, [p]);
    ctx.preview.appendChild(wrap);
    kit.hint(panel, "Use as setas (desktop) ou arraste a faixa (mobile). O item mantém a própria largura e o avanço é circular.");
    kit.section(panel, "Nav Control (instância exposta)");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent", "Accent"], ["inversed", "Inversed"]], onChange: function(v){ kit.attr(p, "appearance", v === "inversed" ? v : null); } });
  }
});
