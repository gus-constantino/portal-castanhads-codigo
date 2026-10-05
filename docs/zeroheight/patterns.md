# Patterns e Templates: Feedback Page (Sponsor e Employee) e Tela de loading

Três páginas do Castanha Hub revisadas em 05/10/2026, conferidas com o Figma (Component use documentation). Cada uma tem o texto pronto para colar, por tab; no fim do arquivo ficam as pendências (remover antes de colar). Item no `docs/CONFERIR.md`: C161.

O que muda em relação ao Hub de hoje, em resumo:
- **Employee, Estilos:** a página mostra os frames do Sponsor (mesmos nodes `7039:15214`–`7039:15270`). Trocar pelos frames do Employee.
- **Motion:** nas três páginas a seção ainda é o texto-modelo com a tabela vazia.
- **Skeleton:** citado em "Não utilize para" e na Tela de loading, mas o DS não tem Skeleton.
- **Links:** Alert sem link; Toast e Modal com o endereço curto antigo.
- **Tela de loading:** espaço duplo no começo de um item da lista.

---

## 1. Feedback Page · Sponsor (`/p/272f28`)

### Specs

**Introdução**

Padrão que comunica o resultado ou a condição de um fluxo. Reúne ilustração, mensagem e ações para que a pessoa usuária entenda o que aconteceu e saiba o que fazer em seguida. Pode ocupar a tela inteira ou uma seção dela.

[Imagem: manter o header `[Header] Feedback pages - Sponsor` (7039:15680)]

#### Nomes alternativos comuns

Empty state, status page, result page, state feedback.

#### Dúvidas e comentários

Fale com nosso time via Slack no canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

### Quando usar

Utilize Feedback Pages quando uma condição precisa ser comunicada no lugar do conteúdo: na tela inteira, quando ela impede seguir com o fluxo, ou em uma seção, quando afeta só aquela parte da interface.

#### Utilize para:

- Confirmar a conclusão de um fluxo.
- Informar falhas que impedem seguir, incluindo erros de sistema como 404 e 502.
- Representar ausência de conteúdo, por estar vazio ou por filtro sem resultado.
- Preencher uma área sem conteúdo dentro da página, como uma tabela ainda sem registros ou uma busca sem resultado.
- Comunicar espera, quando algo está em análise ou em processamento.
- Informar que a pessoa usuária não tem acesso ao conteúdo.

#### Não utilize para:

- Mensagens rápidas ou transitórias: use o [Toast](https://castanha.caju.com.br/858426090/p/19d79d).
- Avisos que não interrompem o fluxo: use o [Alert](LINK DO ALERT).
- Confirmações e decisões imediatas: use o [Modal](https://castanha.caju.com.br/858426090/p/596323).
- Carregamento breve de um trecho da tela: indique o carregamento só naquele trecho.

### Guidelines

#### Diretrizes de uso

[Imagens: manter as 5 do Figma (7039:15471, :15480, :15489, :15498, :15507), com o texto abaixo em cada uma]

- **Escolha o cenário pela condição, não pela cor.** O Kind carrega o significado da página. Selecione pelo que aconteceu no fluxo, e deixe que ilustração e texto comuniquem junto com a cor, nunca só por ela.
- **Mantenha o texto padrão quando ele resolver.** Cada cenário vem com título e descrição agnósticos, pensados para servir à maioria dos casos. Substitua apenas quando o contexto for mais específico ou pedir outra redação, preservando o tom.
- **Ofereça uma saída clara.** A ação primária precisa resolver o que a página comunica: tentar de novo no erro, voltar no conteúdo inexistente, criar o primeiro item no vazio. Página sem saída deixa a pessoa usuária parada.
- **Componha casos específicos a partir dos cenários.** Situações como sessão expirada, manutenção programada ou falta de conexão não têm cenário próprio. Use o Kind mais próximo e ajuste o texto: sessão expirada é Warning, manutenção é Warning, página fora do ar é Error.
- **Ajuste o template ao espaço que ele ocupa.** Na tela inteira, a página assume a condição por completo e oferece a saída principal. Em uma seção, como uma tabela ainda sem registros ou uma área de busca sem resultado, redimensione o template para a área correspondente e desligue Show Actions e Show Close Button quando as ações já existirem fora do bloco, como o botão de criar registro acima da tabela. A estrutura se mantém e o conteúdo segue centralizado.

#### Motion

O padrão não tem animação própria: valem as dos componentes que ele usa (Main Button e Icon Button).

[Remover a tabela vazia (Enabled, Hovered, Loading, Pressed) ou preencher se o time definir entrada e saída da página — ver pendência 2]

#### Do's and Don'ts

Manter as 6 imagens e textos de hoje.

### Style

#### Anatomia

[Imagem: manter `anatomia-feedback-pages-sponsor` (7039:15189)]

1. Ilustração
2. Título
3. Descrição
4. Ação primária
5. Ação secundária
6. Botão de fechar

#### Estilos

A property **Kind** do .Feedback Content escolhe o cenário e traz a ilustração e o texto sugerido:

| Kind | Ilustração | Título sugerido | Descrição sugerida |
| --- | --- | --- | --- |
| Error | error | Não foi possível concluir | Parece que algo deu errado. Vamos tentar de novo? |
| Success | success | Ação concluída com sucesso | Tudo certo! Você pode seguir para o próximo passo. |
| Warning | alert | Atenção necessária antes de continuar | Para garantir sua segurança, revise as informações e prossiga. |
| Empty State | empty-state | Espaço pronto para novos conteúdos | Ainda não há nada aqui. Vamos começar adicionando o primeiro item? |
| No Results | search-not-found | Nenhum resultado encontrado | Sua busca não retornou nada. Tente outro termo ou limpe os filtros. |
| In Review | analysis | Análise em andamento | Recebemos sua solicitação e estamos verificando. Avisaremos em breve. |
| Processing | ja-vai | Operação em andamento | Estamos processando sua solicitação. Isso pode levar alguns instantes. |
| No Access | cadeado | Acesso não autorizado | Você não tem permissão para ver este conteúdo. Caso precise, fale com o administrador. |
| Not Found | logistica-estrada | Conteúdo não encontrado | A página ou informação que você procura não existe ou foi removida. |

[Imagens: manter os 9 frames de hoje (7039:15214 a 7039:15270)]

---

## 2. Feedback Page · Employee (`/p/60aec2`)

### Specs

**Introdução**

Padrão que comunica o resultado ou a condição de um fluxo. Reúne ilustração, mensagem e ações para que a pessoa usuária entenda o que aconteceu e saiba o que fazer em seguida. As ações usam o [Fixed Bar](LINK DO FIXED BAR), ancorado na base da tela. Pode ocupar a tela inteira ou uma seção dela.

[Imagem: manter o header `[Header] Feedback pages - Employee` (7039:17925)]

Nomes alternativos, Dúvidas e comentários, Quando usar e Utilize para: iguais aos do Sponsor.

#### Não utilize para:

- Mensagens rápidas ou transitórias: use o [Toast](https://castanha.caju.com.br/858426090/p/19d79d).
- Avisos que não interrompem o fluxo: use o [Alert](LINK DO ALERT).
- Confirmações e decisões imediatas: use o [Bottom Sheet](https://castanha.caju.com.br/858426090/p/40680f).
- Carregamento breve de um trecho da tela: indique o carregamento só naquele trecho.

### Guidelines

#### Diretrizes de uso

[Imagens: manter as 6 do Figma (7039:17707 a 7039:17752)]

As quatro diretrizes em comum com o Sponsor ficam com "tela" no lugar de "página" (como já estão hoje). As duas próprias do Employee:

- **Garanta a navegação de retorno na tela que consome.** O template não inclui cabeçalho. A tela que o consome é responsável por oferecer o caminho de volta, seja pelo header da navegação, seja pela ação do Fixed Bar.
- **Ajuste o template ao espaço que ele ocupa.** Na tela inteira, a tela assume a condição por completo e oferece a saída principal. Em uma seção, como uma lista ainda sem registros ou uma área de busca sem resultado, redimensione o template para a área correspondente e desligue Show Actions quando a ação já existir fora do bloco. A estrutura se mantém e o conteúdo segue centralizado.

#### Motion

O padrão não tem animação própria: valem as dos componentes que ele usa (Main Button e Fixed Bar).

#### Do's and Don'ts

Manter os 6 textos de hoje. [Imagens: hoje são as mesmas do Sponsor; trocar por versões com o Fixed Bar se o time tiver — ver pendência 1]

### Style

#### Anatomia

[Imagem: manter `anatomia-feedback-pages-employee` (7039:17339)]

1. Ilustração
2. Título
3. Descrição
4. Ação primária
5. Ação secundária

Sem botão de fechar: as ações ficam no Fixed Bar Pilled, sem Divider.

#### Estilos

Mesma tabela de Kinds do Sponsor.

[Imagens: **trocar** os 9 frames. Hoje a página usa os do Sponsor (7039:15214 a 7039:15270); entram os frames do Employee, com o Fixed Bar — ver pendência 1]

---

## 3. Tela de loading (`/p/8610b6`)

### Specs

**Introdução**

A Tela de loading é um padrão de feedback que informa à pessoa usuária que o sistema está processando uma solicitação. Ela ocupa a tela inteira e bloqueia a interação até a conclusão da ação.

[Imagem: manter o header `[Header] Tela de loading` (5953:10042)]

#### Nomes alternativos comuns

Loading screen, tela de processamento, tela de espera.

### Quando usar

Utilize a Tela de loading em carregamentos sistêmicos do produto que bloqueiam completamente a interface e exigem aguardo, especialmente quando não há necessidade de reforço visual ou emocional da experiência.

#### Utilize para:

- Processamentos internos do sistema.
- Transições entre estados que dependem de resposta do backend.
- Momentos em que a interface precisa ser bloqueada de forma neutra.

#### Não utilize para:

- Experiências que exigem impacto visual ou encantamento: nesses casos, use a [Splash screen](https://castanha.caju.com.br/858426090/p/94d008).
- Carregamento de conteúdo que pode ser antecipado.
- Atualizações parciais da interface.

### Casos de uso

#### Tela de loading vs carregamento parcial

A **Tela de loading** bloqueia a interface e não apresenta conteúdo intermediário. Quando é possível antecipar a estrutura da interface, prefira carregar só o trecho que muda e manter a percepção de progresso sem interromper toda a interação.

[Imagem: `comp-vs-comp-Tela de loading-01` (5896:9929) mostra um Skeleton — ver pendência 3]

#### Tela de loading vs Splash screen

A **Tela de loading** é funcional e neutra, usada em carregamentos sistêmicos do produto. Já a [Splash screen](https://castanha.caju.com.br/858426090/p/94d008) tem caráter mais visual e é usada quando se quer criar impacto ou percepção de valor durante o carregamento ("efeito wow").

[Imagem: manter `comp-vs-comp-Tela de loading-02` (5896:9936)]

### Guidelines

#### Diretrizes de uso

- **Use em momentos coerentes com bloqueio total.** A Tela de loading deve aparecer apenas quando a pessoa usuária realmente não pode interagir com a interface.
- **Garanta relação com a ação anterior.** O estado de loading deve ser claramente consequência de uma ação da pessoa usuária ou de uma transição esperada no fluxo.
- **Prefira alternativas menos intrusivas quando possível.** Antes de usar a Tela de loading, avalie se carregar só o trecho atende ao contexto, reduzindo a sensação de espera.

#### Motion

O avanço é o da [Progress Line](LINK DA PROGRESS LINE); o padrão não tem animação própria.

### Style

#### Anatomia

[Imagem: manter `anatomia-Tela de loading` (5869:2460)]

1. Progress Line
2. Loading label

O label diz o que está acontecendo, no gerúndio e com reticências: "Estamos processando sua solicitação...". A Progress Line recebe o mesmo texto como nome acessível.

---

## Pendências — não publicar

1. **Employee, Estilos e Do's and Don'ts:** a página repete os frames e as imagens do Sponsor (nodes 7039:15214 a 7039:15270, imagens com o mesmo hash). Faltam no Figma os frames do Employee por Kind (tela 360 × 640 com o Fixed Bar Pilled) para trocar.
2. **Motion:** nas três páginas a seção é o texto-modelo ("Explicação sobre o funcionamento do motion…") com a tabela Enabled/Hovered/Loading/Pressed vazia, estados que não se aplicam a uma página. Proposta: dizer que o padrão não tem motion próprio; se o time quiser especificar a entrada da página, usar um Motion Style do tema (padrão `/01`).
3. **Skeleton:** citado em "Não utilize para" (Sponsor e Employee), em Casos de uso e na terceira diretriz da Tela de loading, mas não existe no DS nem no Hub. O texto acima tira a referência; se o Skeleton estiver previsto, manter e linkar quando a página existir. A imagem `comp-vs-comp-Tela de loading-01` mostra um Skeleton.
4. **Links:** Alert, Fixed Bar e Progress Line sem link (preencher `LINK DO …` com a página de cada um no Hub). Toast, Modal, Bottom Sheet e Splash screen usam o endereço curto `/p/<id>`, que funciona; conferir se vale passar para `/v/latest/p/…`.
5. **Tela de loading:** espaço duplo no começo de "Carregamento de conteúdo que pode ser antecipado" e itens sem ponto final; status **Improvement** no Hub (o playground mostra o aviso "Em melhoria").
6. **Tokens com "Commom":** os blocos de design mostram `Commom.Colors.…` em Linked tokens. No Figma a variável se chama `Common/Colors/Surface/default` (coleção Brand Style, conferido em 05/10), então o erro está no conjunto de tokens do zeroheight, não no Figma nem no texto da página. Corrigir o nome lá corrige todas as páginas.
7. **Ações nos exemplos:** no Figma os botões vêm como "Label". O playground usa rótulos de exemplo por Kind (Tentar de novo, Continuar, Revisar, Adicionar item, Limpar filtros, Entendi, Voltar ao início). Se o time quiser, levar esses rótulos ao Figma.
