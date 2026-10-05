---
title: Progress line
introduction: O Progress Line é um indicador visual não interativo que representa o progresso de uma operação ao longo do tempo, ajudando a pessoa usuária a entender em que estágio o processo se encontra.
---

# Specs

O Progress Line é um indicador visual não interativo que representa o progresso de uma operação ao longo do tempo.

*Nomes alternativos comuns:* Progress Bar, Barra de progresso, Indicador de progresso linear.

## Princípios

* **Clareza** — O avanço deve ser compreensível mesmo sem texto auxiliar.
* **Previsibilidade** — A barra cresce sempre da esquerda para a direita.
* **Consistência** — Padrão visual alinhado aos demais indicadores de status.

---

## Quando usar

Use o Progress Line para comunicar o andamento de uma operação mensurável, especialmente quando a pessoa usuária acompanha a evolução de uma tarefa até a conclusão.

### Utilize para

* Indicar progresso de carregamentos com percentual conhecido.
* Representar etapas concluídas em processos lineares.
* Comunicar avanço de ações que levam alguns segundos ou mais.

### Não utilize para

* Estados de carregamento sem previsão de término — use o **Spinner**.
* Indicar apenas que algo está em processamento, sem progresso mensurável.
* Apenas como separador visual.

## Progress line vs. Spinner vs. Stepper

|   | Progress line | Spinner | Stepper |
| --- | --- | --- | --- |
| **Progresso** | Contínuo, em percentual | Indeterminado | Etapas discretas |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Track** *(obrigatório)* — fundo da barra.
2. **Indicador de progresso** *(obrigatório)* — cresce conforme o percentual.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Percent` | Variant | `0` | De `0` a `100`, em passos de 10. |

---

# Guidelines

## Acessibilidade

* É uma barra de progresso (`role="progressbar"`) com valor de 0 a 100.
* Dê um nome que diga o que está avançando (ex.: "Envio dos documentos").

## Diretrizes de uso

* **Representar progresso real:** valores que correspondam de fato ao estado da operação.
* **Manter visibilidade adequada:** próximo ao conteúdo ou ação relacionada.
* **Complementar com indicador textual:** etapa atual e total (ex.: "Etapa 1 de 4"), logo abaixo ou acima da barra.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Utilize o Progress Line quando houver um percentual claro de avanço, por exemplo, etapas concluídas. |
| Don't |   |   | Não use o Progress Line em ações instantâneas ou sem dados de progresso, como uma simples troca de tela. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Progress Line 2322:4006).
* 🟡 Motion é placeholder na página atual.
* 🟡 Seções Sponsor e Employee de Aplicações estão vazias.
