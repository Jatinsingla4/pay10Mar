"use client";

import React from "react";
import Image from "next/image";
import styles from "./SuperAppSection.module.scss";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

export default function SuperAppSection({
  title = "",
  cardsData = [],
  bgImage,
  mobileImage
}) {
  const consumerCard = cardsData?.[0];
  const merchantCard = cardsData?.[1];

  // If no cards are provided from CMS, don't render the section
  if (!consumerCard && !merchantCard && !title) {
    return null;
  }

  return (
    <section className={styles.superAppSection}>
      <div className={styles.container}>
        {/* Left Column: Large Gradient Card */}
        <div 
          className={styles.leftCard} 
          data-animation="fade-up"
          style={{
            '--bg-desktop': bgImage ? `url(${bgImage})` : undefined,
            '--bg-mobile': mobileImage ? `url(${mobileImage})` : (bgImage ? `url(${bgImage})` : undefined)
          }}
        >
          <div className={styles.leftCardContent}>
            <div className={styles.mainText}>
              <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></h2>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Grid */}
        <div className={styles.rightGrid}>
          {/* Consumer Blocks */}
          {consumerCard && (
            <>
              <div className={styles.textCard} data-animation="fade-up" style={{ transitionDelay: '0.1s' }}>
                <h3>{consumerCard.title}</h3>
                <p>{consumerCard.subtitle}</p>
              </div>

              <div className={`${styles.imageCard} ${styles.consumerImageCard}`} data-animation="fade-up" style={{ transitionDelay: '0.2s' }}>
                {consumerCard.icon && <img src={consumerCard.icon} alt={consumerCard.title} />}
              </div>
            </>
          )}

          {/* Merchant Blocks */}
          {merchantCard && (
            <>
              <div className={`${styles.imageCard} ${styles.merchantImageCard}`} data-animation="fade-up" style={{ transitionDelay: '0.3s' }}>
                {merchantCard.icon && <img src={merchantCard.icon} alt={merchantCard.title} />}
              </div>

              <div className={`${styles.textCard} ${styles.merchantTextCard}`} data-animation="fade-up" style={{ transitionDelay: '0.4s' }}>
                <h3>{merchantCard.title}</h3>
                <p>{merchantCard.subtitle}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
