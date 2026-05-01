 'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './BannerBreaker.module.scss';

export default function BannerBreaker({
  title = 'Pay10 Wallet',
  description = "Pay family and friends. Send money home. Shop and pay bills. Even grow your business. There's no limit to what your money can do for you.",
  ctaHref = '/coming-soon',
  ctaIcon = '/images/common/cta-get-pay101.svg',
  ctaLink,
  ctaImg,
  logoSrc = '/images/common/logo-mini.png',
  logo = true,
  backgroundDesktop = '/images/home/bg-b-d.png',
  backgroundMobile = '/images/home/bg-b-m.png',
  classN,
  onCtaClick,
}) {
  const desktopImage = backgroundDesktop || '/images/home/bg-b-d.png';
  const mobileImage = backgroundMobile || desktopImage;
  const finalHref = ctaLink || ctaHref;
  const finalIcon = ctaImg || ctaIcon;
  const isLink = finalHref && !onCtaClick;

  const handleCta = (event) => {
    if (onCtaClick) {
      event.preventDefault();
      onCtaClick();
    }
  };

  const CtaComponent = isLink ? Link : 'button';

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
          <div
            className={`${styles.inner} ${classN || ''}`.trim()}
          >
          {logo && logoSrc ? (
            <div className={styles.logoWrap} data-animation="opacity-up">
              <Image
                src={logoSrc}
                alt="Pay10 logo"
                className={styles.logo}
                width={96}
                height={96}
                priority
              />
            </div>
          ) : null}

          <h2 className={styles.heading} data-animation="opacity-up">{title}</h2>
          <p className={styles.description} data-animation="opacity-up">{description}</p>

          <CtaComponent
            className={styles.cta}
            href={isLink ? finalHref : undefined}
            onClick={handleCta}
            type={isLink ? undefined : 'button'}
            data-animation="opacity-up"
          >
            <Image
              src={finalIcon}
              alt=""
              className={styles.ctaIcon}
              width={223}
              height={66}
              priority
            />
          </CtaComponent>
        </div>
      </div>
    </section>
  );
}
