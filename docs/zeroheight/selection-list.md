---
title: Selection List
introduction: O Selection List é um agrupamento de opções organizadas em lista, permitindo que o usuário faça uma ou múltiplas seleções de forma clara e consistente. Ele é formado por instâncias do componente Selection List Item empilhados e separados por divisores visuais, facilitando a leitura e a comparação entre alternativas.
---

# Specs

*Nomes alternativos comuns:* Lista de seleção, Listbox, Option list, Selectable list.

## Princípios

* **Clareza de intenção** — Cada item deve deixar explícito se a ação esperada é selecionar, navegar ou visualizar, evitando ambiguidades.
* **Consistência de comportamento** — Todos os itens da lista devem seguir o mesmo padrão de interação, mantendo previsibilidade para o usuário.
* **Foco na escolha** — O componente deve priorizar a seleção de opções, sem misturar elementos que desviem a atenção da decisão principal.

---

## Quando usar

O componente Selection List deve ser usado quando é necessário apresentar um conjunto de opções de forma clara e acessível, permitindo que o usuário selecione uma ou várias delas diretamente na lista. Ele é ideal para situações em que a visualização completa das escolhas disponíveis é importante, como em filtros, preferências, configurações ou seleções que exigem comparação entre itens.

### Utilize para

* Quando o usuário precisa escolher um ou múltiplos itens em um conjunto limitado.
* Em fluxos de filtros, preferências ou configurações.
* Quando a clareza da lista completa é mais importante do que a economia de espaço.

### Não utilize para

* Para seleção de apenas uma opção simples em um espaço reduzido.
* Para escolhas binárias. Use Checkbox ou Switch.
* Quando há muitas opções extensas. Prefira mecanismos de busca, autocomplete ou combo box.

## Casos de uso

### Selection list vs Content list

Embora visualmente semelhantes, o **Content List** e o **Selection List** têm propósitos distintos. O **Content List** é voltado para a exibição de informações, permitindo a navegação ou visualização de conteúdos sem necessariamente envolver escolha de itens. Já o **Selection List** é específico para cenários de decisão, em que o usuário deve selecionar uma ou várias opções dentro da lista. Enquanto o primeiro prioriza a apresentação de conteúdo, o segundo prioriza a interação e a seleção.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. Selection list item
2. Divider

## Composição do componente

O componente Selection List é formado pela composição de múltiplos Selection List Items, organizados de maneira empilhada para criar a lista. Cada item é separado por dividers, garantindo a legibilidade e a distinção visual entre as opções.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` (sem espaço entre itens) ou `Card` (itens Card, espaço 8). |

O tipo de seletor (Checkbox, Radio Button, Switch, Tag, None) é escolhido nos itens (Trailing Item).

---

# Guidelines

## Acessibilidade

* A lista é um grupo com nome: o leitor de tela anuncia a pergunta antes das opções.
* Cada item é um controle nativo nomeado pela linha.
* A seleção não depende só da cor: o controle muda de estado.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Mantenha consistência no tipo de seleção dentro da lista, utilizando apenas um mesmo padrão (ex.: somente checkboxes). |
| Don't |   |   | Não misturare diferentes tipos de seletores (como checkbox e switch) dentro da mesma lista. |
| Do |   |   | Mantenha títulos curtos e claros, acompanhados de descrições objetivas. Isso ajuda o usuário a entender rapidamente o que está selecionando. |
| Don't |   |   | Evite títulos longos ou descrições excessivas que dificultem a leitura. Informações em excesso tornam a lista cansativa e confusa. |

---

## Pendências — não publicar

* 🔴 Propriedades: o zeroheight lista Trailing Item na lista; no set da lib (5488:1552) a lista só tem Kind — o Trailing Item é dos itens.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia.
* 🟡 Texto: "Não misturare" → "Não misture". Estilos tem "Icon Button", que não é opção da lib ("Icon").
