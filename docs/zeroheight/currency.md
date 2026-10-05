---
title: Currency
introduction: O Currency é um componente de exibição utilizado para apresentar valores monetários de forma padronizada, legível e consistente nas interfaces da Caju.
---

# Specs

O Currency é um componente de exibição utilizado para apresentar valores monetários de forma padronizada, legível e consistente nas interfaces da Caju.

*Nomes alternativos comuns:* Valor monetário, Monetary value, Amount.

## Princípios

* **Clareza** — O valor deve ser facilmente identificado e lido pela pessoa usuária.
* **Consistência** — A apresentação padronizada de moeda em diferentes contextos da interface.
* **Privacidade** — Possibilidade de ocultar valores sensíveis quando necessário.

---

## Quando usar

Use o Currency sempre que for necessário exibir valores monetários em telas de produto, como saldos, preços, limites, totais, resumos financeiros ou confirmações.

### Utilize para

* Exibir saldos, preços e totais financeiros.
* Mostrar valores associados a benefícios, cartões ou transações.
* Apresentar valores em estados visíveis ou ocultos.

### Não utilize para

* Entrada de dados financeiros — use o **Text input**.
* Exibição de números não monetários.
* Simulações visuais que não representem valores reais.

## Currency vs. Text input

|   | Currency | Text input |
| --- | --- | --- |
| **Uso** | Só exibição | Edição e interação |
| **Conteúdo** | Informação final ou informativa | Dado digitado pela pessoa |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Currency label** *(obrigatório)* — símbolo da moeda e valor; oculto, o valor vira 5 pontos.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Neutral` ou `Inversed` (fundos escuros). |
| `Size` | Variant | `Small` | `Small`, `Medium`, `Large` ou `Largest`. |
| `Show Value` | Variant | `True` | `False` oculta o valor com pontos. |

> As propriedades antigas `Style` e `Is hidden` foram substituídas por `Appearance` e `Show Value`.

---

# Guidelines

## Acessibilidade

* Visível, o valor é lido como texto: símbolo e valor.
* Oculto, os pontos são decorativos e o leitor de tela ouve "R$ valor oculto".
* O controle de mostrar e ocultar precisa de rótulo claro, como "Mostrar saldo".
* Contraste: Neutral 16,96:1 (AA e AAA); Inversed sobre `Surface/accent` 4,54:1 (AA).

## Diretrizes de uso

* **Uso correto do estado oculto:** ative a opção de ocultação para valores sensíveis em contextos de privacidade, garantindo que a pessoa usuária reconheça que existe um valor, mesmo sem visualizá-lo.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Utilize o Currency para apresentar valores finais, como saldos ou preços, garantindo formatação monetária consistente e legível. |
| Don't |   |   | Não utilize o Currency para textos comuns que não representem valores monetários. |

---

## Pendências — não publicar

* 🔴 Propriedades: a página lista `Style` e `Is hidden` (Boolean); na lib (Currency 5301:2173) são `Appearance` e `Show Value` (Variant, padrão `True`).
* 🟡 Motion: Mostrar e Ocultar com expressive/decelerate · short/01 não correspondem a nenhum Motion Style; a animação não está no componente do playground. Definir o Motion Style.
* 🟡 Typo corrigido no Do/Don't: "representes" → "representem".
