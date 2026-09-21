// Shared between every contact/lead form on the site so validation rules
// (and the definition of "valid") can't silently drift between them.

// Letters from any language plus spaces, apostrophes, hyphens and periods
// (initials like "J.") — rejects digits and other punctuation.
export const validateName = (name) => {
  const trimmed = (name || "").trim();
  if (!trimmed) return "Le nom est requis";
  if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) return "Le nom ne doit contenir que des lettres";
  return "";
};

export const validateEmail = (email) => {
  const trimmed = (email || "").trim();
  if (!trimmed) return "L'email est requis";
  if (/\s/.test(trimmed)) return "L'email ne doit pas contenir d'espaces";
  if (trimmed.includes("..")) return "L'email ne doit pas contenir de points consécutifs";
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return "Veuillez saisir une adresse email valide";
  return "";
};

// International phone number: optional leading +, 8-15 digits total. 8 is
// the real-world floor for a mobile number including country code (a bare
// 7-digit number, the old minimum, is always a landline-style local number,
// never a mobile) — accepts any country's mobile/landline, not just UAE.
export const validateMobile = (mobile) => {
  const cleaned = (mobile || "").trim();
  if (!cleaned) return "Le numéro de mobile est requis";
  if (!/^\+?\d{8,15}$/.test(cleaned)) {
    return "Veuillez saisir un numéro de mobile valide";
  }
  return "";
};

// Matches any HTML tag opener, not a bare "<" — free text like a message
// field can legitimately contain "<" on its own, just never a tag.
export const HTML_TAG_REGEX = /<\/?[a-zA-Z!][^>]*>/;
