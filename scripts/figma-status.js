/* Status de publicação na lib [CastanhaDS] Components (LKZBwmlb7fIbDKdGrMncuA), por componente do playground.
   Lido via MCP do Figma com getPublishStatusAsync no nó do link de cada componente (a página não acessa a API).
   current = publicado sem alterações · changed = publicado com alterações não publicadas · unpublished = não publicado
   branch = o link aponta para uma branch e o componente não existe na main (Chat Input, FAB, FAB Menu, Big Number, Variation Big Number).
   branch-update = a versão da main está publicada, mas a página já documenta uma melhoria que está numa branch e ainda não foi
     publicada (o que muda fica em `notes`). Não mostra "Publicado no Figma": a main e a branch estão diferentes (pedido do time, 09/10).
   Para atualizar: pedir uma nova leitura e trocar `checked`. */
window.CDS = window.CDS || {};
CDS.figmaStatus = {
  checked: "21/10/2026",
  items: (function(){
    var s = {}, add = function(status, ids){ ids.split(" ").forEach(function(id){ s[id] = status; }); };
    // Leitura de 21/10: o arrastar para reordenar do Content List Item (CDS-1592) entrou na main, ainda sem publicar; 42 componentes têm alterações na main esperando publicação
    add("changed", "async-creatable-select-input async-select-input banner bottom-sheet carousel checkbox checkbox-select-input chips-group " +
      "content-list content-list-item date-input date-picker drawer dropzone filter-chips fixed-bar fixed-tab icon-button input-chips link " +
      "main-button modal modal-date-picker multi-select-input nav-control pagination progress-tracker " +
      "progress-tracker-item quantity-input radio-select-input scrollable-tab search-input selection-group selection-list " +
      "selection-list-item switch tab-view table text-input upload-item upload-list");
    add("unpublished", "accordion accordion-item code-input-otp credit-card-input breadcrumb-item calendar-day calendar-week close-alert close-toast content-banner csat-item currency-content currency-symbol card-flag " +
      "date-navigation file-lead-item footer header icons-block lead-item list-lead-item nav-control-item nps-value-item select-number tab-item " +
      "table-cell table-head table-toolbar text-content trailing-item");
    add("branch", "chat-input fab-button fab-menu big-number variation-big-number");
    // Password Input: publicado com alterações na main (leitura de 21/10) e com o hotfix do ícone de aviso numa branch
    add("branch-update", "password-input");
    add("current", "alert avatar backdrop badge balance-card breadcrumb caju-brand caju-card card confirmation-message csat-score currency " +
      "divider drop-button filter-button icon image nps-score popover progress-line radio-button shaped-icon skeleton slider " +
      "spinner status-dot system-banner tag text-area toast tooltip topic viewport-restriction");
    // Sponsor Header e Side Menu (e os building blocks) são da lib Sponsor Templates, fora desta leitura
    return s;
  })(),
  // O que está na branch (branch-update): aparece no Tooltip da Tag
  notes: {
    "password-input": "o ícone de aviso no Warning e a boolean Show Visibility Action, CDS-2070, na branch D7w4pYHDcUZKZ1qEkCH12b"
  }
};
