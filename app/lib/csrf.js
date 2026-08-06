// Reads the csrf_token cookie set by proxy.js middleware, for echoing back
// as the X-CSRF-Token header on state-changing requests (double-submit pattern).
export function getCsrfToken() {
  return document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)?.[1] ?? '';
}
