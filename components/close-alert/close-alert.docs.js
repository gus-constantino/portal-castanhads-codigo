/* Documentação — .Close Alert (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Close Alert 11830:5584) e do playground.
   Peça interna do Alert; não é usada sozinha. Revisar com o time (C136). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function wrap(attrs){ return Object.assign({ _tag: "cds-close-alert" }, attrs); }

  CDS.docs["close-alert"] = {
    tag: "cds-close-alert",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11830-5584", sourceLabel: "Abrir o .Close Alert no Figma",
    cover: { description: "Botão de fechar do Alert: 40×40, com o ícone close-line.", examples: [ { _tag: "cds-close-alert" } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Close Alert é o botão de fechar usado dentro do Alert. É um building block: aparece quando o Alert está com Show Close Button ligado e não deve ser usado sozinho." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Alert, controlada pela prop Show Close Button.", "Para fechar outros componentes, use o Icon Button com o ícone close-line."] },
        { compare: [{ title: "Dentro do Alert", attrs: { _tag: "cds-alert", appearance: "informative", label: "Depósito agendado", text: "O saldo cai no dia 5." } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: wrap({}), markers: [{ n: 1, target: ".cds-close", side: "left" }, { n: 2, target: "cds-icon, .cds-icon", side: "right" }], legend: ["Container 40×40 (raio small)", "Icon close-line (20)"] } },
        { h2: "Propriedades" },
        { props: [{ name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] }] },
        { note: "Props e padrões lidos do set .Close Alert da lib estável. No código, o State vem da interação e do atributo `disabled`. `state=\"hovered|pressed\"` existe exclusivamente para mostrar o estado em exemplos. `label` é o nome acessível." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: wrap({}) }, { label: "Hovered", attrs: wrap({ state: "hovered" }) }, { label: "Pressed", attrs: wrap({ state: "pressed" }) }, { label: "Disabled", attrs: wrap({ disabled: true }) }
        ] } },
        { note: "Hovered e Pressed ganham fundo Neutral/Opacity/Intense e o ícone fica Icons/inversed. Disabled usa Opacity/light." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<button>` nativo: recebe foco com `Tab` e fecha com `Enter` ou `Espaço`.",
          "O nome acessível vem de `label` (padrão \"Fechar\"). O Alert passa `close-label`.",
          "Área de toque de 40×40.",
          "Disabled usa o `disabled` nativo: sai da ordem de foco."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Ícone Enabled (Icons/intense) sobre o fundo do Alert: Positive 14,76:1 · Warning 15,50:1 · Informative 13,53:1."] },
        { note: "Contraste medido no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Mantenha o botão de fechar sempre no fim do Alert, alinhado ao centro.", "Dê um nome que diga o que fecha quando houver mais de um na tela (ex.: \"Fechar aviso de depósito\")."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: wrap({}), live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione o botão para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { note: "Mapeamento pelo padrão da família de botões. No código, todas as transições usam short/03 + systemic/accelerate, a reaction do Figma (CONFERIR C136)." },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
