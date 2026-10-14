# Plano · acesso por senha ao portal

> Plano, sem implementação. Decisões do Gustavo em 14/10/2026. Nada aqui guarda senha ou segredo: os valores ficam nas variáveis de ambiente do Vercel.

## 1. Decisões

| # | Decisão |
|---|---|
| 1 | Publicar pelo **Vercel**, na conta do Gustavo, no plano **gratuito** (Hobby) por enquanto. |
| 2 | Repositório **privado** no dia a dia. De vez em quando ele fica público para atualizações e testes locais, e tudo precisa continuar funcionando nos dois estados. |
| 3 | Quem não tem senha vê **o pitch**. |
| 4 | **Uma senha por perfil** agora. Senha por pessoa fica para depois e o desenho já deixa espaço para ela. |
| 5 | **Link que abre uma página**: a pessoa dev recebe um link e ele funciona para aquela página e nada mais, sem senha. Isso vale também para **páginas de teste** de um componente que ainda não está pronto, sem mexer na página oficial do portal. |
| 6 | O primeiro link de página é o **handoff do Chips Small** (hoje em `docs/local/handoffs`). |

## 2. Perfis

| Perfil | Como entra | O que vê |
|---|---|---|
| Visitante | sem senha | O pitch (`/docs/pitch/`) e a tela de entrada |
| Completo | senha | Tudo, inclusive a página que gera links |
| Portal | senha | Tudo, menos o Relatório e os dados dele |
| Página | link | O caminho do link (ex.: `/teste/draggable-list/` ou `/handoff/chips-small/`) e os arquivos de que ele precisa |

O antigo perfil "apenas pitch" vira o Visitante: o pitch é aberto a quem tiver o endereço.

## 3. Como funciona

**Middleware do Vercel.** Um arquivo `middleware.js` na raiz roda antes de cada arquivo ser entregue ([Routing Middleware](https://vercel.com/docs/routing-middleware), disponível no plano gratuito). Ele lê o cookie de acesso e decide: entrega o arquivo, manda para a tela de entrada ou responde "sem acesso". Como a checagem acontece no servidor, ninguém abre um arquivo bloqueado pelo endereço direto.

**Senhas.** Ficam nas variáveis de ambiente do projeto no Vercel, uma por perfil (`ACESSO_COMPLETO`, `ACESSO_PORTAL`), mais um segredo para assinar cookies e links (`ACESSO_SEGREDO`). Trocar uma senha é trocar a variável: quem entrou com a antiga precisa entrar de novo.

**Tela de entrada.** Página `/entrar/` montada com o DS (Text Input de senha, Main Button, Feedback de erro). A senha certa grava um cookie assinado com o perfil e a validade (30 dias). No portal, um item "Sair" no menu apaga o cookie.

**Links de página.** Formato `/l/<código>`. O código traz o caminho liberado e a data de validade, assinados com `ACESSO_SEGREDO`. Ao abrir o link, o middleware confere a assinatura, grava o acesso daquele caminho no cookie e leva a pessoa até a página. Quem recebe vários links acumula os caminhos. Para invalidar todos os links, troca-se o segredo.

**Gerar links.** Página `/acesso/links/`, visível para o perfil Completo: escolhe o caminho e a validade (7, 14 ou 30 dias) e copia o link. A assinatura acontece no servidor, então o segredo nunca sai do Vercel.

**Páginas de teste e de handoff.** O que o portal mostra com `#/` no endereço (ex.: `#/main-button`) não chega ao servidor, então o middleware não consegue liberar uma tela dessas isoladamente. Por isso, o que for compartilhado por link vira **página própria**, com caminho de verdade:
- `/teste/<componente>/`: componente em desenvolvimento, com o playground e a doc rascunho. Não entra no menu, na busca nem nas miniaturas, e a página oficial do portal não muda até a entrega.
- `/handoff/<componente>/`: o handoff para dev, montado a partir do modelo do Chips Small.

As duas usam o mesmo kit do portal (`dist/cds.js`, tokens, `playground-kit.js`), como o pitch e o Roteiro já fazem.

**Menu por perfil.** O portal lê o perfil num cookie sem segredo, criado junto com o de acesso, e esconde o que o perfil não abre: o Relatório para o perfil Portal, por exemplo. Esconder no menu é conforto. A proteção é a do middleware.

## 4. Pitch para quem não tem senha

O pitch depende de duas coisas que ficariam bloqueadas:
- **Números ao vivo** ("Como foi feito"): hoje ele lê `docs/ROADMAP.md` e `docs/SAUDE-TECNICA.md`. O build passa a gerar `docs/pitch/dados.json`, com os números e nada mais, e esse arquivo fica aberto.
- **Portal ao vivo ao lado** ("O que faz"): é um iframe com o portal. Para o Visitante, o lugar do portal ao vivo mostra uma **imagem de cada capacidade**, gerada pelo smoke no Chrome headless, e o link "Entrar para ver ao vivo" (decidido em 14/10). Quem tem senha continua vendo o portal ao vivo.

Os arquivos que o pitch carrega (estilos, `dist/cds.js`, fontes, ilustrações) ficam abertos. Eles não trazem conteúdo de docs.

## 5. MCP

O MCP baixa do site o catálogo (`dist/mcp/catalog.json`) e o núcleo de código (`scripts/react-kit.js`, `scripts/flutter-kit.js`). O catálogo traz o texto das docs e as divergências do Conferir. Decidido em 14/10: **chave do MCP**. O middleware aceita uma chave no cabeçalho (`Authorization`), guardada na variável `ACESSO_MCP` do Vercel e configurada uma vez no MCP de cada pessoa (`CASTANHA_CHAVE`). Sem a chave, esses arquivos ficam fechados.

Em qualquer caso, o endereço do site muda dentro do MCP (`mcp/server.js`, `scripts/mcp/build-catalog.js`) e na página do MCP no portal.

## 6. O que muda ao fechar o repositório

| Item | O que acontece | Plano |
|---|---|---|
| GitHub Pages | A conta gratuita não publica repositório privado | O Vercel publica a cada push na `main`. O Pages fica desligado de vez, para o estado público ou privado do repositório não mudar nada. |
| Proteção da `main` | A conta gratuita não protege branch de repositório privado | O fluxo `teste` → Smoke verde → `main` continua por disciplina, e o Vercel publica a `main`. |
| Cota do GitHub Actions | Repositório privado tem cerca de 2.000 minutos grátis por mês. Cada Smoke leva cerca de 2 minutos, e houve 54 runs em 09/10 e 48 em 10/10. Nesse ritmo, a cota acaba em menos de 3 semanas. | Rodar o Smoke em push na `main` e nas branches `rotina/**`, e na `teste` sob demanda (`workflow_dispatch`). O smoke local antes de cada push continua. |
| Endereço do site | Sai `gus-constantino.github.io/portal-castanhads`, entra o do Vercel (ex.: `portal-castanhads.vercel.app`) | Trocar no README, ARCHITECTURE, pitch, página e servidor do MCP, Roteiro e rotinas. |
| Links antigos (Jira, Slack, Notion, handoffs) | Param de abrir | **Redirecionar** (decidido em 14/10): renomear o repositório do código (ex.: `portal-castanhads-codigo`) e criar um `portal-castanhads` público, com uma página que leva ao endereço novo mantendo o caminho e o `#/rota` do link. O GitHub Pages fica ligado nesse repositório pequeno. |
| Rotinas das 9h e 10h | Fazem push na `main` como hoje | Trocar os links do resumo pelo endereço novo. |
| Repositório público de vez em quando | O código fica visível enquanto estiver público. O site continua no Vercel com senha. | Nada a fazer. |

## 7. Fases

| Fase | Entrega | Como conferir |
|---|---|---|
| 1 · Vercel | Projeto no Vercel ligado ao repositório, sem build (o site já sai pronto do `build-index`), publicando a `main` | O portal abre igual no endereço novo, com todas as rotas, o pitch e o Roteiro |
| 2 · Entrada e perfis | `middleware.js`, `/entrar/`, os perfis Completo e Portal, "Sair" no menu e o pitch aberto com `dados.json` | Entrar com cada senha, abrir arquivo bloqueado pelo endereço direto (precisa dar "sem acesso") e abrir o pitch sem senha |
| 3 · Links de página | `/l/<código>`, `/acesso/links/` e a primeira página própria, `/handoff/chips-small/` | Abrir o link numa janela anônima: abre o handoff e nada mais. Link vencido mostra a tela de entrada. |
| 4 · Páginas de teste | Modelo de `/teste/<componente>/` e o primeiro uso (ex.: Draggable List, CDS-1592) | A página oficial do componente segue igual e a de teste abre pelo link |
| 5 · Fechar | Repositório privado, Smoke ajustado à cota, endereço novo em todos os lugares, redirecionamento do endereço antigo | Rotinas rodando, MCP funcionando com o endereço novo, link antigo levando ao novo |

Ordem pensada para que o portal nunca saia do ar: o Vercel entra no ar antes de o Pages ser desligado.

## 8. Decisões de 14/10 (antes em aberto)

| # | Pergunta | Decisão |
|---|---|---|
| 1 | Pitch para o Visitante | Imagens de cada capacidade com "Entrar para ver ao vivo" |
| 2 | MCP | Chave no cabeçalho (`ACESSO_MCP`) |
| 3 | Endereço antigo | Redirecionar para o novo, mantendo o caminho e a rota |
| 4 | Domínio | `.vercel.app` por enquanto |
| 5 | Validade padrão dos links de página | 14 dias |

## Como a configuração do Vercel é feita

Não há conector do Vercel nesta sessão. A configuração do painel (projeto, ligação com o GitHub, variáveis de ambiente, domínio) é feita no navegador do Gustavo, pelo Claude in Chrome, com a sessão dele.
- **Valores das variáveis `ACESSO_*`:** quem digita é o Gustavo. O Claude deixa a tela pronta (nome da variável, ambiente) e não digita senha, segredo ou chave.
- **Permissões:** instalar o app do Vercel no GitHub ou dar acesso ao repositório depende do ok do Gustavo na conversa.
- **Login:** se o Vercel pedir login, quem entra é o Gustavo.

## 9. Riscos

- **Plano gratuito do Vercel:** pelos termos, o Hobby é para uso pessoal e não comercial ([Fair Use](https://vercel.com/docs/limits/fair-use-guidelines)). Escolha consciente por enquanto. A troca para uma conta da Caju muda a conta, e o código continua o mesmo.
- **Cota do Actions:** coberta pelo ajuste da fase 5. Se apertar, o Smoke roda localmente antes de cada publicação, como já é feito.
- **Segredo vazado:** trocar `ACESSO_SEGREDO` derruba todos os cookies e links de uma vez.
