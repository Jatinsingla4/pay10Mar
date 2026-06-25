"use client";

import { useState } from 'react';
import faqData from './faqAltareqData';
import styles from '../faqs/faqs.module.scss'; // Reuse existing faqs styles

export default function FaqsAltareqClient() {
  const [activeTabName, setActiveTabName] = useState(faqData[0]?.tabName || '');
  const [openIndex, setOpenIndex] = useState(null);

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
    setOpenIndex(null); // Close any open accordion items when switching tabs
  };

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Collapse if clicking the already open item
    } else {
      setOpenIndex(index); // Expand the clicked item and collapse others
    }
  };

  const activeTab = faqData.find((tab) => tab.tabName === activeTabName) || faqData[0];

  return (
    <div className={styles.faqs_container}>
      <h1 className={styles.title} data-animation="opacity-up">Al Tareq FAQ</h1>

      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar} data-animation="opacity-up" data-anim-delay="100">
          {faqData.map((tab) => {
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
        <div className={styles.content_panel} data-animation="opacity-up" data-anim-delay="200">
          <h2 className={styles.tab_heading}>{activeTab?.tabName}</h2>
          
          <div className={styles.accordion_list}>
            {activeTab?.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={styles.accordion_item}>
                  <button
                    className={`${styles.accordion_trigger} ${isOpen ? styles.active_trigger : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <h3>{faq.question}</h3>
                    <div className={styles.icon_wrapper}>
                      <svg
                        xmlns="http://www.w3.org/2005/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`${styles.accordion_content} ${isOpen ? styles.open_content : ''}`}
                    style={isOpen ? { maxHeight: '1000px' } : { maxHeight: '0px' }}
                  >
                    <div className={styles.answer_rich_text} style={{ fontFamily: 'regular, sans-serif', fontSize: '1rem', color: 'var(--gray)', lineHeight: '1.6' }}>
                      <style dangerouslySetInnerHTML={{__html: `
                        .answer_rich_text_override ul {
                          list-style-type: disc;
                          padding-left: 20px;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        }
                        .answer_rich_text_override ol {
                          list-style-type: lower-alpha;
                          padding-left: 20px;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        }
                        .answer_rich_text_override li {
                          margin-bottom: 8px;
                          display: list-item;
                        }
                        .answer_rich_text_override p {
                          margin-bottom: 10px;
                        }
                      `}} />
                      <div className="answer_rich_text_override">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
