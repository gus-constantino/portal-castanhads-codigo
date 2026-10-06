/* Playground — Side Menu · [CastanhaDS] Sponsor Templates (Templates › Sponsor)
   Itens de exemplo do playground (no Figma os rótulos são "Category" e "Label"). */
CDS.register({
  id: "sponsor-side-menu", name: "Side Menu", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-445",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var CATS = [["Início", "home-line"], ["Colaboradores", "team-line", ["Ativos", "Desligados", "Convites"]], ["Benefícios", "general-benefit-line"],
                ["Pedidos", "receipt-line"], ["Relatórios", "chart-bar-line", ["Saldos", "Uso por categoria"]], ["Configurações", "settings-line"]];
    var SHORT = [["Novo pedido", "receipt-line"], ["Adicionar pessoa", "user-add-line"]];
    var stage = kit.el("div", { "class": "pg-ssm-stage", style: "position:relative; display:flex; width:100%; height:calc(var(--common-sizes-200) * 4); background:var(--common-colors-surface-default);" });
    var m = kit.el("cds-sponsor-side-menu", null);
    SHORT.forEach(function(s){ m.appendChild(kit.el("cds-sponsor-category", { slot: "shortcuts", appearance: "accent", label: s[0], icon: s[1], "show-badge": "false" })); });
    CATS.forEach(function(c, i){
      var cat = kit.el("cds-sponsor-category", { label: c[0], icon: c[1], "show-badge": i === 2 ? null : "false", "badge-label": "Novo" });
      if (i === 0) cat.setAttribute("selected", "");
      if (c[2]){ cat.setAttribute("intent", "accordion"); c[2].forEach(function(l){ cat.appendChild(kit.el("cds-sponsor-subcategory", { label: l, "show-lead-icon": "false" })); }); }
      m.appendChild(cat);
    });
    var help = kit.el("cds-sponsor-category", { slot: "help", intent: "accordion", label: "Ajuda", icon: "support-line", "show-badge": "false" });
    ["Central de ajuda", "Falar com a Caju"].forEach(function(l){ help.appendChild(kit.el("cds-sponsor-subcategory", { label: l, "show-lead-icon": "false" })); });
    m.appendChild(help);
    m.appendChild(kit.el("cds-tag", { slot: "slot", appearance: "neutral", label: "Caju Tecnologia", "show-lead-item": "false" })); // Slot livre: exemplo do playground
    m.appendChild(kit.el("cds-sponsor-user-profile", { "user-name": "Ana Souza", cnpj: "12.345.678/0001-90" }));
    stage.appendChild(m);
    stage.appendChild(kit.el("div", { style: "flex:1; padding:var(--common-sizes-32); font:var(--text-style-body-regular); color:var(--common-colors-text-medium);", text: "Conteúdo da página. Com o menu colapsado, passe o mouse sobre ele: o menu abre por cima do conteúdo." }));
    ctx.preview.appendChild(stage);
    m.addEventListener("click", function(e){ var a = e.target.closest("a"); if (a) e.preventDefault(); });
    m.addEventListener("cds-select", function(e){ ctx.readout("cds-select · " + e.detail.item.getAttribute("label"), false); });
    kit.hint(panel, "Colapsado abre por hover ou foco, em overlay. Clicar num item seleciona ele, e abrir um accordion fecha os outros.");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "Is Collapsed", checked: true, onChange: function(on){ kit.attr(m, "collapsed", on ? null : "false"); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Shortcuts", checked: false, onChange: function(on){ kit.attr(m, "show-shortcuts", on ? "true" : null); } });
    kit.toggle(panel, { label: "Show Slot", checked: false, onChange: function(on){ kit.attr(m, "show-slot", on ? "true" : null); } });
  }
});
