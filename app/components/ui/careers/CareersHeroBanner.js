"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./CareersHeroBanner.module.scss";

const DEFAULT_BREATHING_CIRCLES = [
  {
    id: "circle-1",
    size: { width: "90vmax", height: "90vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: "circle-2",
    size: { width: "65vmax", height: "65vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: "circle-3",
    size: { width: "40vmax", height: "40vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
];

/**
 * Careers-page hero banner. Carries the same intro timeline and breathing-circle
 * loop as MapHeroBanner, but with careers-specific content baked in and
 * dedicated styles so the careers page can stay focused on layout-only concerns.
 */
export default function CareersHeroBanner({
  title = "Where Your Ambition Meets Our Innovation",
  heroImage = null,
  decorations = DEFAULT_BREATHING_CIRCLES,
  className = "",
}) {
  const rootRef = useRef(null);
  const hasHeroImage = Boolean(heroImage?.src);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduce) return;

      const rootEl = rootRef.current;
      if (rootEl) {
        gsap.set(rootEl, { autoAlpha: 0 });
      }

      const textChain = gsap.utils.toArray('[data-anim="title"]');
      const circles = gsap.utils.toArray('[data-anim="circle"]');
      const phoneEl = rootEl?.querySelector('[data-anim="phone"]');

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (rootEl) {
        tl.to(
          rootEl,
          { autoAlpha: 1, duration: 0.25, ease: "power1.out" },
          0
        );
      }

      if (circles.length) {
        tl.from(
          circles,
          {
            autoAlpha: 0,
            scale: 0.8,
            duration: 1,
            stagger: 0.15,
          },
          0.05
        );
      }

      if (textChain.length) {
        tl.from(
          textChain,
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.8,
            stagger: 0.2,
            clearProps: "transform",
          },
          0.1
        );
      }

      if (phoneEl) {
        tl.from(
          phoneEl,
          {
            autoAlpha: 0,
            y: 36,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.35
        );
      }

      const timelineDuration = tl.duration();
      if (circles.length) {
        gsap.to(circles, {
          scale: 1.05,
          duration: 2,
          ease: "power1.inOut",
          stagger: 0.2,
          yoyo: true,
          repeat: -1,
          delay: timelineDuration + 0.3,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const w = heroImage?.width || 1024;
  const h = heroImage?.height || 455;

  return (
    <section
      ref={rootRef}
      aria-label={title}
      className={`${styles.careersHeroBanner} ${className}`.trim()}
    >
      <div className={styles.layout}>
      </div>
    </section>
  );
}

export { DEFAULT_BREATHING_CIRCLES as careersHeroBreathingCircles };
