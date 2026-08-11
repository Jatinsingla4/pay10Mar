#!/usr/bin/env bash
# Verifies proxy.js's rate limiter: 10 requests/minute per IP, 11th+ rejected.
# All requests here share one source IP (this machine hitting the container),
# so they land in the same bucket — that's the scenario being tested.
set -euo pipefail

URL="${1:-http://localhost:3186/api/proxy/contact/enquiry}"
TOTAL="${2:-14}"

echo "Firing $TOTAL requests at $URL ..."
pass=0
blocked=0

for i in $(seq 1 "$TOTAL"); do
  code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3186" \
    -d '{}')
  echo "request $i -> $code"
  if [ "$code" = "429" ]; then
    blocked=$((blocked + 1))
  else
    pass=$((pass + 1))
  fi
done

echo ""
echo "Not rate-limited: $pass   Rate-limited (429): $blocked"

if [ "$pass" -le 10 ] && [ "$blocked" -gt 0 ]; then
  echo "PASS: limiter kicked in after at most 10 requests."
  exit 0
else
  echo "FAIL: expected <=10 non-429 responses and at least one 429."
  exit 1
fi
