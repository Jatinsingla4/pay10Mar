#!/usr/bin/env bash
#
# Fetches the app's secrets from AWS Secrets Manager and writes each one to its own
# file for the app to read via the *_FILE variables (see app/lib/secrets.js).
#
# Runs before the app starts. Nothing here is passed on a command line or echoed, so
# no value reaches the process table, the journal or shell history.
#
# Files are written under /run, which is tmpfs: the secrets exist in RAM only and
# disappear on reboot rather than sitting on disk.

set -euo pipefail
umask 077   # set before anything is created, so no file is briefly world-readable

SECRET_ID="${PAY10_SECRET_ID:?PAY10_SECRET_ID must be set (e.g. pay10/frontend)}"
REGION="${AWS_REGION:-ap-south-1}"
DEST="${PAY10_SECRET_DIR:-/run/pay10-secrets}"

# Keys expected inside the Secrets Manager JSON, and the file each is written to.
# Names match the app's *_FILE variables minus the suffix.
KEYS=(BACKEND_AUTH_KEY RECAPTCHA_SECRET_KEY)

install -d -m 700 "$DEST"

payload="$(aws secretsmanager get-secret-value \
  --secret-id "$SECRET_ID" \
  --region "$REGION" \
  --query SecretString \
  --output text)"

if [ -z "$payload" ] || [ "$payload" = "None" ]; then
  echo "pay10-secrets: $SECRET_ID returned no SecretString" >&2
  exit 1
fi

for key in "${KEYS[@]}"; do
  value="$(printf '%s' "$payload" | jq -re --arg k "$key" '.[$k] // empty')" || {
    echo "pay10-secrets: $key missing from $SECRET_ID" >&2
    exit 1
  }

  # Write to a temp file and move it into place, so a reader can never catch a
  # half-written secret, and so a failed fetch leaves the previous value intact.
  tmp="$(mktemp "$DEST/.$key.XXXXXX")"
  printf '%s' "$value" > "$tmp"
  chmod 600 "$tmp"
  mv -f "$tmp" "$DEST/$key"
done

echo "pay10-secrets: wrote ${#KEYS[@]} secret(s) to $DEST"
