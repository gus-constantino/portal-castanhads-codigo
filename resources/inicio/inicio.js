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
        // Capa da marca no conceito do Castanha Assets (D221): Surface/accent e a pilha
        { hero: { title: "Castanha Hub", text: "O Castanha é um Hub de soluções para criação de Experiências da Caju, desenvolvido para conectar ideias, pessoas e tecnologia." } },
        { p: "Ele une Ideação, Design e Código para garantir que os Produtos da Caju mantenham consistência com propósito." },
        { shortcuts: { bento: 4, items: [
          { size: "hero", title: "Componentes", text: "Os componentes do Castanha DS, com Playground ao vivo, documentação de uso e o código React de cada um.", href: "#/main-button", cta: "Ver componentes", illustration: "interfaces/customizacao" },
          { size: "wide", title: "Conteúdo", text: "Tom e voz, princípios de escrita e regras de texto: como a Caju fala nos produtos.", href: "#/conteudo", cta: "Ver conteúdo", illustration: "comunicacao/perguntas-frequentes" },
          { title: "Ilustração", text: "Princípios, guidelines e a biblioteca de ilustrações da Caju.", href: "#/ilustracao", cta: "Ver ilustração", illustration: "personagens/nadia" },
          { title: "Motion", text: "Princípios de motion, curvas, durações e Motion Styles.", href: "#/motion", cta: "Ver motion", illustration: "objetos/foguete" }
        ] } },
        { h2: "Comece por aqui" },
        { shortcuts: { bento: 3, items: [
          // O onboarding de design do Hub (p/80dfb0) saiu do ar: o atalho leva ao treinamento de como usar as documentações (C158)
          { layout: "row", title: "Designers", text: "Comece pelo treinamento: como usar as documentações do Castanha.", href: "#/treinamento", cta: "Ver treinamento", illustration: "dispositivos/notebook" },
          { layout: "row", title: "Dev. Flutter", text: "Onboarding para desenvolvedores mobile.", href: "https://castanha-staging-flutter.caju.com.br/", cta: "Castanha Flutter", external: true, illustration: "dispositivos/celular-logo" },
          { layout: "row", title: "Dev. React", text: "Onboarding para desenvolvedores web.", href: "https://castanha-staging.caju.com.br/?path=/docs/actions-button--docs", cta: "Castanha React", external: true, illustration: "dispositivos/notebook-relatorios" }
        ] } },
        { h2: "Mais recursos" },
        { shortcuts: { bento: 3, items: [
          { size: "wide", title: "Personas", text: "Quem usa os produtos da Caju: colaboradores, pessoas de RH e gestão das empresas e os times que operam o Admin. Objetivos, dores e necessidades de cada uma.", href: "#/personas", cta: "Ver personas", illustration: "personagens/joana" },
          { layout: "row", title: "Tema Caju", text: "Cores, tipografia, tamanhos, bordas, elevação e ícones.", href: "#/caju-theme", cta: "Ver tema", illustration: "interfaces/home" },
          { size: "wide", title: "Agentes e Skills", text: "O Borô no Slack, os Patterns escritos para a IA e a skill /castanhads-juntos: IA que ajuda a escrever e construir no padrão da Caju.", href: "#/agentes", cta: "Ver agentes e skills", src: "resources/agentes/boro.svg" },
          { layout: "row", title: "Patterns", text: "Feedback Pages e Tela de loading, montadas com componentes do DS.", href: "#/patterns", cta: "Ver patterns", illustration: "notificacoes/success" },
          { layout: "row", title: "Capacitações", text: "Os treinamentos do Hub em vídeo: Sponsor, Employee, Motion, Ilustração e Content.", href: "#/capacitacoes", cta: "Ver capacitações", illustration: "objetos/medalha-1" },
          { size: "wide", title: "Changelog", text: "O que saiu em cada release do Castanha: React, Flutter, Figma, ilustrações, ícones e documentação.", href: "#/changelog", cta: "Ver changelog", illustration: "notificacoes/sino" }
        ] } }
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
        { note: "Fonte: página Princípios de Design do Castanha Hub (Sobre). Motion, Ilustração e Conteúdo têm princípios próprios: veja Ilustração, Motion e Conteúdo, em Padrões." }
      ] }
    ]
  };
})();
