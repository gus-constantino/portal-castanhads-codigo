/* Documentação — Image
   Fontes (PLANO-DOCS §5, 05/10): texto do zeroheight (Image, 933f87) reaproveitado; props e padrões do set da lib estável (Image 2273:320 — sem description);
   acessibilidade do playground. O zeroheight não tem a tab Style e a seção Motion está com o texto modelo (C135). */
(function(){
  window.CDS = window.CDS || {};
  CDS.docs = CDS.docs || {};
  var PHOTO = "assets/brand/sample-photo.svg";
  function img(ratio, more){ return Object.assign({ _tag: "cds-image", src: PHOTO, alt: "Pessoa sorrindo", "aspect-ratio": ratio || "none", class: "pg-doc-img" }, more || {}); }
  function row(items){ return { _tag: "div", class: "pg-doc-row pg-doc-row--wide", _children: items }; }

  CDS.docs["image"] = {
    tag: "cds-image",
    base: { src: PHOTO, alt: "Pessoa sorrindo", class: "pg-doc-img" },
    source: "https://castanha.caju.com.br/858426090/v/latest/p/933f87-image", sourceLabel: "Abrir o Image no zeroheight",
    cover: { description: "O componente Image é utilizado para exibir imagens estáticas em diferentes contextos do produto, garantindo consistência visual e preservação correta das proporções. Ele oferece controle direto, permitindo que a imagem se adapte a diferentes layouts sem distorção.", examples: [
      row([img("1:1", { class: "pg-doc-img pg-doc-img--sm" }), img("3:2", { class: "pg-doc-img" })])
    ] },
    tabs: [
      { id: "uso", title: "Uso", blocks: [
        { h2: "Sobre" },
        { p: "O componente Image é utilizado para exibir imagens estáticas em diferentes contextos do produto, garantindo consistência visual e preservação correta das proporções. Ele oferece controle direto, permitindo que a imagem se adapte a diferentes layouts sem distorção." },
        { h3: "Nomes alternativos comuns" },
        { p: "Imagem, Media / Media Object, Picture" },
        { h3: "Princípios" },
        { cards: [
          ["Clareza visual", "A imagem deve preservar sua proporção original sempre que possível, evitando cortes ou distorções que prejudiquem a compreensão do conteúdo."],
          ["Consistência", "Aspect ratios padronizados garantem previsibilidade entre componentes que exibem mídia dentro do produto."],
          ["Flexibilidade", "A variante none permite uso mais livre da imagem, enquanto 1:1 e 3:2 organizam a composição em layouts que exigem estrutura fixa."]
        ] },
        { h2: "Quando usar" },
        { p: "Use o componente Image sempre que for necessário exibir uma imagem estática que complemente ou enriqueça o conteúdo. Ele é indicado para cartões, listas, modais e demais áreas onde a imagem apoia a compreensão ou a tomada de decisão, além de ser útil em layouts que exigem padronização visual por meio de proporções consistentes entre múltiplas imagens." },
        { h3: "Utilize para:" },
        { ul: ["Reforçar contexto visual em cards, tabelas, resumos e destaques.", "Mostrar prévias ou thumbnails com proporção consistente.", "Exibir imagens responsivas que devem se adaptar ao container mantendo o ratio."] },
        { h3: "Não utilize para:" },
        { ul: ["Exibir mídias interativas, animadas ou em movimento, como GIFs, WebP animado ou vídeos — o componente Image suporta exclusivamente imagens estáticas.", "Ilustrações decorativas que não exigem controle de proporção — nesses casos, utilize diretamente o asset ou outro componente apropriado."] },
        { note: "Suporte: canal #castanha-suporte no Slack." }
      ] },

      { id: "anatomia", title: "Anatomia", blocks: [
        { h2: "Anatomia" },
        { anatomy: { attrs: { "aspect-ratio": "3:2" }, markers: [{ n: 1, target: "img", side: "right" }], legend: ["Frame com a imagem no Fill (cortada para caber na proporção)"] } },
        { h2: "Propriedades" },
        { props: [
          { name: "Aspect Ratio", type: "Variant", default: "None", values: ["None", "1:1", "3:2"] }
        ] },
        { note: "Props e padrões lidos do set Image da lib estável. O zeroheight ainda não tem a tab Style deste componente. No código: `src` é a imagem, `alt` o texto alternativo e `aspect-ratio` a proporção. A largura vem do container. Sem `src`, aparece a superfície de placeholder (Surface/01)." }
      ] },

      { id: "estilos", title: "Estilos", blocks: [
        { h2: "Aspect Ratio" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "None (proporção da imagem)", attrs: { "aspect-ratio": "none" } }, { label: "1:1", attrs: { "aspect-ratio": "1:1" } }, { label: "3:2", attrs: { "aspect-ratio": "3:2" } }
        ] } },
        { h2: "Sem imagem" },
        { specimens: { min: "var(--common-sizes-200)", items: [
          { label: "Placeholder 1:1", attrs: { src: null, alt: null, "aspect-ratio": "1:1" } }, { label: "Placeholder 3:2", attrs: { src: null, alt: null, "aspect-ratio": "3:2" } }
        ] } }
      ] },

      { id: "acessibilidade", title: "Acessibilidade", blocks: [
        { h2: "Leitor de tela" },
        { ul: [
          "O Image usa `<img>`: o `alt` é o que o leitor de tela anuncia.",
          "Quando a imagem informa algo, descreva o conteúdo no `alt` (ex.: \"Cartão Caju sobre a mesa\").",
          "Quando é decorativa ou repete o texto ao lado, deixe o `alt` vazio — o leitor de tela pula a imagem.",
          "Não coloque texto importante exclusivamente dentro da imagem: ele não é lido nem se adapta ao zoom."
        ] },
        { note: "O zeroheight ainda não tem seção de Acessibilidade para o Image. Contraste não se aplica ao componente: depende da imagem usada." }
      ] },

      { id: "diretrizes", title: "Diretrizes", blocks: [
        { h2: "Diretrizes de uso" },
        { guides: [
          { attrs: img("1:1", { class: "pg-doc-img pg-doc-img--sm" }), title: "Inserção da imagem no Figma", text: "O componente Image é estruturado por um frame que recebe a imagem diretamente pelo Fill do Figma, onde a pessoa usuária deve inserir exclusivamente arquivos estáticos (JPG, PNG, WebP estático ou SVG estático). A imagem não deve ser adicionada como layer separado, garantindo que o componente mantenha suas proporções e variantes de Aspect Ratio funcionando corretamente." },
          { attrs: img("3:2"), title: "Imagens", text: "Utilize exclusivamente imagens estáticas (JPG, PNG, WebP estático ou SVG estático) para garantir consistência e performance no produto." }
        ] },
        { h2: "Do's and Don'ts" },
        { h3: "Conteúdo" },
        { dodont: [
          { kind: "do", attrs: img("3:2"), text: "Insira a imagem sempre através do Fill, preservando a integridade do componente." },
          { kind: "dont", attrs: { _tag: "div", class: "pg-doc-loose-frame", _children: [{ _tag: "img", src: PHOTO, alt: "" }] }, text: "Não adicione a imagem como layer solto dentro do frame — isso quebra a estrutura do componente." }
        ] },
        { note: "No código, o equivalente ao Fill é o atributo `src`: não coloque um `<img>` solto dentro do `cds-image`." }
      ] },

      { id: "motion", title: "Motion", blocks: [
        { h2: "Motion" },
        { p: "O Image é estático: não tem estados de interação nem animação própria." },
        { alert: { appearance: "warning", label: "Especificação pendente", text: "A seção Motion do Image no zeroheight ainda está com o texto modelo e a tabela vazia (Enabled, Hovered, Loading, Pressed), e a lib não tem esses estados (CONFERIR C135)." } }
      ] }
    ]
  };
})();
