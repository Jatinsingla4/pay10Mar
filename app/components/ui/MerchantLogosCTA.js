"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./MerchantLogosCTA.module.scss";

export default function MerchantLogosCTA({ 
  title = "", 
  images = [],
  showCta = true 
}) {
  const displayLogos = images && images.length > 0 
    ? images.map(img => ({ src: img, alt: "Merchant Logo" }))
    : [];

  if (displayLogos.length === 0 && !title) return null;

  return (
    <section className={Style.logosCtaSection}>
      <div className={Style.container}>

        <div className={Style.logosRow} data-animation="fade-up">
          {displayLogos.map((logo, index) => (
            <div key={index} className={Style.logoCard}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>

        {showCta && title && (
          <div className={Style.ctaContent} data-animation="fade-up" data-anim-delay="150">
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <Link href="/contact-us" className={Style.ctaButton}>
              Get In Touch
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
