/* Documentação — Confirmation Message (rascunho)
   Sem página no zeroheight e sem description/annotations no Figma (05/10): texto escrito a partir do set da lib estável
   (Confirmation Message 16359:1803, página Content) e do componente do playground, no template Juntos. Revisar com o time (C130). */
window.CDS = window.CDS || {};
CDS.docs = CDS.docs || {};
CDS.docs["confirmation-message"] = {
  tag: "cds-confirmation-message",
  base: { icon: "check-line", title: "Pedido enviado", description: "Você recebe a confirmação por e-mail em até 2 dias úteis." },
  source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=16359-1803", sourceLabel: "Abrir o Confirmation Message no Figma",
  cover: { description: "Mostre o resultado de uma ação com ícone, título e descrição centralizados.", examples: [
    { appearance: "positive", icon: "check-line", title: "Pedido enviado", description: "Você recebe a confirmação por e-mail em até 2 dias úteis." }
  ] },
  tabs: [
    { id: "uso", title: "Uso", blocks: [
      { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
      { h2: "Sobre" },
      { p: "O Confirmation Message mostra o resultado de uma ação em uma composição centralizada: Shaped Icon, título e descrição. Aparece em conteúdos de confirmação, como o corpo de um Modal ou de um Bottom Sheet." },
      { h2: "Quando usar" },
      { h3: "Utilize para:" },
      { ul: ["Confirmar que uma ação foi concluída (`Positive`).", "Avisar sobre algo que pede atenção antes de seguir (`Warning`).", "Informar um estado neutro, sem sucesso nem alerta (`Neutral`)."] },
      { h3: "Não utilize para:" },
      { ul: ["Telas inteiras de sucesso, erro ou empty state — use as Feedback Pages.", "Mensagens curtas e temporárias — use o Toast.", "Avisos dentro de um fluxo — use o Alert."] },
      { note: "Para as regras de texto de mensagens de sucesso, alerta e erro, consulte Conteúdo → Feedback Pages." }
    ] },

    { id: "anatomia", title: "Anatomia", blocks: [
      { h2: "Anatomia" },
      { anatomy: {
        attrs: { appearance: "positive", icon: "check-line", title: "Pedido enviado", description: "Você recebe a confirmação por e-mail em até 2 dias úteis." },
        markers: [{ n: 1, target: "cds-shaped-icon", side: "left" }, { n: 2, target: ".cds-cm__title", side: "right" }, { n: 3, target: ".cds-cm__desc", side: "left" }],
        legend: ["Shaped Icon (Large · 56)", "Title (Title/Medium)", "Description (Body/Regular)"]
      } },
      { h2: "Composição do componente" },
      { p: "Usa o Shaped Icon (Large) com a mesma Appearance do componente. Título e descrição ficam centralizados abaixo do ícone." },
      { h2: "Propriedades" },
      { props: [{ name: "Appearance", type: "Variant", default: "Neutral", values: ["Neutral", "Positive", "Warning"] }] },
      { note: "No Figma, `Appearance` é a única prop. Ícone, título e descrição são texto da amostra. No código ficam expostos como `icon`, `title` e `description`." }
    ] },

    { id: "estilos", title: "Estilos", blocks: [
      { h2: "Appearance" },
      { specimens: { min: "var(--common-sizes-200)", items: [
        { label: "Neutral", attrs: { icon: "information-line", title: "Dados atualizados", description: "As alterações já aparecem no seu perfil." } },
        { label: "Positive", attrs: { appearance: "positive" } },
        { label: "Warning", attrs: { appearance: "warning", icon: "timer-line", title: "Análise em andamento", description: "A análise pode levar até 2 dias úteis." } }
      ] } }
    ] },

    { id: "acessibilidade", title: "Acessibilidade", blocks: [
      { h2: "Leitor de tela" },
      { ul: [
        "O ícone é decorativo: o resultado precisa estar no título, nunca exclusivamente na cor ou no ícone.",
        "Título e descrição são lidos em ordem, de cima para baixo.",
        "Quando a mensagem aparece depois de uma ação, quem implementa deve levar o foco ao título ou anunciá-la (ex.: `role=\"status\"` no container)."
      ] },
      { h2: "Contraste (WCAG)" },
      { ul: ["Título (`Text/intense`): 16,96:1 — AA e AAA.", "Descrição (`Text/medium`): 8,24:1 — AA e AAA."] }
    ] },

    { id: "diretrizes", title: "Diretrizes", blocks: [
      { h2: "Diretrizes de uso" },
      { guides: [
        { attrs: { appearance: "positive" }, title: "Use a Appearance do resultado", text: "Positive para ação concluída, Warning para o que pede atenção e Neutral para informar. O ícone acompanha a Appearance." },
        { attrs: { appearance: "positive", title: "Pedido enviado", description: "Você recebe a confirmação por e-mail em até 2 dias úteis." }, title: "Título diz o que aconteceu, descrição diz o próximo passo", text: "Siga as regras de Feedback Pages: voz passiva no título, sem \"com sucesso\", e contexto ou prazo na descrição." }
      ] },
      { h2: "Do's and Don'ts" },
      { dodont: [
        { kind: "do", attrs: { appearance: "positive", title: "Pedido enviado", description: "Você recebe a confirmação por e-mail em até 2 dias úteis." }, text: "Título objetivo e descrição com o próximo passo." },
        { kind: "dont", attrs: { appearance: "positive", title: "Feito!", description: "Seu pedido foi enviado com sucesso." }, text: "Título genérico e \"com sucesso\" — não explicam o que aconteceu nem o que vem depois." }
      ] }
    ] },

    { id: "motion", title: "Motion", blocks: [
      { h2: "Motion" },
      { p: "O Confirmation Message é estático: não tem estados de interação nem animação própria. A entrada e a saída seguem o container que o exibe (Modal, Bottom Sheet)." }
    ] }
  ]
};
