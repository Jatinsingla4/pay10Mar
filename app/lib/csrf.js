// Single source of truth for the cookie name — proxy.js (sets it) and
// route.js (checks it) both import this instead of repeating the literal,
// so a rename can't silently desync the two sides of the double-submit check.
export const CSRF_COOKIE_NAME = 'csrf_token';

// Reads the csrf_token cookie set by proxy.js middleware, for echoing back
// as the X-CSRF-Token header on state-changing requests (double-submit pattern).
export function getCsrfToken() {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]+)`));
  return match?.[1] ?? '';
}
