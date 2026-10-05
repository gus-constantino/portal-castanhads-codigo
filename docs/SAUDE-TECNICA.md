# Saúde técnica

> Gerado por `node scripts/build-index.js` (o smoke entra com `--smoke`). Não editar à mão: regere o build.

## Resumo

| Verificação | Resultado |
|---|---|
| Smoke dos componentes (claro, escuro, mobile 360) | ✅ 105/105 ok · ⚠️ 10 com aviso |
| Smoke das docs (desktop e 375px) | ✅ 111 docs · 672 tabs · 0 com problema |
| Peso da primeira visita | ✅ 349 KB gzip de 600 KB · docs sob demanda: 103 arquivos |
| Numeração D/C | ✅ D 155 · C 162 |

## Componentes

Nenhuma falha.

**Avisos** (não reprovam; os do DS estão no CONFERIR)

| Componente | Aviso |
|---|---|
| backdrop | contraste (escuro): “Conteúdo da tela” 1.67:1 |
| banner | contraste (escuro): “Label” 1.67:1 · contraste (escuro): “Description” 1.67:1 |
| content-banner | contraste (escuro): “Label” 1.67:1 · contraste (escuro): “Description” 1.67:1 |
| date-input | contraste (claro): “-0000” 2.50:1 · contraste (escuro): “-0000” 2.14:1 |
| dropzone | contraste (escuro): “Selecionar arquivos” 3.74:1 |
| filter-button | contraste (escuro): “Filtros” 3.74:1 |
| pagination | mobile: 780px > 360px do frame |
| table | mobile: 1053px > 360px do frame |
| text-area | contraste (claro): “0/300” 2.50:1 · contraste (escuro): “0/300” 2.14:1 |
| text-input | contraste (claro): “0/100” 2.50:1 · contraste (escuro): “0/100” 2.14:1 |

## Docs

Nenhuma falha.

Nenhum aviso.

## Peso

| Parte | Bruto | gzip |
|---|---|---|
| Primeira visita (tudo o que o index.html carrega) | 1560 KB | 349 KB |
| dist/cds.js · componentes (110 arquivos) | 300 KB | 75 KB |
| dist/cds.js · playgrounds (103 arquivos) | 149 KB | 25 KB |
| dist/cds.js · recursos (6 arquivos) | 163 KB | 52 KB |
| Docs sob demanda (103 arquivos, uma por componente aberto) | — | 275 KB no total |

Limite: 600 KB gzip na primeira visita (aviso no build; `BUDGET_STRICT=1` faz falhar).

## Numeração D/C

Última decisão: **D155** (docs/ROADMAP.md) · último item a conferir: **C162** (docs/CONFERIR.md).

Linha nova usa apelido (`D+nome` / `C+nome`); `node scripts/dev/numerar.js` numera depois do merge. O CI roda `numerar.js --check`.

## Como rodar

```
node scripts/build-index.js --smoke     # build + smoke (componentes e docs) + este painel
node scripts/dev/smoke.js --avisos      # só o smoke, listando os avisos
node scripts/dev/numerar.js --check     # numeração D/C
```

O GitHub roda o mesmo em todo push na `teste` e na `main` (aba Actions).
