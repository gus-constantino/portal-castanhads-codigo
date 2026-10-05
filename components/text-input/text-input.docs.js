/* Documentação — Text Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 5308:2266 · frame [Documentação] Text input (5308:2304)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Capa: o [Header] Text input (5308:2902) é um mockup de produto (imagem); sem o PNG exportado, a capa usa o componente vivo (C95).
   Oculto no Figma: Acessibilidade (5308:2548), só com placeholder ("Tópico 1" / "Ordem de leitura") → tab com nota de sem conteúdo.
   Clear Button (prop "Show clear button" e item 5 da anatomia) é legado da doc: a lib atual (5743:325) não tem; ignorado (C96).
   Gaps: Required Asterisk
   e o Required vira "*" via required-text. Diretrizes e Do/Don't no Figma são imagens de mockup: aqui são recriados com o componente.
   Motion ainda é placeholder (lorem ipsum / "Especificação"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["text-input"] = {
  tag: "cds-text-input",
  base: { label: "Label", "required-text": "*", supporting: "Supporting Message", "character-counter": "-0000" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=5308-2266",
  // Capa: o [Header] do Figma é um mockup (imagem) ainda não exportado → componente vivo com o base (C95)
  cover: {
    description: "O Text Input é um campo de entrada para coleta de informações textuais curtas fornecidas pela pessoa usuária."
  },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Text Input é um campo de entrada para coleta de informações textuais curtas fornecidas pela pessoa usuária. É utilizado para capturar qualquer informação digitável em linha única." },
      { h3: "Nomes alternativos comuns" },
      { p: "Campo de texto, campo de entrada, input de texto." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "O campo deve comunicar de forma objetiva o que se espera que a pessoa usuária insira, por meio de label, placeholder e mensagens auxiliares consistentes."],
        ["Previsibilidade", "O comportamento deve seguir padrões conhecidos de interação (foco, erro, sucesso, desabilitado), reduzindo esforço cognitivo e evitando surpresas."],
        ["Feedback imediato", "Validações, erros e estados devem ser apresentados de forma contextual e no momento adequado, apoiando a pessoa usuária na conclusão da tarefa."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Text Input quando for necessário coletar uma informação textual curta e específica em um formulário ou fluxo, especialmente quando a pessoa usuária precisa digitar manualmente o conteúdo e não há uma lista pré-definida de opções que possa ser apresentada por meio de seleção." },
      { h3: "Utilize para:" },
      { ul: ["Inserção de nome, sobrenome ou apelido", "E-mail", "CPF, CNPJ ou outros identificadores", "Código promocional", "Informações curtas de identificação"] },
      { h3: "Não utilize para:" },
      { ul: ["Seleção entre opções pré-definidas (use Select input ou Selection List)", "Respostas longas e descritivas (use Text Area)", "Escolhas múltiplas com visualização de alternativas simultâneas", "Filtros rápidos de navegação"] },
      { h3: "Text Area vs Text input" },
      { p: "O Text input é indicado para textos curtos e objetivos, enquanto o Text Area deve ser usado quando a pessoa usuária precisa escrever conteúdos mais longos, com múltiplas linhas e maior flexibilidade de visualização." },
      { compare: [
        { title: "Este é um Text area", attrs: { _tag: "cds-text-area", label: "Descrição da solicitação", placeholder: "Explique o contexto ou a situação",
            "show-required": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Text input", attrs: { label: "Título da solicitação", placeholder: "Digite o título",
            "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { value: "Hello" },
        markers: [
          { n: 1, target: ".cds-tf__label > span:first-child", side: "left" },
          { n: 2, target: ".cds-tf__req", side: "top" },        // Figma: seta de cima (Down)
          { n: 3, target: ".cds-tf__lead", side: "left" },
          { n: 4, target: ".cds-tf__control", side: "right" },  // Figma: seta de cima (Down)
          { n: 5, target: ".cds-tf__msg", side: "left" },       // Figma: 6
          { n: 6, target: ".cds-tf__counter", side: "bottom" }  // Figma: 7
        ],
        legend: ["Label Content", "Required Asterisk", "Lead Icon", "Text Content", "Supporting Message", "Character Counter"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Style", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is filled", type: "Boolean" },
        { name: "Is active", type: "Boolean" },
        { name: "Show label content", type: "Boolean" },
        { name: "Label content", type: "Text", values: ["Padrão: Label"] },
        { name: "Show required asterisk", type: "Boolean" },
        { name: "Show lead icon", type: "Boolean" },
        { name: "Text content", type: "Text", values: ["Padrão: Hello"] },
        { name: "Show supporting message", type: "Boolean" },
        { name: "Supporting message", type: "Text", values: ["Padrão: Supporting message"] },
        { name: "Show character counter", type: "Boolean" },
        { name: "Character counter value", type: "Text", values: ["Padrão: -0000"] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Kind · Accent", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } },
        { label: "Is filled", attrs: { value: "Hello" } },
        { label: "Is active", attrs: { "is-active": true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Titular da conta", placeholder: "Insira o nome completo do titular", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Escreva labels claras e específicas",
          text: "Prefira labels objetivas que descrevam exatamente o dado esperado, evitando termos genéricos como “Informação” ou “Digite aqui”." },
        { attrs: { label: "Insira o CPF ou CNPJ", placeholder: "000.000.000-00", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Evite depender apenas de placeholder",
          text: "O placeholder não substitui o label. Ele deve complementar a orientação, oferecendo exemplo de formato quando necessário." },
        { attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Insira um formato de chave válido.", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          title: "Valide no momento certo",
          text: "Apresente mensagens de erro de forma contextual, preferencialmente após interação da pessoa usuária, evitando bloquear a digitação prematuramente." },
        { attrs: { label: "CPF", mask: "cpf", value: "12345678910", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          title: "Defina tipo e máscara corretamente",
          text: "Sempre que possível, utilize o tipo apropriado (ex: e-mail, número) e máscaras coerentes para reduzir erros e facilitar o preenchimento." }
      ] },
      { note: "No Figma, os exemplos das diretrizes e dos Do's and Don'ts são imagens de tela; aqui são o Text Input real com os mesmos textos (sem o título da tela)." },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Insira um formato de chave válido.", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Sempre forneça mensagem de erro específica" },
        { kind: "dont", attrs: { label: "Insira a chave Pix", value: "abc", appearance: "warning", error: "Campo inválido", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Não exiba erro genérico como “Campo inválido” sem contexto" }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Text Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\" para Easing e Duration de Enabled, Hovered, Pressed e Loading). A tabela de Motion Styles por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
