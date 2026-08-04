import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_ATTRIBUTES = {
  '*': ['class', 'style', 'id', 'data-e-type', 'data-id', 'data-settings'],
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
  td: ['rowspan', 'colspan'],
  th: ['rowspan', 'colspan'],
};

/**
 * Sanitizes CMS/backend-sourced HTML before it is passed to
 * dangerouslySetInnerHTML. Pure JS (htmlparser2-based) — no jsdom, so no
 * risk of the Node ESM/CJS transitive-dependency breakage jsdom's own
 * dependency chain has hit in the past.
 */
export function sanitizeHtml(html) {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(['img']),
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}

/**
 * The CMS rich-text editor serializes an untouched/cleared field as markup
 * like "<p><br></p>" rather than an empty string, so a plain truthy check
 * (`content || fallback`) treats it as real content. Strip tags/&nbsp; and
 * check what's left.
 */
export function isEmptyHtml(html) {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, '').trim() === '';
}
