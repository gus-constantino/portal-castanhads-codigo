# Ranking do time do Castanha Quiz

O ranking do Castanha Quiz fica no Vercel, junto do portal (D339). A função [`api/ranking.mjs`](../api/ranking.mjs) lê e grava as partidas num banco Upstash Redis ligado ao projeto `portal-castanhads`.

- **Quem acessa:** quem entrou no portal com código (perfis Completo e Portal). O middleware barra o Visitante e quem abriu um link de entrega.
- **O que é gravado:** 3 iniciais, pontos, temas e data. O IP serve para limitar o envio (uma partida a cada 20 s) e sai do banco sozinho depois disso.
- **Sem a função:** no servidor local comum e em cópias sem o Vercel, a aba Jogar mostra o ranking deste navegador, sem aviso.

## Rankings

| Quadro | O que entra |
|---|---|
| Geral | Todas as partidas. Quem joga com todos os temas ganha o x1,5 |
| Um por tema (`componentes`, `tema-caju`, `motion`, `conteudo`, `ilustracao`, `camadas`) | Partidas com aquele tema sozinho, sem multiplicador |

Cada quadro guarda as 200 melhores partidas e mostra as 10 primeiras. No empate, quem fez antes fica na frente. O teto é 5.250 pontos no Geral e 3.500 nos temas. Tema novo no Castanha Quiz precisa entrar em `TEMAS`, no começo da função.

## Contrato

```
GET  /api/ranking?board=geral                      → { ok, top: [{ name, score, label, date }] }
POST /api/ranking { board, name, score, label }    → { ok, position, top }
```

Erro: `{ ok: false, error }`, com 400 (dados inválidos), 429 (envio em menos de 20 s) ou 503 (banco não configurado). A aba Jogar entrega isso ao `cmp-lesson` pela propriedade `remote` { top, add }, que continua igual.

## Banco

Criado em **Storage › Upstash for Redis** no painel do Vercel e ligado ao projeto. A integração cria as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`. Elas nunca entram no repositório. As chaves são `rank:<quadro>` (sorted set) e `rl:<ip>` (limite de envio).

## Testar sem publicar

```
node scripts/dev/servidor-acesso.js 8796
```

O servidor local roda o middleware e a função, com um banco de mentira na memória. Entre com o código de teste do Completo e abra `#/castanha-quiz/jogar`.

## Antes do Vercel

Até 14/10 o ranking ficava numa planilha do Google com Apps Script ([`scripts/ranking/Code.gs`](../scripts/ranking/Code.gs), D275). Na rede da Caju, o Chrome tratava a chamada como acesso à rede local e bloqueava (D278). As partidas da planilha foram copiadas para o Geral.
