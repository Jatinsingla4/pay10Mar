"use client";

import React from 'react';
import { Icon } from "@iconify/react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const BillPaymentClient = ({ pageData = null }) => {
  // --- 0. Avantages ---
  const advantagesSection = pageData?.sections?.[0];
  const advantagePoints = (advantagesSection?.cards || []).map(c => c.title).filter(Boolean);

  // --- 1. Services (Électricité / Eau / Télécommunications / Transport) ---
  const servicesSection = pageData?.sections?.[1];
  const services = (servicesSection?.cards || []).map(c => ({ title: c.title, icon: c.icon }));

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
          heading={advantagesSection?.title}
          subheading={advantagesSection?.subtitle}
          points={advantagePoints}
          imageSrc={advantagesSection?.images?.[0]}
          imageAlt={advantagesSection?.title}
          isReversed={false}
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
