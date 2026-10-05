/* Documentação — .Item (Tabs) (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Item (Tabs) 6498:375) e do playground.
   Peça interna do Fixed Tab e Scrollable Tab; não é usada sozinha. Revisar com o time (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["tab-item"] = {
    tag: "cds-tab-item",
    base: { label: "Resumo" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=6498-375", sourceLabel: "Abrir o .Item (Tabs) no Figma",
    cover: { description: "Cada aba da Fixed Tab e da Scrollable Tab: Lead Item opcional, Label e o sublinhado.", examples: [ { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: [{ _tag: "cds-tab-item", label: "Resumo", "is-active": true }, { _tag: "cds-tab-item", label: "Detalhes" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Item é cada aba das Tabs: 48 de altura, Label com Lead Item opcional e o sublinhado (Tab divider). Is Active deixa o sublinhado em Accent e o Label em Label/Medium." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Fixed Tab e Scrollable Tab, que monta e controla os itens.", "Fora dele, use o componente completo (Fixed Tab e Scrollable Tab)."] },
        { compare: [{ title: "Dentro do Fixed Tab e Scrollable Tab", attrs: { _tag: "cds-fixed-tab", label: "Abas", _children: [{ _tag: "cds-tab-item", label: "Resumo" }, { _tag: "cds-tab-item", label: "Detalhes" }, { _tag: "cds-tab-item", label: "Histórico" }] } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Resumo", "show-lead-item": "true", icon: "chart-bar-line", "is-active": true }, markers: [{ n: 1, target: ".cds-icon", side: "left" }, { n: 2, target: ".cds-tab__label", side: "top" }, { n: 3, target: ".cds-tab", side: "bottom" }, { n: 4, target: "cds-badge", side: "right" }], legend: ["Lead Item (Choose Icon)", "Label", "Sublinhado (Tab divider)", "Badge (Show Badge)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["True", "False"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Lead Item", type: "Boolean", default: "false" },
          { name: "Choose Icon", type: "Instance swap", default: "placeholder" },
          { name: "Show Badge", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set .Item da lib estável. No código: `label`, `icon`, `show-lead-item`, `show-badge` e `badge-label` (Badge Warning, padrão \"0\"; ligado no .Item solto e desligado dentro do Fixed e do Scrollable Tab, como nas instâncias do Figma), `is-active`, `disabled`, `controls`; `state=\"hovered|pressed\"` só para exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: {} },
          { label: "Hovered", attrs: { state: "hovered" } },
          { label: "Pressed", attrs: { state: "pressed" } },
          { label: "Disabled", attrs: { disabled: true } },
          { label: "Is Active", attrs: { "is-active": true } },
          { label: "Com Lead Item", attrs: { "show-lead-item": "true", icon: "chart-bar-line" } },
          { label: "Sem Badge", attrs: { "show-badge": "false" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<button role=\"tab\">`; a lista (Fixed ou Scrollable Tab) cuida de `aria-selected`, foco e teclado.",
          "`controls` liga a aba ao painel (`aria-controls`).",
          "O Lead Item é decorativo: o nome vem do Label.",
          "Com o Badge visível, o nome da aba inclui o número separado do Label (ex.: \"Pendentes, 3\")."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o Lead Item em todas as abas da lista ou em nenhuma.", "Label curto, de uma linha (ver a tab Conteúdo da Fixed Tab)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion (o [Documentation] Tabs ainda está com texto de exemplo). No código, o sublinhado usa medium/02 + systemic/accelerate (CONFERIR C138)." } }
      ] }
    ]
  };
})();
