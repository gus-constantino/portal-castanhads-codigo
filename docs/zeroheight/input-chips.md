---
title: Input chips
introduction: Chip que mostra um valor escolhido e pode ser removido com um clique.
---

# Specs

O Input Chip representa um valor que a pessoa escolheu ou digitou (uma categoria, um e-mail, um filtro aplicado) e que pode ser removido. O chip inteiro é o botão de remover; o close-line à direita indica a ação.

Os Input Chips aparecem em grupo, dentro do **Chips Group**, perto do campo ou do filtro que os gerou.

---

## Quando usar

### Utilize para

* Mostrar os filtros aplicados, com a opção de remover cada um.
* Mostrar valores escolhidos num campo de múltipla escolha (ex.: destinatários).

### Não utilize para

* Ligar e desligar filtros que continuam na tela — use o **Filter Chip**.
* Status ou categorias só informativas, sem remover — use **Tag** ou **Badge**.
* Ações — use um **Main Button**.

## Casos de uso

### Input Chip vs Tag

A Tag só informa (status, categoria) e não tem interação. O Input Chip é interativo: existe para ser removido.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** — pill, com borda.
2. **Lead Icon**
3. **Label**
4. **Close Icon** — close-line.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Show Lead Icon` | Boolean | `true` | Mostra o ícone à esquerda. |
| `Text Label` | String | `"Label"` | Texto do chip. |
| `Icon` | Instance swap | `placeholder-line` | Ícone à esquerda. |

---

# Guidelines

## Acessibilidade

* O chip inteiro é um botão com o nome "Remover" + Label (ex.: "Remover Alimentação").
* O alvo de clique é o chip de 40px, não o ícone de 16px (WCAG 2.5.8).
* `Tab` leva ao chip; `Enter` ou `Espaço` removem.
* Os ícones são decorativos.
* Depois de remover, leve o foco para o próximo chip (ou para o campo, se não sobrar nenhum).

### Contraste

* Label e ícones: 7,42:1 — AA e AAA.

## Diretrizes de uso

* Use o mesmo texto do valor escolhido, curto.
* Quando houver muitos chips, ofereça "Limpar tudo".
* Não peça confirmação para remover um chip; a ação é fácil de desfazer escolhendo de novo.

## Motion

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | Hover In/01 |
| Hovered → Pressed | While pressing | Pressed/01 |

---

## Pendências — não publicar

* 🔴 Página nova: os Chips não têm página no zeroheight, nem seção [Documentation], nem description no set (12365:2728). Todo o texto precisa de revisão do time.
* 🔴 Contraste: borda (Border/semi-soft) 1,25:1 e Hovered (Border/medium) 2,78:1 sobre Surface/default.
* 🟡 Foco depois de remover: o componente não move o foco; hoje fica a cargo de quem usa.
* 🟡 Motion: transições em systemic/accelerate · short/03 (não bate com nenhum Motion Style); sem especificação para a saída do chip.
