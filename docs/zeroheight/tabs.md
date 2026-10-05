---
title: Tabs
introduction: O Tabs organiza conteúdos relacionados em seções paralelas dentro da mesma página, permitindo que a pessoa usuária alterne rapidamente entre contextos sem navegação externa.
---

# Specs

*Nomes alternativos comuns:* Tab bar, Tab navigation, Segmented navigation

## Princípios

* **Clareza** — Cada aba representa uma categoria ou visão distinta do mesmo conjunto de dados, deixando explícito qual conteúdo está ativo no momento.
* **Economia de navegação** — Evita redirecionamentos desnecessários ao manter conteúdos relacionados no mesmo espaço, reduzindo fricção e tempo de tarefa.
* **Hierarquia** — As abas devem refletir divisões equivalentes no nível hierárquico, sem misturar navegação global com seções locais.

---

## Quando usar

Use Tabs quando houver conteúdos relacionados e de mesmo nível hierárquico que precisam ocupar o mesmo espaço de interface, permitindo alternância rápida sem recarregar a página ou perder o contexto da pessoa usuária.

### Utilize para

* Alternar entre visões de um mesmo objeto, como Resumo, Detalhes, Histórico.
* Organizar categorias paralelas de conteúdo
* Separar estados ou filtros principais de um mesmo dataset

### Não utilize para

* Navegação principal do produto
* Etapas sequenciais de fluxo
* Conteúdos sem relação direta
* Listas muito longas de categorias

## Como o Tabs funciona

O componente Tabs funciona como um padrão de organização estrutural de conteúdo. Cada aba representa uma seção completa e independente, com escopo próprio.

Ao alternar entre abas, a pessoa usuária está mudando de contexto de conteúdo, e não refinando um mesmo conjunto de dados.

O componente Tabs não é um mecanismo de filtro e não deve ser utilizado dessa forma.

## Fixed Tab vs Scrollable Tab

As duas usam o mesmo .Item. Na **Fixed Tab**, as abas dividem a largura igualmente (até 3 abas); na **Scrollable Tab**, cada aba tem a largura do conteúdo e a lista rola na horizontal (até 6 abas).

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Lead icon** *(opcional)* — `Show Lead Item`.
2. **Tab label**
3. **Tab divider** — sublinhado do item (Accent quando ativo).
4. **Tab item**

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Active Item` (Fixed Tab) | Variant | `1` | `1`, `2` ou `3`. |
| `Active Item` (Scrollable Tab) | Variant | `1` | `1` a `6`. |

### .Item

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Is Active` | Variant | `False` | `True` marca a aba ativa. |
| `Text Label` | String | `"Label"` | Nome da aba. |
| `Show Lead Item` | Boolean | `false` | Mostra o ícone. |
| `Choose Icon` | Instance swap | `placeholder` | Ícone do Lead Item. |
| `Show Badge` | Boolean | `true` | Mostra o Badge. |

---

# Guidelines

## Acessibilidade

* Segue o padrão tablist: lista com nome; cada aba com estado de selecionada; cada aba ligada ao seu painel.
* Teclado: `Tab` entra na aba ativa e sai para o painel; `←` `→` movem e ativam; `Home`/`End` vão para a primeira e a última.
* A aba ativa não depende só do sublinhado: o texto também fica mais forte.
* Contraste: aba ativa 16,96:1 · inativa 8,24:1 · sublinhado ativo 4,54:1.

## Diretrizes de uso

* **Limite de abas:** Use entre 2 e 5 abas sempre que possível. Muitas opções dificultam leitura e decisão, especialmente em mobile.
* **Rótulos curtos e claros:** Use labels diretas, sem frases longas ou termos vagos. A pessoa usuária deve entender o conteúdo da aba sem precisar clicar.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Utilize labels diretos e curtos que informem o conteúdo sem que a pessoa usuária tenha necessidade de clicar. |
| Don't |   |   | Não utilize as Tabs como filtros. Caso precise adicionar um mecanismo de filtragem, reveja a experiência e opte por outro componente. |

---

## Pendências — não publicar

* 🔴 Página nova: o zeroheight tem a categoria Tabs vazia. Fonte: seção [Documentation] Tabs (5168:132) do arquivo Component use documentation, que usa o set atual da lib (key do Fixed Tab confere). A tab Conteúdo (regras de texto de Tabs) já existe e entra junto.
* 🔴 Acessibilidade ("Tópico 1 / Ordem de leitura") e Motion (lorem ipsum, "Especificação") do [Documentation] ainda estão com texto de exemplo; a Acessibilidade acima é nova. No código, o sublinhado usa medium/02 + systemic/accelerate.
* 🟡 `Show Badge` existe no .Item da lib, mas ainda não no código.
* 🟡 Contradição: "Separar estados ou filtros principais de um mesmo dataset" (Utilize para) × "O componente Tabs não é um mecanismo de filtro" e o Don't de filtros.
