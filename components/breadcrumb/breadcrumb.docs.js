/* Documentação — Breadcrumb
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Breadcrumbs, 966c0d) e props da lib estável (Breadcrumb 6792:24); tab Conteúdo abaixo.
   Conteúdo (regras de texto):
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Breadcrumb (6400:15502).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  // Breadcrumb do DS com os rótulos do Figma (sem Truncate)
  function crumbs(labels, collapse){ return { _tag: "cds-breadcrumb", collapse: collapse || "0", _children: labels.map(function(l){ return { _tag: "a", href: "#", _text: l }; }) }; }
  CDS.docs["breadcrumb"] = {
    tag: "cds-breadcrumb",
    base: {},
    source: "https://castanha.caju.com.br/858426090/v/latest/p/966c0d-breadcrumbs", sourceLabel: "Abrir o Breadcrumb no zeroheight",
    cover: { description: "O Breadcrumb é um componente de navegação que mostra a localização atual do usuário dentro de uma hierarquia ou estrutura de conteúdo. Ele oferece links para os níveis superiores, facilitando a navegação.", wide: true, examples: [ crumbs(["Despesas", "Adiantamentos", "Detalhes do adiantamento"], "0") ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Breadcrumb é um componente de navegação que mostra a localização atual do usuário dentro de uma hierarquia ou estrutura de conteúdo. Ele oferece links para os níveis superiores, facilitando a navegação." },
        { h3: "Nomes alternativos comuns" },
        { p: "Breadcrumb trail." },
        { h3: "Princípios" },
        { cards: [
          ["Clareza", "O componente reflete sempre a estrutura hierárquica real do site ou aplicativo."],
          ["Eficiência", "Em caminhos longos, níveis intermediários podem ser ocultados ou resumidos para preservar o layout"],
          ["Consistência", "O último item do Breadcrumb representa a página atual e não é apresentado como link."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Breadcrumb para ajudar os usuários a acompanhar sua localização em longos fluxos ou hierarquias, mostrando a posição da página atual." },
        { h3: "Utilize para:" },
        { ul: ["Em sites ou aplicativos com vários níveis de hierarquia ou páginas aninhadas;", "Para ajudar o usuário a entender onde ele está no contexto geral do sistema;", "Para permitir que o usuário navegue rapidamente para níveis superiores sem precisar usar o botão \"voltar\"."] },
        { h3: "Não utilize para:" },
        { ul: ["Em sites ou aplicativos com pouca ou nenhuma hierarquia (menos de três níveis de profundidade);", "Como substituto para a navegação primária (menus ou abas). O Breadcrumb é um elemento de navegação secundária;", "Em situações onde o caminho do usuário é baseado em filtros ou buscas e não em uma hierarquia fixa (nesses casos, use Tags ou Filtros visíveis).", "Ações de Comando, se o elemento tem o objetivo de executar uma ação ou submeter dados (use um Main Button)."] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: crumbs(["Despesas", "Adiantamentos", "Detalhes"], "1"), markers: [{ n: 1, target: ".cds-bcr__li:first-child .cds-bci__content", side: "left" }, { n: 2, target: ".cds-bcr__li:nth-child(2) .cds-bci__sep", side: "top" }, { n: 3, target: ".cds-bcr__li:nth-child(2) .cds-bci__content", side: "bottom" }, { n: 4, target: ".cds-bcr__li:last-child .cds-bci__content", side: "right" }], legend: [".Item Kind=Truncate (abre o Popover com os níveis escondidos)", "Separator (navigation-right-line 16)", ".Item com link (nível superior)", ".Item atual (Is Active, sem link)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default"] },
          { name: "Show Popover", type: "Boolean", default: "false" },
          { name: "showItem03 … showItem06", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Breadcrumb da lib estável; cada nível é um .Item (building block). No código: os filhos `<a href>` são os níveis (o último vira a página atual, com `aria-current`) e `collapse` diz quantos níveis iniciais vão para o \"…\" (padrão 1; \"0\" mostra o caminho todo)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Caminho completo" },
        { display: { attrs: crumbs(["Despesas", "Adiantamentos", "Detalhes do adiantamento"], "0") } },
        { h2: "Truncado" },
        { display: { attrs: crumbs(["Despesas", "Adiantamentos", "Colaboradores", "Detalhes do adiantamento"], "2") } },
        { note: "O \"…\" abre um Popover com os níveis escondidos (Show Popover)." }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um `<nav aria-label=\"Breadcrumb\">` com uma lista ordenada: o leitor de tela anuncia a região e quantos níveis há.",
          "Os níveis superiores são links; a página atual é texto com `aria-current=\"page\"`.",
          "O \"…\" é um botão que abre o Popover com os níveis escondidos; `Esc` fecha e devolve o foco.",
          "Os separadores são decorativos e não são lidos."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Página atual (Text/intense) 16,96:1 · links (Text/medium) 8,24:1 sobre Surface/default — AA e AAA."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: crumbs(["Despesas", "Adiantamentos", "Colaboradores", "Detalhes do adiantamento"], "2"), title: "Link externo", text: "Em experiências para desktop Ao clicar no item truncado ele expande exibindo o caminho completo do breadcrumb." },
          { attrs: crumbs(["Despesas", "Adiantamentos", "Detalhes"], "2"), title: "Mobile", text: "Em experiências mobile, utilize apenas 2 itens, sendo o primeiro kind=truncate e o segundo a página atual do usuário; Ao clicar no item truncado mostrar o popover com a lista do caminho completo." }
        ] },
        { note: "Atenção: as regras de Conteúdo dizem que a página de origem nunca é truncada; o componente e a diretriz Mobile truncam o primeiro nível (CONFERIR C138)." },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: crumbs(["Despesas", "Adiantamentos", "Detalhes"], "0"), text: "Reflita sempre a estrutura hierárquica real da aplicação" },
          { kind: "dont", attrs: { _tag: "div", class: "pg-doc-row pg-doc-row--tight", _children: [{ _tag: "cds-breadcrumb-item", label: "Despesas", href: "#", "has-separator": false }, { _tag: "cds-breadcrumb-item", label: "Adiantamentos", href: "#" }, { _tag: "cds-breadcrumb-item", label: "Detalhes", href: "#" }] }, text: "Não torne o último item clicável. Ele deve ser a página atual da navegação." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: crumbs(["Despesas", "Adiantamentos", "Detalhes"], "1"), live: true } },
        { note: "Exemplo interativo: passe o mouse nos níveis e abra o \"…\"." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Breadcrumb no zeroheight ainda está com o texto modelo e a tabela vazia. No código, o hover dos itens usa medium/02 + systemic/accelerate, sem Motion Style correspondente (CONFERIR C138)." } }
      ] },

      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O breadcrumb é uma trilha de navegação que mostra à pessoa onde ela está dentro da hierarquia do produto. É um recurso de navegação secundária e não substitui o menu principal." },
        { h3: "Anatomia do conteúdo" },
        { p: "O breadcrumb sempre segue esta ordem:" },
        { ol: [
          "Página de origem — nível mais alto da hierarquia. Nunca omitida ou truncada.",
          "Links intermediários — páginas entre a origem e a atual. São clicáveis e podem ser truncados quando necessário.",
          "Página atual — último item da trilha. Exibido como texto simples, sem link e nunca truncado."
        ] },
        { h3: "Como escrever" },
        { ul: [
          "Use o mesmo nome que a página exibe em seu título ou na navegação principal. As labels precisam ser consistentes — elas ainda não são puxadas automaticamente do código, então exigem atenção redobrada.",
          "Mantenha a mesma label do início ao fim do fluxo. Se começou como \"Novo pedido\", não mude para \"Nova solicitação\" no meio do caminho.",
          "Seja conciso. Prefira nomes curtos e diretos. Se o nome for muito longo, use uma versão abreviada reconhecível — nunca invente um nome diferente do usado na navegação.",
          "Evite verbos e chamadas à ação. O breadcrumb é orientação, não ação. Exceção: quando o fluxo parte de uma ação, o verbo é permitido. Exemplo: `Relatórios`, `Configurações`, `Adicionar créditos` (quando o fluxo parte dessa ação)",
          "Sem pontuação nos rótulos. Os separadores entre itens são responsabilidade do componente.",
          "Use sentence case — primeira letra maiúscula, demais em minúsculo. Confira as exceções de maiúsculas na página Escrevendo para produto."
        ] },
        { h3: "Truncamento" },
        { p: "O truncamento é ativado quando o total de itens ultrapassa 5 ou quando não há espaço suficiente. Apenas os links intermediários são truncados e agrupados em um dropdown." },
        { p: "Nunca são truncados:" },
        { ul: ["Página de origem", "Última página ancestral (nível imediatamente acima da página atual)", "Página atual"] },
        { h3: "Breadcrumb vs. Stepper" },
        { p: "O breadcrumb reflete a hierarquia de navegação estática do produto. O stepper comunica o progresso dentro de um fluxo. Os dois têm responsabilidades distintas e não devem se sobrepor." },
        { p: "O primeiro item do breadcrumb deve ser sempre a página que originou o fluxo — não o \"Painel Inicial\" ou \"Home\". Isso garante que a pessoa consiga retornar ao contexto exato de onde partiu." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: crumbs(["Créditos Caju", "Transferência entre carteiras"]), text: "O progresso dos passos de um fluxo (stepper) não deve ser representado no Breadcrumb. Ele reflete apenas a hierarquia de navegação estática do produto." },
          { kind: "dont", attrs: crumbs(["Painel inicial", "Transferência entre carteiras"]), text: "O primeiro item do Breadcrumb deve ser a página que originou o fluxo, e não o \"Painel Inicial\" ou ”Home”." }
        ] },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Breadcrumb. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
