import { secret } from './secrets';

// The single place that knows how to reach and authenticate to the backend API.
//
// Two paths call it — the form proxy at app/api/proxy/[...path]/route.js and the
// server-side page fetcher in fetchPageData.js — and keeping their configuration
// separate has broken the site twice: once when the API domain changed and
// fetchPageData was still sending a hardcoded Origin, and once when the key moved
// to a vault-supplied file and fetchPageData was still reading process.env, which
// made every CMS request send `X-Api-Key: undefined` and get a 401 back.
//
// Anything about backend auth belongs here, so there is only ever one place to
// change. Node runtime only, via secrets.js — keep this out of middleware.
export const API_BASE = process.env.NEXT_PUBLIC_API;
export const API_KEY = secret('BACKEND_AUTH_KEY');

// The backend authorises callers by the *frontend's* own origin (its
// ALLOWED_API_ORIGIN), not by its own domain — so this is our public URL and must
// not be derived from API_BASE. Referer is sent too because the backend falls back
// to it when Origin is absent.
export const SITE_ORIGIN = process.env.SITE_ORIGIN;

export const API_HEADERS = {
  'X-Api-Key': API_KEY,
  'Origin': SITE_ORIGIN,
  'Referer': SITE_ORIGIN,
};
