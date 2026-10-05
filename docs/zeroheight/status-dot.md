---
title: Status dot
introduction: Sinalize o estado de um item em linha, com um ponto colorido e um rótulo em texto.
---

# Specs

Indicador compacto de estado, formado por um ponto colorido e um rótulo em texto. Aparece dentro de linhas de conteúdo, sem o peso visual de um container preenchido.

---

## Quando usar

### Utilize para

* Estado em linha: sinalizar o estado de um item dentro de uma tabela, lista ou cabeçalho de card.
* Leitura em série: quando vários itens exibem estados diferentes e precisam ser comparados rapidamente.

### Não utilize para

* Destaque próprio — se o estado precisa de fundo e contorno, use a **Tag**.
* Contagem de notificações — use o **Badge**.
* Categorização — use a **Tag**.
* Ação — o componente não é clicável; use um **Botão**.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Ponto** *(obrigatório)* — reforço visual.
2. **Text Label** *(obrigatório)* — carrega a informação.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Neutral`, `Positive`, `Warning`, `Informative` ou `Negative`. |
| `Size` | Variant | `Small` | `Small`, `Medium` ou `Large`. |
| `Text Label` | String | `"Label"` | Nome do estado. |

---

# Guidelines

## Acessibilidade

* O ponto é decorativo; o estado é lido pelo Label.
* Contraste do Label: 16,96:1 (AA e AAA).

## Diretrizes de uso

* **Rótulo que nomeia o estado:** escreva o status por extenso no label. O ponto é reforço visual, não o portador da informação.
* **Texto curto:** uma ou duas palavras.

---

## Pendências — não publicar

* 🟡 Página nova: texto da description do set na lib (Status Dot 21745:69).
* 🟡 Categoria sugerida: `Componentes > Status`.
