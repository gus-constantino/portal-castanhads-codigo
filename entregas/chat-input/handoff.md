# Chat Input · Handoff técnico

> Composer de mensagem da família **Text Fields** na lib estável do Castanha DS. Serve conversas com IA e atendimento. Aceita texto digitado ou ditado por voz e cresce com o conteúdo.
>
> **Task:** CDS-1594 · **Épico:** CDS-1586 (Release 26)
> **Branch Figma:** `4hJ90rFfuEyWx9zHeqJxp4` · **Lib:** `[CastanhaDS] Components` (`LKZBwmlb7fIbDKdGrMncuA`)
> **Set:** `26567:44273` (Chat Input, 44 variantes), página Text Fields
> **Base:** `Text Area Input` (`10110:3028`)
> **Lido ao vivo no branch:** 14/10/2026, depois das annotations e das interações finais
> **Referência implementada:** portal Castanha DS, `cds-chat-input` (ditado simulado no playground)
> **Status:** ✅ `castanha-qa` sem pendências no componente. Pendências de produto na seção 10.

---

## 1. Visão geral

- **O que é:** campo de mensagem com três ações: anexar, enviar e ditar.
- **Quando usar:** área de digitação de um chat, com IA ou com atendimento humano.
- **Quando não usar:** formulário com rótulo visível. Para isso, use `Text Area Input`.
- **Voz é ditado, não mensagem de áudio.** A fala vira texto no campo. Não existe gravação, preview nem envio de áudio.
- **Não substitui nada do legado.** É componente novo.

---

## 2. Props

### Variant properties

| Prop | Valores | Default | Controla |
|---|---|---|---|
| `Appearance` | `Neutral` · `Warning` | `Neutral` | Borda e mensagem de erro em `Warning` |
| `State` | `Enabled` · `Hovered` · `Pressed` · `Disabled` | `Enabled` | Fundo, borda e espessura da borda |
| `Is Filled` | `False` · `True` | `False` | Placeholder × texto. Disponibilidade do `Send Button` |
| `Is Active` | `False` · `True` | `False` | Foco no campo: borda `semi-intense` e caret |
| `Is Listening` | `False` · `True` | `False` | Ditado ligado: `Voice Button` vira stop Accent e aparece `Listening Content` |

### Boolean properties

| Prop | Default | Controla |
|---|---|---|
| `Show Attachment` | `true` | Visibilidade do `Attach Button` |
| `Show Voice` | `true` | Visibilidade do `Voice Button` |
| `Show Supporting Content` | `true` | Linha de mensagem de apoio ou erro e contador |
| `Show Character Counter` | `true` | Contador de caracteres |
| `Show Trailing Item` | `true` | Ícone `warning-line` em `Appearance=Warning` |
| `Show Caret` | `true` | Caret nas variantes `Is Active=True` vazias |

### Text properties

| Prop | Default | Onde aparece |
|---|---|---|
| `Placeholder Content` | `Escreva uma mensagem` | Campo vazio sem ditado |
| `Text Content` | `Hello` | Campo preenchido. Valor de ilustração |
| `Listening Content` | `Ouvindo…` | Campo vazio durante o ditado |
| `Supporting Message` | `Supporting Message` | Linha de apoio em `Neutral` |
| `Error Message` | `Error Message` | Linha de erro em `Warning` |
| `Character Counter Value` | `-0000` | Contador |

### Matriz de variantes (44)

| `Is Listening` | Combinações | Variantes |
|---|---|---|
| `False` | `Appearance` (2) × `State` (4) × `Is Filled` (2) × `Is Active` (2) | 32 |
| `True` | `Appearance` (2) × `State` (`Enabled`, `Hovered`, `Pressed`) × `Is Filled` (2), sempre `Is Active=True` | 12 |

**Combinações que não existem, de propósito:**
- `Is Listening=True` com `Is Active=False`. Ditar mantém o campo focado.
- `Is Listening=True` com `State=Disabled`. Campo desabilitado não ouve nem recebe texto.

Não implementar esses estados. Se o campo perde o foco ou é desabilitado durante o ditado, o ditado encerra.

---

## 3. Anatomia

```
Chat Input                         vertical · gap Sizes/4 · largura Specific/Text Fields/Text/min-width a max-width (320–846)
├─ Text Box                        vertical · conteúdo alinhado embaixo · padding 8 / 8 / 8 / 16
│  │                               mín. Sizes/56 · máx. Sizes/160 · raio Border/Radius/small · borda por dentro
│  ├─ Text Content                 horizontal · padding vertical Sizes/8 · gap Sizes/4
│  │  ├─ Value                     Body/Regular · placeholder, texto ou transcrição
│  │  ├─ Caret                     1 × Sizes/24 · Icons/intense (Is Active=True e vazio)
│  │  ├─ Listening Message         Body/Regular · Text/medium (Is Listening=True e vazio)
│  │  └─ Trailing Icon             warning-line 16 (Appearance=Warning)
│  └─ Actions                      horizontal · gap Sizes/4 · centralizado na vertical
│     ├─ Attach Button             Icon Button Ghost Neutral Small · attachment            (opcional)
│     └─ Trailing Items            horizontal · gap Sizes/4 · alinhado à direita
│        ├─ Send Button            Icon Button Default Neutral Small · send-line · fundo Surface/01
│        └─ Voice Button           Icon Button Ghost Neutral Small · microphone-line       (opcional)
└─ Trailing Content                horizontal · altura Sizes/24 · gap Sizes/4               (opcional)
   ├─ Supporting Text              Caption/Regular · Text/medium ou Feedback/Warning/semi-intense
   └─ Character Counter            Disclaimer/Regular · Text/soft                          (opcional)
```

- **Texto em cima, ações embaixo.** O texto usa a largura toda do campo. As ações não disputam espaço com ele.
- **Não tem label visível.** O nome acessível vem por `aria-label` (seção 8).

---

## 4. Medidas

| Métrica | Valor | Token |
|---|---|---|
| Largura | 320 a 846 | `Specific/Text Fields/Text/min-width` · `max-width` |
| Altura mínima do campo | 56 | `Common/Sizes/56` |
| Altura máxima do campo | 160 | `Common/Sizes/160` |
| Padding do campo (topo, direita, base) | 8 | `Common/Sizes/8` |
| Padding do campo (esquerda) | 16 | `Common/Sizes/16` |
| Padding vertical do texto | 8 | `Common/Sizes/8` |
| Gap entre ações | 4 | `Common/Sizes/4` |
| Gap entre campo e linha de apoio | 4 | `Common/Sizes/4` |
| Altura da linha de apoio | 24 | `Common/Sizes/24` |
| Raio | 12 | `Common/Border/Radius/small` |
| Borda | 1 (Enabled, Hovered, Disabled) · 2 (Pressed), por dentro | `Common/Border/Width/hairline` · `thin` |
| Botões | 40 × 40 | Icon Button `Size=Small` |
| Caret | 1 × 24 | `Common/Sizes/1` · `Common/Sizes/24` |

**Zero valor solto.** Todo padding, gap, min, max, raio, borda e opacidade está ligado a token.

---

## 5. Tokens por estado

### Campo (`Text Box`)

| Estado | Fundo | Borda | Espessura |
|---|---|---|---|
| Enabled | `Surface/default` | `Border/semi-soft` | `hairline` |
| Enabled + `Is Active` | `Surface/default` | `Border/semi-intense` | `hairline` |
| Hovered (com ou sem foco) | `Surface/01` | `Border/medium` | `hairline` |
| Pressed | `Surface/default` | `Border/semi-intense` | `thin` |
| Disabled | `Surface/default` | `Border/medium` | `hairline` |
| `Appearance=Warning` (todos) | igual ao Neutral | `Feedback/Warning/semi-intense` | igual ao Neutral |

- **Disabled:** o componente inteiro recebe `Common/Opacity/medium` (0.4).
- **`Is Listening=True`** usa os mesmos tokens de campo do estado correspondente. O que muda é o `Voice Button` e a mensagem.

### Texto

| Elemento | Token de cor | Text style |
|---|---|---|
| Placeholder | `Text/soft` | `Body/Regular` (16 / 150%) |
| Texto digitado ou transcrito | `Text/intense` | `Body/Regular` |
| `Listening Content` | `Text/medium` | `Body/Regular` |
| Caret | `Icons/intense` | — |
| Supporting Message | `Text/medium` | `Caption/Regular` (14 / 150%) |
| Error Message | `Feedback/Warning/semi-intense` | `Caption/Regular` |
| Contador | `Text/soft` | `Disclaimer/Regular` (12 / 150%) |

### Ações

| Botão | Componente | Estado por contexto |
|---|---|---|
| `Attach Button` | Icon Button `Kind=Ghost`, `Appearance=Neutral`, `Size=Small` · `attachment` | Sempre `Enabled` |
| `Send Button` | Icon Button `Kind=Default`, `Appearance=Neutral`, `Size=Small` · `send-line` · fundo `Surface/01` | `Disabled` com `Is Filled=False` · `Enabled` com `Is Filled=True` |
| `Voice Button` | Icon Button `Kind=Ghost`, `Size=Small` | `Appearance=Neutral` + `microphone-line` sem ditado · `Appearance=Accent` + `stop-filled` com `Is Listening=True` |

- O fundo `Surface/01` do `Send Button` é decisão de design sobre o Icon Button Default Neutral. Implementar como está.
- Os estados internos de hover e press dos botões vêm do Icon Button. Não recriar.

---

## 6. Comportamento

### Campo
- **Cresce com o texto** de uma linha (56) até o máximo (160). Acima disso o texto rola dentro do campo. As ações ficam fixas embaixo.
- **Placeholder em uma linha**, truncado no fim quando não cabe.
- **`Is Filled`** é derivado do conteúdo. Campo com texto, digitado ou ditado, vira `True`.

### Ditado
1. Toque no `Voice Button` liga o ditado. O campo fica focado e entra em `Is Listening=True`.
2. Com o campo vazio, aparece `Listening Content` (`Ouvindo…`). Quando a transcrição começa, o texto ocupa o lugar dela.
3. Novo toque no `Voice Button` (stop) desliga o ditado. O texto transcrito fica no campo e pode ser editado.
4. **Digitar não ativa a voz.** O foco por teclado ou toque no campo mantém `Is Listening=False`.
5. Perda de foco ou campo desabilitado encerram o ditado.

### Enviar
- **Disponível com texto** e indisponível com o campo vazio.
- **Enter envia e Shift+Enter quebra a linha.** Ignorar o Enter durante a composição de texto (IME).
- **Durante o ditado, enviar envia e encerra o ditado.** O texto transcrito até o momento vai na mensagem.
- Depois de enviar, o campo fica vazio e mantém o foco.

### Permissão do microfone
- **Negada:** aplicar `Appearance=Warning` com `Error Message` pedindo acesso ao microfone. O campo segue aceitando digitação.

### Motion (Motion Styles, modo Normal)

| Interação | Motion Style | Timing · easing |
|---|---|---|
| Enabled → Hovered | `Hover In/01` | 150 ms · `cubic-bezier(0.7, 0, 0.5, 1)` |
| Hovered → Pressed | `Pressed/01` | 200 ms · `cubic-bezier(0.7, 0, 0.8, 1)` |
| Pressed → foco no campo | `Selected In/01` | 350 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |
| Pressed → Enabled com o campo já focado | `Released/01` | 50 ms · `cubic-bezier(0.2, 0, 0.3, 1)` |
| `Voice Button` liga o ditado | `Selected In/01` | 350 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |
| `Voice Button` desliga o ditado | `Selected Out/01` | 200 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |
| `Send Button` envia e limpa o campo | `Selected Out/01` | 200 ms · `cubic-bezier(0.4, 0, 0.1, 1)` |

Respeitar `prefers-reduced-motion` com o modo `Reduced` dos Motion Styles.

---

## 7. Mapa por stack

| Figma | Código (sugestão) |
|---|---|
| `Placeholder Content` | `placeholder` |
| `Text Content` | `value` |
| `Listening Content` | `listeningLabel` |
| `Is Filled` | derivado de `value` |
| `Is Active` | foco do campo |
| `Is Listening` | `listening` (estado controlado) + evento de início e fim |
| `Appearance=Warning` + `Error Message` | `error` / `errorMessage` |
| `Show Attachment` · `Show Voice` | `showAttachment` · `showVoice` (ou presença do handler) |
| `Show Supporting Content` · `Supporting Message` | `helperText` |
| `Show Character Counter` · `Character Counter Value` | `maxLength` + contador |
| `State=Disabled` | `disabled` |
| `State=Hovered` · `Pressed` | estados de interação, sem prop |
| Ação Anexar · Enviar · Ditar | `onAttach` · `onSend` · `onListeningChange` |

Os nomes da coluna de código são sugestão. O contrato final é do time de dev.

---

## 8. Acessibilidade (WCAG 2.2)

| Critério | Status |
|---|---|
| **Nome do campo** | Sem label visível. Usar `aria-label`, ex.: Mensagem. O placeholder não substitui o nome |
| **Nome das ações** | Anexar arquivo · Enviar mensagem · Ditar mensagem. Ícone sozinho não gera nome |
| **`Voice Button` como alternância** | Expor `aria-pressed`. Durante o ditado o nome muda para Parar ditado |
| **Anúncio do ditado** | Região dinâmica anuncia Ouvindo e Ditado encerrado |
| **1.4.1 Não depender de cor** | ✅ Ditado troca o ícone (microfone → stop) e mostra texto. Warning tem ícone e mensagem |
| **Teclado** | Enter envia · Shift+Enter quebra a linha |
| **Tabulação** | Ordem visual: campo, Anexar, Enviar, Ditar |
| **`Send Button` indisponível** | Anunciado como indisponível. Não sinalizar apenas por cor |
| **2.4.11 Foco visível ao rolar** | Ao passar do máximo, a rolagem acompanha o ponto de digitação |
| **2.5.8 Target Size** | ✅ Botões de 40 × 40 (mínimo 24) |
| **Foco** | Padrão de foco global do sistema. Não é variant |

### Contraste

| Par | Ratio | Status |
|---|---|---|
| Texto `Text/intense` sobre `Surface/default` | 16.96 | ✅ AAA |
| Texto sobre `Surface/01` (Hovered) | 15.27 | ✅ AAA |
| `Listening Content` `Text/medium` | 8.24 | ✅ AAA |
| Supporting Message `Text/medium` | 8.24 | ✅ AAA |
| Warning (texto, ícone e borda) `#974602` | 6.41 | ✅ AA |
| Ícones neutros `#1a1a1a` | 16.96 | ✅ |
| `Send Button` ícone sobre `Surface/01` | 15.27 | ✅ |
| Stop Accent `#e80537` sobre `Surface/default` | 4.54 | ✅ (mínimo 3 para ícone) |
| Stop Accent sobre `Surface/01` | 4.09 | ✅ |
| Borda com foco `Border/semi-intense` | 8.24 | ✅ |
| Disabled | — | Isento pelo 1.4.3. Não corrigir |

Pares herdados da família abaixo do mínimo estão na seção 10.

---

## 9. Checklist técnico

- [ ] 5 variant props, 6 booleans e 6 text props conforme a seção 2
- [ ] `Is Listening` existe apenas com foco e fora de `Disabled`
- [ ] Campo cresce de `Sizes/56` a `Sizes/160` e rola depois
- [ ] Ações fixas embaixo, `Attach` à esquerda, `Send` e `Voice` à direita
- [ ] `Send Button` indisponível com o campo vazio
- [ ] Enviar durante o ditado envia e encerra o ditado
- [ ] Enter envia, Shift+Enter quebra a linha
- [ ] Digitar não liga a voz
- [ ] Permissão negada aplica `Warning` e mantém a digitação
- [ ] Botões consumidos do Icon Button, sem recriar estados internos
- [ ] Todos os tokens semânticos, sem valor solto
- [ ] `aria-label` no campo, nomes nas ações e `aria-pressed` na voz
- [ ] Motion Styles por interação, com modo `Reduced`
- [ ] Cross-platform validado (Figma ↔ React ↔ Flutter)

---

## 10. Pontos de atenção

### Bloqueia o dev, precisa de produto
- **Previews de anexo.** O `Attach Button` existe, mas o estado com arquivo anexado ainda não foi desenhado.

### Herdados da família Text Fields (não bloqueiam)
- **Borda `Border/semi-soft` com 1.25:1** e borda Hovered `Border/medium` com 2.50:1. O WCAG 1.4.11 pede 3:1 para o limite do campo.
- **Placeholder e contador em `Text/soft` com 2.78:1.** O 1.4.3 pede 4.5:1.
- **`Warning` + `Hovered` sem fundo.** Em `Neutral` o hover usa `Surface/01`.

Os três estão iguais em Text Input, Search, Text Area, Password e Select. Ficam como estão por decisão do time, a rever junto com os contratos de cores do sistema. Implementar como está no Figma.

---

## 11. Referências

- **Branch Figma:** https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/4hJ90rFfuEyWx9zHeqJxp4/-CastanhaDS--Components?node-id=26567-44273
- **Set:** Chat Input `26567:44273` · base Text Area Input `10110:3028` · Icon Button `4464:636`
- **Ícones ([Caju] Icons):** `attachment` · `send-line` · `microphone-line` · `stop-filled` · `warning-line`
- **Annotations no set:** Handoff, Accessibility e Motion
- **Jira:** CDS-1594 (Chat Input) · CDS-1586 (Release 26 · Design System)

---

*Handoff gerado seguindo o protocolo IA-assistido do Castanha AI (skill `castanhads-juntos`). Dados extraídos e verificados via Figma MCP em 14/10/2026.*
