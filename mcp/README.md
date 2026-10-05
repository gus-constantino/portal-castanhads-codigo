# MCP do Castanha DS

Servidor [MCP](https://modelcontextprotocol.io) que entrega o Castanha DS (design system da Caju) para assistentes de IA — Claude, Cursor, VS Code e outros. Em vez de adivinhar, a IA consulta componentes, docs, props do Figma e do castanha-react, tokens, ícones, ilustrações, diretrizes de conteúdo e divergências conhecidas.

Plano completo: [`docs/local/PLANO-MCP.md`](../docs/local/PLANO-MCP.md). Fase atual: **M2 (consulta + gerar e revisar JSX, local)**.

## Como funciona

- `scripts/mcp/build-catalog.js` junta todo o conteúdo do playground em `dist/mcp/catalog.json`. Roda junto com `node scripts/build-index.js`, então o catálogo nunca fica atrás do site; a CI reprova build desatualizado.
- `mcp/server.js` é um servidor MCP por **stdio**, **sem dependências** (Node 18+), que só lê o catálogo e responde. Só leitura: não altera nada.

## Conectar

Precisa do Node 18+ e de um clone deste repo (troque o caminho pelo seu).

**Claude Code**
```bash
claude mcp add castanha-ds -- node /caminho/para/castanhads-component-teste/mcp/server.js
```

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`) ou **Cursor** (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "castanha-ds": { "command": "node", "args": ["/caminho/para/castanhads-component-teste/mcp/server.js"] }
  }
}
```

**Sem clonar o repo** (lê o catálogo publicado no site; o `server.js` ainda precisa estar na máquina):
```bash
CASTANHA_CATALOG=https://gus-constantino.github.io/castanhads-component-teste/dist/mcp/catalog.json node mcp/server.js
```

## O que oferece

| Ferramenta | Para quê |
|---|---|
| `listar_componentes` | Componentes por categoria, status no Figma, par no React; e os que só existem no React |
| `componente` | Tudo de um componente: descrição, links, props no Figma, props do castanha-react (tipo, padrão), import, tradução Figma → React, divergências |
| `docs` | Texto de uma tab (uso, anatomia, estilos, acessibilidade, diretrizes, motion, conteúdo) ou de todas |
| `buscar` | Busca livre em componentes, docs, tokens, ícones e ilustrações |
| `tokens` | Valor claro/escuro e por viewport, nome `--castanha-*` no pacote ou "só no playground" |
| `icone` / `ilustracao` | Nome, categoria e uso no React (`<Icon name>`, `<Illustration name>`, import) |
| `diretrizes` | Conteúdo e escrita, motion, ilustração, patterns, treinamento |
| `divergencias` | Itens abertos no CONFERIR e no check Figma × castanha-react × playground |
| `gerar_jsx` | JSX do castanha-react a partir das props como estão no Figma (ex.: `Appearance: Inversed`, `Show Lead Icon: false`). Mesmo código do painel "No React" do playground, com import e hooks; avisa o que não tem tradução e o que falta preencher |
| `revisar_codigo` | Revisa um trecho JSX/TSX: componente inexistente ou sem import, prop inexistente (e o equivalente quando vem de outra lib, como `variant`), valor fora das opções, boolean recebendo texto, prop obrigatória faltando, ícone ou ilustração com nome errado, cor ou tamanho cru com o token certo para a propriedade CSS, padrão do React diferente do Figma |

Também tem os **resources** `castanha://componente/{id}` e `castanha://docs/{id}/{tab}`, e os **prompts** `implementar-tela`, `revisar-handoff` e `escrever-texto`.

## Testar

```bash
node mcp/test.js
```

O teste sobe o servidor, faz o handshake como um cliente MCP, chama cada ferramenta com perguntas reais e cruza as duas do M2: o JSX gerado de cada um dos 70 mapas tem que passar sem erro na revisão. A CI roda o mesmo teste em todo push. Com `--verbose`, mostra o começo de cada resposta.
