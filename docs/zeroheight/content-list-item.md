---
title: Content List Item
introduction: O Content list item é um bloco de conteúdo que organiza informações de forma clara e escaneável dentro de listas. Ele combina elementos como título, descrição, ícone, avatar ou status, ajudando o usuário a identificar rapidamente itens, conteúdos ou ações relacionadas.
---

# Specs

*Nomes alternativos comuns:* List item, Content row, List row.

## Princípios

* **Organização da informação** — Estruture os itens de forma clara e hierárquica, facilitando a leitura e compreensão dos conteúdos apresentados.
* **Consistência visual e funcional** — Mantenha o mesmo padrão de layout, espaçamento e comportamento entre os itens para garantir uma experiência uniforme.
* **Clareza de propósito** — Cada lista deve ter um objetivo bem definido — seja exibir informações, navegar ou mostrar transações — evitando misturar diferentes tipos de conteúdo.

---

## Quando usar

Use o Content list item quando precisar apresentar informações em formato de lista ou de forma isolada, com suporte a múltiplos elementos visuais (como ícones, status ou descrições adicionais) que ajudem na rápida identificação de conteúdo. Ele é ideal para navegação, agrupamento de dados ou exibição de opções que não dependem exclusivamente de seleção.

### Utilize para

* Exibir itens de conteúdo em listas navegáveis ou de forma isolada.
* Mostrar informações complementares em cada item (ex: título + subtítulo + ícone).
* Organizar conteúdos repetidos, como mensagens, documentos ou usuários.
* Estruturar visualmente grupos de dados com consistência.

### Não utilize para

* Criar seletores de opção (use Selection list item).
* Substituir botões de ação principais.
* Exibir apenas um único dado simples (use texto ou outro componente mais direto).
* Estruturar tabelas complexas (use Tables).

## Casos de uso

### Content list item vs Selection list item

Enquanto o **Selection list** item serve para escolhas (com estado de seleção), o **Content list** é focado em organizar e exibir informações, sem necessariamente permitir seleção direta.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. Text label
2. Lead Item
3. Text description
4. Trailing item
5. Divider

| Intent | Composição |
| --- | --- |
| Default | .Lead Item + .Text Content + .Trailing Item (padrão Checkbox) |
| Navigation | .Lead Item + .Text Content + Tag (Warning) + navigation-right-line |
| Transaction | Shaped Icon (Neutral, Small) + .Text Content + .Currency Content + navigation-right-line |

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` ou `Card`. |
| `Intent` | Variant | `Default` | `Default`, `Navigation` ou `Transaction`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Show Lead Item` | Boolean | `true` | Mostra o Lead Item. |
| `Show Trailing Item` | Boolean | `true` | Mostra o Trailing Item (Intent Default). |
| `Show Divider` | Boolean | `true` | Mostra o divisor. |
| `Show Navigation Indicator` | Boolean | `true` | Mostra a seta (Navigation e Transaction). |
| `Show Tag` | Boolean | `true` | Mostra a Tag (Navigation). |

---

# Guidelines

## Acessibilidade

* Itens que levam a outra tela são links; o nome é o Label e a descrição.
* Com controle no trailing, a linha repassa o clique ao controle nativo, que tem o nome do Label.
* A seta e o Lead Item são decorativos.
* No Transaction, o sinal de negativo precisa estar no texto, não só na cor.
* Contraste: Label 16,96:1 · descrição 8,24:1 · valor e seta 16,96:1.

## Diretrizes de uso

* **Ordenação:** Use a ordem dos itens para refletir prioridade ou relevância do conteúdo.
* **Variantes:** É permitido mesclar diferentes variantes de content list items (como itens de navegação ou ações diretas com toggle) dentro da mesma lista, desde que se observe alguns pontos:
    * Itens diferentes devem estar organizados de forma que o usuário entenda rapidamente a função de cada um.
    * O usuário deve entender de imediato se o item ativa uma ação direta (ex.: switch) ou se leva para outra tela.

Atenção: Quando a lista envolve seleção de opções (como em formulários ou preferências), evite misturar tipos de itens. Isso pode gerar dúvidas e comprometer a clareza da decisão do usuário.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use a variante de navegação quando o item de lista levar o usuário para telas específicas de edição ou consulta. |
| Don't |   |   | Não use a variante de navegação como indicação apenas de avanço no fluxo. |
| Do |   |   | Na variante Transaction, utilize sempre o padrão de formatação monetária: ponto (.) para separar milhares e vírgula (,) para os centavos. |
| Don't |   |   | Não utilize outra formatação monetária, como ponto (.) para separar os centavos, ou até mesmo cortar os centavos. |

---

## Pendências — não publicar

* 🔴 Propriedades desatualizadas no zeroheight: "Show Lead Icon" e "Show Trailing Icon" → Show Lead Item e Show Trailing Item; faltam Show Navigation Indicator e Show Tag; Estilos chama o Intent de "Role".
* 🔴 A seção Motion está com o texto modelo e a tabela vazia.
* 🟡 Status "Backlog".
