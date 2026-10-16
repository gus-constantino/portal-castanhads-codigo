/* Documentação — Carousel
   Fontes (07/10): sem página no zeroheight; o texto vem da description do componente na lib (Carousel 21215:242) e da
   description do Carousel do castanha-react (estabilizado na Release 25); props do castanha-react. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["carousel"] = {
  tag: "cds-carousel",
  base: {},
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=21215-242", sourceLabel: "Abrir o Carousel no Figma",
  cover: { description: "Organiza de 3 a 10 itens em sequência horizontal, um por vez, com pré-visualização parcial do próximo.", examples: [{}] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Organiza de 3 a 10 itens em sequência horizontal, exibindo um por vez com pré-visualização parcial do próximo. Sempre acompanhado do Nav Control." },
      { h2: "Navegação" },
      { ul: [
        "Swipe no mobile e as setas do Nav Control no desktop, com avanço circular do último ao primeiro.",
        "O swipe não aciona o item sob o dedo: componentes com estado próprio, como o Banner, só disparam sua ação em toque sem deslocamento."
      ] },
      { h2: "Conteúdo" },
      { ul: [
        "O slot recebe Banner e Card como valores preferidos e aceita outros componentes.",
        "O item mantém a própria largura: o carrossel não o estica.",
        "Abaixo de 3 itens, não se usa carrossel."
      ] },
      { display: { attrs: {}, live: true } },
      { note: "Texto da description do componente na lib e do Carousel do castanha-react. O zeroheight ainda não tem página do Carousel. Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { p: "Coluna com gap `Sizes/16`: o slot de conteúdo, horizontal, e o Nav Control, os dois em Fill. O espaçamento entre itens é `Specific/Carousel/gap`, que varia por mode de viewport: 8 no mobile, 16 no tablet e no desktop." },
      { p: "A instância de Nav Control é exposta: o Appearance é definido no próprio carrossel." },
      { h2: "Propriedades" },
      { props: [
        { name: "Content Slot", type: "Slot", default: "Banner e Card (preferidos)" },
        { name: "Appearance (Nav Control)", type: "Variant", default: "Accent", values: ["Accent", "Inversed"] }
      ] },
      { note: "No código: `appearance`, `current` (1-based, como o Nav Control; no castanha-react, `activeIndex` começa em 0), `prev-label` e `next-label`. Evento `cds-change` a cada troca de item." }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "O carrossel é uma região com `aria-roledescription=\"carrossel\"` e os itens são uma lista, cada um com a posição (\"2 de 4\").",
        "As setas do Nav Control têm rótulo (\"Item anterior\" e \"Próximo item\", como no castanha-react) e o Nav Control anuncia o item atual.",
        "Com `prefers-reduced-motion`, a troca de item é imediata, sem rolagem animada."
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A troca de item é a rolagem da faixa até o início do item, com encaixe (scroll-snap)." },
      { specs: [
        { title: "Avançar", rows: [["Gatilho", "On tap ou arrastar"], ["Motion Style", "`Selected In/04`"]] },
        { title: "Voltar", rows: [["Gatilho", "On tap ou arrastar"], ["Motion Style", "`Selected Out/05`"]] }
      ] },
      { note: "O playground usa a rolagem nativa do navegador e ainda não aplica esse timing. Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." }
    ] }
  ]
};
