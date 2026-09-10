// Shared between every contact/lead form on the site so validation rules
// (and the definition of "valid") can't silently drift between them.

// Letters from any language plus spaces, apostrophes, hyphens and periods
// (initials like "J.") — rejects digits and other punctuation.
export const validateName = (name) => {
  const trimmed = (name || "").trim();
  if (!trimmed) return "Name is required";
  if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) return "Name should only contain letters";
  return "";
};

export const validateEmail = (email) => {
  const trimmed = (email || "").trim();
  if (!trimmed) return "Email is required";
  if (/\s/.test(trimmed)) return "Email must not contain spaces";
  if (trimmed.includes("..")) return "Email must not contain consecutive dots";
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
  return "";
};

// International phone number: optional leading +, 8-15 digits total. 8 is
// the real-world floor for a mobile number including country code (a bare
// 7-digit number, the old minimum, is always a landline-style local number,
// never a mobile) — accepts any country's mobile/landline, not just UAE.
export const validateMobile = (mobile) => {
  const cleaned = (mobile || "").trim();
  if (!cleaned) return "Mobile number is required";
  if (!/^\+?\d{8,15}$/.test(cleaned)) {
    return "Please enter a valid mobile number";
  }
  return "";
};

// Matches any HTML tag opener, not a bare "<" — free text like a message
// field can legitimately contain "<" on its own, just never a tag.
export const HTML_TAG_REGEX = /<\/?[a-zA-Z!][^>]*>/;
