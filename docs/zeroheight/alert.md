---
title: Alert
introduction: Mensagem fixa e persistente sobre o sistema, que fica visível até a pessoa usuária ler ou fechar.
---

# Specs

O Alert mostra uma mensagem sobre o sistema dentro do fluxo da tela, com um Shaped Icon na cor da Appearance, um Label opcional, o texto (que aceita negrito e link) e o botão de fechar opcional.

O **Alert** é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente.

---

## Quando usar

### Utilize para

* Confirmar algo que continua valendo na tela (Positive).
* Avisar de um risco ou pendência que pede atenção (Warning).
* Dar uma informação de contexto que ajuda a decidir (Informative).

### Não utilize para

* Feedback rápido de uma ação — use o **Toast**.
* Mensagens críticas ou que bloqueiam o fluxo — use o **Modal**.
* Avisos que valem para todo o produto, no topo da página — use o **System Banner**.
* Status curto de um item — use a **Tag**.

## Casos de uso

### Alert vs Toast

O **Toast** é temporário e aparece sobre o conteúdo, na parte inferior da tela (em web) ou superior (em mobile). Ele serve para mensagens rápidas e automáticas, como confirmações de sucesso ou avisos leves. Já o **Alert** é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente.

### Alert vs System Banner

Os dois têm a mesma anatomia e as mesmas props. O Alert fica dentro do conteúdo, com raio; o System Banner ocupa a largura toda da página, sem raio.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Shaped Icon** — Small, ícone por Appearance (positive-line, warning-line, information-line).
2. **Text Label** *(opcional)* — `Show Label`.
3. **Text Content** — aceita negrito e link.
4. **.Close Alert** *(opcional)* — `Show Close Button`.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Positive` | `Positive`, `Warning` ou `Informative`. |
| `Text Label` | String | `"Label"` | Título curto do Alert. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Content` | String | `"A message about the system here! You can turn words bold also add a link."` | Mensagem. |
| `Show Close Button` | Boolean | `true` | Mostra o botão de fechar. |

---

# Guidelines

## Acessibilidade

* Warning é anunciado na hora (`alert`); Positive e Informative sem interromper (`status`).
* O Shaped Icon é decorativo: o significado precisa estar no Label e no texto, não só na cor.
* O botão de fechar tem nome ("Fechar aviso"). Ao fechar, devolva o foco para um ponto lógico da tela.
* Links no texto precisam fazer sentido fora de contexto.
* Contraste do texto: Positive 8,02:1 · Warning 9,54:1 · Informative 9,60:1 (AA e AAA).

## Diretrizes de uso

* **Label e texto:** Use o Label para dizer o que aconteceu e o texto para dizer o que fazer. Sem Label, o texto precisa se sustentar sozinho.
* **Appearance pelo significado:** Escolha Positive, Warning ou Informative pelo tipo de mensagem, não pela cor que combina com a tela.
* **Escrita:** siga as regras de Alertas em Feedback Pages — tom acolhedor e preventivo, explicar o porquê e informar prazos.

## Motion

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Fechar: Enabled → Hovered | While hovering | `Hover In/01` |
| Fechar: Hovered → Pressed | While pressing | `Pressed/01` |

---

## Pendências — não publicar

* 🔴 Página nova: o Alert não tem página no zeroheight, nem seção [Documentation] no arquivo Component use documentation, nem description no set da lib (11864:12559). Todo o texto, exceto "Alert vs Toast" (da página do Toast), precisa de revisão do time.
* 🟡 Sem especificação de Motion para entrada e saída.
* 🟡 Texto padrão do set em inglês ("A message about the system here!…").
