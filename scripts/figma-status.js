/* Status de publicação na lib [CastanhaDS] Components (LKZBwmlb7fIbDKdGrMncuA), por componente do playground.
   Lido via MCP do Figma com getPublishStatusAsync no nó do link de cada componente (a página não acessa a API).
   current = publicado sem alterações · changed = publicado com alterações não publicadas · unpublished = não publicado
   branch = o link aponta para uma branch e o componente não existe na main (Accordion, Accordion Item, Code Input OTP, Credit Card Input).
   branch-update = a versão da main está publicada, mas a página já documenta uma melhoria que está numa branch e ainda não foi
     publicada (o que muda fica em `notes`). Não mostra "Publicado no Figma": a main e a branch estão diferentes (pedido do Gustavo, 09/10).
   Para atualizar: pedir uma nova leitura e trocar `checked`. */
window.CDS = window.CDS || {};
CDS.figmaStatus = {
  checked: "16/10/2026",
  items: (function(){
    var s = {}, add = function(status, ids){ ids.split(" ").forEach(function(id){ s[id] = status; }); };
    // Leitura de 16/10: além do Size Small (CDS-1599) no Input Chips e no Filter Chips, Carousel, Drawer, Fixed Bar, Fixed Tab, Progress Tracker (e o item) e Scrollable Tab têm alterações na main esperando publicação
    add("changed", "carousel chips-group drawer filter-chips fixed-bar fixed-tab icon-button input-chips multi-select-input progress-tracker progress-tracker-item scrollable-tab");
    add("unpublished", "breadcrumb-item calendar-day calendar-week close-alert close-toast content-banner csat-item currency-content currency-symbol card-flag " +
      "date-navigation file-lead-item footer header icons-block lead-item list-lead-item nav-control-item nps-value-item select-number tab-item " +
      "table-cell table-head table-toolbar text-content trailing-item");
    add("branch", "accordion accordion-item chat-input code-input-otp credit-card-input");
    add("branch-update", "main-button content-list-item");
    add("current", "alert async-creatable-select-input async-select-input avatar backdrop badge balance-card banner bottom-sheet breadcrumb caju-brand caju-card card " +
      "checkbox-select-input checkbox confirmation-message content-list csat-score currency date-input date-picker divider " +
      "drop-button dropzone filter-button icon image link modal-date-picker modal nav-control " +
      "nps-score pagination password-input popover progress-line quantity-input radio-button " +
      "radio-select-input search-input selection-list-item selection-list shaped-icon skeleton slider spinner status-dot switch system-banner tab-view table tag " +
      "text-area text-input toast tooltip topic upload-item upload-list viewport-restriction selection-group");
    // Sponsor Header e Side Menu (e os building blocks) são da lib Sponsor Templates, fora desta leitura
    return s;
  })(),
  // O que está na branch (branch-update): aparece no Tooltip da Tag
  notes: {
    "main-button": "o estado Loading (Is Loading), CDS-1603, na branch pIX8i38mYWwax98yIjPmJw",
    "content-list-item": "arrastar para reordenar (Show Drag Handle e State=Dragged), CDS-1592, na branch bHFCiEbEkTYCXNipG4iqN0"
  }
};
