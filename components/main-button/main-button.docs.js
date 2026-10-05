/* Documentação — Main Button
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Main button, 0983f6) reaproveitado; props e padrões validados no set da lib estável
   (Main Button 4464:427, key 3805ac7e…); acessibilidade e contrastes medidos no componente do playground; tab Conteúdo do [NEW] Content (6400:15361, D98).
   Divergências zeroheight × lib no CONFERIR (C142): nomes Type/Style (lib: Kind/Appearance), estado Loading (não existe na lib), Trailing Icon aninhado. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.docs["main-button"] = {
    tag: "cds-main-button",
    base: { label: "Label", "show-lead-icon": false, "show-trailing-icon": false },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/0983f6-main-button", sourceLabel: "Abrir o Main button no zeroheight",
    cover: { description: "Main Button é um componente interativo usado para executar a ações mais importantes em uma tela, formulário ou fluxo.", examples: [
      { label: "Salvar alterações" }, { label: "Cancelar", appearance: "neutral" }, { label: "Saiba mais", kind: "ghost" }
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "Main Button é um componente interativo usado para executar a ações mais importantes em uma tela, formulário ou fluxo." },
        { h3: "Nomes alternativos comuns" },
        { p: "Botão, CTA, Button, Call to Action." },
        { h3: "Princípios" },
        { cards: [
          ["Identificável", "Os botões devem indicar que podem desencadear uma ação."],
          ["Encontrável", "Os botões devem ser fáceis de encontrar entre outros elementos, incluindo outros botões."],
          ["Claro", "A ação e o estado de um botão devem ser claros."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Main Button para representar ações diretas e claras que o usuário pode realizar. Ele deve ser facilmente identificado e utilizar verbos no infinitivo ou imperativo (ex: Salvar, Enviar, Confirmar)." },
        { h3: "Utilize para:" },
        { ul: ["Iniciar um processo (ex: \"Enviar formulário\").", "Navegar para uma próxima etapa (ex: \"Próximo\").", "Confirmar ou cancelar ações.", "Destacar a ação principal em uma tela ou modal."] },
        { h3: "Não utilize para:" },
        { ul: ["Exibir informações estáticas.", "Simular links de navegação (prefira o componente Link).", "Realizar múltiplas ações conflitantes em um único botão."] },
        { h2: "Casos de uso" },
        { h3: "Main button vs Link" },
        { p: "Use o Main Button quando a ação do usuário resultar em uma mudança no estado da interface ou disparar um processo — como enviar um formulário, salvar dados, excluir itens ou confirmar escolhas. Já o Link deve ser usado exclusivamente para navegação, direcionando o usuário a outra página, rota ou seção dentro da mesma interface, sem alterar dados ou estados." },
        { compare: [
          { title: "Main Button: ação", attrs: { label: "Enviar formulário" } },
          { title: "Link: navegação", attrs: { _tag: "cds-link", label: "Leia os termos e condições de uso.", href: "#", appearance: "accent" } }
        ] },
        { h3: "Main button vs Icon button" },
        { p: "Use o Main Button quando for necessário exibir uma ação com um rótulo textual claro, garantindo acessibilidade e entendimento imediato — especialmente em ações críticas ou menos óbvias. O Icon Button é indicado para ações rápidas, recorrentes ou com espaço limitado, desde que o ícone utilizado comunique de forma autossuficiente sua função (ex: fechar, editar, favoritar)." },
        { compare: [
          { title: "Main Button: rótulo textual", attrs: { label: "Editar", "show-lead-icon": true, "lead-icon": "edit-line" } },
          { title: "Icon Button: ação rápida", attrs: { _tag: "cds-icon-button", icon: "edit-line", label: "Editar", kind: "ghost", appearance: "neutral" } }
        ] },
        { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: { label: "Label", "show-lead-icon": true, "show-trailing-icon": true },
          markers: [
            { n: 1, target: ".cds-btn", side: "left" },
            { n: 2, target: ".cds-btn > cds-icon:first-child", side: "top" },
            { n: 3, target: ".cds-btn > span", side: "bottom" },
            { n: 4, target: ".cds-btn > cds-icon:last-child", side: "right" }
          ],
          legend: ["Container", "Lead Icon (Icon)", "Label", "Trailing Icon (Icon)"]
        } },
        { h2: "Composição do componente" },
        { p: "O componente Main Button é composto por quatro elementos principais: o Container (1), que define o tamanho, preenchimento, bordas e fundo do botão; o Lead Icon (2), posicionado à esquerda do texto para reforçar o significado da ação; o Label (3), que representa o texto central do botão e comunica claramente a ação ao usuário; e o Trailing Icon (4), opcional e posicionado à direita do texto, geralmente utilizado para indicar menus suspensos, avanços de etapas ou outras ações complementares. Todos os elementos são configuráveis e opcionais, com exceção do label, que é obrigatório." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Default", values: ["Default", "Ghost"] },
          { name: "Appearance", type: "Variant", default: "Accent", values: ["Accent", "Neutral", "Inversed"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Disabled"] },
          { name: "Size", type: "Variant", default: "Medium", values: ["Medium", "Small"] },
          { name: "Text Label", type: "Text", default: "Label" },
          { name: "Show Lead Icon", type: "Boolean", default: "true" },
          { name: "Lead Icon", type: "Swap component", default: "placeholder-line" },
          { name: "Show Trailing Icon", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Main Button da lib estável. No zeroheight, `Kind` e `Appearance` aparecem como Type e Style, e há um estado Loading que a lib não tem (CONFERIR C142). Todas as props podem ser testadas na tab Playground." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind × Appearance" },
        { specimens: { title: "Default", min: "var(--common-sizes-160)", items: [
          { label: "Accent", attrs: {} }, { label: "Neutral", attrs: { appearance: "neutral" } }, { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-main-button", label: "Label", appearance: "inversed", "show-lead-icon": false, "show-trailing-icon": false }] } }
        ] } },
        { specimens: { title: "Ghost", min: "var(--common-sizes-160)", items: [
          { label: "Accent", attrs: { kind: "ghost" } }, { label: "Neutral", attrs: { kind: "ghost", appearance: "neutral" } }, { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-main-button", label: "Label", appearance: "inversed", "show-lead-icon": false, "show-trailing-icon": false, kind: "ghost" }] } }
        ] } },
        { note: "Inversed é para fundos escuros ou coloridos: os exemplos aparecem sobre `Surface/accent`." },
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Enabled", attrs: {} }, { label: "Hovered", attrs: { state: "hovered" } }, { label: "Pressed", attrs: { state: "pressed" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Size" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Medium · 48", attrs: {} }, { label: "Small · 40", attrs: { size: "small" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "É um `<button>` nativo: anunciado como botão, com o texto do Label como nome.",
          "Os ícones são decorativos; o nome vem só do Label.",
          "Disabled usa `disabled` nativo: sai da tabulação e é anunciado como indisponível.",
          "Dentro de formulário, use `type=\"submit\"` só no botão que envia."
        ] },
        { h2: "Teclado e foco" },
        { ul: ["Tab foca o botão; Enter e Espaço acionam.", "Foco visível segue o padrão global do Castanha; não é variant do componente.", "Área de toque: 48 (Medium) e 40 (Small) de altura."] },
        { h2: "Contraste (WCAG)" },
        { ul: [
          "Default · Accent: texto `Text/inversed` sobre `Accent/Solid/medium` — 4,54:1, AA.",
          "Default · Neutral: 15,27:1 — AA e AAA.",
          "Default · Inversed: 16,96:1 — AA e AAA.",
          "Ghost · Accent: texto Accent sobre `Surface/default` — 4,54:1, AA.",
          "Estado desabilitado: isento do critério 1.4.3."
        ] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Main button." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Hierarquia" },
        { p: "Os estilos do Main Button seguem três níveis de ênfase, cada um associado a um contexto de importância da ação e à hierarquia visual dentro da interface:" },
        { display: { attrs: [{ label: "Ação principal" }, { label: "Ação secundária", appearance: "neutral" }, { label: "Ação terciária", kind: "ghost", appearance: "neutral" }] } },
        { h2: "Web" },
        { guides: [
          { attrs: { label: "Salvar alterações" }, title: "Labels", text: "Os labels dos botões devem ser claros, objetivos e descritivos, indicando exatamente qual ação será realizada ao clicar. Evite termos genéricos como “OK” ou “Clique aqui” e prefira comandos que explicitem o resultado da ação, como “Enviar formulário”, “Salvar alterações” ou “Remover item”." },
          { attrs: { label: "Baixar", "show-lead-icon": true, "lead-icon": "download-line" }, title: "Uso de ícones no Main button", text: "Ícones podem complementar o texto de um botão e reforçar visualmente o significado da ação, mas devem ser usados com intenção clara. Inclua ícones apenas quando eles agregarem valor sem comprometer a legibilidade ou a hierarquia visual do botão." }
        ] },
        { h2: "Mobile" },
        { guides: [
          { attrs: { _tag: "cds-fixed-bar", kind: "pilled", "primary-label": "Continuar", "secondary-label": "Voltar", "show-lead-icon": false, style: "width:100%" }, title: "Main button em mobile", text: "Em mobile, recomenda-se o empilhamento vertical de botões, não utilizando a disposição lado a lado, que pode gerar toques acidentais e dificultar a interação. Sempre que possível, o botão deve ocupar 100% da largura disponível na tela." },
          { attrs: { _tag: "cds-fixed-bar", kind: "pilled", "primary-label": "Continuar", "show-secondary-action": false, "show-lead-icon": false, style: "width:100%" }, title: "Priorize a ação principal no topo ou rodapé fixo", text: "Em fluxos mobile, o Main Button deve estar visível e facilmente acessível, preferencialmente fixado no rodapé da tela ou logo após o conteúdo principal." }
        ] },
        { h2: "Ação destrutiva" },
        { p: "Mesmo sem um estilo visual específico para ações destrutivas, o uso do Main Button na versão default/accent é o mais indicado nesses casos. É essencial que a label do botão seja clara e direta, deixando evidente a consequência da ação — por exemplo: “Excluir item”, “Remover usuário” ou “Encerrar sessão”. Evite termos genéricos como “Confirmar” ou “OK”." },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: [{ label: "Salvar" }, { label: "Cancelar", appearance: "neutral" }], text: "Use apenas um Main Button primário (accent) por tela ou seção." },
          { kind: "dont", attrs: [{ label: "Salvar" }, { label: "Cancelar" }], text: "Não use múltiplos Main Buttons primários em uma mesma hierarquia visual." },
          { kind: "do", attrs: { label: "Baixar", "show-lead-icon": true, "lead-icon": "download-line" }, text: "Inclua ícones apenas quando agregarem valor e sem prejudicar a legibilidade." },
          { kind: "dont", attrs: { label: "Baixar", "show-lead-icon": true, "lead-icon": "settings-line" }, text: "Não insira ícones que não comuniquem claramente a ação." },
          { kind: "do", attrs: { label: "Enviar" }, text: "Use o Main Button para ações (ex: enviar, excluir, confirmar)." },
          { kind: "dont", attrs: { label: "Ir para Relatórios", kind: "ghost" }, text: "Não use o Main Button como elemento de navegação entre páginas — use o componente Link nesses casos." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A animação abrange os estados de interação. Não há delay nos estágios da animação, cada estagio acontece em tempo real de acordo com a interação do usuário com o componente." },
        { display: { attrs: { label: "Label" }, live: true } },
        { note: "Exemplo interativo: passe o mouse e pressione o botão para ver cada transição." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { p: "Reduced motion: honrar `prefers-reduced-motion: reduce` (as transições são desligadas no código)." }
      ] },
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O texto do botão é o contrato com a pessoa usuária: ela precisa saber exatamente o que vai acontecer antes de clicar." },
        { h3: "Como escrever" },
        { ul: [
          "Use infinitivo em botões e áreas clicáveis. Não use pronomes possessivos.",
          "Se precisar usar pronome, use na terceira pessoa (seu/sua).",
          "Use imperativo apenas em botões de peças de marketing.",
          "O texto deve seguir os mesmos termos usados no título e na descrição da tela. A pessoa deve conseguir ler o header e o botão e relacionar as duas informações.",
          "Use no máximo 3 palavras. Nunca quebre o texto em mais de uma linha.",
          "Nunca use ponto final ou ponto de exclamação.",
          "Evite labels genéricas como \"Sim\", \"Não\", ”Entendi” ou \"Ok\". Seja específico."
        ] },
        { h3: "Ações destrutivas" },
        { p: "Mesmo sem um estilo visual específico, deixe claro na label quando a ação é irreversível. A pessoa não pode ter dúvida sobre o que vai acontecer. Exemplo:" },
        { display: { attrs: [
          { _tag: "cds-main-button", label: "Sair sem salvar", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Remover colaborador", "show-lead-icon": false, "show-trailing-icon": false },
          { _tag: "cds-main-button", label: "Sair do app", "show-lead-icon": false, "show-trailing-icon": false }
        ] } },
        { h3: "Labels padronizadas" },
        { table: { wrap: true, head: ["Label", "Quando usar"], rows: [
          ["Aplicar", "CTA padrão para aplicar filtros selecionados."],
          ["Cancelar", "Quando a pessoa desiste de uma edição, sem sair do fluxo. Sempre aparece junto com \"Salvar alterações\"."],
          ["Confirmar", "Final de fluxo onde a última tela é uma revisão de dados antes da conclusão da ação."],
          ["Concluir", "Encerra onboardings que tem mais de uma etapa."],
          ["Continuar", "Avança para a próxima etapa sem finalizar o fluxo. Não usar em telas de revisão ou encerramento."],
          ["Continuar editando", "Pop-ups ou bottom sheets que desistem de uma confirmação. Nunca use \"Cancelar\" nesses casos. Exceção: use \"Voltar\" quando o contexto não for coerente com \"edição\"."],
          ["Detalhes", "Abre mais informações sobre uma área, colaborador ou pedido."],
          ["Dúvidas frequentes", "Leva para artigo na FAQ. Uso exclusivo no componente shortcut."],
          ["Falar com a Caju", "Abre WhatsApp ou e-mail do time de CX."],
          ["Fechar", "Encerra algo sem impacto ou decisão (onboardings, modais informativos). Também usado quando o modal não tem \"X\" no canto superior."],
          ["Já recebi e quero ativar", "Texto fixo — não modifique. Caso seja alterado, deve ser atualizada a carta berço do cartão físico."],
          ["Limpar", "Remove os filtros aplicados."],
          ["Me lembrar mais tarde", "Fecha pop-ups ou bottom sheets que voltam a aparecer até a ação ser concluída."],
          ["Não encontrei o código", "Telas de código de desbloqueio, abre modal explicativo sobre onde encontrar o código."],
          ["Não mostrar novamente", "Encerra pop-ups ou bottom sheets que não voltam a aparecer."],
          ["Preciso de ajuda", "Abre artigos da FAQ."],
          ["Pular", "Pula uma etapa não obrigatória do fluxo."],
          ["Quero saber mais", "Abre artigo ou categoria da FAQ sobre novidades. Tom mais leve que \"Preciso de ajuda\"."],
          ["Quero ser avisado", "A pessoa sinaliza que quer ser comunicada sobre uma mudança ou retorno de instabilidade."],
          ["Sair sem salvar", "Abandona o fluxo com perda de dados. Deixa claro que as informações não serão salvas."],
          ["Saiba mais", "Exclusivo para peças de marketing (banners, campanhas, formulários externos)."],
          ["Salvar alterações", "Confirma uma edição em formulário."],
          ["Sim, cancelar", "Confirma o cancelamento de uma ação já iniciada. Remove ambiguidade do termo \"Cancelar\"."],
          ["Voltar", "Retorna a uma etapa anterior sem sair do fluxo. Exceção: use \"Voltar\" em vez de \"Continuar editando\" quando o contexto não for coerente com edição."],
          ["[Apenas Sponsor] Voltar para [Nome da área]", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo. Nome da área sempre com letra maiúscula."],
          ["[Apenas Employee] Fechar", "Telas de finalização (sucesso ou erro). Leva de volta a uma área principal após concluir ou falhar um fluxo."]
        ] } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Botões. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
