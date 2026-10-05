---
title: NPS Score
introduction: O NPS Score é um componente de seleção única utilizado para capturar a percepção da pessoa usuária em relação a uma experiência, produto ou serviço, geralmente em uma escala numérica de 0 a 10.
---

# Specs

*Nomes alternativos comuns:* Escala de satisfação, Rating numérico, NPS selector

## Princípios

* **Clareza de escolha** — A escala deve ser apresentada de forma linear e compreensível, permitindo que a pessoa usuária identifique rapidamente o intervalo de resposta e tome uma decisão sem ambiguidade.
* **Rapidez de interação** — O componente deve possibilitar uma seleção ágil, reduzindo esforço cognitivo e facilitando respostas rápidas em fluxos de pesquisa.
* **Feedback imediato** — Ao selecionar um valor, o estado ativo deve ser claramente indicado, garantindo que a pessoa usuária entenda sua escolha antes de prosseguir.

---

## Quando usar

Utilize o NPS Score quando for necessário medir a satisfação ou lealdade da pessoa usuária por meio de uma escala numérica direta, especialmente em pesquisas rápidas ou momentos de feedback pontual ao longo da jornada.

### Utilize para

* Coletar satisfação geral de um produto ou serviço
* Medir probabilidade de recomendação (NPS)
* Avaliar experiências específicas dentro de um fluxo

### Não utilize para

* Coletas qualitativas ou abertas
* Seleções com múltiplas opções
* Cenários que exigem explicação detalhada da escolha

## Casos de uso

### NPS Score vs CSAT Score

O NPS Score mede lealdade e intenção de recomendação em uma escala de 0 a 10, com visão mais estratégica. Já o CSAT Score mede satisfação imediata sobre uma experiência específica, usando escalas mais curtas. Enquanto o NPS foca no longo prazo, o CSAT é mais sensível a percepções pontuais.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. NPS Value
2. NPS Selected Value

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled` ou `Disabled`. |
| `Selected Value` | Variant | `None` | `None` ou `0` a `10`. |

### .Value Item

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered` ou `Pressed`. |
| `Status` | Variant | `Unselected` | `Unselected` ou `Selected`. |

---

# Guidelines

## Acessibilidade

* É um grupo de opções com nome: use a própria pergunta como nome.
* `Tab` entra no grupo; as setas trocam o valor; cada opção é anunciada como "n de 10".
* Explique os extremos em texto perto da escala ("0 = nada provável, 10 = muito provável").
* Contraste: número 7,42:1 (não selecionado) e 4,54:1 (selecionado).

## Diretrizes de uso

* **Associe a uma pergunta clara:** Sempre utilize o componente acompanhado de uma pergunta objetiva, garantindo que a pessoa usuária compreenda exatamente o que está sendo avaliado.
* **Evite sobrecarga visual:** Mantenha o componente isolado de outros elementos interativos próximos para não competir por atenção e preservar a clareza da escolha.

---

## Pendências — não publicar

* 🔴 Propriedades: o zeroheight lista "Select value" de 1 a 10; na lib (10100:848) é Selected Value, com None e 0 a 10.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia.
* 🟡 Sem Do's and Don'ts e com Aplicações vazias.
