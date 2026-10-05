---
title: Tag
introduction: Tag são rótulos compactos e visualmente distintos usados para rapidamente categorizar, identificar e organizar itens.
---

# Specs

Tag são rótulos compactos e visualmente distintos usados para rapidamente categorizar, identificar e organizar itens. Podem informar situações em andamento ou atribuir significado, com informações acessórias próximas a outros componentes.

*Nomes alternativos comuns:* Chips, Badge, Tag Status, Bullet.

## Princípios

* **Clareza** — Comunica informações de forma imediata e fácil de entender.
* **Objetividade** — Textos curtos e diretos, limitados a uma única ideia ou categoria.
* **Consistência** — Cores e estilos conforme as variantes do design system.

---

## Quando usar

Use as Tag para categorizar, etiquetar e organizar itens em uma tela, usando palavras-chave ou frases curtas que os descrevam.

### Utilize para

* Categorizar ou rotular itens (ex.: situação de um pedido).
* Identificar atributos (ex.: Novo, Promoção).
* Representar escolhas feitas pela pessoa usuária de forma compacta.

### Não utilize para

* Mostrar várias situações e informações de uma vez.
* Conteúdo extenso — use o **Topic** ou texto corrido.
* Informações críticas que exigem ação imediata — use o **Modal** ou o **Alert**.
* Navegação entre páginas — use o **Link**.
* Ações principais, como Enviar ou Salvar — use o **Main Button**.
* Indicar progresso — use a **Progress Line** ou o **Spinner**.

## Tag vs. Alert vs. Topic vs. Chip Filter

|   | Tag | Alert | Topic | Chip Filter |
| --- | --- | --- | --- | --- |
| **Conteúdo** | Informação concisa | Mensagem crítica | Frases e ícones | Controle de filtro |
| **Ação** | Nenhuma | Pede atenção imediata | Nenhuma | Filtra listas e tabelas |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Lead Item** *(opcional)* — ícone Small.
2. **Text Label** *(obrigatório)* — texto curto.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Accent`, `Neutral`, `Positive`, `Warning`, `Negative`, `Informative` ou `Inversed`. |
| `Text Label` | String | `"Tag"` | Texto da Tag. |
| `Show Lead Item` | Boolean | `true` | Mostra o ícone. |

---

# Guidelines

## Acessibilidade

* A Tag é texto: o significado precisa estar no Label, não só na cor.
* O ícone é decorativo.
* Contraste do texto sobre a Tag: de 7,62:1 (Accent) a 16,96:1 (Inversed), AA e AAA em todas.

## Diretrizes de uso

* **Conteúdo:** curto, com poucas palavras e conciso.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use para categorizar rapidamente informações em um grupo, como em tabelas ou listas. |
| Don't |   |   | Não use para fornecer informações ou instruções detalhadas sobre um item, com mais de uma frase. |
| Do |   |   | Use para destacar informações curtas, objetivas e categorizadas, como benefícios, status ou rótulos. |
| Don't |   |   | Não use para fornecer instruções longas, textos descritivos ou informações detalhadas. |
| Do |   |   | Use para indicar status, categorias ou resultados de forma clara e resumida. |
| Don't |   |   | Não use para ações ou comandos que devem ser executados pelo usuário. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Tag 4475:114).
* 🟡 "Badge" aparece como nome alternativo da Tag, mas é outro componente do DS. Avaliar remover.
