/* Playground — .FAB Button (building block do FAB Menu · CDS-1694) */
CDS.register({
  id: "fab-button", name: ".FAB Button", category: "Buttons", block: true, task: "CDS-1694",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/F1s1Tb3cDHYli4aN76QzCo/-CastanhaDS--Components?node-id=27039-594",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16);" });
    var p = kit.el("cds-fab-button", { label: "Mais ações" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v === "accent" ? null : v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-accent-solid-medium)" : ""); } });
    kit.toggle(panel, { label: "Is Active", onChange: function(on){ set("active", on); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered e Pressed são estados de interação. Building block do FAB Menu: não é distribuído sozinho. <code>Is Active</code> acompanha o menu.");
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon (fechado)", value: "plus-line", onChange: function(v){ set("icon", v); } });
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "label (aria-label, obrigatório)", value: "Mais ações", onInput: function(v){ set("label", v || null); } });
  }
});
