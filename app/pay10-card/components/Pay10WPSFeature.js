"use client";

import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Pay10AppFeature.module.scss";

export default function Pay10WPSFeature() {
  const features = [
    "Send & Receive funds through your Pay10 Universal Account in UAE",
    "Send money internationally, at the best rates",
    "Make contactless payments quickly and safely",
    "Accepted at retail stores, restaurants & many more across the UAE",
    "Your money is safe and secure"
  ];

  return (
    <section className={styles.merchantFeatureSection}>
      <div className={styles.container}>

        {/* Text Content (Left Side) */}
        <div className={styles.rightContent} data-animation="opacity-up">
          <h2 className={styles.heading}>Pay10 Card - WPS</h2>

          <p className={styles.description}>
            This card is issued to you by your employer and the physical copy is delivered to you for WPS Employees.
          </p>
          <p className={styles.description}>
            This card is a safe, simple, and convenient way to access your funds seamlessly.
          </p>
          <p className={styles.description}>
            With your Pay10 Jaywan card, you can withdraw your funds from Pay10 Universal Account using any ATM across the UAE. Make payments for your purchases at POS terminals through the Jaywan network across the UAE, giving you wide and easy access wherever you go. The card is accepted at more than 100,000 retail outlets nationwide. The card also has contactless payment technology, which allows you to simply tap your card for fast and easy transactions.
          </p>

          <h3 className={styles.subheading}>Benefits with Pay10</h3>

          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} data-animation="opacity-up" data-anim-delay={`${100 + index * 100}`}>
                <Icon icon="mdi:check" className={styles.checkIcon} />
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

        {/* Image (Right Side) */}
        <div className={styles.leftImage} data-animation="opacity-up" data-anim-delay="100">
          <img src="/images/prod_imports/prepaid-card-bubble.png" alt="Pay10 WPS Card" />
        </div>

      </div>
    </section>
  );
}
