"use client";

import React, { useCallback, useState } from "react";
import FaqAccordionItem from "./FaqAccordionItem";
import { normalizeFaqHero } from "./faqApiNormalize";
import Style from "./faq-customer-app.module.scss";

const scrollToSection = (sectionId) => {
  if (typeof document === "undefined") return;
  document.getElementById(`section-${sectionId}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const STATIC_HERO = normalizeFaqHero(undefined);
const STATIC_SECTIONS = [];

/**
 * FAQ Merchant App — static (no API calls).
 */
const FAQCustomerAppClient = () => {
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggleItem = useCallback((id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (STATIC_SECTIONS.length === 0) {
    return (
      <main className={Style.main}>
        <header className={Style.heroBanner}>
          <div className={Style.heroInner}>
            <p className={Style.heroKicker}>{STATIC_HERO.kicker}</p>
            <h1 className={Style.heroTitle}>{STATIC_HERO.title}</h1>
          </div>
        </header>
        <div className={Style.contentShell}>
          <p className={Style.emptyState} role="status">
            No FAQ content is available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={Style.main}>
      <header className={Style.heroBanner}>
        <div className={Style.heroInner}>
          <p className={Style.heroKicker}>{STATIC_HERO.kicker}</p>
          <h1 className={Style.heroTitle}>{STATIC_HERO.title}</h1>
        </div>
      </header>

      <div className={Style.contentShell}>
        {STATIC_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className={Style.block}
            {...(section.title
              ? { "aria-labelledby": `heading-${section.id}` }
              : { "aria-label": "FAQ section" })}
          >
            {section.title ? (
              <h2 className={Style.sectionTitle} id={`heading-${section.id}`}>
                <span className={Style.sectionTitleAccent} aria-hidden="true" />
                {section.title}
              </h2>
            ) : null}

            <div className={Style.itemList}>
              {section.items.map((item) => (
                <FaqAccordionItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                  answerList={item.answerList}
                  open={openIds.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                  linkClass={Style.supportLink}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default FAQCustomerAppClient;
