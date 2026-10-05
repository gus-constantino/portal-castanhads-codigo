---
title: Table
introduction: O componente de Tabela organiza dados estruturados em colunas e linhas, facilitando a leitura, comparação e análise. É ideal para exibir informações com formato uniforme, como listas, transações ou relatórios.
---

# Specs

*Nomes alternativos comuns:* Data table, Table grid, Data grid.

---

## Quando usar

Use o componente de Table para exibir dados estruturados que compartilham o mesmo formato, como listas de usuários ou registros. Tables funcionam bem com grandes volumes de dados, oferecendo clareza e eficiência na leitura.

### Utilize para

* Quando há grandes volumes de dados que precisam ser exibidos de forma estruturada.
* Para permitir a comparação direta entre múltiplos itens.
* Quando os dados possuem campos recorrentes e bem definidos (ex: nome, situação, valor).
* Se houver necessidade de ordenar, filtrar ou buscar informações rapidamente.

### Não utilize para

* Se a informação pode ser apresentada de forma mais simples, como listas curtas ou resumos.
* Quando há poucos dados (1 ou 2 linhas), que podem ser apresentados diretamente em um card ou outro componente.
* Em interfaces mobile, onde a leitura tabular compromete a usabilidade — nesse caso, considere uma visualização adaptada.
* Para conteúdos altamente visuais ou não estruturados.

## Casos de uso

### Table vs Card

A **Table** é ideal para comparar **grandes volumes de dados estruturados** com foco em eficiência e leitura rápida. Já o **Card** é melhor para **destacar conteúdos individualmente**, com apelo visual e leitura isolada. Enquanto a tabela organiza, o card valoriza a apresentação.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **.Toolbar** — ações da tabela.
2. **.Head** — título da coluna, ordenação.
3. **.Data Cell** — Text, Balance, Percentage, Tag, Link ou Action Controls.
4. **Coluna de seleção** — Checkbox.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` ou `Empty` (falha ao carregar, com ação de recarregar). |
| `Show Toolbar` | Boolean | `true` | Mostra o .Toolbar. |
| `Show Pagination` | Boolean | `true` | Mostra a Pagination. |
| `Table Columns` | Slot | — | As colunas (.Head + .Data Cell). |

### .Head

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` ou `Multi Selection`. |
| `Sort` | Variant | `Default` | `Default`, `Up` ou `Down`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered` ou `Pressed`. |
| `Text Head` | String | `"Head"` | Título da coluna. |
| `Show Heading Text` | Boolean | `true` | Mostra o título. |

### .Data Cell

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Text` | `Text`, `Balance`, `Percentage`, `Tag`, `Checkbox`, `Link` ou `Action Controls`. |
| `State` | Variant | `Enabled` | `Enabled` ou `Hovered`. |
| `Text` | String | `"Text content"` | Texto principal. |
| `Description` | String | `"Description"` | Texto de apoio. |
| `Show Description` | Boolean | `true` | Mostra a descrição. |
| `Value` | String | `"1.000,00"` | Valor (Balance). |
| `Percentual` | String | `"0,00"` | Percentual (Percentage). |

---

# Guidelines

## Acessibilidade

* É uma tabela de verdade: o leitor de tela anuncia linhas, colunas e o cabeçalho de cada célula.
* A tabela tem uma legenda que dá o nome.
* Colunas ordenáveis têm o título como botão e informam a ordem (crescente, decrescente ou nenhuma).
* A coluna de seleção usa Checkboxes; o do cabeçalho marca ou desmarca todas as linhas da página.
* Contraste: títulos 15,27:1 · texto 16,96:1 · descrição 8,24:1.

## Diretrizes de uso

* **Ordenação:** Permita a ordenação apenas em colunas onde a ação é útil e compreensível. Nem toda coluna precisa ser ordenável (ex: colunas com ações ou conteúdo visual).
* **Seleção:** A coluna de seleção (checkbox) deve ser exibida apenas uma vez por tabela e posicionada sempre como a primeira coluna à esquerda. Isso garante consistência visual, facilita a seleção em massa e melhora a usabilidade.
* **Colunas numéricas:** Colunas com valores numéricos devem ser sempre alinhadas à direita. Esse alinhamento facilita a comparação entre números, especialmente quando há casas decimais ou valores com diferentes dígitos, promovendo uma leitura mais precisa e organizada.
* **Colunas Textuais:** Colunas com textos devem ser sempre alinhadas à esquerda. Isso favorece a leitura natural do conteúdo, especialmente em idiomas que seguem o fluxo da esquerda para a direita, além de manter a consistência visual com outros elementos textuais da interface.

### Comportamento — Ordenação

O ícone de ordenação deve permanecer oculto por padrão, aparecendo apenas no hover da coluna, independentemente do estado da ordenação. Ao clicar em uma coluna ordenável, a ordenação inicia em ordem decrescente, com o ícone exibido como ActiveUp. Um segundo clique altera para ordem crescente, mudando o ícone para ActiveDown. No terceiro clique, a ordenação volta ao estado padrão da tabela e o ícone retorna ao status Default — mas ainda assim, só será visível no hover.

### Quando usar

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use tabela para exibir dados estruturados e comparáveis. |
| Don't |   |   | Não use tabela para poucos dados ou conteúdos não comparáveis — prefira listas ou cards. |

### Título

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use títulos claros nos headers das colunas. |
| Don't |   |   | Não use títulos vagos, abreviações confusas ou sem contexto. |

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Seja descritivo quando um campo estiver vazio ou desconhecido. |
| Don't |   |   | Não use “--” para representar campos nulos ou desconhecidos. |

---

## Pendências — não publicar

* 🟡 Ordenação (decidido em 05/10: vale o comportamento do código): 1º clique crescente (Up), 2º decrescente (Down), 3º volta ao padrão, e o ícone fica visível enquanto a coluna está ordenada (mostra qual coluna ordena a tabela, inclusive para quem não usa mouse). Atualizar o parágrafo de ordenação desta página nesse sentido (e o nome ActiveUp/ActiveDown × Up/Down da lib).
* 🟡 Status "In progress"; sem tab Style, sem Acessibilidade e sem Motion. Anatomia e Propriedades vieram dos sets da lib (13472:5725, 13382:1327, 13404:1015, 13438:14337).
* 🟡 O cabeçalho da página aponta para um arquivo do Figma de outro projeto (Fr0ZkhpffyOiiQYEm2RPId).
