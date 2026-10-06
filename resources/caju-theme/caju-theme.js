/* Recurso de suporte — Caju Theme (Zx9KwwRFqZrOfeuXpYZiTx): tokens Common/*, text styles, elevations e Motion Styles,
   mais as libs de apoio [Caju] Icons e [Caju] Illustrations (antes recursos separados; as rotas antigas redirecionam).
   Mostruário no estilo da página Caju Benefícios (4309:2) — Colors, Font, Borders, Sizes, Elevations, Opacity, Motion —
   adaptado para web responsivo. Os valores vêm ao vivo de styles/tokens.css (bloco `tokens`, scripts/tokens-kit.js). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Zx9KwwRFqZrOfeuXpYZiTx/-Caju--Theme?node-id=4309-2";
  CDS.register({ id: "caju-theme", name: "Tema Caju", resource: true, order: 1, status: "250", figma: FIGMA });
  // Ilustração e Motion saíram do tema e viraram páginas próprias em Padrões (pedido do Gustavo, 05/10); o conteúdo continua definido aqui
  CDS.register({ id: "ilustracao", name: "Ilustração", resource: true, order: 1.1, figma: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=3416-2" });
  CDS.register({ id: "motion", name: "Motion", resource: true, order: 1.2, figma: FIGMA });
  // Rotas antigas → endereço atual (links salvos continuam funcionando)
  var MOVED = { "caju-icons": "#/caju-theme/icones", "caju-illustrations": "#/ilustracao", "animations": "#/motion" }; // Animações: volta para cá quando a lib existir
  function moved(){
    var h = location.hash || "", m = h.match(/^#\/(caju-icons|caju-illustrations|animations)(?:\/([\w-]+))?/);
    if (m) location.replace(MOVED[m[1]]);
    else if (/^#\/caju-theme\/(ilustracoes|ilustracao)(?=$|[\/?])/.test(h)) location.replace("#/ilustracao"); // Ilustrações era tab do tema
    else if (/^#\/caju-theme\/motion(?=$|[/?])/.test(h)) location.replace("#/motion"); // Motion era tab do tema
  }
  moved(); window.addEventListener("hashchange", moved);
  var A = window.CDS.assets || {};
  var nIcons = (A.iconBuckets || []).filter(function(b){ return !b.deprecated && !b.glyphs; }).reduce(function(t, b){ return t + b.icons.length; }, 0);
  var nIlls = (A.illustrations || []).length, nCats = (A.illustrationBuckets || []).length;
  // Guia de ilustração (Figma [CastanhaDS] Component use documentation · páginas IL-*): telas de exemplo com componentes do DS
  var ILL = {}; (A.illustrations || []).forEach(function(i){ ILL[i.name] = i.src; });
  var IL_FIGMA = "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=3416-2";
  function scr(o){
    var body = [];
    if (o.ill) body.push({ _tag: "img", class: "pg-cnt-phone__ill pg-cnt-phone__ill--" + (o.size || "md"), src: ILL[o.ill] || "", alt: "" });
    if (o.title) body.push({ _tag: "h4", class: "pg-cnt-phone__title", _text: o.title });
    if (o.text) body.push({ _tag: "p", class: "pg-cnt-phone__text", _text: o.text });
    var kids = [{ _tag: "div", class: "pg-cnt-phone__body", _children: body }];
    if (o.primary) kids.push({ _tag: "cds-fixed-bar", kind: "pilled", "primary-label": o.primary, "show-secondary-action": !!o.secondary, "secondary-label": o.secondary || null, "show-lead-icon": false });
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--" + (o.align || "center"), _children: kids };
  }
  function hero(ill, primary){
    var kids = [{ _tag: "div", class: "pg-cnt-phone__body", _children: [{ _tag: "img", class: "pg-cnt-phone__hero", src: ILL[ill] || "", alt: "" }] }];
    if (primary) kids.push({ _tag: "cds-fixed-bar", kind: "pilled", "primary-label": primary, "show-secondary-action": false, "show-lead-icon": false });
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--hero", _children: kids };
  }
  function sizeImg(ill, size){ return { _tag: "img", class: "pg-cnt-phone__ill pg-cnt-phone__ill--" + size, src: ILL[ill] || "", alt: "" }; }
  var LIVE = "Os valores são lidos ao vivo dos tokens do playground: troque o tema (ícone de lua no topo) para ver os valores do dark. Clique numa amostra para copiar a variável CSS.";
  CDS.docs["caju-theme"] = {
    source: FIGMA, sourceLabel: "Abrir o [Caju] Theme no Figma",
    tabs: [
      { id: "cores", title: "Cores", blocks: [
        { h2: "Cores" },
        { p: "Tokens de cor `Common/Colors/*`, por família. " + LIVE },
        { tokens: "colors" }
      ] },
      { id: "tipografia", title: "Tipografia", blocks: [
        { h2: "Font" },
        { p: "Primitivos de tipografia `Common/Font/*`: família, tamanho, altura de linha e peso." },
        { tokens: "font" },
        { h2: "Text styles" },
        { p: "Os estilos de texto combinam os primitivos e são aplicados com o shorthand `font: var(--text-style-…)`." },
        { note: "Os text styles não existem no `castanha-tokens` (só os primitivos `--castanha-font-*`): no castanha-react eles vêm do componente `Text` e dos mixins SCSS." },
        { tokens: "text-styles" }
      ] },
      { id: "bordas", title: "Bordas", blocks: [
        { h2: "Borders" },
        { p: "Raio (`Common/Border/Radius/*`) e espessura (`Common/Border/Width/*`)." },
        { tokens: "radius" },
        { tokens: "width" }
      ] },
      // Conteúdo da página Scale do zeroheight (Fundação → Layout · 7390834), corrigido e refeito com componentes do DS.
      // Correções e divergências: CONFERIR C153 e C152
      { id: "tamanhos", title: "Tamanhos", blocks: [
        { h2: "Scale" },
        { p: "Utilizamos tamanhos e espaçamentos padronizados, baseados no grid de 4px, para manter a consistência visual e o alinhamento dos componentes no layout." },
        { h3: "Nomes alternativos comuns" },
        { p: "Dimensions, Spacing, Sizing units." },
        { h2: "Anatomia" },
        { p: "A escala parte de uma unidade base de 4px: quase todos os valores, de 4 a 200px, são múltiplos dela. As exceções são quatro valores de ajuste fino (1, 2, 6 e 14px), usados em bordas e espaçamentos internos. Use sempre o token (`Common/Sizes/*`), nunca o valor solto." },
        { tokens: "sizes" },
        { h2: "Tamanhos padrão" },
        { p: "Embora toda a escala esteja disponível, na construção das interfaces usamos por padrão um conjunto de seis tamanhos, que atende cerca de 90% dos layouts." },
        { tokens: "sizes-default" },
        { h2: "Acessibilidade" },
        { p: "Acessibilidade é tornar a interface utilizável por qualquer pessoa, com qualquer nível de familiaridade com aplicativos. Por isso, no mobile tratamos a área de toque e as dimensões dos elementos para facilitar a navegação e a interação." },
        { h3: "Área de toque" },
        { p: "É a região da tela em que a pessoa usuária interage com botões, links e ícones usando os dedos: o espaço mínimo para tocar um elemento com precisão, sem acionar por engano o que está ao lado. A referência é 48px (`Common/Sizes/48`)." },
        { compare: [
          { title: "Main Button Medium: 48px de altura", attrs: { _tag: "cds-main-button", label: "Ação primária", size: "medium", "show-lead-icon": false, "show-trailing-icon": false } },
          { title: "Main Button Small: 40px (abaixo da referência)", attrs: { _tag: "cds-main-button", label: "Ação primária", size: "small", "show-lead-icon": false, "show-trailing-icon": false } }
        ] },
        { note: "No DS de hoje, Main Button e Icon Button Small têm 40px e não ampliam a área de toque: use o tamanho Medium (48px) nas ações de toque no mobile. A imagem do zeroheight sugere 48px de área em volta do Small, o que ainda não existe nos componentes (CONFERIR C152)." },
        { h3: "Ícones em tela" },
        { p: "Considerando a área de toque, todo ícone clicável, no mobile ou na web, precisa estar dentro de um componente de botão. O Icon Button Medium tem 48px em qualquer variante." },
        { compare: [
          { title: "Default · Accent · 48px", attrs: { _tag: "cds-icon-button", icon: "placeholder-line", label: "Ação", kind: "default", appearance: "accent" } },
          { title: "Ghost · Accent · 48px", attrs: { _tag: "cds-icon-button", icon: "placeholder-line", label: "Ação", kind: "ghost", appearance: "accent" } },
          { title: "Ghost · Neutral · 48px", attrs: { _tag: "cds-icon-button", icon: "placeholder-line", label: "Ação", kind: "ghost", appearance: "neutral" } }
        ] },
        { p: "Pensamos nos mais diversos contextos, como a pessoa usuária em movimento ou usando só uma das mãos. Por isso, evite ícones soltos na tela." },
        { h2: "Diretrizes" },
        { dodont: [
          { kind: "do", attrs: { _tag: "cds-icon-button", icon: "placeholder-line", label: "Ação", kind: "default", appearance: "accent" }, title: "Ícones devem estar em elementos interativos", text: "Quando o ícone tem uma ação, use o Icon Button: ele garante a área de toque mínima e mantém a consistência da interface." },
          { kind: "dont", attrs: { _tag: "cds-icon", icon: "placeholder-line", size: "medium", appearance: "accent" }, title: "Não use ícone solto como ação", text: "Um ícone sozinho não garante área de toque acessível e pode gerar inconsistências e quebras na interface." }
        ] },
        { note: "Fonte: página Scale do zeroheight (Fundação → Layout), com correções: a escala tem 26 valores (a imagem do zeroheight mostra 14) e nem todos são múltiplos de 4. Dúvidas: canal #castanha-suporte no Slack." }
      ] },
      { id: "elevacao", title: "Elevação e opacidade", blocks: [
        { h2: "Elevations" },
        { p: "Sombras `Common/Elevation/level 1–3`. Escolha o nível para ver o card subir; a sombra aparece decomposta em x · y · blur · spread · cor." },
        { tokens: "elevation" },
        { note: "No `castanha-tokens` a sombra vem só decomposta (`--castanha-elevations-level-2-x`, `-y`, `-blur`, `-spread`, `-color`); a sombra pronta `--common-elevation-level-*` é do playground." },
        { h2: "Opacity" },
        { p: "Níveis `Common/Opacity/*`. Como no Figma, a amostra compara imagem e cor sólida (`Accent/Solid/medium`) sob uma camada `Support/darker` na opacidade do token. Arraste o Slider ou clique num nível." },
        { tokens: "opacity" }
      ] },
      { id: "motion", title: "Motion", blocks: [
        { h2: "Princípios de Motion" },
        { p: "O motion do Castanha é projetado para criar experiências fluidas, intuitivas e agradáveis, com base em três pilares: Simples, Eficiente e Consistente. O movimento torna as interações suaves e harmoniosas, refletindo a simplicidade e o acolhimento brasileiro." },
        { cards: [
          ["Simples", "As transições são suaves e intuitivas, facilitando o aprendizado em sistemas complexos."],
          ["Eficiente", "O movimento fornece respostas claras e destaca o que realmente importa, sinalizando mudanças e orientando o usuário de forma eficaz."],
          ["Consistente", "Movimentos suaves e previsíveis garantem uniformidade em todas as plataformas, orientando o usuário no ecossistema."]
        ] },
        { h2: "Motion Styles" },
        { p: "Os componentes usam os Motion Styles (`/01`), que descem a cascata até os primitivos `Common/Motion/*`. Baseado no explicador castanhads-motion, refeito com os componentes do Castanha DS." },
        { note: "Motion não existe no `castanha-tokens`: estes tokens são do playground (lidos do Figma). No castanha-react, as transições vêm dos mixins SCSS (`_motion.scss`)." },
        { tokens: "motion-live" },
        { tokens: "easing-lab" },
        { h2: "Velocidade" },
        { p: "Para garantir uma experiência fluida e consistente em todas as interações digitais estabelecemos diretrizes claras sobre a velocidade e duração. As curvas ajudam a dar vida aos movimentos: são suavizações em que elementos na tela aceleram no início e desaceleram quando param. A duração é determinada pelo tamanho do movimento e pela distância que ele percorre na tela: quanto maior for a distância, mais longa será a animação." },
        { p: "Passe o mouse para ver cada token em movimento; clique para levar ao laboratório (e copiar a variável)." },
        { tokens: "easing" },
        { tokens: "duration" },
        { tokens: "delay" },
        { h2: "Regras" },
        { dodont: [
          { kind: "do", text: "Combine durações adequadas com curvas de easing para criar animações suaves e naturais." },
          { kind: "dont", text: "A escolha da curva de easing é tão importante quanto a duração." },
          { kind: "do", text: "Use durações mais curtas para ações simples e mais longas para transições complexas, garantindo que o movimento seja perceptível, mas não lento demais." },
          { kind: "dont", text: "Movimentos rápidos demais podem parecer abruptos, enquanto movimentos lentos podem frustrar o usuário." },
          { kind: "do", text: "Use o movimento para fornecer feedback, destacar mudanças, simplificar interações, guiar a atenção, manter o fluxo e informar o usuário." },
          { kind: "dont", text: "Se não ajudar o usuário a entender o que aconteceu, o que está acontecendo atualmente ou o que ele pode esperar em seguida, o movimento é desnecessário para adicionar à experiência." },
          { kind: "do", text: "Movimentos mais longos devem ter durações maiores para parecerem naturais, enquanto movimentos curtos podem ser mais rápidos." },
          { kind: "dont", text: "Evite usar a mesma duração para todas as interações; adapte-se ao tipo de ação e à hierarquia visual." },
          { kind: "do", text: "Antes de criar animações, defina o objetivo, o público-alvo e a mensagem que deseja transmitir para garantir que as durações sejam adequadas ao contexto." },
          { kind: "dont", text: "Não criar feedbacks quase imperceptíveis." },
          { kind: "do", text: "Teste sempre como as animações se comportam em diferentes dispositivos e plataformas para garantir consistência." },
          { kind: "dont", text: "Para evitar distrações ou confusão no fluxo do usuário, não use quando desperdiça o tempo do usuário." }
        ] },
        { note: "Fonte: zeroheight · Princípios de Motion (734995) e Velocidade (24e587); os valores das curvas e durações vêm das variáveis do Figma. No Hub, três curvas Expressive não batem com o Figma e faltam Smooth, Overshoot, Short/00 e os delays (C163). Transições (757a5f) está \"In progress\" e fica de fora até ficar estável." }
      ] },
      { id: "icones", title: "Ícones", blocks: [
        { h2: "Ícones" },
        { p: "[Caju] Icons, na ordem e nas categorias do Figma: " + nIcons + " ícones de 24px, um vetor só e cor herdada do token (`Icons/*`). Troque cor e tamanho para ver a grade inteira mudar; clique num ícone para ver o detalhe e copiar." },
        { tokens: "icons" },
        { note: "Os ícones do frame [Deprecated] do Figma ficam na categoria Deprecated: os arquivos continuam no repo, mas não aparecem no instance swap dos componentes." },
        { h3: "Como usar" },
        { ul: [
          "O [Caju] Icons é a fonte dos desenhos; o componente Icon (`<cds-icon icon=\"credit-card-line\">`) aplica tamanho, Appearance e cor.",
          "Arquivos em `assets/icons/<categoria>/<nome>.svg`, catálogo em `assets/icons/catalog.json`.",
          "Atualizar: exportar do Figma (receita em `docs/ARCHITECTURE.md` §8) e rodar `node scripts/build-assets.js`.",
          "Glifos internos de componentes (ex.: o check do Checkbox) não são da lib: ficam em `assets/icons/_glyphs/`."
        ] }
      ] },
      { id: "ilustracoes", title: "Ilustrações", blocks: [
        { p: "As ilustrações servem para comunicar ideias de forma visual, atrair a atenção da pessoa usuária, ajudar a entender funcionalidades e reforçar a identidade da marca. Elas explicam processos complexos, tornam o produto mais agradável visualmente e criam uma experiência memorável." },
        { h2: "Princípios de ilustração" },
        { p: "O novo estilo de ilustração da Caju é orgânico e fluido, com a capacidade de transmitir suavidade, naturalidade e acessibilidade para uma comunicação amigável e convidativa." },

        { h2: "Painel semântico" },
        { p: "Incorporar a brasilidade nas ilustrações contribui para a valorização da identidade cultural, refletindo a riqueza e a pluralidade do Brasil. A construção do novo estilo foi influenciada por artistas modernistas e contemporâneos:" },
        { cards: [
          ["Artistas modernistas", "[Anita Malfatti](https://pt.wikipedia.org/wiki/Anita_Malfatti), [Di Cavalcanti](https://pt.wikipedia.org/wiki/Di_Cavalcanti), [Cândido Portinari](https://pt.wikipedia.org/wiki/C%C3%A2ndido_Portinari) e [Tarsila do Amaral](https://pt.wikipedia.org/wiki/Tarsila_do_Amaral)"],
          ["Artistas contemporâneos", "[Wilson Tibério](https://pt.wikipedia.org/wiki/Wilson_Tib%C3%A9rio), Zé Palito, Bianca Foratori e Victor Fidelis"]
        ] },
        { figures: [{ src: "assets/docs/ilustracao/painel-artistas.jpg", alt: "Mosaico de obras dos artistas de referência: cenas do cotidiano brasileiro, retratos e paisagens.", caption: "Painel semântico · referências. Obras dos artistas citados (direitos dos autores e herdeiros), usadas como referência de estilo, como no Hub." }] },
        { h3: "Elementos culturais e materiais" },
        { p: "Diversos elementos presentes no dia a dia dos brasileiros serviram de inspiração para o clima que as novas ilustrações querem passar." },
        { figures: [{ src: "assets/docs/ilustracao/painel-elementos.jpg", alt: "Painel com elementos do dia a dia brasileiro: casas, azulejos, plantas, caixote de feira, um cachorro caramelo e cartazes de folclore.", caption: "Painel semântico · elementos culturais e materiais." }] },

        { h2: "Cores" },
        { h3: "Tons Base" },
        { p: "As ilustrações têm uma paleta de cores exclusiva, com tons mais quentes, tanto para as cores base quanto para tons neutros." },
        { palette: { label: "Tons base", names: ["Neutral", "Off Red", "Safety Orange", "Yellow Green", "Egg Blue", "Mulberry", "Orchid"], steps: [20, 40, 60, 80, 100, 200], hex: [
          ["fff7f8", "f2e8e9", "d9c3c5", "968486", "554d50", "201418"],
          ["ffd7d6", "ffa3a1", "ff6a66", "e82f05", "99231f", "640b08"],
          ["ffe4b8", "ffc466", "fca823", "f57a00", "a14000", "6f3800"],
          ["e3f5a0", "daf086", "ade657", "87ca22", "427100", "154202"],
          ["d6fcf5", "b7f1e7", "8be5e6", "60d0d6", "057179", "014039"],
          ["ffecf8", "f5c9e6", "db86bf", "b55796", "753b62", "422037"],
          ["faebf4", "f5d6e8", "e184ba", "cd328c", "7b1e54", "521438"]
        ] } },
        { h3: "Tons de Pele" },
        { p: "O uso de tons de pele em ilustrações digitais promove diversidade, inclusão e representatividade, gerando identificação e valorizando as identidades únicas através dos nossos personagens." },
        { palette: { label: "Tons de pele", names: ["Burgundy", "Jasper", "Flame", "Sandy Brown", "Satin Sheen", "Coral"], steps: [20, 40, 60, 80, 100], notes: { 20: "Apenas luzes", 60: "Tons base", 100: "Apenas sombras" }, hex: [
          ["cf515d", "ab2734", "7d0d1a", "5c0914", "40060e"],
          ["ffa698", "d9604e", "b94132", "971f10", "63140a"],
          ["ffcbb1", "f0976c", "e16338", "c54417", "993412"],
          ["ffe2c2", "ffc37f", "eea256", "cf741a", "9c5713"],
          ["ffdfa3", "f0cc89", "cc9c49", "b4751d", "825415"],
          ["ffe7e2", "ffc9ba", "ffa086", "f5734f", "c25b3f"]
        ] } },
        { h3: "Tons de Cabelo" },
        { p: "Para os cabelos, temos uma paleta exclusiva que abrange os tons padrão Preto, Loiro, Grisalho e Castanho." },
        { palette: { label: "Tons de cabelo", names: ["Black Hair", "Blond Hair", "Grey Hair", "Brown Hair"], steps: [20, 40, 60, 80, 100], hex: [
          ["605e5e", "4a4848", "363535", "1e1d1d", "000000"],
          ["ffe9a5", "ffdc71", "ffcb2d", "fabc00", "e5ac00"],
          ["ececec", "d2d2d2", "bababa", "989898", "666666"],
          ["c66204", "af5500", "9a4b00", "854100", "693300"]
        ] } },
        { h3: "Personagens" },
        { p: "As roupas dos personagens sempre deverão ser em tons quentes ou terrosos, como laranja, vermelho, marrom e vinho. O uso do verde é permitido em acessórios e calçados." },
        { p: "Os tons mais frios, como verde, azul e roxo podem e devem ser utilizados em detalhes de cenário, para trazer equilíbrio e harmonia junto aos tons quentes mais predominantes." },
        { figures: [{ src: "assets/docs/ilustracao/cores-cenarios.png", alt: "Ilustrações com tons frios aplicados em detalhes do cenário.", caption: "Tons frios nos detalhes de cenário, em equilíbrio com os tons quentes." }] },
        { display: { attrs: [sizeImg("personagens/nadia", "lg"), sizeImg("personagens/karina-1", "lg"), sizeImg("personagens/robson", "lg")] } },
        { note: "Paletas lidas do Figma (frame Guidelines · Cores). São cores exclusivas das ilustrações, fora dos tokens `Common/*`: clique numa amostra para copiar o hex." },

        { h2: "Formas" },
        { p: "Nossas ilustrações são compostas majoritariamente por linhas curvas, conferindo um aspecto orgânico e fluido a elas." },
        { p: "Dessa forma, conseguimos transmitir suavidade, naturalidade e acessibilidade para uma comunicação amigável e convidativa." },
        { display: { attrs: [sizeImg("objetos/foguete", "lg"), sizeImg("objetos/presente-aberto", "lg"), sizeImg("objetos/trofeu", "lg")] } },
        { figures: [
          { src: "assets/docs/ilustracao/formas-2.png", alt: "Ilustração composta por linhas curvas.", caption: "Linhas curvas: suavidade." },
          { src: "assets/docs/ilustracao/formas-3.png", alt: "Ilustração composta por linhas curvas.", caption: "Formas orgânicas: naturalidade." },
          { src: "assets/docs/ilustracao/formas-4.png", alt: "Ilustração composta por linhas curvas.", caption: "Composição fluida: comunicação amigável." }
        ] },
        { h2: "Linhas" },
        { p: "As linhas de contorno cumprem a função de separar planos e reforçar contraste." },
        { figures: [{ src: "assets/docs/ilustracao/linhas-contraste.png", alt: "Ilustração de um caixote de feira com o detalhe ampliado das linhas de contorno.", caption: "Linhas de contorno separando planos (detalhe ampliado à direita)." }] },
        { p: "As cores utilizadas nas linhas de contorno sempre deverão favorecer seu contraste em relação às formas sobrepostas. Além disso, a sobreposição deve respeitar a relação entre cores quentes e cores frias." },
        { dodont: [
          { kind: "do", text: "Aplique linhas em tons quentes sobre formas em tons quentes." },
          { kind: "dont", text: "Não use linhas com baixo contraste em relação à área sobreposta." },
          { kind: "dont", text: "Não aplique linhas em tons frios sobre formas em tons quentes." }
        ] },

        { h2: "Tamanhos" },
        { p: "Nas plataformas Employee e Sponsor, as ilustrações entram nas telas por meio de Slots e seguem alguns tamanhos fixos (property Size das variants) para cada dispositivo." },
        { specimens: { min: "var(--common-sizes-160)", items: [
          { label: "80x80 · Apenas Employee", attrs: sizeImg("notificacoes/success", "sm") },
          { label: "144x144 · Employee + Sponsor", attrs: sizeImg("notificacoes/success", "md") },
          { label: "200x200 · Employee + Sponsor", attrs: sizeImg("notificacoes/success", "lg") },
          { label: "320x320 · Apenas Sponsor", attrs: { _tag: "img", class: "pg-cnt-phone__ill", style: "width:calc(var(--common-sizes-200) + var(--common-sizes-120));height:auto;max-width:100%", src: ILL["notificacoes/success"] || "", alt: "" } }
        ] } },
        { p: "As ilustrações Hero têm a intenção de gerar momentos WOW e, por isso, possuem tamanhos específicos. Mais sobre essa categoria em Categorias, logo abaixo." },
        { table: { head: ["Size", "Medida", "Plataforma"], rows: [
          ["Small", "80x80", "Apenas Employee"], ["Medium", "144x144", "Employee + Sponsor"], ["Large", "200x200", "Employee + Sponsor"], ["Extra Large", "320x320", "Apenas Sponsor"],
          ["Hero Employee", "360x440", "Employee"], ["Hero Sponsor", "673x768", "Sponsor"]
        ] } },

        { h2: "Categorias" },
        { p: "Para atender diferentes contextos de uso, atualmente existem as seguintes categorias de ilustração:" },
        { shortcuts: [
          { title: "Personagens", text: "Para contextos onde haja a necessidade de uma narrativa mais acolhedora e empática.", illustration: "personagens/nadia" },
          { title: "Objetos", text: "É o tipo de ilustração mais comum, servindo para apresentar funcionalidades, ações ou informações de forma simbólica e acessível.", illustration: "objetos/foguete" },
          { title: "Feedback", text: "Tem a função de reforçar mensagens relacionadas a ações e estados do sistema, guiando o usuário e sugerindo seus próximos passos.", illustration: "notificacoes/success" },
          { title: "O Juca", text: "O Juca pode aparecer em momentos pontuais, criando uma conexão direta com as pessoas usuárias através de uma comunicação mais lúdica e divertida." },
          { title: "Hero", text: "São utilizadas quando queremos gerar momentos WOW, estabelecendo o tom emocional através de composições visuais impactantes.", illustration: "hero-employee/login" }
        ] },
        { figures: [{ src: "assets/docs/ilustracao/juca.png", alt: "Quatro poses do Juca, o caju mascote: piscando, preocupado, comemorando e meditando.", caption: "O Juca. Ainda não está na biblioteca de ilustrações do playground." }] },

        { h2: "Acessibilidade" },
        { p: "Todas as nossas ilustrações passam por testes de acessibilidade, visando assegurar que pessoas usuárias com algum tipo de condição visual, como daltonismo, visão embaçada e sensibilidade a luz também possam usufruir delas." },
        { simulate: { illustration: "objetos/foguete",
          matrices: {
            protanopia: "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0",
            deuteranopia: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",
            tritanopia: "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
          },
          items: [
            { label: "Protanopia", matrix: "protanopia" }, { label: "Acromatopsia", filter: "grayscale(1)" }, { label: "Deuteranopia", matrix: "deuteranopia" },
            { label: "Tritanopia", matrix: "tritanopia" }, { label: "Visão Turva", filter: "blur(var(--common-sizes-2))" }, { label: "Diplopia", double: true },
            { label: "Amarelamento", filter: "sepia(0.7) saturate(1.4)" }, { label: "Perda de Contraste", filter: "contrast(0.45)" }, { label: "Luz Intensa", filter: "brightness(1.6) contrast(0.6)" }
          ] } },
        { p: "Já para pessoas usuárias com perda total de visão e que utilizam leitores de tela em seus dispositivos, em breve teremos a opção do Alt Text (ou textos alternativos) para descrever o conteúdo das ilustrações. Exemplos de texto alternativo do Hub:" },
        { ul: ["Ilustração de um caixote de feira vazio, com algumas folhas de árvore voando ao vento por cima.", "Ilustração de um galo curvando a cabeça para trás e cacarejando."] },
        { p: "Quando a ilustração só decora e o texto ao lado já diz tudo, ela fica sem texto alternativo (`alt=\"\"`), para o leitor de tela não repetir a mensagem. É assim nos componentes do playground." },
        { note: "Simulação aproximada, feita ao vivo com filtros sobre uma ilustração da biblioteca (o Figma mostra prints dos testes)." },

        { h2: "Aplicações" },
        { p: "Cada contexto pede uma relação diferente entre ilustração, texto e componentes. Se surgir uma necessidade que estas diretrizes não cobrem, fale com o time no #castanha-suporte." },
        { h3: "Cenários de uso" },
        { guides: [
          { title: "Onboarding", text: "As ilustrações em onboardings explicam funcionalidades e apresentam novidades do app de forma visual e engajadora, facilitando a compreensão e melhorando a experiência da pessoa usuária.",
            attrs: scr({ ill: "objetos/kit-onboarding", size: "lg", title: "Seu app cheio de borogodó!", text: "Descubra as mudanças e novidades do app da Caju. Vamos lá?", primary: "Começar" }) },
          { title: "Alertas", text: "Ilustrações de alerta chamam atenção de forma visual e rápida, comunicando mensagens importantes com clareza e impacto.",
            attrs: scr({ ill: "notificacoes/alert", title: "Atualize seu app para continuar usando", text: "Temos novidades incríveis esperando por você! Atualize o app para aproveitar tudo que preparamos.", primary: "Atualizar aplicativo" }) },
          { title: "Telas de sucesso", text: "Ilustrações de sucesso reforçam feedbacks positivos, celebrando conquistas e motivando o usuário a continuar em sua jornada.",
            attrs: scr({ ill: "notificacoes/success", title: "Seu pagamento foi enviado!", text: "A confirmação pode levar até 3 dias úteis. Confira no seu histórico de pagamentos.", primary: "Entendi", secondary: "Abrir comprovante" }) },
          { title: "Telas de erro", text: "Ilustrações de erro comunicam falhas de forma leve e intuitiva, ajudando o usuário a entender e resolver o problema rapidamente.",
            attrs: scr({ ill: "notificacoes/error", title: "Seu cartão está bloqueado", text: "O pagamento do boleto só pode ser feito com o cartão desbloqueado. Altere sua senha ou fale com a Caju para resolver.", primary: "Falar com a Caju", secondary: "Alterar senha" }) },
          { title: "Estados vazios e páginas vazias", text: "Ilustrações do tipo Estados Vazios e Telas Vazias informam ausência de dados/informações e orientam as pessoas usuárias sobre como prosseguir em suas jornadas.",
            attrs: scr({ ill: "notificacoes/empty-state", title: "Empty State", text: "Texto para explicar o empty state, tendo no máximo 2 linhas", primary: "Opção de redirecionamento 1", secondary: "Opção de redirecionamento 2" }) },
          { title: "Splash Screen", text: "Aproveitando o uso das ilustrações Hero para gerar momentos WOW, as Splash Screens servem para dar as boas-vindas para a pessoa usuária enquanto reforçam a identidade visual da Caju!",
            attrs: hero("hero-employee/splash-screen") }
        ] },
        { h3: "Employee" },
        { guides: [
          { title: "Ilustração x Texto x Componentes", text: "Quando houver uma quantidade maior de texto e/ou componentes, é indicado que as ilustrações sejam aplicadas no tamanho 144x144 (Md).",
            attrs: scr({ ill: "autenticacao/verificar-selfie", size: "md", title: "Verifique sua identidade", text: "Nesta etapa, vamos precisar de uma foto do seu rosto (selfie). Tire a foto em um ambiente bem iluminado; Não use acessórios que escondem o rosto (óculos, máscara, fones ou boné);", primary: "Continuar" }) },
          { title: "200x200 (Lg)", text: "Já em cenários onde haja pouco texto e um maior destaque para as ilustrações, elas deverão ser aplicadas no tamanho 200x200 (Lg).",
            attrs: scr({ ill: "autenticacao/codigo", size: "lg", title: "Autenticação em 2 etapas", text: "Escolha um meio de contato para receber o código de autenticação e acessar seu app.", primary: "E-mail pessoal", secondary: "Telefone celular (SMS)" }) },
          { title: "Bottom Sheet", text: "Por conta do espaço reduzido, as ilustrações nos Bottom Sheets sempre deverão seguir o padrão 144x144 (Md).",
            attrs: { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet pg-cnt-phone--center", _children: [
              { _tag: "cds-bottom-sheet", inline: true, "show-header": false, "show-footer": false, _children: [ // Footer do sheet não expõe Lead Icon: Main Button no Slot, sem ícone
                sizeImg("documentos/rg-cnh-verso", "md"),
                { _tag: "h4", class: "pg-cnt-phone__title", _text: "Verso do documento" },
                { _tag: "p", class: "pg-cnt-phone__text", _text: "As informações do verso do documento precisam ficar visíveis na foto." },
                { _tag: "cds-main-button", class: "pg-cnt-phone__cta", label: "Entendi", "show-lead-icon": false, "show-trailing-icon": false }
              ] }
            ] } },
          { title: "Feedbacks", text: "As ilustrações de Feedback (alertas, telas de sucesso/erro e empty states/empty pages) possuem menos detalhes, por isso suas aplicações em Employee devem seguir o padrão de 144x144 (Md).",
            attrs: scr({ ill: "notificacoes/empty-state", size: "md", title: "Empty State", text: "Texto para explicar o empty state, tendo no máximo 2 linhas", primary: "Opção de redirecionamento 1", secondary: "Opção de redirecionamento 2" }) },
          { title: "Exceções contextuais", text: "Geralmente as ilustrações são aplicadas no centro da tela, mas há uma exceção: nas telas de saldo e extrato, elas ficam alinhadas à esquerda. Nesse cenário a ilustração de Sucesso segue o padrão de 80x80 (Sm).",
            attrs: scr({ ill: "notificacoes/success-low-detail", size: "sm", align: "start", title: "Envio de saldo confirmado", text: "Retirado de Home Office: - R$ 100,00. Enviado para Cultura: + R$ 100,00.", primary: "Acessar extrato", secondary: "Compartilhar comprovante" }) },
          { title: "Hero", text: "Como mencionado no tópico anterior, as ilustrações do tipo Hero possuem especificações próprias. Em Employee elas são aplicadas no padrão de 360x440.",
            attrs: hero("hero-employee/login", "Acessar") }
        ] },
        { h3: "Sponsor" },
        { table: { head: ["Contexto", "Tamanho"], rows: [
          ["Modais: caixas de diálogo que aparecem sobre a interface principal", "200x200 (Lg)"],
          ["Feedbacks em telas com pouca informação de texto e componentes", "200x200 (Lg)"],
          ["Feedbacks em telas com alto volume de informações (textos e componentes)", "144x144 (Md)"],
          ["Ilustrações Hero", "673x768"]
        ] } },
        { p: "As ilustrações de Feedback (alertas, telas de sucesso/erro e empty states/empty pages) possuem menos detalhes. Por isso, em telas onde há pouca informação de texto e componentes, suas aplicações em Sponsor deverão seguir o padrão de 200x200 (Lg)." },
        { p: "Assim como ocorre em Employee, as ilustrações do tipo Hero possuem especificações próprias. No caso de Sponsor elas são aplicadas no padrão de 673x768." },
        { figures: [
          { src: "assets/docs/ilustracao/sponsor-modal.png", alt: "Modal do Sponsor com ilustração 200x200.", caption: "Modal: 200x200 (Lg)." },
          { src: "assets/docs/ilustracao/sponsor-feedback-lg.png", alt: "Tela de feedback do Sponsor com pouca informação e ilustração 200x200.", caption: "Feedback com pouca informação: 200x200 (Lg)." },
          { src: "assets/docs/ilustracao/sponsor-feedback-md.png", alt: "Tela de feedback do Sponsor com muita informação e ilustração 144x144.", caption: "Feedback com alto volume de informação: 144x144 (Md)." },
          { src: "assets/docs/ilustracao/sponsor-hero.png", alt: "Tela do Sponsor com ilustração Hero.", caption: "Hero: 673x768." }
        ] },

        { h2: "Do's and Don'ts" },
        { p: "No Hub, estas diretrizes se chamam Bom pra Caju (faça) e Sem Sabor (não faça)." },
        { dodont: [
          { kind: "do", title: "Sempre adicione a Biblioteca de Ilustrações ao seu arquivo Figma.", text: "Dessa forma, seu arquivo se mantém atualizado toda vez que houver alguma mudança nas ilustrações. Para isso, siga os passos a seguir:",
            steps: ["No seu arquivo, clique em Review Library Updates;", "Busque por 4. [Castanha DS] Illustration e clique em Add to file."],
            attrs: [{ _tag: "img", src: "assets/docs/ilustracao/dos-biblioteca-1.png", alt: "Painel do Figma com o botão Review Library Updates." }, { _tag: "img", src: "assets/docs/ilustracao/dos-biblioteca-2.png", alt: "Busca pela biblioteca 4. [Castanha DS] Illustration com o botão Add to file." }] },
          { kind: "do", title: "Respeite os breakpoints e suas respectivas aplicações.", text: "As ilustrações seguem alguns padrões de tamanhos para atender diferentes contextos, que exigem diferentes níveis de detalhamento e composição. Uma ilustração usada em uma Splash Screen não segue o mesmo padrão de tamanho de um Alerta, por exemplo. Para mais informações sobre aplicações, consulte Aplicações, acima.", attrs: { _tag: "img", src: "assets/docs/ilustracao/dos-breakpoints.png", alt: "Comparação de tamanhos de ilustração entre uma Splash e um Alerta." } },
          { kind: "dont", title: "Não dê Detach nas Instâncias dos Componentes de ilustração.", text: "Para que possamos garantir que as ilustrações estejam sempre atualizadas nos arquivos linkados, é necessário mantê-las integralmente como Instâncias. Dar Detach pode causar inconsistências ao longo das jornadas e dificultar a manutenção das ilustrações nesses arquivos.", attrs: { _tag: "img", src: "assets/docs/ilustracao/donts-detach.png", alt: "Ilustração com Detach no painel de camadas do Figma." } },
          { kind: "dont", title: "Não redimensione as ilustrações para além dos padrões de Size", text: "Para assegurar a consistência no uso e aplicação das ilustrações, sempre respeite os tamanhos estabelecidos na propriedade Size das variants:",
            steps: ["Small (80x80)", "Medium (144x144)", "Large (200x200)", "Extra Large (320x320)"], attrs: { _tag: "img", src: "assets/docs/ilustracao/donts-redimensionar.png", alt: "Ilustração redimensionada fora dos tamanhos de Size." } },
          { kind: "dont", title: "Não mude as cores das ilustrações", text: "As cores utilizadas na composição de cada uma das ilustrações levam em consideração critérios como acessibilidade e a própria harmonização entre elas. Evite alterar as cores das ilustrações para que o padrão das paletas seja mantido, assim como o equilíbrio e consistência nas interfaces.", attrs: { _tag: "img", src: "assets/docs/ilustracao/donts-cores.png", alt: "Ilustração com as cores alteradas." } }
        ] },
        { note: "Fonte: Figma [CastanhaDS] Component use documentation · páginas IL-Painel Semântico, IL-Guidelines, IL-Aplicações e IL-Dos&Donts, e zeroheight · Princípios de ilustração (943842). No Figma, IL-Intro, IL-Princípios e IL-Como solicitar estão vazias; o texto dessas partes vem do Hub (Ilustração, Princípios e Como solicitar ilustrações, revisados em 05/10, C164). As telas de exemplo foram refeitas com componentes do DS e ilustrações da biblioteca (C110)." },
        { h2: "Como solicitar ilustrações" },
        { p: "Peça ao time de Ilustração do Castanha pelo canal #castanha-suporte no Slack:" },
        { cards: [
          ["Novas ilustrações", "Para contextos de uso que a biblioteca ainda não cobre."],
          ["Adaptação de breakpoints", "Quando uma ilustração existente precisa de um tamanho que ainda não está disponível."]
        ] },
        { h2: "Biblioteca" },
        { p: "[Caju] Illustrations, na ordem e nas categorias do Figma: " + nIlls + " ilustrações em " + nCats + " categorias (Caju UI 200×200 e Hero). Troque o fundo para testar o contraste; clique numa ilustração para ver o detalhe e copiar." },
        { tokens: "illustrations" },
        { p: "A maior parte das ilustrações tem propriedades de Variants, como Type e Size, para se adequar a diferentes contextos de uso. A biblioteca componentizada fica no Figma: [abrir a biblioteca de ilustrações](https://www.figma.com/design/ndW0akp113d6seA4iY36r6/4.--Castanha-DS--Illustration)." },
        { figures: [{ src: "assets/docs/ilustracao/variants.gif", alt: "No Figma, a ilustração cartao selecionada mostra as propriedades Type (brilhos) e Size (LG).", caption: "Variants de uma ilustração no Figma: Type e Size." }] },
        { h3: "Como usar" },
        { ul: [
          "Quem usa a ilustração é o componente: Banner (`<cds-banner illustration=\"notificacoes/sino\">`) e Table (Kind=Empty, `notificacoes/empty-state`).",
          "Nome `<categoria>/<nome>`; só `<nome>` também funciona (pega a primeira categoria).",
          "Arquivos em `assets/illustrations/<categoria>/<nome>.svg`, catálogo em `assets/illustrations/catalog.json`.",
          "Atualizar: exportar SVG das páginas Caju UI e Hero, rodar `python3 scripts/dev/import-illustrations.py <pasta> <listing.tsv>` e `node scripts/build-assets.js`.",
          "A página Cartões do Figma é o componente Caju Card: as artes dele ficam em `assets/caju-card/` (D65)."
        ] },
        { note: "Nomes repetidos no Figma (ex.: três `moeda-verde-pilha-2` em Finanças) ganharam sufixo `-1`, `-2` no repo. Estão no CONFERIR para corrigir na origem." }
      ] },
      { id: "visao-geral", title: "Visão geral", blocks: [
        { h2: "Tema Caju" },
        { p: "Fonte de tudo que os componentes usam por baixo: tokens (cores, tipografia, bordas, tamanhos, elevações, opacidade e motion, em light e dark) e ícones. Ilustração e Motion têm páginas próprias em Padrões." },
        { h3: "O que tem" },
        { ul: ["250 tokens `Common/*` (89 com valor dark)", "12 tokens da coleção Viewport (`Common/Grids/*` e `Specific/*`, por Mobile, Tablet e Desktop)", "34 text styles, incluindo Decorative em Work Sans", "3 elevações (`Elevation/level 1–3`)", "15 variáveis de Motion Styles (`.Motion Styles`, modo Normal)"] },
        { h3: "No repo" },
        { ul: ["Snapshot: `tokens/figma-snapshot.json`", "Gerado: `styles/tokens.css`", "Tema escuro: `html[data-theme=\"dark\"]`"] },
        { h3: "Atualizar" },
        { ol: ["Atualizar o snapshot a partir do Figma", "Rodar `node scripts/build-tokens.js`"] },
        { h3: "Nomenclatura no código" },
        { ul: [
          "`Common/Colors/Text/intense` → `--common-colors-text-intense`",
          "`Label/Medium Label` → `--text-style-label-medium` (shorthand `font`)",
          "`Hover In/01/Timing` → `--motion-hover-in-01-timing`, apontando para o primitivo `Common/Motion/*`",
          "`Specific/Buttons/Main Button/Width/min-width` → `--specific-buttons-main-button-width-min-width` (coleção Viewport)"
        ] },
        { h3: "No castanha-react" },
        { p: "O pacote `castanha-tokens` gera os mesmos tokens com o prefixo `--castanha-` e sem o grupo `Common`/`Specific`: `Common/Colors/Text/intense` → `--castanha-colors-text-intense`. Aqui os dois nomes existem: o alias `--castanha-*` aponta para o `--common-*` e segue o tema escuro. Clique numa amostra para copiar o nome do pacote." },
        { ul: [
          "Batem com o pacote, em nome e valor (light e dark): os 200 tokens de marca e os 11 da coleção Viewport.",
          "Faixas de viewport iguais às do pacote (min-width): Mobile até 743, Tablet de 744 a 1365, Desktop a partir de 1366.",
          "Só aqui, fora do `castanha-tokens`: Motion (`Common/Motion/*` e Motion Styles), text styles e as elevações prontas para `box-shadow`. No React, motion e tipografia vêm dos mixins SCSS do castanha-react.",
          "`Specific/Carousel/gap` está no Figma e aqui, mas ainda não no pacote (staging)."
        ] },
        { note: "A página Caju Benefícios do Figma mostra a paleta primitiva da marca (ex.: Decorative 01–06, Overlay). Aqui aparecem os tokens `Common/*` que os componentes usam — é a camada semântica que aponta para essa paleta." }
      ] }
    ]
  };
  // Ilustração e Motion: páginas próprias em Padrões (uma tab cada, sem barra de tabs)
  (function(){
    var t = CDS.docs["caju-theme"].tabs;
    function take(id){ var i = t.map(function(x){ return x.id; }).indexOf(id); return i < 0 ? null : t.splice(i, 1)[0]; }
    var ilu = take("ilustracoes"), mo = take("motion");
    if (ilu) CDS.docs["ilustracao"] = { source: IL_FIGMA, sourceLabel: "Abrir o guia de ilustração no Figma", tabs: [ilu] };
    if (mo) CDS.docs["motion"] = { source: FIGMA, sourceLabel: "Abrir o [Caju] Theme no Figma", tabs: [mo] };
  })();
})();
