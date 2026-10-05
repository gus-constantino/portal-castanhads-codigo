---
title: Scale
introduction: Utilizamos tamanhos e espaçamentos padronizados, baseados no grid de 4px, para manter a consistência visual e o alinhamento dos componentes no layout.
---

*Nomes alternativos comuns:* Dimensions, Spacing, Sizing units.

*Dúvidas e comentários:* fale com nosso time no canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3) do Slack.

---

## Anatomia

Nosso sistema de escala parte de uma unidade base de 4px: quase todos os valores, de 4px a 200px, são múltiplos dessa unidade, o que garante flexibilidade e consistência em diferentes layouts. As exceções são quatro valores de ajuste fino — 1px, 2px, 6px e 14px —, usados em bordas e espaçamentos internos.

[Imagem: escala completa — os 26 valores de `Common/Sizes`]

| Token | Valor | | Token | Valor |
| :--- | :--- | :--- | :--- | :--- |
| `Common/Sizes/0` | 0px | | `Common/Sizes/40` | 40px |
| `Common/Sizes/1` | 1px | | `Common/Sizes/44` | 44px |
| `Common/Sizes/2` | 2px | | `Common/Sizes/48` | 48px |
| `Common/Sizes/4` | 4px | | `Common/Sizes/56` | 56px |
| `Common/Sizes/6` | 6px | | `Common/Sizes/64` | 64px |
| `Common/Sizes/8` | 8px | | `Common/Sizes/72` | 72px |
| `Common/Sizes/12` | 12px | | `Common/Sizes/80` | 80px |
| `Common/Sizes/14` | 14px | | `Common/Sizes/88` | 88px |
| `Common/Sizes/16` | 16px | | `Common/Sizes/92` | 92px |
| `Common/Sizes/20` | 20px | | `Common/Sizes/104` | 104px |
| `Common/Sizes/24` | 24px | | `Common/Sizes/120` | 120px |
| `Common/Sizes/28` | 28px | | `Common/Sizes/160` | 160px |
| `Common/Sizes/32` | 32px | | `Common/Sizes/200` | 200px |

Use sempre o token (`Common/Sizes/*`), nunca o valor solto: assim, uma mudança na escala chega a todos os produtos de uma vez.

---

## Tamanhos padrão

Embora toda a nossa escala esteja disponível, na construção das interfaces orientamos os times a usar por padrão um conjunto de seis tamanhos, que atende cerca de 90% dos layouts: **16px, 20px, 24px, 40px, 48px e 64px**.

[Imagem: os seis tamanhos padrão — manter a atual "escala padrao 2", sem o bloco de especificações do frame]

---

## Acessibilidade

Acessibilidade é tornar a interface utilizável por qualquer pessoa, com qualquer nível de familiaridade com aplicativos. Por isso, no mobile tratamos a área de toque e as dimensões dos elementos para facilitar a navegação e a interação das pessoas usuárias.

### Área de toque

É a região da tela em que a pessoa usuária interage com elementos da interface, como botões, links e ícones, usando os dedos: o espaço mínimo para tocar um elemento com precisão, sem acionar por engano o que está ao lado. Nossa referência é **48px** (`Common/Sizes/48`).

[Imagem: Main Button Medium com 48px de altura]

> Main Button e Icon Button no tamanho Small têm 40px. Nas ações de toque no mobile, prefira o tamanho Medium (48px).

### Ícones em tela

Considerando a área de toque, quando colocamos um ícone em qualquer tela, mobile ou web, e esse ícone tem uma ação, ele precisa estar sempre dentro de um componente de botão. O Icon Button no tamanho Medium tem 48px em qualquer variante.

[Imagem: Icon Button Medium nas variantes Default · Accent, Ghost · Accent e Ghost · Neutral, com 48px cada — manter a atual "icones em tela"]

Pensamos nos mais diversos contextos, como a pessoa usuária em movimento ou usando só uma das mãos. Por isso, é importante evitar ícones "soltos" nas telas.

---

## Diretrizes

### ✅ Ícones devem estar em elementos interativos

Quando o ícone tem uma ação, use o Icon Button: ele garante a área de toque mínima e mantém a consistência da interface.

[Imagem: Icon Button Default · Accent — manter a atual "Ícones devem estar em elementos interativos"]

### ❌ Não use ícone solto como ação

Um ícone sozinho não garante uma área de toque minimamente acessível e pode gerar inconsistências e quebras na interface.

[Imagem nova: o mesmo ícone sem o botão em volta]

---

## Ajuda & Suporte

[Manter os dois atalhos atuais da página]

* **Canal de suporte** — Dúvidas? Fale conosco pelo canal de suporte no Slack.
* **Agenda de ajuda** — Participe da nossa agenda de suporte do Castanha! Toda terça-feira, das 16:00 às 17:30.

---

## Pendências — não publicar

Remover esta seção antes de colar no zeroheight. Origem: página Scale (Fundação → Layout · id 7390834), revisada em 05/10/2026. Itens no `docs/CONFERIR.md`: C153 (escala), C154 (texto e links) e C152 (Small × área de toque).

**Texto alterado**
1. Anatomia: "cada valor é múltiplo da unidade base, variando de 2px a 200px" → 2px não é múltiplo de 4, e a escala também tem 0, 1, 6 e 14px. O texto agora diz que quase todos são múltiplos de 4 e nomeia as quatro exceções.
2. Acessibilidade: "com nossos, produtos" → vírgula removida; texto reescrito para ficar mais direto.
3. Ícones em tela: "ao utilizamos" → corrigido; aspas misturadas em "soltos”" → uniformizadas.
4. Área de toque: acrescentada a referência explícita de 48px e o aviso sobre o tamanho Small (ver item 7).
5. Diretrizes: o exemplo único ganhou o par Do/Don't, com o texto da nota do Figma.

**Imagens**
6. "anatomia - scale": mostra só 14 dos 26 valores (faltam 0, 1, 6, 14, 28, 44, 56, 80, 92, 104, 120 e 160px). Trocar por uma imagem com a escala completa, ou usar só a tabela acima.
7. "área de toque-1": mostra o Main Button menor dentro de uma área de 48px, mas no DS o Small tem 40px e não amplia a área de toque (nem no Figma, nem no código). Trocar por um exemplo só com o Medium, até o time decidir o C152.
8. "escala padrao 2": manter a imagem, mas esconder o bloco de especificações do frame (Linked tokens com "Commom.Colors.Surface.default", Style e Attributes), que não ajuda quem lê.
9. Diretrizes: falta a imagem do Don't (ícone solto).

**Links e status**
10. "consulte nossa FAQ" apontava para `zeroheight.com/858426090/p/76d532-faq/...` (domínio antigo), e não existe mais página de FAQ no Hub. Removido. Se a FAQ voltar, recolocar o link com o domínio `castanha.caju.com.br`.
11. A página está marcada "In progress": revisar o status depois de publicar.
12. "Ajuda & Suporte": os dois atalhos (canal de suporte e agenda de ajuda) seguem iguais; só a faixa de horário passou de "de 16:00 às 17:30" para "das 16:00 às 17:30", como pede o guia de Formatação de Dados → Datas e Horários.
