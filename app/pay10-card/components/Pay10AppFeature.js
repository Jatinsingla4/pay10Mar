"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./Pay10AppFeature.module.scss";

export default function Pay10AppFeature({ data = null }) {
  const defaultFeatures = [
    "Designed for Everyday Convenience",
    "Simple to use for everyday transactions",
    "Ease of card management through Pay10 UAE",
    "Manage your card limits",
    "Withdraw cash from ATM’s across the UAE",
    "Make payments at 100,000+ merchant POS terminals in the UAE"
  ];

  const features = data?.cards?.map(c => c.title) || defaultFeatures;

  return (
    <section className={styles.merchantFeatureSection}>
      <div className={styles.container}>
        
        {/* Left Image */}
        <div className={styles.leftImage} data-animation="fade-up">
          <img src={data?.images?.[0] || "/images/prod_imports/pay10-card-bubble.png"} alt="Pay10 Jaywan Prepaid Card" />
        </div>

        {/* Right Content (Desktop) */}
        <div className={styles.rightContent} data-animation="fade-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className={styles.heading}>{data?.title || "Welcome to Pay10, your Pay10 Jaywan Prepaid Card is here."}</h2>
          <h3 className={styles.subheading}>{data?.subtitle || "Let us unlock a world of possibilities."}</h3>
          
          <p className={styles.description}>
            {data?.content ? (
               <span dangerouslySetInnerHTML={{ __html: data.content }} />
            ) : (
              <><strong>How to Request your card:</strong> You request your card digitally thru the Pay10 UAE, and the physical card upon approval is delivered to you.</>
            )}
          </p>

          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} data-animation="fade-up" style={{ transitionDelay: `${0.1 + (index * 0.1)}s` }}>
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

      </div>
    </section>
  );
}
