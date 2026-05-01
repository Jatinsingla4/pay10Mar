 'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './HeroHomeBanner.module.scss';

const defaultDecorations = [
  {
    id: 'ic1',
    type: 'icon',
    src: '/images/home/ic1.svg',
    alt: '',
    size: { width: 56, height: 56 },
    position: {
      desktop: { top: '34%', left: '10%' },
      mobile: { top: '57%', left: '9%' },
    },
  },
  {
    id: 'ic2',
    type: 'icon',
    src: '/images/home/ic2.svg',
    alt: '',
    size: { width: 56, height: 56 },
    position: {
      desktop: { top: '58%', left: '74%' },
      mobile: { top: '80%', left: '10%' },
    },
  },
  {
    id: 'ic3',
    type: 'icon',
    src: '/images/home/ic3.svg',
    alt: '',
    size: { width: 56, height: 56 },
    position: {
      desktop: { top: '70%', left: '30%' },
      mobile: { top: '60%', left: '90%' },
    },
  },
  {
    id: 'ic4',
    type: 'icon',
    src: '/images/home/ic4.svg',
    alt: '',
    size: { width: 56, height: 56 },
    position: {
      desktop: { top: '34%', left: '82%' },
      mobile: { top: '85%', left: '88%' },
    },
  },
  {
    id: 'circle-large',
    type: 'circle',
    size: { width: '95vw', height: '95vw' },
    position: {
      desktop: { top: '100%', left: '50%' },
      mobile: { top: '115%', left: '-6%' },
    },
  },
  {
    id: 'circle-small',
    type: 'circle',
    size: { width: '74vw', height: '80vw' },
    position: {
      desktop: { top: '112%', left: '50%' },
      mobile: { top: '100%', left: '14%' },
    },
  },
];

export default function HeroHomeBanner({
  eyebrow = 'YOUR TRUSTED PAYMENT PARTNER',
  title = 'It Pays to Go Digital',
  description = 'Tap into a world of possibilities with Pay10 digital payments to boost your life or business.',
  ctaLabel = 'Get Started',
  ctaHref = '/contact-us',
  heroImage = {
    src: '/images/home/herobanner_mobile_img.png',
    alt: 'Pay10 app screens',
    width: 360,
    height: 640,
  },
  decorations = defaultDecorations,
}) {
  const hasHeroImage = heroImage && heroImage.src;
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;

      const rootEl = rootRef.current;
      if (rootEl) {
        gsap.set(rootEl, { autoAlpha: 0 });
      }

      const circles = gsap.utils.toArray('[data-anim="circle"]');
      const icons = gsap.utils.toArray('[data-anim="icon"]');
      const textChain = gsap.utils.toArray(
        '[data-anim="eyebrow"], [data-anim="title"], [data-anim="body"], [data-anim="phone"]'
      );
      const ctaEl = document.querySelector('[data-anim="cta"]');

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (rootEl) {
        tl.to(rootEl, {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power1.out',
        }, 0);
      }

      if (circles.length) {
        tl.from(circles, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 1,
          stagger: 0.15,
        }, 0.05);
      }

      if (textChain.length) {
        tl.from(textChain, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.2,
          clearProps: 'transform',
        }, 0.25);
      }

      if (ctaEl) {
        tl.fromTo(ctaEl,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            // clearProps: 'transform',
          },
          0.75
        );
      }

      if (icons.length) {
        tl.from(icons, {
          autoAlpha: 0,
          scale: 0.3,
          duration: 1,
          stagger: 0.05,
          ease: 'back.out(1.8)',
        }, 1.05);
      }

      // Add subtle scale animation after initial timeline completes
      const timelineDuration = tl.duration();

      if (circles.length) {
        gsap.to(circles, {
          scale: 1.05,
          duration: 1.5,
          ease: 'power1.inOut',
          stagger: 0.2,
          yoyo: true,
          repeat: -1,
          delay: timelineDuration + 0.3,
        });
      }

      if (icons.length) {
        gsap.to(icons, {
          y: -10,
          duration: 1.2,
          ease: 'power1.inOut',
          stagger: 0.15,
          yoyo: true,
          repeat: -1,
          delay: timelineDuration + 0.5,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.heroHomeBanner}>
      <div className={styles.desktopLayout}>
        <div className={styles.desktopInner}>
          <p className={styles.eyebrow} data-anim="eyebrow">{eyebrow}</p>
          <h2 className={styles.title} data-anim="title">{title}</h2>
          {/* <p className={styles.body} data-anim="body">{description}</p> */}
          <p className={styles.body} data-anim="body">
            Authorised by the Reserve Bank of India.
            <br/>Instant. Secure. Interoperable.
          </p>
          <Link href={ctaHref} className={styles.ctaDesktop} data-anim="cta">
            <span>{ctaLabel}</span>
          </Link>
        </div>

        {hasHeroImage && (
          <div className={styles.desktopPhoneWrap} data-anim="phone">
            <Image
              src={heroImage.src}
              alt={heroImage.alt || ''}
              width={heroImage.width}
              height={heroImage.height}
              className={styles.desktopPhone}
              priority
            />
          </div>
        )}
      </div>

      {Array.isArray(decorations) && decorations.length > 0 && (
        <div className={styles.decorations}>
          {decorations.map((item) => {
            const widthVal = item.size?.width;
            const heightVal = item.size?.height;

            const styleVars = {
              '--top-desktop': item.position?.desktop?.top,
              '--left-desktop': item.position?.desktop?.left,
              '--right-desktop': item.position?.desktop?.right,
              '--bottom-desktop': item.position?.desktop?.bottom,
              '--top-mobile': item.position?.mobile?.top,
              '--left-mobile': item.position?.mobile?.left,
              '--right-mobile': item.position?.mobile?.right,
              '--bottom-mobile': item.position?.mobile?.bottom,
              '--width':
                typeof widthVal === 'number'
                  ? `${widthVal}px`
                  : typeof widthVal === 'string'
                    ? widthVal
                    : undefined,
              '--height':
                typeof heightVal === 'number'
                  ? `${heightVal}px`
                  : typeof heightVal === 'string'
                    ? heightVal
                    : undefined,
            };

            if (item.type === 'circle') {
              return (
                <span
                  key={item.id}
                  className={styles.circleDecoration}
                  style={styleVars}
                  data-anim="circle"
                  aria-hidden="true"
                />
              );
            }

            return (
              <div
                key={item.id}
                className={styles.iconDecoration}
                style={styleVars}
                aria-hidden={item.alt ? undefined : true}
                data-anim="icon"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt || ''}
                    width={item.size?.width || 56}
                    height={item.size?.height || 56}
                    className={styles.iconImage}
                    priority={Boolean(item.priority)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

