/* Documentação — main-button: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Botões (6400:15361).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["main-button"] = {
    tag: "cds-main-button",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-15361", sourceLabel: "Abrir Botões em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O texto do botão é o contrato com a pessoa usuária: ela precisa saber exatamente o que vai acontecer antes de clicar." },
        { h3: "Como escrever" },
        { ul: [
          "Use infinitivo em botões e áreas clicáveis. Não use pronomes possessivos.",
          "Se precisar usar pronome, use na terceira pessoa (seu/sua).",
          "Use imperativo apenas em botões de peças de marketing.",
          "O texto deve seguir os mesmos termos usados no título e na descrição da tela. A pessoa deve conseguir ler o header e o botão e relacionar as duas informações.",
          "Use no máximo 3 palavras. Nunca quebre o texto em mais de uma linha.",
          "Nunca use ponto final ou ponto de exclamação.",
          "Evite labels genéricas como \"Sim\", \"Não\", ”Entendi” ou \"Ok\". Seja específico."
        ] },
        { h3: "Ações destrutivas" },
        { p: "Mesmo sem um estilo visual específico, deixe claro na label quando a ação é irreversível. A pessoa não pode ter dúvida sobre o que vai acontecer. Exemplo:" },
        { display: { attrs: [
          { _tag: "cds-main-button", label: "Sair sem salvar", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Remover colaborador", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Sair do app", "show-lead-icon": false, "show-trailing-icon": false }
        ] } },
        { h3: "Labels padronizadas" },
        { table: { wrap: true, head: ["Label", "Quando usar"], rows: [
          ["Aplicar", "CTA padrão para aplicar filtros selecionados."],
          ["Cancelar", "Quando a pessoa desiste de uma edição, sem sair do fluxo. Sempre aparece junto com \"Salvar alterações\"."],
          ["Confirmar", "Final de fluxo onde a última tela é uma revisão de dados antes da conclusão da ação."],
          ["Concluir", "Encerra onboardings que tem mais de uma etapa."],
          ["Continuar", "Avança para a próxima etapa sem finalizar o fluxo. Não usar em telas de revisão ou encerramento."],
          ["Continuar editando", "Pop-ups ou bottom sheets que desistem de uma confirmação. Nunca use \"Cancelar\" nesses casos. Exceção: use \"Voltar\" quando o contexto não for coerente com \"edição\"."],
          ["Detalhes", "Abre mais informações sobre uma área, colaborador ou pedido."],
          ["Dúvidas frequentes", "Leva para artigo na FAQ. Uso exclusivo no componente shortcut."],
          ["Falar com a Caju", "Abre WhatsApp ou e-mail do time de CX."],
          ["Fechar", "Encerra algo sem impacto ou decisão (onboardings, modais informativos). Também usado quando o modal não tem \"X\" no canto superior."],
          ["Já recebi e quero ativar", "Texto fixo — não modifique. Caso seja alterado, deve ser atualizada a carta berço do cartão físico."],
          ["Limpar", "Remove os filtros aplicados."],
          ["Me lembrar mais tarde", "Fecha pop-ups ou bottom sheets que voltam a aparecer até a ação ser concluída."],
          ["Não encontrei o código", "Telas de código de ativação, abre modal explicativo sobre onde encontrar o código."],
          ["Não mostrar novamente", "Encerra pop-ups ou bottom sheets que não voltam a aparecer."],
          ["Preciso de ajuda", "Abre artigos da FAQ."],
          ["Pular", "Pula uma etapa não obrigatória do fluxo."],
          ["Quero saber mais", "Abre artigo ou categoria da FAQ sobre novidades. Tom mais leve que \"Preciso de ajuda\"."],
          ["Quero ser avisado", "A pessoa sinaliza que quer ser comunicada sobre uma mudança ou retorno de instabilidade."],
          ["Sair sem salvar", "Abandona o fluxo com perda de dados. Deixa claro que as informações não serão salvas."],
          ["Saiba mais", "Exclusivo para peças de marketing (banners, campanhas, formulários externos)."],
          ["Salvar alterações", "Confirma uma edição em formulário."],
          ["Sim, cancelar", "Confirma o cancelamento de uma ação já iniciada. Remove ambiguidade do termo \"Cancelar\"."],
          ["Voltar", "Retorna a uma etapa anterior sem sair do fluxo. Exceção: use \"Voltar\" em vez de \"Continuar editando\" quando o contexto não for coerente com edição."],
          ["[Apenas Sponsor] Voltar para [Nome da área]", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo. Nome da área sempre com letra maiúscula."],
          ["[Apenas Employee] Fechar", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo."]
        ] } },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Botões. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
