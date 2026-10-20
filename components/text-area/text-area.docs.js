/* Documentação — Text Area Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 4944:309 · frame [Documentação] Text area (4944:347)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Capa: o [Header] (4944:937) é um mockup mobile (tela Pix Copia e Cola) → sem o PNG exportado, a capa usa o componente vivo (C95).
   Oculto no Figma: Acessibilidade (4944:591) — só placeholder ("Tópico 1" / "Ordem de leitura"), por isso a tab fica com nota.
   Motion ainda é placeholder no Figma (lorem ipsum + "Especificação").
   A doc do Figma usa um set legado (State Default/Hover/Active-focus/Filled, Error…); Propriedades e Estilos seguem o set do código,
   Text Area Input 10110:3028 (decisão do time, C98).
   Os Do/Don'ts no Figma são imagens (prints de tela); aqui são recriados só com os campos (sem o título "Pagar boleto" da tela). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["text-area"] = {
  tag: "cds-text-area",
  base: { "show-required": false },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=4944-309",
  // Capa: o [Header] do Figma é um mockup (imagem) ainda não exportado → componente vivo com o base (C95)
  cover: {
    description: "O Text Area é um campo de entrada multilinha que permite à pessoa usuária digitar textos mais longos, como descrições, observações ou comentários."
  },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Text Area é um campo de entrada multilinha que permite à pessoa usuária digitar textos mais longos, como descrições, observações ou comentários." },
      { h3: "Nomes alternativos comuns" },
      { p: "Textarea, Campo de texto longo, Input text area" },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "Facilita a escrita e leitura de conteúdos extensos."],
        ["Orientação", "Usa label e placeholder para indicar o que deve ser preenchido."],
        ["Feedback", "Oferece suporte visual por texto auxiliar, contador e estado de erro."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Text Area quando for necessário coletar informações abertas e extensas, que não se adequam a campos de uma única linha, garantindo espaço suficiente para leitura, escrita e revisão do conteúdo digitado." },
      { h3: "Utilize para:" },
      { ul: ["Descrições longas.", "Comentários e feedbacks.", "Observações ou justificativas.", "Informações abertas sem limite rígido de palavras."] },
      { h3: "Não utilize para:" },
      { ul: ["Entradas curtas ou objetivas.", "Dados estruturados como datas ou valores.", "Quando um Input de uma linha atende a necessidade."] },
      { h3: "Text Area vs Text input" },
      { p: "O Text input é indicado para textos curtos e objetivos, enquanto o Text Area deve ser usado quando a pessoa usuária precisa escrever conteúdos mais longos, com múltiplas linhas e maior flexibilidade de visualização." },
      { compare: [
        { title: "Este é um Text area", attrs: { label: "Descrição da solicitação", placeholder: "Explique o contexto ou a situação" } },
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Título da solicitação", placeholder: "Digite o título", "show-required": false, "show-lead-icon": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Label", placeholder: "Placeholder", supporting: "Support text", "character-counter": "000/000" },
        markers: [
          { n: 1, target: ".cds-tf__label", side: "left" },
          { n: 2, target: ".cds-tf__control", side: "left" },
          { n: 3, target: ".cds-tf__box", side: "right" },
          { n: 4, target: ".cds-tf__msg", side: "left" },
          { n: 5, target: ".cds-tf__counter", side: "right" }
        ],
        legend: ["Text area label", "Placeholder", "Text area container", "Support text", "Counter"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Filled", type: "Variant", values: ["False", "True"] },
        { name: "Is Active", type: "Variant", values: ["False", "True"] },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Placeholder Content", type: "Text", values: ["Padrão: Placeholder"] },
        { name: "Text Content", type: "Text", values: ["Padrão: Hello"] },
        { name: "Required Text", type: "Text", values: ["Padrão: (Obrigatório)"] },
        { name: "Supporting Message", type: "Text", values: ["Padrão: Supporting Message"] },
        { name: "Error Message", type: "Text", values: ["Padrão: Error Message"] },
        { name: "Character Counter Value", type: "Text", values: ["Padrão: -0000"] },
        { name: "Show Label", type: "Boolean" },
        { name: "Show Required", type: "Boolean" },
        { name: "Show Supporting Content", type: "Boolean" },
        { name: "Show Character Counter", type: "Boolean" },
        { name: "Show Trailing Item", type: "Boolean" },
        { name: "Show Caret", type: "Boolean" }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados", items: [
        { label: "Enabled", attrs: { label: "Label", "show-required": true } },
        { label: "Hovered", attrs: { label: "Label", "show-required": true, state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", "show-required": true, state: "pressed" } },
        { label: "Disabled", attrs: { label: "Label", "show-required": true, disabled: true } }
      ] } },
      { specimens: { title: "Is Active · Is Filled · Appearance", items: [
        { label: "Is Active", attrs: { label: "Label", "show-required": true, "is-active": true } },
        { label: "Is Filled", attrs: { label: "Label", "show-required": true, value: "Hello" } },
        { label: "Warning", attrs: { label: "Label", "show-required": true, value: "Hello", appearance: "warning" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Descrição", "show-required": true, "required-text": "(obrigatório)", placeholder: "Digite uma descrição do plano" }, title: "Uso de label e suporte",
          text: "Sempre utilize label clara e objetiva acima do campo e, quando necessário, complemente com texto de suporte para orientar o preenchimento, indicar limites ou explicar o conteúdo esperado." },
        { attrs: { label: "Descrição", value: "Grupo para empresas de São Paulo", maxlength: "255" }, title: "Contador de caracteres",
          text: "Utilize o contador quando houver limite máximo de caracteres, ajudando a pessoa usuária a acompanhar o quanto ainda pode ser digitado e evitando frustrações no envio." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { value: "237933.8128600392.7681589000.0633 0898380000000200" },
          text: "Use o Text Area para textos extensos que exigem múltiplas linhas e facilitam a visualização, leitura e edição do conteúdo pela pessoa usuária." },
        { kind: "dont", attrs: [
            { _tag: "cds-text-input", label: "Nome", "required-text": "(obrigatório)", placeholder: "Digite o nome", "show-lead-icon": false },
            { _tag: "cds-text-input", label: "Descrição", "required-text": "(obrigatório)", placeholder: "Descreva em detalhes o plano a ser seguido", "show-lead-icon": false }
          ],
          text: "Não use Input Text para textos longos ou descritivos, pois ele limita a visualização do conteúdo e dificulta a revisão do que foi digitado." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Text Area no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
