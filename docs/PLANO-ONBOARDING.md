# Plano — onboarding do portal Castanha DS

> Documento vivo, de planejamento. Nada daqui foi implementado.
> Criado em 09/10/2026 a partir de um levantamento do portal inteiro (shell, recursos, docs-kit, composições, locais, Conteúdo, Relatório, roteiro e pitch) na `teste` em `e6c040d`, do Castanha Hub (Onboarding, Primeiro uso, Comunicando Novidades), da lib estável no Figma e de referências de mercado (§14).
> Skills usadas: UX copy (§11), acessibilidade (§12), design system e protocolo Juntos (§13), modern-web-guidance (§12 e §14.4), pesquisa com usuário (§15).
> **Público:** pessoas novas no portal.
> Regras que valem para tudo daqui: Castanha DS em toda peça, como no Figma, nada feito à mão (sem componente → decidir junto) · guia de Conteúdo do portal · ilustração da [Caju] Illustrations ou nenhuma · tokens em todo valor visual · Motion Style `/01`.

**Partes**

1. Onboarding do portal (este plano, §2 a §6)
2. Onboarding dos Relatórios, a parte 2 (§7)
3. Aprendizados do levantamento (§8)
4. Backlog de fixes e oportunidades (§9)
5. Decisões que esperam o Gustavo (§10)
6. Copy proposta (§11), revisão de acessibilidade (§12), proposta para a lib (§13), referências de mercado (§14) e plano de pesquisa (§15)

---

## 1. Ponto de partida

### O que já existe com cara de onboarding

| Peça | Onde | O que faz hoje | Uso no onboarding |
|---|---|---|---|
| Comece por aqui | Início (`resources/inicio/inicio.js:20-26`) | 3 atalhos por perfil: Designers → Treinamento, Dev. Flutter e Dev. React → sites externos | Vira a entrada das trilhas por perfil |
| Aprenda o Castanha DS | Início (`inicio.js:28-33`) | Banners para Awtra, Capacitações e Treinamento | Destino de passos da trilha |
| Treinamento | `#/treinamento` | Como usar as documentações, Organizar o Figma, Protótipos (com quiz) | Trilha Design |
| Capacitações | `#/capacitacoes` | 67 vídeos em 7 trilhas, com login Caju | Trilha Design e Conteúdo |
| Castanha Quiz | `#/castanha-quiz` | 6 temas, jogo com XP e ranking. Já tem o quebra-cabeça "Monte o onboarding" | Passo final das trilhas (aprender jogando) |
| Roteiro | `docs/roteiro/` (escondido) | "20 coisas para abrir, clicar e mexer", feito para quem chega pela primeira vez | Vira a trilha Explorar dentro do serviço |
| Conteúdo › Contextos | `resources/conteudo/conteudo.js:979-1082` | Regras de onboarding e de tour guiado, com os 8 botões padronizados | Contrato de texto do serviço |

### O que não existe

- **Quem é a pessoa:** o portal não guarda usuário, perfil, progresso nem primeira visita. O progresso existe dentro do Castanha Quiz, no `localStorage`.
- **Peça de tour no DS:** não há Coachmark, Spotlight nem Stepper. Popover e Tooltip abrem em cima ou embaixo, nunca ao lado, e o Tooltip não aceita ação.
- **Persona de quem usa o portal:** as 25 personas são usuárias dos produtos Caju. PM e conteudista não aparecem como público em lugar nenhum.
- **Regra de tamanho do tour:** o guia de Conteúdo não fixa número máximo de passos nem limite de caracteres por passo.

---

## 2. Objetivo e público

**Escopo:** onboarding para **pessoas novas no portal**, na primeira visita e nos primeiros dias. Quem já usa o portal fica de fora (aviso de novidades é oportunidade O8, não este plano).

**Qual regra do guia se aplica:** o caso é o **Primeiro uso (tour guiado)** do guia de Conteúdo, "orientar como completar uma tarefa pela primeira vez" (`conteudo.js:1046-1052`), com a premissa 1 (Receber) e a 6 (Todo onboarding é uma conversa). O contexto "Onboarding" do guia trata de comunicar novidades e vale aqui nos botões e no Me lembrar mais tarde.

**Objetivo:** quem chega ao portal entende em poucos minutos onde está cada coisa e qual é o primeiro caminho para o seu papel, sem sentir que fez um tutorial (premissa 6 do Tom e voz).

**Critério de sucesso** (métricas do guia, `conteudo.js:1016`): taxa de abandono por passo e tempo gasto. Medição local na fase 1, remota quando houver backend (§5.6).

**Perfis** (decidido em 09/10, Q5: os 5):

| Perfil | Primeiro caminho | Destinos que já existem |
|---|---|---|
| Design | Usar a lib no Figma | Treinamento, Organizar o Figma, Protótipos, Componentes, Quiz › Componentes |
| Dev. React | Do token ao código | Desenvolvimento › React (Instalação, Preparando o ambiente, Usando os pacotes, guias, Design tokens), Camadas, MCP |
| Dev. Flutter | Do token ao código | Desenvolvimento › Flutter (Instalação, Preparando o ambiente, Usando os componentes), Camadas |
| Conteúdo | Escrever com a voz da Caju | Tom e voz, Contextos, Vocabulário, Capacitações › Content, Quiz › Conteúdo |
| Produto | Decidir com o DS | Princípios de Design, Personas, Patterns, Relatório › Visão geral |

---

## 3. Experiência proposta (parte 1)

Segue o roteiro **Receber → Contextualizar → Explicar → Encerrar** (`conteudo.js:95-98`) e o tom **tranquilizador + encorajador, com o encorajador à frente** (`conteudo.js:1004`).

### 3.1 Receber: boas-vindas

- **Papel:** porta de entrada, não peça central. O centro do onboarding é a tab **Primeiros passos do Início** (§3.3, decisão de 09/10). Nenhum portal de DS de referência usa modal ou tour como centro (§14.3).
- **Quando:** primeira visita a qualquer rota (também fora do Início), depois que a página terminou de montar. Abre uma vez e nunca junto com outro passo ou aviso.
- **Peça:** Modal (padrão do shell, `app.js:211-224`) no desktop. No celular, Bottom Sheet, porque o Bottom Sheet é de mobile (`bottom-sheet.docs.js:28`). Decisão Q4.
- **Conteúdo:** ilustração oficial (candidatas no §5.7), título de 1 linha, uma frase de valor e a escolha de perfil (Radio Button Group ou Selection List do DS).
- **Transparência** (premissa 8): o texto diz quantas etapas são e quanto tempo leva.
- **Botões:** Começar (abre o tour, que é por escolha) · Me lembrar mais tarde. Não mostrar novamente fica como ação terciária (Link ou Main Button Ghost, decisão Q9).
- **Perfil opcional:** quem não escolhe perfil segue com o checklist geral.

### 3.2 Contextualizar e explicar: tour do shell

Desktop (largura ≥ 1100, onde o menu é lateral). No celular e no tablet, o menu vira tela cheia ou faixa, o Nav Control não aparece no tablet (C46) e o Popover perde a âncora. Ali o onboarding pula direto para o checklist (§3.3).

Proposta de **3 passos** (Q8). Os benchmarks mostram 66% de conclusão em 3 passos e cerca de 22% em 5, e Atlassian e Fluent limitam a 3 (§14.1 e §14.2). O tour abre por escolha (decidido em 09/10), no Começar da boas-vindas ou na tab Primeiros passos do Início: aberto por escolha, conclui cerca de 2 vezes mais que o automático.

| # | Âncora | Mensagem (direção, não copy final) |
|---|---|---|
| 1 | Menu lateral | Resume o valor: tudo do DS num lugar, em seções que abrem e fecham (Desenvolvimento, Padrões, Componentes, Templates, Aprenda, Ferramentas, Ajuda; D306). A 1ª tooltip resume o valor porque os cliques caem a partir dela (`conteudo.js:1056`) |
| 2 | Busca | Busca no nome e dentro das docs, com `/` ou ⌘K |
| 3 | Ajuda | FAQ, Abrir chamado e o caminho de volta para os Primeiros passos do Início |

O que saiu do tour vira item do checklist, aprendido fazendo: Playground (item "Testar um componente", marcado quando a pessoa mexe numa prop), tema e Relatório.

- **Peça:** Popover do DS ancorado, em `popover="manual"`, sem escurecer a tela, porque não existe Spotlight no DS (Q2, decidido em 09/10).
- **Indicador de etapas:** texto "Etapa X de 3" no título do passo (Q3). A Progress Line é de carregamento e não serve para leitura (regra de 06/10).
- **Botões:** Continuar · Voltar a partir do 2º passo · Concluir no último · Me lembrar mais tarde, que sai do último passo. Os rótulos seguem o guia da Caju, não os de mercado (Next, Finish, Skip tour).
- **Âncora ausente:** o passo é pulado e o evento vai para as métricas. Seletor que não acha o alvo é a causa nº 1 de tour quebrado no mercado (§14.4).

### 3.3 Encerrar: Primeiros passos no Início

- **Celebração** curta (premissa 9) com ilustração oficial e sucesso na voz passiva, sem "com sucesso", sem "!" no título e sem "Entendi".
- **Tab "Primeiros passos" no Início** (decidido em 09/10, no lugar de uma página Comece aqui nova: o nome Comece aqui já é da página de desenvolvimento, D305). Cards por perfil, como o Get started da Atlassian (Design, Develop, Content design), e o checklist do perfil escolhido. Evolui o "Comece por aqui" da tab Castanha Hub. Não mostrar novamente esconde os convites, nunca esta tab.
- **Checklist "Primeiros passos"** na tab:
  - até 5 itens por perfil, **em qualquer ordem** (padrão de lista de tarefas do GOV.UK e do Polaris);
  - o 1º item já vem concluído ("Escolher o seu foco"), porque progresso inicial aumenta a conclusão (Nunes e Drèze, 2006);
  - status em texto ("2 de 5 concluídos") e por item;
  - cada item se marca pela **ação real** (mexer numa prop, abrir o Figma, terminar um quiz), não por clique em "Feito".
- **Peça do checklist (Q12, decidido em 09/10):** Content List Item com link e Tag de status (Concluído ou Pendente) por tarefa, mais a contagem "2 de 5 concluídos" em texto. O Progress Tracker ficou de fora porque comunica sequência.
- O último item de toda trilha é o Castanha Quiz do tema, para fechar aprendendo.

### 3.4 Primeiros dias

- **Rever o tour:** item na Ajuda (FAQ) e no Modal de atalhos (`?`).
- **Explorar:** o Roteiro deixa de ser página escondida e vira trilha opcional do serviço, com as 20 paradas marcadas como feitas.
- **Retomar:** quem escolheu Me lembrar mais tarde recebe o convite de novo na visita seguinte, no máximo 2 vezes. Depois disso ficam os Primeiros passos do Início, porque cerca de 3% voltam a um tour adiado (§14.1). O ponto de reentrada fixo vale mais que o adiamento.

---

## 4. Regras de conteúdo do onboarding

Fontes: Conteúdo › Tom e voz, Formatação, Limites, Contextos (Onboarding e Tour guiado). Onde houver conflito com os princípios do castanha-ai (§13.1 da skill Juntos), a copy de interface segue o guia de Conteúdo (Q1).

| Regra | Fonte |
|---|---|
| Botões dentro dos 8 padronizados: Começar (na 1ª tela), Continuar (nunca na última), Voltar, Fechar (tour de 1 etapa), Concluir (mais de 1 etapa), Quero saber mais, Me lembrar mais tarde, Não mostrar novamente | `conteudo.js:1073-1082` |
| Nunca Pular, Agora não, Ver depois, Ignorar, Entendi, Avançar, Próximo, Finalizar | `conteudo.js:1073-1082`, `:904` |
| Título em 1 linha, sem ponto, sem "!", sem dois-pontos | `conteudo.js:793`, `:541-567` |
| Descrição com ponto, no máximo 1 "!" por tela, 3 vírgulas por frase, 1 lista por tela | `conteudo.js:541-572`, `:842-848` |
| Sem emoji, negrito ou cor no onboarding | `conteudo.js:998-999` |
| Valor antes do funcionamento, o que importa naquele momento, regra de negócio vai para a FAQ | `conteudo.js:992-1001` |
| Sem "funcionalidade", "feature", "desenvolvimento" | `conteudo.js:997` |
| Sem "Ver"/"visualizar" (→ Conhecer, Acessar {área}, Abrir) | `conteudo.js:477-481`, C167, C192 |
| "Agora" como escolha livre ("agora ou depois") | `conteudo.js:496` |
| Sem "Ei", "Ops", "Hmm", "Beleza?", gírias | premissa 3, `conteudo.js:482-490` |
| Botão até 3 palavras, no infinitivo (exceções do guia) | `conteudo.js:778`, `:182-186` |
| "Vamos", "a gente", "estamos" (fazer juntos) | premissa 2 |
| Dizer quantas etapas e quanto tempo | premissa 8 |
| Termos do portal como estão no menu (Padrões, Aprenda, Ferramentas, Ajuda) | `app.js:227-234` |

Limites que o guia não fixa e este plano propõe (Q8): até 3 passos no tour, título até 30 caracteres e título + descrição até 110 por passo (os limites do In-app, `conteudo.js:826-830`).

Essas regras viram **lint automático** do serviço (§5.5), para a copy não sair do guia com o tempo.

---

## 5. Arquitetura: o onboarding como serviço

### 5.1 Conceito novo: Serviço

Hoje o portal tem seis tipos de peça (`resources/locais/locais.js:18-25`): componente do DS, building block, template, team component, componente local e composição. Nenhum deles é **comportamento transversal** que acompanha a pessoa entre rotas e guarda estado. Proposta de um 7º tipo:

> **Serviço:** lógica e estado que atravessam o portal, sem UI própria. Compõe componentes do DS, expõe uma API em `CDS.<nome>`, guarda dados em arquivos de fluxo (dados, não código) e liga ou desliga sem afetar o resto.

Contrato proposto (entra em `ARCHITECTURE.md` §3 como item 13):

1. Pasta `services/<id>/`, carregada depois de `local/` e antes de `resources/` no `dist/cds.js` (`build-index.js:66-78`).
2. Não chama `CDS.register` para aparecer no menu. A doc do serviço é página escondida (`hidden: true`), como `#/locais`.
3. Usa componentes do DS e tokens. Peça que faltar vira gap no CONFERIR e decisão junto, nunca feita à mão.
4. Nenhuma API de navegador no topo do arquivo (armadilha do catálogo do MCP e da busca, que rodam em Node e perdem a página em silêncio).
5. Fala com o shell por eventos, nunca mexendo no DOM do shell por seletor de classe.
6. Desliga com `?onboarding=off` e fica desligado no smoke de componentes, para não cobrir o que está sendo medido.

### 5.2 Estrutura de arquivos

```
services/onboarding/
  onboarding.js          motor: CDS.onboarding (registrar, iniciar, continuar, voltar, lembrar, dispensar, estado)
  onboarding.css         camada e posição, com tokens
  store.js               adaptador de estado (local agora, remoto depois)
  metrics.js             adaptador de métricas (contadores locais agora)
  lint.js                regras de conteúdo do §4, roda no build e no CI
  flows/
    boas-vindas.flow.js  Receber + perfil
    portal.flow.js       tour do shell (desktop)
    primeiros-passos.flow.js  checklist por perfil
    explorar.flow.js     o antigo Roteiro
    relatorio.flow.js    parte 2
  onboarding.docs.js     página escondida #/onboarding: como o serviço funciona, fluxos, estado, reiniciar
```

### 5.3 Fluxo como dado

```js
CDS.onboarding.register({
  id: "portal",
  version: 1,                       // subir a versão quando o tour mudar de conteúdo
  audience: ["design", "dev-react", "dev-flutter", "conteudo", "produto"],
  when: { first: true, minWidth: 1100 },
  steps: [
    { anchor: "menu", title: "…", text: "…" },
    { anchor: "busca", title: "…", text: "…", more: "#/faq",
      showIf: (ctx) => ctx.width >= 1100,     // pula o passo quando a condição falha
      advanceOn: "cds-search-open" },         // avança quando a pessoa faz a ação
  ],
  onMissingAnchor: "skip",                  // âncora ausente: pula e registra
});
```

- **Botões não são texto livre:** o motor escolhe a label pelo papel do passo (primeiro, meio, último, único), com os 8 rótulos do guia. A copy dos botões não tem como sair do padrão.
- **Inspirado em Shepherd.js e Driver.js** (sem adotar dependência): passo como dado, condição para mostrar, avanço pela ação da pessoa, eventos `start`, `show`, `hide`, `complete` e `cancel` para as métricas.
- **Âncoras estáveis:** `data-onb="menu"`, `data-onb="busca"` etc. no `index.html` e no `app.js`, em vez de seletor de classe. Mudar o visual do shell não quebra o tour.
- **Ilustração por nome do catálogo** (`objetos/kit-onboarding`), resolvida por `CDS.illustration()`. O lint reprova nome que não está no `catalog.json`.

### 5.4 Integração com o shell

| Gancho | Hoje | Proposta |
|---|---|---|
| Troca de rota | `showRoute` interno (`app.js:691-716`) | O shell dispara `cds-route` com `{id, tab}` depois de montar. O serviço escuta para iniciar fluxos e marcar itens do checklist |
| Âncoras | Classes e ids do shell | Atributos `data-onb` |
| Entrada manual | Não existe | `?tour=<id>` na URL, item na FAQ e no Modal de atalhos |
| Checklist no Início | `inicio.js` estático | Bloco novo `onboarding` no docs-kit, que o Início usa e o MCP e a busca sabem ler |

### 5.5 Qualidade

- **Lint de conteúdo** (`lint.js`) no `build-index` e no CI, como o `numerar.js --check`: botões, limites, palavras proibidas, pontuação do título, ilustração no catálogo.
- **Smoke dos fluxos:** extensão do `tests/smoke-docs.js`. Para cada passo, abre a rota e confere que a âncora existe e está visível em 1366. Reprova âncora quebrada.
- **A11y:** foco vai para o passo aberto, Esc equivale a Me lembrar mais tarde (Q9), contagem de etapas lida pelo leitor de tela, respeito a `prefers-reduced-motion`, nada que dependa de hover.
- **Auditoria:** `audit-ui.js` passa a ler `services/` (hoje ignora `resources/`, `compositions/` e `local/`, item B11).

### 5.6 Estado e privacidade

Estado por fluxo, em `localStorage` com prefixo `cds-onb:` e o padrão `try/catch` do portal:

```js
{ status: "novo" | "em-andamento" | "lembrar" | "concluido" | "dispensado",
  step: 2, version: 1, profile: "design", remindAt: "2026-10-10", done: ["treinamento", "busca"] }
```

- **Me lembrar mais tarde:** o fluxo volta na próxima visita depois de `remindAt` (prazo a decidir, Q10) até ser concluído (`conteudo.js:1080`).
- **Não mostrar novamente:** `dispensado`, volta pelo Rever o tour.
- **Adaptador remoto** com a mesma interface do `lesson.remote = {top, add}` do Quiz (`lesson.js:30-31`). Sem dado pessoal no repositório nem na URL. O backend de verdade é o mesmo pedido do ranking (ambiente Caju com autenticação), e a gamificação (`docs/local/IDEIA-GAMIFICACAO.md`) passa a ter onde guardar progresso.
- **Métricas:** contadores locais por passo (iniciou, concluiu, abandonou no passo N, tempo). Mostrados na página escondida `#/onboarding`. **Limite:** `localStorage` não chega ao time, então sem backend não existe taxa de abandono agregada. Até lá, a medição de verdade é o teste de usabilidade (§15). Com backend, medir também a **ativação por perfil** (dev abriu o Storybook, designer abriu a lib no Figma, conteudista consultou Tom e voz) e o tempo até ela (Q6).

### 5.7 Peças do DS por momento

| Momento | Peça | Observação |
|---|---|---|
| Boas-vindas desktop | Modal | `text-title`, `primary-label`, `secondary-label`, padrão Dialog |
| Boas-vindas celular | Bottom Sheet | Ilustração Md 144 (`caju-theme.js:299`) |
| Escolha de perfil | Radio Button Group ou Selection List | — |
| Passo do tour | Popover ancorado | Top e bottom, sem lados (B15) |
| Contagem de etapas | Q3 | Progress Line não, porque é de carregamento |
| Checklist | Content List + Tag de status, contagem em texto (Q12) | Progress Tracker se o time quiser ordem |
| Celebração | Modal ou Confirmation Message | Ilustração Lg 200 no Sponsor (`caju-theme.js:317`) |
| Aviso de retomada | Toast ou Alert | Toast não tem appearance informative (B16) |

**Ilustrações candidatas** (conferidas no `catalog.json`, a decidir com o Gustavo):
- boas-vindas: `objetos/kit-onboarding` (exemplo oficial de onboarding, mas com a description errada, C78), `hero-sponsor/empacotamento-beneficios`, `personagens/nadia`
- celebração: `objetos/medalha-1`, `objetos/trofeu`, `notificacoes/success`
- novidades: `objetos/presente-aberto`, `notificacoes/sino`

---

## 6. Fases da parte 1

| Fase | Entrega | Pronto quando |
|---|---|---|
| **F0** | Decisões da §10 e fixes P1 do backlog | Respostas registradas como D, fixes na `teste` com smoke verde |
| **F1** ✅ 09/10 | Motor, store, métricas, lint, página escondida `#/onboarding`, tipo Serviço no ARCHITECTURE e na página Componentes locais. Nenhum fluxo visível | Smoke, audit e lint verdes, fluxo de exemplo rodando por `?tour=` |
| **F2** ✅ 09/10 | Tab Primeiros passos no Início com perfil e checklist, e a boas-vindas (com o tour de 3 passos e Backdrop) | Conferido em 1366, 744 e 360, claro e escuro, teclado e leitor |
| **F3** | Tour de 3 passos no desktop, aberto por escolha | Smoke dos fluxos sem âncora quebrada |
| **F4** | Rever o tour, trilha Explorar (Roteiro), métricas na página escondida | Roteiro aposentado ou redirecionado |
| **F5** | Adaptador remoto (progresso entre navegadores) | Depende do backend Caju |

Cada fase termina com "O que mudou / Onde testar" e mostra as peças visuais novas antes de publicar.

---

## 7. Parte 2: onboarding dos Relatórios

### 7.1 Por que separado

O Relatório tem outro público (quem acompanha ou mantém o projeto), outro visual (topo Black, shell escondido) e muito jargão. Também tem números errados hoje: um tour sobre esses números ensinaria errado. Primeiro os fixes, depois o tour.

### 7.2 O que o Relatório tem

6 tabs (`scripts/report.js:12-25`): Visão geral, Conferir, Saúde técnica, Stack React, Arquitetura, Roadmap. Entrada pelo Icon Button de gráfico no topo (`index.html:45-46`), rota `#/relatorio[/tab[/seção]]`.

### 7.3 Jargão que quem chega não entende

| Termo | Onde aparece |
|---|---|
| D, C, Q, A + número | Tags de Últimas decisões, KPIs, tooltips |
| Regra D40, CONFERIR | Subtítulo de Adaptações, nome da tab |
| Lote, rodada, R0–R6, etapa | Roadmap, Arquitetura, Stack React |
| Smoke, avisos, peso da 1ª visita, gzip | Saúde técnica, Sinais vitais |
| Vértice, castanha-ai, Code Connect, prop-map, MISSING-VARIANT, APPROXIMATION | Stack React |
| Building block, Var., branch, `getPublishStatusAsync` | KPIs e painel Publicação |
| Segue o Figma, Exceção aprovada, Débito ou erro no Figma | Adaptações para código |
| Emojis de estado (✅ ⏳ 🧪 🟡 ❌ ⚠️) | Roadmap e Saúde técnica |

### 7.4 Experiência proposta

1. **Glossário do Relatório:** fluxo de dados `relatorio.glossario` usado de três jeitos: definição na **primeira ocorrência** do termo (`<dfn>` com Popover aberto por clique, fechável com Esc), página de glossário no próprio Relatório e entrada no bloco `glossary` do Conteúdo. Uma fonte, três usos. Hover não serve: `popover="hint"` e `interestfor` ainda não são Baseline, e nada essencial pode depender do Popover (WCAG 3.1.3 e 1.4.13, §14.4).
2. **Tour de 1ª visita ao Relatório** (desktop): um passo por pergunta que a pessoa traz, não por tab. "Como está o projeto?" → Visão geral · "O que diverge do Figma?" → Conferir · "O portal está saudável?" → Saúde técnica · "E o React?" → Stack React · "Por que foi feito assim?" → Arquitetura e Roadmap.
3. **Entrada por perfil:** quem escolheu Produto na parte 1 começa pela Visão geral, Dev. React pela Stack React.

### 7.5 Fases da parte 2

| Fase | Entrega |
|---|---|
| **R0** | Fixes P1 do Relatório (B1 a B6) |
| **R1** | Glossário (fonte única) e Popover nos termos |
| **R2** | Tour da 1ª visita e entrada por perfil |

---

## 8. Aprendizados do levantamento

| # | Aprendizado | Evidência |
|---|---|---|
| L1 | **O guia de Conteúdo já é o contrato do onboarding.** Botões, tom, estrutura e métricas estão escritos. Falta transformar em lint para não depender de memória | `conteudo.js:979-1082` |
| L2 | **O portal não tem identidade.** Tudo que depende de "quem é você" (perfil, progresso, lembrar depois, gamificação, ranking) esbarra na mesma decisão de backend. Resolver uma vez, para todos | `IDEIA-GAMIFICACAO.md:13`, ranking via Apps Script provisório |
| L3 | **Faltam peças de tour no DS.** Popover sem placement lateral, Tooltip sem ação, nenhum Spotlight. É gap do DS, não do portal: vai para o CONFERIR e para o time da lib, não para composição feita às pressas | `popover.js:1-15`, `tooltip.js:1-13` |
| L4 | **Componente com regra de viewport define o formato do onboarding.** Bottom Sheet de mobile, Drawer de desktop e desaconselhado para etapas, Nav Control fora do tablet | `bottom-sheet.docs.js:28`, `drawer.js`, C46 |
| L5 | **Três leitores de bloco em paralelo** (docs-kit, search-index, build-catalog) divergem em silêncio. Todo bloco novo precisa entrar nos três, ou o MCP e a busca perdem a página sem aviso | `build-catalog.js:80`, `search-index.js:43` |
| L6 | **Página escondida envelhece.** O Roteiro aponta para pasta que não existe e fala em Checkbox "Vi" que não está mais lá. Peça que ninguém abre pelo menu precisa de dono e de teste | `docs/roteiro/index.html:21,148`, D236 |
| L7 | **Número fixo no texto mente com o tempo.** "70/70", "67 vídeos", "todas no playground" com 100% fixo. Contagem sempre lida dos dados | `report.js:134`, pitch `:248` |
| L8 | **Registro fora do lugar quebra o painel.** As decisões D236 a D292 foram para a tabela de Aprendizados do ROADMAP, e o KPI de decisões parou em D237 | `ROADMAP.md:446-546` |
| L9 | **Regra e guia se contradizem em pontos pequenos.** "Pular" é label do Main Button e é proibido no tour. "só/simples" é proibido na §13.1 e aparece no guia. Sem decidir qual vale onde, o onboarding herda a dúvida | `main-button.docs.js:277`, `conteudo.js:1080`, `:114` |
| L10 | **A cópia mais fiel de um padrão é a que o próprio portal já usa.** O Quiz já tem estado local com interface remota pronta (`lesson.remote`). O serviço de onboarding segue o mesmo contrato | `lesson.js:30-31` |

---

## 9. Backlog de fixes e oportunidades

Prioridade: **P1** bloqueia o onboarding ou mostra dado errado · **P2** incoerência visível · **P3** dívida interna. Quando for para a execução, cada item vira linha no CONFERIR com apelido `C+nome`.

### 9.1 Relatório

| # | P | Item | Evidência |
|---|---|---|---|
| B1 | P1 | KPI e painel de decisões param em D237. D236 e D238–D292 (53 linhas) estão em §7 Aprendizados do ROADMAP. Mover para §4 ou ler as duas tabelas | `ROADMAP.md:446-546`, `report.js:127` |
| B2 | P1 | "Variantes do Figma cobertas" com "todas no playground" e 100% fixos, com 7 componentes em branch | `report.js:134`, `figma-status.js` |
| B3 | P1 | Sinais vitais marcam "Em dia" sem dado (smoke não rodado ou Resumo vazio) | `report.js:356-360`, `build-index.js:234` |
| B4 | P1 | KPI de componentes exclui templates e o painel por página não exclui. Templates sem `category` caem em "Outros" | `report.js:130`, `:291` |
| B5 | P2 | Título "Saúde da stack Figma" no h1, "Relatório" no botão, "Saúde da stack — Figma × castanha-react" na tab Stack React | `report.js:411`, `app.js:696`, `SAUDE-STACK.md:1` |
| B6 | P2 | Busca sem resultado esconde tudo e não mostra estado vazio. Painel Publicação sem dados mostra "0 de 0 … undefined" | `report.js:492-508`, `:308` |
| B7 | P2 | CTAs "Ver detalhes", "Ver decisões", "Ver no GitHub", "Clique para ver os itens", nome de pessoa e "gaps" na interface | `report.js:194-531`, `:258`, `:135` |
| B8 | P2 | A11y: tabs sem `controls`, `aria-labelledby` no host, tooltips sem acesso pelo teclado, tabela rolável sem `tabindex`, carregando e erro fora de região live | `report.js:426-445`, `report.css:74` |
| B9 | P3 | ARCHITECTURE e ROADMAP com "Última atualização 01/10" e "24 componentes, smoke 24/24". Meta do topo sem data | `ARCHITECTURE.md:5`, `ROADMAP.md:4`, `report.js:412` |
| B10 | P3 | Contagens divergentes entre docs gerados: playground 112 / 110 / 105, ícones 274 / 273, ilustrações 237 / 260, React 70/70 / 72 | `COBERTURA.md:7`, `HISTORICO.md:8`, `CHECK-PROPS.md:3` |

### 9.2 Arquitetura e build

| # | P | Item | Evidência |
|---|---|---|---|
| B11 | P1 | `audit-ui.js` não lê `resources/`, `compositions/` e `local/`. O serviço novo não pode nascer fora da auditoria | `audit-ui.js:34-63` |
| B12 | P1 | Catálogo do MCP trata `shortcuts` como lista: com `{bento, items}` o erro é engolido e "Comece por aqui" e "Mais recursos" saem vazios. Sem mapa para `quiz`, `lesson`, `visual`, `releases`, `persona`, `figures`, `levels` | `build-catalog.js:80`, `dist/mcp/catalog.json` |
| B13 | P2 | Busca corta a seção em 1200 caracteres: FAQ e Changelog inteiros viram 1 entrada e o fim não é achado | `search-index.js:43` |
| B14 | P2 | Bloco desconhecido some sem aviso no docs-kit. Proposta: aviso no console e falha no smoke-docs | `docs-kit.js:870` |
| B15 | P2 | Popover e `CDS.position` abrem em cima ou embaixo, sem lados. Para o tour, levar ao time da lib (left e right) | `popover.js`, `cds-element.js` |
| B16 | P3 | Toast sem appearance informative | `toast.js` |
| B17 | P3 | Receita de recurso novo no ARCHITECTURE não fala de `lede`, `RES_SECTIONS` e `AREAS`. `order` não vale nas seções. `status` vale para recurso e é ignorado em componente | `ARCHITECTURE.md` §8, `app.js:227-241` |
| B18 | P3 | Código morto: `blocks()` no build, `#nav-found` e `sec.top` no menu, pasta `templates` no catálogo | `build-index.js:125-137`, `app.js:276`, `build-catalog.js:34` |
| B19 | P3 | `cds-lesson:_total` divide o namespace com as lições | `castanha-quiz.js:416` |
| B20 | P3 | Tema e viewport não persistem e o tema ignora `prefers-color-scheme` | `app.js:816-827` |
| B21 | P3 | Redirect de rotas antigas mora no Tema Caju. Levar um mapa de redirects para o shell | `caju-theme.js:13-20` |

### 9.3 Conteúdo e páginas

| # | P | Item | Evidência |
|---|---|---|---|
| B22 | P1 | Roteiro carrega `../../templates/sponsor-header/*`, pasta que não existe (2 × 404), sem `?v=hash` | `docs/roteiro/index.html:21,148` |
| B23 | P2 | 13 CTAs "Ver …" no Início, "Ver personas", "Ver Tom e voz", "Ver relatórios", "Ver resultado" | `inicio.js:15-41`, `conteudo.js:116`, `castanha-quiz.js:51,118`, `quiz.js:121` |
| B24 | P2 | Gírias no feedback do Quiz e do Treinamento: "Mandou bem", "Bora mais uma?", "Na mosca", "O dev agradece" | `castanha-quiz.js:86-93`, `treinamento.js:344-431` |
| B25 | P2 | Exemplo de onboarding da Ilustração contra o guia: "!" no título, regionalismo, CTA "Entendi" | `caju-theme.js:281-305` |
| B26 | P2 | "Pular" padronizado no Main Button e proibido no tour. "Começar" fora das Labels padronizadas. Concordância em "Concluir… que tem" | `main-button.docs.js:259-285` |
| B27 | P2 | Nomes de seção antigos: "Fundamentos → Conteúdo", "Tema Caju → Ilustração" | `treinamento.js:227`, `capacitacoes.js:80` |
| B28 | P2 | Roteiro com "veja", "para ver" e aspas de destaque | `docs/roteiro/index.html:157-187` |
| B29 | P3 | Descrição da composição Quiz diz "Usado em Capacitações" (está em Treinamento e no Quiz). Nota da área Aprenda sem o Castanha Quiz | `locais.js:58`, `quiz.playground.js:4`, `pilha.js:27` |
| B30 | P3 | Aprenda e Padrões com a mesma escala `charts-03`. A doc dos locais diz Charts 04 para Aprenda | `pilha.js:26-27`, `locais.js:164-171` |
| B31 | P3 | "Jogar agora" é comando, não escolha livre | `castanha-quiz.js:527` |
| B32 | P3 | Pitch com números fixos ("70/70", "67 vídeos") e "se mantém sozinha", "não envelhecem" | `docs/pitch/index.html:187-293` |
| B33 | P3 | Ícone `dark-mode-line` deprecated no Figma ainda em uso | `index.html:47`, `app.js:819` |

### 9.4 Oportunidades

| # | Oportunidade |
|---|---|
| O1 | **Lint de conteúdo reaproveitável:** o lint do onboarding vira checagem geral de copy do portal (CTAs "Ver", gírias, "!" em título), cobrindo B23, B24 e B28 de uma vez |
| O2 | **Uma fonte de verdade para blocos:** cada bloco do docs-kit declara como vira texto, e busca e MCP usam a mesma função (resolve B12, B13, B14) |
| O3 | **Persona de quem usa o portal** (Design, Dev, Conteúdo, Produto), página em Ferramentas › Personas, usada pelo onboarding e pelo Início |
| O4 | **Backend Caju único** para ranking, progresso, perfil e métricas, com o contrato `{top, add}` já usado pelo Quiz |
| O5 | **Trilha no Início + ofensiva e meta diária** (etapa 2 do Quiz) reaproveitando o estado do serviço |
| O6 | **Spotlight ou Coachmark no DS:** levar ao time da lib com o caso do portal e do Portal para empresas (o Hub cita UserGuiding) |
| O9 | **Anchor positioning no Popover do DS:** `position-anchor` e `position-try-fallbacks` (Baseline desde jan/2026) no lugar do cálculo em JS, levando os lados left e right junto (B15) |
| O8 | **Aviso de novidades para quem já usa o portal** (fora deste plano): reaproveita o motor com `version` do fluxo e segue Comunicando Novidades (`conteudo.js:979-1041`), com prazo para sair do ar e contando as interrupções que já existem |
| O7 | **Componente de vídeo com legenda** para Capacitações e Treinamento (C157, C160), destino de vários passos das trilhas |

---

## 10. Decisões

**Decididas em 09/10:** Q2 (Popover sem escurecer), Q3 (texto "Etapa X de 3"), Q5 (os 5 perfis), Q8 (3 passos), Q12 (Content List + Tag) e Q13 (onboarding numa tab Primeiros passos do Início, não numa página nova). As outras seguem com a recomendação da tabela até ele dizer o contrário.

| # | Pergunta | Opções | Recomendação |
|---|---|---|---|
| Q1 | A copy do onboarding segue o guia de Conteúdo ou a §13.1 do castanha-ai? | Conteúdo · §13.1 · as duas (a mais restrita) | As duas: guia de Conteúdo para estrutura e botões, sem "só/simples/fácil" da §13.1 |
| Q2 | Como destacar o elemento do passo, sem Spotlight no DS? | Popover sem escurecer · Backdrop + Popover como composição · pedir à lib | Popover sem escurecer agora, O6 para a lib |
| Q3 | Como mostrar a contagem de etapas? | Texto "Etapa 2 de 3" · Nav Control (até 10, sem tablet) · Progress Tracker horizontal | Texto no Popover (o tour é de desktop) |
| Q4 | Peça das boas-vindas | Modal no desktop + Bottom Sheet no celular · Banner no Início | Modal + Bottom Sheet |
| Q5 | Perfis | Os 5 do §2 · Design e Dev · sem perfil | Os 5, com O3 |
| Q6 | Persistência e métricas | Local agora e teste de usabilidade como medição · endpoint mínimo de eventos anônimos · esperar backend | Local agora, teste de usabilidade como medição real, endpoint quando o backend do ranking sair |
| Q7 | Roteiro | Absorver como trilha Explorar e aposentar a página · manter as duas | Absorver |
| Q8 | Tamanho | 3 passos, título 30 e passo 110 caracteres · 5 passos | 3 passos (benchmarks no §14) |
| Q9 | "Pular" no Main Button × tour, e Esc no tour | Tirar "Pular" das labels · manter com ressalva. Esc = Me lembrar mais tarde · Esc = fechar | Manter "Pular" fora de tour com ressalva na doc. Esc = Me lembrar mais tarde |
| Q10 | Prazo do Me lembrar mais tarde | Próxima visita · 1 dia · 7 dias | Próxima visita depois de 1 dia, no máximo 2 vezes |
| Q11 | Ordem: parte 1 primeiro ou Relatório junto? | Parte 1 → parte 2 · em paralelo | Parte 1, com os P1 do Relatório (B1–B4) no F0 |
| Q12 | Peça do checklist sem ordem | Content List + Tag de status · Progress Tracker · Selection List | Content List + Tag. Progress Tracker comunica sequência |
| Q13 | Onde mora o Comece aqui | Aprenda · Ajuda · topo do menu, abaixo do Início | Topo do menu, abaixo do Início, enquanto houver item aberto. Depois em Ajuda |

---

## 11. Copy proposta (rascunho para revisão)

Feito com a skill de UX copy sobre o guia de Conteúdo da Caju. É direção para revisar com o time de Conteúdo (#content-suporte), não texto final. Limites usados: título até 30 caracteres, título + descrição até 110, botão até 3 palavras.

### 11.1 Boas-vindas (Modal no desktop, Bottom Sheet no celular)

| Elemento | Copy recomendada | Caracteres |
|---|---|---|
| Título | Que bom ter você no Castanha | 28 |
| Descrição | Em 3 etapas, cerca de 1 minuto, mostramos onde fica cada coisa. | 63 |
| Pergunta do perfil | Qual é o seu foco no Castanha? | — |
| Opções | Design · Desenvolvimento React · Desenvolvimento Flutter · Conteúdo · Produto | — |
| Primário | Começar | — |
| Secundário | Me lembrar mais tarde | — |
| Terciário | Não mostrar novamente | — |

| Opção | Título | Tom | Quando usar |
|---|---|---|---|
| A (recomendada) | Que bom ter você no Castanha | Acolhedor, premissa 1 (Receber) | Primeira visita |
| B | Boas-vindas ao Castanha Hub | Neutro, nome da capa do Início | Se o time preferir o nome do produto no título |
| C | Vamos conhecer o Castanha | Fazer juntos, premissa 2 | Se a escolha de perfil sair da tela |

**Por quê:** a premissa 1 pede um "que bom que você está aqui" no primeiro contato, e a premissa 8 pede dizer quantas etapas e quanto tempo. A pergunta do perfil não tem viés (`conteudo.js:556-561`).

### 11.2 Tour do shell (Popover, desktop)

Contagem em cada passo: "Etapa 1 de 3" (Q3).

| # | Título | Descrição | Botões |
|---|---|---|---|
| 1 | Tudo do Castanha por área | Componentes, Padrões, Aprenda, Ferramentas e Ajuda ficam no menu lateral. | Continuar · Me lembrar mais tarde |
| 2 | Encontre qualquer regra | A busca lê os nomes e o texto das documentações. Use / ou ⌘K em qualquer página. | Voltar · Continuar |
| 3 | Ajuda a um clique | Na Ajuda ficam a FAQ e o Changelog. Para falar com o time, use Abrir chamado. | Voltar · Concluir |

**Por quê:** o 1º passo resume o valor (`conteudo.js:1056`). Cada passo mostra o impacto da ação (`:1057`). Começar fica na boas-vindas, Continuar nunca no último e Concluir fecha tour de mais de 1 etapa (`:1073-1082`).

### 11.3 Encerramento e checklist

| Elemento | Copy recomendada |
|---|---|
| Título da celebração | Tour concluído |
| Descrição | Seus primeiros passos estão no Início, organizados para o seu foco. |
| Botão | Acessar o Início |
| Título do checklist | Primeiros passos |
| Descrição do checklist | Um caminho para começar pelo que importa no seu dia a dia. Faça na ordem que preferir. |
| Contagem | 1 de 5 concluídos |

Itens por perfil (Progress Tracker pede até 3 palavras por etapa, `conteudo.js:780`):

| Perfil | Etapas |
|---|---|
| Todos (1º item, já concluído) | Escolher o seu foco |
| Design | Testar um componente · Usar as documentações · Organizar o Figma · Jogar o Quiz |
| Desenvolvimento React | Testar um componente · Entender as camadas · Abrir o Storybook · Jogar o Quiz |
| Desenvolvimento Flutter | Testar um componente · Entender as camadas · Abrir o Castanha Flutter · Jogar o Quiz |
| Conteúdo | Conhecer Tom e voz · Escrever por contexto · Consultar o Vocabulário · Jogar o Quiz |
| Produto | Conhecer os princípios · Conhecer as personas · Acompanhar o Relatório · Jogar o Quiz |

Cada item se marca pela ação: "Testar um componente" quando a pessoa muda uma prop no Playground, "Jogar o Quiz" quando termina uma partida, os demais quando a pessoa abre a página.

### 11.4 Notas de localização e consistência

- Atalho de busca: mostrar ⌘K no Mac e Ctrl+K nos outros sistemas, lendo a plataforma.
- "Playground", "Changelog" e "FAQ" são nomes de área do portal e ficam como estão no menu.
- "Desenvolvimento React" substitui "Dev. React" do Início (abreviação com ponto não entra em opção de escolha). O Início acompanha quando o checklist entrar.
- A copy dos botões vem do motor (§5.3), então esta tabela não precisa ser revisada a cada fluxo novo.

---

## 12. Revisão de acessibilidade do plano (WCAG 2.2 AA)

Feita com a skill de acessibilidade e o guia `persistent-app-tours` (modern-web-guidance), antes de existir tela. Severidade: 🔴 bloqueia · 🟡 importante · 🟢 já atendido.

| # | Achado | Critério | Sev. | Recomendação |
|---|---|---|---|---|
| A1 | O Popover do DS abre em `popover="auto"` (`popover.js:39`): clicar em qualquer lugar fecha o passo e a pessoa perde o tour | 3.2.1, 2.1.1 | 🔴 | Passo do tour em `popover="manual"`, que o componente já respeita quando o atributo vem preenchido. Registrar no CONFERIR como uso previsto |
| A2 | Popover não modal não move o foco sozinho. Quem usa teclado ou leitor de tela não percebe o passo novo (falha relatada no Drupal Tour) | 2.4.3, 4.1.2 | 🔴 | Ao abrir, foco no título do passo (`tabindex="-1"`). No fim, foco volta à âncora do último passo ou ao ponto de antes do tour (regra da Atlassian) |
| A3 | Nome do passo: o Popover usa `aria-label` fixo (`popover.js:41`) | 4.1.2 | 🟡 | `aria-labelledby` no título e `aria-describedby` na descrição. Pedir ao componente aceitar os dois ou um `label` dinâmico |
| A4 | O Popover pode cobrir a área destacada ou o foco | 2.4.11 | 🟡 | `CDS.position` com espaço (`gap`) e troca de lado quando não couber. Smoke confere que o passo não cobre a âncora em 1366 |
| A5 | Sem Spotlight, o destaque da área pode depender de cor | 1.4.1, 1.4.11 | 🟡 | Destaque com o anel de foco global do DS na âncora, mais o texto do passo nomeando a área |
| A6 | Contagem "Etapa 2 de 3" | 1.3.1, 4.1.3 | 🟢 | Fica no título do passo, lida quando o foco chega. Região live para mudança sem foco, como item do checklist concluído (4.1.3) |
| A7 | Esc | 2.1.2 | 🟡 | Esc = Me lembrar mais tarde (Q9), sem perder o progresso. Nunca prender o foco no tour |
| A8 | Zoom 200% em 1366 vira ~683 px de largura | 1.4.10 | 🟢 | Tour a partir de 1100 px de viewport CSS, então com zoom ele cai para o checklist sem quebrar |
| A9 | Escolha de perfil | 1.3.1, 3.3.2 | 🟡 | Radio Button Group com rótulo de grupo (legend) visível. Escolha opcional, com "Começar" funcionando sem perfil |
| A10 | Boas-vindas abre sozinha | 3.2.1, 2.2.1 | 🟡 | Abre depois do carregamento, nunca no meio de digitação na busca. Sem tempo limite nem avanço automático |
| A11 | Motion de entrada e saída | 2.3.3 | 🟢 | Motion Styles do DS, com o modo Reduced (`prefers-reduced-motion`) |
| A12 | Checklist | 1.3.1, 4.1.2 | 🟢 | Progress Tracker já tem `role="list"`, status no nome e `aria-current="step"` (`progress-tracker.docs.js:75-76`) |
| A13 | Ilustrações | 1.1.1 | 🟢 | Decorativas, com `aria-hidden`. Sem texto dentro de imagem (`conteudo.js:1020`) |

**Teclado no tour**

| Tecla | Comportamento |
|---|---|
| Tab / Shift+Tab | Circula pelos botões do passo e pode sair para a página (não modal) |
| Enter / Espaço | Aciona o botão em foco |
| Esc | Me lembrar mais tarde, foco volta ao ponto anterior |

**Testes previstos:** VoiceOver no Safari e no Chrome, NVDA no Windows (se houver máquina no time), teclado puro, zoom 200%, tema escuro, 360/744/1366.

---

## 13. Proposta para a lib: peça de tour

Pela skill de design system e pelo protocolo Juntos (a IA não é autora primária de componente). Isto é **briefing para o designer decidir**, não desenho. Nada vai para Jira, Notion ou Figma sem aprovação.

**Problema:** o portal e o Portal para empresas precisam guiar o primeiro uso dentro da interface. Hoje o Sponsor usa o UserGuiding com tema "Sponsor - Redesign", com passos Modal, Tooltip ou Input Field (Castanha Hub › Comunicando Novidades). O DS não tem a peça. A busca na lib estável por coachmark, onboarding e tour (09/10) achou a ilustração `kit-onboarding` e assets locais de squads, como o `PopUp [Onboarding mobile cards]` da Squad Cartões.

| Componente vizinho | O que tem | Por que não basta |
|---|---|---|
| Popover | Ancoragem, camada de topo, Esc | Sem placement lateral, `auto` fecha com clique fora, nome fixo, sem cabeçalho nem rodapé de ações |
| Tooltip | Ancoragem leve | Sem ação, sem foco |
| Modal | Título, ações, foco preso | Não aponta para nada da tela |
| Nav Control | Contagem | Até 10, some no tablet |

**Pedido ao time da lib (para o designer avaliar):**
- Peça "Coachmark" ou variação do Popover com cabeçalho (título), corpo, rodapé de ações (Main Buttons) e contagem.
- Placements left e right, com seta opcional que acompanha o lado.
- Modo persistente (não fecha com clique fora).
- Annotation de acessibilidade: diálogo não modal, foco no título ao abrir, retorno ao fechar, Esc.
- Benchmark de referência no §14.2: Atlassian Spotlight, Spectrum Coach mark e Fluent Teaching Popover.

---

## 14. Referências de mercado

Pesquisa de 09/10/2026. Legenda: **[E]** evidência (pesquisa, estudo, benchmark com amostra declarada) · **[F]** dado de fornecedor (base própria, sem metodologia aberta, serve de direção) · **[N]** norma · **[DS]** regra publicada por design system. Onde o mercado diverge do guia de Conteúdo da Caju (rótulos de botão, por exemplo), vale o guia.

### 14.1 Pesquisa e benchmarks de onboarding

| Fonte | Tipo | O que diz | Aplicação no plano |
|---|---|---|---|
| [NN/g, Onboarding Tutorials vs. Contextual Help](https://www.nngroup.com/articles/onboarding-tutorials/) | E | Tutorial empurrado costuma falhar: as pessoas pulam e esquecem. Ajuda contextual (pull) funciona melhor. Ajuda precisa fechar com um gesto e ser reencontrável | Tour por escolha e Comece aqui fixo |
| [NN/g, Mobile-App Onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/) | E | Deck of cards não melhorou o desempenho. Testar sem onboarding antes e adicionar quando o teste mostrar problema | P0 do §15 testa o portal sem onboarding |
| [NN/g, Instructional Overlays](https://www.nngroup.com/articles/mobile-instructional-overlay/) | E | Cadeia de dicas sobrecarrega a memória. Uma ação por dica | 3 passos, um assunto cada |
| [NN/g, Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/) | E | Nada essencial dependendo do tooltip, abrir pelo teclado | Glossário do Relatório |
| [Chameleon, Benchmark 2020](https://www.chameleon.io/blog/chameleon-benchmark-report) | F | 3 passos: 66% de conclusão. Abaixo de 50% depois de 5 | Q8: 3 passos |
| [Chameleon, Benchmark 2024](https://www.chameleon.io/benchmark-report-24) | F | Média 33,5%. Aberto por escolha via checklist: 64%. 5 passos: 21,6%. Adiado: cerca de 3% voltam | Tour por escolha, adiamento limitado a 2 vezes |
| [Pendo, State of Walkthroughs](https://www.pendo.io/pendo-blog/state-walkthroughs-pendo/) | F | Quase 70% fecham no 1º passo. Segmentar dá pelo menos 10 pontos a mais | 1º passo resume o valor, perfil segmenta |
| [Userpilot, SaaS Benchmarks](https://userpilot.com/blog/saas-product-benchmarks/) | F | Checklist: média 19,2%, mediana 10,1%. Até 7 itens | Até 5 itens |
| [Appcues, checklists curtos](https://goodux.appcues.com/behind-the-experience/appcues-bite-sized-checklists) | F | Checklist longo dividido em listas curtas: de 2% para 25% | Lista curta por perfil |
| [Nunes e Drèze, 2006, Endowed Progress](https://ideas.repec.org/a/oup/jconrs/v32y2006i4p504-512.html) | E | Cartão com progresso inicial é concluído mais e mais rápido | 1º item já concluído |
| [Growth.Design, Trello](https://growth.design/case-studies/trello-user-onboarding) | análise | Personalizar com uma pergunta, deixar a pessoa fazer | Uma pergunta de perfil, itens por ação |
| [Samuel Hulick, UserOnboard](https://www.intercom.com/blog/user-onboarding-interview-samuel-hulick/) | opinião | Onboarding é aumentar a chance de sucesso, não um tour de boas-vindas | Foco no checklist e no Comece aqui |

### 14.2 Tour como componente em design systems

| DS | Peça | Regras que interessam | Link |
|---|---|---|---|
| Atlassian | Spotlight | 1 passo é o preferido, no máximo 3, um por tela. Título até 27 e corpo até 75 caracteres (inglês). Foco vai para o passo e volta ao alvo no fim. Muitos spotlights = simplificar a interface | [usage](https://atlassian.design/components/spotlight/usage) |
| Adobe Spectrum | Coach mark | Rótulo do botão não muda a cada passo. Pular como secundário e ausente no último. Largura constante | [coach mark](https://spectrum.adobe.com/page/coach-mark) |
| Microsoft Fluent | Teaching Popover (v9), Teaching Bubble (v8) | No máximo 3 passos. Anunciar ao leitor de tela quando abre por código | [popover](https://fluent2.microsoft.design/components/web/react/core/popover/usage) |
| Salesforce SLDS | Welcome Mat, Prompts, Walkthroughs | Welcome Mat de primeiro acesso com variante de checklist. Prompts com registro de visto, clique e conclusão | [user engagement](https://lightningdesignsystem.com/guidelines/user-engagement/patterns) |
| IBM Carbon | Interstitial por papel, checklist, inline tip, coachmark | A própria IBM avalia coachmark passo a passo como fraco para caminho guiado e prefere ajuda inline | [tools for onboarding](https://www.carbondesignsystem.com/articles/tools-for-designing-onboarding-experiences) |
| Shopify Polaris | Setup guide | No máximo 5 passos, itens que se marcam sozinhos, "1 de 3" em texto, Remind me later | [onboarding](https://shopify.dev/docs/apps/design/user-experience/onboarding) |
| GitHub Primer | Popover | Onboarding leve, com cuidado com popover que abre no carregamento. Dismiss obrigatório | [popover](https://primer.style/product/components/popover/guidelines) |
| SAP Fiori | Web Assistant | Simplificar a interface antes de guiar. Não roda em smartphone | [web assistant](https://www.sap.com/design-system/fiori-design-web/v1-96/foundations/writing-and-wording/web-assistant) |
| GOV.UK | Complete multiple tasks | Tarefas em qualquer ordem, status em texto curto ligado por `aria-describedby` | [pattern](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) |

### 14.3 Como os portais de DS recebem quem chega

| Portal | Estrutura |
|---|---|
| [Atlassian](https://atlassian.design/get-started) | Cards por papel: Design, Develop, Content design. É o modelo mais próximo do público do Castanha |
| [Carbon](https://carbondesignsystem.com/all-about-carbon/what-is-carbon/) | Designing e Developing, com tutoriais por tecnologia |
| [Fluent 2](https://fluent2.microsoft.design/get-started/design) | Sequência numerada para o Figma, um checklist implícito |
| [Material 3](https://m3.material.io/get-started) | Develop dividido por plataforma (Android, Compose, Flutter, Web) |
| [GOV.UK](https://design-system.service.gov.uk/get-started/) | Guias de configuração para protótipo e produção |
| [Primer](https://primer.style/product/getting-started/) | Sem trilha por papel |

Nenhum dos grandes portais usa tour ou modal de boas-vindas. Todos têm página Get started fixa. A [Sparkbox Design Systems Survey](https://designsystemssurvey.sparkbox.com) indica onboarding de novos consumidores estabelecido em 30% dos sistemas e métricas em 16%. O Castanha com Comece aqui, checklist por perfil e tour opcional fica à frente dessa média.

### 14.4 Acessibilidade e tecnologia

| Fonte | Tipo | Ponto |
|---|---|---|
| [APG, Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | N | Foco entra, Esc fecha, foco volta ao gatilho. Não há padrão APG para diálogo não modal |
| [WCAG 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | N | Passo persistente não pode cobrir o foco |
| [WCAG 1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | N | Glossário fechável e persistente |
| [WCAG 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | N | Anunciar item concluído sem mover o foco |
| [WCAG 3.1.3 Unusual Words](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html) | N | Glossário e definição na 1ª ocorrência (G55, G62, G112) |
| [Drupal Tour, issue de acessibilidade](https://www.drupal.org/node/2961001) | relato | Dica aparecia e o foco ficava na toolbar |
| [MDN, popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover) | N | `manual` não fecha com clique fora. `hint` é experimental |
| [web.dev, Baseline jan/2026](https://web.dev/blog/web-platform-01-2026) | N | CSS anchor positioning virou Baseline Newly available em jan/2026 |
| modern-web-guidance, `persistent-app-tours` | guia | `popover="manual"`, `role="dialog"` com `aria-labelledby`, foco para dentro do passo ao abrir |
| [Shepherd.js](https://docs.shepherdjs.dev/guides/usage/) · [Driver.js](https://driverjs.com/docs/configuration) | código | Passo como dado, alvo ausente tratado, avanço pela ação, eventos |
| [Intercom, comunidade](https://community.intercom.com/helpdesk-9/intercom-product-tours-not-triggering-for-new-users-7963) | relato | Seletor que não acha o alvo é a causa nº 1 de tour quebrado |

**Posicionamento:** o portal já tem `CDS.position` (JS, sem dependência). Anchor positioning com `position-try-fallbacks` fica como oportunidade para o Popover do DS (O9), porque ainda é Newly available.

### 14.5 Métricas e gamificação

| Fonte | Tipo | Ponto |
|---|---|---|
| [Amplitude, Time to Value](https://www.amplitude.com/blog/time-to-value-drives-user-retention) | F | Ativação é chegar ao momento de valor. Tempo até o valor se lê junto com a ativação |
| [Sailer e Homner, 2020](https://link.springer.com/article/10.1007/s10648-019-09498-w) | E | Meta-análise de gamificação: efeito pequeno e real, mais robusto no aprendizado (g = 0,49) |
| Deci, Koestner e Ryan, 1999 | E | Recompensa esperada reduz motivação intrínseca. Badge como celebração, não como meta. Referência não conferida nesta pesquisa |
| [Trailhead](https://trailhead.salesforce.com/content/learn/modules/trailhead-road-to-ranger/learn-about-trailblazer-ranks) | produto | Trilhas por papel, módulos curtos, badge por módulo |

### 14.6 Onde o plano mudou por causa da pesquisa

| Antes | Depois | Fonte principal |
|---|---|---|
| Tour de 5 passos | 3 passos | Chameleon, Atlassian, Fluent |
| Tour logo depois da boas-vindas | Tour por escolha (Começar ou Primeiros passos do Início) | Chameleon 2024, NN/g |
| Modal como peça central | Tab Primeiros passos fixa no Início, modal como porta | Atlassian Get started, NN/g |
| Progress Tracker no checklist | Lista sem ordem com status em texto (Q12) | GOV.UK, Polaris |
| Checklist vazio | 1º item já concluído | Nunes e Drèze |
| Item marcado ao abrir a página | Item marcado pela ação real | Polaris, Amplitude |
| Me lembrar sem limite | No máximo 2 vezes, com reentrada fixa | Chameleon 2024 |
| Métricas locais como critério | Teste de usabilidade como medição até haver backend | Sparkbox, Amplitude |

**Onde o plano não segue o mercado, por regra da Caju:** rótulos dos botões (Continuar, Concluir e Me lembrar mais tarde no lugar de Next, Finish e Skip tour) e a ausência de "Pular" (`conteudo.js:1073-1082`).

---

## 15. Plano de pesquisa com quem usa o portal

Pela skill de pesquisa com usuário. Objetivo: validar perfis, primeiro caminho e o tamanho do tour antes de construir a F2.

| Etapa | Método | Quem | Tamanho | Quando |
|---|---|---|---|---|
| P0 | Teste do portal **sem** onboarding (linha de base): achar um componente, a regra de um contexto e o caminho de chamado | Pessoas que nunca abriram o portal | 5 | Antes da F1 |
| P1 | Entrevista curta (30 min) sobre como a pessoa começou no DS e o que faltou | 2 por perfil: Design, Dev React, Dev Flutter, Conteúdo, Produto | 10 | Antes da F2 |
| P2 | Card sorting fechado dos destinos do checklist por perfil | Mesmas pessoas ou pesquisa no #castanha-suporte | 15 a 20 | Antes da F2 |
| P3 | Mesmas tarefas do P0 com os Primeiros passos e o tour (pensando em voz alta) | Outras pessoas que nunca abriram o portal | 5 a 6 | Fim da F3 |
| P4 | Métricas locais da página `#/onboarding` (abandono por passo, tempo, % que escolhe perfil) | Primeiros usuários | — | Depois da F3 |

**Roteiro da entrevista (P1)**
1. Aquecimento (5 min): papel, há quanto tempo usa o Castanha.
2. Contexto (10 min): como foi a primeira semana com o DS, onde procurou ajuda, o que demorou para achar.
3. Aprofundar (10 min): o que você precisava saber no primeiro dia? E na primeira semana?
4. Reação (5 min): mostrar o fluxo de boas-vindas e o checklist do perfil. O que sobra? O que falta?

**Síntese:** mapa de afinidade por perfil e matriz impacto × esforço para o checklist. Rodar a skill de síntese de pesquisa quando as entrevistas existirem.
