/* Documentação — Divider
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Dividers, 877742) reaproveitado; props, padrões, description e anotações do set da lib
   estável (Divider 4931:207 — construção por Kind, semântica de separador, contraste); acessibilidade do playground (C144). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function dv(more){ return Object.assign({ _tag: "cds-divider" }, more || {}); }
  function block(title, text){ return { _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: title }, { _tag: "span", _text: text }] }; }
  function stack(items){ return { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: items }; }

  CDS.docs["divider"] = {
    tag: "cds-divider",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/877742-dividers", sourceLabel: "Abrir o Divider no zeroheight",
    cover: { description: "O componente Divider é uma linha fina que separa visualmente agrupamentos de conteúdo em uma interface. Ele atua como uma âncora visual, ajudando a pessoa usuária a escanear e compreender a hierarquia e o relacionamento entre os elementos da página.", examples: [
      stack([block("Dados da empresa", "CNPJ, endereço e contatos"), dv({ intensity: "medium" }), block("Responsáveis", "Pessoas com acesso ao Portal")])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O componente Divider é uma linha fina que separa visualmente agrupamentos de conteúdo em uma interface. Ele atua como uma âncora visual, ajudando a pessoa usuária a escanear e compreender a hierarquia e o relacionamento entre os elementos da página." },
        { h3: "Nomes alternativos comuns" },
        { p: "Separator, Line, Horizonal rule, Separador." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza Estrutural", "Deve sempre demarcar uma quebra lógica no fluxo de conteúdo, garantindo que a pessoa usuária compreenda o que está sendo separado."],
          ["Sutileza Visual", "Sua presença deve ser discreta. O objetivo é separar, não competir com o conteúdo que ele está organizando."],
          ["Consistência de Agrupamento", "Ajuda a agrupar visualmente informações relacionadas e a separar informações não relacionadas, suportando o princípio da proximidade."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Divider sempre que for necessário estabelecer uma separação visual clara e não ambígua entre seções, blocos de conteúdo ou elementos interativos que pertencem a grupos distintos. Ele é ideal para refinar a estrutura do layout e reduzir a carga cognitiva, especialmente em interfaces densas ou longas." },
        { h3: "Utilize para:" },
        { ul: ["Separar itens em listas de navegação, como menus laterais ou lista em dropdown.", "Demarcar o fim de uma seção de conteúdo e o início de outra (quando na orientação horizontal).", "Separar diferentes tipos de informação em um painel ou cartão, como cabeçalhos, corpo e rodapé."] },
        { h3: "Não utilize para:" },
        { ul: ["Substituir espaçamento (espaço em branco). A separação primária deve ser feita pelo espaço em branco, e o Divider é um complemento visual.", "Separar elementos já claramente distintos por layout ou cores de fundo contrastantes.", "Criar divisões que não correspondem a uma mudança lógica ou hierárquica no conteúdo."] },
        { h2: "Casos de uso" },
        { h3: "Espaço em branco" },
        { p: "O Espaço em Branco (Whitespace) é uma ferramenta essencial de design de interface, definida pela ausência intencional de conteúdo ou elementos visuais, e atua como o princípio fundamental para estruturar a página, agrupar informações relacionadas (Lei da Proximidade da Gestalt), e fornecer respiro, garantindo a legibilidade, o fluxo visual e a clareza da hierarquia para a pessoa usuária." },
        { h3: "Divider vs Espaço em branco" },
        { p: "O Espaço em Branco (Whitespace) é a principal e mais sutil ferramenta de design para estabelecer hierarquia, agrupar e separar conteúdo, sendo fundamental para a legibilidade e o fluxo da leitura. Em contraste, o Divider é um elemento visual explícito e secundário, que deve ser usado com moderação, para reforçar uma separação de seções ou quebra de contexto quando o Espaço em Branco, por si só, não é suficiente ou ambíguo. O uso do Divider nunca deve ser uma substituição ou compensação para um espaçamento mal planejado no layout." },
        { compare: [
          { title: "Espaço em branco separa", attrs: stack([block("Dados da empresa", "CNPJ, endereço e contatos"), block("Responsáveis", "Pessoas com acesso ao Portal")]) },
          { title: "Divider reforça uma quebra de seção", attrs: stack([block("Dados da empresa", "CNPJ, endereço e contatos"), dv(), block("Responsáveis", "Pessoas com acesso ao Portal")]) }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Construção por Kind" },
        { table: { wrap: true, head: ["Kind", "Construção", "Cor"], rows: [["Solid", "Barra preenchida, raio pill", "Neutral/Solid/{Intensity} (fill)"], ["Dashed", "Linha com traço 4 · 4, ponta arredondada, 1px, container sem raio", "Border/{Intensity} (stroke)"]] } },
        { p: "Orientation define o eixo de escala: Horizontal estica na largura e Vertical estica na altura. A espessura permanece fixa em 1px." },
        { note: "Anotações do set Divider na lib: Solid e Dashed usam tokens diferentes de propósito (não unificar) e o Dashed é desenhado em SVG (`stroke-dasharray=\"4 4\"` + `stroke-linecap=\"round\"`), porque `border-style: dashed` varia entre navegadores." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Solid", values: ["Solid", "Dashed"] },
          { name: "Intensity", type: "Variant", default: "Soft", values: ["Soft", "Medium", "Intense"] },
          { name: "Orientation", type: "Variant", default: "Horizontal", values: ["Horizontal", "Vertical"] }
        ] },
        { note: "Props e padrões lidos do set Divider da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código: `kind`, `intensity`, `orientation` e `separator` (presente = separa grupos com significado)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Solid" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Soft", attrs: {} }, { label: "Medium", attrs: { intensity: "medium" } }, { label: "Intense", attrs: { intensity: "intense" } }
        ] } },
        { h2: "Dashed" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Soft", attrs: { kind: "dashed" } }, { label: "Medium", attrs: { kind: "dashed", intensity: "medium" } }, { label: "Intense", attrs: { kind: "dashed", intensity: "intense" } }
        ] } },
        { h2: "Vertical" },
        { display: { attrs: { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: [{ _tag: "span", class: "pg-doc-media__text", _text: "Itens por página: 10" }, dv({ orientation: "vertical", intensity: "medium" }), { _tag: "span", class: "pg-doc-media__text", _text: "1-10 de 250 itens" }] } } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Divisor é decorativo por padrão (`aria-hidden=\"true\"`).",
          "Se separa grupos com significado, use `separator`: o Divider vira `role=\"separator\"` com `aria-orientation` conforme a Orientation."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Divisor decorativo é isento de 1.4.11. Soft (1,25:1) e Medium (2,78:1) ficam abaixo de 3:1 por design — não corrigir.", "Se o divisor for o único meio de comunicar separação, usar Intense (8,24:1)."] },
        { note: "Texto da anotação \"Contraste não é falha aqui\" do set Divider na lib. Valores conferidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: stack([block("Nome", "Ana Alves"), dv(), block("CPF", "123.456.789-10"), dv({ intensity: "intense" }), block("Endereço", "Rua das Flores, 100")]), title: "Intensidade para Hierarquia", text: "Use a variante de menor intensidade (Soft) para separações mais discretas dentro de um mesmo agrupamento (ex: itens em um formulário e listas) e as variantes de maior intensidade (Medium ou Intense) para demarcar grandes seções ou divisões importantes na página." },
          { attrs: stack([block("Dados da empresa", "CNPJ, endereço e contatos"), dv({ intensity: "medium" }), block("Responsáveis", "Pessoas com acesso ao Portal")]), title: "Margens Adequadas", text: "Garanta que haja um espaçamento (padding ou margin) suficiente entre o Divider e o conteúdo que ele separa. O espaçamento é tão importante quanto a linha em si para a legibilidade, e o Divider deve sempre complementar o Espaço em Branco, nunca compensá-lo." }
        ] },
        { note: "O zeroheight ainda não tem Do's and Don'ts para o Divider." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Divider é estático: não tem estados de interação nem animação própria." },
        { note: "A seção Motion do Divider no zeroheight está com o texto modelo e a tabela vazia (CONFERIR C144)." }
      ] }
    ]
  };
})();
