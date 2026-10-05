/* Documentação — Card
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Card, 838f0f) reaproveitado; props e padrões do set da lib estável (Card 5256:540);
   acessibilidade do componente do playground. Divergências no CONFERIR (C131). Has Border: padrão True na lib e no código desde 05/10 (C155). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  // Card de exemplo: título + texto (+ ação opcional) no Slot
  function card(title, text, attrs, action){
    var kids = [{ _tag: "h4", class: "pg-cnt-phone__title", _text: title }, { _tag: "p", class: "pg-cnt-phone__text", _text: text }];
    if (action) kids.push({ _tag: "cds-main-button", label: action, size: "small", appearance: "neutral", "show-lead-icon": false, "show-trailing-icon": false });
    return Object.assign({ _tag: "cds-card", "has-border": true, class: "pg-cnt-card", style: "width:100%", _children: kids }, attrs || {});
  }
  CDS.docs["card"] = {
    tag: "cds-card",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/838f0f-card", sourceLabel: "Abrir o Card no zeroheight",
    cover: { description: "O componente Card é um contêiner visual usado para agrupar informações relacionadas de forma clara e compacta.", examples: [
      card("Saldo de Benefícios", "R$ 1.250,00 disponíveis em 4 categorias.", { style: "width:calc(var(--common-sizes-200) + var(--common-sizes-120))" }, "Detalhes")
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O componente Card é um contêiner visual usado para agrupar informações relacionadas de forma clara e compacta." },
        { h3: "Nomes alternativos comuns" },
        { p: "Container, Box, Tile" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "Os cards devem comunicar sua função principal de forma imediata. A hierarquia visual precisa ser clara, com informações bem organizadas e de fácil leitura."],
          ["Consistência", "Cards devem manter um padrão visual e estrutural em toda a interface, independentemente do contexto em que aparecem."],
          ["Modularidade", "O componente deve ser flexível e escalável, atendendo a diferentes necessidades sem duplicar código ou quebrar o padrão visual."]
        ] },
        { h2: "Quando usar" },
        { p: "O componente Card é usado para apresentar conteúdos agrupados de forma visualmente organizada, promovendo escaneabilidade e interação." },
        { h3: "Utilize para:" },
        { ul: ["Exibir resumos de dados em painéis (dashboards).", "Agrupar informações relacionadas.", "Usar em listas ou grids para navegação em apps mobile/web.", "Apresentar registros individuais com ações com botão."] },
        { h3: "Não utilize para:" },
        { ul: ["Destacar apenas uma informação isolada.", "Como elemento interativo principal.", "Usar em listas ou grids para navegação em apps mobile/web.", "Como enfeite visual sem propósito de agrupamento.", "Destaque de números grandes, para isso utilize o componente de Big numbers."] },
        { h2: "Casos de uso" },
        { h3: "Card vs Shortcut" },
        { p: "O componente Card tem como objetivo principal exibir informações agrupadas de forma estruturada, servindo como contêiner visual para conteúdo variado — como textos, imagens, títulos e ações — sendo ideal para previews, painéis e listagens. Já o componente Shortcut é focado em oferecer acesso rápido a funcionalidades ou seções do sistema, com foco em ação imediata. Enquanto o Card prioriza a apresentação de conteúdo, o Shortcut prioriza a navegação e a interação direta com o sistema." },
        { h3: "Card vs Banner" },
        { p: "Cards e Banners se diferenciam pela função e destaque visual. Cards organizam conteúdos relacionados de forma modular e neutra, enquanto banners são usados para comunicar mensagens importantes, com apelo visual mais forte e foco na atenção imediata." },
        { h3: "Card vs Modal" },
        { p: "Cards e Modais têm funções diferentes na interface: o Card é um elemento estático usado para organizar e agrupar conteúdo relacionado dentro da página, promovendo leitura modular e visualmente separada. Já o Modal é um componente interativo e sobreposto, que interrompe o fluxo da interface para exibir uma informação, confirmação ou ação específica, exigindo atenção imediata e interação do usuário antes de retornar ao conteúdo principal." },
        { note: "O zeroheight lista \"Usar em listas ou grids para navegação em apps mobile/web\" tanto em Utilize para quanto em Não utilize para (CONFERIR C131). Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: card("Título do card", "Conteúdo do Slot: textos, imagens e ações."), markers: [{ n: 1, target: ".cds-card__slot", side: "left" }], legend: ["Container com Slot (conteúdo de quem usa)"] } },
        { h2: "Composição do componente" },
        { p: "O Card é um container com Slot: todo o conteúdo vem de quem usa (textos, imagens, componentes). O padding interno é fixo em 24px." },
        { h2: "Propriedades" },
        { props: [
          { name: "Has Border", type: "Variant", default: "True", values: ["True", "False"] },
          { name: "Slot", type: "Slot" }
        ] },
        { note: "Props e padrões lidos do set Card da lib estável. No código, `has-border` vem ligado por padrão, como na lib; `has-border=\"false\"` tira a borda." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Has Border" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "True", attrs: card("Com borda", "Stroke `Border/semi-soft`.") },
          { label: "False", attrs: card("Sem borda", "Só a superfície e a elevação.", { "has-border": "false" }) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O Card é só um container visual: não tem papel próprio nem é focável.",
          "A estrutura vem do conteúdo: use um título (heading) no início do Card para que o leitor de tela encontre a seção.",
          "Em grupo, coloque os Cards numa lista (`<ul>`) para o leitor anunciar a quantidade.",
          "Ações dentro do Card são botões ou links próprios, com rótulos que façam sentido fora do contexto visual."
        ] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Card." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: card("Cartão virtual", "Use em compras online e nas carteiras digitais."), title: "Conteúdo", text: "Use cartões para exibir informações relacionadas a um único assunto." },
          { attrs: card("Pedido #1234", "Entrega prevista para 12/10.", null, "Detalhes"), title: "Hierarquia do conteúdo", text: "O conteúdo dos cards é flexível permitindo diferentes composições de acordo com experiência desejada" },
          { attrs: [card("Benefícios", "R$ 1.250,00"), card("Despesas", "R$ 320,00")], title: "Espaçamentos entre cards", text: "Os cartões podem ser exibidos juntos em uma grade, lista vertical ou carrossel, desde que se respeite o espaçamento mínimo entre eles de 20px (web) e 16px (mobile)." },
          { attrs: card("Padding fixo", "24px em todos os lados."), title: "Espaçamento interno", text: "Os espaçamentos internos (paddings) do Card são fixos em 24px e devem ser mantidos em todas as aplicações para garantir a consistência visual e o padrão do componente." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: card("Endereço de entrega", "Rua das Flores, 123 · São Paulo, SP"), text: "Use o Card para destacar um agrupamento de conteúdo relacionado, como informações que pertencem ao mesmo contexto" },
          { kind: "dont", attrs: { _tag: "cds-card", "has-border": true, class: "pg-cnt-card", style: "width:100%", _children: [{ _tag: "cds-link", label: "Confira os termos de uso.", href: "#", appearance: "accent" }] }, text: "Não use Cards para conteúdo isolado que não precisa de agrupamento visual, como uma única frase ou link." }
        ] },
        { h3: "Agrupamento" },
        { dodont: [
          { kind: "do", text: "Utilize Cards em layouts de lista, grid ou colunas, promovendo organização modular e responsiva." },
          { kind: "dont", text: "Não organize os cards em layout mosaico." }
        ] },
        { h3: "Alterações" },
        { dodont: [
          { kind: "do", attrs: card("Pedido #1234", "Entrega prevista para 12/10.", null, "Detalhes"), text: "Quando necessário uma ação no card, insira um botão de forma hierárquica dentro do card ou utilize outro componente." },
          { kind: "dont", text: "Não use o Card como botão ou link principal." },
          { kind: "dont", text: "Não aplique sombras, bordas, cor de fundo ou estilos extras fora que não existam como variável do componente. Ao fazer isso, são geradas inconsistências no produto." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Card é estático: não tem estados de interação nem animação própria. Ações dentro dele seguem o motion do componente usado (ex.: Main Button)." }
      ] }
    ]
  };
})();
