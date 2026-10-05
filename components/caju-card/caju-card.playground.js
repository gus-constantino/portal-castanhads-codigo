/* Playground — Caju Card */
CDS.register({
  id: "caju-card", name: "Caju Card", category: "Caju Card", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17053-1181",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-caju-card", {}); ctx.preview.appendChild(p);
    kit.hint(panel, "As artes vêm do Figma; número, CVV, validade e código de desbloqueio são texto e mudam pelos campos abaixo. Combinações que o Figma não tem caem na mais próxima (C74).");
    kit.section(panel, "Variants");
    kit.select(panel, { label: "Kind", value: "fisico", options: [["fisico","Físico"],["fisico-corporativo","Físico Corporativo"],["virtual","Virtual/Crédito"],["virtual-corporativo","Virtual/Crédito Corporativo"],["voucher","Voucher"]], onChange: function(v){ p.setAttribute("kind", v); } });
    kit.seg(panel, { label: "Orientation", value: "vertical", options: [["vertical","Vertical"],["horizontal","Horizontal"]], onChange: function(v){ kit.attr(p, "orientation", v === "vertical" ? null : v); } });
    kit.seg(panel, { label: "Side View", value: "front", options: [["front","Front"],["back","Back"]], hint: "O Figma só tem verso para Físico (H e V) e Físico Corporativo (V).", onChange: function(v){ kit.attr(p, "side", v === "front" ? null : v); } });
    kit.toggle(panel, { label: "Is Blocked", checked: false, onChange: function(on){ kit.attr(p, "blocked", on); } });
    kit.section(panel, "Texts");
    [["full-card-number","Full Card Number","1234 5678 0009 0001"],["cvv","CVV","123"],["expiration-date","Expiration Date","10/30"],["activation-code","Activation Code","000 000 000 000 000"]].forEach(function(t){ kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ p.setAttribute(t[0], v); } }); });
  }
});
