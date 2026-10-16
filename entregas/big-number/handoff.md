# Big Number · Handoff técnico

> Card que destaca um dado numérico relevante, como valor monetário ou percentual, em painéis e resumos de leitura rápida. Migração do `Big Number [web only]` da lib legado para a lib estável do Castanha DS.
>
> **Task:** CDS-1597 · **Épico:** CDS-1586 (Release 26) · **Diário:** Notion `3fb560483c028177928dc9192390c32d`
> **Branch Figma:** `KOmiQxHXqiErSbLmoG3sv6` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Set distribuído:** `Big Number` `27238:472` (8 variantes), página Content
> **Building block:** `.Variation Big Number` `27246:396` (5 variantes), seção `[Building Block] Big Number` `27283:12213` · não é distribuído sozinho
> **Consome:** Currency (`5301:2173`) · Icon Button (`4464:636`) · ícones `information-line`, `up-down-line` e `placeholder-line` ([Caju] Icons)
> **Lido ao vivo no branch:** 16/10/2026, versão final (o card cresce com o valor)
> **Status:** ✅ `castanha-qa` sem 🔴 · design pronto para deploy. Description e annotations de Handoff, Accessibility e Motion no set.
> **Referência viva:** portal do Castanha DS, `cds-big-number` e `cds-variation-big-number` (status em branch), com a entrega em `/entregas/big-number/`

---

## 1. Visão geral

- **O que é:** um card de leitura com o nome da métrica, o valor em destaque e, quando houver, a variação do valor.
- **Quando usar:** para destacar um dado numérico prioritário, como saldo, total ou percentual, em dashboards e resumos.
- **Quando não usar:**
  - vários dados sem hierarquia, para isso use List ou Table;
  - saldo de uma categoria que leva ao detalhe, para isso use o `Balance Card`;
  - informação complexa ou detalhada.
- **Substitui:** o `Big Number [web only]` da lib legado (`2. [Castanha DS] Core components`).
- **Escopo:** Web.

### O que mudou em relação ao legado

| Legado | Estável |
|---|---|
| `Type` Currency/Number | `Kind` Currency/Number |
| `Style` Neutral/Accent | `Appearance` Neutral/Accent |
| `Status` Default/Hover/Focus | `State` Enabled/Hovered. Focus é padrão global, não variant |
| Number + Accent não existia | Existe (8 variantes no total) |
| `TraillingIcon` · `ShowInformation Icon` | `Show Trailing Icon` · `Show Information` |
| Valor em texto solto (`Heading/Default/MD`) | Instância do **Currency** (Kind=Currency) ou texto com o mesmo text style (Kind=Number) |
| `.Variation index` com tokens do legado | `.Variation Big Number` com tokens da estável |
| Tokens `shape/*`, `Surface/Neutral/*`, `Text/Neutral/*` | Tokens `Common/*` |
| Hover com opacidade 0.6 no card inteiro | Hover troca o fundo (seção 5) |

---

## 2. Props

### Big Number (distribuído)

| Prop | Tipo | Valores | Default | Controla |
|---|---|---|---|---|
| `Kind` | Variant | `Currency` · `Number` | `Currency` | Valor monetário (Currency) ou número com unidade (Number) |
| `Appearance` | Variant | `Neutral` · `Accent` | `Neutral` | Cor do card |
| `State` | Variant | `Enabled` · `Hovered` | `Enabled` | Estado de hover |
| `Show Information` | Boolean | — | `true` | Information Button no topo |
| `Show Variation` | Boolean | — | `true` | Variação ao lado do valor |
| `Show Trailing Icon` | Boolean | — | `true` | Bloco de ícone à direita, na base |
| `Lead Icon` | Instance swap | ícone do [Caju] Icons | `placeholder-line` | Ícone do bloco do topo |
| `Trailing Icon` | Instance swap | ícone do [Caju] Icons | `placeholder-line` | Ícone do bloco da base |
| `Text Label` | Text | — | `Description` | Nome da métrica |
| `Text Value` | Text | — | `0,00` | Valor do Kind=Number |

- **`Text Value` age só no Kind=Number.** No Kind=Currency o valor vem do próprio Currency.
- **Instância exposta:** `Variation` (`.Variation Big Number`). Serve para trocar `Appearance`, `Text Label` e `Icon`.
- Matriz: `Kind` (2) × `Appearance` (2) × `State` (2) = 8 variantes.

### .Variation Big Number (building block)

| Prop | Tipo | Valores | Default | Controla |
|---|---|---|---|---|
| `Appearance` | Variant | `Positive` · `Warning` · `Negative` · `Informative` · `Inversed` | `Positive` | Cor do texto e do ícone |
| `Text Label` | Text | — | `+1%` | Texto da variação |
| `Icon` | Instance swap | ícone do [Caju] Icons | `up-down-line` | Ícone da variação |

- No Big Number, o Neutral usa `Positive` por padrão e o Accent usa `Inversed`. `Inversed` serve para o fundo Accent.

---

## 3. Anatomia

```
Big Number                      vertical · altura 180 · largura hug, mín. 272 · padding Sizes/24 · space-between · raio Border/Radius/large
├─ Header                       horizontal · fill · space-between · centro · gap Sizes/8
│  ├─ Lead Icon                 bloco 40 × 40 · raio Border/Radius/small · ícone 24 (Lead Icon)
│  └─ Information Button        Icon Button Ghost Small 40 × 40 · information-line              (opcional)
└─ Body                         horizontal · hug · alinhado na base · gap Sizes/8
   ├─ Content                   vertical · hug, mín. 168 · gap Sizes/4
   │  ├─ Label                  Text Label · Caption/Regular Caption
   │  └─ Value                  horizontal · centro · gap Sizes/8
   │     ├─ Currency            Currency Largest (Kind=Currency)
   │     │  ou Number           Value + Unit (%) · Title/Medium · gap Sizes/4 (Kind=Number)
   │     └─ Variation           .Variation Big Number                                         (opcional)
   └─ Trailing Icon             bloco 48 × 48 · raio Border/Radius/medium · ícone 24 (Trailing Icon)  (opcional)

.Variation Big Number           horizontal · hug · centro · gap Sizes/2
├─ Text Label                   Caption/Medium Caption
└─ Icon                         16 × 16 (up-down-line)
```

- **Header no topo e Body na base.** O espaço entre eles é o que sobra dos 180 de altura.
- **O card cresce com o valor.** A largura parte de 272 e aumenta com valor longo, sem quebrar a linha. O Trailing Icon acompanha, a `Sizes/8` do valor.
- **Ordem de leitura:** Label, valor e variação.

---

## 4. Medidas

| Métrica | Valor | Token |
|---|---|---|
| Card | altura 180 · largura pelo conteúdo, mínimo de 272 | mesmas medidas do legado |
| Content | mínimo de 168 (224 − 8 − 48) | derivada: com o Trailing Icon, o card nunca fica abaixo de 272 |
| Padding do card | 24 | `Common/Sizes/24` |
| Raio do card | 24 | `Common/Border/Radius/large` |
| Gap no Header e no Body | 8 | `Common/Sizes/8` |
| Gap entre Label e Value | 4 | `Common/Sizes/4` |
| Gap entre valor e variação | 8 | `Common/Sizes/8` |
| Gap entre número e unidade (Number) | 4 | `Common/Sizes/4` |
| Bloco do Lead Icon | 40 × 40 | `Common/Sizes/40` |
| Raio do Lead Icon | 12 | `Common/Border/Radius/small` |
| Bloco do Trailing Icon | 48 × 48 | `Common/Sizes/48` |
| Raio do Trailing Icon | 16 | `Common/Border/Radius/medium` |
| Ícone dos blocos | 24 × 24 | `Common/Sizes/24` |
| Information Button | 40 × 40, ícone 20 | Icon Button `Size=Small` |
| Gap na variação | 2 | `Common/Sizes/2` |
| Ícone da variação | 16 × 16 | `Common/Sizes/16` |

### Tipografia

| Elemento | Text style |
|---|---|
| Label | `Caption/Regular Caption` (14) |
| Valor (Currency e Number) | `Title/Medium` (24), vindo do Currency `Size=Largest` |
| Variação | `Caption/Medium Caption` (14) |

---

## 5. Tokens por estado

### Big Number

| Appearance | State | Fundo | Label | Valor | Lead Icon (bloco / ícone) | Trailing Icon (bloco / ícone) | Information Button | Variação |
|---|---|---|---|---|---|---|---|---|
| Neutral | Enabled | `Surface/01` | `Text/medium` | `Text/intense` | `Surface/default` / `Icons/intense` | `Surface/accent` / `Icons/inversed` | Ghost `Neutral` | `Positive` |
| Neutral | Hovered | `Neutral/Solid/semi-soft` | `Text/medium` | `Text/intense` | `Surface/default` / `Icons/intense` | `Surface/accent` / `Icons/inversed` | Ghost `Neutral` | `Positive` |
| Accent | Enabled | `Surface/accent` | `Text/inversed` | `Text/inversed` | `Surface/default` / `Icons/intense` | `Surface/default` / `Icons/intense` | Ghost `Inversed` | `Inversed` |
| Accent | Hovered | `Surface/accent` + overlay `Neutral/Opacity/Intense/semi-transparent` | `Text/inversed` | `Text/inversed` | `Surface/default` / `Icons/intense` | `Surface/default` / `Icons/intense` | Ghost `Inversed` | `Inversed` |

- **O Hovered muda só o fundo.** No Neutral o fundo vira sólido (`semi-soft`). No Accent entra um overlay de 16% sobre o accent. As duas lógicas são intencionais.
- **No Kind=Currency** o valor vem do Currency `Appearance=Neutral` (no Neutral) ou `Appearance=Inversed` (no Accent), `Size=Largest`. Não recriar o texto.
- O Information Button traz os próprios estados e tokens do Icon Button. Não recriar.

### .Variation Big Number

| Appearance | Texto e ícone |
|---|---|
| Positive | `Feedback/Positive/intense` |
| Warning | `Feedback/Warning/semi-intense` |
| Negative | `Feedback/Negative/semi-intense` |
| Informative | `Feedback/Informative/semi-intense` |
| Inversed | `Text/inversed` |

- **Positive usa `intense` e os outros `semi-intense`.** É decisão de design: o Positive em `semi-intense` não passava AA no Hovered.

**Zero valor solto.** Toda cor, padding, gap, raio, opacidade e tamanho de ícone está ligado a token. As únicas medidas sem token são a altura de 180 e os mínimos de 272 e 168, que repetem o legado.

---

## 6. Comportamento

- **O card é de leitura.** Tem `Enabled` e `Hovered`, sem `Pressed` e sem `Disabled`.
- **O único alvo de clique interno é o Information Button.** Os estados de hover, press e disabled dele vêm do Icon Button.
- **Hover:** o card troca o fundo como na seção 5. O conteúdo não muda.
- **Valor:** o texto da amostra (`Description`, `R$ 100,00`, `0,00 %`, `+1%`) é ilustração. O conteúdo real vem do uso.
- **Variação opcional.** Sem variação, o valor fica sozinho na linha.
- **Trailing Icon opcional.** Sem ele, o card fica em 272 com valor curto.
- **Valor longo:** o card cresce (R$ 12.480,90 → 301, R$ 1.250.480,90 → 335).

### Motion (Motion Styles, modo Normal)

| Interação | Propriedade | Motion Style | Timing · easing |
|---|---|---|---|
| Enabled → Hovered | fundo | `Hover In/01` | 150 ms · `cubic-bezier(0.7, 0, 0.5, 1)` |

- Os valores vêm dos tokens do Motion Style. Usar os tokens, não os números da tabela.
- A documentação de motion para devs (Notion) ainda não tem página do Big Number. Até sair, vale o `Hover In/01`.
- Respeitar `prefers-reduced-motion` com o modo `Reduced` dos Motion Styles.

### Figma × código
- **Amostra:** textos e ícones `placeholder-line` são ilustração.
- **No protótipo**, o hover usa *While hovering* com Smart Animate e os valores do `Hover In/01`. A volta ao Enabled é automática.

---

## 7. Mapa por stack

| Figma | Código (sugestão) |
|---|---|
| `Kind` | `kind` (`currency` · `number`) |
| `Appearance` | `appearance` (`neutral` padrão · `accent`) |
| `Text Label` | `label` |
| Currency (Kind=Currency) | `value` numérico, formatado pelo Currency |
| `Text Value` + `%` (Kind=Number) | `value` + `unit` |
| `Show Variation` + `Variation` | `variation` (`label`, `appearance`, `icon`) · ausente = sem variação |
| `Show Information` | `onInfo` ou `infoLabel` · ausente = sem botão |
| `Lead Icon` | `icon` |
| `Show Trailing Icon` + `Trailing Icon` | `trailingIcon` · ausente = sem bloco |
| `State=Hovered` | estado de interação, sem prop |

Os nomes da coluna de código são sugestão. O contrato final é do time de dev.

---

## 8. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **Ordem de leitura** | Label, valor e variação, na ordem do layout |
| **Variação** | O sentido vai em texto, não só na cor e no ícone. ex.: Aumento de 1% em relação ao período anterior |
| **Ícones decorativos** | Ícone da variação, Lead Icon e Trailing Icon com `aria-hidden` |
| **Information Button** | Nome acessível com a métrica. ex.: Mais informações sobre Saldo disponível |
| **Valor** | Exposto como texto (ex.: R$ 100,00). O leitor de tela faz a leitura, sem `aria-label` soletrado |
| **Blocos do Lead e do Trailing** | Decorativos. Vale o contraste do ícone dentro deles, não o do bloco com o fundo |
| **1.4.1 Não depender de cor** | ✅ A variação tem texto e ícone, além da cor |
| **2.5.8 Target Size** | ✅ Information Button 40 × 40 (mínimo 24) |
| **Foco visível** | Padrão de foco global do sistema. Não é variant |

### Contraste

| Par | Enabled | Hovered | Mínimo |
|---|---|---|---|
| Label `Text/medium` (Neutral) | 7.42 | 6.59 | 4.5 |
| Valor `Text/intense` (Neutral, 24) | 15.27 | 13.56 | 3 |
| Variação Positive `intense` | 8.30 | 7.37 | 4.5 |
| Variação Warning `semi-intense` | 5.77 | 5.12 | 4.5 |
| Variação Negative `semi-intense` | 8.55 | 7.59 | 4.5 |
| Variação Informative `semi-intense` | 7.15 | 6.35 | 4.5 |
| Texto, valor e variação `Text/inversed` (Accent) | 4.54 | 5.83 | 4.5 |
| Ícone de informação no Neutral | 15.27 | 13.56 | 3 |
| Ícone de informação no Accent | 4.54 | 5.83 | 3 |
| Bloco do Trailing Icon `Surface/accent` (Neutral) | 4.09 | 3.63 | 3 |
| Ícone dentro dos blocos (`Icons/intense` em `Surface/default` · `Icons/inversed` em `Surface/accent`) | 16.96 · 4.54 | — | 3 |

Fundos: `Surface/01` `#f0f0f0` · `Neutral/Solid/semi-soft` `#e3e3e3` · `Surface/accent` `#e80537` · Accent Hovered composto `#c70832`.

---

## 9. Checklist técnico

- [ ] `kind` e `appearance` cobrem as 4 combinações, incluindo Number + Accent
- [ ] Kind=Currency consome o Currency `Size=Largest`, sem recriar o texto
- [ ] Kind=Number usa `Title/Medium` com a mesma cor do Currency
- [ ] Altura de 180 e largura pelo conteúdo, a partir de 272, sem quebrar a linha do valor
- [ ] Hover troca o fundo: sólido no Neutral, overlay de 16% no Accent
- [ ] Sem Pressed e sem Disabled no card
- [ ] Information Button consumido do Icon Button Ghost Small, sem recriar estados
- [ ] Variação com texto que diz o sentido, ícones com `aria-hidden`
- [ ] Positive em `Feedback/Positive/intense`, os outros em `semi-intense`
- [ ] Todos os tokens semânticos, sem valor solto além de 180, 272 e 168
- [ ] Motion `Hover In/01` com modo `Reduced`
- [ ] Cross-platform validado (Figma ↔ React ↔ Flutter)

---

## 10. Pontos de atenção

### Em aberto no design (não bloqueia o dev)
- 🟡 **Trailing Icon e Lead Icon como bloco.** A função do Trailing Icon e o formato dos dois blocos ainda estão em análise. A estrutura atual repete o legado.
- 🟡 **Kind Number como texto.** A lib não tem componente de número irmão do Currency. O Number usa texto com o text style do Currency.
- 🟡 **Escopo Web.** Herdado do `[web only]` do legado. A confirmar se vale também para mobile.

### Do sistema (não bloqueiam)
- **Currency sem formatação de número.** O Currency formata só dinheiro. Percentual e número ficam com quem implementa, no padrão pt-BR (vírgula decimal).

---

## 11. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/KOmiQxHXqiErSbLmoG3sv6/-CastanhaDS--Components?node-id=27238-472
- **Sets:** Big Number `27238:472` · `.Variation Big Number` `27246:396` (seção `[Building Block] Big Number` `27283:12213`) · legado copiado na seção `LEGADO` `27233:1318`
- **Componentes consumidos:** Currency `5301:2173` · Icon Button `4464:636`
- **Ícones ([Caju] Icons):** `information-line` · `up-down-line` · `placeholder-line`
- **Legado:** `Big Number [web only]` (`2. [Castanha DS] Core components`, key `06d89b5e…`)
- **zeroheight (legado):** [Big Number (Web Only)](https://castanha.caju.com.br/858426090/v/latest/p/98e195)
- **Diário:** Notion `3fb560483c028177928dc9192390c32d`
- **Annotations:** Big Number com Handoff (8 itens), Accessibility (6 itens) e Motion
- **Jira:** CDS-1597 (Big Number) · CDS-1586 (Release 26 · Design System)

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP em 16/10/2026.*
