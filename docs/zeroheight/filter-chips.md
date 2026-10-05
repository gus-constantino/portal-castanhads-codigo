---
title: Filter chips
introduction: Chip que liga e desliga um filtro — selecionado, troca o ícone pelo check e inverte as cores.
---

# Specs

O Filter Chip é um botão de liga/desliga para filtros rápidos. Cada clique alterna Is Selected: selecionado, o Lead Icon vira o check-line e o chip fica com o fundo invertido. Vários chips podem ficar selecionados ao mesmo tempo.

Os Filter Chips aparecem em grupo, dentro do **Chips Group**, logo acima do conteúdo que filtram.

---

## Quando usar

### Utilize para

* Filtros rápidos e visíveis sobre uma lista, tabela ou extrato (ex.: categorias de benefício).
* Poucas opções curtas, que cabem numa ou duas linhas.

### Não utilize para

* Filtros complexos, com vários campos — use o **Filter Button** com Drawer ou Bottom Sheet.
* Ações (salvar, enviar) — use um **Main Button**.
* Mostrar valores já escolhidos que a pessoa pode remover — use o **Input Chip**.
* Escolhas de formulário — use **Checkbox** ou **Radio Button**.

## Casos de uso

### Filter Chip vs Input Chip

O Filter Chip liga e desliga um filtro e continua na tela. O Input Chip mostra um valor já escolhido; clicar nele remove o chip.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** — pill.
2. **Lead Icon** — vira check-line quando selecionado.
3. **Label**

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Is Selected` | Variant | `False` | `True` quando o filtro está ligado. |
| `Show Lead Icon` | Boolean | `true` | Mostra o ícone à esquerda. |
| `Text Label` | String | `"Label"` | Texto do chip. |
| `Icon` | Instance swap | `placeholder-line` | Ícone à esquerda. |

---

# Guidelines

## Acessibilidade

* Cada chip é um botão que anuncia o nome e se está selecionado.
* `Tab` leva ao chip; `Enter` ou `Espaço` alternam a seleção.
* A seleção não depende só da cor: o ícone vira o check-line.
* Os ícones são decorativos; o nome vem do Label.
* Em grupo, dê um nome ao Chips Group (ex.: "Filtrar por categoria").

### Contraste

* Label e ícone: 7,42:1 — AA e AAA.
* Selecionado: 16,96:1 — AA e AAA.

## Diretrizes de uso

* Labels curtos, de uma ou duas palavras, com a primeira letra maiúscula.
* Aplique o filtro na hora, sem botão de confirmar.
* Mantenha a ordem dos chips fixa; não reordene ao selecionar.
* Mostre um jeito de limpar todos os filtros quando houver vários selecionados.

## Motion

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | Hover In/01 |
| Hovered → Pressed | While pressing | Pressed/01 |
| Pressed → Is Selected | On click | Pressed/01 |

---

## Pendências — não publicar

* 🔴 Página nova: os Chips não têm página no zeroheight, nem seção [Documentation], nem description no set (12365:2744). Todo o texto precisa de revisão do time.
* 🟡 Motion: no Figma as transições usam systemic/accelerate · short/03, que não bate com nenhum Motion Style (Hover In/01 = systemic/default · short/03; Pressed/01 = systemic/accelerate · short/04).
* 🟡 Contraste: sem seleção, o chip não tem borda — fundo 1,11:1 e borda do Hovered 2,78:1 sobre Surface/default.
