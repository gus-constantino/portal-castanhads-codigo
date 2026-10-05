---
title: Content List
introduction: O Content List é um componente que agrupa e organiza múltiplos Content List Items em uma estrutura única e consistente. Ele funciona como um container, permitindo que diferentes tipos de conteúdo sejam exibidos de forma clara e hierárquica. Pode conter itens informativos, de navegação ou de transações financeiras, adaptando-se a diferentes contextos de uso.
---

# Specs

*Nomes alternativos comuns:* Lista de navegação, Lista de conteúdo, Content list view, Lista navegável.

## Princípios

* **Organização da informação** — Estruture os itens de forma clara e hierárquica, facilitando a leitura e compreensão dos conteúdos apresentados.
* **Consistência visual e funcional** — Mantenha o mesmo padrão de layout, espaçamento e comportamento entre os itens para garantir uma experiência uniforme.
* **Clareza de propósito** — Cada lista deve ter um objetivo bem definido — seja exibir informações, navegar ou mostrar transações — evitando misturar diferentes tipos de conteúdo.

---

## Quando usar

O Content List deve ser utilizado sempre que houver necessidade de organizar conteúdos relacionados em sequência, garantindo que o usuário consiga navegar, consultar ou identificar informações de forma rápida e clara. Ele é ideal para estruturar telas em que diferentes tipos de informações precisam ser listadas em conjunto.

### Utilize para

* Agrupar informações relacionadas em um mesmo contexto.
* Exibir navegação para páginas ou seções diferentes do app. (Variante Navigation)
* Organizar dados em blocos de consulta e edição.
* Listar conteúdos que compartilham uma mesma hierarquia ou categoria.

### Não utilize para

* Seleção de opções ou escolhas (para isso use o Selection List).
* Exibição de dados tabulares que exigem comparações complexas (use Table).
* Conteúdos isolados que não precisam de agrupamento em lista. (Use Content List Item)

## Casos de uso

### Content List vs Selection List

Enquanto o Content List organiza conteúdos ou navegação, o Selection List serve exclusivamente para escolhas do usuário (única ou múltipla). **O Content List não deve ser usado como componente de decisão.**

### Content List vs Table

O Content List é indicado para informações rápidas, contextuais e navegáveis. Já a Table é ideal para exibir grandes volumes de dados estruturados, com necessidade de ordenação e comparação entre colunas.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. Content List Item
2. Divider (só no Kind Default)

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` (sem espaço entre itens) ou `Card` (espaço 8). |
| `Intent` | Variant | `Default` | `Default`, `Switch` ou `Navigation` — repassado aos itens (Switch usa itens Transaction). |

---

# Guidelines

## Acessibilidade

* A lista tem nome e é anunciada como lista, com o número de itens.
* Cada item navegável é um link.
* Não misture itens de decisão numa lista de navegação.

## Diretrizes de uso

* **Ordenação:** Use a ordem dos itens para refletir prioridade ou relevância do conteúdo.
* **Variantes:** É permitido mesclar diferentes variantes de content list items (como itens de navegação ou ações diretas com toggle) dentro da mesma lista, desde que se observe alguns pontos:
    * Itens diferentes devem estar organizados de forma que o usuário entenda rapidamente a função de cada um.
    * O usuário deve entender de imediato se o item ativa uma ação direta (ex.: switch) ou se leva para outra tela.

Atenção: Quando a lista envolve seleção de opções (como em formulários ou preferências), evite misturar tipos de itens. Isso pode gerar dúvidas e comprometer a clareza da decisão do usuário.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use a variante Default para exibir conteúdos simples de forma clara e organizada. |
| Don't |   |   | Não use a variante Default para casos em que seja necessária navegação ou exibição de valores financeiros. Nestes casos, utilize a variante transaction. |
| Do |   |   | Use o Content List para organizar informações quando o objetivo for apenas exibir conteúdo ou permitir ações diretas de configuração. |
| Don't |   |   | Não utilize o Content List para misturar diferentes padrões de interação em um mesmo fluxo de decisão, como seleção (checkbox), navegação (link para outra tela) e exibição de transações financeiras. |

---

## Pendências — não publicar

* 🔴 O Intent "Switch" da lista gera itens Transaction (no Figma); o nome confunde — o zeroheight fala em "variante transaction". Alinhar o nome da opção.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia.
* 🟡 A página não tem tab Style; Anatomia e Propriedades vieram do set da lib (5488:1482).
