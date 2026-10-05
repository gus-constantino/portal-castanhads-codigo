---
title: Checkbox
introduction: O checkbox é Componente interativo usado para selecionar ou desmarcar opções. Pode ser preenchido com um checkmark (✔) caso seja selecionado, ou por um traço (—) quando indeterminado. Utilizado em formulários e filtros, permitindo múltiplas seleções.
---

# Specs

## Princípios

* **Clareza** — O checkbox deve comunicar de forma imediata se uma opção está selecionada ou não. O estado (marcado, desmarcado ou indeterminado) precisa ser visualmente distinto.
* **Consistência** — Deve ser usado sempre para representar escolhas independentes entre si, garantindo uma experiência uniforme em diferentes contextos da interface.
* **Eficiência** — Permite ao usuário realizar seleções rápidas e diretas, reduzindo esforço cognitivo em listas de múltiplas opções.

---

## Quando usar

O checkbox é um componente de confirmação explícita, utilizado em situações onde o usuário precisa realizar uma ação de consentimento, concordância ou ativação de múltiplas escolhas, indicando que o usuário leu a label e concorda com seu conteúdo, garantindo que a ação seja consciente e voluntária.

### Utilize para

* Seleção Múltipla: Para permitir que o usuário escolha zero, uma ou várias opções de um conjunto (ex: selecionar interesses).
* Configurações Independentes: Para ativar ou desativar configurações que não afetam outras opções (ex: "Receber e-mails de marketing").
* Concordância: Para que o usuário concorde ou discorde de termos (ex: "Li e concordo com os termos de uso").

### Não utilize para

* Escolha Única: Se o usuário deve escolher apenas uma opção de um conjunto (use Radio Buttons).
* Ação Imediata/Alternância de Estado: Se a ação é imediata e altera um estado diretamente (use um Toggle Switch).
* Ação de Comando: Se o clique executa uma função ou comando, não uma seleção (use um Botão).
* Navegação: Se o item leva a outra página ou seção (use um Link ou Botão).

## Casos de uso

### Checkbox vs Radio button

O Radio button é usado quando o usuário precisa escolher somente uma opção em uma listra de duas ou mais. Nele, a escolha do usuário é diretamente relacionada ao conjunto de itens presentes na lista, pois a escolha de uma das opções significa a “recusa” de todas as outras.

No caso do **Checkbox**, o usuário pode possui liberdade para aceitar ou não os itens de maneira independente, tendo uma ampla possibilidade de variações de escolha na mesma lista.

### Checkbox vs Switch

O **Checkbox** é usado para permitir que o usuário selecione ou aceite uma ou mais opções, geralmente aplicadas apenas após um ação de confirmação, como enviar o formulário. Já o **Switch** funciona como um interruptor, alterando imediatamente o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Selector** — área de toque 48×48.
2. **Checkbox** — caixa 24×24 com checkmark (Selected) ou traço (Indeterminate).
3. **Text Label** *(opcional)* — texto da opção.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Status` | Variant | `Unselected` | `Selected`, `Indeterminate` ou `Unselected`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Text Label` | String | `"Label"` | Texto da opção. |
| `Show Text Label` | Boolean | `true` | Mostra o texto. Sem ele, o texto continua como nome acessível. |

---

# Guidelines

## Acessibilidade

* Teclado: `Tab` move o foco; `Espaço` marca ou desmarca.
* Leitor de tela: `<input type="checkbox">` nativo — anuncia "caixa de seleção", o Label e o estado (marcado, desmarcado ou misto, no Indeterminate).
* Em grupo, use `<fieldset>` com `<legend>` para anunciar a pergunta do grupo.
* Disabled usa o `disabled` nativo: sai da ordem de foco e é anunciado como indisponível.
* Contraste: Label 16,96:1 (AA e AAA); Selected e Indeterminate 4,54:1 sobre Surface/default.

## Diretrizes de uso

* **Blocos de funcionalidades:** Os Checkbox podem se comportar como um relacionamento pai-filho quando colocadas em uma hierarquia aninhada. Marcar o pai seleciona seus filhos e desmarcá-lo desmarca seus filhos, se somente alguns filhos forem verificados, a verificação do pai será definida para um estado undetermined.
* **Conteúdo e clique:** A label do checkbox deve ser concisa e descritivo, informando claramente a opção que o usuário está marcando ou desmarcando. Tanto a label como o checkbox selector são clicáveis para alterar o status do componente.

## Motion

A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente.

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Selected In/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use quando for necessário uma fazer uma seleção múltipla. |
| Don't |   |   | Não use mais de um checkbox na horizontal. |
| Do |   |   | Use quando tiver elementos que podem ser selecionados como um bloco. |
| Don't |   |   | Não use quando somente um dos itens de uma lista pode ser selecionado. |
| Do |   |   | Use para validar informações que podem ser importantes. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Checkbox 4123:2560).
* 🔴 Contraste: a borda do Unselected (Border/medium) tem 2,78:1 sobre Surface/default — abaixo do mínimo de 3:1 (WCAG 1.4.11).
* 🟡 Motion: o Pressed (expressive/decelerate · medium/03) tem os valores do `Selected In/01`, não do `Pressed/01`. Is Active True (systemic/decelerate · medium/04) e False (systemic/decelerate · short/04) não correspondem a nenhum Motion Style.
* 🟡 Texto: "listra" → "lista"; "o usuário pode possui" → "pode" ou "possui"; "concisa e descritivo" → "concisa e descritiva"; "undetermined" → "indeterminado". Mantidos como estão até o time decidir.
