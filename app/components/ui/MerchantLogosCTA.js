"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./MerchantLogosCTA.module.scss";

const logos = [
  { src: "/images/merchants/meryenda.png", alt: "Meryenda" },
  { src: "/images/merchants/allday.png", alt: "AllDay Retail" },
  { src: "/images/merchants/jumbo.png", alt: "Jumbo" },
  { src: "/images/merchants/gems.png", alt: "GEMS Education" },
  { src: "/images/merchants/agemono.png", alt: "Agemono Express" },
];

export default function MerchantLogosCTA() {
  return (
    <section className={Style.logosCtaSection}>
      <div className={Style.container}>
        
        {/* Logos Row */}
        <div className={Style.logosRow} data-animation="fade-up">
          {logos.map((logo, index) => (
            <div key={index} className={Style.logoCard}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={Style.ctaContent} data-animation="fade-up" data-anim-delay="150">
          <h2>Get Started Today</h2>
          <Link href="/contact-us" className={Style.ctaButton}>
            Get In Touch
          </Link>
        </div>

      </div>
    </section>
  );
}
