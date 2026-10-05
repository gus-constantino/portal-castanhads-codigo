---
title: Pagination
introduction: O Pagination (paginação) permite navegar entre conjuntos de dados distribuídos em várias páginas, otimizando a performance da visualização e facilitando o consumo de grandes volumes de dados.
---

# Specs

*Nomes alternativos comuns:* Content pagination, Numbered pagination, Pagination controls.

---

## Quando usar

O componente Pagination deve ser utilizado sempre que for necessário dividir grandes volumes de conteúdo em partes navegáveis, melhorando a legibilidade e a performance da interface. O componente oferece ao usuário controle sobre a navegação entre páginas e pode possui a opção de incluir funcionalidades como seleção de itens por página, indicação de intervalo e total de resultados.

### Utilize para

* Quando os dados não cabem em uma única visualização.
* Para melhorar o tempo de carregamento de tabelas extensas.
* Quando for importante indicar ao usuário em qual página ele está e quantas páginas existem no total.
* Para permitir navegação direta entre páginas e controle sobre a quantidade de itens exibidos por vez.

### Não utilize para

* Para conjuntos de dados pequenos (≤10 itens).
* Quando o foco for busca ou filtragem em tempo real (use scroll infinito ou filtros).

## Casos de uso

### Pagination vs Infinite scroll

A escolha entre **Pagination** e **Infinite scroll** depende do tipo de conteúdo e da experiência desejada para o usuário.

O **Pagination** é ideal quando é importante dar ao usuário controle sobre a navegação, permitindo que ele saiba exatamente onde está (ex: página 2 de 10) e facilitando ações como voltar a uma página específica ou comparar conteúdos entre páginas.

Já o **Infinite scroll** favorece uma navegação contínua e fluida, sendo mais indicado para experiências exploratórias, como feeds ou galerias, onde não há necessidade de localização precisa no conteúdo.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Itens por página** — .Select Number.
2. **Intervalo e total de itens** — Items range · Items display.
3. **Página atual** — .Select Number + total de páginas (Page number).
4. **Anterior e próxima** — Icon Button Ghost.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Show Itens per page` | Boolean | `true` | Mostra a escolha de itens por página. |
| `Show Item display` | Boolean | `true` | Mostra o intervalo e o total de itens. |
| `Show Rows per page` | Boolean | `true` | — |
| `Items range` | String | `"1-10"` | Intervalo exibido. |
| `Items display` | String | `"250"` | Total de itens. |
| `Page number` | String | `"100"` | Total de páginas. |

---

# Guidelines

## Acessibilidade

* É uma região de navegação com nome ("Paginação").
* Os seletores de número são botões com lista: ao abrir, o foco vai para a opção atual; setas, `Home`/`End`, `Enter` e `Esc`.
* Anterior e próxima têm nome e ficam desabilitados na primeira e na última página.
* Ao trocar de página, leve o foco ou anuncie a mudança no conteúdo.
* Contraste dos textos: 16,96:1.

## Diretrizes de uso

* **Exiba o estado atual da navegação:** Sempre que possível, mostre qual intervalo de itens está sendo exibido (ex: “21–30 de 87”) e/ou em qual página o usuário está (ex: “Página 3 de 9”).
* **Evite paginação em listas curtas:** Para listas com poucos itens (ex: ≤10), considere exibir tudo em uma única página para evitar navegação desnecessária.

---

## Pendências — não publicar

* 🔴 Do's and Don'ts com lorem ipsum.
* 🟡 Página com status "Improvement"; sem Princípios, sem tab Style, sem Motion e Aplicações vazias. Anatomia e Propriedades vieram da lib (Pagination 13408:1416).
* 🟡 A description da lib fala de um problema de hover só no Figma ("Estamos com um problema no hover…") — não é texto de documentação.
* 🟡 `Show Rows per page` não tem uso claro (o componente já tem `Show Itens per page`).
* 🟡 Texto: "pode possui a opção"; "Itens" × "Items" nos nomes das props.
