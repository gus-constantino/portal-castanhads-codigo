/* Playground — Definition List (composição do playground, não é do DS: ver definition-list.js · C87) */
CDS.register({
  id: "definition-list", name: "Definition List", composition: true, category: "Composições",
  description: "Lista de rótulo e valor, em linha ou empilhada. Usada nas props das nested instances, nas fichas de especificação das docs e no Caju Tema.",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var ROWS = [["Appearance", "accent"], ["Size", "medium"], ["Show Lead Icon", "true"], ["Choose Icon", "placeholder-line"]];
    var p = kit.el("cmp-definition-list");
    p.setItems(ROWS);
    ctx.preview.appendChild(kit.el("div", { style: "width:calc(var(--common-sizes-200) + var(--common-sizes-40))" }, [p]));
    kit.hint(panel, "Composição do playground (prefixo cmp-): o DS não tem lista de definição (C87). Conteúdo por filhos dt/dd ou por setItems([[rótulo, valor], …]).");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Layout", value: "inline", options: [["inline", "Inline"], ["stacked", "Stacked"]], onChange: function(v){ kit.attr(p, "layout", v === "stacked" ? v : null); } });
    kit.seg(panel, { label: "Align", value: "start", options: [["start", "Start"], ["end", "End"]], onChange: function(v){ kit.attr(p, "align", v === "end" ? v : null); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Mono", checked: false, onChange: function(on){ kit.attr(p, "mono", on ? "true" : null); } });
  }
});
