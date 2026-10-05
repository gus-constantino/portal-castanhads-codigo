---
title: System Banner
introduction: Aviso do sistema que ocupa a largura toda da página, com a mesma anatomia do Alert.
---

# Specs

O System Banner mostra um aviso do sistema que vale para a página ou para o produto inteiro. Tem a mesma anatomia e as mesmas props do Alert, mas ocupa a largura toda, sem raio, no topo da área de conteúdo.

---

## Quando usar

### Utilize para

* Instabilidades ou manutenções que afetam várias telas.
* Avisos de conta ou empresa que valem em todo o produto.
* Mudanças importantes que a pessoa precisa ver ao entrar.

### Não utilize para

* Mensagens sobre uma parte da tela — use o **Alert**.
* Feedback rápido de uma ação — use o **Toast**.
* Mais de um aviso ao mesmo tempo: mostre o mais importante.

## Casos de uso

### System Banner vs Alert

Os dois têm a mesma anatomia e as mesmas props. O System Banner ocupa a largura toda da página, sem raio; o Alert fica dentro do conteúdo, com raio.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Shaped Icon** — Small, ícone por Appearance.
2. **Text Label** *(opcional)* — `Show Label`.
3. **Text Content**
4. **.Close Alert** *(opcional)* — `Show Close Button`.

Largura total, sem raio, mínimo 360.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Positive` | `Positive`, `Warning` ou `Informative`. |
| `Text Label` | String | `"Label"` | Título curto. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Content` | String | `"A message about the system here! You can turn words bold also add a link."` | Mensagem. |
| `Show Close Button` | Boolean | `true` | Mostra o botão de fechar. |

---

# Guidelines

## Acessibilidade

* Warning é anunciado na hora (`alert`); Positive e Informative sem interromper (`status`).
* Coloque o System Banner no começo do conteúdo principal, antes do título da página.
* O botão de fechar tem nome ("Fechar aviso").
* Contraste do texto: Positive 8,02:1 · Warning 9,54:1 · Informative 9,60:1 (AA e AAA).

## Diretrizes de uso

* **Um aviso por vez:** Mostre só o aviso mais importante. Se houver prazo de resolução, informe no texto.
* **Escrita:** siga as regras de Alertas em Feedback Pages — explicar o porquê, informar prazos e o canal de aviso.

## Motion

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Fechar: Enabled → Hovered | While hovering | `Hover In/01` |
| Fechar: Hovered → Pressed | While pressing | `Pressed/01` |

---

## Pendências — não publicar

* 🔴 Página nova: o System Banner não tem página no zeroheight, nem seção [Documentation], nem description no set da lib (18432:2090). Todo o texto precisa de revisão do time.
* 🟡 Sem especificação de Motion para entrada e saída; sem regra de posição (abaixo do header? acima do título?).
