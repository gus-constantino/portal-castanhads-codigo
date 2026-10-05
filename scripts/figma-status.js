/* Status de publicação na lib [CastanhaDS] Components (LKZBwmlb7fIbDKdGrMncuA), por componente do playground.
   Lido via MCP do Figma com getPublishStatusAsync no nó do link de cada componente (a página não acessa a API).
   current = publicado sem alterações · changed = publicado com alterações não publicadas · unpublished = não publicado
   branch = o link aponta para uma branch e o componente não existe na main (Accordion, Accordion Item, Code Input OTP, Credit Card Input).
   Para atualizar: pedir uma nova leitura e trocar `checked`. */
window.CDS = window.CDS || {};
CDS.figmaStatus = {
  checked: "05/10/2026",
  items: (function(){
    var s = {}, add = function(status, ids){ ids.split(" ").forEach(function(id){ s[id] = status; }); };
    add("current", "drawer nav-control");
    add("unpublished", "banner breadcrumb-item calendar-day calendar-week credit-card-flags close-alert close-toast content-banner csat-item currency-content currency-symbol " +
      "date-navigation file-lead-item footer header icons-block lead-item list-lead-item nav-control-item nps-value-item select-number tab-item " +
      "progress-tracker table-cell table-head table-toolbar text-content trailing-item");
    add("branch", "accordion accordion-item code-input-otp credit-card-input");
    add("changed", "alert async-creatable-select-input async-select-input avatar backdrop badge balance-card bottom-sheet breadcrumb caju-brand caju-card card " +
      "checkbox-select-input checkbox chips-group confirmation-message content-list-item content-list csat-score currency date-input date-picker divider " +
      "drop-button dropzone filter-button filter-chips fixed-bar fixed-tab icon-button icon image input-chips link main-button modal-date-picker modal multi-select-input " +
      "nps-score pagination password-input popover progress-line progress-tracker-item quantity-input radio-button " +
      "radio-select-input scrollable-tab search-input selection-list-item selection-list shaped-icon slider spinner status-dot switch system-banner tab-view table tag " +
      "text-area text-input toast tooltip topic upload-item upload-list viewport-restriction checkbox-group radio-button-group switch-group");
    return s;
  })()
};
