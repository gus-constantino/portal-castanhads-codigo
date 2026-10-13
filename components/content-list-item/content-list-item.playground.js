/* Playground — Content List Item */
CDS.register({
  id: "content-list-item", name: "Content List Item", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-675",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-content-list-item", { style: "width:320px" }); ctx.preview.appendChild(p);
    p.addEventListener("click", function(){ ctx.readout("click", false); });
    kit.hint(panel, "Com <code>href</code> a linha vira link; no Intent=Default com controle, a linha aciona o controle; nos outros, é um botão.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Intent", value: "default", options: [["default","Default"],["navigation","Navigation"],["transaction","Transaction"]], onChange: function(v){ kit.attr(p, "intent", v === "default" ? null : v); } });
    kit.seg(panel, { label: "State", value: "enabled", options: [["enabled","Enabled"],["hovered","Hovered"],["pressed","Pressed"],["disabled","Disabled"],["dragged","Dragged"]], hint: "Dragged é o item levantado durante o arraste (CDS-1592, na branch).", onChange: function(v){ kit.attr(p, "state", v === "hovered" || v === "pressed" || v === "dragged" ? v : null); kit.attr(p, "disabled", v === "disabled"); } });
    kit.section(panel, "Booleans");
    [["show-lead-item","Show Lead Item"],["show-trailing-item","Show Trailing Item (Default)"],["show-divider","Show Divider"],["show-navigation-indicator","Show Navigation Indicator"],["show-tag","Show Tag (Navigation)"],["show-description","Show Description (.Text Content)"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(p, b[0], on ? null : "false"); } }); });
    kit.toggle(panel, { label: "Show Drag Handle (CDS-1592)", checked: false, onChange: function(on){ kit.attr(p, "show-drag-handle", on ? "true" : null); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label Content", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "Text Description", value: "Description", onInput: function(v){ p.setAttribute("description", v); } });
    kit.text(panel, { label: "Value (Transaction)", value: "30.000,00", onInput: function(v){ p.setAttribute("value", v); } });
    kit.section(panel, "Instance swap");
    kit.select(panel, { label: ".Trailing Item · Kind", value: "checkbox", options: [["checkbox","Checkbox"],["radio-button","Radio Button"],["switch","Switch"],["icon","Icon"],["tag","Tag"]], onChange: function(v){ p.setAttribute("trailing-item", v); } });
    kit.iconSwap(panel, { label: "Lead Item · Icon", value: "placeholder-line", onChange: function(v){ p.setAttribute("lead-icon", v); p.setAttribute("shaped-icon", v); } });
  }
});
