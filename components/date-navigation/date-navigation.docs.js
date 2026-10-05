/* Documentação — .Navigation Control (Datepicker) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Navigation Control (Datepicker) 17465:384) e do playground.
   Peça interna do Date Picker; não é usada sozinha. Revisar com o time (C148). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["date-navigation"] = {
    tag: "cds-date-navigation",
    base: { "first-month": "Janeiro", year: "2026", "trailing-month": "Fevereiro" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17465-384", sourceLabel: "Abrir o .Navigation Control (Datepicker) no Figma",
    cover: { description: "Navegação do Date Picker: mês anterior, mês, ano e próximo mês.", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-date-navigation", "first-month": "Janeiro", year: "2026", "show-trailing-month": false }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Navigation Control fica no topo do Date Picker: o botão de mês anterior, o mês (e o mês seguinte, no Double Calendar), o ano e o botão de próximo mês. Clicar no mês ou no ano abre o seletor de mês ou de ano." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Date Picker, que monta e controla os itens.", "Fora dele, use o componente completo (Date Picker)."] },
        { compare: [{ title: "Dentro do Date Picker", attrs: { _tag: "cds-date-picker", today: "2026-01-20", month: "2026-01" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-date-navigation", "first-month": "Janeiro", year: "2026", "show-trailing-month": false }] }, markers: [{ n: 1, target: ".cds-dn__btn:first-child, cds-icon-button:first-child", side: "left" }, { n: 2, target: "cds-main-button", side: "top" }, { n: 3, target: "cds-icon-button:last-child", side: "right" }], legend: ["Left Control (mês anterior)", "Mês e ano (abrem os seletores)", "Right Control (próximo mês)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Show Left Control", type: "Boolean", default: "true" },
          { name: "Show First Month", type: "Boolean", default: "true" },
          { name: "Show Year", type: "Boolean", default: "true" },
          { name: "Show Trailing Month", type: "Boolean", default: "true" },
          { name: "Show Right Control", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do componente .Navigation Control da lib estável. No código: `first-month`, `year`, `trailing-month` e os `show-*`. Eventos `cds-prev`, `cds-next`, `cds-month` e `cds-year`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Single (um mês)", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-date-navigation", "first-month": "Janeiro", year: "2026", "show-trailing-month": false }] } },
          { label: "Double (dois meses)", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-date-navigation", "first-month": "Janeiro", year: "2026", "trailing-month": "Fevereiro" }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Anterior e próximo são Icon Buttons com nome; mês e ano são Main Buttons que abrem os seletores.",
          "No teclado do Date Picker, PageUp/PageDown também trocam de mês."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Mostre o mês seguinte só no Double Calendar.", "Use o nome do mês por extenso."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Os botões seguem o Motion do Icon Button e do Main Button." }
      ] }
    ]
  };
})();
