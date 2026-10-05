# Plano — documentação de todos os componentes no playground

**Objetivo:** todo componente do playground com documentação completa e atual, no padrão do time (protocolo Juntos, §11.2 da skill `castanhads-juntos`), e as legadas atualizadas.

## 1. Estado hoje (02/10)

| | Total | Com página no zeroheight | Sem página |
|---|---:|---:|---:|
| Componentes | 76 | 47 | 29 |
| Building blocks | 26 | 0 | 26 |
| Documentação no playground | 2 (Code Input OTP, Credit Card Input) | — | — |

- **Sem página no zeroheight (29):** Alert, Async Select Input, Async creatable Select Input, Banner, Bottom Sheet, Caju Card, Checkbox Select Input, Chips Group, Confirmation Message, Date Input, Date Picker, Filter Chips, Fixed Tab, Input Chips, Modal Date Picker, Multi Select Input, Progress Tracker Item, Radio Select Input, Scrollable Tab, Search Input, Slider, Status Dot, System Banner, Tab View, Text Area Input*, Tooltip, Topic, Upload List, Viewport Restriction. (*o zeroheight tem "Text area", é o mesmo componente)
- **As 2 docs do playground** usam o formato experimental de 6 tabs (Uso · Anatomia · Estilos · Acessibilidade · Diretrizes · Motion), de 01/10. O padrão do time é **3 tabs: Specs · Style · Guidelines**.
- **As páginas do zeroheight** (ex.: Accordion Item) seguem as 3 tabs, mas ainda com traços legados: propriedades em blockquote **sem coluna Padrão**, **sem Acessibilidade**, tokens com o typo `Commom`.

## 2. Formato

**Decisão (Gustavo, 02/10): manter as 6 tabs atuais do playground** — Playground · Uso · Anatomia · Estilos · Acessibilidade · Diretrizes · Motion — em vez das 3 do zeroheight. O conteúdo de cada tab segue o template Juntos (§11.2 G), redistribuído assim:

- **Uso** ← Specs (abertura, Princípios, Quando usar, comparação, disponibilidade, Suporte)
- **Anatomia** ← Anatomia + Composição
- **Estilos** ← Propriedades (tabela com Padrão), Comportamento, estados, tokens
- **Acessibilidade** ← Acessibilidade
- **Diretrizes** ← Diretrizes de uso (Do/Don't), tamanho
- **Motion** ← tabela de Motion Styles por interação

Referência do template original (3 tabs do zeroheight):

- **Specs:** abertura, nomes alternativos, Princípios, Quando usar (Utilize para / Não utilize para), comparação com o vizinho, callout de disponibilidade (`[web only]`), Suporte.
- **Style:** Anatomia (com o componente real e marcadores), Composição, **Propriedades em tabela com Tipo · Padrão · Descrição** (validada no Figma), Comportamento, estados.
- **Guidelines:** Tamanho e especificações visuais (tokens), **Acessibilidade** (papel, foco, teclado, contraste WCAG), Diretrizes de uso (Do/Don't com o componente real), **Motion** (tabela de Motion Styles por interação).
- **Escrita:** Princípios de escrita do Castanha (frases até 15 palavras, sem infinitivo em título, property e token em `código`).

## 3. Fontes e precedência

1. **Figma (lib estável `LKZBwmlb7fIbDKdGrMncuA`)**, lido ao vivo: props, `defaultValue`, variantes, description, annotations, motion (reactions). É o que vale para fatos.
2. **zeroheight publicado:** texto do time (Princípios, Quando usar, diretrizes) quando existir. Reaproveitar, não reescrever.
3. **Playground e registros** (CONFERIR, decisões D*): comportamento web, acessibilidade implementada, exceções.
- Divergência entre zeroheight e Figma = item no CONFERIR (`diff zeroheight`), nunca correção silenciosa.

## 4. Fases

| Fase | Escopo | Saída |
|---|---|---|
| D0 · Base | `docs-kit` nas 6 tabs com o conteúdo do template Juntos: bloco de propriedades com Padrão, Acessibilidade e Motion completos; atualizar Code Input OTP e Credit Card Input | 2 docs atualizadas |
| D1 · Com página no zeroheight (47) | Importar o texto do zeroheight, validar props/defaults no Figma, completar o que falta (Acessibilidade, Padrão, Motion), registrar divergências | 47 docs + `diff zeroheight` no CONFERIR |
| D2 · Sem página (29) | Escrever a partir do Figma (description, annotations, props) e do comportamento do playground, no template Juntos | 29 docs (rascunho para o zeroheight) |
| D3 · Building blocks (26) | Doc curta: o que é, onde é usado, propriedades, acessibilidade | 26 docs |
| D4 · Fechamento | Auditoria de cobertura (todo componente com doc, toda tabela com Padrão), relatório | Painel de cobertura no relatório |

Cada fase em lotes por página do Figma, publicados e conferidos um a um.

## 5. Decisões de 05/10 (Gustavo)

1. **Texto dos componentes com página no zeroheight:** reusar o texto do time e completar o que falta (Acessibilidade, coluna Padrão, Motion), validando props e padrões no Figma. Divergência vai para o CONFERIR (`diff zeroheight`).
2. **`.md` no dialeto do zeroheight:** sim, junto com cada doc, a partir da mesma fonte — em `docs/zeroheight/<id>.md`, no template Juntos §11.2 G (3 tabs Specs · Style · Guidelines), com pendências 🟡 numa seção final "não publicar".
3. **Ritmo:** lotes por página do Figma, com conferência no navegador e commit na `teste` a cada lote.
4. **Cards:** seguir sem eles; entram depois, quando os arquivos chegarem em `Desktop/cards/`.

Estado em 05/10: 9 docs completas (Accordion, Accordion Item, Balance Card, Code Input OTP, Credit Card Input, Password Input, Quantity Input, Text Area, Text Input) e 7 docs só com a tab Conteúdo (Fixed/Scrollable Tab, Main Button, Breadcrumb, Bottom Sheet, Link, Progress Tracker — D98), que ganham as outras tabs no lote delas.
