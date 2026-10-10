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
    var box = el("div");
    if (CDS.docTable) box.appendChild(CDS.docTable(["Fluxo", "Inícios", "Concluídos", "Lembrar depois", "Dispensados", "Saídas por passo", "Tempo médio"], rows));
    else rows.forEach(function(r){ box.appendChild(el("p", null, "pg-doc-p")).textContent = r.join(" · "); });
    return box;
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
        "Nesta fase nenhum fluxo abre sozinho: só por `?tour=<id>` na URL ou pelo botão Testar o fluxo. `?onboarding=off` desliga o serviço."
      ] },
      { h2: "Regras de conteúdo" },
      { p: "O build roda o `scripts/dev/lint-onboarding.js` e reprova o fluxo que sair do guia: título até 30 caracteres e sem ponto, exclamação ou dois-pontos, título e texto juntos até 110 caracteres, no máximo 3 passos de tour, ilustração que existe no catálogo e as palavras do Termos para evitar." },
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
