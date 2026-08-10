// X-Forwarded-For is a client-controllable list: a client can prepend as many
// fake hops as it likes, and each proxy in front of us appends the address it
// actually received the connection from. Only the right-most entries — the ones
// our own infrastructure appended — are trustworthy, so we count in from the
// right past however many proxies sit in front of the app.
//
// TRUSTED_PROXY_COUNT must equal that number of proxies:
//   1 = Apache reverse-proxying to `next start` (current setup)
//   2 = a CDN / load balancer added in front of Apache
// Set too LOW behind a CDN we'd read the CDN edge's IP instead of the visitor's,
// collapsing every visitor into one rate-limit bucket (a self-inflicted DoS).
// Set too HIGH we'd read a client-supplied value, so a chain shorter than the
// configured depth is treated as untrusted rather than falling back to it.
const TRUSTED_PROXY_COUNT = Math.max(1, Number(process.env.TRUSTED_PROXY_COUNT) || 1);

export function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const hops = forwardedFor.split(',').map((ip) => ip.trim()).filter(Boolean);
    if (hops.length >= TRUSTED_PROXY_COUNT) {
      return hops[hops.length - TRUSTED_PROXY_COUNT];
    }
    // Chain is shorter than the depth we're configured to trust, so it didn't
    // arrive via the expected proxy path — nothing in it is safe to use.
    return undefined;
  }
  return request.headers.get('x-real-ip') || undefined;
}
