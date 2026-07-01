import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes CMS/backend-sourced HTML before it is passed to
 * dangerouslySetInnerHTML. Works in both server and client components.
 */
export function sanitizeHtml(html) {
  if (!html) return '';
  return DOMPurify.sanitize(html);
}
