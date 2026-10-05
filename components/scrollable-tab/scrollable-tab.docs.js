/* Documentação — scrollable-tab: tab Conteúdo (regras de texto de Tabs)
   Mesmas regras de components/fixed-tab/fixed-tab.docs.js ([NEW] Content → Componentes → Tabs): lidas na hora de renderizar,
   para não duplicar o texto. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["scrollable-tab"] = {
    tag: "cds-scrollable-tab",
    get source(){ return (CDS.docs["fixed-tab"] || {}).source; }, sourceLabel: "Abrir Tabs em [NEW] Content no Figma",
    get tabs(){ return (CDS.docs["fixed-tab"] || { tabs: [] }).tabs; }
  };
})();
