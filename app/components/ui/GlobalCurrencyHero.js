'use client';

import { useLayoutEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GlobalCurrencyHero.module.scss';
import ContactCtaBtn from './ContactCtaBtn';

gsap.registerPlugin(ScrollTrigger);

// Available flag icons mapping
const FLAG_ICONS = [
  { src: '/images/home/f1.png', code: 'USD' },
  { src: '/images/home/f2.png', code: 'GBP' },
  { src: '/images/home/f3.png', code: 'AUD' },
  { src: '/images/home/f4.png', code: 'INR' },
  { src: '/images/home/f6.png', code: 'CAD' },
  { src: '/images/home/f7.png', code: 'AED' },
  { src: '/images/home/f8.png', code: 'SGD' },
];

// Predefined icon positions matching the screenshot layout
// Positions are carefully placed to avoid overlapping the central text area
// Central text area is approximately: 35-65% horizontal, 40-60% vertical
// Positions match the requirement screenshot with currencies arranged around the globe
const ICON_POSITIONS = [
  // Top row
  { top: 8, left: 50, iconIndex: 4, opacity: 0.35 }, // CAD (faded, top-center)
  { top: 9, left: 92, iconIndex: 1, opacity: 0.35 }, // GBP (faded, top-right)

  // Upper-middle (around the globe)
  { top: 22, left: 24, iconIndex: 0 }, // USD (left-upper)
  { top: 22, left: 62, iconIndex: 2 }, // AUD (upper-middle-right)

  // Mid row
  { top: 48, left: 8, iconIndex: 5 }, // AED (left)
  { top: 40, left: 90, iconIndex: 3 }, // INR (right)

  // Right-lower (CAD on right side)
  { top: 63, left: 90, iconIndex: 4 }, // CAD (right-lower)

  // Bottom band
  { top: 76, left: 38, iconIndex: 1 }, // GBP (bottom-left-center)

  // Faded bottom/edge pills (partially outside & clipped)
  { top: 88, left: 52, iconIndex: 0, opacity: 0.35 }, // USD (faded, bottom-center)
  { top: 92, left: 10, iconIndex: 6, opacity: 0.35 }, // SGD (faded, bottom-left)
  { top: 92, left: 92, iconIndex: 6, opacity: 0.35 }, // SGD (faded, bottom-right)
  { top: 78, left: 4, iconIndex: 2, opacity: 0.2 }, // AUD (faded, clipped on left)
];

export default function GlobalCurrencyHero({
  preHeading = 'SEND AND SPEND IN',
  heading = '100+ Currencies',
  description = 'Explore truly global e-payment services that go beyond borders.',
  backgroundVideo = '/images/home-globe.mp4',
}) {
  const rootRef = useRef(null);
  const backgroundRef = useRef(null);
  const textContainerRef = useRef(null);
  const iconsRef = useRef([]);

  // Use predefined positions matching the screenshot
  const iconPositions = useMemo(() => ICON_POSITIONS, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Check if already in viewport
      const rect = rootRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      // Stage 1: Background video fade in
      if (backgroundRef.current) {
        const videoElement = backgroundRef.current.querySelector('video');
        if (videoElement) {
          // Ensure video plays
          videoElement.play().catch(() => {
            // Autoplay may be blocked, but video will play when user interacts
          });
        }
        gsap.set(backgroundRef.current, { autoAlpha: 0 });
        const bgTween = gsap.to(backgroundRef.current, {
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        if (isInView) {
          bgTween.play(0);
        }
      }

      // Stage 2: Text fade up (after background)
      if (textContainerRef.current) {
        gsap.set(textContainerRef.current, { autoAlpha: 0, y: 40 });
        const textTween = gsap.to(textContainerRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3, // Start after background starts
          force3D: true,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        if (isInView) {
          textTween.play(0);
        }
      }

      // Stage 3: Icons scale up with stagger (after text)
      if (iconsRef.current.length > 0) {
        iconsRef.current.forEach((icon, index) => {
          if (icon) {
            const targetOpacity = parseFloat(icon.dataset.targetOpacity || '1') || 1;
            gsap.set(icon, {
              autoAlpha: 0,
              scale: 0,
              transformOrigin: 'center center',
            });
            const iconTween = gsap.to(icon, {
              autoAlpha: targetOpacity,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.2)',
              delay: 0.6 + (index * 0.05), // Start after text, stagger by 0.05s each
              force3D: true,
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top bottom',
                toggleActions: 'play none none none',
                once: true,
              },
            });
            if (isInView) {
              iconTween.play(0);
            }
          }
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
     <div className={styles.global_currency_main}>
      <section ref={rootRef} className={styles.globalCurrencyHero}>
          {/* Background Video */}
          <div ref={backgroundRef} className={styles.background}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.backgroundVideo}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>

          {/* Central Text Content */}
          <div ref={textContainerRef} className={styles.textContainer}>
            <p className={styles.preHeading}>{preHeading}</p>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.description}>{description}</p>
          </div>

          {/* Scattered Currency Icons */}
          <div className={styles.iconsContainer}>
            {iconPositions.map((position, index) => {
              const icon = FLAG_ICONS[position.iconIndex];
              return (
                <div
                  key={`icon-${index}`}
                  ref={(el) => {
                    if (el) iconsRef.current[index] = el;
                  }}
                  className={styles.iconWrapper}
                  style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    opacity: position.opacity ?? 1,
                  }}
                  data-target-opacity={(position.opacity ?? 1).toString()}
                  aria-hidden
                >
                  <Image
                    src={icon.src}
                    alt={`${icon.code} currency flag`}
                    width={120}
                    height={60}
                    className={styles.icon}
                    quality={90}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <ContactCtaBtn text="Get Started" variant="orange" />
     </div>
    </>
  );
}
