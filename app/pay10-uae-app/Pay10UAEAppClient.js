"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ConsumerHero from "@/app/components/ui/product/ConsumerHero";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import ConsumerSecuritySection from "./ConsumerSecuritySection";
import Style from "./page.module.scss";
import { stripTags } from "@/app/lib/sanitizeHtml";
import { useResponsive } from "@/app/contexts/ResponsiveContext";

const CONSUMER_APPLE_URL = "https://apps.apple.com/app/6779525972";
const CONSUMER_PLAY_URL = "https://play.google.com/store/apps/details?id=app.payten.wallet.ma";

// These sections must render right after the hero, ahead of everything else —
// CMS only allows appending new sections at the end, so we reorder by title here.
const PINNED_TO_TOP = [
  'Register in Minutes',
  'Login. Securely. Every Time.',
  'Manage Your Profile. Your Way.',
];

const CustomerAppClient = ({ pageData = null }) => {
  const { isMobile } = useResponsive();
  const [consumerStoreUrl, setConsumerStoreUrl] = useState(CONSUMER_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setConsumerStoreUrl(CONSUMER_APPLE_URL);
  }, []);

  // Extract the first section which acts as the hero content
  const heroSection = pageData?.sections?.[0];
  const remainingSections = [...(pageData?.sections?.slice(1) || [])].sort((a, b) => {
    const aRank = PINNED_TO_TOP.findIndex((t) => t.toLowerCase() === a.title?.trim().toLowerCase());
    const bRank = PINNED_TO_TOP.findIndex((t) => t.toLowerCase() === b.title?.trim().toLowerCase());
    return (aRank === -1 ? PINNED_TO_TOP.length : aRank) - (bRank === -1 ? PINNED_TO_TOP.length : bRank);
  });

  return (
    <main>
      <ConsumerHero 
        title={pageData?.page_title}
        eyebrow={heroSection?.title || pageData?.banner_text}
        subtitle={heroSection?.subtitle || pageData?.page_subtitle}
        description={heroSection?.content || pageData?.page_description}
        bgImage={pageData?.banner_image}
        mobileImage={pageData?.mobile_image}
        mobileBgImage={pageData?.mobile_image}
        cardsData={heroSection?.cards || pageData?.contact_cards || []}
      />

      {remainingSections && remainingSections.length > 0 && (
        <div className={Style.bg_circle_wrapper}>
          {remainingSections.map((section, index) => {
            // Check if this section is the security section
            if (section.title?.toUpperCase().includes('SECURITY')) {
              return (
                <ConsumerSecuritySection 
                  key={index} 
                  title={section.title}
                  subtitle={section.subtitle}
                  content={section.content}
                  images={section.images}
                />
              );
            }

            // Bullets can come from an actual <li> list typed into the CMS
            // content field, instead of requiring separate "cards" per bullet.
            const liMatches = section.content
              ? Array.from(section.content.matchAll(/<li[^>]*>(.*?)<\/li>/g))
              : [];
            const pointsFromContent = liMatches.map((m) => stripTags(m[1]));
            const points = pointsFromContent.length > 0
              ? pointsFromContent
              : (section.cards?.map(card => card.title) || []);

            // Otherwise, render it as a feature section
            const isTransactionsSection = section.title?.toLowerCase().includes('transactions');

            return (
              <div key={index}>
                <ConsumerFeatureSection
                  heading={section.title}
                  subheading={section.subtitle}
                  points={points}
                  imageSrc={section.images?.[0]}
                  imageAlt={section.title}
                  isReversed={index % 2 !== 0} // Alternate left/right based on index
                  isGreyBg={true}
                  isTransparent={true}
                  extraContent={pointsFromContent.length > 0 ? null : section.content}
                />
                {isTransactionsSection && (
                  <section className={Style.app_download}>
                    <h2 className={Style.app_download_heading}>Application Client</h2>
                    {isMobile ? (
                      <a href={consumerStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.store_badge_link}>
                        <img
                          src={consumerStoreUrl === CONSUMER_APPLE_URL ? "/images/common/app-store.svg" : "/images/common/google-play.svg"}
                          alt="Télécharger l'application Pay10"
                          className={Style.store_badge}
                        />
                      </a>
                    ) : (
                      <Image src={section.images?.[1] || "/images/send-abroad/consumer-app-qr.png"} alt="Scan to download the Pay10 App" className={Style.qr_image} width={140} height={140} />
                    )}
                  </section>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CustomerAppClient;
