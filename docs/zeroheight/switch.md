---
title: Switch
introduction: O Switch é um componente que funciona como um interruptor digital, alterando imediatamente o estado de uma configuração entre opções binárias, como sim ou não, e ligado ou desligado, sem necessidade de confirmação.
---

# Specs

*Nomes alternativos comuns:* Switch, toggle Lightswitch, Toggle button, Toggle.

## Princípios

* **Ação binária** — Representa um estado entre “ligado” ou “desligado” para uma função específica. Cada Switch deve controlar uma **única configuração** binária.
* **Mudança instantânea** — Use o Switch apenas quando a **ação for instantânea** e não exigir um botão de "Salvar" ou "Aplicar".
* **Contexto de controle** — Deve ser usado apenas para configurações que afetam diretamente o sistema ou funcionalidade.

---

## Quando usar

O switch é utilizado para configurações cujo efeito é instantâneo e visível, sem a necessidade de confirmar a ação. É importante usá-lo somente para configurações que o usuário possa reverter facilmente pelo componente.

### Utilize para

* Ajustes instantâneos como ativar notificações ou mudar para o modo escuro.
* Ações contínuas e binárias, como ligar ou desligar.
* Alterar entre estados.

### Não utilize para

* Executar uma única ação.
* Em listas com apenas uma opção de escolha.

## Casos de uso

### Switch vs Radio button

O **Switch** é ideal para um controle imediato binário, no caso de um controle de som, o switch trocaria o status entre ligado e desligado, pois o usuário percebe o efeito no mesmo instante. Nesse caso, um cenário para utilizar o Radio button seria escolher entre diferentes modos de som, como ”alto”, "médio” e "silencioso", onde apenas uma opção pode estar ativa por vez.

### Switch vs Checkbox

O Switch funciona como um interruptor, alterando imediatamente o estado de uma configuração entre opções binárias, como sim e não e ligado e desligado, sem necessidade de confirmação. Ideal para ajustes instantâneos como ativar notificações ou mudar para o modo escuro. Já o Checkbox é usado para permitir que o usuário selecione ou aceite uma ou mais opções, geralmente aplicadas apenas após um ação de confirmação, como enviar o formulário.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Track** — trilho 40×24.
2. **Toggle** — círculo 16×16 que desliza no Selected.
3. **Text Label** *(opcional)* — texto da configuração.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Status` | Variant | `Unselected` | `Selected` ou `Unselected`. |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Text Label` | String | `"Label"` | Texto da configuração. |
| `Show Text Label` | Boolean | `true` | Mostra o texto. Sem ele, o texto continua como nome acessível. |

---

# Guidelines

## Acessibilidade

* Teclado: `Tab` move o foco; `Espaço` liga ou desliga.
* Leitor de tela: `<input type="checkbox" role="switch">` — anuncia "interruptor", o Label e o estado (ligado ou desligado).
* A mudança é imediata: não peça confirmação nem use o Switch em formulários com botão de enviar.
* Disabled usa o `disabled` nativo: sai da ordem de foco e é anunciado como indisponível.
* Contraste: Label 16,96:1 (AA e AAA); Track 16,96:1 (Unselected) e 4,54:1 (Selected) sobre Surface/default.

## Diretrizes de uso

* **Contexto visual:** Sempre posicione o switch proxímo à configuração que controla, garantindo contexto visual imediato, evitando switches sem texto ou com significado ambíguo, o propósito do componente sempre deve estar explícito para o usuário.

## Motion

A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente.

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Quando tiver configurações independentes que terão efeito automático. |
| Don't |   |   | Quando tiver elementos que podem ser selecionados como um bloco. |
| Do |   |   | Para habilitar ou desabilitar ações ou configurações. |
| Don't |   |   | Como gatilho para ações ou quando quiser executar uma ação. |
| Do |   |   | Alterar entre diferentes estados de uma opção. |
| Don't |   |   | Alterar entre opções não binárias. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Switch 4895:809).
* 🟡 Motion: Is Active True e False (expressive/decelerate · medium/02) não correspondem a nenhum Motion Style. No código, o Toggle desliza em medium/02 com systemic/accelerate.
* 🟡 Texto: "proxímo" → "próximo"; aspas misturadas em ”alto”, "médio” e "silencioso"; "toggle Lightswitch" parece faltar vírgula.
