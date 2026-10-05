---
title: Shaped Icon
introduction: O Shaped Icon é um ícone envolto por um fundo colorido e com formato definido, que confere maior ênfase visual e peso hierárquico. Ele é utilizado para evidenciar categorias, ações contextuais ou estados visuais sem depender de interação.
---

# Specs

*Nomes alternativos comuns:* Icon Tile

## Princípios

* **Clareza visual** — Deve destacar o ícone de forma legível e imediata, reforçando a mensagem sem competir com outros elementos.
* **Consistência semântica** — As cores devem seguir as variantes semânticas do Design System para comunicar estados e significados de forma uniforme.
* **Equilíbrio e hierarquia** — Deve ser usado com moderação, mantendo alinhamento e proporção adequados para preservar a hierarquia visual da interface.

---

## Quando usar

O Shaped Icon funciona como um marcador visual para ações, estados ou categorias, sem função interativa. Seu papel é puramente comunicativo e decorativo, muitas vezes substituindo ou reforçando elementos textuais. Pode funcionar tanto de forma isolada, quanto acompanhado de texto, agregando clareza e estrutura visual ao conteúdo.

### Utilize para

* Para dar destaque visual a um ícone em meio ao conteúdo.
* Quando for necessário reforçar um status ou categoria (por exemplo: erro, sucesso, aviso, etc).
* Para representar ações complementares ao conteúdo, como atalhos ou indicações visuais.
* Em listas, cards ou títulos, para facilitar o escaneamento visual.

### Não utilize para

* Como substituto de botões interativos (use o Button Icon).
* Quando não há necessidade de destacar o ícone visualmente — nesse caso, prefira o Icon simples.
* Para ações ou cliques, já que o componente não possui interação.

## Casos de uso

### Shaped Icon vs Icon

O **Shaped Icon** é uma versão do ícone que possui um fundo colorido com forma definida, o que o torna mais chamativo e visualmente destacado. Já o componente **Icon** é simples, sem fundo, e tem uma aparência mais discreta, sendo ideal para contextos mais neutros ou com menor carga visual. Enquanto o **Icon** é usado principalmente de forma funcional, como apoio em botões, textos ou listas onde a **simplicidade é prioridade**, o **Shaped Icon** atua como um **marcador visual**. Ele reforça mensagens, categorias ou estados — mesmo sem interação — funcionando bem quando se deseja adicionar peso visual e facilitar o reconhecimento.

### Shaped Icon vs Button icon

A principal diferença entre o **Shaped Icon** e o **Button Icon** está na **interatividade**. Enquanto o **Shaped Icon** é um elemento **exclusivamente visual**, utilizado para comunicar categorias, status ou reforçar um contexto, o **Button Icon** é um componente **interativo**, desenvolvido para realizar ações específicas, como editar, excluir ou compartilhar.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Shape** — fundo com raio, na cor da Appearance.
2. **Icon** — nested instance; Size e Appearance derivam do Shaped Icon.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Icon` | Instance swap | `placeholder` | Ícone da biblioteca. |
| `Appearance` | Variant | `Neutral` | `Accent`, `Neutral`, `Positive`, `Warning`, `Negative`, `Informative` ou `Inversed`. |
| `Size` | Variant | `Smallest` | `Smallest` (32 · ícone 16), `Small` (40 · 16), `Medium` (48 · 20) ou `Large` (56 · 24). |

---

# Guidelines

## Acessibilidade

* Sem nome acessível, é decorativo: o significado precisa estar no texto ao lado.
* Não é interativo: para ação clicável, use o Icon Button.
* Contraste do ícone sobre o próprio fundo: de 4,20:1 (Accent) a 16,96:1 (Inversed), todos acima de 3:1.

## Diretrizes de uso

* **Cores semânticas:** Use apenas cores semânticas (erro, alerta, sucesso, neutro, etc.) disponíveis nas propriedades do componente. Ao utilizar uma cor semântica no Shaped Icon, você garante que o usuário entenda rapidamente o contexto visual.
* **Alinhamento e hierarquia visual:** O Shaped Icon deve estar centralizado quando for o elemento principal dentro de um bloco (como em cards ou chamadas de atenção) ou alinhado lateralmente quando estiver acompanhando um título ou texto. Em ambos os casos, respeite os tokens de espaçamento do Design System para garantir uma hierarquia clara e uma leitura fluida da informação.

### Caso de Exceção — Uso de cores não semânticas

O uso padrão do Shaped Icon deve sempre seguir as **cores semânticas disponíveis nas variantes do componente**.

No entanto, em **casos específicos** em que as cores semânticas não atendam ao contexto visual, é permitido utilizar outras cores não semânticas, desde que sejam **tokens oficiais do Design System**. Essa exceção deve ser aplicada com cautela e apenas quando for necessário preservar a coerência com a identidade visual do produto ou reforçar hierarquia estética em cenários particulares.

## Motion

O Shaped Icon é estático: não tem estados de interação nem animação própria.

### Use com moderação

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use Shaped Icon para destacar pontos importantes e manter a hierarquia visual clara, sem sobrecarga de informações e cores. |
| Don't |   |   | Evite utilizar muitos ícones com fundo em uma mesma tela, pois isso pode poluir o layout e dificultar a leitura do conteúdo principal. |

### Interação

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use em contextos sintéticos e visuais. O componente funciona melhor em contextos de leitura rápida, onde o ícone reforça uma informação (ex: status, alerta, categoria). Não use em blocos extensos de texto. |
| Don't |   |   | Não utilize o componente como elemento interativo. O Shaped Icon é puramente visual. Para ações clicáveis, utilize o componente Button Icon, que possui suporte a interação e acessibilidade. |

---

## Pendências — não publicar

* 🟡 A página está com status "Improvement" e não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Shaped Icon 2272:146).
* 🟡 O fundo (Shape) tem 1,08 a 1,31:1 sobre Surface/default — não é limite de componente; o que comunica é o ícone.
