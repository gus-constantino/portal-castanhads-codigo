---
title: Search input
introduction: Campo de busca da família Text Fields, com a lupa fixa e o botão de limpar quando há texto.
---

# Specs

O Search Input é o campo de busca da família Text Fields. Tem a mesma anatomia do Text Input, com o ícone de lupa fixo à esquerda e, quando há texto, o botão de limpar à direita.

---

## Quando usar

### Utilize para

* Buscar itens numa lista, tabela ou catálogo.
* Filtrar resultados enquanto a pessoa digita.
* Encontrar uma opção em conjuntos grandes, quando um Select não basta.

### Não utilize para

* Escolher entre poucas opções conhecidas — use um **Select Input**.
* Entrada de dados de formulário — use o **Text Input**.
* Navegação principal do produto.

## Casos de uso

### Search Input vs Async Select Input

O Search Input filtra um conteúdo que está na tela (lista, tabela). O Async Select Input também busca, mas para escolher um valor que vai preencher o campo.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Label Content**
2. **Lead Icon** — search-line, fixo.
3. **Text Box** — texto buscado.
4. **Clear Button** — aparece com texto.
5. **Supporting Message**

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Neutral` ou `Warning` (erro). |
| `State` | Variant | `Enabled` | `Enabled`, `Disabled`, `Hovered` ou `Pressed`. |
| `Is Filled` | Variant | `False` | `True` quando há valor. |
| `Is Active` | Variant | `False` | `True` com a lista aberta (Select) ou o campo em foco. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Label` | String | `"Label"` | Nome do campo. |
| `Show Required` | Boolean | `true` | Mostra a indicação de obrigatório. |
| `Required Text` | String | `"(Obrigatório)"` | Texto da indicação. |
| `Show Trailing Item` | Boolean | `true` | Mostra o item à direita. |
| `Show Supporting Content` | Boolean | `true` | Mostra a mensagem de apoio/erro. |
| `Supporting Message` | String | `"Supporting Message"` | Mensagem de apoio. |
| `Error Message` | String | `"Error Message"` | Mensagem de erro (Warning). |
| `Show Caret` | Boolean | `true` | Cursor de digitação para prototipação; não é requisito de código. |
| `Show Character Counter` | Boolean | `true` | Mostra o contador. |
| `Character Counter Value` | String | `"-0000"` | Texto do contador. |

---

# Guidelines

## Acessibilidade

* É um campo de busca com o Label como nome; `Enter` dispara a busca.
* O botão de limpar tem nome ("Limpar busca"); depois de limpar, o foco volta ao campo.
* A lupa é decorativa.
* Ao filtrar, anuncie a quantidade de resultados.

## Diretrizes de uso

* Diga no placeholder o que pode ser buscado ("Nome ou CPF"), sem substituir o Label.
* Posicione o campo junto ao conteúdo que ele filtra, acima da lista ou da tabela.
* Quando não houver resultado, explique e ofereça "Limpar busca" (ver Empty state em Feedback Pages).

---

## Pendências — não publicar

* 🔴 Página nova: o Search Input não tem página no zeroheight, nem seção [Documentation] na página Text fields, nem description no set (14880:3404). Todo o texto precisa de revisão do time.
* 🔴 Contraste (família Text Fields): placeholder 2,78:1 e contorno do campo 1,25:1.
