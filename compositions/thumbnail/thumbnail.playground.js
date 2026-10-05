/* Playground — Thumbnail (composição do playground, não é do DS: ver thumbnail.js) */
CDS.register({
  id: "thumbnail", name: "Thumbnail", composition: true, category: "Composições",
  description: "Miniatura viva: o playground real de um componente reduzido para caber numa caixa. Usada no preview do hover e no menu em grade.",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var SIZES = { peek: ["calc(var(--common-sizes-200) + var(--common-sizes-80))", "var(--common-sizes-160)"], card: ["var(--common-sizes-96)", "var(--common-sizes-96)"] };
    var p = kit.el("cmp-thumbnail", { component: "main-button", "min-scale": "0.5" });
    var box = kit.el("div", { style: "border-radius:var(--common-border-radius-medium);overflow:hidden;background:var(--common-colors-surface-01)" }, [p]);
    function size(k){ p.style.width = SIZES[k][0]; p.style.height = SIZES[k][1]; p.fit(); }
    ctx.preview.appendChild(box);
    size("peek");
    kit.hint(panel, "Composição do playground (prefixo cmp-): monta o playground do componente escolhido e reduz para caber. Fundo Surface/01 é da caixa de exemplo.");
    kit.section(panel, "Comportamento");
    var opts = (CDS.playgrounds || []).filter(function(c){ return c.mount && !c.resource && !c.composition; })
      .sort(function(a, b){ return a.name.localeCompare(b.name, "pt-BR"); }).map(function(c){ return [c.id, c.name]; });
    kit.select(panel, { label: "Component", value: "main-button", searchable: true, options: opts, onChange: function(v){ p.setAttribute("component", v); } });
    kit.seg(panel, { label: "Min Scale", value: "0.5", options: [["0.1", "0.1"], ["0.25", "0.25"], ["0.5", "0.5"], ["1", "1"]], onChange: function(v){ p.setAttribute("min-scale", v); p.fit(); } });
    kit.seg(panel, { label: "Caixa", value: "peek", options: [["peek", "Preview do hover"], ["card", "Card da grade"]], onChange: size });
  }
});
