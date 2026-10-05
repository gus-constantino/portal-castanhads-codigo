# Fundação · Ilustração: as 9 páginas

Revisão de 05/10/2026 das páginas de Fundação → Ilustração do Castanha Hub, comparadas com a tab **Caju - Tema → Ilustrações** do playground e com a biblioteca `assets/illustrations/catalog.json`. As páginas estão completas; o que falta é acerto de texto, links e algumas contradições. São edições diretas no Hub, página por página. Item no `docs/CONFERIR.md`: C164.

---

## 1. Ilustração (visão geral · `/p/56b925`)

Sem mudanças de conteúdo. Sugestão: "atrair a atenção do usuário" → "da pessoa usuária", como no resto do Hub.

## 2. Princípios de ilustração (`/p/943842`)

Sem mudanças.

## 3. Painel semântico (`/p/200812`)

- "Anita **Malfati**" → "Anita **Malfatti**".
- "estão presentes no dia a dia dos brasileiros, e serviram" → "presentes no dia a dia dos brasileiros serviram" (vírgula entre sujeito e verbo).
- "construção do mood" → "construção do clima" (ou manter "mood", mas sem misturar idiomas no resto da página).

## 4. Guidelines (`/p/93c9ee`)

**Links**
- Tamanhos: "[Categorias](https://zeroheight.com/858426090/p/890f97)" usa o domínio antigo → `https://castanha.caju.com.br/858426090/v/latest/p/890f97-categorias`.
- Tamanhos: `…/p/991142-aplicacoes-update` → `…/v/latest/p/991142-aplicacoes` (slug antigo).

**Texto**
- "As ilustrações **tem** uma paleta" → "**têm**".
- "Sempre aplicar **de** tons quentes sobre tons quentes" → "Sempre aplicar tons quentes sobre tons quentes".
- "formas sobrepostas.Além disso" → falta espaço depois do ponto.
- Espaço dentro do negrito ("**baixo contraste **em", "**tons frios **sobre", "**tons quentes **sobre"): tirar o espaço antes do fechamento.
- "/" solto no fim da seção Tamanhos, antes de Formas: apagar.

**Contradições**
- **Legendas das imagens de Linhas trocadas:** a imagem `guidelines-linhas-bompracaju` (o lado "faça") tem legenda negativa ("Não aplicar tons frios sobre tons quentes"); a `guidelines-linhas-semsabor2` (o lado "não faça") tem a positiva ("Sempre aplicar tons quentes sobre tons quentes"). Trocar as legendas ou as imagens.
- **Regra de Linhas:** o texto pede para "obedecer a relação entre cores quentes x cores frias", e a legenda manda "quentes sobre quentes". Sugestão: "As linhas de contorno ficam em tons quentes sobre formas em tons quentes; não use tons frios sobre quentes nem linhas com baixo contraste."
- **Tamanhos:** aqui as ilustrações entram "por meio de Slots"; em Do's & Don'ts e Biblioteca, por Variants Size (80, 144, 200 e 320). Os dois valem (o Slot recebe a instância, a variant escolhe o tamanho): dizer isso numa frase só. Os tamanhos Hero (360 × 440 e 673 × 768) não são valores de Size: dizer que são componentes à parte.

## 5. Categorias (`/p/890f97`)

O Hub tem 5 categorias (Personagens, Objetos, Feedback, O Juca, Hero). A biblioteca do Figma tem 19 pastas (Alimentos, Autenticação, Comunicação, Finanças, Notificações, Hero Employee, Hero Sponsor…). Sugestão: dizer que as 5 são **tipos de uso**, e as pastas da biblioteca são **assuntos**: Feedback fica em Notificações, Hero em três pastas. **O Juca** não tem nenhuma ilustração na biblioteca: confirmar se existe e onde está.

## 6. Aplicações (`/p/991142`)

- "mas há uma **excessão**" → "**exceção**".
- "Assim como ocorre em. Employee" → "Assim como ocorre em Employee" (ponto solto).
- "**menos detalhes**.  Por isso" → espaço duplo.
- Espaço dentro do negrito: "**clareza **e", "**comunicam falhas **de".
- Caixa dos títulos: "Cenários de Uso" → "Cenários de uso"; "Telas de Sucesso" → "Telas de sucesso"; "Estados Vazios e Páginas Vazias" → "Estados vazios e páginas vazias".
- "Splash Screen" aqui e "Splash Page" em Do's & Don'ts: usar **Splash Screen** (é o nome do componente).

## 7. Biblioteca de ilustrações (`/p/48f60e`)

- "ilustras" → "ilustrações".
- O link "[aqui]" leva ao arquivo **4. [Castanha DS] Illustration** (`ndW0akp113d6seA4iY36r6`). O playground importa a biblioteca de **[Caju] Illustrations** (`9l54k2iyKGMaiIbsGGmEiM`). Confirmar qual é o arquivo oficial hoje e usar o mesmo nome no Hub, no Do's & Don'ts ("Busque por 4. [Castanha DS] Illustration") e no playground (pendência 1).
- O link leva o parâmetro de rastreio `&t=…`: pode tirar.
- Texto do link: "aqui" → "Abrir a biblioteca no Figma" (link com texto que diz para onde vai).

## 8. Do's & Don'ts (`/p/6590b0`)

- Título da página: "Do's & Don'ts" → "Do's and Don'ts", como nas docs de componentes.
- "toda vez alguma mudança" → "toda vez que houver alguma mudança".
- "você pode **conferí-las**" → "**conferi-las**".
- "Dar Detach **podem** causar" → "**pode** causar".
- "nas **propriedade** Size" → "na **propriedade** Size".
- "consulte o capítulo 5. Aplicações": o Hub não numera páginas → "consulte [Aplicações](link)".
- Espaços duplos: "por exemplo.  Para", "**Instâncias**.  Dar", "entre elas.  Evite".
- "Splash Page" → "Splash Screen".

## 9. Como solicitar ilustrações (`/p/90d47a`)

- "podem mandar DM" → "mande uma DM" (a frase não tem sujeito).
- "Novas Ilustrações" → "Novas ilustrações".
- O pedido vai para uma pessoa por nome. Sugestão: deixar o canal #castanha-suporte como caminho principal e citar o papel ("time de Ilustração"), para a página não envelhecer se a pessoa mudar de time.

---

## No playground (Caju - Tema → Ilustrações)

- Entraram:
  - a introdução da visão geral;
  - os Elementos culturais do Painel semântico;
  - as regras de Linhas, como Do's and Don'ts só de texto;
  - os exemplos de texto alternativo, e uma frase dizendo quando a ilustração fica sem alt;
  - a introdução de Aplicações;
  - a seção "Como solicitar ilustrações", que aponta para o canal, sem nome de pessoa.
- Corrigidos os erros que tinham sido copiados do Hub: têm, exceção, Malfatti, "toda vez que houver", "pode causar", "propriedade", "ilustrações" e "Don'ts".
- "capítulo 4/5" virou referência à seção da própria página.
- Tamanhos: a frase agora fala em Slots e na property Size.
- Títulos: "Painel semântico", "Telas de sucesso", "Telas de erro", "Splash Screen".

## Pendências — não publicar

1. Arquivo oficial da biblioteca: 4. [Castanha DS] Illustration (Hub) × [Caju] Illustrations (playground).
2. O Juca: não há ilustração dele na biblioteca.
3. Legendas de Linhas: confirmar qual imagem é "faça" e qual é "não faça".
4. Alt text: o Hub diz "em breve teremos a opção do Alt Text". Os componentes do playground já tratam a ilustração como decorativa (`alt=""`) quando o texto ao lado diz tudo; confirmar a regra com o time e atualizar o Hub.
