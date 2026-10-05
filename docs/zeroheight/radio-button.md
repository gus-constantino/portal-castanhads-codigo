---
title: Radio Button
introduction: Radio Button é um componente interativo usado para permitir ao usuário selecionar uma única opção de um conjunto. Essencial em formulários para escolhas únicas.
---

# Specs

## Princípios

* **Conciso** — Deve trazer poucas opções curtas, com poucas palavras, que não pedem explicação adicional.
* **Unitário** — Deve trazer apenas decisões únicas e em um grupo fechado
* **Exclusividade** — Permite selecionar apenas uma opção dentro de um mesmo grupo, evitando ambiguidades.

---

## Quando usar

O Radio Button é muito útil em formulários, pesquisas e fluxos de cadastro, onde a pessoa usuária precisa escolher uma opção em uma lista curta, ou responder uma pergunta de escopo fechado.

### Utilize para

* Exibir uma lista de duas a cinco opções para a análise da pessoa usuária.
* Possibilitar a escolha de uma opção em uma lista pequena.
* Exibir opções que precisam de confirmação posterior, como em um formulário.
* Quando todas as opções podem ser apresentadas de forma clara e o usuário precisa vê-las para tomar uma decisão informada.

### Não utilize para

* Possibilitar a seleção de várias opções ao mesmo tempo - nesse caso, considere usar checkboxes.
* Ação de Comando: Se o clique executa uma função ou comando, e não uma seleção (use um Botão).
* Navegação: Se o item leva a outra página ou seção (use um Link ou Botão).
* Alternância de Estado Imediata: Se a ação é imediata e alterna um estado sem necessidade de confirmação (use um Toggle Switch).
* Sinalizar apenas consentimento ou uma confirmação por parte da pessoa usuária, com uma opção. Para esse caso, o checkbox é mais adequado.
* Exibir uma lista com mais de cinco itens. Considere o uso de um Select Input nesse caso.

## Casos de uso

### Radio button vs Checkbox

O **Radio Button** permite a escolha de apenas uma opção, dentre um grupo de opções mutuamente excludentes. Ele é comum durante o preenchimento de um formulário, por exemplo. Já **Checkbox** permite que a pessoa usuária selecione ou aceite uma, ou mais opções ao mesmo tempo, geralmente aplicadas apenas após uma ação de confirmação, como enviar o formulário.

### Radio button vs Switch Toggle

O **Radio Button** é usado para seleções **que serão processadas posteriormente**, por exemplo, em um fluxo de cadastro, com duas ou mais opções, que pedem confirmação posterior. Já o Switch funciona como um **interruptor**, alterando **imediatamente** o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Selector** — área de toque 48×48.
2. **Radio** — círculo 24×24 com ponto no Selected.
3. **Text Label** *(opcional)* — texto da opção.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Status` | Variant | `Unselected` | `Selected` ou `Unselected`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Text Label` | String | `"Label"` | Texto da opção. |
| `Show Text Label` | Boolean | `true` | Mostra o texto. Sem ele, o texto continua como nome acessível. |

---

# Guidelines

## Acessibilidade

* Teclado: `Tab` entra no grupo (na opção selecionada) e sai dele; as setas movem a seleção entre as opções; `Espaço` seleciona a opção em foco.
* Leitor de tela: `<input type="radio">` nativo — anuncia "botão de opção", o Label, o estado e a posição no grupo (ex.: 1 de 3).
* O grupo vem do `name` comum; use `<fieldset>` com `<legend>` para anunciar a pergunta do grupo.
* Disabled usa o `disabled` nativo e é anunciado como indisponível.
* Contraste: Label 16,96:1 (AA e AAA); Selected 4,54:1 sobre Surface/default.

## Diretrizes de uso

* **Conteúdo:** A label deve ser curta e descritiva, informando rapidamente a opção correspondente, com poucas palavras.

## Motion

A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente.

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Enabled | Ao sair do hover | `Hover In/01` |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use quando for necessário uma fazer uma seleção única. |
| Don't |   |   | Não use para seleções múltiplas. |
| Do |   |   | Use para um conjunto de menos de cinco opções. |
| Don't |   |   | Não use em seleções em bloco. |
| Do |   |   | Use para formulários ou fluxos que terão confirmação posterior. |
| Don't |   |   | Não use para ajustes refletidos imediatamente na tela. |
| Don't |   |   | Não use para listas longas, com mais de cinco opções. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Radio Button 4429:10437).
* 🔴 Contraste: a borda do Unselected (Border/medium) tem 2,78:1 sobre Surface/default — abaixo do mínimo de 3:1 (WCAG 1.4.11).
* 🟡 Motion: o Pressed (expressive/default · medium/01) não corresponde a nenhum Motion Style; a troca de Status não está especificada.
* 🟡 Texto: o parágrafo de Motion começa com " animação" (falta o "A"); "Use para um conjunto de menos de cinco opções" × "duas a cinco opções" em Utilize para.
