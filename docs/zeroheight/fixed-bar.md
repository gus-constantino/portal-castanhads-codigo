---
title: Fixed bar
introduction: A Fixed bar é uma área fixa posicionada na base da interface que agrupa duas ações relacionadas — uma primária e outra secundária. Ela é utilizada para decisões importantes no final de fluxos ou seções, permanecendo sempre acessível para a pessoa usuária.
---

# Specs

A Fixed bar é uma área fixa posicionada na base da interface que agrupa duas ações relacionadas — uma primária e outra secundária. Ela é utilizada para decisões importantes no final de fluxos ou seções, permanecendo sempre acessível para a pessoa usuária.

*Nomes alternativos comuns:* Bottom Action Bar, Sticky Footer Actions, Footer Button Group, Sticky Action Bar.

## Princípios

* **Prioridade clara** — A ação primária deve ser evidente, mantendo hierarquia visual entre os botões.
* **Consistência responsiva** — O componente adapta sua organização conforme o dispositivo.
* **Acesso imediato** — Mantém ações críticas sempre disponíveis, eliminando scroll desnecessário.

---

## Quando usar

Use a Fixed bar quando for necessário manter uma ou duas ações essenciais sempre visíveis, especialmente ao final de fluxos, em decisões importantes ou em etapas que exigem resposta imediata da pessoa usuária.

### Utilize para

* Exibir apenas uma ação primária de conclusão ou avanço.
* Exibir ação primária + ação secundária (ex.: confirmar e cancelar).
* Finalização de fluxos como pagamentos, revisões ou envios.
* Telas onde a tomada de decisão acontece ao fim do conteúdo, mas precisa permanecer visível.
* Fluxos com etapas, em que avançar e voltar precisam estar sempre acessíveis.

### Não utilize para

* Exibir mais de duas ações simultâneas.
* Ações que não têm relação direta entre si.
* Estruturas em que as ações já estão evidentes no próprio conteúdo.
* Apenas ações secundárias em que a ação principal não esteja no final da página.
* Dentro de **Modal**, **Drawer** ou **Bottom Sheet** — eles já têm rodapé de ações próprio.
* Navegação entre seções do produto — papel da barra de navegação.

<callout background="1" fullWidth="true">

**Disponibilidade:** componente estável na lib (sem o [Beta] desde 21/10). Escopo: Mobile e Desktop.

</callout>

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Divider** *(opcional)* — separa a barra do conteúdo.
2. **Ação secundária** *(opcional)* — Main Button Neutral.
3. **Ação primária** *(obrigatório)* — Main Button Accent.

## Composição do componente

Mesma estrutura do .Footer. Em `Horizontal`, os botões ficam lado a lado; em `Stacked`, empilhados com largura total.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Kind` | Variant | `Horizontal` | `Horizontal` (lado a lado) ou `Stacked` (empilhados, largura total). |
| `Show Divider` | Boolean | `true` | Mostra o Divider. |
| `Show Secondary Action` | Boolean | `true` | Mostra a ação secundária. |

---

# Guidelines

## Acessibilidade

* As ações são botões com o Label como nome; a ordem de leitura segue a visual.
* Ancorada, a barra não pode cobrir o conteúdo: reserve espaço no fim da página.
* Um campo em foco nunca fica escondido atrás da barra.

## Diretrizes de uso

* **Use a Fixed bar somente quando o conteúdo da página exige rolagem.** Em telas curtas, ela se torna redundante.
* **Escolha entre “ação primária” ou “primária + secundária” conforme a complexidade da decisão.** Evite ações sem importância real.
* **Use a Fixed bar como finalização orquestrada do fluxo**, como o próximo passo natural.
* **Respeite a largura total da tela em mobile e layout fluido em desktop.**

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use a Fixed bar apenas para ações críticas da tela, como o próximo passo lógico ou a conclusão do fluxo. |
| Don't |   |   | Evite inserir links secundários, atalhos ou informações complementares na Fixed bar. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Fixed Bar 24037:2929).
* 🟡 Os dois últimos itens de "Não utilize para" vêm da description do set na lib.
* 🟡 Motion é placeholder na página atual (Enabled, Hovered, Loading, Pressed sem valores). Os botões seguem o motion do Main Button.
