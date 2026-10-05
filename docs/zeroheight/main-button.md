---
title: Main button
introduction: Main Button é um componente interativo usado para executar a ações mais importantes em uma tela, formulário ou fluxo.
---

# Specs

Main Button é um componente interativo usado para executar a ações mais importantes em uma tela, formulário ou fluxo.

*Nomes alternativos comuns:* Botão, CTA, Button, Call to Action.

## Princípios

* **Identificável** — Os botões devem indicar que podem desencadear uma ação.
* **Encontrável** — Os botões devem ser fáceis de encontrar entre outros elementos, incluindo outros botões.
* **Claro** — A ação e o estado de um botão devem ser claros.

---

## Quando usar

Use o Main Button para representar ações diretas e claras que o usuário pode realizar. Ele deve ser facilmente identificado e utilizar verbos no infinitivo ou imperativo (ex: Salvar, Enviar, Confirmar).

### Utilize para

* Iniciar um processo (ex: "Enviar formulário").
* Navegar para uma próxima etapa (ex: "Próximo").
* Confirmar ou cancelar ações.
* Destacar a ação principal em uma tela ou modal.

### Não utilize para

* Exibir informações estáticas.
* Simular links de navegação — use o **Link**.
* Realizar múltiplas ações conflitantes em um único botão.

## Main button vs. Link

|   | Main Button | Link |
| --- | --- | --- |
| **Uso** | Muda o estado da interface ou dispara um processo | Navegação para outra página, rota ou seção |
| **Exemplos** | Enviar formulário, salvar dados, excluir itens, confirmar escolhas | Termos de uso, FAQ, artigos |

## Main button vs. Icon button

|   | Main Button | Icon Button |
| --- | --- | --- |
| **Rótulo** | Texto claro | Só ícone |
| **Uso** | Ações críticas ou menos óbvias | Ações rápidas, recorrentes ou com espaço limitado |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** *(obrigatório)* — define o tamanho, preenchimento, bordas e fundo do botão.
2. **Lead Icon** *(opcional)* — à esquerda do texto, reforça o significado da ação.
3. **Label** *(obrigatório)* — texto central que comunica a ação.
4. **Trailing Icon** *(opcional)* — à direita do texto; indica menus, avanços de etapa ou ações complementares.

## Composição do componente

O Main Button usa o componente **Icon** no Lead Icon e no Trailing Icon. Todos os elementos são configuráveis e opcionais, com exceção do label, que é obrigatório.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | Ênfase: `Default` ou `Ghost`. |
| `Appearance` | Variant | `Accent` | Cor: `Accent`, `Neutral` ou `Inversed` (fundos escuros). |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Size` | Variant | `Medium` | `Medium` (48) ou `Small` (40). |
| `Text Label` | String | `"Label"` | Texto do botão. |
| `Show Lead Icon` | Boolean | `true` | Mostra o ícone à esquerda. |
| `Lead Icon` | Swap component | `placeholder-line` | Ícone à esquerda. |
| `Show Trailing Icon` | Boolean | `true` | Mostra o ícone à direita. |

> As propriedades antigas `Type` e `Style` foram substituídas por `Kind` e `Appearance`.

## Comportamento

A animação abrange os estados de interação, sem delay entre os estágios.

---

# Guidelines

## Tamanho e especificações visuais

* **Altura:** 48 (`Medium`) ou 40 (`Small`)
* **Padding horizontal:** `Common/Sizes/20` · **Gap:** `Common/Sizes/8` · **Ícones:** 20
* **Border radius:** `Common/Border/Radius/medium` (`Medium`) e `small` (`Small`)
* **Fundo Accent:** `Common/Colors/Accent/Solid/medium`
* **Label:** `Label/Medium Label` (`Medium`) e `Caption/Medium` (`Small`); no Pressed, a versão Bold
* **Disabled:** `Common/Opacity/light`

## Acessibilidade

* É um `<button>` nativo: anunciado como botão, com o Label como nome.
* Os ícones são decorativos; o nome vem só do Label.
* Tab foca o botão; Enter e Espaço acionam.
* Disabled sai da tabulação e é anunciado como indisponível.
* Contraste: Default · Accent 4,54:1 (AA); Default · Neutral 15,27:1 e Default · Inversed 16,96:1 (AA e AAA); Ghost · Accent 4,54:1 (AA). Disabled é isento do critério 1.4.3.

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

## Diretrizes de uso

Os estilos seguem três níveis de ênfase: ação principal (`Accent`), secundária (`Neutral`) e terciária (`Ghost`).

* **Labels:** claros, objetivos e descritivos. Evite "OK" ou "Clique aqui".
* **Ícones:** só quando agregam valor, como apoio ao texto.
* **Mobile:** empilhe os botões e use 100% da largura, de preferência fixos no rodapé.
* **Ação destrutiva:** use `Default` · `Accent`, com label que deixa clara a consequência, e confirme em modal ou alerta.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use apenas um Main Button primário (accent) por tela ou seção. |
| Don't |   |   | Não use múltiplos Main Buttons primários em uma mesma hierarquia visual. |
| Do |   |   | Inclua ícones apenas quando agregarem valor e sem prejudicar a legibilidade. |
| Don't |   |   | Não insira ícones que não comuniquem claramente a ação. |
| Do |   |   | Use o Main Button para ações (ex: enviar, excluir, confirmar). |
| Don't |   |   | Não use o Main Button como elemento de navegação entre páginas — use o componente Link nesses casos. |

---

## Pendências — não publicar

* 🟡 O zeroheight documenta o estado **Loading**, que não existe no set da lib estável (Main Button 4464:427). Decidir se entra na lib ou sai da doc.
* 🟡 O zeroheight descreve o Trailing Icon como componente aninhado com `Arrow direction`; a lib só expõe `Show Trailing Icon`.
* 🟡 Imagens dos Do's & Don'ts e de Estilos: reaproveitar as da página atual.
* 🟡 Sugestão de escrita (§11.2 E): a `introduction` atual começa com "Main Button é um componente…". Alternativa: "Execute as ações mais importantes de uma tela, formulário ou fluxo." Mantido o texto do time até decidirem.
* 🟡 A tab Conteúdo (regras de texto) já existe na página; não substituir.
