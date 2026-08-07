import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API;
const API_KEY = process.env.BACKEND_AUTH_KEY;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

// Paths that require a verified Turnstile token — public lead-gen forms with
// no other bot defense besides the per-IP rate limit in proxy.js.
const CAPTCHA_PATHS = new Set(['contact/enquiry', 'partners']);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server-side mirror of each form's required fields — the client-side
// validation in ContactClient.js/PartnerForm.js can be bypassed entirely by
// calling this endpoint directly, so it must not be the only check.
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

async function verifyTurnstileToken(token, ip) {
  if (!TURNSTILE_SECRET_KEY) return true; // not configured (e.g. local dev) — skip
  if (!token) return false;

  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.append('remoteip', ip);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await result.json();
  return data.success === true;
}

// Every backend path this proxy is allowed to forward to. Add new entries
// here deliberately when a new frontend feature needs a new endpoint —
// this route must never blindly forward an arbitrary path.
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

export async function GET(request, { params }) {
  return handleProxy(request, params);
}

export async function POST(request, { params }) {
  return handleProxy(request, params);
}

async function handleProxy(request, params) {
  try {
    if (!API_BASE || !API_KEY) {
      return NextResponse.json({ status: false, message: 'Server configuration error' }, { status: 500 });
    }

    const resolvedParams = await params;
    const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';

    if (!ALLOWED_PATHS.has(endpointPath)) {
      return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
    }

    // CSRF guard: state-changing requests must come from our own site, not a
    // third-party page auto-submitting to this form endpoint.
    if (request.method === 'POST') {
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
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = queryString ? `${API_BASE}/${endpointPath}?${queryString}` : `${API_BASE}/${endpointPath}`;

    const fetchOptions = {
      method: request.method,
      headers: {
        'X-Api-Key': API_KEY,
        'Origin': API_BASE.replace('/api', ''),
        'Referer': API_BASE.replace('/api', ''),
      },
      cache: 'no-store',
    };

    if (request.method === 'POST') {
      const requestIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        || request.headers.get('x-real-ip')
        || undefined;
      const contentType = request.headers.get('content-type') || '';

      if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        // Read and re-create FormData so it works reliably in Next.js
        const incoming = await request.formData();

        if (CAPTCHA_PATHS.has(endpointPath)) {
          const token = incoming.get('turnstile_token');
          incoming.delete('turnstile_token');
          if (!(await verifyTurnstileToken(token, requestIp))) {
            return NextResponse.json({ status: false, message: 'Verification failed. Please try again.' }, { status: 400 });
          }
          const validationError = validatePayload(endpointPath, Object.fromEntries(incoming.entries()));
          if (validationError) {
            return NextResponse.json({ status: false, message: validationError }, { status: 400 });
          }
        }

        const outgoing = new FormData();
        for (const [key, value] of incoming.entries()) {
          outgoing.append(key, value);
        }
        fetchOptions.body = outgoing;
      } else {
        // JSON or other body
        const text = await request.text();

        if (CAPTCHA_PATHS.has(endpointPath)) {
          let payload;
          try {
            payload = JSON.parse(text);
          } catch {
            return NextResponse.json({ status: false, message: 'Invalid request body' }, { status: 400 });
          }
          const token = payload.turnstile_token;
          delete payload.turnstile_token;
          if (!(await verifyTurnstileToken(token, requestIp))) {
            return NextResponse.json({ status: false, message: 'Verification failed. Please try again.' }, { status: 400 });
          }
          const validationError = validatePayload(endpointPath, payload);
          if (validationError) {
            return NextResponse.json({ status: false, message: validationError }, { status: 400 });
          }
          fetchOptions.body = JSON.stringify(payload);
        } else {
          fetchOptions.body = text;
        }
        fetchOptions.headers['content-type'] = contentType;
      }
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
