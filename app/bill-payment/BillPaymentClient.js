"use client";

import React from 'react';
import { Icon } from "@iconify/react";
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

const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
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
  const services = (servicesSection?.cards || []).length
    ? servicesSection.cards.map(c => ({ title: c.title, icon: c.icon }))
    : extractPoints(servicesSection).map(title => ({ title, icon: null }));

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

        <section className={Style.services_section}>
          <div className={Style.services_header}>
            {!isEmptyHtml(servicesSection?.title) && (
              <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(servicesSection.title) }} />
            )}
          </div>
          <div className={Style.services_grid}>
            {services.map((item, idx) => (
              <div key={idx} className={Style.service_card}>
                <div className={Style.service_icon_box}>
                  {renderIcon(item.icon, undefined, 32)}
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BillPaymentClient;
