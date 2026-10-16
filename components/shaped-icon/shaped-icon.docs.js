/* Documentação — Shaped Icon
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Shaped Icon, 7620fa · status Improvement) reaproveitado; props, padrões e description do set da lib estável (Shaped Icon 2272:146);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style nem Motion (C135). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function si(icon, appearance, more){ return Object.assign({ _tag: "cds-shaped-icon", icon: icon, appearance: appearance || "neutral" }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: items }; }
  function media(shaped, title, text){ return { _tag: "div", class: "pg-doc-media", _children: [shaped, { _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: title }, { _tag: "span", _text: text }] }] }; }

  CDS.docs["shaped-icon"] = {
    tag: "cds-shaped-icon",
    base: { icon: "placeholder-line" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/7620fa-shaped-icon", sourceLabel: "Abrir o Shaped Icon no zeroheight",
    cover: { description: "O Shaped Icon é um ícone envolto por um fundo colorido e com formato definido, que confere maior ênfase visual e peso hierárquico. Ele é utilizado para evidenciar categorias, ações contextuais ou estados visuais sem depender de interação.", examples: [
      row([si("meal-line", "accent", { size: "medium" }), si("positive-line", "positive", { size: "medium" }), si("warning-line", "warning", { size: "medium" }), si("information-line", "informative", { size: "medium" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Shaped Icon é um ícone envolto por um fundo colorido e com formato definido, que confere maior ênfase visual e peso hierárquico. Ele é utilizado para evidenciar categorias, ações contextuais ou estados visuais sem depender de interação." },
        { h3: "Nomes alternativos comuns" },
        { p: "Icon Tile" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza visual", "Deve destacar o ícone de forma legível e imediata, reforçando a mensagem sem competir com outros elementos."],
          ["Consistência semântica", "As cores devem seguir as variantes semânticas do Design System para comunicar estados e significados de forma uniforme."],
          ["Equilíbrio e hierarquia", "Deve ser usado com moderação, mantendo alinhamento e proporção adequados para preservar a hierarquia visual da interface."]
        ] },
        { h2: "Quando usar" },
        { p: "O Shaped Icon funciona como um marcador visual para ações, estados ou categorias, sem função interativa. Seu papel é puramente comunicativo e decorativo, muitas vezes substituindo ou reforçando elementos textuais. Pode funcionar tanto de forma isolada, quanto acompanhado de texto, agregando clareza e estrutura visual ao conteúdo." },
        { h3: "Utilize para:" },
        { ul: ["Para dar destaque visual a um ícone em meio ao conteúdo.", "Quando for necessário reforçar um status ou categoria (por exemplo: erro, sucesso, aviso, etc).", "Para representar ações complementares ao conteúdo, como atalhos ou indicações visuais.", "Em listas, cards ou títulos, para facilitar o escaneamento visual."] },
        { h3: "Não utilize para:" },
        { ul: ["Como substituto de botões interativos (use o Button Icon).", "Quando não há necessidade de destacar o ícone visualmente — nesse caso, prefira o Icon, sem fundo.", "Para ações ou cliques, já que o componente não possui interação."] },
        { h2: "Casos de uso" },
        { h3: "Shaped Icon vs Icon" },
        { p: "O Shaped Icon é uma versão do ícone que possui um fundo colorido com forma definida, o que o torna mais chamativo e visualmente destacado. Já o componente Icon não tem fundo e tem uma aparência mais discreta, sendo ideal para contextos mais neutros ou com menor carga visual. Enquanto o Icon é usado principalmente de forma funcional, como apoio em botões, textos ou listas onde a simplicidade é prioridade, o Shaped Icon atua como um marcador visual. Ele reforça mensagens, categorias ou estados — mesmo sem interação — funcionando bem quando se deseja adicionar peso visual e facilitar o reconhecimento." },
        { compare: [
          { title: "Shaped Icon", attrs: si("meal-line", "accent", { size: "medium" }) },
          { title: "Icon", attrs: { _tag: "cds-icon", icon: "meal-line", size: "large" } }
        ] },
        { h3: "Shaped Icon vs Button icon" },
        { p: "A principal diferença entre o Shaped Icon e o Button Icon está na interatividade. Enquanto o Shaped Icon é um elemento exclusivamente visual, utilizado para comunicar categorias, status ou reforçar um contexto, o Button Icon é um componente interativo, desenvolvido para realizar ações específicas, como editar, excluir ou compartilhar." },
        { compare: [
          { title: "Shaped Icon: visual, sem interação", attrs: si("share-line", "neutral", { size: "small" }) },
          { title: "Icon Button: interativo", attrs: { _tag: "cds-icon-button", icon: "share-line", label: "Compartilhar", appearance: "neutral" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [si("meal-line", "accent", { size: "large" })] }, markers: [{ n: 1, target: "cds-shaped-icon", side: "left" }, { n: 2, target: "cds-icon", side: "bottom" }], legend: ["Container (Shape, fundo com raio)", "Icon (nested instance)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Icon", type: "Instance swap", default: "placeholder" },
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Accent", "Neutral", "Positive", "Warning", "Negative", "Informative", "Inversed"] },
          { name: "Size", type: "Variant", default: "Smallest", values: ["Smallest", "Small", "Medium", "Large"] }
        ] },
        { table: { head: ["Size", "Shape", "Icon"], rows: [["Smallest", "32 · raio extra-small", "16"], ["Small", "40 · raio small", "16"], ["Medium", "48 · raio medium", "20"], ["Large", "56 · raio medium", "24"]] } },
        { note: "Props e padrões lidos do set Shaped Icon da lib estável. O zeroheight ainda não tem a tab Style deste componente. Size e Appearance do Icon interno derivam do Shaped Icon." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Size" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Smallest · 32", attrs: { icon: "meal-line", appearance: "accent" } }, { label: "Small · 40", attrs: { icon: "meal-line", appearance: "accent", size: "small" } },
          { label: "Medium · 48", attrs: { icon: "meal-line", appearance: "accent", size: "medium" } }, { label: "Large · 56", attrs: { icon: "meal-line", appearance: "accent", size: "large" } }
        ] } },
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Neutral", attrs: { icon: "meal-line", size: "medium" } }, { label: "Accent", attrs: { icon: "meal-line", appearance: "accent", size: "medium" } },
          { label: "Positive", attrs: { icon: "positive-line", appearance: "positive", size: "medium" } }, { label: "Warning", attrs: { icon: "warning-line", appearance: "warning", size: "medium" } },
          { label: "Negative", attrs: { icon: "close-line", appearance: "negative", size: "medium" } }, { label: "Informative", attrs: { icon: "information-line", appearance: "informative", size: "medium" } },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-inversed", _children: [si("meal-line", "inversed", { size: "medium" })] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Sem `label`, o Shaped Icon é decorativo: o significado precisa estar no texto ao lado.",
          "Com `label`, vira imagem com nome (`role=\"img\"`). Use quando ele informa sozinho, sem texto ao lado.",
          "Não é interativo. Para ação clicável, use o Icon Button."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Ícone sobre o próprio fundo: Neutral 15,27:1 · Negative 10,33:1 · Informative 9,60:1 · Warning 9,54:1 · Positive 8,02:1 · Accent 4,20:1 · Inversed 16,96:1 — todos acima de 3:1 para elementos gráficos (1.4.11).", "O fundo (Shape) é suave e fica próximo da superfície (1,08 a 1,31:1): o que comunica é o ícone, não o contorno do Shape."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Shaped Icon." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: row([si("positive-line", "positive", { size: "small" }), si("warning-line", "warning", { size: "small" }), si("close-line", "negative", { size: "small" }), si("information-line", "informative", { size: "small" })]), title: "Cores semânticas", text: "Use as cores semânticas (erro, alerta, sucesso, neutro, etc.) disponíveis nas propriedades do componente. Ao utilizar uma cor semântica no Shaped Icon, você garante que o usuário entenda de imediato o contexto visual." },
          { attrs: media(si("meal-line", "accent", { size: "small" }), "Vale-refeição", "Use em restaurantes e apps de delivery."), title: "Alinhamento e hierarquia visual", text: "O Shaped Icon deve estar centralizado quando for o elemento principal dentro de um bloco (como em cards ou chamadas de atenção) ou alinhado lateralmente quando estiver acompanhando um título ou texto. Em ambos os casos, respeite os tokens de espaçamento do Design System para garantir uma hierarquia clara e uma leitura fluida da informação." }
        ] },
        { h2: "Caso de Exceção" },
        { h3: "Uso de cores não semânticas" },
        { p: "O uso padrão do Shaped Icon deve sempre seguir as cores semânticas disponíveis nas variantes do componente." },
        { p: "No entanto, em casos específicos em que as cores semânticas não atendam ao contexto visual, é permitido utilizar outras cores não semânticas, desde que sejam tokens oficiais do Design System. Essa exceção deve ser aplicada com cautela e restrita aos casos em que for necessário preservar a coerência com a identidade visual do produto ou reforçar hierarquia estética em cenários particulares." },
        { note: "No código, o fundo pode ser trocado por um token oficial com a variável `--cds-shaped-bg` no pai, como prevê a exceção." },
        { h2: "Do's and Don'ts" },
        { h3: "Use com moderação" },
        { dodont: [
          { kind: "do", attrs: media(si("meal-line", "accent", { size: "small" }), "Vale-refeição", "Saldo disponível para restaurantes."), text: "Use Shaped Icon para destacar pontos importantes e manter a hierarquia visual clara, sem sobrecarga de informações e cores." },
          { kind: "dont", attrs: row([si("meal-line", "accent", { size: "small" }), si("mobility-line", "positive", { size: "small" }), si("health-line", "warning", { size: "small" }), si("education-line", "informative", { size: "small" }), si("culture-line", "negative", { size: "small" })]), text: "Evite utilizar muitos ícones com fundo em uma mesma tela, pois isso pode poluir o layout e dificultar a leitura do conteúdo principal." }
        ] },
        { h3: "Interação" },
        { dodont: [
          { kind: "do", attrs: media(si("positive-line", "positive", { size: "small" }), "Pagamento aprovado", "O valor já está disponível."), text: "Use em contextos sintéticos e visuais. O componente funciona melhor em contextos de leitura de relance, onde o ícone reforça uma informação (ex: status, alerta, categoria). Não use em blocos extensos de texto." },
          { kind: "dont", attrs: row([si("edit-line", "neutral", { size: "small" }), si("delete-line", "neutral", { size: "small" })]), text: "Não utilize o componente como elemento interativo. O Shaped Icon é puramente visual. Para ações clicáveis, utilize o componente Button Icon, que possui suporte a interação e acessibilidade." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Shaped Icon é estático: não tem estados de interação nem animação própria." }
      ] }
    ]
  };
})();
