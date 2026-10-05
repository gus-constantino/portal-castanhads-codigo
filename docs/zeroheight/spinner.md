---
title: Spinner
introduction: O Spinner é um indicador visual de atividade não interativa que informa à pessoa usuária que o sistema está processando uma ação em segundo plano.
---

# Specs

O Spinner é um indicador visual de atividade não interativa que informa à pessoa usuária que o sistema está processando uma ação em segundo plano. Representa carregamentos em que não é possível determinar a duração.

*Nomes alternativos comuns:* Loading indicator, Loading spinner, Indicador de carregamento.

## Princípios

* **Clareza de estado** — Comunica de imediato que há um processo em execução.
* **Discrição visual** — Informa sem competir com o conteúdo.
* **Coerência temporal** — Aparece só enquanto a atividade está em andamento.

---

## Quando usar

Use o Spinner quando o tempo do processamento não pode ser estimado, mas é preciso sinalizar que a ação foi recebida e está em andamento.

### Utilize para

* Indicar carregamento de dados sem duração conhecida.
* Sinalizar processos breves que não justificam um Skeleton ou barra de progresso.
* Ações de envio, busca ou processamento que bloqueiam temporariamente parte da interface.
* Mostrar que o sistema está ativo e não travado.

### Não utilize para

* Processos longos e previsíveis — use a **Progress line**.
* Substituir conteúdo estruturado sendo carregado — use Skeleton.
* Situações em que a pessoa precisa saber quanto tempo falta.

## Spinner vs. Skeleton vs. Progress line

|   | Spinner | Skeleton | Progress line |
| --- | --- | --- | --- |
| **Mostra** | Atividade contínua | Estrutura do conteúdo futuro | Progresso mensurável |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Progress indicator** *(obrigatório)* — arco que gira.
2. **Circle track** *(obrigatório)* — anel de fundo.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Accent`, `Neutral` ou `Inversed`. |
| `Size` | Variant | `Small` | `Small` (16), `Medium` (24) ou `Large` (32). |
| `Spinner Position` | Variant | `0` | Quadro da animação (`0` a `3`), usado no protótipo. |

> A propriedade antiga `Style` foi substituída por `Appearance`.

---

# Guidelines

## Acessibilidade

* É anunciado como status (`role="status"`), com um texto que diga o que carrega (ex.: "Carregando extrato").
* O desenho é decorativo.
* Ao terminar, remova o Spinner e mostre o conteúdo ou o resultado.

## Diretrizes de uso

* **Utilize o spinner apenas quando houver bloqueio temporário da ação:** ele reforça que a ação foi recebida e evita cliques repetidos.

---

## Pendências — não publicar

* 🟡 Motion: Carregamento com expressive/default · extra-long/02 em loop não corresponde a nenhum Motion Style (loops não têm estilo próprio). No playground, o giro usa 4 passos de short/04.
* 🟡 O Skeleton citado nos casos de uso não existe no Castanha DS.
