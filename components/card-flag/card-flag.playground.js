/* Playground — Credit Card Flags */
CDS.register({
  id: "credit-card-flags", name: "Credit Card Flags", category: "Flags",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4934-771",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-card-flag", { kind: "empty" });
    ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "empty", options: [["empty","Empty"],["elo","Elo"],["mastercard","Mastercard"],["visa","Visa"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.hint(panel, "Simula qualquer cartão e pode simbolizar uma bandeira. As cores das bandeiras são de marca, não tokens.");
  }
});
