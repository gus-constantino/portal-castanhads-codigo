/* Boas-vindas (F2, plano §3.1 e §11.1): Modal do DS na 1ª visita, com a escolha de perfil (opcional). Começar segue para o tour
   do portal com o menu lateral (mais de 1100 px) ou direto para os Primeiros passos do Início no estreito.
   Me lembrar mais tarde: volta a partir do dia seguinte, no máximo 2 vezes. Não mostrar novamente: só pela tab Primeiros passos. */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding) return;
  CDS.onboarding.register({
    id: "boas-vindas", version: 1, auto: true, then: "portal", title: "Boas-vindas com a escolha de perfil",
    steps: [
      { kind: "modal", title: "Que bom ter você no Castanha", text: "Escolha o seu foco e mostramos o portal em 3 etapas, cerca de 1 minuto.", illustration: "objetos/kit-onboarding",
        choose: { label: "Qual é o seu foco no Castanha?", options: [
          { id: "design", label: "Design" }, { id: "react", label: "Desenvolvimento React" }, { id: "flutter", label: "Desenvolvimento Flutter" },
          { id: "conteudo", label: "Conteúdo" }, { id: "produto", label: "Produto" }
        ] } }
    ],
    onComplete: function(onb){ if (!onb.start("portal")) location.hash = "#/inicio/primeiros-passos"; }
  });
})();
