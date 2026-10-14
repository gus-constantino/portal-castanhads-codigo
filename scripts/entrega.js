/**
 * Modo entrega (docs/PLANO-ACESSO.md, fase 3): o portal de sempre, só com as páginas de uma entrega para dev.
 * Roda antes do scripts/app.js. Entra no modo quando:
 *   - no Vercel, a pessoa abriu um link de entrega (/l/<código>) e não tem perfil: o middleware grava cds_entrega;
 *   - ?entrega=<slug> no endereço: o /l/<código> leva para /?entrega=<slug>, então o link abre a entrega mesmo para quem
 *     já tem perfil neste navegador. Também vale no perfil Completo (ver como a pessoa dev vê) e fora do Vercel.
 * Carrega entregas/<slug>/entrega.js (gerado pelo build), que chama CDS.entregaDados com o título, os itens e o handoff.
 * O menu passa a ter só os itens da entrega, o link abre no Playground do primeiro componente, cada componente ganha as
 * abas Visão geral e Handoff (logo depois do Playground) e saem o Início, o Relatório,
 * a busca no conteúdo e o onboarding. No Vercel, quem entra pelo link nem recebe os recursos (dist/cds-entrega.js).
 *
 * Modo link de página (D341): o mesmo portal só com um alvo (componente, página, seção do menu ou categoria).
 *   - no Vercel, /l/<código> grava cds_alvos (os alvos dos links abertos neste navegador) e leva a /?alvo=<alvo>;
 *   - ?alvo=<alvo> vale quando está no cookie, no perfil Completo ("Ver como quem recebe vê") ou fora do Vercel.
 * Carrega acesso/alvos.js (gerado pelo build: ids e arquivos de cada alvo) e, quando o pacote veio sem os recursos,
 * os arquivos das páginas liberadas. O menu fica só com os ids do alvo, e a rota padrão é o primeiro deles.
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
  if (!CDS || !CDS.playgrounds) return;
  if (!slug){ modoLink(); return; }

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
    // só os itens da entrega; sem Início: a rota padrão é o Playground do primeiro componente
    var keep = CDS.playgrounds.filter(function(c){ return ids.indexOf(c.id) >= 0; });
    CDS.playgrounds.length = 0; keep.forEach(function(c){ CDS.playgrounds.push(c); });
    var comps = d.itens.filter(function(i){ return !i.block; }), blocks = d.itens.filter(function(i){ return i.block; });
    function cards(list){ return { shortcuts: list.map(function(i){ return { title: i.name, text: String(i.description || "").split(/(?<=\.)\s/)[0], href: "#/" + i.id, cta: "Abrir " + i.name }; }) }; }
    var geral = [
      { hero: { eyebrow: "Entrega para dev · " + d.task, title: d.titulo, text: d.resumo } },
      { alert: { appearance: "informative", label: "Portal da entrega", text: d.handoff.length
        ? "Este endereço mostra só as páginas desta entrega: o Playground, a documentação e o handoff. O que muda está na aba Handoff e na seção \"Entrega para dev\" da Anatomia de cada componente."
        : "Este endereço mostra só as páginas desta entrega: o Playground e a documentação completa de cada componente (Uso, Anatomia, Estilos, Acessibilidade e Diretrizes)." } }
    ];
    if (d.itens.length > 1) geral.push({ h2: "Componentes" }, cards(comps));
    if (blocks.length) geral.push({ h2: "Building blocks" }, { p: "Peças usadas dentro dos componentes desta entrega." }, cards(blocks));
    var handoff = d.handoff.map(function(b){ return b.checklist ? { visual: checklist(b.checklist) } : b; });
    // Visão geral e Handoff entram como abas de cada componente da entrega, logo depois do Playground. As docs chegam
    // sob demanda (CDS.docsIndex): a propriedade acrescenta as abas quando a doc do componente é gravada em CDS.docs.
    var extra = [{ id: "visao-geral", title: "Visão geral", blocks: geral }].concat(handoff.length ? [{ id: "handoff", title: "Handoff", blocks: handoff }] : []);
    function comAbas(doc){
      if (!doc || !doc.tabs || doc.tabs.some(function(t){ return t.id === "visao-geral"; })) return doc;
      return Object.assign({}, doc, { tabs: extra.concat(doc.tabs) });
    }
    CDS.docs = CDS.docs || {};
    comps.forEach(function(i){
      var valor = CDS.docs[i.id] ? comAbas(CDS.docs[i.id]) : (CDS.docsIndex && CDS.docsIndex[i.id] ? undefined : { tabs: extra.slice() });
      Object.defineProperty(CDS.docs, i.id, { configurable: true, enumerable: true, get: function(){ return valor; }, set: function(v){ valor = comAbas(v); } });
    });
    CDS.searchIndex = null; // a busca fica só nos nomes do menu
    CDS.onboarding = null;
    document.documentElement.classList.add("is-entrega");
  };
  document.write('<script src="entregas/' + slug + '/entrega.js"><\/script>');

  // ---------- Modo link de página ----------
  function modoLink(){
    var guardados = [];
    try { guardados = decodeURIComponent((document.cookie.match(/(?:^|;\s*)cds_alvos=([^;]+)/) || [])[1] || "").split("~").filter(Boolean); } catch (e) {}
    var alvo = new URLSearchParams(location.search).get("alvo");
    var ok = alvo && /^[a-z]+:[a-z0-9-]+$/.test(alvo) && (guardados.indexOf(alvo) >= 0 || perfil === "completo" || !vercel);
    var lista = ok ? [alvo] : !perfil ? guardados : [];
    if (!lista.length) return;
    CDS.alvosProntos = function(){
      var alvos = lista.filter(function(a){ return CDS.alvos && CDS.alvos[a]; });
      if (!alvos.length) return;
      var ids = [], recursos = [];
      alvos.forEach(function(a){ CDS.alvos[a].ids.forEach(function(i){ if (ids.indexOf(i) < 0) ids.push(i); }); CDS.alvos[a].recursos.forEach(function(r){ if (recursos.indexOf(r) < 0) recursos.push(r); }); });
      CDS.acessoLink = { alvos: alvos, ids: ids, titulo: alvos.map(function(a){ return CDS.alvos[a].titulo; }).join(" + ") };
      // o pacote de quem entra pelo link (dist/cds-entrega.js) vem sem as páginas: carrega as liberadas antes do app.js
      var comPaginas = CDS.playgrounds.some(function(c){ return c.resource; });
      if (!comPaginas) recursos.forEach(function(r){ document.write('<script src="' + r + '"><\/script>'); });
      document.write('<script>CDS.alvosFim && CDS.alvosFim()<\/script>');
    };
    CDS.alvosFim = function(){
      var ids = CDS.acessoLink.ids, keep = CDS.playgrounds.filter(function(c){ return ids.indexOf(c.id) >= 0; });
      CDS.playgrounds.length = 0; keep.forEach(function(c){ CDS.playgrounds.push(c); });
      CDS.searchIndex = null; // a busca fica só nos nomes do menu
      CDS.onboarding = null;
      document.documentElement.classList.add("is-entrega");
    };
    document.write('<script src="acesso/alvos.js"><\/script>');
  }
})();
