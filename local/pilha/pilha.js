/**
 * <loc-pilha> — Pilha de cartões · COMPONENTE LOCAL do playground (não é componente do Castanha DS)
 *
 * Assinatura visual das páginas do playground, vinda do conceito do Castanha Assets (Figma ivkZfOligMDrdIur2kdqtT,
 * capa "Assets" e .Thumbnail Castanha): cartões empilhados do tom mais escuro (atrás) ao mais claro ou saturado (frente).
 * Só tokens do DS: escala accent-solid para a marca e as escalas Charts por área. Uso só no playground (Início,
 * capas e cards de seção); doc em #/locais (página escondida, link no Relatório › Arquitetura).
 *
 * Atributos:
 *   area   marca (padrão) · componentes · padroes · aprenda · ferramentas · ajuda · legado   escala de cor (CDS.local.areas)
 *   on     "accent": a pilha está sobre Surface/accent (hero vermelho); troca os tons para contrastar com o fundo
 *   cards  3 · 4 (padrão)
 *   align  center (padrão: cartões centrados na altura) · end (encostados embaixo, sangrando, como na .Thumbnail por jornada)
 *   fan    sem valor: abre em leque parada (doc). Sem ele, abre no hover/foco de um ancestral .loc-pilha-trigger
 * Tamanho: quem usa define a altura (ou a largura); a proporção vem do número de cartões.
 * A11y: decorativa — aria-hidden, sem foco. Motion: Hover In/01 e Hover Out/01; prefers-reduced-motion desliga.
 */
(function(){
  "use strict";
  var CDS = window.CDS = window.CDS || {};
  CDS.local = CDS.local || {};
  // Cor por área: a seção do menu leva a escala (D221). Escalas Charts do tema; a marca usa accent-solid.
  CDS.local.areas = {
    marca: { name: "Marca", ramp: "accent-solid", note: "Início e páginas da marca" },
    componentes: { name: "Componentes", ramp: "accent-solid", note: "Componentes, building blocks e composições" },
    padroes: { name: "Padrões", ramp: "charts-03", note: "Tema Caju, Ilustração, Motion, Camadas, Conteúdo e Patterns" },
    aprenda: { name: "Aprenda", ramp: "charts-03", note: "Treinamento e Capacitações" }, // azul no lugar do roxo (Gustavo, 06/10)
    ferramentas: { name: "Ferramentas", ramp: "charts-02", note: "Personas, Agentes e Skills e MCP" },
    ajuda: { name: "Ajuda", ramp: "charts-01", note: "FAQ e Changelog" },
    legado: { name: "Legado", ramp: "charts-07", note: "Componente ou página fora de uso" }
  };
  class LocPilha extends CDS.Element {
    static get observedAttributes(){ return ["cards"]; }
    render(){
      this.setAttribute("aria-hidden", "true");
      var n = this.getAttribute("cards") === "3" ? 3 : 4;
      if (this.children.length === n) return;
      this.textContent = "";
      // atrás → frente; --_k = distância até o cartão da frente (0)
      for (var i = 0; i < n; i++){ var s = document.createElement("span"); s.style.setProperty("--_k", String(n - 1 - i)); this.appendChild(s); }
    }
  }
  if (!customElements.get("loc-pilha")) customElements.define("loc-pilha", LocPilha);
})();
