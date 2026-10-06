/* Documentação — .Subcategory · [CastanhaDS] Sponsor Templates (building block do Side Menu) */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-subcategory"] = {
  tag: "cds-sponsor-subcategory",
  base: { label: "Ativos" },
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-27", sourceLabel: "Abrir no Figma",
  cover: { description: "Item de segundo nível do Side Menu, dentro do Slot de um .Category com Intent=Accordion." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Item de segundo nível, exibido dentro do Slot de um `.Category` com Intent=Accordion. O rótulo vem da property Text Label." },
      { h2: "Boas práticas" },
      { ul: ["O Trailing Icon padrão é a seta de navegação.", "Em recurso pago, troque a seta pela coroa no Trailing Icon, nunca as duas juntas."] },
      { note: "Texto da description do .Subcategory. A coroa ainda não está no [Caju] Icons (C174)." }
    ] },
    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Propriedades" },
      { props: [
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Text Label", type: "Text", default: "Label" },
        { name: "Show Lead Icon", type: "Boolean", default: "true" },
        { name: "Lead Icon", type: "Instance swap", default: "placeholder-line" },
        { name: "Show Trailing Icon", type: "Boolean", default: "true" },
        { name: "Trailing Icon", type: "Instance swap", default: "navigation-right-line" },
        { name: "Show Badge", type: "Boolean", default: "false" }
      ] },
      { p: "188×32, fundo `Surface/01`, raio `Border/Radius/small`, padding 0 8 e gap 8. Label em `Label/Regular` e `Text/medium` (no Hovered, `Text/intense`)." }
    ] }
  ]
};
