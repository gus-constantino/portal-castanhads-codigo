/* Documentação — .FAB Button (building block do FAB Menu · CDS-1694)
   Fonte: set .FAB Button 27039:594 na branch F1s1Tb3cDHYli4aN76QzCo (description e annotations de Handoff, Accessibility e Motion).
   Peça interna do FAB Menu; não é distribuída sozinha. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function wrap(attrs){ return Object.assign({ _tag: "cds-fab-button", label: "Mais ações" }, attrs); }

  CDS.docs["fab-button"] = {
    tag: "cds-fab-button",
    base: { label: "Mais ações" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/F1s1Tb3cDHYli4aN76QzCo/-CastanhaDS--Components?node-id=27039-594", sourceLabel: "Abrir o .FAB Button no Figma",
    cover: { description: "Botão flutuante do FAB Menu: 56×56, com ícone de 24 e elevação.", examples: [ wrap({}) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Em desenvolvimento · CDS-1694", text: "Building block do FAB Menu, na branch do Figma. Entra no Release 27." } },
        { h2: "Sobre" },
        { p: "O .FAB Button é o botão flutuante do FAB Menu. É um building block: abre e fecha o menu e não é distribuído sozinho." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do FAB Menu. `Is Active` acompanha o menu: fechado com o ícone do `Icon`, aberto com close-line.", "Para um botão de ícone no fluxo da página, use o Icon Button."] },
        { compare: [{ title: "Dentro do FAB Menu", attrs: { _tag: "cds-fab-menu", active: true, actions: "Nova solicitação:file-line, Pagar com Pix:pix-line, Pagar boleto:barcode-line" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: wrap({}), markers: [{ n: 1, target: ".cds-fab", side: "left" }, { n: 2, target: "cds-icon, .cds-icon", side: "right" }], legend: ["Container 56×56 (raio large, elevação por estado)", "Icon 24: Icon fechado, close-line aberto"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Neutral", "Inversed"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False" },
          { name: "Icon", type: "Instance swap", default: "plus-line" }
        ] },
        { note: "Cores e opacidade vêm do Icon Button Default Medium. Elevação: `Elevation/level 2` em Enabled e Pressed, `level 3` em Hovered e nenhuma em Disabled. No código: `icon`, `appearance`, `active`, `disabled` e `label` (nome acessível). `state=\"hovered|pressed\"` existe para mostrar o estado em exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Accent", min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: wrap({}) }, { label: "Hovered", attrs: wrap({ state: "hovered" }) }, { label: "Pressed", attrs: wrap({ state: "pressed" }) }, { label: "Disabled", attrs: wrap({ disabled: true }) }
        ] } },
        { specimens: { title: "Neutral", min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: wrap({ appearance: "neutral" }) }, { label: "Hovered", attrs: wrap({ appearance: "neutral", state: "hovered" }) }, { label: "Pressed", attrs: wrap({ appearance: "neutral", state: "pressed" }) }, { label: "Disabled", attrs: wrap({ appearance: "neutral", disabled: true }) }
        ] } },
        { specimens: { title: "Is Active", min: "var(--common-sizes-120)", items: [
          { label: "False", attrs: wrap({}) }, { label: "True", attrs: wrap({ active: true }) }
        ] } },
        { note: "No Accent e no Inversed, o Pressed mantém a cor do Enabled. O feedback de toque é a escala (Motion)." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<button>` nativo. O nome acessível vem de `label` e o FAB Menu passa o dele (padrão Mais ações).",
          "O estado do menu é anunciado pelo `aria-expanded` que o FAB Menu aplica.",
          "Área de toque de 56×56, acima do mínimo de 24×24 (2.5.8).",
          "Disabled usa o `disabled` nativo: sai da ordem de foco."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Ícone no Accent: 4,54:1 em Enabled e Pressed, sem folga, e 8,23:1 em Hovered. Neutral: 15,27:1 a 6,11:1. Inversed: 16,96:1.", "Estado desabilitado: isento do critério 1.4.3."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: wrap({}), live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione o botão para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { note: "No Pressed, o botão reduz a escala para 90% e volta ao tamanho original, como o Icon Button. Fonte: documentação de motion para devs (Notion, páginas verdes)." }
      ] }
    ]
  };
})();
