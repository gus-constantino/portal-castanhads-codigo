/* Playground — Shortcut (composição do playground, não é do DS: ver shortcut.js · C137) */
CDS.register({
  id: "shortcut", name: "Shortcut", composition: true, category: "Composições",
  description: "Tecla de atalho: cada tecla é uma Tag Neutral do DS e as alternativas vêm separadas por \"ou\". Usada no painel de atalhos (tecla ?).",
  mount: function(ctx){
    var kit = ctx.kit, panel = ctx.panel;
    var mac = /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent), cmd = mac ? "⌘" : "Ctrl";
    var p = kit.el("cmp-shortcut", { keys: "/ | " + cmd + " K" });
    ctx.preview.appendChild(p);
    kit.hint(panel, "Composição do playground (prefixo cmp-): o DS não tem Kbd (C137), então cada tecla é uma Tag Neutral sem ícone dentro de um elemento kbd. Em Keys, a barra vertical separa as alternativas e o espaço separa as teclas de uma mesma combinação.");
    kit.section(panel, "Texts");
    kit.text(panel, { label: "Keys", value: p.getAttribute("keys"), onInput: function(v){ p.setAttribute("keys", v); } });
    kit.text(panel, { label: "Separator", value: "ou", onInput: function(v){ p.setAttribute("separator", v); } });
  }
});
