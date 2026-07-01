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
      // No 'unsafe-inline' — there is currently no active inline <script>
      // anywhere in the app (grep confirmed the only candidates, GA/GTM,
      // are commented out). If that changes, load it via next/script with
      // an external src on an allowlisted host below, or via
      // @next/third-parties/google, rather than reintroducing unsafe-inline.
      ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'", "'unsafe-inline'"] : []),
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
