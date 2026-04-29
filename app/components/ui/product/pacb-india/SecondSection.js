'use client';

import React, { useLayoutEffect, useRef } from "react";
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Style from "./SecondSection.module.scss"

gsap.registerPlugin(ScrollTrigger);

const SecondSection = ({
  heading = "",
  description = "",
  image = ""
}) => {
  const rootRef = useRef(null);
  const circlesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // Check if already in viewport
      const rect = rootRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      // Circles scale up with stagger starting from smallest (index 0)
      if (circlesRef.current.length > 0) {
        circlesRef.current.forEach((circle, index) => {
          if (circle) {
            gsap.set(circle, {
              opacity: 0,
              visibility: 'hidden',
              scale: 0.8,
              transformOrigin: 'center center'
            });
            const circleTween = gsap.to(circle, {
              opacity: index === 0 ? 1 : index === 1 ? 0.7 : 0.3,
              visibility: 'visible',
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
              delay: 0.4 + (index * 0.4), // Stagger from smallest
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
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={Style.second_section}>
      <div className={Style.second_section_left_content}>
        {heading ? <h3 data-animation="opacity-up">{heading}</h3> : null}
        {description ? (
          <p data-animation="opacity-up" data-anim-delay="100">
            {description}
          </p>
        ) : null}
      </div>
      <div className={Style.second_section_right_img}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) circlesRef.current[index] = el;
            }}
            className={Style.circle}
            aria-hidden="true"
          />
        ))}
        {image ? (
          <img
            src={image}
            alt=""
            data-animation="opacity-up"
            data-anim-delay="150"
          />
        ) : null}
      </div>
    </div>
  );
};

export default SecondSection;
