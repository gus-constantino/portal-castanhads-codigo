/* Documentação — Banner
   Sem página no zeroheight (05/10). Fonte: [Documentação] Banner (6795:20954, arquivo Component use documentation — usa o set atual da lib)
   e a description do set na lib estável (Banner 20051:15726); textos literais. Acessibilidade e contrastes do playground (C145). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function bn(more){ return Object.assign({ _tag: "cds-banner", class: "pg-doc-banner", href: "#", illustration: "notificacoes/sino", title: "Saldo refeição", description: "Veja quanto ainda dá para gastar.", cta: "Ver saldo" }, more || {}); }
  var PHOTO = "assets/brand/sample-photo.svg";

  CDS.docs["banner"] = {
    tag: "cds-banner",
    base: { class: "pg-doc-banner", href: "#", illustration: "notificacoes/sino", title: "Saldo refeição", description: "Veja quanto ainda dá para gastar.", cta: "Ver saldo" },
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6795-20954", sourceLabel: "Abrir [Documentação] Banner no Figma",
    cover: { description: "O Banner destaca conteúdo promocional ou informação relevante em uma área própria da tela. Reúne título, descrição e indicação de ação em um bloco clicável por inteiro, com fundo de cor livre ou imagem de fundo. Serve para atrair a pessoa usuária sem interromper o que ela está fazendo.", wide: true, examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Banner destaca conteúdo promocional ou informação relevante em uma área própria da tela. Reúne título, descrição e indicação de ação em um bloco clicável por inteiro, com fundo de cor livre ou imagem de fundo. Serve para atrair a pessoa usuária sem interromper o que ela está fazendo." },
        { h3: "Nomes alternativos comuns" },
        { p: "Hero card, Promo banner, Feature card, Callout." },
        { h3: "Princípios" },
        { cards: [
          ["Uma mensagem, uma ação", "O Banner comunica um único assunto e leva a um único destino. Mais de uma chamada dilui a mensagem e quebra a lógica da área clicável única."],
          ["Convite, não interrupção", "Diferente dos componentes de sobreposição, o Banner convive com o conteúdo da página. Ele atrai a atenção, mas a pessoa usuária pode seguir seu fluxo sem interagir."],
          ["Legibilidade acima da estética", "A cor de fundo e a imagem são livres. A escolha precisa preservar o contraste do texto em todos os estados: Enabled, Hovered, Pressed e Disabled."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Banner para destacar uma oferta, novidade ou informação relevante que leve a pessoa usuária a um destino específico, sem interromper o fluxo em que ela está." },
        { h3: "Utilize para:" },
        { ul: ["Divulgar produtos, ofertas ou novidades", "Destacar informação relevante que tenha destino próprio", "Direcionar para uma página ou fluxo específico"] },
        { h3: "Não utilize para:" },
        { ul: ["Comunicar status, erro ou consequência de uma ação (utilize o Alert)", "Organizar conteúdo em blocos de mesma hierarquia (utilize o Card)", "Disparar ação na própria página, como abrir um modal", "Agrupar mais de um destino no mesmo bloco", "Conteúdo que exija leitura longa"] },
        { h2: "Casos de uso" },
        { h3: "Banner vs Card" },
        { p: "Use o Banner quando a peça precisa de peso de destaque e leva a um destino único — especialmente em comunicação promocional, onde ela precisa se diferenciar do resto da página. O Card é indicado para organizar conteúdo em blocos de mesma hierarquia, desde que os itens sejam comparáveis entre si." },
        { compare: [
          { title: "Este é um Banner", attrs: {} },
          { title: "Este é um Card", attrs: { _tag: "cds-card", _children: [{ _tag: "p", class: "pg-doc-media__text", _children: [{ _tag: "strong", _text: "Saldo refeição" }, { _tag: "span", _text: "R$ 320,00 disponíveis" }] }] } }
        ] },
        { h3: "Banner vs Alert" },
        { p: "Use o Banner quando o conteúdo é um convite que a pessoa usuária pode ignorar sem prejuízo. O Alert é indicado para comunicar status do sistema ou consequência de uma ação, desde que a mensagem seja relevante para o momento em que ela está." },
        { compare: [
          { title: "Este é um Banner", attrs: bn({ illustration: "financas/cartao-virtual-wallet-1", bg: "decorative-03", title: "Carteira digital", description: "Pague por aproximação.", cta: "Adicionar" }) },
          { title: "Este é um Alert", attrs: { _tag: "cds-alert", appearance: "warning", label: "Saldo baixo", text: "Seu saldo refeição está abaixo de R$ 20,00." } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Illustration" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-banner", side: "right", align: "start" }, { n: 2, target: ".cds-cb__title", side: "left" }, { n: 3, target: ".cds-cb__desc", side: "left" }, { n: 4, target: ".cds-cb__cta", side: "left" }, { n: 5, target: ".cds-banner__ill", side: "right" }], legend: ["Fundo", "Título", "Descrição", "Indicação de CTA", "Ilustração"] } },
        { h2: "Image" },
        { anatomy: { attrs: { kind: "image", src: PHOTO, alt: "", title: "Cursos", description: "Faculdades parceiras da Caju.", cta: "Ver cursos" }, markers: [{ n: 1, target: ".cds-banner__img", side: "right", align: "start" }, { n: 2, target: ".cds-banner__backdrop", side: "right" }, { n: 3, target: ".cds-cb__title", side: "left" }, { n: 4, target: ".cds-cb__desc", side: "left" }, { n: 5, target: ".cds-cb__cta", side: "left" }], legend: ["Imagem de fundo", "Backdrop", "Título", "Descrição", "Indicação de CTA"] } },
        { h2: "Composição do componente" },
        { p: "O Banner é composto por:" },
        { ul: ["Fundo (obrigatório): cor livre na variante Illustration, imagem com Backdrop na variante Image", "Conteúdo (obrigatório): título e descrição", "Indicação de CTA (opcional): rótulo e ícone, sem componente Button", "Ilustração (opcional): exclusiva da variante Illustration"] },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Illustration", values: ["Illustration", "Image"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Illustration", type: "Instance swap", default: "notificacoes/sino" }
        ] },
        { h3: ".Content Banner" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Inversed"] },
          { name: "Text Title", type: "Text", default: "Label" },
          { name: "Text Description", type: "Text", default: "Description" },
          { name: "CTA Text Label", type: "Text", default: "Label" },
          { name: "Show Text Title", type: "Boolean", default: "true" },
          { name: "Show CTA", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos dos sets Banner (20051:15726) e .Content Banner (20028:15153) da lib estável. Largura mínima de 280px, e a altura acompanha o conteúdo. No código: `kind`, `illustration` (\"<categoria>/<nome>\" do [Caju] Illustrations), `src`/`alt` (Image), `bg` (token de cor do fundo, padrão Decorative/01), `content` (Appearance do conteúdo), `title`, `description`, `cta`, `show-text-title`, `show-cta`, `href` e `disabled`. O `state` serve exclusivamente para exemplos." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Illustration", attrs: {} },
          { label: "Image", attrs: { kind: "image", src: PHOTO, alt: "", title: "Cursos", description: "Faculdades parceiras da Caju.", cta: "Ver cursos" } }
        ] } },
        { h2: "State" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true, href: null } }
        ] } },
        { h2: "Fundo e Appearance" },
        { specimens: { items: [
          { label: "Decorative/03 · Neutral", attrs: { bg: "decorative-03", illustration: "financas/cartao-multi", title: "Saúde", description: "Consultas e exames com desconto.", cta: "Conhecer" } },
          { label: "Surface/inversed · Inversed", attrs: { bg: "surface-inversed", content: "inversed", illustration: "financas/cartao-multi", title: "Saúde", description: "Consultas e exames com desconto.", cta: "Conhecer" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O Banner inteiro é a área clicável: com `href` é um link (`<a>`), sem `href` é um botão. O nome é o título, a descrição e o texto do CTA.",
          "O CTA é uma indicação visual da ação — não é um botão, não é focável separadamente e não deve haver mais de um por banner.",
          "A ilustração é decorativa. Na variante Image, use `alt` vazio quando a imagem é decorativa.",
          "Disabled usa o `disabled` nativo e sai da ordem de foco."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Fundo padrão (Decorative/01) · Neutral: 10,17:1 no Enabled, 7,47:1 no Hovered e 5,35:1 no Pressed (o overlay escurece o fundo) — AA.", "Decorative/03 · Neutral: 8,00:1 · Surface/inversed · Inversed: 16,96:1.", "Surface/inversed · Neutral: 1,00:1 — reprova (é o Don't das Diretrizes). Como a cor de fundo é livre, valide cada combinação."] },
        { note: "Contrastes medidos no tema light do playground. A seção Acessibilidade do [Documentação] Banner ainda está com texto de exemplo (\"Tópico 1 / Ordem de leitura\")." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: bn({ bg: "surface-inversed", content: "inversed" }), title: "Escolha a cor pensando no contraste", text: "A cor de fundo é livre, então o componente não garante contraste por si. Valide a legibilidade no estado Enabled e escolha Appearance=Neutral em fundos claros ou Inversed em fundos escuros. Os estados Hovered e Pressed aplicam overlay e podem reduzir o contraste." },
          { attrs: bn({ kind: "image", src: PHOTO, alt: "", title: "Mobilidade", description: "Metrô, ônibus e apps.", cta: "Saiba mais" }), title: "Use imagem que tolere enquadramento largo", text: "A imagem de fundo é recortada no centro, e o recorte aumenta conforme o banner se alonga. Prefira imagens com o assunto centralizado e sem texto embutido." },
          { attrs: bn({ illustration: "financas/cartao-multi", title: "Cursos", description: "Faculdades parceiras da Caju.", cta: "Ver cursos" }), title: "Mantenha um destino por banner", text: "A área clicável é única. Duas chamadas no mesmo bloco tornam ambíguo para onde a pessoa usuária está indo." },
          { attrs: bn({ illustration: "financas/cartao-virtual-wallet-2", title: "Novo app", description: "Mais rápido e fácil de usar.", cta: "Atualizar" }), title: "Escreva título curto e descrição objetiva", text: "O Banner compete com o conteúdo da página. Texto longo anula o destaque que justifica o uso do componente." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: bn({ title: "Saldo refeição", description: "Veja quanto ainda dá para gastar.", cta: "Ver saldo" }), text: "Um assunto por banner: título, descrição e CTA falam da mesma coisa e levam ao mesmo destino." },
          { kind: "dont", attrs: bn({ title: "Mobilidade", description: "Veja também cursos e saúde.", cta: "Ver mobilidade" }), text: "Não misture assuntos no mesmo banner. Como o destino é único, dois temas deixam a pessoa usuária sem saber para onde está indo." },
          { kind: "do", attrs: bn({ bg: "surface-inversed", content: "inversed" }), text: "Combine Appearance=Inversed com fundo escuro ou imagem de fundo." },
          { kind: "dont", attrs: bn({ bg: "surface-inversed", content: "neutral" }), text: "Não mantenha Appearance=Neutral sobre fundo escuro: o texto perde contraste e reprova AA." },
          { kind: "do", attrs: bn({ illustration: "financas/cartao-multi", title: "Saúde", description: "Consultas e exames com desconto.", cta: "Conhecer" }), text: "Use o Banner para conteúdo promocional que a pessoa usuária pode ignorar sem prejuízo." },
          { kind: "dont", attrs: bn({ title: "Falha", description: "Não conseguimos buscar seu saldo.", cta: "Tentar de novo" }), text: "Não use o Banner para comunicar erro ou status do sistema — utilize o Alert." }
        ] },
        { note: "A área do conteúdo tem no mínimo 122 de altura, como no Figma (C27), e cresce com o texto: a altura acompanha o conteúdo, como diz a description do set (decisão de 05/10, CONFERIR C155)." },
        { note: "O [Documentação] Banner tem também \"Casos de exceção\" com texto de exemplo (lorem ipsum) — não entra até o time preencher (CONFERIR C145)." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione o banner." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/03`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/03`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/06`"]] }
        ] },
        { note: "Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." },
      ] }
    ]
  };
})();
