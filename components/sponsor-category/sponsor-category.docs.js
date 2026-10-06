/* Documentação — .Category · [CastanhaDS] Sponsor Templates (building block do Side Menu) */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-category"] = {
  tag: "cds-sponsor-category",
  base: { label: "Colaboradores", icon: "team-line", "show-badge": "false" },
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-27", sourceLabel: "Abrir o .Category no Figma",
  cover: { description: "Item de navegação do Side Menu. Intent=Default navega direto, e Intent=Accordion abre subitens no Slot." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Item de navegação do Side Menu. Intent=Default navega direto. Intent=Accordion abre subitens (`.Subcategory`) no Slot. Appearance=Accent nos atalhos, Neutral nas categorias." },
      { h2: "Boas práticas" },
      { ul: ["Marque a página atual com Is Selected, um item por vez.", "Is Collapsed espelha o menu: não configure item a item.", "Use Show Badge para sinalizações pontuais (ex.: Novo)."] },
      { note: "Texto da description do .Category no [CastanhaDS] Sponsor Templates." }
    ] },
    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance e Is Selected" },
      { specimens: { min: "var(--common-sizes-200)", items: [
        { label: "Neutral", attrs: {} }, { label: "Neutral · Is Selected", attrs: { selected: "" } },
        { label: "Accent", attrs: { appearance: "accent" } }, { label: "Accent · Is Selected", attrs: { appearance: "accent", selected: "" } }
      ] } },
      { h2: "Kind e Intent" },
      { specimens: { min: "var(--common-sizes-200)", items: [
        { label: "Kind=Reduced", attrs: { kind: "reduced" } }, { label: "Intent=Accordion", attrs: { intent: "accordion" } }, { label: "Show Badge", attrs: { "show-badge": null } }, { label: "Disabled", attrs: { disabled: "" } }
      ] } }
    ] },
    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Reduced"] },
        { name: "Intent", type: "Variant", default: "Default", values: ["Default", "Accordion"] },
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Accent"] },
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Selected", type: "Variant", default: "True", values: ["False", "True"] },
        { name: "Is Collapsed", type: "Variant", default: "False", values: ["False", "True"] },
        { name: "Text Label", type: "Text", default: "Category" },
        { name: "Show Badge", type: "Boolean", default: "true" },
        { name: "Lead Icon", type: "Instance swap", default: "placeholder-line" },
        { name: "Slot", type: "Slot", default: "—" }
      ] },
      { p: "Fundo `Surface/01`, raio `Border/Radius/small`, padding 4 8 4 4 e gap 4. Lead Icon de 32 (selecionado: fundo `Surface/accent` e ícone `Icons/inversed`), Label em `Label/Medium` e Badge Warning. Hovered `Neutral/Opacity/Intense/semi-transparent`, Pressed `Surface/default` e Disabled com opacidade 0.4. Com o accordion aberto, o rótulo vai para `Label/Bold` e o Slot tem padding-left 12 e gap 8. Kind=Reduced: 40×40, Badge de 16 sem texto no canto." },
      { note: "No Figma, Is Collapsed=True é a variante que mostra o Slot aberto (C176). No código o accordion aberto é `expanded`, e o colapso do menu vira Kind=Reduced." }
    ] }
  ]
};
