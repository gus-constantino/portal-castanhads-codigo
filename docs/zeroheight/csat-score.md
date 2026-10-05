---
title: CSAT Score
introduction: O CSAT Score é um componente de avaliação utilizado para medir o nível de satisfação da pessoa usuária em relação a uma experiência, funcionalidade ou interação específica, por meio de uma escala ordinal visual representada por ícones e rótulos textuais.
---

# Specs

*Nomes alternativos comuns:* Customer Satisfaction Score, Avaliação de satisfação, Rating CSAT

## Princípios

* **Clareza** — A escala deve ser facilmente compreendida, com rótulos textuais que explicitem o significado de cada nível de avaliação.
* **Consistência** — A quantidade de pontos, ícones e estados visuais deve permanecer estável em todos os contextos de uso.
* **Simplicidade** — A interação deve exigir o mínimo de esforço cognitivo da pessoa usuária.

---

## Quando usar

Use o CSAT Score quando for necessário coletar feedback rápido e quantitativo sobre satisfação após uma ação, fluxo ou experiência específica, como conclusão de tarefas, uso de funcionalidades ou atendimento.

### Utilize para

* Medir satisfação imediata da pessoa usuária.
* Coletar feedback pontual em pesquisas rápidas.
* Comparar percepção de qualidade entre fluxos ou versões

### Não utilize para

* Avaliações qualitativas profundas.
* Coleta de feedback aberto sem escala.
* Medir esforço ou lealdade (Utilize NPS Score)

## Casos de uso

### CSAT Score vs NPS Score

O CSAT Score mede satisfação em um ponto específico da jornada, enquanto o NPS avalia lealdade e probabilidade de recomendação em uma perspectiva mais ampla e estratégica.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Item ativo** — rate-filled (Decorative/02).
2. **Label Content** — rótulo do nível.
3. **Item inativo** — rate-line (Surface/02).

Cinco .CSAT Item: Muito ruim, Ruim, Médio, Bom e Muito bom. Com um valor escolhido, os itens até ele ficam ativos.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled` ou `Disabled`. |
| `Selected Value` | Variant | `None` | `None` ou `1` a `5`. |

### .CSAT Item

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered` ou `Pressed`. |
| `Is Active` | Variant | `False` | `True` marca os níveis até a nota escolhida. |
| `Label Content` | String | `"Label"` | Rótulo do nível. |
| `Show Label Content` | Boolean | `true` | Mostra o rótulo. |

---

# Guidelines

## Acessibilidade

* É um grupo de opções com nome: use a própria pergunta como nome.
* `Tab` entra no grupo; as setas trocam a nota.
* Cada opção é anunciada pelo rótulo e pela posição ("Bom, 4 de 5").
* Contraste: rótulos 8,24:1. Estrela ativa 2,68:1 e inativa 2,78:1.

## Diretrizes de uso

* **Contextualização da pergunta:** Associe o CSAT Score a uma pergunta clara e objetiva, indicando exatamente qual experiência está sendo avaliada.
* **Quantidade fixa de opções:** Mantenha sempre a mesma quantidade de níveis de avaliação para garantir comparabilidade dos dados.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Posicione o componente imediatamente após a experiência avaliada, utilizando um título claro e direto que explicite exatamente o que está sendo medido. |
| Don't |   |   | Não altere as labels do CSAT entre diferentes contextos, pois isso compromete a consistência da escala e a comparabilidade dos resultados ao longo do tempo. |

---

## Pendências — não publicar

* 🔴 Contraste: a estrela ativa (Decorative/02) tem 2,68:1 e a inativa 2,78:1 sobre Surface/default — abaixo de 3:1 (WCAG 1.4.11). A forma (preenchida × contorno) e os rótulos ajudam, mas a estrela é o que mostra a nota.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia.
* 🟡 Status "In progress"; a página não tem a tab Style. Anatomia e Propriedades vieram dos sets da lib (CSAT Score 10100:1192, .CSAT Item 10100:1155).
* 🟡 Disabled usa `shape/opacity/high` no Figma, fora da coleção Common (C68).
