/* Documentação — .Day (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Day 17482:44817) e do playground.
   Peça interna do Date Picker; não é usada sozinha. Revisar com o time (C148). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["calendar-day"] = {
    tag: "cds-calendar-day",
    base: { label: "15", "date-label": "15 de janeiro de 2026" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17482-44817", sourceLabel: "Abrir o .Day no Figma",
    cover: { description: "Cada dia do Date Picker: número, estado de seleção e o ponto do dia atual.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: [{ _tag: "cds-calendar-day", label: "13", selected: true, "role-kind": "start" }, { _tag: "cds-calendar-day", label: "14", selected: true, "role-kind": "middle" }, { _tag: "cds-calendar-day", label: "15", selected: true, "role-kind": "end" }, { _tag: "cds-calendar-day", label: "16", current: true }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Day é cada dia do calendário: 40×40, número em Label/Medium. Status=Selected destaca o dia. No intervalo, Role=Start, Middle e End arredondam exclusivamente as pontas. Is Current Day põe um ponto embaixo do número." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Date Picker, que monta e controla os itens.", "Fora dele, use o componente completo (Date Picker)."] },
        { compare: [{ title: "Dentro do Date Picker", attrs: { _tag: "cds-date-picker", today: "2026-01-20", month: "2026-01", start: "2026-01-13", end: "2026-01-24" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "20", current: true }, markers: [{ n: 1, target: ".cds-day__value", side: "left" }, { n: 2, target: ".cds-day__dot", side: "right" }], legend: ["Número (Value)", "Ponto do dia atual (Is Current Day)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Role", type: "Variant", default: "Default", values: ["Default", "Start", "Middle", "End"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Status", type: "Variant", default: "Unselected", values: ["Selected", "Unselected"] },
          { name: "Is Current Day", type: "Boolean", default: "false" }
        ] },
        { note: "Props e padrões lidos do set .Day da lib estável. No código: `label` (número), `role-kind` (default|start|middle|end — `role` é atributo global do HTML), `selected`, `current`, `disabled` e `date-label` (nome acessível). `state` é exclusivo dos exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Disabled", attrs: { disabled: true } },
          { label: "Selected", attrs: { selected: true } },
          { label: "Is Current Day", attrs: { current: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<button>` com a data por extenso (`date-label`). No Date Picker, recebe `aria-selected` e o foco itinerante.",
          "O dia de hoje tem `aria-current=\\\"date\\\"`. O ponto é decorativo."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Start, Middle e End são exclusivos do intervalo. Um dia solto usa Default.", "Dias indisponíveis ficam Disabled, não escondidos."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion (CONFERIR C148)." } }
      ] }
    ]
  };
})();
