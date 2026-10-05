---
title: Date input
introduction: Campo de data da família Text Fields — digitar com máscara dd/mm/aaaa ou escolher no calendário.
---

# Specs

O Date Input é o Text Input com máscara de data (dd/mm/aaaa) e o botão de calendário. A pessoa pode digitar a data ou abrir o **Date Picker** num Popover.

---

## Quando usar

### Utilize para

* Datas em formulários (vencimento, início de vigência, data de nascimento).
* Quando digitar é mais rápido que navegar no calendário, mas o calendário ajuda a conferir o dia da semana.

### Não utilize para

* Escolha de data que precisa de confirmação separada — use o **Modal Date Picker**.
* Só mês e ano — use campos próprios.
* Horários.

## Casos de uso

### Date Input vs Modal Date Picker

O Date Input fica no formulário e aceita digitar; o calendário abre num Popover e a data vale na hora. O Modal Date Picker abre uma janela e só aplica a data no Confirmar.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Label Content**
2. **Text Box** — com máscara dd/mm/aaaa.
3. **Calendar Button** — abre o Date Picker.
4. **Supporting Message**

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Single Calendar` | Calendário de um ou dois meses no Popover. |
| `Appearance` | Variant | `Neutral` | `Neutral` ou `Warning` (erro). |
| `State` | Variant | `Enabled` | `Enabled`, `Disabled`, `Hovered` ou `Pressed`. |
| `Is Filled` | Variant | `False` | `True` quando há valor. |
| `Is Active` | Variant | `False` | `True` com o campo em foco ou o calendário aberto. |
| `Show Label` | Boolean | `true` | Mostra o Label. |
| `Text Label` | String | `"Label"` | Nome do campo. |
| `Show Required` | Boolean | `true` | Mostra a indicação de obrigatório. |
| `Show Trailing Item` | Boolean | `true` | Mostra o botão de calendário. |
| `Show Supporting Content` | Boolean | `true` | Mostra a mensagem de apoio/erro. |
| `Supporting Message` | String | `"Supporting Message"` | Mensagem de apoio. |
| `Error Message` | String | `"Error Message"` | Mensagem de erro (Warning). |
| `Show Character Counter` | Boolean | `true` | Mostra o contador. |
| `Character Counter Value` | String | `"-0000"` | Texto do contador. |
| `Show Caret` | Boolean | `true` | Cursor de digitação para prototipação; não é requisito de código. |

---

# Guidelines

## Acessibilidade

* O campo tem o Label como nome e aceita digitar a data; a máscara põe as barras.
* O botão de calendário tem nome ("Abrir calendário") e diz se o calendário está aberto.
* O calendário segue o teclado do Date Picker; `Esc` fecha e devolve o foco ao campo.
* Erros aparecem em texto (Error Message), além da cor.

## Diretrizes de uso

* Mostre o formato esperado (dd/mm/aaaa) no placeholder ou na mensagem de apoio.
* Valide a data ao sair do campo e explique o erro ("Data inválida", "Escolha uma data a partir de hoje").
* Para datas distantes (nascimento), deixe a pessoa digitar; o calendário é apoio.

## Formato das datas

* Formato compacto: `01/12/2025` ou `12/25`

---

## Pendências — não publicar

* 🔴 Página nova: o Date Input não tem página no zeroheight, nem seção [Documentation], nem description no set (17962:70687). Todo o texto precisa de revisão do time.
* 🔴 Contraste (família Text Fields): placeholder 2,78:1 e contorno do campo 1,25:1.
* 🟡 Contador ligado por padrão com "-0000" no Figma (C57).
* 🟡 Motion: sem especificação para abrir e fechar o calendário.
