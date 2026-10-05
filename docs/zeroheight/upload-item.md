---
title: Upload item
introduction: O Upload Item representa um arquivo dentro do fluxo de upload, do envio em curso até o arquivo já armazenado. Ele mostra o nome, a extensão, o estado do envio e as ações disponíveis para aquele arquivo.
---

# Specs

*Nomes alternativos comuns:* File item, Upload row, Attachment item, Item de upload.

## Princípios

* **Um arquivo, um item** — Cada item representa um único arquivo e carrega só o que diz respeito a ele: identificação, estado e ações.
* **Estado sempre visível** — O item declara em que ponto do envio o arquivo está, sem depender de mensagem fora do componente.
* **Extensão preservada** — O nome do arquivo pode truncar, a extensão não. É ela que identifica o tipo do arquivo quando o nome é longo.

---

## Quando usar

Use o Upload Item para representar cada arquivo que a pessoa usuária adicionou, logo abaixo do Dropzone. Ele cobre o acompanhamento do envio, o retorno de sucesso ou falha e as ações sobre o arquivo, que o Dropzone não faz. Quando há mais de um arquivo, os itens são agrupados no Upload List. O item também serve para arquivos já armazenados, enviados em outra sessão.

### Utilize para

* Acompanhar o progresso do envio de um arquivo
* Comunicar sucesso ou falha do envio, com a ação de tentar novamente
* Listar arquivos já enviados, com baixar e remover
* Exibir o arquivo abaixo do Dropzone que o originou

### Não utilize para

* Adicionar arquivos (utilize o Dropzone)
* Listar documentos que não vieram de um upload
* Representar mais de um arquivo em um único item

### Upload Item e Upload List

O Upload Item representa um arquivo. Quando o fluxo aceita mais de um, os itens são agrupados no Upload List, que é um Auto Layout vertical com espaçamento fixo e um slot que só aceita Upload Item. O List existe para garantir ordem e espaçamento consistentes entre os arquivos, sem acrescentar conteúdo próprio: nome, estado e ações continuam sendo do item. Com um arquivo só, o Upload Item pode ser usado direto, sem a lista.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

**A. Enviando** — 1. Loading · 2. Nome do arquivo · 3. Extensão · 4. Mensagem de estado · 5. Progress Line

**B. Enviado** — 6. Elemento de apoio · 7. Ação 2 · 8. Ação 1

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Status` | Variant | `Uploading` | `Uploading`, `Success`, `Error` ou `Uploaded`. |
| `Text Title` | String | `"File name"` | Nome do arquivo, sem a extensão. |
| `File Extension` | String | `".jpg"` | Extensão (não trunca). |
| `Success message` | String | `"Enviado com sucesso"` | Mensagem do Success. |
| `Description` | String | `"Enviado em 10/05/2025"` | Texto do Uploaded. |
| `Show primary action` | Boolean | `true` | Mostra remover. |
| `Show secondary action` | Boolean | `true` | Mostra baixar (ou tentar de novo, no Error). |

### Upload List

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Upload itens` | Slot | — | Só aceita Upload Item. Espaçamento 8 entre itens. |

---

# Guidelines

## Acessibilidade

* O item é um grupo com o nome completo do arquivo, mesmo quando o nome trunca na tela.
* A mensagem de estado é anunciada quando muda, sem tirar o foco.
* A barra de progresso informa o percentual.
* As ações têm nome com o arquivo: "Remover comprovante-residencia.pdf", "Baixar …", "Tentar de novo: …".
* Contraste: nome e extensão 8,24:1 · sucesso 5,36:1 · falha 6,41:1.

## Diretrizes de uso

* **Use o Upload Item junto do Dropzone:** O item não adiciona arquivos: ele mostra o que já foi adicionado. Aparece logo abaixo do Dropzone que o originou e, quando há mais de um arquivo, agrupado no Upload List.
* **Preserve a extensão do arquivo:** O nome trunca no fim, em uma linha. A extensão fica fora do truncamento, porque é ela que identifica o tipo do arquivo quando o nome é longo.
* **Ofereça a ação que o status pede:** Falha pede tentar novamente e remover. Arquivo enviado pede baixar e remover. Envio em curso não oferece ação.
* **Passe o nome do arquivo já tratado:** O componente só exibe o texto que recebe. Extrair nome e extensão do arquivo é responsabilidade da implementação.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Passe nome e extensão em campos separados, como “comprovante-residencia” e “.pdf”. |
| Don't |   |   | Não coloque a extensão dentro do nome, porque ela entra no truncamento e desaparece. |
| Do |   |   | Use o Upload Item para acompanhar e agir sobre o arquivo, e o Dropzone para adicionar. |
| Don't |   |   | Não use o Upload Item como área para adicionar arquivo. |

---

## Pendências — não publicar

* 🔴 Propriedades do zeroheight × lib (15029:1115): o zeroheight lista Status `Disabled`, `Lead Icon` e `Label Content`, que não existem no set.
* 🟡 Sem seção de Motion (nem para a troca entre Status).
* 🟡 O Upload List não tem página própria; a seção "Upload Item e Upload List" desta página é a referência dele.
* 🟡 "Enviado com sucesso" usa o pleonasmo que as regras de escrita evitam (ver Toast, C136). Sugestão: "Enviado".
