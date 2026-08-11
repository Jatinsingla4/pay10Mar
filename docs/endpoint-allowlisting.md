# Endpoint Allowlisting — Prevents Arbitrary Backend Access

**File:** [`app/api/proxy/[...path]/route.js`](../app/api/proxy/%5B...path%5D/route.js)

## What problem this solves

The Next.js proxy route is a catch-all — `app/api/proxy/[...path]/route.js` matches
**any** path under `/api/proxy/`, e.g. `/api/proxy/contact/enquiry`,
`/api/proxy/anything/at/all`. Whatever path arrives, the code has access to the
one backend API key (`API_KEY`) and forwards requests to `${API_BASE}/${path}`.

Without a check, a client could call `/api/proxy/<any-backend-path-that-exists>`
and the proxy would dutifully attach the API key and forward it — turning this
one route into a generic authenticated tunnel into the *entire* backend, not
just the two form-submission endpoints it was built for.

## The exact logic

```js
const ALLOWED_PATHS = new Set([
  'contact/enquiry',
  'partners',
]);

async function handleProxy(request, params) {
  ...
  const resolvedParams = await params;
  const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';

  if (!ALLOWED_PATHS.has(endpointPath)) {
    return json({ status: false, message: 'Not found' }, 404);
  }
  ...
}
```

Step by step:

1. Next.js's catch-all route (`[...path]`) captures everything after `/api/proxy/`
   as an array of URL segments — e.g. a request to `/api/proxy/contact/enquiry`
   gives `params.path = ['contact', 'enquiry']`.
2. `.join('/')` turns that back into the single string `contact/enquiry`.
3. That string is checked against a `Set` (`ALLOWED_PATHS`) containing only
   the two literal strings `'contact/enquiry'` and `'partners'`.
4. **Anything else — a typo, a different backend route, a path with extra
   segments — fails the `.has()` check and gets a `404` before any other
   code runs**: no API key is attached, no request is sent to the backend at
   all.

This check runs **before** the CSRF check, the Origin check, and field
validation — it's the very first gate. An unrecognized path never even gets
that far.

## Why a `Set` of exact strings, not a pattern/prefix match

- `Set.has(x)` is an **exact-match** lookup — `'contact/enquiry'` matches
  only that literal string, never `'contact/enquiry/extra'` or
  `'contact'` or `'CONTACT/ENQUIRY'` (case-sensitive).
- No wildcards, no regex, no "starts with" logic. This is deliberate: a
  prefix or pattern match widens what's allowed in ways that are easy to
  get wrong (e.g. a prefix match on `'contact'` would also allow
  `'contact/../admin/delete-everything'` if the backend doesn't sanitize
  path traversal itself).

## Why this is paired with a *second* list, not decoupled from it

```js
const ALLOWED_FIELDS = {
  'contact/enquiry': { name: 150, email: 254, ... },
  partners: { name: 150, company_name: 200, ... },
};
```

Every entry in `ALLOWED_PATHS` **must** have a matching entry in
`ALLOWED_FIELDS`, enforced by `validatePayload`:

```js
const limits = ALLOWED_FIELDS[endpointPath];
if (!limits) return 'Endpoint not configured';
```

This is a **fail-closed** design, and it's fixing a real gap that existed
in an earlier version of this file: a path could previously be added to
`ALLOWED_PATHS` (allowing it through the endpoint gate) while the field
validation used a *separate* list (`CAPTCHA_PATHS`) for which paths got
captcha + field checks. Adding a new endpoint to one list and forgetting
the other silently shipped a hole — a real, reachable, non-existent-field
backend path that skipped captcha/validation entirely. Now there is only
one path allowlist and one field-limits map, and the second is required
for the first to do anything (`if (!limits) return 'Endpoint not
configured'` — a path with no field limits is treated as broken, not as
"anything goes").

## How this could break (and what would have to go wrong for that)

1. **Someone adds a path to `ALLOWED_PATHS` without adding it to
   `ALLOWED_FIELDS`.** Caught immediately — `validatePayload` returns
   `'Endpoint not configured'` for every request to that path, so the gap
   is loud (every request 400s) rather than silent. This is intentional:
   loud-and-broken is safer than quiet-and-open.
2. **Someone widens the check from exact-match to prefix/pattern match**
   "to make it easier to add new endpoints" — this is the actual way this
   control gets defeated. A prefix match on `'contact'` would let through
   any backend path starting with that string. Anyone touching this file
   should keep it a `Set` of exact strings.
3. **A backend endpoint gets added that shares a name with something
   sensitive by coincidence** — not something this file controls; the
   backend itself must not expose destructive operations under predictable
   paths reachable by any authenticated caller. This proxy only limits
   *which* backend paths the frontend can reach, not what those paths do
   once reached — the backend's own authorization is a separate, necessary
   layer.
4. **The catch-all route itself gets duplicated or shadowed** — e.g. a
   second route file added elsewhere that also matches `/api/proxy/*` with
   looser logic. Next.js's routing would need a conflicting/overlapping
   route added elsewhere in `app/api/`; nothing prevents this at the
   framework level, only code review does.

## What this control does *not* do

- It does not validate the **content** of the request (that's
  `validatePayload`, `EMAIL_REGEX`, `NAME_REGEX`, `PHONE_REGEX`,
  `HTML_TAG_REGEX` — separate, later checks).
- It does not authenticate the *caller* (that's the CSRF token + Origin
  check — separate, earlier checks).
- It does not protect the backend if the backend itself trusts the
  `API_KEY` too broadly. This control only limits which *paths on the
  proxy* are reachable — the backend still needs its own authorization
  logic scoped to what `contact/enquiry` and `partners` are actually
  supposed to be able to do.

## How to verify this control live

```bash
# Allowed path — reaches the backend (will fail later checks like CSRF, not this one)
curl -i -X POST https://dpay10.grapesmobile.com/api/proxy/contact/enquiry

# Disallowed path — rejected here, before anything else runs
curl -i -X POST https://dpay10.grapesmobile.com/api/proxy/some/other/backend/route
# → 404 {"status":false,"message":"Not found"}

curl -i -X POST https://dpay10.grapesmobile.com/api/proxy/admin/users
# → 404 {"status":false,"message":"Not found"}
```
