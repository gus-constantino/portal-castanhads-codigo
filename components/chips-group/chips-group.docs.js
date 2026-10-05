/* Documentação — Chips Group (rascunho)
   Sem página no zeroheight, sem [Documentation] no arquivo Component use documentation e sem description no set (05/10).
   Texto escrito a partir do set da lib estável (Chips Group 12457:3664) e do playground. Revisar com o time (C149). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var LABELS = ["Alimentação", "Refeição", "Mobilidade", "Saúde", "Educação", "Cultura", "Home office"];
  function chips(tag, sel){ return LABELS.map(function(l, i){ var c = { _tag: tag, label: l, "show-lead-icon": false }; if (sel && sel.indexOf(i) > -1) c.selected = true; return c; }); }

  CDS.docs["chips-group"] = {
    tag: "cds-chips-group",
    base: { label: "Filtrar por categoria", "role-kind": "multiple", _children: chips("cds-filter-chip", [0, 2]) },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=12457-3664", sourceLabel: "Abrir o Chips Group no Figma",
    cover: { description: "Container que organiza Filter Chips ou Input Chips em uma linha com rolagem ou em várias linhas.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Os Chips ainda não têm página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Chips Group reúne chips do mesmo tipo (Filter Chips ou Input Chips) com espaço de 8 entre eles. Em Single Rows Chips, os chips ficam numa linha que rola na horizontal; em Multiple Rows Chip, quebram linha." },
        { p: "O grupo só organiza: cores, estados e eventos são dos chips." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Agrupar Filter Chips sobre uma lista, tabela ou extrato.", "Mostrar os Input Chips de valores escolhidos ou filtros aplicados."] },
        { h3: "Não utilize para:" },
        { ul: ["Misturar Filter Chips e Input Chips no mesmo grupo.", "Um chip só — use o chip direto."] },
        { h2: "Casos de uso" },
        { h3: "Single Rows Chips vs Multiple Rows Chip" },
        { compare: [
          { title: "Single Rows Chips (rolagem)", attrs: { "role-kind": "single" } },
          { title: "Multiple Rows Chip (quebra linha)", attrs: {} }
        ] },
        { p: "Use Single Rows Chips no mobile e em espaços baixos, quando a lista pode rolar; use Multiple Rows Chip quando todos os chips precisam ficar visíveis." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _children: chips("cds-filter-chip", [0]).slice(0, 4) }, markers: [{ n: 1, target: "cds-chips-group", side: "left" }, { n: 2, target: "cds-filter-chip", side: "top" }], legend: ["Container (Slot, gap 8, largura 320)", "Chips (Filter Chips ou Input Chips)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Input Chips", values: ["Input Chips", "Filter Chips"] },
          { name: "Role", type: "Variant", default: "Single Rows Chips", values: ["Single Rows Chips", "Multiple Rows Chip"] },
          { name: "Slot", type: "Slot", default: "—" }
        ] },
        { note: "Props e padrões lidos do set Chips Group da lib estável. No código: `role-kind` (single|multiple, padrão single; \"role\" é reservado no HTML), `kind` (informativo — o tipo vem dos filhos) e `label` (nome do grupo). Os chips são filhos diretos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Filter Chips", attrs: {} },
          { label: "Input Chips", attrs: { _children: chips("cds-input-chip") } }
        ] } },
        { h2: "Role" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Single Rows Chips", attrs: { "role-kind": "single" } },
          { label: "Multiple Rows Chip", attrs: {} }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O grupo tem `role=\"group\"` e o nome vem de `label` (ex.: \"Filtrar por categoria\").",
          "`Tab` passa de chip em chip; em Single Rows Chips, o chip com foco entra na área visível pela rolagem do navegador.",
          "Cada chip mantém o próprio comportamento (Filter: `aria-pressed`; Input: botão de remover)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Sempre dê um `label` ao grupo.", "Coloque o grupo logo acima do conteúdo que ele filtra."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: as transições são as dos chips (ver Filter Chips e Input Chips)." }
      ] }
    ]
  };
})();
