/* Playground — Big Number (CDS-1597) */
CDS.register({
  id: "big-number", name: "Big Number", category: "Content", task: "CDS-1597",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/KOmiQxHXqiErSbLmoG3sv6/-CastanhaDS--Components?node-id=27238-472",
  zeroheight: "https://castanha.caju.com.br/858426090/v/latest/p/98e195",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-big-number", {}); ctx.preview.appendChild(p);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("cds-info", function(e){ ctx.readout("Informação: " + e.detail.label, false); });

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "currency", options: [["currency","Currency"],["number","Number"]], onChange: function(v){ set("kind", v === "currency" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["accent","Accent"]], onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    kit.hint(panel, "Hovered troca o fundo e é interação. O card é de leitura: o único alvo de toque é o Information Button.");
    kit.section(panel, "Booleans");
    [["show-information","Show Information"],["show-variation","Show Variation"],["show-trailing-icon","Show Trailing Icon"]].forEach(function(b){
      kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } });
    });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Description", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Valor (Currency) ou Text Value (Number)", value: "100,00", onInput: function(v){ set("value", v); } });
    kit.hint(panel, "Experimente: Saldo disponível · 12.480,90 · coins-line. No Number: Taxa de uso · 87,5.");
    kit.section(panel, "Instance swap");
    kit.iconSwap(panel, { label: "Lead Icon", value: "placeholder-line", onChange: function(v){ set("icon", v); } });
    kit.iconSwap(panel, { label: "Trailing Icon", value: "placeholder-line", onChange: function(v){ set("trailing-icon", v); } });

    kit.section(panel, "Nested instances");
    kit.seg(panel, { label: ".Variation Big Number · Appearance", value: "positive", options: [["positive","Positive"],["warning","Warning"],["negative","Negative"],["informative","Informative"]],
      onChange: function(v){ set("variation-appearance", v === "positive" ? null : v); } });
    kit.text(panel, { label: ".Variation Big Number · Text Label", value: "+1%", onInput: function(v){ set("variation", v); } });
    kit.text(panel, { label: "Sentido da variação (leitor de tela)", value: "", onInput: function(v){ set("variation-description", v || null); } });
    var refresh = kit.nested(panel, { title: ".Variation Big Number", exposed: true, note: "Exposta para trocar Appearance, Text Label e Icon. No Accent fica sempre Inversed.",
      props: function(){ var v = p.querySelector("cds-variation-big-number"); return v ? [["Appearance", v.getAttribute("appearance")], ["Text Label", v.getAttribute("label")]] : [["Show Variation", "false"]]; } });
    kit.watch(p, function(){ refresh(); });
  }
});
