/* Documentação — Selection List
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Selection List, 68e0a2) reaproveitado; props e padrões do set da lib estável
   (Selection List 5488:1552 — sem description); acessibilidade do playground (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var BEN = [["Vale-refeição", "Restaurantes e delivery", "meal-line"], ["Vale-alimentação", "Mercados e padarias", "food-assistance-line"], ["Mobilidade", "Transporte e combustível", "mobility-line"]];
  function list(kind, trailing, active, name){
    return { _tag: "cds-selection-list", kind: kind || "default", label: "Benefícios", _children: BEN.map(function(b, i){
      return { _tag: "cds-selection-list-item", label: b[0], description: b[1], "lead-icon": b[2], "trailing-item": trailing || "checkbox", name: name || null, "is-active": active.indexOf(i) > -1 ? true : null };
    }) };
  }

  CDS.docs["selection-list"] = {
    tag: "cds-selection-list",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/68e0a2-selection-list", sourceLabel: "Abrir o Selection List no zeroheight",
    cover: { description: "O Selection List é um agrupamento de opções organizadas em lista, permitindo que o usuário faça uma ou múltiplas seleções de forma clara e consistente. Ele é formado por instâncias do componente Selection List Item empilhados e separados por divisores visuais, facilitando a leitura e a comparação entre alternativas.", tall: true, examples: [ list("default", "checkbox", [0, 2]) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Selection List é um agrupamento de opções organizadas em lista, permitindo que o usuário faça uma ou múltiplas seleções de forma clara e consistente. Ele é formado por instâncias do componente Selection List Item empilhados e separados por divisores visuais, facilitando a leitura e a comparação entre alternativas." },
        { h3: "Nomes alternativos comuns" },
        { p: "Lista de seleção, Listbox, Option list, Selectable list." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza de intenção", "Cada item deve deixar explícito se a ação esperada é selecionar, navegar ou visualizar, evitando ambiguidades."],
          ["Consistência de comportamento", "Todos os itens da lista devem seguir o mesmo padrão de interação, mantendo previsibilidade para o usuário."],
          ["Foco na escolha", "O componente deve priorizar a seleção de opções, sem misturar elementos que desviem a atenção da decisão principal."]
        ] },
        { h2: "Quando usar" },
        { p: "O componente Selection List deve ser usado quando é necessário apresentar um conjunto de opções de forma clara e acessível, permitindo que o usuário selecione uma ou várias delas diretamente na lista. Ele é ideal para situações em que a visualização completa das escolhas disponíveis é importante, como em filtros, preferências, configurações ou seleções que exigem comparação entre itens." },
        { h3: "Utilize para:" },
        { ul: ["Quando o usuário precisa escolher um ou múltiplos itens em um conjunto limitado.", "Em fluxos de filtros, preferências ou configurações.", "Quando a clareza da lista completa é mais importante do que a economia de espaço."] },
        { h3: "Não utilize para:" },
        { ul: ["Para seleção de apenas uma opção simples em um espaço reduzido.", "Para escolhas binárias. Use Checkbox ou Switch.", "Quando há muitas opções extensas. Prefira mecanismos de busca, autocomplete ou combo box."] },
        { h2: "Casos de uso" },
        { h3: "Selection list vs Content list" },
        { p: "Embora visualmente semelhantes, o Content List e o Selection List têm propósitos distintos. O Content List é voltado para a exibição de informações, permitindo a navegação ou visualização de conteúdos sem necessariamente envolver escolha de itens. Já o Selection List é específico para cenários de decisão, em que o usuário deve selecionar uma ou várias opções dentro da lista. Enquanto o primeiro prioriza a apresentação de conteúdo, o segundo prioriza a interação e a seleção." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: list("default", "checkbox", [0]), markers: [{ n: 1, target: "cds-selection-list-item:first-child .cds-li__text", side: "right" }, { n: 2, target: "cds-selection-list-item:first-child .cds-li__divider", side: "left" }], legend: ["Selection list item", "Divider"] } },
        { h2: "Composição do componente" },
        { p: "O componente Selection List é formado pela composição de múltiplos Selection List Items, organizados de maneira empilhada para criar a lista. Cada item é separado por dividers, garantindo a legibilidade e a distinção visual entre as opções." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Card"] }
        ] },
        { note: "O set Selection List da lib estável tem só Kind; o zeroheight também lista Trailing Item (Checkbox, Radio Button, Switch, Tag, None), que é prop dos itens (CONFERIR C139). No código: filhos `<cds-selection-list-item>` (a lista repassa `kind`), `label` (nome do grupo) e, na amostra sem filhos, `count` e `trailing-item`. Evento `cds-change { values }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Default", attrs: list("default", "checkbox", [0]) }, { label: "Card", attrs: list("card", "checkbox", [0]) }
        ] } },
        { h2: "Trailing Item" },
        { specimens: { items: [
          { label: "Checkbox (múltipla)", attrs: list("default", "checkbox", [0, 2]) },
          { label: "Radio Button (única)", attrs: list("default", "radio-button", [1], "doc-sl-radio") },
          { label: "Switch", attrs: list("default", "switch", [0]) },
          { label: "None", attrs: list("default", "none", [0]) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "A lista é um grupo (`role=\"group\"`) com nome (`label`): o leitor de tela anuncia a pergunta antes das opções.",
          "Cada item é um controle nativo (Checkbox, Radio Button ou Switch) nomeado pela linha; `Tab` percorre os itens (no Radio, as setas trocam a opção).",
          "A seleção não depende só da cor: o controle muda de estado."
        ] },
        { note: "Contrastes: ver o Selection List Item." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: list("default", "checkbox", [0, 2]), text: "Mantenha consistência no tipo de seleção dentro da lista, utilizando apenas um mesmo padrão (ex.: somente checkboxes)." },
          { kind: "dont", attrs: { _tag: "cds-selection-list", label: "Benefícios", _children: [{ _tag: "cds-selection-list-item", label: "Vale-refeição", description: "Restaurantes e delivery", "lead-icon": "meal-line", "is-active": true }, { _tag: "cds-selection-list-item", label: "Mobilidade", description: "Transporte e combustível", "lead-icon": "mobility-line", "trailing-item": "switch" }] }, text: "Não misturare diferentes tipos de seletores (como checkbox e switch) dentro da mesma lista." },
          { kind: "do", attrs: list("default", "checkbox", [0]), text: "Mantenha títulos curtos e claros, acompanhados de descrições objetivas. Isso ajuda o usuário a entender rapidamente o que está selecionando." },
          { kind: "dont", attrs: { _tag: "cds-selection-list", label: "Benefícios", _children: [{ _tag: "cds-selection-list-item", label: "Vale-refeição para usar em restaurantes", description: "Pode ser usado em restaurantes, lanchonetes, padarias e aplicativos de delivery em todo o Brasil, sem limite de valor por compra", "lead-icon": "meal-line" }] }, text: "Evite títulos longos ou descrições excessivas que dificultem a leitura. Informações em excesso tornam a lista cansativa e confusa." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições são as do Selection List Item (estados de interação de cada linha)." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Selection List no zeroheight está com o texto modelo e a tabela vazia (CONFERIR C139)." } }
      ] }
    ]
  };
})();
