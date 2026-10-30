/* Playground — Modal */
CDS.register({
  id: "modal", name: "Modal", category: "Overlays", figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16362-3267",
  mount: function(ctx){
    ctx.kit.overlay(ctx, { tag: "cds-modal", slot: function(){ return [ctx.kit.el("p", { text: "Conteúdo do Slot. Use para texto, listas ou formulários curtos.", style: "margin:0;padding:var(--common-sizes-8) 0;width:280px;font:var(--text-style-body-regular);color:var(--common-colors-text-medium)" })]; },
      hint: "Specimen no fluxo, como no Figma. A largura abraça o conteúdo (aqui, um texto de 280 + padding 20). O botão abre o Modal de verdade, com o Backdrop. Padrão Dialog: desligue Show Close Button e Dismissible.",
      booleans: [["show-header","Show Header"],["show-footer","Show Footer"],["show-close-button","Show Close Button (.Header)"],["show-text-description","Show Text Description (.Header)",false],["dismissible","Dismissible (fecha no Backdrop e no Esc)"],["show-header-divider","Show Divider (.Header)",false],["show-footer-divider","Show Divider (.Footer)",false]],
      texts: [["text-title","Text Title","Title"],["text-description","Text Description (.Header)","Description"],["primary-label","Primary Label","Label"],["secondary-label","Secondary Label","Label"]] });
  }
});
