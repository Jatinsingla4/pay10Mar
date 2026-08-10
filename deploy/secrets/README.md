# Secrets on the production host

The app never talks to a secrets manager itself. It reads each secret from a file
when `<NAME>_FILE` points at one, and from the environment otherwise
(`app/lib/secrets.js`). Everything here is what fills those files on a host where
AWS Secrets Manager is available, so the application needs no AWS SDK and no code
change between environments.

Secrets are written under `/run`, which is tmpfs — they exist in RAM only and are
gone after a reboot, rather than sitting on disk.

## Why this indirection rather than the AWS SDK

The current staging host is a **Lightsail** instance, and Lightsail does not allow a
custom IAM role or policy to be attached — its instance role is AWS-managed and
`secretsmanager:GetSecretValue` is denied on it:

```
$ aws secretsmanager get-secret-value --secret-id test
AccessDeniedException: User: arn:aws:sts::…:assumed-role/AmazonLightsailInstanceRole/i-…
is not authorized to perform: secretsmanager:GetSecretValue
```

The only way to reach Secrets Manager from such a host is an IAM user with static
access keys, which would then have to be stored in the same file the secrets were
moved out of — trading a form API key for credentials to the whole account. So the
manager is used only where an instance role can be attached, and the file contract
keeps the app identical either way.

## Setup

**1. Store both values as one JSON secret** (one secret is cheaper than two and
rotates atomically):

```bash
aws secretsmanager create-secret \
  --name pay10/frontend \
  --region ap-south-1 \
  --secret-string '{"BACKEND_AUTH_KEY":"…","RECAPTCHA_SECRET_KEY":"…"}'
```

**2. Attach the read policy** in `iam-policy.json` to the instance role. It grants
`GetSecretValue` on this one secret and nothing else — update the account id and
region if they differ. The trailing `-*` matches the six random characters AWS
appends to a secret's ARN.

**3. Install the fetch script and unit:**

```bash
install -m 755 pay10-secrets.sh /usr/local/bin/pay10-secrets.sh
install -m 644 pay10-secrets.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now pay10-secrets.service
```

Check it worked — the values must not be printed, only their presence confirmed:

```bash
ls -l /run/pay10-secrets/      # both files, mode 600, non-zero size
```

**4. Point the app at the files** in its env file, replacing the values:

```diff
-BACKEND_AUTH_KEY=53bce9…
-RECAPTCHA_SECRET_KEY=6Lck…
+BACKEND_AUTH_KEY_FILE=/run/pay10-secrets/BACKEND_AUTH_KEY
+RECAPTCHA_SECRET_KEY_FILE=/run/pay10-secrets/RECAPTCHA_SECRET_KEY
```

Then restart the app. Confirm the secrets are no longer in its environment:

```bash
tr '\0' '\n' < /proc/$(pm2 pid dpay1-staging)/environ | grep -c BACKEND_AUTH_KEY=
# 0 — only the _FILE path is there
```

**5. Ordering.** The app reads its secrets once at startup, so
`pay10-secrets.service` must run first. The unit declares
`Before=pm2-root.service`; if the app is started by a different unit, change that
line and add `After=pay10-secrets.service` to the app's unit.

## Rotation

A rotated secret only takes effect after the app restarts. `pay10-secrets-refresh`
re-fetches and restarts daily:

```bash
install -m 644 pay10-secrets-refresh.service pay10-secrets-refresh.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now pay10-secrets-refresh.timer
```

Adjust the `pm2 restart` target in the refresh unit to the production process name.

## Failure behaviour

A failed fetch is deliberately loud rather than silent:

- The script runs under `set -euo pipefail` and exits non-zero, so the unit fails
  and — via the ordering above — the app does not start on missing secrets.
- Each file is written to a temp path and moved into place, so a reader never sees
  a partial value and a failed refresh leaves the previous secret intact.
- If a `*_FILE` path is configured but unreadable, `app/lib/secrets.js` throws
  instead of falling back to the environment. Falling back would mean running with
  an absent reCAPTCHA secret, which is the same as running with bot protection off.
- If a secret does end up missing, the proxy route refuses requests in production
  and logs which variable is absent, rather than serving half-protected.
