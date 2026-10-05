---
title: Modal date picker
introduction: Calendário num Modal, com Cancelar e Confirmar — a data só vale depois de confirmada.
---

# Specs

O Modal Date Picker é um **Modal** com o **Date Picker** dentro: título "Selecione uma data", o calendário e o rodapé com Cancelar e Confirmar. A data só é aplicada no Confirmar; Cancelar, Esc e o Backdrop descartam a escolha.

É só para desktop: em mobile e tablet, o componente é coberto pelo Viewport Restriction, como no Figma.

---

## Quando usar

### Utilize para

* Escolher uma data ou intervalo que muda algo importante e precisa de confirmação (ex.: período de um relatório).
* Filtros de data em telas do Portal (desktop).

### Não utilize para

* Campos de data em formulários — use o **Date Input**.
* Telas mobile — use o Date Input ou um **Bottom Sheet**.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **.Header** — "Selecione uma data", sem Close Button nem Divider.
2. **Date Picker**
3. **.Footer Horizontal** — Cancelar · Confirmar.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Single Calendar` | `Single Calendar` ou `Double Calendar`. |
| `Role` | Variant | `None Selected` | `None Selected`, `Single Date Select` ou `Range Date Select`. |

---

# Guidelines

## Acessibilidade

* É um Modal: o foco fica preso dentro dele, `Esc` fecha (descartando) e o foco volta para quem abriu.
* O título "Selecione uma data" é o nome do diálogo.
* O calendário segue o teclado do Date Picker.
* Confirmar e Cancelar são Main Buttons; a data só muda no Confirmar.

## Diretrizes de uso

* Abra no mês da data já escolhida.
* Mantenha os rótulos Cancelar e Confirmar (ou um verbo que diga a ação, como "Aplicar período").
* Não use em mobile: o componente é coberto pelo Viewport Restriction.

---

## Pendências — não publicar

* 🔴 Página nova: o Modal Date Picker não tem página no zeroheight, nem seção [Documentation], nem description no set (17560:51555). Todo o texto precisa de revisão do time.
* 🟡 Motion: sem especificação própria (segue o Modal).
