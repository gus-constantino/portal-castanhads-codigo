/* Documentação — Search Input (rascunho)
   Sem página no zeroheight, sem seção [Documentation] na página Text fields e sem description no set (05/10). Texto escrito a partir do
   set da lib estável (Search Input 14880:3404) e do playground; segue a família Text Fields. Revisar com o time (C141). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function si(more){ return Object.assign({ _tag: "cds-search-input", label: "Buscar colaborador", placeholder: "Nome ou CPF", "show-required": false, "show-supporting-content": false, "show-character-counter": false }, more || {}); }

  CDS.docs["search-input"] = {
    tag: "cds-search-input",
    base: { label: "Buscar colaborador", placeholder: "Nome ou CPF", "show-required": false, "show-supporting-content": false, "show-character-counter": false },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14880-3404", sourceLabel: "Abrir o Search Input no Figma",
    cover: { description: "Campo de busca da família Text Fields: lupa fixa e botão de limpar quando há texto.", examples: [ si({ value: "Ana" }) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Search Input é o campo de busca da família Text Fields. Tem a mesma anatomia do Text Input, com o ícone de lupa fixo à esquerda e, quando há texto, o botão de limpar à direita." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Buscar itens numa lista, tabela ou catálogo.", "Filtrar resultados enquanto a pessoa digita.", "Encontrar uma opção em conjuntos grandes, quando um Select não basta."] },
        { h3: "Não utilize para:" },
        { ul: ["Escolher entre poucas opções conhecidas — use um Select Input.", "Entrada de dados de formulário — use o Text Input.", "Navegação principal do produto."] },
        { h2: "Casos de uso" },
        { h3: "Search Input vs Async Select Input" },
        { p: "O Search Input filtra um conteúdo que está na tela (lista, tabela). O Async Select Input também busca, mas para escolher um valor que vai preencher o campo." },
        { compare: [
          { title: "Search Input: filtra a tela", attrs: si() },
          { title: "Async Select Input: escolhe um valor", attrs: { _tag: "cds-async-select-input", label: "Colaborador", placeholder: "Selecione", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { value: "Ana", "show-supporting-content": true, supporting: "Busque por nome ou CPF" }, markers: [{ n: 1, target: ".cds-tf__label", side: "top", align: "start" }, { n: 2, target: ".cds-tf__box .cds-icon, .cds-tf__box cds-icon", side: "left" }, { n: 3, target: ".cds-tf__control", side: "bottom" }, { n: 4, target: ".cds-tf__action, cds-icon-button", side: "right" }, { n: 5, target: ".cds-tf__msg", side: "bottom", align: "start" }], legend: ["Label Content", "Lead Icon (search-line, fixo)", "Text Box com o texto buscado", "Clear Button (aparece com texto)", "Supporting Message"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Warning"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled", "Hovered", "Pressed"] },
          { name: "Is Filled", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Show Label", type: "Boolean", default: "true" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Required", type: "Boolean", default: "true" },
          { name: "Required Text", type: "Text", default: "(Obrigatório)" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Show Supporting Content", type: "Boolean", default: "true" },
          { name: "Supporting Message", type: "Text", default: "Supporting Message" },
          { name: "Error Message", type: "Text", default: "Error Message" },
          { name: "Show Character Counter", type: "Boolean", default: "true" },
          { name: "Character Counter Value", type: "Text", default: "-0000" },
          { name: "Show Caret", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Search Input da lib estável (sem Show Lead Icon: a lupa é fixa). No código: os atributos do Text Input, sem `lead-icon`, e `clear-label` (nome do botão de limpar, padrão \"Limpar busca\"). Eventos `cds-change`, `cds-clear` e `cds-search` (Enter)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Preenchido e Warning" },
        { specimens: { items: [
          { label: "Is Filled", attrs: { value: "Ana" } },
          { label: "Warning", attrs: { value: "123", appearance: "warning", "show-supporting-content": true, error: "Digite ao menos 3 letras" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O campo é um `<input type=\"search\">` com o Label como nome; `Enter` dispara a busca (`cds-search`).",
          "O botão de limpar é um Icon Button com nome (\"Limpar busca\"); depois de limpar, o foco volta ao campo.",
          "A lupa é decorativa.",
          "Ao filtrar resultados, anuncie a quantidade encontrada (ex.: \"12 resultados\") numa região viva da tela."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e texto 16,96:1 · mensagem de apoio 8,24:1 — AA.", "Placeholder 2,78:1 e contorno do campo 1,25:1 — abaixo do mínimo (mesmo caso da família Text Fields, CONFERIR C141)."] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Diga no placeholder o que pode ser buscado (\"Nome ou CPF\"), sem substituir o Label.", "Posicione o campo junto ao conteúdo que ele filtra, acima da lista ou da tabela.", "Quando não houver resultado, explique e ofereça \"Limpar busca\" (ver Empty state em Feedback Pages)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { note: "Mapeamento pelo padrão da família Text Fields; sem especificação própria (CONFERIR C141)." }
      ] }
    ]
  };
})();
