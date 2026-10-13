/* Glossário do Relatório (onboarding dos Relatórios, fase R1 · docs/PLANO-ONBOARDING.md §7.3 e §7.4)
   Fonte única dos termos que quem chega ao Relatório não conhece. Usada de dois jeitos pelo scripts/report.js:
     · a tab Glossário (bloco glossary das docs, com busca);
     · a primeira vez que o termo aparece numa tab vira um Link do DS que abre um Popover com a definição (clique ou Enter,
       Esc fecha). Hover não serve: nada essencial pode depender dele (WCAG 1.4.13 e 3.1.3, plano §14.4).
   Cada termo: { term, match: regex do texto (a ordem importa: o mais específico antes), def }.
   O glossário do Conteúdo (Vocabulário e Nomenclatura) é de produto, para quem usa a Caju, e fica de fora. */
(function(){
  window.CDS = window.CDS || {};
  CDS.reportGlossary = [
    { term: "Regra D40", match: /Regra D40/, def: "Decisão D40: o código segue o Figma. O que muda no código vira exceção aprovada ou débito registrado." },
    { term: "D + número", match: /\bD\d{2,3}\b/, def: "Decisão registrada no Roadmap, na seção Decisões, com a data e o motivo. Ex.: D328." },
    { term: "C + número", match: /\bC\d{2,3}\b/, def: "Item do Conferir: uma divergência entre o Figma e o código, com o que falta decidir ou corrigir. Ex.: C198." },
    { term: "Q + número", match: /\bQ\d{1,2}\b/, def: "Dúvida registrada no Roadmap enquanto espera a resposta do time." },
    { term: "Conferir", match: /\bConferir\b|\bCONFERIR\b/, def: "Lista das divergências entre o Figma e o código, por tipo (texto, UI, motion, nomes…). Cada item tem um código C." },
    { term: "Exceção aprovada", match: /[Ee]xceç(?:ão|ões) aprovadas?/, def: "Diferença entre o código e o Figma aceita de propósito: decisão do time, falta de especificação ou adaptação para a web." },
    { term: "Débito", match: /\b[Dd]ébitos?\b/, def: "Diferença entre o Figma e o código que ainda vai ser corrigida, de um lado ou do outro." },
    { term: "Segue o Figma", match: /[Ss]egue o Figma/, def: "O código faz o mesmo que o Figma, sem adaptação." },
    { term: "Smoke", match: /\b[Ss]moke\b/, def: "Teste automático que abre cada componente e cada doc no navegador (claro, escuro e celular) e reprova o que quebrou. Roda em todo envio para o GitHub." },
    { term: "Aviso", match: /\b[Aa]visos?\b/, def: "Problema que o smoke encontrou sem quebrar a página, como um contraste abaixo do recomendado. Cada aviso tem um item no Conferir." },
    { term: "Peso da primeira visita", match: /[Pp]eso da (?:1ª|primeira) visita/, def: "Quanto o navegador baixa para abrir o portal pela primeira vez, já comprimido. O orçamento é de 600 KB." },
    { term: "gzip", match: /\bgzip\b/, def: "Compressão que o servidor aplica nos arquivos antes de enviar. O peso do portal é medido assim." },
    { term: "Inventário", match: /\b[Ii]nventário\b/, def: "Lista dos componentes publicados na lib do Figma, com o número de variantes de cada set (Roadmap, seção 2)." },
    { term: "Set", match: /\bsets\b/, def: "Componente do Figma com variantes. Um componente pode ter mais de um set, como Checkbox e Checkbox Group." },
    { term: "Variante", match: /\b[Vv]ariantes\b/, def: "Cada combinação de propriedades de um set no Figma, como Kind Default com Size Small." },
    { term: "Building block", match: /\b[Bb]uilding blocks?\b/, def: "Peça interna de um componente no Figma, com o nome começando por ponto (ex.: .Footer). Não é publicada sozinha e não conta como componente." },
    { term: "Branch", match: /\b[Bb]ranch\b/, def: "Cópia de trabalho de um arquivo do Figma. O que está em branch ainda não chegou à lib publicada." },
    { term: "Lib", match: /\blib\b/, def: "A biblioteca do Castanha DS publicada no Figma, de onde os times de produto usam os componentes." },
    { term: "Template", match: /\b[Tt]emplates\b/, def: "Tela montada com componentes do DS, como o Header do Sponsor. Fica no menu Templates e não conta como componente." },
    { term: "Composição", match: /\b[Cc]omposiç(?:ão|ões)\b/, def: "Montagem com componentes do DS que o portal usa e que não existe na lib, como as teclas dos atalhos. Não conta como componente." },
    { term: "Stack", match: /\b[Ss]tacks\b/, def: "Cada lugar onde o DS existe: o Figma, o castanha-react (web) e o castanha_flutter (app)." },
    { term: "Divergência alta", match: /[Dd]ivergências? altas?/, def: "No check das stacks: o código lê uma prop ou gera um valor que não existe no Figma. A tradução quebra." },
    { term: "Divergência média", match: /[Dd]ivergências? médias?/, def: "No check das stacks: o resultado muda sem quebrar, como um padrão diferente ou uma opção sem tradução." },
    { term: "Code Connect", match: /\bCode Connect\b/, def: "Recurso do Figma que liga cada componente da lib ao código do castanha-react, para o Dev Mode mostrar o código certo." },
    { term: "Mapa de props", match: /\bprop-map\b|\bmapas? de props\b/, def: "Arquivo que diz qual prop do Figma corresponde a qual prop do código, por componente. O check das stacks usa esses mapas." },
    { term: "MISSING-VARIANT", match: /\bMISSING-VARIANT\b/, def: "No check das stacks: uma prop ou variante do Figma que não chega ao código." },
    { term: "APPROXIMATION", match: /\bAPPROXIMATION\b/, def: "No check das stacks: o código chega perto do Figma, mas não igual, como uma prop com outro valor padrão." },
    { term: "castanha-ai", match: /\bcastanha-ai\b/, def: "Repositório interno de IA do Castanha. É o 4º vértice do check, ao lado do Figma, do React e do Flutter." },
    { term: "Lote", match: /\b[Ll]otes?\b/, def: "Grupo de componentes implementados juntos no portal, na ordem do Roadmap (seção Lotes)." },
    { term: "Token", match: /\b[Tt]okens\b/, def: "Valor com nome no tema (cor, espaço, raio, tipografia) que o Figma e o código usam igual. Ex.: Common/Sizes/16." }
  ];
})();
