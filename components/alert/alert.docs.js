/* Documentação — Alert (rascunho)
   Sem página no zeroheight, sem seção [Documentation] no arquivo Component use documentation e sem description no set (05/10).
   Texto escrito a partir do set da lib estável (Alert 11864:12559), do componente do playground e do trecho "Toast vs Alert" da página do Toast
   (literal). Revisar com o time (C136). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function al(appearance, label, text, more){ return Object.assign({ _tag: "cds-alert", appearance: appearance, label: label, text: text }, more || {}); }

  CDS.docs["alert"] = {
    tag: "cds-alert",
    base: { label: "Depósito agendado", text: "O saldo cai na conta das pessoas colaboradoras no dia 5." , appearance: "informative" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11864-12559", sourceLabel: "Abrir o Alert no Figma",
    cover: { description: "Mensagem fixa e persistente sobre o sistema, que fica visível até a pessoa usuária ler ou fechar.", wide: true, examples: [
      al("informative", "Depósito agendado", "O saldo cai na conta das pessoas colaboradoras no dia 5.")
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Alert mostra uma mensagem sobre o sistema dentro do fluxo da tela, com um Shaped Icon na cor da Appearance, um Label opcional, o texto (que aceita negrito e link) e o botão de fechar opcional." },
        { p: "O Alert é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Confirmar algo que continua valendo na tela (Positive).", "Avisar de um risco ou pendência que pede atenção (Warning).", "Dar uma informação de contexto que ajuda a decidir (Informative)."] },
        { h3: "Não utilize para:" },
        { ul: ["Feedback breve de uma ação — use o Toast.", "Mensagens críticas ou que bloqueiam o fluxo — use o Modal.", "Avisos que valem para todo o produto, no topo da página — use o System Banner.", "Status curto de um item — use a Tag."] },
        { h2: "Casos de uso" },
        { h3: "Alert vs Toast" },
        { p: "O Toast é temporário e aparece sobre o conteúdo, na parte inferior da tela (em web) ou superior (em mobile). Ele serve para mensagens breves e automáticas, como confirmações de sucesso ou avisos leves. Já o Alert é um componente fixo e persistente. Ele é indicado para mensagens mais relevantes ou contínuas, que precisam permanecer visíveis até que a pessoa usuária as leia ou feche manualmente." },
        { note: "Trecho literal da página do Toast no zeroheight." },
        { compare: [
          { title: "Alert: fixo, no fluxo da tela", attrs: al("informative", "Depósito agendado", "O saldo cai na conta das pessoas colaboradoras no dia 5.") },
          { title: "Toast: temporário, sobre o conteúdo", attrs: { _tag: "cds-toast", text: "Comprovante enviado", viewport: "desktop" } }
        ] },
        { h3: "Alert vs System Banner" },
        { p: "Os dois têm a mesma anatomia e as mesmas props. O Alert fica dentro do conteúdo, com raio. O System Banner ocupa a largura toda da página, sem raio." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { appearance: "positive", label: "Label", text: "A message about the system here! You can turn words bold also add a link." }, markers: [{ n: 1, target: "cds-shaped-icon", side: "left" }, { n: 2, target: ".cds-alert__label", side: "top" }, { n: 3, target: ".cds-alert__msg", side: "bottom" }, { n: 4, target: "cds-close-alert", side: "right" }], legend: ["Shaped Icon (Small, ícone por Appearance)", "Text Label (Show Label)", "Text Content", ".Close Alert (Show Close Button)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Positive", values: ["Positive", "Warning", "Informative"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Label", type: "Boolean", default: "true" },
          { name: "Text Content", type: "Text", default: "A message about the system here! You can turn words bold also add a link." },
          { name: "Show Close Button", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Alert da lib estável. No código: `label`, `text` (ou conteúdo rico como filho: negrito e link), `show-label`, `show-close-button` e `close-label`. Fechar dispara `cds-close` (cancelável). Sem `preventDefault()`, o Alert sai do DOM." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Appearance" },
        { specimens: { items: [
          { label: "Positive", attrs: { appearance: "positive", label: "Pagamento confirmado", text: "O saldo já está disponível para uso." } },
          { label: "Warning", attrs: { appearance: "warning", label: "Pedido pendente", text: "Revise os dados de entrega para continuar." } },
          { label: "Informative", attrs: { appearance: "informative" } }
        ] } },
        { h2: "Sem Label e sem fechar" },
        { specimens: { items: [
          { label: "Show Label = false", attrs: { "show-label": false } },
          { label: "Show Close Button = false", attrs: { "show-close-button": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Warning tem `role=\"alert\"` (anúncio imediato). Positive e Informative têm `role=\"status\"` (anúncio sem interromper).",
          "O Shaped Icon é decorativo: o significado precisa estar no Label e no texto, além da cor.",
          "O botão de fechar é um `<button>` com nome (`close-label`, padrão \"Fechar aviso\"). Ao fechar, devolva o foco para um ponto lógico da tela.",
          "Links dentro do texto precisam fazer sentido fora de contexto (evite \"clique aqui\")."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Texto sobre o fundo do Alert: Positive 8,02:1 · Warning 9,54:1 · Informative 9,60:1 — AA e AAA.", "Ícone sobre o Shaped Icon: 6,84:1 a 8,52:1 · botão de fechar (Icons/intense): 13,53:1 a 15,50:1."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: al("warning", "Pedido pendente", "Revise os dados de entrega para continuar."), title: "Label e texto", text: "Use o Label para dizer o que aconteceu e o texto para dizer o que fazer. Sem Label, o texto precisa se sustentar sozinho." },
          { attrs: al("positive", "Pagamento confirmado", "O saldo já está disponível para uso."), title: "Appearance pelo significado", text: "Escolha Positive, Warning ou Informative pelo tipo de mensagem, não pela cor que combina com a tela." }
        ] },
        { note: "Escrita: consulte as regras de Alertas em Conteúdo › Contextos (Feedback Pages) — tom acolhedor e preventivo, explicar o porquê e informar prazos." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Alert entra e sai junto com o conteúdo da tela. O botão de fechar (.Close Alert) tem os estados de interação abaixo." },
        { specs: [
          { title: "Fechar: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Fechar: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para a entrada e a saída do Alert (CONFERIR C136)." } }
      ] }
    ]
  };
})();
