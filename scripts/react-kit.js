/**
 * "No React" — tradução Figma → castanha-react abaixo do preview (R1 do plano de integração).
 *
 * Dados: integration/react-data.js (CDS.react), gerado por scripts/integration/build-manifest.js a partir do
 * monorepo oficial (staging + Code Connect) e dos mapas curados integration/prop-map/<id>.json.
 *
 * Por componente do playground mostra: componente React, import, links (Storybook, zeroheight), divergências
 * do oficial, tabela Figma → React e as props do React (tipo, padrão, descrição).
 * Com mapa curado, gera o JSX AO VIVO: lê os atributos do elemento no preview (MutationObserver) e aplica o mapa.
 *
 * Formato do mapa (integration/prop-map/<id>.json):
 *   element   seletor do elemento no preview (o primeiro que casar)
 *   defaults  valor de cada atributo quando ausente (show-* ausente = "true")
 *   pre       linhas antes do JSX (ex.: useState)
 *   jsx       nó: { tag, if, props: [prop], children: [nó | { attr } | { text } | { code }] }
 *   prop      { prop, attr | value | expr, map, bool: true|"not", eq, num, if }
 *             if = { atributo: "valor" | "!valor" } (todas as condições valem)
 *             a prop some quando o valor é o padrão do React (lido do .types.ts) ou vazio
 *   figma     linhas da tabela: [prop do Figma, atributo do playground, prop do React, nota]
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var PKG = "@caju-beneficios/castanha-react";
  var observer = null;

  function el(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function attrs(n, a){ Object.keys(a).forEach(function(k){ if (a[k] != null) n.setAttribute(k, a[k]); }); return n; }
  function code(s){ return el("code", null, s); }
  /** Texto com `código` → <code> (mesma regra das docs). */
  function rich(n, s){
    String(s || "").split(/(`[^`]+`)/).forEach(function(part){
      if (/^`[^`]+`$/.test(part)) n.appendChild(code(part.slice(1, -1))); else if (part) n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function acc(label, description, body){
    var a = attrs(document.createElement("cds-accordion-item"), { label: label, description: description, "show-lead-item": "false", "show-divider": "true", collapsed: "" });
    if (!description) a.setAttribute("show-description", "false");
    a.appendChild(body); // Slot: entra antes de conectar
    return a;
  }
  function table(head, rows, cls){
    var wrap = el("div", "pg-doc-table-wrap"), t = el("table", "pg-doc-table pg-react__table" + (cls ? " " + cls : ""));
    var tr = el("tr"); head.forEach(function(h){ tr.appendChild(el("th", null, h)); });
    var th = el("thead"); th.appendChild(tr); t.appendChild(th);
    var tb = el("tbody");
    rows.forEach(function(r){
      // { cells, note }: a nota vira uma linha de largura total logo abaixo (não espreme a tabela)
      var cells = r.cells || r, row = el("tr", r.note ? "has-note" : null);
      cells.forEach(function(c){ var td = el("td"); if (c instanceof Node) td.appendChild(c); else rich(td, c); row.appendChild(td); });
      tb.appendChild(row);
      if (r.note){ var nr = el("tr", "pg-react__note"), td = el("td"); td.colSpan = cells.length; rich(td, r.note); nr.appendChild(td); tb.appendChild(nr); }
    });
    t.appendChild(tb); wrap.appendChild(t);
    return wrap;
  }

  // ---------- leitura do elemento + mapa ----------
  function reader(map, preview){
    var node = preview.querySelector(map.element);
    return function(a){
      var n = node && node.isConnected ? node : (node = preview.querySelector(map.element));
      var v = n ? n.getAttribute(a) : null;
      if (v === null) v = map.defaults && map.defaults[a] != null ? map.defaults[a] : null;
      return v === "" ? "true" : v; // atributo booleano presente
    };
  }
  function test(get, ifs){
    return !ifs || Object.keys(ifs).every(function(k){
      var w = ifs[k], neg = w.charAt(0) === "!", v = get(k);
      return (String(v) === (neg ? w.slice(1) : w)) !== neg;
    });
  }
  function truthy(v){ return v != null && v !== "false"; }
  /** Padrão do React para tag.prop ("Modal.Header" → tipo ModalHeader; "Button" → Button). */
  function reactDefault(data, tag, prop){
    var parts = tag.split("."), dir = data.dirs[parts[0]], type = parts.join("");
    if (!dir) return undefined;
    var list = dir.props[type] || dir.props[parts[0]] || [];
    for (var i = 0; i < list.length; i++) if (list[i].n === prop) return list[i].d;
    return undefined;
  }
  /** Resolve uma prop → { name, kind: "str"|"bool"|"expr", value } ou null (omitida). */
  function resolve(data, tag, p, get){
    if (!test(get, p.if)) return null;
    var d = reactDefault(data, tag, p.prop);
    if (p.expr) return { name: p.prop, kind: "expr", value: p.expr };
    if (p.value != null) return d === p.value ? null : { name: p.prop, kind: "str", value: p.value };
    var v = get(p.attr);
    if (p.bool || p.eq != null){
      var b = p.eq != null ? v === p.eq : p.bool === "not" ? !truthy(v) : truthy(v);
      if (b === (d === "true")) return null; // igual ao padrão (sem padrão = false)
      return { name: p.prop, kind: "bool", value: b };
    }
    if (v == null || v === "") return null;
    if (p.map && p.map[v] != null) v = p.map[v];
    if (p.num) return { name: p.prop, kind: "expr", value: String(parseInt(v, 10)) };
    if (d != null && String(d) === String(v)) return null;
    return { name: p.prop, kind: "str", value: v };
  }

  // ---------- JSX em segmentos [classe, texto] (realce + texto puro para copiar) ----------
  function jsx(data, node, get, ind, out, tags){
    if (node.code){ out.push([[null, ind], ["c", node.code]]); return; }
    if (node.text != null || node.attr){
      var t = node.text != null ? node.text : get(node.attr);
      if (t) out.push([[null, ind], [null, /[{}<>]/.test(t) ? "{" + JSON.stringify(t) + "}" : t]]);
      return;
    }
    if (!test(get, node.if)) return;
    tags[node.tag.split(".")[0]] = 1;
    var props = (node.props || []).map(function(p){ return resolve(data, node.tag, p, get); }).filter(Boolean);
    var kids = []; (node.children || []).forEach(function(c){ jsx(data, c, get, ind + "  ", kids, tags); });
    function seg(p){
      if (p.kind === "bool") return p.value ? [["a", p.name]] : [["a", p.name], [null, "={"], ["v", "false"], [null, "}"]];
      if (p.kind === "expr") return [["a", p.name], [null, "={"], ["e", p.value], [null, "}"]];
      var s = /"/.test(p.value) ? "{" + JSON.stringify(p.value) + "}" : '"' + p.value + '"';
      return [["a", p.name], [null, "="], ["v", s]];
    }
    var flat = props.reduce(function(a, p){ return a + 1 + seg(p).map(function(x){ return x[1]; }).join("").length; }, 0);
    var close = kids.length ? ">" : " />", oneLine = ind.length + node.tag.length + flat + close.length + 1 <= 72;
    if (oneLine){
      var line = [[null, ind + "<"], ["t", node.tag]];
      props.forEach(function(p){ line.push([null, " "]); line = line.concat(seg(p)); });
      line.push([null, close]); out.push(line);
    } else {
      out.push([[null, ind + "<"], ["t", node.tag]]);
      props.forEach(function(p){ out.push([[null, ind + "  "]].concat(seg(p))); });
      out.push([[null, ind + close.trim()]]);
    }
    if (kids.length){
      // um único texto curto fica na mesma linha: <Button>Label</Button>
      if (oneLine && kids.length === 1 && kids[0].length === 2 && !kids[0][1][0] && (out[out.length - 1].map(function(x){ return x[1]; }).join("") + kids[0][1][1]).length < 72){
        out[out.length - 1] = out[out.length - 1].concat([[null, kids[0][1][1]], [null, "</"], ["t", node.tag], [null, ">"]]);
      } else {
        out.push.apply(out, kids);
        out.push([[null, ind + "</"], ["t", node.tag], [null, ">"]]);
      }
    }
  }
  function snippet(data, it, get){
    var tags = {}, body = [];
    jsx(data, it.map.jsx, get, "", body, tags);
    var pkg = (String(it.import || "").match(/from '([^']+)'/) || [])[1] || PKG;
    function imp(names, from){ return [["k", "import"], [null, " { " + names.join(", ") + " } "], ["k", "from"], [null, " "], ["v", "'" + from + "'"], [null, ";"]]; }
    var hooks = ["useState"].filter(function(h){ return (it.map.pre || []).join(" ").indexOf(h) >= 0; });
    var lines = (hooks.length ? [imp(hooks, "react")] : []).concat([imp(Object.keys(tags).sort(), pkg), []]);
    (it.map.pre || []).forEach(function(l){ lines.push([[null, l]]); });
    if (it.map.pre) lines.push([]);
    return lines.concat(body);
  }
  function paint(pre, lines){
    pre.innerHTML = "";
    var c = el("code");
    lines.forEach(function(l, i){
      l.forEach(function(s){ if (s[0]) c.appendChild(el("span", "pg-react__" + s[0], s[1])); else c.appendChild(document.createTextNode(s[1])); });
      if (i < lines.length - 1) c.appendChild(document.createTextNode("\n"));
    });
    pre.appendChild(c);
    return lines.map(function(l){ return l.map(function(s){ return s[1]; }).join(""); }).join("\n");
  }

  var NONE = {
    "building-block": ["Building block", "Peça interna do Figma (nome com ponto). No React ela fica dentro do componente que a usa, sem export próprio."],
    "so-figma": ["Sem equivalente no React", "Existe no Figma e aqui, mas ainda não tem componente no castanha-react."]
  };

  /** Renderiza a seção "No React" de `def` em `root`, ligada ao `preview`. */
  CDS.renderReact = function(def, preview, root){
    if (observer){ observer.disconnect(); observer = null; }
    root.innerHTML = "";
    var data = CDS.react, it = data && data.items[def.id];
    root.hidden = !it || !!def.resource;
    if (root.hidden) return;
    var dir = it.dir && data.dirs[it.dir];

    var head = root.appendChild(el("div", "pg-react__head"));
    var ttl = head.appendChild(el("div", "pg-react__ttl"));
    ttl.appendChild(el("h2", "pg-react__title", "No React")).id = "react-title";
    var sub = ttl.appendChild(el("p", "pg-react__sub"));
    if (it.component){ sub.appendChild(code("<" + it.component + ">")); sub.appendChild(document.createTextNode(" · castanha-react")); }
    else sub.textContent = "castanha-react";
    sub.appendChild(document.createTextNode(" · " + data.source.ref.replace(/^origin\//, "") + " de " + data.source.date.split("-").reverse().join("/")));
    if (dir){
      var links = head.appendChild(el("div", "pg-react__links"));
      [[dir.storybook, "Storybook", "Abre a doc do componente no Storybook do castanha-react, em outra aba."],
       [dir.zeroheight, "Zeroheight", "Abre a página do componente no zeroheight, em outra aba."]].forEach(function(l){
        if (!l[0]) return;
        var a = links.appendChild(attrs(document.createElement("cds-link"), { label: l[1], href: l[0], target: "_blank", appearance: "neutral", icon: "link-line" }));
        if (CDS.kit) CDS.kit.tip(a, l[2], { container: links });
      });
    }

    // Etiquetas de situação
    var tagsRow = root.appendChild(el("div", "pg-react__tags"));
    function tag(app, label, tip){ var t = tagsRow.appendChild(attrs(document.createElement("cds-tag"), { appearance: app, label: label, "show-lead-item": "false" })); if (CDS.kit && tip) CDS.kit.lazyTip(t, tip, { label: label }); }
    if (!it.component){
      var none = NONE[it.status] || NONE["so-figma"];
      tag("neutral", none[0]);
      root.appendChild(el("p", "pg-react__p", none[1]));
      return;
    }
    if (it.map) tag("positive", "JSX ao vivo", "Mapa Figma → React curado: o código abaixo acompanha os controles do playground.");
    else tag("neutral", "Mapa ainda não curado", "Por enquanto só o import, os valores do Code Connect e as props do React.");
    tag(it.via === "code-connect" ? "informative" : "neutral", it.via === "code-connect" ? "Casado pelo Code Connect" : "Casado pela story",
      it.via === "code-connect" ? "O node do Figma deste componente está no Code Connect do castanha-react (branch feat/figma-code-connect)." : "Casado pelo node do Figma da story no Storybook (ainda sem Code Connect).");
    if (dir && dir.staging) tag("warning", "Só na staging", "Ainda não chegou na main do castanha-react.");
    (dir ? dir.tags : []).forEach(function(t){ if (/^(new|soon|deprecated|refactor)$/.test(t)) tag(t === "deprecated" ? "negative" : "accent", t); });

    if (it.notes && it.notes.length){
      var al = attrs(document.createElement("cds-alert"), { appearance: "warning", label: "Divergência no castanha-react", "show-close-button": "false" });
      al.setAttribute("text", it.notes.join(". ") + ".");
      root.appendChild(al);
    }

    // Código: com mapa, JSX ao vivo; sem mapa, só o import
    var box = root.appendChild(el("div", "pg-react__code"));
    var pre = box.appendChild(el("pre", "pg-react__pre")), text = "";
    pre.setAttribute("aria-label", "Código React");
    pre.tabIndex = 0; // rolagem horizontal pelo teclado
    var copy = box.appendChild(CDS.docMainButton ? CDS.docMainButton("Copiar código") : el("button", null, "Copiar código"));
    copy.classList.add("pg-react__copy");
    copy.addEventListener("click", function(){
      var done = function(){ if (CDS.docToast) CDS.docToast("Código copiado"); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function(){}); else done();
    });

    var get = it.map ? reader(it.map, preview) : null, live = [];
    function render(){
      text = paint(pre, it.map ? snippet(data, it, get) : [[[null, it.import || dir.import || ""]]]);
      live.forEach(function(f){ f(); });
    }

    // Figma → React
    var rows;
    if (it.map){
      rows = it.map.figma.map(function(r){
        var now = el("code", "pg-react__now");
        if (/^[a-z-]+$/.test(r[1])) live.push(function(){ var v = get(r[1]); now.textContent = v == null ? (/^(disabled|value|placeholder)$/.test(r[1]) ? (r[1] === "disabled" ? "false" : "vazio") : "—") : v; });
        else now.textContent = "—";
        // cada nome vira um <code> próprio ("Modal.Header title" → 2), para a célula poder quebrar entre eles
        var codes = function(x){ return x === "—" ? "—" : x.split(" ").map(function(w){ return /^[·+]$/.test(w) ? w : "`" + w + "`"; }).join(" "); };
        return { cells: [r[0], codes(r[1]), codes(r[2]), now], note: r[3] };
      });
      root.appendChild(acc("Figma → React", "Como cada prop do Figma vira prop no React; \"Agora\" segue os controles", table(["Figma", "Playground", "React", "Agora"], rows)));
    } else if (it.figma && it.figma.length){
      rows = it.figma.map(function(f){
        var m = f.map ? Object.keys(f.map).map(function(k){ return "`" + k + "` → `" + (f.map[k] === "undefined" ? "omitir" : f.map[k]) + "`"; }).join(" · ") : "";
        return [f.figma, f.kind, m || "—"];
      });
      root.appendChild(acc("Figma → React (Code Connect)", "Props do Figma lidas pelo Code Connect", table(["Figma", "Tipo", "Valores (Figma → React)"], rows)));
    }

    // Props do React (do .types.ts)
    if (dir){
      var types = Object.keys(dir.props), body = el("div", "pg-react__props"), total = 0;
      types.forEach(function(k){
        var list = dir.props[k]; total += list.length;
        if (types.length > 1) body.appendChild(el("h3", "pg-react__h3", k));
        body.appendChild(table(["Prop", "Tipo", "Padrão", "Descrição"], list.map(function(p){
          return ["`" + p.n + (p.r ? "" : "?") + "`", "`" + p.t + "`", p.d != null ? "`" + p.d + "`" : "—", p.s || ""];
        }), "is-props"));
      });
      if (total) root.appendChild(acc("Props do React", total + (total === 1 ? " prop" : " props") + ", tipos e padrões do castanha-react (\"?\" = opcional)", body));
    }

    render();
    if (it.map && window.MutationObserver){
      var queued = false;
      observer = new MutationObserver(function(){ if (queued) return; queued = true; setTimeout(function(){ queued = false; render(); }, 16); }); // não rAF: pausa em aba oculta
      observer.observe(preview, { subtree: true, childList: true, attributes: true });
    }
  };
})();
