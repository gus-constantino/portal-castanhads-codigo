/**
 * Modo entrega (docs/PLANO-ACESSO.md, fase 3): o portal de sempre, só com as páginas de uma entrega para dev.
 * Roda antes do scripts/app.js. Entra no modo quando:
 *   - no Vercel, a pessoa abriu um link de entrega (/l/<código>) e não tem perfil: o middleware grava cds_entrega;
 *   - ?entrega=<slug> no endereço: o /l/<código> leva para /?entrega=<slug>, então o link abre a entrega mesmo para quem
 *     já tem perfil neste navegador. Também vale no perfil Completo (ver como a pessoa dev vê) e fora do Vercel.
 * Carrega entregas/<slug>/entrega.js (gerado pelo build), que chama CDS.entregaDados com o título, os itens e o handoff.
 * O menu passa a ter só os itens da entrega, o Início vira a página da entrega (visão geral e handoff) e saem o Relatório,
 * a busca no conteúdo e o onboarding. No Vercel, quem entra pelo link nem recebe os recursos (dist/cds-entrega.js).
 */
(function(){
  "use strict";
  var CDS = window.CDS;
  function cookie(n){ var m = document.cookie.match(new RegExp("(?:^|;\\s*)" + n + "=([a-z0-9-]+)")); return m ? m[1] : null; }
  var perfil = cookie("cds_perfil"), link = cookie("cds_entrega"), pedida = new URLSearchParams(location.search).get("entrega");
  var vercel = /\.vercel\.app$/.test(location.hostname);
  // ?entrega=<slug> vale quando veio do link (o mesmo slug do cookie cds_entrega), no perfil Completo ou fora do Vercel;
  // sem o parâmetro, quem entrou só pelo link (sem perfil) continua na entrega
  var valida = pedida && /^[a-z0-9-]+$/.test(pedida) && (pedida === link || perfil === "completo" || !vercel);
  var slug = valida ? pedida : !perfil && link ? link : null;
  if (!slug || !CDS || !CDS.playgrounds) return;

  // Checklist do handoff: Checkbox do DS, marcado neste navegador (como o checklist de uma task)
  function checklist(items){
    var store = "cds-entrega:" + slug, marks = {};
    try { marks = JSON.parse(localStorage.getItem(store) || "{}"); } catch (e) {}
    return { bare: true, render: function(){
      var box = document.createElement("div"); box.className = "pg-entrega-checks";
      items.forEach(function(t, i){
        var cb = box.appendChild(CDS.create("cds-checkbox", { label: t.replace(/`/g, ""), status: marks[i] ? "selected" : "unselected" }));
        cb.addEventListener("cds-change", function(){ marks[i] = cb.getAttribute("status") === "selected"; try { localStorage.setItem(store, JSON.stringify(marks)); } catch (e) {} });
      });
      return box;
    } };
  }

  CDS.entregaDados = function(d){
    CDS.entrega = d;
    var ids = d.itens.map(function(i){ return i.id; });
    // só os itens da entrega; o Início (home) passa a ser a página da entrega
    var keep = CDS.playgrounds.filter(function(c){ return ids.indexOf(c.id) >= 0; });
    CDS.playgrounds.length = 0; keep.forEach(function(c){ CDS.playgrounds.push(c); });
    CDS.register({ id: "entrega", name: d.titulo, resource: true, home: true, order: 0, task: d.task });
    var comps = d.itens.filter(function(i){ return !i.block; }), blocks = d.itens.filter(function(i){ return i.block; });
    function cards(list){ return { shortcuts: list.map(function(i){ return { title: i.name, text: String(i.description || "").split(/(?<=\.)\s/)[0], href: "#/" + i.id, cta: "Abrir " + i.name }; }) }; }
    var geral = [
      { hero: { eyebrow: "Entrega para dev · " + d.task, title: d.titulo, text: d.resumo } },
      { alert: { appearance: "informative", label: "Portal da entrega", text: d.handoff.length
        ? "Este endereço mostra só as páginas desta entrega: o Playground, a documentação e o handoff. O que muda está na aba Handoff e na seção \"Entrega para dev\" da Anatomia de cada componente."
        : "Este endereço mostra só as páginas desta entrega: o Playground e a documentação completa de cada componente (Uso, Anatomia, Estilos, Acessibilidade e Diretrizes)." } },
      { h2: "Componentes" }, cards(comps)
    ];
    if (blocks.length) geral.push({ h2: "Building blocks" }, { p: "Peças usadas dentro dos componentes desta entrega." }, cards(blocks));
    var handoff = d.handoff.map(function(b){ return b.checklist ? { visual: checklist(b.checklist) } : b; });
    CDS.docs = CDS.docs || {};
    // sem handoff.md na pasta da entrega, a página fica só com a Visão geral
    CDS.docs.entrega = { tabs: [{ id: "visao-geral", title: "Visão geral", blocks: geral }].concat(handoff.length ? [{ id: "handoff", title: "Handoff", blocks: handoff }] : []) };
    CDS.searchIndex = null; // a busca fica só nos nomes do menu
    CDS.onboarding = null;
    document.documentElement.classList.add("is-entrega");
  };
  document.write('<script src="entregas/' + slug + '/entrega.js"><\/script>');
})();
