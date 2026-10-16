/* Playground — FAB Menu (CDS-1694)
   O FAB fica no canto inferior direito da área de preview e o menu abre para cima, como no layout real. */
CDS.register({
  id: "fab-menu", name: "FAB Menu", category: "Buttons", task: "CDS-1694",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/F1s1Tb3cDHYli4aN76QzCo/-CastanhaDS--Components?node-id=27075-22460",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:flex; justify-content:flex-end; align-items:flex-end; box-sizing:border-box; width:100%; min-height:calc(var(--common-sizes-200) * 2 + var(--common-sizes-56)); padding:var(--common-sizes-16);" });
    var p = kit.el("cds-fab-menu", { actions: "Nova solicitação:file-line, Pagar com Pix:pix-line, Pagar boleto:barcode-line" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }
    p.addEventListener("cds-toggle", function(e){ ctx.readout(e.detail.active ? "Aberto" : "Fechado", false); });
    p.addEventListener("cds-action", function(e){ ctx.readout("Ação: " + e.detail.label, false); });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "Is Active", onChange: function(on){ p.active = on; } });
    kit.hint(panel, "Toque no FAB para abrir e fechar. Tocar numa ação fecha o menu. Teclado: setas, Home, End e Esc.");
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Action 3", checked: true, onChange: function(on){ set("show-action-3", on ? null : "false"); } });
    [4, 5, 6].forEach(function(n){ kit.toggle(panel, { label: "Show Action " + n, onChange: function(on){ set("show-action-" + n, on); } }); });
    kit.hint(panel, "As ações 1 e 2 são fixas: o menu tem de 2 a 6 ações, sem rolagem.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Ações (rótulo:ícone, separadas por vírgula)", value: p.getAttribute("actions"), onInput: function(v){ set("actions", v || null); } });
    kit.text(panel, { label: "label do FAB (aria-label)", value: "Mais ações", onInput: function(v){ set("label", v || null); } });

    kit.section(panel, "Nested instances");
    kit.seg(panel, { label: ".FAB Button · Appearance", value: "accent", options: [["accent","Accent"],["neutral","Neutral"],["inversed","Inversed"]],
      onChange: function(v){ set("appearance", v === "accent" ? null : v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-accent-solid-medium)" : ""); } });
    kit.toggle(panel, { label: ".FAB Button · State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.iconSwap(panel, { label: ".FAB Button · Icon", value: "plus-line", onChange: function(v){ set("icon", v); } });
    var refresh = kit.nested(panel, { title: ".FAB Button", exposed: true, note: "Exposta para trocar Icon. Is Active acompanha o FAB Menu.",
      props: function(){ var f = p.fab; return f ? [["Appearance", f.getAttribute("appearance") || "accent"], ["Is Active", f.hasAttribute("active") ? "True" : "False"], ["Icon", f.hasAttribute("active") ? "close-line" : (f.getAttribute("icon") || "plus-line")]] : []; } });
    var refreshA = kit.nested(panel, { title: "Action 1 a Action 6 (Main Button)", exposed: true, note: "Expostas para trocar Text Label e Lead Icon. Ficam em Default, Neutral e Medium, com Elevation/level 1.",
      props: function(){ return [["Kind", "Default"], ["Appearance", "Neutral"], ["Size", "Medium"], ["Ações visíveis", String(p.querySelectorAll(".cds-fab-menu__actions cds-main-button").length)]]; } });
    kit.watch(p, function(){ refresh(); refreshA(); });
  }
});
