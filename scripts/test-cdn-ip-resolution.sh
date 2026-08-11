#!/usr/bin/env bash
# Validates getClientIp.js's hop-counting + origin-verification logic against
# the REAL running app (not a mock) by sending crafted X-Forwarded-For chains
# and checking which "bucket" the rate limiter puts them in — 11 requests in
# the same bucket trips 429, a different bucket does not.
#
# Requires the app running with:
#   TRUSTED_PROXY_COUNT=2
#   ORIGIN_VERIFY_HEADER=X-CDN-Secret
#   ORIGIN_VERIFY_VALUE=test-secret-value
set -uo pipefail

URL="${1:-http://localhost:3186/api/proxy/contact/enquiry}"
HEADER_NAME="X-CDN-Secret"
HEADER_VALUE="test-secret-value"

fire() {
  local count="$1" xff="$2" extra_header="$3"
  local blocked=0 passed=0
  for i in $(seq 1 "$count"); do
    if [ -n "$extra_header" ]; then
      code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
        -H "X-Forwarded-For: $xff" -H "$extra_header" -d '{}')
    else
      code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
        -H "X-Forwarded-For: $xff" -d '{}')
    fi
    if [ "$code" = "429" ]; then blocked=$((blocked + 1)); else passed=$((passed + 1)); fi
  done
  echo "$passed non-429, $blocked rate-limited(429)"
}

echo "=== Test 1: two legit visitors through a simulated CDN+Apache chain (depth=2) ==="
echo "Visitor A (9.9.9.9,2.2.2.2), 11 requests, with valid CDN secret:"
fire 11 "9.9.9.9, 2.2.2.2" "$HEADER_NAME: $HEADER_VALUE"
echo "Visitor B (8.8.8.8,2.2.2.2), 3 requests, with valid CDN secret — should NOT be blocked (different bucket):"
fire 3 "8.8.8.8, 2.2.2.2" "$HEADER_NAME: $HEADER_VALUE"

echo ""
echo "=== Test 2: request with NO CDN secret (simulates bypassing the CDN, hitting origin directly) ==="
echo "Same forged chain as Visitor A (whose 9.9.9.9 bucket is already saturated from Test 1) —"
echo "if this incorrectly resolves to 9.9.9.9 too, it will ALSO come back 429 immediately."
result=$(fire 3 "9.9.9.9, 2.2.2.2" "")
echo "$result"
blocked=$(echo "$result" | grep -oE '[0-9]+ rate-limited' | grep -oE '^[0-9]+')

echo ""
if [ "$blocked" -eq 0 ]; then
  echo "PASS: request without the CDN secret was NOT treated as 9.9.9.9 — origin verification held."
else
  echo "FAIL: request without the CDN secret got 429, meaning it was resolved as 9.9.9.9 — the"
  echo "hop-counting trusted a forged chain with no proof it came through the real CDN."
fi
