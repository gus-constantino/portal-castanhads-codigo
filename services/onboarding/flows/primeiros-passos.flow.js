/* Primeiros passos (F2, plano §3.3 e §11.3): o checklist da tab do Início, por perfil. Até 5 tarefas, em qualquer ordem, a
   primeira já concluída quando a pessoa escolhe o foco. Cada tarefa se marca pela ação: abrir a página (visit) ou mexer numa
   prop no Playground (playground). */
(function(){
  var CDS = window.CDS = window.CDS || {};
  if (!CDS.onboarding) return;
  var comp = { id: "testar-componente", label: "Testar um componente", text: "Mude uma propriedade no Playground do Main Button.", href: "#/main-button", done: { playground: true } };
  CDS.onboarding.checklist({
    intro: "Um caminho para começar pelo que importa no seu dia a dia. Faça na ordem que preferir: cada passo se marca quando você abre a página.",
    chooseLabel: "Qual é o seu foco no Castanha?",
    tour: "portal",
    common: [{ id: "escolher-foco", label: "Escolher o seu foco", text: "Escolha acima o perfil que mais combina com você.", done: { profile: true } }],
    profiles: [
      { id: "design", label: "Design", tasks: [
        comp,
        { id: "usar-documentacoes", label: "Usar as documentações", text: "O treinamento em vídeo, tema por tema.", href: "#/treinamento", done: { visit: "treinamento" } },
        { id: "organizar-figma", label: "Organizar o Figma", text: "Estrutura, branches e colaboração.", href: "#/treinamento/organizar", done: { visit: "treinamento/organizar" } },
        { id: "quiz-componentes", label: "Jogar o Quiz", text: "Qual componente usar, em 5 minutos.", href: "#/castanha-quiz/componentes", done: { visit: "castanha-quiz/componentes" } }
      ] },
      { id: "react", label: "Desenvolvimento React", tasks: [
        { id: "react-instalar", label: "Instalar o castanha-react", text: "Pacotes, instalação mínima e requisitos.", href: "#/dev-instalacao", done: { visit: "dev-instalacao" } },
        { id: "react-ambiente", label: "Preparar o ambiente", text: "GitHub Packages, tokens, estilos e o CastanhaProvider.", href: "#/dev-ambiente", done: { visit: "dev-ambiente" } },
        comp,
        { id: "camadas", label: "Entender as camadas", text: "Do token à tela, no Figma e no código.", href: "#/camadas", done: { visit: "camadas" } }
      ] },
      { id: "flutter", label: "Desenvolvimento Flutter", tasks: [
        { id: "flutter-instalar", label: "Instalar o castanha_flutter", text: "Pelo commons ou direto no pubspec.", href: "#/flutter-instalacao", done: { visit: "flutter-instalacao" } },
        { id: "flutter-tema", label: "Configurar o tema", text: "CastanhaTheme no ThemeData do app.", href: "#/flutter-ambiente", done: { visit: "flutter-ambiente" } },
        { id: "flutter-componentes", label: "Usar os componentes", text: "Import, texto, ícones e layout com exemplos.", href: "#/flutter-componentes", done: { visit: "flutter-componentes" } },
        comp
      ] },
      { id: "conteudo", label: "Conteúdo", tasks: [
        { id: "tom-e-voz", label: "Conhecer Tom e voz", text: "Os pilares e as 9 premissas da voz da Caju.", href: "#/conteudo", done: { visit: "conteudo" } },
        { id: "contextos", label: "Escrever por contexto", text: "Onboarding, tour guiado, urgências e mais.", href: "#/conteudo/contextos", done: { visit: "conteudo/contextos" } },
        { id: "vocabulario", label: "Consultar o Vocabulário", text: "Glossário e termos para evitar.", href: "#/conteudo/vocabulario", done: { visit: "conteudo/vocabulario" } },
        { id: "quiz-conteudo", label: "Jogar o Quiz", text: "O tema Conteúdo do Castanha Quiz.", href: "#/castanha-quiz/conteudo", done: { visit: "castanha-quiz/conteudo" } }
      ] },
      { id: "produto", label: "Produto", tasks: [
        { id: "principios", label: "Conhecer os princípios", text: "Os 3 princípios de design da experiência na Caju.", href: "#/inicio/principios", done: { visit: "inicio/principios" } },
        { id: "personas", label: "Conhecer as personas", text: "Quem usa os produtos da Caju.", href: "#/personas", done: { visit: "personas" } },
        { id: "relatorio", label: "Acompanhar o Relatório", text: "Como está o Castanha DS no Figma, no React e no Flutter.", href: "#/relatorio", done: { visit: "relatorio" } },
        { id: "quiz-jogar", label: "Jogar o Quiz", text: "10 exercícios de todos os temas.", href: "#/castanha-quiz/jogar", done: { visit: "castanha-quiz/jogar" } }
      ] }
    ]
  });
})();
