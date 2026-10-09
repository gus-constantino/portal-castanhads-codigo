/* Playground — Main Button */
CDS.register({
  id: "main-button", name: "Main Button", category: "Buttons",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4464-427",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16); max-width:100%;" });
    var p = kit.el("cds-main-button", { label: "Label", kind: "default", appearance: "accent", size: "medium" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("click", function(){ ctx.readout("click", false); setTimeout(function(){ ctx.readout("", false); }, 800); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "medium", options: [["medium","Medium 48"],["small","Small 40"]], onChange: function(v){ set("size", v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.toggle(panel, { label: "Is Loading", onChange: function(on){ set("loading", on); } });
    kit.hint(panel, "Hovered e Pressed (texto em Bold) são interação. Largura mínima segue a Viewport: 136 · 220 (744) · 328 (360).");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Lead Icon", checked: true, onChange: function(on){ set("show-lead-icon", on ? null : "false"); } });
    kit.toggle(panel, { label: "Show Trailing Icon", checked: true, onChange: function(on){ set("show-trailing-icon", on ? null : "false"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ set("lead-icon", v); } });

    kit.section(panel, "Nested instances");
    kit.iconSwap(panel, { label: "Trailing Icon › Choose Icon", value: "placeholder-line", onChange: function(v){ set("trailing-icon", v); } });
    var refresh = kit.nested(panel, { title: "Icon (trailing)", exposed: false, note: "Instância do Icon (Size Medium 20px); a cor acompanha o botão.",
      props: function(){ var i = p.trailEl; return i ? [["Choose Icon", i.getAttribute("icon")], ["Size", "medium"]] : [["Show Trailing Icon", "false"]]; } });
    kit.watch(p, refresh);
  }
});
