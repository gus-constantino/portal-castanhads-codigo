/* Documentação — Tab View (rascunho)
   Sem página no zeroheight, sem seção [Documentation] e sem description no set (05/10). Texto escrito a partir do set da lib estável
   (Tab View 15713:2488) e do playground. Revisar com o time (C138). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};

  CDS.docs["tab-view"] = {
    tag: "cds-tab-view",
    base: {},
    source: "https://www.figma.com/design/LKZBwmlb7fIbDKdGrMncuA/-CastanhaDS--Components?node-id=15713-2488", sourceLabel: "Abrir o Tab View no Figma",
    cover: { description: "Alterna a visualização de uma lista entre lista e grade.", examples: [ {} ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { alert: { appearance: "warning", label: "Rascunho", text: "Este componente ainda não tem página no zeroheight nem description no Figma. O texto foi escrito a partir do Figma e do playground e precisa de revisão do time." } },
        { h2: "Sobre" },
        { p: "O Tab View alterna a forma de ver o mesmo conjunto de itens — em lista ou em grade. São dois Icon Buttons lado a lado: o ativo em Default Accent, o outro em Ghost Neutral." },
        { h2: "Quando usar" },
        { h3: "Utilize para:" },
        { ul: ["Trocar entre lista e grade em catálogos, arquivos ou cartões.", "Deixar a pessoa escolher a densidade da visualização."] },
        { h3: "Não utilize para:" },
        { ul: ["Trocar de conteúdo ou de contexto — use Tabs.", "Filtrar itens — use filtros (Filter Button, chips).", "Mais de duas opções."] },
        { h2: "Casos de uso" },
        { h3: "Tab View vs Tabs" },
        { p: "O Tab View muda só a apresentação do mesmo conteúdo; as Tabs mudam o conteúdo mostrado." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-tv__btn:first-child", side: "left" }, { n: 2, target: ".cds-tv__btn:last-child", side: "right" }], legend: ["Opção ativa (Icon Button Medium · Default Accent)", "Opção inativa (Icon Button Medium · Ghost Neutral)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Active Option", type: "Variant", default: "First", values: ["First", "Second"] },
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Disabled"] }
        ] },
        { note: "Props e padrões lidos do set Tab View da lib estável. Container com borda Border/semi-soft, raio medium e respiro 8. No código: `active-option` (first|second), `disabled`, `first-icon`/`second-icon` (padrão view-list-line e view-module-line), `first-label`/`second-label` (\"Lista\", \"Grade\") e `label` (\"Visualização\"). Evento `cds-change`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Active Option" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "First", attrs: {} }, { label: "Second", attrs: { "active-option": "second" } }
        ] } },
        { h2: "State" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Enabled", attrs: {} }, { label: "Disabled", attrs: { disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "É um grupo de opções (`role=\"radiogroup\"` com nome \"Visualização\") com dois radios: o leitor de tela anuncia qual está selecionado.",
          "`Tab` entra no grupo; as setas trocam a opção.",
          "Os ícones não têm texto visível: os nomes vêm de `first-label` e `second-label` (\"Lista\", \"Grade\").",
          "Disabled tira o grupo da ordem de foco."
        ] },
        { note: "Os contrastes são os dos Icon Buttons (ver a doc do Icon Button)." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { ul: ["Posicione o Tab View junto ao conteúdo que ele controla, normalmente no topo à direita da lista.", "Mantenha a escolha da pessoa ao voltar para a tela.", "Use ícones que representem a visualização (lista e grade)."] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: {}, live: true } },
        { note: "Exemplo interativo: troque a opção. As transições são as do Icon Button." },
        { specs: [
          { title: "Opção: Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Opção: Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] }
        ] }
      ] }
    ]
  };
})();
