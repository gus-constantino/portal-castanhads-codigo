/* Documentação — Tooltip (rascunho)
   Sem página no zeroheight e sem seção [Documentation] no arquivo Component use documentation (05/10). A description do componente na lib
   estável (Tooltip 11211:416) é a única fonte de texto do time (literal); o resto foi escrito a partir do Figma e do playground.
   Revisar com o time (C144). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var n = 0;
  // gatilho + tooltip ligados por id (o id muda a cada exemplo para não colidir na página)
  function withTrigger(tip, trigger){
    var id = "doc-tt-" + (++n);
    return { _tag: "div", class: "pg-doc-row", _children: [Object.assign({ id: id }, trigger || { _tag: "cds-icon-button", icon: "information-line", label: "Sobre a tarifa", appearance: "neutral" }), Object.assign({ _tag: "cds-tooltip", for: id }, tip)] };
  }

  CDS.docs["tooltip"] = {
    tag: "cds-tooltip",
    base: { label: "Tarifa", text: "1,99% sobre o valor depositado pela empresa." },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=11211-416", sourceLabel: "Abrir o Tooltip no Figma",
    cover: { description: "São caixas flutuantes que proporcionam informações sobre algum aspecto da interface que mereça maior atenção.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight. Só a primeira frase é do time (description do Figma); o resto foi escrito a partir do Figma e do playground e precisa de revisão." } },
        { h2: "Sobre" },
        { p: "São caixas flutuantes que proporcionam informações sobre algum aspecto da interface que mereça maior atenção." },
        { p: "O Tooltip aparece quando a pessoa passa o mouse ou leva o foco do teclado para o elemento que o dispara, e some ao sair ou com Esc. Tem um Label opcional e um texto curto." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Explicar um ícone ou termo que pode não ser claro (ex.: o que entra na tarifa).", "Dar um complemento curto que não cabe no layout.", "Nomear Icon Buttons sem texto visível, quando o contexto pede."] },
        { h3: "Não utilize para:" },
        { ul: ["Informação essencial para concluir a tarefa — coloque no texto da tela.", "Conteúdo com links, botões ou formulários — use o Popover.", "Mensagens de erro ou de sistema — use a mensagem do campo, o Alert ou o Toast.", "Telas de toque como único caminho: não há hover no celular."] },
        { h2: "Casos de uso" },
        { h3: "Tooltip vs Popover" },
        { p: "O Tooltip só mostra texto e aparece no hover ou no foco. O Popover abre com um clique, fica aberto e pode ter ações." },
        { compare: [
          { title: "Tooltip: texto curto, sem ações", attrs: {} },
          { title: "Popover: abre no clique, pode ter ações", attrs: { _tag: "cds-popover", inline: true, label: "Ações da tarifa", _children: [{ _tag: "cds-selection-list-item", label: "Ver detalhes da tarifa", "trailing-item": "none", "show-lead-item": false, "show-description": false, option: true }, { _tag: "cds-selection-list-item", label: "Baixar extrato", "trailing-item": "none", "show-lead-item": false, "show-description": false, option: true }] } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-tooltip__label", side: "left" }, { n: 2, target: ".cds-tooltip__text", side: "right" }], legend: ["Text Label (Caption/Bold, opcional)", "Text Content (Caption/Regular)"] } },
        { p: "Surface/inversed · raio extra-small · Elevation/level 2 · largura máxima 240." },
        { h2: "Propriedades" },
        { props: [
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Label", type: "Boolean", default: "true" },
          { name: "Text Content", type: "Text", default: "Find out how this Caju product can benefit your business today." }
        ] },
        { note: "Props e padrões lidos do componente Tooltip da lib estável (o texto padrão está em inglês, C144). No código: `label`, `text`, `show-label`, `for` (id do gatilho; sem ele, fica sempre visível) e `placement` (top | bottom, padrão top)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Com e sem Label" },
        { specimens: { items: [
          { label: "Show Label = true", attrs: {} }, { label: "Show Label = false", attrs: { "show-label": false } }
        ] } },
        { h2: "No gatilho" },
        { display: { attrs: withTrigger({ label: "Tarifa", text: "1,99% sobre o valor depositado pela empresa." }), live: true } },
        { note: "Passe o mouse ou leve o foco (Tab) para o ícone." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O Tooltip tem `role=\"tooltip\"` e o gatilho recebe `aria-describedby`: o leitor de tela lê o texto como descrição do gatilho.",
          "Aparece no hover e no foco do teclado; `Esc` fecha sem tirar o foco do lugar (1.4.13).",
          "Em gatilhos compostos (ex.: Icon Button), a descrição vai para o elemento focável de dentro.",
          "O Tooltip não recebe foco nem tem conteúdo interativo.",
          "O gatilho precisa ter nome próprio: o Tooltip descreve, não nomeia."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Label e texto (Text/inversed) sobre Surface/inversed: 16,96:1 — AA e AAA."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Texto curto: uma ou duas frases, no máximo a largura de 240.", "O Label é opcional; use quando o texto precisa de um título.", "Não repita no Tooltip o que já está escrito na tela.", "Prefira o topo do gatilho (top); use bottom quando não houver espaço acima."] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: { label: "Tarifa", text: "1,99% sobre o valor depositado pela empresa." }, text: "Use para complementar um termo ou ícone com uma informação curta." },
          { kind: "dont", attrs: { label: "Atenção", text: "Para concluir o pedido, revise os dados de entrega, confirme o endereço e escolha a forma de pagamento antes de continuar." }, text: "Não coloque no Tooltip informação essencial ou instruções longas." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: withTrigger({ label: "Tarifa", text: "1,99% sobre o valor depositado pela empresa." }), live: true } },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para o Tooltip (aparecer e sumir). No código, ele aparece e some sem animação (CONFERIR C144)." } }
      ] }
    ]
  };
})();
