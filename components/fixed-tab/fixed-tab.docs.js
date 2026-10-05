/* Documentação — Fixed Tab (e Scrollable Tab, que lê esta doc)
   Fontes (PLANO-DOCS §5, 05/10): [Documentation] Tabs (5168:132, arquivo Component use documentation — o zeroheight não tem página de Tabs);
   props da lib estável. Tab Conteúdo (regras de texto) abaixo:
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Tabs (6400:15174).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  // Abas de exemplo (Scrollable Tab do DS) com os rótulos do Figma
  function fixed(labels){ return { _tag: "cds-fixed-tab", label: "Exemplo de abas", _children: labels.map(function(l){ return { _tag: "cds-tab-item", label: l }; }) }; }
  function tabs(labels){ return { _tag: "cds-scrollable-tab", label: "Exemplo de abas", _children: labels.map(function(l){ return { _tag: "cds-tab-item", label: l }; }) }; }
  CDS.docs["fixed-tab"] = {
    tag: "cds-fixed-tab",
    base: {},
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=5168-132", sourceLabel: "Abrir [Documentation] Tabs no Figma",
    cover: { description: "O Tabs organiza conteúdos relacionados em seções paralelas dentro da mesma página, permitindo que a pessoa usuária alterne rapidamente entre contextos sem navegação externa.", wide: true, examples: [ fixed(["Resumo", "Detalhes", "Histórico"]) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Tabs organiza conteúdos relacionados em seções paralelas dentro da mesma página, permitindo que a pessoa usuária alterne rapidamente entre contextos sem navegação externa." },
        { h3: "Nomes alternativos comuns" },
        { p: "Tab bar, Tab navigation, Segmented navigation" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "Cada aba representa uma categoria ou visão distinta do mesmo conjunto de dados, deixando explícito qual conteúdo está ativo no momento."],
          ["Economia de navegação", "Evita redirecionamentos desnecessários ao manter conteúdos relacionados no mesmo espaço, reduzindo fricção e tempo de tarefa."],
          ["Hierarquia", "As abas devem refletir divisões equivalentes no nível hierárquico, sem misturar navegação global com seções locais."]
        ] },
        { h2: "Quando usar" },
        { p: "Use Tabs quando houver conteúdos relacionados e de mesmo nível hierárquico que precisam ocupar o mesmo espaço de interface, permitindo alternância rápida sem recarregar a página ou perder o contexto da pessoa usuária." },
        { h3: "Utilize para:" },
        { ul: ["Alternar entre visões de um mesmo objeto, como Resumo, Detalhes, Histórico.", "Organizar categorias paralelas de conteúdo", "Separar estados ou filtros principais de um mesmo dataset"] },
        { h3: "Não utilize para:" },
        { ul: ["Navegação principal do produto", "Etapas sequenciais de fluxo", "Conteúdos sem relação direta", "Listas muito longas de categorias"] },
        { h2: "Como o Tabs funciona" },
        { p: "O componente Tabs funciona como um padrão de organização estrutural de conteúdo. Cada aba representa uma seção completa e independente, com escopo próprio." },
        { p: "Ao alternar entre abas, a pessoa usuária está mudando de contexto de conteúdo, e não refinando um mesmo conjunto de dados." },
        { p: "O componente Tabs não é um mecanismo de filtro e não deve ser utilizado dessa forma." },
        { h2: "Fixed Tab vs Scrollable Tab" },
        { p: "As duas usam o mesmo .Item. Na Fixed Tab, as abas dividem a largura igualmente (até 3 abas); na Scrollable Tab, cada aba tem a largura do conteúdo e a lista rola na horizontal (até 6 abas)." },
        { compare: [
          { title: "Fixed Tab", attrs: fixed(["Resumo", "Detalhes", "Histórico"]) },
          { title: "Scrollable Tab", attrs: tabs(["Resumo", "Detalhes", "Histórico", "Documentos", "Pagamentos"]) }
        ] },
        { note: "Fonte: arquivo Component use documentation, página Tabs, seção [Documentation] Tabs (5168:132). O zeroheight ainda não tem página de Tabs." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "cds-fixed-tab", label: "Abas", _children: [{ _tag: "cds-tab-item", label: "Resumo", "show-lead-item": "true", icon: "chart-bar-line" }, { _tag: "cds-tab-item", label: "Detalhes" }, { _tag: "cds-tab-item", label: "Histórico" }] }, markers: [{ n: 1, target: ".cds-tab__icon, cds-tab-item .cds-icon", side: "top", align: "start" }, { n: 2, target: ".cds-tab__label", side: "left" }, { n: 3, target: "cds-tab-item:nth-child(2) .cds-tab", side: "bottom" }, { n: 4, target: "cds-tab-item:nth-child(3)", side: "right" }], legend: ["Lead icon (Show Lead Item)", "Tab label", "Tab divider (sublinhado do item)", "Tab item"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Active Item (Fixed Tab)", type: "Variant", default: "1", values: ["1", "2", "3"] },
          { name: "Active Item (Scrollable Tab)", type: "Variant", default: "1", values: ["1", "2", "3", "4", "5", "6"] }
        ] },
        { h3: ".Item" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Is Active", type: "Variant", default: "False", values: ["True", "False"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Lead Item", type: "Boolean", default: "false" },
          { name: "Choose Icon", type: "Instance swap", default: "placeholder" },
          { name: "Show Badge", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos dos sets Fixed Tab (6500:6958), Scrollable Tab (6646:181) e .Item (6498:375) da lib estável. No código: filhos `<cds-tab-item label>`, `active-item` (1-based) e `label` (nome da lista). O .Item tem `Show Badge` na lib, ainda sem o Badge no código (CONFERIR C138)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados do .Item" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Enabled", attrs: { _tag: "cds-tab-item", label: "Label" } },
          { label: "Hovered", attrs: { _tag: "cds-tab-item", label: "Label", state: "hovered" } },
          { label: "Pressed", attrs: { _tag: "cds-tab-item", label: "Label", state: "pressed" } },
          { label: "Disabled", attrs: { _tag: "cds-tab-item", label: "Label", disabled: true } },
          { label: "Is Active", attrs: { _tag: "cds-tab-item", label: "Label", "is-active": true } },
          { label: "Com Lead Item", attrs: { _tag: "cds-tab-item", label: "Label", "show-lead-item": "true", icon: "chart-bar-line" } }
        ] } },
        { h2: "Fixed Tab" },
        { display: { attrs: fixed(["Resumo", "Detalhes", "Histórico"]) } },
        { h2: "Scrollable Tab" },
        { display: { attrs: tabs(["Resumo", "Detalhes", "Histórico", "Documentos", "Pagamentos", "Configurações"]) } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado" },
        { table: { head: ["Tecla", "Ação"], rows: [["`Tab`", "Entra na lista (na aba ativa) e sai para o painel"], ["`←` `→`", "Move e ativa a aba anterior ou a próxima"], ["`Home` `End`", "Vai para a primeira ou a última aba"]] } },
        { h2: "Leitor de tela" },
        { ul: [
          "Segue o padrão tablist do WAI-ARIA: a lista tem `role=\"tablist\"` com nome (`label`); cada .Item é um `<button role=\"tab\">` com `aria-selected`.",
          "Ligue cada aba ao seu painel com `controls` (id do painel, `role=\"tabpanel\"`).",
          "A aba ativa não depende só do sublinhado: o peso do texto também muda (Label/Medium).",
          "Na Scrollable Tab, a aba ativa rola para a vista."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label da aba ativa (Text/intense) 16,96:1 · inativa (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Sublinhado da aba ativa (Accent/Solid/medium) 4,54:1 — acima de 3:1 (1.4.11)."] },
        { note: "Contrastes medidos no tema light do playground. A seção Acessibilidade do [Documentation] Tabs ainda está com texto de exemplo." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: fixed(["Resumo", "Detalhes", "Histórico"]), title: "Limite de abas", text: "Use entre 2 e 5 abas sempre que possível. Muitas opções dificultam leitura e decisão, especialmente em mobile." },
          { attrs: fixed(["Pedidos", "Cartões"]), title: "Rótulos curtos e claros", text: "Use labels diretas, sem frases longas ou termos vagos. A pessoa usuária deve entender o conteúdo da aba sem precisar clicar." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: fixed(["Pedidos", "Cartões", "Relatórios"]), text: "Utilize labels diretos e curtos que informem o conteúdo sem que a pessoa usuária tenha necessidade de clicar." },
          { kind: "dont", attrs: fixed(["Ativos", "Inativos", "Todos"]), text: "Não utilize as Tabs como filtros. Caso precise adicionar um mecanismo de filtragem, reveja a experiência e opte por outro componente." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: fixed(["Resumo", "Detalhes", "Histórico"]), live: true } },
        { note: "Exemplo interativo: passe o mouse e troque de aba." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do [Documentation] Tabs ainda está com texto de exemplo e \"Especificação\" na tabela (Enabled, Hovered, Pressed, Loading). No código, o sublinhado usa medium/02 + systemic/accelerate, sem Motion Style correspondente (CONFERIR C138)." } }
      ] },

      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "As tabs funcionam como placas de sinalização da interface. A pessoa usuária deve saber exatamente o que vai encontrar antes mesmo de clicar." },
        { h3: "Como nomear tabs" },
        { p: "Use verbos no infinitivo ou substantivos — escolha o que melhor representa o conteúdo da aba." },
        { ul: ["Quando o foco é uma ação, use infinitivo: `Gerenciar cartões`", "Quando o foco é uma área, use substantivos: `Histórico de pedidos`"] },
        { h3: "Regras de escrita" },
        { ul: ["Primeira letra maiúscula, demais em minúsculo", "Sem ponto final ou qualquer outra pontuação", "Sem quebra de linha, o copy deve caber em uma linha", "Sem estrangeirismos se houver equivalente em português. Exemplo: use Painel e não Dashboard"] },
        { h3: "Boas práticas" },
        { ul: [
          "Evite termos genéricos que não dizem nada: \"Visão geral\", \"Outros\". A tab deve responder o que a pessoa vai encontrar ou o que é possível fazer ali.",
          "A ordem das tabs (da esquerda para a direita) deve refletir a importância da tarefa ou a frequência de uso na jornada.",
          "Use entre 2 e 5 tabs. Muitas opções dificultam a leitura e a decisão, especialmente em mobile."
        ] },
        { h3: "Como pedir ajuda ao Borô" },
        { p: "Ao solicitar novos nomes ou revisão de tabs, sempre forneça o contexto da arquitetura e uma descrição funcional da área." },
        { code: "A tab está localizada em [caminho da navegação]. Nesta área é possível: ]liste ações e visualizações disponíveis]." },
        { p: "Exemplo: A tab está localizada no Portal para empresas em Despesas → Adiantamentos. Nesta área a pessoa encontra o saldo disponível de cada colaborador e o número de adiantamentos. Também é possível adicionar ou resgatar saldo individualmente. Não é possível criar novos adiantamentos ou adicionar colaboradores." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", text: "Utilize labels diretos e curtos que informem o conteúdo sem que a pessoa usuária tenha necessidade de clicar." },
          { kind: "dont", text: "Não utilize as Tabs como filtros. Caso precise adicionar um mecanismo de filtragem, reveja a experiência e opte por outro componente." },
          { kind: "do", attrs: tabs(["Painel de premiações", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "O usuário deve conseguir prever o conteúdo antes de clicar." },
          { kind: "dont", attrs: tabs(["Dashboard", "Pedidos por colaborador", "Pedidos por identificador", "Extrato de colaboradores", "Saldo dos colaboradores"]), text: "Termos genéricos e estrangeiros." }
        ] },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Tabs. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
