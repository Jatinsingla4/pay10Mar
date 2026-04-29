'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './PaymentGatewayHero.module.scss';

// API sometimes sends HTML tags (e.g. <b>...</b>) inside strings.
// We render all text as plain text, so we must strip tags to avoid showing "<b>" in UI.
function stripHtmlTags(value) {
  if (value == null) return '';
  const str = String(value);
  return str
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// If description begins with a bold section (common from CMS), extract it into trustStatement
// and return the remaining description without the duplicated text.
function extractLeadingBold(html) {
  if (!html) return { bold: '', rest: '' };
  const str = String(html).trim();
  const match = str.match(/^\s*<b[^>]*>(.*?)<\/b>\s*(.*)$/is);
  if (!match) return { bold: '', rest: str };
  return { bold: stripHtmlTags(match[1]), rest: match[2] || '' };
}

// Default icon decorations arranged in a circular/radiating pattern
// Icons are positioned in a circular arrangement on the right side
// Based on design: icons radiate from center-right area (around 50% vertical, 80% horizontal)
export const defaultIconDecorations = [
  {
    id: 'a1',
    src: '/images/a1.png',
    alt: 'Contactless Payment',
    size: { width: 76, height: 76 },
    position: {
      // Top-right outside ring (yellow)
      desktop: { top: '50%', left: '80%' },
      mobile: { top: '10%', left: '55%' },
    },
    isHighlighted: true, // Yellow circle
  },
  {
    id: 'a2',
    src: '/images/a2.png',
    alt: 'UPI Payment',
    size: { width: 88, height: 88 },
    position: {
      // Upper-left on ring
      desktop: { top: '20%', left: '-5%' },
      mobile: { top: '26%', left: '18%' },
    },
  },
  {
    id: 'a3',
    src: '/images/a3.png',
    alt: 'Card Transaction',
    size: { width: 76, height: 76 },
    position: {
      // Upper-right on ring
      desktop: { top: '20%', left: '50%' },
      mobile: { top: '35%', left: '85%' },
    },
  },
  {
    id: 'a4',
    src: '/images/a4.png',
    alt: 'Payment Symbol',
    size: { width: 84, height: 84 },
    position: {
      // Center (yellow)
      desktop: { top: '48%', left: '30%' },
      mobile: { top: '54%', left: '50%' },
    },
    isHighlighted: true, // Yellow circle
  },
  {
    id: 'a5',
    src: '/images/a5.png',
    alt: 'Bank Institution',
    size: { width: 76, height: 76 },
    position: {
      // Lower-left on ring
      desktop: { top: '60%', left: '-20%' },
      mobile: { top: '78%', left: '17%' },
    },
  },
  {
    id: 'a6',
    src: '/images/a6.png',
    alt: 'Digital Wallet',
    size: { width: 76, height: 76 },
    position: {
      // Bottom outside ring (yellow)
      desktop: { top: '80%', left: '60%' },
      mobile: { top: '98%', left: '50%' },
    },
    isHighlighted: true, // Yellow circle
  },
  {
    id: 'a7',
    src: '/images/a7.png',
    alt: 'RuPay',
    size: { width: 80, height: 80 },
    position: {
      // Lower-right on ring (larger)
      desktop: { top: '90%', left: '10%' },
      mobile: { top: '82%', left: '84%' },
    },
  },
];

// Default circle decorations for background - radiating from center-right
export const defaultCircleDecorations = [
  {
    id: 'circle-1',
    type: 'circle',
    size: { width: '120vmax', height: '120vmax' },
    position: {
      // rings originate from right side (so arcs show behind left text)
      desktop: { top: '52%', left: '78%' },
      mobile: { top: '54%', left: '70%' },
    },
    strokeWidth: 2,
    opacity: 0.2,
  },
  {
    id: 'circle-2',
    type: 'circle',
    size: { width: '100vmax', height: '100vmax' },
    position: {
      desktop: { top: '52%', left: '78%' },
      mobile: { top: '54%', left: '70%' },
    },
    strokeWidth: 2,
    opacity: 0.22,
  },
  {
    id: 'circle-3',
    type: 'circle',
    size: { width: '80vmax', height: '80vmax' },
    position: {
      desktop: { top: '52%', left: '78%' },
      mobile: { top: '54%', left: '70%' },
    },
    strokeWidth: 2,
    opacity: 0.24,
  },
  {
    id: 'circle-4',
    type: 'circle',
    size: { width: '60vmax', height: '60vmax' },
    position: {
      desktop: { top: '52%', left: '78%' },
      mobile: { top: '54%', left: '70%' },
    },
    strokeWidth: 2,
    opacity: 0.26,
  },
  {
    id: 'circle-5',
    type: 'circle',
    size: { width: '40vmax', height: '40vmax' },
    position: {
      desktop: { top: '52%', left: '78%' },
      mobile: { top: '54%', left: '70%' },
    },
    strokeWidth: 2,
    opacity: 0.28,
  },
];

export default function PaymentGatewayHero({
  eyebrow = 'PAYMENT GATEWAY',
  title = 'Seamless. Fast. Secure.',
  trustStatement = '100+ Enterprise Businesses Trust Pay10',
  description = 'Pay10 Payment Gateway empowers businesses with secure, scalable, and seamless digital transactions, featuring instant settlements, multiple payment options (UPI, cards, net banking, wallets) optimized for cost efficiency and growth.',
  ctaLabel = 'Get Started',
  ctaHref = '/',
  iconDecorations = defaultIconDecorations,
  circleDecorations = defaultCircleDecorations,
  onCtaClick,
}) {
  const rootRef = useRef(null);
  const isLink = ctaHref && !onCtaClick;

  const cleanEyebrow = stripHtmlTags(eyebrow);
  const cleanTitle = stripHtmlTags(title);

  // Derive trust/description:
  // - Always strip tags
  // - If description contains leading <b>...</b>, use it as trust (if different) and remove from description
  const extracted = extractLeadingBold(description);
  const cleanTrustFromProp = stripHtmlTags(trustStatement);
  const derivedTrust =
    extracted.bold && extracted.bold !== cleanTrustFromProp ? extracted.bold : cleanTrustFromProp;

  const cleanDescription = stripHtmlTags(extracted.rest || description);

  const handleCta = (event) => {
    if (onCtaClick) {
      event.preventDefault();
      onCtaClick();
    }
  };

  const CtaComponent = isLink ? Link : 'button';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;

      const rootEl = rootRef.current;
      if (rootEl) {
        gsap.set(rootEl, { autoAlpha: 0 });
      }

      const q = gsap.utils.selector(rootEl);
      const circles = q('[data-anim="circle"]');
      const icons = q('[data-anim="icon"]');
      const ctaEl = q('[data-anim="cta"]');
      const textChain = q(
        '[data-anim="eyebrow"], [data-anim="title"], [data-anim="trust"], [data-anim="description"]'
      );

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

      // CTA: animate explicitly so it never ends up stuck hidden
      if (ctaEl.length) {
        tl.fromTo(
          ctaEl,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, clearProps: 'transform,opacity,visibility' },
          0.95
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

      // Add subtle bouncing effect after initial timeline completes
      const timelineDuration = tl.duration();

      if (circles.length) {
        // Subtle scale animation for all circles with stagger
        gsap.to(circles, {
          scale: 1.05,
          duration: 2,
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

  const allDecorations = [
    ...(Array.isArray(circleDecorations) ? circleDecorations : []),
    ...(Array.isArray(iconDecorations) ? iconDecorations : []),
  ];

  return (
    <section ref={rootRef} className={styles.paymentGatewayHero}>
      {/* On <=991px this becomes the gradient "card" shown in the screenshot.
          On desktop it behaves like a transparent wrapper so existing layout remains intact. */}
      <div className={styles.mobileHeroCard}>
        <div className={styles.container}>
          {/* Top centered heading (spans full width like design) */}
          <div className={styles.topHeader}>
            {cleanEyebrow ? (
              <p className={styles.eyebrow} data-anim="eyebrow">
                {cleanEyebrow}
              </p>
            ) : null}
            {cleanTitle ? (
              <h1 className={styles.title} data-anim="title">
                {cleanTitle}
              </h1>
            ) : null}
          </div>

          {/* Body: left text + right icon cluster (desktop), icon cluster only (<=991px) */}
          <div className={styles.contentWrapper}>
            {/* Desktop copy (hidden on <=991px; mobile uses separate copy block below) */}
            <div className={styles.leftBody}>
              {derivedTrust ? (
                <p className={styles.trustStatement} data-anim="trust">
                  {derivedTrust}
                </p>
              ) : null}
              {cleanDescription ? (
                <p className={styles.description} data-anim="description">
                  {cleanDescription}
                </p>
              ) : null}
              <CtaComponent
                href={isLink ? ctaHref : undefined}
                onClick={handleCta}
                type={isLink ? undefined : 'button'}
                className={styles.ctaButton}
                data-anim="cta"
              >
                <span>{ctaLabel}</span>
              </CtaComponent>
            </div>

            <div className={styles.iconsArea} aria-hidden="true">
              {Array.isArray(iconDecorations) && iconDecorations.length > 0 && (
                <div className={styles.decorations}>
                  {iconDecorations.map((item) => {
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
                      '--stroke':
                        typeof item.strokeWidth === 'number' ? `${item.strokeWidth}px` : undefined,
                      '--opacity':
                        typeof item.opacity === 'number' ? String(item.opacity) : undefined,
                    };

                    return (
                      <div
                        key={item.id}
                        className={`${styles.iconDecoration} ${item.isHighlighted ? styles.iconHighlighted : ''}`}
                        style={styleVars}
                        aria-label={item.alt || undefined}
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
            </div>
          </div>

          {/* Global circle rings: span full hero width behind both columns */}
          {Array.isArray(circleDecorations) && circleDecorations.length > 0 && (
            <div className={styles.decorationsGlobal}>
              {circleDecorations.map((item) => {
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
                  '--stroke':
                    typeof item.strokeWidth === 'number' ? `${item.strokeWidth}px` : undefined,
                  '--opacity': typeof item.opacity === 'number' ? String(item.opacity) : undefined,
                };

                return (
                  <span
                    key={item.id}
                    className={styles.circleDecoration}
                    style={styleVars}
                    data-anim="circle"
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* <=991px copy layout (matches screenshot: white background section under gradient card) */}
      <div className={styles.mobileCopy}>
        <div className={styles.mobileCopyInner}>
          {derivedTrust ? <p className={styles.trustStatement}>{derivedTrust}</p> : null}
          {cleanDescription ? <p className={styles.description}>{cleanDescription}</p> : null}
          <CtaComponent
            href={isLink ? ctaHref : undefined}
            onClick={handleCta}
            type={isLink ? undefined : 'button'}
            className={styles.ctaButton}
          >
            <span>{ctaLabel}</span>
          </CtaComponent>
        </div>
      </div>
    </section>
  );
}

