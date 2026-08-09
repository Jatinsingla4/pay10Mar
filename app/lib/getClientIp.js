// The last hop in X-Forwarded-For is the one appended by our own reverse
// proxy (Apache/Render's load balancer) and can't be forged by the client —
// every earlier entry can, since a client can prepend arbitrary fake hops.
export function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const hops = forwardedFor.split(',').map((ip) => ip.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return request.headers.get('x-real-ip') || undefined;
}
