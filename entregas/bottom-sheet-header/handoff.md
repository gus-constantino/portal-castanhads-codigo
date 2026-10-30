# .Header (Modal e Bottom Sheet) — Hotfix da descrição · Handoff dev

> Inclusão de uma **descrição opcional** abaixo do título no `.Header`, o cabeçalho compartilhado do Modal e do Bottom Sheet da lib estável do Castanha DS.
> Escopo desta entrega: **a Text Description, a boolean que a controla e o alinhamento do botão de fechar**. Não altera cores, tipografia do título, Footer, Slot nem comportamento dos containers.
>
> **Task:** CDS-2104 · **Épico:** CDS-1688 (Release 27) · **Label:** `design` · **Tipo:** Bug (Hot Fix)
> **Branch Figma:** `PLk9bAY0lKJSTbINkFOpZI` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Nodes:** `.Header` `16362:3241` · Modal `16362:3267` · Bottom Sheet `20848:2679` (página Containers)
> **Status:** ✅ Validado via Figma MCP (castanha-qa de 30/10) — sem pendências

---

## 1. O que mudou nesta task

- **Text Description** (`Body/Regular Body`, `Common/Colors/Text/medium`) abaixo do título, no mesmo Text Container.
- **Boolean `Show Text Description`**, padrão `false`. Instâncias existentes não mudam: o Modal e o Bottom Sheet seguem com o header de 72 sem descrição.
- **Botão de fechar alinhado ao topo** do Content. Antes ficava centralizado, o que o deixava no meio de uma descrição longa.
- **Textos crescem em altura**, sem truncar. Antes, título e descrição ficavam em frames de 24 fixos.
- **Description e annotations** (Handoff e Accessibility) gravadas no `.Header`.
- **Por quê:** chamado do Castanha suporte de 29/10 ("O Bottom sheet da nova biblioteca não possui subtítulo") e alinhamento com a engenharia de Flutter em 30/10. Modal e Bottom Sheet seguem com a mesma base, o `.Header` (decisão da CDS-997, reafirmada em 30/10).
- **Fora do escopo:** a Drawer, que monta o próprio header e tem outra correção pendente.

---

## 2. Properties do `.Header`

| Prop | Tipo | Default | Controla |
|---|---|---|---|
| `Text Title` | Text | `Title` | Texto do título |
| `Show Text Title` | Boolean | `true` | Título |
| `Text Description` | Text | `Description` | Texto da descrição **(novo)** |
| `Show Text Description` | Boolean | `false` | Descrição **(novo)** |
| `Show Close Button` | Boolean | `true` | Botão de fechar |
| `Show Divider` | Boolean | `true` | Divider embaixo (Modal e Bottom Sheet usam `false`) |

No Modal e no Bottom Sheet, as duas props novas chegam pela instância do `.Header`. Em código, o caminho é o container repassar `description` (ou o nome que a stack já usa) ao header.

---

## 3. Anatomia

```
┌───────────────────────────────────────────────┐
│ Title (Body/Bold)                       [ ✕ ] │
│ Description (Body/Regular, opcional)          │
│ ...cresce em altura...                        │
├───────────────────────────────────────────────┤  Divider (opcional)
```

| Métrica | Valor | Token |
|---|---|---|
| Padding do Content | 12 · 20 | `Common/Sizes/12` · `Common/Grids/gutter` |
| Gap entre Text Container e botão | 8 | `Common/Sizes/8` |
| Padding superior do Text Container | 12 | `Common/Sizes/12` |
| Gap entre título e descrição | 0 | `Common/Sizes/0` |
| Botão de fechar (Icon Button Ghost Neutral Medium) | 48×48 | `Common/Sizes/48` |
| Altura do Content só com título | 72 | — (resultado do padding + botão) |
| Altura do Content com 3 linhas de descrição | 132 | — |

- O Content alinha os filhos ao **topo**. O padding de 12 no Text Container deixa o centro do título a 36 do topo, igual ao centro do X.
- Com o título oculto, a descrição ocupa a linha do título.
- Título e descrição quebram linha e crescem para baixo. Não truncar.

---

## 4. Tokens

| Elemento | Propriedade | Token | Valor |
|---|---|---|---|
| `.Header` | fundo | `Common/Colors/Surface/default` | `#fcfcfc` |
| Title | texto | `Common/Colors/Text/intense` · `Body/Bold Body` | `#1a1a1a` · 16/24 |
| Description | texto | `Common/Colors/Text/medium` · `Body/Regular Body` | `#4d4d4d` · 16/24 |
| Divider | fundo | `Common/Colors/Neutral/Solid/semi-soft` | `#e3e3e3` |

Zero valor hardcoded. Nenhum token novo criado.

---

## 5. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| 1.4.3 Contraste | ✅ Título 16,96:1 e descrição 8,24:1 sobre `Surface/default` (AAA) |
| 2.5.8 Target Size | ✅ Botão de fechar 48×48 |
| Foco | ✅ Padrão de foco global do sistema (não é variant) |

Para a implementação:

- O título é o nome acessível do diálogo. Web: `aria-labelledby`. Flutter: rótulo semântico da rota.
- A descrição, quando visível, é a descrição acessível do diálogo. Web: `aria-describedby`. Flutter: incluir na semântica da rota.
- O botão de fechar tem nome próprio: Fechar.

---

## 6. Checklist dev

- [ ] Prop de descrição no header, desligada por padrão
- [ ] Descrição em `Body/Regular Body`, `Common/Colors/Text/medium`, logo abaixo do título, sem gap
- [ ] Título e descrição quebram linha, sem truncar
- [ ] Botão de fechar alinhado ao topo, com o centro na altura do centro do título
- [ ] Com o título oculto, a descrição sobe para a linha do título
- [ ] Modal e Bottom Sheet repassam a descrição ao header
- [ ] Descrição ligada ao diálogo por `aria-describedby` (web) ou na semântica da rota (Flutter)
- [ ] Sem descrição, o header continua igual ao publicado (72 de altura)

---

## 7. Referências

- Branch Figma: [Figma · branch](https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PLk9bAY0lKJSTbINkFOpZI/-CastanhaDS--Components?node-id=16362-3241)
- Nodes: `.Header` `16362:3241` · Modal `16362:3267` · Bottom Sheet `20848:2679`
- Annotations: Handoff e Accessibility no `.Header`
- Jira: CDS-2104 ([Design] Hotfix: Bottom Sheet) · CDS-1688 (Release 27 · Design System) · CDS-997 (Estabilização da bottom sheet) · CDS-1241 ([Flutter] Bottom sheet)
- Flutter hoje: `CastanhaBottomSheet` usa o `CastanhaModalHeader` (`internal/building_blocks/modal`). O Flutter ainda não tem Modal.

Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP.
