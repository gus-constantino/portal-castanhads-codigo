/**
 * Relatório do playground (#/relatorio/<tab>[/<seção>]): painel para quem acompanha o projeto.
 * Lê docs/ROADMAP.md, docs/CONFERIR.md e docs/ARCHITECTURE.md ao abrir, então está sempre igual ao repositório.
 * Tab "Visão geral" = dashboard (números, etapas, divergências, pendências); as outras tabs são os docs,
 * com as seções (##) reagrupadas por assunto. Camada do shell, não da lib.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var REPO = "https://github.com/gus-constantino/portal-castanhads-codigo/blob/main/";
  // Seções por número do título (ROADMAP/ARCHITECTURE) ou pelo nome (CONFERIR). O que não estiver listado vai para o último grupo.
  var TABS = [
    // Rótulos e ordem de 15/10 (Gustavo): o que pede ação (Pendências), o que foi decidido (Decisões), o estado do código
    // (Qualidade, React, Flutter) e a referência (Arquitetura, Glossário). Os ids (e as rotas #/relatorio/<id>) não mudaram.
    { id: "visao", title: "Visão geral" },
    { id: "conferir", title: "Pendências", file: "docs/CONFERIR.md", groups: [
      ["Em aberto, por tipo", ["Ajuste de texto", "Ajuste de UI", "Motion", "Refactor", "Naming", "Acessibilidade", "Documentação", "Integração React"]],
      ["Fechados", ["Resolvidos"]], ["Referência", ["Como usar esta lista"]] ] },
    { id: "chamados", title: "Chamados" }, // chamados em aberto do #castanha-suporte, do mais antigo ao mais novo (Gustavo, 15/10)
    { id: "roadmap", title: "Decisões", file: "docs/ROADMAP.md", groups: [
      ["Andamento", ["8", "3"]], ["Decisões e pendências", ["4", "5", "5.1", "5.2"]], ["Referência", ["2", "7", "1"]] ], hide: ["6"] }, // 6 = Preferências (nota de trabalho, fica só no doc)
    { id: "saude", title: "Qualidade", file: "docs/SAUDE-TECNICA.md", groups: [ // gerado pelo build-index (smoke e peso)
      ["Resumo", ["Resumo"]], ["Smoke", ["Componentes", "Docs"]], ["Peso", ["Peso"]], ["Referência", ["Como rodar"]] ] },
    { id: "stack", title: "React", file: "integration/SAUDE-STACK.md", groups: [ // R2: check Figma × castanha-react × playground
      ["Resumo", ["Resumo"]], ["Por nível", ["Alta", "Média", "Informativo"]], ["Tokens e assets", ["Tokens", "Assets"]], ["Histórico", ["Histórico"]], ["Referência", ["Como rodar"]] ] },
    { id: "stack-flutter", title: "Flutter", file: "integration/flutter/SAUDE-STACK.md", groups: [ // F2: check Figma × castanha_flutter × playground
      ["Resumo", ["Resumo"]], ["Por nível", ["Alta", "Média", "Informativo"]], ["Assets", ["Assets"]], ["Histórico", ["Histórico"]], ["Referência", ["Como rodar"]] ] },
    { id: "arquitetura", title: "Arquitetura", file: "docs/ARCHITECTURE.md", groups: [
      ["Visão", ["1", "2"]], ["Evolução", ["7", "6", "5"]], ["Referência técnica", ["3", "4", "8"]] ] },
  ];
  // Glossário (R1 do onboarding dos Relatórios): termos de scripts/report-glossario.js, por último entre as tabs
  TABS.push({ id: "glossario", title: "Glossário" });
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
  var EXTRA = { jsx: "integration/jsx-check.json", dart: "integration/flutter/dart-check.json", trend: "docs/tendencia.json", chamados: "docs/chamados.json" };
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
    // Inventário (§2): soma da coluna Var. ("12 / 1" = dois sets). Cobertura lida, não escrita (R0/B2 do onboarding): o set conta
    // quando o nome dele (coluna Componente, "Radio Button / Group" alinhado com "8 / 1") tem página no playground
    var sets = 0, variants = 0, setsOk = 0, varOk = 0, missing = [], col = 1, have = {};
    var norm = function(x){ return plain(x).replace(/\([^)]*\)|\[[^\]]*\]|[`*✅]|\uFE0F/g, "").trim().toLowerCase(); };
    (CDS.playgrounds || []).forEach(function(c){ if (!c.resource) have[norm(c.name)] = true; });
    sec(road, function(s){ return s.num === "2"; }).lines.forEach(function(l){
      if (!/^\|/.test(l) || /^\|\s*:?-{3,}/.test(l)) return;
      var c = cells(l);
      if (/^\|\s*(Página|Componente)\s*\|/.test(l)){ col = Math.max(0, c.indexOf("Componente")); return; }
      var v = c[c.length - 2] || "", ns = norm(c[col] || "").split(/\s*\/\s*/), i = 0;
      v.split("/").forEach(function(x){
        var n = parseInt(x, 10); if (isNaN(n)) return;
        var part = ns[i] || ns[0]; i++; variants += n; sets++;
        if (have[part] || have[ns[0] + " " + part] || have[ns[0].split(" ")[0] + " " + part]){ /* "Radio Button / Group" · "Progress Tracker Item / Tracker" */ varOk += n; setsOk++; } else missing.push(part);
      });
    });
    var varPct = variants ? Math.round(varOk / variants * 1000) / 10 : 0;
    var openC = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; }).reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var solved = items(sec(conf, function(s){ return s.title === "Resolvidos"; }).lines).length;
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource; });
    var comps = pg.filter(function(c){ return !c.block && !c.composition && !c.template; }).length;
    var tpls = pg.filter(function(c){ return c.template; }).length;
    return [
      { label: "Componentes no playground", value: comps, sub: "+ " + pg.filter(function(c){ return c.block; }).length + " building blocks" + (tpls ? " e " + tpls + " templates" : ""), icon: "view-module-line", app: "accent", tip: "Componentes do Figma implementados no playground, sem contar building blocks, templates, composições e recursos de apoio." },
      { label: "Variantes do Figma cobertas", value: varOk, sub: varOk === variants ? "todas as " + variants + " dos " + sets + " sets da lib" : "de " + variants + " · " + setsOk + " de " + sets + " sets da lib com página no playground", icon: "check-line", app: varOk === variants ? "positive" : "warning", pct: varPct,
        tip: "Variantes dos sets do inventário da lib (Roadmap §2) que têm página no playground, conferidas pelo nome do set." + (missing.length ? " Sem página: " + missing.join(", ") + "." : "") },
      { label: "Débitos e melhorias mapeados", value: openC, sub: solved + " já resolvidos (" + Math.round(solved / ((openC + solved) || 1) * 100) + "%)", icon: "warning-line", app: "warning", pct: Math.round(solved / ((openC + solved) || 1) * 1000) / 10, href: "#/relatorio/conferir", tip: "Itens em aberto no Conferir: divergências entre Figma e código, gaps e propostas de melhoria. A barra mostra a parte já resolvida." },
      health(docs)
    ];
  }

  // Saúde geral (Gustavo, 09/10, no lugar de Decisões registradas): um status só, juntando o build do portal (smoke, docs e peso)
  // e o check de cada stack. Atenção = algo falhou ou há divergência alta; Com avisos = avisos ou divergências médias.
  function health(docs){
    var build = rows(sec(docs.saude, function(s){ return s.title === "Resumo"; }).lines).map(function(r){ return plain(r[1] || ""); });
    var fail = build.filter(function(t){ return /❌/.test(t); }).length, warn = build.filter(function(t){ return /⚠️/.test(t); }).length;
    var nodata = !build.length || build.some(function(t){ return noData(t); });
    var lr = levels(docs.stack), lf = levels(docs["stack-flutter"]), alta = (lr["Alta"] || 0) + (lf["Alta"] || 0), media = (lr["Média"] || 0) + (lf["Média"] || 0);
    var st = fail || alta ? ["negative", "Atenção"] : warn || media ? ["warning", "Com avisos"] : nodata ? ["informative", "Sem dado"] : ["positive", "Em dia"];
    var parts = [fail ? fail + (fail === 1 ? " verificação do build falhou" : " verificações do build falharam") : nodata ? "Build do portal sem o smoke rodado" : "Build do portal em dia"];
    if (alta) parts.push(alta + (alta === 1 ? " divergência alta" : " divergências altas") + " nas stacks");
    else if (media) parts.push(media + (media === 1 ? " divergência média" : " divergências médias") + " nas stacks");
    return { label: "Saúde geral", value: st[1], sub: parts.join(" · "), icon: "health-line", app: st[0], href: "#/relatorio/saude",
      tip: "Junta o último build do portal (smoke dos componentes, das docs e peso) e o check Figma × React e Figma × Flutter. Atenção: algo falhou ou há divergência alta. Com avisos: avisos ou divergências médias." };
  }
  // Resultado sem dado: smoke ainda não rodado ("—") ou célula vazia. Não vale como Em dia (R0/B3 do onboarding)
  function noData(t){ return !String(t || "").trim() || /^—|não rodado/i.test(String(t).trim()); }
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
  // ---------- Peças do Castanha Analytics (Figma xHh4XiLrKxt8GGmEFsytpr, v.3 › UI Refinada) ----------
  // Tag de variação (Big numbers 2476:16442): Positive + up-line, Negative + down-line, Neutral sem ícone quando não mudou
  function deltaTag(diff, unit){
    var t = el("cds-tag", "rp-delta"), v = Math.round(diff * 10) / 10;
    t.setAttribute("label", (v > 0 ? "+" : v < 0 ? "−" : "") + fmt(Math.abs(v)) + " " + unit);
    t.setAttribute("appearance", v > 0 ? "positive" : v < 0 ? "negative" : "neutral");
    if (v) t.setAttribute("icon", v > 0 ? "up-line" : "down-line"); else t.setAttribute("show-lead-item", "false");
    return t;
  }
  // Big numbers: número grande (Heading/Medium) + Tag de variação, Progress Line e legenda embaixo
  function bigNumber(parent, value, delta, pct, caption){
    var b = parent.appendChild(el("div", "rp-big"));
    var row = b.appendChild(el("div", "rp-big__row")); row.appendChild(el("p", "rp-big__n", esc(value)));
    if (delta) row.appendChild(delta);
    if (pct != null){ var pl = b.appendChild(el("cds-progress-line", "rp-big__pl")); pl.setAttribute("percent", "0"); pl.dataset.pct = String(pct); pl.setAttribute("aria-hidden", "true"); }
    if (caption) b.appendChild(el("p", "rp-big__cap", esc(caption)));
    return b;
  }
  // Legenda com o Indicator do design (bolinha na cor Charts)
  function chipLegend(parent, list){
    var ul = parent.appendChild(el("ul", "rp-chips"));
    list.forEach(function(x){ var li = ul.appendChild(el("li")); li.appendChild(el("span", "rp-legend__sw is-" + x.cls)); li.appendChild(el("span", null, esc(x.label))); if (x.tip && CDS.kit) CDS.kit.lazyTip(li, x.tip, { label: x.label, focus: false }); });
    return ul;
  }
  // Lista percentual (.Percentual list 2476:18755): posição em Accent, nome e descrição, Progress Line (ou barra dividida) e valor,
  // chevron quando a linha leva a algum lugar, Divider Soft entre as linhas
  function pctList(parent, list){
    var ul = parent.appendChild(el("ul", "rp-plist"));
    list.forEach(function(r, i){
      var li = ul.appendChild(el("li")), row = li.appendChild(el(r.href ? "a" : "div", "rp-plist__row")); if (r.href) row.href = r.href;
      var txt = row.appendChild(el("div", "rp-plist__text"));
      if (r.rank) txt.appendChild(el("span", "rp-plist__rank", r.rank + "."));
      var lab = txt.appendChild(el("div", "rp-plist__lab")); lab.appendChild(el("span", "rp-plist__name", esc(r.label))); if (r.desc) lab.appendChild(el("span", "rp-plist__desc", esc(r.desc)));
      var pr = row.appendChild(el("div", "rp-plist__prog"));
      if (r.segs){
        var tr = pr.appendChild(el("span", "rp-plist__track")); tr.setAttribute("aria-hidden", "true");
        var fill = tr.appendChild(el("span", "rp-plist__fill")); fill.style.setProperty("--_w", String(r.segs.reduce(function(a, s){ return a + s[1]; }, 0) / (r.of || 1))); fill.setAttribute("data-grow", ""); fill.style.setProperty("--_i", String(i));
        r.segs.forEach(function(s){ if (!s[1]) return; var sg = fill.appendChild(el("span", "rp-stack__seg is-" + s[0])); sg.style.flexGrow = String(s[1]); });
      } else { var pl = pr.appendChild(el("cds-progress-line", "rp-plist__pl")); pl.setAttribute("percent", "0"); pl.dataset.pct = String(Math.round(r.pct * 10) / 10); pl.setAttribute("aria-hidden", "true"); }
      pr.appendChild(el("span", "rp-plist__value", esc(r.value)));
      if (r.href){ var ic = row.appendChild(el("cds-icon", "rp-plist__go")); ic.setAttribute("icon", "navigation-right-line"); ic.setAttribute("size", "large"); ic.setAttribute("appearance", "neutral"); ic.setAttribute("aria-hidden", "true"); }
      if (i < list.length - 1){ var dv = li.appendChild(el("cds-divider")); dv.setAttribute("intensity", "soft"); }
      if (r.tip && CDS.kit) CDS.kit.lazyTip(row, r.tip, { label: r.label, focus: false });
    });
    return ul;
  }
  // Barra empilhada com legenda em colunas ("Castanha nos projetos" 2675:8470): Indicator, nome, descrição e o % grande
  function stackCols(parent, list, total){
    var bar = parent.appendChild(el("div", "rp-stack rp-scols__bar")); bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", list.map(function(x){ return x.label + ": " + x.n + " (" + Math.round(x.n / (total || 1) * 100) + "%)"; }).join("; "));
    var cols = parent.appendChild(el("ul", "rp-scols"));
    list.forEach(function(x, i){
      if (x.n){ var sg = bar.appendChild(el("span", "rp-stack__seg is-" + x.cls)); sg.style.setProperty("--_w", String(x.n / (total || 1))); sg.style.setProperty("--_i", String(i)); sg.setAttribute("data-grow", ""); }
      var li = cols.appendChild(el("li")), hd = li.appendChild(el("p", "rp-scols__name")); hd.appendChild(el("span", "rp-legend__sw is-" + x.cls)); hd.appendChild(el("span", null, esc(x.label)));
      if (x.desc) li.appendChild(el("p", "rp-scols__desc", esc(x.desc)));
      li.appendChild(el("p", "rp-scols__n", "<strong>" + Math.round(x.n / (total || 1) * 100) + "%</strong> <span>" + fmt(x.n) + (x.n === 1 ? " item" : " itens") + "</span>"));
    });
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
    // variação em pontos percentuais desde a última leitura fechada da Equalização (campo cob do docs/tendencia.json)
    var prevCob = {}, TD = (extra.trend && extra.trend.days || []).filter(function(d){ return d.cob; }), lastC = TD.length ? TD[TD.length - 1].cob : {};
    Object.keys(lastC).forEach(function(k){ if (lastC[k] && lastC[k][1]) prevCob[k] = Math.round(lastC[k][0] / lastC[k][1] * 1000) / 10; });
    var p = panel(grid, "Figma, React e Flutter", "Quanto do Castanha DS já está em cada stack e se a tradução entre elas está em dia", "rp-panel--wide");
    var row = p.appendChild(el("div", "rp-stacks"));
    function col(o){
      var c = row.appendChild(el("section", "rp-stk")); c.setAttribute("aria-label", o.name);
      var h = c.appendChild(el("div", "rp-vital__head"));
      var nm = h.appendChild(el("div", "rp-stk__name"));
      var ic = nm.appendChild(el("cds-icon")); ic.setAttribute("icon", o.icon); ic.setAttribute("appearance", "accent"); ic.setAttribute("size", "medium");
      nm.appendChild(el("h3", "rp-stk__title", esc(o.name)));
      var tg = h.appendChild(el("cds-tag", "rp-vital__st")); tg.setAttribute("label", o.st[1]); tg.setAttribute("appearance", o.st[0]); tg.setAttribute("show-lead-item", "false");
      var pv = Math.round(o.n / (o.of || 1) * 1000) / 10, prev = prevCob[o.key];
      var v = bigNumber(c, fmt(pv) + "%", prev != null ? deltaTag(pv - prev, "pp") : null, null, fmt(o.n) + " de " + fmt(o.of) + " " + o.base + " · " + o.what);
      v.classList.add("rp-big--small");
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
      if (CDS.kit) CDS.kit.lazyTip(v.querySelector(".rp-big__n"), o.tip + (prev != null ? " A Tag mostra a variação desde a leitura anterior, em pontos percentuais." : ""), { label: o.name, focus: false });
    }
    // Figma: status de publicação lido no Figma (scripts/figma-status.js), sem os building blocks
    var FS = CDS.figmaStatus || { items: {} }, isComp = {}, fk = { current: 0, changed: 0, unpublished: 0, branch: 0, "branch-update": 0 }, fTotal = 0;
    comps.forEach(function(c){ isComp[c.id] = true; }); // mesma base do gráfico Adoção ao longo do tempo
    Object.keys(FS.items).forEach(function(id){ if (!isComp[id]) return; fTotal++; fk[FS.items[id]] = (fk[FS.items[id]] || 0) + 1; });
    var pend = fk.changed + fk.unpublished, br = fk.branch + fk["branch-update"];
    col({ key: "figma", name: "Figma", icon: "figma-line", n: fk.current, of: fTotal, base: "componentes na lib", what: "publicados sem pendência",
      st: pend ? ["warning", "Com avisos"] : ["positive", "Em dia"],
      segs: [["ch03", "Publicados", fk.current, "Publicados na lib sem alterações pendentes."],
        ["ch01", "Mudança em branch", br, "Existem numa branch do Figma ou têm melhoria numa branch que ainda não foi para a main."],
        ["ch04", "Com alteração pendente", fk.changed, "Publicados, mas o arquivo tem alterações que ainda não foram publicadas."],
        ["ch05", "Não publicado", fk.unpublished, "Componentes que ainda não estão publicados na lib."]],
      facts: ["Última mudança no Figma em " + String(FS.checked || "").replace(/\/\d{4}$/, "")],
      link: ["Ver em Decisões", "#/relatorio/roadmap"], tip: "Componentes da lib [CastanhaDS] Components publicados sem alterações pendentes, lidos no Figma. Building blocks, composições e templates ficam fora da conta." });
    // React: par no castanha-react (manifesto), JSX validado com o tsc e o check Figma × React
    var R = CDS.react || { items: {} }, rN = comps.filter(function(c){ return R.items[c.id] && R.items[c.id].status === "react"; }).length, lvR = levels(docs.stack), jx = extra.jsx;
    col({ key: "react", name: "React", icon: "react-line", n: rN, of: N, base: "componentes do playground", what: "com par no castanha-react (web)", st: stStatus(lvR), levels: lvR,
      segs: [["ch03", "Com par no React", rN, "Componentes do playground que já existem no castanha-react."], ["ch07", "Ainda sem par", N - rN, "Existem no Figma e no playground, mas ainda não no castanha-react."]],
      facts: [jx ? "Código gerado validado: " + fmt(jx.trechos) + " trechos, " + (jx.erros || []).length + ((jx.erros || []).length === 1 ? " erro" : " erros") : "",
        R.source ? "Leitura da staging de " + brDate(R.source.date) : ""],
      link: ["Abrir React", "#/relatorio/stack"], tip: "Componentes do playground que já existem no castanha-react. O código do painel \"No React\" é validado com o TypeScript da lib a cada leitura." });
    // Flutter: widget no castanha_flutter, Dart validado com o dart analyze e o check Figma × Flutter
    var F = CDS.flutter || { items: {} }, fN = comps.filter(function(c){ return F.items[c.id]; }).length, lvF = levels(docs["stack-flutter"]), dt = extra.dart;
    col({ key: "flutter", name: "Flutter", icon: "flutter-fill", n: fN, of: N, base: "componentes do playground", what: "com widget no castanha_flutter (app)", st: stStatus(lvF), levels: lvF,
      segs: [["ch03", "Com widget no Flutter", fN, "Componentes do playground que já existem no castanha_flutter."], ["ch07", "Ainda sem par", N - fN, "Existem no Figma e no playground, mas ainda não no castanha_flutter."]],
      facts: [dt ? "Código gerado validado: " + fmt(dt.snippets) + " trechos, " + dt.errors + (dt.errors === 1 ? " erro" : " erros") : "",
        F.source ? "Leitura da staging de " + brDate(F.source.date) : ""],
      link: ["Abrir Flutter", "#/relatorio/stack-flutter"], tip: "Componentes do playground que já existem no castanha_flutter. O código do painel \"No Flutter\" é validado com o dart analyze a cada leitura." });
    return p;
  }

  // ---------- Gráfico de área do Castanha Analytics (Figma 2675:8589), reutilizado por Equalização e Tendência ----------
  // Eixo com linhas de grade, áreas com degradê, linha tracejada e pontos no hover, Tooltip do DS com o valor de cada série,
  // data do hover em Tag Neutral, valor no fim de cada linha. Teclado: o gráfico recebe foco e as setas trocam o dia.
  // Cores Charts do design: is-s1 Charts/04 semi-soft · is-s2 Charts/03 medium · is-s3 Charts/05 semi-soft (ressalva de daltonismo: C198).
  var chartUid = 0;
  function todayISO(){ var n = new Date(); return n.getFullYear() + "-" + ("0" + (n.getMonth() + 1)).slice(-2) + "-" + ("0" + n.getDate()).slice(-2); }
  function periodDays(days, period){
    var lim = period === "7" ? 7 : period === "30" ? 30 : 0; if (!lim) return days;
    var t1 = Date.parse(days[days.length - 1].d), v = days.filter(function(d){ return Date.parse(d.d) >= t1 - (lim - 1) * 864e5; });
    return v.length < 2 ? days.slice(-2) : v;
  }
  // Select de período (Async Select Input do DS, como no Figma); as opções entram antes de conectar (o componente lê uma vez)
  function periodSelect(parent, onChange, opcoes){
    var sel = el("cds-async-select-input", "rp-adop__period");
    [["label", "Período"], ["show-required", "false"], ["show-supporting-content", "false"], ["show-lead-icon", "false"], ["placeholder", "Período"], ["value", "tudo"]].forEach(function(x){ sel.setAttribute(x[0], x[1]); });
    (opcoes || [["7", "Últimos 7 dias"], ["30", "Últimos 30 dias"], ["tudo", "Desde o início"]]).forEach(function(o){ var op = document.createElement("option"); op.value = o[0]; op.textContent = o[1]; sel.appendChild(op); });
    sel.addEventListener("cds-change", function(e){ e.stopPropagation(); onChange((e.detail && e.detail.value) || "tudo"); });
    parent.appendChild(sel);
    return sel;
  }
  // Legenda do design: linha e ponto na cor da série, nome embaixo
  function chartLegend(parent, series){
    var lg = parent.appendChild(el("ul", "rp-adop__legend"));
    series.forEach(function(s){ var li = lg.appendChild(el("li", s.cls)); li.appendChild(el("span", "rp-adop__key")).setAttribute("aria-hidden", "true"); li.appendChild(el("span", null, esc(s.name))); if (s.tip && CDS.kit) CDS.kit.lazyTip(li, s.tip, { label: s.name, focus: false }); });
    return lg;
  }
  // o = { series: [{ name, cls, get(d) }], max (fixo, ex. 100) · unit ("%" ou "") · ticks (5 ou 3) · compact · label (nome para leitor de tela)
  //       · xLabel(d) e tipLabel(d) (rótulo do eixo e do Tooltip, quando o ponto não é um dia, como nos meses do Suporte) }
  function areaChart(host, o){
    var chart = host.appendChild(el("div", "rp-adop" + (o.compact ? " is-compact" : "")));
    var yax = chart.appendChild(el("div", "rp-adop__y")); yax.setAttribute("aria-hidden", "true");
    var plot = chart.appendChild(el("div", "rp-adop__plot")); plot.tabIndex = 0; plot.setAttribute("role", "img");
    var xs = chart.appendChild(el("div", "rp-adop__x"));
    var NS = "http://www.w3.org/2000/svg", W = 1000, H = 300, uid = ++chartUid, tipEl = null;
    var val = function(d, s){ var v = s.get(d); return v == null || isNaN(v) ? null : v; };
    var show_ = function(v){ return fmt(v) + (o.unit || ""); };
    function nice(n){ if (n <= 0) return 1; var p = Math.pow(10, Math.floor(Math.log10(n))), m = n / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
    function curve(pts){ // curva suave sem passar do valor real entre dois dias
      var d = "M" + pts[0][0] + "," + pts[0][1];
      for (var i = 0; i < pts.length - 1; i++){ var a = pts[i], b = pts[i + 1], mx = (a[0] + b[0]) / 2; d += " C" + mx + "," + a[1] + " " + mx + "," + b[1] + " " + b[0] + "," + b[1]; }
      return d;
    }
    function draw(view){
      plot.innerHTML = ""; xs.innerHTML = ""; yax.innerHTML = ""; if (tipEl) tipEl.remove();
      var all = []; view.forEach(function(d){ o.series.forEach(function(s){ var v = val(d, s); if (v != null) all.push(v); }); });
      var ticks = o.ticks || 5, max = o.max || nice(Math.max.apply(null, all.concat([1])) * 1.1);
      for (var k = 0; k < ticks; k++) yax.appendChild(el("span", null, show_(Math.round(max - k * max / (ticks - 1)))));
      var t0 = Date.parse(view[0].d), span = (Date.parse(view[view.length - 1].d) - t0) || 1;
      var X = function(d){ return (Date.parse(d.d) - t0) / span * W; }, Y = function(v){ return H - Math.min(v, max) / max * H; };
      var area = plot.appendChild(el("div", "rp-adop__area")), ends = [];
      var svg = area.appendChild(document.createElementNS(NS, "svg")); svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "rp-adop__svg"); svg.setAttribute("aria-hidden", "true");
      var defs = svg.appendChild(document.createElementNS(NS, "defs"));
      for (k = 0; k < ticks; k++){ var g = svg.appendChild(document.createElementNS(NS, "line")); g.setAttribute("class", "rp-adop__grid"); g.setAttribute("x1", "0"); g.setAttribute("x2", String(W)); g.setAttribute("y1", String(k * H / (ticks - 1))); g.setAttribute("y2", String(k * H / (ticks - 1))); }
      o.series.forEach(function(s, si){
        var on = view.filter(function(d){ return val(d, s) != null; }); if (!on.length) return;
        var pts = on.map(function(d){ return [Math.round(X(d) * 10) / 10, Math.round(Y(val(d, s)) * 10) / 10]; });
        if (pts.length > 1){
          var gid = "rp-ch" + uid + "-" + si, lgr = defs.appendChild(document.createElementNS(NS, "linearGradient")); lgr.setAttribute("id", gid); lgr.setAttribute("x1", "0"); lgr.setAttribute("x2", "0"); lgr.setAttribute("y1", "0"); lgr.setAttribute("y2", "1");
          [[0, ".22"], [.45, ".1"], [.85, ".03"], [1, "0"]].forEach(function(st){ var e = lgr.appendChild(document.createElementNS(NS, "stop")); e.setAttribute("offset", String(st[0])); e.setAttribute("class", "rp-adop__stop " + s.cls); e.setAttribute("stop-opacity", st[1]); });
          var ar = svg.appendChild(document.createElementNS(NS, "path")); ar.setAttribute("d", curve(pts) + " L" + pts[pts.length - 1][0] + "," + H + " L" + pts[0][0] + "," + H + " Z"); ar.setAttribute("fill", "url(#" + gid + ")");
          var ln = svg.appendChild(document.createElementNS(NS, "path")); ln.setAttribute("d", curve(pts)); ln.setAttribute("class", "rp-adop__line " + s.cls);
        }
        var last = on[on.length - 1], end = plot.appendChild(el("span", "rp-adop__end " + s.cls, show_(val(last, s))));
        ends.push({ el: end, y: Y(val(last, s)) / H * 100 });
      });
      // valores do fim sem sobrepor: de cima para baixo, cada um pelo menos um rótulo abaixo do anterior
      var minGap = o.compact ? 16 : 9;
      ends.sort(function(a, b){ return a.y - b.y; }).forEach(function(e, i, a){ if (i && e.y < a[i - 1].y + minGap) e.y = a[i - 1].y + minGap; e.el.style.top = e.y + "%"; });
      var rule = area.appendChild(el("span", "rp-adop__rule")); rule.hidden = true;
      var dots = o.series.map(function(s){ var d = area.appendChild(el("span", "rp-adop__dot " + s.cls)); d.hidden = true; return d; });
      var anchor = area.appendChild(el("span", "rp-adop__anchor")); anchor.id = "rp-ch-anchor-" + uid;
      tipEl = el("cds-tooltip", "rp-adop__tip"); tipEl.setAttribute("for", anchor.id); tipEl.setAttribute("show-label", "true"); tipEl.setAttribute("placement", "bottom"); tipEl.setAttribute("label", " "); tipEl.setAttribute("text", " ");
      chart.appendChild(tipEl);
      // datas: do fim para o começo, só as que ficam a 56px da anterior (cabe no celular); o hover mostra qualquer uma
      var labs = [], wpx = area.getBoundingClientRect().width || W, lastX = Infinity, lx = view.map(function(d){ return X(d) / W * wpx; });
      view.forEach(function(d){ var lb = xs.appendChild(el("span", "rp-adop__xl")); lb.style.left = (X(d) / W * 100) + "%"; lb.textContent = o.xLabel ? o.xLabel(d) : d.live ? "Hoje" : brDate(d.d); labs.push(lb); });
      for (var li = view.length - 1; li >= 0; li--){ var px = X(view[li]) / W * wpx; if (li === view.length - 1 || lastX - px >= 56) lastX = px; else labs[li].classList.add("is-quiet"); }
      plot.setAttribute("aria-label", (o.label || "Gráfico") + ": " + view.map(function(d){ return (d.live ? "hoje" : brDate(d.d)) + ", " + o.series.map(function(s){ var v = val(d, s); return (o.series.length > 1 ? s.name + " " : "") + (v == null ? "sem leitura" : show_(v)); }).join(", "); }).join("; "));
      var cur = -1;
      function show(i){
        labs.forEach(function(l, j){ var t = l.querySelector("cds-tag"), on = j === i;
          if (on && !t){ var txt = l.textContent; l.textContent = ""; t = l.appendChild(el("cds-tag")); t.setAttribute("label", txt); t.setAttribute("appearance", "neutral"); t.setAttribute("show-lead-item", "false"); }
          else if (!on && t) l.textContent = t.getAttribute("label");
          l.classList.toggle("is-on", on); l.classList.toggle("is-near", i >= 0 && !on && Math.abs(lx[j] - lx[i]) < 56); });
        if (i < 0){ rule.hidden = true; dots.forEach(function(d){ d.hidden = true; }); tipEl.hidden = true; cur = -1; return; }
        cur = i; var d = view[i], x = X(d) / W * 100, topY = 100;
        rule.hidden = false; rule.style.left = x + "%";
        o.series.forEach(function(s, si){ var v = val(d, s); dots[si].hidden = v == null; if (v != null){ dots[si].style.left = x + "%"; dots[si].style.top = (Y(v) / H * 100) + "%"; topY = Math.min(topY, Y(v) / H * 100); } });
        anchor.style.left = x + "%"; anchor.style.top = topY + "%";
        tipEl.setAttribute("label", o.tipLabel ? o.tipLabel(d) : d.live ? "Hoje" : new Date(d.d + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" }));
        tipEl.setAttribute("text", o.series.map(function(s){ var v = val(d, s); return (o.series.length > 1 || o.name ? (s.name || o.name) + ": " : "") + (v == null ? "sem leitura" : show_(v) + (o.detail ? o.detail(d, s) : "")); }).join("\n"));
        tipEl.show();
      }
      plot.onpointermove = function(e){ var r = area.getBoundingClientRect(), t = t0 + (e.clientX - r.left) / r.width * span, best = 0;
        view.forEach(function(d, i){ if (Math.abs(Date.parse(d.d) - t) < Math.abs(Date.parse(view[best].d) - t)) best = i; }); if (best !== cur) show(best); };
      plot.onpointerleave = function(){ show(-1); };
      plot.onfocus = function(){ show(view.length - 1); }; plot.onblur = function(){ show(-1); };
      plot.onkeydown = function(e){ if (e.key === "ArrowLeft" || e.key === "ArrowRight"){ e.preventDefault(); show(Math.max(0, Math.min(view.length - 1, (cur < 0 ? view.length - 1 : cur) + (e.key === "ArrowLeft" ? -1 : 1)))); } else if (e.key === "Escape") show(-1); };
    }
    return { draw: draw };
  }

  // ---------- Tendência (docs/tendencia.json + o ponto de hoje calculado dos registros atuais) ----------
  // Um gráfico por indicador (escalas diferentes não dividem eixo), no estilo do Castanha Analytics, com um Select de período para todos.
  function trend(grid){
    var T = extra.trend; if (!T || !T.days || !T.days.length) return null;
    var days = T.days.slice(), today = todayISO();
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
      { t: "Documentações de componente", tip: "Docs de uso, anatomia, estilos e acessibilidade publicadas no portal.", s: [{ name: "Documentações", cls: "is-s2", get: function(d){ return d.docs; } }] },
      { t: "Decisões registradas", tip: "Decisões de produto e de implementação registradas na tab Decisões.", s: [{ name: "Decisões", cls: "is-s2", get: function(d){ return d.decisoes; } }] },
      { t: "Débitos no Conferir", tip: "Divergências, gaps e propostas do Conferir: os que ainda esperam ação e os já resolvidos (no Figma ou no código).", s: [
        { name: "Em aberto", cls: "is-s2", get: function(d){ return d.abertos; } },
        { name: "Resolvidos", cls: "is-s3", get: function(d){ return d.resolvidos; } }] },
      { t: "Divergências Figma × React", tip: "Itens de nível alto e médio no check Figma × castanha-react.", s: [{ name: "Divergências", cls: "is-s2", get: sum("react") }] },
      { t: "Divergências Figma × Flutter", tip: "Itens de nível alto e médio no check Figma × castanha_flutter.", s: [{ name: "Divergências", cls: "is-s2", get: sum("flutter") }] }
    ];
    var p = panel(grid, "Tendência", "Como os registros evoluíram dia a dia, de " + brDate(days[0].d) + " até hoje", "rp-panel--wide");
    var charts = [], period = "tudo";
    var top = p.appendChild(el("div", "rp-adop__top")); periodSelect(top, function(v){ period = v; redraw(); });
    var wrap = p.appendChild(el("div", "rp-trends"));
    var signed = function(n){ return (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n)); };
    M.forEach(function(m){
      var c = wrap.appendChild(el("section", "rp-trend")); c.setAttribute("aria-label", m.t);
      c.appendChild(el("h3", "rp-trend__title", esc(m.t)));
      if (CDS.kit) CDS.kit.lazyTip(c.querySelector(".rp-trend__title"), m.tip, { focus: false });
      var head = c.appendChild(el("div", "rp-trend__head"));
      if (m.s.length > 1) chartLegend(c, m.s);
      var ch = areaChart(c, { series: m.s, ticks: 3, compact: true, label: m.t });
      charts.push({ m: m, head: head, ch: ch, card: c });
    });
    function redraw(){
      var view = periodDays(days, period);
      charts.forEach(function(x){
        var rows = view.filter(function(d){ return x.m.s.every(function(s){ return s.get(d) != null; }); });
        x.head.innerHTML = ""; var empty = x.card.querySelector(".rp-trend__empty"); if (empty) empty.remove();
        var chartEl = x.card.querySelector(".rp-adop"); chartEl.hidden = rows.length < 2;
        if (!rows.length) return;
        var d0 = rows[0], dl = rows[rows.length - 1];
        if (x.m.s.length === 1){ var g = x.m.s[0].get; x.head.appendChild(el("p", "rp-trend__value", "<strong>" + fmt(g(dl)) + "</strong> <span>" + (rows.length < 2 ? "primeira leitura hoje" : signed(g(dl) - g(d0)) + " desde " + brDate(d0.d)) + "</span>")); }
        else x.head.appendChild(el("p", "rp-trend__value", x.m.s.map(function(s){ return "<strong>" + fmt(s.get(dl)) + "</strong> <span>" + esc(s.name.toLowerCase()) + (rows.length > 1 ? " (" + signed(s.get(dl) - s.get(d0)) + ")" : "") + "</span>"; }).join(" · ")));
        if (rows.length < 2){ x.card.appendChild(el("p", "rp-trend__empty", "A linha aparece a partir da próxima leitura diária.")); return; }
        x.ch.draw(rows);
      });
    }
    redraw();
    p.appendChild(el("p", "rp-panel__foot", "Um ponto por dia, com o último registro de cada dia na linha principal do repositório (<code>scripts/dev/tendencia.js</code>). O ponto de hoje é calculado dos registros atuais. Passe o mouse ou use as setas para ver cada dia."));
    return p;
  }

  // ---------- Suporte: chamados do #castanha-suporte (docs/chamados.json, gerado por scripts/dev/chamados.js) ----------
  // Pedido do Gustavo (15/10): acompanhar os chamados no estilo da Tendência, por tipo. Comparações escolhidas para o DS:
  // o volume por mês, Design × Dev (Figma ou padrão contra código: Dev bem acima mostra a lib em código atrás do Figma),
  // Ilustração × Motion (os dois times de marca), a divisão por tipo, os componentes mais citados e o que está em aberto.
  var CH_TIPOS = [["design", "Design", "ch03", "Figma, padrões, componentes novos e dúvidas de uso."],
    ["dev", "Dev", "ch01", "Código: bugs, props, pacotes e o que falta na lib em código."],
    ["ilustra", "Ilustração", "ch04", "Ilustrações e ícones novos."], ["motion", "Motion", "ch05", "Animações, motion e vídeo."],
    ["conteudo", "Conteúdo", "ch07", "Textos e templates."], ["outros", "Outros", "ch06", "Acessos, pastas e equipes no Figma, ferramentas."]];
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  function mesCurto(iso){ return MESES[+iso.slice(5, 7) - 1] + "/" + iso.slice(2, 4); }
  // Período dos painéis de chamados (Gustavo, 15/10): 3 meses (padrão), 6 meses, último ano, desde o início ou um período
  // escolhido em dois Date Input do DS. onChange recebe { de, ate } em AAAA-MM-DD.
  var PERIODOS = [["3", "Últimos 3 meses"], ["6", "Últimos 6 meses"], ["12", "Último ano"], ["tudo", "Desde o início"], ["sel", "Selecionar período"]];
  function periodoChamados(parent, inicio, onChange){
    var hoje = todayISO(), de = null, ate = null;
    var faixa = function(v){
      if (v === "tudo") return { de: inicio, ate: hoje };
      if (v === "sel") return { de: de || inicio, ate: ate || hoje };
      var d = new Date(hoje + "T12:00"); d.setDate(1); d.setMonth(d.getMonth() - (+v - 1));
      return { de: d.toISOString().slice(0, 10), ate: hoje };
    };
    var sel = periodSelect(parent, function(v){ atual = v; datas.hidden = v !== "sel"; onChange(faixa(v)); }, PERIODOS), atual = "3";
    sel.setAttribute("value", "3");
    var datas = parent.appendChild(el("div", "rp-ch__datas")); datas.hidden = true;
    [["De", function(v){ de = v; }], ["Até", function(v){ ate = v; }]].forEach(function(x){
      var di = datas.appendChild(el("cds-date-input"));
      [["label", x[0]], ["show-required", "false"], ["show-supporting-content", "false"], ["min", inicio.split("-").reverse().join("/")], ["max", hoje.split("-").reverse().join("/")]].forEach(function(a){ di.setAttribute(a[0], a[1]); });
      di.addEventListener("cds-change", function(e){ e.stopPropagation(); var iso = (e.detail && e.detail.date) || di.date; if (!iso) return; x[1](iso); if (atual === "sel") onChange(faixa("sel")); });
    });
    return faixa("3");
  }
  function suporte(grid, naAba){
    var J = extra.chamados; if (!J || !J.chamados || !J.chamados.length) return [];
    var all = J.chamados, mesHoje = todayISO().slice(0, 7), nomes = {};
    (CDS.playgrounds || []).forEach(function(c){ nomes[c.id] = c.name; });
    // um ponto por mês, do primeiro chamado até o mês atual (que conta até hoje)
    var meses = [], m0 = all[0].d.slice(0, 7);
    for (var y = +m0.slice(0, 4), mo = +m0.slice(5, 7); (y + "-" + ("0" + mo).slice(-2)) <= mesHoje; mo === 12 ? (y++, mo = 1) : mo++){
      var key = y + "-" + ("0" + mo).slice(-2), row = { d: key + "-01", total: 0, live: key === mesHoje };
      CH_TIPOS.forEach(function(t){ row[t[0]] = 0; });
      meses.push(row);
    }
    var idx = {}; meses.forEach(function(r, i){ idx[r.d.slice(0, 7)] = i; });
    all.forEach(function(c){ var r = meses[idx[c.d.slice(0, 7)]]; if (r){ r.total++; r[c.tipo]++; } });
    var p = panel(grid, "Chamados no #castanha-suporte", "Pedidos ao time do DS pelo fluxo de suporte do Slack, por tipo, de " + mesCurto(all[0].d) + " até hoje", "rp-panel--wide");
    var top = p.appendChild(el("div", "rp-adop__top"));
    var faixa = periodoChamados(top, all[0].d, function(f){ faixa = f; redraw(); });
    var dist = p.appendChild(el("div", "rp-ch__dist"));
    var wrap = p.appendChild(el("div", "rp-trends"));
    var M = [
      { t: "Chamados por mês", tip: "Todos os chamados abertos no mês, de qualquer tipo. O mês atual conta até hoje.", s: [{ name: "Chamados", cls: "is-s2", get: function(r){ return r.total; } }] },
      { t: "Design × Dev", tip: "Design pede mudança no Figma ou no padrão; Dev pede mudança no código. Dev bem acima de Design mostra a lib em código atrás do Figma.", s: [
        { name: "Design", cls: "is-ch03", get: function(r){ return r.design; } }, { name: "Dev", cls: "is-ch01", get: function(r){ return r.dev; } }] },
      { t: "Ilustração × Motion", tip: "Pedidos de ilustrações e ícones novos e de animações, os dois times de marca.", s: [
        { name: "Ilustração", cls: "is-ch04", get: function(r){ return r.ilustra; } }, { name: "Motion", cls: "is-ch05", get: function(r){ return r.motion; } }] }
    ];
    var mesLongo = function(r){ return new Date(r.d + "T12:00").toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) + (r.live ? " (até hoje)" : ""); };
    var charts = M.map(function(m){
      var c = wrap.appendChild(el("section", "rp-trend")); c.setAttribute("aria-label", m.t);
      c.appendChild(el("h3", "rp-trend__title", esc(m.t)));
      if (CDS.kit) CDS.kit.lazyTip(c.querySelector(".rp-trend__title"), m.tip, { focus: false });
      var head = c.appendChild(el("div", "rp-trend__head"));
      if (m.s.length > 1) chartLegend(c, m.s);
      return { m: m, head: head, ch: areaChart(c, { series: m.s, ticks: 3, compact: true, label: m.t, xLabel: function(r){ return mesCurto(r.d); }, tipLabel: mesLongo }) };
    });
    function redraw(){
      var m0 = faixa.de.slice(0, 7), m1 = faixa.ate.slice(0, 7);
      var view = meses.filter(function(r){ var k = r.d.slice(0, 7); return k >= m0 && k <= m1; });
      if (view.length < 2){ var i0 = meses.indexOf(view[0] || meses[meses.length - 1]); view = meses.slice(Math.max(0, i0 - 1), Math.max(2, i0 + 1)); } // a linha pede dois meses
      var noPeriodo = all.filter(function(c){ return c.d >= faixa.de && c.d <= faixa.ate; }), tot = noPeriodo.length;
      dist.innerHTML = "";
      stackCols(dist, CH_TIPOS.map(function(t){ return { cls: t[2], label: t[1], desc: t[3], n: noPeriodo.filter(function(c){ return c.tipo === t[0]; }).length }; }), tot);
      grow(dist);
      charts.forEach(function(x){
        x.head.innerHTML = "";
        var soma = function(s){ return view.reduce(function(a, r){ return a + s.get(r); }, 0); };
        if (x.m.s.length === 1){
          var last = view[view.length - 1], media = Math.round(soma(x.m.s[0]) / view.length * 10) / 10;
          x.head.appendChild(el("p", "rp-trend__value", "<strong>" + fmt(x.m.s[0].get(last)) + "</strong> <span>em " + mesCurto(last.d) + (last.live ? " até hoje" : "") + " · média de " + fmt(media) + " por mês</span>"));
        } else x.head.appendChild(el("p", "rp-trend__value", x.m.s.map(function(s){ return "<strong>" + fmt(soma(s)) + "</strong> <span>" + esc(s.name.toLowerCase()) + "</span>"; }).join(" · ") + " <span>no período</span>"));
        x.ch.draw(view);
      });
    }
    redraw();
    p.appendChild(el("p", "rp-panel__foot", "Um ponto por mês. Fonte: a Lista do Slack do fluxo de suporte, lida em " + brDate(J.lido) + " e classificada por tipo em <code>scripts/dev/chamados.js</code>. O arquivo guarda só data, tipo, prioridade, status e componentes citados."));
    // Componentes mais citados nos títulos dos chamados de Design e Dev (o que mais gera dúvida ou ajuste)
    var cont = {}; all.forEach(function(c){ (c.comp || []).forEach(function(id){ cont[id] = (cont[id] || 0) + 1; }); });
    var ranking = Object.keys(cont).filter(function(id){ return nomes[id] && nomes[id].charAt(0) !== "."; }) /* sem building blocks */.sort(function(a, b){ return cont[b] - cont[a] || nomes[a].localeCompare(nomes[b], "pt-BR"); }).slice(0, 8);
    var pc = panel(grid, "Componentes mais citados", "Nos títulos dos chamados de Design e Dev, desde " + mesCurto(all[0].d));
    bars(pc, ranking.map(function(id){ return { label: nomes[id], value: cont[id], href: "#/" + id }; }), { tone: "components" });
    // Status (pedido do Gustavo, 15/10): como a Lista do Slack está agora, desde o início (sem o filtro de período).
    // Barra empilhada com Resolvido, Em andamento e Priorizado e, embaixo, o que está em aberto por tipo.
    var ST = [["resolvido", "Resolvido", "ch04", "Atendido e fechado na Lista do Slack."], ["andamento", "Em andamento", "ch05", "Alguém do time já está atendendo."],
      ["priorizado", "Priorizado", "ch01", "Aceito, esperando a vez na fila."]];
    var abertos = all.filter(function(c){ return c.status !== "resolvido"; });
    var pa = panel(grid, "Status dos chamados", abertos.length ? abertos.length + " em aberto de " + fmt(all.length) + " desde " + mesCurto(all[0].d) : "Todos os chamados resolvidos");
    stackCols(pa, ST.map(function(t){ return { cls: t[2], label: t[1], desc: t[3], n: all.filter(function(c){ return c.status === t[0]; }).length }; }), all.length);
    if (abertos.length){
      pa.appendChild(el("h3", "rp-ch__sub", "Em aberto por tipo"));
      bars(pa, CH_TIPOS.map(function(t){ var ab = abertos.filter(function(c){ return c.tipo === t[0]; }), and = ab.filter(function(c){ return c.status === "andamento"; }).length;
        return { label: t[1], value: ab.length, desc: and + " em andamento e " + (ab.length - and) + " priorizados." }; }).filter(function(x){ return x.value; }), { total: abertos.length });
    }
    if (abertos.length && !naAba) pa.appendChild(dsLink("rp-more", "Ver chamados em aberto", "#/relatorio/chamados"));
    return [p, pc, pa];
  }

  // ---------- Equalização (antes "Adoção ao longo do tempo"; Gustavo, 09/10) ----------
  // % dos componentes do playground em cada stack, dia a dia, com eixo fixo 0–100%.
  function equalizacao(grid){
    var T = extra.trend; if (!T || !T.days || !T.days.length) return null;
    var comps = compsOnly(), C = {}; comps.forEach(function(c){ C[c.id] = 1; });
    var days = T.days.filter(function(d){ return d.cob; }).map(function(d){ return { d: d.d, cob: d.cob }; }), today = todayISO();
    // hoje, calculado ao vivo com a mesma conta do scripts/dev/tendencia.js
    if (!days.length || days[days.length - 1].d < today){
      var R = (CDS.react || { items: {} }).items, F = (CDS.flutter || { items: {} }).items, FS = (CDS.figmaStatus || { items: {} }).items;
      var base = comps.filter(function(c){ return R[c.id]; }), fsIds = Object.keys(FS).filter(function(id){ return C[id]; });
      days.push({ d: today, live: true, cob: {
        react: [base.filter(function(c){ return R[c.id].status === "react"; }).length, base.length],
        flutter: [base.filter(function(c){ return F[c.id]; }).length, base.length],
        figma: [fsIds.filter(function(id){ return FS[id] === "current"; }).length, fsIds.length] } });
    }
    var pct = function(k){ return function(d){ var v = d.cob[k]; return v && v[1] ? Math.round(v[0] / v[1] * 1000) / 10 : null; }; };
    var S = [{ name: "Figma", cls: "is-s1", tip: "Publicados na lib sem pendência.", get: pct("figma"), k: "figma" },
      { name: "React", cls: "is-s2", tip: "Com par no castanha-react.", get: pct("react"), k: "react" },
      { name: "Flutter", cls: "is-s3", tip: "Com widget no castanha_flutter.", get: pct("flutter"), k: "flutter" }];
    var p = panel(grid, "Equalização", "Quanto dos componentes do playground já está em cada stack, dia a dia", "rp-panel--wide");
    var top = p.appendChild(el("div", "rp-adop__top")), period = "tudo";
    var ch;
    periodSelect(top, function(v){ period = v; ch.draw(periodDays(days, period)); });
    chartLegend(top, S);
    ch = areaChart(p, { series: S, max: 100, unit: "%", label: "Equalização por stack",
      detail: function(d, s){ var v = d.cob[s.k]; return v ? " (" + v[0] + " de " + v[1] + ")" : ""; } });
    ch.draw(periodDays(days, period));
    p.appendChild(el("p", "rp-panel__foot", "Base: os componentes do playground (sem building blocks, composições e templates) que já existiam em cada dia. Figma = publicados na lib sem pendência; React e Flutter = com par na lib de código. Passe o mouse ou use as setas para ver cada dia."));
    return p;
  }

  function overview(){
    var road = docs.roadmap, conf = docs.conferir;
    var grid = bodyEl.appendChild(el("div", "rp-dash"));

    // Débitos e melhorias (Castanha Analytics): Big numbers do quanto já foi resolvido + lista percentual por tipo de ajuste,
    // com a barra de cada tipo dividida em como o código tratou (cores Charts, mesma legenda de Adaptações)
    var open = conf.sections.filter(function(s){ return TYPES.indexOf(s.title) !== -1; });
    var total = open.reduce(function(a, s){ return a + items(s.lines).length; }, 0);
    var solvedN = items(sec(conf, function(s){ return s.title === "Resolvidos"; }).lines).length;
    var p2 = panel(grid, "Débitos e melhorias mapeados", total + " em aberto e " + solvedN + " resolvidos · por tipo de ajuste e como o código tratou", "rp-panel--wide");
    var solvedPct = Math.round(solvedN / ((total + solvedN) || 1) * 100);
    bigNumber(p2, fmt(solvedPct) + "%", null, solvedPct, solvedN + " de " + (total + solvedN) + " itens registrados no Conferir já foram resolvidos");
    var KIND = function(r){ var code = r[4] || "", act = r[5] || ""; return /débito|erro no figma/i.test(act) ? "deb" : /exceção/i.test(code) ? "exc" : "seg"; };
    var TREAT = [["seg", "Segue o Figma", "ch03", "O código faz o que o Figma faz hoje, mesmo quando parece errado. A divergência fica registrada para corrigir no Figma."],
      ["exc", "Exceção aprovada", "ch01", "O código difere do Figma por decisão do Gustavo, falta de especificação ou adaptação para web aprovada."],
      ["deb", "Débito ou erro no Figma", "ch05", "Problema confirmado no Figma, a corrigir lá. O código acompanha quando a correção entrar."]];
    var types = open.map(function(s){
      var rs = rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }), k = { seg: 0, exc: 0, deb: 0 };
      rs.forEach(function(r){ k[KIND(r)]++; });
      var desc = (s.lines.filter(function(l){ return l.trim() && !/^\|/.test(l); })[0] || "").replace(/\*\*|`/g, "").trim();
      return { label: s.title, n: items(s.lines).length, k: k, href: "#/relatorio/conferir/" + slug(s.title), desc: desc };
    }).sort(function(a, b){ return b.n - a.n; });
    var maxT = Math.max.apply(null, types.map(function(t){ return t.n; }).concat([1]));
    chipLegend(p2, TREAT.map(function(x){ return { cls: x[2], label: x[1], tip: x[3] }; }));
    pctList(p2, types.map(function(t){
      var SHORT = { seg: ["segue o Figma", "seguem o Figma"], exc: ["exceção aprovada", "exceções aprovadas"], deb: ["débito ou erro no Figma", "débitos ou erros no Figma"] };
      var parts = TREAT.filter(function(x){ return t.k[x[0]]; }).map(function(x){ return t.k[x[0]] + " " + SHORT[x[0]][t.k[x[0]] === 1 ? 0 : 1]; }).join(" · ");
      return { label: t.label, desc: parts, value: fmt(t.n), href: t.href, segs: TREAT.map(function(x){ return [x[2], t.k[x[0]]]; }), of: maxT,
        tip: t.n + " em aberto: " + parts + "." + (t.desc ? " " + t.desc : "") };
    }));

    // Adaptações para código (Castanha Analytics, "Castanha nos projetos"): barra empilhada + legenda em colunas com o %
    var all = [].concat.apply([], open.map(function(s){ return rows(s.lines).filter(function(r){ return /^(~~)?C\d+/.test(r[0]); }); }));
    var kinds = { exc: 0, deb: 0, seg: 0 }; all.forEach(function(r){ kinds[KIND(r)]++; });
    var p3 = panel(grid, "Adaptações para código", "Regra D40: o código segue o Figma, e o que muda é exceção aprovada ou débito registrado · " + all.length + " itens");
    stackCols(p3, TREAT.map(function(x){ return { cls: x[2], label: x[1], desc: x[3].replace(/\..*$/, "."), n: kinds[x[0]] }; }), all.length);

    // Componentes por página do Figma: linhas com a Progress Line do DS (como antes; Gustavo, 09/10: "precisa ser o componente do Figma como era antes")
    // mesma base do KPI Componentes no playground: sem building blocks, composições e templates (R0/B4 do onboarding)
    var pg = (CDS.playgrounds || []).filter(function(c){ return !c.resource && !c.block && !c.composition && !c.template; }), cats = {};
    pg.forEach(function(c){ var k = c.category || "Sem página"; cats[k] = (cats[k] || 0) + 1; });
    var p4 = panel(grid, "Componentes por página do Figma", pg.length + " componentes em " + Object.keys(cats).length + " páginas");
    var first = {}; pg.forEach(function(c){ var k = c.category || "Sem página"; if (!first[k]) first[k] = c.id; });
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
    // 4º item = cor Charts do Castanha Analytics (D318), a mesma da coluna Figma do painel das stacks
    var PUBS = [["current", "Publicado no Figma", "Publicado na lib sem alterações pendentes.", "ch03"],
      ["changed", "Publicado com alterações pendentes", "Publicado, mas o arquivo tem alterações que ainda não foram publicadas.", "ch04"],
      ["unpublished-comp", "Não publicado", "Componente que ainda não está publicado na lib.", "ch05"],
      ["branch", "Não publicado · em branch", "Existe numa branch do Figma e ainda não está na main.", "ch01"],
      ["branch-update", "Melhoria em branch", "A main está publicada, mas a página documenta uma melhoria que ainda está numa branch.", "ch01"],
      ["unpublished-block", "Não publicado · building block", "Building blocks (nome com ponto) ficam fora da publicação de propósito.", "ch07"]];
    var blocks = {}; (CDS.playgrounds || []).forEach(function(c){ if (c.block) blocks[c.name] = true; });
    var un = pubN.unpublished || []; pubN["unpublished-comp"] = un.filter(function(n){ return !blocks[n]; }); pubN["unpublished-block"] = un.filter(function(n){ return blocks[n]; });
    var pubTotal = Object.keys(FS.items).length;
    var p5 = panel(grid, "Publicação na lib do Figma", pubTotal ? (pubN.current || []).length + " de " + pubTotal + " em dia com a lib" + (FS.checked ? " · última mudança no Figma em " + FS.checked : "") : "Sem leitura do Figma: rode a conferência da lib (scripts/figma-status.js)", "rp-panel--wide");
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
    var p0 = panel(grid, "Sinais vitais", "Último build do portal: smoke dos componentes, das docs e peso da primeira visita · detalhes na tab Qualidade", "rp-panel--wide");
    var vit = p0.appendChild(el("div", "rp-vitals"));
    var NAMES = [[/smoke dos componentes/i, "Componentes", "view-module-line"], [/smoke das docs/i, "Docs", "document-line"], [/peso/i, "Peso da 1ª visita", "download-line"]];
    rows(sec(docs.saude, function(s){ return s.title === "Resumo"; }).lines).forEach(function(r){
      var nm = NAMES.filter(function(x){ return x[0].test(r[0]); })[0], res = plain(r[1] || "");
      var st = /❌/.test(res) ? ["negative", "Falhou"] : /⚠️/.test(res) ? ["warning", "Com avisos"] : noData(res) ? ["informative", "Sem dado"] : ["positive", "Em dia"];
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

    var p8 = stacks(grid), p10 = equalizacao(grid), p9 = trend(grid), ps = suporte(grid);
    // Duas seções (Gustavo, 09/10): Progresso (como o DS avança nas stacks, para quem acompanha de fora) e Detalhes (o que pede ação
    // e o que explica as decisões, para quem trabalha no DS). Nomes comuns, sem citar público.
    // Suporte logo acima da Equalização (Gustavo, 15/10): os chamados do #castanha-suporte entram no Progresso
    var groups = [["Progresso", "Cobertura no Figma, no React e no Flutter, chamados do #castanha-suporte, publicação na lib e evolução dia a dia", [p8].concat(ps).concat([p10, p5, p9])],
      ["Detalhes", "Débitos, regras de adaptação, componentes e o build do portal", [p2, p4, p3].concat(typeof p7 !== "undefined" ? [p7] : []).concat([p0])]], k = 0;
    groups.forEach(function(g){
      var h = grid.appendChild(el("div", "rp-dash__group"));
      h.appendChild(el("h2", "rp-dash__group-title", esc(g[0])));
      h.appendChild(el("p", "rp-dash__group-sub", esc(g[1])));
      g[2].filter(Boolean).forEach(function(p){ var c = p.closest("cds-card"); c.style.setProperty("--_i", String(k++)); grid.appendChild(c); });
    });
    grow(grid);
    // Últimas decisões fica oculto na Visão geral (Gustavo, 15/10): as decisões continuam na tab Decisões
    p6.closest("cds-card").remove();
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
    kpiEl = root.appendChild(el("div", "rp-kpis")); kpiEl.setAttribute("data-onb", "rel-kpis"); // âncoras do tour do Relatório (R2)
    // Scrollable Tab do DS (teclado e foco itinerante vêm do componente)
    var wrap = root.appendChild(el("div", "pg-tabs rp-tabs"));
    tabsEl = document.createElement("cds-scrollable-tab");
    tabsEl.setAttribute("label", "Registros");
    TABS.forEach(function(tab){
      var it = document.createElement("cds-tab-item");
      it.setAttribute("label", tab.title); it.id = "rp-tab-" + tab.id; it.dataset.tab = tab.id; it.setAttribute("data-onb", "rel-tab-" + tab.id);
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
    bodyEl.classList.toggle("is-dash", !tab.file && id !== "glossario");
    searchEl.hidden = !tab.file && id !== "glossario";
    if (id === "glossario"){ glossaryTab(); return; }
    if (id === "chamados"){ chamadosTab(); return; }
    if (!tab.file){ overview(); markTerms(bodyEl); return; }
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
      if (CDS.perfil !== "dashboard") toc.appendChild(dsLink("rp-src", "Componentes locais", "#/locais")); // o Dashboard não abre o portal
      // Embaixo: a proposta zeroheight → portal (docs/pitch, página própria em tela cheia; Gustavo, 06/10)
      toc.appendChild(dsLink("rp-src", "Proposta: zeroheight → portal", "docs/pitch/"));
      // E o roteiro de 20 paradas para quem chega (docs/roteiro, página escondida; Gustavo, 06/10). Volta como página própria,
      // com as ilustrações e as animações, ao lado da trilha Explorar dos Primeiros passos (Gustavo, 09/10)
      if (CDS.perfil !== "dashboard") toc.appendChild(dsLink("rp-src", "Roteiro: 20 coisas para explorar", "docs/roteiro/"));
      // Admin (D350): Links de entrega, Links de página e Senhas temporárias ficam em /admin/, que pede a senha de admin.
      // Aparece só para o Completo de senha fixa (quem entrou por senha temporária não vira admin)
      if (CDS.perfil === "completo" && !CDS.senhaTemporaria) toc.appendChild(dsLink("rp-src", "Admin", "admin/"));
    }
    markTerms(bodyEl);
    filter();
  }

  // ---------- Glossário (R1): tab própria e a primeira ocorrência de cada termo numa tab ----------
  function gloss(){ return CDS.reportGlossary || []; }
  // Mesmo molde das tabs de registro (Gustavo, 15/10): índice das letras à esquerda, um Card do DS por letra com a
  // contagem em Tag e a busca do topo do Relatório (antes a tab inteira caía na coluna do índice, com o resto da tela vazio)
  // ---------- Tempo de solução (topo da aba Chamados; Gustavo, 15/10) ----------
  // A Lista do Slack não guarda quando o chamado foi resolvido: scripts/dev/chamados.js grava "resolvido" na leitura em que o
  // chamado aparece resolvido pela primeira vez, a partir de J.medido. Big numbers como os do topo do Relatório.
  function solucao(grid, J){
    var all = J.chamados, hoje = Date.parse(todayISO() + "T12:00"), dia = function(iso){ return Date.parse(iso + "T12:00"); };
    var p = panel(grid, "Tempo de solução", "Do pedido no #castanha-suporte até o chamado aparecer resolvido na Lista do Slack", "rp-panel--wide");
    var top = p.appendChild(el("div", "rp-adop__top"));
    var faixa = periodoChamados(top, all[0].d, function(f){ faixa = f; desenhar(); });
    var row = p.appendChild(el("div", "rp-kpis rp-ch__kpis"));
    var abertos = all.filter(function(c){ return c.status !== "resolvido"; }), idade = function(c){ return Math.round((hoje - dia(c.d)) / 864e5); };
    var kpi = function(icon, app, label, value, sub){
      var c = row.appendChild(card("rp-kpi rp-kpi--" + app)), h = c.appendChild(el("div", "rp-kpi__head"));
      var ic = h.appendChild(el("cds-shaped-icon")); ic.setAttribute("icon", icon); ic.setAttribute("appearance", app); ic.setAttribute("size", "smallest");
      h.appendChild(el("p", "rp-kpi__label", esc(label)));
      c.appendChild(el("p", "rp-kpi__value", esc(value))); c.appendChild(el("p", "rp-kpi__sub", esc(sub)));
    };
    var dias = function(n){ return fmt(n) + (n === 1 ? " dia" : " dias"); };
    function desenhar(){
      row.innerHTML = "";
      var medidos = all.filter(function(c){ return c.resolvido && c.resolvido >= faixa.de && c.resolvido <= faixa.ate; });
      var media = medidos.length ? Math.round(medidos.reduce(function(a, c){ return a + Math.max(0, (dia(c.resolvido) - dia(c.d)) / 864e5); }, 0) / medidos.length * 10) / 10 : null;
      kpi("timer-line", "accent", "Tempo médio de solução", media == null ? "—" : dias(media),
        media == null ? "Medido desde " + brDate(J.medido) + ": nenhum chamado resolvido no período ainda" : medidos.length + (medidos.length === 1 ? " chamado resolvido" : " chamados resolvidos") + " no período");
      var mi = abertos.length ? Math.round(abertos.reduce(function(a, c){ return a + idade(c); }, 0) / abertos.length) : 0;
      kpi("calendar-timer-line", "warning", "Idade média em aberto", abertos.length ? dias(mi) : "—", abertos.length + (abertos.length === 1 ? " chamado em aberto hoje" : " chamados em aberto hoje"));
      var velho = abertos.slice().sort(function(a, b){ return a.d < b.d ? -1 : 1; })[0];
      kpi("warning-line", "negative", "Mais antigo em aberto", velho ? dias(idade(velho)) : "—", velho ? (velho.titulo || "Chamado") + " · desde " + brDate(velho.d) : "Nenhum chamado em aberto");
    }
    desenhar();
  }

  // ---------- Chamados: os em aberto do #castanha-suporte, do mais antigo ao mais novo (Gustavo, 15/10) ----------
  // Content List (Intent=Navigation) com o título, há quanto tempo está aberto e o status na description, o tipo na Tag e o
  // link do item na Lista do Slack. Filter Chips por tipo: nenhum marcado mostra todos.
  function chamadosTab(){
    var J = extra.chamados, hoje = Date.parse(todayISO() + "T12:00");
    var abertos = J && J.chamados ? J.chamados.filter(function(c){ return c.status !== "resolvido"; }).sort(function(a, b){ return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; }) : [];
    // no topo o tempo de solução, depois os mesmos painéis do Suporte da Visão geral (redundância pedida pelo Gustavo, 15/10)
    // e, por último, a lista dos em aberto
    var grid = bodyEl.appendChild(el("div", "rp-dash"));
    if (J && J.chamados && J.chamados.length) solucao(grid, J);
    suporte(grid, true);
    var p = panel(grid, "Chamados em aberto", abertos.length ? abertos.length + " no #castanha-suporte, do mais antigo ao mais novo" + (J.lido ? " · Lista lida em " + brDate(J.lido) : "") : "Nenhum chamado em aberto na Lista do Slack", "rp-panel--wide");
    var mais = function(){ [].forEach.call(grid.children, function(c, i){ c.style.setProperty("--_i", String(i)); }); grow(grid); };
    if (!abertos.length){ mais(); return; }
    var nome = {}; CH_TIPOS.forEach(function(t){ nome[t[0]] = t[1]; });
    var dias = function(c){ return Math.max(0, Math.round((hoje - Date.parse(c.d + "T12:00")) / 864e5)); };
    var tempo = function(n){ return n === 0 ? "Aberto hoje" : "Aberto há " + n + (n === 1 ? " dia" : " dias"); };
    var marcados = {};
    var chips = p.appendChild(el("cds-chips-group", "rp-ch-tab__chips"));
    chips.setAttribute("kind", "filter"); chips.setAttribute("role-kind", "multiple"); chips.setAttribute("label", "Filtrar por tipo");
    CH_TIPOS.forEach(function(t){
      var n = abertos.filter(function(c){ return c.tipo === t[0]; }).length; if (!n) return;
      var fc = chips.appendChild(el("cds-filter-chip")); fc.setAttribute("label", t[1] + " · " + n); fc.setAttribute("show-lead-icon", "false");
      fc.addEventListener("cds-change", function(e){ e.stopPropagation(); marcados[t[0]] = !!(e.detail && e.detail.selected); desenhar(); });
    });
    var lista = p.appendChild(el("cds-content-list", "rp-ch-tab__list"));
    lista.setAttribute("intent", "navigation"); lista.setAttribute("label", "Chamados em aberto");
    function desenhar(){
      var algum = Object.keys(marcados).some(function(k){ return marcados[k]; });
      lista.innerHTML = "";
      abertos.filter(function(c){ return !algum || marcados[c.tipo]; }).forEach(function(c){
        var n = dias(c), it = lista.appendChild(el("cds-content-list-item"));
        it.setAttribute("intent", "navigation"); it.setAttribute("show-lead-item", "false");
        it.setAttribute("label", c.titulo || "Chamado sem título");
        it.setAttribute("description", tempo(n) + " · " + (c.status === "andamento" ? "Em andamento" : "Priorizado") + " · desde " + brDate(c.d));
        it.setAttribute("tag-label", nome[c.tipo] || c.tipo);
        it.setAttribute("tag-appearance", n > 30 ? "warning" : "neutral"); // mais de 30 dias em aberto: Tag em Warning
        if (c.link) it.setAttribute("href", c.link);
      });
      // Tag do item sem o Lead Item (o placeholder-line padrão não diz nada aqui; Show Lead Item é booleano da própria Tag)
      // (os itens desenham a linha depois de entrar na página: aplica na volta seguinte do navegador)
      setTimeout(function(){ [].forEach.call(lista.querySelectorAll(".cds-li__tag"), function(t){ t.setAttribute("show-lead-item", "false"); }); }, 0);
    }
    // o item da Lista abre no Slack, em outra aba (o item redesenha a linha, então o target não fica no <a>)
    lista.addEventListener("click", function(e){
      var a = e.target.closest && e.target.closest("a.cds-li"); if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault(); window.open(a.href, "_blank", "noopener");
    });
    desenhar();
    p.appendChild(el("p", "rp-panel__foot", "Tag em Warning: mais de 30 dias em aberto. Cada linha abre o chamado na Lista do Slack. Fonte e classificação: <code>scripts/dev/chamados.js</code>."));
    mais();
  }

  function glossaryTab(){
    var letters = {};
    gloss().slice().sort(function(a, b){ return a.term.localeCompare(b.term, "pt-BR"); }).forEach(function(g){
      var L = g.term.charAt(0).toUpperCase(); (letters[L] = letters[L] || []).push(g);
    });
    var toc = bodyEl.appendChild(el("nav", "rp-toc")); toc.setAttribute("aria-label", "Letras do glossário");
    var content = bodyEl.appendChild(el("div", "rp-content"));
    var intro = card("rp-section rp-intro"); intro.id = "rp-glossario-sobre";
    intro.appendChild(el("div", "rp-md")).appendChild(el("p")).textContent = "Os termos do Relatório que nem todo mundo conhece. Nas outras tabs, a primeira vez que um deles aparece vira um link: clique para conferir a definição sem sair da página.";
    content.appendChild(intro);
    toc.appendChild(el("p", "rp-toc__group", "Termos de A a Z"));
    var ul = toc.appendChild(el("ul"));
    content.appendChild(el("h2", "rp-group", "Termos de A a Z"));
    Object.keys(letters).forEach(function(L){
      var sid = "rp-glossario-" + slug(L), list = letters[L];
      var a = ul.appendChild(el("li")).appendChild(el("a")); a.textContent = L; a.href = "#" + sid; a.dataset.section = sid;
      a.appendChild(countTag(list.length));
      var sec = card("rp-section"); sec.id = sid; sec.dataset.slug = slug(L);
      var h = sec.appendChild(el("h3", "rp-section__title")); h.textContent = L; h.appendChild(countTag(list.length));
      var dl = sec.appendChild(el("div", "rp-md")).appendChild(el("dl", "rp-gloss"));
      list.forEach(function(g){
        var row = dl.appendChild(el("div", "rp-gloss__item"));
        row.appendChild(el("dt")).textContent = g.term;
        row.appendChild(el("dd")).textContent = g.def;
      });
      content.appendChild(sec);
    });
    // Rever o tour do Relatório (R2): com a janela a partir do tablet, onde os passos têm onde se ancorar
    if (CDS.onboarding && window.innerWidth > 743){
      var tour = toc.appendChild(document.createElement("cds-main-button")); tour.className = "rp-src";
      [["label", "Fazer o tour do Relatório"], ["kind", "ghost"], ["size", "small"], ["show-lead-icon", "false"], ["show-trailing-icon", "false"]].forEach(function(x){ tour.setAttribute(x[0], x[1]); });
      tour.addEventListener("click", function(){ window.scrollTo(0, 0); setTimeout(function(){ CDS.onboarding.start("relatorio"); }, 300); });
    }
    filter();
  }
  // Primeira ocorrência de cada termo na tab: Link do DS dentro de <dfn> que abre um Popover do DS (clique ou Enter, Esc fecha)
  var gid = 0;
  function markTerms(scope){
    var terms = gloss(); if (!terms.length) return;
    var left = terms.slice(), roots = scope.querySelectorAll(".rp-md p, .rp-md li, .rp-md td, .rp-panel__sub, .rp-panel__foot");
    for (var r = 0; r < roots.length && left.length; r++){
      var root = roots[r], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function(n){
        for (var p = n.parentNode; p && p !== root; p = p.parentNode){ /* dentro do parágrafo: fora de link, código e componente */ if (/^(A|CODE|DFN|BUTTON|CDS-[A-Z-]+|LOC-[A-Z-]+)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT; }
        return NodeFilter.FILTER_ACCEPT; } }), nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function(node){
        for (var i = 0; i < left.length; i++){
          var m = node.nodeValue.match(left[i].match); if (!m) continue;
          var after = node.splitText(m.index); after.nodeValue = after.nodeValue.slice(m[0].length);
          node.parentNode.insertBefore(term(m[0], left[i]), after);
          left.splice(i, 1);
          node = after; i = -1; // continua no resto do texto com os termos que faltam
        }
      });
    }
  }
  function term(text, g){
    var dfn = el("dfn", "rp-dfn"), link = dfn.appendChild(document.createElement("cds-link"));
    link.id = "rp-dfn-" + (++gid);
    link.setAttribute("label", text); link.setAttribute("href", "#/relatorio/glossario"); link.setAttribute("appearance", "accent"); link.setAttribute("show-trailing-item", "false");
    var pop = null;
    link.addEventListener("click", function(e){
      e.preventDefault();
      if (!pop){
        pop = document.createElement("cds-popover");
        pop.setAttribute("for", link.id); pop.setAttribute("label", g.term); pop.id = link.id + "-def";
        var box = pop.appendChild(el("div", "rp-dfn__pop"));
        box.appendChild(el("p", "rp-dfn__term")).textContent = g.term;
        box.appendChild(el("p", "rp-dfn__def")).textContent = g.def;
        box.appendChild(dsLink("rp-dfn__more", "Abrir o glossário", "#/relatorio/glossario"));
        document.body.appendChild(pop); // Slot: o conteúdo entra antes de conectar
        pop.addEventListener("cds-toggle", function(ev){ var a = link.querySelector("a"); if (a) a.setAttribute("aria-expanded", String(ev.detail.open)); });
        var a = link.querySelector("a"); if (a){ a.setAttribute("aria-controls", pop.id); a.setAttribute("aria-haspopup", "dialog"); }
      }
      pop.toggle();
    });
    return dfn;
  }

  // Busca: esconde linhas de tabela, itens de lista e seções sem o termo
  function filter(){
    if (!bodyEl) return;
    var q = String(searchEl.value || "").trim().toLowerCase();
    [].forEach.call(bodyEl.querySelectorAll(".rp-section"), function(sec){
      var hit = !q || sec.querySelector(".rp-section__title") && sec.querySelector(".rp-section__title").textContent.toLowerCase().indexOf(q) !== -1;
      var any = false;
      [].forEach.call(sec.querySelectorAll("tbody tr, .rp-md > ul > li, .rp-md > ol > li, .rp-md > p, .rp-gloss__item"), function(r){
        var ok = !q || hit || r.textContent.toLowerCase().indexOf(q) !== -1; r.hidden = !ok; if (ok) any = true;
      });
      sec.hidden = !(hit || any);
    });
    [].forEach.call(bodyEl.querySelectorAll(".rp-group"), function(g){
      var n = g.nextElementSibling, vis = false;
      while (n && !n.classList.contains("rp-group")){ if (!n.hidden) vis = true; n = n.nextElementSibling; }
      g.hidden = !vis;
    });
    // Estado vazio (R0/B6 do onboarding): sem nenhuma seção, a tab diz o que aconteceu e como sair
    var empty = bodyEl.querySelector(".rp-empty"), none = !!q && !bodyEl.querySelector(".rp-section:not([hidden])");
    // o mesmo estado vazio das docs (<loc-vazio>, como na FAQ e no Changelog)
    if (none && !empty){
      empty = bodyEl.appendChild(el("loc-vazio", "rp-empty")); empty.setAttribute("size", "small"); empty.setAttribute("role", "status");
      empty.setAttribute("text", "Confira a grafia ou busque por outro termo, como o nome de um componente.");
    }
    if (empty){ empty.hidden = !none; if (none) empty.setAttribute("heading", "Nenhum resultado para " + String(searchEl.value || "").trim()); }
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
