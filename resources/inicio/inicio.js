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
          // O onboarding de design do Hub (p/80dfb0) saiu do ar: o atalho leva ao treinamento de como usar as documentações (C158)
          { title: "Designers", text: "Comece pelo treinamento: como usar as documentações do Castanha.", href: "#/treinamento", cta: "Ver treinamento", illustration: "dispositivos/notebook" },
          { title: "Dev. Flutter", text: "Acesse o onboarding para desenvolvedores mobile.", href: "https://castanha-staging-flutter.caju.com.br/", cta: "Castanha Flutter", external: true, illustration: "dispositivos/celular-logo" },
          { title: "Dev. React", text: "Acesse o onboarding para desenvolvedores web.", href: "https://castanha-staging.caju.com.br/?path=/docs/actions-button--docs", cta: "Castanha React (Storybook)", external: true, illustration: "dispositivos/notebook-relatorios" }
        ] }
      ] },
      // Sobre → Princípios de Design (zeroheight · 7379702). Texto do Hub; os ícones da página usam cores fora dos tokens
      // (C159) e ficam de fora: cada princípio vira um Card do DS.
      { id: "principios", title: "Princípios de Design", blocks: [
        { h2: "Princípios de Design" },
        { p: "Os Princípios de Design da Experiência estabelecem diretrizes estratégicas que orientam decisões de Design e Desenvolvimento em toda a Caju." },
        { p: "Eles garantem alinhamento entre equipes, promovem a padronização das experiências digitais e sustentam a escalabilidade e a eficiência na construção de produtos. Servem de base para manter a integridade e a consistência da identidade digital ao longo do tempo." },
        { cards: [
          ["Simples", "Facilitar e reduzir a curva de aprendizado, afinal estamos projetando sistemas com múltiplas regras. Ser simples e objetivo, sem inovar onde não precisa, com interfaces mais limpas e toques de alegria onde podemos encantar sem comprometer a jornada."],
          ["Eficiente", "Uniformizar jornadas, habilitar atalhos, garantir a visibilidade da localização e dos estados atualizados para a pessoa usuária e aproveitar melhor o espaço da tela. Isso torna tudo mais claro e mais rápido, e dá orientação de contexto e de tarefa."],
          ["Consistente", "Projetar para diferentes tipos de produto com fluidez e capacidade de se adaptar a qualquer movimento do negócio, sem deixar de garantir consistência e coerência na Visão Cliente e no ecossistema Caju."]
        ] },
        { note: "Fonte: página Princípios de Design do Castanha Hub (Sobre). Motion, Ilustração e Conteúdo têm princípios próprios: veja Caju - Tema e Conteúdo." }
      ] }
    ]
  };
})();
