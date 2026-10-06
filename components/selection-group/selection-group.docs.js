/* Documentação — Checkbox Group · Radio Button Group · Switch Group (rascunho)
   Sem página no zeroheight. Os sets (4132:1511 · 4429:11192 · 4895:1233) têm description, mas é o texto do item
   (Checkbox, Radio Button, Switch), não do grupo: as frases citadas aqui vêm literais de lá; o resto foi escrito a partir
   do Figma, das docs dos itens ([Documentation] Checkbox/Radio Button/Switch usam os grupos) e do playground. Revisar com o time (C149).
   Uma pasta, três docs (ids do playground): checkbox-group, radio-button-group e switch-group. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var FIG = "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=";
  var OPTS = ["Vale-refeição", "Vale-alimentação", "Mobilidade"];

  function doc(g){
    function items(sel){ return (g.opts || OPTS).map(function(l, i){ return { _tag: g.item, label: l, status: sel.indexOf(i) > -1 ? "selected" : "unselected" }; }); }
    return {
      tag: g.tag,
      base: { label: g.label, _children: items(g.sel) },
      source: FIG + g.node, sourceLabel: "Abrir o " + g.name + " no Figma",
      cover: { description: g.cover, examples: [ {} ] },
      tabs: [
        { id: "uso", title: "Uso", blocks: [
          { alert: { appearance: "warning", label: "Rascunho", text: "O " + g.name + " não tem página no zeroheight, e a description do set é a mesma do " + g.itemName + ". O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
          { h2: "Sobre" },
          { p: "O " + g.name + " empilha " + g.itemName + "s numa coluna com espaço de 8 entre eles e dá um nome ao conjunto. Os itens são independentes: cada um tem o próprio Label, Status e State." },
          { p: g.about },
          { h2: "Quando usar" },
          { p: "Use o grupo sempre que houver mais de um " + g.itemName + " sobre o mesmo assunto. Quando usar o " + g.itemName + " em si está na doc dele." },
          { h3: "Da description do set" },
          { ul: g.quotes },
          { note: "Frases literais da description do set " + g.name + " na lib estável." }
        ] },

        { id: "anatomia", title: "Anatomia", blocks: [
          { h2: "Anatomia" },
          { anatomy: { attrs: {}, markers: [{ n: 1, target: g.tag, side: "left" }, { n: 2, target: g.item, side: "right" }], legend: ["Container (coluna, gap 8)", g.itemName + " (Slot)"] } },
          { h2: "Propriedades" },
          { p: "O set não tem propriedades: o conteúdo é o Slot com os " + g.itemName + "s (o Figma mostra 6)." },
          { note: "No código: `label` (nome acessível do grupo)" + (g.radio ? " e `name` (aplicado aos Radio Buttons sem `name`, e sem ele o grupo gera um)" : "") + ". Os itens são filhos diretos." }
        ] },

        { id: "estilos", title: "Estilos", blocks: [
          { h2: "Exemplos" },
          { specimens: { min: "var(--common-sizes-160)", items: g.specimens.map(function(s){ return { label: s[0], attrs: { _children: items(s[1]) } }; }) } }
        ] },

        { id: "acessibilidade", title: "Acessibilidade", blocks: [
          { h2: "Teclado e leitor de tela" },
          { ul: g.a11y }
        ] },

        { id: "diretrizes", title: "Diretrizes", blocks: [
          { h2: "Diretrizes de uso" },
          { ul: g.guides }
        ] },

        { id: "motion", title: "Motion", blocks: [
          { h2: "Motion" },
          { display: { attrs: {}, live: true } },
          { note: "Exemplo interativo: as transições são as do " + g.itemName + " (consulte a doc dele)." }
        ] }
      ]
    };
  }

  CDS.docs["checkbox-group"] = doc({ tag: "cds-checkbox-group", item: "cds-checkbox", name: "Checkbox Group", itemName: "Checkbox", node: "4132-1511", label: "Benefícios", sel: [0, 1],
    cover: "Coluna de Checkboxes com um nome para o conjunto: zero, uma ou várias opções.",
    about: "Cada Checkbox é marcado sozinho, e o grupo não limita quantos ficam selecionados.",
    quotes: ["Sempre associe um rótulo claro ao checkbox para acessibilidade (exceto em casos muito específicos, como tabelas com cabeçalhos óbvios).", "Utilize o estado \"Indeterminado\" apenas quando a seleção do checkbox pai depende de sub-opções."],
    specimens: [["Nenhum selecionado", []], ["Alguns selecionados", [0, 1]]],
    a11y: ["O grupo tem `role=\"group\"` e o nome vem de `label`.", "`Tab` passa de Checkbox em Checkbox, e `Espaço` marca e desmarca.", "Para uma pergunta de formulário, o `label` do grupo deve ser a pergunta."],
    guides: ["Empilhe na vertical. Não coloque Checkboxes lado a lado (consulte a doc do Checkbox).", "Ordene as opções de forma lógica (frequência, alfabética).", "Use o grupo com \"Selecionar todos\" (Indeterminate) exclusivamente quando as opções formam um bloco."] });

  CDS.docs["radio-button-group"] = doc({ tag: "cds-radio-button-group", item: "cds-radio-button", name: "Radio Button Group", itemName: "Radio Button", node: "4429-11192", label: "Forma de pagamento", sel: [0], radio: true, opts: ["Pix", "Boleto", "Cartão de crédito"],
    cover: "Coluna de Radio Buttons com um nome para o conjunto: exatamente uma opção.",
    about: "Os Radio Buttons do grupo compartilham o mesmo `name`: escolher um desmarca o outro.",
    quotes: ["Selecione uma opção padrão sempre que possível para guiar o usuário e evitar estados ambíguos.", "Evite usar mais de 5-7 opções em um grupo; para mais, considere um dropdown ou select."],
    specimens: [["Com opção padrão", [0]], ["Sem seleção", []]],
    a11y: ["O grupo tem `role=\"radiogroup\"` e o nome vem de `label`.", "`Tab` entra no grupo pelo Radio selecionado (ou o primeiro). As setas trocam a opção, como no navegador.", "Todos os Radios do grupo têm o mesmo `name`, e o grupo aplica um quando falta."],
    guides: ["Uma pergunta por grupo.", "Labels curtos e paralelos (mesmo tipo de resposta)."] });

  CDS.docs["switch-group"] = doc({ tag: "cds-switch-group", item: "cds-switch", name: "Switch Group", itemName: "Switch", node: "4895-1233", label: "Notificações", sel: [0, 2], opts: ["E-mail", "SMS", "Notificações no app"],
    cover: "Coluna de Switches com um nome para o conjunto: cada um liga ou desliga uma configuração na hora.",
    about: "Cada Switch controla a própria configuração e aplica a mudança na hora. O papel do grupo é reuni-los sob um nome.",
    quotes: ["Cada Switch deve controlar uma única configuração binária.", "Use o Switch apenas quando a ação for instantânea e não exigir um botão de \"Salvar\" ou \"Aplicar\"."],
    specimens: [["Alguns ligados", [0, 2]], ["Todos desligados", []]],
    a11y: ["O grupo tem `role=\"group\"` e o nome vem de `label`.", "`Tab` passa de Switch em Switch, e `Espaço` liga e desliga."],
    guides: ["Agrupe exclusivamente configurações do mesmo assunto.", "Não misture Switches e Checkboxes no mesmo grupo."] });
})();
