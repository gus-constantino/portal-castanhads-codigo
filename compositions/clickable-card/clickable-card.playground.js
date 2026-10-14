/* Playground — Clickable Card (composição do playground, não é do DS: ver clickable-card.js · C165 · issue #1) */
CDS.register({
  id: "clickable-card", name: "Clickable Card", composition: true, category: "Composições",
  description: "Card com a área de clique inteira, mídia e label: link (navega) ou botão (ação). Composição local enquanto o DS não tem um Card clicável.",
  issue: "https://github.com/gus-constantino/portal-castanhads-codigo/issues/1",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var st = { mode: "link", media: "square", label: "Label", description: "", current: false };
    var wrap = kit.el("div", { style: "width:calc(var(--common-sizes-120) + var(--common-sizes-40))" });
    ctx.preview.appendChild(wrap);
    // O modo (a ou button) é escolhido ao montar: trocar o modo recria o card
    function build(){
      wrap.innerHTML = "";
      // Mídia de exemplo: Shaped Icon do DS no centro do Slot
      var p = kit.el("cmp-clickable-card", { href: st.mode === "link" ? "#/clickable-card" : null, label: st.label, media: st.media === "auto" ? "auto" : null,
        description: st.description || null, current: st.mode === "button" || st.current ? String(st.current) : null }, [kit.el("cds-shaped-icon", { icon: "cards-line", appearance: "accent", size: "large" })]);
      // no specimen o link não navega; o botão alterna o selecionado, como nas galerias
      p.addEventListener("click", function(e){ if (st.mode === "link") e.preventDefault(); else { st.current = !st.current; p.setAttribute("current", String(st.current)); } });
      wrap.appendChild(p);
    }
    build();
    kit.hint(panel, "Composição do playground (prefixo cmp-): só tokens do Card e do menu. Link no menu em grade; botão nas galerias de ícones e ilustrações. Quando o DS tiver um Card clicável, ela sai (issue #1).");
    kit.section(panel, "Comportamento");
    kit.seg(panel, { label: "Modo", value: "link", options: [["link", "Link (href)"], ["button", "Botão (ação)"]], onChange: function(v){ st.mode = v; build(); } });
    kit.seg(panel, { label: "Media", value: "square", options: [["square", "Square"], ["auto", "Auto"]], onChange: function(v){ st.media = v; build(); } });
    kit.toggle(panel, { label: "Current (atual / selecionado)", checked: false, onChange: function(on){ st.current = on; build(); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Label", value: "Label", onInput: function(v){ st.label = v; var p = wrap.firstChild; if (p) p.setAttribute("label", v); } });
    kit.section(panel, "Acessibilidade");
    kit.text(panel, { label: "Description (aria-description)", value: "", onInput: function(v){ st.description = v; var p = wrap.firstChild; if (p) kit.attr(p, "description", v || null); } });
  }
});
