/* Documentação — Currency
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Currency, 963ecf) reaproveitado; props e padrões validados no set da lib estável
   (Currency 5301:2173; a seção [Documentation] Currency 4171:869 usa o mesmo set); acessibilidade e contrastes medidos no playground.
   Divergências no CONFERIR (C130). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["currency"] = {
  tag: "cds-currency",
  base: { value: "1.250,00" },
  source: "https://castanha.caju.com.br/858426090/v/latest/p/963ecf-currency", sourceLabel: "Abrir o Currency no zeroheight",
  cover: { description: "O Currency é um componente de exibição utilizado para apresentar valores monetários de forma padronizada, legível e consistente nas interfaces da Caju.", examples: [
    { value: "1.250,00", size: "largest" }, { value: "1.250,00", size: "largest", "show-value": false }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { h2: "Sobre" },
      { p: "O Currency é um componente de exibição utilizado para apresentar valores monetários de forma padronizada, legível e consistente nas interfaces da Caju." },
      { h3: "Nomes alternativos comuns" },
      { p: "Valor monetário, Monetary value, Amount" },
      { h3: "Princípios" },
      { cards: [
        ["Clareza", "O valor deve ser identificado e lido sem esforço pela pessoa usuária."],
        ["Consistência", "A apresentação padronizada de moeda em diferentes contextos da interface."],
        ["Privacidade", "Possibilidade de ocultar valores sensíveis quando necessário."]
      ] },
      { h2: "Quando usar" },
      { p: "Use o Currency sempre que for necessário exibir valores monetários em telas de produto, como saldos, preços, limites, totais, resumos financeiros ou confirmações, garantindo padronização visual e semântica do valor apresentado." },
      { h3: "Utilize para:" },
      { ul: ["Exibir saldos, preços e totais financeiros", "Mostrar valores associados a benefícios, cartões ou transações", "Apresentar valores em estados visíveis ou ocultos"] },
      { h3: "Não utilize para:" },
      { ul: ["Entrada de dados financeiros (use componentes de Text input)", "Exibição de números não monetários", "Simulações visuais que não representem valores reais"] },
      { h2: "Casos de uso" },
      { h3: "Currency vs Text comum" },
      { p: "Diferente de um texto simples, o Currency aplica regras de formatação, hierarquia tipográfica e alinhamento adequadas para valores monetários, reduzindo ambiguidades e aumentando a legibilidade." },
      { h3: "Currency vs Text input" },
      { p: "O Currency é exclusivamente para exibição. Inputs permitem edição e interação, enquanto o Currency comunica informação final ou informativa." },
      { compare: [
        { title: "Currency: exibição", attrs: { value: "1.250,00", size: "large" } },
        { title: "Text Input: entrada", attrs: { _tag: "cds-text-input", label: "Valor", value: "1.250,00", "show-supporting-content": false, "show-required": false } }
      ] },
      { note: "Suporte: fale com o time no canal #castanha-suporte no Slack." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: { attrs: { value: "1.250,00", size: "largest" }, markers: [{ n: 1, target: ":scope > span:last-child", side: "left" }], legend: ["Currency label (símbolo e valor)"] } },
      { h2: "Propriedades" },
      { props: [
        { name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Inversed"] },
        { name: "Size", type: "Variant", default: "Small", values: ["Small", "Medium", "Large", "Largest"] },
        { name: "Show Value", type: "Variant", default: "True", values: ["True", "False"] }
      ] },
      { note: "Props e padrões lidos do set Currency da lib estável. O zeroheight lista Style e `Is hidden` (Boolean). Na lib são `Appearance` e `Show Value` (Variant, padrão True) — CONFERIR C130. No código: `value`, `symbol` (padrão R$), `appearance`, `size` e `show-value`." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Size" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "Small", attrs: {} }, { label: "Medium", attrs: { size: "medium" } }, { label: "Large", attrs: { size: "large" } }, { label: "Largest", attrs: { size: "largest" } }
      ] } },
      { h2: "Appearance e Show Value" },
      { specimens: { min: "var(--common-sizes-160)", items: [
        { label: "Neutral", attrs: { size: "large" } },
        { label: "Inversed", attrs: { _tag: "div", class: "pg-doc-on-accent", _children: [{ _tag: "cds-currency", value: "1.250,00", size: "large", appearance: "inversed" }] } },
        { label: "Show Value · False", attrs: { size: "large", "show-value": false } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "Visível, o valor é lido como texto: símbolo e valor (ex.: R$ 1.250,00).",
        "Oculto (`Show Value` False), os pontos são decorativos e o componente vira `role=\"img\"` com o nome \"R$ valor oculto\": a pessoa sabe que existe um valor, sem ouvi-lo.",
        "Quem controla a exibição (ex.: um Icon Button de olho) deve ter rótulo claro, como \"Mostrar saldo\" e \"Ocultar saldo\"."
      ] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Neutral (`Text/intense`): 16,96:1 — AA e AAA.", "Inversed (`Text/inversed`) sobre `Surface/accent`: 4,54:1 — AA."] },
      { note: "O zeroheight ainda não tem seção de Acessibilidade para o Currency. Contrastes medidos no tema light do playground." }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: [{ value: "1.250,00", size: "large", "show-value": false }, { _tag: "cds-icon-button", icon: "hide-off-line", label: "Mostrar saldo", kind: "ghost", appearance: "neutral" }], title: "Uso correto do estado oculto", text: "Ative a opção de ocultação para valores sensíveis em contextos de privacidade, garantindo que a pessoa usuária reconheça que existe um valor, mesmo sem vê-lo." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { value: "1.250,00", size: "large" }, text: "Utilize o Currency para apresentar valores finais, como saldos ou preços, garantindo formatação monetária consistente e legível." },
        { kind: "dont", attrs: { value: "3 cartões", size: "large", symbol: "" }, text: "Não utilize o Currency para textos comuns que não representes valores monetários." }
      ] },
      { note: "Para as regras de escrita de valores (sinal de subtração, casas decimais, separador de milhar), consulte Conteúdo → Formatação de dados." }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "A animação do Currency fornece feedback visual único após ação do usuário. É feito uma vez por interação com escala suave para evitar distrações. A reprodução reforça a percepção do estado validado no sistema." },
      { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight indica Mostrar e Ocultar com easing expressive/decelerate e duração short/01, que não correspondem a nenhum Motion Style da `.Motion Styles`. A animação ainda não está no componente do playground (CONFERIR C130)." } }
    ] }
  ]
};
