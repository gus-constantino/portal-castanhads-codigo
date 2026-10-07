/* Playground — Skeleton */
CDS.register({
  id: "skeleton", name: "Skeleton", category: "Utilities",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20967-742",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-skeleton", { kind: "round" });
    var wrap = kit.el("div", { style: "width:calc(var(--common-sizes-200) + var(--common-sizes-104));display:flex;justify-content:center" }, [p]);
    ctx.preview.appendChild(wrap);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "round", options: [["round", "Round"], ["square", "Square"]], onChange: function(v){ kit.attr(p, "kind", v); } });
    kit.section(panel, "Dimensões (quem consome define)");
    kit.text(panel, { label: "Width", value: "", hint: "Número da escala (48 → Common/Sizes/48), px ou CSS. Vazio = amostra.", onInput: function(v){ kit.attr(p, "width", v || null); } });
    kit.text(panel, { label: "Height", value: "", onInput: function(v){ kit.attr(p, "height", v || null); } });
  }
});
