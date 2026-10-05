---
title: Banner
introduction: O Banner destaca conteúdo promocional ou informação relevante em uma área própria da tela. Reúne título, descrição e indicação de ação em um bloco clicável por inteiro, com fundo de cor livre ou imagem de fundo. Serve para atrair a pessoa usuária sem interromper o que ela está fazendo.
---

# Specs

*Nomes alternativos comuns:* Hero card, Promo banner, Feature card, Callout.

## Princípios

* **Uma mensagem, uma ação** — O Banner comunica um assunto só e leva a um único destino. Mais de uma chamada dilui a mensagem e quebra a lógica da área clicável única.
* **Convite, não interrupção** — Diferente dos componentes de sobreposição, o Banner convive com o conteúdo da página. Ele atrai a atenção, mas a pessoa usuária pode seguir seu fluxo sem interagir.
* **Legibilidade acima da estética** — A cor de fundo e a imagem são livres. A escolha precisa preservar o contraste do texto em todos os estados, não apenas no estado inicial.

---

## Quando usar

Utilize o Banner para destacar uma oferta, novidade ou informação relevante que leve a pessoa usuária a um destino específico, sem interromper o fluxo em que ela está.

### Utilize para

* Divulgar produtos, ofertas ou novidades
* Destacar informação relevante que tenha destino próprio
* Direcionar para uma página ou fluxo específico

### Não utilize para

* Comunicar status, erro ou consequência de uma ação (utilize o Alert)
* Organizar conteúdo em blocos de mesma hierarquia (utilize o Card)
* Disparar ação na própria página, como abrir um modal
* Agrupar mais de um destino no mesmo bloco
* Conteúdo que exija leitura longa

## Casos de uso

### Banner vs Card

Use o Banner quando a peça precisa de peso de destaque e leva a um destino único — especialmente em comunicação promocional, onde ela precisa se diferenciar do resto da página. O Card é indicado para organizar conteúdo em blocos de mesma hierarquia, desde que os itens sejam comparáveis entre si.

### Banner vs Alert

Use o Banner quando o conteúdo é um convite que a pessoa usuária pode ignorar sem prejuízo. O Alert é indicado para comunicar status do sistema ou consequência de uma ação, desde que a mensagem seja relevante para o momento em que ela está.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

**Illustration** — 1. Fundo · 2. Título · 3. Descrição · 4. Indicação de CTA · 5. Ilustração

**Image** — 1. Imagem de fundo · 2. Backdrop · 3. Título · 4. Descrição · 5. Indicação de CTA

## Composição do componente

O Banner é composto por:

* Fundo (obrigatório): cor livre na variante Illustration, imagem com Backdrop na variante Image
* Conteúdo (obrigatório): título e descrição
* Indicação de CTA (opcional): rótulo e ícone, sem componente Button
* Ilustração (opcional): apenas na variante Illustration

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Illustration` | `Illustration` (fundo de cor sólida com ilustração na lateral) ou `Image` (imagem no fundo, com Backdrop). |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Illustration` | Instance swap | `notificacoes/sino` | Ilustração do [Caju] Illustrations. |
| `Text Title` | String | `"Label"` | Título (.Content Banner). |
| `Text Description` | String | `"Description"` | Descrição (.Content Banner). |
| `CTA Text Label` | String | `"Label"` | Texto da indicação de CTA. |
| `Show Text Title` | Boolean | `true` | Mostra o título. |
| `Show CTA` | Boolean | `true` | Mostra a indicação de CTA. |
| `Appearance` (.Content Banner) | Variant | `Neutral` | `Neutral` em fundos claros; `Inversed` em fundos escuros ou sobre imagem. |

Largura mínima de 280px; a altura acompanha o conteúdo.

---

# Guidelines

## Acessibilidade

* O Banner inteiro é a área clicável: um link (com destino) ou um botão. O nome é o título, a descrição e o texto do CTA.
* O CTA é apenas indicação visual da ação — não é um botão, não é focável separadamente e não deve haver mais de um por banner.
* A ilustração é decorativa.
* Contraste no fundo padrão (Decorative/01): 10,17:1 no Enabled, 7,47:1 no Hovered, 5,35:1 no Pressed.

## Diretrizes de uso

* **Escolha a cor pensando no contraste:** A cor de fundo é livre, então o componente não garante contraste por si. Valide a legibilidade no estado Enabled e escolha Appearance=Neutral em fundos claros ou Inversed em fundos escuros. Os estados Hovered e Pressed aplicam overlay e podem reduzir o contraste.
* **Use imagem que tolere enquadramento largo:** A imagem de fundo é recortada no centro, e o recorte aumenta conforme o banner se alonga. Prefira imagens com o assunto centralizado e sem texto embutido.
* **Mantenha um destino por banner:** A área clicável é única. Duas chamadas no mesmo bloco tornam ambíguo para onde a pessoa usuária está indo.
* **Escreva título curto e descrição objetiva:** O Banner compete com o conteúdo da página. Texto longo anula o destaque que justifica o uso do componente.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Um assunto por banner: título, descrição e CTA falam da mesma coisa e levam ao mesmo destino. |
| Don't |   |   | Não misture assuntos no mesmo banner. Como o destino é único, dois temas deixam a pessoa usuária sem saber para onde está indo. |
| Do |   |   | Combine Appearance=Inversed com fundo escuro ou imagem de fundo. |
| Don't |   |   | Não mantenha Appearance=Neutral sobre fundo escuro: o texto perde contraste e reprova AA. |
| Do |   |   | Use o Banner para conteúdo promocional que a pessoa usuária pode ignorar sem prejuízo. |
| Don't |   |   | Não use o Banner para comunicar erro ou status do sistema — utilize o Alert. |

---

## Pendências — não publicar

* 🔴 Página nova: o Banner não tem página no zeroheight. Fonte: [Documentação] Banner (6795:20954, set atual) e a description do set (20051:15726).
* 🔴 Altura: a description diz que "a altura acompanha o conteúdo", mas o Figma (e o código, C27) tem a área do conteúdo com 122 de altura — títulos de duas linhas ou descrições longas são cortados. Decidir se o container passa a abraçar o conteúdo (muda o tamanho padrão de 170 para 175).
* 🟡 Acessibilidade ("Tópico 1 / Ordem de leitura"), "Casos de exceção" (lorem ipsum) e Motion ("Especificação") do [Documentação] ainda estão com texto de exemplo.
