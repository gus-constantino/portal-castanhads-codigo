/* Documentação — Content List
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Content List, 90843a) reaproveitado; props e padrões do set da lib estável
   (Content List 5488:1482 — sem description); acessibilidade do playground (C139). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var NAV = [["Cartões", "Físico e virtual", "cards-line"], ["Colaboradores", "Cadastro e acessos", "user-money-line"], ["Configurações", "Empresa e preferências", "settings-line"]];
  function navList(kind){ return { _tag: "cds-content-list", kind: kind || "default", intent: "navigation", label: "Atalhos", _children: NAV.map(function(n){ return { _tag: "cds-content-list-item", label: n[0], description: n[1], "lead-icon": n[2], href: "#", "show-tag": false }; }) }; }
  function defList(){ return { _tag: "cds-content-list", intent: "default", label: "Dados", _children: [["Razão social", "Caju Benefícios Ltda.", "business-line"], ["CNPJ", "12.345.678/0001-90", "id-card-line"], ["E-mail", "rh@empresa.com.br", "sms-message-line"]].map(function(n){ return { _tag: "cds-content-list-item", label: n[0], description: n[1], "lead-icon": n[2] }; }) }; }
  function txList(){ return { _tag: "cds-content-list", intent: "switch", label: "Transações", _children: [["Restaurante Bom Prato", "Hoje, 12:40", "42,90", "meal-line"], ["Posto Avenida", "Ontem, 18:05", "150,00", "mobility-line"]].map(function(n){ return { _tag: "cds-content-list-item", label: n[0], description: n[1], value: n[2], "value-description": "Débito", "shaped-icon": n[3], href: "#" }; }) }; }

  CDS.docs["content-list"] = {
    tag: "cds-content-list",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/90843a-content-list", sourceLabel: "Abrir o Content List no zeroheight",
    cover: { description: "O Content List é um componente que agrupa e organiza múltiplos Content List Items em uma estrutura única e consistente. Ele funciona como um container, permitindo que diferentes tipos de conteúdo sejam exibidos de forma clara e hierárquica. Pode conter itens informativos, de navegação ou de transações financeiras, adaptando-se a diferentes contextos de uso.", tall: true, examples: [ navList() ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Content List é um componente que agrupa e organiza múltiplos Content List Items em uma estrutura única e consistente. Ele funciona como um container, permitindo que diferentes tipos de conteúdo sejam exibidos de forma clara e hierárquica. Pode conter itens informativos, de navegação ou de transações financeiras, adaptando-se a diferentes contextos de uso." },
        { h3: "Nomes alternativos comuns" },
        { p: "Lista de navegação, Lista de conteúdo, Content list view, Lista navegável." },
        { h3: "Princípios" },
        { cards: [
          ["Organização da informação", "Estruture os itens de forma clara e hierárquica, facilitando a leitura e compreensão dos conteúdos apresentados."],
          ["Consistência visual e funcional", "Mantenha o mesmo padrão de layout, espaçamento e comportamento entre os itens para garantir uma experiência uniforme."],
          ["Clareza de propósito", "Cada lista deve ter um objetivo bem definido — seja exibir informações, navegar ou mostrar transações — evitando misturar diferentes tipos de conteúdo."]
        ] },
        { h2: "Quando usar" },
        { p: "O Content List deve ser utilizado sempre que houver necessidade de organizar conteúdos relacionados em sequência, garantindo que o usuário consiga navegar, consultar ou identificar informações de forma direta e clara. Ele é ideal para estruturar telas em que diferentes tipos de informações precisam ser listadas em conjunto." },
        { h3: "Utilize para:" },
        { ul: ["Agrupar informações relacionadas em um mesmo contexto.", "Exibir navegação para páginas ou seções diferentes do app. (Variante Navigation)", "Organizar dados em blocos de consulta e edição.", "Listar conteúdos que compartilham uma mesma hierarquia ou categoria."] },
        { h3: "Não utilize para:" },
        { ul: ["Seleção de opções ou escolhas (para isso use o Selection List).", "Exibição de dados tabulares que exigem comparações complexas (use Table).", "Conteúdos isolados que não precisam de agrupamento em lista. (Use Content List Item)"] },
        { h2: "Casos de uso" },
        { h3: "Content List vs Selection List" },
        { p: "Enquanto o Content List organiza conteúdos ou navegação, o Selection List serve exclusivamente para escolhas do usuário (única ou múltipla). O Content List não deve ser usado como componente de decisão." },
        { h3: "Content List vs Table" },
        { p: "O Content List é indicado para informações curtas, contextuais e navegáveis. Já a Table é ideal para exibir grandes volumes de dados estruturados, com necessidade de ordenação e comparação entre colunas." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: navList(), markers: [{ n: 1, target: "cds-content-list-item:first-child .cds-li__text", side: "right" }, { n: 2, target: "cds-content-list-item:first-child .cds-li__divider", side: "left" }], legend: ["Content List Item", "Divider (exclusivo do Kind Default)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Card"] },
          { name: "Intent", type: "Variant", default: "Default", values: ["Default", "Switch", "Navigation"] }
        ] },
        { note: "Props e padrões lidos do set Content List da lib estável. A lista repassa Kind e Intent aos itens: Default → itens Default (sem Trailing Item), Navigation → Navigation, Switch → Transaction (como no Figma, C54). No código: filhos `<cds-content-list-item>`, `kind`, `intent` e `label` (nome da lista)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Intent" },
        { specimens: { items: [
          { label: "Default", attrs: defList() }, { label: "Navigation", attrs: navList() }, { label: "Switch (itens Transaction)", attrs: txList() }
        ] } },
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Default", attrs: navList("default") }, { label: "Card", attrs: navList("card") }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "A lista tem nome (`label`) e é anunciada como lista, com o número de itens.",
          "Cada item navegável é um link: `Tab` percorre os itens e `Enter` abre.",
          "Não misture itens de decisão (seleção) numa lista de navegação: o comportamento de teclado e de leitura muda de um item para o outro."
        ] },
        { note: "Contrastes: consulte o Content List Item." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: navList(), title: "Ordenação", text: "Use a ordem dos itens para refletir prioridade ou relevância do conteúdo." },
          { attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-content-list-item", label: "Compras online", description: "Usar o cartão virtual", "lead-icon": "cards-line", "trailing-item": "switch", status: "selected" }, { _tag: "cds-content-list-item", intent: "navigation", label: "Limites", description: "Diário e por compra", "lead-icon": "chart-bar-line", href: "#", "show-tag": false }] }, title: "Variantes", text: "É permitido mesclar diferentes variantes de content list items (como itens de navegação ou ações diretas com toggle) dentro da mesma lista, desde que se observe alguns pontos:" }
        ] },
        { ul: ["Itens diferentes devem estar organizados de forma que o usuário entenda com clareza a função de cada um.", "O usuário deve entender de imediato se o item ativa uma ação direta (ex.: switch) ou se leva para outra tela."] },
        { p: "Atenção: Quando a lista envolve seleção de opções (como em formulários ou preferências), evite misturar tipos de itens. Isso pode gerar dúvidas e comprometer a clareza da decisão do usuário." },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: defList(), text: "Use a variante Default para exibir conteúdos simples de forma clara e organizada." },
          { kind: "dont", attrs: { _tag: "cds-content-list", label: "Transações", _children: [{ _tag: "cds-content-list-item", label: "Restaurante Bom Prato", description: "R$ 42,90 · Hoje, 12:40", "lead-icon": "meal-line" }, { _tag: "cds-content-list-item", label: "Posto Avenida", description: "R$ 150,00 · Ontem, 18:05", "lead-icon": "mobility-line" }] }, text: "Não use a variante Default para casos em que seja necessária navegação ou exibição de valores financeiros. Nestes casos, utilize a variante transaction." },
          { kind: "do", attrs: navList(), text: "Use o Content List para organizar informações quando o objetivo for exibir conteúdo ou permitir ações diretas de configuração." },
          { kind: "dont", attrs: { _tag: "div", class: "pg-doc-list-stack", _children: [{ _tag: "cds-content-list-item", label: "Vale-refeição", description: "Restaurantes e delivery", "lead-icon": "meal-line", "trailing-item": "checkbox" }, { _tag: "cds-content-list-item", intent: "navigation", label: "Configurações", description: "Empresa e preferências", "lead-icon": "settings-line", href: "#", "show-tag": false }, { _tag: "cds-content-list-item", intent: "transaction", label: "Posto Avenida", description: "Ontem, 18:05", value: "150,00", "value-description": "Débito", "shaped-icon": "mobility-line", href: "#" }] }, text: "Não utilize o Content List para misturar diferentes padrões de interação em um mesmo fluxo de decisão, como seleção (checkbox), navegação (link para outra tela) e exibição de transações financeiras." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições são as do Content List Item (estados de interação de cada linha)." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Content List no zeroheight está com o texto modelo e a tabela vazia (CONFERIR C139)." } }
      ] }
    ]
  };
})();
