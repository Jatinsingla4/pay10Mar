"use client";

import React from 'react';
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

// CMS editors paste bullet lists as a single <ul><li> rich-text block rather
// than filling individual card fields - read points from either shape.
const extractPoints = (section) => {
  const cardPoints = (section?.cards || []).map(c => c.title).filter(Boolean);
  if (cardPoints.length) return cardPoints;
  const liMatches = Array.from((section?.content || '').matchAll(/<li[^>]*>(.*?)<\/li>/gs));
  return liMatches.map(m => m[1].replace(/<[^>]*>?/gm, '').trim()).filter(Boolean);
};

const BillPaymentClient = ({ pageData = null }) => {
  // --- 0. Paiement de factures (feature intro) ---
  const featureSection = pageData?.sections?.[0];
  const featureSubheading = isEmptyHtml(featureSection?.content)
    ? ""
    : featureSection.content.replace(/<[^>]*>?/gm, '').trim();

  // --- 1. Avantages ---
  const advantagesSection = pageData?.sections?.[1];
  const advantagePoints = extractPoints(advantagesSection);

  // --- 2. Services (Électricité / Eau / Télécommunications / Transport) ---
  const servicesSection = pageData?.sections?.[2];
  const servicePoints = extractPoints(servicesSection);

  return (
    <main>
      <section
        className={Style.bill_hero}
        style={bannerBgStyle(pageData)}
      >
        <div className={Style.bill_hero_text}>
          {!isEmptyHtml(pageData?.page_title) && (
            <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
          )}
          {!isEmptyHtml(pageData?.page_subtitle || pageData?.page_description) && (
            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) }} />
          )}
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>
        <ConsumerFeatureSection
          heading={featureSection?.subtitle}
          subheading={featureSubheading}
          imageSrc={featureSection?.images?.[0]}
          imageAlt={featureSection?.subtitle}
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
          heading={servicesSection?.title}
          points={servicePoints}
          imageSrc={servicesSection?.images?.[0]}
          imageAlt={servicesSection?.title}
          isReversed={false}
          isGreyBg={true}
          isTransparent={true}
        />
      </div>
    </main>
  );
};

export default BillPaymentClient;
