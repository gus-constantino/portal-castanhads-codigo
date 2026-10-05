---
title: Slider
introduction: Slider de seleção de valor num intervalo.
---

# Specs

Slider de seleção de valor num intervalo. Kind=Single (um thumb) ou Range (dois thumbs: Mínimo e Máximo). State cobre Enabled/Hovered/Pressed/Dragged/Disabled. Value é um eixo de variante apenas para prototipação do design (posições representativas: 0/50/100 e faixas do range); na implementação o valor é um prop numérico em runtime. Show Stops exibe as marcas de step; Show Value Indicator exibe a bolha de valor sobre o thumb.

---

## Quando usar

### Utilize para

* Escolher um valor aproximado num intervalo contínuo, em que a posição importa mais que o número exato (ex.: limite de gasto).
* Definir uma faixa com mínimo e máximo, como em filtros de valor (Range).
* Ajustes que a pessoa quer ver mudar enquanto arrasta.

### Não utilize para

* Valores exatos ou longos (CPF, valor de transferência) — use o **Text Input**.
* Poucas unidades por vez — use o **Quantity Input**.
* Opções sem ordem — use **Radio Button** ou **Select Input**.

## Casos de uso

### Slider vs Quantity Input

O Slider mostra a posição dentro do intervalo e serve para ajustes rápidos e aproximados. O Quantity Input serve para ajustar poucas unidades com precisão, vendo o número exato.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

**Single** — 1. Trilha ativa · 2. Trilha inativa · 3. Thumb (24) · 4. Value Indicator · 5. Stops

**Range** — 1. Thumb Mínimo · 2. Thumb Máximo

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Single` | `Single` ou `Range`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed`, `Dragged` ou `Disabled`. |
| `Value` | Variant | `0` | Só para prototipação (`0`, `50`, `100`, `00/00`, `-20/+20`, `-50/+50`). |
| `Show Stops` | Boolean | `true` | Mostra as marcas de step. |
| `Show Value Indicator` | Boolean | `true` | Mostra a bolha de valor sobre o thumb. |

---

# Guidelines

## Acessibilidade

Acessibilidade: cada thumb é role=slider com aria-valuemin/max/now (aria-valuetext quando o valor exibido não for o número cru); no Range, dois nomes acessíveis (Mínimo/Máximo) e thumbs que não se cruzam. Alvo de toque do thumb 24×24 (WCAG 2.5.8).

* Teclado: setas ±1 step · PageUp/PageDown ±10 steps · Home/End vão ao mínimo e ao máximo.
* Contraste: thumb e trilha ativa 4,54:1 · valor na bolha 8,24:1 · trilha inativa 1,11:1.

## Diretrizes de uso

* Diga em texto o que o Slider controla e mostre os extremos do intervalo quando não forem óbvios.
* Use Stops quando o step for grande; esconda quando o intervalo for contínuo.
* No Range, os thumbs não se cruzam.
* Não use o Slider como único caminho para valores exatos.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use para escolher um valor aproximado num intervalo, vendo a posição. |
| Don't |   |   | Não use para valores exatos e longos — use o Text Input. |

---

## Pendências — não publicar

* 🔴 Página nova: o Slider não tem página no zeroheight nem [Documentation]. Sobre, Propriedades e Acessibilidade vêm literais da description do set (20056:11908); o resto precisa de revisão.
* 🟡 Contraste: a trilha inativa (Surface/01) tem 1,11:1 sobre Surface/default.
* 🟡 Sem especificação de Motion (hover, pressed, arrastar).
