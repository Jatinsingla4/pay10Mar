import { NextResponse } from 'next/server';
import { getClientIp } from '../../../lib/getClientIp';
import { secret } from '../../../lib/secrets';
// Backend URL, key and the origin it authorises us by all come from one module, so
// this route and the CMS fetcher can't drift apart — they have twice before.
import { API_BASE, API_KEY, SITE_ORIGIN, API_HEADERS } from '../../../lib/backendApi';

// Captcha verification is this route's own concern, so its secret stays here.
const RECAPTCHA_SECRET_KEY = secret('RECAPTCHA_SECRET_KEY');


const REQUIRE_FULL_CONFIG = process.env.NODE_ENV === 'production';
const MISSING_CONFIG = Object.entries({ SITE_ORIGIN, RECAPTCHA_SECRET_KEY })
  .filter(([, value]) => !value)
  .map(([name]) => name);

// Every reply from this route is specific to one request — a rejection, a
// validation message, or one visitor's submission result. Next.js sends no
// Cache-Control of its own on route handlers, so a CDN told to cache
// aggressively could store a 403 or 429 and serve it to everyone. Say no-store
// explicitly instead of relying on the edge being configured correctly.
function json(body, status) {
  return NextResponse.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letters from any language plus spaces, apostrophes, hyphens and periods
// (initials like "J.") — rejects digits and other punctuation. Client-side
// checks mirror this, but the client can be bypassed, so it's enforced here too.
const NAME_REGEX = /^[\p{L}\s'.-]+$/u;
// Optional leading +, 8-15 digits: the real-world floor for a mobile number
// including country code (a bare 7-digit number is always landline-style
// local, never mobile) — accepts any country's number, not just UAE.
const PHONE_REGEX = /^\+?\d{8,15}$/;


const REQUIRED_FIELDS = {
  'contact/enquiry': ['name', 'email', 'phone'],
  partners: ['name', 'company_name', 'email', 'phone'],
};

// Which fields each endpoint may forward, and how long each one may be. Both live
// in one declaration so a field can't be allowed without also being bounded.
//
// Two things this replaces: the payload used to be forwarded to the backend
// wholesale (a 5000-field body was accepted in testing), and every field shared a
// single 2000-character ceiling — the largest field in the UI — which left the
// server twenty times more permissive than the form for things like phone.
//
// Limits mirror the inputs' maxLength where the UI sets one, with headroom on top.
// The Biz UAE App and channel-partners forms set no maxLength at all, so their
// fields are bounded here by what the value realistically is; dropdown-backed
// fields are sized against their longest option. Generous rather than exact,
// because rejecting a real submission loses a lead.
//
// contact/enquiry serves both the contact form (optional fields vary by enquiry
// type) and the Biz UAE App lead form; partners serves channel-partners.
const ALLOWED_FIELDS = {
  'contact/enquiry': {
    name: 150, email: 254, phone: 32, company: 200, message: 2000, type: 50,
    position: 150, location: 150, industry: 150, company_size: 50,
    country: 100, emirate: 150, company_website: 250, partnership_model: 100,
    address: 300, business_type: 50,
  },
  partners: {
    name: 150, company_name: 200, designation: 150, email: 254, phone: 32,
    monthly_transaction_volume: 50, integration_type: 50,
  },
};

// Longest possible legitimate submission is the sum of one endpoint's limits,
// about 4KB — this leaves generous room while still bounding the body.
const MAX_BODY_BYTES = 64 * 1024;

function validatePayload(endpointPath, payload) {
  for (const field of REQUIRED_FIELDS[endpointPath] || []) {
    if (!payload[field] || String(payload[field]).trim() === '') {
      return `${field} is required`;
    }
  }
  if (payload.email && !EMAIL_REGEX.test(payload.email)) {
    return 'Invalid email address';
  }
  if (payload.name && !NAME_REGEX.test(String(payload.name).trim())) {
    return 'Name should only contain letters';
  }
  if (payload.phone && !PHONE_REGEX.test(String(payload.phone).trim())) {
    return 'Please enter a valid mobile number';
  }
  // Fail closed: a path added to ALLOWED_PATHS without limits here gets no field
  // checks at all, which is the sort of silent gap this file has had before.
  const limits = ALLOWED_FIELDS[endpointPath];
  if (!limits) return 'Endpoint not configured';

  for (const [key, value] of Object.entries(payload)) {
    const limit = limits[key];
    if (limit === undefined) {
      return `Unexpected field: ${key}`;
    }
    if (typeof value === 'string' && value.length > limit) {
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
      return json({ status: false, message: 'Server configuration error' }, 500);
    }

    if (REQUIRE_FULL_CONFIG && MISSING_CONFIG.length) {
      console.error('Proxy refusing requests — missing required config:', MISSING_CONFIG.join(', '));
      return json({ status: false, message: 'Server configuration error' }, 500);
    }

    const resolvedParams = await params;
    const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';

    if (!ALLOWED_PATHS.has(endpointPath)) {
      return json({ status: false, message: 'Not found' }, 404);
    }

    // CSRF guard: state-changing requests must come from our own site, not a
    // third-party page auto-submitting to this form endpoint. Deliberately not
    // gated on the request method — this handler only serves POST, and a method
    // check here is what previously let GET slip past every one of these checks.
    const origin = request.headers.get('origin');
    const isAllowedOrigin = origin && (ALLOWED_ORIGINS.has(origin) || (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:')));
    if (!isAllowedOrigin) {
      return json({ status: false, message: 'Forbidden' }, 403);
    }

    // Double-submit CSRF token: only a page that can read our own cookie
    // (i.e. our own origin) can produce a header value that matches it.
    const csrfCookie = request.cookies.get('csrf_token')?.value;
    const csrfHeader = request.headers.get('x-csrf-token');
    if (!csrfCookie || csrfCookie !== csrfHeader) {
      return json({ status: false, message: 'Forbidden' }, 403);
    }

    // The caller's query string is deliberately dropped rather than appended. None
    // of the three forms sends one, so forwarding it only handed callers a channel
    // straight through to the backend that nothing here inspected — the opposite of
    // what the path and field allowlists are for.
    const targetUrl = `${API_BASE}/${endpointPath}`;

    const fetchOptions = {
      method: request.method,
      headers: { ...API_HEADERS },
      cache: 'no-store',
    };

    // These are short text forms — the largest legitimate submission is a handful
    // of fields capped at MAX_FIELD_LENGTH each, well under 30KB. Nothing bounded
    // the body before this, so a 584KB payload was read into memory and parsed in
    // full before the captcha check rejected it. Refuse oversized bodies up front.
    // (Content-Length is absent on chunked requests; the edge should cap those.)
    const declaredLength = Number(request.headers.get('content-length'));
    if (declaredLength > MAX_BODY_BYTES) {
      return json({ status: false, message: 'Request too large' }, 413);
    }

    const requestIp = getClientIp(request);
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      // Read and re-create FormData so it works reliably in Next.js
      const incoming = await request.formData();

      const token = incoming.get('recaptcha_token');
      incoming.delete('recaptcha_token');
      if (!(await verifyRecaptchaToken(token, requestIp))) {
        return json({ status: false, message: 'Verification failed. Please try again.' }, 400);
      }
      const validationError = validatePayload(endpointPath, Object.fromEntries(incoming.entries()));
      if (validationError) {
        return json({ status: false, message: validationError }, 400);
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
        return json({ status: false, message: 'Invalid request body' }, 400);
      }

      const token = payload.recaptcha_token;
      delete payload.recaptcha_token;
      if (!(await verifyRecaptchaToken(token, requestIp))) {
        return json({ status: false, message: 'Verification failed. Please try again.' }, 400);
      }
      const validationError = validatePayload(endpointPath, payload);
      if (validationError) {
        return json({ status: false, message: validationError }, 400);
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
    return json(data, response.status);
  } catch (err) {
    console.error('Proxy error:', err);
    return json({ status: false, message: 'An error occurred. Please try again later.' }, 500);
  }
}
