import { NextResponse } from 'next/server';
import { getClientIp as sharedGetClientIp } from './app/lib/getClientIp';

/** Apex hostname only — must match DNS for bare domain. */
const APEX_HOST = 'pay10.ae';
const WWW_HOST = 'www.pay10.ae';


const SKIP_HOSTS = new Set(['localhost', '127.0.0.1']);


const CSRF_COOKIE = 'csrf_token';

function ensureCsrfCookie(request, response) {
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

function getClientIp(request) {
  // Netlify's edge sets this itself from the real TCP connection — a client
  // can't forge it the way it can prepend a fake hop to x-forwarded-for.
  const netlifyIp = request.headers.get('x-nf-client-connection-ip');
  if (netlifyIp) return netlifyIp.trim();

  return sharedGetClientIp(request) || 'unknown';
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (RATE_LIMITED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
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
