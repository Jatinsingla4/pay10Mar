# Security & Patch Management

This repo ships its own security automation. Most of it works automatically
for whoever hosts the code — a little is a one-time toggle on the new host's
account.

## Patch policy

- **Critical CVE** → patch within **72 hours** of disclosure.
- **Non-critical** → patch **monthly**.

## What is automated in the code (travels with the repo)

| File | What it does |
|------|--------------|
| `.github/dependabot.yml` | Opens PRs automatically when a dependency has a security patch. |
| `.github/workflows/security-audit.yml` | CI gate — **fails the build** on any HIGH/CRITICAL CVE. Runs on every PR/push and weekly. |
| `package.json` → `overrides` | Pins transitive deps to patched versions (e.g. `postcss`). |
| `.nvmrc` | Pins the patched Node.js runtime. The deploy platform reads this. |

Because the deploy server rebuilds from this repo on every deploy
(`npm ci` + `npm run build`), merging a patch PR is enough — the patched
version reaches production on the next deploy. Nothing is installed on the
server by hand.

## One-time setup for a new host (do this after cloning/receiving the repo)

1. **Enable Dependabot alerts**
   GitHub repo → **Settings → Advanced Security → Dependabot alerts → Enable**,
   and enable **Dependabot security updates**.
   Or via CLI (needs repo admin):
   ```bash
   gh api -X PUT repos/<owner>/<repo>/vulnerability-alerts
   gh api -X PUT repos/<owner>/<repo>/automated-security-fixes
   ```
2. **Connect the deploy platform** (Render/Netlify/etc.) to this repo so pushes
   auto-deploy. After a repo transfer this connection must be re-authorized.

## Third-party vendors

Every external script/CDN added to the CSP allowlist (`config/csp-config.js`) gets a one-line review here before merging.

| Vendor | Used for | Data shared | Security posture |
|--------|----------|--------------|-------------------|
| Cloudflare Turnstile (`challenges.cloudflare.com`) | Bot/spam protection on the contact and partner forms | Visitor IP, browser signals (no PII, no cookies from our site) | Cloudflare — SOC 2 Type II, ISO 27001, GDPR compliant. Token verified server-side in `app/api/proxy/[...path]/route.js`; secret key never exposed to the client. |

## How to check status manually anytime

```bash
npm audit                     # list known CVEs in dependencies
node -v                       # confirm runtime matches .nvmrc
```
