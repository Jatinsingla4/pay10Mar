'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CertificationHero.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function CertificationHero({
  text = 'Authorised by Reserve Bank of India as an Online Payment Aggregator, Payment Aggregator for Cross-Border Transactions and PPI Issuer ',
  imageSrc = '/images/home/circle-bg.jpg',
  imageAlt = 'Cityscape',
  ctaLabel = 'Get the App',
  ctaHref = '/',
  circleCount = 3,
}) {
  const rootRef = useRef(null);
  const circlesRef = useRef([]);
  const imageContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const textContainerRef = useRef(null);

  useLayoutEffect(() => {
    let updateInterval = null;
    let updateCharColorsFn = null;
    let resetInterval = null;
    let resetPositionsFn = null;

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Check if already in viewport
      const rect = rootRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      // Image container fade and scale in FIRST
      if (imageContainerRef.current) {
        gsap.set(imageContainerRef.current, { scale: 0.75, autoAlpha: 0, transformOrigin: 'center center' });
        const imageTween = gsap.to(imageContainerRef.current, {
          scale: 1,
          autoAlpha: 1,
          duration: 1.4,
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

      // Circles scale up with stagger starting from smallest (index 0)
      if (circlesRef.current.length > 0) {
        circlesRef.current.forEach((circle, index) => {
          if (circle) {
            gsap.set(circle, { autoAlpha:0, scale: 0.8, transformOrigin: 'center center' });
            const circleTween = gsap.to(circle, {
              autoAlpha:1,
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
              delay: 0.4 + (index * 0.4), // Start after image, stagger from smallest
              force3D: true,
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top bottom',
                toggleActions: 'play none none none',
                once: true,
              },
            });
            if (isInView) {
              circleTween.play(0);
            }
          }
        });
      }

      // Button slide up + fade
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { autoAlpha: 0, y: 30 });
        const buttonTween = gsap.to(buttonRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.6,
          force3D: true,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        if (isInView) {
          buttonTween.play(0);
        }
      }

      // Infinite scrolling text with seamless loop (multiple instances)
      if (textContainerRef.current && imageContainerRef.current) {
        const textEl = textContainerRef.current;
        const wrapper = textEl.parentElement;
        const imageEl = imageContainerRef.current;

        // Split text into characters for individual inversion
        const textContent = textEl.textContent;
        textEl.innerHTML = '';
        const chars = textContent.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = styles.char;
          return span;
        });
        chars.forEach(char => textEl.appendChild(char));

        // Create multiple duplicates for seamless infinite loop (5 instances for better coverage)
        const duplicates = [];
        for (let i = 0; i < 5; i++) {
          const duplicate = textEl.cloneNode(true);
          duplicate.setAttribute('aria-hidden', 'true');
          duplicate.className = styles.scrollingText;
          wrapper.appendChild(duplicate);
          duplicates.push(duplicate);
        }

        // Wait for layout to measure width
        requestAnimationFrame(() => {
          const textWidth = textEl.offsetWidth;
          const gap = 100;
          const viewportWidth = window.innerWidth;

          // Position all instances side by side, starting from viewport right edge
          // Calculate how many instances we need to cover viewport + buffer
          const instancesNeeded = Math.ceil((viewportWidth + textWidth * 2) / (textWidth + gap)) + 2;

          gsap.set(textEl, { x: viewportWidth });
          duplicates.forEach((dup, idx) => {
            gsap.set(dup, { x: viewportWidth + (textWidth + gap) * (idx + 1) });
          });

          // Create seamless infinite loop
          const allTexts = [textEl, ...duplicates];
          const totalWidth = textWidth + gap;

          // Check if section is already more than 50% visible
          const checkVisibility = () => {
            if (!rootRef.current) return false;
            const rect = rootRef.current.getBoundingClientRect();
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(sectionHeight, viewportHeight - rect.top);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            return visibleHeight >= sectionHeight * 0.5;
          };

          // Continuous infinite animation - all texts move from right to left
          // Only start when section is more than 50% visible
          // Create tween first (paused), then add ScrollTrigger separately
          const textTween = gsap.to(allTexts, {
            x: `-=${viewportWidth + textWidth * 2}`,
            duration: 60,
            ease: 'none',
            repeat: -1,
            paused: true, // Start paused
          });

          // Add ScrollTrigger separately to avoid initialization order issue
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: '50% bottom', // Start when 50% of section is visible
            onEnter: () => {
              textTween.play();
            },
            once: false, // Allow it to pause/resume if needed
          });

          // If already more than 50% visible, start immediately
          if (checkVisibility()) {
            textTween.play();
          }

          // Continuous position reset for seamless loop
          resetPositionsFn = () => {
            allTexts.forEach((text) => {
              const currentX = parseFloat(gsap.getProperty(text, 'x') || 0);
              // When text is completely off-screen to the left, move it to the right
              if (currentX <= -textWidth) {
                // Find the rightmost position of all texts
                const allPositions = allTexts.map(t => parseFloat(gsap.getProperty(t, 'x') || 0));
                const rightmostX = Math.max(...allPositions);
                // Place it right after the rightmost text
                gsap.set(text, { x: rightmostX + totalWidth });
              }
            });
          };

          // Check and reset positions continuously (every frame)
          gsap.ticker.add(resetPositionsFn);

          // Character-level color inversion based on circular image position
          updateCharColorsFn = () => {
            const imageRect = imageEl.getBoundingClientRect();
            const imageCenterX = imageRect.left + imageRect.width / 2;
            const imageCenterY = imageRect.top + imageRect.height / 2;
            const imageRadius = imageRect.width / 2;

            const allChars = [
              ...textEl.querySelectorAll(`.${styles.char}`),
              ...duplicates.flatMap(dup => Array.from(dup.querySelectorAll(`.${styles.char}`)))
            ];

            allChars.forEach((char) => {
              const charRect = char.getBoundingClientRect();
              const charCenterX = charRect.left + charRect.width / 2;
              const charCenterY = charRect.top + charRect.height / 2;

              const distance = Math.sqrt(
                Math.pow(charCenterX - imageCenterX, 2) + Math.pow(charCenterY - imageCenterY, 2)
              );

              if (distance < imageRadius) {
                char.style.color = '#ffffff';
                char.style.textShadow = '0 0 2px rgba(0, 0, 0, 0.3)';
              } else {
                char.style.color = 'var(--black)';
                char.style.textShadow = 'none';
              }
            });
          };

          // Update character colors continuously
          updateInterval = setInterval(updateCharColorsFn, 50);
          gsap.ticker.add(updateCharColorsFn);
        });
      }

    }, rootRef);

    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      if (resetInterval) {
        clearInterval(resetInterval);
      }
      if (updateCharColorsFn) {
        gsap.ticker.remove(updateCharColorsFn);
      }
      if (resetPositionsFn) {
        gsap.ticker.remove(resetPositionsFn);
      }
      ctx.revert();
    };
  }, [text]);

  return (
    <section ref={rootRef} className={styles.certificationHero}>
      {/* Background circles */}
      <div className={styles.circlesContainer}>
        {Array.from({ length: circleCount }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) circlesRef.current[index] = el;
            }}
            className={styles.circle}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Central circular image */}
      <div ref={imageContainerRef} className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={600}
          className={styles.image}
          priority
        />
        <Link ref={buttonRef} href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </Link>
      </div>

      {/* Scrolling text */}
      <div className={styles.textWrapper}>
        <div ref={textContainerRef} className={styles.scrollingText}>
          {text}
        </div>
      </div>
    </section>
  );
}
