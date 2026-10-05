---
title: Date picker
introduction: Calendário para escolher uma data ou um intervalo de datas, com navegação por mês e ano.
---

# Specs

O Date Picker é o calendário do Castanha: mostra os dias de um mês (ou de dois, no Double Calendar), permite escolher uma data ou um intervalo e navegar por mês e ano. Embaixo, mostra a data selecionada por extenso.

Ele aparece dentro do **Date Input** (num Popover) e do **Modal Date Picker**; sozinho, serve para calendários fixos na tela.

---

## Quando usar

### Utilize para

* Escolher uma data em que o dia da semana ou a proximidade com hoje importa (agendamento, vencimento).
* Escolher um intervalo (início e fim), como o período de um relatório ou extrato.
* Ver disponibilidade num calendário fixo na tela.

### Não utilize para

* Datas conhecidas e distantes, como data de nascimento — prefira digitar no **Date Input**.
* Só mês e ano (validade de cartão) — use campos próprios.
* Horários — o Date Picker não escolhe hora.

## Casos de uso

### Date Picker, Date Input e Modal Date Picker

| Componente | Quando |
| --- | --- |
| Date Input | Campo de formulário: digitar a data ou abrir o calendário num Popover. |
| Modal Date Picker | Escolha que precisa de confirmação (Cancelar · Confirmar), só no desktop. |
| Date Picker | Calendário fixo na tela, ou dentro dos dois acima. |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **.Navigation Control** — mês, ano, anterior e próximo.
2. **Dias da semana** — D S T Q Q S S.
3. **.Week com os .Day** — início, meio e fim do intervalo.
4. **Dia atual** — ponto embaixo do número.
5. **Data Selecionada**

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Single Calendar` | `Single Calendar` ou `Double Calendar` (dois meses). |
| `Role` | Variant | `Days Selector` | `Days Selector`, `Month Selector` ou `Year Selector`. |
| `Selected Date Label` | String | `"Data Selecionada"` | Rótulo da data escolhida. |
| `First Day Selected` | String | `"13/01/2023"` | Início (ou data única). |
| `Last Day Selected` | String | `"24/01/2023"` | Fim do intervalo. |
| `Show Selected Dates` | Boolean | `true` | Mostra a Data Selecionada. |
| `Show First Day Selected` | Boolean | `true` | Mostra o início. |
| `Show Last Day Selected` | Boolean | `true` | Mostra o fim. |
| `Show week 01 … 05` | Boolean | `true` | Semanas do mês. |
| `Show week 06` | Boolean | `false` | Sexta semana, para meses que precisam. |

---

# Guidelines

## Acessibilidade

* Cada mês é uma grade com o nome do mês e do ano; os dias da semana são cabeçalhos de coluna com o nome completo.
* Cada dia é um botão com a data por extenso e o estado de selecionado; o dia de hoje é marcado como data atual.
* A Data Selecionada é anunciada sem tirar o foco.
* Datas fora do mínimo e do máximo ficam desabilitadas.

| Tecla | Ação |
| --- | --- |
| `←` `→` | Dia anterior / próximo |
| `↑` `↓` | Semana anterior / próxima |
| `Home` / `End` | Início / fim da semana |
| `PageUp` / `PageDown` | Mês anterior / próximo (com `Shift`: ano) |
| `Enter` / `Espaço` | Seleciona o dia |

### Contraste

* Dia e dias da semana (Text/medium): 8,24:1 sobre Surface/default — AA e AAA.
* Dia selecionado (início e fim): 4,54:1 sobre Surface/accent — AA; dias do meio do intervalo: 15,27:1.
* Ponto do dia atual (Surface/accent): 4,54:1.

## Diretrizes de uso

* Abra o calendário no mês da data já escolhida ou, sem escolha, no mês atual.
* Bloqueie as datas que não podem ser escolhidas, em vez de mostrar erro depois.
* No intervalo, o primeiro clique marca o início e o segundo, o fim.
* Use o Double Calendar quando o intervalo costuma passar de um mês.

## Formato das datas

Use o formato de acordo com o espaço disponível no componente.

* Formato completo: `01 de janeiro de 2025`
* Formato compacto: `01/12/2025` ou `12/25`
* Se o componente não permitir o nome completo, use abreviações com a primeira letra maiúscula. Exemplo: `Segunda = Seg`, `Janeiro = Jan`

---

## Pendências — não publicar

* 🔴 Página nova: o Date Picker não tem página no zeroheight, nem seção [Documentation], nem description no set (17629:24427). Todo o texto (menos o Formato das datas, que vem de Conteúdo › Formatação de dados) precisa de revisão do time.
* 🟡 Motion: sem especificação para a troca de mês e a seleção de dias.
* 🟡 Building blocks .Day, .Week e .Navigation Control documentados só no playground (rascunho), sem página.
