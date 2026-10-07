/**
 * @deps —
 * <cds-skeleton> — Skeleton · Utilities · set 20967:742 (Kind Round|Square)
 * Description do Figma: placeholder de carregamento que ocupa o espaço de um conteúdo enquanto ele não chegou. Para conteúdo
 * de forma previsível (avatar, imagem, card, bloco de texto): repita instâncias para reproduzir o layout final.
 * Não use para carregamento de ação, como botão em envio de formulário (use o Spinner).
 *
 * Anatomia: Shape (Round = elipse · Square = retângulo, raio Border/Radius/medium) com gradiente linear horizontal
 *   Neutral/Solid/semi-soft → Surface/default (50%) → Neutral/Solid/semi-soft.
 * Motion: brilho (shimmer) como no castanha-react, por decisão do Gustavo (C181; no Figma é estático): 700ms de deslocamento
 *   (Extra Long/01, Systemic/decelerate) + 500ms de pausa (Long/02), em loop. Sem animação com prefers-reduced-motion.
 * Dimensões: definidas por quem consome ("os tamanhos do Figma são amostra"). Padrão do playground: Round 80 × 80
 *   (Sizes/80, a amostra do Figma) · Square na largura do pai × Sizes/160.
 *
 * Atributos: kind (round | square · padrão round, como no Figma e no castanha-react) · width · height
 *   width/height aceitam número da escala de tamanhos ("48" → Common/Sizes/48), número em px ou valor CSS (ex.: "100%"),
 *   como o Skeleton do castanha-react.
 * A11y: decorativo (aria-hidden). Quem carrega marca o container com aria-busy="true" e anuncia quando o conteúdo chega.
 */
(function(){
  "use strict";
  var SIZES = { 0:1, 1:1, 2:1, 4:1, 6:1, 8:1, 12:1, 14:1, 16:1, 20:1, 24:1, 28:1, 32:1, 40:1, 44:1, 48:1, 56:1, 64:1, 72:1, 80:1, 88:1, 92:1, 104:1, 120:1, 160:1, 200:1 };
  function dim(v){
    if (v == null || v === "") return null;
    if (/^\d+$/.test(v)) return SIZES[v] ? "var(--common-sizes-" + v + ")" : v + "px"; // token da escala ou px
    return v;
  }
  class CdsSkeleton extends CDS.Element {
    static get observedAttributes(){ return ["kind", "width", "height"]; }
    render(){
      this.setAttribute("aria-hidden", "true");
      CDS.attr(this, "data-kind", this.getAttribute("kind") === "square" ? "square" : "round");
      var w = dim(this.getAttribute("width")), h = dim(this.getAttribute("height"));
      this.style.setProperty("--_w", w || ""); if (!w) this.style.removeProperty("--_w");
      this.style.setProperty("--_h", h || ""); if (!h) this.style.removeProperty("--_h");
    }
  }
  CdsSkeleton.define("cds-skeleton");
})();
