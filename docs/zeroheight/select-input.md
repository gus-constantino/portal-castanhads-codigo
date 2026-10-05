---
title: Select input
introduction: O Select input permite que a pessoa usuária escolha uma ou mais opções a partir de uma lista pré-definida.
---

# Specs

*Nomes alternativos comuns:* Dropdown, Select, Lista suspensa.

## Princípios

* **Clareza** — O componente deve comunicar de forma imediata quais opções estão disponíveis e qual valor está selecionado, evitando ambiguidades ou interpretações incorretas.
* **Previsibilidade** — O comportamento do Select input deve seguir padrões conhecidos, garantindo que a pessoa usuária saiba o que esperar ao interagir com o componente.
* **Eficiência** — A seleção deve exigir o mínimo de esforço possível, permitindo escolhas rápidas e reduzindo a necessidade de correções ou retrabalho.

---

## Quando usar

Use o Select input quando houver um conjunto conhecido e limitado de opções e quando for importante garantir padronização da resposta sem exigir digitação livre, seja para seleção única ou múltipla.

### Utilize para

* Selecionar uma ou múltiplas opções entre valores pré-definidos
* Garantir consistência e validação de dados
* Reduzir esforço cognitivo em escolhas comuns

### Não utilize para

* Listas muito longas sem agrupamento ou busca
* Entradas abertas ou valores personalizados
* Comparação direta entre muitas opções

## Tipos de Select Input

| Componente | Como escolhe |
| --- | --- |
| Async Select Input | Escolha única com busca: digitar filtra as opções (ou busca no servidor). |
| Async creatable Select Input | Como o Async e, quando o texto digitado não existe, oferece "Adicionar “…”" para criar a opção. |
| Radio Select Input | Escolha única sem busca: o campo só abre a lista, com Radio Button. |
| Checkbox Select Input | Vários valores sem busca: a lista fica aberta enquanto marca; o campo mostra "N Selecionados". |
| Multi Select Input | Vários valores com busca: cada escolha vira um Input Chip dentro do campo. |

## Casos de uso

### Select input vs Selection list / Selection list item

O **Select input** é indicado quando é necessário economizar espaço e apresentar as opções apenas no momento da interação. Ao ser ativado, ele utiliza a Selection list internamente para exibir as opções disponíveis. A Selection list e Selection list item, por sua vez, são mais adequadas quando as opções precisam estar sempre visíveis, facilitando leitura, comparação e tomada de decisão direta, sem depender de um campo de entrada.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

**A. Enabled** — 1. Title label · 2. Placeholder · 3. Support text · 4. Input container · 5. Dropdown icon button

**B. Active** — 6. Popover · 7. Selection list

## Composição do componente

O Select input é composto por um campo colapsado (trigger) e pela exibição da Selection list para apresentar as opções. Quando o Select estiver no modo ativo (aberto), tanto o campo quanto os Selection list items devem refletir esse estado por meio de ajustes visuais e comportamentais consistentes — como foco, destaque da opção selecionada e feedback de interação — garantindo coerência entre os dois componentes.

---

## Propriedades

Iguais nos 5 tipos (o Multi tem também o slot `Content`, com os Input Chips).

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Neutral` ou `Warning` (erro). |
| `State` | Variant | `Enabled` | `Enabled`, `Disabled`, `Hovered` ou `Pressed`. |
| `Is Filled` | Variant | `False` | `True` quando há valor. |
| `Is Active` | Variant | `False` | `True` com a lista aberta (Select) ou o campo em foco. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Label` | String | `"Label"` | Nome do campo. |
| `Show Required` | Boolean | `true` | Mostra a indicação de obrigatório. |
| `Required Text` | String | `"(Obrigatório)"` | Texto da indicação. |
| `Show Trailing Item` | Boolean | `true` | Mostra o item à direita. |
| `Show Supporting Content` | Boolean | `true` | Mostra a mensagem de apoio/erro. |
| `Supporting Message` | String | `"Supporting Message"` | Mensagem de apoio. |
| `Error Message` | String | `"Error Message"` | Mensagem de erro (Warning). |
| `Show Caret` | Boolean | `true` | Cursor de digitação para prototipação; não é requisito de código. |
| `Show Lead Icon` | Boolean | `true` | Mostra o ícone à esquerda. |
| `Lead Icon` | Instance swap | `placeholder` | Ícone à esquerda. |

---

# Guidelines

## Acessibilidade

* Segue o padrão combobox: o foco fica no campo, as opções ficam numa lista e a opção atual é anunciada.
* `↓`/`↑` abrem e percorrem as opções; `Enter` escolhe; `Esc` fecha; `Tab` sai do campo.
* O Label é o nome do campo e a mensagem de apoio (ou de erro) é a descrição; o erro aparece em texto além da cor.
* No Multi, cada chip tem um botão de remover com nome; `Backspace` com o campo vazio remove o último.
* Contraste: Label e valor 16,96:1 · apoio 8,24:1 · erro 6,41:1.

## Diretrizes de uso

* **Label e suporte:** Use labels claros e objetivos e complemente com support text apenas quando necessário para explicar regras, contexto ou consequências da escolha.
* **Placeholder:** Utilize o placeholder como instrução inicial, não como substituto do label.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Mantenha a ordem lógica ou semântica da lista. |
| Don't |   |   | Não use Select para listas excessivamente longas sem busca. |

---

## Pendências — não publicar

* 🔴 Contraste (família Text Fields): placeholder 2,78:1 (mínimo 4,5:1 para texto) e contorno do campo no Enabled 1,25:1 (mínimo 3:1 para identificar o campo).
* 🔴 Propriedades do zeroheight × lib: Style (Neutral · Negative) e "Is filled?" → Appearance (Neutral · Warning) e Is Filled; Placeholder não é prop na lib; faltam Is Active, Show Required, Show Lead Icon, Show Trailing Item, Error Message.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia; abrir e fechar o Popover não têm Motion Style.
* 🟡 A página não diz que a família tem 5 tipos (sets separados na lib); a tabela "Tipos de Select Input" é nova.
* 🟡 Texto: "disponíveis.A Selection list" sem espaço (corrigido aqui).
