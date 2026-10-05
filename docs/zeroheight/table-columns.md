---
title: Table Columns
introduction: As Table Columns são os mesmos elementos usados na composição do componente Table, e devem ser utilizadas de forma isolada apenas quando o componente completo de Table não atender ao caso de uso.
---

# Specs

## Quando usar

O componente Table Column deve ser utilizado apenas em **casos que exigem 9 ou mais colunas**, quando o componente padrão de Table, limitado a até 8 colunas, não é suficiente para atender ao caso de uso.

Caso a sua tabela possua 8 colunas ou menos, utilize o componente Table.

### Utilize para

* Criar tabelas com **mais** de 8 colunas.

### Não utilize para

* Criar tabelas com 8 colunas ou menos. Neste caso, utilize a Table.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

Cada coluna é um **.Head** (56 de altura) com as **.Data Cell** (64) embaixo. As propriedades estão na página da Table.

---

# Guidelines

## Diretrizes de uso

* **Alinhamento:** Ao agrupar as colunas para formar a tabela, não deve haver espaçamento (gap) entre elas. Mantenha sempre o valor zero para garantir continuidade visual e alinhamento preciso.
* **Colunas:** **Nunca utilize** o componente Table Column isoladamente. Ele deve ser sempre combinado com outras colunas para compor uma tabela completa seguindo as diretrizes desta documentação.

### Células

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Caution |   |   | Evite mesclar diferentes tipos de células em uma mesma coluna, a menos que seja realmente necessário. Essa prática pode comprometer a legibilidade e sobrecarregar visualmente o conteúdo — mantenha a consistência do tipo de informação em cada coluna sempre que possível. |
| Don't |   |   | Não utilize Table Columns quando o número de colunas for menor que 8. Nesses casos utilize o componente Table. |

---

## Pendências — não publicar

* 🟡 No código não há limite de 8 colunas: a Table recebe as colunas por propriedade (`.columns`) e aceita qualquer número. O limite é do componente do Figma.
* 🟡 "menor que 8" (Don't) × "8 colunas ou menos" (Quando usar): com exatamente 8 colunas, qual usar?
* 🟡 Status "In progress"; Aplicações vazias.
