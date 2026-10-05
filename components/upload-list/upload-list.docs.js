/* Documentação — Upload List
   Sem página própria no zeroheight (05/10): o texto literal vem da seção "Upload Item e Upload List" da página do Upload Item (377e72);
   props do componente na lib estável (Upload List 15465:1365 — slot "Upload itens", sem description). Revisar com o time (C140). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function ui(status, title, ext, more){ return Object.assign({ _tag: "cds-upload-item", status: status, "text-title": title, "file-extension": ext }, more || {}); }
  var ITEMS = [ui("uploading", "comprovante-residencia", ".pdf", { percent: "60" }), ui("success", "rg-frente", ".jpg", { src: "assets/brand/sample-photo.svg" }), ui("error", "rg-verso", ".jpg"), ui("uploaded", "contrato-social", ".pdf")];

  CDS.docs["upload-list"] = {
    tag: "cds-upload-list",
    base: { label: "Arquivos" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/377e72-upload-item", sourceLabel: "Abrir o Upload Item no zeroheight (seção Upload List)",
    cover: { description: "Agrupa os Upload Items de um fluxo, com ordem e espaçamento consistentes.", tall: true, examples: [ { label: "Arquivos", _children: ITEMS.slice(0, 3) } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Sem página própria", text: "O Upload List não tem página no zeroheight. O texto abaixo é o da seção \"Upload Item e Upload List\" da página do Upload Item." } },
        { h2: "Sobre" },
        { p: "O Upload Item representa um arquivo. Quando o fluxo aceita mais de um, os itens são agrupados no Upload List, que é um Auto Layout vertical com espaçamento fixo e um slot que só aceita Upload Item. O List existe para garantir ordem e espaçamento consistentes entre os arquivos, sem acrescentar conteúdo próprio: nome, estado e ações continuam sendo do item. Com um arquivo só, o Upload Item pode ser usado direto, sem a lista." },
        { h2: "Quando usar" },
        { ul: ["Exibir arquivos já enviados (no Dropzone: \"Não utilize para: Exibir arquivos já enviados (utilize o Upload List)\").", "Agrupar os arquivos adicionados por um Dropzone que aceita mais de um arquivo."] },
        { compare: [
          { title: "Dropzone + Upload List", attrs: { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: [{ _tag: "cds-dropzone", viewport: "desktop", "text-title": "Adicionar documentos" }, { _tag: "cds-upload-list", label: "Documentos", _children: ITEMS.slice(0, 2) }] } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { label: "Arquivos", _children: ITEMS.slice(1, 3) }, markers: [{ n: 1, target: "cds-upload-item:first-child", side: "left" }, { n: 2, target: "cds-upload-item:last-child", side: "right" }], legend: ["Upload Item", "Upload Item (espaçamento 8 entre itens)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Upload itens", type: "Slot", default: "—" }
        ] },
        { note: "Prop lida do componente Upload List da lib estável: um slot que só aceita Upload Item. No código: filhos `<cds-upload-item>` (sem filhos, mostra a amostra do Figma) e `label` (nome da lista, padrão \"Arquivos\")." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Amostra do Figma" },
        { display: { attrs: { label: "Arquivos", _children: ITEMS } } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É uma lista com nome (`label`): o leitor de tela anuncia quantos arquivos há.",
          "Cada item anuncia o próprio estado; a lista não acrescenta conteúdo.",
          "Ao remover um item, mova o foco para o item seguinte (ou para o Dropzone, se a lista ficar vazia)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use logo abaixo do Dropzone que originou os arquivos.", "Só Upload Items dentro da lista.", "Com um arquivo só, use o Upload Item direto, sem a lista."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A lista é estática; a entrada e a saída de itens não têm Motion especificado." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion para itens entrando ou saindo da lista (CONFERIR C140)." } }
      ] }
    ]
  };
})();
