/* Documentação — Bottom Sheet
   Fontes (PLANO-DOCS §5, 05/10): o zeroheight não tem página do componente (só a de regras de texto, já na tab Conteúdo); o texto de Uso,
   Composição e Diretrizes vem da description do componente na lib estável (Bottom Sheet 20848:2679, texto do time); props e padrões do mesmo
   componente; comportamento e acessibilidade do playground. Tab Conteúdo do [NEW] Content (6400:15668, D98). */
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
  // Bottom Sheet inline numa moldura de tela (pg-cnt-phone), para mostrar a folha sobre o fundo
  function sheet(attrs, kids){ return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [Object.assign({ _tag: "cds-bottom-sheet", inline: true, "text-title": "Title", "primary-label": "Confirmar", "secondary-label": "Cancelar", _children: kids || [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Conteúdo curto, rápido de ler e agir." }] }, attrs || {})] }; }
  function confirm(app, icon, title, text){ return [{ _tag: "cds-confirmation-message", appearance: app, icon: icon, title: title, description: text }]; }
  function opt(label, active){ return { _tag: "cds-selection-list-item", label: label, "show-description": false, "show-lead-item": false, "trailing-item": "radio-button", name: "ordem", "is-active": active ? true : null }; }
  CDS.docs["bottom-sheet"] = {
    tag: "cds-bottom-sheet",
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20848-2679", sourceLabel: "Abrir o Bottom Sheet no Figma",
    cover: { description: "Camada que surge da base da tela para apresentar conteúdo ou ações complementares sem tirar a pessoa do contexto. A tela de fundo continua visível.", tall: true, examples: [sheet({ "show-header": "false", "primary-label": "Sair sem salvar", "secondary-label": "Continuar editando" }, confirm("warning", "timer-line", "Sair sem salvar?", "As alterações feitas serão perdidas."))] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Mobile only", text: "Bottom Sheet é um componente mobile. Em desktop e tablet, use Modal ou Drawer." } },
        { h2: "Sobre" },
        { p: "Camada que surge da base da tela para apresentar conteúdo ou ações complementares sem tirar a pessoa do contexto. A tela de fundo continua visível. Use sempre sobre um Backdrop — no Castanha é ele que separa a camada da interface por baixo, e sem ele a folha não se distingue do fundo." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Ações a partir de um elemento da tela.", "Escolha entre poucas opções.", "Confirmações em que ver o fundo ajuda.", "Conteúdo complementar curto."] },
        { h3: "Não utilize para:" },
        { ul: ["Desktop e tablet — use Modal ou Drawer.", "Fluxos com várias etapas.", "Conteúdo extenso.", "Navegação principal.", "No lugar de uma página."] },
        { h2: "Bottom Sheet vs Modal" },
        { p: "Use o Bottom Sheet quando preservar o contexto da tela ajuda a decisão. Use o Modal quando a interrupção é o ponto." },
        { note: "Texto da description do componente na lib. O zeroheight ainda não tem página do componente Bottom Sheet (só a de regras de texto, na tab Conteúdo). Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: sheet(),
          markers: [{ n: 1, target: ".cds-sheet__handle", side: "right" }, { n: 2, target: "cds-header", side: "left" }, { n: 3, target: ".cds-overlay__slot", side: "left" }, { n: 4, target: "cds-footer", side: "left" }],
          legend: ["Handle", "Header (opcional)", "Content · Slot (obrigatório)", "Footer (opcional)"]
        } },
        { h2: "Composição" },
        { ul: [
          "Handle: fixo na borda superior. Indica que a folha pode ser arrastada e dispensada. Não remova.",
          "Header (opcional): título e botão de fechar. Escreva títulos curtos e diretos.",
          "Content (obrigatório): monte o conteúdo no Slot. Use um componente do Castanha — texto, lista, seleção ou Confirmation Message. Se você criou uma composição própria, transforme em componente antes de inserir.",
          "Footer (opcional): ação primária e secundária. Não altere a orientação nem a ordem dos botões."
        ] },
        { h2: "Propriedades" },
        { props: [
          { name: "Show Header", type: "Boolean", default: "true" },
          { name: "Show Footer", type: "Boolean", default: "true" },
          { name: "Slot", type: "Slot" }
        ] },
        { note: "Props e padrões lidos do componente Bottom Sheet da lib estável. No código: `text-title`, `show-close-button`, `primary-label`, `secondary-label`, `show-secondary-action-button` e `dismissible`. Raio 16 16 0 0; Footer em Pilled." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Padrões de composição" },
        { specimens: { min: "calc(var(--common-sizes-200) + var(--common-sizes-120))", items: [
          { label: "Default · texto no Slot", attrs: sheet() },
          { label: "Confirmação · Confirmation Message", attrs: sheet({ "show-header": "false", "primary-label": "Sair sem salvar", "secondary-label": "Continuar editando" }, confirm("warning", "timer-line", "Sair sem salvar?", "As alterações feitas serão perdidas.")) },
          { label: "Seleção · Selection List", attrs: sheet({ "text-title": "Ordenar por", "show-footer": "false" }, [opt("Mais recentes", true), opt("Mais antigos"), opt("Maior valor")]) }
        ] } },
        { note: "Confirmação: insira Confirmation Message no Slot, com estilo Neutral, Positive ou Warning conforme o impacto da ação. Seleção: insira Selection List no Slot quando a folha existir para escolher entre opções." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É um `<dialog>` modal: o resto da página fica inerte enquanto a folha está aberta.",
          "O título do Header é o nome acessível; sem Header, informe `label`.",
          "O Handle é decorativo (`aria-hidden`): arrastar não é o único jeito de fechar — há o botão de fechar, as ações e o Esc."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Ao abrir, o foco entra na folha e fica preso nela.", "Esc fecha (exceto com `dismissible=\"false\"`).", "Ao fechar, o foco volta para o elemento que abriu a folha."] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Bottom Sheet." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Boas práticas" },
        { guides: [
          { attrs: sheet({ "show-header": "false", "primary-label": "Sair sem salvar", "secondary-label": "Continuar editando" }, confirm("warning", "timer-line", "Sair sem salvar?", "As alterações feitas serão perdidas.")), title: "Uma decisão por folha", text: "Destaque a ação primária e evite ambiguidade entre as opções." },
          { attrs: sheet({ "text-title": "Cartão virtual" }, [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Use o cartão virtual em compras online e nas carteiras digitais." }]), title: "Conteúdo curto", text: "A folha precisa ser rápida de ler e agir. Se o conteúdo exige rolagem longa, o caso pede uma página." },
          { attrs: sheet({ "text-title": "Ordenar por", "show-footer": "false" }, [opt("Mais recentes", true), opt("Mais antigos")]), title: "Alinhe o conteúdo do Slot", text: "Alinhe o conteúdo do Slot com o header e o footer, usando a mesma margem lateral — a menos que a imagem ou lista deva ocupar a largura inteira de propósito." }
        ] },
        { note: "Regras de texto do Bottom Sheet (títulos em pergunta, como encerrar) estão na tab Conteúdo." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para o Bottom Sheet na lib nem no zeroheight, e a entrada e a saída não estão animadas no playground." } }
      ] },
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
        { h3: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: sheetActions("Sair sem salvar os documentos?", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Continuar editando", "Sair sem salvar"),
            text: "Use perguntas no título de bottom sheets, sempre que possível." },
          { kind: "dont", attrs: sheetActions("Atenção", "Você pode enviar quando quiser, mas o benefício só fica disponível após a aprovação dos documentos enviados.", "Cancelar", "Sair"),
            text: "O título não é específico e os botões são confusos para o contexto." },
          { kind: "do", text: "Use Voltar quando o bottom sheet interrompe um fluxo e, ao encerrá-lo, a pessoa retorna para uma área do app (Pix, Cartão, etc.) ou para uma tela que não é de edição." },
          { kind: "dont", text: "Não use Continuar editando se ao fechar o bottom sheet, o usuário retorna para uma área do app (ex: Pix, Cartão) ou a tela não é de input/edição." }
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Bottom sheet. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
