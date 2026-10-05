/* Documentação — Caju Card (rascunho)
   Sem página no zeroheight e sem [Documentation] no arquivo Component use documentation (05/10). Só a description do set na lib estável
   (Caju Card 17053:1181) é texto do time (literal); o resto foi escrito a partir do Figma e do playground. Revisar com o time (C145). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function cc(more){ return Object.assign({ _tag: "cds-caju-card" }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: items }; }

  CDS.docs["caju-card"] = {
    tag: "cds-caju-card",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17053-1181", sourceLabel: "Abrir o Caju Card no Figma",
    cover: { description: "O Caju Card simula visualmente os diferentes tipos de cartões da Caju nos cenários físicos e virtuais seguindo as diretrizes das lojinhas de app.", examples: [
      row([cc({ kind: "fisico" }), cc({ kind: "virtual" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight. Só a primeira frase é do time (description do Figma); o resto foi escrito a partir do Figma e do playground e precisa de revisão." } },
        { h2: "Sobre" },
        { p: "O Caju Card simula visualmente os diferentes tipos de cartões da Caju nos cenários físicos e virtuais seguindo as diretrizes das lojinhas de app." },
        { p: "Mostra a frente ou o verso do cartão, na vertical ou na horizontal, com os dados (número, validade, CVV, código de ativação) trocados por propriedade. Is Blocked cobre o cartão com um Backdrop e um cadeado." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Mostrar o cartão da pessoa na tela do cartão (físico, virtual, corporativo ou voucher).", "Indicar que o cartão está bloqueado.", "Mostrar o verso com o código de ativação, no fluxo de desbloqueio."] },
        { h3: "Não utilize para:" },
        { ul: ["Ilustrar cartões em telas de marketing ou onboarding — use as ilustrações de cartão do [Caju] Illustrations.", "Cartões que não são da Caju.", "Representar o cartão em listas pequenas — use um ícone ou o Shaped Icon."] },
        { h2: "Casos de uso" },
        { h3: "Caju Card vs Ilustração de cartão" },
        { p: "O Caju Card representa o cartão real da pessoa, com os dados dela. As ilustrações de cartão do [Caju] Illustrations são genéricas e servem para contar uma história (onboarding, telas de sucesso)." },
        { compare: [
          { title: "Caju Card: o cartão da pessoa", attrs: cc({ kind: "virtual", orientation: "horizontal" }) },
          { title: "Ilustração: storytelling", attrs: { _tag: "img", src: "assets/illustrations/financas/cartao-virtual-wallet-1.svg", alt: "", class: "pg-doc-illus" } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { _tag: "div", class: "pg-doc-row", _children: [cc({ kind: "fisico", blocked: true })] }, markers: [{ n: 1, target: ".cds-cc__art", side: "left" }, { n: 2, target: ".cds-cc__lock", side: "right" }], legend: ["Arte do cartão (frente ou verso, com os dados)", "Is Blocked: Backdrop + cadeado (lock-line)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Físico", values: ["Físico", "Virtual/Credito", "Voucher", "Virtual/Credito Corporativo", "Físico Corporativo"] },
          { name: "Orientation", type: "Variant", default: "Vertical", values: ["Horizontal", "Vertical"] },
          { name: "Is Blocked", type: "Variant", default: "False", values: ["False", "True"] },
          { name: "Side View", type: "Variant", default: "Front", values: ["Front", "Back"] },
          { name: "Full Card Number", type: "Text", default: "1234 5678 0009 0001" },
          { name: "CVV", type: "Text", default: "123" },
          { name: "Expiration Date", type: "Text", default: "10/30" },
          { name: "Activation Code", type: "Text", default: "000 000 000 000 000" }
        ] },
        { note: "Props e padrões lidos do set Caju Card da lib estável. Nem toda combinação existe no Figma (C74): o código cai na mais próxima (vertical e, se preciso, frente). No código: `kind` (fisico | fisico-corporativo | virtual | virtual-corporativo | voucher), `orientation`, `side`, `blocked`, `full-card-number`, `cvv`, `expiration-date`, `activation-code` e `label`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Físico", attrs: { kind: "fisico" } }, { label: "Físico Corporativo", attrs: { kind: "fisico-corporativo" } },
          { label: "Virtual", attrs: { kind: "virtual" } }, { label: "Virtual Corporativo", attrs: { kind: "virtual-corporativo" } }, { label: "Voucher", attrs: { kind: "voucher" } }
        ] } },
        { h2: "Orientation e Side View" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Horizontal", attrs: { kind: "fisico", orientation: "horizontal" } }, { label: "Verso (Back)", attrs: { kind: "fisico", side: "back" } }, { label: "Is Blocked", attrs: { kind: "fisico", blocked: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O cartão é uma imagem (`role=\"img\"`) com nome que diz o tipo, o lado e o final do número (ex.: \"Cartão Caju Físico, final 0001\"); bloqueado, acrescenta \", bloqueado\".",
          "A arte e o cadeado são decorativos; os dados completos não são lidos.",
          "Dado sensível: mostre o número completo, o CVV e o código de ativação só quando a pessoa pedir, e nunca no nome acessível.",
          "O cartão não é interativo; ações (bloquear, ver dados) ficam em botões ao lado."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o Kind que corresponde ao cartão real da pessoa.", "Ao mostrar o cartão bloqueado, explique ao lado como desbloquear.", "Não altere as cores, a marca ou a proporção da arte.", "Use a orientação do contexto: vertical no app, horizontal no Portal."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Caju Card é estático no playground." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para virar o cartão (frente → verso) nem para bloquear (CONFERIR C145)." } }
      ] }
    ]
  };
})();
