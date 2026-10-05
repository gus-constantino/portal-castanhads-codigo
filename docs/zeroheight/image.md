---
title: Image
introduction: O componente Image é utilizado para exibir imagens estáticas em diferentes contextos do produto, garantindo consistência visual e preservação correta das proporções. Ele oferece controle simples e direto permitindo que a imagem se adapte a diferentes layouts sem distorção.
---

# Specs

*Nomes alternativos comuns:* Imagem, Media / Media Object, Picture

## Princípios

* **Clareza visual** — A imagem deve preservar sua proporção original sempre que possível, evitando cortes ou distorções que prejudiquem a compreensão do conteúdo.
* **Consistência** — Aspect ratios padronizados garantem previsibilidade entre componentes que exibem mídia dentro do produto.
* **Flexibilidade** — A variante none permite uso mais livre da imagem, enquanto 1:1 e 3:2 organizam a composição em layouts que exigem estrutura fixa.

---

## Quando usar

Use o componente Image sempre que for necessário exibir uma imagem estática que complemente ou enriqueça o conteúdo. Ele é indicado para cartões, listas, modais e demais áreas onde a imagem apoia a compreensão ou a tomada de decisão, além de ser útil em layouts que exigem padronização visual por meio de proporções consistentes entre múltiplas imagens.

### Utilize para

* Reforçar contexto visual em cards, tabelas, resumos e destaques.
* Mostrar prévias ou thumbnails com proporção consistente.
* Exibir imagens responsivas que devem se adaptar ao container mantendo o ratio.

### Não utilize para

* Exibir mídias interativas, animadas ou em movimento, como GIFs, WebP animado ou vídeos — o componente Image suporta apenas imagens estáticas.
* Ilustrações decorativas que não exigem controle de proporção — nesses casos, utilize diretamente o asset ou outro componente apropriado.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Frame** — recebe a imagem pelo Fill e corta para caber na proporção.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Aspect Ratio` | Variant | `None` | `None` (proporção da imagem), `1:1` ou `3:2`. |

---

# Guidelines

## Acessibilidade

* O texto alternativo é o que o leitor de tela anuncia: descreva o conteúdo quando a imagem informa algo.
* Quando a imagem é decorativa ou repete o texto ao lado, deixe o texto alternativo vazio.
* Não coloque texto importante só dentro da imagem.

## Diretrizes de uso

* **Inserção da imagem no Figma:** O componente Image é estruturado por um frame que recebe a imagem diretamente pelo Fill do Figma, onde a pessoa usuária deve inserir exclusivamente arquivos estáticos (JPG, PNG, WebP estático ou SVG estático). A imagem não deve ser adicionada como layer separado, garantindo que o componente mantenha suas proporções e variantes de Aspect Ratio funcionando corretamente.
* **Imagens:** Utilize apenas imagens estáticas (JPG, PNG, WebP estático ou SVG estático) para garantir consistência e performance no produto.

## Motion

O Image é estático: não tem estados de interação nem animação própria.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Insira a imagem sempre através do Fill, preservando a integridade do componente. |
| Don't |   |   | Não adicione a imagem como layer solto dentro do frame — isso quebra a estrutura do componente. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Image 2273:320), que não tem description.
* 🔴 A seção Motion está com o texto modelo ("Explicação sobre o funcionamento do motion…") e a tabela vazia (Enabled, Hovered, Loading, Pressed) — estados que a lib não tem. Substituir pelo parágrafo acima ou remover.
* 🟡 Não há seção de Acessibilidade (texto alternativo); a desta página é nova.
