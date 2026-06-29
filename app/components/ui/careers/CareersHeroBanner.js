"use client";
import styles from "./CareersHeroBanner.module.scss";

export default function CareersHeroBanner() {
  return (
    <section className={styles.careersHeroBanner} aria-label="Careers">
      <div className={styles.bannerContent}>
        <h2>Where Your Ambition Meets Our Innovation</h2>
      </div>
    </section>
  );
}
