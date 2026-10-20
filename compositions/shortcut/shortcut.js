/**
 * <cmp-shortcut> — Tecla de atalho · COMPOSIÇÃO do playground (não é componente do Castanha DS)
 *
 * O DS não tem Kbd (C137): cada tecla é uma Tag Neutral sem ícone (decisão do time, 05/10) dentro de um <kbd>,
 * a combinação junta as teclas e as alternativas vêm separadas por "ou". Quando o DS tiver Kbd, trocar a Tag aqui.
 *
 * Anatomia: combinação (kbd, gap Sizes/4) · teclas (kbd > Tag Neutral) · "ou" entre alternativas (Caption/Regular · Text/medium) · gap Sizes/8
 *
 * Atributos:
 *   keys       alternativas separadas por "|"; teclas da mesma combinação separadas por espaço
 *              ex.: keys="/ | ⌘ K" → [/] ou [⌘][K]
 *   separator  texto entre as alternativas (padrão "ou")
 * Referências: combos (lista de <kbd> das combinações)
 */
(function(){
  "use strict";
  class CmpShortcut extends CDS.Element {
    static get observedAttributes(){ return ["keys", "separator"]; }
    render(){
      var c = CDS.create, self = this, sep = this.text("separator", "ou");
      this.innerHTML = ""; this.combos = [];
      String(this.getAttribute("keys") || "").split("|").map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(combo, i){
        if (i) self.appendChild(c("span", null, "cmp-shortcut__or")).textContent = sep;
        var k = self.appendChild(c("kbd", null, "cmp-shortcut__combo"));
        combo.split(/\s+/).forEach(function(t){ k.appendChild(c("kbd", null, "cmp-shortcut__key")).appendChild(c("cds-tag", { appearance: "neutral", label: t, "show-lead-item": "false" })); });
        self.combos.push(k);
      });
    }
  }
  CmpShortcut.define("cmp-shortcut");
})();
