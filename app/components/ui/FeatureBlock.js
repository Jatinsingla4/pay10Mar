'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResponsive } from '../../contexts/ResponsiveContext';
import styles from './FeatureBlock.module.scss';

gsap.registerPlugin(ScrollTrigger);

const defaultFeatures = [
  {
    id: 'customized',
    icon: '/images/home/c1.svg',
    text: 'Customized to Suit Your Needs',
  },
  {
    id: 'support',
    icon: '/images/home/c2.svg',
    text: '24/7 Customer Support',
  },
  {
    id: 'secure',
    icon: '/images/home/c3.svg',
    text: 'Simple, Secure, and Efficient Payment Processes',
  },
];

export default function FeatureBlock({
  backgroundImage = '/images/home/chat-bg.jpg',
  heading = 'Discover New Business Frontiers',
  description = 'Built for companies of all sizes, Pay10 Biz expands your customer reach like never before, empowering you with a suite of payment options and transaction analytics to help you optimize your business.',
  ctaLabel = 'Learn More',
  ctaHref = '/merchant-app',
  features = defaultFeatures,
}) {
  const { isDesktop } = useResponsive();
  const rootRef = useRef(null);
  const imageSectionRef = useRef(null);
  const contentOverlayRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const featureItemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      if (isDesktop) {
        // Desktop animations
        const imageEl = imageSectionRef.current;
        const contentEl = contentOverlayRef.current;
        const featuresEl = featuresSectionRef.current;

        // Check if already in viewport on mount
        const rect = rootRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (imageEl) {
          gsap.set(imageEl, { autoAlpha: 0 });
          const imageTween = gsap.to(imageEl, {
            autoAlpha: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              toggleActions: 'play none none none',
              once: true,
            },
          });
          if (isInView) {
            imageTween.play(0);
          }
        }

        if (contentEl) {
          gsap.set(contentEl, {
            autoAlpha: 1,
            y: 40,
            force3D: true,
          });
          const contentTween = gsap.to(contentEl, {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
            force3D: true,
            scrollTrigger: {
              trigger: contentEl,
              start: 'top bottom',
              toggleActions: 'play none none none',
              once: true,
            },
          });
          if (isInView) {
            contentTween.play(0);
          }
        }

        if (featuresEl) {
          gsap.set(featuresEl, {
            autoAlpha: 1,
            y: 40,
            force3D: true,
          });
          const featuresTween = gsap.to(featuresEl, {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4,
            force3D: true,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              toggleActions: 'play none none none',
              once: true,
            },
          });
          if (isInView) {
            featuresTween.play(0);
          }
        }

        // Parallax scroll effect (upward movement)
        if (contentEl && featuresEl) {
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const parallaxAmount = progress * 100;

              gsap.to(contentEl, {
                y: -parallaxAmount * 1,
                duration: 0.1,
                ease: 'none',
                force3D: true,
                overwrite: true,
              });

              gsap.to(featuresEl, {
                y: -parallaxAmount * 1,
                duration: 0.1,
                ease: 'none',
                force3D: true,
                overwrite: true,
              });
            },
          });
        }
      } else {
        // Mobile/Tablet animations
        const imageEl = imageSectionRef.current;
        const contentEl = contentOverlayRef.current;
        const items = featureItemsRef.current.filter(Boolean);

        // Check if already in viewport on mount
        const rect = rootRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (imageEl) {
          gsap.set(imageEl, {
            autoAlpha: 0,
            y: 30,
            force3D: true,
          });
          const imageTween = gsap.to(imageEl, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              toggleActions: 'play none none none',
              once: true,
            },
          });
          if (isInView) {
            imageTween.play(0);
          }
        }

        if (contentEl) {
          gsap.set(contentEl, {
            autoAlpha: 0,
            y: 30,
            force3D: true,
          });
          const contentTween = gsap.to(contentEl, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
            force3D: true,
            scrollTrigger: {
              trigger: contentEl,
              start: 'top bottom',
              toggleActions: 'play none none none',
              once: true,
            },
          });
          if (isInView) {
            contentTween.play(0);
          }
        }

        if (items.length > 0) {
          items.forEach((item) => {
            gsap.set(item, {
              autoAlpha: 0,
              y: 30,
              force3D: true,
            });
            const itemTween = gsap.to(item, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            });
            // Check if individual item is already in viewport
            const itemRect = item.getBoundingClientRect();
            const itemIsInView = itemRect.top < window.innerHeight && itemRect.bottom > 0;
            if (itemIsInView) {
              itemTween.play(0);
            }
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={rootRef} className={styles.featureBlock}>
      <div className={styles.innersW}>
        <div
          ref={imageSectionRef}
          className={styles.imageSection}
          style={{ '--bg-image': `url(${backgroundImage})` }}
        />
        <div ref={contentOverlayRef} className={styles.contentOverlay}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.ctaWa}>
            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>
        </div>
        <div ref={featuresSectionRef} className={styles.featuresSection}>
          {Array.isArray(features) && features.length > 0 && (
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => {
                    if (el) featureItemsRef.current[index] = el;
                  }}
                  className={styles.featureItem}
                >
                  {feature.icon && (
                    <div className={styles.iconWrap}>
                      <Image
                        src={feature.icon}
                        alt={feature.text || ''}
                        width={100}
                        height={100}
                        className={styles.icon}
                        priority
                      />
                    </div>
                  )}
                  {feature.text && (
                    <p className={styles.text}>{feature.text}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
