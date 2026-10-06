/* Documentação — .Select Number (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Select Number 13408:1596) e do playground.
   Peça interna do Pagination; não é usada sozinha. Revisar com o time (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["select-number"] = {
    tag: "cds-select-number",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13408-1596", sourceLabel: "Abrir o .Select Number no Figma",
    cover: { description: "Seletor de número do Pagination (itens por página e página atual), com lista em Popover.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Select Number escolhe um número numa lista curta: itens por página e página atual, no Pagination. É uma pílula com o número e o ícone de abrir. Aberto (Is Active), mostra um Popover com a lista." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Pagination, que monta e controla os itens.", "Fora dele, use o componente completo (Pagination)."] },
        { compare: [{ title: "Dentro do Pagination", attrs: { _tag: "cds-pagination", total: "87", "per-page": "10", page: "3" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-sn__value", side: "left" }, { n: 2, target: ".cds-icon", side: "right" }], legend: ["Número (Caption/Regular)", "Ícone dropdown-open-line / dropdown-close-line"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["True", "False"] }
        ] },
        { note: "Props e padrões lidos do set .Select Number da lib estável. No código: `value` (\"10\"), `options` (\"10,20,30,40,50\"), `disabled` e `label` (nome acessível). Evento `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: {} },
          { label: "Disabled", attrs: { disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um botão com lista (`aria-haspopup=\"listbox\"`) e nome (`label`).",
          "Ao abrir, o foco vai para a opção atual. Setas e `Home`/`End` navegam, `Enter` escolhe e `Esc` fecha.",
          "Fechar devolve o foco ao botão."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use para listas curtas de números (até 5 ou 6 opções).", "Para listas longas, use o Select Input."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e abra a lista." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "Mapeamento pelo padrão de botões. No código, short/03 + systemic/accelerate (CONFERIR C138)." }
      ] }
    ]
  };
})();
