# Code Input OTP · Handoff dev

> Componente novo da família **Text Fields** na lib estável do Castanha DS: o campo de código de verificação (OTP/PIN), com uma fileira de **3 a 6 células** de um caractere. Substitui o Code Input do legado.
>
> **Task:** CDS-1608 · **Épico:** CDS-1600 (Release 25) · **Label:** `design`
> **Branch Figma:** `PfeMbrThCwzwJFFo2GiAbW` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Nodes:** Code Input OTP `24060:7228` (16 variantes) · building block `.Value Box` `24032:5486`
> **Referência implementada:** [Code Input OTP](#/code-input-otp) (`cds-code-input`, com playground e documentação em tabs)
> **Status:** ✅ Design fechado e aprovado no QA. O componente existe apenas na branch, sem merge na main da lib

---

## 1. O que é

- **O que é:** campo para digitar um código curto de uso único, recebido por SMS, e-mail ou app autenticador. Cada caractere ocupa uma célula `.Value Box`.
- **Quando usar:** confirmação de login ou transação, segundo fator (2FA/MFA) e PIN curto de ativação.
- **Quando não usar:** senha (use o Password Input), texto livre ou número longo (use o Text Input), código acima de 6 caracteres.
- **O que mudou em relação ao legado:** `Appearance` passa a `Neutral` · `Warning` (estado de erro), entram `State=Disabled`, `Is Filled`, `Hidden Values`, Label e mensagem de apoio da família, a Visibility Action e os Motion Styles por interação. Tokens migrados para o namespace `Common/*`.
- **Quantidade de células:** de 3 a 6, definida pela visibilidade das células, não por variante. As células 7 e 8 saíram do componente.

### Composição

| Parte | O que é |
|---|---|
| `Label Content` | `Text Label` + `Required Text` (padrão `(Obrigatório)`), opcional |
| `Value Boxes` | Fileira horizontal de `.Value Box` (3 a 6), separador de agrupamento opcional entre células |
| Visibility Action | Instância de **Icon Button** `Kind=Ghost` · `Appearance=Neutral` · `Size=Small`, na mesma fileira, depois das células |
| `Trailing Content` | `Supporting Message` (`Neutral`) ou `Error Message` (`Warning`), opcional |

### Comportamento

| Ação | Resultado |
|---|---|
| Digitar um caractere | Preenche a célula e avança o foco para a próxima |
| Digitar numa célula preenchida | Substitui o caractere |
| Backspace | Apaga a célula. Em célula vazia, volta e apaga a anterior |
| Delete | Apaga a célula atual |
| Setas ← →, Home, End | Navegam entre as células |
| Colar | Distribui o código a partir da célula focada |
| Autofill de SMS | `autocomplete="one-time-code"` na primeira célula, o valor se distribui como na colagem |
| Visibility Action | Alterna `Hidden Values`. O foco fica no botão |
| Código completo | Evento de conclusão com o valor (no portal: `cds-complete`) |

- **Tipo de caractere:** numérico aceita apenas `0–9` e abre o teclado numérico (`inputmode="numeric"`). Alfanumérico aceita letras, números e símbolos, sem espaço. O tipo é comportamento de código, não é prop do Figma.
- **Caractere inválido** é descartado, sem avançar o foco.

---

## 2. Props e matriz de variantes

### Container · `Code Input OTP`

| Prop | Valores | Default | Controla |
|---|---|---|---|
| `State` | `Enabled` · `Disabled` | `Enabled` | `Disabled` desabilita o campo inteiro, nunca uma célula isolada |
| `Appearance` | `Neutral` · `Warning` | `Neutral` | `Warning` é o erro (código inválido) |
| `Is Filled` | `False` · `True` | `False` | Reflete se há valor |
| `Hidden Values` | `False` · `True` | `False` | Máscara do campo, propagada para todas as células |

| Boolean | Default | Controla |
|---|---|---|
| `Show Label` | `true` | Linha de `Label Content` |
| `Show Required` | `true` | `Required Text` ao lado do label |
| `Show Trailing Item` | `true` | Visibility Action |
| `Show Supporting Content` | `true` | Linha de mensagem de apoio ou erro |
| Visibilidade das células 4 a 6 | — | Quantidade de células. Nome exato das props a confirmar no Figma |

| Text prop | Default | Onde aparece |
|---|---|---|
| `Text Label` | a confirmar no Figma | Label do campo |
| `Required Text` | `(Obrigatório)` | Ao lado do label |
| `Supporting Message` | `Supporting Message` | `Appearance=Neutral` |
| `Error Message` | `Error Message` | `Appearance=Warning` |

### Building block · `.Value Box`

| Prop | Valores | Controla |
|---|---|---|
| `State` | `Enabled` · `Hovered` · `Pressed` | Interação da célula. `Disabled` é do container |
| `Appearance` | `Neutral` · `Warning` | Espelha o container |
| `Is Active` | `False` · `True` | Célula em edição: borda intensa, caret e dígito intenso |
| `Hidden Value` | `False` · `True` | Troca o caractere por um ponto |
| `Is Filled` (boolean) | `false` · `true` | Há caractere na célula |
| `Show Separator` (boolean) | `false` · `true` | Separador depois da célula |
| `Show Caret` (boolean) | — | Caret na célula ativa e vazia |
| `Value` (texto) | 1 caractere | O caractere exibido |

### Matriz de variantes

| Componente | Variantes | Composição |
|---|---|---|
| **Code Input OTP** | **16** | `State` (2) × `Appearance` (2) × `Is Filled` (2) × `Hidden Values` (2) |
| **`.Value Box`** | a confirmar no Figma | `State` (3) × `Appearance` (2) × `Is Active` (2) × `Hidden Value` (2) |

- O último dígito nunca tem separador. Exemplo: separador apenas depois do 3º dígito agrupa `XXX XXX`.
- `Is Filled`, `Is Active` e `State` da célula derivam do valor e da interação em código. Não são props expostas.

---

## 3. Métricas

| Métrica | Valor | Token |
|---|---|---|
| Largura da célula | 40 (fixa) | `Common/Sizes/40` |
| Altura da célula | 56 (fixa) | `Common/Sizes/56` |
| Raio da célula | 16 | `Common/Border/Radius/medium` |
| Gap entre células | 4 | `Common/Sizes/4` |
| Gap célula → separador | 4 | `Common/Sizes/4` |
| Separador | 8 × 2, pílula | `Common/Sizes/8` × `Common/Sizes/2` · `Common/Border/Radius/pill` |
| Gap vertical (label, fileira, mensagem) | 8 | `Common/Sizes/8` |
| Borda em repouso | 1 | `Common/Border/Width/hairline` |
| Borda em Hovered, Pressed e ativa | 2 | `Common/Border/Width/thin` |
| Ponto de `Hidden Value` | 8 × 8, círculo | `Common/Sizes/8` · `Common/Border/Radius/pill` |
| Caret | 1 × 24 | token a confirmar no Figma |
| Visibility Action | 40 × 40 | Icon Button `Size=Small` |
| Largura do campo | mín. 320 (6 células) · máx. 480 na fileira | token a confirmar no Figma |
| Célula com separador | 52 (40 + 4 + 8) | — |

> A borda é por dentro (`strokeAlign: INSIDE`). A troca de 1 para 2 px não desloca o layout. Em código, usar `box-shadow: inset` ou `box-sizing: border-box`.
> As células não encolhem. Acima do teto de 480, a fileira rola na horizontal.

---

## 4. Tokens por parte

### Célula · `Appearance=Neutral`

| Estado | Fundo | Borda | Dígito |
|---|---|---|---|
| Enabled | `Surface/default` | `Border/semi-soft` · hairline | `Text/medium` |
| Hovered | `Surface/01` | `Border/medium` · thin | `Text/medium` |
| Pressed | `Neutral/Opacity/Intense/semi-transparent` | `Border/semi-intense` · thin | `Text/medium` |
| Enabled + `Is Active` | `Surface/default` | `Border/intense` · thin | `Text/intense` + caret |
| Hovered + `Is Active` | `Surface/01` | `Border/semi-intense` · thin | `Text/intense` |
| Pressed + `Is Active` | `Neutral/Opacity/Intense/semi-transparent` | `Border/intense` · thin | `Text/intense` |

### Célula · `Appearance=Warning`

Borda `Feedback/Warning/semi-intense` em todos os estados. Fundo, peso da borda e cor do dígito seguem o `Neutral`.

### Demais partes

| Parte | Token |
|---|---|
| Dígito | `Text Style/Subtitle/Medium` |
| Ponto de `Hidden Value` | `Icons/intense` |
| Caret | `Icons/intense`, piscando |
| Separador | `Neutral/Solid/semi-intense` |
| Label e `Required Text` | `Text Style/Label/Medium` · `Text/intense`. Em `Warning`: `Feedback/Warning/semi-intense` |
| Supporting Message | `Text Style/Caption/Regular` · `Text/medium` |
| Error Message | `Text Style/Caption/Regular` · `Feedback/Warning/semi-intense` |
| Visibility Action | Icon Button Ghost Neutral Small · `hide-line` (código visível) ↔ `hide-off-line` (código mascarado) |
| Disabled (container) | `Common/Opacity/medium` (0.4), sem interação. A Visibility Action herda a opacidade, sem estado Disabled próprio |

Todos semânticos. Nenhum valor solto.

> O Label em `Warning` com `Feedback/Warning/semi-intense` vale para a branch. Na main da família o Label segue `Text/intense`. Implementar como está na branch.

### Motion por transição

| Transição | Gatilho | Motion Style |
|---|---|---|
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| Pressed → `Is Active` | On tap | `Selected In/01` |

- A volta ao repouso usa o mesmo estilo da ida.
- Com `prefers-reduced-motion: reduce`, sem transição e caret sem piscar. A coleção `.Motion Styles` não tem modo Reduced tokenizado para este caso.

---

## 5. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **Grupo** | Células em `role="group"` com o nome do campo (ex.: Código de verificação) |
| **Nome de cada célula** | Nome com a posição (ex.: dígito 1 de 6) |
| **Tabulação** | Um único ponto de Tab no conjunto: cai na primeira célula vazia, ou na última com o código completo. Setas, Home e End navegam dentro |
| **Erro** | `aria-invalid="true"` nas células, `Error Message` ligada por `aria-describedby` e anunciada ao aparecer (`role="alert"`) |
| **Visibility Action** | Toggle com `aria-pressed`. Nome: Mostrar código (mascarado) · Ocultar código (visível) |
| **Disabled** | Células e Visibility Action fora da tabulação, anunciadas como indisponíveis |
| **1.4.1 Não depender de cor** | ✅ Erro por borda e mensagem |
| **2.5.8 Target Size** | ✅ Célula 40 × 56 e Visibility Action 40 × 40 (mínimo 24) |
| **Foco** | Padrão de foco global do sistema. Não é variant |

### Contraste

| Par | Ratio | Status |
|---|---|---|
| Dígito ativo `Text/intense` sobre `Surface/default` | 16.96 | ✅ AAA |
| Dígito em repouso `Text/medium` | 8.24 | ✅ AAA |
| Label `Text/intense` | 16.96 | ✅ AAA |
| Supporting Message `Text/medium` | 8.24 | ✅ AAA |
| Warning (borda e texto) `Feedback/Warning/semi-intense` | 6.41 | ✅ AA |
| Borda ativa `Border/intense` | 16.96 | ✅ 1.4.11 |
| Borda Pressed `Border/semi-intense` | 8.24 | ✅ 1.4.11 |
| Borda em repouso `Border/semi-soft` | ~1.24 | ⚠️ abaixo de 3:1 |
| Borda Hovered `Border/medium` | 2.78 | ⚠️ abaixo de 3:1 |
| Disabled | — | Isento pelo 1.4.3. Não corrigir |

> A borda em repouso ficou mais sutil por decisão de design: decorativa no repouso, funcional na interação. A célula se distingue pela fileira e pelo dígito. Está em aberto confirmar com a revisão de acessibilidade se as células vazias seguem visíveis. Implementar como está no Figma.

---

## 6. Checklist dev

- [ ] Quantidade de células configurável de 3 a 6
- [ ] `Appearance` `Neutral` e `Warning`, com borda, Label e mensagem em `Feedback/Warning/semi-intense`
- [ ] `State=Disabled` no campo inteiro com `Common/Opacity/medium`, sem estado Disabled por célula
- [ ] Dígito em `Text/intense` na célula ativa e `Text/medium` nas demais
- [ ] `Hidden Values` troca os caracteres por pontos de 8 px, mantendo o comportamento
- [ ] Separador por célula, com o último dígito sempre sem separador
- [ ] Visibility Action como Icon Button Ghost Neutral Small, ícone `hide-line` ↔ `hide-off-line`, `aria-pressed` e nome conforme o estado
- [ ] Células fixas 40 × 56, borda por dentro (1 → 2 px sem deslocar), fileira com teto de 480
- [ ] Digitar avança, Backspace volta e apaga, setas navegam, colar e autofill distribuem
- [ ] Filtro por tipo: numérico (`0–9`) e alfanumérico (sem espaço)
- [ ] `autocomplete="one-time-code"` na primeira célula e `inputmode` conforme o tipo
- [ ] `role="group"` com nome, nome de posição em cada célula, um único ponto de Tab
- [ ] `aria-invalid` e `aria-describedby` no `Warning`
- [ ] Motion Styles por interação (`Hover In/01`, `Pressed/01`, `Selected In/01`) e respeito a reduced motion
- [ ] Eventos de mudança (valor parcial) e de conclusão (código completo)
- [ ] Todos os tokens semânticos, sem valor solto

---

## 7. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24060-7228
- **`.Value Box`:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24032-5486
- **Exemplos de uso no Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/PfeMbrThCwzwJFFo2GiAbW/-CastanhaDS--Components?node-id=24216-23589
- **Nodes:** Code Input OTP `24060:7228` · `.Value Box` `24032:5486` · Icon Button (Visibility Action)
- **Ícones ([Caju] Icons):** `hide-line` · `hide-off-line`
- **Annotations no set:** 16 (Handoff e Accessibility), no container e na célula
- **Jira:** CDS-1608 (Code Input OTP) · CDS-1600 (Release 25 · Design System)

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados da implementação de referência no portal, construída a partir da branch do Figma.*
