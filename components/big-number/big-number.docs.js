/* Documentação — Big Number (CDS-1597)
   Fonte: set Big Number 27238:472 na branch KOmiQxHXqiErSbLmoG3sv6 (description, annotations de Handoff, Accessibility e Motion),
   o handoff dev de 16/10 e a página legada do zeroheight (Big Number (Web Only), p/98e195) para princípios e diretrizes.
   Ainda não há frame [Documentação] da versão estável no arquivo de documentação.
   Só dados: o kit (scripts/docs-kit.js) monta a capa e as tabs. */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
(function(){
  function bn(attrs){ return Object.assign({ _tag: "cds-big-number" }, attrs); }
  var SALDO = { label: "Saldo disponível", value: "12.480,90", icon: "coins-line", "show-trailing-icon": "false" };
  var USO = { kind: "number", label: "Taxa de uso", value: "87,5", icon: "chart-line", "show-trailing-icon": "false" };

  CDS.docs["big-number"] = {
    tag: "cds-big-number",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/branch/KOmiQxHXqiErSbLmoG3sv6/-CastanhaDS--Components?node-id=27238-472",
    cover: { description: "Destaca um dado numérico relevante, como valor monetário ou percentual, em painéis e resumos de leitura rápida.", examples: [ bn(SALDO), bn(Object.assign({ appearance: "accent" }, USO)) ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "informative", label: "Em desenvolvimento · CDS-1597", text: "O Big Number estável está na branch do Figma e entra no Release 26. Substitui o Big Number [web only] da lib legado. Ainda não existe no castanha-react nem no Flutter." } },
        { h2: "Sobre" },
        { p: "O Big Number é um card de leitura que destaca um dado numérico. Mostra o nome da métrica, o valor em destaque e, quando houver, a variação do valor." },
        { p: "O valor monetário usa o Currency. Para número com unidade, como percentual, o valor usa o mesmo text style do Currency." },
        { h3: "Nomes alternativos comuns" },
        { p: "KPI card, metric card, highlight number, card de métrica." },
        { h3: "Princípios" },
        { cards: [
          ["Ênfase no dado", "O valor é o centro do card, com alto contraste e escala tipográfica maior."],
          ["Contexto mínimo", "Só o essencial: o nome da métrica e, quando ajuda, a variação."],
          ["Leitura rápida", "A pessoa entende o número de relance e compara com cards ao lado."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Big Number para destacar um dado numérico prioritário em dashboards, resumos ou telas analíticas." },
        { h3: "Utilize para:" },
        { ul: ["Destacar valores monetários relevantes", "Apresentar métricas principais (KPIs)", "Exibir variações percentuais com indicação de tendência", "Resumir dados em painéis"] },
        { h3: "Não utilize para:" },
        { ul: ["Listar vários dados sem hierarquia — use List ou Table", "Saldo de uma categoria que leva ao detalhe — use o Balance Card", "Informação complexa ou detalhada", "Dado que não é prioritário na tela"] },
        { h2: "Big Number vs. Balance Card" },
        { table: { head: ["", "Big Number", "Balance Card"], rows: [
          ["Função", "Leitura de um dado em destaque", "Entrada para o detalhe de uma categoria"],
          ["Interação", "Card não clicável. O alvo é o Information Button", "O card inteiro é clicável"],
          ["Conteúdo", "Valor monetário ou número, com variação opcional", "Saldo da categoria, com tags de status"]
        ] } },
        { compare: [
          { title: "Big Number: leitura com ênfase", attrs: bn(SALDO) },
          { title: "Balance Card: leva ao detalhe", attrs: { _tag: "cds-balance-card", label: "Refeição", value: "320,50", icon: "meal-line" } }
        ] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: {
          attrs: bn({}),
          markers: [
            { n: 1, target: ".cds-bn", side: "left", align: "start" },
            { n: 2, target: ".cds-bn__lead", side: "top" },
            { n: 3, target: "cds-icon-button", side: "right" },
            { n: 4, target: ".cds-bn__label", side: "left" },
            { n: 5, target: "cds-currency", side: "bottom" },
            { n: 6, target: "cds-variation-big-number", side: "bottom" },
            { n: 7, target: ".cds-bn__trail", side: "right" }
          ],
          legend: ["Container: 272×180, Neutral ou Accent", "Lead Icon: bloco de 40 com ícone de 24", "Information Button: Icon Button Ghost Small (opcional)", "Label: nome da métrica", "Valor: Currency Largest ou número com unidade", "Variação: .Variation Big Number (opcional)", "Trailing Icon: bloco de 48 com ícone de 24 (opcional)"]
        } },
        { h2: "Composição do componente" },
        { p: "O Header fica no topo, com o Lead Icon e o Information Button. O Body fica na base, com o Label, a linha do valor e o Trailing Icon. O valor monetário é uma instância do Currency `Size=Largest`. O número usa o text style `Title/Medium`. A variação é o building block .Variation Big Number, com texto e ícone, sem fundo." },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Currency", values: ["Currency", "Number"] },
          { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Accent"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered"] },
          { name: "Show Information", type: "Boolean", default: "true" },
          { name: "Show Variation", type: "Boolean", default: "true" },
          { name: "Show Trailing Icon", type: "Boolean", default: "true" },
          { name: "Lead Icon", type: "Swap component", default: "placeholder-line" },
          { name: "Trailing Icon", type: "Swap component", default: "placeholder-line" },
          { name: "Text Label", type: "Text", default: "Description" },
          { name: "Text Value", type: "Text", default: "0,00" }
        ] },
        { note: "`Text Value` age só no Kind=Number. No Kind=Currency o valor vem do próprio Currency. A instância `Variation` fica exposta para trocar Appearance, Text Label e Icon. No código: `kind`, `appearance`, `label`, `value`, `symbol`, `unit`, `icon`, `trailing-icon`, `show-information`, `show-variation`, `show-trailing-icon`, `variation`, `variation-appearance`, `variation-icon`, `variation-description` e `info-label`. Evento `cds-info` no Information Button." },
        { h2: "Entrega para dev · CDS-1597" },
        { table: { head: ["Elemento", "Token ou valor (branch, 16/10)"], rows: [
          ["Container", "272×180 (mesma medida do legado) · padding `Sizes/24` · raio `Border/Radius/large`"],
          ["Fundo", "Neutral `Surface/01` · Accent `Surface/accent`"],
          ["Hovered", "Neutral `Neutral/Solid/semi-soft` · Accent com overlay `Neutral/Opacity/Intense/semi-transparent`"],
          ["Lead Icon", "40×40 `Sizes/40` · raio `Border/Radius/small` · fundo `Surface/default` · ícone 24 `Icons/intense`"],
          ["Trailing Icon", "48×48 `Sizes/48` · raio `Border/Radius/medium` · Neutral `Surface/accent` com ícone `Icons/inversed` · Accent `Surface/default` com ícone `Icons/intense`"],
          ["Information Button", "Icon Button Ghost Small (40) · `information-line` · Inversed no Accent"],
          ["Texto", "Label `Caption/Regular` em `Text/medium` (`Text/inversed` no Accent) · valor `Title/Medium`"],
          ["Espaços", "`Sizes/8` no Header, no Body e entre valor e variação · `Sizes/4` entre Label e valor"]
        ] } },
        { ul: [
          "O card é de leitura: tem Enabled e Hovered, sem Pressed e sem Disabled. O único alvo de toque é o Information Button.",
          "O Hovered muda só o fundo. No Neutral o fundo vira sólido. No Accent entra um overlay de 16%.",
          "O texto da amostra (Description, R$ 100,00, 0,00 %, +1%) é ilustração. O conteúdo real vem do uso."
        ] }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estilos" },
        { specimens: { title: "Kind · Neutral", min: 272, items: [
          { label: "Currency", attrs: bn({}) },
          { label: "Number", attrs: bn({ kind: "number" }) }
        ] } },
        { specimens: { title: "Kind · Accent", min: 272, items: [
          { label: "Currency", attrs: bn({ appearance: "accent" }) },
          { label: "Number", attrs: bn({ kind: "number", appearance: "accent" }) }
        ] } },
        { specimens: { title: "State", min: 272, items: [
          { label: "Neutral · Hovered", attrs: bn({ state: "hovered" }) },
          { label: "Accent · Hovered", attrs: bn({ appearance: "accent", state: "hovered" }) }
        ] } },
        { specimens: { title: ".Variation Big Number · Appearance", items: [
          { label: "Positive", attrs: { _tag: "cds-variation-big-number" } },
          { label: "Warning", attrs: { _tag: "cds-variation-big-number", appearance: "warning", label: "-3%" } },
          { label: "Negative", attrs: { _tag: "cds-variation-big-number", appearance: "negative", label: "-8%" } },
          { label: "Informative", attrs: { _tag: "cds-variation-big-number", appearance: "informative", label: "0%" } },
          { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-variation-big-number", appearance: "inversed" }] } }
        ] } },
        { specimens: { title: "Opcionais", min: 272, items: [
          { label: "Sem variação", attrs: bn({ "show-variation": "false" }) },
          { label: "Sem Trailing Icon", attrs: bn({ "show-trailing-icon": "false" }) },
          { label: "Sem Information Button", attrs: bn({ "show-information": "false" }) }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { h3: "Como é anunciado" },
        { ol: [
          "O card não tem papel interativo. O leitor de tela lê o conteúdo na ordem do layout.",
          "O valor fica exposto como texto, ex.: R$ 12.480,90. O leitor de tela faz a leitura, sem `aria-label` soletrado.",
          "A variação expõe o sentido em texto, não só na cor e no ícone. Use `variation-description`, ex.: Aumento de 1% em relação ao período anterior.",
          "O ícone da variação e os ícones do Lead e do Trailing são decorativos (`aria-hidden`).",
          "O Information Button tem nome acessível com a métrica. Padrão: Mais informações sobre {Label}, ou o texto de `info-label`."
        ] },
        { h3: "Ordem de leitura" },
        { ol: ["Information Button (Mais informações sobre a métrica)", "Label", "Valor", "Variação"] },
        { h3: "Teclado" },
        { table: { head: ["Tecla", "Ação"], rows: [
          ["Tab", "Leva o foco ao Information Button. O card não recebe foco"],
          ["Enter ou Espaço no Information Button", "Dispara `cds-info`"]
        ] } },
        { h3: "Contraste (WCAG)" },
        { ol: [
          "Label (`Text/medium`): 7,42:1 em Enabled e 6,59:1 em Hovered.",
          "Valor (`Text/intense`, 24): 15,27:1 em Enabled e 13,56:1 em Hovered.",
          "Variação: Positive 8,30:1 e 7,37:1 · Warning 5,77:1 e 5,12:1 · Negative 8,55:1 e 7,59:1 · Informative 7,15:1 e 6,35:1.",
          "Texto, valor e variação no Accent (`Text/inversed`): 4,54:1 em Enabled e 5,83:1 em Hovered.",
          "Os blocos do Lead e do Trailing são decorativos. Vale o contraste do ícone dentro deles: 16,96:1 e 4,54:1.",
          "Information Button de 40×40: acima do alvo mínimo de 24×24 (2.5.8)."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes" },
        { guides: [
          { attrs: bn(SALDO), title: "Priorize um único dado",
            text: "Cada card mostra uma métrica. Para comparar várias, use vários cards lado a lado." },
          { attrs: [bn(SALDO), bn({ label: "Gasto no mês", value: "3.210,40", icon: "receipt-line", "show-trailing-icon": "false", "variation-appearance": "negative", variation: "+12%" })], title: "Mantenha consistência entre cards",
            text: "Cards lado a lado usam o mesmo Kind e a mesma Appearance, com a mesma estrutura." },
          { attrs: bn(Object.assign({ appearance: "accent" }, SALDO)), title: "Use o Accent com critério",
            text: "O Accent destaca o dado mais importante da tela. Use um por tela." }
        ] },
        { h2: "Do's and Don'ts" },
        { dodont: [
          { kind: "do", attrs: bn({ label: "Saldo disponível", value: "12.480,90", icon: "coins-line", "show-trailing-icon": "false" }), text: "Rótulo curto, com o nome da métrica." },
          { kind: "dont", attrs: bn({ label: "Saldo total disponível para uso neste mês", value: "12.480,90", icon: "coins-line", "show-trailing-icon": "false" }), text: "Rótulo longo compete com o valor e quebra a leitura rápida." },
          { kind: "do", attrs: bn(Object.assign({ "variation-description": "Aumento de 1% em relação ao mês anterior" }, SALDO)), text: "Variação com o sentido em texto para o leitor de tela." },
          { kind: "dont", attrs: [bn(Object.assign({ appearance: "accent" }, SALDO)), bn(Object.assign({ appearance: "accent" }, USO))], text: "Vários cards em Accent na mesma tela: nenhum deles se destaca." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A documentação de motion para devs ainda não tem página do Big Number. Até sair, vale o Hover In/01." } },
        { display: { attrs: bn(SALDO), live: true } },
        { note: "Exemplo interativo: passe o mouse no card para ver a troca do fundo." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] }
        ] }
      ] }
    ]
  };
})();
