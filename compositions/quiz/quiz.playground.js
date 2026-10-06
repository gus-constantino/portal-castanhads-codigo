/* Playground — Quiz em cards (composição do playground, não é do DS: ver quiz.js) */
CDS.register({
  id: "quiz", name: "Quiz", composition: true, category: "Composições",
  description: "Quiz pergunta por pergunta, montado com Card, Nav Control, Selection List (Radio Button), Alert e Main Button. Usado em Capacitações.",
  mount: function(ctx){
    var kit = ctx.kit;
    var q = kit.el("cmp-quiz", { label: "Quiz de exemplo", style: "width:calc(var(--common-sizes-200) * 3)" });
    q.questions = [
      { q: "O respiro entre a borda do card e o texto dentro dele é…", options: ["Margin", "Border", "Padding"], answer: 2, why: "Padding é interno e pertence ao componente." },
      { q: "Fill container no Figma vira o quê no código?", options: ["width: fit-content", "flex: 1 ou width: 100%", "Uma largura fixa em px"], answer: 1, why: "Hug vira fit-content, Fill vira flex: 1 e Fixed vira largura fixa." }
    ];
    q.results = [{ min: 2, illustration: "objetos/trofeu", title: "Gabaritou!", text: "Tudo certo." }, { min: 0, illustration: "notificacoes/success-low-detail", title: "Bora mais uma?", text: "Refaça o quiz." }];
    ctx.preview.appendChild(q);
    kit.hint(ctx.panel, "Composição do playground (prefixo cmp-): as perguntas entram pela propriedade questions antes de conectar. Usada no bloco quiz das docs (Capacitações › Protótipos no Figma).");
  }
});
