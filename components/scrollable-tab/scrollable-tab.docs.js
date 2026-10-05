/* Documentação — Scrollable Tab: mesmas tabs da doc da Fixed Tab ([Documentation] Tabs + Conteúdo), lidas na hora de renderizar,
   para não duplicar o texto. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["scrollable-tab"] = {
    tag: "cds-scrollable-tab",
    base: {},
    cover: { description: "Abas no tamanho do conteúdo, com rolagem horizontal. Mesma documentação de Tabs da Fixed Tab.", wide: true, examples: [ { _tag: "cds-scrollable-tab", label: "Exemplo de abas", _children: ["Resumo", "Detalhes", "Histórico", "Documentos", "Pagamentos", "Configurações"].map(function(l){ return { _tag: "cds-tab-item", label: l }; }) } ] },
    get source(){ return (CDS.docs["fixed-tab"] || {}).source; }, sourceLabel: "Abrir [Documentation] Tabs no Figma",
    get tabs(){ return (CDS.docs["fixed-tab"] || { tabs: [] }).tabs; }
  };
})();
