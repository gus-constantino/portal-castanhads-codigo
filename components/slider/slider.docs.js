/* Documentação — Slider
   Sem página no zeroheight e sem [Documentation] no arquivo Component use documentation (05/10). A description do set na lib estável
   (Slider 20056:11908) é texto do time e entra literal (Sobre, Propriedades, Acessibilidade); Quando usar e Diretrizes foram escritos a partir
   dela e do playground — revisar com o time (C146). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function sl(more){ return Object.assign({ _tag: "cds-slider" }, more || {}); }
  var DESC = "Slider de seleção de valor num intervalo. Kind=Single (um thumb) ou Range (dois thumbs: Mínimo e Máximo). State cobre Enabled/Hovered/Pressed/Dragged/Disabled. Value é um eixo de variante apenas para prototipação do design (posições representativas: 0/50/100 e faixas do range); na implementação o valor é um prop numérico em runtime. Show Stops exibe as marcas de step; Show Value Indicator exibe a bolha de valor sobre o thumb.";

  CDS.docs["slider"] = {
    tag: "cds-slider",
    base: { value: "40", label: "Limite diário" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=20056-11908", sourceLabel: "Abrir o Slider no Figma",
    cover: { description: "Slider de seleção de valor num intervalo.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Sem página no zeroheight", text: "O texto do Sobre, das Propriedades e da Acessibilidade vem da description do Slider no Figma (texto do time). Quando usar e Diretrizes foram escritos a partir dela e do playground e precisam de revisão." } },
        { h2: "Sobre" },
        { p: DESC },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Escolher um valor aproximado num intervalo contínuo, em que a posição importa mais que o número exato (ex.: limite de gasto).", "Definir uma faixa com mínimo e máximo, como em filtros de valor (Range).", "Ajustes que a pessoa quer ver mudar enquanto arrasta."] },
        { h3: "Não utilize para:" },
        { ul: ["Valores exatos ou longos (CPF, valor de transferência) — use o Text Input.", "Poucas unidades por vez — use o Quantity Input.", "Opções sem ordem — use Radio Button ou Select Input."] },
        { h2: "Casos de uso" },
        { h3: "Slider vs Quantity Input" },
        { p: "O Slider mostra a posição dentro do intervalo e serve para ajustes ágeis e aproximados. O Quantity Input serve para ajustar poucas unidades com precisão, vendo o número exato." },
        { compare: [
          { title: "Slider: posição no intervalo", attrs: {} },
          { title: "Quantity Input: unidade a unidade", attrs: { _tag: "cds-quantity-input", label: "Quantidade de cartões", value: "2", "show-required": false, "show-supporting-content": false } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Single" },
        { anatomy: { attrs: { value: "40" }, markers: [{ n: 1, target: ".cds-sl__fill", side: "left" }, { n: 2, target: ".cds-sl__track", side: "bottom", align: "start" }, { n: 3, target: ".cds-sl__thumb", side: "bottom" }, { n: 4, target: ".cds-sl__bubble", side: "top" }, { n: 5, target: ".cds-sl__stops", side: "right" }], legend: ["Trilha ativa (Surface/accent)", "Trilha inativa (Surface/01)", "Thumb (24, alvo de toque)", "Value Indicator (Show Value Indicator)", "Stops (marcas de step, Show Stops)"] } },
        { h2: "Range" },
        { anatomy: { attrs: { kind: "range", start: "20", end: "70" }, markers: [{ n: 1, target: ".cds-sl__thumb", side: "left" }, { n: 2, target: ".cds-sl__thumb:last-of-type", side: "right" }], legend: ["Thumb Mínimo", "Thumb Máximo"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Single", values: ["Single", "Range"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Dragged", "Disabled"] },
          { name: "Value", type: "Variant", default: "0", values: ["0", "50", "100", "00/00", "-20/+20", "-50/+50"] },
          { name: "Show Stops", type: "Boolean", default: "true" },
          { name: "Show Value Indicator", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Slider da lib estável. Value serve exclusivamente para prototipação. No código o valor é numérico: `kind`, `min` (0), `max` (100), `step` (10), `value` (Single), `start`/`end` (Range), `show-stops`, `show-value-indicator`, `disabled`, `label`, `min-label`, `max-label` e `value-text` (modelo do texto lido, com {v}). Eventos `input` (arrastando) e `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { items: [
          { label: "Single", attrs: { value: "40" } }, { label: "Range", attrs: { kind: "range", start: "20", end: "70" } }
        ] } },
        { h2: "Opções" },
        { specimens: { items: [
          { label: "Sem Stops", attrs: { value: "40", "show-stops": false } }, { label: "Sem Value Indicator", attrs: { value: "40", "show-value-indicator": false } }, { label: "Disabled", attrs: { value: "40", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { p: "Acessibilidade: cada thumb é role=slider com aria-valuemin/max/now (aria-valuetext quando o valor exibido não for o número cru); no Range, dois nomes acessíveis (Mínimo/Máximo) e thumbs que não se cruzam. Alvo de toque do thumb 24×24 (WCAG 2.5.8)." },
        { table: { head: ["Tecla", "Ação"], rows: [["`←` `↓` / `→` `↑`", "Diminui / aumenta um step"], ["`PageDown` / `PageUp`", "Diminui / aumenta 10 steps"], ["`Home` / `End`", "Vai para o mínimo / máximo"]] } },
        { ul: ["Use `value-text` quando o número precisa de unidade para fazer sentido (ex.: \"R$ {v}\").", "Mostre o valor em texto perto do Slider quando ele for importante: a bolha aparece exclusivamente sobre o thumb."] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Thumb e trilha ativa (Surface/accent) 4,54:1 sobre Surface/default — acima de 3:1 (1.4.11).", "Valor na bolha (Text/inversed sobre Neutral/Solid/semi-intense) 8,24:1 — AA e AAA.", "Trilha inativa (Surface/01) 1,11:1 — abaixo de 3:1: o intervalo inteiro fica pouco visível. A posição é dada pelo thumb e pela trilha ativa (CONFERIR C146)."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Diga em texto o que o Slider controla (o Label) e mostre os extremos do intervalo quando não forem óbvios.", "Use Stops quando o step for grande e os pontos ajudarem a escolher, e esconda quando o intervalo for contínuo.", "No Range, os thumbs não se cruzam: o mínimo nunca passa do máximo.", "Não use o Slider como único caminho para valores exatos: ofereça um campo para digitar quando precisar."] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: { value: "40", label: "Limite diário", "value-text": "R$ {v}" }, text: "Use para escolher um valor aproximado num intervalo, vendo a posição." },
          { kind: "dont", attrs: { min: "0", max: "10000", step: "1", value: "3427", "show-stops": false, label: "Valor da transferência" }, text: "Não use para valores exatos e longos — use o Text Input." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: { value: "40" }, live: true } },
        { note: "Exemplo interativo: arraste o thumb ou use as setas do teclado." },
        { specs: [
          { title: "Thumb: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Thumb: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para o Slider. O mapeamento acima segue o padrão de estados de interação, e o Dragged acompanha o ponteiro sem animação. No código, short/03 + systemic/accelerate (CONFERIR C146)." } }
      ] }
    ]
  };
})();
