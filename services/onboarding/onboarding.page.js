/* Página escondida #/onboarding: como o serviço de onboarding funciona, os fluxos registrados (com o estado e o botão de
   testar) e as métricas guardadas neste navegador. Fora do menu, da busca e do MCP (hidden). F1 do plano (docs/PLANO-ONBOARDING.md §6). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "onboarding", name: "Onboarding", resource: true, hidden: true, order: 98,
    description: "Serviço de onboarding do portal: fluxos, estado e métricas guardados no navegador." });
  var el = function(t, a, cls){ return CDS.create(t, a, cls); };
  var STATUS = { "novo": ["neutral", "Novo"], "em-andamento": ["informative", "Em andamento"], "lembrar": ["warning", "Lembrar depois"], "concluido": ["positive", "Concluído"], "dispensado": ["neutral", "Dispensado"] };
  function flowsBox(){
    var box = el("div", null, "svc-onb-doc");
    (CDS.onboarding ? CDS.onboarding.flows() : []).forEach(function(f){
      var st = CDS.onboarding.state(f.id), tag = STATUS[st.status] || STATUS.novo;
      var card = box.appendChild(el("cds-card", { "has-border": "true" }, "svc-onb-doc__card"));
      var head = card.appendChild(el("div", null, "svc-onb-doc__head"));
      head.appendChild(el("h3", null, "pg-doc-h3")).textContent = f.title || f.id;
      head.appendChild(el("cds-tag", { appearance: tag[0], label: tag[1], "show-lead-item": "false" }));
      card.appendChild(el("p", null, "pg-doc-p")).textContent = "id " + f.id + " · versão " + (f.version || 1) + " · " + f.steps.length + " passos · abre por ?tour=" + f.id;
      var ol = card.appendChild(el("ol", null, "svc-onb-doc__steps"));
      f.steps.forEach(function(s){ ol.appendChild(el("li")).textContent = (s.kind === "modal" ? "Boas-vindas (Modal): " : "Passo em [data-onb=\"" + s.anchor + "\"]: ") + s.title; });
      var actions = card.appendChild(el("div", null, "svc-onb-doc__actions"));
      var go = actions.appendChild(el("cds-main-button", { label: "Testar o fluxo", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
      go.addEventListener("click", function(){ CDS.onboarding.start(f.id); });
      var rs = actions.appendChild(el("cds-main-button", { label: "Limpar estado e métricas", kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
      rs.addEventListener("click", function(){ CDS.onboarding.reset(f.id); if (CDS.docToast) CDS.docToast("Estado e métricas limpos"); var fresh = flowsBox(); box.replaceWith(fresh); });
    });
    if (!box.children.length) box.appendChild(el("p", null, "pg-doc-p")).textContent = "Nenhum fluxo registrado.";
    return box;
  }
  function metricsBox(){
    var rows = [];
    (CDS.onboarding ? CDS.onboarding.flows() : []).forEach(function(f){
      var m = CDS.onboarding.metrics(f.id), exits = Object.keys(m.exitAt || {}).map(function(k){ return "passo " + (+k + 1) + ": " + m.exitAt[k]; }).join(", ") || "nenhuma";
      rows.push([f.id, String(m.runs), String(m.completed), String(m.reminded), String(m.dismissed), exits, m.runs ? Math.round(m.ms / m.runs / 1000) + " s" : "—"]);
    });
    var box = el("div", null, "svc-onb-doc");
    table(box, ["Fluxo", "Inícios", "Concluídos", "Lembrar depois", "Dispensados", "Saídas por passo", "Tempo médio"], rows);
    // Primeiros passos e trilha Explorar (F4): o que este navegador já marcou
    var o = CDS.onboarding;
    if (o){
      var done = o.tasksDone(), trail = o.trailDone(), stops = o.trailStops(), blocks = {};
      stops.forEach(function(s){ var b = blocks[s.block] = blocks[s.block] || [0, 0]; b[1]++; if (trail[s.id]) b[0]++; });
      box.appendChild(el("h3", null, "pg-doc-h3")).textContent = "Primeiros passos e trilha";
      table(box, ["Item", "Valor"], [
        ["Perfil escolhido", o.profile() || "nenhum"],
        ["Tarefas concluídas", String(Object.keys(done).length) + (Object.keys(done).length ? " (" + Object.keys(done).join(", ") + ")" : "")],
        ["Paradas abertas na trilha", Object.keys(trail).length + " de " + stops.length]
      ].concat(Object.keys(blocks).map(function(b){ return [b, blocks[b][0] + " de " + blocks[b][1]]; })));
      var rs = box.appendChild(el("cds-main-button", { label: "Limpar tarefas e trilha", kind: "ghost", appearance: "neutral", size: "small", "show-lead-icon": "false", "show-trailing-icon": "false" }));
      rs.addEventListener("click", function(){ try { localStorage.removeItem("cds-onb-tarefas"); localStorage.removeItem("cds-onb-trilha"); } catch (e) {} if (CDS.docToast) CDS.docToast("Tarefas e trilha limpas"); box.replaceWith(metricsBox()); });
    }
    return box;
  }
  function table(box, head, rows){
    if (CDS.docTable) box.appendChild(CDS.docTable(head, rows));
    else rows.forEach(function(r){ box.appendChild(el("p", null, "pg-doc-p")).textContent = r.join(" · "); });
  }
  CDS.docs["onboarding"] = { tabs: [
    { id: "visao", title: "Visão geral", blocks: [
      { p: "O onboarding é um serviço do portal: lógica e estado que atravessam as páginas, sem interface própria. Ele compõe componentes do DS (Modal, Popover e Main Button), guarda o estado no navegador e liga ou desliga sem afetar o resto. O código fica em `services/onboarding`." },
      { h2: "Como funciona" },
      { ul: [
        "Cada fluxo é um arquivo de dados em `services/onboarding/flows`, com os passos: boas-vindas em Modal e passos do tour em Popover, ancorados em `[data-onb]`.",
        "Os botões vêm do guia de Conteúdo, pelo papel do passo: Começar, Continuar, Voltar, Concluir, Fechar, Me lembrar mais tarde e Não mostrar novamente. Esc vale como Me lembrar mais tarde.",
        "Passo cuja área não está na tela (largura estreita, seção que sumiu) é pulado e o evento fica registrado.",
        "O estado (novo, em andamento, lembrar depois, concluído, dispensado) e as métricas ficam no localStorage deste navegador.",
        "A boas-vindas abre sozinha na primeira visita (fora do Relatório e das páginas escondidas). Me lembrar mais tarde traz de volta a partir do dia seguinte, no máximo 2 vezes. Começar segue para o tour, com o menu lateral, e o tour termina nos Primeiros passos do Início.",
        "Os Primeiros passos ficam numa tab do Início e no item da Ajuda, com o checklist do perfil e o botão Fazer o tour. Cada tarefa se marca quando a pessoa abre a página (ou mexe numa prop no Playground).",
        "Embaixo do checklist fica a trilha Explorar o portal: as 20 paradas do antigo Roteiro, em 5 blocos de Accordion. Cada parada se marca quando a pessoa abre o link pela lista. O tour também abre pelo modal de atalhos (tecla ?) e a FAQ explica como refazer.",
        "Durante o tour, o Backdrop do DS fica atrás do passo e o bloco com a área apontada (o menu) fica por cima, claro.",
        "`?tour=<id>` abre um fluxo na hora e `?onboarding=off` desliga o serviço (o smoke das docs roda assim)."
      ] },
      { h2: "Progresso entre navegadores" },
      { p: "Desligado por enquanto. O progresso fica no localStorage de cada navegador. O serviço já tem a entrada para um adaptador remoto, no mesmo molde do ranking do Castanha Quiz: quem conecta passa um objeto com `load`, `save` e, se quiser, `track`, e o serviço não depende do backend. Liga quando o portal estiver conectado ao ambiente da Caju, com a sessão da pessoa." },
      { ul: [
        "`load()` devolve o progresso guardado. O serviço junta com o local: tarefas e paradas somam, o estado de cada fluxo fica com o mais recente e o perfil deste navegador ganha quando existe.",
        "`save(snapshot)` recebe o progresso depois de cada mudança, agrupado a cada 1 s.",
        "`track(evento)` recebe as métricas anônimas (início, conclusão, saída por passo, tarefa, parada e perfil), sem chave de pessoa. É o que falta para a taxa de abandono agregada.",
        "Os contadores de métricas deste navegador não vão no snapshot."
      ] },
      { code: "CDS.onboarding.remote({\n  load: () => fetch(API + \"/onboarding\", { credentials: \"include\" }).then(r => r.ok ? r.json() : null),\n  save: (snap) => fetch(API + \"/onboarding\", { method: \"PUT\", credentials: \"include\", body: JSON.stringify(snap) }),\n  track: (ev) => navigator.sendBeacon(API + \"/onboarding/eventos\", JSON.stringify(ev))\n});" },
      { h2: "Regras de conteúdo" },
      { p: "O build roda o `scripts/dev/lint-onboarding.js` e reprova o fluxo que sair do guia: título até 30 caracteres e sem ponto, exclamação ou dois-pontos, título e texto juntos até 110 caracteres, no máximo 3 passos de tour, ilustração que existe no catálogo e as palavras do Termos para evitar. Nas tarefas dos Primeiros passos: até 5 por perfil, rótulo até 30 caracteres e regra de conclusão." },
      { code: "CDS.onboarding.register({ id: \"exemplo\", version: 1, steps: [\n  { kind: \"modal\", title: \"…\", text: \"…\", illustration: \"objetos/kit-onboarding\" },\n  { anchor: \"busca\", title: \"…\", text: \"…\" }\n] });\nCDS.onboarding.start(\"exemplo\");" }
    ] },
    { id: "fluxos", title: "Fluxos", blocks: [
      { p: "Os fluxos registrados, com o estado neste navegador. Testar o fluxo abre os passos aqui mesmo, e os passos ancorados aparecem com a janela larga (mais de 1100 px)." },
      { visual: { bare: true, render: flowsBox } }
    ] },
    { id: "metricas", title: "Métricas", blocks: [
      { p: "Contadores deste navegador, por fluxo. Sem backend, eles não chegam ao time: a medição de verdade é o teste de usabilidade do plano (§15)." },
      { visual: { bare: true, render: metricsBox } }
    ] }
  ] };
})();
