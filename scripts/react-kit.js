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
 *   pre       linhas antes do JSX (ex.: useState); {@atributo} vira o valor atual; {@var} usa vars[var] = { attr, map }
 *   imports   nomes extras do pacote no import (ex.: hook useToast) · jsx pode faltar (só o pre)
 *   num       número; offset soma ao valor (ex.: -1 para base 0)
 *   jsx       nó: { tag, if, defaults, props: [prop], children: [nó | { attr } | { text } | { code } | { each, node }] }
 *             tag "" = fragmento <>…</> (ex.: gatilho + Popover)
 *             each: seletor dos filhos do elemento; repete `node` para cada um, lendo os atributos dele ({i} = posição)
 *   prop      { prop, attr | value | expr | tpl, map, bool: true|"not", eq, num, if }
 *             expr com attr: {v} vira o valor do atributo (ex.: "{ label: '{v}' }") · replace: [de, para] no valor
 *             tpl: texto com {v} (valor do atributo) e {i} (posição no each), ex.: "item-{i}"
 *             if = { atributo: "valor" | "!valor" } (todas as condições valem)
 *             a prop some quando o valor é o padrão do React (lido do .types.ts) ou vazio
 *   figma     linhas da tabela: [prop do Figma, atributo do playground, prop do React, nota]
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var PKG = "@caju-beneficios/castanha-react";
  var WIDTH = 100; // printWidth do .prettierrc.json do castanha
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
  /** Leitor de atributos de um elemento: get(attr) com os padrões do mapa; get.el() é o elemento, get.i a posição (each). */
  function scoped(find, defaults, i){
    var get = function(a){
      var n = find(), v = n ? n.getAttribute(a) : null;
      if (v === null) v = defaults && defaults[a] != null ? defaults[a] : null;
      return v === "" && !(defaults && defaults[a] === "") ? "true" : v; // vazio = atributo booleano presente, exceto quando o mapa declara "" como valor (ex.: alt="" de imagem decorativa)
    };
    get.el = find; get.i = i || 1;
    return get;
  }
  function reader(map, preview){
    var node = null;
    return scoped(function(){ return node && node.isConnected ? node : (node = preview.querySelector(map.element)); }, map.defaults);
  }
  function fill(t, v, get){ return String(t).replace(/\{v\}/g, v == null ? "" : v).replace(/\{i\}/g, get.i).replace(/\{@([a-z-]+)\}/g, function(m, k){ var x = get(k); return x == null ? "" : x; }); } // {@attr}: outro atributo
  function test(get, ifs){
    return !ifs || Object.keys(ifs).every(function(k){
      var w = ifs[k], neg = w.charAt(0) === "!", v = get(k);
      return (String(v) === (neg ? w.slice(1) : w)) !== neg;
    });
  }
  function truthy(v){ return v != null && v !== "false"; }
  /** Padrão do React para tag.prop ("Modal.Header" → tipo ModalHeader; "Button" → Button). */
  function reactDefault(data, tag, prop){
    // mesmo caminho do check (scripts/integration/check-stack.js): "Tabs.Item" → TabItem, segue composições (ChipFilter → ChipBaseProps)
    var parts = tag.split("."), dir = data.dirs[parts[0]], last = parts[parts.length - 1];
    if (!dir) return undefined;
    var refs = dir.refs || {}, names = Object.keys(dir.props).concat(Object.keys(refs));
    var start = parts.length > 1
      ? [parts.join(""), parts.join("") + "Props"].concat(names.filter(function(k){ return k.slice(-last.length) === last || k.slice(-(last.length + 5)) === last + "Props"; }))
      : [tag, tag + "Props"];
    var seen = {}, found;
    function walk(t){
      if (found !== undefined || seen[t]) return; seen[t] = 1;
      (dir.props[t] || []).forEach(function(p){ if (found === undefined && p.n === prop && p.d !== undefined) found = p.d; });
      (refs[t] || []).forEach(walk);
      if (/Props$/.test(t)) walk(t.replace(/Props$/, ""));
    }
    start.forEach(function(t){ if (dir.props[t] || refs[t]) walk(t); });
    return found;
  }
  /** Resolve uma prop → { name, kind: "str"|"bool"|"expr", value } ou null (omitida). */
  function resolve(data, tag, p, get){
    if (!test(get, p.if)) return null;
    var d = reactDefault(data, tag, p.prop);
    if (p.expr === "true") return { name: p.prop, kind: "bool", value: true }; // creatable, scrollable…
    if (p.expr){ // {v} = valor do atributo (ex.: notification={{ label: "{v}" }}); sem valor, a prop some
      if (p.attr && p.expr.indexOf("{v}") > -1){ var ev = get(p.attr); if (ev == null || ev === "") return null; return { name: p.prop, kind: "expr", value: fill(p.expr, ev, get) }; }
      return { name: p.prop, kind: "expr", value: p.expr.replace(/\{@([a-z-]+)\}/g, function(m, k){ var x = get(k); return x == null ? "" : x; }) }; // {@attr}: outro atributo (ex.: "[{@start}, {@end}]")
    }
    if (p.value != null) return d === p.value ? null : { name: p.prop, kind: "str", value: p.value };
    var v = p.attr ? get(p.attr) : null;
    if (p.tpl) v = fill(p.tpl, v, get); // ex.: "item-{v}" (valor do atributo) ou "item-{i}" (posição no each)
    if (p.replace && v != null) v = String(v).split(p.replace[0]).join(p.replace[1]); // ex.: ["/", "-"] (nome da ilustração no pacote)
    if (p.bool || p.eq != null){
      var b = p.eq != null ? v === p.eq : p.bool === "not" ? !truthy(v) : truthy(v);
      if (b === (d === "true")) return null; // igual ao padrão (sem padrão = false)
      return { name: p.prop, kind: "bool", value: b };
    }
    if (v == null || v === "") return null;
    if (p.map && p.map[v] != null) v = p.map[v];
    if (p.num){ var n = parseInt(v, 10) + (p.offset || 0); return d != null && String(d) === String(n) ? null : { name: p.prop, kind: "expr", value: String(n) }; } // offset: base 1 → base 0
    if (d != null && String(d) === String(v)) return null;
    return { name: p.prop, kind: "str", value: v };
  }

  // ---------- JSX em segmentos [classe, texto] (realce + texto puro para copiar) ----------
  function jsx(data, node, get, ind, out, tags){
    if (node.code){ out.push([[null, ind], ["c", fill(node.code, null, get)]]); return; }
    if (node.each){
      // um nó por elemento filho do preview (abas, chips…), lendo os atributos de cada um
      var host = get.el(), list = host ? host.querySelectorAll(node.each) : [];
      [].forEach.call(list, function(child, k){ jsx(data, node.node, scoped(function(){ return child; }, node.node.defaults, k + 1), ind, out, tags); });
      return;
    }
    if (node.text != null || node.attr){
      var t = node.text != null ? node.text : get(node.attr);
      if (t) out.push([[null, ind], [null, /[{}<>]/.test(t) ? "{" + JSON.stringify(t) + "}" : t]]);
      return;
    }
    if (!test(get, node.if)) return;
    if (node.tag) tags[node.tag.split(".")[0]] = 1; // tag "" = fragmento <>…</> (sem import)
    var props = (node.props || []).map(function(p){ return resolve(data, node.tag, p, get); }).filter(Boolean);
    var kids = []; (node.children || []).forEach(function(c){ jsx(data, c, get, ind + "  ", kids, tags); });
    function seg(p){
      if (p.kind === "bool") return p.value ? [["a", p.name]] : [["a", p.name], [null, "={"], ["v", "false"], [null, "}"]];
      if (p.kind === "expr") return [["a", p.name], [null, "={"], ["e", p.value], [null, "}"]];
      var s = /"/.test(p.value) ? "{" + JSON.stringify(p.value) + "}" : '"' + p.value + '"';
      return [["a", p.name], [null, "="], ["v", s]];
    }
    var flat = props.reduce(function(a, p){ return a + 1 + seg(p).map(function(x){ return x[1]; }).join("").length; }, 0);
    var close = kids.length ? ">" : " />", oneLine = ind.length + node.tag.length + flat + close.length + 1 <= WIDTH;
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
      if (oneLine && kids.length === 1 && kids[0].length === 2 && (!kids[0][1][0] || kids[0][1][0] === "c") && (out[out.length - 1].map(function(x){ return x[1]; }).join("") + kids[0][1][1]).length + node.tag.length + 3 <= WIDTH){ // + </Tag>
        out[out.length - 1] = out[out.length - 1].concat([[null, kids[0][1][1]], [null, "</"], ["t", node.tag], [null, ">"]]);
      } else {
        out.push.apply(out, kids);
        out.push([[null, ind + "</"], ["t", node.tag], [null, ">"]]);
      }
    }
  }
  function snippet(data, it, get){
    var tags = {}, body = [];
    if (it.map.jsx) jsx(data, it.map.jsx, get, "", body, tags); // sem jsx: só o pre (ex.: hook useToast)
    (it.map.imports || []).forEach(function(n){ tags[n] = 1; });
    var pkg = (String(it.import || "").match(/from '([^']+)'/) || [])[1] || PKG;
    function imp(names, from){ return [["k", "import"], [null, " { " + names.join(", ") + " } "], ["k", "from"], [null, " "], ["v", "'" + from + "'"], [null, ";"]]; }
    var hooks = ["useRef", "useState"].filter(function(h){ return (it.map.pre || []).join(" ").indexOf(h) >= 0; });
    var lines = (hooks.length ? [imp(hooks, "react")] : []).concat([imp(Object.keys(tags).sort(), pkg), []]);
    function pv(a){ // {@attr} = valor atual; {@var} = vars[var] (attr + map), ex.: appearance positive → kind success
      var vr = it.map.vars && it.map.vars[a], v = get(vr ? vr.attr : a);
      if (vr && vr.map && vr.map[v] != null) v = vr.map[v];
      return v == null ? "" : v;
    }
    (it.map.pre || []).forEach(function(l){ lines.push([[null, l.replace(/\{@([A-Za-z-]+)\}/g, function(m, a){ return pv(a); })]]); });
    if (it.map.pre && it.map.jsx) lines.push([]);
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

  // Núcleo puro (sem DOM) para gerar o JSX fora do navegador: usado pelo MCP (mcp/react.js, ferramenta gerar_jsx)
  CDS.reactCore = { snippet: snippet, scoped: scoped, text: function(lines){ return lines.map(function(l){ return l.map(function(s){ return s[1]; }).join(""); }).join("\n"); } };

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

    // Ordem do ComponentPage do Storybook (R5): título + Tags · descrição · Import · código · Props · Links úteis
    var head = root.appendChild(el("div", "pg-react__head"));
    var ttl = head.appendChild(el("div", "pg-react__ttl"));
    ttl.appendChild(el("h2", "pg-react__title", "No React")).id = "react-title";
    var sub = ttl.appendChild(el("p", "pg-react__sub"));
    if (it.component){ sub.appendChild(code("<" + it.component + ">")); sub.appendChild(document.createTextNode(" · castanha-react")); }
    else sub.textContent = "castanha-react";
    sub.appendChild(document.createTextNode(" · " + data.source.ref.replace(/^origin\//, "") + " de " + data.source.date.split("-").reverse().join("/")));

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
    if (dir && dir.staging) tag("warning", "Só na staging", "Ainda não chegou na main do castanha-react nem no Storybook publicado.");
    (dir ? dir.tags : []).forEach(function(t){ if (/^(new|soon|deprecated|refactor)$/.test(t)) tag(t === "deprecated" ? "negative" : "accent", t); });

    // R2: saúde Figma × React (scripts/integration/check-stack.js) — etiqueta com o pior nível
    var CK = { alta: ["negative", "Alta"], media: ["warning", "Média"], info: ["neutral", "Informativo"] }, checks = it.checks || [];
    var worst = ["alta", "media", "info"].filter(function(l){ return checks.some(function(c){ return c.l === l; }); })[0];
    if (worst){
      var nAlert = checks.filter(function(c){ return c.l !== "info"; }).length;
      tag(CK[worst][0], nAlert ? nAlert + (nAlert === 1 ? " divergência" : " divergências") + " Figma × React" : "Só informativos no check",
        "Check em três vértices (Figma × Code Connect/React × playground). Detalhes no bloco \"Saúde Figma × React\", abaixo.");
    } else if (it.component) tag("positive", "Check Figma × React ok", "Nenhuma divergência entre as props do Figma, o Code Connect e o React.");

    if (it.notes && it.notes.length){
      var al = attrs(document.createElement("cds-alert"), { appearance: "warning", label: "Divergência no castanha-react", "show-close-button": "false" });
      al.setAttribute("text", it.notes.join(". ") + ".");
      root.appendChild(al);
    }

    // Descrição do Storybook (description do ComponentPage, lida do .mdx)
    if (dir && dir.desc){
      var dp = root.appendChild(el("p", "pg-react__p"));
      dp.appendChild(document.createTextNode(dir.desc + " "));
      dp.appendChild(el("span", "pg-react__src", "(Storybook)"));
    }

    // Import + código: com mapa, o JSX acompanha os controles; os imports vêm do próprio snippet (inclui useState, subcomponentes…)
    function block(title, label){
      var b = root.appendChild(el("div", "pg-react__code"));
      b.appendChild(el("h3", "pg-react__h3", title));
      var pr = b.appendChild(el("pre", "pg-react__pre")); pr.setAttribute("aria-label", label); pr.tabIndex = 0; // rolagem pelo teclado
      return { box: b, pre: pr };
    }
    var imp = block("Import", "Import do castanha-react"), jsxB = it.map ? block("Código ao vivo", "Código React gerado a partir dos controles") : null, text = "";
    var copy = (jsxB || imp).box.appendChild(CDS.docMainButton ? CDS.docMainButton("Copiar código") : el("button", null, "Copiar código"));
    copy.classList.add("pg-react__copy");
    copy.addEventListener("click", function(){
      var done = function(){ if (CDS.docToast) CDS.docToast("Código copiado"); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function(){}); else done();
    });

    var get = it.map ? reader(it.map, preview) : null, live = [];
    function render(){
      var lines = it.map ? snippet(data, it, get) : [[[null, it.import || dir.import || ""]]];
      var cut = -1; for (var i = 0; i < lines.length; i++) if (!lines[i].length){ cut = i; break; }
      var head = cut < 0 ? lines : lines.slice(0, cut), body = cut < 0 ? [] : lines.slice(cut + 1);
      var t1 = paint(imp.pre, head), t2 = jsxB ? paint(jsxB.pre, body) : "";
      text = t2 ? t1 + "\n\n" + t2 : t1;
      live.forEach(function(f){ f(); });
    }

    // Props do React (do .types.ts) — abertas, como a tabela de props do Storybook
    if (dir){
      var types = Object.keys(dir.props), propsBox = root.appendChild(el("div", "pg-react__props")), total = 0;
      var ph = propsBox.appendChild(el("h3", "pg-react__h3", "Props"));
      types.forEach(function(k){
        var list = dir.props[k]; total += list.length;
        if (types.length > 1) propsBox.appendChild(el("h4", "pg-react__h4", k));
        propsBox.appendChild(table(["Prop", "Tipo", "Padrão", "Descrição"], list.map(function(p){
          // union em códigos separados ('a' | 'b'): a célula quebra entre os valores, não no meio deles
          return ["`" + p.n + (p.r ? "" : "?") + "`", String(p.t).split(" | ").map(function(x){ return "`" + x + "`"; }).join(" | "), p.d != null ? "`" + p.d + "`" : "—", p.s || ""];
        }), "is-props"));
      });
      ph.appendChild(el("span", "pg-react__count", total + (total === 1 ? " prop" : " props") + " · \"?\" = opcional"));
      if (!total) propsBox.remove();
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

    if (checks.length){
      root.appendChild(acc("Saúde Figma × React", checks.length + (checks.length === 1 ? " item" : " itens") + " do check em três vértices (relatório: Stack React)",
        table(["Nível", "O quê"], checks.map(function(c){
          var t = attrs(document.createElement("cds-tag"), { appearance: CK[c.l][0], label: CK[c.l][1], "show-lead-item": "false" });
          return [t, c.m];
        }), "is-checks")));
    }

    // Links úteis (fim da página, como no ComponentPage): ponte playground ↔ Storybook ↔ zeroheight ↔ Figma + referências de acessibilidade
    var lb = root.appendChild(el("div", "pg-react__useful"));
    lb.appendChild(el("h3", "pg-react__h3", "Links úteis"));
    var ul = lb.appendChild(el("ul", "pg-react__list"));
    // o Storybook publicado (castanha-web, exige VPN) mostra a main: componente só na staging ainda não tem story lá
    [[dir && !dir.staging && dir.storybook, "Storybook", "doc e stories do componente no castanha-react (precisa da VPN da Caju)"],
     [dir && dir.zeroheight, "Zeroheight", "especificações de UX"],
     [def.figma, "Figma", "componente no [CastanhaDS] Components"],
     ["#/relatorio/stack", "Saúde da stack", "check Figma × castanha-react × playground", true],
     ["https://www.w3.org/WAI/ARIA/apg/patterns/", "Padrões de teclado (WAI-ARIA)", "como navegar em componentes interativos"],
     ["https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/", "Nomes acessíveis", "aria-label, aria-labelledby ou texto visível"]].forEach(function(l){
      if (!l[0]) return;
      var li = ul.appendChild(el("li"));
      li.appendChild(attrs(document.createElement("cds-link"), { label: l[1], href: l[0], target: l[3] ? null : "_blank", appearance: "neutral", icon: l[3] ? null : "link-line", "show-trailing-item": l[3] ? "false" : null }));
      li.appendChild(document.createTextNode(" — " + l[2]));
    });

    render();
    if (it.map && window.MutationObserver){
      var queued = false;
      observer = new MutationObserver(function(){ if (queued) return; queued = true; setTimeout(function(){ queued = false; render(); }, 16); }); // não rAF: pausa em aba oculta
      observer.observe(preview, { subtree: true, childList: true, attributes: true });
    }
  };
})();
