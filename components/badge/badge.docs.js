/* Documentação — Badge
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Badge, 97d72a — página "In progress") reaproveitado; props e padrões do set da lib
   estável (Badge 4835:1472, description igual à introduction); acessibilidade e contrastes do playground. Divergências no CONFERIR (C133). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["badge"] = {
  tag: "cds-badge",
  base: { label: "3", viewport: "desktop" },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/97d72a-badge", sourceLabel: "Abrir o Badge no zeroheight",
  cover: { description: "O Badge é um elemento visual usado exclusivamente para indicar notificações ou atualizações. Ele serve como um alerta discreto que informa a pessoa usuária sobre algo novo ou pendente em um determinado contexto da interface.", examples: [
    { _tag: "cds-icon-button", icon: "notification-line", label: "Notificações, 3 novas", appearance: "neutral", "show-notification": true, notification: "3" }, { label: "3" }, { label: "Novo", appearance: "neutral" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "warning", label: "Em andamento", text: "A página do Badge no zeroheight está como \"In progress\": o texto pode mudar." } },
      { h2: "Sobre" },
      { p: "O Badge é um elemento visual usado exclusivamente para indicar notificações ou atualizações. Ele serve como um alerta discreto que informa a pessoa usuária sobre algo novo ou pendente em um determinado contexto da interface." },
      { h3: "Nomes alternativos comuns" },
      { p: "Notification badge, Counter, Indicator" },
      { h3: "Princípios" },
      { cards: [
        ["Informatividade", "O Badge deve indicar de forma clara a presença de novas notificações ou atualizações, ajudando a pessoa usuária a identificar rapidamente o que requer atenção."],
        ["Discrição", "Deve chamar atenção sem interromper a experiência da pessoa usuária, mantendo uma presença visual equilibrada e contextual."],
        ["Consistência", "Deve seguir padrões definidos de posicionamento, cor e tamanho, garantindo previsibilidade e coerência em todas as interfaces."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Badge apenas para indicar a existência de notificações, contagens de novas mensagens ou atualizações que requerem atenção da pessoa usuária. Ele deve complementar o conteúdo principal, nunca substituí-lo, e ser aplicado de forma sutil e consistente." },
      { h3: "Utilize para:" },
      { ul: ["Mostrar o número de notificações não lidas.", "Indicar novas mensagens, alertas ou atualizações.", "Sinalizar que há novos itens em uma lista ou seção."] },
      { h3: "Não utilize para:" },
      { ul: ["Indicar status (como ativo, inativo, sucesso ou erro). Para isso, utilize a Tag.", "Classificar ou categorizar conteúdos. Para isso, utilize a Tag.", "Exibir textos descritivos ou informações longas.", "Servir como botão, link ou elemento interativo."] },
      { h2: "Casos de uso" },
      { h3: "Badge vs Tag" },
      { p: "A Tag é usada para categorizar ou rotular conteúdos, podendo aparecer isoladamente. Já o Badge é exclusivamente informativo e indica novas notificações relacionadas a outro elemento, como um ícone, botão ou item de navegação." },
      { compare: [
        { title: "Badge: notificação ligada a um elemento", attrs: { _tag: "cds-icon-button", icon: "notification-line", label: "Notificações, 3 novas", appearance: "neutral", "show-notification": true, notification: "3" } },
        { title: "Tag: categoria ou status", attrs: { _tag: "cds-tag", label: "Em análise", appearance: "warning", "show-lead-item": false } }
      ] },
      { h3: "Badge vs Chip Input / Chip Select" },
      { p: "O Chip é um componente interativo, usado para ações, filtros ou seleção de itens. O Badge, por outro lado, não tem função clicável — ele apenas sinaliza a presença de novas informações." },
      { note: "Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { compare: [
        { title: "Counter: Container + número", attrs: { label: "3" } },
        { title: "Text: Container + texto", attrs: { label: "Novo" } },
        { title: "Counter mobile: ponto", attrs: { label: "3", viewport: "mobile" } }
      ] },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Warning", values: ["Warning", "Neutral"] },
        { name: "Label", type: "Text", default: "0" }
      ] },
      { note: "Props e padrões lidos do set Badge da lib estável. O zeroheight lista `Kind` (Text · Counter) e chama `Appearance` de Style; na lib, Counter e Text são o mesmo componente com o conteúdo do `Label`, e o ponto do mobile vem da collection Viewport (CONFERIR C133). No código, `viewport` força Desktop ou Mobile." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance" },
      { specimens: { min: "var(--common-sizes-120)", items: [{ label: "Warning", attrs: {} }, { label: "Neutral", attrs: { appearance: "neutral" } }] } },
      { h2: "Web e Mobile" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Web · Counter", attrs: { label: "12" } }, { label: "Web · Text", attrs: { label: "Novo" } }, { label: "Web · 99+", attrs: { label: "99+" } }, { label: "Mobile · ponto", attrs: { viewport: "mobile" } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "O Badge é visual: inclua a contagem no nome do elemento ao qual ele pertence (ex.: Icon Button \"Notificações, 3 novas\").",
        "No mobile, o ponto não tem número: o nome acessível precisa dizer que há novidades.",
        "Ao mudar a contagem, use uma região `aria-live=\"polite\"` se a pessoa precisar ser avisada."
      ] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Warning: 10,17:1 — AA e AAA.", "Neutral: 16,96:1 — AA e AAA."] },
      { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Badge." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: { _tag: "cds-icon-button", icon: "notification-line", label: "Notificações, 3 novas", appearance: "neutral", "show-notification": true, notification: "3" }, title: "Posicionamento", text: "Posicione o Badge sempre próximo ao elemento que origina a notificação, como um ícone, botão ou item de navegação. Evite posicioná-lo de forma solta ou distante, pois isso pode gerar confusão sobre o que exatamente está sendo notificado." },
        { attrs: [{ label: "9" }, { label: "42" }, { label: "99+" }], title: "Variante Counter", text: "Na variante Counter, exiba no máximo dois dígitos numéricos para manter a legibilidade e o equilíbrio visual do componente. Quando o valor ultrapassar esse limite, utilize o formato “99+”." },
        { attrs: { label: "Novo" }, title: "Variante Text", text: "A variante Text do Badge deve ser utilizada exclusivamente em contextos Web e somente para indicar notificações. Ela não deve ser usada para representar status — nesses casos, utilize o componente Tag. O texto exibido (label) precisa ser curto, direto e facilmente compreensível." },
        { attrs: { viewport: "mobile" }, title: "Counter mobile (dot)", text: "Essa variante é representada por um ponto simples, sem exibir números ou texto, e deve ser usada exclusivamente em interfaces mobile. Seu propósito é indicar de forma discreta que há novas notificações, sem detalhar a quantidade." },
        { attrs: { _tag: "cds-icon-button", icon: "notification-line", label: "Notificações, 12 novas", appearance: "neutral", "show-notification": true, notification: "12" }, title: "Icon button", text: "Quando o Badge for aplicado em um Icon Button, utilize exclusivamente a variante Counter, exibindo apenas valores numéricos. O uso de texto não é permitido." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { _tag: "cds-icon-button", icon: "notification-line", label: "Notificações, 3 novas", appearance: "neutral", "show-notification": true, notification: "3" }, text: "Use o Badge apenas para indicar notificações." },
        { kind: "dont", attrs: { label: "Ativo", appearance: "neutral" }, text: "Não use para representar status ou categorias." },
        { kind: "do", attrs: { label: "99+" }, text: "Mantenha o número curto e dentro do limite visual do componente. Acima de 2 caracteres, utilize 99+" },
        { kind: "dont", attrs: { label: "1250" }, text: "Não exiba números muito grandes que comprometam a legibilidade." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação do Badge fornece feedback visual único após ação do usuário ou nova informação. É executada uma vez por evento para evitar distrações. A reprodução reforça a percepção do status atualizado no sistema." },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight indica a Notificação com easing systemic/decelerate e duração medium/01, que não corresponde a nenhum Motion Style da `.Motion Styles`. A animação ainda não está no componente do playground (CONFERIR C133)." } }
    ] }
  ]
};
