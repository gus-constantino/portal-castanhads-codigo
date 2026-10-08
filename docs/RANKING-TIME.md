# Ranking do time do Castanha Quiz

O ranking do Castanha Quiz guarda as partidas numa planilha do Google no Drive da Caju. Um Google Apps Script publicado como app da Web lê e grava essa planilha.

- **Quem acessa:** só quem está logado com uma conta @caju.com.br.
- **O que é gravado:** 3 iniciais, pontos, temas e data. O e-mail serve para conferir o domínio e limitar o envio (uma partida a cada 20 s por pessoa). Ele fica só no cache do script e não é gravado na planilha.
- **Sem conta da Caju:** fora da conta, ou em navegador que bloqueia cookies de terceiros, a página mostra o ranking deste navegador, como antes.

## Colocar no ar (feito por alguém da Caju, uma vez)

1. No Drive da Caju, crie uma planilha chamada **Castanha Quiz · Ranking**.
2. Na planilha, abra **Extensões › Apps Script**.
3. Apague o conteúdo do arquivo `Código.gs`, cole o de [`scripts/ranking/Code.gs`](../scripts/ranking/Code.gs) e salve.
4. No seletor de função, escolha `setup` e clique em **Executar**. O Google pede autorização, e o script cria a aba **Ranking**.
5. Clique em **Implantar › Nova implantação**, escolha o tipo **App da Web** e configure:
   - **Executar como:** eu;
   - **Quem pode acessar:** qualquer pessoa na Caju.
6. Clique em **Implantar**, copie o endereço que termina em `/exec` e mande para o time do Castanha DS.

O time coloca esse endereço em `RANKING_URL`, em `resources/castanha-quiz/castanha-quiz.js`. O endereço não é segredo: o app só responde para contas da Caju.

## Atualizar o script

Edite o código no Apps Script, depois **Implantar › Gerenciar implantações › editar › Nova versão**. O endereço continua o mesmo.

## Migrar para um ambiente da Caju

O portal não depende do Google: a lição recebe um `remote` com `top` (lista) e `add(entry)` (Promise com `{ position, top }`). Para trocar de backend, basta uma API interna que devolva o mesmo formato e trocar a função `jsonp` da aba Jogar por um `fetch`.
