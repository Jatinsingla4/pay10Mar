import React from "react";
import BizHeroBanner from "@/app/components/ui/careers/CareersHeroBanner";
import styles from "./ecosystem.module.scss";

export const metadata = {
  title: "Ecosystem Partners \u2013 Pay 10",
  description: "Explore Pay10's ecosystem partners including banks, financial institutions, and merchants building secure and integrated payment solutions.",
  alternates: {
    canonical: "https://pay10.ae/ecosystem-partners",
  },
};

export default function EcosystemPartnersPage() {
  return (
    <main className={styles.ecosystem}>
      <section className={styles.bannerSection}>
        <div className="wrapper">
          <div className={styles.bannerContent}>
            <h2>Ecosystem Partners</h2>
            <p>Collaborating with leading financial institutions, technology providers, and ecosystem partners to power seamless, secure, and compliant digital payments across the UAE.</p>
          </div>
        </div>
      </section>

      <section className="wrapper" style={{ padding: "60px 0", textAlign: "center" }}>
        <div className={styles.gridContainer}>
          <div className={styles.partnerCard}>
            <h3>Financial Partners</h3>
            <p>Working in alignment with regulated banks and central entities to ensure secure settlement and funds routing.</p>
          </div>
          <div className={styles.partnerCard}>
            <h3>Technology Providers</h3>
            <p>Integrating state-of-the-art payment technologies, fraud prevention tools, and API standards.</p>
          </div>
          <div className={styles.partnerCard}>
            <h3>Merchant Network</h3>
            <p>Enabling a vast network of retail, service, and e-commerce merchants to accept and optimize transactions.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
