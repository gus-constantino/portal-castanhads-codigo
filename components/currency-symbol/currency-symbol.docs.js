/* Documentação — .Currency Symbol (building block)
   Sem página no zeroheight nem description no set (05/10): texto escrito a partir do set da lib estável (.Currency Symbol 13438:7016) e do playground.
   Peça interna do Table (.Data Cell); não é usada sozinha. Revisar com o time (C150). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["currency-symbol"] = {
    tag: "cds-currency-symbol",
    base: { currency: "brazil-real" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=13438-7016", sourceLabel: "Abrir o .Currency Symbol no Figma",
    cover: { description: "Símbolo da moeda usado nas células de valor da Table.", examples: [ { _tag: "div", class: "pg-doc-row", _children: [{ _tag: "cds-currency-symbol", currency: "brazil-real" }, { _tag: "cds-currency-symbol", currency: "us-dollar" }, { _tag: "cds-currency-symbol", currency: "euro" }, { _tag: "cds-currency-symbol", currency: "british-pound" }] } ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Building block sem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O .Currency Symbol é o símbolo da moeda (R$, US$, €…) que acompanha os valores na .Data Cell da Table. O set tem 20 moedas; o padrão é Brazil Real." },
        { h2: "Quando usar" },
        { ul: ["Só dentro do Table (.Data Cell), que monta e controla os itens.", "Fora dele, use o componente completo (Table (.Data Cell))."] },
        { compare: [{ title: "Dentro do Table (.Data Cell)", attrs: { _tag: "cds-table" } }] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-currency-symbol", side: "left" }], legend: ["Símbolo da moeda (Currency)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Currency", type: "Variant", default: "Brazil Real", values: ["Brazil Real", "US Dollar", "Euro", "British Pound", "Japanese Yen", "Chinese Yuan", "Canadian Dollar", "Australian Dollar", "Swiss Franc", "Indian Rupee", "South Korean Won", "Mexican Peso", "Russian Ruble", "South African Rand", "Turkish Lira", "Swedish Krona", "Norwegian Krone", "Danish Krone", "Singapore Dollar", "Hong Kong Dollar"] }
        ] },
        { note: "Props e padrões lidos do set .Currency Symbol da lib estável. No código: `currency` com o nome da variante em kebab-case (`brazil-real`, `us-dollar`, `euro`…)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Estados" },
        { specimens: { min: "var(--common-sizes-120)", items: [
          { label: "Brazil Real", attrs: {} },
          { label: "US Dollar", attrs: { currency: "us-dollar" } },
          { label: "Euro", attrs: { currency: "euro" } },
          { label: "British Pound", attrs: { currency: "british-pound" } },
          { label: "Japanese Yen", attrs: { currency: "japanese-yen" } },
          { label: "Swiss Franc", attrs: { currency: "swiss-franc" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É texto: o leitor de tela lê o símbolo junto com o valor ao lado.",
          "Quando a moeda não for óbvia pelo contexto, diga o nome dela no cabeçalho da coluna."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Use o mesmo símbolo em toda a coluna.", "Para Real, use R$ (padrão)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "Sem estados de interação: não há Motion." }
      ] }
    ]
  };
})();
