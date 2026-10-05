/* Playground — Do/Don't (composição do playground, não é do DS: ver do-dont.js · C87) */
CDS.register({
  id: "do-dont", name: "Do/Don't", composition: true, category: "Composições",
  description: "Exemplo e legenda de uso certo ou errado (Use, Não use, Use com cautela), como nas páginas do Hub. Usado nas tabs de diretrizes das docs.",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var st = { kind: "do", heading: "", text: "Use um Main Button por tela para a ação principal.", example: true };
    var wrap = kit.el("div", { style: "width:calc(var(--common-sizes-200) + var(--common-sizes-120))" });
    ctx.preview.appendChild(wrap);
    // Exemplo e legenda entram pelo Slot antes de conectar: trocar o exemplo recria o card
    function build(){
      wrap.innerHTML = "";
      var kids = [];
      if (st.example) kids.push(kit.el("div", { slot: "example" }, [kit.el("cds-main-button", { label: "Salvar alterações", "show-lead-icon": "false", "show-trailing-icon": "false" })]));
      kids.push(kit.el("span", { text: st.text }));
      wrap.appendChild(kit.el("cmp-do-dont", { kind: st.kind, heading: st.heading || null }, kids));
    }
    build();
    kit.hint(panel, "Composição do playground (prefixo cmp-): o bloco Do/Don't das docs, no padrão do Hub, só com tokens. Filhos com slot=\"example\" vão para a caixa do exemplo; o resto, para a legenda.");
    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "do", options: [["do", "Do · Use"], ["dont", "Don't · Não use"], ["caution", "Caution · Use com cautela"]], onChange: function(v){ st.kind = v; wrap.firstChild.setAttribute("kind", v); } });
    kit.section(panel, "Booleans");
    kit.toggle(panel, { label: "Show Example", checked: true, onChange: function(on){ st.example = on; build(); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Heading", value: "", onInput: function(v){ st.heading = v; kit.attr(wrap.firstChild, "heading", v || null); } });
    kit.text(panel, { label: "Text", value: st.text, onInput: function(v){ st.text = v; build(); } });
  }
});
