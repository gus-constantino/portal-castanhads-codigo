/* Playground — .User Profile · [CastanhaDS] Sponsor Templates (Templates › Sponsor) */
CDS.register({
  id: "sponsor-user-profile", name: ".User Profile", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-436",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-sponsor-user-profile", { "user-name": "Ana Souza", cnpj: "12.345.678/0001-90" });
    ctx.preview.appendChild(p);
    p.addEventListener("cds-action", function(){ ctx.readout("cds-action", false); });
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["reduced","Reduced"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Icon Button", checked: true, onChange: function(on){ kit.attr(p, "show-icon-button", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "User Name", value: "Ana Souza", onInput: function(v){ p.setAttribute("user-name", v); } });
    kit.text(panel, { label: "CNPJ", value: "12.345.678/0001-90", onInput: function(v){ p.setAttribute("cnpj", v); } });
  }
});
