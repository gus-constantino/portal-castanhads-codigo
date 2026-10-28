# Saúde da stack — Figma × castanha_flutter × playground

Gerado por `node scripts/integration/build-flutter-manifest.js` em 2026-10-28 (F2). Figma: `integration/figma-props.tsv` (lido via MCP, só leitura). Flutter: `origin/staging` (`ec39a6e8`) do castanha-mobile.

## Resumo

| Nível | O que significa | Itens |
|---|---|---:|
| Alta | quebra a tradução: parâmetro ou valor que não existe no Flutter, ícone ou ilustração fora do pacote do Dart | 2 |
| Média | muda o resultado sem quebrar: padrão diferente entre Figma e Flutter | 10 |
| Informativo | prop do Figma sem parâmetro no Flutter, ou parâmetro só do código | 51 |

Cobertura: 55 componentes do playground com widget no castanha_flutter, 30 sem par e 5 só no Flutter. Dart do painel: 81 trechos, 0 erros no `dart analyze` (`node scripts/integration/check-dart.js`).

## Alta

| Componente | Tipo | O quê |
|---|---|---|

## Média

| Componente | Tipo | O quê |
|---|---|---|
| `alert` | padrao-diferente | `Appearance`: o padrão do Figma é Positive; o do Flutter, `informative`. Declare `appearance`. |
| `avatar` | padrao-diferente | `Size`: o padrão do Figma é Small; o do Flutter, `medium`. Declare `size`. |
| `icon` | padrao-diferente | `Size`: o padrão do Figma é Small; o do Flutter, `medium`. Declare `size`. |
| `shaped-icon` | padrao-diferente | `Appearance`: o padrão do Figma é Neutral; o do Flutter, `accent`. Declare `appearance`. |
| `shaped-icon` | padrao-diferente | `Size`: o padrão do Figma é Smallest; o do Flutter, `medium`. Declare `size`. |
| `spinner` | padrao-diferente | `Appearance`: o padrão do Figma é Neutral; o do Flutter, `accent`. Declare `appearance`. |
| `spinner` | padrao-diferente | `Size`: o padrão do Figma é Small; o do Flutter, `medium`. Declare `size`. |
| `upload-item` | padrao-diferente | `Status`: o padrão do Figma é Uploading; o do Flutter, `uploaded`. Declare `status`. |

## Informativo

| Componente | Tipo | O quê |
|---|---|---|
| `accordion` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `accordion-item` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `backdrop` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `invisible`. |
| `bottom-sheet` | sem-props-do-figma | Sem leitura das props do Figma (`figma-props.tsv`) para este componente. |
| `chips-group` | figma-fora-do-mapa | Prop do Figma `Kind` não aparece na tabela Figma → Flutter. |
| `content-list-item` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `highlight`, `trailingValue`. |
| `drop-button` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `dropzone` | figma-sem-parametro | `Show Main button` (Figma) não tem parâmetro no Flutter. O Flutter não tem o botão: a área inteira chama `onPressed`. |
| `dropzone` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `dragover`. |
| `filter-button` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `filter-chips` | figma-fora-do-mapa | Prop do Figma `Size` não aparece na tabela Figma → Flutter. |
| `icon-button` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `notificationAppearance`. |
| `input-chips` | figma-fora-do-mapa | Prop do Figma `Size` não aparece na tabela Figma → Flutter. |
| `main-button` | figma-sem-parametro | `Is Loading` (Figma) não tem parâmetro no Flutter. Ainda não existe no castanha_flutter. |
| `main-button` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `expanded`, `loading`, `loadingLabel`. |
| `progress-tracker` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `progress-tracker-item` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `search-input` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `selection-list-item` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `highlight`. |
| `skeleton` | sem-props-do-figma | Sem leitura das props do Figma (`figma-props.tsv`) para este componente. |
| `spinner` | figma-sem-parametro | `Spinner Position` (Figma) não tem parâmetro no Flutter. É o quadro da animação; no código o giro é contínuo. |
| `status-dot` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `switch-group` | sem-props-do-figma | Sem leitura das props do Figma (`figma-props.tsv`) para este componente. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Show Trailing Item` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Show Caret` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Placeholder Content` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Text Content` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Character Counter Value` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Text Label` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Supporting Message` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Error Message` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Required Text` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Is Filled` não aparece na tabela Figma → Flutter. |
| `text-area` | figma-fora-do-mapa | Prop do Figma `Is Active` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Show Trailing Item` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Show Caret` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Character Counter Value` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Text Label` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Supporting Message` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Error Message` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Lead Icon` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Required Text` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Is Filled` não aparece na tabela Figma → Flutter. |
| `text-input` | figma-fora-do-mapa | Prop do Figma `Is Active` não aparece na tabela Figma → Flutter. |
| `toast` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `tooltip` | sem-mapa | Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros. |
| `upload-item` | figma-fora-do-mapa | Prop do Figma `Success message` não aparece na tabela Figma → Flutter. |
| `upload-item` | figma-fora-do-mapa | Prop do Figma `Show primary action` não aparece na tabela Figma → Flutter. |
| `upload-item` | figma-fora-do-mapa | Prop do Figma `Show secondary action` não aparece na tabela Figma → Flutter. |
| `upload-item` | so-no-flutter | Parâmetros do Flutter sem prop no Figma: `preview`. |

## Assets

Constantes do Dart (`CastanhaIcons`, `CastanhaIllustrations`, `CastanhaMotions`) na versão que o castanha_flutter fixa no pubspec × [Caju] Icons e [Caju] Illustrations do playground.

| Pacote | Versão | No pacote | No playground | Mesmo nome | Renomeado | Só aqui | Só no pacote |
|---|---|---:|---:|---:|---:|---:|---:|
| castanha_icons | 1.8.0 | 272 | 271 | 269 | — | 2 | 3 |
| castanha_illustrations | 1.9.0 | 254 | 260 | 202 | 49 | 9 | 3 |
| castanha_motion | 1.6.0 | 49 | 46 | 46 | — | 0 | 3 |

| Nível | Tipo | O quê |
|---|---|---|
| Alta | icone-fora-do-dart | 2 ícones do [Caju] Icons sem constante em `CastanhaIcons` (1.8.0): `checkbox-check`, `checkbox-indeterminate`. |
| Média | icone-so-no-dart | Constantes de `CastanhaIcons` sem ícone no [Caju] Icons: `balanceCanceled`, `calendarNonRecurrent`, `fileLine1`. |
| Alta | ilustracao-fora-do-dart | Ilustrações do [Caju] Illustrations sem constante em `CastanhaIllustrations` (1.9.0): `alimentos/drink`, `notificacoes/analysis-low-detail`, `hero-hub-de-beneficios/plano-saude`, `hero-hub-de-beneficios/alimentacao`, `hero-hub-de-beneficios/educacao`, `hero-hub-de-beneficios/plano-odonto`, `hero-hub-de-beneficios/mobilidade`, `hero-hub-de-beneficios/cajuzinho`, `hero-hub-de-beneficios/outros`. |
| Média | ilustracao-renomeada | 49 ilustrações têm outro nome no pacote (o painel já usa o nome do Dart), ex.: `hub-de-beneficios/pet` → `hubPet`, `hub-de-beneficios/departamento` → `hubDepartamento`, `hub-de-beneficios/plano-saude` → `hubPlanoSaude`, `hub-de-beneficios/servicos` → `hubServicos`. |
| Informativo | motion-so-no-dart | Constantes de `CastanhaMotion` (1.6.0) sem componente no [Caju] Motion (fora de Motion › Animações): `feedbackSplash`, `feedbackSuccess`, `feedbackWarning`. |

## Histórico

**28/10/2026 · staging `ec39a6e8`**

- castanha_flutter `origin/staging`: `a62701c0` → `ec39a6e8` (2026-10-21).
- Cobertura · flutter: 49 → 60.
- Cobertura · matched: 45 → 55.
- Cobertura · flutterOnly: 4 → 5.
- Cobertura · missing: 40 → 30.
- 🆕 informativo · accordion · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · accordion-item · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · drop-button · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · filter-button · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · main-button · Parâmetros do Flutter sem prop no Figma: `expanded`, `loading`, `loadingLabel`.
- 🆕 informativo · progress-tracker · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · progress-tracker-item · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · search-input · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · status-dot · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · toast · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- 🆕 informativo · tooltip · Ainda sem mapa Figma → Flutter: o painel mostra o import e os parâmetros.
- ✅ resolvido · main-button · Parâmetros do Flutter sem prop no Figma: `expanded`.
**20/10/2026 · staging `a62701c0`**

- Cobertura · playground: 110 → 112.
- Cobertura · blocks: 27 → 28.
- Cobertura · missing: 38 → 39.
- Cobertura · missingBlocks: 27 → 28.
**16/10/2026 · staging `a62701c0`**

- castanha_flutter `origin/staging`: `38504ab7` → `a62701c0` (2026-10-15).
- 🆕 alta · assets · 2 ícones do [Caju] Icons sem constante em `CastanhaIcons` (1.8.0): `checkbox-check`, `checkbox-indeterminate`.
- 🆕 média · assets · Constantes de `CastanhaIcons` sem ícone no [Caju] Icons: `balanceCanceled`, `bookLine`, `calendarNonRecurrent`, `designLine`, `feedbackLine`, `fileLine1`, `inspectLine`, `magicalWandLine`, `monitorLine`, `templateLine`.
- 🆕 alta · assets · Ilustrações do [Caju] Illustrations sem constante em `CastanhaIllustrations` (1.9.0): `alimentos/drink`, `notificacoes/analysis-low-detail`, `hero-hub-de-beneficios/plano-saude`, `hero-hub-de-beneficios/alimentacao`, `hero-hub-de-beneficios/educacao`, `hero-hub-de-beneficios/plano-odonto`, `hero-hub-de-beneficios/mobilidade`, `hero-hub-de-beneficios/cajuzinho`, `hero-hub-de-beneficios/outros`.
- 🆕 média · assets · 49 ilustrações têm outro nome no pacote (o painel já usa o nome do Dart), ex.: `hub-de-beneficios/pet` → `hubPet`, `hub-de-beneficios/departamento` → `hubDepartamento`, `hub-de-beneficios/plano-saude` → `hubPlanoSaude`, `hub-de-beneficios/servicos` → `hubServicos`.
- Pacote castanha_icons: 1.7.0 → 1.8.0.
- Pacote castanha_illustrations: 1.8.0 → 1.9.0.
**15/10/2026 · staging `38504ab7`**

- Cobertura · playground: 107 → 108.
- Cobertura · missing: 36 → 37.
**09/10/2026 · staging `38504ab7`**

- Primeira leitura com histórico (sem versão anterior para comparar).

## Como rodar

```
node scripts/integration/build-flutter-manifest.js   # manifesto, painel, este relatório (fora do sandbox: lê os clones)
node scripts/integration/check-dart.js              # Dart do painel × dart analyze (precisa do Flutter SDK e do Chrome)
```
