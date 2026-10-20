/**
 * Tab Débitos dos componentes: os itens do docs/CONFERIR.md (linhas C##) ligados a cada componente (D367).
 *
 * Aparece para quem lê os dados do Relatório: perfil Completo no Vercel e o servidor local. Fica de fora no perfil
 * Portal (o middleware bloqueia o CONFERIR.md), no Dashboard (que não abre componentes) e nos links de entrega.
 * O arquivo é lido quando o portal abre, como no Relatório: o que entra ou sai do Conferir aparece aqui no deploy seguinte.
 * Link de componente (acesso/paginas/) com a opção Débitos: a tab lê docs/debitos/<id>.json, gerado pelo build com os
 * itens só daquele componente, e o middleware libera o arquivo só para esse link. Quem recebe não vê o resto do Conferir.
 *
 * Ligação item → componente: a coluna Componente (ou "O que foi", nos Resolvidos) é texto livre. Vale o nome do
 * componente no trecho antes do primeiro " · "; sem nenhum ali, a linha inteira. Famílias e nomes curtos ficam em APELIDOS,
 * e os itens que não são de um componente (naming da lib, Hub, tokens…) ficam em GERAIS e seguem só no Relatório.
 * tests/debitos.test.js reprova o Smoke quando um item em aberto não casa com nenhum dos dois.
 *
 * No navegador: CDS.debitos.tab(id) devolve a tab (ou null enquanto os dados não chegam), e CDS.debitosProntos() avisa o app.
 *   CDS.debitos.itens(id) devolve a lista crua [{ tipo, head, cols, resolvido, trato }] (ou null) para outras páginas
 *   (Comparar componentes, D370), e o evento "cds-debitos" no document avisa quando os dados chegam.
 * No Node: module.exports = { parse, ligar, geral, porComponente } para o build e o teste.
 */
(function(){
  "use strict";
  // ordem das seções na tab (20/10: Acessibilidade, Ajuste de UI, Motion, Ajuste de texto; os outros tipos depois)
  var TIPOS = ["Acessibilidade", "Ajuste de UI", "Motion", "Ajuste de texto", "Refactor", "Naming", "Documentação", "Integração React"];
  var TEXT_FIELDS = ["async-creatable-select-input", "async-select-input", "chat-input", "checkbox-select-input", "code-input-otp", "credit-card-input",
    "multi-select-input", "password-input", "quantity-input", "radio-select-input", "search-input", "text-area", "text-input"];
  var SELECTS = ["async-creatable-select-input", "async-select-input", "checkbox-select-input", "multi-select-input", "radio-select-input"];
  var BOTOES = ["drop-button", "fab-menu", "filter-button", "icon-button", "main-button"];
  var CONTROLES = ["checkbox", "chips-group", "filter-chips", "input-chips", "radio-button", "checkbox-group", "radio-button-group", "switch-group", "switch"];
  // nome como aparece no Conferir → ids (sem diferenciar maiúsculas)
  var APELIDOS = [
    ["Text Fields", TEXT_FIELDS], ["Select Inputs", SELECTS], ["Select input", SELECTS], ["Botões", BOTOES],
    ["Main, Drop e Icon Button", ["main-button", "drop-button", "icon-button"]], ["Selection Controls", CONTROLES],
    [".Text Content Mask", ["text-input"]], ["Quantity", ["quantity-input"]], ["Text Area", ["text-area"]], ["Credit Card", ["credit-card-input"]],
    ["Password", ["password-input"]], ["Search", ["search-input"]], ["Tabs (.Item)", ["tab-item"]], ["Content Banner", ["content-banner"]]
  ];
  // começo do texto de itens que não são de um componente
  var GERAIS = [/^Docs?\b/i, /^Naming\b/, /^\.?Motion Styles\b/, /^\[Caju\] (Icons|Illustrations)\b/, /^Ícones\b/, /^Ilustrações\b/, /^Tokens\b/,
    /^Variáveis\b/, /^Gaps? de (token|componente)\b/, /^Castanha (Hub|Assets|Analytics)\b/, /^Caju Theme\b/, /^Princípios de Design\b/,
    /^Scale\b/, /^Treinamento\b/, /^Storybook\b/, /^Atalhos do teclado\b/, /^Publicação da lib\b/, /^Check de props\b/, /^Text\/\w+/];

  function cells(line){
    return line.replace(/\\\|/g, "\u0000").trim().replace(/^\|/, "").replace(/\|$/, "").split("|")
      .map(function(c){ return c.replace(/\u0000/g, "|").trim(); });
  }
  // markdown da célula → texto do bloco das docs (mantém `código` e links do portal; tira negrito, riscado e âncoras do .md)
  function limpar(s){ return s.replace(/\*\*|~~/g, "").replace(/\[([^\]]+)\]\((?!https?:\/\/|#\/)[^)]*\)/g, "$1"); }
  function slug(s){ return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  /** CONFERIR.md → [{ tipo, head, itens: [{ code, cols, resolvido }] }] (só as tabelas com linhas C##) */
  function parse(md){
    var out = [], sec = null;
    md.split("\n").forEach(function(l){
      var h = l.match(/^## (.+)/);
      if (h){ sec = { tipo: h[1].trim(), head: null, itens: [] }; out.push(sec); return; }
      if (!sec || !/^\|/.test(l) || /^\|\s*:?-{3,}/.test(l)) return;
      var c = cells(l);
      if (!sec.head){ sec.head = c; return; }
      var m = c[0].match(/^(~~)?(C\d+)/);
      if (m) sec.itens.push({ code: m[2], cols: c, resolvido: sec.tipo === "Resolvidos" || !!m[1] });
    });
    return out.filter(function(s){ return s.itens.length; });
  }

  /** nomes = [[nome, id]] dos componentes → função texto → ids ligados ([] = nenhum) */
  function ligar(nomes){
    var regras = nomes.map(function(n){ return [n[0].replace(/^\[Beta\] /, ""), [n[1]]]; }).concat(APELIDOS)
      .sort(function(a, b){ return b[0].length - a[0].length; }) // o nome mais longo primeiro: "Checkbox Select Input" antes de "Checkbox"
      .map(function(r){
        var esc = r[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // nome de uma palavra só (Card, Tag, Header…) diferencia maiúsculas, para não casar com a palavra comum no texto
        return { re: new RegExp("(^|[^\\w.\\[])" + esc + "(?![\\w\\]])", / /.test(r[0]) ? "gi" : "g"), ids: r[1] };
      });
    var exato = {}; // nome inteiro (sem diferenciar maiúsculas) → ids
    nomes.forEach(function(n){ exato[n[0].replace(/^\[Beta\] /, "").toLowerCase()] = [n[1]]; });
    function achar(txt){
      var ids = [];
      regras.forEach(function(r){
        txt = txt.replace(r.re, function(m, antes){ r.ids.forEach(function(id){ if (ids.indexOf(id) < 0) ids.push(id); }); return antes + " "; });
      });
      return ids;
    }
    // estrito (Resolvidos, coluna "O que foi" em frase corrida): só o começo, até o primeiro " · " ou ":", sem procurar no resto
    return function(texto, estrito){
      var t = limpar(texto).replace(/`/g, "");
      var partes = t.split(" · "), ids = achar(estrito ? partes[0].split(":")[0] : partes[0]);
      if (!ids.length) return estrito ? [] : achar(t);
      // lista de nomes ("Alert · Avatar · Badge"): cada trecho que é só o nome de um componente também conta
      partes.slice(1).forEach(function(p){ var a = exato[p.trim().toLowerCase()]; if (a) a.forEach(function(id){ if (ids.indexOf(id) < 0) ids.push(id); }); });
      return ids;
    };
  }
  function geral(texto){ var t = limpar(texto).replace(/`/g, "").trim(); return GERAIS.some(function(re){ return re.test(t); }); }

  /** CONFERIR.md + nomes → { id: [{ tipo, head, cols, resolvido }] }, o mesmo formato do docs/debitos/<id>.json do build */
  function porComponente(md, nomes){
    var achar = ligar(nomes), out = {};
    nomes.forEach(function(n){ out[n[1]] = []; });
    parse(md).forEach(function(s){
      s.itens.forEach(function(it){
        achar(it.cols[1] || "", it.resolvido).forEach(function(id){ if (out[id]) out[id].push({ tipo: s.tipo, head: s.head, cols: it.cols, resolvido: it.resolvido }); });
      });
    });
    return out;
  }

  if (typeof module !== "undefined" && module.exports){ module.exports = { parse: parse, ligar: ligar, geral: geral, porComponente: porComponente, TIPOS: TIPOS }; return; }

  // ---------- Navegador ----------
  var CDS = window.CDS = window.CDS || {};
  if (!window.fetch) return;
  var cookie = function(n){ return (document.cookie.match(new RegExp("(?:^|;\\s*)" + n + "=([^;]+)")) || [])[1] || ""; };
  var perfil = cookie("cds_perfil") || null, local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var leRegistro = local || perfil === "completo"; // quem lê o CONFERIR.md inteiro (o middleware bloqueia para os outros)
  // Link de componente com a opção Débitos (acesso/paginas/): o middleware grava os ids em cds_debitos e libera só o
  // docs/debitos/<id>.json de cada um. ?debitos=1 com o alvo mostra a tab na prévia "Ver como quem recebe vê"
  // (perfil Completo) e no servidor local.
  var doLink = []; try { doLink = decodeURIComponent(cookie("cds_debitos")).split("~").filter(Boolean); } catch (e) {}
  var previa = leRegistro && new URLSearchParams(location.search).get("debitos") === "1";
  var porId = null, doArquivo = {}, pedidos = {};

  // como o código tratou (mesma regra do painel Adaptações para código do Relatório)
  function trato(cols){ var cod = cols[4] || "", acao = cols[5] || ""; return /débito|erro no figma/i.test(acao) ? "deb" : /exceção/i.test(cod) ? "exc" : "seg"; }
  var TRATO = { seg: ["segue o Figma", "seguem o Figma"], exc: ["exceção aprovada", "exceções aprovadas"], deb: ["débito ou erro no Figma", "débitos ou erros no Figma"] };
  function montar(lista, noLink){
    var abertos = lista.filter(function(x){ return !x.resolvido; }), feitos = lista.filter(function(x){ return x.resolvido; });
    var blocks = [], k = { seg: 0, exc: 0, deb: 0 };
    abertos.forEach(function(x){ if (x.tipo !== "Integração React") k[trato(x.cols)]++; });
    if (abertos.length){
      var partes = Object.keys(TRATO).filter(function(t){ return k[t]; }).map(function(t){ return k[t] + " " + TRATO[t][k[t] === 1 ? 0 : 1]; });
      blocks.push({ p: (abertos.length === 1 ? "1 item em aberto" : abertos.length + " itens em aberto") + " no registro de divergências entre Figma e código" +
        (partes.length ? ": " + partes.join(" · ") + "." : ".") + " Pela regra D40, o código segue o Figma, e o que muda é exceção aprovada ou débito registrado." });
      TIPOS.forEach(function(tipo){
        var doTipo = abertos.filter(function(x){ return x.tipo === tipo; });
        if (!doTipo.length) return;
        var head = doTipo[0].head.slice(); head[1] = "Onde";
        blocks.push({ h3: tipo }, { table: { head: head, rows: doTipo.map(function(x){ return x.cols.map(limpar); }), wrap: true } });
      });
    } else blocks.push({ vazio: { heading: "Nenhum débito em aberto", text: "Não há divergência entre Figma e código registrada para este componente." } });
    if (feitos.length){
      blocks.push({ h3: "Resolvidos" }, { table: { head: ["#", "O que foi", "Resolvido em"], rows: feitos.map(function(x){
        var c = x.cols.map(limpar); return x.tipo === "Resolvidos" ? c : [c[0], c[1] + " · " + c[2], "Marcado como resolvido"]; }), wrap: true } });
    }
    // quem abriu por link não abre o Relatório
    if (!noLink) blocks.push({ p: "Registro completo, com os itens gerais da lib, em [Pendências do Relatório](#/relatorio/conferir)." });
    return { id: "debitos", title: "Débitos", blocks: blocks, noSource: true };
  }

  CDS.debitos = {
    // a tab do componente, ou null (sem acesso ou dados ainda chegando: CDS.debitosProntos avisa quando chegam)
    tab: function(id){
      if (CDS.acessoLink){
        if (!previa && doLink.indexOf(id) < 0) return null;
        if (doArquivo[id]) return montar(doArquivo[id], true);
        if (!pedidos[id]){
          pedidos[id] = true;
          fetch("docs/debitos/" + id + ".json", { cache: "no-cache" }).then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function(lista){ doArquivo[id] = lista; if (CDS.debitosProntos) CDS.debitosProntos(); }).catch(function(){});
        }
        return null;
      }
      return porId ? montar(porId[id] || [], false) : null;
    },
    // quem lê o registro inteiro (perfil Completo e servidor local); fora do link de componente
    disponivel: leRegistro,
    tipos: TIPOS, // ordem das seções, a mesma da tab
    itens: function(id){
      return porId && !CDS.acessoLink ? (porId[id] || []).map(function(x){ return { tipo: x.tipo, head: x.head, cols: x.cols.map(limpar), resolvido: x.resolvido, trato: trato(x.cols) }; }) : null;
    }
  };
  if (leRegistro) fetch("docs/CONFERIR.md", { cache: "no-cache" }).then(function(r){ if (!r.ok) throw new Error(r.status); return r.text(); }).then(function(md){
    porId = porComponente(md, (CDS.playgrounds || []).filter(function(c){ return !c.resource; }).map(function(c){ return [c.name, c.id]; }));
    if (CDS.debitosProntos) CDS.debitosProntos();
    document.dispatchEvent(new CustomEvent("cds-debitos"));
  }).catch(function(){}); // sem o arquivo (rede): o componente abre sem a tab
})();
