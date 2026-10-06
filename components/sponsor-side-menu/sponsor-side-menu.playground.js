/* Playground — Side Menu · [CastanhaDS] Sponsor Templates (Templates › Sponsor)
   Conteúdo igual ao do componente no Figma (5576:445), inclusive as camadas ocultas: 9 categorias visíveis (6 accordion),
   5 atalhos (Show Shortcuts), Ajuda, User Profile e o Icon Button de fechar (show-close). Subitens da instância com todos os accordions
   abertos (5582:1812), sem Lead Icon. "Painel Incial" e "Recisão" estão assim no Figma (C177, C178).
   As 4 .Category de reserva ocultas no Figma não entram. */
CDS.register({
  id: "sponsor-side-menu", name: "Side Menu", template: "Sponsor",
  figma: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-445",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var SHORT = [["Painel Inicial", "home-line"], ["Soluções Caju", "castanha-line"], ["Novo Pedido", "request-balance-line"], ["Adicionar Colaborador", "user-add-line"], ["Cartões", "cards-line"]];
    var CATS = [["Painel Incial", "home-line"],
      ["Gestão de pessoas", "team-line", ["Painel", "Colaboradores", "Organograma", "Admissão", "Férias", "Ausências", "Fechamentos", "Assinatura digital", "Documentos", "Recisão", "Folha de Pagamento"]],
      ["Pedidos", "request-balance-line"],
      ["Benefícios e Premiações", "multibeneficios-line", ["Pedido", "Hub de Benefícios", "Saúde e Bem Estar", "Feirinha RH"]],
      ["Cartão do colaborador", "cards-line"],
      ["Reembolso e despesas", "despesas-line", ["Adiantamento", "Reembolsos", "Configurações"]],
      ["Financeiro", "coins-line", ["Créditos Caju", "Conta Caju do colaborador", "Assinaturas Caju"]],
      ["Relatórios", "chart-bar-line", ["Gestão de Pessoas", "Benefícios e Premiações", "Saúde e Bem Estar", "Cartão do colaborador", "Despesas", "Conta Caju", "Financeiro"]],
      ["Personalizações", "edit-line", ["Benefícios e Premiações", "Gestão de pessoas", "Empresa"]]];
    function subs(cat, list){ list.forEach(function(l){ cat.appendChild(kit.el("cds-sponsor-subcategory", { label: l, "show-lead-icon": "false" })); }); }
    var stage = kit.el("div", { "class": "pg-ssm-stage", style: "position:relative; display:flex; width:100%; height:calc(var(--common-sizes-200) * 4); background:var(--common-colors-surface-default);" });
    var m = kit.el("cds-sponsor-side-menu", null);
    SHORT.forEach(function(s){ m.appendChild(kit.el("cds-sponsor-category", { slot: "shortcuts", appearance: "accent", label: s[0], icon: s[1], "show-badge": "false" })); });
    CATS.forEach(function(c){
      var cat = kit.el("cds-sponsor-category", { label: c[0], icon: c[1], "show-badge": "false" });
      if (c[2]){ cat.setAttribute("intent", "accordion"); subs(cat, c[2]); }
      m.appendChild(cat);
    });
    var help = kit.el("cds-sponsor-category", { slot: "help", intent: "accordion", label: "Ajuda", icon: "support-line", "show-badge": "false" });
    subs(help, ["Label", "Label"]); m.appendChild(help); // a instância não abre a Ajuda: subitens padrão do .Category
    m.appendChild(kit.el("cds-tag", { slot: "slot", appearance: "neutral", label: "Slot", "show-lead-item": "false" })); // Slot livre (Show Slot): conteúdo de exemplo
    m.appendChild(kit.el("cds-sponsor-user-profile", null));
    stage.appendChild(m);
    stage.appendChild(kit.el("div", { style: "flex:1; padding:var(--common-sizes-32); font:var(--text-style-body-regular); color:var(--common-colors-text-medium);", text: "Conteúdo da página. Com o menu colapsado, passe o mouse sobre ele: o menu abre por cima do conteúdo." }));
    ctx.preview.appendChild(stage);
    m.addEventListener("click", function(e){ var a = e.target.closest("a"); if (a) e.preventDefault(); });
    m.addEventListener("cds-select", function(e){ ctx.readout("cds-select · " + e.detail.item.getAttribute("label"), false); });
    m.addEventListener("cds-close", function(){ ctx.readout("cds-close", false); });
    kit.hint(panel, "Colapsado abre por hover ou foco, em overlay. Clicar num item seleciona ele, e abrir um accordion fecha os outros.");
    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "Is Collapsed", checked: true, onChange: function(on){ kit.attr(m, "collapsed", on ? null : "false"); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Shortcuts", checked: false, onChange: function(on){ kit.attr(m, "show-shortcuts", on ? "true" : null); } });
    kit.toggle(panel, { label: "Show Slot", checked: false, onChange: function(on){ kit.attr(m, "show-slot", on ? "true" : null); } });
    kit.toggle(panel, { label: "Abrir todos os accordions (instância 5582:1812)", checked: false, onChange: function(on){
      [].forEach.call(m.querySelectorAll(".cds-ssm__categories cds-sponsor-category[intent=accordion]"), function(c){ c.expanded = on; }); // direto, sem a regra de um aberto por vez
      stage.style.height = ""; if (on) requestAnimationFrame(function(){ stage.style.height = m.panel.scrollHeight + "px"; }); // a prévia cresce para mostrar o menu inteiro
    } });
    kit.section(panel, "Camadas ocultas no Figma");
    kit.toggle(panel, { label: "Icon Button de fechar (gaveta)", checked: false, onChange: function(on){ kit.attr(m, "show-close", on ? "true" : null); } });
  }
});
