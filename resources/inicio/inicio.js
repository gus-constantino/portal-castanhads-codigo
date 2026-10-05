/* Início — capa do Castanha Hub (zeroheight · página 111e49). Página de entrada do playground (home: true).
   Texto e atalhos do zeroheight; as imagens dos atalhos viram ilustrações da [Caju] Illustrations (D84). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var ZH = "https://castanha.caju.com.br/858426090/v/latest/p/111e49";
  CDS.register({ id: "inicio", name: "Início", resource: true, home: true, order: 0, zeroheight: ZH });
  CDS.docs["inicio"] = {
    source: ZH, sourceLabel: "Castanha Hub no zeroheight",
    tabs: [
      { id: "hub", title: "Castanha Hub", blocks: [
        { h2: "Castanha Hub" },
        { p: "O Castanha é um Hub de soluções para criação de Experiências da Caju, desenvolvido para conectar ideias, pessoas e tecnologia. Ele une Ideação, Design e Código para garantir que os Produtos da Caju mantenham consistência com propósito." },
        { shortcuts: [
          { title: "Componentes", text: "Os componentes do Castanha DS, com Playground e documentação de uso.", href: "#/main-button", cta: "Ver componentes", illustration: "interfaces/customizacao" },
          { title: "Conteúdo", text: "Princípios de escrita: como a Caju fala nos produtos.", href: "#/conteudo", cta: "Ver conteúdo", illustration: "comunicacao/perguntas-frequentes" },
          { title: "Ilustração", text: "Princípios, guidelines e a biblioteca de ilustrações da Caju.", href: "#/caju-theme/ilustracoes", cta: "Ver ilustração", illustration: "personagens/nadia" },
          { title: "Motion", text: "Princípios de motion, curvas, durações e Motion Styles.", href: "#/caju-theme/motion", cta: "Ver motion", illustration: "objetos/foguete" }
        ] },
        { h2: "Comece por aqui" },
        { shortcuts: [
          { title: "Designers", text: "Acesse o onboarding para designers.", href: "https://castanha.caju.com.br/858426090/v/latest/p/80dfb0", cta: "Onboarding de design", external: true, illustration: "dispositivos/notebook" },
          { title: "Dev. Flutter", text: "Acesse o onboarding para desenvolvedores mobile.", href: "https://castanha-staging-flutter.caju.com.br/", cta: "Castanha Flutter", external: true, illustration: "dispositivos/celular-logo" },
          { title: "Dev. React", text: "Acesse o onboarding para desenvolvedores web.", href: "https://castanha-staging.caju.com.br/?path=/docs/actions-button--docs", cta: "Castanha React (Storybook)", external: true, illustration: "dispositivos/notebook-relatorios" }
        ] }
      ] }
    ]
  };
})();
