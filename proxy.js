import { NextResponse } from 'next/server';
import { getClientIp as sharedGetClientIp } from './app/lib/getClientIp';
import { CSRF_COOKIE_NAME as CSRF_COOKIE } from './app/lib/csrf';

/** Apex hostname only — must match DNS for bare domain. */
const APEX_HOST = 'pay10.ae';
const WWW_HOST = 'www.pay10.ae';


const SKIP_HOSTS = new Set(['localhost', '127.0.0.1']);

// Only the pages that actually contain a form ever read this token, and all three
// are rendered dynamically (`Cache-Control: private, no-store`). Setting it on every
// response instead put a Set-Cookie on pages that ship
// `Cache-Control: s-maxage=300` for shared caches — behind a CDN that means either
// those pages stop being cacheable at all, or one visitor's token gets cached and
// handed to everyone. Adding a form to a page missing from this list fails loudly
// (the submit 403s straight away) rather than silently weakening anything.
const CSRF_COOKIE_PATHS = new Set([
  '/contact-us',
  '/channel-partners',
  '/pay10-biz-uae-app',
]);

function ensureCsrfCookie(request, response) {
  if (!CSRF_COOKIE_PATHS.has(request.nextUrl.pathname)) return;
  if (!request.cookies.get(CSRF_COOKIE)) {
    response.cookies.set(CSRF_COOKIE, crypto.randomUUID(), {
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }
}


const RATE_LIMITED_PREFIXES = ['/api/proxy'];
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map(); 
let requestsSinceSweep = 0;

function pruneExpiredEntries(now) {
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

function isRateLimited(ip) {
  const now = Date.now();

  requestsSinceSweep += 1;
  if (requestsSinceSweep >= 500) {
    requestsSinceSweep = 0;
    pruneExpiredEntries(now);
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// A single source of truth for the client address. This deliberately trusts no
// vendor-specific header (an x-nf-client-connection-ip branch used to be checked
// first here, from a Netlify deployment): this app is served by Apache, which
// neither sets nor strips such headers, so any client could send one and pick its
// own rate-limit bucket — bypassing the limit entirely and letting it fill the
// store with unbounded unique keys. Only getClientIp's trusted-hop logic decides.
function clientKey(request) {
  return sharedGetClientIp(request) || 'unknown';
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (RATE_LIMITED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { status: false, message: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }
  }

  const forwarded = request.headers.get('x-forwarded-host');
  const hostHeader = forwarded || request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  if (!hostname || SKIP_HOSTS.has(hostname) || hostname.endsWith('.local')) {
    const response = NextResponse.next();
    ensureCsrfCookie(request, response);
    return response;
  }

  if (hostname !== APEX_HOST) {
    const response = NextResponse.next();
    ensureCsrfCookie(request, response);
    return response;
  }

  const url = request.nextUrl.clone();
  url.hostname = WWW_HOST;
  url.protocol = 'https';
  const response = NextResponse.redirect(url, 308);
  ensureCsrfCookie(request, response);
  return response;
}

export const config = {
  matcher: '/:path*',
};
