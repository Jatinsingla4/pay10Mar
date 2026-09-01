"use client";

import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const CONSUMER_APPLE_URL = "https://apps.apple.com/ae/app/pay10-uae/id6739810874";
const CONSUMER_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.payten.wallet.app&hl=en";

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const SendAbroadClient = ({ pageData = null }) => {
  const [consumerStoreUrl, setConsumerStoreUrl] = useState(CONSUMER_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setConsumerStoreUrl(CONSUMER_APPLE_URL);
  }, []);

  // --- 0. Transfert d'argent instantané + Avantages ---
  const featureSection = pageData?.sections?.[0];
  const featurePoints = (featureSection?.cards || []).map(c => c.title).filter(Boolean);

  // --- 1. Comment ça marche (3 steps) ---
  const stepsSection = pageData?.sections?.[1];
  const steps = (stepsSection?.cards || []).map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: ((!isEmptyHtml(c.content) ? c.content : c.subtitle) || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon,
  }));

  // --- 2. Le destinataire n'utilise pas encore Pay10 ? ---
  const inviteSection = pageData?.sections?.[2];

  return (
    <main>
      <section
        className={Style.send_hero}
        style={bannerBgStyle(pageData)}
      >
        <div className={Style.send_hero_text}>
          {!isEmptyHtml(pageData?.page_title) && (
            <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
          )}
          {!isEmptyHtml(pageData?.page_subtitle || pageData?.page_description) && (
            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_subtitle || pageData.page_description) }} />
          )}
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>

        {/* Transfert d'argent instantané + Avantages */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={featureSection?.title}
            subheading={featureSection?.subtitle}
            points={featurePoints}
            imageSrc={featureSection?.images?.[0]}
            imageAlt={featureSection?.title}
            isReversed={false}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>

        {/* Comment ça marche - 3 steps */}
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

        {/* Le destinataire n'utilise pas encore Pay10 ? */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={inviteSection?.title}
            subheading={inviteSection?.subtitle}
            imageSrc={inviteSection?.images?.[0]}
            imageAlt={inviteSection?.title}
            isReversed={true}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>

        <section className={Style.download_cta}>
          <div data-animation="opacity-up">
            <h3>Téléchargez Pay10</h3>
          </div>

          <div className={Style.apps_container} data-animation="opacity-up" data-anim-delay="100">
            <div className={Style.app_type}>
              <a href={consumerStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.single_download_btn}>
                <Icon icon="mdi:download" width={20} />
                <span>Télécharger</span>
              </a>
            </div>
          </div>
        </section>

      </div>

    </main>
  );
};

export default SendAbroadClient;
