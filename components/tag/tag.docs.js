/* Documentação — Tag
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Tag, 89e78e) reaproveitado; props e padrões do set da lib estável (Tag 4475:114);
   acessibilidade e contrastes do playground. O zeroheight não tem a tab Style (C133). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["tag"] = {
  tag: "cds-tag",
  base: { label: "Tag", "show-lead-item": false },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/89e78e-tag", sourceLabel: "Abrir a Tag no zeroheight",
  cover: { description: "Tag são rótulos compactos e visualmente distintos usados para rapidamente categorizar, identificar e organizar itens.", examples: [
    { label: "Aprovado", appearance: "positive" }, { label: "Em análise", appearance: "warning" }, { label: "Novo", appearance: "accent" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "Tag são rótulos compactos e visualmente distintos usados para rapidamente categorizar, identificar e organizar itens. As Tags podem informar a pessoa usuária de situações em andamento, ou atribuírem significado, com informações acessórias próximas a outros componentes." },
      { h3: "Nomes alternativos comuns" },
      { p: "Chips, Badge, Tag Status, Bullet." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "A Tag deve comunicar informações de forma imediata e clara."],
        ["Objetividade", "Use textos curtos e diretos, limitados a uma única ideia ou categoria."],
        ["Consistência", "Mantenha o uso de cores e estilos conforme as variantes definidas no design system."]
      ] },
      { h2: "Quando usar" },
      { p: "Use as Tag para categorizar, etiquetar e organizar itens em uma tela, usando palavras-chave ou frases curtas que os descrevam." },
      { h3: "Utilize para:" },
      { ul: ["Categorizar ou rotular itens e facilitar a organização (ex.: situação de um pedido).", "Identificar atributos: para destacar atributos específicos de um item. (ex.: Novo, Promoção, etc.).", "Representar escolhas feitas pela pessoa usuária de forma compacta (seleção de múltiplos interesses em um formulário, por exemplo)"] },
      { h3: "Não utilize para:" },
      { ul: [
        "Mostrar várias situações e informações de uma vez. Distribua as informações com outros componentes pela tela e evite usar várias Tag diferentes juntas.",
        "Conteúdo extenso, como frases longas ou parágrafos. Para esse fim, prefira o Topic ou texto corrido.",
        "Exibir informações críticas, que exigem ação imediata da pessoa usuária. Prefira o uso de um Modal ou Alert nesse caso.",
        "Links para navegação entre páginas. Nesse caso, prefira o Link.",
        "Botões de ação principal, como Enviar ou Salvar. Prefira o Main Button e suas variações nesse caso.",
        "Indicar o progresso de uma ação em andamento na tela, como carregamentos e processamentos de dados. Para indicar o progresso em contexto, use uma Progress Line ou Spinner."
      ] },
      { h2: "Casos de uso" },
      { h3: "Tag vs Alert" },
      { p: "O Tag exibe informações que não exigem ação da pessoa usuária e são acessórias. O Alert, por outro lado, chama atenção imediata e traz informações mais críticas." },
      { h3: "Tag vs Topic" },
      { p: "O Tag concentra uma informação concisa, sem formar frases ou parágrafos. O Topic traz informações mais longas, com frases e se necessário ícones." },
      { h3: "Tag vs Chip Filter" },
      { p: "O Tag funciona como informativo na tela, sem ações associadas. Por outro lado, o Chip Filter é acional, contém controles internos, e pode ser usado para gerenciar filtros em tabelas e listas." },
      { note: "Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: { attrs: { label: "Em análise", appearance: "warning", "show-lead-item": true, icon: "timer-line" }, markers: [{ n: 1, target: "cds-icon", side: "left" }, { n: 2, target: "span:last-child", side: "right" }], legend: ["Lead Item (Icon · Small)", "Text Label"] } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Accent", "Neutral", "Positive", "Warning", "Negative", "Informative", "Inversed"] },
        { name: "Text Label", type: "Text", default: "Tag" },
        { name: "Show Lead Item", type: "Boolean", default: "true" }
      ] },
      { note: "Props e padrões lidos do set Tag da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, `icon` escolhe o ícone do Lead Item." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Neutral", attrs: {} }, { label: "Accent", attrs: { appearance: "accent" } }, { label: "Positive", attrs: { appearance: "positive" } }, { label: "Warning", attrs: { appearance: "warning" } },
        { label: "Negative", attrs: { appearance: "negative" } }, { label: "Informative", attrs: { appearance: "informative" } }, { label: "Inversed", attrs: { appearance: "inversed" } }
      ] } },
      { h2: "Com Lead Item" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Positive", attrs: { label: "Aprovado", appearance: "positive", "show-lead-item": true, icon: "check-line" } },
        { label: "Warning", attrs: { label: "Em análise", appearance: "warning", "show-lead-item": true, icon: "timer-line" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: ["A Tag é texto: o leitor de tela lê o Label.", "O ícone é decorativo, e a cor também — o significado precisa estar no texto (ex.: \"Aprovado\", e não a cor verde sozinha).", "A Tag não é interativa. Para filtrar ou remover, use os Chips."] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Neutral 15,27:1 · Inversed 16,96:1 · Negative 10,33:1 · Informative 9,60:1 · Warning 9,54:1 · Positive 8,02:1 · Accent 7,62:1 — todos AA e AAA para texto."] },
      { note: "Contrastes do texto sobre o fundo da própria Tag, medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para a Tag." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [{ attrs: [{ label: "Aprovado", appearance: "positive" }, { label: "Em análise", appearance: "warning" }], title: "Conteúdo", text: "O conteúdo nas Tag deve ser curto, com poucas palavras e conciso, entregando a informação rapidamente." }] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: [{ label: "Entregue", appearance: "positive" }, { label: "Em rota", appearance: "informative" }], text: "Use para categorizar rapidamente informações em um grupo, como em tabelas ou listas." },
        { kind: "dont", attrs: { label: "Seu cartão foi enviado e chega em até 10 dias úteis", appearance: "informative" }, text: "Não use para fornecer informações ou instruções detalhadas sobre um item, com mais de uma frase." },
        { kind: "do", attrs: { label: "Novo", appearance: "accent" }, text: "Use para destacar informações curtas, objetivas e categorizadas, como benefícios, status ou rótulos." },
        { kind: "dont", attrs: { label: "Clique para ver os detalhes do pedido", appearance: "neutral" }, text: "Não use para fornecer instruções longas, textos descritivos ou informações detalhadas." },
        { kind: "do", attrs: { label: "Recusado", appearance: "negative" }, text: "Use para indicar status, categorias ou resultados de forma clara e resumida." },
        { kind: "dont", attrs: { label: "Excluir", appearance: "negative" }, text: "Não use para ações ou comandos que devem ser executados pelo usuário." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A Tag é estática: não tem estados de interação nem animação própria." }
    ] }
  ]
};
