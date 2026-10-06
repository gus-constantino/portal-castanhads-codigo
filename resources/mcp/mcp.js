/* Recurso: MCP do Castanha DS — como conectar assistentes de IA (Claude, Cursor…) ao design system.
   Plano: docs/local/PLANO-MCP.md (M3: página "Como conectar"). Código: mcp/ (servidor, gerador de JSX, teste) e
   scripts/mcp/ (catálogo e arquivo único gerados no build: dist/mcp/catalog.json e dist/mcp/castanha-mcp.js). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var REPO = "https://github.com/gus-constantino/castanhads-component-teste/blob/main/";
  // soon: Tag neutra "Em breve" no menu e no cabeçalho — o MCP só vai ser ofertado ao time depois (pedido do Gustavo, 05/10)
  CDS.register({ id: "mcp", name: "MCP", resource: true, lede: "Conecte o seu assistente de IA ao Castanha DS: componentes, docs, tokens e diretrizes.", order: 6, soon: "Ainda não ofertado ao time: o MCP está em teste e será liberado depois." });

  var CLAUDE_CODE = "claude mcp add castanha-ds -- node /caminho/para/castanha-mcp.js";
  var JSON_CFG = '{\n  "mcpServers": {\n    "castanha-ds": {\n      "command": "node",\n      "args": ["/caminho/para/castanha-mcp.js"]\n    }\n  }\n}';
  var BAIXAR = "curl -L -o castanha-mcp.js https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/castanha-mcp.js";

  CDS.docs["mcp"] = {
    tabs: [
      { id: "conectar", title: "Conectar", blocks: [
        { h2: "MCP do Castanha DS" },
        { p: "Conecte o seu assistente de IA (Claude, Cursor, VS Code e outros) ao Castanha DS. Em vez de adivinhar, ele consulta os componentes, as docs, as props do Figma e do castanha-react, os tokens, os ícones, as ilustrações e as diretrizes de conteúdo, e gera e revisa código React com o DS." },
        { p: "MCP (Model Context Protocol) é o padrão aberto que os assistentes usam para se conectar a fontes de informação e ferramentas." },
        { alert: { appearance: "informative", label: "Em breve", text: "O MCP ainda não foi ofertado ao time: está em teste e será liberado depois. As instruções abaixo valem para quem está testando. Ele consulta o conteúdo deste site e não altera nada." } },
        { shortcuts: [
          { title: "Arquivo do MCP", text: "Um arquivo único, sem instalação. Precisa do Node 18 ou mais novo.", href: "dist/mcp/castanha-mcp.js", cta: "Abrir castanha-mcp.js", external: true },
          { title: "Código e README", text: "Servidor, gerador de JSX, teste e detalhes técnicos no repositório.", href: REPO + "mcp/README.md", cta: "Abrir no GitHub", external: true }
        ] },
        { h2: "Passo a passo" },
        { steps: [
          { title: "Baixe o arquivo", text: "Salve o `castanha-mcp.js` numa pasta fixa do seu computador (ex.: `~/castanha/`). Pelo terminal:" },
          { title: "Conecte no seu assistente", text: "Troque `/caminho/para/` pela pasta onde salvou o arquivo. Abaixo estão o comando ou a configuração de cada assistente." },
          { title: "Teste", text: "Abra uma conversa nova e pergunte, por exemplo: \"Como uso o Tag em estado de erro no React?\" ou \"Qual ícone do Castanha DS uso para cartão?\". O assistente deve consultar o Castanha DS antes de responder." }
        ] },
        { code: BAIXAR },
        { h3: "Claude Code" },
        { code: CLAUDE_CODE },
        { h3: "Claude Desktop" },
        { p: "Em Configurações › Desenvolvedor › Editar configuração (arquivo `claude_desktop_config.json`), acrescente:" },
        { code: JSON_CFG },
        { h3: "Cursor" },
        { p: "Em `.cursor/mcp.json` do projeto (ou nas configurações de MCP do Cursor), use a mesma configuração do Claude Desktop." },
        { h3: "Quem trabalha neste repositório" },
        { p: "Com o repositório clonado, use o servidor da pasta `mcp/`: `claude mcp add castanha-ds -- node mcp/server.js`. Ele lê o catálogo gerado no build (`dist/mcp/catalog.json`)." },
        { note: "O arquivo baixado busca o conteúdo neste site a cada vez que o assistente abre, então ele acompanha as atualizações do DS sem baixar de novo. Só baixe outra vez quando houver ferramenta nova." }
      ] },
      { id: "ferramentas", title: "Ferramentas", blocks: [
        { h2: "O que o assistente pode fazer" },
        { table: { wrap: true, head: ["Ferramenta", "Para quê"], rows: [
          ["`listar_componentes`", "Componentes por categoria, com status no Figma e par no castanha-react; e os que existem no React sem par no Figma."],
          ["`componente`", "Tudo de um componente: descrição, links (Figma, Storybook, zeroheight), props no Figma, props do React com tipo e padrão, import, tradução Figma → React e divergências."],
          ["`docs`", "Texto de uma tab da documentação (uso, anatomia, estilos, acessibilidade, diretrizes, motion, conteúdo) ou de todas."],
          ["`buscar`", "Busca livre em componentes, docs, tokens, ícones e ilustrações."],
          ["`tokens`", "Valor no claro e no escuro, por viewport, e o nome no castanha-tokens (`--castanha-*`) ou o aviso de que ainda não está no pacote."],
          ["`icone`", "Ícones do [Caju] Icons por nome ou palavra-chave, com o uso no React."],
          ["`ilustracao`", "Ilustrações do [Caju] Illustrations, com o nome no pacote (às vezes diferente do Figma)."],
          ["`diretrizes`", "Conteúdo e escrita, motion, ilustração, patterns e treinamento."],
          ["`divergencias`", "O que está diferente entre Figma, castanha-react e playground (CONFERIR e check da stack)."],
          ["`gerar_jsx`", "Código do castanha-react a partir das props como estão no Figma. É o mesmo código do painel \"No React\" de cada componente."],
          ["`revisar_codigo`", "Revisa um trecho JSX: componente ou prop inexistente, valor fora das opções, prop obrigatória faltando, ícone ou ilustração com nome errado, cor ou tamanho cru que tem token e padrão do React diferente do Figma."]
        ] } },
        { h3: "Prompts prontos" },
        { ul: ["`implementar-tela`: implementa uma tela inteira com componentes e tokens do DS, gerando e revisando o código.",
          "`revisar-handoff`: compara Figma, docs e castanha-react de um componente e lista o que precisa de decisão.",
          "`escrever-texto`: escreve ou revisa texto de interface pelas diretrizes de conteúdo."] }
      ] },
      { id: "exemplos", title: "Exemplos", blocks: [
        { h2: "Do Figma para o código" },
        { p: "Pedido: \"Gera o código do Main Button com Appearance Inversed, sem ícones, desabilitado, com o texto Salvar.\" O assistente chama `gerar_jsx` e recebe:" },
        { code: "import { Button } from '@caju-beneficios/castanha-react';\n\n<Button appearance=\"inverted\" disabled>Salvar</Button>" },
        { p: "Props com o valor padrão do React ficam de fora, e o que não tem tradução para o React vem avisado." },
        { h2: "Revisão de código" },
        { p: "Pedido: \"Revisa este trecho\". Com `revisar_codigo`, o assistente aponta, por exemplo:" },
        { code: "<Button appearance=\"primary\" variant=\"ghost\">Salvar</Button>\n<TextInput lable=\"CPF\" error=\"CPF inválido\" />\n<div style={{ color: '#1a1a1a', padding: '16px' }} />" },
        { ul: ["`appearance=\"primary\"` não existe: as opções são accent, inverted e neutral.",
          "`variant` vem de outra biblioteca: no Castanha DS é `appearance` ou `kind`.",
          "`lable`: você quis dizer `label`?",
          "`error` é boolean: a mensagem vai em `supportingMessage`.",
          "`#1a1a1a` em color: use `var(--castanha-colors-text-intense)`. `16px` em padding: use `var(--castanha-sizes-16)`."] },
        { h2: "Perguntas que funcionam bem" },
        { ul: ["\"Qual componente uso para filtrar uma lista?\"",
          "\"Quais tokens de cor de texto existem e qual é o valor no tema escuro?\"",
          "\"Como escrevo uma data e um valor em reais na interface?\"",
          "\"Tem alguma divergência aberta no Drawer entre o Figma e o React?\"",
          "\"Monta uma tela de confirmação de pedido com componentes e tokens do Castanha DS.\""] }
      ] },
      { id: "como-funciona", title: "Como funciona", blocks: [
        { h2: "De onde vem o conteúdo" },
        { p: "A cada atualização do site, o build junta tudo o que o playground mostra num catálogo (`dist/mcp/catalog.json`): componentes, docs, status e props do Figma, props e mapas do castanha-react, tokens, ícones, ilustrações, CONFERIR e o check da stack. O MCP lê esse catálogo e não altera nada." },
        { p: "O lado React vem do repositório oficial (branch staging), atualizado pela rotina diária. As props do Figma são relidas toda segunda-feira." },
        { h2: "O que ele não faz" },
        { ul: ["Não altera nada: nem o Figma, nem o código, nem este site.",
          "Não inventa componente: se algo não existe no DS, a resposta diz isso.",
          "Não substitui a revisão do time: docs marcadas como rascunho aparecem como rascunho."] },
        { h2: "Para quem mantém" },
        { ul: ["Servidor: `mcp/server.js` (stdio e HTTP) e `mcp/react.js` (gerar e revisar JSX), sem dependências.",
          "Arquivo único: `dist/mcp/castanha-mcp.js`, gerado no build com o núcleo do painel \"No React\".",
          "Teste: `node mcp/test.js` (também roda na CI) e `node mcp/test.js --server dist/mcp/castanha-mcp.js`.",
          "Servidor remoto (HTTP): `node mcp/server.js --http 8787`, ou `handleRequest` como handler `fetch` numa plataforma serverless."] }
      ] }
    ]
  };
})();
