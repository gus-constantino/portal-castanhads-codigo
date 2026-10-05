/* Documentação — Pagination
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Pagination, 084582 · status Improvement) reaproveitado; props, padrões e description do componente
   na lib estável (Pagination 13408:1416); acessibilidade e contrastes do playground. O zeroheight não tem Princípios, Style nem Motion, e os
   Do's and Don'ts estão com lorem ipsum (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["pagination"] = {
    tag: "cds-pagination",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/084582-pagination", sourceLabel: "Abrir o Pagination no zeroheight",
    cover: { description: "O Pagination (paginação) permite navegar entre conjuntos de dados distribuídos em várias páginas, otimizando a performance da visualização e facilitando o consumo de grandes volumes de dados.", wide: true, examples: [
      { total: "87", "per-page": "10", page: "3" }
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Pagination (paginação) permite navegar entre conjuntos de dados distribuídos em várias páginas, otimizando a performance da visualização e facilitando o consumo de grandes volumes de dados." },
        { h3: "Nomes alternativos comuns" },
        { p: "Content pagination, Numbered pagination, Pagination controls." },
        { h2: "Quando usar" },
        { p: "O componente Pagination deve ser utilizado sempre que for necessário dividir grandes volumes de conteúdo em partes navegáveis, melhorando a legibilidade e a performance da interface. O componente oferece ao usuário controle sobre a navegação entre páginas e pode possui a opção de incluir funcionalidades como seleção de itens por página, indicação de intervalo e total de resultados." },
        { h3: "Utilize para:" },
        { ul: ["Quando os dados não cabem em uma única visualização.", "Para melhorar o tempo de carregamento de tabelas extensas.", "Quando for importante indicar ao usuário em qual página ele está e quantas páginas existem no total.", "Para permitir navegação direta entre páginas e controle sobre a quantidade de itens exibidos por vez."] },
        { h3: "Não utilize para:" },
        { ul: ["Para conjuntos de dados pequenos (≤10 itens).", "Quando o foco for busca ou filtragem em tempo real (use scroll infinito ou filtros)."] },
        { h2: "Casos de uso" },
        { h3: "Pagination vs Infinite scroll" },
        { p: "A escolha entre Pagination e Infinite scroll depende do tipo de conteúdo e da experiência desejada para o usuário." },
        { p: "O Pagination é ideal quando é importante dar ao usuário controle sobre a navegação, permitindo que ele saiba exatamente onde está (ex: página 2 de 10) e facilitando ações como voltar a uma página específica ou comparar conteúdos entre páginas." },
        { p: "Já o Infinite scroll favorece uma navegação contínua e fluida, sendo mais indicado para experiências exploratórias, como feeds ou galerias, onde não há necessidade de localização precisa no conteúdo." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { total: "87", "per-page": "10", page: "3" }, markers: [{ n: 1, target: ".cds-pg__group:first-child cds-select-number", side: "top" }, { n: 2, target: ".cds-pg__strong", side: "bottom" }, { n: 3, target: ".cds-pg__group:last-child cds-select-number", side: "top" }, { n: 4, target: ".cds-pg__nav", side: "bottom" }], legend: ["Itens por página (.Select Number)", "Intervalo e total de itens (Items range · Items display)", "Página atual (.Select Number) + total de páginas (Page number)", "Anterior e próxima (Icon Button Ghost)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Show Itens per page", type: "Boolean", default: "true" },
          { name: "Show Item display", type: "Boolean", default: "true" },
          { name: "Show Rows per page", type: "Boolean", default: "true" },
          { name: "Items range", type: "Text", default: "1-10" },
          { name: "Items display", type: "Text", default: "250" },
          { name: "Page number", type: "Text", default: "100" }
        ] },
        { note: "Props e padrões lidos do componente Pagination da lib estável. No código: `page`, `per-page`, `per-page-options`, `total`, `pages` (sem ele, calcula de total/per-page), `items-range` (sem ele, calcula) e os três `show-*`. Mudanças disparam `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Completo" },
        { display: { attrs: { total: "87", "per-page": "10", page: "3" } } },
        { h2: "Só a navegação entre páginas" },
        { display: { attrs: { total: "87", "per-page": "10", page: "3", "show-items-per-page": false, "show-item-display": false } } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É uma região de navegação com nome (`label`, padrão \"Paginação\").",
          "Os .Select Number são botões com lista (`aria-haspopup=\"listbox\"`): ao abrir, o foco vai para a opção atual; setas, `Home`/`End`, `Enter` e `Esc`.",
          "Anterior e próxima são Icon Buttons com nome; ficam desabilitados na primeira e na última página.",
          "Ao trocar de página, leve o foco ou anuncie a mudança no conteúdo (ex.: título da tabela), para quem usa leitor de tela saber que a lista mudou."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Textos (Text/intense) sobre Surface/default: 16,96:1 — AA e AAA."] },
        { note: "Contraste medido no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Pagination." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: { total: "87", "per-page": "10", page: "3" }, title: "Exiba o estado atual da navegação", text: "Sempre que possível, mostre qual intervalo de itens está sendo exibido (ex: “21–30 de 87”) e/ou em qual página o usuário está (ex: “Página 3 de 9”)." },
          { attrs: { total: "8", "per-page": "10", page: "1" }, title: "Evite paginação em listas curtas", text: "Para listas com poucos itens (ex: ≤10), considere exibir tudo em uma única página para evitar navegação desnecessária." }
        ] },
        { note: "Os Do's and Don'ts do Pagination no zeroheight ainda estão com lorem ipsum (CONFERIR C138)." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições ficam nas peças do Pagination: os .Select Number e os Icon Buttons seguem o Motion de cada um." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight não tem seção de Motion para o Pagination." } }
      ] }
    ]
  };
})();
