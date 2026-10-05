---
title: Backdrop
introduction: Backdrop é um componente de superfície utilizado para criar uma camada de bloqueio visual entre o conteúdo base da interface e elementos em primeiro plano, como modais e drawers.
---

# Specs

Backdrop é um componente de superfície utilizado para criar uma camada de bloqueio visual entre o conteúdo base da interface e elementos em primeiro plano, como modais e drawers.

*Nomes alternativos comuns:* Overlay, scrim, layer de bloqueio.

---

## Quando usar

Utilize Backdrop sempre que um elemento em primeiro plano exigir foco exclusivo da pessoa usuária e bloquear temporariamente a interação com o restante da interface. Os principais componentes que exigem o uso de Backdrop são **Modal** (ou Dialog), **Drawer** e **Bottom Sheet**.

### Utilize para

* Criar barreira visual entre fundo e conteúdo ativo.
* Reduzir ruído visual da interface.
* Reforçar foco em modais, drawers e similares.
* Indicar bloqueio de interação no fundo.

### Não utilize para

* Apenas escurecer a interface sem mudança de estado.
* Criar efeito visual decorativo.
* Substituir hierarquia de layout.
* Destacar elementos que não bloqueiam interação.

<callout background="1" fullWidth="true">

**Importante:** o nome correto da camada é Backdrop. Não use "Overlay" na documentação nem nas interfaces.

</callout>

---

## Suporte

Dúvidas ou comentários? Fale com o time pelo canal [#castanha-suporte](https://caju.slack.com/archives/C07NM4UQ2S3).

---

# Style

## Anatomia

1. **Camada** *(obrigatório)* — `Surface/inversed` com opacidade `Common/Opacity/medium`, cobrindo toda a área interativa.

---

## Propriedades

O Backdrop não tem propriedades: é um componente fixo.

## Comportamento

Fica acima do conteúdo base e abaixo do elemento em foco. Modal, Drawer e Bottom Sheet já trazem a camada junto.

---

# Guidelines

## Acessibilidade

* O Backdrop é visual: o bloqueio de verdade vem do diálogo modal, que deixa o resto da página inerte.
* Sozinho, ele não impede o foco de chegar ao fundo.
* Quando o componente permite, o clique no Backdrop fecha a camada; mantenha também o fechamento por botão e por Esc.

## Diretrizes de uso

1. **Uso do componente da biblioteca:** utilize o componente Backdrop disponível na biblioteca do design system. Evite recriar manualmente.
2. **Posicionamento na hierarquia:** o backdrop deve estar acima do conteúdo base e abaixo do elemento em foco. Certifique-se de que ele cobre toda a área interativa.
3. **Bloqueio para edição:** recomenda-se bloquear o componente no Figma para evitar seleções acidentais durante a edição.

---

## Pendências — não publicar

* 🟡 A página atual lista "Overlay" como primeiro nome alternativo; a decisão do time é usar Backdrop. Manter Overlay só como sinônimo de busca.
* 🟡 A página atual não tem a tab Style; Anatomia veio do componente da lib (Backdrop 13784:3271, sem props nem description).
* 🟡 A página está em `Componentes > Images`; a categoria certa seria `Containers`, onde o componente vive na lib.
