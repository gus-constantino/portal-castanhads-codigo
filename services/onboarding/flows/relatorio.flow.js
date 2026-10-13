/* Tour do Relatório (parte 2, fase R2 · plano §7.4): 3 passos em Popover do DS, um por pergunta que a pessoa traz, na 1ª visita
   ao Relatório (route). O 2º passo é a entrada por perfil: Dev. React vai à Stack React, Dev. Flutter à Stack Flutter e o resto ao
   Conferir (group: alternativas do mesmo passo, o lint conta uma vez). Abre de novo pelo botão da tab Glossário. */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding) return;
  var wide = function(ctx){ return ctx.width > 743; };
  CDS.onboarding.register({
    id: "relatorio", version: 1, title: "Tour do Relatório: números, divergências e glossário", auto: true, route: "relatorio",
    steps: [
      { anchor: "rel-kpis", showIf: wide, title: "Como está o projeto?", text: "Os 4 números do topo resumem componentes, cobertura do Figma, débitos e a saúde do build." },
      { anchor: "rel-tab-stack", group: "2", showIf: function(ctx){ return wide(ctx) && ctx.profile === "react"; }, title: "E o React?", text: "Stack React compara cada componente do Figma com o castanha-react, prop a prop." },
      { anchor: "rel-tab-stack-flutter", group: "2", showIf: function(ctx){ return wide(ctx) && ctx.profile === "flutter"; }, title: "E o Flutter?", text: "Stack Flutter compara cada componente do Figma com o castanha_flutter, prop a prop." },
      { anchor: "rel-tab-conferir", group: "2", showIf: function(ctx){ return wide(ctx) && ctx.profile !== "react" && ctx.profile !== "flutter"; }, title: "O que diverge do Figma?", text: "Conferir lista as diferenças entre o Figma e o código, com o que falta decidir." },
      { anchor: "rel-tab-glossario", showIf: wide, title: "Termo novo?", text: "Os termos sublinhados abrem a definição. A lista completa fica no Glossário." }
    ]
  });
})();
