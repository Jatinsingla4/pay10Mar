"use client";

import { useState } from 'react';
import kfsData from './kfsData';
import styles from './kfs.module.scss';

export default function KfsClient() {
  const [activeTabName, setActiveTabName] = useState(kfsData[0]?.tabName || '');

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
  };

  const activeTab = kfsData.find((tab) => tab.tabName === activeTabName) || kfsData[0];

  // Wrap table in a responsive div container for horizontal scrolling on mobile
  const processedContent = activeTab?.content
    ? activeTab.content
        .replace(/<table/g, `<div class="${styles.table_responsive_wrapper}"><table`)
        .replace(/<\/table>/g, '</table></div>')
    : '';

  return (
    <div className={styles.kfs_container}>
      <h1 className={styles.title}>Key Fact Statement</h1>

      <div className={styles.arabic_btn_row}>
        <a
          href="https://pay10.ae/key-fact-statement/#"
          className={styles.arabic_btn}
        >
          عربي
        </a>
      </div>

      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar}>
          {kfsData.map((tab) => {
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
          <h2 className={styles.tab_heading}>{activeTab?.tabName}</h2>
          
          <div 
            className={styles.table_content}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </main>
      </div>
    </div>
  );
}
