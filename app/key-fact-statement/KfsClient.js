"use client";

import { useState } from 'react';
import kfsData from './kfsData';
import styles from './kfs.module.scss';
import { sanitizeHtml, isEmptyHtml } from '../lib/sanitizeHtml';

// Each tab maps 1:1 to a CMS section (by index) — a section's `content`
// overrides the hardcoded legal text below when present, so the CMS can
// take over a tab without needing a code change.
const mergeWithCms = (pageData) => kfsData.map((tab, i) => {
  const cmsContent = pageData?.sections?.[i]?.content;
  return isEmptyHtml(cmsContent) ? tab : { ...tab, content: cmsContent };
});

export default function KfsClient({ pageData = null }) {
  const [tabs] = useState(() => mergeWithCms(pageData));
  const [activeTabName, setActiveTabName] = useState(tabs[0]?.tabName || '');

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
  };

  const activeTab = tabs.find((tab) => tab.tabName === activeTabName) || tabs[0];

  // Wrap table in a responsive div container for horizontal scrolling on mobile
  const processedContent = activeTab?.content
    ? activeTab.content
        .replace(/<table/g, `<div class="${styles.table_responsive_wrapper}"><table`)
        .replace(/<\/table>/g, '</table></div>')
    : '';

  return (
    <div className={styles.kfs_container}>
      <h1 className={styles.title}>KEY FACTS STATEMENT</h1>

      <div className={styles.arabic_btn_row}>
        <a
          href="/key-fact-statement/#"
          className={styles.arabic_btn}
        >
          عربي
        </a>
      </div>

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
          <h2 className={styles.tab_heading}>{activeTab?.sectionTitle || activeTab?.tabName}</h2>
          
          <div 
            className={styles.table_content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(processedContent) }}
          />
        </div>
      </div>
    </div>
  );
}
