/* Documentação — Input Chips (rascunho)
   Sem página no zeroheight, sem [Documentation] no arquivo Component use documentation e sem description no set (05/10).
   Texto escrito a partir do set da lib estável (Input Chips 12365:2728) e do playground. Revisar com o time (C149).
   A pasta é input-chip; o id do playground (e da doc) é input-chips. Só o exemplo da tab Motion é interativo (os outros são inert): ali o clique remove o chip de verdade. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function ic(label, more){ return Object.assign({ _tag: "cds-input-chip", label: label }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: items }; }

  CDS.docs["input-chips"] = {
    tag: "cds-input-chip",
    base: { label: "Alimentação" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2728", sourceLabel: "Abrir o Input Chips no Figma",
    cover: { description: "Chip que mostra um valor escolhido e pode ser removido com um clique.", examples: [ row([ic("Alimentação", { icon: "food-line" }), ic("Mobilidade", { icon: "car-line" }), ic("Saúde", { "show-lead-icon": false })]) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Os Chips ainda não têm página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Input Chip representa um valor que a pessoa escolheu ou digitou (uma categoria, um e-mail, um filtro aplicado) e que pode ser removido. O chip inteiro é o botão de remover; o close-line à direita indica a ação." },
        { p: "Os Input Chips aparecem em grupo, dentro do Chips Group, perto do campo ou do filtro que os gerou." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Mostrar os filtros aplicados, com a opção de remover cada um.", "Mostrar valores escolhidos num campo de múltipla escolha (ex.: destinatários)."] },
        { h3: "Não utilize para:" },
        { ul: ["Ligar e desligar filtros que continuam na tela — use o Filter Chip.", "Status ou categorias só informativas, sem remover — use Tag ou Badge.", "Ações — use um Main Button."] },
        { h2: "Casos de uso" },
        { h3: "Input Chip vs Tag" },
        { p: "A Tag só informa (status, categoria) e não tem interação. O Input Chip é interativo: existe para ser removido." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-chip", side: "left" }, { n: 2, target: ".cds-chip cds-icon:first-child", side: "top" }, { n: 3, target: ".cds-chip span", side: "bottom" }, { n: 4, target: ".cds-chip cds-icon:last-child", side: "right" }], legend: ["Container (pill, com borda)", "Lead Icon", "Label", "Close Icon (close-line)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Icon", type: "Instance swap", default: "placeholder-line" }
        ] },
        { note: "Props e padrões lidos do set Input Chips da lib estável. No código: `label`, `icon`, `show-lead-icon` e `disabled`; `state=\"hovered|pressed\"` só para exemplos. Evento `cds-remove` (cancelável): sem `preventDefault()`, o chip sai do DOM." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Show Lead Icon" },
        { specimens: { items: [
          { label: "Com ícone", attrs: { icon: "food-line" } }, { label: "Sem ícone", attrs: { "show-lead-icon": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O chip inteiro é um `<button>` com o nome \"Remover\" + Label (ex.: \"Remover Alimentação\").",
          "O alvo de clique é o chip de 40px, não o ícone de 16px (WCAG 2.5.8).",
          "`Tab` leva ao chip; `Enter` ou `Espaço` removem.",
          "Os ícones são decorativos.",
          "Sozinho, o chip não move o foco (como o `Chips.Input` do castanha-react): o `cds-remove` informa `keyboard` para quem usa decidir.",
          "No Multi Select Input vale a regra do SelectInput do castanha-react: removido pelo teclado, o foco vai para o próximo chip ou, sem chip ali, para o campo; pelo mouse, para o campo. `Backspace` e `Delete` no chip também removem."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e ícones (Text/medium e Icons/medium sobre Surface/01): 7,42:1 — AA e AAA.", "Borda (Border/semi-soft) sobre Surface/default: 1,25:1; no Hovered (Border/medium): 2,78:1 — abaixo de 3:1; o Label e o close-line identificam o chip."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o mesmo texto do valor escolhido, curto.", "Quando houver muitos chips, ofereça \"Limpar tudo\".", "Não peça confirmação para remover um chip; a ação é fácil de desfazer escolhendo de novo."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione. Clicar remove o chip; recarregue a tab para ver de novo." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "No Figma, as transições usam systemic/accelerate · short/03, que não é exatamente nenhum Motion Style: Hover In/01 é systemic/default · short/03 e Pressed/01 é systemic/accelerate · short/04 (CONFERIR C149)." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação para a saída do chip ao ser removido (CONFERIR C149)." } },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
