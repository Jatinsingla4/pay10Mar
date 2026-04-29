 'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './BannerBreakerSmall.module.scss';

export default function BannerBreakerSmall({
  title = 'Payments Made Easy, Fast and Secure',
  description = "In-App   |   Online   |   In-Store   |   In Real Time",
  backgroundDesktop = '/images/home/bg-b-d.png',
  backgroundMobile = '/images/home/bg-b-m.png',
}) {
  const desktopImage = backgroundDesktop || '/images/home/bg-b-d.png';
  const mobileImage = backgroundMobile || desktopImage;

  return (
    <section
      className={styles.hero}
      style={{
        '--bg-desktop': `url(${desktopImage})`,
        '--bg-mobile': `url(${mobileImage})`,
      }}
      data-animation="opacity"
    >
      <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.inner}>
            <h1 className={styles.heading} data-animation="opacity-up">{title}</h1>
            <p className={styles.description} data-animation="opacity-up">{description}</p>
        </div>
      </div>
    </section>
  );
}
