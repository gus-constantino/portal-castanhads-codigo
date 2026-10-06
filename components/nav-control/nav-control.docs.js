/* Documentação — Nav Control
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Nav control, 46b111 · status Backlog) reaproveitado; props, padrões e description do set
   na lib estável (Nav Control 19560:3280); acessibilidade e contrastes do playground (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function nc(more){ return Object.assign({ _tag: "cds-nav-control", total: "5", current: "2", viewport: "desktop" }, more || {}); }

  CDS.docs["nav-control"] = {
    tag: "cds-nav-control",
    base: { total: "5", current: "2", viewport: "desktop" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/46b111-nav-control", sourceLabel: "Abrir o Nav Control no zeroheight",
    cover: { description: "O Nav Control é um componente visual utilizado como indicador de navegação, normalmente associado a carrosséis ou fluxos paginados. Ele representa, de forma ilustrativa, a quantidade total de itens e qual deles está em foco no momento.", examples: [
      nc()
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Nav Control é um componente visual utilizado como indicador de navegação, normalmente associado a carrosséis ou fluxos paginados. Ele representa, de forma ilustrativa, a quantidade total de itens e qual deles está em foco no momento." },
        { p: "Indica a posição atual e a quantidade total de itens de um carrossel. É elemento de leitura: não é acionável. A navegação entre itens se dá por swipe do carrossel no mobile e pelos botões de seta no desktop, com avanço circular do último ao primeiro. Os indicadores não devem ser implementados como clicáveis." },
        { h3: "Nomes alternativos comuns" },
        { p: "carousel indicator, navigation dots." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza de estado", "Comunica visualmente qual item está ativo sem exigir interação direta."],
          ["Simplicidade visual", "Utiliza elementos mínimos (dots e estado selecionado) para evitar ruído na interface."],
          ["Consistência", "Mantém padrão visual e comportamento previsível em diferentes contextos de uso."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Nav Control para indicar a posição atual da pessoa usuária dentro de uma sequência linear de conteúdos, como carrosséis ou etapas visuais, sempre que a navegação direta não for necessária." },
        { h3: "Utilize para:" },
        { ul: ["Indicar o item ativo em um carrossel", "Reforçar progressão visual em conteúdos sequenciais", "Acompanhar mudanças automáticas ou controladas por outros elementos."] },
        { h3: "Não utilize para:" },
        { ul: ["Navegação direta entre telas", "Substituição de tabs ou stepper", "Ações clicáveis ou controles interativos."] },
        { h2: "Casos de uso" },
        { h3: "Nav Control vs Pagination" },
        { p: "O Nav Control é um componente puramente indicativo, utilizado para mostrar a posição atual em uma sequência de conteúdos, como carrosséis, sem permitir interação direta. Já o Pagination é um componente interativo, voltado à navegação ativa entre páginas de tabelas ou listas extensas, permitindo que a pessoa usuária controle explicitamente qual conjunto de dados deseja consultar." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-nav-control-item[is-active]", side: "top" }, { n: 2, target: "cds-nav-control-item:last-child", side: "bottom" }, { n: 3, target: ".cds-nc__btns", side: "right" }], legend: ["Focus indicator (item ativo, 16×6)", "Navigation dots (6×6)", "Botão de navegação (exclusivo do desktop)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Inversed"] }
        ] },
        { note: "Props e padrões lidos do set Nav Control da lib estável. O zeroheight lista Items (2–5), Style e \"Is selectedLead Icon\", que não existem no set (CONFERIR C138). Mobile e desktop vêm da coleção Viewport (no mobile, os indicadores sem as setas). No código: `appearance`, `current` (1-based), `total` (até 10), `prev-label`, `next-label` e `viewport`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Accent · sobre Surface/default", attrs: { viewport: "mobile" } },
          { label: "Inversed · sobre Surface/accent", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [nc({ appearance: "inversed", viewport: "mobile" })] } },
          { label: "Inversed · sobre Surface/inversed", attrs: { _tag: "div", class: "pg-doc-on-inversed", _children: [nc({ appearance: "inversed", viewport: "mobile" })] } }
        ] } },
        { h2: "Viewport" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Desktop: indicadores + setas", attrs: {} },
          { label: "Mobile: indicadores sem setas", attrs: { viewport: "mobile" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "Os indicadores são decorativos (`aria-hidden`): a posição é anunciada em texto (\"Item 2 de 5\") numa região viva.",
          "No desktop, as setas são Icon Buttons com nome (`prev-label` \"Anterior\", `next-label` \"Próximo\").",
          "Os indicadores não são clicáveis nem recebem foco.",
          "Sobre imagem, use scrim para garantir contraste (description da lib)."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Accent sobre Surface/default: ativo 4,54:1 · inativo 8,24:1.", "Inversed sobre Surface/accent: ativo 4,54:1 · inativo 3,22:1. Sobre Surface/inversed: ativo 16,96:1 · inativo 11,17:1.", "Todos acima de 3:1 para elementos gráficos (1.4.11)."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: nc(), title: "Uso exclusivamente ilustrativo", text: "O Nav Control não deve ser clicável ou interativo. Ele reflete o estado atual controlado por outro componente, como um carrossel. Em experiências web, associe o uso de setas interativas." },
          { attrs: nc({ viewport: "mobile" }), title: "Nav Control como indicador obrigatório em carrosséis", text: "Sempre que um carrossel de imagens for utilizado, associe o Nav Control como indicador visual de navegação. Ele ajuda a pessoa usuária a entender quantos itens existem no carrossel e em qual posição ela está no momento, aumentando a previsibilidade e a compreensão do conteúdo, especialmente quando há rolagem automática ou por gesto." }
        ] },
        { p: "Superfícies de uso: Accent sobre Surface/default e Inversed sobre Surface/accent ou Surface/inversed. Uso sobre imagem exige scrim para garantir contraste." },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: nc({ viewport: "mobile" }), text: "Utilize o Nav Control como indicador visual sincronizado com o carrossel ou fluxo, mantendo um único item selecionado por vez." },
          { kind: "dont", attrs: { _tag: "div", class: "pg-doc-row", _children: [nc({ viewport: "mobile" }), { _tag: "cds-main-button", label: "Ir para o item 3", kind: "ghost", size: "small" }] }, text: "Não utilize o Nav Control como elemento de navegação clicável nem como substituto de componentes interativos de navegação." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: use as setas para ver o indicador ativo mudar." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Nav Control no zeroheight ainda está com o texto modelo e a tabela vazia. No código, o indicador ativo cresce em medium/02 + systemic/accelerate, sem Motion Style correspondente (CONFERIR C138)." } }
      ] }
    ]
  };
})();
