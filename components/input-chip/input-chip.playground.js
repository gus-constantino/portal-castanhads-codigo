/* Playground — Input Chips */
CDS.register({
  id: "input-chips", name: "Input Chips", category: "Selection Controls",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2728",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p;
    function make(){ p = kit.el("cds-input-chip", { label: label.value || "Label" }); if (!lead.checked) p.setAttribute("show-lead-icon", "false"); if (dis.checked) p.setAttribute("disabled", ""); if (icon.value) p.setAttribute("icon", icon.value); if (size === "small") p.setAttribute("size", "small");
      p.addEventListener("cds-remove", function(){ ctx.readout("removido — clique em Restaurar", false); }); ctx.preview.innerHTML = ""; ctx.preview.appendChild(p); }
    kit.section(panel, "Variants");
    var size = "medium";
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium"],["small","Small"]], onChange: function(v){ size = v; kit.attr(p, "size", v === "small" ? "small" : null); } });
    var dis = kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ kit.attr(p, "disabled", on); } });
    kit.hint(panel, "Clicar no chip inteiro remove (alvo de 40px). Hovered e Pressed são interação.");
    kit.button(panel, { label: "Restaurar chip", onClick: function(){ make(); ctx.readout("", false); } });
    kit.section(panel, "Booleans");
    var lead = kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    var label = kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    var icon = kit.iconSwap(panel, { label: "Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("icon", v); } });
    make();
  }
});
