---
title: Selection List Item
introduction: O Selection List Item é um componente de seleção que combina título, descrição e ícone para enriquecer a apresentação das opções. Ele amplia a clareza das escolhas, indo além de seletores simples como checkbox, radio ou switch.
---

# Specs

*Nomes alternativos comuns:* Option item, List option, Item de seleção.

## Princípios

* **Clareza de intenção** — Cada item deve deixar explícito se a ação esperada é selecionar, navegar ou visualizar, evitando ambiguidades.
* **Consistência de comportamento** — Todos os itens da lista devem seguir o mesmo padrão de interação, mantendo previsibilidade para o usuário.
* **Foco na escolha** — O componente deve priorizar a seleção de opções, sem misturar elementos que desviem a atenção da decisão principal.

---

## Quando usar

O Selection List Item deve ser usado quando a opção de seleção precisa transmitir mais do que um simples rótulo, permitindo incluir título, descrição e ícone para dar clareza à escolha. Ele é ideal para ser utilizado de forma isolada ou em grupo, quando seletores tradicionais como checkbox, radio ou switch não são suficientes para comunicar todas as informações necessárias.

### Utilize para

* Em fluxos de decisão nos quais cada alternativa precisa de informações adicionais (ex.: título, descrição e ícone).
* Para representar grupos de opções exclusivas ou múltiplas, permitindo comparação clara entre elas.
* Quando seletores simples não oferecem contexto suficiente para orientar a escolha do usuário.

### Não utilize para

* Para escolhas binárias simples, que podem ser resolvidas com Radio Button ou Switch.
* Quando a opção é autoexplicativa e não exige descrições ou ícones.
* Em contextos puramente informativos, sem necessidade de seleção (prefira Content List Item).

## Casos de uso

### Selection List Item vs Checkbox, Radio e Switch

**Checkbox, Radio e Switch** são seletores ideais quando a decisão é simples, binária ou de múltipla escolha, mas com opções autoexplicativas, como “Sim/Não” ou “Ativar/Desativar notificações”. Já o **Selection List Item** é indicado quando cada alternativa precisa de mais clareza e contexto, como título, descrição ou ícone. Ele transforma a escolha em algo mais visual e informativo, tornando-se útil em cenários de comparação, como escolher um plano de assinatura ou definir um método de envio.

### Selection list item vs Content list item

O **Content List Item** é utilizado para exibir informações de forma organizada, sem ter como objetivo principal a seleção. Ele mostra dados como nome, status ou atributos de um item, funcionando mais como uma listagem de conteúdo. O **Selection List Item**, por outro lado, é voltado para a decisão: o usuário deve escolher entre opções apresentadas, cada uma enriquecida com detalhes que ajudam na comparação e no entendimento antes da seleção.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. Text label
2. Lead Item
3. Text description
4. Trailing item
5. Divider

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` ou `Card`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Is Active` | Variant | `False` | `True` marca a opção selecionada. |
| `Trailing Item` | Variant | `Chechbox` | `Chechbox`, `Radio Button`, `Switch`, `Tag`, `Icon` ou `None`. |
| `Show Lead Item` | Boolean | `true` | Mostra o Lead Item (Avatar, Icon ou Image). |
| `Show Divider` | Boolean | `true` | Mostra o divisor. |

---

# Guidelines

## Acessibilidade

* Com Checkbox, Radio Button ou Switch, o foco vai para o controle nativo, que tem o nome do Label; a linha inteira é clicável.
* Sem controle, a linha é um botão com estado de pressionado.
* Radio Buttons com o mesmo nome formam um grupo (setas trocam a opção).
* Contraste: Label 16,96:1 · descrição 8,24:1; Is Active: 15,70:1 e 7,63:1.

## Diretrizes de uso

* **Seleção:** Mantenha cada Selection List Item visualmente próximo, garantindo que todas as opções sejam facilmente identificadas como parte do mesmo grupo de seleção.
* **Trailing item:** O trailing item deve ser usado para fornecer ações ou informações adicionais relacionadas ao item da lista. Utilize sempre o mesmo em todo o grupo de seleção.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Utilize sempre o mesmo Kind em um grupo de opções. |
| Don't |   |   | Não mescle os dois Kinds no mesmo grupo de opções. |
| Do |   |   | Quando o tipo de escolha na seleção for simples, utilize outros tipos de seletores. |
| Don't |   |   | Use o Selection List Item quando a opção de seleção exigir informações complementares, como descrições adicionais e/ou ícones de apoio. |

---

## Pendências — não publicar

* 🔴 O último Don't está escrito como recomendação ("Use o Selection List Item quando…"). Sugestão: "Não use o Selection List Item para opções simples, sem descrição nem ícone."
* 🔴 A seção Motion está com o texto modelo e a tabela vazia. No código, short/03 + systemic/accelerate.
* 🟡 Propriedades: o zeroheight lista Is Active como Boolean e "Icon Button" no Trailing Item; na lib, Is Active é Variant e a opção é "Icon". O Figma escreve "Chechbox".
* 🟡 Texto: "Presses" em Estilos (State/Card); "Trailling" no título.
