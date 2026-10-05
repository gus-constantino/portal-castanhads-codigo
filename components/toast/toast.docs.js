/* Documentação — Toast
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Toast, 19d79d) reaproveitado; props e padrões do set da lib estável (Toast 5234:516 — sem description);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style (C136). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function t(text, appearance, more){ return Object.assign({ _tag: "cds-toast", text: text, appearance: appearance || "positive", viewport: "desktop" }, more || {}); }

  CDS.docs["toast"] = {
    tag: "cds-toast",
    base: { text: "Perfil atualizado", viewport: "desktop" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/19d79d-toast", sourceLabel: "Abrir o Toast no zeroheight",
    cover: { description: "O Toast é um componente de notificação temporária que informa a pessoa usuária sobre o resultado de uma ação ou estado do sistema. Ele aparece de forma discreta na interface e desaparece automaticamente após alguns segundos, sem interromper o fluxo de navegação.", examples: [
      t("Perfil atualizado")
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Toast é um componente de notificação temporária que informa a pessoa usuária sobre o resultado de uma ação ou estado do sistema. Ele aparece de forma discreta na interface e desaparece automaticamente após alguns segundos, sem interromper o fluxo de navegação." },
        { h3: "Nomes alternativos comuns" },
        { p: "Snackbar, Notification, Inline Alert." },
        { h3: "Princípios" },
        { cards: [
          ["Imediato", "O feedback deve aparecer logo após a ação da pessoa usuária."],
          ["Discreto", "Fornece feedback sem interromper a experiência da pessoa usuária."],
          ["Breve", "O conteúdo deve ser curto, relevante e desaparecer automaticamente."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Toast para comunicar mensagens breves que não exigem uma ação imediata da pessoa usuária. Ele deve ser usado para feedbacks rápidos, como confirmações de sucesso, avisos ou erros leves que não interrompem o fluxo de uso." },
        { h3: "Utilize para:" },
        { ul: ["Confirmar o sucesso de uma ação (ex: item salvo, envio concluído).", "Alertar sobre algo que requer atenção, mas não interrompe a navegação.", "Exibir feedbacks automáticos do sistema, como reconexões ou atualizações."] },
        { h3: "Não utilize para:" },
        { ul: ["Exibir mensagens críticas ou bloqueantes (use o Modal).", "Mensagens que precisam permanecer visíveis até serem fechadas.", "Informações complexas ou extensas (use o Alert)."] },
        { h2: "Casos de uso" },
        { h3: "Toast vs Alert" },
        { p: "O Toast é temporário e aparece sobre o conteúdo, na parte inferior da tela (em web) ou superior (em mobile). Ele serve para mensagens rápidas e automáticas, como confirmações de sucesso ou avisos leves. Já o Alert é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente." },
        { compare: [
          { title: "Toast: temporário, sobre o conteúdo", attrs: t("Comprovante enviado") },
          { title: "Alert: fixo, no fluxo da tela", attrs: { _tag: "cds-alert", appearance: "informative", label: "Depósito agendado", text: "O saldo cai na conta das pessoas colaboradoras no dia 5." } }
        ] },
        { h3: "Toast vs Modal" },
        { p: "O Toast oferece feedback imediato sem interromper o fluxo da pessoa usuária, desaparecendo automaticamente após alguns segundos. É ideal para comunicações breves e não bloqueantes. O Modal, por outro lado, exige uma ação direta — como confirmar, preencher ou fechar — antes de permitir que a pessoa usuária continue a navegação. Por isso, é indicado apenas para mensagens que requerem atenção ou decisão imediata." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { text: "Perfil atualizado" }, markers: [{ n: 1, target: ".cds-toast__icon", side: "left" }, { n: 2, target: ".cds-toast__text", side: "top" }, { n: 3, target: "cds-close-toast", side: "right" }], legend: ["Ícone (24, cor decorativa por Appearance)", "Text Description (até 2 linhas)", ".Close Toast (Show Trailing Item)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Positive", values: ["Positive", "Warning"] },
          { name: "Text Description", type: "Text", default: "A descrição web ou mobile deve ter no máximo 2 linhas" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Toast da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código: `text`, `appearance`, `show-trailing-item` e `close-label` (nome do botão de fechar). O layout mobile (ícone e fechar no topo, texto embaixo) vem da coleção Viewport; `viewport` força o modo." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Positive", attrs: { text: "Perfil atualizado" } }, { label: "Warning", attrs: { text: "Sem conexão, tentando de novo", appearance: "warning" } }
        ] } },
        { h2: "Show Trailing Item" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "true", attrs: { text: "Perfil atualizado" } }, { label: "false", attrs: { text: "Perfil atualizado", "show-trailing-item": false } }
        ] } },
        { h2: "Viewport" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Desktop e tablet", attrs: { text: "Perfil atualizado" } }, { label: "Mobile", attrs: { text: "Perfil atualizado", viewport: "mobile" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O Positive tem `role=\"status\"`: o leitor de tela anuncia o texto sem interromper o que estava lendo.",
          "O Warning tem `role=\"alert\"`: o anúncio é imediato.",
          "O ícone é decorativo; o significado precisa estar no texto.",
          "O botão de fechar (.Close Toast) é um `<button>` com nome (`close-label`, padrão \"Fechar\")."
        ] },
        { h2: "Tempo" },
        { ul: [
          "Dê tempo para ler: o Toast some sozinho, então o texto precisa ser curto (até 2 linhas).",
          "Mantenha o Toast visível enquanto tiver foco ou o mouse em cima.",
          "Nada que exija ação deve ficar só no Toast — use o Alert ou o Modal (2.2.1)."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Texto (Text/inversed) sobre Surface/inversed: 16,96:1 — AA e AAA.", "Ícone Positive (Decorative/03) 8,00:1 · Warning (Decorative/01) 10,17:1 · fechar (Neutral/Solid/soft) 16,96:1 — todos acima de 3:1."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Toast. O tempo de exibição não está especificado (CONFERIR C136)." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: t("Perfil atualizado"), title: "Use mensagens curtas e diretas", text: "O Toast deve ser objetivo e fácil de ler rapidamente. Limite o texto a uma ou duas linhas e prefira frases afirmativas, que indiquem o estado da ação (“Perfil atualizado com sucesso”) em vez de instruções longas." },
          { attrs: t("Comprovante enviado"), title: "Posicione corretamente o componente", text: "No Figma, posicione o Toast no canto inferior direito da tela para interfaces web e na extremidade do topo para mobile, refletindo o comportamento real. Essa coerência evita sobreposição com outros elementos interativos." },
          { attrs: t("Pedido enviado"), title: "Mostre apenas um feedback por ação", text: "Cada ação da pessoa usuária deve resultar em apenas um Toast. Isso evita confusão e sobrecarga de mensagens. Se houver necessidade de comunicar diferentes resultados (por exemplo, sucesso parcial ou erro em parte do processo), priorize a mensagem mais relevante para aquele contexto." }
        ] },
        { note: "Regra de conteúdo (Formatação): Toast não leva ponto final, exceto quando houver mais de uma frase. E evite o pleonasmo \"com sucesso\" — o exemplo do zeroheight acima ainda usa (CONFERIR C136)." },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: t("Cartão desbloqueado"), text: "Use texto em tom informativo e positivo." },
          { kind: "dont", attrs: t("Erro 500: falha ao processar a requisição", "warning"), text: "Não use tom negativo ou técnico." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação do Toast fornece feedback visual único após ação do usuário ou evento do sistema. É executada uma vez por invocação com entrada/saída suaves para evitar distrações. A reprodução reforça a percepção temporária do status no aplicativo." },
        { specs: [
          { title: "Saída", rows: [["Gatilho", "Ao fechar ou ao fim do tempo"], ["Motion Style", "`Selected Out/01`"]] }
        ] },
        { note: "No zeroheight, a Saída usa expressive/decelerate · short/04 — os valores do `Selected Out/01`." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A Entrada (expressive/decelerate · long/02) não corresponde a nenhum Motion Style da `.Motion Styles`. A entrada e a saída ainda não estão animadas no componente do playground (CONFERIR C136)." } },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (sem deslocamento; só aparecer e sumir)." }
      ] }
    ]
  };
})();
