/* Tour do portal (F2/F3, plano §3.2 e §11.2): 3 passos em Popover do DS com o Backdrop atrás, só com o menu lateral (mais de
   1100 px). Abre pelo Começar da boas-vindas ou pelo botão Fazer o tour dos Primeiros passos. No fim, leva aos Primeiros passos. */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding) return;
  var desktop = function(ctx){ return ctx.width > 1100; };
  CDS.onboarding.register({
    id: "portal", version: 1, title: "Tour do portal: menu, busca e Ajuda",
    steps: [
      { anchor: "menu", showIf: desktop, title: "Tudo do Castanha por área", text: "Desenvolvimento, Padrões, Componentes e mais, em seções que abrem e fecham." },
      { anchor: "busca", showIf: desktop, title: "Encontre qualquer regra", text: "A busca lê os nomes e o texto das docs. Use / ou ⌘K em qualquer página." },
      { anchor: "sec-ajuda", showIf: desktop, title: "Ajuda a um clique", text: "Na Ajuda ficam a FAQ, o Changelog e os seus primeiros passos.", placement: "top" }
    ],
    onComplete: function(){ location.hash = "#/inicio/primeiros-passos"; }
  });
})();
