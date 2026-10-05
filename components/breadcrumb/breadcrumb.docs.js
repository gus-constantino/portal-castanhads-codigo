/* Documentação — breadcrumb: tab Conteúdo (regras de texto)
   Fonte: [CastanhaDS] Component use documentation · 📁 [NEW] Content → Componentes · frame [Componentes] Breadcrumb (6400:15502).
   Textos literais do Figma; os exemplos usam componentes do DS (C114). Antes ficava em Conteúdo → Componentes (D98). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  // Breadcrumb do DS com os rótulos do Figma (sem Truncate)
  function crumbs(labels){ return { _tag: "cds-breadcrumb", collapse: "0", _children: labels.map(function(l){ return { _tag: "a", href: "#", _text: l }; }) }; }
  CDS.docs["breadcrumb"] = {
    tag: "cds-breadcrumb",
    source: "https://www.figma.com/design/Qvg0i4wjEoHVcPZo3grMq4/-CastanhaDS--Component-use-documentation?node-id=6400-15502", sourceLabel: "Abrir Breadcrumb em [NEW] Content no Figma",
    tabs: [
      { id: "conteudo", title: "Conteúdo", blocks: [
        { h2: "Regras de texto" },
        { p: "O breadcrumb é uma trilha de navegação que mostra à pessoa onde ela está dentro da hierarquia do produto. É um recurso de navegação secundária e não substitui o menu principal." },
        { h3: "Anatomia do conteúdo" },
        { p: "O breadcrumb sempre segue esta ordem:" },
        { ol: [
          "Página de origem — nível mais alto da hierarquia. Nunca omitida ou truncada.",
          "Links intermediários — páginas entre a origem e a atual. São clicáveis e podem ser truncados quando necessário.",
          "Página atual — último item da trilha. Exibido como texto simples, sem link e nunca truncado."
        ] },
        { h3: "Como escrever" },
        { ul: [
          "Use o mesmo nome que a página exibe em seu título ou na navegação principal. As labels precisam ser consistentes — elas ainda não são puxadas automaticamente do código, então exigem atenção redobrada.",
          "Mantenha a mesma label do início ao fim do fluxo. Se começou como \"Novo pedido\", não mude para \"Nova solicitação\" no meio do caminho.",
          "Seja conciso. Prefira nomes curtos e diretos. Se o nome for muito longo, use uma versão abreviada reconhecível — nunca invente um nome diferente do usado na navegação.",
          "Evite verbos e chamadas à ação. O breadcrumb é orientação, não ação. Exceção: quando o fluxo parte de uma ação, o verbo é permitido. Exemplo: `Relatórios`, `Configurações`, `Adicionar créditos` (quando o fluxo parte dessa ação)",
          "Sem pontuação nos rótulos. Os separadores entre itens são responsabilidade do componente.",
          "Use sentence case — primeira letra maiúscula, demais em minúsculo. Confira as exceções de maiúsculas na página Escrevendo para produto."
        ] },
        { h3: "Truncamento" },
        { p: "O truncamento é ativado quando o total de itens ultrapassa 5 ou quando não há espaço suficiente. Apenas os links intermediários são truncados e agrupados em um dropdown." },
        { p: "Nunca são truncados:" },
        { ul: ["Página de origem", "Última página ancestral (nível imediatamente acima da página atual)", "Página atual"] },
        { h3: "Breadcrumb vs. Stepper" },
        { p: "O breadcrumb reflete a hierarquia de navegação estática do produto. O stepper comunica o progresso dentro de um fluxo. Os dois têm responsabilidades distintas e não devem se sobrepor." },
        { p: "O primeiro item do breadcrumb deve ser sempre a página que originou o fluxo — não o \"Painel Inicial\" ou \"Home\". Isso garante que a pessoa consiga retornar ao contexto exato de onde partiu." },
        { h3: "Do's and Dont's" },
        { dodont: [
          { kind: "do", attrs: crumbs(["Créditos Caju", "Transferência entre carteiras"]), text: "O progresso dos passos de um fluxo (stepper) não deve ser representado no Breadcrumb. Ele reflete apenas a hierarquia de navegação estática do produto." },
          { kind: "dont", attrs: crumbs(["Painel inicial", "Transferência entre carteiras"]), text: "O primeiro item do Breadcrumb deve ser a página que originou o fluxo, e não o \"Painel Inicial\" ou ”Home”." }
        ] },,
        { note: "Fonte: Figma · 📁 [NEW] Content → Componentes → Breadcrumb. Regras de escrita do time de Content; os exemplos usam componentes do DS com os mesmos textos." }
      ] }
    ]
  };
})();
