"use client";

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

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

const PaymentGatewayClient = ({ pageData = null }) => {
  const { isMobile } = useResponsive();
  const merchantQr = pageData?.sections?.[7]?.images?.[0] || "/images/prod_imports/biz-app-store-qr.png";

  const [merchantStoreUrl, setMerchantStoreUrl] = useState(MERCHANT_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setMerchantStoreUrl(MERCHANT_APPLE_URL);
  }, []);
  // Section 2: Journey Cards
  const defaultJourneyCards = [
    {
      title: 'Pay with Pay10',
      badge: 'APM &middot; Dynamic QR',
      desc: 'Customer scans a Dynamic QR code to pay: directly from their Pay10 UAE.',
      icon: 'mdi:bullseye-arrow',
      steps: [
        'Clicks "Pay with Pay10": a Dynamic QR code is instantly generated on screen.',
        'Opens Pay10 UAE, scans the Dynamic QR code with their phone.',
        'Confirms payment: amount and merchant name shown in app before confirming.',
        'Payment confirmed: order confirmed on your checkout. Instant. Done.'
      ],
      footer: 'Customer doesn\'t have Pay10 UAE? They\'re directed to download it, turning your checkout into a Pay10 acquisition moment.',
      img: '/images/prod_imports/pg-pay-qr.png'
    },
    {
      title: 'Pay by Bank',
      badge: 'TPP &middot; Open Finance &middot; Al Tareq',
      desc: 'Customer pays directly from their bank account: no card, no wallet, just their bank.',
      icon: 'mdi:bank-circle',
      steps: [
        'Clicks "Pay by Bank": redirected to securely connect to their bank.',
        'Authorizes payment within their bank\'s secure environment.',
        'Returns to checkout.',
        'Payment confirmed: order confirmed on your checkout. Instant. Done.'
      ],
      footer: 'Powered by Al Tareq: the UAE\'s regulated Open Finance infrastructure. Secure, consent-driven, CBUAE compliant. <strong>The approved sentence: Connect your Account via AL TAREQ and start transacting.</strong>',
      img: '/images/prod_imports/pg-pay-desktop.png'
    }
  ];

  const journeyCards = pageData?.sections?.[1]?.cards?.length === 2 ? [
    {
      title: pageData.sections[1].cards[0].title,
      badge: pageData.sections[1].cards[0].subtitle,
      desc: (pageData.sections[1].cards[0].description || pageData.sections[1].cards[0].content || "").split('---')[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "",
      icon: pageData.sections[1].cards[0].icon,
      steps: ((pageData.sections[1].cards[0].description || pageData.sections[1].cards[0].content || "").split('---')[1] || pageData.sections[1].cards[0].tags || "").split(',').map(s => s.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean),
      footer: firstNonEmptyHtml((pageData.sections[1].cards[0].description || pageData.sections[1].cards[0].content || "").split('---')[2]?.trim(), pageData.sections[1].cards[0].content, ""),
      img: pageData.sections[1].cards[0].images?.[0] || pageData.sections[1].images?.[0] || '/images/prod_imports/pg-pay-qr.png',
      mobileImg: pageData.sections[1].cards[0].images?.[1] || pageData.sections[1].images?.[2] || pageData.sections[1].images?.[0] || '/images/prod_imports/pg-pay-qr.png'
    },
    {
      title: pageData.sections[1].cards[1].title,
      badge: pageData.sections[1].cards[1].subtitle,
      desc: (pageData.sections[1].cards[1].description || pageData.sections[1].cards[1].content || "").split('---')[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "",
      icon: pageData.sections[1].cards[1].icon,
      steps: ((pageData.sections[1].cards[1].description || pageData.sections[1].cards[1].content || "").split('---')[1] || pageData.sections[1].cards[1].tags || "").split(',').map(s => s.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean),
      footer: firstNonEmptyHtml((pageData.sections[1].cards[1].description || pageData.sections[1].cards[1].content || "").split('---')[2]?.trim(), pageData.sections[1].cards[1].content, ""),
      img: pageData.sections[1].cards[1].images?.[0] || pageData.sections[1].images?.[1] || '/images/prod_imports/pg-pay-desktop.png',
      mobileImg: pageData.sections[1].cards[1].images?.[1] || pageData.sections[1].images?.[3] || pageData.sections[1].images?.[1] || '/images/prod_imports/pg-pay-desktop.png'
    }
  ] : defaultJourneyCards;

  // Sections 4 & 5: Journey Lists
  const dqrSteps = pageData?.sections?.[3]?.cards?.map(c => ({
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    tag: c.subtitle || null
  })) || [
      { title: 'Button appears at checkout', desc: '"Pay with Pay10" button sits alongside your existing payment options: card, COD, or other APMs.', tag: null },
      { title: 'Dynamic QR generated', desc: 'Unique QR code created for this transaction: amount pre-filled, merchant name shown. No manual entry.', tag: 'Instant generation' },
      { title: 'Customer scans with Pay10 UAE', desc: 'Opens Pay10 UAE, scans QR: payment details shown for confirmation. One tap to pay.', tag: 'Under 10 seconds' },
      { title: 'Order confirmed: settlement today', desc: 'Payment posted to your merchant portal instantly. Settlement to your account the same day.', tag: 'T+0 settlement' }
    ];

  const tppSteps = pageData?.sections?.[4]?.cards?.map(c => ({
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    tag: c.subtitle || null
  })) || [
      { title: 'Button appears at checkout', desc: '"Pay by Bank" button sits at the checkout: clear, trusted, no card details needed.', tag: null },
      { title: 'Directed to Al Tareq', desc: 'Customers land on Al Tareq\'s Open Finance screen, selects their UAE bank from the list.', tag: 'Secure redirect' },
      { title: 'Bank authentication', desc: 'Customers redirected to their bank, approves the payment using their existing banking credentials.', tag: 'Bank-level security' },
      { title: 'Order confirmed: settlement today', desc: 'Payment confirmed, customer returned to your checkout. Settlement to your account the same day.', tag: 'T+0 settlement' }
    ];

  // Section 6: Benefits
  const benefitIcons = [
    "mdi:percent-outline",
    "mdi:clock-fast",
    "mdi:eye-outline",
    "mdi:shield-check-outline",
    "mdi:headset"
  ];

  const benefitsCards = pageData?.sections?.[5]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    icon: c.icon,
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim()
  })) || [
      { num: '01', icon: benefitIcons[0], title: 'Lowest MDR', desc: 'The lowest transaction fees on the UAE market. Keep more of every sale.' },
      { num: '02', icon: benefitIcons[1], title: 'Same-day settlement', desc: 'T+0. Your working capital is available the day you earn it. Always.' },
      { num: '03', icon: benefitIcons[2], title: 'No hidden fees', desc: 'Complete visibility. Zero surprises. What you see is exactly what you pay.' },
      { num: '04', icon: benefitIcons[3], title: 'CBUAE Licensed', desc: 'Four Central Bank licences. A fully regulated financial partner.' },
      { num: '05', icon: benefitIcons[4], title: '24/7 Human support', desc: 'Call. A human picks up. Multi-language. Zero wait. Every time.' }
    ];

  return (
    <main>
      <section className={Style.altareq_section}>
        <div
          className={Style.altareq_hero}
          style={bannerBgStyle(pageData)}
        >
          <div className={Style.altareq_hero_text}>
            {!isEmptyHtml(pageData?.page_title) && (
              <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
            )}
            {!isEmptyHtml(pageData?.page_subtitle) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_subtitle) }} />
            )}
          </div>
        </div>
      </section>

      <section className={Style.centered_text_section}>
        <div className={Style.centered_container}>
          {!isEmptyHtml(pageData?.sections?.[0]?.title) && (
            <h2 className={Style.centered_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[0].title) }} />
          )}
          {!isEmptyHtml(pageData?.sections?.[0]?.subtitle) && (
            <p className={Style.centered_paragraph} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[0].subtitle) }} />
          )}
        </div>
      </section>

      <section className={Style.journey_cards_section}>
        <div className={Style.journey_cards_wrapper}>
          {journeyCards.map((card, idx) => (
            <div key={idx} className={`${Style.journey_card} ${idx === 0 ? Style.card_white : Style.card_tinted}`}>
              <div className={Style.journey_card_img}>
                <picture>
                  <source media="(max-width: 767px)" srcSet={card.mobileImg || card.img} />
                  <img src={card.img} alt={card.title} />
                </picture>
              </div>
              <div className={Style.card_header}>
                <h3>{card.title}</h3>
                <span className={Style.card_badge} dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.badge) }} />
              </div>
              <p className={Style.card_desc}>{card.desc}</p>

              <div className={Style.card_list_section}>
                <h4 className={Style.list_heading}>
                  {renderIcon(card.icon, Style.list_icon, 20)} Customer Checkout Journey
                </h4>
                <ul className={Style.journey_card_list}>
                  {card.steps.map((step, sIdx) => (
                    <li key={sIdx}>
                      <span className={Style.step_num}>{sIdx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={Style.card_footer} dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.footer) }} />
            </div>
          ))}
        </div>
      </section>

      <section className={Style.centered_text_section}>
        <div className={Style.centered_container}>
          {!isEmptyHtml(pageData?.sections?.[2]?.title) && (
            <h2 className={Style.centered_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[2].title) }} />
          )}
          {!isEmptyHtml(pageData?.sections?.[2]?.subtitle) && (
            <p className={Style.centered_paragraph} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[2].subtitle) }} />
          )}
        </div>
      </section>

      <section className={Style.journey_list_section}>
        <div className={Style.journey_list_wrapper}>
          {/* DQR Journey */}
          <div className={Style.journey_column}>
            <h3 className={Style.journey_col_heading}>{pageData?.sections?.[3]?.title}</h3>
            <div className={Style.journey_steps}>
              {dqrSteps.map((step, idx) => (
                <div key={idx} className={Style.step_item}>
                  <div className={Style.step_number}>{idx + 1}</div>
                  <div className={Style.step_content}>
                    <div className={Style.step_title}>{step.title}</div>
                    <div className={Style.step_desc}>{step.desc}</div>
                    {step.tag && <span className={Style.step_tag}>{step.tag}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TPP Journey */}
          <div className={Style.journey_column}>
            <h3 className={Style.journey_col_heading}>{pageData?.sections?.[4]?.title}</h3>
            <div className={Style.journey_steps}>
              {tppSteps.map((step, idx) => (
                <div key={idx} className={Style.step_item}>
                  <div className={Style.step_number}>{idx + 1}</div>
                  <div className={Style.step_content}>
                    <div className={Style.step_title}>{step.title}</div>
                    <div className={Style.step_desc}>{step.desc}</div>
                    {step.tag && <span className={Style.step_tag}>{step.tag}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={Style.benefits_section}>
        <div className={Style.centered_container}>
          <h2 className={Style.centered_heading}>{pageData?.sections?.[5]?.title}</h2>
          <p className={Style.centered_paragraph}>{pageData?.sections?.[5]?.subtitle}</p>
        </div>

        <div className={Style.benefits_grid_wrapper}>
          <div className={Style.benefits_grid}>
            {benefitsCards.map((b, i) => (
              <div key={i} className={Style.benefit_col}>
                <div className={Style.benefit_icon_wrapper}>
                  {renderIcon(b.icon, Style.benefit_icon, 24)}
                </div>
                <h4 className={Style.benefit_title}>{b.title}</h4>
                <p className={Style.benefit_desc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={Style.final_combo}>
        <div className={Style.combo_card}>
          <span className={Style.combo_ring} aria-hidden="true" />
          <span className={Style.combo_ring_small} aria-hidden="true" />

          <div className={Style.combo_cta}>
            {!isEmptyHtml(pageData?.sections?.[6]?.subtitle) && (
              <h2 className={Style.combo_heading_pg} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[6].subtitle) }} />
            )}
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
        </div>
      </section>
    </main>
  );
};

export default PaymentGatewayClient;
