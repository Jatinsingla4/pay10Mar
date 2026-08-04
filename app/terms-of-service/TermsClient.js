"use client";

import { useState, useEffect } from 'react';
import tosData from './tosData';
import styles from './terms_and_conditions.module.scss';
import { sanitizeHtml, isEmptyHtml } from '../lib/sanitizeHtml';

// Maps the #hash used by cross-links (e.g. clause 3.2's "Send Abroad
// Special Terms" link) to the tab it should open — tabs are client-side
// React state, not routes, so a plain <a href> can't switch them on its own.
const HASH_TO_TAB = {
  'send-abroad': 'Send Abroad',
  'bill-payment': 'Bill Payment',
  'card-special': 'Card Special',
  'wps-service': 'WPS Service',
};

// Each tab maps 1:1 to a CMS section (by index) — a section's `content`
// overrides the hardcoded legal text below when present, so the CMS can
// take over a tab without needing a code change.
const mergeWithCms = (pageData) => tosData.map((tab, i) => {
  const cmsContent = pageData?.sections?.[i]?.content;
  return isEmptyHtml(cmsContent) ? tab : { ...tab, content: cmsContent };
});

export default function TermsClient({ pageData = null }) {
  const [tabs] = useState(() => mergeWithCms(pageData));
  const [activeTabName, setActiveTabName] = useState(tabs[0]?.tabName || '');

  useEffect(() => {
    const applyHash = () => {
      const tabName = HASH_TO_TAB[window.location.hash.slice(1)];
      if (tabName) setActiveTabName(tabName);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
    const panel = document.querySelector('.' + styles.content_panel);
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeTab = tabs.find((tab) => tab.tabName === activeTabName) || tabs[0];

  return (
    <div className={styles.terms_container}>
      <h1 className={styles.title} data-animation="fade-up">TERMS OF SERVICE</h1>


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
        <main className={styles.content_panel}>
          <div
            key={activeTabName}
            className={styles.legal_content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(activeTab?.content || '') }}
          />
        </main>
      </div>
    </div>
  );
}
