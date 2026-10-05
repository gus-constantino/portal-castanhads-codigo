---
title: Link
introduction: O Link é um elemento interativo que direciona o usuário para outro destino, como páginas internas, externas, seções específicas ou downloads.
---

# Specs

O Link é um elemento interativo que direciona o usuário para outro destino, como páginas internas, externas, seções específicas ou downloads.

*Nomes alternativos comuns:* Hiperlink, Text Link, Link Button, Anchor.

## Princípios

* **Clareza** — O texto deve indicar com precisão o destino ou recurso acessado.
* **Consistência** — Links devem ter estilo e comportamento uniformes, garantindo que o usuário identifique facilmente o elemento como interativo.
* **Previsibilidade** — O usuário deve entender facilmente o que acontecerá ao clicar no link.

---

## Quando usar

Use o componente **Link** para direcionar o usuário a outro destino, seja uma página interna, um site externo, um documento ou uma seção específica da mesma página.

### Utilize para

* Para redirecionar para sites externos ou recursos fora do produto.
* Para rolar até uma seção específica na mesma página.
* Para abrir documentos, arquivos ou iniciar downloads.
* Para compartilhar recursos, termos, políticas ou conteúdos adicionais.

### Não utilize para

* Para ações que modificam dados, enviam formulários ou executam comandos — use o **Main Button**.
* Para interações que exigem confirmação ou escolha do usuário.
* Para navegação que faz parte da estrutura principal.

## Link vs. Main Button

|   | Link | Main Button |
| --- | --- | --- |
| **Uso** | Navegação: leva a outro local ou recurso | Ação: executa algo no próprio contexto |
| **Efeito** | Muda o contexto | Resposta imediata no mesmo fluxo |

<callout background="1" fullWidth="true">

**Link é para direcionamento** (navegar para outro conteúdo ou recurso) e **Main Button é para ação** (executar algo no próprio contexto da interface).

</callout>

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Link text** *(obrigatório)* — descreve o destino.
2. **Icon** *(opcional)* — reforça a navegação; em link externo, indica a mudança de contexto.

## Composição do componente

Texto do link seguido do componente **Icon** (Small), que pode ser trocado ou escondido.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | Cor: `Accent`, `Neutral` ou `Inversed` (fundos escuros). |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Link Content` | String | `"Link content"` | Texto do link. |
| `Show Trailing Item` | Boolean | `true` | Mostra o ícone à direita. |
| `Change Icon` | Swap component | `navigation-right-line` | Ícone à direita. |

---

# Guidelines

## Acessibilidade

* É um `<a href>` nativo: anunciado como link, com o texto como nome.
* O ícone é decorativo; o destino precisa estar claro no texto.
* Link externo em nova aba: deixe isso claro no texto ou no ícone.
* Tab foca o link; Enter navega. Disabled sai da tabulação.
* Contraste: Neutral 16,96:1 (AA e AAA); Accent 4,54:1 (AA); Inversed sobre `Surface/accent` 4,54:1 (AA).

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

## Diretrizes de uso

* **Link externo:** para links externos, considerar indicar com ícone e/ou abrir em nova aba.
* **Link vs Button:** use Link para levar o usuário a outro destino e Botão para executar ações no próprio contexto da aplicação.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Usar rótulos descritivos: o texto do link deve indicar claramente para onde o usuário será levado ou qual recurso será acessado. |
| Don't |   |   | Textos genéricos não informam para onde o link leva, prejudicando a experiência e a acessibilidade. |
| Do |   |   | Posicionar links em contextos relevantes: insira próximo ao conteúdo relacionado, evitando que o usuário procure. |
| Don't |   |   | Não inserir links distantes do conteúdo que descrevem: isso prejudica a relação e o entendimento do destino. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style: Anatomia e Propriedades vieram da seção [Documentation] Link do Figma (3686:475) e do set da lib (4926:213).
* 🟡 Motion atual: Hovered com expressive/decelerate · medium/02 e Pressed com systemic/default · short/03 não correspondem aos Motion Styles de hover e press. Confirmar com o time de motion.
* 🟡 A tab Conteúdo já existe na página; não substituir.
