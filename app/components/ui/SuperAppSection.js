"use client";

import React from "react";
import Image from "next/image";
import styles from "./SuperAppSection.module.scss";

export default function SuperAppSection() {
  return (
    <section className={styles.superAppSection}>
      <div className={styles.container}>
        {/* Left Column: Large Gradient Card */}
        <div className={styles.leftCard} data-animation="fade-up">
          <div className={styles.leftCardContent}>
            <div className={styles.mainText}>
              <h2>Everything financial.<br />One place. One platform. One UAE.</h2>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Grid */}
        <div className={styles.rightGrid}>
          {/* Top Left: For Consumers Text */}
          <div className={styles.textCard} data-animation="fade-up" style={{ transitionDelay: '0.1s' }}>
            <h3>For Consumers</h3>
            <p>Pay, send, receive, remit &mdash; all financial needs in a single app. Link all your bank accounts.</p>
          </div>

          <div className={`${styles.imageCard} ${styles.consumerImageCard}`} data-animation="fade-up" style={{ transitionDelay: '0.2s' }}>
            <img
              src="/images/home/merchant-screen.jpg"
              alt="Pay10 Consumer App"
            />
          </div>

          {/* Bottom Left: Merchant Image */}
          <div className={`${styles.imageCard} ${styles.merchantImageCard}`} data-animation="fade-up" style={{ transitionDelay: '0.3s' }}>
            <img 
              src="/images/home/merchant-screen.jpg" 
              alt="Pay10 Merchant App" 
            />
          </div>

          {/* Bottom Right: For Merchants Text */}
          <div className={`${styles.textCard} ${styles.merchantTextCard}`} data-animation="fade-up" style={{ transitionDelay: '0.4s' }}>
            <h3>For Merchants</h3>
            <p>Accept payments, Instant Settlement, Manage cash flow, 24X7 Customer Support &mdash; SME to enterprise, all served.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
