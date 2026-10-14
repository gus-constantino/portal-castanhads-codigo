/* Playground — Chat Input (CDS-1594)
   O ditado é simulado: ao ligar a voz, uma frase de exemplo é escrita aos poucos no campo, como faria o serviço de voz. */
CDS.register({
  id: "chat-input",
  name: "Chat Input",
  category: "Text Fields",
  task: "CDS-1594",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/4hJ90rFfuEyWx9zHeqJxp4/-CastanhaDS--Components?node-id=26567-44273",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel, timer = null;
    var FRASE = "Quero saber o saldo do meu cartão e se dá para transferir para outra conta.";
    var SAMPLE = [{ name: "foto-do-cartao.jpg", type: "image/jpeg" }, { name: "extrato-setembro.pdf", type: "application/pdf" }, { name: "planilha.xlsx", type: "" }];
    var p = kit.el("cds-chat-input", { accept: "image/*,.pdf,.xlsx", supporting: "A conversa fica salva no histórico.", error: "Permita o acesso ao microfone para ditar.", maxlength: "500" });
    ctx.preview.appendChild(p);
    kit.fieldWidth(ctx, p);
    function set(name, val){ kit.attr(p, name, val); }
    function readout(msg){ ctx.readout(msg || p.value || "—", false); }

    // Ditado simulado: escreve a frase palavra por palavra enquanto Is Listening estiver ligado
    function stopSim(){ clearInterval(timer); timer = null; }
    p.addEventListener("cds-listening-change", function(e){
      stopSim();
      if (!e.detail.listening){ readout("Ditado encerrado"); return; }
      var words = FRASE.split(" "), base = p.value ? p.value.replace(/\s*$/, " ") : "", i = 0;
      readout("Ouvindo…");
      setTimeout(function(){
        if (!p.listening) return;
        timer = setInterval(function(){
          if (!p.listening || i >= words.length){ stopSim(); return; }
          p.value = base + words.slice(0, ++i).join(" ");
          readout();
        }, 220);
      }, 900);
    });
    p.addEventListener("cds-send", function(e){ stopSim(); readout("Enviado: " + e.detail.value); });
    p.addEventListener("cds-attachments-change", function(e){ readout(e.detail.attachments.length + " anexo(s): " + e.detail.attachments.map(function(a){ return a.name; }).join(", ")); });
    p.addEventListener("cds-change", function(){ readout(); });

    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]],
      onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.toggle(panel, { label: "Is Listening", onChange: function(on){ p.listening = on; } });
    kit.toggle(panel, { label: "Show Attachments (exemplo)", onChange: function(on){ p.attachments = on ? SAMPLE : []; readout(); } });
    kit.hint(panel, "Hovered, Pressed e <code>Is Active</code> são estados de interação. <code>Is Filled</code> deriva do valor real. <code>Is Listening</code> liga pelo botão de voz: o ditado aqui é simulado. Enter envia, Shift+Enter quebra a linha. O Anexar abre o seletor de arquivos de verdade: imagem, PDF e XLSX viram chip, os outros tipos levam o campo a Warning. Nada é enviado.");

    // Booleans do Figma: ligados por padrão → só escreve "false" quando desligados
    kit.section(panel, "Booleans");
    [["show-attachment","Show Attachment"],["show-voice","Show Voice"],["show-supporting-content","Show Supporting Content"],["show-character-counter","Show Character Counter"],["show-trailing-item","Show Trailing Item"]]
      .forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });

    kit.section(panel, "Texts");
    kit.text(panel, { label: "Placeholder Content", value: "Escreva uma mensagem", onInput: function(v){ set("placeholder", v || null); } });
    kit.text(panel, { label: "Listening Content", value: "Ouvindo…", onInput: function(v){ set("listening-content", v || null); } });
    kit.text(panel, { label: "Supporting Message (Neutral)", value: "A conversa fica salva no histórico.", onInput: function(v){ set("supporting", v); } });
    kit.text(panel, { label: "Error Message (Warning)", value: "Permita o acesso ao microfone para ditar.", onInput: function(v){ set("error", v); } });
    kit.text(panel, { label: "Limite (contador n/max)", value: "500", onInput: function(v){ set("maxlength", v || null); } });
    kit.text(panel, { label: "Tipos aceitos (accept)", value: "image/*,.pdf,.xlsx", onInput: function(v){ set("accept", v || null); } });
    kit.text(panel, { label: "Mensagem do arquivo recusado", value: "Envie imagem ou PDF.", onInput: function(v){ set("attachment-error", v || null); } });
    kit.text(panel, { label: "Label (nome acessível, não aparece)", value: "Mensagem", onInput: function(v){ set("label", v || null); } });

    // Nested instances — props das instâncias aninhadas, derivadas ao vivo do estado real
    kit.section(panel, "Nested instances");
    function stateOf(node){ return node.disabled ? "Disabled" : node.matches(":active") ? "Pressed" : node.matches(":hover") ? "Hovered" : "Enabled"; }
    function ib(sel, title, note){
      return kit.nested(panel, { title: title, exposed: false, note: note, props: function(){
        var host = p.querySelector(sel), b = host && host.button;
        if (!b || host.hidden) return [["Visível", "false"]];
        return [["Kind", host.getAttribute("kind") === "ghost" ? "Ghost" : "Default"], ["Appearance", host.getAttribute("appearance") === "accent" ? "Accent" : "Neutral"],
          ["Size", "Small"], ["State", stateOf(b)], ["Icon", host.getAttribute("icon")], ["aria-label", b.getAttribute("aria-label")]]
          .concat(b.hasAttribute("aria-pressed") ? [["aria-pressed", b.getAttribute("aria-pressed")]] : []);
      } });
    }
    var refreshers = [
      ib(".cds-chat__attach", "Attach Button · Icon Button", "Show Attachment. Dispara <code>cds-attach</code> (cancelável) e abre o seletor."),
      kit.nested(panel, { title: "Attachments · Chips Group", exposed: false, note: "Single Rows com Input Chips Small. Toque no chip remove o arquivo.", props: function(){ var a = p.attachments; return [["Show Attachments", String(a.length > 0)], ["Kind", "Input Chips"], ["Role", "Single Rows Chips"], ["Chips", a.map(function(x){ return x.name; }).join(", ") || "—"]]; } }),
      ib(".cds-chat__send", "Send Button · Icon Button", "Disponível com texto. Enter também envia."),
      ib(".cds-chat__voice", "Voice Button · Icon Button", "Show Voice. Alterna <code>Is Listening</code> (<code>cds-listening-change</code>).")
    ];
    kit.watch(p, function(){ refreshers.forEach(function(f){ f(); }); });

    readout();
  }
});
