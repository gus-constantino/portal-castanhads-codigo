/* Documentação — link: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Links (6400:15859).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["link"] = {
    tag: "cds-link",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-15859", sourceLabel: "Abrir Links em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O link direciona a pessoa para outro destino — página interna, site externo, documento ou seção. É navegação, não ação. Se o objetivo é executar algo no próprio fluxo, use um Botão." },
        { h3: "Como escrever" },
        { p: "O texto deve descrever com clareza para onde a pessoa vai ou o que vai encontrar. A pessoa não deve precisar clicar para entender o destino. Exemplos:" },
        { display: { attrs: [
          { _tag: "cds-link", label: "Confira o artigo com nossas dicas de segurança.", href: "#", appearance: "accent" },
          { _tag: "cds-link", label: "Leia os termos e condições de uso.", href: "#", appearance: "accent" },
          { _tag: "cds-link", label: "Seu cartão chegou! Desbloqueie e comece a usar.", href: "#", appearance: "accent" }
        ] } },
        { ul: [
          "Use entre 5 e 8 palavras (cerca de 55 caracteres). Links precisam de mais texto que botões para garantir uma área de clique adequada.",
          "Não use textos genéricos.",
          "Se o link for um endereço de e-mail e for a última palavra da frase, não use ponto final."
        ] },
        { h3: "Links externos" },
        { p: "Para links que levam para fora do produto, considere indicar com ícone e abrir em nova aba. Isso prepara a pessoa para a mudança de contexto." },
        { display: { attrs: { _tag: "cds-link", label: "Leia os termos e condições de uso.", href: "#", appearance: "accent", icon: "link-line", target: "_blank" } } },
        { h3: "Hiperlinks em texto corrido" },
        { p: "Quando o link aparecer dentro de um parágrafo ou descrição:" },
        { ul: [
          "Inclua pontuação ao final de cada frase normalmente — o link não altera a pontuação da frase.",
          "Posicione o link próximo ao conteúdo que ele descreve. Links distantes do contexto prejudicam o entendimento.",
          "Quando houver mais de uma frase com link, inclua pontuação ao final de cada uma."
        ] },
        { h3: "Link vs. Botão" },
        { ul: [
          "Use link para navegar (levar a pessoa a outro destino como termos de uso, FAQ, artigos ou downloads).",
          "Use botão para agir (executar algo no próprio fluxo, como confirmar, salvar, enviar ou cancelar).",
          "Links mudam o contexto e botões geram uma resposta imediata."
        ] },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Links. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
