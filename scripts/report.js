/**
 * Relatório do playground (#/relatorio/<tab>[/<seção>]): painel para quem acompanha o projeto.
 * Lê docs/ROADMAP.md, docs/CONFERIR.md e docs/ARCHITECTURE.md ao abrir, então está sempre igual ao repositório.
 * Tab "Visão geral" = dashboard (números, etapas, divergências, pendências); as outras tabs são os docs,
 * com as seções (##) reagrupadas por assunto. Camada do shell, não da lib.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var REPO = "https://github.com/gus-constantino/portal-castanhads/blob/main/";
  // Seções por número do título (ROADMAP/ARCHITECTURE) ou pelo nome (CONFERIR). O que não estiver listado vai para o último grupo.
  var TABS = [
    { id: "visao", title: "Visão geral" },
    { id: "conferir", title: "Conferir", file: "docs/CONFERIR.md", groups: [
      ["Em aberto, por tipo", ["Ajuste de texto", "Ajuste de UI", "Motion", "Refactor", "Naming", "Acessibilidade", "Documentação", "Integração React"]],
      ["Fechados", ["Resolvidos"]], ["Referência", ["Como usar esta lista"]] ] },
    { id: "saude", title: "Saúde técnica", file: "docs/SAUDE-TECNICA.md", groups: [ // gerado pelo build-index (smoke e peso)
      ["Resumo", ["Resumo"]], ["Smoke", ["Componentes", "Docs"]], ["Peso", ["Peso"]], ["Referência", ["Como rodar"]] ] },
    { id: "stack", title: "Stack React", file: "integration/SAUDE-STACK.md", groups: [ // R2: check Figma × castanha-react × playground
      ["Resumo", ["Resumo"]], ["Por nível", ["Alta", "Média", "Informativo"]], ["Tokens e assets", ["Tokens", "Assets"]], ["Histórico", ["Histórico"]], ["Referência", ["Como rodar"]] ] },
    { id: "stack-flutter", title: "Stack Flutter", file: "integration/flutter/SAUDE-STACK.md", groups: [ // F2: check Figma × castanha_flutter × playground
      ["Resumo", ["Resumo"]], ["Por nível", ["Alta", "Média", "Informativo"]], ["Assets", ["Assets"]], ["Histórico", ["Histórico"]], ["Referência", ["Como rodar"]] ] },
    { id: "arquitetura", title: "Arquitetura", file: "docs/ARCHITECTURE.md", groups: [
      ["Visão", ["1", "2"]], ["Evolução", ["7", "6", "5"]], ["Referência técnica", ["3", "4", "8"]] ] },
    { id: "roadmap", title: "Roadmap", file: "docs/ROADMAP.md", groups: [
      ["Andamento", ["8", "3"]], ["Decisões e pendências", ["4", "5", "5.1", "5.2"]], ["Referência", ["2", "7", "1"]] ], hide: ["6"] }, // 6 = Preferências (nota de trabalho, fica só no doc)
  ];
  var DOCS = TABS.filter(function(t){ return t.file; });
  var TYPES = TABS.filter(function(t){ return t.id === "conferir"; })[0].groups[0][1];
  var cache = {}, modified = 0;
  function load(file){
    if (!cache[file]) cache[file] = fetch(file, { cache: "no-cache" }).then(function(r){
      if (!r.ok) throw new Error(file + " " + r.status);
      var lm = Date.parse(r.headers.get("last-modified") || ""); if (lm > modified) modified = lm; // "Atualizado em" do topo = registro mais recente
      return r.text();
    });
    return cache[file];
  }
  // Dados auxiliares do painel (checks do código e série da tendência): se faltar, o bloco some sem quebrar a página
  var EXTRA = { jsx: "integration/jsx-check.json", dart: "integration/flutter/dart-check.json", trend: "docs/tendencia.json" };
  function loadJSON(file){ return load(file).then(JSON.parse).catch(function(){ return null; }); }

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
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource; });
    var comps = pg.filter(function(c){ return !c.block && !c.composition && !c.template; }).length;
    var tpls = pg.filter(function(c){ return c.template; }).length;
    return [
      { label: "Componentes no playground", value: comps, sub: "+ " + pg.filter(function(c){ return c.block; }).length + " building blocks" + (tpls ? " e " + tpls + " templates" : ""), icon: "view-module-line", app: "accent", tip: "Componentes do Figma implementados no playground, sem contar building blocks, templates, composições e recursos de apoio." },
      { label: "Variantes do Figma cobertas", value: variants, sub: "em " + sets + " sets da lib · todas no playground", icon: "check-line", app: "positive", pct: 100, tip: "Soma das variantes dos sets do inventário da lib (Roadmap §2). Todas estão implementadas no playground." },
      { label: "Débitos e melhorias mapeados", value: openC, sub: solved + " já resolvidos (" + Math.round(solved / ((openC + solved) || 1) * 100) + "%)", icon: "warning-line", app: "warning", pct: Math.round(solved / ((openC + solved) || 1) * 1000) / 10, href: "#/relatorio/conferir", tip: "Itens em aberto no Conferir: divergências entre Figma e código, gaps e propostas de melhoria. A barra mostra a parte já resolvida." },
      health(docs)
    ];
  }

  // Saúde geral (Gustavo, 09/10, no lugar de Decisões registradas): um status só, juntando o build do portal (smoke, docs e peso)
  // e o check de cada stack. Atenção = algo falhou ou há divergência alta; Com avisos = avisos ou divergências médias.
  function health(docs){
    var build = rows(sec(docs.saude, function(s){ return s.title === "Resumo"; }).lines).map(function(r){ return plain(r[1] || ""); });
    var fail = build.filter(function(t){ return /❌/.test(t); }).length, warn = build.filter(function(t){ return /⚠️/.test(t); }).length;
    var lr = levels(docs.stack), lf = levels(docs["stack-flutter"]), alta = (lr["Alta"] || 0) + (lf["Alta"] || 0), media = (lr["Média"] || 0) + (lf["Média"] || 0);
    var st = fail || alta ? ["negative", "Atenção"] : warn || media ? ["warning", "Com avisos"] : ["positive", "Em dia"];
    var parts = [fail ? fail + (fail === 1 ? " verificação do build falhou" : " verificações do build falharam") : "Build do portal em dia"];
    if (alta) parts.push(alta + (alta === 1 ? " divergência alta" : " divergências altas") + " nas stacks");
    else if (media) parts.push(media + (media === 1 ? " divergência média" : " divergências médias") + " nas stacks");
    return { label: "Saúde geral", value: st[1], sub: parts.join(" · "), icon: "health-line", app: st[0], href: "#/relatorio/saude",
      tip: "Junta o último build do portal (smoke dos componentes, das docs e peso) e o check Figma × React e Figma × Flutter. Atenção: algo falhou ou há divergência alta. Com avisos: avisos ou divergências médias." };
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
  // Bloco de sinal vital: Shaped Icon + nome + resultado + Tag de status; o bloco todo é um Link do DS para a tab
  function vital(parent, name, icon, text, st, href, tip){
    var v = parent.appendChild(el("div", "rp-vital"));
    var h = v.appendChild(el("div", "rp-vital__head"));
    var ic = h.appendChild(el("cds-shaped-icon")); ic.setAttribute("icon", icon); ic.setAttribute("appearance", st[0]); ic.setAttribute("size", "small");
    var tg = h.appendChild(el("cds-tag", "rp-vital__st")); tg.setAttribute("label", st[1]); tg.setAttribute("appearance", st[0]); tg.setAttribute("show-lead-item", "false");
    v.appendChild(el("p", "rp-vital__name", esc(name)));
    v.appendChild(el("p", "rp-vital__text", esc(text)));
    v.appendChild(dsLink("rp-vital__more", "Abrir", href));
    if (tip && CDS.kit) CDS.kit.lazyTip(v.querySelector(".rp-vital__name"), plain(tip), { focus: false });
    return v;
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
      pl.setAttribute("percent", "0"); pl.dataset.pct = String(Math.round(d.value / max * 1000) / 10); pl.setAttribute("aria-hidden", "true");
      row.appendChild(el("span", "rp-bar__value", String(d.value)));
      // Tooltip da linha: valor e % do total; nos débitos, o que entra naquele tipo (1ª frase da seção no Conferir)
      var total = (opts && opts.total) || data.reduce(function(a, x){ return a + x.value; }, 0); // total real (o painel pode mostrar só as maiores)
      if (CDS.kit) CDS.kit.lazyTip(row, d.value + " de " + total + " (" + Math.round(d.value / (total || 1) * 100) + "%)" + (d.desc ? ". " + d.desc : "") + (d.href ? " Clique para ver os itens." : ""), { label: d.label });
    });
  }
  // ---------- Movimento (Motion Styles/tokens; nada anima com prefers-reduced-motion) ----------
  var still = function(){ return matchMedia("(prefers-reduced-motion:reduce)").matches; };
  function ms(token){ return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(token)) || 0; }
  function fmt(n){ return typeof n === "number" ? n.toLocaleString("pt-BR") : String(n); }
  // conta de 0 até o valor na duração Extra Long/04 com desaceleração (Expressive decelerate ≈ ease-out)
  function countUp(node, to){
    if (typeof to !== "number" || still()) return;
    var dur = ms("--common-motion-duration-extra-long-04"), t0 = null;
    node.textContent = "0";
    function step(t){ if (t0 == null) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); node.textContent = fmt(Math.round(to * e)); if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  // Progress Line e segmentos nascem em 0 e crescem até o valor (a transição de largura está no report.css)
  function grow(scope){
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      [].forEach.call(scope.querySelectorAll("cds-progress-line[data-pct]"), function(pl){ pl.setAttribute("percent", pl.dataset.pct); });
      [].forEach.call(scope.querySelectorAll("[data-grow]"), function(n){ n.classList.add("is-grown"); });
    }); });
  }
  // Níveis do Resumo de um SAUDE-STACK.md ({ Alta, Média, Informativo })
  function levels(doc){ var o = {}; rows(sec(doc, function(s){ return s.title === "Resumo"; }).lines).forEach(function(r){ o[plain(r[0])] = parseInt(r[r.length - 1], 10) || 0; }); return o; }
  function stStatus(lv){ return lv["Alta"] ? ["negative", "Atenção"] : lv["Média"] ? ["warning", "Com avisos"] : ["positive", "Em dia"]; }
  function brDate(iso){ var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ""); return m ? m[3] + "/" + m[2] : ""; }
  function compsOnly(){ return (CDS.playgrounds || []).filter(function(c){ return !c.resource && !c.block && !c.composition && !c.template; }); }

  // ---------- Figma, React e Flutter lado a lado ----------
  // Uma coluna por stack: cobertura, status (Tag), código validado, divergências e de quando é a leitura.
  // Cobertura em barra dividida (Gustavo, 09/10): a barra inteira é sempre o total de componentes e cada parte tem nome e número
  // na legenda, para não parecer uma meta de 100% nem deixar a parte vazia sem explicação. Cores = Tags de status (como a Publicação).
  function stacks(grid){
    var comps = compsOnly(), N = comps.length;
    var p = panel(grid, "Figma, React e Flutter", "Quanto do Castanha DS já está em cada stack e se a tradução entre elas está em dia", "rp-panel--wide");
    var row = p.appendChild(el("div", "rp-stacks"));
    function col(o){
      var c = row.appendChild(el("section", "rp-stk")); c.setAttribute("aria-label", o.name);
      var h = c.appendChild(el("div", "rp-vital__head"));
      var nm = h.appendChild(el("div", "rp-stk__name"));
      var ic = nm.appendChild(el("cds-shaped-icon")); ic.setAttribute("icon", o.icon); ic.setAttribute("appearance", "neutral"); ic.setAttribute("size", "small");
      nm.appendChild(el("h3", "rp-stk__title", esc(o.name)));
      var tg = h.appendChild(el("cds-tag", "rp-vital__st")); tg.setAttribute("label", o.st[1]); tg.setAttribute("appearance", o.st[0]); tg.setAttribute("show-lead-item", "false");
      var v = c.appendChild(el("p", "rp-stk__value", "<strong>" + fmt(o.n) + "</strong> de " + fmt(o.of) + " " + esc(o.base)));
      c.appendChild(el("p", "rp-stk__what", esc(o.what) + " (" + Math.round(o.n / (o.of || 1) * 100) + "%)"));
      var bar = c.appendChild(el("div", "rp-stack rp-stk__bar")); bar.setAttribute("role", "img");
      bar.setAttribute("aria-label", o.segs.map(function(sg){ return sg[1] + ": " + sg[2]; }).join("; ") + " (de " + o.of + ")");
      var lgS = c.appendChild(el("ul", "rp-stk__legend"));
      o.segs.forEach(function(sg, i){
        if (!sg[2]) return;
        var b = bar.appendChild(el("span", "rp-stack__seg is-" + sg[0])); b.style.setProperty("--_w", String(sg[2] / (o.of || 1))); b.style.setProperty("--_i", String(i)); b.setAttribute("data-grow", "");
        var li = lgS.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + sg[0])); li.appendChild(el("span", null, esc(sg[1]))); li.appendChild(el("strong", null, fmt(sg[2])));
        if (CDS.kit){ var tx = sg[2] + " de " + o.of + " (" + Math.round(sg[2] / (o.of || 1) * 100) + "%)." + (sg[3] ? " " + sg[3] : ""); CDS.kit.lazyTip(b, tx, { label: sg[1], focus: false }); CDS.kit.lazyTip(li, tx, { label: sg[1], focus: false }); }
      });
      var ul = c.appendChild(el("ul", "rp-stk__facts"));
      o.facts.forEach(function(f){ if (f) ul.appendChild(el("li", null, f)); });
      if (o.levels){
        var lt = ul.appendChild(el("li", "rp-stk__levels")); lt.appendChild(el("span", null, "Divergências"));
        [["negative", "Alta"], ["warning", "Média"]].forEach(function(x){ var t = lt.appendChild(el("cds-tag")); t.setAttribute("label", (o.levels[x[1]] || 0) + " " + x[1].toLowerCase()); t.setAttribute("appearance", (o.levels[x[1]] ? x[0] : "neutral")); t.setAttribute("show-lead-item", "false"); });
      }
      c.appendChild(dsLink("rp-vital__more", o.link[0], o.link[1]));
      if (CDS.kit) CDS.kit.lazyTip(v, o.tip, { label: o.name, focus: false });
    }
    // Figma: status de publicação lido no Figma (scripts/figma-status.js), sem os building blocks
    var FS = CDS.figmaStatus || { items: {} }, isComp = {}, fk = { current: 0, changed: 0, unpublished: 0, branch: 0, "branch-update": 0 }, fTotal = 0;
    comps.forEach(function(c){ isComp[c.id] = true; }); // mesma base do gráfico Adoção ao longo do tempo
    Object.keys(FS.items).forEach(function(id){ if (!isComp[id]) return; fTotal++; fk[FS.items[id]] = (fk[FS.items[id]] || 0) + 1; });
    var pend = fk.changed + fk.unpublished, br = fk.branch + fk["branch-update"];
    col({ name: "Figma", icon: "figma-line", n: fk.current, of: fTotal, base: "componentes na lib", what: "publicados sem pendência",
      st: pend ? ["warning", "Com avisos"] : ["positive", "Em dia"],
      segs: [["ch03", "Publicados", fk.current, "Publicados na lib sem alterações pendentes."],
        ["ch01", "Mudança em branch", br, "Existem numa branch do Figma ou têm melhoria numa branch que ainda não foi para a main."],
        ["ch04", "Com alteração pendente", fk.changed, "Publicados, mas o arquivo tem alterações que ainda não foram publicadas."],
        ["ch05", "Não publicado", fk.unpublished, "Componentes que ainda não estão publicados na lib."]],
      facts: ["Última mudança no Figma em " + String(FS.checked || "").replace(/\/\d{4}$/, "")],
      link: ["Ver no Roadmap", "#/relatorio/roadmap"], tip: "Componentes da lib [CastanhaDS] Components publicados sem alterações pendentes, lidos no Figma. Building blocks, composições e templates ficam fora da conta." });
    // React: par no castanha-react (manifesto), JSX validado com o tsc e o check Figma × React
    var R = CDS.react || { items: {} }, rN = comps.filter(function(c){ return R.items[c.id] && R.items[c.id].status === "react"; }).length, lvR = levels(docs.stack), jx = extra.jsx;
    col({ name: "React", icon: "react-line", n: rN, of: N, base: "componentes do playground", what: "com par no castanha-react (web)", st: stStatus(lvR), levels: lvR,
      segs: [["ch03", "Com par no React", rN, "Componentes do playground que já existem no castanha-react."], ["ch07", "Ainda sem par", N - rN, "Existem no Figma e no playground, mas ainda não no castanha-react."]],
      facts: [jx ? "Código gerado validado: " + fmt(jx.trechos) + " trechos, " + (jx.erros || []).length + ((jx.erros || []).length === 1 ? " erro" : " erros") : "",
        R.source ? "Leitura da staging de " + brDate(R.source.date) : ""],
      link: ["Abrir Stack React", "#/relatorio/stack"], tip: "Componentes do playground que já existem no castanha-react. O código do painel \"No React\" é validado com o TypeScript da lib a cada leitura." });
    // Flutter: widget no castanha_flutter, Dart validado com o dart analyze e o check Figma × Flutter
    var F = CDS.flutter || { items: {} }, fN = comps.filter(function(c){ return F.items[c.id]; }).length, lvF = levels(docs["stack-flutter"]), dt = extra.dart;
    col({ name: "Flutter", icon: "flutter-fill", n: fN, of: N, base: "componentes do playground", what: "com widget no castanha_flutter (app)", st: stStatus(lvF), levels: lvF,
      segs: [["ch03", "Com widget no Flutter", fN, "Componentes do playground que já existem no castanha_flutter."], ["ch07", "Ainda sem par", N - fN, "Existem no Figma e no playground, mas ainda não no castanha_flutter."]],
      facts: [dt ? "Código gerado validado: " + fmt(dt.snippets) + " trechos, " + dt.errors + (dt.errors === 1 ? " erro" : " erros") : "",
        F.source ? "Leitura da staging de " + brDate(F.source.date) : ""],
      link: ["Abrir Stack Flutter", "#/relatorio/stack-flutter"], tip: "Componentes do playground que já existem no castanha_flutter. O código do painel \"No Flutter\" é validado com o dart analyze a cada leitura." });
    return p;
  }

  // ---------- Tendência (docs/tendencia.json + o ponto de hoje calculado dos registros atuais) ----------
  // Um gráfico pequeno por indicador (escalas diferentes não dividem eixo): linha de 2px, ponto no último dia, dica por dia.
  function trend(grid){
    var T = extra.trend; if (!T || !T.days || !T.days.length) return null;
    var days = T.days.slice(), now = new Date(), today = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
    if (days[days.length - 1].d < today){
      var ab = 0, rs = 0; docs.conferir.sections.forEach(function(s){ var n = items(s.lines).filter(function(l){ return /^\|\s*(~~)?C\d+/.test(l); }).length; if (/^Resolvidos/.test(s.title)) rs += n; else ab += n; });
      var srcs = {}; Object.keys(CDS.docsIndex || {}).forEach(function(k){ srcs[String(CDS.docsIndex[k].src).split("?")[0]] = 1; });
      var lr = levels(docs.stack), lf = levels(docs["stack-flutter"]);
      days.push({ d: today, docs: Object.keys(srcs).length, decisoes: docs.roadmap.raw.split("\n").filter(function(l){ return /^\|\s*(~~)?D\d+\b/.test(l); }).length,
        abertos: ab, resolvidos: rs, react: lr["Alta"] != null ? [lr["Alta"], lr["Média"] || 0] : null, flutter: lf["Alta"] != null ? [lf["Alta"], lf["Média"] || 0] : null, live: true });
    }
    var sum = function(k){ return function(d){ return d[k] ? d[k][0] + d[k][1] : null; }; };
    // Cada card tem uma ou mais séries da mesma unidade (dividem o eixo). Débitos: em aberto ao lado dos resolvidos (Gustavo, 09/10).
    var M = [
      { t: "Documentações de componente", tip: "Docs de uso, anatomia, estilos e acessibilidade publicadas no portal.", s: [{ get: function(d){ return d.docs; } }] },
      { t: "Decisões registradas", tip: "Decisões de produto e de implementação registradas no Roadmap.", s: [{ get: function(d){ return d.decisoes; } }] },
      { t: "Débitos no Conferir", tip: "Divergências, gaps e propostas do Conferir: os que ainda esperam ação e os já resolvidos (no Figma ou no código).", s: [
        { name: "Em aberto", get: function(d){ return d.abertos; } },
        { name: "Resolvidos", get: function(d){ return d.resolvidos; }, cls: "is-res" }] },
      { t: "Divergências Figma × React", tip: "Itens de nível alto e médio no check Figma × castanha-react.", s: [{ get: sum("react") }] },
      { t: "Divergências Figma × Flutter", tip: "Itens de nível alto e médio no check Figma × castanha_flutter.", s: [{ get: sum("flutter") }] }
    ];
    var first = days[0].d, p = panel(grid, "Tendência", "Como os registros evoluíram dia a dia, de " + brDate(first) + " até hoje", "rp-panel--wide");
    var wrap = p.appendChild(el("div", "rp-trends")), NS = "http://www.w3.org/2000/svg", W = 240, H = 64, PAD = 4;
    var dayLabel = function(d){ return new Date(d + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }); };
    var signed = function(n){ return (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n)); };
    M.forEach(function(m, mi){
      var rowsD = days.filter(function(d){ return m.s.every(function(s){ return s.get(d) != null; }); });
      if (!rowsD.length) return;
      var c = wrap.appendChild(el("section", "rp-trend")), d0 = rowsD[0], dl = rowsD[rowsD.length - 1], multi = m.s.length > 1;
      c.setAttribute("aria-label", m.t);
      c.appendChild(el("h3", "rp-trend__title", esc(m.t)));
      if (multi){
        // legenda com o valor de hoje e a variação: a cor nunca é a única pista
        var lg = c.appendChild(el("ul", "rp-trend__legend"));
        m.s.forEach(function(s){ var li = lg.appendChild(el("li")); li.appendChild(el("span", "rp-trend__sw " + (s.cls || ""))); li.appendChild(el("span", null, esc(s.name)));
          li.appendChild(el("strong", null, fmt(s.get(dl)))); if (rowsD.length > 1) li.appendChild(el("span", "rp-trend__delta", signed(s.get(dl) - s.get(d0)))); });
      } else {
        var g = m.s[0].get, delta = g(dl) - g(d0);
        c.appendChild(el("p", "rp-trend__value", "<strong>" + fmt(g(dl)) + "</strong> <span>" + (rowsD.length < 2 ? "primeira leitura hoje" : signed(delta) + " desde " + brDate(d0.d)) + "</span>"));
      }
      if (rowsD.length < 2){ c.appendChild(el("p", "rp-trend__empty", "A linha aparece a partir da próxima leitura diária.")); return; }
      var all = [].concat.apply([], m.s.map(function(s){ return rowsD.map(s.get); }));
      var lo = Math.min.apply(null, all), hi = Math.max.apply(null, all);
      if (multi || (lo > 0 && hi - lo < hi * 0.1)) lo = Math.min(lo, 0); // comparação ou variação pequena: o eixo começa no zero
      // eixo x pelas datas: dia sem registro (fim de semana) deixa o espaço dele
      var t0 = Date.parse(d0.d), span = (Date.parse(dl.d) - t0) || 1;
      var X = function(i){ return PAD + (Date.parse(rowsD[i].d) - t0) / span * (W - 2 * PAD); }, Y = function(n){ return H - PAD - (hi === lo ? 0.5 : (n - lo) / (hi - lo)) * (H - 2 * PAD); };
      var box = c.appendChild(el("div", "rp-trend__chart"));
      var svg = box.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "rp-trend__svg");
      svg.setAttribute("role", "img"); svg.setAttribute("aria-label", m.t + ": " + rowsD.map(function(d){ return brDate(d.d) + " " + m.s.map(function(s){ return (s.name ? s.name.toLowerCase() + " " : "") + s.get(d); }).join(", "); }).join("; "));
      var base = svg.appendChild(document.createElementNS(NS, "line")); base.setAttribute("class", "rp-trend__base"); base.setAttribute("x1", "0"); base.setAttribute("x2", String(W)); base.setAttribute("y1", String(H - PAD)); base.setAttribute("y2", String(H - PAD));
      m.s.forEach(function(s){
        var line = svg.appendChild(document.createElementNS(NS, "polyline")); line.setAttribute("class", "rp-trend__line " + (s.cls || "")); line.setAttribute("pathLength", "100"); line.setAttribute("data-grow", ""); line.style.setProperty("--_i", String(mi));
        line.setAttribute("points", rowsD.map(function(d, i){ return X(i).toFixed(1) + "," + Y(s.get(d)).toFixed(1); }).join(" "));
        // ponto do último dia (HTML sobre o SVG: o SVG estica na largura e um círculo sairia oval)
        var dot = box.appendChild(el("span", "rp-trend__dot " + (s.cls || ""))); dot.style.left = (X(rowsD.length - 1) / W * 100) + "%"; dot.style.top = (Y(s.get(dl)) / H * 100) + "%";
      });
      // uma faixa por dia para a dica (alvo maior que a marca)
      var hits = box.appendChild(el("div", "rp-trend__hits"));
      rowsD.forEach(function(d, i){
        var hcol = hits.appendChild(el("span", "rp-trend__hit")); hcol.style.setProperty("--_x", String(X(i) / W));
        var tx = m.s.map(function(s){ return (s.name ? s.name + ": " : "") + fmt(s.get(d)); }).join(" · ") + (d.live ? " (hoje, calculado dos registros atuais)." : ".");
        if (CDS.kit) CDS.kit.lazyTip(hcol, tx, { label: dayLabel(d.d), focus: false });
      });
      var ax = c.appendChild(el("p", "rp-trend__axis")); ax.appendChild(el("span", null, brDate(d0.d))); ax.appendChild(el("span", null, dl.live ? "Hoje" : brDate(dl.d)));
      if (CDS.kit) CDS.kit.lazyTip(c.querySelector(".rp-trend__title"), m.tip, { focus: false });
    });
    p.appendChild(el("p", "rp-panel__foot", "Um ponto por dia, com o último registro de cada dia na linha principal do repositório (<code>scripts/dev/tendencia.js</code>). O ponto de hoje é calculado dos registros atuais."));
    return p;
  }

  // ---------- Adoção ao longo do tempo (Castanha Analytics, Figma 2675:8589) ----------
  // Gráfico de área em %: uma série por stack, eixo 0–100% com 5 linhas de grade, datas embaixo (a do hover vira Tag Neutral),
  // legenda com linha e ponto, Select de período e Tooltip do DS com o valor de cada série no dia. Cores Charts do design
  // (03 medium · 04 semi-soft · 05 semi-soft). Azul e roxo ficam próximos para protanopia: cada linha leva o valor no fim (C197).
  function adoption(grid){
    var T = extra.trend; if (!T || !T.days || !T.days.length) return null;
    var comps = compsOnly(), C = {}; comps.forEach(function(c){ C[c.id] = 1; });
    var days = T.days.filter(function(d){ return d.cob; }).map(function(d){ return { d: d.d, cob: d.cob }; });
    // hoje, calculado ao vivo com a mesma conta do scripts/dev/tendencia.js
    var now = new Date(), today = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
    if (!days.length || days[days.length - 1].d < today){
      var R = (CDS.react || { items: {} }).items, F = (CDS.flutter || { items: {} }).items, FS = (CDS.figmaStatus || { items: {} }).items;
      var base = comps.filter(function(c){ return R[c.id]; }), fsIds = Object.keys(FS).filter(function(id){ return C[id]; });
      days.push({ d: today, live: true, cob: {
        react: [base.filter(function(c){ return R[c.id].status === "react"; }).length, base.length],
        flutter: [base.filter(function(c){ return F[c.id]; }).length, base.length],
        figma: [fsIds.filter(function(id){ return FS[id] === "current"; }).length, fsIds.length] } });
    }
    var S = [{ k: "figma", name: "Figma", tip: "Publicados na lib sem pendência", cls: "is-s1" },
      { k: "react", name: "React", tip: "Com par no castanha-react", cls: "is-s2" },
      { k: "flutter", name: "Flutter", tip: "Com widget no castanha_flutter", cls: "is-s3" }];
    var pct = function(d, k){ var v = d.cob[k]; return v && v[1] ? Math.round(v[0] / v[1] * 1000) / 10 : null; };
    var p = panel(grid, "Adoção ao longo do tempo", "Quanto dos componentes do playground já está em cada stack, dia a dia", "rp-panel--wide");
    // Select de período + legenda (linha e ponto)
    var top = p.appendChild(el("div", "rp-adop__top"));
    // Async Select Input do DS (como no Figma): as opções entram como <option> antes de conectar (o componente lê uma vez)
    var sel = el("cds-async-select-input", "rp-adop__period");
    [["label", "Período"], ["show-required", "false"], ["show-supporting-content", "false"], ["show-lead-icon", "false"], ["placeholder", "Período"], ["value", "tudo"]].forEach(function(x){ sel.setAttribute(x[0], x[1]); });
    [["7", "Últimos 7 dias"], ["30", "Últimos 30 dias"], ["tudo", "Desde o início"]].forEach(function(o){ var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; sel.appendChild(op); });
    top.appendChild(sel);
    var lg = top.appendChild(el("ul", "rp-adop__legend"));
    S.forEach(function(s){ var li = lg.appendChild(el("li", s.cls)); li.appendChild(el("span", "rp-adop__key")).setAttribute("aria-hidden", "true"); li.appendChild(el("span", null, esc(s.name))); if (CDS.kit) CDS.kit.lazyTip(li, s.tip + ".", { label: s.name, focus: false }); });
    var chart = p.appendChild(el("div", "rp-adop"));
    var yax = chart.appendChild(el("div", "rp-adop__y")); yax.setAttribute("aria-hidden", "true");
    [100, 75, 50, 25, 0].forEach(function(v){ yax.appendChild(el("span", null, v + "%")); });
    var plot = chart.appendChild(el("div", "rp-adop__plot")); plot.tabIndex = 0; plot.setAttribute("role", "img");
    var xs = chart.appendChild(el("div", "rp-adop__x"));
    var NS = "http://www.w3.org/2000/svg", W = 1000, H = 300;
    var tipEl = null, anchor = null, cur = -1, view = [], period = "tudo";
    function smooth(pts){ // curva monotônica (não passa do valor real entre dois dias)
      if (pts.length < 2) return "";
      var d = "M" + pts[0][0] + "," + pts[0][1];
      for (var i = 0; i < pts.length - 1; i++){ var a = pts[i], b = pts[i + 1], mx = (a[0] + b[0]) / 2; d += " C" + mx + "," + a[1] + " " + mx + "," + b[1] + " " + b[0] + "," + b[1]; }
      return d;
    }
    function draw(){
      var lim = period === "7" ? 7 : period === "30" ? 30 : 0;
      var t1 = Date.parse(days[days.length - 1].d), t0 = lim ? t1 - (lim - 1) * 864e5 : Date.parse(days[0].d);
      view = days.filter(function(d){ return Date.parse(d.d) >= t0; });
      if (view.length < 2) view = days.slice(-2);
      t0 = Date.parse(view[0].d);
      var span = (t1 - t0) || 1, X = function(d){ return (Date.parse(d.d) - t0) / span * W; }, Y = function(v){ return H - v / 100 * H; };
      plot.innerHTML = ""; xs.innerHTML = "";
      var area = plot.appendChild(el("div", "rp-adop__area")); // linhas e hover; à direita fica a coluna dos rótulos do fim
      var ends = [], svg = area.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "rp-adop__svg"); svg.setAttribute("aria-hidden", "true");
      var defs = svg.appendChild(document.createElementNS(NS, "defs"));
      [0, 1, 2, 3, 4].forEach(function(i){ var g = svg.appendChild(document.createElementNS(NS, "line")); g.setAttribute("class", "rp-adop__grid"); g.setAttribute("x1", "0"); g.setAttribute("x2", String(W)); g.setAttribute("y1", String(i * H / 4)); g.setAttribute("y2", String(i * H / 4)); });
      S.forEach(function(s, si){
        var pts = view.filter(function(d){ return pct(d, s.k) != null; }).map(function(d){ return [Math.round(X(d) * 10) / 10, Math.round(Y(pct(d, s.k)) * 10) / 10]; });
        if (!pts.length) return;
        var gid = "rp-adop-g" + si, lgr = defs.appendChild(document.createElementNS(NS, "linearGradient")); lgr.setAttribute("id", gid); lgr.setAttribute("x1", "0"); lgr.setAttribute("x2", "0"); lgr.setAttribute("y1", "0"); lgr.setAttribute("y2", "1");
        [[0, ".22"], [.45, ".1"], [.85, ".03"], [1, "0"]].forEach(function(st){ var e = lgr.appendChild(document.createElementNS(NS, "stop")); e.setAttribute("offset", String(st[0])); e.setAttribute("class", "rp-adop__stop " + s.cls); e.setAttribute("stop-opacity", st[1]); });
        if (pts.length > 1){
          var area = svg.appendChild(document.createElementNS(NS, "path")); area.setAttribute("d", smooth(pts) + " L" + pts[pts.length - 1][0] + "," + H + " L" + pts[0][0] + "," + H + " Z"); area.setAttribute("fill", "url(#" + gid + ")");
          var line = svg.appendChild(document.createElementNS(NS, "path")); line.setAttribute("d", smooth(pts)); line.setAttribute("class", "rp-adop__line " + s.cls);
        }
        // valor no fim da linha (relevo para a paleta: azul e roxo próximos para protanopia)
        var lastD = view.filter(function(d){ return pct(d, s.k) != null; }).pop(), end = plot.appendChild(el("span", "rp-adop__end " + s.cls, fmt(pct(lastD, s.k)) + "%"));
        end.style.top = (Y(pct(lastD, s.k)) / H * 100) + "%"; ends.push({ el: end, y: Y(pct(lastD, s.k)) / H * 100 });
      });
      // rótulos do fim sem sobrepor: de cima para baixo, cada um pelo menos 9% abaixo do anterior
      ends.sort(function(a, b){ return a.y - b.y; }).forEach(function(e, i, a){ if (i && e.y < a[i - 1].y + 9) e.y = a[i - 1].y + 9; e.el.style.top = e.y + "%"; });
      // linha do hover, pontos e âncora do Tooltip
      var rule = area.appendChild(el("span", "rp-adop__rule")); rule.hidden = true;
      var dots = S.map(function(s){ var d = area.appendChild(el("span", "rp-adop__dot " + s.cls)); d.hidden = true; return d; });
      anchor = area.appendChild(el("span", "rp-adop__anchor")); anchor.id = "rp-adop-anchor";
      if (tipEl) tipEl.remove();
      tipEl = el("cds-tooltip", "rp-adop__tip"); tipEl.setAttribute("for", anchor.id); tipEl.setAttribute("show-label", "true"); tipEl.setAttribute("placement", "bottom"); tipEl.setAttribute("label", " "); tipEl.setAttribute("text", " ");
      chart.appendChild(tipEl);
      // datas: até 8 rótulos espalhados; o do hover vira Tag Neutral
      // datas: do fim para o começo, só as que ficam a pelo menos 56px da anterior (cabe no celular); o hover mostra qualquer uma
      var labs = [], wpx = area.getBoundingClientRect().width || W, gap = 56, lastX = Infinity;
      view.forEach(function(d){
        var lb = xs.appendChild(el("span", "rp-adop__xl")); lb.style.left = (X(d) / W * 100) + "%";
        lb.textContent = d.live ? "Hoje" : brDate(d.d);
        labs.push(lb);
      });
      for (var li = view.length - 1; li >= 0; li--){ var px = X(view[li]) / W * wpx; if (lastX - px >= gap || li === view.length - 1){ lastX = px; } else labs[li].classList.add("is-quiet"); }
      plot.setAttribute("aria-label", "Adoção por stack: " + view.map(function(d){ return (d.live ? "hoje" : brDate(d.d)) + ", " + S.map(function(s){ var v = pct(d, s.k); return s.name + " " + (v == null ? "sem dado" : fmt(v) + "%"); }).join(", "); }).join("; "));
      function show(i){
        if (i < 0 || i >= view.length){ rule.hidden = true; dots.forEach(function(d){ d.hidden = true; }); tipEl.hidden = true; labs.forEach(function(l){ l.classList.remove("is-on"); var t = l.querySelector("cds-tag"); if (t){ l.textContent = t.getAttribute("label"); } }); cur = -1; return; }
        cur = i; var d = view[i], x = X(d) / W * 100, topY = 100;
        rule.hidden = false; rule.style.left = x + "%";
        S.forEach(function(s, si){ var v = pct(d, s.k); dots[si].hidden = v == null; if (v != null){ dots[si].style.left = x + "%"; dots[si].style.top = (Y(v) / H * 100) + "%"; topY = Math.min(topY, Y(v) / H * 100); } });
        anchor.style.left = x + "%"; anchor.style.top = topY + "%";
        labs.forEach(function(l, li){ var on = li === i, t = l.querySelector("cds-tag");
          if (on && !t){ var txt = l.textContent; l.textContent = ""; t = l.appendChild(el("cds-tag")); t.setAttribute("label", txt); t.setAttribute("appearance", "neutral"); t.setAttribute("show-lead-item", "false"); }
          else if (!on && t){ l.textContent = t.getAttribute("label"); }
          l.classList.toggle("is-on", on); });
        tipEl.setAttribute("label", d.live ? "Hoje" : new Date(d.d + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" }));
        tipEl.setAttribute("text", S.map(function(s){ var v = pct(d, s.k); return s.name + ": " + (v == null ? "sem leitura" : fmt(v) + "% (" + d.cob[s.k][0] + " de " + d.cob[s.k][1] + ")"); }).join("\n"));
        tipEl.show();
      }
      plot.onpointermove = function(e){ var r = area.getBoundingClientRect(), t = t0 + (e.clientX - r.left) / r.width * span, best = 0;
        view.forEach(function(d, i){ if (Math.abs(Date.parse(d.d) - t) < Math.abs(Date.parse(view[best].d) - t)) best = i; }); if (best !== cur) show(best); };
      plot.onpointerleave = function(){ show(-1); };
      plot.onfocus = function(){ show(view.length - 1); }; plot.onblur = function(){ show(-1); };
      plot.onkeydown = function(e){ if (e.key === "ArrowLeft" || e.key === "ArrowRight"){ e.preventDefault(); show(Math.max(0, Math.min(view.length - 1, (cur < 0 ? view.length - 1 : cur) + (e.key === "ArrowLeft" ? -1 : 1)))); } else if (e.key === "Escape") show(-1); };
    }
    sel.addEventListener("cds-change", function(e){ e.stopPropagation(); period = (e.detail && e.detail.value) || "tudo"; draw(); });
    draw();
    p.appendChild(el("p", "rp-panel__foot", "Base: os componentes do playground (sem building blocks, composições e templates) que já existiam em cada dia. Figma = publicados na lib sem pendência; React e Flutter = com par na lib de código. Passe o mouse ou use as setas para ver cada dia."));
    return p;
  }

  function overview(){
    var road = docs.roadmap, conf = docs.conferir;
    var grid = bodyEl.appendChild(el("div", "rp-dash"));

    // Divergências por tipo
    var open = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; });
    var total = open.reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    // Débitos e melhorias: progresso geral (resolvidos) + uma barra por tipo, dividida em como o código tratou cada item
    // (segue o Figma · exceção aprovada · débito), nas cores da rosca de Adaptações. Comprimento = quantidade no tipo.
    var solvedN = items(sec(conf, function(s){ return s.title === "Resolvidos"; }).lines).length;
    var p2 = panel(grid, "Débitos e melhorias mapeados", total + " em aberto e " + solvedN + " resolvidos · por tipo de ajuste e como o código tratou", "rp-panel--wide");
    var prog = p2.appendChild(el("div", "rp-prog"));
    var pl = prog.appendChild(el("cds-progress-line", "rp-prog__pl")); pl.setAttribute("percent", "0"); pl.dataset.pct = String(Math.round(solvedN / ((total + solvedN) || 1) * 1000) / 10); pl.setAttribute("aria-hidden", "true");
    prog.appendChild(el("p", "rp-prog__t", "<strong>" + Math.round(solvedN / ((total + solvedN) || 1) * 100) + "% resolvido</strong> · " + solvedN + " de " + (total + solvedN) + " itens já registrados no Conferir"));
    var KIND = function(r){ var code = r[4] || "", act = r[5] || ""; return /débito|erro no figma/i.test(act) ? "deb" : /exceção/i.test(code) ? "exc" : "seg"; };
    var types = open.map(function(s){
      var rs = rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }), k = { seg: 0, exc: 0, deb: 0 };
      rs.forEach(function(r){ k[KIND(r)]++; });
      var desc = (s.lines.filter(function(l){ return l.trim() && !/^\|/.test(l); })[0] || "").replace(/\*\*|`/g, "").trim();
      return { label: s.title, n: items(s.lines).length, k: k, href: "#/relatorio/conferir/" + slug(s.title), desc: desc };
    }).sort(function(a, b){ return b.n - a.n; });
    var maxT = Math.max.apply(null, types.map(function(t){ return t.n; }).concat([1]));
    var tl = p2.appendChild(el("ul", "rp-bars rp-types"));
    types.forEach(function(t, i){
      var li = tl.appendChild(el("li")), row = li.appendChild(el("a", "rp-bar rp-type")); row.href = t.href;
      row.appendChild(el("span", "rp-bar__label", esc(t.label)));
      var track = row.appendChild(el("span", "rp-type__track")); track.setAttribute("aria-hidden", "true");
      var fill = track.appendChild(el("span", "rp-type__fill")); fill.style.setProperty("--_w", String(t.n / maxT)); fill.style.setProperty("--_i", String(i)); fill.setAttribute("data-grow", "");
      ["seg", "exc", "deb"].forEach(function(k){ if (!t.k[k]) return; var sg = fill.appendChild(el("span", "rp-type__seg is-" + k)); sg.style.flexGrow = String(t.k[k]); });
      row.appendChild(el("span", "rp-bar__value", String(t.n)));
      var parts = [["seg", "seguem o Figma"], ["exc", "exceção aprovada"], ["deb", "débito ou erro no Figma"]].filter(function(x){ return t.k[x[0]]; }).map(function(x){ return t.k[x[0]] + " " + x[1]; }).join(" · ");
      if (CDS.kit) CDS.kit.lazyTip(row, t.n + " em aberto: " + parts + "." + (t.desc ? " " + t.desc : "") + " Clique para ver os itens.", { label: t.label });
    });
    var lg = p2.appendChild(el("ul", "rp-legend rp-legend--inline"));
    [["seg", "Segue o Figma"], ["exc", "Exceção aprovada"], ["deb", "Débito ou erro no Figma"]].forEach(function(x){ var li = lg.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + x[0])); li.appendChild(el("span", null, x[1])); });

    // Como o código tratou
    var all = [].concat.apply([], open.map(function(s){ return rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }); }));
    var kinds = { exc: 0, deb: 0, seg: 0 };
    all.forEach(function(r){ var code = r[4] || "", act = r[5] || ""; if (/débito|erro no figma/i.test(act)) kinds.deb++; else if (/exceção/i.test(code)) kinds.exc++; else kinds.seg++; });
    var p3 = panel(grid, "Adaptações para código", "Regra D40: o código segue o Figma, e o que muda é exceção aprovada ou débito registrado");
    var parts = [["seg", "Segue o Figma", kinds.seg, "O código faz o que o Figma faz hoje, mesmo quando parece errado. A divergência fica registrada para corrigir no Figma."],
      ["exc", "Exceção aprovada (web, sem especificação ou decisão)", kinds.exc, "O código difere do Figma por decisão do Gustavo, falta de especificação ou adaptação para web aprovada."],
      ["deb", "Débito ou erro no Figma", kinds.deb, "Problema confirmado no Figma, a corrigir lá. O código acompanha quando a correção entrar."]];
    // Rosca em SVG (traços com pathLength 100): desenha ao abrir; passar o mouse ou focar uma fatia/legenda destaca e mostra o número no centro
    var donut = p3.appendChild(el("div", "rp-donut")), NS = "http://www.w3.org/2000/svg", n = all.length || 1;
    var box = donut.appendChild(el("div", "rp-donut__ring"));
    var svg = box.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "0 0 42 42"); svg.setAttribute("class", "rp-donut__svg");
    svg.setAttribute("role", "img"); svg.setAttribute("aria-label", parts.map(function(pt){ return pt[1] + ": " + pt[2]; }).join("; "));
    var trk = svg.appendChild(document.createElementNS(NS, "circle")); trk.setAttribute("class", "rp-donut__track");
    var acc = 0, segs = {};
    parts.forEach(function(pt){
      var c = svg.appendChild(document.createElementNS(NS, "circle")), len = pt[2] / n * 100;
      c.setAttribute("class", "rp-donut__seg is-" + pt[0]); c.setAttribute("pathLength", "100");
      c.style.setProperty("--_len", String(Math.max(0, len - (len > 1 ? 0.6 : 0)))); c.style.setProperty("--_off", String(-acc));
      c.setAttribute("data-grow", ""); acc += len; segs[pt[0]] = c;
    });
    [trk].concat(Object.keys(segs).map(function(k){ return segs[k]; })).forEach(function(c){ c.setAttribute("cx", "21"); c.setAttribute("cy", "21"); c.setAttribute("r", "15.915"); });
    var mid = box.appendChild(el("div", "rp-donut__mid", "<strong>" + all.length + "</strong><span>itens</span>"));
    var leg = donut.appendChild(el("ul", "rp-legend"));
    function focusPart(k){
      donut.classList.toggle("is-focus", !!k);
      Object.keys(segs).forEach(function(x){ segs[x].classList.toggle("is-on", x === k); });
      [].forEach.call(leg.children, function(li){ li.classList.toggle("is-on", li._tip && li._tip[0] === k); });
      var pt = parts.filter(function(x){ return x[0] === k; })[0];
      mid.innerHTML = pt ? "<strong>" + pt[2] + "</strong><span>" + Math.round(pt[2] / n * 100) + "% · " + esc(pt[1].replace(/ \(.*$/, "")) + "</span>" : "<strong>" + all.length + "</strong><span>itens</span>";
    }
    parts.forEach(function(pt){
      var li = leg.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + pt[0])); li.appendChild(el("span", null, esc(pt[1]))); li.appendChild(el("strong", null, String(pt[2]))); li._tip = pt;
      li.addEventListener("mouseenter", function(){ focusPart(pt[0]); }); li.addEventListener("mouseleave", function(){ focusPart(null); });
      li.addEventListener("focusin", function(){ focusPart(pt[0]); }); li.addEventListener("focusout", function(){ focusPart(null); });
      segs[pt[0]].addEventListener("mouseenter", function(){ focusPart(pt[0]); }); segs[pt[0]].addEventListener("mouseleave", function(){ focusPart(null); });
    });

    // Componentes por categoria
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource && !c.block && !c.composition; }), cats = {};
    pg.forEach(function(c){ var k = c.category || "Outros"; cats[k] = (cats[k] || 0) + 1; });
    var p4 = panel(grid, "Componentes por página do Figma", pg.length + " componentes em " + Object.keys(cats).length + " páginas");
    var first = {}; pg.forEach(function(c){ var k = c.category || "Outros"; if (!first[k]) first[k] = c.id; });
    var cl = Object.keys(cats).map(function(k){ return { label: k, value: cats[k], href: "#/" + first[k], desc: "Abre o primeiro componente da página " + k + "." }; }).sort(function(a, b){ return b.value - a.value || a.label.localeCompare(b.label, "pt-BR"); });
    bars(p4, cl, { tone: "components", total: pg.length });
    // painel curto: as 8 maiores; o resto abre com Main Button Ghost do DS
    var rowsC = [].slice.call(p4.querySelectorAll(".rp-bars > li"));
    if (rowsC.length > 8){
      rowsC.slice(8).forEach(function(li){ li.hidden = true; });
      var more = p4.appendChild(el("cds-main-button", "rp-expand"));
      [["kind", "ghost"], ["appearance", "neutral"], ["size", "small"], ["label", "Ver todas as " + rowsC.length + " páginas"], ["lead-icon", "dropdown-open-line"], ["show-trailing-icon", "false"]].forEach(function(x){ more.setAttribute(x[0], x[1]); });
      more.addEventListener("click", function(){ var open = rowsC[8].hidden; rowsC.slice(8).forEach(function(li){ li.hidden = !open; });
        more.setAttribute("label", open ? "Mostrar as 8 maiores" : "Ver todas as " + rowsC.length + " páginas"); more.setAttribute("lead-icon", open ? "dropdown-close-line" : "dropdown-open-line"); });
    }

    // Publicação na lib do Figma (scripts/figma-status.js, lido via MCP com getPublishStatusAsync)
    var FS = CDS.figmaStatus || { items: {} }, byId = {}, pubN = {};
    (CDS.playgrounds || []).forEach(function(c){ byId[c.id] = c.name; });
    Object.keys(FS.items).forEach(function(id){ (pubN[FS.items[id]] = pubN[FS.items[id]] || []).push(byId[id] || id); });
    // 4º item = cor Charts do Castanha Analytics (D316), a mesma da coluna Figma do painel das stacks
    var PUBS = [["current", "Publicado no Figma", "Publicado na lib sem alterações pendentes.", "ch03"],
      ["changed", "Publicado com alterações pendentes", "Publicado, mas o arquivo tem alterações que ainda não foram publicadas.", "ch04"],
      ["unpublished-comp", "Não publicado", "Componente que ainda não está publicado na lib.", "ch05"],
      ["branch", "Não publicado · em branch", "Existe numa branch do Figma e ainda não está na main.", "ch01"],
      ["branch-update", "Melhoria em branch", "A main está publicada, mas a página documenta uma melhoria que ainda está numa branch.", "ch01"],
      ["unpublished-block", "Não publicado · building block", "Building blocks (nome com ponto) ficam fora da publicação de propósito.", "ch07"]];
    var blocks = {}; (CDS.playgrounds || []).forEach(function(c){ if (c.block) blocks[c.name] = true; });
    var un = pubN.unpublished || []; pubN["unpublished-comp"] = un.filter(function(n){ return !blocks[n]; }); pubN["unpublished-block"] = un.filter(function(n){ return blocks[n]; });
    var pubTotal = Object.keys(FS.items).length;
    var p5 = panel(grid, "Publicação na lib do Figma", (pubN.current || []).length + " de " + pubTotal + " em dia com a lib · última mudança no Figma em " + FS.checked, "rp-panel--wide");
    // Barra única empilhada (100% = todos os componentes lidos) + legenda com número e %; cores da Tag de status
    var stack = p5.appendChild(el("div", "rp-stack")); stack.setAttribute("role", "img");
    var legP = p5.appendChild(el("ul", "rp-legend rp-legend--grid"));
    stack.setAttribute("aria-label", PUBS.map(function(pt){ return pt[1] + ": " + (pubN[pt[0]] || []).length; }).join("; "));
    PUBS.forEach(function(pt, i){
      var names = (pubN[pt[0]] || []).slice().sort(function(a, b){ return a.localeCompare(b, "pt-BR"); }), nn = names.length;
      var list = nn <= 8 ? names.join(", ") : "Ex.: " + names.slice(0, 6).join(", ") + "…", tipTx = nn + " de " + pubTotal + " (" + Math.round(nn / (pubTotal || 1) * 100) + "%). " + pt[2] + (nn ? " " + list + "." : "");
      if (nn){ var sg = stack.appendChild(el("span", "rp-stack__seg is-" + pt[3])); sg.style.setProperty("--_w", String(nn / (pubTotal || 1))); sg.style.setProperty("--_i", String(i)); sg.setAttribute("data-grow", "");
        if (CDS.kit) CDS.kit.lazyTip(sg, tipTx, { label: pt[1], focus: false }); }
      var li = legP.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + pt[3])); li.appendChild(el("span", null, esc(pt[1])));
      li.appendChild(el("strong", null, nn + " <span class=\"rp-legend__pct\">" + Math.round(nn / (pubTotal || 1) * 100) + "%</span>"));
      if (CDS.kit) CDS.kit.lazyTip(li, tipTx, { label: pt[1] });
    });
    var pend = pubN["unpublished-comp"].concat(pubN.branch || []);
    if (pend.length) p5.appendChild(el("p", "rp-panel__foot", "Fora da lib: " + esc(pend.join(", ")) + ". Lido no Figma via MCP (<code>getPublishStatusAsync</code>). O status de cada componente aparece numa Tag ao lado do título."));

    // Últimas decisões
    var dec = rows(sec(road, function(s){ return s.num === "4"; }).lines).filter(function(r){ return /^D\d+/.test(r[0]); })
      .sort(function(a, b){ return parseInt(a[0].slice(1), 10) - parseInt(b[0].slice(1), 10); });
    var qs = items(sec(road, function(s){ return s.num === "5"; }).lines).filter(function(l){ return !/✅/.test(l); }).length; // dúvidas em aberto (saíram do topo com a Saúde geral)
    var p6 = panel(grid, "Últimas decisões", dec.length + " registradas · " + (qs ? qs + (qs === 1 ? " dúvida em aberto" : " dúvidas em aberto") : "sem dúvidas em aberto") + " · ver todas no Roadmap", "rp-panel--wide");
    var dl = p6.appendChild(el("ul", "rp-list rp-list--cols"));
    dec.slice(-6).reverse().forEach(function(r){
      var li = dl.appendChild(el("li"));
      var tx = li.appendChild(el("p", "rp-list__text")), tg = tx.appendChild(el("cds-tag", "rp-list__tag"));
      tg.setAttribute("label", r[0]); tg.setAttribute("appearance", "informative"); tg.setAttribute("show-lead-item", "false");
      tx.appendChild(el("span", null, esc(plain(r[1]).replace(/^(.{180}).+$/, "$1…"))));
      if (r[2]) li.appendChild(el("p", "rp-list__note", esc(plain(r[2]))));
    });
    // Sinais vitais: o resumo da Saúde técnica (smoke, docs, peso), em blocos com status
    var p0 = panel(grid, "Sinais vitais", "Último build do portal: smoke dos componentes, das docs e peso da primeira visita · detalhes na tab Saúde técnica", "rp-panel--wide");
    var vit = p0.appendChild(el("div", "rp-vitals"));
    var NAMES = [[/smoke dos componentes/i, "Componentes", "view-module-line"], [/smoke das docs/i, "Docs", "document-line"], [/peso/i, "Peso da 1ª visita", "download-line"]];
    rows(sec(docs.saude, function(s){ return s.title === "Resumo"; }).lines).forEach(function(r){
      var nm = NAMES.filter(function(x){ return x[0].test(r[0]); })[0], res = plain(r[1] || "");
      var st = /❌/.test(res) ? ["negative", "Falhou"] : /⚠️/.test(res) ? ["warning", "Com avisos"] : ["positive", "Em dia"];
      vital(vit, nm ? nm[1] : plain(r[0]), nm ? nm[2] : "information-line", res.replace(/[✅⚠️❌]\uFE0F?\s*/g, "").trim(), st, "#/relatorio/saude", r[0]);
    });

    // Ritmo do projeto: decisões por dia (data da linha no Roadmap §4), dias seguidos do primeiro ao último registro
    // Escondido (Gustavo, 05/10): o código fica para voltar trocando SHOW_RITMO para true
    var SHOW_RITMO = false;
    var byDay = {}, yr = new Date().getFullYear();
    dec.forEach(function(r){ var m = (r[r.length - 1] || "").match(/(\d{2})\/(\d{2})(?!.*\d{2}\/\d{2})/); if (m){ var k = m[2] + "-" + m[1]; byDay[k] = (byDay[k] || 0) + 1; } });
    var keys = Object.keys(byDay).sort();
    if (SHOW_RITMO && keys.length){
      var d0 = new Date(yr, +keys[0].slice(0, 2) - 1, +keys[0].slice(3)), d1 = new Date(yr, +keys[keys.length - 1].slice(0, 2) - 1, +keys[keys.length - 1].slice(3)), days = [];
      for (var d = new Date(d0); d <= d1; d.setDate(d.getDate() + 1)) days.push(new Date(d));
      var dated = keys.reduce(function(a, k){ return a + byDay[k]; }, 0), peak = Math.max.apply(null, keys.map(function(k){ return byDay[k]; }));
      var p7 = panel(grid, "Ritmo do projeto", dated + " decisões com data em " + days.length + " dias · média de " + Math.round(dated / days.length) + " por dia", "rp-panel--wide");
      var chart = p7.appendChild(el("div", "rp-cols")); chart.setAttribute("role", "img");
      chart.setAttribute("aria-label", days.map(function(dd){ var k = ("0" + (dd.getMonth() + 1)).slice(-2) + "-" + ("0" + dd.getDate()).slice(-2); return dd.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) + ": " + (byDay[k] || 0); }).join("; "));
      days.forEach(function(dd, i){
        var k = ("0" + (dd.getMonth() + 1)).slice(-2) + "-" + ("0" + dd.getDate()).slice(-2), n = byDay[k] || 0, lbl = dd.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        var col = chart.appendChild(el("div", "rp-col" + (n === peak ? " is-peak" : "") + (n ? "" : " is-zero")));
        col.style.setProperty("--_h", String(n / peak)); col.style.setProperty("--_i", String(i));
        var bar = col.appendChild(el("span", "rp-col__bar")); bar.setAttribute("data-grow", "");
        col.appendChild(el("span", "rp-col__n", String(n)));
        col.appendChild(el("span", "rp-col__d", lbl.replace(/\/\d{4}$/, "")));
        if (CDS.kit) CDS.kit.lazyTip(col, n ? n + (n === 1 ? " decisão registrada." : " decisões registradas.") : "Sem decisões neste dia.", { label: dd.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }), focus: false });
      });
    }

    var p8 = stacks(grid), p10 = adoption(grid), p9 = trend(grid);
    // Duas seções (Gustavo, 09/10): Progresso (como o DS avança nas stacks, para quem acompanha de fora) e Detalhes (o que pede ação
    // e o que explica as decisões, para quem trabalha no DS). Nomes comuns, sem citar público.
    var groups = [["Progresso", "Cobertura no Figma, no React e no Flutter, publicação na lib e evolução dia a dia", [p8, p10, p5, p9]],
      ["Detalhes", "Débitos, regras de adaptação, componentes, decisões e o build do portal", [p2, p4, p3].concat(typeof p7 !== "undefined" ? [p7] : []).concat([p6, p0])]], k = 0;
    groups.forEach(function(g){
      var h = grid.appendChild(el("div", "rp-dash__group"));
      h.appendChild(el("h2", "rp-dash__group-title", esc(g[0])));
      h.appendChild(el("p", "rp-dash__group-sub", esc(g[1])));
      g[2].filter(Boolean).forEach(function(p){ var c = p.closest("cds-card"); c.style.setProperty("--_i", String(k++)); grid.appendChild(c); });
    });
    grow(grid);
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
  var root, kpiEl, tabsEl, bodyEl, searchEl, metaEl, current = null, docs = null, extra = {};

  function build(){
    root = document.getElementById("report");
    root.innerHTML = "";
    // Topo = capa da Thumbnail Castanha na cor Black do Castanha Assets (D230): Surface/inversed e a pilha em cinza
    var head = root.appendChild(el("div", "rp-head loc-pilha-trigger"));
    var t = head.appendChild(el("div", "rp-head__text"));
    t.appendChild(el("h1", "rp-title", "Saúde do Castanha DS"));
    metaEl = t.appendChild(el("p", "rp-meta", "Figma, playground, castanha-react e castanha_flutter, lidos direto dos registros do repositório."));
    // Search Input do DS (lupa fixa e botão de limpar); rótulo oculto, o nome acessível continua
    searchEl = document.createElement("cds-search-input"); searchEl.className = "rp-search";
    ["label", "placeholder"].forEach(function(k){ searchEl.setAttribute(k, "Buscar no relatório"); });
    searchEl.setAttribute("show-label", "false"); searchEl.setAttribute("show-required", "false"); searchEl.setAttribute("show-supporting-content", "false");
    t.appendChild(searchEl);
    var pilha = head.appendChild(el("loc-pilha", "rp-head__pilha")); pilha.setAttribute("on", "inversed");
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
    // Único acesso à página escondida dos componentes locais (#/locais, hidden: fora do menu e da busca; Gustavo, 06/10)
    if (id === "arquitetura"){
      toc.appendChild(dsLink("rp-src", "Componentes locais", "#/locais"));
      // Embaixo: a proposta zeroheight → portal (docs/pitch, página própria em tela cheia; Gustavo, 06/10)
      toc.appendChild(dsLink("rp-src", "Proposta: zeroheight → portal", "docs/pitch/"));
      // E o roteiro de 20 paradas para quem chega (docs/roteiro, página escondida; Gustavo, 06/10)
      toc.appendChild(dsLink("rp-src", "Roteiro: 20 coisas para explorar", "docs/roteiro/"));
    }
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
      var ex = Object.keys(EXTRA);
      Promise.all(DOCS.map(function(t){ return load(t.file); }).concat(ex.map(function(k){ return loadJSON(EXTRA[k]); }))).then(function(texts){
        docs = {}; DOCS.forEach(function(t, i){ docs[t.id] = parse(texts[i]); docs[t.id].raw = texts[i]; });
        ex.forEach(function(k, i){ extra[k] = texts[DOCS.length + i]; });
        if (modified) metaEl.textContent = "Figma, playground, castanha-react e castanha_flutter, lidos direto dos registros do repositório. Atualizado em " +
          new Date(modified).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) + " às " + new Date(modified).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + ".";
        kpiEl.innerHTML = "";
        kpis(docs).forEach(function(k, i){
          // Número com Shaped Icon do DS na cor do assunto; o valor conta até o total (Motion: Extra Long/04) e a
          // Progress Line mostra a parte concluída quando faz sentido
          var c = card("rp-kpi rp-kpi--" + k.app); c.style.setProperty("--_i", String(i));
          var h = c.appendChild(el("div", "rp-kpi__head"));
          var ic = h.appendChild(el("cds-shaped-icon")); ic.setAttribute("icon", k.icon); ic.setAttribute("appearance", k.app); ic.setAttribute("size", "smallest");
          h.appendChild(el("p", "rp-kpi__label", k.label));
          var v = c.appendChild(el("p", "rp-kpi__value", fmt(k.value)));
          c.appendChild(el("p", "rp-kpi__sub", k.sub));
          if (k.pct != null){ var pl = c.appendChild(el("cds-progress-line", "rp-kpi__pl")); pl.setAttribute("percent", "0"); pl.dataset.pct = String(k.pct); pl.setAttribute("aria-hidden", "true"); }
          if (k.href) c.appendChild(dsLink("rp-kpi__more", "Ver detalhes", k.href));
          kpiEl.appendChild(c);
          countUp(v, k.value);
          if (k.tip && CDS.kit) CDS.kit.tip(h, k.tip, { label: k.label, container: kpiEl });
        });
        grow(kpiEl);
        current = id; renderTab(id); goTo(section);
      }).catch(function(err){ bodyEl.innerHTML = '<p class="rp-meta">Não foi possível ler os registros (' + esc(String(err.message || err)) + ").</p>"; });
    }
  };
})();
