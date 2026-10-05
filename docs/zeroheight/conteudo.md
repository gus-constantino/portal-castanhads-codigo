# Conteúdo: revisão do Hub × playground

Revisão de 05/10/2026 das 32 páginas de Conteúdo do Castanha Hub: Tom e Voz, Playbooks, Formatação de Dados, Vocabulário, Experiências e Jornadas e Changelog. A comparação foi feita com o recurso **Conteúdo** do playground, que veio do Figma "Como a Caju Fala", e com as tabs Conteúdo das docs de componentes. Itens no `docs/CONFERIR.md`: C167 (decisões) e C168 (correções no Hub).

**Resumo:**
- O Hub está **mais novo** que o playground. A seção Tom e Voz (3 pilares e 9 premissas, v1.1.5 de set/2026) ainda não existe no playground e muda algumas regras antigas.
- Formatação, Vocabulário e Experiências e Jornadas já estão quase todos no playground. Faltam tabelas Faça/Não faça e alguns exemplos.
- Há **divergências de regra** entre os dois lados (seção 1). Algumas estão também dentro do próprio Hub. Elas precisam de decisão antes de alinhar o texto.

---

## 1. Divergências de regra (decidir antes de alinhar)

| # | Tema | Hub | Playground | Sugestão |
| --- | --- | --- | --- | --- |
| 1 | "Ver mais" | Premissa #5: trocar por "Saber mais". Comunicando Novidades e Links proíbem "Saber mais", "Saiba mais" e "Ver mais" | "Abrir/acessar {variável}"; o tour proíbe "Saber mais" e usa "Quero saber mais" | Seguir a página Links: nome da área ou "Acessar {área}". Corrigir a Premissa #5 |
| 2 | Verbos visuais ("Visualizar", "Ver") | Premissa #5: não é absoluto; vale quando a ação é olhar algo (boleto, comprovante, cartão). Termos para evitar: exceção em marketing e funil | Regra absoluta | Trazer as exceções do Hub; o Hub também precisa resolver "Visualizar cartão" × "Acessar cartão" na mesma página |
| 3 | Etapas futuras | Premissa #8: mostrar tempo, número de etapas e o que vem depois | Princípios, "Não faça": não entrar em detalhes de etapas futuras | Seguir o Hub (é mais novo) e reescrever o "Não faça" |
| 4 | Explicar no onboarding | Premissa #6: Receber → Contextualizar → **Explicar** → Encerrar. #7: conceito antes da regra | "Não é o momento de explicar regras de negócio" (do playbook antigo) | Seguir as premissas: explicar o conceito, sem regra de negócio detalhada |
| 5 | Interjeições ("Ops", "Hmm") | Premissa #3: "nem sempre" acolhem, depende do contexto | "Evite em qualquer momento"; "Nunca use" em Feedback Pages | Manter a proibição em erro (Feedback Pages) e deixar relativo no resto |
| 6 | Siglas CPF, CNPJ e RG | Não precisa do nome completo | Nome completo na primeira menção | Seguir o Hub (são siglas conhecidas) |
| 7 | Pix | "Pix", nunca em caixa alta | Tabela de siglas com "PIX" | Seguir o Hub e o Banco Central: **Pix** |
| 8 | Celular | `(11) 9 9999-9999` em Códigos e `(11) 99999-9999` em Mascarar | `(99) 9 9999-9999` | Escolher um formato só; o mais comum é `(11) 99999-9999` |
| 9 | Código do verso do cartão | "Código de desbloqueio"; o Glossário ainda diz "Código de ativação" e "Desbloquear cartão" diz que "Ativar" saiu | "Código de ativação" | Usar "Código de desbloqueio" nos dois lados |
| 10 | Data compacta | `01/01/2025 ou 01/25` | `01/12/2025` ou `12/25` | Mesmo formato; só os exemplos diferem. Conferir o caso MM/AA |
| 11 | Erros: culpa | "Assuma a culpa" | "Assuma a responsabilidade" | "Responsabilidade" (menos carga) |
| 12 | Botão destrutivo de exemplo | "Excluir rascunho" | "Sair do app" (não é irreversível) | Seguir o Hub |
| 13 | "Para garantir sua segurança" | Feedback Pages lista "Garantir" em Palavras para evitar; Alertas manda usar a frase | Copiou a frase de Alertas | O Hub precisa decidir |
| 14 | Textos do .Feedback Content (Figma) | Proíbe "com sucesso", "Tudo certo", "Entendi" como CTA, "Ver", futuro ("Avisaremos") e pede "Limpar busca" | Patterns usa os textos do Figma: "Ação concluída com sucesso", "Tudo certo!", "Entendi", "Ver detalhes", "Avisaremos em breve", "Limpar filtros" | Reescrever os textos sugeridos no Figma (ver seção 3) |

## 2. O que falta no playground e entra depois das decisões

- **Tab nova "Tom e voz":**
  - os 3 pilares (Hospitalidade, Simplicidade, Brasilidade);
  - as 9 premissas com as perguntas-guia;
  - "Comece pelas pessoas", com os sentimentos e as expressões que a Caju repete.
- **Formatação:** tabelas Faça/Não faça das regras gerais. Também:
  - a coluna "Substitua por" em "O que não usamos";
  - a data do extrato do ano anterior;
  - moeda mascarada `R$ ••••`;
  - CPF;
  - prazos em dias úteis e corridos;
  - máscara de CNPJ e "Celular final 9999".
- **Vocabulário:**
  - a exceção de caixa do Pix;
  - a reescrita de "Agora" e "Libere" em Termos de ansiedade, com o aviso de que esses termos "não são proibidos";
  - "Conta" no bloqueio do app.
- **Docs de componentes:**
  - Links: os exemplos de texto genérico;
  - Bottom Sheet: quando usar "Voltar" e não "Cancelar";
  - Main Button: a tabela de ações destrutivas;
  - Progress Tracker: "Progress Tracker" no lugar de "stepper".
- **Emojis:** não usar mais de um seguido, nem em componente já muito visual, e testar com o VoiceOver.
- **Estruturando Conteúdo** (content-first, hierarquia, priorização, taxonomia): pode virar uma tab ou um bloco em Contextos. Usar um exemplo genérico no lugar do exemplo do Pix MED (ver seção 4).

## 3. Textos do .Feedback Content no Figma (Patterns)

Os títulos e descrições sugeridos de cada Kind quebram as regras da página Feedback Pages do próprio Hub. Proposta, a confirmar com o time de Conteúdo:

| Kind | Hoje | Proposta |
| --- | --- | --- |
| Success | Ação concluída com sucesso · Tudo certo! Você pode seguir para o próximo passo. | Pronto, deu certo · Você já pode seguir para o próximo passo. |
| Warning | Atenção necessária antes de continuar · Para garantir sua segurança, revise… | Revise antes de continuar · Confira as informações para seguir com segurança. |
| No Results | Nenhum resultado encontrado | Ainda não encontramos resultados |
| In Review | … Avisaremos em breve. | … Você recebe um aviso assim que terminar. |
| Botões de exemplo | Entendi · Ver detalhes · Limpar filtros | Voltar ao início · Acessar detalhes · Limpar busca |

## 4. Correções no Hub (edição direta)

**Tom e Voz**
- Premissas: "Onboading" → "Onboarding".
- Pilares: a introdução quebra no meio da frase.
- Comece pelas Pessoas: "(B2B0" → "(B2C)", e o texto fala de "Colaboradores (B2B…)" numa página B2C.
- Premissas na Prática:
  - números trocados ("Premissa #9" com 8️⃣, "#3" com 2️⃣) e seções fora de ordem;
  - "Porque existe essa diferença?" → "Por que";
  - "Fazer junto" × "Fazer juntos";
  - caixa alta indevida em "Ver como Funciona" e "Conduzir a Experiência".

**Playbooks**
- Comunicando Novidades:
  - "Engajament";
  - "Você pode também pode";
  - "Antes comunicar";
  - "Usar muitos componentes… aumentam";
  - dois links com o domínio antigo `zeroheight.com/858426090`.
- Estruturando Conteúdo:
  - "um documento com nas informações";
  - "muitos usuários tem" → "têm";
  - "Por que?" → "Por quê?";
  - "Squin test" → "Squint test";
  - "castanha DS" → "Castanha DS";
  - espaços duplos;
  - **sete links com o domínio antigo**;
  - o link "icons" leva ao Icon Button.
- Uso de Emojis: "Do's and Dont's" → "Don'ts"; "funcionalidades liberada".

**Formatação de Dados**
- Exemplos que quebram a própria regra:
  - "informe seus dados abaixo" começa em minúscula;
  - "taxas, como IOF" usa "taxa", que a própria página proíbe;
  - travessão no texto todo, com "Travessão" em "O que não usamos";
  - comprovante com hífen e ano de 2 dígitos.
- Na tabela de Mascarar estão linhas de prazos (copiadas de Quantidades).
- Celular em dois formatos (seção 1, item 8).

**Vocabulário**
- Glossário:
  - "Bolsões\" de saldo" (aspa de abertura);
  - "saldoe";
  - itens começando em minúscula;
  - falta espaço depois do ponto;
  - Pix "disponível apenas para pessoas com Saldo Caju", nome que a própria página diz que foi descontinuado.
- Termos para evitar: "Jargão informar" → "informal"; "contexto.Nosso"; caixa alta em "Explore, Descubra".

**Experiências e Jornadas**
- Visão geral: o ponto final virou link.
- Onboarding: a coluna "Por quê" está desalinhada.
- Tour:
  - "quandor usar";
  - o título "Vai viajar? Use seu Caju!" quebra a regra de título sem pontuação.
- Ações Obrigatórias:
  - "Seu caju" em minúscula, com emoji num "Faça";
  - "acesse ao app";
  - os "Faça" do nível 5 usam "conta" e "Liberar", que a própria página proíbe.
- Botões: "que tem mais de uma etapa" → "têm"; "não use possessivos" contradiz "use seu/sua".
- Breadcrumb: "carterias" (2×).
- Feedback Pages:
  - "perdidoou", "tomcolaborativo", "quea ação", "diretamento";
  - "Por mais a falha seja" → "Por mais que a falha seja";
  - "onomatopéias" → "onomatopeias";
  - a legenda de "Sessão expirou" foi copiada da de Sucesso.
- Progress Tracker: o exemplo com "Início > Conta > Abertura" contradiz a regra do Breadcrumb.
- Tabs: "Dont:".
- Push: "Como Escrever"; "**Seu Caju caiu!**Você".
- In-app:
  - "quiser.Por isso";
  - "Ele expiram";
  - datas "21/05/2025 - 12:40" fora do formato da página;
  - o botão "Cartões" não está no infinitivo;
  - 5 tipos em "Quando usar" e 6 templates.
- E-mails:
  - "Sessão fixa" → "Seção fixa";
  - o tamanho do corpo diverge entre o texto (23) e o template (24);
  - a faixa do preview text se contradiz;
  - o template usa "Olá, {{employeeName}}", contra a regra de saudação;
  - "os ajuste necessário".

**Changelog**
- "Inclusão da sessão" → "seção".
- "I" no lugar de "|" e datas em formatos diferentes.
- Falta a v1.1.4.

## 5. Repositório público

- **Corrigido no playground nesta revisão:** o exemplo de título de e-mail usava o nome de um cliente real. Agora usa um nome fictício.
- **Ainda no playground, para decidir:**
  - o passo a passo de acesso ao Sendgrid (pedido de acesso, aprovação, 2FA);
  - os nomes de canais internos do Slack;
  - a menção a uma pesquisa interna.

  Sugestão: tirar o passo a passo do Sendgrid (é processo interno) e deixar só "peça acesso pelo canal de suporte".
- **No Hub, não trazer:**
  - o exemplo do Pix MED, com dados internos e decisão de produto;
  - o passo a passo do UserGuiding;
  - os links de Slack, Atlassian, Loom e Google Sheets;
  - o percentual da pesquisa no Maze.
- **No Hub, para corrigir:** a página Breadcrumb tem imagens com URLs S3 assinadas, que expõem um identificador de credencial AWS. Vale trocar as imagens por uploads normais.
