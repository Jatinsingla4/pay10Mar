"use client";
import styles from "./CareersHeroBanner.module.scss";

export default function CareersHeroBanner() {
  return (
    <section className={styles.careersHeroBanner} aria-label="Careers">
      <div className={styles.bannerContent}>
        <h2 data-animation="opacity-up">Careers</h2>
      </div>
    </section>
  );
}
