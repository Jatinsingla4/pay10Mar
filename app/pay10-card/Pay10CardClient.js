"use client";

import React from "react";
import Link from "next/link";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const firstNonEmpty = (...vals) => vals.find(v => typeof v === 'string' && v.trim()) || "";
const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

// CMS editors paste bullet lists as a single <ul><li> rich-text block rather
// than filling individual card fields - read points from either shape.
const extractPoints = (section) => {
  const cardPoints = (section?.cards || []).map(c => c.title).filter(Boolean);
  if (cardPoints.length) return cardPoints;
  const liMatches = Array.from((section?.content || '').matchAll(/<li[^>]*>(.*?)<\/li>/gs));
  return liMatches.map(m => m[1].replace(/<[^>]*>?/gm, '').trim()).filter(Boolean);
};

const Pay10CardClient = ({ pageData = null }) => {
  // --- 0. Alimentation via compte bancaire ---
  const bankSection = pageData?.sections?.[0];
  const bankSubheading = isEmptyHtml(bankSection?.content)
    ? ""
    : bankSection.content.replace(/<[^>]*>?/gm, '').trim();

  // --- 1. Avantages ---
  const advantagesSection = pageData?.sections?.[1];
  const advantagePoints = extractPoints(advantagesSection);

  // --- 2. Utilisez votre solde Pay10 (use cases) ---
  const useCasesSection = pageData?.sections?.[2];
  const useCasePoints = extractPoints(useCasesSection);

  // --- 3. CTA final ---
  const ctaSection = pageData?.sections?.[3];

  return (
    <main>
      <section
        className={Style.altareq_hero}
        style={bannerBgStyle(pageData)}
      >
        <div className={Style.altareq_hero_text}>
          {!isEmptyHtml(pageData?.page_title) && (
            <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
          )}
          {!isEmptyHtml(pageData?.page_subtitle || pageData?.page_description) && (
            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) }} />
          )}
          {!isEmptyHtml(pageData?.banner_text) && (
            <p className={Style.slogan} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.banner_text) }} />
          )}
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>
        <ConsumerFeatureSection
          heading={firstNonEmpty(bankSection?.subtitle, bankSection?.title)}
          subheading={bankSubheading}
          imageSrc={bankSection?.images?.[0]}
          imageAlt={firstNonEmpty(bankSection?.subtitle, bankSection?.title)}
          isReversed={false}
          isGreyBg={true}
          isTransparent={true}
        />

        <ConsumerFeatureSection
          heading={advantagesSection?.title}
          points={advantagePoints}
          imageSrc={advantagesSection?.images?.[0]}
          imageAlt={advantagesSection?.title}
          isReversed={true}
          isGreyBg={true}
          isTransparent={true}
        />

        <ConsumerFeatureSection
          heading={firstNonEmpty(useCasesSection?.subtitle, useCasesSection?.title)}
          points={useCasePoints}
          imageSrc={useCasesSection?.images?.[0]}
          imageAlt={firstNonEmpty(useCasesSection?.subtitle, useCasesSection?.title)}
          isReversed={false}
          isGreyBg={true}
          isTransparent={true}
        />

        <section className={Style.final_cta}>
          {!isEmptyHtml(ctaSection?.title) && (
            <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(ctaSection.title) }} />
          )}
          {!isEmptyHtml(ctaSection?.subtitle) && (
            <p className={Style.cta_tagline} dangerouslySetInnerHTML={{ __html: sanitizeHtml(ctaSection.subtitle) }} />
          )}
          <Link href="/pay10-uae-app" className={Style.cta_btn}>
            <img src="/images/prod_imports/Pay10-App-Icon.png" alt="" width={20} height={20} />
            <span>Découvrez les fonctionnalités Pay10</span>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Pay10CardClient;
