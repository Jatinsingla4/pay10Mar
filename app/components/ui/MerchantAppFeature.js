"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./MerchantAppFeature.module.scss";

export default function MerchantAppFeature({
  title = "",
  subtitle = "",
  cardsData = [],
  image = "",
  content = ""
}) {
  // If no data is provided from CMS, don't render
  if (!title && !subtitle && (!cardsData || cardsData.length === 0) && !content) {
    return null;
  }

  // Map CMS cards to feature strings
  const features = cardsData.map(card => card.title).filter(Boolean);

  return (
    <section className={styles.merchantFeatureSection}>
      <div className={styles.container}>
        
        {/* Left Image (Desktop) */}
        <div className={styles.leftImage} data-animation="fade-up">
          {image && (
            <Image 
              src={image}
              alt="Pay10 Merchant using app"
              fill 
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Right Content (Desktop) */}
        <div className={styles.rightContent} data-animation="fade-up" style={{ transitionDelay: '0.1s' }}>
          {title && <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: title }}></h2>}
          {subtitle && <h3 className={styles.subheading} style={{ color: 'var(--black)' }}>{subtitle}</h3>}
          
          {content ? (
            <div className={styles.cms_content} dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} data-animation="fade-up" style={{ transitionDelay: `${0.1 + (index * 0.1)}s` }}>
                  <Icon icon="mdi:check" className={styles.checkIcon} style={{ color: 'var(--red)' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.storeBadges}>
            <a href="#" className={styles.badge} aria-label="Download on the App Store">
              <span className={styles.iconWrapper}>
                <Icon icon="ic:baseline-apple" />
              </span>
              <div className={styles.badgeText}>
                <span className={styles.smallText}>Download on the</span>
                <span className={styles.largeText}>App Store</span>
              </div>
            </a>
            
            <a href="#" className={styles.badge} aria-label="Get it on Google Play">
              <span className={styles.iconWrapper}>
                <Icon icon="logos:google-play-icon" />
              </span>
              <div className={styles.badgeText}>
                <span className={styles.smallText}>GET IT ON</span>
                <span className={styles.largeText}>Google Play</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
