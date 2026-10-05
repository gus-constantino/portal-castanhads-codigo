/* Documentação — fixed-tab: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Tabs (6400:15174).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  // Abas de exemplo (Scrollable Tab do DS) com os rótulos do Figma
  function tabs(labels){ return { _tag: "cds-scrollable-tab", label: "Exemplo de abas", _children: labels.map(function(l){ return { _tag: "cds-tab-item", label: l }; }) }; }
  CDS.docs["fixed-tab"] = {
    tag: "cds-fixed-tab",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-15174", sourceLabel: "Abrir Tabs em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "As tabs funcionam como placas de sinalização da interface. A pessoa usuária deve saber exatamente o que vai encontrar antes mesmo de clicar." },
        { h3: "Como nomear tabs" },
        { p: "Use verbos no infinitivo ou substantivos — escolha o que melhor representa o conteúdo da aba." },
        { ul: ["Quando o foco é uma ação, use infinitivo: `Gerenciar cartões`", "Quando o foco é uma área, use substantivos: `Histórico de pedidos`"] },
        { h3: "Regras de escrita" },
        { ul: ["Primeira letra maiúscula, demais em minúsculo", "Sem ponto final ou qualquer outra pontuação", "Sem quebra de linha, o copy deve caber em uma linha", "Sem estrangeirismos se houver equivalente em português. Exemplo: use Painel e não Dashboard"] },
        { h3: "Boas práticas" },
        { ul: [
          "Evite termos genéricos que não dizem nada: \"Visão geral\", \"Outros\". A tab deve responder o que a pessoa vai encontrar ou o que é possível fazer ali.",
          "A ordem das tabs (da esquerda para a direita) deve refletir a importância da tarefa ou a frequência de uso na jornada.",
          "Use entre 2 e 5 tabs. Muitas opções dificultam a leitura e a decisão, especialmente em mobile."
        ] },
        { h3: "Como pedir ajuda ao Borô" },
        { p: "Ao solicitar novos nomes ou revisão de tabs, sempre forneça o contexto da arquitetura e uma descrição funcional da área." },
        { code: "A tab está localizada em [caminho da navegação]. Nesta área é possível: ]liste ações e visualizações disponíveis]." },
        { p: "Exemplo: A tab está localizada no Portal para empresas em Despesas → Adiantamentos. Nesta área a pessoa encontra o saldo disponível de cada colaborador e o número de adiantamentos. Também é possível adicionar ou resgatar saldo individualmente. Não é possível criar novos adiantamentos ou adicionar colaboradores." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", text: "Utilize labels diretos e curtos que informem o conteúdo sem que a pessoa usuária tenha necessidade de clicar." },
          { kind: "dont", text: "Não utilize as Tabs como filtros. Caso precise adicionar um mecanismo de filtragem, reveja a experiência e opte por outro componente." },
          { kind: "do", attrs: tabs(["Painel de premiações", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "O usuário deve conseguir prever o conteúdo antes de clicar." },
          { kind: "dont", attrs: tabs(["Dashboard", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "Termos genéricos e estrangeiros." }
        ] },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Tabs. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
