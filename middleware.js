/**
 * Acesso ao portal no Vercel (docs/PLANO-ACESSO.md, fase 2). Roda antes de cada arquivo ser entregue.
 * No GitHub Pages e no servidor local este arquivo não roda: lá o portal continua aberto como sempre.
 *
 * Perfis
 *   Visitante (sem código) · o pitch, as Novidades (D347), a tela de entrada e os arquivos que eles carregam
 *   Completo  (ACESSO_COMPLETO) · tudo
 *   Portal    (ACESSO_PORTAL)   · tudo, menos o Relatório e os dados dele
 *   Dashboard (D349, só por senha temporária) · a Visão geral do Relatório e os dados dela, sem o resto do portal
 *   MCP       (ACESSO_MCP no cabeçalho Authorization: Bearer …) · o catálogo e os núcleos de código do MCP
 *   Entrega   (fase 3) · /l/<código> abre o portal em modo entrega: só as páginas dos itens de uma entrega para dev
 *             (entregas/<slug>/entrega.json), com as docs deles, por 1 a 90 dias, sem código
 *   Página    (D341) · /l/<código> abre o portal só com um alvo: um componente, uma página, uma seção do menu
 *             ou uma categoria (ALVOS, gerado pelo build a partir de acesso/alvos.js), também por 1 a 90 dias
 *   Senhas temporárias (D349) · códigos de 6 dígitos gerados em acesso/senhas/ para um perfil (Completo, Portal ou
 *             Dashboard), de 5 minutos a 90 dias. O banco guarda o hash do código (nunca o código), e a sessão vence junto
 *             com a senha. Revogada, a sessão cai no próximo arquivo de conteúdo. Sem o banco não há senha temporária.
 *
 * Variáveis de ambiente do projeto no Vercel (nunca no repositório):
 *   ACESSO_COMPLETO, ACESSO_PORTAL · códigos de 6 dígitos de cada perfil
 *   ACESSO_SEGREDO · assina o cookie de acesso (trocar derruba todas as sessões)
 *   ACESSO_MCP     · chave do MCP
 *   ACESSO_ADMIN   · código de 6 dígitos da página de admin (/admin/), pedido além do Completo de senha fixa
 *   KV_REST_API_URL, KV_REST_API_TOKEN · banco Upstash (o mesmo do ranking): registro dos links gerados, para listar e revogar.
 *     Sem o banco, os links funcionam, mas não entram na lista nem podem ser revogados.
 * Sem ACESSO_SEGREDO o portal fica fechado para todos, menos o Visitante.
 *
 * Rotas do próprio middleware
 *   POST /acesso/entrar {codigo} · confere o código e grava os cookies (o limite de tentativas é a regra do Firewall do Vercel)
 *   GET  /acesso/sair            · apaga os cookies e leva à entrada
 *   GET  /acesso/perfil          · { perfil, admin } ou { perfil: null }
 *   POST /acesso/entrar {codigo, admin: true} · Completo de senha fixa: confere ACESSO_ADMIN e grava cds_admin (8 horas).
 *                                  Passa pela mesma rota da entrada para a regra de tentativas do Firewall valer também.
 *   GET  /acesso/admin/sair      · apaga o cds_admin e volta ao portal
 * Admin (D350): /admin/ e as telas e rotas de links e senhas pedem o Completo de senha fixa E o cookie cds_admin.
 *   POST /acesso/links {caminho, dias} · só o perfil Completo: devolve o link assinado da entrega (/entregas/<slug>/)
 *   POST /acesso/links {alvo, dias}    · só o perfil Completo: devolve o link de página do alvo (ex.: pagina:castanha-quiz)
 *                                        debitos: true (só em componente:<id>) leva a tab Débitos: o link abre também
 *                                        docs/debitos/<id>.json, os itens do Conferir só daquele componente (D369)
 *   GET  /acesso/links/ativos          · só o perfil Completo: os links registrados que ainda valem
 *   POST /acesso/links/revogar {id}    · só o perfil Completo: o link para de abrir na hora
 *   POST /acesso/senhas {perfil, minutos, nome} · só o Completo de senha fixa: devolve uma senha temporária (mostrada uma vez)
 *   GET  /acesso/senhas/ativas         · só o Completo de senha fixa: as senhas temporárias que ainda valem
 *   POST /acesso/senhas/revogar {id}   · só o Completo de senha fixa: a senha para de entrar e as sessões dela caem
 *   GET  /l/<código>             · confere o link, guarda o acesso no cookie cds_links e abre o portal na entrega ou no alvo
 * Cookies: cds_acesso (assinado, HttpOnly), cds_perfil (o perfil, legível pelo portal para ajustar o menu), cds_senha
 *   (quando a senha temporária vence, legível pelo portal) e
 *   cds_links (os links de entrega abertos neste navegador, cada um com a própria assinatura e validade) e cds_entrega
 *   (a entrega aberta por último, legível pelo portal para entrar no modo entrega) e cds_alvos (os alvos dos links de
 *   página, legível pelo portal para montar o menu; quem decide o que abre é o cds_links) e cds_debitos (os componentes
 *   dos links com a tab Débitos, legível pelo portal para mostrar a tab; quem decide o que abre também é o cds_links).
 * Revogação: o link revogado sai do registro. O middleware confere o registro ao abrir o link e em cada arquivo de conteúdo
 *   (páginas, pacote, docs, arquivos das páginas), não nos do shell; a página tira dos cookies o link revogado.
 *   Links de entrega gerados antes do registro (sem id) valem até vencer.
 */
export const config = { runtime: "nodejs" };

const DIAS = 30;
const ABERTO = [
  /^\/docs\/pitch(\/|\/index\.html|\/dados\.json|\/capturas\/[\w-]+\.(jpg|png|webp))?$/,
  /^\/entrar(\/|\/index\.html)?$/,
  /^\/novidades(\/|\/index\.html)?$/, // Novidades do Castanha DS (D347): aberta, com o pacote público
  /^\/dist\/cds-publico\.(css|js)$/,
  /^\/dist\/versao\.json$/, // versão do portal (D344): todo perfil e link confere
  /^\/styles\/(tokens|shared|icons)\.css$/,
  /^\/scripts\/(cds-element|playground-kit|assets-manifest)\.js$/,
  /^\/scripts\/vendor\/[\w.-]+\.js$/, // bibliotecas de terceiros (lottie-web das Animações, D361): abertas como os assets
  /^\/tokens\/motion-usage\.js$/, // uso de cada Motion Style (descrição no Figma), gerado pelo build-tokens
  /^\/assets\//,
  /^\/(favicon\.(ico|svg|png)|robots\.txt)$/
];
// entregas que podem ganhar link (fase 3): a pasta entregas/<slug>/ e o portal em modo entrega
const ENTREGA = /^\/entregas\/([a-z0-9-]+)\/$/;
// <entregas> gerado por scripts/build-index.js a partir de entregas/*/entrega.json: as docs que cada entrega libera
const ENTREGAS = {"big-number":["components/big-number/big-number.docs.js","components/currency/currency.docs.js","components/icon-button/icon-button.docs.js","components/variation-big-number/variation-big-number.docs.js"],"chat-input":["components/chat-input/chat-input.docs.js","components/chips-group/chips-group.docs.js","components/icon-button/icon-button.docs.js","components/input-chip/input-chip.docs.js"],"chips-small":["components/filter-chip/filter-chip.docs.js","components/input-chip/input-chip.docs.js"],"code-input-otp":["components/code-input-otp/code-input-otp.docs.js"],"credit-card-input":["components/card-flag/card-flag.docs.js","components/credit-card-input/credit-card-input.docs.js"],"draggable-list":["components/content-list-item/content-list-item.docs.js","components/content-list/content-list.docs.js","components/list-lead-item/list-lead-item.docs.js","components/trailing-item/trailing-item.docs.js"],"fab-menu":["components/fab-button/fab-button.docs.js","components/fab-menu/fab-menu.docs.js","components/main-button/main-button.docs.js"],"main-button-loading":["components/main-button/main-button.docs.js","components/spinner/spinner.docs.js"],"quantity-input":["components/quantity-input/quantity-input.docs.js"]};
// </entregas>
// <alvos> gerado por scripts/build-index.js: os arquivos que cada alvo de link de página libera
const ALVOS = {"componente:accordion":["components/accordion/accordion.docs.js"],"componente:accordion-item":["components/accordion-item/accordion-item.docs.js"],"componente:alert":["components/alert/alert.docs.js"],"componente:async-creatable-select-input":["components/async-creatable-select-input/async-creatable-select-input.docs.js","components/async-select-input/async-select-input.docs.js"],"componente:async-select-input":["components/async-select-input/async-select-input.docs.js"],"componente:avatar":["components/avatar/avatar.docs.js"],"componente:backdrop":["components/backdrop/backdrop.docs.js"],"componente:badge":["components/badge/badge.docs.js"],"componente:balance-card":["components/balance-card/balance-card.docs.js"],"componente:banner":["components/banner/banner.docs.js"],"componente:big-number":["components/big-number/big-number.docs.js"],"componente:bottom-sheet":["components/bottom-sheet/bottom-sheet.docs.js"],"componente:breadcrumb":["components/breadcrumb/breadcrumb.docs.js"],"componente:breadcrumb-item":["components/breadcrumb-item/breadcrumb-item.docs.js"],"componente:caju-brand":["components/caju-brand/caju-brand.docs.js"],"componente:caju-card":["components/caju-card/caju-card.docs.js"],"componente:calendar-day":["components/calendar-day/calendar-day.docs.js"],"componente:calendar-week":["components/calendar-week/calendar-week.docs.js"],"componente:card":["components/card/card.docs.js"],"componente:credit-card-flags":["components/card-flag/card-flag.docs.js"],"componente:carousel":["components/carousel/carousel.docs.js"],"componente:chat-input":["components/chat-input/chat-input.docs.js"],"componente:checkbox":["components/checkbox/checkbox.docs.js"],"componente:checkbox-select-input":["components/async-select-input/async-select-input.docs.js","components/checkbox-select-input/checkbox-select-input.docs.js"],"componente:chips-group":["components/chips-group/chips-group.docs.js"],"componente:close-alert":["components/close-alert/close-alert.docs.js"],"componente:close-toast":["components/close-toast/close-toast.docs.js"],"componente:code-input-otp":["components/code-input-otp/code-input-otp.docs.js"],"componente:confirmation-message":["components/confirmation-message/confirmation-message.docs.js"],"componente:content-banner":["components/content-banner/content-banner.docs.js"],"componente:content-list":["components/content-list/content-list.docs.js"],"componente:content-list-item":["components/content-list-item/content-list-item.docs.js"],"componente:credit-card-input":["components/credit-card-input/credit-card-input.docs.js"],"componente:csat-item":["components/csat-item/csat-item.docs.js"],"componente:csat-score":["components/csat-score/csat-score.docs.js"],"componente:currency":["components/currency/currency.docs.js"],"componente:currency-content":["components/currency-content/currency-content.docs.js"],"componente:currency-symbol":["components/currency-symbol/currency-symbol.docs.js"],"componente:date-input":["components/date-input/date-input.docs.js"],"componente:date-navigation":["components/date-navigation/date-navigation.docs.js"],"componente:date-picker":["components/date-picker/date-picker.docs.js"],"componente:divider":["components/divider/divider.docs.js"],"componente:drawer":["components/drawer/drawer.docs.js"],"componente:drop-button":["components/drop-button/drop-button.docs.js"],"componente:dropzone":["components/dropzone/dropzone.docs.js"],"componente:fab-button":["components/fab-button/fab-button.docs.js"],"componente:fab-menu":["components/fab-menu/fab-menu.docs.js"],"componente:file-lead-item":["components/file-lead-item/file-lead-item.docs.js"],"componente:filter-button":["components/filter-button/filter-button.docs.js"],"componente:filter-chips":["components/filter-chip/filter-chip.docs.js"],"componente:fixed-bar":["components/fixed-bar/fixed-bar.docs.js"],"componente:fixed-tab":["components/fixed-tab/fixed-tab.docs.js"],"componente:footer":["components/footer/footer.docs.js"],"componente:header":["components/header/header.docs.js"],"componente:icon":["components/icon/icon.docs.js"],"componente:icon-button":["components/icon-button/icon-button.docs.js"],"componente:icons-block":["components/icons-block/icons-block.docs.js"],"componente:image":["components/image/image.docs.js"],"componente:input-chips":["components/input-chip/input-chip.docs.js"],"componente:lead-item":["components/lead-item/lead-item.docs.js"],"componente:link":["components/link/link.docs.js"],"componente:list-lead-item":["components/list-lead-item/list-lead-item.docs.js"],"componente:main-button":["components/main-button/main-button.docs.js"],"componente:modal":["components/modal/modal.docs.js"],"componente:modal-date-picker":["components/modal-date-picker/modal-date-picker.docs.js"],"componente:multi-select-input":["components/async-select-input/async-select-input.docs.js","components/multi-select-input/multi-select-input.docs.js"],"componente:nav-control":["components/nav-control/nav-control.docs.js"],"componente:nav-control-item":["components/nav-control-item/nav-control-item.docs.js"],"componente:nps-score":["components/nps-score/nps-score.docs.js"],"componente:nps-value-item":["components/nps-value-item/nps-value-item.docs.js"],"componente:pagination":["components/pagination/pagination.docs.js"],"componente:password-input":["components/password-input/password-input.docs.js"],"componente:popover":["components/popover/popover.docs.js"],"componente:progress-line":["components/progress-line/progress-line.docs.js"],"componente:progress-tracker":["components/progress-tracker/progress-tracker.docs.js"],"componente:progress-tracker-item":["components/progress-tracker-item/progress-tracker-item.docs.js"],"componente:quantity-input":["components/quantity-input/quantity-input.docs.js"],"componente:radio-button":["components/radio-button/radio-button.docs.js"],"componente:radio-select-input":["components/async-select-input/async-select-input.docs.js","components/radio-select-input/radio-select-input.docs.js"],"componente:scrollable-tab":["components/fixed-tab/fixed-tab.docs.js","components/scrollable-tab/scrollable-tab.docs.js"],"componente:search-input":["components/search-input/search-input.docs.js"],"componente:select-number":["components/select-number/select-number.docs.js"],"componente:checkbox-group":["components/selection-group/selection-group.docs.js"],"componente:radio-button-group":["components/selection-group/selection-group.docs.js"],"componente:switch-group":["components/selection-group/selection-group.docs.js"],"componente:selection-list":["components/selection-list/selection-list.docs.js"],"componente:selection-list-item":["components/selection-list-item/selection-list-item.docs.js"],"componente:shaped-icon":["components/shaped-icon/shaped-icon.docs.js"],"componente:skeleton":["components/skeleton/skeleton.docs.js"],"componente:slider":["components/slider/slider.docs.js"],"componente:spinner":["components/spinner/spinner.docs.js"],"componente:sponsor-category":["components/sponsor-category/sponsor-category.docs.js"],"componente:sponsor-header":["components/sponsor-header/sponsor-header.docs.js"],"componente:sponsor-side-menu":["components/sponsor-side-menu/sponsor-side-menu.docs.js"],"componente:sponsor-subcategory":["components/sponsor-subcategory/sponsor-subcategory.docs.js"],"componente:sponsor-user-profile":["components/sponsor-user-profile/sponsor-user-profile.docs.js"],"componente:status-dot":["components/status-dot/status-dot.docs.js"],"componente:switch":["components/switch/switch.docs.js"],"componente:system-banner":["components/system-banner/system-banner.docs.js"],"componente:tab-item":["components/tab-item/tab-item.docs.js"],"componente:tab-view":["components/tab-view/tab-view.docs.js"],"componente:table":["components/table/table.docs.js"],"componente:table-cell":["components/table-cell/table-cell.docs.js"],"componente:table-head":["components/table-head/table-head.docs.js"],"componente:table-toolbar":["components/table-toolbar/table-toolbar.docs.js"],"componente:tag":["components/tag/tag.docs.js"],"componente:text-area":["components/text-area/text-area.docs.js"],"componente:text-content":["components/text-content/text-content.docs.js"],"componente:text-input":["components/text-input/text-input.docs.js"],"componente:toast":["components/toast/toast.docs.js"],"componente:tooltip":["components/tooltip/tooltip.docs.js"],"componente:topic":["components/topic/topic.docs.js"],"componente:trailing-item":["components/trailing-item/trailing-item.docs.js"],"componente:upload-item":["components/upload-item/upload-item.docs.js"],"componente:upload-list":["components/upload-list/upload-list.docs.js"],"componente:variation-big-number":["components/variation-big-number/variation-big-number.docs.js"],"componente:viewport-restriction":["components/viewport-restriction/viewport-restriction.docs.js"],"pagina:agentes":["resources/agentes/agentes.js"],"pagina:caju-theme":["resources/caju-theme/caju-theme.js"],"pagina:ilustracao":["resources/caju-theme/caju-theme.js"],"pagina:motion":["resources/caju-theme/caju-theme.js"],"pagina:camadas":["resources/camadas/camadas.js"],"pagina:capacitacoes":["resources/capacitacoes/capacitacoes.js"],"pagina:castanha-quiz":["resources/castanha-quiz/castanha-quiz.css","resources/castanha-quiz/castanha-quiz.js"],"pagina:changelog":["resources/changelog/changelog.js"],"pagina:conteudo":["resources/conteudo/conteudo.js"],"pagina:comece-aqui":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-instalacao":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-ambiente":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-pacotes":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-formularios":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-hooks":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-assets":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-grid":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-tokens":["resources/desenvolvimento/desenvolvimento.js"],"pagina:dev-universe":["resources/desenvolvimento/desenvolvimento.js"],"pagina:flutter-instalacao":["resources/desenvolvimento/desenvolvimento.js"],"pagina:flutter-ambiente":["resources/desenvolvimento/desenvolvimento.js"],"pagina:flutter-componentes":["resources/desenvolvimento/desenvolvimento.js"],"pagina:faq":["resources/faq/faq.js"],"pagina:mcp":["resources/mcp/mcp.js"],"pagina:patterns":["resources/patterns/patterns.css","resources/patterns/patterns.js"],"pagina:personas":["resources/personas/personas.js"],"pagina:treinamento":["resources/treinamento/treinamento.css","resources/treinamento/treinamento.js"],"secao:desenvolvimento":["resources/desenvolvimento/desenvolvimento.js"],"secao:padroes":["resources/caju-theme/caju-theme.js","resources/camadas/camadas.js","resources/conteudo/conteudo.js","resources/patterns/patterns.css","resources/patterns/patterns.js"],"secao:aprenda":["resources/capacitacoes/capacitacoes.js","resources/castanha-quiz/castanha-quiz.css","resources/castanha-quiz/castanha-quiz.js","resources/treinamento/treinamento.css","resources/treinamento/treinamento.js"],"secao:ferramentas":["resources/agentes/agentes.js","resources/mcp/mcp.js","resources/personas/personas.js"],"secao:ajuda":["resources/changelog/changelog.js","resources/faq/faq.js"],"categoria:actions":["components/balance-card/balance-card.docs.js"],"categoria:banner":["components/banner/banner.docs.js"],"categoria:buttons":["components/drop-button/drop-button.docs.js","components/fab-menu/fab-menu.docs.js","components/filter-button/filter-button.docs.js","components/icon-button/icon-button.docs.js","components/main-button/main-button.docs.js"],"categoria:caju-card":["components/caju-card/caju-card.docs.js"],"categoria:containers":["components/card/card.docs.js","components/fixed-bar/fixed-bar.docs.js"],"categoria:content":["components/big-number/big-number.docs.js","components/confirmation-message/confirmation-message.docs.js","components/currency/currency.docs.js","components/link/link.docs.js","components/topic/topic.docs.js"],"categoria:datepicker":["components/date-input/date-input.docs.js","components/date-picker/date-picker.docs.js","components/modal-date-picker/modal-date-picker.docs.js"],"categoria:dividers":["components/divider/divider.docs.js"],"categoria:feedback":["components/alert/alert.docs.js","components/system-banner/system-banner.docs.js","components/toast/toast.docs.js"],"categoria:file-upload":["components/dropzone/dropzone.docs.js","components/upload-item/upload-item.docs.js","components/upload-list/upload-list.docs.js"],"categoria:images":["components/avatar/avatar.docs.js","components/caju-brand/caju-brand.docs.js","components/icon/icon.docs.js","components/image/image.docs.js","components/shaped-icon/shaped-icon.docs.js"],"categoria:lists":["components/accordion-item/accordion-item.docs.js","components/accordion/accordion.docs.js","components/content-list-item/content-list-item.docs.js","components/content-list/content-list.docs.js","components/selection-list-item/selection-list-item.docs.js","components/selection-list/selection-list.docs.js"],"categoria:loaders":["components/spinner/spinner.docs.js"],"categoria:navigation":["components/breadcrumb/breadcrumb.docs.js","components/carousel/carousel.docs.js","components/fixed-tab/fixed-tab.docs.js","components/nav-control/nav-control.docs.js","components/pagination/pagination.docs.js","components/scrollable-tab/scrollable-tab.docs.js","components/tab-view/tab-view.docs.js"],"categoria:overlays":["components/backdrop/backdrop.docs.js","components/bottom-sheet/bottom-sheet.docs.js","components/drawer/drawer.docs.js","components/modal/modal.docs.js","components/popover/popover.docs.js"],"categoria:progress-indicators":["components/progress-line/progress-line.docs.js","components/progress-tracker-item/progress-tracker-item.docs.js","components/progress-tracker/progress-tracker.docs.js"],"categoria:rating-score":["components/csat-score/csat-score.docs.js","components/nps-score/nps-score.docs.js"],"categoria:selection-controls":["components/checkbox/checkbox.docs.js","components/chips-group/chips-group.docs.js","components/filter-chip/filter-chip.docs.js","components/input-chip/input-chip.docs.js","components/radio-button/radio-button.docs.js","components/selection-group/selection-group.docs.js","components/switch/switch.docs.js"],"categoria:slider":["components/slider/slider.docs.js"],"categoria:status":["components/badge/badge.docs.js","components/status-dot/status-dot.docs.js","components/tag/tag.docs.js"],"categoria:tables":["components/table/table.docs.js"],"categoria:text-fields":["components/async-creatable-select-input/async-creatable-select-input.docs.js","components/async-select-input/async-select-input.docs.js","components/chat-input/chat-input.docs.js","components/checkbox-select-input/checkbox-select-input.docs.js","components/code-input-otp/code-input-otp.docs.js","components/credit-card-input/credit-card-input.docs.js","components/multi-select-input/multi-select-input.docs.js","components/password-input/password-input.docs.js","components/quantity-input/quantity-input.docs.js","components/radio-select-input/radio-select-input.docs.js","components/search-input/search-input.docs.js","components/text-area/text-area.docs.js","components/text-input/text-input.docs.js"],"categoria:tooltips":["components/tooltip/tooltip.docs.js"],"categoria:utilities":["components/skeleton/skeleton.docs.js","components/viewport-restriction/viewport-restriction.docs.js"],"categoria:building-blocks":["components/breadcrumb-item/breadcrumb-item.docs.js","components/calendar-day/calendar-day.docs.js","components/calendar-week/calendar-week.docs.js","components/card-flag/card-flag.docs.js","components/close-alert/close-alert.docs.js","components/close-toast/close-toast.docs.js","components/content-banner/content-banner.docs.js","components/csat-item/csat-item.docs.js","components/currency-content/currency-content.docs.js","components/currency-symbol/currency-symbol.docs.js","components/date-navigation/date-navigation.docs.js","components/fab-button/fab-button.docs.js","components/file-lead-item/file-lead-item.docs.js","components/footer/footer.docs.js","components/header/header.docs.js","components/icons-block/icons-block.docs.js","components/lead-item/lead-item.docs.js","components/list-lead-item/list-lead-item.docs.js","components/nav-control-item/nav-control-item.docs.js","components/nps-value-item/nps-value-item.docs.js","components/select-number/select-number.docs.js","components/tab-item/tab-item.docs.js","components/table-cell/table-cell.docs.js","components/table-head/table-head.docs.js","components/table-toolbar/table-toolbar.docs.js","components/text-content/text-content.docs.js","components/trailing-item/trailing-item.docs.js","components/variation-big-number/variation-big-number.docs.js"],"categoria:templates":["components/sponsor-category/sponsor-category.docs.js","components/sponsor-header/sponsor-header.docs.js","components/sponsor-side-menu/sponsor-side-menu.docs.js","components/sponsor-subcategory/sponsor-subcategory.docs.js","components/sponsor-user-profile/sponsor-user-profile.docs.js"]};
// </alvos>
// o que o portal carrega no modo entrega: o shell e o código dos componentes. Fora: recursos, busca, docs de outros
// componentes e os dados do Relatório. O dist/cds.js é trocado pelo dist/cds-entrega.js (sem os recursos).
const ENTREGA_SHELL = [
  /^\/(index\.html)?$/, /^\/styles\/[\w.-]+\.css$/, /^\/scripts\/[\w.-]+\.js$/, /^\/integration\/[\w./-]+\.js$/,
  /^\/dist\/cds(-entrega)?\.(css|js)$/, /^\/(components|compositions|local)\/[\w-]+\/[\w.-]+\.(js|css|svg|png|jpg|webp)$/
];
// validade dos links: dias inteiros de 1 a 90 (as telas sugerem 2, 7, 14 e 30 e aceitam outro valor)
const LINK_DIAS_MAX = 90;
const PERFIS = /^(completo|portal|dashboard)$/;
// Dashboard (D349): o shell do portal (com o pacote sem os recursos) e os dados do Relatório; nada de docs, recursos nem MCP
const MCP = [/^\/dist\/mcp\//, /^\/scripts\/(react|flutter)-kit\.js$/];
// Relatório: os registros que ele lê e os checks das stacks (o perfil Portal não abre)
const RELATORIO = [
  /^\/docs\/[^/]+\.md$/, /^\/docs\/(tendencia|chamados)\.json$/, /^\/docs\/local\//, /^\/docs\/debitos\/[\w-]+\.json$/,
  /^\/integration\/(.+\/)?[^/]+\.md$/, /^\/integration\/(.+\/)?(stack-check|jsx-check|dart-check)\.json$/, /^\/tests\//
];

const enc = new TextEncoder();
const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
async function hmac(segredo, texto){
  const k = await crypto.subtle.importKey("raw", enc.encode(segredo), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", k, enc.encode(texto)));
}
// comparação em tempo constante (os dois lados viram HMAC antes, então têm o mesmo tamanho)
async function igual(a, b, segredo){
  const x = await hmac(segredo, String(a)), y = await hmac(segredo, String(b));
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.min(x.length, y.length); i++) d |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return d === 0;
}
function cookies(req){
  const out = {};
  String(req.headers.get("cookie") || "").split(/;\s*/).forEach((p) => { const i = p.indexOf("="); if (i > 0) out[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1)); });
  return out;
}
// a sessão do cookie: { p (perfil), e (vence em), t (id da senha temporária, quando entrou por uma) }
async function sessao(req, env){
  const c = cookies(req).cds_acesso, s = env.ACESSO_SEGREDO;
  if (!c || !s) return null;
  const [dados, sig] = c.split(".");
  if (!dados || !sig || !(await igual(sig, await hmac(s, dados), s))) return null;
  try {
    const p = JSON.parse(Buffer.from(dados.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!p || !p.e || Date.now() > p.e || !PERFIS.test(p.p) || (p.p === "dashboard" && !p.t)) return null;
    return p;
  } catch (e) { return null; }
}
async function perfil(req, env){ const s = await sessao(req, env); return s ? s.p : null; }
// o Completo de senha fixa: gerar links e senhas não vale para quem entrou por senha temporária (não passa da validade dela)
async function completoFixo(req, env){ const s = await sessao(req, env); return !!s && s.p === "completo" && !s.t; }
// admin (D350): o Completo de senha fixa com o cookie cds_admin assinado e em dia (8 horas depois da senha de admin)
const ADMIN_HORAS = 8;
// os códigos das variáveis do Vercel sem espaço nem quebra de linha (colar o valor às vezes traz junto)
const codigoEnv = (v) => String(v || "").replace(/\s+/g, "");
async function cookieAdmin(env){
  const dados = b64u(enc.encode(JSON.stringify({ e: Date.now() + ADMIN_HORAS * 36e5 })));
  return dados + "." + await hmac(env.ACESSO_SEGREDO, "admin." + dados);
}
async function admin(req, env){
  if (!env.ACESSO_ADMIN || !(await completoFixo(req, env))) return false;
  const [dados, sig] = String(cookies(req).cds_admin || "").split(".");
  if (!dados || !sig || !(await igual(sig, await hmac(env.ACESSO_SEGREDO, "admin." + dados), env.ACESSO_SEGREDO))) return false;
  try { return JSON.parse(Buffer.from(dados.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")).e > Date.now(); } catch (e) { return false; }
}
async function cookieAcesso(p, env, t, vence){
  const dados = b64u(enc.encode(JSON.stringify(Object.assign({ p, e: vence || Date.now() + DIAS * 864e5 }, t ? { t } : {}))));
  return dados + "." + await hmac(env.ACESSO_SEGREDO, dados);
}
// ---------- banco (Upstash Redis, o mesmo do ranking do Castanha Quiz): registro dos links ----------
function banco(env){
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL, token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return async (cmds) => {
    const r = await fetch(url.replace(/\/$/, "") + "/pipeline", { method: "POST", headers: { Authorization: "Bearer " + token, "content-type": "application/json" }, body: JSON.stringify(cmds) });
    if (!r.ok) throw new Error("banco " + r.status);
    return (await r.json()).map((x) => { if (x.error) throw new Error(x.error); return x.result; });
  };
}
const REGISTRO = "acesso:links"; // hash id → { tipo, alvo | caminho, titulo, link, criado, vence } (só o Completo lê)

// ---------- senhas temporárias (D349) ----------
// SENHAS: hash id → { nome, perfil, criado, vence, chave }. A chave "acesso:senha:<hmac do código>" guarda o id e some
// sozinha quando a senha vence (EX). O código em si nunca vai para o banco: a tela mostra uma vez.
const SENHAS = "acesso:senhas";
const SENHA_MIN = 5, SENHA_MAX = LINK_DIAS_MAX * 1440; // de 5 minutos a 90 dias, em minutos
const chaveSenha = async (codigo, env) => "acesso:senha:" + await hmac(env.ACESSO_SEGREDO, "senha." + codigo);
function sortear(){ // 6 dígitos sem viés (descarta o resto da divisão de 2^32 por 1e6)
  const n = new Uint32Array(1);
  do crypto.getRandomValues(n); while (n[0] >= 4294000000);
  return String(n[0] % 1e6).padStart(6, "0");
}
async function senhaTemporaria(codigo, env){
  const db = banco(env);
  if (!db) return null;
  try {
    const id = (await db([["GET", await chaveSenha(codigo, env)]]))[0];
    if (!id) return null;
    const x = JSON.parse((await db([["HGET", SENHAS, id]]))[0] || "null");
    return x && x.vence > Date.now() ? Object.assign({ id }, x) : null;
  } catch (e) { return null; }
}
// a senha temporária da sessão ainda está no registro? (banco fora do ar: vale a assinatura, como nos links)
async function senhaViva(t, env){
  const db = banco(env);
  if (!db) return false;
  try { return (await db([["HEXISTS", SENHAS, t]]))[0] === 1; } catch (e) { return true; }
}

// ---------- links de entrega e de página ----------
// dados do link: c (caminho da entrega) ou a (alvo), e (vence em), i (id no registro, quando o banco existe)
async function criarLink(dados, dias, env){
  const d = b64u(enc.encode(JSON.stringify(Object.assign({}, dados, { e: Date.now() + dias * 864e5 }))));
  return d + "." + await hmac(env.ACESSO_SEGREDO, "link." + d);
}
async function lerLink(codigo, env){
  const [dados, sig] = String(codigo || "").split(".");
  if (!dados || !sig || !env.ACESSO_SEGREDO || !(await igual(sig, await hmac(env.ACESSO_SEGREDO, "link." + dados), env.ACESSO_SEGREDO))) return null;
  try {
    const l = JSON.parse(Buffer.from(dados.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!l || !(l.e > Date.now())) return null;
    if (l.a) return ALVOS[l.a] ? l : null;
    const m = ENTREGA.exec(l.c);
    return m && ENTREGAS[m[1]] ? l : null;
  } catch (e) { return null; }
}
// cds_debitos: os componentes dos links com a tab Débitos (o portal lê para mostrar a tab); sem nenhum, apaga
function cookieDebitos(links, idade){
  const ids = links.filter((x) => x.l.d && /^componente:/.test(x.l.a || "")).map((x) => x.l.a.slice(11));
  return "cds_debitos=" + encodeURIComponent(ids.join("~")) + "; Path=/;" + (ids.length ? (idade ? " Max-Age=" + idade + ";" : "") : " Max-Age=0;") + " Secure; SameSite=Lax";
}
// os links do cookie com assinatura e validade em dia (o registro, para a revogação, é conferido à parte em ativos())
async function linksValidos(req, env){
  const out = [];
  for (const c of String(cookies(req).cds_links || "").split("~").filter(Boolean).slice(0, 20)){ const l = await lerLink(c, env); if (l) out.push({ codigo: c, l }); }
  return out;
}
async function ativos(lista, env){
  const db = banco(env), ids = lista.filter((x) => x.l.i).map((x) => x.l.i);
  if (!db || !ids.length) return lista;
  try {
    const r = await db([["HMGET", REGISTRO].concat(ids)]), vivo = {};
    ids.forEach((id, k) => { vivo[id] = r[0][k] !== null; });
    return lista.filter((x) => !x.l.i || vivo[x.l.i]);
  } catch (e) { return lista; } // banco fora do ar: vale a assinatura
}

const seguir = () => new Response(null, { headers: { "x-middleware-next": "1" } });
const json = (obj, status, extra) => new Response(JSON.stringify(obj), { status: status || 200, headers: Object.assign({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }, extra || {}) });
function quer(req){ // navegação de página (vai para a entrada) ou arquivo (responde 401/403)
  const a = String(req.headers.get("accept") || "");
  return a.includes("text/html");
}
function paraEntrar(url){
  const volta = url.pathname + url.search;
  return new Response(null, { status: 302, headers: { Location: "/entrar/" + (volta && volta !== "/" ? "?volta=" + encodeURIComponent(volta) : ""), "cache-control": "no-store" } });
}
const semAcesso = (html) => html
  ? new Response("<!doctype html><meta charset=utf-8><title>Sem acesso</title><p style=\"font-family:system-ui;margin:2rem\">Você não tem acesso a esta página. <a href=\"/\">Voltar ao portal</a></p>", { status: 403, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } })
  : new Response("Sem acesso", { status: 403, headers: { "cache-control": "no-store" } });

export default async function middleware(req){
  const env = process.env, url = new URL(req.url), path = decodeURIComponent(url.pathname);

  // --- rotas do próprio middleware ---
  if (path === "/acesso/entrar" && req.method === "POST"){
    if (!env.ACESSO_SEGREDO) return json({ erro: "O acesso ainda não foi configurado." }, 503);
    let codigo = "", pedeAdmin = false;
    try { const b = await req.json(); codigo = String(b.codigo || "").trim(); pedeAdmin = b.admin === true; } catch (e) {}
    if (!/^\d{6}$/.test(codigo)) return json({ erro: "Digite os 6 números do código." }, 400);
    if (pedeAdmin){
      if (!env.ACESSO_ADMIN) return json({ erro: "A senha de admin ainda não foi configurada no Vercel." }, 503);
      if (!(await completoFixo(req, env))) return json({ erro: "Entre no portal com o código Completo antes." }, 403);
      if (!(await igual(codigo, codigoEnv(env.ACESSO_ADMIN), env.ACESSO_SEGREDO))) return json({ erro: "Senha de admin incorreta. Confira e tente de novo." }, 401);
      const h = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
      h.append("set-cookie", "cds_admin=" + await cookieAdmin(env) + "; Path=/; Max-Age=" + ADMIN_HORAS * 3600 + "; HttpOnly; Secure; SameSite=Lax");
      return new Response(JSON.stringify({ admin: true, vence: new Date(Date.now() + ADMIN_HORAS * 36e5).toISOString() }), { status: 200, headers: h });
    }
    let p = null, temp = null;
    if (env.ACESSO_COMPLETO && await igual(codigo, codigoEnv(env.ACESSO_COMPLETO), env.ACESSO_SEGREDO)) p = "completo";
    else if (env.ACESSO_PORTAL && await igual(codigo, codigoEnv(env.ACESSO_PORTAL), env.ACESSO_SEGREDO)) p = "portal";
    else if ((temp = await senhaTemporaria(codigo, env)) && PERFIS.test(temp.perfil)) p = temp.perfil;
    if (!p) return json({ erro: "Código incorreto. Confira e tente de novo." }, 401);
    // senha temporária: a sessão vence junto com ela
    const idade = temp ? Math.max(1, Math.floor((temp.vence - Date.now()) / 1000)) : DIAS * 86400;
    const valor = temp ? await cookieAcesso(p, env, temp.id, temp.vence) : await cookieAcesso(p, env);
    const h = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    h.append("set-cookie", "cds_acesso=" + valor + "; Path=/; Max-Age=" + idade + "; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_perfil=" + p + "; Path=/; Max-Age=" + idade + "; Secure; SameSite=Lax");
    // cds_senha: quando a senha temporária vence (o portal mostra e esconde as telas de links e senhas); senha fixa apaga
    h.append("set-cookie", "cds_senha=" + (temp ? temp.vence + "; Path=/; Max-Age=" + idade : "; Path=/; Max-Age=0") + "; Secure; SameSite=Lax");
    return new Response(JSON.stringify(Object.assign({ perfil: p }, temp ? { vence: new Date(temp.vence).toISOString() } : {})), { status: 200, headers: h });
  }
  if (path === "/acesso/sair"){
    const h = new Headers({ Location: "/entrar/", "cache-control": "no-store" });
    h.append("set-cookie", "cds_acesso=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_perfil=; Path=/; Max-Age=0; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_senha=; Path=/; Max-Age=0; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_admin=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
    return new Response(null, { status: 302, headers: h });
  }
  if (path === "/acesso/admin/sair"){
    const h = new Headers({ Location: "/", "cache-control": "no-store" });
    h.append("set-cookie", "cds_admin=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
    return new Response(null, { status: 302, headers: h });
  }
  if (path === "/acesso/perfil") return json({ perfil: await perfil(req, env), admin: await admin(req, env), configurado: !!env.ACESSO_ADMIN, formato: /^\d{6}$/.test(codigoEnv(env.ACESSO_ADMIN)) });
  if (path === "/acesso/links" && req.method === "POST"){
    if (!(await admin(req, env))) return json({ erro: "Gerar links é do admin." }, 403);
    let b = {};
    try { b = await req.json(); } catch (e) {}
    const dias = Number(b.dias) || 14;
    if (!Number.isInteger(dias) || dias < 1 || dias > LINK_DIAS_MAX) return json({ erro: "Validade: de 1 a " + LINK_DIAS_MAX + " dias." }, 400);
    let dados, info;
    if (b.alvo !== undefined){
      const alvo = String(b.alvo || "");
      if (!ALVOS[alvo]) return json({ erro: "Escolha um item da lista." }, 400);
      dados = { a: alvo }; info = { tipo: "pagina", alvo, titulo: String(b.titulo || alvo).slice(0, 120) };
      if (b.debitos === true && /^componente:/.test(alvo)){ dados.d = 1; info.debitos = true; } // tab Débitos junto
    } else {
      const caminho = String(b.caminho || ""), m = ENTREGA.exec(caminho);
      if (!m || !ENTREGAS[m[1]]) return json({ erro: "Escolha uma das entregas da lista." }, 400);
      dados = { c: caminho }; info = { tipo: "entrega", caminho, titulo: String(b.titulo || m[1]).slice(0, 120) };
    }
    const db = banco(env), vence = Date.now() + dias * 864e5;
    let registrado = false, link;
    if (db){
      dados.i = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      link = url.origin + "/l/" + await criarLink(dados, dias, env);
      try { await db([["HSET", REGISTRO, dados.i, JSON.stringify(Object.assign(info, { link, criado: Date.now(), vence }))]]); registrado = true; }
      catch (e) { delete dados.i; } // sem registro o link ainda funciona, mas não pode ser revogado
    }
    if (!registrado) link = url.origin + "/l/" + await criarLink(dados, dias, env);
    return json({ link, caminho: info.caminho, alvo: info.alvo, debitos: !!info.debitos, vence: new Date(vence).toISOString(), registrado });
  }
  if (path === "/acesso/links/ativos"){
    if (!(await admin(req, env))) return json({ erro: "A lista de links é do admin." }, 403);
    const db = banco(env);
    if (!db) return json({ registro: false, links: [] });
    try {
      const r = (await db([["HGETALL", REGISTRO]]))[0] || [], links = [], vencidos = [];
      for (let k = 0; k < r.length; k += 2){
        let x = null; try { x = JSON.parse(r[k + 1]); } catch (e) {}
        if (!x || x.vence <= Date.now()) vencidos.push(r[k]); else links.push(Object.assign({ id: r[k] }, x));
      }
      if (vencidos.length) await db([["HDEL", REGISTRO].concat(vencidos)]);
      links.sort((p, q) => q.criado - p.criado);
      return json({ registro: true, links });
    } catch (e) { return json({ erro: "O registro de links não respondeu." }, 502); }
  }
  if (path === "/acesso/links/revogar" && req.method === "POST"){
    if (!(await admin(req, env))) return json({ erro: "Revogar links é do admin." }, 403);
    let b = {};
    try { b = await req.json(); } catch (e) {}
    const db = banco(env), id = String(b.id || "");
    if (!db) return json({ erro: "Sem o banco, os links não podem ser revogados." }, 503);
    if (!/^[a-f0-9]{16}$/.test(id)) return json({ erro: "Link desconhecido." }, 400);
    try { const r = await db([["HDEL", REGISTRO, id]]); return json({ revogado: r[0] === 1 }); }
    catch (e) { return json({ erro: "O registro de links não respondeu." }, 502); }
  }
  if (/^\/acesso\/senhas(\/ativas|\/revogar)?$/.test(path)){
    // gerar, listar e revogar senhas é do Completo de senha fixa: uma senha temporária não cria outras
    if (!(await admin(req, env))) return json({ erro: "Senhas temporárias são do admin." }, 403);
    const db = banco(env);
    if (path === "/acesso/senhas/ativas"){
      if (!db) return json({ registro: false, senhas: [] });
      try {
        const r = (await db([["HGETALL", SENHAS]]))[0] || [], senhas = [], vencidas = [];
        for (let k = 0; k < r.length; k += 2){
          let x = null; try { x = JSON.parse(r[k + 1]); } catch (e) {}
          if (!x || x.vence <= Date.now()) vencidas.push(r[k]); else senhas.push({ id: r[k], nome: x.nome, perfil: x.perfil, criado: x.criado, vence: x.vence });
        }
        if (vencidas.length) await db([["HDEL", SENHAS].concat(vencidas)]);
        senhas.sort((p, q) => q.criado - p.criado);
        return json({ registro: true, senhas });
      } catch (e) { return json({ erro: "O registro de senhas não respondeu." }, 502); }
    }
    if (req.method !== "POST") return json({ erro: "Use POST." }, 405);
    if (!db) return json({ erro: "Senhas temporárias precisam do banco do Vercel." }, 503);
    let b = {};
    try { b = await req.json(); } catch (e) {}
    if (path === "/acesso/senhas/revogar"){
      const id = String(b.id || "");
      if (!/^[a-f0-9]{16}$/.test(id)) return json({ erro: "Senha desconhecida." }, 400);
      try {
        const x = JSON.parse((await db([["HGET", SENHAS, id]]))[0] || "null");
        const r = await db([["HDEL", SENHAS, id]].concat(x && x.chave ? [["DEL", x.chave]] : []));
        return json({ revogada: r[0] === 1 });
      } catch (e) { return json({ erro: "O registro de senhas não respondeu." }, 502); }
    }
    const perfilNovo = String(b.perfil || ""), minutos = Number(b.minutos), nome = String(b.nome || "").trim().slice(0, 60);
    if (!PERFIS.test(perfilNovo)) return json({ erro: "Escolha o acesso: Completo, Portal ou Dashboard." }, 400);
    if (!Number.isInteger(minutos) || minutos < SENHA_MIN || minutos > SENHA_MAX) return json({ erro: "Duração: de " + SENHA_MIN + " minutos a " + LINK_DIAS_MAX + " dias." }, 400);
    if (!nome) return json({ erro: "Diga para quem é a senha." }, 400);
    const id = crypto.randomUUID().replace(/-/g, "").slice(0, 16), criado = Date.now(), vence = criado + minutos * 6e4;
    try {
      // sorteia até achar um código livre: diferente das senhas fixas e de outra senha temporária ativa (SET NX)
      for (let k = 0; k < 10; k++){
        const codigo = sortear();
        if (codigo === codigoEnv(env.ACESSO_COMPLETO) || codigo === codigoEnv(env.ACESSO_PORTAL)) continue;
        const chave = await chaveSenha(codigo, env);
        if ((await db([["SET", chave, id, "NX", "EX", String(minutos * 60)]]))[0] !== "OK") continue;
        await db([["HSET", SENHAS, id, JSON.stringify({ nome, perfil: perfilNovo, criado, vence, chave })]]);
        return json({ codigo, id, nome, perfil: perfilNovo, vence: new Date(vence).toISOString() });
      }
      return json({ erro: "Não achei um código livre. Tente de novo." }, 503);
    } catch (e) { return json({ erro: "O registro de senhas não respondeu." }, 502); }
  }
  if (path.startsWith("/l/")){
    const codigo = path.slice(3), l = await lerLink(codigo, env), vale = l && (await ativos([{ codigo, l }], env)).length;
    if (!vale) return new Response(null, { status: 302, headers: { Location: "/entrar/?link=vencido", "cache-control": "no-store" } });
    // guarda junto dos outros links ainda válidos (no máximo 20); o cookie vive até o link mais longo vencer
    const atuais = (await linksValidos(req, env)).filter((x) => (x.l.a || x.l.c) !== (l.a || l.c)).concat([{ codigo, l }]).slice(-20);
    const idade = Math.max.apply(null, atuais.map((x) => Math.ceil((x.l.e - Date.now()) / 1000)));
    // ?entrega=<slug> ou ?alvo=<alvo> abre o modo do link também para quem já tem perfil neste navegador (scripts/entrega.js);
    // a rota pedida no link (/l/<código>#/componente) segue no redirecionamento
    const h = new Headers({ Location: l.a ? "/?alvo=" + encodeURIComponent(l.a) : "/?entrega=" + ENTREGA.exec(l.c)[1], "cache-control": "no-store" });
    h.append("set-cookie", "cds_links=" + atuais.map((x) => x.codigo).join("~") + "; Path=/; Max-Age=" + idade + "; HttpOnly; Secure; SameSite=Lax");
    if (l.c) h.append("set-cookie", "cds_entrega=" + ENTREGA.exec(l.c)[1] + "; Path=/; Max-Age=" + idade + "; Secure; SameSite=Lax");
    const alvos = atuais.filter((x) => x.l.a).map((x) => x.l.a);
    if (alvos.length) h.append("set-cookie", "cds_alvos=" + encodeURIComponent(alvos.join("~")) + "; Path=/; Max-Age=" + idade + "; Secure; SameSite=Lax");
    h.append("set-cookie", cookieDebitos(atuais, idade));
    return new Response(null, { status: 302, headers: h });
  }

  // --- arquivos ---
  if (ABERTO.some((re) => re.test(path))) return seguir();
  // conteúdo (páginas, pacote, docs, dados) confere a revogação no banco; os arquivos do shell passam sem consultar
  const pagina = quer(req) || /^\/(index\.html)?$/.test(path), shell = !pagina && path !== "/dist/cds.js" && !/\.docs\.js$/.test(path) && ENTREGA_SHELL.some((re) => re.test(path));
  const sess = await sessao(req, env);
  if (sess && sess.t && !shell && !(await senhaViva(sess.t, env))){
    // senha temporária revogada: apaga a sessão e leva à entrada com o aviso
    const h = new Headers(pagina ? { Location: "/entrar/?senha=revogada", "cache-control": "no-store" } : { "cache-control": "no-store" });
    h.append("set-cookie", "cds_acesso=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_perfil=; Path=/; Max-Age=0; Secure; SameSite=Lax");
    h.append("set-cookie", "cds_senha=; Path=/; Max-Age=0; Secure; SameSite=Lax");
    return new Response(pagina ? null : "Senha revogada", { status: pagina ? 302 : 401, headers: h });
  }
  const p = sess ? sess.p : null;
  if (MCP.some((re) => re.test(path))){
    const chave = String(req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if ((p && p !== "dashboard") || (env.ACESSO_MCP && env.ACESSO_SEGREDO && chave && await igual(chave, env.ACESSO_MCP, env.ACESSO_SEGREDO))) return seguir();
    // o código React e Flutter de cada componente (painéis No React e No Flutter) também abre no modo entrega
    if (/^\/scripts\//.test(path) && (await linksValidos(req, env)).length) return seguir();
    return new Response("Chave do MCP ausente ou inválida", { status: 401, headers: { "cache-control": "no-store" } });
  }
  if (!p){
    // sem perfil: um link de entrega abre a pasta dela, o portal (sem os recursos) e as docs dos itens dela; um link de
    // página abre o portal (sem os recursos), a lista de alvos e os arquivos do alvo (docs e o arquivo da página).
    // O registro (revogação) é conferido nas páginas e no pacote, não em cada arquivo.
    // O registro (revogação) é conferido no conteúdo: as páginas (HTML), o pacote, a lista de alvos, as docs e os arquivos
    // das páginas. Os arquivos do shell (estilos, scripts, código dos componentes) passam sem consultar o banco.
    const todos = await linksValidos(req, env), links = shell ? todos : await ativos(todos, env);
    // página com link revogado no cookie: refaz os cookies sem ele e recarrega (o menu do portal lê o cds_alvos)
    if (pagina && links.length < todos.length){
      const h = new Headers({ Location: url.pathname + url.search, "cache-control": "no-store" });
      h.append("set-cookie", "cds_links=" + links.map((x) => x.codigo).join("~") + "; Path=/;" + (links.length ? "" : " Max-Age=0;") + " HttpOnly; Secure; SameSite=Lax");
      const restam = links.filter((x) => x.l.a).map((x) => x.l.a);
      h.append("set-cookie", "cds_alvos=" + encodeURIComponent(restam.join("~")) + "; Path=/;" + (restam.length ? "" : " Max-Age=0;") + " Secure; SameSite=Lax");
      if (!links.some((x) => x.l.c)) h.append("set-cookie", "cds_entrega=; Path=/; Max-Age=0; Secure; SameSite=Lax");
      h.append("set-cookie", cookieDebitos(links));
      return new Response(null, { status: 302, headers: h });
    }
    const ent = links.filter((x) => x.l.c).map((x) => ENTREGA.exec(x.l.c)[1]), alv = links.filter((x) => x.l.a).map((x) => x.l.a);
    if (ent.length && links.some((x) => x.l.c && path.startsWith(x.l.c))) return seguir();
    if (ent.length || alv.length){
      if (path === "/dist/cds.js") return new Response(null, { headers: { "x-middleware-rewrite": url.origin + "/dist/cds-entrega.js" + url.search } });
      const f = path.slice(1);
      if (alv.length && (path === "/acesso/alvos.js" || alv.some((a) => ALVOS[a].indexOf(f) >= 0))) return seguir();
      // tab Débitos: o arquivo do componente de um link gerado com a opção (os outros componentes e o CONFERIR.md não abrem)
      const deb = /^\/docs\/debitos\/([\w-]+)\.json$/.exec(path);
      if (deb && links.some((x) => x.l.d && x.l.a === "componente:" + deb[1])) return seguir();
      // ranking do time do Castanha Quiz (api/ranking.mjs): também para quem abriu um link que inclui o Quiz (decisão do time, 14/10)
      if (path === "/api/ranking" && alv.some((a) => ALVOS[a].indexOf("resources/castanha-quiz/castanha-quiz.js") >= 0)) return seguir();
      if (/\.docs\.js$/.test(path) ? ent.some((s) => ENTREGAS[s].indexOf(f) >= 0) : ENTREGA_SHELL.some((re) => re.test(path))) return seguir();
    }
    return quer(req) ? paraEntrar(url) : new Response("Entre no portal para abrir este arquivo", { status: 401, headers: { "cache-control": "no-store" } });
  }
  // a página de admin abre para o Completo de senha fixa (ela mesma pede a senha de admin); as telas de links e senhas, só com o admin
  if (/^\/admin(\/|\/index\.html)?$/.test(path) && (p !== "completo" || sess.t)) return semAcesso(quer(req));
  if (/^\/acesso\/(links|paginas|senhas)\//.test(path) && !(await admin(req, env))) return quer(req) && p === "completo" && !sess.t ? new Response(null, { status: 302, headers: { Location: "/admin/", "cache-control": "no-store" } }) : semAcesso(quer(req));
  if (p === "dashboard"){
    if (path === "/dist/cds.js") return new Response(null, { headers: { "x-middleware-rewrite": url.origin + "/dist/cds-entrega.js" + url.search } });
    if (RELATORIO.some((re) => re.test(path)) || (!/\.docs\.js$/.test(path) && ENTREGA_SHELL.some((re) => re.test(path)))) return seguir();
    return semAcesso(quer(req));
  }
  if (p === "portal" && RELATORIO.some((re) => re.test(path))) return semAcesso(quer(req));
  return seguir();
}
