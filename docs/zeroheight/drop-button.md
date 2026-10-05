---
title: Drop button
introduction: O Drop Button é um botão interativo que, ao ser acionado, abre um menu suspenso com opções de ação diretamente relacionadas ao contexto do botão. Ele combina a função de acionador visual com o acesso rápido a um conjunto de comandos organizados.
---

# Specs

O Drop Button é um botão interativo que, ao ser acionado, abre um menu suspenso com opções de ação diretamente relacionadas ao contexto do botão. Ele combina a função de acionador visual com o acesso rápido a um conjunto de comandos organizados.

*Nomes alternativos comuns:* Split Button, Dropdown Button, Menu Button.

## Princípios

* **Clareza** — O Drop Button deve deixar evidente que abre um menu de ações, usando rótulos e ícones claros.
* **Consistência** — O menu deve ser sempre construído com o componente List, garantindo padrão visual e de uso.
* **Foco na ação** — O Drop Button deve apresentar apenas ações relevantes e relacionadas ao contexto imediato.

---

## Quando usar

Use o Drop Button quando for necessário oferecer, a partir de um único acionador, um conjunto de ações relacionadas em formato de menu suspenso. Ele é ideal para agrupar comandos que compartilham o mesmo contexto, reduzindo a quantidade de botões visíveis e mantendo a interface organizada.

### Utilize para

* Para oferecer um conjunto de ações relacionadas ao contexto atual.
* Quando houver múltiplas variações ou sub-ações de uma mesma função principal.
* Para otimizar espaço na interface, agrupando controles relacionados.

### Não utilize para

* Para exibir listas de seleção de dados — use um **Select**.
* Como navegação primária de alto nível — use um menu de navegação dedicado.
* Para exibir conteúdos complexos, formulários ou filtros.

## Main button vs. Drop button

|   | Main Button | Drop Button |
| --- | --- | --- |
| **Ação** | Uma única ação imediata | Várias ações em um menu suspenso |

<callout background="1" fullWidth="true">

**Atenção:** Apesar dos componentes serem visualmente semelhantes, é importante se atentar sobre o contexto e indicação de uso.

</callout>

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** *(obrigatório)* — área clicável e estado.
2. **Lead icon** *(opcional)* — reforça a ação.
3. **Trailing icon** *(obrigatório)* — indica o menu; muda com `Is Active`.
4. **Popover** *(obrigatório)* — menu suspenso exibido ao acionar.

## Composição do componente

O Drop Button é composto por um botão acionador, contendo rótulo e ícone indicativo de menu, e por um Popover com slot suspenso. Nesse slot entram itens de composição, como List Items.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | Ênfase: `Default` ou `Ghost`. |
| `Appearance` | Variant | `Accent` | Cor: `Accent`, `Neutral` ou `Inversed`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Size` | Variant | `Medium` | `Medium` (48) ou `Small` (40). |
| `Is Active` | Variant | `False` | `True` com o menu aberto. |
| `Text Label` | String | `"Label"` | Texto do botão. |
| `Show Lead Icon` | Boolean | `true` | Mostra o ícone à esquerda. |
| `Lead Icon` | Swap component | `placeholder-line` | Ícone à esquerda. |

> A propriedade antiga `Style` foi substituída por `Appearance`.

---

# Guidelines

## Acessibilidade

* É um `<button>` nativo com `aria-haspopup` e `aria-expanded`.
* O chevron é decorativo; o estado vem de `aria-expanded`.
* Enter e Espaço abrem e fecham o menu; Esc fecha e devolve o foco ao botão.
* O menu aberto usa o List, com itens focáveis.
* Contraste: os mesmos pares do Main Button (Accent 4,54:1, AA).

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |
| Is Active → True | On click | `Selected In/01` |
| Is Active → False | On click | `Selected Out/01` |

## Diretrizes de uso

* **Conteúdo do Drop button:** o dropdown deve ser construído exclusivamente com o componente List do design system.
* **Quantidade de opções:** limite a quantidade de opções (idealmente até 7 itens). Organize os itens em ordem lógica ou de frequência de uso, com separadores quando houver grupos distintos.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Usar o Drop Button apenas para abrir menus de ações diretamente relacionadas ao contexto. |
| Don't |   |   | Não use o Drop Button como substituto para outros componentes de seleção ou navegação. |
| Do |   |   | Construir o menu exclusivamente com os componentes List do design system. |
| Don't |   |   | Não usar o Drop Button para exibir formulários, filtros ou qualquer conteúdo que não seja menu. |

---

## Pendências — não publicar

* 🟡 A página atual não lista `Is Active` (existe na lib, Drop Button 6955:6985).
* 🟡 O Motion atual do Pressed (systemic/default, medium/03) não corresponde a nenhum Motion Style; aqui ficou `Pressed/01`, como nos outros botões. Confirmar com o time de motion.
* 🟡 As seções Sponsor e Employee de Aplicações estão vazias na página atual.
