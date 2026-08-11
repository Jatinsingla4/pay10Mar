// Shared between the 3 client forms and the proxy route handler. No "use
// client" directive here (unlike Recaptcha.js) so this stays safely
// importable from server-only code like route.js too — a plain constants
// file, not a component.

// The JSON/FormData field the reCAPTCHA token travels under. Forms attach it
// under this name; route.js strips it under the same name before forwarding
// the rest of the payload to the backend.
export const RECAPTCHA_TOKEN_FIELD = 'recaptcha_token';

// The two endpoints the proxy will forward. Path segments (used server-side
// as object keys / allowlist entries) and the full fetch URLs (used
// client-side) are derived from the same values so renaming one can't
// silently leave the other three files pointing at a 404.
export const CONTACT_ENQUIRY_PATH = 'contact/enquiry';
export const PARTNERS_PATH = 'partners';

export const CONTACT_ENQUIRY_URL = `/api/proxy/${CONTACT_ENQUIRY_PATH}`;
export const PARTNERS_URL = `/api/proxy/${PARTNERS_PATH}`;
