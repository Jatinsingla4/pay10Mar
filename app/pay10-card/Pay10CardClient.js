"use client";

import React from "react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import Pay10CardFeatures from "./components/Pay10CardFeatures";
import Pay10AppFeature from "./components/Pay10AppFeature";
import Pay10WPSFeature from "./components/Pay10WPSFeature";

const Pay10CardClient = () => {
  const cardFeature = {
    heading: "The first local Debit Card accredited by the Central Bank of the UAE.",
    subheading: "Pay10 is issuing UAE's first CBUAE-accredited local debit card directly through the Pay10 UAE App - offering an instant, secure, and seamless payment experience for everyone who calls the UAE home.",
    points: [],
    extraContent: (
      <div style={{ marginTop: '24px', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase', color: '#444' }}>
        POWERED BY JAYWAN &middot; UAE'S NATIONAL CARD SCHEME
      </div>
    ),
    imageSrc: "/images/prod_imports/link_acc.png", // fallback placeholder image
    imageAlt: "Pay10 Card",
    isReversed: false, // Text on left, image/circle on right
    isGreyBg: true, // Soft grey background to separate from hero
  };

  return (
    <main>
      <section className={Style.altareq_hero}>
        <div className={Style.altareq_hero_text}>
          <h2>
            Pay10 Card, UAE has been waiting for.
          </h2>
          <p>
            The first local Debit Card accredited by the Central Bank of the UAE - instant, secure, and seamless. Built inside Pay10 UAE App. For banked professionals and WPS employees.
          </p>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={cardFeature.heading}
        subheading={cardFeature.subheading}
        points={cardFeature.points}
        extraContent={cardFeature.extraContent}
        imageSrc={cardFeature.imageSrc}
        imageAlt={cardFeature.imageAlt}
        isReversed={cardFeature.isReversed}
        isGreyBg={cardFeature.isGreyBg}
      />

      <Pay10CardFeatures />

      <Pay10AppFeature />

      <Pay10WPSFeature />
    </main>
  );
};

export default Pay10CardClient;
