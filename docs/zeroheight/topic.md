---
title: Topic
introduction: Apresente um tópico com ícone ou imagem, título e descrição.
---

# Specs

O Topic apresenta um item de conteúdo com um .Lead item (Shaped Icon ou imagem), um título e uma descrição. Em lista, organiza benefícios, etapas ou características lado a lado ou empilhados.

---

## Quando usar

Use para apresentar tópicos curtos com apoio visual.

### Utilize para

* Listar benefícios ou características de um produto.
* Explicar etapas ou pontos de um onboarding.
* Apresentar tópicos curtos com apoio visual.

### Não utilize para

* Itens clicáveis ou de navegação — use o **Content List Item**.
* Opções selecionáveis — use o **Selection List Item**.
* Textos longos — prefira parágrafos.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **.Lead item** *(opcional)* — Shaped Icon Accent (Small) ou Image 1:1.
2. **Title** *(opcional)* — `Heading/Small`.
3. **Description** *(obrigatório)* — `Body/Regular`.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Orientation` | Variant | `Horizontal` | `Horizontal` (lado a lado) ou `Vertical` (empilhado). |
| `Show Lead item` | Boolean | `true` | Mostra o .Lead item. |
| `Show Title` | Boolean | `true` | Mostra o título. |
| `Text Title` | String | `"Title"` | Texto do título. |
| `Text Description` | String | `"Lorem Ipsum is simply dummy…"` | Texto da descrição. |

---

# Guidelines

## Acessibilidade

* O Shaped Icon é decorativo. Imagem com informação precisa de texto alternativo.
* Em grupo, use uma lista para o leitor anunciar a quantidade de itens.
* Contraste: título 16,96:1 e descrição 8,24:1 (AA e AAA).

## Diretrizes de uso

* Em lista, use a mesma `Orientation` e o mesmo tipo de .Lead item em todos os Topics.
* Título com poucas palavras e descrição de até duas linhas.

---

## Pendências — não publicar

* 🟡 Página nova: texto escrito a partir do set da lib (Topic 15621:1175) e do playground, sem texto do time. Revisar Specs e Diretrizes.
* 🟡 Categoria sugerida: `Componentes > Content`.
* 🟡 O padrão de `Text Description` no set é lorem ipsum; trocar por um exemplo real.
