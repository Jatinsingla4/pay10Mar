"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import faqData from './faqData';
import styles from './faqs.module.scss';
import { sanitizeHtml } from '../lib/sanitizeHtml';

// CMS editors pasting one big block instead of per-card entries: split on
// "Q: ... A: ..." pairs. Keeps inline tags (links etc.) intact, only
// collapses block-level breaks (<p>/<div>/<li>/<br>) to newlines.
function splitQnA(raw) {
  if (!raw) return [];
  const text = raw
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<(p|div|li)[^>]*>/gi, '')
    // Unwrap bold/italic/span markup so "Q:"/"A:" sit directly next to the
    // newline — rich-text editors love wrapping labels in <strong>/<span>.
    .replace(/<\/?(strong|b|em|i|span)[^>]*>/gi, '')
    .trim();

  return [...text.matchAll(/Q:\s*(.*?)\s*A:\s*([\s\S]*?)(?=\n*Q:|$)/gi)]
    .map((m) => ({ question: m[1].trim(), answer: m[2].trim() }))
    .filter((f) => f.question && f.answer);
}

// Each tab maps 1:1 to a CMS section (by index). A section's `cards`
// (title = question, content = answer) override the hardcoded FAQs below
// when present; otherwise a single `content`/`description` blob with
// "Q: ... A: ..." pairs is parsed. Either way the CMS can take over a
// category without a code change.
const mergeWithCms = (pageData) => faqData.map((tab, i) => {
  const section = pageData?.sections?.[i];
  const cards = section?.cards;
  if (cards?.length) {
    return {
      ...tab,
      faqs: cards.map((c) => ({ question: c.title, answer: c.content || c.description || '' })),
    };
  }
  const parsed = splitQnA(section?.content || section?.description);
  return parsed.length ? { ...tab, faqs: parsed } : tab;
});

export default function FaqsClient({ pageData = null }) {
  const [tabs] = useState(() => mergeWithCms(pageData));
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const [activeTabName, setActiveTabName] = useState(
    categoryQuery && tabs.some(tab => tab.tabName === categoryQuery)
      ? categoryQuery
      : tabs[0]?.tabName || ''
  );
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (categoryQuery && tabs.some(tab => tab.tabName === categoryQuery)) {
      setActiveTabName(categoryQuery);
      setOpenIndex(null);
    }
  }, [categoryQuery, tabs]);

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

  const activeTab = tabs.find((tab) => tab.tabName === activeTabName) || tabs[0];

  return (
    <div className={styles.faqs_container}>
      <h1 className={styles.title} data-animation="opacity-up">FREQUENTLY ASKED QUESTIONS</h1>

      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar} data-animation="opacity-up" data-anim-delay="100">
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
                    <p className={styles.answer_text} dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.answer) }} />
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
