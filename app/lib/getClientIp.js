
const TRUSTED_PROXY_COUNT = Math.max(1, Number(process.env.TRUSTED_PROXY_COUNT) || 1);


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
    return undefined;
  }
  return request.headers.get('x-real-ip') || undefined;
}
