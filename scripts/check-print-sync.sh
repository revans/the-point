#!/usr/bin/env bash
# Validates that the hardcoded @page color stays in sync with --color-text-muted.
# @page margin boxes cannot use var() in Chrome/Edge, so both must be updated together.
#
# Run in CI or as a pre-commit hook:
#   bash scripts/check-print-sync.sh
#
# To install as a pre-commit hook:
#   ln -s ../../scripts/check-print-sync.sh .git/hooks/pre-commit

set -euo pipefail

CSS_FILE="assets/core/print.css"

PAGE_COLOR=$(grep -oP '(?<=color: )#[0-9a-fA-F]{6}(?=;)' "$CSS_FILE" | head -1)
TOKEN_COLOR=$(grep -oP '(?<=--color-text-muted:\s{7})#[0-9a-fA-F]{6}' "$CSS_FILE" | head -1)

if [ "$PAGE_COLOR" != "$TOKEN_COLOR" ]; then
  echo "SYNC ERROR: @page @bottom-right color ($PAGE_COLOR) differs from --color-text-muted ($TOKEN_COLOR)."
  echo "Update assets/core/print.css line 28 to match line 72 (or vice versa)."
  exit 1
fi

echo "OK: @page color and --color-text-muted are in sync ($PAGE_COLOR)"
