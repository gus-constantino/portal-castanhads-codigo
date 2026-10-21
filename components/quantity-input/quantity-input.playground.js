/* Playground — Quantity Input */
CDS.register({
  id: "quantity-input", name: "Quantity Input", category: "Text Fields", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=22756-7351",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-quantity-input", { label: "Label", supporting: "Supporting Message", error: "Fora do limite", value: "1", min: "0", max: "10" });
    ctx.preview.appendChild(p);
    var set = function(n, v){ kit.attr(p, n, v); };
    var readout = function(){ ctx.readout(String(p.value), false); };
    p.addEventListener("cds-change", readout);
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["ghost","Ghost"]], hint: "Variante do conjunto: os dois botões sempre iguais.", onChange: function(v){ set("kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]], hint: "Também vira Warning sozinho quando o valor digitado sai da faixa.", onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.section(panel, "Faixa e unidade");
    [["min","Mínimo","0"],["max","Máximo","10"],["step","Passo","1"],["prefix","Prefixo","","ex.: R$"],["suffix","Unidade (sufixo)","","ex.: %"],["decimals","Casas decimais","","ex.: 2"],["value","Value","1"]].forEach(function(t){
      kit.text(panel, { label: t[1], value: t[2], placeholder: t[3], onInput: function(v){ set(t[0], v === "" ? null : v); readout(); } });
    });
    kit.hint(panel, "Digitar fora da faixa não bloqueia; ao sair do campo, ajusta para o limite e anuncia. Setas ↑/↓ mudam pelo passo.");
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-supporting-content","Show Supporting Content"]].forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });
    kit.section(panel, "Texts");
    [["label","Text Label","Label"],["required-text","Required Text","(Obrigatório)"],["supporting","Supporting Message","Supporting Message"],["error","Error Message","Fora do limite"]].forEach(function(t){
      kit.text(panel, { label: t[1], value: t[2], onInput: function(v){ set(t[0], v); } });
    });
    kit.section(panel, "Nested instances");
    var refs = [["Decrement Button","dec","minus-line"],["Increment Button","inc","plus-line"]].map(function(n){
      return kit.nested(panel, { title: n[0] + " · Icon Button", exposed: false, note: "Neutral · Medium · " + n[2] + ". No limite, fica indisponível.",
        props: function(){ var b = p[n[1]]; return b ? [["Kind", b.getAttribute("kind")], ["State", b.hasAttribute("disabled") ? "Disabled" : "Enabled"], ["aria-label", b.getAttribute("label")]] : []; } });
    });
    kit.watch(p, function(){ refs.forEach(function(f){ f(); }); });
    readout();
  }
});
