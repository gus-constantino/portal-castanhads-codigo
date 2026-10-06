/* Documentação — Table
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Table, 025123 · In progress; Table Columns, 795cef) reaproveitado; props e padrões dos sets da
   lib estável (Table 13472:5725, .Head 13382:1327, .Data Cell 13404:1015, .Toolbar 13438:14337 — sem description); acessibilidade e contrastes do
   playground (C147). Os exemplos usam a amostra do Figma (os dados reais entram por .columns/.rows em JS). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function tb(more){ return Object.assign({ _tag: "cds-table", "per-page": "5", label: "Colaboradores" }, more || {}); }

  CDS.docs["table"] = {
    tag: "cds-table",
    base: { "per-page": "5", label: "Colaboradores" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/025123-table", sourceLabel: "Abrir a Table no zeroheight",
    cover: { description: "O componente de Tabela organiza dados estruturados em colunas e linhas, facilitando a leitura, comparação e análise. É ideal para exibir informações com formato uniforme, como listas, transações ou relatórios.", wide: true, examples: [ { "per-page": "3", "show-pagination": false } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O componente de Tabela organiza dados estruturados em colunas e linhas, facilitando a leitura, comparação e análise. É ideal para exibir informações com formato uniforme, como listas, transações ou relatórios." },
        { h3: "Nomes alternativos comuns" },
        { p: "Data table, Table grid, Data grid." },
        { h2: "Quando usar" },
        { p: "Use o componente de Table para exibir dados estruturados que compartilham o mesmo formato, como listas de usuários ou registros. Tables funcionam bem com grandes volumes de dados, oferecendo clareza e eficiência na leitura." },
        { h3: "Utilize para:" },
        { ul: ["Quando há grandes volumes de dados que precisam ser exibidos de forma estruturada.", "Para permitir a comparação direta entre múltiplos itens.", "Quando os dados possuem campos recorrentes e bem definidos (ex: nome, situação, valor).", "Se houver necessidade de ordenar, filtrar ou buscar informações com agilidade."] },
        { h3: "Não utilize para:" },
        { ul: ["Se a informação pode ser apresentada de forma mais direta, como listas curtas ou resumos.", "Quando há poucos dados (1 ou 2 linhas), que podem ser apresentados diretamente em um card ou outro componente.", "Em interfaces mobile, onde a leitura tabular compromete a usabilidade — nesse caso, considere uma exibição adaptada.", "Para conteúdos altamente visuais ou não estruturados."] },
        { h2: "Casos de uso" },
        { h3: "Table vs Card" },
        { p: "A Table é ideal para comparar grandes volumes de dados estruturados com foco em eficiência e leitura objetiva. Já o Card é melhor para destacar conteúdos individualmente, com apelo visual e leitura isolada. Enquanto a tabela organiza, o card valoriza a apresentação." },
        { h2: "Table Columns" },
        { p: "As Table Columns são os mesmos elementos usados na composição do componente Table, e devem ser utilizadas de forma isolada quando o componente completo de Table não atender ao caso de uso." },
        { p: "O componente Table Column é indicado para casos que exigem 9 ou mais colunas, quando o componente padrão de Table, limitado a até 8 colunas, não é suficiente para atender ao caso de uso. Caso a sua tabela possua 8 colunas ou menos, utilize o componente Table." },
        { note: "No código, a Table é um `<table>` de verdade e aceita qualquer número de colunas por `.columns`. As Table Columns (.Head + .Data Cell) são os building blocks `cds-table-head` e `cds-data-cell`. Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { "per-page": "3", "show-pagination": false }, markers: [{ n: 1, target: "cds-table-toolbar", side: "left" }, { n: 2, target: "thead th:last-child", side: "right" }, { n: 3, target: "tbody tr:last-child td:nth-child(2)", side: "bottom", align: "start" }, { n: 4, target: "thead th:first-child", side: "left" }], legend: [".Toolbar (ações da tabela)", ".Head (título da coluna, ordenação)", ".Data Cell (Text, Balance, Percentage, Tag, Link, Action Controls)", "Coluna de seleção (Checkbox)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Empty"] },
          { name: "Show Toolbar", type: "Boolean", default: "true" },
          { name: "Show Pagination", type: "Boolean", default: "true" },
          { name: "Table Columns", type: "Slot", default: "—" }
        ] },
        { h3: ".Head" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Multi Selection"] },
          { name: "Sort", type: "Variant", default: "Default", values: ["Default", "Up", "Down"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed"] },
          { name: "Text Head", type: "Text", default: "Head" },
          { name: "Show Heading Text", type: "Boolean", default: "true" }
        ] },
        { h3: ".Data Cell" },
        { props: [
          { name: "Kind", type: "Variant", default: "Text", values: ["Text", "Balance", "Percentage", "Tag", "Checkbox", "Link", "Action Controls"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered"] },
          { name: "Text", type: "Text", default: "Text content" },
          { name: "Description", type: "Text", default: "Description" },
          { name: "Show Description", type: "Boolean", default: "true" },
          { name: "Value", type: "Text", default: "1.000,00" },
          { name: "Percentual", type: "Text", default: "0,00" }
        ] },
        { note: "Props e padrões lidos dos sets da lib estável. No código: `.columns = [{ key, label, kind, sortable, width }]` e `.rows = [{ id, <key>: valor }]` em JS. Atributos `kind`, `selectable`, `show-toolbar`, `show-pagination`, `per-page`, `label` (legenda), `empty-text` e `empty-action`. Eventos `cds-sort`, `cds-selection`, `cds-action`, `cds-retry` e `cds-page-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Default" },
        { display: { attrs: {} } },
        { h2: "Empty" },
        { display: { attrs: { kind: "empty" } } },
        { h2: "Sem Toolbar e sem seleção" },
        { display: { attrs: { "show-toolbar": false, selectable: "false", "show-pagination": false, "per-page": "3" } } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<table>` de verdade: o leitor de tela anuncia linhas, colunas e o cabeçalho de cada célula (`<th scope=\"col\">`).",
          "Use `label`: vira a legenda (`<caption>`) e o nome da tabela.",
          "Colunas ordenáveis têm o título como botão e `aria-sort` (ascending, descending ou none) no `<th>`.",
          "A coluna de seleção usa Checkboxes nativos, e o do cabeçalho marca ou desmarca todas as linhas da página.",
          "As ações de cada linha são Icon Buttons com nome. A Pagination embaixo é uma região de navegação."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Título das colunas (Text/intense sobre Surface/01) 15,27:1 · texto das células 16,96:1 · descrição (Text/medium) 8,24:1 — AA e AAA."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para a Table." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: tb({ "show-pagination": false, "per-page": "3", "show-toolbar": false }), title: "Ordenação", text: "Permita a ordenação em colunas onde a ação é útil e compreensível. Nem toda coluna precisa ser ordenável (ex: colunas com ações ou conteúdo visual)." },
          { attrs: tb({ "show-pagination": false, "per-page": "3", "show-toolbar": false }), title: "Seleção", text: "A coluna de seleção (checkbox) deve ser exibida uma única vez por tabela e posicionada sempre como a primeira coluna à esquerda. Isso garante consistência visual, facilita a seleção em massa e melhora a usabilidade." },
          { attrs: tb({ "show-pagination": false, "per-page": "3", "show-toolbar": false }), title: "Colunas numéricas", text: "Colunas com valores numéricos devem ser sempre alinhadas à direita. Esse alinhamento facilita a comparação entre números, especialmente quando há casas decimais ou valores com diferentes dígitos, promovendo uma leitura mais precisa e organizada." },
          { attrs: tb({ "show-pagination": false, "per-page": "3", "show-toolbar": false }), title: "Colunas Textuais", text: "Colunas com textos devem ser sempre alinhadas à esquerda. Isso favorece a leitura natural do conteúdo, especialmente em idiomas que seguem o fluxo da esquerda para a direita, além de manter a consistência visual com outros elementos textuais da interface." }
        ] },
        { h3: "Comportamento — Ordenação" },
        { p: "O ícone de ordenação deve permanecer oculto por padrão, aparecendo exclusivamente no hover da coluna, independentemente do estado da ordenação. Ao clicar em uma coluna ordenável, a ordenação inicia em ordem decrescente, com o ícone exibido como ActiveUp. Um segundo clique altera para ordem crescente, mudando o ícone para ActiveDown. No terceiro clique, a ordenação volta ao estado padrão da tabela e o ícone retorna ao status Default — mas ainda assim, visível exclusivamente no hover." },
        { note: "No código, o primeiro clique ordena em ordem crescente (Up) e o segundo em decrescente (Down), e o ícone fica visível enquanto a coluna está ordenada — diferente do texto acima. O comportamento do código foi mantido (decisão de 05/10, CONFERIR C155)." },
        { h3: "Table Columns" },
        { ul: ["Alinhamento: Ao agrupar as colunas para formar a tabela, não deve haver espaçamento (gap) entre elas. Mantenha sempre o valor zero para garantir continuidade visual e alinhamento preciso.", "Colunas: Nunca utilize o componente Table Column isoladamente. Ele deve ser sempre combinado com outras colunas para compor uma tabela completa seguindo as diretrizes desta documentação."] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: tb({ "show-pagination": false, "per-page": "3", "show-toolbar": false }), text: "Use tabela para exibir dados estruturados e comparáveis." },
          { kind: "dont", attrs: tb({ "show-pagination": false, "per-page": "1", "show-toolbar": false }), text: "Não use tabela para poucos dados ou conteúdos não comparáveis — prefira listas ou cards." }
        ] },
        { ul: ["Título — Do: Use títulos claros nos headers das colunas. Don't: Não use títulos vagos, abreviações confusas ou sem contexto.", "Conteúdo — Do: Seja descritivo quando um campo estiver vazio ou desconhecido. Don't: Não use “--” para representar campos nulos ou desconhecidos.", "Células — Caution: Evite mesclar diferentes tipos de células em uma mesma coluna, a menos que seja realmente necessário. Essa prática pode comprometer a legibilidade e sobrecarregar visualmente o conteúdo — mantenha a consistência do tipo de informação em cada coluna sempre que possível."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: { "per-page": "3", "show-pagination": false }, live: true } },
        { note: "Exemplo interativo: passe o mouse nas linhas e nos títulos e clique para ordenar." },
        { specs: [
          { title: "Linha e .Head: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: ".Head: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight não tem seção de Motion para a Table. O mapeamento acima segue o padrão de estados de interação (CONFERIR C147)." } }
      ] }
    ]
  };
})();
