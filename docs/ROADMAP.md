# Roadmap — todos os componentes do Castanha DS no playground

> Documento vivo. Atualizar ao fim de cada lote: o que entrou, decisões novas, dúvidas resolvidas e aprendizados.
> Última atualização: 01/10/2026.

---

## 1. Fontes

| Lib | File key | O que vem dela |
|---|---|---|
| `[CastanhaDS] Components` (estável) | `LKZBwmlb7fIbDKdGrMncuA` | Componentes, building blocks (página `.Building Blocks`, node `2270:89`), collection **Brand Style** (`Common/*`), `.Text Styles`, `.Motion Styles`, **Viewport** |
| `[Caju] Icons` | `vi4CKuAe98zydoLAQXoibU` | 274 ícones 24×24 (página `UI & Caju`): 245 `-line`, 5 `-fill`, 24 sem sufixo. Página `Brands & Logos` à parte |
| `[Caju] Illustrations` | `9l54k2iyKGMaiIbsGGmEiM` | 237 ilustrações 200×200 (página `Caju UI`), mais as páginas `Hero` e `Cartões` |
| `[Caju] Theme` | `Zx9KwwRFqZrOfeuXpYZiTx` | Collection **Caju Beneficios** (Light/Dark, 226 variáveis): a origem dos valores que o `Common/*` referencia |

Branches já usadas: `PfeMbrThCwzwJFFo2GiAbW` (Code Input OTP) e `NHkGUvBfNMNTLnsxKtAmWa` (Credit Card Input). **Nenhum dos dois está na main ainda.**

Documentação publicada: zeroheight `castanha.caju.com.br/858426090` (MCP read-only). Protocolo: skill `castanhads-juntos`.

---

## 2. Inventário da lib estável (main)

**30 páginas de componentes · 80 sets/componentes publicados · 28 building blocks · 1 utility.**
Coluna *Usa*: instâncias aninhadas na 1ª variante (ícones omitidos).

### Fundação visual
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Images | Icon | `2261:1126` | 21 | — |
| Images | Shaped Icon | `2272:146` | 28 | — |
| Images | Image | `2273:320` | 3 | — |
| Images | Avatar | `2278:92` | 15 | — |
| Images | Caju Brand | `11271:154` | 5 | — |
| Flags | .Credit Card Flags | `4934:771` | 4 | — |
| Dividers | Divider | `4931:207` | 12 | — |
| Loaders | Spinner | `4333:3181` | 36 | — |
| Status | Tag | `4475:114` | 7 | Icon |
| Status | Badge | `4835:1472` | 2 | — |
| Status | Status Dot | `21745:69` | 15 | — |
| Progress Indicators | Progress Line | `2322:4006` | 11 | — |
| Content | Currency | `5301:2173` | 16 | — |
| Content | Link | `4926:213` | 12 | — |
| Content | .Text Content | `5516:10455` | 2 | — |

### Ações
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Buttons | Main Button | `4464:427` | 48 | Icon |
| Buttons | Icon Button | `4464:636` | 48 | Badge |
| Buttons | Drop Button | `6955:6985` | 96 | — |
| Buttons | Filter button | `5099:5389` | 8 | .Icons |

### Selection Controls
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Checkbox / Checkbox Group | `4123:2560` / `4132:1511` | 12 / 1 | — / Checkbox |
| Radio Button / Group | `4429:10437` / `4429:11192` | 8 / 1 | — / Radio |
| Switch / Group | `4895:809` / `4895:1233` | 8 / 1 | — / Switch |
| Input Chips | `12365:2728` (o duplicado `14120:5313` foi removido — Q5) | 4 | — |
| Filter Chips | `12365:2744` | 8 | — |
| Chips Group | `12457:3664` | 4 | Filter Chips |

### Text Fields (família)
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Text Input ✅ | `5743:325` | 32 | .Text Content Mask |
| Search Input ✅ | `14880:3404` | 32 | .Text Content Mask |
| Text Area Input ✅ | `10110:3028` | 32 | — |
| Password Input ✅ | `5798:2677` | 64 | Icon Button |
| [Beta] Quantity Input ✅ | `22756:7351` | 32 | Icon Button |
| Async Select Input | `11030:7644` | 32 | .Text Content Mask + Icon Button |
| Radio Select Input | `11143:3056` | 32 | idem |
| Checkbox Select Input | `11143:4833` | 32 | idem |
| Async creatable Select Input | `11018:5694` | 32 | idem |
| Multi Select Input | `13795:4984` | 32 | idem |
| *Credit Card Input* (branch) | `24614:7155` | 32 | .Text Content Mask + Icon Button — ✅ no playground |
| *Code Input OTP* (branch) | `24060:7228` | 16 | .Value Box + Icon Button — ✅ no playground |

### Feedback e conteúdo
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Feedback | Toast ✅ | `5234:516` | 2 | .Close Toast |
| Feedback | Alert ✅ | `11864:12559` | 3 | Shaped Icon + .Close Alert |
| Feedback | System Banner ✅ | `18432:2090` | 3 | Shaped Icon + .Close Alert |
| Content | Confirmation Message ✅ | `16359:1803` | 3 | Shaped Icon |
| Content | Topic ✅ | `15621:1175` | 2 | .Lead item + Shaped Icon |
| Tooltips | Tooltip ✅ | `11211:416` | 1 | — |
| Banner | Banner ✅ | `20051:15726` | 8 | .Content Banner + Icon |
| Actions | Balance Card ✅ | `17881:1707` | 4 | Tag + Currency |

### Containers e overlays
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Card | `5256:540` | 2 | Slot |
| Backdrop | `13784:3271` | 1 | — |
| Popover | `2270:102` | 1 | Slot |
| Modal | `16362:3267` | 1 | .Header + Icon Button + .Footer + Main Button |
| Drawer | `16456:4381` | 1 | Icon Button + Main Button + Viewport Restriction |
| Bottom Sheet [MOBILE ONLY] | `20848:2679` | 1 | .Header + .Footer + Main Button + Viewport Restriction |
| [Beta] Fixed Bar | `24037:2929` | 2 | Divider + Main Button |
| Viewport Restriction (Utilities) | `5357:3899` | 1 | — |

### Navegação
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Breadcrumb | `6792:24` | 1 | .Item + Popover |
| Fixed Tab / Scrollable Tab | `6500:6958` / `6646:181` | 3 / 6 | .Item |
| Tab View | `15713:2488` | 4 | Icon Button |
| Nav Control | `19560:3280` | 2 | .Item Nav Control + Icon Button |
| Pagination | `13408:1416` | 1 | .Select Number + Divider + Icon Button |

### Listas
| Componente | Node | Var. | Usa |
|---|---|---:|---|
| Content List Item | `5488:675` | 20 | .Lead Item + .Text Content + .Trailing Item + Divider |
| Content List | `5488:1482` | 5 | Content List Item + Tag |
| Selection List Item | `5488:812` | 96 | .Lead Item + .Text Content + Divider |
| Selection List | `5488:1552` | 2 | Selection List Item |
| Accordion / Accordion Item (**branch** `R7GDqtUKeNZZUg45M1llyr`) | `24841:33746` / `24673:26248` | 2 / 16 | Accordion Item / Icon + .Text Content + Divider |

### Complexos
| Página | Componente | Node | Var. | Usa |
|---|---|---|---:|---|
| Datepicker | Date Picker | `17629:24427` | 6 | .Navigation Control + .Week + .Day + Main/Icon Button |
| Datepicker | Modal Date Picker | `17560:51555` | 6 | Modal + Date Picker + .Header + .Footer |
| Datepicker | Date Input | `17962:70687` | 64 | .Text Content Mask + Icon Button |
| Tables | Table | `13472:5725` | 2 | .Toolbar + .Table Column + .Head + .Data Cell + Checkbox + Tag + Pagination |
| File Upload | Upload Item / Dropzone / Upload List | `15029:1115` / `15386:7230` / `15465:1365` | 4 / 5 / 1 | Spinner + Progress Line + Shaped Icon + Main Button |
| Slider | Slider | `20056:11908` | 30 | — |
| Rating Score | NPS Score / CSAT Score | `10100:848` / `10100:1192` | 24 / 12 | .Value Item / .CSAT Item |
| Progress Indicators | Progress Tracker Item / Tracker | `14415:3778` / `14524:1024` | 6 / 1 | Link |
| Caju Card | Caju Card | `17053:1181` | 21 | — |

### Building blocks (`.Building Blocks`, 28)
`.Currency Content` · `.Currency Symbol` · `.Lead Item` · `.Trailing Item` · ~~`.Transaction Status Icon`~~ (removido, C55) · `.Item` (Breadcrumb, `6713:3`) · `.Item` (Tabs, `6498:375`) · `.Icons` · `.Header` (`5077:800`) · `.Header` (`16362:3241`) · `.Footer` · `.Close Toast` · `.Close Alert` · `.Lead item` (Topic, `15621:66`) · `.Lead item` (File, `15207:13262`) · `.Text Content Mask` · `.Value Item` · `.CSAT Item` · `.Select Number` · `.Data Cell` · `.Head` · `.Toolbar` · `.Table Column` · `.Navigation Control` · `.Day` · `.Week` · `.Content Banner` · `.Item Nav Control`

---

## 3. Lotes

A ordem segue as dependências: cada lote só consome o que já existe. Os building blocks entram junto com o primeiro componente que os usa.

| Lote | Tema | Componentes | Building blocks que entram |
|---|---|---|---|
| **0** | Fundação | tokens completos (Brand Style + Text Styles + Motion Styles + Elevations, light/dark) · pipeline de ícones · ilustrações sob demanda · side menu agrupado por página do Figma | — |
| **1** | Visuais | Icon · Shaped Icon · Image · Avatar · Caju Brand · .Credit Card Flags · Divider · Spinner · Tag · Badge · Status Dot · Progress Line · Link · Currency · .Text Content | .Currency Content · .Currency Symbol |
| **2** | Ações | Main Button · Icon Button · Drop Button · Filter button | .Icons |
| **3** | Selection Controls | Checkbox (+Group) · Radio (+Group) · Switch (+Group) · Input Chips · Filter Chips · Chips Group | — |
| **4** | Text fields | Text Input · Search · Text Area · Password · [Beta] Quantity · **realinhar Credit Card e OTP à família** | .Text Content Mask |
| **5** | Feedback e conteúdo | Toast · Alert · System Banner · Confirmation Message · Topic · Tooltip · Banner · Balance Card | .Close Toast · .Close Alert · .Lead item (Topic) · .Content Banner |
| **6** | Containers e overlays | Viewport Restriction · Card · Backdrop (**o Banner Kind=Image passa a consumir**) · Popover (**+ Drop Button abrindo o Popover**, D41) · Modal · Drawer · Bottom Sheet · [Beta] Fixed Bar → em seguida os 5 Select Inputs | .Header (×2) · .Footer |
| **7** | Navegação | Breadcrumb · Fixed Tab · Scrollable Tab · Tab View · Nav Control · Pagination | .Item (×2) · .Item Nav Control · .Select Number |
| **8** | Listas | ~~Content List Item~~ · Content List · ~~Selection List Item~~ · Selection List (os itens foram antecipados para os Select Inputs, D50) | ~~.Lead Item~~ · ~~.Trailing Item~~ · ~~.Transaction Status Icon~~ (removido do Figma, C55) |
| **9** | Complexos | Date Picker · Modal Date Picker · Date Input · Table · File Upload (3) · Slider · NPS · CSAT · Progress Tracker · Caju Card | .Day · .Week · .Navigation Control · .Head · .Data Cell · .Table Column · .Toolbar · .Lead item (File) · .Value Item · .CSAT Item |

### Processo por componente (checklist)
1. Ler o set: props, `componentPropertyDefinitions`, variantes, description.
2. **Ler as annotations da página antes de decidir qualquer lógica** (Anexo 11 da skill).
3. Ler tokens por variante: fill, stroke e peso, texto, raio, opacidade, resolvendo light e dark.
4. Ler reactions (motion por transição) e nested instances (exposed ou fixa).
5. Construir `components/<id>/` (css · js · playground) **consumindo** os building blocks já existentes; `extends CDS.Element`, `@deps` no JSDoc, `node scripts/build-index.js`.
6. Testar em servidor local: estados, teclado, dark, 360px. Registrar o tamanho em `tests/expected.js` e rodar `tests/smoke.html` (tudo verde).
7. Publicar e registrar no §7 (Aprendizados), no §5 (dúvidas de escopo) e em **`docs/CONFERIR.md`** (tudo que no Figma parece errado: implementar como está e abrir um item).
8. **Atualizar `docs/ARCHITECTURE.md`**: diário (§7), nova rodada da análise (§5) e backlog (§6).

---

## 4. Decisões (já tomadas)

| # | Decisão | Origem |
|---|---|---|
| D1 | **O Figma manda.** Briefs, handoffs e zeroheight são mapas; quando divergem, segue o Figma e a divergência é registrada | brief CDS-1608 |
| D2 | Stack: Web Components em JS puro, sem build e sem dependências; scripts clássicos (funciona em `file://` e no GitHub Pages) | 30/09 |
| D3 | Um componente = `components/<id>/{css, js, playground.js}`. Tokens, shared e shell ficam separados | 01/10 |
| D4 | Tokens como CSS vars `--common-*`, 1:1 com `Common/*`; light padrão e dark por `data-theme` | 30/09 |
| D5 | Ícones = SVG exportado do Figma usado como `mask-image` (herda a cor do token). `mask-image` em longhand, **sem `var()`** (bug do Safari) | 01/10 |
| D6 | Booleans do Figma ligados por padrão: atributo `show-x="false"` desliga | 30/09 |
| D7 | Stroke INSIDE como `box-shadow: inset` (1px→2px sem deslocar o layout) | 30/09 |
| D8 | Motion por transição, com Motion Styles: Hover In 150 · Pressed 200 · Selected In 350. Classe `is-tapped` segura o Selected In após o clique | 30/09 |
| D9 | `Show Caret` é afordância de protótipo; o cursor é nativo (exceto OTP, onde o caret do Figma é desenhado) | annotations |
| D10 | Combinações `Disabled × Is Active` são artefato da matriz: não viram estado | annotations |
| D11 | Focus visível = padrão global do Castanha; não é variant | skill |
| D12 | Nested instances aparecem no painel (só leitura, ao vivo), com selo *exposta* ou *fixa* | 01/10 |
| D13 | O papel de trailing actions (ex.: `support-line`) é de quem implementa: o componente só emite evento e aceita `trailing-label` | 01/10 |
| D14 | Credit Card fixo em 16 dígitos (4×4); OTP de 3 a 6 células | 01/10 |
| D15 | Viewport padrão do playground = Fluido | 01/10 |
| D16 | ~~Fonte de verdade: sempre perguntar~~ → substituída pela D25 | Q1 · 01/10 |
| D17 | Building blocks ficam numa **seção recolhida "Building blocks" no fim do side menu**, além de aparecerem em Nested instances | Q2 · 01/10 |
| D18 | **Ilustrações e ícones sob demanda** via MCP; o Gustavo exporta tudo depois. Pipeline: soltar os SVGs em `assets/icons/` e `assets/illustrations/` e rodar `node scripts/build-assets.js`, que gera `styles/icons.css` e `scripts/assets-manifest.js` | Q3/Q4 · 01/10 |
| D19 | Complexos: **visual fiel + interação essencial** (estados, teclado e a11y do Figma e das annotations); regras de negócio simuladas | Q8 · 01/10 |
| D20 | **Collection Viewport → `data-viewport`** no frame do playground (360 = mobile · 744 = tablet · 1366/Fluido = desktop). Componentes com `Specific/*` leem via CSS e aceitam o atributo `viewport` para forçar o modo (ex.: Badge vira ponto de 8px no Mobile) | Q6 · 01/10 |
| D21 | **Nested instances reais:** componentes que no Figma instanciam outro (Tag → Icon, Shaped Icon → Icon) usam o custom element de verdade (`<cds-icon>`). Override de cor do Figma vira CSS no pai, com especificidade acima do `[appearance]` do filho | 01/10 |
| D22 | Sem Jira conhecido, o item do menu sai sem chave; o link do Figma aponta para o node do set na main | 01/10 |
| D23 | **Assets de marca** (Caju Brand, bandeiras) mantêm as cores do Figma — não são tokens. Caju Brand vira SVG inline (paths do Figma); bandeiras ficam em `assets/flags/` | 01/10 |
| D25 | **Fonte de verdade = main da lib.** Exceções: as branches já puxadas (Code Input OTP `PfeMbrThCwzwJFFo2GiAbW` e Credit Card Input `NHkGUvBfNMNTLnsxKtAmWa`). Novas branches entram depois, quando o Gustavo indicar, como atualização do componente | 01/10 |
| D26 | **Input Chips = `12365:2728`** (com stroke `Border/semi-soft`, o que o Chips Group consome). O set duplicado `14120:5313` era erro e foi removido no Figma (Q5 resolvida) | Q5 · 01/10 |
| D27 | **Hover do Unselected:** Checkbox usa `Border/semi-intense` e Radio usa `Accent/Solid/medium` — é intencional (Q18) | Q18 · 01/10 |
| D28 | **Foco por teclado:** não é prioridade agora; manter o outline 2px `Support/system` como padrão provisório (Q20) | Q20 · 01/10 |
| D29 | **Switch em 300ms** fica por enquanto; o Gustavo vai ajustar no Figma e atualizamos aqui (Q21) | Q21 · 01/10 |
| D30 | **Documentação dentro do componente, em tabs** (experimento no Credit Card Input): `components/<id>/<id>.docs.js` só com dados, montado por `scripts/docs-kit.js`. Exemplos são o componente real; estilo do frame `[Documentação]` e tabs no estilo do Scrollable Tab | 01/10 |
| D31 | **OTP alfanumérico aceita símbolos** (letras, números e símbolos; sem espaço). Numérico segue só 0–9 (Q25) | Q25 · 01/10 |
| D32 | **Seção de doc oculta no Figma → montar com a skill `castanhads-juntos` (setup documentation) a partir das annotations e do handoff dev** (Q26). Aplicado na Acessibilidade do OTP: 4 annotations de Accessibility + seção Acessibilidade do `HANDOFF_CodeInputOTP_DEV.md`. Gravar no frame do Figma só com aprovação | Q26 · 01/10 |
| D33 | **Motion Styles com o índice no nome** (`Hover In/01`), como estão na main; no código `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`. A aba Motion mostra só interação → gatilho → Motion Style (primitivos e variáveis CSS ficam fora da doc) | 01/10 |
| D34 | **Nome dos Motion Styles segue a main** (`Hover In/01/Timing`). Se a main renomear, atualizar o snapshot e rodar `build-tokens` (Q28) | Q28 · 01/10 |
| D35 | **Ícones organizados por bucket = frame de categoria do [Caju] Icons** (`assets/icons/<categoria>/<nome>.svg`), ordem e palavras-chave em `catalog.json`. Nome de classe continua `.cds-icon--<nome>` (único); deprecated fica em bucket próprio, fora do instance swap. Glifos internos de componentes (checkbox) em `_glyphs` | 01/10 |
| D36 | **Lib de apoio ≠ componente.** [Caju] Icons, [Caju] Illustrations, Caju Theme e Animações são **Recursos de suporte**: espaço próprio no side menu, pasta `resources/<id>/`, só doc (sem playground). O componente Icon fica só com o playground. A biblioteca de ícones é um accordion por categoria | 01/10 |
| D37 | **Side menu em accordion por categoria** (página do Figma): abre a categoria da página atual e as que a pessoa abriu (lembrado no navegador); a busca abre todas as que têm resultado. No mobile (faixa horizontal) fica tudo aberto, sem cabeçalho | 01/10 |
| D38 | **Família Text Fields sobre `CDS.TextField`** (render incremental): Text Input, Search, Text Area, Password e Credit Card estendem a base; o Quantity reaproveita Label/mensagem (é independente da família, pela annotation). O OTP usa as classes de Label e mensagem da família e mantém as células | 01/10 |
| D39 | **`.Text Content Mask` como `mask`** no Text Input (text, cpf, cnpj, cnpj-new, telefone, celular, cep, date, currency); o valor guardado é só o dado. O Credit Card usa o mesmo motor de máscara | 01/10 |
| D40 | **O código segue o Figma como está hoje**, mesmo quando parece errado; quando o Figma corrigir, o código acompanha. Toda divergência vai para `docs/CONFERIR.md` (C01–C39). Exceções: decisão explícita do Gustavo, ausência de especificação e adaptação para web aprovada. Q32 (CEP correto) e Q35 (senha mascarada) ficam como exceções aprovadas | Q33 · 02/10 |
| D41 | **Drop Button abre o Popover** (pedido do Gustavo): entra no Lote 6, junto com o Popover | 02/10 |
| D42 | **Override de instância por variável** também no Shaped Icon (`--cds-shaped-bg`): o Alert e o System Banner usam `Feedback/*/semi-soft` como no Figma, sem mexer no Shaped Icon solto | 02/10 |
| D43 | **Cards e banners clicáveis** viram `<a>` com `href` e `<button>` sem; o CTA do Banner é só visual (description do Figma) | 02/10 |
| D44 | **Overlays sobre a plataforma**: Popover na Popover API (`popover="auto"`, `for` = id do gatilho); Modal, Drawer e Bottom Sheet em `<dialog>` com `showModal()` e o Backdrop no `::backdrop`. Specimen no fluxo com `inline` | 02/10 |
| D45 | **Viewport do Figma por CSS**: Drawer (mobile/tablet) e Bottom Sheet (desktop) trocam o painel pelo Viewport Restriction conforme `[data-viewport]` ou o atributo `viewport` | 02/10 |
| D46 | **Props de texto com nome de atributo global** ganham prefixo: `Text Title` → `text-title` no .Header e nos overlays (evita o tooltip nativo de `title`) | 02/10 |
| D47 | **Cache-busting por hash**: o `build-index.js` carimba todo `.js`/`.css` local do `index.html` e do `smoke.html` com `?v=<sha1 do conteúdo>`; só muda a URL do arquivo alterado. Rodar o build antes de cada commit | 02/10 |
| D48 | **CONFERIR por tipo de ajuste**: Ajuste de texto · Ajuste de UI · Motion · Refactor · Naming · Acessibilidade · Documentação. O número do item não muda | 02/10 |
| D49 | **Overlays (C37, C38)**: o Modal tem divisores opcionais desligados por padrão (`show-header-divider`, `show-footer-divider`); o Drawer sempre usa Backdrop e sempre fecha ao clicar fora ou no Esc | 02/10 |
| D50 | **Listas antecipadas para os Selects** (Gustavo): Selection List Item, Content List Item, .Trailing Item e .Lead Item (Lists) entram completos agora, porque são as opções dos Select Inputs no Figma. O Lote 8 fica com Content List, Selection List e .Transaction Status Icon | 02/10 |
| D51 | **Select Inputs = combobox do WAI-ARIA**: o foco fica no `<input role="combobox">`, opções `role="option"` num `role="listbox"` dentro do Popover (`popover="manual"`), opção atual em `aria-activedescendant`. Opções por `<option>` filhos ou `.options`; Async aceita `.loadOptions(query)` | 02/10 |
| D52 | **Linha de lista sem `<label>` aninhado**: com Checkbox/Radio/Switch no trailing, a linha repassa o clique ao input nativo, que recebe o nome do Label por `aria-labelledby`; sem controle, a linha é `<button aria-pressed>` (Selection) ou `<button>`/`<a>` (Content) | 02/10 |
| D53 | **Navegação com padrões do WAI-ARIA**: Tabs = tablist com foco itinerante (setas/Home/End ativam); Tab View = radiogroup; Breadcrumb = `nav` + `ol`, página atual com `aria-current`; Nav Control só leitura (indicadores `aria-hidden` + região `aria-live` "Item n de total") | 02/10 |
| D54 | **Breadcrumb por filhos `<a href>`**: o último nível é a página atual; `collapse` manda os primeiros níveis para o Popover do "…". Sem filhos, renderiza a amostra do Figma | 02/10 |
| D55 | **Listas repassam Kind/Intent aos itens**: Content List e Selection List aceitam filhos e, sem eles, geram a amostra de 12 itens do Figma; a Selection List emite um `cds-change { values }` agregado | 02/10 |
| D56 | **Lote 9 dividido** em 9a (datas), 9b (dados e upload) e 9c (entrada e avaliação) | 02/10 |
| D57 | **Date Picker = grade do WAI-ARIA** (role grid, foco itinerante no dia, setas/Home/End/PageUp/PageDown); seleção `single` ou `range`; datas em AAAA-MM-DD nos atributos e dd/mm/aaaa na tela. O Modal Date Picker só aplica no Confirmar | 02/10 |
| D58 | **Modal sem limite de largura**: abraça o conteúdo (min 272); resolve C34 e C58 | 02/10 |
| D59 | **Amostras do protótipo são ilustrativas**: o código mantém o comportamento funcional (seleção real, textos derivados do estado) em vez de copiar valores de exemplo | 02/10 |
| D60 | **Table como `<table>` de dados**: `.columns` / `.rows` (propriedades), ordenação com `aria-sort`, seleção por checkbox e paginação no cliente com a Pagination; sem dados, a amostra do Figma | 02/10 |
| D61 | **Stroke INSIDE vira `box-shadow inset` ou `outline` com offset negativo**, nunca `border`: em célula de tabela e em contornos tracejados a borda soma à altura | 02/10 |
| D62 | **Table por linhas, não por colunas** (registrada a pedido do Gustavo para o debate no time de design): o dado é a linha; ordenar, selecionar, hover e paginar agem sobre linhas; leitor de tela e responsividade dependem disso. No Figma, a largura consistente sai de tokens de largura por coluna numa `.Table Row`. Detalhes: `docs/TABLE-LINHAS-X-COLUNAS.md` | 02/10 |
| D63 | **Controles de avaliação sobre `<input type="radio">` nativo** (NPS e CSAT: radiogroup com setas) e **Slider com thumbs `role="slider"`** (teclado completo, Range sem cruzar), como pede a description do Slider | 02/10 |
| D64 | **Caju Card em etapa própria (9d)**: as artes vêm de vetores por Kind e orientação; a fidelidade pede exportar as peças estáticas sem alterar o arquivo do Figma | 02/10 |
| D65 | **Caju Card = arte em SVG + dados como texto**: cada variante exportada do Figma vira `assets/caju-card/<kind>-<h\|v>-<front\|back>.svg`, inserida inline; número, CVV, validade, código de ativação e 4 últimos dígitos são `tspan[data-field]` trocados pelos atributos. Combinação ausente cai na mais próxima (C74) | 02/10 |
| D66 | **Relatório como painel** (`#/relatorio`, botão de gráfico no header): lê `ROADMAP`, `CONFERIR` e `ARCHITECTURE` ao abrir, sem cópia; título "Saúde da stack Figma"; tab Visão geral só com dados (componentes por página, adaptações para código, débitos e melhorias mapeados, decisões; sem etapas nem pendências, que o Gustavo acompanha direto; cores dos tokens `Charts/*`) e sem a seção Preferências (fica só no doc) + uma tab por doc com seções reagrupadas. Página renomeada para "Castanha DS: Playground de handoff design <> Code" | 02/10 |
| D67 | **Ilustrações por categoria**: `assets/illustrations/<categoria>/<nome>.svg` + `catalog.json` (ordem, nome no Figma, node id, description, tamanho); o nome no código é `<categoria>/<nome>` (o Figma repete nomes entre categorias, C76) e `CDS.illustration()` aceita também só `<nome>`. Banner e Table usam os arquivos oficiais; o Banner ganhou instance swap agrupado | 02/10 |
| D68 | **Componente de branch do Figma** entra com o link da branch (`/branch/<key>/`) e a marca "branch" no inventário e no playground; quando mergear na main, trocar os links e conferir de novo. Primeiro caso: Accordion + Accordion Item (página Lists) | 02/10 |
| D69 | **A UI do playground usa o próprio DS** (`docs/PLANO-UI-DS.md`): componente do DS onde existir e token em todo valor visual, em 7 fases publicadas uma a uma. Escolha única → Filter Chips; categorias do menu → Accordion Item (Gustavo) | 02/10 |
| D70 | **Pacotes para carregar rápido**: `build-index.js` gera `dist/cds.css` e `dist/cds.js` (todos os componentes, playgrounds, docs e recursos concatenados na ordem de dependência, cada `.js` num `try/catch` com o nome do arquivo). O HTML passa de ~250 requisições para 14. Fonte continua sendo o arquivo de cada pasta; `dist/` é gerado e vai para o repo (o Pages não tem build) | 02/10 |
| D71 | **Doc do Balance Card + capa de componente**: primeira doc vinda do arquivo [CastanhaDS] Component use documentation (seção 6695:9618), nas 6 tabs, com exemplos vivos. A doc ganha `cover` (frame [Header]): o componente vivo numa moldura acima das tabs, em todas as tabs (teste). O kit passou a aceitar vários exemplos por caixa (`attrs` em lista), `values` nas props e o bloco `alert`. Gaps em C89–C92. Capa refeita como o modelo do Gustavo: fundo e forma do caju em hex do Figma (decorativo, C91), título Heading/Medium com Tag do status de publicação na lib do Figma (current/changed/unpublished, lido via MCP; campo `figmaStatus` no register) e descrição curta abaixo | 02/10 |
| D72 | **Status de publicação no Figma em todos os componentes**: Tag ao lado do título (Publicado · Publicado com alterações pendentes · Não publicado · building block · em branch), com Tooltip e data da leitura; no relatório, painel "Publicação na lib do Figma" na Visão geral. Dados em `scripts/figma-status.js`, lidos via MCP com `getPublishStatusAsync` (a página não acessa a API); atualizar pedindo nova leitura | 02/10 |
| D73 | **Docs da página Text fields** (Component use documentation · 4054:49): Password input, Text area, Select input (em `radio-select-input`), Text input, Quantity input, Accordion, Accordion Item (novas) e Code Input OTP, Credit Card Input (substituem as legadas de branch). Feitas em paralelo por subagentes com um briefing único e conferidas no navegador. Kit: capa com vários exemplos (`examples`), capa alta (`tall`) e capa de imagem (`image`, oculta até o PNG existir); exemplos com `_tag`, `_text` e `_children`; anatomia com lado `top`, `align: "start"` e `long`. Gaps C94–C103 | 02/10 |
| D74 | **Check de props Figma × código** nos 105 componentes (`docs/CHECK-PROPS.md`): 412 props com atributo, nenhum desvio de padrão nos booleans; corrigidos o padrão do .Lead item (File) e os dois booleans do Date Picker (C104). Motion das docs voltou ao padrão `/01` (card por transição + Motion Style; valores nos tokens) | 03/10 |
| D75 | **Caju Theme como mostruário** (referência: página Caju Benefícios do [Caju] Theme): tabs Cores, Tipografia (primitivos + 37 text styles), Bordas, Tamanhos, Elevação e opacidade, Motion (duração, delay, curvas e Motion Styles `/01`). Novo `scripts/tokens-kit.js` (bloco `tokens`): lê os nomes do `:root` e os valores ao vivo, atualiza ao trocar o tema; layout responsivo só com tokens (C105) | 05/10 |
| D76 | **Caju Theme animado e interativo**: toda amostra é um tile que copia `var(--token)` (Toast do DS) e reage ao hover/foco com Hover In/01; entrada em sequência; sem cards (Visão geral e Motion Styles viram listas). **Motion** reaproveita o explicador castanhads-motion refeito com o DS: palco com Main Button e Checkbox reais disparando os Motion Styles, cascata com Tags, laboratório de easing (Filter Chips + Slider) e referência que toca no tempo do token ("Tocar todas"). **[Caju] Icons e [Caju] Illustrations entram como tabs do Caju Theme** (rotas antigas redirecionam). Respeita `prefers-reduced-motion` (C106) | 05/10 |
| D77 | **Cores do Caju Theme redesenhadas** a partir de libs que priorizam o visual: escalas em rampas contínuas (Tailwind/Radix) com nome e valor dentro da cor e tinta automática por contraste (`Support/darker`/`lighter`, Material/Wise), tom em foco se expande no hover (Coolors), opacidades sobre o xadrez de transparência (Radix/Figma) e tokens semânticos mostrados em uso — Text como texto, Icons como ícone (Icon do DS), Border como contorno (Primer/Polaris). No mobile a rampa vira lista vertical | 05/10 |
| D78 | **Tipografia do Caju Theme redesenhada** no mesmo espírito: Text Input do DS troca o texto de todas as amostras (Google Fonts), famílias em destaque com "Aa" e alfabeto, pesos lado a lado numa faixa, escala de tamanhos em linhas (Tailwind/Material), altura de linha com linhas-guia, text styles agrupados por categoria com peso · tamanho · altura · família (HIG/Carbon); no mobile a amostra rola na linha com o fim esmaecido | 05/10 |
| D79 | **Bordas e Tamanhos do Caju Theme redesenhados**: Radius com laboratório (Slider do DS escolhe o token; a forma grande muda de raio com Selected In/01; clicar numa forma da faixa a leva para o laboratório) e formas com o raio nos 4 cantos (Radix/Material); Width com o contorno inteiro (Tailwind); Sizes em linhas com Filter Chips do DS para ver como Largura, Gap ou Padding (Tailwind spacing/Atlassian space) | 05/10 |
| D80 | **Elevação e Opacidade redesenhadas** (Material/Polaris/Radix): palco com card que sobe de nível (Filter Chips do DS, Selected In/01) e sombra decomposta em x · y · blur · spread · cor; opacidade com laboratório (Slider do DS) sobre a comparação imagem | Accent sólido do Figma, e faixa clicável dos 7 níveis. **Menu:** "Caju Theme" vira **"Caju - Tema"**; **Animações** sai do menu (`#/animations` redireciona para Motion) e volta como tab do Caju - Tema quando a lib existir | 05/10 |
| D81 | **Motion do Caju - Tema redesenhado** (Material Motion, Carbon, easings.net, castanhads-motion): palco + painel do estilo atual com a cascata (sai a seção separada); laboratório central com o ponto andando sobre a curva no tempo real do token (cubic-bezier resolvido em JS), trilho, Filter Chips de curva e Sliders de duração e delay; curvas em cartões agrupados em Systemic × Expressive; duração e delay agrupados por família. Tudo que é referência (estilos, curvas, durações, delays) leva o valor ao laboratório e toca; sai o "Tocar todas" | 05/10 |
| D82 | **Ícones e Ilustrações do Caju - Tema redesenhados** (Phosphor/Material Symbols/Lucide · unDraw/Storyset): Search Input + Filter Chips de categoria (Deprecated vira categoria), cor (`Icons/*`, `Feedback/*`) e tamanho (16/24/32) aplicados ao vivo na grade, fundo para ilustrações (Surface/default, 01, Inversed), painel de detalhe fixo com prévia grande, palavras-chave em Tags e Main Buttons "Copiar nome"/"Copiar código". **Motion Styles em ação** não treme mais: linhas disparam só no clique/foco e o painel tem altura estável | 05/10 |
| D83 | **R0 · Manifesto de integração com o castanha-react** (branch `teste`): `scripts/integration/build-manifest.js` lê o clone local `../castanha` só por `git show` (staging + branch de Code Connect) e gera `integration/manifest.json` (componente do playground ↔ node do Figma ↔ export React, import, props com tipo/padrão/descrição, props do Figma e mapas de enum do Code Connect, Storybook, zeroheight, tags) e `integration/COBERTURA.md`. Casamento pelo node-id. Só metadados — nenhum código-fonte copiado. Resultado: 70 de 105 com par no React, 26 building blocks, 9 só no Figma, 12 só no React, 18 divergências de node-id story × Code Connect | 05/10 |
| D84 | **H0 Início (Castanha Hub) + H1 Motion** (branch `teste`, plano em `docs/PLANO-HUB.md`): página de entrada com o texto do zeroheight e atalhos em Cards do DS (bloco `shortcuts`, ilustrações da lib). Motion ganha os 3 pilares (Cards), o "quando usar" de cada curva e família de duração (Velocidade) nos cartões e 12 regras Do/Don't só texto (`dodont` sem exemplo). Textos literais do zeroheight; divergências em C107/C108 | 05/10 |
| D85 | **H2 · Conteúdo → Princípios de escrita** (branch `teste`): novo item do menu (`#/conteudo`) com o frame [Documentação] Princípios de escrita do `📁 [NEW] Content` (Figma 6400:33150): Mantenha o foco, Encoraje e explique, Escreva de forma simples, com textos literais, listas, Do/Don't com telas refeitas em componentes do DS e o Alert "Está na dúvida…". [OLD] Content fica de fora (legado). C109 | 05/10 |
| D86 | **R1 · "No React" abaixo do preview** (branch `teste`): seção com componente do castanha-react, import, links Storybook/zeroheight, etiquetas (Code Connect/story, só staging, tags do oficial), Alert com divergências do oficial, tabela Figma → React e props do React (tipo, padrão, descrição) para os 70 com par; building blocks e só-Figma dizem por quê. **JSX ao vivo** nos 10 mais usados (Button, Text Input, Tag, Checkbox, Radio, Switch, Tooltip, Modal, Drawer, Alert): `scripts/react-kit.js` lê os atributos do preview e aplica os mapas curados `integration/prop-map/<id>.json` (omite o que é padrão do React, inverte `show-*` → `hide*`, `error` texto → `error` + `supportingMessage`). Dados em `integration/react-data.js`, gerado pelo build do R0 | 05/10 |
| D87 | **Preview no hover do menu** (branch `teste`, inspirado nas navegações de Carbon, M3 e Wise): passar o mouse (250 ms) ou focar por teclado num componente do side menu abre um card à direita com o **playground real em miniatura** (Popover do DS em modo manual, `inert`, `aria-hidden`), nome, categoria/task e as notas que antes iam no Tooltip (Beta, branch do Figma; leitor de tela recebe por `aria-description`). Escala para caber sem ampliar, mínimo 50%; o que sobra (Table, Drawer, listas, grupos) corta ancorado no topo/início com fade. Monta ao abrir e desmonta ao fechar (nada fica no DOM). Fecha com Esc, clique, rolagem do menu ou troca de rota; desligado no menu em faixa (≤1100 px) e em toque | 05/10 |
| D88 | **H3 · Guia de ilustração** (branch `teste`): na tab Ilustrações do Caju - Tema, antes da Biblioteca (`#/caju-theme/ilustracoes`; o link `#/caju-theme/ilustracao` redireciona) com Princípios (zeroheight), Painel Semântico, Cores (paletas Tons base/Pele/Cabelo lidas do Figma, bloco `palette`, clique copia o hex), Formas, Linhas, Tamanhos (specimens 80/144/200/320 + tabela com Hero), Categorias (Cards), Acessibilidade (simulação ao vivo de 9 condições, bloco `simulate`), Aplicações (Cenários de uso e Employee com telas em Fixed Bar/Bottom Sheet/Main Button; Sponsor em tabela) e Do's & Don'ts (título + passos). Atalho Ilustração do Início aponta para a tab. C110/C111 | 05/10 |
| D89 | **R1 · mapas de Select Inputs, Tabs e Chips + Modal arredondado** (branch `teste`): JSX ao vivo também em Radio/Async/Async creatable/Checkbox/Multi Select Input (um só `SelectInput` no React: `mode="multi"`, `onSearch`, `creatable`), Fixed/Scrollable Tab (`Tabs` controlado, um `Tabs.Item` e um `Tabs.Panel` por aba do preview) e Filter/Input Chips + Chips Group (`wrap` no Multiple Rows). `react-kit.js` ganha `each` (um nó por filho do preview), `tpl` e `{@attr}` no `pre`; largura de linha 100 (Prettier do castanha). Divergências do oficial anotadas nos mapas: Checkbox Select vira chips como o Multi, Radio Select ganha busca. **Fix:** Modal com Header/Footer ficava de canto reto (fundo do .Header/.Footer pintava sobre o raio); no Figma é arredondado — Header/Footer herdam os cantos do painel | 05/10 |
| D90 | **C1 · Conteúdo → Vocabulário e Nomenclatura** (branch `teste`): Glossário Caju com busca (Search Input do DS, 57 termos por letra, "Não use" em Tag Negative), Naming (tabela de tipos, 8 passos numerados com critérios de desempate, prompt para IA com botão Copiar), Termos para evitar e Abreviação e siglas em tabelas transcritas das imagens do Figma. Blocos novos no kit: `glossary`, `steps`, `code`. C112 | 05/10 |
| D24 | Componentes `.X` publicados em página própria (ex.: `.Credit Card Flags`) contam como building block: seção recolhida, categoria = página do Figma | 01/10 |
| D91 | **C2 · Conteúdo → Formatação de dados** (branch `teste`): valores monetários, códigos e dados pessoais, datas e horários, quantidades e unidades, mascaramento e porcentagens/tarifas, com regras em listas, exemplos em `código` e aplicações em tabela. Tabelas de conteúdo quebram linha (`table.wrap`). Travessões e aspas curvas restaurados no Vocabulário. C113 | 05/10 |
| D92 | **C3a · Conteúdo → Escrevendo para produto + Regras universais** (branch `teste`): tab Escrevendo para produto (presente, voz verbal, infinitivo × imperativo, "você") e Regras universais no início de Formatação de dados (pontuação, maiúsculas, emojis, listas, negrito, o que não usamos). No Figma, Regras universais está num frame chamado "Escrevendo para produto" dentro da página Formatação de dados | 05/10 |
| D93 | **R2 · Check em três vértices (Figma × castanha-react × playground)** (branch `teste`): retrato das props do Figma em `integration/figma-props.tsv` (70 componentes, lido via MCP, só leitura); `scripts/integration/check-stack.js`, rodado pelo build do R0, cruza com as ligações do Code Connect (prop do Figma → prop do React, mapas de enum) e com os tipos do React (seguindo composições e unions) e valida os mapas curados. Níveis alta/média/informativo em `integration/SAUDE-STACK.md`, na nova tab **Stack React** do relatório e num bloco "Saúde Figma × React" no "No React" de cada componente. Primeira rodada: 2 altas (Code Connect do Topic gera props que o React não tem), 6 médias (padrões diferentes) e 27 informativos; corrigiu 2 erros dos próprios mapas (linha Placeholder, `aria-label` no IconButton). CONFERIR C120–C121; meus C112–C114 viraram C117–C119 (a sessão do Conteúdo usou C112–C113) | 05/10 |
| D94 | **Cabeçalho das páginas = Header do [CastanhaDS] Sponsor Templates** (4002:3849, CDS-985) como **template provisório** em `templates/sponsor-header/` (`<cds-sponsor-header>`, só componentes do DS), fora do menu e do smoke e **sem nenhuma menção na interface** (pedido do Gustavo): ← volta (ou Início) · Breadcrumb Componentes › Categoria › Nome · 🔍 foca a busca · 🔔 e ✕ ocultos · Title/Large = nome · (i) = descrição da capa · Tag = status no Figma · Drop Button "Links" (Jira, zeroheight num Popover) · Main Button "Abrir no Figma". Seletor de viewport desce para cima do frame; capa abaixo do Header; até 760 px o título ocupa a linha (o Header do Figma é só desktop). Quando o Header for documentado, vira componente e o template sai | 05/10 |
| D95 | **C3b · Conteúdo → Componentes** (branch `teste`): regras de texto de Tabs, Botões (26 labels padronizadas), Breadcrumb, Bottom sheet, Links, Feedback Pages (erros, alertas, sucesso, empty state) e Stepper, com Do's & Don'ts montados em componentes do DS. C114 | 05/10 |
| D96 | **C4a · Conteúdo → Contextos** (branch `teste`): onboarding de funcionalidades, tour guiado (com tabela de botões padronizados) e Urgências e bloqueios (régua em 5 níveis com Do's & Don'ts em componentes do DS). C115 | 05/10 |
| D97 | **C4b · Conteúdo → Canais** (branch `teste`): Push, In-app (limites, datas, quando usar e templates por tipo com notificações em Card do DS), E-mails transacionais (anatomia em 9 passos, checklist, aplicações, Sendgrid) e SMS (hierarquia de canais, limites GSM-7, checklist, métricas). Fecha o `[NEW] Content` no playground. C116 | 05/10 |
| D98 | **Regras de texto na doc de cada componente** (branch `teste`, pedido do Gustavo): as seções de Conteúdo → Componentes viraram a tab **Conteúdo** de Fixed Tab e Scrollable Tab (Tabs; a Scrollable lê a mesma doc), Main Button (Botões), Breadcrumb, Bottom Sheet, Link (Links) e Progress Tracker (Stepper). Feedback Pages não é componente do DS e ficou como tab própria em Conteúdo. Esses componentes não tinham doc: a tab Conteúdo é a primeira | 05/10 |
| D99 | **Um cabeçalho só** (Gustavo): a linha `.Heading` do Header do Sponsor Templates vira a **barra do topo** (← · Breadcrumb Castanha DS › Categoria › Nome · 🔍 · Relatório · Tema, todos Icon Button Default · Neutral · Small) e a `.Title Content` fica no topo da página (título · (i) · Tag · Links · Abrir no Figma). Sai o texto "Playground de handoff design <> Code"; barra sem divisor e menu/painel sem as linhas verticais (o contraste de fundo separa). Até 760 px: Breadcrumb só com a página atual e o resto no "…" (Truncate), e a 🔍 sai (a busca fica logo abaixo) | 05/10 |
| D100 | **R3 · Tokens alinhados ao castanha-tokens** (branch `teste`): `styles/tokens.css` ganha o alias `--castanha-*` (nome do pacote, sem o grupo Common/Specific) apontando para `--common-*`/`--specific-*`, seguindo o tema escuro e o `[data-viewport]` do frame; coleção Viewport completa lida do Figma (Grids + 10 `Specific/*` em px; booleans de modo ficam de fora); **faixas de viewport do pacote** (decisão do Gustavo): Mobile < 744 ≤ Tablet < 1366 ≤ Desktop, no CSS (min-width) e na largura livre do seletor. Caju - Tema copia `var(--castanha-…)` e avisa no Tooltip o que é só do playground; notas em Text styles, Elevação, Motion e Visão geral. Check de tokens no build do R0: 211 de 211 batem em nome e valor (light, dark, Mobile/Tablet/Desktop); `Carousel/gap` só no Figma (C122) | 05/10 |
| D101 | **Anterior / próximo** no fim de cada página (Playground e tabs de doc), como Carbon e M3: dois **Content List Item** do DS (Kind Card · Intent Navigation, `href`) — o anterior com Lead Item `back-line`, o próximo com o indicador de navegação; descrição "Anterior · ⌥←" / "Próximo · ⌥→". Ordem = a do menu (Início › componentes por categoria › building blocks › recursos), sem dar a volta nas pontas. Atalho do Storybook ⌥← / ⌥→ (Alt no Windows/Linux), ignorado dentro de campos de texto e no relatório. Até 760 px os cards empilham | 05/10 |
| D103 | **Docs · lote 1 Buttons** (branch `teste`, PLANO-DOCS §5): Main Button, Icon Button, Filter Button e Drop Button com as 6 tabs (Uso, Anatomia, Estilos, Acessibilidade, Diretrizes, Motion) — texto do zeroheight reaproveitado, props e padrões validados na lib estável, acessibilidade e contrastes medidos no playground, Motion no padrão `/01`. Bloco `props` ganhou `default` (coluna Padrão); os 4 botões aceitam `state="hovered\|pressed"` para os exemplos. `.md` para o zeroheight em `docs/zeroheight/` (template Juntos, 3 tabs). C117 | 05/10 |
| D104 | **R4 · Assets com os nomes do pacote** (branch `teste`): `scripts/integration/check-assets.js`, rodado pelo build do R0, cruza [Caju] Icons e [Caju] Illustrations com castanha-icons, castanha-illustrations e castanha-motion (ícones pelo nome; ilustrações pelo nome e, quando o pacote renomeou, pelo desenho dos paths com tolerância de 0,2 px). O detalhe de cada ícone/ilustração no Caju - Tema ganha **No React**: `<Icon name>`/`<Illustration name>` com o nome do pacote, o import eager (`MenuLine`, `HubPet`), situação (no pacote · nome diferente · desenho difere · fora do pacote) e o botão Copiar React; seção Assets no relatório Stack React. Resultado: ícones 262 de 265 com o mesmo nome; ilustrações 218 iguais + 40 renomeadas, 2 só no Figma, 1 só no pacote, 12 com desenho diferente; 44 animações do castanha-motion ainda sem tab. CONFERIR C123–C125 | 05/10 |
| D105 | **Smoke mais forte** (`tests/smoke.js`): três passadas — desktop claro (tamanho do Figma + **a11y básico**: botão/link/controle com nome acessível, campo com rótulo, ícone com `aria-hidden` ou `role=img`+label, `<img>` com alt), **tema escuro** e **mobile 360px** (mount sem erro). **Avisos** (não reprovam): contraste do texto abaixo do WCAG AA no claro e no escuro (desabilitado fica de fora) e componente mais largo que o frame mobile. 1ª rodada: 105/105, a11y limpo (833 elementos), 11 avisos → CONFERIR C126–C129. Título da aba: `✅ 105/105 · ⚠️ 11` | 05/10 |
| D106 | **R5 · "No React" no padrão do ComponentPage do Storybook** (branch `teste`): a seção abaixo do preview segue a ordem da doc oficial — título e Tags, descrição do Storybook (lida do `.mdx`), **Import**, **Código ao vivo**, **Props** abertas (tipo, padrão, descrição; no celular cada prop vira um bloco, por container query), Figma → React e Saúde recolhíveis e **Links úteis** (Storybook, zeroheight, Figma, Saúde da stack, padrões de teclado e nomes acessíveis). O menu Links do cabeçalho ganha o Storybook e o zeroheight do `.mdx` quando o playground não tem. Corrige o leitor do `.mdx` do R0 (aspas simples): descrições 16 → 69, zeroheight 11 → 31. Auditoria aceita px em `@container` (mesma limitação do `@media`, C83) | 05/10 |
| D107 | **Docs · lote 2 Content** (branch `teste`): Link, Currency, Confirmation Message e Topic com as 6 tabs (Link mantém a tab Conteúdo); Link e Currency com texto do zeroheight, Confirmation Message e Topic como rascunho a partir do Figma e do playground; Link aceita `state` para os exemplos; `.md` em `docs/zeroheight/`. C130 | 05/10 |
| D108 | **C126–C129 conferidos no Figma** com proposta só com tokens existentes: Banner/Content Banner no escuro → `Support/darker` (10,17:1); `Text/accent`/`Icons/Accent` ganham valor escuro = `Accent/Solid/semi-intense` escuro (8,28:1); contador e máscara → `Text/medium` (8,24:1 / 10,84:1); Table e Pagination sem versão estreita no Figma (decisão de DS). O código segue o Figma até a correção lá. Smoke: largura no mobile não conta quando o componente mostra a Viewport Restriction (Modal Date Picker era falso positivo) → 10 avisos | 05/10 |
| D109 | **Docs · lote 3 Containers** (branch `teste`): Card, Fixed Bar, Drawer, Modal e Popover com as 6 tabs (texto do zeroheight, props da lib, overlays em modo `inline` nos exemplos, Modal com as variações Default/Confirmation/Dialog) e `.md` em `docs/zeroheight/`. C131 | 05/10 |
| D110 | **R6 · Leitura diária da integração com o castanha-react** (branch `teste`): `scripts/integration/daily.js` faz `git fetch` no clone do castanha (só refs remotas), regera manifesto/check e compara `integration/stack-check.json` (novo, sem data) com a versão commitada: commits lidos, cobertura, componentes só no React, tokens, assets e cada item do check (🆕 novo · ✅ resolvido). Com mudança, escreve a entrada do dia em `integration/HISTORICO.md` (vira a seção Histórico da tab Stack React); sem mudança, descarta os arquivos regerados. `scripts/integration/figma-props.js` gera o script read-only do use_figma em 2 lotes e valida o TSV das props do Figma. A rotina diária (09h, seg–sex) virou **Castanha DS · Figma e castanha-react**: Parte 1 status de publicação, Parte 2 integração (props do Figma às segundas), tudo num worktree temporário da `main` para não mexer na pasta onde as sessões trabalham | 05/10 |
| D111 | **Docs · lote 4 Backdrop e Bottom Sheet** (branch `teste`): as 6 tabs nos dois (Bottom Sheet mantém a tab Conteúdo), com padrões de composição (Confirmation Message e Selection List no Slot) e Backdrop mostrado sobre conteúdo e com um Modal em foco; capas de Backdrop, Drawer, Modal e Bottom Sheet com exemplo real (`cover.wide`); `.md` em `docs/zeroheight/`. C132 | 05/10 |
| D112 | **Busca pelo teclado** (como Storybook e MUI): `/` ou ⌘K / Ctrl+K foca a busca do menu (placeholder mostra o atalho); ↓ entra nos resultados com **foco real nos links** (o preview do hover acompanha, e o card segue a rolagem do menu quando o foco é do teclado); ↑/↓ percorrem, Home/End vão às pontas, ↑ no primeiro volta à busca, Esc volta à busca, digitar na lista volta à busca; Enter na busca abre o 1º resultado (`cds-search` do Search Input). Buscando, o Início fica fora dos resultados | 05/10 |
| D113 | **Docs · lote 5 Status** (branch `teste`): Badge, Tag, Status Dot, Progress Line e Spinner com as 6 tabs, contrastes medidos (Tag 7,62–16,96:1; Badge; Status Dot) e `.md` em `docs/zeroheight/` (Status Dot como página nova, a partir da description do set). C133 | 05/10 |
| D114 | **Link do estado**: os controles do painel (Variants, Booleans, Texts, sliders, selects e instance swaps) se registram no kit (`CDS.kit.state`) com a chave do rótulo ("Text Label" → `text-label`); cada mudança grava na URL só o que difere do padrão (`#/tag?appearance=warning&text-label=Oi`, com `history.replaceState`, sem poluir o Voltar). Abrir o link (ou recarregar) remonta e reaplica os valores na ordem dos controles. Só o painel principal grava: preview do menu e smoke montam com outro painel. Trocar de tab não perde o estado. **Copiar link** no Header (Icon Button Default · Neutral · Medium + Tooltip "Link copiado"), com plano B por evento `copy` quando o navegador não dá permissão de clipboard. Conferido: abrir os 105 sem gravar nada; ida e volta em Badge, Main Button, Checkbox, Banner, Footer, Image e CSAT Item | 05/10 |
| D115 | **Capa do Text Input sem 404**: `cover.image` apontava para `assets/docs/covers/text-input.png`, que nunca foi exportado (C95); o `image` saiu e a capa usa o componente vivo com o `base`. O export do [Header] (5308:2902) existe no MCP (`download_assets`), mas o download segue bloqueado no sandbox. C95 | 05/10 |
| D116 | **Docs · lote 6 Selection controls** (branch `teste`): Checkbox, Radio Button e Switch com as 6 tabs, `state="hovered\|pressed"` nos três para os exemplos, grupos (`.pg-doc-sc-group`, hierarquia pai-filho do Checkbox), contrastes medidos (borda do Unselected 2,78:1 em análise) e `.md` em `docs/zeroheight/`. C134 | 05/10 |
| D117 | **Capas do Password Input e do Text Area sem 404**: mesmo caso do D115 — `cover.image` apontava para PNGs nunca exportados (C95); o `image` saiu e as duas capas usam o componente vivo com o `base`. Nenhuma doc referencia mais `assets/docs/covers/`. C95 | 05/10 |
| D118 | **Desempenho medido e orçamento no build** (05/10, site publicado): primeira visita ~400 KB gzip em 38 requisições, página pronta em ~0,85 s (rede), ~32 ms de JS; recarga com cache 0,09 s (o `?v=` funciona). Sem problema hoje; o que cresce são as docs (36 de 105 = 66 KB gzip; todas ≈ +125 KB). `build-index.js` agora imprime o peso da primeira visita e o `dist/cds.js` por tipo (componentes, playgrounds, docs, recursos) e avisa acima de **600 KB gzip** (`BUDGET_STRICT=1` faz falhar). Próximo passo planejado no backlog: docs sob demanda | 05/10 |
| D119 | **Smoke automático, sem abrir o navegador**: `scripts/dev/smoke.js` serve o repo num servidor do próprio Node, abre `tests/smoke.html` no Chrome headless pelo DevTools Protocol (WebSocket nativo do Node 22+, sem dependências), lê o JSON `#smoke-result` que o `tests/smoke.js` passou a escrever e imprime o resumo; código 1 se algum componente falhar, 2 se não der para rodar (sem Chrome ou sandbox sem porta). `node scripts/build-index.js --smoke` builda e roda em ~2 s; `--avisos` lista os avisos. Conferido: 105/105 com 10 avisos, e uma falha forçada (Badge 16 ≠ 99) deu código 1 | 05/10 |

## 5. Dúvidas abertas

Só perguntas de escopo ou de fonte. Divergências entre o Figma e o esperado ficam em **[`docs/CONFERIR.md`](CONFERIR.md)** (o código segue o Figma, D40).

| # | Dúvida | Proposta |
|---|---|---|
| Q7 | **TypeScript**: introduzir um build (ex.: esbuild) em algum momento? | Adiar até a lib passar de ~20 componentes |
| Q9 | ~~Caju Card: de onde vêm as artes?~~ Dos vetores do próprio componente (exportados por variante, D65) | ✅ 02/10 |
| Q31 | **Animações:** qual é a lib (link do Figma)? A página está reservada como "a definir" | **Deixar para o final** (Gustavo, 02/10): entra depois do Lote 9 |

## 5.1 Débito de export (Gustavo)

Assets que o MCP não exporta bem ou que sairiam caros por esta sessão. Ícones e ilustrações já foram importados; faltam as bandeiras. Exportar do Figma como SVG, com o nome do componente, e rodar `node scripts/build-assets.js`.

| Asset | Origem | Destino | Hoje no repo |
|---|---|---|---|
| ~~Ícones (274)~~ ✅ | `[Caju] Icons` · página `UI & Caju` | `assets/icons/<categoria>/` + `catalog.json` | **274 importados em 01/10** (12 buckets, incluindo `deprecated`), com palavras-chave da description. Reimportar: ver ARCHITECTURE §8 |
| ~~Ilustrações (237 + Hero + Cartões)~~ ✅ | `[Caju] Illustrations` · páginas `Caju UI` e `Hero` | `assets/illustrations/<categoria>/` + `catalog.json` | **260 importadas em 02/10** (237 da Caju UI + 23 do Hero, 19 categorias), do export SVG do Gustavo. Cartões = componente Caju Card (D65). Reimportar: ver ARCHITECTURE §8 |
| Bandeiras Elo, Mastercard e Visa | `.Credit Card Flags` (`4934:771`) | `assets/flags/<kind>.svg` | 3, reconstruídas de `vectorPaths` (o Elo com coordenadas arredondadas); o MCP falha com "no visible layers". Substituir pelos SVGs oficiais, sem mudar código |

## 5.2 Débitos de design (Gustavo)

Ajustes que o Gustavo vai fazer no Figma; quando entrarem, o código acompanha (a coluna "Quando corrigir" do CONFERIR diz onde).

| Item | O que fazer no Figma | No código depois |
|---|---|---|
| C57 · Date Input | Remover o Character Counter (hoje ligado com "-0000") | Desligar o padrão em `date-input.js` (`updateCounter`) |

## 6. Preferências do Gustavo (observadas)

- Português, tom direto. Mostrar antes de gravar em Jira, Notion, Slack ou Figma.
- Fidelidade ao Figma acima de tudo: tokens `Common/*`, nada hardcoded.
- Simples como está: sem framework e sem build por enquanto.
- Publicar no GitHub Pages ao fim de cada entrega e devolver a URL.
- Pontos em aberto marcados 🟡, separados do que está pronto.

## 7. Aprendizados

| Data | Aprendizado |
|---|---|
| 30/09 | `curl` para `figma.com` é bloqueado nesta sessão; os ícones saem por `exportAsync({format:'SVG_STRING'})` via `use_figma` |
| 30/09 | GitHub Pages leva ~1 min por build e faz cache; conferir com `?v=N` (resolvido em 02/10 pelo `?v=hash` automático, D47) |
| 30/09 | O Figma muda o motion por transição (não é um 150ms uniforme); ler `reactions` sempre |
| 01/10 | Safari falha em `-webkit-mask: var(...)` shorthand → longhand com URL literal |
| 01/10 | Destaque de seleção aparece sobre caractere mascarado → `::selection` transparente |
| 01/10 | Preview em `file://` não carrega CSS/JS separados; testar com `python3 -m http.server` (fora do sandbox, por causa da porta local) |
| 01/10 | Handoffs `.md` às vezes divergem do Figma (máximo de células, token do caret, Character Counter): sempre conferir na fonte |
| 01/10 | Annotations decidem coisas que as props não mostram (ex.: Disabled × Active é artefato; Lead Icon não detecta bandeira) |
| 01/10 | A lib tem 34 text styles, incluindo a família **Decorative em Work Sans**; o Label usa line-height 100% (não 150%) |
| 01/10 | Motion Styles completos: além de Hover In/Pressed/Selected In existem **Hover Out (150ms + delay 56ms), Released (50ms), Selected Out (200ms) e Disabled (150ms)** — usar a partir do Lote 1 |
| 01/10 | Exportar 274 ícones por MCP sairia caro (cada SVG passa pelo contexto); a exportação em massa do Figma + `build-assets.js` é o caminho |
| 01/10 | Extrator compacto (árvore da 1ª variante + diff das outras) lê sets de 36 variantes sem estourar contexto — reusar nos próximos lotes |
| 01/10 | **Override de cor em nested instance:** o `[appearance]` do filho vence o seletor do pai; o pai precisa de `pai > filho[appearance]` (achado no Tag) |
| 01/10 | Divider tem annotations de implementação (SVG para Dashed, tokens diferentes por construção, `role=separator` opcional) — annotations também trazem decisão de código, não só de design |
| 01/10 | Spinner: as 4 "Spinner Position" com AFTER_TIMEOUT ≈ 0 e Smart Animate 200ms ease-out = rotação contínua em passos de 90° |
| 01/10 | `exportAsync` falha em vetores sem fill no nó (cores nas regiões da vector network): reconstruir via `vectorPaths` + `vectorNetwork.regions[].fills` |
| 01/10 | Selection Controls: o Figma desenha o *Selector* (pílula 48×48) separado da caixa de 24, então o hover pinta a área de toque inteira, não só a caixa |
| 01/10 | Input Chips: o alvo de remoção é o chip inteiro (40px), não o ícone de 16px, por causa do WCAG 2.5.8 |
| 01/10 | Montar a doc com o componente real expôs um bug: o Label do Credit Card em Warning não ficava laranja (`Feedback/Warning/semi-intense` no Figma). Doc viva também é teste visual |
| 01/10 | O mesmo bug do Label em Warning existia no Code Input OTP (`Feedback/Warning/semi-intense` no set 24060:7228): a família de inputs precisa de um teste de cor por Appearance |
| 01/10 | Link usa motion próprio (150ms com a curva *accelerate* `.7,0,.8,1` no hover), diferente do Hover In dos inputs |
| 02/10 | Com o painel do navegador oculto, `requestAnimationFrame` não roda e o evento `close` do `<dialog>` atrasa: estado de componente não pode esperar por eles |
| 02/10 | Description do Figma decide comportamento que as props não mostram: padrão Dialog do Modal (sem Close Button, não fecha fora), 320→512 do Modal, "Mobile only" do Bottom Sheet |
| 02/10 | `setAttribute` com o mesmo valor também dispara `attributeChangedCallback`: o pai repassando atributos ao filho na ordem errada fez o filho re-renderizar com o status velho (um radio remarcava e o navegador desmarcava o outro do grupo). Daí o `CDS.attr` |
| 02/10 | Em aba oculta, além de rAF e do `close` do dialog, o `setTimeout` é estrangulado e `blur()` não dispara `focusout`: fechar lista por foco usa `focusout` + `relatedTarget` |
| 02/10 | Prefixo de classe colidiu: o Breadcrumb usava `.cds-bc`, que já era do Balance Card (o `<nav>` herdou o padding do card). Conferir prefixos novos com `grep` antes de criar |
| 02/10 | Conteúdo de um `<cds-popover>` precisa entrar antes de ele conectar: no connect ele move os filhos para o Slot; depois, o que se acrescenta fica fora do Slot |
| 02/10 | Componente que gera amostra quando conecta sem filhos (o `.Week`) precisa ser preenchido antes de entrar no DOM; senão a amostra se soma aos filhos reais |

---
| 02/10 | **GitHub Pages roda Jekyll e descarta pastas que começam com `_`** (`assets/icons/_glyphs` dava 404 só no Pages; local funcionava). `.nojekyll` na raiz desliga isso. Conferência pós-deploy agora inclui um HEAD em todos os arquivos versionados |
| 02/10 | O relatório depende do formato dos docs: tabelas com o ID na 1ª coluna (C/D/Q ou data), status com ✅/⏳/🧪 e seções `## N. Título`. Mudar o formato pede ajustar `scripts/report.js` |
| 02/10 | **`curl` é bloqueado pela política da Caju**, não pelo sandbox: `~/.claude/remote-settings.json` tem `deny: Bash(curl *)` e `allowManagedPermissionRulesOnly` (regra local não libera). As URLs do `download_assets` do MCP do Figma não servem aqui; asset grande vem do export do Figma feito pelo Gustavo |
| 02/10 | O export SVG do Figma vira subpasta quando o nome tem `/` e numera repetidos (`-1`, `-2`) na ordem do documento; o 1º traço do SVG basta para saber qual arquivo é qual nó. Conferir visualmente: as três `moeda-verde-pilha-2` pareciam iguais pelo 1º traço e eram cores diferentes |
| 02/10 | Primeira escrita no Figma (C79), com aprovação explícita e só na branch: trocar um trecho exato da description e conferir que o resto ficou igual. Regra continua: sem aprovação, Figma é só leitura |
| 02/10 | Lentidão era o **primeiro carregamento**: ~250 arquivos separados e o navegador falando HTTP/1.1 com o Pages (6 conexões por vez). Trocar de componente já era instantâneo (3–21 ms). Concatenar resolveu sem precisar de build no navegador |
| 02/10 | A armadilha "filho depois de conectar" vale para listas com amostra (Scrollable Tab, Accordion): se o container conecta vazio, desenha a amostra do Figma. Montar os filhos antes de `appendChild` no documento |
| 02/10 | Usar o próprio DS na casca revelou três contratos implícitos: (1) classe de layout de quem usa não pode trocar o `display` do componente (Chips Group e Alert quebraram); (2) componente com Slot/amostra precisa receber os filhos antes de conectar; (3) componente com largura/cor de specimen precisa aceitar variável para uso real |
| 02/10 | Tooltip (`position:fixed`) nunca dentro de elemento com `transform`: o ancestral transformado vira referência do fixed e o Tooltip some da tela (aconteceu nos marcadores da Anatomia). Montar no bloco acima (`kit.tip(..., { container })`). E teste de hover por script deixa Tooltip aberto (não há saída do mouse): conferir com mouse real |

## 8. Status

| Lote | Status |
|---|---|
| — | ✅ Code Input OTP · ✅ Credit Card Input (branches) |
| 0 | ✅ 01/10 — 250 tokens `Common/*` (89 com dark) + 34 text styles + 3 elevations + Motion Styles gerados por `scripts/build-tokens.js` · pipeline `scripts/build-assets.js` (ícones como máscara + manifest) · side menu por página do Figma + seção Building blocks · Work Sans carregada |
| 1a | ✅ 01/10 — Icon · Shaped Icon · Tag · Badge · Status Dot · Divider · Spinner · Progress Line |
| 1b | ✅ 01/10 — Image · Avatar · Caju Brand · .Credit Card Flags · Link · Currency · .Text Content · .Currency Content · .Currency Symbol |
| 2 | ✅ 01/10 — Icon Button (componente; OTP e Credit Card passam a consumi-lo) · Main Button · Drop Button · Filter button · .Icons |
| 3 | ✅ 01/10 — Checkbox · Radio Button · Switch (+ os 3 Groups) · Input Chips · Filter Chips · Chips Group, todos sobre a base `CDS.SelectionControl` / `.cds-chip` |
| — | 🧪 01/10 — Experimento: documentação em tabs no Credit Card Input (Uso · Anatomia · Estilos · Acessibilidade · Diretrizes · Motion) e no Code Input OTP (Acessibilidade montada das annotations + handoff, D32) |
| — | ✅ 01/10 — 274 ícones do [Caju] Icons em 12 buckets + instance swap agrupado por categoria · biblioteca em Recursos de suporte (accordion por categoria, D36) |
| 4 | ✅ 01/10 — Text Input · Search · Text Area · Password · [Beta] Quantity sobre `CDS.TextField` · Credit Card realinhado (subclasse) · OTP com Label/mensagem da família |
| 5 | ✅ 02/10 — Toast · Alert · System Banner · Confirmation Message · Topic · Tooltip · Banner · Balance Card + .Close Toast · .Close Alert · .Lead item · .Content Banner · ilustração `sino` |
| 6 | ✅ 02/10 — Viewport Restriction · Card · Backdrop (Banner Image consome) · Popover (Drop Button abre, D41) · Modal · Drawer · Bottom Sheet · [Beta] Fixed Bar + .Header · .Footer · `CDS.position` · `CDS.Overlay` |
| 6b | ✅ 02/10 — Async · Async creatable · Radio · Checkbox · Multi Select Input sobre `CDS.SelectField` (TextField + Popover, padrão combobox) · antecipados do Lote 8: Selection List Item · Content List Item · .Trailing Item · .Lead Item (Lists) sobre `CDS.ListItem` (D50) |
| 7 | ✅ 02/10 — Breadcrumb · Fixed Tab · Scrollable Tab · Tab View · Nav Control · Pagination + .Item (Breadcrumb) · .Item (Tabs) · .Item Nav Control · .Select Number (base `CDS.TabList`) |
| 8 | ✅ 02/10 — Content List · Selection List (os itens entraram com os Selects, D50; o .Transaction Status Icon saiu do Figma, C55) |
| 9a | ✅ 02/10 — Date Picker · Modal Date Picker · Date Input + .Day · .Week · .Navigation Control (Datepicker) |
| 9b | ✅ 02/10 — Table (+ .Head · .Data Cell · .Toolbar) · Upload Item · Dropzone · Upload List (+ .Lead item File) · ilustração `empty-state` |
| 9c | ✅ 02/10 — Slider (Single/Range) · NPS Score (+ .Value Item) · CSAT Score (+ .CSAT Item) · Progress Tracker (+ Item) |
| 9d | ✅ 02/10 — Caju Card (5 Kinds × Vertical/Horizontal × Frente/Verso × Is Blocked; 12 artes do Figma, dados como texto) |
| — | ✅ 02/10 — Accordion + Accordion Item (página Lists, **branch** do Figma, D68): botão com `aria-expanded` + região, altura animada, Kind Default/Card, `exclusive` opcional |
| — | ✅ 02/10 — **UI do playground no DS** (D69, 7 fases + ajustes): casca só com componentes do DS e tokens; auditoria `scripts/dev/audit-ui.js`; gaps C83–C88 |
| — | ⏳ Recurso Animações (Q31) — no final |
