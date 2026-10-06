/* Documentação — .Toolbar (Table) (building block)
   Sem description no set (05/10); a página Table Columns do zeroheight (795cef) fala das colunas em conjunto. Texto escrito a partir do set da lib estável (.Toolbar (Table) 13438:14337) e do playground.
   Peça interna do Table; não é usada sozinha. Revisar com o time (C147). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["table-toolbar"] = {
    tag: "cds-table-toolbar",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-14337", sourceLabel: "Abrir o .Toolbar (Table) no Figma",
    cover: { description: "Barra de ações acima da Table.", examples: [ { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-table-toolbar" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Toolbar é a barra acima das colunas da Table: 64 de altura, fundo Surface/default e borda inferior. O conteúdo é um slot. A amostra do Figma tem três Icon Buttons Ghost Neutral Small." },
        { h2: "Quando usar" },
        { ul: ["Peça interna do Table, que monta e controla os itens.", "Fora dele, use o componente completo (Table)."] },
        { compare: [{ title: "Dentro do Table", attrs: { _tag: "cds-table", "per-page": "3", "show-pagination": false } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-table-toolbar" }] }, markers: [{ n: 1, target: "cds-icon-button", side: "left" }], legend: ["Slot (ações da tabela)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Slot", type: "Slot", default: "—" }
        ] },
        { note: "Prop lida do componente .Toolbar da lib estável. No código, `<cds-table-toolbar>`: os filhos são o slot. Na Table, os filhos da `cds-table` vão para o .Toolbar." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "calc(2 * var(--common-sizes-160))", items: [
          { label: "Amostra do Figma", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-table-toolbar" }] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "As ações são Icon Buttons com nome.",
          "Coloque as ações na ordem de importância, da esquerda para a direita."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use para ações que valem para a tabela inteira (filtrar, baixar, configurar colunas).", "Ações de uma linha ficam na coluna Action Controls."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O .Toolbar é estático. As ações seguem o Motion do Icon Button." }
      ] }
    ]
  };
})();
