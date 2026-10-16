# FAB Menu · Handoff técnico

> Botão de ação flutuante que abre de 2 a 6 ações empilhadas acima dele. Componente novo da família **Buttons** na lib estável do Castanha DS.
>
> **Task:** CDS-1694 · **Épico:** CDS-1688 (Release 27) · **Diário:** Notion `3fa560483c0281719bfcf7227f7eb123`
> **Branch Figma:** `F1s1Tb3cDHYli4aN76QzCo` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Set distribuído:** `FAB Menu` `27075:22460` (2 variantes), página Buttons
> **Building block:** `.FAB Button` `27039:594` (24 variantes), seção `[Building Blocks] Buttons` · não é distribuído sozinho
> **Consome:** Main Button (`4464:427`) · ícones `plus-line` e `close-line` ([Caju] Icons)
> **Lido ao vivo no branch:** 16/10/2026
> **Status:** ✅ `castanha-qa` sem 🔴. Annotations de Handoff, Accessibility e Motion nos dois sets.

---

## 1. Visão geral

- **O que é:** um FAB (Floating Action Button) que abre um menu de ações empilhadas acima dele.
- **Quando usar:** quando a tela tem de 2 a 6 ações principais relacionadas e elas precisam ficar sempre ao alcance, flutuando sobre o conteúdo.
- **Quando não usar:**
  - mais de 6 ações (o menu não rola, use outro componente);
  - ação secundária ou destrutiva;
  - lista longa de opções, para isso use o `Drop Button`.
- **Distribuição:** só o `FAB Menu` vai para quem usa o DS. O `.FAB Button` é building block do menu.
- **Backdrop fora do componente.** Quando precisar destacar o menu, combine com o `Backdrop`, como no Modal e no Drawer.
- **Não substitui nada do legado.** Nenhuma lib do Castanha tinha FAB.

---

## 2. Props

### FAB Menu (distribuído)

| Prop | Tipo | Valores | Default | Controla |
|---|---|---|---|---|
| `Is Active` | Variant | `False` · `True` | `False` | Menu fechado (só o FAB) ou aberto (ações + FAB com ícone de fechar) |
| `Show Action 3` | Boolean | — | `true` | Terceira ação |
| `Show Action 4` | Boolean | — | `false` | Quarta ação |
| `Show Action 5` | Boolean | — | `false` | Quinta ação |
| `Show Action 6` | Boolean | — | `false` | Sexta ação |

- **As ações 1 e 2 são fixas.** O mínimo do menu é 2 ações.
- **Instâncias expostas:** `.FAB Button` e `Action 1` a `Action 6`. Servem para trocar `Icon`, `Text Label` e `Lead Icon`. O `Is Active` da `.FAB Button` acompanha o do FAB Menu, e as ações ficam em `Kind=Default`, `Appearance=Neutral` e `Size=Medium`.

### .FAB Button (building block)

| Prop | Tipo | Valores | Default | Controla |
|---|---|---|---|---|
| `Appearance` | Variant | `Accent` · `Neutral` · `Inversed` | `Accent` | Cor do fundo e do ícone |
| `State` | Variant | `Enabled` · `Hovered` · `Pressed` · `Disabled` | `Enabled` | Estado de interação |
| `Is Active` | Variant | `False` · `True` | `False` | Ícone: `Icon` (fechado) ou `close-line` (aberto) |
| `Icon` | Instance swap | ícone do [Caju] Icons | `plus-line` | Ícone do estado fechado. O de fechar é fixo |

Matriz: `Appearance` (3) × `State` (4) × `Is Active` (2) = 24 variantes.

---

## 3. Anatomia

```
FAB Menu                        vertical · gap Sizes/16 · padding Sizes/0 · alinhado à direita · hug
├─ Actions                      vertical · gap Sizes/12 · alinhado à direita · só com Is Active=True
│  ├─ Action 1                  Main Button Default Neutral Medium · Lead Icon + Text Label · Elevation/level 1
│  ├─ Action 2                  idem
│  ├─ Action 3                  idem (Show Action 3)                                        (opcional)
│  ├─ Action 4                  idem (Show Action 4)                                        (opcional)
│  ├─ Action 5                  idem (Show Action 5)                                        (opcional)
│  └─ Action 6                  idem (Show Action 6)                                        (opcional)
└─ .FAB Button                  56 × 56 · raio Border/Radius/large · padding Sizes/16 · ícone 24 · elevação por estado
   └─ Icon                      plus-line (Is Active=False) · close-line (Is Active=True)
```

- **Ordem visual:** Action 1 no topo, a última ação logo acima do FAB.
- **O menu cresce para cima** a partir do FAB, alinhado pela direita.
- **Sem rótulo no FAB.** O nome acessível vem por `aria-label` (seção 8).

---

## 4. Medidas

| Métrica | Valor | Token |
|---|---|---|
| FAB | 56 × 56 (fixo, mín. e máx.) | `Common/Sizes/56` |
| Raio do FAB | 24 | `Common/Border/Radius/large` |
| Padding do FAB | 16 | `Common/Sizes/16` |
| Ícone do FAB | 24 × 24 | `Common/Sizes/24` |
| Ação | altura 48, largura pelo conteúdo | Main Button `Size=Medium` (`Common/Sizes/48`) |
| Raio da ação | 16 | `Common/Border/Radius/medium` |
| Padding lateral da ação | 20 | `Common/Sizes/20` |
| Gap ícone e texto na ação | 8 | `Common/Sizes/8` |
| Gap entre ações | 12 | `Common/Sizes/12` |
| Gap entre ações e FAB | 16 | `Common/Sizes/16` |
| Altura com 3 ações (padrão) | 240 | derivada (3 × 48 + 2 × 12 + 16 + 56) |
| Altura com 6 ações | 420 | derivada (6 × 48 + 5 × 12 + 16 + 56) |
| Fechado | 56 × 56 | o FAB |

**Zero valor solto.** Todo tamanho, padding, gap, raio, opacidade e elevação está ligado a token.

---

## 5. Tokens por estado

### .FAB Button

| Appearance | Estado | Fundo | Ícone | Elevação |
|---|---|---|---|---|
| Accent | Enabled | `Accent/Solid/medium` | `Support/lighter` | `Elevation/level 2` |
| Accent | Hovered | `Accent/Solid/semi-intense` | `Support/lighter` | `Elevation/level 3` |
| Accent | Pressed | `Accent/Solid/medium` | `Support/lighter` | `Elevation/level 2` |
| Neutral | Enabled | `Surface/01` | `Icons/intense` | `Elevation/level 2` |
| Neutral | Hovered | `Neutral/Solid/semi-soft` | `Icons/intense` | `Elevation/level 3` |
| Neutral | Pressed | `Neutral/Solid/medium` | `Icons/intense` | `Elevation/level 2` |
| Inversed | Enabled | `Neutral/Solid/soft` | `Icons/intense` | `Elevation/level 2` |
| Inversed | Hovered | `Surface/inversed` | `Support/lighter` | `Elevation/level 3` |
| Inversed | Pressed | `Neutral/Solid/soft` | `Icons/intense` | `Elevation/level 2` |
| Todos | Disabled | fundo do Enabled | ícone do Enabled | sem elevação |

- **Disabled:** o FAB recebe `Common/Opacity/medium` (0.4).
- **Pressed sem cor nova no Accent e no Inversed.** É convenção da família Buttons: o feedback de toque é a escala (seção 6).
- **`Is Active` não muda cor.** Muda só o ícone.
- Os fills, os ícones e a opacidade vêm do Icon Button `Size=Medium`. A diferença é tamanho, raio, ícone e elevação.

### Elevação

| Estilo | Sombra |
|---|---|
| `Elevation/level 1` | Y 4 · blur 8 · `#000000` 8% |
| `Elevation/level 2` | Y 8 · blur 24 · `#000000` 16% |
| `Elevation/level 3` | Y 16 · blur 32 · `#000000` 16% |

Os três estilos estão ligados às variáveis `Common/Elevations/Level 1–3` (x, y, blur, spread e cor). Usar as variáveis, não os números.

### Ações

| Elemento | Componente e tokens |
|---|---|
| Ação | Main Button `Kind=Default`, `Appearance=Neutral`, `Size=Medium` · fundo `Surface/01` · `Elevation/level 1` |
| Texto | `Text/intense` · `Label/Medium Label` |
| Ícone | `Icons/intense` · 20 |

Os estados de hover, press e disabled das ações vêm do Main Button. Não recriar.

---

## 6. Comportamento

### Abrir e fechar
1. Toque no FAB fechado abre o menu (`Is Active=True`). O ícone troca de + para ×.
2. Toque no FAB aberto fecha o menu.
3. **Toque numa ação executa a ação e fecha o menu.**
4. Esc fecha o menu. Tab para fora do menu também fecha.
5. O menu não fecha sozinho por tempo.

### Posição
- **O FAB flutua sobre o conteúdo**, em posição fixa no canto inferior da tela. A margem até a borda é do layout de quem usa.
- **O menu abre para cima e alinhado pela direita.** O FAB não sai do lugar quando o menu abre ou fecha.
- **Respiro no fim da área com rolagem:** o último item do conteúdo precisa ficar acima do FAB.
- No Figma, a instância vem com constraints Right e Bottom pelo mesmo motivo.

### Quantidade de ações
- De 2 a 6. **O menu não rola.** Acima de 6 ações, use outro componente.

### Motion (Motion Styles, modo Normal)

| Interação | Propriedade | Motion Style | Timing · easing |
|---|---|---|---|
| Enabled → Hovered (FAB) | opacidade do hover | `Hover In/01` | 150 ms · `cubic-bezier(0.7, 0, 0.5, 1)` |
| Hovered → Enabled (FAB) | opacidade do hover | `Hover Out/01` | 150 ms · `cubic-bezier(0.7, 0, 0.5, 1)` · delay |
| Hovered → Pressed (FAB) | escala 100 → 90 → 100%, âncora no centro | `Pressed/01` | 200 ms · `cubic-bezier(0.7, 0, 0.8, 1)` |
| → Disabled | opacidade | `Disabled/01` | 150 ms · `cubic-bezier(0.7, 0, 0.5, 1)` |
| Abrir (toque no FAB) | ações: Y e escala 100 → 105 → 100% · ícone + → × | `Selected In/01` | 350 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |
| Abrir | opacidade das ações 0 → 100% | `Hover In/01` | 150 ms |
| Fechar (toque no FAB ou numa ação) | ações: Y e escala · ícone × → + | `Selected Out/01` | 200 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |
| Fechar | opacidade das ações 100 → 0% | `Hover Out/06` | 100 ms · `cubic-bezier(0.7, 0, 0.8, 1)` · delay |

- Os valores de timing, easing e delay vêm dos tokens de cada Motion Style. Usar os tokens, não os números da tabela.
- A abertura segue o padrão do Drop Button e do Popover nas páginas verdes da documentação de motion.
- As ações herdam o motion do Main Button (hover, press com escala de 90% e disabled).
- Respeitar `prefers-reduced-motion` com o modo `Reduced` dos Motion Styles.

### Figma × código
- **Ações de exemplo** (`Ação 1` a `Ação 6` com ícone placeholder) são ilustração. Texto e ícone reais vêm do uso.
- **Não animado no Figma:** escala do pressed, Y e escala das ações e troca do ícone com movimento. O Figma não anima componentes da lib. No protótipo, abrir e fechar usam Smart Animate com `Selected In/01` e `Selected Out/01`.

---

## 7. Mapa por stack

| Figma | Código (sugestão) |
|---|---|
| `Is Active` | `open` (controlado ou não) + evento de abrir e fechar |
| `Action 1` a `Action 6` + `Show Action 3–6` | `actions` (lista de 2 a 6 itens com `label`, `icon` e `onClick`) |
| `Text Label` · `Lead Icon` da ação | `action.label` · `action.icon` |
| `.FAB Button` › `Icon` | `icon` (fechado) |
| `.FAB Button` › `Appearance` | `appearance` (`accent` padrão) |
| `State=Disabled` | `disabled` |
| `State=Hovered` · `Pressed` | estados de interação, sem prop |
| Nome acessível do FAB | `aria-label` obrigatório (ex.: `label`) |

Os nomes da coluna de código são sugestão. O contrato final é do time de dev.

---

## 8. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **Nome do FAB** | `aria-label` obrigatório descrevendo o conjunto, ex.: Mais ações. O ícone fica com `aria-hidden` |
| **Estado do menu** | O FAB expõe `aria-haspopup="menu"`, `aria-expanded` (`true` aberto, `false` fechado) e `aria-controls` com o id da lista. O nome não muda ao abrir |
| **Lista** | `role="menu"`. Cada ação `role="menuitem"`, com o texto visível como nome |
| **Ordem** | Foco e leitura seguem a ordem visual, de cima para baixo |
| **Teclado** | Ao abrir, foco na primeira ação · setas ↑ ↓ navegam · Home e End vão à primeira e à última · Esc fecha e devolve o foco ao FAB · Tab para fora fecha |
| **Foco ao fechar por ação** | Volta ao FAB, exceto quando a ação leva a outra tela |
| **Disabled** | Atributo `disabled`, fora da tabulação, anunciado como indisponível |
| **1.4.1 Não depender de cor** | ✅ Aberto e fechado trocam o ícone (+ e ×) e o `aria-expanded` |
| **2.4.11 Foco não encoberto** | O FAB não pode esconder conteúdo com foco. Deixe respiro no fim da área com rolagem |
| **2.5.8 Target Size** | ✅ FAB 56 × 56 e ações com 48 de altura (mínimo 24) |
| **Foco visível** | Padrão de foco global do sistema. Não é variant |

### Contraste

| Par | Ratio | Status |
|---|---|---|
| Ícone `Support/lighter` sobre `Accent/Solid/medium` (Enabled, Pressed) | 4.54 | ✅ AA, sem folga |
| Ícone sobre `Accent/Solid/semi-intense` (Hovered) | 8.23 | ✅ |
| Ícone `Icons/intense` sobre `Surface/01` (Neutral Enabled) | 15.27 | ✅ |
| Ícone sobre `Neutral/Solid/semi-soft` (Neutral Hovered) | 13.56 | ✅ |
| Ícone sobre `Neutral/Solid/medium` (Neutral Pressed) | 6.11 | ✅ |
| Ícone sobre `Neutral/Solid/soft` e `Surface/inversed` (Inversed) | 16.96 | ✅ |
| Texto da ação `Text/intense` sobre `Surface/01` | 15.27 | ✅ AAA |
| FAB Accent contra fundo claro | 4.54 | ✅ |
| Disabled | — | Isento pelo 1.4.3. Não corrigir |

O par de 4.54 está colado no mínimo. Qualquer mudança em `Accent/Solid/medium` ou `Support/lighter` pede recalcular.

---

## 9. Checklist técnico

- [ ] Só o FAB Menu é exposto como componente. O FAB é parte interna
- [ ] `open` alterna pelo FAB, fecha por ação, por Esc e por Tab para fora
- [ ] De 2 a 6 ações, sem rolagem
- [ ] Menu abre para cima, alinhado pela direita, sem o FAB sair do lugar
- [ ] FAB fixo no canto inferior, com respiro no fim da área com rolagem
- [ ] Ícone troca de + para × ao abrir
- [ ] Ações consumidas do Main Button Default Neutral Medium, sem recriar estados internos
- [ ] Elevação pelas variáveis `Common/Elevations/Level 1–3`
- [ ] Todos os tokens semânticos, sem valor solto
- [ ] `aria-label`, `aria-haspopup`, `aria-expanded` e `aria-controls` no FAB · `role="menu"` e `menuitem`
- [ ] Setas, Home, End e Esc com retorno de foco ao FAB
- [ ] Motion Styles por interação, com modo `Reduced`
- [ ] Backdrop não incluído no componente
- [ ] Cross-platform validado (Figma ↔ React ↔ Flutter)

---

## 10. Pontos de atenção

### Decisão de produto (não bloqueia o dev)
- **Ação direta sem menu.** No pedido original, o FAB também podia executar uma ação direta, sem abrir lista. Com só o FAB Menu distribuído, esse caso não existe nesta entrega.

### Do sistema (não bloqueiam)
- **Pressed sem cor nova no Accent e no Inversed**, igual ao Icon Button e ao Main Button. O feedback é a escala de 90%.
- **Neutral sobre fundo claro.** O limite do FAB Neutral e das ações contra fundo claro tem 1.11:1. Quem identifica o controle é o ícone ou o texto (15:1), e a sombra ajuda. Prefira `Accent`, que é o padrão.
- **Main Button Pressed em `Label/Bold Label`.** As ações herdam do Main Button. Implementar como está no Figma.

---

## 11. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/F1s1Tb3cDHYli4aN76QzCo/-CastanhaDS--Components?node-id=27075-22460
- **Sets:** FAB Menu `27075:22460` · `.FAB Button` `27039:594` (seção `[Building Blocks] Buttons` `27181:18942`)
- **Componentes consumidos:** Main Button `4464:427` · base do FAB: Icon Button `4464:636`
- **Ícones ([Caju] Icons):** `plus-line` · `close-line`
- **Motion:** Documentação Geral de motion para desenvolvedores (Notion), páginas verdes do Icon Button, do Drop Button e do Popover
- **Diário:** Notion `3fa560483c0281719bfcf7227f7eb123`
- **Annotations:** FAB Menu com Handoff (8 itens), Accessibility (9 itens) e Motion · `.FAB Button` com Handoff (5), Accessibility (3) e Motion
- **Jira:** CDS-1694 (FAB Menu) · CDS-1688 (Release 27 · Design System)

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP em 16/10/2026.*
