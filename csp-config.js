/**
 * Shared CSP source config — single source of truth, read by next.config.js.
 */

const parseEnvSources = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueSources = (sources) => [...new Set(sources)];

function getCspSources() {
  return {
    defaultSrc: ["'self'"],
    scriptSrc: uniqueSources([
      "'self'",
      // 'unsafe-inline' is required in production too: Next.js's own App
      // Router emits inline <script> tags on every page (self.__next_f.push
      // calls that stream RSC payload data for hydration) - this is core
      // framework behavior, not something in our own code, and there's no
      // way to disable it. The only way to drop unsafe-inline here is a
      // per-request nonce read via headers() in the root layout, which
      // forces the entire site from static to dynamic rendering (verified
      // by testing it - see git history). Not worth that trade-off for a
      // mostly-static marketing site.
      "'unsafe-inline'",
      ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
      ...parseEnvSources(process.env.CSP_SCRIPT_SRC_EXTRA),
    ]),
    styleSrc: uniqueSources(["'self'", "'unsafe-inline'"]),
    imgSrc: uniqueSources([
      "'self'",
      'blob:',
      'data:',
      'https://www.google.com',
      'https://pcms.pay10.in',
      'https://gww.grapesmobile.com',
      'https://pay10.grapesmobile.com',
      'https://adminpayd.grapesmobile.com',
      'https://pay10.webhr.co',
      ...parseEnvSources(process.env.CSP_IMG_SRC_EXTRA),
    ]),
    fontSrc: uniqueSources(["'self'", 'data:']),
    connectSrc: uniqueSources([
      "'self'",
      'https://www.google.com',
      'https://api.iconify.design',
      'https://api.simplesvg.com',
      'https://api.unisvg.com',
      'https://pcms.pay10.in',
      'https://adminpayd.grapesmobile.com',
      'https://pay10.webhr.co',
      ...parseEnvSources(process.env.CSP_CONNECT_SRC_EXTRA),
    ]),
    frameSrc: uniqueSources([
      "'self'",
      'https://www.google.com',
      'https://maps.google.com',
      'https://pay10.webhr.co',
      ...parseEnvSources(process.env.CSP_FRAME_SRC_EXTRA),
    ]),
  };
}

function buildCspHeader() {
  const cspSources = getCspSources();
  return [
    `default-src ${cspSources.defaultSrc.join(' ')}`,
    `script-src ${cspSources.scriptSrc.join(' ')}`,
    `style-src ${cspSources.styleSrc.join(' ')}`,
    `img-src ${cspSources.imgSrc.join(' ')}`,
    `font-src ${cspSources.fontSrc.join(' ')}`,
    `connect-src ${cspSources.connectSrc.join(' ')}`,
    `frame-src ${cspSources.frameSrc.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    'upgrade-insecure-requests',
  ]
    .join('; ')
    .trim();
}

module.exports = { getCspSources, buildCspHeader };
