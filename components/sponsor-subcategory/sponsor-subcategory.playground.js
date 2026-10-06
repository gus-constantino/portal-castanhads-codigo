/* Playground — .Subcategory · [CastanhaDS] Sponsor Templates (Templates › Sponsor) */
CDS.register({
  id: "sponsor-subcategory", name: ".Subcategory", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-27",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-sponsor-subcategory", { label: "Ativos" });
    ctx.preview.appendChild(p);
    p.addEventListener("click", function(e){ var a = e.target.closest("a"); if (a) e.preventDefault(); });
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on ? "" : null); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ kit.attr(p, "show-lead-icon", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Trailing Icon", checked: true, onChange: function(on){ kit.attr(p, "show-trailing-icon", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Badge", checked: false, onChange: function(on){ kit.attr(p, "show-badge", on ? "true" : null); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Ativos", onInput: function(v){ p.setAttribute("label", v); } });
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); } });
    kit.iconSwap(panel, { label: "Trailing Icon", value: "navigation-right-line", onChange: function(v){ p.setAttribute("trailing-icon", v); } }); // a coroa (recurso pago) não está no [Caju] Icons (C174)
  }
});
