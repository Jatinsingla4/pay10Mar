"use client";

import React from "react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import Pay10CardFeatures from "./components/Pay10CardFeatures";
import Pay10AppFeature from "./components/Pay10AppFeature";
import Pay10WPSFeature from "./components/Pay10WPSFeature";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const Pay10CardClient = ({ pageData = null }) => {
  const cardFeature = {
    heading: pageData?.sections?.[0]?.title,
    subheading: pageData?.sections?.[0]?.subtitle,
    points: pageData?.sections?.[0]?.cards?.map(c => c.title) || [],
    imageSrc: pageData?.sections?.[0]?.images?.[0] || "/images/prod_imports/pay10-card-aluminium.png",
    imageAlt: pageData?.sections?.[0]?.title,
    isReversed: false,
  };

  return (
    <main>
      <section 
        className={Style.altareq_hero}
        style={bannerBgStyle(pageData)}
      >
        <div className={Style.altareq_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.page_title) }} />
          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) }} />
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>

        <div className={Style.grey_subtitle_wrap}>
        <ConsumerFeatureSection
          heading={cardFeature.heading}
          subheading={cardFeature.subheading}
          points={cardFeature.points}
          extraContent={
            <>
              {!isEmptyHtml(pageData?.sections?.[0]?.content) && (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[0].content) }} />
              )}
            </>
          }
          imageSrc={cardFeature.imageSrc}
          imageAlt={cardFeature.imageAlt}
          isReversed={cardFeature.isReversed}
          isGreyBg={false}
          isTransparent={true}
        />
        </div>

        <Pay10CardFeatures data={pageData?.sections?.[1]} />

        {/* ── Dual Debit Card Section ── */}
        <section className={Style.dual_card_section}>
          <div className={Style.dual_card_header} data-animation="opacity-up">
            <h2>{pageData?.sections?.[2]?.title}</h2>
            <p>{pageData?.sections?.[2]?.subtitle}</p>
          </div>

          <div className={Style.dual_card_grid}>
            {/* Consumer Debit Card — grey card image */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="100">
              <div className={Style.debit_card}>
                <img
                  src={pageData?.sections?.[2]?.cards?.[0]?.icon}
                  alt={pageData?.sections?.[2]?.cards?.[0]?.title}
                  className={Style.debit_card_img}
                />
              </div>
              <div className={Style.card_info}>
                <h3>{pageData?.sections?.[2]?.cards?.[0]?.title}</h3>
                <p>{firstNonEmptyHtml(pageData?.sections?.[2]?.cards?.[0]?.subtitle, pageData?.sections?.[2]?.cards?.[0]?.description)}</p>
              </div>
            </div>

            {/* WPS Debit Card — orange card image */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="200">
              <div className={Style.debit_card}>
                <img
                  src={pageData?.sections?.[2]?.cards?.[1]?.icon}
                  alt={pageData?.sections?.[2]?.cards?.[1]?.title}
                  className={Style.debit_card_img}
                />
              </div>
              <div className={Style.card_info}>
                <h3>{pageData?.sections?.[2]?.cards?.[1]?.title}</h3>
                <p>{firstNonEmptyHtml(pageData?.sections?.[2]?.cards?.[1]?.subtitle, pageData?.sections?.[2]?.cards?.[1]?.description)}</p>
              </div>
            </div>
          </div>
        </section>

        <Pay10AppFeature data={pageData?.sections?.[3]} />

        {pageData?.sections?.[4] && <Pay10WPSFeature data={pageData.sections[4]} />}

      </div>
    </main>
  );
};

export default Pay10CardClient;
