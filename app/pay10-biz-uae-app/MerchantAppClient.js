"use client";

import { useState, useEffect } from "react";
import Style from "./page.module.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MerchantTestimonialVideos from "../components/ui/MerchantTestimonialVideos";
import MerchantLogosCTA from "../components/ui/MerchantLogosCTA";
import BizLeadForm from "./BizLeadForm";
import { isEmptyHtml, sanitizeHtml } from "../lib/sanitizeHtml";
import { useResponsive } from "../contexts/ResponsiveContext";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const MERCHANT_APPLE_URL = "https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134";
const MERCHANT_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.pay10.merchant.app";

const MerchantAppClient = ({ pageData = null, testimonialVideos = [], merchantLogos = [] }) => {
  const { isMobile } = useResponsive();
  const merchantQr = pageData?.sections?.[6]?.images?.[0] || "/images/prod_imports/biz-app-store-qr.png";

  const [merchantStoreUrl, setMerchantStoreUrl] = useState(MERCHANT_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setMerchantStoreUrl(MERCHANT_APPLE_URL);
  }, []);
  const scaleCards = pageData?.sections?.[0]?.cards?.map((c, i) => {
    const cleanDesc = (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim();
    return {
      num: `0${i + 1}`,
      title: c.title,
      sub: c.subtitle || null,
      desc: cleanDesc,
    };
  }) || [
    {
      num: '01',
      title: 'Micro Merchant',
      sub: 'Starting out or going solo',
      desc: 'Single location, lower transaction volumes. Pay10 gives micro merchants the same tools and rates that only big players used to get.',
    },
    {
      num: '02',
      title: 'Growing businesses',
      sub: null,
      desc: 'Multi-cashier, real-time reporting, instant settlement. Everything an SME needs to manage payments and cash flow without a finance team.',
    },
    {
      num: '03',
      title: 'Multi-location. Complex operations.',
      sub: null,
      desc: 'Fleet management, hierarchy controls, analytics at scale. Pay10 handles enterprise payment infrastructure across locations, teams, and transaction volumes.',
    },
  ];

  const benefitIcons = [
    <svg key={0} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    <svg key={1} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    <svg key={2} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l7 4v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
    <svg key={3} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
  ];

  const renderIcon = (cmsIcon, fallback) => {
    if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return fallback;
    return /^(https?:)?\//.test(cmsIcon)
      ? <img src={cmsIcon} alt="" width={28} height={28} />
      : <Icon icon={cmsIcon} width={28} />;
  };

  const benefitsCards = pageData?.sections?.[1]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    icon: renderIcon(c.icon, benefitIcons[i % benefitIcons.length]),
    title: c.title,
    sub: c.subtitle,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    {
      num: '01',
      icon: benefitIcons[0],
      title: 'Lowest MDR in the UAE market',
      sub: 'Keep more of every dirham you earn.',
      desc: 'Pay10 offers the lowest Merchant Discount Rate in the UAE market, so your transaction fees stop eating into your margins. Every sale, every day, you keep more.',
    },
    {
      num: '02',
      icon: benefitIcons[1],
      title: 'Same-day instant settlement',
      sub: 'Your money on the day you earn it, not days later.',
      desc: 'Pay10 is the first to offer instant same-day settlement to all merchants, micro to enterprise. Your working capital is available the same day. No T+1. No T+2. Never.',
    },
    {
      num: '03',
      icon: benefitIcons[2],
      title: 'Complete security, no hidden fees',
      sub: 'What you see is what you pay. Always.',
      desc: 'Full transaction visibility, zero hidden charges, and PCI DSS Level 1 certified security across every payment. You know exactly what\'s happening with your money at all times.',
    },
    {
      num: '04',
      icon: benefitIcons[3],
      title: 'Licensed by the Central Bank of the UAE',
      sub: 'Your business deserves a regulated partner.',
      desc: 'Pay10 holds four CBUAE licences: SVF, RPS-II, Open Finance, and Category 4 Remittance. You\'re not just using a business payments app. You\'re working with a fully regulated financial institution.',
    },
  ];

  const commandCards = pageData?.sections?.[3]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '01', title: 'Transaction data live', desc: 'See every transaction in real time, every amount, every method, every status, cashier. Full history, always accessible.' },
    { num: '02', title: 'Balance visibility', desc: 'See your settled and unsettled balance at a glance. Know your cash flow position before you need it.' },
    { num: '03', title: 'Refunds', desc: 'Process refunds directly from the app. Fast, clean, no paperwork, no calls to the bank.' },
    { num: '04', title: 'Link / unlink DQR devices', desc: 'Connect or disconnect your DQR POS machine directly from the app. Full device control in your hands.' },
  ];

  const stepsCards = pageData?.sections?.[4]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '01', title: 'Contact our team', desc: 'SME or Enterprise, email the right team and we respond fast.' },
    { num: '02', title: 'Business registration', desc: 'Our team onboards your business onto the Pay10 platform.' },
    { num: '03', title: 'Receive credentials', desc: 'Your Pay10 Biz UAE login credentials are sent to you.' },
    { num: '04', title: 'DQR device delivered', desc: 'Your DQR POS machine is delivered and installed at your premises by our team.' },
    { num: '05', title: 'Start accepting', desc: 'Login, link your device, and start accepting payments instantly.' },
  ];

  return (
    <main>
      <section
        className={Style.biz_hero}
        style={{
          '--bg-desktop': pageData?.banner_image ? `url(${pageData.banner_image})` : 'none',
          '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : undefined,
        }}
      >
        <div className={Style.biz_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.page_title) }} />
          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description)) }} />
        </div>
      </section>

      <section className={Style.merchant_scale}>
        <div className={Style.merchant_scale_header}>
          <h2 className={!pageData?.sections?.[0]?.subtitle ? Style.full_width : undefined}>{pageData?.sections?.[0]?.title}</h2>
          {pageData?.sections?.[0]?.subtitle && <p>{pageData.sections[0].subtitle}</p>}
        </div>
        <div className={Style.merchant_scale_cards}>
          {scaleCards.map((card) => (
            <div key={card.num} className={Style.merchant_scale_card}>
              <span className={Style.card_num}>{card.num}</span>
              <h3>{card.title}</h3>
              {card.sub && <p className={Style.card_sub}>{card.sub}</p>}
              <p className={Style.card_desc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>{pageData?.sections?.[1]?.title}</h2>
          <p>{pageData?.sections?.[1]?.subtitle}</p>
        </div>
        <div className={Style.benefits_grid}>
          {benefitsCards.map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={Style.benefit_sub}>{item.sub}</p>
              <p className={Style.benefit_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={Style.biz_support}>
        <div className={Style.support_left}>
          <h2>{pageData?.sections?.[2]?.title}</h2>
          {pageData?.sections?.[2]?.subtitle && <p className={Style.support_sub}>{pageData.sections[2].subtitle}</p>}
          <div className={Style.support_desc}>
            {!isEmptyHtml(pageData?.sections?.[2]?.content) && (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[2].content) }} />
            )}
          </div>
        </div>
        <div className={Style.support_visual}>
          <div className={Style.circle_outer}>
            <img src={pageData?.sections?.[2]?.images?.[1] || "/images/support-avatar-1.jpg"} alt="support agent" className={Style.floating_avatar_1} />
            <div className={Style.circle_mid}>
              <img src={pageData?.sections?.[2]?.images?.[2] || "/images/support-avatar-2.jpg"} alt="support agent" className={Style.floating_avatar_2} />
              <img src={pageData?.sections?.[2]?.images?.[3] || "/images/support-avatar-3.jpg"} alt="support agent" className={Style.floating_avatar_3} />
              <div className={Style.circle_inner}>
                <Image src={pageData?.sections?.[2]?.images?.[0] || "/images/prod_imports/customer-executive.jpg"} alt="Pay10 support" width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.biz_command}>
        <h2 className={Style.command_heading}>{pageData?.sections?.[3]?.title}</h2>
        <div className={Style.command_body}>
          <div className={Style.command_phones}>
            <Image src={pageData?.sections?.[3]?.images?.[0] || "/images/prod_imports/biz-home-screen.png"} alt="Pay10 Biz App Home" width={280} height={560} className={Style.phone_img_back} />
            <Image src={pageData?.sections?.[3]?.images?.[1] || "/images/prod_imports/biz-transaction-history.png"} alt="Pay10 Biz App Transactions" width={280} height={560} className={Style.phone_img_front} />
          </div>
          <div className={Style.command_right}>
            <p className={Style.command_desc}>{pageData?.sections?.[3]?.subtitle}</p>
            <div className={Style.command_features}>
              {commandCards.map((f) => (
                <div key={f.num} className={Style.command_feature}>
                  <p className={Style.feature_title}>{f.title}</p>
                  <p className={Style.feature_desc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={Style.biz_steps}>
        <div className={Style.steps_header}>
          <h2 className={Style.steps_heading}>{pageData?.sections?.[4]?.title}</h2>
          <p className={Style.steps_sub}>{pageData?.sections?.[4]?.subtitle}</p>
        </div>
        <div className={Style.steps_row}>
          {stepsCards.map((step) => (
            <div key={step.num} className={Style.step_item}>
              <div className={Style.step_num_wrap}>
                <span className={Style.step_num}>{step.num}</span>
              </div>
              <h3 className={Style.step_title}>{step.title}</h3>
              <p className={Style.step_desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <MerchantTestimonialVideos
        title="Don't Take Our Word For It. Hear It From The Merchants Themselves."
        content="<p>From small retailers to enterprise brands, businesses across the UAE are choosing Pay10 for faster settlements, lower costs, and support that actually shows up.</p>"
        videos={testimonialVideos}
      />
      <MerchantLogosCTA showCta={false} images={merchantLogos} />

      <section className={Style.biz_final_cta}>
        <h2 className={Style.cta_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData?.sections?.[5]?.title) }} />
        {(() => {
          // An empty CMS subtitle means "intentionally removed" — don't fall
          // back to the hardcoded default in that case, only when the field
          // is missing entirely (e.g. pageData hasn't loaded).
          const ctaSubtitle = pageData?.sections?.[5]?.subtitle ?? "Lowest MDRs. Same-day settlement. 24/7 human support. CBUAE licensed. Everything your business deserves, and nothing you don't need.";
          return ctaSubtitle && <p className={Style.cta_sub}>{ctaSubtitle}</p>;
        })()}
        <BizLeadForm />
      </section>

      <section className={Style.biz_app_download}>
        <h2 className={Style.app_download_heading}>Merchant App</h2>
        {isMobile ? (
          <a href={merchantStoreUrl} target="_blank" rel="noopener noreferrer" className={Style.single_download_btn}>
            <Icon icon="mdi:download" width={20} />
            <span>Download Now</span>
          </a>
        ) : (
          <Image src={merchantQr} alt="Scan to download the Pay10 Merchant App" className={Style.qr_image} width={140} height={140} />
        )}
      </section>
    </main>
  );
};

export default MerchantAppClient;
