/* GERADO por scripts/dev/import-storybook.js a partir do Storybook do castanha-react (origin/staging) e do Widgetbook do
   castanha_flutter (origin/main). Não editar à mão.
   Páginas de desenvolvimento por plataforma (platform: react ou flutter) e o Comece aqui (Sobre o Castanha).
   O texto é o das fontes; divergências com o guia de Conteúdo ficam no CONFERIR. */
(function(){
  window.CDS = window.CDS || {}; CDS.docs = CDS.docs || {};
  var SB = "https://castanha-staging.caju.com.br/", WB = "https://castanha-mobile.caju.com.br/";
  var DATA = {
 "pages": [
  {
   "id": "comece-aqui",
   "name": "Comece aqui",
   "platform": null,
   "tabs": [
    {
     "id": "visao",
     "title": "Comece aqui",
     "blocks": [
      {
       "p": "Desenvolvido para conectar ideias, pessoas e experiências, o Castanha é o Design System da Caju. Ele une design e código para que os produtos do nosso Cajueiro expressem consistência e propósito."
      },
      {
       "h2": "Comece por aqui"
      },
      {
       "shortcuts": {
        "bento": 3,
        "items": [
         {
          "title": "Componentes",
          "text": "Os componentes do Castanha DS com Playground ao vivo, documentação de uso e o código React de cada um.",
          "href": "#/main-button",
          "cta": "Acessar componentes",
          "illustration": "interfaces/customizacao"
         },
         {
          "title": "Foundations",
          "text": "Princípios visuais do sistema: cores, tipografia e espaçamentos.",
          "href": "#/caju-theme",
          "cta": "Acessar Tema Caju",
          "illustration": "interfaces/home"
         },
         {
          "title": "Design tokens",
          "text": "Como usar tokens de design no código e no Figma.",
          "href": "#/dev-tokens",
          "cta": "Acessar design tokens",
          "illustration": "dispositivos/notebook-relatorios"
         }
        ]
       }
      },
      {
       "h2": "Para desenvolver"
      },
      {
       "cards": [
        {
         "title": "React (castanha-react)",
         "text": "Instalação, ambiente, uso dos pacotes, guias, design tokens e Castanha Universe. [Acessar a Instalação no React](#/dev-instalacao)"
        },
        {
         "title": "Flutter (castanha_flutter)",
         "text": "Instalação pelo commons ou direta, tema, tokens e uso dos componentes. [Acessar a Instalação no Flutter](#/flutter-instalacao)"
        }
       ]
      },
      {
       "h2": "Recursos e ferramentas"
      },
      {
       "cards": [
        {
         "title": "Releases",
         "text": "Novidades, correções e melhorias a cada versão. [Acessar o Changelog](#/changelog)"
        },
        {
         "title": "Widgetbook",
         "text": "Playground interativo dos componentes Flutter. [Abrir o Widgetbook](https://castanha-staging-flutter.caju.com.br/)"
        },
        {
         "title": "Storybook",
         "text": "Os componentes React do castanha-react. [Abrir o Storybook](https://castanha-staging.caju.com.br/)"
        },
        {
         "title": "Canal de suporte",
         "text": "Tire dúvidas e receba suporte no #castanha-suporte do Slack. [Abrir o canal](https://caju.slack.com/archives/C07NM4UQ2S3)"
        }
       ]
      }
     ]
    },
    {
     "id": "diferenciais",
     "title": "Diferenciais",
     "source": "about/differentials",
     "blocks": [
      {
       "p": "Diferente de outros design systems, o Castanha vai além dos componentes — as decisões de bundle, infraestrutura e CI são tão cuidadosas quanto o design dos componentes em si."
      },
      {
       "ul": [
        "Bundle proporcional ao uso real",
        "CSS automático em produção",
        "Um pacote, zero sub-dependências",
        "Subpath exports granulares",
        "Cache inteligente de assets",
        "Infraestrutura que se auto-mantém",
        "CI que conhece o projeto",
        "Acessibilidade em dois níveis"
       ]
      },
      {
       "h2": "Bundle proporcional ao uso real"
      },
      {
       "p": "O [Castanha Optimizer](#/dev-universe/castoken) escaneia o código-fonte durante o build e gera registries virtuais com apenas os assets usados — sem chunks desnecessários no output do consumer."
      },
      {
       "code": "// Detectado automaticamente — entra no bundle\n<Icon name=\"business-line\" />\n<Illustration name=\"empty-state\" />\n\n// Nome dinâmico — não detectado; adicionar ao safelist\n<Icon name={iconName} />"
      },
      {
       "note": "Para nomes dinâmicos, o plugin oferece `safelist` com a mesma ergonomia do Tailwind CSS."
      },
      {
       "h2": "CSS automático em produção"
      },
      {
       "p": "CSS importado de `node_modules` não é extraído automaticamente por Vite, Rollup ou Webpack em production builds. O Optimizer intercepta o import `styles` e substitui por um virtual module com o CSS compilado — processado pela pipeline do próprio bundler, sem arquivos extras no output."
      },
      {
       "code": "// No entry da aplicação\nimport '@caju-beneficios/castanha-react/styles';"
      },
      {
       "h2": "Um pacote, zero sub-dependências"
      },
      {
       "p": "Os assets vivem em sub-pacotes separados (`castanha-icons`, `castanha-illustrations`, `castanha-motion`). O Optimizer resolve esses imports usando o contexto de instalação do próprio `castanha-react` — o consumer não precisa instalá-los diretamente."
      },
      {
       "p": "Uma dependência no `package.json`. Nenhum `npm install` adicional quando o DS cresce com novos pacotes."
      },
      {
       "h2": "Subpath exports granulares"
      },
      {
       "p": "Cada parte do Castanha é um subpath export independente — importar `Button` não carrega o provider, os hooks nem o plugin."
      },
      {
       "ul": [
        "`@caju-beneficios/castanha-react` — Componentes",
        "`/providers` — CastanhaProvider",
        "`/hooks` — useMask, useAssetLoader, ...",
        "`/helpers` — Utilitários públicos",
        "`/plugin` — Optimizer (Vite / Rollup / Webpack / esbuild)",
        "`/test-utils` — Mocks e utilitários de teste",
        "`/components/Button` — Apenas o Button"
       ]
      },
      {
       "p": "Cada subpath distribui ESM e CJS. `sideEffects` é declarado apenas para CSS — todo JS pode ser tree-shaken."
      },
      {
       "h2": "Cache inteligente de assets"
      },
      {
       "p": "O `CastanhaProvider` gerencia lazy loading de ícones, ilustrações e motions com quatro camadas:"
      },
      {
       "ul": [
        "LRU com TTL — assets pouco usados são eviccionados automaticamente; `staleTime` configurável por tipo",
        "Deduplicação de requests — múltiplos componentes pedindo o mesmo asset compartilham a mesma Promise; nenhum request duplicado",
        "Persistência em localStorage — assets dentro do TTL são restaurados sem request de rede na próxima sessão; quando o storage está cheio, o item mais antigo é removido automaticamente",
        "Retry seletivo — erros de rede disparam retry com backoff linear; erros determinísticos (asset inexistente no registry) são rejeitados imediatamente"
       ]
      },
      {
       "code": "<CastanhaProvider\n  cache={{\n    icons: { maxSize: 150, staleTime: 3_600_000, persist: true },\n  }}\n>\n  <App />\n</CastanhaProvider>"
      },
      {
       "h2": "Infraestrutura que se auto-mantém"
      },
      {
       "p": "Três scripts de codegen rodam automaticamente antes de cada build:"
      },
      {
       "ul": [
        "Asset registry — lê os `dist/assets/` dos sub-pacotes e gera os registries; novos ícones adicionados ao `castanha-icons` aparecem automaticamente na próxima build",
        "Asset props — detecta quais props são tipadas como `IconName` ou `IllustrationName` e atualiza o mapa do scanner; novos componentes com props de asset não precisam de manutenção manual",
        "Storybook map — mantém o mapa de componentes para a galeria atualizado"
       ]
      },
      {
       "p": "O build também calcula o grafo de dependências CSS entre componentes — ao importar `Drawer` pelo subpath, o CSS do `Backdrop` é carregado junto sem configuração manual."
      },
      {
       "h2": "CI que conhece o projeto"
      },
      {
       "ul": [
        "AI Review — quando um PR recebe o label ready for review, Claude analisa o diff verificando ordem de hooks, uso de VStack/HStack, JSDoc, argTypes e conformidade com WCAG. O prompt é específico ao projeto, não genérico",
        "Component Checklist — ao adicionar um componente, o CI verifica se foi registrado em todos os lugares obrigatórios (export, styles, size-limit)",
        "Bundle size por PR — cada PR publica um delta comparado à base, com limite de 16 kB por componente",
        "Auto-changeset — integrado com Jira; extrai o summary da task, detecta quais packages foram modificados e commita o arquivo de changeset automaticamente no branch do PR"
       ]
      },
      {
       "h2": "Acessibilidade em dois níveis"
      },
      {
       "ul": [
        "Testes unitários com `jest-axe` — roles, ARIA attributes, navegação por teclado e gerenciamento de foco em cada story",
        "Storybook a11y addon — valida WCAG 2.0/2.1 A e AA em tempo real durante o desenvolvimento",
        "React Aria — componentes com interações complexas (Modal, Tooltip, Toast, Tabs) delegam foco, eventos de teclado e semântica ARIA sem reimplementação manual"
       ]
      },
      {
       "p": "O AI Review também verifica `prefers-reduced-motion` nos arquivos SCSS — animações sem suporte à preferência do usuário são sinalizadas como erro de acessibilidade no PR."
      }
     ]
    },
    {
     "id": "acessibilidade",
     "title": "Acessibilidade",
     "source": "about/accessibility",
     "blocks": [
      {
       "p": "O Castanha foi construído com foco em acessibilidade web (a11y). Todos os componentes são desenvolvidos e testados para garantir uma experiência inclusiva."
      },
      {
       "h2": "Conformidade com WCAG 2.1"
      },
      {
       "p": "Seguimos as diretrizes WCAG 2.1, garantindo uma experiência consistente independentemente de como o usuário interage com a interface:"
      },
      {
       "ul": [
        "Navegação por teclado",
        "ARIA attributes corretos",
        "Foco visível em elementos interativos",
        "Labels e descrições semânticas"
       ]
      },
      {
       "h2": "React Aria"
      },
      {
       "p": "Para componentes com alta complexidade de interação, utilizamos o [React Aria](https://react-spectrum.adobe.com/react-aria/), uma biblioteca focada em acessibilidade que oferece:"
      },
      {
       "ul": [
        "Gerenciamento de foco automático e previsível",
        "Adaptação a diferentes plataformas (touch, mouse, keyboard)"
       ]
      },
      {
       "h2": "Testes Automatizados"
      },
      {
       "p": "A acessibilidade é validada em duas camadas: testes unitários e validação visual no Storybook."
      },
      {
       "h3": "Testes Unitários (Jest + React Testing Library)"
      },
      {
       "p": "Cada componente possui testes cobrindo:"
      },
      {
       "ul": [
        "Roles e ARIA attributes",
        "Estados de loading",
        "Navegação por teclado",
        "Labels e associações",
        "Gerenciamento de foco"
       ]
      },
      {
       "h3": "Storybook A11y Addon"
      },
      {
       "p": "O Storybook utiliza o @storybook/addon-a11y para validações de WCAG 2.0/2.1 (Níveis A e AA):"
      },
      {
       "code": "// Configuração em .storybook/preview.tsx\na11y: {\n  config: {\n    rules: [\n      { id: 'color-contrast', enabled: true },\n      { id: 'label', enabled: true },\n      { id: 'button-name', enabled: true },\n      { id: 'link-name', enabled: true },\n    ],\n  },\n  options: {\n    runOnly: {\n      type: 'tag',\n      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],\n    },\n  },\n}"
      },
      {
       "note": "Acesse a aba Accessibility no painel inferior de cada story para visualizar as validações."
      },
      {
       "h2": "Links úteis"
      },
      {
       "ul": [
        "[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)",
        "[React Aria — Accessibility](https://react-spectrum.adobe.com/react-aria/accessibility.html)"
       ]
      }
     ]
    },
    {
     "id": "faq",
     "title": "FAQ de desenvolvimento",
     "source": "about/faq",
     "blocks": [
      {
       "h2": "O que é o Castanha?"
      },
      {
       "p": "O Castanha é o Design System da Caju, desenvolvido para conectar ideias, pessoas e experiências. Unimos design e código para que os produtos do Cajueiro expressem consistência e propósito."
      },
      {
       "h2": "Quais são os pacotes disponibilizados?"
      },
      {
       "p": "Pacotes atuais (legado):"
      },
      {
       "ul": [
        "`@caju-beneficios/react-components` — Componentes React",
        "`@caju-beneficios/react-icons` — Ícones para React",
        "`@caju-beneficios/icons` — Galeria agnóstica de ícones",
        "`@caju-beneficios/sponsor-templates` — Templates de Sponsor"
       ]
      },
      {
       "p": "Novos pacotes (prefixo `Castanha`):"
      },
      {
       "ul": [
        "`@caju-beneficios/castanha-icons` — Ícones para web e Flutter",
        "`@caju-beneficios/castanha-illustrations` — Ilustrações para aplicações",
        "`@caju-beneficios/castanha-motion` — Animações Lottie prontas para uso",
        "`@caju-beneficios/castanha-tokens` — Design tokens em .scss, .css, .dart e .ts",
        "`@caju-beneficios/castanha-react` — Componentes React do Castanha"
       ]
      },
      {
       "h2": "Preciso sempre utilizar os pacotes?"
      },
      {
       "p": "Sim! O uso dos pacotes garante:"
      },
      {
       "ul": [
        "Consistência entre todas as aplicações da Caju",
        "Atualizações automáticas conforme a evolução dos produtos",
        "Redução de retrabalho e coerência com as entregas de design"
       ]
      },
      {
       "h2": "O componente em código está diferente. Posso usar `styles` para ajustar?"
      },
      {
       "p": "Não recomendamos. Sobrescrever estilos pode causar problemas quando o Castanha for atualizado:"
      },
      {
       "ul": [
        "Seu componente pode ter efeitos inesperados",
        "Ajustes podem não ser aplicados corretamente",
        "Gera débito técnico que precisará ser resolvido"
       ]
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Alternativa",
        "text": "Entre em contato com o time do Castanha através do [canal de suporte no Slack](https://caju.slack.com/archives/C07NM4UQ2S3) para reportar a diferença."
       }
      },
      {
       "h2": "Preciso de um componente que não existe. Posso criar localmente?"
      },
      {
       "p": "Criar componentes localmente deve ser o último recurso — ou para necessidades muito específicas da squad. Mas, se for realmente necessário criar:"
      },
      {
       "ul": [
        "Use os design tokens do Castanha na construção",
        "Garanta que, quando alterarmos paletas, espaçamentos e outros tokens, seu componente se manterá atualizado"
       ]
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Recomendação",
        "text": "Sempre que possível, coordene a criação de novos componentes com o time do Castanha."
       }
      }
     ]
    }
   ],
   "lede": "Tudo o que você precisa para começar a usar o Castanha"
  },
  {
   "id": "dev-instalacao",
   "name": "Instalação",
   "platform": "react",
   "tabs": [
    {
     "id": "instalacao",
     "title": "Instalação",
     "source": "getting-started/installation",
     "blocks": [
      {
       "p": "Os pacotes do Castanha são distribuídos através do [GitHub Packages da Caju](https://github.com/caju-beneficios/castanha/packages), permitindo instalação privada aos Cajuenses."
      },
      {
       "h2": "castanha-tokens"
      },
      {
       "p": "Design tokens disponíveis em CSS, SCSS, Dart e JS/TS."
      },
      {
       "code": "npm install @caju-beneficios/castanha-tokens\n# ou\nyarn add @caju-beneficios/castanha-tokens"
      },
      {
       "h2": "castanha-react"
      },
      {
       "p": "Componentes React com hooks customizados e foco em acessibilidade (a11y)."
      },
      {
       "code": "npm install @caju-beneficios/castanha-react\n# ou\nyarn add @caju-beneficios/castanha-react"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "Inclui `castanha-icons`, `castanha-illustrations` e `castanha-motion` como dependências — instalação separada desses pacotes é opcional."
       }
      },
      {
       "h2": "castanha-icons"
      },
      {
       "p": "Biblioteca de ícones para web e Flutter."
      },
      {
       "code": "npm install @caju-beneficios/castanha-icons\n# ou\nyarn add @caju-beneficios/castanha-icons"
      },
      {
       "h2": "castanha-illustrations"
      },
      {
       "p": "Ilustrações da Caju para web e Flutter."
      },
      {
       "code": "npm install @caju-beneficios/castanha-illustrations\n# ou\nyarn add @caju-beneficios/castanha-illustrations"
      },
      {
       "h2": "castanha-motion"
      },
      {
       "p": "Animações Lottie prontas para uso."
      },
      {
       "code": "npm install @caju-beneficios/castanha-motion\n# ou\nyarn add @caju-beneficios/castanha-motion"
      },
      {
       "h2": "Instalação mínima para projetos React"
      },
      {
       "p": "Na maioria dos casos, dois pacotes são suficientes:"
      },
      {
       "code": "# Usando NPM\nnpm install @caju-beneficios/castanha-tokens \\\n            @caju-beneficios/castanha-react \\\n\n# Usando Yarn\nyarn add @caju-beneficios/castanha-tokens \\\n         @caju-beneficios/castanha-react \\"
      },
      {
       "h2": "Requisitos"
      },
      {
       "h3": "Versões Mínimas"
      },
      {
       "ul": [
        "Node.js: 22.0.0 ou superior",
        "React: 18.0.0 ou superior (suporta React 19)",
        "TypeScript (opcional): 5.0.0 ou superior"
       ]
      },
      {
       "h3": "Navegadores Suportados"
      },
      {
       "ul": [
        "Chrome/Edge: últimas 2 versões",
        "Firefox: últimas 2 versões",
        "Safari: últimas 2 versões",
        "iOS Safari: 14+",
        "Android Chrome: últimas 2 versões"
       ]
      },
      {
       "h3": "Next.js"
      },
      {
       "p": "Adicione ao `next.config.js`:"
      },
      {
       "code": "transpilePackages: ['@caju-beneficios/castanha-react', '@caju-beneficios/castanha-tokens'];"
      }
     ]
    }
   ],
   "lede": "O que tem no Castanha?"
  },
  {
   "id": "dev-ambiente",
   "name": "Preparando o ambiente",
   "platform": "react",
   "tabs": [
    {
     "id": "ambiente",
     "title": "Preparando o ambiente",
     "source": "getting-started/configuration",
     "blocks": [
      {
       "p": "Antes de usar o Design System, configure seu projeto para acessar os pacotes privados da Caju no GitHub."
      },
      {
       "h2": "Configurando o .npmrc"
      },
      {
       "p": "Os pacotes do Castanha estão publicados no GitHub Packages e requerem autenticação."
      },
      {
       "h3": "1. Criar o arquivo .npmrc"
      },
      {
       "p": "Na raiz do seu projeto:"
      },
      {
       "code": "touch .npmrc"
      },
      {
       "h3": "2. Adicionar as configurações"
      },
      {
       "code": "@caju-beneficios:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Importante",
        "text": "Substitua `YOUR_GITHUB_TOKEN` pelo seu token pessoal do GitHub com permissão `read:packages`."
       }
      },
      {
       "h2": "Import de tokens"
      },
      {
       "p": "Após instalar os pacotes, importe as folhas de estilo no seu projeto."
      },
      {
       "h3": "Opção 1: SCSS (recomendado)"
      },
      {
       "p": "Se seu projeto usa SCSS, importe os tokens no arquivo principal de estilos:"
      },
      {
       "code": "// src/styles/main.scss\n@import '@caju-beneficios/castanha-tokens/scss';\n\n// Agora você pode usar as variáveis SCSS\nbody {\n  background-color: $castanha-colors-neutral-solid-soft;\n  color: $castanha-colors-neutral-solid-intense;\n}"
      },
      {
       "h3": "Opção 2: CSS"
      },
      {
       "p": "Importe os tokens CSS no arquivo de entrada da sua aplicação:"
      },
      {
       "code": "// src/index.tsx ou src/main.tsx\nimport '@caju-beneficios/castanha-tokens/css';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(<App />);"
      },
      {
       "note": "Esta abordagem importa todas as CSS Variables e permite usar tokens como var(`--castanha-colors-accent-solid-medium`) em qualquer CSS do projeto."
      },
      {
       "h2": "Import de estilos dos componentes"
      },
      {
       "p": "O Castanha oferece dois caminhos para importar estilos."
      },
      {
       "h3": "Opção 1: Import global"
      },
      {
       "p": "Importa os estilos de todos os componentes de uma vez, junto com fontes (Roboto e Work Sans) e o reset de focus WCAG. O JS continua sendo tree-shakeável pelo bundler normalmente."
      },
      {
       "p": "Com o [Castanha Optimizer](#/dev-universe/optimizer) (recomendado)"
      },
      {
       "code": "// src/index.tsx ou src/main.tsx\nimport '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\nimport '@caju-beneficios/castanha-react/styles'; // ← interceptado pelo Optimizer\n\n// Em qualquer lugar — tree-shaking do JS é automático\nimport { Button } from '@caju-beneficios/castanha-react';"
      },
      {
       "p": "Sem o Optimizer"
      },
      {
       "code": "// src/index.tsx ou src/main.tsx\nimport '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\nimport '@caju-beneficios/castanha-react/components-styles'; // ← CSS estático completo\n\nimport { Button } from '@caju-beneficios/castanha-react';"
      },
      {
       "h3": "Opção 2: Per-componente (JS + CSS 100% tree-shakeable)"
      },
      {
       "p": "Cada componente auto-injeta seu próprio CSS ao ser importado — nenhum import adicional de estilos necessário além do `base-styles`."
      },
      {
       "code": "// src/index.tsx ou src/main.tsx — apenas uma vez\nimport '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\n\n// Em qualquer arquivo — CSS do componente vem junto automaticamente\nimport { Button } from '@caju-beneficios/castanha-react/components/Button';\nimport { Modal } from '@caju-beneficios/castanha-react/components/Modal';"
      },
      {
       "h2": "CastanhaProvider"
      },
      {
       "p": "O `CastanhaProvider` é obrigatório na raiz da aplicação. Ele inicializa os providers internos do Design System — sem ele, componentes como `Tabs` e `Toast` não funcionam corretamente."
      },
      {
       "code": "// src/App.tsx ou src/index.tsx\nimport { CastanhaProvider } from '@caju-beneficios/castanha-react/providers';\n\nfunction Root() {\n  return (\n    <CastanhaProvider\n      cache={{\n        icons: true,\n      }}\n      providers={{\n        toast: true, // habilita useToast\n      }}\n    >\n      <App />\n    </CastanhaProvider>\n  );\n}"
      },
      {
       "p": "O que ele inicializa:"
      },
      {
       "ul": [
        "Acessibilidade: infraestrutura base para componentes interativos como `Tabs` e `Toast`",
        "Providers opcionais: `Toast` via prop `providers`",
        "Cache de assets: lazy loading com LRU em memória + `localStorage` opcional via prop `cache`"
       ]
      },
      {
       "p": "Para melhor entendimento dessa estratégia, consulte a documentação completa de [Cacheamento e otimização de assets](#/dev-assets)."
      },
      {
       "h3": "Temas"
      },
      {
       "p": "O provider controla o tema via `data-theme` no `<html>`. Use `theme` para trocar em runtime ou `initialTheme` quando a preferência do usuário já está disponível antes de renderizar — por exemplo, salva em `localStorage`."
      },
      {
       "p": "O CSS dark é carregado de forma assíncrona. No primeiro acesso pode ocorrer um flash de tokens light antes do arquivo resolver; em acessos seguintes o browser cache elimina esse efeito."
      },
      {
       "p": "Se a aplicação não precisa de troca dinâmica e usa sempre o tema dark, importar o CSS diretamente é mais simples e evita o flash:"
      },
      {
       "code": "import '@caju-beneficios/castanha-tokens/css/caju-dark';"
      },
      {
       "h3": "Providers globais"
      },
      {
       "p": "A prop `providers` habilita providers globais do DS. Cada provider precisa ser explicitamente habilitado para que os hooks correspondentes funcionem nos componentes filhos — consulte a documentação de cada componente para o padrão completo de uso."
      },
      {
       "h2": "Testando a configuração"
      },
      {
       "p": "Após configurar o ambiente, teste se tudo está funcionando:"
      },
      {
       "code": "// src/main.tsx\nimport '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\n\nimport { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\n\nimport { CastanhaProvider } from '@caju-beneficios/castanha-react/providers';\n\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <CastanhaProvider cache={{ icons: true }}>\n      <App />\n    </CastanhaProvider>\n  </StrictMode>\n);"
      },
      {
       "code": "// src/App.tsx\nimport { Button } from '@caju-beneficios/castanha-react/components/Button';\nimport { Icon } from '@caju-beneficios/castanha-react/components/Icon';\nimport { Illustration } from '@caju-beneficios/castanha-react/components/Illustration';\nimport { FinancesCartaoFrente } from '@caju-beneficios/castanha-illustrations';\n\nfunction App() {\n  return (\n    <>\n      {/* Lazy loading — requer cache: { icons: true } no CastanhaProvider */}\n      <Icon name=\"caiu-caju\" size=\"large\" />\n\n      {/* Eager loading — sem necessidade de provider */}\n      <Illustration name={FinancesCartaoFrente} alt=\"Cartão de benefícios\" />\n\n      <Button>Botão de Teste</Button>\n    </>\n  );\n}\n\nexport default App;"
      },
      {
       "p": "Se os componentes renderizarem corretamente, o ambiente está configurado."
      }
     ]
    }
   ],
   "lede": "Preparando o ambiente"
  },
  {
   "id": "dev-pacotes",
   "name": "Usando os pacotes",
   "platform": "react",
   "tabs": [
    {
     "id": "pacotes",
     "title": "Usando os pacotes",
     "source": "getting-started/usage",
     "blocks": [
      {
       "p": "Aprenda a utilizar os pacotes do Castanha Design System com exemplos práticos."
      },
      {
       "h2": "@caju-beneficios/castanha-tokens"
      },
      {
       "p": "[Design Tokens](#/dev-tokens) são a base do sistema de design, garantindo consistência visual em cores, espaçamentos, tipografia e outros valores."
      },
      {
       "h3": "JavaScript/TypeScript"
      },
      {
       "code": "// Import todos os tokens (light + dark)\nimport * as tokens from '@caju-beneficios/castanha-tokens';\n\n// Import de tema específico\nimport * as lightTokens from '@caju-beneficios/castanha-tokens/light';\nimport * as darkTokens from '@caju-beneficios/castanha-tokens/dark';\n\n// Uso com styled-components, emotion, etc\nconst Button = styled.button`\n  background: ${lightTokens.ColorsAccentSolidMedium};\n  padding: ${lightTokens.Sizes16};\n  border-radius: ${lightTokens.BordersRadiusMedium};\n  font-size: ${lightTokens.FontSize16};\n`;\n\n// Dark mode com ThemeProvider\n<ThemeProvider theme={isDark ? darkTokens : lightTokens}>\n  <App />\n</ThemeProvider>;"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "A estratégia de dark mode fica a critério do desenvolvedor."
       }
      },
      {
       "h3": "CSS Variables"
      },
      {
       "p": "Para projetos que utilizam CSS Variables:"
      },
      {
       "code": "/* Importar tema light (padrão) */\n@import '@caju-beneficios/castanha-tokens/css';\n\n/* Ou importar explicitamente */\n@import '@caju-beneficios/castanha-tokens/css/light';\n@import '@caju-beneficios/castanha-tokens/css/dark';\n\n/* Usar com prefixo --castanha-* */\n.my-component {\n  background-color: var(--castanha-colors-accent-solid-medium);\n  padding: var(--castanha-sizes-16);\n  border-radius: var(--castanha-borders-radius-medium);\n  font-size: var(--castanha-font-size-16);\n}\n\n/* Dark mode automático */\n:root[data-theme='dark'] {\n  /* Variáveis substituídas automaticamente */\n}"
      },
      {
       "h3": "SCSS Variables"
      },
      {
       "p": "Para projetos com pré-processador SCSS:"
      },
      {
       "code": "// Importar tema light (padrão)\n@import '@caju-beneficios/castanha-tokens/scss';\n\n// Ou importar explicitamente\n@import '@caju-beneficios/castanha-tokens/scss/light';\n@import '@caju-beneficios/castanha-tokens/scss/dark';\n\n// Usar com prefixo $castanha-*\n.my-component {\n  background-color: $castanha-colors-accent-solid-medium;\n  padding: $castanha-sizes-16;\n  border-radius: $castanha-borders-radius-medium;\n  font-size: $castanha-font-size-16;\n}\n\n// Dark mode (mesma estratégia do CSS)\n:root[data-theme=\"dark\"] .my-component {\n  background-color: $castanha-colors-accent-solid-medium;\n}"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "A estratégia de dark mode fica a critério do desenvolvedor."
       }
      },
      {
       "h2": "@caju-beneficios/castanha-react"
      },
      {
       "p": "Componentes React construídos com acessibilidade completa e consumindo a camada de tokens do Castanha."
      },
      {
       "code": "import { Button, TextInput, VStack } from '@caju-beneficios/castanha-react';\n\nfunction LoginForm() {\n  return (\n    <VStack my=\"20px\">\n      <TextInput label=\"Email\" placeholder=\"seu.nome@caju.com.br\" type=\"email\" />\n      <TextInput label=\"Senha\" type=\"password\" />\n      <Button appearance=\"accent\" size=\"medium\">\n        Entrar\n      </Button>\n    </VStack>\n  );\n}"
      },
      {
       "h3": "Estilos"
      },
      {
       "p": "Opção 1: Import global (recomendado para a maioria dos projetos)"
      },
      {
       "p": "Importa os estilos de todos os componentes de uma vez. O JS continua sendo tree-shakeável pelo bundler."
      },
      {
       "p": "Com o [Castanha Optimizer](#/dev-universe/optimizer) configurado:"
      },
      {
       "code": "import '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\nimport '@caju-beneficios/castanha-react/styles'; // ← interceptado pelo Optimizer\n\nimport { Button, TextInput, VStack } from '@caju-beneficios/castanha-react';"
      },
      {
       "p": "Sem o Optimizer, use `components-styles` no lugar:"
      },
      {
       "code": "import '@caju-beneficios/castanha-react/components-styles';"
      },
      {
       "p": "Opção 2: Per-componente (JS + CSS 100% tree-shakeable)"
      },
      {
       "p": "Cada componente auto-injeta seu próprio CSS ao ser importado."
      },
      {
       "code": "import '@caju-beneficios/castanha-tokens/css';\nimport '@caju-beneficios/castanha-react/base-styles';\n\nimport { Button } from '@caju-beneficios/castanha-react/components/Button';\nimport { TextInput } from '@caju-beneficios/castanha-react/components/TextInput';\nimport { VStack } from '@caju-beneficios/castanha-react/components/Stack';"
      },
      {
       "h2": "Assets: Icons, Illustrations e Motion"
      },
      {
       "p": "Os pacotes `castanha-icons`, `castanha-illustrations` e `castanha-motion` seguem a mesma estrutura de uso, com duas estratégias de carregamento:"
      },
      {
       "ul": [
        "Eager loading: import direto — recomendado quando você usa poucos assets ou precisa de zero latência",
        "Lazy loading via `CastanhaProvider`: carregamento sob demanda com cache LRU em memória e `localStorage` opcional — recomendado para aplicações com muitos assets diferentes"
       ]
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "Lazy loading requer o `<CastanhaProvider>`. Veja [Cacheamento e otimização](#/dev-assets)."
       }
      },
      {
       "h3": "castanha-icons"
      },
      {
       "p": "Biblioteca de ícones otimizada e acessível. Use através do componente `<Icon>` do `castanha-react`."
      },
      {
       "p": "Exports:"
      },
      {
       "ul": [
        "Named exports: `CaiuCaju`, `BusinessLine` (e outros)",
        "ICONS_LIST: Array com todos os nomes disponíveis",
        "IconName: Type para autocomplete com strings"
       ]
      },
      {
       "p": "Eager loading"
      },
      {
       "code": "import { Icon } from '@caju-beneficios/castanha-react';\nimport { CaiuCaju, BusinessLine } from '@caju-beneficios/castanha-icons';\n\nfunction MyComponent() {\n  return (\n    <>\n      <Icon name={CaiuCaju} size=\"medium\" />\n      <Icon name={BusinessLine} size=\"large\" />\n    </>\n  );\n}"
      },
      {
       "p": "Lazy loading"
      },
      {
       "code": "import { Icon } from '@caju-beneficios/castanha-react';\n\nfunction MyComponent() {\n  return (\n    <>\n      <Icon name=\"caiu-caju\" size=\"medium\" />\n      <Icon name=\"business-line\" size=\"large\" />\n    </>\n  );\n}"
      },
      {
       "h3": "castanha-illustrations"
      },
      {
       "p": "Ilustrações do design system para estados vazios, sucesso, erro e outras necessidades visuais."
      },
      {
       "p": "Exports:"
      },
      {
       "ul": [
        "Named exports: `FinancesCartaoFrente`, `AwardsBoloAniversario` (e outros)",
        "ILLUSTRATIONS_LIST: Array com todos os nomes disponíveis",
        "IllustrationName: Type para autocomplete com strings"
       ]
      },
      {
       "p": "Eager loading"
      },
      {
       "code": "import { Illustration } from '@caju-beneficios/castanha-react';\nimport {\n  FinancesCartaoFrente,\n  AwardsBoloAniversario,\n} from '@caju-beneficios/castanha-illustrations';\n\nfunction Component() {\n  return (\n    <>\n      <Illustration name={FinancesCartaoFrente} alt=\"Cartão de benefícios\" />\n      <Illustration name={AwardsBoloAniversario} alt=\"Bolo de aniversário\" size=\"large\" />\n    </>\n  );\n}"
      },
      {
       "p": "Lazy loading"
      },
      {
       "code": "import { Illustration } from '@caju-beneficios/castanha-react';\n\nfunction Component() {\n  return (\n    <>\n      <Illustration name=\"finances-cartao-frente\" alt=\"Cartão de benefícios\" />\n      <Illustration name=\"awards-bolo-aniversario\" alt=\"Bolo de aniversário\" size=\"large\" />\n    </>\n  );\n}"
      },
      {
       "h3": "castanha-motion"
      },
      {
       "p": "Animações Lottie prontas para uso em splash screens, loaders, entre outros."
      },
      {
       "p": "Exports:"
      },
      {
       "ul": [
        "Named exports: `SeparandoCartao`, `BadgeSino` (e outros)",
        "MOTION_LIST: Array com todos os nomes disponíveis",
        "MotionName: Type para autocomplete com strings"
       ]
      },
      {
       "p": "Eager loading"
      },
      {
       "code": "import { Motion } from '@caju-beneficios/castanha-react';\nimport { SeparandoCartao, BadgeSino } from '@caju-beneficios/castanha-motion';\n\nexport default function LoadingPage() {\n  return (\n    <>\n      <Motion name={SeparandoCartao} loop autoplay />\n      <Motion name={BadgeSino} loop autoplay />\n    </>\n  );\n}"
      },
      {
       "p": "Lazy loading"
      },
      {
       "code": "import { Motion } from '@caju-beneficios/castanha-react';\n\nexport default function LoadingPage() {\n  return (\n    <>\n      <Motion name=\"separando-cartao\" loop autoplay />\n      <Motion name=\"badge-sino\" loop autoplay />\n    </>\n  );\n}"
      },
      {
       "note": "Para animações customizadas, use a prop `lottieFile`."
      }
     ]
    }
   ],
   "lede": "Uso na prática"
  },
  {
   "id": "dev-formularios",
   "name": "Formulários",
   "platform": "react",
   "tabs": [
    {
     "id": "formularios",
     "title": "Formulários",
     "source": "guides/forms",
     "blocks": [
      {
       "p": "`Field` é o primitivo de composição dos inputs de formulário do Castanha — os inputs do DS o usam internamente, então, na maioria dos casos, você trabalha diretamente com eles. Para mais informações, consulte a documentação do Field."
      },
      {
       "h2": "Usando inputs do DS"
      },
      {
       "p": "Os inputs de formulário do Castanha já encapsulam `Field` — label, erro, acessibilidade e `id` funcionam sem configuração adicional:"
      },
      {
       "code": "import { PasswordInput, TextInput, VStack } from '@caju-beneficios/castanha-react';\n\n<VStack gap=\"16px\">\n  <TextInput label=\"E-mail\" type=\"email\" required />\n  <PasswordInput label=\"Senha\" autoComplete=\"current-password\" required />\n</VStack>"
      },
      {
       "p": "Props compartilhadas entre os inputs: `label`, `required`, `error`, `disabled`, `supportingMessage`, `characterCount`, `value`, `defaultValue`, `id`."
      },
      {
       "p": "Use `value` + `onChange` para modo controlado, ou `defaultValue` para não-controlado. O `id` é gerado automaticamente — passe apenas se precisar de um valor específico."
      },
      {
       "h2": "Campos com máscara"
      },
      {
       "p": "Use `useMask` com qualquer input do DS — ele retorna `value`, `onChange` e `ref` prontos para modo controlado:"
      },
      {
       "code": "import { TextInput, useMask } from '@caju-beneficios/castanha-react';\n\nconst mask = useMask('cpf');\n\n<TextInput ref={mask.ref} label=\"CPF\" value={mask.value} onChange={mask.onChange} />"
      },
      {
       "p": "`mask.unmaskedValue` expõe os dígitos sem formatação — útil para enviar ao backend. Lista completa de presets em [Hooks](#/dev-hooks)."
      },
      {
       "h3": "Inputs externos com Field"
      },
      {
       "p": "Para inputs não cobertos pelo DS, use `Field.Control asChild` — o `ref` interno do Field e o `ref` do `useMask` são mesclados automaticamente:"
      },
      {
       "code": "import { Field, useMask } from '@caju-beneficios/castanha-react';\n\nconst mask = useMask('cep');\n\n<Field.Root label=\"CEP\" error={cepError} required>\n  <Field.Control asChild>\n    <input ref={mask.ref} value={mask.value} onChange={mask.onChange} />\n  </Field.Control>\n  {cepError && <Field.SupportingMessage>CEP inválido</Field.SupportingMessage>}\n</Field.Root>"
      },
      {
       "h2": "Com React Hook Form"
      },
      {
       "p": "Os inputs do DS aceitam o spread de `field` do `Controller` diretamente:"
      },
      {
       "code": "import { Controller, useForm } from 'react-hook-form';\nimport { TextInput } from '@caju-beneficios/castanha-react';\n\nconst { control } = useForm<{ email: string }>();\n\n<Controller\n  control={control}\n  name=\"email\"\n  render={({ field, fieldState }) => (\n    <TextInput\n      {...field}\n      label=\"E-mail\"\n      type=\"email\"\n      error={!!fieldState.error}\n      supportingMessage={fieldState.error?.message}\n    />\n  )}\n/>"
      },
      {
       "p": "Para campos com máscara, use `onAccept` para sincronizar o valor sem máscara com o RHF:"
      },
      {
       "code": "import { useForm } from 'react-hook-form';\nimport { TextInput, useMask } from '@caju-beneficios/castanha-react';\n\nconst { setValue } = useForm<{ cpf: string }>();\nconst mask = useMask('cpf', {\n  onAccept: (_, unmasked) => setValue('cpf', unmasked),\n});\n\n<TextInput ref={mask.ref} label=\"CPF\" value={mask.value} onChange={mask.onChange} />"
      }
     ]
    }
   ],
   "lede": "Formulários com Field"
  },
  {
   "id": "dev-hooks",
   "name": "Hooks",
   "platform": "react",
   "tabs": [
    {
     "id": "hooks",
     "title": "Hooks",
     "source": "guides/hooks",
     "blocks": [
      {
       "p": "O Castanha expõe hooks utilitários disponíveis em `@caju-beneficios/castanha-react`."
      },
      {
       "h2": "useMask"
      },
      {
       "p": "Aplica máscara em tempo real a inputs do DS e expõe o valor formatado e os dígitos brutos."
      },
      {
       "code": "import { TextInput, useMask } from '@caju-beneficios/castanha-react';\n\nconst mask = useMask('cpf');\n\n<TextInput label=\"CPF\" value={mask.value} onChange={mask.onChange} />;"
      },
      {
       "p": "Retorna `value` (mascarado), `unmaskedValue` (dígitos brutos) e `onChange`. `unmaskedValue` é o que você envia ao backend ou ao estado do formulário."
      },
      {
       "p": "Presets disponíveis:"
      },
      {
       "ul": [
        "`cpf` — 000.000.000-00",
        "`cnpj` — 00.000.000/0000-00 (aceita numérico e alfanumérico — IN RFB nº 2.229/2024, vigente jul/2026)",
        "`phone` — (00) 0000-0000",
        "`cellphone` — (00) 00000-0000",
        "`tel` — Dinâmico: `phone` para 10 dígitos, `cellphone` para 11",
        "`cep` — 00000-000",
        "`date` — 00/00/0000",
        "`currency` — BRL right-to-left: R$ 0,00"
       ]
      },
      {
       "p": "Passe `options.value` para formatar um valor externo sem controlar um input — útil para pré-preenchimento com dados externos:"
      },
      {
       "code": "const { value } = useMask('cpf', { value: person.cpf });\n\n<span>{value}</span>;"
      },
      {
       "p": "Passe `onAccept` para reagir a mudanças — recebe `(masked, unmasked)`. Útil para sincronizar com estado externo sem manter um `useState` adicional:"
      },
      {
       "code": "const mask = useMask('cpf', {\n  onAccept: (_, unmasked) => setValue('cpf', unmasked),\n});"
      },
      {
       "p": "Compatível com `Field.Control asChild` — veja Formulários para o padrão completo com RHF e Field."
      },
      {
       "h2": "useBreakpoint"
      },
      {
       "p": "Retorna `true` se a viewport satisfaz a condição do breakpoint. SSR-safe: retorna `false` no servidor e na hidratação inicial."
      },
      {
       "code": "import { useBreakpoint } from '@caju-beneficios/castanha-react';\n\nconst isMobile = useBreakpoint('medium', 'max');\nconst isDesktop = useBreakpoint('large');"
      },
      {
       "p": "O primeiro argumento é o nome do breakpoint; o segundo é a direção — `'min'` (padrão) verifica `viewport ≥ breakpoint`, `'max'` verifica `viewport < breakpoint`."
      },
      {
       "p": "Breakpoints disponíveis:"
      },
      {
       "ul": [
        "`small` — 744px",
        "`medium` — 1024px",
        "`large` — 1366px",
        "`largest` — 1920px"
       ]
      },
      {
       "h2": "useFloatingPosition"
      },
      {
       "p": "Calcula e mantém atualizada a posição de um elemento floating (tooltip, popover, dropdown) em relação ao seu trigger. Usa `flip`, `shift` e `offset` automáticos via `@floating-ui/dom`."
      },
      {
       "code": "import { useRef } from 'react';\nimport { useFloatingPosition } from '@caju-beneficios/castanha-react';\n\nconst triggerRef = useRef<HTMLButtonElement>(null);\nconst floatingRef = useRef<HTMLDivElement>(null);\n\nconst position = useFloatingPosition({\n  open,\n  placement: 'bottom-start',\n  tooltipRef: floatingRef,\n  triggerRef,\n});\n\n<div\n  ref={floatingRef}\n  style={{\n    left: position.x,\n    top: position.y,\n    visibility: position.ready ? 'visible' : 'hidden',\n  }}\n/>;"
      },
      {
       "p": "Retorna `{ x, y, ready }`. Use `ready` para ocultar o elemento até a posição ser computada — evita o flash da posição inicial."
      },
      {
       "p": "`offsetValue` (padrão `4`) e `shiftPadding` (padrão `8`) controlam o espaçamento e o padding das bordas do viewport, respectivamente. O hook atualiza automaticamente ao scrollar ou redimensionar enquanto `open` for `true`."
      },
      {
       "h2": "useClickOutside"
      },
      {
       "p": "Chama um callback quando o usuário clica fora de todos os elementos referenciados. Usa `pointerdown` para capturar antes do click e cobrir touch events."
      },
      {
       "code": "import { useClickOutside } from '@caju-beneficios/castanha-react';\n\nuseClickOutside({\n  enabled: open,\n  handler: handleClose,\n  refs: [containerRef, popoverRef],\n});"
      },
      {
       "p": "Aceita múltiplos `refs` — o callback só dispara quando o clique ocorrer fora de todos os elementos. Útil para componentes com trigger e dropdown separados."
      },
      {
       "p": "`enabled` controla se o listener está ativo — passe `false` para suspender sem desmontar o hook."
      },
      {
       "h2": "useDebounce"
      },
      {
       "p": "Retorna uma versão com debounce de uma função. Quando `delay` é `undefined`, a função é chamada imediatamente sem debounce."
      },
      {
       "code": "import { useDebounce } from '@caju-beneficios/castanha-react';\n\nconst debouncedSearch = useDebounce(onSearch, 300);\n\ndebouncedSearch(query); // dispara onSearch após 300ms de inatividade"
      },
      {
       "p": "A função retornada é estável entre renders — segura para usar como dependência de `useEffect`. Ao trocar `fn`, a versão mais recente é sempre chamada sem recriar o debounce."
      },
      {
       "h2": "usePrevious"
      },
      {
       "p": "Retorna o valor anterior de qualquer state ou prop. Retorna `undefined` no primeiro render."
      },
      {
       "code": "import { usePrevious } from '@caju-beneficios/castanha-react';\n\nconst prevStep = usePrevious(currentStep);\nconst isGoingForward = currentStep > (prevStep ?? 0);"
      },
      {
       "h2": "useCombinedRefs"
      },
      {
       "p": "Combina múltiplas refs em uma única callback ref estável. Aceita object refs, callback refs e `undefined` em qualquer combinação."
      },
      {
       "code": "import { useCombinedRefs } from '@caju-beneficios/castanha-react';\n\nconst combined = useCombinedRefs(ref1, ref2, externalRef);\n\n<input ref={combined} />;"
      },
      {
       "h2": "useRovingFocus"
      },
      {
       "p": "Retorna um handler `onKeyDown` estável para navegação direcional por teclado em qualquer container. Suporta `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home` e `End`."
      },
      {
       "code": "import { useRovingFocus } from '@caju-beneficios/castanha-react';\n\nconst handleKeyDown = useRovingFocus({\n  containerRef,\n  selector: '[role=\"tab\"]:not([disabled])',\n  onNavigate: el => onChange(el.dataset.value ?? ''),\n});\n\n<div ref={containerRef} onKeyDown={handleKeyDown}>\n  {/* itens navegáveis */}\n</div>;"
      },
      {
       "p": "`onNavigate` recebe o elemento focado e seu índice — útil para sincronizar estado externo ao navegar."
      },
      {
       "h2": "useRadioGroupKeyboard"
      },
      {
       "p": "Retorna um handler `onKeyDown` com navegação por teclado para grupos `radiogroup`. Suporta `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home` e `End`. Internamente usa `useRovingFocus`."
      },
      {
       "code": "import { useRadioGroupKeyboard } from '@caju-beneficios/castanha-react';\n\nconst handleKeyDown = useRadioGroupKeyboard({\n  containerRef,\n  onChange: value => setSelected(value),\n  selected,\n  values: [1, 2, 3, 4, 5],\n});\n\n<div role=\"radiogroup\" ref={containerRef} onKeyDown={handleKeyDown}>\n  {/* buttons com role=\"radio\" */}\n</div>;"
      },
      {
       "p": "Por padrão, navega entre `button[role=\"radio\"]` dentro do `containerRef`. O `selector` é customizável para outros padrões de marcação — ex.: `'input[type=\"radio\"]:not(:disabled)'`. Ao navegar, foca o próximo item e aciona `onChange` automaticamente — seguindo o padrão ARIA de seleção automática em radiogroups."
      }
     ]
    }
   ],
   "lede": "Hooks"
  },
  {
   "id": "dev-assets",
   "name": "Assets e cacheamento",
   "platform": "react",
   "tabs": [
    {
     "id": "assets",
     "title": "Assets e cacheamento",
     "source": "guides/caching",
     "blocks": [
      {
       "p": "O `CastanhaProvider` oferece um sistema completo de lazy loading e cacheamento para assets de icons, illustrations e motion."
      },
      {
       "h2": "Por que usar?"
      },
      {
       "p": "O sistema de cacheamento resolve problemas comuns em aplicações grandes:"
      },
      {
       "ul": [
        "Bundle inicial menor: assets carregados sob demanda",
        "Cache inteligente: LRU em memória com limite configurável",
        "Persistência: `localStorage` entre sessões (opcional)",
        "Performance: retry automático, preload e warmup",
        "Organização: Gerenciamento centralizado de assets"
       ]
      },
      {
       "h2": "Setup básico"
      },
      {
       "p": "Configure o provider no ponto de entrada da aplicação:"
      },
      {
       "code": "// src/App.tsx ou src/index.tsx\nimport { CastanhaProvider } from '@caju-beneficios/castanha-react/providers';\n\nfunction Root() {\n  return (\n    <CastanhaProvider cache={{ icons: true, illustrations: true, motion: true }}>\n      <App />\n    </CastanhaProvider>\n  );\n}"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Dica",
        "text": "defina o objeto `cache` fora do componente ou memoize com `useMemo`. Objetos inline são recriados a cada re-render do componente pai, o que recria os loaders desnecessariamente."
       }
      },
      {
       "p": "Com essa configuração, qualquer componente que utilize assets passa a aceitar `strings` diretamente — incluindo `Icon`, `Illustration`, `Motion` e componentes como `Button` que expõem props de ícone:"
      },
      {
       "code": "import { Button, Icon, Illustration, Motion } from '@caju-beneficios/castanha-react';\n\nfunction MyComponent() {\n  return (\n    <>\n      <Icon name=\"caiu-caju\" size=\"medium\" />\n      <Illustration name=\"finances-cartao-frente\" alt=\"Cartão\" />\n      <Motion name=\"separando-cartao\" loop autoplay />\n      <Button leadIcon=\"business-line\">Ação</Button>\n    </>\n  );\n}"
      },
      {
       "h2": "Configuração avançada"
      },
      {
       "p": "Personalize o comportamento do cache para cada tipo de asset:"
      },
      {
       "code": "// src/config/castanha.config.ts\nimport type { CastanhaProviderProps } from '@caju-beneficios/castanha-react/providers';\n\nexport const castanhaConfig: CastanhaProviderProps['cache'] = {\n  icons: {\n    // Carrega no mount\n    preload: ['caiu-caju', 'business-line'],\n    // Carrega após delay\n    warmup: {\n      assets: ['health-line', 'food-delivery-line'],\n      delay: 2000,\n    },\n    cache: {\n      maxSize: 50, // Cache até 50 items\n      persist: true, // Salva em localStorage\n      staleTime: 3600000, // Expira após 1h (ms)\n    },\n    retry: {\n      enabled: true, // Retry automático\n      maxAttempts: 3, // Até 3 tentativas\n      delayMs: 100, // Delay entre tentativas\n    },\n  },\n  illustrations: true, // Pode misturar simples e customizado\n  motion: false, // Desabilita lazy loading para motion\n};"
      },
      {
       "p": "Use a configuração no provider:"
      },
      {
       "code": "// src/App.tsx ou src/index.tsx\nimport { CastanhaProvider } from '@caju-beneficios/castanha-react/providers';\nimport { castanhaConfig } from './config/castanha.config';\n\nfunction Root() {\n  return (\n    <CastanhaProvider cache={castanhaConfig}>\n      <App />\n    </CastanhaProvider>\n  );\n}"
      },
      {
       "h2": "Estratégias de otimização"
      },
      {
       "p": "O provider oferece três estratégias para melhorar o carregamento de assets conforme a necessidade da aplicação."
      },
      {
       "h3": "Preload"
      },
      {
       "p": "Carrega assets imediatamente no mount do provider. Ideal para assets críticos que serão usados logo:"
      },
      {
       "code": "cache={{\n  icons: {\n    preload: ['caiu-caju', 'business-line', 'health-line']\n  }\n}}"
      },
      {
       "h3": "Warmup"
      },
      {
       "p": "Carrega assets em background após um delay. Ideal para assets que provavelmente serão usados:"
      },
      {
       "code": "cache={{\n  icons: {\n    warmup: {\n      assets: ['food-delivery-line', 'transport-line'],\n      delay: 2000  // 2 segundos após o mount\n    }\n  }\n}}"
      },
      {
       "h3": "Persist"
      },
      {
       "p": "Salva assets no `localStorage` para persistir entre sessões:"
      },
      {
       "code": "cache={{\n  icons: {\n    cache: {\n      persist: true,\n      staleTime: 86400000  // 24 horas\n    }\n  }\n}}"
      },
      {
       "ul": [
        "Assets ficam disponíveis offline após primeiro carregamento",
        "`staleTime` define quando assets expiram",
        "Gerencia automaticamente quota do `localStorage`"
       ]
      },
      {
       "h2": "Debug e monitoramento"
      },
      {
       "p": "Em desenvolvimento (`NODE_ENV === 'development'`), o provider expõe dev tools no console do navegador:"
      },
      {
       "code": "// No console do browser (contexto do iframe no Storybook)\n__castanha__.cachedAssets(); // Retorna stats de todos os assets\n__castanha__.cachedIcons(); // Stats do cache de icons\n__castanha__.cachedIllustrations(); // Stats do cache de illustrations\n__castanha__.cachedMotion(); // Stats do cache de motion"
      },
      {
       "p": "Retorno exemplo:"
      },
      {
       "code": "{\n  icons: {\n    size: 5,                    // 5 ícones em cache\n    maxSize: 20,                // Limite de 20 items\n    keys: [                     // Assets cacheados\n      'icon:caiu-caju',\n      'icon:business-line',\n      // ...\n    ]\n  },\n  illustrations: { size: 2, maxSize: 20, keys: [...] },\n  motion: { size: 1, maxSize: 20, keys: [...] }\n}"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "No Storybook, abra o console e selecione o contexto do iframe (`storybook-preview-iframe`) ou use `frames[0].__castanha__.cachedAssets()`."
       }
      },
      {
       "h2": "Quando usar cada abordagem"
      },
      {
       "h3": "Eager loading (import direto)"
      },
      {
       "p": "Recomendado quando:"
      },
      {
       "ul": [
        "Você usa poucos assets (5-10)",
        "Precisa de zero latência no carregamento",
        "Assets são críticos para a primeira renderização"
       ]
      },
      {
       "code": "import { Icon } from '@caju-beneficios/castanha-react';\nimport { CaiuCaju } from '@caju-beneficios/castanha-icons';\n\n<Icon name={CaiuCaju} />;"
      },
      {
       "h3": "Lazy loading (com provider)"
      },
      {
       "p": "Recomendado quando:"
      },
      {
       "ul": [
        "Você usa muitos assets diferentes (20+)",
        "Quer otimizar o bundle inicial",
        "Precisa de cache e persistência",
        "Assets são dinâmicos (baseados em dados)"
       ]
      },
      {
       "code": "import { Icon } from '@caju-beneficios/castanha-react';\n\n<Icon name=\"caiu-caju\" />;"
      },
      {
       "h2": "Exports disponíveis"
      },
      {
       "p": "Todos os pacotes de assets exportam utilities para facilitar o desenvolvimento:"
      },
      {
       "h3": "Named exports"
      },
      {
       "p": "Imports diretos dos assets (eager loading):"
      },
      {
       "code": "import { CaiuCaju, BusinessLine } from '@caju-beneficios/castanha-icons';\nimport { FinancesCartaoFrente } from '@caju-beneficios/castanha-illustrations';\nimport { SeparandoCartao } from '@caju-beneficios/castanha-motion';"
      },
      {
       "h3": "LIST exports"
      },
      {
       "p": "Arrays com todos os nomes disponíveis (útil para menus, autocomplete, documentação):"
      },
      {
       "code": "import { ICONS_LIST } from '@caju-beneficios/castanha-icons';\nimport { ILLUSTRATIONS_LIST } from '@caju-beneficios/castanha-illustrations';\nimport { MOTION_LIST } from '@caju-beneficios/castanha-motion';\n\nconsole.log(ICONS_LIST); // ['caiu-caju', 'business-line', ...]"
      },
      {
       "h3": "Name types"
      },
      {
       "p": "Types TypeScript para autocomplete e type-safety:"
      },
      {
       "code": "import type { IconName } from '@caju-beneficios/castanha-icons';\nimport type { IllustrationName } from '@caju-beneficios/castanha-illustrations';\nimport type { MotionName } from '@caju-beneficios/castanha-motion';\n\nconst iconName: IconName = 'caiu-caju'; // ✅ Type-safe\nconst invalid: IconName = 'invalid'; // ❌ Error: Type '\"invalid\"' is not assignable"
      },
      {
       "h2": "Comportamento do cache"
      },
      {
       "p": "O cache usa estratégia LRU (Least Recently Used):"
      },
      {
       "ul": [
        "Assets são adicionados ao cache conforme carregados",
        "Quando o cache atinge `maxSize`, o asset menos recente é removido",
        "Acessar um asset marca ele como \"recente\", evitando remoção"
       ]
      },
      {
       "p": "Com `persist: true`:"
      },
      {
       "ul": [
        "Assets também são salvos no `localStorage`",
        "Sobrevivem a reloads e fechamento do navegador",
        "Respeitam `staleTime` para invalidação automática"
       ]
      },
      {
       "h2": "Troubleshooting"
      },
      {
       "p": "Soluções para problemas comuns ao configurar o sistema de cacheamento."
      },
      {
       "h3": "Assets não carregam (lazy loading)"
      },
      {
       "p": "Verifique se o `CastanhaProvider` está configurado:"
      },
      {
       "code": "<CastanhaProvider cache={{ icons: true }}>\n  <App />\n</CastanhaProvider>"
      },
      {
       "h3": "Console error: \"requires CastanhaProvider\""
      },
      {
       "p": "O componente está tentando usar lazy loading sem o provider. Opções:"
      },
      {
       "ul": [
        "Adicione o provider",
        "Ou use eager loading: `<Icon name={ImportedIcon} />`"
       ]
      },
      {
       "h3": "localStorage quota exceeded"
      },
      {
       "p": "O sistema remove automaticamente assets antigos quando o limite é atingido. Para evitar:"
      },
      {
       "ul": [
        "Reduza `maxSize`",
        "Ajuste `staleTime` para expirar assets mais cedo",
        "Desabilite `persist` se não for necessário"
       ]
      },
      {
       "h3": "Dev tools não aparecem"
      },
      {
       "p": "As dev tools (`__castanha__`) só são expostas em ambiente de desenvolvimento. Verifique:"
      },
      {
       "ul": [
        "`NODE_ENV` está definido como `'development'`",
        "No Storybook, use o contexto do iframe: `frames[0].__castanha__.cachedAssets()`"
       ]
      },
      {
       "h3": "Assets exibindo o fallback (placeholder)"
      },
      {
       "p": "Se assets renderizam como placeholder mesmo com o provider configurado, não é problema de cache — o cache em memória e o `localStorage` nunca guardam misses. Nesse caso, o asset não está no bundle."
      },
      {
       "p": "Com o Castanha Optimizer, isso significa que o scanner não detectou o asset (nome dinâmico → use o `safelist`) ou o registry saiu vazio. Veja o [Troubleshooting do Optimizer](#/dev-universe/optimizer)."
      },
      {
       "h2": "Otimização de build"
      },
      {
       "p": "O `CastanhaProvider` carrega assets sob demanda, mas sem o Castanha Optimizer o bundler gera um chunk por asset do catálogo completo:"
      },
      {
       "ul": [
        "Sem Optimizer: todos os assets do catálogo geram chunks (200+)",
        "Com Optimizer: escaneia o código-fonte e gera virtual modules apenas para os assets usados"
       ]
      },
      {
       "p": "Veja o [Castanha Optimizer](#/dev-universe/optimizer) para instruções de instalação e configuração."
      }
     ]
    }
   ],
   "lede": "Cacheamento e otimização"
  },
  {
   "id": "dev-grid",
   "name": "Grid e breakpoints",
   "platform": "react",
   "tabs": [
    {
     "id": "grid",
     "title": "Grid e breakpoints",
     "source": "guides/grid",
     "blocks": [
      {
       "p": "O Castanha expõe mixins SCSS para responsividade e custom properties CSS para sistema de grid. Importe apenas o que for necessário:"
      },
      {
       "code": "/* custom properties de grid (--grid-columns, --grid-gutter, --grid-margin) */\nimport '@caju-beneficios/castanha-react/styles/grid';"
      },
      {
       "code": "/* mixins de responsividade (breakpoint-min, breakpoint-max, …) */\n@use '@caju-beneficios/castanha-react/styles/breakpoints' as *;"
      },
      {
       "h2": "Breakpoints"
      },
      {
       "p": "O sistema segue mobile-first: a base (0px) não precisa de media query. Os breakpoints nomeados cobrem tablet em diante."
      },
      {
       "ul": [
        "`small` — 744px — tablet",
        "`medium` — 1024px — laptop (code-only, herda grid do tablet)",
        "`large` — 1366px — pages (desktop)",
        "`largest` — 1920px — wide"
       ]
      },
      {
       "h2": "CSS Custom Properties de grid"
      },
      {
       "p": "As propriedades abaixo são definidas automaticamente por breakpoint e podem ser consumidas em qualquer componente:"
      },
      {
       "ul": [
        "até small — 0–743px",
        "`--grid-columns: 4` · `--grid-gutter: 16px` · `--grid-margin: 20px`",
        "small até large — 744–1365px",
        "`--grid-columns: 8` · `--grid-gutter: 8px` · `--grid-margin: 16px`",
        "a partir de large — 1366px+",
        "`--grid-columns: 12` · `--grid-gutter: 20px` · `--grid-margin: 104px`"
       ]
      },
      {
       "code": ".my-layout {\n  padding: 0 var(--grid-margin);\n  gap: var(--grid-gutter);\n  grid-template-columns: repeat(var(--grid-columns), 1fr);\n}"
      },
      {
       "h2": "A partir de um breakpoint"
      },
      {
       "p": "`breakpoint-min` aplica estilos a partir de um breakpoint — segue o padrão mobile-first:"
      },
      {
       "code": ".card {\n  padding: 16px;\n\n  @include breakpoint-min('small') {\n    padding: 24px;\n  }\n\n  @include breakpoint-min('large') {\n    padding: 32px;\n  }\n}"
      },
      {
       "h2": "Abaixo de um breakpoint"
      },
      {
       "p": "`breakpoint-max` aplica estilos abaixo de um breakpoint — útil para ocultar elementos em telas maiores:"
      },
      {
       "code": ".sidebar {\n  @include breakpoint-max('small') {\n    display: none;\n  }\n}"
      },
      {
       "h2": "Entre dois breakpoints"
      },
      {
       "p": "`breakpoint-between` aplica estilos dentro de um intervalo de dois breakpoints:"
      },
      {
       "code": ".banner {\n  @include breakpoint-between('small', 'large') {\n    font-size: 20px;\n  }\n}"
      },
      {
       "h2": "Exatamente em um breakpoint"
      },
      {
       "p": "`breakpoint-only` aplica estilos somente no intervalo do breakpoint especificado — do seu valor até o início do próximo. Em `largest` (o maior), comporta-se como `breakpoint-min`:"
      },
      {
       "code": ".grid {\n  @include breakpoint-only('medium') {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}"
      },
      {
       "h2": "Layout responsivo completo"
      },
      {
       "p": "Exemplo combinando múltiplos mixins com as custom properties de grid:"
      },
      {
       "code": ".product-grid {\n  display: grid;\n  gap: var(--grid-gutter);\n  grid-template-columns: repeat(var(--grid-columns), 1fr);\n  padding: 0 var(--grid-margin);\n\n  @include breakpoint-min('medium') {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @include breakpoint-min('large') {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}"
      },
      {
       "p": "Para layout de componentes com CSS Grid e React, veja Grid."
      }
     ]
    }
   ],
   "lede": "Grid e Breakpoints"
  },
  {
   "id": "dev-tokens",
   "name": "Design tokens",
   "platform": "react",
   "tabs": [
    {
     "id": "visao",
     "title": "Visão geral",
     "source": "design-tokens/overview",
     "blocks": [
      {
       "p": "Design Tokens representam valores visuais com nomes descritivos. Eles unificam uma fonte única da verdade entre design e código — transformando valores como hexadecimais, tamanhos de fonte e sombras em variáveis reutilizáveis e significativas."
      },
      {
       "h2": "Tokens Globais"
      },
      {
       "p": "São a camada base dos tokens, representando valores primitivos sem contexto de uso — apenas dando nomes mais descritivos aos valores brutos."
      },
      {
       "note": "🎨 `$castanha-colors-neutral-100` → `#fcfcfc`"
      },
      {
       "h2": "Tokens Semânticos"
      },
      {
       "p": "Na camada intermediária, tokens semânticos atribuem significado e contexto aos tokens globais, facilitando a compreensão de quando e onde utilizar cada valor."
      },
      {
       "note": "🎨 `$castanha-colors-surface-primary` → `$castanha-colors-neutral-100`"
      },
      {
       "h2": "Tokens de Componente"
      },
      {
       "p": "E, na camada mais específica, tokens de componente definem valores exclusivos para componentes individuais. Eles consomem tokens semânticos para construir estilizações específicas."
      },
      {
       "note": "🎨 `$castanha-button-background-default` → `$castanha-colors-surface-primary`"
      },
      {
       "note": "Os valores de cada token (cores, tamanhos, bordas, opacidade, elevação e tipografia) estão em [Tema Caju](#/caju-theme), lidos do Figma."
      }
     ]
    },
    {
     "id": "fonte",
     "title": "Fonte da verdade",
     "source": "design-tokens/source-of-truth",
     "blocks": [
      {
       "p": "Os tokens do Castanha seguem um fluxo automatizado, utilizando o [Castanha Castoken](#/dev-universe/castoken) para manter uma fonte única da verdade sincronizada entre o Figma e as stacks de desenvolvimento."
      },
      {
       "h2": "Por trás das Castanhas"
      },
      {
       "p": "No Figma, os designers trabalham utilizando 2 composições:"
      },
      {
       "ul": [
        "Figma Variables: Cores, espaçamentos, bordas, e outros valores",
        "Figma Styles: Uniões mais complexas, como tipografias — que unem pesos, tamanhos, entre-linhas, etc."
       ]
      },
      {
       "p": "Com o [Castanha Castoken](#/dev-universe/castoken), os designers selecionam quais valores serão exportados e, ao publicar, sincronizam automaticamente com o pacote `@caju-beneficios/castanha-tokens`."
      },
      {
       "h3": "Exportação do Figma"
      },
      {
       "p": "O plugin converte e exporta um arquivo JSON contendo todos os design tokens:"
      },
      {
       "code": "packages/castanha-tokens/src/tokens/figma-tokens.json"
      },
      {
       "p": "Este arquivo segue o formato do Figma Tokens (compatível com Style Dictionary), facilitando a conversão para múltiplas plataformas:"
      },
      {
       "code": "{\n  \"Caju\": {\n    \"Light\": {\n      \"Common\": {\n        \"Colors\": {\n          \"Accent\": {\n            \"Solid\": {\n              \"medium\": { \"$value\": \"#E80537\", \"$type\": \"color\" }\n            }\n          }\n        },\n        \"Sizes\": {\n          \"8\": { \"$value\": \"8px\", \"$type\": \"dimension\" },\n          \"16\": { \"$value\": \"16px\", \"$type\": \"dimension\" },\n          \"24\": { \"$value\": \"24px\", \"$type\": \"dimension\" }\n        }\n      }\n    }\n  }\n}"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "A estrutura do JSON segue o padrão `Tema > Modo > Common > Categoria`. Isso permite suporte a múltiplos temas e modos (ex: `caju-light`, `caju-dark`) a partir de um único arquivo."
       }
      },
      {
       "h3": "Build com Style Dictionary"
      },
      {
       "p": "O [Style Dictionary](https://styledictionary.com/) transforma os tokens JSON em múltiplos formatos. O build lê dinamicamente os combos tema/modo presentes no JSON — sem necessidade de hardcode:"
      },
      {
       "code": "// packages/castanha-tokens/src/config/style-dictionary.config.ts\nexport function createConfig(combos: Array<[string, string]>): Config {\n  const platforms: Config['platforms'] = {};\n\n  for (const [theme, mode] of combos) {\n    const slug = `${theme.toLowerCase()}-${mode.toLowerCase()}`;\n    platforms[`css-${slug}`] = createCssPlatform(theme, mode); // → dist/css/caju-light.css\n    platforms[`scss-${slug}`] = createScssPlatform(theme, mode); // → dist/scss/caju-light.scss\n    platforms[`ts-${slug}`] = createTsPlatform(theme, mode); // → dist/tokens/caju-light.js\n    platforms[`dart-${slug}`] = createDartPlatform(theme, mode); // → dist/dart/caju-light.dart\n  }\n\n  platforms['docs'] = docsPlatform; // → dist/docs/*.json\n\n  return { source: ['src/tokens/figma-tokens.json'], usesDtcg: true, platforms };\n}"
      },
      {
       "h3": "Distribuição"
      },
      {
       "p": "Por fim, os tokens transformados pelo Style Dictionary são distribuídos via GitHub Packages da Caju em `@caju-beneficios/castanha-tokens`"
      },
      {
       "code": "┌────────────────────────────────────┐\n│            FIGMA PLUGIN            │\n│ @caju-beneficios/castanha-castoken │\n│     export variables + styles      │\n└────────────────────────────────────┘\n                │ GitHub Export\n                ▼\n┌──────────────────────────────────┐\n│ @caju-beneficios/castanha-tokens │\n└──────────────────────────────────┘\n                │ Style Dictionary\n                ▼\n│── dist/\n│   ├── css/\n│   │   ├── caju-light.css                 (tema claro)\n│   │   └── caju-dark.css                  (tema escuro)\n│   │\n│   ├── scss/\n│   │   ├── caju-light.scss                (tema claro)\n│   │   └── caju-dark.scss                 (tema escuro)\n│   │\n│   ├── tokens/\n│   │   ├── caju-light.js                  (tema claro - ESM)\n│   │   ├── caju-light.d.ts                (TypeScript types)\n│   │   ├── caju-light.cjs                 (tema claro - CommonJS)\n│   │   ├── caju-dark.js                   (tema escuro - ESM)\n│   │   ├── caju-dark.d.ts                 (TypeScript types)\n│   │   ├── caju-dark.cjs                  (tema escuro - CommonJS)\n│   │   │\n│   ├── dart/\n│   │   ├── caju-light.dart                (tema claro)\n│   │   └── caju-dark.dart                 (tema escuro)\n│   │\n│   └── docs/\n│       ├── all.json                       (todos os tokens)\n│       ├── colors.json                    (tokens de cores)\n│       ├── sizes.json                     (tokens de tamanhos)\n│       ├── borders.json                   (tokens de bordas)\n│       ├── elevations.json                (tokens de elevação)\n│       ├── font.json                      (tokens de fonte)\n│       └── opacity.json                   (tokens de opacidade)\n│\n└── [out] src/tokens/\n    └── figma-tokens.json                  (generated by Castanha Castoken)\n  "
      },
      {
       "h2": "Links úteis"
      },
      {
       "ul": [
        "[Figma do Castanha](https://www.figma.com/design/Fr0ZkhpffyOiiQYEm2RPId/2.--Castanha-DS--Core-components)",
        "[Style Dictionary Docs](https://amzn.github.io/style-dictionary/)"
       ]
      }
     ]
    }
   ],
   "lede": "O que são Design Tokens?"
  },
  {
   "id": "dev-universe",
   "name": "Castanha Universe",
   "platform": "react",
   "tabs": [
    {
     "id": "intellisense",
     "title": "Intellisense",
     "source": "castanha-universe/intellisense",
     "blocks": [
      {
       "p": "O [Castanha Intellisense](https://github.com/caju-beneficios/castanha-intellisense) é uma extensão para [VSCode](https://code.visualstudio.com/) que oferece autocomplete e syntax highlight para os design tokens do Castanha."
      },
      {
       "h2": "Recursos"
      },
      {
       "p": "A extensão suporta arquivos `.scss`, `.dart`, `.js` e `.ts` com duas funcionalidades principais:"
      },
      {
       "h3": "Autocomplete"
      },
      {
       "p": "Em arquivos `.scss`, ao digitar `$castanha-`, você recebe sugestões automáticas de todos os tokens disponíveis — incluindo cores (`color`), espaçamentos (`space`), e outros."
      },
      {
       "h3": "Code Highlight"
      },
      {
       "p": "Ao instalar a extensão, o VSCode destaca automaticamente os tokens na IDE:"
      },
      {
       "ul": [
        "Tokens de cor — o background da variável exibe a cor do token",
        "Demais tokens — ao passar o mouse, exibe o nome completo e o valor resolvido (px, hexadecimal, etc.)"
       ]
      },
      {
       "p": "Para arquivos `.dart`, tokens de cor também incluem a conversão para os valores nativos da linguagem."
      }
     ]
    },
    {
     "id": "castoken",
     "title": "Castoken",
     "source": "castanha-universe/castoken",
     "blocks": [
      {
       "p": "O [Castoken](https://github.com/caju-beneficios/castanha-castoken) é um plugin para Figma que facilita a integração entre design tokens do Figma e o repositório GitHub do Castanha — garantindo que design e código estejam sempre sincronizados."
      },
      {
       "h2": "Recursos"
      },
      {
       "p": "O plugin permite exportar variables e styles do Figma de duas formas:"
      },
      {
       "h3": "Markdown"
      },
      {
       "p": "Gera uma tabela Markdown que pode ser:"
      },
      {
       "ul": [
        "Baixada como arquivo",
        "Copiada para área de transferência"
       ]
      },
      {
       "p": "Ideal para documentação ou compartilhamento rápido."
      },
      {
       "h3": "Integração com GitHub"
      },
      {
       "p": "Exporte design tokens diretamente de qualquer arquivo Figma da Caju para o [repositório do Castanha no GitHub](https://github.com/caju-beneficios/castanha)."
      }
     ]
    },
    {
     "id": "optimizer",
     "title": "Optimizer",
     "source": "castanha-universe/optimizer",
     "blocks": [
      {
       "p": "O Castanha Optimizer é um plugin de build para Vite, Rollup, Webpack e esbuild que resolve três problemas automaticamente: bundle de assets proporcional ao uso, resolução de sub-pacotes sem instalação manual e injeção do CSS de componentes em production builds."
      },
      {
       "h2": "Instalação"
      },
      {
       "p": "O plugin já está incluído no `@caju-beneficios/castanha-react`. Nenhuma dependência adicional é necessária."
      },
      {
       "h3": "Vite (recomendado)"
      },
      {
       "code": "// vite.config.ts\nimport { castanhaOptimizer } from '@caju-beneficios/castanha-react/plugin';\nimport { defineConfig } from 'vite';\n\nexport default defineConfig({\n  plugins: [\n    castanhaOptimizer.vite({\n      include: ['src/**/*.{tsx,jsx,ts,js}'],\n    }),\n  ],\n  optimizeDeps: {\n    exclude: ['@caju-beneficios/castanha-react'],\n  },\n});"
      },
      {
       "note": "O `optimizeDeps.exclude` impede o Vite de pré-bundle o `castanha-react` via esbuild antes dos hooks do plugin rodarem."
      },
      {
       "h3": "Rollup"
      },
      {
       "code": "// rollup.config.ts\nimport { castanhaOptimizer } from '@caju-beneficios/castanha-react/plugin';\n\nexport default {\n  plugins: [\n    castanhaOptimizer.rollup({\n      include: ['src/**/*.{tsx,jsx,ts,js}'],\n    }),\n  ],\n};"
      },
      {
       "h3": "Webpack"
      },
      {
       "code": "// webpack.config.js\nconst { castanhaOptimizer } = require('@caju-beneficios/castanha-react/plugin');\n\nmodule.exports = {\n  plugins: [\n    castanhaOptimizer.webpack({\n      include: ['src/**/*.{tsx,jsx,ts,js}'],\n    }),\n  ],\n};"
      },
      {
       "h3": "esbuild"
      },
      {
       "code": "// build.ts\nimport { castanhaOptimizer } from '@caju-beneficios/castanha-react/plugin';\nimport { build } from 'esbuild';\n\nawait build({\n  plugins: [\n    castanhaOptimizer.esbuild({\n      include: ['src/**/*.{tsx,jsx,ts,js}'],\n    }),\n  ],\n});"
      },
      {
       "h2": "Como funciona"
      },
      {
       "p": "O Optimizer é composto por três features independentes que atuam em conjunto durante o build."
      },
      {
       "h3": "Virtual Registry"
      },
      {
       "p": "Sem o plugin, o bundler gera um chunk separado para cada asset do catálogo — resultando em 200+ arquivos no `dist/assets/` mesmo que nenhum icon ou illustration seja usado."
      },
      {
       "p": "Com o plugin, o scanner detecta quais assets estão em uso e substitui os registries por virtual modules contendo apenas esses assets — o bundle fica proporcional ao uso real."
      },
      {
       "code": "// Detectado automaticamente — entra no bundle\n<Icon name=\"business-line\" />\n<Illustration name=\"empty-state\" />\n<Button leadIcon=\"cards-line\" />        {/* props com nomes de assets também são detectadas */}\n\n// Nome dinâmico — não detectado; adicionar ao safelist\n<Icon name={iconName} />"
      },
      {
       "p": "Em dev mode com Vite, o Optimizer reescaneia a cada alteração de arquivo e invalida os virtual modules, disparando HMR sem reiniciar o servidor."
      },
      {
       "h3": "Asset Resolver"
      },
      {
       "p": "Resolve imports dos sub-pacotes `castanha-icons`, `castanha-illustrations` e `castanha-motion` usando o contexto de instalação do próprio `castanha-react`. O consumer não precisa instalar esses pacotes diretamente."
      },
      {
       "h3": "CSS Injection"
      },
      {
       "p": "Em production builds, CSS importado de `node_modules` não é extraído automaticamente pelos bundlers."
      },
      {
       "p": "O Optimizer intercepta `@caju-beneficios/castanha-react/styles` e o substitui por um virtual module com o CSS compilado dos componentes — processado normalmente pela pipeline do bundler, sem arquivos extras no output."
      },
      {
       "code": "// main.ts ou equivalente\nimport '@caju-beneficios/castanha-react/styles'; // ← interceptado pelo Optimizer"
      },
      {
       "h2": "Opções"
      },
      {
       "code": "castanhaOptimizer.vite({\n  // Arquivos a escanear. Default: ['src/**/*.{tsx,jsx,ts,js}']\n  include: ['src/**/*.tsx'],\n\n  // Arquivos a ignorar. Default: testes, specs, stories e node_modules\n  exclude: ['src/mocks/**'],\n\n  // Assets com nomes dinâmicos que o scanner não detecta\n  safelist: {\n    icons: ['business-line', 'cards-line'],\n    illustrations: ['finances-cartao-frente'],\n    motions: ['separando-cartao'],\n  },\n\n  // Diretório base dos globs. Default: process.cwd() (no Vite, o root resolvido da config)\n  cwd: './app',\n\n  // Loga a contagem de assets detectados por tipo durante o build\n  debug: true,\n});"
      },
      {
       "h3": "Safelist"
      },
      {
       "p": "O scanner detecta assets com nomes estáticos em qualquer prop:"
      },
      {
       "code": "<Icon name=\"business-line\" />           {/* ✅ detectado */}\n<Button leadIcon=\"cards-line\" />        {/* ✅ detectado */}\n<AppCard icon=\"my-icon-line\" />         {/* ✅ detectado — wrapper custom */}"
      },
      {
       "p": "Nomes dinâmicos não são detectados — inclua-os no `safelist`:"
      },
      {
       "code": "const icon = condition ? 'business-line' : 'cards-line';\n<Icon name={icon} />  {/* ⚠️ não detectado — adicione ao safelist */}"
      },
      {
       "p": "Se um asset dinâmico não estiver no `safelist`, o console exibirá um aviso em runtime:"
      },
      {
       "code": "[castanha] icon \"business-line\" was requested but is not in the bundle.\nAdd it to the plugin safelist or use a named import instead."
      },
      {
       "h2": "Sem o plugin"
      },
      {
       "p": "O bundle funciona normalmente sem o Optimizer — os assets permanecem disponíveis via lazy loading e o `CastanhaProvider` tem comportamento idêntico. A diferença está no número de chunks e no CSS."
      },
      {
       "ul": [
        "Com Optimizer: apenas os assets usados geram chunks; `./styles` serve o CSS via virtual module",
        "Sem Optimizer: todos os assets do catálogo geram chunks (200+); use `./components-styles` para o CSS"
       ]
      },
      {
       "code": "// Sem o Optimizer — importe o CSS estático completo\nimport '@caju-beneficios/castanha-react/components-styles';"
      },
      {
       "h2": "Troubleshooting"
      },
      {
       "h3": "Assets não encontrados em runtime"
      },
      {
       "p": "Se o console exibir avisos de assets não encontrados mesmo para nomes estáticos, ative `debug: true` — o build passa a logar a contagem detectada por tipo (`[castanha] optimizer: icons=… illustrations=… motions=…`). Contagem zerada indica que o scanner não encontrou os arquivos-fonte."
      },
      {
       "p": "No Vite, o scanner resolve o `include` a partir do `root` da config. Em outros bundlers, ou quando o build roda de um diretório diferente, use a opção `cwd` para apontar a base dos globs:"
      },
      {
       "code": "castanhaOptimizer.vite({\n  include: ['src/**/*.{tsx,jsx,ts,js}'],\n  cwd: '/caminho/para/o/app', // base dos globs quando não for o process.cwd()\n  debug: true,\n});"
      },
      {
       "p": "Se o asset tem nome dinâmico, o scan estático não o detecta — inclua-o no `safelist`."
      },
      {
       "h3": "CSS não aparece em produção"
      },
      {
       "p": "Verifique se `@caju-beneficios/castanha-react/styles` está no entry point e se `optimizeDeps.exclude` está configurado — sem ele, o Vite pode pré-bundle o `castanha-react` antes do plugin interceptar o import."
      },
      {
       "h2": "Test utils"
      },
      {
       "p": "Para testes com Jest ou Vitest, o pacote expõe utilitários em `@caju-beneficios/castanha-react/test-utils`."
      },
      {
       "h3": "`CastanhaTestProvider`"
      },
      {
       "p": "Envolve componentes que dependem do `CastanhaContext` sem configurar loaders reais:"
      },
      {
       "code": "import { CastanhaTestProvider } from '@caju-beneficios/castanha-react/test-utils';\nimport { render } from '@testing-library/react';\n\nit('renders correctly', () => {\n  render(\n    <CastanhaTestProvider>\n      <MyComponent />\n    </CastanhaTestProvider>\n  );\n});"
      },
      {
       "h3": "`mockCastanhaRegistry`"
      },
      {
       "p": "Substitui os registries estáticos por mocks síncronos — compatível com Jest e Vitest:"
      },
      {
       "code": "// jest.setup.ts ou vitest.setup.ts\nimport { mockCastanhaRegistry } from '@caju-beneficios/castanha-react/test-utils';\n\nmockCastanhaRegistry({\n  icons: ['business-line', 'cards-line'],\n  illustrations: ['finances-cartao-frente'],\n});"
      },
      {
       "p": "Cada asset mockado resolve com um SVG simples (`<svg data-testid=\"icon-business-line\" />`), permitindo assertivas por `testid` nos testes."
      }
     ]
    }
   ],
   "lede": "Castanha Intellisense"
  },
  {
   "id": "flutter-instalacao",
   "name": "Instalação",
   "platform": "flutter",
   "tabs": [
    {
     "id": "instalacao",
     "title": "Instalação",
     "source": "widgetbook: 01. Instalação",
     "blocks": [
      {
       "p": "Os pacotes do Castanha são distribuídos através do repositório privado da Caju no GitHub, disponíveis exclusivamente para Cajuenses."
      },
      {
       "h2": "Mini apps: o Castanha chega pelo commons"
      },
      {
       "p": "Projeto que já depende do `mobile-commons` não declara o `castanha_flutter` no próprio `pubspec.yaml`. O commons passou a expor o DS num barrel dedicado, então instalar é importar:"
      },
      {
       "code": "import 'package:commons/v2/design_system.dart';\n\nCastanhaMainButton(label: 'Confirmar', onPressed: _confirm);"
      },
      {
       "p": "Por que não declarar direto:"
      },
      {
       "p": "Uma linha todas as superfícies:"
      },
      {
       "ul": [
        "`castanha_flutter` inteiro — Biblioteca estabilizada com componentes, tokens, ícones, ilustrações e motion",
        "`castds_as_is` (`Castds*`) - Biblioteca legado"
       ]
      },
      {
       "p": "No `pubspec.yaml` do mini app, as declarações do DS saem:"
      },
      {
       "code": " dependencies:\n   commons:\n     git:\n       url: git@github.com:caju-beneficios/mobile-commons.git\n-  castanha_flutter:\n-    git:\n-      url: git@github.com:caju-beneficios/mobile-castanha-ds.git\n-      path: packages/castanha-flutter\n-      ref: castanha_flutter-v1.3.0\n-  mobile_castanha_ds:\n-    git:\n-      url: git@github.com:caju-beneficios/mobile-castanha-ds.git\n-  design_system:\n-    git:\n-      url: git@github.com:caju-beneficios/mobile-design-system.git"
      },
      {
       "p": "O tema não muda: continua sendo instalado pelo app, como descrito em 02. Preparando o ambiente."
      },
      {
       "h2": "Castanha Flutter"
      },
      {
       "p": "Instalação direta — para projeto que não depende do `mobile-commons`. Se o seu depende, use a seção acima e pule esta."
      },
      {
       "p": "Pacote oficial do Castanha DS — é para onde o design system está convergindo. Todo componente novo nasce aqui, e os componentes legados (hoje em `castds_as_is`) vão sendo portados para cá com o tempo. Quanto mais projetos adotarem `castanha_flutter`, mais rápido o DS atinge cobertura e completude suficientes para aposentar a stack legada de vez."
      },
      {
       "p": "Cada pacote do monorepo é versionado e taggeado independentemente (ex: `castanha_flutter-v1.0.0`); não existe mais uma tag/branch única para \"o Castanha inteiro\"."
      },
      {
       "code": "# pubspec.yaml\ndependencies:\n  flutter:\n    sdk: flutter\n  castanha_flutter:\n    git:\n      url: git@github.com:caju-beneficios/mobile-castanha-ds.git\n      path: packages/castanha-flutter\n      ref: castanha_flutter-v1.1.0"
      },
      {
       "p": "Os pacotes de assets (`castanha_icons`, `castanha_illustrations`, `castanha_motion`) e os tokens (`castanha_tokens`) chegam como dependências."
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Nota",
        "text": "A URL usa SSH (`git@github.com`). Certifique-se de ter sua chave SSH configurada no GitHub antes de rodar `flutter pub get`. Confirme a tag mais recente em [Releases/Tags do repositório](https://github.com/caju-beneficios/mobile-castanha-ds/tags) — a versão pode não ser `1.0.0` dependendo de quando você instalar."
       }
      },
      {
       "h2": "Castanha As Is (legado)"
      },
      {
       "p": "Biblioteca legada — mantida só para compatibilidade, não recebe componentes novos e tende a cair em desuso conforme `castanha_flutter` ganha paridade. Use-a apenas para o que `castanha_flutter` ainda não cobre. Ao construir algo novo, verifique primeiro se já existe em `castanha_flutter` antes de recorrer a `castds_as_is`."
      },
      {
       "p": "Se precisar de um componente ainda não portado, instale o pacote legado lado a lado:"
      },
      {
       "code": "# pubspec.yaml\ndependencies:\n  mobile_castanha_ds:\n    git:\n      url: git@github.com:caju-beneficios/mobile-castanha-ds.git\n      ref: castds_as_is-v0.1.0"
      },
      {
       "p": "Os dois pacotes coexistem sem conflito — cada um expõe seus widgets sob prefixos diferentes (`Castanha*` no novo, `Castds*` no legado)."
      },
      {
       "h2": "Já uso o Castanha do jeito antigo?"
      },
      {
       "p": "Se seu projeto ainda importa o DS pelo pacote `mobile_castanha_ds` (git, `ref: main`, sem `path:`), troque `ref: main` por uma tag — sem alterar nenhum import no seu código."
      },
      {
       "p": "Por quê: `ref: main` não é uma versão — é um alvo que se move sozinho. Ele sempre aponta para o commit mais recente da branch principal, então qualquer mudança que chegue em `main` (incluindo um bug introduzido em qualquer outro pacote do monorepo) afeta seu projeto na hora, sem changelog, sem aviso e sem forma de permanecer numa versão que você já validou."
      },
      {
       "p": "A raiz do repositório continua sendo o pacote `mobile_castanha_ds` em qualquer commit — inclusive nos commits marcados pelas tags de `castds_as_is`. Então a troca é só isso:"
      },
      {
       "code": "   mobile_castanha_ds:\n     git:\n       url: git@github.com:caju-beneficios/mobile-castanha-ds.git\n-      ref: main\n+      ref: castds_as_is-v0.1.0"
      },
      {
       "code": "import 'package:mobile_castanha_ds/mobile_castanha_ds.dart'; // continua igual, nada muda"
      },
      {
       "note": "Confirme a tag mais recente em [Releases/Tags do repositório](https://github.com/caju-beneficios/mobile-castanha-ds/tags) antes de fixar — a versão pode não ser `castds_as_is-v0.1.0` dependendo de quando você migrar. Quando `castds_as_is` ganhar uma versão nova, atualize o `ref:` manualmente para pegá-la."
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Atenção",
        "text": "se algum arquivo do seu projeto importa `package:castds_core/...` diretamente (em vez de passar por `mobile_castanha_ds`), esse import precisa ser atualizado para `package:castds_as_is/...` — essa é a única mudança de código necessária, e só se aplica a quem faz esse tipo de import direto."
       }
      },
      {
       "h2": "Requisitos"
      },
      {
       "h3": "Versões Mínimas"
      },
      {
       "ul": [
        "Flutter: 3.41.6 ou superior",
        "Dart: 3.11.4 ou superior"
       ]
      },
      {
       "h3": "Acesso ao repositório"
      },
      {
       "p": "O repositório é privado. Verifique o acesso SSH antes de instalar:"
      },
      {
       "code": "# Testar autenticação SSH com o GitHub\nssh -T git@github.com\n\n# Instalar as dependências\nflutter pub get"
      }
     ]
    }
   ],
   "lede": "O que tem no Castanha?"
  },
  {
   "id": "flutter-ambiente",
   "name": "Preparando o ambiente",
   "platform": "flutter",
   "tabs": [
    {
     "id": "ambiente",
     "title": "Preparando o ambiente",
     "source": "widgetbook: 02. Preparando o ambiente",
     "blocks": [
      {
       "p": "Configure o tema do Castanha DS antes de usar os componentes."
      },
      {
       "h2": "Configurando o tema"
      },
      {
       "p": "Os tokens do DS são um `ThemeExtension`, então entram no `ThemeData` do app. A propagação e a troca claro/escuro passam a ser do próprio Flutter — não há provider de tema para instalar."
      },
      {
       "code": "import 'package:castanha_flutter/castanha_flutter.dart';\n\nvoid main() {\n  runApp(\n    MaterialApp(\n      theme: CastanhaTheme.light(),\n      darkTheme: CastanhaTheme.dark(),\n      themeMode: ThemeMode.system,\n      home: const MyApp(),\n    ),\n  );\n}"
      },
      {
       "p": "Já tem um `ThemeData` próprio? Componha com ele:"
      },
      {
       "code": "theme: CastanhaTheme.light(base: meuThemeData),"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Migrando de `castds_as_is`",
        "text": "se seu projeto ainda usa componentes legados (`Castds*`), mantenha o `CastdsThemeManagerV2` (do pacote `castds_as_is`) no seu `ChangeNotifierProvider` — ele é independente do tema do `castanha_flutter`, e os dois coexistem sem conflito enquanto a migração widget a widget não termina."
       }
      },
      {
       "h3": "Trocando de tema (claro/escuro)"
      },
      {
       "p": "Com `themeMode: ThemeMode.system` a troca acompanha o sistema operacional. Para controlar pelo app, guarde o `ThemeMode` no seu gerenciador de estado e passe para o `MaterialApp`."
      },
      {
       "h3": "Subárvores sem MaterialApp"
      },
      {
       "p": "Para árvores Cupertino, subárvores com tema próprio ou testes de widget isolados, use `CastanhaThemeProvider`:"
      },
      {
       "code": "CastanhaThemeProvider(\n  tokens: castanhaTokensCajuDark,\n  child: const MyWidget(),\n)"
      },
      {
       "h2": "Acessando tokens nos widgets"
      },
      {
       "p": "Use `context.castanhaTheme` para acessar os tokens de design diretamente — os getters já retornam `Color`/`double` prontos para uso, sem conversão:"
      },
      {
       "code": "import 'package:castanha_flutter/castanha_flutter.dart';\nimport 'package:flutter/widgets.dart';\n\n@override\nWidget build(BuildContext context) {\n  final theme = context.castanhaTheme;\n\n  return Container(\n    color: theme.colorsSurfaceDefault,\n    padding: EdgeInsets.all(theme.sizes16),\n    child: Text(\n      'Olá, Castanha!',\n      style: TextStyle(color: theme.colorsTextIntense),\n    ),\n  );\n}"
      },
      {
       "alert": {
        "appearance": "informative",
        "label": "Dica",
        "text": "`context.castanhaTheme` já usa `listen: false` internamente — não causa rebuild ao trocar o tema. Para reagir a mudanças de tema (ex: um switch de dark mode), use `context.watch<CastanhaTheme>().tokens`."
       }
      },
      {
       "h2": "Testando a configuração"
      },
      {
       "p": "Após configurar o tema, teste com um componente simples:"
      },
      {
       "code": "import 'package:castanha_flutter/castanha_flutter.dart';\nimport 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(\n    MaterialApp(\n      theme: CastanhaTheme.light(),\n      home: Scaffold(\n        body: Center(\n          child: CastanhaText.heading(\n            'Olá, Castanha!',\n            size: CastanhaHeadingSize.mediumHeading,\n          ),\n        ),\n      ),\n    ),\n  );\n}"
      },
      {
       "p": "Se o texto renderizar com a tipografia do Castanha, o ambiente está configurado corretamente."
      }
     ]
    }
   ],
   "lede": "Preparando o ambiente"
  },
  {
   "id": "flutter-componentes",
   "name": "Usando os componentes",
   "platform": "flutter",
   "tabs": [
    {
     "id": "componentes",
     "title": "Usando os componentes",
     "source": "widgetbook: 03. Usando os componentes",
     "blocks": [
      {
       "p": "Aprenda a usar os componentes do Castanha DS com exemplos práticos."
      },
      {
       "h2": "Importação"
      },
      {
       "p": "Um único import cobre componentes, tokens e catálogos de assets:"
      },
      {
       "code": "import 'package:castanha_flutter/castanha_flutter.dart';"
      },
      {
       "p": "Isso inclui `CastanhaIcons`, `CastanhaIllustrations`, `CastanhaMotionAssets` e `CastanhaTokens` — nenhum import direto dos pacotes de asset é necessário."
      },
      {
       "h2": "Texto — CastanhaText"
      },
      {
       "p": "Cada construtor nomeado tem finalidade semântica, tamanho e peso tipográfico próprios:"
      },
      {
       "code": "// Corpo — size controla o peso (w400/w500/w700); 16sp, lh 150%\nCastanhaText.body('Parágrafo', size: CastanhaBodySize.regular)\n\n// Heading — size define o tamanho de 24sp a 80sp; sempre w700, lh 160%\nCastanhaText.heading('Título', size: CastanhaHeadingSize.mediumHeading)\n\n// Label — igual a body mas com lh 100% (ideal para formulários)\nCastanhaText.label('Nome', size: CastanhaLabelSize.medium)\n\n// Link — underline automático; tamanho de 14sp a 24sp; sempre w700\nCastanhaText.link('Saiba mais', size: CastanhaLinkSize.medium)\n\n// Decorativo — excluído da árvore de semântica (aria-hidden)\nCastanhaText.decorative('✦', size: CastanhaDecorativeSize.large)"
      },
      {
       "h2": "Ícone — CastanhaIcon"
      },
      {
       "p": "Ícones sem `semanticsLabel` são excluídos da árvore de semântica por padrão (decorativos). Forneça `semanticsLabel` quando o ícone transmite informação sem texto adjacente:"
      },
      {
       "code": "CastanhaIcon(icon: CastanhaIcons.checkLine)\n\nCastanhaIcon(\n  icon: CastanhaIcons.warningLine,\n  appearance: CastanhaIconAppearance.warning,\n  size: CastanhaIconSize.large,\n)\n\nCastanhaIcon(\n  icon: CastanhaIcons.informationLine,\n  appearance: CastanhaIconAppearance.informative,\n  semanticsLabel: 'Informação',\n)"
      },
      {
       "h2": "Layout — CastanhaRow / CastanhaColumn"
      },
      {
       "p": "Substituem `Row`/`Column` com `SizedBox` manual de espaçamento — o `spacing` usa a escala tokenizada de `CastanhaSpacing`, então o gap nunca fica fora do grid de design:"
      },
      {
       "code": "CastanhaRow(\n  spacing: CastanhaSpacing.spacing8,\n  children: [iconWidget, labelWidget],\n)\n\nCastanhaColumn(\n  spacing: CastanhaSpacing.spacing16,\n  children: [labelWidget, inputWidget, messageWidget],\n)"
      },
      {
       "note": "Use `Row`/`Column` puros apenas quando precisar de um alinhamento que os primitivos não suportam (ex: `MainAxisAlignment.spaceBetween`)."
      },
      {
       "h2": "Motion e Illustration"
      },
      {
       "code": "// Autoplay + loop\nCastanhaMotion(name: CastanhaMotionAssets.notificacoesGalo)\n\n// Tamanho customizado, sem loop\nCastanhaMotion(name: CastanhaMotionAssets.feedbackSuccess, width: 320)"
      },
      {
       "code": "CastanhaIllustration(name: CastanhaIllustrations.notificacoesSuccess)\n\nCastanhaIllustration(\n  name: CastanhaIllustrations.documentosAdmissao,\n  size: CastanhaIllustrationSize.large,\n  semanticsLabel: 'Documentos de admissão',\n)"
      }
     ]
    }
   ],
   "lede": "Uso na prática"
  }
 ]
};
  DATA.pages.forEach(function(p, i){
    CDS.register({ id: p.id, name: p.name, resource: true, platform: p.platform || undefined, order: 40 + i, lede: p.lede, description: p.lede });
    CDS.docs[p.id] = p.platform === "flutter" ? { source: WB, sourceLabel: "Widgetbook do castanha_flutter", tabs: p.tabs } : { source: SB, sourceLabel: "Storybook do castanha-react", tabs: p.tabs };
  });
})();
