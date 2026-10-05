---
title: Tab View
introduction: Alterna a visualização de uma lista entre lista e grade.
---

# Specs

O Tab View alterna a forma de ver o mesmo conjunto de itens — em lista ou em grade. São dois Icon Buttons lado a lado: o ativo em Default Accent, o outro em Ghost Neutral.

---

## Quando usar

### Utilize para

* Trocar entre lista e grade em catálogos, arquivos ou cartões.
* Deixar a pessoa escolher a densidade da visualização.

### Não utilize para

* Trocar de conteúdo ou de contexto — use **Tabs**.
* Filtrar itens — use filtros.
* Mais de duas opções.

## Casos de uso

### Tab View vs Tabs

O Tab View muda só a apresentação do mesmo conteúdo; as Tabs mudam o conteúdo mostrado.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Opção ativa** — Icon Button Medium · Default Accent.
2. **Opção inativa** — Icon Button Medium · Ghost Neutral.

Container com borda Border/semi-soft, raio medium e respiro 8.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Active Option` | Variant | `First` | `First` ou `Second`. |
| `State` | Variant | `Enabled` | `Enabled` ou `Disabled`. |

---

# Guidelines

## Acessibilidade

* É um grupo de opções com nome ("Visualização"); o leitor de tela anuncia qual está selecionada.
* `Tab` entra no grupo; as setas trocam a opção.
* Os ícones não têm texto visível: cada opção tem nome ("Lista", "Grade").

## Diretrizes de uso

* Posicione o Tab View junto ao conteúdo que ele controla, normalmente no topo à direita da lista.
* Mantenha a escolha da pessoa ao voltar para a tela.
* Use ícones que representem a visualização (lista e grade).

## Motion

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Opção: Enabled → Hovered | While hovering | `Hover In/01` |
| Opção: Hovered → Pressed | While pressing | `Pressed/01` |

---

## Pendências — não publicar

* 🔴 Página nova: o Tab View não tem página no zeroheight, nem seção [Documentation], nem description no set da lib (15713:2488). Todo o texto precisa de revisão do time.
