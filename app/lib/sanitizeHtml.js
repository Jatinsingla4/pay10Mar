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

const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/**
 * Strips HTML tags AND decodes entities (&amp; -> &, etc), for CMS content
 * headed to a plain-text prop rather than dangerouslySetInnerHTML. A bare
 * tag-strip regex leaves entities encoded — they're only resolved when HTML
 * is actually parsed — so "Électricité &amp; Eau" renders literally with the
 * "&amp;" still showing. Isomorphic: no DOM dependency, safe during SSR.
 */
export function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
      if (entity[0] === '#') {
        const code = entity[1] === 'x' || entity[1] === 'X'
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
        return Number.isNaN(code) ? match : String.fromCodePoint(code);
      }
      return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    })
    .trim();
}
