/** @type {import('next').NextConfig} */
const path = require('path');

const parseEnvSources = (value = '') =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const uniqueSources = (sources) => [...new Set(sources)];

const cspSources = {
  defaultSrc: ["'self'"],
  scriptSrc: uniqueSources([
    "'self'",
    "'unsafe-inline'",
    ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
    // Staging: analytics disabled — re-enable for production if using GA/GTM
    // 'https://www.googletagmanager.com',
    // 'https://www.google-analytics.com',
    ...parseEnvSources(process.env.CSP_SCRIPT_SRC_EXTRA),
  ]),
  styleSrc: uniqueSources(["'self'", "'unsafe-inline'"]),
  imgSrc: uniqueSources([
    "'self'",
    'blob:',
    'data:',
    // 'https://www.googletagmanager.com',
    // 'https://www.google-analytics.com',
    'https://www.google.com',
    // 'https://stats.g.doubleclick.net',
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
    // 'https://www.googletagmanager.com',
    // 'https://www.google-analytics.com',
    // 'https://region1.google-analytics.com',
    'https://www.google.com',
    // 'https://stats.g.doubleclick.net',
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

const cspHeader = [
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

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gww.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pay10.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pcms.pay10.in',
      },
      {
        protocol: 'https',
        hostname: 'adminpayd.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pay10.webhr.co',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    // prependData: `@import "globals/_mixin";`,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  async redirects() {
    return [
      {
        source: '/solution-payment-gateway.php',
        destination: '/products/payment-gateway',
        permanent: true,
      },
      {
        source: '/about-overview.php',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/terms-and-conditions.php',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/customer-grievance-policy.php',
        destination: '/customer-grievances-policy',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

};

module.exports = nextConfig;
