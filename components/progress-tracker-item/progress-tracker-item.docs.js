/* Documentação — Progress Tracker Item
   Fonte: description do set na lib estável (Progress Tracker Item 14415:3778), literal; a página Progress Tracker do zeroheight (384247)
   documenta o item junto com o container. Acessibilidade e exemplos a partir do código. A lib tem Orientation Vertical|Horizontal;
   o código só faz a Vertical (CONFERIR C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function it(more){ return Object.assign({ _tag: "cds-progress-tracker-item", "show-connector": false }, more || {}); }

  CDS.docs["progress-tracker-item"] = {
    tag: "cds-progress-tracker-item",
    base: { label: "Documentos", description: "Envie um documento com foto", "link-label": "Ver documentos aceitos", status: "current", "marker-label": "2", "show-connector": false },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=14415-3778", sourceLabel: "Abrir o Progress Tracker Item no Figma",
    cover: { description: "Etapa individual do Progress Tracker.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Etapa individual do Progress Tracker. Insira dentro do Slot Tracker do componente Progress Tracker, nunca solto na tela." },
        { p: "Show Description acrescenta um texto de apoio sob o rótulo. Show Link acrescenta um Link, que é o único elemento interativo da etapa — o item em si não é clicável." },
        { note: "Texto literal da description do set Progress Tracker Item na lib estável. Quando usar o Progress Tracker está na doc dele." },
        { h2: "Dentro do Progress Tracker" },
        { display: { attrs: { _tag: "cds-progress-tracker", current: "2", _children: ["Identificação", "Documentos", "Revisão"].map(function(l){ return { _tag: "cds-progress-tracker-item", label: l, "show-description": false, "show-link": false }; }) } } }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { "show-connector": null }, markers: [{ n: 1, target: ".cds-pti__mark", side: "left" }, { n: 2, target: ".cds-pti__conn", side: "left" }, { n: 3, target: ".cds-pti__label", side: "right" }, { n: 4, target: ".cds-pti__desc", side: "right" }, { n: 5, target: ".cds-pti__link", side: "right" }], legend: ["Marcador — número ou ícone, conforme Kind", "Conector — traço que liga a etapa à seguinte", "Rótulo — nome da etapa", "Descrição — texto de apoio, opcional", "Link — ação da etapa, opcional"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Number", values: ["Number", "Icon"] },
          { name: "Status", type: "Variant", default: "Pending", values: ["Pending", "Current", "Completed"] },
          { name: "Orientation", type: "Variant", default: "Vertical", values: ["Vertical", "Horizontal"] },
          { name: "Marker label", type: "Text", default: "1" },
          { name: "Choose Marker icon", type: "Instance swap", default: "placeholder-line" },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Description", type: "Boolean", default: "true" },
          { name: "Text Description", type: "Text", default: "Description content" },
          { name: "Show Link", type: "Boolean", default: "true" },
          { name: "Show Connector", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Progress Tracker Item da lib estável. No código: `kind` (number|icon), `orientation` (vertical|horizontal), `status` (pending|current|completed), `marker-label`, `marker-icon`, `label`, `description`, `show-description`, `show-connector`, `show-link`, `link-label` e `href`. Dentro do Progress Tracker com `current`, status, número e conector são calculados." },
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Status" },
        { p: "Status=Pending — etapa ainda não iniciada. Status=Current — etapa em que a pessoa está. Status=Completed — etapa concluída. O marcador exibe um check nos dois Kind, então o ícone escolhido não aparece nesse estado." },
        { specimens: { min: "calc(2 * var(--common-sizes-120))", items: [
          { label: "Pending", attrs: it({ label: "Revisão", "marker-label": "3", "show-link": false }) },
          { label: "Current", attrs: it({ label: "Documentos", status: "current", "marker-label": "2", "show-link": false }) },
          { label: "Completed", attrs: it({ label: "Identificação", status: "completed", "show-link": false }) }
        ] } },
        { h2: "Kind" },
        { p: "Kind=Number — marcador numerado pelo Marker label. Kind=Icon — marcador com ícone escolhido em Choose Marker icon." },
        { specimens: { min: "calc(2 * var(--common-sizes-120))", items: [
          { label: "Number", attrs: it({ label: "Documentos", "marker-label": "2", "show-link": false, "show-description": false }) },
          { label: "Icon", attrs: it({ label: "Documentos", kind: "icon", "marker-icon": "file-line", "show-link": false, "show-description": false }) }
        ] } },
        { h2: "Orientation" },
        { p: "Orientation precisa acompanhar a do container. Vertical posiciona o rótulo ao lado do marcador. Horizontal posiciona abaixo." },
        { specimens: { min: "calc(2 * var(--common-sizes-120))", items: [
          { label: "Vertical", attrs: it({ label: "Documentos", status: "current", "marker-label": "2", "show-connector": null }) },
          { label: "Horizontal", attrs: it({ label: "Documentos", status: "current", "marker-label": "2", "show-connector": null, orientation: "horizontal" }) }
        ] } },
        { note: "Dentro do Progress Tracker, o container aplica a orientação dele aos itens." },
        { h2: "Show Connector" },
        { p: "Show Connector desenha o traço até a etapa seguinte e deve ficar desligado no último item. O traço acompanha a cor do Status: accent quando a etapa está concluída, neutro nas demais." },
        { specimens: { min: "calc(2 * var(--common-sizes-120))", items: [
          { label: "Completed com conector", attrs: it({ label: "Identificação", status: "completed", "show-connector": null, "show-link": false, "show-description": false }) },
          { label: "Pending com conector", attrs: it({ label: "Revisão", "marker-label": "3", "show-connector": null, "show-link": false, "show-description": false }) }
        ] } },
        { note: "Textos literais da description do set." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O número e o status entram no nome da etapa, antes do rótulo (ex.: \"Etapa 2, atual: Documentos\").",
          "A etapa atual tem `aria-current=\"step\"`.",
          "Marcador e conector são decorativos (`aria-hidden`).",
          "O item não é clicável. O Link é o único elemento interativo e entra na ordem do `Tab`."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Rótulo (Text/intense) 16,96:1 e descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Marcador: número 13,56:1 (Pending) e 16,96:1 (Current). Check do Completed (Icons/inversed sobre Surface/accent) 4,54:1.", "Anel do Current e marcador Completed (Accent) 4,54:1 sobre Surface/default — acima de 3:1.", "Marcador Pending (Neutral/Solid/semi-soft) e conector neutro 1,25:1 sobre Surface/default — abaixo de 3:1. O status também vem no texto lido pelo leitor de tela."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Insira dentro do Slot Tracker do componente Progress Tracker, nunca solto na tela.", "Orientation precisa acompanhar a do container. Vertical posiciona o rótulo ao lado do marcador. Horizontal posiciona abaixo.", "Show Connector deve ficar desligado no último item."] },
        { note: "Textos literais da description do set." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O item não tem estados de interação. O Link segue o Motion do Link." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação para a troca de Status (CONFERIR C150)." } }
      ] }
    ]
  };
})();
