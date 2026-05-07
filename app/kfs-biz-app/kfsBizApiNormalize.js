/**
 * Normalize `/page/kfs-biz-app` for the Key Facts Statement page (API-only rendering).
 *
 * Modes:
 * - `html`: `page_data.content` contains HTML → render under hero.
 * - `structured`: table rows, intro, notes, warning from `page_data` / `custom_data` (flexible keys).
 */

/**
 * @param {Record<string, unknown> | undefined} pageData
 */
export function normalizeKfsHero(pageData) {
  const DEFAULT_KICKER = "Key Facts Statement | Merchant App";
  const DEFAULT_TITLE = "KFS Merchant App";

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

/**
 * @param {Record<string, unknown>} item
 */
function pickLabelField(item) {
  const keys = [
    "Label",
    "label",
    "Title",
    "title",
    "name",
    "Name",
    "key",
    "Key",
    "field",
    "Field",
    "heading",
    "Heading",
    "Question",
    "question",
  ];
  for (const k of keys) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/**
 * @param {Record<string, unknown>} item
 */
function pickValueField(item) {
  const keys = [
    "Description",
    "description",
    "Value",
    "value",
    "answer",
    "Answer",
    "content",
    "Content",
    "text",
    "Text",
    "detail",
    "Detail",
  ];
  for (const k of keys) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const k of Object.keys(item)) {
    if (k.trim().toLowerCase() === "description" && typeof item[k] === "string") {
      return item[k].trim();
    }
  }
  return "";
}

/**
 * @param {unknown} value
 */
function coerceTextArray(value) {
  if (!value && value !== 0) return [];
  if (Array.isArray(value)) {
    return value
      .map((x) => {
        if (typeof x === "string") return x.trim();
        if (x && typeof x === "object") {
          const o = /** @type {Record<string, unknown>} */ (x);
          if (typeof o.Description === "string") return o.Description.trim();
          if (typeof o.Title === "string") return o.Title.trim();
          if (typeof o.text === "string") return o.text.trim();
          if (typeof o.note === "string") return o.note.trim();
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    try {
      const p = JSON.parse(value);
      if (Array.isArray(p)) return coerceTextArray(p);
    } catch {
      /* fall through */
    }
    return value
      .split(/\r?\n/)
      .map((s) => s.replace(/^[\s-*•]+/, "").trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * @param {unknown[]} rows
 */
function normalizeTableRowsFromArray(rows) {
  if (!Array.isArray(rows) || !rows.length) return [];
  /** @type {{ label: string, value: string }[]} */
  const out = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const o = /** @type {Record<string, unknown>} */ (row);

    let label =
      typeof o.row_label === "string"
        ? o.row_label.trim()
        : typeof o.row_heading === "string"
          ? o.row_heading.trim()
          : "";

    let value =
      typeof o.row_value === "string"
        ? o.row_value.trim()
        : typeof o.cell_value === "string"
          ? o.cell_value.trim()
          : "";

    if (!label || !value) {
      label = pickLabelField(o);
      value = pickValueField(o);
    }

    if (label && value) out.push({ label, value });
  }
  return out;
}

/**
 * `section2`…`sectionN` blocks: first block whose `faq_list` / `rows` / … normalizes to ≥1 row wins.
 *
 * @param {Record<string, unknown>} customData
 */
function extractTableFromNumberedSections(customData) {
  if (!customData || typeof customData !== "object") return [];

  const keys = Object.keys(customData).filter((k) => /^section\d+$/i.test(k));
  keys.sort((a, b) => {
    const na = parseInt(String(a).replace(/\D/g, ""), 10) || 0;
    const nb = parseInt(String(b).replace(/\D/g, ""), 10) || 0;
    return na - nb;
  });

  for (const key of keys) {
    const block = customData[key];
    if (!block || typeof block !== "object") continue;
    const bag = /** @type {Record<string, unknown>} */ (block);

    const list =
      bag.faq_list ??
      bag.rows ??
      bag.facts ??
      bag.table_rows ??
      bag.facts_table ??
      bag.key_facts ??
      bag.pair_list ??
      null;

    if (!Array.isArray(list) || !list.length) continue;

    const rows = normalizeTableRowsFromArray(list);
    if (rows.length) return rows;
  }
  return [];
}

/**
 * Pull string array from numbered section whose heading matches a keyword.
 *
 * @param {Record<string, unknown>} customData
 * @param {string} keyword - e.g. "important", "warning"
 */
function extractListFromSectionHeading(customData, keyword) {
  if (!customData || typeof customData !== "object") return [];

  const keys = Object.keys(customData).filter((k) => /^section\d+$/i.test(k));
  for (const key of keys) {
    const block = customData[key];
    if (!block || typeof block !== "object") continue;
    const bag = /** @type {Record<string, unknown>} */ (block);
    const h = String(bag.heading || "").toLowerCase();
    if (!h.includes(keyword.toLowerCase())) continue;

    const raw =
      bag.note_list ??
      bag.notes ??
      bag.important_notes ??
      bag.faq_list ??
      bag.warning_list ??
      bag.items ??
      bag.lines ??
      null;

    const asTable = Array.isArray(raw) ? normalizeTableRowsFromArray(raw) : [];
    if (asTable.length) {
      /** If rows look like key–value, flatten values as lines */
      return asTable.map((r) => `${r.label}: ${r.value}`);
    }

    return coerceTextArray(raw);
  }
  return [];
}

/**
 * @param {Record<string, unknown>} bag
 * @param {string[]} arrayKeys
 */
function firstTableFromKeys(bag, arrayKeys) {
  if (!bag || typeof bag !== "object") return [];
  for (const k of arrayKeys) {
    const v = bag[k];
    if (Array.isArray(v) && v.length) {
      const rows = normalizeTableRowsFromArray(v);
      if (rows.length) return rows;
    }
  }
  return [];
}

/**
 * @param {unknown} apiResult
 */
export function normalizeKfsBizPayload(apiResult) {
  if (!apiResult || typeof apiResult !== "object") return null;

  const envelope = /** @type {{ status?: boolean }} */ (apiResult);
  if (!envelope.status) return null;

  const pd = /** @type {Record<string, unknown>} */ (
    /** @type {{ page_data?: unknown }} */ (apiResult).page_data || {}
  );
  const cd = /** @type {Record<string, unknown>} */ (
    /** @type {{ custom_data?: unknown }} */ (apiResult).custom_data || {}
  );

  const hero = normalizeKfsHero(pd);
  const rawContent = typeof pd.content === "string" ? pd.content.trim() : "";

  if (rawContent && /<[a-z][\s\S]*>/i.test(rawContent)) {
    return { type: "html", hero, html: rawContent };
  }

  const TABLE_KEYS = [
    "facts_table",
    "key_facts",
    "table_rows",
    "tableRows",
    "rows",
    "facts",
    "kfs_table",
    "faqList",
    "listing_table",
  ];

  /** @type {{ label: string, value: string }[]} */
  let tableRows = [];

  tableRows = tableRows.concat(
    normalizeTableRowsFromArray(
      Array.isArray(pd.table_rows)
        ? pd.table_rows
        : Array.isArray(pd.rows)
          ? pd.rows
          : []
    )
  );

  tableRows = tableRows.concat(firstTableFromKeys(pd, TABLE_KEYS));
  tableRows = tableRows.concat(firstTableFromKeys(cd, TABLE_KEYS));

  tableRows = tableRows.concat(extractTableFromNumberedSections(cd));

  const seen = new Set();
  /** @type {{ label: string, value: string }[]} */
  const unique = [];
  for (const row of tableRows) {
    const k = `${row.label}|||${row.value}`;
    if (seen.has(k)) continue;
    seen.add(k);
    unique.push(row);
  }
  tableRows = unique;

  /** Intro */
  let intro =
    (typeof cd.intro === "string" && cd.intro.trim()) ||
    (typeof cd.intro_text === "string" && cd.intro_text.trim()) ||
    (typeof pd.top_description === "string" && pd.top_description.trim()) ||
    (typeof pd.intro === "string" && pd.intro.trim()) ||
    "";

  const s2 =
    cd.section2 && typeof cd.section2 === "object"
      ? /** @type {Record<string, unknown>} */ (cd.section2)
      : null;

  if (s2) {
    intro =
      intro ||
      (typeof s2.intro === "string" ? s2.intro.trim() : "") ||
      (typeof s2.intro_text === "string" ? String(s2.intro_text).trim() : "") ||
      (typeof s2.description === "string" && !/<[a-z]/i.test(String(s2.description))
        ? String(s2.description).trim()
        : "");
  }

  if (!intro && rawContent) intro = rawContent;

  /** Notes */
  let importantNotes = coerceTextArray(cd.important_notes);
  if (!importantNotes.length) importantNotes = coerceTextArray(cd.note_list);
  if (!importantNotes.length) importantNotes = coerceTextArray(cd.notes);
  if (!importantNotes.length && cd.section3 && typeof cd.section3 === "object") {
    const s3 = /** @type {Record<string, unknown>} */ (cd.section3);
    importantNotes = coerceTextArray(
      s3.note_list ?? s3.notes ?? s3.important_notes ?? s3.faq_list
    );
  }
  if (!importantNotes.length) {
    importantNotes = extractListFromSectionHeading(cd, "important");
  }

  /** Warning */
  let warningIntro =
    typeof cd.warning_intro === "string" ? cd.warning_intro.trim() : "";
  let warningItems = coerceTextArray(cd.warning_list);

  const wBlock =
    cd.warning_section && typeof cd.warning_section === "object"
      ? cd.warning_section
      : cd.section_warning && typeof cd.section_warning === "object"
        ? cd.section_warning
        : null;

  if (wBlock && typeof wBlock === "object") {
    const wb = /** @type {Record<string, unknown>} */ (wBlock);
    warningIntro =
      warningIntro ||
      (typeof wb.intro === "string" ? wb.intro.trim() : "") ||
      (typeof wb.warning_intro === "string" ? wb.warning_intro.trim() : "");
    warningItems = coerceTextArray(
      wb.warning_list ?? wb.items ?? wb.faq_list ?? wb.lines
    );
  }

  if (!warningItems.length) {
    warningItems = extractListFromSectionHeading(cd, "warning");
  }
  if (!warningItems.length) {
    warningItems = coerceTextArray(cd.warning_items);
  }

  if (!warningIntro && warningItems.length) {
    warningIntro = "By using the Pay10 Digital Wallet, you acknowledge that:";
  }

  const termsClosing =
    (typeof cd.terms_closing === "string" && cd.terms_closing.trim()) ||
    (typeof cd.footer_terms === "string" && cd.footer_terms.trim()) ||
    (typeof pd.footer_terms === "string" && pd.footer_terms.trim()) ||
    "";

  const hasAny =
    Boolean(intro.trim()) ||
    tableRows.length > 0 ||
    importantNotes.length > 0 ||
    warningItems.length > 0 ||
    Boolean(warningIntro) ||
    Boolean(termsClosing);

  if (!hasAny) return null;

  return {
    type: "structured",
    hero,
    intro: intro.trim(),
    tableRows,
    importantNotes,
    warningIntro,
    warningItems,
    termsClosing,
  };
}

/**
 * @param {{ type?: string, intro?: string, tableRows?: unknown[], importantNotes?: unknown[], warningItems?: unknown[], warningIntro?: string } | null} payload
 */
export function buildKfsToc(payload) {
  if (!payload || typeof payload !== "object") return [];

  /** @typedef {{ id: string, label: string }} TocItem */
  /** @type {TocItem[]} */
  const toc = [];

  const hasOverview =
    (typeof payload.intro === "string" && payload.intro.trim()) ||
    (Array.isArray(payload.tableRows) && payload.tableRows.length > 0);

  const hasNotes =
    Array.isArray(payload.importantNotes) && payload.importantNotes.length > 0;

  const hasWarning =
    (Array.isArray(payload.warningItems) && payload.warningItems.length > 0) ||
    (typeof payload.warningIntro === "string" && Boolean(payload.warningIntro.trim())) ||
    (typeof payload.termsClosing === "string" && Boolean(payload.termsClosing.trim()));

  if (hasOverview) toc.push({ id: "kfs-overview", label: "Overview & key facts" });
  if (hasNotes) toc.push({ id: "kfs-important-notes", label: "Important Notes" });
  if (hasWarning) toc.push({ id: "kfs-warning", label: "Warning" });

  return toc;
}
