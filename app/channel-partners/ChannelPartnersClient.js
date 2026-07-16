"use client";

import React from "react";
import { Icon } from '@iconify/react';
import styles from "./ecosystem.module.scss";
import PartnerForm from "./PartnerForm";

// CMS rich-text saves plain-text bullets/descriptions with HTML entities
// (e.g. "Scan &amp; Pay"). Tags get stripped via regex below, but entities
// only decode automatically inside dangerouslySetInnerHTML — everywhere
// else they must be decoded manually or they render literally.
const decodeEntities = (str) =>
  str
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&');

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name
// depending on how the editor filled it in — mirrors the same detection
// ConsumerHero.js already uses.
const renderIcon = (cmsIcon, className) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={28} height={28} className={className} />
    : <Icon icon={cmsIcon} width={28} className={className} />;
};

const ChannelPartnersClient = ({ pageData = null }) => {

  const getCardDetails = (c, def) => {
    if (!c) return def;
    const rawDesc = c.description || c.content || "";
    const parts = rawDesc.split('---');
    return {
      title: c.title || def.title,
      description: parts[0]?.trim() || def.description,
      tags: parts[1] || c.tags || def.tags
    };
  };

  // Section 1: Three Reasons
  const reasons = (pageData?.sections?.[0]?.cards || []).map((c) => {
    const card = getCardDetails(c, {});
    return {
      title: card.title,
      desc: decodeEntities((card.description || "").replace(/<[^>]*>?/gm, '').trim()),
      icon: c.icon,
      bullets: card.tags ? card.tags.split(',').map(t => decodeEntities(t.trim().replace(/<[^>]*>?/gm, ''))).filter(Boolean) : []
    };
  });

  // Section 2: One Integration
  const integrations = (pageData?.sections?.[1]?.cards || []).map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: decodeEntities((c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim()),
    icon: c.icon
  }));

  // Section 3: Security & Licensing
  // desc renders via dangerouslySetInnerHTML, which decodes entities exactly
  // once — the CMS sometimes double-escapes ("&amp;middot;" instead of
  // "&middot;"), so pre-decode "&amp;" here or the browser's single pass
  // leaves the literal "&middot;" text on screen instead of "·".
  const security = (pageData?.sections?.[2]?.cards || []).map((c) => ({
    title: c.title || "",
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').replace(/&amp;/g, '&').trim(),
    icon: c.icon
  }));

  // Section 4: What your merchants get
  const ecosystems = (pageData?.sections?.[3]?.cards || []).map((c, i) => {
    const card = getCardDetails(c, {});
    return {
      num: `0${i + 1}`,
      title: card.title,
      sub: c.subtitle,
      bullets: card.tags ? card.tags.split(',').map(t => decodeEntities(t.trim().replace(/<[^>]*>?/gm, ''))).filter(Boolean) : [],
      icon: c.icon
    };
  });

  // Section 5: Form section description + bullets — same "description --- tag1, tag2"
  // CMS convention as the card fields above, applied directly to the section object.
  const formSection = getCardDetails(pageData?.sections?.[4], {});
  const formDesc = decodeEntities((formSection.description || "").replace(/<[^>]*>?/gm, '').trim());
  const formBullets = formSection.tags
    ? formSection.tags.split(',').map(t => decodeEntities(t.trim().replace(/<[^>]*>?/gm, ''))).filter(Boolean)
    : [];

  return (
    <main className={styles.ecosystem}>
      <section className={styles.altareq_section}>
        <div
          className={styles.altareq_hero}
          style={{
            ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
            ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : (pageData?.banner_image ? { '--bg-mobile': `url(${pageData.banner_image})` } : {})),
            ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : {}),
          }}
        >
          <div className={styles.altareq_hero_text}>
            <h2 dangerouslySetInnerHTML={{ __html: pageData?.page_title || "" }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.page_description || "" }} />
          </div>
        </div>
      </section>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="pay10-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--orange)" />
            <stop offset="100%" stopColor="var(--yellow)" />
          </linearGradient>
        </defs>
      </svg>

      <section className={styles.reasons_section}>
        <div className={styles.reasons_header}>
          <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[0]?.title || "" }} />
        </div>
        <div className={styles.reasons_grid}>
          {reasons.map((r, i) => (
            <div key={i} className={styles.reason_card}>
              {renderIcon(r.icon, styles.reason_icon)}
              <h3>{r.title}</h3>
              <p className={styles.reason_desc}>{r.desc}</p>
              <ul>
                {r.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[1]?.title || "" }} />
          <p dangerouslySetInnerHTML={{ __html:
            (pageData?.sections?.[1]?.description || pageData?.sections?.[1]?.content || "")
              .replace(/&lt;[^&]*&gt;/g, ' ').replace(/<[^>]*>?/gm, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim()
          }} />
        </div>
        <div className={styles.benefits_grid}>
          {integrations.map((item) => (
            <div key={item.num} className={styles.benefit_card}>
              <span className={styles.benefit_num}>{item.num}</span>
              <div className={styles.benefit_icon}>{renderIcon(item.icon)}</div>
              <h3>{item.title}</h3>
              <p className={styles.benefit_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reasons_section}>
        <div className={`${styles.reasons_header} ${styles.reasons_header_narrow}`}>
          <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[2]?.title || "" }} />
        </div>
        <div className={styles.reasons_grid}>
          {security.map((r, i) => (
            <div key={i} className={styles.reason_card}>
              {renderIcon(r.icon, styles.reason_icon)}
              <h3 dangerouslySetInnerHTML={{ __html: r.title }} />
              <p className={styles.reason_desc} dangerouslySetInnerHTML={{ __html: r.desc }} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2 dangerouslySetInnerHTML={{ __html: (pageData?.sections?.[3]?.title || "").replace(/One integration\.?\s*Every/i, "One integration.<br />Every") }} />
          <p dangerouslySetInnerHTML={{ __html: pageData?.sections?.[3]?.description || pageData?.sections?.[3]?.content || "" }} />
        </div>
        <div className={styles.benefits_grid}>
          {ecosystems.map((item) => (
            <div key={item.num} className={styles.benefit_card}>
              <span className={styles.benefit_num}>{item.num}</span>
              <div className={styles.benefit_icon}>{renderIcon(item.icon)}</div>
              <h3>{item.title}</h3>
              {item.sub && <p className={styles.benefit_sub}>{item.sub}</p>}
              {item.bullets && item.bullets.length > 0 && (
                <ul className={styles.benefit_bullets}>
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.apply_section}>
        <div className={styles.apply_container}>
          <div className={styles.apply_left}>
            <span className={styles.apply_eyebrow} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.subtitle || "" }} />
            <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.title || "" }} />
            <p>{formDesc}</p>
            <ul className={styles.apply_bullets}>
              {formBullets.map((b, i) => (
                <li key={i}>
                  <Icon icon="mdi:check" className={styles.check_icon} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.apply_right}>
            <PartnerForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChannelPartnersClient;
