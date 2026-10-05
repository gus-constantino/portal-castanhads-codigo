---
title: Icon
introduction: Icon (ícone) é uma representação visual simples que auxilia na comunicação de ações, estados, tipos de conteúdo ou categorias.
---

# Specs

## Princípios

* **Clareza** — Cada **Icon** deve comunicar seu significado de forma imediata e reconhecível, evitando ambiguidade ou interpretações duplas.
* **Consistência** — Os **Icons** devem seguir os tamanhos, cores e estilos definidos pelo Design System para manter harmonia visual em toda a interface.
* **Funcionalidade** — O **Icon** deve ter um propósito claro — complementar informações ou representar ações — nunca ser apenas decorativo sem intenção definida.

---

## Quando usar

Use o Icon quando for necessário representar uma ação, status, tipo de conteúdo ou categoria de forma visual e rápida, especialmente em interfaces compactas ou de alta densidade informacional. O Icon deve sempre reforçar a mensagem transmitida, e não substituí-la — por isso, é indicado seu uso acompanhado de texto em casos de possível ambiguidade.

### Utilize para

* Use Icon para reforçar ações e tornar a interface mais escaneável.
* Para sinalizar status ou estados do sistema.
* Em componentes de navegação (ex: setas, chevrons, home).
* Para manter consistência visual em interfaces densas ou modulares.

### Não utilize para

* Como único meio de transmitir uma informação crítica ou funcional.
* Em contextos onde o reconhecimento visual não for garantido (ex: públicos diversos ou não familiarizados).
* Se o uso do Icon gerar ruído visual ou competir com outros elementos.
* Quando o significado do Icon não for claro sem suporte textual.

## Casos de uso

### Icon vs Button Icon

O componente **Icon** representa apenas o símbolo gráfico em si — sem interação por padrão — e deve ser utilizado de forma complementar, como elemento visual dentro de outros componentes ou experiências. Já o **Button Icon** é um componente interativo que combina um Icon com comportamento de botão, sendo projetado para executar ações ao clique ou toque. Use o **Icon** isoladamente quando a intenção for reforçar visualmente uma informação ou interface, sem gerar interação direta. Utilize o **Button Icon** quando o Icon for o elemento acionável principal, como em barras de ferramentas, menus compactos ou ações rápidas com foco na iconografia.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Icon** — símbolo escolhido em Choose Icon (16, 20 ou 24).

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Choose Icon` | Instance swap | `placeholder` | Ícone da biblioteca. |
| `Appearance` | Variant | `Accent` | `Accent`, `Neutral`, `Positive`, `Warning`, `Negative`, `Informative` ou `Inversed`. |
| `Size` | Variant | `Small` | `Small` (16), `Medium` (20) ou `Large` (24). |

---

# Guidelines

## Acessibilidade

* Sem nome acessível, o Icon é decorativo: o significado precisa estar no texto ao lado.
* Com nome, vira imagem com nome — use só quando o ícone informa sozinho.
* Não é interativo: para ação, use o Icon Button.
* Contraste sobre Surface/default: de 4,54:1 (Accent) a 16,96:1 (Neutral), todos acima de 3:1 para elementos gráficos.

## Diretrizes de uso

* **Tamanhos:** Utilize sempre os tamanhos padronizados definidos pelo Design System (SM, MD e LG) para garantir alinhamento visual e consistência entre os componentes. Não redimensione manualmente os Icons no Figma ou via CSS — use apenas os tamanhos definidos nas propriedades do componente.
* **Cores:** Utilize apenas as cores semânticas disponibilizadas nas propriedades do componente. Essas cores foram definidas para manter consistência visual, comunicar estados corretamente e garantir acessibilidade. Evite aplicar cores arbitrárias ou fora dos tokens semânticos predefinidos, mesmo que visualmente semelhantes.

## Motion

O Icon é estático: não tem estados de interação nem animação própria.

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Icon 2261:1126).
* 🟡 Não há Do's and Don'ts nem exemplos em Aplicações (Sponsor e Employee vazios).
* 🟡 Texto: "informacional.O Icon" e "experiências.Já" sem espaço depois do ponto (corrigido aqui).
