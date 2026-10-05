/* Documentação — Upload Item
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Upload item, 377e72) reaproveitado; props e padrões do set da lib estável
   (Upload Item 15029:1115 — sem description); acessibilidade e contrastes do playground (C140). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  function ui(status, more){ return Object.assign({ _tag: "cds-upload-item", status: status, "text-title": "comprovante-residencia", "file-extension": ".pdf" }, more || {}); }
  function stack(items){ return { _tag: "div", class: "pg-doc-list-stack pg-doc-list-stack--card", _children: items }; }

  CDS.docs["upload-item"] = {
    tag: "cds-upload-item",
    base: { "text-title": "comprovante-residencia", "file-extension": ".pdf" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/377e72-upload-item", sourceLabel: "Abrir o Upload Item no zeroheight",
    cover: { description: "O Upload Item representa um arquivo dentro do fluxo de upload, do envio em curso até o arquivo já armazenado. Ele mostra o nome, a extensão, o estado do envio e as ações disponíveis para aquele arquivo.", examples: [
      stack([ui("uploading", { percent: "60" }), ui("error", { "text-title": "rg-frente", "file-extension": ".jpg" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O Upload Item representa um arquivo dentro do fluxo de upload, do envio em curso até o arquivo já armazenado. Ele mostra o nome, a extensão, o estado do envio e as ações disponíveis para aquele arquivo." },
        { h3: "Nomes alternativos comuns" },
        { p: "File item, Upload row, Attachment item, Item de upload." },
        { h3: "Princípios" },
        { cards: [
          ["Um arquivo, um item", "Cada item representa um único arquivo e carrega só o que diz respeito a ele: identificação, estado e ações."],
          ["Estado sempre visível", "O item declara em que ponto do envio o arquivo está, sem depender de mensagem fora do componente."],
          ["Extensão preservada", "O nome do arquivo pode truncar, a extensão não. É ela que identifica o tipo do arquivo quando o nome é longo."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o Upload Item para representar cada arquivo que a pessoa usuária adicionou, logo abaixo do Dropzone. Ele cobre o acompanhamento do envio, o retorno de sucesso ou falha e as ações sobre o arquivo, que o Dropzone não faz. Quando há mais de um arquivo, os itens são agrupados no Upload List. O item também serve para arquivos já armazenados, enviados em outra sessão." },
        { h3: "Utilize para:" },
        { ul: ["Acompanhar o progresso do envio de um arquivo", "Comunicar sucesso ou falha do envio, com a ação de tentar novamente", "Listar arquivos já enviados, com baixar e remover", "Exibir o arquivo abaixo do Dropzone que o originou"] },
        { h3: "Não utilize para:" },
        { ul: ["Adicionar arquivos (utilize o Dropzone)", "Listar documentos que não vieram de um upload", "Representar mais de um arquivo em um único item"] },
        { h2: "Upload Item e Upload List" },
        { p: "O Upload Item representa um arquivo. Quando o fluxo aceita mais de um, os itens são agrupados no Upload List, que é um Auto Layout vertical com espaçamento fixo e um slot que só aceita Upload Item. O List existe para garantir ordem e espaçamento consistentes entre os arquivos, sem acrescentar conteúdo próprio: nome, estado e ações continuam sendo do item. Com um arquivo só, o Upload Item pode ser usado direto, sem a lista." },
        { compare: [
          { title: "Upload Item sozinho", attrs: ui("uploaded") },
          { title: "Upload List", attrs: { _tag: "cds-upload-list", label: "Arquivos", _children: [ui("uploaded"), ui("success", { "text-title": "rg-frente", "file-extension": ".jpg", src: "assets/brand/sample-photo.svg" })] } }
        ] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Enviando" },
        { anatomy: { attrs: { status: "uploading", percent: "60" }, markers: [{ n: 1, target: ".cds-ui__loading", side: "left" }, { n: 2, target: ".cds-ui__title", side: "top", align: "start" }, { n: 3, target: ".cds-ui__ext", side: "right" }, { n: 4, target: ".cds-ui__msg", side: "right" }, { n: 5, target: ".cds-ui__progress", side: "bottom" }], legend: ["Loading", "Nome do arquivo", "Extensão", "Mensagem de estado", "Progress Line"] } },
        { h2: "Enviado" },
        { anatomy: { attrs: { status: "uploaded" }, markers: [{ n: 6, target: ".cds-ui__lead", side: "left" }, { n: 7, target: ".cds-ui__actions > :first-child", side: "top" }, { n: 8, target: ".cds-ui__actions > :last-child", side: "right" }], legend: ["Elemento de apoio (.Lead item)", "Ação 2 (baixar ou tentar de novo)", "Ação 1 (remover)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Status", type: "Variant", default: "Uploading", values: ["Uploading", "Success", "Error", "Uploaded"] },
          { name: "Text Title", type: "Text", default: "File name" },
          { name: "File Extension", type: "Text", default: ".jpg" },
          { name: "Success message", type: "Text", default: "Enviado com sucesso" },
          { name: "Description", type: "Text", default: "Enviado em 10/05/2025" },
          { name: "Show primary action", type: "Boolean", default: "true" },
          { name: "Show secondary action", type: "Boolean", default: "true" }
        ] },
        { note: "Props e padrões lidos do set Upload Item da lib estável. O zeroheight também lista Disabled, Lead Icon e Label Content, que não existem no set (CONFERIR C140). No código: `status`, `text-title`, `file-extension`, `success-message`, `description`, `error-message` (\"Falha ao enviar\"), `uploading-message` (\"Enviando\"), `percent`, `show-primary-action`, `show-secondary-action`, `src` e `lead-appearance`. Eventos `cds-remove`, `cds-download`, `cds-retry`, `cds-view`." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Status" },
        { specimens: { items: [
          { label: "Uploading", attrs: { status: "uploading", percent: "60" } },
          { label: "Success", attrs: { status: "success", src: "assets/brand/sample-photo.svg", "text-title": "rg-frente", "file-extension": ".jpg" } },
          { label: "Error", attrs: { status: "error" } },
          { label: "Uploaded", attrs: { status: "uploaded" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Teclado e leitor de tela" },
        { ul: [
          "O item é um grupo com o nome completo do arquivo (`aria-label` = nome + extensão), mesmo quando o nome trunca na tela; dentro do Upload List vira item de lista.",
          "A mensagem de estado (Enviando, Enviado com sucesso, Falha ao enviar) fica numa região viva (`aria-live=\"polite\"`): a mudança é anunciada sem tirar o foco de onde a pessoa está.",
          "A Progress Line informa o percentual (`role=\"progressbar\"`, nome \"Enviando\" + arquivo).",
          "As ações são Icon Buttons com nome que inclui o arquivo: \"Remover comprovante-residencia.pdf\", \"Baixar …\" ou \"Tentar de novo: …\".",
          "O .Lead item View file é um botão para ver o arquivo; o Static é decorativo."
        ] },
        { h2: "Contraste (WCAG)" },
        { ul: ["Nome, extensão e mensagens neutras (Text/medium) 8,24:1 sobre Surface/default — AA e AAA.", "Mensagem de sucesso (Feedback/Positive/semi-intense) 5,36:1 · de falha (Feedback/Warning/semi-intense) 6,41:1 — AA."] },
        { note: "Contrastes medidos no tema light do playground. O zeroheight ainda não tem seção de Acessibilidade para o Upload Item." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: stack([{ _tag: "cds-dropzone", viewport: "desktop", "text-title": "Adicionar comprovante" }, ui("uploading", { percent: "60" })]), title: "Use o Upload Item junto do Dropzone", text: "O item não adiciona arquivos: ele mostra o que já foi adicionado. Aparece logo abaixo do Dropzone que o originou e, quando há mais de um arquivo, agrupado no Upload List." },
          { attrs: ui("uploaded", { "text-title": "comprovante-de-residencia-atualizado-2025" }), title: "Preserve a extensão do arquivo", text: "O nome trunca no fim, em uma linha. A extensão fica fora do truncamento, porque é ela que identifica o tipo do arquivo quando o nome é longo." },
          { attrs: stack([ui("error"), ui("uploaded"), ui("uploading", { percent: "60" })]), title: "Ofereça a ação que o status pede", text: "Falha pede tentar novamente e remover. Arquivo enviado pede baixar e remover. Envio em curso não oferece ação." },
          { attrs: ui("uploaded"), title: "Passe o nome do arquivo já tratado", text: "O componente só exibe o texto que recebe. Extrair nome e extensão do arquivo é responsabilidade da implementação." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: ui("uploaded", { "text-title": "comprovante-de-residencia-atualizado-2025" }), text: "Passe nome e extensão em campos separados, como “comprovante-residencia” e “.pdf”." },
          { kind: "dont", attrs: ui("uploaded", { "text-title": "comprovante-de-residencia-atualizado-2025.pdf", "file-extension": "" }), text: "Não coloque a extensão dentro do nome, porque ela entra no truncamento e desaparece." },
          { kind: "do", attrs: stack([{ _tag: "cds-dropzone", viewport: "desktop" }, ui("uploaded")]), text: "Use o Upload Item para acompanhar e agir sobre o arquivo, e o Dropzone para adicionar." },
          { kind: "dont", attrs: ui("uploaded", { "text-title": "Adicionar arquivo", "file-extension": "", description: "Clique para escolher" }), text: "Não use o Upload Item como área para adicionar arquivo." }
        ] }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O envio é mostrado pelo Spinner e pela Progress Line (ver o Motion de cada um). As ações seguem o Motion do Icon Button." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "O zeroheight não tem seção de Motion para o Upload Item, nem para a troca entre Status (CONFERIR C140)." } }
      ] }
    ]
  };
})();
