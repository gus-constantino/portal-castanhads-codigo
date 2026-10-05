---
title: Filter button
introduction: O Filter Button é um botão que serve como gatilho para filtros e, quando acionado, abre opções para refinar ou ajustar a visualização de conteúdos, listas ou tabelas.
---

# Specs

O Filter Button é um botão que serve como gatilho para filtros e, quando acionado, abre opções para refinar ou ajustar a visualização de conteúdos, listas ou tabelas.

*Nomes alternativos comuns:* Filter Toggle, Filtering Button, Filtro.

## Princípios

* **Clareza** — Deve indicar de forma explícita que é o gatilho para filtros e mostrar quando há filtros ativos.
* **Eficiência** — O drawer precisa organizar filtros de modo simples, ágil e fácil de aplicar.
* **Consistência** — A posição e o comportamento do botão devem ser uniformes em toda a interface.

---

## Quando usar

Use o Filter Button quando for necessário oferecer ao usuário acesso a filtros que afetam a exibição de dados, listas, tabelas ou conteúdos visuais. Ele deve ser usado como entrada para configurações rápidas de visualização.

### Utilize para

* Aplicar filtros em listas, tabelas ou grids.
* Permitir ao usuário customizar resultados de busca.
* Oferecer filtros rápidos em dashboards.

### Não utilize para

* Executar ações primárias — use o **Main Button**.
* Substituir menus de navegação ou dropdowns genéricos.
* Exibir preferências ou configurações persistentes complexas.

## Filter button vs. Drop button

|   | Filter Button | Drop Button |
| --- | --- | --- |
| **Uso** | Opções de filtragem que alteram dados ou visualizações | Listas de ações ou navegação |

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Container** *(obrigatório)* — área clicável e estado.
2. **Ícone de filtro** *(obrigatório)* — com filtros aplicados, dá lugar ao Badge com a contagem.
3. **Label** *(obrigatório no Desktop)* — padrão "Filtros"; em Tablet e Mobile, fica só o ícone.

## Composição do componente

Usa o **Icons** e, com `Is Active`, o **Badge** Neutral com a contagem de filtros aplicados.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `State` | Variant | `Enabled` | `Enabled`, `Hovered`, `Pressed` ou `Disabled`. |
| `Is Active` | Variant | `False` | `True` quando há filtros aplicados; mostra o Badge com a contagem. |

---

# Guidelines

## Acessibilidade

* É um `<button>` nativo com o Label como nome.
* Com filtros aplicados, o nome inclui a contagem (ex.: "Filtros, 3 filtros aplicados").
* No Mobile o Label fica oculto, mas o nome acessível continua o mesmo.
* Ao fechar o Drawer ou o Bottom Sheet de filtros, o foco volta para o Filter Button.

## Motion

| Interação | Gatilho | Motion Style |
| --- | --- | --- |
| Enabled → Hovered | While hovering | `Hover In/01` |
| Hovered → Pressed | While pressing | `Pressed/01` |
| → Disabled | Ao desabilitar | `Disabled/01` |

## Diretrizes de uso

* **Web:** em experiências web, é padrão que o Filter button sempre abra um Drawer, garantindo espaço suficiente para organizar múltiplos filtros sem interromper o fluxo principal da página.
* **Mobile:** em experiências mobile, o padrão é que o Filter Button abra uma Bottom sheet, ocupando parte da tela para apresentar os filtros de forma clara e acessível.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Para filtros simples, como uma lista curta de opções em checkboxes, utilize um Select Input diretamente no layout. Isso torna a interação mais rápida e evita abrir um container desnecessário. |
| Don't |   |   | Não utilize o Filter Button com abertura de drawer para casos simples em que apenas poucas opções precisam ser escolhidas. O uso de drawer deve ser reservado para filtros mais complexos, que exigem múltiplos campos ou combinações de critérios. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style: Anatomia, Composição e Propriedades foram escritas a partir do set da lib (Filter button 5099:5389) e do componente do playground. Revisar com o time.
* 🟡 Os links "[Em breve]" para Drawer e Bottom sheet podem apontar para as páginas existentes.
