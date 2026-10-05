---
title: Dividers
introduction: O componente Divider é uma linha fina que separa visualmente agrupamentos de conteúdo em uma interface. Ele atua como uma âncora visual, ajudando a pessoa usuária a escanear e compreender a hierarquia e o relacionamento entre os elementos da página.
---

# Specs

*Nomes alternativos comuns:* Separator, Line, Horizonal rule, Separador.

## Princípios

* **Clareza Estrutural** — Deve sempre demarcar uma quebra lógica no fluxo de conteúdo, garantindo que a pessoa usuária compreenda o que está sendo separado.
* **Sutileza Visual** — Sua presença deve ser discreta. O objetivo é separar, não competir com o conteúdo que ele está organizando.
* **Consistência de Agrupamento** — Ajuda a agrupar visualmente informações relacionadas e a separar informações não relacionadas, suportando o princípio da proximidade.

---

## Quando usar

Use o Divider sempre que for necessário estabelecer uma separação visual clara e não ambígua entre seções, blocos de conteúdo ou elementos interativos que pertencem a grupos distintos. Ele é ideal para refinar a estrutura do layout e reduzir a carga cognitiva, especialmente em interfaces densas ou longas.

### Utilize para

* Separar itens em listas de navegação, como menus laterais ou lista em dropdown.
* Demarcar o fim de uma seção de conteúdo e o início de outra (quando na orientação horizontal).
* Separar diferentes tipos de informação em um painel ou cartão, como cabeçalhos, corpo e rodapé.

### Não utilize para

* Substituir espaçamento (espaço em branco). A separação primária deve ser feita pelo espaço em branco; o Divider é um complemento visual.
* Separar elementos já claramente distintos por layout ou cores de fundo contrastantes.
* Criar divisões que não correspondem a uma mudança lógica ou hierárquica no conteúdo.

## Casos de uso

### Divider vs Espaço em branco

O Espaço em Branco (Whitespace) é a principal e mais sutil ferramenta de design para estabelecer hierarquia, agrupar e separar conteúdo, sendo fundamental para a legibilidade e o fluxo da leitura. Em contraste, o Divider é um elemento visual explícito e secundário, que deve ser usado com moderação, apenas para reforçar uma separação de seções ou quebra de contexto quando o Espaço em Branco, por si só, não é suficiente ou ambíguo. **O uso do Divider nunca deve ser uma substituição ou compensação para um espaçamento mal planejado no layout.**

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

| Kind | Construção | Cor |
| --- | --- | --- |
| Solid | Barra preenchida, raio pill | Neutral/Solid/{Intensity} (fill) |
| Dashed | Linha com traço 4 · 4, ponta arredondada, 1px; container sem raio | Border/{Intensity} (stroke) |

Orientation define o eixo de escala: Horizontal estica na largura; Vertical estica na altura. A espessura permanece fixa em 1px.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Solid` | `Solid` ou `Dashed`. |
| `Intensity` | Variant | `Soft` | `Soft`, `Medium` ou `Intense`. |
| `Orientation` | Variant | `Horizontal` | `Horizontal` ou `Vertical`. |

---

# Guidelines

## Acessibilidade

* Divisor é decorativo por padrão (escondido do leitor de tela).
* Se separa grupos com significado, exponha como separador, com a orientação.
* Contraste: divisor decorativo é isento de 1.4.11. Soft (1,25:1) e Medium (2,78:1) ficam abaixo de 3:1 por design. Se o divisor for o único meio de comunicar separação, usar Intense (8,24:1).

## Diretrizes de uso

* **Intensidade para Hierarquia:** Use a variante de menor intensidade (Soft) para separações mais discretas dentro de um mesmo agrupamento (ex: itens em um formulário e listas) e as variantes de maior intensidade (Medium ou Intense) para demarcar grandes seções ou divisões importantes na página.
* **Margens Adequadas:** Garanta que haja um espaçamento (padding ou margin) suficiente entre o Divider e o conteúdo que ele separa. O espaçamento é tão importante quanto a linha em si para a legibilidade, e o Divider deve sempre complementar o Espaço em Branco, nunca compensá-lo.

## Motion

O Divider é estático: não tem estados de interação nem animação própria.

---

## Pendências — não publicar

* 🟡 A página não tem tab Style; Anatomia e Propriedades vieram do set da lib (4931:207) e das anotações dele (construção por Kind, semântica, contraste).
* 🟡 A seção Motion está com o texto modelo; o Divider é estático (sugestão: substituir pelo parágrafo acima).
* 🟡 Texto: "Horizonal rule" → "Horizontal rule". Sem Do's and Don'ts.
