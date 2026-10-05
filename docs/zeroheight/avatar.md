---
title: Avatar
introduction: O Avatar é um componente utilizado para representar visualmente uma pessoa usuária, seja por meio de imagem, iniciais ou ícone padrão. Ele ajuda na identificação rápida de perfis em áreas onde o contexto pessoal é relevante.
---

# Specs

*Nomes alternativos comuns:* Foto do perfil, User picture, Imagem do usuário.

## Princípios

* **Clareza de identificação** — O Avatar deve facilitar o reconhecimento imediato da pessoa usuária.
* **Consistência visual** — Manter proporções, bordas e estilos alinhados ao Design System.
* **Fallback informativo** — Quando não houver imagem, o Avatar deve exibir ícone ou iniciais de forma clara e legível.

---

## Quando usar

Use Avatares sempre que houver necessidade de identificar ou representar visualmente uma pessoa usuária dentro da interface, especialmente em listas, cabeçalhos, detalhes de perfil e elementos interativos ligados à conta.

### Utilize para

* Exibir foto de perfil da pessoa usuária.
* Representar um usuário em listas, tabelas ou cards.
* Indicar o dono de um conteúdo, como comentários ou avaliações.

### Não utilize para

* Representar objetos, marcas ou elementos que não sejam pessoas usuárias.
* Substituir imagens decorativas ou ilustrativas.
* Exibir informações textuais extensas.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** — círculo (raio pill).
2. **Conteúdo** — Icon `user-line` (Default), iniciais (Initial) ou foto (Image).

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default` (ícone), `Image` (foto) ou `Initial` (iniciais). |
| `Appearance` | Variant | `Neutral` | `Neutral` ou `Inversed` (fundo escuro). Image só existe em Neutral. |
| `Size` | Variant | `Small` | `Small` (40), `Medium` (48) ou `Large` (64). |
| `Text Label` | String | `"AA"` | Iniciais (Kind Initial). |

---

# Guidelines

## Acessibilidade

* Com o nome da pessoa, o Avatar é anunciado como imagem com esse nome, em qualquer Kind.
* Sem nome, é decorativo — use assim quando o nome já aparece em texto ao lado.
* Não é interativo: se abrir o perfil, coloque-o dentro de um link ou botão com nome.
* Contraste das iniciais: 15,27:1 (Neutral) e 5,95:1 (Inversed), AA.

## Diretrizes de uso

* **Escolha o tamanho adequado ao contexto:** Use o tamanho de Avatar disponibilizado pelo DS conforme o espaço e importância da informação.
* **Utilize o fallback apenas quando necessário:** Se não houver imagem, deixe o componente exibir automáticamente o ícone ou iniciais — não substitua manualmente por outras imagens ou símbolos.

## Motion

O Avatar é estático: não tem estados de interação nem animação própria.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o Avatar apenas para identificar pessoas usuárias, garantindo que ele sempre esteja ligado a um nome, ação ou informação relacionada a alguém. |
| Don't |   |   | Não use o Avatar para representar elementos que não sejam pessoas usuárias, como obejtos ou elementos do produto. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Avatar 2278:92), que não tem description.
* 🔴 A seção Motion está com o texto modelo ("Explicação sobre o funcionamento do motion…") e a tabela vazia (Enabled, Hovered, Loading, Pressed) — estados que a lib não tem. Substituir pelo parágrafo acima ou remover.
* 🟡 Texto: "automáticamente" → "automaticamente"; "obejtos" → "objetos".
