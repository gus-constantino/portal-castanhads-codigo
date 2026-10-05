---
title: Dropzone
introduction: O Dropzone é a área delimitada onde a pessoa usuária adiciona arquivos, pelo botão de seleção ou arrastando o arquivo para dentro dela. A área informa os formatos e limites aceitos antes do envio. O acompanhamento de cada arquivo enviado fica no Upload Item.
---

# Specs

*Nomes alternativos comuns:* File upload, File uploader, Upload area, Drop area, Área de upload.

## Princípios

* **Área explícita** — A área delimitada mostra onde o arquivo deve ser solto antes de qualquer interação, em vez de depender de a pessoa usuária descobrir que pode arrastar.
* **Restrição antes do erro** — Os formatos e limites aceitos aparecem na própria área, para que a pessoa usuária saiba o que enviar antes de tentar.
* **Caminho de toque garantido** — Existe sempre um caminho de clique ou toque: no Desktop, o Main Button; no Mobile, a área inteira, que funciona como um único botão. Arrastar é complemento, nunca o único caminho.

---

## Quando usar

Use o Dropzone quando a pessoa usuária precisa anexar um ou mais arquivos dentro de um fluxo, e é importante deixar claro quais formatos e limites o envio aceita. Ele funciona bem em formulários, cadastros e envio de documentos, onde o arquivo é parte da tarefa e não a tarefa inteira. Na maioria dos casos ele não aparece sozinho: o Dropzone cobre a entrada dos arquivos e o Upload Item, agrupado no Upload List, cobre o acompanhamento do envio.

### Utilize para

* Anexar documentos e comprovantes dentro de um formulário
* Envio de um ou mais arquivos na mesma etapa do fluxo
* Casos em que os formatos e o tamanho aceitos precisam estar visíveis antes do envio

### Não utilize para

* Exibir arquivos já enviados (utilize o Upload List)
* Ação isolada de upload, sem contexto de formulário, quando um botão resolve (utilize o Main Button)
* Captura de imagem pela câmera como ação principal

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

**A. Desktop** — 1. Área de drop · 2. Shaped Icon · 3. Título · 4. Descrição · 5. Main Button

**B. Mobile** — 6. Área clicável · 7. Shaped Icon · 8. Título · 9. Descrição

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed`, `Dragover` ou `Disabled`. |
| `Text Title` | String | `"Adicionar arquivos"` | Título da área. |
| `Text Description` | String | `"Arquivos permitidos: JPG e PNG"` | Formatos e limites aceitos. |
| `Show Text description` | Boolean | `true` | Mostra a descrição. |
| `Show Main button` | Boolean | `true` | Mostra o Main Button (Desktop). |

Desktop e Mobile vêm da coleção File Upload (Is Desktop / Is Mobile; tablet usa o Mobile).

---

# Guidelines

## Acessibilidade

* Desktop: o seletor de arquivos abre pelo Main Button ("Selecionar arquivos"), com teclado.
* Mobile: a área inteira é um botão, com o título como nome e a descrição como descrição.
* Arrastar é opcional: tudo o que se faz arrastando também se faz pelo botão.
* Contraste: título 16,96:1 · descrição 8,24:1. O contorno tracejado (Border/medium) tem 2,78:1; no Dragover, 4,54:1.

## Diretrizes de uso

* **Use o Dropzone com o Upload Item:** O Dropzone cobre só a entrada dos arquivos. O acompanhamento do envio, o erro e a remoção ficam no Upload Item, listado logo abaixo da área. Sem esse par, a pessoa usuária adiciona o arquivo e não recebe retorno do que aconteceu com ele.
* **Deixe as restrições visíveis:** Informe os formatos, o tamanho e a quantidade aceitos na própria área, antes do envio. A pessoa usuária não deve descobrir a regra pela mensagem de erro.
* **Trate a área inteira como botão no Mobile:** No Desktop a seleção acontece pelo Main Button. No Mobile não há botão: a área inteira é o gatilho, porque arrastar não funciona em dispositivos de toque. Nada dentro da área deve competir com esse toque.
* **Adeque o título ao arquivo esperado:** Troque o título padrão quando o fluxo pede um documento específico, como “Adicionar comprovante”. O título genérico serve de ponto de partida, não de resposta final.

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Nomeie no título o arquivo que o fluxo espera, como “Adicionar comprovante”. |
| Don't |   |   | Não use o título para explicar a mecânica da interação, como “Clique aqui para escolher um arquivo”. |
| Do |   |   | Use o Dropzone para adicionar arquivos e o Upload List para acompanhar o envio. |
| Don't |   |   | Não use o Dropzone para exibir os arquivos que já foram enviados. |

---

## Pendências — não publicar

* 🔴 Contraste: o contorno tracejado (Border/medium) tem 2,78:1 sobre Surface/default — abaixo de 3:1 (WCAG 1.4.11). Mesmo token da borda do Checkbox (C134).
* 🟡 Sem seção de Motion; a transição para Dragover não tem Motion Style. No código, short/03 + systemic/accelerate.
* 🟡 O set da lib não tem description. As Aplicações (Sponsor/Employee) não estão na página.
