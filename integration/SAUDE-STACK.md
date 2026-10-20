# Saúde da stack — Figma × castanha-react × playground × castanha-ai

Gerado por `node scripts/integration/build-manifest.js` em 2026-10-20 (R2). Figma: `integration/figma-props.tsv` (lido via MCP, só leitura). React: `origin/staging` (`039c0d37`) e Code Connect `origin/feat/figma-code-connect`. Playground: mapas de `integration/prop-map/`. castanha-ai (4º vértice, repo interno, só leitura): `origin/feat/castanha-plugin` (`a49bd59`), 76 sets no bridge. A coluna Gap usa as categorias do Gap Report do castanha-ai.

## Resumo

| Nível | O que significa | Itens |
|---|---|---:|
| Alta | quebra a tradução: o Code Connect lê prop ou gera valor que não existe | 2 |
| Média | muda o resultado sem quebrar: padrão diferente, opção sem tradução, mapa curado errado | 7 |
| Informativo | prop do Figma que não chega ao React pelo Code Connect | 29 |

Componentes com algum item: 34 de 72 com par no React.

## Assets

Nomes que o código usa (`<Icon name>`, `<Illustration name>`, `<Motion name>`) × [Caju] Icons, [Caju] Illustrations e [Caju] Motion do playground.

| Pacote | No pacote | No playground | Mesmo nome | Renomeado | Só aqui | Só no pacote |
|---|---:|---:|---:|---:|---:|---:|
| castanha-icons | 272 | 273 | 262 | — | 11 | 10 |
| castanha-illustrations | 254 | 260 | 202 | 49 | 9 | 3 |
| castanha-motion | 49 | 46 | 46 | — | 0 | 3 |

| Nível | Tipo | O quê |
|---|---|---|
| Média | icone-so-no-pacote | O castanha-icons exporta ícones que não existem no [Caju] Icons: `balance-canceled`, `book-line`, `calendar-non-recurrent`, `design-line`, `feedback-line`, `file-line-1`, `inspect-line`, `magical-wand-line`, `monitor-line`, `template-line`. |
| Informativo | icone-deprecated-no-pacote | Deprecated no Figma, mas ainda exportados pelo pacote: `dark-mode-line`. |
| Informativo | icone-deprecated-fora | Deprecated no Figma e já fora do pacote: `phone-line`, `megaphone-line`, `delivery-line`, `conversation-line`, `airplane-line`, `several-line`, `file-text-error-line`, `benefit-line`, `pause-line`, `caju-ciclos`, `bus-sideview`. |
| Alta | ilustracao-fora-do-pacote | Ilustrações do [Caju] Illustrations sem par no castanha-illustrations: `alimentos/drink`, `notificacoes/analysis-low-detail`, `hero-hub-de-beneficios/plano-saude`, `hero-hub-de-beneficios/alimentacao`, `hero-hub-de-beneficios/educacao`, `hero-hub-de-beneficios/plano-odonto`, `hero-hub-de-beneficios/mobilidade`, `hero-hub-de-beneficios/cajuzinho`, `hero-hub-de-beneficios/outros`. |
| Média | ilustracao-so-no-pacote | O castanha-illustrations exporta ilustrações sem par no [Caju] Illustrations: `hero-hub-feedback`, `hero-sponsor-splash-screen`, `objetos-arvore-natal`. |
| Média | ilustracao-renomeada | 49 ilustrações têm outro nome no pacote (o nome do Figma não serve no `<Illustration name>`): `hub-de-beneficios/pet` → `hub-pet`, `hub-de-beneficios/departamento` → `hub-departamento`, `hub-de-beneficios/plano-saude` → `hub-plano-saude`, `hub-de-beneficios/servicos` → `hub-servicos`, `hub-de-beneficios/entretenimento` → `hub-entretenimento`, `hub-de-beneficios/plano-odonto` → `hub-plano-odonto`, `hub-de-beneficios/educacao` → `hub-educacao`, `hub-de-beneficios/cajuzinho` → `hub-cajuzinho`, `hub-de-beneficios/alimentacao` → `hub-alimentacao`, `hub-de-beneficios/outros` → `hub-outros`, `hub-de-beneficios/saude` → `hub-saude`, `hub-de-beneficios/ofertas` → `hub-ofertas`, `hub-de-beneficios/mobilidade` → `hub-mobilidade`, `hub-de-beneficios/esportes` → `hub-esportes`, `hub-de-beneficios/familia` → `hub-familia`, `hub-de-beneficios/seguro-vida-previdencia` → `hub-previdencia`, `documentos/socio-low-detail` → `low-detail-socio`, `documentos/rg-cnh-frente-low-detail` → `low-detail-rg-cnh-frente`, `documentos/rg-cnh-verso-low-detail` → `low-detail-rg-cnh-verso`, `documentos/rg-papeis-low-detail` → `low-detail-rg-papeis`, `documentos/ctps-low-detail` → `low-detail-ctps`, `financas/cartao-bilhete-unico-low-detail` → `low-detail-cartao-bilhete-unico`, `financas/cartao-customizacao-low-detail` → `low-detail-cartao-customizacao`, `objetos/gema-rubi` → `premiacoes-gema-rubi`, `objetos/gema-esmeralda` → `premiacoes-gema-esmeralda`, `objetos/gema-ouro` → `premiacoes-gema-ouro`, `graficos-e-dashboards/pizza` → `grafico-pizza`, `graficos-e-dashboards/setores` → `grafico-setores`, `graficos-e-dashboards/barra` → `grafico-barra`, `graficos-e-dashboards/objetivo-1` → `graficos-objetivo-1`, `graficos-e-dashboards/objetivo-2` → `graficos-objetivo-2`, `graficos-e-dashboards/objetivo-3` → `graficos-objetivo-3`, `interfaces/lista` → `interface-lista`, `interfaces/assinatura` → `interface-assinatura`, `interfaces/nota-fiscal` → `interface-nota-fiscal`, `interfaces/carrossel` → `interface-carrossel`, `interfaces/customizacao` → `interface-customizacao`, `interfaces/planilha` → `interface-planilha`, `interfaces/home` → `interface-home`, `hero-employee/login` → `employee-login`, `hero-employee/splash-screen` → `employee-splash-screen`, `hero-hub-de-beneficios/seguros-previdencia` → `hero-hub-seguro-previdencia`, `hero-hub-de-beneficios/familia` → `hero-hub-familia`, `hero-hub-de-beneficios/descontos` → `hero-hub-descontos`, `hero-hub-de-beneficios/familia-2` → `hero-hub-familia-2`, `hero-hub-de-beneficios/fitness` → `hero-hub-fitness`, `hero-hub-de-beneficios/cultura` → `hero-hub-cultura`, `hero-hub-de-beneficios/home-office` → `hero-hub-home-office`, `hero-hub-de-beneficios/lazer` → `hero-hub-lazer`. |
| Informativo | ilustracao-svg-difere | 16 ilustrações têm o desenho diferente do pacote além do arredondamento (posição no quadro ou forma; conferir qual é a atual): `autenticacao-ocr-cartao-2`, `dispositivos-celular-cartao-aproximacao`, `dispositivos-celular-cartao-virtual-wallet-1`, `dispositivos-celular-cartao-virtual-1`, `dispositivos-celular-cartao-virtual-2`, `financas-moeda-verde-1`, `financas-moeda-verde-2`, `financas-moeda-verde-3`, `financas-moeda-verde-4`, `financas-cartao-voucher`, `financas-cartoes-fisico-voucher`, `financas-cartao-virtual-minimalista`, `financas-cartao-voucher-minimalista`, `financas-cartoes-fisico-virtual`, `financas-cartao-virtual-wallet-1`, `financas-cartao-virtual-wallet-2`. |
| Informativo | motion-so-no-pacote | O castanha-motion tem animações sem componente no [Caju] Motion (fora de Motion › Animações): `feedback-splash`, `feedback-success`, `feedback-warning`. |

## Tokens

Alias `--castanha-*` do playground (`styles/tokens.css`) × `castanha-tokens` (`origin/staging`): **211 de 211** batem em nome e valor (light, dark e os três modos de viewport).

| Nível | Tipo | O quê |
|---|---|---|
| Informativo | token-so-no-playground | Alias sem par no castanha-tokens (o Figma tem, o pacote ainda não): `--castanha-carousel-gap`. |

## Alta

| Componente | Tipo | Gap | O quê |
|---|---|---|---|
| Topic (`topic`) | cc-prop-react-inexistente | — | O Code Connect gera `label` em `<Topic>`, que não existe nas props do React (o código gerado não compila em TypeScript). |
| Topic (`topic`) | cc-prop-react-inexistente | — | O Code Connect gera `supportingMessage` em `<Topic>`, que não existe nas props do React (o código gerado não compila em TypeScript). |

## Média

| Componente | Tipo | Gap | O quê |
|---|---|---|---|
| Alert (`alert`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Appearance`: uma instância nova no Figma vem Positive (`positive`); no React, sem a prop, vem `informative`. |
| Avatar (`avatar`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Size`: uma instância nova no Figma vem Small (`small`); no React, sem a prop, vem `medium`. |
| Badge (`badge`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Appearance`: uma instância nova no Figma vem Warning (`warning`); no React, sem a prop, vem `neutral`. |
| Spinner (`spinner`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Appearance`: uma instância nova no Figma vem Neutral (`neutral`); no React, sem a prop, vem `accent`. |
| Spinner (`spinner`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Size`: uma instância nova no Figma vem Small (`small`); no React, sem a prop, vem `medium`. |
| Tag (`tag`) | padrao-diferente | APPROXIMATION | Padrão diferente em `Appearance`: uma instância nova no Figma vem Neutral (`neutral`); no React, sem a prop, vem `accent`. |
| Toast (`toast`) | bridge-componente | — | O castanha-ai liga o set a `Toast`; o playground (Code Connect), a `useToast`. |

## Informativo

| Componente | Tipo | Gap | O quê |
|---|---|---|---|
| Async creatable Select Input (`async-creatable-select-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Lead Icon`, `Error Message`, `Lead Icon`. |
| Async Select Input (`async-select-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Lead Icon`, `Error Message`, `Lead Icon`. |
| Banner (`banner`) | sem-code-connect | — | Sem Code Connect: o par com o React vem só do node da story. |
| Breadcrumb (`breadcrumb`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `showItem03`, `showItem04`, `showItem05`, `showItem06`, `Kind`. |
| Carousel (`carousel`) | sem-figma | — | Sem retrato das props do Figma (rode a leitura via MCP). |
| Checkbox Select Input (`checkbox-select-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Chips Group (`chips-group`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Kind`. |
| Content List Item (`content-list-item`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Navigation Indicator`, `Show Tag`. |
| Date Input (`date-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Character Counter`, `Error Message`. |
| Date Picker (`date-picker`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show week 01`, `Show week 02`, `Show week 03`, `Show week 04`, `Show week 05`, `Show week 06`, `Selected Date Label`, `First Day Selected`, `Last Day Selected`, `Show First Day Selected`, `Show Last Day Selected`, `Role`. |
| Divider (`divider`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Kind`. |
| Drawer (`drawer`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Secondary Action Button`. |
| Dropzone (`dropzone`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Main button`. |
| Icon Button (`icon-button`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Notification`. |
| Multi Select Input (`multi-select-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Pagination (`pagination`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Itens per page`, `Show Item display`, `Items range`, `Items display`. |
| Password Input (`password-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Text Content`, `Show Lead Icon`, `Error Message`, `Lead Icon`, `Show Content`. |
| Progress Tracker Item (`progress-tracker-item`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Connector`, `Show Link`, `Orientation`. |
| Radio Select Input (`radio-select-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Search Input (`search-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Selection List Item (`selection-list-item`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Trailing Item`. |
| Skeleton (`skeleton`) | sem-figma | — | Sem retrato das props do Figma (rode a leitura via MCP). |
| Slider (`slider`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Value`. |
| Status Dot (`status-dot`) | sem-code-connect | — | Sem Code Connect: o par com o React vem só do node da story. |
| Table (`table`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Kind`. |
| Text Area Input (`text-area`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Text Content`, `Show Required`, `Error Message`. |
| Text Input (`text-input`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Toast (`toast`) | nao-chega-ao-react | MISSING-VARIANT | Não chega ao React pelo Code Connect: `Show Trailing Item`. |
| Divider (`divider`) | bridge-prop | — | O castanha-ai traduz `Kind=Dashed` para `kind`; o mapa do playground não gera essa prop. |

## Como rodar

1. Atualizar o clone do castanha (`git fetch` em `../castanha`).
2. Se o Figma mudou: reler as props via MCP (só leitura) e regravar `integration/figma-props.tsv` (formato no topo de `scripts/integration/check-stack.js`).
3. `node scripts/integration/build-manifest.js`: regera manifesto, cobertura, `react-data.js` e este relatório.

O lado Figma × playground continua no check de props (`docs/CHECK-PROPS.md`). Divergências que pedem decisão do time DS vão para o CONFERIR (grupo Integração React).

## Histórico

### 20/10/2026 · staging `039c0d37`

- castanha-ai (bridge): `8f8381a` → `a49bd59`.
- Cobertura · playground: 115 → 117.
- Cobertura · buildingBlocks: 27 → 28.
- Cobertura · soFigma: 16 → 17.
- Cobertura · comNotas: 27 → 29.
- 🆕 informativo · divider · O castanha-ai traduz `Kind=Dashed` para `kind`; o mapa do playground não gera essa prop.
- ✅ resolvido · main-button · O bridge do castanha-ai usa `Show Trailling Icon`, que não existe na lib (props: Text Label, Show Lead Icon, Show Trailing Icon, Lead Icon, Kind, Appearance, State, Size).
- ✅ resolvido · toast · O bridge do castanha-ai usa `Show Trailling Item`, que não existe na lib (props: Text Description, Show Trailing Item, Appearance).
- ✅ resolvido · selection-list-item · O bridge do castanha-ai usa `Trailling Item`, que não existe na lib (props: Show Lead Item, Show Divider, Kind, State, Is Active, Trailing Item).
- ✅ resolvido · link · O bridge do castanha-ai usa `Show Trailling Item`, que não existe na lib (props: Link Content, Show Trailing Item, Change Icon, Appearance, State).
- ✅ resolvido · castanha-ai · Set `Sponsor Side Menu` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · castanha-ai · Set `Device marker` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · castanha-ai · Set `Shortcut` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · castanha-ai · Set `Shortcut Carousel` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · castanha-ai · Com mapa no playground e sem set no bridge do castanha-ai: `balance-card`, `banner`, `date-input`, `date-picker`, `modal-date-picker`, `multi-select-input`, `nav-control`, `slider`, `status-dot`, `system-banner`.

### 16/10/2026 · staging `039c0d37`

- castanha-react `origin/staging`: `ca2b41ae` → `039c0d37` (2026-10-15).
- Assets · icons: {"pkg":265,"ours":273,"same":262,"onlyHere":11,"onlyPkg":3} → {"pkg":272,"ours":273,"same":262,"onlyHere":11,"onlyPkg":10}.
- Assets · ills: {"pkg":259,"ours":260,"same":218,"renamed":40,"onlyHere":2,"onlyPkg":1,"svgDiff":12} → {"pkg":254,"ours":260,"same":202,"renamed":49,"onlyHere":9,"onlyPkg":3,"svgDiff":16}.
- 🆕 média · assets · O castanha-icons exporta ícones que não existem no [Caju] Icons: `balance-canceled`, `book-line`, `calendar-non-recurrent`, `design-line`, `feedback-line`, `file-line-1`, `inspect-line`, `magical-wand-line`, `monitor-line`, `template-line`.
- 🆕 alta · assets · Ilustrações do [Caju] Illustrations sem par no castanha-illustrations: `alimentos/drink`, `notificacoes/analysis-low-detail`, `hero-hub-de-beneficios/plano-saude`, `hero-hub-de-beneficios/alimentacao`, `hero-hub-de-beneficios/educacao`, `hero-hub-de-beneficios/plano-odonto`, `hero-hub-de-beneficios/mobilidade`, `hero-hub-de-beneficios/cajuzinho`, `hero-hub-de-beneficios/outros`.
- 🆕 média · assets · O castanha-illustrations exporta ilustrações sem par no [Caju] Illustrations: `hero-hub-feedback`, `hero-sponsor-splash-screen`, `objetos-arvore-natal`.
- 🆕 média · assets · 49 ilustrações têm outro nome no pacote (o nome do Figma não serve no `<Illustration name>`): `hub-de-beneficios/pet` → `hub-pet`, `hub-de-beneficios/departamento` → `hub-departamento`, `hub-de-beneficios/plano-saude` → `hub-plano-saude`, `hub-de-beneficios/servicos` → `hub-servicos`, `hub-de-beneficios/entretenimento` → `hub-entretenimento`, `hub-de-beneficios/plano-odonto` → `hub-plano-odonto`, `hub-de-beneficios/educacao` → `hub-educacao`, `hub-de-beneficios/cajuzinho` → `hub-cajuzinho`, `hub-de-beneficios/alimentacao` → `hub-alimentacao`, `hub-de-beneficios/outros` → `hub-outros`, `hub-de-beneficios/saude` → `hub-saude`, `hub-de-beneficios/ofertas` → `hub-ofertas`, `hub-de-beneficios/mobilidade` → `hub-mobilidade`, `hub-de-beneficios/esportes` → `hub-esportes`, `hub-de-beneficios/familia` → `hub-familia`, `hub-de-beneficios/seguro-vida-previdencia` → `hub-previdencia`, `documentos/socio-low-detail` → `low-detail-socio`, `documentos/rg-cnh-frente-low-detail` → `low-detail-rg-cnh-frente`, `documentos/rg-cnh-verso-low-detail` → `low-detail-rg-cnh-verso`, `documentos/rg-papeis-low-detail` → `low-detail-rg-papeis`, `documentos/ctps-low-detail` → `low-detail-ctps`, `financas/cartao-bilhete-unico-low-detail` → `low-detail-cartao-bilhete-unico`, `financas/cartao-customizacao-low-detail` → `low-detail-cartao-customizacao`, `objetos/gema-rubi` → `premiacoes-gema-rubi`, `objetos/gema-esmeralda` → `premiacoes-gema-esmeralda`, `objetos/gema-ouro` → `premiacoes-gema-ouro`, `graficos-e-dashboards/pizza` → `grafico-pizza`, `graficos-e-dashboards/setores` → `grafico-setores`, `graficos-e-dashboards/barra` → `grafico-barra`, `graficos-e-dashboards/objetivo-1` → `graficos-objetivo-1`, `graficos-e-dashboards/objetivo-2` → `graficos-objetivo-2`, `graficos-e-dashboards/objetivo-3` → `graficos-objetivo-3`, `interfaces/lista` → `interface-lista`, `interfaces/assinatura` → `interface-assinatura`, `interfaces/nota-fiscal` → `interface-nota-fiscal`, `interfaces/carrossel` → `interface-carrossel`, `interfaces/customizacao` → `interface-customizacao`, `interfaces/planilha` → `interface-planilha`, `interfaces/home` → `interface-home`, `hero-employee/login` → `employee-login`, `hero-employee/splash-screen` → `employee-splash-screen`, `hero-hub-de-beneficios/seguros-previdencia` → `hero-hub-seguro-previdencia`, `hero-hub-de-beneficios/familia` → `hero-hub-familia`, `hero-hub-de-beneficios/descontos` → `hero-hub-descontos`, `hero-hub-de-beneficios/familia-2` → `hero-hub-familia-2`, `hero-hub-de-beneficios/fitness` → `hero-hub-fitness`, `hero-hub-de-beneficios/cultura` → `hero-hub-cultura`, `hero-hub-de-beneficios/home-office` → `hero-hub-home-office`, `hero-hub-de-beneficios/lazer` → `hero-hub-lazer`.
- 🆕 informativo · assets · 16 ilustrações têm o desenho diferente do pacote além do arredondamento (posição no quadro ou forma; conferir qual é a atual): `autenticacao-ocr-cartao-2`, `dispositivos-celular-cartao-aproximacao`, `dispositivos-celular-cartao-virtual-wallet-1`, `dispositivos-celular-cartao-virtual-1`, `dispositivos-celular-cartao-virtual-2`, `financas-moeda-verde-1`, `financas-moeda-verde-2`, `financas-moeda-verde-3`, `financas-moeda-verde-4`, `financas-cartao-voucher`, `financas-cartoes-fisico-voucher`, `financas-cartao-virtual-minimalista`, `financas-cartao-voucher-minimalista`, `financas-cartoes-fisico-virtual`, `financas-cartao-virtual-wallet-1`, `financas-cartao-virtual-wallet-2`.
- ✅ resolvido · assets · O castanha-icons exporta ícones que não existem no [Caju] Icons: `balance-canceled`, `calendar-non-recurrent`, `file-line-1`.
- ✅ resolvido · assets · Ilustrações do [Caju] Illustrations sem par no castanha-illustrations: `alimentos/drink`, `notificacoes/analysis-low-detail`.
- ✅ resolvido · assets · O castanha-illustrations exporta ilustrações sem par no [Caju] Illustrations: `hero-sponsor-splash-screen`.
- ✅ resolvido · assets · 40 ilustrações têm outro nome no pacote (o nome do Figma não serve no `<Illustration name>`): `hub-de-beneficios/pet` → `hub-pet`, `hub-de-beneficios/departamento` → `hub-departamento`, `hub-de-beneficios/plano-saude` → `hub-plano-saude`, `hub-de-beneficios/servicos` → `hub-servicos`, `hub-de-beneficios/entretenimento` → `hub-entretenimento`, `hub-de-beneficios/plano-odonto` → `hub-plano-odonto`, `hub-de-beneficios/educacao` → `hub-educacao`, `hub-de-beneficios/cajuzinho` → `hub-cajuzinho`, `hub-de-beneficios/alimentacao` → `hub-alimentacao`, `hub-de-beneficios/outros` → `hub-outros`, `hub-de-beneficios/saude` → `hub-saude`, `hub-de-beneficios/ofertas` → `hub-ofertas`, `hub-de-beneficios/mobilidade` → `hub-mobilidade`, `hub-de-beneficios/esportes` → `hub-esportes`, `hub-de-beneficios/familia` → `hub-familia`, `hub-de-beneficios/seguro-vida-previdencia` → `hub-previdencia`, `documentos/socio-low-detail` → `low-detail-socio`, `documentos/rg-cnh-frente-low-detail` → `low-detail-rg-cnh-frente`, `documentos/rg-cnh-verso-low-detail` → `low-detail-rg-cnh-verso`, `documentos/rg-papeis-low-detail` → `low-detail-rg-papeis`, `documentos/ctps-low-detail` → `low-detail-ctps`, `financas/cartao-bilhete-unico-low-detail` → `low-detail-cartao-bilhete-unico`, `financas/cartao-customizacao-low-detail` → `low-detail-cartao-customizacao`, `objetos/gema-rubi` → `premiacoes-gema-rubi`, `objetos/gema-esmeralda` → `premiacoes-gema-esmeralda`, `objetos/gema-ouro` → `premiacoes-gema-ouro`, `graficos-e-dashboards/pizza` → `grafico-pizza`, `graficos-e-dashboards/setores` → `grafico-setores`, `graficos-e-dashboards/barra` → `grafico-barra`, `graficos-e-dashboards/objetivo-1` → `graficos-objetivo-1`, `graficos-e-dashboards/objetivo-2` → `graficos-objetivo-2`, `graficos-e-dashboards/objetivo-3` → `graficos-objetivo-3`, `interfaces/lista` → `interface-lista`, `interfaces/assinatura` → `interface-assinatura`, `interfaces/nota-fiscal` → `interface-nota-fiscal`, `interfaces/carrossel` → `interface-carrossel`, `interfaces/customizacao` → `interface-customizacao`, `interfaces/planilha` → `interface-planilha`, `interfaces/home` → `interface-home`, `hero-hub-de-beneficios/seguros-previdencia` → `hero-hub-de-beneficios-seguro-previdencia`.
- ✅ resolvido · assets · 12 ilustrações têm o desenho diferente do pacote além do arredondamento (posição no quadro ou forma; conferir qual é a atual): `autenticacao-ocr-cartao-2`, `financas-moeda-verde-1`, `financas-moeda-verde-2`, `financas-moeda-verde-3`, `financas-moeda-verde-4`, `hero-hub-de-beneficios-plano-saude`, `hero-hub-de-beneficios-alimentacao`, `hero-hub-de-beneficios-educacao`, `hero-hub-de-beneficios-plano-odonto`, `hero-hub-de-beneficios-mobilidade`, `hero-hub-de-beneficios-cajuzinho`, `hero-hub-de-beneficios-outros`.

### 15/10/2026 · staging `ca2b41ae`

- Cobertura · playground: 112 → 113.
- Cobertura · soFigma: 14 → 15.
- Cobertura · comNotas: 24 → 25.

### 07/10/2026 · staging `ca2b41ae`

- castanha-react `origin/staging`: `1e0a5335` → `ca2b41ae` (2026-10-07).
- Cobertura · playground: 105 → 110.
- Cobertura · soFigma: 9 → 14.
- Animações no castanha-motion: 44 → 49.
- 🆕 informativo · assets · 49 animações Lottie no castanha-motion, ainda sem tab no playground (Animações volta ao Tema Caju quando a lib existir).
- ✅ resolvido · banner · `Banner` só existe na staging do castanha-react (ainda não na main nem no Storybook publicado).
- ✅ resolvido · status-dot · `StatusDot` só existe na staging do castanha-react (ainda não na main nem no Storybook publicado).
- ✅ resolvido · castanha-ai · Set `Side Menu` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · castanha-ai · Set `Header` está no bridge do castanha-ai e não tem componente no playground.
- ✅ resolvido · assets · 44 animações Lottie no castanha-motion, ainda sem tab no playground (Animações volta ao Caju - Tema quando a lib existir).

### 05/10/2026 · staging `1e0a5335`

- JSX "No React": primeira validação com TypeScript · 185 trechos · 0 erros.

### 05/10/2026 · staging `1e0a5335`

- Primeira leitura com histórico (sem versão anterior para comparar).
