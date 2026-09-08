"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml, stripTags } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const CONSUMER_APPLE_URL = "https://apps.apple.com/app/6779525972";
const CONSUMER_PLAY_URL = "https://play.google.com/store/apps/details?id=app.payten.wallet.ma";

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const firstNonEmpty = (...vals) => vals.find(v => typeof v === 'string' && v.trim()) || "";
const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

// CMS editors paste bullet lists as a single <ul><li> rich-text block rather
// than filling individual card fields - read points from either shape.
const extractPoints = (section) => {
  const cardPoints = (section?.cards || []).map(c => c.title).filter(Boolean);
  if (cardPoints.length) return cardPoints;
  const liMatches = Array.from((section?.content || '').matchAll(/<li[^>]*>(.*?)<\/li>/gs));
  return liMatches.map(m => stripTags(m[1])).filter(Boolean);
};

const Pay10CardClient = ({ pageData = null }) => {
  const [consumerStoreUrl, setConsumerStoreUrl] = useState(CONSUMER_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setConsumerStoreUrl(CONSUMER_APPLE_URL);
  }, []);

  // --- 0. Alimentation via compte bancaire ---
  const bankSection = pageData?.sections?.[0];
  const bankSubheading = isEmptyHtml(bankSection?.content)
    ? ""
    : stripTags(bankSection.content);

  // --- 1. Avantages ---
  const advantagesSection = pageData?.sections?.[1];
  const advantagePoints = extractPoints(advantagesSection);

  // --- 2. Utilisez votre solde Pay10 (use cases) ---
  const useCasesSection = pageData?.sections?.[2];

  // --- 3. Comment ça marche (steps) ---
  const stepsSection = pageData?.sections?.[3];
  const steps = (stepsSection?.cards || []).map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: ((!isEmptyHtml(c.content) ? c.content : c.subtitle) || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon,
  }));

  // --- 4. CTA final ---
  const ctaSection = pageData?.sections?.[4];

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
          heading={useCasesSection?.title}
          subheading={useCasesSection?.subtitle}
          extraContent={useCasesSection?.content}
          imageSrc={useCasesSection?.images?.[0]}
          imageAlt={useCasesSection?.title}
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

        <section className={Style.final_cta}>
          {!isEmptyHtml(ctaSection?.title) && (
            <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(ctaSection.title) }} />
          )}
          {!isEmptyHtml(ctaSection?.subtitle) && (
            <p className={Style.cta_tagline} dangerouslySetInnerHTML={{ __html: sanitizeHtml(ctaSection.subtitle) }} />
          )}
          <a href={consumerStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.cta_btn}>
            <img src="/images/prod_imports/Pay10-App-Icon.png" alt="" width={20} height={20} />
            <span>Découvrez les fonctionnalités Pay10</span>
          </a>
        </section>
      </div>
    </main>
  );
};

export default Pay10CardClient;
