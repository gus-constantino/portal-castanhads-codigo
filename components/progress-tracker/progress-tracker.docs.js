/* Documentação — progress-tracker: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Stepper (6400:16333).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["progress-tracker"] = {
    tag: "cds-progress-tracker",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-16333", sourceLabel: "Abrir Stepper em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O stepper comunica o progresso dentro de um fluxo com etapas definidas. Ele orienta a pessoa sobre o que ainda falta para concluir um fluxo." },
        { h3: "Como nomear as etapas do stepper" },
        { p: "Use substantivos, nunca verbos. Transforme a ação em nominalização: o stepper representa uma etapa, não uma instrução. Exemplo:" },
        { table: { wrap: true, head: ["Ação", "Etapa"], rows: [["Revisar", "Revisão"], ["Identificar", "Identificação"], ["Pagar", "Pagamento"]] } },
        { ul: [
          "Nomeie as etapas do ponto de vista da pessoa usuária — o que ela está fazendo, não o que o sistema faz.",
          "O nome da etapa no stepper deve estar alinhado ao H1 da página correspondente. O H1 pode usar verbo, mas o termo principal precisa ser o mesmo. Se a etapa é \"Revisão\", o H1 pode ser \"Revise seus dados\"."
        ] },
        { h3: "Regras de escrita" },
        { ul: [
          "Primeira letra maiúscula, demais em minúsculo.", "Sem ponto final ou qualquer outra pontuação.",
          "Use no máximo 3 palavras por etapa. O espaço é reduzido, seja direto.",
          "Mantenha o mesmo padrão gramatical em todas as etapas do mesmo fluxo. Não misture substantivos com verbos."
        ] },
        { h3: "Stepper vs. Breadcrumb" },
        { p: "O stepper comunica progresso dentro de um fluxo linear. O breadcrumb reflete a hierarquia de navegação do produto. Os dois têm responsabilidades distintas e não devem se sobrepor. Confira mais detalhes na página Breadcrumbs." },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Stepper. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
