"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./ConsumerAppFeature.module.scss";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

export default function ConsumerAppFeature({
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
    <section className={styles.consumerFeatureSection}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.leftContent} data-animation="fade-up">
          {title && <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></h2>}
          {subtitle && <h3 className={styles.subheading} style={{ color: 'var(--black)' }}>{subtitle}</h3>}

          {content ? (
            <div className={styles.cms_content} dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
          ) : (
            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} data-animation="fade-up" style={{ transitionDelay: `${index * 0.1}s` }}>
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

        {/* Right Image */}
        <div className={styles.rightImage} data-animation="fade-up" style={{ transitionDelay: '0.2s' }}>
          {image && (
            <Image 
              src={image}
              alt="Pay10 Consumer App"
              fill 
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
