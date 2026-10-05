/* Documentação — bottom-sheet: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Bottom sheet (6400:15668).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  // Bottom Sheet (inline) com título, texto e duas ações em Main Buttons sem ícone (o Footer do sheet não expõe o Lead Icon)
  function sheetActions(title, text, a, b){
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "show-header": false, "show-footer": false, _children: [
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", label: a, "show-lead-icon": false, "show-trailing-icon": false },
        { _tag: "cds-main-button", class: "pg-cnt-phone__cta", appearance: "neutral", label: b, "show-lead-icon": false, "show-trailing-icon": false }
      ] }
    ] };
  }
  CDS.docs["bottom-sheet"] = {
    tag: "cds-bottom-sheet",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-15668", sourceLabel: "Abrir Bottom sheet em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O bottom sheet aparece para oferecer ações ou informações adicionais sem tirar a pessoa do fluxo. Por ser um espaço reduzido, o conteúdo precisa ser direto e focado." },
        { h3: "Como escrever" },
        { ul: ["No título, prefira perguntas curtas sempre que possível. Comunique uma coisa de cada vez.", "Use pontuação na descrição.", "Quando houver consequências, sempre informe o impacto da ação na descrição.", "Deixe sempre claro como encerrar o bottom sheet."] },
        { h3: "Boas práticas" },
        { ul: [
          "Apresente apenas informações ”extras”. Nunca esconda informações essenciais para concluir a tarefa do fluxo dentro de um bottom sheet.",
          "Use para interações rápidas. Conteúdos complexos pedem uma tela dedicada.",
          "Para ações obrigatórias — quando a pessoa não pode sair sem agir —, abra uma tela inteira, não um bottom sheet."
        ] },
        { h3: "Como encerrar" },
        { p: "Use Voltar ou Continuar editando dependendo do contexto. Confira a regra completa na página Botões." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: sheetActions("Sair sem salvar os documentos?", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Continuar editando", "Sair sem salvar"),
            text: "Use perguntas no título de bottom sheets, sempre que possível." },
          { kind: "dont", attrs: sheetActions("Atenção", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Cancelar", "Sair"),
            text: "O título não é específico e os botões são confusos para o contexto." },
          { kind: "do", text: "Use Voltar quando o bottom sheet interrompe um fluxo e, ao encerrá-lo, a pessoa retorna para uma área do app (Pix, Cartão, etc.) ou para uma tela que não é de edição." },
          { kind: "dont", text: "Não use Continuar editando se ao fechar o bottom sheet, o usuário retorna para uma área do app (ex: Pix, Cartão) ou a tela não é de input/edição." }
        ] },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Bottom sheet. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
