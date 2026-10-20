# Plano — a UI do playground usando o próprio Castanha DS

**Objetivo:** onde existir componente do Castanha DS, a casca do playground (header, menu, painel de controles, tabs, documentação, recursos e relatório) usa o componente em vez de HTML/CSS feito à mão. E todo valor visual vem de token: cor, tamanho, raio, opacidade, text style, motion, elevation e grid.

**Por quê:** o playground vira o primeiro consumidor do DS (dogfooding). O que não funcionar para nós também não vai funcionar para os produtos, e cada gap vira item no CONFERIR.

## 1. Inventário (02/10)

| Onde | Hoje (feito à mão) | Componente do DS | Usos |
|---|---|---|---:|
| Header | botões de tema e relatório (`.pg-iconbtn` + `title`) | **Icon Button** Ghost Neutral + **Tooltip** | 2 |
| Header | "Castanha DS: …" em fonte crua | text style (Title/Subtitle) | 1 |
| Menu | busca (`.pg-search`) | **Search Input** | 1 |
| Menu | categorias em `<details>` | **Accordion Item** (ver decisão 2) | 31 |
| Menu | links dos componentes | sem equivalente direto (ver decisão 2) | ~130 |
| Toolbar | seletor de viewport (`.pg-seg`) | ver decisão 1 | 1 |
| Toolbar | links Figma/Jira/Zeroheight | **Link** | 3 |
| Painel | `kit.seg` (escolha única) | ver decisão 1 | 105 |
| Painel | `kit.toggle` (switch feito à mão) | **Switch** | 88 |
| Painel | `kit.text` | **Text Input** | 84 |
| Painel | `kit.select` / `kit.iconSwap` / `kit.illustrationSwap` (`<select>` nativo com grupos) | **Radio Select Input** (precisa de grupos na lista: verificar) | 32 |
| Painel | `kit.range` | **Slider** | 8 |
| Painel | `kit.nested` (badges e chips) | **Tag** / **Badge** + **Filter Chips** | 22 |
| Painel | títulos de seção, dicas | text styles + **Divider** | 261 |
| Tabs | tabs da doc e do relatório (`.pg-tab`) | **Scrollable Tab** | 2 |
| Doc | accordions das galerias (`.pg-doc-acc`) | **Accordion Item** | 2 |
| Doc | busca das galerias | **Search Input** | 2 |
| Doc | "Copiado: nome" no rodapé | **Toast** | 2 |
| Doc | notas (`.pg-doc-note`) | **Alert** (informative) ou text style | ~20 |
| Relatório | cards de número e painéis | **Card** | 9 |
| Relatório | barras dos gráficos | **Progress Line** | 2 painéis |
| Relatório | etiquetas (Dúvida, Resolvido…) e contadores | **Tag** / **Badge** | ~20 |
| Relatório | busca, "Ver no GitHub" | **Search Input**, **Link** | 2 |
| Relatório / doc | tabelas de Markdown | **Table** não serve (é tabela de dados com ordenação/seleção); fica HTML com tokens | — |

**Valores crus hoje:** `playground.css` tem 138 px, 2 hex (`--pg-line`), 1 rgba, 17 `font:` com tamanho cru e transições de `.15s/.25s`; `report.css` 79 px; `docs.css` 20 px.

## Decisões (02/10)

1. **Escolha única** (`kit.seg` e seletor de viewport) → **Filter Chips** num Chips Group, um selecionado por vez. Gap no CONFERIR: o DS não tem segmented control.
2. **Menu lateral** → categorias viram **Accordion Item** (Label = categoria, Description = quantidade, sem Lead Item); os links continuam links, com tokens. Gap no CONFERIR: o DS não tem item de navegação lateral.
3. **Execução** fase a fase, cada uma publicada e conferida.

## 2. Fases (cada uma publicada e conferida antes da próxima)

| Fase | Escopo | Risco |
|---|---|---|
| **0 · Tokens** | Trocar todo px/hex/rgba/ms/font cru do shell por `--common-sizes-*`, raios, `--common-colors-*`, opacidades, `--text-style-*`, `--motion-*`/`--common-motion-*`, elevations e grid. `--pg-line` vira `Border/soft` | Baixo (visual quase igual) |
| **1 · Header e links** | Icon Button + Tooltip no header; Link nos links da toolbar; text styles na marca | Baixo |
| **2 · Painel de controles** | `kit.toggle` → Switch, `kit.text` → Text Input, `kit.range` → Slider, `kit.seg` → decisão 1, selects → Radio Select Input, `kit.nested` → Tag/Badge/Filter Chips. A API do kit não muda: os 110 playgrounds continuam iguais | Médio (afeta todos os playgrounds; smoke + passada de comportamento) |
| **3 · Navegação** | Search Input no menu; categorias → decisão 2; tabs → Scrollable Tab | Médio |
| **4 · Doc e recursos** | Accordion Item e Search Input nas galerias, Toast no "copiado", notas | Baixo |
| **5 · Relatório** | Card, Progress Line, Tag/Badge, Search Input, Link | Baixo |
| **6 · Fechamento** | Varredura final de valores crus (script), gaps no CONFERIR, diário no ARCHITECTURE, decisão no ROADMAP | — |

## 3. Regras

- **A casca depende dos componentes:** se um componente quebrar, o playground mostra. É o objetivo, e o smoke continua medindo só o preview.
- **Sem componente no DS:** fica HTML com tokens e entra no CONFERIR como "gap de componente" (ex.: item de menu lateral, segmented control, tabela de conteúdo).
- **Sem token para o valor:** usa o token mais próximo e registra no CONFERIR; nada de valor cru novo.
- **Verificação por fase:** smoke (`tests/smoke.html`), passada de teclado/leitor no que mudou, tema escuro, 360/744/1366 e publicação no Pages.

## 4. Andamento

| Fase | Status |
|---|---|
| 0 · Tokens | ✅ 02/10 — `playground.css`, `docs.css` e `report.css` sem px/hex/rgba/ms crus; tokens de grid (`--common-grids-margin/gutter`) gerados do Figma; padding/margem/gap/raio dos playgrounds em token. Gaps: C82 (grid do Tablet) e C83 (sem text style de código, sem tamanhos de layout) |
| 1 · Header e links | ✅ 02/10 — Icon Button (Ghost · Neutral · Small) + Tooltip no tema e no relatório, ícones `dark-mode-line`/`light-mode-line`/`chart-up-line` do [Caju] Icons; links da toolbar com Link (Neutral, `link-line`, nova aba). Tooltip passou a descrever o focável dentro de gatilhos compostos. Gap: C84 (Icon Button sem estado selecionado) |
| — · Desempenho | ✅ 02/10 — pacotes `dist/cds.css` e `dist/cds.js` (D70): de ~250 para 14 requisições |
| 2 · Painel de controles | ✅ 02/10 — `kit.seg` → Chips Group + Filter Chips (um selecionado) · `kit.toggle` → Switch · `kit.text` → Text Input · `kit.range` → Slider · `kit.select` → Radio Select Input · `kit.iconSwap`/`illustrationSwap` → Async Select Input com busca · `kit.button` (novo) → Main Button · inspetor → Tag + Filter Chips. Seletor de viewport e separadores do OTP também. API do kit mantida (`toggle` → `{checked}`, `seg.setValue`). Gap: C85 |
| 2b · Ajustes | ✅ 02/10 — Chips Group voltou a ter gap 8 entre chips e linhas (o shell desligava o flex); escala de espaço do shell subiu um degrau (painel 24, controles 24, seções 32, menu 24, barra 32); seletor de viewport com Icon Button + Tooltip (C86); buscas das bibliotecas com Search Input; "Marcar todos"/"Limpar" do OTP com Link |
| 3 · Navegação | ✅ 02/10 — busca do menu com Search Input; categorias (e Building blocks) com Accordion Item (Label = categoria, Description = quantidade, sem Lead Item; abertas lembradas no navegador; na faixa estreita sem cabeçalho); tabs da documentação e do relatório com Scrollable Tab + Tab Item (teclado do componente). Scrollable Tab ganhou `--cds-tab-width` (padrão 320, o frame do Figma) |
| 3b · Ajustes | ✅ 02/10 — superfície Inversed/Accent/Decorative pinta o frame inteiro (`kit.surface`), não um retângulo em volta; separadores do OTP com um Main Button ("Marcar todos" ↔ "Limpar"); menu sem divisórias e redimensionável (alça `role=separator`, mouse e setas, 200–400, lembrado); relatório: tabs sem a amostra do Scrollable Tab, painéis na ordem Componentes · Adaptações para código · Débitos e melhorias mapeados · Decisões, Pendências fora, cores `Charts/*` (Accent, `Charts/03/semi-soft` na exceção e `Charts/07/medium` nos débitos; trilho `Charts/07-soft`) |
| 3c · Largura livre | ✅ 02/10 — seletor de viewport ganhou um Text Input (só números, 240–1920 px); a categoria Mobile/Tablet/Desktop segue as faixas da coleção Viewport (≤599 · ≤1023) |
| 4 · Doc e recursos | ✅ 02/10 — galerias de ícones e ilustrações: categorias com Accordion Item (contagem na Description), "Abrir/Fechar todas" com Main Button, "Copiado" com Toast (rodapé, 3s); notas da doc com Alert Informative; `cards` e `specs` com Card (Has Border); "Fonte" com Link. Gap: C87 (tabela de conteúdo, Do/Don't, tile de galeria, lista de definição) |
| 5 · Relatório | ✅ 02/10 — cards de número, painéis da Visão geral e seções das tabs com Card (Has Border; conteúdo montado antes de conectar); barras com Progress Line (ganhou `--cds-progress-color`/`--cds-progress-track`, padrão inalterado; decorativa, `aria-hidden`); contadores com Tag Neutral; "Ver no GitHub" e "Ver decisões" com Link; busca com Search Input. Rosca continua em CSS (sem componente de gráfico, C87) |
| 6 · Fechamento | ✅ 02/10 — `scripts/dev/audit-ui.js` (valores crus no CSS da casca, controles HTML à mão no JS, espaço/raio cru inline; testado plantando violações) sai limpo com 4 exceções explicadas; CSS morto removido (`pg-row`, `pg-text`, `rp-tag`); 9 telas conferidas sem custom element indefinido nem erro; gaps consolidados no CONFERIR (C83, C84, C85, C86, C87, C88) |

## 5. Resultado

- **Componentes do DS na casca:** Icon Button, Tooltip, Link, Switch, Text Input, Search Input, Filter Chips + Chips Group, Slider, Radio Select Input, Async Select Input, Main Button, Tag, Accordion Item, Scrollable Tab + Tab Item, Toast, Alert, Card, Progress Line.
- **Tokens:** cor, tamanho, raio, borda, opacidade, text style, motion, elevation e grid (`Common/Grids/*`, novo) em todo o CSS da casca.
- **Continua em HTML com tokens (sem componente no DS):** item de menu lateral (C88), tile de galeria, tabela de conteúdo, Do/Don't, lista de definição, gráficos (C87), escolha única visível (C85).
- **Melhorias nos componentes que saíram do uso real:** Tooltip descreve o focável dentro de gatilhos compostos; Scrollable Tab (`--cds-tab-width`), Accordion (`--cds-accordion-width`) e Progress Line (`--cds-progress-color/-track`) aceitam largura/cor por variável sem mudar o padrão do Figma.
- **Para manter:** rodar `node scripts/dev/audit-ui.js` antes de publicar mudanças na casca.

## 6. Tooltips de ajuda (02/10)

Helper `kit.tip(alvo, texto, { label, text, placement, container })` e `kit.lazyTip` (cria no 1º hover/foco): Tooltip do DS; alvo sem foco ganha `tabindex=0`; texto com sublinhado pontilhado (`.pg-has-tip`).

**Feito (🔴):** cabeçalho "Building blocks" do menu · rótulo "Viewport" · campo "px" · "Valor:" do frame · seções Variants, Booleans e Instance swap (ícone ⓘ, como Nested instances) · rótulos "State" (Disabled, Hovered/Pressed) · blocos das galerias de ícones e ilustrações (substituem o `title` nativo) · cards de número do relatório · legenda da rosca (Segue o Figma, Exceção, Débito).

**Feito (🟡, 02/10):** "Recursos de suporte" · links do menu com task do Jira, `[Beta]` ou link de branch do Figma (um Tooltip só, com o que se aplica) · "Viewport:" do frame · seção "Texts" e seções só do código (Comportamento, Dados, Opções, Acessibilidade) · props "Is …" (Is Active, Is Collapsed, Is Selected, Is Blocked, Is Current Day) · Tags exposta/fixa do inspetor · tipos de prop na doc (Variant, Boolean, Text, Swap component) · números da Anatomia (só mouse: a legenda cobre o teclado) · linhas das barras do relatório (valor, % do total real e, nos débitos, o que entra no tipo).

**Feito (⚪, 02/10):** links Jira/Figma/Zeroheight da barra (para onde levam; aviso de branch no Figma) · opções dos chips de escolha única ("No Figma: Kind = Ghost") · nomes de Motion Style nas fichas da doc (duração e curva lidas dos tokens em tempo real) · contadores (Tags) do relatório (só mouse).

Lista de 02/10 concluída: 27 pontos de ajuda com Tooltip do DS.
