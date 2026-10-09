/**
 * "No Flutter" — tradução Figma → castanha_flutter abaixo do "No React" (F1 do plano de integração Flutter).
 *
 * Dados: integration/flutter-data.js (CDS.flutter), gerado por scripts/integration/build-flutter-manifest.js a partir do
 * castanha-mobile (staging, só leitura), e os mapas integration/flutter-map/<id>.json (CDS.flutterMaps, no mesmo arquivo).
 *
 * Por componente mostra: widget, import, link do Widgetbook, código Dart AO VIVO (lê os atributos do elemento no
 * preview e aplica o mapa), tabela Figma → Flutter e os parâmetros do widget (tipo, padrão, descrição).
 *
 * Formato do mapa (integration/flutter-map/<id>.json):
 *   element   seletor do elemento no preview · defaults: valor de cada atributo quando ausente (show-* ausente = "true")
 *   curated   true quando o mapa foi revisado à mão (sem ele, o painel avisa que é rascunho)
 *   imports   imports extras (ex.: "package:flutter/widgets.dart" para Text)
 *   widget    { class, ctor (construtor nomeado, ex.: "range"), if, args: [arg] } · lista de widgets = alternativas (vale o 1º cujo if passa)
 *   arg       { param, attr | value | code | tpl, map, bool: true|"not", eq, num, offset, scale, br, if, icon: true, positional: true,
 *               widget (widget aninhado), each + widget | widgets { seletor: widget } (um widget por filho do elemento),
 *               pick { each, attr, eq, tpl, all } (valor a partir dos filhos marcados: o 1º, ou todos num Set) }
 *             o valor é escrito conforme o tipo do parâmetro no manifesto: enum → Tipo.valor, String → '…',
 *             bool, número, IconData → CastanhaIcons.nome (icon: true); code entra como está
 *             scale multiplica (0.01: 0–100 → 0–1) · br lê número no formato brasileiro ("30.000,00")
 *             em code e tpl: {@attr} = valor cru · {q:attr} = texto entre aspas · {c:attr} = camelCase (CastanhaIcons.{c:icon})
 *             · {ill:attr} = constante de CastanhaIllustrations (com os nomes que mudaram no pacote)
 *             o argumento some quando o valor é o padrão do construtor (obrigatório nunca some)
 *   pre       linhas antes do widget (ex.: estado) · {@atributo} vira o valor atual
 *   figma     linhas da tabela: [prop do Figma, atributo do playground, parâmetro do Flutter, nota]
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  var WIDTH = 80; // dart format: 80 colunas
  var RESERVED = { "default": 1, "switch": 1, "class": 1, "new": 1, "in": 1, "is": 1, "do": 1, "if": 1, "else": 1, "for": 1, "null": 1, "true": 1, "false": 1, "this": 1, "super": 1, "enum": 1, "return": 1 };
  var observer = null;

  function el(tag, cls, text){ var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function attrs(n, a){ Object.keys(a).forEach(function(k){ if (a[k] != null) n.setAttribute(k, a[k]); }); return n; }
  function rich(n, s){
    String(s || "").split(/(`[^`]+`)/).forEach(function(part){
      if (/^`[^`]+`$/.test(part)) n.appendChild(el("code", null, part.slice(1, -1))); else if (part) n.appendChild(document.createTextNode(part));
    });
    return n;
  }
  function acc(label, description, body){
    var a = attrs(document.createElement("cds-accordion-item"), { label: label, description: description, "show-lead-item": "false", "show-divider": "true", collapsed: "" });
    if (!description) a.setAttribute("show-description", "false");
    a.appendChild(body);
    return a;
  }
  function table(head, rows, cls){
    var wrap = el("div", "pg-doc-table-wrap"), t = el("table", "pg-doc-table pg-react__table" + (cls ? " " + cls : ""));
    var tr = el("tr"); head.forEach(function(h){ tr.appendChild(el("th", null, h)); });
    var th = el("thead"); th.appendChild(tr); t.appendChild(th);
    var tb = el("tbody");
    rows.forEach(function(r){
      var cells = r.cells || r, row = el("tr", r.note ? "has-note" : null);
      cells.forEach(function(c){ var td = el("td"); if (c instanceof Node) td.appendChild(c); else rich(td, c); row.appendChild(td); });
      tb.appendChild(row);
      if (r.note){ var nr = el("tr", "pg-react__note"), td = el("td"); td.colSpan = cells.length; rich(td, r.note); nr.appendChild(td); tb.appendChild(nr); }
    });
    t.appendChild(tb); wrap.appendChild(t);
    return wrap;
  }

  // ---------- leitura do elemento ----------
  function scoped(find, defaults, i){
    var get = function(a){
      var n = find(), v = n ? n.getAttribute(a) : null;
      if (v === null) v = defaults && defaults[a] != null ? defaults[a] : null;
      return v === "" && !(defaults && defaults[a] === "") ? "true" : v;
    };
    get.el = find; get.i = i || 1;
    return get;
  }
  function reader(map, preview){
    var node = null;
    return scoped(function(){ return node && node.isConnected ? node : (node = preview.querySelector(map.element)); }, map.defaults);
  }
  function fill(t, v, get){
    return String(t).replace(/\{v\}/g, v == null ? "" : v).replace(/\{i\}/g, get.i)
      .replace(/\{q:([a-z-]+)\}/g, function(m, k){ var x = get(k); return dartStr(x == null ? "" : x); })
      .replace(/\{c:([a-z-]+)\}/g, function(m, k){ var x = get(k); return camel(String(x == null ? "" : x).replace(/\//g, "-")); })
      .replace(/\{ill:([a-z-]+)\}/g, function(m, k){ var x = String(get(k) || ""), ill = (CDS.flutter && CDS.flutter.ill) || {}; return ill[x] || camel(x.replace(/\//g, "-")); }) // nome do Dart (algumas ilustrações mudaram de nome no pacote)
      .replace(/\{@([a-z-]+)\}/g, function(m, k){ var x = get(k); return x == null ? "" : x; });
  }
  function test(get, ifs){
    return !ifs || Object.keys(ifs).every(function(k){
      var w = ifs[k], neg = w.charAt(0) === "!", v = get(k);
      return (String(v) === (neg ? w.slice(1) : w)) !== neg;
    });
  }
  function truthy(v){ return v != null && v !== "false"; }
  /** Filhos que casam com o seletor, sem os aninhados em outro que também casa (ex.: itens dentro de itens). */
  function top(host, sel){ return [].filter.call(host.querySelectorAll(sel), function(n){ var p = n.parentElement; while (p && p !== host){ if (p.matches(sel)) return false; p = p.parentElement; } return true; }); }

  // ---------- Dart ----------
  function camel(s){ return String(s).replace(/[-_ ]+([a-z0-9])/gi, function(m, c){ return c.toUpperCase(); }).replace(/^[A-Z]/, function(c){ return c.toLowerCase(); }); }
  function enumValue(type, v){ var n = camel(v); return type + "." + (RESERVED[n] ? n + "_" : n); }
  function dartStr(s){ return "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\$/g, "\\$") + "'"; }
  /** Parâmetro `name` da classe (o construtor nomeado usa os mesmos campos). */
  function paramOf(data, cls, name){
    var it = data.byClass[cls]; if (!it) return null;
    for (var i = 0; i < it.params.length; i++) if (it.params[i].n === name) return it.params[i];
    return null;
  }
  /** Resolve um argumento → { name, value (código Dart), kind } ou null (omitido). */
  function resolve(data, cls, a, get){
    if (!test(get, a.if)) return null;
    var p = paramOf(data, cls, a.param) || {}, type = String(p.t || "").replace(/\?$/, ""), def = p.req ? undefined : p.def;
    if (a.pick){ // valor a partir dos filhos marcados (ex.: o item selecionado do grupo)
      var host = get.el(), kids = host ? top(host, a.pick.each) : [], vals = [];
      [].forEach.call(kids, function(k, i){ var g = scoped(function(){ return k; }, a.pick.defaults, i + 1); if (g(a.pick.attr) === a.pick.eq) vals.push(dartStr(fill(a.pick.tpl, null, g))); });
      if (a.pick.all) return { name: a.param, value: vals.length ? "{" + vals.join(", ") + "}" : "<String>{}", kind: "code" };
      return { name: a.param, value: vals[0] || "null", kind: "code" };
    }
    if (a.code != null) return { name: a.param, value: fill(a.code, null, get), kind: "code", positional: a.positional };
    var v = a.value != null ? a.value : a.attr ? get(a.attr) : null;
    if (a.tpl) v = fill(a.tpl, v, get);
    if (a.bool || a.eq != null){
      var b = a.eq != null ? v === a.eq : a.bool === "not" ? !truthy(v) : truthy(v);
      if (!p.req && String(b) === String(def || "false")) return null;
      return { name: a.param, value: String(b), kind: "bool" };
    }
    if (v == null || v === "") return null;
    if (a.map && a.map[v] != null) v = a.map[v];
    if (a.br) v = String(v).replace(/\./g, "").replace(",", ".");
    var out;
    if (a.icon) out = "CastanhaIcons." + camel(v);
    else if (a.num || a.br || /^(int|double|num)$/.test(type)){
      var n = parseFloat(v) * (a.scale || 1) + (a.offset || 0); if (isNaN(n)) return null;
      n = Math.round(n * 1000) / 1000;
      out = type === "double" && /^-?\d+$/.test(String(n)) ? n + ".0" : String(n);
      if (def != null && parseFloat(def) === n) return null;
    }
    else if (data.enums[type]) out = enumValue(type, v);
    else out = dartStr(v);
    if (def != null && def === out) return null;
    return { name: a.param, value: out, kind: data.enums[type] ? "enum" : a.icon || /^(int|double|num)$/.test(type) ? "code" : "str", positional: a.positional };
  }
  /** Widget em linhas de segmentos [classe, texto]: Classe(arg: valor, …) — uma linha se couber em 80 colunas. */
  function widget(data, w, get, ind, out, trail){
    if (Array.isArray(w)){ for (var k = 0; k < w.length; k++) if (test(get, w[k].if)) return widget(data, w[k], get, ind, out, trail); return false; }
    if (!test(get, w.if)) return false;
    var name = w.class + (w.ctor ? "." + w.ctor : "");
    var args = [];
    (w.args || []).forEach(function(a){
      if (!test(get, a.if)) return;
      if (a.each){ // lista: um widget por filho do elemento (ex.: itens das abas); widgets: um tipo por seletor (ex.: Input e Filter Chips)
        var host = get.el(), list = host ? top(host, a.each) : [], items = [];
        [].forEach.call(list, function(child, k){
          var node = a.widget; if (a.widgets) Object.keys(a.widgets).forEach(function(sel){ if (child.matches(sel)) node = a.widgets[sel]; });
          if (node) items.push({ get: scoped(function(){ return child; }, node.defaults, k + 1), node: node });
        });
        args.push({ name: a.param, list: items });
        return;
      }
      if (a.widget){ args.push({ name: a.param, node: a.widget, get: get }); return; }
      var r = resolve(data, w.class, a, get); if (r) args.push(r);
    });
    args.sort(function(x, y){ return (y.positional ? 1 : 0) - (x.positional ? 1 : 0); }); // posicionais antes dos nomeados
    var flat = args.every(function(a){ return !a.node && !a.list; }) ? args.map(function(a){ return (a.positional ? "" : a.name + ": ") + a.value; }).join(", ") : null;
    var tail = trail || "";
    if (flat != null && (ind + name + "(" + flat + ")" + tail).length <= WIDTH){
      var line = [[null, ind], ["t", name], [null, "("]];
      args.forEach(function(a, i){ if (i) line.push([null, ", "]); if (!a.positional) line.push(["a", a.name], [null, ": "]); line.push([a.kind === "str" ? "v" : "e", a.value]); });
      line.push([null, ")" + tail]); out.push(line);
      return true;
    }
    out.push([[null, ind], ["t", name], [null, "("]]);
    args.forEach(function(a){
      var pad = ind + "  ";
      if (a.list){
        out.push([[null, pad], ["a", a.name], [null, ": ["]]);
        a.list.forEach(function(x){ widget(data, x.node, x.get, pad + "  ", out, ","); });
        out.push([[null, pad + "],"]]);
      } else if (a.node){
        var start = out.length;
        widget(data, a.node, a.get, pad, out, ",");
        if (out[start]) out[start].splice(1, 0, ["a", a.name], [null, ": "]);
      } else out.push([[null, pad]].concat(a.positional ? [] : [["a", a.name], [null, ": "]]).concat([[a.kind === "str" ? "v" : "e", a.value], [null, ","]]));
    });
    out.push([[null, ind + ")" + tail]]);
    return true;
  }
  function snippet(data, it, get){
    // castanha_flutter reexporta ícones, ilustrações e tokens: um import só (mais os extras do mapa, ex.: widgets do Flutter)
    var lines = ["package:castanha_flutter/castanha_flutter.dart"].concat(it.map.imports || []).map(function(u){ return [["k", "import"], [null, " "], ["v", "'" + u + "'"], [null, ";"]]; });
    lines.push([]);
    (it.map.pre || []).forEach(function(l){ lines.push([[null, l.replace(/\{@([A-Za-z-]+)\}/g, function(m, a){ var v = get(a); return v == null ? "" : v; })]]); });
    if (it.map.pre) lines.push([]);
    widget(data, it.map.widget, get, "", lines, "");
    return lines;
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
  function prepare(data){
    if (data.byClass) return;
    data.byClass = {};
    Object.keys(data.items).forEach(function(k){ data.byClass[data.items[k].class] = data.items[k]; });
    Object.keys(data.extra || {}).forEach(function(k){ data.byClass[k] = data.extra[k]; }); // classes de valor e de itens (ex.: CastanhaTabItem)
  }

  // Núcleo puro (sem DOM) para gerar o Dart fora do navegador (check com o dart analyze)
  CDS.flutterCore = { snippet: function(data, it, get){ prepare(data); return snippet(data, it, get); }, scoped: scoped, text: function(lines){ return lines.map(function(l){ return l.map(function(s){ return s[1]; }).join(""); }).join("\n"); } };

  /** Renderiza a seção "No Flutter" de `def` em `root`, ligada ao `preview`. */
  CDS.renderFlutter = function(def, preview, root){
    if (observer){ observer.disconnect(); observer = null; }
    root.innerHTML = "";
    var data = CDS.flutter, it = data && data.items[def.id];
    root.hidden = !data || !!def.resource || def.composition || def.template;
    if (root.hidden) return;
    prepare(data);
    var map = (CDS.flutterMaps || {})[def.id];
    if (it) it.map = map;

    var head = root.appendChild(el("div", "pg-react__head"));
    var ttl = head.appendChild(el("div", "pg-react__ttl"));
    var h2 = ttl.appendChild(el("h2", "pg-react__title"));
    h2.id = "flutter-title";
    h2.appendChild(attrs(document.createElement("cds-icon"), { icon: "flutter-fill", size: "large", appearance: "neutral", "aria-hidden": "true" }));
    h2.appendChild(document.createTextNode("No Flutter"));
    var sub = ttl.appendChild(el("p", "pg-react__sub"));
    if (it){ sub.appendChild(el("code", null, it.class)); sub.appendChild(document.createTextNode(" · castanha_flutter")); }
    else sub.textContent = "castanha_flutter";
    sub.appendChild(document.createTextNode(" · " + data.source.ref.replace(/^origin\//, "") + " de " + data.source.date.split("-").reverse().join("/")));

    var tagsRow = root.appendChild(el("div", "pg-react__tags"));
    function tag(app, label, tip){ var t = tagsRow.appendChild(attrs(document.createElement("cds-tag"), { appearance: app, label: label, "show-lead-item": "false" })); if (CDS.kit && tip) CDS.kit.lazyTip(t, tip, { label: label }); }
    if (!it){
      tag("neutral", def.block ? "Building block" : "Sem equivalente no Flutter");
      root.appendChild(el("p", "pg-react__p", def.block
        ? "Peça interna do Figma (nome com ponto). No Flutter ela fica dentro do widget que a usa, sem classe pública."
        : "Existe no Figma e aqui, mas ainda não tem widget no castanha_flutter."));
      return;
    }
    if (map && map.curated) tag("positive", "Dart ao vivo", "Mapa Figma → Flutter revisado: o código abaixo acompanha os controles do playground.");
    else if (map) tag("warning", "Mapa em rascunho", "Gerado a partir do mapa do React e dos parâmetros do Flutter. Ainda não foi revisado.");
    else tag("neutral", "Mapa ainda não feito", "Por enquanto: o import e os parâmetros do widget.");
    var TAGS = { available: ["positive", "Disponível"], newTag: ["warning", "Novo"], soon: ["neutral", "Em breve"], refactor: ["warning", "Melhorado"], deprecated: ["negative", "Depreciado"], noFigma: ["informative", "Sem Figma"] };
    (it.tags || []).forEach(function(t){ if (TAGS[t]) tag(TAGS[t][0], TAGS[t][1], "Situação do componente no Widgetbook."); });
    tag(it.via === "code-connect" ? "informative" : "neutral", it.via === "code-connect" ? "Casado pelo Code Connect" : "Casado pelo nome",
      it.via === "code-connect" ? "O node do Figma deste componente está no Code Connect do castanha-mobile." : "Casado pelo nome da classe ou da story do Widgetbook (sem Code Connect).");

    // F2: saúde Figma × Flutter (scripts/integration/check-flutter-stack.js) — etiqueta com o pior nível
    var CK = { alta: ["negative", "Alta"], media: ["warning", "Média"], info: ["neutral", "Informativo"] }, checks = it.checks || [];
    var worst = ["alta", "media"].filter(function(l){ return checks.some(function(c){ return c.l === l; }); })[0];
    var nAlert = checks.filter(function(c){ return c.l !== "info"; }).length;
    if (worst) tag(CK[worst][0], nAlert + (nAlert === 1 ? " divergência" : " divergências") + " Figma × Flutter", "Check em três vértices (Figma × castanha_flutter × playground). Detalhes no bloco \"Saúde Figma × Flutter\", abaixo.");
    else tag("positive", "Check Figma × Flutter ok", "Nenhuma divergência que mude o resultado entre as props do Figma e os parâmetros do Flutter.");

    if (it.doc){ var dp = root.appendChild(el("p", "pg-react__p")); rich(dp, it.doc + " "); dp.appendChild(el("span", "pg-react__src", "(dartdoc)")); }

    function block(title, label){
      var b = root.appendChild(el("div", "pg-react__code"));
      b.appendChild(el("h3", "pg-react__h3", title));
      var pr = b.appendChild(el("pre", "pg-react__pre")); pr.setAttribute("aria-label", label); pr.tabIndex = 0;
      return { box: b, pre: pr };
    }
    var imp = block("Import", "Import do castanha_flutter"), code = map ? block("Código ao vivo", "Código Dart gerado a partir dos controles") : null, text = "";
    var copy = (code || imp).box.appendChild(CDS.docMainButton ? CDS.docMainButton("Copiar código") : el("button", null, "Copiar código"));
    copy.classList.add("pg-react__copy");
    copy.addEventListener("click", function(){
      var done = function(){ if (CDS.docToast) CDS.docToast("Código copiado"); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function(){}); else done();
    });

    var get = map ? reader(map, preview) : null, live = [];
    function render(){
      var lines = map ? snippet(data, it, get) : [[["k", "import"], [null, " "], ["v", "'package:castanha_flutter/castanha_flutter.dart'"], [null, ";"]]];
      var cut = -1; for (var i = 0; i < lines.length; i++) if (!lines[i].length){ cut = i; break; }
      var top = cut < 0 ? lines : lines.slice(0, cut), body = cut < 0 ? [] : lines.slice(cut + 1);
      var t1 = paint(imp.pre, top), t2 = code ? paint(code.pre, body) : "";
      text = t2 ? t1 + "\n\n" + t2 : t1;
      live.forEach(function(f){ f(); });
    }

    // Parâmetros do construtor (dartdoc dos campos e argDescriptions do Widgetbook)
    var ps = it.params.filter(function(p){ return !p.a11y; }), a11y = it.params.filter(function(p){ return p.a11y; });
    if (ps.length){
      var box = root.appendChild(el("div", "pg-react__props"));
      var ph = box.appendChild(el("h3", "pg-react__h3", "Parâmetros"));
      box.appendChild(table(["Parâmetro", "Tipo", "Padrão", "Descrição"], ps.map(function(p){
        var t = p.t || "—", en = data.enums[String(t).replace(/\?$/, "")];
        return ["`" + p.n + "`" + (p.req ? " (obrigatório)" : ""), "`" + t + "`" + (en ? " · " + en.map(function(v){ return "`" + v + "`"; }).join(" ") : ""), p.def ? "`" + p.def + "`" : "—", p.d || ""];
      }), "is-props"));
      ph.appendChild(el("span", "pg-react__count", ps.length + (ps.length === 1 ? " parâmetro" : " parâmetros") + (a11y.length ? " · mais " + a11y.map(function(p){ return p.n; }).join(", ") + " (acessibilidade)" : "")));
      (it.constructors || []).forEach(function(c){
        var cp = box.appendChild(el("p", "pg-react__p"));
        rich(cp, "Construtor `" + it.class + "." + c.n + "`" + (c.d ? ": " + c.d : "") + " Parâmetros: " + c.params.filter(function(n){ return n !== "key"; }).map(function(n){ return "`" + n + "`"; }).join(", ") + ".");
      });
    }

    if (map && map.figma){
      var rows = map.figma.map(function(r){
        var now = el("code", "pg-react__now");
        if (/^[a-z-]+$/.test(r[1])) live.push(function(){ var v = get(r[1]); now.textContent = v == null ? "—" : v; });
        else now.textContent = "—";
        var codes = function(x){ return x === "—" ? "—" : x.split(" ").map(function(w){ return /^[·+]$/.test(w) ? w : "`" + w + "`"; }).join(" "); };
        return { cells: [r[0], codes(r[1]), codes(r[2]), now], note: r[3] };
      });
      root.appendChild(acc("Figma → Flutter", "Como cada prop do Figma vira parâmetro no Flutter. \"Agora\" segue os controles", table(["Figma", "Playground", "Flutter", "Agora"], rows)));
    }

    if (checks.length){
      root.appendChild(acc("Saúde Figma × Flutter", checks.length + (checks.length === 1 ? " item" : " itens") + " do check em três vértices (relatório: Stack Flutter)",
        table(["Nível", "Tipo", "O quê"], checks.map(function(c){
          return [attrs(document.createElement("cds-tag"), { appearance: CK[c.l][0], label: CK[c.l][1], "show-lead-item": "false" }), "`" + c.t + "`", c.m];
        }), "is-checks")));
    }

    var lb = root.appendChild(el("div", "pg-react__useful"));
    lb.appendChild(el("h3", "pg-react__h3", "Links úteis"));
    var ul = lb.appendChild(el("ul", "pg-react__list"));
    [[it.widgetbook, "Widgetbook", "doc e stories do widget no castanha-mobile (precisa da VPN da Caju)", false, "flutter-fill"],
     [def.figma, "Figma", "componente no [CastanhaDS] Components", false, "figma-line"],
     ["#/relatorio/stack-flutter", "Saúde da stack Flutter", "cobertura e check Figma × castanha_flutter × playground", true]].forEach(function(l){
      if (!l[0]) return;
      var li = ul.appendChild(el("li"));
      li.appendChild(attrs(document.createElement("cds-link"), { label: l[1], href: l[0], target: l[3] ? null : "_blank", appearance: "neutral", icon: l[3] ? null : l[4] || "link-line", "show-trailing-item": l[3] ? "false" : null }));
      li.appendChild(document.createTextNode(" — " + l[2]));
    });

    render();
    if (map && window.MutationObserver){
      var queued = false;
      observer = new MutationObserver(function(){ if (queued) return; queued = true; setTimeout(function(){ queued = false; render(); }, 16); });
      observer.observe(preview, { subtree: true, childList: true, attributes: true });
    }
  };
})();
