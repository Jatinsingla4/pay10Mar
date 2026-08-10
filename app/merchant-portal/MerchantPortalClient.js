"use client";

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import Style from "./page.module.scss";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";
import { useResponsive } from "@/app/contexts/ResponsiveContext";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const MERCHANT_APPLE_URL = "https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134";
const MERCHANT_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.pay10.merchant.app";

const MerchantPortalClient = ({ pageData = null }) => {
  const { isMobile } = useResponsive();
  const merchantQr = pageData?.sections?.[6]?.images?.[0] || "/images/prod_imports/biz-app-store-qr.png";

  const [merchantStoreUrl, setMerchantStoreUrl] = useState(MERCHANT_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setMerchantStoreUrl(MERCHANT_APPLE_URL);
  }, []);

  // Section 1: API connections
  const apiBenefits = pageData?.sections?.[0]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    icon: c.icon,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '01', title: 'REST API integration', desc: 'Clean, documented REST API endpoints connecting your Pay10 portal to your ERP, accounting, or finance platform in real time.' },
    { num: '02', title: 'Automated reconciliation', desc: 'Transaction data, settlement records, and VAT figures flow automatically eliminating manual data entry and reconciliation errors.' },
    { num: '03', title: 'Webhooks & real-time events', desc: 'Real-time event notifications payment received, refund processed, settlement confirmed pushed directly to your system the moment they happen.' },
    { num: '04', title: 'Custom integrations for enterprise', desc: 'Pay10\'s team has the expertise and capability to build custom integrations tailored to your enterprise ERP SAP, Oracle, Microsoft Dynamics, and more.' },
  ];

  // Section 3: Enterprise Options
  const enterpriseCards = pageData?.sections?.[2]?.cards?.map((c, i) => ({
    num: `${i + 1}`,
    icon: c.icon,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '1', title: 'Custom ERP integration', desc: 'SAP, Oracle, Microsoft Dynamics, custom-built systems. Pay10\'s team builds the integration around your stack, not the other way around.' },
    { num: '2', title: 'Multi-location hierarchy', desc: 'Set up merchant hierarchies for head office, regional manager, and branch with role-based access and consolidated reporting at every level.' },
    { num: '3', title: 'User & cashier management', desc: 'Create, manage, and monitor users and cashiers across locations. Set permissions, view individual performance, and maintain full operational control.' },
    { num: '4', title: 'VAT & compliance reporting', desc: 'Automated VAT reports aligned with UAE FTA requirements, export-ready for your finance team or directly into your accounting system.' },
    { num: '5', title: 'Advanced analytics', desc: 'Transaction trends, peak hours, payment method mix, location performance. Data that helps you make better decisions, not just count transactions.' },
    { num: '6', title: 'Dedicated onboarding team', desc: 'A dedicated Pay10 enterprise team manages your onboarding end-to-end, from integration scoping to go-live. You have a named contact, always.' },
  ];

  // Section 4: Portal Features
  const portalCards = pageData?.sections?.[3]?.cards?.map((c, i) => {
    const cleanDesc = (c.description || c.content || "").replace(/<[^>]*>?/gm, '');
    const parts = cleanDesc.split('---');
    return {
      num: `${i + 1}`,
      icon: c.icon,
      title: c.title,
      sub: c.subtitle,
      desc: parts[0].trim(),
      bullets: (parts[1] || '').split(',').map(s => s.trim()).filter(Boolean),
    };
  }) || [
    { num: '1', title: 'Transaction history', sub: 'Every payment. Every detail. Searchable.', desc: 'Full transaction history with filter, search, and export by date, amount, method, cashier, or location.', bullets: ['Filter by date range / payment method / status', 'Export as PDF or CSV for reconciliation', 'Drill into individual transaction details'] },
    { num: '2', title: 'Settlements', sub: 'Same-day. Always visible. Never a surprise.', desc: 'Real-time settlement status. See what\'s settled, what\'s pending, and when your next payout hits your account.', bullets: ['T+0 same-day settlement tracking', 'Settled vs unsettled balance at a glance', 'Settlement history with downloadable record'] },
    { num: '3', title: 'VAT reporting', sub: 'UAE FTA-aligned. Export-ready. Always.', desc: 'Automated VAT summaries and detailed transaction reports aligned with UAE Federal Tax Authority requirements.', bullets: ['VAT-inclusive transaction breakdown', 'Export for FTA filing in one click', 'Monthly and quarterly report formats'] },
    { num: '4', title: 'Refunds & disputes', sub: 'Handle refunds without calling anyone.', desc: 'Process refunds, track dispute status, and manage chargebacks, all directly from the portal without needing support.', bullets: ['Initiate refunds in seconds', 'Full refund history and status tracking', 'Dispute management with audit trail'] }
  ];

  // Section 5: Reasons
  const reasonsCards = pageData?.sections?.[4]?.cards?.map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { num: '1', title: 'Lowest MDR', desc: 'The lowest transaction fees on the UAE market. Keep more of every sale.' },
    { num: '2', title: 'Same-day settlement', desc: 'T+0. Your working capital available the day you earn it.' },
    { num: '3', title: 'No hidden fees', desc: 'Complete visibility. What you see is exactly what you pay.' },
    { num: '4', title: 'CBUAE Licensed', desc: 'Four Central Bank of UAE licences. A fully regulated financial partner.' },
    { num: '5', title: '24/7 Human support', desc: 'Call. A human picks up. Multi-language. Zero wait. Every time.' }
  ];

  return (
    <main>
      <section className={Style.altareq_section}>
        <div
          className={Style.altareq_hero}
          style={bannerBgStyle(pageData, { mobileFallback: '/images/prod_imports/merchant-portal-hero-mobile.png' })}
        >
          <div className={Style.altareq_hero_text}>
            {!isEmptyHtml(pageData?.page_title) && (
              <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
            )}
            {!isEmptyHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData.page_subtitle, pageData.page_description)) }} />
            )}
          </div>
        </div>
      </section>
      
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>{pageData?.sections?.[0]?.title}</h2>
          <p>{pageData?.sections?.[0]?.subtitle}</p>
        </div>
        <div className={Style.benefits_grid}>
          {apiBenefits.map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{renderIcon(item.icon, undefined, 28)}</div>
              <h3>{item.title}</h3>
              <p className={Style.benefit_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={Style.api_integration}>
        <div className={Style.api_content}>
          <div className={Style.api_left}>
            <h2>{pageData?.sections?.[1]?.title}</h2>
            <p>{pageData?.sections?.[1]?.subtitle}</p>
          </div>
        </div>
      </section>

      <section className={Style.enterprise_section}>
        <div className={Style.enterprise_header}>
          <h2>{pageData?.sections?.[2]?.title}</h2>
          <p>{pageData?.sections?.[2]?.subtitle}</p>
        </div>
        
        <div className={Style.enterprise_cards_wrapper}>
          <div className={Style.enterprise_cards}>
            {enterpriseCards.map((item) => (
              <div key={item.num} className={Style.enterprise_card}>
                <span className={Style.card_num}>{item.num}</span>
                <div className={Style.card_icon}>{renderIcon(item.icon, undefined, 24)}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>{pageData?.sections?.[3]?.title}</h2>
          <p>{pageData?.sections?.[3]?.subtitle}</p>
        </div>
        <div className={Style.benefits_grid}>
          {portalCards.map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{renderIcon(item.icon, undefined, 28)}</div>
              <h3>{item.title}</h3>
              {item.sub && <p className={Style.benefit_sub}>{item.sub}</p>}
              <p className={Style.benefit_desc}>{item.desc}</p>
              {item.bullets && item.bullets.length > 0 && (
                <ul className={Style.benefit_bullets}>
                  {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={Style.reasons_section}>
        <div className={Style.reasons_header}>
          <h2>{pageData?.sections?.[4]?.title}</h2>
          <p>{pageData?.sections?.[4]?.subtitle}</p>
        </div>
        <div className={Style.reasons_list}>
          {reasonsCards.map((item, index) => (
            <div key={index} className={Style.reason_row}>
              <div className={Style.reason_icon_wrap}>
                {renderIcon(item.icon, Style.reason_icon, 22)}
              </div>
              <div className={Style.reason_left}>
                <span className={Style.reason_num}>{item.num}</span>
                <span className={Style.reason_title}>{item.title}</span>
              </div>
              <div className={Style.reason_mid}>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={Style.final_combo}>
        <span className={Style.combo_ring} aria-hidden="true" />
        <span className={Style.combo_ring_small} aria-hidden="true" />

        <div className={Style.combo_cta}>
          <h2 className={Style.combo_heading_pg} dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.sections?.[5]?.subtitle, pageData?.sections?.[5]?.title)) }} />
          <Link href="/contact-us?type=Enterprise+Sales" className={Style.combo_btn}>Enterprise Sales</Link>
        </div>

        <div className={Style.combo_divider} aria-hidden="true" />

        <div className={Style.combo_download}>
          <h2 className={Style.combo_heading}>Merchant App</h2>
          {isMobile ? (
            <a href={merchantStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.combo_btn}>
              <Icon icon="mdi:download" width={18} />
              <span>Download Now</span>
            </a>
          ) : (
            <Image src={merchantQr} alt="Scan to download the Pay10 Merchant App" className={Style.qr_image} width={140} height={140} />
          )}
        </div>
      </section>
    </main>
  );
};

export default MerchantPortalClient;
