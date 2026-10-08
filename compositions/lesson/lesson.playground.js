/* Playground — Lição (composição do playground, não é do DS: ver lesson.js) */
CDS.register({
  id: "lesson", name: "Lição", composition: true, category: "Composições",
  description: "Lição no estilo Duolingo: uma tela por vez, vidas, feedback com Continuar, questão errada volta no fim e tela de XP. Usada no Castanha Quiz.",
  mount: function(ctx){
    var kit = ctx.kit;
    var l = kit.el("cmp-lesson", { label: "Lição de exemplo", heading: "Lição de exemplo", illustration: "interfaces/lista", style: "width:calc(var(--common-sizes-200) * 3); max-width:100%" });
    l.exercises = [
      { type: "choice", q: "Para seleção múltipla, qual componente?", options: ["Checkbox", "Radio Button", "Switch"], answer: 0, why: "O Checkbox é para seleção múltipla." },
      { type: "fill", text: "Use um único Main Button ___ por tela ou seção.", options: ["primário (accent)", "ghost", "neutral"], answer: 0, why: "Um primário por tela deixa a hierarquia clara." },
      { type: "verdict", q: "Main Button para levar a outra página.", answer: "dont", why: "Navegação entre páginas é com o Link." }
    ];
    ctx.preview.appendChild(l);
    kit.hint(ctx.panel, "Composição do playground (prefixo cmp-): os exercícios entram pela propriedade exercises antes de conectar. Tipos: choice, verdict, fill, order e pairs.");
  }
});
