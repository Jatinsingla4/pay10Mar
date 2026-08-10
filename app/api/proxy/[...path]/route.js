import { NextResponse } from 'next/server';
import { getClientIp } from '../../../lib/getClientIp';

const API_BASE = process.env.NEXT_PUBLIC_API;
const API_KEY = process.env.BACKEND_AUTH_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SITE_ORIGIN = process.env.SITE_ORIGIN;

// Both of these fail *silently* when unset, which is why they're checked up front
// rather than left to whatever the runtime does with `undefined`:
//   SITE_ORIGIN          — sent as the literal string "undefined", which the
//                          backend's origin allowlist then rejects, breaking
//                          every form with a generic 403.
//   RECAPTCHA_SECRET_KEY — verifyRecaptchaToken has nothing to verify against and
//                          would wave every request through, silently removing
//                          bot protection with no error anywhere.
// In a deployed build that's a deployment fault, so refuse to serve rather than
// run half-protected. Local dev is allowed to run without them.
const REQUIRE_FULL_CONFIG = process.env.NODE_ENV === 'production';
const MISSING_CONFIG = Object.entries({ SITE_ORIGIN, RECAPTCHA_SECRET_KEY })
  .filter(([, value]) => !value)
  .map(([name]) => name);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const REQUIRED_FIELDS = {
  'contact/enquiry': ['name', 'email', 'phone'],
  partners: ['name', 'company_name', 'email', 'phone'],
};
const MAX_FIELD_LENGTH = 2000;

function validatePayload(endpointPath, payload) {
  for (const field of REQUIRED_FIELDS[endpointPath] || []) {
    if (!payload[field] || String(payload[field]).trim() === '') {
      return `${field} is required`;
    }
  }
  if (payload.email && !EMAIL_REGEX.test(payload.email)) {
    return 'Invalid email address';
  }
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string' && value.length > MAX_FIELD_LENGTH) {
      return `${key} is too long`;
    }
  }
  return null;
}

async function verifyRecaptchaToken(token, ip) {
  // Local dev without a secret skips the check; a deployed build never reaches
  // here unconfigured because handleProxy refuses the request outright.
  if (!RECAPTCHA_SECRET_KEY) return !REQUIRE_FULL_CONFIG;
  if (!token) return false;

  const body = new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token });
  if (ip) body.append('remoteip', ip);

  try {
    const result = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await result.json();
    return data.success === true;
  } catch (err) {
    // Google unreachable. Treat as unverified rather than letting the submission
    // through — an outage must not become an open door for bots.
    console.error('reCAPTCHA verification request failed:', err);
    return false;
  }
}

// Every allowlisted path is captcha-verified and payload-validated. There is
// deliberately no per-path opt-out: an endpoint added here without also being
// added to a separate captcha list used to lose *both* protections silently.
const ALLOWED_PATHS = new Set([
  'contact/enquiry',
  'partners',
]);

const ALLOWED_ORIGINS = new Set([
  'https://www.pay10.ae',
  'https://pay10.ae',
  'https://pay10-ae.onrender.com',
  'https://dpay10.grapesmobile.com',
]);

// POST only. A GET export used to exist and was forwarded to the backend with our
// API key while skipping the origin, CSRF, captcha and validation checks, all of
// which are gated on `method === 'POST'`. Nothing in the app ever used it, so the
// whole method is gone rather than guarded; Next.js answers GET with 405 itself.
export async function POST(request, { params }) {
  return handleProxy(request, params);
}

async function handleProxy(request, params) {
  try {
    if (!API_BASE || !API_KEY) {
      return NextResponse.json({ status: false, message: 'Server configuration error' }, { status: 500 });
    }

    if (REQUIRE_FULL_CONFIG && MISSING_CONFIG.length) {
      console.error('Proxy refusing requests — missing required config:', MISSING_CONFIG.join(', '));
      return NextResponse.json({ status: false, message: 'Server configuration error' }, { status: 500 });
    }

    const resolvedParams = await params;
    const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';

    if (!ALLOWED_PATHS.has(endpointPath)) {
      return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
    }

    // CSRF guard: state-changing requests must come from our own site, not a
    // third-party page auto-submitting to this form endpoint. Deliberately not
    // gated on the request method — this handler only serves POST, and a method
    // check here is what previously let GET slip past every one of these checks.
    const origin = request.headers.get('origin');
    const isAllowedOrigin = origin && (ALLOWED_ORIGINS.has(origin) || (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:')));
    if (!isAllowedOrigin) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    // Double-submit CSRF token: only a page that can read our own cookie
    // (i.e. our own origin) can produce a header value that matches it.
    const csrfCookie = request.cookies.get('csrf_token')?.value;
    const csrfHeader = request.headers.get('x-csrf-token');
    if (!csrfCookie || csrfCookie !== csrfHeader) {
      return NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = queryString ? `${API_BASE}/${endpointPath}?${queryString}` : `${API_BASE}/${endpointPath}`;

    const fetchOptions = {
      method: request.method,
      headers: {
        'X-Api-Key': API_KEY,
        'Origin': SITE_ORIGIN,
        'Referer': SITE_ORIGIN,
      },
      cache: 'no-store',
    };

    const requestIp = getClientIp(request);
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      // Read and re-create FormData so it works reliably in Next.js
      const incoming = await request.formData();

      const token = incoming.get('recaptcha_token');
      incoming.delete('recaptcha_token');
      if (!(await verifyRecaptchaToken(token, requestIp))) {
        return NextResponse.json({ status: false, message: 'Verification failed. Please try again.' }, { status: 400 });
      }
      const validationError = validatePayload(endpointPath, Object.fromEntries(incoming.entries()));
      if (validationError) {
        return NextResponse.json({ status: false, message: validationError }, { status: 400 });
      }

      const outgoing = new FormData();
      for (const [key, value] of incoming.entries()) {
        outgoing.append(key, value);
      }
      fetchOptions.body = outgoing;
    } else {
      let payload;
      try {
        payload = JSON.parse(await request.text());
      } catch {
        return NextResponse.json({ status: false, message: 'Invalid request body' }, { status: 400 });
      }

      const token = payload.recaptcha_token;
      delete payload.recaptcha_token;
      if (!(await verifyRecaptchaToken(token, requestIp))) {
        return NextResponse.json({ status: false, message: 'Verification failed. Please try again.' }, { status: 400 });
      }
      const validationError = validatePayload(endpointPath, payload);
      if (validationError) {
        return NextResponse.json({ status: false, message: validationError }, { status: 400 });
      }

      fetchOptions.body = JSON.stringify(payload);
      fetchOptions.headers['content-type'] = contentType;
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Proxy non-JSON response:', response.status, text.slice(0, 300));
      data = { status: false, message: 'An error occurred. Please try again later.' };
    }
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ status: false, message: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}
