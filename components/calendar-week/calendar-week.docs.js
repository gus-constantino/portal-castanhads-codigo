/* Documentação — .Week (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Week 17465:280) e do playground.
   Peça interna do Date Picker; não é usada sozinha. Revisar com o time (C148). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["calendar-week"] = {
    tag: "cds-calendar-week",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-280", sourceLabel: "Abrir o .Week no Figma",
    cover: { description: "Uma linha de 7 dias do Date Picker.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Week é uma linha do calendário com 7 .Day (280 × 40, raio small). No Date Picker cada semana é uma linha da grade." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Date Picker, que monta e controla os itens.", "Fora dele, use o componente completo (Date Picker)."] },
        { compare: [{ title: "Dentro do Date Picker", attrs: { _tag: "cds-date-picker", today: "2026-01-20", month: "2026-01", start: "2026-01-13", end: "2026-01-24" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-calendar-day:first-child", side: "left" }], legend: [".Day (7 por semana)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "—", type: "Componente", default: "7 .Day" }
        ] },
        { note: "O .Week não tem props na lib estável (17465:280). No código, sem filhos, mostra a amostra do Figma (7 dias \"30\"); no Date Picker, recebe os dias do mês." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Amostra do Figma", attrs: {} }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "No Date Picker, cada semana é uma linha da grade (`role=\\\"row\\\"`)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use dentro do Date Picker; sozinho, só como amostra."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Week é estático; os dias seguem o .Day." }
      ] }
    ]
  };
})();
