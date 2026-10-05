---
title: Drawer
introduction: O Drawer é um painel lateral deslizante utilizado para expor conteúdos complementares ou etapas adicionais dentro de um fluxo principal, sem interromper a tela atual. Ele aparece sobreposto à interface e permite que a pessoa usuária mantenha o contexto enquanto realiza uma interação específica.
---

# Specs

O Drawer é um painel lateral deslizante utilizado para expor conteúdos complementares ou etapas adicionais dentro de um fluxo principal, sem interromper a tela atual.

*Nomes alternativos comuns:* Side Panel, Painel Lateral, Lateral Sheet, Sheet.

## Princípios

* **Contextual** — Mantém a pessoa usuária no fluxo principal, exibindo apenas o que se relaciona ao contexto atual.
* **Direto** — Suporta apenas interações simples, sem múltiplas etapas, subfluxos ou navegações internas.
* **Não obstrutivo** — Ocupa parte da tela e pode ser fechado facilmente a qualquer momento.

---

## Quando usar

Use o Drawer para tarefas que exigem mais espaço do que um Modal, mas que ainda precisam manter o contexto da navegação primária.

### Utilize para

* Formulários com múltiplos campos, que exigem foco sem abandonar a página principal.
* Visualização de detalhes e configurações de um item.
* Interações mais complexas do que as suportadas por um Modal, mas com ações simples.

### Não utilize para

* Interações muito simples ou críticas que exijam apenas uma confirmação rápida — use o **Modal**.
* Exibir conteúdo principal de uma página ou substituir navegação primária.
* Fluxos com subfluxos, navegação interna ou múltiplas etapas.

<callout background="1" fullWidth="true">

**Disponibilidade:** Desktop-only. Em Tablet e Mobile, o painel dá lugar a um Viewport Restriction.

</callout>

## Drawer vs. Modal

|   | Drawer | Modal |
| --- | --- | --- |
| **Posição** | Painel lateral, preserva o contexto | Centralizado, bloqueia a interface |
| **Conteúdo** | Mais extenso: formulários, detalhes, edições | Curto, direto e potencialmente crítico |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Header** *(obrigatório)* — título.
2. **Slot** *(obrigatório)* — conteúdo de quem usa.
3. **Footer action** *(opcional)* — ação secundária e primária.
4. **Close button** *(obrigatório)* — fecha o Drawer.
5. **Drawer container** *(obrigatório)* — painel de 640 de largura.

## Composição do componente

Header obrigatório (título + botão de fechar), Slot de conteúdo e barra de ações opcional. É apresentado sempre sobre o **Backdrop**.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Text Title` | String | `"Title"` | Título do Header. |
| `Show Action Buttons` | Boolean | `true` | Mostra a barra de ações. |
| `Show Secondary Action Button` | Boolean | `true` | Mostra a ação secundária. |
| `Slot` | Slot | — | Conteúdo do Drawer. |

> As propriedades antigas `With button?` e `Heading` foram substituídas por `Show Action Buttons` e `Text Title`.

## Comportamento

O Drawer surge da borda direita, sobre o Backdrop. Fecha pelo botão de fechar, pelo Esc e pelo clique no Backdrop.

<callout background="1" fullWidth="true">

**Importante:** o nome correto da camada escura é Backdrop. Não use "Overlay" na documentação.

</callout>

---

# Guidelines

## Tamanho e especificações visuais

* **Largura:** 640 (mínimo 640)
* **Fundo:** `Common/Colors/Surface/default`
* **Elevação:** `Common/Elevation/level 1`

## Acessibilidade

* É um diálogo modal: o resto da página fica inerte enquanto está aberto.
* O título do Header é o nome acessível; o botão de fechar tem rótulo.
* Ao abrir, o foco entra no Drawer e fica preso nele; ao fechar, volta para o gatilho.

## Diretrizes de uso

* **Padrão de abertura lateral:** sempre do mesmo lado, para manter a previsibilidade.
* **Uso obrigatório de Backdrop:** direciona o foco para o painel e permite fechar ao clicar fora.
* **Limitação de complexidade:** sem fluxos internos, subetapas, abas, tabelas ou listas densas.
* **Complemento ao fluxo principal:** as ações previstas são concluídas ali mesmo.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use um título claro e direto: ajuda a pessoa usuária a entender imediatamente o propósito da Drawer. |
| Don't |   |   | Não utilize títulos genéricos ou vagos: eles dificultam a compreensão do contexto. |
| Do |   |   | Organize o conteúdo de forma objetiva e hierarquizada. |
| Don't |   |   | Não insira conteúdo denso ou componentes complexos: tabelas, abas e estruturas profundas. |

---

## Pendências — não publicar

* 🔴 A página atual diz que a Drawer abre "do lado esquerdo da tela para o direito"; a description da lib (Drawer 16456:4381) diz que surge da direita. O playground segue a lib.
* 🟡 A página atual chama o Backdrop de Overlay e pede para inserir o Overlay manualmente; no componente, o Backdrop já vem junto.
* 🟡 Motion é placeholder na página atual.
