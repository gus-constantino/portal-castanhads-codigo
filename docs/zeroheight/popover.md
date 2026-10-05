---
title: Popover
introduction: Popover é um pequeno overlay contextual que aparece quando o usuário interage com um elemento da interface. Ele permite exibir conteúdos adicionais, ações ou informações complementares de forma leve, sem interromper o fluxo principal da experiência.
---

# Specs

Popover é um pequeno overlay contextual que aparece quando o usuário interage com um elemento da interface.

*Nomes alternativos comuns:* Overlay, Floating panel, Context menu.

## Princípios

* **Contextualidade** — Deve aparecer sempre em relação direta a um elemento disparador.
* **Clareza** — O conteúdo precisa ser fácil de entender e diretamente útil.
* **Leveza** — Deve ser usado para interações breves, sem interromper o fluxo do usuário.

---

## Quando usar

Use o Popover para apresentar informações ou ações diretamente relacionadas a um elemento. Ele é sempre acionado por um componente que o dispare e desaparece quando o foco é perdido.

### Utilize para

* Exibir opções ou ações relacionadas a um elemento interativo.
* Mostrar conteúdos complementares de forma temporária.
* Disponibilizar pequenos blocos de interação sem abrir novas janelas.
* Organizar elementos de escolha ou seleção em contexto.

### Não utilize para

* Mostrar dicas ou explicações simples — use o **Tooltip**.
* Exibir informações persistentes que exigem confirmação — use o **Modal**.
* Apresentar conteúdos extensos ou fluxos complexos.
* Exibir mensagens informativas não relacionadas a um trigger.

<callout background="1" fullWidth="true">

**Disponibilidade:** web only — utilizado apenas em experiências web.

</callout>

## Popover vs. Tooltip vs. Modal

|   | Popover | Tooltip | Modal |
| --- | --- | --- | --- |
| **Interação** | Interativo, qualquer conteúdo via slot | Dica textual passiva | Bloqueia a interface |
| **Uso** | Ações e conteúdos contextuais | Explicações simples | Fluxos importantes ou decisões críticas |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container com Slot** *(obrigatório)* — conteúdo de quem usa; como menu de ações, use o List.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Slot` | Slot | — | Conteúdo do Popover. |

## Comportamento

Ancorado no gatilho, abaixo e alinhado à esquerda por padrão. Esc e clique fora fecham; o foco volta para o gatilho.

---

# Guidelines

## Tamanho e especificações visuais

* **Fundo:** `Common/Colors/Surface/default` · **Border radius:** `Common/Border/Radius/large`
* **Elevação:** `Common/Elevation/level 3` · **Padding:** 8

## Acessibilidade

* O painel tem nome acessível (ex.: "Mais ações").
* O gatilho anuncia o estado aberto ou fechado.
* Enter ou Espaço no gatilho abre e fecha; Esc fecha.

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Abrir (Is Active → True) | On click | `Selected In/01` |
| Fechar (Is Active → False) | On click | `Selected Out/01` |

## Diretrizes de uso

* **Não dê detach ao utilizar o slot:** sempre insira o conteúdo dentro do slot mantendo o componente instanciado.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o Popover para exibir opções ou ações diretamente ligadas ao elemento disparador. |
| Don't |   |   | Não utilize para destacar conteúdos que não estejam associados a um disparador. |
| Do |   |   | Mantenha o conteúdo dentro do Popover curto e funcional. |
| Don't |   |   | Evite colocar fluxos longos, formulários extensos ou múltiplas seções dentro do Popover. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do componente da lib (Popover 2270:102).
* 🟡 A description do componente na lib tem um trecho de texto gerado por IA ("Com certeza! Seguindo o mesmo formato…") e o conteúdo repetido. Limpar na lib.
* 🟡 A entrada e a saída ainda não estão animadas no componente do playground.
