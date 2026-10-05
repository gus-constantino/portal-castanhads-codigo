---
title: Toast
introduction: O Toast é um componente de notificação temporária que informa a pessoa usuária sobre o resultado de uma ação ou estado do sistema. Ele aparece de forma discreta na interface e desaparece automaticamente após alguns segundos, sem interromper o fluxo de navegação.
---

# Specs

*Nomes alternativos comuns:* Snackbar, Notification, Inline Alert.

## Princípios

* **Imediato** — O feedback deve aparecer logo após a ação da pessoa usuária.
* **Discreto** — Fornece feedback sem interromper a experiência da pessoa usuária.
* **Breve** — O conteúdo deve ser curto, relevante e desaparecer automaticamente.

---

## Quando usar

Use o Toast para comunicar mensagens breves que não exigem uma ação imediata da pessoa usuária. Ele deve ser usado para feedbacks rápidos, como confirmações de sucesso, avisos ou erros leves que não interrompem o fluxo de uso.

### Utilize para

* Confirmar o sucesso de uma ação (ex: item salvo, envio concluído).
* Alertar sobre algo que requer atenção, mas não interrompe a navegação.
* Exibir feedbacks automáticos do sistema, como reconexões ou atualizações.

### Não utilize para

* Exibir mensagens críticas ou bloqueantes (use o Modal).
* Mensagens que precisam permanecer visíveis até serem fechadas.
* Informações complexas ou extensas (use o Alert).

## Casos de uso

### Toast vs Alert

O **Toast** é temporário e aparece sobre o conteúdo, na parte inferior da tela (em web) ou superior (em mobile). Ele serve para mensagens rápidas e automáticas, como confirmações de sucesso ou avisos leves. Já o **Alert** é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente.

### Toast vs Modal

O **Toast** oferece feedback imediato sem interromper o fluxo da pessoa usuária, desaparecendo automaticamente após alguns segundos. É ideal para comunicações breves e não bloqueantes. O **Modal**, por outro lado, exige uma ação direta — como confirmar, preencher ou fechar — antes de permitir que a pessoa usuária continue a navegação. Por isso, é indicado apenas para mensagens que requerem atenção ou decisão imediata.

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Ícone** — 24, cor decorativa por Appearance (Positive: Decorative/03 · Warning: Decorative/01).
2. **Text Description** — até 2 linhas.
3. **.Close Toast** *(opcional)* — `Show Trailing Item`.

Desktop e tablet: ícone, texto e fechar em linha (312 a 743 de largura). Mobile: ícone e fechar no topo, texto embaixo.

---

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `Appearance` | Variant | `Positive` | `Positive` ou `Warning`. |
| `Text Description` | String | `"A descrição web ou mobile deve ter no máximo 2 linhas"` | Mensagem do Toast. |
| `Show Trailing Item` | Boolean | `true` | Mostra o botão de fechar. |

---

# Guidelines

## Acessibilidade

* Positive é anunciado sem interromper (`status`); Warning é anunciado na hora (`alert`).
* O ícone é decorativo: o significado precisa estar no texto.
* O botão de fechar tem nome ("Fechar").
* Dê tempo para ler e mantenha o Toast visível enquanto tiver foco ou o mouse em cima. Nada que exija ação deve ficar só no Toast.
* Contraste: texto 16,96:1; ícones 8,00:1 (Positive) e 10,17:1 (Warning) sobre Surface/inversed.

## Diretrizes de uso

* **Use mensagens curtas e diretas:** O Toast deve ser objetivo e fácil de ler rapidamente. Limite o texto a uma ou duas linhas e prefira frases afirmativas, que indiquem o estado da ação (“Perfil atualizado com sucesso”) em vez de instruções longas.
* **Posicione corretamente o componente:** No Figma, posicione o Toast no canto inferior direito da tela para interfaces web e na extremidade do topo para mobile, refletindo o comportamento real. Essa coerência evita sobreposição com outros elementos interativos.
* **Mostre apenas um feedback por ação:** Cada ação da pessoa usuária deve resultar em apenas um Toast. Isso evita confusão e sobrecarga de mensagens. Se houver necessidade de comunicar diferentes resultados (por exemplo, sucesso parcial ou erro em parte do processo), priorize a mensagem mais relevante para aquele contexto.

## Motion

A animação do Toast fornece feedback visual único após ação do usuário ou evento do sistema. É executada uma vez por invocação com entrada/saída suaves para evitar distrações. A reprodução reforça a percepção temporária do status no aplicativo.

| Transição | Gatilho | Motion Style |
| --- | --- | --- |
| Saída | Ao fechar ou ao fim do tempo | `Selected Out/01` |

### Conteúdo

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |   |   | Use texto em tom informativo e positivo. |
| Don't |   |   | Não use tom negativo ou técnico. |

---

## Pendências — não publicar

* 🟡 A página atual não tem a tab Style; Anatomia e Propriedades vieram do set da lib (Toast 5234:516), que não tem description.
* 🔴 Motion: a Entrada (expressive/decelerate · long/02) não corresponde a nenhum Motion Style; a Saída tem os valores do `Selected Out/01`. No playground, desde 05/10, a entrada usa esses tokens e a saída o Selected Out/01 (opacidade + 8px na vertical, escolha do código: o Figma não diz o que se move) — falta criar o Motion Style da entrada.
* 🔴 Conteúdo: o exemplo "Perfil atualizado com sucesso" usa o pleonasmo "com sucesso", que as regras de escrita proíbem. Sugestão: "Perfil atualizado".
* 🟡 Tempo de exibição (quantos segundos) não está especificado.
* 🟡 Links "Modal" e "Alert" em "Não utilize para" apontam para a mesma página (p/12041c), que não existe; o Alert não tem página.
