/* Playground — .Category · [CastanhaDS] Sponsor Templates (Templates › Sponsor) */
CDS.register({
  id: "sponsor-category", name: ".Category", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-27",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-sponsor-category", { label: "Colaboradores", icon: "team-line", "show-badge": "false" });
    ["Ativos", "Desligados"].forEach(function(l){ p.appendChild(kit.el("cds-sponsor-subcategory", { label: l })); }); // antes de montar: vão para o Slot
    ctx.preview.appendChild(p);
    p.addEventListener("click", function(e){ var a = e.target.closest("a"); if (a) e.preventDefault(); });
    p.addEventListener("cds-toggle", function(e){ ctx.readout("cds-toggle · expanded " + e.detail.expanded, false); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["reduced","Reduced"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Intent", value: "default", options: [["default","Default"],["accordion","Accordion"]], onChange: function(v){ kit.attr(p, "intent", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"]], onChange: function(v){ kit.attr(p, "appearance", v === "neutral" ? null : v); } });
    kit.toggle(panel, { label: "Is Selected", checked: false, onChange: function(on){ kit.attr(p, "selected", on ? "" : null); } });
    kit.toggle(panel, { label: "State: Disabled", checked: false, onChange: function(on){ kit.attr(p, "disabled", on ? "" : null); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Badge", checked: false, onChange: function(on){ kit.attr(p, "show-badge", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Colaboradores", onInput: function(v){ p.setAttribute("label", v); } });
    kit.iconSwap(panel, { label: "Lead Icon", value: "team-line", onChange: function(v){ p.setAttribute("icon", v); } });
  }
});
