/* Conteúdo — Princípios de escrita (Figma [CastanhaDS] Component use documentation · 📁 [NEW] Content → Como a Caju Fala,
   frame [Documentação] Princípios de escrita 6400:33150). O [OLD] Content é legado e fica de fora (PLANO-HUB).
   Textos literais do Figma; as telas de exemplo são refeitas com componentes do DS (as do Figma usam peças do app Employee). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var FIGMA = "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-33150";
  CDS.register({ id: "conteudo", name: "Conteúdo", resource: true, order: 2, figma: FIGMA });
  var ills = {}; ((window.CDS.assets || {}).illustrations || []).forEach(function(i){ ills[i.name] = i.src; });
  // Tela de exemplo: ilustração + título + texto + Fixed Bar (Pilled) com a ação principal
  function screen(ill, title, text, action){
    return { _tag: "div", class: "pg-cnt-phone", _children: [
      { _tag: "div", class: "pg-cnt-phone__body", _children: [
        { _tag: "img", class: "pg-cnt-phone__ill", src: ills[ill] || "", alt: "" },
        { _tag: "h4", class: "pg-cnt-phone__title", _text: title },
        { _tag: "p", class: "pg-cnt-phone__text", _text: text }
      ] },
      { _tag: "cds-fixed-bar", kind: "pilled", "primary-label": action, "show-secondary-action": false, "show-lead-icon": false }
    ] };
  }
  // Tela com Bottom Sheet (inline) sobre a lista de cartões
  function sheet(title, text){
    return { _tag: "div", class: "pg-cnt-phone pg-cnt-phone--sheet", _children: [
      { _tag: "cds-bottom-sheet", inline: true, "text-title": title, "show-footer": false, "show-close-button": false, _children: [
        { _tag: "p", class: "pg-cnt-phone__text", _text: text },
        { _tag: "cds-main-button", kind: "ghost", label: "Novo cartão", "show-lead-icon": false, "show-trailing-icon": false }
      ] }
    ] };
  }
  CDS.docs["conteudo"] = {
    source: FIGMA, sourceLabel: "Abrir Princípios de escrita no Figma",
    tabs: [
      { id: "principios-de-escrita", title: "Princípios de escrita", blocks: [
        { h2: "Princípios de escrita" },
        { p: "Os princípios te ajudam a pensar no texto de cada ponto de contato com a pessoa usuária. O que é importante? Como destacar? O que não precisa ser informado?" },

        { h2: "Mantenha o foco" },
        { p: "Entregue só o que é essencial. Menos informação, menos esforço para o usuário." },
        { ul: [
          "Destaque o que importa para aquele contexto: não tente dizer tudo de uma vez.",
          "Evite repetições: não repita informações que já aparecem na mesma tela.",
          "Use verbos diretos: alinhados a ação e objetivo do fluxo ou da tela.",
          "Seja objetivo: se a pessoa usuária precisa agir, deixe isso claro de imediato."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("documentos/rg-cnh-frente", "Confirme seus dados", "Preencha seus dados iguais aos seus documentos e finalize o cadastro! Vamos lá?", "Começar"),
            text: "Antecipe as informações relevantes (vai precisar dos documentos). O título informa o fluxo que a pessoa vai começar." },
          { kind: "dont", attrs: screen("documentos/rg-cnh-frente", "Confirmar dados pessoais", "Para finalizar seu cadastro, você precisa preencher seus dados. Após essa etapa, você precisa pedir o cartão físico.", "Começar"),
            text: "Não use infinitivo em títulos e não entre em detalhes de etapas futuras. Isso pode desestimular o usuário a finalizar o fluxo." }
        ] },

        { h2: "Encoraje e explique" },
        { p: "Quando a pessoa usuária precisar tomar uma ação, explique o motivo e o que acontece depois." },
        { ul: [
          "Dê contexto: por que essa ação é necessária e qual o benefício. Temos um playbook exclusivo para este tema.",
          "Mostre o resultado: o que mudou (ou não mudou) após a ação.",
          "Prepare para o próximo passo: se houver uma nova etapa, dê uma prévia.",
          "Erros têm solução: se algo deu errado, explique o motivo e sempre ofereça um caminho para resolver. Nunca deixe a pessoa travada ou sem saída."
        ] },
        { dodont: [
          { kind: "do", attrs: screen("seguranca/cadeado", "Protegemos seu acesso", "Sua segurança vem em primeiro lugar, autorize esse dispositivo para que apenas você acesse seu app!", "Fazer reconhecimento facial"),
            text: "Explicamos o valor da ação e porque é importante que ele faça." },
          { kind: "dont", attrs: screen("seguranca/cadeado", "Acesso bloqueado", "Você não ainda não fez seu reconhecimento facial e por isso, bloqueamos seu acesso.", "Fazer reconhecimento facial"),
            text: "Culpamos a pessoa usuária por não ter realizado uma ação burocrática do nosso app." }
        ] },

        { h2: "Escreva de forma simples" },
        { p: "Escreva para qualquer pessoa, não só para quem conhece o produto." },
        { ul: [
          "Tom humano: amigável, acessível, sem juridiquês ou termos técnicos.",
          "Palavras do dia a dia: evite termos complexos ou pouco comuns.",
          "Sem ambiguidade: a frase ou termo deve ter uma única interpretação possível.",
          "Facilite a leitura: prefira listas e frases curtas."
        ] },
        { dodont: [
          { kind: "do", attrs: sheet("Seu cartão físico vai expirar", "Para continuar fazendo pagamentos, peça um novo cartão físico sem custos adicionais."),
            text: "Use termos simples e estruturas gramaticais conversacionais." },
          { kind: "dont", attrs: sheet("Cartão físico próximo de expirar", "É necessário solicitar um novo cartão físico, visto que o seu vai expirar."),
            text: "Cuidado com termos complexos que não soam naturais ao discurso falado." }
        ] },
        { alert: { appearance: "informative", label: "Está na dúvida se seu texto é simples?", text: "Leia em voz alta e identifique se as palavras escolhidas soam naturais a fala." } },
        { note: "Fonte: Figma · 📁 [NEW] Content → Como a Caju Fala → [Documentação] Princípios de escrita. As telas do Figma usam peças do app Employee (Header Navigation Employee, Bottom Sheets / CardAboutToExpire); aqui foram refeitas com Fixed Bar, Bottom Sheet e Main Button do DS, com os mesmos textos. A seção Acessibilidade do frame ainda é rascunho (\"Tópico 1\") e fica de fora." }
      ] }
    ]
  };
})();
