/* Playground — Avatar */
CDS.register({
  id: "avatar", name: "Avatar", category: "Images",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=2278-92",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var stage = kit.el("div", { style: "display:grid; place-items:center; padding:var(--common-sizes-16);" });
    var p = kit.el("cds-avatar", { kind: "default", appearance: "neutral", size: "small", label: "AA", src: "assets/brand/avatar-photo.jpg" });
    stage.appendChild(p); ctx.preview.appendChild(stage);
    function set(n, v){ kit.attr(p, n, v); }

    kit.section(panel, "Variants");
    kit.seg(panel, { label: "Kind", value: "default", options: [["default","Default"],["initial","Initial"],["image","Image"]], onChange: function(v){ set("kind", v); } });
    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["inversed","Inversed"]],
      hint: "Inversed é para fundo escuro: o preview ganha fundo inverso.", onChange: function(v){ set("appearance", v); kit.surface(ctx.preview, v === "inversed" ? "var(--common-colors-surface-inversed)" : ""); } });
    kit.seg(panel, { label: "Size", value: "small", options: [["small","Small 40"],["medium","Medium 48"],["large","Large 64"]], onChange: function(v){ set("size", v); } });
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label (Initial)", value: "AA", onInput: function(v){ p.setAttribute("label", v); } });
    kit.text(panel, { label: "name (nome acessível)", placeholder: "ex.: Ana Alves", onInput: function(v){ set("name", v); } });

    kit.section(panel, "Nested instances");
    var refresh = kit.nested(panel, { title: "Icon (Kind=Default)", exposed: false, note: "user-line · 20px no Small/Medium, 24px no Large.",
      props: function(){ var i = p.iconEl; return i ? [["Choose Icon", "user-line"], ["Size", i.getAttribute("size")], ["Appearance", i.getAttribute("appearance")]] : [["Kind", p.getAttribute("kind")]]; } });
    kit.watch(p, refresh);
  }
});
