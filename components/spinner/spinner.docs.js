/* Documentação — Spinner
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Spinner, 842bcc) reaproveitado; props e padrões do set da lib estável
   (Spinner 4333:3181); acessibilidade do playground (role="status"). Divergências no CONFERIR (C133). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["spinner"] = {
  tag: "cds-spinner",
  source: "https://castanha.caju.com.br/858426090/v/latest/p/842bcc-spinner", sourceLabel: "Abrir o Spinner no zeroheight",
  cover: { description: "O Spinner é um indicador visual de atividade não interativa que informa à pessoa usuária que o sistema está processando uma ação em segundo plano.", examples: [
    { size: "large", appearance: "accent" }, { size: "large" }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Spinner é um indicador visual de atividade não interativa que informa à pessoa usuária que o sistema está processando uma ação em segundo plano. Ele representa estados de carregamento contínuo em que não é possível determinar a duração exata da operação." },
      { h3: "Nomes alternativos comuns" },
      { p: "Loading indicator, Loading spinner, Indicador de carregamento." },
      { h3: "Princípios" },
      { cards: [
        ["Clareza de estado", "Comunica de imediato que há um processo em execução, evitando incerteza sobre a resposta do sistema."],
        ["Discrição visual", "Deve ser utilizado sem competir com o conteúdo; sua função é informar, não chamar atenção excessiva."],
        ["Coerência temporal", "Só deve aparecer enquanto uma atividade estiver efetivamente em andamento e desaparecer assim que terminar."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Spinner quando o sistema estiver executando um processamento cujo tempo não pode ser estimado, mas é necessário sinalizar que a ação foi recebida e está em andamento. Ele é adequado para carregamentos curtos ou médios, especialmente em contextos nos quais o conteúdo ainda não está disponível ou a interface não pode ser atualizada até a conclusão do processo." },
      { h3: "Utilize para:" },
      { ul: ["Indicar carregamento de dados sem duração conhecida.", "Sinalizar processos breves que não justificam a exibição de um Skeleton ou barra de progresso.", "Ações de envio, busca ou processamento que bloqueiam temporariamente parte da interface.", "Quando é importante mostrar que o sistema está ativo e não travado."] },
      { h3: "Não utilize para:" },
      { ul: ["Processos longos e previsíveis (use barra de progresso).", "Substituir conteúdo estruturado sendo carregado (use Skeleton).", "Situações em que a pessoa usuária precisa saber quanto tempo ainda falta."] },
      { h2: "Casos de uso" },
      { h3: "Spinner vs Skeleton" },
      { p: "O Spinner indica uma atividade contínua sem previsão de duração, comunicando apenas que o processo está em andamento. Já o Skeleton representa a estrutura do conteúdo que será exibido, oferecendo uma prévia visual da interface final." },
      { h3: "Spinner vs Progress line" },
      { p: "A principal diferença está na previsibilidade do tempo. O Spinner sugere que algo está acontecendo, mas sem indicar duração ou avanço, sendo ideal para ações rápidas ou imprevisíveis. A Progress line, por outro lado, comunica progresso mensurável. Por isso, processos mais longos, ou que têm etapas previsíveis, devem preferencialmente usar Progress line em vez do Spinner." },
      { compare: [
        { title: "Spinner: duração indeterminada", attrs: { size: "large", appearance: "accent" } },
        { title: "Progress Line: avanço mensurável", attrs: { _tag: "cds-progress-line", percent: "60", label: "Envio", style: "width:calc(var(--common-sizes-200) + var(--common-sizes-40))" } }
      ] },
      { note: "O Skeleton ainda não existe no Castanha DS. Suporte: canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { display: { attrs: { size: "large", appearance: "accent", style: "width:var(--common-sizes-80);height:var(--common-sizes-80)" } } },
      { ol: ["Progress indicator (arco de 90° que gira)", "Circle track (anel de fundo)"] },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Accent", "Neutral", "Inversed"] },
        { name: "Size", type: "Variant", default: "Small", values: ["Small", "Medium", "Large"] },
        { name: "Spinner Position", type: "Variant", default: "0", values: ["0", "1", "2", "3"] }
      ] },
      { note: "Props e padrões lidos do set Spinner da lib estável (o zeroheight chama `Appearance` de Style). `Spinner Position` é o quadro da animação de protótipo: no código vira rotação contínua. Tamanhos: Small 16, Medium 24, Large 32. No código, `label` é o texto anunciado (padrão \"Carregando\")." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance" },
      { specimens: { min: "var(--common-sizes-120)", items: [
        { label: "Accent", attrs: { size: "large", appearance: "accent" } }, { label: "Neutral", attrs: { size: "large" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-spinner", size: "large", appearance: "inversed" }] } }
      ] } },
      { h2: "Size" },
      { specimens: { min: "var(--common-sizes-120)", items: [{ label: "Small · 16", attrs: { appearance: "accent" } }, { label: "Medium · 24", attrs: { size: "medium", appearance: "accent" } }, { label: "Large · 32", attrs: { size: "large", appearance: "accent" } }] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "É anunciado como status (`role=\"status\"`), com o nome de `label` (padrão \"Carregando\"). Use um texto que diga o que carrega (ex.: \"Carregando extrato\").",
        "O desenho é decorativo (`aria-hidden`).",
        "Quando o carregamento terminar, remova o Spinner e mostre o conteúdo ou a mensagem de resultado."
      ] },
      { h2: "Movimento" },
      { p: "Com `prefers-reduced-motion: reduce`, o giro precisa continuar indicando atividade de forma suave; não remova o indicador." },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para o Spinner." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [{ attrs: { _tag: "cds-main-button", label: "Enviando", disabled: true, "show-lead-icon": false, "show-trailing-icon": false }, title: "Utilize o spinner apenas quando houver bloqueio temporário da ação", text: "O Spinner deve aparecer somente quando a operação impede o avanço da pessoa usuária. Ele reforça que a ação foi recebida e está em execução, evitando cliques repetidos ou dúvidas sobre o estado atual." }] },
      { note: "O Main Button da lib não tem estado Loading (CONFERIR C117): por enquanto, o exemplo usa o botão desabilitado com texto de andamento." }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação do Spinner/Loading indica estados de processamento contínuo no sistema. É realizado em loop suave até a conclusão da tarefa, sem distrações indiretas. A reprodução reforça a percepção de atividade em andamento no aplicativo." },
      { display: { attrs: { size: "large", appearance: "accent" } } },
      { alert: { appearance: "warning", label: "Sem Motion Style", text: "O zeroheight indica o Carregamento com easing expressive/default e duração extra-long/02, que não corresponde a nenhum Motion Style da `.Motion Styles` (loops não têm estilo próprio). No código, o giro usa 4 passos de `short/04` (CONFERIR C133)." } }
    ] }
  ]
};
