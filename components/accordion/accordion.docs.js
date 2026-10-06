/* Documentação — Accordion
   Fonte: [CastanhaDS] Component use documentation · seção 7073:28317 · frame [Documentação] Accordion (7073:31441)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Sem filhos, o <cds-accordion> desenha a amostra do Figma
   (12 itens "Label/Description" recolhidos), igual às instâncias da doc; com textos próprios, os itens vão em _children.
   Oculto no Figma e de fora: comparação "Content List vs Accordion" (Uso), props State/Is Collapsed/Show Lead Item/Show Divider/Slot
   (só Kind está visível), "Estados do item" e os specimens Disabled (Estilos), Acessibilidade (só placeholder), "Casos de exceção"
   (lorem ipsum), nota de Reduced motion e os 3 Do/Don'ts lorem ipsum.
   Gaps: o [Header] tem o Accordion com 544 de largura; no código ele tem 320 (Fixed no Figma do componente).
   Nos Do/Don'ts o Figma repete 4 títulos 3 vezes (12 itens, cortados); aqui cada exemplo mostra os 4 títulos uma vez. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // Accordion Items com os títulos dados (sem Description, como no Figma); opts: atributos comuns aos itens
  function items(labels, opts, open){
    return labels.map(function(l, i){
      return Object.assign({ _tag: "cds-accordion-item", label: l, collapsed: i === open ? null : true, "show-description": false }, opts);
    });
  }
  var faq = ["Como funciona o reembolso?", "Quando recebo o benefício?", "Posso transferir o saldo?", "Onde uso o cartão?"];
  var noLeadNoDiv = { "show-lead-item": false, "show-divider": false };

  CDS.docs["accordion"] = {
    tag: "cds-accordion",
    base: {},
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=7073-28317",
    // Capa (frame [Header] Accordion): 12 itens (4 perguntas × 3), o 2º aberto; moldura alta e cortada embaixo
    cover: { description: "O Accordion agrupa vários Accordion Items em uma lista de seções expansíveis, que a pessoa abre sob demanda.", tall: true,
      attrs: { _children: items(faq.concat(faq, faq), noLeadNoDiv, 1) } },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Accordion agrupa vários Accordion Items em uma lista de seções expansíveis, que a pessoa abre sob demanda. Faz parte das Accordion Lists, no padrão de Content Lists e Selection Lists." },
        { h3: "Nomes alternativos comuns" },
        { p: "Accordion, lista expansível, grupo de seções retráteis, accordion group." },
        { h3: "Princípios" },
        { cards: [
          ["Revelar sob demanda", "O conteúdo extra fica no Slot, oculto até a pessoa expandir — reduz a carga visual e deixa a leitura previsível."],
          ["Título claro e curto", "O header (Label + Description) resume o que há dentro, pra pessoa prever o conteúdo antes de abrir."],
          ["Estado além da cor", "O chevron (open/close) e a revelação do conteúdo sinalizam expandido ou recolhido — não dependa exclusivamente da cor."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Accordion para agrupar conteúdo extenso em seções expansíveis, com os títulos visíveis e o conteúdo recolhido até a pessoa abrir cada uma." },
        { h3: "Utilize para:" },
        { ul: ["Perguntas frequentes (FAQ)", "Detalhes de um pedido ou resumo expansível", "Formulários longos agrupados por tema ou etapa"] },
        { h3: "Não utilize para:" },
        { ul: ["Informação essencial que deve estar sempre visível", "Navegação entre páginas ou seções — use Link ou Botão", "Alternar um estado imediato — use Switch"] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: {},
          markers: [
            { n: 1, target: "cds-accordion-item:first-child", side: "left" },
            { n: 2, target: "cds-accordion-item:first-child .cds-acc__divider", side: "right" }
          ],
          legend: ["Accordion Item (seções empilhadas)", "Espaçamento entre as seções"]
        } },
        { h2: "Composição do componente" },
        { p: "O Accordion distribui vários Accordion Items no frame Items, com Kind Default (linhas) ou Card (cartões). Cada item traz seu header + Slot. O conjunto cuida do empilhamento e do espaçamento." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", values: ["Default", "Card"] }
        ] },
        { note: "Todas as props podem ser testadas na tab Playground." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Kind", items: [
          { label: "Default", attrs: {} },
          { label: "Card", attrs: { kind: "card" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Acessibilidade" },
        { note: "Sem conteúdo no Figma para esta seção." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: {}, title: "Use para conteúdo secundário, não essencial",
            text: "O accordion esconde conteúdo atrás de um clique. Reserve-o para informação complementar. O que é essencial deve ficar sempre visível." },
          { attrs: {}, title: "Controle de abertura",
            text: "Defina se o conjunto permite vários itens abertos ao mesmo tempo ou um único por vez — abra um por vez quando as seções competem pela mesma atenção." },
          { attrs: {}, title: "Títulos curtos e escaneáveis",
            text: "Escreva labels curtos e descritivos. A pessoa precisa prever o conteúdo de cada seção antes de abrir." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: { _children: items(faq, noLeadNoDiv) },
            text: "Seção de conteúdo secundário que pode ficar recolhida (FAQ, detalhes de um pedido)." },
          { kind: "dont", attrs: { _children: items(["Saldo: R$ 1.240,00", "Ir para Configurações", "Fatura do mês", "Sair da conta"], { "show-lead-item": false }) },
            text: "Informação essencial — mantenha sempre visível, não esconda atrás de um clique." },
          { kind: "do", attrs: { _children: items(["Política de cancelamento", "Como alterar meus dados", "Benefícios inclusos", "Suporte e contato"], { "show-lead-item": false }) },
            text: "Título curto que resume o conteúdo da seção." },
          { kind: "dont", attrs: { _children: items(["Abrir extrato", "Ir para o início", "Ver perfil", "Configurações"], noLeadNoDiv) },
            text: "Como navegação entre páginas ou seções — use Link ou Botão." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "As transições de cada seção do Accordion seguem os Motion Styles do Castanha (modo Normal)." },
        { display: { attrs: { _children: [{ _tag: "cds-accordion-item", label: "Como funciona o reembolso?", "show-lead-item": false, "show-description": false, collapsed: true }, { _tag: "cds-accordion-item", label: "Quando recebo o benefício?", "show-lead-item": false, "show-description": false, collapsed: true }] }, live: true } },
        { note: "Exemplo interativo: passe o mouse, pressione e abra ou recolha uma seção para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "Recolhido → Aberto", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
          { title: "Aberto → Recolhido", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] }
        ] }
      ] }
    ]
  };
})();
