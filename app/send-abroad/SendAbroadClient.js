"use client";

import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import InteractiveGlobe from "@/app/components/ui/3d/InteractiveGlobe";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";
import { useResponsive } from "@/app/contexts/ResponsiveContext";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const CONSUMER_APPLE_URL = "https://apps.apple.com/ae/app/pay10-uae/id6739810874";
const CONSUMER_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.payten.wallet.app&hl=en";
const MERCHANT_APPLE_URL = "https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134";
const MERCHANT_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.pay10.merchant.app";

const SendAbroadClient = ({ pageData = null }) => {
  const { isMobile } = useResponsive();
  const consumerQr = pageData?.sections?.[4]?.images?.[0] || "/images/send-abroad/consumer-app-qr.png";
  const merchantQr = pageData?.sections?.[4]?.images?.[1] || "/images/send-abroad/merchant-app-qr.png";

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

  const countriesContent = (
    <div className={Style.countries_box}>
      <h4 className={Style.countries_heading}>7 Countries Live</h4>
      <div className={Style.flag_row}>
        <div className={Style.flag_box}><Icon icon="circle-flags:in" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:ph" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:pk" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:bd" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:np" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:lk" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:eg" /></div>
      </div>

      <h4 className={Style.countries_heading} style={{ marginTop: '24px' }}>Coming Soon - 8 More</h4>
      <div className={Style.flag_row}>
        <div className={Style.flag_box}><Icon icon="circle-flags:jo" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:ma" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:ke" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:tz" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:gh" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:sy" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:et" /></div>
        <div className={Style.flag_box}><Icon icon="circle-flags:id" /></div>
      </div>

      {pageData?.sections?.[3]?.content && pageData.sections[3].content !== '<p><br></p>' ? (
        <div className={Style.countries_para} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[3].content) }} />
      ) : (
        <p className={Style.countries_para}>
          140+ countries are expanding. Pay10 Send Abroad is built to reach every corner of the world - because the UAE's 9M+ expatriates come from everywhere. If your country isn't live yet, it's on its way. Download Pay10 and be the first to send when your corridor opens.
        </p>
      )}
    </div>
  );

  return (
    <main>
      <section 
        className={Style.send_hero}
        style={bannerBgStyle(pageData, { mobileFallback: '/images/prod_imports/send-abroad-hero-mobile.png' })}
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
        
        {/* Section 0: Stats Strip */}
        <section className={Style.stats_strip}>
          <div className={Style.stats_grid}>
            {pageData?.sections?.[0]?.cards?.map((card, idx) => (
              <div className={Style.stat_card} key={idx}>
                <h3>{card.title}</h3>
                <p>{card.subtitle || card.description}</p>
              </div>
            )) || (
              <>
                <div className={Style.stat_card}>
                  <h3>7</h3>
                  <p>Countries live now</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>+8</h3>
                  <p>Countries coming soon</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>140+</h3>
                  <p>Countries expanding to</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>Instant</h3>
                  <p>Same-day every transfer</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section 1: Instant Feature */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={pageData?.sections?.[1]?.title}
            subheading={pageData?.sections?.[1]?.subtitle}
            imageSrc={pageData?.sections?.[1]?.images?.[0] || "/images/prod_imports/send-instant-bubble.png"}
            imageAlt={pageData?.sections?.[1]?.title || "Instant Money Transfer"}
            isReversed={false}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>

        {/* Section 2: Steps */}
        <section className={Style.steps_section}>
          <div className={Style.steps_header} data-animation="opacity-up">
            <h2>{pageData?.sections?.[2]?.title}</h2>
            <p>{pageData?.sections?.[2]?.subtitle}</p>
          </div>
          <div className={Style.steps_container}>
            <div className={Style.steps_left} data-animation="opacity-up">
              <InteractiveGlobe />
            </div>

            <div className={Style.steps_right}>
              {pageData?.sections?.[2]?.cards?.map((card, idx) => (
                <div className={Style.step_card} data-animation="opacity-up" data-anim-delay={`${(idx + 1) * 100}`} key={idx}>
                  <span className={Style.step_number}>Step {idx + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle || card.description}</p>
                </div>
              )) || (
                <>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="100">
                    <span className={Style.step_number}>Step 1</span>
                    <h3>Open your Pay10 UAE</h3>
                    <p>Select Send Abroad Feature</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="200">
                    <span className={Style.step_number}>Step 2</span>
                    <h3>Select country</h3>
                    <p>Choose from your available Send Abroad destinations - based on your home country.</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="300">
                    <span className={Style.step_number}>Step 3</span>
                    <h3>Enter amount & recipient</h3>
                    <p>Enter how much to send and your recipient's details. No waiting for approvals.</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="400">
                    <span className={Style.step_number}>Step 4</span>
                    <h3>Sent. Instantly.</h3>
                    <p>Confirm and it's done. Your loved one receives their money the same day.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Countries Feature */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={pageData?.sections?.[3]?.title}
            subheading={pageData?.sections?.[3]?.subtitle}
            extraContent={
              <>
                {countriesContent}
              </>
            }
            imageSrc={pageData?.sections?.[3]?.images?.[0] || "/images/prod_imports/send-where-bubble.png"}
            imageAlt={pageData?.sections?.[3]?.title || "Countries"}
            isReversed={true}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>
        
        <section className={Style.download_cta}>
          <div data-animation="opacity-up">
            <h3>Get the App Now</h3>
          </div>

          <div className={Style.apps_container} data-animation="opacity-up" data-anim-delay="100">
            <div className={Style.app_type}>
              <h4>Consumer App</h4>
              {isMobile ? (
                <a href={consumerStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.single_download_btn}>
                  <Icon icon="mdi:download" width={20} />
                  <span>Download Now</span>
                </a>
              ) : (
                <img src={consumerQr} alt="Scan to download the Pay10 Consumer App" className={Style.qr_image} />
              )}
            </div>

            <div className={Style.app_type}>
              <h4>Merchant App</h4>
              {isMobile ? (
                <a href={merchantStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.single_download_btn}>
                  <Icon icon="mdi:download" width={20} />
                  <span>Download Now</span>
                </a>
              ) : (
                <img src={merchantQr} alt="Scan to download the Pay10 Merchant App" className={Style.qr_image} />
              )}
            </div>
          </div>
        </section>

      </div>

    </main>
  );
};

export default SendAbroadClient;
