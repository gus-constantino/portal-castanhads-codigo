---
title: Caju Card
introduction: O Caju Card simula visualmente os diferentes tipos de cartões da Caju nos cenários físicos e virtuais seguindo as diretrizes das lojinhas de app.
---

# Specs

Mostra a frente ou o verso do cartão, na vertical ou na horizontal, com os dados (número, validade, CVV, código de ativação) trocados por propriedade. Is Blocked cobre o cartão com um Backdrop e um cadeado.

---

## Quando usar

### Utilize para

* Mostrar o cartão da pessoa na tela do cartão (físico, virtual, corporativo ou voucher).
* Indicar que o cartão está bloqueado.
* Mostrar o verso com o código de ativação, no fluxo de desbloqueio.

### Não utilize para

* Ilustrar cartões em telas de marketing ou onboarding — use as ilustrações de cartão do [Caju] Illustrations.
* Cartões que não são da Caju.
* Representar o cartão em listas pequenas — use um ícone ou o Shaped Icon.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Arte do cartão** — frente ou verso, com os dados.
2. **Is Blocked** — Backdrop + cadeado (lock-line).

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Físico` | `Físico`, `Virtual/Credito`, `Voucher`, `Virtual/Credito Corporativo` ou `Físico Corporativo`. |
| `Orientation` | Variant | `Vertical` | `Horizontal` ou `Vertical`. |
| `Is Blocked` | Variant | `False` | `True` mostra o cartão bloqueado. |
| `Side View` | Variant | `Front` | `Front` ou `Back`. |
| `Full Card Number` | String | `"1234 5678 0009 0001"` | Número do cartão. |
| `CVV` | String | `"123"` | Código de segurança. |
| `Expiration Date` | String | `"10/30"` | Validade. |
| `Activation Code` | String | `"000 000 000 000 000"` | Código de ativação (verso). |

---

# Guidelines

## Acessibilidade

* O cartão é uma imagem com nome que diz o tipo, o lado e o final do número ("Cartão Caju Físico, final 0001"); bloqueado, acrescenta "bloqueado".
* Os dados completos não são lidos. Mostre número completo, CVV e código de ativação só quando a pessoa pedir.
* O cartão não é interativo; ações ficam em botões ao lado.

## Diretrizes de uso

* Use o Kind que corresponde ao cartão real da pessoa.
* Ao mostrar o cartão bloqueado, explique ao lado como desbloquear.
* Não altere as cores, a marca ou a proporção da arte.

---

## Pendências — não publicar

* 🔴 Página nova: o Caju Card não tem página no zeroheight nem [Documentation]. Só a introdução é texto do time (description do Figma, 17053:1181).
* 🟡 Nem toda combinação Kind × Orientation × Side View existe no Figma (C74).
* 🟡 Grafia: "Virtual/Credito" sem acento nos nomes das variantes.
* 🟡 Sem especificação de Motion (virar o cartão, bloquear).
