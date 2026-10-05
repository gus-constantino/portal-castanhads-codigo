/* Documentação — Filter Chips (rascunho)
   Sem página no zeroheight, sem [Documentation] no arquivo Component use documentation e sem description no set (05/10).
   Texto escrito a partir do set da lib estável (Filter Chips 12365:2744) e do playground. Revisar com o time (C149).
   A pasta é filter-chip; o id do playground (e da doc) é filter-chips. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function fc(label, more){ return Object.assign({ _tag: "cds-filter-chip", label: label }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: items }; }

  CDS.docs["filter-chips"] = {
    tag: "cds-filter-chip",
    base: { label: "Alimentação" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12365-2744", sourceLabel: "Abrir o Filter Chips no Figma",
    cover: { description: "Chip que liga e desliga um filtro: selecionado, troca o ícone pelo check e inverte as cores.", examples: [ row([fc("Alimentação", { selected: true }), fc("Refeição"), fc("Mobilidade")]) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Os Chips ainda não têm página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Filter Chip é um botão de liga/desliga para filtros rápidos. Cada clique alterna Is Selected: selecionado, o Lead Icon vira o check-line e o chip fica com o fundo invertido. Vários chips podem ficar selecionados ao mesmo tempo." },
        { p: "Os Filter Chips aparecem em grupo, dentro do Chips Group, logo acima do conteúdo que filtram." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Filtros rápidos e visíveis sobre uma lista, tabela ou extrato (ex.: categorias de benefício).", "Poucas opções curtas, que cabem numa ou duas linhas."] },
        { h3: "Não utilize para:" },
        { ul: ["Filtros complexos, com vários campos — use o Filter Button com Drawer ou Bottom Sheet.", "Ações (salvar, enviar) — use um Main Button.", "Mostrar valores já escolhidos que a pessoa pode remover — use o Input Chip.", "Escolhas de formulário — use Checkbox ou Radio Button."] },
        { h2: "Casos de uso" },
        { h3: "Filter Chip vs Input Chip" },
        { p: "O Filter Chip liga e desliga um filtro e continua na tela. O Input Chip mostra um valor já escolhido; clicar nele remove o chip." },
        { compare: [
          { title: "Filter Chip", attrs: row([fc("Alimentação", { selected: true }), fc("Refeição")]) },
          { title: "Input Chip", attrs: row([{ _tag: "cds-input-chip", label: "Alimentação", "show-lead-icon": false }, { _tag: "cds-input-chip", label: "Refeição", "show-lead-icon": false }]) }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-chip", side: "left" }, { n: 2, target: ".cds-chip cds-icon", side: "top" }, { n: 3, target: ".cds-chip span", side: "right" }], legend: ["Container (pill)", "Lead Icon (vira check-line quando selecionado)", "Label"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Selected", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Icon", type: "Instance swap", default: "placeholder-line" }
        ] },
        { note: "Props e padrões lidos do set Filter Chips da lib estável. No código: `label`, `icon`, `show-lead-icon`, `selected` e `disabled`; `state=\"hovered|pressed\"` só para exemplos. Evento `cds-change` com `{ selected }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Is Selected = False" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Is Selected = True" },
        { specimens: { items: [
          { label: "Enabled", attrs: { selected: true } }, { label: "Hovered", attrs: { selected: true, state: "hovered" } }, { label: "Pressed", attrs: { selected: true, state: "pressed" } }, { label: "Disabled", attrs: { selected: true, disabled: true } }
        ] } },
        { h2: "Show Lead Icon" },
        { specimens: { items: [
          { label: "Com ícone", attrs: { icon: "food-line" } }, { label: "Sem ícone", attrs: { "show-lead-icon": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Cada chip é um `<button>` com `aria-pressed`: o leitor de tela anuncia o nome e se está selecionado.",
          "`Tab` leva ao chip; `Enter` ou `Espaço` alternam a seleção.",
          "A seleção não depende só da cor: o ícone vira o check-line.",
          "Os ícones são decorativos; o nome vem do Label.",
          "Em grupo, use o Chips Group com `label` para nomear o conjunto (ex.: \"Filtrar por categoria\")."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e ícone (Text/medium e Icons/medium sobre Surface/01): 7,42:1 — AA e AAA.", "Selecionado (Text/inversed sobre Surface/inversed): 16,96:1 — AA e AAA.", "Sem seleção, o chip não tem borda: o fundo (Surface/01) fica a 1,11:1 da Surface/default e a borda do Hovered (Border/medium) a 2,78:1 — abaixo de 3:1; o Label é o que identifica o chip."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Labels curtos, de uma ou duas palavras, com a primeira letra maiúscula.", "Aplique o filtro na hora, sem botão de confirmar.", "Mantenha a ordem dos chips fixa; não reordene ao selecionar.", "Mostre um jeito de limpar todos os filtros quando houver vários selecionados."] },
        { dodont: [
          { kind: "do", attrs: row([fc("Alimentação", { selected: true }), fc("Refeição"), fc("Mobilidade")]), text: "Use labels curtos e do mesmo tipo de informação." },
          { kind: "dont", attrs: row([fc("Mostrar só as despesas de alimentação"), fc("Salvar")]), text: "Não use frases longas nem ações dentro do grupo de filtros." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e clique para alternar a seleção." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "Pressed → Is Selected", rows: [["Gatilho", "On click"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "No Figma, as três transições usam systemic/accelerate · short/03, que não é exatamente nenhum Motion Style: Hover In/01 é systemic/default · short/03 e Pressed/01 é systemic/accelerate · short/04 (CONFERIR C149)." },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] }
    ]
  };
})();
