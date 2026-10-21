/* Documentação — Quantity Input (sem o [Beta] no Figma desde 21/10; nomes alternativos e Não utilize para conferidos com a description do set 22756:7351)
   Fonte: [CastanhaDS] Component use documentation · seção 6945:5832 · frame [Documentação] Quantity Input (6945:4705)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs.
   Oculto no Figma: Composição do componente (tem conteúdo real → entra na Anatomia); Acessibilidade (só placeholder
   "Tópico 1 / Ordem de leitura" → fica de fora, tab com nota); Frame 7 "Casos de exceção" das Diretrizes (lorem ipsum → de fora).
   Prefixo (R$), casas decimais e milhar ("1.250") entraram no componente (C100, aprovado);
   anatomia: 2 vem de cima (como no Figma); 4 embaixo e 6 à direita para não cruzar o + (C100).
   Motion ainda é placeholder no Figma. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["quantity-input"] = {
  tag: "cds-quantity-input",
  base: {},
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6945-5832",
  // Capa (frame [Header] Quantity input do Figma), acima das tabs
  cover: { description: "O Quantity Input é um campo numérico com controles de incremento e decremento.",
    attrs: { label: "Quantidade de ingressos", value: "1", "show-required": false, supporting: "Máximo de 6 ingressos por compra." } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Quantity Input é um campo numérico com controles de incremento e decremento. É utilizado para ajustar valores em passos previsíveis, pelos botões ou por digitação direta. O conteúdo aceita número puro ou acompanhado de unidade, como porcentagem, quantidade ou valor monetário." },
      { h3: "Nomes alternativos comuns" },
      { p: "Number input, numeric stepper, counter, quantity selector, seletor de quantidade, contador." },
      { h3: "Princípios" },
      { cards: [
        ["Previsibilidade", "Cada acionamento altera o valor na mesma medida, e a faixa aceita é conhecida antes da interação."],
        ["Controle compartilhado", "A pessoa usuária ajusta pelos botões quando a variação é pequena e digita quando quer chegar direto ao valor."],
        ["Limite visível", "Ao atingir o mínimo ou o máximo, o controle correspondente fica indisponível, comunicando a fronteira sem recorrer a mensagem de erro."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Quantity Input quando for necessário ajustar um valor numérico dentro de uma faixa conhecida, especialmente quando a pessoa usuária altera poucas unidades por vez e precisa acompanhar o valor atual enquanto ajusta." },
      { h3: "Utilize para:" },
      { ul: ["Quantidade de itens em uma solicitação", "Número de dias, parcelas ou ciclos", "Nível de zoom ou escala", "Ajustes finos em torno de um valor padrão"] },
      { h3: "Não utilize para:" },
      { ul: ["Seleção entre opções pré-definidas (use Select input)", "Saltos grandes dentro de faixas amplas (use Text input)", "Valores aproximados ou contínuos (use Slider)", "Valores de leitura, sem edição (use Currency)", "Entrada de texto ou códigos (use Text input ou Code input)"] },
      { h3: "Text input vs Quantity Input" },
      { p: "Use o Quantity Input quando o valor varia em passos previsíveis e a pessoa usuária ajusta poucas unidades por vez — especialmente quando acompanhar o valor durante o ajuste faz parte da tarefa. O Text input é indicado para valores numéricos sem faixa definida ou com variação ampla, desde que digitar seja o caminho natural de preenchimento." },
      { compare: [
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Quantidade", "show-required": false, "show-supporting-content": false } },
        { title: "Este é um Quantity Input", attrs: { label: "Quantidade", value: "3", "show-required": false, "show-supporting-content": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { label: "Label", value: "1", supporting: "Supporting Message" },
        markers: [
          { n: 1, target: ".cds-tf__label > span:first-child", side: "left" },
          { n: 2, target: ".cds-tf__label > span:last-child", side: "top" },   // Figma: de cima (Down)
          { n: 3, target: ".cds-qty__row > cds-icon-button:first-child", side: "left" },
          { n: 4, target: ".cds-qty__box", side: "right" },
          { n: 5, target: ".cds-qty__control", side: "bottom" },
          { n: 6, target: ".cds-qty__row > cds-icon-button:last-child", side: "bottom" },
          { n: 7, target: ".cds-qty__msg", side: "left" }
        ],
        legend: ["Label Content", "Required Asterisk", "Decrement Button", "Text Box", "Quantity Value", "Increment Button", "Supporting Message"]
      } },
      { h2: "Composição do componente" },
      { p: "O controle é formado pelos botões de decremento e incremento e pelo campo de valor, que são obrigatórios. Label, indicação de obrigatório e mensagem de apoio são opcionais e controlados por `Show Label`, `Show Required` e `Show Supporting Content`." },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", values: ["Default", "Ghost"] },
        { name: "Appearance", type: "Variant", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Active", type: "Boolean" },
        { name: "Show Label", type: "Boolean" },
        { name: "Text Label", type: "Text", values: ["Padrão: Label"] },
        { name: "Show Required", type: "Boolean" },
        { name: "Required Text", type: "Text", values: ["Padrão: (Obrigatório)"] },
        { name: "Quantity Value", type: "Text", values: ["Padrão: 1"] },
        { name: "Show Supporting Content", type: "Boolean" },
        { name: "Supporting Message", type: "Text", values: ["Padrão: Supporting Message"] },
        { name: "Error Message", type: "Text", values: ["Padrão: Error Message"] }
      ] },
      { note: "Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Kind: Default", items: [
        { label: "Enabled", attrs: { label: "Label", supporting: "Supporting Message" } },
        { label: "Hovered", attrs: { label: "Label", supporting: "Supporting Message", state: "hovered" } },
        { label: "Pressed", attrs: { label: "Label", supporting: "Supporting Message", state: "pressed" } },
        { label: "Disabled", attrs: { label: "Label", supporting: "Supporting Message", disabled: true } }
      ] } },
      { specimens: { title: "Kind: Ghost", items: [
        { label: "Enabled", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message" } },
        { label: "Hovered", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", state: "hovered" } },
        { label: "Pressed", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", state: "pressed" } },
        { label: "Disabled", attrs: { kind: "ghost", label: "Label", supporting: "Supporting Message", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { label: "Dias de antecedência", value: "15", min: "10", max: "30", "show-required": false, supporting: "Entre 10 e 30 dias" }, title: "Informe a faixa aceita antes do erro",
          text: "Use a mensagem de apoio para comunicar o mínimo e o máximo. Explicar a faixa evita o estranhamento quando o valor digitado é ajustado automaticamente." },
        { attrs: { label: "Quantidade", value: "10", min: "10", "show-required": false, supporting: "Mínimo de 10 unidades" }, title: "Indique o limite pelo controle",
          text: "Ao atingir o mínimo ou o máximo, deixe o controle correspondente indisponível e mantenha o outro ativo." },
        { attrs: [
            { value: "1", "show-label": false, "show-supporting-content": false },
            { value: "2", "show-label": false, "show-supporting-content": false },
            { value: "3", "show-label": false, "show-supporting-content": false }
          ], title: "Mantenha o passo constante",
          text: "O incremento e o decremento alteram o valor sempre na mesma medida. Passo variável quebra a previsibilidade do controle." },
        { attrs: [{ kind: "ghost", value: "100", suffix: "%", "show-label": false, "show-supporting-content": false },
                   { kind: "ghost", value: "5", prefix: "R$", decimals: "2", "show-label": false, "show-supporting-content": false }], title: "Escreva a unidade junto do valor",
          text: "O conteúdo do campo é texto e aceita o número sozinho ou acompanhado de unidade, desde que o caráter seja numérico. A unidade fica no próprio campo, nunca em elemento separado. Siga a formatação da casa: 100%, R$ 5,00, 1.000." },
        { attrs: [
            { value: "2", "show-label": false, "show-supporting-content": false },
            { kind: "ghost", value: "2", "show-label": false, "show-supporting-content": false }
          ], title: "Escolha o Kind pelo contexto",
          text: "Use Default em formulários, onde o preenchimento dos controles reforça a área acionável ao lado do campo. Use Ghost em barras de ferramentas e superfícies densas, onde o preenchimento competiria com os elementos vizinhos." }
      ] },
      { h2: "Do's and Don'ts" },
      { h3: "Conteúdo" },
      { dodont: [
        { kind: "do", attrs: { label: "Dias de antecedência", value: "15", "show-required": false, supporting: "Entre 10 e 30 dias" },
          text: "Informe o mínimo e o máximo na mensagem de apoio." },
        { kind: "dont", attrs: { label: "Dias de antecedência", value: "15", "show-required": false, "show-supporting-content": false },
          text: "Não espere a correção automática do valor para a pessoa usuária descobrir o limite." }
      ] },
      { h3: "Escolha do componente" },
      { dodont: [
        { kind: "do", attrs: { label: "Quantidade", value: "3", "show-required": false, "show-supporting-content": false },
          text: "Use para ajustes de poucas unidades por vez." },
        { kind: "dont", attrs: { label: "Quantidade", value: "1250", "show-required": false, "show-supporting-content": false },
          text: "Não use quando a pessoa usuária precisa saltar dezenas ou centenas de unidades. Use o Text input." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Quantity Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion tokens por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
