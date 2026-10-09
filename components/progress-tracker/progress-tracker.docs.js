/* Documentação — Progress Tracker
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Progress Tracker, 384247) e props/description da lib estável (Progress Tracker 21470:2390); tab Conteúdo abaixo.
   A lib tem Orientation Vertical|Horizontal; o código só faz a Vertical (CONFERIR C150).
   Conteúdo (regras de texto):
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Stepper (6400:16333);
   desde 09/10 com "Progress Tracker" no lugar de "stepper", como no zeroheight. Diretrizes com as notas dos frames 6795:23325…24311.
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  function step(label, more){ return Object.assign({ _tag: "cds-progress-tracker-item", label: label, "show-description": false, "show-link": false }, more || {}); }
  function tracker(current, labels, more){ return Object.assign({ _tag: "cds-progress-tracker", current: String(current), _children: labels.map(function(l){ return step(l); }) }, more || {}); }
  var STEPS = ["Identificação", "Documentos", "Revisão", "Pagamento"];
  CDS.docs["progress-tracker"] = {
    tag: "cds-progress-tracker",
    base: { current: "2", _children: STEPS.map(function(l){ return step(l); }) },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/384247", sourceLabel: "Abrir o Progress Tracker no zeroheight",
    cover: { description: "Indica o avanço de uma pessoa em um fluxo de múltiplas etapas, mostrando o que já foi concluído, onde ela está e o que ainda falta.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Indica o avanço de uma pessoa em um fluxo de múltiplas etapas, mostrando o que já foi concluído, onde ela está e o que ainda falta. Use quando o fluxo tem etapas nomeadas e a pessoa precisa se localizar dentro dele." },
        { h3: "Nomes alternativos comuns" },
        { p: "Stepper, Step indicator, Wizard steps, Progress steps." },
        { h3: "Princípios" },
        { cards: [
          ["Uma etapa atual por vez", "O fluxo tem um único ponto presente. Tudo antes dele está concluído, tudo depois está pendente. Essa leitura depende de a sequência ser respeitada."],
          ["Posição, não navegação", "O Progress Tracker informa onde a pessoa usuária está, sem oferecer caminho. Quando uma etapa tem ação, ela vem do Link, não do componente."],
          ["Etapas nomeadas, não porcentagem", "Cada etapa tem rótulo próprio e significado. Progresso sem nome de etapa pede outro tipo de indicador."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Progress Tracker quando o fluxo tem etapas nomeadas em ordem definida e a pessoa usuária precisa se localizar dentro dele, sabendo quanto já avançou e quanto ainda falta." },
        { h3: "Utilize para:" },
        { ul: ["Fluxos de várias telas com etapas nomeadas, como cadastro ou onboarding", "Acompanhamento do andamento de uma solicitação", "Situações em que a ordem das etapas é fixa e conhecida"] },
        { h3: "Não utilize para:" },
        { ul: ["Progresso contínuo de uma única tarefa, como carregamento ou upload", "Organizar conteúdo paralelo sem ordem definida (utilize o Tabs)", "Navegar entre níveis de hierarquia (utilize o Breadcrumb)", "Fluxos com ordem variável ou etapas opcionais", "Sinalizar erro ou reprovação de etapa"] },
        { h2: "Casos de uso" },
        { h3: "Progress Tracker vs. Breadcrumb" },
        { p: "Exemplo: numa tela de abertura de conta, o breadcrumb mostra \"Início > Conta > Abertura\" (onde a pessoa está na estrutura do app). O progress tracker na mesma tela mostra \"1. Identificação 2. Documentos 3. Revisão 4. Pagamento\" (quanto falta para concluir o fluxo)." },
        { compare: [
          { title: "Breadcrumb", attrs: { _tag: "cds-breadcrumb", collapse: "0", _children: [{ _tag: "a", href: "#", _text: "Início" }, { _tag: "a", href: "#", _text: "Conta" }, { _tag: "a", href: "#", _text: "Abertura" }] } },
          { title: "Progress Tracker", attrs: {} }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { current: null, _children: [step("Identificação", { status: "completed", "marker-label": "1" }), step("Documentos", { status: "current", "marker-label": "2", "show-description": true, description: "Envie um documento com foto", "show-link": true, "link-label": "Ver documentos aceitos" }), step("Revisão", { "marker-label": "3", "show-connector": false })] }, markers: [{ n: 1, target: "cds-progress-tracker-item:nth-child(2) .cds-pti__mark", side: "left" }, { n: 2, target: "cds-progress-tracker-item:first-child .cds-pti__conn", side: "left" }, { n: 3, target: "cds-progress-tracker-item:nth-child(2) .cds-pti__label", side: "right" }, { n: 4, target: "cds-progress-tracker-item:nth-child(2) .cds-pti__desc", side: "right" }, { n: 5, target: "cds-progress-tracker-item:nth-child(2) .cds-pti__link", side: "right" }], legend: ["Marcador — número ou ícone, conforme Kind", "Conector — traço que liga a etapa à seguinte", "Rótulo — nome da etapa", "Descrição — texto de apoio, opcional", "Link — ação da etapa, opcional"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Orientation", type: "Variant", default: "Vertical", values: ["Vertical", "Horizontal"] },
          { name: "Tracker", type: "Slot", default: "—" }
        ] },
        { note: "Slot — recebe de 2 a 6 instâncias de Progress Tracker Item. No código: os filhos `<cds-progress-tracker-item>` são as etapas. `current` (1, 2, 3…) calcula os status (antes = Completed, depois = Pending), numera os marcadores e tira o Connector do último. `label` dá o nome da lista (\"Progresso\"). `orientation` (vertical|horizontal) — no Figma o container não propaga a Orientation para o Slot, aqui o container aplica a mesma aos itens." },
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Orientation" },
        { p: "Orientation=Vertical — etapas empilhadas, com o rótulo ao lado do marcador. Suporta descrição e link em cada etapa. Largura fixa de 200px. Orientation=Horizontal — etapas lado a lado, com o rótulo abaixo do marcador. Indicado para rótulos breves. A largura acompanha o conteúdo, então avalie o espaço disponível antes de usar em telas estreitas." },
        { compare: [
          { title: "Vertical", attrs: {} },
          { title: "Horizontal", attrs: { orientation: "horizontal", current: "2", _children: ["Identificação", "Documentos", "Revisão"].map(function(l){ return step(l); }) } }
        ] },
        { h2: "Progress Tracker Item" },
        { specimens: { min: "calc(2 * var(--common-sizes-120))", items: [
          { label: "Pending", attrs: { _tag: "cds-progress-tracker-item", label: "Revisão", "marker-label": "3", "show-link": false, "show-connector": false } },
          { label: "Current", attrs: { _tag: "cds-progress-tracker-item", status: "current", label: "Documentos", "marker-label": "2", "show-link": false, "show-connector": false } },
          { label: "Completed", attrs: { _tag: "cds-progress-tracker-item", status: "completed", label: "Identificação", "show-link": false, "show-connector": false } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "A lista tem `role=\"list\"` com nome (`label`, padrão \"Progresso\"). Cada etapa é um item da lista.",
          "Cada etapa é lida com o número e o status antes do rótulo (ex.: \"Etapa 2, atual: Documentos\"). A etapa atual tem `aria-current=\"step\"`.",
          "O marcador e o conector são decorativos. O status não depende exclusivamente da cor.",
          "A etapa não é clicável. O Link é o único elemento interativo e entra na ordem do `Tab`."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Rótulo (Text/intense) 16,96:1 e descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Marcador: número 13,56:1 (Pending) e 16,96:1 (Current). Check do Completed (Icons/inversed sobre Surface/accent) 4,54:1.", "Anel do Current e marcador Completed (Accent) 4,54:1 sobre Surface/default — acima de 3:1.", "Marcador Pending (Neutral/Solid/semi-soft) e conector neutro 1,25:1 sobre Surface/default — abaixo de 3:1. O status também vem no texto lido pelo leitor de tela."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { cards: [
          ["Mantenha uma única etapa atual", "Apenas uma etapa fica em Status=Current. As anteriores ficam em Completed e as seguintes em Pending. O componente não impede outra combinação, então a consistência é responsabilidade de quem monta."],
          ["Numere as etapas na ordem em que aparecem", "O Marker label é texto livre. O número precisa refletir a posição da etapa, e a última fica sempre com Show Connector=false."],
          ["Escreva rótulos curtos, sobretudo na horizontal", "Na orientação horizontal, o rótulo fica abaixo do marcador e divide a largura com as demais etapas. Rótulo longo desalinha a leitura de uma etapa para a outra."],
          ["Case a orientação do container e das etapas", "Orientation existe no container e em cada etapa, e o container não propaga o valor. Container horizontal com etapas verticais monta sem erro e quebra o layout."],
          ["Avalie o espaço antes de usar seis etapas na horizontal", "O componente aceita de 2 a 6 etapas nas duas orientações. Na horizontal, seis etapas chegam a 1114px de largura e não cabem em telas estreitas. As mesmas seis na vertical ocupam 200px. Reduza a quantidade de etapas ou escolha a vertical quando a largura for limitada."]
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: {}, text: "Use o mesmo Kind em todas as etapas do tracker." },
          { kind: "dont", attrs: { current: null, _children: [step("Identificação", { status: "completed", "marker-label": "1" }), step("Documentos", { status: "current", kind: "icon", "marker-icon": "file-line" }), step("Revisão", { "marker-label": "3", "show-connector": false })] }, text: "Não use Number em algumas etapas e Icon em outras — o marcador deixa de ser comparável entre elas." },
          { kind: "do", attrs: { current: null, _children: [step("Identificação", { status: "completed", "marker-label": "1" }), step("Documentos", { status: "current", "marker-label": "2", "show-link": true, "link-label": "Ver documentos aceitos" }), step("Revisão", { "marker-label": "3", "show-connector": false })] }, text: "Reserve o Link para a etapa que tem ação de verdade." },
          { kind: "dont", attrs: { current: null, _children: [step("Identificação", { status: "completed", "marker-label": "1", "show-link": true, "link-label": "Editar" }), step("Documentos", { status: "current", "marker-label": "2", "show-link": true, "link-label": "Enviar" }), step("Revisão", { "marker-label": "3", "show-connector": false, "show-link": true, "link-label": "Ver" })] }, text: "Não use Link em todas as etapas, competindo com a leitura do progresso." },
          { kind: "do", attrs: {}, text: "Use o Progress Tracker quando as etapas têm nome e ordem." },
          { kind: "dont", attrs: { _tag: "cds-spinner" }, text: "Não use o Progress Tracker para carregamento sem etapas definidas — utilize o Spinner ou o Skeleton." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Progress Tracker não tem estados de interação próprios. O Link segue o Motion do Link." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight traz o texto modelo de Motion, com a tabela vazia. Sem especificação para a troca de etapa (CONFERIR C150)." } }
      ] },

      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O Progress Tracker comunica o progresso dentro de um fluxo com etapas definidas. Ele orienta a pessoa sobre o que ainda falta para concluir um fluxo." },
        { h3: "Como nomear as etapas" },
        { p: "Use substantivos, nunca verbos. Transforme a ação em nominalização: o Progress Tracker representa uma etapa, não uma instrução. Exemplo:" },
        { table: { wrap: true, head: ["Ação", "Etapa"], rows: [["Revisar", "Revisão"], ["Identificar", "Identificação"], ["Pagar", "Pagamento"]] } },
        { ul: [
          "Nomeie as etapas do ponto de vista da pessoa usuária — o que ela está fazendo, não o que o sistema faz.",
          "O nome da etapa no Progress Tracker deve estar alinhado ao H1 da página correspondente. O H1 pode usar verbo, mas o termo principal precisa ser o mesmo. Se a etapa é \"Revisão\", o H1 pode ser \"Revise seus dados\"."
        ] },
        { h3: "Regras de escrita" },
        { ul: [
          "Primeira letra maiúscula, demais em minúsculo.", "Sem ponto final ou qualquer outra pontuação.",
          "Use no máximo 3 palavras por etapa. O espaço é reduzido, seja direto.",
          "Mantenha o mesmo padrão gramatical em todas as etapas do mesmo fluxo. Não misture substantivos com verbos."
        ] },
        { h3: "Progress Tracker vs. Breadcrumb" },
        { p: "O Progress Tracker comunica progresso dentro de um fluxo linear. O breadcrumb reflete a hierarquia de navegação do produto. Os dois têm responsabilidades distintas e não devem se sobrepor. Confira mais detalhes na página Breadcrumbs." },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Stepper e a tab Conteúdo do Progress Tracker no zeroheight (conferida em 09/10/2026), que trocou \"stepper\" pelo nome do componente. Regras de escrita do time de Content." }
      ] }
    ]
  };
})();
