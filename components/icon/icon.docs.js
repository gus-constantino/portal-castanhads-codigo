/* Documentação — Icon
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Icon, 6598b8) reaproveitado; props, padrões e description do set da lib estável (Icon 2261:1126);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style nem Motion (C135). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function ic(icon, more){ return Object.assign({ _tag: "cds-icon", icon: icon }, more || {}); }
  function row(items, wide){ return { _tag: "div", class: "pg-doc-row" + (wide ? " pg-doc-row--wide" : ""), _children: items }; }

  CDS.docs["icon"] = {
    tag: "cds-icon",
    base: { icon: "placeholder-line" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/6598b8-icon", sourceLabel: "Abrir o Icon no zeroheight",
    cover: { description: "Icon (ícone) é uma representação visual direta que auxilia na comunicação de ações, estados, tipos de conteúdo ou categorias.", examples: [
      row([ic("home-line", { size: "large", appearance: "neutral" }), ic("meal-line", { size: "large" }), ic("positive-line", { size: "large", appearance: "positive" }), ic("warning-line", { size: "large", appearance: "warning" }), ic("information-line", { size: "large", appearance: "informative" })], true)
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Icon (ícone) é uma representação visual direta que auxilia na comunicação de ações, estados, tipos de conteúdo ou categorias." },
        { p: "Usado para comunicar ações, estados ou informações de forma compacta e intuitiva, geralmente complementando texto ou funcionando de maneira independente." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "Cada Icon deve comunicar seu significado de forma imediata e reconhecível, evitando ambiguidade ou interpretações duplas."],
          ["Consistência", "Os Icons devem seguir os tamanhos, cores e estilos definidos pelo Design System para manter harmonia visual em toda a interface."],
          ["Funcionalidade", "O Icon deve ter um propósito claro — complementar informações ou representar ações — nunca ser decorativo sem intenção definida."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Icon quando for necessário representar uma ação, status, tipo de conteúdo ou categoria de forma visual e imediata, especialmente em interfaces compactas ou de alta densidade informacional. O Icon deve sempre reforçar a mensagem transmitida, e não substituí-la — por isso, é indicado seu uso acompanhado de texto em casos de possível ambiguidade." },
        { h3: "Utilize para:" },
        { ul: ["Use Icon para reforçar ações e tornar a interface mais escaneável.", "Para sinalizar status ou estados do sistema.", "Em componentes de navegação (ex: setas, chevrons, home).", "Para manter consistência visual em interfaces densas ou modulares."] },
        { h3: "Não utilize para:" },
        { ul: ["Como único meio de transmitir uma informação crítica ou funcional.", "Em contextos onde o reconhecimento visual não for garantido (ex: públicos diversos ou não familiarizados).", "Se o uso do Icon gerar ruído visual ou competir com outros elementos.", "Quando o significado do Icon não for claro sem suporte textual."] },
        { h2: "Casos de uso" },
        { h3: "Icon vs Button Icon" },
        { p: "O componente Icon representa o símbolo gráfico em si — sem interação por padrão — e deve ser utilizado de forma complementar, como elemento visual dentro de outros componentes ou experiências. Já o Button Icon é um componente interativo que combina um Icon com comportamento de botão, sendo projetado para executar ações ao clique ou toque. Use o Icon isoladamente quando a intenção for reforçar visualmente uma informação ou interface, sem gerar interação direta. Utilize o Button Icon quando o Icon for o elemento acionável principal, como em barras de ferramentas, menus compactos ou ações diretas com foco na iconografia." },
        { compare: [
          { title: "Icon: o símbolo, sem interação", attrs: ic("edit-line", { size: "large", appearance: "neutral" }) },
          { title: "Icon Button: ação ao clique ou toque", attrs: { _tag: "cds-icon-button", icon: "edit-line", label: "Editar", appearance: "neutral" } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [ic("home-line", { size: "large", appearance: "neutral" })] }, markers: [{ n: 1, target: "cds-icon", side: "left" }], legend: ["Icon (Choose Icon · 16, 20 ou 24)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Choose Icon", type: "Instance swap", default: "placeholder" },
          { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Neutral", "Positive", "Warning", "Negative", "Informative", "Inversed"] },
          { name: "Size", type: "Variant", default: "Small", values: ["Small", "Medium", "Large"] }
        ] },
        { note: "Props e padrões lidos do set Icon da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, `icon` escolhe o ícone (nome do arquivo em `assets/icons`) e `label` dá o nome acessível." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Size" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Small · 16", attrs: { icon: "home-line", appearance: "neutral" } }, { label: "Medium · 20", attrs: { icon: "home-line", appearance: "neutral", size: "medium" } }, { label: "Large · 24", attrs: { icon: "home-line", appearance: "neutral", size: "large" } }
        ] } },
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Accent", attrs: { icon: "meal-line", size: "large" } }, { label: "Neutral", attrs: { icon: "meal-line", size: "large", appearance: "neutral" } },
          { label: "Positive", attrs: { icon: "positive-line", size: "large", appearance: "positive" } }, { label: "Warning", attrs: { icon: "warning-line", size: "large", appearance: "warning" } },
          { label: "Negative", attrs: { icon: "close-line", size: "large", appearance: "negative" } }, { label: "Informative", attrs: { icon: "information-line", size: "large", appearance: "informative" } },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-inversed", _children: [ic("meal-line", { size: "large", appearance: "inversed" })] } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Sem `label`, o Icon é decorativo (`aria-hidden`): o significado precisa estar no texto ao lado.",
          "Com `label`, vira imagem com nome (`role=\"img\"`). Use quando o ícone informa sozinho, sem texto ao lado.",
          "O Icon não é interativo. Para ação, use o Icon Button, que tem foco, nome e área de toque."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Sobre Surface/default: Neutral 16,96:1 · Negative 13,50:1 · Informative 12,03:1 · Warning 10,44:1 · Positive 9,22:1 · Accent 4,54:1 — todos acima de 3:1 para elementos gráficos (1.4.11).", "Inversed sobre Surface/inversed: 16,96:1."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Icon." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: row([ic("home-line", { appearance: "neutral" }), ic("home-line", { appearance: "neutral", size: "medium" }), ic("home-line", { appearance: "neutral", size: "large" })], true), title: "Tamanhos", text: "Utilize sempre os tamanhos padronizados definidos pelo Design System (SM, MD e LG) para garantir alinhamento visual e consistência entre os componentes. Não redimensione manualmente os Icons no Figma ou via CSS — use os tamanhos definidos nas propriedades do componente." },
          { attrs: row([ic("positive-line", { size: "large", appearance: "positive" }), ic("warning-line", { size: "large", appearance: "warning" }), ic("close-line", { size: "large", appearance: "negative" }), ic("information-line", { size: "large", appearance: "informative" })], true), title: "Cores", text: "Utilize as cores semânticas disponibilizadas nas propriedades do componente. Essas cores foram definidas para manter consistência visual, comunicar estados corretamente e garantir acessibilidade. Evite aplicar cores arbitrárias ou fora dos tokens semânticos predefinidos, mesmo que visualmente semelhantes." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Icon é estático: não tem estados de interação nem animação própria. Quando está dentro de outro componente (botões, Tag, Link), segue o Motion do componente pai." }
      ] }
    ]
  };
})();
