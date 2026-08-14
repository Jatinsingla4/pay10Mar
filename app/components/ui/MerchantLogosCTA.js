"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./MerchantLogosCTA.module.scss";
import GlobalContactCTA from "./GlobalContactCTA";

export default function MerchantLogosCTA({
  title = "",
  images = [],
  showCta = true,
  ctaButtonText = "Contact Us"
}) {
  const displayLogos = images && images.length > 0 
    ? images.map(img => ({ src: img, alt: "Merchant Logo" }))
    : [];

  if (displayLogos.length === 0 && !title) return null;

  return (
    <section className={Style.logosCtaSection}>
      <div className={Style.container}>

        {displayLogos.length > 0 && (
          <div className={Style.logosRow} data-animation="fade-up">
            {displayLogos.map((logo, index) => (
              <div key={index} className={Style.logoCard}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        )}

        {showCta && title && (
          <GlobalContactCTA title={title} subtitle="" buttonText={ctaButtonText} />
        )}

      </div>
    </section>
  );
}
