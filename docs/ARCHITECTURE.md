# Arquitetura e infraestrutura — playground do Castanha DS

> Documento vivo, especializado em **como o projeto é construído e operado**. O *quê* (lotes, componentes, decisões de design) fica em [`ROADMAP.md`](ROADMAP.md).
> **Regra:** ao fim de cada etapa, atualizar §7 (diário), rodar de novo a análise do §5 e mover itens do backlog do §6.
> Última atualização: 01/10/2026 · **rodada de arquitetura** (pós-Lote 2) · 24 componentes · smoke 24/24.

---

## 1. Visão geral

```
Figma (fonte da verdade)
  │  Figma MCP: use_figma (leitura JS) · get_design_context · get_variable_defs · exportAsync
  ▼
tokens/figma-snapshot.json ──node scripts/build-tokens.js──▶ styles/tokens.css
assets/icons/<bucket>/*.svg + catalog.json, assets/illustrations/*.svg ──node scripts/build-assets.js──▶ styles/icons.css + scripts/assets-manifest.js
  │
  ▼
components/<id>/{<id>.css, <id>.js, <id>.playground.js}   ← custom elements em light DOM (extends CDS.Element)
  │  @deps no JSDoc ──node scripts/build-index.js──▶ blocos <link>/<script> em ordem topológica
  │  CDS.register() (scripts/playground-kit.js)
  ▼
index.html + scripts/app.js (shell: side menu · rotas #/id · tema · viewport)
tests/smoke.html + tests/smoke.js + tests/expected.js (monta tudo e compara tamanhos com o Figma)
  │  git push main
  ▼
GitHub Pages (gus-constantino.github.io/castanhads-component-teste)
```

**Princípios:** sem build em runtime e sem dependências. O Figma manda. Um componente = uma pasta. O que é gerado não se edita à mão.

---

## 2. Camadas

| Camada | Arquivos | Responsabilidade | Regras |
|---|---|---|---|
| **Tokens** | `tokens/figma-snapshot.json` → `styles/tokens.css` | 250 `--common-*` (light e dark por `html[data-theme]`), 34 text styles (`--text-style-*`, shorthand `font`), 3 elevations, Motion Styles | 1:1 com o nome do Figma (`Common/Colors/Text/intense` → `--common-colors-text-intense`). Nunca hex em componente |
| **Assets** | `assets/icons` · `assets/illustrations` · `assets/flags` · `assets/brand` | SVGs do Figma | Ícone monocromático = máscara (`.cds-icon--<nome>`, gerado), organizado em buckets = categorias do [Caju] Icons (`catalog.json` guarda ordem e palavras-chave). Colorido (bandeira, marca) = `<img>` ou SVG inline |
| **Base da lib** | `styles/shared.css` · `scripts/cds-element.js` | reset `box-sizing:border-box`, `.cds-icon` (máscara; cor = `--cds-icon-color` > `--_icon-color`), classe base `CDS.Element`, `CDS.create()` | Carregar antes de qualquer componente |
| **Componentes** | `components/<id>/` | Custom element `<cds-…>` + CSS + playground | Ver §3 |
| **Kit do playground** | `scripts/playground-kit.js` | `CDS.register`, helpers de controle (`seg`, `toggle`, `text`, `range`, `select`, `iconSwap`, `nested`, `watch`) | Não importa nada de componente |
| **Shell** | `index.html` · `scripts/app.js` · `styles/playground.css` | Side menu agrupado por página do Figma, rotas, tema, viewport → `data-viewport` | Não faz parte da lib. Blocos de componentes **gerados** (`build-index.js`) |
| **Testes** | `tests/smoke.html` · `smoke.js` · `expected.js` | Monta cada playground fora da tela; falha em erro de mount, elemento não definido ou tamanho fora de ±1px do Figma | Rodar ao fim de cada lote; registrar o tamanho esperado de cada componente novo |

---

## 3. Contrato de componente (estado atual)

1. **Custom element em light DOM**, sem Shadow DOM, estendendo `CDS.Element` (`render()`, `flag()`, `text()`, `a11yName()`, `define()`). Light DOM deixa os tokens cascatearem, o tema funcionar por `data-theme` e os seletores `[data-viewport]` alcançarem o componente. Componentes com estado (OTP, Credit Card) sobrescrevem `attributeChangedCallback`. **Famílias** ganham uma base própria: `CDS.SelectionControl` (Checkbox, Radio, Switch) com render incremental (`build()` uma vez + `update()` por atributo), que mantém o `<input>` nativo e o foco.
   **Dependências** declaradas no JSDoc (`@deps icon badge`); a ordem de carga sai do `build-index.js`.
2. **Atributos = props do Figma** em kebab-case. Variant → atributo de valor (`appearance="warning"`). Boolean `Show X` ligado por padrão → `show-x="false"` desliga. Text → atributo de texto.
3. **Estado visual por CSS:** `:hover` = Hovered, `:active` = Pressed, `:focus-within` = Is Active. Valores em custom properties privadas (`--_bg`, `--_fg`, `--_bd`, `--_stroke-c`…) trocadas por seletor.
4. **Stroke INSIDE** = `box-shadow: inset 0 0 0 <w> <cor>`, que não desloca o layout.
5. **Nested instance = custom element real.** Tag → `<cds-icon>`, botões → `<cds-icon>` + `<cds-badge>`, OTP e Credit Card → `<cds-icon-button>`. O pai expõe referências (`iconEl`, `button`) para o inspetor do playground.
6. **Override de cor em nested** = o pai define `--cds-icon-color` no próprio elemento (ex.: `cds-tag{ --cds-icon-color:var(--_fg); }`). O ícone resolve `--cds-icon-color` > `--_icon-color` (Appearance) > padrão. Não depende de especificidade e é o equivalente direto do override de instância do Figma.
7. **Motion só por token:** `var(--common-motion-duration-*) var(--common-motion-easing-*)` ou aliases de Motion Styles (`--motion-hover-*`, `--motion-press-*`, `--motion-active-*`).
8. **Viewport:** o componente lê `[data-viewport="mobile|tablet"]` do ancestral e aceita `viewport="…"` para forçar o modo.
9. **Eventos:** `cds-change`, `cds-remove` (cancelável: `preventDefault()` mantém o chip), `cds-complete`, `cds-toggle`, `cds-visibility-change`, `cds-trailing-action` (`bubbles: true`). O papel da ação é de quem implementa.
12. **Recurso de suporte ≠ componente:** libs de apoio registram `CDS.register({ resource:true, order, status })` em `resources/<id>/<id>.js`, com doc em `CDS.docs[id]` e sem `mount`. O shell lista num espaço próprio ("Recursos de suporte"), abre direto na doc e não mostra a tab Playground; o smoke ignora.
11. **Documentação (opcional):** `components/<id>/<id>.docs.js` registra `CDS.docs[id]` só com dados (tabs → blocos). O shell mostra as tabs quando existe doc; a rota é `#/<id>/<tab>`. Exemplos usam o componente real com atributos; estáticos ficam `inert`. Estados de interação forçados por atributo (`state`, `is-active`) espelham as props do Figma para specimens.
10. **A11y:** elemento nativo sempre que existir (`<button>`, `<a>`, `<input>`). Decorativo → `aria-hidden`. Com `label` → `role="img"` + `aria-label`.

---

## 4. Infraestrutura e ambiente

| Tema | Como funciona | Armadilhas conhecidas |
|---|---|---|
| **Deploy** | GitHub Pages na `main`, raiz. Build de ~1 min | Cache do Pages: conferir com `?v=N` e recarregar com Cmd+Shift+R |
| **Servidor local** | `python3 -m http.server 8765 --bind 127.0.0.1` | O sandbox bloqueia porta local, então roda fora dele. O `launch.json` do app falha (o processo do app não acessa ~/Documents). O servidor derruba requisições às vezes (`ERR_CONNECTION_RESET`): recarregar e checar se `styleSheets` têm `cssRules` antes de testar |
| **Preview `file://`** | Snapshot estático: não carrega CSS/JS separados | Sempre testar via servidor |
| **Git/gh** | `gh`/`git push` precisam sair do sandbox (TLS do proxy corporativo) | — |
| **Download de assets** | `curl` para `figma.com` é negado nesta sessão | Exportar por `use_figma` → `exportAsync({format:'SVG_STRING'})` |
| **Figma MCP** | Servidor remoto, `fileKey` + `nodeId`. Branch = `branchKey` como `fileKey` | `get_design_context` estoura em sets grandes; usar extratores `use_figma` (§8). `exportAsync` falha em vetor sem fill no nó → reconstruir via `vectorPaths` + `vectorNetwork.regions` |
| **Jira** | MCP Atlassian lê issue e comentários | Não baixa anexos (o handoff precisa ser colado) |

---

## 5. Análise — rodada 11 (02/10 · Lote 7, Navegação)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A57 | **`CDS.TabList`** (base de Fixed e Scrollable Tab) | tablist com foco itinerante; o `tabindex` vem do próprio `.Item` (ele conecta depois da lista), por isso o `role` é definido antes de criar os itens | ✅ |
| A58 | **Colisão de prefixo de classe** | `.cds-bc` (Balance Card × Breadcrumb). Um `grep` nos `.css` acha prefixos definidos por mais de um componente; os demais casos são reaproveitamento de base (`.cds-tf`, `.cds-li`, `.cds-btn`) | ⏳ backlog: checagem automática no `build-index` com lista de bases permitidas |
| A59 | **Popover: conteúdo antes do connect** | O Popover move os filhos para o Slot no primeiro render; filhos acrescentados depois ficam fora (viraram uma linha flex ao lado do Slot) | ✅ regra; ⏳ backlog: o Popover aceitar filhos novos (MutationObserver ou `slotEl` público) |
| A60 | **Specimens mais largos que o frame** (Pagination 780, Drawer 640) | `max-width:none; flex:none` no specimen do playground; o componente segue responsivo (`max-width:100%`, quebra de linha) | ✅ |

### Rodada 10 (02/10 · Select Inputs + listas antecipadas)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A52 | **`CDS.attr(el, nome, valor)`** | Só escreve o atributo quando muda (null remove). Mesmo valor dispara `attributeChangedCallback`; repassar atributos ao filho em ordem errada fazia ele re-renderizar com estado velho | ✅ usar sempre que um pai repassa atributos a um filho com estado |
| A53 | **`CDS.ListItem`** (base de Selection e Content List Item) | Monta Container + .Lead Item + .Text Content + trailing + Divider; a tag da linha depende do modo (`a`, `button`, `div` de controle, `role=option`) e é recriada quando o modo muda | ✅ |
| A54 | **`CDS.SelectField`** (base dos 5 Selects) | Estende `CDS.TextField` (mesmas props e CSS) e acrescenta Popover manual, listbox, teclado e seleção única/múltipla; cada membro define 1 a 4 ganchos (`searchable`, `multiple`, `optionTrailing`, `popoverGap`, `displayText`) | ✅ |
| A55 | **Componente de lote futuro como dependência** | As opções dos Selects são componentes do Lote 8. Antecipar o componente real (em vez de uma linha provisória) evita refactor e mantém a regra de `@deps` | ✅ D50 |
| A56 | **Popover dentro de campo** | `popover="manual"` (o campo decide abrir e fechar; com `auto`, o clique no campo fecharia antes de reabrir) e o `cds-toggle` interno é contido para não duplicar o do campo | ✅ |

### Rodada 9 (02/10 · Lote 6, Containers e overlays)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A46 | **`CDS.position(anchor, el, {placement, gap})`** | Posicionamento `fixed` compartilhado: abre embaixo ou em cima, inverte se não couber e prende na viewport com 8px de margem. Tooltip e Popover usam | ✅ (resolve A41) |
| A47 | **Plataforma antes de JS**: Popover API e `<dialog>` | Camada de topo, Esc, clique fora (popover), foco preso e retorno de foco (dialog) vêm do navegador. O código só cuida de estado, posição e eventos | ✅ |
| A48 | **`CDS.Overlay`** (base de Modal, Drawer, Bottom Sheet) | Captura os filhos como Slot, monta header/slot/footer por ganchos (`buildPanel`/`updatePanel`), `dismissible="false"` = padrão Dialog, `inline` = specimen no fluxo (o smoke mede ele) | ✅ |
| A49 | **Viewport como variável do Figma** (`Specific/Drawer/Is *`, `Common/Is Desktop`) | Vira CSS por `[data-viewport]` (frame do playground) ou atributo `viewport`; numa página real sem `data-viewport`, o padrão é desktop | ⏳ decidir se a página real deve ler `matchMedia` (backlog P3) |
| A50 | **Estado não pode depender de rAF nem do evento `close`** | Com a aba oculta (pane do app, aba em segundo plano) os dois atrasam; o Popover não ligava ao gatilho e o Modal ficava com `open` no host | ✅ corrigido; regra registrada no diário |
| A51 | **Atributo global de HTML como prop** (`title`) | Gera tooltip nativo; o Header e os overlays usam `text-title` (como `role` → `role-kind` no Lote 3) | ✅ |
| A44 | ~~Backdrop ainda não existe~~ | O Banner Kind=Image consome `<cds-backdrop>`; os overlays usam o mesmo visual no `::backdrop` | ✅ |

### Rodada 8 (02/10 · Lote 5, Feedback e conteúdo)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A38 | **Override por variável virou padrão** (`--cds-icon-color`, agora `--cds-shaped-bg`) | A instância do Figma muda o fundo do Shaped Icon no Alert; o pai define a variável e o componente filho não ganha variante nova | ✅ usar para todo override de instância |
| A39 | **Conteúdo rico por filhos** (Alert/System Banner) | Os filhos de quem usa são capturados no primeiro `build` e viram o Text Content; sem filhos, vale o atributo `text` | ✅ padrão para "pode ter negrito e link" |
| A40 | **Área clicável inteira** (Banner, Balance Card) | `<a>` com `href`, `<button>` sem; um só alvo focável, sem botão aninhado | ✅ |
| A41 | **Primeiro elemento flutuante** (Tooltip com `for`) | `position:fixed` calculado no `show()`, vira para baixo se não couber em cima | ✅ virou `CDS.position` (A46) |
| A42 | **Ilustração maior que 20 KB** | `scripts/dev/extract-svg.py` junta pedaços `@@SVG` do transcript | ✅ receita para o [Caju] Illustrations |
| A43 | **Smoke mede o playground** | Os padrões do playground têm de ser os do Figma; o Balance Card com textos de exemplo mediu 151 em vez de 144 | ✅ regra: exemplos ficam no hint, não no default |
| A45 | **Ler overrides da instância, não só as props** | No `.Content Banner` Inversed a prop do Icon é `Neutral`, mas a instância sobrescreve o fill para `Icons/inversed`. O extrator agora precisa ler a cor resolvida do vetor (`boundVariables.fills`) além de `componentProperties` | ✅ regra no extrator |

### Rodada 7 (01/10 · Lote 4, Text Fields)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A3 | **Re-render por `innerHTML`** (desde a rodada 1) | `CDS.TextField` faz `build()` uma vez e `update()` por atributo: o `<input>` nunca é recriado (teste: trocar Appearance e Label com o campo focado mantém foco, valor e seleção). Credit Card migrou junto | ✅ resolvido na família de inputs |
| A19 | **Estados forçados** | Viraram contrato da base (`.cds-tf[state]`, `.cds-tf[is-active]`); todo membro ganha de graça | ✅ |
| A34 | **Motor de máscara único** (`CDS.TextField.masks` + `patternMask`) | Padrão `0`/`A`, caret reposicionado por contagem de dados, Backspace/Delete atravessam a pontuação. Currency é caso à parte (direita para a esquerda). Credit Card usa `patternMask("0000 0000 0000 0000")` | ✅ |
| A35 | **Ganchos da base** (`controlTag`, `hasLeadIcon`, `mask`, `configureControl`, `buildTrailing`/`updateTrailing`, `fallbackName`) | Cada membro tem 20–60 linhas. Search, Password e Credit Card só diferem no trailing | ✅ padrão para os Selects (Lote 6) |
| A36 | **Quantity fora da base** | A annotation diz que é independente da família: reaproveita as classes de Label/Box/mensagem, mas tem a própria lógica (faixa, passo, ajuste no blur, anúncio) | 🟢 consciente |
| A37 | **Especificidade dos estados** | `[disabled]:not([is-active])` vencia o Warning; corrigido com a regra `[appearance=warning][disabled]`. Teste de cor por Appearance (backlog P2) teria pegado | ✅ / ⏳ teste |

### Rodada 6 (01/10 · recursos de suporte)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A29 | **Dois tipos de entrada no registro:** componente (playground + doc opcional) e recurso (só doc) | Mesmo `CDS.register` com `resource:true`; o shell decide tabs, modo doc e menu. Evita um segundo roteador | ✅ |
| A30 | **`resources/` fora de `components/`** e sem `@deps` | O `build-index` inclui depois dos componentes; um recurso nunca é dependência de componente (o componente consome os *arquivos*, não a página) | ✅ |
| A31 | **Accordion nativo (`<details>`)** na biblioteca | Teclado e leitor de tela de graça; a busca abre só os painéis com resultado e limpar volta ao estado inicial | ✅ reutilizável quando o Accordion do DS existir |
| A33 | **Side menu com o mesmo accordion (`<details>`)** da biblioteca de ícones; estado aberto por categoria em `localStorage` (conveniência por pessoa, com `try/catch`) | Em telas ≤1100px o menu é uma faixa horizontal: tudo aberto e cabeçalhos escondidos, senão os itens de uma categoria fechada ficariam inacessíveis (aconteceu com Building blocks no 1º teste) | ✅ |
| A32 | **Página reservada sem fonte** (Animações) | Fica marcada "a definir" e sem conteúdo inventado até o link chegar | 🟡 Q31 |

### Rodada 5 (01/10 · importação dos ícones)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A25 | **Ícones por bucket sem mudar o contrato:** a classe continua `.cds-icon--<nome>`; só o caminho do arquivo ganhou a pasta | Nenhum componente mudou; os 48 ícones usados nos componentes renderizam | ✅ |
| A26 | **`catalog.json` como fonte de ordem e metadados** (categoria, palavras-chave da description do Figma) | Alimenta a galeria (busca), o instance swap agrupado e o manifest | ✅ |
| A27 | **Manifest cresceu para ~45 KB** (palavras-chave de 262 ícones), carregado em toda página | Aceitável hoje; se crescer com ilustrações, separar `keywords` num arquivo carregado só pela galeria | 🟢 monitorar |
| A28 | **Exportação sem `curl`:** o `use_figma` devolve no máximo 20 KB por chamada; as linhas `@@ICON` são extraídas do transcript da sessão por script (`scripts/dev/extract-icons.py`), sem redigitar SVG | 14 chamadas para 274 ícones; coordenadas com 2 casas | ✅ receita registrada |

### Rodada 4 (01/10 · experimento de documentação)

| # | Achado | Detalhe | Status |
|---|---|---|---|
| A17 | **Doc como dados, não HTML:** 13 tipos de bloco (`h2`, `p`, `cards`, `anatomy`, `props`, `specimens`, `guides`, `dodont`, `table`…) cobrem o frame `[Documentação]` inteiro | Uma doc nova é só um `.docs.js`; o estilo fica num lugar (`docs.css`). O frame do Figma tem estrutura estável (Sobre → Uso → Anatomia → Propriedades → Estilos → Acessibilidade → Diretrizes → Motion → Do's) | ✅ pronto para replicar |
| A18 | **Doc viva = teste visual:** os exemplos são o componente real, então divergências aparecem | Achou o Label do Warning sem cor no Credit Card | ✅ |
| A19 | **Estados forçados por atributo** (`state="hovered|pressed"`, `is-active`) | Necessário para specimens estáticos; já em Credit Card e OTP (mesmo padrão: lista de seletores ao lado do `:hover`/`:active`/`:focus-within`) | 🟡 virar contrato da família no Lote 4 |
| A23 | **Doc sem fonte no frame:** quando a seção está oculta, os dados vêm das annotations (via `use_figma`) e do handoff dev; a nota de fonte vai no fim da tab | Mantém a regra de não inventar: cada item aponta para annotation ou handoff | ✅ |
| A24 | **Motion Styles como alias de primitivo:** o snapshot ganhou `motionAlias` (estilo → `Common/Motion/*`) e o `build-tokens` gera `--motion-<estilo>-01-<timing|easing>: var(--common-motion-…)`. O índice fica no nome para os próximos estilos | Script confere que os 15 aliases resolvem para os mesmos valores | ✅ |
| A22 | **2ª doc custou só dados + 2 ajustes no kit:** grade de specimens com `min` por coluna e anatomia medindo a largura natural (`flex:0 0 auto`) | O kit generalizou; os bugs achados eram do kit (grade com wrapper extra), não da doc | ✅ |
| A20 | **Anatomia mede o DOM:** marcadores posicionados por `getBoundingClientRect` + `ResizeObserver`; em tela estreita o diagrama encolhe (`scale`) e a seta some | Seletores de alvo (`.cds-cc__label`) acoplam a doc à estrutura interna do componente | 🟢 aceitável; quebra visível se a estrutura mudar |
| A21 | **Docs não entram no smoke** | `*.docs.js` carrega no smoke (só dados), mas as tabs não são montadas | ⏳ P3: smoke montar cada tab e checar overflow |

### Rodada 3 (01/10 · Lote 3)

| # | Achado | Antes → agora | Status |
|---|---|---|---|
| A3 | Re-render por `innerHTML` | 15 → 16 componentes (os chips recriam só o conteúdo do `<button>`, que é mantido, então o foco não se perde). **Primeira base incremental:** `CDS.SelectionControl` não recria nada | 🟡 o padrão está validado; aplicar aos inputs no Lote 4 |
| A5 | px literais | +3 no Lote 3: `translateX(16px)` do Switch (sem token de deslocamento), largura 320 do Chips Group (largura do frame no Figma) e o offset do outline de foco | ⏳ P3 |
| A7 | Smoke | 24 → **33/33**; os Groups medem 328 = 6 × 48 + 5 × 8, a mesma conta do Figma | ✅ |
| A13 | **Novo — classe base por família:** 3 componentes compartilham markup, a11y e evento, mudando só `inputType`, `buildBox()` e `applyStatus()`. O CSS também tem base (`selection-control.css`, `chip.css`) | Checkbox, Radio e Switch têm ~30 linhas de JS cada | ✅ padrão para Text Fields e Lists |
| A14 | **Novo — `@deps` com base sem tag de playground:** `selection-control` e `chip` não registram playground; o `build-index` já trata (carrega CSS/JS, sem `.playground.js`) | — | ✅ |
| A15 | **Novo — um arquivo, vários elementos:** `selection-group.js` define 3 tags e o playground registra 3 páginas | O `build-index` trabalha por pasta, não por tag | 🟢 ok enquanto as tags forem irmãs |
| A16 | **Novo — `role` é atributo reservado:** a prop `Role` do Chips Group virou `role-kind` | Props do Figma que colidem com atributos globais de HTML (`role`, `hidden`, `title`) precisam de prefixo | 🟢 regra registrada no contrato |

### Rodada 2 (01/10 · pós-arquitetura)

| # | Achado | Antes → agora | Status |
|---|---|---|---|
| A1 | `index.html` manual | 72 tags à mão → **gerado** por `@deps` + ordenação topológica (falha se faltar dependência ou houver ciclo) | ✅ resolvido |
| A2 | Boilerplate repetido | `flag()` em 13 arquivos → 0; **24/24** em `CDS.Element`; `a11yName()` em 3 (os outros 2 `role=img` são sempre rotulados, de propósito) | ✅ resolvido |
| A3 | Re-render por `innerHTML` | 15 → 15 | ⏳ fica para o Lote 4 (inputs) |
| A4 | Motion literal | 12 → **0** | ✅ resolvido |
| A5 | px literais | 39 → 39 | ⏳ P3 |
| A6 | Override por especificidade | 5 → **0** (`--cds-icon-color`) | ✅ resolvido |
| A7 | Sem teste automatizado | → **smoke 24/24**. Na primeira rodada pegou 2 problemas que a inspeção manual não viu | ✅ base pronta |
| A8 | Extratores reescritos | sem mudança | ⏳ P3 |
| A11 | **Novo — dependência de reset global:** componentes assumiam `box-sizing:border-box` do shell do playground (o Badge saía com 24px fora dele) | reset movido para a base da lib (`shared.css`) | ✅ resolvido |
| A12 | **Novo — `loading=lazy` fora da tela:** Image mede altura 0 até carregar | aceito; expectativa só de largura | 🟢 consciente |

### Rodada 1 (01/10 · Lote 0 → Lote 2)

Medições no código atual:

| # | Achado | Evidência | Impacto | Severidade |
|---|---|---|---|---|
| A1 | **`index.html` mantido à mão** | 72 tags de componente para 24 componentes; a ordem importa (OTP e Credit Card precisam de `icon-button` e `badge` antes) | Cada componente novo exige 3 edições; um erro de ordem quebra em silêncio | 🔴 escala mal até ~80 componentes |
| A2 | **Boilerplate repetido** | `flag()`/`"false"` em 13 arquivos; `label → role=img` em 5; `observedAttributes + connectedCallback + attributeChangedCallback` em todos | Divergência de comportamento entre componentes | 🟡 |
| A3 | **Re-render por `innerHTML = ""`** | 15 componentes recriam o DOM a cada atributo | Perde foco/seleção e rebinda listeners. OTP e Credit Card guardam o valor à mão; risco em inputs futuros (Text Input, Selects) | 🟡 (🔴 para o Lote 4) |
| A4 | **Motion literal** | 12 ocorrências de `150ms cubic-bezier(.7,0,.8,1)` em vez de token | Os tokens existem (`--common-motion-duration-short-03` + `--common-motion-easing-systemic-accelerate`); mudar a curva exige caça manual | 🟡 |
| A5 | **px literais** | 39 ocorrências (OTP 7, card-flag 6, badge 5, botões 8) | Parte é geometria do Figma sem token (posição do Badge 6/5px, caret 24px, bandeira 40×24); parte tem token equivalente | 🟢/🟡 caso a caso |
| A6 | **Override de nested por especificidade** | 5 regras `pai > cds-icon[appearance]` | Funciona, mas é frágil: um novo seletor no Icon pode vencer o pai | 🟡 |
| A7 | **Sem teste automatizado** | Verificação por scripts ad hoc no navegador a cada lote | Regressões só aparecem quando alguém abre a página | 🟡 |
| A8 | **Extratores do Figma reescritos a cada lote** | Mesmo extrator compacto colado 6+ vezes nas chamadas | Custo de contexto e risco de variação | 🟢 |
| A9 | **Viewport só no playground** | Componentes leem `[data-viewport]` do frame | Num app real o equivalente seria media/container query; hoje não há fallback | 🟢 (decisão consciente, D20) |
| A10 | **TS adiado** | JS puro com JSDoc | Sem tipagem das props; o handoff para React/Flutter fica só na doc | 🟢 por ora |

**O que está funcionando bem:** a separação tokens/componentes/shell, os tokens gerados do snapshot (zero divergência com o Figma), o inspetor de nested instances ao vivo, o padrão `box-shadow inset` para stroke e o registro de componentes no side menu.

---

## 6. Backlog de evolução (priorizado)

| Prioridade | Item | Resolve | Esforço | Quando |
|---|---|---|---|---|
| ✅ | ~~`build-index.js` com `@deps` e ordenação topológica~~ | A1 | feito | rodada de arquitetura |
| ✅ | ~~`CDS.Element` + migração dos 24~~ | A2 | feito | rodada de arquitetura |
| **P1** | Render incremental para interativos (criar o DOM uma vez e atualizar atributos), começando pelo Text Input | A3 | por componente | Lote 4 |
| ✅ | ~~Motion por token~~ | A4 | feito | rodada de arquitetura |
| ✅ | ~~`--cds-icon-color`~~ | A6 | feito | rodada de arquitetura |
| ✅ | ~~Smoke test~~ | A7 | feito | rodada de arquitetura |
| ✅ | ~~Migrar Credit Card para `build()`/`update()`~~ (feito: subclasse de `CDS.TextField`); OTP segue com re-render (células variam de 3 a 6) | A3 | feito | Lote 4 |
| ✅ | ~~Smoke: rodar também em dark e em `data-viewport=mobile`, e verificar `aria-*` básicos~~ (feito: 3 passadas, a11y reprova, contraste WCAG AA e largura no mobile como aviso; D102) | A7 | feito | melhorias técnicas |
| **P2** | Subir `build()`/`update()` de `CDS.SelectionControl` para `CDS.Element` (opcional por componente) quando a 2ª família usar | A3 | ~1h | Lote 4 |
| ✅ | ~~Estados forçados como contrato da família de inputs~~ (base `CDS.TextField`) | A19 | feito | Lote 4 |
| **P2** | Smoke: checar a cor do Label/mensagem por Appearance nos inputs (o bug do Warning passou nos dois) | — | ~20min | Lote 4 |
| **P3** | Separar `keywords` do manifest (carregar só na galeria) se o manifest passar de ~100 KB | A27 | ~20min | ilustrações |
| **P3** | Smoke montar as tabs de doc e checar overflow horizontal em 375px | A21 | ~30min | 2ª doc |
| **P3** | Extrator do frame `[Documentação]` → `.docs.js` (estrutura estável: seções por nome) | A17 | ~1h | se a doc virar padrão |
| **P3** | `tools/figma/extract.js`: versionar os extratores (matriz de variantes, tree+diff, export SVG) para colar sem reescrever | A8 | ~30min | quando houver folga |
| **P3** | Revisar px literais e mapear o que tem token | A5 | ~30min | Lote 5 |
| **P3** | Carimbar também os `url()` do `icons.css` (SVGs) se um ícone mudar sem trocar de nome | D47 | ~20min | próxima reimportação de ícones |
| **P3** | Overlays e Badge numa página real: ler o viewport por `matchMedia` quando não houver `[data-viewport]` (hoje o padrão é desktop) | A49 | ~30min | Lote 7 |
| **P2** | `build-index`: avisar quando dois componentes definem o mesmo prefixo de classe fora da lista de bases | A58 | ~20min | Lote 8 |
| **P3** | Popover aceitar conteúdo acrescentado depois do connect | A59 | ~20min | Lote 8 |
| **P3** | Smoke: abrir os Selects (`openList()`), checar `aria-expanded`, `aria-activedescendant` e a largura do Popover = largura do campo | A54 | ~30min | Lote 7 |
| **P3** | Smoke: abrir os overlays de verdade (`show()`), checar `:modal`, foco no primeiro controle e fechamento por Esc/Backdrop | A48 | ~30min | Select Inputs |
| **P3** | TypeScript com `esbuild` gerando `dist/`, mantendo o Pages sem build (commit do bundle) | A10 | ~2h | depois de ~40 componentes |

---

## 7. Diário de arquitetura (uma entrada por etapa)

| Etapa | Mudança de arquitetura / infra | Aprendizado |
|---|---|---|
| CDS-1608 | Página única com tudo inline | Sem build é o caminho mais rápido para publicar no Pages |
| Credit Card | Separação por pasta + kit + shell + hash routing | Scripts clássicos (não ES modules) funcionam em `file://` e no Pages; ES modules exigiriam servidor sempre |
| Nested instances | `kit.nested` + `kit.watch` (MutationObserver + eventos de interação) | Inspecionar estado real (`:hover`, `:focus-within`) é mais fiel que simular props |
| Lote 0 | Tokens gerados de snapshot JSON · pipeline de assets · side menu por página | Snapshot versionado permite diff do Figma entre releases |
| Lote 1a | `data-viewport` no frame · Icon como nested real | Override de cor em nested exige vencer `[appearance]` do filho (→ backlog P2) |
| Lote 1b | Assets coloridos fora do pipeline de máscara · building blocks com `block: true` | Exportação de vetor pode falhar; reconstrução por `vectorPaths` é confiável |
| Lote 2 | Icon Button vira componente e substitui o botão desenhado à mão em OTP e Credit Card · base `.cds-btn` compartilhada entre Main e Drop | Componente consumido por outros tem que carregar antes: a ordem no `index.html` virou dependência implícita (→ P1 `build-index.js`) |
| Lote 3 | Primeiras **bases de família**: `CDS.SelectionControl` (JS + CSS) e `.cds-chip` (CSS + `CDS.chipIcon`) · primeiro render incremental · um arquivo definindo 3 tags (Groups) · `kit.selectionControl` (um playground parametrizado para 3 componentes) · evento cancelável `cds-remove` | Manter o `<input>` nativo e só atualizar atributos dá teclado, foco e leitor de tela de graça. A base de família reduz cada variante a poucas linhas. Props com nome de atributo global de HTML precisam de prefixo (`role` → `role-kind`) |
| Lote 4 | `CDS.TextField` (build/update) + `text-field.css` · 5 componentes novos · Credit Card vira subclasse · OTP usa Label/mensagem da família · `kit.textField` · máscaras do `.Text Content Mask` | Base com ganchos pequenos > herança profunda: cada membro sobrescreve 2–3 métodos. Testar comportamento (máscara, foco, clamp) por script no navegador pega o que a medida do smoke não pega |
| Lote 5 | 12 componentes (4 building blocks) · `--cds-shaped-bg` · Alert com conteúdo rico por filhos · Tooltip com gatilho (`for`) · ilustração `sino` via `extract-svg.py` | Os defaults do playground são o contrato do smoke: exemplo bonito vai para o hint. Override de instância do Figma = variável CSS no pai, nunca variante nova no filho |
| Regra Figma-primeiro | `docs/CONFERIR.md` (C01–C25) · motion dos Text Fields por variáveis `--tf-*` (main 300ms; Credit Card sobrescreve com Motion Styles) · Drop Button Pressed Inversed, Badge do Filter e specimens da doc revertidos ao Figma | Isolar o valor divergente numa variável ou numa regra só (`--tf-*`, última regra do `drop-button.css`) deixa a correção futura em uma linha. A coluna "Quando corrigir" do CONFERIR aponta o lugar |
| Lote 6 | `CDS.position` (Tooltip e Popover) · Popover sobre a Popover API nativa (`for` liga o gatilho; Drop Button sincroniza Is Active) · `CDS.Overlay` sobre `<dialog>` + `showModal()` (Modal, Drawer, Bottom Sheet) com o Backdrop no `::backdrop` · `inline` para specimens · Viewport Restriction por `viewport`/`[data-viewport]` · `CDS.Footer` como base do Fixed Bar · `kit.overlay` | Com o painel do navegador oculto, `requestAnimationFrame` não roda e o evento `close` do `<dialog>` atrasa: estado de componente não pode depender deles (o bind do Popover passou a ser síncrono; o `close()` do overlay atualiza o atributo e dispara `cds-close` na hora). `title` é atributo global (tooltip nativo sobre o painel inteiro): props de texto viram `text-title` |
| Cache-busting | `build-index.js` carimba `?v=<sha1:8>` em todo `.js`/`.css` local citado no HTML (inclusive o `tests/smoke.js` injetado por script); idempotente · CONFERIR agrupado por tipo de ajuste | Com hash do conteúdo (e não número de versão) só o arquivo alterado perde o cache, e não há passo manual para esquecer. Limite: arquivos puxados por `url()` dentro do CSS (SVGs dos ícones) seguem sem carimbo |
| Select Inputs + listas | `CDS.ListItem` → Selection List Item · Content List Item · `.Trailing Item` · `.Lead Item` (Lists) · `CDS.SelectField` → 5 Selects · `CDS.attr` · `kit.selectField` | Com `?v=hash`, rodar o `build-index` depois de cada edição para o navegador pegar o arquivo novo. Testes de comportamento por script (combobox, teclado, radio em grupo) acharam dois bugs que o smoke não veria: ordem de atributos e foco em aba oculta |
| Lote 7 | `CDS.TabList` → Fixed/Scrollable Tab · Breadcrumb (+ .Item, Popover de níveis) · Tab View (radiogroup sobre Icon Button) · Nav Control (+ .Item, `aria-live`) · Pagination (+ .Select Number) | Testar no navegador achou três problemas que o smoke só mostrou como tamanho errado (prefixo de classe, ordem role × itens, conteúdo fora do Slot). Ler a causa antes de ajustar o `expected` |
| Lote 8 | Content List e Selection List como contêineres que repassam atributos aos filhos (`CDS.attr`) | Evento reemitido pelo pai: usar `stopImmediatePropagation` no original, senão quem escuta no próprio pai recebe os dois (o original chega depois e sobrescreve o agregado) |
| Lote 9a | `CDS.dates` (parse/format pt-BR) · Date Picker como grade com foco itinerante e visões Days/Month/Year · Date Input (TextField + Popover manual com o Date Picker) · Modal Date Picker (Modal + Date Picker + Viewport Restriction) | Montar subárvores fora do DOM e inserir no fim evita que um filho com amostra (`.Week`) se preencha sozinho. Os tamanhos do Popover (336 × 412 e 636 × 412) bateram com o Figma sem ajuste: é sinal de que a composição está igual |
| Lote 9b | `CDS.TableCell` / `CDS.TableHead` (fill de `<td>`/`<th>` + elementos de building block) · Table sobre `<table>` com Pagination · Upload Item / Dropzone / Upload List · ilustração via `extract-svg.py` | O smoke pegou 11px a mais (borda de célula soma à altura) e 10px no Dropzone (agrupamento errado: o gap 16 era só entre o ícone e o bloco). Medir contra o Figma continua sendo o teste mais barato |
| Lote 9c | Slider (thumbs role=slider, ponteiro com captura no documento) · NPS e CSAT sobre rádio nativo (`:has(:checked)` para o visual) · Progress Tracker (lista com status calculado por `current`) | Description do Figma com requisitos de acessibilidade (Slider) vira o contrato do componente: implementar e testar exatamente o que ela pede |
| Lote 9d | Caju Card: SVG da variante buscado uma vez (cache por arquivo) e inserido inline; `tspan[data-field]` recebe os dados; bloqueado = Backdrop + lock-line por cima; `role=img` com rótulo gerado (tipo, verso, final, bloqueado) | Arte exportada do Figma com os textos marcados permite fidelidade total sem redesenhar vetores; o que é dado precisa ser texto, não contorno, no export |
| Relatório | `scripts/report.js` + `styles/report.css`: rota `#/relatorio/<tab>/<seção>` troca o shell; parser de Markdown mínimo (títulos, listas, tabelas, código, links) e dashboard em CSS puro (barras, conic-gradient), tokens Common e dark mode | Uma fonte só: o painel lê os `.md` do repositório, então os registros continuam sendo o lugar de escrever e o relatório nunca fica desatualizado |
| Drawer (Figma atualizado) | Nova prop `Show Secondary Action Button` (padrão ligado) repassada ao `.Footer`, como no Modal; description nova do Figma no cabeçalho do componente | Prop nova em overlay que reusa o `.Footer`: basta repassar o atributo, sem mexer na base |
| Ilustrações | `scripts/dev/import-illustrations.py` (export do Figma + listagem dos frames → pastas por categoria + `catalog.json`), `build-assets.js` lê o catálogo e gera `illustrations`/`illustrationBuckets`; `CDS.illustration(nome)` resolve o arquivo; galeria `illustrationGallery` no docs-kit e `kit.illustrationSwap` | Mesmo desenho dos ícones (catálogo + pastas + manifest) para as duas libs de apoio; nome com categoria evita colisão |
| Accordion | `cds-accordion-item` (Container = `<button aria-expanded>`, Slot = `role=region` + `inert` quando recolhido, altura por `grid-template-rows` 0fr↔1fr com o espaço de 4 dentro da área animada) e `cds-accordion` (repassa Kind, `exclusive` fecha os irmãos no `cds-toggle`) | Filho de amostra entra **antes** de conectar o item (senão fica fora do Slot). Smoke/medidas com o painel oculto: viewport 0×0 zera overlays (`100vw`/`100dvh`) e congela transições; emular um tamanho antes de medir |
| UI no DS · Fase 0 | Shell só com tokens; `build-tokens.js` passa a gerar `Common/Grids/*` (Viewport) com `:root` + `@media` + `[data-viewport]`; `--pg-line` = `Border/semi-soft`; larguras de layout como soma de tokens | O playground como primeiro consumidor expõe gaps de token (código, layout) que os produtos também vão sentir |
| UI no DS · Fase 1 | Header com `cds-icon-button` + `cds-tooltip for`; toolbar com `cds-link`. Tooltip: `aria-describedby` vai para o focável interno do gatilho (espera o custom element ser definido com `whenDefined`) | Compor componentes revela contratos implícitos: o gatilho do Tooltip precisa ser o elemento que recebe foco, não o host |
| Desempenho | `dist/cds.css` + `dist/cds.js` gerados pelo `build-index.js` (mesma ordem topológica, `try/catch` por arquivo, cabeçalho `/* ==== caminho ==== */` para achar o fonte); index e smoke carregam os pacotes; casca (tokens, shared, icons, kit, app) continua separada | Medir antes de otimizar: a navegação era rápida e o custo estava no número de requisições, não no tamanho |
| UI no DS · Fase 2 | Kit do playground montado com componentes do DS; eventos `cds-change` dos controles param no controle (`stopPropagation`) para não vazar para o preview; adaptadores `{checked}`/`{value}` mantêm a API dos 110 playgrounds | Trocar a camada de controles inteira mexendo só no kit: valeu ter os playgrounds falando com helpers e não com HTML |
| UI no DS · Fase 3 | Menu: `cds-search-input` + `cds-accordion-item` por categoria (links no Slot, `cds-toggle` grava as abertas); tabs: `cds-scrollable-tab` + `cds-tab-item`, rota segue o `cds-change` e o `active-item` segue a rota. Componentes com largura de specimen (320) expõem uma variável (`--cds-accordion-width`, `--cds-tab-width`) para quem precisa de 100% | Largura fixa do Figma é a do frame de documentação; em uso real o componente precisa aceitar a largura do container sem perder o padrão |
| UI no DS · Fase 4 | `docs-kit.js`: helpers `mainButton()` e `toast()`; galerias com `cds-accordion-item` (abrir/fechar = atributo `collapsed`), notas com `cds-alert`, cards/specs com `cds-card`, fonte com `cds-link` | Classe de layout na casca não pode mudar o `display` do componente (Chips Group e Alert quebraram assim): posicionar com largura/margem e deixar o layout interno com o DS |
| UI no DS · Fase 5 | `report.js`: helpers `card()`, `panel()` (corpo dentro do Card antes de conectar), `countTag()`, `dsLink()`; barras com `cds-progress-line` colorido por variável | Componente com Slot que só lê os filhos no 1º render (Card, Accordion, Tabs): sempre montar fora do documento e conectar no fim; expor cor/largura por variável em vez de sobrescrever o interno |
| UI no DS · Fase 6 | `scripts/dev/audit-ui.js`: varredura do CSS da casca (px/hex/rgba/ms/font/cubic-bezier fora de comentário e @media), de controles HTML à mão no JS e de espaço/raio cru inline; exceções explícitas com motivo; exit 1 se achar algo | Auditoria que só sai verde não prova nada: plantar uma violação e ver o script pegar antes de confiar |
| Recursos de suporte | `resources/<id>/` · `CDS.register({ resource:true })` · seção própria no side menu · `iconGallery` em accordion (`<details>`) · Icon sem doc da lib | Separar *quem desenha* (lib de apoio) de *quem aplica* (componente) deixa claro onde atualizar cada coisa. `<details>` resolve accordion sem JS de acessibilidade |
| Ícones | 274 SVGs em 12 buckets + `catalog.json` · `build-assets` com buckets, deprecated e `_glyphs` · `kit.iconSwap` com `<optgroup>` · bloco `iconGallery` + `icon.docs.js` | Edição de arquivo por fatia (`s[a:b]`) precisa checar `a < b`: com a ordem invertida a fatia sai vazia e `replace("", novo)` insere o texto entre todos os caracteres (aconteceu no kit; restaurado do git). Sempre `assert` na âncora |
| Motion Styles | `--motion-*-01-*` com alias para o primitivo; bloco `specs` (fichas) no kit; `<wbr>` em `código` longo | Tabela larga não funciona em doc responsiva: ficha por item escala melhor. Servidor local cacheia JS (sem headers): forçar `fetch(..., {cache:'reload'})` antes de recarregar |
| Doc (experimento) | `*.docs.js` (dados) + `scripts/docs-kit.js` (render) + `styles/docs.css` · tabs no shell com rota `#/<id>/<tab>` e teclado WAI-ARIA · `build-index` inclui `.docs.js` · estados forçados no Credit Card | Separar dados de render deixa a doc barata de escrever e consistente. Exemplos com `inert` ficam estáticos sem hacks de CSS. Decidir a anatomia compacta pela largura total, não pelo padding (que muda com a classe), evita oscilação no `ResizeObserver` |
| Arquitetura | `CDS.Element` · `@deps` + `build-index.js` · `--cds-icon-color` · motion por token · reset na base da lib · smoke test | Teste automatizado barato (mount + medida vs Figma) já paga na 1ª execução. Variável de override é mais robusta que especificidade. Reset de box-sizing é parte da lib, não do app |

---

## 8. Receitas (para não reescrever)

- **Cor de ícone aninhado:** ler a cor resolvida do vetor (`vector.boundVariables.fills`) além da prop `Appearance`; a instância pode sobrescrever o fill.
- **Ler um set grande sem estourar o contexto:** matriz por variante com `fill / stroke / opacity / texto+style / cor do ícone / tamanho / padding / gap / raio` (Lote 2), ou árvore da 1ª variante + diff das demais (Lote 1).
- **Resolver um token light/dark:** seguir `valuesByMode` até o primitivo, escolhendo o modo cujo nome contém `light` ou `dark` em cada coleção (Brand Style tem um modo só, "Caju", e aponta para Caju Beneficios Light/Dark).
- **Exportar ícone:** `getMainComponentAsync()` da instância → `exportAsync({format:'SVG_STRING'})`; se falhar, exportar a instância.
- **Adicionar componente:** criar a pasta com `@deps` no JSDoc → `node scripts/build-index.js` → registrar o tamanho em `tests/expected.js` → abrir `tests/smoke.html`.
- **Nova família de componentes:** base em `components/<familia>/` (sem playground) com `@deps —`; cada membro declara `@deps <familia>` e sobrescreve só o que muda. No playground, um helper no kit (ex.: `kit.selectionControl`) evita repetir os controles.
- **Novo membro da família Text Fields:** `@deps text-field`; `class X extends CDS.TextField` e sobrescrever só os ganchos (`controlTag`, `mask`, `configureControl`, `buildTrailing`/`updateTrailing`, `defaultLeadIcon`). Observar atributos extras com `CDS.TextField.observedAttributes.concat([...])`. No playground, `kit.textField(ctx, { tag, attrs, booleans, texts, leadIcon, variants, nested })`.
- **Adicionar um recurso de suporte:** criar `resources/<id>/<id>.js` com `CDS.register({ id, name, resource:true, order, status, figma })` e `CDS.docs[id] = { source, sourceLabel, tabs }` (começar com `window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};`) → `node scripts/build-index.js`.
- **Documentar um componente:** criar `components/<id>/<id>.docs.js` com `CDS.docs[id] = { tag, base, source, tabs }` → `node scripts/build-index.js`. Os blocos estão descritos no topo de `scripts/docs-kit.js`. Para specimens de Hovered/Pressed/Is Active, o componente precisa aceitar `state` / `is-active`.
- **Reimportar ícones do [Caju] Icons:** `use_figma` na página `UI & Caju` (0:1), listando os componentes dos frames de categoria em ordem e devolvendo linhas `@@ICON\t<categoria>\t<nome>\t<description>\t<svg interno>` em pedaços de até 19 KB (parâmetro `START`, a resposta termina com `@@NEXT\t<i>\t<total>`). Depois: `python3 scripts/dev/extract-icons.py <transcript.jsonl> --write` → `node scripts/build-assets.js`. O transcript fica em `~/.claude/projects/<projeto>/<sessão>.jsonl`.
- **Reimportar ilustrações do [Caju] Illustrations:** no Figma, Export → SVG das páginas Caju UI e Hero numa pasta; `use_figma` na Caju UI listando `categoria\tid\tnome\tdescription` dos componentes de cada frame (ordem do documento) num `.tsv`; conferir os repetidos (mapa `DUP` do script); `python3 scripts/dev/import-illustrations.py <pasta> <listing.tsv>` → `node scripts/build-assets.js` → `node scripts/build-index.js`.
- **Mexer na casca do playground (UI):** usar componente do DS (kit: `seg`/`toggle`/`text`/`range`/`select`/`button`/`action`/`surface`; docs: `mainButton`/`toast`; relatório: `card`/`panel`/`countTag`/`dsLink`), montar filhos antes de conectar e rodar `node scripts/dev/audit-ui.js` antes de publicar.
- **Testar no navegador:** abrir via servidor, checar `document.styleSheets` (todos com `cssRules`) e `customElements.get(...)`, recarregar se algo falhou, depois passar por todas as rotas medindo `getBoundingClientRect` e `getComputedStyle`.
