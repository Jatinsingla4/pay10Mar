"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./ConsumerAppFeature.module.scss";

export default function ConsumerAppFeature() {
  const features = [
    "Scan & Pay at DQR POS machines across all 7 Emirates",
    "Send money to friends via mobile number",
    "Send money abroad \u2014 remit home to family",
    "Link all your bank accounts in one view",
    "Bill payments, top-ups, card controls",
    "24/7 human consumer support"
  ];

  return (
    <section className={styles.consumerFeatureSection}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.leftContent} data-animation="fade-up">
          <h2 className={styles.heading}>Your complete financial life in one place.</h2>
          <h3 className={styles.subheading} style={{ color: '#000' }}>Consumer App</h3>
          
          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} data-animation="fade-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                <Icon icon="mdi:check" className={styles.checkIcon} style={{ color: '#ff3d00' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

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
          <Image 
            src="/images/home/consumer-qr.jpg" 
            alt="Pay10 Consumer App scanning QR Code" 
            fill 
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
