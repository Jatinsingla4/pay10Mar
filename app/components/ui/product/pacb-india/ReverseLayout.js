"use client";

import React, { useLayoutEffect, useRef } from "react";
import Style from "./ReverseLayout.module.scss";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ReverseLayout = ({ item = null, imageBase = "", imageLeft = false, withCircles = true }) => {
  const rootRef = useRef(null);
  const circlesRef = useRef([]);

  useLayoutEffect(() => {
    if (!withCircles) return;
    // Ensure the array is always up-to-date and not stale
    circlesRef.current = circlesRef.current.slice(0, 3);

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Set default state for all circles outside viewport
      circlesRef.current.forEach((circle) => {
        if (circle) {
          gsap.set(circle, {
            opacity: 0,
            visibility: "hidden",
            scale: 0.8,
            transformOrigin: "center center",
          });
        }
      });

      // Animate with stagger using ScrollTrigger batch
      gsap.to(circlesRef.current, {
        opacity: (i) => (i === 0 ? 1 : i === 1 ? 0.7 : 0.3),
        visibility: "visible",
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        delay: (i) => 0.4 + i * 0.4,
        force3D: true,
        stagger: { each: 0, amount: 0 },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
          once: true,
          // markers: true, // For debugging
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const title = item?.Title || "";
  const rawImage = item?.Image || "";
  const imageSrc =
    rawImage && (/^https?:\/\//i.test(rawImage) || rawImage.startsWith("/"))
      ? rawImage
      : rawImage
        ? `${imageBase}${rawImage}`
        : "";
  const descriptionHtml = item?.Description || "";

  const contentEl = (
    <div className={Style.left_grid_box}>
      {title ? (
        <div data-animation="opacity-up">
          <h3>{title}</h3>
        </div>
      ) : null}
      <div data-animation="opacity-up" data-animation-delay="100">
        {descriptionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ) : null}
      </div>
    </div>
  );

  const imageEl = (
    <div className={Style.right_grid_box}>
      {withCircles
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                circlesRef.current[index] = el;
              }}
              className={Style.circle}
              aria-hidden="true"
            />
          ))
        : null}
      {imageSrc ? (
        <Image
          width={540}
          height={540}
          src={imageSrc}
          alt={title}
          data-animation="opacity-up"
        />
      ) : null}
    </div>
  );

  return (
    <>
      <div className={Style.reverse_grid} ref={rootRef}>
        {imageLeft ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {imageEl}
          </>
        )}
      </div>
    </>
  );
};

export default ReverseLayout;
