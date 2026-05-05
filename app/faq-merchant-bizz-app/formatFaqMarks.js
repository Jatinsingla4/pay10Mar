"use client";

import React from "react";

/**
 * Bold markers **text** plus optional clickable emails, urls, UAE support number.
 *
 * @param {string} text
 * @param {string} [linkClass]
 */
export function formatFaqRichText(text, linkClass = "") {
  if (!text || typeof text !== "string") return null;

  const boldParts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p !== "");

  return boldParts.map((part, i) => {
    const bm = part.match(/^\*\*([^*]+)\*\*$/);
    if (bm) return <strong key={`b-${i}`}>{bm[1]}</strong>;

    return (
      <span key={`t-${i}`}>
        {linkifyPlainSegments(part, `l-${i}`, linkClass)}
      </span>
    );
  });
}

/**
 * @param {string} text
 * @param {string} keyPrefix
 * @param {string} linkClass
 */
function linkifyPlainSegments(text, keyPrefix, linkClass) {
  const re =
    /(\bhttps?:\/\/[^\s]+)|(www\.[a-zA-Z0-9][-a-zA-Z0-9.]*[^\s]*)|(\bpay10\.ae(?:\/[^\s]*)?)|([\w.%+-]+@[\w.-]+\.[A-Za-z]{2,})|(\b800[-\s]?72910\b)/g;

  const out = [];
  let last = 0;
  let match;
  let n = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      out.push(text.slice(last, match.index));
    }

    const full = match[0];
    const token = full.replace(/[.,;:)]+$/, "");
    let href = null;

    if (match[1]) href = token;
    else if (match[2])
      href = token.startsWith("http") ? token : `https://${token}`;
    else if (match[3]) href = `https://${token}`;
    else if (match[4]) href = `mailto:${token}`;
    else if (match[5])
      href = `tel:${token.replace(/\s|-/g, "")}`;

    if (href) {
      const isTelOrMail = href.startsWith("mailto:") || href.startsWith("tel:");
      out.push(
        <a
          key={`${keyPrefix}-${n++}`}
          href={href}
          className={linkClass || undefined}
          {...(isTelOrMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {token}
        </a>
      );
    }

    last = re.lastIndex;
  }

  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : text;
}

/** @deprecated use formatFaqRichText — kept for callers that omit links */
export function formatMarkedPlainText(text) {
  return formatFaqRichText(text, "");
}
