/* Comparar componentes (Ferramentas): até 3 componentes lado a lado, com seções Figma (Design), React e Flutter
   (pedido do Gustavo, 20/10, a partir das fichas de comparação de celulares: 3 colunas escolhidas na busca e linhas em seções).
   Nada de dado novo: tudo vem do que o portal já lê.
   · Figma: playgrounds (página e tipo), CDS.figmaStatus (publicação) e integration/figma-props.tsv (props lidas via MCP)
   · React: CDS.react (castanha-react, manifesto e mapas de integration/prop-map/), checks do stack-check
   · Flutter: CDS.flutter e CDS.flutterMaps (castanha_flutter, mapas de integration/flutter-map/)
   Escolha: Async Select Input, sem building blocks até ligar o Switch Mostrar building blocks (D370). Seções: Table do DS (sem seleção, sem ordenação), uma por stack.
   A escolha fica na URL (#/comparar?c=a,b,c) para compartilhar a comparação. D368
   Débitos (D370): embaixo de cada componente, os itens do docs/CONFERIR.md ligados a ele, pelo CDS.debitos
   (scripts/debitos.js, D367). Só para quem lê o registro (perfil Completo e servidor local), como a tab Débitos. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "comparar", name: "Comparar componentes", resource: true, lede: "Até 3 componentes lado a lado no Figma, no React e no Flutter.", order: 7 });

  var c = function(t, a, k){ return CDS.create(t, a, k); };
  function txt(tag, cls, t){ var e = c(tag, null, cls); e.textContent = t; return e; }
  var PADRAO = ["main-button", "icon-button", "drop-button"], N = 3;
  var NADA = "—";

  // ---------- dados ----------
  function lista(){ return (CDS.playgrounds || []).filter(function(p){ return !p.resource && !p.composition && !p.notFound && !p.hidden; }); }
  function porId(id){ return lista().filter(function(p){ return p.id === id; })[0] || null; }
  function tipo(p){ return p.block ? "Building block" : p.template ? "Template" : "Componente"; }

  // integration/figma-props.tsv: node<TAB>nome<TAB>Prop=V:padrão:op1|op2 ; Prop=B:1|0 ; Prop=T ; Prop=I:ícone ; Prop=S
  var FP = null, fpPronto = null;
  function lerProps(){
    if (fpPronto) return fpPronto;
    fpPronto = fetch("integration/figma-props.tsv").then(function(r){ if (!r.ok) throw new Error(r.status); return r.text(); }).then(function(t){
      var out = { byNode: {}, byName: {}, lido: (t.match(/em (\d{4})-(\d{2})-(\d{2})/) || []).slice(1).reverse().join("/") };
      t.split("\n").forEach(function(l){
        if (!l || l[0] === "#") return;
        var p = l.split("\t"); if (p.length < 3) return;
        var props = p[2].split(";").filter(Boolean).map(function(s){
          var i = s.indexOf("="), nome = s.slice(0, i), v = s.slice(i + 1).split(":");
          return { nome: nome, k: v[0], padrao: v[1], ops: v[2] ? v[2].split("|") : [] };
        });
        out.byNode[p[0]] = out.byName[p[1]] = props;
      });
      FP = out; return out;
    }).catch(function(){ FP = { byNode: {}, byName: {}, falhou: true }; return FP; });
    return fpPronto;
  }
  function propsFigma(p){
    if (!FP || !p) return null;
    var m = String(p.figma || "").match(/node-id=(\d+)-(\d+)/);
    return (m && FP.byNode[m[1] + "-" + m[2]]) || FP.byName[p.name] || null;
  }
  var PUB = { current: "Publicado", changed: "Publicado com alterações pendentes", unpublished: "Não publicado", branch: "Não publicado · em branch", "branch-update": "Melhoria em branch" };
  var PUB_DESC = { current: "Sem alterações pendentes", changed: "Há alterações por publicar", unpublished: "Fora da lib",
    branch: "Ainda não está na main", "branch-update": "A melhoria está numa branch" };

  function plural(n, um, varios){ return n + " " + (n === 1 ? um : varios); }
  function semCrase(s){ return String(s || "").replace(/`/g, ""); }
  function nomes(l, max){ max = max || 3; return l.length <= max ? l.join(", ") : l.slice(0, max).join(", ") + " e mais " + (l.length - max); }
  // Divergências do check da stack: alta · media · info
  function diverg(checks){
    checks = checks || [];
    if (!checks.length) return { text: "Nenhuma", description: "Sem divergência no check da stack", icon: "check-line" };
    var n = { alta: 0, media: 0, info: 0 }; checks.forEach(function(x){ n[x.level || x.l] = (n[x.level || x.l] || 0) + 1; });
    var partes = [];
    if (n.alta) partes.push(plural(n.alta, "alta", "altas"));
    if (n.media) partes.push(plural(n.media, "média", "médias"));
    if (n.info) partes.push(plural(n.info, "informativa", "informativas"));
    var prim = checks.slice().sort(function(a, b){ var o = { alta: 0, media: 1, info: 2 }; return o[a.level || a.l] - o[b.level || b.l]; })[0];
    return { text: partes.join(" · "), description: semCrase(prim.msg || prim.m), icon: n.alta || n.media ? "warning-line" : false };
  }
  // Props do Figma que chegam à stack, pelas linhas [Figma, atributo, prop da stack, nota] do mapa curado
  function chegam(linhas, total){
    if (!linhas || !linhas.length) return null;
    var vistas = {}, fora = [];
    linhas.forEach(function(r){ if (!r[0] || r[0] === "—") return; var ok = r[2] && r[2] !== "—"; if (!(r[0] in vistas) || ok) vistas[r[0]] = ok; });
    Object.keys(vistas).forEach(function(k){ if (!vistas[k]) fora.push(k); });
    var n = Object.keys(vistas).length - fora.length, de = Math.max(total || 0, Object.keys(vistas).length);
    return { text: n + " de " + de, description: fora.length ? "Não chegam: " + nomes(fora) : "Todas as props mapeadas chegam", icon: false };
  }

  // ---------- linhas de cada seção ----------
  function vazio(){ return { text: NADA, description: "", icon: false }; }
  function figmaLinhas(ps){
    return [
      ["Página no Figma", function(p){ return { text: p.block ? "Building blocks" : p.category || NADA, description: tipo(p), icon: false }; }],
      ["Publicação na lib", function(p){ var s = (CDS.figmaStatus || { items: {} }).items[p.id];
        if (s === "unpublished" && p.block) return { text: "Não publicado · building block", description: "Fora da publicação de propósito", icon: false };
        return s ? { text: PUB[s] || s, description: PUB_DESC[s] || "", icon: s === "current" ? "check-line" : false } : { text: "Sem leitura", description: "Fora da última leitura", icon: false }; }],
      ["Props no Figma", function(p){ var l = propsFigma(p);
        if (!l) return { text: "Sem leitura", description: FP && FP.falhou ? "Não carregou agora: recarregue a página" : "Props ainda não lidas do Figma", icon: false };
        var k = { V: 0, B: 0, T: 0, I: 0, S: 0 }; l.forEach(function(x){ k[x.k] = (k[x.k] || 0) + 1; });
        var d = [];
        if (k.V) d.push(plural(k.V, "variante", "variantes"));
        if (k.B) d.push(plural(k.B, "booleana", "booleanas"));
        if (k.T) d.push(plural(k.T, "texto", "textos"));
        if (k.I) d.push(plural(k.I, "troca de instância", "trocas de instância"));
        if (k.S) d.push(plural(k.S, "slot", "slots"));
        return { text: String(l.length), description: d.join(" · "), icon: false }; }]
    ].map(function(r){ return { item: r[0], cel: ps.map(function(p){ return p ? r[1](p) : vazio(); }) }; });
  }
  // Uma linha por prop do Figma (união das props dos escolhidos, na ordem em que aparecem)
  function propLinhas(ps){
    var ordem = [], visto = {};
    ps.forEach(function(p){ (propsFigma(p) || []).forEach(function(x){ if (!visto[x.nome]){ visto[x.nome] = 1; ordem.push(x.nome); } }); });
    return ordem.map(function(nome){
      return { item: nome, cel: ps.map(function(p){
        var x = (propsFigma(p) || []).filter(function(y){ return y.nome === nome; })[0];
        if (!x) return vazio();
        if (x.k === "V") return { text: x.ops.join(", "), description: "Variante · padrão " + x.padrao, icon: false };
        if (x.k === "B") return { text: "Booleana", description: "Padrão " + (x.padrao === "1" ? "ligado" : "desligado"), icon: false };
        if (x.k === "T") return { text: "Texto", description: "", icon: false };
        if (x.k === "I") return { text: "Troca de instância", description: x.padrao ? "Padrão " + x.padrao : "", icon: false };
        return { text: "Slot", description: "", icon: false };
      }) };
    });
  }
  function reactDe(p){ return (CDS.react && CDS.react.items[p.id]) || null; }
  function reactLinhas(ps){
    return [
      ["No castanha-react", function(p){ var r = reactDe(p);
        if (r && r.status === "react") return { text: r.component, description: r.via === "code-connect" ? "Ligado pelo Code Connect" : "Ligado pela story do Storybook", icon: "check-line" };
        if (p.block || (r && r.status === "building-block")) return { text: "Sem par", description: "Building block", icon: false };
        return { text: "Não existe", description: "Só no Figma por enquanto", icon: "close-line" }; }],
      ["Props no React", function(p){ var r = reactDe(p); if (!r || r.status !== "react") return vazio();
        var d = CDS.react.dirs[r.dir], l = (d && d.props && (d.props[r.component] || d.props[Object.keys(d.props)[0]])) || [];
        return { text: String(l.length), description: nomes(l.map(function(x){ return x.n; })), icon: false }; }],
      ["Props que chegam", function(p){ var r = reactDe(p); if (!r || r.status !== "react") return vazio();
        return chegam(r.map && r.map.figma, (propsFigma(p) || []).length) || { text: "Sem mapa", description: "Ainda sem a tradução Figma → React", icon: false }; }],
      ["Divergências", function(p){ var r = reactDe(p); if (!r || r.status !== "react") return vazio(); return diverg(r.checks); }]
    ].map(function(r){ return { item: r[0], cel: ps.map(function(p){ return p ? r[1](p) : vazio(); }) }; });
  }
  function flutterDe(p){ return (CDS.flutter && CDS.flutter.items[p.id]) || null; }
  function flutterLinhas(ps){
    return [
      ["No castanha_flutter", function(p){ var f = flutterDe(p);
        if (f) return { text: f.class, description: f.via === "code-connect" ? "Ligado pelo Code Connect" : f.via === "story" ? "Ligado pela story do Widgetbook" : "Ligado pelo nome da classe", icon: "check-line" };
        if (p.block) return { text: "Sem par", description: "Building block", icon: false };
        return { text: "Não existe", description: "Ainda não está no castanha_flutter", icon: "close-line" }; }],
      ["Parâmetros", function(p){ var f = flutterDe(p); if (!f) return vazio();
        var l = f.params || [], a = l.filter(function(x){ return x.a11y; }), o = l.filter(function(x){ return !x.a11y; });
        return { text: String(l.length), description: nomes(o.map(function(x){ return x.n; })) + (a.length ? " · " + plural(a.length, "de acessibilidade", "de acessibilidade") : ""), icon: false }; }],
      ["Props que chegam", function(p){ var f = flutterDe(p); if (!f) return vazio(); var m = CDS.flutterMaps && CDS.flutterMaps[p.id];
        return chegam(m && m.figma, (propsFigma(p) || []).length) || { text: "Sem mapa", description: "Ainda sem a tradução Figma → Flutter", icon: false }; }],
      ["Divergências", function(p){ var f = flutterDe(p); if (!f) return vazio(); return diverg(f.checks); }]
    ].map(function(r){ return { item: r[0], cel: ps.map(function(p){ return p ? r[1](p) : vazio(); }) }; });
  }

  // ---------- débitos (CONFERIR.md, via CDS.debitos) ----------
  var MAX_DEB = 6;
  var TRATO = { seg: "Segue o Figma", exc: "Exceção aprovada", deb: "Débito no Figma" };
  function curto(t, n){ t = String(t || "").replace(/\s+/g, " ").trim(); return t.length > n ? t.slice(0, n - 1).replace(/[\s,.·:]+\S*$/, "") + "…" : t; }
  function debitosLeitura(){ return CDS.debitos && CDS.debitos.disponivel; }
  function debitosDe(p){ return debitosLeitura() ? CDS.debitos.itens(p.id) : null; }
  function abertos(l){ return l.filter(function(x){ return !x.resolvido; }).sort(function(a, b){ var o = CDS.debitos.tipos || []; return o.indexOf(a.tipo) - o.indexOf(b.tipo); }); } // mesma ordem da tab Débitos
  function colunaDebitos(p){
    var col = c("div", null, "pg-cmp__deb-col");
    if (!p) return col;
    var l = debitosDe(p);
    if (!l){ col.appendChild(c("cds-skeleton", { kind: "square" }, "pg-cmp__deb-load")); return col; }
    var ab = abertos(l), feitos = l.length - ab.length;
    col.appendChild(txt("p", "pg-cmp__nome", p.name));
    col.appendChild(txt("p", "pg-cmp__meta", (ab.length ? plural(ab.length, "em aberto", "em aberto") : "Nenhum em aberto") + (feitos ? " · " + plural(feitos, "resolvido", "resolvidos") : "")));
    if (ab.length){
      var lista = col.appendChild(c("cds-content-list", { intent: "navigation", label: "Débitos em aberto de " + p.name }));
      ab.slice(0, MAX_DEB).forEach(function(x){
        // título com o código, o tipo e como o código tratou; descrição curta com o que está no Figma hoje (o resto fica na tab)
        lista.appendChild(c("cds-content-list-item", { intent: "navigation", href: "#/" + p.id + "/debitos", "show-lead-item": "false", "show-tag": "false",
          label: x.cols[0] + " · " + x.tipo, description: (x.tipo === "Integração React" ? "" : TRATO[x.trato] + ": ") + curto(semCrase(x.cols[2] || x.cols[1] || ""), 72) }));
      });
    } else col.appendChild(txt("p", "pg-cmp__vazio", "Nenhuma divergência entre Figma e código registrada."));
    if (l.length) col.appendChild(c("cds-link", { label: ab.length > MAX_DEB ? "Ver os " + ab.length + " na tab Débitos" : "Abrir a tab Débitos", href: "#/" + p.id + "/debitos", appearance: "accent" }));
    return col;
  }

  // ---------- tela ----------
  function escolhaDaUrl(){
    var q = (location.hash.split("?")[1] || "").match(/(?:^|&)c=([^&]*)/), ids = q ? decodeURIComponent(q[1]).split(",") : PADRAO;
    var out = []; for (var i = 0; i < N; i++) out.push(ids[i] && porId(ids[i]) ? ids[i] : "");
    return out;
  }
  function gravarUrl(ids){
    var base = location.hash.split("?")[0] || "#/comparar", v = ids.join(",").replace(/,+$/, ""); // vírgula vazia guarda a posição do campo sem escolha
    try { history.replaceState(null, "", base + (v ? "?c=" + encodeURIComponent(v).replace(/%2C/g, ",") : "")); } catch (e) {}
  }
  function links(p){
    var l = [], r = reactDe(p), f = flutterDe(p), d = r && r.status === "react" && CDS.react.dirs[r.dir];
    l.push(["Documentação no portal", "#/" + p.id, false]);
    if (p.figma) l.push(["Abrir no Figma", p.figma, true]);
    if (d && d.storybook) l.push(["Abrir no Storybook", d.storybook, true]);
    if (f && f.widgetbook) l.push(["Abrir no Widgetbook", f.widgetbook, true]);
    return l;
  }
  function tabela(rotulo, primeira, ps, linhas){
    var t = c("cds-table", { label: rotulo, selectable: "false", "show-toolbar": "false", "show-pagination": "false" }, "pg-cmp__table");
    t.columns = [{ key: "item", label: primeira, kind: "text", sortable: false, width: 200 }].concat(ps.map(function(p, i){
      return { key: "c" + i, label: p ? p.name : "Componente " + (i + 1), kind: "text", sortable: false };
    }));
    t.rows = linhas.map(function(l, i){ var row = { id: String(i + 1), item: { text: l.item, description: "", icon: false } }; l.cel.forEach(function(x, k){ row["c" + k] = x; }); return row; });
    return t;
  }
  function secao(box, icone, titulo, texto){
    var h = box.appendChild(c("div", null, "pg-cmp__sec"));
    h.appendChild(c("cds-icon", { icon: icone, size: "medium", appearance: "neutral", "aria-hidden": "true" }));
    h.appendChild(txt("h2", "pg-doc-h2 pg-cmp__h", titulo));
    if (texto) box.appendChild(txt("p", "pg-doc-p", texto));
  }

  function montar(){
    var wrap = c("div", null, "pg-cmp");
    var ids = escolhaDaUrl();
    // Building blocks ficam fora da busca por padrão (Switch desligado); um link que já traz um deles liga o Switch
    var comBlocos = ids.some(function(id){ var p = id && porId(id); return p && p.block; });
    function opcoes(){
      return lista().filter(function(p){ return comBlocos || !p.block; })
        .map(function(p){ return { value: p.id, label: p.name + (p.block ? " · Building block" : p.template ? " · Template" : "") }; })
        .sort(function(a, b){ return a.label.localeCompare(b.label, "pt-BR"); });
    }

    // a busca fica alinhada às colunas das tabelas: a 1ª coluna (200, a mesma das tabelas) explica a escolha
    var slots = wrap.appendChild(c("div", null, "pg-cmp__slots"));
    var intro = slots.appendChild(c("div", null, "pg-cmp__intro"));
    intro.appendChild(txt("p", "pg-cmp__lede", "Escolha até 3 componentes. Troque um deles a qualquer momento."));
    var sw = intro.appendChild(c("cds-switch", { label: "Mostrar building blocks", status: comBlocos ? "selected" : "unselected" }));
    var sels = [], cards = [];
    for (var i = 0; i < N; i++){ (function(i){
      var col = slots.appendChild(c("div", null, "pg-cmp__slot"));
      var sel = col.appendChild(c("cds-async-select-input", { label: "Componente " + (i + 1), placeholder: "Buscar componente", "show-lead-icon": "true", "lead-icon": "search-line", "show-supporting-content": "false", "show-required": "false", "empty-text": "Nenhum componente com esse nome" }));
      sel.options = opcoes();
      if (ids[i]) sel.value = ids[i];
      sel.addEventListener("cds-change", function(e){ ids[i] = e.detail.value || ""; gravarUrl(ids); desenhar(); });
      sels.push(sel);
      cards.push(col.appendChild(c("div", null, "pg-cmp__info")));
    })(i); }
    // desligar tira da comparação os building blocks já escolhidos
    sw.addEventListener("cds-change", function(e){
      comBlocos = e.detail.status === "selected";
      var o = opcoes();
      sels.forEach(function(sel, i){
        var p = ids[i] && porId(ids[i]);
        if (!comBlocos && p && p.block){ ids[i] = ""; sel.value = ""; }
        sel.options = o;
      });
      gravarUrl(ids); desenhar();
    });

    var corpo = wrap.appendChild(c("div", null, "pg-cmp__body"));
    function desenhar(){
      var ps = ids.map(function(id){ return id ? porId(id) : null; });
      cards.forEach(function(box, i){
        box.innerHTML = ""; var p = ps[i];
        if (!p){ box.appendChild(txt("p", "pg-cmp__vazio", "Escolha um componente para comparar.")); return; }
        box.appendChild(txt("p", "pg-cmp__nome", p.name));
        box.appendChild(txt("p", "pg-cmp__meta", tipo(p) + (p.category && !p.block ? " · " + p.category : "")));
        var dl = debitosDe(p);
        if (dl) box.appendChild(txt("p", "pg-cmp__meta", abertos(dl).length ? plural(abertos(dl).length, "débito em aberto", "débitos em aberto") : "Nenhum débito em aberto"));
        var ul = box.appendChild(c("ul", null, "pg-cmp__links"));
        links(p).forEach(function(l){
          var li = ul.appendChild(c("li"));
          li.appendChild(c("cds-link", l[2] ? { label: l[0], href: l[1], appearance: "accent", target: "_blank", icon: "link-line" } : { label: l[0], href: l[1], appearance: "accent" }));
        });
      });
      corpo.innerHTML = "";
      if (!ps.some(Boolean)){ corpo.appendChild(txt("p", "pg-cmp__vazio", "Escolha pelo menos um componente acima.")); return; }
      secao(corpo, "figma-line", "Figma (Design)", "Como o componente está na lib [CastanhaDS] Components" + (FP && FP.lido ? ", com as props lidas em " + FP.lido : "") + ".");
      corpo.appendChild(tabela("Figma: página, publicação e props", "Figma", ps, figmaLinhas(ps)));
      var pl = propLinhas(ps);
      if (pl.length){ corpo.appendChild(txt("h3", "pg-doc-h3", "Props no Figma")); corpo.appendChild(tabela("Props de cada componente no Figma", "Prop", ps, pl)); }
      secao(corpo, "react-line", "React", "Par no castanha-react (" + (CDS.react ? CDS.react.source.ref + ", " + CDS.react.source.date.split("-").reverse().join("/") : "sem leitura") + "), pelos mapas de tradução do portal.");
      corpo.appendChild(tabela("React: componente, props e divergências", "React", ps, reactLinhas(ps)));
      secao(corpo, "flutter-fill", "Flutter", "Par no castanha_flutter (" + (CDS.flutter ? CDS.flutter.source.ref + ", " + CDS.flutter.source.date.split("-").reverse().join("/") : "sem leitura") + "), pelos mapas de tradução do portal.");
      corpo.appendChild(tabela("Flutter: widget, parâmetros e divergências", "Flutter", ps, flutterLinhas(ps)));
      if (debitosLeitura()){
        secao(corpo, "warning-line", "Débitos", "Os itens do registro de divergências entre Figma e código ligados a cada componente, em aberto primeiro e por tipo de ajuste.");
        var grade = corpo.appendChild(c("div", null, "pg-cmp__slots"));
        grade.appendChild(txt("p", "pg-cmp__lede", "Cada item abre a tab Débitos do componente, com o que está no Figma, o esperado e como o código tratou."));
        ps.forEach(function(p){ grade.appendChild(colunaDebitos(p)); });
      }
    }
    document.addEventListener("cds-debitos", function(){ if (wrap.isConnected) desenhar(); });
    desenhar();
    lerProps().then(desenhar);
    return wrap;
  }

  CDS.docs["comparar"] = {
    tabs: [
      { id: "comparar", title: "Comparar", blocks: [
        { p: "Escolha até 3 componentes e compare, lado a lado, como cada um está no Figma, no castanha-react e no castanha_flutter. Os dados são os mesmos das páginas dos componentes e dos checks diários da stack." },
        { visual: { render: montar, bare: true } },
        { note: "Os débitos aparecem para quem tem acesso ao registro completo de divergências (perfil Completo). Props que chegam conta quantas props do Figma o mapa de tradução do portal leva ao código. Divergências vêm do check da stack: alta quebra a tradução, média muda o resultado sem quebrar e informativa é uma prop do Figma que não chega ao código. O link desta página guarda a comparação: copie a URL para compartilhar." }
      ] }
    ]
  };
})();
