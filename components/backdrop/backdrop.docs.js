/* Documentação — Backdrop
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Backdrop, 383013) reaproveitado; componente da lib estável (Backdrop 13784:3271, sem props
   nem description); visual e comportamento do playground (o ::backdrop do <dialog> de Modal, Drawer e Bottom Sheet usa o mesmo visual). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // Backdrop dentro de uma área posicionada, com conteúdo por baixo e (opcional) um elemento em foco por cima
  function stage(top){
    var kids = [
      { _tag: "div", class: "pg-cnt-card", _children: [{ _tag: "h4", class: "pg-cnt-phone__title", _text: "Conteúdo da tela" }, { _tag: "p", class: "pg-cnt-phone__text", _text: "A interface por baixo continua visível, mas fica em segundo plano." }] },
      { _tag: "cds-backdrop" }
    ];
    if (top) kids.push(top);
    return { _tag: "div", class: "pg-doc-backdrop-stage", _children: kids };
  }
  var MODAL = { _tag: "cds-modal", inline: true, open: true, "text-title": "Excluir rascunho?", "primary-label": "Excluir rascunho", "secondary-label": "Cancelar", "show-lead-icon": "false", class: "pg-doc-backdrop-stage__top", _children: [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Essa ação não pode ser desfeita." }] };
  CDS.docs["backdrop"] = {
    tag: "cds-backdrop",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/383013-backdrop", sourceLabel: "Abrir o Backdrop no zeroheight",
    cover: { description: "Backdrop é um componente de superfície utilizado para criar uma camada de bloqueio visual entre o conteúdo base da interface e elementos em primeiro plano, como modais e drawers.", examples: [Object.assign(stage(MODAL), { style: "width:calc(var(--common-sizes-200) * 2 + var(--common-sizes-120))" })] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Backdrop é um componente de superfície utilizado para criar uma camada de bloqueio visual entre o conteúdo base da interface e elementos em primeiro plano, como modais e drawers." },
        { h3: "Nomes alternativos comuns" },
        { p: "Overlay, scrim, layer de bloqueio" },
        { h2: "Quando usar" },
        { p: "Utilize Backdrop sempre que um elemento em primeiro plano exigir foco exclusivo da pessoa usuária e bloquear temporariamente a interação com o restante da interface, como em fluxos críticos, decisões importantes ou conteúdos que precisam de atenção isolada. Os principais componentes que exigem o uso de Backdrop são: Modal ou Dialog, Drawer e Bottom sheet." },
        { h3: "Utilize para:" },
        { ul: ["Criar barreira visual entre fundo e conteúdo ativo", "Reduzir ruído visual da interface", "Reforçar foco em modais, drawers e similares", "Indicar bloqueio de interação no fundo"] },
        { h3: "Não utilize para:" },
        { ul: ["Apenas escurecer a interface sem mudança de estado", "Criar efeito visual decorativo", "Substituir hierarquia de layout", "Destacar elementos que não bloqueiam interação"] },
        { alert: { appearance: "informative", label: "Nome na documentação", text: "O nome correto da camada é Backdrop. Overlay e scrim aparecem como nomes alternativos, mas não use \"Overlay\" na documentação nem nas interfaces." } },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { display: { attrs: stage() } },
        { p: "Uma camada única: `Surface/inversed` com opacidade `Common/Opacity/medium`, cobrindo toda a área interativa por baixo do elemento em foco." },
        { h2: "Propriedades" },
        { p: "O Backdrop não tem propriedades na lib: é um componente fixo." },
        { note: "No código, `cds-backdrop` cobre o pai posicionado (`inset: 0`). Modal, Drawer e Bottom Sheet já trazem o mesmo visual no `::backdrop` do `<dialog>`: não é preciso colocar o componente à mão." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Com um elemento em foco" },
        { display: { attrs: stage(MODAL) } },
        { note: "O Backdrop fica acima do conteúdo base e abaixo do elemento em foco." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O Backdrop é visual: o bloqueio de verdade vem do diálogo modal, que deixa o resto da página inerte.",
          "Por isso, use o Backdrop junto com Modal, Drawer ou Bottom Sheet — sozinho, ele não impede o foco de chegar ao fundo.",
          "Quando o componente permite, o clique no Backdrop fecha a camada; mantenha também o fechamento por botão e por Esc."
        ] },
        { h2: "Contraste" },
        { p: "O conteúdo por baixo do Backdrop não precisa atender contraste: ele está temporariamente fora de interação." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ol: [
          "Uso do componente da biblioteca: utilize o componente Backdrop disponível na biblioteca do design system. Evite recriar manualmente.",
          "Posicionamento na hierarquia: o backdrop deve estar acima do conteúdo base e abaixo do elemento em foco (ex: modal ou drawer). Certifique-se de que o backdrop cobre toda a área interativa.",
          "Bloqueio para edição: recomenda-se bloquear o componente no Figma para evitar seleções acidentais durante a edição."
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Backdrop entra e sai junto com o elemento em foco. Não há especificação de Motion própria na lib nem no zeroheight." }
      ] }
    ]
  };
})();
