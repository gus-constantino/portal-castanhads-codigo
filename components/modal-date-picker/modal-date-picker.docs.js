/* Documentação — Modal Date Picker (rascunho)
   Sem página no zeroheight, sem [Documentation] e sem description no set (05/10). Texto escrito a partir do set da lib estável
   (Modal Date Picker 17560:51555) e do playground. Revisar com o time (C148). Exemplos em `inline` (sem abrir o diálogo). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["modal-date-picker"] = {
    tag: "cds-modal-date-picker",
    base: { inline: true, viewport: "desktop", today: "2026-01-20", month: "2026-01", "role-kind": "range", start: "2026-01-13", end: "2026-01-24" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17560-51555", sourceLabel: "Abrir o Modal Date Picker no Figma",
    cover: { description: "Calendário num Modal, com Cancelar e Confirmar: a data vale depois de confirmada.", tall: true, examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "O Modal Date Picker ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Modal Date Picker é um Modal com o Date Picker dentro: título \"Selecione uma data\", o calendário e o rodapé com Cancelar e Confirmar. A data é aplicada no Confirmar. Cancelar, Esc e o Backdrop descartam a escolha." },
        { p: "É exclusivo para desktop: em mobile e tablet, o componente é coberto pelo Viewport Restriction, como no Figma." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Escolher uma data ou intervalo que muda algo importante e precisa de confirmação (ex.: período de um relatório).", "Filtros de data em telas do Portal (desktop)."] },
        { h3: "Não utilize para:" },
        { ul: ["Campos de data em formulários — use o Date Input.", "Telas mobile — use o Date Input ou um Bottom Sheet."] }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-header, .cds-modal__header", side: "top", align: "start" }, { n: 2, target: "cds-date-picker", side: "left" }, { n: 3, target: "cds-footer", side: "bottom", align: "start" }], legend: [".Header \"Selecione uma data\" (sem Close Button nem Divider)", "Date Picker", ".Footer Horizontal (Cancelar · Confirmar)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Single Calendar", values: ["Single Calendar", "Double Calendar"] },
          { name: "Role", type: "Variant", default: "None Selected", values: ["None Selected", "Single Date Select", "Range Date Select"] }
        ] },
        { note: "Props e padrões lidos do set Modal Date Picker da lib estável. No código: `open`, `inline` (exemplo no fluxo), `kind`, `role-kind` (none|single|range), `value`/`start`/`end`, `min`, `max`, `today`, `month`, `viewport`, `text-title`, `primary-label` e `secondary-label`. Métodos `show()` e `close()`. Eventos `cds-change` (no Confirmar) e `cds-close`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Role" },
        { specimens: { min: "calc(2 * var(--common-sizes-200))", items: [
          { label: "None Selected", attrs: { "role-kind": "none", start: null, end: null } },
          { label: "Single Date Select", attrs: { "role-kind": "single", value: "2026-01-15", start: null, end: null } },
          { label: "Range Date Select", attrs: {} }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um Modal (`<dialog>`): o foco fica preso dentro dele, `Esc` fecha (descartando) e o foco volta para quem abriu.",
          "O título \"Selecione uma data\" é o nome do diálogo.",
          "O calendário segue o teclado do Date Picker (grade, setas, PageUp/PageDown).",
          "Confirmar e Cancelar são Main Buttons. A data muda no Confirmar, e não antes."
        ] }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Abra no mês da data já escolhida.", "Mantenha os rótulos Cancelar e Confirmar (ou um verbo que diga a ação, como \"Aplicar período\").", "Não use em mobile: o componente é coberto pelo Viewport Restriction."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "A entrada e a saída seguem o Modal." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Sem especificação de Motion própria (CONFERIR C148)." } }
      ] }
    ]
  };
})();
