/* Documentação — Modal
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Modal, 596323) reaproveitado; props e padrões do componente da lib estável
   (Modal 16362:3267, description); comportamento e acessibilidade do playground. Divergências no CONFERIR (C131):
   o zeroheight lista Kind (Default/Confirmation), que a lib não tem — na lib, Confirmation é o Confirmation Message no Slot. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  function modal(title, kids, extra){ return Object.assign({ _tag: "cds-modal", inline: true, open: true, "text-title": title, "primary-label": "Confirmar", "secondary-label": "Cancelar", "show-lead-icon": "false", _children: kids }, extra || {}); }
  var TEXT = [{ _tag: "p", class: "pg-cnt-phone__text", _text: "As alterações valem para todos os colaboradores do grupo." }];
  function confirmation(app, icon, title, text){ return [{ _tag: "cds-confirmation-message", appearance: app, icon: icon, title: title, description: text }]; }
  CDS.docs["modal"] = {
    tag: "cds-modal",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/596323-modal", sourceLabel: "Abrir o Modal no zeroheight",
    cover: { description: "O Modal é um componente de sobreposição que bloqueia a interface base para exibir conteúdos focados, como formulários, informações detalhadas ou confirmações. Ele exige atenção da pessoa usuária antes de retornar ao fluxo principal.", examples: [modal("Alterar grupo", TEXT)] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Modal é um componente de sobreposição que bloqueia a interface base para exibir conteúdos focados, como formulários, informações detalhadas ou confirmações. Ele exige atenção da pessoa usuária antes de retornar ao fluxo principal." },
        { h3: "Nomes alternativos comuns" },
        { p: "Dialog modal, Overlay dialog, Pop-up" },
        { h3: "Princípios" },
        { cards: [
          ["Foco e interrupção", "O modal deve ser utilizado apenas quando for necessário interromper o fluxo da pessoa usuária para uma ação ou informação relevante. Seu uso excessivo prejudica a experiência."],
          ["Clareza de ação", "Toda interação dentro do modal deve ser clara e objetiva, deixando evidente o que acontecerá ao interagir com os botões disponíveis."],
          ["Hierarquia bem definida", "A estrutura (header, conteúdo e footer) deve guiar a leitura e facilitar a tomada de decisão, evitando sobrecarga cognitiva."]
        ] },
        { h2: "Quando usar" },
        { p: "Utilize o Modal quando for necessário interromper temporariamente o fluxo da pessoa usuária para apresentar informações importantes, coletar dados ou solicitar uma ação que não pode ser ignorada, garantindo foco total no conteúdo exibido." },
        { h3: "Utilize para:" },
        { ul: ["Exibir detalhes complementares sem navegação", "Solicitar confirmações importantes", "Destacar mensagens críticas ou estados do sistema"] },
        { h3: "Não utilize para:" },
        { ul: ["Apresentar formulários (utilize a Drawer)", "Conteúdos longos ou complexos que exigem rolagem extensa", "Navegação entre múltiplas etapas", "Substituir páginas completas", "Exibir informações não prioritárias"] },
        { h2: "Casos de uso" },
        { h3: "Modal vs Drawer" },
        { p: "O Modal é uma sobreposição central que bloqueia completamente a interface e exige foco total da pessoa usuária em uma ação ou decisão específica, sendo mais indicado para interações curtas, objetivas e críticas; já o Drawer é um painel lateral que mantém o contexto da tela e suporta conteúdos mais densos e estruturados — como formulários longos, configurações e visualização detalhada — permitindo interações mais complexas sem interromper totalmente o fluxo principal." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: modal("Alterar grupo", TEXT),
          markers: [{ n: 1, target: "cds-header", side: "left" }, { n: 2, target: ".cds-overlay__slot", side: "left" }, { n: 3, target: "cds-footer", side: "right" }],
          legend: ["Modal header", "Slot", "Modal action footer"]
        } },
        { h2: "Composição do componente" },
        { ul: ["Header (opcional): título, botão de fechar e divisor — via `Show Header`.", "Content (obrigatório): área livre no Slot.", "Footer (opcional): ações primária e secundária — via `Show Footer`."] },
        { h3: "Slot — como utilizar" },
        { ol: [
          "Insira o componente Modal na tela", "Localize a área de Slot (Content)", "Arraste um componente para dentro do slot (ex: text, form, empty state, etc.)",
          "Caso o conteúdo seja uma composição própria (ex: múltiplos elementos agrupados), é necessário transformá-la em componente antes de inserir no slot",
          "O conteúdo inserido passa a respeitar o layout e espaçamento do modal automaticamente", "Ajuste o tamanho do conteúdo conforme necessário — o modal se adapta dentro dos limites definidos"
        ] },
        { h2: "Propriedades" },
        { props: [
          { name: "Show Header", type: "Boolean", default: "true" },
          { name: "Show Footer", type: "Boolean", default: "true" },
          { name: "Slot", type: "Slot" }
        ] },
        { note: "Props e padrões lidos do componente Modal da lib estável. O zeroheight ainda lista `Kind` (Default · Confirmation), que a lib não tem: a versão Confirmation é o Confirmation Message dentro do Slot (CONFERIR C131). No código, o fechamento é controlado por `show-close-button` e `dismissible`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Variações" },
        { h3: "Default" },
        { p: "Versão base e mais flexível, permitindo qualquer tipo de conteúdo via slot." },
        { display: { attrs: modal("Alterar grupo", TEXT) } },
        { h3: "Confirmation" },
        { p: "Versão pré-definida para fluxos de confirmação, com estrutura padronizada: layout estruturado (ícone + título + descrição), ênfase em decisão e menos customização." },
        { specimens: { min: "calc(var(--common-sizes-200) + var(--common-sizes-120))", items: [
          { label: "Neutral · ações sem impacto crítico", attrs: modal("", confirmation("neutral", "information-line", "Atualizar dados?", "As informações do perfil serão substituídas."), { "show-header": "false" }) },
          { label: "Warning · possível consequência negativa", attrs: modal("", confirmation("warning", "timer-line", "Sair sem salvar?", "As alterações feitas serão perdidas."), { "show-header": "false", "primary-label": "Sair sem salvar", "secondary-label": "Continuar editando" }) },
          { label: "Positive · confirmações seguras ou sucesso", attrs: modal("", confirmation("positive", "check-line", "Pedido enviado", "Você recebe a confirmação por e-mail."), { "show-header": "false", "primary-label": "Entendi", "show-secondary-action-button": "false" }) }
        ] } },
        { h3: "Dialog" },
        { p: "O Dialog é uma variação do Modal com comportamento mais restritivo, projetada para cenários em que a pessoa usuária precisa tomar uma decisão obrigatória antes de continuar: não possui botão de fechar, não fecha ao clicar fora e exige ação via botão." },
        { display: { attrs: modal("Excluir rascunho?", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Essa ação não pode ser desfeita." }], { "show-close-button": "false", dismissible: "false", "primary-label": "Excluir rascunho", "secondary-label": "Cancelar" }) } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É um `<dialog>` modal: o resto da página fica inerte enquanto o Modal está aberto.",
          "O título do Header é o nome acessível; sem Header, informe `label`.",
          "O botão de fechar é um Icon Button com rótulo (\"Fechar\")."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Ao abrir, o foco entra no Modal e fica preso nele.", "Esc fecha o Modal comum; no Dialog (`dismissible=\"false\"`), só as ações fecham.", "Ao fechar, o foco volta para o elemento que abriu o Modal."] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Modal." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: modal("Alterar grupo", TEXT), title: "Mantenha o conteúdo objetivo", text: "Evite textos longos ou múltiplas decisões. O modal deve ser rápido de entender e agir." },
          { attrs: modal("Alterar grupo", TEXT), title: "Priorize uma ação principal", text: "Destaque claramente a ação principal no footer e reduza ambiguidade entre opções." },
          { attrs: modal("Excluir rascunho?", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Essa ação não pode ser desfeita." }], { "show-close-button": "false" }), title: "Controle o fechamento", text: "Permita fechamento fácil (ícone ou clique fora) em modais comuns, mas restrinja em casos críticos (Dialog)." }
        ] },
        { ul: [
          "Use tamanhos adequados: adapte o conteúdo ao espaço disponível, evitando modais excessivamente grandes ou pequenos.",
          "Utilize sempre com Backdrop: o modal deve estar sempre associado ao componente Backdrop para reforçar o bloqueio da interface e direcionar o foco para o conteúdo exibido.",
          "Evite uso excessivo de modais: como o modal interrompe o fluxo da pessoa usuária, seu uso frequente pode gerar frustração e prejudicar a experiência."
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: modal("Alterar grupo", TEXT), text: "Mantenha sempre o botão de fechar quando o modal não for crítico ou quando não necessitar de uma resposta imediata da pessoa usuária." },
          { kind: "dont", attrs: modal("Excluir rascunho?", [{ _tag: "p", class: "pg-cnt-phone__text", _text: "Essa ação não pode ser desfeita." }]), text: "Quando se tratar de um modal com escolha crítica, não insira o botão de fechar." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção de Motion do Modal no zeroheight ainda é placeholder, e o componente não tem animação de entrada e saída no playground." } }
      ] }
    ]
  };
})();
