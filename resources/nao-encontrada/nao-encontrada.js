/* Página não encontrada — abre em qualquer rota desconhecida (notFound: true; ver currentId no app.js), em vez de cair
   no Início sem avisar. hidden: fora do menu, da busca, do anterior/próximo e do MCP. Estado vazio = componente local
   <loc-vazio> (local/vazio), do conceito do Castanha Assets (D225). */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  CDS.register({ id: "nao-encontrada", name: "Página não encontrada", resource: true, hidden: true, notFound: true, order: 99 });
  CDS.docs["nao-encontrada"] = {
    tabs: [
      { id: "vazio", title: "Página não encontrada", blocks: [
        { vazio: { heading: "Esta página não existe", text: "O link pode estar quebrado ou a página mudou de lugar. Use a busca do menu ou volte para o Início.", link: { label: "Ir para o Início", href: "#/" } } }
      ] }
    ]
  };
})();
