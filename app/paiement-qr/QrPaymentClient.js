"use client";

import React, { useState, useEffect } from "react";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { Icon } from "@iconify/react";
// Reuses the POS Devices page's stylesheet - same section patterns (feature
// intro, icon-card grid, numbered steps, combo CTA) fit this page too, and
// CSS Modules namespace the class names so there's no collision between pages.
import styles from "../pos-devices/pos.module.scss";
import localStyles from "./qr-payment.module.scss";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const CONSUMER_APPLE_URL = "https://apps.apple.com/ae/app/pay10-uae/id6739810874";
const CONSUMER_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.payten.wallet.app&hl=en";
const MERCHANT_APPLE_URL = "https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134";
const MERCHANT_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.pay10.merchant.app";

const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const QrPaymentClient = ({ pageData = null }) => {
  const [consumerStoreUrl, setConsumerStoreUrl] = useState(CONSUMER_PLAY_URL);
  const [merchantStoreUrl, setMerchantStoreUrl] = useState(MERCHANT_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) {
      setConsumerStoreUrl(CONSUMER_APPLE_URL);
      setMerchantStoreUrl(MERCHANT_APPLE_URL);
    }
  }, []);

  // No CMS banner image on this page yet - inline style (highest specificity,
  // overrides the shared stylesheet's background:var(--bg-desktop,none) rule
  // regardless of source order) falls back to the brand gradient instead of
  // the mixin's plain dark grey. Uploading a banner_image in the CMS
  // overrides this automatically.
  const heroBg = bannerBgStyle(pageData);
  const heroStyle = Object.keys(heroBg).length ? heroBg : { background: 'var(--primary-gradient)' };

  const featureSection = pageData?.sections?.[0];
  const featureSubheading = isEmptyHtml(featureSection?.content)
    ? ""
    : featureSection.content.replace(/<[^>]*>?/gm, '').trim();
  const featurePoints = (featureSection?.cards || []).map(c => c.title).filter(Boolean);

  const advantagesSection = pageData?.sections?.[1];
  const advantages = (advantagesSection?.cards || []).map(c => ({ title: c.title, icon: c.icon }));

  const interopSection = pageData?.sections?.[2];
  const interopPoints = (interopSection?.cards || []).map(c => ({ title: c.title, icon: c.icon }));

  const stepsSection = pageData?.sections?.[3];
  const steps = (stepsSection?.cards || []).map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    // CMS entry has the step text in `subtitle` rather than `content`/`description`.
    desc: ((!isEmptyHtml(c.content) ? c.content : c.subtitle) || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon,
  }));

  return (
    <main className={styles.pos_page}>
      {/* Hero */}
      <section className={styles.altareq_section}>
        <div className={styles.altareq_hero} style={heroStyle}>
          <div className={styles.altareq_hero_content}>
            {!isEmptyHtml(pageData?.page_title) && (
              <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
            )}
            {!isEmptyHtml(pageData?.page_subtitle) && (
              <p className={styles.altareq_hero_subtitle} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_subtitle) }} />
            )}
          </div>
        </div>
      </section>

      {/* Paiement par QR Code */}
      <ConsumerFeatureSection
        heading={
          <>
            {!isEmptyHtml(featureSection?.subtitle) && (
              <div className={styles.uae_label} dangerouslySetInnerHTML={{ __html: sanitizeHtml(featureSection.subtitle) }} />
            )}
            {!isEmptyHtml(featureSection?.title) && (
              <span className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(featureSection.title) }} />
            )}
          </>
        }
        subheading={featureSubheading}
        points={featurePoints}
        imageSrc={featureSection?.images?.[0] || "/images/qr-payment/qr-feature-placeholder.jpg"}
        imageAlt="Paiement par QR Code"
        isReversed={false}
        isGreyBg={true}
      />

      {/* Avantages */}
      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            {!isEmptyHtml(advantagesSection?.title) && (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(advantagesSection.title) }} />
            )}
          </div>

          <div className={`${styles.guarantee_grid} ${localStyles.guarantee_grid_fluid}`}>
            {advantages.map((item, idx) => (
              <div key={idx} className={`${styles.guarantee_card} ${localStyles.guarantee_card_polished}`}>
                <div className={`${styles.icon_wrap} ${localStyles.icon_wrap_large}`}>
                  {renderIcon(item.icon, styles.card_icon, 32)}
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interopérabilité MarocPay */}
      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            {!isEmptyHtml(interopSection?.title) && (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.title) }} />
            )}
            {!isEmptyHtml(interopSection?.subtitle) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.subtitle) }} />
            )}
            {!isEmptyHtml(interopSection?.content) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.content) }} />
            )}
          </div>

          <div className={`${styles.guarantee_grid} ${localStyles.guarantee_grid_fluid}`}>
            {interopPoints.map((item, idx) => (
              <div key={idx} className={`${styles.guarantee_card} ${localStyles.guarantee_card_polished}`}>
                <div className={`${styles.icon_wrap} ${localStyles.icon_wrap_large}`}>
                  {renderIcon(item.icon, styles.card_icon, 32)}
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className={styles.getting_started}>
        <div className={styles.getting_started_left}>
          {!isEmptyHtml(stepsSection?.title) && (
            <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(stepsSection.title) }} />
          )}
        </div>

        <div className={styles.getting_started_grid}>
          {steps.map((item) => (
            <div key={item.num} className={`${styles.step_card} ${localStyles.step_card_polished}`}>
              <div className={localStyles.step_icon_box}>
                {renderIcon(item.icon, undefined, 32)}
              </div>
              <h3>{item.title}</h3>
              <p className={styles.step_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Découvrez nos solutions */}
      <section className={styles.final_combo}>
        <div className={`${styles.combo_card} ${localStyles.combo_card_unified}`}>
          <span className={styles.combo_ring} aria-hidden="true" />
          <span className={styles.combo_ring_small} aria-hidden="true" />

          <div className={styles.combo_cta}>
            <h2 className={styles.combo_heading}>Découvrez nos solutions</h2>
            <div className={localStyles.combo_buttons_row}>
              <a href={consumerStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.combo_btn}>
                <img src="/images/prod_imports/Pay10-App-Icon.png" alt="" width={18} height={18} className={localStyles.combo_btn_icon} />
                <span>Pay10</span>
              </a>
              {/* ponytail: no real Pay10 Biz app icon exists anywhere in this codebase -
                  generated a placeholder matching the real Pay10 icon's visual style
                  (same orange circle + "10" mark), swap for the real asset once it exists. */}
              <a href={merchantStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.combo_btn}>
                <img src="/images/qr-payment/pay10-biz-icon-placeholder.png" alt="" width={18} height={18} className={localStyles.combo_btn_icon} />
                <span>Pay10 Biz</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QrPaymentClient;
