/* Documentação — Link
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Link, 153ebd) reaproveitado; anatomia e propriedades da seção [Documentation] Link do
   Component use documentation (3686:475, set atual da lib), validadas no set Link 4926:213; acessibilidade e contrastes medidos no playground;
   tab Conteúdo do [NEW] Content (6400:15859, D98). Divergências no CONFERIR (C130). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["link"] = {
    tag: "cds-link",
    base: { label: "Termos de uso", href: "#" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/153ebd-link", sourceLabel: "Abrir o Link no zeroheight",
    cover: { description: "O Link é um elemento interativo que direciona o usuário para outro destino, como páginas internas, externas, seções específicas ou downloads.", examples: [
      { label: "Histórico de pagamentos", appearance: "accent" }, { label: "Termos de uso" }
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Link é um elemento interativo que direciona o usuário para outro destino, como páginas internas, externas, seções específicas ou downloads." },
        { h3: "Nomes alternativos comuns" },
        { p: "Hiperlink, Text Link, Link Button, Anchor." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "O texto deve indicar com precisão o destino ou recurso acessado."],
          ["Consistência", "Links devem ter estilo e comportamento uniformes, garantindo que o usuário identifique de imediato o elemento como interativo."],
          ["Previsibilidade", "O usuário deve entender de imediato o que acontecerá ao clicar no link."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o componente Link para direcionar o usuário a outro destino, seja uma página interna, um site externo, um documento ou uma seção específica da mesma página. Ele é indicado para navegação relacionada ao conteúdo apresentado e deve ser aplicado sempre que a interação tiver como objetivo levar o usuário a consumir novas informações, sem executar ações diretas no sistema." },
        { h3: "Utilize para:" },
        { ul: ["Para redirecionar para sites externos ou recursos fora do produto.", "Para rolar até uma seção específica na mesma página.", "Para abrir documentos, arquivos ou iniciar downloads.", "Para compartilhar recursos, termos, políticas ou conteúdos adicionais."] },
        { h3: "Não utilize para:" },
        { ul: ["Para ações que modificam dados, enviam formulários ou executam comandos (use Main Button).", "Para interações que exigem confirmação ou escolha do usuário.", "Para navegação que faz parte da estrutura principal."] },
        { h2: "Casos de uso" },
        { h3: "Link vs Main Button" },
        { p: "O Link serve para navegação, direcionando o usuário a outro local ou recurso sem alterar o estado do sistema. Já o Main Button executa ações diretas, como enviar dados ou abrir elementos na interface. Links mudam o contexto. Main buttons geram uma resposta imediata no mesmo fluxo." },
        { alert: { appearance: "informative", label: "Link é para direcionamento", text: "Link é para direcionamento (navegar para outro conteúdo ou recurso) e Main Button é para ação (executar algo no próprio contexto da interface)." } },
        { compare: [
          { title: "Este é um Link", attrs: { label: "Termos de uso", appearance: "accent" } },
          { title: "Este é um Main Button (Ghost)", attrs: { _tag: "cds-main-button", label: "Label", kind: "ghost", "show-lead-icon": false, "show-trailing-icon": false } }
        ] },
        { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: { label: "Link content", appearance: "accent" },
          markers: [{ n: 1, target: "a > span", side: "top" }, { n: 2, target: "a > cds-icon", side: "right" }],
          legend: ["Link text", "Icon"]
        } },
        { h2: "Propriedades" },
        { props: [
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Accent", "Neutral", "Inversed"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Link Content", type: "Text", default: "Link content" },
          { name: "Show Trailing Item", type: "Boolean", default: "true" },
          { name: "Change Icon", type: "Swap component", default: "navigation-right-line" }
        ] },
        { note: "Props e padrões lidos do set Link da lib estável. A doc do Figma chama `Appearance` de Style. O zeroheight ainda não tem a tab Style deste componente (CONFERIR C130)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Appearance" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Accent", attrs: { appearance: "accent" } }, { label: "Neutral", attrs: {} },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-link", label: "Termos de uso", href: "#", appearance: "inversed" }] } }
        ] } },
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Enabled", attrs: { appearance: "accent" } }, { label: "Hovered", attrs: { appearance: "accent", state: "hovered" } },
          { label: "Pressed", attrs: { appearance: "accent", state: "pressed" } }, { label: "Disabled", attrs: { appearance: "accent", disabled: true } }
        ] } },
        { h2: "Ícone" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Show Trailing Item", attrs: { appearance: "accent" } }, { label: "Sem ícone", attrs: { appearance: "accent", "show-trailing-item": false } },
          { label: "Link externo", attrs: { appearance: "accent", icon: "link-line", target: "_blank" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É um `<a href>` nativo: anunciado como link, com o texto como nome.",
          "O ícone é decorativo. O destino precisa estar claro no texto.",
          "Em link externo que abre em nova aba (`target=\"_blank\"`), deixe isso claro no texto ou no ícone.",
          "Disabled usa `aria-disabled=\"true\"` e sai da tabulação."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Tab foca o link. Enter navega.", "Foco visível segue o padrão global do Castanha."] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Neutral (`Text/intense`): 16,96:1 — AA e AAA.", "Accent (`Text/accent`): 4,54:1 — AA.", "Inversed (`Text/inversed`) sobre `Surface/accent`: 4,54:1 — AA.", "Estado desabilitado: isento do critério 1.4.3."] },
        { note: "A seção Acessibilidade da doc no Figma ainda é placeholder. O zeroheight não tem essa seção. Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: { label: "Termos de uso", appearance: "accent", icon: "link-line", target: "_blank" }, title: "Link externo", text: "Para links externos, considerar indicar com ícone e/ou abrir em nova aba." },
          { attrs: [{ label: "Termos de uso", appearance: "accent" }, { _tag: "cds-main-button", label: "Main button", "show-lead-icon": false, "show-trailing-icon": false }], title: "Link vs Button", text: "Não confunda Link com Button: use Link para levar o usuário a outro destino (página, documento ou recurso externo) e Botão para executar ações no próprio contexto da aplicação." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: { label: "Histórico de pagamentos", appearance: "accent" }, text: "Usar rótulos descritivos: o texto do link deve indicar claramente para onde o usuário será levado ou qual recurso será acessado." },
          { kind: "dont", attrs: { label: "Clique aqui", appearance: "accent" }, text: "Textos genéricos não informam para onde o link leva, prejudicando a experiência e a acessibilidade." },
          { kind: "do", text: "Posicionar links em contextos relevantes: insira próximo ao conteúdo relacionado, evitando que o usuário procure." },
          { kind: "dont", text: "Não inserir links distantes do conteúdo que descrevem: isso prejudica a relação e o entendimento do destino." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
        { display: { attrs: { label: "Termos de uso", appearance: "accent" }, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione o link para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/04`"]] },
          { title: "Hovered → Enabled", rows: [["Gatilho", "Mouse leave"], ["Motion Style", "`Hover Out/04`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/05`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { note: "No hover, o ícone desloca para a direita e volta um pouco. Fonte: documentação de motion para devs (Notion, páginas verdes). Os mesmos Motion Styles estão gravados nas transições do Figma." },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce`." }
      ] },
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
          "Não use textos genéricos como label do link (ex.: \"Saiba mais\", \"Clique aqui\", \"Ver mais\"). Prefira um label que descreva o destino, como \"Histórico de pagamentos\".",
          "Não use verbos centrados em visão, como \"Ver\" — nem toda pessoa usuária enxerga a tela (leitores de tela, baixa visão). Use o nome da área, como \"Comprovante de pagamento\", ou \"Acessar {área}\".",
          "Se o link for um endereço de e-mail e for a última palavra da frase, não use ponto final. Exemplo: `Em caso de dúvida, entre em contato pelo ajuda@empresa.com.br`"
        ] },
        { table: { wrap: true, head: ["Faça", "Não faça"], rows: [
          ["`Histórico de pagamentos`", "`Saiba mais`, `Clique aqui` ou `Ver mais`"],
          ["`Comprovante de pagamento` ou `Acessar comprovante`", "`Ver comprovante`"]
        ] } },
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
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Links. Regras de escrita do time de Content. Os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
