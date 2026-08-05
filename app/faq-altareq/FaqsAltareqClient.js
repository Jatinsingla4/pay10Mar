"use client";

import { useState } from 'react';
import faqData from './faqAltareqData';
import styles from '../faqs/faqs.module.scss'; // Reuse existing faqs styles
import { sanitizeHtml } from '../lib/sanitizeHtml';

// CMS editors pasting one big block instead of per-card entries: split on
// "Q: ... A: ..." pairs. Unwraps bold/italic/span markup (rich-text editors
// love wrapping labels in <strong>/<span>) so "Q:"/"A:" sit next to the
// newline; keeps other inline tags (links, lists) intact.
function splitQnA(raw) {
  if (!raw) return [];
  const text = raw
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<(p|div|li)[^>]*>/gi, '')
    .replace(/<\/?(strong|b|em|i|span)[^>]*>/gi, '')
    .trim();

  return [...text.matchAll(/Q:\s*(.*?)\s*A:\s*([\s\S]*?)(?=\n*Q:|$)/gi)]
    .map((m) => ({ question: m[1].trim(), answer: m[2].trim() }))
    .filter((f) => f.question && f.answer);
}

// Each tab maps 1:1 to a CMS section (by index). A section's `cards`
// (title = question, content = answer HTML) override the hardcoded FAQs
// below when present; otherwise a single `content`/`description` blob with
// "Q: ... A: ..." pairs is parsed. CMS answers are HTML strings (rendered
// via dangerouslySetInnerHTML below); hardcoded ones are JSX elements.
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

export default function FaqsAltareqClient({ pageData = null }) {
  const [tabs] = useState(() => mergeWithCms(pageData));
  const [activeTabName, setActiveTabName] = useState(tabs[0]?.tabName || '');
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

  const activeTab = tabs.find((tab) => tab.tabName === activeTabName) || tabs[0];

  return (
    <div className={styles.faqs_container}>
      <h1 className={styles.title} data-animation="opacity-up">Al Tareq FAQ</h1>

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
                      {typeof faq.answer === 'string' ? (
                        <div className="answer_rich_text_override" dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.answer) }} />
                      ) : (
                        <div className="answer_rich_text_override">{faq.answer}</div>
                      )}
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
