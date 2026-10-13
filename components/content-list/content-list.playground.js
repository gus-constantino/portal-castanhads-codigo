/* Playground — Content List */
CDS.register({
  id: "content-list", name: "Content List", category: "Lists", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5488-1482",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, p = kit.el("cds-content-list", { label: "Lista de conteúdo" }); ctx.preview.appendChild(p);
    kit.hint(panel, "Amostra com 12 itens, como no Figma. No código, os filhos <code>&lt;cds-content-list-item&gt;</code> recebem Kind e Intent da lista.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["card","Card"]], onChange: function(v){ kit.attr(p, "kind", v === "default" ? null : v); } });
    kit.seg(panel, { label: "Intent", value: "default", options: [["default","Default"],["switch","Switch"],["navigation","Navigation"]], hint: "No Figma, Intent=Switch usa itens Intent=Transaction (C54).", onChange: function(v){ kit.attr(p, "intent", v === "default" ? null : v); } });
    kit.toggle(panel, { label: "Reorderable (CDS-1592)", checked: false, hint: "Liga a alça dos itens. Arraste pela alça ou use Espaço e as setas.", onChange: function(on){ kit.attr(p, "reorderable", on); } });
    p.addEventListener("cds-reorder", function(e){ ctx.readout("cds-reorder " + (e.detail.from + 1) + " → " + (e.detail.to + 1), false); });
    kit.range(panel, { label: "Itens (amostra)", min: 1, max: 12, value: 12, onInput: function(v){ p.setAttribute("count", v); } });
  }
});
