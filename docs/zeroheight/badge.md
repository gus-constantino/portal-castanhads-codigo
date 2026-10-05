---
title: Badge
introduction: O Badge é um elemento visual usado exclusivamente para indicar notificações ou atualizações. Ele serve como um alerta discreto que informa a pessoa usuária sobre algo novo ou pendente em um determinado contexto da interface.
---

# Specs

O Badge é um elemento visual usado exclusivamente para indicar notificações ou atualizações.

*Nomes alternativos comuns:* Notification badge, Counter, Indicator.

## Princípios

* **Informatividade** — Indica de forma clara a presença de novas notificações ou atualizações.
* **Discrição** — Chama atenção sem interromper a experiência da pessoa usuária.
* **Consistência** — Segue padrões de posicionamento, cor e tamanho em todas as interfaces.

---

## Quando usar

Use o Badge apenas para indicar a existência de notificações, contagens de novas mensagens ou atualizações que requerem atenção. Ele complementa o conteúdo principal, nunca o substitui.

### Utilize para

* Mostrar o número de notificações não lidas.
* Indicar novas mensagens, alertas ou atualizações.
* Sinalizar que há novos itens em uma lista ou seção.

### Não utilize para

* Indicar status (como ativo, inativo, sucesso ou erro) — use a **Tag**.
* Classificar ou categorizar conteúdos — use a **Tag**.
* Exibir textos descritivos ou informações longas.
* Servir como botão, link ou elemento interativo.

## Badge vs. Tag vs. Chip

|   | Badge | Tag | Chip |
| --- | --- | --- | --- |
| **Função** | Notificação ligada a outro elemento | Categoria ou status | Ação, filtro ou seleção |
| **Interativo** | Não | Não | Sim |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

* **Counter:** Container + número.
* **Text:** Container + texto curto (só Web).
* **Counter mobile:** ponto, sem número nem texto.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Warning` | `Warning` ou `Neutral`. |
| `Label` | String | `"0"` | Número ou texto do Badge. |

> As propriedades antigas `Kind` (Text · Counter) e `Style` foram substituídas por `Label` e `Appearance`. O ponto do mobile vem da collection Viewport.

---

# Guidelines

## Acessibilidade

* O Badge é visual: inclua a contagem no nome do elemento a que pertence (ex.: "Notificações, 3 novas").
* No mobile, o ponto não tem número: o nome acessível precisa dizer que há novidades.
* Contraste: Warning 10,17:1 e Neutral 16,96:1 (AA e AAA).

## Diretrizes de uso

* **Posicionamento:** sempre próximo ao elemento que origina a notificação, no canto superior direito, com posição absoluta.
* **Variante Counter:** no máximo dois dígitos; acima disso, "99+".
* **Variante Text:** só em Web e só para notificações, com texto curto.
* **Counter mobile (dot):** só em mobile, sem detalhar a quantidade.
* **Icon button:** use só a variante Counter, com números.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o Badge apenas para indicar notificações. |
| Don't |   |   | Não use para representar status ou categorias. |
| Do |   |   | Mantenha o número curto e dentro do limite visual do componente. Acima de 2 caracteres, utilize 99+. |
| Don't |   |   | Não exiba números muito grandes que comprometam a legibilidade. |

---

## Pendências — não publicar

* 🟡 A página está "In progress".
* 🔴 A página lista `Kind` (Text · Counter) e `Style`; o set da lib (Badge 4835:1472) tem só `Appearance` e `Label`.
* 🟡 Motion: Notificação com systemic/decelerate · medium/01 não corresponde a nenhum Motion Style.
