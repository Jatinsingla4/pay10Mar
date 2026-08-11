#!/usr/bin/env bash
# Builds and runs the Docker image with real values from .env.local, so the
# full stack — including reCAPTCHA verification against Google's real API —
# behaves like production, not the dummy-values test used for rate-limit-only
# checks (that's `docker build -t pay10-test .` with no args).
#
# .env.local never leaves this machine: it's git-ignored, and this script
# only feeds its values into a local Docker build. The resulting image has
# your real secrets baked into its layers — do not push it anywhere.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env.local ]; then
  echo ".env.local not found — nothing to read secrets from." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env.local
set +a

docker build \
  --build-arg NEXT_PUBLIC_API="${NEXT_PUBLIC_API:-https://example.invalid}" \
  --build-arg NEXT_PUBLIC_IMAGE_URL="${NEXT_PUBLIC_IMAGE_URL:-https://example.invalid}" \
  --build-arg SITE_ORIGIN="${SITE_ORIGIN:-http://localhost:3186}" \
  --build-arg BACKEND_AUTH_KEY="${BACKEND_AUTH_KEY:-test-key}" \
  --build-arg RECAPTCHA_SECRET_KEY="${RECAPTCHA_SECRET_KEY:-test-secret}" \
  --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY="${NEXT_PUBLIC_RECAPTCHA_SITE_KEY:-}" \
  --build-arg TRUSTED_PROXY_COUNT="${TRUSTED_PROXY_COUNT:-1}" \
  -t pay10-prod-like .

echo ""
echo "Built. Starting container on http://localhost:3186 ..."
docker run --rm -p 3186:3186 pay10-prod-like
