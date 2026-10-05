/* Documentação — CSAT Score
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (CSAT Score, 09d6a3 · status In progress) reaproveitado; props e padrões do set da lib
   estável (CSAT Score 10100:1192 — sem description); acessibilidade e contrastes do playground (C143). O zeroheight não tem a tab Style. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function q(text, comp){ return { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: [{ _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: text }] }, comp] }; }
  function csat(more){ return Object.assign({ _tag: "cds-csat-score", label: "Avaliação" }, more || {}); }

  CDS.docs["csat-score"] = {
    tag: "cds-csat-score",
    base: { label: "Avaliação" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/09d6a3-csat-score", sourceLabel: "Abrir o CSAT Score no zeroheight",
    cover: { description: "O CSAT Score é um componente de avaliação utilizado para medir o nível de satisfação da pessoa usuária em relação a uma experiência, funcionalidade ou interação específica, por meio de uma escala ordinal visual representada por ícones e rótulos textuais.", examples: [
      q("Como foi pedir os cartões pelo Portal?", csat({ value: "4", label: "Como foi pedir os cartões pelo Portal?" }))
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O CSAT Score é um componente de avaliação utilizado para medir o nível de satisfação da pessoa usuária em relação a uma experiência, funcionalidade ou interação específica, por meio de uma escala ordinal visual representada por ícones e rótulos textuais." },
        { h3: "Nomes alternativos comuns" },
        { p: "Customer Satisfaction Score, Avaliação de satisfação, Rating CSAT" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "A escala deve ser facilmente compreendida, com rótulos textuais que explicitem o significado de cada nível de avaliação."],
          ["Consistência", "A quantidade de pontos, ícones e estados visuais deve permanecer estável em todos os contextos de uso."],
          ["Simplicidade", "A interação deve exigir o mínimo de esforço cognitivo da pessoa usuária."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o CSAT Score quando for necessário coletar feedback rápido e quantitativo sobre satisfação após uma ação, fluxo ou experiência específica, como conclusão de tarefas, uso de funcionalidades ou atendimento." },
        { h3: "Utilize para:" },
        { ul: ["Medir satisfação imediata da pessoa usuária.", "Coletar feedback pontual em pesquisas rápidas.", "Comparar percepção de qualidade entre fluxos ou versões"] },
        { h3: "Não utilize para:" },
        { ul: ["Avaliações qualitativas profundas.", "Coleta de feedback aberto sem escala.", "Medir esforço ou lealdade (Utilize NPS Score)"] },
        { h2: "Casos de uso" },
        { h3: "CSAT Score vs NPS Score" },
        { p: "O CSAT Score mede satisfação em um ponto específico da jornada, enquanto o NPS avalia lealdade e probabilidade de recomendação em uma perspectiva mais ampla e estratégica." },
        { compare: [
          { title: "CSAT Score: satisfação com a experiência", attrs: csat({ value: "4" }) },
          { title: "NPS Score: recomendação (0 a 10)", attrs: { _tag: "cds-nps-score", value: "9" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { value: "3" }, markers: [{ n: 1, target: "cds-csat-item:nth-child(3) .cds-csi__item", side: "top" }, { n: 2, target: "cds-csat-item:nth-child(3) .cds-csi__label", side: "bottom" }, { n: 3, target: "cds-csat-item:last-child .cds-csi__item", side: "right" }], legend: ["Item ativo (rate-filled · Decorative/02)", "Label Content (rótulo do nível)", "Item inativo (rate-line · Surface/02)"] } },
        { p: "Cinco .CSAT Item: Muito ruim, Ruim, Médio, Bom e Muito bom. Com um valor escolhido, os itens até ele ficam ativos, como estrelas." },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled"] },
          { name: "Selected Value", type: "Variant", default: "None", values: ["None", "1", "2", "3", "4", "5"] }
        ] },
        { note: "Props e padrões lidos do set CSAT Score da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código: `value` (1–5 ou vazio), `disabled`, `label` (nome do grupo, padrão \"Avaliação\"), `labels` (os 5 rótulos, separados por vírgula) e `name`. Evento `cds-change { value }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Selected Value" },
        { specimens: { items: [
          { label: "None", attrs: {} }, { label: "1", attrs: { value: "1" } }, { label: "3", attrs: { value: "3" } }, { label: "5", attrs: { value: "5" } }
        ] } },
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: { value: "4" } }, { label: "Disabled", attrs: { value: "4", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um grupo de radios nativo (`radiogroup`) com nome (`label`): use a própria pergunta como nome.",
          "`Tab` entra no grupo; as setas trocam a nota.",
          "Cada opção é anunciada pelo rótulo e pela posição (ex.: \"Bom, 4 de 5\").",
          "Os rótulos visíveis (Muito ruim … Muito bom) dão o significado de cada nível; as estrelas são decorativas.",
          "Disabled tira o grupo da ordem de foco."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Rótulos (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Estrela ativa (Decorative/02) 2,68:1 e inativa (rate-line) 2,78:1 — abaixo de 3:1 para elementos gráficos (1.4.11). A diferença também está na forma (preenchida × contorno) e no rótulo, mas a estrela é o que mostra a nota (CONFERIR C143)."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o CSAT Score." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: q("Como foi pedir os cartões pelo Portal?", csat()), title: "Contextualização da pergunta", text: "Associe o CSAT Score a uma pergunta clara e objetiva, indicando exatamente qual experiência está sendo avaliada." },
          { attrs: csat({ value: "3" }), title: "Quantidade fixa de opções", text: "Mantenha sempre a mesma quantidade de níveis de avaliação para garantir comparabilidade dos dados." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: q("Como foi o atendimento pelo chat?", csat()), text: "Posicione o componente imediatamente após a experiência avaliada, utilizando um título claro e direto que explicite exatamente o que está sendo medido." },
          { kind: "dont", attrs: q("Como foi o atendimento pelo chat?", csat({ labels: "Péssimo,Fraco,Ok,Legal,Top" })), text: "Não altere as labels do CSAT entre diferentes contextos, pois isso compromete a consistência da escala e a comparabilidade dos resultados ao longo do tempo." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e escolha uma nota." },
        { specs: [
          { title: "Item: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Item: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do CSAT Score no zeroheight está com o texto modelo e a tabela vazia; a troca de Is Active (estrela preenchendo) não tem Motion Style. No código, o hover usa short/03 + systemic/accelerate (CONFERIR C143)." } }
      ] }
    ]
  };
})();
