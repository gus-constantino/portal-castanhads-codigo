/* Documentação — .User Profile · [CastanhaDS] Sponsor Templates (building block do Side Menu) */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-user-profile"] = {
  tag: "cds-sponsor-user-profile",
  base: { "user-name": "Ana Souza", cnpj: "12.345.678/0001-90" },
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5576-436", sourceLabel: "Abrir o .User Profile no Figma",
  cover: { description: "Rodapé de identificação do Side Menu: avatar, nome e CNPJ, com ação opcional." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Rodapé de identificação do Side Menu: avatar, nome e CNPJ, com ação opcional (Show Icon Button). Kind deriva do colapso do menu: Default (expandido) mostra os dados, Reduced (colapsado) mostra o avatar." },
      { note: "Texto da description do .User Profile. O Icon Button usa `menu-line`, como no Figma. A ação dele ainda não está descrita no set (C175)." }
    ] },
    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Reduced"] },
        { name: "User Name", type: "Text", default: "User Name" },
        { name: "CNPJ", type: "Text", default: "00.000.000/0001-00" },
        { name: "Show Icon Button", type: "Boolean", default: "true" }
      ] },
      { p: "Default 288×92 e Reduced 40×92 (altura mínima 92), fundo `Surface/01`, padding 24 0, gap 16 e itens alinhados pela base. Avatar Image Small (40), nome em `Label/Bold` e CNPJ em `Caption/Medium` com `Text/medium` (gap 4, sem corte), e Icon Button Small Default Neutral com `menu-line`." }
    ] }
  ]
};
