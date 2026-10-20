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
        // Banners da capa do Hub (09/10, D294): Novidades leva ao Changelog (no Hub, ao Status dos componentes) e o Borô a Agentes e Skills
        { banner: { area: "ajuda", eyebrow: "Novidades", heading: "Novidades do Castanha DS", text: "As últimas atualizações do Design System para criar experiências expressivas e adaptadas a cada contexto, produto e pessoa.", href: "#/changelog", cta: "Acessar o changelog" } },
        // Atalhos da capa do Hub: Componentes, Tom e voz, Visão Cliente e Fundação
        { shortcuts: { bento: 4, items: [
          { size: "hero", title: "Componentes", text: "Os componentes do Castanha DS, com Playground ao vivo, documentação de uso e o código React de cada um.", href: "#/main-button", cta: "Acessar componentes", illustration: "interfaces/customizacao" },
          { size: "wide", title: "Tom e voz", text: "Tom e voz, princípios de escrita e regras de texto que tornam as experiências mais fáceis de usar.", href: "#/conteudo", cta: "Acessar Tom e voz", illustration: "comunicacao/perguntas-frequentes" },
          { title: "Visão Cliente", text: "Perfil, personas e ICP de quem usa o produto, para orientar cada decisão de experiência.", href: "#/personas", cta: "Acessar personas", illustration: "personagens/joana" },
          { title: "Fundação", text: "A base de toda interface: cores, tipografia, tamanhos, motion e ilustração do Tema Caju.", href: "#/caju-theme", cta: "Acessar Tema Caju", illustration: "interfaces/home" }
        ] } },
        { banner: { area: "ferramentas", eyebrow: "Assistente de Experiência", heading: "Conheça o Borô", text: "Seu parceiro para criar e aplicar Tom e Voz, entender a Visão Cliente e usar os recursos do Castanha Hub. As respostas vêm direto da documentação, sempre atualizada.", href: "#/agentes", cta: "Conhecer o Borô" } },
        { h2: "Comece por aqui" },
        { shortcuts: { bento: 3, items: [
          // O onboarding de design do Hub (p/80dfb0) saiu do ar: o atalho leva ao treinamento de como usar as documentações (C158)
          { layout: "row", title: "Designers", text: "Comece pelo treinamento: como usar as documentações do Castanha.", href: "#/treinamento", cta: "Treinamento", illustration: "dispositivos/notebook" },
          // Dev. Flutter: o Getting Started do Widgetbook entrou no portal (Desenvolvimento › Flutter, D311)
          { layout: "row", title: "Dev. Flutter", text: "Instalação, tema e uso dos componentes do castanha_flutter, aqui no portal.", href: "#/flutter-instalacao", cta: "Desenvolvimento", illustration: "dispositivos/celular-logo" },
          // Dev. React: as docs do Storybook entraram no portal (Desenvolvimento, D305); o atalho leva ao Comece aqui, não mais ao Storybook
          { layout: "row", title: "Dev. React", text: "Instalação, ambiente e uso dos pacotes do castanha-react, aqui no portal.", href: "#/comece-aqui", cta: "Desenvolvimento", illustration: "dispositivos/notebook-relatorios" }
        ] } },
        // Divulgação dos cursos e capacitações (D230): banners das Notion thumbnails do Castanha Assets (<loc-banner>)
        { h2: "Aprenda o Castanha DS" },
        { banners: [
          { area: "aprenda", eyebrow: "Curso", heading: "Castanha DS na Awtra", text: "O curso do Design System da Caju na plataforma Awtra, para fazer no seu ritmo.", href: "https://lms.awtra.com.br/company/caju/app/course/f5e0c07c-7778-489c-81af-91216c8ccdd0", cta: "Fazer o curso", external: true },
          { area: "aprenda", eyebrow: "67 vídeos · 7 treinamentos", heading: "Capacitações", text: "Sponsor App, Employee App, Motion, Ilustração e a trilha de Content.", href: "#/capacitacoes", cta: "Acessar capacitações" },
          { area: "aprenda", eyebrow: "7 vídeos", heading: "Como usar as documentações", text: "O treinamento do Castanha DS em vídeo, tema por tema.", href: "#/treinamento", cta: "Acessar treinamento" },
          { area: "aprenda", eyebrow: "6 temas", heading: "Castanha Quiz", text: "Estude cada tema em uns 5 minutos e pratique com o jogo e o quiz.", href: "#/castanha-quiz", cta: "Acessar o Castanha Quiz" }
        ] },
        { h2: "Mais recursos" },
        { shortcuts: { bento: 3, items: [
          { size: "wide", title: "Ilustração", text: "Princípios, guidelines e a biblioteca de ilustrações da Caju.", href: "#/ilustracao", cta: "Acessar Ilustração", illustration: "personagens/nadia" },
          { layout: "row", title: "Motion", text: "Princípios de motion, curvas, durações, Motion Styles e animações.", href: "#/motion", cta: "Acessar Motion", illustration: "objetos/foguete" },
          { size: "wide", title: "Agentes e Skills", text: "O Borô no Slack e no Figma, os Patterns escritos para a IA e a skill /castanhads-juntos: IA que ajuda a escrever e construir no padrão da Caju.", href: "#/agentes", cta: "Acessar Agentes e Skills", src: "resources/agentes/boro.svg" },
          { layout: "row", title: "Patterns", text: "Feedback Pages e Tela de loading, montadas com componentes do DS.", href: "#/patterns", cta: "Acessar Patterns", illustration: "notificacoes/success" },
          { layout: "row", title: "Desenvolvimento", text: "Instalação, guias e design tokens para React e Flutter.", href: "#/comece-aqui", cta: "Acessar Desenvolvimento", illustration: "interfaces/lista" },
          { size: "wide", title: "Changelog", text: "O que saiu em cada release do Castanha: React, Flutter, Figma, ilustrações, ícones e documentação.", href: "#/changelog", cta: "Acessar Changelog", illustration: "notificacoes/sino" }
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
        { note: "Fonte: página Princípios de Design do Castanha Hub (Sobre). Motion, Ilustração e Conteúdo têm princípios próprios: consulte Ilustração, Motion e Conteúdo, em Padrões." }
      ] },
      // Primeiros passos (onboarding, D315), por último nas tabs (09/10): perfis, checklist que se marca pela ação e o botão do tour (services/onboarding)
      { id: "primeiros-passos", title: "Primeiros passos", blocks: [
        { h2: "Primeiros passos" },
        { visual: { bare: true, render: function(){ return CDS.onboarding ? CDS.onboarding.checklistView() : document.createElement("div"); } } },
        // Trilha Explorar (F4): as 20 paradas do Roteiro, que continua como página própria em docs/roteiro
        { h2: "Explorar o portal" },
        { visual: { bare: true, render: function(){ return CDS.onboarding ? CDS.onboarding.trailView() : document.createElement("div"); } } }
      ] }
    ]
  };
})();
