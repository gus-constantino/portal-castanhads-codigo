/* Documentação — .Variation Big Number (building block do Big Number · CDS-1597)
   Fonte: set .Variation Big Number 27246:396 na branch KOmiQxHXqiErSbLmoG3sv6 (description) e o handoff dev de 16/10.
   Peça interna do Big Number; não é distribuída sozinha. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function v(attrs){ return Object.assign({ _tag: "cds-variation-big-number" }, attrs); }

  CDS.docs["variation-big-number"] = {
    tag: "cds-variation-big-number",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/KOmiQxHXqiErSbLmoG3sv6/-CastanhaDS--Components?node-id=27246-396", sourceLabel: "Abrir o .Variation Big Number no Figma",
    cover: { description: "Variação do valor do Big Number, em texto e ícone, sem fundo.", examples: [ v({}) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Em desenvolvimento · CDS-1597", text: "Building block do Big Number, na branch do Figma. Entra no Release 26." } },
        { h2: "Sobre" },
        { p: "O .Variation Big Number mostra a variação do valor do Big Number, em texto e ícone, sem fundo. É um building block: não é distribuído sozinho." },
        { p: "Substitui o .Variation index do legado, agora com tokens da lib estável." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Big Number, ao lado do valor, via `Show Variation`.", "Inversed serve para o Big Number Accent.", "Para status com fundo, fora do Big Number, use a Tag."] },
        { compare: [{ title: "Dentro do Big Number", attrs: { _tag: "cds-big-number" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: v({}), markers: [{ n: 1, target: ".cds-vbn__label", side: "left" }, { n: 2, target: "cds-icon", side: "right" }], legend: ["Text Label: `Caption/Medium`", "Icon: 16, decorativo"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Positive", values: ["Positive", "Warning", "Negative", "Informative", "Inversed"] },
          { name: "Text Label", type: "Text", default: "+1%" },
          { name: "Icon", type: "Swap component", default: "up-down-line" }
        ] },
        { note: "No código: `appearance`, `label`, `icon` e `description` (sentido da variação para o leitor de tela)." },
        { table: { head: ["Appearance", "Texto e ícone"], rows: [
          ["Positive", "`Feedback/Positive/intense`"],
          ["Warning", "`Feedback/Warning/semi-intense`"],
          ["Negative", "`Feedback/Negative/semi-intense`"],
          ["Informative", "`Feedback/Informative/semi-intense`"],
          ["Inversed", "`Text/inversed`"]
        ] } },
        { note: "Positive usa `intense` porque o `semi-intense` não passava AA no Hovered do Big Number. Gap `Sizes/2` entre texto e ícone." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Appearance", items: [
          { label: "Positive", attrs: v({}) },
          { label: "Warning", attrs: v({ appearance: "warning", label: "-3%" }) },
          { label: "Negative", attrs: v({ appearance: "negative", label: "-8%" }) },
          { label: "Informative", attrs: v({ appearance: "informative", label: "0%" }) },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [v({ appearance: "inversed" })] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ol: [
          "O sentido da variação vai em texto, não só na cor e no ícone. Use `description`, ex.: Aumento de 1% em relação ao período anterior.",
          "Sem `description`, o leitor de tela ouve o texto visível.",
          "O ícone é decorativo (`aria-hidden`)."
        ] }
      ] }
    ]
  };
})();
