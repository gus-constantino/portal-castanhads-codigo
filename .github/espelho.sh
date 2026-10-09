#!/usr/bin/env bash
# Espelho da migração: traz a main e a teste do repo de origem para este repositório com merge.
# Merge, não cópia: este repositório tem commits próprios (README e o próprio espelho).
# Conflito só no README.md fica com a versão daqui e gera aviso. Conflito em outro arquivo para o espelho.
# README que passa a citar o repo de origem depois do merge também gera aviso.
# Uso: .github/espelho.sh <url-do-repo-de-origem>   (ESPELHO_SEM_PUSH=1 não envia nem dispara o Smoke)
set -euo pipefail

ORIGEM="$1"
git remote get-url antigo >/dev/null 2>&1 || git remote add antigo "$ORIGEM"
git fetch -q --no-tags antigo main teste
git fetch -q --no-tags origin main teste

for b in main teste; do
  git checkout -q -B "$b" "origin/$b"
  if git merge-base --is-ancestor "antigo/$b" HEAD; then
    echo "$b: em dia"
    continue
  fi
  curto=$(git rev-parse --short "antigo/$b")
  if ! git merge -q --no-edit -m "Espelho: merge da $b do repo de origem ($curto)" "antigo/$b"; then
    conflitos=$(git diff --name-only --diff-filter=U | tr '\n' ' ' | sed 's/ $//')
    if [ "$conflitos" = "README.md" ]; then
      git checkout --ours README.md
      git add README.md
      git commit -q --no-edit
      echo "::warning::$b: o README.md mudou na origem ($curto) e ficou a versão deste repositório. Confira se a mudança precisa entrar aqui."
    else
      git merge --abort
      echo "::error::$b: conflito em $conflitos ao trazer $curto. Resolva o merge à mão."
      exit 1
    fi
  fi
  # O README daqui não cita o repositório de origem
  nome=$(basename "$ORIGEM" .git)
  if grep -q "$nome" README.md; then
    echo "::warning::$b: o README.md passou a citar $nome depois do merge de $curto. Tire a citação."
  fi
  echo "$b: trouxe $curto ($(git rev-parse --short HEAD))"
  if [ "${ESPELHO_SEM_PUSH:-}" != "1" ]; then
    git push -q origin "HEAD:refs/heads/$b"
    # Push feito com o GITHUB_TOKEN não dispara outros workflows: o Smoke é chamado aqui.
    gh workflow run smoke.yml --ref "$b"
  fi
done
