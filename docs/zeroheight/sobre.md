# Sobre: Princípios de Design, Changelog e capa do Hub

Três páginas do Castanha Hub revisadas em 05/10/2026. Cada uma tem o texto pronto para colar e, no fim do arquivo, as pendências (remover antes de colar). Itens no `docs/CONFERIR.md`: C158 e C159.

---

## 1. Princípios de Design (Sobre · `/p/42fc2b`)

**Introdução**

Os **Princípios de Design da Experiência** estabelecem diretrizes estratégicas que orientam decisões de Design e Desenvolvimento em toda a Caju.

Eles garantem alinhamento entre equipes, promovem a padronização das experiências digitais e sustentam a escalabilidade e a eficiência na construção de produtos. Servem de base para manter a integridade e a consistência da identidade digital ao longo do tempo.

[Imagem: ícone de Simples — manter o desenho, nas cores do tema (ver pendência 2)]

### Simples

Facilitar e reduzir a curva de aprendizado, afinal estamos projetando sistemas com múltiplas regras. Ser simples e objetivo, sem inovar onde não precisa, com interfaces mais limpas e toques de alegria onde podemos encantar sem comprometer a jornada.

---

[Imagem: ícone de Eficiente]

### Eficiente

Uniformizar jornadas, habilitar atalhos, garantir a visibilidade da localização e dos estados atualizados para a pessoa usuária e aproveitar melhor o espaço da tela. Isso torna tudo mais claro e mais rápido, e dá orientação de contexto e de tarefa.

---

[Imagem: ícone de Consistente]

### Consistente

Projetar para diferentes tipos de produto com fluidez e capacidade de se adaptar a qualquer movimento do negócio, sem deixar de garantir consistência e coerência na Visão Cliente e no ecossistema Caju.

---

## 2. Changelog (Sobre · `/p/327118`)

**Introdução:** Histórico de atualizações a partir de março de 2026.

> [Entrada nova para o time completar: o que mudou no Hub desde maio. Ver pendência 5.]

### v1.1.2 — 05/05/2026

#### Conteúdo
* Número limite de caracteres para [Push Notification](https://castanha.caju.com.br/858426090/v/latest/p/191aee).

### v1.1.1 — 05/05/2026

#### Conteúdo
* Exemplos de Do's and Don'ts atualizados nos princípios de escrita (hoje em [Tom e Voz → Pilares](https://castanha.caju.com.br/858426090/v/latest/p/639b76)).

#### Componentes
* Main Button: novo padrão de label "Quero ser avisado" (ver [Main button](https://castanha.caju.com.br/858426090/v/latest/p/0983f6)).

### v1.1.0 — 24/04/2026

#### Templates
* [Feedback Pages](https://castanha.caju.com.br/858426090/v/latest/p/37d6b8): erros, alertas, sucesso e empty state.

### v1.0.0 — 27/03/2026

#### Componentes
* [Breadcrumbs](https://castanha.caju.com.br/858426090/v/latest/p/966c0d).

#### Conteúdo
* Novas diretrizes para envio de SMS.

[Vídeo atual: "Novidades Zeroheight.mp4" (13/04/2026) — manter, com a frase "Clique em Open a new tab para ver o vídeo explicativo desta release."]

---

## 3. Capa do Castanha Hub (`/p/111e49`)

**Introdução:** O **Castanha** é um Hub de soluções para criação de Experiências da Caju, desenvolvido para conectar ideias, pessoas e tecnologia. Ele une Ideação, Design e Código para garantir que os Produtos da Caju mantenham consistência com propósito.

**Atalhos principais** (trocar os links pelos do domínio atual)

| Atalho | Rótulo hoje | Rótulo sugerido | Link hoje | Link sugerido |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Components | Componentes | `zeroheight.com/…/0983f6-main-button` | `castanha.caju.com.br/858426090/v/latest/p/0983f6` |
| 2 | Content | Conteúdo | `zeroheight.com/…/108ccb-principios-de-escrita` (**página não existe mais**) | `castanha.caju.com.br/858426090/v/latest/p/639b76` (Tom e Voz → Pilares) |
| 3 | Ilustra | Ilustração | `zeroheight.com/…/943842-principios-de-ilustracao` | `castanha.caju.com.br/858426090/v/latest/p/943842` |
| 4 | Motion | Motion | `zeroheight.com/…/734995-principios-de-motion` | `castanha.caju.com.br/858426090/v/latest/p/734995` |

**Comece por aqui**

| Atalho | Texto | Link hoje | Link sugerido |
| :--- | :--- | :--- | :--- |
| Designers | Acesse o onboarding para designers. | `zeroheight.com/…/80dfb0-product-designers` (**página não existe mais**) | [Treinamento: Como usar as Documentações?](https://castanha.caju.com.br/858426090/v/latest/p/508bfb) — ou recriar a página de onboarding |
| Dev. Flutter | Acesse o onboarding para desenvolvedores mobile. | `castanha-staging-flutter.caju.com.br` | manter (conferir se o staging ainda é o endereço certo) |
| Dev. React | Acesse o onboarding para desenvolvedores web. | `castanha-staging.caju.com.br/?path=…` | manter (conferir se o staging ainda é o endereço certo) |

---

## Pendências — não publicar

**Princípios de Design**
1. Texto: "tipos de **P**rodutos" e "movimento do **N**egócio" em minúscula; "Ser simples, objetivo e não inovar onde não precisa com interfaces mais limpas, trazendo…" dividido para ler melhor; "estabelecendo orientação" → "e dá orientação". O sentido não mudou.
2. Os três ícones usam `#DF3141` (vermelho) e `#F7F3ED` (fundo), que não são tokens do tema: o Accent do DS é `#E80537`. Redesenhar com os tokens (C159).

**Changelog**
3. Quatro links levavam à capa do Hub porque as páginas saíram ou mudaram: Notificações (limite de caracteres) → Push Notification; Princípios de escrita → Tom e Voz → Pilares (confirmar se é o equivalente); Feedback pages → Feedback Pages em Experiências e Jornadas; **SMS** → não há mais página de SMS no Hub (Canais tem Push, In-app e E-mails), então o link foi tirado. Se as diretrizes de SMS foram para outra página, recolocar.
4. O link do Main Button apontava para o editor do zeroheight (`castanha.zeroheight.com/styleguide/…`): quem não é editor cai no login. Trocado pelo endereço público.
5. **Parado desde maio de 2026.** O Hub de hoje tem seções que o Changelog não cita e que são candidatas a entrar (confirmar com o time se vieram depois de maio, com datas e versões): a organização atual do Conteúdo (Tom e Voz, Formatação de Dados, Vocabulário, Experiências e Jornadas, Histórico), Patterns e Templates (Feedback Page Sponsor e Employee, Tela de loading), o Borô em Agentes e Skills e páginas de componentes como Quantity Input, Credit Card Input, Accordion, Accordion Item, Progress Tracker e Nav Control.
6. Datas no formato do guia Datas e Horários (compacto, "05/05/2026") e travessão no lugar do "I" ("v1.1.2 I Maio 05.2026" → "v1.1.2 — 05/05/2026").
7. Títulos em português, como o Hub ("Components" → "Componentes"; "Content" → "Conteúdo").

**Capa**
8. Todos os atalhos usam o domínio antigo `zeroheight.com/858426090/p/…`; trocar pelo `castanha.caju.com.br`.
9. "Content" e "Designers" levam a páginas que não existem mais (ver a tabela).
10. Rótulos misturados e cortados ("Components", "Ilustra", "Content"): padronizar em português.
11. No playground, o atalho "Designers" do Início já leva ao Treinamento (C158).
