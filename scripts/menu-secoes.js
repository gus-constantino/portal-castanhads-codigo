/**
 * Seções dos recursos no menu do portal (antes dentro do scripts/app.js). Ordem dentro da seção = ordem dos ids.
 * Recurso fora da lista cai em "Mais recursos". top: a seção vem antes de Componentes (Desenvolvimento e Padrões, 09/10).
 * links: links externos (sem página, abrem em nova guia; com confirm, o Modal do DS antes) ou internos.
 * Também é lido pelo scripts/build-index.js para os links de página (acesso/paginas/): cada seção vira um alvo.
 */
window.CDS = window.CDS || {};
CDS.menuSecoes = [
  { id: "desenvolvimento", top: true, title: "Desenvolvimento", ids: ["comece-aqui", "dev-instalacao", "dev-ambiente", "dev-pacotes", "dev-formularios", "dev-hooks", "dev-assets", "dev-grid", "dev-tokens", "dev-universe", "flutter-instalacao", "flutter-ambiente", "flutter-componentes"], tip: "Como instalar e usar o Castanha no código: o Comece aqui e as docs de React (Storybook do castanha-react) e de Flutter (Widgetbook do castanha_flutter)." },
  { id: "padroes", top: true, title: "Padrões", ids: ["caju-theme", "ilustracao", "motion", "camadas", "conteudo", "patterns"], tip: "A base e as soluções recorrentes: tema (cores, tipografia, motion…), as camadas do DS, diretrizes de conteúdo e patterns de tela." },
  { id: "aprenda", title: "Aprenda", ids: ["treinamento", "capacitacoes", "castanha-quiz"], tip: "Como o DS funciona e como usar no dia a dia, no Figma e no código.",
    links: [{ name: "Curso na Awtra", href: "https://lms.awtra.com.br/company/caju/app/course/f5e0c07c-7778-489c-81af-91216c8ccdd0",
      confirm: { title: "Abrir o curso na Awtra?", text: "O curso fica na plataforma Awtra, fora deste site, e abre numa nova guia. Entre com a sua conta da Caju para acessar.", action: "Abrir curso" } }] }, // links externos: sem página, abrem em nova guia (com confirm: Modal do DS antes)
  { id: "ferramentas", title: "Ferramentas", ids: ["personas", "comparar", "agentes", "mcp"], tip: "Apoio ao projeto: as personas para quem projetamos, a comparação de componentes entre Figma, React e Flutter, assistentes de IA e integrações com o Castanha DS." },
  { id: "ajuda", title: "Ajuda", ids: ["faq", "changelog"], links: [{ name: "Primeiros passos", href: "#/inicio/primeiros-passos", internal: true }], tip: "Perguntas frequentes e o que mudou no DS." }
];
