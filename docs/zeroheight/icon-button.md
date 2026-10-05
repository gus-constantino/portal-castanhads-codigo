---
title: Icon button
introduction: O Icon Button é um botão compacto que exibe apenas um ícone, sem rótulo de texto. Ele é utilizado para ações rápidas, geralmente secundárias, em interfaces que exigem economia de espaço e onde o significado do ícone é amplamente reconhecido.
---

# Specs

O Icon Button é um botão compacto que exibe apenas um ícone, sem rótulo de texto. Ele é utilizado para ações rápidas, geralmente secundárias, em interfaces que exigem economia de espaço e onde o significado do ícone é amplamente reconhecido.

*Nomes alternativos comuns:* Action Button, Icon Action, Quick Action.

## Princípios

* **Reconhecível** — O ícone deve comunicar de forma imediata e clara a ação que executa, sem depender de texto.
* **Localizável** — O botão deve ser fácil de identificar e selecionar, mesmo em interfaces densas ou com muitos outros elementos próximos.
* **Consistente** — Deve manter alinhamento visual e comportamental com outros botões e ícones do sistema, reforçando a previsibilidade.

---

## Quando usar

Use o Icon Button quando for necessário representar uma ação de forma compacta, especialmente em interfaces com espaço limitado ou em contextos onde o significado do ícone é amplamente reconhecido pelo usuário. Ele é ideal para ações recorrentes e secundárias — como editar, excluir, compartilhar ou expandir — e deve ser sempre acompanhado de uma tooltip para garantir clareza e acessibilidade.

### Utilize para

* Para ações com espaço limitado (ex: toolbars, cards, tabelas).
* Quando o ícone for amplamente compreendido e não necessitar de texto.
* Para representar ações recorrentes como “editar”, “fechar”, “favoritar” ou “compartilhar”.

### Não utilize para

* Quando a ação não for óbvia apenas com o ícone.
* Para ações críticas sem texto ou contexto adicional.
* Como substituto de botões principais em fluxos essenciais — use o **Main Button**.

## Icon button vs. Main button

|   | Icon Button | Main Button |
| --- | --- | --- |
| **Rótulo** | Só ícone | Texto |
| **Prioridade** | Ações complementares ou de menor prioridade | Ações principais e mais evidentes |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** *(obrigatório)* — área clicável, fundo e estado.
2. **Icon** *(obrigatório)* — comunica a ação.

## Composição do componente

O Icon Button usa o componente **Icon** e, com `Show Notification`, o **Badge**.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | Ênfase: `Default` ou `Ghost`. |
| `Appearance` | Variant | `Accent` | Cor: `Accent`, `Inversed` ou `Neutral`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Size` | Variant | `Medium` | `Medium` (48) ou `Small` (40). |
| `Icon` | Swap component | `placeholder-line` | Ícone da ação. |
| `Show Notification` | Boolean | `false` | Mostra um Badge de notificação. |

> As propriedades antigas `Type` e `Style` foram substituídas por `Kind` e `Appearance`.

---

# Guidelines

## Acessibilidade

* É um `<button>` nativo. Sem texto visível, o nome vem do rótulo acessível (`aria-label`), obrigatório.
* O ícone é decorativo; nunca dependa dele para o nome.
* Em ações de alternar (ex.: favoritar), use `aria-pressed`.
* Com `Show Notification`, inclua a contagem no rótulo acessível (ex.: "Notificações, 3 novas").
* Tab foca o botão; Enter e Espaço acionam. Disabled sai da tabulação.
* Em web, forneça uma tooltip com a descrição da ação.

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

## Diretrizes de uso

Os estilos seguem três níveis de ênfase, de acordo com a importância da ação.

* **Use tooltips sempre que possível:** em web, forneça uma tooltip com a descrição da ação.
* **Escolha ícones claros e universalmente reconhecíveis:** lixeira para excluir, lápis para editar, seta para seguir.
* **Reserve para ações secundárias ou rápidas:** ações principais devem ser feitas com Main Button.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Quando for necessário utilizar vários botões, siga a hierarquia visual da interface. |
| Don't |   |   | Não deixe o Icon Button mais chamativo que o botão principal. |

---

## Pendências — não publicar

* 🟡 A página atual não lista a Appearance `Inversed` nem `Show Notification`, que existem na lib (Icon Button 4464:636).
* 🟡 Contraste do ícone por Appearance: medir com a doc do Icon.
* 🟡 Imagens: reaproveitar as da página atual.
