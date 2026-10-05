---
title: Progress Tracker
introduction: Indica o avanço de uma pessoa em um fluxo de múltiplas etapas, mostrando o que já foi concluído, onde ela está e o que ainda falta.
---

# Specs

*Nomes alternativos comuns:* Stepper, Step indicator, Wizard steps, Progress steps.

## Princípios

* **Uma etapa atual por vez** — O fluxo tem um único ponto presente. Tudo antes dele está concluído, tudo depois está pendente. Essa leitura só se sustenta se a sequência for respeitada.
* **Posição, não navegação** — O Progress Tracker informa onde a pessoa usuária está, sem oferecer caminho. Quando uma etapa tem ação, ela vem do Link, não do componente.
* **Etapas nomeadas, não porcentagem** — Cada etapa tem rótulo próprio e significado. Progresso sem nome de etapa pede outro tipo de indicador.

---

## Quando usar

Utilize o Progress Tracker quando o fluxo tem etapas nomeadas em ordem definida e a pessoa usuária precisa se localizar dentro dele, sabendo quanto já avançou e quanto ainda falta.

### Utilize para

* Fluxos de várias telas com etapas nomeadas, como cadastro ou onboarding
* Acompanhamento do andamento de uma solicitação
* Situações em que a ordem das etapas é fixa e conhecida

### Não utilize para

* Progresso contínuo de uma única tarefa, como carregamento ou upload
* Organizar conteúdo paralelo sem ordem definida (utilize o Tabs)
* Navegar entre níveis de hierarquia (utilize o Breadcrumb)
* Fluxos com ordem variável ou etapas opcionais
* Sinalizar erro ou reprovação de etapa

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Marcador** — número ou ícone, conforme Kind
2. **Conector** — traço que liga a etapa à seguinte
3. **Rótulo** — nome da etapa
4. **Descrição** — texto de apoio, opcional
5. **Link** — ação da etapa, opcional

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Orientation` | Variant | `Vertical` | `Vertical` ou `Horizontal`. |
| `Tracker` | Slot | — | Recebe de 2 a 6 instâncias de Progress Tracker Item. |

### Progress Tracker Item

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Number` | `Number` (Marker label) ou `Icon` (Choose Marker icon). |
| `Status` | Variant | `Pending` | `Pending`, `Current` ou `Completed`. |
| `Orientation` | Variant | `Vertical` | Precisa acompanhar a do container. |
| `Marker label` | String | `"1"` | Número da etapa. |
| `Choose Marker icon` | Instance swap | `placeholder-line` | Ícone do marcador (Kind=Icon). |
| `Text Label` | String | `"Label"` | Nome da etapa. |
| `Show Description` | Boolean | `true` | Texto de apoio sob o rótulo. |
| `Text Description` | String | `"Description content"` | Texto de apoio. |
| `Show Link` | Boolean | `true` | Link de ação da etapa. |
| `Show Connector` | Boolean | `true` | Traço até a etapa seguinte; desligado no último item. |

---

# Guidelines

## Acessibilidade

* A lista tem um nome ("Progresso") e cada etapa é um item da lista.
* Cada etapa é lida com o número e o status antes do rótulo (ex.: "Etapa 2, atual: Documentos"); a etapa atual é marcada como atual (`aria-current="step"`).
* O marcador e o conector são decorativos; o status não depende só da cor.
* A etapa não é clicável; o Link é o único elemento interativo.
* Contraste: rótulo 16,96:1 · descrição 8,24:1 · número do marcador 13,56:1 (Pending) e 16,96:1 (Current) · check do Completed 4,54:1 · anel do Current 4,54:1.

## Diretrizes de uso

* Mantenha uma única etapa atual
* Numere as etapas na ordem em que aparecem
* Escreva rótulos curtos, sobretudo na horizontal
* Case a orientação do container e das etapas
* Avalie o espaço antes de usar seis etapas na horizontal

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use o mesmo Kind em todas as etapas do tracker. |
| Don't |   |   | Não use Number em algumas etapas e Icon em outras — o marcador deixa de ser comparável entre elas. |
| Do |   |   | Use Link apenas na etapa que tem ação de verdade. |
| Don't |   |   | Não use Link em todas as etapas, competindo com a leitura do progresso. |
| Do |   |   | Use o Progress Tracker quando as etapas têm nome e ordem. |
| Don't |   |   | Não use o Progress Tracker para carregamento sem etapas definidas — utilize o Spinner ou o Skeleton. |

---

## Pendências — não publicar

* 🔴 Código: a lib estável tem Orientation=Horizontal (container 21470:2390 e item 14415:3778), mas o componente do playground só monta a Vertical.
* 🔴 A seção Motion está com o texto modelo e a tabela vazia (Enabled, Hovered, Loading, Pressed) — o componente não tem estados de interação; sem especificação para a troca de etapa.
* 🟡 Acessibilidade e contrastes são novos (não estão na página).
* 🟡 Contraste: marcador Pending e conector neutro 1,25:1 sobre Surface/default (o status também vem em texto).
* 🟡 O Progress Tracker Item não tem página própria; a description do set está completa e foi usada literal na doc do playground.
* A parte de Conteúdo (Como nomear as etapas, Regras de escrita, Progress Tracker vs. Breadcrumb) já está publicada e não muda.
