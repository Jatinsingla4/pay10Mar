import { NextResponse } from 'next/server';

/** Apex hostname only — must match DNS for bare domain. */
const APEX_HOST = 'pay10.in';
const WWW_HOST = 'www.pay10.in';

const SKIP_HOSTS = new Set(['localhost', '127.0.0.1']);

export function middleware(request) {
  const forwarded = request.headers.get('x-forwarded-host');
  const hostHeader = forwarded || request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  if (!hostname || SKIP_HOSTS.has(hostname) || hostname.endsWith('.local')) {
    return NextResponse.next();
  }

  if (hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = WWW_HOST;
  url.protocol = 'https';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: '/:path*',
};
