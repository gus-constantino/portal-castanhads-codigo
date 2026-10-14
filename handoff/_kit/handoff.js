/**
 * Leitor das páginas próprias de handoff (docs/PLANO-ACESSO.md, fase 3): lê o handoff.md da pasta da página e monta com
 * os componentes do DS, do pacote público (dist/cds-publico.js). É a página que a pessoa dev recebe por link (/l/<código>)
 * e abre sem o resto do portal.
 *   # Título                     → título da página + Tag "Handoff dev"
 *   > linhas                     → Alert Informative (resumo, task, branch, nodes)
 *   ## Seção                     → Card (Has Border) com a seção
 *   ### Subtítulo · parágrafos · listas
 *   | tabela |                   → Table do DS (sem Checkbox, Toolbar e Pagination)
 *   - [ ] item                   → Checkbox do DS (marcar fica neste navegador)
 *   **negrito** · `código` · [texto](link) e links soltos → Link do DS
 * Sem segredo nenhum: o conteúdo é o .md da pasta, protegido pelo middleware.
 */
(function(){
  "use strict";
  var CDS = window.CDS, page = document.getElementById("ho");
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function plain(s){ return String(s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/(^|\s)\*([^*]+)\*/g, "$1$2").trim(); }
  // texto com negrito, código e links (os links viram Link do DS)
  function inline(parent, s){
    var parts = String(s).split(/(\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+)/);
    parts.forEach(function(p, i){
      if (!p) return;
      var m = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/), url = m ? m[2] : (/^https?:\/\//.test(p) ? p : null);
      if (url){
        var l = parent.appendChild(CDS.create("cds-link", { label: m ? m[1] : url.replace(/^https?:\/\/(www\.)?/, "").replace(/\?.*$/, "").slice(0, 60) + (url.length > 60 ? "…" : ""), href: url, appearance: "accent", target: "_blank", icon: "link-line" }));
        l.classList.add("ho-link"); return;
      }
      var span = parent.appendChild(document.createElement("span"));
      span.innerHTML = esc(p).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/(^|\s)\*([^*]+)\*/g, "$1<em>$2</em>");
    });
    return parent;
  }
  function el(tag, cls, parent){ var n = document.createElement(tag); if (cls) n.className = cls; if (parent) parent.appendChild(n); return n; }
  function cells(l){ return l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function(c){ return c.trim(); }); }

  function render(md){
    var lines = md.replace(/\r/g, "").split("\n"), i = 0, n = lines.length, box = page, store = "cds-handoff:" + location.pathname;
    var marks = {}; try { marks = JSON.parse(localStorage.getItem(store) || "{}"); } catch (e) {}
    page.innerHTML = "";
    while (i < n){
      var l = lines[i];
      if (!l.trim() || /^---+\s*$/.test(l)){ i++; continue; }
      var h1 = l.match(/^#\s+(.*)$/);
      if (h1){
        var head = el("header", "ho-head", page), tag = head.appendChild(CDS.create("cds-tag", { label: "Handoff dev", appearance: "informative", "show-lead-item": "false" }));
        el("h1", "ho-title", head).textContent = plain(h1[1]); document.title = plain(h1[1]) + " · Castanha DS"; tag.classList.add("ho-tag"); i++; continue;
      }
      if (/^>/.test(l)){
        // o Alert lê o conteúdo rico no primeiro desenho: monta o conteúdo antes de pôr na página
        var al = CDS.create("cds-alert", { appearance: "informative", "show-label": "false", "show-close-button": "false" }), q = [];
        while (i < n && /^>/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/, "")); i++; }
        var body = document.createElement("div"); body.className = "ho-quote";
        q.filter(function(x){ return x.trim(); }).forEach(function(x){ inline(el("p", null, body), x); });
        al.appendChild(body); al.classList.add("ho-alert"); page.appendChild(al); continue;
      }
      var h2 = l.match(/^##\s+(.*)$/);
      if (h2){ var card = page.appendChild(CDS.create("cds-card", { "has-border": "true" })); card.classList.add("ho-sec"); box = el("div", "ho-sec__body", card); el("h2", "ho-h2", box).textContent = plain(h2[1]); i++; continue; }
      var h3 = l.match(/^###\s+(.*)$/);
      if (h3){ el("h3", "ho-h3", box).textContent = plain(h3[1]); i++; continue; }
      if (/^\|/.test(l) && /^\|?\s*:?-{3,}/.test(lines[i + 1] || "")){
        var head2 = cells(l), rows = []; i += 2;
        while (i < n && /^\|/.test(lines[i])){ rows.push(cells(lines[i])); i++; }
        var t = box.appendChild(CDS.create("cds-table", { selectable: "false", "show-toolbar": "false", "show-pagination": "false", label: plain(head2.join(" · ")) }));
        t.classList.add("ho-table");
        t.columns = head2.map(function(h, k){ return { key: "c" + k, label: plain(h) || " ", kind: "text", sortable: false }; });
        // célula Default sem ícone e sem descrição (como a tabela do pitch)
        t.rows = rows.map(function(r, ri){ var o = { id: String(ri + 1) }; head2.forEach(function(h, k){ o["c" + k] = { text: plain(r[k] || ""), description: "", icon: false }; }); return o; });
        continue;
      }
      if (/^\s*[-*]\s+\[[ xX]\]\s+/.test(l)){
        var list = el("div", "ho-checks", box);
        while (i < n && /^\s*[-*]\s+\[[ xX]\]\s+/.test(lines[i])){
          var txt = plain(lines[i].replace(/^\s*[-*]\s+\[[ xX]\]\s+/, "")), key = String(list.children.length), done = marks[key] != null ? marks[key] : /\[[xX]\]/.test(lines[i]);
          var cb = list.appendChild(CDS.create("cds-checkbox", { label: txt, status: done ? "selected" : "unselected" }));
          cb.dataset.key = key;
          cb.addEventListener("cds-change", function(e){ var k = e.currentTarget.dataset.key; marks[k] = e.currentTarget.getAttribute("status") === "selected"; try { localStorage.setItem(store, JSON.stringify(marks)); } catch (x) {} });
          i++;
        }
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(l)){
        var ul = el(/^\s*\d+\./.test(l) ? "ol" : "ul", "ho-list", box);
        while (i < n && /^\s*([-*]|\d+\.)\s+/.test(lines[i])){ inline(el("li", null, ul), lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "")); i++; }
        continue;
      }
      var p = [l.trim()]; i++;
      while (i < n && lines[i].trim() && !/^(#|>|\||\s*[-*]\s|\s*\d+\.\s|---)/.test(lines[i])){ p.push(lines[i].trim()); i++; }
      inline(el("p", "ho-p", box), p.join(" "));
    }
  }
  fetch("handoff.md", { cache: "no-store" }).then(function(r){ if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(render)
    .catch(function(){ page.innerHTML = ""; page.appendChild(CDS.create("cds-alert", { appearance: "warning", label: "Não deu para abrir o handoff", text: "Confira se o link ainda vale ou peça um novo ao time do Design System.", "show-close-button": "false" })); });
})();
