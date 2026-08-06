"use client";

import React from 'react';
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const BillPaymentClient = ({ pageData = null }) => {
  const heroSection = pageData?.sections?.[0];

  const utilitySection = {
    heading: "Utility Bill Payments (Coming Soon)",
    subheading: "Your home runs on it. Pay10 makes it easy. Electricity, water, gas, chiller, wherever you live in the UAE, Pay10 UAE connects you to your authority's billing system directly.",
    points: [
      "Pay electricity, water, gas, and chiller bills in one place",
      "Covers all 7 Emirates. Your provider is here",
      "No more logging into separate utility portals",
      "Payment confirmed instantly. No processing delays"
    ],
    extraContent: (
      <div className={Style.provider_badges_box}>
        <p className={Style.provider_heading}>PROVIDERS: 3 launching first, 11 at full rollout:</p>
        <div className={Style.badges_container}>
          <span className={`${Style.badge} ${Style.badge_green}`}>DEWA</span>
          <span className={`${Style.badge} ${Style.badge_green}`}>SEWA</span>
          <span className={`${Style.badge} ${Style.badge_green}`}>LOOTAH</span>
          <span className={`${Style.badge} ${Style.badge_orange}`}>ADDC</span>
          <span className={`${Style.badge} ${Style.badge_orange}`}>AADC</span>
          <span className={`${Style.badge} ${Style.badge_orange}`}>FEWA</span>
          <span className={`${Style.badge} ${Style.badge_orange}`}>RAKIA</span>
          <span className={`${Style.badge} ${Style.badge_orange}`}>+ more</span>
        </div>
      </div>
    ),
    imageSrc: "/images/prod_imports/bill-utility-bubble.png",
    imageAlt: "Utility Bill Payments",
    isReversed: false,
    isGreyBg: true,
  };

  const telecomSection = {
    heading: "Telecom",
    subheading: "Stay connected. Never run out. Pay your phone bill or top up your credit for both e& and du, prepaid and postpaid, without leaving the app.",
    points: [
      "Pay postpaid bills for e& and du instantly",
      "Top up prepaid credit for yourself or someone else",
      "Never get cut off because you forgot to recharge",
      "Both UAE network operators covered"
    ],
    extraContent: (
      <div className={Style.provider_badges_box}>
        <p className={Style.provider_heading}>PROVIDERS AT LAUNCH:</p>
        <div className={Style.badges_container}>
          <span className={Style.badge}>e&</span>
          <span className={Style.badge}>du</span>
          <span className={Style.badge}>Virgin Mobile</span>
        </div>
      </div>
    ),
    imageSrc: "/images/prod_imports/bill-telecom-bubble.png",
    imageAlt: "Telecom Bill Payments",
    isReversed: true, // left side photo, right side text
    isGreyBg: true,
  };

  const transportSection = {
    heading: "Top up your commute in all 7 Emirates.",
    subheading: "From your NOL card in Dubai to transport cards across every Emirate, Pay10 has every mode of public transport covered at launch.",
    points: [
      "Top up NOL for metro, bus, tram, ferry, and more",
      "All public transport providers across all 7 Emirates",
      "12 transport authorities enabled from day one"
    ],
    extraContent: (
      <div className={Style.provider_badges_box}>
        <p className={Style.provider_heading}>PROVIDERS: ALL 12 ENABLED AT LAUNCH:</p>
        <div className={Style.badges_container}>
          <span className={Style.badge}>NOL · RTA</span>
          <span className={Style.badge}>Abu Dhabi</span>
          <span className={Style.badge}>Sharjah</span>
          <span className={Style.badge}>Ajman</span>
          <span className={Style.badge}>RAK</span>
          <span className={Style.badge}>Fujairah</span>
          <span className={Style.badge}>UAQ</span>
          <span className={Style.badge}>+ all 12</span>
        </div>
      </div>
    ),
    imageSrc: "/images/prod_imports/bill-transport-bubble.png",
    imageAlt: "Transport Bill Payments",
    isReversed: false, // text left, image right
    isGreyBg: true,
  };

  const giftCardSection = {
    heading: "Gift Cards",
    subheading: "When a bill feels like a gift. Buy a prepaid gift card for someone you love from Pay10 in seconds. No wrapping. No guessing. Just pick, pay, and send.",
    points: [
      "Buy prepaid gift cards directly from Pay10",
      "Send to anyone digitally and instantly",
      "Perfect for birthdays, celebrations, or just because",
      "Choose the amount. They choose what to spend it on."
    ],
    imageSrc: "/images/prod_imports/bill-gift-bubble.png",
    imageAlt: "Gift Cards",
    isReversed: true, // left side photo, right side text
    isGreyBg: true,
  };

  return (
    <main>
      <section
        className={Style.bill_hero}
        style={{
          '--bg-desktop': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
          '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : (pageData?.banner_image ? `url(${pageData.banner_image})` : undefined),
          '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : undefined,
        }}
      >
        <div className={Style.bill_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.page_title) }} />
          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) }} />
          <p className={Style.slogan}>
            {pageData?.banner_text}
          </p>
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>
        {pageData?.sections && pageData.sections.length > 0 && (
          pageData.sections.map((section, index) => {
            const hardcodedExtras = [
              utilitySection.extraContent,
              telecomSection.extraContent,
              transportSection.extraContent,
              null
            ];
            
            // Extract bullets either from <li> tags or from `---` separated text in content
            let extractedPoints = [];
            if (section.content) {
              const liMatches = Array.from(section.content.matchAll(/<li[^>]*>(.*?)<\/li>/g));
              if (liMatches.length > 0) {
                extractedPoints = liMatches.map(m => m[1].trim());
              } else if (section.content.includes('---')) {
                const parts = section.content.split('---');
                extractedPoints = parts[1].split(',').map(p => p.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean);
              }
            }
            
            // If we found bullets in the content, we don't want to show the original content block with standard bullets
            // But if there's text before the bullets, we might want to show it. For now, if we extracted points from <li>, 
            // we'll hide the raw content so we don't double-render bullets.
            const showRawContent = !section.content?.includes('<li') && !section.content?.includes('---') && section.content !== '<p><br></p>';

            return (
              <ConsumerFeatureSection
                key={index}
                heading={section.title}
                subheading={section.subtitle}
                points={extractedPoints.length > 0 ? extractedPoints : (section.cards?.map(card => card.title) || [])}
                extraContent={
                  <>
                    {showRawContent && (
                      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
                    )}
                    {hardcodedExtras[index] || null}
                  </>
                }
                imageSrc={section.images?.[0] || hardcodedExtras[index]?.imageSrc}
                imageAlt={section.title}
                isReversed={index % 2 !== 0}
                isGreyBg={true}
                isTransparent={true}
              />
            );
          })
        )}
      </div>
    </main>
  );
};

export default BillPaymentClient;
