"use client";

import { useState } from 'react';
import tosData from './tosData';
import styles from './terms_and_conditions.module.scss';
import { sanitizeHtml } from '../lib/sanitizeHtml';

export default function TermsClient() {
  const [activeTabName, setActiveTabName] = useState(tosData[0]?.tabName || '');

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
    const panel = document.querySelector('.' + styles.content_panel);
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeTab = tosData.find((tab) => tab.tabName === activeTabName) || tosData[0];

  return (
    <div className={styles.terms_container}>
      <h1 className={styles.title} data-animation="fade-up">TERMS OF SERVICE</h1>


      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar} data-animation="fade-up">
          {tosData.map((tab) => {
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
