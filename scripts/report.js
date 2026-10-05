/**
 * Relatório do playground (#/relatorio/<tab>[/<seção>]): painel para quem acompanha o projeto.
 * Lê docs/ROADMAP.md, docs/CONFERIR.md e docs/ARCHITECTURE.md ao abrir, então está sempre igual ao repositório.
 * Tab "Visão geral" = dashboard (números, etapas, divergências, pendências); as outras tabs são os docs,
 * com as seções (##) reagrupadas por assunto. Camada do shell, não da lib.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var REPO = "https://github.com/gus-constantino/castanhads-component-teste/blob/main/";
  // Seções por número do título (ROADMAP/ARCHITECTURE) ou pelo nome (CONFERIR). O que não estiver listado vai para o último grupo.
  var TABS = [
    { id: "visao", title: "Visão geral" },
    { id: "conferir", title: "Conferir", file: "docs/CONFERIR.md", groups: [
      ["Em aberto, por tipo", ["Ajuste de texto", "Ajuste de UI", "Motion", "Refactor", "Naming", "Acessibilidade", "Documentação", "Integração React"]],
      ["Fechados", ["Resolvidos"]], ["Referência", ["Como usar esta lista"]] ] },
    { id: "saude", title: "Saúde técnica", file: "docs/SAUDE-TECNICA.md", groups: [ // gerado pelo build-index (smoke, peso, numeração)
      ["Resumo", ["Resumo"]], ["Smoke", ["Componentes", "Docs"]], ["Peso e numeração", ["Peso", "Numeração D/C"]], ["Referência", ["Como rodar"]] ] },
    { id: "stack", title: "Stack React", file: "integration/SAUDE-STACK.md", groups: [ // R2: check Figma × castanha-react × playground
      ["Resumo", ["Resumo"]], ["Por nível", ["Alta", "Média", "Informativo"]], ["Tokens e assets", ["Tokens", "Assets"]], ["Histórico", ["Histórico"]], ["Referência", ["Como rodar"]] ] },
    { id: "arquitetura", title: "Arquitetura", file: "docs/ARCHITECTURE.md", groups: [
      ["Visão", ["1", "2"]], ["Evolução", ["7", "6", "5"]], ["Referência técnica", ["3", "4", "8"]] ] },
    { id: "roadmap", title: "Roadmap", file: "docs/ROADMAP.md", groups: [
      ["Andamento", ["8", "3"]], ["Decisões e pendências", ["4", "5", "5.1", "5.2"]], ["Referência", ["2", "7", "1"]] ], hide: ["6"] }, // 6 = Preferências (nota de trabalho, fica só no doc)
  ];
  var DOCS = TABS.filter(function(t){ return t.file; });
  var TYPES = TABS.filter(function(t){ return t.id === "conferir"; })[0].groups[0][1];
  var cache = {};
  function load(file){
    if (!cache[file]) cache[file] = fetch(file, { cache: "no-cache" }).then(function(r){ if (!r.ok) throw new Error(file + " " + r.status); return r.text(); });
    return cache[file];
  }

  // ---------- Markdown (o subconjunto que os docs usam) ----------
  function esc(s){ return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function slug(s){ return s.toLowerCase().replace(/[`*~]/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-"); }
  function href(u){
    if (/^https?:/.test(u)) return { url: u, ext: true };
    if (u.charAt(0) === "#") return { url: u, anchor: decodeURIComponent(u.slice(1)) };
    var path = new URL(u, "https://x/docs/").pathname.slice(1);
    return { url: REPO + path, ext: true };
  }
  function inline(s){
    return s.split(/(`[^`]*`)/).map(function(part, i){
      if (i % 2) return "<code>" + esc(part.slice(1, -1)) + "</code>";
      return esc(part)
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function(_, t, u){
          var h = href(u.replace(/&amp;/g, "&"));
          return h.anchor != null ? '<a href="' + h.url + '" data-anchor="' + esc(h.anchor) + '">' + t + "</a>"
            : '<a href="' + esc(h.url) + '" target="_blank" rel="noopener">' + t + "</a>";
        })
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/~~([^~]+)~~/g, "<del>$1</del>")
        .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    }).join("");
  }
  function cells(line){
    return line.replace(/\\\|/g, "\u0000").trim().replace(/^\|/, "").replace(/\|$/, "").split("|")
      .map(function(c){ return c.replace(/\u0000/g, "|").trim(); });
  }
  var ITEM = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;
  function blocks(lines){
    var out = [], i = 0, n = lines.length;
    function isStart(l, next){ return /^(#{1,6}\s|```|>|---+\s*$)/.test(l) || ITEM.test(l) || (l.charAt(0) === "|" && /^\|?\s*:?-{3,}/.test(next || "")); }
    function list(indent){
      var m = lines[i].match(ITEM), tag = /\d/.test(m[2]) ? "ol" : "ul", html = "<" + tag + ">", open = false;
      while (i < n){
        var l = lines[i], mm = l.match(ITEM);
        if (!l.trim()){ var j = i + 1; while (j < n && !lines[j].trim()) j++; var nx = j < n && lines[j].match(ITEM); if (nx && nx[1].length >= indent){ i = j; continue; } break; }
        if (mm){
          if (mm[1].length < indent) break;
          if (mm[1].length > indent){ html += list(mm[1].length); continue; }
          html += (open ? "</li>" : "") + "<li>" + inline(mm[3]); open = true; i++;
        } else if (/^\s+/.test(l)){ html += " " + inline(l.trim()); i++; }
        else break;
      }
      return html + (open ? "</li>" : "") + "</" + tag + ">";
    }
    while (i < n){
      var l = lines[i];
      if (!l.trim()){ i++; continue; }
      if (/^```/.test(l)){ var code = []; i++; while (i < n && !/^```/.test(lines[i])) code.push(lines[i++]); i++; out.push("<pre><code>" + esc(code.join("\n")) + "</code></pre>"); continue; }
      var h = l.match(/^(#{3,6})\s+(.*)$/);
      if (h){ out.push("<h" + (h[1].length) + ">" + inline(h[2]) + "</h" + h[1].length + ">"); i++; continue; }
      if (/^---+\s*$/.test(l)){ out.push("<hr>"); i++; continue; }
      if (l.charAt(0) === "|" && /^\|?\s*:?-{3,}/.test(lines[i + 1] || "")){
        var head = cells(l), align = cells(lines[i + 1]).map(function(c){ return /-:$/.test(c) ? ' class="is-num"' : ""; }), rows = [];
        i += 2; while (i < n && lines[i].charAt(0) === "|") rows.push(cells(lines[i++]));
        out.push('<div class="rp-table"><table><thead><tr>' + head.map(function(c, k){ return "<th" + (align[k] || "") + ">" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          rows.map(function(r){ return "<tr>" + r.map(function(c, k){ return "<td" + (align[k] || "") + ">" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>");
        continue;
      }
      if (/^>/.test(l)){ var q = []; while (i < n && /^>/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, "")); out.push("<blockquote>" + blocks(q) + "</blockquote>"); continue; }
      if (ITEM.test(l)){ out.push(list(l.match(ITEM)[1].length)); continue; }
      var p = [l.trim()]; i++;
      while (i < n && lines[i].trim() && !isStart(lines[i], lines[i + 1])) p.push(lines[i++].trim());
      out.push("<p>" + inline(p.join(" ")) + "</p>");
    }
    return out.join("");
  }
  // Doc → { intro, sections: [{ key, num, title, lines }] }
  function parse(md){
    var doc = { intro: [], sections: [] }, cur = null;
    md.replace(/\r/g, "").split("\n").forEach(function(l){
      if (/^#\s/.test(l)) return;
      var h = l.match(/^##\s+(.*)$/);
      if (h){ var m = h[1].match(/^(\d+(?:\.\d+)?)\.?\s+(.*)$/); cur = { num: m ? m[1] : null, title: m ? m[2] : h[1], lines: [] }; doc.sections.push(cur); return; }
      (cur ? cur.lines : doc.intro).push(l);
    });
    return doc;
  }
  // Linhas de tabela cujo 1º campo é um ID (C12, D40, Q9) ou uma data (02/10): é o que o TOC conta
  function items(lines){ return lines.filter(function(l){ return /^\|\s*(~~)?([CDQ]\d+|\d{2}\/\d{2})\b/.test(l); }); }

  // ---------- Números do topo ----------
  function kpis(docs){
    var road = docs.roadmap, conf = docs.conferir;
    // Inventário (§2): soma da coluna Var. ("12 / 1" = dois sets)
    var sets = 0, variants = 0;
    sec(road, function(s){ return s.num === "2"; }).lines.forEach(function(l){
      if (!/^\|/.test(l) || /^\|\s*:?-{3,}|^\|\s*(Página|Componente)\s*\|/.test(l)) return;
      var c = cells(l), v = c[c.length - 2] || "";
      v.split("/").forEach(function(x){ var n = parseInt(x, 10); if (!isNaN(n)){ variants += n; sets++; } });
    });
    var openC = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; }).reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var solved = items(sec(conf, function(s){ return s.title === "Resolvidos"; }).lines).length;
    var dec = items(sec(road, function(s){ return s.num === "4"; }).lines).length;
    var qs = items(sec(road, function(s){ return s.num === "5"; }).lines).filter(function(l){ return !/✅/.test(l); }).length;
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource; });
    var comps = pg.filter(function(c){ return !c.block && !c.composition; }).length;
    return [
      { label: "Componentes no playground", value: comps, sub: "+ " + pg.filter(function(c){ return c.block; }).length + " building blocks", tip: "Componentes do Figma implementados no playground, sem contar building blocks e recursos de apoio." },
      { label: "Variantes do Figma cobertas", value: variants.toLocaleString("pt-BR"), sub: "em " + sets + " sets da lib", tip: "Soma das variantes dos sets do inventário da lib (Roadmap §2). Todas estão implementadas no playground." },
      { label: "Débitos e melhorias mapeados", value: openC, sub: solved + " já resolvidos", tip: "Itens em aberto no Conferir: divergências entre Figma e código, gaps e propostas de melhoria." },
      { label: "Decisões registradas", value: dec, sub: qs ? qs + " dúvida(s) em aberto" : "Sem dúvidas em aberto", tip: "Decisões tomadas e registradas no Roadmap (D1, D2…). Embaixo, as dúvidas que ainda aguardam resposta." }
    ];
  }

  function sec(doc, test){ return doc.sections.filter(test)[0] || { title: "", lines: [] }; }
  function rows(lines){ return lines.filter(function(l){ return /^\|/.test(l) && !/^\|\s*:?-{3,}/.test(l); }).slice(1).map(cells); }
  function plain(s){ return s.replace(/\*\*|~~|`/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"); }

  // ---------- Visão geral (dashboard) ----------
  // Card do DS (Has Border): o corpo entra antes de conectar (o Card leva os filhos para o Slot só no 1º render)
  function card(cls){ var c = el("cds-card", cls); c.setAttribute("has-border", "true"); return c; }
  function panel(parent, title, sub, cls){
    var c = card("rp-panel" + (cls ? " " + cls : "")), p = c.appendChild(el("div", "rp-panel__body"));
    var h = p.appendChild(el("div", "rp-panel__head"));
    h.appendChild(el("h2", "rp-panel__title", title));
    if (sub) h.appendChild(el("p", "rp-panel__sub", sub));
    parent.appendChild(c);
    return p;
  }
  // Contador = Tag do DS (Neutral, sem ícone)
  function countTag(n){
    var t = el("cds-tag", "rp-count"); t.setAttribute("label", String(n)); t.setAttribute("appearance", "neutral"); t.setAttribute("show-lead-item", "false");
    // só mouse: o número já está visível e a Tag fica dentro de link no índice (sem foco aninhado)
    if (CDS.kit) CDS.kit.lazyTip(t, n + (n === 1 ? " item nesta seção." : " itens nesta seção."), { focus: false });
    return t;
  }
  // Link do DS
  function dsLink(cls, label, href, external){
    var l = el("cds-link", cls); l.setAttribute("label", label); l.setAttribute("href", href); l.setAttribute("appearance", "neutral");
    if (external){ l.setAttribute("target", "_blank"); l.setAttribute("icon", "link-line"); }
    return l;
  }
  function bars(parent, data, opts){
    var max = Math.max.apply(null, data.map(function(d){ return d.value; }).concat([1]));
    var ul = parent.appendChild(el("ul", "rp-bars"));
    data.forEach(function(d){
      var li = ul.appendChild(el("li"));
      var row = li.appendChild(el(d.href ? "a" : "div", "rp-bar"));
      if (d.href) row.href = d.href;
      row.appendChild(el("span", "rp-bar__label", esc(d.label)));
      // Progress Line do DS (decorativa: o rótulo e o número já estão na linha)
      var pl = row.appendChild(el("cds-progress-line", "rp-bar__line" + (d.tone || (opts && opts.tone) ? " is-" + (d.tone || opts.tone) : "")));
      pl.setAttribute("percent", String(Math.round(d.value / max * 1000) / 10)); pl.setAttribute("aria-hidden", "true");
      row.appendChild(el("span", "rp-bar__value", String(d.value)));
      // Tooltip da linha: valor e % do total; nos débitos, o que entra naquele tipo (1ª frase da seção no Conferir)
      var total = (opts && opts.total) || data.reduce(function(a, x){ return a + x.value; }, 0); // total real (o painel pode mostrar só as maiores)
      if (CDS.kit) CDS.kit.lazyTip(row, d.value + " de " + total + " (" + Math.round(d.value / (total || 1) * 100) + "%)" + (d.desc ? ". " + d.desc : "") + (d.href ? " Clique para ver os itens." : ""), { label: d.label });
    });
  }
  function overview(){
    var road = docs.roadmap, conf = docs.conferir;
    var grid = bodyEl.appendChild(el("div", "rp-dash"));

    // Divergências por tipo
    var open = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; });
    var total = open.reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var p2 = panel(grid, "Débitos e melhorias mapeados", total + " em aberto, por tipo de ajuste", "rp-panel--wide");
    bars(p2, open.map(function(s){
      var desc = (s.lines.filter(function(l){ return l.trim() && !/^\|/.test(l); })[0] || "").replace(/\*\*|`/g, "").trim();
      return { label: s.title, value: items(s.lines).length, href: "#/relatorio/conferir/" + slug(s.title), desc: desc };
    })
      .sort(function(a, b){ return b.value - a.value; }));

    // Como o código tratou
    var all = [].concat.apply([], open.map(function(s){ return rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }); }));
    var kinds = { exc: 0, deb: 0, seg: 0 };
    all.forEach(function(r){ var code = r[4] || "", act = r[5] || ""; if (/débito|erro no figma/i.test(act)) kinds.deb++; else if (/exceção/i.test(code)) kinds.exc++; else kinds.seg++; });
    var p3 = panel(grid, "Adaptações para código", "Regra D40: o código segue o Figma; o que muda é exceção aprovada ou débito registrado");
    var parts = [["seg", "Segue o Figma", kinds.seg, "O código faz o que o Figma faz hoje, mesmo quando parece errado. A divergência fica registrada para corrigir no Figma."],
      ["exc", "Exceção aprovada (web, sem especificação ou decisão)", kinds.exc, "O código difere do Figma por decisão do Gustavo, falta de especificação ou adaptação para web aprovada."],
      ["deb", "Débito ou erro no Figma", kinds.deb, "Problema confirmado no Figma, a corrigir lá. O código acompanha quando a correção entrar."]];
    var donut = p3.appendChild(el("div", "rp-donut"));
    var acc = 0, stops = parts.map(function(pt){ var a = acc; acc += pt[2] / (all.length || 1) * 360; return "var(--rp-c-" + pt[0] + ") " + a + "deg " + acc + "deg"; });
    var ring = donut.appendChild(el("div", "rp-donut__ring", "<strong>" + all.length + "</strong><span>itens</span>"));
    ring.style.background = "conic-gradient(" + stops.join(", ") + ")";
    ring.setAttribute("role", "img"); ring.setAttribute("aria-label", parts.map(function(pt){ return pt[1] + ": " + pt[2]; }).join("; "));
    var leg = donut.appendChild(el("ul", "rp-legend"));
    parts.forEach(function(pt){ var li = leg.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + pt[0])); li.appendChild(el("span", null, esc(pt[1]))); li.appendChild(el("strong", null, String(pt[2]))); li._tip = pt; });

    // Componentes por categoria
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource && !c.block && !c.composition; }), cats = {};
    pg.forEach(function(c){ var k = c.category || "Outros"; cats[k] = (cats[k] || 0) + 1; });
    var p4 = panel(grid, "Componentes por página do Figma", pg.length + " componentes em " + Object.keys(cats).length + " páginas");
    var cl = Object.keys(cats).map(function(k){ return { label: k, value: cats[k] }; }).sort(function(a, b){ return b.value - a.value || a.label.localeCompare(b.label, "pt-BR"); });
    var rest = cl.length > 8 ? cl.splice(8) : []; // painel curto: as 8 maiores; o resto vira uma linha de texto
    bars(p4, cl, { tone: "components", total: pg.length });
    if (rest.length) p4.appendChild(el("p", "rp-panel__foot", "+ " + rest.length + " páginas com até " + rest[0].value + " componente(s): " + esc(rest.map(function(d){ return d.label; }).join(", "))));

    // Publicação na lib do Figma (scripts/figma-status.js, lido via MCP com getPublishStatusAsync)
    var FS = CDS.figmaStatus || { items: {} }, byId = {}, pubN = {};
    (CDS.playgrounds || []).forEach(function(c){ byId[c.id] = c.name; });
    Object.keys(FS.items).forEach(function(id){ (pubN[FS.items[id]] = pubN[FS.items[id]] || []).push(byId[id] || id); });
    // 4º item = cor da Tag do mesmo status no título do componente (scripts/app.js)
    var PUBS = [["current", "Publicado no Figma", "Publicado na lib sem alterações pendentes.", "positive"],
      ["changed", "Publicado com alterações pendentes", "Publicado, mas o arquivo tem alterações que ainda não foram publicadas.", "informative"],
      ["unpublished-comp", "Não publicado", "Componente que ainda não está publicado na lib.", "negative"],
      ["branch", "Não publicado · em branch", "Existe só numa branch do Figma; ainda não está na main.", "warning"],
      ["unpublished-block", "Não publicado · building block", "Building blocks (nome com ponto) ficam fora da publicação de propósito.", "neutral"]];
    var blocks = {}; (CDS.playgrounds || []).forEach(function(c){ if (c.block) blocks[c.name] = true; });
    var un = pubN.unpublished || []; pubN["unpublished-comp"] = un.filter(function(n){ return !blocks[n]; }); pubN["unpublished-block"] = un.filter(function(n){ return blocks[n]; });
    var pubTotal = Object.keys(FS.items).length;
    var p5 = panel(grid, "Publicação na lib do Figma", (pubN.current || []).length + " de " + pubTotal + " em dia com a lib · leitura de " + FS.checked, "rp-panel--wide");
    bars(p5, PUBS.map(function(pt){
      var names = (pubN[pt[0]] || []).slice().sort(function(a, b){ return a.localeCompare(b, "pt-BR"); });
      var list = names.length <= 8 ? names.join(", ") : "Ex.: " + names.slice(0, 6).join(", ") + "…";
      return { label: pt[1], value: names.length, tone: "pub-" + pt[3], desc: pt[2] + (names.length ? " " + list + "." : "") };
    }), { total: pubTotal });
    var pend = pubN["unpublished-comp"].concat(pubN.branch || []);
    if (pend.length) p5.appendChild(el("p", "rp-panel__foot", "Fora da lib: " + esc(pend.join(", ")) + ". Lido no Figma via MCP (<code>getPublishStatusAsync</code>); o status de cada componente aparece numa Tag ao lado do título."));

    // Últimas decisões
    var dec = rows(sec(road, function(s){ return s.num === "4"; }).lines).filter(function(r){ return /^D\d+/.test(r[0]); })
      .sort(function(a, b){ return parseInt(a[0].slice(1), 10) - parseInt(b[0].slice(1), 10); });
    var p6 = panel(grid, "Últimas decisões", dec.length + " registradas · ver todas no Roadmap", "rp-panel--wide");
    var dl = p6.appendChild(el("ul", "rp-list rp-list--cols"));
    dec.slice(-6).reverse().forEach(function(r){
      var li = dl.appendChild(el("li"));
      li.appendChild(el("p", "rp-list__text", "<strong>" + esc(r[0]) + "</strong> · " + esc(plain(r[1]).replace(/^(.{180}).+$/, "$1…"))));
      if (r[2]) li.appendChild(el("p", "rp-list__note", esc(plain(r[2]))));
    });
    // Ordem (Gustavo, 02/10): Componentes · Adaptações para código · Publicação no Figma · Débitos e melhorias · Decisões
    [p4, p3, p5, p2, p6].forEach(function(p){ grid.appendChild(p.closest("cds-card")); });
    // Tooltips da legenda (precisam do item já no documento)
    if (CDS.kit) [].forEach.call(leg.children, function(li){ if (li._tip) CDS.kit.tip(li, li._tip[3], { label: li._tip[1].replace(/ \(.*$/, ""), container: leg.parentNode }); });
    p6.appendChild(dsLink("rp-more", "Ver decisões", "#/relatorio/roadmap/" + slug(sec(road, function(s){ return s.num === "4"; }).title)));
  }
  function goTo(section){
    if (!section) return;
    var t = [].slice.call(bodyEl.querySelectorAll("section[data-slug]")).filter(function(s){ return s.dataset.slug === decodeURIComponent(section); })[0];
    if (t) t.scrollIntoView({ block: "start" });
  }

  // ---------- View ----------
  var el = function(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var root, kpiEl, tabsEl, bodyEl, searchEl, current = null, docs = null;

  function build(){
    root = document.getElementById("report");
    root.innerHTML = "";
    var head = root.appendChild(el("div", "rp-head"));
    var t = head.appendChild(el("div"));
    t.appendChild(el("h1", "rp-title", "Saúde da stack Figma"));
    t.appendChild(el("p", "rp-meta", "Castanha DS · implementação da lib <em>[CastanhaDS] Components</em> no playground. Atualizado direto dos registros do repositório."));
    // Search Input do DS (lupa fixa e botão de limpar); rótulo oculto, o nome acessível continua
    searchEl = document.createElement("cds-search-input"); searchEl.className = "rp-search";
    ["label", "placeholder"].forEach(function(k){ searchEl.setAttribute(k, "Buscar no relatório"); });
    searchEl.setAttribute("show-label", "false"); searchEl.setAttribute("show-required", "false"); searchEl.setAttribute("show-supporting-content", "false");
    head.appendChild(searchEl);
    searchEl.addEventListener("cds-change", function(e){ e.stopPropagation(); filter(); });
    kpiEl = root.appendChild(el("div", "rp-kpis"));
    // Scrollable Tab do DS (teclado e foco itinerante vêm do componente)
    var wrap = root.appendChild(el("div", "pg-tabs rp-tabs"));
    tabsEl = document.createElement("cds-scrollable-tab");
    tabsEl.setAttribute("label", "Registros");
    TABS.forEach(function(tab){
      var it = document.createElement("cds-tab-item");
      it.setAttribute("label", tab.title); it.id = "rp-tab-" + tab.id; it.dataset.tab = tab.id;
      tabsEl.appendChild(it);
    });
    wrap.appendChild(tabsEl); // só depois das abas: conectado vazio, o componente desenha a amostra do Figma (6 "Label")
    tabsEl.addEventListener("cds-change", function(e){ e.stopPropagation(); var t = TABS[e.detail.index - 1]; if (t) location.hash = "#/relatorio/" + t.id; });
    bodyEl = root.appendChild(el("div", "rp-body"));
    bodyEl.setAttribute("role", "tabpanel");
    root.addEventListener("click", function(e){
      var a = e.target.closest("a[data-anchor], a[data-section]"); if (!a) return;
      e.preventDefault();
      var target = a.dataset.section ? document.getElementById(a.dataset.section) : [].slice.call(bodyEl.querySelectorAll("section[data-slug]")).filter(function(s){ return s.dataset.slug === a.dataset.anchor; })[0];
      if (target) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  }

  function renderTab(id){
    var tab = TABS.filter(function(t){ return t.id === id; })[0], doc = docs[id];
    var idx = TABS.map(function(t){ return t.id; }).indexOf(id); if (tabsEl.getAttribute("active-item") !== String(idx + 1)) tabsEl.setAttribute("active-item", String(idx + 1));
    bodyEl.setAttribute("aria-labelledby", "rp-tab-" + id);
    bodyEl.innerHTML = "";
    bodyEl.classList.toggle("is-dash", !tab.file);
    searchEl.hidden = !tab.file;
    if (!tab.file){ overview(); return; }
    var toc = bodyEl.appendChild(el("nav", "rp-toc")); toc.setAttribute("aria-label", "Seções");
    var content = bodyEl.appendChild(el("div", "rp-content"));
    var intro = blocks(doc.intro);
    if (intro){ var s0 = card("rp-section rp-intro"); s0.appendChild(el("div", "rp-md", intro)); s0.id = "rp-" + id + "-sobre"; content.appendChild(s0); }
    var used = [];
    var groups = tab.groups.map(function(g){
      var secs = g[1].map(function(k){ return doc.sections.filter(function(s){ return (s.num || s.title) === k; })[0]; }).filter(Boolean);
      used = used.concat(secs); return { title: g[0], secs: secs };
    });
    var rest = doc.sections.filter(function(s){ return used.indexOf(s) === -1 && (tab.hide || []).indexOf(s.num || s.title) === -1; });
    if (rest.length) groups[groups.length - 1].secs = groups[groups.length - 1].secs.concat(rest);
    groups.forEach(function(g){
      if (!g.secs.length) return;
      toc.appendChild(el("p", "rp-toc__group", g.title));
      var ul = toc.appendChild(el("ul"));
      content.appendChild(el("h2", "rp-group", g.title));
      g.secs.forEach(function(s){
        var sid = "rp-" + id + "-" + slug(s.title), count = items(s.lines).length;
        var li = ul.appendChild(el("li")), a = li.appendChild(el("a", null, inline(s.title)));
        a.href = "#" + sid; a.dataset.section = sid;
        if (count) a.appendChild(countTag(count));
        var sec = card("rp-section");
        sec.id = sid; sec.dataset.slug = slug(s.title);
        var h = sec.appendChild(el("h3", "rp-section__title", inline(s.title)));
        if (count) h.appendChild(countTag(count));
        sec.appendChild(el("div", "rp-md", blocks(s.lines)));
        content.appendChild(sec);
      });
    });
    toc.appendChild(dsLink("rp-src", "Ver no GitHub", REPO + tab.file, true));
    filter();
  }

  // Busca: esconde linhas de tabela, itens de lista e seções sem o termo
  function filter(){
    if (!bodyEl) return;
    var q = String(searchEl.value || "").trim().toLowerCase();
    [].forEach.call(bodyEl.querySelectorAll(".rp-section"), function(sec){
      var hit = !q || sec.querySelector(".rp-section__title") && sec.querySelector(".rp-section__title").textContent.toLowerCase().indexOf(q) !== -1;
      var any = false;
      [].forEach.call(sec.querySelectorAll("tbody tr, .rp-md > ul > li, .rp-md > ol > li, .rp-md > p"), function(r){
        var ok = !q || hit || r.textContent.toLowerCase().indexOf(q) !== -1; r.hidden = !ok; if (ok) any = true;
      });
      sec.hidden = !(hit || any);
    });
    [].forEach.call(bodyEl.querySelectorAll(".rp-group"), function(g){
      var n = g.nextElementSibling, vis = false;
      while (n && !n.classList.contains("rp-group")){ if (!n.hidden) vis = true; n = n.nextElementSibling; }
      g.hidden = !vis;
    });
  }

  CDS.report = {
    tabs: TABS.map(function(t){ return t.id; }),
    show: function(tabId, section){
      if (!root) build();
      var id = TABS.some(function(t){ return t.id === tabId; }) ? tabId : TABS[0].id;
      document.title = "Relatório — Castanha DS";
      if (docs){ if (current !== id){ current = id; renderTab(id); window.scrollTo(0, 0); } goTo(section); return; }
      bodyEl.innerHTML = '<p class="rp-meta">Carregando registros…</p>';
      Promise.all(DOCS.map(function(t){ return load(t.file); })).then(function(texts){
        docs = {}; DOCS.forEach(function(t, i){ docs[t.id] = parse(texts[i]); });
        kpiEl.innerHTML = "";
        kpis(docs).forEach(function(k){
          var c = card("rp-kpi");
          c.appendChild(el("p", "rp-kpi__label", k.label));
          c.appendChild(el("p", "rp-kpi__value", String(k.value)));
          c.appendChild(el("p", "rp-kpi__sub", k.sub));
          kpiEl.appendChild(c);
          if (k.tip && CDS.kit) CDS.kit.tip(c, k.tip, { label: k.label, container: kpiEl });
        });
        current = id; renderTab(id); goTo(section);
      }).catch(function(err){ bodyEl.innerHTML = '<p class="rp-meta">Não foi possível ler os registros (' + esc(String(err.message || err)) + ").</p>"; });
    }
  };
})();
