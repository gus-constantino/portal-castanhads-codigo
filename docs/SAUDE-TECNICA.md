# Saúde técnica

> Gerado por `node scripts/build-index.js` (o smoke entra com `--smoke`). Não editar à mão: regere o build.

## Resumo

| Verificação | Resultado |
|---|---|
| Smoke dos componentes (claro, escuro, mobile 360) | ✅ 122/122 ok · ⚠️ 12 com aviso |
| Smoke das docs (desktop e 375px) | ✅ 146 docs · 770 tabs · 0 com problema |
| Peso da primeira visita | ❌ 664 KB gzip de 600 KB · docs sob demanda: 113 arquivos |
## Componentes

Nenhuma falha.

**Avisos** (não reprovam; os do DS estão no CONFERIR)

| Componente | Aviso |
|---|---|
| backdrop | contraste (escuro): “Conteúdo da tela” 1.67:1 (C126) |
| banner | contraste (escuro): “Label” 1.67:1 (C126) · contraste (escuro): “Description” 1.67:1 (C126) |
| carousel | contraste (escuro): “Label” 1.67:1 (C126) · contraste (escuro): “Description” 1.67:1 (C126) |
| chat-input | contraste (claro): “0/500” 2.50:1 (C128) · contraste (escuro): “0/500” 2.14:1 (C128) |
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
| Primeira visita (tudo o que o index.html carrega) | 2789 KB | 664 KB |
| dist/cds.js · componentes (120 arquivos) | 377 KB | 96 KB |
| dist/cds.js · playgrounds (113 arquivos) | 177 KB | 32 KB |
| dist/cds.js · recursos (41 arquivos) | 773 KB | 221 KB |
| Docs sob demanda (113 arquivos, uma por componente aberto) | — | 311 KB no total |

Limite: 600 KB gzip na primeira visita (aviso no build; `BUDGET_STRICT=1` faz falhar).

## Como rodar

```
node scripts/build-index.js --smoke     # build + smoke (componentes e docs) + este painel
node scripts/dev/smoke.js --avisos      # só o smoke, listando os avisos
```

O GitHub roda o mesmo em todo push na `teste` e na `main` (aba Actions).
