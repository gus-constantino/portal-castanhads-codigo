---
title: Card
introduction: O componente Card é um contêiner visual usado para agrupar informações relacionadas de forma clara e compacta.
---

# Specs

O componente Card é um contêiner visual usado para agrupar informações relacionadas de forma clara e compacta.

*Nomes alternativos comuns:* Container, Box, Tile.

## Princípios

* **Clareza** — Os cards devem comunicar sua função principal de forma imediata, com hierarquia visual clara.
* **Consistência** — Cards devem manter um padrão visual e estrutural em toda a interface.
* **Modularidade** — O componente deve ser flexível e escalável, sem quebrar o padrão visual.

---

## Quando usar

O componente Card é usado para apresentar conteúdos agrupados de forma visualmente organizada, promovendo escaneabilidade e interação.

### Utilize para

* Exibir resumos de dados em painéis (dashboards).
* Agrupar informações relacionadas.
* Usar em listas ou grids para navegação em apps mobile/web.
* Apresentar registros individuais com ações com botão.

### Não utilize para

* Destacar apenas uma informação isolada.
* Como elemento interativo principal.
* Como enfeite visual sem propósito de agrupamento.
* Destaque de números grandes — use o **Big number**.

## Card vs. Shortcut, Banner e Modal

|   | Card | Shortcut | Banner | Modal |
| --- | --- | --- | --- | --- |
| **Função** | Apresentar conteúdo agrupado | Acesso rápido a funcionalidades | Comunicar mensagens importantes | Interromper o fluxo para uma ação |
| **Comportamento** | Estático, na página | Navegação direta | Apelo visual forte | Sobreposto, exige interação |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container com Slot** *(obrigatório)* — recebe o conteúdo de quem usa: textos, imagens e ações.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Has Border` | Variant | `True` | Liga o stroke `Border/semi-soft`. |
| `Slot` | Slot | — | Conteúdo do Card. |

---

# Guidelines

## Tamanho e especificações visuais

* **Padding interno:** 24px, fixo.
* **Espaço entre cards:** mínimo de 20px (web) e 16px (mobile).

## Acessibilidade

* O Card é só um container visual: não tem papel próprio nem é focável.
* Comece o conteúdo com um título para que o leitor de tela encontre a seção.
* Em grupo, use uma lista para o leitor anunciar a quantidade.
* Ações dentro do Card têm rótulos que fazem sentido fora do contexto visual.

## Diretrizes de uso

* **Conteúdo:** use cartões para exibir informações relacionadas a um único assunto.
* **Hierarquia do conteúdo:** o conteúdo dos cards é flexível, permitindo diferentes composições.
* **Espaçamentos entre cards:** grade, lista vertical ou carrossel, com 20px (web) e 16px (mobile) entre eles.
* **Espaçamento interno:** 24px, mantido em todas as aplicações.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o Card para destacar um agrupamento de conteúdo relacionado, como informações que pertencem ao mesmo contexto. |
| Don't |   |   | Não use Cards para conteúdo isolado que não precisa de agrupamento visual, como uma única frase ou link. |
| Do |   |   | Utilize Cards em layouts de lista, grid ou colunas, promovendo organização modular e responsiva. |
| Don't |   |   | Não organize os cards em layout mosaico. |
| Do |   |   | Quando necessário uma ação no card, insira um botão de forma hierárquica dentro do card ou utilize outro componente. |
| Don't |   |   | Não use o Card como botão ou link principal. |
| Don't |   |   | Não aplique sombras, bordas, cor de fundo ou estilos extras que não existam como variável do componente. |

---

## Pendências — não publicar

* 🔴 "Usar em listas ou grids para navegação em apps mobile/web" aparece em Utilize para e em Não utilize para na página atual. Aqui ficou só em Utilize para; confirmar com o time.
* 🟡 A página atual não lista as propriedades. Na lib (Card 5256:540), `Has Border` tem padrão `True`, e o playground segue (desde 05/10).
