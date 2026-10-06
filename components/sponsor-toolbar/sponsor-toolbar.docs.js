/* Documentação — Toolbar · [CastanhaDS] Sponsor Templates (Templates › Sponsor)
   Fonte (06/10): componente Toolbar (5585:2). O Figma não tem description nem props: o texto de Uso descreve a composição. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["sponsor-toolbar"] = {
  source: "https://www.figma.com/design/9Tkkk4lusVKNEButGjvsNW/-CastanhaDS--Sponsor-Templates?node-id=5585-2", sourceLabel: "Abrir a Toolbar no Figma",
  cover: { description: "Barra de abas, busca e ações no topo das listas das páginas do Sponsor." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "informative", label: "Sem description no Figma", text: "O componente Toolbar não tem description nem props na lib. Esta página descreve a composição lida no Figma." } },
      { h2: "Composição" },
      { ul: [
        "Scrollable Tab no topo, com largura fixa de 320.",
        "Filter Controls: os campos de busca à esquerda e as ações à direita.",
        "Search Fields: Text Input e Async creatable Select Input, sem label nem supporting content, dividindo a largura.",
        "Action Controls: dois Main Buttons Default Neutral Medium com Lead Icon e o Filter button."
      ] },
      { note: "No Figma a Toolbar tem 1158 de largura. No código ela ocupa o container: abaixo de 900 as ações descem para a linha de baixo e abaixo de 560 os campos empilham." }
    ] },
    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Medidas" },
      { table: { head: ["Parte", "Layout", "Tamanho"], wrap: true, rows: [
        ["Toolbar", "Coluna, gap 24", "1158 × 120 (largura fixa no Figma)"],
        ["Scrollable Tab", "Active Item 1", "320 × 48 (fixo)"],
        ["Filter Controls", "Linha, gap 58, itens ao centro", "Preenche"],
        ["Search Fields", "Linha, gap 20", "Preenche e cresce; cada campo cresce igual (364)"],
        ["Action Controls", "Linha, gap 12", "Conteúdo (352)"]
      ] } },
      { note: "O gap de 58 não usa token no Figma (C179). Os Main Buttons da Toolbar estão com 107, abaixo do mínimo de 136 do componente (C180). No código: `active-item`, `first-action`, `second-action`, `search-placeholder`, `select-placeholder`, `filter-active`, `filter-count` e `show-tabs`, `show-search`, `show-select`, `show-actions`." }
    ] }
  ]
};
