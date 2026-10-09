/* Playground — Credit Card Input */
CDS.register({
  id: "credit-card-input",
  name: "Credit Card Input",
  category: "Text Fields",
  task: "CDS-1607",
  figma: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/NHkGUvBfNMNTLnsxKtAmWa/-CastanhaDS--Components?node-id=24614-7155",
  zeroheight: "https://zeroheight.com/858426090/v/latest/p/933a06-credit-card-input",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var p = kit.el("cds-credit-card-input", {
      label: "Número do cartão",
      supporting: "Digite os 16 números do cartão.", error: "Número de cartão inválido."
    });
    ctx.preview.appendChild(p);
    kit.fieldWidth(ctx, p);
    function set(name, val){ kit.attr(p, name, val); }
    function readout(){ ctx.readout(p.value, p.value.length === 16); }
    p.addEventListener("cds-change", readout);
    p.addEventListener("cds-trailing-action", function(){ ctx.readout("Icon Button acionado", false); setTimeout(readout, 1200); });

    kit.seg(panel, { label: "Appearance", value: "neutral", options: [["neutral","Neutral"],["warning","Warning"]],
      onChange: function(v){ set("appearance", v === "neutral" ? null : v); } });

    kit.section(panel, "Variants");
    kit.toggle(panel, { label: "State: Disabled", onChange: function(on){ set("disabled", on); } });
    kit.hint(panel, "Hovered, Pressed e <code>Is Active</code> são estados de interação: passe o mouse, pressione e foque o campo.");

    // Booleans do Figma: ligados por padrão → só escreve "false" quando desligados
    kit.section(panel, "Booleans");
    [["show-label","Show Label"],["show-required","Show Required"],["show-lead-icon","Show Lead Icon"],["show-trailing-item","Show Trailing Item"],["show-supporting-content","Show Supporting Content"]]
      .forEach(function(b){ kit.toggle(panel, { label: b[1], checked: true, onChange: function(on){ set(b[0], on ? null : "false"); } }); });

    kit.section(panel, "Texts");
    kit.text(panel, { label: "Text Label", value: "Número do cartão", onInput: function(v){ set("label", v); } });
    kit.text(panel, { label: "Required Text", value: "(Obrigatório)", onInput: function(v){ p.setAttribute("required-text", v); } });
    kit.text(panel, { label: "Supporting Message (Neutral)", value: "Digite os 16 números do cartão.", onInput: function(v){ set("supporting", v); } });
    kit.text(panel, { label: "Error Message (Warning)", value: "Número de cartão inválido.", onInput: function(v){ set("error", v); } });
    kit.text(panel, { label: "Trailing Label (nome acessível do Icon Button)", value: "Ajuda sobre o número do cartão",
      hint: "O papel da ação (tooltip, navegação, outra ação) é definido por quem implementa; o componente só dispara <code>cds-trailing-action</code>.",
      onInput: function(v){ set("trailing-label", v); } });
    kit.text(panel, { label: "Value (prefill)", placeholder: "ex.: 4111111111111111", hint: "Só dígitos, até 16. <code>Is Filled</code> deriva do valor real.",
      onInput: function(v){ set("value", v); readout(); } });

    // Nested instances — props das instâncias aninhadas, derivadas ao vivo do estado real
    kit.section(panel, "Nested instances");
    function stateOf(node){ return node.disabled ? "Disabled" : node.matches(":active") ? "Pressed" : node.matches(":hover") ? "Hovered" : "Enabled"; }
    var refreshers = [
      kit.nested(panel, {
        title: ".Text Content Mask", exposed: true,
        note: "Building block compartilhado da família. Aqui a máscara é fixa em <code>Credit Card</code>.",
        props: function(){
          var inp = p.input;
          return [
            ["Mask", "Credit Card"],
            ["Credit Card", inp && inp.value ? inp.value : (inp ? inp.placeholder + " (placeholder)" : "—")],
            ["Is Filled", String(!!(inp && inp.value))]
          ];
        }
      }),
      kit.nested(panel, {
        title: "Lead Icon", exposed: false,
        note: "Instance swap. Ícone de cartão fixo — não detecta a bandeira.",
        props: function(){
          return [["Show Lead Icon", String(!!p.querySelector(".cds-tf__lead:not([hidden])"))], ["Lead Icon", "credit-card-line"], ["Tamanho", "24×24"]];
        }
      }),
      kit.nested(panel, {
        title: "Trailing Item · Icon Button", exposed: false,
        note: "Configuração fixa no componente. O papel da ação é de quem implementa.",
        props: function(){
          var host = p.querySelector(".cds-tf__box cds-icon-button"), b = host && host.button;
          if (!b) return [["Show Trailing Item", "false"]];
          return [
            ["Kind", "Ghost"], ["Appearance", "Neutral"], ["Size", "Small"],
            ["State", stateOf(b)], ["Show Notification", "false"], ["Icon", "support-line"],
            ["aria-label", b.getAttribute("aria-label")]
          ];
        }
      })
    ];
    kit.watch(p, function(){ refreshers.forEach(function(f){ f(); }); });

    readout();
  }
});
