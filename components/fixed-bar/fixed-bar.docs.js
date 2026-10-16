/* Documentação — Fixed Bar
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Fixed bar, 04e411) reaproveitado e completado com a description do set da lib
   ([Beta] Fixed Bar 24037:2929: Quando não usar dentro de Modal, Drawer e Bottom Sheet); props e padrões do set; acessibilidade do playground.
   O zeroheight não tem a tab Style e o Motion é placeholder (C131). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["fixed-bar"] = {
  tag: "cds-fixed-bar",
  base: { "primary-label": "Continuar", "secondary-label": "Voltar", "show-lead-icon": false, style: "width:100%" },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/04e411-fixed-bar", sourceLabel: "Abrir a Fixed bar no zeroheight",
  cover: { description: "A Fixed bar é uma área fixa posicionada na base da interface que agrupa duas ações relacionadas — uma primária e outra secundária. Ela é utilizada para decisões importantes no final de fluxos ou seções, permanecendo sempre acessível para a pessoa usuária.", examples: [
    { "primary-label": "Continuar", "secondary-label": "Voltar", "show-lead-icon": false, style: "width:calc(var(--common-sizes-200) * 2)" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "informative", label: "Beta", text: "O set ainda está como [Beta] Fixed Bar na lib. Escopo: Mobile e Desktop." } },
      { h2: "Sobre" },
      { p: "A Fixed bar é uma área fixa posicionada na base da interface que agrupa duas ações relacionadas — uma primária e outra secundária. Ela é utilizada para decisões importantes no final de fluxos ou seções, permanecendo sempre acessível para a pessoa usuária." },
      { h3: "Nomes alternativos comuns" },
      { p: "Bottom Action Bar, Sticky Footer Actions, Footer Button Group, Sticky Action Bar" },
      { h3: "Princípios" },
      { cards: [
        ["Prioridade clara", "A ação primária deve ser evidente, mantendo hierarquia visual entre os botões."],
        ["Consistência responsiva", "O componente adapta sua organização conforme o dispositivo, preservando usabilidade e clareza."],
        ["Acesso imediato", "Mantém ações críticas sempre disponíveis, eliminando scroll desnecessário."]
      ] },
      { h2: "Quando usar" },
      { p: "Use a Fixed bar quando for necessário manter uma ou duas ações essenciais sempre visíveis, especialmente ao final de fluxos, em decisões importantes ou em etapas que exigem resposta imediata da pessoa usuária. Ela ajuda a evitar que a pessoa usuária precise rolar até o fim da página para concluir uma tarefa." },
      { h3: "Utilize para:" },
      { ul: ["Exibir uma única ação primária de conclusão ou avanço.", "Exibir ação primária + ação secundária (ex.: confirmar e cancelar).", "Finalização de fluxos como pagamentos, revisões ou envios.", "Telas onde a tomada de decisão acontece ao fim do conteúdo, mas precisa permanecer visível."] },
      { h3: "Não utilize para:" },
      { ul: [
        "Exibir mais de duas ações simultâneas.", "Ações que não têm relação direta entre si.", "Estruturas em que as ações já estão evidentes no próprio conteúdo.", "Ações exclusivamente secundárias, em que a ação principal não esteja no final da página.",
        "Dentro de Modal, Drawer ou Bottom Sheet: esses componentes já têm rodapé de ações próprio.",
        "Navegação entre seções do produto: esse é papel da barra de navegação, não do Fixed Bar."
      ] },
      { note: "Os dois últimos itens de Não utilize para vêm da description do set na lib. Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { h3: "Desktop/Tablet" },
      { anatomy: {
        attrs: { "primary-label": "Continuar", "secondary-label": "Voltar", "show-lead-icon": false, style: "width:calc(var(--common-sizes-200) * 2)" },
        markers: [{ n: 1, target: ".cds-footer__actions > cds-main-button:last-child", side: "right" }, { n: 2, target: ".cds-footer__actions > cds-main-button:first-child", side: "left" }, { n: 3, target: "cds-fixed-bar", side: "right", align: "start" }, { n: 4, target: "cds-divider", side: "left" }],
        legend: ["Primary action (Ação primária)", "Secondary action (Ação secundária · Show Secondary Action)", "Bottom fixed container", "Divider (Show Divider)"]
      } },
      { h3: "Mobile" },
      { anatomy: {
        attrs: { kind: "pilled", "primary-label": "Continuar", "secondary-label": "Voltar", "show-lead-icon": false, style: "width:calc(var(--common-sizes-160) * 2)" },
        markers: [{ n: 5, target: ".cds-footer__actions > cds-main-button:first-child", side: "left" }, { n: 6, target: ".cds-footer__actions > cds-main-button:last-child", side: "right" }, { n: 7, target: "cds-fixed-bar", side: "left", align: "end" }],
        legend: ["Secondary action", "Primary action", "Bottom fixed container"]
      } },
      { h2: "Composição do componente" },
      { p: "Mesma estrutura do .Footer: Divider e Action Buttons com Main Buttons Neutral (secundária) e Accent (primária). Em `Horizontal`, os botões ficam lado a lado no tamanho do conteúdo. Em `Pilled`, empilhados e com largura total." },
      { h2: "Propriedades" },
      { props: [
        { name: "Kind", type: "Variant", default: "Horizontal", values: ["Horizontal", "Pilled"] },
        { name: "Show Divider", type: "Boolean", default: "true" },
        { name: "Show Secondary Action", type: "Boolean", default: "true" }
      ] },
      { note: "Props e padrões lidos do set [Beta] Fixed Bar da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código, `fixed` ancora a barra no fim da viewport." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Kind" },
      { specimens: { min: "var(--common-sizes-200)", items: [{ label: "Horizontal", attrs: {} }, { label: "Pilled", attrs: { kind: "pilled" } }] } },
      { h2: "Variações" },
      { specimens: { min: "var(--common-sizes-200)", items: [
        { label: "Ação primária sozinha", attrs: { "show-secondary-action": false } },
        { label: "Sem Divider", attrs: { "show-divider": false } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "As ações são Main Buttons (`<button>`) com o Label como nome. A ordem de leitura segue a visual: secundária e depois primária.",
        "Ancorada (`fixed`), a barra não pode cobrir o conteúdo: reserve espaço no fim da página para o último item ficar visível.",
        "O Divider é decorativo."
      ] },
      { h2: "Teclado e foco" },
      { ul: ["Tab percorre as ações na ordem visual.", "Ao rolar com o foco num campo, o campo não pode ficar escondido atrás da barra."] },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para a Fixed bar." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: { "show-secondary-action": false, kind: "pilled" }, title: "Use a Fixed bar somente quando o conteúdo da página exige rolagem", text: "A Fixed bar é mais efetiva em telas longas, onde o botão primário poderia ficar escondido ao final do conteúdo. Em telas curtas, em que a ação já está visível sem rolagem, a Fixed bar se torna redundante e pode gerar saturação visual." },
        { attrs: { kind: "pilled", "secondary-label": "Ignorar por agora" }, title: "Escolha entre “ação primária” ou “primária + secundária” conforme a complexidade da decisão", text: "Use a ação primária sozinha quando há um único caminho esperado para prosseguir. Use primária + secundária quando existe uma alternativa relevante — como “Voltar”, “Cancelar” ou “Ignorar por agora”. Evite adicionar ações sem importância real, pois a Fixed bar tem forte poder de chamar atenção." },
        { attrs: { "primary-label": "Enviar pedido", "secondary-label": "Revisar" }, title: "Use a Fixed bar como finalização orquestrada do fluxo", text: "A Fixed bar deve marcar a etapa em que a pessoa usuária tomou conhecimento do conteúdo da tela e está pronta para avançar. Em fluxos de leitura, preenchimento ou tomada de decisão, ela deve aparecer como o “próximo passo natural”, não de forma precipitada." },
        { attrs: [{ kind: "pilled" }, {}], title: "Respeite a largura total da tela em mobile e layout fluido em desktop", text: "Em mobile, a Fixed bar deve ocupar toda a largura para parecer integrada ao rodapé. Em desktop, ela funciona melhor com alinhamento horizontal dos botões, respeitando a grid e evitando largura excessiva que gere sensação de peso." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { "primary-label": "Concluir", "show-secondary-action": false }, text: "Reserve a Fixed bar para ações críticas da tela, como o próximo passo lógico ou a conclusão do fluxo. Ela deve destacar somente aquilo que a pessoa usuária realmente precisa fazer naquele momento." },
        { kind: "dont", text: "Evite inserir links secundários, atalhos ou informações complementares na Fixed bar. Isso reduz a clareza da ação principal e pode desviar a pessoa usuária do objetivo do fluxo." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção de Motion da Fixed bar no zeroheight ainda é placeholder. Os botões seguem o motion do Main Button (`Hover In/01`, `Pressed/01`)." } }
    ] }
  ]
};
