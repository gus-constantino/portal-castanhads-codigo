/* Documentação — System Banner (rascunho)
   Sem página no zeroheight, sem seção [Documentation] e sem description no set (05/10). Mesma anatomia e props do Alert (set 18432:2090).
   Texto escrito a partir da lib estável e do playground. Revisar com o time (C136). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function sb(appearance, label, text, more){ return Object.assign({ _tag: "cds-system-banner", appearance: appearance, label: label, text: text }, more || {}); }

  CDS.docs["system-banner"] = {
    tag: "cds-system-banner",
    base: { appearance: "warning", label: "Instabilidade no Pix", text: "Pagamentos via Pix podem demorar. Já estamos resolvendo." },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=18432-2090", sourceLabel: "Abrir o System Banner no Figma",
    cover: { description: "Aviso do sistema que ocupa a largura toda da página, com a mesma anatomia do Alert.", wide: true, examples: [
      sb("warning", "Instabilidade no Pix", "Pagamentos via Pix podem demorar. Já estamos resolvendo.")
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O System Banner mostra um aviso do sistema que vale para a página ou para o produto inteiro. Tem a mesma anatomia e as mesmas props do Alert, mas ocupa a largura toda, sem raio, no topo da área de conteúdo." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Instabilidades ou manutenções que afetam várias telas.", "Avisos de conta ou empresa que valem em todo o produto.", "Mudanças importantes que a pessoa precisa ver ao entrar."] },
        { h3: "Não utilize para:" },
        { ul: ["Mensagens sobre uma parte da tela — use o Alert.", "Feedback pontual de uma ação — use o Toast.", "Mais de um aviso ao mesmo tempo: mostre o mais importante."] },
        { h2: "Casos de uso" },
        { h3: "System Banner vs Alert" },
        { p: "Os dois têm a mesma anatomia e as mesmas props. O System Banner ocupa a largura toda da página, sem raio, e o Alert fica dentro do conteúdo, com raio." },
        { compare: [
          { title: "System Banner: largura toda", attrs: sb("warning", "Instabilidade no Pix", "Pagamentos via Pix podem demorar.") },
          { title: "Alert: dentro do conteúdo", attrs: { _tag: "cds-alert", appearance: "warning", label: "Pedido pendente", text: "Revise os dados de entrega." } }
        ] }
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
        { note: "Props e padrões lidos do set System Banner da lib estável (iguais aos do Alert). Largura total, sem raio, mínimo 360. Atributos e evento `cds-close` iguais aos do Alert." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Appearance" },
        { specimens: { items: [
          { label: "Positive", attrs: { appearance: "positive", label: "Sistema normalizado", text: "Os pagamentos via Pix voltaram a funcionar." } },
          { label: "Warning", attrs: { appearance: "warning" } },
          { label: "Informative", attrs: { appearance: "informative", label: "Manutenção programada", text: "No sábado, das 2h às 4h, o Portal fica fora do ar." } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Warning tem `role=\"alert\"`, e Positive e Informative têm `role=\"status\"`, como no Alert.",
          "Coloque o System Banner no começo do conteúdo principal, antes do título da página, para ser encontrado logo.",
          "O botão de fechar é um `<button>` com nome (`close-label`, padrão \"Fechar aviso\")."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Texto sobre o fundo: Positive 8,02:1 · Warning 9,54:1 · Informative 9,60:1 — AA e AAA (mesmos tokens do Alert)."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: sb("warning", "Instabilidade no Pix", "Pagamentos via Pix podem demorar. Já estamos resolvendo."), title: "Um aviso por vez", text: "Mostre um único aviso, o mais importante. Se houver prazo de resolução, informe no texto." }
        ] },
        { note: "Escrita: consulte as regras de Alertas em Conteúdo › Contextos (Feedback Pages) — explicar o porquê, informar prazos e o canal de aviso." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O botão de fechar (.Close Alert) tem os estados de interação abaixo." },
        { specs: [
          { title: "Fechar: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Fechar: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para a entrada e a saída do System Banner (CONFERIR C136)." } }
      ] }
    ]
  };
})();
