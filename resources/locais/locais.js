/* Componentes locais — página ESCONDIDA (hidden: true): fora do menu, da busca, do anterior/próximo e do MCP.
   Único acesso: link no Relatório › Arquitetura (Gustavo, 06/10/2026: "acessível apenas de um link em relatórios,
   bem escondido por enquanto"). Explica onde mora cada tipo de peça feita com o Castanha DS (componente, building
   block, template, team component, componente local e composição) e documenta o primeiro componente local, a Pilha
   (local/pilha), que leva o conceito do Castanha Assets às telas do playground (D221). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var ASSETS = "https://www.figma.com/design/ivkZfOligMDrdIur2kdqtT/Castanha-Assets";
  CDS.register({ id: "locais", name: "Componentes locais", resource: true, hidden: true, order: 99 });
  var H = "height:var(--common-sizes-120)";
  CDS.docs["locais"] = {
    tag: "loc-pilha",
    source: ASSETS, sourceLabel: "Castanha Assets no Figma",
    tabs: [
      { id: "visao", title: "Visão geral", blocks: [
        { hero: { title: "Componentes locais", text: "Peças feitas com o Castanha DS para um lugar específico: o que são, onde moram e quando cada uma vale a pena.", area: "componentes" } },
        { h2: "Onde cada peça mora" },
        { p: "Tudo o que vai para uma tela da Caju parte dos tokens e dos componentes do Castanha DS. O que muda de um tipo para outro é o alcance: quem pode usar a peça e onde ela fica guardada." },
        { table: { wrap: true, head: ["Tipo", "O que é", "Onde mora", "Quem usa", "Exemplo"], rows: [
          ["Componente do DS", "Peça publicada na biblioteca, com variantes, props e documentação.", "[CastanhaDS] Components", "Todos os produtos", "Main Button"],
          ["Building block", "Parte com ponto no nome, fora da publicação de propósito, que monta outros componentes.", "[CastanhaDS] Components", "Os próprios componentes do DS", "Os itens do menu Building blocks"],
          ["Template", "Trecho de tela pronto, montado com componentes do DS, que se repete entre produtos.", "Arquivos de templates do Figma", "Os produtos do template", "Header do Sponsor Templates"],
          ["Team component", "Peça de uma squad, feita com componentes e tokens do DS e reaproveitada nas telas dela.", "Biblioteca local da squad", "As telas da squad", "Nenhum no playground por enquanto"],
          ["Componente local", "Peça feita com tokens do DS para um lugar ou uma página, sem a intenção de virar componente.", "Junto da página que usa", "Aquele lugar", "Pilha, Banner, Vazio e Faixa, aqui no playground"],
          ["Composição", "Peça montada com tokens e componentes do DS onde o DS ainda não tem o componente. Candidata a entrar no DS.", "Junto do projeto, com pedido ao DS", "Quem precisa até o DS ter a peça", "Do/Don't e Card clicável"]
        ] } },
        { note: "Nas Camadas do DS a ordem é a mesma: componentes, templates, local assets da squad e a composição da tela. Aqui no playground, `cmp-` é o prefixo das peças que esperam o DS, e a tela inteira continua sendo a composição final." },
        { h2: "Como decidir" },
        { steps: [
          { title: "O DS já tem?", text: "Use o componente do DS, com as props que ele oferece. Nada de copiar e ajustar." },
          { title: "Existe template?", text: "Se o trecho de tela já está num arquivo de templates, use o template." },
          { title: "Vai se repetir nas telas da squad?", text: "Vira team component na biblioteca local da squad, montado com componentes do DS." },
          { title: "Falta no DS e serviria a outros produtos?", text: "Vira composição, com uma linha no CONFERIR e o pedido ao time do DS. Quando o DS tiver a peça, a composição sai." },
          { title: "É a identidade de um único lugar?", text: "Vira componente local, guardado junto da página que usa." }
        ] },
        { h2: "Regras para todos" },
        { dodont: [
          { kind: "do", title: "Monte com o DS", text: "Use tokens de cor, tamanho, raio, texto e Motion Styles, e componentes do DS dentro da peça." },
          { kind: "do", title: "Explique o motivo", text: "O cabeçalho do arquivo diz por que a peça existe, onde ela é usada e quando pode sair." },
          { kind: "dont", title: "Valor cru", text: "Hex, px, ms ou easing escritos à mão quebram o tema e o modo escuro." },
          { kind: "dont", title: "Levar para outro lugar", text: "Componente local não sai do lugar dele. Se outra página ou produto precisar, ele sobe para team component ou composição." }
        ] },
        { h2: "No código do playground" },
        { table: { head: ["Tipo", "Pasta", "Prefixo"], rows: [
          ["Componente do DS e building block", "`components/<id>/`", "`cds-`"],
          ["Template", "`templates/<id>/`", "`cds-`"],
          ["Composição", "`compositions/<id>/`", "`cmp-`"],
          ["Componente local", "`local/<id>/`", "`loc-`"]
        ] } },
        { p: "O build junta `local/` ao pacote logo depois das composições. Cada componente local tem um `.js` com o cabeçalho explicando o motivo e um `.css` feito com tokens." }
      ] },
      { id: "pilha", title: "Pilha", blocks: [
        { h2: "Pilha" },
        { p: "Cartões empilhados do tom mais escuro, atrás, ao mais claro ou mais saturado, na frente. É a assinatura visual das páginas do playground e vem do conceito do [Castanha Assets](" + ASSETS + "): a capa do arquivo, a Thumbnail Castanha e as thumbnails por jornada." },
        { h3: "Na capa da marca" },
        { hero: { title: "Castanha Hub", text: "Sobre Surface/accent, a pilha vai do vermelho mais escuro ao rosado. Passe o mouse na capa para abrir o leque." } },
        { h3: "Fora da capa vermelha" },
        { hero: { title: "Tema Caju", text: "Com area, a capa usa o fundo default e a pilha ganha a escala da área.", area: "padroes", cards: 3 } },
        { h3: "Variações" },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "4 cartões (padrão)", attrs: { style: H } },
          { label: "3 cartões", attrs: { cards: "3", style: H } },
          { label: "Em leque (fan)", attrs: { fan: true, style: H } },
          { label: "Encostada embaixo (align end)", attrs: { align: "end", style: H } }
        ] } },
        { h3: "Anatomia" },
        { ul: [
          "Cartão da frente: quadrado com a altura da pilha e raio Large.",
          "Cartões de trás: cada um recua 9% e encolhe 14% da altura, e aparece como uma faixa à esquerda.",
          "Cor: mistura do tom de trás para o da frente, um passo por cartão. O meio sai da mistura, sem tom novo.",
          "Proporção: vem do número de cartões. Quem usa define a altura."
        ] },
        { h3: "Propriedades" },
        { table: { head: ["Atributo", "Valores", "Para que serve"], rows: [
          ["`area`", "marca (padrão), componentes, padroes, aprenda, ferramentas, ajuda, legado", "Escala de cor da área (aba Cor por área)"],
          ["`on`", "accent, inversed", "A pilha está sobre Surface/accent (vermelho) ou Surface/inversed (topo do Relatório) e troca os tons para contrastar"],
          ["`cards`", "3, 4 (padrão)", "Quantidade de cartões"],
          ["`align`", "center (padrão), end", "end encosta os cartões embaixo, sangrando, como nas thumbnails por jornada"],
          ["`fan`", "sem valor", "Deixa o leque aberto parado. Sem ele, abre no hover ou no foco de quem tem a classe `loc-pilha-trigger`"]
        ] } },
        { h3: "Motion" },
        { specs: [
          { title: "Abrir o leque", rows: [["Gatilho", "Hover ou foco em `.loc-pilha-trigger`"], ["Motion Style", "Hover In/01"]] },
          { title: "Fechar o leque", rows: [["Gatilho", "Sair do hover ou do foco"], ["Motion Style", "Hover Out/01, com o delay do estilo"]] }
        ] },
        { p: "Com movimento reduzido no sistema, o leque troca de posição sem animar." },
        { h3: "Onde aparece" },
        { ul: [
          "Início: capa vermelha do Castanha Hub.",
          "Recursos: a capa de cada página (Tema Caju, Motion, Personas, FAQ…) traz a seção, a frase da página e a pilha da área, com um toque da cor no fundo.",
          "Estados vazios e página não encontrada: a pilha cinza do componente local Vazio.",
          "Preview do link: a imagem que aparece ao colar o endereço no Slack (`assets/brand/og-image.png`)."
        ] },
        { p: "A frase da capa de cada recurso fica no `lede` do `CDS.register`. A área sai da seção do menu (`CDS.areaOf`), então uma página nova na seção já ganha a cor certa." },
        { h3: "Uso" },
        { dodont: [
          { kind: "do", title: "Decoração", text: "A pilha é decorativa: fica com aria-hidden e o nome do lugar continua no título ao lado." },
          { kind: "do", title: "Na capa", text: "Uma pilha por capa, à direita do texto." },
          { kind: "dont", title: "Cor fora da escala", text: "Nada de pintar os cartões à mão. A cor vem da área." },
          { kind: "dont", title: "Conteúdo dentro", text: "Os cartões não levam texto, ícone nem imagem." },
          { kind: "dont", title: "Enfeite", text: "A pilha não vai no canto de cards, em itens de lista nem como marcador no menu: nada disso existe no Castanha Assets (Gustavo, 06/10)." }
        ] },
        { code: "<section class=\"loc-pilha-trigger\">\n  <h2>Tema Caju</h2>\n  <loc-pilha area=\"padroes\" cards=\"3\" style=\"height:var(--common-sizes-200)\"></loc-pilha>\n</section>" }
      ] },
      { id: "banner", title: "Banner", blocks: [
        { h2: "Banner" },
        { p: "O banner das Notion thumbnails do Castanha Assets: fundo no tom mais escuro da área, as faixas da pilha à esquerda e o conteúdo dentro do cartão da frente. Serve para divulgar os cursos e as capacitações do Castanha DS." },
        { banner: { area: "aprenda", eyebrow: "Curso", heading: "Castanha DS na Awtra", text: "O curso do Design System da Caju na plataforma Awtra, para fazer no seu ritmo.", href: "#/locais/banner", cta: "Exemplo de link" } },
        { table: { head: ["Atributo", "Valores", "Para que serve"], rows: [
          ["`area`", "aprenda (padrão) ou outra área", "Escala de cor (aba Cor por área)"],
          ["`eyebrow`", "texto", "Sobretítulo curto, como o tipo ou o número de vídeos"],
          ["`heading`", "texto", "Título, em Decorative"],
          ["`text`", "texto", "Uma frase sobre o curso ou a trilha"],
          ["`href`, `cta`, `external`", "link, texto, true", "O Link do DS dentro do cartão. external abre em outra aba"]
        ] } },
        { ul: [
          "Início: seção Aprenda o Castanha DS, com o curso na Awtra, as Capacitações e o treinamento Como usar as documentações.",
          "Capacitações: o topo de cada trilha, com o número de vídeos e o link para a página no Hub."
        ] },
        { p: "Nas docs, o bloco `banner` monta um banner e o bloco `banners` monta a grade: o primeiro ocupa a linha inteira e os outros dividem a linha." },
        { dodont: [
          { kind: "do", title: "Divulgar", text: "Curso, trilha ou treinamento que a pessoa pode fazer agora, com o link direto." },
          { kind: "dont", title: "Enfeite", text: "O banner não substitui card de atalho nem vira cabeçalho de seção comum." }
        ] },
        { h2: "Capa Black do Relatório" },
        { p: "O topo do Relatório usa a cor Black da Thumbnail Castanha: Surface/inversed, título em Decorative e a pilha com `on=\"inversed\"` (faixas claras atrás e o cartão da frente escuro). No tema escuro o fundo inverte e a capa vira a variação White do mesmo arquivo." }
      ] },
      { id: "vazio-faixa", title: "Vazio e faixa", blocks: [
        { h2: "Vazio" },
        { p: "O DS não tem componente de estado vazio. Busca sem resultado e página não encontrada usam o `<loc-vazio>`: a pilha na escala Legado, em leque parado, um título curto com o que aconteceu e um texto com o que a pessoa pode fazer." },
        { display: { attrs: { _tag: "loc-vazio", heading: "Nenhuma release encontrada", text: "Tente outro termo ou limpe os filtros." } } },
        { table: { head: ["Atributo", "Valores", "Para que serve"], rows: [
          ["`heading`", "texto", "O que aconteceu, numa frase curta"],
          ["`text`", "texto", "O que a pessoa pode fazer agora"],
          ["`size`", "small", "Pilha menor e menos respiro, dentro de listas e filtros"]
        ] } },
        { p: "Um Link do DS passado como filho vira a ação, embaixo do texto. Na página não encontrada, ele leva de volta ao Início." },
        { ul: ["Changelog: busca e filtros sem release.", "Conteúdo › Vocabulário: glossário sem termo.", "Qualquer endereço que não existe: página não encontrada, com o link para o Início."] },
        { note: "O FAQ continua com a ilustração de busca sem resultado da biblioteca de ilustrações, que já é da Caju." },
        { h2: "Faixa" },
        { p: "A tarja \"Legado | Arquivado\" das thumbnails arquivadas do Castanha Assets. Um componente ou página com `legacy: \"motivo\"` no `CDS.register` ganha a faixa na capa, a capa em cinza, a Tag Legado no cabeçalho com o motivo no Tooltip e a palavra Legado no menu." },
        { display: { attrs: { _tag: "div", style: "position:relative; width:100%; min-height:var(--common-sizes-120)", _children: [{ _tag: "loc-faixa" }] } } },
        { note: "Nenhum componente do playground é legado hoje: as docs de sets legados do Figma ficam de fora. A faixa fica pronta para quando um sair de uso." },
        { code: "CDS.register({ id: \"meu-componente\", name: \"Meu componente\", legacy: \"Substituído pelo Main Button.\", … });" }
      ] },
      { id: "cores", title: "Cor por área", blocks: [
        { h2: "Cor por área" },
        { p: "Cada seção do menu leva uma escala do tema, como as jornadas nas thumbnails do Castanha Assets. A marca e os componentes ficam no vermelho. As outras áreas usam as escalas Charts, que já mudam no modo escuro." },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "Marca e Componentes · Accent", attrs: { area: "componentes", style: H } },
          { label: "Padrões · Charts 03", attrs: { area: "padroes", style: H } },
          { label: "Aprenda · Charts 04", attrs: { area: "aprenda", style: H } },
          { label: "Ferramentas · Charts 02", attrs: { area: "ferramentas", style: H } },
          { label: "Ajuda · Charts 01", attrs: { area: "ajuda", style: H } },
          { label: "Legado · Charts 07", attrs: { area: "legado", style: H } }
        ] } },
        { table: { wrap: true, head: ["Área", "Escala", "Atrás → frente", "Seções"], rows: [
          ["Marca e Componentes", "Accent/Solid", "`accent-solid-intense` → `accent-solid-medium`", "Início, componentes, building blocks e composições"],
          ["Padrões", "Charts 03", "`charts-03-intense` → `charts-03-medium`", "Tema Caju, Ilustração, Motion, Camadas, Conteúdo e Patterns"],
          ["Aprenda", "Charts 04", "`charts-04-intense` → `charts-04-medium`", "Treinamento e Capacitações"],
          ["Ferramentas", "Charts 02", "`charts-02-intense` → `charts-02-medium`", "Personas, Agentes e Skills e MCP"],
          ["Ajuda", "Charts 01", "`charts-01-intense` → `charts-01-medium`", "FAQ e Changelog"],
          ["Legado", "Charts 07", "`charts-07-intense` → `charts-07-medium`", "Componente ou página fora de uso"]
        ] } },
        { note: "As cores do Castanha Assets estão cruas no Figma e não batem com os tokens. O playground usa as escalas do tema mais próximas (C173 no CONFERIR)." }
      ] }
    ]
  };
})();
