/* Documentação — Dropzone
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Dropzone, 320bd5) reaproveitado; props e padrões do set da lib estável
   (Dropzone 15386:7230 — sem description); acessibilidade e contrastes do playground (C140). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function dz(more){ return Object.assign({ _tag: "cds-dropzone", viewport: "desktop" }, more || {}); }
  function ui(status, title, ext, more){ return Object.assign({ _tag: "cds-upload-item", status: status, "text-title": title, "file-extension": ext }, more || {}); }
  function pair(dzAttrs, items){ return { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: [dz(dzAttrs)].concat(items) }; }

  CDS.docs["dropzone"] = {
    tag: "cds-dropzone",
    base: { viewport: "desktop" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/320bd5-dropzone", sourceLabel: "Abrir o Dropzone no zeroheight",
    cover: { description: "O Dropzone é a área delimitada onde a pessoa usuária adiciona arquivos, pelo botão de seleção ou arrastando o arquivo para dentro dela. A área informa os formatos e limites aceitos antes do envio. O acompanhamento de cada arquivo enviado fica no Upload Item.", examples: [
      dz({ "text-title": "Adicionar comprovante", "text-description": "Arquivos permitidos: PDF, JPG e PNG até 10 MB" })
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Dropzone é a área delimitada onde a pessoa usuária adiciona arquivos, pelo botão de seleção ou arrastando o arquivo para dentro dela. A área informa os formatos e limites aceitos antes do envio. O acompanhamento de cada arquivo enviado fica no Upload Item." },
        { h3: "Nomes alternativos comuns" },
        { p: "File upload, File uploader, Upload area, Drop area, Área de upload." },
        { h3: "Princípios" },
        { cards: [
          ["Área explícita", "A área delimitada mostra onde o arquivo deve ser solto antes de qualquer interação, em vez de depender de a pessoa usuária descobrir que pode arrastar."],
          ["Restrição antes do erro", "Os formatos e limites aceitos aparecem na própria área, para que a pessoa usuária saiba o que enviar antes de tentar."],
          ["Caminho de toque garantido", "Existe sempre um caminho de clique ou toque: no Desktop, o Main Button; no Mobile, a área inteira, que funciona como um único botão. Arrastar é complemento, nunca o único caminho."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Dropzone quando a pessoa usuária precisa anexar um ou mais arquivos dentro de um fluxo, e é importante deixar claro quais formatos e limites o envio aceita. Ele funciona bem em formulários, cadastros e envio de documentos, onde o arquivo é parte da tarefa e não a tarefa inteira. Na maioria dos casos ele não aparece sozinho: o Dropzone cobre a entrada dos arquivos e o Upload Item, agrupado no Upload List, cobre o acompanhamento do envio." },
        { h3: "Utilize para:" },
        { ul: ["Anexar documentos e comprovantes dentro de um formulário", "Envio de um ou mais arquivos na mesma etapa do fluxo", "Casos em que os formatos e o tamanho aceitos precisam estar visíveis antes do envio"] },
        { h3: "Não utilize para:" },
        { ul: ["Exibir arquivos já enviados (utilize o Upload List)", "Ação isolada de upload, sem contexto de formulário, quando um botão resolve (utilize o Main Button)", "Captura de imagem pela câmera como ação principal"] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Desktop" },
        { anatomy: { attrs: {}, markers: [{ n: 1, target: ".cds-dz", side: "left" }, { n: 2, target: ".cds-dz__icon", side: "top" }, { n: 3, target: ".cds-dz__title", side: "right" }, { n: 4, target: ".cds-dz__desc", side: "left" }, { n: 5, target: ".cds-dz__btn", side: "right" }], legend: ["Área de drop", "Shaped Icon", "Título", "Descrição", "Main Button"] } },
        { h2: "Mobile" },
        { anatomy: { attrs: { viewport: "mobile" }, markers: [{ n: 6, target: ".cds-dz", side: "left" }, { n: 7, target: ".cds-dz__icon", side: "top" }, { n: 8, target: ".cds-dz__title", side: "right" }, { n: 9, target: ".cds-dz__desc", side: "bottom" }], legend: ["Área clicável", "Shaped Icon", "Título", "Descrição"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "State", type: "Variant", default: "Enabled", values: ["Enabled", "Hovered", "Pressed", "Dragover", "Disabled"] },
          { name: "Text Title", type: "Text", default: "Adicionar arquivos" },
          { name: "Text Description", type: "Text", default: "Arquivos permitidos: JPG e PNG" },
          { name: "Show Text description", type: "Boolean", default: "true" },
          { name: "Show Main button", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Dropzone da lib estável. Desktop e Mobile vêm da coleção File Upload (Is Desktop / Is Mobile; tablet usa o Mobile). No código: `text-title`, `text-description`, `show-text-description`, `show-main-button`, `button-label` (\"Selecionar arquivos\"), `accept`, `multiple`, `disabled` e `viewport`; `state` só para exemplos. Evento `cds-files { files }`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Desktop" },
        { specimens: { items: [
          { label: "Enabled", attrs: {} }, { label: "Dragover", attrs: { state: "dragover" } }, { label: "Disabled", attrs: { disabled: true } }
        ] } },
        { h2: "Mobile" },
        { specimens: { items: [
          { label: "Enabled", attrs: { viewport: "mobile" } }, { label: "Hovered", attrs: { viewport: "mobile", state: "hovered" } }, { label: "Pressed", attrs: { viewport: "mobile", state: "pressed" } },
          { label: "Dragover", attrs: { viewport: "mobile", state: "dragover" } }, { label: "Disabled", attrs: { viewport: "mobile", disabled: true } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "Desktop: o seletor de arquivos do sistema abre pelo Main Button (\"Selecionar arquivos\", `button-label`), que recebe foco e funciona com `Enter`/`Espaço`.",
          "Mobile: a área inteira é um botão (`role=\"button\"`) com o título como nome e a descrição (formatos e limites) como descrição.",
          "O `<input type=\"file\">` nativo fica escondido do leitor de tela; quem é anunciado é o botão.",
          "Arrastar é opcional: tudo o que se faz arrastando também se faz pelo botão.",
          "Ao adicionar, anuncie o resultado no Upload Item (envio, sucesso ou falha)."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Título (Text/intense) 16,96:1 · descrição (Text/medium) 8,24:1 sobre Surface/default — AA e AAA; no Dragover, 15,70:1 e 7,63:1.", "Contorno tracejado (Border/medium): 2,78:1 — abaixo de 3:1 (1.4.11). A área também é identificada pelo ícone, pelo texto e pelo botão, mas o contorno é o que mostra o limite para soltar (mesmo token da borda do Checkbox, C134). No Dragover, 4,54:1."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Dropzone." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: pair({ "text-title": "Adicionar comprovante" }, [ui("uploading", "comprovante-residencia", ".pdf", { percent: "60" })]), title: "Use o Dropzone com o Upload Item", text: "O Dropzone cobre só a entrada dos arquivos. O acompanhamento do envio, o erro e a remoção ficam no Upload Item, listado logo abaixo da área. Sem esse par, a pessoa usuária adiciona o arquivo e não recebe retorno do que aconteceu com ele." },
          { attrs: dz({ "text-title": "Adicionar arquivos", "text-description": "PDF, JPG ou PNG · até 10 MB · máximo 5 arquivos" }), title: "Deixe as restrições visíveis", text: "Informe os formatos, o tamanho e a quantidade aceitos na própria área, antes do envio. A pessoa usuária não deve descobrir a regra pela mensagem de erro." },
          { attrs: dz({ viewport: "mobile" }), title: "Trate a área inteira como botão no Mobile", text: "No Desktop a seleção acontece pelo Main Button. No Mobile não há botão: a área inteira é o gatilho, porque arrastar não funciona em dispositivos de toque. Nada dentro da área deve competir com esse toque." },
          { attrs: dz({ "text-title": "Adicionar comprovante" }), title: "Adeque o título ao arquivo esperado", text: "Troque o título padrão quando o fluxo pede um documento específico, como “Adicionar comprovante”. O título genérico serve de ponto de partida, não de resposta final." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: dz({ "text-title": "Adicionar comprovante" }), text: "Nomeie no título o arquivo que o fluxo espera, como “Adicionar comprovante”." },
          { kind: "dont", attrs: dz({ "text-title": "Clique aqui para escolher um arquivo" }), text: "Não use o título para explicar a mecânica da interação, como “Clique aqui para escolher um arquivo”." },
          { kind: "do", attrs: pair({}, [ui("uploaded", "comprovante-residencia", ".pdf")]), text: "Use o Dropzone para adicionar arquivos e o Upload List para acompanhar o envio." },
          { kind: "dont", attrs: dz({ "text-title": "comprovante-residencia.pdf", "text-description": "Enviado em 10/05/2025", "show-main-button": false }), text: "Não use o Dropzone para exibir os arquivos que já foram enviados." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { display: { attrs: { viewport: "mobile" }, live: true } },
        { note: "Exemplo interativo (Mobile): passe o mouse, pressione ou arraste um arquivo para cima da área." },
        { specs: [
          { title: "Enabled → Hovered", rows: [["Gatilho", "While hovering"], ["Motion Style", "`Hover In/01`"]] },
          { title: "Hovered → Pressed", rows: [["Gatilho", "While pressing"], ["Motion Style", "`Pressed/01`"]] },
          { title: "→ Disabled", rows: [["Gatilho", "Ao desabilitar"], ["Motion Style", "`Disabled/01`"]] }
        ] },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight não tem seção de Motion para o Dropzone; o mapeamento acima segue o padrão de estados de interação, e a transição para Dragover não tem Motion Style definido. No código, short/03 + systemic/accelerate (CONFERIR C140)." } }
      ] }
    ]
  };
})();
