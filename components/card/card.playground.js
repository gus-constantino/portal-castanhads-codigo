/* Playground — Card */
CDS.register({
  id: "card", name: "Card", category: "Containers", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5256-540",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-card", { style: "width:254px" }, [
      kit.el("strong", { text: "Conteúdo do Slot", style: "font:var(--text-style-body-bold)" }),
      kit.el("span", { text: "O Card agrupa conteúdo relacionado; o Slot recebe qualquer composição.", style: "font:var(--text-style-caption-regular);color:var(--common-colors-text-medium)" })
    ]);
    var wrap = kit.el("div", { style: "padding:var(--common-sizes-24);background:var(--common-colors-surface-01);border-radius:var(--common-border-radius-medium)" }, [p]);
    ctx.preview.appendChild(wrap);
    kit.hint(panel, "O fundo cinza do preview é só para o Card aparecer; no Figma ele é Surface/default.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Has Border", value: "true", options: [["true","True"],["false","False"]], onChange: function(v){ kit.attr(p, "has-border", v === "false" ? "false" : null); } });
  }
});
