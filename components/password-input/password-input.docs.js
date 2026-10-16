/* Documentação — Password Input
   Fonte: [CastanhaDS] Component use documentation · página Text fields · seção 4054:50 · frame [Documentação] Password input (4054:88)
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. Capa: o [Header] (4054:686) é um mockup de produto (imagem); sem o PNG exportado, a capa usa o componente vivo (C95).
   Oculto no Figma: Acessibilidade (4054:332) — só placeholder ("Tópico 1" / "Ordem de leitura"), então ficou de fora (note na tab).
   Motion ainda é placeholder (lorem ipsum / "Especificação").
   Diretrizes e Do/Don't no Figma são imagens: os exemplos usam o componente real com os textos padrão do componente (CONFERIR).
   O set do Figma desta doc usa Required "*" e contador "-0000"; o código segue a lib atual ("(Obrigatório)"). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["password-input"] = {
  tag: "cds-password-input",
  base: { label: "Label", supporting: "Supporting Message", error: "Error Message", "character-counter": "0000" },
  source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=4054-50",
  // Capa: o [Header] do Figma é um mockup (imagem) ainda não exportado → componente vivo com o base (C95)
  cover: { description: "O Password Input é um campo de entrada específico para senhas." },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Password Input é um campo de entrada específico para senhas. Ele inclui controle de visibilidade do conteúdo, mensagens de apoio, contador de caracteres e ícones opcionais para reforçar contexto ou ação." },
      { h3: "Nomes alternativos comuns" },
      { p: "Campo de Senha, Input de Senha." },
      { h3: "Princípios" },
      { cards: [
        ["Privacidade do conteúdo", "Garante que a senha permaneça protegida durante a digitação."],
        ["Controle e clareza", "Permite alternar entre mostrar e ocultar a senha de forma direta."],
        ["Consistência e orientação", "Mantém alinhamento visual e funcional com os demais inputs do sistema."]
      ] },
      { h2: "Quando usar" },
      { p: "Use quando o fluxo exigir entrada de informação sensível que deve ser mascarada e conferida com segurança." },
      { h3: "Utilize para:" },
      { ul: ["Fluxos de login, alteração de senha e campos sensíveis.", "Situações em que a pessoa usuária precisa controlar a exibição da senha."] },
      { h3: "Não utilize para:" },
      { ul: ["Informações não sensíveis que não exigem mascaramento.", "Códigos curtos ou segmentados, como OTP e PIN (Code input)."] },
      { h3: "Password Input vs Text Input" },
      { p: "O Password Input mascara o conteúdo e oferece controle de visibilidade, enquanto o Text Input exibe tudo abertamente." },
      { compare: [
        { title: "Este é um Password Input", attrs: { label: "Senha de 4 dígitos", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Text input", attrs: { _tag: "cds-text-input", label: "Novo número de celular com DDD", placeholder: "(00) 00000-0000", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } }
      ] },
      { h3: "Password Input vs Code input" },
      { p: "O Password Input é contínuo e adequado para senhas completas, enquanto Code input é segmentado e pensado para verificações pontuais." },
      { compare: [
        { title: "Este é um Password input", attrs: { label: "Senha", placeholder: "Digite a senha", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false } },
        { title: "Este é um Code input", attrs: { _tag: "cds-code-input", type: "numeric", value: "10835", separators: "none", "show-label": false, "show-supporting-content": false, "show-trailing-item": false } }
      ] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: {},
        markers: [
          { n: 1, target: ".cds-tf__lead", side: "left" },
          { n: 2, target: ".cds-tf__label", side: "top", align: "start" },
          { n: 3, target: ".cds-tf__control", side: "top" },
          { n: 4, target: ".cds-tf__box", side: "top", align: "end", long: true },
          { n: 5, target: "cds-icon-button", side: "right" },
          { n: 6, target: ".cds-tf__counter", side: "right" },
          { n: 7, target: ".cds-tf__msg", side: "left" }
        ],
        legend: ["Lead icon", "Text label", "Text placeholder", "Container", "Trailling item", "Counter", "Text supporting message"]
      } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled", "Hovered", "Pressed"] },
        { name: "Is Filled", type: "Variant", default: "False", values: ["False", "True"] },
        { name: "Is Active", type: "Variant", default: "False", values: ["False", "True"] },
        { name: "Show Content", type: "Variant", default: "True", values: ["True", "False"] },
        { name: "Show Label", type: "Boolean", default: "true" },
        { name: "Text Label", type: "Text" },
        { name: "Show Required", type: "Boolean", default: "true" },
        { name: "Required Text", type: "Text" },
        { name: "Show Lead Icon", type: "Boolean", default: "true" },
        { name: "Lead Icon", type: "Instance swap", default: "placeholder-line" },
        { name: "Placeholder Content", type: "Text" },
        { name: "Text Content", type: "Text" },
        { name: "Show Trailing Item", type: "Boolean", default: "true" },
        { name: "Show Supporting Content", type: "Boolean", default: "true" },
        { name: "Supporting Message", type: "Text" },
        { name: "Error Message", type: "Text" },
        { name: "Show Character Counter", type: "Boolean", default: "true" },
        { name: "Character Counter Value", type: "Text" },
        { name: "Show Caret", type: "Boolean", default: "true" }
      ] },
      { note: "Nomes, tipos e padrões exatos da lib estável (5798:2677), como o Figma escreve — a tabela da documentação antiga usava outros nomes (Style, Is filled…). Todas as props podem ser testadas na tab Playground." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Neutral", items: [
        { label: "Enabled", attrs: {} },
        { label: "Hovered", attrs: { state: "hovered" } },
        { label: "Pressed", attrs: { state: "pressed" } },
        { label: "Disabled", attrs: { disabled: true } }
      ] } },
      { specimens: { title: "Warning", items: [
        { label: "Enabled", attrs: { appearance: "warning" } },
        { label: "Hovered", attrs: { appearance: "warning", state: "hovered" } },
        { label: "Pressed", attrs: { appearance: "warning", state: "pressed" } },
        { label: "Disabled", attrs: { appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Acessibilidade" },
      { note: "Sem conteúdo no Figma para esta seção." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: [{ label: "Senha", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false }, { label: "Confirmar a senha", value: "P@ssword", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false }], title: "Use mensagens de apoio para orientar requisitos",
          text: "Forneça instruções claras sobre a criação da senha para evitar tentativas e erros." }
      ] },
      { note: "No Figma, os exemplos de comparação, diretriz e Do's and Don'ts são telas de produto. Aqui são os componentes reais com os mesmos textos (sem o resto da tela). A lista de requisitos da senha da diretriz não tem componente equivalente." },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { label: "Digite sua senha de 4 números", value: "123a", supporting: "A senha deve conter somente números", "show-required": false, "show-lead-icon": false, "show-character-counter": false },
          text: "Use a mensagem de apoio para orientar previamente que os detalhes e restrições para a criação da senha." },
        { kind: "dont", attrs: { label: "Digite sua senha de 4 números", value: "123a", "show-required": false, "show-lead-icon": false, "show-supporting-content": false, "show-character-counter": false },
          text: "Não deixe para informar essa restrição depois de um erro ou no envio do formulário." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O frame de Motion do Password Input no Figma ainda está com texto de exemplo (lorem ipsum e \"Especificação\"). A tabela de Motion tokens por estado entra quando o time publicar a especificação." } }
    ] }
  ]
};
