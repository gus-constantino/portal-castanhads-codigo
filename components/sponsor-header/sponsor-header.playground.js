/* Playground — Header · [CastanhaDS] Sponsor Templates (menu Templates › Sponsor) */
CDS.register({
  id: "sponsor-header", name: "Header", template: "Sponsor", task: "CDS-985",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=4002-3849",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var h = kit.el("cds-sponsor-header", { title: "Colaboradores", "tag-label": "Tag", "drop-label": "Mais ações", "main-label": "Adicionar", notification: "3", style: "width:100%" });
    ctx.preview.appendChild(h);
    h.setBreadcrumb([{ label: "Início", href: "#" }, { label: "Pessoas", href: "#" }, { label: "Colaboradores", href: "#" }]);
    kit.hint(panel, "Cabeçalho das páginas internas dos produtos web. Largura da página: o Figma usa 1366.");
    kit.section(panel, "Booleans");
    [["show-heading", "Show Heading"], ["show-title", "Show Title"]].forEach(function(b){
      kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(h, b[0], on ? null : "false"); } });
    });
    kit.section(panel, "Instâncias do template");
    [["show-back", "Voltar"], ["show-breadcrumb", "Breadcrumb"], ["show-search", "Buscar"], ["show-notification", "Notificações"], ["show-close", "Fechar"],
     ["show-info", "Information Button"], ["show-tag", "Tag"], ["show-drop-button", "Drop Button"], ["show-main-button", "Main Button"]].forEach(function(b){
      kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ kit.attr(h, b[0], on ? null : "false"); } });
    });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Title", value: "Colaboradores", onInput: function(v){ h.setAttribute("title", v); } });
    kit.text(panel, { label: "Tag", value: "Tag", onInput: function(v){ h.setAttribute("tag-label", v); } });
    kit.text(panel, { label: "Drop Button", value: "Mais ações", onInput: function(v){ h.setAttribute("drop-label", v); } });
    kit.text(panel, { label: "Main Button", value: "Adicionar", onInput: function(v){ h.setAttribute("main-label", v); } });
    h.addEventListener("click", function(e){ var a = e.target.closest("a"); if (a && h.contains(a)) e.preventDefault(); });
  }
});
