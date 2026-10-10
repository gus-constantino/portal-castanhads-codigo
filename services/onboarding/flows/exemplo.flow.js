/* Fluxo de exemplo do onboarding (F1): boas-vindas em Modal e o tour de 3 passos do plano (docs/PLANO-ONBOARDING.md §3 e §11).
   Não abre sozinho: só por ?tour=exemplo na URL ou pelo botão da página #/onboarding. Na F2 e na F3 vira os fluxos de verdade
   (boas-vindas com perfil e o tour do portal). Copy em revisão com o time de Conteúdo. */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding) return;
  var desktop = function(ctx){ return ctx.width > 1100; }; // tour só com o menu lateral (no estreito o menu vira faixa)
  CDS.onboarding.register({
    id: "exemplo", version: 1, title: "Exemplo: boas-vindas e tour do portal",
    steps: [
      { kind: "modal", title: "Que bom ter você no Castanha", text: "Em 3 etapas, cerca de 1 minuto, mostramos onde fica cada coisa.", illustration: "objetos/kit-onboarding" },
      { anchor: "menu", showIf: desktop, title: "Tudo do Castanha por área", text: "Desenvolvimento, Padrões, Componentes e mais, em seções que abrem e fecham." },
      { anchor: "busca", showIf: desktop, title: "Encontre qualquer regra", text: "A busca lê os nomes e o texto das docs. Use / ou ⌘K em qualquer página." },
      { anchor: "sec-ajuda", showIf: desktop, title: "Ajuda a um clique", text: "Na Ajuda ficam a FAQ e o Changelog. Para falar com o time, use Abrir chamado.", placement: "top" }
    ]
  });
})();
