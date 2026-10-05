---
title: Tooltip
introduction: São caixas flutuantes que proporcionam informações sobre algum aspecto da interface que mereça maior atenção.
---

# Specs

O Tooltip aparece quando a pessoa passa o mouse ou leva o foco do teclado para o elemento que o dispara, e some ao sair ou com Esc. Tem um Label opcional e um texto curto.

---

## Quando usar

### Utilize para

* Explicar um ícone ou termo que pode não ser claro (ex.: o que entra na tarifa).
* Dar um complemento curto que não cabe no layout.
* Nomear Icon Buttons sem texto visível, quando o contexto pede.

### Não utilize para

* Informação essencial para concluir a tarefa — coloque no texto da tela.
* Conteúdo com links, botões ou formulários — use o **Popover**.
* Mensagens de erro ou de sistema — use a mensagem do campo, o **Alert** ou o **Toast**.
* Telas de toque como único caminho: não há hover no celular.

## Casos de uso

### Tooltip vs Popover

O Tooltip só mostra texto e aparece no hover ou no foco. O Popover abre com um clique, fica aberto e pode ter ações.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Text Label** *(opcional)* — Caption/Bold.
2. **Text Content** — Caption/Regular.

Surface/inversed · raio extra-small · Elevation/level 2 · largura máxima 240.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Text Label` | String | `"Label"` | Título curto. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Content` | String | `"Find out how this Caju product can benefit your business today."` | Texto do Tooltip. |

---

# Guidelines

## Acessibilidade

* O texto é lido como descrição do elemento que dispara o Tooltip.
* Aparece no hover e no foco do teclado; `Esc` fecha sem tirar o foco do lugar.
* O Tooltip não recebe foco nem tem conteúdo interativo; o gatilho precisa ter nome próprio.
* Contraste: 16,96:1.

## Diretrizes de uso

* Texto curto: uma ou duas frases, no máximo a largura de 240.
* O Label é opcional; use quando o texto precisa de um título.
* Não repita no Tooltip o que já está escrito na tela.
* Prefira o topo do gatilho; use embaixo quando não houver espaço acima.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use para complementar um termo ou ícone com uma informação curta. |
| Don't |   |   | Não coloque no Tooltip informação essencial ou instruções longas. |

---

## Pendências — não publicar

* 🔴 Página nova: o Tooltip não tem página no zeroheight nem seção [Documentation]. Só a introdução é texto do time (description do Figma, 11211:416); o resto precisa de revisão.
* 🟡 Texto padrão do componente em inglês ("Find out how this Caju product can benefit your business today.").
* 🟡 Sem especificação de Motion para aparecer e sumir.
