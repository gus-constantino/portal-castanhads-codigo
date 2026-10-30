/* Playground — Bottom Sheet */
CDS.register({
  id: "bottom-sheet", name: "Bottom Sheet", category: "Overlays", viewport: "mobile", // [MOBILE ONLY]: a prévia do menu monta em 360 figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20848-2679",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-bottom-sheet", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:var(--common-sizes-8) 0;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "<b>Mobile only.</b> No desktop o Viewport Restriction cobre o sheet (Common/Is Desktop); escolha 360 no topo. Aberto de verdade, arraste o handle para baixo para fechar.",
      booleans: [["show-header","Show Header"],["show-footer","Show Footer"],["show-text-description","Show Text Description (.Header)",false],["show-close-button","Show Close Button (.Header)"],["dismissible","Dismissible (fecha no Backdrop, Esc e arrasto)"]],
      texts: [["text-title","Text Title","Title"],["text-description","Text Description (.Header)","Description"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
