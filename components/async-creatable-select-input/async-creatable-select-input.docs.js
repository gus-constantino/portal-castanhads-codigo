/* Documentação — Async creatable Select Input: mesmas tabs da doc da família Select Input (zeroheight "Select input", em async-select-input.docs.js),
   lidas na hora de renderizar; capa e base próprias. Os blocos sem _tag mostram este componente. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  function fam(){ return CDS.docs["async-select-input"] || { tabs: [] }; }
  var OPTS = ["Vale-refeição", "Vale-alimentação", "Mobilidade", "Saúde", "Educação"].map(function(l, i){ return { _tag: "option", value: "o" + i, _text: l }; });
  CDS.docs["async-creatable-select-input"] = {
    tag: "cds-async-creatable-select-input",
    base: { label: "Benefício", placeholder: "Selecione", supporting: "Escolha a categoria do saldo", "show-required": false, "show-lead-icon": false, "show-character-counter": false, _children: OPTS },
    cover: { description: "Como o Async e, quando o texto digitado não existe nas opções, oferece \"Adicionar “…”\" para criar a opção. Faz parte da família Select Input.", examples: [ {} ] },
    get source(){ return fam().source; }, sourceLabel: "Abrir o Select input no zeroheight",
    get tabs(){ return fam().tabs; }
  };
})();
