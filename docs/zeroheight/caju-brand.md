---
title: Caju brand
introduction: O Caju Brand é um elemento visual fundamental que representa a identidade da Caju dentro dos fluxos do produto. Ele garante consistência no uso da marca, evitando distorções, cores inadequadas ou aplicações incorretas.
---

# Specs

*Nomes alternativos comuns:* Logo Caju, Marca Caju, Identidade visual, Brand.

## Princípios

* **Consistência visual** — O Caju Brand deve sempre reforçar a identidade da empresa de forma uniforme, utilizando apenas as variantes e tokens definidos no design system.
* **Legibilidade e contraste** — A aplicação da marca deve priorizar a clareza, escolhendo a variante correta para garantir contraste adequado em qualquer fundo ou contexto.
* **Uso institucional** — O componente existe para representar a marca de forma oficial dentro dos fluxos. Ele não deve ser usado como elemento decorativo ou fora do contexto institucional.

---

## Quando usar

Use o Caju Brand sempre que for necessário representar institucionalmente a marca dentro da interface — em áreas de autenticação, telas de boas-vindas, campanhas internas ou materiais digitais que exigem a presença do logotipo de forma padronizada.

### Utilize para

* Identificação institucional em fluxos oficiais (login, onboarding, dashboards principais).
* Campanhas internas ou badges em que a marca precise estar presente.
* Reforço visual em comunicações digitais, mantendo consistência da identidade.
* Áreas de rodapé ou header em que a marca é necessária para credibilidade.

### Não utilize para

* Representar conteúdos de usuários ou terceiros.
* Criar novas variações da marca que não existam no design system.
* Usar como ícone decorativo sem relação institucional.
* Aplicar em contextos informais ou fora do ecossistema de produtos oficiais.

## Casos de uso

### Caju Brand vs Ilustrações

As **ilustrações** são elementos gráficos criativas e até estilizadas para transmitir mensagens visuais ou apoiar narrativas da interface. Já o **Caju Brand** segue regras rígidas: proporção, cor e forma não podem ser alteradas. Use **ilustrações** quando quiser apoiar storytelling ou humanizar a comunicação. Use o **Caju Brand** apenas quando a identidade institucional da Caju precisa estar explícita.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Folha**
2. **Caju**
3. **Typography** *(opcional)* — `Show Typography`.

Tamanho fixo: 69×28 com a tipografia, 18×28 só com o símbolo.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Default` | `Default`, `Inversed`, `Full Red`, `Full White` ou `Full Black`. |
| `Show Typography` | Boolean | `true` | Mostra a tipografia "caju" ao lado do símbolo. |

---

# Guidelines

## Acessibilidade

* É anunciado como imagem com o nome "Caju".
* Dentro de um link para a página inicial, o nome deve dizer o destino (ex.: "Caju, página inicial").
* Logotipos são isentos dos critérios de contraste; ainda assim, use a variante indicada para cada fundo.

## Diretrizes de uso

* **Default:** Use a variante Default em fundos claros e neutros, garantindo contraste e legibilidade. Ideal para a maioria dos cenários institucionais.
* **Inversed:** Use a variante Inversed sobre fundos Accent e Inversed, assegurando contraste adequado e consistência visual em contextos não neutros.
* **Full red:** Utilize em fundos brancos ou claros, principalmente em momentos de ênfase institucional em ambientes monocromáticos. Evite em fundos coloridos ou texturizados.
* **Full white:** Use em fundos escuros ou coloridos quando apenas versões monocromáticas forem permitidas. Mantém a legibilidade sem comprometer a identidade.
* **Full black:** Aplique em fundos claros quando for necessário manter neutralidade visual ou em contextos impressos que não suportem cor.

## Motion

O Caju Brand é estático: não tem estados de interação nem animação própria.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o Caju Brand apenas em contextos institucionais, como login, onboarding, menus ou rodapé, reforçando a identidade oficial. |
| Don't |   |   | Não utilize o Caju Brand como elemento decorativo em ilustrações, componente visual ou fundos sem função institucional. |
| Do |   |   | Mantenha o tamanho e proporções originais do Caju Brand, respeitando o espaço mínimo pré definido no Design System. |
| Don't |   |   | Não redimensione manualmente o componente — o uso deve respeitar os tamanhos disponíveis. |
| Do |   |   | Utilize apenas as variantes disponíveis no design system (Default, Inversed, Full Red, Full White, Full Black). |
| Don't |   |   | Não aplique cores que não fazem parte das variantes oficiais. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Caju Brand 11271:154).
* 🔴 Divergência sobre Full White: a description da lib diz "para fundos coloridos, como verde, laranja" e "para fundos vermelhos sempre utilize Inversed"; o zeroheight diz Full white "em fundos escuros ou coloridos" e Inversed "sobre fundos Accent e Inversed". Alinhar os dois textos.
* 🟡 Texto: "elementos gráficos criativas" → "criativos"; "pré definido" → "predefinido"; o título da página é "Caju brand" e o componente "Caju Brand".
* 🟡 "Espaço mínimo pré definido no Design System": o valor não está documentado na lib nem no zeroheight.
