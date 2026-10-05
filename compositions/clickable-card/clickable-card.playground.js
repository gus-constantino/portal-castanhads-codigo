/* Playground — Clickable Card (composição do playground, não é do DS: ver clickable-card.js · C165 · issue #1) */
CDS.register({
  id: "clickable-card", name: "Clickable Card", composition: true, category: "Composições",
  description: "Card com a área de clique inteira, mídia quadrada e label. Composição local enquanto o DS não tem um Card clicável.",
  issue: "https://github.com/gus-constantino/castanhads-component-teste/issues/1",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    // Mídia de exemplo: Shaped Icon do DS no centro do Slot quadrado
    var icon = kit.el("cds-shaped-icon", { icon: "cards-line", appearance: "accent", size: "large" });
    var media = kit.el("div", { style: "position:absolute;inset:0;display:flex;align-items:center;justify-content:center" }, [icon]);
    var p = kit.el("cmp-clickable-card", { href: "#/clickable-card", label: "Label" }, [media]);
    var wrap = kit.el("div", { style: "width:calc(var(--common-sizes-120) + var(--common-sizes-40))" }, [p]);
    ctx.preview.appendChild(wrap);
    p.addEventListener("click", function(e){ e.preventDefault(); }); // no specimen o link não navega
    kit.hint(panel, "Composição do playground (prefixo cmp-): só tokens do Card e do menu. Usada nos cards do menu em grade. Quando o DS tiver um Card clicável, ela sai (issue #1).");
    kit.section(panel, "Comportamento");
    kit.toggle(panel, { label: "Current (página atual)", checked: false, onChange: function(on){ kit.attr(p, "current", on ? "true" : null); if (!on && p.linkEl) p.linkEl.removeAttribute("aria-current"); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "Label", onInput: function(v){ p.setAttribute("label", v); } });
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "Description (aria-description)", value: "", onInput: function(v){ kit.attr(p, "description", v || null); } });
  }
});
