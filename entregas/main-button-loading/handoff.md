# Main Button — Loading · Handoff técnico (dev)

> Handoff de implementação do estado **Loading** do **Main Button** da biblioteca estável do Castanha DS. Melhoria sobre o componente existente — não é componente novo.
>
> **Task:** CDS-1603 · **Épico:** CDS-1600 (Release 25) · **Protocolo:** castanhads-juntos (IA-assistido)
> **Branch Figma:** `pIX8i38mYWwax98yIjPmJw` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Node:** `4464:427` (component set Main Button) · **Pacote:** `@caju-beneficios/castanha-react`
> **Status:** Design fechado — pronto para dev. ⚠️ A prop `loading` ainda **não existe** no pacote publicado (ver §10).
> **Referência implementada (09/10):** playground do Castanha DS — [Main Button › Anatomia](#/main-button/anatomia) (seção "Entrega para dev · CDS-1603"), [Estilos › Is Loading](#/main-button/estilos) e Playground com o controle Is Loading.

---

## 1. Visão geral

O **Loading** é o estado de carregamento do Main Button: enquanto uma ação assíncrona acontece, o label dá lugar a um **spinner centralizado** e o botão fica indisponível.

É um **controle próprio** do botão (`loading: boolean`), ortogonal aos estados de interação — não é um valor do enum de estado. No Figma vive como a variante **`Is Loading`** (False/True), presente em `State=Enabled`.

| | |
|---|---|
| Natureza | Estado/controle do Main Button (não componente separado) |
| Prop (código) | `loading: boolean`, default `false` *(a adicionar)* |
| Variante (Figma) | `Is Loading` (False/True), em `State=Enabled` |
| Matriz no Figma | 60 variantes: 48 com `Is Loading=False` e **12 com `Is Loading=True`** (Kind 2 × Appearance 3 × Size 2, todas em `State=Enabled`) |
| Composição | Reutiliza o componente **Spinner** (`4333:3181`) |

---

## 2. Anatomia

```
Repouso (Enabled):                 Loading:
┌───────────────────────────┐      ┌───────────────────────────┐
│  [Lead]  Label  [Trail]    │      │            ◠               │   altura: 48 (Medium) / 40 (Small)
└───────────────────────────┘      └───────────────────────────┘
   largura = conteúdo / fill           ↑ spinner centralizado
                                          label oculto
```

| Elemento | Valor |
|---|---|
| Altura | 48px (Medium) · 40px (Small) |
| Padding horizontal | 20px |
| Spinner | centralizado (align center/center) |
| Label | oculto no loading (reserva espaço em uso hug — ver §5) |

> **No Figma**, as variantes com `Is Loading=True` não têm o label e ficam em hug: **64 × 48** (Medium) e **56 × 40** (Small). Isso é a representação do componente. No código, a largura de repouso é preservada (§5), como a própria annotation do set pede.

---

## 3. Props

### Nova prop

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `loading` | `boolean` | `false` | Ativa o carregamento: oculta o label e exibe o spinner; desliga a interação. |

### Interação com as props existentes (Storybook)

| Prop | Valores | Relação com `loading` |
|---|---|---|
| `appearance` | `accent` · `inverted` · `neutral` | Define a cor do spinner (§4) |
| `kind` | `default` · `ghost` | `ghost` → spinner na cor da aparência (§4) |
| `size` | `medium` · `small` | Define o tamanho do spinner (§4) |
| `disabled` | `boolean` | Independente de `loading` |

> As demais props do Button (`as`, `leadIcon`, `trailingIcon`, `href`, `target`, `rel`, `type`, `onClick`, `onBlur`, `onFocus`) permanecem; no loading, o conteúdo visual é substituído pelo spinner.

---

## 4. Mapeamento do Spinner

O loading compõe o componente **Spinner** derivando `size` e `appearance` do botão.

### Por tamanho

| `size` do botão | Spinner |
|---|---|
| `medium` | 24px (`Size=Medium`) |
| `small` | 16px (`Size=Small`) |

### Por aparência (cor com contraste garantido)

| Botão | Spinner (Appearance) | Racional |
|---|---|---|
| `default` / `accent` | Inversed (claro) | fundo accent escuro |
| `default` / `neutral` | Neutral | fundo claro |
| `default` / `inverted` | Neutral | fundo claro |
| `ghost` / `accent` | Accent | fundo transparente |
| `ghost` / `neutral` | Neutral | fundo transparente |
| `ghost` / `inverted` | Inversed | fundo transparente |

> ✅ **Conferido nas 12 instâncias da branch (09/10):** a tabela acima bate com o Spinner de cada variante.
> ⚠️ **A annotation do set diverge:** ela resume como "Accent → Inversed, Ghost → Accent, Neutral/Inversed → Neutral". Nas instâncias, Ghost Neutral usa **Neutral** e Ghost Inversed usa **Inversed**. **Vale esta tabela** (instâncias). Corrigir o texto da annotation no Figma (CONFERIR C186).

### Revisão de cor por appearance (09/10) — ⚠️ inconsistência no Spinner

O fundo do botão no Loading é igual ao do Enabled nas 12 variantes (ok). A inconsistência está no Spinner, que muda de lógica conforme a appearance:

| Botão | Fundo | Label (Enabled) | Arco do Spinner | Anel (track) | Arco × fundo | Anel × fundo | Arco × anel |
|---|---|---|---|---|---|---|---|
| Default · Accent | `Accent/Solid/medium` #e80537 | `Support/lighter` #fcfcfc | `Icons/inversed` #fcfcfc | `Surface/inversed` a 16% | 4,54 | 1,28 | 5,83 |
| Default · Neutral | `Surface/01` #f0f0f0 | `Text/intense` #1a1a1a | `Icons/medium` #4d4d4d | `Surface/02` #999999 | 7,42 | **2,50** | **2,97** |
| Default · Inversed | `Neutral/Solid/soft` #fcfcfc | `Text/intense` #1a1a1a | `Icons/medium` #4d4d4d | `Surface/02` #999999 | 8,24 | **2,78** | **2,97** |
| Ghost · Accent | transparente (sobre #fcfcfc) | `Text/accent` #e80537 | `Icons/Accent` #e80537 | `Accent/Solid/soft` #fef0f1 | 4,54 | 1,08 | 4,20 |
| Ghost · Neutral | transparente (sobre #fcfcfc) | `Text/intense` #1a1a1a | `Icons/medium` #4d4d4d | `Surface/02` #999999 | 8,24 | **2,78** | **2,97** |
| Ghost · Inversed | transparente (sobre #e80537) | `Support/lighter` #fcfcfc | `Icons/inversed` #fcfcfc | `Surface/inversed` a 16% | 4,54 | 1,28 | 5,83 |

- **Anel sem regra única:** no Neutral, o anel é cinza opaco e quase tão forte quanto o arco (2,97:1 entre os dois), então o Spinner aparece como um círculo cinza completo. No Accent o anel quase some (1,08:1), e no Inversed ele é translúcido (1,28:1).
- **Arco fora da cor do conteúdo no Neutral:** no Accent e no Inversed, o arco usa a cor do label. No Neutral, usa `Icons/medium` (#4d4d4d), mais claro que o label `Text/intense` (#1a1a1a).
- **Proposta para o time decidir:** uma regra só, com o arco na cor do label de cada appearance e o anel com a mesma lógica nas três (ex.: cor do conteúdo a 16%, `Common/Opacity/semi-transparent`, como já é no Inversed). Decidir se a mudança é no Spinner (afeta todos os usos) ou só no Loading do Main Button. CONFERIR C187.
- Todos os arcos passam de 3:1 contra o fundo (WCAG 1.4.11). O ajuste é de consistência visual, não de acessibilidade.

---

## 5. Comportamento

- **Spinner substitui o label**, centralizado. A interação fica desligada enquanto `loading=true`.
- **Largura:** o botão mantém a largura de repouso.
  - Em uso **`fill`/container** (padrão recomendado), a largura vem do container e o loading **não encolhe** — sem salto de layout.
  - Em uso **hug/auto** (largura de conteúdo), **preservar a largura no código** (ex.: `visibility: hidden` no label + spinner em overlay centralizado), para não encolher.
- **Delay opcional (code-side):** um pequeno atraso antes de exibir o spinner evita flicker em respostas rápidas. Opcional, segue referência de mercado (Spectrum `pending`, Ant `delay`).
- A **animação do spinner** é indeterminada e vive no componente Spinner (code-side).

### Referência implementada (playground, 09/10)

Implementação de referência em web component, validada no navegador nas 8 combinações de Kind × Appearance × Size:

| Item | Como ficou | Resultado |
|---|---|---|
| Largura | conteúdo (ícones e label) com `visibility: hidden`; Spinner `position: absolute; inset: 0; margin: auto` | largura igual antes e durante o loading (ex.: 219 → 219) |
| Centro | Spinner no centro exato do botão | ✅ nas 8 combinações |
| Interação | botão com `aria-disabled="true"` (não `disabled`) + clique bloqueado (`preventDefault` e `stopPropagation`) + `pointer-events: none` no host | sem clique, sem envio de formulário, sem hover/pressed |
| Foco | o botão continua focável e mantém o foco | ✅ |

```css
/* trecho do playground (components/main-button/main-button.css) */
cds-main-button[loading]{ pointer-events:none; }
cds-main-button[loading] > .cds-btn{ position:relative; }
cds-main-button[loading] > .cds-btn > :not(.cds-btn__spinner){ visibility:hidden; }
cds-main-button[loading] > .cds-btn > .cds-btn__spinner{ position:absolute; inset:0; margin:auto; }
```

---

## 6. Tokens

Todas as cores do estado são **vinculadas a variáveis** (tokens semânticos) — **zero hardcoded** (confirmado em subtree walk; nomes não resolvem na sessão por serem de lib remota, mas os bindings existem). O container mantém os tokens do seu estado base; o Spinner carrega os próprios tokens por `appearance`.

| Elemento | Token |
|---|---|
| Altura | `Common/Sizes/48` (Medium) · `Common/Sizes/40` (Small) — sem mudança |
| Padding horizontal | `Common/Sizes/20` — sem mudança |
| Spinner | tokens do próprio Spinner por `Appearance` (track e arco) |

---

## 7. Acessibilidade (WCAG 2.2)

### Nome acessível (4.1.2 / regra `button-name`)
Com o label oculto, **o nome acessível precisa vir do código**: definir `aria-label` (ex.: "Carregando"). `visibility: hidden` remove o label da árvore de acessibilidade, então ele **não** serve de nome.

### Estado de ocupado
`aria-busy="true"` durante o loading. Botão não-interativo (evitar disparos de clique; manter o foco).

> **Como manter o foco:** usar `aria-disabled="true"` e bloquear o clique no código, em vez do atributo `disabled` nativo. O `disabled` tira o botão da tabulação e faz o foco se perder no meio da ação.
> **Spinner dentro do botão:** marcar o Spinner com `aria-hidden="true"`. O Spinner sozinho tem `role="status"` e nome "Carregando"; dentro do botão, isso faria o leitor de tela anunciar duas vezes.

### Contraste do indicador do spinner (1.4.11 — non-text ≥ 3:1)

| Aparência | Superfície | Ratio (indicador) | AA |
|---|---|---|---|
| `accent` | fundo accent | 4.54:1 | ✅ |
| `neutral` | surface/01 | 7.42:1 | ✅ |
| `inverted` | surface/default | 8.24:1 | ✅ |

> O **anel de fundo** (track) do spinner é **decorativo** (isento). No `ghost`, o contraste depende da superfície da aplicação — validar conforme o contrato de contraste vigente.

### Target Size (2.5.8)
✅ O alvo é o botão inteiro (48/40px), acima do mínimo de 24×24px.

### Foco e reduced-motion
Tratados na **arquitetura/código** (padrão de foco global; `prefers-reduced-motion`). Não são estados de componente nem entram em annotation.

---

## 8. Composição

| Building Block | Origem | Uso |
|---|---|---|
| `Spinner` | Component set `4333:3181` | Derivar `Appearance` + `Size` (§4), posição centralizada |

---

## 9. Mapeamento Figma ↔ código

| Figma | Código (castanha-react) | Playground (referência) | Nota |
|---|---|---|---|
| Variante `Is Loading` (True/False) | `loading: boolean` | atributo `loading` | Controle booleano, ortogonal ao estado |
| — | (nome acessível) | atributo `loading-label` (padrão "Carregando") | Texto do `aria-label` no loading |
| Appearance `Inversed` | `appearance: 'inverted'` | `appearance="inversed"` | **Naming diverge** — código usa `inverted` |
| Appearance `Accent` / `Neutral` | `appearance: 'accent'` / `'neutral'` | `accent` / `neutral` | — |
| Kind `Default` / `Ghost` | `kind: 'default'` / `'ghost'` | `default` / `ghost` | — |
| Size `Medium` / `Small` | `size: 'medium'` / `'small'` | `medium` / `small` | — |

---

## 10. Checklist de entrega (dev)

- [ ] Adicionar a prop `loading?: boolean` (default `false`) ao `Button`
- [ ] No loading: ocultar o label e renderizar o `Spinner` centralizado
- [ ] Derivar `Spinner` size do `size` (medium→24px, small→16px)
- [ ] Derivar `Spinner` appearance do `kind`/`appearance` (§4 — tabela das instâncias, não a annotation)
- [ ] Preservar a largura em uso hug/auto (label `visibility: hidden` + spinner em overlay)
- [ ] `aria-busy="true"` no loading
- [ ] Nome acessível via `aria-label` (fallback "Carregando")
- [ ] Desligar a interação no loading mantendo o foco (`aria-disabled`, não `disabled`)
- [ ] `aria-hidden="true"` no Spinner dentro do botão
- [ ] (Opcional) delay antes de exibir o spinner (anti-flicker)
- [ ] Loading **não** se aplica ao Icon Button (decisão de a11y)
- [ ] Tipagem TypeScript sem `any`
- [ ] Stories: Loading (cada appearance), Loading Small, Loading Ghost, Loading em container fill
- [ ] Testes unitários (cobertura ≥ 80%)

---

## 11. Pontos de atenção

| Item | Natureza | Nota |
|---|---|---|
| Prop `loading` ainda não existe no pacote | Fidelidade doc↔código | Storybook expõe só `appearance`, `disabled`, `kind`, `size`. Design pronto, **dev pendente** |
| Naming `Inversed` (Figma) vs `inverted` (código) | Convenção | Seguir o código na doc/implementação |
| Largura: hug vs fill | Uso | Em fill, resolvido pelo container; em hug, preservar no código. No Figma as variantes com loading ficam em hug (64 × 48 · 56 × 40) |
| Track do spinner | A11y | Decorativo (isento de 3:1); indicador passa em todas as aparências |
| Loading no Icon Button | Escopo | Fora — decisão de a11y (alvo pequeno) |
| **Annotation × instâncias (cor do Spinner)** | Fidelidade Figma | A annotation diz "Ghost → Accent, Neutral/Inversed → Neutral"; as instâncias usam Ghost Neutral → Neutral e Ghost Inversed → Inversed. Vale a tabela do §4. Corrigir a annotation (CONFERIR C186) |
| **zeroheight lista Loading como valor de State** | Fidelidade doc | Na lib ele é a variante `Is Loading`, ortogonal a State. Reconciliar a página Main button (CONFERIR C142) |
| Loading só em `State=Enabled` | Escopo | Não há combinação de Loading com Hovered, Pressed ou Disabled; no código, o loading desliga hover e pressed |
| **Cor do Spinner por appearance** | Consistência visual | Anel cinza opaco no Neutral × anel quase invisível no Accent × translúcido no Inversed. Arco no Neutral mais claro que o label. Ver a revisão no §4 (CONFERIR C187). Definir antes de publicar |
| **Status de publicação** | Alinhamento | O Main Button da main está publicado, mas a versão da branch (com o Loading) é diferente. Até a publicação, **não sinalizar como "Publicado no Figma"**: no portal a página mostra a Tag **"Melhoria em branch"** (status `branch-update`), com o Loading e a branch no Tooltip |

---

## 12. Referências

- **Jira:** CDS-1603 · Épico CDS-1600 (Release 25)
- **Figma:** Main Button `4464:427` · Spinner `4333:3181` (branch `pIX8i38mYWwax98yIjPmJw`)
- **Storybook:** castanha-web.caju.com.br — Components / Button
- **zeroheight:** Main button (reconciliar seção Loading — ver `main-button-loading-zeroheight.md`)
- **Pacote:** `@caju-beneficios/castanha-react`
- **Playground (referência implementada):** [Main Button](#/main-button) — D280 · CONFERIR C186 (annotation) e C142 (zeroheight)

---

## Histórico

| Data | Mudança |
|---|---|
| 08/10/2026 | Versão inicial (design fechado, pronto para dev) |
| 09/10/2026 | Revisão de cor por appearance (§4, §11): fundos consistentes com o Enabled, Spinner com lógicas diferentes de anel e de arco por appearance, contrastes medidos e proposta de regra única (C187). No portal, o Track do Spinner Inversed passou a ter os 16% do Figma |
| 09/10/2026 | Status de publicação (§11): a página do portal deixa de mostrar "Publicado no Figma" e passa a mostrar "Melhoria em branch" até a publicação do Loading |
| 09/10/2026 | Conferência na branch: matriz de 60 variantes (12 com loading), mapeamento do Spinner confirmado nas instâncias e divergência da annotation (§4, §11). Largura hug das variantes no Figma (§2). Referência implementada no playground, com o trecho de CSS e os resultados (§5). Foco por `aria-disabled` e Spinner com `aria-hidden` (§7, §10). Coluna do playground no mapeamento (§9). Tabela de tokens (§6) |

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos via Figma MCP, contraste calculado via script WCAG 2.2, API confirmada no Storybook. Atualizado em 09/10 com a conferência na branch e a referência implementada no playground. · Caju Benefícios · Out/2026*
