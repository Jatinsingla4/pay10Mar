"use client";

import React from "react";
import Style from "../privacy-policy/privacy-policy.module.scss";

// CMS cards store each charge type's line items as plain text, one
// "label: amount" pair per line — the CMS rich-text editor flattens real
// <table> markup on save, so a table can't be authored there directly.
const parseItems = (text) => {
  if (!text) return [];
  return text
    .replace(/<[^>]*>/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      return idx === -1 ? [line, ""] : [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    });
};

const SocClient = ({ pageData = null }) => {
  const cards = pageData?.sections?.[0]?.cards || [];
  const rows = cards.map((c, i) => ({
    num: String(i + 1),
    name: c.title,
    desc: c.subtitle || "",
    items: parseItems(c.content || c.description),
  }));

  return (
    <main className={Style.mainPriv}>
      <section className={Style.content_section}>
        <h1 className={Style.title} data-animation="fade-up">{pageData?.page_title || "Schedule of Charges"}</h1>

        <div className={Style.layout}>
          <aside className={Style.sidebar} data-animation="fade-up">
            <button className={Style.tab_pill}>Schedule of Charges</button>
          </aside>

          <div className={Style.content_panel}>
            <div className={Style.contentHtml}>
              <h2>Applicable Charges</h2>
              <div className={Style.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product/Feature Name</th>
                      <th>Description</th>
                      <th>Charge Type</th>
                      <th>Amount (AED)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) =>
                      (row.items.length ? row.items : [["", ""]]).map((item, i) => (
                        <tr key={`${row.num}-${i}`}>
                          {i === 0 && (
                            <>
                              <td rowSpan={row.items.length || 1}>{row.num}</td>
                              <td rowSpan={row.items.length || 1}>{row.name}</td>
                              <td rowSpan={row.items.length || 1}>{row.desc}</td>
                            </>
                          )}
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SocClient;
