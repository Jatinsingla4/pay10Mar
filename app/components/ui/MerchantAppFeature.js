"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./MerchantAppFeature.module.scss";

export default function MerchantAppFeature() {
  const features = [
    "Pay10 Biz app linked to DQR POS device",
    "Instant same-day settlement \u2014 better cash flow",
    "Lowest MDRs in the UAE market",
    "Refunds, chargebacks, dispute management",
    "Real-time transaction monitoring & reporting",
    "24/7 human multilanguage merchant support"
  ];

  return (
    <section className={styles.merchantFeatureSection}>
      <div className={styles.container}>
        
        {/* Left Image (Desktop) */}
        <div className={styles.leftImage} data-animation="fade-up">
          <Image 
            src="/images/home/merchant-hero.jpg" 
            alt="Pay10 Merchant using app" 
            fill 
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right Content (Desktop) */}
        <div className={styles.rightContent} data-animation="fade-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className={styles.heading}>The merchant app that works as hard as you do.</h2>
          <h3 className={styles.subheading} style={{ color: '#ff3d00' }}>Merchant App</h3>
          
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

          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} data-animation="fade-up" style={{ transitionDelay: `${0.1 + (index * 0.1)}s` }}>
                <Icon icon="mdi:check" className={styles.checkIcon} style={{ color: '#ff3d00' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
