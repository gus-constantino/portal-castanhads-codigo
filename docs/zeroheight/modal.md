---
title: Modal
introduction: O Modal é um componente de sobreposição que bloqueia a interface base para exibir conteúdos focados, como formulários, informações detalhadas ou confirmações. Ele exige atenção da pessoa usuária antes de retornar ao fluxo principal.
---

# Specs

O Modal é um componente de sobreposição que bloqueia a interface base para exibir conteúdos focados. Ele exige atenção da pessoa usuária antes de retornar ao fluxo principal.

*Nomes alternativos comuns:* Dialog modal, Overlay dialog, Pop-up.

## Princípios

* **Foco e interrupção** — Use apenas quando for necessário interromper o fluxo para uma ação ou informação relevante.
* **Clareza de ação** — Deixe evidente o que acontece ao interagir com cada botão.
* **Hierarquia bem definida** — Header, conteúdo e footer guiam a leitura e a decisão.

---

## Quando usar

Utilize o Modal quando for necessário interromper temporariamente o fluxo para apresentar informações importantes, coletar dados ou solicitar uma ação que não pode ser ignorada.

### Utilize para

* Exibir detalhes complementares sem navegação.
* Solicitar confirmações importantes.
* Destacar mensagens críticas ou estados do sistema.

### Não utilize para

* Apresentar formulários — use o **Drawer**.
* Conteúdos longos ou complexos que exigem rolagem extensa.
* Navegação entre múltiplas etapas.
* Substituir páginas completas.
* Exibir informações não prioritárias.

## Modal vs. Drawer

|   | Modal | Drawer |
| --- | --- | --- |
| **Posição** | Centralizado, bloqueia a interface | Lateral, mantém o contexto |
| **Uso** | Interações curtas, objetivas e críticas | Conteúdos densos: formulários, configurações, detalhes |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Modal header** *(opcional)* — título, botão de fechar e divisor.
2. **Slot** *(obrigatório)* — conteúdo livre.
3. **Modal action footer** *(opcional)* — ação primária e secundária.

## Composição do componente

O conteúdo entra no Slot como componente (texto, form, empty state, **Confirmation Message**). Composições próprias viram componente antes de entrar no Slot.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Show Header` | Boolean | `true` | Mostra o Header. |
| `Show Footer` | Boolean | `true` | Mostra o Footer de ações. |
| `Slot` | Slot | — | Conteúdo do Modal. |

## Variações

* **Default:** versão base, qualquer conteúdo no Slot.
* **Confirmation:** Confirmation Message no Slot — `Neutral` (sem impacto crítico), `Warning` (possível consequência negativa) ou `Positive` (confirmação segura ou sucesso).
* **Dialog:** sem botão de fechar, não fecha ao clicar fora e exige ação via botão. Use em confirmações críticas e decisões obrigatórias.

---

# Guidelines

## Tamanho e especificações visuais

* **Largura:** abraça o conteúdo (mínimo 272)
* **Fundo:** `Common/Colors/Surface/default` · **Border radius:** `Common/Border/Radius/medium`
* **Elevação:** `Common/Elevation/level 2`

## Acessibilidade

* É um diálogo modal: o resto da página fica inerte enquanto está aberto.
* O título do Header é o nome acessível; sem Header, informe um rótulo.
* Esc fecha o Modal comum; no Dialog, só as ações fecham.
* Ao fechar, o foco volta para o elemento que abriu o Modal.

## Diretrizes de uso

* **Mantenha o conteúdo objetivo:** evite textos longos ou múltiplas decisões.
* **Priorize uma ação principal** no footer.
* **Controle o fechamento:** fechamento fácil em modais comuns, restrito em casos críticos (Dialog).
* **Use tamanhos adequados** ao conteúdo.
* **Utilize sempre com Backdrop.**
* **Evite uso excessivo de modais.**

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Mantenha sempre o botão de fechar quando o modal não for crítico ou quando não necessitar de uma resposta imediata da pessoa usuária. |
| Don't |   |   | Quando se tratar de um modal com escolha crítica, não insira o botão de fechar. |

---

## Pendências — não publicar

* 🔴 A página atual lista `Kind` (Default · Confirmation), que não existe no componente da lib (Modal 16362:3267). Na lib, Confirmation é o Confirmation Message dentro do Slot.
* 🟡 Motion é placeholder na página atual.
