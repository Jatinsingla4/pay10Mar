"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./MapHeroBanner.module.scss";

const DEFAULT_MAP = "/images/temp/map.png";
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
 * Hero banner: same typography / CTA pill language as BizHeroBanner, with a full-bleed
 * map texture instead of floating decoration icons. Intended for Open Finance / AlTareq.
 */
export default function MapHeroBanner({
  eyebrow = "",
  title = "",
  description = "",
  heroImage = {
    src: "/images/pay10_ae_mobile.png",
    alt: "Pay10 app",
    width: 360,
    height: 640,
  },
  mapImageSrc = DEFAULT_MAP,
  ctaText = "Get the App",
  ctaHref = "",
  onCtaClick,
  decorations = [],
  className = "",
  layoutClassName = "",
  titleClassName = "",
  imageWrapClassName = "",
  imageClassName = "",
}) {
  const rootRef = useRef(null);
  const hasHeroImage = Boolean(heroImage?.src);
  const isLink = Boolean(ctaHref) && !onCtaClick;
  const showCta = Boolean(ctaText);
  const CtaComponent = isLink ? Link : "button";

  const handleCta = (event) => {
    if (onCtaClick) {
      event.preventDefault();
      onCtaClick();
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduce) return;

      const rootEl = rootRef.current;
      if (rootEl) {
        gsap.set(rootEl, { autoAlpha: 0 });
      }

      const textChain = gsap.utils.toArray(
        '[data-anim="eyebrow"], [data-anim="title"], [data-anim="body"]'
      );
      const circles = gsap.utils.toArray('[data-anim="circle"]');
      const ctaEl = rootEl?.querySelector('[data-anim="cta"]');
      const phoneEl = rootEl?.querySelector('[data-anim="phone"]');

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (rootEl) {
        tl.to(rootEl, { autoAlpha: 1, duration: 0.25, ease: "power1.out" }, 0);
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
          { autoAlpha: 0, y: 28, duration: 0.8, stagger: 0.2, clearProps: "transform" },
          0.1
        );
      }

      if (ctaEl) {
        tl.fromTo(
          ctaEl,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.55
        );
      }

      if (phoneEl) {
        tl.from(
          phoneEl,
          { autoAlpha: 0, y: 36, duration: 0.85, ease: "power2.out", clearProps: "transform" },
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

  const w = heroImage?.width || 360;
  const h = heroImage?.height || 640;

  return (
    <section
      ref={rootRef}
      className={`${styles.mapHeroBanner} ${className}`.trim()}
    >
      {mapImageSrc ? (
        <div
          className={styles.mapLayer}
          style={{ backgroundImage: `url(${mapImageSrc})` }}
          aria-hidden
        />
      ) : null}

      {Array.isArray(decorations) && decorations.length > 0 ? (
        <div className={styles.decorations}>
          {decorations.map((item) => {
            const widthVal = item.size?.width;
            const heightVal = item.size?.height;
            const styleVars = {
              "--top-desktop": item.position?.desktop?.top,
              "--left-desktop": item.position?.desktop?.left,
              "--right-desktop": item.position?.desktop?.right,
              "--bottom-desktop": item.position?.desktop?.bottom,
              "--top-mobile": item.position?.mobile?.top,
              "--left-mobile": item.position?.mobile?.left,
              "--right-mobile": item.position?.mobile?.right,
              "--bottom-mobile": item.position?.mobile?.bottom,
              "--width":
                typeof widthVal === "number"
                  ? `${widthVal}px`
                  : typeof widthVal === "string"
                  ? widthVal
                  : undefined,
              "--height":
                typeof heightVal === "number"
                  ? `${heightVal}px`
                  : typeof heightVal === "string"
                  ? heightVal
                  : undefined,
              "--stroke":
                typeof item.strokeWidth === "number"
                  ? `${item.strokeWidth}px`
                  : undefined,
              "--opacity":
                typeof item.opacity === "number"
                  ? String(item.opacity)
                  : undefined,
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
      ) : null}

      <div className={`${styles.layout} ${layoutClassName}`.trim()}>
        <div className={styles.copy}>
          {eyebrow ? (
            <p className={styles.eyebrow} data-anim="eyebrow">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              className={`${styles.title} ${titleClassName}`.trim()}
              data-anim="title"
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={styles.body} data-anim="body">
              {description}
            </p>
          ) : null}
          {showCta ? (
            <CtaComponent
              href={isLink ? ctaHref : undefined}
              onClick={handleCta}
              type={isLink ? undefined : "button"}
              className={styles.cta}
              data-anim="cta"
            >
              {ctaText}
            </CtaComponent>
          ) : null}
        </div>

        {hasHeroImage ? (
          <div
            className={`${styles.phoneWrap} ${imageWrapClassName}`.trim()}
            data-anim="phone"
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt || ""}
              width={w}
              height={h}
              className={`${styles.phone} ${imageClassName}`.trim()}
              priority
              sizes="(max-width: 768px) 250px, 320px"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export { DEFAULT_MAP as mapHeroDefaultMapSrc };
export { DEFAULT_BREATHING_CIRCLES as mapHeroBreathingCircles };
