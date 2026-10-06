/* Documentação — .Footer (Modal / Bottom Sheet) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Footer (Modal / Bottom Sheet) 16359:1792) e do playground.
   Peça interna do Modal e do Bottom Sheet; não é usada sozinha. Revisar com o time (C146). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["footer"] = {
    tag: "cds-footer",
    base: { "show-lead-icon": false, "primary-label": "Confirmar", "secondary-label": "Cancelar" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16359-1792", sourceLabel: "Abrir o .Footer (Modal / Bottom Sheet) no Figma",
    cover: { description: "Rodapé do Modal e do Bottom Sheet: divisor e as ações (primária e secundária).", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-footer", "show-lead-icon": false, kind: "horizontal", "primary-label": "Confirmar", "secondary-label": "Cancelar" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Footer é o rodapé do Modal e do Bottom Sheet: o Divider e as ações — Main Button Accent (primária) e Neutral (secundária). Kind=Horizontal põe os botões lado a lado, na largura do conteúdo. Kind=Pilled empilha, na largura total." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Modal e do Bottom Sheet, que monta e controla os itens.", "Fora dele, use o componente completo (Modal e do Bottom Sheet)."] },
        { compare: [{ title: "Dentro do Modal e do Bottom Sheet", attrs: { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [{ _tag: "cds-bottom-sheet", inline: true, "text-title": "Pedido de cartões", "primary-label": "Confirmar", "secondary-label": "Cancelar", _children: [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Revise os dados antes de confirmar." }] }] } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-footer", "show-lead-icon": false, kind: "horizontal", "primary-label": "Confirmar", "secondary-label": "Cancelar" }] }, markers: [{ n: 1, target: "cds-divider", side: "top", align: "start" }, { n: 2, target: "cds-main-button:last-child", side: "right" }, { n: 3, target: "cds-main-button:first-child", side: "left" }], legend: ["Divider", "Ação primária (Main Button Accent)", "Ação secundária (Main Button Neutral)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Pilled", values: ["Pilled", "Horizontal"] },
          { name: "Show Secondary Action Button", type: "Boolean", default: "true" },
          { name: "Show Divider", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Footer da lib estável. No código: `kind`, `show-divider`, `show-secondary-action-button`, `primary-label`, `secondary-label`, `show-lead-icon`, `primary-icon` e `secondary-icon`. Evento `cds-action { action }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Pilled", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-footer", "show-lead-icon": false, "primary-label": "Confirmar", "secondary-label": "Cancelar" }] } },
          { label: "Horizontal", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-footer", "show-lead-icon": false, kind: "horizontal", "primary-label": "Confirmar", "secondary-label": "Cancelar" }] } },
          { label: "Ação primária sozinha", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-footer", "show-lead-icon": false, "primary-label": "Entendi", "show-secondary-action-button": false }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "As ações são Main Buttons nativos, na ordem de leitura do layout.",
          "Rótulos que digam a ação (\"Confirmar pedido\"), não \"Sim\"/\"Não\"."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Pilled no mobile (Bottom Sheet) e Horizontal no desktop (Modal).", "Uma ação primária por rodapé."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Footer é estático. Os botões seguem o Motion do Main Button." }
      ] }
    ]
  };
})();
