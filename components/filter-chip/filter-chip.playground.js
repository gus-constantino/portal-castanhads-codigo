/* Playground — Filter Chips */
CDS.register({
  id: "filter-chips", name: "Filter Chips", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2744",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-filter-chip", { label: "Label" });
    ctx.preview.appendChild(p);
    var selSw;
    p.addEventListener("cds-change", function(e){ selSw.checked = e.detail.selected; ctx.readout(e.detail.selected ? "selecionado" : "", false); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium"],["small","Small"]], onChange: function(v){ kit.attr(p, "size", v === "small" ? "small" : null); } });
    selSw = kit.toggle(panel, { label: "Is Selected", onChange: function(on){ kit.attr(p, "selected", on); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "O clique alterna Is Selected (aria-pressed); selecionado troca o ícone pelo check-line.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
