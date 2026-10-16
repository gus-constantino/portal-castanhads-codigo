/* Documentação — Date Picker (rascunho)
   Sem página no zeroheight, sem [Documentation] no arquivo Component use documentation e sem description nos sets (05/10). Texto escrito a partir dos
   sets da lib estável (Date Picker 17629:24427 e building blocks) e do playground; as regras de datas vêm literais de Conteúdo › Formatação de dados.
   Revisar com o time (C148). Exemplos com datas fixas (today/month) para não mudarem com o dia. */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var FIX = { today: "2026-01-20", month: "2026-01" };
  function dp(more){ return Object.assign({ _tag: "cds-date-picker" }, FIX, more || {}); }

  CDS.docs["date-picker"] = {
    tag: "cds-date-picker",
    base: { today: "2026-01-20", month: "2026-01", start: "2026-01-13", end: "2026-01-24" },
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=17629-24427", sourceLabel: "Abrir o Date Picker no Figma",
    cover: { description: "Calendário para escolher uma data ou um intervalo de datas, com navegação por mês e ano.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "O Datepicker ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time. As regras de datas são do Conteúdo." } },
        { h2: "Sobre" },
        { p: "O Date Picker é o calendário do Castanha: mostra os dias de um mês (ou de dois, no Double Calendar), permite escolher uma data ou um intervalo e navegar por mês e ano. Embaixo, mostra a data selecionada por extenso." },
        { p: "Ele aparece dentro do Date Input (num Popover) e do Modal Date Picker. Sozinho, serve para calendários fixos na tela." },
        { p: "No mobile, os pickers chamam o seletor de data nativo do sistema: o Date Input abre o nativo e o Modal Date Picker não é usado." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Escolher uma data em que o dia da semana ou a proximidade com hoje importa (agendamento, vencimento).", "Escolher um intervalo (início e fim), como o período de um relatório ou extrato.", "Ver disponibilidade num calendário fixo na tela."] },
        { h3: "Não utilize para:" },
        { ul: ["Datas conhecidas e distantes, como data de nascimento — prefira digitar no Date Input.", "Mês e ano sem o dia (validade de cartão) — use campos próprios.", "Horários — o Date Picker não escolhe hora."] },
        { h2: "Casos de uso" },
        { h3: "Date Picker, Date Input e Modal Date Picker" },
        { table: { wrap: true, head: ["Componente", "Quando"], rows: [["Date Input", "Campo de formulário: digitar a data ou abrir o calendário num Popover. No mobile, o botão abre o seletor nativo do sistema."], ["Modal Date Picker", "Escolha que precisa de confirmação (Cancelar · Confirmar), exclusivamente no desktop."], ["Date Picker", "Calendário fixo na tela, ou dentro dos dois acima."]] } }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: "cds-date-navigation", side: "top" }, { n: 2, target: ".cds-dp__weekdays", side: "left" }, { n: 3, target: "cds-calendar-day[role-kind=start]", side: "left" }, { n: 4, target: "cds-calendar-day[current]", side: "right" }, { n: 5, target: ".cds-dp__selected", side: "bottom", align: "start" }], legend: [".Navigation Control (mês, ano, anterior e próximo)", "Dias da semana (D S T Q Q S S)", ".Week com os .Day (início, meio e fim do intervalo)", "Dia atual (ponto embaixo do número)", "Data Selecionada"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Kind", type: "Variant", default: "Single Calendar", values: ["Single Calendar", "Double Calendar"] },
          { name: "Role", type: "Variant", default: "Days Selector", values: ["Days Selector", "Month Selector", "Year Selector"] },
          { name: "Selected Date Label", type: "Text", default: "Data Selecionada" },
          { name: "First Day Selected", type: "Text", default: "13/01/2023" },
          { name: "Last Day Selected", type: "Text", default: "24/01/2023" },
          { name: "Show Selected Dates", type: "Boolean", default: "true" },
          { name: "Show First Day Selected", type: "Boolean", default: "true" },
          { name: "Show Last Day Selected", type: "Boolean", default: "true" },
          { name: "Show week 01 … 05", type: "Boolean", default: "true" },
          { name: "Show week 06", type: "Boolean", default: "false" }
        ] },
        { note: "Props e padrões lidos do set Date Picker da lib estável. No código, as semanas e as datas vêm do calendário real: `kind` (single|double), `view` (days|month|year), `mode` (single|range), `value` ou `start`/`end` (AAAA-MM-DD), `month`, `min`, `max`, `today`, `selected-date-label`, `show-selected-dates`, `show-first-day-selected`, `show-last-day-selected` e `label`. Evento `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Kind" },
        { specimens: { min: "calc(2 * var(--common-sizes-200))", items: [
          { label: "Single Calendar · intervalo", attrs: {} },
          { label: "Single Calendar · uma data", attrs: { mode: "single", value: "2026-01-15", start: null, end: null } }
        ] } },
        { h2: "Double Calendar" },
        { display: { attrs: { kind: "double" } } },
        { h2: "Role" },
        { specimens: { min: "calc(2 * var(--common-sizes-200))", items: [
          { label: "Month Selector", attrs: { view: "month" } }, { label: "Year Selector", attrs: { view: "year" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Cada mês é uma grade (`role=\"grid\"`) com o nome do mês e do ano. Os dias da semana são cabeçalhos de coluna com o nome completo.",
          "Cada dia é um botão com a data por extenso e `aria-selected`. O dia de hoje tem `aria-current=\"date\"`.",
          "A Data Selecionada fica numa região viva: a escolha é anunciada sem tirar o foco.",
          "Datas fora de `min`/`max` ficam desabilitadas."
        ] },
        { table: { head: ["Tecla", "Ação"], rows: [["`←` `→`", "Dia anterior / próximo"], ["`↑` `↓`", "Semana anterior / próxima"], ["`Home` / `End`", "Início / fim da semana"], ["`PageUp` / `PageDown`", "Mês anterior / próximo (com `Shift`: ano)"], ["`Enter` / `Espaço`", "Seleciona o dia"]] } },
        { h2: "Contraste (WCAG)" },
        { ul: ["Dia (Text/medium) 8,24:1 · dias da semana 8,24:1 sobre Surface/default — AA e AAA.", "Dia selecionado (início e fim): número 4,54:1 sobre Surface/accent — AA. Dias do meio do intervalo: 15,27:1 sobre Surface/01.", "Ponto do dia atual (Surface/accent) 4,54:1 — acima de 3:1."] },
        { note: "Contrastes medidos no tema light do playground." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Abra o calendário no mês da data já escolhida ou, sem escolha, no mês atual.", "Bloqueie (`min`/`max`) as datas que não podem ser escolhidas, em vez de mostrar erro depois.", "No intervalo, o primeiro clique marca o início e o segundo, o fim.", "Use o Double Calendar quando o intervalo costuma passar de um mês."] },
        { h2: "Formato das datas" },
        { p: "Use o formato de acordo com o espaço disponível no componente." },
        { ul: ["Formato completo: `01 de janeiro de 2025`", "Formato compacto: `01/12/2025` ou `12/25`", "Se o componente não permitir o nome completo, use abreviações com a primeira letra maiúscula. Exemplo: `Segunda = Seg`, `Janeiro = Jan`"] },
        { note: "Regras literais de Conteúdo › Formatação de dados › Datas e horários." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: escolha um intervalo, navegue pelos meses e use o teclado." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "Não há especificação de Motion para o Date Picker (troca de mês, seleção de dias). Os .Day e os botões seguem as transições de hover dos building blocks (CONFERIR C148)." } }
      ] }
    ]
  };
})();
