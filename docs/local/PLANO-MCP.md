# Plano — MCP do Castanha DS (rascunho)

> Status: **planejamento** (05/10/2026). Execução depois, fase a fase, com as decisões da seção 6.
> Este arquivo é versionado de propósito, para o time ter acesso (o resto de `docs/local/` continua só local).

## 1. Ideia

Oferecer todo o conteúdo do playground como um servidor **MCP** (Model Context Protocol). Assim, um agente de IA (Claude, Cursor e outros) conectado a ele consulta e usa o Castanha DS direto, em vez de adivinhar nomes, props, tokens e regras:

- componentes e o que cada um faz;
- docs (uso, conteúdo, acessibilidade, motion);
- props do Figma e do castanha-react, com a tradução entre eles;
- tokens, ícones e ilustrações;
- divergências conhecidas.

## 2. O que já existe e dá para servir

Teste de 05/10: todo o conteúdo carrega fora do navegador (Node + `vm`, sem DOM).

| Fonte | O que tem | Tamanho |
|---|---|---|
| `components/*/*.playground.js` + `resources/*` | 111 registros: id, nome, categoria, link do Figma, recurso/building block | — |
| `components/*/*.docs.js` + recursos | 111 docs, 4.326 blocos (as 6 tabs de cada componente, Hub, Conteúdo, Patterns, Capacitações) | ~820 KB de texto |
| `integration/manifest.json` + `react-data.js` | Par Figma ↔ React, props e tipos do castanha-react, import, Storybook, zeroheight | 228 KB |
| `integration/prop-map/*.json` | 70 de 70 mapas Figma → React (gerar o JSX a partir das props do Figma) | 70 arquivos |
| `styles/tokens.css` | Tokens `--common-*` (claro e escuro), alias `--castanha-*`, text styles, Motion Styles, viewport | 48 KB |
| `scripts/assets-manifest.js` + `integration/assets-react.js` | Ícones e ilustrações com palavras-chave e o nome de import no pacote | 108 KB |
| `scripts/figma-status.js` | Status de publicação de cada componente na lib do Figma | — |
| `docs/CONFERIR.md` + `integration/SAUDE-STACK.md` | Divergências Figma × React × playground (check em três vértices) | 84 KB |
| `docs/zeroheight/*.md` | Textos prontos para o zeroheight | 452 KB |

## 3. Ferramentas propostas

| Ferramenta | Responde | Fonte |
|---|---|---|
| `listar_componentes` | Que componentes existem, por categoria e status no Figma | registros + `figma-status.js` |
| `componente` | Tudo de um componente: link do Figma, props do Figma, props do React (tipo e padrão), import, Storybook, zeroheight | manifesto + `react-data.js` |
| `docs` | Texto de uma tab (ou de todas) de um componente ou recurso | `*.docs.js` |
| `buscar` | Busca livre em nomes, docs, tokens e assets ("qual componente para filtros?") | catálogo inteiro |
| `gerar_jsx` | JSX correto do castanha-react a partir das props do Figma (ex.: Appearance=Inversed → `appearance="inverted"`) | prop-maps + lógica do `scripts/react-kit.js` |
| `tokens` | Token por nome ou uso, com valor claro/escuro, nome `--castanha-*` e se existe no pacote | `tokens.css` + check do R3 |
| `icone` / `ilustracao` | Busca por palavra-chave; nome no Figma, nome e import no pacote | assets + R4 |
| `diretrizes` | Escrita (Conteúdo), motion, ilustração, patterns | recursos do Hub |
| `divergencias` | O que está diferente entre Figma, React e playground, por componente ou geral | CONFERIR + SAUDE-STACK |
| `revisar_codigo` (fase 2) | Recebe JSX e aponta prop inexistente, valor fora do enum, padrão diferente do Figma, token cru | tipos do React + mapas + tokens |

Também entrariam:
- **Resources:** `castanha://componente/<id>`, `castanha://docs/<id>/<tab>`, `castanha://tokens`.
- **Prompts prontos:** "implementar tela com o Castanha DS", "revisar handoff de um componente", "escrever texto de interface seguindo o Conteúdo".

## 4. Arquitetura

1. **Catálogo gerado.** Um script novo (ex.: `scripts/mcp/build-catalog.js`) junta tudo num `catalog.json` e entra no build atual (`build-index.js`). É a mesma ideia do manifesto do R0, então o MCP nunca fica atrás do playground. A rotina diária (Parte 2) já mantém os dados do React em dia.
2. **Servidor fino.** Um MCP em Node (SDK oficial `@modelcontextprotocol/sdk`) que só lê o catálogo e responde. A lógica do JSX ao vivo é extraída do `react-kit` para um módulo usado pelo playground e pelo MCP, sem duas cópias.
3. **Distribuição**, em dois níveis:
   - **Local (stdio):** roda a partir do clone do repo, configurado no Claude Code ou Desktop com uma linha (`node mcp/server.js`). Sem servidor; serve para quem clona o repo.
   - **Remoto (HTTP):** qualquer pessoa adiciona por URL. O GitHub Pages é só estático, então precisa de um host pequeno (ex.: Cloudflare Workers ou Vercel) lendo o `catalog.json` publicado no Pages. Sem segredo e sem banco: o catálogo é público como o site.

## 5. Fases

| Fase | Entrega | Validação |
|---|---|---|
| **M0** | `catalog.json` gerado no build, com teste que confere que tudo foi lido (111 registros, 70 mapas…) | CI do Smoke reprova catálogo desatualizado, como já faz com o build |
| **M1** | MCP local só de consulta: `listar_componentes`, `componente`, `docs`, `buscar`, `tokens`, `icone`/`ilustracao`, `diretrizes`, `divergencias` | Conectar no Claude Code e responder perguntas reais ("como uso o Tag em erro?") |
| **M2** | `gerar_jsx` (reaproveitando o `react-kit`) e `revisar_codigo` | Os 70 mapas geram o mesmo JSX que o painel "No React" do playground |
| **M3** | Versão remota + página "Como conectar" no Hub (Claude, Cursor, VS Code) | Conectar por URL num computador sem o repo |

## 6. Decisões em aberto

1. **Para quem é:** só o time e os agentes dele (local basta), o time da Caju (remoto, talvez com acesso restrito) ou público?
2. **Escopo inicial:** só consulta (M1), ou já com gerar e revisar JSX (M2)?
3. **Onde mora:** neste repo, como mais uma saída do playground, ou como proposta para o monorepo oficial (`caju-beneficios/castanha`)?

## 7. Cuidados

- **Repo público.** O catálogo publica docs e metadados do castanha-react. Isso segue a decisão da integração (nomes, props e links sim, código-fonte não), mas um MCP aberto dá mais alcance a esse conteúdo.
- **MCPs que já existem.** zeroheight (docs publicadas) e Figma com Code Connect. O nosso complementa (ponte Figma ↔ React, tokens, divergências, checks), sem repetir o que eles já dão.
- **Time do castanha.** Alinhar antes de publicar (talvez no `castanha-ai`, ainda não clonado), para não haver dois MCPs "oficiais" concorrentes.
- **Política da Caju.** Uma versão remota usada pelo time pode precisar de aprovação de segurança.
- **Conteúdo que muda.** Docs marcadas como rascunho e itens provisórios devem aparecer como tal nas respostas (status no catálogo), para o agente não tratar como regra final.
