---
title: Chips group
introduction: Container que organiza Filter Chips ou Input Chips em uma linha com rolagem ou em várias linhas.
---

# Specs

O Chips Group reúne chips do mesmo tipo (**Filter Chips** ou **Input Chips**) com espaço de 8 entre eles. Em Single Rows Chips, os chips ficam numa linha que rola na horizontal; em Multiple Rows Chip, quebram linha.

O grupo só organiza: cores, estados e eventos são dos chips.

---

## Quando usar

### Utilize para

* Agrupar Filter Chips sobre uma lista, tabela ou extrato.
* Mostrar os Input Chips de valores escolhidos ou filtros aplicados.

### Não utilize para

* Misturar Filter Chips e Input Chips no mesmo grupo.
* Um chip só — use o chip direto.

## Casos de uso

### Single Rows Chips vs Multiple Rows Chip

Use Single Rows Chips no mobile e em espaços baixos, quando a lista pode rolar; use Multiple Rows Chip quando todos os chips precisam ficar visíveis.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** — Slot, gap 8, largura 320.
2. **Chips** — Filter Chips ou Input Chips.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Input Chips` | `Input Chips` ou `Filter Chips`. |
| `Role` | Variant | `Single Rows Chips` | `Single Rows Chips` (rolagem) ou `Multiple Rows Chip` (quebra linha). |
| `Slot` | Slot | — | Os chips do grupo. |

---

# Guidelines

## Acessibilidade

* O grupo é anunciado como grupo, com um nome (ex.: "Filtrar por categoria").
* `Tab` passa de chip em chip; em Single Rows Chips, o chip com foco entra na área visível pela rolagem.
* Cada chip mantém o próprio comportamento.

## Diretrizes de uso

* Sempre dê um nome ao grupo.
* Coloque o grupo logo acima do conteúdo que ele filtra.

---

## Pendências — não publicar

* 🔴 Página nova: o Chips Group não tem página no zeroheight, nem seção [Documentation], nem description no set (12457:3664). Todo o texto precisa de revisão do time.
* 🟡 Nomes das variantes no Figma: "Single Rows Chips" × "Multiple Rows Chip" (plural/singular).
