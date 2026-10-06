/* Documentação — Radio Select Input: mesmas tabs da doc da família Select Input (zeroheight "Select input", em async-select-input.docs.js),
   lidas na hora de renderizar; capa e base próprias. Os blocos sem _tag mostram este componente. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  function fam(){ return CDS.docs["async-select-input"] || { tabs: [] }; }
  var OPTS = ["Vale-refeição", "Vale-alimentação", "Mobilidade", "Saúde", "Educação"].map(function(l, i){ return { _tag: "option", value: "o" + i, _text: l }; });
  CDS.docs["radio-select-input"] = {
    tag: "cds-radio-select-input",
    base: { label: "Benefício", placeholder: "Selecione", supporting: "Escolha a categoria do saldo", "show-required": false, "show-lead-icon": false, "show-character-counter": false, _children: OPTS },
    cover: { description: "Escolha única sem busca: o campo abre a lista de opções, com Radio Button. Faz parte da família Select Input.", examples: [ {} ] },
    get source(){ return fam().source; }, sourceLabel: "Abrir o Select input no zeroheight",
    get tabs(){ return fam().tabs; }
  };
})();
