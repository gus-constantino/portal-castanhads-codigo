---
title: Bottom sheet
introduction: Apresente conteúdo ou ações complementares numa camada que surge da base da tela, sem tirar a pessoa do contexto.
---

# Specs

Camada que surge da base da tela para apresentar conteúdo ou ações complementares sem tirar a pessoa do contexto. A tela de fundo continua visível. Use sempre sobre um **Backdrop** — no Castanha é ele que separa a camada da interface por baixo, e sem ele a folha não se distingue do fundo.

---

## Quando usar

### Utilize para

* Ações a partir de um elemento da tela.
* Escolha entre poucas opções.
* Confirmações em que ver o fundo ajuda.
* Conteúdo complementar curto.

### Não utilize para

* Desktop e tablet — use **Modal** ou **Drawer**.
* Fluxos com várias etapas.
* Conteúdo extenso.
* Navegação principal.
* No lugar de uma página.

<callout background="1" fullWidth="true">

**Disponibilidade:** mobile only. Em desktop e tablet, use Modal ou Drawer.

</callout>

## Bottom sheet vs. Modal

|   | Bottom sheet | Modal |
| --- | --- | --- |
| **Quando** | Preservar o contexto da tela ajuda a decisão | A interrupção é o ponto |
| **Plataforma** | Mobile | Todas |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Handle** *(obrigatório)* — fixo na borda superior; indica que a folha pode ser arrastada e dispensada. Não remova.
2. **Header** *(opcional)* — título e botão de fechar. Títulos curtos e diretos.
3. **Content** *(obrigatório)* — conteúdo no Slot: texto, lista, seleção ou Confirmation Message.
4. **Footer** *(opcional)* — ação primária e secundária. Não altere a orientação nem a ordem dos botões.

## Composição do componente

Use um componente do Castanha no Slot. Se você criou uma composição própria, transforme em componente antes de inserir.

* **Confirmação:** Confirmation Message no Slot, com estilo `Neutral`, `Positive` ou `Warning` conforme o impacto da ação.
* **Seleção:** Selection List no Slot, quando a folha existir para escolher entre opções.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Show Header` | Boolean | `true` | Mostra o Header (título e fechar). |
| `Show Footer` | Boolean | `true` | Mostra o Footer de ações. |
| `Slot` | Slot | — | Conteúdo da folha. |

---

# Guidelines

## Tamanho e especificações visuais

* **Border radius:** 16 nos cantos superiores, 0 embaixo
* **Handle:** 40×4, `Icons/soft`
* **Footer:** botões empilhados (Pilled)

## Acessibilidade

* É um diálogo modal: o resto da página fica inerte enquanto a folha está aberta.
* O título do Header é o nome acessível; sem Header, informe um rótulo.
* O Handle é decorativo: arrastar não é o único jeito de fechar — há o botão de fechar, as ações e o Esc.
* Ao fechar, o foco volta para o elemento que abriu a folha.

## Diretrizes de uso

* **Uma decisão por folha.** Destaque a ação primária e evite ambiguidade entre as opções.
* **Conteúdo curto.** A folha precisa ser rápida de ler e agir. Se o conteúdo exige rolagem longa, o caso pede uma página.
* **Alinhe o conteúdo do Slot** com o header e o footer, usando a mesma margem lateral — a menos que a imagem ou lista deva ocupar a largura inteira de propósito.

---

## Pendências — não publicar

* 🟡 Página nova: não existe página do componente no zeroheight (só a de regras de texto, "Bottom sheet" em Experiências e Jornadas). O texto vem da description do componente na lib (Bottom Sheet 20848:2679).
* 🟡 A página do Backdrop linka para `p/28482d` (Bottom sheet), que não existe.
* 🟡 Motion: sem especificação na lib nem no zeroheight.
* 🟡 Categoria sugerida: `Componentes > Containers`. Vincular a página de regras de texto como tab Conteúdo.
