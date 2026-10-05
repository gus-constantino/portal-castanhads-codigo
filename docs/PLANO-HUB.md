# Plano — Castanha Hub, Escrita, Ilustração e Motion no playground

Pedido (05/10/2026): trazer o conteúdo do zeroheight — capa do **Castanha Hub**, **Princípios de ilustração**, **Princípios de escrita** e **Princípios de Motion** — usando só o que for **estável**; o que for legado fica de fora para revisar depois (se existe doc estável no Figma ou se precisa fazer). Referência Figma: [CastanhaDS] Component use documentation (`Qvg0i4wjEoHVcPZo3grMq4`). Trabalho na branch `teste`.

## 1. O que existe e o que é estável

| Conteúdo | zeroheight | Figma (Component use documentation) | Estável? |
|---|---|---|---|
| **Castanha Hub** (capa) | Página 111e49: texto de abertura + atalhos (Components, Content, Ilustra, Motion) + "Comece por aqui" (Designers, Dev Flutter, Dev React) | — | ✅ |
| **Princípios de Motion** | 734995 (*Available*): 3 pilares — Simples, Eficiente, Consistente | — | ✅ |
| Motion · Velocidade | 24e587 (*Available*): curvas produtivas e expressivas **com quando usar**, 12 regras Do/Don't, durações por família com uso | — | ✅ |
| Motion · Transições | 757a5f (*In progress*) | — | ⏸ fora (não estável) |
| **Princípios de escrita** | Link 108ccb aponta para uma página que **não existe mais** | `📁 [OLD] Content` → Princípios de escrita (**legado**) · `📁 [NEW] Content` → **Como a Caju Fala** → `[Documentação] Princípios de escrita` (105 textos) | ✅ usar o **[NEW]** · o [OLD] fica de fora |
| Restante do [NEW] Content | Seção "Conteúdo" (Tom e Voz, Formatação de Dados, Vocabulário…) | Vocabulário (5 frames), Formatação de dados (7), Escrevendo para produto (1), Componentes (7), Contextos (3), Canais (6) | ✅ — **fora do pedido**, fica para uma fase seguinte |
| **Princípios de ilustração** | 943842: só a introdução sai pelo MCP (o resto parece imagem/embed — conferir no Chrome) | `IL-Intro`, `IL-Princípios`, `IL-Como solicitar` estão **vazias** · com conteúdo: Painel Semântico (1 frame), Guidelines (Cores, Formas, Linhas, Tamanhos, Categorias, Acessibilidade), Aplicações (Cenários, Employee, Sponsor), Biblioteca, Do's & Don'ts | ✅ (o que existe) |

### Divergências já vistas (vão para o CONFERIR)
- **Velocidade × tokens do Figma:** a tabela do zeroheight diz Expressive/default = `0.4, 0, 0.1, 1` e Expressive/accelerate = `0.9, 0, 0.7, 1`, mas o próprio texto e as variáveis do Figma usam `0.6, 0, 0.1, 1` e `0.9, 0, 0.6, 1`. O playground segue o Figma.
- **Durações:** o zeroheight chama 8000ms de `extra-long/05`; no Figma é `Extended/01`. `Short/00` (0ms) não aparece no zeroheight.
- **Princípios de escrita:** o link da capa do Hub (108ccb) está quebrado.

## 2. Onde entra no playground

- **Início (Castanha Hub)** — nova página de entrada: texto de abertura e atalhos em Cards do DS (Componentes, Conteúdo, Ilustração, Motion) + "Comece por aqui" com Links do DS para os onboardings (Designers, Dev Flutter, Dev React).
- **Caju - Tema → Motion** — os 3 pilares no topo; o "quando usar" de cada curva e de cada família de duração (Velocidade) nos cartões que já existem; as 12 regras como Do/Don't.
- **Caju - Tema → Ilustrações** — antes da biblioteca: Princípios (introdução), Painel semântico, Guidelines, Aplicações e Do's & Don'ts.
- **Conteúdo** (novo item do menu) — tab **Princípios de escrita** (do [NEW]); as demais páginas do [NEW] Content entram depois, se você quiser.

Tudo com componentes e tokens do DS; exemplos visuais com as ilustrações e componentes reais quando possível.

## 3. Fases (cada uma: build, auditoria, smoke, conferência no navegador, commit na `teste`)

| Fase | Escopo | Tamanho |
|---|---|---|
| H0 | Início (Castanha Hub) — **feito** | pequeno |
| H1 | Motion: pilares + Velocidade (uso das curvas e durações) + regras; CONFERIR das divergências — **feito** (D84) | médio |
| H2 | Conteúdo → Princípios de escrita ([NEW]) — **feito** (D85) | médio |
| H3 | Ilustração: princípios + Painel semântico + Guidelines + Aplicações + Do's & Don'ts — **feito** na tab Ilustrações, antes da biblioteca (D88) | grande |
| Depois | Restante do [NEW] Content — **feito** (tabs Escrevendo para produto, Vocabulário, Formatação de dados, Componentes, Contextos e Canais); Motion · Transições quando ficar estável | a decidir |

## 4. Limitações
- **Imagens do zeroheight/Figma** (GIFs de motion, prints de telas nos Do/Don'ts e Aplicações) não podem ser baixadas por aqui (o curl está bloqueado e o MCP só devolve link temporário). Onde der, refaço com componentes/ilustrações reais; onde não der, fica o texto, ou você exporta os arquivos.
- **Chrome logado**: uso só para **ler** a página de Princípios de ilustração, se precisar.
