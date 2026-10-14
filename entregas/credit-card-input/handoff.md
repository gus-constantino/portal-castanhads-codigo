# Credit Card Input · Handoff dev

> Componente novo da família **Text Fields** na lib estável do Castanha DS: o campo do número do cartão, com a máscara de 16 dígitos em grupos de 4 e o ícone de cartão. Mesmo envelope da família (`Label Content` + `Text Box` + `Trailing Content`).
>
> **Task:** CDS-1607 · **Épico:** CDS-1600 (Release 25) · **Label:** `design`
> **Branch Figma:** `NHkGUvBfNMNTLnsxKtAmWa` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Nodes:** Credit Card Input `24614:7155` (32 variantes) · legado de referência `24618:8264` · `.Credit Card Flags` `4934:771`
> **Composição:** `.Text Content Mask` (máscara `Credit Card`) · Icon Button · `Lead Icon` (instance swap)
> **Referência implementada:** [Credit Card Input](#/credit-card-input) (`cds-credit-card-input`, com playground e documentação em tabs) · [.Credit Card Flags](#/credit-card-flags)
> **Status:** ✅ QA das 32 variantes, Motion Styles e annotations aplicados. O componente existe apenas na branch, sem merge na main da lib

---

## 1. O que é

- **O que é:** campo para digitar o número de um cartão (PAN). Aceita dígitos e agrupa em blocos de 4 (`#### #### #### ####`).
- **Quando usar:** checkout, pagamento, cadastro ou atualização de cartão.
- **Quando não usar:** validade ou CVV (campos próprios), texto ou número genérico (Text Input), senha ou PIN (Password Input ou Code Input OTP).
- **Membro da família Text Fields:** mesmas variants, booleans, text props e o mesmo `Lead Icon` do Text Input. O que é próprio do cartão: `Lead Icon` de 24 px, a máscara `Credit Card` do `.Text Content Mask` e o Label em `Feedback/Warning/semi-intense` no `Warning`.
- **Comprimento fixo:** 16 dígitos (4 × 4).

### Composição

| Parte | O que é |
|---|---|
| `Label Content` | `Text Label` + `Required Text` (padrão `(Obrigatório)`) |
| `Text Box` | `Content` (`Lead Icon` + `.Text Content Mask`) + ícone `warning-line` no `Warning` + Icon Button |
| `Lead Icon` | Instance swap. Padrão: ícone de cartão `credit-card-line`, 24 × 24, decorativo, não detecta a bandeira |
| `.Text Content Mask` | Building block compartilhado da família, com `Mask=Credit Card`. Placeholder `1234 5678 9012 3456` |
| Icon Button | Instância Ghost · Neutral · Small, ícone `support-line`. O papel da ação (tooltip, navegação, outra ação) é de quem implementa |
| `Trailing Content` | `Supporting Message` (`Neutral`) ou `Error Message` (`Warning`) e `Character Counter` |
| `.Credit Card Flags` | Building block relacionado, 40 × 24, `Kind` `Empty` · `Elo` · `Mastercard` · `Visa`. Uso como `Lead Icon` do campo a confirmar no Figma |

### Comportamento

| Ação | Resultado |
|---|---|
| Digitar | Aceita dígitos e formata em grupos de 4 |
| Colar | Mantém os dígitos, descarta o resto e formata |
| Backspace ou Delete sobre o espaço da máscara | Apaga o dígito vizinho, não apenas move o cursor |
| 16 dígitos | Evento de conclusão com o valor (no portal: `cds-complete`) |
| Clicar no `Text Box` | Foca o campo (exceto no Icon Button) |
| Icon Button | Dispara a ação de apoio (no portal: `cds-trailing-action`) |

- O valor guardado é o dado sem a máscara. A máscara é de exibição.
- `inputmode="numeric"` e `autocomplete="cc-number"`.

---

## 2. Props e matriz de variantes

### Variant properties

| Prop | Valores | Default | Controla |
|---|---|---|---|
| `Appearance` | `Neutral` · `Warning` | `Neutral` | Borda, Label, ícone e mensagem de erro em `Warning` |
| `State` | `Enabled` · `Hovered` · `Pressed` · `Disabled` | `Enabled` | Fundo, borda e espessura da borda |
| `Is Filled` | `False` · `True` | `False` | Placeholder × valor |
| `Is Active` | `False` · `True` | `False` | Foco no campo |

### Boolean properties (todos default `true`)

| Prop | Controla |
|---|---|
| `Show Label` | Linha de `Label Content` |
| `Show Required` | `Required Text` ao lado do label |
| `Show Lead Icon` | `Lead Icon` à esquerda |
| `Show Trailing Item` | Icon Button à direita |
| `Show Supporting Content` | Linha de mensagem de apoio ou erro |
| `Show Caret` | Caret de protótipo. Em código é o cursor nativo |
| `Show Character Counter` | Contador de caracteres |

### Text properties

| Prop | Default | Onde aparece |
|---|---|---|
| `Text Label` | `Label` | Label do campo |
| `Required Text` | `(Obrigatório)` | Ao lado do label |
| `Supporting Message` | `Supporting Message` | `Appearance=Neutral` |
| `Error Message` | `Error Message` | `Appearance=Warning` |
| `Character Counter Value` | `-0000` | Contador |

### Instance swap

| Prop | Default | Controla |
|---|---|---|
| `Lead Icon` | `24618:7688` (ícone de cartão) | Ícone à esquerda do número |

### Matriz de variantes

| Componente | Variantes | Composição |
|---|---|---|
| **Credit Card Input** | **32** | `Appearance` (2) × `State` (4) × `Is Filled` (2) × `Is Active` (2) |
| **`.Credit Card Flags`** | **4** | `Kind` (4) |

- `State=Disabled` com `Is Active=True` (8 variantes) é artefato da matriz. Não implementar como estado.
- `State=Hovered` e `Pressed` são estados de interação, sem prop em código. `Is Filled` deriva do valor e `Is Active` do foco.

---

## 3. Métricas

| Métrica | Valor | Token |
|---|---|---|
| Altura do `Text Box` | 48 | `Common/Sizes/48` |
| Padding horizontal | 16 | `Common/Sizes/16` |
| Padding vertical | 0 | `Common/Sizes/0` |
| Gap do `Text Box` | 8 | `Common/Sizes/8` |
| Gap do root, `Label Content` e `Content` | 4 | `Common/Sizes/4` |
| Raio do `Text Box` | 12 | `Common/Border/Radius/small` |
| Borda (Enabled, Hovered, `Is Active`, Disabled) | 1 | `Common/Border/Width/hairline` |
| Borda (Pressed) | 2 | `Common/Border/Width/thin` |
| `Lead Icon` | 24 × 24 (intencional, bandeira) | `Common/Sizes/24` |
| Ícone `warning-line` | 16 × 16 | `Common/Sizes/16` |
| Icon Button | 40 × 40 · raio 12 | `Common/Sizes/40` · `Common/Border/Radius/small` |
| Altura mínima do `Trailing Content` | 24 | `Common/Sizes/24` |
| Largura do campo | 320 no Figma | mín. e máx. a confirmar no Figma |
| `.Credit Card Flags` | 40 × 24 | token a confirmar no Figma |

> A borda é por dentro. A troca de 1 para 2 px no Pressed não desloca o layout.

---

## 4. Tokens por parte

### `Text Box` · `Appearance=Neutral`

| Estado | Fundo | Borda |
|---|---|---|
| Enabled | `Surface/default` | `Border/semi-soft` · hairline |
| Hovered | `Surface/01` | `Border/medium` · hairline |
| Pressed | `Surface/default` | `Border/semi-intense` · thin |
| `Is Active` | `Surface/default` | `Border/semi-intense` · hairline |
| Disabled | `Surface/default` | `Border/medium` · hairline + `Common/Opacity/medium` (0.4) no container |

### `Text Box` · `Appearance=Warning`

Borda `Feedback/Warning/semi-intense` em todos os estados. No Hovered o fundo segue `Surface/01`, como no `Neutral`. O ícone `warning-line` aparece sempre no `Warning`, sem depender de `Show Trailing Item`.

### Texto e ícones

| Parte | Tipografia | Cor |
|---|---|---|
| Label e `Required Text` | `Text Style/Label/Medium` | `Text/intense`. Em `Warning`: `Feedback/Warning/semi-intense` |
| Placeholder (`Is Filled=False`) | `Text Style/Body/Regular` | `Text/soft` |
| Valor (`Is Filled=True`) | `Text Style/Body/Regular`, números tabulares | `Text/intense` |
| Supporting Message | `Text Style/Caption/Regular` | `Text/medium` |
| Error Message | `Text Style/Caption/Regular` | `Feedback/Warning/semi-intense` |
| Character Counter | `Text Style/Disclaimer/Regular` | `Text/soft` |
| `Lead Icon` | — | `Icons/intense` |
| `warning-line` | — | `Feedback/Warning/semi-intense` |
| Caret de protótipo | — | `Support/system` (cursor nativo em código) |

Todos semânticos. Nenhum valor solto nas 32 variantes.

> O Label em `Warning` com `Feedback/Warning/semi-intense` vale para a branch. Na main da família o Label segue `Text/intense`. Implementar como está na branch.

### Motion por transição

| Transição | Gatilho | Motion Style |
|---|---|---|
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| Pressed → `Is Active` | On tap | `Selected In/01` |

- O Icon Button aninhado usa o motion do próprio Icon Button da lib. O override de hover da branch não tem token e fica como exceção.
- Com `prefers-reduced-motion: reduce`, sem transição.

---

## 5. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **Nome do campo** | `Text Label`, com o `Required Text` quando `Show Required`. O placeholder não substitui o nome. Sem label visível, usar `aria-label` (ex.: Número do cartão) |
| **Mensagem** | Supporting ou Error Message ligada por `aria-describedby`. A Error Message é anunciada ao aparecer (`role="alert"`) |
| **Erro** | `aria-invalid="true"` no `Warning` |
| **`Lead Icon`** | Decorativo (`aria-hidden`). Não representa a bandeira |
| **Icon Button** | Nome acessível obrigatório, definido por quem implementa (ex.: Ajuda sobre o número do cartão) |
| **Disabled** | `aria-disabled="true"`, fora da tabulação |
| **Ordem de leitura** | Label, obrigatório, campo, Icon Button, mensagem |
| **1.4.1 Não depender de cor** | ✅ Erro por borda, ícone e mensagem |
| **2.5.8 Target Size** | ✅ Campo de 48 de altura e Icon Button 40 × 40 (mínimo 24) |
| **Foco** | Padrão de foco global do sistema. Não é variant |
| **Dado sensível** | Em cartão salvo, exibir apenas os últimos dígitos. Não registrar o valor |

### Contraste

| Par | Ratio | Status |
|---|---|---|
| Label e valor `Text/intense` | 17:1 | ✅ AAA |
| Supporting Message `Text/medium` | 8.2:1 | ✅ AAA |
| Warning (texto, ícone e borda) `Feedback/Warning/semi-intense` | 6.4:1 | ✅ AA |
| Borda Pressed e `Is Active` `Border/semi-intense` | 8.2:1 | ✅ 1.4.11 |
| Placeholder `Text/soft` | 2.78:1 | ⚠️ texto de dica, herança da família |
| Borda Enabled `Border/semi-soft` | ~1.25:1 | ⚠️ abaixo de 3:1, herança da família |
| Borda Hovered `Border/medium` | ~2.78:1 | ⚠️ abaixo de 3:1, herança da família |
| Disabled | — | Isento pelo 1.4.3. Não corrigir |

> Os três pares abaixo do mínimo são iguais em toda a família Text Fields. Ficam como estão por decisão do time, a rever junto com os contratos de cores do sistema. Implementar como está no Figma.

---

## 6. Checklist dev

- [ ] 4 variant props, 7 booleans, 5 text props e o instance swap `Lead Icon` conforme a seção 2
- [ ] Máscara `Credit Card` de 16 dígitos em grupos de 4, valor guardado sem máscara
- [ ] Backspace e Delete sobre o espaço da máscara apagam o dígito vizinho
- [ ] `inputmode="numeric"` e `autocomplete="cc-number"`
- [ ] `Lead Icon` de 24 × 24, decorativo
- [ ] Icon Button consumido da lib (Ghost Neutral Small, `support-line`), sem recriar estados internos
- [ ] `warning-line` sempre visível no `Warning`
- [ ] Label em `Feedback/Warning/semi-intense` no `Warning`
- [ ] `Show Caret` sem implementação própria (cursor nativo)
- [ ] `Disabled` com `Is Active=True` não implementado como estado
- [ ] Nome acessível pelo `Text Label`, `aria-invalid` e `aria-describedby` no `Warning`
- [ ] `aria-disabled` e fora da tabulação no Disabled
- [ ] Motion Styles por interação (`Hover In/01`, `Pressed/01`, `Selected In/01`) e respeito a reduced motion
- [ ] Todos os tokens semânticos, sem valor solto
- [ ] Cross-platform validado (Figma ↔ React ↔ Flutter)

---

## 7. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/NHkGUvBfNMNTLnsxKtAmWa/-CastanhaDS--Components?node-id=24614-7155
- **`.Credit Card Flags` (main da lib):** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4934-771
- **Nodes:** Credit Card Input `24614:7155` · legado `24618:8264` · `Lead Icon` padrão `24618:7688` · `.Credit Card Flags` `4934:771`
- **Ícones ([Caju] Icons):** `credit-card-line` · `support-line` · `warning-line`
- **Annotations no set:** Handoff, Accessibility e Motion
- **Jira:** CDS-1607 (Credit Card Input) · CDS-1600 (Release 25 · Design System)

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados da implementação de referência no portal, construída a partir da branch do Figma.*
