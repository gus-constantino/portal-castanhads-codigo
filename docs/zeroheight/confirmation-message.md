---
title: Confirmation message
introduction: Mostre o resultado de uma ação com ícone, título e descrição centralizados.
---

# Specs

O Confirmation Message mostra o resultado de uma ação em uma composição centralizada: Shaped Icon, título e descrição. Aparece em conteúdos de confirmação, como o corpo de um Modal ou de um Bottom Sheet.

---

## Quando usar

Use quando a pessoa precisa saber o resultado de uma ação, dentro de um container.

### Utilize para

* Confirmar que uma ação foi concluída (`Positive`).
* Avisar sobre algo que pede atenção antes de seguir (`Warning`).
* Informar um estado neutro (`Neutral`).

### Não utilize para

* Telas inteiras de sucesso, erro ou empty state — use as **Feedback Pages**.
* Mensagens curtas e temporárias — use o **Toast**.
* Avisos dentro de um fluxo — use o **Alert**.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Shaped Icon** *(obrigatório)* — Large (56), com a mesma Appearance do componente.
2. **Title** *(obrigatório)* — `Title/Medium`.
3. **Description** *(obrigatório)* — `Body/Regular`.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Neutral` | `Neutral`, `Positive` ou `Warning`; define a cor do Shaped Icon. |

---

# Guidelines

## Acessibilidade

* O ícone é decorativo: o resultado precisa estar no título.
* Título e descrição são lidos em ordem.
* Quando aparece depois de uma ação, leve o foco ao título ou anuncie a mensagem (`role="status"`).
* Contraste: título 16,96:1 e descrição 8,24:1 (AA e AAA).

## Diretrizes de uso

* Use a Appearance do resultado: `Positive` para ação concluída, `Warning` para o que pede atenção, `Neutral` para informar.
* Siga as regras de texto das Feedback Pages: título diz o que aconteceu, descrição diz o próximo passo.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Título objetivo e descrição com o próximo passo. |
| Don't |   |   | Título genérico e "com sucesso" — não explicam o que aconteceu nem o que vem depois. |

---

## Pendências — não publicar

* 🟡 Página nova: texto escrito a partir do set da lib (Confirmation Message 16359:1803) e do playground, sem texto do time. Revisar Specs e Diretrizes.
* 🟡 Categoria sugerida: `Componentes > Content`.
* 🟡 Imagens: produzir os exemplos de Appearance e Do/Don't.
