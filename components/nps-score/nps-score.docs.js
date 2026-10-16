/* Documentação — NPS Score
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (NPS Score, 1362d2) reaproveitado; props e padrões do set da lib estável
   (NPS Score 10100:848 — sem description); acessibilidade e contrastes do playground (C143). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function q(text, comp){ return { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: [{ _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: text }] }, comp] }; }
  function nps(more){ return Object.assign({ _tag: "cds-nps-score" }, more || {}); }
  var QUESTION = "De 0 a 10, quanto você recomendaria a Caju para um colega?";

  CDS.docs["nps-score"] = {
    tag: "cds-nps-score",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/1362d2-nps-score", sourceLabel: "Abrir o NPS Score no zeroheight",
    cover: { description: "O NPS Score é um componente de seleção única utilizado para capturar a percepção da pessoa usuária em relação a uma experiência, produto ou serviço, geralmente em uma escala numérica de 0 a 10.", examples: [
      q(QUESTION, nps({ value: "9", label: QUESTION }))
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O NPS Score é um componente de seleção única utilizado para capturar a percepção da pessoa usuária em relação a uma experiência, produto ou serviço, geralmente em uma escala numérica de 0 a 10." },
        { h3: "Nomes alternativos comuns" },
        { p: "Escala de satisfação, Rating numérico, NPS selector" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza de escolha", "A escala deve ser apresentada de forma linear e compreensível, permitindo que a pessoa usuária identifique de imediato o intervalo de resposta e tome uma decisão sem ambiguidade."],
          ["Agilidade de interação", "O componente deve possibilitar uma seleção ágil, reduzindo esforço cognitivo e encurtando o tempo de resposta em fluxos de pesquisa."],
          ["Feedback imediato", "Ao selecionar um valor, o estado ativo deve ser claramente indicado, garantindo que a pessoa usuária entenda sua escolha antes de prosseguir."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o NPS Score quando for necessário medir a satisfação ou lealdade da pessoa usuária por meio de uma escala numérica direta, especialmente em pesquisas curtas ou momentos de feedback pontual ao longo da jornada." },
        { h3: "Utilize para:" },
        { ul: ["Coletar satisfação geral de um produto ou serviço", "Medir probabilidade de recomendação (NPS)", "Avaliar experiências específicas dentro de um fluxo"] },
        { h3: "Não utilize para:" },
        { ul: ["Coletas qualitativas ou abertas", "Seleções com múltiplas opções", "Cenários que exigem explicação detalhada da escolha"] },
        { h2: "Casos de uso" },
        { h3: "NPS Score vs CSAT Score" },
        { p: "O NPS Score mede lealdade e intenção de recomendação em uma escala de 0 a 10, com visão mais estratégica. Já o CSAT Score mede satisfação imediata sobre uma experiência específica, usando escalas mais curtas. Enquanto o NPS foca no longo prazo, o CSAT é mais sensível a percepções pontuais." },
        { compare: [
          { title: "NPS Score: recomendação (0 a 10)", attrs: nps({ value: "9" }) },
          { title: "CSAT Score: satisfação com a experiência", attrs: { _tag: "cds-csat-score", value: "4" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { value: "8" }, markers: [{ n: 1, target: "cds-nps-value-item:first-child", side: "left" }, { n: 2, target: "cds-nps-value-item:nth-child(9)", side: "bottom" }], legend: ["NPS Value", "NPS Selected Value"] } },
        { p: "Onze .Value Item (0 a 10) em linha. O valor escolhido é o único que fica Selected." },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled"] },
          { name: "Selected Value", type: "Variant", default: "None", values: ["None", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] }
        ] },
        { note: "Props e padrões lidos do set NPS Score da lib estável. O zeroheight lista \"Select value\" de 1 a 10. Na lib é Selected Value, com None e 0 (CONFERIR C143). No código: `value` (0–10 ou vazio), `disabled`, `label` (nome do grupo, padrão \"Nota de 0 a 10\") e `name`. Evento `cds-change { value }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Enabled · valor 9", attrs: { value: "9" } }, { label: "Disabled", attrs: { value: "9", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um grupo de radios nativo (`radiogroup`) com nome (`label`): use a própria pergunta como nome.",
          "`Tab` entra no grupo e as setas trocam o valor.",
          "Cada opção é anunciada como \"n de 10\".",
          "O valor escolhido não depende exclusivamente da cor: a pílula muda de fundo e de texto.",
          "Explique os extremos em texto perto da escala (ex.: \"0 = nada provável, 10 = muito provável\")."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Valor não selecionado: número (Text/medium) 7,42:1 sobre a pílula (Surface/01) — AA e AAA.", "Valor selecionado: número (Text/inversed) 4,54:1 sobre Surface/accent — AA.", "A pílula não selecionada tem 1,11:1 sobre Surface/default. O que identifica cada opção é o número."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o NPS Score." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: q(QUESTION, nps()), title: "Associe a uma pergunta clara", text: "Sempre utilize o componente acompanhado de uma pergunta objetiva, garantindo que a pessoa usuária compreenda exatamente o que está sendo avaliado." },
          { attrs: nps({ value: "7" }), title: "Evite sobrecarga visual", text: "Mantenha o componente isolado de outros elementos interativos próximos para não competir por atenção e preservar a clareza da escolha." }
        ] },
        { note: "O zeroheight ainda não tem Do's and Don'ts para o NPS Score." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e escolha um valor." },
        { specs: [
          { title: "Valor: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Valor: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do NPS Score no zeroheight está com o texto modelo e a tabela vazia. A troca para Selected não tem Motion Style. No código, short/03 + systemic/accelerate (CONFERIR C143)." } }
      ] }
    ]
  };
})();
