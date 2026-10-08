/**
 * Ranking do time do Castanha Quiz · Google Apps Script ligado a uma planilha no Drive da Caju
 *
 * Publicar como app da Web: "Executar como: eu" e "Quem pode acessar: qualquer pessoa na Caju".
 * Assim só quem está logado com uma conta @caju.com.br consegue ler ou gravar. Passo a passo em docs/RANKING-TIME.md.
 *
 * O portal chama por JSONP (tag <script>), porque um app restrito ao domínio não responde a fetch de outro site:
 *   ?action=top&callback=fn                                   → { ok, top: [{ name, score, label, date }] }
 *   ?action=add&name=GUS&score=3675&label=Todos&callback=fn   → { ok, position, top }
 *
 * Privacidade: a planilha guarda só iniciais, pontos, temas e data. O e-mail serve para conferir o domínio e
 * limitar o envio (uma partida a cada 20 s por pessoa), fica só no cache do script e não é gravado.
 */
var SHEET = "Ranking";
var TOP = 10;
var MAX_SCORE = 5250; // (2.400 dos 10 acertos com combo + 600 das 3 vidas + 500 sem erros) x1,5 com todos os temas
var DOMAIN = /@caju\.com\.br$/i;

function doGet(e){
  var p = (e && e.parameter) || {}, out;
  try {
    var email = Session.getActiveUser().getEmail();
    if (!DOMAIN.test(email || "")) throw new Error("Ranking só para contas da Caju");
    out = p.action === "add" ? add(p, email) : { ok: true, top: top() };
  } catch (err){
    out = { ok: false, error: String(err && err.message || err) };
  }
  var body = JSON.stringify(out), cb = p.callback;
  if (cb && /^[A-Za-z_$][\w$.]{0,60}$/.test(cb)){
    return ContentService.createTextOutput(cb + "(" + body + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function add(p, email){
  var name = String(p.name || "").toUpperCase();
  var score = Math.round(Number(p.score));
  var label = String(p.label || "").replace(/[^\wÀ-ÿ +]/g, "").slice(0, 60);
  if (!/^[A-Z0-9]{3}$/.test(name)) throw new Error("Iniciais inválidas");
  if (!(score > 0 && score <= MAX_SCORE)) throw new Error("Pontuação fora do limite");
  var cache = CacheService.getScriptCache(), key = "rl:" + email;
  if (cache.get(key)) throw new Error("Espere alguns segundos para gravar de novo");
  cache.put(key, "1", 20);
  var lock = LockService.getScriptLock(); lock.waitLock(5000);
  try {
    sheet().appendRow([new Date(), name, score, label]);
  } finally { lock.releaseLock(); }
  var list = top(), pos = 0;
  for (var i = 0; i < list.length; i++){ if (list[i].name === name && list[i].score === score){ pos = i + 1; break; } }
  return { ok: true, position: pos, top: list };
}

function top(){
  var sh = sheet(), n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, 4).getValues()
    .filter(function(r){ return r[1] && r[2] > 0; })
    .sort(function(a, b){ return b[2] - a[2] || a[0] - b[0]; }) // empate: quem fez antes fica na frente
    .slice(0, TOP)
    .map(function(r){ return { name: r[1], score: r[2], label: r[3], date: Utilities.formatDate(new Date(r[0]), "America/Sao_Paulo", "yyyy-MM-dd") }; });
}

function sheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(SHEET);
  if (!sh){ sh = ss.insertSheet(SHEET); sh.appendRow(["Data", "Iniciais", "Pontos", "Temas"]); sh.setFrozenRows(1); }
  return sh;
}

// Rodar uma vez no editor para criar a aba e autorizar o script
function setup(){ sheet(); }
