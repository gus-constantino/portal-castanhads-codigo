/* Documentação — Progress Line
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Progress line, 736e43) reaproveitado; props e padrões do set da lib estável
   (Progress Line 2322:4006); acessibilidade do playground (role="progressbar"). O zeroheight não tem a tab Style e o Motion é placeholder (C133). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  var W = "width:calc(var(--common-sizes-200) + var(--common-sizes-120))";
  function line(pct, extra){ return Object.assign({ _tag: "cds-progress-line", percent: String(pct), label: "Envio dos documentos", style: W }, extra || {}); }
  function withText(pct, text){ return { _tag: "div", class: "pg-cnt-card", style: W, _children: [line(pct, { style: "width:100%" }), { _tag: "p", class: "pg-cnt-phone__text", _text: text }] }; }
  CDS.docs["progress-line"] = {
    tag: "cds-progress-line",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/736e43-progress-line", sourceLabel: "Abrir a Progress line no zeroheight",
    cover: { description: "O Progress Line é um indicador visual não interativo que representa o progresso de uma operação ao longo do tempo, ajudando a pessoa usuária a entender em que estágio o processo se encontra.", examples: [withText(50, "Etapa 2 de 4")] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Progress Line é um indicador visual não interativo que representa o progresso de uma operação ao longo do tempo, ajudando a pessoa usuária a entender em que estágio o processo se encontra." },
        { h3: "Nomes alternativos comuns" },
        { p: "Progress Bar, Barra de progresso, Indicador de progresso linear" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "O avanço do progresso deve ser imediatamente compreensível, mesmo sem texto auxiliar."],
          ["Previsibilidade", "O crescimento da barra acontece sempre da esquerda para a direita, refletindo a evolução natural do processo."],
          ["Consistência", "Mantém padrão visual e comportamento alinhados aos demais indicadores de status do sistema."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Progress Line quando for necessário comunicar visualmente o andamento de uma operação mensurável, especialmente em fluxos em que a pessoa usuária precisa acompanhar a evolução de uma tarefa até sua conclusão." },
        { h3: "Utilize para:" },
        { ul: ["Indicar progresso de carregamentos com percentual conhecido", "Representar etapas concluídas em processos lineares", "Comunicar avanço de ações que levam alguns segundos ou mais"] },
        { h3: "Não utilize para:" },
        { ul: ["Estados de carregamento sem previsão de término", "Indicar apenas que algo está em processamento, sem progresso mensurável", "Apenas como um separador visual sem função de indicação de progresso"] },
        { h2: "Casos de uso" },
        { h3: "Progress Line vs Spinner" },
        { p: "O Progress Line deve ser utilizado quando existe a possibilidade de informar avanço real da operação. Já o Spinner é mais adequado para processos indeterminados, em que não há como calcular progresso." },
        { compare: [
          { title: "Progress Line: avanço mensurável", attrs: line(60) },
          { title: "Spinner: duração indeterminada", attrs: { _tag: "cds-spinner", size: "large", appearance: "accent" } }
        ] },
        { h3: "Progress Line vs Stepper" },
        { p: "Enquanto o Progress Line comunica avanço contínuo em percentual, o Stepper é indicado para fluxos divididos em etapas bem definidas e discretas." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: line(60), markers: [{ n: 2, target: ".cds-pl__bar", side: "top" }], legend: ["Track (fundo da barra)", "Indicador de progresso"] } },
        { h2: "Propriedades" },
        { props: [{ name: "Percent", type: "Variant", default: "0", values: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] }] },
        { note: "Props e padrões lidos do set Progress Line da lib estável. No código, `percent` aceita qualquer valor de 0 a 100 e `label` dá o nome acessível. O zeroheight ainda não tem a tab Style deste componente." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Percent" },
        { specimens: { min: "calc(var(--common-sizes-200) + var(--common-sizes-120))", items: [
          { label: "0%", attrs: line(0) }, { label: "30%", attrs: line(30) }, { label: "70%", attrs: line(70) }, { label: "100%", attrs: line(100) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É anunciado como barra de progresso (`role=\"progressbar\"`), com `aria-valuenow` de 0 a 100.",
          "Dê um nome com `label` que diga o que está avançando (ex.: \"Envio dos documentos\").",
          "Se houver texto complementar (\"Etapa 2 de 4\"), ele fica visível ao lado e também é lido."
        ] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para a Progress line." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: line(40), title: "Representar progresso real", text: "Utilize valores de progresso que correspondam de fato ao estado da operação, evitando animações artificiais que possam gerar desconfiança." },
          { attrs: withText(40, "Enviando 2 de 5 arquivos"), title: "Manter visibilidade adequada", text: "Posicione o Progress Line próximo ao conteúdo ou ação relacionada, garantindo que a pessoa usuária associe facilmente o indicador ao processo em andamento." },
          { attrs: withText(25, "Etapa 1 de 4"), title: "Complementar o Progress Line com indicador textual", text: "Quando for necessário oferecer mais contexto sobre o andamento do processo, associe o Progress Line a um indicador textual complementar, como etapa atual e total de etapas (ex.: “Etapa 1 de 4”). Esse texto deve ser posicionado próximo à barra de progresso, preferencialmente logo abaixo ou acima." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: withText(75, "Etapa 3 de 4"), text: "Utilize o Progress Line quando houver um percentual claro de avanço, por exemplo, etapas concluídas" },
          { kind: "dont", text: "Não use o Progress Line em ações instantâneas ou sem dados de progresso, como uma simples troca de tela." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção de Motion da Progress line no zeroheight ainda é placeholder." } }
      ] }
    ]
  };
})();
