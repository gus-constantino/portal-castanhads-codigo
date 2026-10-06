/* Capacitações: os outros treinamentos do Hub (Capacitações → Treinamentos), um por tab.
   No Hub cada página é só uma lista de vídeos do Drive (sem texto), com uma tab por tema. Aqui: uma tab por treinamento,
   uma seção por tab do Hub (mesma ordem) e os vídeos tocando na página, em grade. Títulos com a grafia corrigida
   (lista no docs/zeroheight/capacitacoes.md). Os vídeos só tocam com login Caju. Revisão: CONFERIR C162.
   O "Como usar as Documentações?" fica no recurso Treinamento. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var HUB = "https://castanha.caju.com.br/858426090/v/latest/p/";
  CDS.register({ id: "capacitacoes", name: "Capacitações", resource: true, lede: "Os treinamentos do Hub em vídeo: Sponsor, Employee, Motion, Ilustração e Content.", order: 5, zeroheight: HUB + "49a46b-construindo-experiencias-para-o-sponsor-app" });

  // [título, id do Drive]
  function grade(treino, itens){
    return { videos: itens.map(function(it){
      return { heading: it[0], src: "https://drive.google.com/file/d/" + it[1] + "/preview", title: treino + ": " + it[0],
        href: "https://drive.google.com/file/d/" + it[1] + "/view", cta: "Abrir no Drive" };
    }) };
  }
  // Seções na ordem das tabs do Hub: [título da seção, [[vídeo, id]…]]
  function secoes(treino, lista){
    var out = [];
    lista.forEach(function(s){ out.push({ h2: s[0] }); out.push(grade(treino, s[1])); });
    return out;
  }
  function slide(titulo, href){
    return [{ h2: "Slides" }, { shortcuts: [{ title: titulo, text: "Apresentação usada no treinamento, no Figma.", href: href, cta: "Abrir no Figma", external: true }] }];
  }
  function topo(titulo, intro, pagina){
    return [
      { h2: titulo },
      { p: intro },
      { note: "Os vídeos tocam com login Caju. Cada um também abre no Drive, em outra aba." },
      { shortcuts: [{ title: "Página no Hub", text: "A mesma trilha no Castanha Hub.", href: HUB + pagina, cta: "Abrir no Hub", external: true }] }
    ];
  }
  var CONTENT = "Faz parte da trilha de Content, em três partes: Estratégia de conteúdo, Organização de tela e Linguagem. Juntas, ensinam a criar conteúdos que conectam estratégia, layout e comunicação clara em apps e na web.";

  var SPONSOR = "Sponsor App", EMPLOYEE = "Employee App", MOTION = "Motion", ILU = "Ilustração",
      ESTR = "Estratégia de conteúdo", ORG = "Organização de tela", LING = "Linguagem";

  CDS.docs["capacitacoes"] = {
    tabs: [
      { id: "sponsor-app", title: "Sponsor App", blocks: [].concat(
        topo("Construindo experiências para o Sponsor App", "Como construímos as experiências dos produtos web da Caju.", "49a46b-construindo-experiencias-para-o-sponsor-app"),
        secoes(SPONSOR, [
          ["Introdução", [["CajUX", "1dOy-3xQX4R5LxVFsGP3iYZhZmVyG6pco"], ["Princípios de Design", "1_aqB0WtzmMpYnDG0OXirMaSBMNMKdKMF"], ["Castanha", "1keoajPw63DvJBmYTrXg9Amt4xhHJCZL-"]]],
          ["Hierarquia", [["Grids", "1YDZf6vwtHbpuy4D_YrbxX9Qihi-nROYp"], ["Breakpoints", "14f_kF35WQGHsNdisUbgpm7BoLFdNRriI"], ["Headers", "1yAJblE_42HpD4rzmE3e3WVhN84h4WkBt"], ["Scroll", "1vTdkDxX--TzAeSSl3q900Dv5UQ42Lamq"], ["Espaçamentos", "121kJqkiZO50oqYuFbFtQC6Jpu-4bPPAE"]]],
          ["Templates", [["Feedback", "15iOJhtGeHVWAWokGukQteobvfQXNUanr"], ["Formulário", "1crYMlPgTHgPbvvJ86YMPJDzYR6bGu4Jh"], ["Drawer", "1MgieBDL2rOp9iNh-LmARlyz_nlh7tOBE"]]]
        ]),
        slide("Sponsor · CajUX", "https://www.figma.com/deck/lEPeSLXlPCwW44hBCtT6lV/Sponsor---CajUX?node-id=1-25"),
        secoes(SPONSOR, [
          ["Dúvidas", [["Castanha", "1dbY-L_2Ef0yfJVGFzd25RVCRQBdbRcZa"], ["Breakpoints", "1RVTGf4FVrD8k5dA9Kzgov49dGSLaWlXP"], ["Headers", "19ovoMoCXODJmHqdM2VcDA0EOdLtzWB2e"], ["Espaçamentos", "1SSEjtoVly2Ld1V4Txi67TWFtZnhmWZdO"], ["Formulários", "1KlvHsVc9WyB5PxWNFMD1uW63XWO6sQNM"]]]
        ])
      ) },

      { id: "employee-app", title: "Employee App", blocks: [].concat(
        topo("Construindo experiências para o Employee App", "Como construímos as experiências dos produtos mobile da Caju.", "741a14-construindo-experiencias-para-o-employee-app"),
        secoes(EMPLOYEE, [
          ["Introdução", [["Princípios de Design App", "1-sw3KECq0a1ih2YDXkk7Wu1K4hR1Lpam"], ["Castanha", "16Unec3LE5dD-p-RiiaVL8Ta5TbTnD-4I"]]],
          ["Hierarquia", [["Grids", "1DF84iRME6s8PmEtfL69c7ZXZCh81f43q"], ["Headers", "1mR5_BLvVbyK9cim_uWUex8xWNZUmj-Of"]]],
          ["Templates", [["Feedback", "1Euii9fGooDa87iZxIE25MeL8LJyk8ftn"], ["Autenticação", "1frUDmGKNx6Uet1DExgLHVkI08-EUYK_1"], ["Formulários", "11jc-bJH1FziHqSY8T7wXJqw67pBn3AcG"], ["Detalhamento e comprovantes", "1mEKOIOqldiF556LgzD5jM34QiyP5u8jZ"], ["Bottom Sheet", "1-OXcuAJ4rzOPNFk9U3gfjK8LWqZgjSoX"]]],
          ["Nova experiência da Home", [["Nova experiência da Home", "1OrVo4zzrTx01d2Wf13Bjl6TsWKDlvlva"]]],
          ["Filtros em tela", [["Filtros em tela", "12eiSXnlRrdS1aKxKKnCjvJr-ecebpbEg"]]],
          ["Experiência", [["Foco na ação", "1jIF29QSRWkDSbpL1HHXBnXNrUzKeFpKx"], ["Ilustração na tela", "1gflh8YieCjliFBEAkHTB3uc2yze2OSZH"], ["Acessibilidade", "1ePteoGyd3wjHAeLrac1k38-qbzodr_rz"]]]
        ]),
        slide("Employee · CajUX", "https://www.figma.com/deck/bjKOj6TvEZhpUhQ76VnGjH/Employee---CajUX?node-id=1-25")
      ) },

      { id: "motion", title: "Motion", blocks: [].concat(
        topo("Motion", "Construindo novas experiências com motion: como o motion faz parte da construção das interfaces da Caju. Os tokens e Motion Styles estão em Padrões → Motion.", "656735-motion"),
        secoes(MOTION, [
          ["Introdução", [["Introdução", "1MwFVZxWWgMGUTILC6iExWDGzBPd8cf2j"], ["Motion System e Princípios de Motion", "110CspYspdcMLrb56CTO1Z9ddIjqeXp_P"]]],
          ["Atuações do motion na Caju", [["Informativo", "1gu3Tx2CuhjSYovSeEAXebgDd-6Ypkanh"], ["Feedback", "11xrIXy6dbs9VQOTGB4W8mIsgVzY028zl"], ["Efeito UAU", "11D1CRV9R8IzmdCtIOug6L-jEfiaPJ0cy"], ["Navegação", "1dY4DFmFzAitogJ0wjxKP-lCYoRpTA8EQ"]]],
          ["Aplicações", [["Aplicação dos conceitos", "1Gn3IcR93KYsYdCj73UTRI6zCd4JjLOqz"], ["Aplicação dos padrões e tokens", "1KIibIYrbRb0rtqPWfabk0C9havr55vK4"]]],
          ["Usar ou evitar motion", [["Quando o motion entra no fluxo", "1X1VzppLLshbzlGYODIYAhZ2sSpF7Lq--"], ["Quando evitar motion no fluxo", "1tfNvtuFJHkEQbuXGmkBN09jaqZyuUMua"]]]
        ]),
        slide("Motion · CajUX", "https://www.figma.com/deck/BqUZs9DpVXy7KL1xzUebNd/Motion---CajUx?node-id=1-291")
      ) },

      { id: "ilustracao", title: "Ilustração", blocks: [].concat(
        topo("Ilustração", "Construindo novas experiências com ilustração: como as ilustrações são aplicadas nas interfaces da Caju. A biblioteca está em Tema Caju → Ilustração.", "45da15-ilustracao"),
        secoes(ILU, [
          ["Introdução", [["Ilustrações na Caju", "1Kg0GGWPUvFRfrAQhyQJvq4S37RkUBb11"], ["Princípios de Ilustração", "1WF4S0VIsub_daG2mjihLS41A1DQb8XoC"], ["Bibliotecas de ilustração", "17g68PMUCzkeSIwazixiRc9Lnyyy4TyQ0"]]],
          ["Breakpoints", [["Breakpoints", "1Plx1y5RQ1cPuW38ndx1PqaodU4CRYW9H"]]],
          ["Aplicações", [["Aplicações", "19poNh_yJ9WGc48gZ9g3IHD7HF4tjtEqH"]]],
          ["Do's and Don'ts", [["Do's and Don'ts", "1tjld9QNWarTo_6a5Ox4PUpwwHK-y34gs"]]],
          ["Como solicitar ilustrações", [["Como solicitar ilustrações", "1DS7Gtz7Fe2U6tZqqD-8YDSX0YTXHTAX8"]]],
          ["Dúvidas", [["Dúvidas", "18mC17Su38DNKQ9swAj3DIOu8JKUDFy7x"]]]
        ]),
        slide("Ilustrações · CajUX", "https://www.figma.com/deck/SEB9RpaDxLd2aH5sbgT5X7/Ilustra%C3%A7%C3%B5es---CajUX?node-id=1-25")
      ) },

      { id: "estrategia", title: "Estratégia de conteúdo", blocks: [].concat(
        topo("Estratégia de conteúdo", CONTENT + " Esta é a parte 1.", "741d08-estrategia-de-conteudo"),
        secoes(ESTR, [
          ["Introdução", [["Introdução", "15o0OPpkB1JVnFsH66DI7Car-6oQrngFQ"], ["Contexto e novidades", "1bhu7iqfRDWdgXzvYjlIqMntT6JX0sXRu"]]],
          ["Estruturando conteúdo", [["Estruturando conteúdo", "1VITDoXcHgZvpNyD0C0j02X_aWGgqe1kk"], ["Mapeamento inicial", "1GSO5Q_gcXCgVPuRtYEgViMbcNFVmBqCT"], ["Levantamento de dúvidas", "1S7bPxsoZf12tPNw2OXevLHoloGTNSr1U"], ["Classificação de conteúdo", "1-Fc68yAZQA_svjJLyt7-QEqqHQC8GgPb"], ["Card sorting", "1uwjo7ffG_6oF05z12-mRr67GxV0yKJ4W"], ["Validar com stakeholders", "1FrmklFA6eNnGVWLY21CTjaj6By4Iq8L8"]]]
        ]),
        slide("Treinamento 1 · Estratégia de conteúdo", "https://www.figma.com/slides/4EbS84KzVZwjrCQNqccASN/Treinamento-1---Estrat%C3%A9gia-de-conte%C3%BAdo?node-id=35-7"),
        secoes(ESTR, [["Dúvidas", [["Dúvidas", "1NN9hAfnFcwWKTv_R4bBub7IJx26npVWu"]]]])
      ) },

      { id: "organizacao", title: "Organização de tela", blocks: [].concat(
        topo("Organização de tela", CONTENT + " Esta é a parte 2.", "5664b2-organizacao-de-tela"),
        secoes(ORG, [
          ["Introdução", [["Introdução", "1KmPhJgJsc8z8dXoA89RsSGrUEiQQPqTM"]]],
          ["Organização de telas", [["Organização de telas", "10PLSI0xOG8jJhwt2Y1xFo4iugxzWY0W2"]]],
          ["Hierarquia visual", [["Hierarquia visual", "1pHWg201pTP53etAbmqjOUk1s1ixpIfDn"]]],
          ["Priorização", [["Priorização", "1ssdKtWLKRfOdJ_5_kuV8xEdF9gymcwXb"]]],
          ["Taxonomia", [["Taxonomia", "1KnC48d834BNvI5Gt7bPbLu1QN7OXsdIj"]]],
          ["Mão na massa", [["Mão na massa", "1vydRrWGPXfHV6Z2RK7CONA7WkbQOFUby"]]]
        ]),
        slide("Treinamento 2 · Organização de tela", "https://www.figma.com/slides/R0Dg5mLt45mPrrfAamZ6NQ/Treinamento-2---Organiza%C3%A7%C3%A3o-de-tela?node-id=35-7")
      ) },

      { id: "linguagem", title: "Linguagem", blocks: [].concat(
        topo("Linguagem", CONTENT + " Esta é a parte 3. O texto dos princípios de escrita está em Conteúdo.", "3328af-linguagem"),
        secoes(LING, [
          ["Introdução", [["Introdução", "1h9nir6C_nRIaWYsUn6_afflvfvLz7qUr"]]],
          ["Princípios de escrita", [["Princípios de escrita", "1ooIp8LYwL26u3Eii1P7IJDQO2m6hY_Wq"]]],
          ["Linguagem", [["Linguagem", "1aAJ2_6tdO7i3bnvnW22XJd69Aqnkz-DO"]]]
        ]),
        slide("Treinamento 3 · Linguagem", "https://www.figma.com/slides/3TbvLSJB5dnrgqKIOP8VUL/Treinamento-3---Linguagem?node-id=4034-8520"),
        secoes(LING, [["Dúvidas", [["Dúvidas", "1Oz3_ddl5MCsnsxpnWC6eW23fLj_MJDPz"]]]])
      ) }
    ]
  };
})();
