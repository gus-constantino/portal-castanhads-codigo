# Content List Item · Arrastar para reordenar · Handoff técnico

> Capacidade **Draggable** do **Content List Item** na lib estável do Castanha DS. Fluxo IA-assistido (`castanhads-juntos`), formato Select Input / família Chips.
>
> **Task:** CDS-1592 · **Épico:** CDS-1586 (Release 26)
> **Branch Figma:** `bHFCiEbEkTYCXNipG4iqN0` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Set:** `5488:675` (Content List Item, 25 variantes) · **Alça:** frame `Drag Handle` dentro do Container de cada variante (sem building block)
> **Lido ao vivo no branch:** 13/10/2026, depois do 3º ajuste do estado Dragged e da remoção do building block da alça
> **Referência implementada:** portal Castanha DS, `cds-content-list-item` + `cds-content-list reorderable`

---

## 1. Visão geral

Arrastar para reordenar é uma **capacidade da família Lists**, não um componente separado. O Content List Item ganhou:

- a boolean **`Show Drag Handle`**, que mostra a alça `Drag Handle` à esquerda;
- o valor **`Dragged`** em `State`, para o item levantado durante o arraste.

**Decisão de arquitetura (09/10):** nada de "Draggable List Item". A alça é um slot do item, como em React Aria/Spectrum, Atlassian, Carbon e Ant. Só Flutter (`ReorderableListView`) e Base Web têm componente separado. Assim não se duplicam anatomia e tokens.

**O espaço de destino não é componente.** É comportamento da lista em runtime: a lista abre o espaço no índice sob o cursor. O `.Drop Space` foi descontinuado.

---

## 2. Props

### Variant properties

| Prop | Valores | Default |
|---|---|---|
| `Kind` | `Default` · `Card` | `Default` |
| `Intent` | `Default` · `Navigation` · `Transaction` | `Default` |
| `State` | `Enabled` · `Hovered` · `Pressed` · `Disabled` · **`Dragged`** | `Enabled` |

`Dragged` é novo. Transaction só existe em `Kind=Default`, então são 5 variantes Dragged (20 → 25).

### Boolean properties

| Prop | Default | Controla |
|---|---|---|
| `Show Lead Item` | `true` | Lead Item à esquerda |
| `Show Trailing Item` | `true` | Trailing Item à direita |
| `Show Divider` | `true` | Divider inferior (Kind=Default) |
| `Show Navigation Indicator` | `true` | Chevron (Navigation e Transaction) |
| `Show Tag` | `true` | Tag (Navigation) |
| **`Show Drag Handle`** | **`false`** | alça `Drag Handle` à esquerda, antes do Lead Item |

`Show Drag Handle` começa desligado: nenhuma instância existente passa a mostrar a alça. Ligar é opt-in da lista reordenável.

---

## 3. Anatomia

```
Show Drag Handle = true
┌──────────────────────────────────────────────┐
│ ⣿  [Lead]  Label / Description    [Trailing] │
└──────────────────────────────────────────────┘
  └ Drag Handle: frame mín. 24×24 com drag-line 20×20, primeiro filho do Container

State = Dragged
┌──────────────────────────────────────────────┐
▌ ⣿  [Lead]  Label / Description    [Trailing] │  + Elevation/level 1
└──────────────────────────────────────────────┘  borda Border/semi-soft
```

A estrutura do Dragged é a mesma do Enabled: Container, Divider e alturas iguais.

| Medida (branch) | Enabled | Dragged |
|---|---|---|
| Kind=Default · Intent=Default | 69 | 69 |
| Kind=Default · Navigation / Transaction | 62 | 62 |
| Kind=Card (todos os Intents) | 80 | 80 |
| `Drag Handle` | mín. 24×24, padding `Sizes/2` | igual |

---

## 4. Estado `Dragged` · tokens

Tudo semântico, nenhum valor solto.

| Propriedade | Kind=Default | Kind=Card |
|---|---|---|
| Fundo | `Common/Colors/Surface/default` | `Common/Colors/Surface/default` |
| Elevação | `Elevation/level 1` (x 0 · y 4 · blur 8 · spread 0) | `Elevation/level 1` |
| Cor da borda | `Common/Colors/Border/semi-soft` | `Common/Colors/Border/semi-soft` |
| Peso da borda | só à esquerda: `Border/Width/hairline` (1px) | `hairline` em cima, à direita e embaixo · `Border/Width/thick` (4px) à esquerda |
| Alinhamento | INSIDE, fora do layout (não muda a altura) | INSIDE, fora do layout |
| Raio | `Border/Radius/none` | `Border/Radius/large` (24) |
| Divider | visível (igual ao Enabled) | não tem (Card) |

**Implementação sugerida:** `box-shadow: inset` para a borda, que não altera o layout nem a altura. Exemplo no portal:

```css
/* Kind=Default */
box-shadow: inset 1px 0 0 0 var(--border-semi-soft), var(--elevation-level-1);
/* Kind=Card */
box-shadow: inset 0 0 0 1px var(--border-semi-soft), inset 4px 0 0 0 var(--border-semi-soft), var(--elevation-level-1);
```

**A cor da borda do Dragged não pode vir de uma variável que o Pressed sobrescreve.** No portal, segurar a alça acionava o `:active` da linha e o Card levantado ficava com a borda do Pressed (`Accent/Solid/medium`). A correção usa o token direto e não aplica Pressed quando o `:active` vem da alça.

---

## 5. Alça `Drag Handle`

**Não é building block.** É um frame do próprio Content List Item, com uma instância do ícone `drag-line` dentro. O `.Drag Handle` (`26029:1189`) foi removido do arquivo em 13/10.

| Propriedade | Token / valor |
|---|---|
| Tamanho | mín. 24×24 (`Common/Sizes/24`), alvo de toque |
| Padding | `Common/Sizes/2` nos 4 lados |
| Ícone | `drag-line` 20×20 ([Caju] Icons, key `6045b8f12acc83f0107933927e748e797b6a7fbe`) |
| Cor do ícone | `Common/Colors/Icons/intense` (#1a1a1a) |
| Visibilidade | `Show Drag Handle` (default `false`) |
| Cursor (web) | `grab`, e `grabbing` no Dragged |

No código, a alça também é um elemento interno do item, sem componente público próprio.

Posição: à esquerda, antes do Lead Item. No Selection List Item, se a capacidade chegar lá, a alça também vai à esquerda, porque o trailing é controle.

---

## 6. Comportamento

```
Enabled (Show Drag Handle=true)
  └→ pressionar a alça e arrastar → State=Dragged (item levantado)
       └→ mover → a lista abre o espaço no índice sob o cursor
            └→ soltar → nova ordem, o item volta ao estado anterior
```

- **Levantar e soltar** cabem no componente. **Reordenar** é da lista: só ela move os vizinhos.
- O espaçamento da lista não muda. O espaço aberto é o deslocamento dos vizinhos (altura do item + gap da lista).
- **Destino:** número de vizinhos com o centro acima do centro do item levantado.
- **Interação só pela alça.** Apertar a alça não aciona a ação da linha (link, botão ou controle) nem o Pressed dela. O resto da linha mantém o comportamento de hoje.
- **No Dragged, sem Hovered.** As variantes Dragged no Figma têm a reaction ON_HOVER → Hovered (cópia do Enabled). No código, o item levantado não muda no hover.
- **Vizinhos sem hover durante o arraste.** O cursor passa por eles, mas eles ficam em Enabled.
- **Evento de mudança** com origem e destino. No portal é `cds-reorder { from, to, item }`, índices a partir de 0. No React, sugestão: `onReorder(from, to)` na lista.
- **Motion do deslocamento:** o Figma ainda não define (On drag em teste). O portal usa `Duration/Short/04` + `Easing/Systemic/default` e desliga com `prefers-reduced-motion`. É escolha provisória: 🟡 confirmar com motion.

### Mapa por stack

| | React (castanha-react) | Flutter |
|---|---|---|
| Item | `showDragHandle?: boolean` (false) · estado `dragged` | alça como `ReorderableDragStartListener` |
| Lista | `reorderable` + `onReorder(from, to)` | `ReorderableListView` por baixo, com `proxyDecorator` aplicando o visual do Dragged |
| Público novo | nenhum componente | nenhum componente |

---

## 7. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **2.5.8 Target Size** | ✅ alça com mín. 24×24 |
| **2.5.7 Dragging Movements** | ⚠️ **obrigatório:** alternativa sem arrastar (teclado abaixo, ou ação Mover para cima / para baixo) |
| **1.4.11 Contraste não-texto** (ícone) | ✅ `Icons/intense` sobre `Surface/default` 16,96:1 · sobre `Surface/01` (Hovered) 15,27:1 |
| Borda do Dragged | decorativa (1,25:1). O estado não depende dela: elevação, posição e anúncio também comunicam |
| **4.1.2 Nome, função, valor** | ⚠️ alça = controle de reordenação, nome `Reordenar {label}` |
| **4.1.3 Mensagens de status** | ⚠️ anunciar a posição nova (`aria-live`), contando a partir de 1 |
| Foco | ✅ padrão global do Castanha DS (resolvido no código) |

**Teclado (implementado no portal, validado em 13/10):**

| Tecla, com foco na alça | Efeito | Anúncio |
|---|---|---|
| Espaço ou Enter | levanta o item | "Limites levantado, posição 3 de 4. Use as setas para mover." |
| ↑ / ↓ | move uma posição, o foco segue a alça | "Limites, posição 2 de 4" |
| Espaço ou Enter | solta | "Limites solto na posição 2 de 4" |
| Esc | cancela, o item volta à origem | "Cancelado. Limites voltou para a posição 3 de 4" |

A instrução de teclado vai na descrição acessível da alça (`aria-describedby`).

**Estrutura:** no portal, a alça é `role=button` dentro da linha. Quando a linha já é link ou botão, isso aninha controles. No React, de preferência, deixar a alça **fora** do elemento interativo da linha (irmã dele, no mesmo container visual).

---

## 8. Checklist técnico

- [x] `State=Dragged` com `Surface/default`, `Elevation/level 1` e borda `Border/semi-soft` por Kind
- [x] Divider e altura do Dragged iguais ao Enabled
- [x] Boolean `Show Drag Handle` (default `false`)
- [x] Alça como frame do próprio item (sem building block), com tokens de tamanho e padding
- [x] Tokens semânticos no Dragged e na alça (nenhum valor solto)
- [x] Alça com mín. 24×24 (2.5.8)
- [x] Referência implementada no portal, com smoke verde
- [ ] **Alternativa sem arrastar (2.5.7)** no castanha-react e no Flutter
- [ ] **Teclado + `aria-live`** de posição
- [ ] Alça fora do elemento interativo da linha (React)
- [ ] **Motion do On drag:** em teste no branch
- [ ] Revisão de design antes do merge

---

## 9. Pontos de atenção

| Item | Natureza | Status |
|---|---|---|
| Reaction ON_HOVER → Hovered nas variantes Dragged | Cópia do Enabled | 🟡 confirmar se remove; o código ignora |
| Motion do On drag e do deslocamento dos vizinhos | Motion | 🟡 em teste; portal provisório com Short/04 + Systemic/default |
| Hover/Pressed da família com curva única | Motion, fora do escopo da CDS-1592 | 🟡 Hover In `0.7,0,0.5,1` · Pressed 200 ms (tabela de Motion Styles) |
| Capacidade no Selection List Item | Escopo | ⚪ fora deste card; se chegar, alça à esquerda |
| Frames de estudo (`teste`, `Teste · On drag`) | Limpeza | ⚪ remover antes do merge |

---

## 10. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/bHFCiEbEkTYCXNipG4iqN0/-CastanhaDS--Components?node-id=5488-675
- **Variantes Dragged:** `26407:10643` (Default/Default) · `26407:10651` (Card/Default) · `26407:10658` (Default/Navigation) · `26407:10667` (Card/Navigation) · `26407:10675` (Default/Transaction)
- **Alça:** frame `Drag Handle` em cada variante (ex.: `26407:12086` no Default/Default/Dragged) · **Modelo de teste:** `26350:5339` (Levantado / Nova posição)
- **Jira:** CDS-1592 · CDS-1586 (Release 26)
- **Portal:** Content List Item › Uso (Lista reordenável), Anatomia (Entrega para dev · CDS-1592), Estilos (Show Drag Handle) · Content List › Playground (Reorderable)
- **Padrão de handoff:** Select Input (CDS-922) · família Chips (CDS-966)

---

*Gerado com o protocolo IA-assistido do Castanha AI (`castanhads-juntos`). Dados lidos ao vivo via Figma MCP no branch; contraste WCAG 2.2 calculado; comportamento validado no portal.*
