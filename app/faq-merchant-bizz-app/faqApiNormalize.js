/**
 * Normalize `/page/faq-merchant-bizz-app` into FAQ UI shape.
 * Primary shape: `custom_data.section2`, `section3`, … each with `heading` + `faq_list[]` of `{ Title, Description }`.
 */

/** @typedef {{ id: string, question: string, answer?: string, answerList?: string[] }} NormalizedFaqItem */
/** @typedef {{ id: string, title: string, items: NormalizedFaqItem[] }} NormalizedFaqSection */

const DEFAULT_KICKER = "FAQ | Pay10 Biz UAE";
const DEFAULT_TITLE = "FAQ Merchant App";

function slugify(value, fallback) {
  const s = String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56);
  return s || fallback;
}

function maybeStripHtml(raw) {
  if (typeof raw !== "string" || !raw || !/<[a-z][\s\S]*>/i.test(raw)) {
    return typeof raw === "string" ? raw : "";
  }
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function coerceStringArray(value) {
  if (!value && value !== 0) return [];
  if (Array.isArray(value)) {
    return value.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      return value
        .split(/\r?\n|•|(?:\s*-\s+)/)
        .map((x) => x.trim())
        .filter(Boolean);
    }
  }
  return [];
}

/**
 * CMS sometimes sends `"Description "` (trailing space). Match case-insensitively on trimmed key names.
 *
 * @param {Record<string, unknown>} item
 */
function pickTitle(item) {
  if (!item || typeof item !== "object") return "";
  if (typeof item.Title === "string") return item.Title.trim();
  if (typeof item.title === "string") return item.title.trim();
  for (const k of Object.keys(item)) {
    if (k.trim().toLowerCase() === "title" && typeof item[k] === "string") {
      return item[k].trim();
    }
  }
  return "";
}

/**
 * @param {Record<string, unknown>} item
 */
function pickDescription(item) {
  if (!item || typeof item !== "object") return "";
  if (typeof item.Description === "string") return item.Description.trim();
  if (typeof item.description === "string") return item.description.trim();
  for (const k of Object.keys(item)) {
    if (k.trim().toLowerCase() === "description" && typeof item[k] === "string") {
      return item[k].trim();
    }
  }
  return "";
}

/**
 * @param {Record<string, unknown>} customData
 * @returns {Array<{ heading: string, faq_list: unknown[], _key: string }>}
 */
function extractCustomDataNumberedSections(customData) {
  if (!customData || typeof customData !== "object") return [];

  const keys = Object.keys(customData).filter((k) => /^section\d+$/i.test(k));
  keys.sort((a, b) => {
    const na = parseInt(String(a).replace(/\D/g, ""), 10) || 0;
    const nb = parseInt(String(b).replace(/\D/g, ""), 10) || 0;
    return na - nb;
  });

  const out = [];
  for (const key of keys) {
    const block = customData[key];
    if (!block || typeof block !== "object") continue;
    const list = /** @type {unknown} */ (block.faq_list);
    if (!Array.isArray(list) || list.length === 0) continue;

    const heading =
      typeof block.heading === "string" ? block.heading.trim() : "";

    out.push({ heading, faq_list: list, _key: key });
  }
  return out;
}

/**
 * @param {Record<string, unknown>} bag
 * @param {string[]} keys
 */
function pickSectionArray(bag, keys) {
  if (!bag || typeof bag !== "object") return null;
  for (const k of keys) {
    const v = bag[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return null;
}

/** @param {unknown} raw */
function extractRawSections(apiResult) {
  if (!apiResult || typeof apiResult !== "object") return [];

  const pd = /** @type {Record<string, unknown>} */ (
    apiResult.page_data || {}
  );
  const cd = /** @type {Record<string, unknown>} */ (
    apiResult.custom_data || {}
  );

  const numbered = extractCustomDataNumberedSections(cd);
  if (numbered.length) {
    return numbered.map((b) => ({
      title: b.heading,
      heading: b.heading,
      faq_list: b.faq_list,
      id: b._key,
      slug: b._key,
    }));
  }

  const candidates = [
    pickSectionArray(pd, [
      "sections",
      "faq_sections",
      "faqs",
      "faq_categories",
      "faq_data",
      "faqData",
    ]),
    pickSectionArray(cd, [
      "sections",
      "faq_sections",
      "faqs",
      "customer_app_faq",
      "faq_data",
      "faqData",
    ]),
  ];

  for (const arr of candidates) {
    if (Array.isArray(arr) && arr.length) return arr;
  }

  const jsonField = pd.faq_json ?? cd.faq_json;
  if (jsonField) {
    try {
      const parsed =
        typeof jsonField === "string" ? JSON.parse(jsonField) : jsonField;
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") {
        const inner = /** @type {Record<string, unknown>} */ (parsed);
        const innerArr = inner.sections ?? inner.categories ?? inner.data;
        if (Array.isArray(innerArr)) return innerArr;
      }
    } catch {
      /* ignore */
    }
  }

  for (const bag of [pd, cd]) {
    if (!bag || typeof bag !== "object") continue;
    const flat = bag.faq_items ?? bag.faqItems ?? bag.faq_flat;
    if (Array.isArray(flat) && flat.length) {
      const sectionTitle =
        typeof bag.faq_section_heading === "string" && bag.faq_section_heading.trim()
          ? bag.faq_section_heading.trim()
          : "FAQ";
      return [
        {
          heading: sectionTitle,
          faq_items: flat,
        },
      ];
    }
  }

  return [];
}

/**
 * @param {Record<string, unknown>} sec
 * @param {number} sectionIndex
 * @returns {NormalizedFaqSection | null}
 */
function normalizeSection(sec, sectionIndex) {
  if (!sec || typeof sec !== "object") return null;

  const title =
    String(sec.title || sec.heading || sec.name || sec.section_title || "")
      .trim();

  const idSrc = sec.id || sec.slug || sec.section_id;
  const id = idSrc
    ? String(idSrc).trim()
    : slugify(`${title}-${sectionIndex}`, `section-${sectionIndex}`);

  const rawItems = /** @type {unknown[]} */ (
    Array.isArray(sec.items)
      ? sec.items
      : Array.isArray(sec.faq_list)
        ? sec.faq_list
        : Array.isArray(sec.faq_items)
          ? sec.faq_items
          : Array.isArray(sec.questions)
            ? sec.questions
            : Array.isArray(sec.faqs)
              ? sec.faqs
              : []
  );

  const items = rawItems.map((item, ii) =>
    normalizeItem(/** @type {Record<string, unknown>} */ (item ?? {}), id, ii)
  ).filter(
    (x) =>
      x &&
      x.question &&
      (Boolean(x.answer && String(x.answer).trim()) ||
        (Array.isArray(x.answerList) && x.answerList.length > 0))
  );

  if (!items.length) return null;
  return { id, title, items };
}

/**
 * @param {Record<string, unknown>} item
 * @param {string} sectionId
 * @param {number} itemIndex
 */
function normalizeItem(item, sectionId, itemIndex) {
  const question = pickTitle(item) || String(
    item.question ?? item.q ?? item.label ?? ""
  ).trim();

  let answer = pickDescription(item);
  if (!answer) {
    answer =
      typeof item.answer === "string"
        ? item.answer
        : typeof item.content === "string"
          ? item.content
          : "";
  }

  answer = maybeStripHtml(answer || "").trim();

  let answerList = coerceStringArray(
    item.answer_list ?? item.answerList ?? item.list ?? item.bullet_points ?? item.bullets
  ).map((s) => maybeStripHtml(s));

  const idSrc = item.id ?? item.slug ?? item.faq_id;
  const id = idSrc
    ? String(idSrc).trim()
    : slugify(`${sectionId}-${question}-${itemIndex}`, `${sectionId}-q-${itemIndex}`);

  return {
    id,
    question,
    ...(answer ? { answer } : {}),
    ...(answerList.length ? { answerList } : {}),
  };
}

/** @param {unknown} apiResult */
export function normalizeFaqPagePayload(apiResult) {
  if (!apiResult || typeof apiResult !== "object") return null;

  const rawSections = extractRawSections(apiResult);
  if (!rawSections.length) return null;

  const normalized = rawSections.map((sec, i) =>
    normalizeSection(
      typeof sec === "object" && sec ? /** @type {Record<string, unknown>} */ (sec) : {},
      i
    )
  ).filter(Boolean);

  return normalized.length ? /** @type {NormalizedFaqSection[]} */ (normalized) : null;
}

/**
 * Hero from `page_data`: kicker = sub_heading | top_heading, main title = `name` / `meta_title`.
 *
 * @param {Record<string, unknown> | undefined} pageData
 */
export function normalizeFaqHero(pageData) {
  if (!pageData || typeof pageData !== "object") {
    return { kicker: DEFAULT_KICKER, title: DEFAULT_TITLE };
  }

  const sub =
    typeof pageData.top_sub_heading === "string"
      ? pageData.top_sub_heading.trim()
      : "";
  const top =
    typeof pageData.top_heading === "string" ? pageData.top_heading.trim() : "";

  let kicker = DEFAULT_KICKER;
  if (sub && top) kicker = `${sub} | ${top}`;
  else if (sub) kicker = sub;
  else if (top) kicker = top;

  const titleRaw =
    [pageData.name, pageData.meta_title, pageData.page_title, pageData.title].find(
      (x) => typeof x === "string" && x.trim()
    ) || "";
  const title = titleRaw.trim() || DEFAULT_TITLE;

  return { kicker, title };
}
