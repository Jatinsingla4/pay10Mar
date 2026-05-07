"use client";

import React, { useCallback, useEffect, useState } from "react";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";
import FaqAccordionItem from "./FaqAccordionItem";
import { normalizeFaqHero, normalizeFaqPagePayload } from "./faqApiNormalize";
import Style from "./faq-customer-app.module.scss";

const FAQ_ENDPOINT = "/page/faq-pay10-biz-app";

const scrollToSection = (sectionId) => {
  if (typeof document === "undefined") return;
  document.getElementById(`section-${sectionId}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/**
 * FAQ Merchant App — data only from `/page/faq-pay10-biz-app` (no local fallback).
 */
const FAQCustomerAppClient = () => {
  const { makeApiCall } = useApiAuth();
  const [openIds, setOpenIds] = useState(() => new Set());
  const [hero, setHero] = useState(() => normalizeFaqHero(undefined));
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  /** 'ok' | 'error' | 'empty' — empty = API ok but no usable FAQ sections */
  const [loadState, setLoadState] = useState(/** @type {'ok' | 'error' | 'empty'} */ ("ok"));

  const toggleItem = useCallback((id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const result = await makeApiCall(FAQ_ENDPOINT);
        if (!mounted) return;

        if (!result?.status) {
          setSections([]);
          setHero(normalizeFaqHero(undefined));
          setLoadState("error");
          return;
        }

        const pageData =
          result.page_data && typeof result.page_data === "object"
            ? result.page_data
            : undefined;

        setHero(normalizeFaqHero(pageData));

        const normalized = normalizeFaqPagePayload(result);
        if (normalized?.length) {
          setSections(normalized);
          setLoadState("ok");
        } else {
          setSections([]);
          setLoadState("empty");
        }
      } catch {
        if (!mounted) return;
        setSections([]);
        setHero(normalizeFaqHero(undefined));
        setLoadState("error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [makeApiCall]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash || !sections.some((s) => s.id === hash)) return;
    requestAnimationFrame(() => scrollToSection(hash));
  }, [sections]);

  if (loading) {
    return <PageLoader />;
  }

  if (loadState !== "ok" || sections.length === 0) {
    return (
      <main className={Style.main}>
        <header className={Style.heroBanner}>
          <div className={Style.heroInner}>
            <p className={Style.heroKicker}>{hero.kicker}</p>
            <h1 className={Style.heroTitle}>{hero.title}</h1>
          </div>
        </header>
        <div className={Style.contentShell}>
          <p className={Style.emptyState} role="status">
            {loadState === "error"
              ? "We couldn’t load this page. Please try again later."
              : "No FAQ content is available."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={Style.main}>
      <header className={Style.heroBanner}>
        <div className={Style.heroInner}>
          <p className={Style.heroKicker}>{hero.kicker}</p>
          <h1 className={Style.heroTitle}>{hero.title}</h1>
        </div>
      </header>

      <div className={Style.contentShell}>
        {sections.map((section) => (
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
