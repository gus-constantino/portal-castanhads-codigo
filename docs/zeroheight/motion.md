# Fundação · Motion: Princípios de Motion, Velocidade e Transições

Revisão de 05/10/2026 das três páginas de Motion do Castanha Hub, conferidas contra as variáveis do Figma (coleção Brand Style, `Common/Motion/*`, snapshot em `tokens/figma-snapshot.json`). No playground o conteúdo está em **Caju - Tema → Motion**, com os valores do Figma. Item no `docs/CONFERIR.md`: C163.

Resumo: o texto das páginas está bom. Os problemas estão nos **valores e nomes dos tokens**: três curvas do Hub não batem com o Figma, faltam tokens que existem e a página Transições tem durações que não batem com os tokens que ela mesma cita.

---

## 1. Princípios de Motion (`/p/734995`)

**Introdução (corrigida)**

O motion do Castanha é projetado para criar experiências fluidas, intuitivas e agradáveis, com base em três pilares: **Simples, Eficiente e Consistente**. O movimento torna as interações suaves e harmoniosas, refletindo a simplicidade e o acolhimento brasileiro.

Os três cards ficam como estão.

O que mudou: "É projetado" não tinha sujeito; "acolhimento brasileiro" ganhou o artigo ("e o acolhimento"); "para os usuários" saiu (repetia "experiências").

---

## 2. Velocidade (`/p/24e587`)

### Curvas: o que corrigir

Valores do Figma (fonte da verdade) × o que o Hub mostra:

| Token no Figma | Valor no Figma | Hub: linha "Bezier" | Hub: linha "Token" | Situação |
| --- | --- | --- | --- | --- |
| `Systemic/default` | 0.7, 0, 0.5, 1 | 0.70, 0.00, 0.50, 1.00 | 0.7, 0, 0.5, 1 | ✅ |
| `Systemic/accelerate` | 0.7, 0, 0.8, 1 | 0.70, 0.00, 0.80, 1.00 | 0.7, 0, 0.80, 1 | ✅ |
| `Systemic/decelerate` | 0.2, 0, 0.3, 1 | 0.20, 0.00, 0.30, 1.00 | 0.2, 0, 0.3, 1 | ✅ |
| `Systemic/smooth` | 0.42, 0, 0.58, 1 | — | — | ❌ falta no Hub |
| `Expressive/default` | 0.6, 0, 0.1, 1 | 0.60, 0.00, 0.10, 1.00 | **0.4**, 0, 0.1, 1 | ❌ linha Token errada |
| `Expressive/accelerate` | **0.2, 0, 0.9, 1** | 0.90, 0.00, 0.60, 1.00 | 0.9, 0, **0.7**, 1 | ❌ valor de outra curva; as duas linhas também discordam entre si |
| `Expressive/decelerate` | 0.4, 0, 0.1, 1 | 0.40, 0.00, 0.10, 1.00 | 0.4, 0, 0.10, 1 | ✅ |
| `Expressive/overshoot` | 0.9, 0, 0.6, 1 | — | — | ❌ falta no Hub |

O valor que o Hub chama de **Expressive accelerate (0.9, 0, 0.6, 1)** é, no Figma, o **Expressive overshoot**. Ou o Hub ficou de antes de uma renomeação, ou o Figma mudou: decidir com o time qual vale (pendência 1) e corrigir o outro.

### Curvas: textos

- **Systemic accelerate** usa o mesmo texto e a mesma imagem do Expressive accelerate ("Entrada fluida com antecipação suave. Chama atenção sem pressa. Ideal para elementos com impacto narrativo."). Falta o texto próprio (pendência 2).
- **Systemic accelerate e Systemic decelerate** usam a mesma imagem de curva (o mesmo arquivo).
- "Easing **de** Accelerate" → "Easing Accelerate", como os outros títulos.
- Nomes dos tokens: o Hub escreve `castanhaDS /motion/ easing/systemic/ default`, com espaços e caixa variando de linha a linha. No Figma é `Common/Motion/Easing/Systemic/default`. Usar o nome do Figma em todas as tabelas.
- "Curvas Produtivas" no título e "Systemic" no token: dizer uma vez que **Produtivas = Systemic**.
- Texto sugerido para **Smooth**: "Curva simétrica e suave, para movimentos contínuos que não chamam atenção para o começo nem para o fim (ex.: rolagem e mudanças de cor)." Confirmar com o time.
- Texto sugerido para **Overshoot**: "Passa um pouco do ponto e volta. Dá energia e personalidade; use com moderação, em momentos de celebração ou destaque." Confirmar com o time.

### Duração

Valores conferidos com o Figma: 50 a 1000ms batem. O que corrigir:

- **Falta `Short/00` = 0ms** (existe no Figma).
- **"extra-long / 05 = 8000ms"** é, no Figma, `Common/Motion/Duration/Extended/01` (8s). Trocar o nome e explicar o uso (animações contínuas, como o loop do Spinner?), porque 8s não é "extra-long" no mesmo sentido.
- Nomes dos tokens com espaços variados (`short / 04`, `medium / 01`): usar `Common/Motion/Duration/Short/04` etc.
- Caixa dos títulos: "Short durations", "Medium durations", "Long durations", "Extra-long durations" (hoje alterna "Short Durations" / "Medium durations").

### Delay

O Figma tem tokens de **Delay** (`Common/Motion/Delay/Short/00` a `Long/01`: 0, 32, 56, 80, 104, 128, 184, 200 e 384ms). O Hub não fala de delay. Sugestão: seção nova "Delay" com a tabela e uma frase de uso ("Atraso antes de começar o movimento, para escalonar elementos que entram juntos"); o playground já mostra os delays.

### Regras

Os 12 itens de Do/Don't estão bons. Ajustes de texto:
- Don't 1 ("A escolha da curva de easing é tão importante quanto a duração.") não é uma proibição. Sugestão: "Não escolha a curva por gosto: ela pesa tanto quanto a duração."
- Don't 5 ("Não criar feedbacks quase imperceptíveis.") → "Não crie feedbacks quase imperceptíveis."
- Don't 6: "não use quando desperdiça o tempo do usuário" → "não use movimento que desperdiça o tempo da pessoa usuária".
- "usuário" → "pessoa usuária", como no resto do Hub.

---

## 3. Transições (`/p/757a5f`, status In progress)

### Durações que não batem com os tokens citados

| Transição | Duração na tabela | Token citado | Valor do token | Situação |
| --- | --- | --- | --- | --- |
| Nível superior | 250ms | `Duration/Medium/01` | 250ms | ✅ |
| Para frente e para trás | 350ms (600ms no arrastar) | `Duration/Long/02` | 500ms | ❌ 350ms é `Medium/03`; 600ms é `Long/04` |
| Lateral | 500ms | `Long/04` e `Medium/01` | 600ms e 250ms | ❌ 500ms é `Long/02`; a segunda linha não diz a que se aplica |
| Entrar e sair (Bottom Sheet) | 500ms entrada · 300ms saída · 250ms fundo | `Long/04` | 600ms | ❌ entrada 500 = `Long/02`; saída 300 = `Medium/02`; fundo 250 = `Medium/01` |
| Transformação | 600ms | `Long/04` | 600ms | ✅ |

E as curvas citadas: Lateral, Entrar e sair e Transformação usam "expressive / accelerate / 0.90, 0.00, 0.60, 1", que no Figma é o **overshoot** (ver Velocidade). Depois da decisão da pendência 1, revisar se essas três transições usam mesmo uma curva com overshoot.

### Valores errados nas tabelas

- **Entrar e sair:** saída da Bottom Sheet com "876.59 → 876.59px" (não se move). Deve ser "409.59 → 876.59px". Escurecer do fundo na saída "0 → 20%" deve ser "20% → 0".
- **Transformação:** cor "E8537" está incompleta: o Accent é `#E80537`. Tamanho na abertura vai a 647.43 e no fechamento sai de **644.43**: um dos dois está errado.
- **Para frente e para trás:** a Escala da volta repete "100 → 132% → 111%" (igual à ida). Confirmar.
- Coluna Valor da Transformação usa "|" dentro da célula ("280 → 360 | 180 → 647.43"), o que quebra a tabela no zeroheight. Usar "largura 280 → 360 · altura 180 → 647.43".

### Ortografia

- "apos" → "após" (todas as linhas), "para tras" → "para trás", "pagina" → "página", "Botom Sheet" → "Bottom Sheet", "Saida" → "Saída", "esta" → "está", "ate" → "até", "nao" → "não", "uns 10%" → "cerca de 10%".
- "Sem vínculo direto " e títulos com negrito quebrado (`****Itens vizinhos**Comportamento: **`): revisar a formatação do bloco.
- "Tap arrasta" → "arrastar (gesto)".

### No playground

Transições continuam fora até a página sair de "In progress" e as durações acima serem decididas.

---

## Pendências — não publicar

1. **Expressive accelerate × overshoot:** o Hub chama de accelerate a curva 0.9, 0, 0.6, 1, que no Figma é o overshoot; o accelerate do Figma é 0.2, 0, 0.9, 1. Decidir qual vale. O playground segue o Figma.
2. Texto próprio para Systemic accelerate (hoje copiado do Expressive accelerate) e imagem própria para Systemic decelerate.
3. Convenção: no Hub, **accelerate** é "entrada" e **decelerate** é "remoção/saída". No Material e no Carbon é o contrário (accelerate para sair, decelerate para entrar). Confirmar se é intencional; se não, trocar os textos.
4. Textos de Smooth e Overshoot: os sugeridos acima precisam do time.
5. Durações da página Transições: confirmar com quem fez o protótipo qual vale, a tabela ou o token.
