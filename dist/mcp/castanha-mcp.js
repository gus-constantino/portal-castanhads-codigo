#!/usr/bin/env node
/* MCP do Castanha DS · arquivo único · GERADO por scripts/mcp/build-catalog.js + scripts/mcp/bundle.js · não editar à mão
 * Fontes: mcp/server.js, mcp/react.js e o núcleo de scripts/react-kit.js (repo gus-constantino/castanhads-component-teste).
 * Uso (Node 18+, sem instalar nada):
 *   node castanha-mcp.js               stdio: Claude Code (claude mcp add castanha-ds -- node /caminho/castanha-mcp.js), Claude Desktop, Cursor
 *   node castanha-mcp.js --http 8787   HTTP: http://127.0.0.1:8787/mcp
 * Catálogo: CASTANHA_CATALOG (arquivo ou URL) · catalog.json ao lado deste arquivo · o publicado no site.
 * Em plataforma serverless: require/import e use handleRequest(request) como handler fetch.
 */
"use strict";
(function(){
  // núcleo puro do react-kit (gerar JSX), com window/document locais: não toca no ambiente
  globalThis.__CASTANHA_REACT_KIT__ = function(){
    var window = { CDS: {} }, document = {}, MutationObserver = null;
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
    
    return window.CDS.reactCore;
  };
  var MODS = {
    "./react": function(module, exports, require){
      /**
       * MCP do Castanha DS · M2: gerar e revisar JSX do castanha-react (docs/local/PLANO-MCP.md).
       *
       * gerar  — mesmo código do painel "No React" do playground: roda o núcleo puro do scripts/react-kit.js (CDS.reactCore)
       *          sobre um elemento simulado com os atributos pedidos (traduzidos das props do Figma pelos mapas curados).
       * revisar — lê um trecho JSX/TSX (parser leve, sem dependências) e confere contra o castanha-react e o DS:
       *          componente inexistente ou sem import · prop inexistente · valor fora das opções · prop obrigatória faltando ·
       *          ícone/ilustração com nome errado · cor ou tamanho cru que tem token · padrão do React diferente do Figma.
       */
      "use strict";
      const fs = require("fs"), path = require("path"), vm = require("vm");
      const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      function lev(a, b){ const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++){ let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++){ const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; } } return d[b.length]; }
      const near = (q, list) => list.map((x) => [x, lev(fold(q), fold(x))]).filter((p) => p[1] <= Math.max(2, Math.floor(q.length / 3))).sort((a, b) => a[1] - b[1]).slice(0, 3).map((p) => p[0]);
      
      // ---------- núcleo do react-kit ----------
      let CORE = null;
      async function core(catalog){
        if (CORE) return CORE;
        // no arquivo único (dist/mcp/castanha-mcp.js) o núcleo já vem embutido, sem vm nem leitura de arquivo
        if (typeof globalThis.__CASTANHA_REACT_KIT__ === "function") return (CORE = globalThis.__CASTANHA_REACT_KIT__());
        const local = path.join(__dirname, "..", "scripts", "react-kit.js");
        const src = fs.existsSync(local) ? fs.readFileSync(local, "utf8") : await (await fetch(catalog.site + "scripts/react-kit.js")).text();
        const ctx = { document: {}, MutationObserver: null }; ctx.window = ctx; ctx.CDS = {};
        vm.createContext(ctx); vm.runInContext(src, ctx, { filename: "react-kit.js" });
        if (!ctx.CDS.reactCore) throw new Error("scripts/react-kit.js sem CDS.reactCore (versão antiga do playground).");
        return (CORE = ctx.CDS.reactCore);
      }
      
      // ---------- gerar ----------
      /** Valores que o mapa conhece para cada atributo (padrões, condições, eq, map). */
      function knownValues(map){
        const k = {}, add = (a, v) => { if (a && v != null && v !== "") (k[a] = k[a] || new Set()).add(String(v).replace(/^!/, "")); };
        Object.keys(map.defaults || {}).forEach((a) => add(a, map.defaults[a]));
        (function walk(n){
          if (!n) return;
          if (n.if) Object.keys(n.if).forEach((a) => add(a, n.if[a]));
          (n.props || []).forEach((p) => { if (p.if) Object.keys(p.if).forEach((a) => add(a, p.if[a])); if (p.eq != null) add(p.attr, p.eq); if (p.map) Object.keys(p.map).forEach((v) => add(p.attr, v)); });
          (n.children || []).forEach(walk); if (n.node) walk(n.node);
        })(map.jsx);
        return k;
      }
      /** Atributos que o mapa lê (padrões, props, condições, filhos). */
      function mapAttrs(map){
        const a = new Set(Object.keys(map.defaults || {}));
        (function walk(n){
          if (!n) return;
          if (n.attr) a.add(n.attr); if (n.if) Object.keys(n.if).forEach((k) => a.add(k));
          (n.props || []).forEach((p) => { if (p.attr) a.add(p.attr); if (p.if) Object.keys(p.if).forEach((k) => a.add(k)); });
          (n.children || []).forEach(walk); if (n.node) walk(n.node);
        })(map.jsx);
        (map.figma || []).forEach((r) => { if (/^[a-z][a-z0-9-]*$/.test(r[1])) a.add(r[1]); });
        return a;
      }
      // nomes de prop do Figma → atributo do playground quando não há linha no mapa (convenção dos componentes do playground)
      const CONV = { "text label": "label", "error message": "error", "supporting message": "supporting", "text content": "text", "text title": "text-title",
        "text description": "text-description", "placeholder content": "placeholder", "required text": "required-text", "label": "label" };
      /** Props do Figma → atributos do playground, pelas linhas `figma` do mapa, pela convenção de nomes e pelos tipos no Figma. */
      function figmaToAttrs(comp, map, figma){
        const attrs = {}, notes = [], kv = knownValues(map), types = {}, known = mapAttrs(map);
        (comp.figmaProps || []).forEach((p) => { types[fold(p.name)] = p; });
        Object.keys(figma || {}).forEach((name) => {
          const v = figma[name], fp = types[fold(name)];
          const row = (map.figma || []).find((r) => (fold(r[0]) === fold(name) || fold(r[0]).split(" / ").indexOf(fold(name)) >= 0) && /^[a-z][a-z0-9-]*$/.test(r[1]));
          let attr = row ? row[1] : null;
          if (!attr){ const guess = CONV[fold(name)] || fold(name).replace(/\s+/g, "-"); if (known.has(guess)) attr = guess; }
          if (!attr){
            const any = (map.figma || []).find((r) => fold(r[0]) === fold(name));
            notes.push("`" + name + "` não tem tradução para o React" + (any && any[3] ? " (" + any[3].replace(/`/g, "") + ")" : "") + ".");
            return;
          }
          if (attr === "disabled" || fold(name) === "state"){
            if (fold(v) === "disabled" || v === true) attrs.disabled = "";
            else if (!/^(enabled|hovered|pressed|dragged|dragover)$/.test(fold(v))) notes.push("State `" + v + "` não vira prop; só Disabled.");
            return;
          }
          if (typeof v === "boolean" || (fp && fp.type === "Boolean")){ attrs[attr] = String(v === true || fold(v) === "true"); return; }
          if (fp && (fp.type === "Text" || fp.type === "Instance swap")){ attrs[attr] = String(v); return; }
          let val = fold(v).trim().replace(/\s+/g, "-");
          const vals = kv[attr] ? Array.from(kv[attr]) : [];
          if (fp && fp.options && !fp.options.some((o) => fold(o) === fold(v))){ notes.push("`" + name + ": " + v + "` não é opção no Figma (" + fp.options.join(", ") + "); ignorei."); return; }
          else if (vals.length && vals.indexOf(val) < 0){ const hit = vals.find((x) => x.length > 2 && (val.indexOf(x) === 0 || x.indexOf(val) === 0)); if (hit) val = hit; } // "single-rows-chips" → "single"
          attrs[attr] = val;
        });
        return { attrs, notes };
      }
      async function generate(catalog, comp, args){
        const it = catalog.reactData.items[comp.id];
        if (!it) return "`" + comp.name + "` não tem componente no castanha-react.";
        if (!it.map) return "`" + comp.name + "` ainda não tem mapa Figma → React curado. Import:\n\n```tsx\n" + (it.import || "") + "\n```\n\nUse `componente` para ver as props.";
        const C = await core(catalog), map = it.map;
        const t = figmaToAttrs(comp, map, args.props_figma), attrs = Object.assign(t.attrs, args.atributos || {});
        // filhos (abas, chips…): `itens` = número ou lista de atributos por item; padrão 3
        const items = Array.isArray(args.itens) ? args.itens : Array.from({ length: typeof args.itens === "number" ? args.itens : 3 }, () => ({}));
        // mais de um tipo de filho (ex.: Chips Group: cds-input-chip ou cds-filter-chip): escolhe pelo valor das props do Figma ("Filter Chips" → filter)
        const sels = []; (function walk(n){ if (!n) return; if (n.each) sels.push(n.each); (n.children || []).forEach(walk); if (n.node) walk(n.node); })(map.jsx);
        const wanted = fold(Object.values(args.props_figma || {}).join(" "));
        const wordsOf = (x) => fold(x).replace(/\bcds-/g, "").split(/[-,\s]+/).filter((w) => w.length > 2);
        const common = sels.length > 1 ? wordsOf(sels[0]).filter((w) => sels.every((x) => wordsOf(x).indexOf(w) >= 0)) : [];
        const pick = sels.find((x) => wordsOf(x).some((w) => common.indexOf(w) < 0 && wanted.indexOf(w) >= 0)) || sels[0];
        const child = (a) => ({ getAttribute: (k) => (a[k] == null ? null : String(a[k])), querySelectorAll: () => [] });
        const el = { getAttribute: (k) => (attrs[k] == null ? null : String(attrs[k])), querySelectorAll: (sel) => (sel === pick ? items.map(child) : []) };
        const get = C.scoped(() => el, map.defaults);
        const code = C.text(C.snippet(catalog.reactData, Object.assign({}, it), get)).trim();
        // o playground preenche exemplos (imagem, foto…); aqui o que for obrigatório e faltar vira lembrete
        review(catalog, code).findings.filter((f) => f.lv !== "info").forEach((f) => t.notes.push("Complete: " + f.msg));
        return "```tsx\n" + code + "\n```" + (t.notes.length ? "\n\n" + t.notes.map((n) => "- " + n).join("\n") : "") +
          "\n\nGerado pelo mapa curado `integration/prop-map/" + comp.id + ".json` (o mesmo do painel \"No React\" do playground). Props omitidas = padrão do React.";
      }
      
      // ---------- revisar ----------
      function parseJSX(src){
        const tags = [], imports = {};
        src.replace(/import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g, (m, names, from) => { names.split(",").map((s) => s.trim().split(/\s+as\s+/).pop()).filter(Boolean).forEach((n) => { imports[n] = from; }); return m; });
        const lineOf = (i) => src.slice(0, i).split("\n").length;
        let i = 0;
        while ((i = src.indexOf("<", i)) >= 0){
          const m = /^<([A-Za-z][\w.]*)/.exec(src.slice(i, i + 80));
          if (!m){ i++; continue; }
          const tag = { name: m[1], line: lineOf(i), props: [], selfClosing: false, hasChildren: false };
          let j = i + m[0].length;
          for (;;){
            while (/\s/.test(src[j] || "")) j++;
            if (j >= src.length) break;
            if (src.startsWith("/>", j)){ tag.selfClosing = true; j += 2; break; }
            if (src[j] === ">"){ j++; break; }
            if (src[j] === "{"){ j = skipBraces(src, j); tag.props.push({ name: "{...}", spread: true }); continue; }
            const pm = /^[\w:-]+/.exec(src.slice(j)); if (!pm){ j++; continue; }
            const prop = { name: pm[0], line: lineOf(j) }; j += pm[0].length;
            while (/\s/.test(src[j] || "")) j++;
            if (src[j] === "="){
              j++; while (/\s/.test(src[j] || "")) j++;
              if (src[j] === '"' || src[j] === "'"){ const q = src[j], e = src.indexOf(q, j + 1); prop.value = src.slice(j + 1, e); prop.literal = true; j = e + 1; }
              else if (src[j] === "{"){ const e = skipBraces(src, j); prop.expr = src.slice(j + 1, e - 1).trim(); const lit = /^(['"`])([^'"`]*)\1$/.exec(prop.expr); if (lit){ prop.value = lit[2]; prop.literal = true; } j = e; }
            } else prop.value = true;
            tag.props.push(prop);
          }
          if (!tag.selfClosing){ const close = src.indexOf("</" + tag.name, j); tag.hasChildren = close > j && src.slice(j, close).trim().length > 0; }
          tags.push(tag); i = j;
        }
        return { tags, imports };
      }
      function skipBraces(s, j){ let d = 0, q = null; for (; j < s.length; j++){ const c = s[j]; if (q){ if (c === q && s[j - 1] !== "\\") q = null; continue; } if (c === '"' || c === "'" || c === "`") q = c; else if (c === "{") d++; else if (c === "}"){ d--; if (!d) return j + 1; } } return j; }
      
      // nomes comuns em outras libs → equivalente no castanha-react
      const SYN = { variant: ["appearance", "kind"], color: ["appearance"], intent: ["appearance"], type: ["kind", "appearance"], icon: ["leadIcon"], startIcon: ["leadIcon"], endIcon: ["trailingIcon"], helperText: ["supportingMessage"], hint: ["supportingMessage"], errorMessage: ["supportingMessage"], isDisabled: ["disabled"], isOpen: ["open"], onDismiss: ["onClose"], text: ["label", "content"], title: ["label"] };
      const HTML = /^(on[A-Z]\w*|aria-[\w-]+|data-[\w-]+|className|style|id|key|ref|children|href|target|rel|type|name|value|defaultValue|checked|defaultChecked|disabled|required|placeholder|title|role|tabIndex|alt|src|htmlFor|autoFocus|autoComplete|form|as|width|height|min|max|step|maxLength|minLength|readOnly|lang|dir|hidden)$/;
      function literals(t){ const s = String(t).trim(); if (/^('[^']*'\s*\|?\s*)+$/.test(s)) return s.match(/'[^']*'/g).map((x) => x.slice(1, -1)); const m = s.match(/^Extract<\w+,\s*((?:'[^']*'\s*\|?\s*)+)>$/); return m ? m[1].match(/'[^']*'/g).map((x) => x.slice(1, -1)) : null; }
      /** Props de uma tag do castanha-react ("Button", "Modal.Header" → ModalHeader, "Tabs.Item" → TabItem), seguindo composições.
       *  Tipos da própria pasta têm prioridade (dois pacotes podem ter um `LeadSlot`). Em união de variantes (`A | B | C`, tipo sem
       *  props próprias com várias referências), a prop só é obrigatória se for obrigatória em todas as variantes. */
      function propsFor(data, tag){
        const parts = tag.split("."), dir = data.dirs[parts[0]]; if (!dir) return null;
        const glob = {}; Object.values(data.dirs).forEach((d) => { Object.keys(d.props).forEach((k) => { (glob[k] = glob[k] || {}).p = glob[k].p || d.props[k]; }); Object.keys(d.refs || {}).forEach((k) => { (glob[k] = glob[k] || {}).r = glob[k].r || d.refs[k]; }); });
        const T = (k) => ({ p: dir.props[k] || (glob[k] && glob[k].p) || [], r: (dir.refs || {})[k] || (glob[k] && glob[k].r) || [], known: !!(dir.props[k] || (dir.refs || {})[k] || glob[k]) });
        const last = parts[parts.length - 1], own = Object.keys(dir.props).concat(Object.keys(dir.refs || {}));
        const start = parts.length > 1 ? [parts.join(""), parts.join("") + "Props"].concat(own.filter((k) => k.endsWith(last) || k.endsWith(last + "Props"))).find((k) => T(k).known)
          : [tag, tag + "Props"].find((k) => own.indexOf(k) >= 0) || [tag, tag + "Props"].find((k) => T(k).known);
        /** Junta as props de um tipo (e do que ele compõe) num mapa nome → { type, required, def, lits }. */
        function collect(t, seen){
          const out = {}; if (seen[t] || !T(t).known) return out; seen[t] = 1;
          const x = T(t), merge = (m) => Object.keys(m).forEach((n) => { const a = out[n], b = m[n]; if (!a) out[n] = Object.assign({}, b); else { if (b.lits) a.lits = Array.from(new Set((a.lits || []).concat(b.lits))); a.required = a.required || b.required; } });
          x.p.forEach((p) => merge({ [p.n]: { name: p.n, type: p.t, required: !!p.r, def: p.d, lits: literals(p.t) } }));
          const refs = x.r.filter((r) => T(r).known && !/Element$/.test(r));
          if (!x.p.length && refs.length > 1){ // união de variantes
            const parts = refs.map((r) => collect(r, Object.assign({}, seen))), names = new Set([].concat.apply([], parts.map((m) => Object.keys(m))));
            names.forEach((n) => { const all = parts.filter((m) => m[n]), first = Object.assign({}, all[0][n]);
              first.required = all.length === parts.length && all.every((m) => m[n].required);
              all.forEach((m) => { if (m[n].lits) first.lits = Array.from(new Set((first.lits || []).concat(m[n].lits))); }); merge({ [n]: first }); });
          } else refs.forEach((r) => merge(collect(r, seen)));
          if (/Props$/.test(t)) merge(collect(t.replace(/Props$/, ""), seen));
          return out;
        }
        if (!start){ const out = {}; Object.values(dir.props).forEach((l) => l.forEach((p) => { out[p.n] = out[p.n] || { name: p.n, type: p.t, required: false, def: p.d, lits: literals(p.t) }; })); return out; }
        return collect(start, {});
      }
      function review(catalog, src){
        const data = catalog.reactData, { tags, imports } = parseJSX(src), out = [];
        const say = (lv, line, msg) => out.push({ lv, line, msg });
        const iconNames = new Set(catalog.icons.filter((i) => i.react).map((i) => i.name));
        const ills = catalog.illustrations, illNames = new Set(ills.filter((i) => i.react).map((i) => i.react.name));
        const byValue = {}; catalog.tokens.forEach((t) => { if (t.light && t.castanha) (byValue[fold(t.light)] = byValue[fold(t.light)] || []).push(t.castanha); });
        const compByReact = {}; catalog.components.forEach((c) => { if (c.react) (compByReact[c.react.component] = compByReact[c.react.component] || []).push(c); });
        const PKG = catalog.packages.react;
        tags.forEach((t) => {
          // cor/tamanho cru em style (inclusive em tags HTML): sugere o token pelo valor E pela propriedade CSS
          t.props.filter((p) => p.name === "style" && p.expr).forEach((p) => {
            p.expr.replace(/([A-Za-z]+)\s*:\s*(['"]?)([^,'"}]+)\2/g, (m, key, q, val) => {
              (val.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\)|\b\d+px\b/g) || []).forEach((raw) => {
                let v = fold(raw); if (/^#[0-9a-f]{3}$/.test(v)) v = "#" + v.slice(1).split("").map((c) => c + c).join("");
                const k = fold(key), pref = /^color$/.test(k) ? ["colors-text"] : /background/.test(k) ? ["colors-surface", "colors-"] : /border.*color|outline/.test(k) ? ["colors-border"] :
                  /radius/.test(k) ? ["border-radius"] : /fontsize/.test(k) ? ["font-size"] : /(padding|margin|gap|width|height|top|left|right|bottom|inset)/.test(k) ? ["sizes"] : /border/.test(k) ? ["border-width", "colors-border"] : [];
                const all = byValue[v] || [], tok = all.filter((x) => pref.some((pp) => x.indexOf("--castanha-" + pp) === 0)).concat(all.filter((x) => !pref.some((pp) => x.indexOf("--castanha-" + pp) === 0)));
                say(tok.length ? "media" : "info", p.line, "Valor cru `" + raw + "` em `style` (" + key + ")" + (tok.length ? ": use `var(" + tok[0] + ")`" + (tok.length > 1 ? " (outros com o mesmo valor: " + tok.slice(1, 3).join(", ") + ")" : "") + "." : ". Prefira um token do DS (ferramenta `tokens`)."));
              });
              return m;
            });
          });
          if (!/^[A-Z]/.test(t.name)) return;
          const root = t.name.split(".")[0], dir = data.dirs[root], from = imports[root];
          if (!dir){ if (from === PKG) say("alta", t.line, "`<" + t.name + ">` não existe no castanha-react." + (near(root, Object.keys(data.dirs)).length ? " Você quis dizer " + near(root, Object.keys(data.dirs)).map((x) => "`" + x + "`").join(" ou ") + "?" : "")); return; }
          if (from && from !== PKG && !/castanha-react/.test(from)) return; // componente homônimo de outra lib
          if (!from && Object.keys(imports).length) say("info", t.line, "`" + root + "` não aparece no import: `import { " + root + " } from '" + PKG + "';`");
          const props = propsFor(data, t.name) || {}, names = Object.keys(props);
          t.props.filter((p) => !p.spread).forEach((p) => {
            const d = props[p.name];
            if (!d && SYN[p.name] && !HTML.test(p.name)){ const alt = SYN[p.name].filter((x) => props[x]); if (alt.length){ say("alta", p.line, "`" + t.name + "` não tem a prop `" + p.name + "`. No Castanha DS: " + alt.map((x) => "`" + x + "`" + (props[x].lits ? " (" + props[x].lits.join(", ") + ")" : "")).join(" ou ") + "."); return; } }
            if (!d){ if (!HTML.test(p.name)){ const s = near(p.name, names); say("alta", p.line, "`" + t.name + "` não tem a prop `" + p.name + "`." + (s.length ? " Você quis dizer " + s.map((x) => "`" + x + "`").join(" ou ") + "?" : "")); } return; }
            if (p.literal && /^boolean$/.test(String(d.type).trim()) && typeof p.value === "string") say("alta", p.line, "`" + p.name + "` é boolean em `<" + t.name + ">`; recebeu texto." + (p.name === "error" && props.supportingMessage ? " A mensagem vai em `supportingMessage`: `error supportingMessage=\"" + p.value + "\"`." : ""));
            if (p.literal && d.lits && d.lits.indexOf(String(p.value)) < 0) say("alta", p.line, "`" + p.name + "=\"" + p.value + "\"` não é aceito em `<" + t.name + ">`. Opções: " + d.lits.map((x) => "`" + x + "`").join(", ") + ".");
            if (p.literal && d.def != null && String(d.def) === String(p.value)) say("info", p.line, "`" + p.name + "=\"" + p.value + "\"` é o padrão do React; pode omitir.");
            const iconProp = /^(leadIcon|trailingIcon|icon)$/.test(p.name) || (root === "Icon" && p.name === "name");
            if (iconProp && p.literal && !iconNames.has(p.value)){ const s = near(p.value, Array.from(iconNames)); say("alta", p.line, "Ícone `" + p.value + "` não existe no castanha-icons." + (s.length ? " Parecidos: " + s.map((x) => "`" + x + "`").join(", ") + "." : " Use a ferramenta `icone`.")); }
            if (root === "Illustration" && p.name === "name" && p.literal && !illNames.has(p.value)){
              const fig = ills.find((i) => i.id === p.value || i.id.replace("/", "-") === p.value);
              say("alta", p.line, "Ilustração `" + p.value + "` não existe no castanha-illustrations." + (fig && fig.react ? " No pacote ela se chama `" + fig.react.name + "`." : " Use a ferramenta `ilustracao`."));
            }
          });
          names.forEach((n) => { const d = props[n]; if (d.required && n !== "children" && !t.props.some((p) => p.name === n || p.spread)) say("media", t.line, "`<" + t.name + ">` sem a prop obrigatória `" + n + "` (" + d.type + ")."); });
          if (props.children && props.children.required && !t.hasChildren && !t.props.some((p) => p.name === "children")) say("media", t.line, "`<" + t.name + ">` espera filhos (children).");
          // padrão do React diferente do Figma, quando a prop foi omitida
          (compByReact[t.name] || []).forEach((c) => (c.react.checks || []).filter((k) => k.kind === "padrao-diferente").forEach((k) => {
            const prop = (k.text.match(/em `([^`]+)`/) || [])[1], rp = prop && fold(prop).replace(/\s+/g, "");
            if (rp && !t.props.some((p) => fold(p.name) === rp)) say("info", t.line, "`<" + t.name + ">` sem `" + fold(prop) + "`: " + k.text.replace(/^Padrão diferente em `[^`]+`: /, ""));
          }));
        });
        return { tags: tags.filter((t) => /^[A-Z]/.test(t.name)).length, findings: out };
      }
      function reviewText(catalog, src){
        const r = review(catalog, src), LV = { alta: "🔴 Erro", media: "🟡 Atenção", info: "ℹ️ Nota" }, order = { alta: 0, media: 1, info: 2 };
        if (!r.tags) return "Não encontrei componentes (tags com inicial maiúscula) no trecho.";
        if (!r.findings.length) return "✅ Nenhum problema em " + r.tags + " componente(s): props, valores, ícones, ilustrações e tokens batem com o castanha-react e o DS.";
        const c = r.findings.reduce((o, f) => { o[f.lv] = (o[f.lv] || 0) + 1; return o; }, {});
        return r.tags + " componente(s) lidos · " + (c.alta || 0) + " erro(s), " + (c.media || 0) + " atenção, " + (c.info || 0) + " nota(s)\n\n" +
          r.findings.sort((a, b) => order[a.lv] - order[b.lv] || a.line - b.line).map((f) => "- " + LV[f.lv] + " (linha " + f.line + "): " + f.msg).join("\n");
      }
      
      module.exports = { generate, reviewText, review, parseJSX, propsFor };
      
    },
    "./server": function(module, exports, require){
      /**
       * MCP do Castanha DS — M1 consulta + M2 gerar e revisar JSX (docs/local/PLANO-MCP.md).
       *
       * Servidor MCP por stdio, sem dependências (Node 18+): JSON-RPC 2.0, uma mensagem por linha.
       * Lê o catálogo gerado no build (dist/mcp/catalog.json). Para usar fora do repo, aponte para o catálogo publicado:
       *   CASTANHA_CATALOG=https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/catalog.json node mcp/server.js
       *
       * Conectar no Claude Code (na pasta do repo):
       *   claude mcp add castanha-ds -- node mcp/server.js
       * HTTP (Streamable HTTP, para hospedar ou testar como servidor remoto):
       *   node mcp/server.js --http 8787   →  http://127.0.0.1:8787/mcp   (handleRequest: handler `fetch` para Workers/Deno/Edge)
       *
       * Ferramentas: listar_componentes · componente · docs · buscar · tokens · icone · ilustracao · diretrizes · divergencias
       *              gerar_jsx · revisar_codigo (M2, mcp/react.js)
       * Resources:   castanha://componente/{id} · castanha://docs/{id}/{tab}
       * Prompts:     implementar-tela · revisar-handoff · escrever-texto
       */
      "use strict";
      const fs = require("fs"), path = require("path");
      const VERSION = "0.3.0";
      const REACT = require("./react"); // M2: gerar_jsx e revisar_codigo
      const SITE_CATALOG = "https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/catalog.json";
      // catálogo: CASTANHA_CATALOG (arquivo ou URL) · o do repo (dist/mcp/) · o ao lado do arquivo único · o publicado no site
      const SRC = (typeof process !== "undefined" && process.env && process.env.CASTANHA_CATALOG) || (function(){
        if (typeof __dirname === "undefined" || !fs.existsSync) return SITE_CATALOG;
        return [path.join(__dirname, "..", "dist", "mcp", "catalog.json"), path.join(__dirname, "catalog.json")].find((f) => fs.existsSync(f)) || SITE_CATALOG;
      })();
      
      // ---------- catálogo ----------
      let C = null;
      async function catalog(){
        if (C) return C;
        if (/^https?:/.test(SRC)){ const r = await fetch(SRC); if (!r.ok) throw new Error("Catálogo indisponível: " + r.status + " " + SRC); C = await r.json(); }
        else C = JSON.parse(fs.readFileSync(SRC, "utf8"));
        C.components.forEach((c) => { c._text = fold([c.id, c.name, c.category, c.description, c.react && c.react.component, (c.tabs || []).map((t) => t.text).join(" ")].join(" ")); });
        return C;
      }
      const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const words = (q) => fold(q).split(/[^a-z0-9#-]+/).filter((w) => w.length > 1);
      function score(text, q){ const t = fold(text), ws = words(q); if (!ws.length) return 0; let s = 0; ws.forEach((w) => { if (t.indexOf(w) !== -1) s += 1 + (t.split(w).length - 2) * 0.1; }); return s / ws.length; }
      
      // ---------- busca de ícones ----------
      // Os nomes do [Caju] Icons são em inglês e as palavras-chave misturam pt e en (e 41 ícones não têm nenhuma):
      // a busca reduz plural, traduz termos comuns pt → en e pontua pela força do encontro.
      const PT_EN = { cartao: ["card"], casa: ["home"], inicio: ["home"], seta: ["arrow", "navigation", "go", "back"], direita: ["right"], esquerda: ["left"],
        cima: ["up"], baixo: ["down"], usuario: ["user"], pessoa: ["user"], perfil: ["user"], equipe: ["team"], time: ["team"], dinheiro: ["money", "balance", "value"],
        saldo: ["balance"], moeda: ["coin", "value"], pagamento: ["pay", "payment"], pagar: ["pay"], calendario: ["calendar"], data: ["calendar"], agenda: ["calendar"],
        busca: ["search"], buscar: ["search"], pesquisa: ["search"], lupa: ["search"], fechar: ["close"], adicionar: ["add", "plus"], mais: ["plus", "more"], menos: ["minus"],
        editar: ["edit"], excluir: ["delete"], apagar: ["delete"], lixeira: ["delete"], configuracao: ["settings"], ajuste: ["settings", "customize"], notificacao: ["notification"],
        sino: ["notification"], documento: ["document", "file"], arquivo: ["file", "folder", "archive"], pasta: ["folder"], olho: ["hide", "view"], visualizar: ["view"],
        esconder: ["hide"], compartilhar: ["share"], baixar: ["download"], enviar: ["send", "upload"], subir: ["upload"], mensagem: ["message", "chat"], conversa: ["chat"],
        telefone: ["smartphone", "call"], celular: ["smartphone"], carro: ["car"], onibus: ["bus"], trem: ["train"], aviao: ["travel"], viagem: ["travel"], transporte: ["transport", "mobility"],
        saude: ["health"], comida: ["food", "meal"], refeicao: ["meal"], cadeado: ["lock"], bloqueio: ["lock"], chave: ["key"], estrela: ["rate"], favorito: ["favorite"],
        coracao: ["favorite", "health"], alerta: ["warning"], aviso: ["warning"], informacao: ["information"], erro: ["error"], sucesso: ["check", "positive"], confirmar: ["check"],
        filtro: ["filter"], voltar: ["back"], avancar: ["go"], grafico: ["chart"], loja: ["shop"], empresa: ["business", "building"], relogio: ["timer", "clock"], camera: ["camera"],
        imagem: ["image"], foto: ["image", "camera"], link: ["link"], copiar: ["copy"], imprimir: ["printer"], localizacao: ["location", "pin"], mapa: ["location"], presente: ["awards"],
        premio: ["awards", "medal"], recibo: ["receipt"], comprovante: ["receipt", "file"], codigo: ["code", "barcode", "qr"], ajuda: ["support", "information"], suporte: ["support"],
        sair: ["logout"], entrar: ["login"], senha: ["key", "lock"], seguranca: ["safety", "lock"], escudo: ["safety"], educacao: ["education"], cultura: ["culture"], pet: ["pet"],
        maquininha: ["machine"], aproximacao: ["contactless"], virtual: ["virtual"], digital: ["virtual"] };
      const stem = (w) => w.replace(/oes$/, "ao").replace(/aes$/, "ao").replace(/ais$/, "al").replace(/eis$/, "el").replace(/(?<=[a-z]{3})s$/, "");
      const qWords = (q) => fold(q).split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !/^(de|do|da|para|com|um|uma|o|a|e|no|na|em|icone|icon)$/.test(w)).map(stem);
      /** Pontua um ícone: nome (tokens em inglês), palavras-chave (a primeira é o sentido principal) e categoria; termos pt viram en. */
      function iconScore(i, q){
        const ws = qWords(q); if (!ws.length) return 0;
        const tokens = i.name.split("-").filter((t) => !/^(line|fill|filled)$/.test(t)), kws = i.keywords.map((k) => stem(fold(k).trim())), cat = fold(i.category);
        let total = 0;
        ws.forEach((w) => {
          let best = 0;
          let byName = 0, byKw = 0;
          [[w, 1]].concat((PT_EN[w] || []).map((e) => [e, 0.85])).forEach(([x, f]) => {
            let tn = 0, tk = 0, tc = 0;
            if (tokens.indexOf(x) >= 0) tn = 5;
            else if (x.length > 2 && tokens.some((t) => t.indexOf(x) === 0)) tn = 3;
            kws.forEach((k, pos) => {
              if (k === x) tk = Math.max(tk, 6 - Math.min(pos, 4) * 0.5); // palavra-chave inteira: a primeira vale mais
              else if (k.split(/[^a-z0-9]+/).map(stem).indexOf(x) >= 0) tk = Math.max(tk, 4 - Math.min(pos, 4) * 0.3);
              else if (x.length > 3 && k.indexOf(x) >= 0) tk = Math.max(tk, 1.5);
            });
            if (cat.split(/[^a-z0-9]+/).indexOf(x) >= 0) tc = 1;
            byName = Math.max(byName, tn * f); byKw = Math.max(byKw, tk * f);
            best = Math.max(best, Math.max(tn, tk, tc) * f);
          });
          if (byName >= 4 && byKw >= 4) best += 0.5; // termo no nome E na palavra-chave: é "o" ícone do conceito
          total += best;
        });
        return total / ws.length - (i.deprecated ? 2 : 0);
      }
      function rankIcons(c, q, all){
        return c.icons.filter((i) => all || !i.deprecated).map((i) => [i, iconScore(i, q)]).filter((p) => p[1] >= 1.5)
          .sort((p, r) => r[1] - p[1] || p[0].name.length - r[0].name.length);
      }
      
      // ---------- busca de ilustrações ----------
      // Os nomes do [Caju] Illustrations são em pt (com alguns em inglês: empty-state, search-not-found, success, error) e quase
      // nenhuma tem descrição: a busca usa sinônimos (dinheiro → moeda, nota, cash…), plural e a posição do termo no nome.
      const ILL_SYN = { dinheiro: ["moeda", "moedas", "nota", "cash", "carteira", "financas"], grana: ["moeda", "cash"], pagamento: ["maquininha", "pix", "transferencia", "cartao"],
        card: ["cartao"], cartao: ["cartao", "cartoes"], vazio: ["empty"], vazia: ["empty"], nada: ["empty"], resultado: ["found", "search"], busca: ["search"],
        encontrado: ["found"], erro: ["error", "alert"], falha: ["error"], sucesso: ["success", "check", "concluido"], pronto: ["success", "concluido"], aviso: ["alert", "sino"],
        alerta: ["alert"], notificacao: ["sino", "alert", "notificacoes"], celular: ["celular"], telefone: ["celular"], smartphone: ["celular"], computador: ["notebook"],
        documento: ["documentos", "rg", "cnh", "papeis"], identidade: ["rg", "cnh"], seguranca: ["cadeado", "escudo", "seguranca"], senha: ["cadeado", "recuperacao"],
        presente: ["presente", "gema"], premio: ["trofeu", "medalha", "gema"], comemoracao: ["celebracao", "estalar"], festa: ["celebracao", "aniversario"],
        viagem: ["aviao", "malas", "viagem", "passagem"], transporte: ["onibus", "trem", "carro", "transporte", "bilhete"], comida: ["alimentos", "pizza", "cafe", "alimentacao"],
        saude: ["saude", "medico", "odonto", "fitness"], tempo: ["relogio", "ampulheta", "despertador"], espera: ["ampulheta", "relogio"], data: ["calendario"],
        grafico: ["graficos", "dashboards", "barra", "setores"], relatorio: ["relatorios", "planilha", "extrato"], pessoa: ["personagens"], personagem: ["personagens"],
        autenticacao: ["autenticacao", "biometrico", "facial", "selfie", "ocr", "sms"], login: ["login", "autenticacao"], loja: ["compras", "sacola"], compra: ["compras", "sacola"] };
      /** Pontua uma ilustração: tokens do nome (o primeiro token do nome vale mais), categoria e descrição; versões low-detail logo depois da principal. */
      function illScore(i, q){
        const ws = qWords(q); if (!ws.length) return 0;
        const parts = i.id.split("/"), cat = (parts[0] || "").split("-"), name = (parts[1] || "").split("-").map(stem), desc = fold(i.description).split(/[^a-z0-9]+/).map(stem);
        const pkg = i.react ? i.react.name.split("-").map(stem) : [];
        let total = 0;
        ws.forEach((w) => {
          let best = 0;
          [[w, 1]].concat((ILL_SYN[w] || []).map((e, k) => [stem(e), 0.85 - k * 0.02])).forEach(([x, f]) => { // o primeiro sinônimo é o mais próximo
            let sc = 0;
            const at = name.indexOf(x);
            if (at === 0) sc = 6; else if (at > 0) sc = 5 - Math.min(at, 3) * 0.3;
            else if (x.length > 3 && name.some((t) => t.indexOf(x) === 0)) sc = 3.5;
            if (cat.indexOf(x) >= 0 || fold(i.category).split(/[^a-z0-9]+/).map(stem).indexOf(x) >= 0) sc = Math.max(sc, 2.5);
            if (pkg.indexOf(x) >= 0) sc = Math.max(sc, 2.5); // nome no pacote (ex.: hub-*, interface-*)
            if (desc.indexOf(x) >= 0) sc = Math.max(sc, 3);
            best = Math.max(best, sc * f);
          });
          total += best;
        });
        return total / ws.length - (/low-detail/.test(i.id) ? 0.3 : 0) - (/^hero-/.test(i.id.split("/")[0]) ? 0.2 : 0);
      }
      function rankIlls(c, q){
        return c.illustrations.map((i) => [i, illScore(i, q)]).filter((p) => p[1] >= 2).sort((p, r) => r[1] - p[1] || p[0].id.length - r[0].id.length);
      }
      
      function findComponent(c, q){
        const f = fold(q).trim(), list = c.components;
        return list.find((x) => x.id === f) || list.find((x) => fold(x.name) === f) || list.find((x) => x.react && fold(x.react.component) === f) ||
          list.find((x) => fold(x.name).replace(/\s+/g, "-") === f.replace(/\s+/g, "-")) || null;
      }
      // distância de edição (erro de digitação: "tagg" → tag, "buton" → button)
      function lev(a, b){ const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++){ let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++){ const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; } } return d[b.length]; }
      function suggest(c, q){
        const f = fold(q).trim();
        return c.components.map((x) => { const keys = [x.id, fold(x.name), x.react ? fold(x.react.component) : ""].filter(Boolean);
          const near = Math.min.apply(null, keys.map((k) => lev(f, k))), s = score(keys.join(" "), q) + (near <= 2 ? 2 - near * 0.5 : 0);
          return [x, s]; }).filter((p) => p[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map((p) => p[0].id);
      }
      const KIND = { component: "Componente", "building-block": "Building block", resource: "Recurso", home: "Início", composition: "Composição" };
      const STATUS = { current: "publicado na lib, sem pendência", changed: "publicado, com alterações ainda não publicadas", unpublished: "não publicado na lib", branch: "só numa branch do Figma" };
      const pageUrl = (c, x) => c.site + "#/" + x.id;
      
      // ---------- formatação ----------
      function propsTable(rows){ return ["| Prop | Tipo | Padrão | Descrição |", "|---|---|---|---|"].concat(rows.map((p) => "| `" + p.name + (p.required ? "" : "?") + "` | `" + String(p.type).replace(/\|/g, "\\|") + "` | " + (p.default !== undefined ? "`" + p.default + "`" : "—") + " | " + (p.description || "").replace(/\|/g, "\\|") + " |")).join("\n"); }
      function componentSummary(c, x){
        const L = ["# " + x.name + " (`" + x.id + "`)", "", KIND[x.kind] + (x.category ? " · " + x.category : "") + (x.draft ? " · **docs em rascunho** (ainda sem revisão do time)" : "")];
        if (x.description) L.push("", x.description);
        const links = [["Playground", pageUrl(c, x)], ["Figma", x.figma], ["Zeroheight", x.zeroheight || (x.react && x.react.zeroheight)], ["Storybook", x.react && x.react.storybook]].filter((l) => l[1]);
        L.push("", "**Links:** " + links.map((l) => "[" + l[0] + "](" + l[1] + ")").join(" · "));
        if (x.figmaStatus) L.push("", "**Figma:** " + STATUS[x.figmaStatus] + ".");
        if (x.figmaProps && x.figmaProps.length) L.push("", "## Props no Figma", "", x.figmaProps.map((p) => "- **" + p.name + "** (" + p.type + ")" + (p.options ? ": " + p.options.join(", ") : "") + (p.default !== undefined ? " · padrão `" + p.default + "`" : "")).join("\n"));
        if (x.react){
          const r = x.react;
          L.push("", "## No castanha-react", "", "`<" + r.component + ">`" + (r.onlyStaging ? " · ainda só na staging" : "") + (r.tags.length ? " · tags: " + r.tags.join(", ") : ""));
          if (r.description) L.push("", r.description);
          if (r.import) L.push("", "```tsx\n" + r.import + "\n```");
          Object.keys(r.props).forEach((t) => { if (r.props[t].length) L.push("", (Object.keys(r.props).length > 1 ? "**" + t + "**\n\n" : "") + propsTable(r.props[t])); });
          if (r.figmaToReact.length){
            L.push("", "## Figma → React", "");
            if (r.liveMap) L.push(["| Figma | Playground | React | Nota |", "|---|---|---|---|"].concat(r.figmaToReact.map((m) => "| " + m.figma + " | " + m.playground + " | " + m.react + " | " + (m.note || "").replace(/\|/g, "\\|") + " |")).join("\n"));
            else L.push(r.figmaToReact.map((m) => "- **" + m.figma + "** (" + m.kind + ")" + (m.values ? ": " + Object.keys(m.values).map((k) => k + " → " + m.values[k]).join(", ") : "")).join("\n"));
          }
          if (r.checks.length) L.push("", "## Divergências Figma × React", "", r.checks.map((k) => "- [" + k.level + "] " + k.text).join("\n"));
          if (r.notes.length) L.push("", r.notes.map((n) => "> " + n).join("\n"));
        } else if (x.kind === "component") L.push("", "**No castanha-react:** sem componente equivalente (ainda).");
        if (x.tabs && x.tabs.length) L.push("", "## Docs", "", "Tabs: " + x.tabs.map((t) => "`" + t.id + "` (" + t.title + ")").join(", ") + ". Use a ferramenta `docs` para ler.");
        return L.join("\n");
      }
      
      // ---------- ferramentas ----------
      const TOOLS = [
        { name: "listar_componentes", description: "Lista os componentes do Castanha DS (Caju), com categoria, status no Figma e se tem par no castanha-react. Filtros opcionais.",
          inputSchema: { type: "object", properties: { categoria: { type: "string", description: "Página do Figma, ex.: Buttons, Text Fields, Feedback" }, tipo: { type: "string", enum: ["component", "building-block", "resource", "composition", "todos"], description: "Padrão: component" } } },
          run: async (a) => { const c = await catalog(), tipo = a.tipo || "component";
            const list = c.components.filter((x) => (tipo === "todos" || x.kind === tipo || (tipo === "resource" && x.kind === "home")) && (!a.categoria || fold(x.category) === fold(a.categoria)));
            const cats = {}; list.forEach((x) => { (cats[x.category || "Recursos"] = cats[x.category || "Recursos"] || []).push(x); });
            return Object.keys(cats).sort().map((k) => "## " + k + "\n" + cats[k].map((x) => "- **" + x.name + "** (`" + x.id + "`)" + (x.react ? " → `<" + x.react.component + ">`" : "") + (x.figmaStatus ? " · Figma: " + x.figmaStatus : "")).join("\n")).join("\n\n") +
              (tipo === "component" && !a.categoria ? "\n\n## Só no castanha-react (sem Figma)\n" + c.reactOnly.map((r) => "- `<" + r.name + ">`" + (r.description ? " — " + r.description : "")).join("\n") : "") || "Nenhum componente com esse filtro."; } },
        { name: "componente", description: "Tudo sobre um componente do Castanha DS: descrição, links (Figma, Storybook, zeroheight), status no Figma, props no Figma, props do castanha-react (tipo, padrão, descrição), import, tradução Figma → React e divergências conhecidas.",
          inputSchema: { type: "object", properties: { nome: { type: "string", description: "id (ex.: main-button), nome (Main Button) ou componente React (Button)" } }, required: ["nome"] },
          run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
            if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ". Use `listar_componentes` ou `buscar`.";
            return componentSummary(c, x); } },
        { name: "docs", description: "Texto da documentação de um componente ou recurso do Castanha DS: uma tab (uso, anatomia, estilos, acessibilidade, diretrizes, motion, conteúdo…) ou todas.",
          inputSchema: { type: "object", properties: { nome: { type: "string", description: "id ou nome do componente/recurso" }, tab: { type: "string", description: "id ou título da tab; vazio = todas" } }, required: ["nome"] },
          run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
            if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ".";
            if (!x.tabs || !x.tabs.length) return x.name + " ainda não tem docs no playground.";
            const tabs = a.tab ? x.tabs.filter((t) => fold(t.id) === fold(a.tab) || fold(t.title) === fold(a.tab)) : x.tabs;
            if (!tabs.length) return "Tab \"" + a.tab + "\" não existe em " + x.name + ". Tabs: " + x.tabs.map((t) => t.id).join(", ") + ".";
            return (x.draft ? "> Docs em rascunho: ainda sem revisão do time.\n\n" : "") + tabs.map((t) => "# " + x.name + " · " + t.title + "\n\n" + t.text).join("\n\n---\n\n") + "\n\nFonte: " + pageUrl(c, x); } },
        { name: "buscar", description: "Busca livre no Castanha DS: componentes e docs, tokens, ícones e ilustrações. Use para perguntas como \"qual componente para filtros?\" ou \"ícone de cartão\".",
          inputSchema: { type: "object", properties: { texto: { type: "string" }, limite: { type: "number", description: "Padrão 8 por tipo" } }, required: ["texto"] },
          run: async (a) => { const c = await catalog(), n = a.limite || 8, q = a.texto;
            const comps = c.components.map((x) => [x, score(x._text, q) + score(x.name + " " + x.id, q) * 2]).filter((p) => p[1] > 0.5).sort((p, r) => r[1] - p[1]).slice(0, n);
            const toks = c.tokens.map((t) => [t, score(t.name + " " + t.group, q)]).filter((p) => p[1] > 0.5).sort((p, r) => r[1] - p[1]).slice(0, n);
            const ics = rankIcons(c, q, false).slice(0, n);
            const ills = rankIlls(c, q).slice(0, n);
            const L = [];
            if (comps.length) L.push("## Componentes e docs\n" + comps.map((p) => "- **" + p[0].name + "** (`" + p[0].id + "`, " + KIND[p[0].kind].toLowerCase() + ")" + (p[0].description ? " — " + p[0].description.slice(0, 140) : "")).join("\n"));
            if (toks.length) L.push("## Tokens\n" + toks.map((p) => "- `" + p[0].name + "`" + (p[0].light ? " = " + p[0].light : "") + (p[0].castanha ? " · React: `" + p[0].castanha + "`" : "")).join("\n"));
            if (ics.length) L.push("## Ícones\n" + ics.map((p) => "- `" + p[0].name + "` (" + p[0].category + ")" + (p[0].react ? " · `" + p[0].react.export + "`" : " · fora do castanha-icons")).join("\n"));
            if (ills.length) L.push("## Ilustrações\n" + ills.map((p) => "- `" + (p[0].react ? p[0].react.name : p[0].id) + "` (" + p[0].category + ")" + (p[0].description ? " — " + p[0].description.slice(0, 100) : "")).join("\n"));
            return L.join("\n\n") || "Nada encontrado para \"" + q + "\"."; } },
        { name: "tokens", description: "Tokens do Castanha DS (cores, tamanhos, raios, bordas, tipografia, opacidade, elevação, motion, grids): valor no claro e no escuro, por viewport, o nome no castanha-tokens (--castanha-*) ou se só existe no playground.",
          inputSchema: { type: "object", properties: { busca: { type: "string", description: "Parte do nome, ex.: text-intense, sizes-16, radius, accent" }, grupo: { type: "string", description: "colors, sizes, border, font, opacity, elevations, motion, grids, text-style, motion-style…" } } },
          run: async (a) => { const c = await catalog();
            let list = c.tokens.filter((t) => (!a.grupo || fold(t.group) === fold(a.grupo)) && (!a.busca || fold(t.name).indexOf(fold(a.busca).replace(/^--/, "")) !== -1));
            if (!list.length) return "Nenhum token. Grupos: " + Array.from(new Set(c.tokens.map((t) => t.group))).join(", ") + ".";
            const more = list.length > 80 ? "\n\n(" + (list.length - 80) + " a mais; refine a busca.)" : ""; list = list.slice(0, 80);
            return ["| Token | Claro | Escuro | No React |", "|---|---|---|---|"].concat(list.map((t) => "| `" + t.name + "` | " + (t.viewport ? "mobile " + t.viewport.mobile + " · tablet " + t.viewport.tablet + " · desktop " + t.viewport.desktop : (t.light || "—")) + " | " + (t.dark || "igual") + " | " + (t.castanha ? "`" + t.castanha + "`" : "só no playground") + " |")).join("\n") +
              "\n\nNo código: `var(--token)`. Viewport: Mobile < 744 ≤ Tablet < 1366 ≤ Desktop." + more; } },
        { name: "icone", description: "Busca ícones do [Caju] Icons por nome ou palavra-chave (pt/en) e devolve o nome, a categoria e o uso no castanha-react (<Icon name> ou import).",
          inputSchema: { type: "object", properties: { busca: { type: "string" }, incluir_deprecated: { type: "boolean" } }, required: ["busca"] },
          run: async (a) => { const c = await catalog();
            const list = rankIcons(c, a.busca, a.incluir_deprecated).slice(0, 15);
            if (!list.length) return "Nenhum ícone para \"" + a.busca + "\".";
            return list.map((p) => { const i = p[0]; return "- `" + i.name + "` · " + i.category + (i.deprecated ? " · deprecated" : "") + (i.keywords.length ? " · " + i.keywords.slice(0, 6).join(", ") : "") + "\n  " + (i.react ? "React: `<Icon name=\"" + i.name + "\" />` ou `" + i.react.import + "`" : "Fora do castanha-icons (não dá para usar no React pelo nome)."); }).join("\n"); } },
        { name: "ilustracao", description: "Busca ilustrações do [Caju] Illustrations por nome, categoria ou uso e devolve o nome no castanha-illustrations (que pode ser diferente do Figma) e o import.",
          inputSchema: { type: "object", properties: { busca: { type: "string" } }, required: ["busca"] },
          run: async (a) => { const c = await catalog();
            const list = rankIlls(c, a.busca).slice(0, 12);
            if (!list.length) return "Nenhuma ilustração para \"" + a.busca + "\".";
            return list.map((p) => { const i = p[0]; return "- Figma `" + i.id + "` · " + i.category + (i.description ? " — " + i.description.slice(0, 120) : "") + "\n  " + (i.react ? "React: `<Illustration name=\"" + i.react.name + "\" />`" + (i.react.renamed ? " (nome diferente do Figma)" : "") + (i.react.drawingDiffers ? " · desenho do pacote difere do Figma" : "") : "Fora do castanha-illustrations."); }).join("\n"); } },
        { name: "diretrizes", description: "Diretrizes gerais do Castanha DS: escrita e conteúdo (vocabulário, formatação de dados, escrita para produto), motion, ilustração, patterns, treinamento. Sem tema, lista o que existe.",
          inputSchema: { type: "object", properties: { tema: { type: "string", description: "ex.: conteudo, formatação de dados, motion, ilustração, patterns" } } },
          run: async (a) => { const c = await catalog(), res = c.components.filter((x) => (x.kind === "resource" || x.kind === "home") && x.tabs);
            if (!a.tema) return res.map((x) => "## " + x.name + " (`" + x.id + "`)\n" + x.tabs.map((t) => "- `" + t.id + "` " + t.title).join("\n")).join("\n\n") + "\n\nPeça com `tema` (ex.: \"formatação de dados\") ou use `docs`.";
            const hits = []; res.forEach((x) => x.tabs.forEach((t) => { const s = score(x.name + " " + t.title, a.tema) * 3 + score(t.text, a.tema); if (s > 0.6) hits.push([x, t, s]); }));
            if (!hits.length) return "Nada para \"" + a.tema + "\". Rode sem tema para ver a lista.";
            return hits.sort((p, r) => r[2] - p[2]).slice(0, 2).map((h) => "# " + h[0].name + " · " + h[1].title + "\n\n" + h[1].text).join("\n\n---\n\n"); } },
        { name: "divergencias", description: "O que está diferente entre Figma, castanha-react e o playground (lista CONFERIR e check da stack), geral ou de um componente. Use antes de implementar para saber o que ainda está em aberto.",
          inputSchema: { type: "object", properties: { nome: { type: "string", description: "id ou nome do componente; vazio = resumo geral" }, incluir_resolvidos: { type: "boolean" } } },
          run: async (a) => { const c = await catalog(), D = c.divergences;
            if (!a.nome){ const g = {}; D.conferir.filter((x) => a.incluir_resolvidos || !x.resolved).forEach((x) => { g[x.group] = (g[x.group] || 0) + 1; });
              const lv = {}; D.stack.forEach((f) => { lv[f.level] = (lv[f.level] || 0) + 1; });
              return "## CONFERIR (Figma × código)\n" + Object.keys(g).map((k) => "- " + k + ": " + g[k]).join("\n") + "\n\n## Check Figma × castanha-react × playground\n" + Object.keys(lv).map((k) => "- " + k + ": " + lv[k]).join("\n") + "\n\nPeça com `nome` para ver os itens de um componente."; }
            const x = findComponent(c, a.nome); if (!x) return "Não achei \"" + a.nome + "\".";
            const nm = fold(x.name), conf = D.conferir.filter((k) => (a.incluir_resolvidos || !k.resolved) && (fold(k.text).indexOf(nm) !== -1 || fold(k.text).indexOf(x.id) !== -1));
            const st = D.stack.filter((f) => f.id === x.id);
            return "# Divergências · " + x.name + "\n\n## CONFERIR\n" + (conf.map((k) => "- **" + k.id + "** (" + k.group + ") " + k.text).join("\n") || "Nenhum item.") + "\n\n## Check da stack\n" + (st.map((f) => "- [" + f.level + "] " + f.msg).join("\n") || "Nenhum item."); } }
        ,
        { name: "gerar_jsx", description: "Gera o JSX do castanha-react para um componente a partir das props como estão no Figma (ex.: {\"Appearance\": \"Inversed\", \"Show Lead Icon\": false, \"Text Label\": \"Salvar\"}). Mesmo código do painel \"No React\" do playground: import, hooks e props, omitindo o que é padrão do React.",
          inputSchema: { type: "object", properties: {
            nome: { type: "string", description: "id, nome ou componente React (ex.: main-button, Tag, Button)" },
            props_figma: { type: "object", description: "Props do Figma → valor (Variant: nome da opção; Boolean: true/false; Text: o texto; Instance swap: nome do ícone)", additionalProperties: true },
            atributos: { type: "object", description: "Avançado: atributos do web component do playground (ex.: {\"appearance\": \"inversed\"})", additionalProperties: true },
            itens: { description: "Para componentes com itens (abas, chips, listas): quantidade ou lista de atributos por item" } }, required: ["nome"] },
          run: async (a) => { const c = await catalog(), x = findComponent(c, a.nome);
            if (!x) return "Não achei \"" + a.nome + "\". Parecidos: " + (suggest(c, a.nome).join(", ") || "nenhum") + ".";
            return "# " + x.name + " → `<" + ((x.react && x.react.component) || "?") + ">`\n\n" + await REACT.generate(c, x, a); } },
        { name: "revisar_codigo", description: "Revisa um trecho JSX/TSX que usa o castanha-react: componente inexistente ou sem import, prop inexistente, valor fora das opções, prop obrigatória faltando, ícone ou ilustração com nome errado, cor ou tamanho cru que tem token, e padrões do React diferentes do Figma.",
          inputSchema: { type: "object", properties: { codigo: { type: "string", description: "Trecho JSX/TSX (com os imports, se houver)" } }, required: ["codigo"] },
          run: async (a) => REACT.reviewText(await catalog(), a.codigo) }
      ];
      
      // ---------- resources e prompts ----------
      async function resourcesList(){ const c = await catalog(); return c.components.map((x) => ({ uri: "castanha://componente/" + x.id, name: x.name, description: (x.description || KIND[x.kind]).slice(0, 200), mimeType: "text/markdown" })); }
      const TEMPLATES = [
        { uriTemplate: "castanha://componente/{id}", name: "Componente", description: "Resumo do componente (links, props, Figma → React)", mimeType: "text/markdown" },
        { uriTemplate: "castanha://docs/{id}/{tab}", name: "Docs de uma tab", description: "Texto de uma tab da documentação", mimeType: "text/markdown" }
      ];
      async function resourceRead(uri){
        const c = await catalog(); let m = uri.match(/^castanha:\/\/componente\/([\w-]+)$/);
        if (m){ const x = findComponent(c, m[1]); if (!x) throw new Error("Componente não encontrado: " + m[1]); return componentSummary(c, x); }
        m = uri.match(/^castanha:\/\/docs\/([\w-]+)\/([\w-]+)$/);
        if (m){ const x = findComponent(c, m[1]), t = x && (x.tabs || []).find((y) => y.id === m[2]); if (!t) throw new Error("Tab não encontrada: " + uri); return "# " + x.name + " · " + t.title + "\n\n" + t.text; }
        throw new Error("URI desconhecida: " + uri);
      }
      const PROMPTS = [
        { name: "implementar-tela", description: "Implementar uma tela ou fluxo usando só componentes e tokens do Castanha DS no castanha-react.", arguments: [{ name: "descricao", description: "O que a tela faz", required: true }],
          text: (a) => "Implemente a tela abaixo com o Castanha DS (castanha-react). Regras: use só componentes e tokens do DS; antes de usar um componente, consulte `componente` (props, padrões e tradução Figma → React) e `divergencias`; gere o JSX de cada componente com `gerar_jsx` a partir das props do Figma; no fim, passe o código por `revisar_codigo`; ícones com `icone`, ilustrações com `ilustracao`; textos seguindo `diretrizes` (conteúdo). Se algo não existir no DS, diga em vez de inventar.\n\nTela: " + a.descricao },
        { name: "revisar-handoff", description: "Revisar o handoff de um componente: Figma × docs × castanha-react.", arguments: [{ name: "componente", description: "id ou nome", required: true }],
          text: (a) => "Revise o handoff do componente \"" + a.componente + "\" no Castanha DS. Use `componente`, `docs` e `divergencias`: compare as props do Figma com as do castanha-react, aponte padrões diferentes, valores sem tradução, docs em rascunho e itens abertos no CONFERIR. Termine com uma lista curta do que precisa de decisão do time." },
        { name: "escrever-texto", description: "Escrever ou revisar texto de interface seguindo as diretrizes de conteúdo da Caju.", arguments: [{ name: "texto", description: "Texto ou contexto da tela", required: true }],
          text: (a) => "Escreva ou revise o texto abaixo seguindo as diretrizes de conteúdo do Castanha DS (use `diretrizes` com os temas vocabulário, formatação de dados e escrita para produto, e a tab de conteúdo do componente com `docs`). Explique cada mudança em uma linha.\n\n" + a.texto }
      ];
      
      // ---------- MCP: uma mensagem JSON-RPC → resposta (ou null para notificação) ----------
      const ok = (id, result) => ({ jsonrpc: "2.0", id, result });
      const fail = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });
      async function handleMessage(m){
        if (!m || m.jsonrpc !== "2.0" || typeof m.method !== "string") return fail(m && m.id !== undefined ? m.id : null, -32600, "Requisição inválida");
        const p = m.params || {}, isNote = m.id === undefined;
        try {
          switch (m.method){
            case "initialize":
              return ok(m.id, { protocolVersion: p.protocolVersion || "2025-06-18", capabilities: { tools: {}, resources: {}, prompts: {} },
                serverInfo: { name: "castanha-ds", title: "Castanha DS", version: VERSION },
                instructions: "Fonte do Castanha DS (design system da Caju): componentes, docs, props do Figma e do castanha-react, tokens, ícones, ilustrações, diretrizes de conteúdo e divergências. Consulte antes de criar ou revisar interface com o DS; não invente componentes, props ou tokens." });
            case "ping": return ok(m.id, {});
            case "tools/list": return ok(m.id, { tools: TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: { readOnlyHint: true } })) });
            case "tools/call": {
              const t = TOOLS.find((x) => x.name === p.name);
              if (!t) return fail(m.id, -32602, "Ferramenta desconhecida: " + p.name);
              try { return ok(m.id, { content: [{ type: "text", text: await t.run(p.arguments || {}) }] }); }
              catch (e){ return ok(m.id, { content: [{ type: "text", text: "Erro: " + e.message }], isError: true }); }
            }
            case "resources/list": return ok(m.id, { resources: await resourcesList() });
            case "resources/templates/list": return ok(m.id, { resourceTemplates: TEMPLATES });
            case "resources/read": try { return ok(m.id, { contents: [{ uri: p.uri, mimeType: "text/markdown", text: await resourceRead(p.uri) }] }); } catch (e){ return fail(m.id, -32002, e.message); }
            case "prompts/list": return ok(m.id, { prompts: PROMPTS.map((x) => ({ name: x.name, description: x.description, arguments: x.arguments })) });
            case "prompts/get": { const x = PROMPTS.find((y) => y.name === p.name); if (!x) return fail(m.id, -32602, "Prompt desconhecido: " + p.name);
              return ok(m.id, { description: x.description, messages: [{ role: "user", content: { type: "text", text: x.text(p.arguments || {}) } }] }); }
            default: return isNote ? null : fail(m.id, -32601, "Método não suportado: " + m.method); // notificações (sem id) não têm resposta
          }
        } catch (e){ return isNote ? null : fail(m.id, -32603, e.message); }
      }
      
      // ---------- transporte HTTP (Streamable HTTP, só respostas JSON) como handler `fetch` padrão da web ----------
      // Serve para Node 18+ (abaixo, --http), Cloudflare Workers, Deno, Vercel/Netlify Edge: recebe um Request, devolve um Response.
      const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version" };
      async function handleRequest(req){
        const url = new URL(req.url), json = (body, status) => new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json" }, CORS) });
        if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
        if (!/\/mcp\/?$/.test(url.pathname)){
          if (req.method === "GET") return new Response("MCP do Castanha DS v" + VERSION + " · endpoint: POST " + url.origin + "/mcp\n", { headers: Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, CORS) });
          return new Response("Não encontrado", { status: 404, headers: CORS });
        }
        if (req.method === "GET") return new Response(null, { status: 405, headers: Object.assign({ Allow: "POST" }, CORS) }); // sem stream SSE: só respostas JSON
        if (req.method !== "POST") return new Response(null, { status: 405, headers: Object.assign({ Allow: "POST" }, CORS) });
        let body; try { body = await req.json(); } catch (e){ return json(fail(null, -32700, "JSON inválido"), 400); }
        const msgs = Array.isArray(body) ? body : [body], out = (await Promise.all(msgs.map(handleMessage))).filter(Boolean);
        if (!out.length) return new Response(null, { status: 202, headers: CORS }); // só notificações
        return json(Array.isArray(body) ? out : out[0]);
      }
      
      module.exports = { TOOLS, catalog, resourceRead, handleMessage, handleRequest, main, VERSION };
      /** Sobe o servidor: stdio (padrão) ou HTTP com --http [porta]. */
      function main(){
        const http = process.argv.indexOf("--http");
        if (http > 0){
          // servidor HTTP local: node mcp/server.js --http [porta] → http://127.0.0.1:<porta>/mcp
          const port = parseInt(process.argv[http + 1], 10) || 8787, host = process.env.HOST || "127.0.0.1";
          require("http").createServer(async (req, res) => {
            const chunks = []; for await (const c of req) chunks.push(c);
            const r = await handleRequest(new Request("http://" + (req.headers.host || host) + req.url, { method: req.method, headers: req.headers, body: /^(GET|HEAD|OPTIONS)$/.test(req.method) ? undefined : Buffer.concat(chunks) }));
            res.writeHead(r.status, Object.fromEntries(r.headers.entries())); res.end(Buffer.from(await r.arrayBuffer()));
          }).listen(port, host, () => process.stderr.write("MCP do Castanha DS em http://" + host + ":" + port + "/mcp\n"));
        } else {
          // stdio: uma mensagem JSON-RPC por linha (stdout só para o protocolo)
          const send = (msg) => { if (msg) process.stdout.write(JSON.stringify(msg) + "\n"); };
          require("readline").createInterface({ input: process.stdin }).on("line", (line) => {
            if (!line.trim()) return;
            let m; try { m = JSON.parse(line); } catch (e){ return send(fail(null, -32700, "JSON inválido")); }
            handleMessage(m).then(send);
          });
        }
      }
      if (typeof require !== "undefined" && require.main === module) main();
      
    }
  }, cache = {}, nodeRequire = typeof require === "function" ? require : null;
  function req(name){
    if (MODS[name]){ if (!cache[name]){ var m = { exports: {} }; cache[name] = m; MODS[name](m, m.exports, req); } return cache[name].exports; }
    return nodeRequire ? nodeRequire(name) : {}; // módulos do Node (fs, path, http, readline) quando houver
  }
  var api = req("./server");
  if (typeof module !== "undefined" && module.exports) module.exports = api; else globalThis.CastanhaMCP = api;
  if (nodeRequire && typeof module !== "undefined" && nodeRequire.main === module) api.main();
})();
