---
title: Nav control
introduction: O Nav Control é um componente visual utilizado como indicador de navegação, normalmente associado a carrosséis ou fluxos paginados. Ele representa, de forma ilustrativa, a quantidade total de itens e qual deles está em foco no momento.
---

# Specs

*Nomes alternativos comuns:* carousel indicator, navigation dots.

## Princípios

* **Clareza de estado** — Comunica visualmente qual item está ativo sem exigir interação direta.
* **Simplicidade visual** — Utiliza elementos mínimos (dots e estado selecionado) para evitar ruído na interface.
* **Consistência** — Mantém padrão visual e comportamento previsível em diferentes contextos de uso.

---

## Quando usar

Utilize o Nav Control para indicar a posição atual da pessoa usuária dentro de uma sequência linear de conteúdos, como carrosséis ou etapas visuais, sempre que a navegação direta não for necessária.

### Utilize para

* Indicar o item ativo em um carrossel
* Reforçar progressão visual em conteúdos sequenciais
* Acompanhar mudanças automáticas ou controladas por outros elementos.

### Não utilize para

* Navegação direta entre telas
* Substituição de tabs ou stepper
* Ações clicáveis ou controles interativos.

## Casos de uso

### Nav Control vs Pagination

O Nav Control é um componente puramente indicativo, utilizado para mostrar a posição atual em uma sequência de conteúdos, como carrosséis, sem permitir interação direta. Já o Pagination é um componente interativo, voltado à navegação ativa entre páginas de tabelas ou listas extensas, permitindo que a pessoa usuária controle explicitamente qual conjunto de dados deseja visualizar.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. Focus indicator
2. Navigation dots
3. Botão de navegação (apenas desktop)

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Accent` | `Accent` (sobre Surface/default) ou `Inversed` (sobre Surface/accent ou Surface/inversed). |

Mobile e desktop vêm da coleção Viewport: no mobile, só os indicadores; no desktop, indicadores e setas. 10 posições fixas.

---

# Guidelines

## Acessibilidade

* Os indicadores são decorativos; a posição é anunciada em texto ("Item 2 de 5").
* No desktop, as setas têm nome ("Anterior", "Próximo").
* Os indicadores não são clicáveis nem recebem foco.
* Sobre imagem, use scrim para garantir contraste.
* Contraste: todos os indicadores acima de 3:1 nas superfícies indicadas (de 3,22:1 a 16,96:1).

## Diretrizes de uso

* **Uso ilustrativo apenas:** O Nav Control não deve ser clicável ou interativo. Ele deve apenas refletir o estado atual controlado por outro componente, como um carrossel. Em experiências web, associe o uso de setas interativas.
* **Nav Control como indicador obrigatório em carrosséis:** Sempre que um carrossel de imagens for utilizado, associe o Nav Control como indicador visual de navegação. Ele ajuda a pessoa usuária a entender quantos itens existem no carrossel e em qual posição ela está no momento, aumentando a previsibilidade e a compreensão do conteúdo, especialmente quando há rolagem automática ou por gesto.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Utilize o Nav Control como indicador visual sincronizado com o carrossel ou fluxo, mantendo apenas um item selecionado por vez. |
| Don't |   |   | Não utilize o Nav Control como elemento de navegação clicável nem como substituto de componentes interativos de navegação. |

---

## Pendências — não publicar

* 🔴 Propriedades do zeroheight desatualizadas: lista Items (2–5), Style e "Is selectedLead Icon"; o set da lib (19560:3280) tem só Appearance (Accent · Inversed), Viewport pela coleção e 10 posições.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia. No código, o indicador ativo cresce em medium/02 + systemic/accelerate.
* 🟡 Status "Backlog"; "Composição do componente" com texto modelo; Aplicações vazias.
