export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pay10.in';
  const blockCrawlers =
    process.env.NEXT_PUBLIC_NO_INDEX === '1' ||
    process.env.NEXT_PUBLIC_NO_INDEX === 'true';

  if (blockCrawlers) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/coming-soon'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
