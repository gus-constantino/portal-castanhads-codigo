/**
 * @deps icon icon-button currency variation-big-number
 * <cds-big-number> — Big Number · Content · set 27238:472 (branch KOmiQxHXqiErSbLmoG3sv6 · CDS-1597)
 * Card de leitura: Header (Lead Icon · Information Button) e Body (Label · valor · variação · Trailing Icon).
 * Kind=Currency usa o Currency Largest; Kind=Number usa número + unidade no mesmo text style (Title/Medium).
 * Largura pelo conteúdo, com mínimo de 272 e altura fixa de 180: valor longo faz o card crescer, sem quebrar a linha.
 * O card não é clicável: Enabled e Hovered (troca do fundo), sem Pressed e sem Disabled. O alvo interno é o Information Button.
 *
 * Atributos (padrões do Figma):
 *   kind                  currency | number · padrão currency
 *   appearance            neutral | accent · padrão neutral
 *   label                 Text Label · padrão "Description"
 *   value                 valor · padrão "100,00" (currency) ou "0,00" (number, Text Value)
 *   symbol                símbolo do Currency · padrão "R$"
 *   unit                  unidade do Number · padrão "%"
 *   icon                  Lead Icon (swap) · padrão "placeholder-line"
 *   trailing-icon         Trailing Icon (swap) · padrão "placeholder-line"
 *   show-information      "false" esconde o Information Button
 *   show-variation        "false" esconde a variação
 *   show-trailing-icon    "false" esconde o Trailing Icon
 *   variation             texto da variação · padrão "+1%"
 *   variation-appearance  positive | warning | negative | informative · padrão positive (no Accent é sempre inversed)
 *   variation-icon        ícone da variação · padrão "up-down-line"
 *   variation-description sentido da variação para o leitor de tela (ex.: Aumento de 1% em relação ao período anterior)
 *   info-label            nome acessível do Information Button · padrão "Mais informações sobre {label}"
 *   state                 hovered (forçado, para as docs)
 * Evento: cds-info ao tocar no Information Button.
 */
(function(){
  "use strict";
  class CdsBigNumber extends CDS.Element {
    static get observedAttributes(){ return ["kind", "appearance", "label", "value", "symbol", "unit", "icon", "trailing-icon", "show-information", "show-variation", "show-trailing-icon", "variation", "variation-appearance", "variation-icon", "variation-description", "info-label"]; }
    render(){
      var accent = this.getAttribute("appearance") === "accent", number = this.getAttribute("kind") === "number";
      var label = this.text("label", "Description");
      this.innerHTML = "";
      var card = CDS.create("div", null, "cds-bn");

      var head = card.appendChild(CDS.create("div", null, "cds-bn__head"));
      var lead = head.appendChild(CDS.create("span", null, "cds-bn__block cds-bn__lead"));
      lead.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("icon") || "placeholder-line", size: "large", appearance: "neutral" }));
      if (this.flag("show-information")){
        var info = head.appendChild(CDS.create("cds-icon-button", { kind: "ghost", appearance: accent ? "inversed" : "neutral", size: "small", icon: "information-line",
          label: this.getAttribute("info-label") || ("Mais informações sobre " + label) }));
        info.addEventListener("click", () => this.dispatchEvent(new CustomEvent("cds-info", { detail: { label: label }, bubbles: true })));
      }

      var body = card.appendChild(CDS.create("div", null, "cds-bn__body"));
      var content = body.appendChild(CDS.create("div", null, "cds-bn__content"));
      content.appendChild(CDS.create("span", null, "cds-bn__label")).textContent = label;
      var row = content.appendChild(CDS.create("div", null, "cds-bn__value"));
      if (number){
        var num = row.appendChild(CDS.create("span", null, "cds-bn__number"));
        num.appendChild(CDS.create("span")).textContent = this.text("value", "0,00");
        num.appendChild(CDS.create("span")).textContent = this.text("unit", "%");
      } else {
        var cur = { size: "largest", appearance: accent ? "inversed" : "neutral", value: this.text("value", "100,00") };
        if (this.getAttribute("symbol")) cur.symbol = this.getAttribute("symbol");
        row.appendChild(CDS.create("cds-currency", cur));
      }
      if (this.flag("show-variation")){
        var va = { label: this.text("variation", "+1%"), appearance: accent ? "inversed" : (this.getAttribute("variation-appearance") || "positive") };
        if (this.getAttribute("variation-icon")) va.icon = this.getAttribute("variation-icon");
        if (this.getAttribute("variation-description")) va.description = this.getAttribute("variation-description");
        row.appendChild(CDS.create("cds-variation-big-number", va));
      }
      if (this.flag("show-trailing-icon")){
        var trail = body.appendChild(CDS.create("span", null, "cds-bn__block cds-bn__trail"));
        trail.appendChild(CDS.create("cds-icon", { icon: this.getAttribute("trailing-icon") || "placeholder-line", size: "large", appearance: accent ? "neutral" : "inversed" }));
      }
      this.appendChild(card);
    }
  }
  CdsBigNumber.define("cds-big-number");
})();
