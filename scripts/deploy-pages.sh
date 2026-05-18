#!/usr/bin/env bash
set -euo pipefail
npm run build
npx wrangler pages deploy dist
