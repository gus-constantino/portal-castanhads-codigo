# Password Input — Hotfix do ícone de feedback · Handoff dev

> Inclusão do **ícone de alerta** na aparência **Warning** do Password Input da lib estável do Castanha DS, para igualar ao Text Input.
> Escopo desta entrega: **apenas o ícone de feedback e a boolean que o controla**. Não altera cor, estados, medidas nem o comportamento de mostrar e ocultar a senha.
>
> **Task:** CDS-2070 · **Épico:** CDS-1586 (Release 26) · **Label:** `design` · **Tipo:** Bug (Hot Fix)
> **Branch Figma:** `D7w4pYHDcUZKZ1qEkCH12b` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Node:** Password Input `5798:2677` (página Text Fields)
> **Status:** ✅ Validado via Figma MCP — sem pendências

---

## 1. O que mudou nesta task

- **Ícone de alerta** (`warning-line`, 16×16) em todas as variantes `Appearance=Warning`. Ele entra no Text Box, depois do conteúdo e antes do botão de mostrar e ocultar a senha.
- **Boolean `Show Trailing Item` muda de significado.** Na main, ela controla o botão de mostrar e ocultar a senha. Na branch, essa boolean foi renomeada para **`Show Visibility Action`** (mesmo id `5748:0`), e o nome `Show Trailing Item` passou para uma boolean nova (`27797:0`), que controla o ícone de alerta. Assim o nome fica igual ao do Text Input.
- **Neutral não muda.** As variantes `Appearance=Neutral` seguem sem ícone de feedback.
- **Ajuste junto:** o frame `Trailing Content` (Error Message e contador) passou a usar token no gap e no padding (`Common/Sizes/4` e `Common/Sizes/0`). O valor visual não mudou: era 4px solto e continua 4px.
- **Por quê:** o Password Input era o único input da família sem o ícone de feedback no erro. O Storybook React também está sem ele (thread do Castanha suporte, 06/10/2026).
- **Fora do escopo:** Flutter, que ainda não foi estabilizado e já nasce com o comportamento correto (CDS-1737).

---

## 2. Properties `Show Trailing Item` e `Show Visibility Action`

| Prop | Tipo | Default | Na main (publicada) | Na branch (esta entrega) |
|---|---|---|---|---|
| `Show Visibility Action` | Boolean | `true` | — (era `Show Trailing Item`) | Botão de mostrar e ocultar a senha |
| `Show Trailing Item` | Boolean | `true` | Botão de mostrar e ocultar a senha | Ícone de alerta. Só age em `Appearance=Warning` |

> ⚠️ **Renomeação.** Quem mapeou `Show Trailing Item` para o botão de olho (Code Connect, prop de código, protótipo) precisa trocar para `Show Visibility Action`. O nome `Show Trailing Item` agora é o ícone de alerta, como no Text Input.

No Figma, `Show Trailing Item` só aparece no painel das variantes Warning, porque só está ligada a camadas delas. Em código, o caminho mais simples é derivar o ícone de `appearance="warning"`. Expor a prop só faz sentido se o Text Input em código também expõe — manter as duas iguais.

### Matriz de variantes

| Componente | Variantes | Composição |
|---|---|---|
| **Password Input** | **64** | `Appearance` (2) × `State` (4) × `Is Active` (2) × `Is Filled` (2) × `Show Content` (2) |
| Com o ícone de alerta | **32** | todas as `Appearance=Warning` |

A cobertura é completa: o ícone existe em `Enabled`, `Hovered`, `Pressed` e `Disabled`, e em todas as combinações de `Is Active`, `Is Filled` e `Show Content`.

### Demais props do set (inalteradas)

`Appearance` (`Neutral` · `Warning`) · `State` (`Enabled` · `Disabled` · `Hovered` · `Pressed`) · `Is Active` · `Is Filled` · `Show Content` · `Show Supporting Content` · `Show Caret` · `Show Label` · `Show Required` · `Show Lead Icon` · `Show Character Counter` · `Lead Icon` · `Text Label` · `Required Text` · `Placeholder Content` · `Text Content` · `Supporting Message` · `Error Message` · `Character Counter Value`

---

## 3. Anatomia do Text Box (Warning)

```
┌──────────────────────────────────────────────────────────┐
│ [Lead Icon] Text Content          [⚠ alerta] [👁 ação] │
└──────────────────────────────────────────────────────────┘
  Content                           Trailing     Visibility
                                    Icon (novo)  Action
```

| Métrica | Valor | Token |
|---|---|---|
| Altura do Text Box | 48 | `Common/Sizes/48` |
| Padding horizontal | 16 | `Common/Sizes/16` |
| Gap entre Content, Trailing Icon e Visibility Action | 8 | `Common/Sizes/8` |
| Ícone de alerta | 16×16 | altura `Common/Sizes/16` |
| Visibility Action (Icon Button Ghost Small) | 40×40 | `Common/Sizes/40` |
| Raio | small | `Common/Border/Radius/small` |
| Borda | 1px (2px em Pressed) | `Common/Border/Width/hairline` |

A ordem no Text Box é **Content → Trailing Icon → Visibility Action**. O ícone de alerta fica à esquerda do botão de olho, nunca depois dele.

---

## 4. Tokens (Appearance=Warning)

| Elemento | Propriedade | Token | Valor |
|---|---|---|---|
| **Ícone de alerta** | cor | `Common/Colors/Feedback/Warning/semi-intense` | `#974602` |
| Text Box | borda | `Common/Colors/Feedback/Warning/semi-intense` | `#974602` |
| Text Box | fundo (Enabled, Pressed, Disabled) | `Common/Colors/Surface/default` | `#fcfcfc` |
| Error Message | texto | `Common/Colors/Feedback/Warning/semi-intense` · `Caption/Regular Caption` | `#974602` |
| Label e Required | texto | `Common/Colors/Text/intense` · `Label/Medium Label` | — |
| Value | texto | `Common/Colors/Text/intense` · `Body/Regular Body` | — |
| Contador | texto | `Common/Colors/Text/soft` · `Disclaimer/Disclaimer Regular` | — |
| Disabled | opacidade do componente | `Common/Opacity/medium` | 0.4 |

O ícone usa **o mesmo token da borda e da Error Message**. **Zero valor hardcoded. Nenhum token novo criado.**

> Em `Warning` + `Hovered`, o Text Box não tem fill. Isso é herdado do Text Input e não faz parte deste hotfix.

---

## 5. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **1.4.11 Contraste não-texto** | ✅ Ícone `#974602` sobre `#fcfcfc`: **6,41:1** (mínimo 3:1). Sobre `#ffffff`: 6,58:1. |
| **1.4.3 Contraste em Disabled** | ✅ Isento. O critério exclui componentes inativos. |
| **1.4.1 Uso de cor** | ✅ O erro não depende só de cor: há o ícone e o texto da Error Message. |
| **Foco** | ✅ Padrão de foco global do sistema (não é variant). |

**Para a implementação:**
- O ícone de alerta é **decorativo**: `aria-hidden="true"`, sem foco e sem nome acessível. Quem comunica o erro é a Error Message.
- Ligar a Error Message ao campo com `aria-describedby` e marcar o campo com `aria-invalid="true"` no estado Warning.
- O ícone **não é clicável** e não pode receber o alvo de toque do botão de olho.

---

## 6. Checklist dev

- [ ] Ícone de alerta `warning-line` 16×16 em `appearance="warning"`, em todos os estados
- [ ] Ordem no Text Box: conteúdo → ícone de alerta → botão de mostrar e ocultar
- [ ] Gap de 8px (`Common/Sizes/8`) entre os três
- [ ] Cor do ícone `Common/Colors/Feedback/Warning/semi-intense`, igual à borda e à Error Message
- [ ] Neutral sem ícone de feedback
- [ ] Se a prop for exposta, `Show Trailing Item` com o mesmo nome e padrão do Text Input
- [ ] Botão de olho mapeado para `Show Visibility Action`, não mais para `Show Trailing Item`
- [ ] Ícone com `aria-hidden="true"`; Error Message ligada por `aria-describedby`; `aria-invalid="true"` no Warning
- [ ] Botão de olho continua com alvo de 40×40 e não muda de posição relativa
- [ ] Comparar com o Text Input lado a lado no Storybook

---

## 7. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/D7w4pYHDcUZKZ1qEkCH12b/-CastanhaDS--Components?node-id=5798-2677
- **Node:** Password Input `5798:2677` · exemplo Warning `10414:9142` · irmão de referência Text Input `5743:325`
- **Annotation:** Handoff no set `5798:2677` (ícone de feedback no Warning)
- **Jira:** CDS-2070 ([Design] Hotfix: Password Input) · CDS-1586 (Release 26 · Design System) · CDS-1737 ([Flutter] Password Input)
- **Storybook atual:** https://castanha-web.caju.com.br/?path=/docs/components-passwordinput--docs
- **Decisão:** thread do Castanha suporte, 06/10/2026 — Hot Fix em Design e React; Flutter já nasce correto

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP.*
