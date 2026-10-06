/* Documentação — Viewport Restriction (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (Viewport Restriction 5357:3899) e do playground.
   Usado pelo Drawer, Bottom Sheet e Modal Date Picker; não é usado sozinho. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["viewport-restriction"] = {
    tag: "cds-viewport-restriction",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=5357-3899", sourceLabel: "Abrir o Viewport Restriction no Figma",
    cover: { description: "Aviso de que o componente não está disponível no viewport atual.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Viewport Restriction cobre um componente que não existe naquele viewport, com o texto \"Componente não disponível nesse viewport\". O Drawer e o Modal Date Picker o mostram no mobile e no tablet (existem exclusivamente no desktop), e o Bottom Sheet, no desktop." },
        { h2: "Quando usar" },
        { ul: ["Dentro de componentes que não existem em todos os viewports: o Drawer e o Modal Date Picker (exclusivos do desktop) e o Bottom Sheet (sem desktop) o mostram onde não estão disponíveis.", "Não use em telas de produto."] },
        { compare: [{ title: "Drawer no viewport mobile", attrs: { _tag: "cds-drawer", inline: true, viewport: "mobile" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-viewport-restriction", side: "left" }], legend: ["Texto do aviso"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "—", type: "Componente", default: "200 × 200" }
        ] },
        { note: "O componente não tem props na lib estável (5357:3899). No código: `text` (padrão \"Componente não disponível nesse viewport\")." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Padrão", attrs: {} }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Tem `role=\"note\"`: o leitor de tela lê o aviso como nota."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Não use em telas de produto: serve para mostrar, no playground e nos protótipos, que o componente não existe naquele viewport."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
