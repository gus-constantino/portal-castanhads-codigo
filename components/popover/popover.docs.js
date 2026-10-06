/* Documentação — Popover
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Popover, 62c31f) reaproveitado; props do componente da lib estável (Popover 2270:102);
   comportamento (Popover API nativa) e acessibilidade do playground. O zeroheight não tem a tab Style; a description do set tem um trecho
   de texto gerado por IA ("Com certeza! …") a limpar na lib (C131). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  function item(label, icon){ return { _tag: "cds-content-list-item", label: label, "lead-icon": icon, "show-description": false, "show-trailing-item": false, "show-divider": false }; }
  var MENU = [item("Baixar relatório", "download-line"), item("Compartilhar", "share-line"), item("Editar", "edit-line")];
  function pop(kids){ return { _tag: "cds-popover", inline: true, label: "Mais ações", _children: kids || MENU }; }
  CDS.docs["popover"] = {
    tag: "cds-popover",
    source: "https://castanha.caju.com.br/858426090/v/latest/p/62c31f-popover", sourceLabel: "Abrir o Popover no zeroheight",
    cover: { description: "Popover é um pequeno overlay contextual que aparece quando o usuário interage com um elemento da interface. Ele permite exibir conteúdos adicionais, ações ou informações complementares de forma leve, sem interromper o fluxo principal da experiência.", examples: [pop()] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Web only", text: "O Popover é um componente web only, ou seja, utilizado exclusivamente em experiências web." } },
        { h2: "Sobre" },
        { p: "Popover é um pequeno overlay contextual que aparece quando o usuário interage com um elemento da interface. Ele permite exibir conteúdos adicionais, ações ou informações complementares de forma leve, sem interromper o fluxo principal da experiência." },
        { h3: "Nomes alternativos comuns" },
        { p: "Overlay, Floating panel, Context menu." },
        { h3: "Princípios" },
        { cards: [
          ["Contextualidade", "Deve aparecer sempre em relação direta a um elemento disparador."],
          ["Clareza", "O conteúdo precisa ser claro e diretamente útil."],
          ["Leveza", "Deve ser usado para interações breves, sem interromper o fluxo do usuário."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Popover para apresentar informações ou ações diretamente relacionadas a um elemento, permitindo interações pontuais e contextuais. Ele deve sempre ser acionado por um componente que o dispare e desaparecer quando o foco for perdido." },
        { h3: "Utilize para:" },
        { ul: ["Exibir opções ou ações relacionadas a um elemento interativo.", "Mostrar conteúdos complementares de forma temporária.", "Disponibilizar pequenos blocos de interação sem abrir novas janelas.", "Organizar elementos de escolha ou seleção em contexto."] },
        { h3: "Não utilize para:" },
        { ul: ["Mostrar dicas ou explicações curtas (use Tooltip).", "Exibir informações persistentes que exigem confirmação (use Modal).", "Apresentar conteúdos extensos ou fluxos complexos.", "Exibir mensagens informativas não relacionadas a um trigger."] },
        { h2: "Casos de uso" },
        { h3: "Popover vs Tooltip" },
        { p: "Enquanto o Tooltip serve para apresentar pequenas dicas textuais passivas (geralmente no hover), o Popover é interativo e permite inserir qualquer tipo de conteúdo (botões, textos, formulários) via slot." },
        { compare: [
          { title: "Popover: conteúdo interativo", attrs: pop() },
          { title: "Tooltip: dica textual", attrs: { _tag: "cds-tooltip", text: "Baixa o relatório do mês atual em PDF.", "show-label": false } }
        ] },
        { h3: "Popover vs Modal" },
        { p: "O Modal bloqueia a interação com o restante da interface e é usado para fluxos mais importantes ou decisões críticas. Já o Popover é leve, contextual e não bloqueia o restante da página." },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: pop(), markers: [{ n: 1, target: ".cds-popover__slot", side: "left" }], legend: ["Container com Slot (conteúdo de quem usa)"] } },
        { h2: "Composição do componente" },
        { p: "Container com Surface/default, raio large, Elevation/level 3 e padding 8. O conteúdo é o Slot. Como menu de ações, use o List do DS (ex.: Content List Item), como no Drop Button." },
        { h2: "Propriedades" },
        { props: [{ name: "Slot", type: "Slot" }] },
        { note: "Na lib, o Slot é a única prop do Popover. No código: `for` (id do gatilho), `placement` (bottom-start, bottom-end, bottom, top), `label` e os métodos `show()`, `hide()` e `toggle()`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Gatilho e posição" },
        { p: "Abra o Popover pela tab Playground: ele usa a Popover API nativa e fica ancorado no gatilho, abaixo e alinhado à esquerda (`bottom-start`) por padrão." },
        { display: { attrs: pop() } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O painel tem nome acessível via `label` (ex.: \"Mais ações\").",
          "O gatilho anuncia o estado aberto ou fechado (`aria-expanded`). Com Drop Button, o chevron acompanha.",
          "O conteúdo do Slot mantém a semântica dos componentes usados (lista, botões, links)."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Enter ou Espaço no gatilho abre e fecha.", "Esc e clique fora fecham.", "Ao fechar, o foco volta para o gatilho."] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Popover." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { p: "Não dê detach ao utilizar o slot: o slot do Popover foi projetado para permitir a troca de conteúdo de forma flexível e não destrutiva. Ao dar detach, você perde a conexão com o componente principal, comprometendo o comportamento padrão, o posicionamento e futuras atualizações do design system. Sempre insira o conteúdo dentro do slot mantendo o componente instanciado." },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: [{ _tag: "cds-drop-button", label: "Mais ações", appearance: "neutral", "show-lead-icon": false, active: true }, pop()], text: "Use o Popover para exibir opções ou ações diretamente ligadas ao elemento disparador." },
          { kind: "dont", text: "Não utilize para destacar conteúdos que não estejam associados a um disparador." },
          { kind: "do", attrs: pop(), text: "Mantenha o conteúdo dentro do Popover curto e funcional." },
          { kind: "dont", text: "Evite colocar fluxos longos, formulários extensos ou múltiplas seções dentro do Popover." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação do Popover fornece feedback visual único após ação do usuário ou ativação contextual. É executada uma vez por invocação com entrada/saída suaves para evitar distrações. A reprodução reforça a percepção temporária do conteúdo expandido no sistema." },
        { specs: [
          { title: "Is Active → True (abrir)", rows: [["Gatilho", "On click"], ["Motion Style", "`Selected In/01`"]] },
          { title: "Is Active → False (fechar)", rows: [["Gatilho", "On click"], ["Motion Style", "`Selected Out/01`"]] }
        ] },
        { note: "A entrada e a saída ainda não estão animadas no componente do playground (CONFERIR C131)." }
      ] }
    ]
  };
})();
