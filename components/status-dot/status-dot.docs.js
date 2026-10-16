/* Documentação — Status Dot
   Fontes (PLANO-DOCS §5, 05/10): sem página no zeroheight; o texto vem da description do set na lib estável (Status Dot 21745:69, texto do
   time); props e padrões do mesmo set; acessibilidade e contrastes do playground (C133). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["status-dot"] = {
  tag: "cds-status-dot",
  base: { label: "Ativo", appearance: "positive" },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=21745-69", sourceLabel: "Abrir o Status Dot no Figma",
  cover: { description: "Indicador compacto de estado, formado por um ponto colorido e um rótulo em texto.", examples: [
    { label: "Ativo", appearance: "positive", size: "medium" }, { label: "Pendente", appearance: "warning", size: "medium" }, { label: "Inativo", appearance: "neutral", size: "medium" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Indicador compacto de estado, formado por um ponto colorido e um rótulo em texto. Aparece dentro de linhas de conteúdo, sem o peso visual de um container preenchido." },
      { h2: "Quando usar" },
      { h3: "Utilize para:" },
      { ul: ["Estado em linha: para sinalizar o estado de um item dentro de uma tabela, lista ou cabeçalho de card.", "Leitura em série: quando vários itens exibem estados diferentes e precisam ser comparados rapidamente."] },
      { h3: "Não utilize para:" },
      { ul: ["Destaque próprio: se o estado precisa de fundo e contorno para se destacar, use a Tag.", "Contagem de notificações: para indicar itens novos ou pendentes, use o Badge.", "Categorização: para rotular ou agrupar itens por assunto, use a Tag.", "Ação: o componente não é clicável. Para iniciar uma ação, use um Botão."] },
      { h2: "Status Dot vs Tag" },
      { compare: [
        { title: "Status Dot: estado em linha, sem container", attrs: { label: "Ativo", appearance: "positive" } },
        { title: "Tag: estado com destaque próprio", attrs: { _tag: "cds-tag", label: "Ativo", appearance: "positive", "show-lead-item": false } }
      ] },
      { note: "Texto da description do set na lib. O zeroheight ainda não tem página do Status Dot. Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: { attrs: { label: "Ativo", appearance: "positive", size: "large" }, markers: [{ n: 1, target: ".cds-sd__dot", side: "left" }, { n: 2, target: ".cds-sd__label, span:last-child", side: "bottom" }], legend: ["Indicator (reforço visual)", "Label (carrega a informação)"] } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Positive", "Warning", "Informative", "Negative"] },
        { name: "Size", type: "Variant", default: "Small", values: ["Small", "Medium", "Large"] },
        { name: "Text Label", type: "Text", default: "Label" }
      ] }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Neutral", attrs: { label: "Inativo", appearance: "neutral" } }, { label: "Positive", attrs: { label: "Ativo" } }, { label: "Warning", attrs: { label: "Pendente", appearance: "warning" } },
        { label: "Informative", attrs: { label: "Em rota", appearance: "informative" } }, { label: "Negative", attrs: { label: "Bloqueado", appearance: "negative" } }
      ] } },
      { h2: "Size" },
      { specimens: { min: "var(--common-sizes-120)", items: [{ label: "Small", attrs: {} }, { label: "Medium", attrs: { size: "medium" } }, { label: "Large", attrs: { size: "large" } }] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: ["O ponto é decorativo (`aria-hidden`), e o estado é lido pelo Label.", "Escreva o status por extenso no label. O ponto é reforço visual, não o portador da informação."] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Label (`Text/intense`): 16,96:1 em todas as Appearances — AA e AAA.", "A cor do ponto não precisa atingir 3:1, porque a informação está no texto (1.4.1)."] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Boas práticas" },
      { guides: [
        { attrs: [{ label: "Ativo" }, { label: "Pendente", appearance: "warning" }, { label: "Bloqueado", appearance: "negative" }], title: "Rótulo que nomeia o estado", text: "Escreva o status por extenso no label. O ponto é reforço visual, não o portador da informação." },
        { attrs: { label: "Em rota", appearance: "informative" }, title: "Texto curto", text: "Uma ou duas palavras." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { label: "Pendente", appearance: "warning" }, text: "Nomeie o estado no rótulo." },
        { kind: "dont", attrs: { label: "3 novos", appearance: "informative" }, text: "Contagem de notificações — use o Badge." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "O Status Dot é estático: não tem estados de interação nem animação própria." }
    ] }
  ]
};
