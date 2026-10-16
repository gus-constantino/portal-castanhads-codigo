/* Documentação — Chat Input (CDS-1594)
   Fonte: set Chat Input 26826:12925 na branch 4hJ90rFfuEyWx9zHeqJxp4 (description, annotations de Handoff, Accessibility e Motion)
   e o handoff dev de 14/10. Ainda não há página no zeroheight nem frame [Documentação] no arquivo de documentação.
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["chat-input"] = {
  tag: "cds-chat-input",
  base: { supporting: "Supporting Message", error: "Error Message" },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/4hJ90rFfuEyWx9zHeqJxp4/-CastanhaDS--Components?node-id=26826-12925",
  cover: { description: "Campo para escrever mensagens em conversas com IA e atendimento.",
    attrs: { "show-supporting-content": false } },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "informative", label: "Em desenvolvimento · CDS-1594", text: "O Chat Input está na branch do Figma e entra no Release 26. Ainda não existe no castanha-react nem no Flutter." } },
      { h2: "Sobre" },
      { p: "Campo para escrever mensagens em conversas com IA e atendimento. Aceita texto digitado ou ditado por voz e arquivos anexados, e cresce com o conteúdo." },
      { p: "Faz parte da família de text fields, sem label visível. Os anexos ficam numa linha que rola de lado, no topo. Abaixo, numa linha só: Anexar, o texto, Enviar e Ditar." },
      { h3: "Nomes alternativos comuns" },
      { p: "composer, message input, prompt input, caixa de mensagem, campo de chat." },
      { h3: "Princípios" },
      { cards: [
        ["Uma linha só", "Anexar, texto e ações dividem a mesma linha. O texto quebra a linha e os botões ficam alinhados pela base."],
        ["Voz como alternativa", "Ditar escreve no campo e a mensagem pode ser revisada antes de enviar. Digitar continua disponível o tempo todo."],
        ["Envio claro", "O Enviar fica disponível com texto ou anexo. Enter envia e Shift+Enter quebra a linha."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Chat Input na área de digitação de uma conversa, com IA ou com atendimento." },
      { h3: "Utilize para:" },
      { ul: ["Conversas com assistente de IA", "Chat de atendimento", "Respostas rápidas em uma conversa"] },
      { h3: "Não utilize para:" },
      { ul: ["Campo de formulário com rótulo visível — use o Text Area Input", "Busca — use o Search Input", "Mensagem de áudio — o Chat Input dita, não grava áudio"] }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { value: "Quero saber o saldo do meu cartão", attachments: "foto-do-cartao.jpg, extrato.pdf" },
        markers: [
          { n: 1, target: ".cds-tf__box", side: "left" },
          { n: 2, target: ".cds-tf__control", side: "top" },
          { n: 3, target: ".cds-chat__attach", side: "left" },
          { n: 4, target: ".cds-chat__send", side: "bottom" },
          { n: 5, target: ".cds-chat__voice", side: "right" },
          { n: 6, target: ".cds-tf__msg", side: "bottom" },
          { n: 7, target: ".cds-chat__att", side: "top", align: "start" }
        ],
        legend: ["Text Box", "Texto da mensagem", "Attach Button (opcional)", "Send Button", "Voice Button (opcional)", "Supporting ou Error Message (opcional)", "Attachments: chips dos arquivos (opcional)"]
      } },
      { h2: "Composição do componente" },
      { p: "O texto cresce até `Sizes/92` (cerca de 3 linhas) e rola sozinho. Os anexos ficam numa linha que rola de lado, sempre visível no topo. Attach, texto, Send e Voice ficam na mesma linha, com os botões alinhados pela base. Com anexos, o campo chega a no máximo 158. A altura muda sem animação. Os anexos são Input Chips Small num Chips Group Single Rows. As três ações são Icon Buttons Small do DS: Attach (Ghost Neutral), Send (Default Neutral) e Voice (Ghost Neutral, ou Ghost Accent com o stop durante o ditado)." },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Warning"] },
        { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
        { name: "Is Filled", type: "Variant", default: "False" },
        { name: "Is Active", type: "Variant", default: "False" },
        { name: "Is Listening", type: "Variant", default: "False" },
        { name: "Show Attachments", type: "Boolean", default: "false" },
        { name: "Show Attachment", type: "Boolean", default: "true" },
        { name: "Show Voice", type: "Boolean", default: "true" },
        { name: "Show Supporting Content", type: "Boolean", default: "true" },
        { name: "Show Character Counter", type: "Boolean", default: "true" },
        { name: "Show Trailing Item", type: "Boolean", default: "true" },
        { name: "Placeholder Content", type: "Text", values: ["Escreva uma mensagem"] },
        { name: "Listening Content", type: "Text", values: ["Ouvindo…"] }
      ] },
      { note: "`Is Listening=True` existe com o campo focado (`Is Active=True`) e fora de `Disabled`: ditar mantém o foco, e um campo desabilitado não ouve nem recebe texto. No código: `listening`, `listening-content`, `show-attachment`, `show-voice`, `accept`, `attachment-error` e os atributos da família. Anexos por `addAttachments()` ou pela propriedade `attachments`. Eventos `cds-send` (com o texto e os anexos), `cds-attach`, `cds-attachments-change` e `cds-listening-change`." },
      { h2: "Entrega para dev · CDS-1594" },
      { table: { head: ["Elemento", "Token ou valor (branch, 14/10)"], rows: [
        ["Text Box", "pad `Sizes/8` em cima, à direita e embaixo, `Sizes/16` à esquerda · gap `Sizes/2` · mín. `Sizes/56` · raio `Border/Radius/small`"],
        ["Texto", "`Body/Regular` · pad vertical `Sizes/8` · máx. `Sizes/92` · `Text/intense` · placeholder `Text/soft`"],
        ["Attachments", "Chips Group `Single Rows` (48) · Input Chips `Size=Small` (32) · ícone `image-file`, `file-line` ou `file-blank-line`"],
        ["Listening Content", "`Body/Regular` · `Text/medium`"],
        ["Ações", "Icon Button `Size=Small` (40) · gap `Sizes/4` · na linha do texto, alinhadas pela base"],
        ["Error Message", "`warning-line` 16 antes da mensagem (Show Trailing Item) · gap `Sizes/4`"],
        ["Voice Button no ditado", "`Kind=Ghost` · `Appearance=Accent` · `stop-filled`"]
      ] } },
      { ul: [
        "Voz é ditado: a fala vira texto no campo. Não existe gravação, preview nem envio de áudio.",
        "Digitar não liga a voz. Perder o foco ou desabilitar o campo encerra o ditado.",
        "Enviar fica disponível com texto ou anexo. Durante o ditado, o Send Button sai e fica o botão de parar. Enter envia e encerra o ditado. Enviar limpa texto, anexos e o Warning: o campo volta a Neutral, vazio e focado.",
        "Enter envia e Shift+Enter quebra a linha.",
        "Permissão do microfone negada: `Appearance=Warning` com Error Message pedindo acesso. A digitação segue funcionando.",
        "Anexos vão junto com a mensagem, sem progresso no composer. Arquivo fora do `accept` não vira chip: o campo vai para Warning com a Error Message curta.",
        "Toque no chip remove o arquivo e o foco vai para o chip seguinte, ou para o campo. Nome longo é encurtado no meio, mantendo a extensão.",
        "Pendente de produto: quantidade máxima, tipos e tamanho dos anexos."
      ] }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Estilos" },
      { specimens: { title: "Estados do campo", items: [
        { label: "Enabled", attrs: { "show-supporting-content": false } },
        { label: "Hovered", attrs: { "show-supporting-content": false, state: "hovered" } },
        { label: "Pressed", attrs: { "show-supporting-content": false, state: "pressed" } },
        { label: "Is Active", attrs: { "show-supporting-content": false, "is-active": true } }
      ] } },
      { specimens: { title: "Conteúdo", items: [
        { label: "Is Filled", attrs: { "show-supporting-content": false, value: "Quero saber o saldo do meu cartão" } },
        { label: "Is Listening, vazio", attrs: { "show-supporting-content": false, "is-active": true, listening: true } },
        { label: "Is Listening, com texto", attrs: { "show-supporting-content": false, "is-active": true, listening: true, value: "Quero saber o saldo" } },
        { label: "Sem anexo e sem voz", attrs: { "show-supporting-content": false, "show-attachment": "false", "show-voice": "false" } }
      ] } },
      { specimens: { title: "Anexos", items: [
        { label: "Um anexo, sem texto", attrs: { "show-supporting-content": false, attachments: "foto-do-cartao.jpg" } },
        { label: "Texto e vários anexos", attrs: { "show-supporting-content": false, value: "Seguem os documentos", attachments: "rg.jpg, cpf.pdf, extrato.pdf, notas.xlsx" } },
        { label: "Arquivo recusado", attrs: { appearance: "warning", error: "Envie imagem ou PDF.", value: "Segue o comprovante", attachments: "comprovante.pdf" } },
        { label: "Nome longo", attrs: { "show-supporting-content": false, attachments: "comprovante-de-endereco-atualizado.pdf" } }
      ] } },
      { specimens: { title: "Appearance × State", items: [
        { label: "Neutral · Enabled", attrs: {} },
        { label: "Neutral · Disabled", attrs: { disabled: true } },
        { label: "Warning · Enabled", attrs: { appearance: "warning" } },
        { label: "Warning · Disabled", attrs: { appearance: "warning", disabled: true } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { h3: "Como é anunciado" },
      { ol: [
        "O campo não tem label visível. O nome vem do atributo `label` (`aria-label`, padrão Mensagem). O placeholder não substitui o nome.",
        "Cada ação tem nome próprio: Anexar arquivo, Enviar mensagem e Ditar mensagem.",
        "O Voice Button é um botão de alternância (`aria-pressed`). Durante o ditado o nome muda para Parar ditado.",
        "O início e o fim do ditado são anunciados por região dinâmica: Ouvindo e Ditado encerrado.",
        "Cada chip de anexo tem o nome completo do arquivo e a ação: Remover comprovante.pdf. A extensão confirma o tipo que o ícone mostra.",
        "Ao remover um chip, o foco vai para o chip seguinte, ou para o campo. Arquivo adicionado, removido ou recusado é anunciado.",
        "O Enviar sem conteúdo é anunciado como indisponível.",
        "A Error Message é anunciada assim que aparece (`role=\"alert\"`)."
      ] },
      { h3: "Ordem de leitura" },
      { ol: ["Chips de anexo, quando houver", "Anexar arquivo, quando presente", "Campo da mensagem (valor ou placeholder)", "Enviar mensagem, fora do ditado", "Ditar mensagem, quando presente", "Mensagem de apoio ou de erro"] },
      { h3: "Teclado" },
      { table: { head: ["Tecla", "Ação"], rows: [["Enter", "Envia a mensagem"], ["Shift+Enter", "Quebra a linha"], ["Tab", "Chips, Anexar, campo, Enviar e Ditar, nessa ordem"], ["Espaço ou Enter num botão", "Aciona o botão"]] } },
      { h3: "Contraste (WCAG)" },
      { ol: [
        "Texto e ícones: 15,3:1 a 17:1 — AAA.",
        "Listening Content e mensagem de apoio (`Text/medium`): 8,2:1 — AAA.",
        "Warning (#974602): 6,4:1 — AA.",
        "Stop do ditado (Accent #e80537): 4,5:1 no fundo e 4,1:1 no hover — acima de 3:1 para ícone.",
        "Placeholder e contador (`Text/soft`): 2,78:1 e borda em repouso 1,25:1, herança da família (CONFERIR).",
        "Estado desabilitado: isento do critério 1.4.3.",
        "Botões de 40×40 e chips de 32 de altura: acima do alvo mínimo de 24×24 (2.5.8)."
      ] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes" },
      { guides: [
        { attrs: { "show-supporting-content": false, value: "Quero saber o saldo do meu cartão" }, title: "Mantenha o Enviar visível",
          text: "O Send Button não tem boolean para esconder. Ele fica indisponível sem texto e disponível assim que a mensagem tem conteúdo. Sai só durante o ditado, quando o botão de parar ocupa o lugar." },
        { attrs: { "show-supporting-content": false, "is-active": true, listening: true }, title: "Ofereça o ditado como alternativa",
          text: "A voz escreve no campo e a pessoa revisa antes de enviar. Nunca deixe o ditado como único meio de escrever." },
        { attrs: { appearance: "warning", error: "Permita o acesso ao microfone para ditar." }, title: "Explique a permissão negada",
          text: "Sem acesso ao microfone, mostre a Error Message com o próximo passo. A digitação continua disponível." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { "show-supporting-content": false }, text: "Placeholder curto, em uma linha, que convida a escrever." },
        { kind: "dont", attrs: { "show-supporting-content": false, placeholder: "Digite aqui a sua mensagem com todos os detalhes do seu pedido" },
          text: "Placeholder longo: ele é truncado e não substitui o nome acessível." },
        { kind: "do", attrs: { "show-supporting-content": false, "show-attachment": "false" }, text: "Esconda o Anexar quando o produto não aceita arquivos." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "As transições de estado usam os Motion Styles do Castanha (modo Normal)." },
      { display: { attrs: { "show-supporting-content": false }, live: true } },
      { note: "Exemplo interativo: passe o mouse sobre o texto, pressione, foque o campo e ligue a voz para ver cada transição. Hover e press são da área do texto: sobre os botões e os chips, cada um tem o próprio. Digitar, transcrever e anexar não têm animação, e a altura muda sem animação." },
      { specs: [
        { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
        { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
        { title: "Pressed → Is Active", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
        { title: "Pressed → Enabled (campo já focado)", rows: [["Gatilho", "On tap"], ["Motion Style", "`Released/01`"]] },
        { title: "Voice Button liga o ditado", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected In/01`"]] },
        { title: "Voice Button desliga o ditado", rows: [["Gatilho", "On tap"], ["Motion Style", "`Selected Out/01`"]] },
        { title: "Enter ou Send Button envia", rows: [["Gatilho", "On tap · Enter"], ["Motion Style", "`Selected Out/01`"]] }
      ] }
    ] }
  ]
};
