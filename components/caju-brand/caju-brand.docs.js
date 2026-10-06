/* Documentação — Caju Brand
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Caju brand, 62eaf1) reaproveitado; props, padrões e description do set da lib estável (Caju Brand 11271:154);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style nem Motion (C135). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function cb(kind, more){ return Object.assign({ _tag: "cds-caju-brand", kind: kind || "default" }, more || {}); }
  function on(cls, items){ return { _tag: "div", class: cls, _children: items }; }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: items }; }

  CDS.docs["caju-brand"] = {
    tag: "cds-caju-brand",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/62eaf1-caju-brand", sourceLabel: "Abrir o Caju Brand no zeroheight",
    cover: { description: "O Caju Brand é um elemento visual fundamental que representa a identidade da Caju dentro dos fluxos do produto. Ele garante consistência no uso da marca, evitando distorções, cores inadequadas ou aplicações incorretas.", examples: [
      row([cb("default"), on("pg-doc-on-accent", [cb("inversed")]), on("pg-doc-on-inversed", [cb("full-white")])])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Caju Brand é um elemento visual fundamental que representa a identidade da Caju dentro dos fluxos do produto. Ele garante consistência no uso da marca, evitando distorções, cores inadequadas ou aplicações incorretas." },
        { h3: "Nomes alternativos comuns" },
        { p: "Logo Caju, Marca Caju, Identidade visual, Brand." },
        { h3: "Princípios" },
        { cards: [
          ["Consistência visual", "O Caju Brand deve sempre reforçar a identidade da empresa de forma uniforme, utilizando exclusivamente as variantes e tokens definidos no design system."],
          ["Legibilidade e contraste", "A aplicação da marca deve priorizar a clareza, escolhendo a variante correta para garantir contraste adequado em qualquer fundo ou contexto."],
          ["Uso institucional", "O componente existe para representar a marca de forma oficial dentro dos fluxos. Ele não deve ser usado como elemento decorativo ou fora do contexto institucional."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Caju Brand sempre que for necessário representar institucionalmente a marca dentro da interface — em áreas de autenticação, telas de boas-vindas, campanhas internas ou materiais digitais que exigem a presença do logotipo de forma padronizada." },
        { h3: "Utilize para:" },
        { ul: ["Identificação institucional em fluxos oficiais (login, onboarding, dashboards principais).", "Campanhas internas ou badges em que a marca precise estar presente.", "Reforço visual em comunicações digitais, mantendo consistência da identidade.", "Áreas de rodapé ou header em que a marca é necessária para credibilidade."] },
        { h3: "Não utilize para:" },
        { ul: ["Representar conteúdos de usuários ou terceiros.", "Criar novas variações da marca que não existam no design system.", "Usar como ícone decorativo sem relação institucional.", "Aplicar em contextos informais ou fora do ecossistema de produtos oficiais."] },
        { h2: "Casos de uso" },
        { h3: "Caju Brand vs Ilustrações" },
        { p: "As ilustrações são elementos gráficos criativas e até estilizadas para transmitir mensagens visuais ou apoiar narrativas da interface. Já o Caju Brand segue regras rígidas: proporção, cor e forma não podem ser alteradas. Use ilustrações quando quiser apoiar storytelling ou humanizar a comunicação. Reserve o Caju Brand para quando a identidade institucional da Caju precisa estar explícita." },
        { compare: [
          { title: "Caju Brand: identidade institucional", attrs: cb("default") },
          { title: "Ilustração: storytelling", attrs: { _tag: "img", src: "assets/illustrations/comunicacao/perguntas-frequentes.svg", alt: "", class: "pg-doc-illus" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [cb("default")] }, markers: [{ n: 1, target: "path:nth-of-type(1)", side: "top", align: "start" }, { n: 2, target: "path:nth-of-type(2)", side: "bottom", align: "start" }, { n: 3, target: "path:nth-of-type(3)", side: "right" }], legend: ["Folha", "Caju", "Typography (opcional)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Inversed", "Full Red", "Full White", "Full Black"] },
          { name: "Show Typography", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Caju Brand da lib estável. O zeroheight ainda não tem a tab Style deste componente. Tamanho fixo: 69×28 com a tipografia e 18×28 com o símbolo sozinho. As cores são da marca (vêm do SVG do Figma), não tokens. No código, `label` muda o nome acessível (padrão \"Caju\")." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Default", attrs: { kind: "default" } },
          { label: "Inversed · sobre Accent", attrs: on("pg-doc-on-accent", [cb("inversed")]) },
          { label: "Full Red", attrs: { kind: "full-red" } },
          { label: "Full White · sobre Inversed", attrs: on("pg-doc-on-inversed", [cb("full-white")]) },
          { label: "Full Black", attrs: { kind: "full-black" } }
        ] } },
        { h2: "Show Typography" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "true · 69×28", attrs: { kind: "default" } }, { label: "false · 18×28", attrs: { kind: "default", "show-typography": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O Caju Brand é anunciado como imagem com o nome \"Caju\" (`role=\"img\"`).",
          "Dentro de um link para a página inicial, mude o nome para o destino (ex.: `label=\"Caju, página inicial\"`).",
          "Se a marca já aparece em texto ao lado, o nome repetido é dispensável."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Default: tipografia (vermelho da marca) sobre Surface/default 4,54:1. No símbolo, folha 1,41:1 e caju 2,65:1.", "Inversed: tipografia branca sobre Surface/accent 4,66:1.", "Full White sobre Surface/inversed 17,40:1 · Full Black sobre Surface/default 20,47:1.", "Logotipos são isentos dos critérios de contraste (1.4.3 e 1.4.11). Ainda assim, use a variante indicada para cada fundo nas Diretrizes."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Caju Brand." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: cb("default"), title: "Default", text: "Use a variante Default em fundos claros e neutros, garantindo contraste e legibilidade. Ideal para a maioria dos cenários institucionais." },
          { attrs: row([on("pg-doc-on-accent", [cb("inversed")]), on("pg-doc-on-inversed", [cb("inversed")])]), title: "Inversed", text: "Use a variante Inversed sobre fundos Accent e Inversed, assegurando contraste adequado e consistência visual em contextos não neutros." },
          { attrs: cb("full-red"), title: "Full red", text: "Utilize em fundos brancos ou claros, principalmente em momentos de ênfase institucional em ambientes monocromáticos. Evite em fundos coloridos ou texturizados." },
          { attrs: on("pg-doc-on-inversed", [cb("full-white")]), title: "Full white", text: "Use em fundos escuros ou coloridos quando as versões monocromáticas forem as únicas permitidas. Mantém a legibilidade sem comprometer a identidade." },
          { attrs: cb("full-black"), title: "Full black", text: "Aplique em fundos claros quando for necessário manter neutralidade visual ou em contextos impressos que não suportem cor." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: cb("default"), text: "Reserve o Caju Brand para contextos institucionais, como login, onboarding, menus ou rodapé, reforçando a identidade oficial." },
          { kind: "dont", attrs: row([cb("default", { "show-typography": false }), cb("full-red", { "show-typography": false }), cb("full-black", { "show-typography": false })]), text: "Não utilize o Caju Brand como elemento decorativo em ilustrações, componente visual ou fundos sem função institucional." },
          { kind: "do", attrs: cb("default"), text: "Mantenha o tamanho e proporções originais do Caju Brand, respeitando o espaço mínimo pré definido no Design System." },
          { kind: "dont", attrs: { _tag: "div", class: "pg-doc-row", _children: [cb("default", { class: "pg-doc-brand-stretch" })] }, text: "Não redimensione manualmente o componente — o uso deve respeitar os tamanhos disponíveis." },
          { kind: "do", attrs: row([cb("default"), cb("full-red"), cb("full-black")]), text: "Utilize exclusivamente as variantes disponíveis no design system (Default, Inversed, Full Red, Full White, Full Black)." },
          { kind: "dont", attrs: cb("default", { class: "pg-doc-brand-recolor" }), text: "Não aplique cores que não fazem parte das variantes oficiais." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Caju Brand é estático: não tem estados de interação nem animação própria." }
      ] }
    ]
  };
})();
