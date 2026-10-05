---
title: Breadcrumbs
introduction: O Breadcrumb é um componente de navegação que mostra a localização atual do usuário dentro de uma hierarquia ou estrutura de conteúdo. Ele oferece links para os níveis superiores, facilitando a navegação.
---

# Specs

*Nomes alternativos comuns:* Breadcrumb trail.

## Princípios

* **Clareza** — O componente reflete sempre a estrutura hierárquica real do site ou aplicativo.
* **Eficiência** — Em caminhos longos, níveis intermediários podem ser ocultados ou resumidos para preservar o layout
* **Consistência** — O último item do Breadcrumb representa a página atual e não é apresentado como link.

---

## Quando usar

Use o Breadcrumb para ajudar os usuários a acompanhar sua localização em longos fluxos ou hierarquias, mostrando a posição da página atual.

### Utilize para

* Em sites ou aplicativos com vários níveis de hierarquia ou páginas aninhadas;
* Para ajudar o usuário a entender onde ele está no contexto geral do sistema;
* Para permitir que o usuário navegue rapidamente para níveis superiores sem precisar usar o botão "voltar".

### Não utilize para

* Em sites ou aplicativos com pouca ou nenhuma hierarquia (menos de três níveis de profundidade);
* Como substituto para a navegação primária (menus ou abas). O Breadcrumb é um elemento de navegação secundária;
* Em situações onde o caminho do usuário é baseado em filtros ou buscas e não em uma hierarquia fixa (nesses casos, use Tags ou Filtros visíveis).
* Ações de Comando, se o elemento tem o objetivo de executar uma ação ou submeter dados (use um Main Button).

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **.Item Kind=Truncate** — o "…" que abre o Popover com os níveis escondidos.
2. **Separator** — navigation-right-line 16.
3. **.Item com link** — nível superior.
4. **.Item atual** — Is Active, sem link.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | Única variante no set. |
| `Show Popover` | Boolean | `false` | Mostra o Popover do Truncate aberto. |
| `showItem03` … `showItem06` | Boolean | `true` | Liga os níveis 3 a 6 da amostra. |

### .Item

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` (Label) ou `Truncate` ("…"). |
| `State` | Variant | `Enable` | `Enable`, `Hovered`, `Pressed` ou `Disabled`. |
| `Is Active` | Variant | `False` | `True` marca a página atual. |
| `Text Label` | String | `"Label"` | Nome do nível. |
| `Has Separator` | Boolean | `true` | Mostra o separador antes do item. |

---

# Guidelines

## Acessibilidade

* É uma região de navegação com nome ("Breadcrumb") e uma lista ordenada de níveis.
* Os níveis superiores são links; a página atual é texto marcado como atual (`aria-current="page"`).
* O "…" é um botão que abre o Popover; `Esc` fecha e devolve o foco.
* Os separadores são decorativos.
* Contraste: página atual 16,96:1 · links 8,24:1 (AA e AAA).

## Diretrizes de uso

* **Link externo:** Em experiências para desktop Ao clicar no item truncado ele expande exibindo o caminho completo do breadcrumb.
* **Mobile:** Em experiências mobile, utilize apenas 2 itens, sendo o primeiro kind=truncate e o segundo a página atual do usuário; Ao clicar no item truncado mostrar o popover com a lista do caminho completo.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Reflita sempre a estrutura hierárquica real da aplicação |
| Don't |   |   | Não torne o último item clicável. Ele deve ser a página atual da navegação. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram dos sets da lib (Breadcrumb 6792:24 e .Item 6713:3).
* 🔴 Conflito: a tab Conteúdo diz que a página de origem "nunca é omitida ou truncada"; o componente (1º item Truncate) e a diretriz Mobile truncam o primeiro nível.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia. No código, o hover usa medium/02 + systemic/accelerate.
* 🟡 O State padrão do .Item está como "Enable" na lib (os outros sets usam "Enabled").
* 🟡 Texto: "Em experiências para desktop Ao clicar" (maiúscula no meio da frase).
* A tab Conteúdo já está publicada no zeroheight e não muda.
