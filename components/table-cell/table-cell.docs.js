/* Documentação — .Data Cell (building block)
   Sem description no set (05/10); a página Table Columns do zeroheight (795cef) fala das colunas em conjunto. Texto escrito a partir do set da lib estável (.Data Cell 13404:1015) e do playground.
   Peça interna do Table; não é usada sozinha. Revisar com o time (C147). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["table-cell"] = {
    tag: "cds-data-cell",
    base: { text: "Ana Alves", description: "ana@empresa.com.br" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13404-1015", sourceLabel: "Abrir o .Data Cell no Figma",
    cover: { description: "Célula de dados da Table: texto, valor, percentual, Tag, Checkbox, Link ou ações.", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-data-cell", text: "Ana Alves", description: "ana@empresa.com.br" }, { _tag: "cds-data-cell", kind: "balance", value: "1.250,00" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "A .Data Cell é cada célula de dados da Table: 64 de altura, fundo Surface/default e borda inferior. A Kind define o conteúdo: Text (com descrição), Balance (R$, à direita), Percentage (à direita), Tag, Checkbox, Link ou Action Controls (3 Icon Buttons)." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Table, que monta e controla os itens.", "Fora dele, use o componente completo (Table)."] },
        { compare: [{ title: "Dentro do Table", attrs: { _tag: "cds-table", "per-page": "3", "show-pagination": false, "show-toolbar": false } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { text: "Ana Alves", description: "ana@empresa.com.br" }, markers: [{ n: 1, target: ".cds-td__text", side: "left" }, { n: 2, target: ".cds-td__desc", side: "right" }], legend: ["Text", "Description (Show Description)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Text", values: ["Text", "Balance", "Percentage", "Tag", "Checkbox", "Link", "Action Controls"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered"] },
          { name: "Text", type: "Text", default: "Text content" },
          { name: "Description", type: "Text", default: "Description" },
          { name: "Show Description", type: "Boolean", default: "true" },
          { name: "Value", type: "Text", default: "1.000,00" },
          { name: "Percentual", type: "Text", default: "0,00" }
        ] },
        { note: "Props e padrões lidos do set .Data Cell da lib estável. No código, `<cds-data-cell>` (building block): `kind` (text|balance|percentage|tag|checkbox|link|actions), `text`, `description`, `show-description`, `value`, `percentual` e `icon`; `state=\"hovered\"` só para exemplos. Na Table, o conteúdo vem de `.rows`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Text", attrs: {} },
          { label: "Balance", attrs: { kind: "balance", value: "1.250,00" } },
          { label: "Percentage", attrs: { kind: "percentage", percentual: "12,50" } },
          { label: "Tag", attrs: { kind: "tag", text: "Ativo" } },
          { label: "Link", attrs: { kind: "link", text: "Ver detalhes" } },
          { label: "Action Controls", attrs: { kind: "actions" } },
          { label: "Hovered", attrs: { state: "hovered" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Na Table, a célula é um `<td>`: o leitor de tela anuncia o cabeçalho da coluna junto.",
          "Valores (Balance, Percentage) ficam alinhados à direita; o símbolo R$ e o % são lidos com o número.",
          "Link e ações têm nome; os ícones são decorativos."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Um tipo de célula por coluna (ver Table Columns).", "Não use “--” para campos vazios: seja descritivo."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion. No código, o hover da linha usa short/03 + systemic/accelerate (CONFERIR C147)." } }
      ] }
    ]
  };
})();
