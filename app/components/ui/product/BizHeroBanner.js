"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./BizHeroBanner.module.scss";

// Exported so consuming pages can reuse/override the base layout
export const defaultDecorations = [
  {
    id: "g1",
    type: "icon",
    src: "/images/product_page_images/g1.png",
    alt: "PCI DSS Certified",
    size: { width: 64, height: 64 },
    position: {
      // left-middle (PCI)
      desktop: { top: "52%", left: "16%" },
      mobile: { top: "46%", left: "12%" },
    },
  },
  {
    id: "g2",
    type: "icon",
    src: "/images/product_page_images/g2.png",
    alt: "Analytics",
    size: { width: 64, height: 64 },
    position: {
      // left-bottom (bar chart)
      desktop: { top: "74%", left: "16%" },
      mobile: { top: "78%", left: "14%" },
    },
  },
  {
    id: "g3",
    type: "icon",
    src: "/images/product_page_images/g3.png",
    alt: "Developer Tools",
    size: { width: 64, height: 64 },
    position: {
      // left-center (code icon, yellow bubble)
      desktop: { top: '56%', left: '30%' },
      mobile: { top: '63%', left: '16%' },
    },
    isHighlighted: true,
  },
  {
    id: "g4",
    type: "icon",
    src: "/images/product_page_images/g4.png",
    alt: "Security Verified",
    size: { width: 64, height: 64 },
    position: {
      // right-middle (shield)
      desktop: { top: "52%", left: "72%" },
      mobile: { top: "46%", left: "84%" },
    },
  },
  {
    id: "g5",
    type: "icon",
    src: "/images/product_page_images/g5.png",
    alt: "Growth Metrics",
    size: { width: 64, height: 64 },
    position: {
      // right-center (growth, yellow bubble)
      desktop: { top: "45%", left: "86%" },
      mobile: { top: "58%", left: "92%" },
    },
    isHighlighted: true, // Yellow circle variant
  },
  {
    id: "g6",
    type: "icon",
    src: "/images/product_page_images/g6.png",
    alt: "Reserve Bank of India",
    size: { width: 64, height: 64 },
    position: {
      // right-bottom (RBI seal)
      desktop: { top: "74%", left: "78%" },
      mobile: { top: "84%", left: "84%" },
    },
  },
  {
    id: 'circle-1',
    type: 'circle',
    size: { width: '90vmax', height: '90vmax' },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: 'circle-2',
    type: 'circle',
    // Keep just 3 rings; use a wider step so it matches the designs
    size: { width: '65vmax', height: '65vmax' },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: 'circle-3',
    type: 'circle',
    // Make the smallest ring large enough to stay visible behind the phone/text
    size: { width: '40vmax', height: '40vmax' },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
];

// Customer app decorations using ca1.svg - ca6.svg
export const customerAppDecorations = [
  {
    id: 'ca1',
    type: 'icon',
    src: '/images/product_page_images/ca1.svg',
    alt: 'Customer App Feature 1',
    size: { width: 64, height: 64 },
    position: {
      // left-middle
      desktop: { top: '52%', left: '16%' },
      mobile: { top: '46%', left: '12%' },
    },
  },
  {
    id: 'ca2',
    type: 'icon',
    src: '/images/product_page_images/ca2.svg',
    alt: 'Customer App Feature 2',
    size: { width: 64, height: 64 },
    position: {
      // left-bottom
      desktop: { top: '74%', left: '16%' },
      mobile: { top: '78%', left: '14%' },
    },
  },
  {
    id: 'ca3',
    type: 'icon',
    src: '/images/product_page_images/ca3.svg',
    alt: 'Customer App Feature 3',
    size: { width: 64, height: 64 },
    position: {
      // left-center (yellow bubble)
      desktop: { top: '56%', left: '30%' },
      mobile: { top: '63%', left: '16%' },
    },
    isHighlighted: true,
  },
  {
    id: 'ca4',
    type: 'icon',
    src: '/images/product_page_images/ca4.svg',
    alt: 'Customer App Feature 4',
    size: { width: 64, height: 64 },
    position: {
      // right-middle
      desktop: { top: '52%', left: '72%' },
      mobile: { top: '46%', left: '84%' },
    },
  },
  {
    id: 'ca5',
    type: 'icon',
    src: '/images/product_page_images/ca5.svg',
    alt: 'Customer App Feature 5',
    size: { width: 64, height: 64 },
    position: {
      // right-center (yellow bubble)
      desktop: { top: '45%', left: '86%' },
      mobile: { top: '58%', left: '92%' },
    },
    isHighlighted: true, // Yellow circle variant
  },
  {
    id: 'ca6',
    type: 'icon',
    src: '/images/product_page_images/ca6.svg',
    alt: 'Customer App Feature 6',
    size: { width: 64, height: 64 },
    position: {
      // right-bottom
      desktop: { top: '74%', left: '78%' },
      mobile: { top: '84%', left: '84%' },
    },
  },
  {
    id: 'circle-1',
    type: 'circle',
    size: { width: '90vmax', height: '90vmax' },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: 'circle-2',
    type: 'circle',
    size: { width: '65vmax', height: '65vmax' },
    position: {
      desktop: { top: '50%', left: '50%' },
      mobile: { top: '50%', left: '50%' },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: 'circle-3',
    type: 'circle',
    size: { width: '40vmax', height: '40vmax' },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
];

export default function BizHeroBanner({
  eyebrow = "",
  title = "Pay10 BIZ",
  description = "Future-Ready Payment Infrastructure for Businesses of All Sizes",
  ctaHref = "/coming-soon",
  ctaImgSrc = "/images/common/cta-get-pay101.svg",
  ctaImgAlt = "Download Now",
  ctaImgWidth = 223,
  ctaImgHeight = 66,
  ctaText = "",
  heroImage = {
    src: "/images/product_page_images/ppa1.png",
    alt: "Pay10 BIZ app interface",
    width: 360,
    height: 640,
  },
  decorations = defaultDecorations,
  onCtaClick,
  className = "",
}) {
  const hasHeroImage = heroImage && heroImage.src;
  const rootRef = useRef(null);
  const isLink = ctaHref && !onCtaClick;

  const handleCta = (event) => {
    if (onCtaClick) {
      event.preventDefault();
      onCtaClick();
    }
  };

  const CtaComponent = isLink ? Link : "button";

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

      const circles = gsap.utils.toArray('[data-anim="circle"]');
      const icons = gsap.utils.toArray('[data-anim="icon"]');
      const textChain = gsap.utils.toArray(
        '[data-anim="eyebrow"], [data-anim="title"], [data-anim="body"], [data-anim="phone"]'
      );
      const ctaEl = document.querySelector('[data-anim="cta"]');

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (rootEl) {
        tl.to(
          rootEl,
          {
            autoAlpha: 1,
            duration: 0.25,
            ease: "power1.out",
          },
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
          0.25
        );
      }

      if (ctaEl) {
        tl.fromTo(
          ctaEl,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.75
        );
      }

      if (icons.length) {
        tl.from(
          icons,
          {
            autoAlpha: 0,
            scale: 0.3,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.8)",
          },
          1.05
        );
      }

      // Add subtle bouncing effect after initial timeline completes
      const timelineDuration = tl.duration();

      if (circles.length) {
        // Subtle scale animation for all circles with stagger
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

      if (icons.length) {
        gsap.to(icons, {
          y: -10,
          duration: 1.2,
          ease: "power1.inOut",
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
    <section
      ref={rootRef}
      className={`${styles.bizHeroBanner} ${className}`.trim()}
    >
      <div className={styles.desktopLayout}>
        <div className={styles.desktopInner}>
          {eyebrow && (
            <p className={styles.eyebrow} data-anim="eyebrow">
              {eyebrow}
            </p>
          )}
          <h2 className={styles.title} data-anim="title">
            {title}
          </h2>
          {description && (
            <p className={styles.body} data-anim="body">
              {description}
            </p>
          )}
          {(ctaText || ctaImgSrc) && (
            <CtaComponent
              href={isLink ? ctaHref : undefined}
              onClick={handleCta}
              type={isLink ? undefined : "button"}
              className={`${styles.ctaDesktop} ${
                ctaText ? styles.ctaText : ""
              }`}
              data-anim="cta"
            >
              {ctaText ? (
                <>
                  <span>{ctaText}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 30 30"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.25"
                      d="M20.25 1.125h7.875V9m-1.687-6.187L18 11.25m-3.375-7.875H4.5A3.375 3.375 0 0 0 1.125 6.75v18A3.375 3.375 0 0 0 4.5 28.125h18a3.375 3.375 0 0 0 3.375-3.375V14.625"
                    />
                  </svg>
                </>
              ) : ctaImgSrc ? (
                <Image
                  src={ctaImgSrc}
                  alt={ctaImgAlt || ""}
                  className={styles.ctaImg}
                  width={ctaImgWidth}
                  height={ctaImgHeight}
                  priority
                />
              ) : null}
            </CtaComponent>
          )}
        </div>

        {hasHeroImage && (
          <div className={styles.desktopPhoneWrap} data-anim="phone">
            <Image
              src={heroImage.src}
              alt={heroImage.alt || ""}
              width={300}
              height={600}
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

            if (item.type === "circle") {
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
                className={`${styles.iconDecoration} ${
                  item.isHighlighted ? styles.iconHighlighted : ""
                }`}
                style={styleVars}
                aria-label={item.alt || undefined}
                aria-hidden={item.alt ? undefined : true}
                data-anim="icon"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt || ""}
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
