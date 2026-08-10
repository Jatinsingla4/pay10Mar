/**
 * CSS custom properties for product/homepage-style hero banners.
 * Mobile always falls back to the desktop image when CMS has no mobile_image.
 * URLs are quoted so `https:` inside `url()` is not misparsed in inline styles.
 */
export function resolveCmsImage(src) {
  if (!src || typeof src !== 'string') return '';
  const trimmed = src.trim();
  if (!trimmed) return '';
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('/')) {
    return trimmed;
  }
  const base = (process.env.NEXT_PUBLIC_IMAGE_URL || '').replace(/\/$/, '');
  return base ? `${base}/${trimmed.replace(/^\//, '')}` : `/${trimmed}`;
}

export function getBannerSrcs(pageData, { desktopFallback, mobileFallback } = {}) {
  const desktop = resolveCmsImage(pageData?.banner_image || desktopFallback || '');
  const mobile = resolveCmsImage(pageData?.mobile_image || desktop || mobileFallback || '');
  return { desktop, mobile };
}

export function bannerBgStyle(pageData, fallbacks = {}) {
  const { desktop, mobile } = getBannerSrcs(pageData, fallbacks);
  return {
    ...(desktop ? { '--bg-desktop': `url("${desktop}")` } : {}),
    ...(mobile ? { '--bg-mobile': `url("${mobile}")` } : {}),
  };
}
