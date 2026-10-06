# Saúde técnica

> Gerado por `node scripts/build-index.js` (o smoke entra com `--smoke`). Não editar à mão: regere o build.

## Resumo

| Verificação | Resultado |
|---|---|
| Smoke dos componentes (claro, escuro, mobile 360) | ✅ 110/110 ok · ⚠️ 10 com aviso |
| Smoke das docs (desktop e 375px) | ✅ 121 docs · 694 tabs · 0 com problema |
| Peso da primeira visita | ✅ 459 KB gzip de 600 KB · docs sob demanda: 103 arquivos |
## Componentes

Nenhuma falha.

**Avisos** (não reprovam; os do DS estão no CONFERIR)

| Componente | Aviso |
|---|---|
| backdrop | contraste (escuro): “Conteúdo da tela” 1.67:1 (C126) |
| banner | contraste (escuro): “Label” 1.67:1 (C126) · contraste (escuro): “Description” 1.67:1 (C126) |
| content-banner | contraste (escuro): “Label” 1.67:1 (C126) · contraste (escuro): “Description” 1.67:1 (C126) |
| date-input | contraste (claro): “-0000” 2.50:1 (C128) · contraste (escuro): “-0000” 2.14:1 (C128) |
| dropzone | contraste (escuro): “Selecionar arquivos” 3.74:1 (C127) |
| filter-button | contraste (escuro): “Filtros” 3.74:1 (C127) |
| pagination | mobile: 780px > 360px do frame (C129) |
| table | mobile: 1053px > 360px do frame (C129) |
| text-area | contraste (claro): “0/300” 2.50:1 (C128) · contraste (escuro): “0/300” 2.14:1 (C128) |
| text-input | contraste (claro): “0/100” 2.50:1 (C128) · contraste (escuro): “0/100” 2.14:1 (C128) |

## Docs

Nenhuma falha.

Nenhum aviso.

## Peso

| Parte | Bruto | gzip |
|---|---|---|
| Primeira visita (tudo o que o index.html carrega) | 1979 KB | 459 KB |
| dist/cds.js · componentes (110 arquivos) | 300 KB | 75 KB |
| dist/cds.js · playgrounds (103 arquivos) | 149 KB | 25 KB |
| dist/cds.js · recursos (27 arquivos) | 442 KB | 130 KB |
| Docs sob demanda (103 arquivos, uma por componente aberto) | — | 276 KB no total |

Limite: 600 KB gzip na primeira visita (aviso no build; `BUDGET_STRICT=1` faz falhar).

## Como rodar

```
node scripts/build-index.js --smoke     # build + smoke (componentes e docs) + este painel
node scripts/dev/smoke.js --avisos      # só o smoke, listando os avisos
```

O GitHub roda o mesmo em todo push na `teste` e na `main` (aba Actions).
