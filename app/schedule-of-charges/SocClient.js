"use client";

import React from "react";
import Style from "../privacy-policy/privacy-policy.module.scss";

// Fallback rows, used only when the CMS has no cards yet for this section.
const DEFAULT_ROWS = [
  { num: "1", name: "Add Money/ Top-up", desc: "Via AlTareq (open banking)", items: [["Top-up Fees", "AED 0"]] },
  { num: "2", name: "Withdrawal", desc: "Withdraw money from the Pay10 app to any UAE Bank Account", items: [["Upto 5 in a calendar month", "AED 0"], ["6th & above in a calendar month", "AED 5.00"]] },
  { num: "3", name: "Customer- Send/Request Money (P2P)", desc: "Request or Send funds from/to another Pay10 user", items: [["Transfer Fees", "AED 0"]] },
  { num: "4", name: "Send Abroad", desc: "International Money Transfer", items: [["Transfer Fees", "Varies by destination country, amount & mode selected. Real-time exchange rate & fees is displayed in app, before initiating the transfer"]] },
  {
    num: "5", name: "Bill Payment", desc: "Bill Payments for Utility, Transport, Telecom services", items: [
      ["Du Pre-Paid", "AED 0"], ["Du Post-Paid", "AED 0"], ["e& Post-Paid", "AED 0"], ["e& Pre-Paid", "AED 0"],
      ["NOL Top-Up", "AED 0"], ["Mawaqif", "AED 0"], ["Salik Voucher", "AED 0"], ["ADDC", "AED 0"], ["AADC", "AED 0"],
      ["FEWA", "AED 3 charged by biller"], ["e& Internet Broadband", "AED 0"], ["Lootah Gas", "AED 7 charged by biller"],
      ["Ajman Sewerage", "AED 2 charged by biller"],
    ]
  },
  {
    num: "6", name: "Card", desc: "Subscription for a Physical Pay10 Jaywan card", items: [
      ["Card Issuing", "AED 35.00"], ["Card Replacement", "AED 35.00"], ["ATM Withdrawal", "AED 3.00"],
      ["ATM Declined", "AED 3.00"], ["ATM PIN setting", "AED 3.00"], ["App PIN setting", "AED 0"],
    ]
  },
];

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
  const cards = pageData?.sections?.[0]?.cards;
  const rows = cards?.length
    ? cards.map((c, i) => ({
        num: String(i + 1),
        name: c.title,
        desc: c.subtitle || "",
        items: parseItems(c.content || c.description),
      }))
    : DEFAULT_ROWS;

  return (
    <main className={Style.mainPriv}>
      <section className={Style.content_section}>
        <h1 className={Style.title} data-animation="fade-up">SCHEDULE OF CHARGES</h1>

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
