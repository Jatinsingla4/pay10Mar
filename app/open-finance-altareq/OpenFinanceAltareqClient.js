"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const firstNonEmpty = (...vals) => vals.find(v => typeof v === 'string' && v.trim()) || "";
const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

// CMS editors paste bullet lists as a single <ul><li> rich-text block rather
// than filling individual card fields - read points from either shape.
const extractPoints = (section) => {
  const cardPoints = (section?.cards || []).map(c => c.title).filter(Boolean);
  if (cardPoints.length) return cardPoints;
  const liMatches = Array.from((section?.content || '').matchAll(/<li[^>]*>(.*?)<\/li>/gs));
  return liMatches.map(m => m[1].replace(/<[^>]*>?/gm, '').trim()).filter(Boolean);
};

const OpenFinanceAltareqClient = ({ pageData = null }) => {
  // --- 0. Virement bancaire (feature intro) ---
  const featureSection = pageData?.sections?.[0];
  const featureSubheading = isEmptyHtml(featureSection?.content)
    ? ""
    : featureSection.content.replace(/<[^>]*>?/gm, '').trim();

  // --- 1. Comment ça marche (4 steps) ---
  const stepsSection = pageData?.sections?.[1];
  const steps = (stepsSection?.cards || []).map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: ((!isEmptyHtml(c.content) ? c.content : c.subtitle) || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon,
  }));

  // --- 2. Avantages ---
  const advantagesSection = pageData?.sections?.[2];
  const advantagePoints = extractPoints(advantagesSection);

  return (
    <main className={Style.mainWrapper}>
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
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>
        <ConsumerFeatureSection
          heading={firstNonEmpty(featureSection?.subtitle, featureSection?.title)}
          subheading={featureSubheading}
          imageSrc={featureSection?.images?.[0]}
          imageAlt={firstNonEmpty(featureSection?.subtitle, featureSection?.title)}
          isReversed={false}
          isGreyBg={true}
          isTransparent={true}
        />

        <section className={Style.steps_section}>
          <div className={Style.steps_header} data-animation="opacity-up">
            {!isEmptyHtml(stepsSection?.title) && (
              <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(stepsSection.title) }} />
            )}
            {!isEmptyHtml(stepsSection?.subtitle) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(stepsSection.subtitle) }} />
            )}
          </div>
          <div className={Style.steps_row}>
            {steps.map((item) => (
              <div className={Style.step_card} data-animation="opacity-up" key={item.num}>
                <div className={Style.step_icon_box}>
                  {renderIcon(item.icon, undefined, 32)}
                </div>
                <span className={Style.step_number}>Étape {item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <ConsumerFeatureSection
          heading={advantagesSection?.title}
          points={advantagePoints}
          imageSrc={advantagesSection?.images?.[0]}
          imageAlt={advantagesSection?.title}
          isReversed={true}
          isGreyBg={true}
          isTransparent={true}
        />
      </div>
    </main>
  );
};

export default OpenFinanceAltareqClient;
