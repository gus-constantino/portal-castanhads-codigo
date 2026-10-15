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

**Senhas.** São códigos de 6 dígitos e ficam nas variáveis de ambiente do projeto no Vercel, uma por perfil (`ACESSO_COMPLETO`, `ACESSO_PORTAL`), mais um segredo para assinar cookies e links (`ACESSO_SEGREDO`). Trocar uma senha é trocar a variável: quem entrou com a antiga precisa entrar de novo.

**Tela de entrada.** Página `/entrar/` montada com o DS: um **Code Input de 6 dígitos** (`cds-code-input-otp`, Gustavo, 14/10), o Main Button "Entrar" e a mensagem de erro do próprio componente. Cada perfil tem o seu código numérico. O Code Input OTP do portal segue o Figma, onde ele ainda está numa branch (não está na main da lib). A senha certa grava um cookie assinado com o perfil e a validade (30 dias). No portal, um item "Sair" no menu apaga o cookie.

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
| 3 · Links de entrega | `/l/<código>`, `/acesso/links/` e o portal em modo entrega (`entregas/<slug>/`) | Abrir o link numa janela anônima: abre o portal só com os itens da entrega. Link vencido mostra a tela de entrada. |
| 3 · Ajuste (14/10) | O link abre direto no Playground do primeiro componente da entrega (ordem do `entrega.json`), e a Visão geral e o Handoff viram abas de cada componente, logo depois do Playground. A página inicial separada da entrega saiu. |
| 3 · Validade livre (14/10) | Links de entrega e de página aceitam de 1 a 90 dias. As telas sugerem 2, 7, 14 (padrão) e 30 dias e, em "Outro", mostram o [Beta] Quantity Input do DS para digitar o número. O middleware recusa valor fora da faixa ou quebrado. |
| 4 · Páginas de teste | Substituída pelo modo entrega (a página oficial já documenta a melhoria em branch) | — |
| 5 · Fechar | Repositório privado, Smoke ajustado à cota, endereço novo em todos os lugares, redirecionamento do endereço antigo | Rotinas rodando, MCP funcionando com o endereço novo, link antigo levando ao novo |
| 6 · Links de página | `acesso/paginas/`, alvos (`acesso/alvos.js`), registro no Upstash e revogação | Gerar um link de página, abrir numa janela anônima (só o alvo aparece), revogar na lista e recarregar: volta para a entrada. |
| 7 · Senhas temporárias | **Pronta em 15/10 (Dsenhas), na `teste`.** A tela `acesso/senhas/` (Relatório › Arquitetura, Completo de senha fixa) gera uma senha de 6 dígitos para Dashboard, Portal ou Completo, de 5 minutos a 90 dias (dias, horas e minutos). A senha aparece uma vez (o banco guarda o hash), a sessão vence junto com ela e a revogação derruba a sessão no próximo arquivo de conteúdo. Perfil novo **Dashboard**: o Relatório e nada mais. Depende do Upstash (`KV_REST_API_*`), já configurado. |

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

## Andamento

| Fase | Situação |
|---|---|
| 1 · Vercel | **Feita em 14/10.** Projeto `portal-castanhads` na conta Hobby do Gustavo (equipe "Caju", `caju4`), ligado ao GitHub com acesso a `gus-constantino/portal-castanhads` e nada mais. Preset Other, sem build, raiz `./`. Produção em https://portal-castanhads.vercel.app, aberta, com o Relatório, o pitch, o Roteiro e o catálogo do MCP conferidos. Ignored Build Step em "Only build production": push nas outras branches não gera deploy (limite de 100 deploys por dia no plano gratuito). O GitHub Pages segue no ar até a fase 5. |
| 2 · Entrada e perfis | **No ar desde 14/10.** `middleware.js` (Visitante, Completo, Portal e chave do MCP, cookie assinado de 30 dias), `entrar/` (Code Input OTP de 6 dígitos, Main Button, aviso em Warning), "Sair" no topo do portal e Relatório escondido no perfil Portal (`scripts/app.js`), pacote público `dist/cds-publico.*`, pitch com `docs/pitch/dados.json` e, para o Visitante, as imagens de `docs/pitch/capturas/`. Variáveis `ACESSO_*` criadas no Vercel e regra de limite de tentativas em `/acesso/entrar` (10 por minuto por IP). |
| 3 · Links de entrega | **Pronta em 14/10, no modo entrega.** A pessoa dev recebe um link `/l/<código>` e vê o portal de sempre só com as páginas da entrega: os componentes e os building blocks dela (Playground e docs completas) e uma página inicial com a visão geral e o handoff. Home, Treinamento, Padrões, Relatório e os outros componentes não aparecem, e qualquer outra rota volta para a entrega. Cada entrega é uma pasta em `entregas/<slug>/` com `entrega.json` (título, task, resumo e itens) e `handoff.md`. O build gera `entregas/<slug>/entrega.js`, a lista da tela `acesso/links/` e, dentro do `middleware.js`, as docs que cada entrega libera. **O que o servidor bloqueia:** as docs dos outros componentes, os recursos (quem entra pelo link recebe `dist/cds-entrega.js` no lugar do `dist/cds.js`), a busca no conteúdo, o catálogo do MCP e os dados do Relatório. **O que só fica escondido:** o código dos outros componentes, que vem no pacote. Primeiras entregas: Chips Small (CDS-1599), Main Button Loading (CDS-1603), Draggable List (CDS-1592), Code Input OTP (CDS-1608) e Credit Card Input (CDS-1607). Sem `handoff.md`, a página da entrega fica só com a Visão geral. Validade de 7, 14 ou 30 dias (padrão 14). Link vencido ou adulterado leva a `entrar/?link=vencido`. O perfil Completo vê como a pessoa dev vê em `/?entrega=<slug>`. Teste local com o middleware: `node scripts/dev/servidor-acesso.js` (códigos de teste). Teste do middleware com 73 verificações. |
| 4 · Páginas de teste | **Não é mais necessária.** O modo entrega mostra a página oficial do componente, que já documenta a melhoria em branch com o aviso da doc. |
| 5 · Fechar | **Feita em 14/10.** Endereço novo em todo o código (README, ARCHITECTURE, metadados do `index.html`, catálogo e servidor do MCP, página do MCP). O MCP manda a chave `CASTANHA_CHAVE` no cabeçalho `Authorization`, e a página do MCP explica como configurar. O Smoke roda em push na `main` e nas `rotina/**`, e na `teste` sob demanda (`gh workflow run smoke.yml --ref teste`). GitHub Pages desligado no repositório do código, que passa a se chamar `portal-castanhads-codigo` e fica **privado**. O nome `portal-castanhads` vai para um repositório **público** pequeno, com o Pages ligado, que leva cada link antigo ao mesmo caminho e à mesma rota no Vercel (`scripts/dev/redirecionamento/`, como `index.html` e `404.html`). Rotinas das 9h e 10h com o endereço novo. A proteção da `main` não existe em repositório privado na conta gratuita: o fluxo `teste` → Smoke verde → `main` continua por disciplina. |
| 6 · Links de página | **Feita em 14/10 (D341).** A tela `acesso/paginas/` (Relatório › Arquitetura, perfil Completo) gera um link `/l/<código>` para um **alvo**: um componente (com building blocks e templates), uma página, uma seção do menu ou uma categoria de componentes. O build gera os 171 alvos em `acesso/alvos.js` e, dentro do `middleware.js`, os arquivos que cada um libera (bloco `// <alvos>`). As seções do menu saíram do `app.js` para `scripts/menu-secoes.js`, que o build também lê. Quem abre o link recebe o pacote sem as páginas (`dist/cds-entrega.js`) e o portal carrega só os arquivos das páginas liberadas (`resources/<id>/<id>.js`); o menu mostra só o alvo, sem Início, Relatório nem links extras das seções. **Registro e revogação:** todo link novo (de página e de entrega) vai para o banco Upstash (hash `acesso:links`, com o próprio link para copiar de novo). A tela lista os ativos e revoga com confirmação (Modal do DS). O middleware confere o registro ao abrir o link e em cada arquivo de conteúdo; a página tira dos cookies o link revogado. Links de entrega gerados antes do registro valem até vencer. O link que inclui o Castanha Quiz (a página ou a seção Aprenda) também grava no ranking do time (D342); os outros links não chegam ao ranking. Teste do middleware com 94 verificações. |

## 9. Riscos

- **Plano gratuito do Vercel:** pelos termos, o Hobby é para uso pessoal e não comercial ([Fair Use](https://vercel.com/docs/limits/fair-use-guidelines)). Escolha consciente por enquanto. A troca para uma conta da Caju muda a conta, e o código continua o mesmo.
- **Cota do Actions:** coberta pelo ajuste da fase 5. Se apertar, o Smoke roda localmente antes de cada publicação, como já é feito.
- **Código de 6 dígitos:** tem 1 milhão de combinações. O middleware limita as tentativas (ex.: 5 erros seguidos por endereço de IP bloqueiam por 15 minutos), para o código não ser descoberto por tentativa e erro.
- **Segredo vazado:** trocar `ACESSO_SEGREDO` derruba todos os cookies e links de uma vez.
