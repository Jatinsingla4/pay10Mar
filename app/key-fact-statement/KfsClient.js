"use client";

import { useState } from 'react';
import kfsData from './kfsData';
import styles from './kfs.module.scss';
import { sanitizeHtml } from '../lib/sanitizeHtml';

// Each tab maps 1:1 to a CMS section (by index) — content comes from the CMS.
const mergeWithCms = (pageData) => kfsData.map((tab, i) => ({
  ...tab,
  content: pageData?.sections?.[i]?.content || '',
}));

// The CMS rich-text editor strips pasted <table> markup down to plain text,
// so the Annexe comparison rows are entered as "Label — Client : x |
// Commerçant : y" paragraphs instead. Turn those into a real <table> here.
const ANNEXE_ROW_RE = /<p>\s*([^—<]+?)\s*—\s*Client\s*:\s*([^|<]+?)\s*\|\s*Commerçant\s*:\s*([^<]+?)\s*<\/p>/g;

const buildAnnexeTable = (html) => {
  const rows = [...html.matchAll(ANNEXE_ROW_RE)];
  if (!rows.length) return html;
  const tableHtml = '<table><tr><th>Élément</th><th>Client</th><th>Commerçant</th></tr>'
    + rows.map(([, label, client, merchant]) => `<tr><td>${label.trim()}</td><td>${client.trim()}</td><td>${merchant.trim()}</td></tr>`).join('')
    + '</table>';
  let inserted = false;
  return html.replace(ANNEXE_ROW_RE, () => {
    if (inserted) return '';
    inserted = true;
    return tableHtml;
  });
};

export default function KfsClient({ pageData = null }) {
  const [tabs] = useState(() => mergeWithCms(pageData));
  const [activeTabName, setActiveTabName] = useState(tabs[0]?.tabName || '');

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
  };

  const activeTab = tabs.find((tab) => tab.tabName === activeTabName) || tabs[0];

  // Wrap table in a responsive div container for horizontal scrolling on mobile
  const processedContent = activeTab?.content
    ? buildAnnexeTable(activeTab.content)
        .replace(/<table/g, `<div class="${styles.table_responsive_wrapper}"><table`)
        .replace(/<\/table>/g, '</table></div>')
    : '';

  return (
    <div className={styles.kfs_container}>
      <h1 className={styles.title}>{pageData?.page_title || "Informations Clés"}</h1>

      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar}>
          {tabs.map((tab) => {
            const isActive = tab.tabName === activeTabName;
            return (
              <button
                key={tab.tabName}
                className={`${styles.tab_pill} ${isActive ? styles.active : styles.inactive}`}
                onClick={() => handleTabChange(tab.tabName)}
              >
                {tab.tabName}
              </button>
            );
          })}
        </aside>

        {/* Right Content Panel */}
        <div className={styles.content_panel}>
          <div
            className={styles.table_content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(processedContent) }}
          />
        </div>
      </div>
    </div>
  );
}
