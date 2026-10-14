# Chips — Small Size · Handoff dev

> Adição do tamanho **Small** aos chips **Input** e **Filter** da lib estável do Castanha DS.
> Escopo desta entrega: **apenas a nova property `Size`**. Não altera cor, estados ou anatomia horizontal.
>
> **Task:** CDS-1599 · **Épico:** CDS-1586 (Release 26) · **Label:** `design`
> **Branch Figma:** `epatuUj3qrA77Ecbbhy2vw` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Nodes:** Input Chips `12365:2728` · Filter Chips `12365:2744`
> **Status:** ✅ Validado via Figma MCP — sem pendências

---

## 1. O que mudou nesta task

- Nova property **`Size`** (`Medium` · `Small`) em **Chip Input** e **Chip Filter**. Default `Medium`.
- **`Medium` = o tamanho que já existia (40px).** As variantes atuais foram renomeadas para `Size=Medium`.
- **`Small` muda somente a altura: 40 → 32px.** Todas as outras métricas (padding, gap, tipografia, ícones, raio, borda) são **herdadas do Medium, sem alteração**.
- **Fora do escopo:** Chip groups (o container Single Rows assume chip de 40px — ajuste tratado em card próprio) e qualquer mudança de cor/estado.

---

## 2. Property `Size`

| Prop | Valores | Default | Controla |
|---|---|---|---|
| `Size` | `Medium` · `Small` | `Medium` | Altura do chip (40 ↔ 32). Nenhuma outra métrica. |

### Matriz de variantes

| Componente | Variantes | Composição |
|---|---|---|
| **Chip Input** | **8** | `State` (4) × `Size` (2) |
| **Chip Filter** | **16** | `State` (4) × `Size` (2) × `Is Selected` (2) |

Cobertura do `Small` é completa — existe para todos os estados (e, no Filter, para ambos os valores de `Is Selected`).

---

## 3. Medium → Small (métricas)

| Métrica | Medium | Small | Token | Muda? |
|---|---|---|---|---|
| **Altura** | 40 | **32** | `Common/Sizes/40` → `Common/Sizes/32` | ✅ **só isto** |
| Padding horizontal | 16 | 16 | `Common/Sizes/16` | — |
| Padding vertical | 0 | 0 | `Common/Sizes/0` | — |
| Gap interno | 4 | 4 | `Common/Sizes/4` | — |
| Raio | pílula | pílula | `Common/Border/Radius/pill` | — |
| Borda | 1px | 1px | `Common/Border/Width/hairline` | — |
| Tipografia | Label/Regular 16px | Label/Regular 16px | `Text Style/Label/Regular` | — |
| Ícones (lead / close / check) | 16×16 | 16×16 | — | — |

> Em código, o `Small` é o `Medium` com **override de uma única dimensão** (altura). Não há segundo conjunto de paddings, type ou ícones.

---

## 4. Tokens de altura (semânticos, por componente)

Cada componente tem o seu token de altura por tamanho — simetria mantida entre Medium e Small.

| Componente | Size | Token de altura | Resolve em |
|---|---|---|---|
| Input | Medium | `Specific/Selection Controls/Input Chips/Medium/height` | `Common/Sizes/40` |
| Input | Small | `Specific/Selection Controls/Input Chips/Small/height` | `Common/Sizes/32` |
| Filter | Medium | `Specific/Selection Controls/Filter Chips/Medium/height` | `Common/Sizes/40` |
| Filter | Small | `Specific/Selection Controls/Filter Chips/Small/height` | `Common/Sizes/32` |

**Zero valor hardcoded. Nenhum primitivo novo criado** — o Small reusa `Common/Sizes/32`, que já existia.

---

## 5. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **2.5.8 Target Size** | ✅ O alvo de toque é o chip inteiro. Small = **32px ≥ 24px** mínimo. |
| **1.4.3 / 1.4.11 Contraste** | ✅ Não revalidado — o Small **reusa os mesmos tokens de cor do Medium**, já validados AA/AAA no CDS-966. |
| **Foco** | ✅ Padrão de foco global do sistema (não é variant). |

Só revalidar contraste se peso/cor do texto mudar — o que **não** acontece nesta task.

---

## 6. Checklist dev

- [ ] Property `Size` (`Medium` default · `Small`) em Chip Input e Chip Filter
- [ ] `Small` sobrescreve **apenas a altura** (40 → 32); demais métricas herdadas do Medium
- [ ] Altura via token por componente (`…/Input Chips/Small/height`, `…/Filter Chips/Small/height` → `Common/Sizes/32`)
- [ ] Nenhum token hardcoded; nenhum primitivo novo
- [ ] Estados: `Enabled`, `Hovered`, `Pressed`, `Disabled`
- [ ] Target size do chip ≥ 24px preservado
- [ ] Chip groups **não** faz parte desta entrega

---

## 7. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/epatuUj3qrA77Ecbbhy2vw/-CastanhaDS--Components?node-id=12328-10100
- **Nodes:** Input Chips `12365:2728` · Filter Chips `12365:2744`
- **Jira:** CDS-1599 (Chips Small Size) · CDS-1586 (Release 26 · Design System)
- **Base da família:** CDS-966 (Chip Input, Chip Filter, Chip groups) — tamanho único 40px, agora `Size=Medium`

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP.*
