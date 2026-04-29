/**
 * Build a valid src for next/image from CMS paths.
 * Avoids empty strings and bare relative paths (e.g. "uploads/x.png") that break the image loader.
 */
export function cmsImageSrc(path, base = process.env.NEXT_PUBLIC_IMAGE_URL || '') {
  if (path == null || String(path).trim() === '') return null;
  const p = String(path).trim();
  if (/^https?:\/\//i.test(p)) return p;
  const b = String(base || '').replace(/\/$/, '');
  const rel = p.replace(/^\//, '');
  if (!b) return `/${rel}`;
  return `${b}/${rel}`;
}
