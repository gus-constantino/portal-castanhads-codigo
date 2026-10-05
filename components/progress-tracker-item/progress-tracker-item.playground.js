/* Playground — Progress Tracker Item */
CDS.register({
  id: "progress-tracker-item", name: "Progress Tracker Item", category: "Progress Indicators", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14415-3778",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-progress-tracker-item", {}); ctx.preview.appendChild(p);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "number", options: [["number","Number"],["icon","Icon"]], onChange: function(v){ kit.attr(p, "kind", v === "number" ? null : v); } });
    kit.seg(panel, { label: "Orientation", value: "vertical", options: [["vertical","Vertical"],["horizontal","Horizontal"]], onChange: function(v){ kit.attr(p, "orientation", v === "vertical" ? null : v); } });
    kit.seg(panel, { label: "Status", value: "pending", options: [["pending","Pending"],["current","Current"],["completed","Completed"]], onChange: function(v){ p.setAttribute("status", v); } });
    kit.section(panel, "Booleans");
    [["show-description","Show Description"],["show-connector","Show Connector"],["show-link","Show Link"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["description","Text Description","Description content"],["marker-label","Marker label","1"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
    kit.iconSwap(panel, { label: "Choose Marker icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("marker-icon", v); } });
  }
});
