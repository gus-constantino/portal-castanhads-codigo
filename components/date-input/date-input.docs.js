/* Documentação — Date Input (rascunho)
   Sem página no zeroheight, sem [Documentation] e sem description no set (05/10). Texto escrito a partir do set da lib estável
   (Date Input 17962:70687) e do playground; segue a família Text Fields. Revisar com o time (C148). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function di(more){ return Object.assign({ _tag: "cds-date-input", label: "Data de vencimento", "show-required": false, "show-character-counter": false, supporting: "Escolha um dia útil", today: "2026-01-20" }, more || {}); }

  CDS.docs["date-input"] = {
    tag: "cds-date-input",
    base: { label: "Data de vencimento", "show-required": false, "show-character-counter": false, supporting: "Escolha um dia útil", today: "2026-01-20" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17962-70687", sourceLabel: "Abrir o Date Input no Figma",
    cover: { description: "Campo de data da família Text Fields: digitar com máscara dd/mm/aaaa ou escolher no calendário.", examples: [ { value: "15/01/2026" } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "O Date Input ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Date Input é o Text Input com máscara de data (dd/mm/aaaa) e o botão de calendário. A pessoa pode digitar a data ou abrir o Date Picker num Popover." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Datas em formulários (vencimento, início de vigência, data de nascimento).", "Quando digitar exige menos esforço que navegar no calendário, mas o calendário ajuda a conferir o dia da semana."] },
        { h3: "Não utilize para:" },
        { ul: ["Escolha de data que precisa de confirmação separada — use o Modal Date Picker.", "Mês e ano sem o dia — use campos próprios.", "Horários."] },
        { h2: "Casos de uso" },
        { h3: "Date Input vs Modal Date Picker" },
        { p: "O Date Input fica no formulário e aceita digitar. O calendário abre num Popover e a data vale na hora. O Modal Date Picker abre uma janela e espera o Confirmar para aplicar a data." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { value: "15/01/2026" }, markers: [{ n: 1, target: ".cds-tf__label", side: "top", align: "start" }, { n: 2, target: ".cds-tf__control", side: "left" }, { n: 3, target: ".cds-tf__action", side: "right" }, { n: 4, target: ".cds-tf__msg", side: "bottom", align: "start" }], legend: ["Label Content", "Text Box com máscara dd/mm/aaaa", "Calendar Button (abre o Date Picker)", "Supporting Message"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Single Calendar", values: ["Single Calendar", "Double Calendar"] },
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Warning"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled", "Hovered", "Pressed"] },
          { name: "Is Filled", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Show Label", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Required", type: "Boolean", default: "true" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Show Supporting Content", type: "Boolean", default: "true" },
          { name: "Supporting Message", type: "Text", default: "Supporting Message" },
          { name: "Error Message", type: "Text", default: "Error Message" },
          { name: "Show Character Counter", type: "Boolean", default: "true" },
          { name: "Character Counter Value", type: "Text", default: "-0000" },
          { name: "Show Caret", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Date Input da lib estável (o contador ligado com \"-0000\" vem do Figma, C57). No código: os atributos do Text Input (sem `lead-icon`), `kind`, `min`, `max`, `today`, `value` (dd/mm/aaaa) e `calendar-label` (\"Abrir calendário\"), além da propriedade `.date` (AAAA-MM-DD). Eventos `cds-change` e `cds-toggle`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Preenchido e Warning" },
        { specimens: { items: [
          { label: "Is Filled", attrs: { value: "15/01/2026" } }, { label: "Warning", attrs: { value: "31/02/2026", appearance: "warning", error: "Data inválida" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O campo tem o Label como nome e aceita digitar a data. A máscara põe as barras.",
          "O botão de calendário é um Icon Button com nome (`calendar-label`, \"Abrir calendário\") e `aria-expanded`.",
          "O calendário no Popover segue o teclado do Date Picker. `Esc` fecha e devolve o foco ao campo.",
          "Erros aparecem em texto (Error Message), além da cor."
        ] },
        { note: "Contrastes iguais aos da família Text Fields (C141): placeholder e contorno do campo abaixo do mínimo." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Mostre o formato esperado (dd/mm/aaaa) no placeholder ou na mensagem de apoio.", "Valide a data ao sair do campo e explique o erro (\"Data inválida\", \"Escolha uma data a partir de hoje\").", "Para datas distantes (nascimento), deixe a pessoa digitar. O calendário é apoio."] },
        { h2: "Formato das datas" },
        { ul: ["Formato compacto: `01/12/2025` ou `12/25`"] },
        { note: "Regra literal de Conteúdo › Formatação de dados › Datas e horários." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: digite uma data ou abra o calendário." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion para abrir e fechar o calendário (CONFERIR C148)." } }
      ] }
    ]
  };
})();
