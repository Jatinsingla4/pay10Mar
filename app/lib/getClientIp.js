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

// Counting hops is only sound if every request genuinely passed through all of
// those proxies. With one proxy that holds unconditionally: Apache appends the
// address it accepted the connection from, so the last entry can't be forged. With
// two or more it stops holding the moment the origin is reachable directly —
// bypassing the CDN and padding the header lands the attacker on the position we
// read (depth 2 with "9.9.9.9, 8.8.8.8, <attacker>" yields 8.8.8.8), which hands
// them their own rate-limit bucket again.
//
// The primary control for that is at the network level: the origin must only accept
// traffic from the CDN's ranges. ORIGIN_VERIFY_HEADER/VALUE add the same assurance
// in the app — set the CDN to inject a secret header and anything arriving without
// it is treated as not having come through our edge at all.
const ORIGIN_VERIFY_HEADER = process.env.ORIGIN_VERIFY_HEADER;
const ORIGIN_VERIFY_VALUE = process.env.ORIGIN_VERIFY_VALUE;

if (TRUSTED_PROXY_COUNT > 1 && !(ORIGIN_VERIFY_HEADER && ORIGIN_VERIFY_VALUE)) {
  console.warn(
    `[getClientIp] TRUSTED_PROXY_COUNT=${TRUSTED_PROXY_COUNT} without ORIGIN_VERIFY_HEADER/VALUE. ` +
    'Hop counting can be defeated by requests that reach the origin directly — restrict the ' +
    "origin to the CDN's IP ranges, or set those two variables."
  );
}

export function getClientIp(request) {
  if (TRUSTED_PROXY_COUNT > 1 && ORIGIN_VERIFY_HEADER && ORIGIN_VERIFY_VALUE) {
    if (request.headers.get(ORIGIN_VERIFY_HEADER) !== ORIGIN_VERIFY_VALUE) {
      // Didn't come through our CDN, so the forwarding chain proves nothing.
      return undefined;
    }
  }

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
