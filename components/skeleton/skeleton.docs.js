/* Documentação — Skeleton
   Fontes (07/10): sem página no zeroheight; o texto vem da description do set na lib (Skeleton 20967:742, Release 25 do Figma)
   e da description do Skeleton do castanha-react; props e padrões do mesmo set. Nada além do que as duas fontes dizem. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["skeleton"] = {
  tag: "cds-skeleton",
  base: {},
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20967-742", sourceLabel: "Abrir o Skeleton no Figma",
  cover: { description: "Placeholder de carregamento que ocupa o espaço de um conteúdo enquanto ele não chegou.", examples: [
    { kind: "round", width: "48", height: "48" }, { kind: "square", width: "200", height: "24" }, { kind: "square", width: "120", height: "16" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Placeholder de carregamento que ocupa o espaço de um conteúdo enquanto ele não chegou. Repita instâncias para reproduzir o layout final." },
      { h2: "Quando usar" },
      { h3: "Utilize para:" },
      { ul: ["Conteúdo de forma previsível: avatar, imagem, card ou bloco de texto."] },
      { h3: "Não utilize para:" },
      { ul: ["Carregamento de ação, como um botão no envio de formulário."] },
      { h2: "Kind" },
      { compare: [
        { title: "Round: formas circulares, como avatar, ícone e badge", attrs: { kind: "round", width: "56", height: "56" } },
        { title: "Square: formas retangulares, como imagem, card e bloco de texto", attrs: { kind: "square", width: "200", height: "104" } }
      ] },
      { note: "Texto da description do set na lib e do Skeleton do castanha-react. O zeroheight ainda não tem página do Skeleton. Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { p: "Uma forma só (Shape), com gradiente horizontal `Neutral/Solid/semi-soft` → `Surface/default` → `Neutral/Solid/semi-soft`. O Round é uma elipse e o Square tem raio `Border/Radius/medium`." },
      { h2: "Dimensões" },
      { p: "As dimensões são definidas por quem consome: os tamanhos do Figma são amostra. No código, `width` e `height` aceitam um número da escala (`48` vira `Common/Sizes/48`), px ou um valor CSS, como no castanha-react." },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Round", values: ["Round", "Square"] }
      ] }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Kind" },
      { specimens: { min: "var(--common-sizes-200)", items: [{ label: "Round", attrs: { kind: "round" } }, { label: "Square", attrs: { kind: "square", width: "200", height: "104" } }] } },
      { h2: "Montando um layout" },
      { p: "Repita instâncias para reproduzir o layout final, como a linha de uma lista com avatar e duas linhas de texto." },
      { display: { attrs: { _tag: "div", style: "display:flex;align-items:center;gap:var(--common-sizes-12);width:calc(var(--common-sizes-200) + var(--common-sizes-104))", _children: [
        { _tag: "cds-skeleton", kind: "round", width: "48", height: "48" },
        { _tag: "div", style: "display:flex;flex-direction:column;gap:var(--common-sizes-8);flex:1", _children: [{ _tag: "cds-skeleton", kind: "square", width: "100%", height: "16" }, { _tag: "cds-skeleton", kind: "square", width: "120", height: "12" }] }
      ] } } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: ["O Skeleton é decorativo (`aria-hidden`): não tem o que ler.", "Quem carrega marca o container com `aria-busy=\"true\"` e anuncia quando o conteúdo chega."] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "Um brilho atravessa a forma e faz uma pausa de 500ms, em loop, como no Skeleton do castanha-react." },
      { specs: [
        { title: "Carregamento", rows: [["Gatilho", "Em loop"], ["Motion Style", "`Loading/01`"]] }
      ] },
      { ul: ["Com `prefers-reduced-motion`, a animação para e o brilho fica no centro.", "No Figma o Skeleton é estático. O playground segue o React por decisão registrada no CONFERIR (C181)."] }
    ] }
  ]
};
