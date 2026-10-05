# Saúde da stack — Figma × castanha-react × playground

Gerado por `node scripts/integration/build-manifest.js` em 2026-10-05 (R2). Figma: `integration/figma-props.tsv` (lido via MCP, só leitura). React: `origin/staging` (`1e0a5335`) e Code Connect `origin/feat/figma-code-connect`. Playground: mapas de `integration/prop-map/`.

## Resumo

| Nível | O que significa | Itens |
|---|---|---:|
| Alta | quebra a tradução: o Code Connect lê prop ou gera valor que não existe | 2 |
| Média | muda o resultado sem quebrar: padrão diferente, opção sem tradução, mapa curado errado | 6 |
| Informativo | prop do Figma que não chega ao React pelo Code Connect | 27 |

Componentes com algum item: 33 de 70 com par no React.

## Alta

| Componente | Tipo | O quê |
|---|---|---|
| Topic (`topic`) | cc-prop-react-inexistente | O Code Connect gera `label` em `<Topic>`, que não existe nas props do React (o código gerado não compila em TypeScript). |
| Topic (`topic`) | cc-prop-react-inexistente | O Code Connect gera `supportingMessage` em `<Topic>`, que não existe nas props do React (o código gerado não compila em TypeScript). |

## Média

| Componente | Tipo | O quê |
|---|---|---|
| Alert (`alert`) | padrao-diferente | Padrão diferente em `Appearance`: uma instância nova no Figma vem Positive (`positive`); no React, sem a prop, vem `informative`. |
| Avatar (`avatar`) | padrao-diferente | Padrão diferente em `Size`: uma instância nova no Figma vem Small (`small`); no React, sem a prop, vem `medium`. |
| Badge (`badge`) | padrao-diferente | Padrão diferente em `Appearance`: uma instância nova no Figma vem Warning (`warning`); no React, sem a prop, vem `neutral`. |
| Spinner (`spinner`) | padrao-diferente | Padrão diferente em `Appearance`: uma instância nova no Figma vem Neutral (`neutral`); no React, sem a prop, vem `accent`. |
| Spinner (`spinner`) | padrao-diferente | Padrão diferente em `Size`: uma instância nova no Figma vem Small (`small`); no React, sem a prop, vem `medium`. |
| Tag (`tag`) | padrao-diferente | Padrão diferente em `Appearance`: uma instância nova no Figma vem Neutral (`neutral`); no React, sem a prop, vem `accent`. |

## Informativo

| Componente | Tipo | O quê |
|---|---|---|
| Async creatable Select Input (`async-creatable-select-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Lead Icon`, `Error Message`, `Lead Icon`. |
| Async Select Input (`async-select-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Lead Icon`, `Error Message`, `Lead Icon`. |
| Banner (`banner`) | sem-code-connect | Sem Code Connect: o par com o React vem só do node da story. |
| Breadcrumb (`breadcrumb`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `showItem03`, `showItem04`, `showItem05`, `showItem06`, `Kind`. |
| Checkbox Select Input (`checkbox-select-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Chips Group (`chips-group`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Kind`. |
| Content List Item (`content-list-item`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Navigation Indicator`, `Show Tag`. |
| Date Input (`date-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Show Character Counter`, `Error Message`. |
| Date Picker (`date-picker`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show week 01`, `Show week 02`, `Show week 03`, `Show week 04`, `Show week 05`, `Show week 06`, `Selected Date Label`, `First Day Selected`, `Last Day Selected`, `Show First Day Selected`, `Show Last Day Selected`, `Role`. |
| Divider (`divider`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Kind`. |
| Drawer (`drawer`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Secondary Action Button`. |
| Dropzone (`dropzone`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Main button`. |
| Icon Button (`icon-button`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Notification`. |
| Multi Select Input (`multi-select-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Pagination (`pagination`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Itens per page`, `Show Item display`, `Items range`, `Items display`. |
| Password Input (`password-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Text Content`, `Show Lead Icon`, `Error Message`, `Lead Icon`, `Show Content`. |
| Progress Tracker (`progress-tracker`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Orientation`. |
| Progress Tracker Item (`progress-tracker-item`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Connector`, `Show Link`, `Orientation`. |
| Radio Select Input (`radio-select-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Search Input (`search-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Selection List Item (`selection-list-item`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Trailing Item`. |
| Slider (`slider`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Value`. |
| Status Dot (`status-dot`) | sem-code-connect | Sem Code Connect: o par com o React vem só do node da story. |
| Table (`table`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Kind`. |
| Text Area Input (`text-area`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Text Content`, `Show Required`, `Error Message`. |
| Text Input (`text-input`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`, `Error Message`. |
| Toast (`toast`) | nao-chega-ao-react | Não chega ao React pelo Code Connect: `Show Trailing Item`. |

## Como rodar

1. Atualizar o clone do castanha (`git fetch` em `../castanha`).
2. Se o Figma mudou: reler as props via MCP (só leitura) e regravar `integration/figma-props.tsv` (formato no topo de `scripts/integration/check-stack.js`).
3. `node scripts/integration/build-manifest.js`: regera manifesto, cobertura, `react-data.js` e este relatório.

O lado Figma × playground continua no check de props (`docs/CHECK-PROPS.md`). Divergências que pedem decisão do time DS vão para o CONFERIR (grupo Integração React).
