/* Documentação — .Credit Card Flags (building block)
   Sem página no zeroheight; a description do set na lib estável (.Credit Card Flags 4934:771) é usada literal. O resto foi escrito a partir
   do Figma e do playground. Revisar com o time (C150). A pasta é card-flag; o id do playground (e da doc) é credit-card-flags. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function row(items){ return { _tag: "div", class: "pg-doc-row", _children: items }; }
  var KINDS = [["Empty", "empty"], ["Elo", "elo"], ["Mastercard", "mastercard"], ["Visa", "visa"]];

  CDS.docs["credit-card-flags"] = {
    tag: "cds-card-flag",
    base: { kind: "mastercard" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=4934-771", sourceLabel: "Abrir o .Credit Card Flags no Figma",
    cover: { description: "Simula visualmente qualquer cartão e pode simbolizar uma bandeira específica.", examples: [ row(KINDS.map(function(k){ return { _tag: "cds-card-flag", kind: k[1] }; })) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight. A primeira frase é a description do Figma. O resto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "Simula visualmente qualquer cartão e pode simbolizar uma bandeira específica." },
        { p: "Kind=Empty mostra o cartão sem marca. Elo, Mastercard e Visa mostram a bandeira." },
        { h2: "Quando usar" },
        { ul: ["Para identificar a bandeira de um cartão em listas, campos e resumos de pagamento.", "Use Empty quando a bandeira não é conhecida ou não importa."] },
        { note: "No Figma: \"Acesse o mural para mais exemplos de aplicação\"." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "img", side: "left" }], legend: ["Bandeira (SVG da marca)"] } },
        { h2: "Propriedades" },
        { props: [ { name: "Kind", type: "Variant", default: "Empty", values: ["Empty", "Elo", "Mastercard", "Visa"] } ] },
        { note: "Props e padrões lidos do set .Credit Card Flags da lib estável. No código: `kind` (empty|elo|mastercard|visa, padrão empty). As bandeiras usam o SVG de marca do Figma (`assets/flags`)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "var(--common-sizes-120)", items: KINDS.map(function(k){ return { label: k[0], attrs: { kind: k[1] } }; }) } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: ["Com bandeira, é uma imagem com o nome da bandeira como `alt` (ex.: \"Mastercard\").", "Kind=Empty é decorativo (`aria-hidden`).", "Se o nome da bandeira já estiver em texto ao lado, o `alt` repete a informação. Avalie no contexto."] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Não altere cores nem proporções das marcas.", "Mantenha o tamanho do set. Não amplie a bandeira para usar como ilustração."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
